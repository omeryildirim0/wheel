"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // For classnames if needed

// Web Audio API-based sound generation for 'click' and 'bang' sounds
const playClickSound = () => {
  const context = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(500, context.currentTime); // Frequency for the click sound
  gainNode.gain.setValueAtTime(0.1, context.currentTime); // Set volume

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.05); // Short "click" sound
};

const playBangSound = () => {
  const context = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(120, context.currentTime); // Low frequency for 'bang'
  gainNode.gain.setValueAtTime(1, context.currentTime); // Set volume

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.3); // Longer "bang" sound
};

const RussianRoulette = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState<string>('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [chamberPosition, setChamberPosition] = useState<number>(0);  // Track revolver chamber
  const [bulletChamber, setBulletChamber] = useState<number>(Math.floor(Math.random() * 6)); // Random bullet position
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [boom, setBoom] = useState<boolean>(false);  // Track BOOM animation

  const addPlayer = () => {
    if (newPlayer.trim() !== '') {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const pullTrigger = () => {
    if (players.length === 0 || gameOver) return;

    const currentChamber = chamberPosition % 6;
    
    if (currentChamber === bulletChamber) {
      // Gun fired, end game
      setGameOver(true);
      playBangSound();
      setBoom(true); // Trigger BOOM effect
      setTimeout(() => setBoom(false), 1000); // Remove BOOM effect after 1 second
    } else {
      // Empty chamber
      playClickSound();
      setChamberPosition(chamberPosition + 1);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setChamberPosition(0);
    setBulletChamber(Math.floor(Math.random() * 6));  // Reset bullet position
    setBoom(false);  // Reset boom effect
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <style jsx>{`
        @keyframes boom {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-boom {
          animation: boom 1s ease-out forwards;
        }
      `}</style>
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

        {/* BOOM Animation */}
        {boom && (
          <div className="flex justify-center items-center mt-8">
            <span className="text-6xl font-extrabold text-red-600 animate-boom">
              BOOM!
            </span>
          </div>
        )}
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
