import React from 'react';
import { Volume2, VolumeX, Music, Pause, Home } from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { MODALS, STAGES } from '../../constants/gameData.js';
import ScoreBadge from './ScoreBadge.jsx';
import GameTimer from './GameTimer.jsx';
import FestiveButton from './FestiveButton.jsx';

export default function GameHUD({
  stageId,
  timeLimit = 45,
  secondsRemaining,
  onTimeUp,
  onTick,
  isPaused = false,
  className = '',
  id,
}) {
  const {
    scores,
    currentCombo,
    calculateTotalScore,
    settings,
    toggleSound,
    toggleMusic,
    openModal,
    goToMainMenu,
  } = useGame();

  const currentStage = STAGES.find((s) => s.id === stageId) || STAGES[0];
  const totalScore = calculateTotalScore(scores);

  return (
    <header
      id={id || 'game-hud'}
      className={`w-full bg-stone-950/80 border-b border-amber-500/20 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-40 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Home / Stage Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FestiveButton
            variant="ghost"
            size="icon"
            onClick={goToMainMenu}
            aria-label="Return to Main Menu"
            title="Return to Main Menu"
          >
            <Home className="w-5 h-5 text-amber-300" />
          </FestiveButton>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider">
              Stage {currentStage.number} of 4
            </span>
            <h2 className="font-heading font-bold text-sm sm:text-base text-amber-100 truncate max-w-[130px] sm:max-w-none">
              {currentStage.title}
            </h2>
          </div>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center justify-center">
          <GameTimer
            initialSeconds={timeLimit}
            secondsRemaining={secondsRemaining}
            isPaused={isPaused}
            onTimeUp={onTimeUp}
            onTick={onTick}
          />
        </div>

        {/* Right: Score, Combo & Quick Settings */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <ScoreBadge
            score={totalScore}
            combo={currentCombo}
            size="sm"
            label="Score"
          />

          {/* Sound & Music Toggles */}
          <div className="hidden xs:flex items-center gap-1">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/20 text-amber-300 hover:text-amber-100 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400"
              aria-label={settings.soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
              title={settings.soundEnabled ? 'Mute SFX' : 'Unmute SFX'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-amber-500/60" />
              )}
            </button>

            <button
              onClick={toggleMusic}
              className="p-2 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/20 text-amber-300 hover:text-amber-100 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400"
              aria-label={settings.musicEnabled ? 'Stop Ambient Music' : 'Start Ambient Music'}
              title={settings.musicEnabled ? 'Music On' : 'Music Off'}
            >
              <Music className={`w-4 h-4 ${settings.musicEnabled ? 'text-amber-400' : 'text-amber-500/40'}`} />
            </button>
          </div>

          <FestiveButton
            variant="secondary"
            size="sm"
            onClick={() => openModal(MODALS.PAUSE)}
            className="!min-h-[36px] !px-2.5 sm:!px-3"
            aria-label="Pause Game"
          >
            <Pause className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Pause</span>
          </FestiveButton>
        </div>
      </div>
    </header>
  );
}
