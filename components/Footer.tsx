// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-4">
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
