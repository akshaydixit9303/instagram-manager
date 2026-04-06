import { useProfile } from '../../context/ProfileContext';

export default function CommentsPanel() {
  const { activeProfile } = useProfile();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Comments Management</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Comments', value: '—', icon: '💬' },
          { label: 'Unreplied', value: '—', icon: '⏳' },
          { label: 'Hidden', value: '—', icon: '🙈' },
        ].map(s => (
          <div key={s.label} className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
            <span className="text-xl">{s.icon}</span>
            <div className="text-2xl font-bold text-white mt-2">{s.value}</div>
            <div className="text-sm text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {!activeProfile.connected ? (
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-white mb-2">Connect to Manage Comments</h3>
          <p className="text-gray-400">View, reply, hide, and delete comments on all your posts</p>
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>Features available:</p>
            <p>Read all comments on any post</p>
            <p>Reply to comments directly</p>
            <p>Hide inappropriate comments</p>
            <p>Delete spam comments</p>
            <p>View comment replies (threads)</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4 text-gray-500 text-center">Loading comments...</div>
        </div>
      )}

      <div className="mt-6 bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoints</h4>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{media-id}'}/comments</span> <span className="text-gray-600">— List comments</span></div>
          <div className="flex gap-2"><span className="text-blue-400">POST</span> <span className="text-gray-400">/{'{comment-id}'}/replies</span> <span className="text-gray-600">— Reply</span></div>
          <div className="flex gap-2"><span className="text-red-400">DELETE</span> <span className="text-gray-400">/{'{comment-id}'}</span> <span className="text-gray-600">— Delete</span></div>
          <div className="flex gap-2"><span className="text-yellow-400">POST</span> <span className="text-gray-400">/{'{comment-id}'}?hide=true</span> <span className="text-gray-600">— Hide</span></div>
        </div>
      </div>
    </div>
  );
}
