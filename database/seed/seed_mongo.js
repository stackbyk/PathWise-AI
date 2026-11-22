const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const connectDB = require("../../server/config/db");

const User = require("../../server/models/User");
const Career = require("../../server/models/Career");
const Skill = require("../../server/models/Skill");
const Resource = require("../../server/models/Resource");

const seedDB = async () => {
  try {
    // =====================================================
    // CONNECT TO MONGODB
    // =====================================================

    await connectDB();

    // =====================================================
    // CLEAR EXISTING DATA
    // =====================================================

    await User.deleteMany({});
    await Career.deleteMany({});
    await Skill.deleteMany({});
    await Resource.deleteMany({});

    console.log("🧹 Existing data cleared");

    // =====================================================
    // 1. DEMO USERS
    // Passwords are plain text here.
    // User.js pre-save middleware hashes them once.
    // =====================================================

    await User.create([
      {
        name: "Demo Student",
        email: "student@example.com",
        password: "Student@123",
        role: "student",
        xp: 450,
        streak: 3,
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "Admin@123",
        role: "admin",
      },
    ]);

    console.log("✅ Users created");

    // =====================================================
    // 2. SKILLS
    // These names must match seedNeo4j.js
    // =====================================================

    const html = await Skill.create({
      name: "HTML",
      description: "Structure of web pages",
      category: "Frontend",
    });

    const css = await Skill.create({
      name: "CSS",
      description: "Styling and layout for web pages",
      category: "Frontend",
    });

    const javascript = await Skill.create({
      name: "JavaScript",
      description: "Web programming language",
      category: "Frontend",
    });

    const react = await Skill.create({
      name: "React",
      description: "JavaScript library for building user interfaces",
      category: "Frontend",
    });

    const node = await Skill.create({
      name: "Node.js",
      description: "JavaScript runtime for backend development",
      category: "Backend",
    });

    const express = await Skill.create({
      name: "Express.js",
      description: "Web framework for Node.js",
      category: "Backend",
    });

    const mongodb = await Skill.create({
      name: "MongoDB",
      description: "NoSQL database",
      category: "Database",
    });

    const sql = await Skill.create({
      name: "SQL",
      description: "Structured Query Language",
      category: "Database",
    });

    const python = await Skill.create({
      name: "Python",
      description: "General-purpose programming language",
      category: "Programming",
    });

    const pandas = await Skill.create({
      name: "Pandas",
      description: "Python library for data analysis",
      category: "Data Science",
    });

    const machineLearning = await Skill.create({
      name: "Machine Learning",
      description: "Algorithms and techniques for learning from data",
      category: "Data Science",
    });

    const rest = await Skill.create({
      name: "REST APIs",
      description: "API architecture for web applications",
      category: "Backend",
    });

    console.log("✅ Skills created");

    // =====================================================
    // 3. CAREERS
    // =====================================================

    await Career.create([
      {
        title: "Full Stack Developer",
        description:
          "Build complete web applications from frontend to backend.",
        difficulty: "Advanced",
        estimatedDuration: "6 months",

        requiredSkills: [
          {
            skillId: html._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: css._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: javascript._id,
            minProficiency: "Advanced",
          },
          {
            skillId: react._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: node._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: express._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: mongodb._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: rest._id,
            minProficiency: "Advanced",
          },
        ],
      },

      {
        title: "Frontend Developer",
        description: "Build interactive user interfaces.",
        difficulty: "Intermediate",
        estimatedDuration: "4 months",

        requiredSkills: [
          {
            skillId: html._id,
            minProficiency: "Advanced",
          },
          {
            skillId: css._id,
            minProficiency: "Advanced",
          },
          {
            skillId: javascript._id,
            minProficiency: "Advanced",
          },
          {
            skillId: react._id,
            minProficiency: "Advanced",
          },
        ],
      },

      {
        title: "Backend Developer",
        description: "Build server-side applications, APIs and databases.",
        difficulty: "Intermediate",
        estimatedDuration: "5 months",

        requiredSkills: [
          {
            skillId: javascript._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: node._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: express._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: mongodb._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: sql._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: rest._id,
            minProficiency: "Intermediate",
          },
        ],
      },

      {
        title: "Data Scientist",
        description:
          "Use data, statistics and machine learning to solve problems.",
        difficulty: "Advanced",
        estimatedDuration: "6 months",

        requiredSkills: [
          {
            skillId: python._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: pandas._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: sql._id,
            minProficiency: "Intermediate",
          },
          {
            skillId: machineLearning._id,
            minProficiency: "Intermediate",
          },
        ],
      },
    ]);

    console.log("✅ Careers created");

    // =====================================================
    // 4. RESOURCES
    // =====================================================

    await Resource.create([
      {
        title: "HTML Fundamentals",
        url: "https://example.com/html",
        type: "Video",
        difficulty: "Beginner",
        skillId: html._id,
        tags: ["html", "web", "basics"],
      },

      {
        title: "CSS Fundamentals",
        url: "https://example.com/css",
        type: "Video",
        difficulty: "Beginner",
        skillId: css._id,
        tags: ["css", "styling", "web"],
      },

      {
        title: "Advanced JavaScript",
        url: "https://example.com/javascript",
        type: "Course",
        difficulty: "Advanced",
        skillId: javascript._id,
        tags: ["javascript", "closures", "promises"],
      },

      {
        title: "React Hooks Deep Dive",
        url: "https://example.com/react",
        type: "Tutorial",
        difficulty: "Intermediate",
        skillId: react._id,
        tags: ["react", "hooks", "state"],
      },

      {
        title: "Node.js Masterclass",
        url: "https://example.com/node",
        type: "Course",
        difficulty: "Intermediate",
        skillId: node._id,
        tags: ["node", "backend", "server"],
      },

      {
        title: "Express.js Guide",
        url: "https://example.com/express",
        type: "Tutorial",
        difficulty: "Intermediate",
        skillId: express._id,
        tags: ["express", "node", "backend"],
      },

      {
        title: "MongoDB Fundamentals",
        url: "https://example.com/mongodb",
        type: "Course",
        difficulty: "Beginner",
        skillId: mongodb._id,
        tags: ["mongodb", "database", "nosql"],
      },

      {
        title: "SQL Fundamentals",
        url: "https://example.com/sql",
        type: "Course",
        difficulty: "Beginner",
        skillId: sql._id,
        tags: ["sql", "database", "queries"],
      },

      {
        title: "Python Programming",
        url: "https://example.com/python",
        type: "Course",
        difficulty: "Beginner",
        skillId: python._id,
        tags: ["python", "programming", "basics"],
      },

      {
        title: "Pandas for Data Analysis",
        url: "https://example.com/pandas",
        type: "Tutorial",
        difficulty: "Intermediate",
        skillId: pandas._id,
        tags: ["pandas", "python", "data"],
      },

      {
        title: "Machine Learning Fundamentals",
        url: "https://example.com/machine-learning",
        type: "Course",
        difficulty: "Intermediate",
        skillId: machineLearning._id,
        tags: ["machine learning", "ml", "python"],
      },

      {
        title: "REST API Development",
        url: "https://example.com/rest",
        type: "Tutorial",
        difficulty: "Intermediate",
        skillId: rest._id,
        tags: ["rest", "api", "backend"],
      },
    ]);

    console.log("✅ Resources created");

    console.log("");
    console.log("🎉 DATABASE SEED COMPLETED SUCCESSFULLY!");
    console.log("");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Database seed failed:", error);

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error("Error closing MongoDB:", closeError.message);
    }

    process.exit(1);
  }
};

seedDB();
