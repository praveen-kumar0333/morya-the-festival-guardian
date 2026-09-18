/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Achievement Definitions & Storage Helpers
 * 
 * 12 Deterministic Contest Achievements:
 * 1. FIRST_BLESSING - Complete your first festival stage
 * 2. PANDAL_ARTIST - Complete the Pandal Build stage
 * 3. RANGOLI_ARTIST - Complete all three Rangoli Rush rounds
 * 4. MUSHAKS_FRIEND - Collect at least 20 items in Modak & Mushak
 * 5. COMBO_MASTER - Reach a 10× collection combo
 * 6. ECO_GUARDIAN - Reach 100 Eco Spirit
 * 7. PANDAL_PERFECT - Complete the Pandal Build with all decorations correctly placed
 * 8. RANGOLI_MASTER - Complete all Rangoli rounds with excellent accuracy (>=90%)
 * 9. FEVER_GUARDIAN - Activate Morya Fever at least once
 * 10. FESTIVAL_GUARDIAN - Complete the entire festival journey (reach Grand Morya)
 * 11. MORYA_MASTER - Achieve the highest Guardian rank (11,500+ pts)
 * 12. PERFECT_CELEBRATION - Complete the Eco Celebration with all 6 eco-friendly choices
 */

export const STORAGE_KEY_ACHIEVEMENTS = 'morya_achievements';

export const ACHIEVEMENTS = [
  {
    id: 'FIRST_BLESSING',
    title: 'First Blessing',
    description: 'Complete your first festival stage.',
    icon: '🪔',
    category: 'Progression',
    requirement: 'Successfully finish any of the 4 festival stages.',
  },
  {
    id: 'PANDAL_ARTIST',
    title: 'Pandal Artist',
    description: 'Complete the Pandal Build stage.',
    icon: '🛕',
    category: 'Pandal Build',
    requirement: 'Adorn the sacred mandap and complete Stage 1.',
  },
  {
    id: 'RANGOLI_ARTIST',
    title: 'Rangoli Artist',
    description: 'Complete all three Rangoli Rush rounds.',
    icon: '🎨',
    category: 'Rangoli Rush',
    requirement: 'Recreate sacred patterns and complete all 3 rounds of Stage 2.',
  },
  {
    id: 'MUSHAKS_FRIEND',
    title: "Mushak's Friend",
    description: 'Collect at least 20 items in Modak & Mushak.',
    icon: '🐭',
    category: 'Modak & Mushak',
    requirement: 'Gather 20 or more sacred prasad treats in Stage 3.',
  },
  {
    id: 'COMBO_MASTER',
    title: 'Combo Master',
    description: 'Reach a 10× collection combo.',
    icon: '🔥',
    category: 'Mastery',
    requirement: 'Maintain momentum to reach a 10x collection combo multiplier.',
  },
  {
    id: 'ECO_GUARDIAN',
    title: 'Eco Guardian',
    description: 'Reach 100 Eco Spirit.',
    icon: '🌱',
    category: 'Eco Celebration',
    requirement: 'Reach maximum 100 Eco Spirit through earth-conscious choices.',
  },
  {
    id: 'PANDAL_PERFECT',
    title: 'Pandal Perfectionist',
    description: 'Complete the Pandal Build with all decorations correctly placed.',
    icon: '✨',
    category: 'Pandal Build',
    requirement: 'Correctly position all 6 sacred decorations in Stage 1.',
  },
  {
    id: 'RANGOLI_MASTER',
    title: 'Rangoli Master',
    description: 'Complete all Rangoli rounds with excellent accuracy.',
    icon: '🌺',
    category: 'Rangoli Rush',
    requirement: 'Finish all 3 rounds with an average accuracy of at least 90%.',
  },
  {
    id: 'FEVER_GUARDIAN',
    title: 'Morya Fever',
    description: 'Activate Morya Fever at least once.',
    icon: '⚡',
    category: 'Modak & Mushak',
    requirement: 'Fill the sacred devotion meter and unleash Morya Fever in Stage 3.',
  },
  {
    id: 'FESTIVAL_GUARDIAN',
    title: 'Festival Guardian',
    description: 'Complete the entire festival journey.',
    icon: '🌸',
    category: 'Progression',
    requirement: 'Guide the celebration across all 4 stages to the Grand Morya finale.',
  },
  {
    id: 'MORYA_MASTER',
    title: 'Morya Master',
    description: 'Achieve the highest Guardian rank.',
    icon: '👑',
    category: 'Mastery',
    requirement: 'Accumulate 11,500 or more total points across the festival.',
  },
  {
    id: 'PERFECT_CELEBRATION',
    title: 'Perfect Celebration',
    description: 'Complete the Eco Celebration with all 6 eco-friendly choices.',
    icon: '🌿',
    category: 'Eco Celebration',
    requirement: 'Choose eco-conscious alternatives in all 6 festive situations.',
  },
];

export const TOTAL_ACHIEVEMENTS = ACHIEVEMENTS.length;

/**
 * Safe reading of unlocked achievements from localStorage
 * Returns a map of: { [id]: { id, unlockedAt } }
 */
export function getStoredAchievements() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
    return {};
  } catch (err) {
    console.warn('Could not read achievements from localStorage:', err);
    return {};
  }
}

/**
 * Safe saving of unlocked achievements map
 */
export function saveStoredAchievements(achievementsMap) {
  try {
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievementsMap));
  } catch (err) {
    console.warn('Could not save achievements to localStorage:', err);
  }
}
