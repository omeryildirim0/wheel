"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Dice emojis corresponding to numbers 1-6
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const LuckOfTheDice = () => {
  const [playerCount, setPlayerCount] = useState<number>(2); // Default to 2 players
  const [playerRolls, setPlayerRolls] = useState<(number | null)[]>(Array(2).fill(null)); // Array of rolls for each player
  const [rolling, setRolling] = useState<number | null>(null); // Track which player is currently rolling
  const [result, setResult] = useState<string | null>(null);

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayerCount = Number(e.target.value);
    setPlayerCount(newPlayerCount);
    setPlayerRolls(Array(newPlayerCount).fill(null)); // Reset the rolls array based on player count
    setResult(null);
    setRolling(null); // Reset rolling status
  };

  const rollDiceForPlayer = (index: number) => {
    setRolling(index); // Mark the player as rolling
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      const newRolls = [...playerRolls];
      newRolls[index] = roll;
      setPlayerRolls(newRolls);
      setRolling(null); // Stop rolling animation

      // Check if all players have rolled (filter out nulls)
      if (newRolls.every((roll) => roll !== null)) {
        // Safely filter nulls and compute result
        const validRolls = newRolls.filter((roll): roll is number => roll !== null);
        const lowestRoll = Math.min(...validRolls); // Now TypeScript knows these are numbers
        const playerToPay = newRolls.indexOf(lowestRoll) + 1;
        setResult(`Player ${playerToPay} pays for the meal with a roll of ${lowestRoll}!`);
      }
    }, 1000); // Simulate a rolling delay of 1 second
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Luck of the Dice</h1>

      {/* Player count input */}
      <div className="mb-4">
        <label className="mr-2 text-lg">Number of Players:</label>
        <input
          type="number"
          value={playerCount}
          onChange={handlePlayerCountChange}
          min="2"
          max="10"
          className="px-2 py-1 border rounded"
        />
      </div>

      {/* Player Rolls */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Player Rolls:</h2>
        <ul className="space-y-4">
          {playerRolls.map((roll, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span className="text-lg">Player {index + 1}: </span>

              {/* Show rolling animation or dice face */}
              {rolling === index ? (
                <motion.span
                  animate={{ rotate: [0, 360] }} // Simple rolling effect
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl"
                >
                  🎲
                </motion.span>
              ) : (
                <span className="text-4xl">{roll !== null ? diceFaces[roll - 1] : "❓"}</span>
              )}

              <button
                onClick={() => rollDiceForPlayer(index)}
                className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ${
                  roll !== null ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={roll !== null || rolling !== null} // Disable button if player has already rolled or another player is rolling
              >
                {roll !== null ? "Rolled" : "Roll Dice"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-red-600">{result}</h2>
        </motion.div>
      )}
    </div>
  );
};

export default LuckOfTheDice;
