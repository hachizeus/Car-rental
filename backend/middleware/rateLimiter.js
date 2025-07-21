const rateLimit = require('express-rate-limit');

// Basic rate limiter for all routes
const basicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit to 1000 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.'
});

// Stricter rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Increased limit to 20 login attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts, please try again later.'
});

module.exports = { basicLimiter, authLimiter };