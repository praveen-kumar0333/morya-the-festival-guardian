# MORYA: The Festival Guardian

> *"Build the celebration. Protect the spirit. Make Morya shine."*

**Team:** Morya Makers  
**Live Demo:** [Live Demo — Coming Soon]

---

## Overview

**MORYA: The Festival Guardian** is a rich, cultural web game celebrating the spirit, traditions, and eco-consciousness of Ganesh Chaturthi. Players take on the sacred mantle of the Festival Guardian, orchestrating the preparation of the pandal, creating intricate sacred rangolis, guiding Lord Ganesha’s faithful vahana Mushak through falling prasad, and making sustainable choices for an earth-friendly celebration.

The journey culminates in the **Grand Morya** finale—a devotional reveal ritual where all player actions, aesthetics, and eco-conscious decisions come together to bless and illuminate Bappa’s divine abode.

---

## Core Concept & Pillars

The game balances three sacred pillars:
1. **Devotional Artistry**: Honouring time-tested Indian festive rituals, temple architecture, and vibrant kolam/rangoli patterns.
2. **Harmonious Action**: Engaging rhythm and arcade mechanics with smooth controls, satisfying combos, and devotional audio cues.
3. **Eco-Consciousness**: Promoting clay murtis, biodegradable decorations, natural colors, and community harmony over pollution and noise.

---

## Gameplay Overview

The core experience is structured into a continuous 4-stage Festival Mode, backed by dedicated Challenge Trials, a 21-item Sacred Collection, 12 Achievements, and a persistent Festival Journey.

### The Four Festival Stages

1. **Stage 1 — Pandal Build (🛕)**
   - **Theme**: Sacred Mandap Preparation
   - **Mechanic**: Interactive decoration placement. Players adorn the festive pavilion with sacred torans, floral marigold garlands, brass hanging bells, illuminated oil diyas, and royal side pillars.
   - **Scoring**: Placement points, finish bonuses, and completion speed rewards.

2. **Stage 2 — Rangoli Rush (🎨)**
   - **Theme**: Sacred Geometry & Symmetry
   - **Mechanic**: Pattern memorization and recreation across 3 progressively challenging rounds (3×3 to 5×5 symmetric mandalas). Players study the auspicious design, then accurately fill colored petal powders before the timer expires.
   - **Scoring**: Accuracy percentage, round-clear multipliers, and speed bonuses.

3. **Stage 3 — Modak & Mushak (🐭)**
   - **Theme**: Prasad Gathering & Devotion
   - **Mechanic**: Lead Lord Ganesha's loyal companion Mushak across the temple courtyard. Gather freshly steamed modaks, sacred durva grass, fragrant hibiscus flowers, and rare golden modaks while dodging harmless obstacles.
   - **Fever Mechanic**: Building the devotional combo meter unleashes **Morya Fever**, accelerating rewards, granting invulnerability, and filling the screen with golden auspicious aura.
   - **Scoring**: Item values, progressive combo multipliers (up to 5×), and fever surge points.
   - **Engine**: True real-time, FPS-independent elapsed time tracking (`requestAnimationFrame`).

4. **Stage 4 — Eco Celebration (🌿)**
   - **Theme**: Sustainable Festival Stewardship
   - **Mechanic**: Face 6 critical festive scenarios (e.g., clay vs. chemical murtis, natural flower colors vs. chemical sprays, acoustic dhol-tasha vs. ear-splitting loudspeakers). Choose sustainable paths to elevate the **Eco Spirit** meter to 100%.
   - **Scoring**: Eco Spirit points, eco-decision bonuses, and time management rewards.

---

## Grand Morya Finale

