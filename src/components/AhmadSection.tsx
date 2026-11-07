import React, { useState } from 'react';
import { bookData } from '../data/bookData';
import { Shield, Cpu, Sword, Compass, Sparkles, User, Database, Coins, Terminal } from 'lucide-react';
import { soundEffects } from '../utils/sound';

export const AhmadSection: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);

  const ahmad = bookData.characters[0];
  const margol = bookData.characters[1];
  const moki = bookData.characters[2];

  return (
    <section id="ahmad" className="py-16 border-t border-slate-900 bg-slate-950 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[350px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
            <span>2-kitob markaziy qahramonlari</span>
            <span aria-hidden="true">·</span>
            <span>Syujet va xarakterlar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            Ahmad va uning koinotdagi sadoqatli jamoasi
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            12 yoshli vunderkind Ahmad, uning koinotdagi doʻsti Margol hamda guruhning kiber-xakeri Moki bilan „Koinot javohiri“ sirlari sari sayohat.
          </p>
        </div>

        {/* 2-Column Showcase: Official Artwork + Ahmad Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Ahmad Official Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[420px]">
              
              {/* Glowing backlight matching the black hole accretion disk */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-amber-500/30 via-indigo-600/30 to-cyan-500/30 blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                <div className="aspect-square relative overflow-hidden bg-slate-950">
                  <img
                    src={bookData.ahmadImage}
                    alt="Ahmad — Galaktikada bir kun 2 qahramoni"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-xs font-semibold text-cyan-300">
                      2-kitob bosh qahramoni
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-mono text-amber-300 uppercase tracking-wider">12 yoshli yerlik vunderkind</p>
                    <h3 className="text-2xl font-bold text-white font-display">Ahmad</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Kvant mexanikasi va torlar nazariyasi dahosi
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Qora tuynuk qarshisida</span>
                  <span className="font-mono text-cyan-400">Gravitatsiya manevri</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Detailed Dossier & Character Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Ahmad haqida (12 yoshli yerlik vunderkind)
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {ahmad.description}
              </p>

              {/* Character traits pills / unboxed list */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                {ahmad.traits?.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-medium"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Friends: Margol and Moki */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Margol */}
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>Margol</span>
                  </h4>
                  <span className="text-xs font-mono text-indigo-300">{margol.badge}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Ahmadning koinotdagi eng yaqin doʻsti</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {margol.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-amber-300/90 font-mono">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Koinot valyutasi: Lungi tashvishi</span>
                </div>
              </div>

              {/* Moki */}
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Moki</span>
                  </h4>
                  <span className="text-xs font-mono text-cyan-300">{moki.badge}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Guruhning kiber-xakeri va texnik yordamchisi</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {moki.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-cyan-300/90 font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Tizimlarni buzish ustasi</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Section 2: Rejalar va Maqsadlar */}
        <div className="mb-16">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              2. Jamoaning rejalari va maqsadlari
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Ahmad va uning doʻstlari koinot boʻylab qanday ulkan vazifalarni hal qiladilar?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bookData.teamPlans.map((plan, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    {idx === 0 && <Shield className="w-5 h-5" />}
                    {idx === 1 && <Cpu className="w-5 h-5" />}
                    {idx === 2 && <Sword className="w-5 h-5" />}
                  </div>

                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-medium">{plan.subtitle}</span>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                      {plan.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 text-xs text-slate-500">
                  Reja 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Jamoa qayerga boradi? */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 relative">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              3. Jamoa qayerga boradi? (Sayohat manzillari)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              2-kitobdagi xavfli, oʻrganilmagan koordinatalar va axborot shaharchalari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookData.destinations.map((dest, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <Compass className="w-4 h-4" />
                    <span>{dest.subtitle}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {dest.title}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {dest.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {dest.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Concluding Quote Highlight from the user */}
          <div className="mt-8 p-4 sm:p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-center">
            <p className="text-sm sm:text-base font-medium text-cyan-200 italic">
              „Ushbu qismda Ahmad oʻzining oʻtkir zehni hamda sodiq doʻstlari Margol va Mokining yordami bilan har qanday qiyin toʻsiqlarni yengib oʻtadi.“
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
