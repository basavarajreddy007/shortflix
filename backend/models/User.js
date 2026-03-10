const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date },
    otpExpiry: { type: Date }, // Support existing field naming
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'creator', 'admin'], default: 'user' },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
