import React, { createContext, useContext, useState } from 'react';
import type {
  Post,
  Reel,
  ChatThread,
  Story,
  Note,
  User,
  Song,
} from '../types';
import {
  CURRENT_USER,
  MOCK_POSTS,
  MOCK_STORIES,
  MOCK_REELS,
  MOCK_NOTES,
  MOCK_SONGS,
} from '../data/mockData';
import type { Language, Translations } from '../data/translations';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';
import { apiClient } from '../api/client';

export type TabType = 'home' | 'friends' | 'reels' | 'groups' | 'menu' | 'watch' | 'marketplace' | 'profile' | 'messenger' | 'auth';

interface AppContextType {
  // Navigation & View
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  viewMode: 'mobile' | 'desktop';
  setViewMode: (mode: 'mobile' | 'desktop') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;

  // Current User & Profile
  currentUser: User;
  setCurrentUser: (user: User) => void;
  updateCurrentUser: (data: Partial<User>) => Promise<void>;
  profileUser: User;
  setProfileUser: (user: User) => void;
  isFollowingCreator: boolean;
  toggleFollowCreator: () => void;

  // Real Social Engine: Friends, Requests & Notifications
  friends: User[];
  friendRequests: any[];
  sentFriendRequests: string[];
  notifications: any[];
  unreadMessagesCount: number;
  pendingFriendRequestsCount: number;
  unreadNotificationsCount: number;
  sendFriendRequest: (receiverId: string) => Promise<boolean>;
  acceptFriendRequest: (requestId: string) => Promise<boolean>;
  rejectFriendRequest: (requestId: string) => Promise<boolean>;
  cancelFriendRequest: (receiverId: string) => Promise<boolean>;
  startChatWithUser: (user: { id: string; name: string; avatar: string; username?: string }) => Promise<void>;
  markNotificationsRead: () => Promise<void>;
  refreshSocialData: (userId?: string) => Promise<void>;

  // Data
  posts: Post[];
  stories: Story[];
  chats: ChatThread[];
  reels: Reel[];
  notes: Note[];
  songs: Song[];

