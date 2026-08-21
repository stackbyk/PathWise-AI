/* =========================================================
   PATHWISE AI
   CAREER-SPECIFIC ASSESSMENT QUESTION BANK
========================================================= */

/*
  Each question contains:

  id
  career
  level
  skill
  type
  question
  options
  correctAnswer
  explanation
*/

/* =========================================================
   FULL STACK DEVELOPER
========================================================= */

const fullStackQuestions = [
  /* ===================== BEGINNER ===================== */

  {
    id: "fs-b-01",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "HTML",
    type: "conceptual",
    question: "What is the main purpose of HTML?",
    options: [
      "To structure the content of a webpage",
      "To store data in a database",
      "To create server APIs",
      "To style JavaScript functions",
    ],
    correctAnswer: 0,
    explanation:
      "HTML provides the structure and semantic content of web pages.",
  },

  {
    id: "fs-b-02",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "CSS",
    type: "conceptual",
    question: "Which CSS property is used to change text color?",
    options: ["font-size", "color", "background", "text-style"],
    correctAnswer: 1,
    explanation: "The CSS color property changes the text color.",
  },

  {
    id: "fs-b-03",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "JavaScript",
    type: "coding",
    question:
      "What is the output of this JavaScript code?\n\nconsole.log(2 + 3);",
    options: ["23", "5", "undefined", "Error"],
    correctAnswer: 1,
    explanation: "The + operator adds the two numbers, producing 5.",
  },

  {
    id: "fs-b-04",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "JavaScript",
    type: "conceptual",
    question:
      "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 1,
    explanation: "let declares a block-scoped variable that can be reassigned.",
  },

  {
    id: "fs-b-05",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "React",
    type: "conceptual",
    question: "What is React mainly used for?",
    options: [
      "Building user interfaces",
      "Managing SQL databases",
      "Operating servers",
      "Creating network cables",
    ],
    correctAnswer: 0,
    explanation:
      "React is a JavaScript library primarily used for building user interfaces.",
  },

  {
    id: "fs-b-06",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "React",
    type: "conceptual",
    question: "Which React hook is commonly used to manage component state?",
    options: ["useState", "useRoute", "useDatabase", "useServer"],
    correctAnswer: 0,
    explanation: "useState is React's standard hook for component state.",
  },

  {
    id: "fs-b-07",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "Node.js",
    type: "conceptual",
    question: "What is Node.js?",
    options: [
      "A JavaScript runtime",
      "A CSS framework",
      "A database",
      "An HTML compiler",
    ],
    correctAnswer: 0,
    explanation: "Node.js allows JavaScript to run outside the browser.",
  },

  {
    id: "fs-b-08",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "MongoDB",
    type: "conceptual",
    question: "MongoDB primarily stores data as what?",
    options: ["Documents", "HTML pages", "CSS files", "Java classes"],
    correctAnswer: 0,
    explanation: "MongoDB is a document-oriented NoSQL database.",
  },

  {
    id: "fs-b-09",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "REST API",
    type: "conceptual",
    question: "Which HTTP method is normally used to retrieve data?",
    options: ["GET", "POST", "DELETE", "PATCH"],
    correctAnswer: 0,
    explanation: "GET is normally used to retrieve resources.",
  },

  {
    id: "fs-b-10",
    career: "Full Stack Developer",
    level: "Beginner",
    skill: "Git",
    type: "conceptual",
    question: "Which Git command creates a new commit?",
    options: ["git push", "git commit", "git clone", "git branch"],
    correctAnswer: 1,
    explanation: "git commit records staged changes in the local repository.",
  },

  /* ===================== INTERMEDIATE ===================== */

  {
    id: "fs-i-01",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "JavaScript",
    type: "coding",
    question:
      "What is the output?\n\nconst nums = [1, 2, 3];\nconsole.log(nums.map(n => n * 2));",
    options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "undefined"],
    correctAnswer: 1,
    explanation:
      "map creates a new array by applying the function to each element.",
  },

  {
    id: "fs-i-02",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "JavaScript",
    type: "conceptual",
    question: "What is a Promise used for in JavaScript?",
    options: [
      "Representing an eventual asynchronous result",
      "Creating CSS styles",
      "Creating database tables",
      "Declaring HTML elements",
    ],
    correctAnswer: 0,
    explanation:
      "Promises represent the eventual completion or failure of an asynchronous operation.",
  },

  {
    id: "fs-i-03",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "React",
    type: "conceptual",
    question: "Why is the dependency array used in useEffect?",
    options: [
      "To control when the effect runs",
      "To create CSS",
      "To connect MongoDB",
      "To define React routes",
    ],
    correctAnswer: 0,
    explanation:
      "The dependency array determines when React should re-run the effect.",
  },

  {
    id: "fs-i-04",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "React",
    type: "conceptual",
    question: "What problem can React.memo help reduce?",
    options: [
      "Unnecessary component re-renders",
      "Database corruption",
      "HTTP errors",
      "Git merge conflicts",
    ],
    correctAnswer: 0,
    explanation:
      "React.memo can prevent unnecessary re-rendering when props have not changed.",
  },

  {
    id: "fs-i-05",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "Node.js",
    type: "conceptual",
    question: "What does Express middleware generally do?",
    options: [
      "Process requests and responses in the request pipeline",
      "Create React components",
      "Compile CSS",
      "Store MongoDB documents",
    ],
    correctAnswer: 0,
    explanation:
      "Express middleware can inspect and modify requests/responses or perform actions during the request lifecycle.",
  },

  {
    id: "fs-i-06",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "REST API",
    type: "conceptual",
    question:
      "Which status code usually indicates a successful resource creation?",
    options: ["200", "201", "404", "500"],
    correctAnswer: 1,
    explanation: "HTTP 201 Created indicates successful resource creation.",
  },

  {
    id: "fs-i-07",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "MongoDB",
    type: "conceptual",
    question: "What is a MongoDB index mainly used for?",
    options: [
      "Improving query performance",
      "Creating React components",
      "Encrypting passwords automatically",
      "Starting a Node server",
    ],
    correctAnswer: 0,
    explanation:
      "Indexes can significantly improve query performance by reducing the amount of data MongoDB must scan.",
  },

  {
    id: "fs-i-08",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "Authentication",
    type: "conceptual",
    question: "What is JWT commonly used for?",
    options: [
      "Stateless authentication",
      "CSS animations",
      "Image compression",
      "Database indexing",
    ],
    correctAnswer: 0,
    explanation:
      "JWTs are commonly used to represent authentication claims between a client and server.",
  },

  {
    id: "fs-i-09",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "JavaScript",
    type: "coding",
    question:
      "What does this return?\n\nconst result = [1, 2, 3, 4].filter(n => n % 2 === 0);",
    options: ["[1, 3]", "[2, 4]", "[1, 2]", "4"],
    correctAnswer: 1,
    explanation:
      "filter keeps elements that satisfy the condition, so the result is [2, 4].",
  },

  {
    id: "fs-i-10",
    career: "Full Stack Developer",
    level: "Intermediate",
    skill: "REST API",
    type: "conceptual",
    question:
      "Which method is generally appropriate for partially updating a resource?",
    options: ["GET", "POST", "PATCH", "HEAD"],
    correctAnswer: 2,
    explanation:
      "PATCH is generally used for partial modifications to a resource.",
  },

  /* ===================== ADVANCED ===================== */

  {
    id: "fs-a-01",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "JavaScript",
    type: "conceptual",
    question: "What is event delegation?",
    options: [
      "Handling events using a parent element",
      "Creating asynchronous functions",
      "Encrypting HTTP requests",
      "Creating database indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Event delegation uses event bubbling to handle events at a parent element.",
  },

  {
    id: "fs-a-02",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "JavaScript",
    type: "conceptual",
    question: "What is a closure in JavaScript?",
    options: [
      "A function retaining access to its lexical scope",
      "A closed HTTP connection",
      "A database transaction",
      "A React route",
    ],
    correctAnswer: 0,
    explanation:
      "A closure allows a function to retain access to variables from its lexical environment.",
  },

  {
    id: "fs-a-03",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "React",
    type: "conceptual",
    question: "What is the purpose of React reconciliation?",
    options: [
      "Efficiently determine UI updates",
      "Authenticate users",
      "Create database indexes",
      "Compile JavaScript",
    ],
    correctAnswer: 0,
    explanation:
      "React reconciliation determines which parts of the UI need to be updated.",
  },

  {
    id: "fs-a-04",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "Backend Architecture",
    type: "conceptual",
    question:
      "What is the primary benefit of separating controllers and services?",
    options: [
      "Better separation of responsibilities",
      "Faster CSS rendering",
      "Automatic database encryption",
      "Replacing HTTP",
    ],
    correctAnswer: 0,
    explanation:
      "Separating responsibilities makes backend code easier to maintain, test and extend.",
  },

  {
    id: "fs-a-05",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "Security",
    type: "conceptual",
    question: "What is a common purpose of bcrypt?",
    options: [
      "Hashing passwords",
      "Rendering React",
      "Creating API routes",
      "Compressing images",
    ],
    correctAnswer: 0,
    explanation: "bcrypt is commonly used to securely hash passwords.",
  },

  {
    id: "fs-a-06",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "Database",
    type: "conceptual",
    question: "Why are database transactions useful?",
    options: [
      "To keep related operations consistent",
      "To style webpages",
      "To create React components",
      "To improve CSS",
    ],
    correctAnswer: 0,
    explanation:
      "Transactions help maintain consistency when multiple related database operations must succeed or fail together.",
  },

  {
    id: "fs-a-07",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "API Security",
    type: "conceptual",
    question: "Why should API input be validated on the server?",
    options: [
      "Clients cannot be fully trusted",
      "Browsers do not support JavaScript",
      "MongoDB requires React",
      "CSS requires validation",
    ],
    correctAnswer: 0,
    explanation:
      "Client-side validation can be bypassed, so server-side validation is essential.",
  },

  {
    id: "fs-a-08",
    career: "Full Stack Developer",
    level: "Advanced",
    skill: "Performance",
    type: "conceptual",
    question: "What is pagination primarily used for?",
    options: [
      "Reducing the amount of data returned at once",
      "Encrypting passwords",
      "Creating HTML",
      "Replacing APIs",
    ],
    correctAnswer: 0,
    explanation:
      "Pagination limits the amount of data returned in a single request.",
  },
];

