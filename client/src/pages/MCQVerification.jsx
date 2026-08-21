import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Trophy,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

/* =========================================================
   CAREER NORMALIZATION
========================================================= */

const normalizeCareer = (career) => {
  if (!career) {
    return "";
  }

  const normalized = String(career).trim().toLowerCase().replace(/\s+/g, " ");

  /* =======================================================
     AI / ML
  ======================================================= */

  if (
    normalized.includes("artificial intelligence") ||
    normalized.includes("machine learning") ||
    normalized.includes("ai/ml") ||
    normalized.includes("ai ml") ||
    normalized.includes("ai engineer") ||
    normalized.includes("ai / ml") ||
    normalized === "ai"
  ) {
    return "AI / ML Engineer";
  }

  /* =======================================================
     DATA SCIENTIST
  ======================================================= */

  if (
    normalized.includes("data scientist") ||
    normalized.includes("data science")
  ) {
    return "Data Scientist";
  }

  /* =======================================================
     CLOUD
  ======================================================= */

  if (normalized.includes("cloud")) {
    return "Cloud Engineer";
  }

  /* =======================================================
     CYBERSECURITY
  ======================================================= */

  if (
    normalized.includes("cybersecurity") ||
    normalized.includes("cyber security") ||
    normalized.includes("cyber")
  ) {
    return "Cybersecurity Engineer";
  }

  /* =======================================================
     DEVOPS
  ======================================================= */

  if (normalized.includes("devops") || normalized.includes("dev ops")) {
    return "DevOps Engineer";
  }

  /* =======================================================
     BACKEND
  ======================================================= */

  if (normalized.includes("backend")) {
    return "Backend Developer";
  }

  /* =======================================================
     FRONTEND
  ======================================================= */

  if (normalized.includes("frontend")) {
    return "Frontend Developer";
  }

  /* =======================================================
     FULL STACK
  ======================================================= */

  if (normalized.includes("full stack") || normalized.includes("fullstack")) {
    return "Full Stack Developer";
  }

  return career;
};

/* =========================================================
   QUESTION BANK
========================================================= */

