import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, Menu, Compass, Heart, LayoutDashboard, TrendingUp, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../components/Logo';

export function UserLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pageTitles: Record<string, string> = { '/user': 'Dashboard' };

  const getTitle = () => {
    if (location.pathname.startsWith('/user/meetup')) return 'Event Details';
    return pageTitles['/user'] || 'Dashboard';
  };

  return (
    <div className="min-h-screen flex bg-[#f8f4ef] dark:bg-[#0E1020]">

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="sidebar-bg flex flex-col fixed inset-y-0 left-0 z-40 overflow-hidden shadow-xl"
        style={{ minWidth: collapsed ? 72 : 256 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-orange-100 dark:border-[#252840]">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 min-w-0"
              >
                <Link to="/user" className="flex items-center gap-2 min-w-0">
                  <Logo />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <Link to="/user" className="flex items-center justify-center mx-auto">
              <Logo iconOnly />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400 flex-shrink-0 ${collapsed ? 'mx-auto mt-3' : ''}`}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Card */}
        {!collapsed && user && (
          <div className="mx-3 mt-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-[#1e1a30] dark:to-[#1a1e30] border border-orange-100 dark:border-[#252840]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full saffron-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.profession}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 px-3 mb-3">Menu</p>
          )}

          <Link
            to="/user"
            title={collapsed ? 'Dashboard' : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${
              location.pathname === '/user'
                ? 'nav-active font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-[#252840] hover:text-orange-500'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Dashboard</span>}
            {collapsed && (
              <span className="absolute left-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Dashboard
              </span>
            )}
          </Link>

          <Link
            to="/user"
            title={collapsed ? 'Discover Events' : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-[#252840] hover:text-orange-500 ${collapsed ? 'justify-center' : ''}`}
          >
            <Compass className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Discover Events</span>}
            {collapsed && (
              <span className="absolute left-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Discover Events
              </span>
            )}
          </Link>

          <Link
            to="/user"
            title={collapsed ? 'My Events' : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-[#252840] hover:text-orange-500 ${collapsed ? 'justify-center' : ''}`}
          >
            <Heart className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">My Events</span>}
            {collapsed && (
              <span className="absolute left-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                My Events
              </span>
            )}
          </Link>

          {!collapsed && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 px-3 mt-5 mb-3">Quick Access</p>
          )}

          <div className={`px-3 py-2 rounded-xl ${collapsed ? 'text-center' : ''}`}>
            {!collapsed && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🌆 Top Cities</p>
                {['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Pune'].map((city) => (
                  <button
                    key={city}
                    className="w-full text-left text-xs text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors py-0.5 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0"></span>
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-orange-100 dark:border-[#252840] p-3 space-y-2">
          <button
            onClick={toggleTheme}
            title={collapsed ? (theme === 'light' ? 'Dark Mode' : 'Light Mode') : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-[#252840] hover:text-orange-500 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 flex-shrink-0" /> : <Sun className="w-4 h-4 flex-shrink-0" />}
            {!collapsed && <span className="text-xs font-medium">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
          </button>
          <button
            onClick={handleLogout}
            title={collapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-xs font-semibold">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* ── Main Content ── */}
      <motion.div
        animate={{ marginLeft: collapsed ? 72 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-h-screen"
      >
        {/* Top Bar */}
        <header className="bg-white dark:bg-[#161828] border-b border-orange-100 dark:border-[#252840] h-16 flex items-center px-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between w-full gap-4">
            {/* Hamburger - always visible */}
            <div className="flex items-center gap-3">
              <button
                id="user-sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400 flex-shrink-0"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold text-gray-900 dark:text-white">{getTitle()}</h1>
                <p className="text-xs text-gray-400">MeetUp India</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events in Mumbai, Bengaluru, Delhi..."
                  className="w-full pl-4 pr-4 py-2 text-sm rounded-xl bg-orange-50 dark:bg-[#252840] border border-orange-100 dark:border-[#353850] text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-700"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              {user && (
                <div className="w-8 h-8 rounded-full saffron-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
}
