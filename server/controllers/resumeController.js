const Groq = require("groq-sdk");
const { PDFParse } = require("pdf-parse");

const User = require("../models/User");
const Roadmap = require("../models/Roadmap");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =========================================================
   HELPERS
========================================================= */

const cleanJSONResponse = (text) => {
  if (!text) {
    throw new Error("AI returned an empty response");
  }

  let cleaned = text.trim();

  // Remove markdown code fences if Groq returns them
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Sometimes the model adds text before/after JSON.
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned);
};

const clampScore = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(number)));
};

/* =========================================================
   RESUME ANALYZER
========================================================= */

const analyzeResume = async (req, res) => {
  try {
    // -------------------------------------------------------
    // 1. CHECK FILE
    // -------------------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // -------------------------------------------------------
    // 2. CHECK GROQ KEY
    // -------------------------------------------------------

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing");

      return res.status(500).json({
        success: false,
        message: "AI service is not configured.",
      });
    }

    // -------------------------------------------------------
    // 3. GET AUTHENTICATED USER
    // -------------------------------------------------------

    const user = await User.findById(req.user._id)
      .populate("currentCareer")
      .populate("skills.skillId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -------------------------------------------------------
    // 4. GET USER ROADMAP
    // -------------------------------------------------------

    const roadmap = await Roadmap.findOne({
      userId: user._id,
    })
      .populate("careerId")
      .populate("nodes.skillId");

    // -------------------------------------------------------
    // 5. PREPARE USER CONTEXT
    // -------------------------------------------------------

    const career = user.currentCareer?.title || "No career selected";

    const careerDescription = user.currentCareer?.description || "";

    const userSkills =
      user.skills?.map((skill) => ({
        name: skill.skillId?.name || "Unknown Skill",
        proficiency: skill.proficiency ?? 0,
      })) || [];

    const roadmapSkills =
      roadmap?.nodes?.map((node) => ({
        name: node.skillId?.name || "Unknown Skill",
        status: node.status || "not_started",
        priority: node.priority || "normal",
      })) || [];

    // -------------------------------------------------------
    // 6. EXTRACT PDF TEXT
    // -------------------------------------------------------

    let pdfData;
    let resumeText;
    console.log("========== RESUME PDF DEBUG ==========");
    console.log("File name:", req.file.originalname);
    console.log("MIME type:", req.file.mimetype);
    console.log("File size:", req.file.size);
    console.log("Buffer exists:", !!req.file.buffer);
    console.log("Buffer length:", req.file.buffer?.length);
    console.log("======================================");
    try {
      const parser = new PDFParse({
        data: req.file.buffer,
      });

      const result = await parser.getText();

      resumeText = result.text?.trim();

      await parser.destroy();

      pdfData = {
        text: resumeText,
        numpages: result.total || null,
      };
    } catch (error) {
      console.error("PDF parsing error:", error);

      return res.status(400).json({
        success: false,
        message:
          "Could not read this PDF. Please upload a valid text-based PDF resume.",
      });
    }

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message:
          "No readable text was found in the PDF. Please upload a text-based resume PDF.",
      });
    }

    // Prevent unnecessarily huge prompts
    const MAX_RESUME_CHARACTERS = 30000;

    const truncatedResumeText =
      resumeText.length > MAX_RESUME_CHARACTERS
        ? resumeText.slice(0, MAX_RESUME_CHARACTERS)
        : resumeText;

    // -------------------------------------------------------
    // 7. AI PROMPT
    // -------------------------------------------------------

    const systemPrompt = `
You are PathWise Resume Analyzer, an expert ATS resume reviewer and career coach.

Your task is to analyze a user's resume specifically for their selected career.

IMPORTANT RULES:

1. Analyze ONLY information actually present in the resume.
2. Do not invent experience, education, skills, projects, certifications, or achievements.
3. If something is missing, return an empty array or clearly state that it is missing.
4. Evaluate the resume against the user's selected career.
5. Give practical and actionable suggestions.
6. Be honest with scores.
7. Do not give everyone a high score.
8. ATS score should consider:
   - keyword relevance
   - section structure
   - readability
   - standard resume formatting
   - measurable achievements
   - technical skill relevance
9. Career match should measure how well the resume aligns with the selected career.
10. Missing skills should be based on the career and the provided PathWise roadmap/user context.
11. Return ONLY valid JSON.
12. Do NOT use markdown.
13. Do NOT wrap the response in code fences.

RETURN EXACTLY THIS JSON STRUCTURE:

{
  "resumeScore": 0,
  "atsScore": 0,
  "careerMatchScore": 0,

  "summary": "",

  "detectedSkills": [
    {
      "name": "",
      "category": "",
      "evidence": ""
    }
  ],

  "missingSkills": [
    {
      "name": "",
      "importance": "High",
      "reason": ""
    }
  ],

  "strengths": [
    ""
  ],

  "weaknesses": [
    ""
  ],

  "projects": [
    {
      "name": "",
      "quality": "Strong",
      "feedback": ""
    }
  ],

  "experience": {
    "score": 0,
    "feedback": ""
  },

  "education": {
    "score": 0,
    "feedback": ""
  },

  "formatting": {
    "score": 0,
    "feedback": ""
  },

  "suggestions": [
    ""
  ],

  "recommendedActions": [
    ""
  ]
}

SCORING:

resumeScore:
Overall resume quality out of 100.

atsScore:
ATS compatibility out of 100.

careerMatchScore:
Alignment with selected career out of 100.

experience.score:
Quality and relevance of experience out of 100.

education.score:
Relevance and presentation of education out of 100.

formatting.score:
Resume structure/readability/ATS-friendly formatting out of 100.
`;

    const userPrompt = `
SELECTED CAREER:
${career}

CAREER DESCRIPTION:
${careerDescription}

USER'S PATHWISE SKILLS:
${JSON.stringify(userSkills, null, 2)}

PATHWISE ROADMAP SKILLS:
${JSON.stringify(roadmapSkills, null, 2)}

RESUME TEXT:
-------------------------
${truncatedResumeText}
-------------------------

Analyze this resume for the selected career.
`;

    // -------------------------------------------------------
    // 8. CALL GROQ
    // -------------------------------------------------------

    console.log("RESUME ANALYZER MODEL:", "openai/gpt-oss-20b");

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],

      temperature: 0.2,
      max_tokens: 3000,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("Groq did not return a resume analysis.");
    }

    // -------------------------------------------------------
    // 9. PARSE AI JSON
    // -------------------------------------------------------

    let analysis;

    try {
      analysis = cleanJSONResponse(aiResponse);
    } catch (error) {
      console.error("Failed to parse AI resume response:", aiResponse);

      return res.status(500).json({
        success: false,
        message: "The AI returned an invalid analysis. Please try again.",
      });
    }

    // -------------------------------------------------------
    // 10. NORMALIZE SCORES
    // -------------------------------------------------------

    analysis.resumeScore = clampScore(analysis.resumeScore);

    analysis.atsScore = clampScore(analysis.atsScore);

    analysis.careerMatchScore = clampScore(analysis.careerMatchScore);

    if (analysis.experience) {
      analysis.experience.score = clampScore(analysis.experience.score);
    }

    if (analysis.education) {
      analysis.education.score = clampScore(analysis.education.score);
    }

    if (analysis.formatting) {
      analysis.formatting.score = clampScore(analysis.formatting.score);
    }

    // -------------------------------------------------------
    // 11. RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      success: true,

      message: "Resume analyzed successfully.",

      career,

      resume: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        pageCount: pdfData.numpages || null,
      },

      analysis,
    });
  } catch (error) {
    console.error("Resume analyzer error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while analyzing the resume.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  analyzeResume,
};
