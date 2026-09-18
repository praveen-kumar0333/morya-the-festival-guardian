import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Eye,
  Check,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import RangoliGrid from '../games/rangoli/RangoliGrid.jsx';
import ColorPalette from '../games/rangoli/ColorPalette.jsx';
import ChallengeResult from './ChallengeResult.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { CHALLENGE_IDS, CHALLENGES } from '../../constants/challengeData.js';
import { recordChallengeAttempt } from '../../services/challengeStats.js';
import { soundManager } from '../../services/soundManager.js';
import { useGame } from '../../context/GameContext.jsx';

// Challenge Rounds Specification: 4x4, 5x5, 5x5
const CHALLENGE_ROUNDS = [
  {
    round: 1,
    size: 4,
    colors: ['marigold', 'saffron', 'lotus', 'leaf'],
    observeTime: 3.0,
    title: 'Trial 1: Auspicious 4x4 Kolam',
  },
  {
    round: 2,
    size: 5,
    colors: ['marigold', 'saffron', 'lotus', 'leaf', 'diya'],
    observeTime: 3.0,
    title: 'Trial 2: Sacred 5x5 Star Mandala',
  },
  {
    round: 3,
    size: 5,
    colors: ['diya', 'saffron', 'lotus', 'leaf', 'marigold'],
    observeTime: 2.5,
    title: 'Trial 3: Grand Festival Mandala',
  },
];

/**
 * Deterministic Sacred Symmetrical Pattern Generator for Challenges
 */
function createChallengePattern(roundIndex, seed = 1) {
  const cfg = CHALLENGE_ROUNDS[roundIndex];
  const size = cfg.size;
  const colors = cfg.colors;
  const grid = new Array(size * size).fill('empty');
  const idx = (r, c) => r * size + c;
  const v = Math.abs(seed + roundIndex) % colors.length;

  if (size === 4) {
    // 4x4 Four-Quadrant Rotational Symmetry
    const c1 = colors[v % colors.length];
    const c2 = colors[(v + 1) % colors.length];
    const c3 = colors[(v + 2) % colors.length];

    // Inner 2x2 ring
    grid[idx(1, 1)] = c1;
    grid[idx(1, 2)] = c1;
    grid[idx(2, 1)] = c1;
    grid[idx(2, 2)] = c1;

    // Cardinal middle edges
    grid[idx(0, 1)] = c2;
    grid[idx(0, 2)] = c2;
    grid[idx(3, 1)] = c2;
    grid[idx(3, 2)] = c2;
    grid[idx(1, 0)] = c2;
    grid[idx(2, 0)] = c2;
    grid[idx(1, 3)] = c2;
    grid[idx(2, 3)] = c2;

    // Corners
    grid[idx(0, 0)] = c3;
    grid[idx(0, 3)] = c3;
    grid[idx(3, 0)] = c3;
    grid[idx(3, 3)] = c3;
  } else if (size === 5) {
    const cCenter = colors[(v + 3) % colors.length];
    const cCross = colors[v % colors.length];
    const cDiag = colors[(v + 1) % colors.length];
    const cOuter = colors[(v + 2) % colors.length];

    // Center focal Bindu
    grid[idx(2, 2)] = cCenter;

    // Inner 4 Petals
    grid[idx(1, 2)] = cCross;
    grid[idx(3, 2)] = cCross;
    grid[idx(2, 1)] = cCross;
    grid[idx(2, 3)] = cCross;

    // Inner Diagonals
    grid[idx(1, 1)] = cDiag;
    grid[idx(1, 3)] = cDiag;
    grid[idx(3, 1)] = cDiag;
    grid[idx(3, 3)] = cDiag;

    // Outer Cardinal Points
    grid[idx(0, 2)] = cOuter;
    grid[idx(4, 2)] = cOuter;
    grid[idx(2, 0)] = cOuter;
    grid[idx(2, 4)] = cOuter;

    if (roundIndex === 2) {
      // Extra corner symmetry for Round 3 trial
      const cLeaf = colors[4] || cCenter;
      grid[idx(0, 0)] = cLeaf;
      grid[idx(0, 4)] = cLeaf;
      grid[idx(4, 0)] = cLeaf;
      grid[idx(4, 4)] = cLeaf;
    }
  }

  return grid;
}

