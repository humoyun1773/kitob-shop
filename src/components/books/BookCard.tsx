import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 340, damping: 22 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative glass-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col justify-between overflow-hidden"
    >
      {/* Glossy top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 dark:from-white/[0.06] to-transparent rounded-t-2xl sm:rounded-t-3xl z-[1]" />

      {/* Liquid shimmer sweep on hover */}
      <div
        className={`pointer-events-none absolute inset-0 z-[2] transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl">
          <motion.div
            initial={{ x: '-120%' }}
            animate={isHovered ? { x: '220%' } : { x: '-120%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent -skew-x-12"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100/80 dark:bg-slate-800/60 mb-2 sm:mb-3.5">
        <Link to={`/books/${book.id}`}>
          <motion.img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover object-center"
            animate={{ scale: isHovered ? 1.07 : 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800';
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {book.discount && book.discount > 0 ? (
            <span className="glass-badge px-2.5 py-0.5 rounded-full text-[11px] font-bold text-rose-600 dark:text-rose-400">
              -{book.discount}%
            </span>
          ) : null}
          {book.isBestseller && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F59E0B] text-[#0F172A] uppercase tracking-wider shadow-lg shadow-amber-500/30">
              Bestseller
            </span>
          )}
          {book.isNewArrival && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider shadow-sm">
              Yangi
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 1.4 }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full z-20 transition-colors duration-200 ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'glass bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-rose-500'
          }`}
          title={inWishlist ? "Saralanganlardan o'chirish" : "Saralanganlarga qo'shish"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </motion.button>

        {/* Quick View Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-[3px] flex items-center justify-center z-10"
            >
              <motion.button
                initial={{ scale: 0.82, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.82, y: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                onClick={handleQuickViewClick}
                className="glass-pill px-4 py-2 rounded-full text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.bookCard.quickView}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Out of stock */}
        {book.stock <= 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="glass-pill px-3 py-1 text-slate-200 text-xs font-bold rounded-lg">
              {t.bookCard.outOfStock}
            </span>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="relative flex-1 flex flex-col justify-between z-[3]">
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
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-xs sm:text-[15px] line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition leading-snug tracking-tight">
              {book.title}
            </h3>
          </Link>

          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 font-medium truncate">
            {book.author}
          </p>
        </div>

        {/* Price & Cart Button */}
        <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-3 border-t border-white/40 dark:border-white/[0.07] flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
              ${book.price.toFixed(2)}
            </span>
            {book.oldPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                ${book.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            onClick={handleAddToCart}
            disabled={book.stock <= 0}
            className={`relative overflow-hidden p-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAddedAnim
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : inCart
                ? 'bg-[#F59E0B]/15 text-amber-800 dark:bg-[#F59E0B]/20 dark:text-[#F59E0B] border border-amber-400/30'
                : 'bg-[#F59E0B] text-[#0F172A] hover:bg-amber-400 font-bold shadow-md shadow-[#F59E0B]/25 hover:shadow-lg hover:shadow-[#F59E0B]/35'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={inCart ? t.bookCard.inCart : t.bookCard.addToCart}
          >
            <AnimatePresence mode="wait">
              {isAddedAnim ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Qo'shildi</span>
                </motion.span>
              ) : (
                <motion.span
                  key="bag"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {inCart ? t.bookCard.inCart : t.bookCard.addToCart}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};