const questionBank = {
  /* =======================================================
     AI / ML ENGINEER
  ======================================================= */

  "AI / ML Engineer": {
    Python: {
      Beginner: [
        {
          question: "Which keyword is used to define a function in Python?",
          options: ["def", "function", "func", "define"],
          answer: "def",
        },
        {
          question:
            "Which data type stores an ordered collection that can be changed?",
          options: ["Tuple", "List", "Set", "String"],
          answer: "List",
        },
      ],

      Basic: [
        {
          question: "Which Python data structure stores key-value pairs?",
          options: ["List", "Tuple", "Dictionary", "Set"],
          answer: "Dictionary",
        },
        {
          question: "What does len() return when used with a list?",
          options: [
            "The number of elements",
            "The last element",
            "The memory size",
            "The data type",
          ],
          answer: "The number of elements",
        },
      ],

      Intermediate: [
        {
          question: "What is a Python virtual environment primarily used for?",
          options: [
            "Isolating project dependencies",
            "Creating neural networks",
            "Managing IP addresses",
            "Rendering HTML",
          ],
          answer: "Isolating project dependencies",
        },
        {
          question: "What does a Python decorator commonly allow you to do?",
          options: [
            "Modify or extend function behavior",
            "Create a database",
            "Change the operating system",
            "Compile Python into CSS",
          ],
          answer: "Modify or extend function behavior",
        },
      ],

      Advanced: [
        {
          question: "What is the purpose of a generator in Python?",
          options: [
            "Produce values lazily using iteration",
            "Create database schemas",
            "Compile Python code",
            "Encrypt variables",
          ],
          answer: "Produce values lazily using iteration",
        },
        {
          question:
            "Which concept allows a subclass to provide a specialized implementation of a method?",
          options: [
            "Method overriding",
            "Variable shadowing",
            "List slicing",
            "Garbage collection",
          ],
          answer: "Method overriding",
        },
      ],
    },

    Mathematics: {
      Beginner: [
        {
          question: "What does the slope of a straight line represent?",
          options: [
            "Rate of change",
            "Average value",
            "Number of variables",
            "Data type",
          ],
          answer: "Rate of change",
        },
        {
          question: "What is a vector?",
          options: [
            "A quantity with magnitude and direction",
            "Only a single scalar number",
            "A database record",
            "A programming loop",
          ],
          answer: "A quantity with magnitude and direction",
        },
      ],

      Basic: [
        {
          question: "What does the dot product of two vectors produce?",
          options: [
            "A scalar",
            "Always another matrix",
            "A string",
            "A Boolean",
          ],
          answer: "A scalar",
        },
        {
          question: "What does a matrix represent in machine learning?",
          options: [
            "A rectangular arrangement of values",
            "Only a single number",
            "A programming function",
            "A database connection",
          ],
          answer: "A rectangular arrangement of values",
        },
      ],

      Intermediate: [
        {
          question: "What is a derivative commonly used to represent?",
          options: [
            "Rate of change",
            "Number of rows",
            "Database size",
            "Probability only",
          ],
          answer: "Rate of change",
        },
        {
          question:
            "Why are vectors and matrices important in machine learning?",
          options: [
            "They provide a mathematical representation of data and model parameters",
            "They replace programming languages",
            "They eliminate datasets",
            "They are only used for visualization",
          ],
          answer:
            "They provide a mathematical representation of data and model parameters",
        },
      ],

      Advanced: [
        {
          question: "What does the gradient of a function represent?",
          options: [
            "The direction of greatest increase",
            "The number of training samples",
            "The database schema",
            "The model's file size",
          ],
          answer: "The direction of greatest increase",
        },
        {
          question: "Why is gradient descent used in machine learning?",
          options: [
            "To minimize a loss or objective function",
            "To store training data",
            "To create database indexes",
            "To convert Python to JavaScript",
          ],
          answer: "To minimize a loss or objective function",
        },
      ],
    },

    Statistics: {
      Beginner: [
        {
          question: "What does the mean represent?",
          options: [
            "The arithmetic average",
            "The middle value only",
            "The most frequent value",
            "The largest value",
          ],
          answer: "The arithmetic average",
        },
        {
          question: "What is the median?",
          options: [
            "The middle value when data is ordered",
            "The average of all values",
            "The largest value",
            "The smallest value",
          ],
          answer: "The middle value when data is ordered",
        },
      ],

      Basic: [
        {
          question: "What does standard deviation measure?",
          options: [
            "Spread or variability of data",
            "Number of samples",
            "The largest value",
            "The database size",
          ],
          answer: "Spread or variability of data",
        },
        {
          question: "What does probability measure?",
          options: [
            "The likelihood of an event",
            "The size of a dataset",
            "The number of features",
            "The model's accuracy only",
          ],
          answer: "The likelihood of an event",
        },
      ],

      Intermediate: [
        {
          question: "What does correlation measure?",
          options: [
            "The strength and direction of association between variables",
            "The number of classes",
            "The size of a model",
            "The amount of missing data",
          ],
          answer: "The strength and direction of association between variables",
        },
        {
          question: "What is a normal distribution?",
          options: [
            "A symmetric probability distribution centered around its mean",
            "A database structure",
            "A type of neural network",
            "A programming language",
          ],
          answer:
            "A symmetric probability distribution centered around its mean",
        },
      ],

      Advanced: [
        {
          question: "What does a confidence interval estimate?",
          options: [
            "A range of plausible values for a population parameter",
            "The exact value of every observation",
            "The number of model layers",
            "The database size",
          ],
          answer: "A range of plausible values for a population parameter",
        },
        {
          question: "What is the purpose of hypothesis testing?",
          options: [
            "To evaluate evidence about a population claim",
            "To increase dataset size",
            "To train neural networks automatically",
            "To remove all outliers",
          ],
          answer: "To evaluate evidence about a population claim",
        },
      ],
    },

    "Machine Learning": {
      Beginner: [
        {
          question: "What is machine learning?",
          options: [
            "A method where systems learn patterns from data",
            "A database system",
            "A CSS framework",
            "A networking protocol",
          ],
          answer: "A method where systems learn patterns from data",
        },
        {
          question: "Which is an example of supervised learning?",
          options: [
            "Learning from labeled examples",
            "Learning without any data",
            "Deleting labels",
            "Only clustering files",
          ],
          answer: "Learning from labeled examples",
        },
      ],

      Basic: [
        {
          question: "Which task is commonly associated with classification?",
          options: [
            "Predicting discrete categories",
            "Sorting files alphabetically",
            "Compressing images",
            "Creating database tables",
          ],
          answer: "Predicting discrete categories",
        },
        {
          question: "What is regression commonly used to predict?",
          options: [
            "Continuous numerical values",
            "Only text labels",
            "Operating system commands",
            "HTML elements",
          ],
          answer: "Continuous numerical values",
        },
      ],

      Intermediate: [
        {
          question: "What is overfitting?",
          options: [
            "When a model learns training data too closely and generalizes poorly",
            "When a model has no parameters",
            "When the dataset has no labels",
            "When training never starts",
          ],
          answer:
            "When a model learns training data too closely and generalizes poorly",
        },
        {
          question: "Why is a validation set used?",
          options: [
            "To evaluate and tune a model during development",
            "To replace the training set permanently",
            "To store passwords",
            "To create database indexes",
          ],
          answer: "To evaluate and tune a model during development",
        },
      ],

      Advanced: [
        {
          question: "What is regularization used for?",
          options: [
            "Reducing overfitting by constraining model complexity",
            "Increasing duplicate records",
            "Removing the need for training data",
            "Encrypting datasets",
          ],
          answer: "Reducing overfitting by constraining model complexity",
        },
        {
          question: "What is cross-validation primarily used for?",
          options: [
            "Estimating model performance across different data splits",
            "Creating database tables",
            "Encrypting model files",
            "Generating HTML",
          ],
          answer: "Estimating model performance across different data splits",
        },
      ],
    },

    "Deep Learning": {
      Beginner: [
        {
          question: "What is deep learning primarily based on?",
          options: [
            "Neural networks with multiple layers",
            "SQL queries",
            "CSS rules",
            "Network routing",
          ],
          answer: "Neural networks with multiple layers",
        },
        {
          question: "What is a neuron in a neural network?",
          options: [
            "A computational unit that transforms inputs",
            "A database table",
            "A Python package",
            "A network cable",
          ],
          answer: "A computational unit that transforms inputs",
        },
      ],

      Basic: [
        {
          question: "What is an activation function used for?",
          options: [
            "Introducing non-linearity into a neural network",
            "Storing data permanently",
            "Creating database indexes",
            "Sending HTTP requests",
          ],
          answer: "Introducing non-linearity into a neural network",
        },
        {
          question: "What does an epoch represent during training?",
          options: [
            "One complete pass through the training dataset",
            "One model parameter",
            "One database record",
            "One HTTP request",
          ],
          answer: "One complete pass through the training dataset",
        },
      ],

      Intermediate: [
        {
          question: "What is backpropagation used for?",
          options: [
            "Computing gradients used to update neural network parameters",
            "Creating datasets",
            "Encrypting images",
            "Managing HTTP requests",
          ],
          answer:
            "Computing gradients used to update neural network parameters",
        },
        {
          question: "What problem can dropout help address?",
          options: [
            "Overfitting",
            "DNS resolution",
            "Database normalization",
            "HTTP authentication",
          ],
          answer: "Overfitting",
        },
      ],

      Advanced: [
        {
          question: "Why are GPUs useful for deep learning?",
          options: [
            "They efficiently perform highly parallel numerical computations",
            "They replace training data",
            "They automatically label datasets",
            "They eliminate neural networks",
          ],
          answer:
            "They efficiently perform highly parallel numerical computations",
        },
        {
          question: "What is vanishing gradient?",
          options: [
            "When gradients become extremely small during training",
            "When the dataset becomes empty",
            "When the GPU shuts down",
            "When an API returns 404",
          ],
          answer: "When gradients become extremely small during training",
        },
      ],
    },

    "Data Preprocessing": {
      Beginner: [
        {
          question: "Why is data preprocessing performed?",
          options: [
            "To prepare raw data for machine learning",
            "To replace the model",
            "To create APIs",
            "To deploy applications",
          ],
          answer: "To prepare raw data for machine learning",
        },
        {
          question: "What are missing values?",
          options: [
            "Data points where a value is unavailable",
            "Duplicate models",
            "Extra database tables",
            "Invalid Python syntax",
          ],
          answer: "Data points where a value is unavailable",
        },
      ],

      Basic: [
        {
          question: "What is normalization commonly used for?",
          options: [
            "Scaling values to a common range",
            "Deleting all features",
            "Encrypting data",
            "Creating labels",
          ],
          answer: "Scaling values to a common range",
        },
        {
          question: "What is one-hot encoding used for?",
          options: [
            "Representing categorical values numerically",
            "Compressing images",
            "Removing rows",
            "Creating neural networks",
          ],
          answer: "Representing categorical values numerically",
        },
      ],

      Intermediate: [
        {
          question:
            "Why should preprocessing parameters usually be learned only from training data?",
          options: [
            "To avoid data leakage",
            "To increase overfitting",
            "To remove validation data",
            "To reduce the number of classes",
          ],
          answer: "To avoid data leakage",
        },
        {
          question: "What is feature scaling?",
          options: [
            "Transforming features to comparable numerical ranges",
            "Deleting important features",
            "Creating labels",
            "Changing model architecture",
          ],
          answer: "Transforming features to comparable numerical ranges",
        },
      ],

      Advanced: [
        {
          question: "What is data leakage?",
          options: [
            "When information unavailable at prediction time influences model training",
            "When data is compressed",
            "When a database loses a row",
            "When a model has too few layers",
          ],
          answer:
            "When information unavailable at prediction time influences model training",
        },
        {
          question: "Why are preprocessing pipelines useful?",
          options: [
            "They consistently apply transformations during training and inference",
            "They eliminate the need for validation",
            "They automatically improve every model",
            "They replace feature engineering",
          ],
          answer:
            "They consistently apply transformations during training and inference",
        },
      ],
    },

    "Model Evaluation": {
      Beginner: [
        {
          question: "Why do we evaluate machine learning models?",
          options: [
            "To measure how well they perform",
            "To increase database size",
            "To create UI components",
            "To replace training",
          ],
          answer: "To measure how well they perform",
        },
        {
          question: "What does accuracy measure?",
          options: [
            "The proportion of correct predictions",
            "The number of features",
            "The training time only",
            "The database size",
          ],
          answer: "The proportion of correct predictions",
        },
      ],

      Basic: [
        {
          question: "What does precision measure?",
          options: [
            "How many predicted positives are actually positive",
            "How many negatives are correctly ignored",
            "The number of training epochs",
            "The size of the dataset",
          ],
          answer: "How many predicted positives are actually positive",
        },
        {
          question: "What does recall measure?",
          options: [
            "How many actual positives are correctly identified",
            "How many predicted positives are correct",
            "The number of model parameters",
            "The training duration",
          ],
          answer: "How many actual positives are correctly identified",
        },
      ],

      Intermediate: [
        {
          question: "What is a confusion matrix used for?",
          options: [
            "Summarizing classification predictions",
            "Scaling numerical features",
            "Creating neural networks",
            "Managing databases",
          ],
          answer: "Summarizing classification predictions",
        },
        {
          question: "Why can accuracy be misleading for imbalanced datasets?",
          options: [
            "A dominant class can make accuracy look high even when minority predictions are poor",
            "Accuracy cannot be calculated",
            "Accuracy always equals recall",
            "Accuracy only works for regression",
          ],
          answer:
            "A dominant class can make accuracy look high even when minority predictions are poor",
        },
      ],

      Advanced: [
        {
          question: "What does ROC-AUC generally measure?",
          options: [
            "A classifier's ability to distinguish between classes across thresholds",
            "The number of neural network layers",
            "Database performance",
            "Training dataset size",
          ],
          answer:
            "A classifier's ability to distinguish between classes across thresholds",
        },
        {
          question: "What is the purpose of a test set?",
          options: [
            "To provide an unbiased final estimate of model performance",
            "To tune every hyperparameter",
            "To replace the training set",
            "To normalize all features",
          ],
          answer: "To provide an unbiased final estimate of model performance",
        },
      ],
    },

    "TensorFlow / PyTorch": {
      Beginner: [
        {
          question: "What are TensorFlow and PyTorch primarily used for?",
          options: [
            "Building and training machine learning models",
            "Managing SQL databases",
            "Creating HTML pages",
            "Configuring DNS",
          ],
          answer: "Building and training machine learning models",
        },
        {
          question: "What is a tensor?",
          options: [
            "A multidimensional numerical data structure",
            "A database table",
            "An HTTP request",
            "A CSS property",
          ],
          answer: "A multidimensional numerical data structure",
        },
      ],

      Basic: [
        {
          question: "What does automatic differentiation help compute?",
          options: [
            "Gradients",
            "Database indexes",
            "HTML elements",
            "IP addresses",
          ],
          answer: "Gradients",
        },
        {
          question: "What is a model optimizer used for?",
          options: [
            "Updating model parameters based on gradients",
            "Creating datasets",
            "Rendering web pages",
            "Managing user accounts",
          ],
          answer: "Updating model parameters based on gradients",
        },
      ],

      Intermediate: [
        {
          question: "What is a DataLoader commonly used for?",
          options: [
            "Efficiently batching and iterating over training data",
            "Creating databases",
            "Deploying APIs",
            "Encrypting files",
          ],
          answer: "Efficiently batching and iterating over training data",
        },
        {
          question: "Why are batches used during neural network training?",
          options: [
            "To process manageable groups of samples during optimization",
            "To remove all training data",
            "To avoid calculating gradients",
            "To replace the model",
          ],
          answer: "To process manageable groups of samples during optimization",
        },
      ],

      Advanced: [
        {
          question: "What is transfer learning?",
          options: [
            "Using knowledge from a pretrained model for a related task",
            "Moving a database to another server",
            "Changing Python to JavaScript",
            "Deleting pretrained weights",
          ],
          answer: "Using knowledge from a pretrained model for a related task",
        },
        {
          question:
            "Why is model evaluation important after training a neural network?",
          options: [
            "To determine whether it generalizes well to unseen data",
            "To increase the number of layers automatically",
            "To remove all training data",
            "To change HTML structure",
          ],
          answer: "To determine whether it generalizes well to unseen data",
        },
      ],
    },
  },

  /* =======================================================
     FULL STACK DEVELOPER
  ======================================================= */

  "Full Stack Developer": {
    "HTML & CSS": {
      Beginner: [
        {
          question: "Which HTML tag is used to create a hyperlink?",
          options: ["<link>", "<a>", "<href>", "<url>"],
          answer: "<a>",
        },
        {
          question: "Which CSS property changes the text color?",
          options: ["font-color", "text-color", "color", "foreground"],
          answer: "color",
        },
      ],

      Basic: [
        {
          question:
            "Which CSS layout system is designed primarily for one-dimensional layouts?",
          options: ["Grid", "Flexbox", "Float", "Position"],
          answer: "Flexbox",
        },
        {
          question: "What does the CSS box-sizing property control?",
          options: [
            "How width and height are calculated",
            "Font size",
            "Element visibility",
            "Animation speed",
          ],
          answer: "How width and height are calculated",
        },
      ],

      Intermediate: [
        {
          question: "What is the main advantage of CSS Grid over Flexbox?",
          options: [
            "Grid is designed for two-dimensional layouts",
            "Grid cannot create responsive layouts",
            "Grid only works with text",
            "Grid replaces HTML",
          ],
          answer: "Grid is designed for two-dimensional layouts",
        },
        {
          question: "What does CSS specificity determine?",
          options: [
            "Which CSS rule takes precedence",
            "How quickly CSS loads",
            "The number of HTML elements",
            "The browser version",
          ],
          answer: "Which CSS rule takes precedence",
        },
      ],

      Advanced: [
        {
          question: "Which selector generally has higher specificity?",
          options: [
            "Element selector",
            "Class selector",
            "ID selector",
            "Universal selector",
          ],
          answer: "ID selector",
        },
        {
          question:
            "Which CSS feature is most appropriate for responsive design rules?",
          options: [
            "Media queries",
            "HTML comments",
            "Local storage",
            "DOM events",
          ],
          answer: "Media queries",
        },
      ],
    },

    JavaScript: {
      Beginner: [
        {
          question: "Which keyword declares a block-scoped variable?",
          options: ["var", "let", "define", "variable"],
          answer: "let",
        },
        {
          question: "Which symbol is used for strict equality?",
          options: ["=", "==", "===", "!="],
          answer: "===",
        },
      ],

      Basic: [
        {
          question: "What does Array.map() return?",
          options: ["A new array", "A boolean", "A string only", "Nothing"],
          answer: "A new array",
        },
        {
          question: "What does JSON.parse() do?",
          options: [
            "Converts JSON string into JavaScript data",
            "Converts JavaScript into CSS",
            "Deletes JSON",
            "Encrypts JSON",
          ],
          answer: "Converts JSON string into JavaScript data",
        },
      ],

      Intermediate: [
        {
          question: "What is a closure in JavaScript?",
          options: [
            "A function retaining access to its lexical scope",
            "A loop",
            "A class constructor",
            "A DOM element",
          ],
          answer: "A function retaining access to its lexical scope",
        },
        {
          question: "What does async/await help simplify?",
          options: [
            "Asynchronous code",
            "CSS styling",
            "HTML parsing",
            "Database schema creation",
          ],
          answer: "Asynchronous code",
        },
      ],

      Advanced: [
        {
          question: "What is the JavaScript event loop responsible for?",
          options: [
            "Managing asynchronous callback execution",
            "Compiling CSS",
            "Creating HTML",
            "Encrypting variables",
          ],
          answer: "Managing asynchronous callback execution",
        },
        {
          question:
            "Which mechanism allows JavaScript objects to inherit properties?",
          options: [
            "Prototype chain",
            "HTML inheritance",
            "CSS cascade",
            "JSON parsing",
          ],
          answer: "Prototype chain",
        },
      ],
    },

    React: {
      Beginner: [
        {
          question: "What is React primarily used for?",
          options: [
            "Building user interfaces",
            "Managing databases",
            "Operating systems",
            "Writing SQL queries",
          ],
          answer: "Building user interfaces",
        },
        {
          question: "Which syntax is commonly used to write UI in React?",
          options: ["JSX", "SQL", "XML only", "PHP"],
          answer: "JSX",
        },
      ],

      Basic: [
        {
          question: "Which hook is commonly used to manage component state?",
          options: ["useState", "useRoute", "useCSS", "useHTML"],
          answer: "useState",
        },
        {
          question:
            "What prop is commonly used to uniquely identify list items?",
          options: ["id", "key", "indexOnly", "unique"],
          answer: "key",
        },
      ],

      Intermediate: [
        {
          question: "What is the purpose of useEffect?",
          options: [
            "Handle side effects",
            "Create CSS",
            "Replace JSX",
            "Create databases",
          ],
          answer: "Handle side effects",
        },
        {
          question: "Why should React state usually be treated as immutable?",
          options: [
            "To allow React to detect updates predictably",
            "Because JavaScript does not support mutation",
            "Because arrays cannot change",
            "Because JSX forbids objects",
          ],
          answer: "To allow React to detect updates predictably",
        },
      ],

      Advanced: [
        {
          question: "What problem can React.memo help reduce?",
          options: [
            "Unnecessary component re-renders",
            "Database corruption",
            "HTTP errors",
            "CSS specificity",
          ],
          answer: "Unnecessary component re-renders",
        },
        {
          question:
            "What is the main purpose of React's reconciliation process?",
          options: [
            "Determine efficient UI updates",
            "Connect directly to MongoDB",
            "Compile JavaScript",
            "Create REST APIs",
          ],
          answer: "Determine efficient UI updates",
        },
      ],
    },

    "Node.js": {
      Beginner: [
        {
          question: "What is Node.js?",
          options: [
            "A JavaScript runtime",
            "A database",
            "A CSS framework",
            "A browser",
          ],
          answer: "A JavaScript runtime",
        },
      ],

      Basic: [
        {
          question: "Which package manager is commonly used with Node.js?",
          options: ["npm", "pip", "gem", "cargo"],
          answer: "npm",
        },
      ],

      Intermediate: [
        {
          question: "What architecture does Node.js commonly use for I/O?",
          options: [
            "Event-driven architecture",
            "Only synchronous execution",
            "Multi-page rendering",
            "CSS-driven architecture",
          ],
          answer: "Event-driven architecture",
        },
      ],

      Advanced: [
        {
          question: "What is the Node.js event loop primarily used for?",
          options: [
            "Handling asynchronous operations",
            "Rendering CSS",
            "Creating HTML",
            "Managing SQL schemas",
          ],
          answer: "Handling asynchronous operations",
        },
      ],
    },

    "REST APIs": {
      Beginner: [
        {
          question: "What does API stand for?",
          options: [
            "Application Programming Interface",
            "Application Processing Internet",
            "Advanced Programming Input",
            "Automated Program Interface",
          ],
          answer: "Application Programming Interface",
        },
      ],

      Basic: [
        {
          question: "Which HTTP method is generally used to retrieve data?",
          options: ["GET", "POST", "DELETE", "PATCH"],
          answer: "GET",
        },
      ],

      Intermediate: [
        {
          question: "What does HTTP status code 404 generally indicate?",
          options: [
            "Resource not found",
            "Successful request",
            "Server started",
            "Authentication successful",
          ],
          answer: "Resource not found",
        },
      ],

      Advanced: [
        {
          question: "Which principle is important in RESTful API design?",
          options: [
            "Stateless communication",
            "Server-side UI rendering only",
            "Mandatory WebSockets",
            "Database coupling",
          ],
          answer: "Stateless communication",
        },
      ],
    },

    MongoDB: {
      Beginner: [
        {
          question: "MongoDB is primarily what type of database?",
          options: [
            "Document database",
            "Relational database",
            "Graph-only database",
            "Spreadsheet database",
          ],
          answer: "Document database",
        },
      ],

      Basic: [
        {
          question: "MongoDB stores records primarily as what?",
          options: ["BSON documents", "CSV files", "HTML files", "CSS objects"],
          answer: "BSON documents",
        },
      ],

      Intermediate: [
        {
          question:
            "What is a MongoDB collection similar to in a relational database?",
          options: ["Table", "Column", "Row", "Index only"],
          answer: "Table",
        },
      ],

      Advanced: [
        {
          question: "Why are indexes used in MongoDB?",
          options: [
            "To improve query performance",
            "To replace documents",
            "To encrypt passwords automatically",
            "To create APIs",
          ],
          answer: "To improve query performance",
        },
      ],
    },

    "Git & GitHub": {
      Beginner: [
        {
          question: "Which command initializes a Git repository?",
          options: ["git init", "git start", "git create", "git repo"],
          answer: "git init",
        },
      ],

      Basic: [
        {
          question: "Which command creates a commit?",
          options: ["git commit", "git save", "git push", "git upload"],
          answer: "git commit",
        },
      ],

      Intermediate: [
        {
          question: "What is a Git branch primarily used for?",
          options: [
            "Developing separate lines of work",
            "Deleting repositories",
            "Installing packages",
            "Creating databases",
          ],
          answer: "Developing separate lines of work",
        },
      ],

      Advanced: [
        {
          question: "What is the purpose of git rebase?",
          options: [
            "Reapply commits onto another base",
            "Delete GitHub",
            "Install Git",
            "Create a remote repository",
          ],
          answer: "Reapply commits onto another base",
        },
      ],
    },

    "Problem Solving": {
      Beginner: [
        {
          question: "What is an algorithm?",
          options: [
            "A step-by-step procedure to solve a problem",
            "A programming language",
            "A database",
            "A compiler",
          ],
          answer: "A step-by-step procedure to solve a problem",
        },
      ],

      Basic: [
        {
          question: "Which data structure follows FIFO?",
          options: ["Queue", "Stack", "Tree", "Graph"],
          answer: "Queue",
        },
      ],

      Intermediate: [
        {
          question: "What is the average time complexity of binary search?",
          options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
          answer: "O(log n)",
        },
      ],

      Advanced: [
        {
          question: "What is the typical time complexity of merge sort?",
          options: ["O(n log n)", "O(n²)", "O(log n)", "O(1)"],
          answer: "O(n log n)",
        },
      ],
    },
  },

  /* =======================================================
     FRONTEND DEVELOPER
  ======================================================= */

  "Frontend Developer": {
    "HTML & CSS": {
      Beginner: [
        {
          question: "Which HTML element represents the main heading?",
          options: ["<h1>", "<head>", "<title>", "<main>"],
          answer: "<h1>",
        },
      ],

      Basic: [
        {
          question: "Which CSS layout system is one-dimensional?",
          options: ["Flexbox", "Grid", "Float", "Table"],
          answer: "Flexbox",
        },
      ],

      Intermediate: [
        {
          question: "What is CSS Grid best suited for?",
          options: [
            "Two-dimensional layouts",
            "Database queries",
            "API authentication",
            "JavaScript execution",
          ],
          answer: "Two-dimensional layouts",
        },
      ],

      Advanced: [
        {
          question:
            "What determines which CSS rule wins when declarations conflict?",
          options: [
            "Cascade and specificity",
            "HTML file size",
            "JavaScript version",
            "Browser history",
          ],
          answer: "Cascade and specificity",
        },
      ],
    },

    JavaScript: {
      Beginner: [
        {
          question: "Which keyword creates a block-scoped variable?",
          options: ["let", "var", "define", "newvar"],
          answer: "let",
        },
      ],

      Basic: [
        {
          question: "What does Array.map() return?",
          options: ["A new array", "A string", "A boolean", "Nothing"],
          answer: "A new array",
        },
      ],

      Intermediate: [
        {
          question: "What is a closure?",
          options: [
            "A function retaining access to its lexical scope",
            "A CSS class",
            "An HTML element",
            "A database query",
          ],
          answer: "A function retaining access to its lexical scope",
        },
      ],

      Advanced: [
        {
          question: "What does the event loop manage?",
          options: [
            "Asynchronous JavaScript execution",
            "CSS compilation",
            "Database indexing",
            "HTML styling",
          ],
          answer: "Asynchronous JavaScript execution",
        },
      ],
    },

    React: {
      Beginner: [
        {
          question: "What is React used for?",
          options: [
            "Building user interfaces",
            "Managing servers",
            "Writing SQL",
            "Operating systems",
          ],
          answer: "Building user interfaces",
        },
      ],

      Basic: [
        {
          question: "Which hook manages state?",
          options: ["useState", "useRoute", "useStyle", "useHTML"],
          answer: "useState",
        },
      ],

      Intermediate: [
        {
          question: "What is useEffect commonly used for?",
          options: [
            "Side effects",
            "Creating CSS",
            "Database tables",
            "Compiling JSX",
          ],
          answer: "Side effects",
        },
      ],

      Advanced: [
        {
          question: "What can React.memo help prevent?",
          options: [
            "Unnecessary renders",
            "Network attacks",
            "Database failures",
            "CSS loading",
          ],
          answer: "Unnecessary renders",
        },
      ],
    },

    "API Integration": {
      Beginner: [
        {
          question: "What does API stand for?",
          options: [
            "Application Programming Interface",
            "Application Process Internet",
            "Advanced Programming Interface",
            "Automated Program Input",
          ],
          answer: "Application Programming Interface",
        },
      ],

      Basic: [
        {
          question: "Which HTTP method normally retrieves data?",
          options: ["GET", "POST", "DELETE", "PATCH"],
          answer: "GET",
        },
      ],

      Intermediate: [
        {
          question: "Which format is commonly used for API data exchange?",
          options: ["JSON", "CSS", "PNG", "MP3"],
          answer: "JSON",
        },
      ],

      Advanced: [
        {
          question: "Why should frontend applications handle API errors?",
          options: [
            "To provide reliable user feedback and recovery",
            "To increase CSS specificity",
            "To replace authentication",
            "To remove HTTP",
          ],
          answer: "To provide reliable user feedback and recovery",
        },
      ],
    },
  },

  /* =======================================================
     BACKEND DEVELOPER
  ======================================================= */

  "Backend Developer": {
    JavaScript: {
      Beginner: [
        {
          question: "Which keyword declares a block-scoped variable?",
          options: ["let", "var", "define", "variable"],
          answer: "let",
        },
      ],

      Basic: [
        {
          question: "What does JSON.parse() do?",
          options: [
            "Converts JSON text into JavaScript data",
            "Encrypts JSON",
            "Deletes JSON",
            "Converts JSON to CSS",
          ],
          answer: "Converts JSON text into JavaScript data",
        },
      ],

      Intermediate: [
        {
          question: "What does async/await help manage?",
          options: [
            "Asynchronous operations",
            "CSS styling",
            "HTML structure",
            "Database schemas only",
          ],
          answer: "Asynchronous operations",
        },
      ],

      Advanced: [
        {
          question: "What is the event loop responsible for?",
          options: [
            "Managing asynchronous execution",
            "Rendering CSS",
            "Creating SQL tables",
            "Encrypting files",
          ],
          answer: "Managing asynchronous execution",
        },
      ],
    },

    "Node.js": {
      Beginner: [
        {
          question: "What is Node.js?",
          options: [
            "A JavaScript runtime",
            "A database",
            "A CSS framework",
            "A browser",
          ],
          answer: "A JavaScript runtime",
        },
      ],

      Basic: [
        {
          question: "Which package manager is commonly used with Node.js?",
          options: ["npm", "pip", "gem", "cargo"],
          answer: "npm",
        },
      ],

      Intermediate: [
        {
          question: "What architecture does Node.js commonly use?",
          options: [
            "Event-driven architecture",
            "CSS-driven architecture",
            "Document-driven architecture",
            "Only synchronous execution",
          ],
          answer: "Event-driven architecture",
        },
      ],

      Advanced: [
        {
          question: "Why is Node.js suitable for I/O-heavy applications?",
          options: [
            "Its event-driven asynchronous model",
            "It only supports synchronous code",
            "It removes databases",
            "It requires one process per request",
          ],
          answer: "Its event-driven asynchronous model",
        },
      ],
    },

    "REST APIs": {
      Beginner: [
        {
          question: "Which HTTP method retrieves data?",
          options: ["GET", "POST", "PUT", "DELETE"],
          answer: "GET",
        },
      ],

      Basic: [
        {
          question:
            "Which status code usually represents a successful request?",
          options: ["200", "404", "500", "401"],
          answer: "200",
        },
      ],

      Intermediate: [
        {
          question: "What does stateless mean in REST?",
          options: [
            "Each request contains the information needed to process it",
            "The server never stores any data",
            "Requests cannot contain authentication",
            "Only GET requests are allowed",
          ],
          answer: "Each request contains the information needed to process it",
        },
      ],

      Advanced: [
        {
          question: "Which HTTP method is generally idempotent?",
          options: ["PUT", "POST", "CONNECT", "PATCH"],
          answer: "PUT",
        },
      ],
    },

    Databases: {
      Beginner: [
        {
          question: "What is a database used for?",
          options: [
            "Storing and managing data",
            "Styling websites",
            "Rendering images",
            "Compiling code",
          ],
          answer: "Storing and managing data",
        },
      ],

      Basic: [
        {
          question: "Which database type organizes data into tables?",
          options: [
            "Relational database",
            "Document database",
            "Graph database only",
            "File system",
          ],
          answer: "Relational database",
        },
      ],

      Intermediate: [
        {
          question: "Why are database indexes used?",
          options: [
            "To improve query performance",
            "To replace tables",
            "To encrypt every field",
            "To create APIs",
          ],
          answer: "To improve query performance",
        },
      ],

      Advanced: [
        {
          question: "What is normalization primarily used for?",
          options: [
            "Reducing unnecessary data redundancy",
            "Increasing duplicate data",
            "Encrypting databases",
            "Creating APIs",
          ],
          answer: "Reducing unnecessary data redundancy",
        },
      ],
    },

    "Authentication & Security": {
      Beginner: [
        {
          question: "What is authentication?",
          options: [
            "Verifying identity",
            "Assigning permissions",
            "Encrypting every file",
            "Creating a database",
          ],
          answer: "Verifying identity",
        },
      ],

      Basic: [
        {
          question: "What is authorization?",
          options: [
            "Determining what an authenticated user can access",
            "Verifying a password only",
            "Encrypting traffic",
            "Creating an account",
          ],
          answer: "Determining what an authenticated user can access",
        },
      ],

      Intermediate: [
        {
          question: "Why should passwords be hashed?",
          options: [
            "To avoid storing passwords in plain text",
            "To make passwords visible",
            "To increase database size",
            "To disable authentication",
          ],
          answer: "To avoid storing passwords in plain text",
        },
      ],

      Advanced: [
        {
          question: "What does JWT commonly provide?",
          options: [
            "A signed token representation of claims",
            "Database encryption automatically",
            "A replacement for HTTPS",
            "A SQL database",
          ],
          answer: "A signed token representation of claims",
        },
      ],
    },
  },

  /* =======================================================
     CLOUD ENGINEER
  ======================================================= */

  "Cloud Engineer": {
    Python: {
      Beginner: [
        {
          question: "Which keyword defines a function in Python?",
          options: ["def", "function", "func", "define"],
          answer: "def",
        },
      ],

      Basic: [
        {
          question: "Which data structure stores key-value pairs?",
          options: ["Dictionary", "List", "Tuple", "Set"],
          answer: "Dictionary",
        },
      ],

      Intermediate: [
        {
          question: "What does a Python virtual environment provide?",
          options: [
            "An isolated package environment",
            "A cloud server",
            "A database",
            "A network firewall",
          ],
          answer: "An isolated package environment",
        },
      ],

      Advanced: [
        {
          question: "What is a Python decorator commonly used for?",
          options: [
            "Modifying or extending function behavior",
            "Creating databases",
            "Managing IP addresses",
            "Compiling Linux kernels",
          ],
          answer: "Modifying or extending function behavior",
        },
      ],
    },

    Linux: {
      Beginner: [
        {
          question: "Which command lists files in Linux?",
          options: ["ls", "show", "files", "list"],
          answer: "ls",
        },
      ],

      Basic: [
        {
          question: "Which command changes directories?",
          options: ["cd", "move", "dir", "change"],
          answer: "cd",
        },
      ],

      Intermediate: [
        {
          question: "What does chmod modify?",
          options: [
            "File permissions",
            "File contents",
            "Network routes",
            "DNS records",
          ],
          answer: "File permissions",
        },
      ],

      Advanced: [
        {
          question: "What is systemd primarily used for?",
          options: [
            "Managing system services",
            "Managing HTML",
            "Creating databases",
            "Encrypting passwords",
          ],
          answer: "Managing system services",
        },
      ],
    },

    Networking: {
      Beginner: [
        {
          question: "Which device connects different networks?",
          options: ["Router", "Switch", "Monitor", "Keyboard"],
          answer: "Router",
        },
      ],

      Basic: [
        {
          question: "What does DNS translate?",
          options: [
            "Domain names to IP addresses",
            "Passwords to hashes",
            "Files to folders",
            "Ports to users",
          ],
          answer: "Domain names to IP addresses",
        },
      ],

      Intermediate: [
        {
          question: "Which protocol is connection-oriented?",
          options: ["TCP", "UDP", "ARP", "ICMP"],
          answer: "TCP",
        },
      ],

      Advanced: [
        {
          question: "What is CIDR used to represent?",
          options: [
            "IP network prefixes",
            "Passwords",
            "Database indexes",
            "Container images",
          ],
          answer: "IP network prefixes",
        },
      ],
    },

    "Cloud Platforms": {
      Beginner: [
        {
          question: "What is cloud computing?",
          options: [
            "On-demand computing resources over a network",
            "A programming language",
            "A database format",
            "A local text editor",
          ],
          answer: "On-demand computing resources over a network",
        },
      ],

      Basic: [
        {
          question: "Which is an example of a cloud provider?",
          options: ["AWS", "Git", "HTML", "Linux"],
          answer: "AWS",
        },
      ],

      Intermediate: [
        {
          question: "What is auto-scaling used for?",
          options: [
            "Adjusting resources based on demand",
            "Encrypting passwords",
            "Creating Git commits",
            "Writing SQL queries",
          ],
          answer: "Adjusting resources based on demand",
        },
      ],

      Advanced: [
        {
          question: "What does Infrastructure as Code enable?",
          options: [
            "Defining infrastructure through configuration/code",
            "Replacing all monitoring",
            "Writing HTML",
            "Creating passwords automatically",
          ],
          answer: "Defining infrastructure through configuration/code",
        },
      ],
    },

    Docker: {
      Beginner: [
        {
          question: "What is Docker primarily used for?",
          options: [
            "Containerizing applications",
            "Creating databases",
            "Designing websites",
            "Managing Git branches",
          ],
          answer: "Containerizing applications",
        },
      ],

      Basic: [
        {
          question: "What is a Docker image?",
          options: [
            "A template used to create containers",
            "A running server",
            "A database table",
            "A network cable",
          ],
          answer: "A template used to create containers",
        },
      ],

      Intermediate: [
        {
          question:
            "What is the main difference between an image and a container?",
          options: [
            "An image is a template; a container is a running instance",
            "They are always identical",
            "A container is a database",
            "An image is a network",
          ],
          answer: "An image is a template; a container is a running instance",
        },
      ],

      Advanced: [
        {
          question: "Why are multi-stage Docker builds useful?",
          options: [
            "They can produce smaller production images",
            "They eliminate networking",
            "They replace Kubernetes",
            "They disable caching",
          ],
          answer: "They can produce smaller production images",
        },
      ],
    },

    Kubernetes: {
      Beginner: [
        {
          question: "What is Kubernetes?",
          options: [
            "A container orchestration platform",
            "A database",
            "A programming language",
            "A code editor",
          ],
          answer: "A container orchestration platform",
        },
      ],

      Basic: [
        {
          question: "What is a Kubernetes Pod?",
          options: [
            "The smallest deployable unit in Kubernetes",
            "A database table",
            "A cloud provider",
            "A Git branch",
          ],
          answer: "The smallest deployable unit in Kubernetes",
        },
      ],

      Intermediate: [
        {
          question: "What does a Kubernetes Deployment manage?",
          options: [
            "Desired application replicas and updates",
            "DNS domains only",
            "Git commits",
            "Database passwords",
          ],
          answer: "Desired application replicas and updates",
        },
      ],

      Advanced: [
        {
          question: "What does Kubernetes self-healing commonly involve?",
          options: [
            "Replacing failed containers or pods",
            "Deleting all applications",
            "Disabling networking",
            "Changing source code",
          ],
          answer: "Replacing failed containers or pods",
        },
      ],
    },

    "CI/CD & DevOps": {
      Beginner: [
        {
          question: "What does CI stand for?",
          options: [
            "Continuous Integration",
            "Cloud Installation",
            "Code Inspection",
            "Container Interface",
          ],
          answer: "Continuous Integration",
        },
      ],

      Basic: [
        {
          question: "What is the purpose of a CI pipeline?",
          options: [
            "Automate build and test processes",
            "Replace databases",
            "Create HTML",
            "Manage passwords",
          ],
          answer: "Automate build and test processes",
        },
      ],

      Intermediate: [
        {
          question: "What is continuous delivery intended to achieve?",
          options: [
            "Keep software ready for reliable release",
            "Prevent all deployments",
            "Disable testing",
            "Remove version control",
          ],
          answer: "Keep software ready for reliable release",
        },
      ],

      Advanced: [
        {
          question:
            "What is a deployment strategy that gradually shifts traffic?",
          options: [
            "Canary deployment",
            "Static deployment",
            "Manual deployment",
            "Local deployment",
          ],
          answer: "Canary deployment",
        },
      ],
    },
  },

  /* =======================================================
     CYBERSECURITY ENGINEER
  ======================================================= */

  "Cybersecurity Engineer": {
    Networking: {
      Beginner: [
        {
          question: "What does IP stand for in computer networking?",
          options: [
            "Internet Protocol",
            "Internal Program",
            "Internet Process",
            "Interface Protocol",
          ],
          answer: "Internet Protocol",
        },
      ],

      Basic: [
        {
          question:
            "Which protocol is commonly used to securely browse websites?",
          options: ["HTTPS", "FTP", "HTTP", "Telnet"],
          answer: "HTTPS",
        },
      ],

      Intermediate: [
        {
          question: "Which protocol is connection-oriented?",
          options: ["TCP", "UDP", "ICMP", "ARP"],
          answer: "TCP",
        },
      ],

      Advanced: [
        {
          question: "What is a VLAN primarily used for?",
          options: [
            "Logical network segmentation",
            "Password hashing",
            "File compression",
            "Malware removal",
          ],
          answer: "Logical network segmentation",
        },
      ],
    },

    Linux: {
      Beginner: [
        {
          question: "Which command lists files in a Linux directory?",
          options: ["ls", "show", "dirfile", "listall"],
          answer: "ls",
        },
      ],

      Basic: [
        {
          question: "Which command changes file permissions in Linux?",
          options: ["chmod", "chperm", "permission", "setfile"],
          answer: "chmod",
        },
      ],

      Intermediate: [
        {
          question: "What does sudo allow a user to do?",
          options: [
            "Execute commands with elevated privileges",
            "Delete the operating system",
            "Encrypt every file",
            "Disable networking",
          ],
          answer: "Execute commands with elevated privileges",
        },
      ],

      Advanced: [
        {
          question: "What does least privilege mean?",
          options: [
            "Give users only the permissions they need",
            "Give everyone administrator access",
            "Disable authentication",
            "Use the same password everywhere",
          ],
          answer: "Give users only the permissions they need",
        },
      ],
    },

    "Cybersecurity Fundamentals": {
      Beginner: [
        {
          question: "What does the CIA triad stand for?",
          options: [
            "Confidentiality, Integrity, Availability",
            "Control, Internet, Access",
            "Cybersecurity, Identity, Authentication",
            "Confidentiality, Internet, Authorization",
          ],
          answer: "Confidentiality, Integrity, Availability",
        },
      ],

      Basic: [
        {
          question: "What is phishing?",
          options: [
            "A social engineering attack designed to deceive users",
            "A network routing protocol",
            "A database backup",
            "A file compression method",
          ],
          answer: "A social engineering attack designed to deceive users",
        },
      ],

      Intermediate: [
        {
          question:
            "What is the main difference between a threat and a vulnerability?",
          options: [
            "A vulnerability is a weakness that can be exploited",
            "A threat is always a software bug",
            "A vulnerability is always an attacker",
            "There is no difference",
          ],
          answer: "A vulnerability is a weakness that can be exploited",
        },
      ],

      Advanced: [
        {
          question: "What is threat modeling primarily used for?",
          options: [
            "Identifying and evaluating potential security threats",
            "Optimizing CSS",
            "Creating database tables",
            "Compressing network traffic",
          ],
          answer: "Identifying and evaluating potential security threats",
        },
      ],
    },

    Cryptography: {
      Beginner: [
        {
          question: "What is encryption primarily used for?",
          options: [
            "Protecting information from unauthorized access",
            "Increasing CPU speed",
            "Deleting files",
            "Creating IP addresses",
          ],
          answer: "Protecting information from unauthorized access",
        },
      ],

      Basic: [
        {
          question:
            "Which encryption type uses the same key for encryption and decryption?",
          options: [
            "Symmetric encryption",
            "Asymmetric encryption",
            "Hashing",
            "Encoding",
          ],
          answer: "Symmetric encryption",
        },
      ],

      Intermediate: [
        {
          question: "What is asymmetric cryptography based on?",
          options: [
            "A public and private key pair",
            "One shared password only",
            "No keys",
            "A database table",
          ],
          answer: "A public and private key pair",
        },
      ],

      Advanced: [
        {
          question: "What is a digital signature primarily used to provide?",
          options: [
            "Authenticity and integrity",
            "Compression",
            "Faster networking",
            "Database indexing",
          ],
          answer: "Authenticity and integrity",
        },
      ],
    },

    "Security Tools": {
      Beginner: [
        {
          question: "What is Nmap commonly used for?",
          options: [
            "Network discovery and port scanning",
            "Video editing",
            "Database migration",
            "Password storage",
          ],
          answer: "Network discovery and port scanning",
        },
      ],

      Basic: [
        {
          question: "What is a vulnerability scanner used to identify?",
          options: [
            "Potential security weaknesses",
            "Programming syntax errors only",
            "Image dimensions",
            "Database records",
          ],
          answer: "Potential security weaknesses",
        },
      ],

      Intermediate: [
        {
          question: "What is the main purpose of an IDS?",
          options: [
            "Detect suspicious or malicious activity",
            "Encrypt every network packet",
            "Replace authentication",
            "Manage source code",
          ],
          answer: "Detect suspicious or malicious activity",
        },
      ],

      Advanced: [
        {
          question: "Why is centralized security logging valuable?",
          options: [
            "It enables correlation and investigation across systems",
            "It eliminates all vulnerabilities",
            "It replaces firewalls",
            "It prevents every attack",
          ],
          answer: "It enables correlation and investigation across systems",
        },
      ],
    },

    "Web Security": {
      Beginner: [
        {
          question: "What is SQL injection?",
          options: [
            "Injecting malicious SQL through application input",
            "Encrypting SQL databases",
            "Creating a database backup",
            "Compressing HTTP requests",
          ],
          answer: "Injecting malicious SQL through application input",
        },
      ],

      Basic: [
        {
          question: "What is XSS?",
          options: [
            "Cross-Site Scripting",
            "Cross-System Security",
            "XML Secure Service",
            "Extended Server Security",
          ],
          answer: "Cross-Site Scripting",
        },
      ],

      Intermediate: [
        {
          question: "Which practice helps prevent SQL injection?",
          options: [
            "Parameterized queries",
            "Using longer HTML tags",
            "Disabling CSS",
            "Using GET for everything",
          ],
          answer: "Parameterized queries",
        },
      ],

      Advanced: [
        {
          question: "What does Content Security Policy help mitigate?",
          options: [
            "Certain classes of content injection attacks such as XSS",
            "Hard drive failure",
            "CPU overheating",
            "Git merge conflicts",
          ],
          answer: "Certain classes of content injection attacks such as XSS",
        },
      ],
    },

    "Incident Response": {
      Beginner: [
        {
          question: "What is incident response?",
          options: [
            "A process for handling security incidents",
            "A database query language",
            "A programming framework",
            "A network cable standard",
          ],
          answer: "A process for handling security incidents",
        },
      ],

      Basic: [
        {
          question: "What is containment in incident response?",
          options: [
            "Limiting the spread or impact of an incident",
            "Deleting all logs",
            "Publishing credentials",
            "Removing all security controls",
          ],
          answer: "Limiting the spread or impact of an incident",
        },
      ],

      Intermediate: [
        {
          question: "Which phase commonly follows containment?",
          options: ["Eradication", "Marketing", "Deployment", "Compilation"],
          answer: "Eradication",
        },
      ],

      Advanced: [
        {
          question: "Why is a post-incident review important?",
          options: [
            "To identify lessons and improve future defenses",
            "To delete evidence",
            "To disable monitoring",
            "To remove security policies",
          ],
          answer: "To identify lessons and improve future defenses",
        },
      ],
    },
  },
};

