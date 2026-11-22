import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DesktopLayout } from './components/desktop/DesktopLayout';
import { MobileLayout } from './components/mobile/MobileLayout';
import { FacebookLandingPage } from './components/auth/FacebookLandingPage';

// Global Modals & Overlays
import { StoryViewerModal } from './components/feed/StoryViewerModal';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { PostCommentsModal } from './components/feed/PostCommentsModal';
import { FullscreenReelPlayer } from './components/reels/FullscreenReelPlayer';
import { ReelCommentsSheet } from './components/reels/ReelCommentsSheet';
import { AddMusicSheet } from './components/reels/AddMusicSheet';
import { CreateReelSheet } from './components/reels/CreateReelSheet';
import { NewChatModal } from './components/messenger/NewChatModal';
import { ProfileOptionsSheet } from './components/profile/ProfileOptionsSheet';
import { AboutModal } from './components/profile/AboutModal';

const MainContent: React.FC = () => {
  const { toastMessage, viewMode, isAuthenticated } = useApp();

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce border border-purple-500/40">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* If visitor is not logged in, display the Facebook-style Landing & Sign Up / Login Page */}
      {!isAuthenticated ? (
        <FacebookLandingPage />
      ) : (
        <>
          {/* Responsive Social Dashboard View: Desktop for PC/Laptop, Mobile layout for phones */}
          {viewMode === 'desktop' ? (
            <DesktopLayout />
          ) : (
            <MobileLayout />
          )}

          {/* Global Modals & Overlays (Available in both Desktop & Mobile) */}
          <StoryViewerModal />
          <FullscreenReelPlayer />
          <ReelCommentsSheet />
          <AddMusicSheet />
          <CreateReelSheet />
          <CreatePostModal />
          <PostCommentsModal />
          <NewChatModal />
          <ProfileOptionsSheet />
          <AboutModal />
        </>
      )}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
