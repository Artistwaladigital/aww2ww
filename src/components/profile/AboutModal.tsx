import React from 'react';
import { X, UserCheck, Sparkles, MapPin, Calendar, Mail, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen, profileUser } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-5 border border-purple-100 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <span className="font-extrabold text-sm text-gray-900">About</span>
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3.5">
          <div className="flex items-center space-x-3 text-xs text-gray-800">
            <UserCheck className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <span className="font-bold block">Digital Creator</span>
              <span className="text-[11px] text-gray-500">Verified Public Figure</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-800">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <span className="font-bold block">Fashion | Lifestyle | Travel</span>
              <span className="text-[11px] text-gray-500">Primary Categories</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-800">
            <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <span className="font-bold block">{profileUser.location || 'Kolkata, West Bengal, India'}</span>
              <span className="text-[11px] text-gray-500">Account Location</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-800">
            <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <span className="font-bold block">{profileUser.joinedDate || 'Joined AWW2WWW in March 2023'}</span>
              <span className="text-[11px] text-gray-500">Member Since</span>
            </div>
          </div>

          {profileUser.email && (
            <div className="flex items-center space-x-3 text-xs text-gray-800">
              <Mail className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="font-bold block">{profileUser.email}</span>
                <span className="text-[11px] text-gray-500">Business Inquiries</span>
              </div>
            </div>
          )}

          {profileUser.instagram && (
            <div className="flex items-center space-x-3 text-xs text-gray-800">
              <Globe className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="font-bold block text-purple-600">{profileUser.instagram}</span>
                <span className="text-[11px] text-gray-500">External Links</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsAboutModalOpen(false)}
          className="w-full py-2 bg-purple-50 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-100 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
