import React from 'react';
import { Play, Flame, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DesktopRightPanel: React.FC = () => {
  const { openChat, openFullscreenReel, showToast } = useApp();

  const onlineContacts = [
    {
      id: 'chat_ananya',
      name: 'Ananya Saha',
      status: 'Active now',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'chat_mousumi',
      name: 'Mousumi Das',
      status: 'Active 5m ago',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'chat_riya',
      name: 'Riya Sen',
      status: 'Active now',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'chat_poulami',
      name: 'Poulami Saha',
      status: 'Active 12m ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'chat_arif',
      name: 'Arif Hossain',
      status: 'Active now',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'chat_nusrat',
      name: 'Nusrat Jahan',
      status: 'Active 2h ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'chat_subhashree',
      name: 'Subhashree Sen',
      status: 'Active now',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const trendingReels = [
    {
      id: 'reel_1',
      title: 'Sunsets & smiles • Ananya Saha',
      views: '1.2M',
      thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'reel_2',
      title: 'Ocean breeze coast • Mousumi',
      views: '856K',
      thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <aside className="w-80 p-3 space-y-4 select-none shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar text-left">
      {/* Event Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 rounded-2xl p-3.5 text-white shadow-xs relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-1.5 mb-1 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Upcoming Event</span>
          </div>
          <h2 className="text-xs font-black">Kolkata Creators Meetup 2026</h2>
          <p className="text-[10px] text-white/90 mt-0.5">Connect with 500+ reel artists & photographers</p>
          <button 
            onClick={() => showToast('Registered for Creators Meetup! 🎟️')}
            className="mt-2 text-[10px] font-bold bg-white text-purple-800 px-3 py-1 rounded-full shadow-2xs hover:bg-purple-50 transition-colors"
          >
            RSVP Free
          </button>
        </div>
      </div>

      {/* Trending Reels Mini Card */}
      <div className="bg-white rounded-2xl p-3 border border-purple-50 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider">
              Trending Reels
            </span>
          </div>
          <button 
            onClick={() => openFullscreenReel(0)}
            className="text-[10px] font-bold text-purple-600 hover:text-purple-700"
          >
            Watch All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {trendingReels.map((r, idx) => (
            <div
              key={idx}
              onClick={() => openFullscreenReel(idx)}
              className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group shadow-2xs"
            >
              <img src={r.thumb} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                <div className="flex items-center space-x-1 text-[10px] font-bold">
                  <Play className="w-2.5 h-2.5 fill-white" />
                  <span>{r.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Contacts list */}
      <div className="bg-white rounded-2xl p-3 border border-purple-50 shadow-2xs">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100">
          <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider">
            Contacts & Friends ({onlineContacts.length})
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>

        <div className="space-y-1">
          {onlineContacts.map(contact => (
            <div
              key={contact.id}
              onClick={() => openChat(contact.id)}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-purple-50/70 cursor-pointer transition-colors group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-100"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{contact.status}</span>
                </div>
              </div>

              <span className="text-[10px] text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                Chat
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
