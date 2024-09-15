"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton'; 

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSpinClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1500); // Reset spin after 1.5 seconds
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 shadow-md py-4 relative top-0 left-0 w-full z-150">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        {/* Homepage Link */}
        <a
          href="/"
          className={`text-3xl font-extrabold text-white transform transition duration-300 ease-in-out cursor-pointer shadow-lg ${
            isSpinning ? 'animate-spin-multiple' : 'hover:scale-105 hover:text-yellow-300'
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          onClick={handleSpinClick}
        >
          Wheel of Meals
        </a>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/blog" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">
            Blog
          </Link>
          <Link href="/about" className="text-white hover:text-gray-200 transition duration-300 ease-in-out">
            About
          </Link>
          
          {/* Theme Toggle Button */}
          <ThemeToggleButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {/* Icon for mobile menu toggle */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
          <Link href="/blog" className="block text-white hover:text-gray-200 transition duration-300 ease-in-out">
            Blog
          </Link>
          <Link href="/about" className="block text-white hover:text-gray-200 transition duration-300 ease-in-out">
            About Us
          </Link>
          
          {/* Theme Toggle Button */}
          <ThemeToggleButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
