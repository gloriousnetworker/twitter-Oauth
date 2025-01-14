// src/components/Login.jsx

import React, { useState } from "react";
import { TwitterLogin } from "react-twitter-auth"; // Import the TwitterLogin component
import axios from "axios";

const Login = () => {
  const [authStatus, setAuthStatus] = useState("");

  // Callback function to handle successful login
  const handleTwitterResponse = async (response) => {
    if (response.status === 200) {
      const { oauth_token, oauth_token_secret } = response.data;

      // You can store these tokens in React state or local storage for future use
      setAuthStatus("Logged in successfully");

      // Example of sending a Direct Message to user after successful login (using the API)
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
              Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
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

      {/* Twitter OAuth login */}
      <TwitterLogin
        loginUrl={`https://api.twitter.com/oauth/authenticate?oauth_token=${process.env.REACT_APP_TWITTER_API_KEY}`}
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
