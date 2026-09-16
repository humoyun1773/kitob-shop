import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const handleAddToCart = (book: any) => {
    addToCart(book, 1);
    showToast(`"${book.title}" savatchaga qo'shildi!`, 'success');
  };

  return (
    <div className="min-h-screen pt-28 pb-32 lg:pb-20 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/60 dark:border-slate-800/60 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Saqlangan asarlar
          </span>
          <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white mt-1">
            {t.nav.wishlist} ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-slate-500 hover:text-rose-500 transition self-start sm:self-auto"
          >
            Ro'yxatni tozalash
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 opacity-70" />
          </div>
          <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
            Saralangan kitoblar yo'q
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
            Sizga yoqqan kitoblarni yurakcha belgisini bosib bu yerga saqlab qo'yishingiz mumkin.
          </p>
          <Link
            to="/books"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition"
          >
            <span>Kitoblar katalogiga o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mt-8">
          {wishlist.map(book => (
            <div
              key={book.id}
              className="bg-white dark:bg-[#1E293B] rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <Link to={`/books/${book.id}`}>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(book.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-rose-500 hover:bg-white dark:hover:bg-slate-900 shadow-md transition"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link to={`/books/${book.id}`}>
                  <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-amber-500 transition">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{book.author}</p>
                <div className="mt-2 font-bold text-sm text-slate-900 dark:text-white">
                  ${book.price.toFixed(2)}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleAddToCart(book)}
                  disabled={book.stock <= 0}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Savatga qo'shish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
