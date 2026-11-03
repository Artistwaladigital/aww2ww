import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from './StatusBar';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { 
    viewMode, 
    setViewMode, 
    setActiveTab, 
    setAuthScreen, 
    openChat, 
    openFullscreenReel,
    language,
    setLanguage 
  } = useApp();

  const triggerVibeExplosion = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.2 },
      colors: ['#7C3AED', '#EC4899', '#F43F5E', '#A855F7', '#38BDF8'],
    });
  };

  return (
    <div className="min-h-screen bg-[#EDE7F6] text-gray-900 flex flex-col items-center justify-start p-2 sm:p-4">
      {/* Top Companion Control Bar */}
      <header className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-purple-100 px-4 py-2.5 mb-3 flex flex-wrap items-center justify-between gap-3 text-xs z-40">
        {/* App Title & Tagline */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-black bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              aww2ww
            </span>
            <span className="text-pink-500 text-lg font-bold">♥</span>
          </div>
          <span className="hidden sm:inline-block text-gray-500 font-serif italic border-l border-purple-200 pl-2.5">
            Facebook & Instagram Combined Platform
          </span>
        </div>

        {/* Quick Screen Jump Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto hide-scrollbar py-0.5">
          <button
            onClick={() => setActiveTab('home')}
            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold whitespace-nowrap transition-colors"
          >
            🏠 Feed
          </button>
          <button
            onClick={() => openChat('chat_ananya')}
            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold whitespace-nowrap transition-colors"
          >
            💬 Messenger
          </button>
          <button
            onClick={() => openFullscreenReel(0)}
            className="px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold whitespace-nowrap transition-colors"
          >
            🎬 Reels Player
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold whitespace-nowrap transition-colors"
          >
            👤 Profile
          </button>
          <button
            onClick={() => {
              setActiveTab('auth');
              setAuthScreen('login');
            }}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold whitespace-nowrap transition-colors"
          >
            🔐 Login
          </button>
          <button
            onClick={() => {
              setActiveTab('auth');
              setAuthScreen('signup');
            }}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold whitespace-nowrap transition-colors"
          >
            📝 Sign Up
          </button>
        </div>

        {/* View Mode & Language Selector */}
        <div className="flex items-center space-x-2">
          {/* Confetti button */}
          <button
            onClick={triggerVibeExplosion}
            className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xs hover:opacity-90 active:scale-95 transition-all"
            title="Celebrate Vibe 🎉"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Language Switch */}
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as any)}
            className="bg-purple-50 text-purple-700 font-bold text-xs py-1 px-2 rounded-lg border border-purple-200 focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="banglish">Banglish</option>
          </select>

          {/* Mobile / Desktop view switcher */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'mobile' ? 'bg-purple-700 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="iPhone 16 Pro Mockup Frame"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'desktop' ? 'bg-purple-700 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Full Width Responsive View"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      {viewMode === 'mobile' ? (
        /* Authentic iPhone 16 Pro Frame matching the uploaded screenshots */
        <div className="relative my-auto pb-4">
          <div className="w-[390px] sm:w-[412px] h-[860px] sm:h-[880px] bg-white rounded-[50px] shadow-[0_25px_60px_-15px_rgba(124,58,237,0.35),0_0_0_12px_#1e1b2e,0_0_0_14px_#3b3654,0_0_0_18px_rgba(255,255,255,0.4)] overflow-hidden flex flex-col relative border border-purple-900/40">
            {/* Status Bar */}
            <StatusBar />

            {/* App Scroll Area */}
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col relative">
              {children}
            </div>
          </div>
        </div>
      ) : (
        /* Full Desktop / Responsive layout */
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 min-h-[85vh] flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
};
