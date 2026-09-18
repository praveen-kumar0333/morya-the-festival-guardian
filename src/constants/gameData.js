/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Game Constants and Stage Configurations
 * Team: Morya Makers
 */

export const GAME_TITLE = 'MORYA: THE FESTIVAL GUARDIAN';
export const TEAM_NAME = 'Morya Makers';
export const TAGLINE = 'Build the celebration. Protect the spirit. Make Morya shine.';

export const SCREENS = {
  MAIN_MENU: 'MAIN_MENU',
  FESTIVAL_JOURNEY: 'FESTIVAL_JOURNEY',
  PANDAL_BUILD: 'PANDAL_BUILD',
  RANGOLI_RUSH: 'RANGOLI_RUSH',
  MODAK_MUSHAK: 'MODAK_MUSHAK',
  ECO_CELEBRATION: 'ECO_CELEBRATION',
  GRAND_MORYA: 'GRAND_MORYA',
  ACHIEVEMENTS: 'ACHIEVEMENTS',
  PERSONAL_RECORDS: 'PERSONAL_RECORDS',
  CHALLENGE_MODE: 'CHALLENGE_MODE',
  FESTIVAL_COLLECTION: 'FESTIVAL_COLLECTION',
};

export const MODALS = {
  HOW_TO_PLAY: 'HOW_TO_PLAY',
  SETTINGS: 'SETTINGS',
  CREDITS: 'CREDITS',
  HIGH_SCORES: 'HIGH_SCORES',
  PAUSE: 'PAUSE',
};

export const STAGES = [
  {
    id: SCREENS.PANDAL_BUILD,
    number: 1,
    title: 'Pandal Build',
    tagline: 'Adorn the sacred pavilion with festive devotion',
    description:
      'Arrange traditional decor, auspicious marigolds, festive torans, and glowing brass diyas to prepare the welcoming abode for Lord Ganesha.',
    category: 'pandal',
    timeLimit: 60,
    baseScore: 1000,
    accentColor: 'from-amber-500 to-orange-600',
    iconName: 'Sparkles',
  },
  {
    id: SCREENS.RANGOLI_RUSH,
    number: 2,
    title: 'Rangoli Rush',
    tagline: 'Harmonize sacred symmetry and vibrant powder petals',
    description:
      'Observe the vibrant auspicious rangoli patterns and recreate missing sacred motifs to welcome good fortune and joy.',
    category: 'rangoli',
    timeLimit: 75,
    baseScore: 1200,
    accentColor: 'from-rose-500 to-amber-500',
    iconName: 'Palette',
  },
  {
    id: SCREENS.MODAK_MUSHAK,
    number: 3,
    title: 'Modak & Mushak',
    tagline: 'Swiftly guide the faithful companion to collect sweet prasad',
    description:
      'Help Mushak collect steamed ukadiche modaks, fresh durva grass, and red hibiscus flowers while gracefully avoiding spilled water pots.',
    category: 'mushak',
    timeLimit: 60,
    baseScore: 1500,
    accentColor: 'from-yellow-400 to-amber-600',
    iconName: 'Trophy',
  },
  {
    id: SCREENS.ECO_CELEBRATION,
    number: 4,
    title: 'Eco Celebration',
    tagline: 'Nurture Mother Earth with conscious festive traditions',
    description:
      'Make conscious, sustainable choices for pandal decor, colors, offerings, and cleanup to celebrate Ganesh Chaturthi in harmony with nature.',
    category: 'ecoSpirit',
    timeLimit: 60,
    baseScore: 1300,
    accentColor: 'from-emerald-500 to-teal-700',
    iconName: 'Leaf',
  },
];

export const INITIAL_SCORES = {
  pandal: 0,
  rangoli: 0,
  mushak: 0,
  ecoSpirit: 0,
  comboBonus: 0,
  timeBonus: 0,
};

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  vibration: true,
};

export const LOCAL_STORAGE_KEYS = {
  HIGH_SCORE: 'morya_game_high_score',
  GAME_HISTORY: 'morya_game_history',
  SETTINGS: 'morya_game_settings',
  ACHIEVEMENTS: 'morya_achievements',
  PLAYER_STATS: 'morya_player_stats',
  COLLECTION: 'morya_festival_collection',
};
