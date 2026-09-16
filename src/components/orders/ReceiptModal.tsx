import React from 'react';
import { X, Printer, Download, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order } from '../../types/order';
import { useLanguage } from '../../context/LanguageContext';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const { t } = useLanguage();

  useBodyScrollLock(!!order);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Action controls (no print) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rasmiy xarid hujjati
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-amber-600 dark:hover:bg-amber-500 font-semibold text-xs flex items-center gap-2 transition shadow-sm border border-transparent dark:border-slate-700/60"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop etish / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Canvas */}
        <div id="printable-receipt" className="space-y-6 text-slate-900 dark:text-slate-100">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-750 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                  Kitob<span className="text-amber-500">Shop</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Premium Online Bookstore • kitobshop.uz
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>To'langan</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Sana: <span className="font-medium text-slate-700 dark:text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Buyurtma #{order.id}
              </p>
            </div>
          </div>

          {/* Customer & Shipping info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-[#121620] p-4 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider text-[10px] text-slate-500">
                Xaridor:
              </h4>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{order.customerName}</p>
              <p className="text-slate-500 dark:text-slate-400">{order.customerEmail}</p>
              <p className="text-slate-500 dark:text-slate-400">{order.customerPhone}</p>
            </div>

            <div className="bg-slate-50 dark:bg-[#121620] p-4 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider text-[10px] text-slate-500">
                Yetkazish manzili:
              </h4>
              <p className="text-slate-700 dark:text-slate-300">
                {order.deliveryAddress.country}, {order.deliveryAddress.city}
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                {order.deliveryAddress.street}, {order.deliveryAddress.house} {order.deliveryAddress.apartment || ''}
              </p>
              <p className="text-slate-500 dark:text-slate-400">Pochta: {order.deliveryAddress.postalCode}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5">Kitob</th>
                  <th className="py-2.5 text-center">Miqdor</th>
                  <th className="py-2.5 text-right">Narx</th>
                  <th className="py-2.5 text-right">Jami</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {order.items.map((item, i) => (
                  <tr key={i} className="py-2">
                    <td className="py-3 font-serif font-medium text-slate-900 dark:text-white max-w-[240px]">
                      {item.book.title}
                      <span className="block text-[11px] font-sans text-slate-400 font-normal">
                        {item.book.author}
                      </span>
                    </td>
                    <td className="py-3 text-center text-slate-600 dark:text-slate-300">
                      {item.quantity} dona
                    </td>
                    <td className="py-3 text-right text-slate-600 dark:text-slate-300 font-mono">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 text-right font-semibold text-slate-900 dark:text-white font-mono">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Oraliq summa:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Chegirma ({order.couponCode || 'Promo'}):</span>
                  <span className="font-semibold font-mono">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Yetkazib berish:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">
                  {order.deliveryFee === 0 ? 'Bepul' : `$${order.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Soliq:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">${order.tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Jami To'landi:</span>
                <span className="text-base text-amber-600 dark:text-amber-400 font-mono">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            <p>Xaridingiz uchun tashakkur! Har qanday savollar bo'yicha info@kitobshop.uz ga murojaat qiling.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