/* =========================================================
   DATA SCIENTIST
========================================================= */

const dataScientistQuestions = [
  {
    id: "ds-b-01",
    career: "Data Scientist",
    level: "Beginner",
    skill: "Python",
    type: "coding",
    question: "What is the output?\n\nnumbers = [1, 2, 3]\nprint(len(numbers))",
    options: ["2", "3", "4", "Error"],
    correctAnswer: 1,
    explanation: "The list contains three elements.",
  },

  {
    id: "ds-b-02",
    career: "Data Scientist",
    level: "Beginner",
    skill: "Statistics",
    type: "conceptual",
    question: "What does the mean represent?",
    options: [
      "The average value",
      "The most frequent value",
      "The middle value",
      "The largest value",
    ],
    correctAnswer: 0,
    explanation:
      "The mean is calculated by summing values and dividing by their count.",
  },

  {
    id: "ds-b-03",
    career: "Data Scientist",
    level: "Beginner",
    skill: "SQL",
    type: "conceptual",
    question: "Which SQL command retrieves data?",
    options: ["SELECT", "INSERT", "DELETE", "DROP"],
    correctAnswer: 0,
    explanation: "SELECT retrieves data from database tables.",
  },

  {
    id: "ds-b-04",
    career: "Data Scientist",
    level: "Beginner",
    skill: "Python",
    type: "conceptual",
    question:
      "Which Python library is widely used for tabular data manipulation?",
    options: ["Pandas", "React", "Express", "Mongoose"],
    correctAnswer: 0,
    explanation:
      "Pandas provides DataFrame and Series structures for data analysis.",
  },

  {
    id: "ds-b-05",
    career: "Data Scientist",
    level: "Beginner",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is supervised learning?",
    options: [
      "Learning from labeled data",
      "Learning without any data",
      "Only clustering data",
      "Only storing data",
    ],
    correctAnswer: 0,
    explanation:
      "Supervised learning uses labeled examples to learn a mapping.",
  },

  {
    id: "ds-i-01",
    career: "Data Scientist",
    level: "Intermediate",
    skill: "Statistics",
    type: "conceptual",
    question: "What does standard deviation measure?",
    options: [
      "Spread of values around the mean",
      "Number of rows",
      "Maximum value only",
      "Database size",
    ],
    correctAnswer: 0,
    explanation: "Standard deviation measures dispersion around the mean.",
  },

  {
    id: "ds-i-02",
    career: "Data Scientist",
    level: "Intermediate",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is overfitting?",
    options: [
      "A model performs very well on training data but poorly on unseen data",
      "A model has no parameters",
      "A model uses too little data",
      "A database query fails",
    ],
    correctAnswer: 0,
    explanation:
      "Overfitting occurs when a model learns training data too specifically and generalizes poorly.",
  },

  {
    id: "ds-i-03",
    career: "Data Scientist",
    level: "Intermediate",
    skill: "SQL",
    type: "conceptual",
    question: "What is a JOIN used for?",
    options: [
      "Combining related rows from tables",
      "Deleting a database",
      "Sorting Python lists",
      "Training neural networks",
    ],
    correctAnswer: 0,
    explanation: "JOIN operations combine related data from multiple tables.",
  },

  {
    id: "ds-i-04",
    career: "Data Scientist",
    level: "Intermediate",
    skill: "Machine Learning",
    type: "conceptual",
    question: "Why is a train/test split used?",
    options: [
      "To evaluate generalization on unseen data",
      "To increase database storage",
      "To remove all features",
      "To create HTML",
    ],
    correctAnswer: 0,
    explanation:
      "The test set provides an estimate of performance on unseen data.",
  },

  {
    id: "ds-i-05",
    career: "Data Scientist",
    level: "Intermediate",
    skill: "Python",
    type: "coding",
    question:
      "What does this return?\n\nvalues = [1, 2, 3, 4]\nprint([x * 2 for x in values])",
    options: ["[1, 2, 3, 4]", "[2, 4, 6, 8]", "8", "Error"],
    correctAnswer: 1,
    explanation: "The list comprehension doubles every element.",
  },

  {
    id: "ds-a-01",
    career: "Data Scientist",
    level: "Advanced",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is cross-validation mainly used for?",
    options: [
      "Estimating model performance across different data splits",
      "Creating database tables",
      "Cleaning HTML",
      "Deploying React",
    ],
    correctAnswer: 0,
    explanation:
      "Cross-validation evaluates model performance across multiple train/validation splits.",
  },

  {
    id: "ds-a-02",
    career: "Data Scientist",
    level: "Advanced",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is regularization used for?",
    options: [
      "Reducing overfitting",
      "Increasing database size",
      "Creating HTML",
      "Sorting tables",
    ],
    correctAnswer: 0,
    explanation:
      "Regularization penalizes overly complex models and can reduce overfitting.",
  },

  {
    id: "ds-a-03",
    career: "Data Scientist",
    level: "Advanced",
    skill: "Statistics",
    type: "conceptual",
    question: "What does a p-value help assess?",
    options: [
      "Evidence against a null hypothesis",
      "Database storage",
      "Python memory",
      "HTML validity",
    ],
    correctAnswer: 0,
    explanation:
      "A p-value helps quantify evidence against the null hypothesis under the assumed statistical model.",
  },

  {
    id: "ds-a-04",
    career: "Data Scientist",
    level: "Advanced",
    skill: "Machine Learning",
    type: "conceptual",
    question:
      "Why can accuracy be misleading for highly imbalanced classification?",
    options: [
      "A model can achieve high accuracy while performing poorly on the minority class",
      "Accuracy cannot be calculated",
      "Accuracy only works with regression",
      "Accuracy always equals precision",
    ],
    correctAnswer: 0,
    explanation:
      "A majority-class prediction can produce high accuracy while missing minority examples.",
  },
];

