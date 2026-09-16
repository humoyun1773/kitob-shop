import React from 'react';
import { RotateCcw, Filter, Star, Check } from 'lucide-react';
import { BookCategory, BookFormat } from '../../types/book';
import { useLanguage } from '../../context/LanguageContext';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  language: string;
  format: string;
  inStockOnly: boolean;
  sortBy: string;
}

interface BookFilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  categories: BookCategory[];
}

export const BookFilterSidebar: React.FC<BookFilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  categories
}) => {
  const { t } = useLanguage();

  const handleCategoryChange = (cat: string) => {
    onChange({ ...filters, category: filters.category === cat ? '' : cat });
  };

  const formats: BookFormat[] = ['Paperback', 'Hardcover', 'E-book', 'Audiobook'];
  const languages = [
    { code: '', label: 'Barcha tillar' },
    { code: 'UZ', label: "O'zbekcha 🇺🇿" },
    { code: 'RU', label: 'Русский 🇷🇺' },
    { code: 'EN', label: 'English 🇺🇸' }
  ];

  return (
    <aside className="bg-white dark:bg-[#1E293B] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm dark:shadow-md space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
            {t.filter.title}
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-amber-500 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.filter.clearAll}</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          {t.filter.category}
        </h4>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => onChange({ ...filters, category: '' })}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
              filters.category === ''
                ? 'bg-amber-500 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{t.filter.allCategories}</span>
            {filters.category === '' && <Check className="w-3.5 h-3.5" />}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-amber-500 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.filter.priceRange}
          </h4>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            $0 — ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={filters.maxPrice}
          onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>$0</span>
          <span>$50</span>
          <span>$100+</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          {t.filter.rating}
        </h4>
        <div className="space-y-1.5">
          {[4.5, 4.0, 3.0].map(rating => (
            <button
              key={rating}
              onClick={() =>
                onChange({
                  ...filters,
                  minRating: filters.minRating === rating ? 0 : rating
                })
              }
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                filters.minRating === rating
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating}+ {t.filter.starsAndUp}</span>
              </div>
              {filters.minRating === rating && <Check className="w-3.5 h-3.5 text-amber-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Format Filter */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          {t.filter.format}
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {formats.map(fmt => (
            <button
              key={fmt}
              onClick={() =>
                onChange({ ...filters, format: filters.format === fmt ? '' : fmt })
              }
              className={`px-2.5 py-1.5 rounded-xl text-xs text-center border transition ${
                filters.format === fmt
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-semibold'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Language Filter */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          {t.filter.language}
        </h4>
        <select
          value={filters.language}
          onChange={e => onChange({ ...filters, language: e.target.value })}
          className="w-full py-2 px-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          {languages.map(l => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {t.filter.inStockOnly}
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
          />
        </label>
      </div>
    </aside>
  );
};
