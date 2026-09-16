import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Heart, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Globe, 
  Bell, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  Check, 
  LogOut, 
  Award,
  ChevronDown,
  LogIn
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotifications } from '../../context/NotificationContext';
import { Language } from '../../i18n/translations';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();
  const { user, isAuthenticated, isAdmin, logout, switchRole } = useAuth();
  const { totalItemsCount, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useBodyScrollLock(isMobileMenuOpen);

  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsLangOpen(false);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'UZ', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <>
      {/* Top Scroll Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F59E0B] via-amber-400 to-[#d97706] origin-left z-50 shadow-sm"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0F172A]/95 glass-nav shadow-md border-b border-slate-200/80 dark:border-slate-800/80 py-3'
            : 'bg-white/85 dark:bg-[#0F172A]/85 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F59E0B] via-amber-400 to-[#d97706] p-0.5 shadow-md group-hover:scale-105 transition transform">
                <div className="w-full h-full bg-white dark:bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#F59E0B]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition">
                  Kitob<span className="text-[#F59E0B]">Shop</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                  Premium Bookstore
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link
                to="/"
                className={`text-sm font-medium transition hover:text-amber-600 dark:hover:text-amber-400 ${
                  location.pathname === '/'
                    ? 'text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/books"
                className={`text-sm font-medium transition hover:text-amber-600 dark:hover:text-amber-400 ${
                  location.pathname === '/books'
                    ? 'text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {t.nav.books}
              </Link>
              <Link
                to="/books?category=Bestsellers"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {t.nav.bestsellers}
              </Link>
              <Link
                to="/books?sort=newest"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
              >
                {t.nav.newReleases}
              </Link>
            </nav>

            {/* Search, Utilities & Actions */}
            <div className="flex items-center gap-1 sm:gap-2.5">
              {/* Quick Search Trigger */}
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                title="Qidiruv"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center gap-1"
                  title="Tilni o'zgartirish"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase">{language}</span>
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 origin-top-right"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLanguage(l.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-amber-50 dark:hover:bg-slate-800 transition ${
                            language === l.code
                              ? 'text-amber-600 dark:text-amber-400 font-semibold'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{l.flag}</span>
                            <span>{l.label}</span>
                          </span>
                          {language === l.code && <Check className="w-3.5 h-3.5 text-amber-500" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition active:rotate-180"
                title="Mavzuni almashtirish"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications Center */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition relative"
                  title="Xabarlar"
                >
                  <Bell className="w-5 h-5" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        key="unread-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <AnimatePresence>
                  {isNotifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 origin-top-right"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-amber-500" />
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Bildirishnomalar</h4>
                          {unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 rounded-full font-bold">
                              {unreadCount} yangi
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            O'qilgan deb belgilash
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-500 py-6 text-center">Bildirishnomalar mavjud emas</p>
                        ) : (
                          notifications.map(n => (
                            <div
                              key={n.id}
                              onClick={() => markAsRead(n.id)}
                              className={`py-3 px-2 rounded-lg cursor-pointer transition ${
                                n.isRead
                                  ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                  : 'bg-amber-50/60 dark:bg-amber-950/20'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="font-semibold text-xs text-slate-900 dark:text-white">{n.title}</h5>
                                <span className="text-[10px] text-slate-400 flex-shrink-0">
                                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <Link
                          to="/orders"
                          className="block text-center text-xs font-semibold text-amber-600 dark:text-amber-400 pt-2 hover:underline"
                        >
                          Barcha buyurtmalarni ko'rish →
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Link - shown on sm+ screens (on mobile it is in the bottom bar) */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition relative cursor-pointer"
                title="Saralanganlar"
              >
                <Heart className="w-5 h-5" />
                <AnimatePresence>
                  {wishlist.length > 0 && (
                    <motion.span
                      key="wishlist-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 transition transform relative shadow-md active:scale-95 cursor-pointer"
                title="Savatcha"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItemsCount > 0 && (
                    <motion.span
                      key={`cart-${totalItemsCount}`}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59E0B] text-slate-950 text-xs font-extrabold rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-[#0F172A]"
                    >
                      {totalItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* User Profile / Admin Menu / Login Button */}
              <div className="relative">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block mr-1" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#F59E0B] hover:bg-amber-600 text-[#0F172A] font-bold text-xs sm:text-sm transition shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#0F172A]" />
                    <span>{t.nav.login}</span>
                  </Link>
                )}

                <AnimatePresence>
                  {isProfileOpen && user && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 origin-top-right"
                    >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {user.role === 'admin' ? 'Administrator' : 'Xaridor'}
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      {t.nav.profile}
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 transition"
                    >
                      <ShoppingBag className="w-4 h-4 text-slate-400" />
                      Mening Buyurtmalarim
                    </Link>

                    {/* Admin Dashboard link */}
                    <Link
                      to="/admin"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 transition"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      {t.nav.admin}
                    </Link>

                    {/* Switch role toggle button for testing */}
                    <button
                      onClick={switchRole}
                      className="w-full text-left flex items-center justify-between px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-t border-slate-100 dark:border-slate-800"
                    >
                      <span>Rolni almashtirish:</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {user.role === 'admin' ? 'Customer ga' : 'Admin ga'}
                      </span>
                    </button>

                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition border-t border-slate-100 dark:border-slate-800 mt-1"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      {t.nav.logout}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition active:scale-95"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Quick Search Slide-down */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t.nav.searchPlaceholder}
                  className="w-full pl-12 pr-28 py-3 rounded-xl bg-slate-100 dark:bg-[#1E293B] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition"
                >
                  Qidirish
                </button>
              </form>
              <div className="flex items-center gap-2 mt-2 px-1 text-xs text-slate-500">
                <span>Ommabop qidiruvlar:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('Atomic Habits');
                    navigate('/books?search=Atomic Habits');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-amber-500 underline"
                >
                  Atomic Habits
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('Abdulla Qodiriy');
                    navigate('/books?search=Abdulla Qodiriy');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-amber-500 underline"
                >
                  Abdulla Qodiriy
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('Psychology');
                    navigate('/books?search=Psychology');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-amber-500 underline"
                >
                  Psychology
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden lg:hidden bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-700 px-6 py-4 mt-3 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {/* Mobile Auth / Login banner */}
              {isAuthenticated && user ? (
                <div className="pb-3 border-b border-slate-200 dark:border-slate-700/80">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0F172A]/80 border border-slate-200/80 dark:border-slate-700">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-amber-500/50 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition ml-2 flex-shrink-0 cursor-pointer"
                      title={t.nav.logout}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-amber-500 transition cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t.nav.profile}</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 transition cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{t.nav.admin}</span>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pb-3 border-b border-slate-200 dark:border-slate-700/80">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#F59E0B] hover:bg-amber-600 text-[#0F172A] font-bold text-sm shadow-md transition cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-[#0F172A]" />
                    <span>{t.nav.login} / Ro'yxatdan o'tish</span>
                  </Link>
                </div>
              )}

              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-amber-500 cursor-pointer"
              >
                {t.nav.home}
              </Link>
              <Link
                to="/books"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-amber-500 cursor-pointer"
              >
                {t.nav.books}
              </Link>
              <Link
                to="/books?category=Bestsellers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-amber-500 cursor-pointer"
              >
                {t.nav.bestsellers}
              </Link>
              <Link
                to="/books?sort=newest"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-amber-500 cursor-pointer"
              >
                {t.nav.newReleases}
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-amber-500 cursor-pointer"
              >
                Buyurtmalarim
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                >
                  {t.nav.admin}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>

      {/* Mobile Bottom Navigation Bar (Requirement #4, #39) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 glass-nav border-t border-slate-200 dark:border-slate-800 px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-2xl transition-colors">
        <div className="flex items-center justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
              location.pathname === '/' ? 'text-[#F59E0B] font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Asosiy</span>
          </Link>
          <Link
            to="/books"
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
              location.pathname === '/books' ? 'text-[#F59E0B] font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Katalog</span>
          </Link>
          <Link
            to="/wishlist"
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition relative cursor-pointer ${
              location.pathname === '/wishlist' ? 'text-[#F59E0B] font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            <span>Sevimlilar</span>
          </Link>
          <button
            onClick={openCart}
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 relative transition hover:text-[#F59E0B] cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 right-0 w-4 h-4 bg-[#F59E0B] text-[#0F172A] text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
            <span>Savat</span>
          </button>
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
              location.pathname.startsWith('/profile') || location.pathname.startsWith('/login') ? 'text-[#F59E0B] font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isAuthenticated ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            <span>{isAuthenticated ? 'Profil' : 'Kirish'}</span>
          </Link>
        </div>
      </div>
    </>
  );
};
