const express = require("express");
const Skill = require("../models/Skill");

const router = express.Router();

// Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Skills API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
});

module.exports = router;
