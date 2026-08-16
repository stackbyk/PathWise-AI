import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CareerExploration from "./pages/CareerExploration";
import SkillAssessment from "./pages/SkillAssessment";
import Results from "./pages/Results";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap";
import Recommendations from "./pages/Recommendations";
import Arena from "./pages/Arena";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =================================================
            PROTECTED ROUTES
        ================================================= */}

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* CAREER EXPLORATION */}
        <Route
          path="/career-exploration"
          element={
            <ProtectedRoute>
              <CareerExploration />
            </ProtectedRoute>
          }
        />

        {/* SKILL ASSESSMENT */}
        <Route
          path="/skill-assessment"
          element={
            <ProtectedRoute>
              <SkillAssessment />
            </ProtectedRoute>
          }
        />

        {/* RESULTS */}
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        {/* PERSONALIZED ROADMAP */}
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <PersonalizedRoadmap />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            AI RECOMMENDATIONS
        ================================================= */}

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            PATHWISE ARENA
        ================================================= */}

        <Route
          path="/arena"
          element={
            <ProtectedRoute>
              <Arena />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
