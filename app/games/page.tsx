import Link from 'next/link';

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Wheel of Meals Games</h1>

      <div className="flex flex-col space-y-4">
        {/* Game 1 Link */}
        <Link href="/games/spin-the-bill" className="text-indigo-600 hover:underline">
          Spin the Bill
        </Link>

        {/* Game 2 Link */}
        <Link href="/games/tip-multiplier" className="text-indigo-600 hover:underline">
          Tip Multiplier
        </Link>

        {/* Game 3 Link */}
        <Link href="/games/dice" className="text-indigo-600 hover:underline">
          Luck of the Dice
        </Link>
      </div>
    </div>
  );
};

export default GamesPage;
