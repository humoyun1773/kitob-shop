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
import { useBooks } from '../../context/BookContext';
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

  const { books } = useBooks();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useBodyScrollLock(isMobileMenuOpen || isSearchOpen);

  const searchResults = searchQuery.trim()
    ? books.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.isbn.includes(searchQuery)
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => {
          if (!prev) {
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }
          return !prev;
        });
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
            ? 'bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-slate-200/80 dark:border-slate-800/80 py-2.5'
            : 'bg-white/75 dark:bg-[#0F172A]/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/40 py-3.5'
        }`}
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F59E0B] via-amber-400 to-[#d97706] p-0.5 shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-white dark:bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#F59E0B]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition-colors">
                  Kitob<span className="text-[#F59E0B]">Shop</span>
                </span>
                <span className="hidden sm:block text-[9px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500">
                  Premium Bookstore
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Floating Glass Pill) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/70 dark:border-slate-800/70 backdrop-blur-md shadow-inner">
              <Link
                to="/"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  location.pathname === '/'
                    ? 'bg-white dark:bg-[#0F172A] text-[#F59E0B] shadow-sm border border-slate-200/80 dark:border-amber-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/books"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  location.pathname === '/books' && !location.search.includes('Bestsellers') && !location.search.includes('newest')
                    ? 'bg-white dark:bg-[#0F172A] text-[#F59E0B] shadow-sm border border-slate-200/80 dark:border-amber-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {t.nav.books}
              </Link>
              <Link
                to="/books?category=Bestsellers"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  location.search.includes('Bestsellers')
                    ? 'bg-white dark:bg-[#0F172A] text-[#F59E0B] shadow-sm border border-slate-200/80 dark:border-amber-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{t.nav.bestsellers}</span>
              </Link>
              <Link
                to="/books?sort=newest"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  location.search.includes('newest')
                    ? 'bg-white dark:bg-[#0F172A] text-[#F59E0B] shadow-sm border border-slate-200/80 dark:border-amber-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {t.nav.newReleases}
              </Link>
            </nav>

            {/* Search, Utilities & Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Quick Search Trigger Pill on md+, Icon button on mobile */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 80);
                }}
                className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/70 text-slate-500 dark:text-slate-400 transition-all text-xs cursor-pointer shadow-inner group hover:border-[#F59E0B]/50"
                title="Qidirish (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">Kitob qidirish...</span>
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-400 rounded-md border border-slate-300 dark:border-slate-700 shadow-xs">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 80);
                }}
                className="flex md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                title="Qidiruv"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="px-2.5 py-1.5 rounded-full bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Tilni o'zgartirish"
                >
                  <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{language}</span>
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-36 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 py-1.5 z-50 origin-top-right overflow-hidden"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLanguage(l.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-amber-500/10 dark:hover:bg-slate-800/80 transition cursor-pointer ${
                            language === l.code
                              ? 'text-[#F59E0B] font-bold bg-amber-500/5'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm">{l.flag}</span>
                            <span>{l.label}</span>
                          </span>
                          {language === l.code && <Check className="w-3.5 h-3.5 text-[#F59E0B]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2 rounded-full bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 transition-transform active:rotate-180 cursor-pointer shadow-xs"
                title="Mavzuni almashtirish"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Notifications Center */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 rounded-full bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 transition relative cursor-pointer shadow-xs"
                  title="Xabarlar"
                >
                  <Bell className="w-4 h-4" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        key="unread-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F59E0B] text-[#0F172A] text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border-2 border-white dark:border-[#0F172A]"
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
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 z-50 origin-top-right"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#F59E0B]" />
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Bildirishnomalar</h4>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-600 dark:text-[#F59E0B] rounded-full font-bold">
                              {unreadCount} yangi
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-[#F59E0B] hover:underline cursor-pointer font-medium"
                          >
                            O'qilgan deb belgilash
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto my-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-500 py-6 text-center">Bildirishnomalar mavjud emas</p>
                        ) : (
                          notifications.map(n => (
                            <div
                              key={n.id}
                              onClick={() => markAsRead(n.id)}
                              className={`py-3 px-2 rounded-xl cursor-pointer transition ${
                                n.isRead
                                  ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                  : 'bg-amber-500/10'
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
                          className="block text-center text-xs font-semibold text-[#F59E0B] pt-2 hover:underline cursor-pointer"
                        >
                          Barcha buyurtmalarni ko'rish →
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Link - shown on sm+ screens */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2 rounded-full bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 transition relative cursor-pointer shadow-xs"
                title="Saralanganlar"
              >
                <Heart className="w-4 h-4" />
                <AnimatePresence>
                  {wishlist.length > 0 && (
                    <motion.span
                      key="wishlist-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#0F172A]"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all transform active:scale-95 shadow-md shadow-slate-900/10 dark:shadow-black/40 cursor-pointer group"
                title="Savatcha"
              >
                <ShoppingBag className="w-4 h-4 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-xs font-bold tracking-tight">Savat</span>
                <AnimatePresence>
                  {totalItemsCount > 0 && (
                    <motion.span
                      key={`cart-${totalItemsCount}`}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="w-5 h-5 bg-[#F59E0B] text-[#0F172A] text-[11px] font-black rounded-full flex items-center justify-center shadow-sm"
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
                    className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-full bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/70 transition cursor-pointer shadow-xs"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-[#F59E0B]"
                    />
                    <span className="hidden md:inline text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[80px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0F172A] font-bold text-xs sm:text-sm transition shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
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
                      className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 py-2 z-50 origin-top-right overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-[#F59E0B]">
                          {user.role === 'admin' ? 'Administrator' : 'Xaridor'}
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 transition cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        {t.nav.profile}
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 transition cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                        Mening Buyurtmalarim
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#F59E0B] hover:bg-amber-500/10 transition cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                          {t.nav.admin}
                        </Link>
                      )}

                      <button
                        onClick={switchRole}
                        className="w-full text-left flex items-center justify-between px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 border-t border-slate-100 dark:border-slate-800 cursor-pointer"
                      >
                        <span>Rolni almashtirish:</span>
                        <span className="font-semibold text-[#F59E0B]">
                          {user.role === 'admin' ? 'Customer ga' : 'Admin ga'}
                        </span>
                      </button>

                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition border-t border-slate-100 dark:border-slate-800 mt-1 cursor-pointer"
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
                className="p-2 rounded-full lg:hidden bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 transition active:scale-95 cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden lg:hidden bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-5 mt-3 shadow-2xl rounded-b-3xl"
            >
              <div className="flex flex-col gap-2.5">
                {/* Mobile Auth / Login banner */}
                {isAuthenticated && user ? (
                  <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-[#1E293B]/80 border border-slate-200/80 dark:border-slate-700/70">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F59E0B] flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition ml-2 flex-shrink-0 cursor-pointer"
                        title={t.nav.logout}
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2.5">
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#F59E0B] transition cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{t.nav.profile}</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-amber-500/10 text-[#F59E0B] transition cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t.nav.admin}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-amber-500 text-[#0F172A] font-bold text-sm shadow-md shadow-amber-500/20 transition cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-[#0F172A]" />
                      <span>{t.nav.login} / Ro'yxatdan o'tish</span>
                    </Link>
                  </div>
                )}

                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    location.pathname === '/'
                      ? 'bg-amber-500/15 text-[#F59E0B]'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#F59E0B]" />
                  <span>{t.nav.home}</span>
                </Link>
                <Link
                  to="/books"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    location.pathname === '/books' && !location.search.includes('Bestsellers') && !location.search.includes('newest')
                      ? 'bg-amber-500/15 text-[#F59E0B]'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Search className="w-4 h-4 text-[#F59E0B]" />
                  <span>{t.nav.books}</span>
                </Link>
                <Link
                  to="/books?category=Bestsellers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    location.search.includes('Bestsellers')
                      ? 'bg-amber-500/15 text-[#F59E0B]'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  <span>{t.nav.bestsellers}</span>
                </Link>
                <Link
                  to="/books?sort=newest"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    location.search.includes('newest')
                      ? 'bg-amber-500/15 text-[#F59E0B]'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#F59E0B]" />
                  <span>{t.nav.newReleases}</span>
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    location.pathname === '/orders'
                      ? 'bg-amber-500/15 text-[#F59E0B]'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
                  <span>Buyurtmalarim</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#F59E0B] bg-amber-500/10 hover:bg-amber-500/20 transition cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                    <span>{t.nav.admin}</span>
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

      {/* Spotlight Search Modal (Command-K style overlay, doesn't deform header or push content) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden z-10 flex flex-col max-h-[82vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Search Form Header */}
              <form onSubmit={handleSearchSubmit} className="relative border-b border-slate-200/80 dark:border-slate-700/80 flex items-center p-3.5 sm:p-4 gap-3 bg-slate-50/50 dark:bg-[#0F172A]/50">
                <Search className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Kitob nomi, muallif yoki janr bo'yicha qidiring..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                    title="Tozalash"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md border border-slate-300 dark:border-slate-700">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  title="Yopish"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Live Results or Suggestions Area */}
              <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
                {searchQuery.trim() ? (
                  searchResults.length > 0 ? (
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        <span>Topilgan kitoblar ({searchResults.length})</span>
                        <span className="text-[11px] normal-case text-[#F59E0B]">Tanlash uchun bosing</span>
                      </div>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {searchResults.map(book => (
                          <Link
                            key={book.id}
                            to={`/books/${book.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition group cursor-pointer"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-10 h-14 object-cover rounded-lg shadow-sm flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition truncate">
                                  {book.title}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                  {book.author}
                                </p>
                                <span className="inline-block px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                  {book.category}
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                                ${book.price.toFixed(2)}
                              </span>
                              <div className="text-[11px] text-amber-500 font-semibold flex items-center justify-end gap-0.5 mt-0.5">
                                ★ {book.rating}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full mt-3 py-2.5 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-center text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer"
                      >
                        Barcha natijalarni katalogda ko'rish →
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">"{searchQuery}" bo'yicha hech narsa topilmadi</p>
                      <p className="text-xs mt-1">Imlo xatolarini tekshiring yoki boshqa so'z bilan qidirib ko'ring</p>
                    </div>
                  )
                ) : (
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Ommabop qidiruvlar:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Atomic Habits',
                        'The Psychology of Money',
                        'Abdulla Qodiriy',
                        'Badiiy Adabiyot',
                        'Biznes & Moliya',
                        'Shaxsiy Rivojlanish'
                      ].map(item => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item);
                            navigate(`/books?search=${encodeURIComponent(item)}`);
                            setIsSearchOpen(false);
                          }}
                          className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#F59E0B] hover:text-[#0F172A] dark:hover:bg-[#F59E0B] dark:hover:text-[#0F172A] transition cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
