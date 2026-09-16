import React, { useState } from 'react';
import { 
  User as UserIcon, 
  MapPin, 
  Settings, 
  Plus, 
  Save, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { DeliveryAddress } from '../types/order';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, addAddress, logout, switchRole, isAdmin } = useAuth();
  const { orders } = useOrders();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile');

  // Profile form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // New Address form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState<DeliveryAddress>({
    country: "O'zbekiston",
    region: 'Toshkent shahri',
    city: 'Toshkent',
    district: 'Yunusobod',
    street: '',
    house: '',
    apartment: '',
    postalCode: '100084',
    recipientName: user?.name || '',
    recipientPhone: user?.phone || ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    showToast("Profil ma'lumotlari muvaffaqiyatli saqlandi!", 'success');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.house) {
      showToast("Ko'cha va uy raqamini kiriting", 'warning');
      return;
    }
    addAddress(newAddr);
    setIsAddingAddress(false);
    showToast('Yangi yetkazish manzili saqlandi!', 'success');
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-36 pb-20 text-center">
        <p className="text-sm text-slate-500">Iltimos, avval tizimga kiring.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-32 lg:pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/5 p-6 sm:p-8 rounded-3xl border border-amber-500/20 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
          alt={user.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-lg border-2 border-white dark:border-slate-800"
        />
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              {user.name}
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm uppercase">
              {user.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user.email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-600 dark:text-slate-300">
            <span>Buyurtmalar soni: <strong>{orders.length} ta</strong></span>
            <span>•</span>
            <span>Saqlangan manzillar: <strong>{user.savedAddresses.length} ta</strong></span>
          </div>
        </div>

        <button
          onClick={switchRole}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
        >
          {isAdmin ? "Xaridor rejimiga o'tish" : "Admin rejimiga o'tish"}
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Tabs */}
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-shrink-0 md:w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Shaxsiy Ma'lumotlar</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-shrink-0 md:w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Yetkazish Manzillari</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-shrink-0 md:w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Sozlamalar</span>
          </button>

          <button
            onClick={logout}
            className="flex-shrink-0 md:w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition whitespace-nowrap"
          >
            <LogOut className="w-4 h-4" />
            <span>Profildan chiqish</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3 bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          
          {/* 1. PERSONAL INFO TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                Shaxsiy ma'lumotlar
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  To'liq ism-sharif
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Elektron pochta
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telefon raqam
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>O'zgarishlarni saqlash</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. SAVED ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Yetkazish manzillari
                </h3>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi manzil</span>
                </button>
              </div>

              {/* Add address form */}
              {isAddingAddress && (
                <form onSubmit={handleSaveAddress} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase">Yangi manzil qo'shish</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Shahar"
                      value={newAddr.city}
                      onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Tuman"
                      value={newAddr.district}
                      onChange={e => setNewAddr({ ...newAddr, district: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Ko'cha"
                      value={newAddr.street}
                      onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="col-span-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Uy"
                      value={newAddr.house}
                      onChange={e => setNewAddr({ ...newAddr, house: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 text-xs text-slate-500"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              )}

              {/* Saved addresses list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.savedAddresses.map((addr, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#121620] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold uppercase text-[10px]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Manzil #{i + 1}</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {addr.street}, {addr.house} {addr.apartment || ''}
                    </p>
                    <p className="text-slate-500">{addr.city}, {addr.district}, {addr.country}</p>
                    <p className="text-slate-400 font-mono">Pochta: {addr.postalCode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                Tizim va interfeys sozlamalari
              </h3>

              <div className="space-y-4 text-xs">
                {/* Theme selection */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Mavzu rejimi (Theme)</h4>
                    <p className="text-slate-500">Yorug' yoki qorong'i dizaynni tanlang</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        theme === 'light' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Light ☀️
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        theme === 'dark' ? 'border-amber-500 bg-amber-950 text-amber-300' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Dark 🌙
                    </button>
                  </div>
                </div>

                {/* Language selection */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Interfeys tili (Language)</h4>
                    <p className="text-slate-500">Sayt tili va kitob tavsiflari</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLanguage('UZ')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        language === 'UZ' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      UZ 🇺🇿
                    </button>
                    <button
                      onClick={() => setLanguage('RU')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        language === 'RU' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      RU 🇷🇺
                    </button>
                    <button
                      onClick={() => setLanguage('EN')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        language === 'EN' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      EN 🇺🇸
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
