/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Personal Statistics & Record Tracking Service
 * 
 * Tracks player personal bests across all festival stages and overall journey.
 * Uses defensive localStorage handling with automatic recovery from corrupted data.
 */

export const STORAGE_KEY_PLAYER_STATS = 'morya_player_stats';

export const DEFAULT_PLAYER_STATS = {
  // Overall
  highestScore: 0,
  bestGuardianRank: null, // { level: number, name: string, badge: string }
  completedRuns: 0,
  completedStages: 0,

  // Stage 1 - Pandal Build
  bestPandalScore: 0,
  fastestPandalCompletionTime: null, // in seconds remaining (higher = faster)

  // Stage 2 - Rangoli Rush
  bestRangoliScore: 0,
  bestRangoliAccuracy: 0, // percentage 0-100

  // Stage 3 - Modak & Mushak
  bestMushakScore: 0,
  bestCombo: 0,
  mostItemsCollected: 0,
  mostFeverActivations: 0,

  // Stage 4 - Eco Celebration
  bestEcoScore: 0,
  highestEcoSpirit: 0,
};

/**
 * Safely retrieve player stats from localStorage
 */
export function getStoredPlayerStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLAYER_STATS);
    if (!raw) return { ...DEFAULT_PLAYER_STATS };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        ...DEFAULT_PLAYER_STATS,
        ...parsed,
      };
    }
    return { ...DEFAULT_PLAYER_STATS };
  } catch (err) {
    console.warn('Could not read player stats from localStorage:', err);
    return { ...DEFAULT_PLAYER_STATS };
  }
}

/**
 * Safely save player stats to localStorage
 */
export function saveStoredPlayerStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY_PLAYER_STATS, JSON.stringify(stats));
  } catch (err) {
    console.warn('Could not save player stats to localStorage:', err);
  }
}

/**
 * Compare incoming performance against existing personal bests.
 * Only updates and flags a new personal best if the new value genuinely exceeds the previous record.
 * 
 * @param {Object} updates - fields to check and update
 * @returns {Object} { updatedStats, newRecords: Array<{ id, title, label, value }> }
 */
