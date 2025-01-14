import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/TwitterAuth";
import Dashboard from "./pages/Dashboard";
import Callback from "./pages/Callback";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
