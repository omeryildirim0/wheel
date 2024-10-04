"use client";
// components/RussianRoulette.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // For classnames if needed

const clickSound = '/sounds/click.mp3';  // Add sound path
const bangSound = '/sounds/bang.mp3';    // Add sound path

const RussianRoulette = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState<string>('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [chamberPosition, setChamberPosition] = useState<number>(0);  // Track revolver chamber
  const [bulletChamber, setBulletChamber] = useState<number>(Math.floor(Math.random() * 6)); // Random bullet position
  const [gameOver, setGameOver] = useState<boolean>(false);

  const addPlayer = () => {
    if (newPlayer.trim() !== '') {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  const pullTrigger = () => {
    if (players.length === 0 || gameOver) return;

    const currentChamber = chamberPosition % 6;
    
    if (currentChamber === bulletChamber) {
      // Gun fired, end game
      setGameOver(true);
      playSound(bangSound);
    } else {
      // Empty chamber
      playSound(clickSound);
      setChamberPosition(chamberPosition + 1);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setChamberPosition(0);
    setBulletChamber(Math.floor(Math.random() * 6));  // Reset bullet position
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Russian Roulette</h1>

        {/* Add Player Section */}
        <div className="mb-4">
          <Input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Enter player's name"
            className="w-full mb-2"
          />
          <Button onClick={addPlayer} className="w-full">Add Player</Button>
        </div>

        {/* Player List */}
        <div className="mb-4">
          <ul className="list-disc list-inside">
            {players.map((player, idx) => (
              <li key={idx} className={`text-lg ${idx === currentPlayerIndex ? 'font-bold' : ''}`}>
                {player} {idx === currentPlayerIndex ? '- Current Turn' : ''}
              </li>
            ))}
          </ul>
        </div>

        {/* Trigger Button */}
        {!gameOver ? (
          <Button onClick={pullTrigger} className="w-full mb-4">Pull the Trigger</Button>
        ) : (
          <Button onClick={resetGame} className="w-full mb-4">Reset Game</Button>
        )}

        {gameOver && (
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-red-600">Game Over!</h2>
            <p className="text-lg">{players[currentPlayerIndex]} pays the bill!</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Revolver />
        </div>
      </Card>
    </div>
  );
};

const Revolver = () => {
  return (
    <div className="flex justify-center">
      <img src="/revolver.svg" alt="Revolver" className="h-64 w-auto" />
    </div>
  );
};


export default RussianRoulette;
