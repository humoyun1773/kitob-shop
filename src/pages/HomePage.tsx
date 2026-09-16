import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  Star, 
  Compass, 
  Flame, 
  HeartHandshake,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';
import { BookCard } from '../components/books/BookCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SEO } from '../components/common/SEO';
import { Book, BookCategory } from '../types/book';

export const HomePage: React.FC = () => {
  const { books } = useBooks();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedBookForQuickView, setSelectedBookForQuickView] = useState<Book | null>(null);

  // Group books for sections
  const featuredBooks = books.filter(b => b.isFeatured).slice(0, 4);
  const bestsellers = books.filter(b => b.isBestseller).slice(0, 4);
  const trendingBooks = books.filter(b => b.isTrending).slice(0, 4);
  const newArrivals = books.filter(b => b.isNewArrival || b.category === 'Classics').slice(0, 4);

  // Recommendation engine simulation based on Atomic Habits
  const recommendedBooks = books.filter(b => b.category === 'Self Development' || b.category === 'Business').slice(0, 4);

  const categories: { name: BookCategory; label: string; icon: string; count: number; bg: string }[] = [
    { name: 'Self Development', label: 'Shaxsiy Rivojlanish', icon: '🌱', count: 18, bg: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/50' },
    { name: 'Business', label: 'Biznes & Moliya', icon: '💼', count: 14, bg: 'from-blue-500/10 to-indigo-500/10 hover:border-blue-500/50' },
    { name: 'Fiction', label: 'Badiiy Adabiyot', icon: '📖', count: 32, bg: 'from-purple-500/10 to-pink-500/10 hover:border-purple-500/50' },
    { name: 'Classics', label: 'Klassik Meros', icon: '🏛️', count: 25, bg: 'from-amber-500/10 to-orange-500/10 hover:border-amber-500/50' },
    { name: 'History', label: 'Tarix & Madaniyat', icon: '📜', count: 19, bg: 'from-rose-500/10 to-red-500/10 hover:border-rose-500/50' },
    { name: 'Technology', label: 'Texnologiya & IT', icon: '💻', count: 12, bg: 'from-cyan-500/10 to-blue-500/10 hover:border-cyan-500/50' },
    { name: 'Children', label: 'Bolalar Adabiyoti', icon: '🎈', count: 15, bg: 'from-yellow-500/10 to-amber-500/10 hover:border-yellow-500/50' },
    { name: 'Thriller', label: 'Detektiv & Triller', icon: '🔍', count: 11, bg: 'from-slate-500/10 to-zinc-500/10 hover:border-slate-500/50' }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="KitobShop — Zamonaviy & Premium Online Kitob Do'koni"
        description="O'zbekistondagi eng yirik online kitob platformasi. Jahon bestsellerlari, badiiy, biznes va psixologiya kitoblari 24 soat ichida yetkazib berish bilan."
        keywords="kitoblar, online kitob do'koni, kitob xarid qilish, bestseller kitoblar, toshkent yetkazib berish"
      />

      {/* 2. CINEMATIC HERO SECTION (Requirement #2, #41) */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-gradient-to-b from-[#0F172A] via-[#1E293B]/40 to-[#0F172A]">
        {/* Subtle background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#F59E0B]/20 via-amber-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-amber-700 dark:text-[#F59E0B] text-xs font-semibold shadow-sm">
                <BookOpen className="w-4 h-4 text-[#F59E0B]" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {t.hero.title1}{' '}
                <span className="bg-gradient-to-r from-[#F59E0B] via-amber-400 to-[#d97706] bg-clip-text text-transparent italic">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/books"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#d97706] hover:from-[#d97706] hover:to-[#F59E0B] text-[#0F172A] font-bold text-sm shadow-xl shadow-[#F59E0B]/20 hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  to="/books?category=Classics"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1E293B] border border-slate-700/80 text-slate-100 font-semibold text-sm hover:bg-[#161F36] hover:border-[#F59E0B]/50 transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#F59E0B]" />
                  <span>{t.hero.browseCollection}</span>
                </Link>
              </div>

              {/* Badges / Stats */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <h4 className="font-sans font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">10,000+</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Kitoblar javonda</p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">50,000+</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Mamnun kitobxon</p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">24/7</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Tez yetkazib berish</p>
                </div>
              </div>
            </div>

            {/* Right: Floating 3D Book Visuals (Requirement #41) */}
            <div className="lg:col-span-5 relative flex justify-center items-center py-6">
              <div className="relative w-full max-w-sm sm:max-w-md h-[420px] flex items-center justify-center">
                {/* Decorative circle glow */}
                <div className="absolute w-72 h-72 rounded-full border border-amber-500/20 bg-amber-500/5 animate-pulse" />

                {/* Book 1 - Atomic Habits (Center floating) */}
                <div className="absolute z-20 transform transition duration-500 hover:scale-105 animate-float-slow -translate-y-4">
                  <div className="w-44 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 dark:border-slate-800/80 transform -rotate-3 hover:rotate-0 transition">
                    <img
                      src={books[0]?.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
                      alt="Atomic Habits"
                      className="w-full h-64 sm:h-72 object-cover"
                    />
                    <div className="p-3 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md">
                      <p className="font-serif font-bold text-xs text-slate-900 dark:text-white truncate">Atomic Habits</p>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">$14.99 • ⭐ 4.9</p>
                    </div>
                  </div>
                </div>

                {/* Book 2 - Psychology of Money (Floating Left) */}
                <div className="absolute -left-2 sm:left-2 z-10 transform -rotate-12 transition duration-500 hover:scale-105 animate-float-medium">
                  <div className="w-36 sm:w-40 rounded-2xl overflow-hidden shadow-xl border border-white/40 dark:border-slate-800">
                    <img
                      src={books[1]?.coverImage || 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80'}
                      alt="Psychology of Money"
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                  </div>
                </div>

                {/* Book 3 - O'tkan Kunlar (Floating Right) */}
                <div className="absolute -right-2 sm:right-2 z-10 transform rotate-12 transition duration-500 hover:scale-105 animate-float-fast">
                  <div className="w-36 sm:w-40 rounded-2xl overflow-hidden shadow-xl border border-white/40 dark:border-slate-800">
                    <img
                      src={books[2]?.coverImage || 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80'}
                      alt="O'tkan Kunlar"
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CATEGORIES SECTION (Requirement #6) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
              {t.sections.categoriesSubtitle}
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              {t.sections.categories}
            </h2>
          </div>
          <Link
            to="/books"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Barchasini ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map(c => (
            <button
              key={c.name}
              onClick={() => navigate(`/books?category=${encodeURIComponent(c.name)}`)}
              className={`p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br ${c.bg} text-left transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between group`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition transform">{c.icon}</div>
              <div>
                <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition">
                  {c.label}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {c.count} ta asar
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED BOOKS SECTION */}
      <section className="py-16 bg-[#0F172A] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                {t.sections.featuredSubtitle}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                {t.sections.featured}
              </h2>
            </div>
            <Link
              to="/books?category=Bestsellers"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Katalogda ko'rish</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {featuredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={b => setSelectedBookForQuickView(b)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION (Requirement #6) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-rose-500">
              {t.sections.bestsellersSubtitle}
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <Award className="w-7 h-7 text-amber-500" />
              <span>{t.sections.bestsellers}</span>
            </h2>
          </div>
          <Link
            to="/books"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Barchasi</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {bestsellers.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onQuickView={b => setSelectedBookForQuickView(b)}
            />
          ))}
        </div>
      </section>

      {/* TRENDING BOOKS SECTION (Requirement #6) */}
      <section className="py-16 bg-gradient-to-r from-amber-500/5 via-transparent to-rose-500/5 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                {t.sections.trendingSubtitle}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <Flame className="w-7 h-7 text-rose-500" />
                <span>{t.sections.trending}</span>
              </h2>
            </div>
            <Link
              to="/books?sort=popular"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Ko'proq o'qish</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {trendingBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={b => setSelectedBookForQuickView(b)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 43. RECOMMENDATION ENGINE (Requirement #6, #43) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-purple-500/10 border border-amber-500/20 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>{t.sections.recommended}</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                {t.sections.becauseYouLiked} <span className="text-amber-600 dark:text-amber-400 italic font-semibold">“Atomic Habits”</span>
              </h3>
            </div>
            <Link
              to="/books"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm self-start sm:self-auto"
            >
              Tavsiyalar katalogi
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {recommendedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={b => setSelectedBookForQuickView(b)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        book={selectedBookForQuickView}
        onClose={() => setSelectedBookForQuickView(null)}
      />
    </div>
  );
};