/* =========================================================
   AI / ML ENGINEER
========================================================= */

const aiMlQuestions = [
  {
    id: "ai-b-01",
    career: "AI / ML Engineer",
    level: "Beginner",
    skill: "Python",
    type: "coding",
    question: "What is the output?\n\nx = 5\nprint(x * 2)",
    options: ["7", "10", "25", "Error"],
    correctAnswer: 1,
    explanation: "5 multiplied by 2 equals 10.",
  },

  {
    id: "ai-b-02",
    career: "AI / ML Engineer",
    level: "Beginner",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is a feature?",
    options: [
      "An input variable used by a model",
      "The final prediction only",
      "A database server",
      "A programming language",
    ],
    correctAnswer: 0,
    explanation:
      "Features are input variables used by machine learning models.",
  },

  {
    id: "ai-b-03",
    career: "AI / ML Engineer",
    level: "Beginner",
    skill: "Machine Learning",
    type: "conceptual",
    question: "Which is an example of classification?",
    options: [
      "Predicting whether an email is spam",
      "Predicting house price",
      "Calculating an average",
      "Sorting filenames",
    ],
    correctAnswer: 0,
    explanation:
      "Spam/not-spam is a categorical prediction, making it classification.",
  },

  {
    id: "ai-b-04",
    career: "AI / ML Engineer",
    level: "Beginner",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is a label?",
    options: [
      "The target value the model tries to predict",
      "A CSS class",
      "A database index",
      "A Git branch",
    ],
    correctAnswer: 0,
    explanation: "In supervised learning, the label is the target output.",
  },

  {
    id: "ai-i-01",
    career: "AI / ML Engineer",
    level: "Intermediate",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is gradient descent used for?",
    options: [
      "Optimizing model parameters",
      "Creating HTML",
      "Managing Git branches",
      "Storing JSON",
    ],
    correctAnswer: 0,
    explanation:
      "Gradient descent iteratively updates parameters to minimize a loss function.",
  },

  {
    id: "ai-i-02",
    career: "AI / ML Engineer",
    level: "Intermediate",
    skill: "Machine Learning",
    type: "conceptual",
    question: "Why is feature scaling useful for some algorithms?",
    options: [
      "It puts features on comparable scales",
      "It deletes all features",
      "It creates labels",
      "It removes the need for data",
    ],
    correctAnswer: 0,
    explanation:
      "Scaling can prevent features with larger numeric ranges from dominating distance or gradient calculations.",
  },

  {
    id: "ai-i-03",
    career: "AI / ML Engineer",
    level: "Intermediate",
    skill: "NLP",
    type: "conceptual",
    question: "What does TF-IDF measure?",
    options: [
      "The importance of terms in documents relative to a corpus",
      "Database latency",
      "Image resolution",
      "CPU temperature",
    ],
    correctAnswer: 0,
    explanation:
      "TF-IDF weights terms based on their frequency and how rare they are across documents.",
  },

  {
    id: "ai-a-01",
    career: "AI / ML Engineer",
    level: "Advanced",
    skill: "Deep Learning",
    type: "conceptual",
    question: "Why are activation functions used in neural networks?",
    options: [
      "To introduce non-linearity",
      "To store database records",
      "To create HTTP requests",
      "To replace training data",
    ],
    correctAnswer: 0,
    explanation:
      "Activation functions allow neural networks to model non-linear relationships.",
  },

  {
    id: "ai-a-02",
    career: "AI / ML Engineer",
    level: "Advanced",
    skill: "Machine Learning",
    type: "conceptual",
    question: "What is data leakage?",
    options: [
      "When information unavailable at prediction time influences training",
      "When a server loses power",
      "When a database is deleted",
      "When Python code has a syntax error",
    ],
    correctAnswer: 0,
    explanation:
      "Data leakage occurs when information that should be unavailable enters model training or evaluation.",
  },
];

