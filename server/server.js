const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "../.env" });

// MongoDB
const connectDB = require("./config/db");

// Neo4j
const neo4jDriver = require("./config/neo4j");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get("/", (req, res) => {
  res.send("PathWise API is running...");
});
app.get("/test-route", (req, res) => {
  res.send("TEST ROUTE WORKS!");
});

// Import Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/neo4j", require("./routes/neo4jRoutes"));
app.use("/api/careers", require("./routes/careerRoutes"));
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
// app.use("/api/ml", require("./routes/mlRoutes"));

// Future Routes
// app.use("/api/careers", require("./routes/careerRoutes"));
// app.use("/api/skills", require("./routes/skillRoutes"));
// app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
// app.use("/api/ml", require("./routes/mlRoutes"));

// Test Neo4j Connection
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Test Neo4j after server starts
  await testNeo4jConnection();
});
