import React, { useState } from 'react';

const Login = () => {
  const [codeVerifier, setCodeVerifier] = useState('');

  const generateCodeVerifier = () => {
    const array = new Uint8Array(128);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
  };

  const handleLogin = async () => {
    try {
      const verifier = generateCodeVerifier();
      setCodeVerifier(verifier);

      const challenge = await generateCodeChallenge(verifier);
      const clientId = import.meta.env.VITE_TWITTER_API_KEY;
      const redirectUri = `${window.location.origin}/dashboard`; // Adjust to your redirect URI
      const state = encodeURIComponent('twitter_auth_state');
      const scope = encodeURIComponent('tweet.read users.read offline.access');

      const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=${challenge}&code_challenge_method=S256`;

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

async function generateCodeChallenge(verifier) {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const hash = Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  return btoa(hash).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
