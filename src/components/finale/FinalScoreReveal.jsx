import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Flame } from 'lucide-react';

export default function FinalScoreReveal({
  totalScore = 0,
  highScore = 0,
  isNewHighScore = false,
  maxCombo = 0,
  onAnimationComplete,
  className = '',
}) {
  const [displayScore, setDisplayScore] = useState(0);
  const [isCounting, setIsCounting] = useState(true);
  const animRef = useRef(null);

  useEffect(() => {
    // Check if player prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If totalScore is 0 or reduced motion is requested, display immediately
    if (totalScore <= 0 || prefersReducedMotion) {
      setDisplayScore(totalScore);
      setIsCounting(false);
      if (onAnimationComplete) onAnimationComplete();
      return;
    }

    const duration = 1800; // ms
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.round(easedProgress * totalScore);

      setDisplayScore(currentVal);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animateCount);
      } else {
        setDisplayScore(totalScore);
        setIsCounting(false);
        if (onAnimationComplete) onAnimationComplete();
      }
    };

    animRef.current = requestAnimationFrame(animateCount);

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [totalScore, onAnimationComplete]);

  return (
    <div
      id="final-score-reveal"
      className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-amber-900/60 via-stone-900/80 to-amber-950/70 border-2 border-amber-400/50 max-w-md w-full mx-auto shadow-2xl text-center relative overflow-hidden ${className}`}
    >
      {/* Decorative top badge */}
      {isNewHighScore && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 border border-amber-400/70 text-yellow-300 text-xs font-bold mb-2 animate-bounce motion-reduce:animate-none shadow-md shadow-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>🏆 NEW HIGH SCORE!</span>
        </div>
      )}

      <div className="text-xs uppercase tracking-widest text-amber-300/90 font-bold">
        YOUR FESTIVAL SCORE
      </div>

      <div
        className={`font-heading font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 my-1 tabular-nums transition-transform duration-300 ${
          isCounting ? 'scale-105' : 'scale-100'
        }`}
      >
        {displayScore.toLocaleString()}
      </div>

      <div className="text-xs text-amber-300/80 flex items-center justify-center gap-3 mt-2 flex-wrap">
        <span className="flex items-center gap-1">
          <Trophy className="w-3 h-3 text-amber-400" />
          Best: {highScore.toLocaleString()}
        </span>
        <span className="text-amber-500/50">•</span>
        <span className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-400" />
          Max Combo: {maxCombo}x
        </span>
      </div>
    </div>
  );
}
