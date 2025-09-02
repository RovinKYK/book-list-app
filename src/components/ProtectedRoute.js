import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // If still loading authentication status, show a loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
