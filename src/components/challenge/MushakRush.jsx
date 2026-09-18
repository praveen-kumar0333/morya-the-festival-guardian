import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Clock, Flame, ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';
import GameWorld from '../games/mushak/GameWorld.jsx';
import FeverMeter from '../games/mushak/FeverMeter.jsx';
import MushakControls from '../games/mushak/MushakControls.jsx';
import ChallengeResult from './ChallengeResult.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { CHALLENGE_IDS, CHALLENGES } from '../../constants/challengeData.js';
import { recordChallengeAttempt } from '../../services/challengeStats.js';
import { soundManager } from '../../services/soundManager.js';
import { useGame } from '../../context/GameContext.jsx';
import { ITEM_TYPES, OBSTACLE_TYPES, GAME_SETTINGS } from '../games/mushak/mushakGameData.js';

export default function MushakRush({ onBackToChallenges, onMainMenu }) {
  const challengeConfig = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.MUSHAK_RUSH);
  const { addToast } = useGame();

  // Lifecycle States
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [itemsCollected, setItemsCollected] = useState(0);
  const [feverActivations, setFeverActivations] = useState(0);
  const [feverPercent, setFeverPercent] = useState(0);
  const [isFeverActive, setIsFeverActive] = useState(false);
  const [feverTimeRemaining, setFeverTimeRemaining] = useState(0);

  // Render representations for GameWorld
  const [mushakRender, setMushakRender] = useState({
    x: 400,
    y: 420,
    direction: 1,
    isMoving: false,
    isCollecting: false,
    isFever: false,
    isStumbling: false,
  });
  const [collectibles, setCollectibles] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [popups, setPopups] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [completionStats, setCompletionStats] = useState(null);

  // Input states
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);

  // Engine Refs (to maintain smooth 60fps physics)
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const completedRef = useRef(false);

  const gameStateRef = useRef({
    mushakX: 400,
    mushakSpeed: 6.5,
    direction: 1,
    isMoving: false,
    isCollectingTimer: 0,
    isStumbleTimer: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    itemsCollected: 0,
    feverActivations: 0,
    feverPercent: 0,
    isFever: false,
    feverRemaining: 0,
    lastSpawnTime: 0,
    lastObstacleSpawnTime: 0,
    collectibles: [],
    obstacles: [],
    popups: [],
    leftInput: false,
    rightInput: false,
  });

  // Calculate combo multiplier
  const getMultiplier = (currentCombo) => {
    if (currentCombo >= 12) return 5;
    if (currentCombo >= 9) return 4;
    if (currentCombo >= 6) return 3;
    if (currentCombo >= 3) return 2;
    return 1;
  };

  // Reset / Start
  const resetChallenge = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setTimeRemaining(30);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setItemsCollected(0);
    setFeverActivations(0);
    setFeverPercent(0);
    setIsFeverActive(false);
    setFeverTimeRemaining(0);
    setIsCompleted(false);
    setIsNewRecord(false);
    setCompletionStats(null);
    completedRef.current = false;

    gameStateRef.current = {
      mushakX: 400,
      mushakSpeed: 6.5,
      direction: 1,
      isMoving: false,
      isCollectingTimer: 0,
      isStumbleTimer: 0,
      score: 0,
      combo: 0,
      bestCombo: 0,
      itemsCollected: 0,
      feverActivations: 0,
      feverPercent: 0,
      isFever: false,
      feverRemaining: 0,
      lastSpawnTime: performance.now(),
      lastObstacleSpawnTime: performance.now(),
      collectibles: [],
      obstacles: [],
      popups: [],
      leftInput: false,
      rightInput: false,
    };

    // 1-second countdown
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleTimeUp = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    soundManager.playCelebration();

    const finalState = gameStateRef.current;
    const finalScore = finalState.score;

    const recordResult = recordChallengeAttempt(CHALLENGE_IDS.MUSHAK_RUSH, {
      score: finalScore,
      combo: finalState.bestCombo,
      itemsCollected: finalState.itemsCollected,
      completed: true,
    });

    setIsNewRecord(recordResult.isNewRecord);
    if (recordResult.isNewRecord) {
      addToast('🏆 NEW CHALLENGE RECORD! Mushak Rush', 'festive', 4500);
    }

    setCompletionStats({
      finalScore,
      itemsCollected: `${finalState.itemsCollected} prasad treats`,
      bestCombo: `${finalState.bestCombo}x combo`,
      fevers: `${finalState.feverActivations} activations`,
      personalBest: recordResult.newBest,
    });
    setIsCompleted(true);
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA', 'a'].includes(e.code || e.key)) {
        gameStateRef.current.leftInput = true;
        setIsLeftPressed(true);
      }
      if (['ArrowRight', 'KeyD', 'd'].includes(e.code || e.key)) {
        gameStateRef.current.rightInput = true;
        setIsRightPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA', 'a'].includes(e.code || e.key)) {
        gameStateRef.current.leftInput = false;
        setIsLeftPressed(false);
      }
      if (['ArrowRight', 'KeyD', 'd'].includes(e.code || e.key)) {
        gameStateRef.current.rightInput = false;
        setIsRightPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 60fps Game Loop
  useEffect(() => {
    resetChallenge();

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min(64, currentTime - lastTime);
      lastTime = currentTime;

      if (!completedRef.current) {
        const state = gameStateRef.current;

        // 1. Mushak Movement
        let moveX = 0;
        if (state.leftInput) moveX -= 1;
        if (state.rightInput) moveX += 1;

        if (moveX !== 0) {
          state.direction = moveX > 0 ? 1 : -1;
          state.isMoving = true;
          const currentSpeed = state.isFever ? state.mushakSpeed * 1.3 : state.mushakSpeed;
          state.mushakX += moveX * currentSpeed;
          // Boundary clamp
          state.mushakX = Math.max(50, Math.min(GAME_SETTINGS.WORLD_WIDTH - 50, state.mushakX));
        } else {
          state.isMoving = false;
        }

        // Timers decrement
        if (state.isCollectingTimer > 0) state.isCollectingTimer -= dt;
        if (state.isStumbleTimer > 0) state.isStumbleTimer -= dt;

        // Fever Management
        if (state.isFever) {
          state.feverRemaining -= dt / 1000;
          if (state.feverRemaining <= 0) {
            state.isFever = false;
            state.feverPercent = 0;
            state.feverRemaining = 0;
          }
        }

        // 2. Spawn Collectibles
        const spawnInterval = state.isFever ? 200 : 450;
        if (currentTime - state.lastSpawnTime > spawnInterval) {
          state.lastSpawnTime = currentTime;
          const types = [
            ITEM_TYPES.MODAK,
            ITEM_TYPES.FLOWER,
            ITEM_TYPES.DURVA,
            state.isFever ? ITEM_TYPES.GOLDEN_MODAK : ITEM_TYPES.GOLDEN_MODAK,
          ];
          const chosen = state.isFever
            ? ITEM_TYPES.GOLDEN_MODAK
            : Math.random() < 0.15
            ? ITEM_TYPES.GOLDEN_MODAK
            : Math.random() < 0.4
            ? ITEM_TYPES.MODAK
            : Math.random() < 0.7
            ? ITEM_TYPES.FLOWER
            : ITEM_TYPES.DURVA;

          state.collectibles.push({
            id: `c_${currentTime}_${Math.random()}`,
            type: chosen,
            x: Math.random() * (GAME_SETTINGS.WORLD_WIDTH - 120) + 60,
            y: 0,
            speedY: state.isFever ? chosen.speedY * 1.35 : chosen.speedY,
          });
        }

        // 3. Spawn Harmless Obstacles (every ~3.5 seconds, harmlessly breaks combo)
        if (!state.isFever && currentTime - state.lastObstacleSpawnTime > 3500) {
          state.lastObstacleSpawnTime = currentTime;
          const obstacleTypes = Object.values(OBSTACLE_TYPES);
          const obsType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)] || obstacleTypes[0];

          state.obstacles.push({
            id: `o_${currentTime}_${Math.random()}`,
            type: obsType,
            x: Math.random() * (GAME_SETTINGS.WORLD_WIDTH - 120) + 60,
            y: 0,
            speedY: obsType.speedY || 2.0,
          });
        }

        // 4. Update Collectibles & Collision Detection
        const hitX = state.mushakX;
        const hitY = GAME_SETTINGS.GROUND_Y - 20;
        const hitRadius = 45;

        state.collectibles = state.collectibles.filter((item) => {
          item.y += item.speedY * (dt / 16);

          // Check Catch Collision with Mushak
          const dist = Math.hypot(item.x - hitX, item.y - hitY);
          if (dist < hitRadius) {
            // Collect!
            soundManager.playCorrect();
            state.isCollectingTimer = 250;
            state.itemsCollected += 1;

            // Combo update
            state.combo += 1;
            if (state.combo > state.bestCombo) {
              state.bestCombo = state.combo;
            }

            const mult = getMultiplier(state.combo);
            const feverMultiplier = state.isFever ? 2 : 1;
            const pointsEarned = item.type.points * mult * feverMultiplier;
            state.score += pointsEarned;

            // Fever Meter accumulation
            if (!state.isFever) {
              state.feverPercent = Math.min(100, state.feverPercent + item.type.feverGain);
              if (state.feverPercent >= 100) {
                // Trigger Fever
                state.isFever = true;
                state.feverRemaining = 5.0; // 5 seconds of Fever
                state.feverActivations += 1;
                soundManager.playCelebration();
              }
            }

            // Floating Popup
            state.popups.push({
              id: `pop_${currentTime}_${Math.random()}`,
              x: item.x,
              y: item.y - 15,
              text: `+${pointsEarned}`,
              color: item.type.id === 'GOLDEN_MODAK' ? '#FACC15' : '#F59E0B',
              opacity: 1,
            });

            return false;
          }

          // Offscreen check
          return item.y < GAME_SETTINGS.WORLD_HEIGHT + 30;
        });

        // 5. Update Obstacles & Collision
        state.obstacles = state.obstacles.filter((obs) => {
          obs.y += obs.speedY * (dt / 16);

          const dist = Math.hypot(obs.x - hitX, obs.y - hitY);
          if (dist < hitRadius && !state.isFever) {
            // Harmless stumble - resets combo without losing points/game
            soundManager.playWrong();
            state.isStumbleTimer = 400;
            state.combo = 0;

            state.popups.push({
              id: `pop_obs_${currentTime}_${Math.random()}`,
              x: obs.x,
              y: obs.y - 15,
              text: 'Combo Lost!',
              color: '#EF4444',
              opacity: 1,
            });

            return false;
          }

          return obs.y < GAME_SETTINGS.WORLD_HEIGHT + 30;
        });

        // 6. Update Floating Popups
        state.popups = state.popups
          .map((p) => ({
            ...p,
            y: p.y - 0.75,
            opacity: p.opacity - dt / 800,
          }))
          .filter((p) => p.opacity > 0);

        // Sync State to React UI
        setScore(state.score);
        setCombo(state.combo);
        setBestCombo(state.bestCombo);
        setItemsCollected(state.itemsCollected);
        setFeverActivations(state.feverActivations);
        setFeverPercent(state.feverPercent);
        setIsFeverActive(state.isFever);
        setFeverTimeRemaining(state.feverRemaining);

        setMushakRender({
          x: state.mushakX,
          y: GAME_SETTINGS.GROUND_Y,
          direction: state.direction,
          isMoving: state.isMoving,
          isCollecting: state.isCollectingTimer > 0,
          isFever: state.isFever,
          isStumbling: state.isStumbleTimer > 0,
        });
        setCollectibles([...state.collectibles]);
        setObstacles([...state.obstacles]);
        setPopups([...state.popups]);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [resetChallenge]);

  if (isCompleted && completionStats) {
    return (
      <ChallengeResult
        challenge={challengeConfig}
        score={completionStats.finalScore}
        isNewRecord={isNewRecord}
        personalBest={completionStats.personalBest}
        details={[
          { label: 'Prasad Collected', value: completionStats.itemsCollected, icon: CheckCircle2 },
          { label: 'Peak Combo', value: completionStats.bestCombo, icon: Flame },
          { label: 'Morya Fever', value: completionStats.fevers, icon: Sparkles },
          { label: 'Trial Time', value: '30s Complete', icon: Clock },
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
              <span className="text-base sm:text-lg">🐭</span>
              <h1 className="text-xs sm:text-base font-heading font-extrabold uppercase tracking-wide text-amber-300">
                Mushak Rush
              </h1>
            </div>
            <p className="text-[10px] text-amber-300/70 hidden sm:block">
              Collect falling modaks & sweets!
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Combo Badge */}
          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-950/80 border border-orange-500/50 text-orange-300 font-bold text-xs animate-bounce">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>{combo}x</span>
            </div>
          )}

          {/* Timer Display */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold tabular-nums ${
              timeRemaining <= 8
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
        </div>
      </header>

      {/* Fever Meter Bar */}
      <div className="w-full max-w-3xl mx-auto my-1 px-2">
        <FeverMeter
          id="challenge-fever-meter"
          feverPercent={feverPercent}
          isFeverActive={isFeverActive}
          feverTimeRemaining={feverTimeRemaining}
        />
      </div>

      {/* Game World Arena */}
      <main className="w-full max-w-3xl my-auto py-1 flex flex-col items-center justify-center">
        <GameWorld
          id="challenge-game-world"
          mushakState={mushakRender}
          collectibles={collectibles}
          obstacles={obstacles}
          popups={popups}
          isFeverActive={isFeverActive}
        />
      </main>

      {/* Mobile/Touch Controls */}
      <footer className="w-full max-w-3xl mx-auto z-20 pb-1">
        <MushakControls
          id="challenge-mushak-controls"
          isLeftPressed={isLeftPressed}
          isRightPressed={isRightPressed}
          onMoveLeftStart={() => {
            gameStateRef.current.leftInput = true;
            setIsLeftPressed(true);
          }}
          onMoveLeftEnd={() => {
            gameStateRef.current.leftInput = false;
            setIsLeftPressed(false);
          }}
          onMoveRightStart={() => {
            gameStateRef.current.rightInput = true;
            setIsRightPressed(true);
          }}
          onMoveRightEnd={() => {
            gameStateRef.current.rightInput = false;
            setIsRightPressed(false);
          }}
        />
      </footer>
    </div>
  );
}
