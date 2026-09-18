import React from 'react';
import { Sparkles, Bell } from 'lucide-react';
import { getCollectionItemById } from '../../utils/collectionUnlocks.js';

/**
 * CollectionDecorVisuals
 * 
 * Renders decorative festival adornments in Grand Morya based on the player's
 * active selections from their Festival Collection.
 * 
 * 100% visual presentation - zero impact on game mechanics or scoring.
 */
export default function CollectionDecorVisuals({
  activeSelections = {},
  isAwake = true,
  isFullTransformation = true,
}) {
  const selectedDiya = getCollectionItemById(activeSelections.diyas);
  const selectedFlower = getCollectionItemById(activeSelections.flowers);
  const selectedPandal = getCollectionItemById(activeSelections.pandal);
  const selectedRangoli = getCollectionItemById(activeSelections.rangoli);
  const selectedEco = getCollectionItemById(activeSelections.eco);

  if (!isAwake) return null;

  return (
    <div
      id="collection-decor-visuals"
      className="absolute inset-0 pointer-events-none z-25 overflow-hidden"
      aria-hidden="true"
    >
      {/* =========================================================
          1. PANDAL DECORATION SELECTION
         ========================================================= */}
      {selectedPandal?.id === 'royal_toran' && (
        <div className="absolute top-0 inset-x-0 flex justify-center z-30 animate-fade-in">
          <div className="w-full max-w-xl h-8 bg-gradient-to-r from-red-900 via-rose-800 to-red-900 border-b-2 border-yellow-400/80 shadow-lg flex items-center justify-around px-4">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="text-xs text-yellow-300 filter drop-shadow">
                {i % 2 === 0 ? '🔱' : '✨'}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedPandal?.id === 'golden_bells' && (
        <div className="absolute top-2 inset-x-0 flex justify-center z-30">
          <div className="w-full max-w-lg flex justify-between px-6">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="flex flex-col items-center animate-bounce-subtle motion-reduce:animate-none"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-yellow-500" />
                <span className="text-xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                  🔔
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPandal?.id === 'festival_arch' && (
        <div className="absolute top-0 inset-x-0 flex justify-between px-4 sm:px-8 z-30">
          <div className="text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_rgba(250,204,21,0.7)] animate-pulse motion-reduce:animate-none">
            🦚
          </div>
          <div className="text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_rgba(250,204,21,0.7)] scale-x-[-1] animate-pulse motion-reduce:animate-none">
            🦚
          </div>
        </div>
      )}

      {/* =========================================================
          2. ECO DECORATION SELECTION
         ========================================================= */}
      {selectedEco?.id === 'eco_lantern' && (
        <div className="absolute top-4 inset-x-0 flex justify-between px-3 sm:px-10 z-30">
          <div className="flex flex-col items-center animate-swing motion-reduce:animate-none">
            <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]">
              🏮
            </span>
          </div>
          <div className="flex flex-col items-center animate-swing motion-reduce:animate-none" style={{ animationDelay: '0.5s' }}>
            <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]">
              🏮
            </span>
          </div>
        </div>
      )}

      {selectedEco?.id === 'bamboo_decor' && (
        <div className="absolute inset-y-0 inset-x-0 flex justify-between px-1 pointer-events-none opacity-40 sm:opacity-70">
          <div className="w-4 h-full border-r-2 border-amber-600/40 bg-[repeating-linear-gradient(0deg,#78350f,#78350f_8px,#92400e_8px,#92400e_16px)]" />
          <div className="w-4 h-full border-l-2 border-amber-600/40 bg-[repeating-linear-gradient(0deg,#78350f,#78350f_8px,#92400e_8px,#92400e_16px)]" />
        </div>
      )}

      {selectedEco?.id === 'clay_pot_decor' && (
        <div className="absolute bottom-16 inset-x-0 flex justify-between px-8 sm:px-16 z-20">
          <div className="text-2xl sm:text-3xl filter drop-shadow-md">
            🏺
          </div>
          <div className="text-2xl sm:text-3xl filter drop-shadow-md">
            🏺
          </div>
        </div>
      )}

      {selectedEco?.id === 'leaf_garland' && (
        <div className="absolute top-12 inset-x-0 flex justify-between px-4 sm:px-12 z-20">
          <div className="flex flex-col gap-1 items-center opacity-80">
            <span className="text-lg">🌿</span>
            <span className="text-lg">🌱</span>
          </div>
          <div className="flex flex-col gap-1 items-center opacity-80">
            <span className="text-lg">🌿</span>
            <span className="text-lg">🌱</span>
          </div>
        </div>
      )}

      {/* =========================================================
          3. FLOWER SELECTION AURA
         ========================================================= */}
      {selectedFlower?.id === 'lotus_flowers' && (
        <div className="absolute top-24 sm:top-28 inset-x-0 flex justify-center gap-24 sm:gap-40 z-20">
          <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(244,114,182,0.8)] animate-pulse">
            🪷
          </span>
          <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(244,114,182,0.8)] animate-pulse">
            🪷
          </span>
        </div>
      )}

      {selectedFlower?.id === 'rose_garland' && (
        <div className="absolute top-20 inset-x-0 flex justify-center gap-16 sm:gap-32 z-20">
          <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(220,38,38,0.7)]">
            🌹
          </span>
          <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(220,38,38,0.7)]">
            🌹
          </span>
        </div>
      )}

      {selectedFlower?.id === 'flower_basket' && (
        <div className="absolute bottom-20 left-10 sm:left-24 z-25">
          <span className="text-2xl sm:text-3xl filter drop-shadow-lg">
            🧺
          </span>
        </div>
      )}

      {/* =========================================================
          4. RANGOLI ACCENTS
         ========================================================= */}
      {selectedRangoli?.id === 'peacock_rangoli' && (
        <div className="absolute bottom-12 inset-x-0 flex justify-center z-15">
          <div className="w-56 sm:w-72 h-8 rounded-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm" />
        </div>
      )}

      {selectedRangoli?.id === 'ganesha_rangoli' && (
        <div className="absolute bottom-10 inset-x-0 flex justify-center z-15">
          <div className="w-48 sm:w-64 h-12 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-500/20 blur-md animate-pulse" />
        </div>
      )}

      {/* =========================================================
          5. DIYA RADIANCE
         ========================================================= */}
      {selectedDiya?.id === 'golden_diya' && (
        <div className="absolute bottom-4 inset-x-0 flex justify-between px-6 sm:px-14 z-35">
          <div className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_12px_rgba(250,204,21,1)] animate-pulse motion-reduce:animate-none">
              👑
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_12px_rgba(250,204,21,1)] animate-pulse motion-reduce:animate-none">
              👑
            </span>
          </div>
        </div>
      )}

      {selectedDiya?.id === 'star_diya' && (
        <div className="absolute bottom-6 inset-x-0 flex justify-between px-8 sm:px-16 z-35">
          <span className="text-lg filter drop-shadow-[0_0_10px_rgba(253,224,71,0.9)] animate-spin-slow motion-reduce:animate-none">
            ⭐
          </span>
          <span className="text-lg filter drop-shadow-[0_0_10px_rgba(253,224,71,0.9)] animate-spin-slow motion-reduce:animate-none">
            ⭐
          </span>
        </div>
      )}

      {selectedDiya?.id === 'lotus_diya' && (
        <div className="absolute bottom-6 inset-x-0 flex justify-between px-8 sm:px-16 z-35">
          <span className="text-lg filter drop-shadow-[0_0_10px_rgba(251,113,133,0.9)]">
            🪷
          </span>
          <span className="text-lg filter drop-shadow-[0_0_10px_rgba(251,113,133,0.9)]">
            🪷
          </span>
        </div>
      )}

      {/* Active Collection Adornments Badge */}
      {isFullTransformation && (
        <div className="absolute top-2 right-2 z-40 opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/80 border border-amber-400/50 text-[10px] text-amber-300 font-bold backdrop-blur-md shadow-md">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>Adorned Mandap</span>
          </div>
        </div>
      )}
    </div>
  );
}
