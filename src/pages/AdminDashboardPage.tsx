import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { OrderStatus } from '../types/order';

export const AdminDashboardPage: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { books } = useBooks();
  const { user } = useAuth();

  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'completed' ? o.total : 0), 0);
  const pendingCount = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const deliveredCount = orders.filter(o => o.orderStatus === 'Delivered').length;

  const statuses: OrderStatus[] = [
    'Order placed',
    'Payment confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for delivery',
    'Delivered',
    'Cancelled'
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Admin Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/60 dark:border-slate-800/60 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Administrator Dashboard</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
            Boshqaruv Markazi
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/books"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Kitoblar boshqaruvi</span>
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-amber-600 dark:hover:bg-amber-400 font-semibold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyurtmalar</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards (Requirement #21) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Jami Tushum</span>
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white font-mono mt-0.5">
              ${totalSales.toFixed(2)}
            </h3>
            <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4% o'sish
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Jami Buyurtmalar</span>
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white font-mono mt-0.5">
              {orders.length} ta
            </h3>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {pendingCount} ta yetkazilmoqda
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Kitoblar Omborda</span>
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white font-mono mt-0.5">
              {books.length} xil
            </h3>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 block">
              {books.reduce((acc, b) => acc + b.stock, 0)} dona jami
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mijozlar Bazasi</span>
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white font-mono mt-0.5">
              1,420+
            </h3>
            <span className="text-[11px] text-purple-500 font-semibold mt-0.5 block">
              Faol xaridorlar
            </span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Chart Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                Oylik Savdo & Daromad Dinamikasi
              </h3>
              <p className="text-xs text-slate-400">Oxirgi 7 kunlik sotuvlar ko'rsatkichi</p>
            </div>
            <span className="text-xs font-bold text-amber-500">+24% haftalik</span>
          </div>

          {/* Bar chart representation */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Dush', h: '60%', val: '$420' },
              { day: 'Sesh', h: '85%', val: '$680' },
              { day: 'Chor', h: '45%', val: '$310' },
              { day: 'Pay', h: '75%', val: '$540' },
              { day: 'Juma', h: '95%', val: '$890' },
              { day: 'Shan', h: '100%', val: '$960' },
              { day: 'Yak', h: '70%', val: '$510' }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">
                  {col.val}
                </span>
                <div
                  style={{ height: col.h }}
                  className="w-full max-w-[36px] bg-gradient-to-t from-amber-500 to-rose-500 rounded-t-xl group-hover:brightness-110 transition duration-300 shadow-sm"
                />
                <span className="text-xs font-medium text-slate-500">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-4">
            Kategoriyalar bo'yicha ulush
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Shaxsiy rivojlanish</span>
                <span>38%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[38%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Biznes & Moliya</span>
                <span>27%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[27%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Klassika & Badiiy</span>
                <span>20%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[20%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Tarix & Boshqalar</span>
                <span>15%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[15%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders with LIVE STATUS UPDATE (Requirement #20, #23) */}
      <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Oxirgi Buyurtmalar va Real-vaqt Holat boshqaruvi
            </h3>
            <p className="text-xs text-slate-500">
              Bu yerdagi status o'zgartirilishi darhol xaridorning kuzatuv sahifasida va bildirishnomasida yangilanadi!
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Barcha buyurtmalar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold uppercase">
                <th className="py-3">Buyurtma ID</th>
                <th className="py-3">Mijoz</th>
                <th className="py-3">Kitoblar</th>
                <th className="py-3">Summa</th>
                <th className="py-3">Hozirgi Holat</th>
                <th className="py-3 text-right">Statusni o'zgartirish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.slice(0, 5).map(ord => (
                <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">
                    #{ord.id}
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{ord.customerName}</p>
                    <p className="text-[11px] text-slate-400">{ord.customerPhone}</p>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">
                    {ord.items.length} ta kitob
                  </td>
                  <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">
                    ${ord.total.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/50">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <select
                      value={ord.orderStatus}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