/* =========================================================
   FALLBACK QUESTION
========================================================= */

const createFallbackQuestion = (skill, level) => ({
  question: `Which statement best describes ${skill} at the ${level} level?`,
  options: [
    `Understanding the fundamental concepts of ${skill}`,
    `Knowing absolutely nothing about ${skill}`,
    `Using ${skill} without understanding it`,
    `Only reading about ${skill}`,
  ],
  answer: `Understanding the fundamental concepts of ${skill}`,
});

/* =========================================================
   SHUFFLE
========================================================= */

const shuffle = (array) => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

/* =========================================================
   NORMALIZE LEVEL
========================================================= */

const scoreToLevel = (score) => {
  const numericScore = Number(score);

  if (numericScore >= 100) {
    return "Advanced";
  }

  if (numericScore >= 75) {
    return "Intermediate";
  }

  if (numericScore >= 50) {
    return "Basic";
  }

  return "Beginner";
};

/* =========================================================
   NORMALIZE SKILL NAME
========================================================= */

const normalizeSkillName = (skill) => {
  if (!skill) {
    return "";
  }

  const value = String(skill).trim();

  const aliases = {
    "Machine Learning": "Machine Learning",
    "Machine Learning Fundamentals": "Machine Learning",
    ML: "Machine Learning",
    "ML Fundamentals": "Machine Learning",

    "Data Preprocessing": "Data Preprocessing",
    "Data Processing": "Data Preprocessing",
    Preprocessing: "Data Preprocessing",

    Statistics: "Statistics",
    "Probability & Statistics": "Statistics",

    Mathematics: "Mathematics",
    Math: "Mathematics",
    "Mathematics for Machine Learning": "Mathematics",

    Python: "Python",

    "Deep Learning": "Deep Learning",
    "Deep Learning Fundamentals": "Deep Learning",

    "Model Evaluation": "Model Evaluation",
    "Model Evaluation & Validation": "Model Evaluation",

    "TensorFlow / PyTorch": "TensorFlow / PyTorch",
    "TensorFlow/PyTorch": "TensorFlow / PyTorch",
    "TensorFlow & PyTorch": "TensorFlow / PyTorch",
    TensorFlow: "TensorFlow / PyTorch",
    PyTorch: "TensorFlow / PyTorch",

    "SQL & Data": "SQL & Data",
    SQL: "SQL & Data",
    Databases: "SQL & Data",

    "MLOps & Deployment": "MLOps & Deployment",
    MLOps: "MLOps & Deployment",
    Deployment: "MLOps & Deployment",
  };

  if (aliases[value]) {
    return aliases[value];
  }

  const lower = value.toLowerCase();

  const match = Object.entries(aliases).find(
    ([alias]) => alias.toLowerCase() === lower,
  );

  return match ? match[1] : value;
};

