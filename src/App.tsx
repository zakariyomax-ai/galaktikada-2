import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AhmadSection } from './components/AhmadSection';
import { BookOverview } from './components/BookOverview';
import { AuthorSection } from './components/AuthorSection';
import { QuizSection } from './components/QuizSection';
import { SingleWordPractice } from './components/SingleWordPractice';
import { PuzzleGame } from './components/PuzzleGame';
import { Footer } from './components/Footer';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { soundEffects } from './utils/sound';

export type AppView = 'home' | 'ahmad' | 'book' | 'author' | 'quiz' | 'practice' | 'puzzle';

export default function App() {
  // Always initialize strictly on 'home' (Bosh sahifa)
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Ensure scroll is at the top on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  const navigateTo = (view: string) => {
    const validView = (view === 'hero' ? 'home' : view) as AppView;
    setCurrentView(validView);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col cosmic-grid cosmic-stars">
      {/* Top Bar Navigation */}
      <Navbar
        onNavigate={navigateTo}
        onStartQuiz={() => navigateTo('quiz')}
        activeSection={currentView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: Bosh sahifa (First view on site load) */}
        {currentView === 'home' && (
          <Hero
            onStartQuiz={() => navigateTo('quiz')}
            onExploreBook={() => navigateTo('book')}
            onExploreAuthor={() => navigateTo('author')}
            onStartPractice={() => navigateTo('practice')}
            onExploreAhmad={() => navigateTo('ahmad')}
            onOpenPuzzle={() => navigateTo('puzzle')}
          />
        )}

        {/* VIEW 2: Kosmik Pazl oʻyini */}
        {currentView === 'puzzle' && (
          <div className="space-y-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  navigateTo('home');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>
            <PuzzleGame />
          </div>
        )}

        {/* VIEW 3: Ahmad va uning jamoasi */}
        {currentView === 'ahmad' && (
          <div className="space-y-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  navigateTo('home');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>
            <AhmadSection />
          </div>
        )}

        {/* VIEW 4: Kitob haqida & Ilmiy faktlar */}
        {currentView === 'book' && (
          <div className="space-y-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  navigateTo('home');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>
            <BookOverview />
          </div>
        )}

        {/* VIEW 5: Muallif Saʼdullo Quronov tarjimai holi */}
        {currentView === 'author' && (
          <div className="space-y-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  navigateTo('home');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>
            <AuthorSection />
          </div>
        )}

        {/* VIEW 6: Test (20 tadan 50 tagacha) */}
        {currentView === 'quiz' && (
          <div className="space-y-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  navigateTo('home');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>
            <QuizSection />
          </div>
        )}

        {/* VIEW 7: Bitta soʻzli blits mashqi */}
        {currentView === 'practice' && (
          <div className="space-y-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  navigateTo('home');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>
            <SingleWordPractice />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
