import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type UserRole = 'super_admin' | 'admin' | 'staff' | 'technician' | 'tenant' | null;

interface AuthUser {
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'my-pg-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      login(user: AuthUser) {
        setUser(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      },
      logout() {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
