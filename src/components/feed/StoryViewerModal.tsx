import React, { useEffect, useState } from 'react';
import { X, Heart, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const StoryViewerModal: React.FC = () => {
  const { stories, activeStoryIndex, closeStory, showToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (activeStoryIndex !== null) {
      setCurrentIndex(activeStoryIndex);
      setProgress(0);
    }
  }, [activeStoryIndex]);

  useEffect(() => {
    if (activeStoryIndex === null) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            closeStory();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex, currentIndex, stories.length, closeStory]);

  if (activeStoryIndex === null) return null;

  const currentStory = stories[currentIndex];
  if (!currentStory) return null;

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleHeart = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#EC4899', '#F43F5E', '#A855F7'],
    });
    showToast(`Sent ❤️ to ${currentStory.user.name}`);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    showToast(`Replied: "${replyText}" to ${currentStory.user.name}`);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md">
      <div className="relative w-full max-w-sm h-full max-h-[880px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center space-x-1.5">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    i === currentIndex
                      ? `${progress}%`
                      : i < currentIndex
                      ? '100%'
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Story Info */}
        <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2.5">
            <img
              src={currentStory.user.avatar}
              alt={currentStory.user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-purple-500"
            />
            <div className="text-left">
              <span className="text-xs font-bold block leading-tight">{currentStory.user.name}</span>
              <span className="text-[10px] text-gray-300">{currentStory.timestamp}</span>
            </div>
          </div>
          <button
            onClick={closeStory}
            className="p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Story Media */}
        <div className="relative w-full h-full flex items-center justify-center select-none">
          <img
            src={currentStory.mediaUrl}
            alt="Story content"
            className="w-full h-full object-cover"
          />

          {/* Left / Right tap zones */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-0 bottom-0 w-1/3 opacity-0 hover:opacity-100 flex items-center justify-start pl-2 transition-opacity"
          >
            <span className="p-1.5 rounded-full bg-black/40 text-white">
              <ChevronLeft className="w-6 h-6" />
            </span>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-0 bottom-0 w-1/3 opacity-0 hover:opacity-100 flex items-center justify-end pr-2 transition-opacity"
          >
            <span className="p-1.5 rounded-full bg-black/40 text-white">
              <ChevronRight className="w-6 h-6" />
            </span>
          </button>

          {/* Caption overlay */}
          {currentStory.caption && (
            <div className="absolute bottom-20 left-4 right-4 text-center">
              <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs px-4 py-2 rounded-2xl shadow-lg">
                {currentStory.caption}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Reply Bar */}
        <div className="absolute bottom-4 left-3 right-3 z-30 flex items-center space-x-2">
          <div className="flex-1 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 flex items-center">
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendReply()}
              placeholder={`Send message to ${currentStory.user.name}...`}
              className="w-full bg-transparent text-white placeholder-white/70 text-xs focus:outline-none"
            />
          </div>

          {replyText.trim() ? (
            <button
              onClick={handleSendReply}
              className="p-2.5 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleHeart}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-pink-400 hover:text-pink-300 transition-colors backdrop-blur-md border border-white/20 active:scale-125"
            >
              <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
