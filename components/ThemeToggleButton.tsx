"use client"; // Ensure this component is treated as a client component

import React from 'react';
import { useTheme } from '../components/ThemeProvider'; // Adjust the import path as needed

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
    >
      {theme === 'light' ? '🌜 Switch to Dark Mode' : '🌞 Switch to Light Mode'}
    </button>
  );
};

export default ThemeToggleButton;
