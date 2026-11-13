import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  CheckCircle2, 
  UserPlus, 
  Grid, 
  Clapperboard, 
  Bookmark, 
  Play, 
  Crown,
  MapPin,
  Mail,
  Calendar,
  Link as LinkIcon,
  MessageCircle,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROFILE_POSTS_GRID, MOCK_HIGHLIGHTS } from '../../data/mockData';
import { CreatePostBox } from '../feed/CreatePostBox';

export const DesktopProfile: React.FC = () => {
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isMe = profileUser.id === currentUser.id;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 pb-16 select-none">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-xs border border-purple-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-purple-900 via-indigo-950 to-pink-900 overflow-hidden">
          <img
            src={profileUser.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80'}
            alt="Cover banner"
            className="w-full h-full object-cover opacity-75"
          />
          {/* Subtle neon glow & brand badge */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-pink-300 text-xs font-bold border border-pink-500/30">
            <Crown className="w-4 h-4 text-pink-400" />
            <span>VIP Creator</span>
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 pb-6 pt-3 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-20 md:-mt-24 mb-4">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-3 md:space-y-0 md:space-x-5 text-center md:text-left">
              <div className="relative">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-purple-100"
                />
                {profileUser.online && (
                  <span className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
                )}
              </div>

              <div className="pt-2 md:pt-0">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                    {profileUser.name}
                  </h1>
                  {profileUser.verified && (
                    <span className="text-blue-500" title="Verified Creator">
                      <CheckCircle2 className="w-6 h-6 fill-blue-500 text-white" />
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-purple-600 mt-0.5">
                  @{profileUser.username} • <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md">{profileUser.category}</span>
                </p>

                {/* Follower Stats */}
                <div className="flex items-center justify-center md:justify-start space-x-5 mt-2.5 text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{profileUser.postsCount}</span>{' '}
                    <span className="text-gray-500">{t.posts}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{profileUser.followers}</span>{' '}
                    <span className="text-gray-500">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{profileUser.following}</span>{' '}
                    <span className="text-gray-500">{t.following}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-2.5">
              {isMe ? (
                <>
                  <button
                    onClick={() => {
                      const newBio = prompt('Update your Bio:', profileUser.bio || '');
                      if (newBio !== null) {
                        updateCurrentUser({ bio: newBio });
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white hover:opacity-95 shadow-xs transition-all active:scale-95"
                  >
                    Edit Bio ✍️
                  </button>
                  <button
                    onClick={() => {
                      const newName = prompt('Update your Display Name:', profileUser.name);
                      if (newName && newName.trim()) {
                        updateCurrentUser({ name: newName.trim() });
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    Edit Name
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleFollowCreator}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-xs transition-all active:scale-95 ${
                      isFollowingCreator
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white hover:opacity-95'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isFollowingCreator ? t.following : t.follow}</span>
                  </button>

                  <button
                    onClick={() => {
                      openChat(profileUser.id === 'user_ananya' ? 'chat_ananya' : `chat_${profileUser.id}`);
                      setActiveTab('messenger');
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center space-x-2 transition-colors active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.message}</span>
                  </button>
                </>
              )}

              <button
                onClick={() => showToast('Profile link copied to clipboard! 📋')}
                className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsProfileOptionsOpen(true)}
                className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                title="Options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Story Highlights Bar */}
          <div className="border-t border-purple-50 pt-3 mt-4">
            <span className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
              Story Highlights
            </span>
            <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar pb-1">
              {MOCK_HIGHLIGHTS.map(hl => (
                <div
                  key={hl.id}
                  onClick={() => showToast(`Playing ${hl.title} highlight`)}
                  className="flex flex-col items-center shrink-0 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full p-0.5 border-2 border-purple-400 group-hover:border-pink-500 transition-colors">
                    <img
                      src={hl.coverUrl}
                      alt={hl.title}
                      className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 mt-1">
                    {hl.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation (Posts, Reels, Tagged) */}
          <div className="flex items-center justify-center space-x-8 border-t border-purple-100 pt-3 mt-4 text-xs font-bold text-gray-500">
            <button
              onClick={() => setActiveProfileTab('posts')}
              className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                activeTab === 'posts'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent hover:text-gray-800'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{t.posts}</span>
            </button>
            <button
              onClick={() => setActiveProfileTab('reels')}
              className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                activeTab === 'reels'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent hover:text-gray-800'
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              <span>{t.reels}</span>
            </button>
            <button
              onClick={() => setActiveProfileTab('tagged')}
              className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                activeTab === 'tagged'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent hover:text-gray-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Tagged</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Desktop Profile Layout (Facebook/Instagram Web Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Intro & Details Card */}
        <div className="space-y-4">
          {/* Intro Card */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-purple-100 space-y-3">
            <h2 className="text-sm font-black text-gray-900 tracking-tight">Intro</h2>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
              {profileUser.bio}
            </p>

            <div className="pt-2 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Lives in <strong>{profileUser.location}</strong></span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-purple-700 font-medium">{profileUser.email || 'ananya@creators.com'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <LinkIcon className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-purple-700 font-medium">{profileUser.instagram || 'www.instagram.com/ananyasaha'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{profileUser.joinedDate || 'Joined March 2023'}</span>
              </div>
            </div>

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="w-full mt-2 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl transition-colors"
            >
              Edit bio & details
            </button>
          </div>

          {/* Photos Grid Card (Facebook style) */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-gray-900">Photos</h2>
              <button 
                onClick={() => setActiveProfileTab('posts')}
                className="text-xs font-bold text-purple-600 hover:text-purple-700"
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
              {PROFILE_POSTS_GRID.slice(0, 9).map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item.url)}
                  className="relative aspect-square cursor-pointer group overflow-hidden"
                >
                  <img
                    src={item.url}
                    alt="photo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                    ❤️ {item.likes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tab Content (Posts, Reels, Tagged) */}
        <div className="md:col-span-2 space-y-4">
          {activeTab === 'posts' && (
            <>
              {/* Post Composer */}
              <CreatePostBox />

              {/* Instagram-style 3-Column Photo Grid */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-purple-100">
                <h3 className="text-sm font-bold text-gray-800 mb-3">All Posts</h3>
                <div className="grid grid-cols-3 gap-2">
                  {PROFILE_POSTS_GRID.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item.url)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-gray-100 shadow-2xs"
                    >
                      <img
                        src={item.url}
                        alt="grid item"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {item.pinned && (
                        <span className="absolute top-2 left-2 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          Pinned
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 text-white text-xs font-bold">
                        <span>❤️ {item.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'reels' && (
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-purple-100">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Reels by {profileUser.name}</h3>
              <div className="grid grid-cols-3 gap-3">
                {PROFILE_POSTS_GRID.filter(p => p.type === 'reel').map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => openFullscreenReel(idx)}
                    className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group bg-black shadow-md"
                  >
                    <img
                      src={item.url}
                      alt="reel"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                      <div className="flex items-center space-x-1 text-xs font-bold">
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tagged' && (
            <div className="bg-white rounded-2xl p-8 shadow-xs border border-purple-100 text-center text-gray-400">
              <Bookmark className="w-12 h-12 mx-auto mb-2 text-purple-200" />
              <h3 className="text-sm font-bold text-gray-700">Photos of {profileUser.name}</h3>
              <p className="text-xs text-gray-400 mt-1">When friends tag {profileUser.name} in photos, they will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Image Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-transparent">
            <img 
              src={selectedImage} 
              alt="Enlarged" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
