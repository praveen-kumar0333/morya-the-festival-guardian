import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';

export default function AchievementToast() {
  const { achievementQueue, dismissAchievementNotification } = useGame();

  if (!achievementQueue || achievementQueue.length === 0) return null;

  return (
    <aside
      aria-label="Achievement unlocked notification"
      aria-live="assertive"
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-3 pointer-events-none"
    >
      {achievementQueue.map((item) => {
        const ach = item.achievement;
        return (
          <div
            key={item.queueId}
            id={`achievement-banner-${ach.id}`}
            role="status"
            className="pointer-events-auto relative w-full p-4 rounded-2xl bg-gradient-to-r from-amber-950/95 via-stone-900/95 to-amber-950/95 border-2 border-amber-300/90 shadow-[0_0_35px_rgba(251,191,36,0.5)] backdrop-blur-md animate-celebration-pop overflow-hidden transition-all duration-300"
          >
            {/* Top golden shimmer accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 animate-pulse" />

            {/* Background subtle radial glow */}
            <div className="absolute inset-0 bg-radial-gradient from-amber-400/20 via-transparent to-transparent pointer-events-none" />

            {/* Corner Sparkles */}
            <div className="absolute top-2 right-8 pointer-events-none">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-sparkle-twinkle" />
            </div>

            {/* Dismiss button */}
            <button
              onClick={() => dismissAchievementNotification(item.queueId)}
              className="absolute top-2 right-2 p-1 text-amber-400/70 hover:text-amber-200 rounded-lg hover:bg-stone-800/60 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 relative z-10">
              {/* Achievement Icon with glowing halo */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-b from-amber-500/20 to-orange-500/20 border border-amber-400/60 shadow-inner flex items-center justify-center text-2xl">
                <span>{ach.icon || '🏆'}</span>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
                  <span>ACHIEVEMENT UNLOCKED</span>
                </div>

                <h4 className="font-heading font-black text-base sm:text-lg text-amber-100 tracking-wide truncate mt-0.5">
                  {ach.title}
                </h4>

                <p className="text-xs text-amber-200/90 line-clamp-2 mt-0.5 leading-snug">
                  {ach.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
