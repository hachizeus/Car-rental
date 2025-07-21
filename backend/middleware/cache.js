const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes default TTL

/**
 * Middleware for caching API responses
 * @param {number} ttl - Time to live in seconds
 */
const cacheMiddleware = (ttl = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Skip caching for specific routes
    if (req.path.includes('/cars/') && req.path.match(/\/cars\/[a-zA-Z0-9]+$/)) {
      // Skip caching for individual car details
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.json(cachedResponse);
      return;
    }

    // Store the original json method
    const originalJson = res.json;

    // Override res.json method
    res.json = function(body) {
      // Put the response in cache
      cache.set(key, body, ttl);
      
      // Call the original json method
      return originalJson.call(this, body);
    };

    next();
  };
};

/**
 * Clear cache for specific routes
 * @param {string|RegExp} pattern - Route pattern to clear
 */
const clearCache = (pattern) => {
  const keys = cache.keys();
  
  if (pattern instanceof RegExp) {
    keys.forEach(key => {
      if (pattern.test(key)) {
        cache.del(key);
      }
    });
  } else if (typeof pattern === 'string') {
    cache.del(pattern);
  }
};

module.exports = { cacheMiddleware, clearCache };