import React from 'react';

interface WheelProps {
  restaurants: string[];
}

const Wheel: React.FC<WheelProps> = ({ restaurants }) => {
  const spinWheel = () => {
    const wheel = document.getElementById('wheel');
    const randomDeg = Math.floor(Math.random() * 360) + 3600; // Randomize the spin with a big number
    wheel!.style.transition = 'transform 4s ease-out';
    wheel!.style.transform = `rotate(${randomDeg}deg)`;

    setTimeout(() => {
      const selectedRestaurant = Math.floor((randomDeg % 360) / (360 / restaurants.length));
      alert(`You got ${restaurants[selectedRestaurant]}!`);
    }, 4000); // This should match the transition duration
  };

  return (
    <div className="relative flex flex-col items-center">
      <div id="wheel" className="w-80 h-80 rounded-full border-8 border-blue-500 relative overflow-hidden">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center text-center`}
            style={{
              transform: `rotate(${index * (360 / restaurants.length)}deg)`,
              backgroundColor: `hsl(${index * (360 / restaurants.length)}, 70%, 60%)`,
              clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`,
            }}
          >
            <span
              style={{
                transform: `rotate(${(360 / restaurants.length) / 2}deg) translateY(-40%)`,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {restaurant}
            </span>
          </div>
        ))}
      </div>
      <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-red-500 absolute top-0"></div>
      <button
        onClick={spinWheel}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
      >
        Spin the Wheel
      </button>
    </div>
  );
};

export default Wheel;
