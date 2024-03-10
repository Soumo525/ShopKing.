import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";
//import logo from '../../../public/1.png'
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* <div>
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10"
          />
        </div> */}
        <Link to="/">
        <p className="text-3xl  font-bold text-white">ShopKing</p>
        </Link>
        <nav className="hidden lg:flex lg:items-center">
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className="text-white hover:text-gray-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/tshirt"
                className="text-white hover:text-gray-300"
              >
               Shop
              </a>
            </li>
            <li>
              <a
                href="/service"
                className="text-white hover:text-gray-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-white hover:text-gray-300"
              >
                 Contact
              </a>
            </li>
          </ul>
        </nav>
        <Link to="/cartitem">
        <BsCart2 color="white" size={22} style={{ marginLeft: '90px' }} />
        </Link>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none focus:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
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
      {isMenuOpen && (
        <nav className="lg:hidden">
          <ul className="flex flex-col items-center">
            <li>
              <a
                href="/"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/tshirt"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/service"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
