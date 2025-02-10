// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Import useSelector to access the Redux state

const ProtectedRoute = ({ children }) => {
  // Access the user authentication state from Redux
  const user = useSelector((state) => state.auth.user); // Adjust according to your state structure

  // If no user (i.e., not authenticated), redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
