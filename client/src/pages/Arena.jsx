import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Zap,
  Flame,
  Medal,
  ArrowLeft,
  Target,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Arena() {
  const xp = Number(localStorage.getItem("pathwiseXP")) || 0;
  const completedSkills =
    Number(localStorage.getItem("pathwiseCompletedSkills")) || 0;
  const streak = Number(localStorage.getItem("pathwiseStreak")) || 1;

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

  const profileName = localStorage.getItem("pathwiseProfileName") || "You";

  const badges = [
    {
      name: "First Step",
      icon: "🚀",
      unlocked: completedSkills >= 1,
      requirement: "Complete 1 skill",
    },
    {
      name: "Skill Builder",
      icon: "🛠️",
      unlocked: completedSkills >= 5,
      requirement: "Complete 5 skills",
    },
    {
      name: "Roadmap Starter",
      icon: "🗺️",
      unlocked: completedSkills >= 10,
      requirement: "Complete 10 skills",
    },
    {
      name: "Consistency King",
      icon: "🔥",
      unlocked: streak >= 7,
      requirement: "Reach a 7 day streak",
    },
    {
      name: "Unstoppable",
      icon: "💎",
      unlocked: streak >= 30,
      requirement: "Reach a 30 day streak",
    },
    {
      name: "Career Ready",
      icon: "🏆",
      unlocked: level >= 5,
      requirement: "Reach Level 5",
    },
  ];

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* HEADER */}

        <section>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-5 hover:text-primary-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-7 md:p-9 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Trophy size={30} />
                  </div>

                  <span className="font-bold tracking-wide">
                    PATHWISE ARENA
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  Learn. Earn XP. Level Up. 🚀
                </h1>

                <p className="text-yellow-100 mt-2">
                  Turn your career learning journey into an adventure.
                </p>
              </div>

              <div className="text-center">
                <p className="text-5xl font-bold">{xp}</p>
                <p className="text-yellow-100 font-semibold">TOTAL XP</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
            <div className="bg-yellow-100 w-fit p-3 rounded-xl">
              <Zap className="text-yellow-600" size={25} />
            </div>

            <p className="text-3xl font-bold mt-5">{xp}</p>

            <p className="text-slate-500">Experience Points</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
            <div className="bg-indigo-100 w-fit p-3 rounded-xl">
              <Star className="text-indigo-600" size={25} />
            </div>

            <p className="text-3xl font-bold mt-5">Level {level}</p>

            <p className="text-slate-500">{levelName}</p>

            <div className="mt-4">
              <div className="flex justify-between text-xs mb-2">
                <span>Progress</span>
                <span>{xpInsideLevel}/250 XP</span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${levelProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
            <div className="bg-orange-100 w-fit p-3 rounded-xl">
              <Flame className="text-orange-600" size={25} />
            </div>

            <p className="text-3xl font-bold mt-5">{streak} 🔥</p>

            <p className="text-slate-500">Day Learning Streak</p>
          </div>
        </section>

        {/* BADGES */}

        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Medal className="text-yellow-500" size={26} />

            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Badges</h2>

              <p className="text-sm text-slate-500">
                Unlock badges by making progress.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-xl p-5 text-center border ${
                  badge.unlocked
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-slate-50 border-slate-100 opacity-50"
                }`}
              >
                <div className="text-4xl mb-3">
                  {badge.unlocked ? badge.icon : "🔒"}
                </div>

                <p className="font-bold text-sm">{badge.name}</p>

                <p className="text-xs text-slate-500 mt-2">
                  {badge.unlocked ? "Unlocked" : badge.requirement}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERBOARD */}

        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
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
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  person.currentUser
                    ? "bg-indigo-50 border border-indigo-100"
                    : "bg-slate-50"
                }`}
              >
                <div className="w-10 text-center text-xl">
                  {person.rank === 1 ? "🥇" : person.rank === 2 ? "🥈" : "🥉"}
                </div>

                <div className="text-2xl">{person.avatar}</div>

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

                <div className="font-bold text-yellow-600">
                  ⚡ {person.xp} XP
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW XP WORKS */}

        <section className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-7 md:p-9 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-indigo-300" size={26} />

            <h2 className="text-xl font-bold">How to Earn XP</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white/10 rounded-xl p-5">
              <BookOpenIcon />
              <h3 className="font-bold mt-3">Complete Skills</h3>
              <p className="text-sm text-slate-300 mt-1">
                Finish roadmap skills to earn XP.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <Target size={24} />
              <h3 className="font-bold mt-3">Complete Assessments</h3>
              <p className="text-sm text-slate-300 mt-1">
                Test your knowledge and improve your career profile.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <Flame size={24} />
              <h3 className="font-bold mt-3">Maintain Your Streak</h3>
              <p className="text-sm text-slate-300 mt-1">
                Keep learning every day to unlock achievements.
              </p>
            </div>
          </div>
        </section>

        {/* ACTION */}

        <section className="text-center">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Continue Learning
            <Zap size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}

function BookOpenIcon() {
  return (
    <div className="text-indigo-300">
      <Target size={24} />
    </div>
  );
}

export default Arena;
