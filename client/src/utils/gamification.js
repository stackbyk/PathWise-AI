/* =========================================================
   PATHWISE GAMIFICATION SYSTEM
========================================================= */

export const XP_PER_SKILL = 50;
export const XP_PER_LEVEL = 250;

/* =========================================================
   SKILL QUEST SETTINGS
========================================================= */

export const QUEST_XP = 75;
export const QUEST_BONUS_XP = 150;
export const QUEST_STREAK_BONUS = 25;

/* =========================================================
   GET CURRENT XP
========================================================= */

export const getXP = () => {
  return Number(localStorage.getItem("pathwiseXP")) || 0;
};

/* =========================================================
   GET COMPLETED SKILLS
========================================================= */

export const getCompletedSkills = () => {
  return Number(localStorage.getItem("pathwiseCompletedSkills")) || 0;
};

/* =========================================================
   GET STREAK
========================================================= */

export const getStreak = () => {
  return Number(localStorage.getItem("pathwiseStreak")) || 0;
};

/* =========================================================
   GET LEVEL
========================================================= */

export const getLevel = (xp = getXP()) => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};

/* =========================================================
   GET LEVEL PROGRESS
========================================================= */

export const getLevelProgress = (xp = getXP()) => {
  const currentXP = xp % XP_PER_LEVEL;

  return Math.round((currentXP / XP_PER_LEVEL) * 100);
};

/* =========================================================
   NOTIFY APP
========================================================= */

const notifyGamificationUpdate = () => {
  window.dispatchEvent(new Event("pathwiseXPUpdated"));
  window.dispatchEvent(new Event("pathwiseGamificationUpdated"));
  window.dispatchEvent(new Event("pathwiseStreakUpdated"));
  window.dispatchEvent(new Event("pathwiseQuestUpdated"));
};

/* =========================================================
   GET TODAY
========================================================= */

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

/* =========================================================
   RECORD LEARNING ACTIVITY
========================================================= */

export const recordLearningActivity = () => {
  const today = getToday();

  const lastActivity = localStorage.getItem("pathwiseLastActivityDate");

  let streak = Number(localStorage.getItem("pathwiseStreak")) || 0;

  /* -------------------------------------------------------
     FIRST EVER ACTIVITY
  ------------------------------------------------------- */

  if (!lastActivity) {
    streak = 1;

    localStorage.setItem("pathwiseStreak", streak);
    localStorage.setItem("pathwiseLastActivityDate", today);

    notifyGamificationUpdate();

    return streak;
  }

  /* -------------------------------------------------------
     SAME DAY
  ------------------------------------------------------- */

  if (lastActivity === today) {
    return streak;
  }

  /* -------------------------------------------------------
     CALCULATE DAYS BETWEEN ACTIVITIES
  ------------------------------------------------------- */

  const previousDate = new Date(lastActivity);
  const currentDate = new Date(today);

  const difference = Math.floor(
    (currentDate - previousDate) / (1000 * 60 * 60 * 24),
  );

  /* -------------------------------------------------------
     NEXT DAY
  ------------------------------------------------------- */

  if (difference === 1) {
    streak += 1;
  }

  /* -------------------------------------------------------
     MISSED DAYS
  ------------------------------------------------------- */

  if (difference > 1) {
    streak = 1;
  }

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  localStorage.setItem("pathwiseStreak", streak);
  localStorage.setItem("pathwiseLastActivityDate", today);

  notifyGamificationUpdate();

  return streak;
};

/* =========================================================
   COMPLETE ROADMAP SKILL
========================================================= */

