import React from 'react';
import { Sparkles, Leaf, Heart } from 'lucide-react';
import Diya from '../../festive/Diya.jsx';
import MarigoldGarland from '../../festive/MarigoldGarland.jsx';

export default function EcoEnvironment({
  ecoSpirit = 50,
  situationTitle = '',
  feedbackConsequence = null,
  isEcoChoice = null,
  className = '',
}) {
  const isHighSpirit = ecoSpirit >= 80;
  const isChampion = ecoSpirit >= 100;
  const isLowSpirit = ecoSpirit < 50;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-stone-950/90 via-stone-900/80 to-stone-950/95 p-3 sm:p-5 transition-all duration-700 select-none ${
        isChampion
          ? 'shadow-xl shadow-emerald-500/20 border-emerald-500/40'
          : isHighSpirit
          ? 'border-emerald-500/30 shadow-md shadow-emerald-950/30'
          : ''
      } ${className}`}
    >
      {/* Top Garland Layer */}
      <div className="absolute -top-3 left-0 right-0 z-10 pointer-events-none opacity-80">
        <MarigoldGarland count={9} />
      </div>

      {/* Decorative Aura / Festive Lighting */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isChampion
            ? 'opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.35)_0%,transparent_70%)]'
            : isHighSpirit
            ? 'opacity-30 bg-[radial-gradient(circle_at_50%_40%,rgba(52,211,153,0.25)_0%,transparent_70%)]'
            : 'opacity-20 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.2)_0%,transparent_70%)]'
        }`}
      />

      {/* Subtle Arch & Pillar Mandap Illustration */}
      <div className="relative z-10 flex flex-col items-center justify-center py-2 sm:py-3">
        {/* Sacred Mandap Archway */}
        <div className="w-full max-w-xl mx-auto flex items-center justify-between px-2 sm:px-6 mb-1">
          {/* Left Diya & Mango Leaf Spray */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Diya size="sm" isGlowing={true} />
            <div className="flex flex-col text-emerald-400">
              <Leaf
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${
                  isHighSpirit ? 'scale-110 text-emerald-300 rotate-6' : 'text-emerald-500/70'
                }`}
              />
              {isHighSpirit && (
                <Leaf className="w-3 h-3 text-emerald-400 -rotate-12 -mt-1" />
              )}
            </div>
          </div>

          {/* Central Toran Banner / Emblem */}
          <div className="flex flex-col items-center">
            <div
              className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 transition-all duration-500 ${
                isChampion
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/30'
                  : isHighSpirit
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-950/60 border-amber-500/30 text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Festival Pavilion</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            {/* Reassuring / Encouraging Banner */}
            <p className="text-[11px] text-stone-400 mt-1 font-medium text-center">
              {isChampion
                ? '🌿 Pure Harmony with Nature • Lord Ganesha is Delighted!'
                : isHighSpirit
                ? '🌱 Blossoming with sustainable devotion and green joy'
                : isLowSpirit
                ? "Let's bring more Green Spirit with thoughtful choices"
                : 'Balanced celebration honoring tradition & Mother Earth'}
            </p>
          </div>

          {/* Right Diya & Mango Leaf Spray */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex flex-col items-end text-emerald-400">
              <Leaf
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${
                  isHighSpirit ? 'scale-110 text-emerald-300 -rotate-6' : 'text-emerald-500/70'
                }`}
              />
              {isHighSpirit && (
                <Leaf className="w-3 h-3 text-emerald-400 rotate-12 -mt-1" />
              )}
            </div>
            <Diya size="sm" isGlowing={true} />
          </div>
        </div>

        {/* Dynamic Consequence / Situation Feedback Overlay Banner */}
        {feedbackConsequence ? (
          <div
            className={`w-full max-w-lg mx-auto mt-2 px-3 py-2 rounded-xl border text-center transition-all animate-fade-in ${
              isEcoChoice
                ? 'bg-emerald-950/85 border-emerald-400/60 text-emerald-100 shadow-lg shadow-emerald-500/20'
                : 'bg-amber-950/85 border-amber-400/40 text-amber-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
              {isEcoChoice ? (
                <Heart className="w-4 h-4 text-emerald-300 inline fill-emerald-300/30" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-300 inline" />
              )}
              <span>{feedbackConsequence}</span>
            </div>
          </div>
        ) : (
          <div className="h-2" />
        )}
      </div>

      {/* Extra floating decorative blossoms for High Eco Spirit */}
      {isHighSpirit && (
        <div className="absolute inset-0 pointer-events-none flex justify-around items-end pb-2 opacity-60">
          <span className="text-amber-300 text-xs animate-pulse">🌼</span>
          <span className="text-emerald-300 text-xs animate-bounce">🌿</span>
          <span className="text-red-400 text-xs animate-pulse">🌺</span>
          <span className="text-emerald-300 text-xs animate-bounce">🌱</span>
          <span className="text-amber-300 text-xs animate-pulse">🌼</span>
        </div>
      )}
    </div>
  );
}
