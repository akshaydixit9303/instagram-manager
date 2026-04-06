import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

export default function PublishPanel() {
  const { activeProfile } = useProfile();
  const [postType, setPostType] = useState('photo');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [carouselUrls, setCarouselUrls] = useState(['']);

  const types = [
    { id: 'photo', icon: '🖼️', label: 'Photo', desc: 'Single image' },
    { id: 'carousel', icon: '📑', label: 'Carousel', desc: 'Up to 10 images' },
    { id: 'reel', icon: '🎬', label: 'Reel', desc: 'Short video' },
    { id: 'story', icon: '⭕', label: 'Story', desc: '24hr content' },
  ];

  return (
    <div className="p-6 panel-enter">
      <h2 className="text-2xl font-bold text-white mb-6">Publish Content</h2>

      <div className="flex gap-2 mb-6">
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => setPostType(t.id)}
            className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
              postType === t.id
                ? 'glass border-orange-500/40 glow-orange'
                : 'glass border-transparent hover:border-white/10'
            }`}
          >
            <div className="text-xl">{t.icon}</div>
            <div className={`text-xs font-medium mt-1 ${postType === t.id ? 'text-orange-400' : 'text-gray-400'}`}>{t.label}</div>
            <div className="text-[10px] text-gray-600">{t.desc}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
              {postType === 'reel' ? 'Video URL' : 'Image URL'}
            </label>
            <input
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#0a0a18] text-white p-3 rounded-xl border border-[#1a1a30] outline-none focus:border-orange-500/50 text-sm transition-colors"
            />
          </div>

          {postType === 'carousel' && (
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Additional Images</label>
              {carouselUrls.map((url, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={url} onChange={e => { const n = [...carouselUrls]; n[i] = e.target.value; setCarouselUrls(n); }}
                    placeholder={`Image ${i + 2}`} className="flex-1 bg-[#0a0a18] text-white p-2.5 rounded-lg border border-[#1a1a30] outline-none focus:border-orange-500/50 text-sm" />
                  <button onClick={() => setCarouselUrls(carouselUrls.filter((_, j) => j !== i))} className="text-red-400/60 hover:text-red-400 text-sm px-2 cursor-pointer">x</button>
                </div>
              ))}
              {carouselUrls.length < 9 && <button onClick={() => setCarouselUrls([...carouselUrls, ''])} className="text-orange-400 text-xs cursor-pointer">+ Add Image</button>}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Caption</label>
            <textarea value={caption} onChange={e => setCaption(e.target.value)}
              placeholder="Write your caption...&#10;&#10;#hashtags" rows={8}
              className="w-full bg-[#0a0a18] text-white p-3 rounded-xl border border-[#1a1a30] outline-none focus:border-orange-500/50 text-sm resize-none" />
            <div className="text-[10px] text-gray-600 mt-1">{caption.length} / 2,200</div>
          </div>

          <button disabled={!activeProfile.connected}
            className={`w-full py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all ${
              activeProfile.connected
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20'
                : 'bg-[#1a1a30] text-gray-600 cursor-not-allowed'
            }`}>
            {activeProfile.connected ? `Publish to @${activeProfile.username}` : 'Connect Account First'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Preview</h4>
            <div className="bg-black/50 rounded-xl aspect-square flex items-center justify-center text-gray-700">
              {imageUrl ? <img src={imageUrl} alt="" className="w-full h-full object-cover rounded-xl" onError={e => e.target.style.display='none'} /> : <span className="text-4xl opacity-30">📷</span>}
            </div>
            <div className="text-xs text-gray-400 mt-3 whitespace-pre-wrap line-clamp-4">{caption || 'Caption preview...'}</div>
          </div>

          <div className="glass rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">API Flow</h4>
            <div className="space-y-2">
              {['Create container (POST /{user}/media)', 'Check status (GET /{container})', 'Publish (POST /{user}/media_publish)'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-[10px] font-bold">{i+1}</span>
                  <span className="text-gray-500 font-mono">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
