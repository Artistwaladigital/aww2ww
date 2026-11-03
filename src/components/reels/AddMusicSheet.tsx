import React, { useState } from 'react';
import { X, Play, Pause, Music2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddMusicSheet: React.FC = () => {
  const { isAddMusicOpen, setIsAddMusicOpen, songs, selectedSong, setSelectedSong, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'trending' | 'bengali' | 'hindi' | 'english' | 'lofi'>('trending');
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  if (!isAddMusicOpen) return null;

  const categories = [
    { id: 'trending' as const, label: 'Trending' },
    { id: 'bengali' as const, label: 'Bengali' },
    { id: 'hindi' as const, label: 'Hindi' },
    { id: 'english' as const, label: 'English' },
    { id: 'lofi' as const, label: 'Lofi' },
  ];

  const filteredSongs = songs.filter(s => {
    if (activeTab === 'trending') return true;
    return s.category === activeTab;
  });

  const togglePlay = (sId: string) => {
    if (playingSongId === sId) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(sId);
    }
  };

  const handleSelectSong = (song: typeof songs[0]) => {
    setSelectedSong(song);
    showToast(`Music selected: ${song.title} 🎵`);
    setIsAddMusicOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
        {/* Grab Handle & Header */}
        <div className="pt-2 px-4 pb-2 border-b border-gray-100 flex flex-col items-center">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-2"></div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Music2 className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-xs text-gray-900">Add Music</span>
            </div>
            <button
              onClick={() => setIsAddMusicOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 px-4 py-2.5 overflow-x-auto hide-scrollbar border-b border-gray-100">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeTab === cat.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredSongs.map(song => {
            const isPlaying = playingSongId === song.id;
            const isSelected = selectedSong?.id === song.id;
            return (
              <div
                key={song.id}
                onClick={() => handleSelectSong(song)}
                className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-colors ${
                  isSelected ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 overflow-hidden flex items-center justify-center text-white shadow-xs shrink-0">
                    <Music2 className="w-5 h-5" />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900 line-clamp-1">{song.title}</span>
                    <span className="text-[11px] text-gray-500 line-clamp-1">
                      {song.artist} • {song.reelsCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
