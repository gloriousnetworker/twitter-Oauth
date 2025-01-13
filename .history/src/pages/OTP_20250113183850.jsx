import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OTP = () => {
  const { authState, login } = useAuth();
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');

  const handleOTPSubmit = () => {
    if (otpInput === authState.otp.toString()) {
      navigate('/dashboard');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <p>An OTP was sent to your Twitter account.</p>
      <input
        type="text"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
        placeholder="Enter OTP"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleOTPSubmit}>Submit</button>
    </div>
  );
};

export default OTP;
