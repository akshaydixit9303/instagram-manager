import { ProfileProvider, useProfile } from './context/ProfileContext';
import Sidebar from './components/Sidebar';
import ContentPanel from './components/ContentPanel';

function Layout() {
  const { activeProfile, showAddForm } = useProfile();

  return (
    <div className="flex h-screen bg-[#090914]">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        {activeProfile || showAddForm ? (
          <ContentPanel />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center">
                <span className="text-3xl">📸</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Welcome to InstaManager</h2>
              <p className="text-sm text-gray-500 max-w-xs">Select a profile from the sidebar or add a new one to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <Layout />
    </ProfileProvider>
  );
}
