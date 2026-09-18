import React, { useMemo } from 'react';

/**
 * CelebrationBurst
 * 
 * Renders a lightweight celebratory particle burst of golden stars and marigold petals.
 * Automatically completes with CSS animations. 100% decorative and pointer-events-none.
 */
export default function CelebrationBurst({ count = 12, className = '' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360;
      const distance = 40 + (i % 4) * 20;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * distance;
      const ty = Math.sin(rad) * distance;
      const delay = (i * 0.04).toFixed(2);
      const isStar = i % 2 === 0;

      return {
        id: i,
        tx,
        ty,
        delay,
        isStar,
        color: isStar ? '#FDE047' : '#F59E0B',
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center motion-reduce:hidden ${className}`}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full animate-celebration-pop"
          style={{
            transform: `translate(${p.tx}px, ${p.ty}px)`,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
