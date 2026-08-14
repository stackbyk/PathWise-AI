import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  User,
  Brain,
  Briefcase,
  Map,
  Sparkles,
  BarChart3,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { xp, completedSkills, getLevel } = useProgress();

  const [currentXP, setCurrentXP] = useState(xp);

  const userName = user?.displayName || user?.email?.split("@")[0] || "User";

  useEffect(() => {
    setCurrentXP(xp);
  }, [xp]);

  useEffect(() => {
    const handleXPUpdate = () => {
      const savedXP = Number(localStorage.getItem("pathwiseXP") || 0);

      setCurrentXP(savedXP);
    };

    window.addEventListener("pathwiseXPUpdated", handleXPUpdate);

    window.addEventListener("storage", handleXPUpdate);

    return () => {
      window.removeEventListener("pathwiseXPUpdated", handleXPUpdate);

      window.removeEventListener("storage", handleXPUpdate);
    };
  }, []);

  const level = getLevel();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold text-primary-600"
          >
            PathWise AI
          </button>

          <div className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/career-exploration")}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Careers
            </button>

            <button
              onClick={() => navigate("/skill-assessment")}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Skills
            </button>

            <button
              onClick={() => navigate("/roadmap")}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Roadmap
            </button>

            <button
              onClick={() => navigate("/recommendations")}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              AI Recommendations
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              <Trophy size={16} />
              Leaderboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Profile
            </button>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-bold text-white"
          >
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </nav>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* WELCOME */}

        <div className="mb-8">
          <p className="text-sm font-semibold text-primary-600">
            Welcome back 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Hello, {userName}!
          </h1>

          <p className="mt-2 text-slate-600">
            Continue building your career path.
          </p>
        </div>

        {/* XP STATS */}

        <div className="mb-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">
                ⭐
              </div>

              <div>
                <p className="text-sm text-slate-500">Total XP</p>

                <p className="text-2xl font-bold text-slate-900">{currentXP}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                🏆
              </div>

              <div>
                <p className="text-sm text-slate-500">Level</p>

                <p className="text-2xl font-bold text-slate-900">{level}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                ✓
              </div>

              <div>
                <p className="text-sm text-slate-500">Completed Skills</p>

                <p className="text-2xl font-bold text-slate-900">
                  {completedSkills.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => navigate("/career-exploration")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Briefcase size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Career Explorer
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore careers and discover the skills required.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              Explore Careers →
            </span>
          </button>

          <button
            onClick={() => navigate("/skill-assessment")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Brain size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Skill Assessment
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Assess your current skills and identify areas to improve.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              Assess Skills →
            </span>
          </button>

          <button
            onClick={() => navigate("/recommendations")}
            className="group rounded-2xl border border-primary-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
              <Sparkles size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              AI Recommendations
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Get personalized recommendations based on your skill gaps.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              View Recommendations →
            </span>
          </button>

          <button
            onClick={() => navigate("/roadmap")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Map size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">Career Roadmap</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Follow your personalized roadmap and earn XP.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              View Roadmap →
            </span>
          </button>

          <button
            onClick={() => navigate("/results")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <BarChart3 size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">My Results</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review your assessment results and skill gaps.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              View Results →
            </span>
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="group rounded-2xl border border-yellow-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
              <Trophy size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">Leaderboard</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              See your XP ranking and compete with other learners.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              View Leaderboard →
            </span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <User size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">My Profile</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Manage your personal information and career preferences.
            </p>

            <span className="mt-5 inline-block font-semibold text-primary-600">
              View Profile →
            </span>
          </button>
        </div>

        {/* LEADERBOARD CTA */}

        <div className="mt-10 rounded-2xl bg-primary-600 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-primary-100">
                YOUR PROGRESS
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                ⭐ {currentXP} XP · Level {level}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-100">
                Complete roadmap steps to earn more XP and climb the
                leaderboard.
              </p>
            </div>

            <button
              onClick={() => navigate("/leaderboard")}
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-6 py-3 font-semibold text-primary-600 hover:bg-slate-100"
            >
              <Trophy size={18} />
              View Leaderboard
            </button>
          </div>
        </div>

        {/* ACCOUNT */}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row">
          <div>
            <p className="font-semibold text-slate-900">
              Signed in as {user?.email || userName}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Manage your account from your profile.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <User size={16} />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
