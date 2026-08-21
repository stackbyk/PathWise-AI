import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Zap,
  Flame,
  ArrowLeft,
  Target,
  Lock,
  CheckCircle2,
  Award,
  Star,
  Rocket,
  Brain,
  Code2,
  Crown,
  RefreshCw,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Arena() {
  // =====================================================
  // STATE
  // =====================================================

  const [gamificationVersion, setGamificationVersion] = useState(0);

  // =====================================================
  // GET GAMIFICATION DATA
  // =====================================================

  const xp = Number(localStorage.getItem("pathwiseXP")) || 0;

  const completedSkills =
    Number(localStorage.getItem("pathwiseCompletedSkills")) || 0;

  const streak = Number(localStorage.getItem("pathwiseStreak")) || 1;

  // =====================================================
  // DAILY CHALLENGE COUNT
  // =====================================================

  const getChallengeCount = () => {
    try {
      const count = Number(localStorage.getItem("pathwiseCompletedChallenges"));

      return count > 0 ? count : 0;
    } catch (error) {
      console.error("Failed to load challenge count:", error);
      return 0;
    }
  };

  const completedChallenges = getChallengeCount();

  // =====================================================
  // ROADMAP PROGRESS
  // =====================================================

  const getRoadmapProgress = () => {
    const career =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    const normalized = career.trim().toLowerCase().replace(/\s+/g, " ");

    let roadmapKey = career;

    if (normalized.includes("ai") || normalized.includes("machine learning")) {
      roadmapKey = "AI / ML Engineer";
    } else if (normalized.includes("data scientist")) {
      roadmapKey = "Data Scientist";
    } else if (normalized.includes("cloud")) {
      roadmapKey = "Cloud Engineer";
    } else if (
      normalized.includes("cyber") ||
      normalized.includes("security")
    ) {
      roadmapKey = "Cybersecurity Engineer";
    } else if (normalized.includes("devops")) {
      roadmapKey = "DevOps Engineer";
    } else if (normalized.includes("mobile")) {
      roadmapKey = "Mobile App Developer";
    } else if (
      normalized.includes("ui/ux") ||
      normalized.includes("designer")
    ) {
      roadmapKey = "UI/UX Designer";
    } else if (
      normalized.includes("full stack") ||
      normalized.includes("full-stack") ||
      normalized.includes("fullstack")
    ) {
      roadmapKey = "Full Stack Developer";
    }

    const storageKey = `pathwiseRoadmap_${roadmapKey}`;

    const savedRoadmap = localStorage.getItem(storageKey);

    if (!savedRoadmap) {
      return 0;
    }

    try {
      const roadmap = JSON.parse(savedRoadmap);

      if (!Array.isArray(roadmap)) {
        return 0;
      }

      const allSkills = roadmap.flatMap((phase) =>
        Array.isArray(phase.skills) ? phase.skills : [],
      );

      if (allSkills.length === 0) {
        return 0;
      }

      const completed = allSkills.filter(
        (skill) => skill.completed === true || skill.isCompleted === true,
      ).length;

      return Math.round((completed / allSkills.length) * 100);
    } catch (error) {
      console.error("Failed to calculate roadmap progress:", error);

      return 0;
    }
  };

  const roadmapProgress = getRoadmapProgress();

  // =====================================================
  // LEVEL CALCULATION
  // =====================================================

  const level = Math.floor(xp / 250) + 1;

  const levelNames = [
    "Beginner",
    "Explorer",
    "Skill Builder",
    "Career Ready",
    "PathWise Pro",
    "AI Career Master",
  ];

  const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)];

  const xpInsideLevel = xp % 250;

  const levelProgress = Math.round((xpInsideLevel / 250) * 100);

  const nextLevelXP = level * 250;

  const remainingXP = Math.max(nextLevelXP - xp, 0);

  // =====================================================
  // PROFILE
  // =====================================================

  const profileName = localStorage.getItem("pathwiseProfileName") || "You";

  // =====================================================
  // BADGE SYSTEM
  // =====================================================

  const badges = [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Complete your first developer challenge.",
      icon: "🌱",
      color: "green",
      unlocked: completedChallenges >= 1,
      progress: Math.min(completedChallenges, 1),
      target: 1,
      progressLabel: `${Math.min(completedChallenges, 1)}/1 challenge`,
    },

    {
      id: "xp-hunter",
      title: "XP Hunter",
      description: "Earn at least 100 XP.",
      icon: "⚡",
      color: "yellow",
      unlocked: xp >= 100,
      progress: Math.min(xp, 100),
      target: 100,
      progressLabel: `${Math.min(xp, 100)}/100 XP`,
    },

    {
      id: "three-day-streak",
      title: "3-Day Streak",
      description: "Maintain a learning streak for 3 days.",
      icon: "🔥",
      color: "orange",
      unlocked: streak >= 3,
      progress: Math.min(streak, 3),
      target: 3,
      progressLabel: `${Math.min(streak, 3)}/3 days`,
    },

    {
      id: "rising-developer",
      title: "Rising Developer",
      description: "Reach Level 3.",
      icon: "🚀",
      color: "blue",
      unlocked: level >= 3,
      progress: Math.min(level, 3),
      target: 3,
      progressLabel: `Level ${Math.min(level, 3)}/3`,
    },

    {
      id: "skill-builder",
      title: "Skill Builder",
      description: "Complete 5 roadmap skills.",
      icon: "🧠",
      color: "purple",
      unlocked: completedSkills >= 5,
      progress: Math.min(completedSkills, 5),
      target: 5,
      progressLabel: `${Math.min(completedSkills, 5)}/5 skills`,
    },

    {
      id: "challenge-master",
      title: "Challenge Master",
      description: "Complete 5 developer challenges.",
      icon: "🎯",
      color: "indigo",
      unlocked: completedChallenges >= 5,
      progress: Math.min(completedChallenges, 5),
      target: 5,
      progressLabel: `${Math.min(completedChallenges, 5)}/5 challenges`,
    },

    {
      id: "pathwise-pro",
      title: "PathWise Pro",
      description: "Reach Level 5.",
      icon: "👑",
      color: "pink",
      unlocked: level >= 5,
      progress: Math.min(level, 5),
      target: 5,
      progressLabel: `Level ${Math.min(level, 5)}/5`,
    },

    {
      id: "career-champion",
      title: "Career Champion",
      description: "Complete your entire career roadmap.",
      icon: "🏆",
      color: "gold",
      unlocked: roadmapProgress >= 100,
      progress: Math.min(roadmapProgress, 100),
      target: 100,
      progressLabel: `${Math.min(roadmapProgress, 100)}% roadmap`,
    },
  ];

  const unlockedBadges = badges.filter((badge) => badge.unlocked).length;

  const badgeProgress = Math.round((unlockedBadges / badges.length) * 100);

  // =====================================================
  // LEADERBOARD
  // =====================================================

  const leaderboard = [
    {
      rank: 1,
      name: "Arjun",
      xp: Math.max(xp + 450, 950),
      avatar: "🧑‍💻",
    },

    {
      rank: 2,
      name: "Priya",
      xp: Math.max(xp + 200, 700),
      avatar: "👩‍💻",
    },

    {
      rank: 3,
      name: profileName,
      xp,
      avatar: "🚀",
      currentUser: true,
    },
  ];

  // =====================================================
  // REFRESH GAMIFICATION
  // =====================================================

  useEffect(() => {
    const handleGamificationUpdate = () => {
      setGamificationVersion((previous) => previous + 1);
    };

    window.addEventListener("pathwiseXPUpdated", handleGamificationUpdate);

    window.addEventListener(
      "pathwiseGamificationUpdated",
      handleGamificationUpdate,
    );

    window.addEventListener("pathwiseRoadmapUpdated", handleGamificationUpdate);

    window.addEventListener("storage", handleGamificationUpdate);

    return () => {
      window.removeEventListener("pathwiseXPUpdated", handleGamificationUpdate);

      window.removeEventListener(
        "pathwiseGamificationUpdated",
        handleGamificationUpdate,
      );

      window.removeEventListener(
        "pathwiseRoadmapUpdated",
        handleGamificationUpdate,
      );

      window.removeEventListener("storage", handleGamificationUpdate);
    };
  }, []);

  // Prevent unused variable warning
  void gamificationVersion;

  // =====================================================
  // COLOR HELPERS
  // =====================================================

  const getBadgeStyles = (color, unlocked) => {
    if (!unlocked) {
      return {
        card: "border-slate-200 bg-slate-50",
        icon: "bg-slate-200 grayscale",
        title: "text-slate-500",
        text: "text-slate-400",
        progress: "bg-slate-300",
      };
    }

    const styles = {
      green: {
        card: "border-green-200 bg-gradient-to-br from-green-50 to-white",
        icon: "bg-green-100",
        title: "text-green-800",
        text: "text-green-600",
        progress: "bg-green-500",
      },

      yellow: {
        card: "border-yellow-200 bg-gradient-to-br from-yellow-50 to-white",
        icon: "bg-yellow-100",
        title: "text-yellow-800",
        text: "text-yellow-600",
        progress: "bg-yellow-500",
      },

      orange: {
        card: "border-orange-200 bg-gradient-to-br from-orange-50 to-white",
        icon: "bg-orange-100",
        title: "text-orange-800",
        text: "text-orange-600",
        progress: "bg-orange-500",
      },

      blue: {
        card: "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
        icon: "bg-blue-100",
        title: "text-blue-800",
        text: "text-blue-600",
        progress: "bg-blue-500",
      },

      purple: {
        card: "border-purple-200 bg-gradient-to-br from-purple-50 to-white",
        icon: "bg-purple-100",
        title: "text-purple-800",
        text: "text-purple-600",
        progress: "bg-purple-500",
      },

      indigo: {
        card: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-white",
        icon: "bg-indigo-100",
        title: "text-indigo-800",
        text: "text-indigo-600",
        progress: "bg-indigo-500",
      },

      pink: {
        card: "border-pink-200 bg-gradient-to-br from-pink-50 to-white",
        icon: "bg-pink-100",
        title: "text-pink-800",
        text: "text-pink-600",
        progress: "bg-pink-500",
      },

      gold: {
        card: "border-amber-200 bg-gradient-to-br from-amber-50 to-white",
        icon: "bg-amber-100",
        title: "text-amber-800",
        text: "text-amber-600",
        progress: "bg-amber-500",
      },
    };

    return styles[color] || styles.indigo;
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <section>
          <Link
            to="/dashboard"
            className="mb-5 inline-flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 p-7 text-white shadow-xl md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-3">
                    <Trophy size={30} />
                  </div>

                  <span className="font-bold tracking-wide">
                    PATHWISE ARENA
                  </span>
                </div>

                <h1 className="text-3xl font-bold md:text-4xl">
                  Learn. Earn XP. Level Up. 🚀
                </h1>

                <p className="mt-2 text-yellow-100">
                  Turn your career learning journey into an adventure.
                </p>
              </div>

              <div className="text-center">
                <p className="text-5xl font-bold">{xp}</p>

                <p className="font-semibold text-yellow-100">TOTAL XP</p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="grid gap-5 md:grid-cols-3">
          {/* XP */}

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
            <div className="w-fit rounded-xl bg-yellow-100 p-3">
              <Zap className="text-yellow-600" size={25} />
            </div>

            <p className="mt-5 text-3xl font-bold">{xp}</p>

            <p className="text-slate-500">Experience Points</p>
          </div>

          {/* LEVEL */}

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
            <div className="w-fit rounded-xl bg-indigo-100 p-3">
              <Trophy className="text-indigo-600" size={25} />
            </div>

            <p className="mt-5 text-3xl font-bold">Level {level}</p>

            <p className="text-slate-500">{levelName}</p>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs">
                <span>Progress</span>

                <span>{xpInsideLevel}/250 XP</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{
                    width: `${levelProgress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                {remainingXP} XP until next level
              </p>
            </div>
          </div>

          {/* STREAK */}

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
            <div className="w-fit rounded-xl bg-orange-100 p-3">
              <Flame className="text-orange-600" size={25} />
            </div>

            <p className="mt-5 text-3xl font-bold">{streak} 🔥</p>

            <p className="text-slate-500">Day Learning Streak</p>
          </div>
        </section>

        {/* =================================================
            ACHIEVEMENTS
        ================================================= */}

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md md:p-7">
          {/* HEADER */}

          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3">
                <Award className="text-yellow-600" size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Achievements & Badges
                </h2>

                <p className="text-sm text-slate-500">
                  Complete career milestones and collect badges.
                </p>
              </div>
            </div>

            {/* BADGE COUNT */}

            <div className="rounded-xl bg-indigo-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-indigo-700">
                {unlockedBadges}/{badges.length}
              </p>

              <p className="text-xs font-semibold text-indigo-500">
                BADGES UNLOCKED
              </p>
            </div>
          </div>

          {/* OVERALL PROGRESS */}

          <div className="mb-7 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-5">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Achievement Progress</p>

                <p className="text-xs text-slate-500">
                  Keep completing challenges to unlock more badges.
                </p>
              </div>

              <span className="font-bold text-indigo-600">
                {badgeProgress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                style={{
                  width: `${badgeProgress}%`,
                }}
              />
            </div>
          </div>

          {/* BADGES */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => {
              const styles = getBadgeStyles(badge.color, badge.unlocked);

              const progressPercentage = Math.min(
                Math.round((badge.progress / badge.target) * 100),
                100,
              );

              return (
                <div
                  key={badge.id}
                  className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${styles.card}`}
                >
                  {/* LOCK / UNLOCK */}

                  <div className="absolute right-4 top-4">
                    {badge.unlocked ? (
                      <CheckCircle2 size={20} className="text-green-500" />
                    ) : (
                      <Lock size={18} className="text-slate-400" />
                    )}
                  </div>

                  {/* ICON */}

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-sm ${styles.icon}`}
                  >
                    {badge.icon}
                  </div>

                  {/* TITLE */}

                  <h3 className={`mt-4 text-lg font-bold ${styles.title}`}>
                    {badge.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className={`mt-1 min-h-[48px] text-sm leading-5 ${styles.text}`}
                  >
                    {badge.description}
                  </p>

                  {/* STATUS */}

                  {badge.unlocked ? (
                    <div className="mt-4 rounded-lg bg-green-100 px-3 py-2 text-center">
                      <p className="text-xs font-bold text-green-700">
                        🎉 UNLOCKED
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="font-semibold text-slate-400">
                          Progress
                        </span>

                        <span className="font-bold text-slate-500">
                          {badge.progressLabel}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${styles.progress}`}
                          style={{
                            width: `${progressPercentage}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-center text-[11px] font-semibold text-slate-400">
                        🔒 Locked
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            LEADERBOARD
        ================================================= */}

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="text-yellow-500" size={26} />

            <div>
              <h2 className="text-xl font-bold text-slate-900">Leaderboard</h2>

              <p className="text-sm text-slate-500">
                See how you compare with other learners.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {leaderboard.map((person) => (
              <div
                key={person.rank}
                className={`flex items-center gap-4 rounded-xl p-4 ${
                  person.currentUser
                    ? "border border-indigo-100 bg-indigo-50"
                    : "bg-slate-50"
                }`}
              >
                {/* RANK */}

                <div className="w-10 text-center text-xl">
                  {person.rank === 1 ? "🥇" : person.rank === 2 ? "🥈" : "🥉"}
                </div>

                {/* AVATAR */}

                <div className="text-2xl">{person.avatar}</div>

                {/* USER */}

                <div className="flex-1">
                  <p className="font-semibold text-slate-800">
                    {person.name}

                    {person.currentUser && (
                      <span className="ml-2 text-xs text-primary-600">YOU</span>
                    )}
                  </p>

                  <p className="text-xs text-slate-500">
                    Level{" "}
                    {person.currentUser
                      ? level
                      : Math.floor(person.xp / 250) + 1}
                  </p>
                </div>

                {/* XP */}

                <div className="font-bold text-yellow-600">
                  ⚡ {person.xp} XP
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            HOW XP WORKS
        ================================================= */}

        <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-7 text-white shadow-xl md:p-9">
          <div className="mb-6 flex items-center gap-3">
            <Target className="text-indigo-300" size={26} />

            <h2 className="text-xl font-bold">How to Earn XP</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* SKILLS */}

            <div className="rounded-xl bg-white/10 p-5">
              <BookOpenIcon />

              <h3 className="mt-3 font-bold">Complete Skills</h3>

              <p className="mt-1 text-sm text-slate-300">
                Finish roadmap skills to earn XP.
              </p>
            </div>

            {/* ASSESSMENTS */}

            <div className="rounded-xl bg-white/10 p-5">
              <Target size={24} />

              <h3 className="mt-3 font-bold">Complete Assessments</h3>

              <p className="mt-1 text-sm text-slate-300">
                Test your knowledge and improve your career profile.
              </p>
            </div>

            {/* STREAK */}

            <div className="rounded-xl bg-white/10 p-5">
              <Flame size={24} />

              <h3 className="mt-3 font-bold">Maintain Your Streak</h3>

              <p className="mt-1 text-sm text-slate-300">
                Keep learning every day to unlock achievements.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            ACHIEVEMENT CTA
        ================================================= */}

        <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-7 text-center text-white shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <Crown size={32} />
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Keep Building Your Collection! 🏆
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-indigo-100">
            Complete challenges, maintain your streak, learn new skills and
            unlock every PathWise achievement.
          </p>

          <Link
            to="/roadmap"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Continue Learning
            <Zap size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}

// =====================================================
// SMALL ICON COMPONENT
// =====================================================

function BookOpenIcon() {
  return (
    <div className="text-indigo-300">
      <Target size={24} />
    </div>
  );
}

export default Arena;
