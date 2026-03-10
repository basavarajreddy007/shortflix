const express = require('express');
const multer= require('multer');
const { uploadVideo, getVideos, getVideoById, getTrending, getVideosByGenre, generateThumbnail } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get('/', getVideos);
router.get('/trending', getTrending);
router.get('/genre/:genre', getVideosByGenre);
router.get('/:id', getVideoById);
router.post('/upload', protect, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo);
router.post('/generate-thumbnail', protect, generateThumbnail);

module.exports = router;
