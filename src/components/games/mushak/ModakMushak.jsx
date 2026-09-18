import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy,
  Sparkles,
  Flame,
  CheckCircle2,
  Play,
  ArrowRight,
  Clock,
  RotateCcw,
  Award,
} from 'lucide-react';
import { useGame } from '../../../context/GameContext.jsx';
import { SCREENS } from '../../../constants/gameData.js';
import { soundManager } from '../../../services/soundManager.js';
import GameHUD from '../../ui/GameHUD.jsx';
import ProgressIndicator from '../../ui/ProgressIndicator.jsx';
import FestiveButton from '../../ui/FestiveButton.jsx';
import FestiveCard from '../../ui/FestiveCard.jsx';
import CelebrationBurst from '../../festive/CelebrationBurst.jsx';
import GameWorld from './GameWorld.jsx';
import FeverMeter from './FeverMeter.jsx';
import MushakControls from './MushakControls.jsx';
import { CollectibleVisual } from './Collectible.jsx';
import {
  GAME_SETTINGS,
  ITEM_TYPES,
  getRandomCollectibleType,
  getRandomObstacleType,
} from './mushakGameData.js';

export default function ModakMushak() {
  const {
    scores,
    completeStage,
    currentCombo,
    incrementCombo,
    resetCombo,
    activeModal,
    addToast,
    setMushakResult,
  } = useGame();

  // Stage Lifecycle States
  const [hasStarted, setHasStarted] = useState(false);
  const [isStageComplete, setIsStageComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(GAME_SETTINGS.STAGE_TIME);

  // Reactive UI State (synced from 60fps refs)
  const [stageScore, setStageScore] = useState(0);
  const [feverPercent, setFeverPercent] = useState(0);
  const [isFeverActive, setIsFeverActive] = useState(false);
  const [feverTimeRemaining, setFeverTimeRemaining] = useState(0);

  // Render State for active objects in GameWorld
  const [mushakRenderState, setMushakRenderState] = useState({
    x: GAME_SETTINGS.WORLD_WIDTH / 2,
    y: GAME_SETTINGS.GROUND_Y,
    direction: 1,
    isMoving: false,
    isCollecting: false,
    isFever: false,
    isStumbling: false,
  });
  const [renderCollectibles, setRenderCollectibles] = useState([]);
  const [renderObstacles, setRenderObstacles] = useState([]);
  const [renderPopups, setRenderPopups] = useState([]);

  // Mobile Button Press States
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);

  // -------------------------------------------------------------
  // High-Frequency 60fps Physics & Loop State (useRef)
  // -------------------------------------------------------------
  const mushakPosRef = useRef({
    x: GAME_SETTINGS.WORLD_WIDTH / 2,
    y: GAME_SETTINGS.GROUND_Y,
    direction: 1,
    isMoving: false,
    isCollecting: false,
    collectingUntil: 0,
    isStumbling: false,
    stumbleUntil: 0,
  });

  const inputRef = useRef({ left: false, right: false });
  const collectiblesRef = useRef([]);
  const obstaclesRef = useRef([]);
  const popupsRef = useRef([]);
  const nextIdRef = useRef(1);

  const lastSpawnTimeRef = useRef(0);
  const lastObstacleSpawnTimeRef = useRef(0);
  const feverEndTimeRef = useRef(0);
  const feverPercentRef = useRef(0);
  const isFeverActiveRef = useRef(false);

  // Metrics Tracking for Grand Morya & Results
  const scoreRef = useRef(0);
  const itemsCollectedRef = useRef({
    MODAK: 0,
    FLOWER: 0,
    DURVA: 0,
    GOLDEN_MODAK: 0,
  });
  const totalCollectedRef = useRef(0);
  const highestComboRef = useRef(0);
  const feverActivationsCountRef = useRef(0);
  const completedRef = useRef(false);
  const timeRemainingRef = useRef(GAME_SETTINGS.STAGE_TIME);

  // Authoritative real elapsed time tracking (FPS-independent)
  const activeElapsedMsRef = useRef(0);
  const lastActiveTimestampRef = useRef(null);

  const animationFrameIdRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  // Is game paused (either modal open or not started or complete)
  const isPaused = !hasStarted || isStageComplete || activeModal !== null;

  // Reset active elapsed tracking whenever game is not started or restarted
  useEffect(() => {
    if (!hasStarted) {
      activeElapsedMsRef.current = 0;
      lastActiveTimestampRef.current = null;
      timeRemainingRef.current = GAME_SETTINGS.STAGE_TIME;
      setTimeRemaining(GAME_SETTINGS.STAGE_TIME);
    }
  }, [hasStarted]);

  // Reset timestamp when paused so pause duration is not counted
  useEffect(() => {
    if (isPaused) {
      lastActiveTimestampRef.current = null;
    }
  }, [isPaused]);

  // Track highest combo
  useEffect(() => {
    if (currentCombo > highestComboRef.current) {
      highestComboRef.current = currentCombo;
    }
  }, [currentCombo]);

  // -------------------------------------------------------------
  // Keyboard Input Handlers
  // -------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPaused) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        inputRef.current.left = true;
        setIsLeftPressed(true);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        inputRef.current.right = true;
        setIsRightPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        inputRef.current.left = false;
        setIsLeftPressed(false);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        inputRef.current.right = false;
        setIsRightPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPaused]);

  // -------------------------------------------------------------
  // Mobile Touch Input Callbacks
  // -------------------------------------------------------------
  const handleMoveLeftStart = () => {
    inputRef.current.left = true;
    setIsLeftPressed(true);
  };
  const handleMoveLeftEnd = () => {
    inputRef.current.left = false;
    setIsLeftPressed(false);
  };

  const handleMoveRightStart = () => {
    inputRef.current.right = true;
    setIsRightPressed(true);
  };
  const handleMoveRightEnd = () => {
    inputRef.current.right = false;
    setIsRightPressed(false);
  };

  // -------------------------------------------------------------
  // Stage Completion Sequence
  // -------------------------------------------------------------
  const handleStageComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    soundManager.playCelebration();
    setIsStageComplete(true);

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    const finalMushakScore = scoreRef.current;
    const finalCollected = totalCollectedRef.current;
    const itemCounts = { ...itemsCollectedRef.current };
    const bestCombo = Math.max(highestComboRef.current, currentCombo);
    const feverActivations = feverActivationsCountRef.current;

    // Store rich stage 3 results for Grand Morya
    setMushakResult({
      itemsCollected: finalCollected,
      itemCounts,
      bestCombo,
      feverActivations,
      finalStageScore: finalMushakScore,
      isCompleted: true,
    });
  }, [currentCombo, setMushakResult]);

  // Handle Timeout from GameHUD
  const handleTimeUp = useCallback(() => {
    if (!completedRef.current) {
      addToast("Time's up for Modak & Mushak!", 'festive');
      handleStageComplete();
    }
  }, [addToast, handleStageComplete]);

  // -------------------------------------------------------------
  // 60FPS Game Loop Engine
  // -------------------------------------------------------------
  useEffect(() => {
    if (!hasStarted || isStageComplete) {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      return;
    }

    const gameLoop = (timestamp) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const delta = Math.min(64, timestamp - lastFrameTimeRef.current);
      lastFrameTimeRef.current = timestamp;

      // If not paused, step the physics and logic
      if (!isPaused) {
        const now = Date.now();

        // 0. Update Real Elapsed Time Countdown (FPS-Independent)
        if (lastActiveTimestampRef.current === null) {
          lastActiveTimestampRef.current = now;
        } else {
          const deltaActive = now - lastActiveTimestampRef.current;
          lastActiveTimestampRef.current = now;
          activeElapsedMsRef.current += deltaActive;
        }

        const elapsedSeconds = Math.floor(activeElapsedMsRef.current / 1000);
        const newRemaining = Math.max(0, GAME_SETTINGS.STAGE_TIME - elapsedSeconds);

        if (newRemaining !== timeRemainingRef.current) {
          timeRemainingRef.current = newRemaining;
          setTimeRemaining(newRemaining);

          if (newRemaining <= 0) {
            handleTimeUp();
            return;
          }
        }

        const { WORLD_WIDTH, GROUND_Y, MUSHAK_SPEED, COLLISION_RADIUS } = GAME_SETTINGS;

        // 1. Check Fever Status
        if (isFeverActiveRef.current) {
          const remainingFeverMs = feverEndTimeRef.current - now;
          if (remainingFeverMs <= 0) {
            isFeverActiveRef.current = false;
            feverPercentRef.current = 0;
            setIsFeverActive(false);
            setFeverPercent(0);
            setFeverTimeRemaining(0);
            addToast('Morya Fever ended.', 'default', 1200);
          } else {
            const remSec = remainingFeverMs / 1000;
            setFeverTimeRemaining(remSec);
            setFeverPercent((remSec / GAME_SETTINGS.FEVER_DURATION) * 100);
          }
        }

        // 2. Update Mushak Movement
        const mushak = mushakPosRef.current;
        let isMoving = false;

        if (inputRef.current.left && !inputRef.current.right) {
          mushak.x -= MUSHAK_SPEED;
          mushak.direction = -1;
          isMoving = true;
        } else if (inputRef.current.right && !inputRef.current.left) {
          mushak.x += MUSHAK_SPEED;
          mushak.direction = 1;
          isMoving = true;
        }

        // Clamp boundaries (prevent Mushak from leaving the playable area)
        const minX = 40;
        const maxX = WORLD_WIDTH - 40;
        mushak.x = Math.max(minX, Math.min(maxX, mushak.x));
        mushak.y = GROUND_Y;
        mushak.isMoving = isMoving;

        // Check Stumble & Collection Timer Expiry
        if (mushak.isCollecting && now > mushak.collectingUntil) {
          mushak.isCollecting = false;
        }
        if (mushak.isStumbling && now > mushak.stumbleUntil) {
          mushak.isStumbling = false;
        }
        mushak.isFever = isFeverActiveRef.current;

        // 3. Spawning Collectibles (Progressive difficulty)
        const elapsedSec = GAME_SETTINGS.STAGE_TIME - timeRemainingRef.current;
        let spawnInterval = 1100;
        if (elapsedSec > 40) spawnInterval = 650;
        else if (elapsedSec > 20) spawnInterval = 850;

        if (isFeverActiveRef.current) {
          spawnInterval *= 0.7; // ~30% faster during Fever
        }

        if (
          now - lastSpawnTimeRef.current > spawnInterval &&
          collectiblesRef.current.length < GAME_SETTINGS.MAX_ACTIVE_ITEMS
        ) {
          lastSpawnTimeRef.current = now;
          const randomType = getRandomCollectibleType(isFeverActiveRef.current);
          const spawnX = Math.floor(Math.random() * (WORLD_WIDTH - 120)) + 60;
          const spawnSpeed = randomType.speedY * (1 + elapsedSec * 0.008);

          collectiblesRef.current.push({
            id: `item-${nextIdRef.current++}`,
            type: randomType.id,
            x: spawnX,
            y: 30,
            speedY: spawnSpeed,
            collected: false,
          });
        }

        // 4. Spawning Harmless Obstacles (moderate frequency, none during first 8s)
        const obstacleSpawnInterval = elapsedSec > 35 ? 2800 : 4200;
        if (
          elapsedSec > 8 &&
          now - lastObstacleSpawnTimeRef.current > obstacleSpawnInterval &&
          obstaclesRef.current.length < GAME_SETTINGS.MAX_ACTIVE_OBSTACLES
        ) {
          lastObstacleSpawnTimeRef.current = now;
          const obsType = getRandomObstacleType();
          const obsX = Math.floor(Math.random() * (WORLD_WIDTH - 120)) + 60;

          obstaclesRef.current.push({
            id: `obs-${nextIdRef.current++}`,
            type: obsType.id,
            x: obsX,
            y: 30,
            speedY: obsType.speedY,
          });
        }

        // 5. Update & Collect Collectibles
        const updatedCollectibles = [];
        for (let i = 0; i < collectiblesRef.current.length; i++) {
          const item = collectiblesRef.current[i];
          if (item.collected) continue;

          item.y += item.speedY;

          // Check collision with Mushak
          const dist = Math.hypot(item.x - mushak.x, item.y - (mushak.y - 12));
          if (dist < COLLISION_RADIUS) {
            item.collected = true;
            const itemDef = ITEM_TYPES[item.type] || ITEM_TYPES.MODAK;

            // Multiplier calculation (1-4: 1x, 5-9: 2x, 10+: 3x, Fever: 2x)
            let comboMul = 1;
            if (currentCombo >= 10) comboMul = 3;
            else if (currentCombo >= 5) comboMul = 2;

            const feverMul = isFeverActiveRef.current ? GAME_SETTINGS.FEVER_MULTIPLIER : 1;
            const itemPoints = itemDef.points * comboMul * feverMul;

            scoreRef.current += itemPoints;
            setStageScore(scoreRef.current);

            itemsCollectedRef.current[item.type] =
              (itemsCollectedRef.current[item.type] || 0) + 1;
            totalCollectedRef.current += 1;

            // Increment combo
            incrementCombo(1);

            // Audio cues
            if (currentCombo + 1 === 5 || currentCombo + 1 === 10) {
              soundManager.playCombo(currentCombo + 1);
            } else {
              soundManager.playCorrect();
            }

            // Update Fever Meter
            if (!isFeverActiveRef.current) {
              feverPercentRef.current = Math.min(100, feverPercentRef.current + itemDef.feverGain);
              setFeverPercent(feverPercentRef.current);

              if (feverPercentRef.current >= 100) {
                // ACTIVATE MORYA FEVER!
                isFeverActiveRef.current = true;
                feverEndTimeRef.current = now + GAME_SETTINGS.FEVER_DURATION * 1000;
                feverActivationsCountRef.current += 1;
                setIsFeverActive(true);
                setFeverTimeRemaining(GAME_SETTINGS.FEVER_DURATION);
                soundManager.playCelebration();
                addToast('🔥 MORYA FEVER ACTIVATED! 2× MULTIPLIER!', 'festive', 2500);
              }
            }

            // Collection Visual Feedback
            mushak.isCollecting = true;
            mushak.collectingUntil = now + 250;

            // Spawn Score Popup
            popupsRef.current.push({
              id: `popup-${nextIdRef.current++}`,
              text: `+${itemPoints}${isFeverActiveRef.current ? ' 🔥' : ''}`,
              x: item.x,
              y: item.y - 10,
              isFever: isFeverActiveRef.current,
              isPenalty: false,
              expiresAt: now + 650,
            });

            continue;
          }

          // Keep item if still on screen
          if (item.y < GAME_SETTINGS.WORLD_HEIGHT + 20) {
            updatedCollectibles.push(item);
          }
        }
        collectiblesRef.current = updatedCollectibles;

        // 6. Update & Collide Harmless Obstacles
        const updatedObstacles = [];
        for (let i = 0; i < obstaclesRef.current.length; i++) {
          const obs = obstaclesRef.current[i];
          obs.y += obs.speedY;

          // Collision with Mushak
          const dist = Math.hypot(obs.x - mushak.x, obs.y - (mushak.y - 12));
          if (dist < COLLISION_RADIUS - 4 && !mushak.isStumbling) {
            // Harmless stagger / bounce
            mushak.isStumbling = true;
            mushak.stumbleUntil = now + 900;

            // Reset combo
            resetCombo();

            // Slightly reduce fever meter
            if (!isFeverActiveRef.current) {
              feverPercentRef.current = Math.max(0, feverPercentRef.current - 15);
              setFeverPercent(feverPercentRef.current);
            }

            // Small score penalty
            scoreRef.current = Math.max(0, scoreRef.current - 25);
            setStageScore(scoreRef.current);

            soundManager.playWrong();
            addToast('Stumbled! Recovering quickly.', 'warning', 1000);

            // Popup
            popupsRef.current.push({
              id: `popup-${nextIdRef.current++}`,
              text: '-25 Stumble',
              x: obs.x,
              y: obs.y - 10,
              isFever: false,
              isPenalty: true,
              expiresAt: now + 700,
            });

            continue; // Remove collided obstacle
          }

          if (obs.y < GAME_SETTINGS.WORLD_HEIGHT + 20) {
            updatedObstacles.push(obs);
          }
        }
        obstaclesRef.current = updatedObstacles;

        // 7. Cleanup Expired Popups
        popupsRef.current = popupsRef.current.filter((p) => now < p.expiresAt);

        // 8. Commit Frame to React Render State
        setMushakRenderState({ ...mushak });
        setRenderCollectibles([...collectiblesRef.current]);
        setRenderObstacles([...obstaclesRef.current]);
        setRenderPopups([...popupsRef.current]);
      } else {
        lastActiveTimestampRef.current = null;
      }

      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [hasStarted, isStageComplete, isPaused, currentCombo, incrementCombo, resetCombo, addToast, handleTimeUp]);

  // -------------------------------------------------------------
  // Scoring Summary Calculations
  // -------------------------------------------------------------
  const stageMushakScore = scoreRef.current;
  const stageComboBonus = highestComboRef.current * 40;
  const stageTimeBonus = Math.floor(timeRemaining * 10);
  const totalStageScore = stageMushakScore + stageComboBonus + stageTimeBonus;

  // Continue to Stage 4 (Eco Celebration placeholder)
  const handleContinueToNextStage = () => {
    completeStage(SCREENS.MODAK_MUSHAK, {
      mushak: stageMushakScore,
      comboBonus: (scores.comboBonus || 0) + stageComboBonus,
      timeBonus: (scores.timeBonus || 0) + stageTimeBonus,
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center pb-2 sm:pb-4 relative">
      {/* 1. Universal In-Game HUD (60-second timer) */}
      <GameHUD
        stageId={SCREENS.MODAK_MUSHAK}
        timeLimit={GAME_SETTINGS.STAGE_TIME}
        secondsRemaining={timeRemaining}
        isPaused={isPaused}
        onTimeUp={handleTimeUp}
      />

      {/* 2. Visual Stage Progress Tracker */}
      <div className="w-full max-w-4xl px-4 pt-1 sm:pt-2">
        <ProgressIndicator currentScreen={SCREENS.MODAK_MUSHAK} />
      </div>

      {/* 3. Main Stage Content Area */}
      <main className="w-full max-w-4xl px-2 sm:px-4 py-1 sm:py-2 flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3">
        {/* Local Fever Meter & Active Multiplier */}
        <FeverMeter
          feverPercent={feverPercent}
          isFeverActive={isFeverActive}
          feverTimeRemaining={feverTimeRemaining}
        />

        {/* The Festive Arcade Arena */}
        <GameWorld
          mushakState={mushakRenderState}
          collectibles={renderCollectibles}
          obstacles={renderObstacles}
          popups={renderPopups}
          isFeverActive={isFeverActive}
        />

        {/* Mobile Touch & Desktop Key Controls */}
        <MushakControls
          onMoveLeftStart={handleMoveLeftStart}
          onMoveLeftEnd={handleMoveLeftEnd}
          onMoveRightStart={handleMoveRightStart}
          onMoveRightEnd={handleMoveRightEnd}
          isLeftPressed={isLeftPressed}
          isRightPressed={isRightPressed}
        />
      </main>

      {/* ========================================================
          OVERLAY 1: START INSTRUCTION OVERLAY
         ======================================================== */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
          <FestiveCard
            highlight
            className="max-w-md w-full border-2 border-amber-400/70 shadow-2xl text-center"
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/40">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                  Stage 3 • Arcade Collection
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-100 mt-1">
                  MODAK & MUSHAK
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-2 leading-relaxed font-medium">
                  Guide Mushak and collect the festival treats! Gather sweet modaks, holy durva grass, and fresh blossoms while dodging falling fireworks.
                </p>
              </div>

              {/* Collectibles Points Guide */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/20 text-left text-xs">
                <div className="flex items-center gap-2 text-amber-100">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <CollectibleVisual type="MODAK" size={24} />
                  </div>
                  <div>
                    <span className="font-bold block">Modak</span>
                    <span className="text-amber-400 font-mono text-[10px]">+100 pts</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-100">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <CollectibleVisual type="GOLDEN_MODAK" size={24} />
                  </div>
                  <div>
                    <span className="font-bold block text-yellow-300">Golden Modak</span>
                    <span className="text-yellow-400 font-mono text-[10px]">+300 pts</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-100">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <CollectibleVisual type="DURVA" size={24} />
                  </div>
                  <div>
                    <span className="font-bold block">Durva Grass</span>
                    <span className="text-emerald-400 font-mono text-[10px]">+75 pts</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-100">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <CollectibleVisual type="FLOWER" size={24} />
                  </div>
                  <div>
                    <span className="font-bold block">Hibiscus Flower</span>
                    <span className="text-rose-400 font-mono text-[10px]">+50 pts</span>
                  </div>
                </div>
              </div>

              {/* Controls Explanation */}
              <div className="p-2.5 rounded-xl bg-stone-900/60 border border-amber-500/20 text-xs text-amber-200/80 flex items-center justify-around">
                <div>
                  <span className="block font-semibold text-amber-300">Desktop:</span>
                  <span className="font-mono text-[11px] text-amber-100">← → or A D</span>
                </div>
                <div className="w-px h-6 bg-amber-500/20" />
                <div>
                  <span className="block font-semibold text-amber-300">Mobile:</span>
                  <span className="font-mono text-[11px] text-amber-100">◀ ▶ buttons</span>
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
                  addToast('Guide Mushak to catch the prasad!', 'festive', 2000);
                }}
                id="start-mushak-stage-btn"
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
      {isStageComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-gentle-pulse relative">
          <CelebrationBurst count={20} className="z-10 opacity-90" />
          <FestiveCard
            highlight
            className="max-w-md w-full border-2 border-yellow-400/80 shadow-2xl text-center relative z-20"
          >
            <div className="space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 text-stone-950 flex items-center justify-center shadow-xl shadow-amber-500/40">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                  Prasad Offering Complete! 🥟
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-100 mt-1">
                  MODAK & MUSHAK COMPLETE!
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-1">
                  Mushak has gathered an abundant feast of sacred prasad for Lord Ganesha!
                </p>
              </div>

              {/* Itemized Score Breakdown */}
              <div className="p-3.5 rounded-xl bg-gradient-to-b from-amber-950/60 to-stone-900/80 border border-amber-400/30 space-y-2 text-left text-xs sm:text-sm">
                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Items Collected:
                  </span>
                  <span className="font-bold font-mono text-amber-100">
                    {totalCollectedRef.current} treats
                  </span>
                </div>

                {/* Items breakdown pills */}
                <div className="grid grid-cols-4 gap-1 py-1 text-center font-mono text-[10px]">
                  <div className="bg-amber-950/40 rounded p-1 border border-amber-500/20">
                    <span className="block text-amber-300 font-bold">
                      {itemsCollectedRef.current.MODAK}
                    </span>
                    <span className="text-amber-400/70">Modaks</span>
                  </div>
                  <div className="bg-amber-950/40 rounded p-1 border border-amber-500/20">
                    <span className="block text-yellow-300 font-bold">
                      {itemsCollectedRef.current.GOLDEN_MODAK}
                    </span>
                    <span className="text-yellow-400/70">Gold</span>
                  </div>
                  <div className="bg-amber-950/40 rounded p-1 border border-amber-500/20">
                    <span className="block text-emerald-300 font-bold">
                      {itemsCollectedRef.current.DURVA}
                    </span>
                    <span className="text-emerald-400/70">Durva</span>
                  </div>
                  <div className="bg-amber-950/40 rounded p-1 border border-amber-500/20">
                    <span className="block text-rose-300 font-bold">
                      {itemsCollectedRef.current.FLOWER}
                    </span>
                    <span className="text-rose-400/70">Flowers</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    Best Combo:
                  </span>
                  <span className="font-bold font-mono text-orange-300">
                    {highestComboRef.current}x combo (+{stageComboBonus} pts)
                  </span>
                </div>

                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    Fever Activations:
                  </span>
                  <span className="font-bold font-mono text-yellow-300">
                    {feverActivationsCountRef.current} times
                  </span>
                </div>

                <div className="flex justify-between items-center text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Collection Base Score:
                  </span>
                  <span className="font-bold font-mono text-amber-100">
                    +{stageMushakScore}
                  </span>
                </div>

                <div className="pt-2 border-t border-amber-500/30 flex justify-between items-center text-sm sm:text-base font-bold text-amber-300">
                  <span>Total Stage Score:</span>
                  <span className="font-heading font-black text-lg sm:text-xl text-yellow-300 tabular-nums">
                    {totalStageScore.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Continue to Stage 4 Button */}
              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full text-base sm:text-lg font-heading font-bold"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleContinueToNextStage}
                id="continue-stage-3-btn"
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
