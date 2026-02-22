const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Security headers
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

// CORS — allow frontend origin
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

// Body parser
app.use(express.json());

// Rate limiting — 200 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Database Connection
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// --- Serve React frontend in production ---
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
}

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    console.error(`[ERROR] ${err.message}`);
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
