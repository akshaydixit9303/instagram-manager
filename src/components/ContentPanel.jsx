import { useProfile } from '../context/ProfileContext';
import AddProfileForm from './AddProfileForm';
import ProfileView from './ProfileView';

export default function ContentPanel() {
  const { showAddForm, activeProfile } = useProfile();

  if (showAddForm) return <AddProfileForm />;
  if (activeProfile) return <ProfileView />;
  return null;
}
