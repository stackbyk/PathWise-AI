// src/pages/SkillAssessment.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Brain, CheckCircle2 } from "lucide-react";

/* =========================================================
   CAREER QUESTIONS
========================================================= */

const careerQuestions = {
  "Full Stack Developer": [
    ["HTML & CSS", "How comfortable are you with HTML and CSS?"],
    ["JavaScript", "How comfortable are you with JavaScript?"],
    ["React", "How comfortable are you with React?"],
    ["Node.js", "How comfortable are you with Node.js?"],
    ["REST APIs", "How comfortable are you with REST APIs?"],
    ["MongoDB", "How comfortable are you with MongoDB?"],
    ["Git & GitHub", "How comfortable are you with Git and GitHub?"],
    [
      "Problem Solving",
      "How comfortable are you with programming problem solving?",
    ],
  ],

  "AI / ML Engineer": [
    ["Python", "How comfortable are you with Python programming?"],
    [
      "Mathematics",
      "How comfortable are you with the mathematics used in machine learning?",
    ],
    ["Statistics", "How comfortable are you with statistics and probability?"],
    [
      "Machine Learning",
      "How comfortable are you with machine learning concepts?",
    ],
    [
      "Deep Learning",
      "How comfortable are you with neural networks and deep learning?",
    ],
    [
      "Data Processing",
      "How comfortable are you with preparing and processing datasets?",
    ],
    [
      "Model Evaluation",
      "How comfortable are you with evaluating machine learning models?",
    ],
    [
      "TensorFlow / PyTorch",
      "How comfortable are you with ML frameworks such as TensorFlow or PyTorch?",
    ],
  ],

  "Data Scientist": [
    ["Python", "How comfortable are you with Python for data analysis?"],
    ["Statistics", "How comfortable are you with statistics and probability?"],
    ["SQL", "How comfortable are you with SQL and databases?"],
    ["Data Analysis", "How comfortable are you with analyzing datasets?"],
    [
      "Data Visualization",
      "How comfortable are you with creating data visualizations?",
    ],
    [
      "Machine Learning",
      "How comfortable are you with machine learning algorithms?",
    ],
    ["Pandas / NumPy", "How comfortable are you with Pandas and NumPy?"],
    [
      "Problem Solving",
      "How comfortable are you with solving analytical problems?",
    ],
  ],

  "Cloud Engineer": [
    ["Linux", "How comfortable are you with Linux systems?"],
    ["Networking", "How comfortable are you with networking concepts?"],
    [
      "AWS / Azure / GCP",
      "How comfortable are you with cloud platforms such as AWS, Azure or GCP?",
    ],
    ["Docker", "How comfortable are you with Docker and containers?"],
    [
      "Kubernetes",
      "How comfortable are you with Kubernetes and container orchestration?",
    ],
    ["Cloud Security", "How comfortable are you with cloud security concepts?"],
    ["CI/CD", "How comfortable are you with CI/CD pipelines?"],
    [
      "Infrastructure",
      "How comfortable are you with cloud infrastructure and deployment?",
    ],
  ],

  "Cybersecurity Engineer": [
    [
      "Cybersecurity Fundamentals",
      "How comfortable are you with basic cybersecurity concepts?",
    ],
    [
      "Networking",
      "How comfortable are you with computer networking and protocols?",
    ],
    ["Linux", "How comfortable are you with Linux systems and commands?"],
    [
      "Network Security",
      "How comfortable are you with firewalls, VPNs and network security?",
    ],
    [
      "Ethical Hacking",
      "How comfortable are you with penetration testing and ethical hacking concepts?",
    ],
    [
      "Threat Detection",
      "How comfortable are you with identifying and analyzing security threats?",
    ],
    [
      "Python & Scripting",
      "How comfortable are you with Python or scripting for security tasks?",
    ],
    [
      "Incident Response",
      "How comfortable are you with detecting and responding to security incidents?",
    ],
  ],

  "DevOps Engineer": [
    ["Linux", "How comfortable are you with Linux systems?"],
    ["Networking", "How comfortable are you with networking concepts?"],
    ["Git", "How comfortable are you with Git and version control?"],
    ["Docker", "How comfortable are you with Docker and containers?"],
    ["Kubernetes", "How comfortable are you with Kubernetes?"],
    ["CI/CD", "How comfortable are you with CI/CD pipelines?"],
    ["AWS", "How comfortable are you with AWS or cloud platforms?"],
    [
      "Infrastructure as Code",
      "How comfortable are you with Terraform or infrastructure as code?",
    ],
  ],

  "Mobile App Developer": [
    [
      "Programming Fundamentals",
      "How comfortable are you with programming fundamentals?",
    ],
    ["React Native", "How comfortable are you with React Native?"],
    ["Mobile UI", "How comfortable are you with mobile UI development?"],
    [
      "Mobile Navigation",
      "How comfortable are you with navigation between mobile screens?",
    ],
    ["REST APIs", "How comfortable are you with consuming REST APIs?"],
    ["Authentication", "How comfortable are you with mobile authentication?"],
    ["Testing", "How comfortable are you with testing mobile applications?"],
    [
      "App Deployment",
      "How comfortable are you with deploying mobile applications?",
    ],
  ],

  "UI/UX Designer": [
    ["Design Principles", "How comfortable are you with design principles?"],
    ["Color Theory", "How comfortable are you with color theory?"],
    ["Typography", "How comfortable are you with typography?"],
    ["User Research", "How comfortable are you with user research?"],
    ["User Personas", "How comfortable are you with creating user personas?"],
    ["Wireframing", "How comfortable are you with wireframing?"],
    ["Prototyping", "How comfortable are you with prototyping?"],
    ["Usability Testing", "How comfortable are you with usability testing?"],
  ],
};

