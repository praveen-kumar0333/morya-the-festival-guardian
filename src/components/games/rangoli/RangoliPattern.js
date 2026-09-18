/**
 * Rangoli Rush - Pattern & Color Architecture
 * Stage 2 of Morya: The Festival Guardian
 *
 * Implements deterministic sacred symmetry pattern generation
 * and culturally authentic powder color definitions.
 */

// Auspicious Rangoli Powder Palette with Distinctive Glyphs for Accessibility
export const POWDER_COLORS = {
  empty: {
    id: 'empty',
    name: 'Empty',
    label: 'Terracotta Floor',
    colorHex: '#3d1a0e',
    glowColor: 'rgba(217, 119, 6, 0.2)',
    bgGradient: 'from-[#2b1208] to-[#1a0a04]',
    borderClass: 'border-amber-900/40',
    textClass: 'text-amber-500/40',
    description: 'Empty courtyard floor dot',
  },
  marigold: {
    id: 'marigold',
    name: 'Marigold',
    label: 'Marigold Orange',
    key: '1',
    colorHex: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    bgGradient: 'from-amber-500 to-orange-600',
    borderClass: 'border-orange-400',
    textClass: 'text-amber-100',
    description: 'Sacred vibrant marigold powder',
  },
  saffron: {
    id: 'saffron',
    name: 'Saffron',
    label: 'Surya Saffron',
    key: '2',
    colorHex: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    bgGradient: 'from-yellow-400 to-amber-500',
    borderClass: 'border-yellow-300',
    textClass: 'text-amber-950',
    description: 'Golden auspicious turmeric and saffron',
  },
  lotus: {
    id: 'lotus',
    name: 'Lotus',
    label: 'Gulabi Lotus',
    key: '3',
    colorHex: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.6)',
    bgGradient: 'from-pink-500 to-rose-600',
    borderClass: 'border-rose-300',
    textClass: 'text-rose-100',
    description: 'Sacred pink lotus petal powder',
  },
  leaf: {
    id: 'leaf',
    name: 'Leaf',
    label: 'Bel Leaf Green',
    key: '4',
    colorHex: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.6)',
    bgGradient: 'from-emerald-400 to-teal-700',
    borderClass: 'border-emerald-300',
    textClass: 'text-emerald-100',
    description: 'Fresh holy durva and mango leaf green',
  },
  diya: {
    id: 'diya',
    name: 'Diya Gold',
    label: 'Suvarna Diya',
    key: '5',
    colorHex: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.8)',
    bgGradient: 'from-yellow-200 via-amber-300 to-yellow-500',
    borderClass: 'border-yellow-200',
    textClass: 'text-stone-950',
    description: 'Pure radiant brass lamp gold',
  },
};

// 3 Progressive Rounds Configuration
export const ROUNDS_CONFIG = [
  {
    roundNumber: 1,
    size: 3, // 3x3 = 9 cells
    title: 'Round 1: Sacred Lotus Mandala',
    subtitle: 'Observe the 3x3 floral pattern',
    previewTime: 4.5, // seconds
    colors: ['marigold', 'lotus', 'leaf'],
    basePoints: 450,
  },
  {
    roundNumber: 2,
    size: 4, // 4x4 = 16 cells
    title: 'Round 2: Auspicious Quadrant Kolam',
    subtitle: 'Observe the 4x4 symmetric geometry',
    previewTime: 4.0, // seconds
    colors: ['marigold', 'saffron', 'lotus', 'leaf'],
    basePoints: 800,
  },
  {
    roundNumber: 3,
    size: 5, // 5x5 = 25 cells
    title: 'Round 3: Grand Festival Star Mandala',
    subtitle: 'Observe the 5x5 sacred festive design',
    previewTime: 3.5, // seconds
    colors: ['diya', 'saffron', 'lotus', 'leaf', 'marigold'],
    basePoints: 1250,
  },
];

/**
 * Generate a sacred, beautiful, symmetrical rangoli pattern deterministically
 * for a given round and optional game session seed.
 * 
 * Symmetries used:
 * - 3x3: Central focal point with 4-way cardinal petal symmetry and corner leaves/dots.
 * - 4x4: 4-quadrant rotational mirror symmetry (auspicious geometric kolam).
 * - 5x5: Concentric radial star symmetry with central bindu, middle petal ring, and outer accents.
 */
