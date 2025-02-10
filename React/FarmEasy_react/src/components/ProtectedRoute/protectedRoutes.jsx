// src/components/ProtectedRoutes.jsx
import React from 'react';
import ProtectedRoute from './protectedRoute'; // Import your protected route component

// This component should only wrap the child routes
const ProtectedRoutes = ({ children }) => {
  return <>{children}</>; // Just pass the children here
};

export default ProtectedRoutes;
