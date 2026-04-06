import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

export default function PostsPanel() {
  const { activeProfile } = useProfile();
  const [viewMode, setViewMode] = useState('grid');

  const demoPost = {
    id: 'demo',
    caption: 'Connect your Instagram account to see your posts here',
    media_type: 'IMAGE',
    timestamp: new Date().toISOString(),
    like_count: 0,
    comments_count: 0,
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Posts & Media</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded text-sm cursor-pointer ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-[#1e293b] text-gray-400'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded text-sm cursor-pointer ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-[#1e293b] text-gray-400'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['All', 'Images', 'Videos', 'Carousels', 'Reels'].map(filter => (
          <button key={filter} className="px-3 py-1.5 bg-[#1e293b] text-gray-400 rounded-lg text-sm hover:bg-[#2a2a4a] hover:text-white cursor-pointer">
            {filter}
          </button>
        ))}
      </div>

      {!activeProfile.connected ? (
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📷</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
          <p className="text-gray-400 mb-4">Connect your Instagram account in Settings to view and manage your posts</p>
          <div className="text-sm text-gray-500">
            <p>Once connected, you can:</p>
            <ul className="mt-2 space-y-1">
              <li>View all your posts in grid or list view</li>
              <li>See like counts, comments, and engagement</li>
              <li>Get detailed insights for each post</li>
              <li>Manage carousel slides</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-3' : 'space-y-3'}>
          <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-8 text-center text-gray-500 col-span-3">
            Loading posts...
          </div>
        </div>
      )}

      {/* API Reference */}
      <div className="mt-6 bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoints Used</h4>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{user-id}'}/media</span> <span className="text-gray-600">— List all posts</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{media-id}'}</span> <span className="text-gray-600">— Post detail</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{media-id}'}/insights</span> <span className="text-gray-600">— Post analytics</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{media-id}'}/children</span> <span className="text-gray-600">— Carousel slides</span></div>
        </div>
      </div>
    </div>
  );
}
