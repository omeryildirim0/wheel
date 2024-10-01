// PlayerForm.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PlayerForm() {
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState('');

  const handleAddPlayer = () => {
    if (name.trim()) {
      setPlayers([...players, name]);
      setName(''); // Reset input field
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Players</h1>
      <div className="flex space-x-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player's name"
        />
        <Button onClick={handleAddPlayer}>Add Player</Button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Players:</h2>
        <ul className="list-disc pl-5">
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
