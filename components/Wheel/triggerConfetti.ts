import confetti from 'canvas-confetti'; // Correctly import the confetti module

export const triggerConfetti = (): void => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};