/* =========================================================
   GET ASSESSMENT SKILLS
========================================================= */

const getAssessmentSkills = (storedData) => {
  if (!storedData) {
    return {};
  }

  /* -------------------------------------------------------
     FORMAT 1
  ------------------------------------------------------- */

  if (
    storedData.skillScores &&
    !Array.isArray(storedData.skillScores) &&
    typeof storedData.skillScores === "object"
  ) {
    const result = {};

    Object.entries(storedData.skillScores).forEach(([skill, score]) => {
      if (typeof score === "number" || !Number.isNaN(Number(score))) {
        result[normalizeSkillName(skill)] = Number(score);
      }
    });

    if (Object.keys(result).length > 0) {
      return result;
    }
  }

  /* -------------------------------------------------------
     FORMAT 2
  ------------------------------------------------------- */

  if (Array.isArray(storedData.skillScores)) {
    const result = {};

    storedData.skillScores.forEach((item) => {
      if (!item || typeof item !== "object") {
        return;
      }

      const skill = item.skill || item.name || item.title;

      const score =
        item.score ??
        item.progress ??
        item.percentage ??
        item.value ??
        item.level ??
        25;

      if (skill && !Number.isNaN(Number(score))) {
        result[normalizeSkillName(skill)] = Number(score);
      }
    });

    if (Object.keys(result).length > 0) {
      return result;
    }
  }

  /* -------------------------------------------------------
     FORMAT 3
  ------------------------------------------------------- */

  const directScores = {};

  Object.entries(storedData).forEach(([key, value]) => {
    if (
      typeof value === "number" &&
      !["score", "percentage", "career", "totalScore", "overallScore"].includes(
        key,
      )
    ) {
      directScores[normalizeSkillName(key)] = value;
    }
  });

  if (Object.keys(directScores).length > 0) {
    return directScores;
  }

  /* -------------------------------------------------------
     FORMAT 4
  ------------------------------------------------------- */

  if (Array.isArray(storedData.answers)) {
    const result = {};

    storedData.answers.forEach((answer) => {
      if (!answer || typeof answer !== "object") {
        return;
      }

      const skill = answer.skill || answer.name || answer.title;

      const score =
        answer.score ??
        answer.value ??
        answer.progress ??
        answer.percentage ??
        25;

      if (skill && !Number.isNaN(Number(score))) {
        result[normalizeSkillName(skill)] = Number(score);
      }
    });

    if (Object.keys(result).length > 0) {
      return result;
    }
  }

  /* -------------------------------------------------------
     FORMAT 5
  ------------------------------------------------------- */

  if (Array.isArray(storedData.skills)) {
    const result = {};

    storedData.skills.forEach((item) => {
      if (!item || typeof item !== "object") {
        return;
      }

      const skill = item.skill || item.name || item.title;

      const score =
        item.score ??
        item.progress ??
        item.percentage ??
        item.value ??
        item.level ??
        25;

      if (skill && !Number.isNaN(Number(score))) {
        result[normalizeSkillName(skill)] = Number(score);
      }
    });

    if (Object.keys(result).length > 0) {
      return result;
    }
  }

  return {};
};

