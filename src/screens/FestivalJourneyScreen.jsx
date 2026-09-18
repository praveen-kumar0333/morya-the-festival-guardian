import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  Award,
  Target,
  Gift,
  CheckCircle2,
  Lock,
  ChevronRight,
  Flame,
  Crown,
  Play,
  Volume2,
  VolumeX,
  Music,
  Compass,
  Check,
  Circle,
  ExternalLink,
} from 'lucide-react';
import { useGame } from '../context/GameContext.jsx';
import { SCREENS, STAGES } from '../constants/gameData.js';
import { ACHIEVEMENTS, TOTAL_ACHIEVEMENTS } from '../constants/achievements.js';
import { CHALLENGES, CHALLENGE_IDS } from '../constants/challengeData.js';
import { getStoredChallengeStats } from '../services/challengeStats.js';
import {
  FESTIVAL_COLLECTION_ITEMS,
  COLLECTION_CATEGORIES,
  CATEGORY_INFO,
} from '../constants/collectionData.js';
import { getGuardianRank } from '../components/finale/GuardianRank.jsx';
import FestiveButton from '../components/ui/FestiveButton.jsx';
import FestiveCard from '../components/ui/FestiveCard.jsx';
import Diya from '../components/festive/Diya.jsx';
import MarigoldGarland from '../components/festive/MarigoldGarland.jsx';
import { soundManager } from '../services/soundManager.js';

