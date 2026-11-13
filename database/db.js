import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = process.env.DB_DIR || __dirname;
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dbDir, 'aww2ww.sqlite');
const db = new Database(dbPath);

try {
  // Enable WAL mode for high performance
  db.pragma('journal_mode = WAL');
} catch (e) {
  console.warn('Pragma WAL warning:', e.message);
}

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      password TEXT,
      avatar TEXT,
      cover_image TEXT,
      bio TEXT,
      category TEXT,
      location TEXT,
      verified INTEGER DEFAULT 0,
      followers TEXT DEFAULT '0',
      following TEXT DEFAULT '0',
      posts_count INTEGER DEFAULT 0,
      joined_date TEXT,
      online INTEGER DEFAULT 0,
      has_story INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      caption TEXT,
      media TEXT, -- JSON array of media items
      reactions TEXT, -- JSON object of reactions
      comments_count INTEGER DEFAULT 0,
      shares_count INTEGER DEFAULT 0,
      views_count TEXT,
      pinned INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      user_name TEXT,
      user_avatar TEXT,
      text TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS stories (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      media_url TEXT NOT NULL,
      caption TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS reels (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      video_url TEXT,
      thumbnail_url TEXT,
      caption TEXT,
      music_title TEXT,
      likes_count TEXT,
      comments_count TEXT,
      shares_count TEXT,
      views_count TEXT,
      is_liked INTEGER DEFAULT 0,
      category TEXT DEFAULT 'foryou',
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      note_text TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      participant_id TEXT,
      is_group INTEGER DEFAULT 0,
      group_name TEXT,
      members_count TEXT,
      last_message TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      text TEXT,
      media_url TEXT,
      media_type TEXT,
      status TEXT DEFAULT 'sent',
      created_at TEXT NOT NULL,
      FOREIGN KEY (chat_id) REFERENCES chats(id),
      FOREIGN KEY (sender_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS groups_list (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      members_count TEXT,
      activity TEXT,
      image TEXT,
      description TEXT,
      joined INTEGER DEFAULT 0
    );
  `);

  console.log('Database initialized successfully at:', dbPath);
}

export default db;
