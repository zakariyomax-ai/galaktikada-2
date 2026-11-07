import React, { useState, useEffect, useRef } from 'react';
import { questionsData } from '../data/questionsData';
import { checkSingleWordAnswer } from '../utils/answerChecker';
import { soundEffects } from '../utils/sound';
import { Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Lightbulb, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SingleWordPractice: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQ = questionsData[currentIndex];

  useEffect(() => {
    setUserInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isAnswered) return;

    const correct = checkSingleWordAnswer(
      userInput,
      currentQ.singleWordAnswer,
      currentQ.acceptableAnswers
    );

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      soundEffects.playCorrect();
      setStreak(prev => prev + 1);
      setScore(prev => prev + 1);
      if ((streak + 1) % 5 === 0) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      soundEffects.playIncorrect();
      setStreak(0);
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSkip = () => {
    soundEffects.playClick();
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);
  };

  return (
    <section id="practice" className="py-16 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Yozma javobli savollar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Bitta soʻz bilan javob yozish mashqi
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            Har bir savolga javobni maxsus maydonga aniq <strong>bitta soʻz</strong> bilan yozing va klaviaturadagi <em>Enter</em> tugmasini bosing!
          </p>
        </div>

        {/* Practice Terminal Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* Top stats bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-semibold">
                Savol {currentIndex + 1} / {questionsData.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentQ.category}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400 font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ketma-ket: {streak}</span>
              </div>
              <div className="font-mono text-emerald-400 font-medium">
                Ball: {score}
              </div>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-medium text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Single Word Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                disabled={isAnswered}
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Javobni bitta soʻz bilan yozing (masalan: Ahmad, Bobosi...)"
                className={`w-full px-4 sm:px-5 py-3.5 rounded-xl border text-base sm:text-lg transition-all focus:outline-none ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                      : 'border-red-500 bg-red-950/20 text-red-300'
                    : 'border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                }`}
              />

              {!isAnswered && (
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Tekshirish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Hint & Skip Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              {currentQ.hint && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showHint ? "Yordamni yashirish" : "Yordam (ishora) olish"}</span>
                </button>
              )}

              {!isAnswered && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Javobni bilmayman (koʻrsatish)
                </button>
              )}
            </div>

            {/* Hint Box */}
            {showHint && currentQ.hint && (
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Ishora:</strong> {currentQ.hint}</span>
              </div>
            )}
          </form>

          {/* Feedback after answering */}
          {isAnswered && (
            <div className={`mt-6 p-4 rounded-xl border ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40'
                : 'bg-red-950/30 border-red-500/40'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-emerald-300 text-sm">Toʻgʻri javob berdingiz!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span className="font-semibold text-red-300 text-sm">
                          Notoʻgʻri! Toʻgʻri javob: <span className="underline font-bold text-white">{currentQ.singleWordAnswer}</span>
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-slate-200 font-semibold text-xs sm:text-sm shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                >
                  <span>Keyingisi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom progress bar */}
          <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span>Istagan paytingiz quyidagi keng qamrovli testga oʻtishingiz mumkin</span>
            <button
              onClick={() => {
                soundEffects.playClick();
                setCurrentIndex(0);
                setStreak(0);
                setScore(0);
              }}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Boshidan boshlash</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
