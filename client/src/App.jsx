import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CareerExploration from "./pages/CareerExploration";
import SkillAssessment from "./pages/SkillAssessment";
import Results from "./pages/Results";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Main Application */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/career-exploration" element={<CareerExploration />} />

          <Route path="/skill-assessment" element={<SkillAssessment />} />

          <Route path="/results" element={<Results />} />

          <Route path="/roadmap" element={<PersonalizedRoadmap />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
