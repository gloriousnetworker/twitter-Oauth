// src/components/Login.jsx

import React, { useState } from "react";
import { TwitterLogin } from "react-twitter-auth"; // Import the TwitterLogin component
import axios from "axios";

const Login = () => {
  const [authStatus, setAuthStatus] = useState("");

  const TWITTER_BEARER_TOKEN = import.meta.env.VITE_TWITTER_BEARER_TOKEN;
  const TWITTER_API_KEY = import.meta.env.VITE_TWITTER_API_KEY;

  const handleTwitterResponse = async (response) => {
    if (response.status === 200) {
      const { oauth_token, oauth_token_secret } = response.data;

      setAuthStatus("Logged in successfully");

      // Example of sending a Direct Message
      try {
        const sendMessageResponse = await axios.post(
          `https://api.twitter.com/1.1/direct_messages/events/new.json`,
          {
            event: {
              type: "message_create",
              message_create: {
                target: { recipient_id: "user_id" }, // Replace with actual user ID
                message_data: { text: "Your OTP is: 123456" },
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Direct Message Sent: ", sendMessageResponse.data);
      } catch (error) {
        console.error("Error sending DM:", error);
      }
    } else {
      setAuthStatus("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login with Twitter</h2>

      <TwitterLogin
        loginUrl={`https://api.twitter.com/oauth/authenticate?oauth_token=${TWITTER_API_KEY}`}
        onFailure={(error) => console.error("Error during login:", error)}
        onSuccess={handleTwitterResponse}
        requestTokenUrl="https://api.twitter.com/oauth/request_token"
        showIcon={true}
        buttonText="Login with Twitter"
      />

      {authStatus && <p>{authStatus}</p>}
    </div>
  );
};

export default Login;
