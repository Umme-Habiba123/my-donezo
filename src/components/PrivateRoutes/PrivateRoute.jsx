// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;