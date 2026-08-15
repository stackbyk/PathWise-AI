const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const Career = require("../models/Career");
const Skill = require("../models/Skill");

const MONGO_URI = process.env.MONGODB_URI;

const careers = [
  {
    title: "Frontend Developer",
    description:
      "Builds the user interface and client-side applications.",
    difficulty: "Beginner",
    estimatedDuration: "6 months",
    skills: [
      ["HTML", "Beginner"],
      ["CSS", "Beginner"],
      ["JavaScript", "Intermediate"],
      ["React", "Intermediate"],
    ],
  },
  {
    title: "Backend Developer",
    description:
      "Builds server-side applications, APIs and databases.",
    difficulty: "Intermediate",
    estimatedDuration: "6 months",
    skills: [
      ["JavaScript", "Intermediate"],
      ["Node.js", "Intermediate"],
      ["Express.js", "Intermediate"],
      ["MongoDB", "Intermediate"],
      ["SQL", "Beginner"],
    ],
  },
  {
    title: "Data Scientist",
    description:
      "Uses data, statistics and machine learning to solve problems.",
    difficulty: "Advanced",
    estimatedDuration: "8 months",
    skills: [
      ["Python", "Intermediate"],
      ["Pandas", "Intermediate"],
      ["SQL", "Beginner"],
      ["Machine Learning", "Intermediate"],
    ],
  },
];

async function seedCareers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const mongoSkills = await Skill.find({});

    if (!mongoSkills.length) {
      throw new Error("No skills found in MongoDB.");
    }

    const skillMap = new Map(
      mongoSkills.map((skill) => [skill.name, skill._id])
    );

    await Career.deleteMany({});

    for (const career of careers) {
      const requiredSkills = [];

      for (const [skillName, proficiency] of career.skills) {
        const skillId = skillMap.get(skillName);

        if (!skillId) {
          console.warn(`Skill not found: ${skillName}`);
          continue;
        }

        requiredSkills.push({
          skillId,
          minProficiency: proficiency,
        });
      }

      await Career.create({
        title: career.title,
        description: career.description,
        difficulty: career.difficulty,
        estimatedDuration: career.estimatedDuration,
        requiredSkills,
      });
    }

    console.log("Careers seeded successfully!");

    const result = await Career.find({})
      .populate("requiredSkills.skillId", "name");

    console.log(JSON.stringify(result, null, 2));

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Career seed failed:", error);
    process.exit(1);
  }
}

seedCareers();