Upon completing all four stages, players enter the sacred **Grand Morya** sanctuary:
- **Cinematic Reveal**: A step-by-step ceremony unveiling the pandal adornments, the glowing threshold rangoli, the prasad offerings, and the divine clay murti.
- **Custom Mandap**: Displays the player's real decorations and equipped collectibles from their journey.
- **Final Scoring & Guardian Rank**: Evaluates the cumulative score across all stages to award one of four sacred ranks:
  - 👑 **MORYA MASTER** (11,500+ pts) — *Supreme Architect of Bappa's Divine Abode*
  - 🌿 **FESTIVAL CHAMPION** (9,000–11,499 pts) — *Exemplary Guardian of Sacred Traditions*
  - 🌸 **MORYA GUARDIAN** (6,500–8,999 pts) — *Honored Protector of Festival Harmony*
  - 🌼 **FESTIVAL FRIEND** (< 6,500 pts) — *Welcomed Seeker of Sacred Joy*

---

## Challenge Mode

For guardians seeking focused mastery, Challenge Mode features 4 timed trials:
- **Pandal Blitz**: Rapidly place all 6 decorations under strict time pressure.
- **Rangoli Master**: Recreate 3 complex high-symmetry mandalas with pinpoint precision.
- **Mushak Rush**: 30-second high-intensity prasad collection frenzy.
- **Eco Guardian**: High-speed sustainable decision-making with zero margin for error.

Each trial records personal best scores and completion states independently.

---

## Festival Collection (21 Collectibles)

A collection of 21 authentic decorative adornments across 5 categories:
- **Diyas (🪔)**: Mitti Diya, Brass Samai, Akhand Jyoti, Terracotta Aarti Lamp, Temple Hanging Diya.
- **Flowers (🌺)**: Marigold Garland, Red Hibiscus, Sacred Lotus, Jasmine Champa, Rose Marigold Chhatra.
- **Pandal (🛕)**: Mango Leaf Toran, Brass Ghanti, Royal Velvet Drapes, Carved Wooden Arch, Peepal Leaf Chhatra.
- **Rangoli (🎨)**: Sacred Swastik, Lotus Mandala, Peacock Symphony, Geometric Kolam.
- **Eco (🌿)**: Biodegradable Leaf Plate, Seed Ball Modak, Upcycled Fabric Lantern.

*All items are 100% cosmetic, unlocked deterministically through gameplay, and can be customized to adorn the Grand Morya mandap.*

---

## 12 Sacred Achievements

1. **First Blessing** — Complete your first festival stage.
2. **Pandal Artist** — Complete the Pandal Build stage.
3. **Rangoli Artist** — Complete all three Rangoli Rush rounds.
4. **Mushak's Friend** — Collect at least 20 items in Modak & Mushak.
5. **Combo Master** — Reach a 10× collection combo.
6. **Eco Guardian** — Reach 100 Eco Spirit in Eco Celebration.
7. **Pandal Perfectionist** — Complete Pandal Build with all decorations placed.
8. **Rangoli Master** — Complete all Rangoli rounds with ≥90% accuracy.
9. **Morya Fever** — Activate Morya Fever mode at least once.
10. **Festival Guardian** — Complete the entire festival journey (reach Grand Morya).
11. **Morya Master** — Achieve the highest Guardian rank (11,500+ pts).
12. **Perfect Celebration** — Select eco-friendly choices in all 6 festive scenarios.

---

## Festival Journey & Personal Records

- **Festival Journey**: A progression dashboard that tracks overall festival completion across 4 pillars (Stages, Achievements, Challenges, Collection) with balanced 25% weights and deterministic next-milestone prompts.
- **Personal Records**: Tracks high scores, stage records, best combos, fever activations, and total festival journeys.

---

## Audio & Visual Atmosphere

- **Procedural Tanpura Soundscapes**: Generates an authentic meditative drone (Sa-Pa-Sa tuning with organic LFO modulation) natively using the browser’s **Web Audio API**—no external audio assets required.
- **Devotional Audio Cues**: Pleasant melodic bells, temple chimes, and celebration tones for all actions.
- **Festive Visuals**: Warm ambient lighting, gold and saffron color palette, floating flower petals, and celebratory confetti bursts.

---

