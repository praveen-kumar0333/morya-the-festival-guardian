/**
 * Audio Architecture for MORYA: THE FESTIVAL GUARDIAN
 * Supports Web Audio API procedural synthesis for immediate zero-asset playback,
 * plus clean audio hooks for external custom sound files.
 * Zero copyrighted music.
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.volume = 0.7;
    this.bgmOscillators = [];
    this.bgmGainNode = null;
    this.isBgmPlaying = false;

    // Placeholder hooks for external audio files if provided in future
    this.customAudioUrls = {
      bgm: null,
      button: null,
      correct: null,
      wrong: null,
      combo: null,
      celebration: null,
    };
  }

  // Initialize Web Audio Context after first user interaction (browser policy)
  initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setSettings({ soundEnabled, musicEnabled, volume }) {
    if (soundEnabled !== undefined) this.soundEnabled = soundEnabled;
    if (volume !== undefined) this.volume = Math.max(0, Math.min(1, volume));
    if (musicEnabled !== undefined) {
      this.musicEnabled = musicEnabled;
      if (!this.musicEnabled && this.isBgmPlaying) {
        this.stopBGM();
      } else if (this.musicEnabled && !this.isBgmPlaying) {
        this.startBGM();
      }
    }
    if (this.bgmGainNode && this.audioCtx) {
      this.bgmGainNode.gain.setValueAtTime(
        this.musicEnabled ? this.volume * 0.15 : 0,
        this.audioCtx.currentTime
      );
    }
  }

  // Soft Indian meditative harmonic tanpura/ambient drone
  startBGM() {
    if (!this.musicEnabled || this.isBgmPlaying) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      this.stopBGM();
      this.bgmGainNode = this.audioCtx.createGain();
      this.bgmGainNode.gain.setValueAtTime(this.volume * 0.15, this.audioCtx.currentTime);
      this.bgmGainNode.connect(this.audioCtx.destination);

      // Root (Sa) = 146.83 Hz (D3), Fifth (Pa) = 220.00 Hz (A3), High (Sa) = 293.66 Hz (D4)
      const frequencies = [146.83, 220.0, 293.66, 440.0];
      this.bgmOscillators = frequencies.map((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        // Gentle undulating LFO for organic meditative breathing quality
        const lfo = this.audioCtx.createOscillator();
        const lfoGain = this.audioCtx.createGain();
        lfo.frequency.setValueAtTime(0.15 + index * 0.08, this.audioCtx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start();

        gain.gain.setValueAtTime(0.06 / (index + 1), this.audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(this.bgmGainNode);
        osc.start();

        return { osc, lfo };
      });

      this.isBgmPlaying = true;
    } catch (err) {
      console.warn('Audio BGM failed to start:', err);
    }
  }

  stopBGM() {
    if (this.bgmOscillators.length > 0) {
      this.bgmOscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          osc.disconnect();
          lfo.stop();
          lfo.disconnect();
        } catch (_) {}
      });
      this.bgmOscillators = [];
    }
    this.isBgmPlaying = false;
  }

  // UI Button Click sound - crisp resonant wooden/bell chime
  playButton() {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(this.volume * 0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  // Correct Action sound - auspicious bright temple chime arpeggio
  playCorrect() {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (auspicious major chord)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.07;
      const duration = 0.4;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.volume * 0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Wrong Action sound - gentle low gong (respectful, not harsh)
  playWrong() {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(146, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  }

  // Combo multiplier sound - sparkling ascending bells
  playCombo(level = 1) {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const baseFreq = 587.33 * Math.min(2, 1 + level * 0.15); // D5
    const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.05;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.volume * 0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.32);
    });
  }

  // Celebration Sound - Grand festive bells and celebratory flourish
  playCelebration() {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;
      const duration = 0.8;

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.volume * 0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Soft celestial chime for cinematic reveal scenes
  playRevealChime(pitch = 1) {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const notes = [587.33 * pitch, 880 * pitch, 1174.66 * pitch]; // D5, A5, D6 harmonic chime
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;
      const duration = 0.55;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.volume * 0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }
}

export const soundManager = new SoundManager();
