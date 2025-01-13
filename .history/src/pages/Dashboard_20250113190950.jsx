import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const { authData, logout } = useAuth();
  const history = useHistory();

  if (!authData) {
    history.push('/login'); // Redirect to login if no authentication
  }

  const handleLogout = () => {
    logout();
    history.push('/login'); // Redirect to login after logout
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>You are logged in with Twitter</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
