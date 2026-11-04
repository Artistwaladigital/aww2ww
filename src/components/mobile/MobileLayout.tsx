import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { TopTabs } from '../common/TopTabs';

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
import { MenuView } from '../menu/MenuView';
import { MessengerInbox } from '../messenger/MessengerInbox';
import { ChatScreen } from '../messenger/ChatScreen';
import { ProfileView } from '../profile/ProfileView';
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const MobileLayout: React.FC = () => {
  const { activeTab, activeChatId, authScreen, posts } = useApp();

  const isAuthScreen = activeTab === 'auth';
  const isInActiveChat = activeTab === 'messenger' && activeChatId !== null;
  const isProfile = activeTab === 'profile';

  return (
    <div className="w-full min-h-screen bg-[#F6F4FB] text-gray-900 flex flex-col antialiased select-none">
      {/* Global Mobile Header (hidden on full chat, profile, or auth) */}
      {!isAuthScreen && !isInActiveChat && !isProfile && <Header />}

      {/* Main Tab Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="w-full min-h-screen bg-[#F6F4FB] pb-20">
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
    </div>
  );
};
