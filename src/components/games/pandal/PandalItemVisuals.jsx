import React from 'react';

/**
 * High-quality original SVG visuals for Pandal Build items.
 * Designed with authentic festive Indian iconography and respectful devotion.
 */

// 1. Toran / Marigold Garland (Spans the upper arch)
export function ToranVisual({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 60"
      className={`w-full h-full overflow-visible drop-shadow-md ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      {/* Arch string */}
      <path
        d="M 10 15 Q 100 45, 200 25 Q 300 45, 390 15"
        stroke="url(#threadGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Mango leaves & Marigolds along string */}
      {[25, 60, 100, 140, 180, 220, 260, 300, 340, 375].map((x, i) => {
        const y = 15 + Math.sin((x / 400) * Math.PI * 2) * 12 + (i % 2 === 0 ? 8 : 4);
        const isYellow = i % 2 === 0;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Mango leaf */}
            <path
              d="M 0 0 C 4 8, 4 16, 0 22 C -4 16, -4 8, 0 0 Z"
              fill="#047857"
              stroke="#065F46"
              strokeWidth="0.5"
            />
            {/* Fluffy Marigold Bloom */}
            <circle
              cx="0"
              cy="2"
              r="8"
              fill={isYellow ? '#F59E0B' : '#EA580C'}
              stroke="#FDE047"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="2" r="4" fill={isYellow ? '#FBBF24' : '#C2410C'} />
            <circle cx="0" cy="2" r="1.5" fill="#78350F" />
          </g>
        );
      })}
    </svg>
  );
}

// 2. Silk Drapery (Pillars & Canopy drapery)
export function DraperyVisual({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`w-full h-full overflow-visible drop-shadow-lg ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="silkRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
      </defs>
      {/* Left curtain drape */}
      <g>
        <path
          d="M 10 0 C 35 30, 40 80, 20 160 C 15 175, 45 175, 35 150 C 50 80, 45 30, 60 0 Z"
          fill="url(#silkRedGrad)"
          stroke="#B91C1C"
          strokeWidth="1"
        />
        {/* Golden Border trim & tassels */}
        <path
          d="M 10 0 C 35 30, 40 80, 20 160"
          stroke="url(#goldBorderGrad)"
          strokeWidth="3"
        />
        <circle cx="20" cy="165" r="4" fill="#FDE047" />
        <path d="M 18 169 L 16 182 M 20 169 L 20 185 M 22 169 L 24 182" stroke="#FDE047" strokeWidth="1.5" />
      </g>

      {/* Right curtain drape */}
      <g>
        <path
          d="M 310 0 C 285 30, 280 80, 300 160 C 305 175, 275 175, 285 150 C 270 80, 275 30, 260 0 Z"
          fill="url(#silkRedGrad)"
          stroke="#B91C1C"
          strokeWidth="1"
        />
        <path
          d="M 310 0 C 285 30, 280 80, 300 160"
          stroke="url(#goldBorderGrad)"
          strokeWidth="3"
        />
        <circle cx="300" cy="165" r="4" fill="#FDE047" />
        <path d="M 298 169 L 296 182 M 300 169 L 300 185 M 302 169 L 304 182" stroke="#FDE047" strokeWidth="1.5" />
      </g>

      {/* Top Swag valence */}
      <path
        d="M 60 0 Q 160 40, 260 0 L 250 8 Q 160 46, 70 8 Z"
        fill="url(#silkRedGrad)"
        stroke="url(#goldBorderGrad)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// 3. Flower Garlands (Red Hibiscus and Marigold bouquets)
export function FlowersVisual({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={`w-full h-full overflow-visible drop-shadow-md ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Bouquet */}
      <g transform="translate(30, 30)">
        {/* Leaves */}
        <path d="M 0 0 C 15 -10, 25 5, 0 25 C -25 5, -15 -10, 0 0 Z" fill="#059669" />
        <path d="M 15 15 C 30 10, 35 25, 15 35 Z" fill="#10B981" />
        {/* Red Hibiscus (Jaswand - Lord Ganesha's favorite flower) */}
        <circle cx="0" cy="15" r="14" fill="#DC2626" stroke="#EF4444" strokeWidth="1" />
        <circle cx="-7" cy="8" r="8" fill="#B91C1C" />
        <circle cx="7" cy="8" r="8" fill="#B91C1C" />
        <circle cx="-6" cy="22" r="8" fill="#B91C1C" />
        <circle cx="6" cy="22" r="8" fill="#B91C1C" />
        {/* Yellow Stamen */}
        <circle cx="0" cy="15" r="4" fill="#FDE047" />
        <line x1="0" y1="15" x2="0" y2="4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="3" r="2" fill="#FEF08A" />

        {/* Marigold cluster below */}
        <circle cx="16" cy="35" r="9" fill="#F59E0B" stroke="#FDE047" strokeWidth="1" />
        <circle cx="16" cy="35" r="4" fill="#D97706" />
        <circle cx="-16" cy="35" r="9" fill="#EA580C" stroke="#FDE047" strokeWidth="1" />
        <circle cx="-16" cy="35" r="4" fill="#B45309" />
      </g>

      {/* Right Bouquet */}
      <g transform="translate(170, 30)">
        {/* Leaves */}
        <path d="M 0 0 C 15 -10, 25 5, 0 25 C -25 5, -15 -10, 0 0 Z" fill="#059669" />
        <path d="M -15 15 C -30 10, -35 25, -15 35 Z" fill="#10B981" />
        {/* Red Hibiscus */}
        <circle cx="0" cy="15" r="14" fill="#DC2626" stroke="#EF4444" strokeWidth="1" />
        <circle cx="-7" cy="8" r="8" fill="#B91C1C" />
        <circle cx="7" cy="8" r="8" fill="#B91C1C" />
        <circle cx="-6" cy="22" r="8" fill="#B91C1C" />
        <circle cx="6" cy="22" r="8" fill="#B91C1C" />
        {/* Yellow Stamen */}
        <circle cx="0" cy="15" r="4" fill="#FDE047" />
        <line x1="0" y1="15" x2="0" y2="4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="3" r="2" fill="#FEF08A" />

        {/* Marigolds */}
        <circle cx="-16" cy="35" r="9" fill="#F59E0B" stroke="#FDE047" strokeWidth="1" />
        <circle cx="-16" cy="35" r="4" fill="#D97706" />
        <circle cx="16" cy="35" r="9" fill="#EA580C" stroke="#FDE047" strokeWidth="1" />
        <circle cx="16" cy="35" r="4" fill="#B45309" />
      </g>
    </svg>
  );
}

// 4. Brass Diyas Pair (Floor / Stand illumination)
export function DiyasVisual({ className = '', activeDiyaId = null }) {
  const isGolden = activeDiyaId === 'golden_diya';
  const isLotus = activeDiyaId === 'lotus_diya';
  const isStar = activeDiyaId === 'star_diya';

  const bowlBg = isGolden
    ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500'
    : isLotus
    ? 'bg-gradient-to-r from-rose-600 via-pink-400 to-rose-700'
    : 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700';

  return (
    <div className={`flex items-center justify-between w-full px-4 ${className}`}>
      {/* Left Diya with pedestal */}
      <div className="flex flex-col items-center relative">
        {/* Soft Warm Flame Aura */}
        <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-400/30 blur-md pointer-events-none animate-gentle-pulse" />
        {/* Flickering Flame */}
        <div className="w-5 h-7 relative animate-flame z-10">
          <div className="w-4 h-6 mx-auto rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_14px_rgba(245,158,11,1)]" />
        </div>
        {/* Diya Bowl */}
        <div className={`w-10 h-4 ${bowlBg} rounded-b-full border-t-2 border-yellow-200 shadow-md`} />
        {/* Diya Stem & Base */}
        <div className="w-2.5 h-6 bg-gradient-to-r from-amber-600 to-yellow-500" />
        <div className="w-12 h-3 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 rounded-full border border-yellow-400/50 shadow-sm" />
      </div>

      {/* Right Diya with pedestal */}
      <div className="flex flex-col items-center relative">
        {/* Soft Warm Flame Aura */}
        <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-400/30 blur-md pointer-events-none animate-gentle-pulse" />
        {/* Flickering Flame */}
        <div className="w-5 h-7 relative animate-flame z-10">
          <div className="w-4 h-6 mx-auto rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_14px_rgba(245,158,11,1)]" />
        </div>
        {/* Diya Bowl */}
        <div className={`w-10 h-4 ${bowlBg} rounded-b-full border-t-2 border-yellow-200 shadow-md`} />
        {/* Diya Stem & Base */}
        <div className="w-2.5 h-6 bg-gradient-to-r from-amber-600 to-yellow-500" />
        <div className="w-12 h-3 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 rounded-full border border-yellow-400/50 shadow-sm" />
      </div>
    </div>
  );
}

// 5. Prasad Offering Plate (Fresh Steamed Ukadiche Modaks & Durva grass on Brass Thali)
export function OfferingPlateVisual({ className = '' }) {
  return (
    <svg
      viewBox="0 0 160 90"
      className={`w-full h-full overflow-visible drop-shadow-lg ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="brassThaliGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </radialGradient>
        <linearGradient id="modakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>

      {/* Brass Offering Thali Base */}
      <ellipse cx="80" cy="55" rx="72" ry="24" fill="url(#brassThaliGrad)" stroke="#FDE047" strokeWidth="2.5" />
      <ellipse cx="80" cy="55" rx="64" ry="18" fill="#78350F" opacity="0.6" />

      {/* Banana Leaf Placemat */}
      <path
        d="M 25 55 Q 80 40, 135 55 Q 80 70, 25 55 Z"
        fill="#15803D"
        stroke="#166534"
        strokeWidth="1"
      />
      {/* Leaf rib */}
      <path d="M 30 55 L 130 55" stroke="#4ADE80" strokeWidth="1" strokeDasharray="2 2" />

      {/* Fresh Green Durva Grass Blades */}
      <path d="M 60 50 C 50 35, 45 25, 40 20 M 62 50 C 58 35, 55 22, 52 18 M 64 50 C 65 35, 68 25, 72 22" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />

      {/* 5 Sacred Steamed Ukadiche Modaks */}
      {/* Back modaks */}
      <g transform="translate(62, 38)">
        <path d="M 0 0 C 4 -12, 10 -16, 12 -16 C 14 -16, 20 -12, 24 0 C 20 6, 4 6, 0 0 Z" fill="url(#modakGrad)" stroke="#D97706" strokeWidth="0.8" />
        <line x1="12" y1="-16" x2="12" y2="0" stroke="#F59E0B" strokeWidth="0.8" opacity="0.7" />
      </g>
      <g transform="translate(86, 38)">
        <path d="M 0 0 C 4 -12, 10 -16, 12 -16 C 14 -16, 20 -12, 24 0 C 20 6, 4 6, 0 0 Z" fill="url(#modakGrad)" stroke="#D97706" strokeWidth="0.8" />
        <line x1="12" y1="-16" x2="12" y2="0" stroke="#F59E0B" strokeWidth="0.8" opacity="0.7" />
      </g>

      {/* Front Center Master Modak with Saffron Kesar Tika */}
      <g transform="translate(70, 48)">
        <path d="M 0 0 C 5 -16, 15 -22, 18 -22 C 21 -22, 31 -16, 36 0 C 30 8, 6 8, 0 0 Z" fill="url(#modakGrad)" stroke="#B45309" strokeWidth="1.2" />
        {/* Modak pleats (Kalyan) */}
        <line x1="18" y1="-22" x2="18" y2="2" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
        <line x1="18" y1="-22" x2="9" y2="2" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
        <line x1="18" y1="-22" x2="27" y2="2" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
        {/* Kesar Saffron dot */}
        <circle cx="18" cy="-14" r="1.5" fill="#DC2626" />
      </g>

      {/* Side small sweets */}
      <circle cx="50" cy="58" r="5" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
      <circle cx="120" cy="58" r="5" fill="#EA580C" stroke="#C2410C" strokeWidth="0.8" />
    </svg>
  );
}

// 6. Sacred Rangoli (Harmonious Lotus & Geometric Mandala)
export function RangoliVisual({ className = '' }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`w-full h-full overflow-visible drop-shadow-xl ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="rangoliCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>
      </defs>

      {/* Outer decorative petal circle */}
      <circle cx="80" cy="80" r="72" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
      <circle cx="80" cy="80" r="66" fill="#831843" opacity="0.4" stroke="#F43F5E" strokeWidth="1.5" />

      {/* 8 Lotus Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle}, 80, 80)`}>
          <path
            d="M 80 20 C 72 40, 72 55, 80 65 C 88 55, 88 40, 80 20 Z"
            fill={i % 2 === 0 ? '#E11D48' : '#F59E0B'}
            stroke="#FEF08A"
            strokeWidth="1.2"
          />
          <circle cx="80" cy="24" r="2" fill="#FFFFFF" />
        </g>
      ))}

      {/* Inner Petal Ring */}
      <circle cx="80" cy="80" r="32" fill="#047857" opacity="0.7" stroke="#10B981" strokeWidth="1.5" />

      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <g key={i} transform={`rotate(${angle}, 80, 80)`}>
          <path
            d="M 80 50 C 76 60, 76 70, 80 75 C 84 70, 84 60, 80 50 Z"
            fill="#FBBF24"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Central Sacred Diya Medallion */}
      <circle cx="80" cy="80" r="16" fill="url(#rangoliCenter)" stroke="#FEF08A" strokeWidth="2" />
      <circle cx="80" cy="80" r="8" fill="#FEF08A" />
      <circle cx="80" cy="80" r="3" fill="#DC2626" />
    </svg>
  );
}

