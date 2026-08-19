const Groq = require("groq-sdk");

const User = require("../models/User");
const Roadmap = require("../models/Roadmap");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    // Get authenticated user
    const user = await User.findById(req.user._id)
      .populate("currentCareer")
      .populate("skills.skillId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get user's latest roadmap
    const roadmap = await Roadmap.findOne({
      userId: user._id,
    })
      .populate("careerId")
      .populate("nodes.skillId");

    // Prepare user's skills
    const skills = user.skills.map((skill) => ({
      name: skill.skillId?.name || "Unknown Skill",
      proficiency: skill.proficiency,
    }));

    // Prepare roadmap information
    const roadmapSkills =
      roadmap?.nodes?.map((node) => ({
        name: node.skillId?.name || "Unknown Skill",
        status: node.status,
        priority: node.priority,
      })) || [];

    // Build personalized context
    const userContext = {
      name: user.name,
      career: user.currentCareer?.title || "No career selected",
      careerDescription: user.currentCareer?.description || "",
      skills,
      courses: user.courses || [],
      xp: user.xp,
      streak: user.streak,
      badges: user.badges || [],
      roadmapProgress: roadmap?.progressPercentage || 0,
      roadmapCompleted: roadmap?.isCompleted || false,
      roadmapSkills,
    };

    // Get message from frontend
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please provide a message",
      });
    }

    // Send personalized context to Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are PathWise AI, an intelligent career guidance assistant.

Your job is to help the user with:
- Career guidance
- Learning roadmaps
- Skill gaps
- Programming and technical concepts
- Project guidance
- Learning resources
- Placement preparation
- Progress motivation

IMPORTANT:
You have access to the user's PathWise profile and roadmap.

Always use the provided user context when relevant.
Do not invent skills, career information, roadmap progress, or achievements.
If information is missing, clearly say that it is not available.

Give practical, concise and personalized answers.
Do not overwhelm the user with unnecessary information.

USER CONTEXT:
${JSON.stringify(userContext, null, 2)}
          `,
        },

        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0]?.message?.content;

    return res.status(200).json({
      reply,
      userContext,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    return res.status(500).json({
      message: "Something went wrong with the AI chatbot",
      error: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};
