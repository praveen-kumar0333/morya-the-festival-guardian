import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Clock, RotateCcw, ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';
import { PANDAL_ITEMS } from '../games/pandal/pandalItems.js';
import PandalBoard from '../games/pandal/PandalBoard.jsx';
import DecorationPalette from '../games/pandal/DecorationPalette.jsx';
import ChallengeResult from './ChallengeResult.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { CHALLENGE_IDS, CHALLENGES } from '../../constants/challengeData.js';
import {
  getStoredChallengeStats,
  recordChallengeAttempt,
} from '../../services/challengeStats.js';
import { soundManager } from '../../services/soundManager.js';
import { useGame } from '../../context/GameContext.jsx';

export default function PandalBlitz({ onBackToChallenges, onMainMenu }) {
  const challengeConfig = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.PANDAL_BLITZ);
  const { addToast } = useGame();

  const [timeRemaining, setTimeRemaining] = useState(30);
  const [placedItems, setPlacedItems] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dragState, setDragState] = useState(null);
  const [activeZoneHover, setActiveZoneHover] = useState(null);
  const [score, setScore] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [completionStats, setCompletionStats] = useState(null);

  const timerRef = useRef(null);
  const completedRef = useRef(false);
  const timeRef = useRef(30);
  timeRef.current = timeRemaining;

  // Initialize or Reset Challenge
  const resetChallenge = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeRemaining(30);
    setPlacedItems({});
    setSelectedItemId(null);
    setDragState(null);
    setActiveZoneHover(null);
    setScore(0);
    setMistakesCount(0);
    setIsCompleted(false);
    setIsNewRecord(false);
    setCompletionStats(null);
    completedRef.current = false;

    // Start 30s countdown
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    resetChallenge();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetChallenge]);

  // Handle placement logic
  const handlePlacement = useCallback(
    (itemId, zoneId) => {
      if (completedRef.current) return;
      const targetItem = PANDAL_ITEMS.find((i) => i.id === itemId);
      if (!targetItem) return;

      if (targetItem.zoneId === zoneId) {
        // Correct Placement
        soundManager.playCorrect();
        setPlacedItems((prev) => {
          if (prev[itemId]) return prev;
          const next = { ...prev, [itemId]: true };
          const count = Object.keys(next).length;

          // Add placement score (+100 pts)
          setScore((s) => s + 100);

          // Check if all 6 placed
          if (count === 6) {
            handleVictory(next);
          }
          return next;
        });
        setSelectedItemId(null);
      } else {
        // Incorrect zone
        soundManager.playWrong();
        setMistakesCount((m) => m + 1);
        addToast('Try another spot in the pandal!', 'warning', 1800);
      }
    },
    [addToast]
  );

  // Victory Handler (all 6 placed within 30s)
  const handleVictory = (finalPlaced) => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    const remaining = timeRef.current;
    const timeUsed = Math.max(0.5, 30 - remaining);

    // Scoring: 6 * 100 = 600 base
    // Completion bonus = 300
    // Time bonus = remaining * 20
    // Perfect bonus = 250 (if 0 mistakes)
    const placementScore = 600;
    const completionBonus = 300;
    const timeBonus = remaining * 20;
    const perfectBonus = mistakesCount === 0 ? 250 : 0;
    const finalScore = placementScore + completionBonus + timeBonus + perfectBonus;

    setScore(finalScore);
    soundManager.playCelebration();

    // Persist & Evaluate Challenge Personal Best
    const recordResult = recordChallengeAttempt(CHALLENGE_IDS.PANDAL_BLITZ, {
      score: finalScore,
      timeRemaining: remaining,
      completed: true,
    });

    setIsNewRecord(recordResult.isNewRecord);
    if (recordResult.isNewRecord) {
      addToast('🏆 NEW CHALLENGE RECORD! Pandal Blitz', 'festive', 4500);
    }

    setCompletionStats({
      finalScore,
      timeUsed: `${timeUsed.toFixed(1)}s`,
      timeRemaining: `${remaining}s`,
      perfectBonus: perfectBonus > 0 ? '+250 pts (Flawless)' : 'None',
      personalBest: recordResult.newBest,
    });
    setIsCompleted(true);
  };

  // Time Out Handler
  const handleTimeUp = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    soundManager.playWrong();

    setPlacedItems((currentPlaced) => {
      const placedCount = Object.keys(currentPlaced).length;
      const finalScore = placedCount * 100;
      setScore(finalScore);

      const recordResult = recordChallengeAttempt(CHALLENGE_IDS.PANDAL_BLITZ, {
        score: finalScore,
        timeRemaining: 0,
        completed: false,
      });

      setIsNewRecord(recordResult.isNewRecord);
      setCompletionStats({
        finalScore,
        timeUsed: '30.0s (Time Up)',
        timeRemaining: '0s',
        perfectBonus: 'Incomplete',
        personalBest: recordResult.newBest,
      });
      setIsCompleted(true);
      return currentPlaced;
    });
  };

  // Selection & Click-to-place
  const handleItemSelect = (itemId) => {
    soundManager.playButton();
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleZoneClick = (zoneId) => {
    if (selectedItemId) {
      handlePlacement(selectedItemId, zoneId);
    }
  };

  // Drag & drop pointer listeners
  const handlePointerStart = (e, item) => {
    if (placedItems[item.id]) return;
    soundManager.playButton();
    setSelectedItemId(item.id);
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    setDragState({ itemId: item.id, clientX, clientY });
  };

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
      setDragState((prev) => (prev ? { ...prev, clientX, clientY } : null));

      const elem = document.elementFromPoint(clientX, clientY);
      const zoneElem = elem?.closest('[data-zone-id]');
      if (zoneElem) {
        const zid = zoneElem.getAttribute('data-zone-id');
        setActiveZoneHover(zid);
      } else {
        setActiveZoneHover(null);
      }
    };

    const handlePointerUp = (e) => {
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0]?.clientY) || 0;
      const elem = document.elementFromPoint(clientX, clientY);
      const zoneElem = elem?.closest('[data-zone-id]');

      if (zoneElem && dragState.itemId) {
        const zid = zoneElem.getAttribute('data-zone-id');
        handlePlacement(dragState.itemId, zid);
      }

      setDragState(null);
      setActiveZoneHover(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragState, handlePlacement]);

  const currentPlacedCount = Object.keys(placedItems).length;
  const challengeStats = getStoredChallengeStats();

  if (isCompleted && completionStats) {
    return (
      <ChallengeResult
        challenge={challengeConfig}
        score={completionStats.finalScore}
        isNewRecord={isNewRecord}
        personalBest={completionStats.personalBest}
        details={[
          { label: 'Time Elapsed', value: completionStats.timeUsed, icon: Clock },
          { label: 'Time Remaining', value: completionStats.timeRemaining, icon: Sparkles },
          { label: 'Decorations Placed', value: `${currentPlacedCount} / 6`, icon: CheckCircle2 },
          { label: 'Perfect Bonus', value: completionStats.perfectBonus, icon: Trophy },
        ]}
        onPlayAgain={resetChallenge}
        onBackToChallenges={onBackToChallenges}
        onMainMenu={onMainMenu}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-2.5 sm:p-4 text-amber-50 select-none overflow-x-hidden">
      {/* Challenge HUD Header */}
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
              <span className="text-base sm:text-lg">🛕</span>
              <h1 className="text-xs sm:text-base font-heading font-extrabold uppercase tracking-wide text-amber-300">
                Pandal Blitz
              </h1>
            </div>
            <p className="text-[10px] text-amber-300/70 hidden sm:block">
              Place all 6 sacred items before time runs out!
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Timer Display */}
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

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-500/30 text-xs sm:text-sm font-bold text-amber-300 tabular-nums">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{score.toLocaleString()} pts</span>
          </div>

          {/* Placed Counter */}
          <div className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/60 border border-amber-500/20 text-xs text-amber-200 font-semibold tabular-nums">
            <span>Placed:</span>
            <span className="text-amber-100 font-bold">{currentPlacedCount}/6</span>
          </div>
        </div>
      </header>

      {/* Main Board Arena */}
      <main className="w-full max-w-3xl my-auto py-2 flex flex-col items-center justify-center">
        <PandalBoard
          id="challenge-pandal-board"
          placedItems={placedItems}
          activeZoneHover={activeZoneHover}
          selectedItemId={selectedItemId}
          onZoneClick={handleZoneClick}
        />
      </main>

      {/* Decoration Tray */}
      <footer className="w-full max-w-3xl mx-auto z-20 pb-1 sm:pb-2">
        <DecorationPalette
          id="challenge-decoration-palette"
          placedItems={placedItems}
          selectedItemId={selectedItemId}
          onPointerStart={handlePointerStart}
          onItemSelect={handleItemSelect}
        />
      </footer>

      {/* Floating Dragged Element */}
      {dragState && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-amber-500 text-amber-950 font-heading font-bold text-xs shadow-2xl border border-yellow-300 animate-pulse"
          style={{ left: dragState.clientX, top: dragState.clientY }}
        >
          {PANDAL_ITEMS.find((i) => i.id === dragState.itemId)?.title || 'Placing...'}
        </div>
      )}
    </div>
  );
}
