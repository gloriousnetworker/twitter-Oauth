// src/pages/Login.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const handleTwitterLogin = async () => {
    // Redirect user to Twitter OAuth flow
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${process.env.REACT_APP_TWITTER_ACCESS_TOKEN}`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleTwitterLogin}
      >
        Login with Twitter
      </button>
    </div>
  );
};

export default Login;
