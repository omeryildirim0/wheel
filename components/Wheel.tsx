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

  // Contrasting colors for better visibility
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C33',
    '#FFD733', '#8C33FF', '#33FFF5', '#F533FF', '#33FF8C',
    '#5733FF', '#A633FF', '#FF5733', '#FF3380', '#33FFB2',
    '#FF8C33', '#57FF33', '#33A6FF', '#FF3380', '#B233FF'
  ];

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <div id="wheel" className="w-80 h-80 rounded-full border-8 border-blue-500 relative overflow-hidden">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex items-center justify-center text-center`}
              style={{
                transform: `rotate(${index * (360 / restaurants.length)}deg)`,
                backgroundColor: colors[index % colors.length],
                clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`,
              }}
            >
              <span
                style={{
                  transform: `rotate(${(360 / restaurants.length) / 2}deg) translateY(-40%) rotate(-${index * (360 / restaurants.length)}deg)`,
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
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-red-500 absolute top-[-16px] left-[50%] transform -translate-x-1/2"></div>
      </div>
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
