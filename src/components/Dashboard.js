// src/components/Dashboard.js
import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access state

const Dashboard = () => {
  const location = useLocation();
  const { name } = location.state || { name: "User" }; // Fallback if no name is provided

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>This is your dashboard. Feel free to explore your account settings and features.</p>
    </div>
  );
};

export default Dashboard;
