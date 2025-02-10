import React from "react";
import logo from "../../assets/logo.png"; // Ensure correct path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons"; // Import correct icon


const Header = () => {
  const userProfile = null; // Replace with actual user profile URL

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-green-50 border-b border-green-300 shadow-lg">
      {/* Logo Section - Aligned more to the left */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="FarmEasy Logo"
          className="w-16 h-16 rounded-full border-4 border-green-600 shadow-lg hover:scale-105 transition-transform"
        />
        <h1 className="text-2xl font-bold text-green-800 tracking-wide hidden sm:block">
          FarmEasy
        </h1>
      </div>

      {/* Navigation Menu - More spacing between items */}
      <nav className="hidden lg:flex gap-x-10">
        <a href="/" className="text-green-700 font-medium text-lg hover:text-green-900 transition duration-300">
          Home
        </a>
        <a href="/team" className="text-green-700 font-medium text-lg hover:text-green-900 transition duration-300">
          Team
        </a>
        <a href="/features" className="text-green-700 font-medium text-lg hover:text-green-900 transition duration-300">
          Features
        </a>
        <a href="/blog" className="text-green-700 font-medium text-lg hover:text-green-900 transition duration-300">
          Blog
        </a>
        <a href="/about" className="text-green-700 font-medium text-lg hover:text-green-900 transition duration-300">
          About
        </a>
      </nav>

      {/* Search Bar & Profile Section */}
      <div className="flex items-center gap-6">
        <div className="relative max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 pl-10 text-gray-700 bg-gray-100 rounded-full border border-green-400 focus:border-green-600 focus:ring-2 focus:ring-green-300 transition"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
            fill="currentColor"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"/>
          </svg>
        </div>

        {/* Profile Picture */}
        {/* <img
          src={userProfile || defaultProfile}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-green-600 shadow-md cursor-pointer"
        /> */}

<FontAwesomeIcon icon={faUserTie} className="text-green-700 text-3xl" />

        {/* Mobile Menu Button */}
        <button className="lg:hidden">
          <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;



