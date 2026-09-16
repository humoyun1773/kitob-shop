import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, BookOpen, ArrowUpDown, X } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useLanguage } from '../context/LanguageContext';
import { BookCard } from '../components/books/BookCard';
import { BookFilterSidebar, FilterState } from '../components/books/BookFilterSidebar';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SEO } from '../components/common/SEO';
import { Book, BookCategory } from '../types/book';

export const BooksPage: React.FC = () => {
  const { books } = useBooks();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedBookForQuickView, setSelectedBookForQuickView] = useState<Book | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const initialCategory = searchParams.get('category') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    language: '',
    format: '',
    inStockOnly: false,
    sortBy: initialSort
  });

  // Sync url param changes
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const cat = searchParams.get('category') || '';
    const s = searchParams.get('sort') || 'popular';
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, category: cat, sortBy: s }));
  }, [searchParams]);

  // Unique categories
  const allCategories: BookCategory[] = useMemo(() => {
    const set = new Set<BookCategory>();
    books.forEach(b => set.add(b.category));
    return Array.from(set);
  }, [books]);

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchCategory = book.category.toLowerCase().includes(q);
          const matchIsbn = book.isbn.toLowerCase().includes(q);
          const matchDesc = book.description.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchCategory && !matchIsbn && !matchDesc) {
            return false;
          }
        }

        // Category
        if (filters.category && book.category !== filters.category) {
          return false;
        }

        // Price
        if (book.price > filters.maxPrice || book.price < filters.minPrice) {
          return false;
        }

        // Rating
        if (filters.minRating > 0 && book.rating < filters.minRating) {
          return false;
        }

        // Language
        if (filters.language && book.language !== filters.language) {
          return false;
        }

        // Format
        if (filters.format && book.format !== filters.format) {
          return false;
        }

        // Stock
        if (filters.inStockOnly && book.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'popular':
          default:
            return b.reviewsCount - a.reviewsCount;
        }
      });
  }, [books, searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters({
      category: '',
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      language: '',
      format: '',
      inStockOnly: false,
      sortBy: 'popular'
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const pageTitle = filters.category 
    ? `${filters.category} Kitoblari | KitobShop Katalogi`
    : searchQuery 
    ? `"${searchQuery}" bo'yicha qidiruv natijalari | KitobShop` 
    : "Barcha Kitoblar Katalogi | KitobShop";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title={pageTitle}
        description="Barcha janrlardagi saralangan jahon va o'zbek adabiyoti durdonalari katalogi. Filtrlar, bestsellerlar va yangi nashrlar."
        keywords={`kitoblar katalogi, ${filters.category || 'barcha kitoblar'}, bestseller kitoblar narxlari`}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {t.nav.books}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Barcha janrlardagi saralangan kitoblar kolleksiyasi
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Qidiruv: Nomi, muallifi, janri, ISBN..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action bar (Sort & Mobile filter button) */}
        <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-xs">
          <div className="text-slate-500 font-medium">
            <span className="font-bold text-slate-900 dark:text-white">{filteredBooks.length}</span> {t.filter.resultsCount}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.filter.title}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filters.sortBy}
                onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
                className="py-1.5 px-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="popular">{t.filter.sortPopular}</option>
                <option value="newest">{t.filter.sortNewest}</option>
                <option value="price-asc">{t.filter.sortPriceAsc}</option>
                <option value="price-desc">{t.filter.sortPriceDesc}</option>
                <option value="rating">{t.filter.sortRating}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <BookFilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              categories={allCategories}
            />
          </div>

          {/* Books Grid / Empty state */}
          <div className="lg:col-span-3">
            {filteredBooks.length === 0 ? (
              <div className="py-20 text-center bg-white dark:bg-[#1E293B] rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 p-8">
                <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
                  Hech qanday kitob topilmadi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriyalarni tanlang.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
                {filteredBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onQuickView={b => setSelectedBookForQuickView(b)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {t.filter.title}
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <BookFilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              categories={allCategories}
            />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-4 py-3 bg-amber-500 text-white font-semibold text-xs rounded-xl shadow-md"
            >
              Natijalarni ko'rish ({filteredBooks.length})
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        book={selectedBookForQuickView}
        onClose={() => setSelectedBookForQuickView(null)}
      />
    </div>
  );
};
