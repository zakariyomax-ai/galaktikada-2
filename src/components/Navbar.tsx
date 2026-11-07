import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Menu, X, Home, User, BookOpen, Award, FileText } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onStartQuiz: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onStartQuiz, activeSection }) => {
  const [soundOn, setSoundOn] = useState(soundEffects.isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = soundEffects.toggleSound();
    setSoundOn(newState);
    if (newState) soundEffects.playClick();
  };

  const handleNavClick = (sectionId: string) => {
    soundEffects.playClick();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Zone 1: Wordmark Logo (Always returns to Bosh sahifa) */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-base sm:text-lg font-bold font-display tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-cyan-300 transition-colors">
            Galaktikada Bir Kun 2
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'home' || activeSection === 'hero' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Bosh sahifa</span>
          </button>
          
          <button
            onClick={() => handleNavClick('ahmad')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'ahmad' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Ahmad haqida</span>
          </button>
          
          <button
            onClick={() => handleNavClick('book')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'book' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kitob siri</span>
          </button>
          
          <button
            onClick={() => handleNavClick('author')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'author' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <span>Muallif</span>
          </button>
          
          <button
            onClick={() => handleNavClick('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'quiz' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Test (20–50)</span>
          </button>

          <button
            onClick={() => handleNavClick('practice')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'practice' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blits</span>
          </button>

          <button
            onClick={() => handleNavClick('puzzle')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'puzzle' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pazl</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action + sound toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            aria-label="Ovozni yoqish/oʻchirish"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-colors cursor-pointer"
            title={soundOn ? "Ovozni oʻchirish" : "Ovozni yoqish"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onStartQuiz();
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-lg hover:from-cyan-300 hover:to-sky-300 transition-all shadow-sm shadow-cyan-500/20 whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
          >
            Test topshirish
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 cursor-pointer"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1.5">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'home' || activeSection === 'hero' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Bosh sahifa
          </button>
          <button
            onClick={() => handleNavClick('ahmad')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'ahmad' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Ahmad va jamoa
          </button>
          <button
            onClick={() => handleNavClick('book')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'book' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Kitob haqida
          </button>
          <button
            onClick={() => handleNavClick('author')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'author' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Muallif haqida
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'quiz' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Test (20–50 talik)
          </button>
          <button
            onClick={() => handleNavClick('practice')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'practice' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Bitta soʻzli blits
          </button>
          <button
            onClick={() => handleNavClick('puzzle')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === 'puzzle' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-200 hover:text-cyan-400'
            }`}
          >
            Kosmik Pazl oʻyini
          </button>
        </div>
      )}
    </header>
  );
};
