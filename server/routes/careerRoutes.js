const express = require("express");
const neo4jDriver = require("../config/neo4j");

const router = express.Router();

// Get all careers with their required skills
router.get("/", async (req, res) => {
  const session = neo4jDriver.session();

  try {
    const result = await session.run(`
      MATCH (c:Career)-[:REQUIRES]->(s:Skill)
      RETURN c.name AS career,
             c.description AS description,
             collect(s.name) AS skills
      ORDER BY c.name
    `);

    const careers = result.records.map((record) => ({
      career: record.get("career"),
      description: record.get("description"),
      skills: record.get("skills"),
    }));

    res.json({
      success: true,
      data: careers,
    });
  } catch (error) {
    console.error("Career API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch careers",
      error: error.message,
    });
  } finally {
    await session.close();
  }
});

module.exports = router;
