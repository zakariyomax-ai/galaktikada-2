import React, { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../utils/sound';
import { Sparkles, RotateCcw, Eye, EyeOff, Award, CheckCircle2, Trophy, Clock, Footprints, Grid } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PuzzleImage {
  id: string;
  title: string;
  badge: string;
  src: string;
  description: string;
}

const PUZZLE_IMAGES: PuzzleImage[] = [
  {
    id: 'spaceship',
    title: "Ahmadning fazo kemasi",
    badge: "Yulduzlararo kema",
    src: "/assets/aistudio/image_5977c659.png",
    description: "Nomaʼlum sayyora sirtiga qoʻngan kumushrang kosmik apparat"
  },
  {
    id: 'author_book',
    title: "Saʼdullo Quronov kitob bilan",
    badge: "Muallif va asar",
    src: "/assets/aistudio/image_031920e5.png",
    description: "Muallif Saʼdullo Quronov „Galaktikada bir kun“ kitobi bilan"
  },
  {
    id: 'book_cover',
    title: "„Galaktikada bir kun 2“ muqovasi",
    badge: "Rasmiy muqova",
    src: "/assets/aistudio/image_b9fb6f50.png",
    description: "Ahmad va qora tuynukning ulkan gravitatsion nurlanishi"
  },
  {
    id: 'ahmad_cockpit',
    title: "Ahmad qora tuynuk qarshisida",
    badge: "Bosh qahramon",
    src: "/assets/aistudio/image_1821e525.png",
    description: "12 yoshli vunderkind Ahmad fazo kemasi illyuminatorida"
  }
];

export const PuzzleGame: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<PuzzleImage>(PUZZLE_IMAGES[0]);
  const [gridSize, setGridSize] = useState<number>(3); // 3x3 default, 4x4, 5x5
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Initialize and shuffle puzzle
  const initPuzzle = (size: number = gridSize, img: PuzzleImage = selectedImage) => {
    const totalTiles = size * size;
    const initial = Array.from({ length: totalTiles }, (_, i) => i);
    
    // Fisher-Yates shuffle ensuring it's not already solved
    let shuffled = [...initial];
    let isSame = true;
    while (isSame) {
      shuffled = [...initial].sort(() => Math.random() - 0.5);
      isSame = shuffled.every((val, idx) => val === idx);
    }

    setTiles(shuffled);
    setSelectedTileIndex(null);
    setMoves(0);
    setSeconds(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    initPuzzle(gridSize, selectedImage);
  }, [gridSize, selectedImage]);

  // Timer loop
  useEffect(() => {
    if (!isCompleted) {
      timerRef.current = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isCompleted]);

  // Handle tile click to swap
  const handleTileClick = (index: number) => {
    if (isCompleted) return;

    soundEffects.playClick();

    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else if (selectedTileIndex === index) {
      // Deselect if clicking the same tile
      setSelectedTileIndex(null);
    } else {
      // Swap tiles
      const newTiles = [...tiles];
      const temp = newTiles[selectedTileIndex];
      newTiles[selectedTileIndex] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedTileIndex(null);
      setMoves(prev => prev + 1);

      // Check if solved
      const solved = newTiles.every((val, idx) => val === idx);
      if (solved) {
        setIsCompleted(true);
        soundEffects.playVictory();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Fallback
        }
      }
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="puzzle" className="py-16 border-t border-slate-900 bg-slate-950/70 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interaktiv oʻyin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            Kosmik Pazl — Rasmlarni terish oʻyini
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            Ahmadning fazo kemasi, asar muqovasi yoki muallif Saʼdullo Quronov suratini boʻlaklardan toʻliq yigʻing!
          </p>
        </div>

        {/* Puzzle Selector & Control Deck */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 mb-8 space-y-6 shadow-xl">
          
          {/* Step 1: Select Image */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-white uppercase tracking-wider">
                1. Pazl uchun rasmni tanlang:
              </span>
              <span className="text-cyan-400 font-mono font-medium">{selectedImage.title}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PUZZLE_IMAGES.map(img => {
                const isSelected = selectedImage.id === img.id;
                return (
                  <button
                    key={img.id}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedImage(img);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/30 ring-2 ring-cyan-500/20'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                      <img
                        src={img.src}
                        alt={img.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white truncate">{img.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{img.badge}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Difficulty & Helpers */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Difficulty buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 mr-1">Daraja:</span>
              {[
                { label: "Oson (3x3)", val: 3 },
                { label: "Oʻrta (4x4)", val: 4 },
                { label: "Qiyin (5x5)", val: 5 }
              ].map(d => (
                <button
                  key={d.val}
                  onClick={() => {
                    soundEffects.playClick();
                    setGridSize(d.val);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    gridSize === d.val
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Utility Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNumbers(!showNumbers)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  showNumbers
                    ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
                title="Boʻlaklar ustidagi tartib raqamlarini yoqish yoki oʻchirish"
              >
                <span>Raqamlar: {showNumbers ? "Yoqilgan" : "Oʻchiq"}</span>
              </button>

              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 bg-slate-950 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {showOriginal ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>Asl nusxa</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  initPuzzle();
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 hover:border-cyan-400/50 bg-slate-800 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                title="Pazlni qayta aralashtirish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Qayta aralashtirish</span>
              </button>
            </div>

          </div>

        </div>

        {/* Puzzle Board & Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Interactive Grid */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* Top Scorebar */}
            <div className="w-full max-w-[500px] flex items-center justify-between px-2 mb-3 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-cyan-400" />
                <span>Qadamlar: <strong className="text-white">{moves}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Vaqt: <strong className="text-white">{formatTime(seconds)}</strong></span>
              </div>
            </div>

            {/* Puzzle Tiles Container */}
            <div className="relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl max-w-[500px] w-full">
              
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-cyan-500/10 blur-md pointer-events-none" />

              <div
                className="relative grid gap-1.5 w-full aspect-square rounded-xl overflow-hidden bg-slate-950"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
                }}
              >
                {tiles.map((tilePos, index) => {
                  const isSelected = selectedTileIndex === index;
                  const isCorrectPos = tilePos === index;

                  // Original coordinates of this slice
                  const origCol = tilePos % gridSize;
                  const origRow = Math.floor(tilePos / gridSize);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTileClick(index)}
                      className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-150 cursor-pointer focus:outline-none ${
                        isSelected
                          ? 'ring-4 ring-cyan-400 scale-[0.98] z-20 shadow-lg'
                          : isCorrectPos
                          ? 'ring-1 ring-emerald-500/40'
                          : 'hover:brightness-110'
                      }`}
                    >
                      {/* Background Slice */}
                      <div
                        className="w-full h-full bg-no-repeat"
                        style={{
                          backgroundImage: `url(${selectedImage.src})`,
                          backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                          backgroundPosition: `${(origCol / (gridSize - 1)) * 100}% ${(origRow / (gridSize - 1)) * 100}%`
                        }}
                      />

                      {/* Number Overlay Hint */}
                      {showNumbers && (
                        <div className="absolute top-1 left-1 w-5 h-5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-[10px] font-mono font-bold text-cyan-300 flex items-center justify-center">
                          {tilePos + 1}
                        </div>
                      )}

                      {/* Correct Position Indicator */}
                      {isCorrectPos && (
                        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instructions */}
              <p className="text-center text-[11px] text-slate-400 mt-3">
                {selectedTileIndex !== null
                  ? "Endi almashtirmoqchi boʻlgan ikkinchi boʻlakni bosing!"
                  : "Boʻlakni tanlang va boshqa boʻlak bilan oʻrnini almashtiring."}
              </p>

            </div>

            {/* Victory Modal Overlay */}
            {isCompleted && (
              <div className="mt-6 p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 max-w-[500px] w-full text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Ajoyib! Siz pazlni muvaffaqiyatli terdingiz!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {moves} ta harakat va {formatTime(seconds)} vaqt ichida tasvir toʻliq tiklandi.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      initPuzzle();
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
                  >
                    Qayta oʻynash
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      const nextIdx = (PUZZLE_IMAGES.findIndex(p => p.id === selectedImage.id) + 1) % PUZZLE_IMAGES.length;
                      setSelectedImage(PUZZLE_IMAGES[nextIdx]);
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-medium text-xs hover:bg-slate-700 cursor-pointer"
                  >
                    Keyingi rasmga oʻtish
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Original Image Reference */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Asl rasm namunasi
                </span>
                <span className="text-[11px] font-mono text-cyan-400">{selectedImage.badge}</span>
              </div>

              <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{selectedImage.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <p>✦ <strong>Qoidalar:</strong></p>
                <p>1. Istalgan bir boʻlakni bosing.</p>
                <p>2. Keyin boshqa bir boʻlakni bosing — ular oʻrni almashadi.</p>
                <p>3. Yashil nuqta boʻlak oʻz toʻgʻri oʻrnida ekanini bildiradi.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
