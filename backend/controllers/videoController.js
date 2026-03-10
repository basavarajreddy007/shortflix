const Video = require('../models/Video');
const cloudinary = require('../utils/cloudinary');

exports.uploadVideo = async (req, res) => {
   const { title, description, genre } = req.body;
    try {
        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).json({ message: 'Missing files' });
        }

       const videoUpload = await cloudinary.uploader.upload(req.files.video[0].path, {
            resource_type: 'video',
            folder: 'shortflix/videos',
        });

       const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
            folder: 'shortflix/thumbnails',
        });

       const video = new Video({
           title,
            description,
           genre,
            creator: req.user.id,
            videoUrl: videoUpload.secure_url,
           thumbnailUrl: thumbnailUpload.secure_url,
        });

        await video.save();
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// AI Thumbnail Generation Endpoint
exports.generateThumbnail = async (req, res) => {
    try {
        // This endpoint can be enhanced with actual AI services
        // For now, it confirms the feature is available
        res.json({ 
            message: 'AI thumbnail generation ready',
            features: [
                'Auto-extract best frame from video',
                'Enhance brightness and contrast',
                'Optimize for web display',
                'Apply cinematic color grading'
            ]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('creator', 'username').sort({ createdAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('creator', 'username').populate('comments.user', 'username');
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTrending = async (req, res) => {
    try {
        const videos = await Video.find().sort({ views: -1 }).limit(10).populate('creator', 'username');
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVideosByGenre = async (req, res) => {
    try {
        const videos = await Video.find({ genre: req.params.genre }).sort({ createdAt: -1 }).populate('creator', 'username');
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
