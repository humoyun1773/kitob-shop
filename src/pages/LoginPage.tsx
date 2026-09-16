import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('humoyun@kitobshop.uz');
  const [password, setPassword] = useState('password123');
  const [isAdminFast, setIsAdminFast] = useState(true);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = isAdminFast ? 'admin@kitobshop.uz' : email;
    await login(loginEmail, password);
    showToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#161a23] p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
              Kitob<span className="text-amber-500">Shop</span>
            </span>
          </Link>
          <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
            Tizimga kirish
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Buyurtmalaringiz va saralangan kitoblaringizni boshqaring
          </p>
        </div>

        {/* Quick role selection badge for demo convenience */}
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-amber-900 dark:text-amber-200">
              Admin huquqlari bilan kirish
            </span>
          </div>
          <input
            type="checkbox"
            checked={isAdminFast}
            onChange={e => setIsAdminFast(e.target.checked)}
            className="w-4 h-4 text-amber-500 accent-amber-500 cursor-pointer"
          />
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
                value={isAdminFast ? 'admin@kitobshop.uz' : email}
                disabled={isAdminFast}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-70"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Parol
              </label>
              <a href="#" onClick={e => { e.preventDefault(); showToast('Parolni tiklash havolasi emailingizga yuborildi', 'info'); }} className="text-amber-600 dark:text-amber-400 hover:underline text-[11px]">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition"
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
