import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import db, { initDatabase } from './database/db.js';
import { seedDatabase } from './database/seed.js';

// Cloudflare R2 Credentials & S3 Client
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '22dbb1c730cb29b1b2ca213f3cab0846';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '16a969d9aaaf9f3ca49b4f2d37c31a22';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'fa5b5b4c25831ccc3092f3283fd7afb9d3e5f9735942cd7c8737d5a959057245';
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'aww2ww-media';
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || '';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 150 * 1024 * 1024 }, // 150MB max per video/photo
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure database schema exists
initDatabase();

// Check if database needs seeding
try {
  const row = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (!row || row.count === 0) {
    console.log('Database empty. Running seed...');
    seedDatabase();
  }
} catch (e) {
  console.warn('Seed check warning:', e.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint for Coolify / Docker
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'aww2ww',
    version: '1.0.0',
    uptime: process.uptime(),
    storage: {
      r2Bucket: R2_BUCKET_NAME,
      r2Configured: Boolean(R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY),
    },
    timestamp: new Date().toISOString()
  });
});

// Cloudflare R2 Upload Endpoint for Videos & Photos
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const isVideo = file.mimetype.startsWith('video');
    const ext = path.extname(file.originalname) || (isVideo ? '.mp4' : '.jpg');
    const folder = isVideo ? 'videos' : 'photos';
    const key = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;

    let uploadedUrl = '';
    let storageEngine = 'cloudflare-r2';

    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      if (R2_PUBLIC_DOMAIN) {
        uploadedUrl = `${R2_PUBLIC_DOMAIN.replace(/\/$/, '')}/${key}`;
      } else {
        uploadedUrl = `/api/media/${key}`;
      }
      console.log(`[R2] Uploaded ${key} successfully to Cloudflare R2!`);
    } catch (r2Error) {
      console.warn('[R2 Warning] Cloudflare S3 upload attempt, saving local copy:', r2Error.message);
      storageEngine = 'local-fallback';
      const localUploadDir = path.join(__dirname, 'public', folder);
      if (!fs.existsSync(localUploadDir)) {
        fs.mkdirSync(localUploadDir, { recursive: true });
      }
      const localPath = path.join(localUploadDir, path.basename(key));
      fs.writeFileSync(localPath, file.buffer);
      uploadedUrl = `/api/media/${key}`;
    }

    res.json({
      success: true,
      url: uploadedUrl,
      key,
      type: isVideo ? 'video' : 'image',
      storage: storageEngine,
      size: file.size,
      filename: file.originalname
    });
  } catch (err) {
    console.error('Upload handler error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Stream Media from Cloudflare R2 or Local Fallback (Express 5 compatible)
app.use('/api/media', async (req, res) => {
  const key = req.path.replace(/^\//, '');
  if (!key) return res.status(400).send('Media key required');
  try {
    const s3Res = await s3Client.send(new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    }));

    if (s3Res.ContentType) res.setHeader('Content-Type', s3Res.ContentType);
    if (s3Res.ContentLength) res.setHeader('Content-Length', s3Res.ContentLength);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    s3Res.Body.pipe(res);
  } catch (e) {
    const localPath = path.join(__dirname, 'public', key);
    if (fs.existsSync(localPath)) {
      return res.sendFile(localPath);
    }
    res.status(404).send('Media not found');
  }
});

// 1. Users
app.get('/api/users', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Posts Feed
app.get('/api/posts', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT p.*, 
             u.name as user_name, u.username as user_username, 
             u.avatar as user_avatar, u.verified as user_verified, 
             u.online as user_online
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.pinned DESC, p.rowid DESC
    `).all();

    const posts = rows.map(r => {
      const comments = db.prepare(`
        SELECT * FROM comments WHERE post_id = ? ORDER BY rowid DESC
      `).all(r.id);

      return {
        id: r.id,
        user: {
          id: r.user_id,
          name: r.user_name,
          username: r.user_username,
          avatar: r.user_avatar,
          verified: Boolean(r.user_verified),
          online: Boolean(r.user_online),
        },
        timestamp: r.created_at,
        caption: r.caption,
        media: JSON.parse(r.media || '[]'),
        reactions: JSON.parse(r.reactions || '{}'),
        commentsCount: r.comments_count,
        sharesCount: r.shares_count,
        viewsCount: r.views_count,
        pinned: Boolean(r.pinned),
        comments: comments.map(c => ({
          id: c.id,
          userId: c.user_id,
          userName: c.user_name,
          userAvatar: c.user_avatar,
          text: c.text,
          likes: c.likes,
          timestamp: c.created_at,
        })),
      };
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts', (req, res) => {
  try {
    const { userId, caption, mediaUrl } = req.body;
    const postId = `post_${Date.now()}`;
    const media = mediaUrl ? [{ type: 'image', url: mediaUrl }] : [];
    const defaultReactions = {
      like: 1,
      love: 1,
      care: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
      userReaction: 'love',
    };

    db.prepare(`
      INSERT INTO posts (id, user_id, caption, media, reactions, comments_count, shares_count, views_count, pinned, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      postId,
      userId || 'user_tania',
      caption,
      JSON.stringify(media),
      JSON.stringify(defaultReactions),
      0,
      0,
      '1',
      0,
      'Just now'
    );

    res.status(201).json({ success: true, postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// React to Post
app.post('/api/posts/:id/react', (req, res) => {
  try {
    const { reactionType } = req.body;
    const post = db.prepare('SELECT reactions FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const reactions = JSON.parse(post.reactions || '{}');
    const currentReaction = reactions.userReaction;

    if (currentReaction === reactionType) {
      reactions[reactionType] = Math.max(0, (reactions[reactionType] || 1) - 1);
      reactions.userReaction = null;
    } else {
      if (currentReaction) {
        reactions[currentReaction] = Math.max(0, (reactions[currentReaction] || 1) - 1);
      }
      reactions[reactionType] = (reactions[reactionType] || 0) + 1;
      reactions.userReaction = reactionType;
    }

    db.prepare('UPDATE posts SET reactions = ? WHERE id = ?')
      .run(JSON.stringify(reactions), req.params.id);

    res.json({ success: true, reactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment to Post
app.post('/api/posts/:id/comments', (req, res) => {
  try {
    const { userId, text } = req.body;
    const user = db.prepare('SELECT name, avatar FROM users WHERE id = ?').get(userId || 'user_tania');
    const commentId = `c_${Date.now()}`;

    db.prepare(`
      INSERT INTO comments (id, post_id, user_id, user_name, user_avatar, text, likes, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      commentId,
      req.params.id,
      userId || 'user_tania',
      user?.name || 'Tania Roy',
      user?.avatar || '',
      text,
      0,
      'Just now'
    );

    db.prepare('UPDATE posts SET comments_count = comments_count + 1 WHERE id = ?')
      .run(req.params.id);

    res.status(201).json({
      id: commentId,
      userId: userId || 'user_tania',
      userName: user?.name || 'Tania Roy',
      userAvatar: user?.avatar || '',
      text,
      likes: 0,
      timestamp: 'Just now',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Stories
app.get('/api/stories', (req, res) => {
  try {
    const stories = db.prepare(`
      SELECT s.*, u.name as user_name, u.avatar as user_avatar, u.username as user_username
      FROM stories s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.rowid DESC
    `).all();

    res.json(stories.map(s => ({
      id: s.id,
      userId: s.user_id,
      user: {
        id: s.user_id,
        name: s.user_name,
        username: s.user_username,
        avatar: s.user_avatar,
      },
      mediaUrl: s.media_url,
      caption: s.caption,
      timestamp: s.created_at,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Reels
app.get('/api/reels', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT r.*, u.name as user_name, u.avatar as user_avatar, u.username as user_username, u.verified as user_verified
      FROM reels r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.rowid ASC
    `).all();

    res.json(rows.map(r => ({
      id: r.id,
      user: {
        id: r.user_id,
        name: r.user_name,
        username: r.user_username,
        avatar: r.user_avatar,
        verified: Boolean(r.user_verified),
      },
      videoUrl: r.video_url,
      thumbnailUrl: r.thumbnail_url,
      caption: r.caption,
      musicTitle: r.music_title,
      likesCount: r.likes_count,
      commentsCount: r.comments_count,
      sharesCount: r.shares_count,
      viewsCount: r.views_count,
      isLiked: Boolean(r.is_liked),
      category: r.category,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Notes
app.get('/api/notes', (req, res) => {
  try {
    const notes = db.prepare(`
      SELECT n.*, u.name as user_name, u.avatar as user_avatar, u.online as user_online
      FROM notes n
      JOIN users u ON n.user_id = u.id
    `).all();

    res.json(notes.map(n => ({
      id: n.id,
      userId: n.user_id,
      user: {
        id: n.user_id,
        name: n.user_name,
        avatar: n.user_avatar,
        online: Boolean(n.user_online),
      },
      noteText: n.note_text,
      timestamp: n.created_at,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Chats
app.get('/api/chats', (req, res) => {
  try {
    const chats = db.prepare('SELECT * FROM chats').all();
    const result = chats.map(c => {
      let participant = null;
      if (c.participant_id) {
        participant = db.prepare('SELECT * FROM users WHERE id = ?').get(c.participant_id);
      } else {
        participant = {
          id: c.id,
          name: c.group_name,
          username: c.group_name.toLowerCase().replace(/\s+/g, ''),
          avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
          verified: true,
          online: true,
        };
      }

      const messages = db.prepare('SELECT * FROM messages WHERE chat_id = ? ORDER BY rowid ASC').all(c.id);

      return {
        id: c.id,
        isGroup: Boolean(c.is_group),
        groupName: c.group_name,
        membersCount: c.members_count,
        participant,
        lastMessage: c.last_message,
        timestamp: c.updated_at,
        unreadCount: c.id === 'chat_ananya' ? 2 : 0,
        messages: messages.map(m => ({
          id: m.id,
          senderId: m.sender_id,
          text: m.text,
          mediaUrl: m.media_url,
          mediaType: m.media_type,
          status: m.status,
          timestamp: m.created_at,
        })),
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/chats/:id/messages', (req, res) => {
  try {
    const { senderId, text, mediaUrl } = req.body;
    const msgId = `msg_${Date.now()}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    db.prepare(`
      INSERT INTO messages (id, chat_id, sender_id, text, media_url, media_type, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      msgId,
      req.params.id,
      senderId || 'user_tania',
      text || '',
      mediaUrl || null,
      mediaUrl ? 'image' : null,
      'sent',
      timeStr
    );

    db.prepare('UPDATE chats SET last_message = ?, updated_at = ? WHERE id = ?')
      .run(text || 'Photo 📷', timeStr, req.params.id);

    res.status(201).json({
      id: msgId,
      senderId: senderId || 'user_tania',
      text,
      mediaUrl,
      mediaType: mediaUrl ? 'image' : undefined,
      timestamp: timeStr,
      status: 'sent',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Groups
app.get('/api/groups', (req, res) => {
  try {
    const groups = db.prepare('SELECT * FROM groups_list').all();
    res.json(groups.map(g => ({
      id: g.id,
      name: g.name,
      category: g.category,
      members: g.members_count,
      activity: g.activity,
      image: g.image,
      description: g.description,
      isJoined: Boolean(g.joined),
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Serve Frontend in Production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`aww2ww SQLite Backend & Web running at http://0.0.0.0:${PORT}`);
});
