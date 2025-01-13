import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg">Hello, {user?.name}!</p>
      <p className="text-sm text-gray-500">{user?.twitterHandle}</p>
    </div>
  );
};

export default Dashboard;
