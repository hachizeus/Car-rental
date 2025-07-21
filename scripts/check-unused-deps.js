/**
 * Simple script to check for potentially unused dependencies
 * Run with: node scripts/check-unused-deps.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'frontend', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get all dependencies
const allDependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

// Get all source files
const sourceDir = path.join(__dirname, '..', 'frontend', 'src');
const getAllFiles = (dir) => {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getAllFiles(path.join(dir, item.name))];
    } else if (/\.(ts|tsx|js|jsx)$/.test(item.name)) {
      files.push(path.join(dir, item.name));
    }
  }
  
  return files;
};

const sourceFiles = getAllFiles(sourceDir);
const sourceContent = sourceFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n');

// Check each dependency
console.log('Checking for potentially unused dependencies...');
console.log('Note: This is a simple check and may have false positives.\n');

const potentiallyUnused = [];

Object.keys(allDependencies).forEach(dep => {
  // Skip certain dependencies that might be used indirectly
  if (['react', 'react-dom', 'typescript', 'vite'].includes(dep)) {
    return;
  }
  
  // Check if the dependency name appears in the source code
  const regex = new RegExp(`(import|require).*['"]${dep}(/|['"])`, 'g');
  if (!regex.test(sourceContent)) {
    potentiallyUnused.push(dep);
  }
});

if (potentiallyUnused.length > 0) {
  console.log('Potentially unused dependencies:');
  potentiallyUnused.forEach(dep => {
    console.log(`- ${dep}`);
  });
} else {
  console.log('No potentially unused dependencies found.');
}

console.log('\nDone!');