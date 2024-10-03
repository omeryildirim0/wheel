"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const PlayerInput = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState("");

  const addPlayer = () => {
    if (name.trim() !== "") {
      setPlayers([...players, name.trim()]);
      setName("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Player Name" />
      <Button onClick={addPlayer} className="mt-2">Add Player</Button>
      <div className="mt-4">
        {players.length > 0 && players.map((player, index) => <p key={index}>{player}</p>)}
      </div>
    </div>
  );
};

export default PlayerInput;
