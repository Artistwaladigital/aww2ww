import React from 'react';
import { 
  MessageCircle, 
  Clapperboard, 
  Users2, 
  Globe, 
  Smartphone, 
  Monitor, 
  LogOut, 
  LogIn, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';
import { CURRENT_USER, ANANYA_SAHA } from '../../data/mockData';

export const MenuView: React.FC = () => {
  const { 
    setProfileUser, 
    setActiveTab, 
    viewMode, 
    setViewMode, 
    language, 
    setLanguage, 
    isAuthenticated, 
    logout, 
    login,
    showToast 
  } = useApp();

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-24 select-none">
      <TopTabs />

      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-purple-50 text-left">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Menu & Controls</h1>
        <p className="text-xs text-gray-500">Explore aww2ww features, profiles & settings</p>
      </div>

      <div className="p-3 space-y-3">
        {/* Profile Shortcut Card */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-purple-50 text-left">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Switch Profiles
          </span>

          <div className="space-y-2">
            {/* Tania Roy */}
            <div
              onClick={() => {
                setProfileUser(CURRENT_USER);
                setActiveTab('profile');
              }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-400"
                />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{CURRENT_USER.name} (You)</span>
                  <span className="text-[11px] text-gray-500">@{CURRENT_USER.username} • 142K Followers</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            {/* Ananya Saha */}
            <div
              onClick={() => {
                setProfileUser(ANANYA_SAHA);
                setActiveTab('profile');
              }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/60 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={ANANYA_SAHA.avatar}
                  alt={ANANYA_SAHA.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-gray-900">{ANANYA_SAHA.name}</span>
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 rounded-sm">Creator</span>
                  </div>
                  <span className="text-[11px] text-gray-500">@{ANANYA_SAHA.username} • 2.4M Followers</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Device Viewport Toggle (Mobile vs Desktop) */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-purple-50 text-left">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Device Mockup Mode
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setViewMode('mobile');
                showToast('Switched to iPhone 16 Pro mockup frame 📱');
              }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Phone</span>
            </button>

            <button
              onClick={() => {
                setViewMode('desktop');
                showToast('Switched to Responsive Fullscreen mode 💻');
              }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Full Desktop</span>
            </button>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-purple-50 text-left">
          <div className="flex items-center space-x-1.5 mb-2">
            <Globe className="w-4 h-4 text-purple-700" />
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Language / ভাষা
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'en' as const, label: 'English' },
              { id: 'bn' as const, label: 'বাংলা' },
              { id: 'banglish' as const, label: 'Banglish' },
            ].map(l => (
              <button
                key={l.id}
                onClick={() => {
                  setLanguage(l.id);
                  showToast(`Language set to ${l.label}`);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  language === l.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick App Destinations */}
        <div className="bg-white rounded-2xl p-2 shadow-xs border border-purple-50 text-left divide-y divide-gray-50">
          <div
            onClick={() => setActiveTab('messenger')}
            className="flex items-center justify-between p-2.5 hover:bg-purple-50/50 rounded-xl cursor-pointer"
          >
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-800">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span>Messenger Inbox & Direct Chat</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => setActiveTab('reels')}
            className="flex items-center justify-between p-2.5 hover:bg-purple-50/50 rounded-xl cursor-pointer"
          >
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-800">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                <Clapperboard className="w-4 h-4" />
              </div>
              <span>Reels & Video Discovery</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => setActiveTab('groups')}
            className="flex items-center justify-between p-2.5 hover:bg-purple-50/50 rounded-xl cursor-pointer"
          >
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-800">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users2 className="w-4 h-4" />
              </div>
              <span>Community Groups & Hubs</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Authentication Switcher (Login / Logout Preview) */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-purple-50 text-left">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Account & Auth Flow
          </span>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out (Preview Login & Sign Up Screens)</span>
            </button>
          ) : (
            <button
              onClick={login}
              className="w-full py-2.5 rounded-xl bg-purple-700 text-white hover:bg-purple-800 font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to aww2ww</span>
            </button>
          )}
        </div>

        {/* About App Footer */}
        <div className="pt-2 text-center text-xs text-gray-400 space-y-1">
          <div className="flex items-center justify-center space-x-1 text-purple-600 font-bold">
            <span>aww2ww</span>
            <span className="text-pink-500">♥</span>
            <span>Version 2.0</span>
          </div>
          <p>Connect • Share • Inspire</p>
          <p className="text-[10px] text-gray-400">Real People • Real Vibes • Kolkata & World</p>
        </div>
      </div>
    </div>
  );
};
