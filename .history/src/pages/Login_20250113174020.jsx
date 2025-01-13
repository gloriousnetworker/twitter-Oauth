import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const Login = () => {
  const { login, generateOtp } = useAuth();
  const navigate = useNavigate();

  const [authUrl, setAuthUrl] = useState("");  // Store OAuth authorization URL

  const handleTwitterLogin = async () => {
    try {
      const oauth = OAuth({
        consumer: {
          key: import.meta.env.VITE_REACT_APP_TWITTER_API_KEY, 
          secret: import.meta.env.VITE_REACT_APP_TWITTER_API_SECRET, 
        },
        signature_method: "HMAC-SHA1",
        hash_function(base_string, key) {
          return crypto.createHmac("sha1", key).update(base_string).digest("base64");
        },
      });

      // Step 1: Obtain a request token from Twitter
      const requestData = {
        url: "https://api.twitter.com/oauth/request_token",
        method: "POST",
        data: {
          oauth_callback: "http://localhost:5173/callback",  // Your redirect URL
        },
      };

      const requestTokenResponse = await axios.post(requestData.url, null, {
        headers: oauth.toHeader(oauth.authorize(requestData)),
      });

      const urlParams = new URLSearchParams(requestTokenResponse.data);
      const oauthToken = urlParams.get("oauth_token");
      const oauthTokenSecret = urlParams.get("oauth_token_secret");

      // Step 2: Redirect user to Twitter for authentication
      const twitterAuthUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;
      setAuthUrl(twitterAuthUrl);

      // Mock Twitter user data for local testing
      const userData = {
        name: "Twitter User",
        twitterHandle: "@mockuser",
        id: "12345",
      };

      login(userData);  // Store user in context
      const otp = generateOtp();  // Generate OTP

      console.log("Generated OTP:", otp);  // Log OTP for testing

      navigate("/otp");  // Navigate to OTP verification page
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