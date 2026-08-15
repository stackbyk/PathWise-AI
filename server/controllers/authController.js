const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Skill = require("../models/Skill");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// =========================================================
// REGISTER
// =========================================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      authProvider: "email",
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================================
// LOGIN
// =========================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================================
// GET CURRENT USER
// =========================================================

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("currentCareer", "title name")
      .populate("skills.skillId", "name");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================================
// UPDATE CURRENT USER PROFILE
// =========================================================

const updateUserProfile = async (req, res) => {
  try {
    const { name, skills, courses, currentCareer } = req.body;

    console.log("========================================");
    console.log("PROFILE UPDATE REQUEST RECEIVED");
    console.log("User ID:", req.user._id);
    console.log("Name:", name);
    console.log("Skills:", skills);
    console.log("Courses:", courses);
    console.log("Current Career:", currentCareer);
    console.log("========================================");

    // -------------------------------------------------------
    // FIND USER
    // -------------------------------------------------------

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // -------------------------------------------------------
    // UPDATE NAME
    // -------------------------------------------------------

    if (name !== undefined) {
      const trimmedName = String(name).trim();

      if (!trimmedName) {
        return res.status(400).json({
          message: "Name cannot be empty.",
        });
      }

      user.name = trimmedName;
    }

    // -------------------------------------------------------
    // UPDATE SKILLS
    // -------------------------------------------------------

    if (Array.isArray(skills)) {
      const cleanedSkills = skills
        .map((skill) => {
          if (typeof skill === "string") {
            return skill.trim();
          }

          if (skill && typeof skill === "object") {
            return String(skill.name || skill.skillName || "").trim();
          }

          return "";
        })
        .filter(Boolean);

      const uniqueSkillNames = [
        ...new Map(
          cleanedSkills.map((skill) => [skill.toLowerCase(), skill]),
        ).values(),
      ];

      const skillDocuments = [];

      for (const skillName of uniqueSkillNames) {
        const escapedSkillName = skillName.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );

        const skill = await Skill.findOne({
          name: {
            $regex: `^${escapedSkillName}$`,
            $options: "i",
          },
        });

        if (skill) {
          skillDocuments.push(skill);
        }
      }

      user.skills = skillDocuments.map((skill) => ({
        skillId: skill._id,
        proficiency: "Beginner",
      }));
    }

    // -------------------------------------------------------
    // UPDATE COURSES
    // -------------------------------------------------------

    if (Array.isArray(courses)) {
      const cleanedCourses = courses
        .map((course) => String(course).trim())
        .filter(Boolean);

      user.courses = [...new Set(cleanedCourses)];
    }

    // -------------------------------------------------------
    // UPDATE CURRENT CAREER
    // -------------------------------------------------------

    if (currentCareer !== undefined) {
      if (currentCareer === null || currentCareer === "") {
        user.currentCareer = null;
      } else {
        user.currentCareer = currentCareer;
      }
    }

    // -------------------------------------------------------
    // SAVE
    // -------------------------------------------------------

    await user.save();

    // -------------------------------------------------------
    // FETCH UPDATED USER
    // -------------------------------------------------------

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate("currentCareer", "title name")
      .populate("skills.skillId", "name");

    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      xp: updatedUser.xp,
      streak: updatedUser.streak,
      badges: updatedUser.badges,
      skills: updatedUser.skills,
      courses: updatedUser.courses,
      currentCareer: updatedUser.currentCareer,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("========================================");
    console.error("UPDATE PROFILE ERROR:");
    console.error(error);
    console.error("========================================");

    return res.status(500).json({
      message: error.message || "Failed to update profile.",
    });
  }
};

// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
