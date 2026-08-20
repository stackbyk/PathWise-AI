const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const challengeRoutes = require("./routes/challengeRoutes");

dotenv.config({ path: ".env" });

const connectDB = require("./config/db");
const neo4jDriver = require("./config/neo4j");

const { protect } = require("./middleware/authMiddleware");
const { updateUserProfile } = require("./controllers/authController");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// =========================================================
// BASIC ROUTES
// =========================================================

app.get("/", (req, res) => {
  res.send("PathWise API is running...");
});

app.get("/test-route", (req, res) => {
  res.send("TEST ROUTE WORKS!");
});

app.get("/test-challenge", (req, res) => {
  res.json({
    success: true,
    message: "Challenge test route works!",
  });
});

// =========================================================
// AUTH ROUTES
// =========================================================

app.use("/api/auth", require("./routes/authRoutes"));

// =========================================================
// DAILY CHALLENGE ROUTES
// =========================================================

app.use("/api/challenges", challengeRoutes);

// =========================================================
// PROFILE UPDATE
// =========================================================

app.post("/api/auth/update-profile", protect, updateUserProfile);

// =========================================================
// OTHER API ROUTES
// =========================================================

app.use("/api/neo4j", require("./routes/neo4jRoutes"));

app.use("/api/careers", require("./routes/careerRoutes"));

app.use("/api/roadmaps", require("./routes/roadmapRoutes"));

app.use("/api/skills", require("./routes/skillRoutes"));

app.use("/api/chat", require("./routes/chatRoutes"));

// =========================================================
// NEO4J TEST
// =========================================================

async function testNeo4jConnection() {
  const session = neo4jDriver.session();

  try {
    await session.run("RETURN 1");
    console.log("Neo4j connected successfully!");
  } catch (error) {
    console.error("Neo4j connection failed:", error.message);
  } finally {
    await session.close();
  }
}

// =========================================================
// START SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log("----------------------------------------");
  console.log(`Server running on port ${PORT}`);
  console.log("----------------------------------------");

  console.log("Basic routes:");
  console.log("GET  /");
  console.log("GET  /test-route");
  console.log("GET  /test-challenge");

  console.log("----------------------------------------");

  console.log("API routes:");
  console.log("POST /api/auth/update-profile");
  console.log("GET  /api/challenges/daily");
  console.log("POST /api/challenges/daily/complete");

  console.log("----------------------------------------");

  await testNeo4jConnection();
});
