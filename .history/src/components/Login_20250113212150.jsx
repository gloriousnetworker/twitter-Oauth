import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async () => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('otp', otp);

      // Step 1: Call serverless function to send OTP
      await axios.post('/api/sendOtp', {
        otp,
        twitterHandle: 'user_twitter_handle', // Replace dynamically
      });

      // Step 2: Redirect to Twitter OAuth
      const clientId = import.meta.env.VITE_TWITTER_API_KEY;
      const redirectUri = `${window.location.origin}/verify-otp`;
      const state = encodeURIComponent('twitter_auth_state');
      const scope = encodeURIComponent('tweet.read users.read dm.write offline.access');

      const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating login:', error);
      alert('Failed to initiate login process.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
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
