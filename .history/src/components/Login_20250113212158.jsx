import React from 'react';
import axios from 'axios';

const Login = () => {
  import axios from 'axios';

const handleLogin = async () => {
  try {
    const otp = generateOtp(); // Replace with your OTP generation logic
    const twitterHandle = "recipient_id_here"; // Replace with actual recipient ID

    const response = await axios.post('http://localhost:5000/api/sendOtp', {
      otp,
      twitterHandle,
    });

    console.log('OTP sent successfully:', response.data);
  } catch (error) {
    console.error('Error initiating login process:', error);
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
