import React from 'react';
import { Home, Users, Clapperboard, Users2, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TabType } from '../../context/AppContext';

export const TopTabs: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.home, icon: <Home className="w-5 h-5" /> },
    { id: 'friends', label: t.friends, icon: <Users className="w-5 h-5" /> },
    { id: 'reels', label: t.reels, icon: <Clapperboard className="w-5 h-5" /> },
    { id: 'groups', label: t.groups, icon: <Users2 className="w-5 h-5" /> },
    { id: 'menu', label: t.menu, icon: <Menu className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full bg-white border-b border-purple-100 flex items-center justify-around px-2 pt-1">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-2 relative transition-all group ${
              isActive ? 'text-purple-700 font-semibold' : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <span className={`transform transition-transform ${isActive ? 'scale-110 text-purple-700' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[12px]">{tab.label}</span>
            </div>

            {/* Active underline indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-purple-700 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
