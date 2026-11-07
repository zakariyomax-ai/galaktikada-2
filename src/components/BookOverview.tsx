import React, { useState } from 'react';
import { bookData } from '../data/bookData';
import { Sparkles, Users, Atom, Quote, BookCheck } from 'lucide-react';
import { soundEffects } from '../utils/sound';

export const BookOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plot' | 'characters' | 'science'>('plot');

  return (
    <section id="book" className="py-16 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
              <span>Asar tavsifi va qahramonlar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
              „Galaktikada bir kun 2“ olamiga sayohat
            </h2>
          </div>

          {/* Interactive filter tabs (functional buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('plot');
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'plot'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Asar syujeti
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('characters');
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'characters'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Qahramonlar
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('science');
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'science'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ilmiy faktlar
            </button>
          </div>
        </div>

        {/* Tab 1: Plot and Themes */}
        {activeTab === 'plot' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Kosmik sarguzasht davom etmoqda: Yangi galaktik sektorlar
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {bookData.summary}
                </p>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {bookData.extendedPlot}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2.5">
                    Asarning bosh gʻoyalari:
                  </p>
                  <ul className="space-y-2">
                    {bookData.keyThemes.map((theme, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
                  <img
                    src={bookData.bannerImage}
                    alt="Kosmik tadqiqot kemasi"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200">
                    <p className="font-semibold text-white text-sm">Yulduzlararo Kvant Kemasi</p>
                    <p className="text-slate-300">Ahmad va bobosi koinot boʻylab parvoz qilgan mukammal ilmiy apparat</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Book Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {bookData.quotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/50 flex flex-col justify-between relative"
                >
                  <Quote className="w-5 h-5 text-cyan-500/40 mb-3" />
                  <p className="text-sm italic text-slate-200 leading-relaxed">
                    {quote}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/50 text-xs text-slate-500 font-medium">
                    „Galaktikada bir kun 2“ asaridan
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Characters */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bookData.characters.map((char, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-medium mb-2">
                    <span>0{idx + 1}</span>
                    <span className="text-slate-400">{char.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{char.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{char.role}</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {char.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-cyan-400/80">
                  <Users className="w-3.5 h-3.5" />
                  <span>Asosiy ishtirokchi</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Scientific Concepts */}
        {activeTab === 'science' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookData.scienceConcepts.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Atom className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-cyan-300 font-mono">{item.shortDesc}</p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-slate-200 font-medium">Asardagi ifodasi:</strong> {item.bookContext}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
