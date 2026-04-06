import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

export default function HashtagsPanel() {
  const { activeProfile } = useProfile();
  const [query, setQuery] = useState('');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Hashtag Research</h2>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search hashtag (e.g., AIAgents)"
          className="flex-1 bg-[#0f0f23] text-white p-3 rounded-xl border border-[#1e293b] outline-none focus:border-orange-500 text-sm"
        />
        <button
          disabled={!activeProfile.connected}
          className="px-6 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 cursor-pointer disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top Media */}
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Top Media</h3>
          <p className="text-sm text-gray-500">Search a hashtag to see top-performing posts</p>
          <div className="mt-4 h-48 border border-dashed border-[#2e2e5a] rounded-lg flex items-center justify-center text-gray-600">
            Top posts will appear here
          </div>
        </div>

        {/* Recent Media */}
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Recent Media</h3>
          <p className="text-sm text-gray-500">Latest posts using this hashtag</p>
          <div className="mt-4 h-48 border border-dashed border-[#2e2e5a] rounded-lg flex items-center justify-center text-gray-600">
            Recent posts will appear here
          </div>
        </div>
      </div>

      {/* Limits Info */}
      <div className="mt-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-yellow-400 mb-2">Rate Limits</h4>
        <p className="text-xs text-gray-400">30 unique hashtags per 7-day rolling window per Instagram user</p>
      </div>

      <div className="mt-4 bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoints</h4>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/ig_hashtag_search?q={query || 'hashtag'}</span> <span className="text-gray-600">— Find hashtag ID</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{hashtag-id}'}/top_media</span> <span className="text-gray-600">— Top posts</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{hashtag-id}'}/recent_media</span> <span className="text-gray-600">— Recent posts</span></div>
        </div>
      </div>
    </div>
  );
}
