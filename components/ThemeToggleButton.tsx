//ThemeToggleButton.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggleButton: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure component is mounted on client-side
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  // Placeholder for consistent height before button is rendered
  if (!mounted) {
    return <div className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 invisible">Loading...</div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
    >
      {resolvedTheme === 'light' ? '🌜 Switch to Dark Mode' : '🌞 Switch to Light Mode'}
    </button>
  );
};

export default ThemeToggleButton;
