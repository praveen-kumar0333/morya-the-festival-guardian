import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Original Vector Representation of Mushak
 * Lord Ganesha's devoted, charming vahana (divine companion).
 * Culturally respectful, charming, and expressive.
 */
export default function MushakPlayer({
  x = 400,
  y = 420,
  direction = 1, // 1 for right, -1 for left
  isMoving = false,
  isCollecting = false,
  isFever = false,
  isStumbling = false,
  className = '',
}) {
  return (
    <div
      className={`absolute z-30 pointer-events-none transition-transform duration-75 select-none ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-label="Mushak, Lord Ganesha's faithful companion"
    >
      {/* 1. Morya Fever Radiant Aura */}
      {isFever && (
        <div className="absolute inset-0 -m-5 rounded-full bg-gradient-to-r from-amber-400/50 via-rose-500/40 to-yellow-300/50 blur-md animate-pulse pointer-events-none" />
      )}

      {/* 2. Collection Sparkle Burst */}
      {isCollecting && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-300 animate-bounce pointer-events-none">
          <Sparkles className="w-6 h-6 stroke-[2.5]" />
        </div>
      )}

      {/* 3. Mushak Body SVG with Direction Flip */}
      <div
        className={`relative w-20 h-16 sm:w-24 sm:h-20 transition-all ${
          isStumbling ? 'opacity-60 animate-wiggle' : 'opacity-100'
        } ${isCollecting ? '-translate-y-2' : ''} ${isMoving ? 'animate-bounce-subtle' : ''}`}
        style={{
          transform: `scaleX(${direction})`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Defs for gradients */}
          <defs>
            {/* Mushak Fur Gradient (Rich warm mouse grey / soft slate) */}
            <linearGradient id="mushakFur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="60%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Inner Ear Pink */}
            <linearGradient id="mushakPink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>

            {/* Golden Festive Ornaments */}
            <linearGradient id="goldOrnament" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Divine Fever Golden Fur */}
            <linearGradient id="feverFur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="60%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Tail (Curled, lively tail) */}
          <path
            d="M 22 54 C 10 52, 4 40, 8 28 C 10 20, 16 18, 18 24 C 18 28, 14 34, 12 40"
            fill="none"
            stroke={isFever ? '#F59E0B' : '#FDA4AF'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Back Feet */}
          <ellipse
            cx="28"
            cy="68"
            rx="8"
            ry="4"
            fill={isFever ? 'url(#feverFur)' : '#475569'}
            className={isMoving ? 'animate-pulse' : ''}
          />
          <ellipse
            cx="66"
            cy="69"
            rx="7"
            ry="3.5"
            fill={isFever ? 'url(#feverFur)' : '#475569'}
          />

          {/* Main Body */}
          <ellipse
            cx="48"
            cy="52"
            rx="28"
            ry="20"
            fill={isFever ? 'url(#feverFur)' : 'url(#mushakFur)'}
          />

          {/* Tummy (Softer lighter belly) */}
          <ellipse
            cx="46"
            cy="56"
            rx="18"
            ry="12"
            fill={isFever ? '#FFFBEB' : '#CBD5E1'}
            opacity="0.9"
          />

          {/* Head */}
          <ellipse
            cx="72"
            cy="40"
            rx="18"
            ry="15"
            fill={isFever ? 'url(#feverFur)' : 'url(#mushakFur)'}
          />

          {/* Left / Back Ear */}
          <ellipse
            cx="60"
            cy="24"
            rx="9"
            ry="13"
            transform="rotate(-15, 60, 24)"
            fill={isFever ? 'url(#feverFur)' : 'url(#mushakFur)'}
          />
          <ellipse
            cx="60"
            cy="24"
            rx="6"
            ry="9"
            transform="rotate(-15, 60, 24)"
            fill="url(#mushakPink)"
          />

          {/* Right / Front Ear */}
          <ellipse
            cx="74"
            cy="23"
            rx="9"
            ry="13"
            transform="rotate(10, 74, 23)"
            fill={isFever ? 'url(#feverFur)' : 'url(#mushakFur)'}
          />
          <ellipse
            cx="74"
            cy="23"
            rx="6"
            ry="9"
            transform="rotate(10, 74, 23)"
            fill="url(#mushakPink)"
          />

          {/* Snout & Whiskers */}
          <path
            d="M 82 40 C 90 42, 92 46, 84 50 Z"
            fill={isFever ? 'url(#feverFur)' : 'url(#mushakFur)'}
          />
          {/* Whiskers */}
          <line x1="84" y1="45" x2="98" y2="40" stroke="#E2E8F0" strokeWidth="1.2" />
          <line x1="84" y1="47" x2="99" y2="47" stroke="#E2E8F0" strokeWidth="1.2" />
          <line x1="84" y1="49" x2="96" y2="54" stroke="#E2E8F0" strokeWidth="1.2" />

          {/* Cute Nose */}
          <circle cx="88" cy="46" r="2.8" fill="#F43F5E" />

          {/* Eye with joyful shine */}
          <ellipse cx="76" cy="38" rx="3.5" ry="4.5" fill="#0F172A" />
          <circle cx="77.5" cy="36.5" r="1.5" fill="#FFFFFF" />
          <circle cx="75.5" cy="39" r="0.7" fill="#FFFFFF" />

          {/* Sacred Chandan / Tilak on Forehead */}
          <path
            d="M 70 30 C 70 26, 73 26, 73 30 C 73 32, 70 32, 70 30 Z"
            fill="#EA580C"
          />
          <circle cx="71.5" cy="29" r="1" fill="#FEF08A" />

          {/* Festive Golden Bell Collar / Sacred Garland */}
          <path
            d="M 60 48 Q 66 58, 76 52"
            fill="none"
            stroke="url(#goldOrnament)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Hanging Golden Ghungroo / Bell */}
          <circle cx="68" cy="56" r="3.2" fill="url(#goldOrnament)" stroke="#78350F" strokeWidth="0.8" />

          {/* Front Paws */}
          <ellipse
            cx="78"
            cy="60"
            rx="4.5"
            ry="3.5"
            fill={isFever ? '#FFFBEB' : '#E2E8F0'}
          />
        </svg>
      </div>

      {/* Gentle shadow under Mushak */}
      <div className="w-16 h-3 bg-black/40 rounded-full blur-[2px] mx-auto mt-[-4px]" />
    </div>
  );
}
