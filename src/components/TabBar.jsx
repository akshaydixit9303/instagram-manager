import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';

export default function TabBar() {
  const { profiles, openTabs, activeTabId, openTab, closeTab, setActiveTabId, addProfile } = useProfile();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const openProfiles = openTabs.map(id => profiles.find(p => p.id === id)).filter(Boolean);
  const closedProfiles = profiles.filter(p => !openTabs.includes(p.id));

  const handleAdd = () => {
    if (newName && newUsername) {
      const colors = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#ec4899', '#06b6d4'];
      addProfile({
        name: newName,
        username: newUsername,
        avatar: newName.slice(0, 2).toUpperCase(),
        color: colors[profiles.length % colors.length],
        gradient: 'from-purple-500 to-pink-500',
        accessToken: '',
        igUserId: '',
      });
      setNewName('');
      setNewUsername('');
      setShowAddModal(false);
    }
  };

  return (
    <>
      <div className="h-10 bg-[#0c0c1a] flex items-end px-1 border-b border-[#1a1a30] select-none">
        {/* Tabs */}
        <div className="flex items-end gap-0.5 flex-1 overflow-x-auto">
          {openProfiles.map(profile => (
            <div
              key={profile.id}
              onClick={() => setActiveTabId(profile.id)}
              className={`group flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer transition-all max-w-[220px] min-w-[140px] ${
                activeTabId === profile.id
                  ? 'bg-[#12122a] border border-b-0 border-[#2a2a4a]'
                  : 'bg-[#0a0a18] hover:bg-[#10101f] border border-transparent'
              }`}
            >
              {/* Profile dot */}
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: profile.color }}
              />

              {/* Name */}
              <span className={`text-xs truncate ${
                activeTabId === profile.id ? 'text-white font-medium' : 'text-gray-500'
              }`}>
                {profile.name}
              </span>

              {/* Close button */}
              {openTabs.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); closeTab(profile.id); }}
                  className="ml-auto w-4 h-4 rounded-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#2a2a4a] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px]"
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pb-1.5 px-2">
          {/* Open profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#1e1e3a] cursor-pointer text-lg leading-none"
              title="Open profile"
            >
              +
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-8 w-56 bg-[#16162e] border border-[#2a2a4a] rounded-xl shadow-2xl z-50 py-2">
                {closedProfiles.length > 0 && (
                  <>
                    <div className="px-3 py-1 text-[10px] text-gray-500 uppercase tracking-wider">Open Profile</div>
                    {closedProfiles.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { openTab(p.id); setShowDropdown(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#1e1e3a] text-sm text-gray-300 cursor-pointer text-left"
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: p.color }}>{p.avatar}</div>
                        {p.name}
                      </button>
                    ))}
                    <div className="border-t border-[#2a2a4a] my-1" />
                  </>
                )}
                <button
                  onClick={() => { setShowAddModal(true); setShowDropdown(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#1e1e3a] text-sm text-orange-400 cursor-pointer text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-xs">+</span>
                  New Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl p-6 w-[400px] shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-4">Add New Profile</h3>
            <div className="space-y-3">
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Profile name (e.g., MyBrand)"
                className="w-full bg-[#0a0a1a] text-white p-3 rounded-xl border border-[#2a2a4a] outline-none focus:border-orange-500 text-sm"
                autoFocus
              />
              <input
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                placeholder="Instagram username"
                className="w-full bg-[#0a0a1a] text-white p-3 rounded-xl border border-[#2a2a4a] outline-none focus:border-orange-500 text-sm"
              />
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border border-[#2a2a4a] text-gray-400 text-sm hover:bg-[#1a1a35] cursor-pointer">Cancel</button>
                <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:opacity-90 cursor-pointer">Add Profile</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
