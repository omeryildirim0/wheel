import PlayerInput from './PlayerForm';
import RussianRoulette from './RussianRouletteGame';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Wheel of Meals Russian Roulette</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <PlayerInput />
        <RussianRoulette />
      </div>
    </div>
  );
}
