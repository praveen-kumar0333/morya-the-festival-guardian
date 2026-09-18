import React from 'react';
import { ITEM_TYPES } from './mushakGameData.js';

/**
 * Collectibles for Stage 3 - Modak & Mushak
 * 1. Modak (+100)
 * 2. Flower (+50)
 * 3. Durva (+75)
 * 4. Golden Modak (+300)
 */

export function CollectibleVisual({ type = 'MODAK', size = 44, isFever = false }) {
  switch (type) {
    case 'MODAK':
      // Steamed traditional ukadiche modak with saffron dot on crest
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-md overflow-visible">
          <defs>
            <linearGradient id="modakGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
            <linearGradient id="modakFold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Subtle glow circle */}
          <circle cx="25" cy="26" r="20" fill="#FEF3C7" opacity="0.3" filter="blur(2px)" />
          {/* Modak base dumpling shape */}
          <path
            d="M 25 6 C 30 16, 44 26, 42 38 C 40 46, 10 46, 8 38 C 6 26, 20 16, 25 6 Z"
            fill="url(#modakGrad)"
            stroke="#FDE68A"
            strokeWidth="1.2"
          />
          {/* Sacred vertical pinch folds */}
          <path d="M 25 8 Q 25 24, 25 44" stroke="url(#modakFold)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25 8 Q 33 22, 35 42" stroke="url(#modakFold)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 25 8 Q 17 22, 15 42" stroke="url(#modakFold)" strokeWidth="1.2" strokeLinecap="round" />
          {/* Saffron Kesar Dot on top */}
          <circle cx="25" cy="11" r="2" fill="#EA580C" />
        </svg>
      );

    case 'FLOWER':
      // Auspicious sacred red hibiscus flower
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-md overflow-visible">
          <defs>
            <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
          </defs>
          {/* 5 Petals */}
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d="M 25 25 C 20 10, 30 10, 25 25"
              fill="url(#petalGrad)"
              stroke="#FFE4E6"
              strokeWidth="0.8"
              transform={`rotate(${angle}, 25, 25) translate(0, -7)`}
            />
          ))}
          {/* Center Golden Anther / Pollen Stamen */}
          <circle cx="25" cy="25" r="5" fill="#FACC15" />
          <circle cx="25" cy="25" r="2.5" fill="#DC2626" />
        </svg>
      );

    case 'DURVA':
      // Auspicious 3-blade holy grass bundle tied with holy moli red thread
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-md overflow-visible">
          <defs>
            <linearGradient id="durvaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Center Grass Blade */}
          <path
            d="M 25 8 C 23 18, 24 32, 25 44 C 26 32, 27 18, 25 8 Z"
            fill="url(#durvaGrad)"
            stroke="#A7F3D0"
            strokeWidth="0.8"
          />
          {/* Left Grass Blade */}
          <path
            d="M 25 44 C 18 36, 12 24, 14 14 C 18 20, 22 30, 25 44 Z"
            fill="url(#durvaGrad)"
            stroke="#A7F3D0"
            strokeWidth="0.8"
          />
          {/* Right Grass Blade */}
          <path
            d="M 25 44 C 32 36, 38 24, 36 14 C 32 20, 28 30, 25 44 Z"
            fill="url(#durvaGrad)"
            stroke="#A7F3D0"
            strokeWidth="0.8"
          />
          {/* Sacred Red Thread / Kalawa Binding */}
          <rect x="21" y="36" width="8" height="3" rx="1.5" fill="#DC2626" />
          <line x1="21" y1="37.5" x2="29" y2="37.5" stroke="#FEF08A" strokeWidth="0.6" />
        </svg>
      );

    case 'GOLDEN_MODAK':
    default:
      // Divine Radiant Golden Modak
      return (
        <svg viewBox="0 0 50 50" width={size} height={size} className="drop-shadow-lg overflow-visible animate-pulse">
          <defs>
            <linearGradient id="goldModakGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="goldGleam" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Radiant Halo Rays */}
          <circle cx="25" cy="25" r="23" fill="#FDE047" opacity="0.35" filter="blur(3px)" />
          {/* Outer Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="25"
              y1="3"
              x2="25"
              y2="0"
              stroke="#FACC15"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${angle}, 25, 25)`}
            />
          ))}
          {/* Golden Modak Body */}
          <path
            d="M 25 5 C 32 16, 45 26, 43 39 C 41 47, 9 47, 7 39 C 5 26, 18 16, 25 5 Z"
            fill="url(#goldModakGrad)"
            stroke="#FEF08A"
            strokeWidth="1.8"
          />
          {/* Pinch folds */}
          <path d="M 25 7 Q 25 24, 25 45" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25 7 Q 34 23, 36 43" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 25 7 Q 16 23, 14 43" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
          {/* Gleam */}
          <ellipse cx="20" cy="20" rx="5" ry="8" transform="rotate(-20, 20, 20)" fill="url(#goldGleam)" />
          {/* Red Auspicious Tilak on Crest */}
          <circle cx="25" cy="10" r="2.2" fill="#DC2626" />
        </svg>
      );
  }
}

export default function Collectible({ item, className = '' }) {
  if (!item) return null;

  const itemDef = ITEM_TYPES[item.type] || ITEM_TYPES.MODAK;

  return (
    <div
      className={`absolute select-none pointer-events-none transition-transform duration-75 ${className}`}
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Floating subtle animation wrapper */}
      <div className="animate-float-gentle flex flex-col items-center">
        <CollectibleVisual type={item.type} size={itemDef.size} />
      </div>
    </div>
  );
}
