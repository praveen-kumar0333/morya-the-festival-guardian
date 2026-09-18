import React, { useState, useEffect, useRef } from 'react';
import {
  Leaf,
  Sparkles,
  Trophy,
  CheckCircle,
  Play,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Clock,
  Flame,
  Award,
  AlertCircle,
} from 'lucide-react';
import { useGame } from '../../../context/GameContext.jsx';
import { SCREENS, MODALS } from '../../../constants/gameData.js';
import { soundManager } from '../../../services/soundManager.js';
import GameHUD from '../../ui/GameHUD.jsx';
import ProgressIndicator from '../../ui/ProgressIndicator.jsx';
import FestiveCard from '../../ui/FestiveCard.jsx';
import FestiveButton from '../../ui/FestiveButton.jsx';
import Diya from '../../festive/Diya.jsx';
import MarigoldGarland from '../../festive/MarigoldGarland.jsx';
import CelebrationBurst from '../../festive/CelebrationBurst.jsx';

import {
  getShuffledSituations,
  getEcoRank,
  getComboMultiplier,
  ECO_SETTINGS,
} from './ecoGameData.js';
import EcoSpiritMeter from './EcoSpiritMeter.jsx';
import EcoEnvironment from './EcoEnvironment.jsx';
import EcoChoiceCard from './EcoChoiceCard.jsx';

