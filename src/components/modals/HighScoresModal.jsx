import React from 'react';
import { Trophy, Award, Sparkles, Flame, CheckCircle } from 'lucide-react';
import FestiveModal from '../ui/FestiveModal.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { MODALS, STAGES } from '../../constants/gameData.js';

export default function HighScoresModal() {
  const { activeModal, closeModal, highScore, maxCombo, scores } = useGame();
  const isOpen = activeModal === MODALS.HIGH_SCORES;

  return (
    <FestiveModal
      isOpen={isOpen}
      onClose={closeModal}
      title="High Scores & Hall of Devotion"
      subtitle="Your highest recorded festive achievements"
      maxWidth="max-w-md"
      id="high-scores-modal"
    >
      <div className="space-y-5">
        {/* Main High Score Showcase */}
        <div className="text-center p-5 rounded-2xl bg-gradient-to-b from-amber-900/60 to-stone-900/80 border-2 border-amber-400/40 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mb-2">
            <Trophy className="w-7 h-7" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
            Personal Best Score
          </span>
          <div className="font-heading font-black text-4xl sm:text-5xl text-amber-100 tracking-tight my-1">
            {highScore.toLocaleString()}
          </div>
          <p className="text-xs text-amber-300/70">
            Stored locally on your device browser
          </p>
        </div>

        {/* Categories Breakdown Info */}
        <div className="space-y-2 text-xs text-amber-200/90">
          <p className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            Scoring Categories:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-stone-900/70 border border-amber-500/20 flex flex-col">
              <span className="font-bold text-amber-100">Pandal Stage</span>
              <span className="text-amber-400/80">Decor speed & harmony</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900/70 border border-amber-500/20 flex flex-col">
              <span className="font-bold text-amber-100">Rangoli Rush</span>
              <span className="text-amber-400/80">Symmetry & recall</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900/70 border border-amber-500/20 flex flex-col">
              <span className="font-bold text-amber-100">Modak & Mushak</span>
              <span className="text-amber-400/80">Collection & combos</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900/70 border border-amber-500/20 flex flex-col">
              <span className="font-bold text-amber-100">Eco Spirit</span>
              <span className="text-amber-400/80">Clay & clean rituals</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <FestiveButton variant="primary" size="sm" onClick={closeModal}>
            Close
          </FestiveButton>
        </div>
      </div>
    </FestiveModal>
  );
}
