import React from 'react';
import MushakPlayer from './MushakPlayer.jsx';
import Collectible from './Collectible.jsx';
import Obstacle from './Obstacle.jsx';
import { GAME_SETTINGS } from './mushakGameData.js';

/**
 * GameWorld - Festive mandap courtyard arena
 * Logical coordinates: 800 x 500
 * Scaled responsively to container size via percentage positioning
 */
export default function GameWorld({
  mushakState = {
    x: 400,
    y: 420,
    direction: 1,
    isMoving: false,
    isCollecting: false,
    isFever: false,
    isStumbling: false,
  },
  collectibles = [],
  obstacles = [],
  popups = [],
  isFeverActive = false,
  id,
}) {
  const { WORLD_WIDTH, WORLD_HEIGHT } = GAME_SETTINGS;

  return (
    <div
      id={id || 'mushak-game-world'}
      className="relative w-full max-w-3xl aspect-[16/10] mx-auto rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-b from-[#1c0803] via-[#240b04] to-[#120501] shadow-2xl shadow-black select-none touch-none"
    >
      {/* 1. Festive Mandap Decorative Canopy & Toran (Top) */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none z-20 flex flex-col justify-between overflow-hidden">
        {/* Festive Marigold Garland Toran SVG */}
        <svg viewBox="0 0 800 50" className="w-full h-12 preserve-3d" preserveAspectRatio="none">
          <defs>
            <linearGradient id="marigoldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Hanging Scallops */}
          {[0, 100, 200, 300, 400, 500, 600, 700].map((x) => (
            <g key={x}>
              <path
                d={`M ${x} 0 Q ${x + 50} 35, ${x + 100} 0`}
                fill="none"
                stroke="url(#marigoldGrad)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Mango leaves hanging from garland */}
              <path
                d={`M ${x + 50} 22 C ${x + 46} 36, ${x + 54} 36, ${x + 50} 46`}
                stroke="#059669"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* 2. Side Mandap Pillars with Warm Lanterns */}
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-amber-950/80 to-transparent border-r border-amber-500/20 pointer-events-none z-10">
        <div className="absolute top-16 left-2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/80 animate-pulse" />
        <div className="absolute top-44 left-2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/80 animate-pulse" />
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-amber-950/80 to-transparent border-l border-amber-500/20 pointer-events-none z-10">
        <div className="absolute top-16 right-2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/80 animate-pulse" />
        <div className="absolute top-44 right-2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/80 animate-pulse" />
      </div>

      {/* 3. Morya Fever Atmosphere Glow */}
      {isFeverActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/15 via-rose-500/10 to-yellow-500/15 pointer-events-none z-0 animate-pulse" />
      )}

      {/* 4. Auspicious Rangoli Floor Strip (Ground level where Mushak runs) */}
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#0a0301] to-[#1f0903] border-t border-amber-500/30 pointer-events-none z-10">
        {/* Subtle decorative dot-pattern Kolam floor */}
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        {/* Glowing running guide track */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      </div>

      {/* 5. Render Collectibles (Percentage-positioned for perfect responsiveness) */}
      {collectibles.map((item) => {
        const leftPercent = (item.x / WORLD_WIDTH) * 100;
        const topPercent = (item.y / WORLD_HEIGHT) * 100;

        return (
          <div
            key={item.id}
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            <Collectible item={{ ...item, x: 0, y: 0 }} />
          </div>
        );
      })}

      {/* 6. Render Obstacles */}
      {obstacles.map((obs) => {
        const leftPercent = (obs.x / WORLD_WIDTH) * 100;
        const topPercent = (obs.y / WORLD_HEIGHT) * 100;

        return (
          <div
            key={obs.id}
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            <Obstacle obstacle={{ ...obs, x: 0, y: 0 }} />
          </div>
        );
      })}

      {/* 7. Render Mushak Player */}
      {(() => {
        const leftPercent = (mushakState.x / WORLD_WIDTH) * 100;
        const topPercent = (mushakState.y / WORLD_HEIGHT) * 100;

        return (
          <div
            className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            <MushakPlayer
              x={0}
              y={0}
              direction={mushakState.direction}
              isMoving={mushakState.isMoving}
              isCollecting={mushakState.isCollecting}
              isFever={mushakState.isFever}
              isStumbling={mushakState.isStumbling}
            />
          </div>
        );
      })()}

      {/* 8. Floating Score Popups */}
      {popups.map((popup) => {
        const leftPercent = (popup.x / WORLD_WIDTH) * 100;
        const topPercent = (popup.y / WORLD_HEIGHT) * 100;

        return (
          <div
            key={popup.id}
            className={`absolute z-40 pointer-events-none font-heading font-black text-xs sm:text-sm animate-float-fade flex items-center gap-1 ${
              popup.isPenalty
                ? 'text-rose-400'
                : popup.isFever
                ? 'text-yellow-300 drop-shadow-md text-sm sm:text-base'
                : 'text-amber-300'
            }`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            <span>{popup.text}</span>
          </div>
        );
      })}
    </div>
  );
}
