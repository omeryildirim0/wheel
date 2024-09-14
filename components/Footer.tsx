import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 text-white py-4">
      <div className="container mx-auto text-center">
        {/* Navigation Links */}
        <div className="mb-2">
          <ul className="inline-flex space-x-6">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright Text */}
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} Wheel of Meals. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
