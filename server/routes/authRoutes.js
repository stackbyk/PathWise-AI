const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// =========================================================
// AUTHENTICATION
// =========================================================

router.post("/register", registerUser);

router.post("/login", loginUser);

// =========================================================
// CURRENT USER PROFILE
// =========================================================

// Get current logged-in user's profile
router.get("/me", protect, getUserProfile);

// =========================================================
// UPDATE PROFILE
// =========================================================

// We are intentionally using POST instead of PUT
// to avoid the PUT /api/auth/me route problem.
router.post("/update-profile", protect, updateUserProfile);

// =========================================================
// EXPORT
// =========================================================

module.exports = router;
