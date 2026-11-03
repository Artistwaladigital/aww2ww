# aww2ww ♥ — Social Media Platform

> **Real People • Real Vibes**  
> A modern hybrid social network combining the community feed, groups, and discussions of **Facebook** with the creator aesthetics, stories, reels, and direct notes of **Instagram**.

---

## 🌟 Key Features

- **Hybrid Community Feed**: Stories carousel, *"What's on your mind? ✨"* post creator, mosaic collage post layouts (1/6 indicator, 5.2K views badge, Reel preview), and interactive Facebook-style reaction picker (👍 Like, ❤️ Love, 🥰 Care, 😆 Haha, 😮 Wow, 😢 Sad, 😡 Angry) with celebration confetti.
- **Messenger & Direct Chat**: Direct 1-on-1 chatting with Ananya Saha, real-time message exchange, photo attachments, auto-replies simulation, audio/video call modal, and Instagram-style thought **Notes**.
- **Reels & Video Experience**: Trending explore grid with category filters (*For You*, *Trending*, *Music*, *Dance*, *Travel*), featured hero banner, and vertical fullscreen player with creator follow, likes, comments drawer, virtual gift 🎁, and music drawer (*Bengali, Hindi, English, Lofi*).
- **Creator Profile & Highlights**: Banner with glowing neon crown (*Create Inspire Shine ✨*), verified badge ✓, stats (245 Posts | 2.4M Followers | 386 Following), story highlights circles, 3x3 post grid with pinned badges, and profile actions bottom sheet.
- **Dual Display Modes**: Seamlessly toggle between:
  - 💻 **Desktop Web Layout**: 3-column Facebook + Instagram hybrid website with left sidebar, center feed, and right active contacts panel.
  - 📱 **Mobile Phone Layout**: Authentic iPhone 16 Pro mockup frame with status bar and dynamic island matching design mockups.
- **Authentication**: Modern Login and Sign Up screens with diverse illustration, terms checkbox, and social authentication options.
- **Trilingual Support**: English, বাংলা (Bengali), and Banglish.
- **SQLite Database & REST API**: 10 diverse pre-seeded creator profiles, posts, reels, stories, comments, and messages.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize & Seed Database
```bash
npm run seed
```

### 4. Start SQLite REST API Backend (Port 5000)
```bash
npm run server
```

### 5. Start Vite Frontend (Port 5173)
```bash
npm run dev
```

Visit **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🌐 Hostinger Deployment Guide

### Option 1: Hostinger Git Deployment (via hPanel)
1. Push this repository to your GitHub account.
2. Log in to **Hostinger hPanel**.
3. Under **Domains / Subdomains**, create your desired subdomain (e.g., `aww.yourdomain.com`).
4. Go to **Advanced > Git** in hPanel.
5. Create a new repository:
   - **Repository URL**: `https://github.com/<your-username>/aww2ww.git`
   - **Branch**: `main`
   - **Install directory**: `public_html/<your-subdomain-folder>`
6. Click **Deploy**.

### Option 2: Production Static Web Deployment (Frontend Only)
1. Run `npm run build` to generate the production bundle in `dist/`.
2. In Hostinger hPanel > **File Manager**, navigate to your subdomain's folder.
3. Upload all files from the `dist/` folder into your subdomain root.
4. Add an `.htaccess` file for Single Page Application (SPA) routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 3: Hostinger VPS / Node.js Application (Full-Stack)
1. In Hostinger hPanel > **Node.js** (or VPS):
2. Select Node.js version 18+ or 20+.
3. Set **Application root** to your project folder.
4. Set **Application startup file** to `server.js`.
5. Run `npm install`, `npm run seed`, and start the app with PM2.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Canvas-Confetti
- **Backend API**: Node.js, Express, CORS
- **Database**: SQLite (`better-sqlite3`)
- **License**: MIT
