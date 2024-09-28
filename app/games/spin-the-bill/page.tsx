"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion'; // Optional for animation


const RussianRoulette = () => {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [activePlayer, setActivePlayer] = useState(0);
  const [bulletChamber] = useState(Math.floor(Math.random() * 6)); // One random chamber will hold the "bullet"
  const [currentChamber, setCurrentChamber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Add names to the game
  const handleAddName = () => {
    if (input) {
      setNames([...names, input]);
      setInput('');
    }
  };

  // Spin the revolver and check if the bullet is fired
  const handlePullTrigger = () => {
    setIsLoading(true);

    // Simulate spinning and trigger pull
    setTimeout(() => {
      const nextChamber = (currentChamber + 1) % 6; // Spin to next chamber
      setCurrentChamber(nextChamber);

      if (nextChamber === bulletChamber) {
        setGameOver(true); // Bang! The game ends
      } else {
        setActivePlayer((activePlayer + 1) % names.length); // Move to next player
      }

      setIsLoading(false);
    }, 2000); // Delay to simulate tension
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Russian Roulette: Who Pays?</h2>
        
        {!gameOver ? (
          <>
            <div className="flex space-x-2 mb-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a name"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
              <Button onClick={handleAddName}>Add Name</Button>
            </div>

            <ul className="mb-4">
              {names.map((name, idx) => (
                <li
                  key={idx}
                  className={`text-lg ${activePlayer === idx ? 'font-bold text-red-500' : ''}`}
                >
                  {name}
                </li>
              ))}
            </ul>

            {/* Revolver animation */}
            <div className="relative flex justify-center items-center mb-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: currentChamber * 60 }}
                transition={{ duration: 1 }}
                className="w-24 h-24 border-2 border-gray-400 rounded-full"
              >
                <div className="absolute w-6 h-6 bg-red-600 rounded-full top-2 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute w-6 h-6 bg-gray-400 rounded-full top-16 left-1/2 transform -translate-x-1/2"></div>
              </motion.div>
            </div>

            <Button onClick={handlePullTrigger} disabled={isLoading || names.length === 0}>
              {isLoading ? 'Spinning...' : `Pull the Trigger (${names[activePlayer]})`}
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-bold text-red-600"
          >
            💥 {names[activePlayer]} pays the bill!
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default RussianRoulette;
