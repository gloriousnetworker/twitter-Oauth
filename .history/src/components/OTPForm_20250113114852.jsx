import React, { useState } from 'react';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const handleSubmit = () => {
    alert(`OTP Submitted: ${otp}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OTPForm;
