import React from 'react';

export default function Diya({ size = 48, className = '', id, activeDiyaId = null }) {
  const isGolden = activeDiyaId === 'golden_diya';
  const isLotus = activeDiyaId === 'lotus_diya';
  const isStar = activeDiyaId === 'star_diya';

  return (
    <div
      id={id}
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Subtle warm flame aura glow */}
      <div
        className="absolute -top-3.5 w-10 h-10 rounded-full bg-gradient-to-t from-amber-500/30 via-yellow-400/20 to-transparent blur-md pointer-events-none animate-gentle-pulse"
      />

      {/* Tiny sacred ember twinkle */}
      <div
        className="absolute -top-4 w-1.5 h-1.5 rounded-full bg-amber-200 pointer-events-none animate-sparkle-twinkle"
        style={{ animationDuration: '2.4s' }}
      />

      {/* SVG Diya with flickering flame */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="flameGrad" cx="50%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
          </radialGradient>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isGolden ? '#FEF08A' : isLotus ? '#FDA4AF' : '#FDE047'} />
            <stop offset="35%" stopColor={isGolden ? '#F59E0B' : isLotus ? '#F43F5E' : '#D97706'} />
            <stop offset="70%" stopColor={isGolden ? '#D97706' : isLotus ? '#BE123C' : '#B45309'} />
            <stop offset="100%" stopColor={isGolden ? '#92400E' : isLotus ? '#881337' : '#78350F'} />
          </linearGradient>
          <linearGradient id="oilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* Diya Base (Traditional Clay / Brass Lamp) */}
        <path
          d="M15 62 C 20 85, 80 85, 85 62 C 75 68, 25 68, 15 62 Z"
          fill="url(#brassGrad)"
          stroke={isGolden ? '#FDE047' : '#F59E0B'}
          strokeWidth="1.5"
        />

        {/* Diya Rim & Oil Reservoir */}
        <ellipse
          cx="50"
          cy="62"
          rx="35"
          ry="7"
          fill="url(#oilGrad)"
          stroke={isGolden ? '#FEF08A' : '#FDE047'}
          strokeWidth="1"
        />

        {/* Decorative Rim Dots */}
        <circle cx="28" cy="63" r="1.5" fill="#FEF08A" />
        <circle cx="50" cy="65" r="1.8" fill="#FEF08A" />
        <circle cx="72" cy="63" r="1.5" fill="#FEF08A" />

        {/* Flickering Sacred Flame */}
        <g className="animate-flame origin-bottom">
          {/* Outer glow flame */}
          <path
            d="M50 20 C 58 35, 62 48, 50 58 C 38 48, 42 35, 50 20 Z"
            fill="url(#flameGrad)"
          />
          {/* Inner core brilliant flame */}
          <path
            d="M50 32 C 54 40, 56 48, 50 55 C 44 48, 46 40, 50 32 Z"
            fill="#FFFFFF"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}
