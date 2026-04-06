import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

export default function CompetitorPanel() {
  const { activeProfile } = useProfile();
  const [username, setUsername] = useState('');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Competitor Analysis</h2>

      <div className="flex gap-3 mb-6">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter competitor's Instagram username"
          className="flex-1 bg-[#0f0f23] text-white p-3 rounded-xl border border-[#1e293b] outline-none focus:border-orange-500 text-sm"
        />
        <button
          disabled={!activeProfile.connected}
          className="px-6 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 cursor-pointer disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Analyze
        </button>
      </div>

      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">What You Can See</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Profile Info', desc: 'Username, bio, profile pic, website', icon: '👤' },
            { label: 'Follower Count', desc: 'Real-time follower/following numbers', icon: '👥' },
            { label: 'Media Count', desc: 'Total number of posts', icon: '📷' },
            { label: 'Recent Posts', desc: 'Last 12 posts with engagement data', icon: '📊' },
            { label: 'Like Counts', desc: 'Likes on each recent post', icon: '❤️' },
            { label: 'Comment Counts', desc: 'Comments on each recent post', icon: '💬' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3 p-3 bg-[#0f0f23] rounded-lg">
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="text-sm font-medium text-white">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoint</h4>
        <div className="text-xs font-mono">
          <span className="text-green-400">GET</span>{' '}
          <span className="text-gray-400">/{'{user-id}'}?fields=business_discovery.fields(id,name,username,biography,profile_picture_url,followers_count,follows_count,media_count,media.limit(12){'{'}id,caption,like_count,comments_count,permalink{'}'}).username({username || 'competitor'})</span>
        </div>
        <p className="text-xs text-gray-600 mt-2">Works for any public Instagram Business/Creator account</p>
      </div>
    </div>
  );
}
