const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
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
        "OS",
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

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

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    explanation: {
      type: String,
      required: true,
      trim: true,
    },

    xp: {
      type: Number,
      default: 10,
      min: 0,
    },

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
