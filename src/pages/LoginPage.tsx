import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('humoyun@kitobshop.uz');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    showToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1E293B] p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl dark:shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F59E0B] via-amber-400 to-[#d97706] text-[#0F172A] flex items-center justify-center font-bold shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
              Kitob<span className="text-[#F59E0B]">Shop</span>
            </span>
          </Link>
          <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
            Tizimga kirish
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Buyurtmalaringiz va saralangan kitoblaringizni boshqaring
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Elektron pochta
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Parol
              </label>
              <a href="#" onClick={e => { e.preventDefault(); showToast('Parolni tiklash havolasi emailingizga yuborildi', 'info'); }} className="text-[#F59E0B] hover:underline text-[11px]">
                Parolni unutdingizmi?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0F172A] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/20 transition"
          >
            <span>Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Profilingiz yo'qmi? </span>
          <Link to="/register" className="font-semibold text-amber-600 dark:text-amber-400 hover:underline">
            Ro'yxatdan o'ting
          </Link>
        </div>
      </div>
    </div>
  );
};