export function generateRangoliPattern(roundNumber, sessionSeed = 1) {
  const round = ROUNDS_CONFIG[roundNumber - 1] || ROUNDS_CONFIG[0];
  const size = round.size;
  const colors = round.colors;
  const totalCells = size * size;
  const grid = new Array(totalCells).fill('empty');

  // Helper index converter
  const idx = (r, c) => r * size + c;

  // Pattern variations based on sessionSeed modulo
  const variant = Math.abs(sessionSeed) % 3;

  if (size === 3) {
    // 3x3 Radial Symmetry
    // Center cell (1, 1)
    const centerColor = colors[(variant + 1) % colors.length];
    grid[idx(1, 1)] = centerColor;

    // Cross petals: (0,1), (1,0), (1,2), (2,1)
    const petalColor = colors[variant % colors.length];
    grid[idx(0, 1)] = petalColor;
    grid[idx(1, 0)] = petalColor;
    grid[idx(1, 2)] = petalColor;
    grid[idx(2, 1)] = petalColor;

    // Corners: (0,0), (0,2), (2,0), (2,2)
    const cornerColor = variant === 2 ? 'empty' : colors[(variant + 2) % colors.length];
    grid[idx(0, 0)] = cornerColor;
    grid[idx(0, 2)] = cornerColor;
    grid[idx(2, 0)] = cornerColor;
    grid[idx(2, 2)] = cornerColor;
  } else if (size === 4) {
    // 4x4 4-Quadrant Symmetrical Kolam
    const c1 = colors[variant % colors.length];
    const c2 = colors[(variant + 1) % colors.length];
    const c3 = colors[(variant + 2) % colors.length];

    // Inner 2x2 core
    grid[idx(1, 1)] = c1;
    grid[idx(1, 2)] = c1;
    grid[idx(2, 1)] = c1;
    grid[idx(2, 2)] = c1;

    // Edges
    grid[idx(0, 1)] = c2;
    grid[idx(0, 2)] = c2;
    grid[idx(3, 1)] = c2;
    grid[idx(3, 2)] = c2;
    grid[idx(1, 0)] = c2;
    grid[idx(2, 0)] = c2;
    grid[idx(1, 3)] = c2;
    grid[idx(2, 3)] = c2;

    // Corners
    const cornerColor = variant === 1 ? 'empty' : c3;
    grid[idx(0, 0)] = cornerColor;
    grid[idx(0, 3)] = cornerColor;
    grid[idx(3, 0)] = cornerColor;
    grid[idx(3, 3)] = cornerColor;
  } else if (size === 5) {
    // 5x5 Concentric Star Mandala
    const cCenter = colors[0]; // Diya or prime color
    const cRing1 = colors[1 % colors.length];
    const cRing2 = colors[2 % colors.length];
    const cOuter = colors[3 % colors.length];

    // Center bindu (2, 2)
    grid[idx(2, 2)] = cCenter;

    // Inner cross (1,2), (3,2), (2,1), (2,3)
    grid[idx(1, 2)] = cRing1;
    grid[idx(3, 2)] = cRing1;
    grid[idx(2, 1)] = cRing1;
    grid[idx(2, 3)] = cRing1;

    // Inner diagonals (1,1), (1,3), (3,1), (3,3)
    grid[idx(1, 1)] = cRing2;
    grid[idx(1, 3)] = cRing2;
    grid[idx(3, 1)] = cRing2;
    grid[idx(3, 3)] = cRing2;

    // Outer cardinal points (0,2), (4,2), (2,0), (2,4)
    grid[idx(0, 2)] = cOuter;
    grid[idx(4, 2)] = cOuter;
    grid[idx(2, 0)] = cOuter;
    grid[idx(2, 4)] = cOuter;

    // Subtle edge accents
    const edgeAccent = variant === 0 ? cRing1 : 'empty';
    grid[idx(0, 1)] = edgeAccent;
    grid[idx(0, 3)] = edgeAccent;
    grid[idx(4, 1)] = edgeAccent;
    grid[idx(4, 3)] = edgeAccent;
    grid[idx(1, 0)] = edgeAccent;
    grid[idx(3, 0)] = edgeAccent;
    grid[idx(1, 4)] = edgeAccent;
    grid[idx(3, 4)] = edgeAccent;

    // Corners are sacred empty dots for traditional powder contrast
    grid[idx(0, 0)] = 'empty';
    grid[idx(0, 4)] = 'empty';
    grid[idx(4, 0)] = 'empty';
    grid[idx(4, 4)] = 'empty';
  }

  return grid;
}

/**
 * Compare player grid against target grid.
 * Returns detailed accuracy metrics for scoring.
 */
export function evaluateRangoliSubmission(playerGrid, targetGrid) {
  if (!playerGrid || !targetGrid || playerGrid.length !== targetGrid.length) {
    return {
      correctCount: 0,
      incorrectCount: targetGrid ? targetGrid.length : 0,
      totalCells: targetGrid ? targetGrid.length : 0,
      accuracy: 0,
      isPerfect: false,
      cellDetails: [],
    };
  }

  let correctCount = 0;
  const cellDetails = [];

  for (let i = 0; i < targetGrid.length; i++) {
    const isMatch = playerGrid[i] === targetGrid[i];
    if (isMatch) correctCount++;
    cellDetails.push({
      index: i,
      playerColor: playerGrid[i],
      targetColor: targetGrid[i],
      isCorrect: isMatch,
    });
  }

  const totalCells = targetGrid.length;
  const accuracy = Math.round((correctCount / totalCells) * 100);
  const isPerfect = correctCount === totalCells;

  return {
    correctCount,
    incorrectCount: totalCells - correctCount,
    totalCells,
    accuracy,
    isPerfect,
    cellDetails,
  };
}
