// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Brand and Description */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl font-bold">Wheel of Meals</h1>
          <p className="text-sm mt-2">
            Discover new dining experiences with a spin of the wheel!
          </p>
        </div>

        {/* Center Section: Links */}
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="text-sm hover:text-yellow-500">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="text-sm hover:text-yellow-500">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm hover:text-yellow-500">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex justify-center md:justify-end space-x-6">
          <a
            href="https://twitter.com"
            className="text-xl hover:text-yellow-500"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-xl hover:text-yellow-500"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com"
            className="text-xl hover:text-yellow-500"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="text-center mt-6">
        <p className="text-xs">
          © {new Date().getFullYear()} Wheel of Meals. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
