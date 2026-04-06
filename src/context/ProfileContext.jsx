import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

const SAMPLE_PROFILES = [
  {
    id: 'agentnation',
    name: 'AgentNation',
    username: 'agentnation.official',
    avatar: 'AN',
    color: '#f97316',
    accessToken: '',
    igUserId: '',
    appId: '',
    appSecret: '',
    pageId: '',
    connected: false,
  },
  {
    id: 'bizpilot',
    name: 'BizPilot',
    username: 'bizpilot.in',
    avatar: 'BP',
    color: '#3b82f6',
    accessToken: '',
    igUserId: '',
    appId: '',
    appSecret: '',
    pageId: '',
    connected: false,
  },
];

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('ig_profiles_v2');
    return saved ? JSON.parse(saved) : SAMPLE_PROFILES;
  });

  const [activeId, setActiveId] = useState(profiles[0]?.id || null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);

  const activeProfile = profiles.find(p => p.id === activeId) || null;

  const save = (next) => {
    setProfiles(next);
    localStorage.setItem('ig_profiles_v2', JSON.stringify(next));
  };

  const addProfile = (data) => {
    const id = data.username.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const colors = ['#f97316','#3b82f6','#8b5cf6','#10b981','#ef4444','#ec4899','#06b6d4','#eab308'];
    const newProfile = {
      id,
      name: data.name,
      username: data.username,
      avatar: data.name.slice(0, 2).toUpperCase(),
      color: colors[profiles.length % colors.length],
      accessToken: data.accessToken || '',
      igUserId: data.igUserId || '',
      appId: data.appId || '',
      appSecret: data.appSecret || '',
      pageId: data.pageId || '',
      connected: !!(data.accessToken && data.igUserId),
    };
    save([...profiles, newProfile]);
    setActiveId(id);
    setActiveSection('dashboard');
    setShowAddForm(false);
  };

  const updateProfile = (id, updates) => {
    save(profiles.map(p => p.id === id ? { ...p, ...updates, connected: !!(updates.accessToken && updates.igUserId) || p.connected } : p));
  };

  const removeProfile = (id) => {
    const next = profiles.filter(p => p.id !== id);
    save(next);
    if (activeId === id) {
      setActiveId(next[0]?.id || null);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profiles, activeProfile, activeId, setActiveId,
      activeSection, setActiveSection,
      showAddForm, setShowAddForm,
      addProfile, updateProfile, removeProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
