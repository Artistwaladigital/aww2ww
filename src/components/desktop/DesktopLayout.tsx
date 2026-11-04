import React from 'react';
import { useApp } from '../../context/AppContext';
import { DesktopNavbar } from './DesktopNavbar';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopRightPanel } from './DesktopRightPanel';
import { DesktopMessenger } from './DesktopMessenger';
import { DesktopProfile } from './DesktopProfile';

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
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const DesktopLayout: React.FC = () => {
  const { activeTab, authScreen, posts } = useApp();

  const isAuthScreen = activeTab === 'auth';
  const isProfile = activeTab === 'profile';
  const isMessenger = activeTab === 'messenger';

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
    <div className="w-full min-h-screen bg-[#F6F4FB] text-gray-900 flex flex-col antialiased">
      {/* Top Global Desktop Navigation Bar (Facebook/Instagram Web Style) */}
      <DesktopNavbar />

      {/* Main Responsive Body */}
      {isMessenger ? (
        /* Dedicated 2-Column Messenger on Desktop */
        <div className="max-w-[1440px] w-full mx-auto px-4 py-3 flex-1">
          <DesktopMessenger />
        </div>
      ) : isProfile ? (
        /* Dedicated Full-Width Profile on Desktop */
        <div className="max-w-[1440px] w-full mx-auto px-4 py-3 flex-1">
          <DesktopProfile />
        </div>
      ) : (
        /* 3-Column Facebook Style Social Web Layout */
        <div className="max-w-[1440px] w-full mx-auto flex justify-between px-2 sm:px-4 py-3 gap-5 flex-1">
          {/* Left Navigation & Profiles Sidebar */}
          <div className="hidden md:block shrink-0">
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
          </main>

          {/* Right Contacts & Sponsored Panel */}
          <div className="hidden xl:block shrink-0">
            <DesktopRightPanel />
          </div>
        </div>
      )}
    </div>
  );
};
