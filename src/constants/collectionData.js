/**
 * MORYA: THE FESTIVAL GUARDIAN
 * Festival Collection & Unlockables Data
 * Team: Morya Makers
 * 
 * Centralized registry of all collectible festival adornments.
 * Organized into 5 sacred categories:
 * - Diyas (🪔)
 * - Flowers (🌺)
 * - Pandal Decorations (🛕)
 * - Rangoli (🎨)
 * - Eco Decorations (🌿)
 * 
 * Rewards are 100% deterministic, visual-only, and provide NO gameplay advantages.
 */

export const COLLECTION_STORAGE_KEY = 'morya_festival_collection';

export const COLLECTION_CATEGORIES = {
  ALL: 'all',
  DIYAS: 'diyas',
  FLOWERS: 'flowers',
  PANDAL: 'pandal',
  RANGOLI: 'rangoli',
  ECO: 'eco',
};

export const CATEGORY_INFO = {
  [COLLECTION_CATEGORIES.DIYAS]: {
    id: COLLECTION_CATEGORIES.DIYAS,
    label: 'Diyas',
    emoji: '🪔',
    description: 'Sacred brass and clay lamps radiating warm auspicious glow.',
  },
  [COLLECTION_CATEGORIES.FLOWERS]: {
    id: COLLECTION_CATEGORIES.FLOWERS,
    label: 'Flowers',
    emoji: '🌺',
    description: 'Fresh temple garlands, blooming lotuses, and fragrant blossoms.',
  },
  [COLLECTION_CATEGORIES.PANDAL]: {
    id: COLLECTION_CATEGORIES.PANDAL,
    label: 'Pandal',
    emoji: '🛕',
    description: 'Grand mandap arches, royal torans, and chiming brass bells.',
  },
  [COLLECTION_CATEGORIES.RANGOLI]: {
    id: COLLECTION_CATEGORIES.RANGOLI,
    label: 'Rangoli',
    emoji: '🎨',
    description: 'Auspicious sacred threshold mandalas and colorful motifs.',
  },
  [COLLECTION_CATEGORIES.ECO]: {
    id: COLLECTION_CATEGORIES.ECO,
    label: 'Eco',
    emoji: '🌿',
    description: 'Earth-friendly handcrafted bamboo, clay, and biodegradable decor.',
  },
};

export const RARITY_CONFIG = {
  Common: {
    label: 'Common',
    color: 'from-amber-700/80 to-stone-800/90',
    border: 'border-amber-600/40',
    badge: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
    text: 'text-amber-300',
    glow: 'shadow-amber-950/40',
  },
  Rare: {
    label: 'Rare',
    color: 'from-blue-900/80 via-indigo-950/80 to-stone-900/90',
    border: 'border-cyan-400/50',
    badge: 'bg-cyan-950/70 text-cyan-200 border-cyan-400/50',
    text: 'text-cyan-300',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)]',
  },
  Epic: {
    label: 'Epic',
    color: 'from-purple-900/80 via-fuchsia-950/80 to-stone-900/90',
    border: 'border-fuchsia-400/60',
    badge: 'bg-purple-950/80 text-fuchsia-200 border-fuchsia-400/50',
    text: 'text-fuchsia-300',
    glow: 'shadow-[0_0_20px_rgba(217,70,239,0.3)]',
  },
  Legendary: {
    label: 'Legendary',
    color: 'from-amber-600/90 via-yellow-600/80 to-orange-700/90',
    border: 'border-yellow-300/80',
    badge: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black border-yellow-200',
    text: 'text-yellow-300',
    glow: 'shadow-[0_0_25px_rgba(250,204,21,0.45)]',
  },
};

/**
 * 21 Deterministic Collectibles across 5 categories
 */
