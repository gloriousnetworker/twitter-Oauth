import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/TwitterAuth";
import Dashboard from "./components/Dashboard";
import Callback from "./components/Callback";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