/* =========================================================
   CYBERSECURITY ENGINEER
========================================================= */

const cybersecurityQuestions = [
  {
    id: "cy-b-01",
    career: "Cybersecurity Engineer",
    level: "Beginner",
    skill: "Security Fundamentals",
    type: "conceptual",
    question: "What does the CIA triad stand for?",
    options: [
      "Confidentiality, Integrity, Availability",
      "Control, Internet, Authentication",
      "Code, Identity, Access",
      "Confidentiality, Internet, Authorization",
    ],
    correctAnswer: 0,
    explanation: "CIA stands for Confidentiality, Integrity and Availability.",
  },

  {
    id: "cy-b-02",
    career: "Cybersecurity Engineer",
    level: "Beginner",
    skill: "Networking",
    type: "conceptual",
    question: "What does HTTPS provide over HTTP?",
    options: [
      "Encrypted communication using TLS",
      "Faster JavaScript",
      "Database indexing",
      "Automatic authentication",
    ],
    correctAnswer: 0,
    explanation: "HTTPS uses TLS to protect HTTP communication.",
  },

  {
    id: "cy-b-03",
    career: "Cybersecurity Engineer",
    level: "Beginner",
    skill: "Authentication",
    type: "conceptual",
    question: "What is authentication?",
    options: [
      "Verifying who a user is",
      "Determining what a user can access",
      "Encrypting a database",
      "Creating a firewall",
    ],
    correctAnswer: 0,
    explanation:
      "Authentication verifies identity. Authorization determines permissions.",
  },

  {
    id: "cy-i-01",
    career: "Cybersecurity Engineer",
    level: "Intermediate",
    skill: "Web Security",
    type: "conceptual",
    question: "What is SQL injection?",
    options: [
      "Injecting malicious SQL through application input",
      "Encrypting SQL queries",
      "Creating a SQL database",
      "Backing up a database",
    ],
    correctAnswer: 0,
    explanation:
      "SQL injection exploits unsafe construction of database queries using untrusted input.",
  },

  {
    id: "cy-i-02",
    career: "Cybersecurity Engineer",
    level: "Intermediate",
    skill: "Web Security",
    type: "conceptual",
    question: "What is XSS?",
    options: [
      "A vulnerability involving injected client-side scripts",
      "A database protocol",
      "A network cable",
      "A password hashing algorithm",
    ],
    correctAnswer: 0,
    explanation:
      "Cross-site scripting allows attacker-controlled scripts to execute in a victim's browser.",
  },

  {
    id: "cy-i-03",
    career: "Cybersecurity Engineer",
    level: "Intermediate",
    skill: "Cryptography",
    type: "conceptual",
    question: "Why should passwords generally be hashed instead of encrypted?",
    options: [
      "Passwords should not need to be recovered in plaintext",
      "Hashing makes passwords readable",
      "Encryption cannot use keys",
      "Hashing is reversible",
    ],
    correctAnswer: 0,
    explanation:
      "Password verification generally requires one-way password hashing rather than recoverable encryption.",
  },

  {
    id: "cy-a-01",
    career: "Cybersecurity Engineer",
    level: "Advanced",
    skill: "Security Architecture",
    type: "conceptual",
    question: "What does the principle of least privilege mean?",
    options: [
      "Give users/processes only the permissions they need",
      "Give everyone administrator access",
      "Disable authentication",
      "Use the same password everywhere",
    ],
    correctAnswer: 0,
    explanation:
      "Least privilege minimizes permissions to reduce the impact of compromise.",
  },

  {
    id: "cy-a-02",
    career: "Cybersecurity Engineer",
    level: "Advanced",
    skill: "Security",
    type: "conceptual",
    question: "What is defense in depth?",
    options: [
      "Using multiple layers of security controls",
      "Using one password",
      "Removing firewalls",
      "Disabling logging",
    ],
    correctAnswer: 0,
    explanation: "Defense in depth uses multiple independent security layers.",
  },
];

