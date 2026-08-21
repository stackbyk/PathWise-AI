const express = require("express");

const router = express.Router();

const {
  getDailyChallenge,
  submitChallenge,
} = require("../controllers/challengeController");

const { protect } = require("../middleware/authMiddleware");

// =====================================================
// DAILY CHALLENGE
// =====================================================

// Get today's challenge
router.get("/daily", protect, getDailyChallenge);

// Submit today's challenge
router.post("/daily/complete", protect, submitChallenge);

module.exports = router;
