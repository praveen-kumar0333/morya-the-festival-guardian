import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  Home,
  Sparkles,
  Heart,
  Share2,
  Award,
  Trophy,
  Gift,
} from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { SCREENS } from '../../constants/gameData.js';
import MarigoldGarland from '../festive/MarigoldGarland.jsx';
import Diya from '../festive/Diya.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import FestiveCard from '../ui/FestiveCard.jsx';
import FinalFestivalEnvironment from './FinalFestivalEnvironment.jsx';
import FestivalReveal, { REVEAL_STEPS } from './FestivalReveal.jsx';
import FinalScoreReveal from './FinalScoreReveal.jsx';
import FestivalJourneySummary from './FestivalJourneySummary.jsx';
import GuardianRank from './GuardianRank.jsx';
import CelebrationBurst from '../festive/CelebrationBurst.jsx';
import { soundManager } from '../../services/soundManager.js';

export default function GrandMorya() {
  const {
    scores,
    highScore,
    calculateTotalScore,
    startGame,
    goToMainMenu,
    maxCombo,
    pandalArrangement,
    rangoliResult,
    mushakResult,
    ecoResult,
    addToast,
    setCurrentScreen,
    activeSelections,
    achievements,
    collectionState,
    playerStats,
  } = useGame();

  // State management for cinematic reveal
  const [revealStep, setRevealStep] = useState(REVEAL_STEPS.INTRO);
  const [isRevealCompleted, setIsRevealCompleted] = useState(false);
  const [scoreAnimationDone, setScoreAnimationDone] = useState(false);

  // Guards to prevent multiple sounds or double navigation
  const celebrationTriggeredRef = useRef(false);
  const isNavigatingRef = useRef(false);

  const totalScore = calculateTotalScore(scores);
  const isNewHighScore = totalScore >= highScore && totalScore > 0;
  const ecoSpirit = ecoResult?.finalEcoSpirit ?? 80;

  // Trigger celebration audio on completion
  const handleTriggerGrandCelebration = () => {
    setIsRevealCompleted(true);
    if (!celebrationTriggeredRef.current) {
      celebrationTriggeredRef.current = true;
      soundManager.playCelebration();
    }
  };

  // Skip reveal completely
  const handleSkipReveal = () => {
    handleTriggerGrandCelebration();
  };

  // Advance reveal step
  const handleStepChange = (nextStep) => {
    setRevealStep(nextStep);
  };

  // Safe navigation handlers
  const handlePlayAgain = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    soundManager.playButton();
    startGame();
  };

  const handleMainMenu = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    soundManager.playButton();
    goToMainMenu();
  };

  // Map reveal step to environment stage string
  const getActiveEnvStage = () => {
    if (isRevealCompleted) return 'complete';
    switch (revealStep) {
      case REVEAL_STEPS.INTRO:
        return 'intro';
      case REVEAL_STEPS.PANDAL:
        return 'pandal';
      case REVEAL_STEPS.RANGOLI:
        return 'rangoli';
      case REVEAL_STEPS.PROTECT:
        return 'protect';
      case REVEAL_STEPS.SHINE:
        return 'shine';
      default:
        return 'complete';
    }
  };

  return (
    <div
      id="grand-morya-screen"
      className="w-full flex-1 flex flex-col items-center justify-between px-3 sm:px-6 py-4 sm:py-6 max-w-5xl mx-auto z-10 space-y-4"
    >
      {/* Top Auspicious Garland */}
      <MarigoldGarland className="my-1 max-w-3xl" />

      {/* Main Container */}
      <main className="w-full flex flex-col items-center space-y-4">
        {/* ====================================================
            1. SACRED FESTIVAL ENVIRONMENT
           ==================================================== */}
        <FinalFestivalEnvironment
          ecoSpirit={ecoSpirit}
          activeRevealStage={getActiveEnvStage()}
          pandalArrangement={pandalArrangement}
          rangoliResult={rangoliResult}
          mushakResult={mushakResult}
          activeSelections={activeSelections}
        />

        {/* ====================================================
            2. CINEMATIC REVEAL STEP CARDS (BEFORE COMPLETION)
           ==================================================== */}
        {!isRevealCompleted && (
          <FestivalReveal
            currentStep={revealStep}
            onStepChange={handleStepChange}
            onSkip={handleSkipReveal}
            scores={scores}
            pandalArrangement={pandalArrangement}
            rangoliResult={rangoliResult}
            mushakResult={mushakResult}
            ecoResult={ecoResult}
          />
        )}

        {/* ====================================================
            3. GRAND TRANSFORMATION & FINALE SUMMARY (AFTER REVEAL)
           ==================================================== */}
        {isRevealCompleted && (
          <div className="w-full flex flex-col items-center space-y-5 animate-fade-in relative">
            {/* Grand Celebration Burst of Auspicious Light & Confetti */}
            <CelebrationBurst count={24} className="z-40 opacity-90" />

            {/* Grand Devotional Title Banner */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <Diya size={42} activeDiyaId={activeSelections?.diyas} />
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-300 block">
                    Divine Blessings Awoken
                  </span>
                  <h1 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 drop-shadow-md">
                    GANPATI BAPPA MORYA!
                  </h1>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                    "Build the celebration. Protect the spirit. Make Morya shine."
                  </p>
                </div>
                <Diya size={42} activeDiyaId={activeSelections?.diyas} />
              </div>
            </div>

            {/* Total Cumulative Score Display with Count-up Animation */}
            <FinalScoreReveal
              totalScore={totalScore}
              highScore={highScore}
              isNewHighScore={isNewHighScore}
              maxCombo={maxCombo}
              onAnimationComplete={() => setScoreAnimationDone(true)}
            />

            {/* Festival Guardian Rank (Deterministic from actual final score) */}
            <GuardianRank totalScore={totalScore} />

            {/* Itemized Score Breakdown & Journey Achievements */}
            <FestiveCard highlight className="w-full max-w-2xl border-amber-300/50 p-4 sm:p-6 shadow-xl">
              <FestivalJourneySummary
                scores={scores}
                totalScore={totalScore}
                pandalArrangement={pandalArrangement}
                rangoliResult={rangoliResult}
                mushakResult={mushakResult}
                ecoResult={ecoResult}
                achievements={achievements}
                collectionState={collectionState}
                activeSelections={activeSelections}
                playerStats={playerStats}
                highScore={highScore}
                isNewHighScore={isNewHighScore}
                onViewCollection={() => setCurrentScreen(SCREENS.FESTIVAL_COLLECTION)}
              />
            </FestiveCard>

            {/* Sacred Benediction Blessing */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900/60 to-amber-950/40 border border-amber-500/20 max-w-lg mx-auto text-center shadow-inner">
              <p className="text-xs text-amber-200 italic">
                "May Lord Ganesha bestow upon you and your loved ones wisdom, good health, prosperous beginnings, and everlasting joy!"
              </p>
            </div>

            {/* Final Action Buttons: Play Again & Main Menu */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full sm:w-auto flex-1 text-base font-heading font-bold"
                icon={RotateCcw}
                onClick={handlePlayAgain}
                id="grand-play-again-btn"
              >
                PLAY AGAIN
              </FestiveButton>

              <FestiveButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex-1 text-base font-heading font-bold"
                icon={Home}
                onClick={handleMainMenu}
                id="grand-main-menu-btn"
              >
                MAIN MENU
              </FestiveButton>
            </div>

            {/* Quick Records, Achievements & Collection Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-md">
              <FestiveButton
                variant="secondary"
                size="sm"
                className="flex-1 min-w-[100px] text-xs sm:text-sm bg-stone-900/80 border-amber-500/30"
                icon={Award}
                onClick={() => setCurrentScreen(SCREENS.ACHIEVEMENTS)}
                id="grand-achievements-btn"
              >
                Achievements
              </FestiveButton>

              <FestiveButton
                variant="secondary"
                size="sm"
                className="flex-1 min-w-[100px] text-xs sm:text-sm bg-stone-900/80 border-amber-500/30"
                icon={Trophy}
                onClick={() => setCurrentScreen(SCREENS.PERSONAL_RECORDS)}
                id="grand-records-btn"
              >
                My Records
              </FestiveButton>

              <FestiveButton
                variant="secondary"
                size="sm"
                className="flex-1 min-w-[100px] text-xs sm:text-sm bg-stone-900/80 border-amber-500/30 text-amber-200"
                icon={Gift}
                onClick={() => setCurrentScreen(SCREENS.FESTIVAL_COLLECTION)}
                id="grand-collection-btn"
              >
                Collection
              </FestiveButton>
            </div>
          </div>
        )}
      </main>

      {/* Footer message */}
      <footer className="w-full text-center py-2 text-xs text-amber-400/60 select-none">
        Ganpati Bappa Morya • Pudhchya Varshi Lavkar Ya!
      </footer>
    </div>
  );
}
