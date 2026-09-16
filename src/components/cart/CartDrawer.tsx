import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
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

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

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

  const handleProceedCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
          className="w-screen max-w-md bg-white dark:bg-[#0F172A] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between"
        >
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  {t.cart.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {items.length} ta xil kitob tanlandi
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  {t.cart.emptyTitle}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs leading-relaxed">
                  {t.cart.emptySubtitle}
                </p>
                <Link
                  to="/books"
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition shadow-md"
                >
                  {t.cart.discoverBooks}
                </Link>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.bookId}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#1b202c] border border-slate-100 dark:border-slate-800/60"
                >
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-16 h-22 object-cover rounded-lg shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/books/${item.bookId}`}
                          onClick={closeCart}
                          className="font-serif font-semibold text-xs text-slate-900 dark:text-white hover:text-amber-500 transition line-clamp-1"
                        >
                          {item.book.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.bookId)}
                          className="text-slate-400 hover:text-rose-500 transition p-1"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.book.author}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50 dark:border-slate-750">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#121620]">
              {/* Promo code */}
              <div className="mb-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        (-${discountAmount.toFixed(2)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-rose-500 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        placeholder="Kupon kodi (masalan: SAVE20)"
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-amber-600 dark:hover:bg-amber-400 transition"
                    >
                      {t.cart.apply}
                    </button>
                  </form>
                )}
              </div>

              {/* Summary table */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>{t.cart.discount}</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t.cart.deliveryFee}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">Bepul</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.cart.tax}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                  <span>{t.cart.total}</span>
                  <span className="text-base text-amber-600 dark:text-amber-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-sm shadow-lg hover:from-amber-600 hover:to-rose-600 transition flex items-center justify-center gap-2 group"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
