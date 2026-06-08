import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Lightbulb, CalendarDays, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      className="bg-surface border-r border-white/5 hidden md:flex flex-col relative shrink-0"
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-primary text-white rounded-full p-1 z-10 hover:scale-110 transition-transform shadow-lg"
      >
        <ChevronRight size={16} className={`transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

      <div className="p-6 h-20 flex items-center overflow-hidden whitespace-nowrap">
        <h1 className="text-2xl font-display font-bold text-primary">
          {isCollapsed ? 'C' : 'Chronis'}
        </h1>
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

      <div className="p-4 border-t border-white/5 overflow-hidden whitespace-nowrap">
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
