import React from 'react';
import { Check, X } from 'lucide-react';
import { POWDER_COLORS } from './RangoliPattern.js';

/**
 * Original vector glyphs for powder types to guarantee accessibility
 * (player never has to rely solely on color vision).
 */
export function PowderGlyph({ colorId, className = '' }) {
  switch (colorId) {
    case 'marigold':
      // 8-petal Marigold motif
      return (
        <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} fill="none">
          <circle cx="16" cy="16" r="4" fill="#FEF08A" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
            <ellipse
              key={ang}
              cx="16"
              cy="7"
              rx="3"
              ry="5"
              fill="#FFFBEB"
              transform={`rotate(${ang}, 16, 16)`}
              opacity="0.9"
            />
          ))}
        </svg>
      );

    case 'saffron':
      // Sacred Surya / Flame Swirl
      return (
        <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} fill="none">
          <circle cx="16" cy="16" r="6" fill="#78350F" opacity="0.8" />
          <path
            d="M 16 6 C 18 11, 22 13, 22 17 C 22 21, 19 23, 16 23 C 13 23, 10 21, 10 17 C 10 13, 14 11, 16 6 Z"
            fill="#FFFBEB"
          />
          <circle cx="16" cy="17" r="2.5" fill="#DC2626" />
        </svg>
      );

    case 'lotus':
      // Sacred Lotus Petals
      return (
        <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} fill="none">
          {/* Central petal */}
          <path d="M 16 7 C 20 14, 19 23, 16 25 C 13 23, 12 14, 16 7 Z" fill="#FFFBEB" />
          {/* Side left petal */}
          <path d="M 16 16 C 11 15, 7 18, 9 23 C 11 25, 14 25, 16 25 Z" fill="#FFF1F2" opacity="0.85" />
          {/* Side right petal */}
          <path d="M 16 16 C 21 15, 25 18, 23 23 C 21 25, 18 25, 16 25 Z" fill="#FFF1F2" opacity="0.85" />
        </svg>
      );

    case 'leaf':
      // Sacred Mango / Bel Leaf with vein
      return (
        <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} fill="none">
          <path
            d="M 16 6 C 24 10, 24 22, 16 26 C 8 22, 8 10, 16 6 Z"
            fill="#ECFDF5"
            stroke="#065F46"
            strokeWidth="1.2"
          />
          <line x1="16" y1="9" x2="16" y2="24" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="14" x2="20" y2="12" stroke="#047857" strokeWidth="1" />
          <line x1="16" y1="18" x2="12" y2="16" stroke="#047857" strokeWidth="1" />
        </svg>
      );

    case 'diya':
      // Auspicious Golden Diya Lamp
      return (
        <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} fill="none">
          {/* Lamp base */}
          <path d="M 8 18 C 10 25, 22 25, 24 18 C 22 17, 10 17, 8 18 Z" fill="#78350F" />
          <path d="M 10 18 Q 16 24, 22 18 Z" fill="#451A03" />
          {/* Flame */}
          <path d="M 16 7 C 18 10, 19 13, 16 17 C 13 13, 14 10, 16 7 Z" fill="#DC2626" />
          <circle cx="16" cy="14" r="2" fill="#FFFBEB" />
        </svg>
      );

    case 'empty':
    default:
      // Sacred Kolam Bindu (Dot)
      return (
        <svg viewBox="0 0 32 32" className={`w-full h-full opacity-40 ${className}`} fill="none">
          <circle cx="16" cy="16" r="3" fill="#F59E0B" />
          <circle cx="16" cy="16" r="6" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
      );
  }
}

export default function RangoliTile({
  colorId = 'empty',
  index,
  row,
  col,
  size = 3,
  mode = 'recreate', // 'observe' | 'recreate' | 'result'
  isCorrect = null,
  targetColor = null,
  onClick,
  id,
}) {
  const powder = POWDER_COLORS[colorId] || POWDER_COLORS.empty;
  const isFilled = colorId !== 'empty';

  // Responsive tile size classes based on grid dimension
  const sizeClasses = {
    3: 'w-16 h-16 sm:w-20 sm:h-20 max-w-[76px] max-h-[76px]',
    4: 'w-13 h-13 sm:w-16 sm:h-16 max-w-[62px] max-h-[62px]',
    5: 'w-10 h-10 sm:w-13 sm:h-13 max-w-[50px] max-h-[50px]',
  }[size] || 'w-14 h-14';

  const handleClick = (e) => {
    if (mode !== 'recreate') return;
    if (onClick) onClick(index);
  };

  const handleKeyDown = (e) => {
    if (mode !== 'recreate') return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(index);
    }
  };

  const ariaLabel =
    mode === 'observe'
      ? `Pattern cell row ${row + 1}, column ${col + 1}`
      : `Rangoli cell row ${row + 1}, column ${col + 1}, current: ${powder.name}. Tap to paint or clear.`;

  return (
    <button
      id={id || `rangoli-tile-${index}`}
      type="button"
      disabled={mode !== 'recreate'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      className={`relative rounded-full transition-all duration-200 select-none flex items-center justify-center border-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 shadow-md ${sizeClasses} ${
        isFilled
          ? `bg-gradient-to-br ${powder.bgGradient} ${powder.borderClass}`
          : 'bg-[#220d06] border-amber-900/40 hover:border-amber-500/50'
      } ${
        mode === 'recreate'
          ? 'cursor-pointer active:scale-92 hover:scale-105 hover:shadow-lg'
          : 'cursor-default'
      }`}
      style={{
        boxShadow: isFilled ? `0 0 14px ${powder.glowColor}` : 'inset 0 2px 4px rgba(0,0,0,0.6)',
      }}
    >
      {/* Powder texture overlay (festive tactile granular feel) */}
      {isFilled && (
        <div
          className="absolute inset-0 rounded-full opacity-25 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.4) 1px, transparent 1px)`,
            backgroundSize: '8px 8px, 6px 6px',
          }}
        />
      )}

      {/* Center Powder Glyph Motif */}
      <div className="w-1/2 h-1/2 flex items-center justify-center pointer-events-none drop-shadow-sm">
        <PowderGlyph colorId={colorId} />
      </div>

      {/* Mode = Result: show evaluation indicator badge */}
      {mode === 'result' && isCorrect !== null && (
        <div
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md border text-white ${
            isCorrect
              ? 'bg-emerald-600 border-emerald-300'
              : 'bg-rose-600 border-rose-300'
          }`}
          aria-hidden="true"
        >
          {isCorrect ? (
            <Check className="w-3 h-3 stroke-[3]" />
          ) : (
            <X className="w-3 h-3 stroke-[3]" />
          )}
        </div>
      )}
    </button>
  );
}
