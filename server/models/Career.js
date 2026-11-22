const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  estimatedDuration: { type: String }, // e.g., "6 months"
  requiredSkills: [{
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    minProficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
