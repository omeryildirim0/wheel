import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Wheel of Meals
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Welcome to Wheel of Meals! We are here to solve the everyday dilemma of choosing a place to eat. With a simple spin of our fun and interactive wheel, you can discover new dining options in your area, make mealtime decisions easier, and add a touch of excitement to your food adventures.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            At Wheel of Meals, our mission is to bring a sense of fun and spontaneity to your dining experience. We aim to help you explore new restaurants, support local businesses, and create memorable dining moments with friends and family.
          </p>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Using Wheel of Meals is simple: Enter your location, give the wheel a spin, and let fate decide where you’ll dine next! Whether you’re feeling adventurous or just indecisive, our wheel will help you discover new dining options around you.
          </p>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Wheel of Meals is designed to provide a user-friendly and visually appealing experience. With features like customizable settings, light/dark mode, and a modern design, our platform makes meal selection both fun and efficient. Plus, our restaurant data is updated regularly to ensure you always have fresh options to choose from.
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default About;