// Devotional Center: Lord Ganesha Peaceful Seated Presence on Sacred Singhasan (Throne)
// Respectfully represented, non-draggable, non-interactive sanctuary centerpiece
export function DevotionalCenterpiece({ className = '' }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center pointer-events-none select-none ${className}`}
      aria-label="Sacred Lord Ganesha Shrine"
    >
      {/* Divine Radiant Halo / Prabhavali */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-b from-amber-400/25 via-yellow-500/15 to-transparent blur-xl animate-gentle-pulse" />

      <svg
        viewBox="0 0 240 260"
        className="w-48 h-52 sm:w-60 sm:h-64 overflow-visible drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="prabhavaliGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldThroneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="ganeshaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Sacred Prabhavali Arch (Golden Temple Halo behind Bappa) */}
        <path
          d="M 30 200 C 30 70, 210 70, 210 200"
          stroke="url(#goldThroneGrad)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 40 195 C 40 90, 200 90, 200 195"
          stroke="#FDE047"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* Flames of Aura on Arch */}
        {[50, 75, 105, 135, 165, 190].map((x, i) => {
          const y = 95 - Math.sin((i / 5) * Math.PI) * 45;
          return <circle key={i} cx={x} cy={y} r="3" fill="#FDE047" />;
        })}

        {/* Lotus Singhasan (Throne Pedestal) */}
        <g transform="translate(120, 220)">
          {/* Base */}
          <path d="M -70 20 L 70 20 L 60 35 L -60 35 Z" fill="url(#goldThroneGrad)" stroke="#FDE047" strokeWidth="1.5" />
          {/* Red Velvet Cushion */}
          <ellipse cx="0" cy="18" rx="64" ry="12" fill="#991B1B" stroke="#B91C1C" strokeWidth="1" />
          {/* Lotus Petals along Throne Rim */}
          {[-50, -30, -10, 10, 30, 50].map((px, idx) => (
            <path
              key={idx}
              d={`M ${px - 10} 18 Q ${px} 8, ${px + 10} 18 Z`}
              fill="#F43F5E"
              stroke="#FDE047"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {/* Sacred Dignified Lord Ganesha Murti */}
        <g transform="translate(120, 140)">
          {/* Yellow Pitambar Silken Robes & Dhoti */}
          <path
            d="M -45 50 C -45 75, -20 85, 0 85 C 20 85, 45 75, 45 50 C 35 35, -35 35, -45 50 Z"
            fill="url(#ganeshaGoldGrad)"
            stroke="#92400E"
            strokeWidth="1.5"
          />
          {/* Red Silken Sash (Uttariya) */}
          <path
            d="M -30 20 Q 0 45, 30 35 Q 35 45, 15 55 Q -10 50, -30 30 Z"
            fill="#DC2626"
            stroke="#B91C1C"
            strokeWidth="1"
          />

          {/* Abhaya Mudra Blessing Hand (Right Hand) */}
          <g transform="translate(-36, 25)">
            <ellipse cx="0" cy="0" rx="8" ry="10" fill="url(#ganeshaGoldGrad)" stroke="#B45309" strokeWidth="1" />
            <path d="M -4 -8 L -4 -2 M 0 -10 L 0 -1 M 4 -8 L 4 -2" stroke="#B45309" strokeWidth="1" strokeLinecap="round" />
            {/* Auspicious Red Swastika / Blessing dot on palm */}
            <circle cx="0" cy="0" r="2" fill="#DC2626" />
          </g>

          {/* Left Hand Holding Sweet Modak */}
          <g transform="translate(36, 28)">
            <ellipse cx="0" cy="0" rx="9" ry="8" fill="url(#ganeshaGoldGrad)" stroke="#B45309" strokeWidth="1" />
            {/* Modak */}
            <circle cx="0" cy="-4" r="5" fill="#FEF08A" stroke="#D97706" strokeWidth="1" />
          </g>

          {/* Large Auspicious Divine Ears (Surpakarna) */}
          <path
            d="M -16 -25 C -45 -30, -52 -5, -36 12 C -28 18, -18 10, -18 0 Z"
            fill="url(#ganeshaGoldGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          <path
            d="M 16 -25 C 45 -30, 52 -5, 36 12 C 28 18, 18 10, 18 0 Z"
            fill="url(#ganeshaGoldGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Majestic Head and Face */}
          <ellipse cx="0" cy="-12" rx="20" ry="24" fill="url(#ganeshaGoldGrad)" stroke="#B45309" strokeWidth="1.5" />

          {/* Gentle Eyes of Compassion */}
          <path d="M -12 -18 Q -8 -21, -4 -18" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 4 -18 Q 8 -21, 12 -18" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="-8" cy="-17" r="1.5" fill="#451A03" />
          <circle cx="8" cy="-17" r="1.5" fill="#451A03" />

          {/* Sacred Trishul & Chandrakala Tilak on Forehead */}
          <path d="M -4 -28 L -4 -20 M 4 -28 L 4 -20 M 0 -30 L 0 -18" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="0" cy="-16" r="1.8" fill="#DC2626" />
          <path d="M -7 -20 Q 0 -16, 7 -20" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round" />

          {/* Single Sacred Right Tusk (Ekadanta) */}
          <path d="M -8 2 L -4 14 L -11 12 Z" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.8" />

          {/* Sacred Curved Trunk (Vamamukhi - curved gracefully to the left towards Modak) */}
          <path
            d="M -4 -5 C -4 15, -8 32, 10 40 C 22 45, 34 38, 32 30 C 30 22, 22 26, 25 30"
            fill="none"
            stroke="url(#ganeshaGoldGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M -4 -5 C -4 15, -8 32, 10 40 C 22 45, 34 38, 32 30 C 30 22, 22 26, 25 30"
            fill="none"
            stroke="#B45309"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Royal Golden Mukut (Crown) */}
          <g transform="translate(0, -32)">
            <path
              d="M -16 0 L -12 -28 L 0 -40 L 12 -28 L 16 0 Z"
              fill="url(#goldThroneGrad)"
              stroke="#FEF08A"
              strokeWidth="1.5"
            />
            {/* Jewel in Crown */}
            <circle cx="0" cy="-24" r="4" fill="#DC2626" stroke="#FEF08A" strokeWidth="1" />
            <circle cx="0" cy="-38" r="2.5" fill="#FEF08A" />
            <path d="M -14 -2 L 14 -2" stroke="#FEF08A" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}
