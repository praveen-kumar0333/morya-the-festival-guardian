import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MushakControls({
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
  isLeftPressed = false,
  isRightPressed = false,
  className = '',
  id,
}) {
  const handleLeftDown = (e) => {
    e.preventDefault();
    if (onMoveLeftStart) onMoveLeftStart();
  };

  const handleLeftUp = (e) => {
    e.preventDefault();
    if (onMoveLeftEnd) onMoveLeftEnd();
  };

  const handleRightDown = (e) => {
    e.preventDefault();
    if (onMoveRightStart) onMoveRightStart();
  };

  const handleRightUp = (e) => {
    e.preventDefault();
    if (onMoveRightEnd) onMoveRightEnd();
  };

  return (
    <div
      id={id || 'mushak-controls'}
      className={`w-full max-w-lg mx-auto flex items-center justify-between px-4 py-2 select-none touch-none ${className}`}
    >
      {/* Mobile Left Button */}
      <button
        type="button"
        id="mushak-left-btn"
        aria-label="Move Mushak Left (or press Left Arrow / A)"
        onPointerDown={handleLeftDown}
        onPointerUp={handleLeftUp}
        onPointerCancel={handleLeftUp}
        onPointerLeave={handleLeftUp}
        className={`w-16 h-14 sm:w-20 sm:h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-100 shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 min-h-[44px] min-w-[44px] active:scale-95 ${
          isLeftPressed
            ? 'bg-amber-500 border-amber-200 text-stone-950 shadow-amber-500/50 scale-95 ring-2 ring-amber-300'
            : 'bg-stone-900/90 hover:bg-amber-950/80 border-amber-500/40 text-amber-200 hover:border-amber-400'
        }`}
      >
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[3]" />
      </button>

      {/* Keyboard Controls Hint Badge */}
      <div className="hidden sm:flex flex-col items-center justify-center text-center px-3 py-1 rounded-xl bg-stone-950/60 border border-amber-500/20 text-[11px] text-amber-300/80">
        <span className="font-semibold text-amber-200">Desktop Keys</span>
        <div className="flex items-center gap-1.5 mt-0.5 font-mono text-[10px] text-amber-400">
          <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-500/30">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-500/30">→</kbd>
          <span className="text-stone-500">or</span>
          <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-500/30">A</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-500/30">D</kbd>
        </div>
      </div>

      {/* Mobile Right Button */}
      <button
        type="button"
        id="mushak-right-btn"
        aria-label="Move Mushak Right (or press Right Arrow / D)"
        onPointerDown={handleRightDown}
        onPointerUp={handleRightUp}
        onPointerCancel={handleRightUp}
        onPointerLeave={handleRightUp}
        className={`w-16 h-14 sm:w-20 sm:h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-100 shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 min-h-[44px] min-w-[44px] active:scale-95 ${
          isRightPressed
            ? 'bg-amber-500 border-amber-200 text-stone-950 shadow-amber-500/50 scale-95 ring-2 ring-amber-300'
            : 'bg-stone-900/90 hover:bg-amber-950/80 border-amber-500/40 text-amber-200 hover:border-amber-400'
        }`}
      >
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[3]" />
      </button>
    </div>
  );
}
