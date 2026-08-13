import React, { useEffect, useMemo, useState } from "react";
import "./PersonalizedRoadmap.css";

/* =========================================================
   CAREER ROADMAP DATA
========================================================= */

const ROADMAPS = {
  "Full Stack Developer": [
    {
      id: 1,
      title: "Web Development Foundations",
      description:
        "Build a strong foundation in modern web development and programming.",
      duration: "2 Weeks",
      skills: [
        { name: "HTML & CSS", completed: false },
        { name: "JavaScript Fundamentals", completed: false },
        { name: "Git & GitHub", completed: false },
      ],
    },
    {
      id: 2,
      title: "Frontend Development",
      description:
        "Learn how to build responsive and interactive web applications.",
      duration: "3 Weeks",
      skills: [
        { name: "React Basics", completed: false },
        { name: "Components & Props", completed: false },
        { name: "State Management", completed: false },
        { name: "API Integration", completed: false },
      ],
    },
    {
      id: 3,
      title: "Backend Development",
      description:
        "Learn how servers, APIs and databases power modern applications.",
      duration: "3 Weeks",
      skills: [
        { name: "Node.js", completed: false },
        { name: "Express.js", completed: false },
        { name: "REST APIs", completed: false },
        { name: "MongoDB", completed: false },
      ],
    },
    {
      id: 4,
      title: "Full-Stack Portfolio Project",
      description:
        "Combine frontend and backend skills by building a real-world project.",
      duration: "4 Weeks",
      skills: [
        { name: "Project Planning", completed: false },
        { name: "Build the Application", completed: false },
        { name: "Testing & Debugging", completed: false },
        { name: "Deploy the Project", completed: false },
      ],
    },
  ],

  "AI / ML Engineer": [
    {
      id: 1,
      title: "Python & Programming Foundations",
      description:
        "Build the programming foundation required for artificial intelligence and machine learning.",
      duration: "3 Weeks",
      skills: [
        { name: "Python Fundamentals", completed: false },
        { name: "Object-Oriented Programming", completed: false },
        { name: "Data Structures", completed: false },
        { name: "Problem Solving", completed: false },
      ],
    },
    {
      id: 2,
      title: "Mathematics & Statistics",
      description:
        "Develop the mathematical understanding required to train and evaluate machine learning models.",
      duration: "3 Weeks",
      skills: [
        { name: "Linear Algebra", completed: false },
        { name: "Probability", completed: false },
        { name: "Statistics", completed: false },
        { name: "Calculus Basics", completed: false },
      ],
    },
    {
      id: 3,
      title: "Machine Learning",
      description:
        "Learn how to build, train and evaluate machine learning models.",
      duration: "4 Weeks",
      skills: [
        { name: "Supervised Learning", completed: false },
        { name: "Unsupervised Learning", completed: false },
        { name: "Model Evaluation", completed: false },
        { name: "Feature Engineering", completed: false },
      ],
    },
    {
      id: 4,
      title: "Deep Learning & AI",
      description:
        "Move from traditional machine learning into neural networks and modern AI.",
      duration: "4 Weeks",
      skills: [
        { name: "Neural Networks", completed: false },
        { name: "TensorFlow / PyTorch", completed: false },
        { name: "Computer Vision", completed: false },
        { name: "Natural Language Processing", completed: false },
      ],
    },
    {
      id: 5,
      title: "AI Portfolio Project",
      description:
        "Build and deploy an AI project that demonstrates your skills.",
      duration: "4 Weeks",
      skills: [
        { name: "Choose an AI Problem", completed: false },
        { name: "Prepare the Dataset", completed: false },
        { name: "Train & Evaluate the Model", completed: false },
        { name: "Deploy the AI Application", completed: false },
      ],
    },
  ],

  "Data Scientist": [
    {
      id: 1,
      title: "Python for Data Science",
      description:
        "Learn Python programming and the tools used for data science.",
      duration: "3 Weeks",
      skills: [
        { name: "Python Fundamentals", completed: false },
        { name: "Functions & Data Structures", completed: false },
        { name: "Pandas", completed: false },
        { name: "NumPy", completed: false },
      ],
    },
    {
      id: 2,
      title: "Statistics & Mathematics",
      description:
        "Build the statistical foundation needed to understand and analyze data.",
      duration: "3 Weeks",
      skills: [
        { name: "Descriptive Statistics", completed: false },
        { name: "Probability", completed: false },
        { name: "Hypothesis Testing", completed: false },
        { name: "Regression", completed: false },
      ],
    },
    {
      id: 3,
      title: "Data Analysis & Visualization",
      description:
        "Transform raw datasets into useful insights and visualizations.",
      duration: "3 Weeks",
      skills: [
        { name: "Data Cleaning", completed: false },
        { name: "Exploratory Data Analysis", completed: false },
        { name: "Matplotlib / Seaborn", completed: false },
        { name: "Power BI / Tableau", completed: false },
      ],
    },
    {
      id: 4,
      title: "Machine Learning for Data Science",
      description:
        "Use machine learning techniques to solve real-world data problems.",
      duration: "4 Weeks",
      skills: [
        { name: "Regression Models", completed: false },
        { name: "Classification", completed: false },
        { name: "Clustering", completed: false },
        { name: "Model Evaluation", completed: false },
      ],
    },
    {
      id: 5,
      title: "Data Science Portfolio",
      description: "Complete an end-to-end data science project.",
      duration: "4 Weeks",
      skills: [
        { name: "Find a Real Dataset", completed: false },
        { name: "Clean & Analyze Data", completed: false },
        { name: "Build a Predictive Model", completed: false },
        { name: "Present Your Findings", completed: false },
      ],
    },
  ],

  "Cloud Engineer": [
    {
      id: 1,
      title: "Cloud & Linux Foundations",
      description:
        "Understand operating systems, networking and cloud fundamentals.",
      duration: "3 Weeks",
      skills: [
        { name: "Linux Fundamentals", completed: false },
        { name: "Networking Basics", completed: false },
        { name: "Command Line", completed: false },
        { name: "Cloud Computing Concepts", completed: false },
      ],
    },
    {
      id: 2,
      title: "Cloud Platforms",
      description: "Learn the core services offered by modern cloud platforms.",
      duration: "4 Weeks",
      skills: [
        { name: "AWS / Azure / GCP Fundamentals", completed: false },
        { name: "Compute Services", completed: false },
        { name: "Storage Services", completed: false },
        { name: "Cloud Databases", completed: false },
      ],
    },
    {
      id: 3,
      title: "Infrastructure & Networking",
      description:
        "Learn how cloud infrastructure and networking are designed.",
      duration: "4 Weeks",
      skills: [
        { name: "Virtual Networks", completed: false },
        { name: "Load Balancing", completed: false },
        { name: "DNS", completed: false },
        { name: "Infrastructure as Code", completed: false },
      ],
    },
    {
      id: 4,
      title: "Cloud Security & Monitoring",
      description: "Learn to secure, monitor and maintain cloud environments.",
      duration: "3 Weeks",
      skills: [
        { name: "IAM", completed: false },
        { name: "Cloud Security", completed: false },
        { name: "Logging & Monitoring", completed: false },
        { name: "Backup & Disaster Recovery", completed: false },
      ],
    },
    {
      id: 5,
      title: "Cloud Portfolio Project",
      description: "Deploy a production-style application on the cloud.",
      duration: "4 Weeks",
      skills: [
        { name: "Design Cloud Architecture", completed: false },
        { name: "Deploy Application", completed: false },
        { name: "Configure Security", completed: false },
        { name: "Monitor & Optimize", completed: false },
      ],
    },
  ],

  "Cybersecurity Engineer": [
    {
      id: 1,
      title: "Cybersecurity Foundations",
      description:
        "Understand the core principles of cybersecurity and networking.",
      duration: "3 Weeks",
      skills: [
        { name: "Cybersecurity Fundamentals", completed: false },
        { name: "Networking Fundamentals", completed: false },
        { name: "Operating Systems", completed: false },
        { name: "Security Principles", completed: false },
      ],
    },
    {
      id: 2,
      title: "Network Security",
      description: "Learn how networks are protected from attacks and threats.",
      duration: "3 Weeks",
      skills: [
        { name: "Firewalls", completed: false },
        { name: "VPNs", completed: false },
        { name: "Network Monitoring", completed: false },
        { name: "Intrusion Detection", completed: false },
      ],
    },
    {
      id: 3,
      title: "Ethical Hacking",
      description:
        "Learn defensive security and ethical penetration testing concepts.",
      duration: "4 Weeks",
      skills: [
        { name: "Reconnaissance", completed: false },
        { name: "Vulnerability Assessment", completed: false },
        { name: "Web Security", completed: false },
        { name: "Security Testing", completed: false },
      ],
    },
    {
      id: 4,
      title: "Security Operations",
      description: "Learn how security teams detect and respond to incidents.",
      duration: "3 Weeks",
      skills: [
        { name: "SIEM Fundamentals", completed: false },
        { name: "Incident Response", completed: false },
        { name: "Threat Detection", completed: false },
        { name: "Security Logging", completed: false },
      ],
    },
    {
      id: 5,
      title: "Cybersecurity Portfolio",
      description:
        "Build a security-focused project to demonstrate your practical skills.",
      duration: "4 Weeks",
      skills: [
        { name: "Design Security Lab", completed: false },
        { name: "Perform Security Analysis", completed: false },
        { name: "Document Findings", completed: false },
        { name: "Create Security Report", completed: false },
      ],
    },
  ],

  "DevOps Engineer": [
    {
      id: 1,
      title: "Linux & Git Foundations",
      description:
        "Build the foundations required for modern DevOps engineering.",
      duration: "3 Weeks",
      skills: [
        { name: "Linux", completed: false },
        { name: "Shell Scripting", completed: false },
        { name: "Git", completed: false },
        { name: "GitHub", completed: false },
      ],
    },
    {
      id: 2,
      title: "Containers & Docker",
      description:
        "Learn how applications are packaged and deployed using containers.",
      duration: "3 Weeks",
      skills: [
        { name: "Docker Fundamentals", completed: false },
        { name: "Docker Images", completed: false },
        { name: "Docker Compose", completed: false },
        { name: "Container Networking", completed: false },
      ],
    },
    {
      id: 3,
      title: "CI/CD & Automation",
      description: "Automate software testing and deployment pipelines.",
      duration: "4 Weeks",
      skills: [
        { name: "CI/CD Concepts", completed: false },
        { name: "GitHub Actions", completed: false },
        { name: "Automated Testing", completed: false },
        { name: "Deployment Pipelines", completed: false },
      ],
    },
    {
      id: 4,
      title: "Cloud & Kubernetes",
      description:
        "Learn how modern applications are deployed and managed at scale.",
      duration: "4 Weeks",
      skills: [
        { name: "Cloud Fundamentals", completed: false },
        { name: "Kubernetes", completed: false },
        { name: "Infrastructure as Code", completed: false },
        { name: "Monitoring", completed: false },
      ],
    },
    {
      id: 5,
      title: "DevOps Portfolio Project",
      description: "Build a complete automated deployment pipeline.",
      duration: "4 Weeks",
      skills: [
        { name: "Containerize Application", completed: false },
        { name: "Create CI Pipeline", completed: false },
        { name: "Deploy to Cloud", completed: false },
        { name: "Monitor Application", completed: false },
      ],
    },
  ],

  "Mobile App Developer": [
    {
      id: 1,
      title: "Programming Foundations",
      description:
        "Build strong programming fundamentals for mobile development.",
      duration: "3 Weeks",
      skills: [
        { name: "Programming Fundamentals", completed: false },
        { name: "Object-Oriented Programming", completed: false },
        { name: "Data Structures", completed: false },
        { name: "Git & GitHub", completed: false },
      ],
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Learn the fundamentals of building mobile applications.",
      duration: "4 Weeks",
      skills: [
        { name: "React Native / Flutter", completed: false },
        { name: "Mobile UI", completed: false },
        { name: "Navigation", completed: false },
        { name: "State Management", completed: false },
      ],
    },
    {
      id: 3,
      title: "Backend & APIs",
      description:
        "Connect mobile applications with real-world backend services.",
      duration: "3 Weeks",
      skills: [
        { name: "REST APIs", completed: false },
        { name: "Authentication", completed: false },
        { name: "Databases", completed: false },
        { name: "API Integration", completed: false },
      ],
    },
    {
      id: 4,
      title: "Testing & Deployment",
      description: "Prepare mobile applications for real users.",
      duration: "3 Weeks",
      skills: [
        { name: "Mobile Testing", completed: false },
        { name: "Performance Optimization", completed: false },
        { name: "App Builds", completed: false },
        { name: "App Store Deployment", completed: false },
      ],
    },
    {
      id: 5,
      title: "Mobile Portfolio Project",
      description: "Build and publish a complete mobile application.",
      duration: "4 Weeks",
      skills: [
        { name: "Plan App", completed: false },
        { name: "Build App", completed: false },
        { name: "Test App", completed: false },
        { name: "Publish App", completed: false },
      ],
    },
  ],

  "UI/UX Designer": [
    {
      id: 1,
      title: "Design Foundations",
      description:
        "Learn the fundamentals of visual design and user experience.",
      duration: "2 Weeks",
      skills: [
        { name: "Design Principles", completed: false },
        { name: "Color Theory", completed: false },
        { name: "Typography", completed: false },
        { name: "Layout & Composition", completed: false },
      ],
    },
    {
      id: 2,
      title: "UX Research",
      description: "Learn how to understand users and identify their needs.",
      duration: "3 Weeks",
      skills: [
        { name: "User Research", completed: false },
        { name: "User Personas", completed: false },
        { name: "User Journeys", completed: false },
        { name: "Usability Testing", completed: false },
      ],
    },
    {
      id: 3,
      title: "UI Design",
      description: "Create polished and accessible digital interfaces.",
      duration: "4 Weeks",
      skills: [
        { name: "Wireframing", completed: false },
        { name: "Prototyping", completed: false },
        { name: "Design Systems", completed: false },
        { name: "Responsive Design", completed: false },
      ],
    },
    {
      id: 4,
      title: "Figma & Product Design",
      description:
        "Use professional design tools to create realistic product designs.",
      duration: "3 Weeks",
      skills: [
        { name: "Figma", completed: false },
        { name: "Interactive Prototypes", completed: false },
        { name: "Components", completed: false },
        { name: "Developer Handoff", completed: false },
      ],
    },
    {
      id: 5,
      title: "UX Portfolio Project",
      description: "Create a complete case study for your design portfolio.",
      duration: "4 Weeks",
      skills: [
        { name: "Choose a Problem", completed: false },
        { name: "Conduct Research", completed: false },
        { name: "Design the Solution", completed: false },
        { name: "Create Case Study", completed: false },
      ],
    },
  ],
};

