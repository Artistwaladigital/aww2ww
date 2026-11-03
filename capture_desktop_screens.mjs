import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\f22bdfae-0ffb-404e-9989-0d726abc4063';

const desktopScreens = [
  {
    name: '15_desktop_home_feed.png',
    title: 'Desktop Web Home Feed',
    setup: {
      viewMode: 'desktop',
      activeTab: 'home',
      activeChatId: null,
      isFullscreenReelOpen: false,
    }
  },
  {
    name: '16_desktop_profile.png',
    title: 'Desktop Creator Profile',
    setup: {
      viewMode: 'desktop',
      activeTab: 'profile',
      activeChatId: null,
      isFullscreenReelOpen: false,
    }
  },
  {
    name: '17_desktop_reels.png',
    title: 'Desktop Reels Grid',
    setup: {
      viewMode: 'desktop',
      activeTab: 'reels',
      isFullscreenReelOpen: false,
    }
  },
  {
    name: '18_desktop_messenger.png',
    title: 'Desktop Messenger Chat',
    setup: {
      viewMode: 'desktop',
      activeTab: 'messenger',
      activeChatId: 'chat_ananya',
      isFullscreenReelOpen: false,
    }
  }
];

async function capture() {
  console.log('Capturing desktop web views...');
  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1440, height: 960, deviceScaleFactor: 1.5 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  for (const s of desktopScreens) {
    console.log(`Setting state for: ${s.title}`);
    await page.evaluate((opts) => {
      if (window.__aww2wwNavigate) {
        window.__aww2wwNavigate(opts);
      }
    }, s.setup);

    await new Promise(r => setTimeout(r, 800));

    const targetFile = path.join(outDir, s.name);
    await page.screenshot({ path: targetFile });
    console.log(`Saved desktop screenshot: ${s.name}`);
  }

  await browser.close();
  console.log('All desktop web screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error during desktop capture:', err);
  process.exit(1);
});
