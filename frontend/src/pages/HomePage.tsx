import { useAuth } from '../context/AuthContext';
import AdminHomePage from './AdminHomePage';
import LandingPage from './LandingPage';
import StaffHomePage from './StaffHomePage';
import TenantHomePage from './TenantHomePage';

export default function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  if (user.role === 'admin' || user.role === 'super_admin') {
    return <AdminHomePage />;
  }

  if (user.role === 'staff' || user.role === 'technician') {
    return <StaffHomePage />;
  }

  return <TenantHomePage />;
}