/* =========================================================
   CAREER NORMALIZATION
========================================================= */

const normalizeCareer = (career) => {
  if (!career) return null;

  const value = career.trim().toLowerCase();

  if (
    value.includes("full stack") ||
    value.includes("full-stack") ||
    value.includes("fullstack")
  ) {
    return "Full Stack Developer";
  }

  if (
    value.includes("ai / ml") ||
    value.includes("ai/ml") ||
    value.includes("ai ml") ||
    value.includes("machine learning") ||
    value.includes("artificial intelligence")
  ) {
    return "AI / ML Engineer";
  }

  if (value.includes("data scientist")) {
    return "Data Scientist";
  }

  if (value.includes("cloud")) {
    return "Cloud Engineer";
  }

  if (value.includes("cyber") || value.includes("security")) {
    return "Cybersecurity Engineer";
  }

  if (value.includes("devops")) {
    return "DevOps Engineer";
  }

  if (
    value.includes("mobile") ||
    value.includes("android") ||
    value.includes("ios")
  ) {
    return "Mobile App Developer";
  }

  if (
    value.includes("ui/ux") ||
    value.includes("ui ux") ||
    value.includes("designer")
  ) {
    return "UI/UX Designer";
  }

  return null;
};

/* =========================================================
   CREATE FRESH ROADMAP
========================================================= */

