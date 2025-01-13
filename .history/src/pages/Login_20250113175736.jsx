import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TwitterLogin from "react-twitter-auth"; // Update import

const Login = () => {
  const { login, generateOtp } = useAuth();
  const navigate = useNavigate();
  const [authUrl, setAuthUrl] = useState("");

  const handleTwitterLogin = async (response) => {
    if (response && response.oauth_token) {
      try {
        // Step 1: Get the request token from Twitter OAuth
        const oauthToken = response.oauth_token;
        const oauthTokenSecret = response.oauth_token_secret;

        // Step 2: Send the request token to your backend to obtain the access token
        const res = await axios.post("http://localhost:4000/api/v1/auth/twitter/reverse", {
          oauth_token: oauthToken,
          oauth_token_secret: oauthTokenSecret,
        });

        // Step 3: Once the backend processes and returns the user data, handle it
        if (res.data && res.data.user) {
          const userData = res.data.user; // assuming user data is in res.data.user
          login(userData); // Login the user
          const otp = generateOtp();
          console.log("Generated OTP:", otp);

          // Redirect to OTP page
          navigate("/otp");
        } else {
          console.error("Error: Invalid response from backend.");
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
        onFailure={handleTwitterLogin}  // Ensure this handles failure correctly
        onSuccess={handleTwitterLogin}   // Ensure this handles success correctly
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        className="bg-blue-500 text-white px-6 py-3 rounded shadow"
      >
        Login with Twitter
      </TwitterLogin>
      {authUrl && (
        <div className="mt-4">
          <a href={authUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            Authenticate with Twitter
          </a>
        </div>
      )}
    </div>
  );
};

export default Login;
