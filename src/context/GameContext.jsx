import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SCREENS,
  MODALS,
  STAGES,
  INITIAL_SCORES,
  DEFAULT_SETTINGS,
  LOCAL_STORAGE_KEYS,
} from '../constants/gameData.js';
import {
  ACHIEVEMENTS,
  getStoredAchievements,
  saveStoredAchievements,
} from '../constants/achievements.js';
import {
  getStoredPlayerStats,
  saveStoredPlayerStats,
  recordStatsUpdates,
} from '../services/playerStats.js';
import { getStoredChallengeStats } from '../services/challengeStats.js';
import {
  getStoredCollection,
  saveStoredCollection,
  evaluateCollectionUnlocks,
  setActiveDecoration,
} from '../utils/collectionUnlocks.js';
import { DEFAULT_ACTIVE_SELECTIONS } from '../constants/collectionData.js';
import { getGuardianRank } from '../components/finale/GuardianRank.jsx';
import { soundManager } from '../services/soundManager.js';

const GameContext = createContext(null);

export const calculateTotalScoreHelper = (scoreObj = {}) => {
  return (
    (scoreObj.pandal || 0) +
    (scoreObj.rangoli || 0) +
    (scoreObj.mushak || 0) +
    (scoreObj.ecoSpirit || 0) +
    (scoreObj.comboBonus || 0) +
    (scoreObj.timeBonus || 0)
  );
};