const createRoadmap = (career) => {
  const selectedRoadmap = ROADMAPS[career];

  if (!selectedRoadmap) {
    return [];
  }

  return selectedRoadmap.map((phase) => ({
    ...phase,
    skills: phase.skills.map((skill) => ({
      ...skill,
      completed: false,
    })),
  }));
};

/* =========================================================
   COMPONENT
========================================================= */

function PersonalizedRoadmap() {
  /*
    IMPORTANT:
    Assessment career gets PRIORITY.

    This fixes the problem where:
    AI/ML assessment
          ↓
    old selectedCareer = Full Stack
          ↓
    Full Stack roadmap
  */

  const assessmentCareerRaw = localStorage.getItem("assessmentCareer");

  const selectedCareerRaw = localStorage.getItem("selectedCareer");

  const normalizedAssessmentCareer = normalizeCareer(assessmentCareerRaw);

  const normalizedSelectedCareer = normalizeCareer(selectedCareerRaw);

  const selectedCareer =
    normalizedAssessmentCareer ||
    normalizedSelectedCareer ||
    "Full Stack Developer";

  /* =========================================================
     CAREER-SPECIFIC STORAGE KEYS
  ========================================================= */

  const roadmapStorageKey = `pathwiseRoadmap_${selectedCareer}`;

  const xpStorageKey = `pathwiseXP_${selectedCareer}`;

  const completedStorageKey = `pathwiseCompletedSkills_${selectedCareer}`;

  /* =========================================================
     ROADMAP STATE
  ========================================================= */

  const [roadmap, setRoadmap] = useState(() => {
    const savedRoadmap = localStorage.getItem(roadmapStorageKey);

    if (savedRoadmap) {
      try {
        return JSON.parse(savedRoadmap);
      } catch {
        return createRoadmap(selectedCareer);
      }
    }

    return createRoadmap(selectedCareer);
  });

  const [xpMessage, setXpMessage] = useState("");

  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem(xpStorageKey)) || 0;
  });

  const [completedCount, setCompletedCount] = useState(() => {
    return Number(localStorage.getItem(completedStorageKey)) || 0;
  });

  /* =========================================================
     SAVE ROADMAP
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(roadmapStorageKey, JSON.stringify(roadmap));

    /*
      Keep compatibility with older parts
      of your project.
    */
    localStorage.setItem("pathwiseRoadmap", JSON.stringify(roadmap));
  }, [roadmap, roadmapStorageKey]);

  /* =========================================================
     SAVE XP
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(xpStorageKey, String(xp));

    localStorage.setItem(completedStorageKey, String(completedCount));

    window.dispatchEvent(new Event("pathwiseXPUpdated"));
  }, [xp, completedCount, xpStorageKey, completedStorageKey]);

  /* =========================================================
     ASSESSMENT RESULTS
  ========================================================= */

  const assessmentResults = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("assessmentResults") || "{}");
    } catch {
      return {};
    }
  }, []);

  /* =========================================================
     PRIORITY SKILLS
  ========================================================= */

  const prioritySkills = useMemo(() => {
    return Object.entries(assessmentResults)
      .filter(([, score]) => Number(score) < 75)
      .sort(([, a], [, b]) => Number(a) - Number(b))
      .slice(0, 5);
  }, [assessmentResults]);

  /* =========================================================
     TOGGLE SKILL
  ========================================================= */

  const toggleSkill = (phaseId, skillIndex) => {
    const phase = roadmap.find((item) => item.id === phaseId);

    if (!phase) return;

    const skill = phase.skills[skillIndex];

    if (!skill) return;

    const wasCompleted = skill.completed;

    setRoadmap((currentRoadmap) =>
      currentRoadmap.map((currentPhase) => {
        if (currentPhase.id !== phaseId) {
          return currentPhase;
        }

        return {
          ...currentPhase,

          skills: currentPhase.skills.map((currentSkill, index) => {
            if (index !== skillIndex) {
              return currentSkill;
            }

            return {
              ...currentSkill,
              completed: !currentSkill.completed,
            };
          }),
        };
      }),
    );

    /*
      Award XP only when completing
      an unfinished skill.
    */

    if (!wasCompleted) {
      setXp((currentXP) => currentXP + 50);

      setCompletedCount((currentCount) => currentCount + 1);

      setXpMessage("+50 XP! 🎉 Skill completed!");

      setTimeout(() => {
        setXpMessage("");
      }, 2500);
    } else {
      /*
        If user unchecks a skill,
        remove the completion count.

        XP is NOT removed because XP represents
        earned experience.
      */
      setCompletedCount((currentCount) => Math.max(0, currentCount - 1));
    }
  };

  /* =========================================================
     TOTAL PROGRESS
  ========================================================= */

  const totalSkills = roadmap.reduce(
    (total, phase) => total + phase.skills.length,
    0,
  );

  const completedSkills = roadmap.reduce(
    (total, phase) =>
      total + phase.skills.filter((skill) => skill.completed).length,
    0,
  );

  const progress =
    totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

  /* =========================================================
     LEVEL SYSTEM
  ========================================================= */

  const level = Math.min(10, Math.floor(xp / 250) + 1);

  const levelName =
    level === 1
      ? "Beginner"
      : level === 2
        ? "Explorer"
        : level === 3
          ? "Skill Builder"
          : level === 4
            ? "Rising Star"
            : level === 5
              ? "Career Ready"
              : level <= 7
                ? "Advanced"
                : "PathWise Pro";

  const xpIntoLevel = xp % 250;

  const xpToNextLevel = 250 - xpIntoLevel;

  /* =========================================================
     NEXT SKILL
  ========================================================= */

  const nextSkill = roadmap
    .flatMap((phase) =>
      phase.skills.map((skill) => ({
        ...skill,
        phaseTitle: phase.title,
      })),
    )
    .find((skill) => !skill.completed);

  /* =========================================================
     ACHIEVEMENTS
  ========================================================= */

  const achievements = [
    {
      icon: "🚀",
      title: "First Step",
      unlocked: completedSkills >= 1,
      description: "Complete your first skill",
    },
    {
      icon: "🔥",
      title: "Skill Builder",
      unlocked: completedSkills >= 5,
      description: "Complete 5 skills",
    },
    {
      icon: "🏆",
      title: "Roadmap Starter",
      unlocked: completedSkills >= 10,
      description: "Complete 10 skills",
    },
    {
      icon: "💎",
      title: "Career Ready",
      unlocked: progress >= 75,
      description: "Reach 75% roadmap progress",
    },
    {
      icon: "👑",
      title: "PathWise Pro",
      unlocked: progress === 100,
      description: "Complete the entire roadmap",
    },
  ];

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  /* =========================================================
     MOTIVATIONAL QUOTES
  ========================================================= */

  const quotes = [
    "Small progress every day creates extraordinary results.",
    "You don't need to be perfect. You just need to keep moving.",
    "Every skill you complete makes your future stronger.",
    "Your career is built one skill at a time.",
    "Consistency beats motivation.",
  ];

  const quote = quotes[completedSkills % quotes.length];

  /* =========================================================
     NO ROADMAP SAFETY
  ========================================================= */

  if (roadmap.length === 0) {
    return (
      <div className="roadmap-page">
        <div className="recommended-card">
          <div className="recommended-icon">⚠️</div>

          <div className="recommended-content">
            <h2>Career roadmap not found</h2>

            <p>
              We could not find a roadmap for
              <strong> {selectedCareer}</strong>.
            </p>

            <p>Please return to the assessment and select your career again.</p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="roadmap-page">
      {/* =====================================================
          XP POPUP
      ===================================================== */}

      {xpMessage && <div className="xp-popup">⚡ {xpMessage}</div>}

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="roadmap-header">
        <div>
          <p className="roadmap-label">YOUR PERSONALIZED ROADMAP</p>

          <h1>Become a {selectedCareer} 🚀</h1>

          <p className="roadmap-description">
            Your roadmap is personalized using your assessment results. Complete
            skills, earn XP and move closer to your career goal.
          </p>

          {/* CAREER CONFIRMATION */}

          <div
            style={{
              marginTop: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#ecfdf5",
              color: "#047857",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            ✓ Assessment career detected: {selectedCareer}
          </div>
        </div>

        <div className="roadmap-progress-card">
          <div className="progress-circle">{progress}%</div>

          <div>
            <strong>Overall Progress</strong>

            <p>
              {completedSkills} of {totalSkills} skills completed
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          GAMIFICATION STATS
      ===================================================== */}

      <div className="career-selector">
        <div>
          <label>🎯 Target Career</label>

          <div
            style={{
              marginTop: "6px",
              fontWeight: 800,
            }}
          >
            {selectedCareer}
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            CURRENT LEVEL
          </div>

          <strong>
            🌱 Level {level} — {levelName}
          </strong>
        </div>
      </div>

      {/* =====================================================
          XP / GAMIFICATION CARDS
      ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          maxWidth: "1000px",
          margin: "20px auto",
        }}
      >
        <div className="roadmap-progress-card">
          <div
            style={{
              fontSize: "30px",
            }}
          >
            ⭐
          </div>

          <div>
            <strong>XP</strong>

            <p>{xp} points</p>
          </div>
        </div>

        <div className="roadmap-progress-card">
          <div
            style={{
              fontSize: "30px",
            }}
          >
            🏅
          </div>

          <div>
            <strong>Achievements</strong>

            <p>
              {unlockedAchievements}/{achievements.length} unlocked
            </p>
          </div>
        </div>

        <div className="roadmap-progress-card">
          <div
            style={{
              fontSize: "30px",
            }}
          >
            📈
          </div>

          <div>
            <strong>Next Level</strong>

            <p>{xpToNextLevel} XP to go</p>
          </div>
        </div>

        <div className="roadmap-progress-card">
          <div
            style={{
              fontSize: "30px",
            }}
          >
            🎯
          </div>

          <div>
            <strong>Skills</strong>

            <p>
              {completedSkills}/{totalSkills}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          XP LEVEL BAR
      ===================================================== */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "20px auto",
          padding: "20px",
          background: "white",
          borderRadius: "18px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontWeight: 700,
          }}
        >
          <span>🌱 Level {level}</span>

          <span>{xpIntoLevel}/250 XP</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${(xpIntoLevel / 250) * 100}%`,
            }}
          />
        </div>

        <p
          style={{
            marginTop: "10px",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          Keep completing skills to unlock your next level! 🚀
        </p>
      </div>

      {/* =====================================================
          PRIORITY SKILLS
      ===================================================== */}

      <div className="priority-focus-card">
        <div className="priority-focus-header">
          <div>
            <span className="priority-label">🎯 SMART FOCUS</span>

            <h2>Skills to Improve First</h2>

            <p>
              Based on your assessment, these areas need the most attention.
            </p>
          </div>

          <div className="priority-icon">🔥</div>
        </div>

        {prioritySkills.length > 0 ? (
          <div className="priority-skills">
            {prioritySkills.map(([skill, score], index) => (
              <div className="priority-skill" key={skill}>
                <div className="priority-rank">{index + 1}</div>

                <div className="priority-skill-info">
                  <div className="priority-skill-name">{skill}</div>

                  <div className="priority-bar">
                    <div
                      className="priority-bar-fill"
                      style={{
                        width: `${score}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="priority-score">{score}%</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-gaps-message">
            🎉 Amazing! No major skill gaps were identified in your assessment.
          </div>
        )}
      </div>

      {/* =====================================================
          RECOMMENDED NEXT STEP
      ===================================================== */}

      {nextSkill && (
        <div className="recommended-card">
          <div className="recommended-icon">🚀</div>

          <div className="recommended-content">
            <span className="recommended-label">RECOMMENDED NEXT STEP</span>

            <h2>{nextSkill.name}</h2>

            <p>
              Start with this skill from the{" "}
              <strong>{nextSkill.phaseTitle}</strong> phase. Complete it to earn{" "}
              <strong>+50 XP</strong>.
            </p>

            <div className="recommended-meta">
              <span>⚡ +50 XP</span>

              <span>🎯 {selectedCareer}</span>

              <span>📈 {progress}% complete</span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ROADMAP TIMELINE
      ===================================================== */}

      <div className="roadmap-timeline">
        {roadmap.map((phase, phaseIndex) => {
          const completed = phase.skills.filter(
            (skill) => skill.completed,
          ).length;

          const phaseProgress =
            phase.skills.length === 0
              ? 0
              : Math.round((completed / phase.skills.length) * 100);

          return (
            <div className="roadmap-phase" key={phase.id}>
              <div className="phase-number">{phaseIndex + 1}</div>

              <div className="phase-card">
                <div className="phase-header">
                  <div>
                    <div className="phase-tags">
                      <span className="phase-tag">PHASE {phaseIndex + 1}</span>

                      {phaseProgress === 100 && (
                        <span className="priority-phase-tag">✓ COMPLETED</span>
                      )}

                      {phaseProgress > 0 && phaseProgress < 100 && (
                        <span className="priority-phase-tag">
                          🔥 IN PROGRESS
                        </span>
                      )}
                    </div>

                    <h2>{phase.title}</h2>

                    <p>{phase.description}</p>
                  </div>

                  <span className="phase-duration">⏱ {phase.duration}</span>
                </div>

                {/* PHASE PROGRESS */}

                <div className="phase-progress">
                  <div className="phase-progress-info">
                    <span>Progress</span>

                    <span>{phaseProgress}%</span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${phaseProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* SKILLS */}

                <div className="skills-list">
                  {phase.skills.map((skill, skillIndex) => (
                    <label
                      className={`skill-item ${
                        skill.completed ? "completed" : ""
                      }`}
                      key={skill.name}
                    >
                      <input
                        type="checkbox"
                        checked={skill.completed}
                        onChange={() => toggleSkill(phase.id, skillIndex)}
                      />

                      <span>{skill.name}</span>

                      {!skill.completed && (
                        <span className="assessment-score">+50 XP</span>
                      )}

                      {skill.completed && (
                        <span className="completed-text">✓ Completed</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
          padding: "28px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <span className="priority-label">🏆 ACHIEVEMENTS</span>

            <h2>Your Badges</h2>
          </div>

          <strong>
            {unlockedAchievements}/{achievements.length}
          </strong>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "14px",
          }}
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              style={{
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                border: "1px solid #e5e7eb",
                opacity: achievement.unlocked ? 1 : 0.55,
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                }}
              >
                {achievement.unlocked ? achievement.icon : "🔒"}
              </div>

              <strong>{achievement.title}</strong>

              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          MOTIVATION
      ===================================================== */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
          padding: "30px",
          background: "#111827",
          color: "white",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
          }}
        >
          🧠
        </div>

        <h2
          style={{
            margin: "10px 0",
          }}
        >
          “{quote}”
        </h2>

        <p
          style={{
            margin: 0,
            color: "#cbd5e1",
          }}
        >
          Keep going, {levelName}. Your future{" "}
          {selectedCareer === "Full Stack Developer"
            ? "developer"
            : "professional"}{" "}
          self is counting on you. 🚀
        </p>
      </div>
    </div>
  );
}

export default PersonalizedRoadmap;
