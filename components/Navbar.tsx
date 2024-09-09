"use client"; // Ensure the Navbar is a client component

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton'; // Adjust the import path if needed

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 relative top-0 left-0 w-full z-150">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        {/* Homepage Link */}
        <a
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
        >
          Wheel of Meals
        </a>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/blog" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">
            Blog
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">
            About Us
          </Link>
          
          {/* Theme Toggle Button */}
          <ThemeToggleButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
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
        <div className="md:hidden px-6 py-4 space-y-4">
          <Link href="/blog" className="block text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">
            Blog
          </Link>
          <Link href="/about" className="block text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">
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
