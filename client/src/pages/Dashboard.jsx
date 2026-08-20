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
  Medal,
  Rocket,
  Gamepad2,
  Sparkles,
  Shield,
  Crown,
  Code2,
  RefreshCw,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Dashboard() {
  /* =====================================================
     AUTH
  ===================================================== */

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
    const today = new Date().toDateString();

    return savedDate === today;
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

        setChallengeMessage("Please log in again to load today's challenge.");

        setChallengeLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/challenges/daily`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

        setChallengeMessage(
          "The challenge server returned invalid data. Please try again.",
        );

        setChallengeLoading(false);
        return;
      }

      if (!response.ok) {
        console.error("Challenge API error:", data);

        setDailyChallenge(null);

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

        setChallengeMessage(
          data?.message || "Today's challenge could not be loaded.",
        );

        setChallengeLoading(false);
        return;
      }

      setDailyChallenge(data.challenge);

      /* -------------------------------------------------
         CHECK LOCAL COMPLETION
      ------------------------------------------------- */

      const today = new Date().toDateString();

      const completedChallengeId = localStorage.getItem(
        "pathwiseDailyDeveloperChallengeId",
      );

      const completedChallengeDate = localStorage.getItem(
        "pathwiseDailyDeveloperChallengeDate",
      );

      const alreadyCompleted =
        completedChallengeId === String(data.challenge.id) &&
        completedChallengeDate === today;

      setChallengeCompleted(alreadyCompleted);

      if (alreadyCompleted) {
        setChallengeMessage(
          "Amazing work! You already completed today's coding challenge. 🎉",
        );
      }

      setChallengeLoading(false);
    } catch (error) {
      console.error("Daily challenge loading error:", error);

      setDailyChallenge(null);

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

    const rawToken = getAuthToken();
    const token = cleanToken(rawToken);

    if (!token) {
      setChallengeMessage(
        "Please log in again before completing the challenge.",
      );
      return;
    }

    /* -------------------------------------------------
       ANSWER CHECK
    ------------------------------------------------- */

    const userAnswer = String(selectedAnswer || "")
      .trim()
      .replace(/\s+/g, "");

    const correctAnswer = String(dailyChallenge.answer || "")
      .trim()
      .replace(/\s+/g, "");

    if (!userAnswer) {
      setChallengeMessage("Please enter your answer first.");
      return;
    }

    if (userAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
      setChallengeMessage("Not quite! Try again. 💪");
      return;
    }

    setSubmittingChallenge(true);
    setChallengeMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/challenges/daily/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challengeId: dailyChallenge.id,
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

        setSubmittingChallenge(false);
        return;
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error("Challenge completion JSON error:", error);

        setChallengeMessage("Invalid response from the server.");

        setSubmittingChallenge(false);
        return;
      }

      if (!response.ok || !data?.success) {
        if (response.status === 401) {
          setChallengeMessage(
            "Please log in again before completing the challenge.",
          );
        } else {
          setChallengeMessage(
            data?.message || "Failed to complete today's challenge.",
          );
        }

        setSubmittingChallenge(false);
        return;
      }

      /* -------------------------------------------------
         XP
      ------------------------------------------------- */

      const earnedXP = Number(data.xpEarned) || 20;

      const currentXP = Math.max(
        0,
        Number(localStorage.getItem("pathwiseXP")) || 0,
      );

      const newXP = currentXP + earnedXP;

      localStorage.setItem("pathwiseXP", String(newXP));

      /* -------------------------------------------------
         DAILY CHALLENGE COMPLETION
      ------------------------------------------------- */

      const today = new Date().toDateString();

      localStorage.setItem(
        "pathwiseDailyDeveloperChallengeId",
        String(dailyChallenge.id),
      );

      localStorage.setItem("pathwiseDailyDeveloperChallengeDate", today);

      /* -------------------------------------------------
         UPDATE UI
      ------------------------------------------------- */

      setXp(newXP);

      setChallengeCompleted(true);

      setChallengeMessage(`Quest Completed! 🎉 +${earnedXP} XP`);

      window.dispatchEvent(new Event("pathwiseXPUpdated"));

      window.dispatchEvent(new Event("pathwiseGamificationUpdated"));
    } catch (error) {
      console.error("Challenge completion error:", error);

      setChallengeMessage(
        "Unable to complete the challenge. Please try again.",
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
     COMPLETE SIMPLE DAILY QUEST
  ===================================================== */

  const completeDailyQuest = () => {
    if (dailyQuestCompleted) {
      return;
    }

    const today = new Date().toDateString();

    const currentXP = Math.max(
      0,
      Number(localStorage.getItem("pathwiseXP")) || 0,
    );

    const newXP = currentXP + 20;

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
     BADGES
  ===================================================== */

  const badges = [
    {
      id: 1,
      name: "First Step",
      icon: "🚀",
      unlocked: completedSkills >= 1,
    },
    {
      id: 2,
      name: "Skill Builder",
      icon: "🛠️",
      unlocked: completedSkills >= 5,
    },
    {
      id: 3,
      name: "Roadmap Starter",
      icon: "🗺️",
      unlocked: completedSkills >= 10,
    },
    {
      id: 4,
      name: "Consistency King",
      icon: "🔥",
      unlocked: streak >= 7,
    },
    {
      id: 5,
      name: "Unstoppable",
      icon: "💎",
      unlocked: streak >= 30,
    },
    {
      id: 6,
      name: "Career Ready",
      icon: "🏆",
      unlocked: level >= 5,
    },
  ];

  const unlockedBadges = badges.filter((badge) => badge.unlocked).length;

  /* =====================================================
     SKILLS
  ===================================================== */

  const skills =
    profileSkills.length > 0
      ? profileSkills.map((skill) => ({
          name: typeof skill === "string" ? skill : skill.name || "Skill",

          progress: typeof skill === "object" ? Number(skill.progress) || 0 : 0,

          completed:
            typeof skill === "object" ? skill.completed === true : false,
        }))
      : [];

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
      name: profileName || "You",
      xp,
      avatar: "🚀",
      currentUser: true,
    },
  ];

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* =================================================
            WELCOME
        ================================================= */}

        <section>
          <p className="text-primary-600 font-semibold mb-2">
            Your Career Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Welcome back, {displayName}! 👋
          </h1>

          <p className="text-slate-600 mt-2">
            Keep learning, keep growing and get closer to your dream career.
          </p>

          <div className="mt-5 max-w-2xl">
            <FunnyMessage />
          </div>
        </section>

        {/* =================================================
            CAREER
        ================================================= */}

        <section className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target size={22} />

                <span className="font-medium">Your Target Career</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold">
                {selectedCareer}
              </h2>

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

        {/* =================================================
            XP / LEVEL / STREAK
        ================================================= */}

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

            <p className="text-sm text-slate-500 mt-1">
              Total Experience Points
            </p>

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

            <p className="text-3xl font-bold text-slate-900 mt-5">
              {streak} 🔥
            </p>

            <p className="text-sm text-slate-500 mt-1">Day learning streak</p>

            <p className="text-xs text-orange-600 font-semibold mt-3">
              Don't break the streak!
            </p>
          </div>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

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

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="grid lg:grid-cols-3 gap-6">
          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Your Skills
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Track your progress toward your target career.
                </p>
              </div>

              <Brain className="text-primary-600" size={24} />
            </div>

            {skills.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="mx-auto text-slate-300" size={42} />

                <p className="text-slate-500 mt-3">
                  You haven't added any skills yet.
                </p>

                <Link
                  to="/profile"
                  className="mt-4 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                >
                  Add Skills to Profile
                  <ArrowRight size={17} />
                </Link>
              </div>
            ) : (
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

            <Link
              to="/skill-assessment"
              className="mt-6 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Take Skill Assessment
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="space-y-6">
            {/* QUICK ACTIONS */}

            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-5">
                Continue your career journey.
              </p>

              <div className="space-y-3">
                <Link
                  to="/career-exploration"
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition"
                >
                  <Target className="text-primary-600" size={21} />

                  <div>
                    <p className="font-semibold text-slate-800">
                      Explore Careers
                    </p>

                    <p className="text-xs text-slate-500">
                      Find your ideal career
                    </p>
                  </div>
                </Link>

                <Link
                  to="/skill-assessment"
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition"
                >
                  <Brain className="text-primary-600" size={21} />

                  <div>
                    <p className="font-semibold text-slate-800">
                      Skill Assessment
                    </p>

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

                <Link
                  to="/arena"
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-yellow-50 transition"
                >
                  <Trophy className="text-yellow-500" size={21} />

                  <div>
                    <p className="font-semibold text-slate-800">
                      PathWise Arena
                    </p>

                    <p className="text-xs text-slate-500">
                      View XP, badges & leaderboard
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* CAREER QUEST */}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 p-6 text-white shadow-xl">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-purple-500/20" />

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
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-purple-200/40" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-purple-600">
                    Career Challenge
                  </p>

                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    Spin Your Career Quest 🎡
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Get a random challenge and earn XP.
                  </p>
                </div>

                <div className="text-4xl">🎡</div>
              </div>

              {/* BEFORE SPIN */}

              {!wheelChallenge && !wheelSpinning && (
                <button
                  onClick={spinCareerWheel}
                  className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-700 transition"
                >
                  🎡 Spin the Wheel
                </button>
              )}

              {/* SPINNING */}

              {wheelSpinning && (
                <div className="mt-5 rounded-xl bg-purple-100 p-6 text-center">
                  <div className="text-5xl animate-spin inline-block">🎡</div>

                  <p className="mt-4 font-bold text-purple-700">
                    Choosing your challenge...
                  </p>

                  <p className="text-xs text-purple-500 mt-1">
                    Your career mission is being selected!
                  </p>
                </div>
              )}

              {/* RESULT */}

              {wheelChallenge && !wheelSpinning && (
                <div className="mt-5 rounded-xl bg-white border border-purple-100 p-5 shadow-sm">
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
                        className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 transition"
                      >
                        <CheckCircle2 size={17} />
                        Complete Challenge
                      </button>

                      <button
                        onClick={spinCareerWheel}
                        className="mt-2 w-full rounded-xl border border-purple-200 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-50 transition"
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

                        <p className="text-sm text-green-600 mt-1">
                          +20 XP earned
                        </p>
                      </div>

                      <button
                        onClick={spinCareerWheel}
                        className="mt-3 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white hover:bg-purple-700 transition"
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
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-500/20" />

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
                  +20 XP
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
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-800 hover:bg-indigo-50 transition"
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
                      <h3 className="text-lg font-bold">
                        {dailyChallenge.title}
                      </h3>

                      <span className="rounded-full bg-green-400/20 px-2.5 py-1 text-xs font-bold text-green-300">
                        {dailyChallenge.difficulty}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-indigo-100">
                      {dailyChallenge.description}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl bg-black/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-indigo-300">
                      Challenge
                    </p>

                    <p className="mt-2 text-sm text-white">
                      {dailyChallenge.question}
                    </p>
                  </div>

                  {!challengeCompleted && (
                    <>
                      <div className="mt-4">
                        <label className="text-sm font-semibold text-indigo-100">
                          Your Answer
                        </label>

                        <input
                          type="text"
                          value={selectedAnswer}
                          onChange={(event) =>
                            setSelectedAnswer(event.target.value)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              completeDailyDeveloperChallenge();
                            }
                          }}
                          placeholder="Enter your answer..."
                          className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-300 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/30"
                        />
                      </div>

                      {challengeMessage && (
                        <div className="mt-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-indigo-100">
                          {challengeMessage}
                        </div>
                      )}

                      <button
                        onClick={completeDailyDeveloperChallenge}
                        disabled={submittingChallenge}
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
                    </>
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
                              Quest Completed! 🎉
                            </p>

                            <p className="text-sm text-green-100">
                              +20 XP earned
                            </p>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-indigo-100">
                          Amazing work! Come back tomorrow for a new daily
                          challenge.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                DAILY QUEST
            ================================================= */}

            <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                    {dailyQuestCompleted ? (
                      <CheckCircle2 className="text-green-600" size={23} />
                    ) : (
                      <Zap className="text-indigo-600" size={23} />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                      Daily Quest
                    </p>

                    <p className="font-bold text-slate-800">
                      {dailyQuestCompleted
                        ? "Quest Completed! 🎉"
                        : "Complete Today's Quest"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold text-yellow-700">
                  +20 XP
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {dailyQuestCompleted
                  ? "Amazing work! Come back tomorrow for a new daily challenge."
                  : "Take one small step toward your career goal today."}
              </p>

              {!dailyQuestCompleted && (
                <button
                  onClick={completeDailyQuest}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  <CheckCircle2 size={17} />
                  Complete Quest
                </button>
              )}

              {dailyQuestCompleted && (
                <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-sm font-bold text-green-700">
                  <CheckCircle2 size={17} />
                  Completed Today
                </div>
              )}
            </div>

            {/* =================================================
                MINI ACHIEVEMENT
            ================================================= */}

            <div className="relative overflow-hidden rounded-2xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
                  {completedSkills >= 1 ? (
                    <Crown className="text-yellow-600" size={23} />
                  ) : (
                    <Shield className="text-yellow-600" size={23} />
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-yellow-700">
                    Next Achievement
                  </p>

                  <p className="font-bold text-slate-800">
                    {completedSkills >= 10
                      ? "Roadmap Master 🏆"
                      : completedSkills >= 5
                        ? "Skill Builder 🛠️"
                        : "First Step 🚀"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600">
                {completedSkills >= 10
                  ? "Amazing! Keep completing skills to reach the next milestone."
                  : completedSkills >= 5
                    ? `${Math.max(
                        10 - completedSkills,
                        0,
                      )} more skills to unlock Roadmap Starter.`
                    : `${Math.max(
                        1 - completedSkills,
                        0,
                      )} skill to unlock your first badge.`}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            LEADERBOARD
        ================================================= */}

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
            {leaderboard.map((leaderboardUser) => (
              <div
                key={leaderboardUser.rank}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  leaderboardUser.currentUser
                    ? "bg-indigo-50 border border-indigo-100"
                    : "bg-slate-50"
                }`}
              >
                <div className="w-10 text-center font-bold text-slate-500">
                  {leaderboardUser.rank === 1
                    ? "🥇"
                    : leaderboardUser.rank === 2
                      ? "🥈"
                      : "🥉"}
                </div>

                <div className="text-2xl">{leaderboardUser.avatar}</div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-800">
                    {leaderboardUser.name}

                    {leaderboardUser.currentUser && (
                      <span className="ml-2 text-xs text-primary-600 font-bold">
                        YOU
                      </span>
                    )}
                  </p>

                  <p className="text-xs text-slate-500">
                    Level{" "}
                    {leaderboardUser.currentUser
                      ? level
                      : Math.floor(leaderboardUser.xp / 250) + 1}
                  </p>
                </div>

                <div className="font-bold text-yellow-600">
                  ⚡ {leaderboardUser.xp} XP
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            BADGES
        ================================================= */}

        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Medal className="text-yellow-500" size={23} />
                Your Badges
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {unlockedBadges}/{badges.length} badges unlocked
              </p>
            </div>

            <Link
              to="/arena"
              className="text-primary-600 font-semibold text-sm flex items-center gap-1 hover:text-primary-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-xl p-4 text-center border transition ${
                  badge.unlocked
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-slate-50 border-slate-100 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">
                  {badge.unlocked ? badge.icon : "🔒"}
                </div>

                <p className="font-semibold text-sm text-slate-800">
                  {badge.name}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {badge.unlocked ? "Unlocked" : "Locked"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            DAILY MOTIVATION
        ================================================= */}

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

        {/* =================================================
            ACHIEVEMENT
        ================================================= */}

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
      </main>
    </div>
  );
}

export default Dashboard;
