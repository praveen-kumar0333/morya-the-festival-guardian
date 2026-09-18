import React from 'react';
import { GameProvider, useGame } from './context/GameContext.jsx';
import { SCREENS } from './constants/gameData.js';
import FestiveBackground from './components/festive/FestiveBackground.jsx';
import FestiveToast from './components/ui/FestiveToast.jsx';
import AchievementToast from './components/achievements/AchievementToast.jsx';
import MainMenu from './components/screens/MainMenu.jsx';
import GrandMorya from './components/finale/GrandMorya.jsx';
import PandalBuild from './components/games/pandal/PandalBuild.jsx';
import RangoliRush from './components/games/rangoli/RangoliRush.jsx';
import ModakMushak from './components/games/mushak/ModakMushak.jsx';
import EcoCelebration from './components/games/eco/EcoCelebration.jsx';
import AchievementsScreen from './components/achievements/AchievementsScreen.jsx';
import PersonalBestScreen from './components/stats/PersonalBestScreen.jsx';
import ChallengeMode from './components/challenge/ChallengeMode.jsx';
import FestivalCollectionScreen from './screens/FestivalCollectionScreen.jsx';
import FestivalJourneyScreen from './screens/FestivalJourneyScreen.jsx';
import CollectionUnlockToast from './components/festive/CollectionUnlockToast.jsx';
import StageTransition from './components/festive/StageTransition.jsx';

// Modals
import HowToPlayModal from './components/modals/HowToPlayModal.jsx';
import SettingsModal from './components/modals/SettingsModal.jsx';
import CreditsModal from './components/modals/CreditsModal.jsx';
import HighScoresModal from './components/modals/HighScoresModal.jsx';
import PauseModal from './components/modals/PauseModal.jsx';

function GameScreenRouter() {
  const { currentScreen, setCurrentScreen } = useGame();

  switch (currentScreen) {
    case SCREENS.MAIN_MENU:
      return <MainMenu />;
    case SCREENS.FESTIVAL_JOURNEY:
      return (
        <FestivalJourneyScreen
          onBackToMainMenu={() => setCurrentScreen(SCREENS.MAIN_MENU)}
        />
      );
    case SCREENS.PANDAL_BUILD:
      return <PandalBuild />;
    case SCREENS.RANGOLI_RUSH:
      return <RangoliRush />;
    case SCREENS.MODAK_MUSHAK:
      return <ModakMushak />;
    case SCREENS.GRAND_MORYA:
      return <GrandMorya />;
    case SCREENS.ECO_CELEBRATION:
      return <EcoCelebration />;
    case SCREENS.ACHIEVEMENTS:
      return <AchievementsScreen />;
    case SCREENS.PERSONAL_RECORDS:
      return <PersonalBestScreen />;
    case SCREENS.CHALLENGE_MODE:
      return (
        <ChallengeMode
          onBackToMainMenu={() => setCurrentScreen(SCREENS.MAIN_MENU)}
        />
      );
    case SCREENS.FESTIVAL_COLLECTION:
      return (
        <FestivalCollectionScreen
          onBackToMainMenu={() => setCurrentScreen(SCREENS.MAIN_MENU)}
        />
      );
    default:
      return <MainMenu />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <FestiveBackground>
        {/* Core Game View */}
        <GameScreenRouter />

        {/* Global Modals */}
        <HowToPlayModal />
        <SettingsModal />
        <CreditsModal />
        <HighScoresModal />
        <PauseModal />

        {/* Global Toast, Transition & Achievement Notifications */}
        <StageTransition />
        <FestiveToast />
        <AchievementToast />
        <CollectionUnlockToast />
      </FestiveBackground>
    </GameProvider>
  );
}
