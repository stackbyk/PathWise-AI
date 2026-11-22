const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  explanation: { type: String }
});

const quizSchema = new mongoose.Schema({
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  questions: [questionSchema],
  passingScore: { type: Number, default: 70 } // Percentage
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
