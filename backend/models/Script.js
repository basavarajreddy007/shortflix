const mongoose = require('mongoose');

const scriptSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    mood: { type: String },
    characters: { type: String },
    content: { type: String, required: true },
    analysis: {
        storyQuality: Number,
        dialogueStrength: Number,
        characterDepth: Number,
        emotionalImpact: Number,
        suggestions: [String],
        predictedRating: Number
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Script', scriptSchema);
