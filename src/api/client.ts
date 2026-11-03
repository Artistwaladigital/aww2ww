const API_URL = 'http://localhost:5000/api';

export const apiClient = {
  async getPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch {
      return null;
    }
  },

  async createPost(userId: string, caption: string, mediaUrl?: string) {
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, caption, mediaUrl }),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async reactToPost(postId: string, reactionType: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType }),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async addComment(postId: string, userId: string, text: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text }),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getUsers() {
    try {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getReels() {
    try {
      const res = await fetch(`${API_URL}/reels`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getStories() {
    try {
      const res = await fetch(`${API_URL}/stories`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getChats() {
    try {
      const res = await fetch(`${API_URL}/chats`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch {
      return null;
    }
  },

  async sendMessage(chatId: string, senderId: string, text: string, mediaUrl?: string) {
    try {
      const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, text, mediaUrl }),
      });
      return await res.json();
    } catch {
      return null;
    }
  },
};
