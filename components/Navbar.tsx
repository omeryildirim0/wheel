import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
      {/* Homepage Link */}
      <div className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600">
        <a href="/" className="hover:underline">Wheel of Meals</a>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8">
        <a href="/blog" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">
          Blog
        </a>
        <a href="/about" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">
          About Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
