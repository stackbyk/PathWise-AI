// src/pages/PersonalizedRoadmap.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const roadmapData = {
  "Full Stack Developer": {
    icon: "💻",
    description:
      "Build modern full-stack web applications from frontend to backend.",

    steps: [
      {
        title: "HTML & CSS",
        description: "Learn webpage structure, styling and responsive design.",
        resources: [
          {
            title: "HTML & CSS Basics",
            type: "Course",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
          },
          {
            title: "CSS Guide",
            type: "Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          },
        ],
        points: 100,
      },
      {
        title: "JavaScript",
        description:
          "Learn JavaScript fundamentals, ES6+, DOM and asynchronous programming.",
        resources: [
          {
            title: "JavaScript Guide",
            type: "Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          },
          {
            title: "JavaScript.info",
            type: "Tutorial",
            url: "https://javascript.info/",
          },
        ],
        points: 150,
      },
      {
        title: "React",
        description:
          "Build modern interactive frontend applications with React.",
        resources: [
          {
            title: "React Documentation",
            type: "Documentation",
            url: "https://react.dev/learn",
          },
        ],
        points: 150,
      },
      {
        title: "Node.js",
        description: "Learn backend development and server-side JavaScript.",
        resources: [
          {
            title: "Node.js Documentation",
            type: "Documentation",
            url: "https://nodejs.org/en/learn",
          },
        ],
        points: 150,
      },
      {
        title: "REST APIs",
        description:
          "Learn how to design and consume APIs for web applications.",
        resources: [
          {
            title: "MDN HTTP Guide",
            type: "Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
          },
        ],
        points: 100,
      },
      {
        title: "Databases",
        description:
          "Learn SQL and NoSQL databases such as PostgreSQL and MongoDB.",
        resources: [
          {
            title: "MongoDB University",
            type: "Course",
            url: "https://learn.mongodb.com/",
          },
          {
            title: "PostgreSQL Tutorial",
            type: "Tutorial",
            url: "https://www.postgresql.org/docs/",
          },
        ],
        points: 150,
      },
      {
        title: "Git & GitHub",
        description:
          "Learn version control and collaborative software development.",
        resources: [
          {
            title: "Git Documentation",
            type: "Documentation",
            url: "https://git-scm.com/doc",
          },
          {
            title: "GitHub Skills",
            type: "Course",
            url: "https://skills.github.com/",
          },
        ],
        points: 100,
      },
      {
        title: "Full Stack Project",
        description: "Build and deploy a complete full-stack application.",
        resources: [
          {
            title: "GitHub",
            type: "Projects",
            url: "https://github.com/",
          },
        ],
        points: 200,
      },
    ],
  },

  "Cybersecurity Engineer": {
    icon: "🔐",
    description:
      "Build the skills needed to protect systems, networks and applications from cyber threats.",

    steps: [
      {
        title: "Cybersecurity Fundamentals",
        description:
          "Learn CIA triad, common attacks, vulnerabilities and security principles.",
        resources: [
          {
            title: "OWASP",
            type: "Security Resource",
            url: "https://owasp.org/",
          },
          {
            title: "NIST Cybersecurity Framework",
            type: "Framework",
            url: "https://www.nist.gov/cyberframework",
          },
        ],
        points: 150,
      },
      {
        title: "Networking",
        description:
          "Learn TCP/IP, DNS, HTTP, ports, protocols and network architecture.",
        resources: [
          {
            title: "Cisco Networking Basics",
            type: "Course",
            url: "https://www.netacad.com/courses/networking-basics",
          },
        ],
        points: 150,
      },
      {
        title: "Linux",
        description:
          "Learn Linux commands, permissions, processes and system administration.",
        resources: [
          {
            title: "Linux Documentation",
            type: "Documentation",
            url: "https://docs.kernel.org/",
          },
          {
            title: "Linux Journey",
            type: "Tutorial",
            url: "https://linuxjourney.com/",
          },
        ],
        points: 100,
      },
      {
        title: "Network Security",
        description:
          "Learn firewalls, VPNs, IDS/IPS and secure network configuration.",
        resources: [
          {
            title: "Cloudflare Learning",
            type: "Security Resource",
            url: "https://www.cloudflare.com/learning/security/",
          },
        ],
        points: 150,
      },
      {
        title: "Ethical Hacking",
        description:
          "Learn penetration testing concepts and vulnerability assessment.",
        resources: [
          {
            title: "PortSwigger Web Security Academy",
            type: "Practice",
            url: "https://portswigger.net/web-security",
          },
          {
            title: "OWASP Web Security",
            type: "Security Resource",
            url: "https://owasp.org/www-project-top-ten/",
          },
        ],
        points: 200,
      },
      {
        title: "Threat Detection",
        description:
          "Learn how to identify suspicious activity and security threats.",
        resources: [
          {
            title: "MITRE ATT&CK",
            type: "Security Resource",
            url: "https://attack.mitre.org/",
          },
        ],
        points: 150,
      },
      {
        title: "Python & Scripting",
        description:
          "Use Python and scripting to automate security-related tasks.",
        resources: [
          {
            title: "Python Documentation",
            type: "Documentation",
            url: "https://docs.python.org/3/tutorial/",
          },
        ],
        points: 100,
      },
      {
        title: "Incident Response",
        description:
          "Learn how to detect, investigate and respond to security incidents.",
        resources: [
          {
            title: "NIST Incident Response",
            type: "Security Resource",
            url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
          },
        ],
        points: 150,
      },
      {
        title: "Cybersecurity Project",
        description: "Build a practical cybersecurity project.",
        resources: [
          {
            title: "CyberDefenders",
            type: "Practice",
            url: "https://cyberdefenders.org/",
          },
          {
            title: "TryHackMe",
            type: "Practice",
            url: "https://tryhackme.com/",
          },
        ],
        points: 250,
      },
    ],
  },

  "AI / ML Engineer": {
    icon: "🤖",
    description: "Build machine learning and artificial intelligence systems.",

    steps: [
      {
        title: "Python",
        description: "Learn Python programming and programming fundamentals.",
        resources: [
          {
            title: "Python Tutorial",
            type: "Documentation",
            url: "https://docs.python.org/3/tutorial/",
          },
        ],
        points: 100,
      },
      {
        title: "Mathematics",
        description:
          "Learn linear algebra, calculus and mathematical foundations.",
        resources: [
          {
            title: "Khan Academy Math",
            type: "Course",
            url: "https://www.khanacademy.org/math",
          },
        ],
        points: 150,
      },
      {
        title: "Statistics",
        description: "Learn probability, statistics and statistical reasoning.",
        resources: [
          {
            title: "Khan Academy Statistics",
            type: "Course",
            url: "https://www.khanacademy.org/math/statistics-probability",
          },
        ],
        points: 150,
      },
      {
        title: "Machine Learning",
        description: "Learn supervised and unsupervised machine learning.",
        resources: [
          {
            title: "Google Machine Learning",
            type: "Course",
            url: "https://developers.google.com/machine-learning/crash-course",
          },
        ],
        points: 200,
      },
      {
        title: "Deep Learning",
        description: "Learn neural networks and deep learning.",
        resources: [
          {
            title: "DeepLearning.AI",
            type: "Course",
            url: "https://www.deeplearning.ai/",
          },
        ],
        points: 200,
      },
      {
        title: "Data Processing",
        description: "Learn how to clean, transform and prepare datasets.",
        resources: [
          {
            title: "Pandas Documentation",
            type: "Documentation",
            url: "https://pandas.pydata.org/docs/",
          },
        ],
        points: 100,
      },
      {
        title: "TensorFlow / PyTorch",
        description: "Build ML models using modern ML frameworks.",
        resources: [
          {
            title: "TensorFlow Tutorials",
            type: "Documentation",
            url: "https://www.tensorflow.org/tutorials",
          },
          {
            title: "PyTorch Tutorials",
            type: "Documentation",
            url: "https://pytorch.org/tutorials/",
          },
        ],
        points: 200,
      },
      {
        title: "AI Project",
        description: "Build and deploy a practical AI project.",
        resources: [
          {
            title: "Kaggle",
            type: "Practice",
            url: "https://www.kaggle.com/",
          },
        ],
        points: 250,
      },
    ],
  },

  "Data Scientist": {
    icon: "📊",
    description: "Learn how to analyze data and build predictive models.",

    steps: [
      {
        title: "Python",
        description: "Learn Python programming for data analysis.",
        resources: [
          {
            title: "Python Tutorial",
            type: "Documentation",
            url: "https://docs.python.org/3/tutorial/",
          },
        ],
        points: 100,
      },
      {
        title: "Statistics",
        description: "Learn probability and statistical analysis.",
        resources: [
          {
            title: "Khan Academy Statistics",
            type: "Course",
            url: "https://www.khanacademy.org/math/statistics-probability",
          },
        ],
        points: 150,
      },
      {
        title: "SQL",
        description: "Learn how to query and analyze databases.",
        resources: [
          {
            title: "PostgreSQL Documentation",
            type: "Documentation",
            url: "https://www.postgresql.org/docs/",
          },
        ],
        points: 100,
      },
      {
        title: "Data Analysis",
        description: "Learn how to clean, explore and analyze datasets.",
        resources: [
          {
            title: "Pandas Documentation",
            type: "Documentation",
            url: "https://pandas.pydata.org/docs/",
          },
        ],
        points: 150,
      },
      {
        title: "Data Visualization",
        description: "Create meaningful charts and dashboards.",
        resources: [
          {
            title: "Matplotlib Documentation",
            type: "Documentation",
            url: "https://matplotlib.org/stable/users/index.html",
          },
        ],
        points: 100,
      },
      {
        title: "Machine Learning",
        description: "Learn machine learning algorithms and model building.",
        resources: [
          {
            title: "Google Machine Learning",
            type: "Course",
            url: "https://developers.google.com/machine-learning/crash-course",
          },
        ],
        points: 200,
      },
      {
        title: "Data Science Project",
        description: "Complete an end-to-end data science project.",
        resources: [
          {
            title: "Kaggle",
            type: "Practice",
            url: "https://www.kaggle.com/",
          },
        ],
        points: 250,
      },
    ],
  },

  "Backend Developer": {
    icon: "⚙️",
    description:
      "Build scalable backend systems, APIs and database-driven applications.",

    steps: [
      {
        title: "Programming Fundamentals",
        description: "Strengthen programming and problem-solving skills.",
        resources: [
          {
            title: "freeCodeCamp",
            type: "Course",
            url: "https://www.freecodecamp.org/learn/",
          },
        ],
        points: 100,
      },
      {
        title: "Node.js",
        description: "Learn server-side JavaScript and backend development.",
        resources: [
          {
            title: "Node.js Learn",
            type: "Documentation",
            url: "https://nodejs.org/en/learn",
          },
        ],
        points: 150,
      },
      {
        title: "REST APIs",
        description: "Build and consume RESTful APIs.",
        resources: [
          {
            title: "MDN HTTP",
            type: "Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
          },
        ],
        points: 100,
      },
      {
        title: "Databases",
        description: "Learn SQL and NoSQL databases.",
        resources: [
          {
            title: "MongoDB University",
            type: "Course",
            url: "https://learn.mongodb.com/",
          },
        ],
        points: 150,
      },
      {
        title: "Authentication",
        description: "Learn authentication and authorization.",
        resources: [
          {
            title: "Firebase Authentication",
            type: "Documentation",
            url: "https://firebase.google.com/docs/auth",
          },
        ],
        points: 100,
      },
      {
        title: "Server Architecture",
        description: "Learn backend architecture and scalable server design.",
        resources: [
          {
            title: "Node.js Architecture",
            type: "Documentation",
            url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
          },
        ],
        points: 150,
      },
      {
        title: "Git & GitHub",
        description: "Use Git for version control.",
        resources: [
          {
            title: "GitHub Skills",
            type: "Course",
            url: "https://skills.github.com/",
          },
        ],
        points: 100,
      },
      {
        title: "Backend Project",
        description: "Build and deploy a complete backend application.",
        resources: [
          {
            title: "GitHub",
            type: "Projects",
            url: "https://github.com/",
          },
        ],
        points: 250,
      },
    ],
  },

  "Cloud Engineer": {
    icon: "☁️",
    description:
      "Learn how to deploy, manage and secure applications in the cloud.",

    steps: [
      {
        title: "Linux",
        description: "Learn Linux systems, commands and administration.",
        resources: [
          {
            title: "Linux Journey",
            type: "Tutorial",
            url: "https://linuxjourney.com/",
          },
        ],
        points: 100,
      },
      {
        title: "Networking",
        description: "Learn networking fundamentals and cloud networking.",
        resources: [
          {
            title: "Cisco Networking Basics",
            type: "Course",
            url: "https://www.netacad.com/courses/networking-basics",
          },
        ],
        points: 150,
      },
      {
        title: "AWS / Azure / GCP",
        description: "Learn the fundamentals of a major cloud platform.",
        resources: [
          {
            title: "AWS Training",
            type: "Course",
            url: "https://aws.amazon.com/training/",
          },
        ],
        points: 200,
      },
      {
        title: "Docker",
        description: "Learn containers and containerized applications.",
        resources: [
          {
            title: "Docker Get Started",
            type: "Documentation",
            url: "https://docs.docker.com/get-started/",
          },
        ],
        points: 150,
      },
      {
        title: "Kubernetes",
        description: "Learn container orchestration.",
        resources: [
          {
            title: "Kubernetes Basics",
            type: "Tutorial",
            url: "https://kubernetes.io/docs/tutorials/",
          },
        ],
        points: 200,
      },
      {
        title: "Cloud Security",
        description: "Learn identity, access management and cloud security.",
        resources: [
          {
            title: "AWS Security",
            type: "Documentation",
            url: "https://aws.amazon.com/security/",
          },
        ],
        points: 150,
      },
      {
        title: "CI/CD",
        description: "Learn automated testing and continuous deployment.",
        resources: [
          {
            title: "GitHub Actions",
            type: "Documentation",
            url: "https://docs.github.com/en/actions",
          },
        ],
        points: 150,
      },
      {
        title: "Cloud Project",
        description: "Deploy and manage a complete application in the cloud.",
        resources: [
          {
            title: "AWS Projects",
            type: "Practice",
            url: "https://aws.amazon.com/getting-started/hands-on/",
          },
        ],
        points: 250,
      },
    ],
  },
};

function PersonalizedRoadmap() {
  const navigate = useNavigate();

  /* =====================================================
     SELECTED CAREER
  ===================================================== */

  const getSelectedCareer = () => {
    const storedCareer =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    const careerAliases = {
      "AI/ML Engineer": "AI / ML Engineer",
      "AI ML Engineer": "AI / ML Engineer",
      "AI-ML Engineer": "AI / ML Engineer",

      "Cyber Security Engineer": "Cybersecurity Engineer",
      "Cyber Security": "Cybersecurity Engineer",
      Cybersecurity: "Cybersecurity Engineer",

      "Full-Stack Developer": "Full Stack Developer",
      "Fullstack Developer": "Full Stack Developer",

      "Data Scientist": "Data Scientist",
      "Backend Developer": "Backend Developer",
      "Cloud Engineer": "Cloud Engineer",
    };

    return careerAliases[storedCareer] || storedCareer;
  };

  const selectedCareer = getSelectedCareer();

  const roadmap =
    roadmapData[selectedCareer] || roadmapData["Full Stack Developer"];

  /* =====================================================
     ASSESSMENT RESULTS
  ===================================================== */

  const getAssessmentResults = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("assessmentResults") || "{}",
      );

      return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
      console.error("Could not read assessment results:", error);
      return {};
    }
  };

  const assessmentResults = getAssessmentResults();

  /* =====================================================
     COMPLETED ROADMAP STEPS
  ===================================================== */

  const getCompletedSteps = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("pathwiseCompletedRoadmapSteps") || "{}",
      );

      return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
      console.error("Could not read completed roadmap steps:", error);
      return {};
    }
  };

  const [completedSteps, setCompletedSteps] = useState(getCompletedSteps);

  /* =====================================================
     NORMALIZE SKILL NAME
  ===================================================== */

  const normalize = (value) => {
    if (!value) return "";

    return value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[\/\-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =====================================================
     SKILL ALIASES
  ===================================================== */

  const skillAliases = {
    "programming fundamentals": [
      "programming",
      "problem solving",
      "programming fundamentals",
    ],

    programming: ["programming", "programming fundamentals"],

    databases: ["databases", "mongodb", "sql", "postgresql", "database"],

    "full stack project": ["full stack project"],

    "cybersecurity fundamentals": [
      "cybersecurity fundamentals",
      "cyber security fundamentals",
    ],

    networking: ["networking"],

    linux: ["linux"],

    "network security": ["network security"],

    "ethical hacking": ["ethical hacking"],

    "threat detection": ["threat detection"],

    "python and scripting": ["python and scripting", "python scripting"],

    "incident response": ["incident response"],

    python: ["python"],

    mathematics: ["mathematics", "math"],

    statistics: ["statistics"],

    "machine learning": ["machine learning"],

    "deep learning": ["deep learning"],

    "data processing": ["data processing"],

    "model evaluation": ["model evaluation"],

    "tensorflow pytorch": ["tensorflow pytorch", "tensorflow pytorch"],

    "data analysis": ["data analysis"],

    "data visualization": ["data visualization"],

    sql: ["sql", "databases"],

    "pandas numpy": ["pandas numpy", "pandas numpy"],

    "node.js": ["node.js", "node"],

    "rest apis": ["rest apis", "rest api"],

    "git and github": ["git github", "git and github"],

    react: ["react"],

    "html css": ["html css", "html and css"],
  };

  /* =====================================================
     GET ASSESSMENT SCORE FOR ROADMAP STEP
  ===================================================== */

  const getStepProgress = (stepTitle) => {
    const normalizedTitle = normalize(stepTitle);

    /* Exact match first */

    if (typeof assessmentResults[stepTitle] === "number") {
      return assessmentResults[stepTitle];
    }

    /* Normalized exact match */

    const matchingKey = Object.keys(assessmentResults).find(
      (key) => normalize(key) === normalizedTitle,
    );

    if (matchingKey) {
      return Number(assessmentResults[matchingKey]) || 0;
    }

    /* Alias matching */

    const aliases = skillAliases[normalizedTitle] || [];

    for (const alias of aliases) {
      const matchingAssessmentKey = Object.keys(assessmentResults).find(
        (key) => normalize(key) === normalize(alias),
      );

      if (matchingAssessmentKey) {
        return Number(assessmentResults[matchingAssessmentKey]) || 0;
      }
    }

    /* Partial matching */

    const partialMatch = Object.keys(assessmentResults).find((key) => {
      const normalizedKey = normalize(key);

      return (
        normalizedKey.includes(normalizedTitle) ||
        normalizedTitle.includes(normalizedKey)
      );
    });

    if (partialMatch) {
      return Number(assessmentResults[partialMatch]) || 0;
    }

    return 0;
  };

  /* =====================================================
     TOGGLE ROADMAP STEP
  ===================================================== */

  const toggleComplete = (index, points) => {
    const key = `${selectedCareer}-${index}`;

    const wasCompleted = Boolean(completedSteps[key]);

    const updatedCompletedSteps = {
      ...completedSteps,
      [key]: !wasCompleted,
    };

    setCompletedSteps(updatedCompletedSteps);

    localStorage.setItem(
      "pathwiseCompletedRoadmapSteps",
      JSON.stringify(updatedCompletedSteps),
    );

    /* ---------------------------------------------
       UPDATE GLOBAL XP
    --------------------------------------------- */

    const currentXP = Number(localStorage.getItem("pathwiseXP") || 0);

    const updatedXP = wasCompleted
      ? Math.max(0, currentXP - points)
      : currentXP + points;

    localStorage.setItem("pathwiseXP", String(updatedXP));

    /* ---------------------------------------------
       Update total points for this career
    --------------------------------------------- */

    const currentCareerXP = Number(
      localStorage.getItem(`pathwiseXP-${selectedCareer}`) || 0,
    );

    const updatedCareerXP = wasCompleted
      ? Math.max(0, currentCareerXP - points)
      : currentCareerXP + points;

    localStorage.setItem(
      `pathwiseXP-${selectedCareer}`,
      String(updatedCareerXP),
    );

    /* ---------------------------------------------
       Notify Dashboard / Leaderboard
    --------------------------------------------- */

    window.dispatchEvent(new Event("pathwiseXPUpdated"));

    window.dispatchEvent(new Event("pathwiseProgressUpdated"));
  };

  /* =====================================================
     COMPLETED COUNT
  ===================================================== */

  const completedCount = roadmap.steps.filter(
    (_, index) => completedSteps[`${selectedCareer}-${index}`],
  ).length;

  /* =====================================================
     CAREER XP
  ===================================================== */

  const totalPoints = roadmap.steps.reduce((total, step, index) => {
    const key = `${selectedCareer}-${index}`;

    if (completedSteps[key]) {
      return total + step.points;
    }

    return total;
  }, 0);

  /* =====================================================
     TOTAL POSSIBLE XP
  ===================================================== */

  const totalPossibleXP = roadmap.steps.reduce(
    (total, step) => total + step.points,
    0,
  );

  /* =====================================================
     ASSESSMENT PROGRESS
  ===================================================== */

  const assessmentProgress =
    roadmap.steps.length > 0
      ? Math.round(
          roadmap.steps.reduce(
            (total, step) => total + getStepProgress(step.title),
            0,
          ) / roadmap.steps.length,
        )
      : 0;

  /* =====================================================
     ROADMAP COMPLETION
  ===================================================== */

  const roadmapCompletion =
    roadmap.steps.length > 0
      ? Math.round((completedCount / roadmap.steps.length) * 100)
      : 0;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            BACK TO DASHBOARD
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-8 inline-flex items-center gap-2 font-semibold text-slate-600 transition hover:text-primary-600"
        >
          ← Back to Dashboard
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-4xl">
              {roadmap.icon}
            </div>

            <div>
              <p className="text-sm font-semibold text-primary-600">
                PERSONALIZED ROADMAP
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                {selectedCareer}
              </h1>

              <p className="mt-2 text-slate-600">{roadmap.description}</p>
            </div>
          </div>

          {/* =================================================
              OVERALL PROGRESS
          ================================================= */}

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">
                Overall Roadmap Progress
              </span>

              <span className="font-semibold text-primary-600">
                {roadmapCompletion}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary-600 transition-all duration-500"
                style={{
                  width: `${roadmapCompletion}%`,
                }}
              />
            </div>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {/* ASSESSMENT */}

            <div className="rounded-xl bg-indigo-50 p-4">
              <p className="text-sm text-slate-600">Skill Level</p>

              <p className="mt-1 text-2xl font-bold text-primary-600">
                {assessmentProgress}%
              </p>
            </div>

            {/* COMPLETED */}

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-slate-600">Completed</p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {completedCount}/{roadmap.steps.length}
              </p>
            </div>

            {/* XP */}

            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-sm text-slate-600">XP Earned</p>

              <p className="mt-1 text-2xl font-bold text-yellow-600">
                ⭐ {totalPoints}
              </p>
            </div>

            {/* REMAINING XP */}

            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-sm text-slate-600">XP Remaining</p>

              <p className="mt-1 text-2xl font-bold text-slate-700">
                {Math.max(0, totalPossibleXP - totalPoints)}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            ROADMAP STEPS
        ================================================= */}

        <div className="mt-8 space-y-5">
          {roadmap.steps.map((step, index) => {
            const progress = getStepProgress(step.title);

            const key = `${selectedCareer}-${index}`;

            const isCompleted = Boolean(completedSteps[key]);

            return (
              <div
                key={step.title}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                  isCompleted ? "border-green-300" : "border-slate-200"
                }`}
              >
                <div className="flex gap-5">
                  {/* NUMBER */}

                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-bold ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-primary-100 text-primary-700"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    {/* TITLE */}

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-xl font-bold text-slate-900">
                        {step.title}
                      </h2>

                      <span className="font-bold text-primary-600">
                        +{step.points} XP
                      </span>
                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>

                    {/* =================================================
                        ASSESSMENT SKILL
                    ================================================= */}

                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-500">
                          Your assessed skill level
                        </span>

                        <span className="font-semibold text-primary-600">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary-600 transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>

                      {/* LEVEL TEXT */}

                      <p className="mt-2 text-xs text-slate-500">
                        {progress === 0 && "Not assessed yet"}

                        {progress === 25 && "Beginner"}

                        {progress === 50 && "Basic"}

                        {progress === 75 && "Intermediate"}

                        {progress === 100 && "Advanced"}
                      </p>
                    </div>

                    {/* =================================================
                        RESOURCES
                    ================================================= */}

                    {step.resources && step.resources.length > 0 && (
                      <div className="mt-5">
                        <h3 className="font-semibold text-slate-900">
                          📚 Learning Resources
                        </h3>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {step.resources.map((resource) => (
                            <a
                              key={resource.url}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-primary-300 hover:bg-primary-50"
                            >
                              <p className="font-semibold text-primary-600">
                                {resource.title}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {resource.type}
                              </p>

                              <p className="mt-2 text-xs font-medium text-slate-400">
                                Open Resource →
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* =================================================
                        COMPLETE BUTTON
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() => toggleComplete(index, step.points)}
                      className={`mt-5 rounded-xl px-5 py-3 font-semibold transition ${
                        isCompleted
                          ? "bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600"
                          : "bg-primary-600 text-white hover:bg-primary-700"
                      }`}
                    >
                      {isCompleted
                        ? "✓ Completed — Remove XP"
                        : `Mark Complete +${step.points} XP`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            FINISH SECTION
        ================================================= */}

        <div className="mt-8 rounded-2xl bg-primary-600 p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold">Keep building your career 🚀</h2>

          <p className="mt-2 text-sm leading-6 text-primary-100">
            Complete roadmap steps, earn XP and improve your career skills.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-primary-600 transition hover:bg-slate-100"
            >
              ← Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate("/results")}
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalizedRoadmap;
