"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // For animation

const LuckOfTheDice = () => {
  const [playerCount, setPlayerCount] = useState<number>(2); // Default to 2 players
  const [playerRolls, setPlayerRolls] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [rolling, setRolling] = useState<boolean>(false); // To manage animation state

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(e.target.value));
    setPlayerRolls([]); // Reset the rolls if the player count changes
    setResult(null);
  };

  const rollDice = () => {
    setRolling(true); // Start the rolling animation
    setTimeout(() => {
      const rolls = Array.from({ length: playerCount }, () =>
        Math.floor(Math.random() * 6) + 1
      );
      setPlayerRolls(rolls);

      const lowestRoll = Math.min(...rolls);
      const playerToPay = rolls.indexOf(lowestRoll) + 1;
      setResult(`Player ${playerToPay} pays for the meal with a roll of ${lowestRoll}!`);
      setRolling(false); // Stop the rolling animation
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

      <button
        onClick={rollDice}
        className={`bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 ${
          rolling ? "opacity-50" : ""
        }`}
        disabled={rolling} // Disable button during rolling animation
      >
        {rolling ? "Rolling..." : "Roll the Dice"}
      </button>

      {playerRolls.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Player Rolls:</h2>
          <ul className="space-y-2">
            {playerRolls.map((roll, index) => (
              <motion.li
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="text-lg"
              >
                Player {index + 1}: {roll}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

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
