import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  SlidersHorizontal, 
  Phone, 
  Video, 
  Info, 
  Smile, 
  Image, 
  Mic, 
  Send,
  CheckCheck,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotesBar } from '../messenger/NotesBar';

export const DesktopMessenger: React.FC = () => {
  const { 
    chats, 
    activeChatId, 
    openChat, 
    setIsNewChatModalOpen, 
    sendMessage, 
    showToast,
    t 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'groups' | 'requests'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  const currentChat = chats.find(c => c.id === activeChatId) || chats[0];

  const filterTabs = [
    { id: 'all' as const, label: t.all },
    { id: 'unread' as const, label: t.unread, badge: 5 },
    { id: 'groups' as const, label: t.groups },
    { id: 'requests' as const, label: t.requests, badge: 3 },
  ];

  const filteredChats = chats.filter(c => {
    const matchesSearch = 
      c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'unread') return c.unreadCount > 0;
    if (activeFilter === 'groups') return c.isGroup;
    return true;
  });

  const handleSend = () => {
    if (!inputText.trim() || !currentChat) return;
    sendMessage(currentChat.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="w-full h-[calc(100vh-84px)] bg-white rounded-2xl shadow-sm border border-purple-100 flex overflow-hidden">
      {/* Left Column: Inbox List (Facebook/Messenger style) */}
      <div className="w-80 md:w-96 border-r border-purple-100 flex flex-col h-full bg-white select-none">
        {/* Inbox Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            {t.messages}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsNewChatModalOpen(true)}
              className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs hover:bg-purple-700 transition-colors"
              title="New Message"
            >
              <Plus className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={() => showToast('Chat filter preferences')}
              className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Messages */}
        <div className="px-4 py-2 border-b border-gray-50">
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

        {/* 24h Status Notes Bar */}
        <div className="border-b border-gray-100 py-2">
          <NotesBar />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 px-3 py-2 border-b border-gray-100 overflow-x-auto hide-scrollbar">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
                activeFilter === tab.id
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-gray-600 hover:bg-purple-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeFilter === tab.id ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredChats.map(chat => {
            const isSelected = currentChat?.id === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => openChat(chat.id)}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-purple-50/80 border-l-4 border-purple-600' : 'hover:bg-gray-50'
                }`}
              >
                {/* Avatar with online dot */}
                <div className="relative shrink-0">
                  <img
                    src={chat.participant.avatar}
                    alt={chat.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.participant.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {chat.participant.name}
                    </span>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${
                    chat.unreadCount > 0 ? 'font-bold text-gray-900' : 'text-gray-500'
                  }`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread badge */}
                {chat.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation (Messenger style) */}
      {currentChat ? (
        <div className="flex-1 flex flex-col h-full bg-[#FBF9FE]">
          {/* Chat Header */}
          <div className="p-3.5 bg-white border-b border-purple-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={currentChat.participant.avatar}
                  alt={currentChat.participant.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {currentChat.participant.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 leading-tight">
                  {currentChat.participant.name}
                </h2>
                <span className="text-[11px] text-gray-500">
                  {currentChat.participant.online ? 'Active now' : 'Active 2h ago'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => showToast('Calling audio... 📞')}
                className="p-2 hover:bg-purple-50 text-purple-700 rounded-full transition-colors"
                title="Start Voice Call"
              >
                <Phone className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => showToast('Starting video call... 📹')}
                className="p-2 hover:bg-purple-50 text-purple-700 rounded-full transition-colors"
                title="Start Video Call"
              >
                <Video className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => showToast('Conversation info')}
                className="p-2 hover:bg-purple-50 text-purple-700 rounded-full transition-colors"
                title="Chat Info"
              >
                <Info className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="text-center my-2">
              <span className="text-[10px] font-bold text-gray-400 bg-gray-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
                Today
              </span>
            </div>

            {currentChat.messages.map(msg => {
              const isMe = msg.senderId === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-2xs text-xs ${
                      isMe
                        ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-br-xs'
                        : 'bg-white text-gray-900 border border-purple-50 rounded-bl-xs'
                    }`}
                  >
                    {msg.mediaUrl && (
                      <img
                        src={msg.mediaUrl}
                        alt="attachment"
                        className="rounded-xl mb-2 max-h-56 w-full object-cover"
                      />
                    )}
                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  </div>
                  <div className="flex items-center space-x-1 mt-1 text-[10px] text-gray-400 px-1">
                    <span>{msg.timestamp}</span>
                    {isMe && (
                      msg.status === 'read' ? (
                        <CheckCheck className="w-3.5 h-3.5 text-purple-600" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <div className="p-3 bg-white border-t border-purple-100">
            <form 
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <button
                type="button"
                onClick={() => showToast('Choose photo or file')}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Send Photo"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => showToast('Voice note recording')}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Send Voice Note"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-purple-50/60 pl-4 pr-10 py-2.5 text-xs rounded-full border border-purple-100 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => showToast('Emoji picker')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600"
                  title="Emoji"
                >
                  <Smile className="w-4.5 h-4.5" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-700 to-pink-500 text-white flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-[#FBF9FE]">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
            <Send className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-gray-800">Your Messages</h2>
          <p className="text-xs text-gray-500 max-w-xs mt-1">
            Send private photos, voice messages, and texts to friends on aww2ww.
          </p>
        </div>
      )}
    </div>
  );
};
