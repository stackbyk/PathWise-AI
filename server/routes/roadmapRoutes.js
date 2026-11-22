const express = require('express');
const router = express.Router();
const { generateRoadmap, getMyRoadmap } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateRoadmap);
router.get('/me', protect, getMyRoadmap);

module.exports = router;
