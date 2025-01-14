import React, { useState } from 'react';
import { TwitterLogin } from 'react-twitter-auth';
import axios from 'axios'; // To make API calls to your backend

const Login = () => {
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate OTP
  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    setOtp(randomOtp);
    return randomOtp;
  };

  // Success callback after Twitter login
  const onSuccess = async (response) => {
    try {
      const data = await response.json();
      const { oauth_token, oauth_token_secret, user_id, screen_name } = data;

      // Generate OTP and send it to the backend to send via Twitter DM
      const generatedOtp = generateOtp();

      setIsLoading(true);

      // Send the OTP to your backend, which will send the DM via Twitter API
      await axios.post('http://localhost:4000/api/v1/send-otp', {
        oauth_token,
        oauth_token_secret,
        user_id,
        otp: generatedOtp,
        screen_name
      });

      setIsLoading(false);
      alert('OTP sent successfully to your Twitter account!');
    } catch (err) {
      setIsLoading(false);
      setError('Failed to send OTP. Please try again.');
    }
  };

  // Failure callback after Twitter login
  const onFailed = (error) => {
    setError('Twitter login failed. Please try again.');
  };

  return (
    <div>
      <h2>Login with Twitter</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && <p>Sending OTP...</p>}
      
      {/* Twitter Login */}
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={onFailed}
        onSuccess={onSuccess}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        showIcon={true}
      />

      {/* Optional OTP Display */}
      {otp && (
        <div>
          <h3>Your OTP: {otp}</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
