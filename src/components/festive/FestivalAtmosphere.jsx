import React, { useMemo } from 'react';

/**
 * FestivalAtmosphere
 * 
 * Lightweight ambient particle and flower petal atmosphere.
 * Uses pure CSS animations for silky-smooth performance with zero React rerenders.
 * Uses pointer-events-none so it never intercepts clicks or touch inputs.
 */
export default function FestivalAtmosphere({
  showPetals = true,
  showSparkles = true,
  className = '',
}) {
  // Pre-calculate deterministic particle configs so no math runs on rerender
  const petals = useMemo(
    () => [
      { id: 1, left: '6%', delay: '0s', duration: '9s', size: 14, type: 'marigold' },
      { id: 2, left: '18%', delay: '3.5s', duration: '11s', size: 12, type: 'rose' },
      { id: 3, left: '32%', delay: '1.2s', duration: '10s', size: 15, type: 'marigold' },
      { id: 4, left: '48%', delay: '5.8s', duration: '12s', size: 11, type: 'rose' },
      { id: 5, left: '64%', delay: '2.1s', duration: '9.5s', size: 14, type: 'marigold' },
      { id: 6, left: '78%', delay: '4.3s', duration: '10.5s', size: 13, type: 'rose' },
      { id: 7, left: '92%', delay: '1.8s', duration: '11.5s', size: 12, type: 'marigold' },
    ],
    []
  );

  const sparkles = useMemo(
    () => [
      { id: 's1', left: '12%', top: '15%', delay: '0s', size: 8, color: '#FDE047' },
      { id: 's2', left: '26%', top: '45%', delay: '1.4s', size: 6, color: '#F59E0B' },
      { id: 's3', left: '42%', top: '22%', delay: '0.8s', size: 7, color: '#FEF08A' },
      { id: 's4', left: '58%', top: '55%', delay: '2.1s', size: 6, color: '#FDE047' },
      { id: 's5', left: '75%', top: '28%', delay: '1.7s', size: 9, color: '#F59E0B' },
      { id: 's6', left: '88%', top: '65%', delay: '0.5s', size: 7, color: '#FEF08A' },
    ],
    []
  );

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-[5] motion-reduce:hidden ${className}`}
    >
      {/* Subtle Falling Flower Petals */}
      {showPetals && (
        <div className="absolute inset-0">
          {petals.map((p) => {
            const isMarigold = p.type === 'marigold';
            return (
              <div
                key={p.id}
                className="absolute -top-6 animate-petal-fall"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  width: `${p.size}px`,
                  height: `${p.size * 1.3}px`,
                }}
              >
                {/* SVG Petal shape with soft gradient and drop-shadow */}
                <svg
                  viewBox="0 0 20 26"
                  className="w-full h-full filter drop-shadow-sm opacity-80"
                  fill="none"
                >
                  <path
                    d="M10 0 C16 6, 20 16, 10 26 C0 16, 4 6, 10 0 Z"
                    fill={isMarigold ? '#F59E0B' : '#EF4444'}
                    stroke={isMarigold ? '#FDE047' : '#F87171'}
                    strokeWidth="0.8"
                  />
                  <path
                    d="M10 4 L10 22"
                    stroke={isMarigold ? '#FEF08A' : '#FECACA'}
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      )}

      {/* Tiny Ambient Floating Light Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full animate-sparkle-twinkle"
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.delay,
                width: `${s.size}px`,
                height: `${s.size}px`,
                backgroundColor: s.color,
                boxShadow: `0 0 10px ${s.color}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
