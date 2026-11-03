import React, { useState } from 'react';
import { Search, Plus, SlidersHorizontal, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotesBar } from './NotesBar';

export const MessengerInbox: React.FC = () => {
  const { chats, openChat, setIsNewChatModalOpen, t } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'groups' | 'requests'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all' as const, label: t.all },
    { id: 'unread' as const, label: t.unread, badge: 5 },
    { id: 'groups' as const, label: t.groups },
    { id: 'requests' as const, label: t.requests, badge: 3 },
  ];

  const filteredChats = chats.filter(c => {
    const matchesSearch = c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'unread') return c.unreadCount > 0;
    if (activeFilter === 'groups') return c.isGroup;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-white pb-20 select-none">
      {/* Messages Header Row */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">
          {t.messages}
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4.5 h-4.5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-purple-50 text-gray-700 flex items-center justify-center hover:bg-purple-100 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-purple-700" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.searchMessages}
            className="w-full bg-purple-50/60 pl-9 pr-4 py-2 text-xs rounded-full border border-purple-100 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Instagram Notes Bar */}
      <NotesBar />

      {/* Filter Chips matching Screenshot 3 */}
      <div className="flex items-center space-x-2 px-4 py-2.5 border-b border-gray-100">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeFilter === tab.id
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeFilter === tab.id ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Conversation Threads List */}
      <div className="divide-y divide-gray-50">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            onClick={() => openChat(chat.id)}
            className="flex items-center justify-between px-4 py-3 hover:bg-purple-50/40 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="relative shrink-0">
                <img
                  src={chat.participant.avatar}
                  alt={chat.participant.name}
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-purple-100"
                />
                {chat.participant.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                )}
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900 flex items-center space-x-1">
                  <span>{chat.participant.name}</span>
                  {chat.participant.online && !chat.isGroup && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  )}
                </span>
                <span
                  className={`text-xs mt-0.5 line-clamp-1 ${
                    chat.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'
                  }`}
                >
                  {chat.lastMessage}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 space-y-1">
              <span className="text-[11px] text-gray-400 font-medium">{chat.timestamp}</span>
              {chat.unreadCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {chat.unreadCount}
                </span>
              ) : (
                chat.id === 'chat_mousumi' && (
                  <Image className="w-3.5 h-3.5 text-gray-400" />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
