const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/nodemailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
    const { username, email } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user && user.isVerified) {
            return res.status(400).json({ message: 'User already exists and is verified. Please log in.' });
        }

        if (!user) {
            user = new User({ username, email });
        } else {
            // User exists but is not verified, update username if provided and send new OTP
            user.username = username;
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        await user.save();

        await sendOTP(email, otp);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !user.isVerified) {
            return res.status(404).json({
                message: !user ? 'Account not found. Please register first.' : 'Account not verified. Please register to complete your setup.'
            });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        await user.save();

        await sendOTP(email, otp);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username || user.name || 'User',
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('OTP Verification Error:', error);
        res.status(500).json({ message: error.message });
    }
};
