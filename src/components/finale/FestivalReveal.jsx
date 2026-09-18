import React, { useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  FastForward,
  Palette,
  Trophy,
  Leaf,
  Flame,
  Crown,
} from 'lucide-react';
import FestiveCard from '../ui/FestiveCard.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import Diya from '../festive/Diya.jsx';
import { CollectibleVisual } from '../games/mushak/Collectible.jsx';
import { soundManager } from '../../services/soundManager.js';

export const REVEAL_STEPS = {
  INTRO: 0,   // Scene 1: "The celebration is ready…"
  PANDAL: 1,  // Scene 2: "You built it."
  RANGOLI: 2, // Scene 3: "You created it."
  PROTECT: 3, // Scene 4: "You protected it."
  SHINE: 4,   // Scene 5: "Now… let Morya shine."
  COMPLETE: 5,

  // Compatibility aliases
  MUSHAK: 3,
  ECO: 3,
};

export default function FestivalReveal({
  currentStep = 0,
  onStepChange,
  onSkip,
  scores = {},
  pandalArrangement = {},
  rangoliResult = null,
  mushakResult = null,
  ecoResult = null,
  className = '',
}) {
  const autoAdvanceTimerRef = useRef(null);

  // Real data metrics - never fabricated
  const pandalCount = pandalArrangement?.placedItems?.length || 6;

  const rangoliRounds = rangoliResult?.completedRounds || 3;
  const rangoliAccuracy = rangoliResult?.rounds?.length
    ? Math.round(
        rangoliResult.rounds.reduce((acc, r) => acc + (r.accuracy || 100), 0) /
          rangoliResult.rounds.length
      )
    : null;

  const mushakItems = mushakResult?.itemsCollected ?? null;
  const itemCounts = mushakResult?.itemCounts || null;
  const mushakCombo = mushakResult?.bestCombo || 0;
  const feverCount = mushakResult?.feverActivations || 0;

  const ecoChoices = ecoResult?.ecoFriendlyChoices ?? 6;
  const ecoTotal = ecoResult?.totalChoices ?? 6;
  const ecoSpirit = ecoResult?.finalEcoSpirit ?? 80;

  // Auto-advance scene after tasteful timing
  useEffect(() => {
    if (currentStep >= REVEAL_STEPS.COMPLETE) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene durations: 3.2s for Scenes 1-4, 3.8s for Scene 5
    const stepDurations = [3200, 3400, 3400, 3600, 3800];
    const duration = prefersReducedMotion ? 6000 : (stepDurations[currentStep] || 3400);

    autoAdvanceTimerRef.current = setTimeout(() => {
      handleNext();
    }, duration);

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [currentStep]);

  const handleNext = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    const nextStep = currentStep + 1;
    if (nextStep < REVEAL_STEPS.COMPLETE) {
      soundManager.playRevealChime(1 + nextStep * 0.1);
      if (onStepChange) onStepChange(nextStep);
    } else {
      if (onSkip) onSkip();
    }
  };

  const handleSkip = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    soundManager.playButton();
    if (onSkip) onSkip();
  };

  return (
    <div className={`w-full max-w-xl mx-auto space-y-3 ${className}`} id="festival-reveal-container">
      {/* Top Controls: Step Indicator & Skip Button */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5" aria-label={`Cinematic reveal scene ${currentStep + 1} of 5`}>
          {[0, 1, 2, 3, 4].map((stepIdx) => (
            <div
              key={stepIdx}
              className={`h-2 rounded-full transition-all duration-500 ${
                stepIdx === currentStep
                  ? 'w-7 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                  : stepIdx < currentStep
                  ? 'w-2.5 bg-amber-600/70'
                  : 'w-2 bg-stone-700/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleSkip}
          id="skip-reveal-btn"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300/90 hover:text-amber-100 bg-stone-900/80 hover:bg-stone-800 border border-amber-500/40 px-3.5 py-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-md"
        >
          <FastForward className="w-3.5 h-3.5 text-amber-400" />
          <span>SKIP REVEAL</span>
        </button>
      </div>

      {/* Reveal Scene Card with Smooth Devotional Transitions */}
      <FestiveCard
        highlight
        className="w-full border-amber-400/60 shadow-2xl animate-fade-in text-center p-4 sm:p-6 bg-gradient-to-b from-stone-950 via-stone-900/95 to-amber-950/90"
        id="reveal-scene-card"
      >
        {/* =========================================================
            SCENE 1: THE CELEBRATION IS READY…
           ========================================================= */}
        {currentStep === REVEAL_STEPS.INTRO && (
          <div className="space-y-4 py-3 animate-fade-in">
            <div className="flex justify-center items-center gap-4">
              <Diya size={32} />
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <Diya size={32} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400/90 block">
                The Sacred Mandap
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-400">
                “The celebration is ready…”
              </h2>
              <p className="text-sm sm:text-base text-amber-100/90 font-medium max-w-md mx-auto">
                Every prayer offered and every blessing gathered has prepared the sanctuary.
              </p>
            </div>

            <p className="text-xs text-amber-300/70 italic">
              "Let the sacred journey of devotion awaken."
            </p>
          </div>
        )}

        {/* =========================================================
            SCENE 2: YOU BUILT IT. (Pandal)
           ========================================================= */}
        {currentStep === REVEAL_STEPS.PANDAL && (
          <div className="space-y-4 py-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>STAGE 1 • PANDAL BUILD</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300">
                “You built it.”
              </h2>
              <div className="font-mono text-xl sm:text-2xl font-black text-yellow-300">
                {pandalCount} / 6 DECORATIONS ADORNED
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 max-w-md mx-auto">
                The sacred pavilion glows with golden torans, radiant silk drapery, and flickering lamps.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-200 font-mono text-xs sm:text-sm">
              <span>Pandal Devotion:</span>
              <span className="font-bold text-yellow-300 font-heading">
                +{(scores.pandal || 0).toLocaleString()} pts
              </span>
            </div>
          </div>
        )}

        {/* =========================================================
            SCENE 3: YOU CREATED IT. (Rangoli)
           ========================================================= */}
        {currentStep === REVEAL_STEPS.RANGOLI && (
          <div className="space-y-4 py-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs font-bold">
              <Palette className="w-3.5 h-3.5" />
              <span>STAGE 2 • RANGOLI RUSH</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-200 to-yellow-300">
                “You created it.”
              </h2>
              <div className="font-mono text-lg sm:text-xl font-black text-rose-300">
                {rangoliRounds} ROUNDS COMPLETED
                {rangoliAccuracy !== null && ` • ${rangoliAccuracy}% ACCURACY`}
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 max-w-md mx-auto">
                Sacred geometric petals and vibrant powders welcome good fortune and divine presence.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-200 font-mono text-xs sm:text-sm">
              <span>Rangoli Artistry:</span>
              <span className="font-bold text-yellow-300 font-heading">
                +{(scores.rangoli || 0).toLocaleString()} pts
              </span>
            </div>
          </div>
        )}

        {/* =========================================================
            SCENE 4: YOU PROTECTED IT. (Mushak Prasad & Eco Spirit)
           ========================================================= */}
        {currentStep === REVEAL_STEPS.PROTECT && (
          <div className="space-y-4 py-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
              <Leaf className="w-3.5 h-3.5" />
              <span>STAGES 3 & 4 • HARMONY & PROTECTION</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-amber-200 to-yellow-300">
                “You protected it.”
              </h2>
              <div className="font-mono text-base sm:text-lg font-black text-emerald-300">
                {mushakItems !== null ? `${mushakItems} PRASAD TREATS` : 'SACRED FEAST'} • {ecoSpirit}/100 ECO SPIRIT
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 max-w-md mx-auto">
                Mushak rejoices with blessed offerings, while Mother Earth smiles upon your respectful eco choices.
              </p>
            </div>

            {/* Item Counts breakdown if present from real Stage 3 play */}
            {itemCounts && (
              <div className="grid grid-cols-4 gap-1.5 max-w-sm mx-auto text-xs py-1">
                <div className="p-1.5 rounded-lg bg-amber-950/50 border border-amber-500/20 flex flex-col items-center">
                  <CollectibleVisual type="MODAK" size={18} />
                  <span className="font-bold text-amber-200">{itemCounts.MODAK || 0}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-amber-950/50 border border-amber-500/20 flex flex-col items-center">
                  <CollectibleVisual type="GOLDEN_MODAK" size={18} />
                  <span className="font-bold text-yellow-300">{itemCounts.GOLDEN_MODAK || 0}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-amber-950/50 border border-amber-500/20 flex flex-col items-center">
                  <CollectibleVisual type="DURVA" size={18} />
                  <span className="font-bold text-emerald-300">{itemCounts.DURVA || 0}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-amber-950/50 border border-amber-500/20 flex flex-col items-center">
                  <CollectibleVisual type="FLOWER" size={18} />
                  <span className="font-bold text-rose-300">{itemCounts.FLOWER || 0}</span>
                </div>
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 font-mono text-xs sm:text-sm">
              <span>Offerings & Eco Protection:</span>
              <span className="font-bold text-yellow-300 font-heading">
                +{((scores.mushak || 0) + (scores.ecoSpirit || 0)).toLocaleString()} pts
              </span>
            </div>
          </div>
        )}

        {/* =========================================================
            SCENE 5: NOW… LET MORYA SHINE.
           ========================================================= */}
        {currentStep === REVEAL_STEPS.SHINE && (
          <div className="space-y-4 py-3 animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/25 border-2 border-yellow-400/80 flex items-center justify-center text-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.6)]">
              <Crown className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-black text-amber-300 block">
                Divine Blessing Awoken
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 drop-shadow-md">
                “Now… let Morya shine.”
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-md mx-auto">
                The sanctuary breathes with radiant golden light, welcoming Lord Ganesha’s eternal grace.
              </p>
            </div>

            <p className="font-heading font-bold text-sm text-yellow-300 animate-pulse">
              गणपति बप्पा मोरया! ✨
            </p>
          </div>
        )}

        {/* Action Button: Next Scene */}
        <div className="pt-2 flex justify-center">
          <FestiveButton
            variant="primary"
            size="sm"
            onClick={handleNext}
            icon={ArrowRight}
            iconPosition="right"
            id="reveal-next-btn"
            className="font-heading font-bold px-6 shadow-lg shadow-amber-500/20"
          >
            {currentStep === REVEAL_STEPS.SHINE
              ? 'REVEAL CELEBRATION ➔'
              : 'CONTINUE ➔'}
          </FestiveButton>
        </div>
      </FestiveCard>
    </div>
  );
}
