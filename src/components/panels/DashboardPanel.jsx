import { useProfile } from '../../context/ProfileContext';

export default function DashboardPanel() {
  const { activeProfile } = useProfile();

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 mb-6 bg-white/[0.02] border border-white/[0.04]">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-20" style={{ background: activeProfile.color }} />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${activeProfile.color}, ${activeProfile.color}88)` }}>
              {activeProfile.avatar}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{activeProfile.name}</h1>
              <p className="text-sm text-gray-500">@{activeProfile.username}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full ${
            activeProfile.connected
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${activeProfile.connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            {activeProfile.connected ? 'Connected' : 'Not Connected'}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Followers', value: '—', sub: 'Total followers', color: 'from-blue-500/10 to-transparent border-blue-500/10' },
          { label: 'Following', value: '—', sub: 'Accounts followed', color: 'from-emerald-500/10 to-transparent border-emerald-500/10' },
          { label: 'Posts', value: '—', sub: 'Total media', color: 'from-violet-500/10 to-transparent border-violet-500/10' },
          { label: 'Engagement', value: '—', sub: 'Avg per post', color: 'from-orange-500/10 to-transparent border-orange-500/10' },
        ].map(s => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} border rounded-xl p-4`}>
            <div className="text-[11px] text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
            <div className="text-[10px] text-gray-600 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-6 gap-2">
          {[
            { icon: '✏️', label: 'Post' },
            { icon: '📊', label: 'Analytics' },
            { icon: '💬', label: 'Comments' },
            { icon: '#', label: 'Hashtags' },
            { icon: '🔔', label: 'Mentions' },
            { icon: '🔍', label: 'Compete' },
          ].map(a => (
            <div key={a.label} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 text-center hover:bg-white/[0.04] hover:border-white/[0.08] cursor-pointer transition-all group">
              <div className="text-lg mb-1">{a.icon}</div>
              <div className="text-[11px] text-gray-500 group-hover:text-white transition-colors">{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* API Coverage */}
      <div>
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Instagram Graph API — 42 Endpoints</h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            { cat: 'Profile', n: 2 }, { cat: 'Media', n: 9 }, { cat: 'Publish', n: 5 },
            { cat: 'Comments', n: 5 }, { cat: 'Insights', n: 6 }, { cat: 'Hashtags', n: 4 },
            { cat: 'Mentions', n: 3 }, { cat: 'Messages', n: 4 }, { cat: 'Stories', n: 2 }, { cat: 'Webhooks', n: 4 },
          ].map(c => (
            <div key={c.cat} className="bg-white/[0.02] border border-white/[0.03] rounded-lg px-3 py-2">
              <div className="text-[11px] text-gray-400">{c.cat}</div>
              <div className="text-[10px] text-gray-600">{c.n} endpoints</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
