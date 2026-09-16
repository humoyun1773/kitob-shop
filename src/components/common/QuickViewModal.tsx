import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

interface QuickViewModalProps {
  book: Book | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ book, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { t } = useLanguage();

  if (!book) return null;

  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    showToast(`${quantity}x "${book.title}" savatchaga qo'shildi!`, 'success');
    onClose();
  };

  const handleWishlist = () => {
    toggleWishlist(book);
    if (!inWishlist) {
      showToast(`"${book.title}" saralanganlarga qo'shildi`, 'success');
    } else {
      showToast(`"${book.title}" saralanganlardan olib tashlandi`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="relative w-full max-w-3xl bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-8">
            <img
              src={book.coverImage}
              alt={book.title}
              className="max-h-[380px] w-auto object-cover rounded-xl shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800';
              }}
            />
            {book.discount && book.discount > 0 ? (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md">
                -{book.discount}% Chegirma
              </span>
            ) : null}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                  {book.category}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {book.format}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight">
                {book.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Muallif: <span className="font-medium text-slate-700 dark:text-slate-300">{book.author}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{book.rating}</span>
                <span className="text-xs text-slate-400">({book.reviewsCount} ta sharh)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${book.price.toFixed(2)}
                </span>
                {book.oldPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ${book.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {book.description}
              </p>

              {/* Status */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                {book.stock > 0 ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Check className="w-4 h-4" />
                    Omborda mavjud ({book.stock} dona qoldi)
                  </span>
                ) : (
                  <span className="text-rose-500 font-semibold">Sotuvda tugagan</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={book.stock <= 0}
                  className="flex-1 py-3 px-5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 transition font-semibold text-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Savatga qo'shish</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-xl border transition ${
                    inWishlist
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Full details link */}
              <Link
                to={`/books/${book.id}`}
                onClick={onClose}
                className="text-center text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-center gap-1 mt-1"
              >
                <span>To'liq ma'lumotlar va barcha sharhlarni ko'rish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
