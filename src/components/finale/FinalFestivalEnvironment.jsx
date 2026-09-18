import React from 'react';
import { Sparkles, Heart, Leaf } from 'lucide-react';
import {
  ToranVisual,
  DraperyVisual,
  FlowersVisual,
  DiyasVisual,
  OfferingPlateVisual,
  RangoliVisual,
  DevotionalCenterpiece,
} from '../games/pandal/PandalItemVisuals.jsx';
import MushakPlayer from '../games/mushak/MushakPlayer.jsx';
import CollectionDecorVisuals from './CollectionDecorVisuals.jsx';

export default function FinalFestivalEnvironment({
  ecoSpirit = 80,
  activeRevealStage = 'complete', // 'intro' | 'pandal' | 'rangoli' | 'mushak' | 'eco' | 'complete'
  pandalArrangement = {},
  rangoliResult = null,
  mushakResult = null,
  activeSelections = {},
  className = '',
}) {
  const isHighEco = ecoSpirit >= 80;
  const isModerateEco = ecoSpirit >= 50 && ecoSpirit < 80;
  const isLowEco = ecoSpirit < 50;

  // Track which elements are highlighted or active
  const isPandalAwake = activeRevealStage !== 'intro';
  const isRangoliAwake = activeRevealStage !== 'intro' && activeRevealStage !== 'pandal';
  const isMushakAwake =
    activeRevealStage === 'protect' ||
    activeRevealStage === 'mushak' ||
    activeRevealStage === 'eco' ||
    activeRevealStage === 'shine' ||
    activeRevealStage === 'complete';
  const isEcoAwake =
    activeRevealStage === 'protect' ||
    activeRevealStage === 'eco' ||
    activeRevealStage === 'shine' ||
    activeRevealStage === 'complete';
  const isFullTransformation = activeRevealStage === 'shine' || activeRevealStage === 'complete';

  return (
    <div
      id="final-festival-environment"
      aria-label="Lord Ganesha Festive Mandap Celebration"
      className={`relative w-full max-w-4xl mx-auto min-h-[360px] sm:min-h-[440px] rounded-3xl overflow-hidden border-2 transition-all duration-1000 select-none ${
        isFullTransformation
          ? 'border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.4)] bg-gradient-to-b from-stone-950 via-[#1f0d04] to-stone-950'
          : 'border-amber-500/30 shadow-2xl bg-gradient-to-b from-stone-950 via-[#140803] to-stone-950'
      } ${className}`}
    >
      {/* 1. Ambient Background Glow and Lanterns */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isFullTransformation
            ? 'opacity-80 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.25)_0%,rgba(220,38,38,0.1)_50%,transparent_80%)]'
            : isPandalAwake
            ? 'opacity-50 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.15)_0%,transparent_70%)]'
            : 'opacity-25 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.08)_0%,transparent_60%)]'
        }`}
      />

      {/* 2. Top Arch & Sacred Toran */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 transition-all duration-700 ${
          isPandalAwake ? 'opacity-100 translate-y-0' : 'opacity-40 -translate-y-2'
        }`}
      >
        <div className="w-full max-w-2xl mx-auto px-4 pt-1">
          <ToranVisual className="w-full h-12 sm:h-16 drop-shadow-md" />
        </div>
      </div>

      {/* 3. Silk Drapery Curtains on Left & Right */}
      <div
        className={`absolute inset-x-0 top-0 h-48 sm:h-64 z-10 pointer-events-none transition-all duration-700 ${
          isPandalAwake ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
        }`}
      >
        <DraperyVisual className="w-full h-full" />
      </div>

      {/* 4. Eco Spirit Foliage (Banana Plants & Fresh Leaves) */}
      <div
        className={`absolute inset-0 z-15 pointer-events-none transition-opacity duration-1000 ${
          isEcoAwake ? 'opacity-100' : 'opacity-30'
        }`}
      >
        {/* Left Banana Plant Spray */}
        <div className="absolute left-2 sm:left-6 bottom-16 sm:bottom-20 flex flex-col items-center">
          <svg viewBox="0 0 100 160" className="w-16 h-28 sm:w-24 sm:h-40 overflow-visible">
            <path
              d="M 50 160 Q 30 90, 10 40 Q 25 35, 50 80 Q 75 35, 90 40 Q 70 90, 50 160"
              fill={isHighEco ? '#15803D' : '#166534'}
              stroke="#22C55E"
              strokeWidth="1.5"
              className="drop-shadow-md"
            />
            <path d="M 50 160 L 50 40" stroke="#86EFAC" strokeWidth="1.2" strokeDasharray="3 3" />
            {isHighEco && (
              <g transform="translate(50, 40)">
                <circle cx="0" cy="0" r="12" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
                <circle cx="0" cy="0" r="6" fill="#EA580C" />
              </g>
            )}
          </svg>
        </div>

        {/* Right Banana Plant Spray */}
        <div className="absolute right-2 sm:right-6 bottom-16 sm:bottom-20 flex flex-col items-center">
          <svg viewBox="0 0 100 160" className="w-16 h-28 sm:w-24 sm:h-40 overflow-visible">
            <path
              d="M 50 160 Q 30 90, 10 40 Q 25 35, 50 80 Q 75 35, 90 40 Q 70 90, 50 160"
              fill={isHighEco ? '#15803D' : '#166534'}
              stroke="#22C55E"
              strokeWidth="1.5"
              className="drop-shadow-md"
            />
            <path d="M 50 160 L 50 40" stroke="#86EFAC" strokeWidth="1.2" strokeDasharray="3 3" />
            {isHighEco && (
              <g transform="translate(50, 40)">
                <circle cx="0" cy="0" r="12" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
                <circle cx="0" cy="0" r="6" fill="#EA580C" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 5. Central Sanctuary: Lord Ganesha Shrine */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-10 sm:pt-14 pb-4">
        {/* Divine Godray Radiance behind Sanctuary */}
        <div className="absolute top-28 sm:top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] pointer-events-none z-10">
          <div className="w-full h-full rounded-full bg-radial-gradient from-amber-400/25 via-yellow-500/10 to-transparent blur-2xl animate-divine-ray motion-reduce:animate-none" />
          {isFullTransformation && (
            <div
              className="absolute inset-0 opacity-25 animate-spin-slow motion-reduce:animate-none"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(253,224,71,0.3) 15deg, transparent 30deg, rgba(253,224,71,0.3) 45deg, transparent 60deg, rgba(253,224,71,0.3) 75deg, transparent 90deg, rgba(253,224,71,0.3) 105deg, transparent 120deg, rgba(253,224,71,0.3) 135deg, transparent 150deg, rgba(253,224,71,0.3) 165deg, transparent 180deg, rgba(253,224,71,0.3) 195deg, transparent 210deg, rgba(253,224,71,0.3) 225deg, transparent 240deg, rgba(253,224,71,0.3) 255deg, transparent 270deg, rgba(253,224,71,0.3) 285deg, transparent 300deg, rgba(253,224,71,0.3) 315deg, transparent 330deg, rgba(253,224,71,0.3) 345deg, transparent 360deg)',
              }}
            />
          )}
        </div>

        {/* Flower Garlands framing the throne */}
        <div
          className={`w-full max-w-md mx-auto px-4 -mb-8 transition-opacity duration-700 relative z-20 ${
            isPandalAwake ? 'opacity-100' : 'opacity-30'
          }`}
        >
          <FlowersVisual className="w-full h-20 sm:h-24" />
        </div>

        {/* Devotional Centerpiece: Lord Ganesha on Singhasan */}
        <div
          className={`relative z-20 transition-all duration-1000 ${
            isFullTransformation
              ? 'scale-105 filter drop-shadow-[0_0_30px_rgba(245,158,11,0.7)]'
              : 'scale-100'
          }`}
        >
          <DevotionalCenterpiece />
        </div>

        {/* Sacred Prasad Offering Thali on Pedestal */}
        <div
          className={`-mt-6 z-25 transition-all duration-700 ${
            isPandalAwake ? 'opacity-100 translate-y-0 scale-100' : 'opacity-40 translate-y-2 scale-90'
          }`}
        >
          <div className="w-40 sm:w-52 h-20 sm:h-24 mx-auto">
            <OfferingPlateVisual className="w-full h-full" />
          </div>
        </div>

        {/* Sacred Floor Rangoli Mandala */}
        <div
          className={`-mt-4 z-10 transition-all duration-1000 ${
            isRangoliAwake
              ? 'opacity-100 scale-100 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]'
              : 'opacity-25 scale-90'
          }`}
        >
          <div className="w-48 sm:w-64 h-32 sm:h-40 mx-auto">
            <RangoliVisual className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* 6. Traditional Pedestal Diyas (Left & Right) */}
      <div
        className={`absolute bottom-6 inset-x-4 sm:inset-x-12 z-30 transition-opacity duration-700 ${
          isFullTransformation || activeRevealStage === 'pandal' ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <DiyasVisual className="w-full" activeDiyaId={activeSelections?.diyas} />
      </div>

      {/* 7. Celebrating Mushak Companion */}
      <div
        className={`absolute bottom-6 right-8 sm:right-20 z-35 transition-all duration-700 ${
          isMushakAwake
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
      >
        <div className="relative">
          {/* Gentle happy bounce and celebration indicator */}
          <MushakPlayer
            x={40}
            y={30}
            direction={-1} // Looking respectfully left towards Lord Ganesha
            isMoving={false}
            isCollecting={isFullTransformation || activeRevealStage === 'mushak'}
            isFever={isFullTransformation}
            className="!relative !left-auto !top-auto !transform-none animate-bounce-subtle"
          />
          {isMushakAwake && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-stone-900/90 border border-amber-400/70 text-[10px] text-amber-300 font-bold shadow-md">
              Prasad Blessed! ✨
            </div>
          )}
        </div>
      </div>

      {/* 8. Eco Environment Status Pill */}
      {isEcoAwake && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div
            className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-lg border backdrop-blur-md ${
              isHighEco
                ? 'bg-emerald-950/80 border-emerald-400/60 text-emerald-200'
                : isModerateEco
                ? 'bg-amber-950/80 border-amber-400/50 text-amber-200'
                : 'bg-stone-900/80 border-stone-600/50 text-stone-300'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>
              {isHighEco
                ? '🌿 Radiant Eco-Mandap • Nature Blessed'
                : isModerateEco
                ? '🌸 Balanced Festival Atmosphere'
                : '🌱 Every choice helps shape the celebration'}
            </span>
          </div>
        </div>
      )}

      {/* 9. Floating Festive Particles & Flower Petals in Full Transformation */}
      {isFullTransformation && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 motion-reduce:hidden">
          {[...Array(12)].map((_, i) => {
            const left = `${(i * 8.5 + 4) % 96}%`;
            const delay = `${(i * 0.4) % 3}s`;
            const duration = `${3 + (i % 3)}s`;
            const isMarigold = i % 2 === 0;
            return (
              <div
                key={i}
                className="absolute -top-4 rounded-full pointer-events-none animate-float-particle"
                style={{
                  left,
                  animationDelay: delay,
                  animationDuration: duration,
                  width: isMarigold ? '8px' : '6px',
                  height: isMarigold ? '8px' : '6px',
                  backgroundColor: isMarigold ? '#F59E0B' : '#EF4444',
                  boxShadow: '0 0 6px rgba(253, 224, 71, 0.8)',
                  opacity: 0.8,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 10. Active Festival Collection Visual Adornments */}
      <CollectionDecorVisuals
        activeSelections={activeSelections}
        isAwake={isPandalAwake}
        isFullTransformation={isFullTransformation}
      />
    </div>
  );
}
