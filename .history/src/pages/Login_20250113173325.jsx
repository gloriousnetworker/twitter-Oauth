import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, generateOtp } = useAuth();
  const navigate = useNavigate();

  const handleTwitterLogin = async () => {
    try {
      // Simulate user data returned from Twitter OAuth
      const userData = {
        name: "Mock Twitter User",
        twitterHandle: "@mockuser",
        id: "12345",
      };
      login(userData);

      // Generate OTP
      const otp = generateOtp();
      console.log("Generated OTP:", otp); // Display OTP for testing purposes

      navigate("/otp"); // Navigate to OTP verification page
    } catch (error) {
      console.error("Error during Twitter login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login with Twitter</h1>
      <button
        onClick={handleTwitterLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded shadow"
      >
        Login with Twitter
      </button>
    </div>
  );
};

export default Login;
