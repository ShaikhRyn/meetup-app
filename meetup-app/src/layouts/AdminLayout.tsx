import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BarChart3, Clock, Moon, Sun, LogOut, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../components/Logo';

export function AdminLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/admin/create', icon: PlusCircle, label: 'Create Event', exact: false },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics', exact: false },
    { to: '/admin/history', icon: Clock, label: 'History', exact: false },
  ];

  const isActive = (link: typeof links[0]) =>
    link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to);

  const pageTitles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/create': 'Create New Event',
    '/admin/analytics': 'Analytics',
    '/admin/history': 'History',
  };

  const currentTitle = pageTitles[location.pathname] || 'Admin Portal';

  return (
    <div className="min-h-screen flex bg-[#f8f4ef] dark:bg-[#0E1020]">

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="sidebar-bg flex flex-col fixed inset-y-0 left-0 z-40 overflow-hidden shadow-xl"
        style={{ minWidth: collapsed ? 72 : 256 }}
      >
        {/* Logo + Toggle */}
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
                <Logo tagline="Admin" />
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="flex items-center justify-center mx-auto">
              <Logo iconOnly />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400 flex-shrink-0 ${collapsed ? 'mx-auto mt-3' : ''}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link);
            return (
              <Link
                key={link.to}
                to={link.to}
                title={collapsed ? link.label : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${
                  active
                    ? 'nav-active font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-[#252840] hover:text-orange-500'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#FF6B1A]' : ''}`} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm whitespace-nowrap overflow-hidden"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {/* Tooltip on collapse */}
                {collapsed && (
                  <span className="absolute left-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`border-t border-orange-100 dark:border-[#252840] p-3 space-y-2`}>
          {/* User info */}
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-orange-50 dark:bg-[#252840]">
              <div className="w-8 h-8 rounded-full saffron-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-orange-500 font-medium">Admin</p>
              </div>
            </div>
          )}

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
        <header className="bg-white dark:bg-[#161828] border-b border-orange-100 dark:border-[#252840] h-16 flex items-center px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {/* Always-visible hamburger */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                id="admin-sidebar-toggle"
                className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{currentTitle}</h1>
                <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">MeetUp India Admin Panel</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-[#252840]">
                <div className="w-2 h-2 rounded-full bg-green-500 pulse-saffron" style={{ animation: 'none', boxShadow: '0 0 0 0 rgba(34,197,94,0.4)' }}></div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{user?.name}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors text-gray-500 dark:text-gray-400"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
}
