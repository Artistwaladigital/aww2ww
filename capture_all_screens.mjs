import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\f22bdfae-0ffb-404e-9989-0d726abc4063';

const baseReset = {
  activeTab: 'home',
  activeChatId: null,
  isFullscreenReelOpen: false,
  isReelCommentsOpen: false,
  isAddMusicOpen: false,
  isCreateReelOpen: false,
  isCreatePostOpen: false,
  isProfileOptionsOpen: false,
  isNewChatModalOpen: false,
  isAboutModalOpen: false,
  activeStoryIndex: null,
  activePostComments: null,
};

const screens = [
  {
    name: '01_home_feed.png',
    title: 'Home Feed',
    setup: {
      ...baseReset,
      activeTab: 'home',
    }
  },
  {
    name: '02_auth_login.png',
    title: 'Login Screen',
    setup: {
      ...baseReset,
      activeTab: 'auth',
      authScreen: 'login',
    }
  },
  {
    name: '03_auth_signup.png',
    title: 'Sign Up Screen',
    setup: {
      ...baseReset,
      activeTab: 'auth',
      authScreen: 'signup',
    }
  },
  {
    name: '04_messenger_inbox.png',
    title: 'Messenger Inbox',
    setup: {
      ...baseReset,
      activeTab: 'messenger',
    }
  },
  {
    name: '05_messenger_chat.png',
    title: 'Direct Chat with Ananya Saha',
    setup: {
      ...baseReset,
      activeTab: 'messenger',
      activeChatId: 'chat_ananya',
    }
  },
  {
    name: '06_messenger_new_chat.png',
    title: 'New Message Selector',
    setup: {
      ...baseReset,
      activeTab: 'messenger',
      isNewChatModalOpen: true,
    }
  },
  {
    name: '07_creator_profile.png',
    title: 'Creator Profile (Ananya Saha)',
    setup: {
      ...baseReset,
      activeTab: 'profile',
    }
  },
  {
    name: '08_profile_options.png',
    title: 'Profile Options Bottom Sheet',
    setup: {
      ...baseReset,
      activeTab: 'profile',
      isProfileOptionsOpen: true,
    }
  },
  {
    name: '09_reels_explore.png',
    title: 'Reels Explore Grid',
    setup: {
      ...baseReset,
      activeTab: 'reels',
    }
  },
  {
    name: '10_reels_fullscreen.png',
    title: 'Fullscreen Reel Player',
    setup: {
      ...baseReset,
      activeTab: 'reels',
      isFullscreenReelOpen: true,
    }
  },
  {
    name: '11_reels_comments.png',
    title: 'Reels Comments Sheet',
    setup: {
      ...baseReset,
      activeTab: 'reels',
      isFullscreenReelOpen: true,
      isReelCommentsOpen: true,
    }
  },
  {
    name: '12_reels_music.png',
    title: 'Add Music Sheet',
    setup: {
      ...baseReset,
      activeTab: 'reels',
      isFullscreenReelOpen: true,
      isAddMusicOpen: true,
    }
  },
  {
    name: '13_groups_hub.png',
    title: 'Community Groups Hub',
    setup: {
      ...baseReset,
      activeTab: 'groups',
    }
  },
  {
    name: '14_watch_feed.png',
    title: 'Watch Video Feed',
    setup: {
      ...baseReset,
      activeTab: 'watch',
    }
  }
];

async function capture() {
  console.log('Starting screenshot captures...');
  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1200, height: 1000, deviceScaleFactor: 2 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  for (const s of screens) {
    console.log(`Setting state for: ${s.title}`);
    await page.evaluate((opts) => {
      if (window.__aww2wwNavigate) {
        window.__aww2wwNavigate(opts);
      }
    }, s.setup);

    await new Promise(r => setTimeout(r, 600));

    // Capture the phone mockup element
    const phoneElement = await page.$('.relative.my-auto');
    const targetFile = path.join(outDir, s.name);

    if (phoneElement) {
      await phoneElement.screenshot({ path: targetFile });
    } else {
      await page.screenshot({ path: targetFile });
    }

    console.log(`Saved screenshot: ${s.name}`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
