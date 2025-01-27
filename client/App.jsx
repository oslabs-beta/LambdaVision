import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ErrorAlerts from "./pages/ErrorAlerts";
import MetricsOverview from "./pages/MetricsOverview";
import FunctionDetail from "./pages/FunctionDetail";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar (Always Visible) */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          {/* Header (Always Visible) */}
          <Header />

          {/* Page Content */}
          <main className="p-6 bg-gray-100 flex-grow">
            <Routes>
              <Route path="/" element={<MetricsOverview />} />
              <Route path="/errors" element={<ErrorAlerts />} />
              <Route path="/function-detail" element={<FunctionDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
