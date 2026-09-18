import React from 'react';
import { Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import { getEcoStatus } from './ecoGameData.js';

export default function EcoSpiritMeter({
  spirit = 50,
  previousSpirit = 50,
  className = '',
  id = 'eco-spirit-meter',
}) {
  const clampedSpirit = Math.max(0, Math.min(100, spirit));
  const status = getEcoStatus(clampedSpirit);
  const isSurging = spirit > previousSpirit;
  const isChampion = clampedSpirit >= 100;
  const isGreen = clampedSpirit >= 80;

  return (
    <div
      id={id}
      aria-label={`Eco Spirit: ${clampedSpirit} out of 100, status: ${status.label}`}
      role="progressbar"
      aria-valuenow={clampedSpirit}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full max-w-xl mx-auto px-3 py-2 rounded-2xl bg-stone-950/80 border border-amber-500/20 backdrop-blur-md transition-all duration-500 ${
        isChampion
          ? 'shadow-lg shadow-emerald-500/30 border-emerald-400/60 ring-1 ring-emerald-400/40'
          : isGreen
          ? 'border-emerald-500/40 shadow-md shadow-emerald-500/10'
          : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        {/* Left: Icon & Label */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isGreen
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-amber-500/20 text-amber-300'
            }`}
          >
            {isChampion ? (
              <ShieldCheck className="w-4 h-4 animate-bounce" />
            ) : (
              <Leaf className="w-4 h-4" />
            )}
          </div>
          <div>
            <span className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block leading-tight">
              Eco Spirit Meter
            </span>
            <span
              className={`text-xs font-bold tracking-wide transition-colors ${status.colorClass}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Right: Numeric Value & Visual Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`px-2 py-0.5 rounded-full border text-[11px] font-bold transition-all ${
              status.badgeBg
            } ${status.colorClass} ${isSurging ? 'scale-105' : ''}`}
          >
            {clampedSpirit} / 100
          </div>
          {isChampion && (
            <Sparkles className="w-4 h-4 text-emerald-300 animate-spin-slow" />
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-3.5 bg-stone-900/90 rounded-full overflow-hidden border border-stone-800 shadow-inner">
        {/* Fill Bar */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out relative ${
            isChampion
              ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300 shadow-lg shadow-emerald-400/50'
              : isGreen
              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400'
              : clampedSpirit >= 50
              ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500'
              : 'bg-gradient-to-r from-stone-600 via-orange-600 to-amber-500'
          }`}
          style={{ width: `${clampedSpirit}%` }}
        >
          {/* Animated Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60 animate-pulse" />
        </div>

        {/* Indicator Markers (50 and 80) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/20"
          style={{ left: '50%' }}
          title="Balanced (50)"
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-emerald-400/30"
          style={{ left: '80%' }}
          title="Green Spirit (80)"
        />
      </div>

      {/* Subtext description */}
      <p className="text-[11px] text-stone-400 mt-1 text-center truncate">
        {status.description}
      </p>
    </div>
  );
}
