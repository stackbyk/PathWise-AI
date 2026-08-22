import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FunnyMessage from "../components/FunnyMessage";

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
  Rocket,
  Gamepad2,
  Sparkles,
  Shield,
  Code2,
  RefreshCw,
  FileText,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =====================================================
   GET TODAY
===================================================== */

const getToday = () => {
  return new Date().toDateString();
};

/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard() {
  const { user } = useAuth();

  /* =====================================================
     PROFILE
  ===================================================== */

  const getProfileName = useCallback(() => {
    const savedName = localStorage.getItem("pathwiseProfileName");

    if (savedName && savedName.trim()) {
      return savedName.trim();
    }

    if (user?.displayName && user.displayName.trim()) {
      return user.displayName.trim();
    }

    if (user?.name && user.name.trim()) {
      return user.name.trim();
    }

    return "";
  }, [user]);

  const [profileName, setProfileName] = useState(getProfileName());

  const [profileSkills, setProfileSkills] = useState(() => {
    try {
      const savedSkills = localStorage.getItem("pathwiseProfileSkills");

      if (!savedSkills) return [];

      const parsed = JSON.parse(savedSkills);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load profile skills:", error);
      return [];
    }
  });

  /* =====================================================
     NORMALIZED SKILLS
  ===================================================== */

  const skills = profileSkills.map((skill) => {
    if (typeof skill === "string") {
      return {
        name: skill,
        progress: 0,
        completed: false,
      };
    }

    return {
      name: skill?.name || skill?.skill || "Unknown Skill",
      progress: Number(skill?.progress) || 0,
      completed: skill?.completed === true || skill?.isCompleted === true,
    };
  });

  /* =====================================================
     GAMIFICATION
  ===================================================== */

  const [xp, setXp] = useState(0);
  const [completedSkills, setCompletedSkills] = useState(0);
  const [roadmapProgress, setRoadmapProgress] = useState(0);

  const [streak, setStreak] = useState(() => {
    const saved = Number(localStorage.getItem("pathwiseStreak"));
    return saved > 0 ? saved : 1;
  });

  /* =====================================================
     DAILY DEVELOPER CHALLENGE
  ===================================================== */

  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [challengeLoading, setChallengeLoading] = useState(true);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submittingChallenge, setSubmittingChallenge] = useState(false);

  /* =====================================================
     DAILY QUEST
  ===================================================== */

  const [dailyQuestCompleted, setDailyQuestCompleted] = useState(() => {
    const savedDate = localStorage.getItem("pathwiseDailyQuestDate");

    return savedDate === getToday();
  });

  /* =====================================================
     CAREER CHALLENGE WHEEL
  ===================================================== */

  const careerChallenges = [
    {
      title: "DSA Sprint",
      description: "Solve 2 DSA problems today. 💻",
      icon: "💻",
    },
    {
      title: "Learn Something New",
      description: "Learn one new concept related to your target career. 📚",
      icon: "📚",
    },
    {
      title: "Quiz Time",
      description: "Take a skill quiz and test your knowledge. 🧠",
      icon: "🧠",
    },
    {
      title: "Roadmap Mission",
      description: "Complete one skill from your career roadmap. 🗺️",
      icon: "🗺️",
    },
    {
      title: "Skill Gap Check",
      description: "Review your missing skills and choose one to work on. 🔍",
      icon: "🔍",
    },
    {
      title: "Interview Practice",
      description: "Practice answering one technical interview question. 🎯",
      icon: "🎯",
    },
    {
      title: "Keep The Streak",
      description:
        "Complete today's learning activity and protect your streak. 🔥",
      icon: "🔥",
    },
  ];

  const [wheelChallenge, setWheelChallenge] = useState(null);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelCompleted, setWheelCompleted] = useState(false);

  /* =====================================================
     CAREER
  ===================================================== */

  const [selectedCareer, setSelectedCareer] = useState(
    localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer",
  );

  /* =====================================================
     TOKEN HELPER
  ===================================================== */

  const getAuthToken = useCallback(() => {
    const possibleKeys = [
      "pathwiseToken",
      "token",
      "authToken",
      "accessToken",
      "jwtToken",
      "pathwise_auth_token",
    ];

    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);

      if (value && value.trim()) {
        return value.trim();
      }
    }

    console.warn("No authentication token found in localStorage.");

    return null;
  }, []);

  /* =====================================================
     NORMALIZE TOKEN
  ===================================================== */

  const cleanToken = useCallback((token) => {
    if (!token) return null;

    let cleaned = token.trim();

    if (cleaned.startsWith("Bearer ")) {
      cleaned = cleaned.substring(7).trim();
    }

    return cleaned;
  }, []);

  /* =====================================================
     LOAD DAILY DEVELOPER CHALLENGE
  ===================================================== */

  const loadDailyChallenge = useCallback(async () => {
    setChallengeLoading(true);
    setChallengeMessage("");
    setSelectedAnswer("");

    try {
      const rawToken = getAuthToken();
      const token = cleanToken(rawToken);

      console.log("=================================");
      console.log("DAILY CHALLENGE LOAD");
      console.log("API:", `${API_BASE_URL}/api/challenges/daily`);
      console.log("Token exists:", !!token);
      console.log("=================================");

      if (!token) {
        setDailyChallenge(null);
        setChallengeCompleted(false);
        setDailyQuestCompleted(false);

        setChallengeMessage("Please log in again to load today's challenge.");

        setChallengeLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/challenges/daily`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("content-type") || "";

      const responseText = await response.text();

      console.log("Challenge status:", response.status);
      console.log("Challenge content type:", contentType);
      console.log("Challenge response:", responseText);

      if (!contentType.includes("application/json")) {
        console.error(
          "Challenge API returned non-JSON response:",
          responseText,
        );

        setDailyChallenge(null);
        setDailyQuestCompleted(false);

        if (response.status === 401) {
          setChallengeMessage(
            "Your login session has expired. Please log in again.",
          );
        } else if (response.status === 404) {
          setChallengeMessage(
            "Challenge API route was not found. Check the backend route.",
          );
        } else {
          setChallengeMessage(
            `Challenge server returned an unexpected response (${response.status}).`,
          );
        }

        setChallengeLoading(false);
        return;
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error("Failed to parse challenge JSON:", error);

        setDailyChallenge(null);
        setDailyQuestCompleted(false);

        setChallengeMessage("The challenge server returned invalid data.");

        setChallengeLoading(false);
        return;
      }

      if (!response.ok) {
        setDailyChallenge(null);
        setDailyQuestCompleted(false);

        if (response.status === 401) {
          setChallengeMessage("Please log in again to load today's challenge.");
        } else {
          setChallengeMessage(
            data?.message || "Failed to load today's challenge.",
          );
        }

        setChallengeLoading(false);
        return;
      }

      if (!data?.success || !data?.challenge) {
        setDailyChallenge(null);
        setDailyQuestCompleted(false);

        setChallengeMessage(
          data?.message || "Today's challenge could not be loaded.",
        );

        setChallengeLoading(false);
        return;
      }

      setDailyChallenge(data.challenge);

      const today = getToday();

      const challengeId = data.challenge._id || data.challenge.id;

      const completedChallengeId = localStorage.getItem(
        "pathwiseDailyDeveloperChallengeId",
      );

      const completedChallengeDate = localStorage.getItem(
        "pathwiseDailyDeveloperChallengeDate",
      );

      const alreadyCompleted =
        completedChallengeId === String(challengeId) &&
        completedChallengeDate === today;

      setChallengeCompleted(alreadyCompleted);

      const savedQuestDate = localStorage.getItem("pathwiseDailyQuestDate");

      const alreadyCompletedDailyQuest =
        alreadyCompleted && savedQuestDate === today;

      setDailyQuestCompleted(alreadyCompletedDailyQuest);

      if (alreadyCompleted) {
        setChallengeMessage(
          "Amazing work! You already completed today's coding challenge. 🎉",
        );
      }

      setChallengeLoading(false);
    } catch (error) {
      console.error("Daily challenge loading error:", error);

      setDailyChallenge(null);
      setDailyQuestCompleted(false);

      setChallengeMessage(
        "Unable to connect to the challenge server. Please try again.",
      );

      setChallengeLoading(false);
    }
  }, [cleanToken, getAuthToken]);

  /* =====================================================
     COMPLETE DAILY DEVELOPER CHALLENGE
  ===================================================== */

  const completeDailyDeveloperChallenge = async () => {
    if (!dailyChallenge) return;
    if (challengeCompleted) return;
    if (submittingChallenge) return;

    if (selectedAnswer === "") {
      setChallengeMessage("Please select an answer first.");
      return;
    }

    const rawToken = getAuthToken();
    const token = cleanToken(rawToken);

    if (!token) {
      setChallengeMessage(
        "Please log in again before completing the challenge.",
      );
      return;
    }

    setSubmittingChallenge(true);
    setChallengeMessage("");

    try {
      const challengeId = dailyChallenge._id || dailyChallenge.id;

      const response = await fetch(
        `${API_BASE_URL}/api/challenges/daily/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challengeId,
            selectedAnswer: Number(selectedAnswer),
          }),
        },
      );

      const contentType = response.headers.get("content-type") || "";

      const responseText = await response.text();

      console.log("Challenge completion status:", response.status);

      console.log("Challenge completion response:", responseText);

      if (!contentType.includes("application/json")) {
        setChallengeMessage(
          "The server returned an unexpected response. Please try again.",
        );

        return;
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error("Challenge completion JSON error:", error);

        setChallengeMessage("Invalid response from the server.");

        return;
      }

      if (!response.ok) {
        if (response.status === 401) {
          setChallengeMessage(
            "Please log in again before completing the challenge.",
          );
        } else {
          setChallengeMessage(
            data?.message || "Failed to submit today's challenge.",
          );
        }

        return;
      }

      /* WRONG ANSWER */

      if (!data.correct) {
        setChallengeMessage("Not quite! Try again. 💪");

        return;
      }

      /* CORRECT ANSWER */

      const earnedXP = Number(data.xpEarned) || Number(dailyChallenge.xp) || 20;

      const currentXP = Math.max(
        0,
        Number(localStorage.getItem("pathwiseXP")) || 0,
      );

      const newXP = currentXP + earnedXP;

      localStorage.setItem("pathwiseXP", String(newXP));

      const today = getToday();

      localStorage.setItem(
        "pathwiseDailyDeveloperChallengeId",
        String(challengeId),
      );

      localStorage.setItem("pathwiseDailyDeveloperChallengeDate", today);

      const currentCompletedChallenges = Math.max(
        0,
        Number(localStorage.getItem("pathwiseCompletedChallenges")) || 0,
      );

      const newCompletedChallenges = currentCompletedChallenges + 1;

      localStorage.setItem(
        "pathwiseCompletedChallenges",
        String(newCompletedChallenges),
      );

      setXp(newXP);
      setChallengeCompleted(true);
      setDailyQuestCompleted(false);
      setSelectedAnswer("");

      setChallengeMessage(
        `Developer Challenge Completed! 🎉 +${earnedXP} XP\n\nDaily Quest is now unlocked! Complete it below to earn another +20 XP.`,
      );

      window.dispatchEvent(new Event("pathwiseXPUpdated"));

      window.dispatchEvent(new Event("pathwiseGamificationUpdated"));
    } catch (error) {
      console.error("Challenge completion error:", error);

      setChallengeMessage(
        "Unable to connect to the challenge server. Please try again.",
      );
    } finally {
      setSubmittingChallenge(false);
    }
  };

  /* =====================================================
     CAREER CHALLENGE WHEEL
  ===================================================== */

  const spinCareerWheel = () => {
    if (wheelSpinning) return;

    setWheelSpinning(true);
    setWheelCompleted(false);
    setWheelChallenge(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * careerChallenges.length);

      setWheelChallenge(careerChallenges[randomIndex]);

      setWheelSpinning(false);
    }, 1200);
  };

  /* =====================================================
     COMPLETE WHEEL CHALLENGE
  ===================================================== */

  const completeWheelChallenge = () => {
    if (!wheelChallenge || wheelCompleted) {
      return;
    }

    const currentXP = Math.max(
      0,
      Number(localStorage.getItem("pathwiseXP")) || 0,
    );

    const newXP = currentXP + 20;

    localStorage.setItem("pathwiseXP", String(newXP));

    setXp(newXP);
    setWheelCompleted(true);

    window.dispatchEvent(new Event("pathwiseXPUpdated"));

    window.dispatchEvent(new Event("pathwiseGamificationUpdated"));
  };

  /* =====================================================
     PROFILE REFRESH
  ===================================================== */

  const refreshProfile = useCallback(() => {
    const name = getProfileName();

    setProfileName(name);

    try {
      const savedSkills = localStorage.getItem("pathwiseProfileSkills");

      if (!savedSkills) {
        setProfileSkills([]);
        return;
      }

      const parsed = JSON.parse(savedSkills);

      setProfileSkills(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error("Failed to refresh profile:", error);

      setProfileSkills([]);
    }
  }, [getProfileName]);

  /* =====================================================
     ROADMAP KEY
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
     ROADMAP PROGRESS
  ===================================================== */

  const calculateRoadmapProgress = useCallback(
    (career) => {
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
    },
    [getRoadmapKey],
  );

  /* =====================================================
     GAMIFICATION REFRESH
  ===================================================== */

  const refreshGamification = useCallback(() => {
    const career =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    const roadmapKey = getRoadmapKey(career);

    const globalXP = Math.max(
      0,
      Number(localStorage.getItem("pathwiseXP")) || 0,
    );

    const careerXP = Math.max(
      0,
      Number(localStorage.getItem(`pathwiseXP_${roadmapKey}`)) || 0,
    );

    const storedGlobalXP = localStorage.getItem("pathwiseXP");

    const displayedXP = storedGlobalXP !== null ? globalXP : careerXP;

    const globalCompletedSkills = Math.max(
      0,
      Number(localStorage.getItem("pathwiseCompletedSkills")) || 0,
    );

    const careerCompletedSkills = Math.max(
      0,
      Number(localStorage.getItem(`pathwiseCompletedSkills_${roadmapKey}`)) ||
        0,
    );

    const storedGlobalSkills = localStorage.getItem("pathwiseCompletedSkills");

    const displayedCompletedSkills =
      storedGlobalSkills !== null
        ? globalCompletedSkills
        : careerCompletedSkills;

    const savedStreak = Number(localStorage.getItem("pathwiseStreak"));

    const displayedStreak = savedStreak > 0 ? savedStreak : 1;

    setXp(displayedXP);
    setCompletedSkills(displayedCompletedSkills);
    setStreak(displayedStreak);
    setSelectedCareer(career);

    refreshProfile();
    calculateRoadmapProgress(career);
  }, [calculateRoadmapProgress, getRoadmapKey, refreshProfile]);

  /* =====================================================
     COMPLETE DAILY QUEST
  ===================================================== */

  const completeDailyQuest = () => {
    if (!challengeCompleted) return;

    if (dailyQuestCompleted) return;

    const today = getToday();

    const currentXP = Math.max(
      0,
      Number(localStorage.getItem("pathwiseXP")) || 0,
    );

    const dailyQuestXP = 20;

    const newXP = currentXP + dailyQuestXP;

    localStorage.setItem("pathwiseXP", String(newXP));

    localStorage.setItem("pathwiseDailyQuestDate", today);

    setDailyQuestCompleted(true);
    setXp(newXP);

    window.dispatchEvent(new Event("pathwiseXPUpdated"));

    window.dispatchEvent(new Event("pathwiseGamificationUpdated"));
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    refreshGamification();

    if (user) {
      loadDailyChallenge();
    } else {
      setChallengeLoading(false);
    }

    const handleUpdate = () => {
      refreshGamification();
    };

    const handleProfileUpdate = () => {
      refreshProfile();
    };

    window.addEventListener("pathwiseXPUpdated", handleUpdate);

    window.addEventListener("pathwiseGamificationUpdated", handleUpdate);

    window.addEventListener("pathwiseRoadmapUpdated", handleUpdate);

    window.addEventListener("pathwiseCareerUpdated", handleUpdate);

    window.addEventListener("pathwiseProfileUpdated", handleProfileUpdate);

    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("pathwiseXPUpdated", handleUpdate);

      window.removeEventListener("pathwiseGamificationUpdated", handleUpdate);

      window.removeEventListener("pathwiseRoadmapUpdated", handleUpdate);

      window.removeEventListener("pathwiseCareerUpdated", handleUpdate);

      window.removeEventListener("pathwiseProfileUpdated", handleProfileUpdate);

      window.removeEventListener("storage", handleUpdate);
    };
  }, [user, loadDailyChallenge, refreshGamification, refreshProfile]);

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

  const nextLevelXP = level * 250;

  const remainingXP = Math.max(nextLevelXP - xp, 0);

  /* =====================================================
     MOTIVATION
  ===================================================== */

  const quotes = [
    "Small progress every day creates extraordinary results. 🚀",
    "You don't need to be perfect. You just need to keep going. 💪",
    "Every skill you complete makes your future stronger. 🌱",
    "Your future self will thank you for what you learn today. 🔥",
    "One more skill. One more step. One step closer to your dream career. 🎯",
  ];

  const quote = quotes[new Date().getDate() % quotes.length];

  /* =====================================================
     DISPLAY NAME
  ===================================================== */

  const displayName = profileName || user?.displayName || user?.name || "there";

  /* =====================================================
     QUEST MESSAGE
  ===================================================== */

  const questMessage =
    roadmapProgress >= 100
      ? "Career quest completed! 🎉"
      : roadmapProgress >= 75
        ? "You're almost career-ready!"
        : roadmapProgress >= 40
          ? "You're making serious progress!"
          : "Your adventure has just begun!";

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            WELCOME
        ================================================= */}

        <section>
          <p className="mb-2 font-semibold text-primary-600">
            Your Career Dashboard
          </p>

          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Welcome back, {displayName}! 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Keep learning, keep growing and get closer to your dream career.
          </p>
        </section>

        {/* =================================================
            WISDOM + MOTIVATION
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* DEVELOPER WISDOM */}

          <section className="group relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-pulse" />

            <div
              className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-yellow-300/10 blur-3xl animate-pulse"
              style={{
                animationDelay: "1s",
              }}
            />

            <div className="pointer-events-none absolute left-8 top-5 text-3xl font-bold text-white/20 animate-bounce">
              {"</>"}
            </div>

            <div
              className="pointer-events-none absolute bottom-5 right-8 text-3xl font-bold text-white/20 animate-bounce"
              style={{
                animationDelay: "0.8s",
              }}
            >
              {"{ }"}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 text-5xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                😂
              </div>

              <p className="text-xs font-bold tracking-[0.25em] text-indigo-100 sm:text-sm">
                DEVELOPER WISDOM
              </p>

              <div className="mt-5">
                <FunnyMessage />
              </div>

              <p className="mt-5 text-sm font-medium text-indigo-100 sm:text-base">
                Keep coding. Keep debugging. Keep building. 💻✨
              </p>

              <div className="mt-6 h-1 w-20 rounded-full bg-white/70 animate-pulse" />
            </div>
          </section>

          {/* DAILY MOTIVATION */}

          <section className="group relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-pulse" />

            <div
              className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl animate-pulse"
              style={{
                animationDelay: "1s",
              }}
            />

            <div className="pointer-events-none absolute left-8 top-5 text-3xl font-bold text-white/20 animate-bounce">
              ✦
            </div>

            <div
              className="pointer-events-none absolute bottom-5 right-8 text-3xl font-bold text-white/20 animate-bounce"
              style={{
                animationDelay: "0.8s",
              }}
            >
              ✨
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 text-5xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                🧠
              </div>

              <p className="text-xs font-bold tracking-[0.25em] text-blue-100 sm:text-sm">
                DAILY MOTIVATION
              </p>

              <h2 className="mt-4 max-w-2xl text-xl font-extrabold leading-relaxed text-white sm:text-2xl">
                “{quote}”
              </h2>

              <p className="mt-5 text-sm font-medium leading-relaxed text-blue-100 sm:text-base">
                Keep showing up. Your dream career is built one skill at a time.
                🚀
              </p>

              <div className="mt-6 h-1 w-20 rounded-full bg-white/70 animate-pulse" />
            </div>
          </section>
        </div>

        {/* =================================================
            CAREER
        ================================================= */}

        <section className="rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-700 p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Target size={22} />
                <span className="font-medium">Your Target Career</span>
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                {selectedCareer}
              </h2>

              <p className="mt-2 text-indigo-100">
                Your personalized learning roadmap is ready.
              </p>
            </div>

            <Link
              to="/roadmap"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary-700 transition hover:bg-indigo-50"
            >
              Continue Roadmap
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* =================================================
            XP / LEVEL / STREAK
        ================================================= */}

        <section className="grid gap-5 md:grid-cols-3">
          {/* XP */}

          <div className="rounded-2xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-yellow-100 p-3">
                <Zap className="text-yellow-600" size={25} />
              </div>

              <span className="text-sm font-bold text-yellow-700">XP</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">{xp}</p>

            <p className="mt-1 text-sm text-slate-500">
              Total Experience Points
            </p>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs">
                <span>Level {level}</span>
                <span>{xpInsideLevel}/250 XP</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-yellow-500 transition-all"
                  style={{
                    width: `${levelProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* LEVEL */}

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-indigo-100 p-3">
                <Star className="text-indigo-600" size={25} />
              </div>

              <span className="text-sm font-bold text-indigo-600">LEVEL</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">{level}</p>

            <p className="mt-1 text-sm text-slate-500">{levelName}</p>

            <p className="mt-3 text-xs font-semibold text-indigo-600">
              Keep going! 🔥
            </p>
          </div>

          {/* STREAK */}

          <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-orange-100 p-3">
                <Flame className="text-orange-600" size={25} />
              </div>

              <span className="text-sm font-bold text-orange-600">STREAK</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {streak} 🔥
            </p>

            <p className="mt-1 text-sm text-slate-500">Day learning streak</p>

            <p className="mt-3 text-xs font-semibold text-orange-600">
              Don't break the streak!
            </p>
          </div>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-indigo-100 p-3">
                <TrendingUp className="text-primary-600" size={22} />
              </div>

              <span className="text-2xl font-bold">{roadmapProgress}%</span>
            </div>

            <p className="mt-4 text-slate-500">Roadmap Progress</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-green-100 p-3">
                <CheckCircle2 className="text-green-600" size={22} />
              </div>

              <span className="text-2xl font-bold">{completedSkills}</span>
            </div>

            <p className="mt-4 text-slate-500">Skills Completed</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-yellow-100 p-3">
                <Award className="text-yellow-600" size={22} />
              </div>

              <span className="text-2xl font-bold">{xp}</span>
            </div>

            <p className="mt-4 text-slate-500">XP Earned</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-orange-100 p-3">
                <Flame className="text-orange-600" size={22} />
              </div>

              <span className="text-2xl font-bold">{streak}</span>
            </div>

            <p className="mt-4 text-slate-500">Day Streak</p>
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="grid gap-6 lg:grid-cols-3">
          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md lg:col-span-2">
            {/* HEADER */}

            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Skills
                </h2>

                <p className="text-xs text-slate-500">
                  Track your progress toward your target career.
                </p>
              </div>

              <Brain className="text-primary-600" size={21} />
            </div>

            {/* EMPTY STATE */}

            {skills.length === 0 ? (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
                    <Brain className="text-primary-600" size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      No skills added yet
                    </p>

                    <p className="text-xs text-slate-500">
                      Add skills to track your progress.
                    </p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="shrink-0 text-xs font-semibold text-primary-600 transition hover:text-primary-700"
                >
                  Add Skills →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {skill.completed ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                          <Circle size={16} className="text-slate-300" />
                        )}

                        <span className="text-sm font-medium text-slate-700">
                          {skill.name}
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-slate-600">
                        {skill.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-primary-600 transition-all"
                        style={{
                          width: `${Math.min(
                            Math.max(skill.progress, 0),
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ASSESSMENT */}

            <Link
              to="/skill-assessment"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 transition hover:text-primary-700"
            >
              Take Skill Assessment
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                RESUME ANALYZER
            ================================================= */}

            <Link
              to="/resume-analyzer"
              className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-indigo-500/10 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-xl"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/15" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                    <FileText className="text-cyan-400" size={23} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
                    AI Career Intelligence
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                    Resume Analyzer
                  </h2>

                  <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    Upload your resume and get ATS scoring, career matching,
                    skill gaps and AI-powered improvement suggestions.
                  </p>
                </div>

                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={19} />
                </div>
              </div>

              <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-400">
                Analyze Your Resume
                <ArrowRight size={16} />
              </div>
            </Link>

            {/* =================================================
                CAREER QUEST
            ================================================= */}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 p-6 text-white shadow-xl">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-white/10 p-2">
                    <Gamepad2 size={21} className="text-purple-200" />
                  </div>

                  <span className="text-sm font-bold tracking-wide">
                    CAREER QUEST
                  </span>
                </div>

                <Sparkles size={20} className="text-yellow-300" />
              </div>

              <div className="relative mt-5">
                <h3 className="text-2xl font-extrabold">
                  Level Up Your Future
                </h3>

                <p className="mt-2 text-sm text-indigo-200">{questMessage}</p>
              </div>

              <div className="relative mt-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg">
                  <span className="text-xl font-extrabold">{level}</span>
                </div>

                <div>
                  <p className="font-bold">{levelName}</p>

                  <p className="text-xs text-indigo-200">{xp} XP earned</p>
                </div>
              </div>

              <div className="relative mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-indigo-200">Next Level</span>

                  <span className="font-bold">{remainingXP} XP left</span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-300 transition-all duration-500"
                    style={{
                      width: `${levelProgress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <Rocket size={17} className="mx-auto mb-1 text-purple-200" />

                  <p className="text-lg font-bold">{roadmapProgress}%</p>

                  <p className="text-[10px] text-indigo-200">Quest</p>
                </div>

                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <CheckCircle2
                    size={17}
                    className="mx-auto mb-1 text-green-300"
                  />

                  <p className="text-lg font-bold">{completedSkills}</p>

                  <p className="text-[10px] text-indigo-200">Skills</p>
                </div>

                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <Flame size={17} className="mx-auto mb-1 text-orange-300" />

                  <p className="text-lg font-bold">{streak}</p>

                  <p className="text-[10px] text-indigo-200">Streak</p>
                </div>
              </div>

              <Link
                to="/roadmap"
                className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-800 transition hover:bg-indigo-50"
              >
                Continue Quest
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* =================================================
                CAREER CHALLENGE WHEEL
            ================================================= */}

            <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 shadow-md">
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-purple-600">
                    Career Challenge
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Spin Your Career Quest 🎡
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Get a random challenge and earn XP.
                  </p>
                </div>

                <div className="text-4xl">🎡</div>
              </div>

              {!wheelChallenge && !wheelSpinning && (
                <button
                  onClick={spinCareerWheel}
                  className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 font-bold text-white transition hover:bg-purple-700"
                >
                  🎡 Spin the Wheel
                </button>
              )}

              {wheelSpinning && (
                <div className="mt-5 rounded-xl bg-purple-100 p-6 text-center">
                  <div className="inline-block text-5xl animate-spin">🎡</div>

                  <p className="mt-4 font-bold text-purple-700">
                    Choosing your challenge...
                  </p>

                  <p className="mt-1 text-xs text-purple-500">
                    Your career mission is being selected!
                  </p>
                </div>
              )}

              {wheelChallenge && !wheelSpinning && (
                <div className="mt-5 rounded-xl border border-purple-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-4xl">{wheelChallenge.icon}</div>

                      <h3 className="mt-3 text-lg font-bold text-slate-900">
                        {wheelChallenge.title}
                      </h3>
                    </div>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                      +20 XP
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {wheelChallenge.description}
                  </p>

                  {!wheelCompleted ? (
                    <>
                      <button
                        onClick={completeWheelChallenge}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700"
                      >
                        <CheckCircle2 size={17} />
                        Complete Challenge
                      </button>

                      <button
                        onClick={spinCareerWheel}
                        className="mt-2 w-full rounded-xl border border-purple-200 px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
                      >
                        🎡 Spin Again
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mt-4 rounded-xl bg-green-100 px-4 py-3 text-center">
                        <p className="font-bold text-green-700">
                          🎉 Challenge Completed!
                        </p>

                        <p className="mt-1 text-sm text-green-600">
                          +20 XP earned
                        </p>
                      </div>

                      <button
                        onClick={spinCareerWheel}
                        className="mt-3 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                      >
                        🎡 Spin Another Challenge
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                DAILY DEVELOPER CHALLENGE
            ================================================= */}

            <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 p-6 text-white shadow-xl">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/20" />

              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-indigo-400/10" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Code2 size={23} className="text-indigo-200" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                      Daily Developer Challenge
                    </p>

                    <h2 className="text-lg font-bold">Today's Coding Quest</h2>
                  </div>
                </div>

                <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-bold text-yellow-300">
                  +{dailyChallenge?.xp || 20} XP
                </span>
              </div>

              {/* LOADING */}

              {challengeLoading && (
                <div className="relative mt-6 flex items-center justify-center py-8">
                  <div className="flex items-center gap-3 text-indigo-200">
                    <RefreshCw size={20} className="animate-spin" />

                    <span>Loading today's challenge...</span>
                  </div>
                </div>
              )}

              {/* ERROR */}

              {!challengeLoading && !dailyChallenge && (
                <div className="relative mt-6">
                  <div className="rounded-xl bg-white/10 p-4">
                    <p className="font-semibold text-white">
                      Today's challenge could not be loaded.
                    </p>

                    {challengeMessage && (
                      <p className="mt-2 text-sm text-indigo-200">
                        {challengeMessage}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={loadDailyChallenge}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-800 transition hover:bg-indigo-50"
                  >
                    <RefreshCw size={17} />
                    Try Again
                  </button>
                </div>
              )}

              {/* CHALLENGE */}

              {!challengeLoading && dailyChallenge && (
                <div className="relative mt-6">
                  <div className="rounded-xl bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-indigo-400/20 px-3 py-1 text-xs font-bold text-indigo-200">
                        {dailyChallenge.category}
                      </span>

                      <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-bold text-green-300">
                        {dailyChallenge.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-black/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-indigo-300">
                      Challenge
                    </p>

                    <p className="mt-2 text-base font-medium leading-7 text-white">
                      {dailyChallenge.question}
                    </p>
                  </div>

                  {!challengeCompleted && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-semibold text-indigo-100">
                        Choose your answer:
                      </p>

                      {Array.isArray(dailyChallenge.options) &&
                        dailyChallenge.options.map((option, index) => {
                          const isSelected =
                            String(index) === String(selectedAnswer);

                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSelectedAnswer(String(index))}
                              className={`w-full rounded-xl border p-4 text-left transition ${
                                isSelected
                                  ? "border-indigo-300 bg-indigo-500/30 ring-2 ring-indigo-300/30"
                                  : "border-white/10 bg-white/10 hover:bg-white/15"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                    isSelected
                                      ? "bg-white text-indigo-800"
                                      : "bg-white/10 text-indigo-200"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>

                                <span className="text-sm text-white">
                                  {option}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  )}

                  {challengeMessage && !challengeCompleted && (
                    <div className="mt-4 whitespace-pre-line rounded-xl bg-white/10 px-4 py-3 text-sm text-indigo-100">
                      {challengeMessage}
                    </div>
                  )}

                  {!challengeCompleted && (
                    <button
                      onClick={completeDailyDeveloperChallenge}
                      disabled={submittingChallenge || selectedAnswer === ""}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-800 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submittingChallenge ? (
                        <>
                          <RefreshCw size={17} className="animate-spin" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={17} />
                          Submit Answer
                        </>
                      )}
                    </button>
                  )}

                  {challengeCompleted && (
                    <div className="mt-4">
                      <div className="rounded-xl border border-green-300/20 bg-green-400/10 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20">
                            <CheckCircle2
                              className="text-green-300"
                              size={22}
                            />
                          </div>

                          <div>
                            <p className="font-bold text-green-300">
                              Developer Challenge Completed! 🎉
                            </p>

                            <p className="text-sm text-green-100">
                              +{dailyChallenge.xp || 20} XP earned
                            </p>
                          </div>
                        </div>

                        {challengeMessage && (
                          <p className="mt-3 whitespace-pre-line text-sm text-indigo-100">
                            {challengeMessage}
                          </p>
                        )}

                        {dailyChallenge.explanation && (
                          <div className="mt-4 rounded-xl bg-white/10 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-indigo-300">
                              Explanation
                            </p>

                            <p className="mt-2 text-sm leading-6 text-indigo-100">
                              {dailyChallenge.explanation}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 rounded-xl border border-purple-300/20 bg-purple-400/10 p-4">
                          <p className="font-bold text-purple-200">
                            🔓 Daily Quest Unlocked!
                          </p>

                          <p className="mt-1 text-sm text-indigo-200">
                            Complete the quest below to earn another +20 XP.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                DAILY QUEST
            ================================================= */}

            <div
              className={`relative overflow-hidden rounded-2xl border p-5 shadow-md transition ${
                !challengeCompleted
                  ? "border-slate-200 bg-slate-100"
                  : dailyQuestCompleted
                    ? "border-green-200 bg-green-50"
                    : "border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      dailyQuestCompleted
                        ? "bg-green-100"
                        : challengeCompleted
                          ? "bg-indigo-100"
                          : "bg-slate-200"
                    }`}
                  >
                    {dailyQuestCompleted ? (
                      <CheckCircle2 className="text-green-600" size={23} />
                    ) : challengeCompleted ? (
                      <Zap className="text-indigo-600" size={23} />
                    ) : (
                      <Shield className="text-slate-400" size={23} />
                    )}
                  </div>

                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-wide ${
                        challengeCompleted
                          ? "text-indigo-600"
                          : "text-slate-400"
                      }`}
                    >
                      Daily Quest
                    </p>

                    <p className="font-bold text-slate-800">
                      {dailyQuestCompleted
                        ? "Quest Completed! 🎉"
                        : !challengeCompleted
                          ? "Quest Locked 🔒"
                          : "Complete Today's Quest"}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    challengeCompleted
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  +20 XP
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {dailyQuestCompleted
                  ? "Amazing work! You completed both of today's quests. 🚀"
                  : !challengeCompleted
                    ? "Complete today's Daily Developer Challenge above to unlock this quest."
                    : "You've completed the developer challenge! Now take one small step toward your career goal."}
              </p>

              {!challengeCompleted && !dailyQuestCompleted && (
                <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500">
                  <Shield size={17} />
                  Complete Developer Challenge First
                </div>
              )}

              {challengeCompleted && !dailyQuestCompleted && (
                <button
                  onClick={completeDailyQuest}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  <CheckCircle2 size={17} />
                  Complete Quest +20 XP
                </button>
              )}

              {dailyQuestCompleted && (
                <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-sm font-bold text-green-700">
                  <CheckCircle2 size={17} />
                  Completed Today
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            PLACEMENT READINESS
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 shadow-md">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-indigo-100 p-3">
                <Target className="text-indigo-600" size={25} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                  Placement Readiness
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Know how ready you are for placements
                </h2>

                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  See how your assessment, verification, skills, roadmap and
                  practice progress contribute to your career readiness.
                </p>
              </div>
            </div>

            <Link
              to="/placement-readiness"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
            >
              View Readiness Score
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* =================================================
            RECENT ACHIEVEMENT
        ================================================= */}

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <Award className="text-yellow-500" size={25} />

            <div>
              <h2 className="text-xl font-bold">Recent Achievement</h2>

              <p className="text-sm text-slate-500">
                Keep going — you're making progress!
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-800">🏆 First Steps</p>

            <p className="mt-1 text-sm text-yellow-700">
              Completed your first career assessment.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
