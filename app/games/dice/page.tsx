"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Custom dice faces for the game
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const LuckOfTheDice = () => {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(2).fill(""));
  const [playerRolls, setPlayerRolls] = useState<([number, number] | null)[]>(Array(2).fill(null));
  const [rolling, setRolling] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayerCount = Number(e.target.value);
    setPlayerCount(newPlayerCount);
    setPlayerNames(Array(newPlayerCount).fill(""));
    setPlayerRolls(Array(newPlayerCount).fill(null));
    setResult(null);
    setRolling(null);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const rollDiceForPlayer = (index: number) => {
    setRolling(index);

    setTimeout(() => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;
      const newRolls = [...playerRolls];
      newRolls[index] = [roll1, roll2];
      setPlayerRolls(newRolls);
      setRolling(null);

      // Check if all players have rolled
      if (newRolls.every((roll) => roll !== null)) {
        const validRolls = newRolls.filter((roll): roll is [number, number] => roll !== null);
        const rollSums = validRolls.map((roll) => roll[0] + roll[1]);
        const lowestSum = Math.min(...rollSums);

        // Find the players who have the lowest sum
        const playersWithLowestRoll = rollSums
          .map((sum, i) => (sum === lowestSum ? i + 1 : null)) // Get the player indices
          .filter((player): player is number => player !== null); // Remove null values

        if (playersWithLowestRoll.length === 1) {
          // If only one player has the lowest roll
          setResult(`${playerNames[playersWithLowestRoll[0] - 1]} pays for the meal with a total of ${lowestSum}!`);
        } else {
          // If there's a tie, randomly choose one player to pay
          const randomPlayer = playersWithLowestRoll[Math.floor(Math.random() * playersWithLowestRoll.length)];
          setResult(
            `It's a tie! ${playerNames[randomPlayer - 1]} pays for the meal with a total of ${lowestSum} (randomly selected among tied players)!`
          );
        }
      }
    }, 1500); // Longer delay for animation effect
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Luck of the Dice</h1>

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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Player Names and Rolls:</h2>
        <ul className="space-y-4">
          {playerRolls.map((roll, index) => (
            <li key={index} className="flex flex-col space-y-2">
              <div className="flex justify-between items-center space-x-6">
                <span className="text-lg">Player {index + 1}: </span>
                <input
                  type="text"
                  value={playerNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Enter name for Player ${index + 1}`}
                  className="px-2 py-1 border rounded"
                />
              </div>

              <div className="flex justify-between items-center space-x-6">
                {rolling === index ? (
                  <motion.span
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.5, 1],
                      y: [-20, 20, 0],
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                    className="text-4xl"
                  >
                    🎲🎲
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-5xl"
                  >
                    {roll !== null ? `${diceFaces[roll[0] - 1]} ${diceFaces[roll[1] - 1]}` : "❓❓"}
                  </motion.span>
                )}

                <button
                  onClick={() => rollDiceForPlayer(index)}
                  className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ${
                    roll !== null ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={roll !== null || rolling !== null}
                >
                  {roll !== null ? "Rolled" : "Roll Dice"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
