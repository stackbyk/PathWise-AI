const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    // =====================================================
    // CATEGORY
    // =====================================================

    category: {
      type: String,
      enum: [
        "DSA",
        "Aptitude",
        "Programming",
        "DBMS",
        "SQL",
        "Operating Systems",
        "Computer Networks",
        "Web Development",
        "Logical Reasoning",
      ],
      required: true,
    },

    // =====================================================
    // DIFFICULTY
    // =====================================================

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    // =====================================================
    // QUESTION
    // =====================================================

    question: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // OPTIONS
    // =====================================================

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (options) {
          return options.length === 4;
        },
        message: "A challenge must have exactly 4 options.",
      },
    },

    // =====================================================
    // CORRECT ANSWER
    // =====================================================
    // 0 = first option
    // 1 = second option
    // 2 = third option
    // 3 = fourth option

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    // =====================================================
    // EXPLANATION
    // =====================================================

    explanation: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // XP
    // =====================================================

    xp: {
      type: Number,
      default: 10,
      min: 0,
    },

    // =====================================================
    // ACTIVE
    // =====================================================

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Challenge", challengeSchema);
