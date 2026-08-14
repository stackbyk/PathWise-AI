import { createContext, useContext, useEffect, useState } from "react";

const ProgressContext = createContext();

const XP_KEY = "pathwiseXP";
const COMPLETED_KEY = "pathwiseCompletedSkills";
const ROADMAP_COMPLETED_KEY = "pathwiseCompletedRoadmapSteps";

export function ProgressProvider({ children }) {
  /* =====================================================
     XP
  ===================================================== */

  const [xp, setXp] = useState(() => {
    const savedXP = localStorage.getItem(XP_KEY);

    return Number(savedXP) || 0;
  });

  /* =====================================================
     COMPLETED SKILLS
  ===================================================== */

  const [completedSkills, setCompletedSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load completed skills:", error);

      return [];
    }
  });

  /* =====================================================
     COMPLETED ROADMAP STEPS
  ===================================================== */

  const [completedRoadmapSteps, setCompletedRoadmapSteps] = useState(() => {
    try {
      const saved = localStorage.getItem(ROADMAP_COMPLETED_KEY);

      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to load completed roadmap steps:", error);

      return {};
    }
  });

  /* =====================================================
     SAVE XP
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(XP_KEY, String(xp));

    window.dispatchEvent(
      new CustomEvent("pathwiseXPUpdated", {
        detail: {
          xp,
        },
      }),
    );
  }, [xp]);

  /* =====================================================
     SAVE COMPLETED SKILLS
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedSkills));

    window.dispatchEvent(new Event("pathwiseProgressUpdated"));
  }, [completedSkills]);

  /* =====================================================
     SAVE ROADMAP COMPLETIONS
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      ROADMAP_COMPLETED_KEY,
      JSON.stringify(completedRoadmapSteps),
    );

    window.dispatchEvent(new Event("pathwiseProgressUpdated"));
  }, [completedRoadmapSteps]);

  /* =====================================================
     ADD XP
  ===================================================== */

  const addXP = (amount) => {
    const points = Number(amount) || 0;

    if (points <= 0) {
      return;
    }

    setXp((currentXP) => currentXP + points);
  };

  /* =====================================================
     REMOVE XP
  ===================================================== */

  const removeXP = (amount) => {
    const points = Number(amount) || 0;

    if (points <= 0) {
      return;
    }

    setXp((currentXP) => Math.max(0, currentXP - points));
  };

  /* =====================================================
     COMPLETE NORMAL SKILL
  ===================================================== */

  const completeSkill = (skillName, points = 50) => {
    if (!skillName) {
      return false;
    }

    const alreadyCompleted = completedSkills.some(
      (skill) => skill.toLowerCase() === skillName.toLowerCase(),
    );

    if (alreadyCompleted) {
      return false;
    }

    setCompletedSkills((current) => [...current, skillName]);

    addXP(points);

    return true;
  };

  /* =====================================================
     UNCOMPLETE NORMAL SKILL
  ===================================================== */

  const uncompleteSkill = (skillName, points = 50) => {
    if (!skillName) {
      return false;
    }

    const alreadyCompleted = completedSkills.some(
      (skill) => skill.toLowerCase() === skillName.toLowerCase(),
    );

    if (!alreadyCompleted) {
      return false;
    }

    setCompletedSkills((current) =>
      current.filter(
        (skill) => skill.toLowerCase() !== skillName.toLowerCase(),
      ),
    );

    removeXP(points);

    return true;
  };

  /* =====================================================
     CHECK NORMAL SKILL
  ===================================================== */

  const isSkillCompleted = (skillName) => {
    if (!skillName) {
      return false;
    }

    return completedSkills.some(
      (skill) => skill.toLowerCase() === skillName.toLowerCase(),
    );
  };

  /* =====================================================
     COMPLETE ROADMAP STEP
  ===================================================== */

  const completeRoadmapStep = (career, index, points = 100) => {
    if (!career && career !== "") {
      return false;
    }

    const key = `${career}-${index}`;

    if (completedRoadmapSteps[key]) {
      return false;
    }

    setCompletedRoadmapSteps((current) => ({
      ...current,
      [key]: true,
    }));

    addXP(points);

    return true;
  };

  /* =====================================================
     UNCOMPLETE ROADMAP STEP
  ===================================================== */

  const uncompleteRoadmapStep = (career, index, points = 100) => {
    const key = `${career}-${index}`;

    if (!completedRoadmapSteps[key]) {
      return false;
    }

    setCompletedRoadmapSteps((current) => {
      const updated = {
        ...current,
      };

      delete updated[key];

      return updated;
    });

    removeXP(points);

    return true;
  };

  /* =====================================================
     CHECK ROADMAP STEP
  ===================================================== */

  const isRoadmapStepCompleted = (career, index) => {
    const key = `${career}-${index}`;

    return Boolean(completedRoadmapSteps[key]);
  };

  /* =====================================================
     GET COMPLETED ROADMAP COUNT
  ===================================================== */

  const getCompletedRoadmapCount = (career, totalSteps) => {
    if (!career || !totalSteps) {
      return 0;
    }

    let count = 0;

    for (let index = 0; index < totalSteps; index++) {
      const key = `${career}-${index}`;

      if (completedRoadmapSteps[key]) {
        count++;
      }
    }

    return count;
  };

  /* =====================================================
     GET LEVEL
  ===================================================== */

  const getLevel = () => {
    if (xp >= 5000) {
      return 10;
    }

    if (xp >= 4000) {
      return 9;
    }

    if (xp >= 3000) {
      return 8;
    }

    if (xp >= 2500) {
      return 7;
    }

    if (xp >= 2000) {
      return 6;
    }

    if (xp >= 1500) {
      return 5;
    }

    if (xp >= 1000) {
      return 4;
    }

    if (xp >= 750) {
      return 3;
    }

    if (xp >= 500) {
      return 2;
    }

    return 1;
  };

  /* =====================================================
     XP REQUIRED FOR NEXT LEVEL
  ===================================================== */

  const getNextLevelXP = () => {
    const level = getLevel();

    const levels = {
      1: 500,
      2: 750,
      3: 1000,
      4: 1500,
      5: 2000,
      6: 2500,
      7: 3000,
      8: 4000,
      9: 5000,
      10: 5000,
    };

    return levels[level] || 5000;
  };

  /* =====================================================
     RESET EVERYTHING
  ===================================================== */

  const resetProgress = () => {
    setXp(0);

    setCompletedSkills([]);

    setCompletedRoadmapSteps({});

    localStorage.removeItem(XP_KEY);

    localStorage.removeItem(COMPLETED_KEY);

    localStorage.removeItem(ROADMAP_COMPLETED_KEY);

    window.dispatchEvent(
      new CustomEvent("pathwiseXPUpdated", {
        detail: {
          xp: 0,
        },
      }),
    );

    window.dispatchEvent(new Event("pathwiseProgressUpdated"));
  };

  /* =====================================================
     CONTEXT VALUE
  ===================================================== */

  const value = {
    /* XP */
    xp,
    addXP,
    removeXP,

    /* Normal skills */
    completedSkills,
    completeSkill,
    uncompleteSkill,
    isSkillCompleted,

    /* Roadmap */
    completedRoadmapSteps,
    completeRoadmapStep,
    uncompleteRoadmapStep,
    isRoadmapStepCompleted,
    getCompletedRoadmapCount,

    /* Levels */
    getLevel,
    getNextLevelXP,

    /* Reset */
    resetProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

/* =====================================================
   HOOK
===================================================== */

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }

  return context;
}
