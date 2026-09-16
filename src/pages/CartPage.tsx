import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 opacity-70" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
          {t.cart.emptyTitle}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {t.cart.emptySubtitle}
        </p>
        <Link
          to="/books"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold text-xs shadow-md"
        >
          <span>{t.cart.discoverBooks}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="pb-6 mb-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
          {t.cart.title} ({items.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {t.cart.freeDeliveryNotice}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
          {items.map(item => (
            <div key={item.bookId} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-16 h-22 object-cover rounded-xl shadow-sm flex-shrink-0"
                />
                <div>
                  <Link
                    to={`/books/${item.bookId}`}
                    className="font-serif font-semibold text-sm text-slate-900 dark:text-white hover:text-amber-500 transition line-clamp-1"
                  >
                    {item.book.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5">{item.book.author}</p>
                  <p className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                    ${item.price.toFixed(2)} dona
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1">
                  <button
                    onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-xs px-1 text-slate-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right font-mono font-bold text-sm text-slate-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.bookId)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            {t.checkout.orderSummary}
          </h3>

          {/* Promo code */}
          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{appliedCoupon.code}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    (-${discountAmount.toFixed(2)})
                  </span>
                </div>
                <button onClick={removeCoupon} className="text-slate-400 hover:text-rose-500">
                  O'chirish
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="Kupon kodi (SAVE20)"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold"
                >
                  {t.cart.apply}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between">
              <span>{t.cart.subtotal}</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>{t.cart.discount}</span>
                <span className="font-semibold font-mono">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t.cart.deliveryFee}</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">Bepul</span> : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t.cart.tax}</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>{t.cart.total}</span>
              <span className="text-lg text-amber-600 dark:text-amber-400 font-mono">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold text-xs shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <span>{t.cart.checkoutBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
