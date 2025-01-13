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

        // Step 2: Redirect the user to Twitter's authorization page
        const twitterAuthUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;
        setAuthUrl(twitterAuthUrl);

        // Once logged in, generate OTP and navigate to OTP page
        const userData = {
          name: "Twitter User", 
          twitterHandle: "@mockuser", 
          id: "12345"
        };
        login(userData);
        const otp = generateOtp();
        console.log("Generated OTP:", otp);
        navigate("/otp");
      } catch (error) {
        console.error("Error during Twitter login:", error);
      }
    } else {
      console.error("OAuth response is invalid.");
    }
  };

  return (
    <TwitterOAuthProvider clientId={process.env.REACT_APP_TWITTER_API_KEY}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Login with Twitter</h1>
        <button
          onClick={() => handleTwitterLogin()} 
          className="bg-blue-500 text-white px-6 py-3 rounded shadow"
        >
          Login with Twitter
        </button>
        {authUrl && (
          <div className="mt-4">
            <a href={authUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              Authenticate with Twitter
            </a>
          </div>
        )}
      </div>
    </TwitterOAuthProvider>
  );
};

export default Login;
