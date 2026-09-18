import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Award,
  AlertCircle,
} from 'lucide-react';
import FestiveCard from '../../ui/FestiveCard.jsx';
import FestiveButton from '../../ui/FestiveButton.jsx';
import { POWDER_COLORS } from './RangoliPattern.js';
import { PowderGlyph } from './RangoliTile.jsx';

export default function RangoliResult({
  roundNumber = 1,
  totalRounds = 3,
  evaluation = {},
  roundScore = 0,
  timeBonus = 0,
  isPerfect = false,
  targetGrid = [],
  playerGrid = [],
  size = 3,
  onNextRound,
  id,
}) {
  const { correctCount = 0, totalCells = 9, accuracy = 0 } = evaluation;

  // Title and tone based on accuracy
  let title = 'Keep going!';
  let subtitle = 'Every effort in devotion brings blessings.';
  let badgeColor = 'from-amber-500 to-orange-600';

  if (isPerfect) {
    title = '✨ PERFECT RANGOLI!';
    subtitle = 'Every sacred petal and motif was memorized flawlessly!';
    badgeColor = 'from-amber-400 to-yellow-500';
  } else if (accuracy >= 80) {
    title = '🌸 BEAUTIFUL!';
    subtitle = 'Radiant symmetry and auspicious colors!';
    badgeColor = 'from-rose-500 to-amber-500';
  } else if (accuracy >= 60) {
    title = '✨ WELL DONE!';
    subtitle = 'A lovely festive tribute to Lord Ganesha.';
    badgeColor = 'from-amber-500 to-yellow-600';
  }

  // Mini preview renderer for side-by-side comparison
  const renderMiniGrid = (grid, label) => {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide">
          {label}
        </span>
        <div
          className="p-1.5 rounded-xl bg-stone-950 border border-amber-500/30 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {grid.map((colKey, i) => {
            const powder = POWDER_COLORS[colKey] || POWDER_COLORS.empty;
            const isFilled = colKey !== 'empty';
            return (
              <div
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center ${
                  isFilled
                    ? `bg-gradient-to-br ${powder.bgGradient} ${powder.borderClass}`
                    : 'bg-[#2b1208] border-amber-900/40'
                }`}
                title={powder.name}
              >
                {isFilled && (
                  <div className="w-2.5 h-2.5">
                    <PowderGlyph colorId={colKey} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isLastRound = roundNumber >= totalRounds;

  return (
    <div
      id={id || 'rangoli-result-overlay'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md"
    >
      <FestiveCard
        highlight
        className="max-w-md w-full border-2 border-amber-400/60 shadow-2xl text-center animate-gentle-pulse"
      >
        <div className="space-y-4 sm:space-y-5">
          {/* Badge Icon */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-br ${badgeColor} text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/30`}
          >
            {isPerfect ? (
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            ) : (
              <Sparkles className="w-8 h-8" />
            )}
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
              Round {roundNumber} of {totalRounds} Complete
            </span>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-amber-100 mt-0.5">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/85 mt-1">{subtitle}</p>
          </div>

          {/* Itemized Score Breakdown */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-amber-950/60 border border-amber-400/30 space-y-2 text-left text-xs sm:text-sm">
            <div className="flex justify-between items-center text-amber-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Correct Cells:
              </span>
              <span className="font-bold text-amber-100 font-mono">
                {correctCount} / {totalCells} ({accuracy}%)
              </span>
            </div>

            <div className="flex justify-between items-center text-amber-200">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Pattern Points:
              </span>
              <span className="font-bold text-amber-100 font-mono">
                +{roundScore - timeBonus}
              </span>
            </div>

            {timeBonus > 0 && (
              <div className="flex justify-between items-center text-amber-200">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Speed Bonus:
                </span>
                <span className="font-bold text-cyan-300 font-mono">
                  +{timeBonus}
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-amber-500/20 flex justify-between items-center text-sm font-bold text-amber-300">
              <span>Round Total:</span>
              <span className="font-heading font-black text-base sm:text-lg text-yellow-300">
                +{roundScore} pts
              </span>
            </div>
          </div>

          {/* Miniature Visual Comparison (Target vs Player's Recreated) */}
          <div className="p-2.5 rounded-xl bg-stone-900/60 border border-amber-500/20 flex items-center justify-around">
            {renderMiniGrid(targetGrid, 'Sacred Target')}
            <div className="text-amber-400/40 text-xs font-mono">VS</div>
            {renderMiniGrid(playerGrid, 'Your Rangoli')}
          </div>

          {/* Action Button */}
          <FestiveButton
            variant="primary"
            size="lg"
            className="w-full text-sm sm:text-base font-heading font-bold"
            icon={ArrowRight}
            iconPosition="right"
            onClick={onNextRound}
            id="next-round-btn"
          >
            {isLastRound ? 'FINISH RANGOLI RUSH' : `START ROUND ${roundNumber + 1}`}
          </FestiveButton>
        </div>
      </FestiveCard>
    </div>
  );
}
