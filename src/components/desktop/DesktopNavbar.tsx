import React, { useState } from 'react';
import { 
  Search, 
  Home, 
  Clapperboard, 
  Tv, 
  Users2, 
  Store, 
  Plus, 
  MessageCircle, 
  Bell, 
  Smartphone, 
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TabType } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const DesktopNavbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    setViewMode, 
    language, 
    setLanguage, 
    setIsCreatePostOpen,
    showToast,
    t 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const mainTabs = [
    { id: 'home' as TabType, label: t.home, icon: Home },
    { id: 'reels' as TabType, label: t.reels, icon: Clapperboard },
    { id: 'watch' as TabType, label: t.watch, icon: Tv },
    { id: 'groups' as TabType, label: t.groups, icon: Users2 },
    { id: 'marketplace' as TabType, label: t.marketplace, icon: Store },
  ];

  const triggerVibe = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.1 },
      colors: ['#7C3AED', '#EC4899', '#8B5CF6'],
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-purple-100 shadow-xs px-4 py-2 flex items-center justify-between select-none">
      {/* Left: Brand & Search */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[240px]">
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-1.5 cursor-pointer group"
        >
          <span className="text-2xl font-black bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            aww2ww
          </span>
          <span className="text-pink-500 text-xl font-bold group-hover:scale-125 transition-transform">
            ♥
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search aww2ww..."
            className="w-full bg-purple-50/60 pl-9 pr-7 py-2 text-xs rounded-full border border-purple-100 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Center: Facebook-style Main Navigation Icons */}
      <nav className="flex items-center space-x-1 justify-center flex-1 max-w-xl">
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all relative group ${
                isActive ? 'text-purple-700' : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
              }`}
              title={tab.label}
            >
              <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110 text-purple-700' : ''}`} />
              {isActive && (
                <span className="absolute bottom-0 inset-x-4 h-1 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Actions, Messenger, Notifications, Profile, Switcher */}
      <div className="flex items-center space-x-2.5 w-1/4 justify-end min-w-[260px]">
        {/* Create Button */}
        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-xs hover:opacity-95 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden lg:inline">Create</span>
        </button>

        {/* Messenger with Badge 5 */}
        <button
          onClick={() => setActiveTab('messenger')}
          className="relative w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors active:scale-95"
          title="Messenger"
        >
          <MessageCircle className="w-4.5 h-4.5" />
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
            5
          </span>
        </button>

        {/* Notifications with Badge 12 */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors active:scale-95"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
            12
          </span>
        </button>

        {/* Confetti button */}
        <button
          onClick={triggerVibe}
          className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-500 transition-colors"
          title="Celebration Vibe"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Switch to Phone Mockup Frame */}
        <button
          onClick={() => {
            setViewMode('mobile');
            showToast('Switched to iPhone 16 Pro mockup frame 📱');
          }}
          className="flex items-center space-x-1 bg-purple-100/70 hover:bg-purple-200/70 text-purple-700 font-bold text-xs px-3 py-1.5 rounded-full transition-colors"
          title="Switch to Mobile Phone View"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Mobile Frame</span>
        </button>

        {/* Language selector */}
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as any)}
          className="bg-purple-50 text-purple-700 font-bold text-xs py-1.5 px-2 rounded-lg border border-purple-200 focus:outline-none cursor-pointer"
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
          <option value="banglish">Banglish</option>
        </select>

        {/* Current User Avatar pill */}
        <div
          onClick={() => setActiveTab('profile')}
          className="flex items-center space-x-2 pl-1 cursor-pointer group"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-400 group-hover:ring-purple-600 transition-all"
          />
        </div>
      </div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="absolute right-12 top-14 w-80 bg-white rounded-2xl shadow-xl border border-purple-100 p-3 z-50 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-bold text-xs text-gray-800">Notifications (12)</span>
            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
            <div className="py-2 flex items-start space-x-2 text-xs">
              <span className="text-pink-500">❤️</span>
              <p className="text-gray-600"><strong className="text-gray-900">Ananya Saha</strong> loved your photo.</p>
            </div>
            <div className="py-2 flex items-start space-x-2 text-xs">
              <span className="text-purple-500">🎬</span>
              <p className="text-gray-600"><strong className="text-gray-900">Riya Sen</strong> posted a new reel in <span className="text-purple-600 font-medium">Bengali Creators Hub</span>.</p>
            </div>
            <div className="py-2 flex items-start space-x-2 text-xs">
              <span className="text-blue-500">👥</span>
              <p className="text-gray-600"><strong className="text-gray-900">Arif Hossain</strong> connected with you.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
