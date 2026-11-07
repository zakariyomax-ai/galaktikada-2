import React, { useState } from 'react';
import { authorData } from '../data/authorData';
import { GraduationCap, Briefcase, Award, Check, Copy, UserCheck, Calendar, MapPin } from 'lucide-react';
import { soundEffects } from '../utils/sound';

export const AuthorSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState<'primary' | 'secondary' | 'book'>('book');

  const getActivePhotoSrc = () => {
    if (activePhoto === 'book') return authorData.portraitWithBook;
    if (activePhoto === 'secondary') return authorData.portraitSecondary;
    return authorData.portraitPrimary;
  };

  const copyBioText = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(authorData.presentationNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="author" className="py-16 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
            <span>Muallif haqida maʼlumot</span>
            <span aria-hidden="true">·</span>
            <span>Yozuvchi va filolog olim</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            Tarjimai hol va taʼlim yoʻli
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Saʼdullo Quronov — bolalar adabiyoti, ilmiy-fantastika hamda yangi avlod darsliklari yaratishda yetakchi olim va noshir.
          </p>
        </div>

        {/* Author Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Photos and Quick Profile */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-900">
                <img
                  src={getActivePhotoSrc()}
                  alt="Saʼdullo Quronov surati"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>
                      {activePhoto === 'book' ? "Muallif kitob bilan" : activePhoto === 'secondary' ? "Rasmiy portret (Kostyum)" : "Rasmiy portret"}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {authorData.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {authorData.birthDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {authorData.birthPlace}
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo switcher (functional buttons) */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Rasmlar:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setActivePhoto('book');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      activePhoto === 'book' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Kitob bilan
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setActivePhoto('primary');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      activePhoto === 'primary' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Portret
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setActivePhoto('secondary');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      activePhoto === 'secondary' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Kostyumda
                  </button>
                </div>
              </div>
            </div>

            {/* Quick summary card */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Qisqacha maʼlumot
                </span>
                <button
                  onClick={copyBioText}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Matnni nusxalash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Nusxalandi!" : "Nusxalash"}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {authorData.bioSummary}
              </p>
            </div>

          </div>

          {/* Right Column: Detailed Presentation and Education stages */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Presentation Card (exact text requested) */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Muallif haqida taqdimot lavhasi — Saʼdullo Quronov
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Taqdimot lavhasidagi maʼlumotlar koʻchirmasi · Asl matn
                  </p>
                </div>
                <div className="hidden sm:block text-xs font-mono text-cyan-400/90 border border-cyan-500/20 px-2 py-0.5 rounded">
                  Hujjatli maʼlumot
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <p className="text-cyan-300 font-medium">
                  Muallif haqida (rasmdagi maʼlumotlar):
                </p>
                <p>
                  {authorData.presentationNote}
                </p>
              </div>
            </div>

            {/* Taʼlim bosqichlari */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Taʼlim bosqichlari
                </h3>
              </div>

              <div className="space-y-3.5">
                {authorData.educationStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/50 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm sm:text-base font-semibold text-white">
                        {stage.institution}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">
                        {stage.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Mehnat faoliyati va xronologiya */}
        <div className="pt-8 border-t border-slate-900">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Mehnat faoliyati va xronologiya
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-2xl">
            Olim va yozuvchi sifatida turli nufuzli nashriyotlar hamda taʼlim muassasalarida faoliyat yuritgan:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {authorData.careerMilestones.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-cyan-400 font-semibold">{item.years}</span>
                    <span className="text-slate-500">Bosqich 0{idx + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5 leading-snug">
                    {item.organization}
                  </h4>
                  <p className="text-xs text-indigo-300 font-medium mb-3">
                    {item.role}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-500">
                  {idx === authorData.careerMilestones.length - 1 ? "Faoliyat davom etmoqda" : "Muvaffaqiyatli yakunlangan"}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
