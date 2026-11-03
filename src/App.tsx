import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { TopTabs } from './components/common/TopTabs';
import { DesktopLayout } from './components/desktop/DesktopLayout';

// Feed components
import { StoriesBar } from './components/feed/StoriesBar';
import { CreatePostBox } from './components/feed/CreatePostBox';
import { PostCard } from './components/feed/PostCard';
import { StoryViewerModal } from './components/feed/StoryViewerModal';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { PostCommentsModal } from './components/feed/PostCommentsModal';

// Reels components
import { ReelsExplore } from './components/reels/ReelsExplore';
import { FullscreenReelPlayer } from './components/reels/FullscreenReelPlayer';
import { ReelCommentsSheet } from './components/reels/ReelCommentsSheet';
import { AddMusicSheet } from './components/reels/AddMusicSheet';
import { CreateReelSheet } from './components/reels/CreateReelSheet';

// Messenger components
import { MessengerInbox } from './components/messenger/MessengerInbox';
import { ChatScreen } from './components/messenger/ChatScreen';
import { NewChatModal } from './components/messenger/NewChatModal';

// Profile components
import { ProfileView } from './components/profile/ProfileView';
import { ProfileOptionsSheet } from './components/profile/ProfileOptionsSheet';
import { AboutModal } from './components/profile/AboutModal';

// Auth components
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';

// Groups, Watch, Friends, Marketplace, Menu
import { GroupsView } from './components/groups/GroupsView';
import { WatchView } from './components/watch/WatchView';
import { FriendsView } from './components/friends/FriendsView';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { MenuView } from './components/menu/MenuView';

const MainContent: React.FC = () => {
  const { activeTab, activeChatId, authScreen, posts, toastMessage, viewMode } = useApp();

  const isAuthScreen = activeTab === 'auth';
  const isInActiveChat = activeTab === 'messenger' && activeChatId !== null;
  const isProfile = activeTab === 'profile';

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce border border-purple-500/40">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {viewMode === 'desktop' ? (
        <DesktopLayout />
      ) : (
        <DeviceFrame>
          {/* Global Header (shown on main tabs, hidden on full chat or auth) */}
          {!isAuthScreen && !isInActiveChat && !isProfile && <Header />}

          {/* Active Tab Routing */}
          <main className="flex-1 overflow-y-auto">
            {activeTab === 'home' && (
              <div className="w-full min-h-screen bg-[#F6F4FB] pb-20 select-none">
                <TopTabs />
                <StoriesBar />
                <CreatePostBox />
                <div className="space-y-1">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reels' && <ReelsExplore />}

            {activeTab === 'friends' && <FriendsView />}

            {activeTab === 'groups' && <GroupsView />}

            {activeTab === 'watch' && <WatchView />}

            {activeTab === 'marketplace' && <MarketplaceView />}

            {activeTab === 'menu' && <MenuView />}

            {activeTab === 'messenger' && (
              isInActiveChat ? <ChatScreen /> : <MessengerInbox />
            )}

            {activeTab === 'profile' && <ProfileView />}

            {activeTab === 'auth' && (
              authScreen === 'signup' ? <RegisterScreen /> : <LoginScreen />
            )}
          </main>

          {/* Bottom Navigation Bar */}
          {!isAuthScreen && !isInActiveChat && <BottomNav />}
        </DeviceFrame>
      )}

      {/* Global Modals & Overlays */}
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
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
