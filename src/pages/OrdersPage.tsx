import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, FileText, ArrowRight, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ReceiptModal } from '../components/orders/ReceiptModal';
import { Order } from '../types/order';

export const OrdersPage: React.FC = () => {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);

  const handleBuyAgain = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.book, item.quantity);
    });
    showToast(`Buyurtmadagi ${order.items.length} ta kitob qayta savatga qo'shildi!`, 'success');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-6 mb-8 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
            Xaridlar tarixi
          </span>
          <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white mt-1">
            Mening Buyurtmalarim ({orders.length})
          </h1>
        </div>

        <Link
          to="/books"
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition self-start sm:self-auto"
        >
          Katalogga o'tish
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-[#161a23] rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            Siz hali buyurtma bermagansiz
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Sevimli kitoblaringizni tanlang va qulay buyurtma bering.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#161a23] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                      #{order.id}
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/40">
                      {order.orderStatus}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Buyurtma sanasi: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Jami summa:</span>
                  <span className="font-mono font-bold text-lg text-amber-600 dark:text-amber-400">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-[#11141c] border border-slate-100 dark:border-slate-800/60"
                  >
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="w-10 h-14 object-cover rounded-lg shadow-sm flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-serif font-semibold text-xs text-slate-900 dark:text-white truncate">
                        {item.book.title}
                      </p>
                      <p className="text-[10px] text-slate-500">{item.book.author}</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {item.quantity} dona • ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-500">
                  Yetkazish: <strong className="text-slate-700 dark:text-slate-300">{order.estimatedDelivery}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBuyAgain(order)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Qayta sotib olish</span>
                  </button>

                  <button
                    onClick={() => setReceiptOrder(order)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Chek</span>
                  </button>

                  <Link
                    to={`/order/${order.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 font-semibold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Kuzatish</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      {receiptOrder && (
        <ReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
        />
      )}
    </div>
  );
};
