import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBell, FaSearch, FaLeaf, FaHome, FaStore } from "react-icons/fa";

const Header = () => {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-green-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left Side - Logo */}
        <Link to="/market" className="text-white text-2xl font-bold flex items-center">
          <FaLeaf className="mr-2 text-yellow-400" /> Farm Market
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/3 hidden md:block">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fresh produce, seeds, tools..."
            className="w-full p-2 pl-10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <FaSearch className="absolute top-2 left-3 text-green-800" />
        </div>

        {/* Right Side - Icons & User Dropdown */}
        <div className="flex items-center space-x-6">
          {/* Home Icon */}
          <Link to="/seller" className="text-white text-lg" title="Home">
            <FaHome />
          </Link>

          {/* Marketplace Icon (New) */}
          <Link to="/seller/AllProducts" className="text-white text-lg" title="Marketplace">
            <FaStore />
          </Link>

          {/* Notification Icon */}
         

          {/* Cart Icon */}
          <Link to="/seller/cart" className="relative text-white text-lg" title="Cart">
            <FaShoppingCart />
            <span className="absolute -top-1 -right-2 bg-green-500 text-xs rounded-full px-1">2</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-white"
            >
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <Link to="/seller/myprofile" className="block px-4 py-2 hover:bg-green-100">
                  My Profile
                </Link>
                <Link to="/seller/products" className="block px-4 py-2 hover:bg-green-100">
                  My Products
                </Link>
                <Link to="/seller/myorders" className="block px-4 py-2 hover:bg-green-100">
                  My Orders
                </Link>
                <Link to="/seller/addproduct" className="block px-4 py-2 hover:bg-green-100">
                  Add Product
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-green-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden mt-2 px-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fresh produce, seeds, tools..."
            className="w-full p-2 pl-10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <FaSearch className="absolute top-2 left-3 text-green-800" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
