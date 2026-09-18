import React from 'react';
import { Sparkles, Palette, Trophy, Leaf, HeartHandshake, ShieldCheck } from 'lucide-react';
import FestiveModal from '../ui/FestiveModal.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { MODALS, STAGES } from '../../constants/gameData.js';

export default function HowToPlayModal() {
  const { activeModal, closeModal, startGame } = useGame();
  const isOpen = activeModal === MODALS.HOW_TO_PLAY;

  const stageIcons = [Sparkles, Palette, Trophy, Leaf];

  return (
    <FestiveModal
      isOpen={isOpen}
      onClose={closeModal}
      title="How to Play"
      subtitle="Your Sacred Duty as the Festival Guardian"
      maxWidth="max-w-2xl"
      id="how-to-play-modal"
    >
      <div className="space-y-6">
        {/* Story Intro */}
        <div className="p-4 rounded-xl bg-amber-900/30 border border-amber-500/20 text-amber-100">
          <p className="text-sm sm:text-base leading-relaxed">
            Welcome, <strong>Festival Guardian</strong>! Ganesh Chaturthi has arrived, and Lord Ganesha (Morya) is arriving to bless our community. Your mission is to prepare an auspicious, joyous, and eco-friendly celebration across 4 engaging stages.
          </p>
        </div>

        {/* 4 Stages Breakdown */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base sm:text-lg text-amber-200">
            The 4 Stages of Celebration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STAGES.map((stage, idx) => {
              const Icon = stageIcons[idx] || Sparkles;
              return (
                <div
                  key={stage.id}
                  className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-500/20 flex gap-3 items-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 text-amber-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-100">
                      Stage {stage.number}: {stage.title}
                    </h4>
                    <p className="text-xs text-amber-300/80 mt-1 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scoring & Reverence Rules */}
        <div className="p-4 rounded-xl bg-stone-900/60 border border-amber-500/20 space-y-2">
          <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            Contest Standards & Guardian Ethics
          </h4>
          <ul className="text-xs sm:text-sm text-amber-200/80 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Respectful Representation:</strong> Lord Ganesha is represented with pure dignity, devotion, and reverence.
            </li>
            <li>
              <strong>Scoring Formula:</strong> Final Score = Stage Points + Combo Multipliers + Remaining Time Bonuses + Eco Spirit Score.
            </li>
            <li>
              <strong>Play Again:</strong> You can replay any time to hone your guardian skills and achieve a higher score.
            </li>
          </ul>
        </div>

        {/* Action button */}
        <div className="flex justify-end gap-3 pt-2">
          <FestiveButton variant="outline" size="sm" onClick={closeModal}>
            Close
          </FestiveButton>
          <FestiveButton
            variant="primary"
            size="sm"
            onClick={() => {
              closeModal();
              startGame();
            }}
          >
            Start Celebration
          </FestiveButton>
        </div>
      </div>
    </FestiveModal>
  );
}
