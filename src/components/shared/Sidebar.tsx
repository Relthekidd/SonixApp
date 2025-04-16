// src/components/shared/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Library, User, LogOut, Star, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthProvider';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const baseItems: NavItem[] = [{ name: 'Explore', path: '/explore', icon: Compass }];

    if (!user) {
      setNavItems(baseItems);
      return;
    }

    const userPages: NavItem[] = [
      { name: 'For You', path: '/feed', icon: Star },
      { name: 'Library', path: '/library', icon: Library },
    ];

    const rolePages: NavItem[] =
      user.role === 'artist'
        ? [{ name: 'Dashboard', path: '/artist/dashboard', icon: LayoutDashboard }]
        : user.role === 'admin' || user.role === 'super_admin'
          ? [{ name: 'Admin Panel', path: '/admin/dashboard', icon: LayoutDashboard }]
          : [];

    const finalNav = [
      ...baseItems,
      ...userPages,
      ...rolePages,
      { name: 'Profile', path: '/profile', icon: User },
    ];

    setNavItems(finalNav);
  }, [user]);

  if (!user) return null;

  return (
    <aside className="fixed top-0 left-0 z-40 flex flex-col justify-between w-64 h-screen p-6 border-r bg-background border-white/10">
      <div>
        <div className="mb-10">
          <Link to="/explore" className="flex items-center gap-3 text-2xl font-bold">
            <Home className="w-6 h-6" />
            Sonix
          </Link>
        </div>

        <nav className="space-y-3">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-white/10 text-white/70'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={signOut}
        className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 transition-colors rounded-lg hover:text-red-500 hover:bg-red-500/10"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </aside>
  );
};

export default Sidebar;
