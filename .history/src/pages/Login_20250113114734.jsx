import React from 'react';
import LoginButton from '../components/LoginButton';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Twitter OTP Login</h1>
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