/* =========================================================
   BACKEND DEVELOPER
========================================================= */

const backendQuestions = [
  {
    id: "be-b-01",
    career: "Backend Developer",
    level: "Beginner",
    skill: "Node.js",
    type: "conceptual",
    question: "What is Node.js?",
    options: [
      "A JavaScript runtime",
      "A database",
      "A CSS framework",
      "A browser",
    ],
    correctAnswer: 0,
    explanation: "Node.js runs JavaScript outside the browser.",
  },

  {
    id: "be-b-02",
    career: "Backend Developer",
    level: "Beginner",
    skill: "HTTP",
    type: "conceptual",
    question: "Which HTTP method is normally used to retrieve data?",
    options: ["GET", "POST", "DELETE", "PATCH"],
    correctAnswer: 0,
    explanation: "GET is normally used to retrieve resources.",
  },

  {
    id: "be-b-03",
    career: "Backend Developer",
    level: "Beginner",
    skill: "Express",
    type: "conceptual",
    question: "What is Express?",
    options: [
      "A Node.js web framework",
      "A database",
      "A programming language",
      "A CSS preprocessor",
    ],
    correctAnswer: 0,
    explanation: "Express is a popular web framework for Node.js.",
  },

  {
    id: "be-i-01",
    career: "Backend Developer",
    level: "Intermediate",
    skill: "REST API",
    type: "conceptual",
    question: "What does stateless mean in REST?",
    options: [
      "Each request contains the information needed to process it",
      "The server stores every client screen",
      "The database has no records",
      "The API has no routes",
    ],
    correctAnswer: 0,
    explanation:
      "REST statelessness means the server does not rely on stored client session state between requests.",
  },

  {
    id: "be-i-02",
    career: "Backend Developer",
    level: "Intermediate",
    skill: "Database",
    type: "conceptual",
    question: "What is database normalization intended to reduce?",
    options: [
      "Unnecessary data redundancy",
      "Network speed",
      "Password length",
      "HTTP requests",
    ],
    correctAnswer: 0,
    explanation:
      "Normalization organizes relational data to reduce redundancy and update anomalies.",
  },

  {
    id: "be-i-03",
    career: "Backend Developer",
    level: "Intermediate",
    skill: "Authentication",
    type: "conceptual",
    question: "What is authorization?",
    options: [
      "Determining what an authenticated user can access",
      "Verifying identity",
      "Hashing passwords",
      "Starting a server",
    ],
    correctAnswer: 0,
    explanation:
      "Authorization determines permissions after identity has been established.",
  },

  {
    id: "be-a-01",
    career: "Backend Developer",
    level: "Advanced",
    skill: "Architecture",
    type: "conceptual",
    question: "What is horizontal scaling?",
    options: [
      "Adding more server instances",
      "Increasing RAM on one server",
      "Deleting servers",
      "Reducing database size",
    ],
    correctAnswer: 0,
    explanation:
      "Horizontal scaling adds more instances to distribute workload.",
  },

  {
    id: "be-a-02",
    career: "Backend Developer",
    level: "Advanced",
    skill: "Caching",
    type: "conceptual",
    question: "Why is caching used?",
    options: [
      "To reduce repeated expensive operations",
      "To delete databases",
      "To disable APIs",
      "To replace authentication",
    ],
    correctAnswer: 0,
    explanation:
      "Caching stores reusable results to reduce latency and backend workload.",
  },
];

