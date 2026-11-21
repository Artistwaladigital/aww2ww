import React from 'react';
import { 
  Home, 
  Clapperboard, 
  Tv, 
  Users2, 
  Store, 
  Users, 
  MessageCircle, 
  UserPlus,
  Check,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TabType } from '../../context/AppContext';
import { ANANYA_SAHA, MOCK_USERS } from '../../data/mockData';

export const DesktopSidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    setProfileUser, 
    friends,
    sentFriendRequests,
    sendFriendRequest,
    pendingFriendRequestsCount,
    unreadMessagesCount,
    t 
  } = useApp();

  const navItems: { id: TabType; label: string; icon: any; badge?: string }[] = [
    { id: 'home', label: t.home, icon: Home },
    { 
      id: 'friends', 
      label: t.friends, 
      icon: Users, 
      badge: pendingFriendRequestsCount > 0 ? `${pendingFriendRequestsCount} new` : undefined 
    },
    { id: 'reels', label: t.reels, icon: Clapperboard, badge: 'Hot' },
    { 
      id: 'messenger', 
      label: t.messages, 
      icon: MessageCircle, 
      badge: unreadMessagesCount > 0 ? String(unreadMessagesCount) : undefined 
    },
    { id: 'groups', label: t.groups, icon: Users2 },
    { id: 'watch', label: t.watch, icon: Tv },
    { id: 'marketplace', label: t.marketplace, icon: Store },
  ];

  const suggestedPeople = [
    ANANYA_SAHA,
    MOCK_USERS.mousumi,
    MOCK_USERS.riya,
    {
      id: 'user_arif',
      name: 'Arif Hossain',
      username: 'arifhossain',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      verified: true,
      online: true,
      category: 'Tech Vlogger',
      followers: '730K',
      following: '340',
      postsCount: 210,
      bio: 'Tech reviews & travel stories from Dhaka & Kolkata 🚀',
      location: 'Dhaka / Kolkata',
      joinedDate: 'Joined May 2023',
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      hasStory: true,
    },
  ].filter(u => u.id !== currentUser.id);

  const shortcuts = [
    {
      name: 'Bengali Creators Hub',
      members: '125K members',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      tab: 'groups' as TabType,
    },
    {
      name: 'Travel Lovers',
      members: '98K members',
      img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
      tab: 'groups' as TabType,
    },
  ];

  return (
    <aside className="w-72 p-3 space-y-4 select-none shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar text-left">
      {/* Current User Card */}
      <div 
        onClick={() => {
          setProfileUser(currentUser);
          setActiveTab('profile');
        }}
        className="flex items-center space-x-3 p-2.5 rounded-2xl bg-white hover:bg-purple-50/70 border border-purple-50 cursor-pointer transition-colors shadow-2xs group"
      >
        <div className="relative">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-400 group-hover:ring-purple-600 transition-all"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="font-extrabold text-xs text-gray-900 group-hover:text-purple-700 transition-colors">
              {currentUser.name}
            </span>
            {currentUser.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            )}
          </div>
          <span className="text-[11px] text-gray-400">@{currentUser.username}</span>
          <span className="text-[10px] text-purple-600 font-semibold">{currentUser.category}</span>
        </div>
      </div>

      {/* Main Navigation List */}
      <div className="bg-white rounded-2xl p-1.5 border border-purple-50 shadow-2xs space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-100/80 text-purple-800 font-bold'
                  : 'text-gray-700 hover:bg-purple-50/60 hover:text-purple-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-purple-700' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  item.badge === 'Hot'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'
                    : 'bg-purple-600 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Suggested People / Creators to Connect */}
      <div className="bg-white rounded-2xl p-3 border border-purple-50 shadow-2xs">
        <div className="flex items-center space-x-1.5 mb-2.5">
          <UserPlus className="w-3.5 h-3.5 text-purple-600" />
          <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider">
            Suggested People
          </span>
        </div>

        <div className="space-y-2">
          {suggestedPeople.map((user) => {
            const isFriend = friends.some(f => f.id === user.id);
            const isRequested = sentFriendRequests.includes(user.id);

            return (
              <div
                key={user.id}
                className="flex items-center justify-between p-1.5 rounded-xl hover:bg-purple-50/50 transition-colors"
              >
                <div 
                  onClick={() => {
                    setProfileUser(user);
                    setActiveTab('profile');
                  }}
                  className="flex items-center space-x-2.5 cursor-pointer text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-200"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900 leading-tight hover:underline">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-gray-500">{user.category || 'Creator'}</span>
                  </div>
                </div>

                {isFriend ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center space-x-0.5">
                    <Check className="w-3 h-3" />
                    <span>Friend</span>
                  </span>
                ) : isRequested ? (
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                    Sent
                  </span>
                ) : (
                  <button
                    onClick={() => sendFriendRequest(user.id)}
                    className="text-[10px] font-bold text-white bg-purple-600 hover:bg-purple-700 px-2.5 py-1 rounded-md shadow-2xs transition-colors flex items-center space-x-1"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Shortcuts */}
      <div className="bg-white rounded-2xl p-3 border border-purple-50 shadow-2xs">
        <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider block mb-2">
          Your Community Hubs
        </span>
        <div className="space-y-2">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(sc.tab)}
              className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-purple-50/70 cursor-pointer transition-colors"
            >
              <img src={sc.img} alt={sc.name} className="w-8 h-8 rounded-xl object-cover" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900 leading-tight">{sc.name}</span>
                <span className="text-[10px] text-gray-500">{sc.members}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-2 text-[11px] text-gray-400 space-y-1">
        <p>
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-600 transition-colors">Privacy</a> •{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-600 transition-colors">Terms</a> •{' '}
          <a href="/data-deletion" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-600 transition-colors">Data Deletion</a> •{' '}
          <a href="/privacy#cookies" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-600 transition-colors">Cookies</a>
        </p>
        <p>© 2026 aww2ww Inc. • Real People • Real Vibes</p>
      </div>
    </aside>
  );
};
