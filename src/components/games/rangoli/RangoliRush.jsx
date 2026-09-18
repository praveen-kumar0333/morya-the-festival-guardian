import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  Play,
  RotateCcw,
  Award,
  Check,
} from 'lucide-react';
import { useGame } from '../../../context/GameContext.jsx';
import { SCREENS, STAGES } from '../../../constants/gameData.js';
import { soundManager } from '../../../services/soundManager.js';
import GameHUD from '../../ui/GameHUD.jsx';
import ProgressIndicator from '../../ui/ProgressIndicator.jsx';
import FestiveButton from '../../ui/FestiveButton.jsx';
import FestiveCard from '../../ui/FestiveCard.jsx';
import RangoliGrid from './RangoliGrid.jsx';
import ColorPalette from './ColorPalette.jsx';
import RangoliResult from './RangoliResult.jsx';
import CelebrationBurst from '../../festive/CelebrationBurst.jsx';
import {
  ROUNDS_CONFIG,
  POWDER_COLORS,
  generateRangoliPattern,
  evaluateRangoliSubmission,
} from './RangoliPattern.js';

export default function RangoliRush() {
  const {
    scores,
    completeStage,
    currentCombo,
    incrementCombo,
    resetCombo,
    addToast,
    setRangoliResult,
  } = useGame();

  // Stage Lifecycle State
  const [hasStarted, setHasStarted] = useState(false);
  const [isStageComplete, setIsStageComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(75);

  // Round State (Rounds 1, 2, 3)
  const [roundNumber, setRoundNumber] = useState(1);
  const [phase, setPhase] = useState('observe'); // 'observe' | 'recreate' | 'checked'
  const [observeCountdown, setObserveCountdown] = useState(4);

  // Pattern Data
  const [targetPattern, setTargetPattern] = useState([]);
  const [playerGrid, setPlayerGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState('marigold');

  // Round Results Tracking
  const [evaluationData, setEvaluationData] = useState(null);
  const [roundScore, setRoundScore] = useState(0);
  const [roundTimeBonus, setRoundTimeBonus] = useState(0);
  const [completedRoundsList, setCompletedRoundsList] = useState([]);

  // Anti-bug & Execution Guards
  const completedRef = useRef(false);
  const scoredRoundsRef = useRef({});
  const previewTimerRef = useRef(null);
  const roundStartTimeRef = useRef(Date.now());

  // Session seed ensures stability across renders while offering variety
  const [sessionSeed] = useState(() => Math.floor(Math.random() * 1000) + 1);

  const currentRoundConfig = ROUNDS_CONFIG[roundNumber - 1] || ROUNDS_CONFIG[0];
  const size = currentRoundConfig.size;

  // 1. Initialize or Transition to a Round
  const initRound = useCallback(
    (rNum) => {
      const config = ROUNDS_CONFIG[rNum - 1] || ROUNDS_CONFIG[0];
      const pattern = generateRangoliPattern(rNum, sessionSeed);
      const emptyPlayerGrid = new Array(config.size * config.size).fill('empty');

      setRoundNumber(rNum);
      setTargetPattern(pattern);
      setPlayerGrid(emptyPlayerGrid);
      setSelectedColor(config.colors[0]);
      setEvaluationData(null);
      setRoundScore(0);
      setRoundTimeBonus(0);
      setPhase('observe');
      setObserveCountdown(Math.ceil(config.previewTime));

      roundStartTimeRef.current = Date.now();

      // Clear any prior interval
      if (previewTimerRef.current) {
        clearInterval(previewTimerRef.current);
      }

      // Countdown ticker for observation phase
      let countdown = Math.ceil(config.previewTime);
      previewTimerRef.current = setInterval(() => {
        countdown -= 1;
        if (countdown <= 0) {
          clearInterval(previewTimerRef.current);
          setObserveCountdown(0);
          setPhase('recreate');
          addToast('Now recreate the pattern!', 'festive', 2000);
        } else {
          setObserveCountdown(countdown);
        }
      }, 1000);
    },
    [sessionSeed, addToast]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearInterval(previewTimerRef.current);
      }
    };
  }, []);

  // Handle skip observation button
  const handleSkipObservation = () => {
    if (previewTimerRef.current) {
      clearInterval(previewTimerRef.current);
    }
    setObserveCountdown(0);
    setPhase('recreate');
    soundManager.playButton();
    addToast('Recreating rangoli now!', 'festive', 1500);
  };

  // Keyboard shortcut listener (1-5 for colors, Space/Enter for primary action)
  useEffect(() => {
    if (!hasStarted || isStageComplete) return;

    const handleKeyDown = (e) => {
      if (phase !== 'recreate') return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= currentRoundConfig.colors.length) {
        const colorKey = currentRoundConfig.colors[num - 1];
        if (colorKey) {
          setSelectedColor(colorKey);
          soundManager.playButton();
        }
      } else if (e.key === '0' || e.key.toLowerCase() === 'e') {
        setSelectedColor('empty');
        soundManager.playButton();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, isStageComplete, phase, currentRoundConfig]);

  // 2. Tile Painting Interaction (Tap cell -> paint with selectedColor, or toggle if already painted)
  const handleCellClick = (cellIndex) => {
    if (phase !== 'recreate' || !hasStarted || isStageComplete) return;

    setPlayerGrid((prev) => {
      const next = [...prev];
      // If clicking with same color, clear it back to empty (intuitive eraser toggle)
      if (next[cellIndex] === selectedColor) {
        next[cellIndex] = 'empty';
      } else {
        next[cellIndex] = selectedColor;
      }
      return next;
    });

    soundManager.playButton();
  };

  // Reset/clear player grid for active round
  const handleClearGrid = () => {
    if (phase !== 'recreate') return;
    setPlayerGrid(new Array(size * size).fill('empty'));
    soundManager.playButton();
    addToast('Grid reset. Paint afresh!', 'default', 1500);
  };

  // 3. Evaluate and Check Rangoli
  const handleCheckRangoli = () => {
    if (phase !== 'recreate' || scoredRoundsRef.current[roundNumber]) return;

    // Mark round as scored to prevent duplicate triggers
    scoredRoundsRef.current[roundNumber] = true;

    const evaluation = evaluateRangoliSubmission(playerGrid, targetPattern);
    setEvaluationData(evaluation);

    // Scoring math
    const cellScore = evaluation.correctCount * 50;
    const perfectBonus = evaluation.isPerfect ? 250 : 0;

    // Time bonus: fast recreation rewards extra points
    const timeTakenSec = (Date.now() - roundStartTimeRef.current) / 1000;
    const speedBonus = evaluation.isPerfect
      ? Math.max(0, Math.round((30 - timeTakenSec) * 10))
      : 0;

    const totalRoundPoints = cellScore + perfectBonus + speedBonus;
    setRoundScore(totalRoundPoints);
    setRoundTimeBonus(speedBonus);

    // Combo evaluation
    if (evaluation.isPerfect || evaluation.accuracy >= 80) {
      incrementCombo(1);
      soundManager.playCorrect();
      addToast(`+${totalRoundPoints} pts! Beautiful Rangoli!`, 'success');
    } else {
      resetCombo();
      soundManager.playWrong();
      addToast(`${evaluation.correctCount} / ${evaluation.totalCells} cells matched.`, 'warning');
    }

    // Save completed round data
    const roundRecord = {
      roundNumber,
      size,
      correctCount: evaluation.correctCount,
      totalCells: evaluation.totalCells,
      accuracy: evaluation.accuracy,
      isPerfect: evaluation.isPerfect,
      score: totalRoundPoints,
      playerGrid: [...playerGrid],
      targetPattern: [...targetPattern],
    };

    setCompletedRoundsList((prev) => [...prev, roundRecord]);
    setPhase('checked');
  };

  // 4. Stage Completion Sequence
  const handleStageComplete = useCallback(
    (finalCompletedList = completedRoundsList) => {
      if (completedRef.current) return;
      completedRef.current = true;

      soundManager.playCelebration();
      setIsStageComplete(true);
      setPhase('complete');

      if (previewTimerRef.current) {
        clearInterval(previewTimerRef.current);
      }

      // Persist Rangoli results into GameContext for Grand Morya screen
      const totalPoints = finalCompletedList.reduce((acc, r) => acc + (r.score || 0), 0);
      setRangoliResult({
        completedRounds: finalCompletedList.length,
        rounds: finalCompletedList,
        finalRangoliPattern: targetPattern,
        finalPlayerGrid: playerGrid,
        score: totalPoints,
        isCompleted: true,
      });
    },
    [completedRoundsList, targetPattern, playerGrid, setRangoliResult]
  );

  // 5. Handle Advancing to Next Round or Finalizing
  const handleNextRound = () => {
    soundManager.playButton();

    if (roundNumber < 3) {
      initRound(roundNumber + 1);
    } else {
      handleStageComplete();
    }
  };

  // 6. Handle Stage Timer Timeout (75s reached)
  const handleTimeUp = useCallback(() => {
    if (!completedRef.current) {
      addToast("Time's up for Rangoli Rush!", 'warning');
      handleStageComplete();
    }
  }, [addToast, handleStageComplete]);

  // Stage Score totals
  const totalRangoliPoints = completedRoundsList.reduce((acc, r) => acc + (r.score || 0), 0);
  const stageTimeBonus = Math.floor(timeRemaining * 15);
  const stageComboBonus = currentCombo * 50;
  const stageTotalScore = totalRangoliPoints + stageTimeBonus + stageComboBonus;

  // Continue to Stage 3 (Modak & Mushak placeholder)
  const handleContinueToNextStage = () => {
    completeStage(SCREENS.RANGOLI_RUSH, {
      rangoli: totalRangoliPoints,
      timeBonus: (scores.timeBonus || 0) + stageTimeBonus,
      comboBonus: (scores.comboBonus || 0) + stageComboBonus,
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center pb-4 relative">
      {/* 1. Universal In-Game HUD (75-second timer) */}
      <GameHUD
        stageId={SCREENS.RANGOLI_RUSH}
        timeLimit={75}
        isPaused={!hasStarted || isStageComplete}
        onTick={(sec) => setTimeRemaining(sec)}
        onTimeUp={handleTimeUp}
      />

      {/* 2. Visual Progress Tracker */}
      <div className="w-full max-w-4xl px-4 pt-2">
        <ProgressIndicator currentScreen={SCREENS.RANGOLI_RUSH} />
      </div>

      {/* 3. Main Stage Content Area */}
      <main className="w-full max-w-4xl px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center gap-3">
        {/* Round Badge & Instructions Bar */}
        <div className="flex items-center justify-between w-full max-w-xl px-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-400/40 text-rose-300 font-bold text-xs">
              Round {roundNumber} / 3
            </span>
            <span className="text-xs sm:text-sm font-heading font-semibold text-amber-100">
              {currentRoundConfig.title}
            </span>
          </div>

          <div className="text-[11px] sm:text-xs text-amber-300/80 font-mono">
            Grid: {size} × {size}
          </div>
        </div>

        {/* The Rangoli Sacred Grid */}
        <RangoliGrid
          size={size}
          gridData={phase === 'observe' ? targetPattern : playerGrid}
          evaluationData={evaluationData}
          phase={phase}
          countdownSeconds={observeCountdown}
          onCellClick={handleCellClick}
          onSkipObservation={handleSkipObservation}
        />

        {/* Powder Palette (Shown only during recreation) */}
        {phase === 'recreate' && (
          <div className="w-full flex flex-col items-center gap-3">
            <ColorPalette
              availableColors={currentRoundConfig.colors}
              selectedColor={selectedColor}
              onSelectColor={(col) => {
                soundManager.playButton();
                setSelectedColor(col);
              }}
              onClearGrid={handleClearGrid}
            />

            {/* Check Rangoli Button */}
            <FestiveButton
              variant="primary"
              size="lg"
              icon={Check}
              onClick={handleCheckRangoli}
              id="check-rangoli-btn"
              className="w-full max-w-xs text-sm sm:text-base font-heading font-bold shadow-xl"
            >
              CHECK RANGOLI
            </FestiveButton>
          </div>
        )}
      </main>

      {/* ========================================================
          OVERLAY 1: START INSTRUCTION OVERLAY
         ======================================================== */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <FestiveCard
            highlight
            className="max-w-md w-full border-2 border-rose-400/60 shadow-2xl text-center"
          >
            <div className="space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-500 via-amber-500 to-yellow-400 text-stone-950 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Palette className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-rose-300">
                  Stage 2 • Pattern Memory
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-100 mt-1">
                  RANGOLI RUSH
                </h2>
                <p className="text-sm text-amber-200/90 mt-2 leading-relaxed font-medium">
                  Remember the pattern. Recreate it before time runs out across 3 auspicious rounds of increasing complexity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-amber-200/90 flex items-center justify-around">
                <div>
                  <span className="block text-rose-300 font-bold">Round 1</span>
                  <span className="text-amber-300/70">3 × 3 Grid</span>
                </div>
                <div className="w-px h-6 bg-rose-500/30" />
                <div>
                  <span className="block text-rose-300 font-bold">Round 2</span>
                  <span className="text-amber-300/70">4 × 4 Grid</span>
                </div>
                <div className="w-px h-6 bg-rose-500/30" />
                <div>
                  <span className="block text-rose-300 font-bold">Round 3</span>
                  <span className="text-amber-300/70">5 × 5 Grid</span>
                </div>
              </div>

              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full text-base sm:text-lg font-heading font-bold"
                icon={Play}
                onClick={() => {
                  soundManager.playButton();
                  setHasStarted(true);
                  initRound(1);
                  addToast('Round 1: Observe the pattern carefully!', 'festive');
                }}
                id="start-rangoli-stage-btn"
              >
                START RANGOLI
              </FestiveButton>
            </div>
          </FestiveCard>
        </div>
      )}

      {/* ========================================================
          OVERLAY 2: ROUND RESULT DIALOG
         ======================================================== */}
      {phase === 'checked' && evaluationData && (
        <RangoliResult
          roundNumber={roundNumber}
          totalRounds={3}
          evaluation={evaluationData}
          roundScore={roundScore}
          timeBonus={roundTimeBonus}
          isPerfect={evaluationData.isPerfect}
          targetGrid={targetPattern}
          playerGrid={playerGrid}
          size={size}
          onNextRound={handleNextRound}
        />
      )}

      {/* ========================================================
          OVERLAY 3: STAGE COMPLETE SUMMARY
         ======================================================== */}
      {isStageComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-gentle-pulse relative">
          <CelebrationBurst count={20} className="z-10 opacity-90" />
          <FestiveCard
            highlight
            className="max-w-lg w-full border-2 border-rose-400/80 shadow-2xl text-center relative z-20"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-500 to-amber-400 text-stone-950 flex items-center justify-center shadow-xl shadow-rose-500/40">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-rose-300">
                  All 3 Rounds Complete! 🌸
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-100 mt-1">
                  RANGOLI RUSH COMPLETE
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-1">
                  Your vibrant floral kolams and mandalas bring auspicious blessings to the festival.
                </p>
              </div>

              {/* Itemized Stage Score Breakdown */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-rose-950/50 to-stone-900/80 border border-rose-400/40 space-y-2.5 text-left text-xs sm:text-sm">
                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-rose-400" />
                    Rangoli Patterns Score ({completedRoundsList.length} / 3 rounds):
                  </span>
                  <span className="font-bold font-mono text-amber-100">
                    +{totalRangoliPoints}
                  </span>
                </div>

                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Time Bonus ({timeRemaining}s remaining):
                  </span>
                  <span className="font-bold font-mono text-cyan-300">
                    +{stageTimeBonus}
                  </span>
                </div>

                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    Combo Bonus ({currentCombo}x combo):
                  </span>
                  <span className="font-bold font-mono text-orange-300">
                    +{stageComboBonus}
                  </span>
                </div>

                <div className="pt-2 border-t border-rose-500/30 flex justify-between items-center text-sm sm:text-base font-bold text-amber-300">
                  <span>Total Stage Score:</span>
                  <span className="font-heading font-black text-lg sm:text-xl text-yellow-300 tabular-nums">
                    {stageTotalScore.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Continue Button to Stage 3 Placeholder */}
              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full text-base sm:text-lg font-heading font-bold"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleContinueToNextStage}
                id="continue-stage-2-btn"
              >
                CONTINUE
              </FestiveButton>
            </div>
          </FestiveCard>
        </div>
      )}
    </div>
  );
}