/* =========================================================
   CLOUD ENGINEER
========================================================= */

const cloudQuestions = [
  {
    id: "cl-b-01",
    career: "Cloud Engineer",
    level: "Beginner",
    skill: "Cloud Fundamentals",
    type: "conceptual",
    question: "What is cloud computing?",
    options: [
      "On-demand access to computing resources over a network",
      "Only local storage",
      "A programming language",
      "A database query",
    ],
    correctAnswer: 0,
    explanation:
      "Cloud computing provides computing resources as services over a network.",
  },

  {
    id: "cl-b-02",
    career: "Cloud Engineer",
    level: "Beginner",
    skill: "Networking",
    type: "conceptual",
    question: "What does IP address identify?",
    options: [
      "A network interface or host address",
      "A password",
      "A database table",
      "A programming variable",
    ],
    correctAnswer: 0,
    explanation:
      "An IP address identifies a network interface or host within an IP network.",
  },

  {
    id: "cl-b-03",
    career: "Cloud Engineer",
    level: "Beginner",
    skill: "Linux",
    type: "conceptual",
    question: "Which command lists files in a typical Linux shell?",
    options: ["ls", "cd", "pwd", "mkdir"],
    correctAnswer: 0,
    explanation: "ls lists directory contents.",
  },

  {
    id: "cl-i-01",
    career: "Cloud Engineer",
    level: "Intermediate",
    skill: "Containers",
    type: "conceptual",
    question: "What is Docker commonly used for?",
    options: [
      "Packaging applications with their dependencies",
      "Creating spreadsheets",
      "Writing SQL only",
      "Replacing all networks",
    ],
    correctAnswer: 0,
    explanation:
      "Docker packages applications and dependencies into portable containers.",
  },

  {
    id: "cl-i-02",
    career: "Cloud Engineer",
    level: "Intermediate",
    skill: "CI/CD",
    type: "conceptual",
    question: "What is CI/CD primarily intended to improve?",
    options: [
      "Automated build, testing and delivery workflows",
      "Manual password storage",
      "HTML styling",
      "Database normalization",
    ],
    correctAnswer: 0,
    explanation:
      "CI/CD automates integration, testing and deployment workflows.",
  },

  {
    id: "cl-i-03",
    career: "Cloud Engineer",
    level: "Intermediate",
    skill: "Infrastructure",
    type: "conceptual",
    question: "What does infrastructure as code mean?",
    options: [
      "Managing infrastructure through machine-readable configuration",
      "Writing only frontend code",
      "Storing passwords in HTML",
      "Replacing servers with JavaScript",
    ],
    correctAnswer: 0,
    explanation:
      "Infrastructure as code manages infrastructure using version-controlled configuration/code.",
  },

  {
    id: "cl-a-01",
    career: "Cloud Engineer",
    level: "Advanced",
    skill: "Scalability",
    type: "conceptual",
    question: "What is auto-scaling?",
    options: [
      "Automatically adjusting resources based on demand",
      "Manually restarting a laptop",
      "Deleting cloud resources",
      "Changing CSS automatically",
    ],
    correctAnswer: 0,
    explanation:
      "Auto-scaling adjusts capacity based on workload or configured policies.",
  },

  {
    id: "cl-a-02",
    career: "Cloud Engineer",
    level: "Advanced",
    skill: "High Availability",
    type: "conceptual",
    question: "Why deploy across multiple availability zones?",
    options: [
      "To reduce the impact of a single-zone failure",
      "To remove networking",
      "To eliminate authentication",
      "To reduce source code",
    ],
    correctAnswer: 0,
    explanation:
      "Multiple availability zones can improve resilience against failures affecting one zone.",
  },
];

