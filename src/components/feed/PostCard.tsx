import React, { useState } from 'react';
import { 
  Globe, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageCircle, 
  Send, 
  Share2, 
  Play, 
  Camera,
  CheckCircle2
} from 'lucide-react';
import type { Post } from '../../types';
import { useApp } from '../../context/AppContext';
import { ReactionsPopup } from './ReactionsPopup';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { 
    reactToPost, 
    openPostComments, 
    openFullscreenReel, 
    setProfileUser, 
    setActiveTab, 
    showToast,
    t 
  } = useApp();

  const [showReactions, setShowReactions] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const totalReactions = 
    post.reactions.like +
    post.reactions.love +
    post.reactions.care +
    post.reactions.haha +
    post.reactions.wow +
    post.reactions.sad +
    post.reactions.angry;

  const userReaction = post.reactions.userReaction;

  const getReactionDisplay = () => {
    switch (userReaction) {
      case 'love':
        return { emoji: '❤️', label: 'Love', color: 'text-pink-600 font-semibold' };
      case 'care':
        return { emoji: '🥰', label: 'Care', color: 'text-amber-500 font-semibold' };
      case 'haha':
        return { emoji: '😆', label: 'Haha', color: 'text-amber-500 font-semibold' };
      case 'wow':
        return { emoji: '😮', label: 'Wow', color: 'text-amber-500 font-semibold' };
      case 'sad':
        return { emoji: '😢', label: 'Sad', color: 'text-amber-600 font-semibold' };
      case 'angry':
        return { emoji: '😡', label: 'Angry', color: 'text-rose-600 font-semibold' };
      case 'like':
      default:
        return userReaction 
          ? { emoji: '👍', label: 'Like', color: 'text-purple-600 font-semibold' }
          : { emoji: '', label: t.like, color: 'text-gray-600' };
    }
  };

  const reactionDisplay = getReactionDisplay();

  const handleUserClick = () => {
    setProfileUser(post.user);
    setActiveTab('profile');
  };

  return (
    <article className="bg-white mx-3 my-2.5 rounded-2xl overflow-hidden shadow-xs border border-purple-50">
      {/* Post Header */}
      <div className="p-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div 
            onClick={handleUserClick}
            className="relative cursor-pointer group"
          >
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            </div>
            {post.user.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
            )}
          </div>

          <div className="flex flex-col text-left">
            <div 
              onClick={handleUserClick}
              className="flex items-center space-x-1 cursor-pointer hover:underline"
            >
              <span className="text-xs font-bold text-gray-900">{post.user.name}</span>
              {post.user.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
              )}
            </div>
            <div className="flex items-center space-x-1 text-[11px] text-gray-400">
              <span>{post.timestamp}</span>
              <span>•</span>
              <Globe className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>

        <button 
          onClick={() => showToast('Post options')}
          aria-label="More options"
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-3.5 pb-3 text-left">
        <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-line font-normal">
          {post.caption}
        </p>
      </div>

      {/* Media Grid / Collage (Hybrid Facebook + Instagram Layout matching Screenshot 1) */}
      {post.media && post.media.length > 0 && (
        <div className="w-full select-none">
          {post.media.length === 1 ? (
            <div 
              onClick={() => setSelectedPhoto(post.media[0].url)}
              className="relative w-full aspect-square max-h-96 bg-gray-100 cursor-pointer overflow-hidden"
            >
              <img
                src={post.media[0].url}
                alt="Post media"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
          ) : post.media.length >= 4 ? (
            /* 4-Item Grid matching Tania Roy's post from Screenshot 1 */
            <div className="grid grid-cols-2 gap-1 px-1 bg-gray-50">
              {/* Left Large Photo */}
              <div 
                onClick={() => setSelectedPhoto(post.media[0].url)}
                className="relative h-72 rounded-l-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={post.media[0].url}
                  alt="Main post visual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 1/6 carousel pill */}
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  1/6
                </span>
                {/* 5.2K photo view pill */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <Camera className="w-3 h-3" />
                  <span>5.2K</span>
                </div>
              </div>

              {/* Right Column with 3 Sub-Items */}
              <div className="grid grid-rows-3 gap-1 h-72">
                <div 
                  onClick={() => setSelectedPhoto(post.media[1].url)}
                  className="relative rounded-tr-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={post.media[1].url}
                    alt="Side photo 1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div 
                  onClick={() => setSelectedPhoto(post.media[2].url)}
                  className="relative overflow-hidden cursor-pointer group"
                >
                  <img
                    src={post.media[2].url}
                    alt="Side photo 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Reel item */}
                <div 
                  onClick={() => openFullscreenReel(0)}
                  className="relative rounded-br-xl overflow-hidden cursor-pointer group bg-gradient-to-br from-purple-900 to-pink-900"
                >
                  <img
                    src={post.media[3]?.url || post.media[0].url}
                    alt="Reel preview"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-purple-900/30 flex items-center justify-center">
                    <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center space-x-1 border border-white/20">
                      <Play className="w-2.5 h-2.5 fill-white" />
                      <span>Reel</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 2-Item Grid */
            <div className="grid grid-cols-2 gap-1 px-1">
              {post.media.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(m.url)}
                  className="relative h-48 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={m.url}
                    alt="Post visual"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stats Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100">
        <div className="flex items-center space-x-1.5 cursor-pointer">
          <div className="flex items-center -space-x-1">
            <span className="w-4.5 h-4.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] border border-white shadow-2xs">
              👍
            </span>
            <span className="w-4.5 h-4.5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] border border-white shadow-2xs">
              ❤️
            </span>
            <span className="w-4.5 h-4.5 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px] border border-white shadow-2xs">
              😮
            </span>
          </div>
          <span className="text-[11px] font-medium text-gray-600">
            {totalReactions > 3000 ? `${(totalReactions / 1000).toFixed(1)}K` : totalReactions}
          </span>
        </div>

        <div 
          onClick={() => openPostComments(post)}
          className="flex items-center space-x-2 text-[11px] text-gray-500 cursor-pointer hover:underline"
        >
          <span>{post.commentsCount} Comments</span>
          <span>•</span>
          <span>{post.sharesCount} Shares</span>
        </div>
      </div>

      {/* Action Buttons Bar with Facebook Reactions */}
      <div className="px-2 py-1 flex items-center justify-between relative">
        {/* Like Button with Hover/Click Reaction Sheet */}
        <div 
          className="relative flex-1"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          {showReactions && (
            <ReactionsPopup
              onSelect={type => {
                reactToPost(post.id, type);
                setShowReactions(false);
              }}
              onClose={() => setShowReactions(false)}
            />
          )}

          <button
            onClick={() => reactToPost(post.id, userReaction ? userReaction : 'like')}
            className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-purple-50/60 active:scale-95 transition-all"
          >
            {reactionDisplay.emoji ? (
              <span className="text-base">{reactionDisplay.emoji}</span>
            ) : (
              <ThumbsUp className="w-4 h-4 text-gray-600" />
            )}
            <span className={`text-xs ${reactionDisplay.color}`}>
              {reactionDisplay.label}
            </span>
          </button>
        </div>

        {/* Comment Button */}
        <button
          onClick={() => openPostComments(post)}
          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-purple-50/60 active:scale-95 transition-all text-gray-600"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium">{t.comment}</span>
        </button>

        {/* Send Button */}
        <button
          onClick={() => {
            setActiveTab('messenger');
            showToast('Sharing to Messenger chat...');
          }}
          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-purple-50/60 active:scale-95 transition-all text-gray-600"
        >
          <Send className="w-4 h-4" />
          <span className="text-xs font-medium">{t.send}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            showToast('Post link copied to clipboard! 📋');
          }}
          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg hover:bg-purple-50/60 active:scale-95 transition-all text-gray-600"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-xs font-medium">{t.share}</span>
        </button>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out animate-fadeIn"
        >
          <img
            src={selectedPhoto}
            alt="Enlarged view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </article>
  );
};
