import React, { useState, useEffect, useRef } from 'react';
import { questionsData, ranks } from '../data/questionsData';
import { Question, QuizMode, QuizSettings, UserAnswer, QuizResult } from '../types';
import { checkSingleWordAnswer } from '../utils/answerChecker';
import { soundEffects } from '../utils/sound';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Sliders, 
  Sparkles, 
  Check, 
  Share2, 
  Filter, 
  Bookmark, 
  Flag,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizSection: React.FC = () => {
  // Quiz Lifecycle State: 'setup' | 'running' | 'results'
  const [phase, setPhase] = useState<'setup' | 'running' | 'results'>('setup');

  // Setup options
  const [questionCount, setQuestionCount] = useState<number>(30); // 20 to 50
  const [quizMode, setQuizMode] = useState<QuizMode>('mixed'); // 'choice' | 'single_word' | 'mixed'
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(0); // 0 = unlimited

  // Running Quiz State
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, { choiceIndex?: number; writtenText?: string }>>({});
  const [questionStartTimes, setQuestionStartTimes] = useState<Record<number, number>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);

  // Result state
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [resultFilter, setResultFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Timer Ref
  const timerRef = useRef<number | null>(null);
  const singleInputRef = useRef<HTMLInputElement>(null);

  // Focus single word input when question changes
  useEffect(() => {
    if (phase === 'running' && singleInputRef.current) {
      singleInputRef.current.focus();
    }
  }, [currentIndex, phase]);

  // Main countdown/elapsed timer
  useEffect(() => {
    if (phase === 'running') {
      const interval = window.setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          if (timeLimitMinutes > 0 && next >= timeLimitMinutes * 60) {
            handleFinishQuiz();
          }
          return next;
        });
      }, 1000);
      timerRef.current = interval;
      return () => clearInterval(interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [phase, timeLimitMinutes]);

  // Start the quiz
  const handleStartQuiz = () => {
    soundEffects.playClick();
    
    // Select and shuffle questions up to questionCount
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, questionsData.length));
    
    // Transform question type based on chosen quizMode
    const customized: Question[] = selected.map(q => {
      if (quizMode === 'single_word') {
        return { ...q, type: 'single_word' };
      }
      if (quizMode === 'choice') {
        return { ...q, type: 'choice' };
      }
      // 'mixed' mode preserves varied distribution
      return q;
    });

    setActiveQuestions(customized);
    setCurrentIndex(0);
    setAnswers({});
    setElapsedSeconds(0);
    setQuestionStartTimes({ 0: Date.now() });
    setPhase('running');
  };

  // Answering handlers
  const handleSelectChoice = (optionIndex: number) => {
    soundEffects.playClick();
    const currentQ = activeQuestions[currentIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        choiceIndex: optionIndex
      }
    }));
  };

  const handleWriteSingleWord = (text: string) => {
    const currentQ = activeQuestions[currentIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        writtenText: text
      }
    }));
  };

  // Navigating questions
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      soundEffects.playClick();
      setCurrentIndex(index);
      setQuestionStartTimes(prev => ({
        ...prev,
        [index]: prev[index] || Date.now()
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      goToQuestion(currentIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  // Finish and compute results
  const handleFinishQuiz = () => {
    soundEffects.playVictory();
    
    let correctCount = 0;
    const userAnswersList: UserAnswer[] = [];

    activeQuestions.forEach(q => {
      const userAns = answers[q.id];
      let isCorrect = false;

      if (q.type === 'single_word') {
        const typed = userAns?.writtenText || '';
        isCorrect = checkSingleWordAnswer(typed, q.singleWordAnswer, q.acceptableAnswers);
      } else {
        const selected = userAns?.choiceIndex;
        isCorrect = selected !== undefined && selected === q.correctOptionIndex;
      }

      if (isCorrect) correctCount++;

      userAnswersList.push({
        questionId: q.id,
        selectedOptionIndex: userAns?.choiceIndex,
        writtenAnswer: userAns?.writtenText,
        isCorrect,
        timeSpentSeconds: 0
      });
    });

    const scorePercentage = Math.round((correctCount / activeQuestions.length) * 100);
    const assignedRank = ranks.find(r => scorePercentage >= r.minPercent) || ranks[ranks.length - 1];

    const result: QuizResult = {
      totalQuestions: activeQuestions.length,
      correctAnswers: correctCount,
      incorrectAnswers: activeQuestions.length - correctCount,
      scorePercentage,
      timeSpentTotalSeconds: elapsedSeconds,
      date: new Date().toLocaleDateString('uz-UZ'),
      userAnswers: userAnswersList,
      rankTitle: assignedRank.title,
      rankBadge: assignedRank.badge,
      mode: quizMode
    };

    setQuizResult(result);
    setPhase('results');

    // Confetti celebration
    try {
      confetti({
        particleCount: scorePercentage > 70 ? 100 : 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyShareText = () => {
    if (!quizResult) return;
    soundEffects.playClick();
    const text = `🚀 „Galaktikada bir kun 2“ testi natijam:\n` +
      `📊 Natija: ${quizResult.correctAnswers} / ${quizResult.totalQuestions} (${quizResult.scorePercentage}%)\n` +
      `🎖️ Daraja: ${quizResult.rankTitle} (${quizResult.rankBadge})\n` +
      `⏱️ Sarflangan vaqt: ${formatTime(quizResult.timeSpentTotalSeconds)}\n` +
      `Siz ham oʻz bilimingizni sinab koʻring!`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <section id="quiz" className="py-16 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ----------------- PHASE 1: SETUP ----------------- */}
        {phase === 'setup' && (
          <div className="space-y-10">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>Interaktiv sinov maydoni</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
                „Galaktikada bir kun 2“ boʻyicha test
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Savollar sonini <strong>20 tadan 50 tagacha</strong> belgilang, qulay sinov formatini tanlang va yakunda toʻliq tahliliy natijaga ega boʻling.
              </p>
            </div>

            {/* Config Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-8 shadow-xl">
              
              {/* Question Count Selector (20 to 50) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      1. Savollar sonini tanlang (20 tadan 50 tagacha)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Siz xohlagan aniq miqdorni belgilashingiz mumkin
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold font-mono text-cyan-400 tabular-nums">
                      {questionCount}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">ta savol</span>
                  </div>
                </div>

                {/* Slider (min 20, max 50) */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="20"
                    max="50"
                    step="1"
                    value={questionCount}
                    onChange={e => setQuestionCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>20 (Minimal)</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50 (Maksimal)</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-400 mr-1">Tezkor tanlov:</span>
                  {[20, 25, 30, 40, 50].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setQuestionCount(cnt);
                      }}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                        questionCount === cnt
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {cnt} ta
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-3 pt-6 border-t border-slate-800">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    2. Savollarga javob berish formatini tanlang
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bitta soʻzli yozma javoblar yoki anʼanaviy variantli test
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Mixed */}
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setQuizMode('mixed');
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      quizMode === 'mixed'
                        ? 'border-cyan-400 bg-cyan-950/20 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-cyan-400 uppercase">Tavsiya etiladi</span>
                      {quizMode === 'mixed' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Aralash rejim</p>
                    <p className="text-xs text-slate-400 leading-snug">
                      Variantli (A,B,C,D) hamda bitta soʻz yoziladigan savollar uygʻunligi.
                    </p>
                  </button>

                  {/* Single Word Written */}
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setQuizMode('single_word');
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      quizMode === 'single_word'
                        ? 'border-cyan-400 bg-cyan-950/20 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-indigo-400 uppercase">Yozma javob</span>
                      {quizMode === 'single_word' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Bitta soʻz bilan yozish</p>
                    <p className="text-xs text-slate-400 leading-snug">
                      Har bir savolga javob maxsus maydonga aniq bitta soʻz bilan kiritiladi.
                    </p>
                  </button>

                  {/* Multiple Choice */}
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setQuizMode('choice');
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      quizMode === 'choice'
                        ? 'border-cyan-400 bg-cyan-950/20 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-emerald-400 uppercase">Klassik</span>
                      {quizMode === 'choice' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Variantli test</p>
                    <p className="text-xs text-slate-400 leading-snug">
                      4 ta variantdan (A, B, C, D) toʻgʻrisini bir marta bosish orqali tanlash.
                    </p>
                  </button>

                </div>
              </div>

              {/* Optional Timer */}
              <div className="space-y-3 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      3. Vaqt chegarasi (Ixtiyoriy)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Vaqt boʻyicha oʻzingizni sinab koʻrish yoki shoshilmasdan ishlash
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Cheklovsiz (Erkin)", val: 0 },
                    { label: "20 daqiqa", val: 20 },
                    { label: "30 daqiqa", val: 30 },
                    { label: "45 daqiqa", val: 45 }
                  ].map(t => (
                    <button
                      key={t.val}
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setTimeLimitMinutes(t.val);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        timeLimitMinutes === t.val
                          ? 'bg-slate-700 text-white border border-cyan-400/50'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="w-full py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{questionCount} talik Testni boshlash</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ----------------- PHASE 2: RUNNING ----------------- */}
        {phase === 'running' && activeQuestions.length > 0 && (
          <div className="space-y-6">
            
            {/* Top Control Bar: Progress, Timer, Exit */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 flex items-center justify-between gap-4">
              
              {/* Question progress */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                  className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-cyan-400 hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Savollar roʻyxatini ochish"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{currentIndex + 1} / {activeQuestions.length}</span>
                </button>

                <div className="hidden sm:block text-xs text-slate-400">
                  <span>Toifasi: </span>
                  <span className="text-slate-200 font-medium">{activeQuestions[currentIndex].category}</span>
                </div>
              </div>

              {/* Timer indicator */}
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>
                  {timeLimitMinutes > 0
                    ? `Qolgan vaqt: ${formatTime(Math.max(0, timeLimitMinutes * 60 - elapsedSeconds))}`
                    : `Vaqt: ${formatTime(elapsedSeconds)}`
                  }
                </span>
              </div>

              {/* Finish early button */}
              <button
                onClick={() => setShowExitConfirm(true)}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 text-xs text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Testni yakunlash</span>
              </button>
            </div>

            {/* Overall Progress Line */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Quick Jump Drawer (if opened) */}
            {showQuestionGrid && (
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/95 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Savolga tezkor oʻtish:</span>
                  <button
                    onClick={() => setShowQuestionGrid(false)}
                    className="text-cyan-400 hover:underline"
                  >
                    Yopish
                  </button>
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = q.type === 'single_word'
                      ? !!answers[q.id]?.writtenText?.trim()
                      : answers[q.id]?.choiceIndex !== undefined;

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          goToQuestion(idx);
                          setShowQuestionGrid(false);
                        }}
                        className={`py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                          idx === currentIndex
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : isAnswered
                            ? 'bg-slate-700 text-cyan-300'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Card */}
            {(() => {
              const currentQ = activeQuestions[currentIndex];
              const isSingleWord = currentQ.type === 'single_word';
              const userAns = answers[currentQ.id];

              return (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
                  
                  {/* Category and Mode indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold uppercase tracking-wider text-cyan-400">
                      {isSingleWord ? "Bitta soʻzli yozma savol" : "Variantli test"}
                    </span>
                    <span className="font-mono">#{currentIndex + 1}</span>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-relaxed">
                    {currentQ.question}
                  </h3>

                  {/* Interactive Input or Choices */}
                  {isSingleWord ? (
                    /* Single word input field */
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-medium text-slate-300">
                        Javobingizni bitta soʻz bilan yozing:
                      </label>
                      <div className="relative">
                        <input
                          ref={singleInputRef}
                          type="text"
                          value={userAns?.writtenText || ''}
                          onChange={e => handleWriteSingleWord(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleNext();
                            }
                          }}
                          placeholder="Javobni bitta soʻz bilan yozing (masalan: Ahmad, Bobosi...)"
                          className="w-full px-4 sm:px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 text-base sm:text-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                        />
                      </div>
                      {currentQ.hint && (
                        <p className="text-xs text-slate-400 italic">
                          💡 Ishora: {currentQ.hint}
                        </p>
                      )}
                    </div>
                  ) : (
                    /* 4 Multiple Choice Buttons */
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {currentQ.options.map((opt, optIdx) => {
                        const isSelected = userAns?.choiceIndex === optIdx;
                        const optionLabels = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectChoice(optIdx)}
                            className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-sm'
                                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                                isSelected
                                  ? 'bg-cyan-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {optionLabels[optIdx]}
                              </span>
                              <span className="text-sm sm:text-base font-medium">{opt}</span>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Navigation Buttons: Previous, Next, Finish */}
                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={handlePrev}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Oldingisi</span>
                    </button>

                    <div className="text-xs text-slate-500 font-mono hidden sm:block">
                      {currentIndex + 1} / {activeQuestions.length}
                    </div>

                    {currentIndex < activeQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        <span>Keyingisi</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinishQuiz}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-emerald-500/20"
                      >
                        <span>Yakunlash va natijani koʻrish</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              );
            })()}

            {/* Exit confirmation modal */}
            {showExitConfirm && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                  <h4 className="text-lg font-bold text-white">Testni yakunlashni xohlaysizmi?</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Barcha belgilangan va javob berilgan savollar asosida yakuniy baho va tahliliy hisobot chiqariladi.
                  </p>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setShowExitConfirm(false)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-lg border border-slate-700"
                    >
                      Davom ettirish
                    </button>
                    <button
                      onClick={() => {
                        setShowExitConfirm(false);
                        handleFinishQuiz();
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow"
                    >
                      Ha, natijani koʻrsat
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ----------------- PHASE 3: RESULTS ----------------- */}
        {phase === 'results' && quizResult && (
          <div className="space-y-10">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Sinov muvaffaqiyatli yakunlandi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
                Yakuniy Test Natijasi
              </h2>
              <p className="text-sm text-slate-400">
                „Galaktikada bir kun 2“ asari boʻyicha erishgan yutugʻingiz
              </p>
            </div>

            {/* Scoreboard Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-6 border-b border-slate-800">
                
                {/* Score percentage circle */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="stroke-slate-800"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className={`${
                          quizResult.scorePercentage >= 75
                            ? 'stroke-cyan-400'
                            : quizResult.scorePercentage >= 50
                            ? 'stroke-amber-400'
                            : 'stroke-red-400'
                        } transition-all duration-1000`}
                        strokeWidth="8"
                        strokeDasharray={264}
                        strokeDashoffset={264 - (264 * quizResult.scorePercentage) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                        {quizResult.scorePercentage}%
                      </span>
                      <span className="text-xs text-slate-400">toʻgʻri</span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown & Rank */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        {quizResult.rankBadge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">
                      {quizResult.rankTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      {ranks.find(r => r.title === quizResult.rankTitle)?.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <p className="text-xs text-slate-400">Jami savollar</p>
                      <p className="text-xl font-bold font-mono text-white tabular-nums">
                        {quizResult.totalQuestions} ta
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <p className="text-xs text-slate-400">Toʻgʻri javob</p>
                      <p className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                        {quizResult.correctAnswers} ta
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <p className="text-xs text-slate-400">Sarflangan vaqt</p>
                      <p className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
                        {formatTime(quizResult.timeSpentTotalSeconds)}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions row: Restart, Share, Return */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setPhase('setup');
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-cyan-400/50 bg-slate-800 text-xs sm:text-sm font-semibold text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta test topshirish (20–50)</span>
                </button>

                <button
                  onClick={copyShareText}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedShare ? "Natija nusxalandi!" : "Natijani ulashish"}</span>
                </button>
              </div>

            </div>

            {/* Detailed Question-by-Question Review */}
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold font-display text-white">
                  Barcha savollar tahlili va toʻgʻri javoblar
                </h3>

                {/* Filter buttons */}
                <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setResultFilter('all');
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      resultFilter === 'all'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Barchasi ({quizResult.totalQuestions})
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setResultFilter('correct');
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      resultFilter === 'correct'
                        ? 'bg-emerald-950/40 text-emerald-300 font-semibold border border-emerald-500/30'
                        : 'text-slate-400 hover:text-emerald-300'
                    }`}
                  >
                    Toʻgʻri ({quizResult.correctAnswers})
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setResultFilter('incorrect');
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      resultFilter === 'incorrect'
                        ? 'bg-red-950/40 text-red-300 font-semibold border border-red-500/30'
                        : 'text-slate-400 hover:text-red-300'
                    }`}
                  >
                    Xatolar ({quizResult.incorrectAnswers})
                  </button>
                </div>
              </div>

              {/* List of reviewed questions */}
              <div className="space-y-4">
                {activeQuestions
                  .map((q, idx) => {
                    const ans = quizResult.userAnswers.find(ua => ua.questionId === q.id);
                    const isCorrect = ans?.isCorrect ?? false;
                    return { q, idx, ans, isCorrect };
                  })
                  .filter(item => {
                    if (resultFilter === 'correct') return item.isCorrect;
                    if (resultFilter === 'incorrect') return !item.isCorrect;
                    return true;
                  })
                  .map(({ q, idx, ans, isCorrect }) => {
                    const isSingleWord = q.type === 'single_word';

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-xl border transition-all ${
                          isCorrect
                            ? 'bg-slate-900/60 border-emerald-500/30'
                            : 'bg-slate-900/60 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono text-slate-400 font-semibold">#{idx + 1}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-slate-400">{q.category}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-cyan-400/90">{isSingleWord ? "Bitta soʻzli" : "Variantli"}</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
                            {isCorrect ? (
                              <span className="flex items-center gap-1 text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Toʻgʻri</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-400">
                                <XCircle className="w-4 h-4" />
                                <span>Notoʻgʻri</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-sm sm:text-base font-medium text-white mb-3">
                          {q.question}
                        </h4>

                        {/* Display User Answer vs Correct Answer */}
                        <div className="bg-slate-950/60 rounded-lg p-3 text-xs space-y-1.5 border border-slate-800">
                          {isSingleWord ? (
                            <>
                              <p className="text-slate-400">
                                Siz yozgan javob: <strong className={isCorrect ? "text-emerald-300 font-bold" : "text-red-300 line-through"}>
                                  {ans?.writtenAnswer || "(Javob yozilmadi)"}
                                </strong>
                              </p>
                              {!isCorrect && (
                                <p className="text-slate-300">
                                  Toʻgʻri soʻz: <strong className="text-emerald-400 font-bold">{q.singleWordAnswer}</strong>
                                </p>
                              )}
                            </>
                          ) : (
                            <>
                              <p className="text-slate-400">
                                Siz tanlagan javob: <strong className={isCorrect ? "text-emerald-300 font-bold" : "text-red-300"}>
                                  {ans?.selectedOptionIndex !== undefined ? q.options[ans.selectedOptionIndex] : "(Belgilanmadi)"}
                                </strong>
                              </p>
                              {!isCorrect && (
                                <p className="text-slate-300">
                                  Toʻgʻri variant: <strong className="text-emerald-400 font-bold">{q.options[q.correctOptionIndex]}</strong>
                                </p>
                              )}
                            </>
                          )}

                          <p className="text-slate-400 pt-1 border-t border-slate-800/80 mt-1.5">
                            💡 <strong>Izoh:</strong> {q.explanation}
                          </p>
                        </div>

                      </div>
                    );
                  })}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
