import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const { otp } = useAuth();
  const navigate = useNavigate();
  const [userOtp, setUserOtp] = useState("");

  const handleVerifyOtp = () => {
    if (userOtp === otp) {
      navigate("/dashboard");
    } else {
      alert("Invalid OTP! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <input
        type="text"
        value={userOtp}
        onChange={(e) => setUserOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border border-gray-300 px-4 py-2 rounded mb-4"
      />
      <button
        onClick={handleVerifyOtp}
        className="bg-green-500 text-white px-6 py-3 rounded shadow"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTP;
