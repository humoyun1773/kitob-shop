import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100">
          <div className="max-w-md w-full bg-white dark:bg-[#161a23] rounded-3xl p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800/80 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                Kutilmagan xatolik yuz berdi
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Xavotir olmang, ma'lumotlaringiz xavfsiz. Sahifani qayta yuklash yoki bosh sahifaga qaytishingiz mumkin.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-slate-100 dark:bg-slate-900/60 p-3.5 rounded-xl text-xs text-rose-600 dark:text-rose-400 font-mono overflow-auto max-h-32">
                {this.state.error.message || 'Unknown application error'}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Qayta yuklash</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <Home className="w-4 h-4" />
                <span>Bosh sahifa</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
