import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';

export default function AddProfileForm() {
  const { addProfile, setShowAddForm } = useProfile();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    username: '',
    igUserId: '',
    accessToken: '',
    appId: '',
    appSecret: '',
    pageId: '',
  });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const canProceed = step === 1
    ? form.name && form.username
    : form.igUserId && form.accessToken;

  const handleSubmit = () => {
    addProfile(form);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#090914]">
      <div className="max-w-2xl mx-auto px-8 py-10 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Connect an Instagram Business or Creator account</p>
          </div>
          <button
            onClick={() => setShowAddForm(false)}
            className="text-gray-600 hover:text-white text-sm cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Cancel
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[
            { n: 1, label: 'Profile Info' },
            { n: 2, label: 'API Credentials' },
          ].map(s => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= s.n
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 text-gray-600'
              }`}>
                {step > s.n ? '✓' : s.n}
              </div>
              <span className={`text-sm ${step >= s.n ? 'text-white' : 'text-gray-600'}`}>{s.label}</span>
              {s.n < 2 && <div className={`flex-1 h-px ${step > 1 ? 'bg-orange-500/50' : 'bg-white/5'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Profile Info */}
        {step === 1 && (
          <div className="space-y-5 fade-in">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Profile Name *</label>
                  <input
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="e.g., My Brand, Agency Client"
                    className="w-full bg-[#0d0d1e] text-white px-4 py-3 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm placeholder:text-gray-700 transition-colors"
                    autoFocus
                  />
                  <p className="text-[11px] text-gray-600 mt-1">Display name for this profile in the sidebar</p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Instagram Username *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">@</span>
                    <input
                      value={form.username}
                      onChange={e => set('username', e.target.value)}
                      placeholder="username"
                      className="w-full bg-[#0d0d1e] text-white pl-8 pr-4 py-3 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm placeholder:text-gray-700 transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">Must be a Business or Creator account</p>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {form.name && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Preview</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold shadow-lg">
                    {form.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-medium">{form.name}</div>
                    <div className="text-sm text-gray-500">@{form.username || '...'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: API Credentials */}
        {step === 2 && (
          <div className="space-y-5 fade-in">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-1">API Credentials</h3>
              <p className="text-[11px] text-gray-500 mb-5">From Facebook Developer Console → Graph API Explorer</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Instagram User ID *</label>
                  <input
                    value={form.igUserId}
                    onChange={e => set('igUserId', e.target.value)}
                    placeholder="17841400000000000"
                    className="w-full bg-[#0d0d1e] text-white px-4 py-3 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm font-mono placeholder:text-gray-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Access Token *</label>
                  <input
                    type="password"
                    value={form.accessToken}
                    onChange={e => set('accessToken', e.target.value)}
                    placeholder="EAAGz..."
                    className="w-full bg-[#0d0d1e] text-white px-4 py-3 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm font-mono placeholder:text-gray-700 transition-colors"
                  />
                  <p className="text-[11px] text-gray-600 mt-1">Long-lived token recommended (60 days validity)</p>
                </div>

                <div className="border-t border-white/[0.04] pt-4 mt-4">
                  <p className="text-[11px] text-gray-500 mb-3">Optional — for token refresh & advanced features</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">App ID</label>
                      <input
                        value={form.appId}
                        onChange={e => set('appId', e.target.value)}
                        placeholder="App ID"
                        className="w-full bg-[#0d0d1e] text-white px-4 py-2.5 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm font-mono placeholder:text-gray-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">App Secret</label>
                      <input
                        type="password"
                        value={form.appSecret}
                        onChange={e => set('appSecret', e.target.value)}
                        placeholder="App Secret"
                        className="w-full bg-[#0d0d1e] text-white px-4 py-2.5 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm font-mono placeholder:text-gray-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Facebook Page ID</label>
                    <input
                      value={form.pageId}
                      onChange={e => set('pageId', e.target.value)}
                      placeholder="Page ID linked to Instagram"
                      className="w-full bg-[#0d0d1e] text-white px-4 py-2.5 rounded-xl border border-white/[0.06] outline-none focus:border-orange-500/50 text-sm font-mono placeholder:text-gray-700 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Setup Help */}
            <div className="bg-orange-500/[0.03] border border-orange-500/10 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-orange-400 mb-3">How to get these credentials</h4>
              <div className="space-y-2.5">
                {[
                  'Go to developers.facebook.com → Create App',
                  'Add "Instagram Graph API" product',
                  'Link Instagram Business/Creator account via Facebook Page',
                  'Open Graph API Explorer → Generate token with required permissions',
                  'Call /me?fields=id to get your Instagram User ID',
                ].map((step, i) => (
                  <div key={i} className="flex gap-2.5 text-[12px]">
                    <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
                    <span className="text-gray-400">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 px-3 py-2 bg-[#0d0d1e] rounded-lg text-[10px] font-mono text-gray-600">
                Permissions: instagram_basic, instagram_content_publish, instagram_manage_comments, instagram_manage_insights, pages_show_list
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl border border-white/[0.06] text-gray-400 text-sm hover:bg-white/[0.03] cursor-pointer transition-colors"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          {step < 2 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                canProceed
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer"
            >
              {form.accessToken ? 'Connect & Add Profile' : 'Add Profile (Connect Later)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
