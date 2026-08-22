import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================================================
// PAGES
// =========================================================

import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CareerExploration from "./pages/CareerExploration";
import SkillAssessment from "./pages/SkillAssessment";
import AssessmentWarning from "./pages/AssessmentWarning";
import MCQVerification from "./pages/MCQVerification";
import Results from "./pages/Results";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap";
import Recommendations from "./pages/Recommendations";
import Arena from "./pages/Arena";
import SkillGapAnalysis from "./pages/SkillGapAnalysis";
import Badges from "./pages/Badges";
import PlacementReadiness from "./pages/PlacementReadiness";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

// =========================================================
// COMPONENTS
// =========================================================

import ProtectedRoute from "./components/ProtectedRoute";

// =========================================================
// THEME
// =========================================================

import { ThemeProvider } from "./context/ThemeContext";

/* =========================================================
   GLOBAL DARK THEME STYLES

   Keeps existing LIGHT UI intact.

   When dark mode is enabled:
   - Full page becomes dark
   - Existing white cards become dark cards
   - Text becomes readable
   - XP / Level / Streak gradients become dark
   - Roadmap custom CSS becomes dark
   - Borders and progress tracks become dark
========================================================= */

const GlobalThemeStyles = () => {
  return (
    <style>{`
      /* =====================================================
         ROOT / BODY
      ===================================================== */

      html {
        background-color: #f8fafc;
        color: #0f172a;
        transition:
          background-color 300ms ease,
          color 300ms ease;
      }

      body {
        margin: 0;
        background-color: #f8fafc;
        color: #0f172a;
        transition:
          background-color 300ms ease,
          color 300ms ease;
      }

      html.dark {
        background-color: #020617 !important;
        color: #f8fafc !important;
      }

      html.dark body {
        background-color: #020617 !important;
        color: #f8fafc !important;
      }

      /* =====================================================
         GLOBAL DARK ROOT
      ===================================================== */

      .dark {
        background-color: #020617;
        color: #f8fafc;
      }

      /* =====================================================
         PAGE BACKGROUNDS
      ===================================================== */

      .dark .bg-slate-50 {
        background-color: #020617 !important;
      }

      .dark .bg-slate-100 {
        background-color: #0f172a !important;
      }

      .dark .bg-slate-200 {
        background-color: #1e293b !important;
      }

      .dark .bg-slate-300 {
        background-color: #334155 !important;
      }

      .dark .bg-white {
        background-color: #0f172a !important;
      }

      .dark .bg-slate-950 {
        background-color: #020617 !important;
      }

      /* =====================================================
         TEXT
      ===================================================== */

      .dark .text-slate-950 {
        color: #f8fafc !important;
      }

      .dark .text-slate-900 {
        color: #f8fafc !important;
      }

      .dark .text-slate-800 {
        color: #f1f5f9 !important;
      }

      .dark .text-slate-700 {
        color: #e2e8f0 !important;
      }

      .dark .text-slate-600 {
        color: #cbd5e1 !important;
      }

      .dark .text-slate-500 {
        color: #94a3b8 !important;
      }

      .dark .text-slate-400 {
        color: #94a3b8 !important;
      }

      .dark .text-slate-300 {
        color: #cbd5e1 !important;
      }

      /* =====================================================
         BORDERS
      ===================================================== */

      .dark .border-slate-50 {
        border-color: #0f172a !important;
      }

      .dark .border-slate-100 {
        border-color: #1e293b !important;
      }

      .dark .border-slate-200 {
        border-color: #334155 !important;
      }

      .dark .border-slate-300 {
        border-color: #475569 !important;
      }

      /* =====================================================
         INDIGO
      ===================================================== */

      .dark .bg-indigo-50 {
        background-color: rgba(30, 27, 75, 0.65) !important;
      }

      .dark .bg-indigo-100 {
        background-color: #312e81 !important;
      }

      .dark .border-indigo-100 {
        border-color: #3730a3 !important;
      }

      .dark .border-indigo-200 {
        border-color: #4338ca !important;
      }

      .dark .text-indigo-900 {
        color: #eef2ff !important;
      }

      .dark .text-indigo-800 {
        color: #e0e7ff !important;
      }

      .dark .text-indigo-700 {
        color: #c7d2fe !important;
      }

      .dark .text-indigo-600 {
        color: #818cf8 !important;
      }

      /* =====================================================
         GREEN
      ===================================================== */

      .dark .bg-green-50 {
        background-color: rgba(5, 46, 22, 0.55) !important;
      }

      .dark .bg-green-100 {
        background-color: #064e3b !important;
      }

      .dark .border-green-100 {
        border-color: #065f46 !important;
      }

      .dark .border-green-200 {
        border-color: #047857 !important;
      }

      .dark .text-green-600 {
        color: #34d399 !important;
      }

      .dark .text-green-700 {
        color: #6ee7b7 !important;
      }

      /* =====================================================
         EMERALD
      ===================================================== */

      .dark .bg-emerald-50 {
        background-color: rgba(6, 78, 59, 0.5) !important;
      }

      .dark .bg-emerald-100 {
        background-color: #064e3b !important;
      }

      .dark .border-emerald-100 {
        border-color: #065f46 !important;
      }

      .dark .border-emerald-200 {
        border-color: #047857 !important;
      }

      .dark .text-emerald-600 {
        color: #34d399 !important;
      }

      .dark .text-emerald-700 {
        color: #6ee7b7 !important;
      }

      .dark .text-emerald-800 {
        color: #a7f3d0 !important;
      }

      /* =====================================================
         AMBER
      ===================================================== */

      .dark .bg-amber-50 {
        background-color: rgba(69, 26, 3, 0.55) !important;
      }

      .dark .bg-amber-100 {
        background-color: #451a03 !important;
      }

      .dark .border-amber-200 {
        border-color: #92400e !important;
      }

      .dark .text-amber-500 {
        color: #fbbf24 !important;
      }

      .dark .text-amber-600 {
        color: #f59e0b !important;
      }

      .dark .text-amber-700 {
        color: #fcd34d !important;
      }

      .dark .text-amber-800 {
        color: #fde68a !important;
      }

      .dark .text-amber-900 {
        color: #fef3c7 !important;
      }

      /* =====================================================
         RED
      ===================================================== */

      .dark .bg-red-50 {
        background-color: rgba(69, 10, 10, 0.55) !important;
      }

      .dark .bg-red-100 {
        background-color: #450a0a !important;
      }

      .dark .border-red-200 {
        border-color: #991b1b !important;
      }

      .dark .text-red-500 {
        color: #f87171 !important;
      }

      .dark .text-red-600 {
        color: #f87171 !important;
      }

      /* =====================================================
         YELLOW / XP CARD
         
         Fixes:
         bg-gradient-to-br from-yellow-50 to-orange-50
      ===================================================== */

      .dark .from-yellow-50 {
        --tw-gradient-from: #422006 !important;
        --tw-gradient-from-position: 0% !important;
      }

      .dark .to-orange-50 {
        --tw-gradient-to: #431407 !important;
        --tw-gradient-to-position: 100% !important;
      }

      .dark .bg-yellow-50 {
        background-color: rgba(66, 32, 6, 0.6) !important;
      }

      .dark .bg-yellow-100 {
        background-color: #451a03 !important;
      }

      .dark .border-yellow-100 {
        border-color: #78350f !important;
      }

      .dark .text-yellow-700 {
        color: #fbbf24 !important;
      }

      .dark .text-yellow-600 {
        color: #facc15 !important;
      }

      /* =====================================================
         PURPLE / LEVEL CARD
         
         Fixes:
         bg-gradient-to-br from-indigo-50 to-purple-50
      ===================================================== */

      .dark .from-indigo-50 {
        --tw-gradient-from: #1e1b4b !important;
        --tw-gradient-from-position: 0% !important;
      }

      .dark .to-purple-50 {
        --tw-gradient-to: #2e1065 !important;
        --tw-gradient-to-position: 100% !important;
      }

      .dark .bg-purple-50 {
        background-color: rgba(46, 16, 101, 0.6) !important;
      }

      .dark .bg-purple-100 {
        background-color: #4c1d95 !important;
      }

      .dark .border-purple-100 {
        border-color: #6d28d9 !important;
      }

      .dark .text-purple-600 {
        color: #a78bfa !important;
      }

      /* =====================================================
         ORANGE / STREAK CARD
         
         Fixes:
         bg-gradient-to-br from-orange-50 to-red-50
      ===================================================== */

      .dark .from-orange-50 {
        --tw-gradient-from: #431407 !important;
        --tw-gradient-from-position: 0% !important;
      }

      .dark .to-red-50 {
        --tw-gradient-to: #450a0a !important;
        --tw-gradient-to-position: 100% !important;
      }

      .dark .bg-orange-50 {
        background-color: rgba(67, 20, 7, 0.6) !important;
      }

      .dark .bg-orange-100 {
        background-color: #431407 !important;
      }

      .dark .border-orange-100 {
        border-color: #7c2d12 !important;
      }

      .dark .text-orange-600 {
        color: #fb923c !important;
      }

      .dark .text-orange-700 {
        color: #fdba74 !important;
      }

      /* =====================================================
         GRADIENT CARDS — KEEP TEXT VISIBLE
      ===================================================== */

      .dark .bg-gradient-to-br {
        color: #f8fafc;
      }

      .dark .bg-gradient-to-br .text-slate-900 {
        color: #f8fafc !important;
      }

      .dark .bg-gradient-to-br .text-slate-800 {
        color: #f1f5f9 !important;
      }

      .dark .bg-gradient-to-br .text-slate-700 {
        color: #e2e8f0 !important;
      }

      .dark .bg-gradient-to-br .text-slate-600 {
        color: #cbd5e1 !important;
      }

      .dark .bg-gradient-to-br .text-slate-500 {
        color: #94a3b8 !important;
      }

      /* =====================================================
         PROGRESS TRACKS
      ===================================================== */

      .dark .bg-slate-100.rounded-full {
        background-color: #1e293b !important;
      }

      .dark .bg-slate-200.rounded-full {
        background-color: #334155 !important;
      }

      .dark .bg-white.rounded-full {
        background-color: #334155 !important;
      }

      .dark .bg-white.rounded-full .bg-yellow-500 {
        background-color: #eab308 !important;
      }

      /* =====================================================
         HOVER BACKGROUNDS

         IMPORTANT:
         Correct escaping for Tailwind utility selectors.
      ===================================================== */

      .dark .hover\\:bg-slate-50:hover {
        background-color: #1e293b !important;
      }

      .dark .hover\\:bg-slate-100:hover {
        background-color: #1e293b !important;
      }

      .dark .hover\\:bg-slate-200:hover {
        background-color: #334155 !important;
      }

      .dark .hover\\:bg-indigo-50:hover {
        background-color: #1e1b4b !important;
      }

      .dark .hover\\:bg-yellow-50:hover {
        background-color: #422006 !important;
      }

      .dark .hover\\:bg-red-50:hover {
        background-color: #450a0a !important;
      }

      /* =====================================================
         SHADOWS
      ===================================================== */

      .dark .shadow-sm,
      .dark .shadow-md,
      .dark .shadow-lg,
      .dark .shadow-xl,
      .dark .shadow-2xl {
        box-shadow:
          0 15px 35px rgba(0, 0, 0, 0.28) !important;
      }

      /* =====================================================
         INPUTS / SELECTS
      ===================================================== */

      .dark input,
      .dark textarea,
      .dark select {
        background-color: #0f172a;
        color: #f8fafc;
        border-color: #334155;
      }

      .dark input::placeholder,
      .dark textarea::placeholder {
        color: #64748b;
      }

      .dark option {
        background-color: #0f172a;
        color: #f8fafc;
      }

      /* =====================================================
         BUTTONS WITH WHITE BACKGROUND
      ===================================================== */

      .dark button.bg-white {
        background-color: #1e293b !important;
        color: #f8fafc !important;
      }

      .dark a.bg-white {
        background-color: #1e293b !important;
        color: #f8fafc !important;
      }

      /* =====================================================
         CUSTOM ROADMAP PAGE

         PersonalizedRoadmap.jsx uses custom CSS classes,
         so Tailwind dark: utilities alone cannot style it.
      ===================================================== */

      .dark .roadmap-page {
        background: #020617 !important;
        color: #f8fafc !important;
      }

      .dark .roadmap-page * {
        border-color: #334155;
      }

      .dark .roadmap-page h1,
      .dark .roadmap-page h2,
      .dark .roadmap-page h3,
      .dark .roadmap-page h4,
      .dark .roadmap-page h5,
      .dark .roadmap-page h6 {
        color: #f8fafc !important;
      }

      .dark .roadmap-page p {
        color: #cbd5e1 !important;
      }

      /* -----------------------------------------------------
         TOP BAR
      ----------------------------------------------------- */

      .dark .roadmap-topbar {
        background: #0f172a !important;
        border-color: #1e293b !important;
      }

      .dark .roadmap-back-button,
      .dark .arena-button {
        background: #1e293b !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
      }

      .dark .roadmap-back-button:hover,
      .dark .arena-button:hover {
        background: #334155 !important;
      }

      /* -----------------------------------------------------
         HERO
      ----------------------------------------------------- */

      .dark .roadmap-hero {
        background: #0f172a !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
      }

      .dark .roadmap-hero-content {
        color: #f8fafc !important;
      }

      .dark .roadmap-hero-content p {
        color: #cbd5e1 !important;
      }

      .dark .roadmap-label,
      .dark .roadmap-section-label {
        color: #818cf8 !important;
      }

      .dark .roadmap-hero-icon {
        color: #f8fafc !important;
      }

      /* -----------------------------------------------------
         CAREER SELECTOR
      ----------------------------------------------------- */

      .dark .career-selector label {
        color: #cbd5e1 !important;
      }

      .dark .career-selector select {
        background: #1e293b !important;
        color: #f8fafc !important;
        border-color: #475569 !important;
      }

      .dark .career-selector select:focus {
        border-color: #6366f1 !important;
        outline-color: #6366f1 !important;
      }

      /* -----------------------------------------------------
         ROADMAP PROGRESS
      ----------------------------------------------------- */

      .dark .roadmap-progress-card {
        background: #0f172a !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
      }

      .dark .roadmap-progress-card p {
        color: #cbd5e1 !important;
      }

      .dark .roadmap-progress-number {
        color: #818cf8 !important;
      }

      .dark .roadmap-progress-bar {
        background: #1e293b !important;
      }

      .dark .roadmap-progress-bottom {
        color: #cbd5e1 !important;
      }

      /* -----------------------------------------------------
         ROADMAP HEADING
      ----------------------------------------------------- */

      .dark .roadmap-heading {
        color: #f8fafc !important;
      }

      .dark .roadmap-heading p {
        color: #cbd5e1 !important;
      }

      .dark .roadmap-streak {
        background: #431407 !important;
        color: #fb923c !important;
        border-color: #7c2d12 !important;
      }

      .dark .roadmap-streak svg {
        color: #fb923c !important;
      }

      /* -----------------------------------------------------
         ROADMAP PHASES
      ----------------------------------------------------- */

      .dark .roadmap-phase,
      .dark .roadmap-phase-card {
        background: #0f172a !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
      }

      .dark .roadmap-phase-header {
        background: #111827 !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
      }

      .dark .roadmap-phase-header:hover {
        background: #1e293b !important;
      }

      /* -----------------------------------------------------
         ROADMAP SKILLS
      ----------------------------------------------------- */

      .dark .roadmap-skill,
      .dark .roadmap-skill-card {
        background: #111827 !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
      }

      .dark .roadmap-skill:hover,
      .dark .roadmap-skill-card:hover {
        background: #1e293b !important;
        border-color: #475569 !important;
      }

      .dark .roadmap-skill h3,
      .dark .roadmap-skill-card h3 {
        color: #f8fafc !important;
      }

      .dark .roadmap-skill p,
      .dark .roadmap-skill-card p {
        color: #94a3b8 !important;
      }

      /* -----------------------------------------------------
         XP SUCCESS MESSAGE
      ----------------------------------------------------- */

      .dark .xp-success-message {
        background: #052e16 !important;
        color: #d1fae5 !important;
        border-color: #065f46 !important;
      }

      .dark .xp-success-message p,
      .dark .xp-success-message small {
        color: #a7f3d0 !important;
      }

      .dark .xp-success-icon {
        background: #064e3b !important;
        color: #34d399 !important;
      }

      /* -----------------------------------------------------
         LOADING
      ----------------------------------------------------- */

      .dark .roadmap-loading {
        background: #0f172a !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
      }

      .dark .roadmap-loading h2 {
        color: #f8fafc !important;
      }

      .dark .roadmap-loading p {
        color: #94a3b8 !important;
      }

      /* =====================================================
         GLOBAL TRANSITIONS
      ===================================================== */

      html.dark *,
      .dark * {
        transition:
          background-color 200ms ease,
          border-color 200ms ease,
          color 200ms ease,
          box-shadow 200ms ease;
      }
    `}</style>
  );
};

