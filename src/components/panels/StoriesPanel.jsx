import { useProfile } from '../../context/ProfileContext';

export default function StoriesPanel() {
  const { activeProfile } = useProfile();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Stories</h2>
      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-12 text-center">
        <div className="text-5xl mb-4">⭕</div>
        <h3 className="text-xl font-semibold text-white mb-2">{activeProfile.connected ? 'Loading stories...' : 'Connect to View Stories'}</h3>
        <p className="text-gray-400 text-sm mb-4">View active stories and their insights</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Impressions, reach, replies</p>
          <p>Taps forward / backward / exits</p>
          <p>Story publish and management</p>
        </div>
      </div>
      <div className="mt-6 bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoints</h4>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{user-id}'}/stories</span> <span className="text-gray-600">— List active stories</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{story-id}'}/insights</span> <span className="text-gray-600">— Story analytics</span></div>
        </div>
      </div>
    </div>
  );
}
