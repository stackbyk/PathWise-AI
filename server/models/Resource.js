const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  type: { type: String, enum: ['Course', 'Tutorial', 'Documentation', 'Video', 'Project'], required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  duration: { type: String },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
