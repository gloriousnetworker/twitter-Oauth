import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TwitterLogin from './components/TwitterAuth';
import VerifyOtp from './components/';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TwitterLogin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
};

export default App;
