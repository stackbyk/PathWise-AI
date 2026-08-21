import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";

/* =========================================================
   CAREER ALIASES
========================================================= */

const CAREER_ALIASES = {
  "AI/ML Engineer": "AI/ML Engineer",
  "AI ML Engineer": "AI/ML Engineer",
  "AI & ML Engineer": "AI/ML Engineer",
  "Artificial Intelligence Engineer": "AI/ML Engineer",
  "Machine Learning Engineer": "AI/ML Engineer",

  "Full Stack Developer": "Full Stack Developer",
  "Full-Stack Developer": "Full Stack Developer",
  "Fullstack Developer": "Full Stack Developer",

  "Frontend Developer": "Frontend Developer",
  "Front End Developer": "Frontend Developer",
  "Front-End Developer": "Frontend Developer",

  "Backend Developer": "Backend Developer",
  "Back End Developer": "Backend Developer",
  "Back-End Developer": "Backend Developer",

  "Cloud Engineer": "Cloud Engineer",
  "Cloud Developer": "Cloud Engineer",

  "Cybersecurity Engineer": "Cybersecurity Engineer",
  "Cyber Security Engineer": "Cybersecurity Engineer",
  "Cybersecurity Developer": "Cybersecurity Engineer",

  "Data Scientist": "Data Scientist",
  "Data Science": "Data Scientist",
};

/* =========================================================
   LEVELS
========================================================= */

const levels = [
  {
    label: "Beginner",
    value: 25,
    description: "I'm just starting",
    detail: "I have little or no experience with this skill.",
  },
  {
    label: "Basic",
    value: 50,
    description: "I know the fundamentals",
    detail: "I understand the basics and can follow simple examples.",
  },
  {
    label: "Intermediate",
    value: 75,
    description: "I can build projects",
    detail: "I can use this skill independently in practical projects.",
  },
  {
    label: "Advanced",
    value: 100,
    description: "I'm highly confident",
    detail:
      "I can solve complex problems and work confidently with this skill.",
  },
];

/* =========================================================
   CAREER SKILLS
========================================================= */

