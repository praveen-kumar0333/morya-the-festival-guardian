import React from 'react';
import {
  Play,
  HelpCircle,
  Settings as SettingsIcon,
  Users,
  Trophy,
  Volume2,
  VolumeX,
  Music,
  Sparkles,
  Shield,
  Heart,
  Award,
  Target,
  Gift,
  Compass,
} from 'lucide-react';
import { useGame } from '../../context/GameContext.jsx';
import { GAME_TITLE, TEAM_NAME, TAGLINE, MODALS, SCREENS } from '../../constants/gameData.js';
import FestiveButton from '../ui/FestiveButton.jsx';
import FestiveCard from '../ui/FestiveCard.jsx';
import Diya from '../festive/Diya.jsx';
import MarigoldGarland from '../festive/MarigoldGarland.jsx';

export default function MainMenu() {
  const {
    startGame,
    openModal,
    highScore,
    settings,
    toggleSound,
    toggleMusic,
    setCurrentScreen,
  } = useGame();

  return (
    <main className="w-full flex-1 flex flex-col justify-between items-center px-4 py-3 sm:py-6 relative z-10 max-w-5xl mx-auto min-h-[92vh]">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-2 pt-1 pb-2">
        {/* Team Name Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/30 backdrop-blur-md text-xs font-semibold text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Team {TEAM_NAME}</span>
        </div>

        {/* Audio Quick Toggles & High Score pill */}
        <div className="flex items-center gap-2">
          {highScore > 0 && (
            <button
              onClick={() => openModal(MODALS.HIGH_SCORES)}
              className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-400/30 text-xs font-bold text-amber-200 hover:bg-amber-900/60 transition-colors"
              title="View Hall of Devotion"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Best: {highScore.toLocaleString()}</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={settings.soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            title={settings.soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-amber-500/50" />
            )}
          </button>

          <button
            onClick={toggleMusic}
            className="p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={settings.musicEnabled ? 'Stop Ambient Music' : 'Start Ambient Music'}
            title={settings.musicEnabled ? 'Ambient Music: On' : 'Ambient Music: Off'}
          >
            <Music className={`w-4 h-4 ${settings.musicEnabled ? 'text-amber-400' : 'text-amber-500/50'}`} />
          </button>
        </div>
      </div>

      {/* Decorative Marigold Garland at Top */}
      <MarigoldGarland className="my-1 max-w-2xl" />

      {/* Hero Center Section: Sacred Motif, Title, & Play Button */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-3 sm:my-6 w-full max-w-xl">
        {/* Sacred Festive Emblem with Glowing Diyas on flanking sides */}
        <div className="relative flex items-center justify-center my-2 sm:my-3">
          {/* Left Diya */}
          <div className="hidden sm:block absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2">
            <Diya size={54} />
          </div>

          {/* Central Sacred Ganesha Silhouette Halo */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-amber-500/20 via-orange-600/15 to-transparent p-1 border border-amber-400/40 shadow-2xl shadow-amber-500/20 flex items-center justify-center backdrop-blur-sm">
            {/* Radiant pulse ring */}
            <div className="absolute inset-0 rounded-full border border-amber-300/30 animate-gentle-pulse" />

            {/* Sacred Ganesha Iconography (Devotional & Respectful Line Art) */}
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 sm:w-24 sm:h-24 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Crown / Mukut */}
              <path d="M40 22 L50 12 L60 22 L55 26 L45 26 Z" fill="rgba(245, 158, 11, 0.3)" />
              <circle cx="50" cy="14" r="2" fill="#FDE047" />

              {/* Sacred Tilak / Trishul on forehead */}
              <path d="M48 28 L48 35 M52 28 L52 35 M50 30 L50 37" stroke="#EF4444" strokeWidth="2" />
              <circle cx="50" cy="38" r="1.5" fill="#EF4444" />

              {/* Head and Large Auspicious Ears */}
              <path d="M42 28 C 30 26, 22 36, 32 46 C 36 50, 42 46, 42 40" />
              <path d="M58 28 C 70 26, 78 36, 68 46 C 64 50, 58 46, 58 40" />

              {/* Sacred Curved Trunk (Vamamukhi - curved gently to left, holding sweet Modak) */}
              <path d="M47 38 C 47 50, 43 62, 38 68 C 34 72, 28 68, 30 63 C 32 58, 37 60, 39 63" />

              {/* Single Holy Tusk */}
              <path d="M42 45 L38 47" />

              {/* Sweet Modak Prasad in Trunk */}
              <circle cx="28" cy="62" r="3.5" fill="#FDE047" stroke="#B45309" strokeWidth="1" />

              {/* Divine Aura Arc */}
              <path d="M22 72 C 28 85, 72 85, 78 72" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Right Diya */}
          <div className="hidden sm:block absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2">
            <Diya size={54} />
          </div>
        </div>

        {/* Mobile Diyas visible below icon on small screens */}
        <div className="flex sm:hidden justify-center gap-12 my-1">
          <Diya size={38} />
          <Diya size={38} />
        </div>

        {/* Game Title */}
        <div className="space-y-1.5 mt-2 sm:mt-4">
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400 drop-shadow-sm">
            {GAME_TITLE}
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-medium max-w-md mx-auto leading-snug">
            {TAGLINE}
          </p>
        </div>

        {/* Sacred Chanting / Invocation Badge */}
        <div className="my-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ganpati Bappa Morya! Mangal Murti Morya!</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        {/* Primary Action & Game Modes Hierarchy */}
        <div className="w-full max-w-sm space-y-3 mt-1 sm:mt-2">
          {/* Primary: Festival Mode */}
          <FestiveButton
            variant="primary"
            size="lg"
            className="w-full text-lg sm:text-xl font-heading font-bold shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40"
            icon={Play}
            onClick={startGame}
            id="play-button"
            aria-label="Start Festival Mode"
          >
            Start Festival
          </FestiveButton>

          {/* Secondary: Challenge Mode */}
          <FestiveButton
            variant="secondary"
            size="md"
            className="w-full text-sm sm:text-base font-heading font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-amber-50 border-amber-400/50 shadow-md shadow-orange-950/40"
            icon={Target}
            onClick={() => setCurrentScreen(SCREENS.CHALLENGE_MODE)}
            id="challenge-mode-button"
            aria-label="Enter Challenge Mode"
          >
            Challenge Mode
          </FestiveButton>

          {/* Progression Section Header */}
          <div className="pt-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px bg-amber-500/20 flex-1" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/70">
                Festival Progression
              </span>
              <div className="h-px bg-amber-500/20 flex-1" />
            </div>

            {/* Progression Portal Cards */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <FestiveButton
                variant="secondary"
                size="md"
                className="text-xs sm:text-sm font-heading font-bold bg-gradient-to-r from-amber-950/80 via-yellow-950/70 to-amber-950/80 hover:from-amber-900/80 hover:to-yellow-900/80 border-amber-400/40 text-amber-200"
                icon={Compass}
                onClick={() => setCurrentScreen(SCREENS.FESTIVAL_JOURNEY)}
                id="festival-journey-button"
                aria-label="View Festival Journey"
              >
                Journey
              </FestiveButton>

              <FestiveButton
                variant="secondary"
                size="md"
                className="text-xs sm:text-sm font-heading font-bold bg-gradient-to-r from-amber-950/80 via-yellow-950/70 to-amber-950/80 hover:from-amber-900/80 hover:to-yellow-900/80 border-amber-400/40 text-amber-200"
                icon={Gift}
                onClick={() => setCurrentScreen(SCREENS.FESTIVAL_COLLECTION)}
                id="festival-collection-button"
                aria-label="View Festival Collection"
              >
                Collection
              </FestiveButton>

              <FestiveButton
                variant="secondary"
                size="md"
                icon={Award}
                onClick={() => setCurrentScreen(SCREENS.ACHIEVEMENTS)}
                className="text-xs sm:text-sm bg-gradient-to-r from-amber-950/70 to-stone-900/80 border-amber-500/30 text-amber-300"
                id="achievements-menu-button"
                aria-label="View Achievements"
              >
                Achievements
              </FestiveButton>

              <FestiveButton
                variant="secondary"
                size="md"
                icon={Trophy}
                onClick={() => setCurrentScreen(SCREENS.PERSONAL_RECORDS)}
                className="text-xs sm:text-sm bg-gradient-to-r from-amber-950/70 to-stone-900/80 border-amber-500/30 text-amber-300"
                id="my-records-menu-button"
                aria-label="View Personal Records"
              >
                My Records
              </FestiveButton>
            </div>
          </div>

          {/* Guide & Preferences Section */}
          <div className="pt-1 space-y-2 w-full">
            <div className="grid grid-cols-2 gap-2 w-full">
              <FestiveButton
                variant="outline"
                size="md"
                icon={HelpCircle}
                onClick={() => openModal(MODALS.HOW_TO_PLAY)}
                className="text-xs sm:text-sm"
                id="how-to-play-button"
                aria-label="How to Play"
              >
                How to Play
              </FestiveButton>

              <FestiveButton
                variant="outline"
                size="md"
                icon={SettingsIcon}
                onClick={() => openModal(MODALS.SETTINGS)}
                className="text-xs sm:text-sm"
                id="settings-button"
                aria-label="Game Settings"
              >
                Settings
              </FestiveButton>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full">
              <FestiveButton
                variant="outline"
                size="md"
                icon={Trophy}
                onClick={() => openModal(MODALS.HIGH_SCORES)}
                className="text-xs sm:text-sm"
                id="high-scores-button"
                aria-label="View High Scores"
              >
                High Scores
              </FestiveButton>

              <FestiveButton
                variant="outline"
                size="md"
                icon={Users}
                onClick={() => openModal(MODALS.CREDITS)}
                className="text-xs sm:text-sm"
                id="credits-button"
                aria-label="View Credits"
              >
                Credits
              </FestiveButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Contest Badge */}
      <footer className="w-full text-center py-2 text-xs text-amber-400/60 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Ganesh Chaturthi Game Design Contest</span>
        </div>
        <div className="text-amber-300/80">
          Created with devotion by <strong className="text-amber-200">Morya Makers</strong>
        </div>
      </footer>
    </main>
  );
}
