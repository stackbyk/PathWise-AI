// src/pages/Progress.jsx

import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

function Progress() {
  const navigate = useNavigate();

  const { progress } = useProgress();

  const xp = progress.xp;

  const level = Math.floor(xp / 100) + 1;

  const currentLevelXP = xp % 100;

  const roadmapProgress = progress.roadmapProgress;

  const skillsLearned = progress.completedSkills.length;

  const assessmentCompleted = progress.completedActions.includes("assessment");

  const badges = [
    {
      name: "Getting Started",
      description: "Started your PathWise journey",
      icon: "🚀",
      unlocked: true,
    },
    {
      name: "Skill Explorer",
      description: "Completed your skill assessment",
      icon: "🧠",
      unlocked: assessmentCompleted,
    },
    {
      name: "Roadmap Builder",
      description: "Started your career roadmap",
      icon: "🗺️",
      unlocked: roadmapProgress > 0,
    },
    {
      name: "Skill Master",
      description: "Learned 5 skills",
      icon: "🏆",
      unlocked: skillsLearned >= 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold text-primary-600"
          >
            PathWise AI
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Dashboard
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary-600">
            YOUR PROGRESS
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Track Your Career Growth
          </h1>

          <p className="mt-2 text-slate-600">
            Complete activities to earn XP and unlock achievements.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total XP</p>

            <p className="mt-2 text-3xl font-bold text-primary-600">{xp}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Level</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">{level}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Skills Learned</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {skillsLearned}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Roadmap</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {roadmapProgress}%
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Level {level}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {currentLevelXP}/100 XP to next level
              </p>
            </div>

            <span className="font-semibold text-primary-600">
              {currentLevelXP}%
            </span>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-primary-600 transition-all"
              style={{
                width: `${currentLevelXP}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">Badges</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-2xl border p-6 ${
                  badge.unlocked
                    ? "border-primary-200 bg-white shadow-sm"
                    : "border-slate-200 bg-slate-100 opacity-60"
                }`}
              >
                <div className="text-4xl">{badge.icon}</div>

                <h3 className="mt-4 font-bold text-slate-900">{badge.name}</h3>

                <p className="mt-2 text-sm text-slate-500">
                  {badge.description}
                </p>

                <p className="mt-4 text-sm font-semibold">
                  {badge.unlocked ? (
                    <span className="text-green-600">✓ Unlocked</span>
                  ) : (
                    <span className="text-slate-400">🔒 Locked</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <button
            onClick={() => navigate("/skill-assessment")}
            className="rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700"
          >
            Skill Assessment
          </button>

          <button
            onClick={() => navigate("/roadmap")}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Continue Roadmap
          </button>

          <button
            onClick={() => navigate("/recommendations")}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Recommendations
          </button>
        </div>
      </main>
    </div>
  );
}

export default Progress;
