/**
 * Eco Celebration - Game Configuration & Situations Data
 * Stage 4 of Morya: The Festival Guardian
 *
 * Cultural & Environmental authenticity:
 * Encouraging sustainable festive traditions (clay murti, banana leaf thalis,
 * organic flower decor, segregated composting, and community stewardship)
 * without fear-based messaging.
 */

export const SITUATIONS = [
  {
    id: 'SITUATION_PANDAL',
    title: 'THE PANDAL NEEDS A TOUCH OF MAGIC',
    scenario: 'How should we decorate the celebration?',
    category: 'decor',
    choices: [
      {
        id: 'pandal_fabric',
        title: 'Reusable Fabric Decor',
        description: 'Beautiful decorations that can be used again.',
        score: 100,
        ecoDelta: 12,
        isEco: true,
        category: 'fabric',
        consequence: 'Colorful organic cotton & silk drapes adorn the pandal elegantly!',
      },
      {
        id: 'pandal_plastic',
        title: 'Single-Use Plastic Decor',
        description: 'Bright, but creates unnecessary waste.',
        score: 25,
        ecoDelta: -8,
        isEco: false,
        category: 'plastic',
        consequence: 'Single-use plastic decor creates lingering waste for the mandap.',
      },
      {
        id: 'pandal_flower',
        title: 'Natural Flower Decor',
        description: 'Fresh, festive and naturally beautiful.',
        score: 100,
        ecoDelta: 12,
        isEco: true,
        category: 'flower',
        consequence: 'Fresh marigolds and jasmine fill the air with divine fragrance!',
      },
    ],
  },
  {
    id: 'SITUATION_COLORS',
    title: 'ADD SOME COLOR',
    scenario: 'Which colors should we choose for our celebration?',
    category: 'colors',
    choices: [
      {
        id: 'color_natural',
        title: 'Natural / Eco-Friendly Colors',
        description: 'Herbal and turmeric-based vibrant hues.',
        score: 100,
        ecoDelta: 12,
        isEco: true,
        category: 'natural_powder',
        consequence: 'Herbal gulal and pure turmeric glow safely without water toxins!',
      },
      {
        id: 'color_chemical',
        title: 'Excessive Chemical Waste',
        description: 'Harsh dyes that harm natural waterways.',
        score: 25,
        ecoDelta: -8,
        isEco: false,
        category: 'chemical',
        consequence: 'Synthetic chemicals risk contaminating nearby water bodies.',
      },
      {
        id: 'color_reusable',
        title: 'Reusable Color Decor',
        description: 'Washable cloth tapestries and rangoli mats.',
        score: 90,
        ecoDelta: 10,
        isEco: true,
        category: 'fabric_art',
        consequence: 'Woven festive mats bring vivid colors year after year!',
      },
    ],
  },
  {
    id: 'SITUATION_OFFERINGS',
    title: 'A SPECIAL OFFERING',
    scenario: 'How should we handle festival offerings?',
    category: 'offerings',
    choices: [
      {
        id: 'offering_plate',
        title: 'Use a Reusable Offering Plate',
        description: 'Traditional brass and steel thalis.',
        score: 100,
        ecoDelta: 12,
        isEco: true,
        category: 'brass_plate',
        consequence: 'Gleaming sacred brass plates serve Lord Ganesha with reverence!',
      },
      {
        id: 'offering_plastic',
        title: 'Use Disposable Plastic Items',
        description: 'Convenient single-use plastic wrap and bowls.',
        score: 25,
        ecoDelta: -8,
        isEco: false,
        category: 'plastic_wrap',
        consequence: 'Discarded plastic wraps accumulate around the sacred altar.',
      },
      {
        id: 'offering_leaf',
        title: 'Use Natural / Biodegradable Materials',
        description: 'Leaf plates and banana leaves that compost easily.',
        score: 100,
        ecoDelta: 12,
        isEco: true,
        category: 'banana_leaf',
        consequence: 'Fresh patravali & banana leaves return gently to Mother Earth!',
      },
    ],
  },
  {
    id: 'SITUATION_CLEANUP',
    title: 'THE CELEBRATION IS GETTING BUSY',
    scenario: 'What should we do with festival waste?',
    category: 'cleanup',
    choices: [
      {
        id: 'cleanup_separate',
        title: 'Separate Waste',
        description: 'Keep recyclable and organic waste separate.',
        score: 110,
        ecoDelta: 15,
        isEco: true,
        category: 'recycle_bin',
        consequence: 'Segregated bins turn nirmalya flowers into sacred compost!',
      },
      {
        id: 'cleanup_mix',
        title: 'Mix Everything Together',
        description: 'Toss all litter into a single landfill bin.',
        score: 20,
        ecoDelta: -10,
        isEco: false,
        category: 'mixed_trash',
        consequence: 'Mixed trash cannot be recycled and ends up overflowing landfills.',
      },
      {
        id: 'cleanup_later',
        title: 'Leave It for Later',
        description: 'Postpone cleanup until after festivities.',
        score: 40,
        ecoDelta: -5,
        isEco: false,
        category: 'scattered_trash',
        consequence: 'Delayed cleanup creates clutter and hazards for devotees.',
      },
    ],
  },
  {
    id: 'SITUATION_AFTER_FESTIVAL',
    title: 'NOTHING GOES TO WASTE',
    scenario: 'The festival is ending. What happens to reusable decorations?',
    category: 'sustainability',
    choices: [
      {
        id: 'after_store',
        title: 'Store & Reuse',
        description: 'Pack fabrics and lights safely for next year.',
        score: 110,
        ecoDelta: 15,
        isEco: true,
        category: 'storage_box',
        consequence: 'Neatly packed garlands and lights will shine brightly next year!',
      },
      {
        id: 'after_trash',
        title: 'Throw Everything Away',
        description: 'Discard festival materials directly into trash.',
        score: 20,
        ecoDelta: -10,
        isEco: false,
        category: 'dumpster',
        consequence: 'Valuable materials are lost forever in city waste dumps.',
      },
      {
        id: 'after_donate',
        title: 'Donate Usable Decorations',
        description: 'Share decor with community groups and neighbors.',
        score: 110,
        ecoDelta: 15,
        isEco: true,
        category: 'donation_gift',
        consequence: 'Shared decorations bring joy to neighboring community pandals!',
      },
    ],
  },
  {
    id: 'SITUATION_RESPONSIBLE_CELEBRATION',
    title: 'THE FINAL CHOICE',
    scenario: 'How should we finish our celebration?',
    category: 'community',
    choices: [
      {
        id: 'finish_clean',
        title: 'Clean Celebration',
        description: 'Leave the celebration space clean and ready for everyone.',
        score: 120,
        ecoDelta: 15,
        isEco: true,
        category: 'clean_mandap',
        consequence: 'The sacred courtyard remains spotless, serene, and blessed!',
      },
      {
        id: 'finish_untidy',
        title: 'Leave the Space Untidy',
        description: 'Walk away leaving leftover debris behind.',
        score: 20,
        ecoDelta: -10,
        isEco: false,
        category: 'untidy_ground',
        consequence: 'Leftover debris diminishes the sanctity of the celebration space.',
      },
      {
        id: 'finish_community',
        title: 'Organize a Community Cleanup',
        description: 'Unite with family and friends to restore the mandap.',
        score: 120,
        ecoDelta: 15,
        isEco: true,
        category: 'community_hands',
        consequence: 'The community gathers in unity, leaving the venue pristine!',
      },
    ],
  },
];

