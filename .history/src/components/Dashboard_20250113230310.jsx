import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const user = new URLSearchParams(location.search).get('user');
  const userData = user ? JSON.parse(user) : null;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {userData ? (
        <div>
          <h2>Hello, {userData.profile.displayName}</h2>
          <img src={userData.profile.photos[0].value} alt="Profile" />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Dashboard;
