import React, { useState } from 'react';
import { Search, Bell, MessageCircle, X, Monitor } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    setActiveTab, 
    setViewMode, 
    currentUser, 
    setProfileUser, 
    unreadMessagesCount,
    unreadNotificationsCount,
    notifications,
    markNotificationsRead,
    showToast 
  } = useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-purple-100/60 px-4 pt-2 pb-1.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Logo and Tagline */}
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer select-none group flex flex-col"
        >
          <div className="flex items-center space-x-1.5">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              aww2ww
            </span>
            <span className="text-pink-500 text-xl font-bold transform group-hover:scale-125 transition-transform">
              ♥
            </span>
          </div>
          <span className="text-[11px] font-medium italic text-purple-400 tracking-wide -mt-1 font-serif">
            Real People • Real Vibes
          </span>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
            className="w-9 h-9 rounded-full bg-purple-50/80 hover:bg-purple-100 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
          >
            <Search className="w-4 h-4 text-gray-700" />
          </button>

          {/* Messenger Button with Dynamic Badge */}
          <button
            onClick={() => setActiveTab('messenger')}
            aria-label="Messenger"
            className="relative w-9 h-9 rounded-full bg-purple-50/80 hover:bg-purple-100 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
          >
            <MessageCircle className="w-4.5 h-4.5 text-gray-700" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center border-2 border-white shadow-xs">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Notifications Bell with Dynamic Badge */}
          <button
            onClick={() => {
              const next = !showNotifications;
              setShowNotifications(next);
              if (next && unreadNotificationsCount > 0) {
                markNotificationsRead();
              }
            }}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-purple-50/80 hover:bg-purple-100 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
          >
            <Bell className="w-4.5 h-4.5 text-gray-700" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Switch to Web / Desktop View on tablet or PC */}
          <button
            onClick={() => {
              setViewMode('desktop');
              showToast('Switched to Web Desktop View 💻');
            }}
            className="hidden sm:flex w-9 h-9 rounded-full bg-purple-50/80 hover:bg-purple-100 text-purple-700 items-center justify-center transition-colors active:scale-95"
            title="Switch to Web Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => {
              setProfileUser(currentUser);
              setActiveTab('profile');
            }}
            aria-label="Profile"
            className="relative ml-0.5 group active:scale-95 transition-transform"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400 group-hover:ring-purple-600 transition-all"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearch && (
        <div className="mt-2 pt-1 pb-1 animate-fadeIn flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search posts, friends, reels, creators..."
              className="w-full bg-purple-50/60 pl-9 pr-8 py-1.5 text-xs rounded-full border border-purple-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              if (searchQuery.trim()) showToast(`Searching for "${searchQuery}"...`);
              setShowSearch(false);
            }}
            className="text-xs text-purple-600 font-semibold px-2 py-1"
          >
            Done
          </button>
        </div>
      )}

      {/* Notifications Drawer Dropdown */}
      {showNotifications && (
        <div className="absolute right-3 top-14 w-80 bg-white rounded-2xl shadow-xl border border-purple-100 p-3 z-50 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-bold text-xs text-gray-800">
              Notifications {notifications.length > 0 ? `(${notifications.length})` : ''}
            </span>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                No notifications yet ✨
              </div>
            ) : (
              notifications.map((notif, idx) => (
                <div key={notif.id || idx} className="py-2.5 flex items-start space-x-2 text-xs">
                  <span className="text-purple-600 shrink-0">
                    {notif.type === 'friend_request' ? '👥' : notif.type === 'friend_accept' ? '🤝' : '✨'}
                  </span>
                  <div className="flex flex-col text-left">
                    <p className="text-gray-900 font-semibold leading-tight">{notif.title}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">{notif.message}</p>
                    <span className="text-[9px] text-gray-400 mt-0.5">{notif.time || 'Just now'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
};