export const FESTIVAL_COLLECTION_ITEMS = [
  // ==========================================
  // 1. DIYAS (4 items)
  // ==========================================
  {
    id: 'basic_diya',
    name: 'Terracotta Clay Diya',
    category: COLLECTION_CATEGORIES.DIYAS,
    rarity: 'Common',
    emoji: '🪔',
    description: 'Traditional handcrafted earthen clay lamp with sacred mustard oil and bright cotton wick.',
    unlockRequirement: 'Unlocked by default at the start of your festival journey.',
    defaultUnlocked: true,
    condition: { type: 'default' },
    visualTheme: {
      flameColor: '#F59E0B',
      accentColor: '#D97706',
      particleEffect: 'soft_embers',
    },
  },
  {
    id: 'lotus_diya',
    name: 'Lotus Brass Diya',
    category: COLLECTION_CATEGORIES.DIYAS,
    rarity: 'Rare',
    emoji: '🪷',
    description: 'Elegantly carved brass lamp shaped like an auspicious blooming pink water lotus.',
    unlockRequirement: 'Reach 5,000 total score across any festival journey.',
    defaultUnlocked: false,
    condition: { type: 'score', target: 5000 },
    visualTheme: {
      flameColor: '#FB7185',
      accentColor: '#E11D48',
      particleEffect: 'lotus_sparkles',
    },
  },
  {
    id: 'star_diya',
    name: 'Star Devotion Diya',
    category: COLLECTION_CATEGORIES.DIYAS,
    rarity: 'Epic',
    emoji: '⭐',
    description: 'Radiant five-pointed star lamp casting warm starry rays around the sacred altar.',
    unlockRequirement: 'Reach a 10× collection combo in Modak & Mushak (Combo Master).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'COMBO_MASTER' },
    visualTheme: {
      flameColor: '#FBBF24',
      accentColor: '#F59E0B',
      particleEffect: 'golden_stars',
    },
  },
  {
    id: 'golden_diya',
    name: 'Golden Pancha-Aarti Diya',
    category: COLLECTION_CATEGORIES.DIYAS,
    rarity: 'Legendary',
    emoji: '👑',
    description: 'Magnificent 24-karat gold five-flame Aarti lamp with eternal divine luminescence.',
    unlockRequirement: 'Achieve the highest Guardian rank (11,500+ pts / Morya Master).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'MORYA_MASTER' },
    visualTheme: {
      flameColor: '#FDE047',
      accentColor: '#D97706',
      particleEffect: 'divine_radiance',
    },
  },

  // ==========================================
  // 2. FLOWERS (4 items)
  // ==========================================
  {
    id: 'marigold_garland',
    name: 'Marigold Garland',
    category: COLLECTION_CATEGORIES.FLOWERS,
    rarity: 'Common',
    emoji: '🌼',
    description: 'Sun-drenched saffron and yellow marigolds strung with fragrant holy tulsi leaves.',
    unlockRequirement: 'Unlocked by default at the start of your festival journey.',
    defaultUnlocked: true,
    condition: { type: 'default' },
    visualTheme: {
      primaryColor: '#F59E0B',
      secondaryColor: '#EF4444',
      accent: 'marigold',
    },
  },
  {
    id: 'lotus_flowers',
    name: 'Sacred Pink Lotuses',
    category: COLLECTION_CATEGORIES.FLOWERS,
    rarity: 'Rare',
    emoji: '🌸',
    description: 'Fresh divine pink lotuses gathered at sunrise from sacred temple waters.',
    unlockRequirement: 'Complete your first festival stage (First Blessing).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'FIRST_BLESSING' },
    visualTheme: {
      primaryColor: '#F472B6',
      secondaryColor: '#BE185D',
      accent: 'lotus',
    },
  },
  {
    id: 'rose_garland',
    name: 'Damask Rose Garland',
    category: COLLECTION_CATEGORIES.FLOWERS,
    rarity: 'Rare',
    emoji: '🌹',
    description: 'Fragrant crimson Indian roses interwoven with sweet white night-blooming jasmine.',
    unlockRequirement: 'Activate Morya Fever at least once in Modak & Mushak (Morya Fever).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'FEVER_GUARDIAN' },
    visualTheme: {
      primaryColor: '#DC2626',
      secondaryColor: '#FEF08A',
      accent: 'rose',
    },
  },
  {
    id: 'flower_basket',
    name: 'Mixed Floral Thali',
    category: COLLECTION_CATEGORIES.FLOWERS,
    rarity: 'Epic',
    emoji: '🧺',
    description: 'Grand woven basket laden with red hibiscus, fresh durva blades, and parijat petals.',
    unlockRequirement: 'Collect at least 20 items in Modak & Mushak (Mushak\'s Friend).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'MUSHAKS_FRIEND' },
    visualTheme: {
      primaryColor: '#E11D48',
      secondaryColor: '#10B981',
      accent: 'basket',
    },
  },

  // ==========================================
  // 3. PANDAL DECORATIONS (4 items)
  // ==========================================
  {
    id: 'simple_toran',
    name: 'Mango Leaf Toran',
    category: COLLECTION_CATEGORIES.PANDAL,
    rarity: 'Common',
    emoji: '🍃',
    description: 'Traditional green mango leaves tied with sacred red and yellow mauli threads.',
    unlockRequirement: 'Unlocked by default at the start of your festival journey.',
    defaultUnlocked: true,
    condition: { type: 'default' },
    visualTheme: {
      style: 'traditional_mango',
      accent: 'green_leaf',
    },
  },
  {
    id: 'royal_toran',
    name: 'Royal Zari Toran',
    category: COLLECTION_CATEGORIES.PANDAL,
    rarity: 'Rare',
    emoji: '🎊',
    description: 'Shimmering crimson velvet toran embroidered with golden zari threads and glass beads.',
    unlockRequirement: 'Complete the Pandal Build stage (Pandal Artist).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'PANDAL_ARTIST' },
    visualTheme: {
      style: 'royal_velvet',
      accent: 'gold_zari',
    },
  },
  {
    id: 'golden_bells',
    name: 'Chiming Temple Bells',
    category: COLLECTION_CATEGORIES.PANDAL,
    rarity: 'Epic',
    emoji: '🔔',
    description: 'Resonant sacred brass bells suspended above the mandap to welcome positive energies.',
    unlockRequirement: 'Place all 6 pandal decorations with precision (Pandal Perfectionist).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'PANDAL_PERFECT' },
    visualTheme: {
      style: 'brass_bells',
      accent: 'golden_resonance',
    },
  },
  {
    id: 'festival_arch',
    name: 'Grand Teakwood Arch',
    category: COLLECTION_CATEGORIES.PANDAL,
    rarity: 'Legendary',
    emoji: '🏛️',
    description: 'Majestic carved pavilion arch adorned with gilded dancing peacocks and lotus spires.',
    unlockRequirement: 'Complete the Pandal Blitz Challenge trial in Challenge Mode.',
    defaultUnlocked: false,
    condition: { type: 'challenge', target: 'pandalBlitz' },
    visualTheme: {
      style: 'carved_arch',
      accent: 'peacock_spires',
    },
  },

  // ==========================================
  // 4. RANGOLI (4 items)
  // ==========================================
  {
    id: 'basic_mandala',
    name: 'Sacred Rice Flour Rangoli',
    category: COLLECTION_CATEGORIES.RANGOLI,
    rarity: 'Common',
    emoji: '💮',
    description: 'Auspicious white rice flour geometric pattern sanctifying the doorway.',
    unlockRequirement: 'Unlocked by default at the start of your festival journey.',
    defaultUnlocked: true,
    condition: { type: 'default' },
    visualTheme: {
      pattern: 'white_sacred',
      glowColor: '#FEF3C7',
    },
  },
  {
    id: 'peacock_rangoli',
    name: 'Regal Peacock Kolam',
    category: COLLECTION_CATEGORIES.RANGOLI,
    rarity: 'Rare',
    emoji: '🦚',
    description: 'Vibrant turquoise, indigo, and emerald peacock motif celebrating rain and renewal.',
    unlockRequirement: 'Complete all 3 rounds of Rangoli Rush (Rangoli Artist).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'RANGOLI_ARTIST' },
    visualTheme: {
      pattern: 'peacock_feather',
      glowColor: '#38BDF8',
    },
  },
  {
    id: 'festival_mandala',
    name: 'Concentric Sun Mandala',
    category: COLLECTION_CATEGORIES.RANGOLI,
    rarity: 'Epic',
    emoji: '🌺',
    description: 'Radiating 12-petaled sunburst mandala dusted with pure turmeric and sindoor powders.',
    unlockRequirement: 'Finish Rangoli Rush with >=90% accuracy (Rangoli Master).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'RANGOLI_MASTER' },
    visualTheme: {
      pattern: 'sun_mandala',
      glowColor: '#F59E0B',
    },
  },
  {
    id: 'ganesha_rangoli',
    name: 'Divine Ganesha Petal Rangoli',
    category: COLLECTION_CATEGORIES.RANGOLI,
    rarity: 'Legendary',
    emoji: '✨',
    description: 'Breathtaking portrait of Lord Ganesha created purely from fresh flower petals and gold leaf.',
    unlockRequirement: 'Master the Rangoli Master Challenge in Challenge Mode.',
    defaultUnlocked: false,
    condition: { type: 'challenge', target: 'rangoliMaster' },
    visualTheme: {
      pattern: 'ganesha_floral',
      glowColor: '#FCD34D',
    },
  },

  // ==========================================
  // 5. ECO DECORATIONS (5 items)
  // ==========================================
  {
    id: 'banana_plants',
    name: 'Auspicious Banana Stems',
    category: COLLECTION_CATEGORIES.ECO,
    rarity: 'Common',
    emoji: '🌿',
    description: 'Twin natural banana trees symbolizing life, fertility, and timeless eco devotion.',
    unlockRequirement: 'Unlocked by default at the start of your festival journey.',
    defaultUnlocked: true,
    condition: { type: 'default' },
    visualTheme: {
      material: 'banana_tree',
      leafTone: 'emerald',
    },
  },
  {
    id: 'leaf_garland',
    name: 'Sacred Durva & Betel Garland',
    category: COLLECTION_CATEGORIES.ECO,
    rarity: 'Rare',
    emoji: '🌱',
    description: 'Woven garlands of 21 tender durva grass blades and auspicious green betel leaves.',
    unlockRequirement: 'Complete the Mushak Rush Challenge in Challenge Mode.',
    defaultUnlocked: false,
    condition: { type: 'challenge', target: 'mushakRush' },
    visualTheme: {
      material: 'durva_grass',
      leafTone: 'lime',
    },
  },
  {
    id: 'bamboo_decor',
    name: 'Woven Bamboo Mandap Grid',
    category: COLLECTION_CATEGORIES.ECO,
    rarity: 'Rare',
    emoji: '🎋',
    description: 'Natural sustainable bamboo trellis handcrafted by rural village artisans.',
    unlockRequirement: 'Complete the Eco Guardian Challenge trial in Challenge Mode.',
    defaultUnlocked: false,
    condition: { type: 'challenge', target: 'ecoGuardian' },
    visualTheme: {
      material: 'bamboo_craft',
      leafTone: 'amber_wood',
    },
  },
  {
    id: 'clay_pot_decor',
    name: 'Natural Clay Kalash & Pots',
    category: COLLECTION_CATEGORIES.ECO,
    rarity: 'Epic',
    emoji: '🏺',
    description: 'Terracotta water pots painted with natural limestone chuna and red geru earth.',
    unlockRequirement: 'Complete Eco Celebration with all 6 eco-friendly choices (Perfect Celebration).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'PERFECT_CELEBRATION' },
    visualTheme: {
      material: 'terracotta_kalash',
      leafTone: 'clay_earth',
    },
  },
  {
    id: 'eco_lantern',
    name: 'Handcrafted Paper Kandeel',
    category: COLLECTION_CATEGORIES.ECO,
    rarity: 'Legendary',
    emoji: '🏮',
    description: 'Solar-illuminated biodegradable handmade paper lantern radiating gentle amber warmth.',
    unlockRequirement: 'Achieve maximum 100 Eco Spirit in Stage 4 (Eco Guardian).',
    defaultUnlocked: false,
    condition: { type: 'achievement', target: 'ECO_GUARDIAN' },
    visualTheme: {
      material: 'paper_kandeel',
      leafTone: 'golden_solar',
    },
  },
];

/**
 * Default Active Selections
 */
export const DEFAULT_ACTIVE_SELECTIONS = {
  [COLLECTION_CATEGORIES.DIYAS]: 'basic_diya',
  [COLLECTION_CATEGORIES.FLOWERS]: 'marigold_garland',
  [COLLECTION_CATEGORIES.PANDAL]: 'simple_toran',
  [COLLECTION_CATEGORIES.RANGOLI]: 'basic_mandala',
  [COLLECTION_CATEGORIES.ECO]: 'banana_plants',
};

/**
 * Initial Default Unlocked IDs
 */
export const INITIAL_UNLOCKED_ITEM_IDS = FESTIVAL_COLLECTION_ITEMS.filter(
  (item) => item.defaultUnlocked
).map((item) => item.id);
