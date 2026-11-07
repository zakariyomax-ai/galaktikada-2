import React, { useState } from 'react';
import { ArrowRight, BookOpen, FileText, Rocket, Check, Sparkles, Layers, User, Award, Shield, HelpCircle } from 'lucide-react';
import { bookData } from '../data/bookData';
import { authorData } from '../data/authorData';
import { soundEffects } from '../utils/sound';

interface HeroProps {
  onStartQuiz: () => void;
  onExploreBook: () => void;
  onExploreAuthor: () => void;
  onStartPractice: () => void;
  onExploreAhmad: () => void;
  onOpenPuzzle: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onExploreBook,
  onExploreAuthor,
  onStartPractice,
  onExploreAhmad,
  onOpenPuzzle,
}) => {
  // Toggle between official book cover and spaceship
  const [activeVisual, setActiveVisual] = useState<'cover' | 'spaceship'>('cover');

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[320px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              <span>Saʼdullo Quronov</span>
              <span aria-hidden="true">·</span>
              <span>Galaktikada bir kun</span>
              <span aria-hidden="true">·</span>
              <span>2-kitob</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1] text-balance">
              Galaktikada <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">bir kun 2</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              12 yoshli vunderkind <strong className="text-white font-semibold">Ahmad</strong>, uning sodiq doʻsti <strong className="text-white font-semibold">Margol</strong> va kiber-xaker <strong className="text-white font-semibold">Moki</strong> bilan nomaʼlum xavfli koinot sarhadlari sari sayohat qiling! 
              Oʻz bilimingizni <strong className="text-cyan-300 font-semibold">20 tadan 50 tagacha</strong> boʻlgan testlarda sinab koʻring, <strong className="text-cyan-300 font-semibold">bitta soʻz bilan javob yozing</strong> yoki rasmlarni <strong className="text-amber-300 font-semibold">kosmik pazl</strong> qilib tering!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartQuiz();
                }}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <span>Testni boshlash (20–50)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenPuzzle();
                }}
                className="px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-amber-300 bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/50 hover:border-amber-400 transition-all active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Kosmik Pazl</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreAhmad();
                }}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-cyan-300 bg-slate-900/90 border border-cyan-500/40 hover:bg-slate-800/90 hover:border-cyan-400 transition-all active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>Ahmad haqida</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartPractice();
                }}
                className="px-5 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-300 bg-slate-900/60 border border-slate-800 hover:bg-slate-800/80 hover:text-white transition-all active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Bitta soʻzli blits</span>
              </button>
            </div>

            {/* Quiet info indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Moslashuvchan test hajmi (20, 30, 40, 50)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Yozma bitta soʻzli tekshirish</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Batafsil natijalar va tahlil</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Dual Visual Showcase on Bosh sahifa */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-3">
            
            {/* Image Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-center lg:self-end">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveVisual('cover');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeVisual === 'cover'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>2-kitob muqovasi</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveVisual('spaceship');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeVisual === 'spaceship'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Fazo kemasi</span>
              </button>
            </div>

            {/* Main Interactive Showcase Card */}
            <div className="relative group w-full max-w-[390px]">
              
              {/* Outer soft glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-indigo-600/30 blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                
                {/* Visual Area */}
                <div className="aspect-[3/4] relative overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={activeVisual === 'cover' ? bookData.coverImage : bookData.spaceshipImage}
                    alt={activeVisual === 'cover' ? "Galaktikada bir kun 2 kitob muqovasi" : "Ahmadning fazo kemasi"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                  
                  {/* Overlay Tags */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono font-semibold text-cyan-300">
                      {activeVisual === 'cover' ? "Rasmiy kitob muqovasi" : "Ahmadning fazo kemasi"}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    {activeVisual === 'cover' ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Saʼdullo Quronov</p>
                        <p className="text-xl font-bold text-white font-display">Galaktikada bir kun 2</p>
                        <p className="text-xs text-slate-300 mt-0.5">Ahmad qora tuynuk qarshisida (2-kitob)</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Kosmik transport</p>
                        <p className="text-xl font-bold text-white font-display">Yulduzlararo Kema</p>
                        <p className="text-xs text-slate-300 mt-0.5">Nomaʼlum sayyora zaminiga qoʻngan holatda</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom interactive switcher preview strip */}
                <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveVisual(activeVisual === 'cover' ? 'spaceship' : 'cover');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{activeVisual === 'cover' ? "Fazo kemasini koʻrish" : "Muqovani koʻrish"}</span>
                    </button>
                  </div>
                  <span className="text-slate-500 font-mono">2 ta asosiy rasm</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Both Images Side-by-Side Gallery on Bosh sahifa */}
        <div className="mt-14 pt-10 border-t border-slate-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bosh sahifa koʻrgazmasi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                „Galaktikada bir kun 2“ning asosiy rasmiy tasvirlari
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image 1 Card: Book Cover */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 shadow-md">
                <img
                  src={bookData.coverImage}
                  alt="Galaktikada bir kun 2 kitob muqovasi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-left">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold">
                  1-rasm: Rasmiy muqova
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  „Galaktikada bir kun 2“ (Saʼdullo Quronov)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ahmad qora tuynukning ulkan gravitatsion kuchi va yorqin akkresion diskini kemadan kuzatmoqda.
                </p>
                <div className="pt-1 text-xs text-cyan-400 font-mono">
                  ✦ Bosh qahramon Ahmad (12 yosh)
                </div>
              </div>
            </div>

            {/* Image 2 Card: Spaceship on Alien Planet */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 shadow-md">
                <img
                  src={bookData.spaceshipImage}
                  alt="Ahmad va jamoaning fazo kemasi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-left">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                  2-rasm: Fazo kemasi
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  Noyob Yulduzlararo Kema
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ahmad va bobosi yasagan, xaritalarda koʻrsatilmagan nomaʼlum sayyora yuzasiga qoʻngan zamonaviy kema.
                </p>
                <div className="pt-1 text-xs text-amber-300 font-mono">
                  ✦ Sayyoralararo tadqiqot apparati
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4-Column KPI / Metrics Strip */}
        <div className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 tabular-nums">20 – 50</p>
            <p className="text-xs text-slate-400 font-medium">Ixtiyoriy test savollari soni</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">1 Soʻz</p>
            <p className="text-xs text-slate-400 font-medium">Yozma javobli savollar maydoni</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400 tabular-nums">55+</p>
            <p className="text-xs text-slate-400 font-medium">Asar boʻyicha tayyorlangan bank</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">100%</p>
            <p className="text-xs text-slate-400 font-medium">Tahlil va yakuniy xulosa</p>
          </div>
        </div>

        {/* Quick Portals: Explore Each Section from Bosh sahifa */}
        <div className="mt-14 pt-10 border-t border-slate-900">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Sayt boʻlimlari va imkoniyatlari
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Quyidagi boʻlimlar orqali kitob olamiga chuqurroq shoʻngʻishingiz yoki bilimingizni sinashingiz mumkin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Portal 1: Ahmad and team */}
            <div 
              onClick={() => {
                soundEffects.playClick();
                onExploreAhmad();
              }}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  Ahmad va jamoa
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  12 yoshli yerlik vunderkind Ahmad, uning doʻsti Margol, kiber-xaker Moki hamda „Koinot javohiri“ maqsadi.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>Dossyeni ochish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Portal 2: Test 20-50 */}
            <div 
              onClick={() => {
                soundEffects.playClick();
                onStartQuiz();
              }}
              className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-cyan-500/5"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  Test (20–50 ta)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Savollar sonini tanlang (20 dan 50 tagacha), bitta soʻzli yoki variantli usulda ishlang va yakunda toʻliq tahlil oling.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-xs text-cyan-300 font-bold">
                <span>Testni boshlash</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Portal 3: Blits practice */}
            <div 
              onClick={() => {
                soundEffects.playClick();
                onStartPractice();
              }}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  Bitta soʻzli blits
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Savollarga tezkor yozma javob kiritish uchun interaktiv mashq (ishoralar va ketma-ketlik hisoblagichi bilan).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>Mashqni ochish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Portal 4: Author biography */}
            <div 
              onClick={() => {
                soundEffects.playClick();
                onExploreAuthor();
              }}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-slate-100 transition-colors">
                  Muallif tarjimai holi
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Saʼdullo Quronovning taʼlim bosqichlari (Andijon, OʻzMU), nashriyot faoliyati va rasmiy taqdimot maʼlumotlari.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Biografiyani oʻqish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Portal 5: Kosmik Pazl oʻyini */}
            <div 
              onClick={() => {
                soundEffects.playClick();
                onOpenPuzzle();
              }}
              className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-950/30 transition-all cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-4 shadow-md shadow-amber-500/5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                      Kosmik Pazl oʻyini
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                      Fazo kemasi, kitob bilan muallif surati va 2-kitob muqovasi boʻlaklarini 3x3, 4x4 yoki 5x5 kataklarda terib chiqing!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold shrink-0 self-end sm:self-auto">
                  <span>Pazlni oʻynash</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
