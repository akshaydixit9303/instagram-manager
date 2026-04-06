import { useProfile } from '../../context/ProfileContext';

export default function MentionsPanel() {
  const { activeProfile } = useProfile();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Mentions & Tags</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6">
          <div className="text-3xl mb-3">🏷️</div>
          <h3 className="text-lg font-semibold text-white mb-2">Tagged Posts</h3>
          <p className="text-sm text-gray-400">Posts where your account is tagged</p>
          <p className="text-xs text-gray-600 mt-2 font-mono">GET /{'{user-id}'}/tags</p>
        </div>
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6">
          <div className="text-3xl mb-3">📣</div>
          <h3 className="text-lg font-semibold text-white mb-2">Story Mentions</h3>
          <p className="text-sm text-gray-400">Stories where you are mentioned</p>
          <p className="text-xs text-gray-600 mt-2 font-mono">GET /{'{user-id}'}/mentioned_media</p>
        </div>
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-lg font-semibold text-white mb-2">Comment Mentions</h3>
          <p className="text-sm text-gray-400">Comments where you are @mentioned</p>
          <p className="text-xs text-gray-600 mt-2 font-mono">GET /{'{user-id}'}/mentioned_comment</p>
        </div>
      </div>
      {!activeProfile.connected && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center text-yellow-400 text-sm">
          Connect your account in Settings to see mentions and tags
        </div>
      )}
    </div>
  );
}
