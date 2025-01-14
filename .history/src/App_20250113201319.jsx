// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import OTP from './pages/OTP';
// import Dashboard from './pages/Dashboard';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
  );
};

export default App;
