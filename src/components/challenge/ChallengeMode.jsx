import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Trophy,
  ArrowLeft,
  Flame,
  Palette,
  Leaf,
  CheckCircle2,
  Clock,
  Play,
  Award,
} from 'lucide-react';
import FestiveCard from '../ui/FestiveCard.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import Diya from '../festive/Diya.jsx';
import PandalBlitz from './PandalBlitz.jsx';
import RangoliMaster from './RangoliMaster.jsx';
import MushakRush from './MushakRush.jsx';
import EcoGuardian from './EcoGuardian.jsx';
import { CHALLENGES, CHALLENGE_IDS } from '../../constants/challengeData.js';
import { getStoredChallengeStats } from '../../services/challengeStats.js';
import { soundManager } from '../../services/soundManager.js';
import { useGame } from '../../context/GameContext.jsx';

export default function ChallengeMode({ onBackToMainMenu }) {
  const { checkCollectionUnlocks } = useGame();
  const [activeTrial, setActiveTrial] = useState(null);
  const [stats, setStats] = useState(() => getStoredChallengeStats());

  // Refresh stats whenever returning to Hub
  useEffect(() => {
    if (activeTrial === null) {
      setStats(getStoredChallengeStats());
      checkCollectionUnlocks?.();
    }
  }, [activeTrial, checkCollectionUnlocks]);

  const handleStartChallenge = (challengeId) => {
    soundManager.playButton();
    setActiveTrial(challengeId);
  };

  const handleBackToHub = () => {
    soundManager.playButton();
    setActiveTrial(null);
  };

  // Render individual active trial if selected
  if (activeTrial === CHALLENGE_IDS.PANDAL_BLITZ) {
    return (
      <PandalBlitz
        onBackToChallenges={handleBackToHub}
        onMainMenu={onBackToMainMenu}
      />
    );
  }

  if (activeTrial === CHALLENGE_IDS.RANGOLI_MASTER) {
    return (
      <RangoliMaster
        onBackToChallenges={handleBackToHub}
        onMainMenu={onBackToMainMenu}
      />
    );
  }

  if (activeTrial === CHALLENGE_IDS.MUSHAK_RUSH) {
    return (
      <MushakRush
        onBackToChallenges={handleBackToHub}
        onMainMenu={onBackToMainMenu}
      />
    );
  }

  if (activeTrial === CHALLENGE_IDS.ECO_GUARDIAN) {
    return (
      <EcoGuardian
        onBackToChallenges={handleBackToHub}
        onMainMenu={onBackToMainMenu}
      />
    );
  }

  // Helper to extract specific challenge stats
  const getTrialStats = (challengeId) => {
    switch (challengeId) {
      case CHALLENGE_IDS.PANDAL_BLITZ:
        return {
          bestScore: stats.pandalBlitz?.bestScore || 0,
          completed: stats.pandalBlitz?.completed || false,
          metricLabel: 'Best Time Remaining',
          metricValue: stats.pandalBlitz?.bestTimeRemaining
            ? `${stats.pandalBlitz.bestTimeRemaining}s`
            : null,
        };
      case CHALLENGE_IDS.RANGOLI_MASTER:
        return {
          bestScore: stats.rangoliMaster?.bestScore || 0,
          completed: stats.rangoliMaster?.completed || false,
          metricLabel: 'Best Accuracy',
          metricValue: stats.rangoliMaster?.bestAccuracy
            ? `${stats.rangoliMaster.bestAccuracy}%`
            : null,
        };
      case CHALLENGE_IDS.MUSHAK_RUSH:
        return {
          bestScore: stats.mushakRush?.bestScore || 0,
          completed: stats.mushakRush?.completed || false,
          metricLabel: 'Peak Combo',
          metricValue: stats.mushakRush?.bestCombo
            ? `${stats.mushakRush.bestCombo}x`
            : null,
        };
      case CHALLENGE_IDS.ECO_GUARDIAN:
        return {
          bestScore: stats.ecoGuardian?.bestScore || 0,
          completed: stats.ecoGuardian?.completed || false,
          metricLabel: 'Highest Eco Spirit',
          metricValue: stats.ecoGuardian?.highestEcoSpirit
            ? `${stats.ecoGuardian.highestEcoSpirit}/100`
            : null,
        };
      default:
        return { bestScore: 0, completed: false, metricLabel: null, metricValue: null };
    }
  };

  const completedCount = stats.challengesCompleted || 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Hub Top Bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3 pt-1 pb-4 z-10">
        <FestiveButton
          variant="outline"
          size="sm"
          className="text-amber-200 border-amber-500/40"
          icon={ArrowLeft}
          onClick={() => {
            soundManager.playButton();
            onBackToMainMenu();
          }}
          id="hub-back-to-main-btn"
        >
          Main Menu
        </FestiveButton>

        {/* Mastered Badge */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-bold shadow-md">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>{completedCount} / 4 Trials Mastered</span>
        </div>
      </header>

      {/* Hub Hero Header */}
      <div className="text-center max-w-xl mx-auto my-2 z-10">
        <div className="flex items-center justify-center gap-3 mb-1">
          <Diya size="sm" isGlowing={true} />
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400">
            🎯 Morya Challenge
          </h1>
          <Diya size="sm" isGlowing={true} />
        </div>
        <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
          “Four trials. One Festival Guardian.”
        </p>
      </div>

      {/* 4 Trial Cards Grid */}
      <main className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 my-auto py-2 z-10">
        {CHALLENGES.map((challenge) => {
          const trialStats = getTrialStats(challenge.id);

          return (
            <FestiveCard
              key={challenge.id}
              className="relative flex flex-col justify-between p-4 sm:p-5 border-amber-500/30 bg-stone-950/85 hover:border-amber-400/60 transition-all duration-200 shadow-xl"
            >
              <div>
                {/* Header row: Emoji, Title, Completed badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl sm:text-3xl p-2 rounded-2xl bg-amber-950/60 border border-amber-500/20">
                      {challenge.emoji}
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-heading font-extrabold uppercase tracking-wide text-amber-200">
                        {challenge.title}
                      </h2>
                      <p className="text-xs text-amber-300/80 font-medium">
                        {challenge.subtitle}
                      </p>
                    </div>
                  </div>

                  {trialStats.completed && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Mastered
                    </span>
                  )}
                </div>

                {/* Description & Objective */}
                <p className="text-xs text-stone-300 mb-3 leading-relaxed">
                  {challenge.description}
                </p>

                {/* Trial Specs */}
                <div className="space-y-1.5 mb-4 text-[11px] sm:text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Time Limit: {challenge.timeLimit}s</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300/70">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                    <span>{challenge.scoringInfo}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Record + Action */}
              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-semibold">
                    Personal Best
                  </span>
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-heading font-bold text-yellow-200">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{trialStats.bestScore.toLocaleString()} pts</span>
                  </div>
                  {trialStats.metricValue && (
                    <span className="text-[10px] text-amber-300/70">
                      {trialStats.metricLabel}: {trialStats.metricValue}
                    </span>
                  )}
                </div>

                <FestiveButton
                  variant="primary"
                  size="md"
                  icon={Play}
                  onClick={() => handleStartChallenge(challenge.id)}
                  id={`play-${challenge.id}-btn`}
                  className="font-heading font-bold text-xs sm:text-sm px-4 py-2"
                >
                  Start Trial
                </FestiveButton>
              </div>
            </FestiveCard>
          );
        })}
      </main>

      {/* Hub Footer */}
      <footer className="w-full max-w-4xl mx-auto flex items-center justify-center pt-3 pb-1 z-10">
        <p className="text-[11px] text-amber-300/60 text-center">
          Independent Festival Trials · Records stored separately in Morya Challenge logs
        </p>
      </footer>
    </div>
  );
}
