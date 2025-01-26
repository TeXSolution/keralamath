import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('access_token'); // Check if the user has an access token

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
