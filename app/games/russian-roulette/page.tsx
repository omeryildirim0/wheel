"use client";
import { motion } from 'framer-motion';

const StyledRevolver = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-64 h-96 flex flex-col items-center">
        {/* Barrel */}
        <div className="absolute top-0 w-16 h-16 bg-[#f2cc99] rounded-full border-4 border-gray-700 flex justify-center items-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-gray-700"></div>
        </div>

        {/* Chamber */}
        <div className="relative top-10 w-32 h-32 bg-gray-200 border-4 border-gray-700 rounded-full flex justify-center items-center">
          {/* Bullet Slots */}
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="absolute w-6 h-6 bg-gray-400 rounded-full border-2 border-gray-700"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${idx * 60}deg) translate(50px)`,
              }}
            />
          ))}
        </div>

        {/* Handle */}
        <div className="absolute top-44 w-12 h-32 bg-[#a67b5b] rounded-b-full border-4 border-gray-700"></div>

        {/* Bullets */}
        <div className="absolute top-60 left-40 flex flex-col items-center space-y-2">
          <div className="w-4 h-12 bg-gray-400 rounded-full border-2 border-gray-700"></div>
          <div className="w-8 h-4 bg-gray-400 rounded-full border-2 border-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default StyledRevolver;
