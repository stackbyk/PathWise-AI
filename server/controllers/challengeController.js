const Challenge = require("../models/Challenge");

// =====================================================
// GET DAILY CHALLENGE
// =====================================================

const getDailyChallenge = async (req, res) => {
  try {
    console.log("========================================");
    console.log("GET DAILY CHALLENGE");
    console.log("User:", req.user?._id || req.user?.id || "Unknown");
    console.log("========================================");

    const challenges = await Challenge.find({
      active: true,
    }).select("-correctAnswer -__v");

    console.log("Active challenges found:", challenges.length);

    if (!challenges.length) {
      return res.status(404).json({
        success: false,
        message: "No active challenges available.",
      });
    }

    // =====================================================
    // DATE-BASED SELECTION
    // =====================================================

    const today = new Date();

    const dateSeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();

    // Same challenge for everyone throughout the day
    const index = dateSeed % challenges.length;

    const challenge = challenges[index];

    console.log("Today's challenge:", challenge._id);

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error("Get daily challenge error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load daily challenge.",
    });
  }
};

// =====================================================
// SUBMIT DAILY CHALLENGE
// =====================================================

const submitChallenge = async (req, res) => {
  try {
    console.log("========================================");
    console.log("SUBMIT DAILY CHALLENGE");
    console.log("User:", req.user?._id || req.user?.id || "Unknown");
    console.log("Body:", req.body);
    console.log("========================================");

    const { challengeId, selectedAnswer } = req.body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!challengeId || selectedAnswer === undefined) {
      return res.status(400).json({
        success: false,
        message: "Challenge ID and selected answer are required.",
      });
    }

    const answerIndex = Number(selectedAnswer);

    if (
      Number.isNaN(answerIndex) ||
      !Number.isInteger(answerIndex) ||
      answerIndex < 0 ||
      answerIndex > 3
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer selected.",
      });
    }

    // =====================================================
    // FIND CHALLENGE
    // =====================================================

    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found.",
      });
    }

    // =====================================================
    // CHECK ANSWER
    // =====================================================

    const isCorrect = answerIndex === Number(challenge.correctAnswer);

    // =====================================================
    // WRONG ANSWER
    // =====================================================

    if (!isCorrect) {
      return res.status(200).json({
        success: true,
        correct: false,
        message: "Not quite! Try again. 💪",
        xpEarned: 0,
      });
    }

    // =====================================================
    // CORRECT ANSWER
    // =====================================================

    const earnedXP = Number(challenge.xp) || 20;

    return res.status(200).json({
      success: true,
      correct: true,
      message: "Correct answer! 🎉",
      explanation: challenge.explanation || "",
      xpEarned: earnedXP,
    });
  } catch (error) {
    console.error("Submit challenge error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit challenge.",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getDailyChallenge,
  submitChallenge,
};
