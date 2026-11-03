import React from 'react';
import { Video, Image, Clapperboard, Smile } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreatePostBox: React.FC = () => {
  const { currentUser, setIsCreatePostOpen, setIsCreateReelOpen, showToast, t } = useApp();

  return (
    <div className="bg-white mx-3 my-2.5 rounded-2xl p-3 shadow-xs border border-purple-50">
      {/* Top Input Bar */}
      <div 
        onClick={() => setIsCreatePostOpen(true)}
        className="flex items-center space-x-3 cursor-pointer pb-3 border-b border-gray-100"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-200"
        />
        <div className="flex-1 bg-purple-50/50 hover:bg-purple-50/80 rounded-full px-4 py-2 transition-colors flex items-center justify-between">
          <span className="text-xs text-gray-500 font-normal">
            {t.whatsOnYourMind}
          </span>
          <span className="text-purple-400">✨</span>
        </div>
        <button 
          aria-label="Pick photo"
          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
        >
          <Image className="w-5 h-5 text-purple-600" />
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between pt-2.5 px-1">
        <button
          onClick={() => showToast('Starting Live Broadcast 🎥')}
          className="flex items-center space-x-1.5 py-1 px-2 rounded-lg hover:bg-pink-50 transition-colors text-xs font-medium text-gray-700"
        >
          <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
            <Video className="w-3 h-3" />
          </div>
          <span>{t.live}</span>
        </button>

        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex items-center space-x-1.5 py-1 px-2 rounded-lg hover:bg-emerald-50 transition-colors text-xs font-medium text-gray-700"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Image className="w-3 h-3" />
          </div>
          <span>{t.photo}</span>
        </button>

        <button
          onClick={() => setIsCreateReelOpen(true)}
          className="flex items-center space-x-1.5 py-1 px-2 rounded-lg hover:bg-purple-50 transition-colors text-xs font-medium text-gray-700"
        >
          <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <Clapperboard className="w-3 h-3" />
          </div>
          <span>{t.reels}</span>
        </button>

        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex items-center space-x-1.5 py-1 px-2 rounded-lg hover:bg-amber-50 transition-colors text-xs font-medium text-gray-700"
        >
          <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
            <Smile className="w-3 h-3" />
          </div>
          <span>{t.feeling}</span>
        </button>
      </div>
    </div>
  );
};
