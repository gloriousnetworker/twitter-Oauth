// src/pages/OTP.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOTPSubmit = () => {
    if (otp === authState.generatedOtp) {
      // Correct OTP, redirect to Dashboard
      setAuthState({ ...authState, isAuthenticated: true });
      navigate('/dashboard');
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-xl">Enter the OTP sent to your Twitter</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 mt-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4"
          onClick={handleOTPSubmit}
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;
