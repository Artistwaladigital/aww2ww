import React, { useRef, useState } from 'react';
import { X, Camera, Image, LayoutTemplate, Sparkles, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateReelSheet: React.FC = () => {
  const { isCreateReelOpen, setIsCreateReelOpen, showToast, addPost } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!isCreateReelOpen) return null;

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    showToast('Uploading Reel to Cloudflare R2... 🎬');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        addPost('New Reel Video ✨ #aww2ww #trending', data.url);
        showToast('Reel uploaded and posted to Cloudflare R2! 🎉');
        setIsCreateReelOpen(false);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      console.error('Reel upload error:', err);
      showToast(`Upload error: ${err.message || 'Try again'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const actions = [
    {
      id: 'camera',
      label: 'Camera',
      icon: Camera,
      bg: 'bg-rose-100 text-rose-500',
      action: () => {
        videoInputRef.current?.click();
      },
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: Image,
      bg: 'bg-emerald-100 text-emerald-600',
      action: () => {
        videoInputRef.current?.click();
      },
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: LayoutTemplate,
      bg: 'bg-purple-100 text-purple-600',
      action: () => {
        showToast('Trending Reels templates applied!');
        setIsCreateReelOpen(false);
      },
    },
    {
      id: 'effects',
      label: 'Effects',
      icon: Sparkles,
      bg: 'bg-amber-100 text-amber-500',
      action: () => {
        showToast('Beauty & Glow filter selected ✨');
        setIsCreateReelOpen(false);
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden p-4 flex flex-col items-center">
        {/* Grab bar */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mb-3"></div>

        <div className="w-full flex items-center justify-between mb-4">
          <span className="font-bold text-sm text-gray-900">Create Reel</span>
          <button
            onClick={() => setIsCreateReelOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <input
          type="file"
          ref={videoInputRef}
          onChange={handleVideoUpload}
          accept="video/*"
          className="hidden"
        />

        {isUploading && (
          <div className="w-full p-4 mb-3 bg-purple-50 rounded-2xl flex items-center justify-center space-x-2 text-xs font-bold text-purple-700">
            <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
            <span>Uploading video to Cloudflare R2...</span>
          </div>
        )}

        {/* 4 Quick Actions Row */}
        <div className="grid grid-cols-4 gap-3 w-full py-2">
          {actions.map(act => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                disabled={isUploading}
                onClick={act.action}
                className="flex flex-col items-center space-y-2 group p-2 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <div
                  className={`w-13 h-13 rounded-2xl ${act.bg} flex items-center justify-center shadow-xs group-hover:scale-105 active:scale-95 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
