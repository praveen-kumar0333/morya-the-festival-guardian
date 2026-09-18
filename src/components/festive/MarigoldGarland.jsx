import React from 'react';

export default function MarigoldGarland({ className = '', id }) {
  // Repeating flower beads
  const flowers = Array.from({ length: 16 });

  return (
    <div
      id={id || 'festive-marigold-garland'}
      className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex justify-between items-center px-2 py-1">
        {/* Toran sacred connecting thread */}
        <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 opacity-70" />

        {flowers.map((_, i) => (
          <div key={i} className="flex flex-col items-center relative z-10">
            {/* Small green mango leaf */}
            {i % 2 === 0 && (
              <div
                className="w-2.5 h-3.5 bg-gradient-to-b from-emerald-600 to-teal-800 rounded-b-full transform -rotate-6 shadow-sm mb-0.5"
              />
            )}
            {/* Fluffy Marigold Bloom (Genda Phool) */}
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md transform hover:scale-110 transition-transform ${
                i % 2 === 0
                  ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 ring-1 ring-yellow-300/40'
                  : 'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 ring-1 ring-amber-300/40'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-orange-700/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
