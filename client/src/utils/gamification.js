// ==========================================
// PATHWISE AI
// GAMIFICATION ENGINE
// ==========================================

// ------------------------------------------
// XP SYSTEM
// ------------------------------------------

export const getXP = () => {
  return Number(localStorage.getItem("pathwiseXP") || 0);
};

export const addXP = (amount) => {
  const currentXP = getXP();
  const newXP = currentXP + amount;

  localStorage.setItem("pathwiseXP", newXP);

  return newXP;
};

// ------------------------------------------
// LEVEL SYSTEM
// ------------------------------------------

export const getLevel = (xp = getXP()) => {
  if (xp >= 3000) return 6;
  if (xp >= 2000) return 5;
  if (xp >= 1200) return 4;
  if (xp >= 600) return 3;
  if (xp >= 250) return 2;

  return 1;
};

export const getLevelName = (level = getLevel()) => {
  const levels = {
    1: "Beginner",
    2: "Explorer",
    3: "Skill Builder",
    4: "Career Ready",
    5: "PathWise Pro",
    6: "PathWise Legend",
  };

  return levels[level] || "Beginner";
};

export const getLevelEmoji = (level = getLevel()) => {
  const emojis = {
    1: "🌱",
    2: "🧭",
    3: "🛠️",
    4: "🚀",
    5: "🏆",
    6: "👑",
  };

  return emojis[level] || "🌱";
};

// ------------------------------------------
// LEVEL XP
// ------------------------------------------

export const getLevelStartXP = (level = getLevel()) => {
  const levels = {
    1: 0,
    2: 250,
    3: 600,
    4: 1200,
    5: 2000,
    6: 3000,
  };

  return levels[level] || 0;
};

export const getNextLevelXP = (level = getLevel()) => {
  const levels = {
    1: 250,
    2: 600,
    3: 1200,
    4: 2000,
    5: 3000,
    6: 3000,
  };

  return levels[level] || 250;
};

export const getLevelProgress = (xp = getXP()) => {
  const level = getLevel(xp);

  if (level >= 6) {
    return 100;
  }

  const startXP = getLevelStartXP(level);
  const nextXP = getNextLevelXP(level);

  const progress = ((xp - startXP) / (nextXP - startXP)) * 100;

  return Math.min(100, Math.max(0, Math.round(progress)));
};

// ------------------------------------------
// COMPLETED SKILLS
// ------------------------------------------

export const getCompletedSkills = () => {
  return JSON.parse(localStorage.getItem("completedSkills") || "[]");
};

export const getCompletedSkillCount = () => {
  return getCompletedSkills().length;
};

// ------------------------------------------
// COMPLETE SKILL
// ------------------------------------------

export const completeSkill = (skillName, xpReward = 50) => {
  const completedSkills = getCompletedSkills();

  // Prevent duplicate XP
  if (completedSkills.includes(skillName)) {
    return {
      alreadyCompleted: true,
      xp: getXP(),
      reward: 0,
    };
  }

  completedSkills.push(skillName);

  localStorage.setItem("completedSkills", JSON.stringify(completedSkills));

  const newXP = addXP(xpReward);

  return {
    alreadyCompleted: false,
    xp: newXP,
    reward: xpReward,
  };
};

// ------------------------------------------
// STREAK SYSTEM
// ------------------------------------------

export const getStreak = () => {
  return Number(localStorage.getItem("pathwiseStreak") || 0);
};

export const updateStreak = () => {
  const today = new Date().toDateString();

  const lastActivity = localStorage.getItem("lastActivityDate");

  let streak = getStreak();

  if (!lastActivity) {
    streak = 1;
  } else {
    const lastDate = new Date(lastActivity);
    const currentDate = new Date(today);

    const difference = Math.floor(
      (currentDate - lastDate) / (1000 * 60 * 60 * 24),
    );

    if (difference === 1) {
      streak += 1;
    } else if (difference > 1) {
      streak = 1;
    }
  }

  localStorage.setItem("pathwiseStreak", streak);

  localStorage.setItem("lastActivityDate", today);

  return streak;
};

// ------------------------------------------
// DAILY GOAL
// ------------------------------------------

export const getDailyGoal = () => {
  return Number(localStorage.getItem("dailyGoal") || 2);
};

export const getDailyProgress = () => {
  const today = new Date().toDateString();

  const savedDate = localStorage.getItem("dailyGoalDate");

  if (savedDate !== today) {
    localStorage.setItem("dailyGoalProgress", "0");

    localStorage.setItem("dailyGoalDate", today);

    return 0;
  }

  return Number(localStorage.getItem("dailyGoalProgress") || 0);
};

export const incrementDailyGoal = () => {
  const current = getDailyProgress();

  const goal = getDailyGoal();

  const newProgress = Math.min(current + 1, goal);

  localStorage.setItem("dailyGoalProgress", newProgress);

  return newProgress;
};

// ------------------------------------------
// BADGES
// ------------------------------------------

export const getBadges = () => {
  return JSON.parse(localStorage.getItem("pathwiseBadges") || "[]");
};

