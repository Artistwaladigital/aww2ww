import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StoriesBar: React.FC = () => {
  const { stories, openStory, currentUser, setIsCreatePostOpen, t } = useApp();

  return (
    <div className="w-full bg-white py-3 px-3 border-b border-purple-50">
      <div className="flex items-center space-x-3 overflow-x-auto hide-scrollbar pb-1">
        {/* Create Story Card / Circle */}
        <div 
          onClick={() => setIsCreatePostOpen(true)}
          className="flex flex-col items-center shrink-0 cursor-pointer group"
        >
          <div className="relative w-16 h-20 rounded-2xl overflow-hidden shadow-xs border border-purple-100 group-hover:shadow-md transition-all">
            <img
              src={currentUser.avatar}
              alt="Create Story"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end items-center pb-1">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center -mb-2 z-10 shadow-md">
                <Plus className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-700 mt-1">
            {t.createStory}
          </span>
        </div>

        {/* Stories List with gradient rings */}
        {stories.map((story, index) => {
          return (
            <div
              key={story.id}
              onClick={() => openStory(index)}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:scale-105 transition-transform">
                <div className="p-0.5 bg-white rounded-full">
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                {/* Active story indicator dot or badge */}
                {index === 0 && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white text-[9px]">
                    +
                  </div>
                )}
                {index > 0 && index % 2 === 1 && (
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="text-[11px] text-gray-800 font-medium mt-1 truncate max-w-[64px] text-center">
                {story.user.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
