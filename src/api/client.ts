const API_URL = import.meta.env.VITE_API_URL || '/api';

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

  async register(data: { name: string; username: string; email?: string; password?: string; avatar?: string; bio?: string }) {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      return { error: 'Failed to connect to server' };
    }
  },

  async login(usernameOrEmail: string, password?: string) {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      return await res.json();
    } catch {
      return { error: 'Failed to connect to server' };
    }
  },

  async updateProfile(userId: string, data: any) {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      return { error: 'Failed to update profile' };
    }
  },

  async createChat(participantId: string, isGroup?: boolean, groupName?: string) {
    try {
      const res = await fetch(`${API_URL}/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantId, isGroup, groupName }),
      });
      return await res.json();
    } catch {
      return null;
    }
  },
};
