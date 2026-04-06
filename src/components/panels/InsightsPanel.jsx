import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

export default function InsightsPanel() {
  const { activeProfile } = useProfile();
  const [period, setPeriod] = useState('day');

  const metrics = [
    { label: 'Impressions', value: '—', change: '', icon: '👁️', desc: 'Total times content was displayed' },
    { label: 'Reach', value: '—', change: '', icon: '📡', desc: 'Unique accounts that saw content' },
    { label: 'Profile Views', value: '—', change: '', icon: '👤', desc: 'Profile page visits' },
    { label: 'Follower Count', value: '—', change: '', icon: '👥', desc: 'Total followers' },
    { label: 'Engagement Rate', value: '—', change: '', icon: '💎', desc: '(Likes + Comments) / Reach' },
    { label: 'Saves', value: '—', change: '', icon: '🔖', desc: 'Content saves by users' },
  ];

  const audienceMetrics = [
    { label: 'Top Cities', icon: '🏙️', data: 'Connect to see data' },
    { label: 'Top Countries', icon: '🌍', data: 'Connect to see data' },
    { label: 'Age Distribution', icon: '📊', data: 'Connect to see data' },
    { label: 'Gender Split', icon: '👥', data: 'Connect to see data' },
    { label: 'Online Hours', icon: '🕐', data: 'Best posting time' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Insights & Analytics</h2>
        <div className="flex gap-2">
          {['day', 'week', 'days_28', 'lifetime'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded text-sm cursor-pointer ${
                period === p ? 'bg-orange-500 text-white' : 'bg-[#1e293b] text-gray-400 hover:text-white'
              }`}
            >
              {p === 'day' ? 'Daily' : p === 'week' ? 'Weekly' : p === 'days_28' ? 'Monthly' : 'Lifetime'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{m.icon}</span>
              <span className="text-sm text-gray-400">{m.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{m.value}</div>
            <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Engagement Over Time</h3>
        <div className="h-48 flex items-center justify-center text-gray-600 border border-dashed border-[#2e2e5a] rounded-lg">
          {activeProfile.connected ? 'Loading chart...' : 'Connect account to see engagement trends'}
        </div>
      </div>

      {/* Audience Demographics */}
      <h3 className="text-lg font-semibold text-white mb-3">Audience Demographics</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {audienceMetrics.map(m => (
          <div key={m.label} className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{m.icon}</span>
              <span className="text-sm font-medium text-white">{m.label}</span>
            </div>
            <div className="text-sm text-gray-500">{m.data}</div>
          </div>
        ))}
      </div>

      {/* API Reference */}
      <div className="bg-[#12122a] border border-[#1e293b] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">API Endpoints Used</h4>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{user-id}'}/insights?metric=impressions,reach&period={period}</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{user-id}'}/insights?metric=online_followers&period=lifetime</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{user-id}'}/insights?metric=follower_demographics&breakdown=city,age,gender</span></div>
          <div className="flex gap-2"><span className="text-green-400">GET</span> <span className="text-gray-400">/{'{media-id}'}/insights?metric=impressions,reach,engagement,saved,shares</span></div>
        </div>
      </div>
    </div>
  );
}
