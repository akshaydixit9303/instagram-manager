import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

export default function SettingsPanel() {
  const { activeProfile, updateProfile, removeProfile } = useProfile();
  const [token, setToken] = useState(activeProfile.accessToken);
  const [userId, setUserId] = useState(activeProfile.igUserId);

  const handleSave = () => {
    updateProfile(activeProfile.id, {
      accessToken: token,
      igUserId: userId,
      connected: !!(token && userId),
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Settings — {activeProfile.name}</h2>

      {/* Connection Status */}
      <div className={`rounded-xl p-4 mb-6 border ${
        activeProfile.connected
          ? 'bg-green-500/10 border-green-500/30'
          : 'bg-red-500/10 border-red-500/30'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${activeProfile.connected ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className={`text-sm font-medium ${activeProfile.connected ? 'text-green-400' : 'text-red-400'}`}>
            {activeProfile.connected ? 'Connected to Instagram' : 'Not Connected'}
          </span>
        </div>
      </div>

      {/* API Credentials */}
      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Instagram API Credentials</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-400 block mb-1">Instagram User ID</label>
            <input
              value={userId}
              onChange={e => setUserId(e.target.value)}
              placeholder="17841400000000000"
              className="w-full bg-[#0f0f23] text-white p-3 rounded-lg border border-[#1e293b] outline-none focus:border-orange-500 text-sm font-mono"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 block mb-1">Access Token</label>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="EAAG..."
              className="w-full bg-[#0f0f23] text-white p-3 rounded-lg border border-[#1e293b] outline-none focus:border-orange-500 text-sm font-mono"
            />
            <p className="text-xs text-gray-600 mt-1">Long-lived token (valid 60 days)</p>
          </div>

          <button onClick={handleSave} className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-orange-600 cursor-pointer">
            Save & Connect
          </button>
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">How to Get Credentials</h3>
        <div className="space-y-3 text-sm text-gray-400">
          <div className="flex gap-3">
            <span className="w-7 h-7 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <div>Go to <span className="text-orange-400">developers.facebook.com</span> and create an app</div>
          </div>
          <div className="flex gap-3">
            <span className="w-7 h-7 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <div>Add <span className="text-white">Instagram Graph API</span> product to your app</div>
          </div>
          <div className="flex gap-3">
            <span className="w-7 h-7 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <div>Connect your <span className="text-white">Instagram Business/Creator</span> account via Facebook Page</div>
          </div>
          <div className="flex gap-3">
            <span className="w-7 h-7 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <div>Generate a <span className="text-white">long-lived access token</span> from Graph API Explorer</div>
          </div>
          <div className="flex gap-3">
            <span className="w-7 h-7 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">5</span>
            <div>Find your <span className="text-white">Instagram User ID</span> from the /me endpoint</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#0f0f23] rounded-lg text-xs font-mono text-gray-500">
          Required permissions: instagram_basic, instagram_content_publish, instagram_manage_comments, instagram_manage_insights, pages_show_list, pages_read_engagement
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-3">Danger Zone</h3>
        <button
          onClick={() => { if (confirm('Remove this profile?')) removeProfile(activeProfile.id); }}
          className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 cursor-pointer"
        >
          Remove Profile
        </button>
      </div>
    </div>
  );
}
