import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Flame,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";

import "./PersonalizedRoadmap.css";

/* =========================================================
   CAREER ROADMAP DATA
========================================================= */

const ROADMAPS = {
  /* =======================================================
     FULL STACK DEVELOPER
  ======================================================= */

  "Full Stack Developer": [
    {
      id: 1,
      title: "Web Development Foundations",
      description:
        "Build a strong foundation in modern web development and programming.",
      duration: "2 Weeks",
      skills: [
        {
          id: "html5",
          name: "HTML5",
          description:
            "Learn semantic HTML, page structure, forms and modern HTML elements.",
          resource: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        },
        {
          id: "css3",
          name: "CSS3",
          description:
            "Learn modern CSS, layouts, responsive design, Flexbox and Grid.",
          resource: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        {
          id: "javascript",
          name: "JavaScript",
          description:
            "Understand variables, functions, arrays, objects, DOM and modern JavaScript.",
          resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          id: "responsive-ui",
          name: "Responsive UI",
          description:
            "Build interfaces that work smoothly across desktop, tablet and mobile devices.",
          resource:
            "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
        },
      ],
    },
    {
      id: 2,
      title: "Frontend Development",
      description:
        "Learn React and build interactive modern frontend applications.",
      duration: "3 Weeks",
      skills: [
        {
          id: "react",
          name: "React",
          description:
            "Learn components, props, state, hooks and modern React development.",
          resource: "https://react.dev/learn",
        },
        {
          id: "react-router",
          name: "React Router",
          description:
            "Learn client-side routing and navigation in React applications.",
          resource: "https://reactrouter.com/",
        },
        {
          id: "frontend-projects",
          name: "Frontend Projects",
          description:
            "Build practical frontend projects to strengthen your portfolio.",
          resource: "https://github.com/",
        },
      ],
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Learn how servers, APIs and backend applications work.",
      duration: "3 Weeks",
      skills: [
        {
          id: "nodejs",
          name: "Node.js",
          description:
            "Learn how to run JavaScript on the server and build backend applications.",
          resource: "https://nodejs.org/en/learn",
        },
        {
          id: "expressjs",
          name: "Express.js",
          description: "Build backend servers and REST APIs using Express.",
          resource: "https://expressjs.com/",
        },
        {
          id: "rest-apis",
          name: "REST APIs",
          description:
            "Understand HTTP methods, endpoints, requests, responses and API design.",
          resource: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
        },
      ],
    },
    {
      id: 4,
      title: "Databases & Authentication",
      description:
        "Learn how applications store data and securely authenticate users.",
      duration: "2 Weeks",
      skills: [
        {
          id: "databases",
          name: "Databases",
          description:
            "Understand database concepts, collections, tables, queries and data relationships.",
          resource: "https://www.mongodb.com/docs/",
        },
        {
          id: "firebase",
          name: "Firebase",
          description:
            "Use Firebase services such as Authentication and Firestore.",
          resource: "https://firebase.google.com/docs",
        },
        {
          id: "authentication",
          name: "Authentication",
          description:
            "Understand login systems, sessions, tokens and user authentication.",
          resource: "https://firebase.google.com/docs/auth",
        },
      ],
    },
    {
      id: 5,
      title: "Version Control & Deployment",
      description:
        "Learn Git, GitHub and how to deploy production applications.",
      duration: "2 Weeks",
      skills: [
        {
          id: "git-github",
          name: "Git & GitHub",
          description:
            "Track code changes, collaborate and manage repositories using Git and GitHub.",
          resource: "https://docs.github.com/en/get-started",
        },
        {
          id: "deployment",
          name: "Deployment",
          description: "Learn how to deploy frontend and backend applications.",
          resource: "https://vercel.com/",
        },
        {
          id: "fullstack-project",
          name: "Full Stack Project",
          description:
            "Build and deploy a complete full stack project for your portfolio.",
          resource: "https://github.com/",
        },
      ],
    },
  ],

  /* =======================================================
     BACKEND DEVELOPER
     NEW ROADMAP
  ======================================================= */

  "Backend Developer": [
    {
      id: 1,
      title: "Backend Foundations",
      description:
        "Build a strong foundation in server-side programming and backend development.",
      duration: "3 Weeks",
      skills: [
        {
          id: "backend-javascript",
          name: "JavaScript",
          description:
            "Strengthen JavaScript fundamentals required for server-side development.",
          resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          id: "backend-nodejs",
          name: "Node.js",
          description:
            "Learn how to run JavaScript outside the browser and build backend applications.",
          resource: "https://nodejs.org/en/learn",
        },
        {
          id: "npm",
          name: "NPM",
          description:
            "Learn how to manage packages and dependencies in Node.js projects.",
          resource: "https://docs.npmjs.com/",
        },
      ],
    },
    {
      id: 2,
      title: "Express & REST APIs",
      description:
        "Learn how to build scalable backend servers and RESTful APIs.",
      duration: "3 Weeks",
      skills: [
        {
          id: "backend-expressjs",
          name: "Express.js",
          description:
            "Build backend servers, routes and middleware using Express.js.",
          resource: "https://expressjs.com/",
        },
        {
          id: "backend-rest-apis",
          name: "REST APIs",
          description:
            "Understand HTTP methods, endpoints, requests, responses and REST API design.",
          resource: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
        },
        {
          id: "middleware",
          name: "Middleware",
          description:
            "Understand middleware functions and how they process backend requests.",
          resource: "https://expressjs.com/en/guide/using-middleware.html",
        },
      ],
    },
    {
      id: 3,
      title: "Databases",
      description:
        "Learn how backend applications store, query and manage application data.",
      duration: "3 Weeks",
      skills: [
        {
          id: "mongodb",
          name: "MongoDB",
          description:
            "Learn how to store and query application data using MongoDB.",
          resource: "https://www.mongodb.com/docs/",
        },
        {
          id: "sql",
          name: "SQL",
          description:
            "Learn relational databases, tables, queries, joins and data manipulation.",
          resource: "https://www.w3schools.com/sql/",
        },
        {
          id: "database-design",
          name: "Database Design",
          description:
            "Learn how to structure databases efficiently for backend applications.",
          resource: "https://www.mongodb.com/docs/manual/data-modeling/",
        },
      ],
    },
    {
      id: 4,
      title: "Authentication & Security",
      description:
        "Build secure backend systems with authentication and authorization.",
      duration: "3 Weeks",
      skills: [
        {
          id: "backend-authentication",
          name: "Authentication",
          description:
            "Understand login systems, authentication and user identity management.",
          resource:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication",
        },
        {
          id: "jwt",
          name: "JWT",
          description:
            "Learn how JSON Web Tokens can be used for stateless authentication.",
          resource: "https://jwt.io/introduction",
        },
        {
          id: "backend-security",
          name: "Backend Security",
          description:
            "Learn common backend security practices including validation and secure API design.",
          resource: "https://owasp.org/www-project-api-security/",
        },
      ],
    },
    {
      id: 5,
      title: "Backend Projects & Deployment",
      description:
        "Build, deploy and demonstrate production-ready backend applications.",
      duration: "3 Weeks",
      skills: [
        {
          id: "backend-project",
          name: "Backend Project",
          description:
            "Build a complete backend application with APIs, database and authentication.",
          resource: "https://github.com/",
        },
        {
          id: "backend-git-github",
          name: "Git & GitHub",
          description:
            "Track backend project changes and collaborate using Git and GitHub.",
          resource: "https://docs.github.com/en/get-started",
        },
        {
          id: "backend-deployment",
          name: "Deployment",
          description:
            "Learn how to deploy backend applications to production environments.",
          resource: "https://render.com/",
        },
      ],
    },
  ],

  /* =======================================================
     AI / ML ENGINEER
  ======================================================= */

  "AI / ML Engineer": [
    {
      id: 1,
      title: "Programming & Mathematics",
      description:
        "Build the programming and mathematical foundation required for AI and machine learning.",
      duration: "3 Weeks",
      skills: [
        {
          id: "python",
          name: "Python",
          description:
            "Learn Python programming, functions, data structures and object-oriented programming.",
          resource: "https://docs.python.org/3/tutorial/",
        },
        {
          id: "linear-algebra",
          name: "Linear Algebra",
          description:
            "Learn vectors, matrices and mathematical operations used in machine learning.",
          resource: "https://www.khanacademy.org/math/linear-algebra",
        },
        {
          id: "calculus",
          name: "Calculus",
          description:
            "Understand derivatives, gradients and mathematical optimization concepts.",
          resource: "https://www.khanacademy.org/math/calculus-1",
        },
        {
          id: "statistics",
          name: "Statistics",
          description:
            "Learn probability, distributions, averages and statistical reasoning.",
          resource: "https://www.khanacademy.org/math/statistics-probability",
        },
      ],
    },
    {
      id: 2,
      title: "Data Science Foundations",
      description:
        "Learn how to work with datasets and prepare data for machine learning.",
      duration: "3 Weeks",
      skills: [
        {
          id: "numpy",
          name: "NumPy",
          description:
            "Perform numerical computations and work with multidimensional arrays.",
          resource: "https://numpy.org/learn/",
        },
        {
          id: "pandas",
          name: "Pandas",
          description: "Manipulate, clean and analyze structured datasets.",
          resource: "https://pandas.pydata.org/docs/",
        },
        {
          id: "data-analysis",
          name: "Data Analysis",
          description: "Learn how to clean, explore and visualize datasets.",
          resource: "https://www.kaggle.com/learn",
        },
      ],
    },
    {
      id: 3,
      title: "Machine Learning",
      description:
        "Learn the core concepts and algorithms behind machine learning.",
      duration: "4 Weeks",
      skills: [
        {
          id: "supervised-learning",
          name: "Supervised Learning",
          description:
            "Learn classification, regression and model evaluation using labeled data.",
          resource: "https://scikit-learn.org/stable/supervised_learning.html",
        },
        {
          id: "unsupervised-learning",
          name: "Unsupervised Learning",
          description:
            "Learn clustering and other methods for discovering patterns in unlabeled data.",
          resource:
            "https://scikit-learn.org/stable/unsupervised_learning.html",
        },
        {
          id: "scikit-learn",
          name: "Scikit-learn",
          description:
            "Use Python tools for building and evaluating machine learning models.",
          resource: "https://scikit-learn.org/",
        },
      ],
    },
    {
      id: 4,
      title: "Deep Learning",
      description: "Build a foundation in neural networks and deep learning.",
      duration: "4 Weeks",
      skills: [
        {
          id: "neural-networks",
          name: "Neural Networks",
          description:
            "Understand neurons, layers, activation functions and training.",
          resource:
            "https://developers.google.com/machine-learning/crash-course/neural-networks",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          description: "Build and train deep learning models using PyTorch.",
          resource: "https://pytorch.org/tutorials/",
        },
        {
          id: "computer-vision",
          name: "Computer Vision",
          description:
            "Learn how machine learning systems process images and video.",
          resource: "https://opencv.org/",
        },
      ],
    },
  ],

  /* =======================================================
     DATA SCIENTIST
  ======================================================= */

  "Data Scientist": [
    {
      id: 1,
      title: "Python & Statistics",
      description:
        "Build the programming and statistical foundation for data science.",
      duration: "3 Weeks",
      skills: [
        {
          id: "ds-python",
          name: "Python",
          description:
            "Learn Python programming for data analysis and automation.",
          resource: "https://docs.python.org/3/tutorial/",
        },
        {
          id: "ds-statistics",
          name: "Statistics",
          description:
            "Learn descriptive statistics, probability and statistical reasoning.",
          resource: "https://www.khanacademy.org/math/statistics-probability",
        },
        {
          id: "ds-linear-algebra",
          name: "Linear Algebra",
          description:
            "Understand vectors and matrices used in data science and ML.",
          resource: "https://www.khanacademy.org/math/linear-algebra",
        },
      ],
    },
    {
      id: 2,
      title: "Data Analysis",
      description:
        "Learn to manipulate, clean and understand real-world datasets.",
      duration: "3 Weeks",
      skills: [
        {
          id: "ds-numpy",
          name: "NumPy",
          description: "Perform numerical computation and array operations.",
          resource: "https://numpy.org/learn/",
        },
        {
          id: "ds-pandas",
          name: "Pandas",
          description: "Clean, transform and analyze structured data.",
          resource: "https://pandas.pydata.org/docs/",
        },
        {
          id: "data-visualization",
          name: "Data Visualization",
          description:
            "Create visualizations that communicate insights clearly.",
          resource: "https://matplotlib.org/stable/tutorials/",
        },
      ],
    },
    {
      id: 3,
      title: "Machine Learning",
      description: "Apply machine learning techniques to real-world datasets.",
      duration: "4 Weeks",
      skills: [
        {
          id: "ds-supervised-learning",
          name: "Supervised Learning",
          description: "Learn regression and classification algorithms.",
          resource: "https://scikit-learn.org/stable/supervised_learning.html",
        },
        {
          id: "ds-unsupervised-learning",
          name: "Unsupervised Learning",
          description:
            "Discover patterns using clustering and dimensionality reduction.",
          resource:
            "https://scikit-learn.org/stable/unsupervised_learning.html",
        },
        {
          id: "ds-scikit-learn",
          name: "Scikit-learn",
          description: "Build machine learning models using Python.",
          resource: "https://scikit-learn.org/",
        },
      ],
    },
  ],

  /* =======================================================
     CLOUD ENGINEER
  ======================================================= */

  "Cloud Engineer": [
    {
      id: 1,
      title: "Cloud Foundations",
      description:
        "Understand cloud computing and the infrastructure behind modern applications.",
      duration: "3 Weeks",
      skills: [
        {
          id: "linux",
          name: "Linux",
          description:
            "Learn Linux commands, processes, permissions and server basics.",
          resource: "https://ubuntu.com/tutorials/command-line-for-beginners",
        },
        {
          id: "networking",
          name: "Networking",
          description:
            "Understand IP addresses, DNS, HTTP, TCP/IP and networking fundamentals.",
          resource:
            "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
        },
        {
          id: "cloud-basics",
          name: "Cloud Computing Basics",
          description:
            "Understand compute, storage, networking and cloud service models.",
          resource: "https://aws.amazon.com/what-is-cloud-computing/",
        },
      ],
    },
    {
      id: 2,
      title: "AWS Core Services",
      description: "Learn fundamental AWS services used in cloud environments.",
      duration: "4 Weeks",
      skills: [
        {
          id: "aws-ec2",
          name: "AWS EC2",
          description:
            "Learn how virtual servers are created and managed in AWS.",
          resource: "https://docs.aws.amazon.com/ec2/",
        },
        {
          id: "aws-s3",
          name: "AWS S3",
          description:
            "Learn object storage and storage management using Amazon S3.",
          resource: "https://docs.aws.amazon.com/s3/",
        },
        {
          id: "aws-iam",
          name: "AWS IAM",
          description: "Manage users, roles and permissions in AWS.",
          resource: "https://docs.aws.amazon.com/iam/",
        },
      ],
    },
    {
      id: 3,
      title: "Infrastructure & Deployment",
      description: "Learn containers and infrastructure automation.",
      duration: "4 Weeks",
      skills: [
        {
          id: "cloud-docker",
          name: "Docker",
          description: "Package applications into portable containers.",
          resource: "https://docs.docker.com/get-started/",
        },
        {
          id: "cloud-terraform",
          name: "Terraform",
          description:
            "Manage infrastructure using infrastructure-as-code principles.",
          resource: "https://developer.hashicorp.com/terraform/docs",
        },
        {
          id: "cloud-security",
          name: "Cloud Security",
          description:
            "Understand how to protect cloud applications and infrastructure.",
          resource: "https://aws.amazon.com/security/",
        },
      ],
    },
  ],

  /* =======================================================
     DEVOPS ENGINEER
  ======================================================= */

  "DevOps Engineer": [
    {
      id: 1,
      title: "DevOps Foundations",
      description:
        "Build the foundation required for modern DevOps engineering.",
      duration: "3 Weeks",
      skills: [
        {
          id: "devops-linux",
          name: "Linux",
          description:
            "Learn Linux commands, processes, permissions and server administration.",
          resource: "https://ubuntu.com/tutorials/command-line-for-beginners",
        },
        {
          id: "git",
          name: "Git",
          description:
            "Learn version control and collaborative development workflows.",
          resource: "https://git-scm.com/docs",
        },
        {
          id: "devops-networking",
          name: "Networking",
          description:
            "Understand networking fundamentals used in infrastructure.",
          resource:
            "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
        },
      ],
    },
    {
      id: 2,
      title: "Containers & Orchestration",
      description: "Learn containerization and container orchestration.",
      duration: "4 Weeks",
      skills: [
        {
          id: "devops-docker",
          name: "Docker",
          description: "Build and run applications using containers.",
          resource: "https://docs.docker.com/get-started/",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          description: "Deploy, scale and manage containerized applications.",
          resource: "https://kubernetes.io/docs/tutorials/",
        },
      ],
    },
    {
      id: 3,
      title: "CI/CD & Infrastructure",
      description:
        "Automate testing, deployment and infrastructure management.",
      duration: "4 Weeks",
      skills: [
        {
          id: "ci-cd",
          name: "CI/CD",
          description: "Automate software building, testing and deployment.",
          resource: "https://docs.github.com/en/actions",
        },
        {
          id: "devops-terraform",
          name: "Terraform",
          description: "Manage infrastructure as code.",
          resource: "https://developer.hashicorp.com/terraform/docs",
        },
      ],
    },
  ],

  /* =======================================================
     CYBERSECURITY ENGINEER
  ======================================================= */

  "Cybersecurity Engineer": [
    {
      id: 1,
      title: "Security Foundations",
      description:
        "Understand networking, systems and cybersecurity fundamentals.",
      duration: "3 Weeks",
      skills: [
        {
          id: "cyber-linux",
          name: "Linux",
          description:
            "Learn Linux administration and command-line fundamentals.",
          resource: "https://ubuntu.com/tutorials/command-line-for-beginners",
        },
        {
          id: "cyber-networking",
          name: "Networking",
          description:
            "Understand protocols, DNS, IP addressing and network communication.",
          resource:
            "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
        },
        {
          id: "web-security",
          name: "Web Security",
          description:
            "Understand common vulnerabilities and secure web application practices.",
          resource: "https://owasp.org/www-project-top-ten/",
        },
      ],
    },
    {
      id: 2,
      title: "Security Monitoring",
      description:
        "Learn how security events are collected, monitored and analyzed.",
      duration: "3 Weeks",
      skills: [
        {
          id: "siem",
          name: "SIEM",
          description:
            "Learn how security event data and logs are collected and analyzed.",
          resource: "https://www.ibm.com/topics/siem",
        },
        {
          id: "cyber-cloud-security",
          name: "Cloud Security",
          description: "Learn security principles for cloud infrastructure.",
          resource: "https://aws.amazon.com/security/",
        },
      ],
    },
    {
      id: 3,
      title: "Application Security",
      description: "Learn ethical security testing and application security.",
      duration: "4 Weeks",
      skills: [
        {
          id: "penetration-testing",
          name: "Penetration Testing",
          description:
            "Learn authorized techniques for identifying security weaknesses.",
          resource: "https://owasp.org/www-project-web-security-testing-guide/",
        },
        {
          id: "owasp",
          name: "OWASP",
          description:
            "Study common web application security risks and defenses.",
          resource: "https://owasp.org/",
        },
      ],
    },
  ],

  /* =======================================================
     MOBILE APP DEVELOPER
  ======================================================= */

  "Mobile App Developer": [
    {
      id: 1,
      title: "Mobile Development Foundations",
      description:
        "Learn the fundamentals of modern mobile application development.",
      duration: "3 Weeks",
      skills: [
        {
          id: "mobile-javascript",
          name: "JavaScript",
          description:
            "Build a strong JavaScript foundation before moving into mobile development.",
          resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          id: "mobile-react",
          name: "React",
          description: "Learn components, props, state and hooks.",
          resource: "https://react.dev/learn",
        },
        {
          id: "react-native",
          name: "React Native",
          description:
            "Build cross-platform mobile applications using React Native.",
          resource: "https://reactnative.dev/docs/getting-started",
        },
      ],
    },
    {
      id: 2,
      title: "Mobile UI & Navigation",
      description: "Build usable mobile interfaces and navigation flows.",
      duration: "3 Weeks",
      skills: [
        {
          id: "mobile-navigation",
          name: "Mobile Navigation",
          description:
            "Learn how users move between screens in mobile applications.",
          resource: "https://reactnavigation.org/docs/getting-started",
        },
        {
          id: "mobile-responsive-ui",
          name: "Responsive UI",
          description:
            "Create interfaces that adapt to different screen sizes.",
          resource: "https://reactnative.dev/docs/flexbox",
        },
      ],
    },
  ],

  /* =======================================================
     UI / UX DESIGNER
  ======================================================= */

  "UI/UX Designer": [
    {
      id: 1,
      title: "Design Foundations",
      description:
        "Learn the fundamentals of user interface and experience design.",
      duration: "3 Weeks",
      skills: [
        {
          id: "user-research",
          name: "User Research",
          description: "Understand user needs, behaviors and problems.",
          resource:
            "https://www.nngroup.com/articles/which-ux-research-methods/",
        },
        {
          id: "wireframing",
          name: "Wireframing",
          description: "Create visual structures for digital interfaces.",
          resource: "https://www.figma.com/resources/learn-design/",
        },
        {
          id: "prototyping",
          name: "Prototyping",
          description: "Create interactive prototypes to test product ideas.",
          resource: "https://help.figma.com/",
        },
      ],
    },
    {
      id: 2,
      title: "User Experience",
      description:
        "Learn how to create accessible and user-centered experiences.",
      duration: "3 Weeks",
      skills: [
        {
          id: "accessibility",
          name: "Accessibility",
          description:
            "Design products that can be used by people with different abilities.",
          resource: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
        },
        {
          id: "ui-design",
          name: "UI Design",
          description:
            "Learn visual hierarchy, typography, spacing and interface composition.",
          resource: "https://www.figma.com/resources/learn-design/",
        },
      ],
    },
  ],
};

/* =========================================================
   CAREER NORMALIZATION
========================================================= */

const normalizeCareer = (career) => {
  const normalizedCareer = String(career || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  /* =======================================================
     BACKEND
     IMPORTANT: THIS MUST COME BEFORE FULL STACK
  ======================================================= */

  if (
    normalizedCareer.includes("backend") ||
    normalizedCareer.includes("back end") ||
    normalizedCareer.includes("back-end") ||
    normalizedCareer.includes("backend engineer") ||
    normalizedCareer.includes("server side") ||
    normalizedCareer.includes("server-side")
  ) {
    return "Backend Developer";
  }

  /* =======================================================
     FULL STACK
  ======================================================= */

  if (
    normalizedCareer.includes("full stack") ||
    normalizedCareer.includes("full-stack") ||
    normalizedCareer.includes("fullstack")
  ) {
    return "Full Stack Developer";
  }

  /* =======================================================
     FRONTEND
  ======================================================= */

  if (
    normalizedCareer.includes("frontend") ||
    normalizedCareer.includes("front end") ||
    normalizedCareer.includes("front-end")
  ) {
    return "Full Stack Developer";
  }

  /* =======================================================
     AI / ML
  ======================================================= */

  if (
    normalizedCareer.includes("artificial intelligence") ||
    normalizedCareer.includes("machine learning") ||
    normalizedCareer.includes("ai/ml") ||
    normalizedCareer.includes("ai ml") ||
    normalizedCareer.includes("ai engineer") ||
    normalizedCareer === "ai"
  ) {
    return "AI / ML Engineer";
  }

  /* =======================================================
     DATA SCIENTIST
  ======================================================= */

  if (
    normalizedCareer.includes("data scientist") ||
    normalizedCareer.includes("data science")
  ) {
    return "Data Scientist";
  }

  /* =======================================================
     CLOUD
  ======================================================= */

  if (
    normalizedCareer.includes("cloud engineer") ||
    normalizedCareer === "cloud" ||
    normalizedCareer.includes("cloud")
  ) {
    return "Cloud Engineer";
  }

  /* =======================================================
     DEVOPS
  ======================================================= */

  if (
    normalizedCareer.includes("devops") ||
    normalizedCareer.includes("dev ops")
  ) {
    return "DevOps Engineer";
  }

  /* =======================================================
     CYBERSECURITY
  ======================================================= */

  if (
    normalizedCareer.includes("cybersecurity") ||
    normalizedCareer.includes("cyber security") ||
    normalizedCareer.includes("cyber") ||
    normalizedCareer.includes("security engineer")
  ) {
    return "Cybersecurity Engineer";
  }

  /* =======================================================
     MOBILE
  ======================================================= */

  if (
    normalizedCareer.includes("mobile") ||
    normalizedCareer.includes("android") ||
    normalizedCareer.includes("ios")
  ) {
    return "Mobile App Developer";
  }

  /* =======================================================
     UI / UX
  ======================================================= */

  if (
    normalizedCareer.includes("ui/ux") ||
    normalizedCareer.includes("ui ux") ||
    normalizedCareer.includes("ux designer") ||
    normalizedCareer.includes("ui designer") ||
    normalizedCareer.includes("designer")
  ) {
    return "UI/UX Designer";
  }

  /* =======================================================
     EXACT ROADMAP MATCH
  ======================================================= */

  const exactCareer = Object.keys(ROADMAPS).find(
    (roadmapCareer) => roadmapCareer.toLowerCase().trim() === normalizedCareer,
  );

  if (exactCareer) {
    return exactCareer;
  }

  /* =======================================================
     SAFE FALLBACK
  ======================================================= */

  return "Full Stack Developer";
};

/* =========================================================
   COMPLETION STORAGE
========================================================= */

const getCompletedSkills = (career) => {
  try {
    const stored = localStorage.getItem(`pathwiseCompletedSkills_${career}`);

    if (!stored) return {};

    const parsed = JSON.parse(stored);

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Failed to load completed skills:", error);
    return {};
  }
};

const isSkillCompleted = (career, skillId) => {
  const completed = getCompletedSkills(career);

  return completed[skillId] === true;
};

const saveSkillCompleted = (career, skillId) => {
  const completed = getCompletedSkills(career);

  completed[skillId] = true;

  localStorage.setItem(
    `pathwiseCompletedSkills_${career}`,
    JSON.stringify(completed),
  );
};

/* =========================================================
   XP STORAGE
========================================================= */

const getStoredXP = () => {
  const possibleKeys = ["pathwiseXP", "xp", "totalXP", "userXP"];

  for (const key of possibleKeys) {
    const value = Number(localStorage.getItem(key));

    if (Number.isFinite(value) && value > 0) {
      return value;
    }
  }

  return 0;
};

const saveXP = (xp) => {
  const safeXP = Math.max(0, Number(xp) || 0);

  localStorage.setItem("pathwiseXP", String(safeXP));
  localStorage.setItem("xp", String(safeXP));
  localStorage.setItem("totalXP", String(safeXP));
  localStorage.setItem("userXP", String(safeXP));

  return safeXP;
};

const addXP = (amount) => {
  const currentXP = getStoredXP();
  const newXP = currentXP + Number(amount || 0);

  return saveXP(newXP);
};

/* =========================================================
   LEVEL CALCULATION
========================================================= */

const getLevelData = (xp) => {
  const safeXP = Math.max(0, Number(xp) || 0);

  const level = Math.floor(safeXP / 250) + 1;
  const currentLevelXP = safeXP % 250;
  const progress = Math.min(100, Math.round((currentLevelXP / 250) * 100));

  return {
    level,
    currentLevelXP,
    nextLevelXP: 250,
    progress,
  };
};

/* =========================================================
   COMPLETED SKILLS COUNT
========================================================= */

const getTotalCompletedSkills = () => {
  let total = 0;

  Object.keys(ROADMAPS).forEach((career) => {
    const completed = getCompletedSkills(career);

    total += Object.values(completed).filter(Boolean).length;
  });

  return total;
};

/* =========================================================
   PREPARE ROADMAP
========================================================= */

const prepareRoadmap = (roadmap, career) => {
  return roadmap.map((phase) => ({
    ...phase,

    skills: (phase.skills || []).map((skill) => ({
      ...skill,
      completed: skill.completed === true || isSkillCompleted(career, skill.id),
    })),
  }));
};

/* =========================================================
   SKILL QUEST BANK
========================================================= */

const QUEST_BANK = {
  HTML5: {
    question: "Which HTML element is commonly used for the main heading?",
    options: ["<h1>", "<head>", "<title>", "<header>"],
    answer: 0,
    explanation: "<h1> represents the main or highest-level heading on a page.",
  },

  CSS3: {
    question:
      "Which CSS layout system is designed for two-dimensional layouts?",
    options: ["Flexbox", "Grid", "Float", "Inline"],
    answer: 1,
    explanation:
      "CSS Grid is designed for two-dimensional row and column layouts.",
  },

  JavaScript: {
    question:
      "Which keyword creates a block-scoped variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    answer: 1,
    explanation:
      "let creates a block-scoped variable whose value can be reassigned.",
  },

  React: {
    question: "Which React hook is commonly used to manage component state?",
    options: ["useEffect", "useState", "useRouter", "useFetch"],
    answer: 1,
    explanation: "useState lets a React component store and update state.",
  },

  "React Router": {
    question: "What is the primary purpose of React Router?",
    options: [
      "Database storage",
      "Client-side navigation",
      "Image compression",
      "CSS compilation",
    ],
    answer: 1,
    explanation:
      "React Router provides routing and client-side navigation for React applications.",
  },

  "Responsive UI": {
    question: "What is the main goal of responsive design?",
    options: [
      "Make websites work across different screen sizes",
      "Remove JavaScript",
      "Increase database speed",
      "Replace HTML",
    ],
    answer: 0,
    explanation:
      "Responsive design adapts layouts and interfaces to different devices and screen sizes.",
  },

  "Node.js": {
    question: "What is Node.js primarily used for?",
    options: [
      "Running JavaScript outside the browser",
      "Designing logos",
      "Writing CSS only",
      "Managing physical servers",
    ],
    answer: 0,
    explanation:
      "Node.js provides a JavaScript runtime that can execute JavaScript outside the browser.",
  },

  "Express.js": {
    question: "What is Express.js commonly used for?",
    options: [
      "Building web servers and APIs",
      "Editing images",
      "Creating spreadsheets",
      "Designing mobile icons",
    ],
    answer: 0,
    explanation:
      "Express.js is a Node.js web framework commonly used to build servers and APIs.",
  },

  "REST APIs": {
    question: "Which HTTP method is commonly used to retrieve data?",
    options: ["GET", "POST", "DELETE", "PATCH"],
    answer: 0,
    explanation: "GET is commonly used to request or retrieve a resource.",
  },

  Databases: {
    question: "What is one major purpose of a database?",
    options: [
      "Store and organize data",
      "Render CSS",
      "Compile JavaScript",
      "Create browser tabs",
    ],
    answer: 0,
    explanation:
      "Databases store and organize information so applications can retrieve and manage it.",
  },

  MongoDB: {
    question: "What type of database is MongoDB?",
    options: [
      "Document database",
      "Graphical database only",
      "Operating system",
      "Programming language",
    ],
    answer: 0,
    explanation: "MongoDB is a NoSQL document-oriented database.",
  },

  SQL: {
    question: "Which SQL command is commonly used to retrieve data?",
    options: ["SELECT", "PUSH", "DISPLAY", "FETCHALL"],
    answer: 0,
    explanation: "SELECT is used to retrieve data from database tables.",
  },

  Authentication: {
    question: "What is authentication primarily concerned with?",
    options: [
      "Verifying who a user is",
      "Changing CSS colors",
      "Compressing images",
      "Sorting arrays",
    ],
    answer: 0,
    explanation: "Authentication verifies the identity of a user.",
  },

  JWT: {
    question: "What is JWT commonly used for?",
    options: [
      "Authentication and securely transmitting claims",
      "CSS styling",
      "Image editing",
      "Database indexing",
    ],
    answer: 0,
    explanation:
      "JSON Web Tokens are commonly used for authentication and securely transmitting claims.",
  },

  Middleware: {
    question: "What is middleware commonly used for in Express?",
    options: [
      "Processing requests before the final handler",
      "Creating database tables",
      "Designing logos",
      "Compiling HTML",
    ],
    answer: 0,
    explanation:
      "Express middleware functions can process requests and responses before the final route handler.",
  },

  Python: {
    question: "Which symbol starts a comment in Python?",
    options: ["//", "#", "<!--", "/*"],
    answer: 1,
    explanation: "Python uses # to begin a single-line comment.",
  },

  NumPy: {
    question: "What is NumPy primarily designed for?",
    options: [
      "Numerical computing",
      "Web routing",
      "Password management",
      "UI animation",
    ],
    answer: 0,
    explanation:
      "NumPy provides powerful tools for numerical computing and array operations.",
  },

  Pandas: {
    question: "What is Pandas widely used for?",
    options: [
      "Data manipulation and analysis",
      "Network routing",
      "Mobile navigation",
      "CSS styling",
    ],
    answer: 0,
    explanation:
      "Pandas provides data structures and tools for manipulating and analyzing data.",
  },

  Statistics: {
    question: "What does the mean represent?",
    options: [
      "The average value",
      "The largest value only",
      "The smallest value only",
      "The number of columns",
    ],
    answer: 0,
    explanation:
      "The mean is commonly calculated by adding values and dividing by the number of values.",
  },

  "Linear Algebra": {
    question: "Which mathematical objects are central to linear algebra?",
    options: [
      "Vectors and matrices",
      "HTML tags",
      "HTTP requests",
      "CSS selectors",
    ],
    answer: 0,
    explanation:
      "Vectors and matrices are fundamental objects studied in linear algebra.",
  },

  Calculus: {
    question: "What does a derivative generally describe?",
    options: [
      "Rate of change",
      "Database size",
      "Screen resolution",
      "File extension",
    ],
    answer: 0,
    explanation:
      "A derivative describes how a quantity changes with respect to another quantity.",
  },

  "Supervised Learning": {
    question: "What distinguishes supervised learning?",
    options: [
      "Training with labeled examples",
      "Using no data",
      "Only using images",
      "Avoiding evaluation",
    ],
    answer: 0,
    explanation:
      "Supervised learning uses labeled training examples to learn a relationship between inputs and outputs.",
  },

  "Unsupervised Learning": {
    question: "Which is an example of unsupervised learning?",
    options: [
      "Clustering",
      "Labeled classification",
      "Manual data entry",
      "Password hashing",
    ],
    answer: 0,
    explanation: "Clustering is a common unsupervised learning technique.",
  },

  "Scikit-learn": {
    question: "What is scikit-learn mainly used for?",
    options: [
      "Machine learning",
      "Web page styling",
      "Mobile navigation",
      "Cloud billing",
    ],
    answer: 0,
    explanation:
      "Scikit-learn is a Python library containing tools for machine learning.",
  },

  "Neural Networks": {
    question: "What is a basic building block of a neural network?",
    options: ["Neuron", "HTML tag", "Database table", "HTTP header"],
    answer: 0,
    explanation:
      "Neurons are fundamental computational units used in neural networks.",
  },

  PyTorch: {
    question: "What is PyTorch commonly used for?",
    options: [
      "Deep learning",
      "CSS styling",
      "DNS management",
      "Git branching",
    ],
    answer: 0,
    explanation:
      "PyTorch is a machine learning framework widely used for deep learning.",
  },

  "Computer Vision": {
    question: "What type of data is commonly processed in computer vision?",
    options: [
      "Images and video",
      "Only passwords",
      "Only HTML",
      "Only database schemas",
    ],
    answer: 0,
    explanation:
      "Computer vision focuses on extracting information from visual data such as images and video.",
  },

  Linux: {
    question: "What is Linux commonly used for in development?",
    options: [
      "Operating system and server environments",
      "Only graphic design",
      "Only spreadsheet editing",
      "Only video editing",
    ],
    answer: 0,
    explanation:
      "Linux is widely used as an operating system for development and server environments.",
  },

  Networking: {
    question: "What does DNS primarily help with?",
    options: [
      "Mapping domain names to network addresses",
      "Styling web pages",
      "Compiling Python",
      "Creating database tables",
    ],
    answer: 0,
    explanation:
      "DNS helps translate human-readable domain names into IP addresses.",
  },

  "Cloud Computing Basics": {
    question: "What is a major characteristic of cloud computing?",
    options: [
      "On-demand access to computing resources",
      "No internet connection",
      "Only local storage",
      "No servers exist",
    ],
    answer: 0,
    explanation:
      "Cloud computing provides on-demand access to computing resources and services.",
  },

  "AWS EC2": {
    question: "What does Amazon EC2 primarily provide?",
    options: [
      "Virtual computing capacity",
      "Design templates",
      "Mobile navigation",
      "CSS frameworks",
    ],
    answer: 0,
    explanation:
      "Amazon EC2 provides resizable virtual compute capacity in the cloud.",
  },

  "AWS S3": {
    question: "What type of service is Amazon S3?",
    options: [
      "Object storage",
      "Container orchestration",
      "Database authentication",
      "Web browser",
    ],
    answer: 0,
    explanation: "Amazon S3 is an object storage service.",
  },

  "AWS IAM": {
    question: "What is AWS IAM used for?",
    options: [
      "Identity and access management",
      "Image editing",
      "CSS compilation",
      "Data visualization",
    ],
    answer: 0,
    explanation: "IAM controls identities and permissions for AWS resources.",
  },

  Docker: {
    question: "What is Docker primarily associated with?",
    options: [
      "Containers",
      "UI typography",
      "Database normalization",
      "Spreadsheet formulas",
    ],
    answer: 0,
    explanation:
      "Docker is widely used to build and run applications in containers.",
  },

  Kubernetes: {
    question: "What is Kubernetes mainly used for?",
    options: [
      "Container orchestration",
      "Image editing",
      "CSS animation",
      "Writing SQL only",
    ],
    answer: 0,
    explanation:
      "Kubernetes automates deployment, scaling and management of containerized applications.",
  },

  Git: {
    question: "What does a Git commit represent?",
    options: [
      "A recorded set of changes",
      "A database server",
      "A CSS selector",
      "A browser extension",
    ],
    answer: 0,
    explanation: "A Git commit records a snapshot of changes in a repository.",
  },

  "Git & GitHub": {
    question: "What is Git primarily used for?",
    options: [
      "Version control",
      "Cloud billing",
      "UI design",
      "Database hosting",
    ],
    answer: 0,
    explanation:
      "Git is a distributed version control system used to track changes in projects.",
  },

  "CI/CD": {
    question: "What is a major goal of CI/CD?",
    options: [
      "Automate building, testing and deployment",
      "Design logos",
      "Replace databases",
      "Create HTML headings",
    ],
    answer: 0,
    explanation:
      "CI/CD helps automate software integration, testing and delivery processes.",
  },

  Terraform: {
    question: "What is Terraform commonly used for?",
    options: [
      "Infrastructure as code",
      "Image editing",
      "UI animation",
      "Mobile navigation",
    ],
    answer: 0,
    explanation:
      "Terraform allows infrastructure to be defined and managed as code.",
  },

  "Cloud Security": {
    question: "What is a key goal of cloud security?",
    options: [
      "Protect cloud resources and data",
      "Increase font size",
      "Replace JavaScript",
      "Create animations",
    ],
    answer: 0,
    explanation:
      "Cloud security focuses on protecting cloud infrastructure, applications and data.",
  },

  SIEM: {
    question: "What is SIEM commonly used for?",
    options: [
      "Security event monitoring and analysis",
      "CSS layout",
      "Mobile navigation",
      "Video rendering",
    ],
    answer: 0,
    explanation:
      "SIEM platforms collect and analyze security-related events and logs.",
  },

  "Web Security": {
    question: "What is a major goal of web security?",
    options: [
      "Protect web applications from attacks",
      "Increase image resolution",
      "Create database tables",
      "Design fonts",
    ],
    answer: 0,
    explanation:
      "Web security focuses on protecting web applications and users from security threats.",
  },

  "Penetration Testing": {
    question: "What is penetration testing designed to do?",
    options: [
      "Identify security weaknesses through authorized testing",
      "Create UI mockups",
      "Compress images",
      "Write CSS",
    ],
    answer: 0,
    explanation:
      "Penetration testing uses authorized security testing to identify weaknesses.",
  },

  OWASP: {
    question: "What does OWASP focus heavily on?",
    options: [
      "Application security",
      "Cloud billing",
      "Typography",
      "Spreadsheet design",
    ],
    answer: 0,
    explanation:
      "OWASP is a community focused on improving application and web security.",
  },

  "React Native": {
    question: "What is React Native used for?",
    options: [
      "Building mobile applications",
      "Database administration only",
      "Cloud billing",
      "Writing SQL only",
    ],
    answer: 0,
    explanation:
      "React Native is used to build mobile applications using React.",
  },

  "Mobile Navigation": {
    question: "What does navigation in a mobile app control?",
    options: [
      "Moving between screens",
      "Database indexing",
      "CSS compilation",
      "Cloud billing",
    ],
    answer: 0,
    explanation:
      "Mobile navigation allows users to move between screens and sections of an application.",
  },

  Wireframing: {
    question: "What is a wireframe?",
    options: [
      "A visual outline of an interface",
      "A database server",
      "A programming language",
      "A network protocol",
    ],
    answer: 0,
    explanation:
      "Wireframes provide a visual structure or outline for an interface before detailed design.",
  },

  Prototyping: {
    question: "What is the purpose of a prototype?",
    options: [
      "Explore and test an interaction or product idea",
      "Replace a database",
      "Compile JavaScript",
      "Configure DNS",
    ],
    answer: 0,
    explanation:
      "Prototypes help designers explore interactions and validate product ideas.",
  },

  Accessibility: {
    question: "What does accessible design aim to achieve?",
    options: [
      "Make products usable by people with different abilities",
      "Remove all images",
      "Use only one font",
      "Disable navigation",
    ],
    answer: 0,
    explanation:
      "Accessibility aims to make digital products usable by people with a wide range of abilities.",
  },

  "User Research": {
    question: "Why is user research important?",
    options: [
      "To understand user needs and behavior",
      "To replace HTML",
      "To increase server RAM",
      "To compile CSS",
    ],
    answer: 0,
    explanation:
      "User research helps teams understand user needs, behaviors and problems.",
  },

  "Data Visualization": {
    question: "What is the main purpose of data visualization?",
    options: [
      "Communicate patterns and insights visually",
      "Replace databases",
      "Compile JavaScript",
      "Manage passwords",
    ],
    answer: 0,
    explanation:
      "Data visualization makes patterns, trends and insights easier to understand.",
  },

  "UI Design": {
    question: "What does UI design primarily focus on?",
    options: [
      "The visual and interactive interface",
      "Database backups",
      "Server hardware",
      "DNS configuration",
    ],
    answer: 0,
    explanation:
      "UI design focuses on the visual appearance and interactive elements of a digital product.",
  },

  Deployment: {
    question: "What does deployment mean?",
    options: [
      "Making an application available to users",
      "Deleting source code",
      "Changing keyboard settings",
      "Creating a database table",
    ],
    answer: 0,
    explanation:
      "Deployment is the process of making software available in a target environment.",
  },

  "Frontend Projects": {
    question: "Why are frontend projects valuable?",
    options: [
      "They provide practical experience and portfolio evidence",
      "They eliminate the need to learn programming",
      "They replace databases",
      "They automatically guarantee a job",
    ],
    answer: 0,
    explanation:
      "Projects demonstrate practical skills and give you evidence of what you can build.",
  },

  "Full Stack Project": {
    question: "What does a full stack project typically combine?",
    options: [
      "Frontend, backend and data storage",
      "Only CSS",
      "Only HTML",
      "Only graphic design",
    ],
    answer: 0,
    explanation:
      "A full stack application commonly includes a frontend, backend and data layer.",
  },

  "Backend Project": {
    question: "What does a backend project typically contain?",
    options: [
      "APIs, server logic, database and authentication",
      "Only CSS",
      "Only images",
      "Only HTML headings",
    ],
    answer: 0,
    explanation:
      "A backend project commonly combines server-side logic, APIs, data storage and authentication.",
  },

  NPM: {
    question: "What is NPM commonly used for?",
    options: [
      "Managing JavaScript packages",
      "Designing websites visually",
      "Creating operating systems",
      "Editing videos",
    ],
    answer: 0,
    explanation:
      "NPM is used to install and manage JavaScript packages and project dependencies.",
  },

  "Backend Security": {
    question: "What is an important goal of backend security?",
    options: [
      "Protect APIs, data and server resources",
      "Increase font size",
      "Change monitor brightness",
      "Create UI animations",
    ],
    answer: 0,
    explanation:
      "Backend security protects APIs, application data and server-side resources.",
  },
};

/* =========================================================
   FALLBACK QUEST
========================================================= */

const createFallbackQuest = (skill) => ({
  question: `Which statement best describes ${skill.name}?`,
  options: [
    skill.description,
    `${skill.name} is unrelated to software or professional development.`,
    `${skill.name} is only used for changing screen brightness.`,
    `${skill.name} completely replaces every other technology.`,
  ],
  answer: 0,
  explanation: skill.description,
});

/* =========================================================
   GET QUEST
========================================================= */

const getSkillQuest = (skill) => {
  return QUEST_BANK[skill.name] || createFallbackQuest(skill);
};

/* =========================================================
   COMPONENT
========================================================= */

function PersonalizedRoadmap() {
  const navigate = useNavigate();

  /* =======================================================
     INITIAL CAREER
  ======================================================= */

  const getInitialCareer = () => {
    const storedCareer =
      localStorage.getItem("selectedCareer") ||
      localStorage.getItem("assessmentCareer") ||
      "Full Stack Developer";

    return normalizeCareer(storedCareer);
  };

  /* =======================================================
     STATE
  ======================================================= */

  const [selectedCareer, setSelectedCareer] = useState(getInitialCareer);

  const [roadmap, setRoadmap] = useState([]);

  const [expandedPhase, setExpandedPhase] = useState(1);

  const [lastCompletedSkill, setLastCompletedSkill] = useState(null);

  /* QUEST STATE */

  const [questOpen, setQuestOpen] = useState(false);
  const [activeQuest, setActiveQuest] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questResult, setQuestResult] = useState(null);

  /* =========================================================
     LOAD CAREER ROADMAP
  ========================================================= */

  useEffect(() => {
    const career = getInitialCareer();

    setSelectedCareer(career);

    localStorage.setItem("selectedCareer", career);

    const storageKey = `pathwiseRoadmap_${career}`;
    const savedRoadmap = localStorage.getItem(storageKey);

    if (savedRoadmap) {
      try {
        const parsedRoadmap = JSON.parse(savedRoadmap);

        if (Array.isArray(parsedRoadmap) && parsedRoadmap.length > 0) {
          const prepared = prepareRoadmap(parsedRoadmap, career);

          setRoadmap(prepared);

          const firstIncomplete = prepared.find((phase) =>
            phase.skills?.some((skill) => !skill.completed),
          );

          setExpandedPhase(firstIncomplete?.id || prepared[0]?.id || 1);

          return;
        }
      } catch (error) {
        console.error("Failed to load saved roadmap:", error);

        localStorage.removeItem(storageKey);
      }
    }

    const defaultRoadmap = ROADMAPS[career] || ROADMAPS["Full Stack Developer"];

    const preparedRoadmap = prepareRoadmap(defaultRoadmap, career);

    setRoadmap(preparedRoadmap);

    const firstIncomplete = preparedRoadmap.find((phase) =>
      phase.skills?.some((skill) => !skill.completed),
    );

    setExpandedPhase(firstIncomplete?.id || preparedRoadmap[0]?.id || 1);

    localStorage.setItem(storageKey, JSON.stringify(preparedRoadmap));
  }, []);

  /* =========================================================
     SAVE ROADMAP
  ========================================================= */

  useEffect(() => {
    if (!selectedCareer || roadmap.length === 0) {
      return;
    }

    localStorage.setItem(
      `pathwiseRoadmap_${selectedCareer}`,
      JSON.stringify(roadmap),
    );
  }, [roadmap, selectedCareer]);

  /* =========================================================
     ALL SKILLS
  ========================================================= */

  const allSkills = useMemo(() => {
    return roadmap.flatMap((phase) => phase.skills || []);
  }, [roadmap]);

  /* =========================================================
     COMPLETED SKILLS
  ========================================================= */

  const completedSkills = useMemo(() => {
    return allSkills.filter((skill) => skill.completed);
  }, [allSkills]);

  /* =========================================================
     PROGRESS
  ========================================================= */

  const progress = useMemo(() => {
    if (allSkills.length === 0) {
      return 0;
    }

    return Math.round((completedSkills.length / allSkills.length) * 100);
  }, [allSkills.length, completedSkills.length]);

  /* =========================================================
     CURRENT PHASE
  ========================================================= */

  const currentPhaseIndex = useMemo(() => {
    return roadmap.findIndex((phase) =>
      phase.skills?.some((skill) => !skill.completed),
    );
  }, [roadmap]);

  /* =========================================================
     OPEN SKILL QUEST
  ========================================================= */

  const handleSkillComplete = (phaseId, skillId) => {
    const phase = roadmap.find((item) => item.id === phaseId);

    if (!phase) return;

    const skill = phase.skills.find((item) => item.id === skillId);

    if (!skill || skill.completed) return;

    const quest = getSkillQuest(skill);

    setActiveQuest({
      phaseId,
      skillId,
      skill,
      quest,
    });

    setSelectedAnswer(null);
    setQuestResult(null);
    setQuestOpen(true);
  };

  /* =========================================================
     CLOSE QUEST
  ========================================================= */

  const closeQuest = () => {
    setQuestOpen(false);
    setActiveQuest(null);
    setSelectedAnswer(null);
    setQuestResult(null);
  };

  /* =========================================================
     COMPLETE ROADMAP SKILL
  ========================================================= */

  const completeRoadmapSkill = (phaseId, skillId) => {
    if (!selectedCareer) return;

    const phase = roadmap.find((item) => item.id === phaseId);

    if (!phase) return;

    const skill = phase.skills.find((item) => item.id === skillId);

    if (!skill || skill.completed) return;

    saveSkillCompleted(selectedCareer, skill.id);

    setRoadmap((currentRoadmap) => {
      const updatedRoadmap = currentRoadmap.map((currentPhase) => {
        if (currentPhase.id !== phaseId) {
          return currentPhase;
        }

        return {
          ...currentPhase,
          skills: currentPhase.skills.map((currentSkill) => {
            if (currentSkill.id !== skillId) {
              return currentSkill;
            }

            return {
              ...currentSkill,
              completed: true,
            };
          }),
        };
      });

      localStorage.setItem(
        `pathwiseRoadmap_${selectedCareer}`,
        JSON.stringify(updatedRoadmap),
      );

      return updatedRoadmap;
    });

    /* XP */

    const XP_REWARD = 50;
    const newXP = addXP(XP_REWARD);

    /* GAMIFICATION */

    const completedCount = getTotalCompletedSkills();

    localStorage.setItem(
      "pathwiseCompletedSkillsCount",
      String(completedCount),
    );

    localStorage.setItem("pathwiseLastXPReward", String(XP_REWARD));

    localStorage.setItem("pathwiseLastCompletedSkill", skill.name);

    localStorage.setItem("pathwiseLastXPTime", String(Date.now()));

    /* LEVEL */

    const levelData = getLevelData(newXP);

    localStorage.setItem("pathwiseLevel", String(levelData.level));

    localStorage.setItem("pathwiseLevelXP", String(levelData.currentLevelXP));

    localStorage.setItem("pathwiseLevelProgress", String(levelData.progress));

    /* NOTIFICATION */

    setLastCompletedSkill({
      name: skill.name,
      xp: XP_REWARD,
      totalXP: newXP,
      level: levelData.level,
    });

    /* EVENTS */

    window.dispatchEvent(
      new CustomEvent("pathwiseXPUpdated", {
        detail: {
          xp: newXP,
          amount: XP_REWARD,
          skill: skill.name,
          level: levelData.level,
        },
      }),
    );

    window.dispatchEvent(
      new CustomEvent("pathwiseGamificationUpdated", {
        detail: {
          xp: newXP,
          level: levelData.level,
          completedSkills: completedCount,
        },
      }),
    );

    window.dispatchEvent(
      new CustomEvent("pathwiseRoadmapUpdated", {
        detail: {
          career: selectedCareer,
          skillId: skill.id,
          skill: skill.name,
          completed: true,
        },
      }),
    );

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "pathwiseXP",
        newValue: String(newXP),
        oldValue: String(newXP - XP_REWARD),
        storageArea: localStorage,
      }),
    );

    setTimeout(() => {
      closeQuest();
    }, 1200);
  };

  /* =========================================================
     SUBMIT QUEST
  ========================================================= */

  const handleQuestSubmit = () => {
    if (!activeQuest || selectedAnswer === null) {
      return;
    }

    const correct = Number(selectedAnswer) === Number(activeQuest.quest.answer);

    if (correct) {
      setQuestResult({
        correct: true,
        message: "Correct! Skill quest completed.",
      });

      completeRoadmapSkill(activeQuest.phaseId, activeQuest.skillId);
    } else {
      setQuestResult({
        correct: false,
        message: "Not quite. Review the explanation and try again.",
      });
    }
  };

  /* =========================================================
     TOGGLE PHASE
  ========================================================= */

  const togglePhase = (phaseId) => {
    setExpandedPhase((current) => (current === phaseId ? null : phaseId));
  };

  /* =========================================================
     OPEN RESOURCE
  ========================================================= */

  const openResource = (url) => {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* =========================================================
     CHANGE CAREER
  ========================================================= */

  const handleCareerChange = (career) => {
    const normalized = normalizeCareer(career);

    setSelectedCareer(normalized);

    localStorage.setItem("selectedCareer", normalized);

    const storageKey = `pathwiseRoadmap_${normalized}`;

    const savedRoadmap = localStorage.getItem(storageKey);

    if (savedRoadmap) {
      try {
        const parsedRoadmap = JSON.parse(savedRoadmap);

        if (Array.isArray(parsedRoadmap) && parsedRoadmap.length > 0) {
          const prepared = prepareRoadmap(parsedRoadmap, normalized);

          setRoadmap(prepared);

          const firstIncomplete = prepared.find((phase) =>
            phase.skills?.some((skill) => !skill.completed),
          );

          setExpandedPhase(firstIncomplete?.id || prepared[0]?.id || 1);

          return;
        }
      } catch (error) {
        console.error("Failed to load career roadmap:", error);

        localStorage.removeItem(storageKey);
      }
    }

    const defaultRoadmap =
      ROADMAPS[normalized] || ROADMAPS["Full Stack Developer"];

    const preparedRoadmap = prepareRoadmap(defaultRoadmap, normalized);

    setRoadmap(preparedRoadmap);

    const firstIncomplete = preparedRoadmap.find((phase) =>
      phase.skills?.some((skill) => !skill.completed),
    );

    setExpandedPhase(firstIncomplete?.id || preparedRoadmap[0]?.id || 1);

    localStorage.setItem(storageKey, JSON.stringify(preparedRoadmap));
  };

  /* =========================================================
     CONTINUE
  ========================================================= */

  const handleContinue = () => {
    if (currentPhaseIndex === -1) {
      return;
    }

    const phaseId = roadmap[currentPhaseIndex].id;

    setExpandedPhase(phaseId);

    setTimeout(() => {
      const phaseElement = document.querySelector(
        `[data-phase-id="${phaseId}"]`,
      );

      if (phaseElement) {
        phaseElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 150);
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (roadmap.length === 0) {
    return (
      <div className="roadmap-page">
        <div className="roadmap-loading">
          <div className="roadmap-loading-icon">🗺️</div>

          <h2>Building your roadmap...</h2>

          <p>Preparing your personalized career learning path.</p>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="roadmap-page">
      {/* TOP NAVIGATION */}

      <div className="roadmap-topbar">
        <button
          className="roadmap-back-button"
          onClick={() => navigate("/dashboard")}
          type="button"
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <button
          className="arena-button"
          onClick={() => navigate("/arena")}
          type="button"
        >
          <Trophy size={18} />
          PathWise Arena
        </button>
      </div>

      {/* HERO */}

      <section className="roadmap-hero">
        <div className="roadmap-hero-content">
          <span className="roadmap-label">PERSONALIZED CAREER ROADMAP</span>

          <h1>
            Become a <span>{selectedCareer}</span>
          </h1>

          <p>
            Follow your personalized learning path, complete skills, earn XP and
            move closer to your dream career.
          </p>

          <div className="career-selector">
            <label htmlFor="career-select">Target Career</label>

            <select
              id="career-select"
              value={selectedCareer}
              onChange={(event) => handleCareerChange(event.target.value)}
            >
              {Object.keys(ROADMAPS).map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="roadmap-hero-icon">🗺️</div>
      </section>

      {/* PROGRESS */}

      <section className="roadmap-progress-card">
        <div className="roadmap-progress-top">
          <div>
            <span className="roadmap-section-label">YOUR PROGRESS</span>

            <h2>
              {completedSkills.length} of {allSkills.length} skills completed
            </h2>

            <p>
              Keep going! Every completed skill earns you{" "}
              <strong>+50 XP</strong>.
            </p>
          </div>

          <div className="roadmap-progress-number">{progress}%</div>
        </div>

        <div className="roadmap-progress-bar">
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="roadmap-progress-bottom">
          <span>
            <CheckCircle2 size={16} />
            {completedSkills.length} completed
          </span>

          <span>
            <Target size={16} />
            {allSkills.length - completedSkills.length} remaining
          </span>
        </div>
      </section>

      {/* XP NOTIFICATION */}

      {lastCompletedSkill && (
        <div className="xp-success-message">
          <div className="xp-success-icon">
            <Zap size={22} />
          </div>

          <div>
            <strong>Skill completed! 🎉</strong>

            <p>
              {lastCompletedSkill.name} — +{lastCompletedSkill.xp} XP
            </p>

            <small>Total XP: {lastCompletedSkill.totalXP}</small>
          </div>

          <button
            onClick={() => setLastCompletedSkill(null)}
            aria-label="Close notification"
            type="button"
          >
            ×
          </button>
        </div>
      )}

      {/* ROADMAP HEADER */}

      <section className="roadmap-heading">
        <div>
          <span className="roadmap-section-label">LEARNING PATH</span>

          <h2>Your Career Journey 🚀</h2>

          <p>
            Complete each phase step by step. There are no shortcuts — just
            consistent progress.
          </p>
        </div>

        <div className="roadmap-streak">
          <Flame size={20} />
          Keep learning!
        </div>
      </section>

      {/* PHASES */}

      <section className="roadmap-phases">
        {roadmap.map((phase, phaseIndex) => {
          const phaseCompleted =
            phase.skills.length > 0 &&
            phase.skills.every((skill) => skill.completed);

          const phaseCompletedCount = phase.skills.filter(
            (skill) => skill.completed,
          ).length;

          const isExpanded = expandedPhase === phase.id;

          return (
            <div
              className={`roadmap-phase ${
                phaseCompleted ? "phase-completed" : ""
              }`}
              key={phase.id}
              data-phase-id={phase.id}
            >
              {/* PHASE HEADER */}

              <button
                className="phase-header"
                onClick={() => togglePhase(phase.id)}
                type="button"
              >
                <div className="phase-number">
                  {phaseCompleted ? <CheckCircle2 size={25} /> : phaseIndex + 1}
                </div>

                <div className="phase-header-info">
                  <span>PHASE {phaseIndex + 1}</span>

                  <h3>{phase.title}</h3>

                  <p>{phase.description}</p>
                </div>

                <div className="phase-header-right">
                  <div className="phase-meta">
                    <span>
                      <BookOpen size={15} />
                      {phase.duration}
                    </span>

                    <span>
                      {phaseCompletedCount}/{phase.skills.length}
                    </span>
                  </div>

                  {isExpanded ? (
                    <ChevronUp size={22} />
                  ) : (
                    <ChevronDown size={22} />
                  )}
                </div>
              </button>

              {/* PHASE CONTENT */}

              {isExpanded && (
                <div className="phase-content">
                  {phase.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.id}
                      className={`roadmap-skill ${
                        skill.completed ? "skill-completed" : ""
                      }`}
                    >
                      <div className="skill-number">
                        {skill.completed ? (
                          <CheckCircle2 size={21} />
                        ) : (
                          skillIndex + 1
                        )}
                      </div>

                      <div className="skill-content">
                        <div className="skill-title-row">
                          <h4>{skill.name}</h4>

                          {skill.completed && (
                            <span className="completed-tag">Completed</span>
                          )}
                        </div>

                        <p>{skill.description}</p>

                        {skill.resource && (
                          <button
                            className="resource-button"
                            onClick={() => openResource(skill.resource)}
                            type="button"
                          >
                            <PlayCircle size={16} />
                            Learn Resource
                            <ExternalLink size={14} />
                          </button>
                        )}
                      </div>

                      <div className="skill-action">
                        {skill.completed ? (
                          <button
                            className="skill-completed-button"
                            disabled
                            type="button"
                          >
                            <CheckCircle2 size={17} />
                            Completed
                          </button>
                        ) : (
                          <button
                            className="complete-skill-button"
                            onClick={() =>
                              handleSkillComplete(phase.id, skill.id)
                            }
                            type="button"
                          >
                            <Zap size={17} />
                            Skill Quest
                            <span>+50 XP</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* NEXT STEP */}

      {currentPhaseIndex !== -1 && (
        <section className="next-phase-card">
          <div className="next-phase-icon">🎯</div>

          <div className="next-phase-content">
            <span>YOUR NEXT STEP</span>

            <h2>Continue with {roadmap[currentPhaseIndex].title}</h2>

            <p>
              Complete the skills in this phase to keep progressing toward{" "}
              {selectedCareer}.
            </p>
          </div>

          <button onClick={handleContinue} type="button">
            Continue
            <ArrowRight size={18} />
          </button>
        </section>
      )}

      {/* COMPLETED ROADMAP */}

      {progress === 100 && (
        <section className="roadmap-complete-card">
          <div className="roadmap-complete-icon">🏆</div>

          <span>CAREER ROADMAP COMPLETE</span>

          <h2>You did it! 🎉</h2>

          <p>
            You've completed your <strong>{selectedCareer}</strong> roadmap.
          </p>

          <p>
            Your next step is to keep building projects and strengthening your
            portfolio.
          </p>

          <div className="roadmap-complete-actions">
            <button onClick={() => navigate("/arena")} type="button">
              <Trophy size={18} />
              View Your Badges
            </button>

            <button onClick={() => navigate("/dashboard")} type="button">
              Back to Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}

      {/* MOTIVATION */}

      <section className="roadmap-motivation">
        <div className="motivation-icon">🚀</div>

        <div>
          <span>PATHWISE MINDSET</span>

          <h2>One skill at a time. One level at a time.</h2>

          <p>
            Consistency beats motivation. Keep showing up and your future career
            will thank you.
          </p>
        </div>
      </section>

      {/* =====================================================
          SKILL QUEST MODAL
      ===================================================== */}

      {questOpen && activeQuest && (
        <div
          className="skill-quest-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeQuest();
            }
          }}
        >
          <div className="skill-quest-modal">
            {/* HEADER */}

            <div className="skill-quest-header">
              <div className="skill-quest-title-area">
                <div className="skill-quest-icon">
                  <Brain size={25} />
                </div>

                <div>
                  <span>PATHWISE SKILL QUEST</span>

                  <h2>Quick Challenge</h2>
                </div>
              </div>

              <button
                className="skill-quest-close"
                onClick={closeQuest}
                type="button"
                aria-label="Close Skill Quest"
              >
                <X size={20} />
              </button>
            </div>

            {/* SKILL BADGE */}

            <div className="skill-quest-skill">
              <Sparkles size={18} />

              <span>{activeQuest.skill.name}</span>

              <strong>+50 XP</strong>
            </div>

            {/* QUESTION */}

            <div className="skill-quest-question">
              <span>QUESTION</span>

              <h3>{activeQuest.quest.question}</h3>
            </div>

            {/* OPTIONS */}

            <div className="skill-quest-options">
              {activeQuest.quest.options.map((option, index) => {
                const isSelected = Number(selectedAnswer) === index;

                const isCorrect =
                  questResult?.correct && index === activeQuest.quest.answer;

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={questResult?.correct}
                    onClick={() => {
                      setSelectedAnswer(index);

                      if (questResult && !questResult.correct) {
                        setQuestResult(null);
                      }
                    }}
                    className={`skill-quest-option ${
                      isSelected ? "selected" : ""
                    } ${isCorrect ? "correct" : ""}`}
                  >
                    <span className="quest-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>

                    {isCorrect && <CheckCircle2 size={20} />}
                  </button>
                );
              })}
            </div>

            {/* RESULT */}

            {questResult && (
              <div
                className={`skill-quest-result ${
                  questResult.correct ? "quest-correct" : "quest-wrong"
                }`}
              >
                <div className="quest-result-icon">
                  {questResult.correct ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <RotateCcw size={24} />
                  )}
                </div>

                <div>
                  <strong>
                    {questResult.correct ? "Excellent! 🎉" : "Almost there!"}
                  </strong>

                  <p>{questResult.message}</p>

                  <small>{activeQuest.quest.explanation}</small>
                </div>
              </div>
            )}

            {/* FOOTER */}

            <div className="skill-quest-footer">
              {!questResult?.correct ? (
                <>
                  <button
                    type="button"
                    className="skill-quest-cancel"
                    onClick={closeQuest}
                  >
                    Maybe Later
                  </button>

                  <button
                    type="button"
                    className="skill-quest-submit"
                    onClick={handleQuestSubmit}
                    disabled={selectedAnswer === null}
                  >
                    Check Answer
                    <ArrowRight size={18} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="skill-quest-success-button"
                  onClick={closeQuest}
                >
                  <CheckCircle2 size={18} />
                  Skill Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalizedRoadmap;
