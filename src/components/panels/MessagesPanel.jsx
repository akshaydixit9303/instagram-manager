import { useProfile } from '../../context/ProfileContext';

export default function MessagesPanel() {
  const { activeProfile } = useProfile();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Direct Messages</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📥</div>
          <div className="text-xl font-bold text-white">—</div>
          <div className="text-sm text-gray-400">Conversations</div>
        </div>
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">⏳</div>
          <div className="text-xl font-bold text-white">—</div>
          <div className="text-sm text-gray-400">Unread</div>
        </div>
        <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📤</div>
          <div className="text-xl font-bold text-white">—</div>
          <div className="text-sm text-gray-400">Sent Today</div>
        </div>
      </div>
      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-12 text-center">
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="text-xl font-semibold text-white mb-2">{activeProfile.connected ? 'Loading conversations...' : 'Connect to Manage DMs'}</h3>
        <p className="text-gray-400 text-sm">Read conversations, send messages, and set up ice breakers</p>
      </div>
      <div className="mt-6 bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoints</h4>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{user-id}'}/conversations</span> <span className="text-gray-600">— List DMs</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{conv-id}'}/messages</span> <span className="text-gray-600">— Read messages</span></div>
          <div className="flex gap-2"><span className="text-blue-400">POST</span> <span className="text-gray-400">/{'{user-id}'}/messages</span> <span className="text-gray-600">— Send DM</span></div>
        </div>
      </div>
    </div>
  );
}
