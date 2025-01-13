import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TwitterLogin from "react-twitter-auth"; // Ensure correct import

const Login = () => {
  const { login, generateOtp } = useAuth();
  const navigate = useNavigate();
  const [authUrl, setAuthUrl] = useState("");

  const handleTwitterLogin = async (response) => {
    if (response && response.oauth_token && response.oauth_token_secret) {
      try {
        // Step 1: Get oauth_token and oauth_token_secret
        const oauthToken = response.oauth_token;
        const oauthTokenSecret = response.oauth_token_secret;

        // Step 2: Request access token from Twitter API
        const accessTokenResponse = await axios.post("https://api.twitter.com/oauth/access_token", {
          oauth_token: oauthToken,
          oauth_token_secret: oauthTokenSecret,
        });

        // Assuming we get access token and user info from Twitter
        if (accessTokenResponse.data) {
          const { oauth_token, oauth_token_secret, user_id, screen_name } = accessTokenResponse.data;

          // Step 3: Send OTP via Twitter DM (simulate OTP sending via Twitter)
          const otp = generateOtp();
          console.log("Generated OTP:", otp);

          // Send OTP via DM (assuming API to send DM is configured)
          await axios.post("https://api.twitter.com/1.1/direct_messages/events/new.json", {
            event: {
              type: "message_create",
              message_create: {
                target: {
                  recipient_id: user_id,
                },
                message_data: {
                  text: `Your OTP is: ${otp}`,
                },
              },
            },
          });

          // Store the OTP for validation on the OTP page
          localStorage.setItem("generatedOtp", otp);

          // Step 4: Login the user (store user data in context)
          login({ user_id, screen_name });

          // Redirect to OTP page for verification
          navigate("/otp");
        } else {
          console.error("Error: No access token returned.");
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
        loginUrl="https://api.twitter.com/oauth/authenticate" // Twitter login URL
        onFailure={handleTwitterLogin}
        onSuccess={handleTwitterLogin}
        requestTokenUrl="https://api.twitter.com/oauth/request_token" // This is needed to get request token
        className="bg-blue-500 text-white px-6 py-3 rounded shadow"
      >
        Login with Twitter
      </TwitterLogin>
    </div>
  );
};

export default Login;
