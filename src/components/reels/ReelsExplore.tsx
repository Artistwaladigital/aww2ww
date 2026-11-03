import React, { useState } from 'react';
import { Play, Sparkles, Video, Crown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';

export const ReelsExplore: React.FC = () => {
  const { reels, openFullscreenReel, setIsCreateReelOpen, t } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'foryou' | 'trending' | 'music' | 'dance' | 'travel'>('foryou');

  const filters = [
    { id: 'foryou' as const, label: '★ For You' },
    { id: 'trending' as const, label: '🔥 Trending' },
    { id: 'music' as const, label: '🎵 Music' },
    { id: 'dance' as const, label: '💃 Dance' },
    { id: 'travel' as const, label: '✈️ Travel' },
  ];

  // Extended grid items to match all 12 cells in Screenshot 5
  const exploreGrid = [
    { id: 'r1', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', views: '1.2M' },
    { id: 'r2', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', views: '856K' },
    { id: 'r3', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80', views: '2.4M' },
    { id: 'r4', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', views: '932K' },
    { id: 'r5', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', views: '3.6M' },
    { id: 'r6', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80', views: '1.1M' },
    { id: 'r7', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', views: '785K' },
    { id: 'r8', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', views: '2.2M' },
    { id: 'r9', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', views: '1.7M' },
    { id: 'r10', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', views: '4.8M' },
    { id: 'r11', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', views: '1.3M' },
    { id: 'r12', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80', views: '915K' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20 select-none">
      {/* Top Tabs */}
      <TopTabs />

      {/* Header and filters matching Screenshot 5 */}
      <div className="p-3.5 bg-white border-b border-purple-50">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-extrabold text-sm text-gray-900">
            {t.trendingReels}
          </span>
          <button className="text-xs font-semibold text-purple-700 hover:text-purple-800">
            See All &gt;
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedFilter === f.id
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Promo Banner matching Screenshot 5 */}
      <div className="mx-3 my-3 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white p-4 relative shadow-md">
        <div className="relative z-10 max-w-[65%] text-left">
          <div className="flex items-center space-x-1.5 mb-1">
            <Crown className="w-4 h-4 text-amber-300" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-200">Featured</span>
          </div>
          <h2 className="text-base font-extrabold leading-tight text-white">
            Express Yourself!
          </h2>
          <p className="text-[11px] text-white/90 mt-0.5">
            Create • Watch • Enjoy
          </p>

          <button
            onClick={() => openFullscreenReel(0)}
            className="mt-3 flex items-center space-x-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Watch Trending</span>
          </button>
        </div>

        {/* Cute banner graphic illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-36 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            alt="Hero Creator"
            className="w-full h-full object-cover object-center opacity-90 mask-radial"
          />
        </div>
      </div>

      {/* 3x4 Reels Grid matching Screenshot 5 */}
      <div className="px-3">
        <div className="grid grid-cols-3 gap-1.5">
          {exploreGrid.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openFullscreenReel(index % reels.length)}
              className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-200 cursor-pointer group shadow-2xs"
            >
              <img
                src={item.img}
                alt="Reel thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {/* View count pill */}
              <div className="absolute bottom-1.5 left-1.5 flex items-center space-x-0.5 text-white text-[10px] font-semibold drop-shadow-xs">
                <Play className="w-2.5 h-2.5 fill-white" />
                <span>{item.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating "Create Reel" Button */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <button
          onClick={() => setIsCreateReelOpen(true)}
          className="pointer-events-auto flex items-center space-x-2 bg-gradient-to-r from-purple-700 to-pink-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-purple-600/30 font-bold text-xs hover:scale-105 active:scale-95 transition-transform"
        >
          <Video className="w-4 h-4" />
          <span>{t.createReel}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
