import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store authenticated user data
  const [otp, setOtp] = useState(null);   // Store generated OTP

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setOtp(null);
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otp);
    return otp;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, otp, generateOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
