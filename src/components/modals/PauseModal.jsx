import React from 'react';
import { Play, RotateCcw, Home, Settings as SettingsIcon } from 'lucide-react';
import FestiveModal from '../ui/FestiveModal.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { MODALS, SCREENS } from '../../constants/gameData.js';

export default function PauseModal() {
  const { activeModal, closeModal, openModal, goToMainMenu, startGame } = useGame();
  const isOpen = activeModal === MODALS.PAUSE;

  return (
    <FestiveModal
      isOpen={isOpen}
      onClose={closeModal}
      title="Festival Paused"
      subtitle="Lord Ganesha awaits your return"
      maxWidth="max-w-sm"
      id="pause-modal"
    >
      <div className="space-y-3 pt-2">
        <FestiveButton
          variant="primary"
          size="md"
          className="w-full justify-center"
          icon={Play}
          onClick={closeModal}
        >
          Resume Celebration
        </FestiveButton>

        <FestiveButton
          variant="secondary"
          size="md"
          className="w-full justify-center"
          icon={SettingsIcon}
          onClick={() => openModal(MODALS.SETTINGS)}
        >
          Audio & Settings
        </FestiveButton>

        <FestiveButton
          variant="outline"
          size="md"
          className="w-full justify-center"
          icon={RotateCcw}
          onClick={() => {
            closeModal();
            startGame();
          }}
        >
          Restart from Stage 1
        </FestiveButton>

        <FestiveButton
          variant="ghost"
          size="md"
          className="w-full justify-center text-amber-400"
          icon={Home}
          onClick={goToMainMenu}
        >
          Quit to Main Menu
        </FestiveButton>
      </div>
    </FestiveModal>
  );
}
