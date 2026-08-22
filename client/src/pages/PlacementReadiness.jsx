import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Brain,
  CheckCircle2,
  CircleAlert,
  Code2,
  Flame,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";

/* =========================================================
   PLACEMENT READINESS
   Uses the ACTUAL PathWise localStorage structure.

   Skill Assessment:
     assessmentResults.skillScores

   MCQ Verification:
     finalVerificationScore
     assessmentVerificationResults.finalVerificationScore

   Verified Skill Strength:
     verifiedSkillData[].verifiedProgress

   Roadmap:
     pathwiseRoadmap_<career>

   Practice:
     pathwiseXP / pathwiseCompletedChallenges / pathwiseStreak
========================================================= */

const WEIGHTS = {
  assessment: 30,
  verification: 25,
  skillStrength: 20,
  roadmap: 15,
  practice: 10,
};

const getStoredJSON = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Failed to parse ${key}:`, error);
    return null;
  }
};

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(Number(value) || 0, min), max);

const average = (values) => {
  const valid = values.map(Number).filter((value) => Number.isFinite(value));

  if (!valid.length) return null;

  return clamp(valid.reduce((sum, value) => sum + value, 0) / valid.length);
};

/* =========================================================
   CAREER
========================================================= */

function normalizeCareer(career) {
  if (!career) return "Full Stack Developer";

  const normalized = career.trim().toLowerCase().replace(/\s+/g, " ");

  if (normalized.includes("ai") || normalized.includes("machine learning")) {
    return "AI / ML Engineer";
  }

  if (normalized.includes("data scientist")) return "Data Scientist";
  if (normalized.includes("cloud")) return "Cloud Engineer";

  if (normalized.includes("cyber") || normalized.includes("security")) {
    return "Cybersecurity Engineer";
  }

  if (normalized.includes("devops")) return "DevOps Engineer";
  if (normalized.includes("mobile")) return "Mobile App Developer";

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
}

/* =========================================================
   1. SKILL ASSESSMENT SCORE
========================================================= */

const getAssessmentScore = (assessment) => {
  if (!assessment) return null;

  /*
    Actual structure:

    {
      career,
      skillScores: {
        Python: 75,
        SQL: 50,
        ...
      }
    }
  */

  const skillScores = assessment.skillScores;

  if (
    skillScores &&
    typeof skillScores === "object" &&
    !Array.isArray(skillScores)
  ) {
    return average(Object.values(skillScores));
  }

  return null;
};

/* =========================================================
   2. MCQ VERIFICATION SCORE
========================================================= */

const getVerificationScore = () => {
  /*
    MCQVerification saves the exact overall score here:
      finalVerificationScore
      pathwiseVerificationScore

    It also saves:
      assessmentVerificationResults.finalVerificationScore
  */

  const directKeys = ["finalVerificationScore", "pathwiseVerificationScore"];

  for (const key of directKeys) {
    const raw = localStorage.getItem(key);

    if (raw !== null && raw !== "") {
      const value = Number(raw);

      if (Number.isFinite(value)) {
        return clamp(value);
      }
    }
  }

  const verificationResults = getStoredJSON("assessmentVerificationResults");

  if (verificationResults) {
    const value = Number(verificationResults.finalVerificationScore);

    if (Number.isFinite(value)) {
      return clamp(value);
    }
  }

  return null;
};

/* =========================================================
   3. VERIFIED SKILL STRENGTH
========================================================= */

const getSkillStrengthScore = (verifiedSkills) => {
  if (!Array.isArray(verifiedSkills) || !verifiedSkills.length) {
    return null;
  }

  /*
    Actual MCQ structure:

    {
      name,
      claimedProgress,
      verifiedProgress,
      verifiedLevel,
      correct,
      total
    }
  */

  const values = verifiedSkills
    .map((skill) => Number(skill?.verifiedProgress))
    .filter((value) => Number.isFinite(value));

  return average(values);
};

/* =========================================================
   4. ROADMAP PROGRESS
========================================================= */

const getRoadmapProgress = (career) => {
  const normalizedCareer = normalizeCareer(career);

  const possibleKeys = [
    `pathwiseRoadmap_${normalizedCareer}`,
    `pathwiseRoadmap_${career}`,
  ];

  let roadmap = null;

  for (const key of possibleKeys) {
    const saved = getStoredJSON(key);

    if (Array.isArray(saved)) {
      roadmap = saved;
      break;
    }
  }

  if (!Array.isArray(roadmap) || !roadmap.length) {
    return null;
  }

  /*
    Support both:
      phase.skills[]
    and
      flat skill arrays
  */

  const skills = roadmap.flatMap((phase) => {
    if (Array.isArray(phase?.skills)) {
      return phase.skills;
    }

    return [];
  });

  if (!skills.length) {
    return null;
  }

  const completed = skills.filter(
    (skill) =>
      skill?.completed === true ||
      skill?.isCompleted === true ||
      skill?.status === "completed",
  ).length;

  return clamp((completed / skills.length) * 100);
};

/* =========================================================
   5. PRACTICE & ACTIVITY
========================================================= */

const getPracticeScore = () => {
  const xp = Math.max(0, Number(localStorage.getItem("pathwiseXP")) || 0);

  const completedChallenges = Math.max(
    0,
    Number(localStorage.getItem("pathwiseCompletedChallenges")) || 0,
  );

  const streak = Math.max(
    0,
    Number(localStorage.getItem("pathwiseStreak")) || 0,
  );

  /*
    Practice is intentionally capped at 100.
    This is only the 10% component of readiness.
  */

  if (!xp && !completedChallenges && !streak) {
    return null;
  }

  const xpScore = Math.min(xp / 10, 60);
  const challengeScore = Math.min(completedChallenges * 5, 25);
  const streakScore = Math.min(streak * 1.5, 15);

  return clamp(xpScore + challengeScore + streakScore);
};

/* =========================================================
   READINESS LABEL
========================================================= */

const getReadinessLabel = (score) => {
  if (score >= 90) {
    return {
      label: "Placement Ready",
      description: "You're showing strong evidence of placement readiness.",
    };
  }

  if (score >= 75) {
    return {
      label: "Almost Ready",
      description: "You're close. Focus on your remaining weak areas.",
    };
  }

  if (score >= 60) {
    return {
      label: "Getting Ready",
      description: "Your foundation is growing. Keep strengthening your gaps.",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs Improvement",
      description: "You have a foundation, but several areas need attention.",
    };
  }

  return {
    label: "Not Ready Yet",
    description: "Start with the fundamentals and build consistent progress.",
  };
};

const getComponentStatus = (value) => {
  if (value === null) return "Not available";
  if (value >= 80) return "Strong";
  if (value >= 60) return "Good";
  if (value >= 40) return "Needs work";
  return "Critical";
};

/* =========================================================
   COMPONENT
========================================================= */

function PlacementReadiness() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((value) => value + 1);
  }, []);

  useEffect(() => {
    const events = [
      "pathwiseXPUpdated",
      "pathwiseGamificationUpdated",
      "pathwiseRoadmapUpdated",
      "pathwiseCareerUpdated",
      "pathwiseProfileUpdated",
      "pathwiseAssessmentUpdated",
      "pathwiseVerificationUpdated",
    ];

    events.forEach((event) => {
      window.addEventListener(event, refresh);
    });

    window.addEventListener("storage", refresh);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, refresh);
      });

      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const data = useMemo(() => {
    const assessment = getStoredJSON("assessmentResults");

    const verificationResults = getStoredJSON("assessmentVerificationResults");

    const verifiedSkills = getStoredJSON("verifiedSkillData");

    const career =
      assessment?.career ||
      verificationResults?.career ||
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      localStorage.getItem("career") ||
      "Full Stack Developer";

    const components = [
      {
        key: "assessment",
        label: "Skill Assessment",
        weight: WEIGHTS.assessment,
        value: getAssessmentScore(assessment),
        icon: Brain,
      },
      {
        key: "verification",
        label: "MCQ Verification",
        weight: WEIGHTS.verification,
        value: getVerificationScore(),
        icon: CheckCircle2,
      },
      {
        key: "skillStrength",
        label: "Skill Strength",
        weight: WEIGHTS.skillStrength,
        value: getSkillStrengthScore(verifiedSkills),
        icon: Target,
      },
      {
        key: "roadmap",
        label: "Roadmap Progress",
        weight: WEIGHTS.roadmap,
        value: getRoadmapProgress(career),
        icon: TrendingUp,
      },
      {
        key: "practice",
        label: "Practice & Activity",
        weight: WEIGHTS.practice,
        value: getPracticeScore(),
        icon: Code2,
      },
    ];

    /*
      Only available components participate in the weighted
      average. This prevents missing data from automatically
      becoming zero.
    */

    const available = components.filter(
      (component) => component.value !== null,
    );

    const totalAvailableWeight = available.reduce(
      (sum, component) => sum + component.weight,
      0,
    );

    const score =
      totalAvailableWeight > 0
        ? Math.round(
            available.reduce(
              (sum, component) =>
                sum + (component.value * component.weight) / 100,
              0,
            ) /
              (totalAvailableWeight / 100),
          )
        : null;

    return {
      career,
      components,
      score,
      hasAssessment: Boolean(assessment),
      hasVerification: Boolean(
        verificationResults || localStorage.getItem("finalVerificationScore"),
      ),
    };
  }, [refreshKey]);

  const readiness = data.score === null ? null : getReadinessLabel(data.score);

  const strengths = data.components
    .filter((item) => item.value !== null && item.value >= 75)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const focusAreas = data.components
    .filter((item) => item.value !== null && item.value < 70)
    .sort((a, b) => a.value - b.value)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617]">
      <Navbar />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            TOP ACTIONS
        ================================================= */}

        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

          <button
            type="button"
            onClick={refresh}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Refresh Score
          </button>
        </div>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-2xl md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-indigo-100">
                <Trophy size={21} />

                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  Placement Readiness
                </span>
              </div>

              <h1 className="text-3xl font-extrabold md:text-5xl">
                Are you ready for your dream job?
              </h1>

              <p className="mt-4 text-sm leading-7 text-indigo-100 md:text-base">
                Your readiness score combines your assessment, verification,
                skill strength, roadmap progress, and practice activity.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <Target size={16} />
                {data.career}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center rounded-3xl bg-white/10 p-7 backdrop-blur">
              {data.score === null ? (
                <>
                  <CircleAlert size={34} className="text-yellow-300" />

                  <p className="mt-3 text-lg font-bold">Score unavailable</p>

                  <p className="mt-1 text-center text-xs text-indigo-100">
                    Complete your assessment first.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl font-black">{data.score}%</div>

                  <div className="mt-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold">
                    {readiness.label}
                  </div>

                  <p className="mt-3 max-w-xs text-center text-xs leading-5 text-indigo-100">
                    {readiness.description}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            NO DATA
        ================================================= */}

        {data.score === null && (
          <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Build your readiness profile
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Take the Skill Assessment and complete MCQ Verification to
                  start calculating your placement readiness.
                </p>
              </div>

              <Link
                to="/skill-assessment"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
              >
                Start Assessment
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        )}

        {/* =================================================
            SCORE BREAKDOWN
        ================================================= */}

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Score Breakdown
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Your readiness evidence
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Each category contributes according to its importance.
            </p>
          </div>

          <div className="space-y-5">
            {data.components.map((component) => {
              const Icon = component.icon;
              const available = component.value !== null;

              return (
                <div key={component.key}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-50 p-2.5 dark:bg-indigo-950/60">
                        <Icon size={18} className="text-indigo-600" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          {component.label}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Weight: {component.weight}%
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {available ? `${Math.round(component.value)}%` : "—"}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {getComponentStatus(component.value)}
                      </p>
                    </div>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    {available && (
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                        style={{
                          width: `${clamp(component.value)}%`,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            STRENGTHS / FOCUS
        ================================================= */}

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/60">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3 dark:bg-emerald-900">
                <TrendingUp
                  className="text-green-600 dark:text-emerald-300"
                  size={22}
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-green-700 dark:text-emerald-300">
                  Strengths
                </p>

                <h2 className="text-xl font-bold text-green-900 dark:text-emerald-100">
                  What's going well
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {strengths.length ? (
                strengths.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3 dark:bg-slate-900/70"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {item.label}
                    </span>

                    <span className="font-bold text-green-700 dark:text-emerald-300">
                      {Math.round(item.value)}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-green-800 dark:text-emerald-200">
                  Keep completing assessments, roadmap skills, and practice
                  activities to build strong evidence here.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/60">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900">
                <Zap className="text-amber-600 dark:text-amber-300" size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                  Focus Areas
                </p>

                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                  What to improve
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {focusAreas.length ? (
                focusAreas.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3 dark:bg-slate-900/70"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {item.label}
                    </span>

                    <span className="font-bold text-amber-700 dark:text-amber-300">
                      {Math.round(item.value)}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-amber-800 dark:text-amber-200">
                  No major weak component has been identified yet.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            ACTION CARDS
        ================================================= */}

        <section className="grid gap-6 md:grid-cols-3">
          <Link
            to="/skill-assessment"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-600"
          >
            <Brain className="text-indigo-600" size={23} />

            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
              Retake Assessment
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Re-evaluate your current skill level.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">
              Assess <ArrowRight size={15} />
            </span>
          </Link>

          <Link
            to="/skill-gap"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-600"
          >
            <Target className="text-indigo-600" size={23} />

            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
              Close Skill Gaps
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Work on the areas holding back your readiness.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">
              View Gaps <ArrowRight size={15} />
            </span>
          </Link>

          <Link
            to="/roadmap"
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-600"
          >
            <Award className="text-indigo-600" size={23} />

            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
              Continue Roadmap
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Complete more career skills and improve your score.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">
              Continue <ArrowRight size={15} />
            </span>
          </Link>
        </section>

        {/* =================================================
            IMPROVEMENT TIPS
        ================================================= */}

        <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/60">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900">
              <Flame
                className="text-indigo-600 dark:text-indigo-300"
                size={22}
              />
            </div>

            <div>
              <h2 className="font-bold text-indigo-900 dark:text-indigo-100">
                How to improve your readiness
              </h2>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-indigo-800 dark:text-indigo-200">
                <li>• Complete your weakest skill areas first.</li>

                <li>• Keep progressing through your career roadmap.</li>

                <li>
                  • Practice consistently instead of cramming before placements.
                </li>

                <li>
                  • Retake the assessment after meaningful skill improvement.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PlacementReadiness;