const CAREER_SKILLS = {
  /* =======================================================
     AI / ML ENGINEER
  ======================================================= */

  "AI/ML Engineer": [
    {
      name: "Python",
      description: "Programming fundamentals and Python development",
    },
    {
      name: "Mathematics for Machine Learning",
      description: "Linear algebra, calculus and mathematical foundations",
    },
    {
      name: "Statistics & Probability",
      description: "Probability, distributions, statistics and inference",
    },
    {
      name: "Machine Learning",
      description: "Supervised, unsupervised and classical ML algorithms",
    },
    {
      name: "Deep Learning",
      description: "Neural networks and deep learning architectures",
    },
    {
      name: "Data Handling",
      description: "Data cleaning, preprocessing and feature engineering",
    },
    {
      name: "Model Evaluation",
      description: "Metrics, validation, tuning and model comparison",
    },
  ],

  /* =======================================================
     FULL STACK
  ======================================================= */

  "Full Stack Developer": [
    {
      name: "HTML & CSS",
      description: "Web structure, styling and responsive layouts",
    },
    {
      name: "JavaScript",
      description: "Modern JavaScript programming",
    },
    {
      name: "React",
      description: "Building modern frontend applications",
    },
    {
      name: "Node.js",
      description: "Server-side JavaScript development",
    },
    {
      name: "REST APIs",
      description: "Designing and consuming web APIs",
    },
    {
      name: "MongoDB",
      description: "Document-oriented database development",
    },
    {
      name: "Git & GitHub",
      description: "Version control and collaborative development",
    },
    {
      name: "Problem Solving",
      description: "Algorithms, data structures and logical thinking",
    },
  ],

  /* =======================================================
     FRONTEND
  ======================================================= */

  "Frontend Developer": [
    {
      name: "HTML & CSS",
      description: "Web structure, styling and responsive design",
    },
    {
      name: "JavaScript",
      description: "Modern JavaScript programming",
    },
    {
      name: "React",
      description: "Building component-based interfaces",
    },
    {
      name: "API Integration",
      description: "Connecting frontend applications with APIs",
    },
    {
      name: "Problem Solving",
      description: "Logical thinking and frontend problem solving",
    },
  ],

  /* =======================================================
     BACKEND
  ======================================================= */

  "Backend Developer": [
    {
      name: "JavaScript",
      description: "Modern JavaScript programming",
    },
    {
      name: "Node.js",
      description: "Server-side JavaScript development",
    },
    {
      name: "REST APIs",
      description: "Backend API development",
    },
    {
      name: "Databases",
      description: "Database design and data management",
    },
    {
      name: "Authentication & Security",
      description: "Authentication, authorization and backend security",
    },
    {
      name: "Problem Solving",
      description: "Algorithms and backend problem solving",
    },
  ],

  /* =======================================================
     CLOUD
  ======================================================= */

  "Cloud Engineer": [
    {
      name: "Python",
      description: "Programming and cloud automation",
    },
    {
      name: "Linux",
      description: "Linux administration and command-line skills",
    },
    {
      name: "Networking",
      description: "Networking fundamentals and cloud networking",
    },
    {
      name: "Cloud Platforms",
      description: "Cloud infrastructure and services",
    },
    {
      name: "Docker",
      description: "Containerization and application deployment",
    },
    {
      name: "Kubernetes",
      description: "Container orchestration",
    },
    {
      name: "CI/CD & DevOps",
      description: "Automation, deployment and DevOps practices",
    },
  ],

  /* =======================================================
     CYBERSECURITY
  ======================================================= */

  "Cybersecurity Engineer": [
    {
      name: "Networking",
      description: "Network architecture and protocols",
    },
    {
      name: "Linux",
      description: "Linux systems and administration",
    },
    {
      name: "Cybersecurity Fundamentals",
      description: "Core security concepts and principles",
    },
    {
      name: "Cryptography",
      description: "Encryption, hashing and cryptographic concepts",
    },
    {
      name: "Security Tools",
      description: "Security monitoring and analysis tools",
    },
    {
      name: "Web Security",
      description: "Web vulnerabilities and application security",
    },
    {
      name: "Incident Response",
      description: "Detecting, containing and responding to incidents",
    },
  ],

  /* =======================================================
     DATA SCIENTIST
  ======================================================= */

  "Data Scientist": [
    {
      name: "Python",
      description: "Programming and data analysis with Python",
    },
    {
      name: "Statistics & Probability",
      description: "Statistical reasoning and probability",
    },
    {
      name: "Data Analysis",
      description: "Exploring and analyzing datasets",
    },
    {
      name: "Machine Learning",
      description: "Machine learning algorithms and workflows",
    },
    {
      name: "Data Visualization",
      description: "Communicating insights visually",
    },
    {
      name: "SQL",
      description: "Querying and managing structured data",
    },
  ],
};

/* =========================================================
   NORMALIZE CAREER
========================================================= */

const normalizeCareer = (career) => {
  if (!career) {
    return null;
  }

  const cleaned = String(career).trim();

  if (CAREER_ALIASES[cleaned]) {
    return CAREER_ALIASES[cleaned];
  }

  const matchedKey = Object.keys(CAREER_ALIASES).find(
    (key) => key.toLowerCase() === cleaned.toLowerCase(),
  );

  if (matchedKey) {
    return CAREER_ALIASES[matchedKey];
  }

  return cleaned;
};

/* =========================================================
   GET CAREER FROM ALL POSSIBLE SOURCES
========================================================= */

const getCareerFromStorage = () => {
  const possibleKeys = ["assessmentCareer", "selectedCareer", "career"];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (value && value.trim()) {
      return normalizeCareer(value);
    }
  }

  return null;
};

/* =========================================================
   LOAD EXISTING ANSWERS
========================================================= */

const loadExistingAnswers = () => {
  try {
    const stored = localStorage.getItem("selfAssessmentAnswers");

    if (!stored) {
      return {};
    }

    const parsed = JSON.parse(stored);

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    /*
      Supports either:

      {
        Python: 75,
        React: 50
      }

      OR

      {
        "AI/ML Engineer": {
          Python: 75
        }
      }
    */

    if (
      parsed.skillScores &&
      typeof parsed.skillScores === "object" &&
      !Array.isArray(parsed.skillScores)
    ) {
      return parsed.skillScores;
    }

    return parsed;
  } catch (error) {
    console.error("Failed to load existing assessment answers:", error);

    return {};
  }
};

/* =========================================================
   BUILD SKILL SCORES
========================================================= */

const buildSkillScores = (skills, answers) => {
  const result = {};

  skills.forEach((skill) => {
    const value = Number(answers[skill.name]);

    result[skill.name] = Number.isFinite(value) && value > 0 ? value : 25;
  });

  return result;
};

