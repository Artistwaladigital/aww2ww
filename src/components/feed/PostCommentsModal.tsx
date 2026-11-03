import React, { useState } from 'react';
import { X, Heart, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PostCommentsModal: React.FC = () => {
  const { activePostComments, closePostComments, addCommentToPost, currentUser } = useApp();
  const [commentInput, setCommentInput] = useState('');

  if (!activePostComments) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addCommentToPost(activePostComments.id, commentInput);
    setCommentInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[75vh] flex flex-col">
        {/* Sheet Grab Handle & Header */}
        <div className="pt-2 px-4 pb-2 border-b border-gray-100 flex flex-col items-center">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-2"></div>
          <div className="w-full flex items-center justify-between">
            <span className="font-bold text-xs text-gray-800">
              Comments ({activePostComments.commentsCount})
            </span>
            <button
              onClick={closePostComments}
              className="p-1 text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-gray-50">
          {activePostComments.comments.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No comments yet. Be the first to share your vibes! 💜
            </div>
          ) : (
            activePostComments.comments.map(c => (
              <div key={c.id} className="pt-2.5 flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <img
                    src={c.userAvatar}
                    alt={c.userName}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-100"
                  />
                  <div className="flex flex-col text-left">
                    <div className="bg-purple-50/50 rounded-2xl px-3 py-2 border border-purple-100/50">
                      <span className="text-xs font-bold text-gray-900 block">{c.userName}</span>
                      <p className="text-xs text-gray-700 mt-0.5">{c.text}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] text-gray-400 mt-1 pl-2">
                      <span>{c.timestamp}</span>
                      <button className="font-semibold text-gray-600 hover:text-purple-600">Reply</button>
                      <span>{c.likes} likes</span>
                    </div>
                  </div>
                </div>

                <button className="p-1 text-gray-400 hover:text-pink-500">
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Comment Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 flex items-center space-x-2 bg-white">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="Add a comment on aww2ww..."
            className="flex-1 bg-purple-50/70 border border-purple-100 rounded-full px-3.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            disabled={!commentInput.trim()}
            className="p-2 rounded-full bg-purple-600 disabled:opacity-40 text-white hover:bg-purple-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
