// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';

function App() {
  return (
   <AuthProvider>
     <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
          <PrivateRoute>
              <Dashboard />
          </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
   </AuthProvider>
  );
}

export default App;