/* =========================================================
   COMPONENT
========================================================= */

function SkillAssessment() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     CAREER
  ======================================================= */

  const [career, setCareer] = useState(() => {
    return normalizeCareer(
      location.state?.career ||
        localStorage.getItem("assessmentCareer") ||
        localStorage.getItem("selectedCareer") ||
        localStorage.getItem("career"),
    );
  });

  /* =======================================================
     CURRENT QUESTION
  ======================================================= */

  const [currentIndex, setCurrentIndex] = useState(0);

  /* =======================================================
     ANSWERS
  ======================================================= */

  const [answers, setAnswers] = useState({});

  /* =======================================================
     COMPLETION
  ======================================================= */

  const [completed, setCompleted] = useState(false);

  /* =======================================================
     INITIALIZE CAREER
  ======================================================= */

  useEffect(() => {
    const stateCareer = normalizeCareer(location.state?.career);

    if (stateCareer) {
      setCareer(stateCareer);

      localStorage.setItem("assessmentCareer", stateCareer);

      localStorage.setItem("selectedCareer", stateCareer);

      localStorage.setItem("career", stateCareer);

      return;
    }

    const storedCareer = getCareerFromStorage();

    if (storedCareer) {
      setCareer(storedCareer);
    }
  }, [location.state?.career]);

  /* =======================================================
     LOAD SKILLS
  ======================================================= */

  const skills = useMemo(() => {
    if (!career) {
      return [];
    }

    return CAREER_SKILLS[career] || [];
  }, [career]);

  /* =======================================================
     LOAD SAVED ANSWERS FOR CURRENT CAREER
  ======================================================= */

  useEffect(() => {
    if (!career || !skills.length) {
      return;
    }

    const existing = loadExistingAnswers();

    /*
      If selfAssessmentAnswers was stored
      in the new format:

      {
        career: "...",
        skillScores: {...}
      }

      support that too.
    */

    let loadedAnswers = existing;

    try {
      const raw = localStorage.getItem("selfAssessmentAnswers");

      if (raw) {
        const parsed = JSON.parse(raw);

        if (
          parsed &&
          parsed.career &&
          normalizeCareer(parsed.career) === career &&
          parsed.skillScores
        ) {
          loadedAnswers = parsed.skillScores;
        }
      }
    } catch (error) {
      console.error("Failed to parse saved answers:", error);
    }

    const validAnswers = {};

    skills.forEach((skill) => {
      if (loadedAnswers[skill.name] !== undefined) {
        validAnswers[skill.name] = Number(loadedAnswers[skill.name]);
      }
    });

    if (Object.keys(validAnswers).length > 0) {
      setAnswers(validAnswers);
    }
  }, [career, skills]);

  /* =======================================================
     CURRENT SKILL
  ======================================================= */

  const currentSkill = skills[currentIndex];

  /* =======================================================
     CURRENT ANSWER
  ======================================================= */

  const selectedValue = currentSkill ? answers[currentSkill.name] : undefined;

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progress = skills.length
    ? Math.round(((currentIndex + 1) / skills.length) * 100)
    : 0;

  /* =======================================================
     COMPLETED SKILLS
  ======================================================= */

  const completedCount = skills.filter(
    (skill) => answers[skill.name] !== undefined,
  ).length;

  /* =======================================================
     SELECT LEVEL
  ======================================================= */

  const handleSelectLevel = (value) => {
    if (!currentSkill) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentSkill.name]: value,
    }));
  };

  /* =======================================================
     SAVE CURRENT ANSWERS
  ======================================================= */

  const saveAnswers = (skillScores) => {
    const payload = {
      career,
      skillScores,
      completedSkills: Object.keys(skillScores).length,
      totalSkills: skills.length,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("selfAssessmentAnswers", JSON.stringify(payload));

    /*
      assessmentResults is the key
      consumed by MCQVerification.jsx.
    */

    localStorage.setItem(
      "assessmentResults",
      JSON.stringify({
        career,
        skillScores,
        completedSkills: Object.keys(skillScores).length,
        totalSkills: skills.length,
        source: "self-assessment",
        completedAt: new Date().toISOString(),
      }),
    );

    /*
      Keep these keys synchronized
      because other PathWise pages
      may consume them.
    */

    localStorage.setItem("assessmentCareer", career);

    localStorage.setItem("selectedCareer", career);

    localStorage.setItem("career", career);

    localStorage.setItem("pathwiseProfileSkills", JSON.stringify(skillScores));

    localStorage.setItem(
      "pathwiseSkillData",
      JSON.stringify(
        skills.map((skill) => ({
          name: skill.name,
          claimedProgress: skillScores[skill.name],
          progress: skillScores[skill.name],
          score: skillScores[skill.name],
          source: "self-assessment",
          career,
        })),
      ),
    );
  };

  /* =======================================================
     NEXT
  ======================================================= */

  const handleNext = () => {
    if (!currentSkill || selectedValue === undefined) {
      return;
    }

    if (currentIndex < skills.length - 1) {
      setCurrentIndex((previous) => previous + 1);

      return;
    }

    /*
      Last question -> save
      complete assessment.
    */

    const finalSkillScores = buildSkillScores(skills, answers);

    saveAnswers(finalSkillScores);

    setCompleted(true);
  };

  /* =======================================================
     BACK
  ======================================================= */

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);

      return;
    }

    navigate(-1);
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setCompleted(false);

    localStorage.removeItem("selfAssessmentAnswers");

    localStorage.removeItem("assessmentResults");

    localStorage.removeItem("assessmentVerificationResults");

    localStorage.removeItem("verifiedSkillData");

    localStorage.removeItem("pathwiseSkillData");

    localStorage.removeItem("pathwiseProfileSkills");

    localStorage.removeItem("skillAssessmentCompleted");

    localStorage.removeItem("skillAssessmentCompletedAt");

    localStorage.removeItem("conceptualTestUnlocked");

    localStorage.removeItem("conceptualTestSkills");
  };

  /* =======================================================
     GO TO VERIFICATION
  ======================================================= */

  const handleStartVerification = () => {
    const finalSkillScores = buildSkillScores(skills, answers);

    saveAnswers(finalSkillScores);

    /*
        MCQVerification reads
        assessmentCareer and
        assessmentResults.

        We explicitly pass the normalized
        career through navigation state
        as well.
      */

    navigate("/mcq-verification", {
      state: {
        career,
        assessmentResults: {
          career,
          skillScores: finalSkillScores,
        },
      },
    });
  };

  /* =======================================================
     NO CAREER
  ======================================================= */

  if (!career) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl">
          <Brain className="mx-auto text-primary-600" size={48} />

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            No career selected
          </h1>

          <p className="mt-3 text-slate-500">
            Please select a career before starting your skill assessment.
          </p>

          <button
            type="button"
            onClick={() => navigate("/assessment")}
            className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
          >
            Choose Career
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     CAREER HAS NO SKILL CONFIG
  ======================================================= */

  if (!skills.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl">
          <Target className="mx-auto text-amber-500" size={48} />

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Assessment unavailable
          </h1>

          <p className="mt-3 text-slate-500">
            We don't have a skill configuration for <strong>{career}</strong>{" "}
            yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/assessment")}
            className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     COMPLETED SCREEN
  ======================================================= */

  if (completed) {
    const finalScores = buildSkillScores(skills, answers);

    const overallScore = Math.round(
      Object.values(finalScores).reduce(
        (total, score) => total + Number(score),
        0,
      ) / skills.length,
    );

    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}

          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">
              <CheckCircle2 size={18} />
              Assessment Complete
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Your Skill Assessment is Complete 🎉
            </h1>

            <p className="mt-3 text-slate-600">
              Here's your current self-assessed skill profile for{" "}
              <strong>{career}</strong>.
            </p>
          </div>

          {/* Overall score */}

          <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
              <Trophy className="text-primary-600" size={38} />
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-500">
              Overall Self-Assessment Score
            </p>

            <div className="mt-2 text-5xl font-black text-primary-600">
              {overallScore}%
            </div>

            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Your self-assessment is now saved. The next step will verify these
              claimed skill levels with MCQ questions.
            </p>
          </div>

          {/* Skill breakdown */}

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Skill Breakdown
              </h2>

              <p className="mt-1 text-slate-500">
                Your current self-assessed proficiency in each skill.
              </p>
            </div>

            <div className="space-y-5">
              {skills.map((skill) => {
                const score = Number(finalScores[skill.name] || 25);

                const level =
                  levels.find((item) => item.value === score) || levels[0];

                return (
                  <div
                    key={skill.name}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {skill.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {skill.description}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xl font-black text-primary-600">
                          {score}%
                        </p>

                        <p className="text-sm font-semibold text-slate-500">
                          {level.label}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-primary-600 transition-all"
                        style={{
                          width: `${score}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification CTA */}

          <div className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Brain className="text-primary-600" size={24} />

                  <h2 className="text-xl font-bold text-slate-900">
                    Ready for skill verification?
                  </h2>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  We'll now test your knowledge with timed MCQs and compare your
                  verified performance with your self-assessment.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartVerification}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-primary-700"
              >
                Start Verification
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Reset */}

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-700"
            >
              <RotateCcw size={16} />
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     CURRENT LEVEL DATA
  ======================================================= */

  const currentLevel =
    levels.find((level) => level.value === selectedValue) || null;

  /* =======================================================
     RENDER ASSESSMENT
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* =================================================
            TOP HEADER
        ================================================= */}

        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-primary-600">
                <Brain size={17} />
                Skill Assessment
              </div>

              <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
                How comfortable are you with these skills?
              </h1>

              <p className="mt-3 text-slate-600">
                Assess yourself honestly for the <strong>{career}</strong>{" "}
                career path.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Progress
              </p>

              <p className="mt-1 text-xl font-black text-primary-600">
                {completedCount}/{skills.length}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">
              Skill {currentIndex + 1} of {skills.length}
            </span>

            <span className="text-sm font-black text-primary-600">
              {progress}%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            SKILL CARD
        ================================================= */}

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:p-10">
          {/* Skill */}

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <Target className="text-primary-600" size={30} />
            </div>

            <h2 className="text-3xl font-black text-slate-900">
              {currentSkill.name}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              {currentSkill.description}
            </p>
          </div>

          {/* Question */}

          <div className="mb-7 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <div className="flex gap-3">
              <Brain className="mt-0.5 shrink-0 text-primary-600" size={22} />

              <div>
                <p className="font-bold text-slate-900">
                  How comfortable are you with {currentSkill.name}?
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Select the option that best describes your current ability.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              LEVEL OPTIONS
          ================================================= */}

          <div className="space-y-4">
            {levels.map((level) => {
              const selected = selectedValue === level.value;

              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleSelectLevel(level.value)}
                  className={`group w-full rounded-2xl border-2 p-5 text-left transition-all ${
                    selected
                      ? "border-primary-600 bg-indigo-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio */}

                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected
                          ? "border-primary-600"
                          : "border-slate-300 group-hover:border-primary-400"
                      }`}
                    >
                      {selected && (
                        <div className="h-3.5 w-3.5 rounded-full bg-primary-600" />
                      )}
                    </div>

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3
                          className={`text-lg font-bold ${
                            selected ? "text-primary-700" : "text-slate-900"
                          }`}
                        >
                          {level.label}
                        </h3>

                        <span
                          className={`text-sm font-black ${
                            selected ? "text-primary-600" : "text-slate-400"
                          }`}
                        >
                          {level.value}%
                        </span>
                      </div>

                      <p className="mt-1 font-medium text-slate-600">
                        {level.description}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {level.detail}
                      </p>
                    </div>

                    {selected && (
                      <CheckCircle2
                        className="shrink-0 text-primary-600"
                        size={24}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* =================================================
              SELECTED LEVEL SUMMARY
          ================================================= */}

          {currentLevel && (
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="shrink-0 text-emerald-600" size={21} />

                <p className="text-sm font-semibold text-emerald-800">
                  You selected{" "}
                  <strong>
                    {currentLevel.label} ({currentLevel.value}
                    %)
                  </strong>{" "}
                  for {currentSkill.name}.
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />

              {currentIndex === 0 ? "Back" : "Previous"}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedValue === undefined}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentIndex === skills.length - 1
                ? "Complete Assessment"
                : "Next Skill"}

              {currentIndex === skills.length - 1 ? (
                <CheckCircle2 size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            TIMER / INFO
        ================================================= */}

        <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <Clock3 className="mt-0.5 shrink-0 text-primary-600" size={21} />

          <div>
            <p className="font-bold text-slate-800">
              This part is self-assessment
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              There are no right or wrong answers here. Your selected levels
              will be used to create a claimed skill profile, which will then be
              verified through the MCQ assessment.
            </p>
          </div>
        </div>

        {/* =================================================
            SKILL INDICATORS
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Assessment Skills</h3>

            <span className="text-sm text-slate-400">
              {completedCount} completed
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const answered = answers[skill.name] !== undefined;

              const active = index === currentIndex;

              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-primary-600 text-white"
                      : answered
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {answered ? "✓ " : ""}
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillAssessment;
