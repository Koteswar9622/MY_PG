import { useMemo } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RolesPage from './pages/RolesPage';
import SearchPage from './pages/SearchPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AllocationPage from './pages/AllocationPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active' : 'nav-link';

export default function App() {
  const { user, logout } = useAuth();
  const userLabel = useMemo(() => {
    if (!user) return 'Guest';
    return `${user.email} (${user.role ?? 'tenant'})`;
  }, [user]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">MY-PG</div>
        <nav className="nav-bar">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/roles" className={navClass}>
            Roles
          </NavLink>
          <NavLink to="/availability" className={navClass}>
            Availability
          </NavLink>
          <NavLink to="/allocation" className={navClass}>
            Allocation
          </NavLink>
          {!user && (
            <>
              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
            </>
          )}
          {user && (
            <button className="nav-link logout-button" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
        <div className="user-badge">{userLabel}</div>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/availability" element={<SearchPage />} />
          <Route path="/properties/:propertyId" element={<PropertyDetailsPage />} />
          <Route path="/allocation" element={<AllocationPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">MY-PG Frontend &copy; 2026</footer>
    </div>
  );
}
