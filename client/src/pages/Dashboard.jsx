import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardContent from "../components/dashboard/DashboardContent";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const DEVELOPER_WISDOM = [
  { quote: "Read the error. It left you a clue.", subtext: "Debug with curiosity, one assumption at a time." },
  { quote: "Ship small. Learn fast.", subtext: "A working slice beats an unfinished masterpiece." },
  { quote: "Good names save future debugging.", subtext: "Make the next reader's job a little easier." },
  { quote: "The best shortcut is readable code.", subtext: "Clarity pays off every time you return." },
  { quote: "One bug, one hypothesis, one experiment.", subtext: "Let evidence guide your next change." },
  { quote: "Delete code. Celebrate quietly.", subtext: "Less to maintain is a feature too." },
  { quote: "Your first draft only needs to run.", subtext: "Refactor once you understand the problem." },
  { quote: "A tiny test can save a long afternoon.", subtext: "Check the behavior that matters most." },
  { quote: "Comments explain why. Code explains how.", subtext: "Leave context where the decision is surprising." },
  { quote: "Even senior devs look things up.", subtext: "Understanding matters more than memorizing syntax." },
];

const DAILY_MOTIVATION = [
  { quote: "Small steps still move your career forward.", subtext: "Choose one useful thing to learn today." },
  { quote: "Progress grows through practice.", subtext: "Give your next skill a little time each day." },
  { quote: "Your path can change as you grow.", subtext: "Let new experiences help you choose your direction." },
  { quote: "Confidence follows the work.", subtext: "Build evidence of what you can do, one step at a time." },
  { quote: "You can begin before you feel ready.", subtext: "A small first attempt is a meaningful start." },
  { quote: "Make room for your next opportunity.", subtext: "Keep learning and share what you discover." },
  { quote: "Your pace is allowed to be your own.", subtext: "Measure growth against where you started." },
  { quote: "Feedback is fuel for your next step.", subtext: "Ask a thoughtful question and try what you learn." },
  { quote: "Consistency builds possibilities.", subtext: "Today's effort adds to tomorrow's choices." },
  { quote: "A setback can teach you a new route.", subtext: "Reflect, adjust, and take the next manageable step." },
];

function getDailyQuotes() {
  const today = new Date();
  // UTC calendar dates avoid daylight-saving shifts in the day count.
  const dayOfYear = Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(today.getFullYear(), 0, 0)) / 86400000,
  );
  return {
    developer: DEVELOPER_WISDOM[dayOfYear % DEVELOPER_WISDOM.length],
    motivation: DAILY_MOTIVATION[dayOfYear % DAILY_MOTIVATION.length],
  };
}

function Dashboard() {
  const [dailyQuotes] = useState(getDailyQuotes);
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
     GAMIFICATION STATE
  ===================================================== */

  const [xp, setXp] = useState(0);
  const [completedSkills, setCompletedSkills] = useState(0);
  const [roadmapProgress, setRoadmapProgress] = useState(0);

  const [streak, setStreak] = useState(() => {
    const saved = Number(localStorage.getItem("pathwiseStreak"));
    return saved > 0 ? saved : 1;
  });

  /* =====================================================
     CAREER
  ===================================================== */

  const [selectedCareer, setSelectedCareer] = useState(
    localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer",
  );

  /* =====================================================
     NORMALIZE CAREER
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
     REFRESH PROFILE
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
     CALCULATE ROADMAP PROGRESS
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
     REFRESH GAMIFICATION
  ===================================================== */

  const refreshGamification = useCallback(() => {
    const career =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    const roadmapKey = getRoadmapKey(career);

    /* -----------------------------------------------------
       GLOBAL XP
    ----------------------------------------------------- */

    const globalXP = Math.max(
      0,
      Number(localStorage.getItem("pathwiseXP")) || 0,
    );

    /* -----------------------------------------------------
       CAREER XP
    ----------------------------------------------------- */

    const careerXP = Math.max(
      0,
      Number(localStorage.getItem(`pathwiseXP_${roadmapKey}`)) || 0,
    );

    /* -----------------------------------------------------
       IMPORTANT
       
       Global XP is the main source of truth.

       Career XP is only used if global XP does not exist.
    ----------------------------------------------------- */

    const storedGlobalXP = localStorage.getItem("pathwiseXP");

    let displayedXP;

    if (storedGlobalXP !== null) {
      displayedXP = globalXP;
    } else {
      displayedXP = careerXP;
    }

    /* -----------------------------------------------------
       GLOBAL COMPLETED SKILLS
    ----------------------------------------------------- */

    const globalCompletedSkills = Math.max(
      0,
      Number(localStorage.getItem("pathwiseCompletedSkills")) || 0,
    );

    /* -----------------------------------------------------
       CAREER COMPLETED SKILLS
    ----------------------------------------------------- */

    const careerCompletedSkills = Math.max(
      0,
      Number(localStorage.getItem(`pathwiseCompletedSkills_${roadmapKey}`)) ||
        0,
    );

    /* -----------------------------------------------------
       COMPLETED SKILLS

       Global value is source of truth when available.
    ----------------------------------------------------- */

    const storedGlobalSkills = localStorage.getItem("pathwiseCompletedSkills");

    let displayedCompletedSkills;

    if (storedGlobalSkills !== null) {
      displayedCompletedSkills = globalCompletedSkills;
    } else {
      displayedCompletedSkills = careerCompletedSkills;
    }

    /* -----------------------------------------------------
       STREAK
    ----------------------------------------------------- */

    const savedStreak = Number(localStorage.getItem("pathwiseStreak"));

    const displayedStreak = savedStreak > 0 ? savedStreak : 1;

    /* -----------------------------------------------------
       UPDATE STATE
    ----------------------------------------------------- */

    setXp(displayedXP);

    setCompletedSkills(displayedCompletedSkills);

    setStreak(displayedStreak);

    setSelectedCareer(career);

    refreshProfile();

    calculateRoadmapProgress(career);

    /* -----------------------------------------------------
       DEBUG
    ----------------------------------------------------- */

    console.log("=================================");
    console.log("PATHWISE DASHBOARD REFRESH");
    console.log("Career:", career);
    console.log("Roadmap key:", roadmapKey);
    console.log("Global XP:", globalXP);
    console.log("Career XP:", careerXP);
    console.log("Displayed XP:", displayedXP);
    console.log("Global completed skills:", globalCompletedSkills);
    console.log("Career completed skills:", careerCompletedSkills);
    console.log("Displayed completed skills:", displayedCompletedSkills);
    console.log("Streak:", displayedStreak);
    console.log("=================================");
  }, [calculateRoadmapProgress, getRoadmapKey, refreshProfile]);

  /* =====================================================
     DASHBOARD EVENT LISTENERS
  ===================================================== */

  useEffect(() => {
    refreshGamification();

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
  }, [refreshGamification, refreshProfile]);

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

  /* =====================================================
     DISPLAY NAME
  ===================================================== */

  const displayName = profileName || user?.displayName || user?.name || "there";

  /* =====================================================
     AVATAR
  ===================================================== */

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="pw-dashboard">
      <Navbar />
      <DashboardContent
        name={displayName} career={selectedCareer} xp={xp} level={level}
        levelName={levelName} levelProgress={levelProgress} remainingXP={remainingXP}
        streak={streak} completedSkills={completedSkills} progress={roadmapProgress}
        skills={skills} badges={badges} leaderboard={leaderboard}
        unlockedBadges={unlockedBadges} dailyQuotes={dailyQuotes}
      />
    </div>
  );
}

export default Dashboard;
