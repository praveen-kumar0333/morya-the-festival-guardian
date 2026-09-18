import React from 'react';
import { Check, Sparkles, Palette, Trophy, Leaf, Star } from 'lucide-react';
import { SCREENS, STAGES } from '../../constants/gameData.js';

export default function ProgressIndicator({ currentScreen, className = '', id }) {
  const stageIcons = {
    [SCREENS.PANDAL_BUILD]: Sparkles,
    [SCREENS.RANGOLI_RUSH]: Palette,
    [SCREENS.MODAK_MUSHAK]: Trophy,
    [SCREENS.ECO_CELEBRATION]: Leaf,
  };

  const getStageStatus = (stageId, index) => {
    const screenOrder = [
      SCREENS.PANDAL_BUILD,
      SCREENS.RANGOLI_RUSH,
      SCREENS.MODAK_MUSHAK,
      SCREENS.ECO_CELEBRATION,
      SCREENS.GRAND_MORYA,
    ];
    const currentIndex = screenOrder.indexOf(currentScreen);
    const stageIndex = screenOrder.indexOf(stageId);

    if (currentScreen === SCREENS.GRAND_MORYA || stageIndex < currentIndex) {
      return 'completed';
    }
    if (stageIndex === currentIndex) {
      return 'active';
    }
    return 'upcoming';
  };

  return (
    <nav
      id={id || 'stage-progress-nav'}
      aria-label="Festival Preparation Stages"
      className={`w-full max-w-2xl mx-auto px-2 sm:px-4 py-2 ${className}`}
    >
      <div className="flex items-center justify-between relative">
        {/* Connecting track line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-amber-950/80 border-t border-b border-amber-500/20 z-0" />

        {STAGES.map((stage, index) => {
          const status = getStageStatus(stage.id, index);
          const Icon = stageIcons[stage.id] || Sparkles;

          return (
            <div
              key={stage.id}
              className="relative z-10 flex flex-col items-center group cursor-default"
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-xs sm:text-sm border-2 ${
                  status === 'completed'
                    ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-stone-950 border-amber-300 shadow-md shadow-amber-900/40'
                    : status === 'active'
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-300 shadow-lg shadow-orange-950/60 ring-4 ring-amber-400/20 scale-110'
                    : 'bg-stone-900/90 text-amber-400/50 border-amber-500/20'
                }`}
              >
                {status === 'completed' ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              {/* Stage label (visible on tablet/desktop, compact indicator on mobile) */}
              <span
                className={`mt-1.5 text-[10px] sm:text-xs font-semibold tracking-wide transition-colors text-center hidden sm:block ${
                  status === 'active'
                    ? 'text-amber-300 font-bold'
                    : status === 'completed'
                    ? 'text-amber-400/90'
                    : 'text-amber-500/50'
                }`}
              >
                {stage.title}
              </span>
            </div>
          );
        })}

        {/* Grand Morya Final Destination */}
        <div className="relative z-10 flex flex-col items-center group cursor-default">
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
              currentScreen === SCREENS.GRAND_MORYA
                ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-300 text-stone-950 border-yellow-200 shadow-lg shadow-amber-500/40 ring-4 ring-amber-400/30 scale-115 animate-bounce'
                : 'bg-stone-900/90 text-amber-400/50 border-amber-500/20'
            }`}
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </div>
          <span
            className={`mt-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-center hidden sm:block ${
              currentScreen === SCREENS.GRAND_MORYA
                ? 'text-yellow-300 font-bold'
                : 'text-amber-500/50'
            }`}
          >
            Grand Morya
          </span>
        </div>
      </div>
    </nav>
  );
}
