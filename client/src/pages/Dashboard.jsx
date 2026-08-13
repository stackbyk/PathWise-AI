import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Target,
  TrendingUp,
  Award,
  Flame,
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Brain,
  Trophy,
  Zap,
  Star,
  Medal,
} from "lucide-react";

function Dashboard() {
  /* =====================================================
     GAMIFICATION STATE
  ===================================================== */
  const { user, logout } = useAuth();
  const [xp, setXp] = useState(Number(localStorage.getItem("pathwiseXP")) || 0);

  const [completedSkills, setCompletedSkills] = useState(
    Number(localStorage.getItem("pathwiseCompletedSkills")) || 0,
  );

  const [roadmapProgress, setRoadmapProgress] = useState(0);

  const [selectedCareer, setSelectedCareer] = useState(
    localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer",
  );

  /* =====================================================
     REFRESH DASHBOARD DATA
  ===================================================== */

  const refreshDashboard = () => {
    const currentXP = Number(localStorage.getItem("pathwiseXP")) || 0;

    const currentCompletedSkills =
      Number(localStorage.getItem("pathwiseCompletedSkills")) || 0;

    setXp(currentXP);
    setCompletedSkills(currentCompletedSkills);

    const career =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    setSelectedCareer(career);

    calculateRoadmapProgress(career);
  };

  /* =====================================================
     CALCULATE ROADMAP PROGRESS
  ===================================================== */

  const calculateRoadmapProgress = (career) => {
    const normalizedCareer = career.trim().toLowerCase().replace(/\s+/g, " ");

    let roadmapKey = career;

    if (
      normalizedCareer.includes("ai") ||
      normalizedCareer.includes("machine learning")
    ) {
      roadmapKey = "AI / ML Engineer";
    } else if (normalizedCareer.includes("data scientist")) {
      roadmapKey = "Data Scientist";
    } else if (normalizedCareer.includes("cloud")) {
      roadmapKey = "Cloud Engineer";
    } else if (
      normalizedCareer.includes("cyber") ||
      normalizedCareer.includes("security")
    ) {
      roadmapKey = "Cybersecurity Engineer";
    } else if (normalizedCareer.includes("devops")) {
      roadmapKey = "DevOps Engineer";
    } else if (normalizedCareer.includes("mobile")) {
      roadmapKey = "Mobile App Developer";
    } else if (
      normalizedCareer.includes("ui/ux") ||
      normalizedCareer.includes("designer")
    ) {
      roadmapKey = "UI/UX Designer";
    } else if (
      normalizedCareer.includes("full stack") ||
      normalizedCareer.includes("full-stack") ||
      normalizedCareer.includes("fullstack")
    ) {
      roadmapKey = "Full Stack Developer";
    }

    const storageKey = `pathwiseRoadmap_${roadmapKey}`;

    const savedRoadmap = localStorage.getItem(storageKey);

    if (!savedRoadmap) {
      setRoadmapProgress(0);
      return;
    }

    try {
      const roadmap = JSON.parse(savedRoadmap);

      const allSkills = roadmap.flatMap((phase) => phase.skills);

      if (allSkills.length === 0) {
        setRoadmapProgress(0);
        return;
      }

      const completed = allSkills.filter((skill) => skill.completed).length;

      const progress = Math.round((completed / allSkills.length) * 100);

      setRoadmapProgress(progress);
    } catch {
      setRoadmapProgress(0);
    }
  };

  /* =====================================================
     LISTEN FOR ROADMAP XP UPDATES
  ===================================================== */

  useEffect(() => {
    refreshDashboard();

    const handleXPUpdate = () => {
      refreshDashboard();
    };

    window.addEventListener("pathwiseXPUpdated", handleXPUpdate);

    window.addEventListener("storage", handleXPUpdate);

    return () => {
      window.removeEventListener("pathwiseXPUpdated", handleXPUpdate);

      window.removeEventListener("storage", handleXPUpdate);
    };
  }, []);

  /* =====================================================
     LEVEL SYSTEM
  ===================================================== */

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

  /* =====================================================
     STREAK
  ===================================================== */

  const [streak] = useState(() => {
    return Number(localStorage.getItem("pathwiseStreak")) || 1;
  });

  /* =====================================================
     LEADERBOARD
  ===================================================== */

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
      name: "You",
      xp: xp,
      avatar: "🚀",
    },
  ];

  /* =====================================================
     SKILLS
  ===================================================== */

  const skills = [
    {
      name: "HTML & CSS",
      progress: 90,
      completed: true,
    },
    {
      name: "JavaScript",
      progress: 75,
      completed: true,
    },
    {
      name: "React",
      progress: 50,
      completed: false,
    },
    {
      name: "Node.js",
      progress: 30,
      completed: false,
    },
    {
      name: "MongoDB",
      progress: 20,
      completed: false,
    },
  ];

  /* =====================================================
     MOTIVATIONAL QUOTES
  ===================================================== */

  const quotes = [
    "Small progress every day creates extraordinary results. 🚀",
    "You don't need to be perfect. You just need to keep going. 💪",
    "Every skill you complete makes your future stronger. 🌱",
    "Your future self will thank you for what you learn today. 🔥",
    "One more skill. One more step. One step closer to your dream career. 🎯",
  ];

  const quote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="py-8 space-y-8">
      {/* =====================================================
          WELCOME
      ===================================================== */}

      <section>
        <p className="text-primary-600 font-semibold mb-2">
          Your Career Dashboard
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}! 👋
        </h1>

        <p className="text-slate-600 mt-2">
          Keep learning, keep growing and get closer to your dream career.
        </p>
      </section>

      {/* =====================================================
          CAREER GOAL
      ===================================================== */}

      <section className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target size={22} />

              <span className="font-medium">Your Target Career</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">{selectedCareer}</h2>

            <p className="text-indigo-100 mt-2">
              Your personalized learning roadmap is ready.
            </p>
          </div>

          <Link
            to="/roadmap"
            className="bg-white text-primary-700 px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition"
          >
            Continue Roadmap
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          GAMIFICATION HERO
      ===================================================== */}

      <section className="grid md:grid-cols-3 gap-5">
        {/* XP */}

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Zap className="text-yellow-600" size={25} />
            </div>

            <span className="text-sm font-bold text-yellow-700">XP</span>
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">{xp}</p>

          <p className="text-sm text-slate-500 mt-1">Total Experience Points</p>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span>Level {level}</span>

              <span>{xpInsideLevel}/250 XP</span>
            </div>

            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all"
                style={{
                  width: `${levelProgress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* LEVEL */}

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Star className="text-indigo-600" size={25} />
            </div>

            <span className="text-sm font-bold text-indigo-600">LEVEL</span>
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">{level}</p>

          <p className="text-sm text-slate-500 mt-1">{levelName}</p>

          <p className="text-xs text-indigo-600 font-semibold mt-3">
            Keep going! 🔥
          </p>
        </div>

        {/* STREAK */}

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Flame className="text-orange-600" size={25} />
            </div>

            <span className="text-sm font-bold text-orange-600">STREAK</span>
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">{streak} 🔥</p>

          <p className="text-sm text-slate-500 mt-1">Day learning streak</p>

          <p className="text-xs text-orange-600 font-semibold mt-3">
            Don't break the streak!
          </p>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <TrendingUp className="text-primary-600" size={22} />
            </div>

            <span className="text-2xl font-bold">{roadmapProgress}%</span>
          </div>

          <p className="text-slate-500 mt-4">Roadmap Progress</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle2 className="text-green-600" size={22} />
            </div>

            <span className="text-2xl font-bold">{completedSkills}</span>
          </div>

          <p className="text-slate-500 mt-4">Skills Completed</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Award className="text-yellow-600" size={22} />
            </div>

            <span className="text-2xl font-bold">{xp}</span>
          </div>

          <p className="text-slate-500 mt-4">XP Earned</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Flame className="text-orange-600" size={22} />
            </div>

            <span className="text-2xl font-bold">{streak}</span>
          </div>

          <p className="text-slate-500 mt-4">Day Streak</p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="grid lg:grid-cols-3 gap-6">
        {/* SKILLS */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Skills</h2>

              <p className="text-sm text-slate-500 mt-1">
                Track your progress toward your target career.
              </p>
            </div>

            <Brain className="text-primary-600" size={24} />
          </div>

          <div className="space-y-5">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {skill.completed ? (
                      <CheckCircle2 size={18} className="text-green-500" />
                    ) : (
                      <Circle size={18} className="text-slate-300" />
                    )}

                    <span className="font-medium text-slate-700">
                      {skill.name}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    {skill.progress}%
                  </span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all"
                    style={{
                      width: `${skill.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/assessment"
            className="mt-6 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
          >
            Take Skill Assessment
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* QUICK ACTIONS */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>

          <p className="text-sm text-slate-500 mt-1 mb-5">
            Continue your career journey.
          </p>

          <div className="space-y-3">
            <Link
              to="/careers"
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition"
            >
              <Target className="text-primary-600" size={21} />

              <div>
                <p className="font-semibold text-slate-800">Explore Careers</p>

                <p className="text-xs text-slate-500">Find your ideal career</p>
              </div>
            </Link>

            <Link
              to="/assessment"
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition"
            >
              <Brain className="text-primary-600" size={21} />

              <div>
                <p className="font-semibold text-slate-800">Skill Assessment</p>

                <p className="text-xs text-slate-500">
                  Identify your skill gaps
                </p>
              </div>
            </Link>

            <Link
              to="/roadmap"
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition"
            >
              <BookOpen className="text-primary-600" size={21} />

              <div>
                <p className="font-semibold text-slate-800">View Roadmap</p>

                <p className="text-xs text-slate-500">Continue learning</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          LEADERBOARD
      ===================================================== */}

      <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="text-yellow-500" size={23} />
              PathWise Leaderboard
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              A little friendly competition never hurts 😎
            </p>
          </div>

          <Medal className="text-yellow-500" size={28} />
        </div>

        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-4 p-4 rounded-xl ${
                user.name === "You"
                  ? "bg-indigo-50 border border-indigo-100"
                  : "bg-slate-50"
              }`}
            >
              <div className="w-10 text-center font-bold text-slate-500">
                {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
              </div>

              <div className="text-2xl">{user.avatar}</div>

              <div className="flex-1">
                <p className="font-semibold text-slate-800">
                  {user.name}
                  {user.name === "You" && (
                    <span className="ml-2 text-xs text-primary-600">YOU</span>
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  Level{" "}
                  {user.name === "You" ? level : Math.floor(user.xp / 250) + 1}
                </p>
              </div>

              <div className="font-bold text-yellow-600">⚡ {user.xp} XP</div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          DAILY MOTIVATION
      ===================================================== */}

      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-7 md:p-9 text-white shadow-xl text-center">
        <div className="text-4xl mb-3">🧠</div>

        <p className="text-xs font-bold tracking-widest text-indigo-300 mb-3">
          DAILY MOTIVATION
        </p>

        <h2 className="text-xl md:text-2xl font-bold">“{quote}”</h2>

        <p className="text-slate-300 mt-3">
          Keep showing up. Your dream career is built one skill at a time. 🚀
        </p>
      </section>

      {/* =====================================================
          ACHIEVEMENT
      ===================================================== */}

      <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="text-yellow-500" size={25} />

          <div>
            <h2 className="text-xl font-bold">Recent Achievement</h2>

            <p className="text-sm text-slate-500">
              Keep going — you're making progress!
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="font-semibold text-yellow-800">🏆 First Steps</p>

          <p className="text-sm text-yellow-700 mt-1">
            Completed your first career assessment.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
