import React from 'react';
import { Home, Users, Clapperboard, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    setProfileUser, 
    pendingFriendRequestsCount, 
    setIsCreatePostOpen, 
    t 
  } = useApp();

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-purple-100/70 px-4 py-1.5 shadow-[0_-4px_20px_rgba(124,58,237,0.06)]">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        
        {/* 1. Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight">{t.home}</span>
        </button>

        {/* 2. Friends */}
        <button
          onClick={() => setActiveTab('friends')}
          className={`relative flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all cursor-pointer ${
            activeTab === 'friends' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <div className="relative">
            <Users className={`w-5 h-5 transition-transform ${activeTab === 'friends' ? 'scale-110' : ''}`} />
            {pendingFriendRequestsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-purple-600 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
                {pendingFriendRequestsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">{t.friends}</span>
        </button>

        {/* 3. Center Elevated Floating Plus Button (Create Post / Reel) */}
        <button
          onClick={() => setIsCreatePostOpen(true)}
          aria-label="Create new post or reel"
          className="relative -top-4 group cursor-pointer"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transform group-hover:scale-105 active:scale-95 transition-all border-4 border-white">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
        </button>

        {/* 4. Reels (with Hot badge) */}
        <button
          onClick={() => setActiveTab('reels')}
          className={`relative flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all cursor-pointer ${
            activeTab === 'reels' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <div className="relative">
            <Clapperboard className={`w-5 h-5 transition-transform ${activeTab === 'reels' ? 'scale-110' : ''}`} />
            <span className="absolute -top-1.5 -right-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[8px] font-extrabold px-1 rounded-full uppercase">
              Hot
            </span>
          </div>
          <span className="text-[10px] tracking-tight">{t.reels}</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => {
            setProfileUser(currentUser);
            setActiveTab('profile');
          }}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2 transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600'
          }`}
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
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
      <div className="w-28 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>
    </div>
  );
};
