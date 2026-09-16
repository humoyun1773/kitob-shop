import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, RefreshCw, ShoppingBag } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { OrderTrackingTimeline } from '../components/orders/OrderTrackingTimeline';
import { ReceiptModal } from '../components/orders/ReceiptModal';

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, orders } = useOrders();
  const { t } = useLanguage();

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // If no param, take first order
  const order = id ? getOrderById(id) : orders[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  if (!order) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-md mx-auto text-center px-4">
        <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">Buyurtma topilmadi</h2>
        <p className="text-xs text-slate-500 mt-2">Bunday raqamli buyurtma mavjud emas yoki noto'g'ri kiritilgan.</p>
        <Link
          to="/profile"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-xs shadow-md"
        >
          Buyurtmalar tarixiga o'tish
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha buyurtmalar</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition ${
              isRefreshing ? 'animate-spin text-amber-500' : ''
            }`}
            title="Yangilash"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsReceiptOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Chekni ko'rish</span>
          </button>
        </div>
      </div>

      {/* Live Timeline Component */}
      <OrderTrackingTimeline order={order} />

      {/* Purchased Books Mini Grid */}
      <div className="mt-8 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-4">
          Buyurtmadagi kitoblar ({order.items.length})
        </h4>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {order.items.map((item, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-12 h-16 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <Link
                    to={`/books/${item.bookId}`}
                    className="font-serif font-semibold text-xs text-slate-900 dark:text-white hover:text-amber-500 transition line-clamp-1"
                  >
                    {item.book.title}
                  </Link>
                  <p className="text-[11px] text-slate-500">{item.book.author}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="block text-[11px] text-slate-400">{item.quantity} dona</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        order={order}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
};