export function recordStatsUpdates(updates = {}) {
  const current = getStoredPlayerStats();
  const next = { ...current };
  const newRecords = [];

  // 1. Overall Completed Stages
  if (typeof updates.incrementCompletedStages === 'number') {
    next.completedStages = (next.completedStages || 0) + updates.incrementCompletedStages;
  }

  // 2. Overall Completed Runs (Grand Morya reached)
  if (updates.incrementCompletedRuns) {
    next.completedRuns = (next.completedRuns || 0) + 1;
  }

  // 3. Overall Highest Score
  if (typeof updates.totalScore === 'number' && updates.totalScore > 0) {
    if (updates.totalScore > current.highestScore) {
      if (current.highestScore > 0) {
        newRecords.push({
          id: 'HIGH_SCORE',
          title: 'NEW HIGH SCORE!',
          label: '🏆 NEW HIGH SCORE!',
          value: updates.totalScore.toLocaleString(),
        });
      }
      next.highestScore = updates.totalScore;
    }
  }

  // 4. Best Guardian Rank
  if (updates.guardianRank && typeof updates.guardianRank.level === 'number') {
    const currentLevel = current.bestGuardianRank?.level || 0;
    if (updates.guardianRank.level > currentLevel) {
      next.bestGuardianRank = {
        level: updates.guardianRank.level,
        name: updates.guardianRank.name,
        badge: updates.guardianRank.badge,
      };
    }
  }

  // 5. Stage 1 - Pandal Score & Speed
  if (typeof updates.pandalScore === 'number' && updates.pandalScore > 0) {
    if (updates.pandalScore > current.bestPandalScore) {
      if (current.bestPandalScore > 0) {
        newRecords.push({
          id: 'PANDAL_SCORE',
          title: 'NEW PANDAL RECORD!',
          label: '🛕 NEW PANDAL RECORD!',
          value: `+${updates.pandalScore.toLocaleString()} pts`,
        });
      }
      next.bestPandalScore = updates.pandalScore;
    }
  }

  if (typeof updates.pandalTimeRemaining === 'number' && updates.pandalTimeRemaining > 0) {
    if (
      current.fastestPandalCompletionTime === null ||
      updates.pandalTimeRemaining > current.fastestPandalCompletionTime
    ) {
      next.fastestPandalCompletionTime = updates.pandalTimeRemaining;
    }
  }

  // 6. Stage 2 - Rangoli Score & Accuracy
  if (typeof updates.rangoliScore === 'number' && updates.rangoliScore > 0) {
    if (updates.rangoliScore > current.bestRangoliScore) {
      if (current.bestRangoliScore > 0) {
        newRecords.push({
          id: 'RANGOLI_SCORE',
          title: 'NEW RANGOLI RECORD!',
          label: '🎨 NEW RANGOLI RECORD!',
          value: `+${updates.rangoliScore.toLocaleString()} pts`,
        });
      }
      next.bestRangoliScore = updates.rangoliScore;
    }
  }

  if (typeof updates.rangoliAccuracy === 'number' && updates.rangoliAccuracy > 0) {
    if (updates.rangoliAccuracy > current.bestRangoliAccuracy) {
      if (current.bestRangoliAccuracy > 0) {
        newRecords.push({
          id: 'RANGOLI_ACCURACY',
          title: 'NEW ACCURACY RECORD!',
          label: '🌸 NEW ACCURACY RECORD!',
          value: `${updates.rangoliAccuracy}%`,
        });
      }
      next.bestRangoliAccuracy = updates.rangoliAccuracy;
    }
  }

  // 7. Stage 3 - Mushak Score, Combo, Items, Fevers
  if (typeof updates.mushakScore === 'number' && updates.mushakScore > 0) {
    if (updates.mushakScore > current.bestMushakScore) {
      if (current.bestMushakScore > 0) {
        newRecords.push({
          id: 'MUSHAK_SCORE',
          title: 'NEW MUSHAK RECORD!',
          label: '🐭 NEW MUSHAK RECORD!',
          value: `+${updates.mushakScore.toLocaleString()} pts`,
        });
      }
      next.bestMushakScore = updates.mushakScore;
    }
  }

  if (typeof updates.combo === 'number' && updates.combo > 0) {
    if (updates.combo > current.bestCombo) {
      if (current.bestCombo > 0) {
        newRecords.push({
          id: 'BEST_COMBO',
          title: 'NEW BEST COMBO!',
          label: '🔥 NEW BEST COMBO!',
          value: `${updates.combo}x Multiplier`,
        });
      }
      next.bestCombo = updates.combo;
    }
  }

  if (typeof updates.itemsCollected === 'number' && updates.itemsCollected > 0) {
    if (updates.itemsCollected > current.mostItemsCollected) {
      if (current.mostItemsCollected > 0) {
        newRecords.push({
          id: 'MOST_ITEMS',
          title: 'PRASAD COLLECTION RECORD!',
          label: '✨ PRASAD COLLECTION RECORD!',
          value: `${updates.itemsCollected} Treats`,
        });
      }
      next.mostItemsCollected = updates.itemsCollected;
    }
  }

  if (typeof updates.feverActivations === 'number' && updates.feverActivations > 0) {
    if (updates.feverActivations > current.mostFeverActivations) {
      next.mostFeverActivations = updates.feverActivations;
    }
  }

  // 8. Stage 4 - Eco Score & Eco Spirit
  if (typeof updates.ecoScore === 'number' && updates.ecoScore > 0) {
    if (updates.ecoScore > current.bestEcoScore) {
      if (current.bestEcoScore > 0) {
        newRecords.push({
          id: 'ECO_SCORE',
          title: 'NEW ECO SPIRIT RECORD!',
          label: '🌿 NEW ECO SPIRIT RECORD!',
          value: `+${updates.ecoScore.toLocaleString()} pts`,
        });
      }
      next.bestEcoScore = updates.ecoScore;
    }
  }

  if (typeof updates.ecoSpirit === 'number' && updates.ecoSpirit > 0) {
    if (updates.ecoSpirit > current.highestEcoSpirit) {
      next.highestEcoSpirit = updates.ecoSpirit;
    }
  }

  saveStoredPlayerStats(next);
  return { updatedStats: next, newRecords };
}
