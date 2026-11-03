export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
  online?: boolean;
  lastSeen?: string;
  category?: string;
  followers?: string;
  following?: string;
  postsCount?: number;
  bio?: string;
  location?: string;
  email?: string;
  instagram?: string;
  joinedDate?: string;
  coverImage?: string;
  isFollowing?: boolean;
  hasStory?: boolean;
}

export interface Story {
  id: string;
  userId: string;
  user: User;
  mediaUrl: string;
  caption?: string;
  timestamp: string;
  isViewed?: boolean;
}

export interface PostReaction {
  type: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';
  emoji: string;
  label: string;
  count: number;
}

export interface PostComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  user: User;
  timestamp: string;
  caption: string;
  media: {
    type: 'image' | 'video' | 'reel';
    url: string;
    views?: string;
  }[];
  viewsCount?: string;
  reactions: {
    like: number;
    love: number;
    care: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
    userReaction?: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry' | null;
  };
  commentsCount: number;
  sharesCount: number;
  comments: PostComment[];
  pinned?: boolean;
}

export interface Note {
  id: string;
  userId: string;
  user: User;
  noteText: string;
  timestamp: string;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatThread {
  id: string;
  isGroup?: boolean;
  groupName?: string;
  membersCount?: string;
  participant: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

export interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  musicTitle: string;
  likesCount: string;
  commentsCount: string;
  sharesCount: string;
  viewsCount: string;
  isLiked?: boolean;
  category: 'foryou' | 'trending' | 'music' | 'dance' | 'travel';
}

export interface Highlight {
  id: string;
  title: string;
  coverUrl: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  reelsCount: string;
  category: 'trending' | 'bengali' | 'hindi' | 'english' | 'lofi';
  audioUrl?: string;
}
