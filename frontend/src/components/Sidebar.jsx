import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Lightbulb, CalendarDays, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/insights', label: 'Insights', icon: Lightbulb },
    { path: '/timeline', label: 'Timeline', icon: CalendarDays },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-surface border-r border-white/5 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold text-primary">Chronis</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive ? "bg-primary/10 text-primary" : "text-textSecondary hover:bg-white/5 hover:text-textPrimary"
              )}
            >
              <Icon size={20} className={isActive ? "text-primary" : "text-textSecondary"} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-textSecondary hover:bg-white/5 hover:text-warning transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
