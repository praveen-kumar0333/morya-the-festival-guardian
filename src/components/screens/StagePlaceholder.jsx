import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  Trophy,
  Leaf,
  ChevronRight,
  Flame,
  CheckCircle2,
  Clock,
  Award,
  AlertCircle,
} from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { STAGES, SCREENS } from '../../constants/gameData.js';
import GameHUD from '../ui/GameHUD.jsx';
import ProgressIndicator from '../ui/ProgressIndicator.jsx';
import FestiveCard from '../ui/FestiveCard.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import ScoreBadge from '../ui/ScoreBadge.jsx';

export default function StagePlaceholder({ stageId }) {
  const {
    scores,
    currentCombo,
    incrementCombo,
    resetCombo,
    completeStage,
    goToMainMenu,
    addToast,
  } = useGame();

  const [timeRemaining, setTimeRemaining] = useState(30);

  const stage = STAGES.find((s) => s.id === stageId) || STAGES[0];

  const icons = {
    [SCREENS.PANDAL_BUILD]: Sparkles,
    [SCREENS.RANGOLI_RUSH]: Palette,
    [SCREENS.MODAK_MUSHAK]: Trophy,
    [SCREENS.ECO_CELEBRATION]: Leaf,
  };

  const StageIcon = icons[stageId] || Sparkles;

  // Handle stage completion simulation (advances game loop)
  const handleProceedNext = (simulatedScore = stage.baseScore) => {
    const timeBonus = Math.floor(timeRemaining * 15);
    const comboBonus = currentCombo * 50;

    completeStage(stageId, {
      [stage.category]: simulatedScore,
      timeBonus: (scores.timeBonus || 0) + timeBonus,
      comboBonus: (scores.comboBonus || 0) + comboBonus,
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-between pb-6">
      {/* Universal In-Game HUD */}
      <GameHUD
        stageId={stageId}
        timeLimit={stage.timeLimit}
        onTick={(sec) => setTimeRemaining(sec)}
        onTimeUp={() => {
          addToast("Time's up! Calculating blessings...", 'warning');
          handleProceedNext(stage.baseScore * 0.8);
        }}
      />

      {/* Visual Multi-Stage Progress Tracker */}
      <div className="w-full max-w-4xl px-4 pt-3">
        <ProgressIndicator currentScreen={stageId} />
      </div>

      {/* Central Game Area / Stage Card */}
      <main className="w-full max-w-3xl px-4 py-4 sm:py-6 flex-1 flex flex-col justify-center">
        <FestiveCard
          highlight
          className="border-amber-400/50"
          id={`stage-${stage.number}-card`}
        >
          <div className="space-y-6">
            {/* Stage Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stage.accentColor} text-white flex items-center justify-center shadow-lg shadow-amber-950/60 flex-shrink-0`}
                >
                  <StageIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    <span>Stage {stage.number}</span>
                    <span>•</span>
                    <span>{stage.tagline}</span>
                  </div>
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-100">
                    {stage.title}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <ScoreBadge
                  score={scores[stage.category] || 0}
                  label="Stage Points"
                  size="sm"
                />
              </div>
            </div>

            {/* Stage Description & Objectives */}
            <div className="space-y-4 text-amber-100/90 text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-xl bg-amber-950/70 border border-amber-500/20">
                <p className="font-medium text-amber-200">{stage.description}</p>
              </div>

              {/* Stage Specific Instructions Box */}
              <div className="p-4 rounded-xl bg-stone-900/60 border border-amber-500/20 space-y-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Stage Objective & Scoring
                </h3>
                <ul className="text-xs sm:text-sm text-amber-200/80 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>Base Value:</strong> Earn up to{' '}
                    <span className="text-amber-300 font-bold">{stage.baseScore} pts</span> for completing this stage.
                  </li>
                  <li>
                    <strong>Combo Multiplier:</strong> Maintain actions without error to boost your combo bonus.
                  </li>
                  <li>
                    <strong>Time Bonus:</strong> Finish quickly to bank remaining seconds as festival bonus points.
                  </li>
                </ul>
              </div>

              {/* Foundation Notice & Interactive Testing Workbench */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900/50 to-amber-950/40 border border-amber-400/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Foundation State • Gameplay Simulation & Loop Tester</span>
                </div>
                <p className="text-xs text-amber-300/80">
                  The project foundation, audio engine, scoring architecture, and state machine are fully active. Use the controls below to test combo triggers, award points, and step through the complete game loop.
                </p>

                {/* Combo Tester */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-amber-300">Combo Meter:</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 border border-orange-400/40">
                    {currentCombo}x
                  </span>
                  <FestiveButton
                    variant="outline"
                    size="sm"
                    className="!py-1 !min-h-[32px] text-xs"
                    icon={Flame}
                    onClick={() => incrementCombo(1)}
                  >
                    +1 Combo Action
                  </FestiveButton>
                  {currentCombo > 0 && (
                    <FestiveButton
                      variant="ghost"
                      size="sm"
                      className="!py-1 !min-h-[32px] text-xs text-amber-400/70"
                      onClick={resetCombo}
                    >
                      Reset Combo
                    </FestiveButton>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Proceed to Next Stage or Return */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-amber-500/20">
              <FestiveButton
                variant="ghost"
                size="md"
                onClick={goToMainMenu}
                className="w-full sm:w-auto text-amber-400 hover:text-amber-200"
              >
                Quit to Menu
              </FestiveButton>

              <FestiveButton
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                icon={ChevronRight}
                iconPosition="right"
                onClick={() => handleProceedNext(stage.baseScore)}
                id={`complete-stage-${stage.number}-btn`}
              >
                {stage.number === 4 ? 'Enter Grand Morya Celebration' : 'Complete & Proceed to Next Stage'}
              </FestiveButton>
            </div>
          </div>
        </FestiveCard>
      </main>
    </div>
  );
}
