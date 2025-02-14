import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Calculator, Info, FileText, PenTool as Tool, User } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useThemeStore } from '../store/themeStore';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout, settings } = useAdminStore();
  const { theme } = useThemeStore();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Calculator', icon: Calculator },
    { path: '/about', label: 'About', icon: Info },
    { path: '/factors', label: 'Factors', icon: FileText },
    { path: '/tools', label: 'Tools', icon: Tool },
    { path: '/resources', label: 'Resources', icon: Building2 },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 ${
        theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'
      } backdrop-blur-lg shadow-lg z-50`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
            ) : (
              <Building2 className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            )}
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {settings.siteName}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence mode="wait">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/admin')
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className={`px-4 py-2 ${
                    theme === 'dark'
                      ? 'text-red-400 hover:bg-red-900/50'
                      : 'text-red-600 hover:bg-red-50'
                  } rounded-lg transition-colors`}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-1 px-4 py-2 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                } rounded-lg transition-colors`}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}