import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  MoreHorizontal, 
  CheckCircle2, 
  UserPlus, 
  Grid, 
  Clapperboard, 
  Bookmark, 
  Play, 
  Heart,
  Crown,
  Camera
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROFILE_POSTS_GRID, MOCK_HIGHLIGHTS } from '../../data/mockData';

export const ProfileView: React.FC = () => {
  const { 
    profileUser, 
    currentUser,
    updateCurrentUser,
    logout,
    setActiveTab, 
    openChat, 
    isFollowingCreator, 
    toggleFollowCreator, 
    setIsProfileOptionsOpen, 
    setIsAboutModalOpen, 
    openFullscreenReel,
    showToast,
    t 
  } = useApp();

  const [activeTab, setActiveProfileTab] = useState<'posts' | 'reels' | 'tagged'>('posts');
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  const isMe = profileUser.id === currentUser.id;
  const isAnanya = profileUser.username === 'ananyasaha';

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    showToast('Uploading profile photo... 📸');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        await updateCurrentUser({ avatar: data.url });
        showToast('Profile photo updated! ✨');
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      showToast(`Upload failed: ${err.message || 'Try again'}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white pb-24 select-none">
      {/* Top Header matching Screenshot 4 */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-3 py-2 border-b border-purple-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setActiveTab('home')}>
          <span className="text-lg font-black tracking-tight bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
            aww2ww
          </span>
          <span className="text-pink-500 text-base font-bold">♥</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-700">
          <button
            onClick={() => {
              showToast('Sharing profile...');
            }}
            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
            title="Share"
          >
            <Send className="w-4.5 h-4.5 text-gray-700" />
          </button>
          <button
            onClick={() => setIsProfileOptionsOpen(true)}
            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
            title="Options"
          >
            <MoreHorizontal className="w-4.5 h-4.5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Cover Banner matching Screenshot 4 with neon crown effect */}
      <div className="relative h-44 w-full bg-gradient-to-r from-purple-900 via-indigo-950 to-pink-900 overflow-hidden">
        <img
          src={profileUser.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'}
          alt="Cover banner"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />

        {/* Neon Glowing Crown Graphic and Slogan matching Screenshot 4 */}
        <div className="absolute inset-0 flex items-center justify-between px-6 bg-gradient-to-t from-black/40 via-transparent to-black/20">
          <div className="text-left text-white">
            <h2 className="text-lg font-black italic tracking-wide font-serif drop-shadow-lg text-pink-200">
              Create
            </h2>
            <h2 className="text-lg font-black italic tracking-wide font-serif drop-shadow-lg text-purple-200">
              Inspire
            </h2>
            <h2 className="text-lg font-black italic tracking-wide font-serif drop-shadow-lg text-amber-200">
              Shine ✨
            </h2>
          </div>

          <div className="text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)] animate-pulse">
            <Crown className="w-14 h-14 stroke-[1.5]" />
          </div>
        </div>
      </div>

      {/* Avatar & Profile Identity Section */}
      <div className="px-4 relative -mt-14 mb-3 text-left">
        <div className="flex items-end justify-between">
          {/* Avatar with colorful gradient ring & online badge */}
          <div className="relative group">
            <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-xl">
              <div className="p-0.5 bg-white rounded-full relative">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-22 h-22 rounded-full object-cover"
                />
                {isMe && (
                  <label className="absolute inset-0 bg-black/45 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                    <Camera className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold">Change</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            {profileUser.online && (
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
            )}
          </div>

          {/* Stats Row matching Screenshot 4 */}
          <div className="flex items-center space-x-6 pb-2">
            <div className="text-center">
              <span className="font-black text-sm text-gray-900 block">
                {profileUser.postsCount || 245}
              </span>
              <span className="text-[11px] text-gray-500 font-medium">Posts</span>
            </div>
            <div className="text-center">
              <span className="font-black text-sm text-gray-900 block">
                {profileUser.followers || '2.4M'}
              </span>
              <span className="text-[11px] text-gray-500 font-medium">Followers</span>
            </div>
            <div className="text-center">
              <span className="font-black text-sm text-gray-900 block">
                {profileUser.following || '386'}
              </span>
              <span className="text-[11px] text-gray-500 font-medium">Following</span>
            </div>
          </div>
        </div>

        {/* Name, Handle, Creator Pill */}
        <div className="mt-2 text-left">
          <div className="flex items-center space-x-1.5">
            <h1 className="text-base font-black text-gray-900">{profileUser.name}</h1>
            {profileUser.verified && (
              <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
            )}
          </div>
          <span className="text-xs text-gray-500 font-medium block">
            @{profileUser.username}
          </span>
          <div className="mt-1">
            <span 
              onClick={() => setIsAboutModalOpen(true)}
              className="inline-block bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-purple-100"
            >
              {profileUser.category || 'Creator'}
            </span>
          </div>
        </div>

        {/* Action Buttons: Follow, Message, Add or Edit */}
        <div className="flex items-center space-x-2 mt-3.5">
          {isMe ? (
            <>
              <button
                onClick={() => {
                  const newBio = prompt('Update your Bio:', profileUser.bio || '');
                  if (newBio !== null) {
                    updateCurrentUser({ bio: newBio });
                  }
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:opacity-95 shadow-xs transition-all flex items-center justify-center space-x-1"
              >
                <span>Edit Bio ✍️</span>
              </button>
              <button
                onClick={() => {
                  const newName = prompt('Update your Display Name:', profileUser.name);
                  if (newName && newName.trim()) {
                    updateCurrentUser({ name: newName.trim() });
                  }
                }}
                className="flex-1 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors shadow-2xs flex items-center justify-center space-x-1.5"
              >
                <span>Edit Name</span>
              </button>
              <label className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors shadow-2xs flex items-center justify-center space-x-1 cursor-pointer">
                <Camera className="w-3.5 h-3.5" />
                <span>Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
              <button
                onClick={logout}
                className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors shadow-2xs"
              >
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={toggleFollowCreator}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1 ${
                  isFollowingCreator
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    : 'bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:opacity-95'
                }`}
              >
                <span>{isFollowingCreator ? '✓ Following' : '+ Follow'}</span>
              </button>

              <button
                onClick={() => openChat(isAnanya ? 'chat_ananya' : `chat_${profileUser.id}`)}
                className="flex-1 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors shadow-2xs flex items-center justify-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>

              <button
                onClick={() => showToast('Friend recommendation sent')}
                className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors shadow-2xs"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Bio Details matching Screenshot 4 */}
        <div 
          onClick={() => setIsAboutModalOpen(true)}
          className="mt-3 text-xs text-gray-700 space-y-1 cursor-pointer bg-purple-50/30 p-2.5 rounded-xl border border-purple-50 hover:bg-purple-50/60 transition-colors"
        >
          <p className="font-medium text-gray-800">
            ✨ Digital Creator | Fashion | Lifestyle | Travel
          </p>
          <p className="text-[11px] text-gray-600 flex items-center space-x-1">
            <span>📍</span>
            <span>Kolkata, West Bengal, India</span>
          </p>
          <p className="text-[11px] text-purple-600 flex items-center space-x-1">
            <span>✉️</span>
            <span>ananya@creators.com</span>
          </p>
          <p className="text-[11px] text-purple-700 flex items-center space-x-1 font-medium">
            <span>🔗</span>
            <span>www.instagram.com/ananyasaha</span>
          </p>
          <p className="text-[10px] text-gray-400 flex items-center space-x-1">
            <span>📅</span>
            <span>Joined AWW2WWW in March 2023</span>
          </p>
        </div>

        {/* Story Highlights Circles matching Screenshot 4 */}
        <div className="mt-3.5 pt-1">
          <div className="flex items-center space-x-3.5 overflow-x-auto hide-scrollbar pb-1">
            {MOCK_HIGHLIGHTS.map(h => (
              <div
                key={h.id}
                onClick={() => showToast(`Highlight: "${h.title}"`)}
                className="flex flex-col items-center shrink-0 cursor-pointer group"
              >
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 group-hover:scale-105 transition-transform">
                  <div className="p-0.5 bg-white rounded-full">
                    <img
                      src={h.coverUrl}
                      alt={h.title}
                      className="w-13 h-13 rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-[11px] text-gray-700 font-medium mt-1">
                  {h.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Content Tabs matching Screenshot 4 */}
      <div className="border-t border-b border-gray-100 flex items-center justify-around bg-white">
        <button
          onClick={() => setActiveProfileTab('posts')}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 transition-all relative ${
            activeTab === 'posts' ? 'text-purple-700 font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Grid className="w-4.5 h-4.5" />
          <span className="text-xs">{t.posts}</span>
          {activeTab === 'posts' && (
            <span className="absolute bottom-0 inset-x-6 h-0.5 bg-purple-700 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveProfileTab('reels')}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 transition-all relative ${
            activeTab === 'reels' ? 'text-purple-700 font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Clapperboard className="w-4.5 h-4.5" />
          <span className="text-xs">{t.reels}</span>
          {activeTab === 'reels' && (
            <span className="absolute bottom-0 inset-x-6 h-0.5 bg-purple-700 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveProfileTab('tagged')}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1.5 transition-all relative ${
            activeTab === 'tagged' ? 'text-purple-700 font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Bookmark className="w-4.5 h-4.5" />
          <span className="text-xs">{t.tagged}</span>
          {activeTab === 'tagged' && (
            <span className="absolute bottom-0 inset-x-6 h-0.5 bg-purple-700 rounded-full" />
          )}
        </button>
      </div>

      {/* 3x3 Photo Grid matching Screenshot 4 */}
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {PROFILE_POSTS_GRID.map(item => (
          <div
            key={item.id}
            onClick={() => {
              if (item.type === 'reel') {
                openFullscreenReel(0);
              } else {
                setSelectedImageModal(item.url);
              }
            }}
            className="relative aspect-square bg-gray-100 cursor-pointer overflow-hidden group shadow-2xs"
          >
            <img
              src={item.url}
              alt="Grid post"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Pinned badge on top left */}
            {item.pinned && (
              <span className="absolute top-1.5 left-1.5 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                Pinned
              </span>
            )}

            {/* Reel badge on top right */}
            {item.type === 'reel' && (
              <span className="absolute top-1.5 right-1.5 text-white drop-shadow-md">
                <Play className="w-3.5 h-3.5 fill-white" />
              </span>
            )}

            {/* Like count hover overlay / bottom pill */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 text-white text-xs font-bold">
              <Heart className="w-4 h-4 fill-white" />
              <span>{item.likes}</span>
            </div>

            {/* Subtle bottom like count always visible matching Screenshot 4 */}
            <div className="absolute bottom-1 left-1.5 flex items-center space-x-1 text-white text-[10px] font-semibold drop-shadow-md opacity-90">
              {item.type === 'reel' ? (
                <Play className="w-2.5 h-2.5 fill-white" />
              ) : (
                <Heart className="w-2.5 h-2.5 fill-white" />
              )}
              <span>{item.likes}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Lightbox */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out animate-fadeIn"
        >
          <img
            src={selectedImageModal}
            alt="Expanded view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
