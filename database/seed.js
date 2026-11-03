import db, { initDatabase } from './db.js';

export function seedDatabase() {
  initDatabase();

  // Clear existing data
  db.exec(`
    DELETE FROM comments;
    DELETE FROM messages;
    DELETE FROM chats;
    DELETE FROM stories;
    DELETE FROM reels;
    DELETE FROM notes;
    DELETE FROM posts;
    DELETE FROM groups_list;
    DELETE FROM users;
  `);

  console.log('Seeding demo profiles and social data...');

  // 1. Users
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, username, email, avatar, cover_image, bio, category, location, verified, followers, following, posts_count, joined_date, online, has_story)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const users = [
    [
      'user_tania',
      'Tania Roy',
      'taniaroy',
      'taniaroy@aww2ww.com',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'Living my happiest chapter ✨ Kolkata & Beyond 🌸 Life is about real moments!',
      'Fashion & Lifestyle',
      'Kolkata, India',
      1,
      '142K',
      '412',
      128,
      'Joined January 2024',
      1,
      1
    ],
    [
      'user_ananya',
      'Ananya Saha',
      'ananyasaha',
      'ananya@creators.com',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      '✨ Digital Creator | Fashion | Lifestyle | Travel\n📍 Kolkata, West Bengal, India\n✉️ ananya@creators.com\n🔗 www.instagram.com/ananyasaha\n📅 Joined AWW2WWW in March 2023',
      'Creator',
      'Kolkata, West Bengal, India',
      1,
      '2.4M',
      '386',
      245,
      'Joined March 2023',
      1,
      1
    ],
    [
      'user_mousumi',
      'Mousumi Das',
      'mousumidas',
      'mousumi@travel.com',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      'Chasing mountain sunrises & secret waterfalls 🏔️✈️ Travel Blogger from Bengal',
      'Travel Blogger',
      'Darjeeling & Kolkata',
      1,
      '560K',
      '290',
      180,
      'Joined April 2023',
      1,
      1
    ],
    [
      'user_riya',
      'Riya Sen',
      'riyasen',
      'riya@creator.net',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'Sunshine, books & good coffee ☕️🌻 Sharing daily smiles and positive vibes!',
      'Content Creator',
      'Kolkata, India',
      0,
      '320K',
      '450',
      94,
      'Joined June 2023',
      1,
      1
    ],
    [
      'user_poulami',
      'Poulami Saha',
      'poulamisaha',
      'poulami.art@gmail.com',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
      'Visual Artist, Calligrapher & Interior Aesthetician 🎨 Creating everyday art in Salt Lake',
      'Visual Artist',
      'Salt Lake, Kolkata',
      0,
      '190K',
      '310',
      82,
      'Joined August 2023',
      1,
      1
    ],
    [
      'user_sneha',
      'Sneha Paul',
      'snehapaul',
      'sneha.fit@gmail.com',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
      'Strength coach & wellness guide 💪 Clean living, daily cardio and balanced mind.',
      'Fitness Coach',
      'Kolkata, India',
      0,
      '420K',
      '230',
      145,
      'Joined September 2023',
      0,
      1
    ],
    [
      'user_arijit',
      'Arijit Roy',
      'arijitroy',
      'arijit.photo@gmail.com',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'Street, documentary & monsoon portraits in Kolkata 📸 Sony Alpha Ambassador',
      'Photographer',
      'Park Street, Kolkata',
      0,
      '85K',
      '190',
      62,
      'Joined November 2023',
      0,
      0
    ],
    [
      'user_arif',
      'Arif Hossain',
      'arifhossain',
      'arif.vlogs@gmail.com',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      'Tech gear reviews, productivity hacks & travel stories 🚀 Dhaka & Kolkata creator hub',
      'Tech Vlogger',
      'Dhaka / Kolkata',
      1,
      '730K',
      '340',
      210,
      'Joined May 2023',
      1,
      1
    ],
    [
      'user_nusrat',
      'Nusrat Jahan',
      'nusratjahan',
      'nusrat.food@gmail.com',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'Exploring culinary heritage from Old Dhaka Kacchi to Kolkata Nizam rolls 🍲✨ Food is love!',
      'Food Explorer',
      'Dhaka & Kolkata',
      0,
      '390K',
      '410',
      165,
      'Joined July 2023',
      1,
      1
    ],
    [
      'user_subhashree',
      'Subhashree Sen',
      'subhashreesen',
      'subhashree.music@gmail.com',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      'Acoustic soul • Rabindra Sangeet • Lofi Indie melodies 🎶 Listen to my latest originals on aww2ww!',
      'Musician & Singer',
      'Kolkata, India',
      1,
      '610K',
      '180',
      98,
      'Joined February 2023',
      1,
      1
    ]
  ];

  for (const u of users) {
    insertUser.run(...u);
  }

  // 2. Posts
  const insertPost = db.prepare(`
    INSERT INTO posts (id, user_id, caption, media, reactions, comments_count, shares_count, views_count, pinned, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const posts = [
    [
      'post_1',
      'user_tania',
      'Good vibes, better days! ☀️\nLife is more beautiful when you choose happiness. 💜',
      JSON.stringify([
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
          views: '5.2K'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
        },
        {
          type: 'reel',
          url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80'
        }
      ]),
      JSON.stringify({
        like: 2100,
        love: 1100,
        care: 150,
        haha: 20,
        wow: 230,
        sad: 2,
        angry: 1,
        userReaction: 'love'
      }),
      186,
      72,
      '5.2K',
      1,
      '2h ago'
    ],
    [
      'post_2',
      'user_mousumi',
      'Weekend mode ON 🌿💚 Exploring the hidden trails around Bengal hills. Nature is the best therapy you can ask for!',
      JSON.stringify([
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
        }
      ]),
      JSON.stringify({
        like: 1450,
        love: 820,
        care: 95,
        haha: 12,
        wow: 310,
        sad: 0,
        angry: 0,
        userReaction: null
      }),
      94,
      38,
      '3.8K',
      0,
      '4h ago'
    ],
    [
      'post_3',
      'user_ananya',
      'Behind the scenes from our brand campaign in Kolkata ✨ Big announcements coming up soon on aww2ww! Stay tuned 💜🎥',
      JSON.stringify([
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
        }
      ]),
      JSON.stringify({
        like: 4200,
        love: 3100,
        care: 420,
        haha: 35,
        wow: 890,
        sad: 4,
        angry: 2,
        userReaction: 'like'
      }),
      420,
      154,
      '18.4K',
      0,
      '6h ago'
    ],
    [
      'post_4',
      'user_arif',
      'Minimalist creative workstation 💻 Setup tour is live on aww2ww! Dual 4K displays, mechanical keyboard, and ambient glow. What do you think of this workspace? ⚡️',
      JSON.stringify([
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
        }
      ]),
      JSON.stringify({
        like: 1820,
        love: 940,
        care: 120,
        haha: 8,
        wow: 430,
        sad: 1,
        angry: 0,
        userReaction: 'wow'
      }),
      138,
      64,
      '6.1K',
      0,
      '8h ago'
    ],
    [
      'post_5',
      'user_nusrat',
      'Authentic Kolkata Biryani aroma is unmatched! 🍚✨ Golden potatoes, fragrant basmati, and royal Mughlai spices. Tag your foodie partner who needs this right now! 🤤',
      JSON.stringify([
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
        }
      ]),
      JSON.stringify({
        like: 2840,
        love: 2150,
        care: 180,
        haha: 45,
        wow: 610,
        sad: 2,
        angry: 1,
        userReaction: 'love'
      }),
      276,
      98,
      '9.5K',
      0,
      '12h ago'
    ],
    [
      'post_6',
      'user_subhashree',
      'Acoustic evening jamming "Ami Je Tomar" with classical tanpura 🎶 Recording our live vinyl session today. So grateful for all your support on aww2ww! 🌸',
      JSON.stringify([
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'
        }
      ]),
      JSON.stringify({
        like: 3100,
        love: 2600,
        care: 310,
        haha: 14,
        wow: 540,
        sad: 0,
        angry: 0,
        userReaction: 'love'
      }),
      312,
      140,
      '11.2K',
      0,
      '1d ago'
    ]
  ];

  for (const p of posts) {
    insertPost.run(...p);
  }

  // 3. Comments
  const insertComment = db.prepare(`
    INSERT INTO comments (id, post_id, user_id, user_name, user_avatar, text, likes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const comments = [
    ['c1', 'post_1', 'user_ananya', 'Ananya Saha', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 'Looking so radiant Tania! That sunset lighting is pure magic ✨🧡', 34, '1h ago'],
    ['c2', 'post_1', 'user_mousumi', 'Mousumi Das', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 'Gorgeous photos dear! Where is this rooftop located? 😍', 18, '45m ago'],
    ['c3', 'post_1', 'user_riya', 'Riya Sen', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', 'That caption though! 💜 Keep shining always girl!', 12, '20m ago'],
    ['c4', 'post_2', 'user_tania', 'Tania Roy', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 'Such breathtaking scenery Mousumi! Have the safest trip! ✈️💚', 15, '2h ago'],
    ['c5', 'post_5', 'user_arif', 'Arif Hossain', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 'Kolkata biryani potato is iconic! Missing this flavor so much 🤤', 42, '5h ago']
  ];

  for (const c of comments) {
    insertComment.run(...c);
  }

  // 4. Stories
  const insertStory = db.prepare(`
    INSERT INTO stories (id, user_id, media_url, caption, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  const stories = [
    ['story_tania', 'user_tania', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 'Golden sunsets heal everything 🌅🧡', '1h ago'],
    ['story_ananya', 'user_ananya', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', 'New photoshoot magic! ✨ Stay tuned', '2h ago'],
    ['story_mousumi', 'user_mousumi', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', 'Mountains calling 🏔️💚', '3h ago'],
    ['story_riya', 'user_riya', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80', 'Coffee date vibes ☕️🌸', '4h ago'],
    ['story_poulami', 'user_poulami', 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80', 'Spring floral bloom 💐', '5h ago'],
    ['story_sneha', 'user_sneha', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', 'Morning workout complete! 💪🔥', '6h ago']
  ];

  for (const s of stories) {
    insertStory.run(...s);
  }

  // 5. Reels
  const insertReel = db.prepare(`
    INSERT INTO reels (id, user_id, video_url, thumbnail_url, caption, music_title, likes_count, comments_count, shares_count, views_count, is_liked, category, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const reels = [
    [
      'reel_1',
      'user_ananya',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'Sunsets, smiles & good vibes 🌅💛 Life is better when you enjoy the little moments with real people...',
      'Tum Hi Ho (Lofi) • Arijit Singh',
      '256K',
      '12.4K',
      '8.7K',
      '1.2M',
      1,
      'foryou',
      '1d ago'
    ],
    [
      'reel_2',
      'user_mousumi',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'Ocean breeze and carefree heart 🌊☀️ Taking a walk down the coast',
      'Kesariya • Arijit Singh',
      '189K',
      '8.2K',
      '5.1K',
      '856K',
      0,
      'travel',
      '2d ago'
    ],
    [
      'reel_3',
      'user_riya',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'Sunflower fields forever 🌻✨ Dance like nobody is watching!',
      'Ami Je Tomar • Lofi Mix',
      '412K',
      '15.6K',
      '12.3K',
      '2.4M',
      1,
      'dance',
      '3d ago'
    ],
    [
      'reel_4',
      'user_poulami',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'Warm coffee on a rainy Kolkata morning ☕🌧️ Real warmth!',
      'Heeriye • Jasleen Royal',
      '145K',
      '6.4K',
      '3.9K',
      '932K',
      0,
      'music',
      '4d ago'
    ]
  ];

  for (const r of reels) {
    insertReel.run(...r);
  }

  // 6. Notes
  const insertNote = db.prepare(`
    INSERT INTO notes (id, user_id, note_text, created_at)
    VALUES (?, ?, ?, ?)
  `);

  const notes = [
    ['note_1', 'user_ananya', 'New vlog tonight 🎬✨', '2h ago'],
    ['note_2', 'user_mousumi', 'Beach vibes 🌊🏄‍♀️', '4h ago'],
    ['note_3', 'user_riya', 'Coffee & book ☕📖', '5h ago'],
    ['note_4', 'user_poulami', 'Painting evening 🎨', '6h ago']
  ];

  for (const n of notes) {
    insertNote.run(...n);
  }

  // 7. Chats & Messages
  const insertChat = db.prepare(`
    INSERT INTO chats (id, participant_id, is_group, group_name, members_count, last_message, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const chats = [
    ['chat_ananya', 'user_ananya', 0, null, null, 'Perfect! See you then 💜', '9:48 AM'],
    ['chat_mousumi', 'user_mousumi', 0, null, null, 'Sent a photo 📷', '9:32 AM'],
    ['chat_riya', 'user_riya', 0, null, null, 'Are we still meeting tomorrow?', '9:15 AM'],
    ['chat_creators_group', null, 1, 'Bengali Creators Hub', '125K members', 'Riya: Uploaded a new reel 🎬', '8:20 AM'],
    ['chat_travel_group', null, 1, 'Travel Lovers', '98K members', "Mousumi: Let's plan new trip ✈️", 'Yesterday']
  ];

  for (const c of chats) {
    insertChat.run(...c);
  }

  const insertMessage = db.prepare(`
    INSERT INTO messages (id, chat_id, sender_id, text, media_url, media_type, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const messages = [
    ['m1', 'chat_ananya', 'user_ananya', 'Hey! How are you?', null, null, 'read', '9:40 AM'],
    ['m2', 'chat_ananya', 'user_tania', "I'm good! What about you?", null, null, 'read', '9:41 AM'],
    ['m3', 'chat_ananya', 'user_ananya', "I'm great! Just working on something interesting 🎨", null, null, 'read', '9:42 AM'],
    ['m4', 'chat_ananya', 'user_tania', "That's awesome! Can't wait to see it 🤩", null, null, 'read', '9:43 AM'],
    ['m5', 'chat_ananya', 'user_ananya', "Sure! I'll share it with you soon 😊", null, null, 'read', '9:44 AM'],
    ['m6', 'chat_ananya', 'user_ananya', null, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 'image', 'read', '9:45 AM'],
    ['m7', 'chat_ananya', 'user_ananya', 'Woww 😍😍', null, null, 'read', '9:46 AM'],
    ['m8', 'chat_ananya', 'user_tania', "Let's catch up this evening? ☕", null, null, 'read', '9:47 AM'],
    ['m9', 'chat_ananya', 'user_ananya', 'Yes! 6 PM at our usual place?', null, null, 'read', '9:48 AM'],
    ['m10', 'chat_ananya', 'user_tania', 'Perfect! See you then 💜', null, null, 'read', '9:48 AM']
  ];

  for (const m of messages) {
    insertMessage.run(...m);
  }

  // 8. Groups List
  const insertGroup = db.prepare(`
    INSERT INTO groups_list (id, name, category, members_count, activity, image, description, joined)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const groups = [
    ['grp_creators', 'Bengali Creators Hub', 'Arts & Entertainment', '125K members', '15+ posts today', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', 'The official creative community for digital storytellers, reel makers and artists across Bengal!', 1],
    ['grp_travel', 'Travel Lovers', 'Travel & Exploration', '98K members', '8 posts today', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80', 'Sharing travel itineraries, offbeat trails, backpacking secrets, and scenic photography.', 1],
    ['grp_fitness', 'Fitness Family', 'Health & Wellness', '76K members', '22 posts today', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', 'Daily motivation, workout plans, clean eating recipes, and lifestyle transformations.', 0],
    ['grp_nature', 'Nature Photography', 'Visual Arts', '54K members', '12 posts today', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80', 'Landscape, wildlife, macro and golden hour photographs from across the world.', 0]
  ];

  for (const g of groups) {
    insertGroup.run(...g);
  }

  console.log('Database seeded with rich demo profiles, posts, reels, comments, and messages successfully!');
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}

export default seedDatabase;
