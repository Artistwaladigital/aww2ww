import React, { useState } from 'react';
import { Users, UserCheck, UserPlus, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';

export const FriendsView: React.FC = () => {
  const { showToast } = useApp();
  const [friendRequests, setFriendRequests] = useState([
    {
      id: 'fr1',
      name: 'Poulami Saha',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      mutual: '18 mutual friends',
      time: '2d',
    },
    {
      id: 'fr2',
      name: 'Arijit Roy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      mutual: '6 mutual friends',
      time: '3d',
    },
  ]);

  const [suggestions, setSuggestions] = useState([
    {
      id: 'sug1',
      name: 'Riya Sen',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      mutual: '24 mutual friends • Kolkata',
      added: false,
    },
    {
      id: 'sug2',
      name: 'Sneha Paul',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
      mutual: '12 mutual friends • Kolkata',
      added: false,
    },
    {
      id: 'sug3',
      name: 'Mousumi Das',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      mutual: '31 mutual friends',
      added: true,
    },
  ]);

  const confirmRequest = (id: string, name: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== id));
    showToast(`You and ${name} are now friends on aww2ww! 🤝`);
  };

  const deleteRequest = (id: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== id));
    showToast('Request removed');
  };

  const toggleAdd = (id: string, name: string) => {
    setSuggestions(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        const next = !s.added;
        showToast(next ? `Friend request sent to ${name} 📨` : 'Request cancelled');
        return { ...s, added: next };
      })
    );
  };

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

      {/* Friend Requests Section */}
      {friendRequests.length > 0 && (
        <div className="p-3 bg-white mb-2 shadow-2xs border-b border-purple-50 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-xs text-gray-900">
              Friend Requests ({friendRequests.length})
            </span>
            <button className="text-[11px] font-semibold text-purple-700">See All</button>
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
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">{req.name}</span>
                    <span className="text-[11px] text-gray-400">{req.mutual}</span>
                    <span className="text-[10px] text-purple-500 font-medium">{req.time} ago</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => confirmRequest(req.id, req.name)}
                    className="px-3 py-1.5 bg-purple-700 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition-colors shadow-2xs flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                  <button
                    onClick={() => deleteRequest(req.id)}
                    className="px-2.5 py-1.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* People You May Know */}
      <div className="p-3 bg-white shadow-2xs text-left">
        <span className="font-extrabold text-xs text-gray-900 block mb-3">
          People You May Know in Kolkata
        </span>

        <div className="space-y-3">
          {suggestions.map(s => (
            <div key={s.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-purple-100"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900">{s.name}</span>
                  <span className="text-[11px] text-gray-400">{s.mutual}</span>
                </div>
              </div>

              <button
                onClick={() => toggleAdd(s.id, s.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                  s.added
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-purple-700 text-white hover:bg-purple-800 shadow-2xs'
                }`}
              >
                {s.added ? (
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
          ))}
        </div>
      </div>
    </div>
  );
};
