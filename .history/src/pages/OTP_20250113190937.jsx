import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { authData } = useAuth();
  const history = useHistory();

  const handleOtpSubmit = () => {
    if (otp === '123456') { // For now, use a hardcoded OTP for testing
      history.push('/dashboard');
    } else {
      setError('Incorrect OTP, please try again.');
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleOtpSubmit}>Submit</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default OTP;
