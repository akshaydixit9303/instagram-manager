import { useProfile } from '../context/ProfileContext';

export default function Sidebar() {
  const { profiles, activeId, setActiveId, setActiveSection, showAddForm, setShowAddForm, removeProfile } = useProfile();

  return (
    <div className="w-[260px] min-w-[260px] h-full bg-[#0b0b1a] border-r border-white/[0.04] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
            <span className="text-white text-sm font-bold">IG</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white tracking-tight">InstaManager</div>
            <div className="text-[10px] text-gray-600">Instagram Management Suite</div>
          </div>
        </div>
      </div>

      {/* Profiles Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em]">Profiles</span>
            <span className="text-[10px] text-gray-600">{profiles.length}</span>
          </div>

          {/* Profile List */}
          <div className="space-y-1">
            {profiles.map(profile => {
              const isActive = activeId === profile.id && !showAddForm;
              return (
                <div
                  key={profile.id}
                  className="group relative"
                >
                  <button
                    onClick={() => { setActiveId(profile.id); setShowAddForm(false); setActiveSection('dashboard'); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-white/[0.06] shadow-lg shadow-black/20'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shadow-md shrink-0"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${profile.color}, ${profile.color}aa)`
                          : `${profile.color}30`,
                        color: isActive ? '#fff' : profile.color,
                      }}
                    >
                      {profile.avatar}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className={`text-[13px] font-medium truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {profile.name}
                      </div>
                      <div className="text-[11px] text-gray-600 truncate">@{profile.username}</div>
                    </div>

                    {/* Status */}
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      profile.connected
                        ? 'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]'
                        : 'bg-gray-700'
                    }`} />
                  </button>

                  {/* Delete on hover */}
                  <button
                    onClick={(e) => { e.stopPropagation(); if(confirm(`Remove ${profile.name}?`)) removeProfile(profile.id); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded flex items-center justify-center text-gray-700 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-[10px]"
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Profile Button */}
      <div className="px-4 py-3 border-t border-white/[0.04]">
        <button
          onClick={() => setShowAddForm(true)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
            showAddForm
              ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
              : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.06] hover:text-white border border-transparent'
          }`}
        >
          <span className="text-base leading-none">+</span>
          Add Profile
        </button>
      </div>
    </div>
  );
}
