import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext.jsx';
import { SCREENS, STAGES } from '../../constants/gameData.js';
import { Sparkles } from 'lucide-react';

const STAGE_TITLES = {
  [SCREENS.PANDAL_BUILD]: { title: 'Pandal Build', subtitle: 'Stage 1 • Sacred Mandap' },
  [SCREENS.RANGOLI_RUSH]: { title: 'Rangoli Rush', subtitle: 'Stage 2 • Sacred Colors' },
  [SCREENS.MODAK_MUSHAK]: { title: 'Modak & Mushak', subtitle: 'Stage 3 • Sacred Prasad' },
  [SCREENS.ECO_CELEBRATION]: { title: 'Eco Celebration', subtitle: 'Stage 4 • Sacred Spirit' },
  [SCREENS.GRAND_MORYA]: { title: 'Grand Morya', subtitle: 'The Divine Finale' },
};

export default function StageTransition() {
  const { currentScreen } = useGame();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState(null);
  const prevScreenRef = useRef(currentScreen);
  const timerRef = useRef(null);

  useEffect(() => {
    const prev = prevScreenRef.current;
    prevScreenRef.current = currentScreen;

    // Only trigger on game stages or grand morya transitions
    if (prev !== currentScreen && STAGE_TITLES[currentScreen]) {
      setTransitionStage(STAGE_TITLES[currentScreen]);
      setIsTransitioning(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentScreen]);

  if (!isTransitioning || !transitionStage) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-300"
    >
      {/* Background warm golden radial flash */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/70 via-stone-950/80 to-amber-950/70 backdrop-blur-sm animate-pulse" />

      {/* Decorative center radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-radial-gradient from-amber-500/30 via-yellow-500/10 to-transparent blur-2xl" />

      {/* Center Festive Shimmer Badge */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-4 rounded-3xl bg-gradient-to-r from-amber-950/90 via-stone-900/90 to-amber-950/90 border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.5)] animate-celebration-pop">
        <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-black mb-1">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>{transitionStage.subtitle}</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-100 drop-shadow">
          {transitionStage.title}
        </h2>
      </div>
    </div>
  );
}
