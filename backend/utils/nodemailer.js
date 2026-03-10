const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/email.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFile))) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: `"ShortFlix" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'ShortFlix - Your OTP Verification Code',
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #E50914; text-align: center;">ShortFlix</h1>
                <p>Hello,</p>
                <p>Your OTP verification code is:</p>
                <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333;">
                    ${otp}
                </div>
                <p>This code will expire in 5 minutes.</p>
                <p>If you did not request this code, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 ShortFlix Streaming Platform</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] Success: Sent to ${email}. MessageId: ${info.messageId}\n`);
        return info;
    } catch (error) {
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] Error sending to ${email}: ${error.message}\n`);
        console.error('Nodemailer Error:', error);
        throw error;
    }
};

module.exports = { sendOTP };

