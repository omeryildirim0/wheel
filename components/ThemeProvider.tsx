"use client"; 

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the type for the theme context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Set the default value for the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode; // Type for children
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Set default theme to 'dark'
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else {
      // Apply the default theme 'dark' if no stored theme is found
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
