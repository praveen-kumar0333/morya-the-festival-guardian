import React from 'react';
import { Sparkles, Eye, Check } from 'lucide-react';
import RangoliTile from './RangoliTile.jsx';

export default function RangoliGrid({
  size = 3,
  gridData = [],
  evaluationData = null,
  phase = 'recreate', // 'observe' | 'recreate' | 'checked'
  countdownSeconds = 0,
  onCellClick,
  onSkipObservation,
  id,
}) {
  const isObserving = phase === 'observe';
  const isChecked = phase === 'checked';

  // Grid style template based on size
  const gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;

  return (
    <div
      id={id || 'rangoli-grid-container'}
      className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center p-3 sm:p-5 select-none"
    >
      {/* Ornate Circular Courtyard Base & Symmetrical Kolam Mandala Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a1006] via-[#1a0802] to-[#120501] border-4 border-amber-500/40 shadow-2xl shadow-black/80 flex items-center justify-center overflow-hidden">
        {/* Sacred Concentric Decorative Rings */}
        <div className="absolute inset-3 rounded-full border border-dashed border-amber-500/30 pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-amber-400/20 pointer-events-none" />

        {/* Ambient Warm Rangoli Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 via-rose-500/10 to-yellow-500/10 pointer-events-none" />
        <div className="absolute w-40 h-40 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

        {/* Festive Lotus Petal Border Accents (8-Point Cardinal Compass) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
          <div
            key={ang}
            className="absolute w-2.5 h-6 bg-gradient-to-t from-amber-400 to-rose-500 rounded-full opacity-60"
            style={{
              transform: `rotate(${ang}deg) translateY(-145px)`,
            }}
          />
        ))}
      </div>

      {/* Observation Phase: Floating Countdown Banner */}
      {isObserving && (
        <div className="absolute -top-3 z-30 flex flex-col items-center animate-bounce">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-heading font-black text-xs sm:text-sm shadow-lg shadow-amber-500/50 border border-yellow-200">
            <Eye className="w-3.5 h-3.5" />
            <span>
              {countdownSeconds > 0
                ? `OBSERVE: ${countdownSeconds}s`
                : 'REMEMBER PATTERN!'}
            </span>
          </div>
        </div>
      )}

      {/* Interactive Tile Grid */}
      <div
        className="relative z-10 grid gap-2 sm:gap-3 p-3 sm:p-4 rounded-full"
        style={{ gridTemplateColumns }}
      >
        {gridData.map((colorId, idx) => {
          const row = Math.floor(idx / size);
          const col = idx % size;
          const cellEval = evaluationData?.cellDetails?.[idx];

          return (
            <RangoliTile
              key={idx}
              index={idx}
              row={row}
              col={col}
              size={size}
              colorId={colorId}
              mode={isObserving ? 'observe' : isChecked ? 'result' : 'recreate'}
              isCorrect={cellEval ? cellEval.isCorrect : null}
              onClick={onCellClick}
            />
          );
        })}
      </div>

      {/* Observation Skip Button ("I'm Ready!") */}
      {isObserving && onSkipObservation && (
        <button
          type="button"
          onClick={onSkipObservation}
          className="absolute -bottom-2 z-30 px-3 py-1 rounded-full bg-stone-900/90 hover:bg-amber-950 border border-amber-400/50 text-amber-300 text-[11px] font-semibold flex items-center gap-1 shadow-md hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Check className="w-3 h-3 text-emerald-400" />
          <span>I'm Ready to Recreate</span>
        </button>
      )}
    </div>
  );
}
