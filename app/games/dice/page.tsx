"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const LuckOfTheDice = () => {
  const [playerCount, setPlayerCount] = useState<number>(2); // Default to 2 players
  const [playerRolls, setPlayerRolls] = useState<number[]>(Array(2).fill(null)); // Array of rolls for each player
  const [result, setResult] = useState<string | null>(null);

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayerCount = Number(e.target.value);
    setPlayerCount(newPlayerCount);
    setPlayerRolls(Array(newPlayerCount).fill(null)); // Reset the rolls array based on player count
    setResult(null);
  };

  const rollDiceForPlayer = (index: number) => {
    const newRolls = [...playerRolls];
    newRolls[index] = Math.floor(Math.random() * 6) + 1;
    setPlayerRolls(newRolls);

    // Check if all players have rolled
    if (newRolls.every(roll => roll !== null)) {
      const lowestRoll = Math.min(...newRolls);
      const playerToPay = newRolls.indexOf(lowestRoll) + 1;
      setResult(`Player ${playerToPay} pays for the meal with a roll of ${lowestRoll}!`);
    }
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
              <span className="text-lg">Player {index + 1}: {roll !== null ? roll : "Not rolled yet"}</span>
              <button
                onClick={() => rollDiceForPlayer(index)}
                className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ${roll !== null ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={roll !== null} // Disable button if player has already rolled
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
