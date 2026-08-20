const mongoose = require("mongoose");
require("dotenv").config();

const Challenge = require("./models/Challenge");

const challenges = [
  // =====================================================
  // 🧮 APTITUDE — 5
  // =====================================================

  {
    question: "A train travels 360 km in 4 hours. What is its average speed?",
    options: ["80 km/h", "90 km/h", "100 km/h", "120 km/h"],
    correctAnswer: 1,
    explanation: "Average speed = Distance / Time = 360 / 4 = 90 km/h.",
    category: "Aptitude",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "A number is increased by 20% and then decreased by 20%. What is the overall change?",
    options: ["No change", "4% decrease", "4% increase", "2% decrease"],
    correctAnswer: 1,
    explanation:
      "Take 100 → 120 → 96. The final value is 4% less than the original.",
    category: "Aptitude",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "If 5 workers can complete a task in 12 days, how many days will 10 workers take, assuming equal efficiency?",
    options: ["3 days", "5 days", "6 days", "10 days"],
    correctAnswer: 2,
    explanation: "Workers × Days is constant. 5 × 12 = 10 × x, so x = 6 days.",
    category: "Aptitude",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "The average of 5 numbers is 24. If one number is removed, the average becomes 20. What was the removed number?",
    options: ["30", "36", "40", "44"],
    correctAnswer: 2,
    explanation:
      "Total = 5 × 24 = 120. Remaining total = 4 × 20 = 80. Removed number = 40.",
    category: "Aptitude",
    difficulty: "Medium",
    xp: 15,
    active: true,
  },

  {
    question:
      "A shopkeeper gives a 10% discount on an item marked at ₹800. What is the selling price?",
    options: ["₹700", "₹720", "₹740", "₹760"],
    correctAnswer: 1,
    explanation: "10% of ₹800 = ₹80. Selling price = ₹800 − ₹80 = ₹720.",
    category: "Aptitude",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  // =====================================================
  // 💻 PROGRAMMING — 4
  // =====================================================

  {
    question:
      "What is the time complexity of accessing an element by index in a Java array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation:
      "Array elements are stored contiguously, so accessing an element by index takes constant time.",
    category: "Programming",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1,
    explanation:
      "The `extends` keyword is used when one Java class inherits another class.",
    category: "Programming",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "What will be the output of: `int x = 5; System.out.println(x++ + ++x);`?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    explanation:
      "x++ returns 5 and then x becomes 6. ++x makes it 7. Therefore 5 + 7 = 12.",
    category: "Programming",
    difficulty: "Medium",
    xp: 15,
    active: true,
  },

  {
    question:
      "Which data structure follows the Last In, First Out (LIFO) principle?",
    options: ["Queue", "Stack", "Linked List", "Heap"],
    correctAnswer: 1,
    explanation:
      "A stack follows LIFO: the last element inserted is the first one removed.",
    category: "Programming",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  // =====================================================
  // 🧠 DSA — 3
  // =====================================================

  {
    question:
      "What is the worst-case time complexity of binary search on a sorted array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation:
      "Binary search halves the search space at every step, giving O(log n).",
    category: "DSA",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "Which traversal of a Binary Search Tree produces elements in sorted order?",
    options: ["Preorder", "Postorder", "Inorder", "Level Order"],
    correctAnswer: 2,
    explanation:
      "Inorder traversal of a BST visits nodes in ascending sorted order.",
    category: "DSA",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "Which algorithm is commonly used to find the shortest path from a source vertex in a graph with non-negative edge weights?",
    options: ["DFS", "BFS", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    correctAnswer: 2,
    explanation:
      "Dijkstra's algorithm finds shortest paths from a source when edge weights are non-negative.",
    category: "DSA",
    difficulty: "Medium",
    xp: 15,
    active: true,
  },

  // =====================================================
  // 🗄️ SQL — 2
  // =====================================================

  {
    question: "Which SQL clause is used to filter rows before grouping?",
    options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"],
    correctAnswer: 1,
    explanation: "WHERE filters individual rows before GROUP BY is applied.",
    category: "SQL",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "Which SQL command is used to remove all rows from a table while keeping the table structure?",
    options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
    correctAnswer: 2,
    explanation:
      "TRUNCATE removes all rows while keeping the table itself and its structure.",
    category: "SQL",
    difficulty: "Medium",
    xp: 15,
    active: true,
  },

  // =====================================================
  // 🖥️ DBMS — 2
  // =====================================================

  {
    question: "Which normal form removes partial dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 1,
    explanation:
      "Second Normal Form (2NF) removes partial dependencies on part of a composite key.",
    category: "DBMS",
    difficulty: "Medium",
    xp: 15,
    active: true,
  },

  {
    question:
      "Which property of a transaction ensures that database operations are completed entirely or not at all?",
    options: ["Consistency", "Isolation", "Atomicity", "Durability"],
    correctAnswer: 2,
    explanation:
      "Atomicity ensures that a transaction is treated as one indivisible unit.",
    category: "DBMS",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  // =====================================================
  // 🌐 COMPUTER NETWORKS — 2
  // =====================================================

  {
    question:
      "Which protocol is primarily used to translate domain names into IP addresses?",
    options: ["HTTP", "FTP", "DNS", "SMTP"],
    correctAnswer: 2,
    explanation:
      "DNS translates human-readable domain names such as google.com into IP addresses.",
    category: "Computer Networks",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question:
      "Which layer of the OSI model is responsible for routing packets?",
    options: ["Data Link", "Network", "Transport", "Session"],
    correctAnswer: 1,
    explanation:
      "The Network layer handles logical addressing and routing between networks.",
    category: "Computer Networks",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  // =====================================================
  // ⚙️ OPERATING SYSTEMS — 2
  // =====================================================

  {
    question:
      "Which scheduling algorithm gives each process a fixed time slice?",
    options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
    correctAnswer: 2,
    explanation:
      "Round Robin assigns each process a fixed time quantum in a cyclic manner.",
    category: "OS",
    difficulty: "Easy",
    xp: 10,
    active: true,
  },

  {
    question: "Which of the following is necessary for a deadlock to occur?",
    options: [
      "Preemption",
      "Circular Wait",
      "Unlimited Resources",
      "Process Termination",
    ],
    correctAnswer: 1,
    explanation:
      "Circular wait is one of the four necessary conditions for deadlock.",
    category: "OS",
    difficulty: "Medium",
    xp: 15,
    active: true,
  },
];

// =====================================================
// SEED DATABASE
// =====================================================

const seedChallenges = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected.");

    await Challenge.deleteMany({});

    await Challenge.insertMany(challenges);

    console.log(`✅ ${challenges.length} challenges inserted successfully.`);

    await mongoose.disconnect();

    console.log("MongoDB disconnected.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Challenge seed error:", error);
    process.exit(1);
  }
};

seedChallenges();