export const completeSkill = (career, skillId, skillName) => {
  const completedKey = `pathwiseCompletedSkill_${career}_${skillId}`;

  /* -------------------------------------------------------
     PREVENT DUPLICATE XP
  ------------------------------------------------------- */

  const alreadyCompleted = localStorage.getItem(completedKey);

  if (alreadyCompleted === "true") {
    return {
      success: false,
      message: "Skill already completed.",
    };
  }

  /* -------------------------------------------------------
     MARK EXACT SKILL AS COMPLETED
  ------------------------------------------------------- */

  localStorage.setItem(completedKey, "true");

  /* -------------------------------------------------------
     ADD XP
  ------------------------------------------------------- */

  const currentXP = getXP();
  const newXP = currentXP + XP_PER_SKILL;

  localStorage.setItem("pathwiseXP", newXP);

  /* -------------------------------------------------------
     ADD COMPLETED SKILL COUNT
  ------------------------------------------------------- */

  const currentCompletedSkills = getCompletedSkills();

  const newCompletedSkills = currentCompletedSkills + 1;

  localStorage.setItem("pathwiseCompletedSkills", newCompletedSkills);

  /* -------------------------------------------------------
     RECORD DAILY LEARNING ACTIVITY
  ------------------------------------------------------- */

  const newStreak = recordLearningActivity();

  /* -------------------------------------------------------
     SAVE LAST COMPLETED SKILL
  ------------------------------------------------------- */

  localStorage.setItem(
    "pathwiseLastCompletedSkill",
    JSON.stringify({
      career,
      skillId,
      skillName,
      xp: XP_PER_SKILL,
      completedAt: new Date().toISOString(),
    }),
  );

  /* -------------------------------------------------------
     CHECK WHETHER THIS SKILL COMPLETES A QUEST
  ------------------------------------------------------- */

  checkAndCompleteSkillQuest(career, skillId, skillName);

  /* -------------------------------------------------------
     NOTIFY DASHBOARD + ARENA
  ------------------------------------------------------- */

  notifyGamificationUpdate();

  return {
    success: true,
    xp: getXP(),
    completedSkills: newCompletedSkills,
    streak: newStreak,
    level: getLevel(getXP()),
  };
};

/* =========================================================
   CHECK WHETHER SKILL ALREADY COMPLETED
========================================================= */

export const isSkillCompleted = (career, skillId) => {
  const completedKey = `pathwiseCompletedSkill_${career}_${skillId}`;

  return localStorage.getItem(completedKey) === "true";
};

/* =========================================================
   ADD XP
========================================================= */

export const addXP = (amount) => {
  const currentXP = getXP();

  const newXP = currentXP + Number(amount);

  localStorage.setItem("pathwiseXP", newXP);

  notifyGamificationUpdate();

  return newXP;
};

/* =========================================================
   SET XP
========================================================= */

export const setXP = (amount) => {
  const newXP = Math.max(0, Number(amount));

  localStorage.setItem("pathwiseXP", newXP);

  notifyGamificationUpdate();

  return newXP;
};

/* =========================================================
   SKILL QUEST DATA
========================================================= */

/*
  Quest types:

  1. Daily Skill Quest
  2. Streak Quest
  3. XP Quest
  4. Skill Completion Quest
*/

export const getSkillQuests = () => {
  return [
    {
      id: "daily-skill",
      title: "Daily Skill Hunter",
      description: "Complete 1 roadmap skill today.",
      icon: "🎯",
      xp: QUEST_XP,
      type: "daily",
    },

    {
      id: "skill-master",
      title: "Skill Master",
      description: "Complete 3 roadmap skills.",
      icon: "⚡",
      xp: QUEST_BONUS_XP,
      type: "milestone",
    },

    {
      id: "streak-builder",
      title: "Streak Builder",
      description: "Build a learning streak of 3 days.",
      icon: "🔥",
      xp: QUEST_BONUS_XP,
      type: "streak",
    },

    {
      id: "xp-hunter",
      title: "XP Hunter",
      description: "Earn 250 XP.",
      icon: "💎",
      xp: QUEST_BONUS_XP,
      type: "xp",
    },

    {
      id: "career-climber",
      title: "Career Climber",
      description: "Complete 5 roadmap skills.",
      icon: "🚀",
      xp: QUEST_BONUS_XP,
      type: "milestone",
    },
  ];
};

/* =========================================================
   GET QUEST STATE
========================================================= */

export const getQuestState = () => {
  try {
    const saved = localStorage.getItem("pathwiseSkillQuestState");

    if (!saved) {
      return {};
    }

    const parsed = JSON.parse(saved);

    if (parsed && typeof parsed === "object") {
      return parsed;
    }

    return {};
  } catch (error) {
    console.error("Failed to load quest state:", error);

    return {};
  }
};

/* =========================================================
   SAVE QUEST STATE
========================================================= */

const saveQuestState = (state) => {
  localStorage.setItem("pathwiseSkillQuestState", JSON.stringify(state));
};

/* =========================================================
   CHECK QUEST COMPLETION
========================================================= */

export const isQuestCompleted = (questId) => {
  const state = getQuestState();

  return state[questId]?.completed === true;
};

/* =========================================================
   GET COMPLETED QUEST COUNT
========================================================= */

export const getCompletedQuestCount = () => {
  const state = getQuestState();

  return Object.values(state).filter((quest) => quest?.completed === true)
    .length;
};

/* =========================================================
   COMPLETE QUEST
========================================================= */

