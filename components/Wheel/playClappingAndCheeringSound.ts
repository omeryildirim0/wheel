import { useRef } from 'react';

const playClappingAndCheeringSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const context = audioContextRef.current;

    // Simulate cheering using an oscillator
    const cheerOscillator = context.createOscillator();
    cheerOscillator.type = 'sawtooth'; // Sawtooth wave for a rougher cheering sound
    cheerOscillator.frequency.setValueAtTime(200, context.currentTime); // Lower frequency for a base cheering sound
    cheerOscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 1.0); // Increase pitch over time

    const cheerGain = context.createGain();
    cheerGain.gain.setValueAtTime(0.2, context.currentTime); // Start volume
    cheerGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1.0); // Fade out slowly

    cheerOscillator.connect(cheerGain);
    cheerGain.connect(context.destination);

    // Simulate clapping using noise bursts
    const createClap = (delay: number) => {
      const clapBuffer = context.createBuffer(1, context.sampleRate * 0.1, context.sampleRate);
      const output = clapBuffer.getChannelData(0);
      for (let i = 0; i < clapBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1; // White noise
      }

      const clapSource = context.createBufferSource();
      clapSource.buffer = clapBuffer;

      const clapGain = context.createGain();
      clapGain.gain.setValueAtTime(0.3, context.currentTime + delay); // Start volume
      clapGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + delay + 0.1); // Quickly fade out

      clapSource.connect(clapGain);
      clapGain.connect(context.destination);

      clapSource.start(context.currentTime + delay);
      clapSource.stop(context.currentTime + delay + 0.1); // Short duration for the clap
    };

    // Start cheering
    cheerOscillator.start();
    cheerOscillator.stop(context.currentTime + 1.0);

    // Create multiple claps
    createClap(0.0);
    createClap(0.2);
    createClap(0.4);
    createClap(0.6);
    createClap(0.8);
  };

export default playClappingAndCheeringSound;