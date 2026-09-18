import React from 'react';
import {
  ArrowLeft,
  Trophy,
  Crown,
  Sparkles,
  Flame,
  Award,
  Zap,
  Target,
  Leaf,
  Clock,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { TOTAL_ACHIEVEMENTS } from '../../constants/achievements.js';
import FestiveButton from '../ui/FestiveButton.jsx';
import Diya from '../festive/Diya.jsx';
import MarigoldGarland from '../festive/MarigoldGarland.jsx';

export default function PersonalBestScreen() {
  const { playerStats, achievements, goToMainMenu } = useGame();

  const unlockedCount = Object.keys(achievements || {}).length;

  return (
    <main
      id="personal-best-screen"
      className="w-full flex-1 flex flex-col items-center px-4 py-4 sm:py-6 relative z-10 max-w-5xl mx-auto min-h-[92vh]"
    >
      {/* Top Auspicious Garland */}
      <MarigoldGarland className="my-1 max-w-2xl" />

      {/* Header & Back Navigation */}
      <div className="w-full flex items-center justify-between gap-3 pt-2 pb-4">
        <FestiveButton
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={goToMainMenu}
          id="records-back-btn"
        >
          Main Menu
        </FestiveButton>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-xs font-bold text-amber-300">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Hall of Personal Bests</span>
        </div>
      </div>

      {/* Title */}
      <div className="w-full max-w-2xl text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Diya size={34} />
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400/90 block">
              Player Statistics & Records
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400">
              MY MORYA RECORDS
            </h1>
          </div>
          <Diya size={34} />
        </div>
      </div>

      <div className="w-full space-y-6 pb-8">
        {/* Section 1: 🏆 OVERALL SUMMARY */}
        <section
          aria-labelledby="overall-records-heading"
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900/85 to-amber-950/70 border-2 border-amber-400/50 shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-2.5 pb-4 border-b border-amber-500/20 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="overall-records-heading"
                className="font-heading font-black text-lg sm:text-xl text-amber-100 tracking-wide"
              >
                Overall Festival Journey
              </h2>
              <p className="text-xs text-amber-300/70">
                Highest recorded celebration achievements
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Highest Score */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/70 border border-amber-500/25 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider">
                Highest Score
              </span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-amber-100 my-1">
                {(playerStats.highestScore || 0).toLocaleString()}
              </div>
              <span className="text-[10px] text-amber-300/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                All-time record
              </span>
            </div>

            {/* Best Guardian Rank */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/70 border border-amber-500/25 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider">
                Best Rank
              </span>
              <div className="font-heading font-bold text-base sm:text-lg text-yellow-300 my-1 truncate">
                {playerStats.bestGuardianRank?.badge ||
                  playerStats.bestGuardianRank?.name ||
                  'No Rank Yet'}
              </div>
              <span className="text-[10px] text-amber-300/60 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                Highest title earned
              </span>
            </div>

            {/* Completed Runs */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/70 border border-amber-500/25 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider">
                Completed Runs
              </span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-amber-100 my-1">
                {playerStats.completedRuns || 0}
              </div>
              <span className="text-[10px] text-amber-300/60 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" />
                Grand Morya reached
              </span>
            </div>

            {/* Completed Stages */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/70 border border-amber-500/25 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider">
                Completed Stages
              </span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-amber-100 my-1">
                {playerStats.completedStages || 0}
              </div>
              <span className="text-[10px] text-amber-300/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-amber-400" />
                Stages mastered
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: STAGE SPECIFIC BESTS (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Stage 1: 🛕 PANDAL BUILD */}
          <section
            aria-labelledby="pandal-records-heading"
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 via-stone-900/80 to-amber-900/40 border border-amber-500/30 shadow-lg space-y-3"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/15">
              <span className="text-2xl">🛕</span>
              <div>
                <h3
                  id="pandal-records-heading"
                  className="font-heading font-bold text-base text-amber-100"
                >
                  Stage 1 — Pandal Build
                </h3>
                <p className="text-[11px] text-amber-300/70">
                  Mandap decoration and harmony
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Score
                </span>
                <span className="font-heading font-black text-xl text-amber-100">
                  {(playerStats.bestPandalScore || 0).toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Fastest Completion
                </span>
                <span className="font-heading font-black text-xl text-amber-100">
                  {playerStats.fastestPandalCompletionTime !== null
                    ? `${playerStats.fastestPandalCompletionTime}s left`
                    : '—'}
                </span>
              </div>
            </div>
          </section>

          {/* Stage 2: 🎨 RANGOLI RUSH */}
          <section
            aria-labelledby="rangoli-records-heading"
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 via-stone-900/80 to-amber-900/40 border border-amber-500/30 shadow-lg space-y-3"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/15">
              <span className="text-2xl">🎨</span>
              <div>
                <h3
                  id="rangoli-records-heading"
                  className="font-heading font-bold text-base text-amber-100"
                >
                  Stage 2 — Rangoli Rush
                </h3>
                <p className="text-[11px] text-amber-300/70">
                  Pattern recall and symmetry
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Score
                </span>
                <span className="font-heading font-black text-xl text-amber-100">
                  {(playerStats.bestRangoliScore || 0).toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Accuracy
                </span>
                <span className="font-heading font-black text-xl text-amber-100">
                  {playerStats.bestRangoliAccuracy
                    ? `${playerStats.bestRangoliAccuracy}%`
                    : '—'}
                </span>
              </div>
            </div>
          </section>

          {/* Stage 3: 🐭 MODAK & MUSHAK */}
          <section
            aria-labelledby="mushak-records-heading"
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 via-stone-900/80 to-amber-900/40 border border-amber-500/30 shadow-lg space-y-3"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/15">
              <span className="text-2xl">🐭</span>
              <div>
                <h3
                  id="mushak-records-heading"
                  className="font-heading font-bold text-base text-amber-100"
                >
                  Stage 3 — Modak & Mushak
                </h3>
                <p className="text-[11px] text-amber-300/70">
                  Prasad collection and devotion combos
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Score
                </span>
                <span className="font-heading font-black text-lg text-amber-100">
                  {(playerStats.bestMushakScore || 0).toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Combo
                </span>
                <span className="font-heading font-black text-lg text-amber-100">
                  {playerStats.bestCombo ? `${playerStats.bestCombo}x` : '—'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Most Items
                </span>
                <span className="font-heading font-black text-lg text-amber-100">
                  {playerStats.mostItemsCollected || 0}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Fever Spells
                </span>
                <span className="font-heading font-black text-lg text-amber-100">
                  {playerStats.mostFeverActivations || 0}
                </span>
              </div>
            </div>
          </section>

          {/* Stage 4: 🌱 ECO CELEBRATION */}
          <section
            aria-labelledby="eco-records-heading"
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 via-stone-900/80 to-amber-900/40 border border-amber-500/30 shadow-lg space-y-3"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/15">
              <span className="text-2xl">🌱</span>
              <div>
                <h3
                  id="eco-records-heading"
                  className="font-heading font-bold text-base text-amber-100"
                >
                  Stage 4 — Eco Celebration
                </h3>
                <p className="text-[11px] text-amber-300/70">
                  Earth-conscious wisdom & rituals
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Score
                </span>
                <span className="font-heading font-black text-xl text-amber-100">
                  {(playerStats.bestEcoScore || 0).toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/60 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-400/80 block">
                  Best Eco Spirit
                </span>
                <span className="font-heading font-black text-xl text-emerald-400">
                  {playerStats.highestEcoSpirit
                    ? `${playerStats.highestEcoSpirit}/100`
                    : '—'}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Section 3: 🏅 ACHIEVEMENTS SUMMARY BANNER */}
        <section
          aria-labelledby="achievements-summary-heading"
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900/80 to-amber-950/60 border border-amber-400/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-xl">
              🏅
            </div>
            <div>
              <h3
                id="achievements-summary-heading"
                className="font-heading font-bold text-base text-amber-100"
              >
                Festival Achievements
              </h3>
              <p className="text-xs text-amber-300/70">
                {unlockedCount} of {TOTAL_ACHIEVEMENTS} unlocked (
                {Math.round((unlockedCount / TOTAL_ACHIEVEMENTS) * 100)}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:w-44 h-2.5 rounded-full bg-stone-950/80 border border-amber-500/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                style={{
                  width: `${(unlockedCount / TOTAL_ACHIEVEMENTS) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer Return Action */}
      <div className="mt-auto py-2 text-center">
        <FestiveButton
          variant="primary"
          size="md"
          icon={ArrowLeft}
          onClick={goToMainMenu}
        >
          Return to Festival Menu
        </FestiveButton>
      </div>
    </main>
  );
}
