"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const RevolverGame = () => {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [activePlayer, setActivePlayer] = useState(0);
  const [currentChamber, setCurrentChamber] = useState(0);
  const [bulletChamber] = useState(Math.floor(Math.random() * 6)); // Random chamber holding the bullet
  const [gameOver, setGameOver] = useState(false);

  const handleAddName = () => {
    if (input) {
      setNames([...names, input]);
      setInput("");
    }
  };

  const handlePullTrigger = () => {
    const nextChamber = (currentChamber + 1) % 6; // Rotate to next chamber
    setCurrentChamber(nextChamber);

    if (nextChamber === bulletChamber) {
      setGameOver(true); // If the chamber matches the bullet, game over
    } else {
      setActivePlayer((activePlayer + 1) % names.length); // Next player’s turn
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 w-full max-w-lg text-center bg-white rounded-md shadow-lg">
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
              <button
                onClick={handleAddName}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Name
              </button>
            </div>

            <ul className="mb-4">
              {names.map((name, idx) => (
                <li
                  key={idx}
                  className={`text-lg ${
                    activePlayer === idx ? "font-bold text-red-500" : ""
                  }`}
                >
                  {name}
                </li>
              ))}
            </ul>

            {/* Revolver Design */}
            <div className="relative w-48 h-96 flex flex-col items-center">
              {/* Barrel */}
              <div className="absolute top-0 w-24 h-24 bg-[#e0d4b9] rounded-full border-4 border-gray-700 flex justify-center items-center">
                <div className="w-10 h-10 bg-gray-400 rounded-full border-2 border-gray-700"></div>
              </div>

              {/* Chamber */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: currentChamber * 60 }}
                transition={{ duration: 1 }}
                className="relative top-24 w-40 h-40 bg-gray-200 border-4 border-gray-700 rounded-full flex justify-center items-center"
              >
                {/* Bullet Slots */}
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`absolute w-8 h-8 bg-gray-400 rounded-full border-2 border-gray-700 ${
                      idx === bulletChamber ? "bg-red-600" : ""
                    }`}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${idx * 60}deg) translate(0, -70px)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Handle */}
              <div className="absolute top-56 w-20 h-48 bg-[#a67b5b] rounded-b-full border-4 border-gray-700"></div>

              {/* Bullets */}
              <div className="absolute top-80 left-48 flex flex-col items-center space-y-2">
                <div className="w-6 h-16 bg-gray-400 rounded-full border-2 border-gray-700"></div>
                <div className="w-10 h-5 bg-gray-400 rounded-full border-2 border-gray-700"></div>
              </div>
            </div>

            <button
              onClick={handlePullTrigger}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
              disabled={names.length === 0}
            >
              Pull the Trigger ({names[activePlayer] || "Waiting..."})
            </button>
          </>
        ) : (
          <div className="text-3xl font-bold text-red-600 mt-8">
            💥 {names[activePlayer]} pays the bill!
          </div>
        )}
      </div>
    </div>
  );
};

export default RevolverGame;
