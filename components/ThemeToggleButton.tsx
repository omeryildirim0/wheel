"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Prevent rendering until mounted to avoid flickering
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
    >
      {theme === 'light' ? '🌜 Dark Mode' : '🌞 Light Mode'}
    </button>
  );
};

export default ThemeToggleButton;
