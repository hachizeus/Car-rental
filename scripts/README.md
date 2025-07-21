# Project Scripts

This directory contains utility scripts for the Car Rental Website project.

## Available Scripts

### check-unused-deps.js

Checks for potentially unused dependencies in the project.

```bash
node scripts/check-unused-deps.js
```

This script scans the source code for imports of each dependency listed in package.json and reports any that don't appear to be used. Note that this is a simple check and may have false positives, especially for dependencies that are:

- Used indirectly (imported by other dependencies)
- Used in configuration files
- Used via dynamic imports
- Referenced without explicit imports

## Adding New Scripts

When adding new scripts to this directory:

1. Make sure to document them in this README
2. Use descriptive names that indicate their purpose
3. Include usage instructions as comments at the top of each script
4. Consider adding them to package.json as npm scripts for easier execution