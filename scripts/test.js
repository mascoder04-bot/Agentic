// scripts/test.js
// Test script to verify environment and dependencies

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.error(`${colors.red}✗ ${msg}${colors.reset}`),
  warn: (msg) => console.warn(`${colors.yellow}⚠ ${msg}${colors.reset}`),
};

console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`);
console.log(`${colors.blue}  Agentic Repository Test${colors.reset}`);
console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}\n`);

let passed = 0;
let failed = 0;

// Test 1: Node.js version
log.info('Test 1: Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].slice(1));
if (majorVersion >= 14) {
  log.success(`Node.js ${nodeVersion} (required: >= 14.0.0)`);
  passed++;
} else {
  log.error(`Node.js ${nodeVersion} is too old (required: >= 14.0.0)`);
  failed++;
}

// Test 2: npm installation
log.info('Test 2: Checking npm...');
try {
  require.resolve('npm');
  log.success('npm is installed');
  passed++;
} catch {
  log.warn('npm not found in require, but it may still be available globally');
  passed++;
}

// Test 3: package.json exists
log.info('Test 3: Checking package.json...');
if (fs.existsSync(path.join(__dirname, '..', 'package.json'))) {
  log.success('package.json found');
  passed++;
} else {
  log.error('package.json not found');
  failed++;
}

// Test 4: .env.example exists
log.info('Test 4: Checking .env.example...');
if (fs.existsSync(path.join(__dirname, '..', '.env.example'))) {
  log.success('.env.example found');
  passed++;
} else {
  log.error('.env.example not found');
  failed++;
}

// Test 5: .env file exists
log.info('Test 5: Checking .env file...');
const envExists = fs.existsSync(path.join(__dirname, '..', '.env'));
if (envExists) {
  log.success('.env file found');
  passed++;
} else {
  log.warn('.env file not found - run: cp .env.example .env');
  failed++;
}

// Test 6: API key in .env
log.info('Test 6: Checking API key configuration...');
if (envExists) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey && apiKey !== 'sk-or-v1-your-actual-api-key-here') {
    log.success('API key is configured');
    passed++;
  } else if (!apiKey) {
    log.error('OPENROUTER_API_KEY not found in .env');
    failed++;
  } else {
    log.error('OPENROUTER_API_KEY is using placeholder value - add your real key');
    failed++;
  }
} else {
  log.warn('Cannot check API key - .env file not found');
  failed++;
}

// Test 7: Dependencies installed
log.info('Test 7: Checking installed dependencies...');
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const hasDotenv = fs.existsSync(path.join(nodeModulesPath, 'dotenv'));
const hasNodeFetch = fs.existsSync(path.join(nodeModulesPath, 'node-fetch'));

if (hasDotenv && hasNodeFetch) {
  log.success('All dependencies installed (dotenv, node-fetch)');
  passed++;
} else {
  log.error(`Missing dependencies:`);
  if (!hasDotenv) log.error('  - dotenv');
  if (!hasNodeFetch) log.error('  - node-fetch');
  log.error('Run: npm install');
  failed++;
}

// Test 8: Script file exists
log.info('Test 8: Checking script file...');
if (fs.existsSync(path.join(__dirname, 'agentic.js'))) {
  log.success('scripts/agentic.js found');
  passed++;
} else {
  log.error('scripts/agentic.js not found');
  failed++;
}

// Summary
console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`);
console.log(`${colors.blue}  Test Results${colors.reset}`);
console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);
console.log(`\n${colors.green}Passed: ${passed}${colors.reset}`);
console.log(`${colors.red}Failed: ${failed}${colors.reset}\n`);

if (failed === 0) {
  log.success('All tests passed! You are ready to run: npm start');
  process.exit(0);
} else {
  log.error('Some tests failed. Please fix the issues above.');
  log.info('Quick fixes:');
  if (!envExists) {
    console.log('  1. cp .env.example .env');
  }
  console.log('  2. npm install');
  console.log('  3. Edit .env and add your OpenRouter API key');
  console.log('  4. npm start');
  process.exit(1);
}
