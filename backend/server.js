require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const { basicLimiter, authLimiter } = require('./middleware/rateLimiter');
const { cacheMiddleware } = require('./middleware/cache');
const errorHandler = require('./middleware/errorHandler');
const { logger, morganMiddleware, requestIdMiddleware } = require('./middleware/logger');

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');

const app = express();

// Security and optimization middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001', 'https://car-rental-admin-r2oz.onrender.com', 'https://car-rental-frontend-7jwd.onrender.com'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(basicLimiter); // Apply rate limiting to all routes

// Logging middleware
app.use(requestIdMiddleware);
app.use(morganMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/cars', cacheMiddleware(300), carRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use(errorHandler);

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
});