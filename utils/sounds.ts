
export class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private bgmOsc: OscillatorNode | null = null;
  private bgmGain: GainNode | null = null;
  private bgmLfo: OscillatorNode | null = null;

  playBgm() {
    this.init();
    if (!this.ctx || this.bgmOsc) return;

    // Create a dark, mysterious drone
    this.bgmOsc = this.ctx.createOscillator();
    this.bgmGain = this.ctx.createGain();
    this.bgmLfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();

    this.bgmOsc.type = 'sawtooth';
    this.bgmOsc.frequency.setValueAtTime(40, this.ctx.currentTime); // Low bass drone

    this.bgmLfo.type = 'sine';
    this.bgmLfo.frequency.setValueAtTime(0.5, this.ctx.currentTime); // Slow oscillation
    lfoGain.gain.setValueAtTime(10, this.ctx.currentTime);

    this.bgmLfo.connect(lfoGain);
    lfoGain.connect(this.bgmOsc.frequency);

    this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.bgmGain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2); // Fade in

    // Add a low-pass filter for character
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.Q.setValueAtTime(10, this.ctx.currentTime);

    this.bgmOsc.connect(filter);
    filter.connect(this.bgmGain);
    this.bgmGain.connect(this.ctx.destination);

    this.bgmOsc.start();
    this.bgmLfo.start();
  }

  stopBgm() {
    if (this.bgmGain && this.ctx) {
      const g = this.bgmGain;
      const osc = this.bgmOsc;
      const lfo = this.bgmLfo;
      
      g.gain.cancelScheduledValues(this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1); // Fade out
      
      setTimeout(() => {
        osc?.stop();
        lfo?.stop();
      }, 1000);
      
      this.bgmOsc = null;
      this.bgmGain = null;
      this.bgmLfo = null;
    }
  }

  playFlap() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playScore() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playHit() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(20, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }
}

export const sounds = new SoundManager();
