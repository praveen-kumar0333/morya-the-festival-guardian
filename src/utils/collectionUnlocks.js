/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Festival Collection Unlock & Persistence Service
 * Team: Morya Makers
 * 
 * Safely evaluates unlock conditions against existing game state (achievements,
 * player stats, challenge stats, scores) without modifying or altering existing gameplay.
 * Persists data under localStorage key 'morya_festival_collection'.
 */

import {
  COLLECTION_STORAGE_KEY,
  FESTIVAL_COLLECTION_ITEMS,
  DEFAULT_ACTIVE_SELECTIONS,
  INITIAL_UNLOCKED_ITEM_IDS,
  COLLECTION_CATEGORIES,
} from '../constants/collectionData.js';

/**
 * Safely retrieve festival collection state from localStorage
 */
export function getStoredCollection() {
  try {
    const raw = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (!raw) {
      return {
        unlockedItemIds: [...INITIAL_UNLOCKED_ITEM_IDS],
        activeSelections: { ...DEFAULT_ACTIVE_SELECTIONS },
        viewedItemIds: [...INITIAL_UNLOCKED_ITEM_IDS],
      };
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return {
        unlockedItemIds: [...INITIAL_UNLOCKED_ITEM_IDS],
        activeSelections: { ...DEFAULT_ACTIVE_SELECTIONS },
        viewedItemIds: [...INITIAL_UNLOCKED_ITEM_IDS],
      };
    }

    // Merge and sanitize unlocked item IDs (always preserve defaults)
    const storedUnlocked = Array.isArray(parsed.unlockedItemIds)
      ? parsed.unlockedItemIds
      : [];
    const validIds = new Set([
      ...INITIAL_UNLOCKED_ITEM_IDS,
      ...storedUnlocked.filter((id) =>
        FESTIVAL_COLLECTION_ITEMS.some((item) => item.id === id)
      ),
    ]);
    const unlockedItemIds = Array.from(validIds);

    // Sanitize active selections (ensure selected items exist and are unlocked)
    const rawSelections = parsed.activeSelections || {};
    const activeSelections = { ...DEFAULT_ACTIVE_SELECTIONS };

    Object.values(COLLECTION_CATEGORIES).forEach((cat) => {
      if (cat === COLLECTION_CATEGORIES.ALL) return;
      const selectedId = rawSelections[cat];
      if (selectedId && unlockedItemIds.includes(selectedId)) {
        activeSelections[cat] = selectedId;
      } else {
        activeSelections[cat] = DEFAULT_ACTIVE_SELECTIONS[cat];
      }
    });

    const viewedItemIds = Array.isArray(parsed.viewedItemIds)
      ? parsed.viewedItemIds
      : [...INITIAL_UNLOCKED_ITEM_IDS];

    return {
      unlockedItemIds,
      activeSelections,
      viewedItemIds,
    };
  } catch (err) {
    console.warn('Could not read festival collection from localStorage:', err);
    return {
      unlockedItemIds: [...INITIAL_UNLOCKED_ITEM_IDS],
      activeSelections: { ...DEFAULT_ACTIVE_SELECTIONS },
      viewedItemIds: [...INITIAL_UNLOCKED_ITEM_IDS],
    };
  }
}

/**
 * Safely persist collection state to localStorage
 */
export function saveStoredCollection(collectionState) {
  try {
    localStorage.setItem(
      COLLECTION_STORAGE_KEY,
      JSON.stringify(collectionState)
    );
  } catch (err) {
    console.warn('Could not save festival collection to localStorage:', err);
  }
}

/**
 * Find collectible item by ID
 */
export function getCollectionItemById(id) {
  return FESTIVAL_COLLECTION_ITEMS.find((item) => item.id === id) || null;
}

/**
 * Deterministically evaluate all items against existing player milestones
 * 
 * @param {Object} params
 * @param {Object} params.achievements - Map of unlocked achievement IDs
 * @param {Object} params.playerStats - Stored player stats
 * @param {Object} params.challengeStats - Stored challenge stats
 * @param {number} params.highScore - Best recorded high score
 * @param {number} params.currentScore - Total score of ongoing run (if any)
 * @returns {{ updatedCollection: Object, newlyUnlockedItems: Array }}
 */
export function evaluateCollectionUnlocks({
  achievements = {},
  playerStats = {},
  challengeStats = {},
  highScore = 0,
  currentScore = 0,
}) {
  const currentCollection = getStoredCollection();
  const alreadyUnlocked = new Set(currentCollection.unlockedItemIds);
  const newlyUnlockedItems = [];

  const maxRecordedScore = Math.max(
    highScore || 0,
    playerStats?.highestScore || 0,
    currentScore || 0
  );

  FESTIVAL_COLLECTION_ITEMS.forEach((item) => {
    // Already unlocked
    if (alreadyUnlocked.has(item.id)) return;

    let qualifies = false;
    const cond = item.condition;

    if (!cond || cond.type === 'default') {
      qualifies = true;
    } else if (cond.type === 'achievement') {
      qualifies = Boolean(achievements && achievements[cond.target]);
    } else if (cond.type === 'score') {
      qualifies = maxRecordedScore >= cond.target;
    } else if (cond.type === 'challenge') {
      const trialData = challengeStats && challengeStats[cond.target];
      qualifies = Boolean(trialData && trialData.completed);
    } else if (cond.type === 'runs') {
      qualifies = (playerStats?.completedRuns || 0) >= cond.target;
    }

    if (qualifies) {
      alreadyUnlocked.add(item.id);
      newlyUnlockedItems.push(item);
    }
  });

  if (newlyUnlockedItems.length > 0) {
    const updatedCollection = {
      ...currentCollection,
      unlockedItemIds: Array.from(alreadyUnlocked),
    };
    saveStoredCollection(updatedCollection);
    return { updatedCollection, newlyUnlockedItems };
  }

  return { updatedCollection: currentCollection, newlyUnlockedItems: [] };
}

/**
 * Set active decoration for a specific category
 */
export function setActiveDecoration(category, itemId) {
  const collection = getStoredCollection();
  const item = getCollectionItemById(itemId);

  if (!item || item.category !== category) {
    return { success: false, collection };
  }

  if (!collection.unlockedItemIds.includes(itemId)) {
    return { success: false, collection, reason: 'LOCKED' };
  }

  const updatedSelections = {
    ...collection.activeSelections,
    [category]: itemId,
  };

  const updatedCollection = {
    ...collection,
    activeSelections: updatedSelections,
  };

  saveStoredCollection(updatedCollection);
  return { success: true, collection: updatedCollection };
}
