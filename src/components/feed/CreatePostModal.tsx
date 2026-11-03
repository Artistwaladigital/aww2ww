import React, { useState } from 'react';
import { X, Image, Smile, Globe, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreatePostModal: React.FC = () => {
  const { isCreatePostOpen, setIsCreatePostOpen, currentUser, addPost } = useApp();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80'
  );
  const [audience, setAudience] = useState<'Public' | 'Friends'>('Public');
  const [selectedFeeling, setSelectedFeeling] = useState<string>('✨ Happy & Blessed');

  if (!isCreatePostOpen) return null;

  const sampleImages = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() && !selectedImage) return;
    const finalCaption = selectedFeeling ? `${caption}\n— feeling ${selectedFeeling}` : caption;
    addPost(finalCaption, selectedImage);
    setCaption('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="font-bold text-sm text-gray-900">Create Post</span>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-3">
          {/* User info */}
          <div className="flex items-center space-x-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-400"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">{currentUser.name}</span>
              <button
                type="button"
                onClick={() => setAudience(a => (a === 'Public' ? 'Friends' : 'Public'))}
                className="flex items-center space-x-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-md mt-0.5 w-fit"
              >
                <Globe className="w-3 h-3" />
                <span>{audience}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="What's on your mind? Share your story, vibe, or feelings with aww2ww community... ✨"
            rows={3}
            className="w-full p-2 text-xs text-gray-800 placeholder-gray-400 border border-purple-100 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400 resize-none"
            autoFocus
          />

          {/* Feeling tags */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {['✨ Happy & Blessed', '🎉 Excited', '☕ Cozy Vibes', '🌴 Travelling', '💪 Motivated'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFeeling(selectedFeeling === f ? '' : f)}
                className={`text-[10px] px-2.5 py-1 rounded-full shrink-0 transition-colors flex items-center space-x-1 ${
                  selectedFeeling === f
                    ? 'bg-purple-600 text-white font-medium shadow-xs'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                <Smile className="w-3 h-3" />
                <span>{f}</span>
              </button>
            ))}
          </div>

          {/* Select Photo */}
          <div>
            <label className="text-[11px] font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Image className="w-3.5 h-3.5 text-purple-600" />
                <span>Attach Photo</span>
              </span>
              <span className="text-[10px] text-purple-500">Tap to select</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {sampleImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === img ? 'border-purple-600 scale-95 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="choice" className="w-full h-full object-cover" />
                  {selectedImage === img && (
                    <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:opacity-95 active:scale-98 transition-all mt-2"
          >
            Post to aww2ww ✨
          </button>
        </form>
      </div>
    </div>
  );
};
