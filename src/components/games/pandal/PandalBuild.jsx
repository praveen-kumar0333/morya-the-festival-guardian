import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Trophy,
  Play,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import { useGame } from '../../../context/GameContext.jsx';
import { SCREENS, STAGES } from '../../../constants/gameData.js';
import { soundManager } from '../../../services/soundManager.js';
import GameHUD from '../../ui/GameHUD.jsx';
import ProgressIndicator from '../../ui/ProgressIndicator.jsx';
import FestiveButton from '../../ui/FestiveButton.jsx';
import FestiveCard from '../../ui/FestiveCard.jsx';
import CelebrationBurst from '../../festive/CelebrationBurst.jsx';
import PandalBoard from './PandalBoard.jsx';
import DecorationPalette from './DecorationPalette.jsx';
import { PANDAL_ITEMS } from './pandalItems.js';
import {
  ToranVisual,
  DraperyVisual,
  FlowersVisual,
  DiyasVisual,
  OfferingPlateVisual,
  RangoliVisual,
} from './PandalItemVisuals.jsx';

export default function PandalBuild() {
  const {
    scores,
    completeStage,
    currentCombo,
    incrementCombo,
    resetCombo,
    addToast,
    setPandalArrangement,
  } = useGame();

  // Stage states
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [placedItems, setPlacedItems] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Drag and drop tracking
  const [dragState, setDragState] = useState(null); // { itemId, clientX, clientY }
  const [activeZoneHover, setActiveZoneHover] = useState(null);

  // Guards and refs to prevent duplicate score awards or multiple completion triggers
  const completedRef = useRef(false);
  const placedItemsRef = useRef({});
  placedItemsRef.current = placedItems;

  const stageData = STAGES.find((s) => s.id === SCREENS.PANDAL_BUILD) || STAGES[0];

  // Helper to calculate combo multiplier
  const getComboMultiplier = (comboCount) => {
    if (comboCount >= 5) return 3;
    if (comboCount >= 3) return 2;
    return 1;
  };

  // 1. Correct Item Placement handler
  const handlePlaceItem = useCallback(
    (itemId) => {
      if (placedItemsRef.current[itemId]) return; // Anti-duplicate guard

      const item = PANDAL_ITEMS.find((i) => i.id === itemId);
      if (!item) return;

      // Calculate score for this item
      const multiplier = getComboMultiplier(currentCombo);
      const basePoints = 100 * multiplier;
      const speedBonus = Math.round(25 + (timeRemaining / 60) * 50);
      const itemScore = basePoints + speedBonus;

      // Update state
      const updatedPlaced = {
        ...placedItemsRef.current,
        [itemId]: {
          placed: true,
          score: itemScore,
          timePlaced: timeRemaining,
        },
      };

      setPlacedItems(updatedPlaced);
      setSelectedItemId(null);
      setActiveZoneHover(null);
      setDragState(null);

      // Save arrangement into GameContext
      setPandalArrangement({
        placedItems: Object.keys(updatedPlaced),
        details: updatedPlaced,
        count: Object.keys(updatedPlaced).length,
      });

      // Sound & feedback
      soundManager.playCorrect();
      incrementCombo(1);

      addToast(`+${itemScore} pts! ${item.title} placed with devotion.`, 'success');

      // Check if all 6 decorations are placed
      const totalPlaced = Object.keys(updatedPlaced).length;
      if (totalPlaced >= PANDAL_ITEMS.length && !completedRef.current) {
        handleStageCompletion(updatedPlaced);
      }
    },
    [currentCombo, timeRemaining, incrementCombo, addToast, setPandalArrangement]
  );

  // 2. Stage completion sequence
  const handleStageCompletion = useCallback(
    (finalPlaced = placedItemsRef.current) => {
      if (completedRef.current) return;
      completedRef.current = true;

      soundManager.playCelebration();
      setIsCompleted(true);
      setDragState(null);
      setSelectedItemId(null);

      // Save final arrangement
      setPandalArrangement({
        placedItems: Object.keys(finalPlaced),
        details: finalPlaced,
        count: Object.keys(finalPlaced).length,
        isCompleted: true,
      });
    },
    [setPandalArrangement]
  );

  // 3. Handle Time Up
  const handleTimeUp = useCallback(() => {
    if (!completedRef.current) {
      addToast("Time's up! Blessed celebration ready.", 'warning');
      handleStageCompletion();
    }
  }, [addToast, handleStageCompletion]);

  // 4. Pointer Events Drag System
  const handlePointerStart = (e, item) => {
    if (!hasStarted || isCompleted || placedItems[item.id]) return;

    // Prevent default scroll behavior during drag
    e.preventDefault();

    setDragState({
      itemId: item.id,
      itemTitle: item.title,
      zoneId: item.zoneId,
      clientX: e.clientX,
      clientY: e.clientY,
    });
    setSelectedItemId(item.id);
  };

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e) => {
      e.preventDefault();
      setDragState((prev) => (prev ? { ...prev, clientX: e.clientX, clientY: e.clientY } : null));

      // Hit-test placement zones under cursor
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      let foundZoneId = null;

      for (const el of elements) {
        const zoneAttr = el.getAttribute('data-zone-id');
        if (zoneAttr) {
          foundZoneId = zoneAttr;
          break;
        }
      }

      setActiveZoneHover(foundZoneId);
    };

    const handlePointerUp = (e) => {
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      let matchedZone = null;

      for (const el of elements) {
        const zoneAttr = el.getAttribute('data-zone-id');
        if (zoneAttr) {
          matchedZone = zoneAttr;
          break;
        }
      }

      if (matchedZone && matchedZone === dragState.zoneId) {
        // Correct drop!
        handlePlaceItem(dragState.itemId);
      } else {
        // Invalid drop or outside zone
        if (matchedZone && matchedZone !== dragState.zoneId) {
          soundManager.playWrong();
          resetCombo();
          addToast('Please place this item in its matching sacred area!', 'warning', 2500);
        }
        setActiveZoneHover(null);
        setDragState(null);
      }
    };

    const handlePointerCancel = () => {
      setActiveZoneHover(null);
      setDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [dragState, handlePlaceItem, resetCombo, addToast]);

  // 5. Accessible Tap-to-Place alternative
  const handleZoneClick = (zoneId) => {
    if (!selectedItemId || !hasStarted || isCompleted) return;

    const item = PANDAL_ITEMS.find((i) => i.id === selectedItemId);
    if (!item) return;

    if (item.zoneId === zoneId) {
      handlePlaceItem(selectedItemId);
    } else {
      soundManager.playWrong();
      resetCombo();
      addToast('Tap the matching highlighted area to place!', 'warning', 2000);
    }
  };

  // Calculate final stage scores for presentation
  const placedCount = Object.keys(placedItems).length;
  const stagePandalPoints = Object.values(placedItems).reduce(
    (acc, val) => acc + (val.score || 100),
    0
  );
  const stageTimeBonus = Math.floor(timeRemaining * 15);
  const stageComboBonus = currentCombo * 40;
  const stageTotalScore = stagePandalPoints + stageTimeBonus + stageComboBonus;

  const handleContinueToNextStage = () => {
    completeStage(SCREENS.PANDAL_BUILD, {
      pandal: stagePandalPoints,
      timeBonus: (scores.timeBonus || 0) + stageTimeBonus,
      comboBonus: (scores.comboBonus || 0) + stageComboBonus,
    });
  };

  // Render preview of currently dragged item following pointer
  const renderFloatingGhost = () => {
    if (!dragState) return null;

    const renderGhostVisual = () => {
      switch (dragState.itemId) {
        case 'toran':
          return <ToranVisual className="w-24 h-12" />;
        case 'drapery':
          return <DraperyVisual className="w-20 h-16" />;
        case 'flowers':
          return <FlowersVisual className="w-16 h-14" />;
        case 'diyas':
          return <DiyasVisual className="w-16 h-12" />;
        case 'offeringPlate':
          return <OfferingPlateVisual className="w-18 h-12" />;
        case 'rangoli':
          return <RangoliVisual className="w-16 h-16" />;
        default:
          return <Sparkles className="w-8 h-8 text-amber-300" />;
      }
    };

    return (
      <div
        className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl bg-amber-950/90 border-2 border-amber-300 shadow-2xl shadow-amber-500/50 scale-110 flex items-center justify-center backdrop-blur-md transition-transform"
        style={{
          left: `${dragState.clientX}px`,
          top: `${dragState.clientY}px`,
        }}
        aria-hidden="true"
      >
        {renderGhostVisual()}
      </div>
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center pb-4 relative">
      {/* 1. In-Game Universal HUD */}
      <GameHUD
        stageId={SCREENS.PANDAL_BUILD}
        timeLimit={60}
        isPaused={!hasStarted || isCompleted}
        onTick={(sec) => setTimeRemaining(sec)}
        onTimeUp={handleTimeUp}
      />

      {/* 2. Visual Progress Tracker */}
      <div className="w-full max-w-4xl px-4 pt-2">
        <ProgressIndicator currentScreen={SCREENS.PANDAL_BUILD} />
      </div>

      {/* 3. Main Stage Interactive Canvas */}
      <main className="w-full max-w-4xl px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col gap-3 justify-center">
        {/* Pandal Festival Board */}
        <PandalBoard
          placedItems={placedItems}
          activeZoneHover={activeZoneHover}
          selectedItemId={selectedItemId}
          onZoneClick={handleZoneClick}
        />

        {/* Decoration Palette / Tray */}
        <DecorationPalette
          placedItems={placedItems}
          selectedItemId={selectedItemId}
          onPointerStart={handlePointerStart}
          onItemSelect={(id) => setSelectedItemId((prev) => (prev === id ? null : id))}
        />
      </main>

      {/* Floating dragged ghost cursor */}
      {renderFloatingGhost()}

      {/* ========================================================
          OVERLAY 1: START INSTRUCTION OVERLAY
         ======================================================== */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <FestiveCard
            highlight
            className="max-w-md w-full border-2 border-amber-400/60 shadow-2xl text-center"
          >
            <div className="space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                  Stage 1 • Pandal Build
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-100 mt-1">
                  Prepare the Pandal
                </h2>
                <p className="text-sm text-amber-200/90 mt-2 leading-relaxed font-medium">
                  Place every decoration to complete the celebration. Position all 6 auspicious festival items in their zones before time runs out.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/20 text-xs text-amber-300/90 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Time Limit: <strong>60 seconds</strong></span>
                <span>•</span>
                <span>Decorations: <strong>6 items</strong></span>
              </div>

              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full text-base sm:text-lg font-heading font-bold"
                icon={Play}
                onClick={() => {
                  soundManager.playButton();
                  setHasStarted(true);
                  addToast('Festival preparation underway! Decorate with care.', 'festive');
                }}
                id="start-pandal-stage-btn"
              >
                START
              </FestiveButton>
            </div>
          </FestiveCard>
        </div>
      )}

      {/* ========================================================
          OVERLAY 2: STAGE COMPLETE SUMMARY
         ======================================================== */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-gentle-pulse relative">
          <CelebrationBurst count={20} className="z-10 opacity-90" />
          <FestiveCard
            highlight
            className="max-w-lg w-full border-2 border-amber-300/80 shadow-2xl text-center relative z-20"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-950 flex items-center justify-center shadow-xl shadow-amber-500/40">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                  Beautiful! ✨
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-100 mt-1">
                  Your Pandal is Ready!
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-1">
                  Lord Ganesha's sacred pavilion shines radiant with festival spirit.
                </p>
              </div>

              {/* Itemized Score Breakdown */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/70 to-stone-900/80 border border-amber-400/40 space-y-2.5 text-left text-xs sm:text-sm">
                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Pandal Decor Score ({placedCount} / 6 items):
                  </span>
                  <span className="font-bold font-mono text-amber-100">
                    +{stagePandalPoints}
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

                <div className="pt-2 border-t border-amber-500/20 flex justify-between items-center text-sm sm:text-base font-bold text-amber-300">
                  <span>Total Stage Score:</span>
                  <span className="font-heading font-black text-lg sm:text-xl text-yellow-300 tabular-nums">
                    {stageTotalScore.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Continue Button */}
              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full text-base sm:text-lg font-heading font-bold"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleContinueToNextStage}
                id="continue-stage-btn"
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
