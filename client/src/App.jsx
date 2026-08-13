import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CareerExploration from "./pages/CareerExploration";
import SkillAssessment from "./pages/SkillAssessment";
import Results from "./pages/Results";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap";
import Gamification from "./pages/Gamification";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="p-4 flex justify-between items-center glass sticky top-0 z-50">
      {/* Logo */}
      <Link
        to={user ? "/dashboard" : "/"}
        className="text-xl font-bold text-primary-600 dark:text-primary-400"
      >
        PathWise AI
      </Link>

      <div className="flex items-center gap-3">
        {/* Logged-in user */}
        {user && (
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-9 h-9 rounded-full"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}

              <span className="hidden sm:block font-medium text-slate-700 dark:text-slate-200">
                {user.displayName || "Profile"}
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md bg-slate-200 dark:bg-slate-800"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="container mx-auto p-4">
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}

          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/careers" element={<CareerExploration />} />

          {/* ================= PROTECTED ROUTES ================= */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <SkillAssessment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <PersonalizedRoadmap />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gamification"
            element={
              <ProtectedRoute>
                <Gamification />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
