import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export default function FeverMeter({
  feverPercent = 0,
  isFeverActive = false,
  feverTimeRemaining = 0,
  className = '',
  id,
}) {
  const clampedPercent = Math.min(100, Math.max(0, feverPercent));

  return (
    <div
      id={id || 'morya-fever-meter'}
      className={`w-full max-w-md mx-auto rounded-xl px-3 py-2 border transition-all duration-300 ${
        isFeverActive
          ? 'bg-gradient-to-r from-amber-950 via-rose-950 to-amber-950 border-amber-300 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50'
          : 'bg-stone-950/70 border-amber-500/30'
      } ${className}`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <Flame
            className={`w-4 h-4 ${
              isFeverActive
                ? 'text-yellow-300 animate-bounce'
                : 'text-amber-500 animate-pulse'
            }`}
          />
          <span
            className={`text-xs font-heading font-bold uppercase tracking-wider ${
              isFeverActive ? 'text-yellow-200' : 'text-amber-200'
            }`}
          >
            {isFeverActive ? '🔥 MORYA FEVER ACTIVE!' : 'Morya Fever'}
          </span>
        </div>

        <div className="text-xs font-mono font-bold">
          {isFeverActive ? (
            <span className="text-yellow-300 flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3" />
              2× MULTIPLIER ({Math.ceil(feverTimeRemaining)}s)
            </span>
          ) : (
            <span className="text-amber-400/80">{Math.round(clampedPercent)}%</span>
          )}
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative w-full h-3 sm:h-3.5 rounded-full bg-stone-900/90 border border-amber-500/20 overflow-hidden shadow-inner">
        {/* Fill */}
        <div
          className={`h-full rounded-full transition-all duration-150 relative ${
            isFeverActive
              ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-yellow-300 shadow-md shadow-amber-400/60 animate-pulse'
              : 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-400'
          }`}
          style={{ width: `${clampedPercent}%` }}
        >
          {/* Shimmer animation */}
          {clampedPercent > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
}
