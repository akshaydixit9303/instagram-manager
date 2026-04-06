import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import DashboardPanel from './panels/DashboardPanel';
import PostsPanel from './panels/PostsPanel';
import PublishPanel from './panels/PublishPanel';
import CommentsPanel from './panels/CommentsPanel';
import InsightsPanel from './panels/InsightsPanel';
import HashtagsPanel from './panels/HashtagsPanel';
import MentionsPanel from './panels/MentionsPanel';
import MessagesPanel from './panels/MessagesPanel';
import StoriesPanel from './panels/StoriesPanel';
import CompetitorPanel from './panels/CompetitorPanel';
import SettingsPanel from './panels/SettingsPanel';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'posts', label: 'Posts', icon: '◫' },
  { id: 'publish', label: 'Publish', icon: '⊕' },
  { id: 'comments', label: 'Comments', icon: '◇' },
  { id: 'insights', label: 'Insights', icon: '△' },
  { id: 'hashtags', label: 'Hashtags', icon: '#' },
  { id: 'mentions', label: 'Mentions', icon: '@' },
  { id: 'messages', label: 'Messages', icon: '✉' },
  { id: 'stories', label: 'Stories', icon: '○' },
  { id: 'competitor', label: 'Competitors', icon: '⊘' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

const PANELS = {
  dashboard: DashboardPanel,
  posts: PostsPanel,
  publish: PublishPanel,
  comments: CommentsPanel,
  insights: InsightsPanel,
  hashtags: HashtagsPanel,
  mentions: MentionsPanel,
  messages: MessagesPanel,
  stories: StoriesPanel,
  competitor: CompetitorPanel,
  settings: SettingsPanel,
};

export default function ProfileView() {
  const { activeProfile, activeSection, setActiveSection } = useProfile();
  const Panel = PANELS[activeSection] || DashboardPanel;

  return (
    <div className="h-full flex">
      {/* Feature Nav Strip */}
      <div className="w-[180px] min-w-[180px] h-full bg-[#0a0a18] border-r border-white/[0.03] flex flex-col">
        {/* Profile mini header */}
        <div className="px-4 py-3 border-b border-white/[0.03]">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold text-white"
              style={{ background: activeProfile.color }}
            >
              {activeProfile.avatar}
            </div>
            <div className="text-[12px] font-medium text-white truncate">{activeProfile.name}</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {NAV.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-[7px] rounded-lg mb-px text-[12px] cursor-pointer text-left transition-all ${
                  isActive
                    ? 'bg-white/[0.06] text-white font-medium'
                    : 'text-gray-500 hover:bg-white/[0.02] hover:text-gray-400'
                }`}
              >
                <span className={`w-4 text-center text-[11px] ${isActive ? 'text-orange-400' : 'text-gray-600'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Panel Content */}
      <div className="flex-1 h-full overflow-y-auto bg-[#090914]">
        <div className="fade-in">
          <Panel />
        </div>
      </div>
    </div>
  );
}