export default function EcoCelebration() {
  const {
    scores,
    activeModal,
    currentCombo,
    incrementCombo,
    resetCombo,
    completeStage,
    addToast,
    setEcoResult,
  } = useGame();

  // Lifecycle States
  const [hasStarted, setHasStarted] = useState(false);
  const [isStageComplete, setIsStageComplete] = useState(false);

  // Gameplay Data & Flow
  const [situations, setSituations] = useState(() => getShuffledSituations());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ecoSpirit, setEcoSpirit] = useState(ECO_SETTINGS.INITIAL_ECO_SPIRIT);
  const [prevSpirit, setPrevSpirit] = useState(ECO_SETTINGS.INITIAL_ECO_SPIRIT);
  const [choiceScore, setChoiceScore] = useState(0);

  // Selection & Feedback
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null); // 'correct' | 'wrong'
  const [feedbackConsequence, setFeedbackConsequence] = useState(null);
  const [isEcoChoice, setIsEcoChoice] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Statistics
  const [ecoFriendlyCount, setEcoFriendlyCount] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [lastEarnedScore, setLastEarnedScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(ECO_SETTINGS.STAGE_TIME);
  const [finalScoreBreakdown, setFinalScoreBreakdown] = useState(null);

  const timeRemainingRef = useRef(ECO_SETTINGS.STAGE_TIME);
  const completedRef = useRef(false);
  const transitionTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);

  const isPaused = activeModal !== null;

  // Track highest combo
  useEffect(() => {
    if (currentCombo > highestCombo) {
      setHighestCombo(currentCombo);
    }
  }, [currentCombo, highestCombo]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Start the Stage
  const handleStartGame = () => {
    soundManager.playButton();
    setHasStarted(true);
    completedRef.current = false;
    isNavigatingRef.current = false;
    timeRemainingRef.current = ECO_SETTINGS.STAGE_TIME;
    setTimeRemaining(ECO_SETTINGS.STAGE_TIME);
  };

  // Reset / Play Again
  const handleRestart = () => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    completedRef.current = false;
    isNavigatingRef.current = false;
    setSituations(getShuffledSituations());
    setCurrentIndex(0);
    setEcoSpirit(ECO_SETTINGS.INITIAL_ECO_SPIRIT);
    setPrevSpirit(ECO_SETTINGS.INITIAL_ECO_SPIRIT);
    setChoiceScore(0);
    setSelectedChoiceId(null);
    setFeedbackState(null);
    setFeedbackConsequence(null);
    setIsEcoChoice(null);
    setIsTransitioning(false);
    setEcoFriendlyCount(0);
    setHighestCombo(0);
    setLastEarnedScore(0);
    setTimeRemaining(ECO_SETTINGS.STAGE_TIME);
    timeRemainingRef.current = ECO_SETTINGS.STAGE_TIME;
    setFinalScoreBreakdown(null);
    setIsStageComplete(false);
    setHasStarted(true);
    resetCombo();
  };

  // Timer Tick Handler
  const handleTick = (secondsLeft) => {
    timeRemainingRef.current = secondsLeft;
    setTimeRemaining(secondsLeft);
  };

  // Stage Completion Handler
  const handleStageComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    const remainingTime = Math.max(0, timeRemainingRef.current);
    const multiplierBonus = highestCombo * 30;
    const ecoBonus = ecoFriendlyCount * ECO_SETTINGS.PER_CHOICE_ECO_BONUS;
    const perfectBonus =
      ecoFriendlyCount === situations.length ? ECO_SETTINGS.PERFECT_ECO_BONUS : 0;
    const timeBonus = remainingTime * ECO_SETTINGS.TIME_BONUS_MULTIPLIER;
    const finalStageScore =
      choiceScore + multiplierBonus + ecoBonus + perfectBonus + timeBonus;

    const resultData = {
      ecoFriendlyChoices: ecoFriendlyCount,
      totalChoices: situations.length,
      highestCombo,
      finalEcoSpirit: ecoSpirit,
      choiceScore,
      comboBonus: multiplierBonus,
      ecoBonus,
      perfectEcoBonus: perfectBonus,
      timeBonus,
      finalStageScore,
    };

    setFinalScoreBreakdown(resultData);
    setEcoResult(resultData);
    setIsStageComplete(true);
    soundManager.playCelebration();

    if (ecoFriendlyCount === situations.length) {
      addToast('🌿 Perfect Eco Celebration! +150 Perfect Bonus!', 'festive');
    } else {
      addToast('Stage 4 Complete! Mother Earth is blessed.', 'success');
    }
  };

  // Choice Selection
  const handleSelectChoice = (choice) => {
    if (!hasStarted || isPaused || isTransitioning || isStageComplete) return;

    setIsTransitioning(true);
    setSelectedChoiceId(choice.id);
    setIsEcoChoice(choice.isEco);
    setFeedbackConsequence(choice.consequence);

    // Calculate score with combo multiplier
    const currentMult = getComboMultiplier(currentCombo);
    const earned = choice.score * currentMult;
    setLastEarnedScore(earned);
    setChoiceScore((prev) => prev + earned);

    // Update Eco Spirit (clamped 0 to 100)
    setPrevSpirit(ecoSpirit);
    const nextSpirit = Math.max(
      ECO_SETTINGS.MIN_ECO_SPIRIT,
      Math.min(ECO_SETTINGS.MAX_ECO_SPIRIT, ecoSpirit + choice.ecoDelta)
    );
    setEcoSpirit(nextSpirit);

    if (choice.isEco) {
      setFeedbackState('correct');
      setEcoFriendlyCount((prev) => prev + 1);
      const nextCombo = currentCombo + 1;
      incrementCombo(1);

      if (nextCombo === 3 || nextCombo === 5) {
        soundManager.playCombo(nextCombo);
        addToast(`🔥 ${nextCombo}x Combo Active!`, 'festive');
      } else {
        soundManager.playCorrect();
      }
    } else {
      setFeedbackState('wrong');
      resetCombo();
      soundManager.playWrong();
    }

    // Schedule transition to next situation or stage end
    transitionTimeoutRef.current = setTimeout(() => {
      if (currentIndex + 1 < situations.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedChoiceId(null);
        setFeedbackState(null);
        setFeedbackConsequence(null);
        setIsEcoChoice(null);
        setIsTransitioning(false);
      } else {
        handleStageComplete();
      }
    }, ECO_SETTINGS.FEEDBACK_DURATION_MS);
  };

  // Continue to Grand Morya
  const handleProceedToGrandMorya = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    soundManager.playButton();
    if (finalScoreBreakdown) {
      const ecoSpiritScore =
        finalScoreBreakdown.choiceScore +
        finalScoreBreakdown.ecoBonus +
        (finalScoreBreakdown.perfectEcoBonus || 0);

      completeStage(SCREENS.ECO_CELEBRATION, {
        ecoSpirit: ecoSpiritScore,
        comboBonus: (scores?.comboBonus || 0) + finalScoreBreakdown.comboBonus,
        timeBonus: (scores?.timeBonus || 0) + finalScoreBreakdown.timeBonus,
      });
    }
  };

  const currentSituation = situations[currentIndex] || situations[0];
  const rankInfo = finalScoreBreakdown ? getEcoRank(finalScoreBreakdown.finalEcoSpirit) : null;

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-stone-950 text-amber-50 selection:bg-amber-500 selection:text-stone-950 pb-8">
      {/* Top HUD */}
      <GameHUD
        stageId={SCREENS.ECO_CELEBRATION}
        timeLimit={ECO_SETTINGS.STAGE_TIME}
        isPaused={isPaused || !hasStarted || isStageComplete}
        onTick={handleTick}
        onTimeUp={handleStageComplete}
      />

      {/* Stage Progression Indicator */}
      <ProgressIndicator currentScreen={SCREENS.ECO_CELEBRATION} className="mt-1" />

      {/* Main Stage Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-3 flex flex-col justify-center gap-4">
        {/* ======================================================== */}
        {/* 1. INITIAL INSTRUCTIONS MODAL / OVERLAY                  */}
        {/* ======================================================== */}
        {!hasStarted && (
          <FestiveCard
            variant="elevated"
            className="max-w-xl mx-auto p-6 sm:p-8 text-center animate-fade-in relative overflow-hidden"
          >
            <div className="absolute -top-3 left-0 right-0 pointer-events-none opacity-80">
              <MarigoldGarland count={7} />
            </div>

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/20">
              <Leaf className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-1">
              Final Challenge • Stage 4
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-amber-100 mb-2">
              Eco Celebration
            </h1>
            <p className="text-sm text-stone-300 max-w-md mx-auto mb-6 leading-relaxed font-medium">
              Choose the greener path for the celebration. Navigate 6 festive scenarios with sustainable choices to protect our rivers and celebrate with devotion!
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto mb-6 text-left">
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/20 text-center">
                <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Eco Spirit
                </span>
                <span className="text-xs font-bold text-emerald-300">0 – 100</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/20 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Stage Timer
                </span>
                <span className="text-xs font-bold text-amber-300">60 Seconds</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/20 text-center">
                <Flame className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Combos
                </span>
                <span className="text-xs font-bold text-orange-300">Up to 3x</span>
              </div>
            </div>

            <FestiveButton
              variant="primary"
              size="lg"
              onClick={handleStartGame}
              icon={Play}
              className="w-full justify-center !text-base shadow-lg shadow-amber-500/20"
            >
              Start Eco Celebration
            </FestiveButton>
          </FestiveCard>
        )}

        {/* ======================================================== */}
        {/* 2. ACTIVE GAMEPLAY VIEW                                 */}
        {/* ======================================================== */}
        {hasStarted && !isStageComplete && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Top Bar: Eco Spirit Meter */}
            <EcoSpiritMeter
              spirit={ecoSpirit}
              previousSpirit={prevSpirit}
              id="stage4-eco-meter"
            />

            {/* Reactive Festival Environment Visual */}
            <EcoEnvironment
              ecoSpirit={ecoSpirit}
              situationTitle={currentSituation.title}
              feedbackConsequence={feedbackConsequence}
              isEcoChoice={isEcoChoice}
            />

            {/* Situation Prompt Header */}
            <div className="text-center mt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                <span>Situation {currentIndex + 1} of {situations.length}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-stone-400 font-normal">
                  {situations.length - (currentIndex + 1)} Remaining
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg sm:text-2xl text-amber-100 tracking-wide">
                {currentSituation.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-300 mt-0.5">
                {currentSituation.scenario}
              </p>
            </div>

            {/* Choices Grid (3 cards) */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-2"
              role="group"
              aria-label="Festival Choices"
            >
              {currentSituation.choices.map((choice, idx) => (
                <EcoChoiceCard
                  key={choice.id}
                  choice={choice}
                  index={idx}
                  onSelect={handleSelectChoice}
                  isSelected={selectedChoiceId === choice.id}
                  isOtherSelected={selectedChoiceId !== null && selectedChoiceId !== choice.id}
                  disabled={isTransitioning || isPaused}
                  feedbackState={selectedChoiceId === choice.id ? feedbackState : null}
                  earnedScore={selectedChoiceId === choice.id ? lastEarnedScore : null}
                />
              ))}
            </div>

            {/* Bottom Situation Progress Pips */}
            <div className="flex items-center justify-center gap-2 mt-2">
              {situations.map((sit, idx) => (
                <div
                  key={sit.id}
                  title={`Situation ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-400 shadow-sm shadow-amber-400/50'
                      : idx < currentIndex
                      ? 'w-4 bg-emerald-500'
                      : 'w-2 bg-stone-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. STAGE 4 FINAL RESULT SCREEN                          */}
        {/* ======================================================== */}
        {isStageComplete && finalScoreBreakdown && (
          <FestiveCard
            variant="elevated"
            className="max-w-xl mx-auto p-5 sm:p-7 text-center animate-fade-in relative overflow-hidden"
            id="eco-result-card"
          >
            <CelebrationBurst count={20} className="z-10 opacity-90" />
            <div className="absolute -top-3 left-0 right-0 pointer-events-none opacity-80">
              <MarigoldGarland count={7} />
            </div>

            {/* Top Rank Badge */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-stone-950 shadow-xl shadow-emerald-500/30">
              <Award className="w-8 h-8 text-stone-950" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-1">
              Stage 4 Concluded
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-amber-100 mb-1">
              🌿 ECO CELEBRATION COMPLETE!
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mb-4">
              Your celebration is blessed and ready for the final reveal.
            </p>

            {/* Perfect Celebration Banner if all 6 eco-friendly */}
            {finalScoreBreakdown.ecoFriendlyChoices === situations.length && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>🌿 PERFECT ECO CELEBRATION! (+150 Bonus)</span>
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </div>
            )}

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-2 rounded-xl bg-stone-900/80 border border-amber-500/20">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Eco Spirit
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-300">
                  {finalScoreBreakdown.finalEcoSpirit} / 100
                </span>
              </div>
              <div className="p-2 rounded-xl bg-stone-900/80 border border-amber-500/20">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Eco Choices
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-300">
                  {finalScoreBreakdown.ecoFriendlyChoices} / {situations.length}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-stone-900/80 border border-amber-500/20">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Best Combo
                </span>
                <span className="text-sm sm:text-base font-bold text-orange-300">
                  {finalScoreBreakdown.highestCombo}x
                </span>
              </div>
            </div>

            {/* Score Breakdown Table */}
            <div className="w-full bg-stone-900/90 rounded-xl border border-stone-800 p-3 sm:p-4 mb-5 text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between text-stone-300">
                <span>Choice Score</span>
                <span className="font-semibold text-amber-300">
                  +{finalScoreBreakdown.choiceScore}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Combo Bonus</span>
                <span className="font-semibold text-orange-300">
                  +{finalScoreBreakdown.comboBonus}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Eco Bonus</span>
                <span className="font-semibold text-emerald-300">
                  +{finalScoreBreakdown.ecoBonus}
                </span>
              </div>
              {finalScoreBreakdown.perfectEcoBonus > 0 && (
                <div className="flex justify-between text-emerald-300 font-semibold">
                  <span>Perfect Bonus</span>
                  <span>+{finalScoreBreakdown.perfectEcoBonus}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-300">
                <span>Time Bonus ({timeRemainingRef.current}s left)</span>
                <span className="font-semibold text-amber-400">
                  +{finalScoreBreakdown.timeBonus}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-sm sm:text-base text-amber-200">
                <span>TOTAL STAGE SCORE</span>
                <span className="text-amber-400 font-heading">
                  +{finalScoreBreakdown.finalStageScore}
                </span>
              </div>
            </div>

            {/* Performance Rank */}
            {rankInfo && (
              <div className="mb-5 p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/20">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                  Earned Title
                </span>
                <span className="text-base font-bold text-emerald-300 font-heading">
                  {rankInfo.title}
                </span>
                <span className="text-xs text-stone-400 block mt-0.5">
                  {rankInfo.sub}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <FestiveButton
                variant="outline"
                size="md"
                onClick={handleRestart}
                icon={RotateCcw}
                className="flex-1 justify-center"
              >
                Replay Stage 4
              </FestiveButton>
              <FestiveButton
                variant="primary"
                size="md"
                onClick={handleProceedToGrandMorya}
                icon={ArrowRight}
                className="flex-1 justify-center shadow-lg shadow-amber-500/20"
              >
                CONTINUE
              </FestiveButton>
            </div>
          </FestiveCard>
        )}
      </main>
    </div>
  );
}
