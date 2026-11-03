import React from 'react';
import { useApp } from '../../context/AppContext';
import { DesktopNavbar } from './DesktopNavbar';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopRightPanel } from './DesktopRightPanel';

// Feed components
import { StoriesBar } from '../feed/StoriesBar';
import { CreatePostBox } from '../feed/CreatePostBox';
import { PostCard } from '../feed/PostCard';

// Other views
import { ReelsExplore } from '../reels/ReelsExplore';
import { FriendsView } from '../friends/FriendsView';
import { GroupsView } from '../groups/GroupsView';
import { WatchView } from '../watch/WatchView';
import { MarketplaceView } from '../marketplace/MarketplaceView';
import { ProfileView } from '../profile/ProfileView';
import { MessengerInbox } from '../messenger/MessengerInbox';
import { ChatScreen } from '../messenger/ChatScreen';
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const DesktopLayout: React.FC = () => {
  const { activeTab, activeChatId, authScreen, posts } = useApp();

  const isAuthScreen = activeTab === 'auth';
  const isInActiveChat = activeTab === 'messenger' && activeChatId !== null;
  const isProfile = activeTab === 'profile';

  if (isAuthScreen) {
    return (
      <div className="w-full min-h-screen bg-[#FBF9FE] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
          {authScreen === 'signup' ? <RegisterScreen /> : <LoginScreen />}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F6F4FB] text-gray-900 flex flex-col">
      {/* Top Global Desktop Navigation Bar */}
      <DesktopNavbar />

      {/* Main 3-Column Responsive Body */}
      <div className="max-w-[1440px] w-full mx-auto flex justify-between px-2 sm:px-4 py-3 gap-4 flex-1">
        {/* Left Sidebar */}
        <div className="hidden md:block">
          <DesktopSidebar />
        </div>

        {/* Center Main Content Feed */}
        <main className="flex-1 max-w-2xl mx-auto w-full pb-16">
          {activeTab === 'home' && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden shadow-xs border border-purple-50 bg-white">
                <StoriesBar />
              </div>
              <CreatePostBox />
              <div className="space-y-3">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reels' && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white">
              <ReelsExplore />
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white">
              <FriendsView />
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white">
              <GroupsView />
            </div>
          )}

          {activeTab === 'watch' && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white">
              <WatchView />
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white">
              <MarketplaceView />
            </div>
          )}

          {activeTab === 'messenger' && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white min-h-[600px]">
              {isInActiveChat ? <ChatScreen /> : <MessengerInbox />}
            </div>
          )}

          {isProfile && (
            <div className="rounded-3xl overflow-hidden shadow-xs border border-purple-50 bg-white">
              <ProfileView />
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <div className="hidden xl:block">
          <DesktopRightPanel />
        </div>
      </div>
    </div>
  );
};
