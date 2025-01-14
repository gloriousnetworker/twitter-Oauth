import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