## Accessibility & Responsiveness

- **Reduced Motion Support**: Fully honors `prefers-reduced-motion` across floating flower petals, confetti bursts, godray rotations, and button transitions.
- **Touch & Mobile Ergonomics**: Optimized for viewports from 320px up to 4K displays. Touch targets adhere strictly to the ≥44px accessibility baseline with `touch-action: manipulation` to eliminate mobile tap delays.
- **Color Contrast & Typography**: High-contrast typography paired with authentic display lettering (`Cinzel` and `Outfit`).

---

## Technology Stack

- **Framework**: React 19 (Functional components, hooks, Context API)
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4
- **Iconography**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Audio Engine**: Native Browser Web Audio API (procedural oscillator synthesis)
- **Persistence**: Safe Browser `localStorage` with fallback validation

---

## Getting Started Locally

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/morya-festival-guardian.git
   cd morya-festival-guardian
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

---

## Build & Quality Commands

- **Build for Production**:
  ```bash
  npm run build
  ```
  Generates production-ready static assets in the `dist/` directory.

- **Lint / Type-Check**:
  ```bash
  npm run lint
  ```
  Runs TypeScript type-checking (`tsc --noEmit`) to ensure zero type errors.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

---

## Project Structure

```text
├── index.html                  # HTML entry point with metadata
├── package.json                # Project dependencies and scripts
├── vite.config.ts              # Vite configuration
├── metadata.json               # Application metadata and capabilities
├── .gitignore                  # Git ignore rules
├── public/                     # Public assets
└── src/
    ├── main.jsx                # Application bootstrap
    ├── App.jsx                 # Screen router & ambient atmosphere
    ├── index.css               # Global styles & Tailwind configuration
    ├── constants/              # Centralized game data and configs
    │   ├── achievements.js     # 12 contest achievements & requirements
    │   ├── challengeData.js    # 4 challenge trial configurations
    │   ├── collectionData.js   # 21 festival collectible adornments
    │   ├── gameSettings.js     # Stage timers, scores, and screen IDs
    │   └── personalBest.js     # Player statistics and records schema
    ├── context/
    │   └── GameContext.jsx     # Master state, scoring, and persistence
    ├── services/
    │   └── soundManager.js     # Web Audio API procedural sound engine
    ├── utils/
    │   ├── collectionUnlocks.js# Deterministic collection unlock logic
    │   └── storage.js          # Safe localStorage wrappers
    ├── components/
    │   ├── common/             # Badges, counters, toasts, icons
    │   ├── festive/            # Ambient petals, garlands, confetti
    │   ├── finale/             # Grand Morya ceremony and rank badges
    │   ├── games/
    │   │   ├── pandal/         # Stage 1: Pandal Build
    │   │   ├── rangoli/        # Stage 2: Rangoli Rush
    │   │   ├── mushak/         # Stage 3: Modak & Mushak (timer protected)
    │   │   └── eco/            # Stage 4: Eco Celebration
    │   ├── challenge/          # 4 Challenge mode trials
    │   ├── modals/             # Settings, How to Play, Credits
    │   ├── screens/            # MainMenu component
    │   └── ui/                 # FestiveButton, FestiveCard
    └── screens/
        ├── AchievementsScreen.jsx       # 12 Achievements showcase
        ├── ChallengeModeScreen.jsx      # Challenge selection & hub
        ├── FestivalCollectionScreen.jsx # 21 Collectibles showcase
        ├── FestivalJourneyScreen.jsx    # 4-Pillar progression dashboard
        └── PersonalBestScreen.jsx       # Personal records and high score
```

---

## Credits

- **Concept & Development**: Team Morya Makers
- **Traditional Inspiration**: Sacred Ganesh Chaturthi festive traditions of Maharashtra and India
- **Dedication**: In reverence to Lord Ganesha, the Remover of Obstacles and Lord of Beginnings.

*Ganpati Bappa Morya! Mangal Murti Morya!*