/* =========================================================
   LOAD ALL POSSIBLE ASSESSMENT DATA
========================================================= */

const loadAssessmentData = () => {
  const storageKeys = [
    "assessmentResults",
    "adaptiveAssessmentResults",
    "selfAssessmentAnswers",
    "pathwiseSkillData",
    "pathwiseProfileSkills",
    "pathwiseAssessmentResults",
  ];

  for (const key of storageKeys) {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw);

      const skills = getAssessmentSkills(parsed);

      if (Object.keys(skills).length > 0) {
        console.log(`MCQ Verification loaded assessment from: ${key}`, skills);

        return skills;
      }
    } catch (error) {
      console.warn(`Could not read ${key}:`, error);
    }
  }

  return {};
};

/* =========================================================
   GENERATE QUESTIONS
========================================================= */

const generateQuestions = (career, assessmentData) => {
  const normalizedCareer = normalizeCareer(career);

  const careerBank = questionBank[normalizedCareer];

  if (!careerBank) {
    console.warn(`No verification question bank found for: ${career}`, {
      normalizedCareer,
      availableCareers: Object.keys(questionBank),
    });

    return [];
  }

  const generated = [];

  Object.entries(assessmentData).forEach(([rawSkill, rawScore]) => {
    const skill = normalizeSkillName(rawSkill);

    const score = Number(rawScore);

    const safeScore =
      Number.isFinite(score) && score >= 0 ? Math.min(score, 100) : 25;

    const level = scoreToLevel(safeScore);

    let skillBank = careerBank[skill];

    /* -------------------------------------------------------
       Case-insensitive skill lookup
    ------------------------------------------------------- */

    if (!skillBank) {
      const matchingSkill = Object.keys(careerBank).find(
        (bankSkill) => bankSkill.toLowerCase() === skill.toLowerCase(),
      );

      if (matchingSkill) {
        skillBank = careerBank[matchingSkill];
      }
    }

    /* -------------------------------------------------------
       Fallback for unknown skills
    ------------------------------------------------------- */

    if (!skillBank) {
      generated.push({
        id: `${normalizedCareer}-${skill}-${level}-fallback-${Math.random()}`,
        skill,
        level,
        claimedScore: safeScore,
        ...createFallbackQuestion(skill, level),
      });

      return;
    }

    let availableQuestions = skillBank[level] || [];

    /* -------------------------------------------------------
       If requested level doesn't exist,
       search another available level.
    ------------------------------------------------------- */

    if (!availableQuestions.length) {
      const fallbackLevel = [
        "Beginner",
        "Basic",
        "Intermediate",
        "Advanced",
      ].find((candidateLevel) => (skillBank[candidateLevel] || []).length > 0);

      availableQuestions = fallbackLevel ? skillBank[fallbackLevel] : [];
    }

    if (!availableQuestions.length) {
      generated.push({
        id: `${normalizedCareer}-${skill}-${level}-fallback-${Math.random()}`,
        skill,
        level,
        claimedScore: safeScore,
        ...createFallbackQuestion(skill, level),
      });

      return;
    }

    const selectedQuestions = shuffle(availableQuestions).slice(
      0,
      Math.min(2, availableQuestions.length),
    );

    selectedQuestions.forEach((item, index) => {
      generated.push({
        ...item,
        options: shuffle(item.options),
        id: `${normalizedCareer}-${skill}-${level}-${index}-${Math.random()}`,
        skill,
        level,
        claimedScore: safeScore,
      });
    });
  });

  return shuffle(generated);
};

