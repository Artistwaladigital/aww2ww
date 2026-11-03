import React, { useState, useRef } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Share2, 
  Gift, 
  Music, 
  Search, 
  Camera, 
  CheckCircle2, 
  Plus, 
  Volume2, 
  VolumeX, 
  Play, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const FullscreenReelPlayer: React.FC = () => {
  const { 
    reels, 
    activeReelIndex, 
    setActiveReelIndex, 
    isFullscreenReelOpen, 
    closeFullscreenReel, 
    toggleLikeReel, 
    setIsReelCommentsOpen, 
    setIsAddMusicOpen, 
    setIsCreateReelOpen,
    isFollowingCreator, 
    toggleFollowCreator, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!isFullscreenReelOpen) return null;

  const currentReel = reels[activeReelIndex] || reels[0];

  const handleNextReel = () => {
    if (activeReelIndex < reels.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    } else {
      setActiveReelIndex(0);
    }
  };

  const handlePrevReel = () => {
    if (activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    } else {
      setActiveReelIndex(reels.length - 1);
    }
  };

  const handleGift = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EC4899', '#8B5CF6'],
    });
    showToast('Sent a virtual diamond gift 🎁✨ to Creator!');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none">
      <div className="relative w-full max-w-sm h-full max-h-[880px] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Top Header matching Screenshot 5 */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={closeFullscreenReel}
              className="p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <span className="text-base font-extrabold tracking-tight">Reels</span>
          </div>

          {/* Sub tabs: For You | Following */}
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('foryou')}
              className={`transition-colors ${
                activeTab === 'foryou' ? 'text-white border-b-2 border-white pb-0.5' : 'text-white/70'
              }`}
            >
              For You
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`transition-colors ${
                activeTab === 'following' ? 'text-white border-b-2 border-white pb-0.5' : 'text-white/70'
              }`}
            >
              Following
            </button>
          </div>

          {/* Search & Camera */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => showToast('Search Reels')}
              className="p-1 rounded-full bg-black/30 hover:bg-black/50"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setIsCreateReelOpen(true)}
              className="p-1 rounded-full bg-black/30 hover:bg-black/50"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Video Player / Visual Media */}
        <div 
          onClick={togglePlay}
          className="relative w-full h-full flex items-center justify-center bg-zinc-900 cursor-pointer overflow-hidden"
        >
          {currentReel.videoUrl ? (
            <video
              ref={videoRef}
              src={currentReel.videoUrl}
              poster={currentReel.thumbnailUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentReel.thumbnailUrl}
              alt="Reel content"
              className="w-full h-full object-cover"
            />
          )}

          {/* Subtle gradient overlays for text readability */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Play/Pause indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-white backdrop-blur-xs">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
          )}

          {/* Mute button */}
          <button
            onClick={e => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute top-16 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Reel Navigation arrows */}
        <div className="absolute right-3 top-28 z-20 flex flex-col space-y-2 opacity-60 hover:opacity-100 transition-opacity">
          <button
            onClick={handlePrevReel}
            className="p-1 rounded-full bg-black/40 text-white hover:bg-black/70"
            title="Previous Reel"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextReel}
            className="p-1 rounded-full bg-black/40 text-white hover:bg-black/70"
            title="Next Reel"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right Floating Actions Column matching Screenshot 5 */}
        <div className="absolute right-3 bottom-12 z-30 flex flex-col items-center space-y-4">
          {/* Creator Avatar with follow badge */}
          <div className="relative group cursor-pointer mb-1">
            <img
              src={currentReel.user.avatar}
              alt={currentReel.user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            {!isFollowingCreator && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleFollowCreator();
                }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center border border-white text-[10px]"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Like Heart */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleLikeReel(currentReel.id);
            }}
            className="flex flex-col items-center group active:scale-125 transition-transform"
          >
            <Heart
              className={`w-7 h-7 drop-shadow-md transition-colors ${
                currentReel.isLiked ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-white'
              }`}
            />
            <span className="text-[11px] font-semibold text-white drop-shadow-md mt-0.5">
              {currentReel.likesCount}
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={e => {
              e.stopPropagation();
              setIsReelCommentsOpen(true);
            }}
            className="flex flex-col items-center group active:scale-110 transition-transform"
          >
            <MessageCircle className="w-7 h-7 text-white drop-shadow-md" />
            <span className="text-[11px] font-semibold text-white drop-shadow-md mt-0.5">
              {currentReel.commentsCount}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard?.writeText(window.location.href);
              showToast('Reel link copied! 📋');
            }}
            className="flex flex-col items-center group active:scale-110 transition-transform"
          >
            <Share2 className="w-7 h-7 text-white drop-shadow-md" />
            <span className="text-[11px] font-semibold text-white drop-shadow-md mt-0.5">
              {currentReel.sharesCount}
            </span>
          </button>

          {/* Gift */}
          <button
            onClick={e => {
              e.stopPropagation();
              handleGift();
            }}
            className="flex flex-col items-center group active:scale-125 transition-transform"
          >
            <Gift className="w-7 h-7 text-amber-400 drop-shadow-md" />
            <span className="text-[11px] font-semibold text-white drop-shadow-md mt-0.5">
              Gift
            </span>
          </button>

          {/* Rotating Audio Disc */}
          <div
            onClick={e => {
              e.stopPropagation();
              setIsAddMusicOpen(true);
            }}
            className="w-8 h-8 rounded-full border-2 border-white/60 overflow-hidden shadow-lg animate-spin cursor-pointer"
            style={{ animationDuration: '4s' }}
          >
            <img
              src={currentReel.user.avatar}
              alt="Audio disk"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Left Creator Details Overlay matching Screenshot 5 */}
        <div className="absolute left-4 right-18 bottom-6 z-30 text-white text-left drop-shadow-md">
          {/* Creator name & Follow button */}
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-xs font-bold text-white flex items-center space-x-1">
              <span>{currentReel.user.name}</span>
              {currentReel.user.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400 inline" />
              )}
            </span>
            <button
              onClick={toggleFollowCreator}
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full transition-all ${
                isFollowingCreator
                  ? 'bg-white/20 text-white border border-white/40'
                  : 'bg-white text-gray-900 shadow-xs'
              }`}
            >
              {isFollowingCreator ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Caption */}
          <p className="text-xs text-white/90 line-clamp-2 leading-relaxed mb-2">
            {currentReel.caption}
          </p>

          {/* Music Ticker */}
          <div
            onClick={() => setIsAddMusicOpen(true)}
            className="flex items-center space-x-2 text-[11px] text-white/90 cursor-pointer bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit hover:bg-black/60 transition-colors"
          >
            <Music className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
            <span className="truncate max-w-[200px]">{currentReel.musicTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
