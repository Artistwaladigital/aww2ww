# aww2ww - Real People, Real Vibes ✨

A modern, high-performance hybrid social media application combining the best elements of **Facebook** and **Instagram**.

Developed for **aww2ww**, featuring a mobile-first responsive layout (iPhone 16 Pro mockup mode) and a 3-column Facebook/Instagram Web mode for desktop screens, backed by a persistent SQLite database and an Express REST API.

---

## 🚀 Key Features

### 1. Home Feed (Facebook + Instagram Fusion)
- **Top Bar**: Custom branded logo with gradient heart, global search, direct messenger badge, notifications badge, and current active profile avatar.
- **Stories Carousel**: Horizontal story bar with gradient active rings, "Create Story" button, and unread story status.
- **Interactive Post Composer**: "What's on your mind?", Live video button, Photo upload, Reel shortcut, and Feeling/activity picker.
- **Mosaic Image Grid**: Multi-photo collage layouts (1-6 images), pinned posts, verified creator badges, timestamp, and captions.
- **Facebook Emoji Reactions**: Like 👍, Love ❤️, Care 🥰, Haha 😂, Wow 😮, Sad 😢, Angry 😡 with real-time reaction counts.
- **Comment Section & Quick Actions**: Like, comment modal, send via DM, share to feed or external apps.

### 2. Messenger & Direct Messages
- **Instagram-style Direct Notes**: Share notes and emoji status above inbox chats.
- **Inbox Filter Tabs**: All, Unread, Groups, Requests with unread message counter badges.
- **Active Chat Screen**: Real-time 1-on-1 chat interface with photo attachments, audio notes, emojis, and status ticks.
- **New Message Modal**: Quick friend selection with multi-select and "Create Group" options.

### 3. Creator Profiles & Highlights
- **Cover Photo & Neon Header**: Creator profile banner, neon signs, and verified badges.
- **Stats Counter**: Posts, Followers, and Following counts.
- **Story Highlights**: Categorized circles (Travel, OOTD, BTS, Food, Me).
- **Tabbed Content**: Posts Grid, Reels Grid, and Tagged photos.
- **Profile Action Sheet**: Share profile, Copy link, Add to close friends, Block, Report.

### 4. Reels & Watch Feed
- **Reels Explore Grid**: Dynamic trending video cards with view counts and creator labels.
- **Fullscreen Reels Player**: Auto-looping video player, Like, Comment, Share, Audio track drawer, and gift animations.
- **Reel Comments Drawer**: Community discussions with reply threads and heart reactions.
- **Audio Selector Modal**: Trending Bengali, Hindi, and English music tracks.

### 5. Multi-Device Experience
- **Mobile Mode**: Pixel-perfect iPhone 16 Pro mockup frame with dynamic island and rounded bezel.
- **Desktop Web Mode**: 3-column social network layout (Left navigation & quick profile switcher, Center feed, Right contacts & sponsored sidebar).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Canvas-Confetti
- **Backend**: Node.js, Express.js
- **Database**: SQLite (via `better-sqlite3` with WAL mode enabled)
- **Deployment**: Docker, Docker Compose, Coolify, Traefik

---

## 📦 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Artistwaladigital/aww2ww.git
   cd aww2ww
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Seed SQLite database with 10 demo profiles & posts**:
   ```bash
   npm run seed
   ```

4. **Start backend API server (Port 5000)**:
   ```bash
   npm run server
   ```

5. **Start frontend dev server (Port 5173)**:
   ```bash
   npm run dev
   ```

---

## 🐳 Docker & Coolify Deployment

This repository includes a ready-to-run `Dockerfile` and `docker-compose.yml`.

### Running with Docker Compose:
```bash
docker compose up -d --build
```
The application will be live at `http://localhost:5000`.

### Coolify Setup:
1. In Coolify, create a new **Application** from Public or Private GitHub Repository: `https://github.com/Artistwaladigital/aww2ww`.
2. Set Build Pack to **Dockerfile** (or **Docker Compose**).
3. Set Port to **5000**.
4. Set your custom subdomain (e.g., `https://aww2ww.alikecreator.com`).
5. Click **Deploy**.
