import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoginButton = () => {
  const { setAuthToken } = useAuth();

  const handleLogin = () => {
    // Simulate obtaining the token (replace with actual Twitter login)
    const fakeToken = 'fake-access-token';
    setAuthToken(fakeToken);
    alert('Logged in successfully. Access Token: ' + fakeToken);
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Login with Twitter
    </button>
  );
};

export default LoginButton;
