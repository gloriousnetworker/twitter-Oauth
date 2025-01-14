import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async () => {
    try {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('otp', otp); // Temporarily store the OTP for verification

      // Step 1: Set up OAuth URL with the new redirect URI
      const clientId = import.meta.env.VITE_TWITTER_API_KEY;
      const redirectUri = `${window.location.origin}/verify-otp`; // Updated redirect URI
      const state = encodeURIComponent('twitter_auth_state');
      const scope = encodeURIComponent('tweet.read users.read dm.write offline.access');

      // Replace the code_challenge with a proper challenge if using PKCE
      const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

      // Step 2: Send the OTP via Twitter DM using an API (dummy implementation)
      // Replace with your backend API that interacts with Twitter API
      await axios.post('/api/send-otp', {
        otp,
        twitterHandle: 'user_twitter_handle', // You need to dynamically fetch or pass the Twitter handle
      });

      // Step 3: Redirect the user to Twitter's OAuth URL
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating login:', error);
      alert('Failed to initiate login process.');
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
