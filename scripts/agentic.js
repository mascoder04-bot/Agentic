// scripts/agentic.js
// Example usage of OpenRouter chat/completions API.
// Usage:
//   1) Copy .env.example to .env and set OPENROUTER_API_KEY
//   2) npm install
//   3) node scripts/agentic.js

require('dotenv').config();
const fetch = require('node-fetch');

const url = 'https://openrouter.ai/api/v1/chat/completions';
const headers = {
  'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
  'Content-Type': 'application/json'
};

const payload = {
  // Use a single model (string). If the service supports multiple models in one call,
  // adapt accordingly — most APIs expect a single `model` field.
  model: 'openai/gpt-6-astra',
  messages: [
    { role: 'user', content: "If you built the world's tallest skyscraper, what would you name it?" }
  ],
  // Set stream to false for a single JSON response. To stream, set stream: true and
  // implement proper SSE/chunk parsing (not shown here).
  stream: false
};

(async () => {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY not set. Create a .env file from .env.example or set the env var.');
    process.exit(1);
  }

  try {
    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!res.ok) {
      const text = await res.text();
      console.error('API error', res.status, text);
      process.exit(1);
    }
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Request failed', err);
    process.exit(1);
  }
})();
