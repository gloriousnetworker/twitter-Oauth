import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async () => {
    try {
      // Step 1: Set up OAuth URL
      const clientId = import.meta.env.VITE_TWITTER_API_KEY;
      const redirectUri = `${window.location.origin}/dashboard`; // Adjust to your redirect URI
      const state = encodeURIComponent('twitter_auth_state');
      const scope = encodeURIComponent('tweet.read users.read offline.access');

      const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

      // Step 2: Redirect user to Twitter's OAuth 2.0 URL
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
