import React from 'react';
import { Share2, Link2, MessageCircle, Star, Ban, Flag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileOptionsSheet: React.FC = () => {
  const { isProfileOptionsOpen, setIsProfileOptionsOpen, openChat, showToast } = useApp();

  if (!isProfileOptionsOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Profile link copied to clipboard! 🔗');
    setIsProfileOptionsOpen(false);
  };

  const handleMessage = () => {
    setIsProfileOptionsOpen(false);
    openChat('chat_ananya');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden p-4 flex flex-col items-center">
        {/* Top Grab Handle */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mb-3"></div>

        {/* Action List matching Screenshot 4 */}
        <div className="w-full divide-y divide-gray-100">
          <button
            onClick={() => {
              showToast('Sharing profile...');
              setIsProfileOptionsOpen(false);
            }}
            className="w-full py-3 px-3 flex items-center space-x-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Share2 className="w-4.5 h-4.5 text-gray-700" />
            <span className="text-xs font-semibold text-gray-800">Share Profile</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-3 flex items-center space-x-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Link2 className="w-4.5 h-4.5 text-gray-700" />
            <span className="text-xs font-semibold text-gray-800">Copy Profile Link</span>
          </button>

          <button
            onClick={handleMessage}
            className="w-full py-3 px-3 flex items-center space-x-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4.5 h-4.5 text-gray-700" />
            <span className="text-xs font-semibold text-gray-800">Message</span>
          </button>

          <button
            onClick={() => {
              showToast('Added to Close Friends ⭐️');
              setIsProfileOptionsOpen(false);
            }}
            className="w-full py-3 px-3 flex items-center space-x-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Star className="w-4.5 h-4.5 text-purple-600" />
            <span className="text-xs font-semibold text-gray-800">Add to Close Friends</span>
          </button>

          <button
            onClick={() => {
              showToast('User blocked');
              setIsProfileOptionsOpen(false);
            }}
            className="w-full py-3 px-3 flex items-center space-x-3 text-left hover:bg-rose-50 rounded-xl transition-colors text-rose-600"
          >
            <Ban className="w-4.5 h-4.5 text-rose-600" />
            <span className="text-xs font-semibold text-rose-600">Block User</span>
          </button>

          <button
            onClick={() => {
              showToast('Profile reported');
              setIsProfileOptionsOpen(false);
            }}
            className="w-full py-3 px-3 flex items-center space-x-3 text-left hover:bg-rose-50 rounded-xl transition-colors text-rose-600"
          >
            <Flag className="w-4.5 h-4.5 text-rose-600" />
            <span className="text-xs font-semibold text-rose-600">Report Profile</span>
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => setIsProfileOptionsOpen(false)}
          className="w-full mt-3 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
