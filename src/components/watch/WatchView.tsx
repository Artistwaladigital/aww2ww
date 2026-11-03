import React, { useState } from 'react';
import { Play, Tv, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';

export const WatchView: React.FC = () => {
  const { showToast } = useApp();
  const [playingId, setPlayingId] = useState<string | null>('v1');

  const videos = [
    {
      id: 'v1',
      title: 'A Day in the Life of a Creator in Kolkata • Secret Spots & Cafes',
      creator: 'Ananya Saha',
      creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      views: '420K views • 2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      likes: '34K',
      comments: '1.8K',
    },
    {
      id: 'v2',
      title: 'Backpacking Through Northern Bengal & Sikkim: Budget Solo Travel Guide',
      creator: 'Mousumi Das',
      creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      views: '185K views • 4 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      likes: '19K',
      comments: '920',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20 select-none">
      <TopTabs />

      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-purple-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tv className="w-5 h-5 text-purple-700" />
          <h1 className="text-base font-extrabold text-gray-900">aww2ww Watch</h1>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <button className="bg-purple-50 text-purple-700 font-bold px-3 py-1 rounded-full">
            For You
          </button>
          <button className="text-gray-500 font-medium px-2 py-1">Shows</button>
          <button className="text-gray-500 font-medium px-2 py-1">Saved</button>
        </div>
      </div>

      {/* Watch Video Feed */}
      <div className="divide-y divide-gray-100">
        {videos.map(v => (
          <div key={v.id} className="bg-white my-2 shadow-2xs border-y border-purple-50 text-left">
            {/* Video Player */}
            <div className="relative aspect-video bg-black overflow-hidden group">
              {playingId === v.id ? (
                <video
                  src={v.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  onClick={() => setPlayingId(v.id)}
                  className="w-full h-full cursor-pointer relative"
                >
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-3.5">
              <div className="flex items-start space-x-3">
                <img
                  src={v.creatorAvatar}
                  alt={v.creator}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-300 shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-xs font-bold text-gray-900 line-clamp-2 leading-relaxed">
                    {v.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-[11px] text-gray-500 mt-1">
                    <span className="font-semibold text-purple-700">{v.creator}</span>
                    <span>•</span>
                    <span>{v.views}</span>
                  </div>
                </div>
              </div>

              {/* Actions bar */}
              <div className="flex items-center justify-around border-t border-gray-100 mt-3 pt-2 text-xs text-gray-600">
                <button 
                  onClick={() => showToast('Liked video ❤️')}
                  className="flex items-center space-x-1.5 hover:text-purple-600"
                >
                  <Heart className="w-4 h-4" />
                  <span>{v.likes}</span>
                </button>
                <button 
                  onClick={() => showToast('Opening comments...')}
                  className="flex items-center space-x-1.5 hover:text-purple-600"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{v.comments}</span>
                </button>
                <button 
                  onClick={() => showToast('Video link copied!')}
                  className="flex items-center space-x-1.5 hover:text-purple-600"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
