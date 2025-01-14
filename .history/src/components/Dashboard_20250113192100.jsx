// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authState.isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl">Welcome to your Dashboard</h2>
    </div>
  );
};

export default Dashboard;
