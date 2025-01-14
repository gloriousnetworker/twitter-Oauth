import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TwitterLogin from './components/TwitterAuth';
import VerifyOtp from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TwitterLogin />} />
        <Route path="/das" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
};

export default App;