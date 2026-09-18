import React from 'react';
import {
  ArrowLeft,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  Calendar,
  Award,
} from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { ACHIEVEMENTS, TOTAL_ACHIEVEMENTS } from '../../constants/achievements.js';
import FestiveButton from '../ui/FestiveButton.jsx';
import FestiveCard from '../ui/FestiveCard.jsx';
import Diya from '../festive/Diya.jsx';
import MarigoldGarland from '../festive/MarigoldGarland.jsx';

export default function AchievementsScreen() {
  const { achievements, goToMainMenu } = useGame();

  const unlockedCount = Object.keys(achievements || {}).length;
  const percentage = Math.round((unlockedCount / TOTAL_ACHIEVEMENTS) * 100);

  const formatUnlockDate = (isoString) => {
    if (!isoString) return 'Unlocked';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Unlocked';
    }
  };

  return (
    <main
      id="achievements-screen"
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
          id="achievements-back-btn"
        >
          Main Menu
        </FestiveButton>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-xs font-bold text-amber-300">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Contest Achievements</span>
        </div>
      </div>

      {/* Screen Title & Progress Banner */}
      <div className="w-full max-w-2xl text-center space-y-3 mb-6">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Diya size={34} />
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400/90 block">
              Sacred Journey Milestones
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400">
              MORYA ACHIEVEMENTS
            </h1>
          </div>
          <Diya size={34} />
        </div>

        {/* Progress bar card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900/80 to-amber-950/60 border border-amber-400/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-amber-200">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Progress: {unlockedCount} / {TOTAL_ACHIEVEMENTS} Unlocked</span>
            </span>
            <span className="font-mono text-yellow-300 text-sm sm:text-base">
              {percentage}% Complete
            </span>
          </div>

          {/* Graphical Progress Track */}
          <div className="w-full h-3 rounded-full bg-stone-950/80 border border-amber-500/30 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 shadow-[0_0_12px_rgba(251,191,36,0.7)] transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pb-6">
        {ACHIEVEMENTS.map((ach) => {
          const unlockedData = achievements[ach.id];
          const isUnlocked = Boolean(unlockedData);

          return (
            <div
              key={ach.id}
              id={`achievement-card-${ach.id}`}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start gap-4 ${
                isUnlocked
                  ? 'bg-gradient-to-br from-amber-950/70 via-stone-900/80 to-amber-900/50 border-amber-400/60 shadow-lg shadow-amber-500/10'
                  : 'bg-stone-950/50 border-stone-800/80 opacity-75 grayscale-[30%]'
              }`}
            >
              {/* Left Icon Pill */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl sm:text-3xl border ${
                  isUnlocked
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 shadow-md shadow-amber-500/20'
                    : 'bg-stone-900/60 border-stone-700/60 text-stone-500'
                }`}
              >
                {isUnlocked ? (
                  <span>{ach.icon}</span>
                ) : (
                  <Lock className="w-6 h-6 text-stone-500" />
                )}
              </div>

              {/* Center Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70">
                    {ach.category}
                  </span>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-400 bg-stone-900/60 border border-stone-700/40 px-2 py-0.5 rounded-full">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <h3
                  className={`font-heading font-black text-base sm:text-lg tracking-wide truncate ${
                    isUnlocked ? 'text-amber-100' : 'text-stone-300'
                  }`}
                >
                  {ach.title}
                </h3>

                <p className="text-xs sm:text-sm text-amber-200/80 leading-snug">
                  {ach.description}
                </p>

                {/* Requirement / Date Footer */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-amber-400/60">
                  <span className="italic truncate pr-2">
                    {ach.requirement}
                  </span>
                  {isUnlocked && unlockedData?.unlockedAt && (
                    <span className="flex-shrink-0 flex items-center gap-1 font-mono text-[10px] text-amber-300/60">
                      <Calendar className="w-3 h-3" />
                      {formatUnlockDate(unlockedData.unlockedAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Return Action */}
      <div className="mt-auto py-3 text-center">
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
