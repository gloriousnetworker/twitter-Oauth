import React, { useState } from 'react';
import TwitterLogin from 'react-twitter-auth';

const TwitterAuth = () => {
  const [otp, setOtp] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userAccessSecret, setUserAccessSecret] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const onSuccess = async (response) => {
    try {
      const data = await response.json();
      console.log('Twitter Auth Success:', data);

      // Save access token and secret for OTP functionality
      setUserAccessToken(data.accessToken);
      setUserAccessSecret(data.accessSecret);

      // Automatically send OTP upon successful login
      sendOtp(data.accessToken, data.accessSecret);
    } catch (error) {
      console.error('Error parsing Twitter response:', error);
    }
  };

  const onFailed = (error) => {
    console.error('Twitter Auth Failed:', error);
  };

  const sendOtp = async (accessToken, accessSecret) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/send-otp?accessToken=${accessToken}&accessSecret=${accessSecret}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('OTP Sent:', data);

        // Simulating OTP generation (in real cases, OTP would be sent via Twitter DM)
        const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(simulatedOtp);

        setIsOtpSent(true);
        alert('OTP has been sent to your Twitter account.');
      } else {
        console.error('Error sending OTP:', await response.text());
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error in sendOtp:', error);
    }
  };

  const verifyOtp = async () => {
    if (otp === generatedOtp) {
      alert('OTP verified successfully! Redirecting to the dashboard...');
      // Redirect to dashboard or next step
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Twitter Authentication</h1>

      {!userAccessToken && (
        <TwitterLogin
          loginUrl="http://localhost:4000/api/v1/auth/twitter"
          onFailure={onFailed}
          onSuccess={onSuccess}
          requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
          showIcon={true}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login with Twitter
        </TwitterLogin>
      )}

      {isOtpSent && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Enter the OTP sent to your Twitter:</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-64 mt-2"
            placeholder="Enter OTP"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default TwitterAuth;
