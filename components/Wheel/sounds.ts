export const playClappingAndCheeringSound = (audioContextRef: React.MutableRefObject<AudioContext | null>): void => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  const context = audioContextRef.current!; // Use non-null assertion since we know it's initialized

  // Simulate cheering using an oscillator
  const cheerOscillator = context.createOscillator();
  cheerOscillator.type = 'sawtooth'; 
  cheerOscillator.frequency.setValueAtTime(200, context.currentTime); 
  cheerOscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 1.0); 

  const cheerGain = context.createGain();
  cheerGain.gain.setValueAtTime(0.2, context.currentTime); 
  cheerGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1.0); 

  cheerOscillator.connect(cheerGain);
  cheerGain.connect(context.destination);

  const createClap = (delay: number) => {
    const clapBuffer = context.createBuffer(1, context.sampleRate * 0.1, context.sampleRate);
    const output = clapBuffer.getChannelData(0);
    for (let i = 0; i < clapBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1; 
    }

    const clapSource = context.createBufferSource();
    clapSource.buffer = clapBuffer;

    const clapGain = context.createGain();
    clapGain.gain.setValueAtTime(0.3, context.currentTime + delay);
    clapGain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + delay + 0.1);

    clapSource.connect(clapGain);
    clapGain.connect(context.destination);

    clapSource.start(context.currentTime + delay);
    clapSource.stop(context.currentTime + delay + 0.1);
  };

  cheerOscillator.start();
  cheerOscillator.stop(context.currentTime + 1.0);

  createClap(0.0);
  createClap(0.2);
  createClap(0.4);
  createClap(0.6);
  createClap(0.8);
};
