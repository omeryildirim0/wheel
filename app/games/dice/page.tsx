"use client"; // Add this at the top of the file

import { useState } from "react";

const LuckOfTheDice = () => {
  const [playerRolls, setPlayerRolls] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const rollDice = () => {
    // Roll dice for 4 players
    const rolls = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 6) + 1);
    setPlayerRolls(rolls);

    // Find the player with the lowest roll
    const lowestRoll = Math.min(...rolls);
    const playerToPay = rolls.indexOf(lowestRoll) + 1;
    setResult(`Player ${playerToPay} pays for the meal with a roll of ${lowestRoll}!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Luck of the Dice</h1>

      <button
        onClick={rollDice}
        className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700"
      >
        Roll the Dice
      </button>

      {playerRolls.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Player Rolls:</h2>
          <ul className="space-y-2">
            {playerRolls.map((roll, index) => (
              <li key={index} className="text-lg">
                Player {index + 1}: {roll}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-red-600">{result}</h2>
        </div>
      )}
    </div>
  );
};

export default LuckOfTheDice;
