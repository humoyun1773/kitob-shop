import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-36 pb-24 max-w-md mx-auto px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10" />
      </div>
      <h1 className="font-serif font-bold text-5xl text-slate-900 dark:text-white mb-2">404</h1>
      <h2 className="font-serif font-bold text-xl text-slate-800 dark:text-slate-200 mb-2">Sahifa topilmadi</h2>
      <p className="text-xs text-slate-500 mb-6">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
};
