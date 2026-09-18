import React from 'react';
import { Trophy, Sparkles, RotateCcw, ArrowLeft, Home, Award, CheckCircle2 } from 'lucide-react';
import FestiveButton from '../ui/FestiveButton.jsx';
import FestiveCard from '../ui/FestiveCard.jsx';
import Diya from '../festive/Diya.jsx';
import CelebrationBurst from '../festive/CelebrationBurst.jsx';

export default function ChallengeResult({
  challenge,
  score = 0,
  isNewRecord = false,
  personalBest = 0,
  details = [], // Array of { label: string, value: string | number, icon?: any }
  onPlayAgain,
  onBackToChallenges,
  onMainMenu,
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <FestiveCard className="relative z-10 w-full max-w-lg mx-auto p-5 sm:p-8 text-center border-amber-500/40 shadow-2xl backdrop-blur-md overflow-hidden">
        <CelebrationBurst count={22} className="z-10 opacity-90" />
        {/* Decorative Diya header */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <Diya size="sm" isGlowing={true} />
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-300">
            🌺 Challenge Complete 🌺
          </span>
          <Diya size="sm" isGlowing={true} />
        </div>

        {/* Challenge Title */}
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400">
          {challenge?.title || 'Trial Complete'}
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 mb-5">
          {challenge?.subtitle || 'Trial of the Festival Guardian'}
        </p>

        {/* New Record Banner if applicable */}
        {isNewRecord && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-yellow-400/60 text-yellow-200 text-xs sm:text-sm font-bold animate-pulse shadow-lg shadow-amber-500/20">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span>🏆 NEW CHALLENGE RECORD!</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
        )}

        {/* Primary Score Presentation */}
        <div className="p-4 sm:p-5 mb-5 rounded-2xl bg-gradient-to-b from-amber-950/80 to-stone-950/90 border border-amber-500/30 shadow-inner">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-300/80">
            Score
          </div>
          <div className="text-4xl sm:text-5xl font-heading font-black text-amber-200 my-1 tracking-tight">
            {score.toLocaleString()}
          </div>

          {/* Personal Best Display */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/40 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Personal Best:</span>
            <span className="text-yellow-200 font-bold">
              {Math.max(score, personalBest).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Challenge Specific Details Grid */}
        {details && details.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {details.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-stone-900/70 border border-amber-500/20 flex flex-col items-center justify-center text-center"
              >
                <div className="text-[11px] sm:text-xs font-medium text-amber-300/80 flex items-center gap-1">
                  {item.icon && <item.icon className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{item.label}</span>
                </div>
                <div className="text-base sm:text-lg font-heading font-bold text-amber-100 mt-0.5">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <FestiveButton
            variant="primary"
            size="lg"
            className="w-full font-heading font-bold"
            icon={RotateCcw}
            onClick={onPlayAgain}
            id="challenge-play-again-btn"
          >
            Play Again
          </FestiveButton>

          <div className="grid grid-cols-2 gap-2.5">
            <FestiveButton
              variant="secondary"
              size="md"
              className="text-xs sm:text-sm bg-stone-900/80 border-amber-500/30 text-amber-200"
              icon={ArrowLeft}
              onClick={onBackToChallenges}
              id="challenge-back-btn"
            >
              Back to Challenges
            </FestiveButton>

            <FestiveButton
              variant="outline"
              size="md"
              className="text-xs sm:text-sm"
              icon={Home}
              onClick={onMainMenu}
              id="challenge-main-menu-btn"
            >
              Main Menu
            </FestiveButton>
          </div>
        </div>
      </FestiveCard>
    </div>
  );
}
