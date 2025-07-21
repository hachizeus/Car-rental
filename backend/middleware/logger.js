const winston = require('winston');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure Winston logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'car-rental-api' },
  transports: [
    // Write to all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Create a Morgan token for request ID
morgan.token('id', (req) => req.id);

// Create a Morgan token for user ID
morgan.token('user', (req) => {
  return req.user ? req.user._id : 'anonymous';
});

// Create a stream object with a 'write' function that will be used by Morgan
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// Morgan middleware
const morganMiddleware = morgan(
  ':id :remote-addr - :user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  { stream: morganStream }
);

// Request ID middleware
const requestIdMiddleware = (req, res, next) => {
  req.id = Math.random().toString(36).substring(2, 10);
  next();
};

module.exports = { logger, morganMiddleware, requestIdMiddleware };