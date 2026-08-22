const express = require("express");
const multer = require("multer");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { analyzeResume } = require("../controllers/resumeController");

/* =========================================================
   MULTER CONFIG
========================================================= */

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (req, file, cb) => {
    const isPDF =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      return cb(new Error("Only PDF resume files are allowed."));
    }

    cb(null, true);
  },
});

/* =========================================================
   RESUME ANALYSIS
========================================================= */

router.post("/analyze", protect, upload.single("resume"), analyzeResume);

module.exports = router;
