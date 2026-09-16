import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Truck, FileText, ArrowRight, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { ReceiptModal } from '../components/orders/ReceiptModal';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrders();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const order = getOrderById(id || '');

  useEffect(() => {
    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-white dark:bg-[#161a23] p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6 animate-in zoom-in-95 duration-500">
        
        {/* Animated Check */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12 animate-bounce" />
        </div>

        <div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            {t.orderConfirm.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            {t.orderConfirm.subtitle}
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#121620] border border-slate-200/60 dark:border-slate-800/60 max-w-md mx-auto space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">{t.orderConfirm.orderNumber}</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
              #{order?.id || id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kutilayotgan yetkazish:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {order?.estimatedDelivery || '2-3 ish kuni'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Jami to'langan summa:</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
              ${order?.total.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>

        {/* Action Buttons (Requirement #14) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-md mx-auto">
          <Link
            to={`/order/${order?.id || id}`}
            className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <Truck className="w-4 h-4" />
            <span>{t.orderConfirm.trackOrderBtn}</span>
          </Link>

          <button
            onClick={() => setIsReceiptOpen(true)}
            className="w-full py-3.5 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <FileText className="w-4 h-4" />
            <span>{t.orderConfirm.viewReceipt}</span>
          </button>
        </div>

        <div>
          <Link
            to="/books"
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
          >
            <span>{t.orderConfirm.continueShopping}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Receipt Modal */}
      {order && (
        <ReceiptModal
          order={order}
          onClose={() => setIsReceiptOpen(false)}
        />
      )}
    </div>
  );
};
