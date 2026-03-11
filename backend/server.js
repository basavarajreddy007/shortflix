require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();


const app = express();
app.use(cors());
app.use(express.json());

// Root Route - Welcome Message
app.get('/', (req, res) => {
    res.json({
        message: 'ShortFlix Backend API is running',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            videos: '/api/videos',
            ai: '/api/ai'
        },
        status: 'healthy'
    });
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'shortflix-backend'
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/ai', aiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
        stack: err.stack
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
