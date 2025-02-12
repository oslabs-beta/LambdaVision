import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MetricsOverview from "./pages/MetricsOverview";
import ErrorAlerts from "./pages/ErrorAlerts";
import FunctionDetail from "./pages/FunctionDetail";
import SettingsPage from "./pages/Settings";
import AuthenticatedLayout from "./components/AuthenticatedLayout";  // Import AuthenticatedLayout

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true); // Persist the authentication state
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");  // Store the authentication state
  };

  const handleSignup = () => {
    setIsAuthenticated(true);  // Automatically log in the user after signup
    localStorage.setItem("isAuthenticated", "true");  // Store the authentication state
  };


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />

         {/* Protected Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/metrics" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<MetricsOverview />} />} />
          <Route path="/errors" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ErrorAlerts />} />} />
          <Route path="/function-detail" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<FunctionDetail />} />} />
          <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<SettingsPage />} />} />
        </Route>

         {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
  const ProtectedRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};
export default App;

