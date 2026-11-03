import React, { useState } from 'react';
import { Users, Plus, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';

export const GroupsView: React.FC = () => {
  const { openChat, showToast } = useApp();
  const [joinedGroups, setJoinedGroups] = useState<Record<string, boolean>>({
    grp_creators: true,
    grp_travel: true,
  });

  const groups = [
    {
      id: 'grp_creators',
      name: 'Bengali Creators Hub',
      category: 'Arts & Entertainment',
      members: '125K members',
      activity: '15+ posts today',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      description: 'The official creative community for digital storytellers, reel makers and artists across Bengal!',
    },
    {
      id: 'grp_travel',
      name: 'Travel Lovers',
      category: 'Travel & Exploration',
      members: '98K members',
      activity: '8 posts today',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
      description: 'Sharing travel itineraries, offbeat trails, backpacking secrets, and scenic photography.',
    },
    {
      id: 'grp_fitness',
      name: 'Fitness Family',
      category: 'Health & Wellness',
      members: '76K members',
      activity: '22 posts today',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      description: 'Daily motivation, workout plans, clean eating recipes, and lifestyle transformations.',
    },
    {
      id: 'grp_nature',
      name: 'Nature Photography',
      category: 'Visual Arts',
      members: '54K members',
      activity: '12 posts today',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
      description: 'Landscape, wildlife, macro and golden hour photographs from across the world.',
    },
  ];

  const toggleJoin = (groupId: string, name: string) => {
    setJoinedGroups(prev => {
      const next = !prev[groupId];
      showToast(next ? `Joined ${name}! 🎉` : `Left ${name}`);
      return { ...prev, [groupId]: next };
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20 select-none">
      <TopTabs />

      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-purple-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-700" />
          <h1 className="text-base font-extrabold text-gray-900">Your Groups & Hubs</h1>
        </div>
        <button
          onClick={() => showToast('Create group wizard')}
          className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full flex items-center space-x-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create</span>
        </button>
      </div>

      {/* Group Cards List */}
      <div className="p-3 space-y-3">
        {groups.map(group => {
          const isJoined = joinedGroups[group.id];

          return (
            <div
              key={group.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs border border-purple-50 text-left transition-all hover:shadow-sm"
            >
              <div className="relative h-28 w-full bg-purple-900">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-white">
                  <span className="text-[10px] bg-purple-600/80 backdrop-blur-xs px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider">
                    {group.category}
                  </span>
                  <h2 className="text-sm font-extrabold mt-0.5">{group.name}</h2>
                </div>
              </div>

              <div className="p-3.5">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                  {group.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 font-medium text-[11px]">
                    {group.members} • {group.activity}
                  </span>

                  <div className="flex items-center space-x-2">
                    {isJoined && (
                      <button
                        onClick={() => openChat(group.id === 'grp_creators' ? 'chat_creators_group' : 'chat_travel_group')}
                        className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                        title="Group Chat"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => toggleJoin(group.id, group.name)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                        isJoined
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          : 'bg-purple-700 text-white hover:bg-purple-800 shadow-xs'
                      }`}
                    >
                      {isJoined ? 'Joined ✓' : 'Join Group'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
