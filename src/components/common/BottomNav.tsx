import React from 'react';
import { Home, Tv, Store, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, setIsCreatePostOpen, t } = useApp();

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-purple-100/70 px-4 py-1.5 shadow-[0_-4px_20px_rgba(124,58,237,0.06)]">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all ${
            activeTab === 'home' ? 'text-purple-700 font-semibold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.home}</span>
        </button>

        {/* Watch */}
        <button
          onClick={() => setActiveTab('watch')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all ${
            activeTab === 'watch' ? 'text-purple-700 font-semibold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <Tv className={`w-5 h-5 transition-transform ${activeTab === 'watch' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.watch}</span>
        </button>

        {/* Center Elevated Floating Plus Button */}
        <button
          onClick={() => setIsCreatePostOpen(true)}
          aria-label="Create new post or reel"
          className="relative -top-4 group"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transform group-hover:scale-105 active:scale-95 transition-all border-4 border-white">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
        </button>

        {/* Marketplace */}
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all ${
            activeTab === 'marketplace' ? 'text-purple-700 font-semibold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <Store className={`w-5 h-5 transition-transform ${activeTab === 'marketplace' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.marketplace}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all ${
            activeTab === 'profile' ? 'text-purple-700 font-semibold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className={`w-6 h-6 rounded-full object-cover transition-all ${
                activeTab === 'profile' ? 'ring-2 ring-purple-600' : 'ring-1 ring-gray-200'
              }`}
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-pink-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[10px] tracking-tight">{t.profile}</span>
        </button>
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>
    </div>
  );
};
