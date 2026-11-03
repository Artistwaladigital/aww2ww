import React, { useState } from 'react';
import { X, Heart, Smile, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReelCommentsSheet: React.FC = () => {
  const { isReelCommentsOpen, setIsReelCommentsOpen, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'rc1',
      name: 'Mousumi Das',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      time: '2h',
      text: 'So beautiful! 😍💛',
      likes: '1.2K',
      isLiked: true,
    },
    {
      id: 'rc2',
      name: 'Poulami Saha',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      time: '2h',
      text: 'Your smile is just wow! 💜',
      likes: '856',
      isLiked: false,
    },
    {
      id: 'rc3',
      name: 'Riya Sen',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      time: '3h',
      text: 'Pure happiness in one video ☀️',
      likes: '640',
      isLiked: false,
    },
    {
      id: 'rc4',
      name: 'Sneha Paul',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
      time: '4h',
      text: 'Love your vibe! ✨❤️',
      likes: '512',
      isLiked: true,
    },
  ]);

  if (!isReelCommentsOpen) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newC = {
      id: `rc_${Date.now()}`,
      name: currentUser.name,
      avatar: currentUser.avatar,
      time: 'Just now',
      text: commentText,
      likes: '1',
      isLiked: true,
    };
    setComments([newC, ...comments]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
        {/* Top grab bar & Header matching Screenshot 5 */}
        <div className="pt-2 px-4 pb-2 border-b border-gray-100 flex flex-col items-center">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-2"></div>
          <div className="w-full flex items-center justify-between">
            <span className="font-bold text-xs text-gray-900">Comments (12.4K)</span>
            <button
              onClick={() => setIsReelCommentsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {comments.map(c => (
            <div key={c.id} className="flex items-start justify-between">
              <div className="flex items-start space-x-2.5">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-100"
                />
                <div className="flex flex-col text-left">
                  <div className="bg-purple-50/60 rounded-2xl px-3 py-2 border border-purple-100/40">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-gray-900">{c.name}</span>
                      <span className="text-[10px] text-gray-400">{c.time}</span>
                    </div>
                    <p className="text-xs text-gray-700 mt-0.5">{c.text}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 mt-1 pl-2">
                    <button className="font-semibold text-gray-600 hover:text-purple-600">Reply</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center shrink-0 ml-2">
                <button
                  onClick={() => {
                    setComments(prev =>
                      prev.map(item =>
                        item.id === c.id ? { ...item, isLiked: !item.isLiked } : item
                      )
                    );
                  }}
                  className="p-1"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      c.isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'
                    }`}
                  />
                </button>
                <span className="text-[9px] text-gray-500">{c.likes}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Input */}
        <form onSubmit={handleAddComment} className="p-3 border-t border-gray-100 flex items-center space-x-2 bg-white">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover"
          />
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-purple-50/70 border border-purple-100 rounded-full px-3.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
          <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
            <Smile className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2 rounded-full bg-purple-600 disabled:opacity-40 text-white hover:bg-purple-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
