import { useCallback, useRef } from 'react';

export const useFuturisticSounds = () => {
  const audioCtx = useRef<AudioContext | null>(null);

  const initCtx = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }
  }, []);

  // Soft, airy focus sound (Velvet whoosh)
  const playHover = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    const ctx = audioCtx.current;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const noise = ctx.createBufferSource();
    
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    filter.Q.value = 1;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.1);
  }, [initCtx]);

  // Luxurious Click: Deep wood/velvet thud with a tiny gold "tink"
  const playClick = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    const ctx = audioCtx.current;

    const oscBody = ctx.createOscillator();
    const gainBody = ctx.createGain();
    oscBody.type = 'triangle';
    oscBody.frequency.setValueAtTime(110, ctx.currentTime);
    oscBody.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
    gainBody.gain.setValueAtTime(0.08, ctx.currentTime);
    gainBody.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    oscBody.connect(gainBody);
    gainBody.connect(ctx.destination);

    const oscTink = ctx.createOscillator();
    const gainTink = ctx.createGain();
    oscTink.type = 'sine';
    oscTink.frequency.setValueAtTime(3200, ctx.currentTime);
    gainTink.gain.setValueAtTime(0.01, ctx.currentTime);
    gainTink.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    oscTink.connect(gainTink);
    gainTink.connect(ctx.destination);

    oscBody.start();
    oscBody.stop(ctx.currentTime + 0.15);
    oscTink.start();
    oscTink.stop(ctx.currentTime + 0.05);
  }, [initCtx]);

  // The "Continuous Ka-Ching" Slider Tick
  const playTick = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    const ctx = audioCtx.current;

    // High frequency metallic "ching" components
    const freqs = [2400, 3200, 4800];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Extremely fast decay for a crisp "coin" feel
      gain.gain.setValueAtTime(0.006 + (i * 0.002), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    });

    // Sub-millisecond noise burst for the "ka" / mechanical friction sound
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.005, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;

    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 5000;

    noiseGain.gain.setValueAtTime(0.004, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.005);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 0.005);
  }, [initCtx]);

  // Deep resonant opening (Luxury vault feel)
  const playExpand = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lowpass = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(165, ctx.currentTime + 0.4);

    lowpass.type = 'lowpass';
    lowpass.frequency.value = 400;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, [initCtx]);

  // Grand Success: A warm orchestral-style chime (Ethereal wealth)
  const playSuccess = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    const ctx = audioCtx.current;
    
    const playResonantTone = (freq: number, delay: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      filter.type = 'lowpass';
      filter.frequency.value = freq * 2;

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.2);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 1.5);
    };

    playResonantTone(261.63, 0.00, 0.03); // C4
    playResonantTone(329.63, 0.10, 0.02); // E4
    playResonantTone(392.00, 0.20, 0.02); // G4
    playResonantTone(493.88, 0.30, 0.02); // B4
    playResonantTone(523.25, 0.45, 0.03); // C5
  }, [initCtx]);

  return { playHover, playClick, playTick, playExpand, playSuccess };
};
