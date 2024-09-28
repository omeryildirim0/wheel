"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

const SpinTheBill = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [wheelPlayers, setWheelPlayers] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const addPlayer = () => {
    if (input.trim() !== '') {
      setPlayers((prev) => [...prev, input.trim()]);
      setInput('');
    }
  };

  const removePlayer = (player: string) => {
    setPlayers((prev) => prev.filter((p) => p !== player));
  };

  const spinWheel = () => {
    if (players.length > 1) {
      const randomIndex = Math.floor(Math.random() * players.length);
      setSelectedPlayer(players[randomIndex]);
    }
  };

  useEffect(() => {
    setWheelPlayers(players);
  }, [players]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Spin the Bill</h1>
      
      <div className="flex gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Enter name" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="w-64"
        />
        <Button onClick={addPlayer} className="bg-blue-500 text-white">Add Player</Button>
      </div>

      <div className="flex flex-col items-center mb-8">
        {players.length > 0 ? (
          <ul className="mb-4">
            {players.map((player, index) => (
              <li key={index} className="flex justify-between w-64 p-2 bg-white shadow rounded mb-2">
                {player}
                <button onClick={() => removePlayer(player)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No players added yet.</p>
        )}
      </div>

      {players.length > 1 && (
        <Button onClick={spinWheel} className="bg-green-500 text-white mb-6">Spin the Wheel</Button>
      )}

      {selectedPlayer && (
        <div className="text-xl font-semibold text-green-600 mt-4">
          {selectedPlayer} will pay the bill!
        </div>
      )}
    </div>
  );
};

export default SpinTheBill;