// =========================================================
// APP
// =========================================================

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalThemeStyles />

        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
          <Routes>
            {/* =================================================
                PUBLIC ROUTES
            ================================================= */}

            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROFILE
            ================================================= */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                CAREER EXPLORATION
            ================================================= */}

            <Route
              path="/career-exploration"
              element={
                <ProtectedRoute>
                  <CareerExploration />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                SKILL ASSESSMENT
            ================================================= */}

            <Route
              path="/skill-assessment"
              element={
                <ProtectedRoute>
                  <SkillAssessment />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                ASSESSMENT WARNING
            ================================================= */}

            <Route
              path="/assessment-warning"
              element={
                <ProtectedRoute>
                  <AssessmentWarning />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                MCQ VERIFICATION
            ================================================= */}

            <Route
              path="/mcq-verification"
              element={
                <ProtectedRoute>
                  <MCQVerification />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                RESULTS
            ================================================= */}

            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PERSONALIZED ROADMAP
            ================================================= */}

            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <PersonalizedRoadmap />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                RECOMMENDATIONS
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
                ARENA
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
                BADGES
            ================================================= */}

            <Route
              path="/badges"
              element={
                <ProtectedRoute>
                  <Badges />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PLACEMENT READINESS
            ================================================= */}

            <Route
              path="/placement-readiness"
              element={
                <ProtectedRoute>
                  <PlacementReadiness />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                SKILL GAP
            ================================================= */}

            <Route
              path="/skill-gap"
              element={
                <ProtectedRoute>
                  <SkillGapAnalysis />
                </ProtectedRoute>
              }
            />
            {/* =================================================
    RESUME ANALYZER
================================================= */}

            <Route
              path="/resume-analyzer"
              element={
                <ProtectedRoute>
                  <ResumeAnalyzer />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                FALLBACK
            ================================================= */}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
