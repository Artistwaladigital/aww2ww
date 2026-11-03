import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotesBar: React.FC = () => {
  const { notes, currentUser, showToast } = useApp();
  const [userNote, setUserNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleSaveNote = () => {
    if (userNote.trim()) {
      showToast(`Note updated: "${userNote}" ✨`);
      setIsEditingNote(false);
    }
  };

  return (
    <div className="w-full bg-white px-3 py-2.5 border-b border-gray-100">
      <div className="flex items-start space-x-3.5 overflow-x-auto hide-scrollbar pb-1">
        {/* Your Note */}
        <div 
          onClick={() => setIsEditingNote(true)}
          className="flex flex-col items-center shrink-0 cursor-pointer group"
        >
          <div className="relative">
            {/* Note bubble */}
            <div className="bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-medium px-2 py-0.5 rounded-xl shadow-2xs mb-1 max-w-[70px] truncate text-center">
              {userNote || 'Your note'}
            </div>

            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-13 h-13 rounded-full object-cover ring-2 ring-purple-300"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center text-xs shadow-xs border-2 border-white">
                <Plus className="w-3 h-3 stroke-[3]" />
              </div>
            </div>
          </div>
          <span className="text-[11px] text-gray-700 font-medium mt-1">Your note</span>
        </div>

        {/* Friends' Notes matching Screenshot 3 */}
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => showToast(`${note.user.name}'s note: "${note.noteText}"`)}
            className="flex flex-col items-center shrink-0 cursor-pointer group"
          >
            {/* Note Speech Bubble */}
            <div className="bg-white border border-purple-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-xl shadow-xs mb-1 max-w-[75px] truncate text-center font-normal">
              {note.noteText}
            </div>

            <div className="relative">
              <img
                src={note.user.avatar}
                alt={note.user.name}
                className="w-13 h-13 rounded-full object-cover ring-1 ring-purple-100 group-hover:ring-purple-400 transition-all"
              />
              {note.user.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-2xs"></span>
              )}
            </div>
            <span className="text-[11px] text-gray-800 font-medium mt-1 truncate max-w-[65px] text-center">
              {note.user.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Edit note dialog */}
      {isEditingNote && (
        <div className="mt-2 p-2 bg-purple-50 rounded-2xl flex items-center space-x-2 animate-fadeIn">
          <input
            type="text"
            value={userNote}
            onChange={e => setUserNote(e.target.value)}
            placeholder="Share what's on your mind today... (up to 40 chars)"
            maxLength={40}
            className="flex-1 bg-white border border-purple-200 text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-purple-500"
            autoFocus
          />
          <button
            onClick={handleSaveNote}
            className="text-xs font-semibold bg-purple-600 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
};
