import React from 'react';
import { OBSTACLE_TYPES } from './mushakGameData.js';

/**
 * Harmless Environmental Festival Obstacles
 * Respectful, festive, non-violent objects:
 * - Overturned flower basket
 * - Tipped brass water lota
 * - Small festival puja box
 */

export function ObstacleVisual({ type = 'FLOWER_BASKET', size = 46 }) {
  switch (type) {
    case 'WATER_POT':
      // Tipped traditional brass lota / puja pot with harmless water splashes
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-md overflow-visible">
          <defs>
            <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Harmless spilled water ripple */}
          <ellipse cx="16" cy="40" rx="14" ry="5" fill="url(#waterGrad)" opacity="0.6" />
          <circle cx="8" cy="36" r="2" fill="#38BDF8" opacity="0.8" />
          <circle cx="28" cy="42" r="1.5" fill="#38BDF8" opacity="0.8" />
          {/* Tilted Brass Pot */}
          <g transform="rotate(35, 30, 26)">
            {/* Pot belly */}
            <circle cx="30" cy="26" r="13" fill="url(#brassGrad)" stroke="#FEF08A" strokeWidth="1" />
            {/* Rim neck */}
            <path d="M 23 13 Q 30 11, 37 13 L 38 10 Q 30 8, 22 10 Z" fill="url(#brassGrad)" />
            {/* Engraved temple motif ring */}
            <circle cx="30" cy="26" r="8" fill="none" stroke="#FEF08A" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>
        </svg>
      );

    case 'PUJA_BOX':
      // Small carved wooden/brass festival kumkum box
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-md overflow-visible">
          <defs>
            <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="70%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>
          {/* Wooden Box Body */}
          <rect x="10" y="20" width="30" height="22" rx="4" fill="url(#boxGrad)" stroke="#D97706" strokeWidth="1.2" />
          {/* Lid */}
          <rect x="8" y="15" width="34" height="6" rx="2" fill="#D97706" stroke="#FEF08A" strokeWidth="1" />
          {/* Brass handle latch */}
          <rect x="23" y="19" width="4" height="6" rx="1" fill="#FEF08A" />
          <circle cx="25" cy="22" r="1.2" fill="#78350F" />
          {/* Carved decorative arch */}
          <path d="M 15 32 Q 25 24, 35 32" stroke="#FEF08A" strokeWidth="1" fill="none" opacity="0.8" />
        </svg>
      );

    case 'FLOWER_BASKET':
    default:
      // Overturned decorative bamboo wicker basket with spilled flowers
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-md overflow-visible">
          <defs>
            <linearGradient id="basketGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          {/* Scattered petals on ground */}
          <circle cx="12" cy="40" r="3" fill="#F59E0B" />
          <circle cx="18" cy="42" r="2.5" fill="#E11D48" />
          <circle cx="36" cy="41" r="3" fill="#EA580C" />
          {/* Tilted Wicker Basket */}
          <g transform="rotate(-25, 24, 26)">
            <path
              d="M 14 18 Q 24 16, 34 18 L 30 38 Q 24 40, 18 38 Z"
              fill="url(#basketGrad)"
              stroke="#FDE68A"
              strokeWidth="1"
            />
            {/* Wicker cross-hatch weaves */}
            <line x1="16" y1="24" x2="32" y2="24" stroke="#78350F" strokeWidth="1" />
            <line x1="17" y1="31" x2="31" y2="31" stroke="#78350F" strokeWidth="1" />
            <line x1="21" y1="18" x2="20" y2="38" stroke="#78350F" strokeWidth="0.8" />
            <line x1="27" y1="18" x2="28" y2="38" stroke="#78350F" strokeWidth="0.8" />
            {/* Basket Handle */}
            <path d="M 12 20 C 12 6, 36 6, 36 20" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}

export default function Obstacle({ obstacle, className = '' }) {
  if (!obstacle) return null;

  const obsDef = OBSTACLE_TYPES[obstacle.type] || OBSTACLE_TYPES.FLOWER_BASKET;

  return (
    <div
      className={`absolute select-none pointer-events-none transition-transform duration-75 ${className}`}
      style={{
        left: `${obstacle.x}px`,
        top: `${obstacle.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <ObstacleVisual type={obstacle.type} size={obsDef.size} />
      </div>
    </div>
  );
}
