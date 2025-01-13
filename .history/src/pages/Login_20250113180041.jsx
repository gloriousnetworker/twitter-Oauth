import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TwitterLogin from "react-twitter-auth";

const Login = () => {
  const { login, generateOtp } = useAuth();
  const navigate = useNavigate();
  const [authUrl, setAuthUrl] = useState("");

  const handleTwitterLogin = async (response) => {
    if (response && response.oauth_token && response.oauth_token_secret) {
      try {
        // Step 1: Get the oauth_token and oauth_token_secret
        const oauthToken = response.oauth_token;
        const oauthTokenSecret = response.oauth_token_secret;

        // Step 2: Send these tokens to the backend to complete the OAuth process
        const backendResponse = await axios.post("http://localhost:4000/api/v1/auth/twitter/reverse", {
          oauth_token: oauthToken,
          oauth_token_secret: oauthTokenSecret,
        });

        if (backendResponse.data && backendResponse.data.user) {
          // Step 3: Once the backend returns user data, log in the user
          const userData = backendResponse.data.user;
          login(userData);

          // Step 4: Generate OTP (if needed) and navigate to OTP page
          const otp = generateOtp();
          console.log("Generated OTP:", otp);
          navigate("/otp");
        } else {
          console.error("Error: No user data returned from backend.");
        }
      } catch (error) {
        console.error("Error during Twitter login:", error);
      }
    } else {
      console.error("OAuth response is invalid.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login with Twitter</h1>
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={handleTwitterLogin}
        onSuccess={handleTwitterLogin}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        className="bg-blue-500 text-white px-6 py-3 rounded shadow"
      >
        Login with Twitter
      </TwitterLogin>
    </div>
  );
};

export default Login;
