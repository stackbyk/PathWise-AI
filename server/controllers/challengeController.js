const Challenge = require("../models/Challenge");

// =====================================================
// GET DAILY CHALLENGE
// =====================================================

const getDailyChallenge = async (req, res) => {
  try {
    const challenges = await Challenge.find({ active: true }).select(
      "-correctAnswer -__v",
    );

    if (!challenges.length) {
      return res.status(404).json({
        message: "No challenges available.",
      });
    }

    // Use the current date to make the same challenge
    // appear throughout the day.
    const today = new Date();

    const dateSeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();

    const index = dateSeed % challenges.length;

    const challenge = challenges[index];

    res.status(200).json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error("Get daily challenge error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load daily challenge.",
    });
  }
};

// =====================================================
// SUBMIT CHALLENGE
// =====================================================

const submitChallenge = async (req, res) => {
  try {
    const { challengeId, selectedAnswer } = req.body;

    if (!challengeId || selectedAnswer === undefined) {
      return res.status(400).json({
        success: false,
        message: "Challenge ID and selected answer are required.",
      });
    }

    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found.",
      });
    }

    const isCorrect =
      Number(selectedAnswer) === Number(challenge.correctAnswer);

    res.status(200).json({
      success: true,
      correct: isCorrect,
      correctAnswer: challenge.correctAnswer,
      explanation: challenge.explanation,
      xpEarned: isCorrect ? challenge.xp : 0,
    });
  } catch (error) {
    console.error("Submit challenge error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit challenge.",
    });
  }
};

module.exports = {
  getDailyChallenge,
  submitChallenge,
};
