import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the OTP page
    navigate("/otp");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Twitter Login</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login with Twitter
      </button>
    </div>
  );
};

export default Login;
