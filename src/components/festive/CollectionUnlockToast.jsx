import React from 'react';
import { Sparkles, X, Gift } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { RARITY_CONFIG } from '../../constants/collectionData.js';
import CelebrationBurst from './CelebrationBurst.jsx';

export default function CollectionUnlockToast() {
  const { collectionQueue, dismissCollectionNotification } = useGame();

  if (!collectionQueue || collectionQueue.length === 0) return null;

  return (
    <aside
      aria-label="Festival Collection reward unlocked notification"
      aria-live="polite"
      className="fixed top-20 right-4 sm:top-24 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-3 pointer-events-none"
    >
      {collectionQueue.map((queueItem) => {
        const item = queueItem.item;
        const rarity = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.Common;
        const isLegendary = item.rarity === 'Legendary';
        const isEpic = item.rarity === 'Epic';

        return (
          <div
            key={queueItem.queueId}
            id={`collection-unlock-toast-${item.id}`}
            role="status"
            className={`pointer-events-auto relative w-full p-4 rounded-2xl bg-gradient-to-r from-amber-950/95 via-stone-900/95 to-amber-950/95 border-2 ${rarity.border} ${rarity.glow} backdrop-blur-md animate-celebration-pop overflow-hidden transition-all duration-300 shadow-2xl`}
          >
            {/* Top shimmering accent bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                isLegendary
                  ? 'from-amber-400 via-yellow-200 to-amber-500 animate-pulse'
                  : isEpic
                  ? 'from-purple-400 via-fuchsia-300 to-purple-500'
                  : 'from-amber-400 via-yellow-300 to-amber-500'
              }`}
            />

            {/* Background subtle radial glow */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLegendary
                  ? 'bg-radial-gradient from-amber-400/25 via-yellow-500/10 to-transparent'
                  : isEpic
                  ? 'bg-radial-gradient from-purple-500/20 via-transparent to-transparent'
                  : 'bg-radial-gradient from-amber-400/10 via-transparent to-transparent'
              }`}
            />

            {/* Celebratory burst for high-rarity unlocks */}
            {(isLegendary || isEpic) && (
              <CelebrationBurst count={isLegendary ? 14 : 8} className="z-0 opacity-80" />
            )}

            {/* Dismiss button */}
            <button
              onClick={() => dismissCollectionNotification(queueItem.queueId)}
              className="absolute top-2 right-2 p-1 text-amber-400/70 hover:text-amber-200 rounded-lg hover:bg-stone-800/60 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400 z-20"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 relative z-10">
              {/* Collectible Visual Avatar with glowing halo */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-b from-amber-500/20 to-orange-500/20 border ${rarity.border} shadow-inner flex items-center justify-center text-3xl filter drop-shadow-md ${
                  isLegendary ? 'animate-bounce-subtle' : ''
                }`}
              >
                <span>{item.emoji || '🎁'}</span>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
                  <span>NEW FESTIVAL REWARD</span>
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[9px] font-bold border ${rarity.badge}`}
                  >
                    {item.rarity}
                  </span>
                </div>

                <h4 className="font-heading font-black text-base sm:text-lg text-amber-100 tracking-wide truncate mt-0.5">
                  {item.name}
                </h4>

                <p className="text-xs text-amber-200/90 line-clamp-2 mt-0.5 leading-snug">
                  Added to your Festival Collection! Available to adorn Grand Morya.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
