import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewChatModal: React.FC = () => {
  const { isNewChatModalOpen, setIsNewChatModalOpen, openChat, showToast } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>(['user_ananya', 'user_riya', 'grp_travel']);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isNewChatModalOpen) return null;

  const suggestedUsers = [
    {
      id: 'user_ananya',
      name: 'Ananya Saha',
      status: 'Online',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'user_mousumi',
      name: 'Mousumi Das',
      status: 'Online',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'user_riya',
      name: 'Riya Sen',
      status: 'Online',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'user_poulami',
      name: 'Poulami Saha',
      status: 'Online',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'user_sneha',
      name: 'Sneha Paul',
      status: 'Online',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'user_arijit',
      name: 'Arijit Roy',
      status: 'Offline',
      isOnline: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const suggestedGroups = [
    {
      id: 'grp_creators',
      name: 'Bengali Creators Hub',
      members: '125K members',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'grp_travel',
      name: 'Travel Lovers',
      members: '98K members',
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'grp_fitness',
      name: 'Fitness Family',
      members: '76K members',
      avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'grp_nature',
      name: 'Nature Photography',
      members: '54K members',
      avatar: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleStartChat = () => {
    setIsNewChatModalOpen(false);
    if (selectedIds.includes('user_ananya')) {
      openChat('chat_ananya');
    } else {
      openChat('chat_creators_group');
    }
    showToast(`Starting conversation with ${selectedIds.length} members 💬`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[85vh]">
        {/* Top Header matching Screenshot 3 */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={() => setIsNewChatModalOpen(false)}
            className="p-1 rounded-full text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-sm text-gray-900">New Message</span>
          <button
            onClick={() => showToast('Create group mode')}
            className="text-xs font-bold text-purple-700 hover:text-purple-800"
          >
            Create Group
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search people or groups"
              className="w-full bg-purple-50/60 pl-9 pr-4 py-2 text-xs rounded-full border border-purple-100 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* List of Contacts & Groups */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Suggested Contacts */}
          <div>
            <span className="text-xs font-bold text-gray-500 block mb-2">Suggested</span>
            <div className="space-y-2.5">
              {suggestedUsers.map(u => {
                const isSelected = selectedIds.includes(u.id);
                return (
                  <div
                    key={u.id}
                    onClick={() => toggleSelect(u.id)}
                    className="flex items-center justify-between cursor-pointer py-1 hover:bg-purple-50/50 rounded-xl px-1 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {u.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
                        )}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-gray-900">{u.name}</span>
                        <span className="text-[10px] text-gray-400">{u.status}</span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Groups section */}
          <div>
            <span className="text-xs font-bold text-gray-500 block mb-2">Groups</span>
            <div className="space-y-2.5">
              {suggestedGroups.map(g => {
                const isSelected = selectedIds.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleSelect(g.id)}
                    className="flex items-center justify-between cursor-pointer py-1 hover:bg-purple-50/50 rounded-xl px-1 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={g.avatar}
                        alt={g.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-gray-900">{g.name}</span>
                        <span className="text-[10px] text-gray-400">{g.members}</span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar matching Screenshot 3 */}
        <div className="p-3 border-t border-gray-100 flex items-center space-x-3 bg-white">
          <button
            onClick={() => setIsNewChatModalOpen(false)}
            className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStartChat}
            disabled={selectedIds.length === 0}
            className="flex-1 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 disabled:opacity-40 transition-colors shadow-md"
          >
            Start Chat ({selectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
};
