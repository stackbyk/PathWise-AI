// =========================================================
// src/utils/pathwiseStore.js
// CENTRAL PATHWISE AI DATA STORE
// =========================================================

const PROFILE_KEY = "pathwiseProfile";
const PROFILE_SKILLS_KEY = "pathwiseProfileSkills";
const SKILL_DATA_KEY = "pathwiseSkillData";
const SELECTED_CAREER_KEY = "selectedCareer";
const ASSESSMENT_CAREER_KEY = "assessmentCareer";
const XP_KEY = "pathwiseXP";
const STREAK_KEY = "pathwiseStreak";

// =========================================================
// SAFE JSON HELPERS
// =========================================================

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Failed to read ${key}:`, error);

    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);

    return false;
  }
}

// =========================================================
// PROFILE
// =========================================================

export function getProfile() {
  return readJSON(PROFILE_KEY, {
    name: "",
    email: "",
    currentCareer: "",
    targetCareer: "",
    bio: "",
    photoURL: "",
  });
}

export function saveProfile(profile) {
  const existing = getProfile();

  const updated = {
    ...existing,
    ...profile,
  };

  writeJSON(PROFILE_KEY, updated);

  if (updated.targetCareer) {
    setSelectedCareer(updated.targetCareer);
  }

  return updated;
}

// =========================================================
// PROFILE SKILLS
// =========================================================

export function getProfileSkills() {
  const skills = readJSON(PROFILE_SKILLS_KEY, []);

  if (!Array.isArray(skills)) {
    return [];
  }

  return skills;
}

export function saveProfileSkills(skills) {
  const cleanSkills = Array.isArray(skills)
    ? skills
        .filter((skill) => skill && skill.name && String(skill.name).trim())
        .map((skill) => ({
          name: String(skill.name).trim(),
          progress: Math.max(0, Math.min(100, Number(skill.progress) || 0)),
          level: skill.level || getLevelFromProgress(skill.progress),
          source: skill.source || "profile",
        }))
    : [];

  writeJSON(
    PROFILE_SKILLS_KEY,
    cleanSkills.map((skill) => skill.name),
  );

  // -------------------------------------------------------
  // Merge with existing assessment skills
  // -------------------------------------------------------

  const existingSkillData = getSkillData();

  const assessmentSkills = existingSkillData.filter(
    (skill) => skill.source === "assessment",
  );

  const merged = [];

  cleanSkills.forEach((profileSkill) => {
    const assessed = assessmentSkills.find(
      (skill) => skill.name.toLowerCase() === profileSkill.name.toLowerCase(),
    );

    if (assessed) {
      merged.push(assessed);
    } else {
      merged.push({
        ...profileSkill,
        source: "profile",
      });
    }
  });

  assessmentSkills.forEach((assessedSkill) => {
    const exists = merged.some(
      (skill) => skill.name.toLowerCase() === assessedSkill.name.toLowerCase(),
    );

    if (!exists) {
      merged.push(assessedSkill);
    }
  });

  saveSkillData(merged);

  return cleanSkills;
}

// =========================================================
// SKILL DATA
// =========================================================

export function getSkillData() {
  const data = readJSON(SKILL_DATA_KEY, []);

  return Array.isArray(data) ? data : [];
}

export function saveSkillData(skills) {
  return writeJSON(SKILL_DATA_KEY, Array.isArray(skills) ? skills : []);
}

// =========================================================
// ASSESSMENT SKILLS
// =========================================================

export function getAssessmentSkills() {
  return getSkillData().filter((skill) => skill.source === "assessment");
}

// =========================================================
// CAREER
// =========================================================

export function getSelectedCareer() {
  return (
    localStorage.getItem(SELECTED_CAREER_KEY) ||
    localStorage.getItem(ASSESSMENT_CAREER_KEY) ||
    getProfile().targetCareer ||
    ""
  );
}

export function setSelectedCareer(career) {
  if (!career) {
    return;
  }

  localStorage.setItem(SELECTED_CAREER_KEY, career);

  localStorage.setItem(ASSESSMENT_CAREER_KEY, career);
}

// =========================================================
// XP
// =========================================================

export function getXP() {
  return Number(localStorage.getItem(XP_KEY)) || 0;
}

export function addXP(amount) {
  const currentXP = getXP();

  const newXP = Math.max(0, currentXP + Number(amount || 0));

  localStorage.setItem(XP_KEY, String(newXP));

  window.dispatchEvent(new CustomEvent("pathwiseXPUpdated"));

  return newXP;
}

export function setXP(value) {
  const newXP = Math.max(0, Number(value) || 0);

  localStorage.setItem(XP_KEY, String(newXP));

  window.dispatchEvent(new CustomEvent("pathwiseXPUpdated"));

  return newXP;
}

// =========================================================
// STREAK
// =========================================================

export function getStreak() {
  return Number(localStorage.getItem(STREAK_KEY)) || 1;
}

export function setStreak(value) {
  const streak = Math.max(1, Number(value) || 1);

  localStorage.setItem(STREAK_KEY, String(streak));

  return streak;
}

// =========================================================
// PROFILE COMPLETENESS
// =========================================================

export function getProfileCompletion() {
  const profile = getProfile();
  const skills = getProfileSkills();

  let completed = 0;
  let total = 5;

  if (profile.name) {
    completed++;
  }

  if (profile.email) {
    completed++;
  }

  if (profile.currentCareer) {
    completed++;
  }

  if (profile.targetCareer) {
    completed++;
  }

  if (skills.length > 0) {
    completed++;
  }

  return Math.round((completed / total) * 100);
}

// =========================================================
// SKILL LEVEL
// =========================================================

export function getLevelFromProgress(progress) {
  const value = Number(progress) || 0;

  if (value >= 100) {
    return "Advanced";
  }

  if (value >= 75) {
    return "Intermediate";
  }

  if (value >= 50) {
    return "Basic";
  }

  return "Beginner";
}

// =========================================================
// CLEAR USER DATA
// =========================================================

export function clearPathWiseData() {
  const keys = [
    PROFILE_KEY,
    PROFILE_SKILLS_KEY,
    SKILL_DATA_KEY,
    SELECTED_CAREER_KEY,
    ASSESSMENT_CAREER_KEY,
    XP_KEY,
    STREAK_KEY,
    "assessmentResults",
  ];

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });

  Object.keys(localStorage)
    .filter((key) => key.startsWith("pathwiseRoadmap_"))
    .forEach((key) => {
      localStorage.removeItem(key);
    });
}

// =========================================================
// DEFAULT CAREERS
// =========================================================

export const CAREERS = [
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "AI / ML Engineer",
  "Data Scientist",
  "Cloud Engineer",
  "Cybersecurity Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
];

// =========================================================
// DEFAULT SKILLS
// =========================================================

export const COMMON_SKILLS = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "Git & GitHub",
  "REST APIs",
  "Data Structures",
  "Problem Solving",
  "Data Analysis",
  "Machine Learning",
  "Statistics",
  "Docker",
  "AWS",
  "Linux",
  "UI/UX Design",
];

// =========================================================
// EXPORT DEFAULT OBJECT
// =========================================================

export default {
  getProfile,
  saveProfile,

  getProfileSkills,
  saveProfileSkills,

  getSkillData,
  saveSkillData,

  getAssessmentSkills,

  getSelectedCareer,
  setSelectedCareer,

  getXP,
  addXP,
  setXP,

  getStreak,
  setStreak,

  getProfileCompletion,

  getLevelFromProgress,

  clearPathWiseData,

  CAREERS,
  COMMON_SKILLS,
};
