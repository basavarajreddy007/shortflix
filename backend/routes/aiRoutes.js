const express = require('express');
const { generateScript, analyzeScript } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/test', (req, res) => res.json({ message: "AI Routes are reachable!" }));
router.post('/generate-script', protect, generateScript);

router.post('/analyze-script', protect, analyzeScript);

module.exports = router;