/* =========================================================
   CAREER ALIASES
========================================================= */

export const careerAliases = {
  "Full Stack Developer": "Full Stack Developer",
  "Backend Developer": "Backend Developer",
  "Data Scientist": "Data Scientist",
  "AI / ML Engineer": "AI / ML Engineer",
  "Cybersecurity Engineer": "Cybersecurity Engineer",
  "Cloud Engineer": "Cloud Engineer",
};

/* =========================================================
   ALL QUESTIONS
========================================================= */

export const assessmentQuestions = [
  ...fullStackQuestions,
  ...dataScientistQuestions,
  ...aiMlQuestions,
  ...cybersecurityQuestions,
  ...backendQuestions,
  ...cloudQuestions,
];

/* =========================================================
   GET QUESTIONS
========================================================= */

export const getAssessmentQuestions = (career, level) => {
  const normalizedCareer = careerAliases[career] || career;

  const questions = assessmentQuestions.filter(
    (question) =>
      question.career === normalizedCareer && question.level === level,
  );

  return questions;
};

/* =========================================================
   RANDOMIZE
========================================================= */

export const shuffleQuestions = (questions) => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

/* =========================================================
   GET RANDOM QUESTIONS
========================================================= */

export const getRandomAssessmentQuestions = (career, level, count = 8) => {
  const questions = getAssessmentQuestions(career, level);

  const shuffled = shuffleQuestions(questions);

  /*
    If the requested level does not have enough questions,
    supplement from the closest available level.
  */

  if (shuffled.length >= count) {
    return shuffled.slice(0, count);
  }

  const careerQuestions = assessmentQuestions.filter(
    (question) => question.career === (careerAliases[career] || career),
  );

  return shuffleQuestions(careerQuestions).slice(
    0,
    Math.min(count, careerQuestions.length),
  );
};

export default assessmentQuestions;