/* =========================================================
   GET VERIFICATION LEVEL
========================================================= */

const getVerificationLevel = (percentage) => {
  if (percentage >= 80) {
    return "Advanced";
  }

  if (percentage >= 60) {
    return "Intermediate";
  }

  if (percentage >= 40) {
    return "Basic";
  }

  return "Beginner";
};

/* =========================================================
   SCORE MESSAGE
========================================================= */

const getScoreMessage = (score) => {
  if (score >= 90) {
    return "Outstanding verification performance! 🔥";
  }

  if (score >= 80) {
    return "Excellent! Your knowledge strongly supports your claimed skills. 🎉";
  }

  if (score >= 60) {
    return "Good job! You have a solid foundation with some areas to strengthen.";
  }

  if (score >= 40) {
    return "You have a basic foundation. Your roadmap will help strengthen the gaps.";
  }

  return "This is a starting point. Your personalized roadmap will help you build these skills step by step.";
};

/* =========================================================
   COMPONENT
========================================================= */

function MCQVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     CAREER
  ======================================================= */

  const rawCareer =
    location.state?.career ||
    localStorage.getItem("assessmentCareer") ||
    localStorage.getItem("selectedCareer") ||
    localStorage.getItem("career");

  const career = normalizeCareer(rawCareer);

  /* =======================================================
     LOAD ASSESSMENT
  ======================================================= */

  const assessmentData = useMemo(() => {
    return loadAssessmentData();
  }, []);

  /* =======================================================
     QUESTIONS
  ======================================================= */

  const questions = useMemo(() => {
    if (!career) {
      return [];
    }

    return generateQuestions(career, assessmentData);
  }, [career, assessmentData]);

  /* =======================================================
     STATE
  ======================================================= */

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(10);

  const [missedQuestions, setMissedQuestions] = useState([]);

  const [testFinished, setTestFinished] = useState(false);

  const [secondChance, setSecondChance] = useState(false);

  const [secondChanceIndex, setSecondChanceIndex] = useState(0);

  const [secondChanceAnswers, setSecondChanceAnswers] = useState({});

  const [finalScore, setFinalScore] = useState(0);

  const [finalResults, setFinalResults] = useState([]);

  /* =======================================================
     ACTIVE QUESTIONS
  ======================================================= */

  const activeQuestions = secondChance ? missedQuestions : questions;

  const activeIndex = secondChance ? secondChanceIndex : currentQuestion;

  const question = activeQuestions[activeIndex];

  /* =======================================================
     RESET TIMER
  ======================================================= */

  useEffect(() => {
    setTimeLeft(10);
  }, [activeIndex, secondChance]);

  /* =======================================================
     TIMER
  ======================================================= */

  useEffect(() => {
    if (!question || testFinished) {
      return undefined;
    }

    if (timeLeft <= 0) {
      handleTimeout();
      return undefined;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, question, testFinished, secondChance, activeIndex]);

  /* =======================================================
     TIMEOUT
  ======================================================= */

  const handleTimeout = () => {
    if (!question) {
      return;
    }

    if (secondChance) {
      moveSecondChanceNext();
      return;
    }

    setMissedQuestions((previous) => {
      if (previous.some((item) => item.id === question.id)) {
        return previous;
      }

      return [...previous, question];
    });

    moveMainNext();
  };

  /* =======================================================
     MAIN NEXT
  ======================================================= */

  const moveMainNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      finishMainTest();
    }
  };

  /* =======================================================
     SECOND CHANCE NEXT
  ======================================================= */

  const moveSecondChanceNext = () => {
    if (secondChanceIndex < missedQuestions.length - 1) {
      setSecondChanceIndex((previous) => previous + 1);
    } else {
      finishSecondChance();
    }
  };

  /* =======================================================
     ANSWER
  ======================================================= */

  const handleAnswer = (option) => {
    if (!question) {
      return;
    }

    if (secondChance) {
      setSecondChanceAnswers((previous) => ({
        ...previous,
        [question.id]: option,
      }));

      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [question.id]: option,
    }));
  };

  /* =======================================================
     NEXT BUTTON
  ======================================================= */

  const handleNext = () => {
    if (!question) {
      return;
    }

    if (secondChance) {
      if (!secondChanceAnswers[question.id]) {
        return;
      }

      moveSecondChanceNext();
      return;
    }

    if (!answers[question.id]) {
      return;
    }

    moveMainNext();
  };

  /* =======================================================
     FINISH MAIN TEST
  ======================================================= */

  const finishMainTest = () => {
    if (missedQuestions.length > 0) {
      setSecondChanceIndex(0);
      setSecondChance(true);
      setTimeLeft(10);

      return;
    }

    calculateResults();
  };

  /* =======================================================
     FINISH SECOND CHANCE
  ======================================================= */

  const finishSecondChance = () => {
    calculateResults();
  };

  /* =======================================================
     CALCULATE RESULTS
  ======================================================= */

  const calculateResults = () => {
    const combinedAnswers = {
      ...answers,
      ...secondChanceAnswers,
    };

    const results = {};

    let totalCorrect = 0;
    let totalQuestions = questions.length;

    /* =====================================================
       CALCULATE SKILL RESULTS
    ===================================================== */

    questions.forEach((item) => {
      if (!results[item.skill]) {
        results[item.skill] = {
          total: 0,
          correct: 0,
          claimedScore: item.claimedScore ?? assessmentData[item.skill] ?? 25,
        };
      }

      results[item.skill].total += 1;

      if (combinedAnswers[item.id] === item.answer) {
        results[item.skill].correct += 1;
        totalCorrect += 1;
      }
    });

    /* =====================================================
       FINAL VERIFICATION SCORE
    ===================================================== */

    const overallVerificationScore =
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0;

    /* =====================================================
       VERIFIED SKILLS
    ===================================================== */

    const verifiedSkills = Object.entries(results).map(([skill, data]) => {
      const percentage =
        data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

      const verifiedLevel = getVerificationLevel(percentage);

      return {
        name: skill,

        claimedProgress: data.claimedScore,

        verifiedProgress: percentage,

        verifiedLevel,

        correct: data.correct,

        total: data.total,

        source: "verified-assessment",

        career,
      };
    });

    /* =====================================================
       SAVE VERIFIED DATA
    ===================================================== */

    localStorage.setItem("verifiedSkillData", JSON.stringify(verifiedSkills));

    /* =====================================================
       SAVE FINAL VERIFICATION SCORE
    ===================================================== */

    localStorage.setItem(
      "finalVerificationScore",
      String(overallVerificationScore),
    );

    localStorage.setItem(
      "pathwiseVerificationScore",
      String(overallVerificationScore),
    );

    /* =====================================================
       SAVE COMPLETE VERIFICATION RESULTS
    ===================================================== */

    localStorage.setItem(
      "assessmentVerificationResults",
      JSON.stringify({
        career,

        finalVerificationScore: overallVerificationScore,

        correctAnswers: totalCorrect,

        totalQuestions,

        missedQuestions: missedQuestions.length,

        verifiedSkills,

        completedAt: new Date().toISOString(),
      }),
    );

    /* =====================================================
       PATHWISE SKILL DATA
    ===================================================== */

    localStorage.setItem(
      "pathwiseSkillData",
      JSON.stringify(
        verifiedSkills.map((skill) => ({
          ...skill,

          progress: skill.verifiedProgress,

          level: skill.verifiedLevel,
        })),
      ),
    );

    localStorage.setItem("skillAssessmentCompleted", "true");

    localStorage.setItem(
      "skillAssessmentCompletedAt",
      new Date().toISOString(),
    );

    /* =====================================================
       SAVE PERSONALIZATION SUMMARY
    ===================================================== */

    localStorage.setItem(
      "pathwiseAssessmentSummary",
      JSON.stringify({
        career,

        overallScore: overallVerificationScore,

        verificationScore: overallVerificationScore,

        assessedSkills: verifiedSkills,

        strongSkills: verifiedSkills.filter(
          (skill) => skill.verifiedProgress >= 75,
        ),

        skillGaps: verifiedSkills.filter(
          (skill) => skill.verifiedProgress < 75,
        ),

        completedAt: new Date().toISOString(),
      }),
    );

    /* =====================================================
       UPDATE UI IMMEDIATELY
    ===================================================== */

    setFinalScore(overallVerificationScore);

    setFinalResults(verifiedSkills);

    setTestFinished(true);
  };

  /* =======================================================
     NO CAREER
  ======================================================= */

  if (!career) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <AlertTriangle className="mx-auto text-amber-500" size={40} />

          <h1 className="mt-4 text-2xl font-bold">No career selected</h1>

          <p className="mt-2 text-slate-500">
            Please select a career and complete the skill assessment first.
          </p>

          <button
            onClick={() => navigate("/skill-assessment")}
            className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white"
          >
            Back to Assessment
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     NO QUESTIONS
  ======================================================= */

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
          <AlertTriangle className="mx-auto text-amber-500" size={40} />

          <h1 className="mt-4 text-2xl font-bold">
            Verification questions unavailable
          </h1>

          <p className="mt-2 text-slate-500">
            We couldn't generate verification questions for{" "}
            <strong>{career}</strong>.
          </p>

          {Object.keys(assessmentData).length === 0 ? (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
              No skill scores were found in your assessment results.
            </p>
          ) : (
            <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
              Your assessment contains{" "}
              <strong>{Object.keys(assessmentData).length}</strong> skills, but
              the verification question bank could not be loaded.
            </p>
          )}

          <p className="mt-3 text-sm text-slate-400">
            Career detected: <strong>{career}</strong>
          </p>

          <button
            onClick={() =>
              navigate("/skill-assessment", {
                state: {
                  career,
                },
              })
            }
            className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white"
          >
            Back to Assessment
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     FINAL RESULTS SCREEN
  ======================================================= */

  if (testFinished) {
    const scoreMessage = getScoreMessage(finalScore);

    const scoreLevel = getVerificationLevel(finalScore);

    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-5 py-2 text-sm font-bold text-green-600">
              <CheckCircle2 size={18} />
              Verification Complete
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Your Final Verification Score 🎉
            </h1>

            <p className="mt-3 text-slate-600">
              Your score is based on your actual performance in the verification
              test.
            </p>
          </div>

          {/* =================================================
              SCORE CARD
          ================================================= */}

          <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
                <div>
                  <div className="text-4xl font-black">{finalScore}%</div>

                  <div className="text-xs font-semibold text-indigo-100">
                    VERIFIED
                  </div>
                </div>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <Trophy size={22} className="text-yellow-300" />

                <span className="text-xl font-bold">{scoreLevel}</span>
              </div>

              <p className="max-w-xl text-indigo-100">{scoreMessage}</p>

              <div className="mt-6 grid w-full max-w-lg grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-indigo-200">Questions</p>

                  <p className="mt-1 text-2xl font-bold">{questions.length}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-indigo-200">Skills</p>

                  <p className="mt-1 text-2xl font-bold">
                    {finalResults.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-indigo-200">Missed</p>

                  <p className="mt-1 text-2xl font-bold">
                    {missedQuestions.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SKILL BREAKDOWN
          ================================================= */}

          <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Target className="text-primary-600" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Skill Verification Breakdown
                </h2>

                <p className="text-sm text-slate-500">
                  Your actual performance compared with your self-assessment.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {finalResults.map((skill) => {
                const verified = Number(skill.verifiedProgress);

                const claimed = Number(skill.claimedProgress);

                const difference = verified - claimed;

                return (
                  <div
                    key={skill.name}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {skill.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {skill.correct} correct out of {skill.total}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {verified >= 60 ? (
                          <CheckCircle2 size={18} className="text-green-500" />
                        ) : (
                          <XCircle size={18} className="text-red-500" />
                        )}

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                          {skill.verifiedLevel}
                        </span>
                      </div>
                    </div>

                    {/* VERIFIED BAR */}

                    <div className="mb-3">
                      <div className="mb-1 flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Verified</span>

                        <span className="text-primary-600">{verified}%</span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-primary-600 transition-all"
                          style={{
                            width: `${verified}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* CLAIMED BAR */}

                    <div>
                      <div className="mb-1 flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Self-assessed</span>

                        <span className="text-slate-600">{claimed}%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-slate-300"
                          style={{
                            width: `${Math.min(claimed, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <TrendingUp
                        size={14}
                        className={
                          difference >= 0 ? "text-green-500" : "text-red-500"
                        }
                      />

                      <span className="text-slate-500">
                        {difference >= 0
                          ? `Verified ${difference}% above your self-assessment`
                          : `Verified ${Math.abs(
                              difference,
                            )}% below your self-assessment`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              WHAT THIS SCORE MEANS
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex gap-4">
              <Brain className="mt-1 shrink-0 text-primary-600" size={24} />

              <div>
                <h2 className="font-bold text-indigo-900">
                  What does this score mean?
                </h2>

                <p className="mt-2 text-sm leading-6 text-indigo-800">
                  Your verification score measures how accurately you answered
                  questions related to the skills you selected during your
                  assessment. It is used to make your PathWise roadmap more
                  realistic and personalized.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() =>
                navigate("/results", {
                  state: {
                    career,
                    verifiedSkills: finalResults,
                    finalVerificationScore: finalScore,
                  },
                })
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3 font-bold text-white transition hover:bg-primary-700"
            >
              View Full Skill Analysis
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/roadmap")}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-7 py-3 font-bold text-slate-700 transition hover:border-primary-300 hover:bg-slate-50"
            >
              Continue to Roadmap
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Verification completed for <strong>{career}</strong>
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     SECOND CHANCE SAFETY
  ======================================================= */

  if (secondChance && !question) {
    return null;
  }

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progress =
    activeQuestions.length > 0
      ? ((activeIndex + 1) / activeQuestions.length) * 100
      : 0;

  /* =======================================================
     SELECTED ANSWER
  ======================================================= */

  const selectedAnswer = secondChance
    ? secondChanceAnswers[question?.id]
    : answers[question?.id];

  /* =======================================================
     RENDER TEST
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-primary-600">
            <Brain size={17} />

            {secondChance ? "Second Chance" : "Skill Verification"}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            {secondChance
              ? "Let's try those missed questions again 🔄"
              : "Let's test what you know 🧠"}
          </h1>

          <p className="mt-3 text-slate-600">
            {secondChance
              ? "You have one final attempt for the questions you missed."
              : `Verification test for ${career}`}
          </p>
        </div>

        {/* =================================================
            SECOND CHANCE MESSAGE
        ================================================= */}

        {secondChance && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <RotateCcw className="mt-1 shrink-0 text-amber-600" size={24} />

              <div>
                <h2 className="font-bold text-amber-900">
                  You missed {missedQuestions.length} question
                  {missedQuestions.length > 1 ? "s" : ""}.
                </h2>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Don't worry! You get one second chance to answer these
                  questions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">
              Question {activeIndex + 1} of {activeQuestions.length}
            </span>

            <span className="font-bold text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            TIMER
        ================================================= */}

        <div
          className={`mb-6 flex items-center justify-center gap-3 rounded-2xl border p-4 ${
            timeLeft <= 3
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-indigo-100 bg-indigo-50 text-primary-600"
          }`}
        >
          <Clock3 size={22} />

          <span className="font-bold">{timeLeft} seconds remaining</span>
        </div>

        {/* =================================================
            QUESTION CARD
        ================================================= */}

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:p-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold text-primary-600">
              {question.skill}
            </p>

            <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {question.level}
            </div>

            <h2 className="text-2xl font-bold leading-relaxed text-slate-900">
              {question.question}
            </h2>
          </div>

          {/* =================================================
              OPTIONS
          ================================================= */}

          <div className="space-y-3">
            {question.options.map((option) => {
              const selected = selectedAnswer === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition ${
                    selected
                      ? "border-primary-600 bg-indigo-50"
                      : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? "border-primary-600" : "border-slate-300"
                      }`}
                    >
                      {selected && (
                        <div className="h-3 w-3 rounded-full bg-primary-600" />
                      )}
                    </div>

                    <span className="font-medium text-slate-700">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {activeIndex === activeQuestions.length - 1
                ? secondChance
                  ? "Finish Verification"
                  : missedQuestions.length > 0
                    ? "Review Missed"
                    : "Finish Test"
                : "Next"}

              {activeIndex === activeQuestions.length - 1 ? (
                <CheckCircle2 size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            ANTI-CHEATING NOTICE
        ================================================= */}

        <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <AlertTriangle className="mt-1 shrink-0 text-amber-500" size={20} />

          <p className="text-sm leading-6 text-slate-500">
            This is a timed skill-verification assessment. Questions and answer
            choices may be randomized. Please answer based on your own knowledge
            so your roadmap accurately reflects your current skills.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MCQVerification;
