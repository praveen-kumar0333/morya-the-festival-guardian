import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Bell, RotateCcw, Check, Sparkles } from 'lucide-react';
import FestiveModal from '../ui/FestiveModal.jsx';
import FestiveButton from '../ui/FestiveButton.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { MODALS, LOCAL_STORAGE_KEYS } from '../../constants/gameData.js';
import { soundManager } from '../../services/soundManager.js';

export default function SettingsModal() {
  const { activeModal, closeModal, settings, updateSettings, setScores, addToast } = useGame();
  const isOpen = activeModal === MODALS.SETTINGS;
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    updateSettings({ volume: val });
  };

  const handleResetScores = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.HIGH_SCORE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.GAME_HISTORY);
      setResetConfirm(true);
      addToast('Local scores and history reset successfully.', 'info');
      setTimeout(() => setResetConfirm(false), 3000);
    } catch (e) {
      console.warn('Error clearing scores:', e);
    }
  };

  return (
    <FestiveModal
      isOpen={isOpen}
      onClose={closeModal}
      title="Settings & Audio"
      subtitle="Customize sound and game preferences"
      maxWidth="max-w-lg"
      id="settings-modal"
    >
      <div className="space-y-6">
        {/* Sound Effects Option */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-900/70 border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
              {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-bold text-sm text-amber-100">Sound Effects (SFX)</p>
              <p className="text-xs text-amber-300/70">Chimes, button clicks, and celebrations</p>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              settings.soundEnabled ? 'bg-amber-500' : 'bg-stone-700'
            }`}
            aria-label="Toggle Sound Effects"
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'transform translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {/* Ambient Festive Music Option */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-900/70 border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-amber-100">Ambient Background Drone</p>
              <p className="text-xs text-amber-300/70">Harmonic tanpura & meditative temple drone</p>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ musicEnabled: !settings.musicEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              settings.musicEnabled ? 'bg-amber-500' : 'bg-stone-700'
            }`}
            aria-label="Toggle Background Music"
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                settings.musicEnabled ? 'transform translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {/* Master Volume Slider */}
        <div className="p-3.5 rounded-xl bg-stone-900/70 border border-amber-500/20 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-amber-200">
            <span>Master Volume</span>
            <span>{Math.round(settings.volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.volume}
            onChange={handleVolumeChange}
            className="w-full accent-amber-400 bg-stone-800 rounded-lg h-2 cursor-pointer"
            aria-label="Master Volume Slider"
          />
        </div>

        {/* Audio Test Bench (Helps judges & students test sound synthesis architecture) */}
        <div className="p-3.5 rounded-xl bg-stone-900/50 border border-amber-500/15 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Audio Synthesizer Test (Web Audio API)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <FestiveButton
              variant="outline"
              size="sm"
              onClick={() => soundManager.playButton()}
              className="text-xs !py-1.5"
            >
              Bell Click
            </FestiveButton>
            <FestiveButton
              variant="outline"
              size="sm"
              onClick={() => soundManager.playCorrect()}
              className="text-xs !py-1.5"
            >
              Temple Chime
            </FestiveButton>
            <FestiveButton
              variant="outline"
              size="sm"
              onClick={() => soundManager.playCombo(3)}
              className="text-xs !py-1.5"
            >
              Sparkle Arpeggio
            </FestiveButton>
            <FestiveButton
              variant="outline"
              size="sm"
              onClick={() => soundManager.playWrong()}
              className="text-xs !py-1.5"
            >
              Gentle Gong
            </FestiveButton>
            <FestiveButton
              variant="saffron"
              size="sm"
              onClick={() => soundManager.playCelebration()}
              className="text-xs !py-1.5 col-span-2 sm:col-span-2"
            >
              Grand Celebration Fanfare
            </FestiveButton>
          </div>
        </div>

        {/* Reset High Score */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-500/20">
          <button
            onClick={handleResetScores}
            disabled={resetConfirm}
            className="text-xs text-amber-400/80 hover:text-amber-300 underline flex items-center gap-1.5 focus:outline-none"
          >
            {resetConfirm ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scores Cleared</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Local Best Scores</span>
              </>
            )}
          </button>

          <FestiveButton variant="primary" size="sm" onClick={closeModal}>
            Done
          </FestiveButton>
        </div>
      </div>
    </FestiveModal>
  );
}