export default function FestivalJourneyScreen({ onBackToMainMenu }) {
  const {
    scores,
    highScore,
    playerStats,
    achievements,
    collectionState,
    pandalArrangement,
    rangoliResult,
    mushakResult,
    ecoResult,
    settings,
    toggleSound,
    toggleMusic,
    setCurrentScreen,
    startGame,
    goToMainMenu,
    checkCollectionUnlocks,
  } = useGame();

  // Freshly read challenge stats when viewing journey dashboard
  const [challengeStats, setChallengeStats] = useState(() => getStoredChallengeStats());

  useEffect(() => {
    try {
      setChallengeStats(getStoredChallengeStats());
      checkCollectionUnlocks?.();
    } catch (err) {
      console.warn('Could not refresh challenge stats on journey mount:', err);
    }
  }, [checkCollectionUnlocks]);

  const handleBack = () => {
    soundManager.playButton();
    if (onBackToMainMenu) {
      onBackToMainMenu();
    } else {
      goToMainMenu();
    }
  };

  const navigateTo = (screenName) => {
    soundManager.playButton();
    setCurrentScreen(screenName);
  };

  // 1. Stage Completion Evaluation (checking both current run and historical records)
  const isPandalCompleted = Boolean(
    (scores?.pandal > 0) ||
    (playerStats?.bestPandalScore > 0) ||
    (pandalArrangement?.placedItems?.length === 6) ||
    (pandalArrangement?.count === 6)
  );

  const isRangoliCompleted = Boolean(
    (scores?.rangoli > 0) ||
    (playerStats?.bestRangoliScore > 0) ||
    (rangoliResult !== null)
  );

  const isMushakCompleted = Boolean(
    (scores?.mushak > 0) ||
    (playerStats?.bestMushakScore > 0) ||
    (mushakResult !== null)
  );

  const isEcoCompleted = Boolean(
    (scores?.ecoSpirit > 0) ||
    (playerStats?.bestEcoScore > 0) ||
    (playerStats?.completedRuns > 0) ||
    (ecoResult !== null)
  );

  const stageStatuses = useMemo(() => [
    {
      id: SCREENS.PANDAL_BUILD,
      stageNum: '01',
      name: 'Pandal Build',
      tagline: 'Prepare the sacred celebration.',
      emoji: '🛕',
      isCompleted: isPandalCompleted,
      score: scores?.pandal || playerStats?.bestPandalScore || 0,
    },
    {
      id: SCREENS.RANGOLI_RUSH,
      stageNum: '02',
      name: 'Rangoli Rush',
      tagline: 'Harmonize sacred symmetry and vibrant powder petals.',
      emoji: '🎨',
      isCompleted: isRangoliCompleted,
      score: scores?.rangoli || playerStats?.bestRangoliScore || 0,
    },
    {
      id: SCREENS.MODAK_MUSHAK,
      stageNum: '03',
      name: 'Modak & Mushak',
      tagline: 'Swiftly guide Mushak to collect sweet prasad.',
      emoji: '🐭',
      isCompleted: isMushakCompleted,
      score: scores?.mushak || playerStats?.bestMushakScore || 0,
    },
    {
      id: SCREENS.ECO_CELEBRATION,
      stageNum: '04',
      name: 'Eco Celebration',
      tagline: 'Nurture Mother Earth with conscious festive traditions.',
      emoji: '🌿',
      isCompleted: isEcoCompleted,
      score: scores?.ecoSpirit || playerStats?.bestEcoScore || 0,
    },
  ], [
    isPandalCompleted,
    isRangoliCompleted,
    isMushakCompleted,
    isEcoCompleted,
    scores,
    playerStats,
  ]);

  const completedStagesCount = stageStatuses.filter((s) => s.isCompleted).length;
  const isGrandMoryaUnlocked = completedStagesCount === 4 || (playerStats?.completedRuns > 0);

  // 2. Achievements stats
  const unlockedAchievementsCount = Object.keys(achievements || {}).length;
  const totalAchievements = TOTAL_ACHIEVEMENTS || 12;
  const achievementPercent = Math.round((unlockedAchievementsCount / totalAchievements) * 100);

  // 3. Challenge Mode stats
  const isPandalBlitzDone = Boolean(challengeStats?.pandalBlitz?.completed);
  const isRangoliMasterDone = Boolean(challengeStats?.rangoliMaster?.completed);
  const isMushakRushDone = Boolean(challengeStats?.mushakRush?.completed);
  const isEcoGuardianDone = Boolean(challengeStats?.ecoGuardian?.completed);

  const challengesList = [
    {
      id: CHALLENGE_IDS.PANDAL_BLITZ,
      name: 'Pandal Blitz',
      emoji: '🛕',
      isCompleted: isPandalBlitzDone,
      score: challengeStats?.pandalBlitz?.bestScore || 0,
    },
    {
      id: CHALLENGE_IDS.RANGOLI_MASTER,
      name: 'Rangoli Master',
      emoji: '🎨',
      isCompleted: isRangoliMasterDone,
      score: challengeStats?.rangoliMaster?.bestScore || 0,
    },
    {
      id: CHALLENGE_IDS.MUSHAK_RUSH,
      name: 'Mushak Rush',
      emoji: '🐭',
      isCompleted: isMushakRushDone,
      score: challengeStats?.mushakRush?.bestScore || 0,
    },
    {
      id: CHALLENGE_IDS.ECO_GUARDIAN,
      name: 'Eco Guardian',
      emoji: '🌱',
      isCompleted: isEcoGuardianDone,
      score: challengeStats?.ecoGuardian?.bestScore || 0,
    },
  ];

  const completedChallengesCount = challengesList.filter((c) => c.isCompleted).length;

  // 4. Festival Collection stats
  const unlockedCollectionIds = collectionState?.unlockedItemIds || [];
  const unlockedCollectionCount = unlockedCollectionIds.length;
  const totalCollectionItems = FESTIVAL_COLLECTION_ITEMS.length; // 21
  const collectionPercent = Math.round((unlockedCollectionCount / totalCollectionItems) * 100);

  // 5. Overall Completion Percentage Calculation
  // Balanced 25% weight per pillar
  const overallPercentage = Math.round(
    ((completedStagesCount / 4) * 25) +
    (Math.min(1, unlockedAchievementsCount / totalAchievements) * 25) +
    (Math.min(1, completedChallengesCount / 4) * 25) +
    (Math.min(1, unlockedCollectionCount / totalCollectionItems) * 25)
  );

  // 6. Next Milestone Deterministic Identification
  const nextMilestone = useMemo(() => {
    // Priority 1: Incomplete Festival Stages
    if (completedStagesCount < 4) {
      if (!isPandalCompleted) {
        return {
          title: 'Complete Stage 1: Pandal Build',
          subtitle: 'Adorn the sacred mandap to welcome Lord Ganesha.',
          category: 'Festival Mode',
          emoji: '🛕',
          actionText: 'Play Festival',
          action: () => {
            soundManager.playButton();
            startGame();
          },
        };
      }
      if (!isRangoliCompleted) {
        return {
          title: 'Complete Stage 2: Rangoli Rush',
          subtitle: 'Harmonize sacred symmetry and vibrant powder petals.',
          category: 'Festival Mode',
          emoji: '🎨',
          actionText: 'Play Festival',
          action: () => {
            soundManager.playButton();
            startGame();
          },
        };
      }
      if (!isMushakCompleted) {
        return {
          title: 'Complete Stage 3: Modak & Mushak',
          subtitle: 'Swiftly guide Mushak to collect sweet prasad.',
          category: 'Festival Mode',
          emoji: '🐭',
          actionText: 'Play Festival',
          action: () => {
            soundManager.playButton();
            startGame();
          },
        };
      }
      if (!isEcoCompleted) {
        return {
          title: 'Complete Stage 4: Eco Celebration',
          subtitle: 'Nurture Mother Earth with conscious festive traditions.',
          category: 'Festival Mode',
          emoji: '🌿',
          actionText: 'Play Festival',
          action: () => {
            soundManager.playButton();
            startGame();
          },
        };
      }
    }

    // Priority 2: Incomplete Achievements
    if (unlockedAchievementsCount < totalAchievements) {
      const nextAch = ACHIEVEMENTS.find((a) => !achievements?.[a.id]);
      if (nextAch) {
        return {
          title: `Unlock: ${nextAch.title}`,
          subtitle: nextAch.requirement || nextAch.description,
          category: `Achievement (${unlockedAchievementsCount}/${totalAchievements})`,
          emoji: nextAch.icon || '🏆',
          actionText: 'View Achievements',
          action: () => navigateTo(SCREENS.ACHIEVEMENTS),
        };
      }
    }

    // Priority 3: Incomplete Challenges
    if (completedChallengesCount < 4) {
      let uncompletedChallenge = null;
      if (!isPandalBlitzDone) uncompletedChallenge = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.PANDAL_BLITZ);
      else if (!isRangoliMasterDone) uncompletedChallenge = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.RANGOLI_MASTER);
      else if (!isMushakRushDone) uncompletedChallenge = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.MUSHAK_RUSH);
      else if (!isEcoGuardianDone) uncompletedChallenge = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.ECO_GUARDIAN);

      if (uncompletedChallenge) {
        return {
          title: `Conquer: ${uncompletedChallenge.title}`,
          subtitle: uncompletedChallenge.objective || uncompletedChallenge.subtitle,
          category: `Challenge Trial (${completedChallengesCount}/4)`,
          emoji: uncompletedChallenge.emoji || '⚡',
          actionText: 'Enter Challenge Mode',
          action: () => navigateTo(SCREENS.CHALLENGE_MODE),
        };
      }
    }

    // Priority 4: Incomplete Collection
    if (unlockedCollectionCount < totalCollectionItems) {
      const unlockedSet = new Set(unlockedCollectionIds);
      const nextItem = FESTIVAL_COLLECTION_ITEMS.find((item) => !unlockedSet.has(item.id));
      if (nextItem) {
        return {
          title: `Discover: ${nextItem.name}`,
          subtitle: nextItem.unlockRequirement || nextItem.description,
          category: `Festival Collection (${unlockedCollectionCount}/${totalCollectionItems})`,
          emoji: nextItem.emoji || '🎁',
          actionText: 'View Collection',
          action: () => navigateTo(SCREENS.FESTIVAL_COLLECTION),
        };
      }
    }

    // Priority 5: 100% Completion
    return {
      title: '🌟 FESTIVAL MASTER',
      subtitle: 'You have completed every stage, conquered every trial, and unlocked every sacred festival treasure! Bappa shines with eternal radiance.',
      category: 'Festival Mastery Complete',
      emoji: '👑',
      actionText: 'Visit Grand Morya',
      action: () => navigateTo(SCREENS.GRAND_MORYA),
    };
  }, [
    completedStagesCount,
    isPandalCompleted,
    isRangoliCompleted,
    isMushakCompleted,
    isEcoCompleted,
    unlockedAchievementsCount,
    totalAchievements,
    achievements,
    completedChallengesCount,
    isPandalBlitzDone,
    isRangoliMasterDone,
    isMushakRushDone,
    isEcoGuardianDone,
    unlockedCollectionCount,
    totalCollectionItems,
    unlockedCollectionIds,
  ]);

  // Guardian Rank resolution
  const guardianRank = useMemo(() => {
    if (playerStats?.bestGuardianRank?.name) {
      return playerStats.bestGuardianRank;
    }
    if (highScore > 0) {
      return getGuardianRank(highScore);
    }
    return {
      name: 'Festival Devotee',
      badge: '🌼 DEVOTEE',
      level: 1,
    };
  }, [playerStats, highScore]);

  return (
    <main
      id="festival-journey-screen"
      className="w-full flex-1 flex flex-col items-center px-4 py-4 sm:py-6 relative z-10 max-w-5xl mx-auto min-h-[92vh]"
    >
      {/* Top Auspicious Garland */}
      <MarigoldGarland className="my-1 max-w-2xl" />

      {/* Top Navigation Bar */}
      <div className="w-full flex items-center justify-between gap-3 pt-2 pb-4">
        <FestiveButton
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={handleBack}
          id="journey-back-btn"
        >
          Main Menu
        </FestiveButton>

        {/* Header Audio Quick Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-colors"
            title={settings.soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            aria-label="Toggle Sound"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-amber-500/50" />
            )}
          </button>

          <button
            onClick={toggleMusic}
            className="p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-colors"
            title={settings.musicEnabled ? 'Stop Ambient Music' : 'Start Ambient Music'}
            aria-label="Toggle Music"
          >
            <Music
              className={`w-4 h-4 ${settings.musicEnabled ? 'text-amber-400' : 'text-amber-500/50'}`}
            />
          </button>
        </div>
      </div>

      {/* Title & Devotional Header */}
      <div className="w-full max-w-2xl text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Diya size={34} />
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400/90 block">
              Player Progression Dashboard
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400 drop-shadow-sm">
              🪔 Festival Journey
            </h1>
          </div>
          <Diya size={34} />
        </div>
        <p className="text-sm sm:text-base text-amber-200/90 font-medium italic">
          “Every step brings the celebration closer to Morya.”
        </p>
      </div>

      {/* SECTION: Overall Progress Overview */}
      <section
        id="overall-progress-card"
        className="w-full mb-6"
        aria-label="Overall Festival Progress"
      >
        <div className="relative rounded-2xl bg-gradient-to-b from-amber-950/90 via-amber-950/70 to-stone-950/90 border border-amber-500/40 p-5 sm:p-6 shadow-xl shadow-black/50 backdrop-blur-md">
          {/* Decorative Corner Accents */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400/50 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400/50 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400/50 rounded-br-sm pointer-events-none" />

          {/* Header Row: Title & Percentage */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-amber-100">
                  Your Festival Progress
                </h2>
              </div>
              <p className="text-xs text-amber-300/80 mt-0.5">
                Balanced journey across Festival Stages, Achievements, Challenges, and Sacred Collection.
              </p>
            </div>
            <div className="flex items-baseline gap-1.5 self-start sm:self-auto px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/50">
              <span className="font-heading font-black text-2xl sm:text-3xl text-yellow-300 tracking-tight">
                {overallPercentage}%
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Complete
              </span>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div
            className="w-full bg-stone-950/80 rounded-full h-4 sm:h-5 p-1 border border-amber-500/30 overflow-hidden mb-6 relative"
            role="progressbar"
            aria-valuenow={overallPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 shadow-md shadow-amber-500/30 transition-all duration-700 ease-out"
              style={{ width: `${Math.max(4, Math.min(100, overallPercentage))}%` }}
            />
          </div>

          {/* 4 Pillar Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Pillar 1: Stages */}
            <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-lg">
                🌸
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/80">
                  Festival Stages
                </div>
                <div className="font-heading font-bold text-base sm:text-lg text-amber-100">
                  {completedStagesCount} <span className="text-xs font-normal text-amber-400/70">/ 4</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Achievements */}
            <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-lg">
                🏆
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/80">
                  Achievements
                </div>
                <div className="font-heading font-bold text-base sm:text-lg text-amber-100">
                  {unlockedAchievementsCount} <span className="text-xs font-normal text-amber-400/70">/ {totalAchievements}</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Challenges */}
            <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-lg">
                ⚡
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/80">
                  Challenges
                </div>
                <div className="font-heading font-bold text-base sm:text-lg text-amber-100">
                  {completedChallengesCount} <span className="text-xs font-normal text-amber-400/70">/ 4</span>
                </div>
              </div>
            </div>

            {/* Pillar 4: Collection */}
            <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-lg">
                🎁
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/80">
                  Collection
                </div>
                <div className="font-heading font-bold text-base sm:text-lg text-amber-100">
                  {unlockedCollectionCount} <span className="text-xs font-normal text-amber-400/70">/ {totalCollectionItems}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Next Milestone */}
      <section
        id="next-milestone-card"
        className="w-full mb-8"
        aria-label="Next Milestone"
      >
        <div className="rounded-2xl bg-gradient-to-r from-amber-900/50 via-yellow-950/40 to-amber-900/50 border border-yellow-400/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-950/30">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/30 border border-yellow-300/50 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              {nextMilestone.emoji}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Next Milestone · {nextMilestone.category}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-yellow-200">
                {nextMilestone.title}
              </h3>
              <p className="text-xs text-amber-200/80 max-w-xl">
                {nextMilestone.subtitle}
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0">
            <FestiveButton
              variant="primary"
              size="sm"
              icon={ChevronRight}
              onClick={nextMilestone.action}
              className="text-xs font-bold shadow-md"
              id="next-milestone-btn"
            >
              {nextMilestone.actionText}
            </FestiveButton>
          </div>
        </div>
      </section>

      {/* SECTION: Festival Mode Journey (Path & Stage Cards) */}
      <section
        id="festival-journey-path"
        className="w-full mb-8"
        aria-label="Festival Mode Journey Path"
      >
        <div className="mb-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-lg">🌸</span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-amber-100">
              Your Festival Journey Path
            </h2>
          </div>
          <p className="text-xs text-amber-300/80 mt-0.5">
            The four devotional stages leading to the divine abode of Grand Morya.
          </p>
        </div>

        {/* Responsive Path: Flowing Cards on Desktop, Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
          {stageStatuses.map((stage, idx) => {
            return (
              <div
                key={stage.id}
                id={`stage-card-${stage.stageNum}`}
                className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between ${
                  stage.isCompleted
                    ? 'bg-gradient-to-b from-amber-900/60 via-amber-950/80 to-stone-950/90 border-2 border-amber-400/60 shadow-lg shadow-amber-950/40'
                    : 'bg-stone-950/70 border border-stone-800/80 text-stone-400'
                }`}
              >
                {/* Top Row: Stage Number & Status Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-heading font-black text-xs tracking-wider text-amber-400/80">
                    {stage.stageNum} — STAGE
                  </span>
                  {stage.isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-[11px] font-bold text-emerald-300">
                      <Check className="w-3 h-3" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900/80 border border-stone-700/60 text-[11px] font-medium text-stone-400">
                      <Circle className="w-2.5 h-2.5 text-stone-500" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>

                {/* Stage Center: Emoji & Name */}
                <div className="my-2">
                  <div className="text-3xl mb-1.5">{stage.emoji}</div>
                  <h3
                    className={`font-heading font-bold text-base sm:text-lg leading-tight ${
                      stage.isCompleted ? 'text-amber-100' : 'text-stone-300'
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      stage.isCompleted ? 'text-amber-200/80' : 'text-stone-500'
                    }`}
                  >
                    {stage.tagline}
                  </p>
                </div>

                {/* Bottom Row: Score Record if completed */}
                <div className="pt-3 border-t border-amber-500/15 mt-3 flex items-center justify-between text-xs">
                  <span className="text-amber-400/70">Best Record:</span>
                  <span
                    className={`font-mono font-bold ${
                      stage.isCompleted ? 'text-yellow-300' : 'text-stone-500'
                    }`}
                  >
                    {stage.score > 0 ? `${stage.score.toLocaleString()} pts` : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grand Morya Special Milestone Card */}
        <div
          id="grand-morya-milestone-card"
          className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
            isGrandMoryaUnlocked
              ? 'bg-gradient-to-r from-amber-900/80 via-yellow-950/70 to-orange-950/80 border-2 border-yellow-300 shadow-xl shadow-amber-500/20'
              : 'bg-stone-950/80 border border-stone-800 text-stone-400'
          }`}
        >
          {/* Subtle Aura if unlocked */}
          {isGrandMoryaUnlocked && (
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 text-[11px] font-black uppercase tracking-wider shadow-md">
              ✨ Sacred Destination
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${
                  isGrandMoryaUnlocked
                    ? 'bg-amber-500/20 border-yellow-300/60 shadow-lg shadow-amber-500/20'
                    : 'bg-stone-900 border-stone-800'
                }`}
              >
                🛕
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-heading font-black text-xl sm:text-2xl ${
                      isGrandMoryaUnlocked ? 'text-yellow-200' : 'text-stone-300'
                    }`}
                  >
                    Grand Morya
                  </h3>
                  {isGrandMoryaUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-yellow-400/50 text-xs font-bold text-yellow-300">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-xs text-stone-400">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs sm:text-sm mt-1 italic ${
                    isGrandMoryaUnlocked ? 'text-amber-200/90' : 'text-stone-500'
                  }`}
                >
                  “The celebration comes alive.”
                </p>
                <div className="mt-1.5 text-xs">
                  {isGrandMoryaUnlocked ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>✨ GRAND MORYA UNLOCKED — Lord Ganesha’s divine sanctuary is ready.</span>
                    </span>
                  ) : (
                    <span className="text-amber-400/80 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>🔒 Complete all four stages to reach Grand Morya ({completedStagesCount}/4 completed)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action button: ONLY available when unlocked, strictly prevents bypassing progression */}
            {isGrandMoryaUnlocked ? (
              <div className="self-end sm:self-center shrink-0">
                <FestiveButton
                  variant="primary"
                  size="md"
                  icon={Sparkles}
                  onClick={() => navigateTo(SCREENS.GRAND_MORYA)}
                  className="font-bold shadow-lg shadow-amber-500/25"
                  id="visit-grand-morya-btn"
                >
                  Visit Grand Morya
                </FestiveButton>
              </div>
            ) : (
              <div className="self-end sm:self-center shrink-0">
                <FestiveButton
                  variant="outline"
                  size="sm"
                  icon={Play}
                  onClick={() => {
                    soundManager.playButton();
                    startGame();
                  }}
                  className="text-xs"
                  id="play-stages-to-unlock-btn"
                >
                  Play Festival Mode
                </FestiveButton>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: 4 Core Progression Systems (2x2 Dashboard Grid) */}
      <section
        id="progression-pillars-grid"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        aria-label="Progression Pillars"
      >
        {/* CARD 1: 🏆 ACHIEVEMENTS */}
        <div
          id="journey-achievements-card"
          className="rounded-2xl bg-amber-950/60 border border-amber-500/25 p-5 flex flex-col justify-between shadow-lg shadow-black/40 backdrop-blur-md relative"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-lg">
                  🏆
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-amber-100">
                    Achievements
                  </h3>
                  <p className="text-xs text-amber-400/70">
                    Festival Milestones & Devotional Accolades
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-yellow-300 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/30">
                {unlockedAchievementsCount} / {totalAchievements}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs text-amber-300/80">
                <span>Unlocked</span>
                <span className="font-bold text-yellow-300">{achievementPercent}%</span>
              </div>
              <div className="w-full bg-stone-950/80 rounded-full h-2.5 p-0.5 border border-amber-500/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                  style={{ width: `${Math.max(2, Math.min(100, achievementPercent))}%` }}
                />
              </div>
            </div>

            {/* Quick Unlocked Badges Preview */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {ACHIEVEMENTS.slice(0, 6).map((ach) => {
                const isUnlocked = Boolean(achievements?.[ach.id]);
                return (
                  <span
                    key={ach.id}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                      isUnlocked
                        ? 'bg-amber-900/40 border-amber-400/50 text-amber-200'
                        : 'bg-stone-900/50 border-stone-800 text-stone-500'
                    }`}
                    title={ach.title}
                  >
                    <span>{ach.icon}</span>
                    <span className="truncate max-w-[90px]">{ach.title}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <FestiveButton
            variant="secondary"
            size="sm"
            icon={Award}
            onClick={() => navigateTo(SCREENS.ACHIEVEMENTS)}
            className="w-full text-xs font-bold mt-2"
            id="view-achievements-btn"
          >
            View Achievements
          </FestiveButton>
        </div>

        {/* CARD 2: ⚡ CHALLENGE MODE */}
        <div
          id="journey-challenges-card"
          className="rounded-2xl bg-amber-950/60 border border-amber-500/25 p-5 flex flex-col justify-between shadow-lg shadow-black/40 backdrop-blur-md relative"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-lg">
                  ⚡
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-amber-100">
                    Challenge Mode
                  </h3>
                  <p className="text-xs text-amber-400/70">
                    Focused Timed Trials of Precision & Devotion
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-yellow-300 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/30">
                {completedChallengesCount} / 4
              </span>
            </div>

            {/* List of 4 Challenges */}
            <div className="space-y-2 mb-4">
              {challengesList.map((ch) => (
                <div
                  key={ch.id}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs ${
                    ch.isCompleted
                      ? 'bg-amber-900/30 border-amber-400/40 text-amber-200'
                      : 'bg-stone-900/40 border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{ch.emoji}</span>
                    <span className="font-medium">{ch.name}</span>
                  </div>
                  {ch.isCompleted ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-stone-500 flex items-center gap-1">
                      <Circle className="w-2.5 h-2.5" />
                      <span>Not Completed</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <FestiveButton
            variant="secondary"
            size="sm"
            icon={Target}
            onClick={() => navigateTo(SCREENS.CHALLENGE_MODE)}
            className="w-full text-xs font-bold mt-2"
            id="enter-challenges-btn"
          >
            Enter Challenge Mode
          </FestiveButton>
        </div>

        {/* CARD 3: 🎁 FESTIVAL COLLECTION */}
        <div
          id="journey-collection-card"
          className="rounded-2xl bg-amber-950/60 border border-amber-500/25 p-5 flex flex-col justify-between shadow-lg shadow-black/40 backdrop-blur-md relative"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-lg">
                  🎁
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-amber-100">
                    Festival Collection
                  </h3>
                  <p className="text-xs text-amber-400/70">
                    Sacred Adornments, Diyas, Garlands & Decor
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-yellow-300 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/30">
                {unlockedCollectionCount} / {totalCollectionItems}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs text-amber-300/80">
                <span>Treasures Unlocked</span>
                <span className="font-bold text-yellow-300">{collectionPercent}%</span>
              </div>
              <div className="w-full bg-stone-950/80 rounded-full h-2.5 p-0.5 border border-amber-500/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                  style={{ width: `${Math.max(2, Math.min(100, collectionPercent))}%` }}
                />
              </div>
            </div>

            {/* Categories Mini Badge Row */}
            <div className="grid grid-cols-5 gap-1.5 mb-4 text-center">
              {Object.values(COLLECTION_CATEGORIES)
                .filter((cat) => cat !== COLLECTION_CATEGORIES.ALL)
                .map((catKey) => {
                  const info = CATEGORY_INFO[catKey];
                  const categoryTotal = FESTIVAL_COLLECTION_ITEMS.filter((i) => i.category === catKey).length;
                  const categoryUnlocked = FESTIVAL_COLLECTION_ITEMS.filter(
                    (i) => i.category === catKey && unlockedCollectionIds.includes(i.id)
                  ).length;
                  return (
                    <div
                      key={catKey}
                      className="p-1.5 rounded-lg bg-amber-900/25 border border-amber-500/20"
                    >
                      <div className="text-sm">{info?.emoji}</div>
                      <div className="text-[10px] font-mono font-bold text-amber-300 mt-0.5">
                        {categoryUnlocked}/{categoryTotal}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <FestiveButton
            variant="secondary"
            size="sm"
            icon={Gift}
            onClick={() => navigateTo(SCREENS.FESTIVAL_COLLECTION)}
            className="w-full text-xs font-bold mt-2"
            id="view-collection-btn"
          >
            View Collection
          </FestiveButton>
        </div>

        {/* CARD 4: 👑 PERSONAL RECORDS */}
        <div
          id="journey-records-card"
          className="rounded-2xl bg-amber-950/60 border border-amber-500/25 p-5 flex flex-col justify-between shadow-lg shadow-black/40 backdrop-blur-md relative"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-lg">
                  👑
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-amber-100">
                    My Records
                  </h3>
                  <p className="text-xs text-amber-400/70">
                    Highest Devotion & Festival Statistics
                  </p>
                </div>
              </div>
              <span className="font-heading font-bold text-xs text-yellow-300 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/30">
                {guardianRank.badge || guardianRank.name}
              </span>
            </div>

            {/* Key Records Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-900/25 border border-amber-500/20">
                <span className="text-amber-400/70 block text-[11px]">Highest Score</span>
                <span className="font-mono font-bold text-base text-yellow-300">
                  {highScore > 0 ? `${highScore.toLocaleString()} pts` : '0 pts'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-900/25 border border-amber-500/20">
                <span className="text-amber-400/70 block text-[11px]">Guardian Rank</span>
                <span className="font-bold text-xs text-amber-200 truncate block mt-1">
                  {guardianRank.name}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-900/25 border border-amber-500/20">
                <span className="text-amber-400/70 block text-[11px]">Completed Runs</span>
                <span className="font-mono font-bold text-base text-amber-200">
                  {playerStats?.completedRuns || 0}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-900/25 border border-amber-500/20">
                <span className="text-amber-400/70 block text-[11px]">Completed Stages</span>
                <span className="font-mono font-bold text-base text-amber-200">
                  {playerStats?.completedStages || completedStagesCount}
                </span>
              </div>
            </div>
          </div>

          <FestiveButton
            variant="secondary"
            size="sm"
            icon={Trophy}
            onClick={() => navigateTo(SCREENS.PERSONAL_RECORDS)}
            className="w-full text-xs font-bold mt-2"
            id="view-my-records-btn"
          >
            View My Records
          </FestiveButton>
        </div>
      </section>

      {/* Footer Navigation: Return to Main Menu or Play */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-4">
        <FestiveButton
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={handleBack}
          className="w-full sm:w-auto text-sm"
          id="journey-bottom-back-btn"
        >
          Return to Main Menu
        </FestiveButton>

        <FestiveButton
          variant="primary"
          size="md"
          icon={Play}
          onClick={() => {
            soundManager.playButton();
            startGame();
          }}
          className="w-full sm:w-auto text-sm font-bold shadow-lg shadow-amber-500/20"
          id="journey-play-festival-btn"
        >
          Play Festival Mode
        </FestiveButton>
      </div>
    </main>
  );
}
