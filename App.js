// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import ResumePage from './ResumePage';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
