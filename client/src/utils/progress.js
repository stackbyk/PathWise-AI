// src/utils/progress.js

const STORAGE_KEY = "pathwiseProgress";

const defaultProgress = {
  xp: 0,
  completedSkills: [],
  streak: 0,
  lastActiveDate: null,
  badges: [],
};

export function getProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultProgress;
    }

    return {
      ...defaultProgress,
      ...JSON.parse(saved),
    };
  } catch (error) {
    console.error("Progress load error:", error);
    return defaultProgress;
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  return progress;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getYesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return date.toISOString().split("T")[0];
}

function updateStreak(progress) {
  const today = getToday();
  const yesterday = getYesterday();

  if (!progress.lastActiveDate) {
    progress.streak = 1;
    progress.lastActiveDate = today;
    return;
  }

  if (progress.lastActiveDate === today) {
    return;
  }

  if (progress.lastActiveDate === yesterday) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastActiveDate = today;
}

function updateBadges(progress) {
  const badges = new Set(progress.badges);

  if (progress.xp >= 100) {
    badges.add("First 100 XP");
  }

  if (progress.completedSkills.length >= 1) {
    badges.add("First Skill");
  }

  if (progress.completedSkills.length >= 5) {
    badges.add("Skill Builder");
  }

  if (progress.completedSkills.length >= 10) {
    badges.add("Skill Master");
  }

  if (progress.streak >= 3) {
    badges.add("3 Day Streak");
  }

  if (progress.streak >= 7) {
    badges.add("7 Day Streak");
  }

  progress.badges = Array.from(badges);
}

export function addXP(amount) {
  const progress = getProgress();

  progress.xp += amount;

  updateStreak(progress);
  updateBadges(progress);

  return saveProgress(progress);
}

export function completeSkill(skillName) {
  const progress = getProgress();

  if (progress.completedSkills.includes(skillName)) {
    return progress;
  }

  progress.completedSkills.push(skillName);

  progress.xp += 50;

  updateStreak(progress);
  updateBadges(progress);

  return saveProgress(progress);
}

export function isSkillCompleted(skillName) {
  const progress = getProgress();

  return progress.completedSkills.includes(skillName);
}

export function getXPLevel(xp) {
  if (xp < 100) {
    return 1;
  }

  if (xp < 250) {
    return 2;
  }

  if (xp < 500) {
    return 3;
  }

  if (xp < 1000) {
    return 4;
  }

  return 5;
}

export function getXPProgress(xp) {
  const level = getXPLevel(xp);

  const levelRanges = {
    1: [0, 100],
    2: [100, 250],
    3: [250, 500],
    4: [500, 1000],
    5: [1000, 1500],
  };

  const [start, end] = levelRanges[level];

  const progress = ((xp - start) / (end - start)) * 100;

  return Math.min(Math.max(Math.round(progress), 0), 100);
}