export function GameProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.MAIN_MENU);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [currentCombo, setCurrentCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pandalArrangement, setPandalArrangement] = useState({});
  const [rangoliResult, setRangoliResult] = useState(null);
  const [mushakResult, setMushakResult] = useState(null);
  const [ecoResult, setEcoResult] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Achievements & Player Records State
  const [achievements, setAchievements] = useState(getStoredAchievements);
  const [playerStats, setPlayerStats] = useState(getStoredPlayerStats);
  const [achievementQueue, setAchievementQueue] = useState([]);

  // Festival Collection & Unlockables State
  const [collectionState, setCollectionState] = useState(getStoredCollection);
  const [collectionQueue, setCollectionQueue] = useState([]);

  // Safe evaluation and notification for Festival Collection rewards
  const checkCollectionUnlocks = React.useCallback(
    (runtimeScores = null) => {
      try {
        const currentAch = getStoredAchievements();
        const currentStats = getStoredPlayerStats();
        const currentChallenges = getStoredChallengeStats();
        const currentScoreVal = runtimeScores
          ? calculateTotalScoreHelper(runtimeScores)
          : calculateTotalScoreHelper(scores);

        const { updatedCollection, newlyUnlockedItems } = evaluateCollectionUnlocks({
          achievements: currentAch,
          playerStats: currentStats,
          challengeStats: currentChallenges,
          highScore,
          currentScore: currentScoreVal,
        });

        if (newlyUnlockedItems && newlyUnlockedItems.length > 0) {
          setCollectionState(updatedCollection);
          soundManager.playCelebration();

          newlyUnlockedItems.forEach((item, idx) => {
            const queueId = Date.now() + Math.random() + idx;
            setTimeout(() => {
              setCollectionQueue((prev) => [...prev, { queueId, item }]);
              setTimeout(() => {
                setCollectionQueue((prev) =>
                  prev.filter((q) => q.queueId !== queueId)
                );
              }, 4500);
            }, idx * 500);
          });
        }
      } catch (err) {
        console.warn('Could not check collection unlocks:', err);
      }
    },
    [highScore, scores]
  );

  const dismissCollectionNotification = (queueId) => {
    setCollectionQueue((prev) => prev.filter((item) => item.queueId !== queueId));
  };

  const handleSetActiveSelection = (category, itemId) => {
    const { success, collection } = setActiveDecoration(category, itemId);
    if (success) {
      setCollectionState(collection);
    }
    return success;
  };

  // Load High Score, Stats, Achievements, and Settings on mount
  useEffect(() => {
    try {
      const savedHighScore = localStorage.getItem(LOCAL_STORAGE_KEYS.HIGH_SCORE);
      const parsedHigh = parseInt(savedHighScore, 10) || 0;
      const stats = getStoredPlayerStats();
      const best = Math.max(parsedHigh, stats.highestScore || 0);

      if (best > 0) {
        setHighScore(best);
        if (stats.highestScore !== best) {
          stats.highestScore = best;
          saveStoredPlayerStats(stats);
          setPlayerStats(stats);
        }
      }

      setAchievements(getStoredAchievements());

      const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsed }));
        soundManager.setSettings(parsed);
      }

      // Check for qualified festival collection unlocks
      checkCollectionUnlocks();
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }, [checkCollectionUnlocks]);

  // Update sound manager when settings change
  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    soundManager.setSettings(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save settings:', e);
    }
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
    if (!settings.soundEnabled) {
      soundManager.playButton();
    }
  };

  const toggleMusic = () => {
    updateSettings({ musicEnabled: !settings.musicEnabled });
  };

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // Safe Achievement Unlock Method
  const unlockAchievement = (id) => {
    if (!id) return false;
    const current = getStoredAchievements();
    if (current[id]) {
      return false; // Already unlocked - prevent duplicate alerts
    }

    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return false;

    const newMap = {
      ...current,
      [id]: {
        id,
        unlockedAt: new Date().toISOString(),
      },
    };

    saveStoredAchievements(newMap);
    setAchievements(newMap);

    // Audio cue
    soundManager.playCelebration();

    // Queue animated notification
    const queueId = Date.now() + Math.random();
    setAchievementQueue((prev) => [...prev, { queueId, achievement: ach }]);

    // Auto dismiss after 4500ms
    setTimeout(() => {
      setAchievementQueue((prev) => prev.filter((item) => item.queueId !== queueId));
    }, 4500);

    return true;
  };

  const dismissAchievementNotification = (queueId) => {
    setAchievementQueue((prev) => prev.filter((item) => item.queueId !== queueId));
  };

  // Safe Player Stats & Personal Record tracking
  const recordStats = (updates) => {
    const { updatedStats, newRecords } = recordStatsUpdates(updates);
    setPlayerStats(updatedStats);

    if (newRecords && newRecords.length > 0) {
      newRecords.forEach((rec, idx) => {
        setTimeout(() => {
          addToast(
            `${rec.label} ${rec.value ? '(' + rec.value + ')' : ''}`,
            'festive',
            4500
          );
        }, idx * 600);
      });
    }

    return updatedStats;
  };

  // Reactive verification for stage achievements
  useEffect(() => {
    if (pandalArrangement?.placedItems?.length === 6 || pandalArrangement?.count === 6) {
      unlockAchievement('PANDAL_PERFECT');
    }
  }, [pandalArrangement]);

  useEffect(() => {
    if (rangoliResult?.rounds?.length >= 3) {
      const avgAccuracy = Math.round(
        rangoliResult.rounds.reduce((acc, r) => acc + (r.accuracy || 100), 0) /
          rangoliResult.rounds.length
      );
      if (avgAccuracy >= 90) {
        unlockAchievement('RANGOLI_MASTER');
      }
    }
  }, [rangoliResult]);

  useEffect(() => {
    if (mushakResult) {
      if (mushakResult.itemsCollected >= 20) {
        unlockAchievement('MUSHAKS_FRIEND');
      }
      if (mushakResult.feverActivations >= 1) {
        unlockAchievement('FEVER_GUARDIAN');
      }
      if ((mushakResult.bestCombo || maxCombo) >= 10) {
        unlockAchievement('COMBO_MASTER');
      }
    }
  }, [mushakResult, maxCombo]);

  useEffect(() => {
    if (ecoResult) {
      if (ecoResult.finalEcoSpirit >= 100) {
        unlockAchievement('ECO_GUARDIAN');
      }
      if ((ecoResult.ecoFriendlyChoices || 0) >= 6) {
        unlockAchievement('PERFECT_CELEBRATION');
      }
    }
  }, [ecoResult]);

  const openModal = (modalType) => {
    soundManager.playButton();
    setActiveModal(modalType);
  };

  const closeModal = () => {
    soundManager.playButton();
    setActiveModal(null);
  };

  // Start fresh game loop
  const startGame = () => {
    soundManager.playButton();
    setScores(INITIAL_SCORES);
    setCurrentCombo(0);
    setMaxCombo(0);
    setPandalArrangement({});
    setRangoliResult(null);
    setMushakResult(null);
    setEcoResult(null);
    setCurrentScreen(SCREENS.PANDAL_BUILD);
    addToast('Stage 1: Pandal Build begins! Decorate the sacred pavilion.', 'festive');
  };

  const goToMainMenu = () => {
    soundManager.playButton();
    setCurrentScreen(SCREENS.MAIN_MENU);
    setActiveModal(null);
    checkCollectionUnlocks();
  };

  // Advance to next stage or Grand Morya
  const completeStage = (stageId, stageScoreData = {}) => {
    const updatedScores = {
      ...scores,
      ...stageScoreData,
    };

    setScores(updatedScores);

    // Track completed stages stat & First Blessing achievement
    recordStats({ incrementCompletedStages: 1 });
    unlockAchievement('FIRST_BLESSING');

    // Determine next screen in the sequence & evaluate stage records/achievements
    if (stageId === SCREENS.PANDAL_BUILD) {
      soundManager.playCorrect();
      addToast('Pandal adorned with devotion! +Points added', 'success');

      unlockAchievement('PANDAL_ARTIST');
      if (pandalArrangement?.placedItems?.length === 6 || pandalArrangement?.count === 6) {
        unlockAchievement('PANDAL_PERFECT');
      }
      recordStats({
        pandalScore: stageScoreData.pandal,
      });

      setCurrentScreen(SCREENS.RANGOLI_RUSH);
    } else if (stageId === SCREENS.RANGOLI_RUSH) {
      soundManager.playCorrect();
      addToast('Sacred Rangoli completed in harmony!', 'success');

      unlockAchievement('RANGOLI_ARTIST');
      const avgAcc = rangoliResult?.rounds?.length
        ? Math.round(
            rangoliResult.rounds.reduce((acc, r) => acc + (r.accuracy || 100), 0) /
              rangoliResult.rounds.length
          )
        : 100;
      if (
        (rangoliResult?.completedRounds >= 3 || (rangoliResult?.rounds?.length || 0) >= 3) &&
        avgAcc >= 90
      ) {
        unlockAchievement('RANGOLI_MASTER');
      }
      recordStats({
        rangoliScore: stageScoreData.rangoli,
        rangoliAccuracy: avgAcc,
      });

      setCurrentScreen(SCREENS.MODAK_MUSHAK);
    } else if (stageId === SCREENS.MODAK_MUSHAK) {
      soundManager.playCorrect();
      addToast('Modaks and prasad collected with joy!', 'success');

      if (mushakResult?.itemsCollected >= 20) {
        unlockAchievement('MUSHAKS_FRIEND');
      }
      if (mushakResult?.feverActivations >= 1) {
        unlockAchievement('FEVER_GUARDIAN');
      }
      if ((mushakResult?.bestCombo || maxCombo) >= 10) {
        unlockAchievement('COMBO_MASTER');
      }
      recordStats({
        mushakScore: stageScoreData.mushak,
        combo: mushakResult?.bestCombo || maxCombo,
        itemsCollected: mushakResult?.itemsCollected,
        feverActivations: mushakResult?.feverActivations,
      });

      setCurrentScreen(SCREENS.ECO_CELEBRATION);
    } else if (stageId === SCREENS.ECO_CELEBRATION) {
      soundManager.playCelebration();
      addToast('Eco-conscious choices blessed by Bappa!', 'success');

      if (ecoResult?.finalEcoSpirit >= 100) {
        unlockAchievement('ECO_GUARDIAN');
      }
      if ((ecoResult?.ecoFriendlyChoices || 0) >= 6) {
        unlockAchievement('PERFECT_CELEBRATION');
      }
      recordStats({
        ecoScore: stageScoreData.ecoSpirit,
        ecoSpirit: ecoResult?.finalEcoSpirit,
      });

      // Reaching Grand Morya: complete run & Festival Guardian achievement
      unlockAchievement('FESTIVAL_GUARDIAN');

      // Calculate total final score and check high score
      const totalScore = calculateTotalScore(updatedScores);
      const rank = getGuardianRank(totalScore);

      recordStats({
        totalScore,
        incrementCompletedRuns: true,
        guardianRank: rank,
      });

      if (totalScore >= 11500) {
        unlockAchievement('MORYA_MASTER');
      }

      if (totalScore > highScore) {
        setHighScore(totalScore);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEYS.HIGH_SCORE, totalScore.toString());
        } catch (e) {
          console.warn('Could not save high score:', e);
        }
        addToast('New High Score achieved! Ganpati Bappa Morya!', 'festive', 5000);
      }

      setCurrentScreen(SCREENS.GRAND_MORYA);
    }

    // Safely evaluate collection unlocks after score updates
    setTimeout(() => {
      checkCollectionUnlocks(updatedScores);
    }, 150);
  };

  const calculateTotalScore = (scoreObj = scores) => {
    return calculateTotalScoreHelper(scoreObj);
  };

  // Combo management
  const incrementCombo = (amount = 1) => {
    const newCombo = currentCombo + amount;
    setCurrentCombo(newCombo);
    if (newCombo > maxCombo) {
      setMaxCombo(newCombo);
    }
    if (newCombo >= 10) {
      unlockAchievement('COMBO_MASTER');
    }
    recordStats({ combo: newCombo });
    if (newCombo % 3 === 0) {
      soundManager.playCombo(Math.min(5, Math.floor(newCombo / 3)));
    }
  };

  const resetCombo = () => {
    setCurrentCombo(0);
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    scores,
    setScores,
    currentCombo,
    maxCombo,
    highScore,
    pandalArrangement,
    setPandalArrangement,
    rangoliResult,
    setRangoliResult,
    mushakResult,
    setMushakResult,
    ecoResult,
    setEcoResult,
    activeModal,
    openModal,
    closeModal,
    toasts,
    addToast,
    settings,
    updateSettings,
    toggleSound,
    toggleMusic,
    startGame,
    goToMainMenu,
    completeStage,
    calculateTotalScore,
    incrementCombo,
    resetCombo,
    stages: STAGES,

    // Achievements & Records
    achievements,
    playerStats,
    achievementQueue,
    unlockAchievement,
    dismissAchievementNotification,
    recordStats,

    // Festival Collection & Unlockables
    collectionState,
    activeSelections: collectionState?.activeSelections || DEFAULT_ACTIVE_SELECTIONS,
    setActiveSelection: handleSetActiveSelection,
    collectionQueue,
    dismissCollectionNotification,
    checkCollectionUnlocks,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

