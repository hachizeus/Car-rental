// Keep Render service alive
const https = require('https');

const keepAlive = () => {
  const url = 'https://car-rental-backend-n66g.onrender.com/health';
  
  https.get(url, (res) => {
    console.log(`Keep-alive ping: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log('Keep-alive error:', err.message);
  });
};

// Ping every 14 minutes to prevent sleeping
setInterval(keepAlive, 14 * 60 * 1000);

module.exports = keepAlive;