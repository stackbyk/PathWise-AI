import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Rocket,
  Wrench,
  Map,
  Flame,
  Gem,
  Trophy,
} from "lucide-react";

const Badges = () => {
  const [completedSkills, setCompletedSkills] = useState(0);
  const [streak, setStreak] = useState(1);
  const [roadmapProgress, setRoadmapProgress] = useState(0);

  /* =====================================================
     GET ROADMAP KEY
  ===================================================== */

  const getRoadmapKey = useCallback((career) => {
    if (!career) {
      return "Full Stack Developer";
    }

    const normalized = career.trim().toLowerCase().replace(/\s+/g, " ");

    if (normalized.includes("ai") || normalized.includes("machine learning")) {
      return "AI / ML Engineer";
    }

    if (normalized.includes("data scientist")) {
      return "Data Scientist";
    }

    if (normalized.includes("cloud")) {
      return "Cloud Engineer";
    }

    if (normalized.includes("cyber") || normalized.includes("security")) {
      return "Cybersecurity Engineer";
    }

    if (normalized.includes("devops")) {
      return "DevOps Engineer";
    }

    if (normalized.includes("mobile")) {
      return "Mobile App Developer";
    }

    if (normalized.includes("ui/ux") || normalized.includes("designer")) {
      return "UI/UX Designer";
    }

    if (
      normalized.includes("full stack") ||
      normalized.includes("full-stack") ||
      normalized.includes("fullstack")
    ) {
      return "Full Stack Developer";
    }

    return career;
  }, []);

  /* =====================================================
     LOAD ROADMAP PROGRESS
  ===================================================== */

  const loadRoadmapProgress = useCallback(() => {
    const career =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    const roadmapKey = getRoadmapKey(career);

    const storageKey = `pathwiseRoadmap_${roadmapKey}`;

    const savedRoadmap = localStorage.getItem(storageKey);

    if (!savedRoadmap) {
      setRoadmapProgress(0);
      return;
    }

    try {
      const roadmap = JSON.parse(savedRoadmap);

      if (!Array.isArray(roadmap)) {
        setRoadmapProgress(0);
        return;
      }

      const allSkills = roadmap.flatMap((phase) =>
        Array.isArray(phase.skills) ? phase.skills : [],
      );

      if (allSkills.length === 0) {
        setRoadmapProgress(0);
        return;
      }

      const completed = allSkills.filter(
        (skill) => skill.completed === true || skill.isCompleted === true,
      ).length;

      const progress = Math.round((completed / allSkills.length) * 100);

      setRoadmapProgress(progress);
    } catch (error) {
      console.error("Failed to calculate roadmap progress:", error);

      setRoadmapProgress(0);
    }
  }, [getRoadmapKey]);

  /* =====================================================
     LOAD GAMIFICATION DATA
  ===================================================== */

  const loadGamificationData = useCallback(() => {
    const savedSkills = Number(localStorage.getItem("pathwiseCompletedSkills"));

    const savedStreak = Number(localStorage.getItem("pathwiseStreak"));

    setCompletedSkills(
      Number.isFinite(savedSkills) && savedSkills > 0 ? savedSkills : 0,
    );

    setStreak(
      Number.isFinite(savedStreak) && savedStreak > 0 ? savedStreak : 1,
    );

    loadRoadmapProgress();
  }, [loadRoadmapProgress]);

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadGamificationData();

    const handleUpdate = () => {
      loadGamificationData();
    };

    window.addEventListener("pathwiseXPUpdated", handleUpdate);

    window.addEventListener("pathwiseGamificationUpdated", handleUpdate);

    window.addEventListener("pathwiseRoadmapUpdated", handleUpdate);

    window.addEventListener("pathwiseCareerUpdated", handleUpdate);

    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("pathwiseXPUpdated", handleUpdate);

      window.removeEventListener("pathwiseGamificationUpdated", handleUpdate);

      window.removeEventListener("pathwiseRoadmapUpdated", handleUpdate);

      window.removeEventListener("pathwiseCareerUpdated", handleUpdate);

      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadGamificationData]);

  /* =====================================================
     BADGES
  ===================================================== */

  const badges = [
    {
      id: 1,
      name: "First Step",
      description: "Complete your first skill.",
      requirement: "Complete 1 skill",
      icon: Rocket,
      emoji: "🚀",
      unlocked: completedSkills >= 1,
    },

    {
      id: 2,
      name: "Skill Builder",
      description: "Build your foundation by completing skills.",
      requirement: "Complete 5 skills",
      icon: Wrench,
      emoji: "🛠️",
      unlocked: completedSkills >= 5,
    },

    {
      id: 3,
      name: "Roadmap Starter",
      description: "You're making serious progress on your roadmap.",
      requirement: "Complete 10 skills",
      icon: Map,
      emoji: "🗺️",
      unlocked: completedSkills >= 10,
    },

    {
      id: 4,
      name: "Consistency King",
      description: "Keep learning consistently every day.",
      requirement: "Reach a 7 day streak",
      icon: Flame,
      emoji: "🔥",
      unlocked: streak >= 7,
    },

    {
      id: 5,
      name: "Unstoppable",
      description: "Show exceptional consistency in your learning journey.",
      requirement: "Reach a 30 day streak",
      icon: Gem,
      emoji: "💎",
      unlocked: streak >= 30,
    },

    {
      id: 6,
      name: "Career Ready",
      description: "Complete your personalized career roadmap.",
      requirement: "Reach 100% roadmap completion",
      icon: Trophy,
      emoji: "🏆",
      unlocked: roadmapProgress >= 100,
    },
  ];

  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">
          <Link
            to="/arena"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition mb-6"
          >
            <ArrowLeft size={17} />
            Back to Arena
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                PathWise Achievements
              </p>

              <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
                Your Badges 🏆
              </h1>

              <p className="mt-3 text-slate-600 max-w-2xl">
                Unlock badges by making progress, building skills, and staying
                consistent on your career journey.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Badges Unlocked
              </p>

              <p className="mt-1 text-3xl font-extrabold text-indigo-600">
                {unlockedCount}
                <span className="text-lg text-slate-400">/{badges.length}</span>
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            BADGES GRID
        ================================================= */}

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;

            return (
              <div
                key={badge.id}
                className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                  badge.unlocked
                    ? "bg-white border-indigo-100 shadow-md hover:-translate-y-1 hover:shadow-xl"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                {badge.unlocked && (
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-100/60 blur-2xl" />
                )}

                <div className="relative">
                  {/* ICON */}

                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                        badge.unlocked
                          ? "bg-gradient-to-br from-indigo-100 to-purple-100"
                          : "bg-slate-200"
                      }`}
                    >
                      {badge.unlocked ? (
                        <span className="text-4xl">{badge.emoji}</span>
                      ) : (
                        <Lock size={28} className="text-slate-400" />
                      )}
                    </div>

                    {/* STATUS */}

                    {badge.unlocked ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        <CheckCircle2 size={14} />
                        Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-500">
                        <Lock size={13} />
                        Locked
                      </span>
                    )}
                  </div>

                  {/* NAME */}

                  <h2
                    className={`mt-6 text-xl font-extrabold ${
                      badge.unlocked ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {badge.name}
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      badge.unlocked ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {badge.description}
                  </p>

                  {/* REQUIREMENT */}

                  <div
                    className={`mt-5 rounded-xl px-4 py-3 ${
                      badge.unlocked ? "bg-indigo-50" : "bg-slate-200"
                    }`}
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-wide ${
                        badge.unlocked ? "text-indigo-600" : "text-slate-500"
                      }`}
                    >
                      Requirement
                    </p>

                    <p
                      className={`mt-1 text-sm font-semibold ${
                        badge.unlocked ? "text-slate-700" : "text-slate-500"
                      }`}
                    >
                      {badge.requirement}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* =================================================
            MOTIVATION
        ================================================= */}

        <section className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-indigo-200 text-sm font-semibold">
                KEEP GOING 🚀
              </p>

              <h2 className="mt-1 text-xl md:text-2xl font-extrabold">
                Every badge represents progress toward your career.
              </h2>

              <p className="mt-2 text-sm text-indigo-100">
                Keep learning, complete skills and maintain your streak to
                unlock more achievements.
              </p>
            </div>

            <Link
              to="/roadmap"
              className="shrink-0 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 hover:bg-indigo-50 transition"
            >
              Continue Learning
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Badges;