export const ECO_SETTINGS = {
  STAGE_TIME: 60,
  INITIAL_ECO_SPIRIT: 50,
  MIN_ECO_SPIRIT: 0,
  MAX_ECO_SPIRIT: 100,
  PER_CHOICE_ECO_BONUS: 25,
  PERFECT_ECO_BONUS: 150,
  TIME_BONUS_MULTIPLIER: 10,
  FEEDBACK_DURATION_MS: 1000,
};

/**
 * Get the current Eco Spirit status label and theme
 */
export function getEcoStatus(spirit) {
  if (spirit >= 100) {
    return {
      label: '🌱 ECO CHAMPION',
      tier: 'champion',
      colorClass: 'text-emerald-300',
      badgeBg: 'bg-emerald-950/80 border-emerald-400/80 shadow-emerald-500/30',
      description: 'Maximum harmony with Mother Earth! Divine blessings abound.',
    };
  }
  if (spirit >= 80) {
    return {
      label: '🌿 GREEN SPIRIT',
      tier: 'green',
      colorClass: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/60 border-emerald-500/50 shadow-emerald-500/20',
      description: 'The celebration radiates vibrant natural harmony.',
    };
  }
  if (spirit >= 50) {
    return {
      label: 'BALANCED',
      tier: 'balanced',
      colorClass: 'text-amber-300',
      badgeBg: 'bg-amber-950/60 border-amber-500/40',
      description: 'Good balance! Keep choosing sustainable traditions.',
    };
  }
  return {
    label: 'NEEDS CARE',
    tier: 'needscare',
    colorClass: 'text-orange-300',
    badgeBg: 'bg-stone-900/80 border-orange-500/40',
    description: "Let's bring more Green Spirit to our holy celebration!",
  };
}

/**
 * Final performance rank for Stage 4 result screen
 */
export function getEcoRank(spirit) {
  if (spirit >= 90) {
    return {
      title: '🌱 ECO CHAMPION',
      sub: 'Guardian of pristine rivers and sacred earth',
      badgeColor: 'from-emerald-500 to-teal-600',
    };
  }
  if (spirit >= 75) {
    return {
      title: '🌿 GREEN GUARDIAN',
      sub: 'Thoughtful steward of sustainable festivities',
      badgeColor: 'from-emerald-600 to-green-700',
    };
  }
  if (spirit >= 50) {
    return {
      title: '🌼 FESTIVAL FRIEND',
      sub: 'Respectful celebrant supporting clean traditions',
      badgeColor: 'from-amber-500 to-yellow-600',
    };
  }
  return {
    title: '🌿 ECO APPRENTICE',
    sub: 'Learning conscious festive choices with devotion',
    badgeColor: 'from-stone-600 to-amber-700',
  };
}

/**
 * Calculate combo multiplier:
 * 1-2: 1x
 * 3-4: 2x
 * 5+: 3x
 */
export function getComboMultiplier(combo) {
  if (combo >= 5) return 3;
  if (combo >= 3) return 2;
  return 1;
}

/**
 * Fisher-Yates array shuffler
 */
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Returns a cloned, randomized copy of situations with randomized choices.
 * Logical properties remain tightly bound to each choice.
 */
export function getShuffledSituations() {
  const cloned = SITUATIONS.map((situation) => ({
    ...situation,
    choices: shuffleArray(situation.choices),
  }));
  return shuffleArray(cloned);
}
