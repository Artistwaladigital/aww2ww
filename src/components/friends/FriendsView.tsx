import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserPlus, Check, X, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';
import { apiClient } from '../../api/client';
import { ANANYA_SAHA, MOCK_USERS } from '../../data/mockData';

export const FriendsView: React.FC = () => {
  const { 
    currentUser,
    friends, 
    friendRequests, 
    sentFriendRequests, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    sendFriendRequest, 
    cancelFriendRequest,
    startChatWithUser,
    setProfileUser,
    setActiveTab
  } = useApp();

  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    async function loadSuggestions() {
      const dbSuggestions = await apiClient.getUserSuggestions(currentUser.id);
      if (Array.isArray(dbSuggestions) && dbSuggestions.length > 0) {
        setSuggestions(dbSuggestions);
      } else {
        // Fallback default creators
        const fallback = [
          ANANYA_SAHA,
          MOCK_USERS.mousumi,
          MOCK_USERS.riya,
          {
            id: 'user_poulami',
            name: 'Poulami Saha',
            username: 'poulamisaha',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
            location: 'Kolkata, India',
            category: 'Fashion Influencer',
          },
          {
            id: 'user_arif',
            name: 'Arif Hossain',
            username: 'arifhossain',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
            location: 'Dhaka / Kolkata',
            category: 'Tech Vlogger',
          },
        ].filter(u => u.id !== currentUser.id && !friends.some(f => f.id === u.id));
        setSuggestions(fallback);
      }
    }
    loadSuggestions();
  }, [currentUser.id, friends]);

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20 select-none">
      <TopTabs />

      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-purple-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-700" />
          <h1 className="text-base font-extrabold text-gray-900">Friends & Connections</h1>
        </div>
        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
          {friendRequests.length} Requests
        </span>
      </div>

      {/* Friend Requests Section (Only shown if someone actually sent a request!) */}
      {friendRequests.length > 0 ? (
        <div className="p-3 bg-white mb-2 shadow-2xs border-b border-purple-50 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-xs text-gray-900">
              Friend Requests ({friendRequests.length})
            </span>
          </div>

          <div className="space-y-3">
            {friendRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={req.avatar}
                    alt={req.name}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-purple-100"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900">{req.name}</span>
                    <span className="text-[11px] text-gray-400">{req.location || 'Kolkata, India'}</span>
                    <span className="text-[10px] text-purple-500 font-medium">{req.time || 'Recently'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => acceptFriendRequest(req.id)}
                    className="px-3 py-1.5 bg-purple-700 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition-colors shadow-2xs flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(req.id)}
                    className="px-2.5 py-1.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Your Friends List */}
      {friends.length > 0 && (
        <div className="p-3 bg-white mb-2 shadow-2xs border-b border-purple-50 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-xs text-gray-900">
              Your Friends ({friends.length})
            </span>
          </div>
          <div className="space-y-2">
            {friends.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-purple-50/50 transition-colors">
                <div 
                  onClick={() => {
                    setProfileUser(friend);
                    setActiveTab('profile');
                  }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-100"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900">{friend.name}</span>
                    <span className="text-[10px] text-gray-400">{friend.location || 'Active friend'}</span>
                  </div>
                </div>

                <button
                  onClick={() => startChatWithUser(friend)}
                  className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Message</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* People You May Know (Suggestions to Add) */}
      <div className="p-3 bg-white shadow-2xs text-left">
        <span className="font-extrabold text-xs text-gray-900 block mb-3">
          People You May Know
        </span>

        {suggestions.length === 0 ? (
          <p className="text-xs text-gray-400 py-3 text-center">No more suggestions right now.</p>
        ) : (
          <div className="space-y-3">
            {suggestions.map(s => {
              const isRequested = sentFriendRequests.includes(s.id);

              return (
                <div key={s.id} className="flex items-center justify-between">
                  <div 
                    onClick={() => {
                      setProfileUser(s);
                      setActiveTab('profile');
                    }}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-purple-100"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-gray-900 hover:underline">{s.name}</span>
                      <span className="text-[11px] text-gray-400">{s.category || s.location || 'Creator'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => isRequested ? cancelFriendRequest(s.id) : sendFriendRequest(s.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      isRequested
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-purple-700 text-white hover:bg-purple-800 shadow-2xs'
                    }`}
                  >
                    {isRequested ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Requested</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add Friend</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
