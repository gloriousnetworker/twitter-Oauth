import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, generateOtp } = useAuth();
  const navigate = useNavigate();

  const handleTwitterLogin = async () => {
    try {
      // Replace with your backend URL handling Twitter OAuth
      const response = await axios.get(
        "https://twitter-oauth-app-wheat.vercel.app/oauth/authenticate", // Replace with your endpoint
        {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_TWITTER_API_KEY,
          },
        }
      );
      // Mock response
      const userData = {
        name: "Twitter User",
        twitterHandle: "@example",
        id: "12345",
      };
      login(userData);

      const otp = generateOtp();
      console.log("Generated OTP:", otp); // Send this OTP via Twitter DM

      navigate("/otp");
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
