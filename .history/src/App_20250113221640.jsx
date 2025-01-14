import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/';
import VerifyOtp from './components/VerifyOtp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
};

export default App;
