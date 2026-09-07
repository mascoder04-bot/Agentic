# Agentic

This repository contains an example "agentic" script that demonstrates safe usage of the OpenRouter chat completions API without committing secrets to the repository.

Files added:
- scripts/agentic.js — example Node.js script that reads OPENROUTER_API_KEY from environment and calls the API.
- .env.example — example env file with placeholder for the API key.
- .gitignore — ignores .env and node_modules.
- package.json — minimal package manifest for running the example.

Security note: DO NOT commit your real API keys. If a key was leaked, rotate/revoke it immediately.

Usage

1. Copy .env.example to .env and add your key:

   cp .env.example .env
   # edit .env and set your key

2. Install dependencies and run:

   npm install
   node scripts/agentic.js
