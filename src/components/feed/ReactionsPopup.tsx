import React from 'react';

interface ReactionsPopupProps {
  onSelect: (type: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry') => void;
  onClose: () => void;
}

export const ReactionsPopup: React.FC<ReactionsPopupProps> = ({ onSelect }) => {
  const reactions: { type: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry'; emoji: string; label: string }[] = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'care', emoji: '🥰', label: 'Care' },
    { type: 'haha', emoji: '😆', label: 'Haha' },
    { type: 'wow', emoji: '😮', label: 'Wow' },
    { type: 'sad', emoji: '😢', label: 'Sad' },
    { type: 'angry', emoji: '😡', label: 'Angry' },
  ];

  return (
    <div className="absolute -top-12 left-2 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-purple-100 px-2 py-1.5 flex items-center space-x-1.5 z-40 animate-scaleUp">
      {reactions.map(r => (
        <button
          key={r.type}
          onClick={e => {
            e.stopPropagation();
            onSelect(r.type);
          }}
          className="transform hover:scale-135 active:scale-95 transition-transform p-1 text-xl flex flex-col items-center group relative"
          title={r.label}
        >
          <span>{r.emoji}</span>
          <span className="absolute -bottom-5 bg-gray-900 text-white text-[9px] px-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {r.label}
          </span>
        </button>
      ))}
    </div>
  );
};
