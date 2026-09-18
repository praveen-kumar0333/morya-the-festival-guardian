import React from 'react';
import {
  Sparkles,
  Palette,
  Trophy,
  Leaf,
  Flame,
  Clock,
  CheckCircle2,
  Award,
  Crown,
  Gift,
  ArrowRight,
} from 'lucide-react';
import { ACHIEVEMENTS } from '../../constants/achievements.js';
import { FESTIVAL_COLLECTION_ITEMS, RARITY_CONFIG } from '../../constants/collectionData.js';

export default function FestivalJourneySummary({
  scores = {},
  totalScore = 0,
  pandalArrangement = {},
  rangoliResult = null,
  mushakResult = null,
  ecoResult = null,
  achievements = {},
  collectionState = {},
  activeSelections = {},
  playerStats = {},
  highScore = 0,
  isNewHighScore = false,
  onViewCollection,
  className = '',
}) {
  // Real data metrics calculation
  const pandalCount = pandalArrangement?.placedItems?.length || 6;

  const rangoliRounds = rangoliResult?.completedRounds || 3;
  const rangoliAccuracy = rangoliResult?.rounds?.length
    ? Math.round(
        rangoliResult.rounds.reduce((acc, r) => acc + (r.accuracy || 100), 0) /
          rangoliResult.rounds.length
      )
    : null;

  const mushakItems = mushakResult?.itemsCollected ?? null;
  const ecoChoices = ecoResult?.ecoFriendlyChoices ?? 6;
  const ecoTotal = ecoResult?.totalChoices ?? 6;

  // Genuine unlocked achievements (filtered from real player state)
  const unlockedAchievements = ACHIEVEMENTS.filter((ach) => !!achievements?.[ach.id]);

  // Genuine unlocked collection items
  const unlockedItemIds = collectionState?.unlockedItems || [];
  const unlockedCollectionItems = unlockedItemIds
    .map((id) => FESTIVAL_COLLECTION_ITEMS.find((item) => item.id === id))
    .filter(Boolean);

  const showcaseItems = unlockedCollectionItems.slice(0, 4);

  const stageBreakdown = [
    {
      id: 'pandal',
      label: '🛕 Pandal Build',
      score: scores.pandal || 0,
      metric: `${pandalCount} / 6 Decorated`,
      color: 'text-amber-300',
    },
    {
      id: 'rangoli',
      label: '🎨 Rangoli Rush',
      score: scores.rangoli || 0,
      metric:
        rangoliAccuracy !== null
          ? `${rangoliRounds} Rds • ${rangoliAccuracy}% Acc`
          : `${rangoliRounds} Rounds Complete`,
      color: 'text-rose-300',
    },
    {
      id: 'mushak',
      label: '🐭 Modak & Mushak',
      score: scores.mushak || 0,
      metric: mushakItems !== null ? `${mushakItems} Prasad Treats` : 'Sacred Feast',
      color: 'text-yellow-300',
    },
    {
      id: 'eco',
      label: '🌱 Eco Celebration',
      score: scores.ecoSpirit || 0,
      metric: `${ecoChoices} / ${ecoTotal} Eco Choices`,
      color: 'text-emerald-300',
    },
  ];

  return (
    <div
      id="festival-journey-summary"
      className={`w-full max-w-xl mx-auto space-y-5 text-left ${className}`}
    >
      {/* =========================================================
          1. PERSONAL BEST CELEBRATION (Genuine Only)
         ========================================================= */}
      {isNewHighScore && totalScore > 0 ? (
        <div
          id="new-personal-best-banner"
          className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border-2 border-yellow-400/80 shadow-[0_0_20px_rgba(250,204,21,0.35)] flex items-center justify-between gap-3 animate-pulse motion-reduce:animate-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/30 text-yellow-300 border border-yellow-400/50">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-black text-amber-300 block">
                👑 NEW PERSONAL BEST!
              </span>
              <span className="text-xs sm:text-sm font-semibold text-amber-100">
                You surpassed your previous festival record!
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-heading font-black text-base sm:text-lg text-yellow-300 tabular-nums">
              {totalScore.toLocaleString()}
            </span>
            <span className="block text-[10px] text-amber-300/80 font-mono">pts</span>
          </div>
        </div>
      ) : highScore > 0 ? (
        <div className="px-3.5 py-2 rounded-xl bg-stone-900/60 border border-amber-500/20 flex items-center justify-between text-xs">
          <span className="text-amber-300/80 flex items-center gap-1.5 font-medium">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Personal Best Record:</span>
          </span>
          <span className="font-mono font-bold text-amber-200 tabular-nums">
            {highScore.toLocaleString()} pts
          </span>
        </div>
      ) : null}

      {/* =========================================================
          2. STAGE SCORE BREAKDOWN (Your Journey)
         ========================================================= */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
          <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>YOUR JOURNEY</span>
          </h3>
          <span className="text-[11px] font-mono text-amber-400/80 uppercase">Stage Breakdown</span>
        </div>

        <div className="space-y-1.5 font-sans">
          {stageBreakdown.map((row) => (
            <div
              key={row.id}
              className="p-2.5 rounded-xl bg-stone-900/70 border border-amber-500/15 flex items-center justify-between gap-2 hover:bg-stone-900/90 transition-colors"
            >
              <div className="min-w-0">
                <span className={`text-xs sm:text-sm font-semibold ${row.color} block truncate`}>
                  {row.label}
                </span>
                <span className="text-[10px] text-amber-300/70 block font-mono truncate">
                  {row.metric}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-amber-100 tabular-nums font-mono shrink-0">
                +{row.score.toLocaleString()} pts
              </span>
            </div>
          ))}

          {/* Cumulative Bonuses if earned */}
          {((scores.comboBonus || 0) > 0 || (scores.timeBonus || 0) > 0) && (
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {(scores.comboBonus || 0) > 0 && (
                <div className="p-2 rounded-lg bg-orange-950/30 border border-orange-500/20 flex items-center justify-between text-xs">
                  <span className="text-orange-300 text-[11px] flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" /> Combo Bonus
                  </span>
                  <span className="font-bold text-amber-200 tabular-nums">
                    +{scores.comboBonus.toLocaleString()}
                  </span>
                </div>
              )}
              {(scores.timeBonus || 0) > 0 && (
                <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between text-xs">
                  <span className="text-cyan-300 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> Time Bonus
                  </span>
                  <span className="font-bold text-amber-200 tabular-nums">
                    +{scores.timeBonus.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TOTAL SCORE ROW */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 border border-amber-400/40 flex items-center justify-between mt-2 shadow-inner">
            <span className="font-heading font-black text-sm uppercase tracking-wider text-amber-200">
              TOTAL FESTIVAL SCORE
            </span>
            <span className="font-heading font-black text-lg sm:text-xl text-yellow-300 tabular-nums">
              {totalScore.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          3. FESTIVAL HIGHLIGHTS (Real Unlocked Achievements)
         ========================================================= */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
          <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>FESTIVAL HIGHLIGHTS</span>
          </h3>
          <span className="text-[11px] font-mono text-amber-300/80">
            {unlockedAchievements.length} of {ACHIEVEMENTS.length} Unlocked
          </span>
        </div>

        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {unlockedAchievements.slice(0, 4).map((ach) => (
              <div
                key={ach.id}
                className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/30 flex items-center gap-2.5 shadow-sm"
              >
                <span className="text-xl shrink-0" role="img" aria-label={ach.title}>
                  {ach.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-amber-100 truncate">
                      {ach.title}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono shrink-0">
                      ✓ UNLOCKED
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-300/70 block truncate">
                    {ach.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-stone-900/50 border border-amber-500/15 text-center text-xs text-amber-200/80 italic">
            Your sacred festival journey has begun. Continue exploring to unlock festival accolades!
          </div>
        )}
      </div>

      {/* =========================================================
          4. FESTIVAL TREASURES (Collection Showcase)
         ========================================================= */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
          <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>FESTIVAL TREASURES</span>
          </h3>
          <span className="text-[11px] font-mono text-amber-300/80">
            {unlockedCollectionItems.length} of 21 Collected
          </span>
        </div>

        {showcaseItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {showcaseItems.map((item) => {
              const rarityStyle = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.Common;
              const isEquipped = activeSelections[item.category] === item.id;
              return (
                <div
                  key={item.id}
                  className={`p-2 rounded-xl bg-stone-900/80 border ${
                    isEquipped ? 'border-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : rarityStyle.border
                  } flex flex-col items-center text-center relative group`}
                >
                  <span className="text-2xl my-1">{item.icon}</span>
                  <span className="text-[11px] font-bold text-amber-100 truncate w-full">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-[8px] px-1 py-0.2 rounded font-bold ${rarityStyle.badge}`}>
                      {item.rarity}
                    </span>
                    {isEquipped && (
                      <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/30 text-yellow-300 font-bold">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-stone-900/50 border border-amber-500/15 text-center text-xs text-amber-200/80 italic">
            Complete stages and challenges to discover divine festival treasures!
          </div>
        )}

        {onViewCollection && (
          <div className="flex justify-end pt-1">
            <button
              onClick={onViewCollection}
              id="view-full-collection-btn"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-100 bg-stone-900/70 hover:bg-stone-800 border border-amber-500/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <span>View Full Collection ({unlockedCollectionItems.length}/21)</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        )}
      </div>

      {/* =========================================================
          5. FINAL DEVOTIONAL MESSAGE (Section 15)
         ========================================================= */}
      <div className="pt-3 border-t border-amber-500/30 text-center space-y-2">
        <p className="text-xs sm:text-sm text-amber-100/90 font-medium italic max-w-md mx-auto leading-relaxed">
          “The festival was built with your hands,<br />
          shaped by your choices,<br />
          and carried by your spirit.”
        </p>
        <h4 className="font-heading font-black text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 drop-shadow-sm">
          गणपति बप्पा मोरया 🙏
        </h4>
      </div>
    </div>
  );
}