export const unlockBadge = (badgeId) => {
  const badges = getBadges();

  if (!badges.includes(badgeId)) {
    badges.push(badgeId);

    localStorage.setItem("pathwiseBadges", JSON.stringify(badges));

    return true;
  }

  return false;
};

// ------------------------------------------
// AVAILABLE BADGES
// ------------------------------------------

export const BADGES = [
  {
    id: "first-step",
    name: "First Step",
    emoji: "🥇",
    description: "Complete your first skill",
    xp: 25,
  },

  {
    id: "skill-builder",
    name: "Skill Builder",
    emoji: "🛠️",
    description: "Complete 5 skills",
    xp: 50,
  },

  {
    id: "roadmap-starter",
    name: "Roadmap Starter",
    emoji: "🗺️",
    description: "Complete 10 skills",
    xp: 100,
  },

  {
    id: "streak-3",
    name: "Getting Started",
    emoji: "🔥",
    description: "Maintain a 3-day streak",
    xp: 50,
  },

  {
    id: "streak-7",
    name: "Consistency King",
    emoji: "🔥",
    description: "Maintain a 7-day streak",
    xp: 150,
  },

  {
    id: "streak-30",
    name: "Unstoppable",
    emoji: "⚡",
    description: "Maintain a 30-day streak",
    xp: 500,
  },

  {
    id: "quiz-master",
    name: "Quiz Master",
    emoji: "🧠",
    description: "Complete 5 quizzes",
    xp: 100,
  },

  {
    id: "career-ready",
    name: "Career Ready",
    emoji: "🚀",
    description: "Reach Level 4",
    xp: 200,
  },

  {
    id: "pathwise-pro",
    name: "PathWise Pro",
    emoji: "🏆",
    description: "Reach Level 5",
    xp: 500,
  },
];

// ------------------------------------------
// MOTIVATIONAL QUOTES
// ------------------------------------------

export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Small progress is still progress.",
    author: "PathWise",
  },

  {
    quote: "Your future self will thank you for starting today.",
    author: "PathWise",
  },

  {
    quote: "Consistency beats intensity.",
    author: "PathWise",
  },

  {
    quote: "You don't need to know everything. You just need to keep learning.",
    author: "PathWise",
  },

  {
    quote: "Every skill you learn makes your career stronger.",
    author: "PathWise",
  },

  {
    quote: "Don't compare your beginning to someone else's middle.",
    author: "PathWise",
  },

  {
    quote: "One completed skill today is better than ten planned for tomorrow.",
    author: "PathWise",
  },

  {
    quote: "Your skill gap is not a limitation. It's your learning roadmap.",
    author: "PathWise",
  },
];

export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);

  return MOTIVATIONAL_QUOTES[index];
};

// ------------------------------------------
// RANK SYSTEM
// ------------------------------------------

export const getRank = (xp = getXP()) => {
  if (xp >= 3000) return "Diamond";
  if (xp >= 2000) return "Platinum";
  if (xp >= 1200) return "Gold";
  if (xp >= 600) return "Silver";

  return "Bronze";
};

export const getRankEmoji = (rank = getRank()) => {
  const ranks = {
    Bronze: "🥉",
    Silver: "🥈",
    Gold: "🥇",
    Platinum: "💎",
    Diamond: "👑",
  };

  return ranks[rank] || "🥉";
};

// ------------------------------------------
// DAILY CHALLENGES
// ------------------------------------------

export const DAILY_CHALLENGES = [
  {
    id: "challenge-1",
    title: "Skill Sprint",
    description: "Complete 2 roadmap skills today.",
    reward: 100,
    emoji: "⚡",
  },

  {
    id: "challenge-2",
    title: "Knowledge Boost",
    description: "Complete one difficult skill gap.",
    reward: 75,
    emoji: "🧠",
  },

  {
    id: "challenge-3",
    title: "Consistency Challenge",
    description: "Keep your learning streak alive today.",
    reward: 50,
    emoji: "🔥",
  },

  {
    id: "challenge-4",
    title: "Career Builder",
    description: "Spend at least 20 minutes learning today.",
    reward: 75,
    emoji: "🚀",
  },
];

// ------------------------------------------
// LEADERBOARD DEMO DATA
// ------------------------------------------

// Temporary frontend leaderboard.
// Later this will come from MongoDB.

export const getLeaderboard = () => {
  const userXP = getXP();

  const leaderboard = [
    {
      name: "Alex",
      xp: 2450,
      avatar: "🧑‍💻",
    },

    {
      name: "Priya",
      xp: 2120,
      avatar: "👩‍💻",
    },

    {
      name: "Rahul",
      xp: 790,
      avatar: "👨‍💻",
    },

    {
      name: "Sara",
      xp: 650,
      avatar: "👩‍🎓",
    },
  ];

  leaderboard.push({
    name: "You",
    xp: userXP,
    avatar: "🚀",
  });

  return leaderboard
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
};

// ------------------------------------------
// COMPLETE LEARNING ACTIVITY
// ------------------------------------------

export const recordLearningActivity = (skillName, xpReward = 50) => {
  const result = completeSkill(skillName, xpReward);

  if (result.alreadyCompleted) {
    return result;
  }

  updateStreak();

  incrementDailyGoal();

  return result;
};
