// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './'; // Import the Login component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route to the Login page */}
        <Route path="/" element={<Login />} />
        {/* You can define more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
