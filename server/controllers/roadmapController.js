const Roadmap = require("../models/Roadmap");
const Career = require("../models/Career");
const User = require("../models/User");
const Resource = require("../models/Resource");
const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

// =========================================================
// GENERATE ROADMAP
// =========================================================
const generateRoadmap = async (req, res) => {
  try {
    console.log("========== GENERATE ROADMAP ==========");

    // Get career ID from request
    const { careerId } = req.body;

    // Get logged-in user from JWT
    const userId = req.user._id;

    console.log("User ID:", userId);
    console.log("Career ID:", careerId);

    // Validate careerId
    if (!careerId) {
      return res.status(400).json({
        message: "careerId is required",
      });
    }

    // =====================================================
    // FIND USER
    // =====================================================
    const currentUser = await User.findById(userId).populate("skills.skillId");

    if (!currentUser) {
      console.log("USER NOT FOUND:", userId);

      return res.status(404).json({
        message: "User not found",
        userId: userId.toString(),
      });
    }

    console.log("User found:", currentUser.email);

    // =====================================================
    // FIND CAREER
    // =====================================================
    const career = await Career.findById(careerId).populate(
      "requiredSkills.skillId",
    );

    if (!career) {
      console.log("CAREER NOT FOUND:", careerId);

      return res.status(404).json({
        message: "Career not found",
        careerId,
      });
    }

    console.log("Career found:", career.title);

    // =====================================================
    // USER SKILLS
    // =====================================================
    const userSkills = (currentUser.skills || [])
      .filter((skill) => skill.skillId)
      .map((skill) => ({
        skillId: skill.skillId._id.toString(),
        proficiency: skill.proficiency || 0,
      }));

    // =====================================================
    // REQUIRED CAREER SKILLS
    // =====================================================
    const requiredSkills = (career.requiredSkills || [])
      .filter((skill) => skill.skillId)
      .map((skill) => ({
        skillId: skill.skillId._id.toString(),
        minProficiency: skill.minProficiency || 1,
      }));

    console.log("User skills:", userSkills);
    console.log("Required skills:", requiredSkills);

    // If career has no required skills
    if (requiredSkills.length === 0) {
      return res.status(400).json({
        message: "This career has no required skills",
      });
    }

    // =====================================================
    // 1. SKILL GAP ANALYSIS
    // =====================================================
    console.log("Calling ML skill-gap service...");

    const gapResponse = await axios.post(`${ML_SERVICE_URL}/api/ml/skill-gap`, {
      required_skills: requiredSkills,
      user_skills: userSkills,
    });

    const missingSkills = gapResponse.data.missing_skills || [];

    console.log("Missing skills:", missingSkills);

    // =====================================================
    // USER ALREADY READY
    // =====================================================
    if (missingSkills.length === 0) {
      currentUser.currentCareer = career._id;
      await currentUser.save();

      return res.status(200).json({
        message: "You already have all required skills!",
        nodes: [],
        careerId: career._id,
      });
    }

    const missingSkillIds = missingSkills.map((skill) => skill.skillId);

    // =====================================================
    // 2. TOPOLOGICAL ORDER
    // =====================================================
    console.log("Calling ML topological-order service...");

    let finalOrder = [];

    try {
      const topoResponse = await axios.post(
        `${ML_SERVICE_URL}/api/ml/topological-order`,
        {
          missing_skills: missingSkillIds,
        },
      );

      const order = topoResponse.data.order || [];

      const sortedMissingSkills = order.filter((id) =>
        missingSkillIds.includes(id),
      );

      const remaining = missingSkillIds.filter(
        (id) => !sortedMissingSkills.includes(id),
      );

      finalOrder = [...sortedMissingSkills, ...remaining];
    } catch (mlError) {
      console.log("Topological ordering failed. Using fallback order.");

      finalOrder = missingSkillIds;
    }

    console.log("Final skill order:", finalOrder);

    // =====================================================
    // 3. LOAD RESOURCES
    // =====================================================
    const allResources = await Resource.find({});

    const resourcesData = allResources.map((resource) => ({
      id: resource._id.toString(),
      text: `${resource.title} ${
        resource.description || ""
      } ${(resource.tags || []).join(" ")}`,
      skillId: resource.skillId ? resource.skillId.toString() : null,
    }));

    // =====================================================
    // 4. CREATE ROADMAP NODES
    // =====================================================
    const nodes = [];

    for (let i = 0; i < finalOrder.length; i++) {
      const skillId = finalOrder[i];

      const gapInfo = missingSkills.find((skill) => skill.skillId === skillId);

      let recommendedResources = [];

      try {
        const skillResources = resourcesData.filter(
          (resource) => resource.skillId === skillId,
        );

        if (skillResources.length > 0) {
          const recResponse = await axios.post(
            `${ML_SERVICE_URL}/api/ml/recommend-resources`,
            {
              user_needs: `I need to learn this skill to proficiency ${
                gapInfo?.requiredProficiency || 1
              }`,
              resources: skillResources,
            },
          );

          recommendedResources = (recResponse.data.recommendations || []).map(
            (resource) => resource.id,
          );
        }
      } catch (resourceError) {
        console.log(`Resource recommendation failed for skill ${skillId}`);
      }

      nodes.push({
        skillId,
        status: i === 0 ? "Available" : "Locked",
        priority: i,
        recommendedResources,
      });
    }

    // =====================================================
    // 5. SAVE ROADMAP
    // =====================================================
    const newRoadmap = await Roadmap.create({
      userId: currentUser._id,
      careerId: career._id,
      nodes,
      edges: [],
    });

    // =====================================================
    // 6. UPDATE USER CAREER
    // =====================================================
    currentUser.currentCareer = career._id;
    await currentUser.save();

    console.log("Roadmap created:", newRoadmap._id);

    // =====================================================
    // RESPONSE
    // =====================================================
    return res.status(201).json(newRoadmap);
  } catch (error) {
    console.error("GENERATE ROADMAP ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================================
// GET MY ROADMAP
// =========================================================
const getMyRoadmap = async (req, res) => {
  try {
    console.log("========== GET MY ROADMAP ==========");

    const userId = req.user._id;

    console.log("User ID:", userId);

    const roadmap = await Roadmap.findOne({
      userId,
    })
      .sort({ createdAt: -1 })
      .populate("nodes.skillId")
      .populate("nodes.recommendedResources");

    if (!roadmap) {
      return res.status(404).json({
        message: "No roadmap found",
      });
    }

    return res.status(200).json(roadmap);
  } catch (error) {
    console.error("GET ROADMAP ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateRoadmap,
  getMyRoadmap,
};
