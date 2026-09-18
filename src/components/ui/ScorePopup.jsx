import React from 'react';

/**
 * ScorePopup
 * 
 * Renders a floating upward score badge for visual delight.
 * 100% decorative and pointer-events-none.
 */
export default function ScorePopup({ value, label = '', color = 'amber', className = '' }) {
  if (!value) return null;

  const colorStyles = {
    amber: 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]',
    emerald: 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    yellow: 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]',
  };

  const textStyle = colorStyles[color] || colorStyles.amber;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none flex items-center gap-1 font-heading font-black text-sm sm:text-base animate-score-popup z-30 ${textStyle} ${className}`}
    >
      <span>+{value}</span>
      {label && <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>}
    </div>
  );
}
