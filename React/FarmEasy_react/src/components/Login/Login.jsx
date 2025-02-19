import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch(login(data.user));
        console.log("Login successful:", data);
  
        // Navigate based on user role
        if (data.user.role === "Seller") {
          navigate("/seller");
        } else if (data.user.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setErrorMessage(data.message || "Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("Unable to connect to the server. Try again later.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* SignUp Link */}
          <div className="text-center text-sm text-gray-600">
            Yet not registered?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign Up
            </Link>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
