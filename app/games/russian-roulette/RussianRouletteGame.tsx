"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const RussianRoulette = () => {
  const [bulletPosition, setBulletPosition] = useState(Math.floor(Math.random() * 6)); // Random bullet chamber
  const [currentSlot, setCurrentSlot] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const pullTrigger = () => {
    if (currentSlot === bulletPosition) {
      setGameOver(true);
      alert("Bang! You pay the bill!");
    } else {
      alert("Click! You're safe.");
      setCurrentSlot(currentSlot + 1);
      if (currentSlot === 5) {
        // If the last chamber was reached, reset
        setBulletPosition(Math.floor(Math.random() * 6));
        setCurrentSlot(0);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-4">Russian Roulette</h1>
      <p className="text-lg mb-6">Take your turn. Will you pay the bill?</p>
      <Button onClick={pullTrigger} disabled={gameOver}>
        Pull the Trigger
      </Button>
      {gameOver && (
        <Button onClick={() => { setGameOver(false); setCurrentSlot(0); setBulletPosition(Math.floor(Math.random() * 6)); }}>
          Play Again
        </Button>
      )}
    </div>
  );
};

export default RussianRoulette;