/* =========================================================
   CAREER ALIASES
========================================================= */

const careerAliases = {
  "AI/ML Engineer": "AI / ML Engineer",
  "AI ML Engineer": "AI / ML Engineer",
  "AI-ML Engineer": "AI / ML Engineer",

  Cybersecurity: "Cybersecurity Engineer",
  "Cyber Security": "Cybersecurity Engineer",
  "Cyber Security Engineer": "Cybersecurity Engineer",

  "Software Developer": "Full Stack Developer",
  "Software Engineer": "Full Stack Developer",
  "Web Developer": "Full Stack Developer",

  "Data Science": "Data Scientist",
  "Data Analyst": "Data Scientist",

  Backend: "Full Stack Developer",
  "Backend Developer": "Full Stack Developer",

  Cloud: "Cloud Engineer",

  DevOps: "DevOps Engineer",
  "DevOps Developer": "DevOps Engineer",

  "Mobile Developer": "Mobile App Developer",
  "App Developer": "Mobile App Developer",

  Designer: "UI/UX Designer",
  "UX Designer": "UI/UX Designer",
  "UI Designer": "UI/UX Designer",
};

/* =========================================================
   LEVELS
========================================================= */

const levels = [
  {
    label: "Beginner",
    value: 25,
    description: "I am just starting",
  },
  {
    label: "Basic",
    value: 50,
    description: "I know the fundamentals",
  },
  {
    label: "Intermediate",
    value: 75,
    description: "I can build projects",
  },
  {
    label: "Advanced",
    value: 100,
    description: "I am highly confident",
  },
];

/* =========================================================
   CAREER OPTIONS
========================================================= */

const careerOptions = Object.keys(careerQuestions);

/* =========================================================
   NORMALIZE CAREER
========================================================= */

const normalizeCareer = (career) => {
  const rawCareer = String(career || "").trim();

  if (careerAliases[rawCareer]) {
    return careerAliases[rawCareer];
  }

  if (careerQuestions[rawCareer]) {
    return rawCareer;
  }

  const lowerCareer = rawCareer.toLowerCase();

  const matchingCareer = careerOptions.find(
    (careerOption) => careerOption.toLowerCase() === lowerCareer,
  );

  return matchingCareer || "";
};

/* =========================================================
   COMPONENT
========================================================= */

