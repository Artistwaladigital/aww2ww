import React from 'react';
import { X, Camera, Image, LayoutTemplate, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateReelSheet: React.FC = () => {
  const { isCreateReelOpen, setIsCreateReelOpen, showToast } = useApp();

  if (!isCreateReelOpen) return null;

  const actions = [
    {
      id: 'camera',
      label: 'Camera',
      icon: Camera,
      bg: 'bg-rose-100 text-rose-500',
      action: () => {
        showToast('Camera opened! Recording reel...');
        setIsCreateReelOpen(false);
      },
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: Image,
      bg: 'bg-emerald-100 text-emerald-600',
      action: () => {
        showToast('Choose video from gallery...');
        setIsCreateReelOpen(false);
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

        {/* 4 Quick Actions Row matching Screenshot 5 */}
        <div className="grid grid-cols-4 gap-3 w-full py-2">
          {actions.map(act => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={act.action}
                className="flex flex-col items-center space-y-2 group p-2 rounded-2xl hover:bg-gray-50 transition-colors"
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
