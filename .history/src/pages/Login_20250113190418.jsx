import React, { useState } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleTwitterSuccess = async (response) => {
    setLoading(true);
    try {
      const { oauth_token, oauth_token_secret } = response;
      
      // Make a request to the backend to exchange the tokens for the access token
      const authResponse = await fetch('https://api.twitter.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          oauth_token,
          oauth_token_secret,
          // Pass in your client secret from .env or a server-side endpoint for security
          oauth_consumer_key: process.env.REACT_APP_TWITTER_API_KEY,
        }),
      });
      const data = await authResponse.json();
      const { access_token, access_token_secret } = data;

      // Generate OTP (simple 6-digit number)
      const otp = Math.floor(100000 + Math.random() * 900000);
      
      // Store the OTP and tokens in context
      login(access_token, access_token_secret, otp);
      navigate('/otp');
    } catch (error) {
      console.error('Login failed', error);
    }
    setLoading(false);
  };

  const handleTwitterFailure = (error) => {
    console.error('Twitter login failed', error);
  };

  return (
    <div>
      <h1>Login with Twitter</h1>
      <h1
      <TwitterLogin
        loginUrl="https://twitter-oauth-app-wheat.vercel.app/api/v1/auth/twitter"
        onFailure={handleTwitterFailure}
        onSuccess={handleTwitterSuccess}
        requestTokenUrl="https://twitter-oauth-app-wheat.vercel.app/api/v1/auth/twitter/reverse"
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Login;
