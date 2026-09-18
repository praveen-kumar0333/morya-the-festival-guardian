import React from 'react';
import { Users, Heart, Award, Shield } from 'lucide-react';
import FestiveModal from '../ui/FestiveModal.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { MODALS, GAME_TITLE, TEAM_NAME, TAGLINE } from '../../constants/gameData.js';

export default function CreditsModal() {
  const { activeModal, closeModal } = useGame();
  const isOpen = activeModal === MODALS.CREDITS;

  return (
    <FestiveModal
      isOpen={isOpen}
      onClose={closeModal}
      title="Credits & Contest Info"
      subtitle="Crafted with devotion by Morya Makers"
      maxWidth="max-w-lg"
      id="credits-modal"
    >
      <div className="space-y-5 text-amber-100">
        {/* Game Title & Team Header */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-b from-amber-900/40 to-stone-900/60 border border-amber-500/30">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Ganesh Chaturthi Game Design Contest
          </p>
          <h3 className="font-heading font-extrabold text-xl text-amber-100 mt-1">
            {GAME_TITLE}
          </h3>
          <p className="text-xs text-amber-300/80 italic mt-1">"{TAGLINE}"</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Team: {TEAM_NAME}</span>
          </div>
        </div>

        {/* Ethical Standards & Reverence */}
        <div className="space-y-3 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
          <div className="flex gap-3 items-start">
            <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-100">Reverent Representation:</strong> Lord Ganesha (Morya) is depicted with the utmost honor, grace, and spiritual joy. No disrespect or combat mechanics exist in this game.
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-100">100% Original & Ethical:</strong> Built without copyrighted audio, art, or unauthorized assets. Zero personal data collection. Built with clean, accessible React + JavaScript for students and judges.
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Award className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-100">Contest Dedication:</strong> Celebrating the traditional values of unity, creativity, ecological mindfulness, and community celebration.
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
