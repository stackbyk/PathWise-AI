const express = require("express");

const { createNode, findNodes } = require("../services/neo4jService");

const router = express.Router();

// Test Neo4j
router.get("/test", async (req, res) => {
  try {
    const result = await createNode("Test", {
      name: "PathWise",
      message: "Neo4j is working!",
    });

    res.json({
      success: true,
      message: "Neo4j test successful",
      data: result,
    });
  } catch (error) {
    console.error("Neo4j test error:", error);

    res.status(500).json({
      success: false,
      message: "Neo4j test failed",
      error: error.message,
    });
  }
});

// Get Test nodes
router.get("/test/nodes", async (req, res) => {
  try {
    const nodes = await findNodes("Test");

    res.json({
      success: true,
      data: nodes,
    });
  } catch (error) {
    console.error("Neo4j fetch error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Neo4j nodes",
      error: error.message,
    });
  }
});

module.exports = router;
