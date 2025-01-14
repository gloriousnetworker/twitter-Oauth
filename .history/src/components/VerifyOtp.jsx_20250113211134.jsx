import React, { useState } from 'react';

const VerifyOtp = () => {
  const [inputOtp, setInputOtp] = useState('');
  const storedOtp = localStorage.getItem('otp');

  const handleVerify = () => {
    if (inputOtp === storedOtp) {
      alert('OTP verified successfully!');
      // Proceed with authenticated flow
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Verify OTP</h1>
      <input
        type="text"
        value={inputOtp}
        onChange={(e) => setInputOtp(e.target.value)}
        className="px-4 py-2 mb-4 border rounded"
        placeholder="Enter OTP"
      />
      <button
        onClick={handleVerify}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default VerifyOtp;
