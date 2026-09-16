import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-400 pt-16 pb-24 lg:pb-12 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 overflow-hidden">
      {/* Subtle ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-36 bg-[#F59E0B]/5 dark:bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-36 bg-[#F59E0B]/5 dark:bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Feature highlights */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Tezkor Yetkazib Berish</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Butun O'zbekiston bo'ylab 24-48 soat ichida eshikkacha yetkazish.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">100% Asl Kitoblar</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Faqat rasmiy nashriyotlar va to'g'ridan-to'g'ri asl nusxalar kafolati.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Oson Qaytarish</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Agar kitobda nuqson bo'lsa, 14 kun ichida almashtirib beriladi.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Ekspert Tavsiyalari</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Adabiyot ixlosmandlari uchun maxsus saralangan to'plamlar.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F59E0B] via-amber-400 to-[#d97706] flex items-center justify-center text-[#0F172A] font-bold shadow-md group-hover:scale-105 transition transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
                Kitob<span className="text-[#F59E0B]">Shop</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-sm">
              Kitobxonlar uchun eng sara jahon va o'zbek adabiyoti durdonalari, zamonaviy bestsellerlar va shaxsiy rivojlanish asarlari. Mutolaa orqali dunyoni kashf eting.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">To'lov turlari:</span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-md text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">HUMO</span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-md text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">UZCARD</span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-md text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">VISA</span>
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-md text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">MASTERCARD</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Navigatsiya</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/books" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Barcha kitoblar</Link></li>
              <li><Link to="/books?category=Fiction" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Badiiy adabiyot</Link></li>
              <li><Link to="/books?category=Business" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Biznes & Moliya</Link></li>
              <li><Link to="/books?category=Self Development" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Shaxsiy rivojlanish</Link></li>
              <li><Link to="/books?category=Classics" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Klassik asarlar</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Xizmatlar</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/orders" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Buyurtmani kuzatish</Link></li>
              <li><Link to="/wishlist" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Saralangan kitoblar</Link></li>
              <li><Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Shaxsiy profil</Link></li>
              <li><Link to="/cart" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">Savatcha</Link></li>
              <li><Link to="/admin" className="hover:text-amber-600 dark:hover:text-amber-400 text-amber-600 dark:text-amber-400 font-medium transition">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Aloqa</h5>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <span>Toshkent sh., Amir Temur ko'chasi 42-uy</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <span>+998 71 200 00 00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <span>info@kitobshop.uz</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 KitobShop. Barcha huquqlar himoyalangan.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for book lovers everywhere.
        </p>
      </div>
    </footer>
  );
};