  // Actions
  addPost: (caption: string, mediaUrl?: string) => void;
  reactToPost: (postId: string, reactionType: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry') => void;
  addCommentToPost: (postId: string, text: string) => void;
  
  // Stories
  activeStoryIndex: number | null;
  openStory: (index: number) => void;
  closeStory: () => void;
  addStory: (mediaUrl: string, caption?: string) => void;

  // Chat
  activeChatId: string | null;
  openChat: (chatId: string) => void;
  closeChat: () => void;
  sendMessage: (chatId: string, text: string, mediaUrl?: string) => void;
  isNewChatModalOpen: boolean;
  setIsNewChatModalOpen: (open: boolean) => void;

  // Reels
  activeReelIndex: number;
  setActiveReelIndex: (index: number) => void;
  isFullscreenReelOpen: boolean;
  openFullscreenReel: (index: number) => void;
  closeFullscreenReel: () => void;
  toggleLikeReel: (reelId: string) => void;
  isReelCommentsOpen: boolean;
  setIsReelCommentsOpen: (open: boolean) => void;
  isAddMusicOpen: boolean;
  setIsAddMusicOpen: (open: boolean) => void;
  isCreateReelOpen: boolean;
  setIsCreateReelOpen: (open: boolean) => void;
  selectedSong: Song | null;
  setSelectedSong: (song: Song | null) => void;

  // Modals
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isProfileOptionsOpen: boolean;
  setIsProfileOptionsOpen: (open: boolean) => void;
  isAboutModalOpen: boolean;
  setIsAboutModalOpen: (open: boolean) => void;
  activePostComments: Post | null;
  openPostComments: (post: Post) => void;
  closePostComments: () => void;
  
  // Auth
  authScreen: 'login' | 'signup';
  setAuthScreen: (screen: 'login' | 'signup') => void;
  isAuthenticated: boolean;
  login: (usernameOrEmail?: string, password?: string) => Promise<boolean>;
  register: (userData: { name: string; username: string; email?: string; password?: string; avatar?: string }) => Promise<boolean>;
  logout: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'desktop' : 'mobile';
    }
    return 'desktop';
  });
  const [language, setLanguage] = useState<Language>('en');

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('aww2ww_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved user:', e);
    }
    return CURRENT_USER;
  });
  const [profileUser, setProfileUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('aww2ww_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return CURRENT_USER;
  });
  const [isFollowingCreator, setIsFollowingCreator] = useState<boolean>(false);

  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [chats, setChats] = useState<ChatThread[]>([]);
  const [reels, setReels] = useState<Reel[]>(MOCK_REELS);
  const [notes] = useState<Note[]>(MOCK_NOTES);
  const [songs] = useState<Song[]>(MOCK_SONGS);

  // Real Social Engine States
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [sentFriendRequests, setSentFriendRequests] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Modals & Sheets
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isFullscreenReelOpen, setIsFullscreenReelOpen] = useState(false);
  const [isReelCommentsOpen, setIsReelCommentsOpen] = useState(false);
  const [isAddMusicOpen, setIsAddMusicOpen] = useState(false);
  const [isCreateReelOpen, setIsCreateReelOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(MOCK_SONGS[0]);

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [activePostComments, setActivePostComments] = useState<Post | null>(null);

  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('aww2ww_user'));
    } catch {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setViewMode(isDesktop ? 'desktop' : 'mobile');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const refreshSocialData = React.useCallback(async (userId?: string) => {
    const uid = userId || currentUser?.id;
    if (!uid) return;
    try {
      const [dbFriends, dbReqs, dbSent, dbNotifs, dbChats] = await Promise.all([
        apiClient.getFriends(uid),
        apiClient.getFriendRequests(uid),
        apiClient.getSentFriendRequests(uid),
        apiClient.getNotifications(uid),
        apiClient.getChats(uid),
      ]);
      if (Array.isArray(dbFriends)) setFriends(dbFriends);
      if (Array.isArray(dbReqs)) setFriendRequests(dbReqs);
      if (Array.isArray(dbSent)) setSentFriendRequests(dbSent);
      if (Array.isArray(dbNotifs)) setNotifications(dbNotifs);
      if (Array.isArray(dbChats)) setChats(dbChats);
    } catch (e) {
      console.warn('Failed to load social data:', e);
    }
  }, [currentUser?.id]);

  React.useEffect(() => {
    // Load initial feed & stories data from SQLite Database
    async function loadDbData() {
      const [dbPosts, dbStories, dbReels] = await Promise.all([
        apiClient.getPosts(),
        apiClient.getStories(),
        apiClient.getReels(),
      ]);

      if (dbPosts && dbPosts.length > 0) setPosts(dbPosts);
      if (dbStories && dbStories.length > 0) setStories(dbStories);
      if (dbReels && dbReels.length > 0) setReels(dbReels);
    }
    loadDbData();
    if (isAuthenticated && currentUser?.id) {
      refreshSocialData(currentUser.id);
    }
  }, [isAuthenticated, currentUser?.id, refreshSocialData]);

  React.useEffect(() => {
    (window as any).__aww2wwNavigate = (options: any) => {
      if (options.activeTab !== undefined) setActiveTab(options.activeTab);
      if (options.authScreen !== undefined) setAuthScreen(options.authScreen);
      if (options.activeChatId !== undefined) setActiveChatId(options.activeChatId);
      if (options.isNewChatModalOpen !== undefined) setIsNewChatModalOpen(options.isNewChatModalOpen);
      if (options.isFullscreenReelOpen !== undefined) setIsFullscreenReelOpen(options.isFullscreenReelOpen);
      if (options.isReelCommentsOpen !== undefined) setIsReelCommentsOpen(options.isReelCommentsOpen);
      if (options.isAddMusicOpen !== undefined) setIsAddMusicOpen(options.isAddMusicOpen);
      if (options.isCreateReelOpen !== undefined) setIsCreateReelOpen(options.isCreateReelOpen);
      if (options.isCreatePostOpen !== undefined) setIsCreatePostOpen(options.isCreatePostOpen);
      if (options.isProfileOptionsOpen !== undefined) setIsProfileOptionsOpen(options.isProfileOptionsOpen);
      if (options.isAboutModalOpen !== undefined) setIsAboutModalOpen(options.isAboutModalOpen);
      if (options.activeStoryIndex !== undefined) setActiveStoryIndex(options.activeStoryIndex);
      if (options.activePostComments !== undefined) setActivePostComments(options.activePostComments);
      if (options.viewMode !== undefined) setViewMode(options.viewMode);
      if (options.profileUser !== undefined) setProfileUser(options.profileUser);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const t = translations[language];

  const toggleFollowCreator = () => {
    setIsFollowingCreator(prev => {
      const next = !prev;
      if (next) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#7C3AED', '#EC4899', '#8B5CF6'],
        });
        showToast('Following Ananya Saha 🎉');
      } else {
        showToast('Unfollowed');
      }
      return next;
    });
  };

  const addPost = (caption: string, mediaUrl?: string) => {
    const isVideo = mediaUrl && (mediaUrl.includes('/videos/') || mediaUrl.match(/\.(mp4|webm|mov|mkv)(\?.*)?$/i));
    const newPost: Post = {
      id: `post_${Date.now()}`,
      user: currentUser,
      timestamp: 'Just now',
      caption,
      media: mediaUrl
        ? [{ type: isVideo ? 'video' : 'image', url: mediaUrl }]
        : [
            {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
            },
          ],
      reactions: {
        like: 1,
        love: 1,
        care: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
        userReaction: 'love',
      },
      commentsCount: 0,
      sharesCount: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setIsCreatePostOpen(false);
    apiClient.createPost(currentUser.id, caption, mediaUrl);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#EC4899', '#F43F5E'],
    });
    showToast('Post published to aww2ww! ✨');
  };

  const reactToPost = (postId: string, reactionType: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry') => {
    apiClient.reactToPost(postId, reactionType);
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const currentReaction = p.reactions.userReaction;
        const nextReactions = { ...p.reactions };

        if (currentReaction === reactionType) {
          // unreact
          nextReactions[reactionType] = Math.max(0, nextReactions[reactionType] - 1);
          nextReactions.userReaction = null;
        } else {
          if (currentReaction) {
            nextReactions[currentReaction] = Math.max(0, nextReactions[currentReaction] - 1);
          }
          nextReactions[reactionType] += 1;
          nextReactions.userReaction = reactionType;
          if (reactionType === 'love' || reactionType === 'wow') {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#EC4899', '#7C3AED'],
            });
          }
        }
        return { ...p, reactions: nextReactions };
      })
    );
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    apiClient.addComment(postId, currentUser.id, text);
    const newComment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const updated = {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...p.comments],
        };
        if (activePostComments?.id === postId) {
          setActivePostComments(updated);
        }
        return updated;
      })
    );
    showToast('Comment posted! 💬');
  };

  // Stories
  const openStory = (index: number) => {
    setActiveStoryIndex(index);
  };
  const closeStory = () => {
    setActiveStoryIndex(null);
  };
  const addStory = (mediaUrl: string, caption?: string) => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      mediaUrl,
      caption: caption || 'New moment on aww2ww 💜',
      timestamp: 'Just now',
    };
    setStories([newStory, ...stories]);
    showToast('Story added! 🌟');
  };

  // Chat
  const openChat = (chatId: string) => {
    setActiveChatId(chatId);
    setActiveTab('messenger');
    // Clear unread
    setChats(prev =>
      prev.map(c => (c.id === chatId ? { ...c, unreadCount: 0 } : c))
    );
  };

  const closeChat = () => {
    setActiveChatId(null);
  };

  const sendMessage = (chatId: string, text: string, mediaUrl?: string) => {
    if (!text.trim() && !mediaUrl) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      mediaUrl,
      mediaType: mediaUrl ? ('image' as const) : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const,
    };

    apiClient.sendMessage(chatId, currentUser.id, text.trim(), mediaUrl);

    setChats(prev =>
      prev.map(c => {
        if (c.id !== chatId) return c;
        return {
          ...c,
          lastMessage: text.trim() || 'Photo 📷',
          timestamp: 'Just now',
          messages: [...c.messages, newMsg],
        };
      })
    );

    // Auto-reply simulation from Ananya after 1.5s
    if (chatId === 'chat_ananya' || chatId.includes('ananya')) {
      setTimeout(() => {
        const replies = [
          "That sounds wonderful! Can't wait 💜✨",
          "Aww thank you so much! You're the sweetest!",
          "Yes absolutely, let's connect today! ☕",
          "Working on the new aww2ww reel right now, will tag you! 🎬",
          "Haha love that! 😄👏",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyMsg = {
          id: `msg_reply_${Date.now()}`,
          senderId: 'user_ananya',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read' as const,
        };

        apiClient.sendMessage(chatId, 'user_ananya', randomReply);

        setChats(prevChats =>
          prevChats.map(c => {
            if (c.id !== chatId) return c;
            return {
              ...c,
              lastMessage: randomReply,
              timestamp: 'Just now',
              messages: [...c.messages, replyMsg],
            };
          })
        );
      }, 1500);
    }
  };

  // Reels
  const openFullscreenReel = (index: number) => {
    setActiveReelIndex(index);
    setIsFullscreenReelOpen(true);
  };
  const closeFullscreenReel = () => {
    setIsFullscreenReelOpen(false);
  };
  const toggleLikeReel = (reelId: string) => {
    setReels(prev =>
      prev.map(r => {
        if (r.id !== reelId) return r;
        const liked = !r.isLiked;
        if (liked) {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#EC4899', '#F43F5E'],
          });
        }
        return {
          ...r,
          isLiked: liked,
          likesCount: liked ? '257K' : '256K',
        };
      })
    );
  };

  const openPostComments = (post: Post) => {
    setActivePostComments(post);
  };
  const closePostComments = () => {
    setActivePostComments(null);
  };

  const updateCurrentUser = async (data: Partial<User>) => {
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    if (profileUser.id === currentUser.id) {
      setProfileUser(updated);
    }
    localStorage.setItem('aww2ww_user', JSON.stringify(updated));
    await apiClient.updateProfile(currentUser.id, data);
    showToast('Profile updated! ✨');
  };

  const unreadMessagesCount = React.useMemo(() => {
    return chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  }, [chats]);

  const pendingFriendRequestsCount = friendRequests.length;

  const unreadNotificationsCount = React.useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const sendFriendRequest = async (receiverId: string) => {
    if (!currentUser?.id) return false;
    const res = await apiClient.sendFriendRequest(currentUser.id, receiverId);
    if (res && res.success) {
      setSentFriendRequests(prev => [...prev, receiverId]);
      showToast('Friend request sent! 📨');
      return true;
    }
    return false;
  };

  const acceptFriendRequest = async (requestId: string) => {
    const res = await apiClient.acceptFriendRequest(requestId);
    if (res && res.success) {
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      await refreshSocialData();
      showToast('Friend request accepted! You are now friends 🤝');
      return true;
    }
    return false;
  };

  const rejectFriendRequest = async (requestId: string) => {
    const res = await apiClient.rejectFriendRequest(requestId);
    if (res && res.success) {
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      showToast('Request removed');
      return true;
    }
    return false;
  };

  const cancelFriendRequest = async (receiverId: string) => {
    if (!currentUser?.id) return false;
    await apiClient.cancelFriendRequest(currentUser.id, receiverId);
    setSentFriendRequests(prev => prev.filter(id => id !== receiverId));
    showToast('Request cancelled');
    return true;
  };

  const startChatWithUser = async (user: { id: string; name: string; avatar: string; username?: string }) => {
    if (!currentUser?.id) return;
    const chatRes = await apiClient.createChat(currentUser.id, user.id);
    if (chatRes && chatRes.id) {
      setChats(prev => {
        const exists = prev.find(c => c.id === chatRes.id);
        if (exists) return prev;
        return [chatRes, ...prev];
      });
      setActiveChatId(chatRes.id);
      setActiveTab('messenger');
      setIsNewChatModalOpen(false);
    }
  };

  const markNotificationsRead = async () => {
    if (!currentUser?.id) return;
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    await apiClient.markNotificationsRead(currentUser.id);
  };

  const login = async (usernameOrEmail?: string, password?: string): Promise<boolean> => {
    if (!usernameOrEmail) {
      localStorage.setItem('aww2ww_user', JSON.stringify(CURRENT_USER));
      setCurrentUser(CURRENT_USER);
      setProfileUser(CURRENT_USER);
      setIsAuthenticated(true);
      setActiveTab('home');
      refreshSocialData(CURRENT_USER.id);
      showToast('Logged in successfully! Welcome to aww2ww ✨');
      return true;
    }

    const res = await apiClient.login(usernameOrEmail, password);
    if (res && res.success && res.user) {
      setCurrentUser(res.user);
      setProfileUser(res.user);
      localStorage.setItem('aww2ww_user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      setActiveTab('home');
      setFriends([]);
      setFriendRequests([]);
      setSentFriendRequests([]);
      setNotifications([]);
      setChats([]);
      refreshSocialData(res.user.id);
      showToast(`Welcome back, ${res.user.name}! ✨`);
      return true;
    } else {
      showToast(res?.error || 'Login failed. Please check credentials.');
      return false;
    }
  };

  const register = async (userData: { name: string; username: string; email?: string; password?: string; avatar?: string }): Promise<boolean> => {
    const res = await apiClient.register(userData);
    if (res && res.success && res.user) {
      setCurrentUser(res.user);
      setProfileUser(res.user);
      localStorage.setItem('aww2ww_user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      setActiveTab('home');
      setFriends([]);
      setFriendRequests([]);
      setSentFriendRequests([]);
      setChats([]);
      refreshSocialData(res.user.id);
      showToast(`Account created! Welcome to aww2ww, ${res.user.name} 🎉`);
      return true;
    } else {
      showToast(res?.error || 'Registration failed.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('aww2ww_user');
    setIsAuthenticated(false);
    setFriends([]);
    setFriendRequests([]);
    setSentFriendRequests([]);
    setNotifications([]);
    setChats([]);
    setActiveTab('auth');
    setAuthScreen('login');
    showToast('Logged out');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        language,
        setLanguage,
        t,
        currentUser,
        setCurrentUser,
        updateCurrentUser,
        profileUser,
        setProfileUser,
        isFollowingCreator,
        toggleFollowCreator,
        friends,
        friendRequests,
        sentFriendRequests,
        notifications,
        unreadMessagesCount,
        pendingFriendRequestsCount,
        unreadNotificationsCount,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        cancelFriendRequest,
        startChatWithUser,
        markNotificationsRead,
        refreshSocialData,
        posts,
        stories,
        chats,
        reels,
        notes,
        songs,
        addPost,
        reactToPost,
        addCommentToPost,
        activeStoryIndex,
        openStory,
        closeStory,
        addStory,
        activeChatId,
        openChat,
        closeChat,
        sendMessage,
        isNewChatModalOpen,
        setIsNewChatModalOpen,
        activeReelIndex,
        setActiveReelIndex,
        isFullscreenReelOpen,
        openFullscreenReel,
        closeFullscreenReel,
        toggleLikeReel,
        isReelCommentsOpen,
        setIsReelCommentsOpen,
        isAddMusicOpen,
        setIsAddMusicOpen,
        isCreateReelOpen,
        setIsCreateReelOpen,
        selectedSong,
        setSelectedSong,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isProfileOptionsOpen,
        setIsProfileOptionsOpen,
        isAboutModalOpen,
        setIsAboutModalOpen,
        activePostComments,
        openPostComments,
        closePostComments,
        authScreen,
        setAuthScreen,
        isAuthenticated,
        login,
        register,
        logout,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
