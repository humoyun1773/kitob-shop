import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Search, Mail, Phone, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminUsersPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const mockUsers = [
    {
      id: 'usr-101',
      name: user?.name || 'Humoyun Mirzo',
      email: user?.email || 'humoyun@kitobshop.uz',
      phone: '+998 90 123 45 67',
      ordersCount: 4,
      totalSpent: 142.50,
      registeredDate: '2026-01-01',
      role: 'admin',
      status: 'Active'
    },
    {
      id: 'usr-102',
      name: 'Alisher Qodirov',
      email: 'alisher.q@example.uz',
      phone: '+998 93 555 44 33',
      ordersCount: 7,
      totalSpent: 219.80,
      registeredDate: '2026-02-14',
      role: 'customer',
      status: 'Active'
    },
    {
      id: 'usr-103',
      name: 'Elena Petrova',
      email: 'elena.petrova@mail.ru',
      phone: '+998 97 789 01 23',
      ordersCount: 3,
      totalSpent: 89.20,
      registeredDate: '2026-03-02',
      role: 'customer',
      status: 'Active'
    },
    {
      id: 'usr-104',
      name: 'Sardor Rahim',
      email: 'sardor.rahim@gmail.com',
      phone: '+998 90 999 11 22',
      ordersCount: 1,
      totalSpent: 16.50,
      registeredDate: '2026-04-10',
      role: 'customer',
      status: 'Active'
    }
  ];

  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200/60 dark:border-slate-800/60 gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-500 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboardga qaytish</span>
          </Link>
          <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
            Foydalanuvchilar Ro'yxati ({mockUsers.length})
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Ism yoki email bo'yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-700 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Foydalanuvchi</th>
                <th className="py-3 px-4">Telefon</th>
                <th className="py-3 px-4">Buyurtmalar</th>
                <th className="py-3 px-4">Jami xarid</th>
                <th className="py-3 px-4">Ro'yxatdan o'tgan</th>
                <th className="py-3 px-4">Roli</th>
                <th className="py-3 px-4 text-right">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono">{u.phone}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{u.ordersCount} ta</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                    ${u.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{u.registeredDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {u.status}
                    </span>
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
