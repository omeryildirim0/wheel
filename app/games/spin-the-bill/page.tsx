"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion'; // Optional for animation

const RussianRoulette = () => {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add name to the list
  const handleAddName = () => {
    if (input) {
      setNames([...names, input]);
      setInput('');
    }
  };

  // Pick a random player as "bullet" victim
  const handleRouletteSpin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setSelectedName(names[randomIndex]);
      setIsLoading(false);
    }, 2000); // simulate suspense
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Russian Roulette: Who Pays?</h2>
        
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
            <li key={idx} className="text-lg">{name}</li>
          ))}
        </ul>

        {selectedName && !isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold text-red-600">💥 {selectedName} pays the bill!</h3>
          </motion.div>
        )}

        <Button onClick={handleRouletteSpin} disabled={isLoading || names.length === 0}>
          {isLoading ? 'Spinning...' : 'Pull the Trigger!'}
        </Button>
      </Card>
    </div>
  );
};

export default RussianRoulette;