export const completeQuest = (questId) => {
  const quests = getSkillQuests();

  const quest = quests.find((item) => item.id === questId);

  if (!quest) {
    return {
      success: false,
      message: "Quest not found.",
    };
  }

  const state = getQuestState();

  /* -------------------------------------------------------
     PREVENT DUPLICATE QUEST XP
  ------------------------------------------------------- */

  if (state[questId]?.completed === true) {
    return {
      success: false,
      message: "Quest already completed.",
    };
  }

  /* -------------------------------------------------------
     ADD QUEST XP
  ------------------------------------------------------- */

  const currentXP = getXP();

  const newXP = currentXP + quest.xp;

  localStorage.setItem("pathwiseXP", newXP);

  /* -------------------------------------------------------
     SAVE QUEST
  ------------------------------------------------------- */

  state[questId] = {
    completed: true,
    completedAt: new Date().toISOString(),
    xp: quest.xp,
  };

  saveQuestState(state);

  /* -------------------------------------------------------
     RECORD ACTIVITY
  ------------------------------------------------------- */

  recordLearningActivity();

  /* -------------------------------------------------------
     NOTIFY APP
  ------------------------------------------------------- */

  notifyGamificationUpdate();

  return {
    success: true,
    questId,
    xpEarned: quest.xp,
    totalXP: newXP,
    level: getLevel(newXP),
  };
};

/* =========================================================
   CHECK DAILY SKILL QUEST
========================================================= */

const checkAndCompleteSkillQuest = (career, skillId, skillName) => {
  const today = getToday();

  const dailyKey = "pathwiseDailySkillQuest";

  let dailyQuest = null;

  try {
    const saved = localStorage.getItem(dailyKey);

    if (saved) {
      dailyQuest = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load daily quest:", error);
  }

  /* -------------------------------------------------------
     CREATE TODAY'S QUEST
  ------------------------------------------------------- */

  if (!dailyQuest || dailyQuest.date !== today) {
    dailyQuest = {
      date: today,
      completed: false,
      career,
      skillId,
      skillName,
    };

    localStorage.setItem(dailyKey, JSON.stringify(dailyQuest));
  }

  /* -------------------------------------------------------
     COMPLETE DAILY QUEST
  ------------------------------------------------------- */

  if (!dailyQuest.completed) {
    dailyQuest.completed = true;
    dailyQuest.completedAt = new Date().toISOString();

    localStorage.setItem(dailyKey, JSON.stringify(dailyQuest));

    /*
      IMPORTANT:

      We don't automatically give QUEST_XP here.

      The quest reward is claimed separately through
      completeQuest("daily-skill").

      This prevents accidental duplicate XP.
    */

    notifyGamificationUpdate();
  }
};

/* =========================================================
   GET TODAY'S DAILY QUEST
========================================================= */

export const getDailyQuest = () => {
  const today = getToday();

  try {
    const saved = localStorage.getItem("pathwiseDailySkillQuest");

    if (!saved) {
      return {
        date: today,
        completed: false,
      };
    }

    const quest = JSON.parse(saved);

    /* -----------------------------------------------------
       RESET WHEN NEW DAY STARTS
    ----------------------------------------------------- */

    if (quest.date !== today) {
      return {
        date: today,
        completed: false,
      };
    }

    return quest;
  } catch (error) {
    console.error("Failed to load daily quest:", error);

    return {
      date: today,
      completed: false,
    };
  }
};

/* =========================================================
   GET QUEST PROGRESS
========================================================= */

export const getQuestProgress = () => {
  const completedSkills = getCompletedSkills();
  const xp = getXP();
  const streak = getStreak();

  return {
    dailySkill: {
      current: getDailyQuest().completed ? 1 : 0,
      target: 1,
      completed: getDailyQuest().completed,
    },

    skillMaster: {
      current: Math.min(completedSkills, 3),
      target: 3,
      completed: completedSkills >= 3,
    },

    streakBuilder: {
      current: Math.min(streak, 3),
      target: 3,
      completed: streak >= 3,
    },

    xpHunter: {
      current: Math.min(xp, 250),
      target: 250,
      completed: xp >= 250,
    },

    careerClimber: {
      current: Math.min(completedSkills, 5),
      target: 5,
      completed: completedSkills >= 5,
    },
  };
};

/* =========================================================
   GET GAMIFICATION SUMMARY
========================================================= */

export const getGamificationSummary = () => {
  const xp = getXP();

  return {
    xp,
    completedSkills: getCompletedSkills(),
    level: getLevel(xp),
    levelProgress: getLevelProgress(xp),
    streak: getStreak(),

    /* NEW */
    completedQuests: getCompletedQuestCount(),
    questProgress: getQuestProgress(),
  };
};