export default function RangoliMaster({ onBackToChallenges, onMainMenu }) {
  const challengeConfig = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.RANGOLI_MASTER);
  const { addToast } = useGame();

  // Challenge Lifecycle States
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [phase, setPhase] = useState('observe'); // 'observe' | 'recreate' | 'checked'
  const [observeCountdown, setObserveCountdown] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(45); // 45s total
  const [selectedColor, setSelectedColor] = useState('marigold');

  // Pattern states
  const [targetPattern, setTargetPattern] = useState([]);
  const [playerGrid, setPlayerGrid] = useState([]);
  const [evaluationData, setEvaluationData] = useState(null);

  // Scoring & Stats
  const [totalScore, setTotalScore] = useState(0);
  const [roundStats, setRoundStats] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [completionStats, setCompletionStats] = useState(null);

  const mainTimerRef = useRef(null);
  const observeTimerRef = useRef(null);
  const completedRef = useRef(false);
  const timeRemainingRef = useRef(45);
  timeRemainingRef.current = timeRemaining;

  // Initialize Round
  const setupRound = useCallback((roundIdx) => {
    const cfg = CHALLENGE_ROUNDS[roundIdx];
    const target = createChallengePattern(roundIdx, Date.now());
    const emptyGrid = new Array(cfg.size * cfg.size).fill('empty');

    setTargetPattern(target);
    setPlayerGrid(emptyGrid);
    setEvaluationData(null);
    setSelectedColor(cfg.colors[0]);
    setPhase('observe');
    setObserveCountdown(Math.ceil(cfg.observeTime));

    if (observeTimerRef.current) clearInterval(observeTimerRef.current);

    let remainingObserve = cfg.observeTime;
    observeTimerRef.current = setInterval(() => {
      remainingObserve -= 0.5;
      setObserveCountdown(Math.ceil(Math.max(0, remainingObserve)));
      if (remainingObserve <= 0) {
        clearInterval(observeTimerRef.current);
        setPhase('recreate');
      }
    }, 500);
  }, []);

  // Reset / Start Challenge
  const resetChallenge = useCallback(() => {
    if (mainTimerRef.current) clearInterval(mainTimerRef.current);
    if (observeTimerRef.current) clearInterval(observeTimerRef.current);

    setTimeRemaining(45);
    setTotalScore(0);
    setRoundStats([]);
    setCurrentRoundIdx(0);
    setIsCompleted(false);
    setIsNewRecord(false);
    setCompletionStats(null);
    completedRef.current = false;

    setupRound(0);

    // Main 45-second overall timer
    mainTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(mainTimerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [setupRound]);

  useEffect(() => {
    resetChallenge();
    return () => {
      if (mainTimerRef.current) clearInterval(mainTimerRef.current);
      if (observeTimerRef.current) clearInterval(observeTimerRef.current);
    };
  }, [resetChallenge]);

  // Handle cell click during recreation
  const handleCellClick = (index) => {
    if (phase !== 'recreate' || completedRef.current) return;
    soundManager.playButton();

    setPlayerGrid((prev) => {
      const next = [...prev];
      // Toggle if already selected color, otherwise paint
      next[index] = next[index] === selectedColor ? 'empty' : selectedColor;
      return next;
    });
  };

  const handleClearGrid = () => {
    if (phase !== 'recreate') return;
    soundManager.playButton();
    const cfg = CHALLENGE_ROUNDS[currentRoundIdx];
    setPlayerGrid(new Array(cfg.size * cfg.size).fill('empty'));
  };

  // Submit and evaluate current round
  const handleVerifyRound = () => {
    if (phase !== 'recreate' || completedRef.current) return;
    const cfg = CHALLENGE_ROUNDS[currentRoundIdx];
    const totalCells = cfg.size * cfg.size;

    let matching = 0;
    const cellResults = [];

    for (let i = 0; i < totalCells; i++) {
      const isMatch = playerGrid[i] === targetPattern[i];
      if (isMatch) matching++;
      cellResults.push({
        index: i,
        playerColor: playerGrid[i],
        targetColor: targetPattern[i],
        isMatch,
      });
    }

    const accuracy = Math.round((matching / totalCells) * 100);
    const cellPoints = matching * 50;
    const perfectBonus = accuracy === 100 ? 250 : accuracy >= 90 ? 150 : 0;
    const roundScore = cellPoints + perfectBonus;

    setEvaluationData(cellResults);
    setPhase('checked');

    if (accuracy >= 90) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    const newStats = [
      ...roundStats,
      { round: currentRoundIdx + 1, accuracy, score: roundScore },
    ];
    setRoundStats(newStats);
    setTotalScore((s) => s + roundScore);

    // Next round or Victory
    setTimeout(() => {
      if (completedRef.current) return;

      if (currentRoundIdx < CHALLENGE_ROUNDS.length - 1) {
        const nextIdx = currentRoundIdx + 1;
        setCurrentRoundIdx(nextIdx);
        setupRound(nextIdx);
      } else {
        handleVictory(newStats);
      }
    }, 1800);
  };

  // Victory (All 3 rounds finished within 45s)
  const handleVictory = (finalStats) => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (mainTimerRef.current) clearInterval(mainTimerRef.current);
    if (observeTimerRef.current) clearInterval(observeTimerRef.current);

    const remaining = timeRemainingRef.current;
    const roundsScore = finalStats.reduce((acc, r) => acc + r.score, 0);
    const avgAccuracy = Math.round(
      finalStats.reduce((acc, r) => acc + r.accuracy, 0) / finalStats.length
    );

    const completionBonus = 500;
    const speedBonus = remaining * 15;
    const finalScore = roundsScore + completionBonus + speedBonus;

    setTotalScore(finalScore);
    soundManager.playCelebration();

    const recordResult = recordChallengeAttempt(CHALLENGE_IDS.RANGOLI_MASTER, {
      score: finalScore,
      accuracy: avgAccuracy,
      completed: true,
    });

    setIsNewRecord(recordResult.isNewRecord);
    if (recordResult.isNewRecord) {
      addToast('🏆 NEW CHALLENGE RECORD! Rangoli Master', 'festive', 4500);
    }

    setCompletionStats({
      finalScore,
      avgAccuracy: `${avgAccuracy}%`,
      roundsCompleted: '3 / 3',
      speedBonus: `+${speedBonus} pts (${remaining}s remaining)`,
      personalBest: recordResult.newBest,
    });
    setIsCompleted(true);
  };

  // Time Up
  const handleTimeUp = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (observeTimerRef.current) clearInterval(observeTimerRef.current);
    soundManager.playWrong();

    setRoundStats((currentStats) => {
      const avgAccuracy = currentStats.length
        ? Math.round(currentStats.reduce((acc, r) => acc + r.accuracy, 0) / currentStats.length)
        : 0;
      const finalScore = currentStats.reduce((acc, r) => acc + r.score, 0);

      const recordResult = recordChallengeAttempt(CHALLENGE_IDS.RANGOLI_MASTER, {
        score: finalScore,
        accuracy: avgAccuracy,
        completed: false,
      });

      setIsNewRecord(recordResult.isNewRecord);
      setCompletionStats({
        finalScore,
        avgAccuracy: `${avgAccuracy}%`,
        roundsCompleted: `${currentStats.length} / 3`,
        speedBonus: 'Time Expired',
        personalBest: recordResult.newBest,
      });
      setIsCompleted(true);
      return currentStats;
    });
  };

  const currentConfig = CHALLENGE_ROUNDS[currentRoundIdx];

  if (isCompleted && completionStats) {
    return (
      <ChallengeResult
        challenge={challengeConfig}
        score={completionStats.finalScore}
        isNewRecord={isNewRecord}
        personalBest={completionStats.personalBest}
        details={[
          { label: 'Rounds Completed', value: completionStats.roundsCompleted, icon: CheckCircle2 },
          { label: 'Avg Accuracy', value: completionStats.avgAccuracy, icon: Sparkles },
          { label: 'Time Bonus', value: completionStats.speedBonus, icon: Clock },
          { label: 'Master Rank', value: 'Rangoli Vidya', icon: Trophy },
        ]}
        onPlayAgain={resetChallenge}
        onBackToChallenges={onBackToChallenges}
        onMainMenu={onMainMenu}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-2.5 sm:p-4 text-amber-50 select-none overflow-x-hidden">
      {/* Header HUD */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-stone-950/85 border border-amber-500/30 backdrop-blur-md shadow-xl z-30">
        <div className="flex items-center gap-2">
          <FestiveButton
            variant="outline"
            size="sm"
            className="p-1.5 h-8 w-8 text-amber-300"
            onClick={onBackToChallenges}
            aria-label="Back to challenges"
          >
            <ArrowLeft className="w-4 h-4" />
          </FestiveButton>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg">🎨</span>
              <h1 className="text-xs sm:text-base font-heading font-extrabold uppercase tracking-wide text-amber-300">
                Rangoli Master
              </h1>
            </div>
            <p className="text-[10px] text-amber-300/70 hidden sm:block">
              {currentConfig.title}
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-xs font-bold text-amber-200 tabular-nums">
            Round: {currentRoundIdx + 1}/3
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold tabular-nums ${
              timeRemaining <= 10
                ? 'bg-red-950/80 border-red-500/60 text-red-300 animate-pulse'
                : 'bg-amber-950/70 border-amber-500/40 text-amber-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>TIME: {timeRemaining}s</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-500/30 text-xs sm:text-sm font-bold text-amber-300 tabular-nums">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalScore.toLocaleString()} pts</span>
          </div>
        </div>
      </header>

      {/* Main Board Arena */}
      <main className="w-full max-w-xl my-auto py-2 flex flex-col items-center justify-center">
        <RangoliGrid
          id="challenge-rangoli-grid"
          size={currentConfig.size}
          gridData={phase === 'observe' ? targetPattern : playerGrid}
          evaluationData={evaluationData}
          phase={phase}
          countdownSeconds={observeCountdown}
          onCellClick={handleCellClick}
          onSkipObservation={() => {
            if (observeTimerRef.current) clearInterval(observeTimerRef.current);
            setPhase('recreate');
          }}
        />

        {/* Recreate Phase Submit Action */}
        {phase === 'recreate' && (
          <div className="mt-3 flex items-center gap-3">
            <FestiveButton
              variant="primary"
              size="md"
              icon={Check}
              onClick={handleVerifyRound}
              className="px-6 py-2 font-heading font-bold shadow-lg shadow-amber-500/30"
              id="submit-rangoli-challenge-btn"
            >
              Verify Pattern
            </FestiveButton>
          </div>
        )}
      </main>

      {/* Color Palette Bowl Controls */}
      <footer className="w-full max-w-xl mx-auto z-20 pb-1 sm:pb-2">
        <ColorPalette
          id="challenge-color-palette"
          availableColors={currentConfig.colors}
          selectedColor={selectedColor}
          onSelectColor={(c) => {
            soundManager.playButton();
            setSelectedColor(c);
          }}
          onClearGrid={handleClearGrid}
        />
      </footer>
    </div>
  );
}
