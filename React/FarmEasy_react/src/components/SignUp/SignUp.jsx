import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Farmer", // Default value for the dropdown
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([formData]),  // ✅ No need to wrap in an array
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("API Error:", responseData);
            alert(`Error: ${responseData.message}`);
            return;
        }

        alert("User registered successfully!");

        // ✅ Store user in Redux
        dispatch(signup(responseData.users[0]));

        // ✅ Store user in localStorage
        localStorage.setItem("user", JSON.stringify(responseData.user));

        // ✅ Extract correct userId
        const userId = responseData.users[0].id || responseData.users[0].id;

        if (formData.role === "Seller") {
            const sellerCheckResponse = await fetch(`http://localhost:5000/seller/check/${userId}`);
            const sellerCheckData = await sellerCheckResponse.json();

            if (sellerCheckData.exists) {
                navigate("/seller/");
            } else  {
                alert("Please complete your seller profile setup.");
                navigate("/seller/profile-setup");
            }
        } else if(formData.role==="Farmer") {
          const farmerCheckResponse = await fetch(`http://localhost:5000/farmer/check/${userId}`);
          const farmerCheckData = await farmerCheckResponse.json();

          if (farmerCheckData.exists) {
              navigate("/home");
          } else  {
              alert("Please complete your seller profile setup.");
              navigate("/profile-check");
          }
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Failed to register the user. Please try again.");
    }
};




  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-semibold text-green-700 mb-8">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
              Role
            </label>
           <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
              required
            >
              <option value="Farmer">Farmer</option>
              <option value="Admin">Admin</option>
              <option value="Seller">Seller</option>  {/* ✅ Change from "Marketplace Holder" to "Seller" */}
            </select>

          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <Link to="/login" className="text-green-500 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
