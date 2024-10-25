// HamburgerMenu.js

import React, { useState } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      <div className="text-white text-lg">Logo</div>
      <div className="block lg:hidden">
        <button
          className="flex items-center text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      <ul
        className={`${isOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-4`}
      >
        <li>
          <a href="#" className="text-white hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-400">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-400">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-400">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
