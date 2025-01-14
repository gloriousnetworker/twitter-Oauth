import React from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();

  const handleVerify = () => {
    // Navigate to the Dashboard page
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Verify OTP</h1>
      <p className="mb-4">Enter the OTP sent to your Twitter account.</p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="mb-4 px-4 py-2 border rounded w-64"
      />
      <button
        onClick={handleVerify}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTP;
