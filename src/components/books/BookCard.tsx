import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Book } from '../../types/book';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

interface BookCardProps {
  book: Book;
  onQuickView?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, items } = useCart();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const inWishlist = isInWishlist(book.id);
  const inCart = items.some(item => item.bookId === book.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book);
    if (!inWishlist) {
      showToast(`"${book.title}" saralanganlarga qo'shildi`, 'success');
    } else {
      showToast(`"${book.title}" saralanganlardan olib tashlandi`, 'info');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (book.stock <= 0) {
      showToast('Kechirasiz, kitob sotuvda qolmagan', 'warning');
      return;
    }
    addToCart(book, 1);
    setIsAddedAnim(true);
    showToast(`"${book.title}" savatchaga qo'shildi!`, 'success');
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(book);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-[#161a23] rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
    >
      {/* Top Cover Image Container */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3.5 shadow-inner">
        <Link to={`/books/${book.id}`}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {book.discount && book.discount > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm">
              -{book.discount}%
            </span>
          ) : null}
          {book.isBestseller && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
          {book.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider shadow-sm">
              Yangi
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-20 ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-md scale-110'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:text-rose-500 hover:scale-105'
          }`}
          title={inWishlist ? "Saralanganlardan o'chirish" : "Saralanganlarga qo'shish"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickViewClick}
            className="px-3.5 py-2 rounded-xl bg-white/95 text-slate-900 font-semibold text-xs shadow-lg hover:bg-white flex items-center gap-1.5 transform hover:scale-105 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.bookCard.quickView}</span>
          </button>
        </div>

        {/* Out of stock tag */}
        {book.stock <= 0 && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg border border-slate-700">
              {t.bookCard.outOfStock}
            </span>
          </div>
        )}
      </div>

      {/* Book Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-amber-600 dark:text-amber-400">
              {book.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">{book.rating}</span>
              <span className="text-slate-400">({book.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/books/${book.id}`}>
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-[15px] sm:text-base line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition leading-snug tracking-tight">
              {book.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium truncate">
            {book.author}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                ${book.price.toFixed(2)}
              </span>
              {book.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${book.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={book.stock <= 0}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isAddedAnim
                ? 'bg-emerald-500 text-white scale-95'
                : inCart
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200'
                : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-slate-950'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={inCart ? t.bookCard.inCart : t.bookCard.addToCart}
          >
            {isAddedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Qo'shildi</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {inCart ? t.bookCard.inCart : t.bookCard.addToCart}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
