import React from 'react';
import { Sparkles, BookOpen, Heart } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (id: string) => {
    soundEffects.playClick();
    onNavigate(id);
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm text-white font-display">Galaktikada Bir Kun 2</p>
              <p className="text-slate-400">Muallif: Saʼdullo Quronov</p>
            </div>
          </div>

          {/* Quick single-line navigation links */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => handleNav('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => handleNav('book')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Kitob haqida
            </button>
            <button
              onClick={() => handleNav('author')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Muallif tarjimai holi
            </button>
            <button
              onClick={() => handleNav('quiz')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Test (20–50 savol)
            </button>
            <button
              onClick={() => handleNav('practice')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bitta soʻzli mashq
            </button>
            <button
              onClick={() => handleNav('puzzle')}
              className="hover:text-cyan-400 transition-colors cursor-pointer text-amber-300 font-semibold"
            >
              Kosmik Pazl
            </button>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>
            © {new Date().getFullYear()} „Galaktikada bir kun 2“ ilmiy-fantastik qissasi taʼlimiy platformasi.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Oʻzbek bolalar adabiyoti va „Mutolaa“ loyihasi rivoji uchun</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
