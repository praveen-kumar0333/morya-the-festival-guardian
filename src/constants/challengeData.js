/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Challenge Mode Data & Trial Configurations
 * Team: Morya Makers
 */

export const CHALLENGE_IDS = {
  PANDAL_BLITZ: 'pandal-blitz',
  RANGOLI_MASTER: 'rangoli-master',
  MUSHAK_RUSH: 'mushak-rush',
  ECO_GUARDIAN: 'eco-guardian',
};

export const CHALLENGES = [
  {
    id: CHALLENGE_IDS.PANDAL_BLITZ,
    title: 'Pandal Blitz',
    subtitle: 'Build faster. Build perfectly.',
    description: 'Adorn the pandal in rapid succession. Place all six decorations with precision before time runs out.',
    iconName: 'Sparkles',
    emoji: '🛕',
    accentColor: 'from-amber-500 to-orange-600',
    timeLimit: 30, // seconds
    objective: 'Place all 6 decorations within 30 seconds',
    scoringInfo: 'Placement: 100 pts · Finish: 300 pts · Time bonus: 20 pts/sec · Perfect: 250 pts',
    targetCount: 6,
  },
  {
    id: CHALLENGE_IDS.RANGOLI_MASTER,
    title: 'Rangoli Master',
    subtitle: 'Remember. Recreate. Master the pattern.',
    description: 'Memorize intricate sacred geometric mandalas and recreate them with flawless accuracy across 3 trials.',
    iconName: 'Palette',
    emoji: '🎨',
    accentColor: 'from-rose-500 to-amber-600',
    timeLimit: 45, // seconds total
    objective: 'Complete 3 complex symmetric patterns (4x4 & 5x5) within 45s total',
    scoringInfo: 'Correct tiles: 50 pts · High Accuracy bonus · Round bonuses · Speed: 15 pts/sec',
    roundsCount: 3,
  },
  {
    id: CHALLENGE_IDS.MUSHAK_RUSH,
    title: 'Mushak Rush',
    subtitle: 'Collect more. Keep the combo alive.',
    description: 'Lead Lord Ganesha\'s faithful vahana through a frenzy of sacred falling prasad while avoiding obstacles.',
    iconName: 'Flame',
    emoji: '🐭',
    accentColor: 'from-orange-500 to-yellow-500',
    timeLimit: 30, // seconds
    objective: 'Collect modaks & prasad, avoid obstacles, maintain combos, and trigger Fever',
    scoringInfo: 'Modak: +100 · Flower: +50 · Durva: +75 · Golden Modak: +300 · Combos up to 5x',
  },
  {
    id: CHALLENGE_IDS.ECO_GUARDIAN,
    title: 'Eco Guardian',
    subtitle: 'Every choice shapes the celebration.',
    description: 'Face 6 rapid festive dilemmas. Choose sustainable options to keep the Eco Spirit pure.',
    iconName: 'Leaf',
    emoji: '🌱',
    accentColor: 'from-emerald-500 to-teal-600',
    timeLimit: 30, // seconds
    objective: 'Make 6 green festive decisions in 30 seconds to maximize Eco Spirit (0-100)',
    scoringInfo: 'Eco choice: +50-120 pts · Perfect all-green: +300 pts · Spirit 100: +300 pts · Time bonus',
    decisionCount: 6,
  },
];