function SkillAssessment() {
  const navigate = useNavigate();

  /* =======================================================
     GET STORED CAREER
  ======================================================= */

  const storedCareer =
    localStorage.getItem("selectedCareer") ||
    localStorage.getItem("assessmentCareer") ||
    "";

  const initialCareer = normalizeCareer(storedCareer);

  /* =======================================================
     STATE
  ======================================================= */

  const [selectedCareer, setSelectedCareer] = useState(initialCareer);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  /* =======================================================
     QUESTIONS
  ======================================================= */

  const questions = careerQuestions[selectedCareer] || [];

  /* =======================================================
     CAREER SELECTOR
  ======================================================= */

  if (!selectedCareer) {
    return (
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-primary-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-primary-600">
              <Brain size={17} />
              Skill Assessment
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Choose Your Career
            </h1>

            <p className="mt-3 text-slate-600">
              Select the career you want to assess your skills for.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {careerOptions.map((career) => (
              <button
                key={career}
                type="button"
                onClick={() => {
                  localStorage.setItem("selectedCareer", career);
                  localStorage.setItem("assessmentCareer", career);

                  setSelectedCareer(career);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl">
                  {career === "Cybersecurity Engineer"
                    ? "🔐"
                    : career === "AI / ML Engineer"
                      ? "🤖"
                      : career === "Data Scientist"
                        ? "📊"
                        : career === "Cloud Engineer"
                          ? "☁️"
                          : career === "DevOps Engineer"
                            ? "⚙️"
                            : career === "Mobile App Developer"
                              ? "📱"
                              : career === "UI/UX Designer"
                                ? "🎨"
                                : "💻"}
                </div>

                <h2 className="font-bold text-slate-900">{career}</h2>

                <p className="mt-2 text-sm text-slate-500">
                  Start skill assessment →
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     SAFETY CHECK
  ======================================================= */

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            No assessment questions found.
          </h1>

          <p className="mt-3 text-slate-600">
            Please choose a supported career.
          </p>

          <button
            onClick={() => {
              setSelectedCareer("");
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white"
          >
            Choose Career
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     CURRENT QUESTION
  ======================================================= */

  const question = questions[currentQuestion];

  const skill = question?.[0] || "";

  const questionText = question?.[1] || "";

  const currentAnswer = answers[skill];

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progress =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  /* =======================================================
     ANSWER
  ======================================================= */

  const handleAnswer = (value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [skill]: value,
    }));
  };

  /* =======================================================
     NEXT
  ======================================================= */

  const handleNext = () => {
    if (!currentAnswer) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  /* =======================================================
     SUBMIT ASSESSMENT
  ======================================================= */

  const handleSubmit = () => {
    if (!currentAnswer) {
      return;
    }

    const finalAnswers = {
      ...answers,
      [skill]: currentAnswer,
    };

    /* -----------------------------------------------------
       SAVE RAW ASSESSMENT
    ----------------------------------------------------- */

    localStorage.setItem("assessmentResults", JSON.stringify(finalAnswers));

    localStorage.setItem("assessmentCareer", selectedCareer);

    localStorage.setItem("selectedCareer", selectedCareer);

    /* -----------------------------------------------------
       CREATE ASSESSED SKILLS
    ----------------------------------------------------- */

    const assessedSkills = questions.map(([skillName]) => {
      const score = finalAnswers[skillName] || 0;

      const level = levels.find((item) => item.value === score) || levels[0];

      return {
        name: skillName,
        progress: score,
        level: level.label,
        source: "assessment",
        career: selectedCareer,
      };
    });

    /* -----------------------------------------------------
       LOAD EXISTING PROFILE SKILLS
    ----------------------------------------------------- */

    let existingProfileSkills = [];

    const savedProfileSkills = localStorage.getItem("pathwiseProfileSkills");

    if (savedProfileSkills) {
      try {
        const parsedSkills = JSON.parse(savedProfileSkills);

        if (Array.isArray(parsedSkills)) {
          existingProfileSkills = parsedSkills;
        }
      } catch (error) {
        console.error("Failed to load profile skills:", error);
      }
    }

    /* -----------------------------------------------------
       MERGE PROFILE + ASSESSMENT SKILLS
    ----------------------------------------------------- */

    const mergedSkills = [
      ...existingProfileSkills
        .filter(
          (profileSkill) =>
            !assessedSkills.some(
              (assessedSkill) =>
                assessedSkill.name.toLowerCase() ===
                String(profileSkill).toLowerCase(),
            ),
        )
        .map((skillName) => ({
          name: skillName,
          progress: 0,
          level: "Not Assessed",
          source: "profile",
        })),

      ...assessedSkills,
    ];

    /* -----------------------------------------------------
       SAVE COMPLETE SKILL DATA
    ----------------------------------------------------- */

    localStorage.setItem("pathwiseSkillData", JSON.stringify(mergedSkills));

    /* -----------------------------------------------------
       SAVE PROFILE SKILL NAMES
    ----------------------------------------------------- */

    const skillNames = mergedSkills.map((item) => item.name);

    localStorage.setItem("pathwiseProfileSkills", JSON.stringify(skillNames));

    /* -----------------------------------------------------
       COMPLETION FLAG
    ----------------------------------------------------- */

    localStorage.setItem("skillAssessmentCompleted", "true");

    /* -----------------------------------------------------
       SAVE ASSESSMENT TIMESTAMP
    ----------------------------------------------------- */

    localStorage.setItem(
      "skillAssessmentCompletedAt",
      new Date().toISOString(),
    );

    /* -----------------------------------------------------
       GO TO RESULTS
    ----------------------------------------------------- */

    navigate("/results");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* =================================================
            TOP NAVIGATION
        ================================================= */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <button
            onClick={() => {
              setSelectedCareer("");
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Change Career
          </button>
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-primary-600">
            <Brain size={17} />
            Skill Assessment
          </div>

          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Discover Your Skill Level
          </h1>

          <p className="mt-3 text-slate-600">
            Assessment for{" "}
            <span className="font-semibold text-primary-600">
              {selectedCareer}
            </span>
          </p>
        </div>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="text-sm font-semibold text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            QUESTION CARD
        ================================================= */}

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl md:p-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-primary-600">
              {skill}
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              {questionText}
            </h2>

            <p className="mt-2 text-slate-500">
              Select the option that best describes your current ability.
            </p>
          </div>

          {/* =================================================
              LEVEL OPTIONS
          ================================================= */}

          <div className="space-y-3">
            {levels.map((level) => {
              const isSelected = currentAnswer === level.value;

              return (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => handleAnswer(level.value)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    isSelected
                      ? "border-primary-600 bg-indigo-50"
                      : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-primary-600" : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-3 w-3 rounded-full bg-primary-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {level.label}
                      </p>

                      <p className="text-sm text-slate-500">
                        {level.description}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-slate-400">
                      {level.value}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!currentAnswer}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Finish Assessment
                <CheckCircle2 size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            QUESTION INDICATORS
        ================================================= */}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {questions.map(([skillName], index) => (
            <div
              key={skillName}
              title={skillName}
              className={`h-3 w-3 rounded-full ${
                answers[skillName]
                  ? "bg-green-500"
                  : index === currentQuestion
                    ? "bg-primary-600"
                    : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillAssessment;
