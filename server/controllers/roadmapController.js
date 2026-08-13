const Roadmap = require('../models/Roadmap');
const Career = require('../models/Career');
const User = require('../models/User');
const Resource = require('../models/Resource');
const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const generateRoadmap = async (req, res) => {
  try {
    const { careerId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId).populate('skills.skillId');
    const career = await Career.findById(careerId).populate('requiredSkills.skillId');

    if (!user || !career) {
      return res.status(404).json({ message: 'User or Career not found' });
    }

    // Format for ML service
    const userSkills = user.skills.map(s => ({
      skillId: s.skillId._id.toString(),
      proficiency: s.proficiency
    }));

    const requiredSkills = career.requiredSkills.map(s => ({
      skillId: s.skillId._id.toString(),
      minProficiency: s.minProficiency
    }));

    // 1. Get Skill Gap
    const gapResponse = await axios.post(`${ML_SERVICE_URL}/api/ml/skill-gap`, {
      required_skills: requiredSkills,
      user_skills: userSkills
    });
    const missingSkills = gapResponse.data.missing_skills;

    // If no missing skills, they are ready!
    if (missingSkills.length === 0) {
      return res.json({ message: 'You already have all required skills!', nodes: [] });
    }

    const missingSkillIds = missingSkills.map(m => m.skillId);

    // 2. Get Topological Order
    const topoResponse = await axios.post(`${ML_SERVICE_URL}/api/ml/topological-order`, {
      missing_skills: missingSkillIds
    });
    
    // Some skills in topo sort might be prerequisites they already have. Filter to only missing skills.
    const order = topoResponse.data.order;
    const sortedMissingSkills = order.filter(id => missingSkillIds.includes(id));

    // Fallback if DAG fails or doesn't cover all nodes: append remaining
    const remaining = missingSkillIds.filter(id => !sortedMissingSkills.includes(id));
    const finalOrder = [...sortedMissingSkills, ...remaining];

    // 3. Create Roadmap Nodes
    const nodes = [];
    const allResources = await Resource.find({});
    const resourcesData = allResources.map(r => ({
      id: r._id.toString(),
      text: `${r.title} ${r.description || ''} ${r.tags.join(' ')}`,
      skillId: r.skillId.toString()
    }));

    for (let i = 0; i < finalOrder.length; i++) {
      const sId = finalOrder[i];
      const gapInfo = missingSkills.find(m => m.skillId === sId);
      
      // Get recommendations
      const recResponse = await axios.post(`${ML_SERVICE_URL}/api/ml/recommend-resources`, {
        user_needs: `I need to learn this skill to proficiency ${gapInfo.requiredProficiency}`,
        resources: resourcesData.filter(r => r.skillId === sId)
      });
      
      const recommendedResources = recResponse.data.recommendations.map(r => r.id);

      nodes.push({
        skillId: sId,
        status: i === 0 ? 'Available' : 'Locked', // First one is available
        priority: i,
        recommendedResources
      });
    }

    // Save to DB
    const newRoadmap = await Roadmap.create({
      userId,
      careerId,
      nodes,
      edges: [] // Edges can be populated later if needed for frontend graph
    });

    user.currentCareer = careerId;
    await user.save();

    res.status(201).json(newRoadmap);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getMyRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('nodes.skillId')
      .populate('nodes.recommendedResources');
      
    if (!roadmap) return res.status(404).json({ message: 'No roadmap found' });
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateRoadmap, getMyRoadmap };
