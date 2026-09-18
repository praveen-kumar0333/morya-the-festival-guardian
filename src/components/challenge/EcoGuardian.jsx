import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Leaf,
  Sparkles,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Trophy,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import EcoSpiritMeter from '../games/eco/EcoSpiritMeter.jsx';
import EcoChoiceCard from '../games/eco/EcoChoiceCard.jsx';
import ChallengeResult from './ChallengeResult.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import FestiveCard from '../ui/FestiveCard.jsx';
import { CHALLENGE_IDS, CHALLENGES } from '../../constants/challengeData.js';
import { recordChallengeAttempt } from '../../services/challengeStats.js';
import { soundManager } from '../../services/soundManager.js';
import { useGame } from '../../context/GameContext.jsx';
import { SITUATIONS } from '../games/eco/ecoGameData.js';

// Safe Fisher-Yates shuffle
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function EcoGuardian({ onBackToChallenges, onMainMenu }) {
  const challengeConfig = CHALLENGES.find((c) => c.id === CHALLENGE_IDS.ECO_GUARDIAN);
  const { addToast } = useGame();

  // Lifecycle & gameplay states
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [currentDecisionIdx, setCurrentDecisionIdx] = useState(0);
  const [ecoSpirit, setEcoSpirit] = useState(50);
  const [previousSpirit, setPreviousSpirit] = useState(50);
  const [score, setScore] = useState(0);
  const [ecoChoicesCount, setEcoChoicesCount] = useState(0);

  // Prepared randomized situations & choices
  const [shuffledSituations, setShuffledSituations] = useState([]);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [completionStats, setCompletionStats] = useState(null);

  const timerRef = useRef(null);
  const completedRef = useRef(false);
  const timeRef = useRef(30);
  timeRef.current = timeRemaining;

  // Reset / Start
  const resetChallenge = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Shuffle situations and their individual choices
    const randomized = shuffleArray(SITUATIONS).slice(0, 6).map((sit) => ({
      ...sit,
      choices: shuffleArray(sit.choices),
    }));

    setShuffledSituations(randomized);
    setTimeRemaining(30);
    setCurrentDecisionIdx(0);
    setEcoSpirit(50);
    setPreviousSpirit(50);
    setScore(0);
    setEcoChoicesCount(0);
    setSelectedChoiceId(null);
    setIsEvaluating(false);
    setIsCompleted(false);
    setIsNewRecord(false);
    setCompletionStats(null);
    completedRef.current = false;

    // 1-second countdown
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    resetChallenge();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetChallenge]);

  // Handle Choice Selection
  const handleSelectChoice = (choice) => {
    if (isEvaluating || completedRef.current) return;
    setIsEvaluating(true);
    setSelectedChoiceId(choice.id);

    const isGreen = Boolean(choice.isEco);
    if (isGreen) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    // Points calculation: choice base score + 50 eco bonus if green
    const choicePoints = (choice.score || 50) + (isGreen ? 50 : 0);
    const newEcoCount = ecoChoicesCount + (isGreen ? 1 : 0);
    setEcoChoicesCount(newEcoCount);

    setPreviousSpirit(ecoSpirit);
    const newSpirit = Math.max(0, Math.min(100, ecoSpirit + (choice.ecoDelta || 0)));
    setEcoSpirit(newSpirit);
    setScore((s) => s + choicePoints);

    // Transition to next decision or victory
    setTimeout(() => {
      if (completedRef.current) return;

      if (currentDecisionIdx < shuffledSituations.length - 1) {
        setCurrentDecisionIdx((prev) => prev + 1);
        setSelectedChoiceId(null);
        setIsEvaluating(false);
      } else {
        handleVictory(newSpirit, newEcoCount, score + choicePoints);
      }
    }, 700);
  };

  // Victory (All 6 decisions made in time)
  const handleVictory = (finalSpirit, greenCount, currentTotalScore) => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    const remaining = timeRef.current;
    let bonus = 0;

    // Suggested bonuses:
    // all six eco-friendly: +300
    // final Eco Spirit >= 80: +200
    // final Eco Spirit = 100: +300
    // remaining time bonus: remaining seconds * 10
    if (greenCount === 6) bonus += 300;
    if (finalSpirit === 100) bonus += 300;
    else if (finalSpirit >= 80) bonus += 200;

    const timeBonus = remaining * 10;
    bonus += timeBonus;

    const finalScore = currentTotalScore + bonus;
    setScore(finalScore);
    soundManager.playCelebration();

    const recordResult = recordChallengeAttempt(CHALLENGE_IDS.ECO_GUARDIAN, {
      score: finalScore,
      ecoSpirit: finalSpirit,
      completed: true,
    });

    setIsNewRecord(recordResult.isNewRecord);
    if (recordResult.isNewRecord) {
      addToast('🏆 NEW CHALLENGE RECORD! Eco Guardian', 'festive', 4500);
    }

    setCompletionStats({
      finalScore,
      finalSpirit: `${finalSpirit} / 100`,
      greenDecisions: `${greenCount} / 6 Green Choices`,
      speedBonus: `+${timeBonus} pts (${remaining}s remaining)`,
      personalBest: recordResult.newBest,
    });
    setIsCompleted(true);
  };

  // Time Out
  const handleTimeUp = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    soundManager.playWrong();

    const recordResult = recordChallengeAttempt(CHALLENGE_IDS.ECO_GUARDIAN, {
      score,
      ecoSpirit,
      completed: false,
    });

    setIsNewRecord(recordResult.isNewRecord);
    setCompletionStats({
      finalScore: score,
      finalSpirit: `${ecoSpirit} / 100`,
      greenDecisions: `${ecoChoicesCount} / ${currentDecisionIdx} Decisions`,
      speedBonus: 'Time Expired',
      personalBest: recordResult.newBest,
    });
    setIsCompleted(true);
  };

  const activeSituation = shuffledSituations[currentDecisionIdx];

  if (isCompleted && completionStats) {
    return (
      <ChallengeResult
        challenge={challengeConfig}
        score={completionStats.finalScore}
        isNewRecord={isNewRecord}
        personalBest={completionStats.personalBest}
        details={[
          { label: 'Final Eco Spirit', value: completionStats.finalSpirit, icon: Leaf },
          { label: 'Eco Choices', value: completionStats.greenDecisions, icon: CheckCircle2 },
          { label: 'Time Bonus', value: completionStats.speedBonus, icon: Clock },
          { label: 'Guardian Spirit', value: 'Prakriti Rakshak', icon: ShieldCheck },
        ]}
        onPlayAgain={resetChallenge}
        onBackToChallenges={onBackToChallenges}
        onMainMenu={onMainMenu}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-2.5 sm:p-4 text-amber-50 select-none overflow-x-hidden">
      {/* Header HUD */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-stone-950/85 border border-amber-500/30 backdrop-blur-md shadow-xl z-30">
        <div className="flex items-center gap-2">
          <FestiveButton
            variant="outline"
            size="sm"
            className="p-1.5 h-8 w-8 text-amber-300"
            onClick={onBackToChallenges}
            aria-label="Back to challenges"
          >
            <ArrowLeft className="w-4 h-4" />
          </FestiveButton>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg">🌱</span>
              <h1 className="text-xs sm:text-base font-heading font-extrabold uppercase tracking-wide text-amber-300">
                Eco Guardian
              </h1>
            </div>
            <p className="text-[10px] text-amber-300/70 hidden sm:block">
              Shape the celebration with sustainable choices!
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-emerald-200 tabular-nums">
            Decision: {currentDecisionIdx + 1}/6
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold tabular-nums ${
              timeRemaining <= 8
                ? 'bg-red-950/80 border-red-500/60 text-red-300 animate-pulse'
                : 'bg-amber-950/70 border-amber-500/40 text-amber-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>TIME: {timeRemaining}s</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-500/30 text-xs sm:text-sm font-bold text-amber-300 tabular-nums">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{score.toLocaleString()} pts</span>
          </div>
        </div>
      </header>

      {/* Eco Spirit Meter Component */}
      <div className="w-full max-w-xl mx-auto my-2 px-2">
        <EcoSpiritMeter
          id="challenge-eco-meter"
          spirit={ecoSpirit}
          previousSpirit={previousSpirit}
        />
      </div>

      {/* Decision Situation Arena */}
      <main className="w-full max-w-xl my-auto py-2 flex flex-col items-center">
        {activeSituation && (
          <FestiveCard className="w-full p-4 sm:p-5 mb-4 border-amber-500/30 text-center bg-stone-950/85">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              Trial Situation {currentDecisionIdx + 1} of 6
            </span>
            <h2 className="text-base sm:text-lg font-heading font-bold text-amber-100 mt-1">
              {activeSituation.title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
              {activeSituation.scenario}
            </p>
          </FestiveCard>
        )}

        {/* 3 Choice Cards Grid */}
        <div className="w-full grid grid-cols-1 gap-2.5">
          {activeSituation?.choices.map((choice, idx) => (
            <EcoChoiceCard
              key={choice.id}
              choice={choice}
              index={idx}
              onSelect={() => handleSelectChoice(choice)}
              isSelected={selectedChoiceId === choice.id}
              isOtherSelected={selectedChoiceId !== null && selectedChoiceId !== choice.id}
              disabled={isEvaluating}
              feedbackState={
                selectedChoiceId === choice.id
                  ? choice.isEco
                    ? 'correct'
                    : 'wrong'
                  : null
              }
              earnedScore={choice.score}
              id={`challenge-choice-${choice.id}`}
            />
          ))}
        </div>
      </main>

      {/* Bottom Footer Info */}
      <footer className="w-full max-w-xl mx-auto z-20 py-1 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/60 border border-amber-500/20 text-xs text-amber-300/80">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Eco-Friendly Choices: {ecoChoicesCount} / 6</span>
        </div>
      </footer>
    </div>
  );
}
