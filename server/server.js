const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config({ path: ".env" });

// MongoDB
const connectDB = require("./config/db");

// Neo4j
const neo4jDriver = require("./config/neo4j");

// Authentication middleware
const { protect } = require("./middleware/authMiddleware");

// Profile controller
const { updateUserProfile } = require("./controllers/authController");

// Connect to MongoDB
connectDB();

const app = express();

// =========================================================
// MIDDLEWARE
// =========================================================

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

// =========================================================
// AUTH ROUTES
// =========================================================

app.use("/api/auth", require("./routes/authRoutes"));

// =========================================================
// DIRECT PROFILE UPDATE ROUTE
// =========================================================
//
// IMPORTANT:
// This route is intentionally registered directly here
// instead of depending on authRoutes.js.
//
// Frontend:
// POST /api/auth/update-profile
//
// Authentication:
// protect middleware
//
// Controller:
// updateUserProfile
//
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

// Future Routes
// app.use("/api/ml", require("./routes/mlRoutes"));

// =========================================================
// TEST NEO4J CONNECTION
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
  console.log(`Server running on port ${PORT}`);

  console.log("Profile update route: POST /api/auth/update-profile");

  await testNeo4jConnection();
});
