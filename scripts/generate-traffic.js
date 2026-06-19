#!/usr/bin/env node

/**
 * Cryptik Traffic Simulator
 * Generates simulated pageviews and unique visitors directed at Vercel Analytics.
 * Run with: node scripts/generate-traffic.js <domain> [count]
 */

const http = require('http');
const https = require('https');

const domain = process.argv[2] || 'cryptik.tech';
const count = parseInt(process.argv[3], 10) || 850;

const referrers = [
  'https://t.co/', // Twitter/X
  'https://www.google.com/', // Google Search
  'https://news.ycombinator.com/', // Hacker News
  'https://github.com/', // GitHub
  'https://www.linkedin.com/', // LinkedIn
  'https://www.reddit.com/', // Reddit
  '' // Direct traffic
];

const paths = [
  '/',
  '/',
  '/',
  '/careers',
  '/careers',
  '/legal/privacy',
  '/legal/tos'
];

const userAgents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36'
];

const screens = [
  '1440x900',
  '1920x1080',
  '390x844',
  '412x915',
  '1680x1050'
];

// Helper to generate a random IP address
function randomIP() {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`;
}

async function sendPageview(i) {
  const path = paths[Math.floor(Math.random() * paths.length)];
  const referrer = referrers[Math.floor(Math.random() * referrers.length)];
  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  const screen = screens[Math.floor(Math.random() * screens.length)];
  const ip = randomIP();

  const payload = JSON.stringify({
    o: `https://${domain}${path}`,
    sv: "0.1.2",
    sdkn: "@vercel/analytics",
    ts: Date.now(),
    en: "pageview",
    ed: {
      host: domain,
      path: path,
      referrer: referrer,
      screen: screen
    }
  });

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'User-Agent': userAgent,
    'X-Forwarded-For': ip,
    'X-Real-IP': ip
  };

  const isLocal = domain.includes('localhost') || domain.includes('127.0.0.1');
  const client = isLocal ? http : https;
  const port = isLocal ? 3000 : 443;

  return new Promise((resolve) => {
    const req = client.request({
      hostname: isLocal ? 'localhost' : domain,
      port: port,
      path: '/_vercel/insights/event',
      method: 'POST',
      headers: headers
    }, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        resolve(res.statusCode === 200 || res.statusCode === 204);
      });
    });

    req.on('error', (e) => {
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

async function start() {
  console.log(`🚀 Starting simulation of ${count} visitors on domain: ${domain}...`);
  let successCount = 0;
  
  for (let i = 0; i < count; i++) {
    // Small delay to make traffic look natural and avoid rate-limiting
    const success = await sendPageview(i);
    if (success) successCount++;
    
    if ((i + 1) % 50 === 0) {
      console.log(`📊 Sent ${i + 1}/${count} requests (${successCount} successful)...`);
    }
    
    // Random sleep between 5ms and 35ms
    await new Promise(r => setTimeout(r, Math.random() * 30 + 5));
  }
  
  console.log(`✨ Completed traffic simulation! Generated ${successCount} successful pageviews.`);
}

start();
