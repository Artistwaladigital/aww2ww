import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  Info, 
  Plus, 
  Smile, 
  Camera, 
  Image, 
  Mic, 
  Send, 
  CheckCheck,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatScreen: React.FC = () => {
  const { activeChatId, closeChat, chats, sendMessage, currentUser, showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [callActive, setCallActive] = useState<'audio' | 'video' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  if (!activeChat) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText);
    setInputText('');
  };

  const handleSendPhotoAttachment = () => {
    sendMessage(
      activeChat.id,
      '',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    );
    showToast('Photo attachment sent 📷');
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#FAF9FD] flex flex-col justify-between select-none">
      {/* Top Bar matching Screenshot 3 */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-3 py-2.5 border-b border-purple-100 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={closeChat}
            className="p-1 rounded-full text-purple-700 hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <img
              src={activeChat.participant.avatar}
              alt={activeChat.participant.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-200"
            />
            {activeChat.participant.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-gray-900 leading-tight">
              {activeChat.participant.name}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">
              {activeChat.participant.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Action icons: Phone, Video, Info */}
        <div className="flex items-center space-x-3 text-purple-700">
          <button
            onClick={() => setCallActive('audio')}
            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
            title="Audio Call"
          >
            <Phone className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => setCallActive('video')}
            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
            title="Video Call"
          >
            <Video className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => showToast(`Info for ${activeChat.participant.name}`)}
            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
            title="Conversation Info"
          >
            <Info className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area matching Screenshot 3 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {/* Date Pill */}
        <div className="flex justify-center my-2">
          <span className="bg-purple-100/60 text-purple-700 text-[10px] font-semibold px-3 py-1 rounded-full">
            Today
          </span>
        </div>

        {activeChat.messages.map(msg => {
          const isMe = msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`flex items-end space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img
                  src={activeChat.participant.avatar}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover mb-1 shrink-0"
                />
              )}

              <div className="flex flex-col max-w-[75%] space-y-1">
                {/* Media Attachment if present */}
                {msg.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden border border-purple-100 shadow-xs mb-1">
                    <img
                      src={msg.mediaUrl}
                      alt="Attachment"
                      className="w-full max-h-48 object-cover"
                    />
                  </div>
                )}

                {/* Message Text Bubble */}
                {msg.text && (
                  <div
                    className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-purple-600 text-white rounded-br-2xs'
                        : 'bg-white text-gray-800 rounded-bl-2xs border border-purple-50'
                    }`}
                  >
                    <span>{msg.text}</span>
                  </div>
                )}

                {/* Timestamp & Status */}
                <div
                  className={`flex items-center space-x-1 text-[9px] text-gray-400 px-1 ${
                    isMe ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-purple-400" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar matching Screenshot 3 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-purple-100 px-3 py-2 flex items-center space-x-2 shadow-lg">
        {/* Plus Button */}
        <button
          type="button"
          onClick={handleSendPhotoAttachment}
          className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors shrink-0"
          title="Add attachment"
        >
          <Plus className="w-4.5 h-4.5" />
        </button>

        {/* Input box */}
        <form onSubmit={handleSend} className="flex-1 flex items-center bg-purple-50/70 border border-purple-100 rounded-full px-3 py-1.5 space-x-1.5">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setInputText(prev => prev + ' 😊')}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Smile className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => showToast('Camera activated 📷')}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSendPhotoAttachment}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => showToast('Recording voice note 🎙️')}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Mic className="w-4 h-4" />
          </button>
        </form>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-pink-500 text-white flex items-center justify-center disabled:opacity-40 shadow-xs hover:opacity-95 transition-all shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Simulated Live Call Modal */}
      {callActive && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-8 backdrop-blur-md animate-fadeIn">
          <div className="text-center text-white mt-12">
            <img
              src={activeChat.participant.avatar}
              alt="calling"
              className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-purple-500 shadow-2xl animate-pulse"
            />
            <h2 className="text-lg font-bold mt-4">{activeChat.participant.name}</h2>
            <span className="text-xs text-purple-300">
              {callActive === 'video' ? 'Video Calling...' : 'Calling via aww2ww...'}
            </span>
          </div>

          <div className="flex items-center space-x-6 mb-12">
            <button
              onClick={() => setCallActive(null)}
              className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl hover:bg-rose-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
