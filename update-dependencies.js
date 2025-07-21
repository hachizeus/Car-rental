const fs = require('fs');
const path = require('path');

// Update backend dependencies
const backendPackagePath = path.join(__dirname, 'backend', 'package.json');
if (fs.existsSync(backendPackagePath)) {
  const backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));
  
  // Add new dependencies
  backendPackage.dependencies = {
    ...backendPackage.dependencies,
    'helmet': '^7.1.0',
    'compression': '^1.7.4',
    'express-rate-limit': '^7.1.5',
    'node-cache': '^5.1.2',
    'winston': '^3.11.0',
    'morgan': '^1.10.0'
  };
  
  // Write updated package.json
  fs.writeFileSync(backendPackagePath, JSON.stringify(backendPackage, null, 2));
  console.log('Backend dependencies updated');
}

// Update frontend dependencies
const frontendPackagePath = path.join(__dirname, 'frontend', 'package.json');
if (fs.existsSync(frontendPackagePath)) {
  const frontendPackage = JSON.parse(fs.readFileSync(frontendPackagePath, 'utf8'));
  
  // Add new dependencies
  frontendPackage.dependencies = {
    ...frontendPackage.dependencies,
    'framer-motion': '^10.16.16',
    '@sentry/react': '^7.91.0'
  };
  
  // Write updated package.json
  fs.writeFileSync(frontendPackagePath, JSON.stringify(frontendPackage, null, 2));
  console.log('Frontend dependencies updated');
}

console.log('Done! Now run npm install in both backend and frontend directories.');