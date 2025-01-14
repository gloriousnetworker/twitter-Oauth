import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async () => {
    try {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('otp', otp); // Store OTP temporarily

      // Twitter Bearer Token (Replace with your actual Bearer Token)
      const bearerToken = import.meta.env.VITE_TWITTER_BEARER_TOKEN;

      // Twitter DM endpoint (Replace 'recipient_id' with actual recipient user ID)
      const twitterDMEndpoint = `https://api.twitter.com/2/direct_messages/events/new.json`;

      // DM payload to send the OTP
      const dmPayload = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: "recipient_user_id" }, // Replace with actual Twitter user ID
            message_data: { text: `Your OTP is: ${otp}` },
          },
        },
      };

      // Send OTP via Twitter API
      await axios.post(twitterDMEndpoint, dmPayload, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      });

      // Redirect to verify-otp screen
      window.location.href = `${window.location.origin}/verify-otp`;
    } catch (error) {
      console.error("Error initiating login:", error);
      alert("Failed to send OTP or initiate login process.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login with Twitter</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Login with Twitter
      </button>
    </div>
  );
};

export default Login;
