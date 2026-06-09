import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Lightbulb, CalendarDays, User, Settings, LogOut, ChevronRight, ChevronLeft, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';
import Logo from './Logo';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('chronis-theme') || 'dark';
    setTheme(savedTheme);

    const handleThemeChange = (e) => {
      if (e.detail) {
        setTheme(e.detail);
      }
    };
    window.addEventListener('chronis-theme-changed', handleThemeChange);

    return () => {
      window.removeEventListener('chronis-theme-changed', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('chronis-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('chronis-theme-changed', { detail: nextTheme }));
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/insights', label: 'Insights', icon: Lightbulb },
    { path: '/timeline', label: 'Timeline', icon: CalendarDays },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
  
  if (user?.role === 'admin') {
    navItems.unshift({ path: '/admin', label: 'Admin Portal', icon: LayoutDashboard });
  }

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }} 
      className="glass-panel hidden md:flex flex-col relative shrink-0 z-40 rounded-none border-y-0 border-l-0"
    >


      <div className="h-20 w-full flex items-center px-4 overflow-hidden whitespace-nowrap border-b border-white/5 shrink-0">
        {isCollapsed ? (
          <div className="flex w-full items-center justify-center gap-1.5">
            <Logo className="w-7 h-7 shrink-0" withText={false} />
            <button 
              onClick={() => setIsCollapsed(false)}
              className="p-1 rounded-md text-textSecondary hover:bg-white/10 hover:text-primary transition-colors"
              title="Expand Sidebar"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            <Logo className="w-8 h-8 shrink-0" withText={true} />
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-lg text-textSecondary hover:bg-white/10 hover:text-primary transition-colors"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={clsx(
                "flex items-center px-4 py-3 rounded-xl transition-all duration-200",
                isActive ? "bg-primary/10 text-primary" : "text-textSecondary hover:bg-white/5 hover:text-textPrimary",
                isCollapsed ? "justify-center" : "space-x-3"
              )}
            >
              <Icon size={20} className={clsx("shrink-0", isActive ? "text-primary" : "text-textSecondary")} />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 overflow-hidden whitespace-nowrap space-y-2">
        <button
          onClick={toggleTheme}
          title={isCollapsed ? "Toggle Theme" : undefined}
          className={clsx(
            "flex w-full items-center px-4 py-3 rounded-xl text-textSecondary hover:bg-white/5 hover:text-primary transition-all duration-200",
            isCollapsed ? "justify-center" : "space-x-3"
          )}
        >
          {theme === 'light' ? <Moon size={20} className="shrink-0" /> : <Sun size={20} className="shrink-0" />}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium overflow-hidden"
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={logout}
          title={isCollapsed ? "Logout" : undefined}
          className={clsx(
            "flex w-full items-center px-4 py-3 rounded-xl text-textSecondary hover:bg-white/5 hover:text-warning transition-all duration-200",
            isCollapsed ? "justify-center" : "space-x-3"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
