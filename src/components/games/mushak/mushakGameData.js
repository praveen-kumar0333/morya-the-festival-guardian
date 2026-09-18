/**
 * Modak & Mushak - Game Configuration & Item Definitions
 * Stage 3 of Morya: The Festival Guardian
 *
 * Cultural authenticity:
 * Modak - Lord Ganesha's favorite sweet prasad (steamed rice flour dumpling with coconut & jaggery)
 * Durva - Auspicious 3-blade holy grass offering
 * Red Hibiscus / Marigold - Sacred flowers offered during Ganesh Chaturthi
 * Golden Modak - Rare divine prasad offering
 */

export const ITEM_TYPES = {
  MODAK: {
    id: 'MODAK',
    name: 'Steamed Modak',
    points: 100,
    feverGain: 15, // percent
    weight: 45, // spawn weight
    speedY: 2.2,
    size: 44,
    glowColor: 'rgba(251, 191, 36, 0.7)',
    label: 'Modak',
    ariaLabel: 'Steamed Modak prasad (+100 points)',
  },
  FLOWER: {
    id: 'FLOWER',
    name: 'Hibiscus Flower',
    points: 50,
    feverGain: 10,
    weight: 30,
    speedY: 1.8,
    size: 40,
    glowColor: 'rgba(244, 63, 94, 0.7)',
    label: 'Flower',
    ariaLabel: 'Sacred red flower (+50 points)',
  },
  DURVA: {
    id: 'DURVA',
    name: 'Durva Grass',
    points: 75,
    feverGain: 12,
    weight: 20,
    speedY: 2.0,
    size: 40,
    glowColor: 'rgba(16, 185, 129, 0.7)',
    label: 'Durva',
    ariaLabel: 'Holy Durva grass bundle (+75 points)',
  },
  GOLDEN_MODAK: {
    id: 'GOLDEN_MODAK',
    name: 'Golden Modak',
    points: 300,
    feverGain: 25,
    weight: 5, // rare normally, elevated during fever
    speedY: 2.5,
    size: 48,
    glowColor: 'rgba(250, 204, 21, 0.9)',
    label: 'Golden Modak',
    ariaLabel: 'Divine Golden Modak (+300 points)',
  },
};

export const OBSTACLE_TYPES = {
  FLOWER_BASKET: {
    id: 'FLOWER_BASKET',
    name: 'Flower Basket',
    penalty: 25,
    feverLoss: 15,
    size: 46,
    speedY: 2.4,
    label: 'Spilled Basket',
    ariaLabel: 'Decorative flower basket obstacle',
  },
  WATER_POT: {
    id: 'WATER_POT',
    name: 'Brass Water Lota',
    penalty: 25,
    feverLoss: 15,
    size: 44,
    speedY: 2.6,
    label: 'Water Pot',
    ariaLabel: 'Spilled water pot obstacle',
  },
  PUJA_BOX: {
    id: 'PUJA_BOX',
    name: 'Festival Box',
    penalty: 20,
    feverLoss: 12,
    size: 42,
    speedY: 2.3,
    label: 'Puja Box',
    ariaLabel: 'Festival wooden box obstacle',
  },
};

export const GAME_SETTINGS = {
  STAGE_TIME: 60, // seconds
  FEVER_DURATION: 7, // seconds
  FEVER_MULTIPLIER: 2,
  MUSHAK_SPEED: 7.5, // movement units per frame
  WORLD_WIDTH: 800, // logical width
  WORLD_HEIGHT: 500, // logical height
  GROUND_Y: 420, // baseline for Mushak
  COLLISION_RADIUS: 38, // bounding distance
  MAX_ACTIVE_ITEMS: 9, // performance limit
  MAX_ACTIVE_OBSTACLES: 3,
};

/**
 * Weighted random item picker
 */
export function getRandomCollectibleType(isFever = false) {
  const items = Object.values(ITEM_TYPES);
  const weights = items.map((item) => {
    if (item.id === 'GOLDEN_MODAK') {
      return isFever ? 30 : item.weight; // substantially higher during Fever
    }
    return item.weight;
  });

  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    if (random < weights[i]) {
      return items[i];
    }
    random -= weights[i];
  }
  return items[0];
}

/**
 * Random obstacle picker
 */
export function getRandomObstacleType() {
  const obstacles = Object.values(OBSTACLE_TYPES);
  const idx = Math.floor(Math.random() * obstacles.length);
  return obstacles[idx];
}
