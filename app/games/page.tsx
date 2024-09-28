import Link from 'next/link';

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Wheel of Meals Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Game 1: Spin the Bill */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Spin the Bill</h2>
          <p className="text-gray-600 mb-6 text-center">
            Spin the wheel and let fate decide who pays the bill! Perfect for group dining.
          </p>
          <Link href="/games/spin-the-bill" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
            Play Now
          </Link>
        </div>


        {/* Game 2: Luck of the Dice */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Luck of the Dice</h2>
          <p className="text-gray-600 mb-6 text-center">
            Roll the dice and see who gets lucky! The player with the lowest roll pays for the meal.
          </p>
          <Link href="/games/dice" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
            Play Now
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default GamesPage;
