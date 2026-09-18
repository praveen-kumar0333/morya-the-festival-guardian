/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Challenge Mode Statistics & Personal Records Service
 * 
 * Manages separate, isolated challenge mode persistence in localStorage
 * under the key 'morya_challenge_stats'.
 * Normal festival mode records remain completely unaffected.
 */

import { CHALLENGE_IDS } from '../constants/challengeData.js';

export const STORAGE_KEY_CHALLENGE_STATS = 'morya_challenge_stats';

export const DEFAULT_CHALLENGE_STATS = {
  totalAttempts: 0,
  challengesCompleted: 0,
  pandalBlitz: {
    bestScore: 0,
    bestTimeRemaining: 0,
    completed: false,
    attempts: 0,
  },
  rangoliMaster: {
    bestScore: 0,
    bestAccuracy: 0,
    completed: false,
    attempts: 0,
  },
  mushakRush: {
    bestScore: 0,
    bestCombo: 0,
    mostItems: 0,
    completed: false,
    attempts: 0,
  },
  ecoGuardian: {
    bestScore: 0,
    highestEcoSpirit: 0,
    completed: false,
    attempts: 0,
  },
};

/**
 * Safely retrieve challenge mode stats from localStorage
 */
export function getStoredChallengeStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHALLENGE_STATS);
    if (!raw) return { ...DEFAULT_CHALLENGE_STATS };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        totalAttempts: typeof parsed.totalAttempts === 'number' ? parsed.totalAttempts : 0,
        challengesCompleted: typeof parsed.challengesCompleted === 'number' ? parsed.challengesCompleted : 0,
        pandalBlitz: {
          ...DEFAULT_CHALLENGE_STATS.pandalBlitz,
          ...(parsed.pandalBlitz || {}),
        },
        rangoliMaster: {
          ...DEFAULT_CHALLENGE_STATS.rangoliMaster,
          ...(parsed.rangoliMaster || {}),
        },
        mushakRush: {
          ...DEFAULT_CHALLENGE_STATS.mushakRush,
          ...(parsed.mushakRush || {}),
        },
        ecoGuardian: {
          ...DEFAULT_CHALLENGE_STATS.ecoGuardian,
          ...(parsed.ecoGuardian || {}),
        },
      };
    }
    return { ...DEFAULT_CHALLENGE_STATS };
  } catch (err) {
    console.warn('Could not read challenge stats from localStorage:', err);
    return { ...DEFAULT_CHALLENGE_STATS };
  }
}

/**
 * Safely save challenge stats to localStorage
 */
export function saveStoredChallengeStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY_CHALLENGE_STATS, JSON.stringify(stats));
  } catch (err) {
    console.warn('Could not save challenge stats to localStorage:', err);
  }
}

/**
 * Helper to map challenge ID to stats key
 */
function getChallengeKey(challengeId) {
  switch (challengeId) {
    case CHALLENGE_IDS.PANDAL_BLITZ:
      return 'pandalBlitz';
    case CHALLENGE_IDS.RANGOLI_MASTER:
      return 'rangoliMaster';
    case CHALLENGE_IDS.MUSHAK_RUSH:
      return 'mushakRush';
    case CHALLENGE_IDS.ECO_GUARDIAN:
      return 'ecoGuardian';
    default:
      return null;
  }
}

/**
 * Record a challenge trial attempt & evaluate personal bests.
 * Only triggers isNewRecord if the new score exceeds the existing positive best score.
 * 
 * @param {string} challengeId
 * @param {Object} results
 * @returns {{ updatedStats: Object, isNewRecord: boolean, previousBest: number, newBest: number }}
 */
export function recordChallengeAttempt(challengeId, results = {}) {
  const current = getStoredChallengeStats();
  const next = { ...current };
  const key = getChallengeKey(challengeId);

  if (!key || !next[key]) {
    return { updatedStats: current, isNewRecord: false, previousBest: 0, newBest: 0 };
  }

  const challengeStats = { ...next[key] };
  const prevBest = challengeStats.bestScore || 0;
  const score = Math.max(0, Math.round(results.score || 0));
  let isNewRecord = false;

  // Increment attempts
  challengeStats.attempts = (challengeStats.attempts || 0) + 1;
  next.totalAttempts = (next.totalAttempts || 0) + 1;

  // Track completion
  if (results.completed) {
    challengeStats.completed = true;
  }

  // Check if new personal best score
  if (score > prevBest) {
    if (prevBest > 0) {
      isNewRecord = true;
    }
    challengeStats.bestScore = score;
  }

  // Challenge-specific secondary records
  if (key === 'pandalBlitz') {
    if (results.timeRemaining !== undefined && results.timeRemaining > (challengeStats.bestTimeRemaining || 0)) {
      challengeStats.bestTimeRemaining = Math.round(results.timeRemaining * 10) / 10;
    }
  } else if (key === 'rangoliMaster') {
    if (results.accuracy !== undefined && results.accuracy > (challengeStats.bestAccuracy || 0)) {
      challengeStats.bestAccuracy = Math.round(results.accuracy);
    }
  } else if (key === 'mushakRush') {
    if (results.combo !== undefined && results.combo > (challengeStats.bestCombo || 0)) {
      challengeStats.bestCombo = results.combo;
    }
    if (results.itemsCollected !== undefined && results.itemsCollected > (challengeStats.mostItems || 0)) {
      challengeStats.mostItems = results.itemsCollected;
    }
  } else if (key === 'ecoGuardian') {
    if (results.ecoSpirit !== undefined && results.ecoSpirit > (challengeStats.highestEcoSpirit || 0)) {
      challengeStats.highestEcoSpirit = results.ecoSpirit;
    }
  }

  next[key] = challengeStats;

  // Recalculate completed distinct challenges
  const completedKeys = ['pandalBlitz', 'rangoliMaster', 'mushakRush', 'ecoGuardian'].filter(
    (k) => next[k].completed
  );
  next.challengesCompleted = completedKeys.length;

  saveStoredChallengeStats(next);

  return {
    updatedStats: next,
    isNewRecord,
    previousBest: prevBest,
    newBest: challengeStats.bestScore,
  };
}
