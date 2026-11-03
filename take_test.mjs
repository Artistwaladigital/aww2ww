import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\f22bdfae-0ffb-404e-9989-0d726abc4063';

async function run() {
  console.log('Launching browser with:', execPath);
  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1280, height: 1000, deviceScaleFactor: 2 }
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const testFile = path.join(outDir, 'screen_home_test.png');
  await page.screenshot({ path: testFile });
  console.log('Saved test screenshot to:', testFile);

  await browser.close();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
