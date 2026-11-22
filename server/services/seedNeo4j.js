const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const neo4jDriver = require("../config/neo4j");
const Skill = require("../models/Skill");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const prerequisites = [
  ["HTML", "React"],
  ["CSS", "React"],
  ["JavaScript", "React"],
  ["JavaScript", "Node.js"],
  ["Node.js", "Express.js"],
  ["Python", "Pandas"],
  ["Pandas", "Machine Learning"],
];

async function seedNeo4j() {
  const session = neo4jDriver.session();

  try {
    console.log("🌱 Starting Neo4j seed...");

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Get skills from MongoDB
    const mongoSkills = await Skill.find({});

    if (!mongoSkills.length) {
      throw new Error("No skills found in MongoDB. Seed MongoDB skills first.");
    }

    console.log(`📚 Found ${mongoSkills.length} skills in MongoDB`);

    // Clear existing Neo4j graph
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // -------------------------
    // CAREERS
    // -------------------------

    await session.run(`
      CREATE
        (:Career {
          name: "Frontend Developer",
          description: "Builds the user interface and client-side applications."
        }),
        (:Career {
          name: "Backend Developer",
          description: "Builds server-side applications, APIs and databases."
        }),
        (:Career {
          name: "Data Scientist",
          description: "Uses data, statistics and machine learning to solve problems."
        })
    `);

    // -------------------------
    // SKILLS FROM MONGODB
    // -------------------------

    for (const skill of mongoSkills) {
      await session.run(
        `
        CREATE (:Skill {
          id: $id,
          name: $name,
          category: $category
        })
        `,
        {
          id: skill._id.toString(),
          name: skill.name,
          category: skill.category || "",
        },
      );
    }

    console.log("✅ Skills seeded with MongoDB IDs");

    // -------------------------
    // CAREER → SKILL RELATIONSHIPS
    // -------------------------

    const careerSkills = {
      "Frontend Developer": ["HTML", "CSS", "JavaScript", "React"],

      "Backend Developer": [
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SQL",
      ],

      "Data Scientist": ["Python", "Pandas", "SQL", "Machine Learning"],
    };

    for (const [careerName, skillNames] of Object.entries(careerSkills)) {
      for (const skillName of skillNames) {
        await session.run(
          `
          MATCH (career:Career {name: $careerName})
          MATCH (skill:Skill {name: $skillName})
          CREATE (career)-[:REQUIRES]->(skill)
          `,
          {
            careerName,
            skillName,
          },
        );
      }
    }

    console.log("✅ Career relationships created");

    // -------------------------
    // SKILL PREREQUISITES
    // -------------------------

    for (const [prerequisite, target] of prerequisites) {
      await session.run(
        `
        MATCH (a:Skill {name: $prerequisite})
        MATCH (b:Skill {name: $target})
        CREATE (a)-[:PREREQUISITE_FOR]->(b)
        `,
        {
          prerequisite,
          target,
        },
      );
    }

    console.log("✅ Prerequisite relationships created");

    // -------------------------
    // VERIFY
    // -------------------------

    const result = await session.run(`
      MATCH (a:Skill)-[:PREREQUISITE_FOR]->(b:Skill)
      RETURN a.name AS prerequisite, b.name AS skill
      ORDER BY prerequisite
    `);

    console.log("\n🔗 Prerequisite Graph:");

    result.records.forEach((record) => {
      console.log(`${record.get("prerequisite")} → ${record.get("skill")}`);
    });

    console.log("\n🎉 Neo4j seed completed successfully!");
  } catch (error) {
    console.error("❌ Neo4j seed failed:", error);
  } finally {
    await session.close();
    await neo4jDriver.close();

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

seedNeo4j();
