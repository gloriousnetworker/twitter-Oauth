import React from "react";

const Dashboard = () => {
  const token = localStorage.getItem("twitterToken");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <h1>Welcome to the UNICRYPTO Dashboard</h1>
      <p>You have successfully logged in!</p>
    </div>
  );
};

export default Dashboard;
