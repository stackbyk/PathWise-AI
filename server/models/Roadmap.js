const mongoose = require('mongoose');

const roadmapNodeSchema = new mongoose.Schema({
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  status: { type: String, enum: ['Locked', 'Available', 'In Progress', 'Completed'], default: 'Locked' },
  priority: { type: Number, default: 0 },
  recommendedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }]
});

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
  nodes: [roadmapNodeSchema],
  edges: [{
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    target: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
  }],
  progressPercentage: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
