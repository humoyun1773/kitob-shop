import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString();
    setToasts(prev => [
      ...prev,
      { id, type, message }
    ]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container - positioned at top center */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2.5 pointer-events-none w-full max-w-md px-4">
        <AnimatePresence mode="popLayout">
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let iconBg = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
          let borderGlow = 'border-emerald-500/30 dark:border-emerald-500/20';
          let progressBg = 'bg-emerald-500';
          let badgeText = 'Muvaffaqiyatli';
          let badgeColor = 'text-emerald-600 dark:text-emerald-400';

          if (toast.type === 'error') {
            Icon = XCircle;
            iconBg = 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';
            borderGlow = 'border-rose-500/30 dark:border-rose-500/20';
            progressBg = 'bg-rose-500';
            badgeText = 'Xatolik';
            badgeColor = 'text-rose-600 dark:text-rose-400';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            iconBg = 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
            borderGlow = 'border-amber-500/30 dark:border-amber-500/20';
            progressBg = 'bg-amber-500';
            badgeText = 'Eslatma';
            badgeColor = 'text-amber-600 dark:text-amber-400';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconBg = 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30';
            borderGlow = 'border-sky-500/30 dark:border-sky-500/20';
            progressBg = 'bg-sky-500';
            badgeText = "Ma'lumot";
            badgeColor = 'text-sky-600 dark:text-sky-400';
          }

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: -24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92, transition: { duration: 0.18 } }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              key={toast.id}
              className={`pointer-events-auto w-full relative overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-[#0F172A]/95 rounded-2xl p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(15,23,42,0.16)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] border ${borderGlow} flex items-center justify-between gap-3`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${badgeColor}`}>
                    {badgeText}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug break-words">
                    {toast.message}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex-shrink-0 active:scale-90"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Progress timer bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200/40 dark:bg-slate-800/60 overflow-hidden">
                <div
                  className={`h-full ${progressBg}`}
                  style={{ animation: 'toastProgress 4s linear forwards' }}
                />
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
