const express = require("express");

const router = express.Router();

const {
  getDailyChallenge,
  completeDailyChallenge,
} = require("../controllers/challengeController");

const { protect } = require("../middleware/authMiddleware");

router.get("/daily", protect, getDailyChallenge);

router.post("/daily/complete", protect, completeDailyChallenge);

module.exports = router;
