const express = require("express");
const Career = require("../models/Career");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const careers = await Career.find({})
      .populate("requiredSkills.skillId", "name")
      .sort({ title: 1 });

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
  }
});

module.exports = router;