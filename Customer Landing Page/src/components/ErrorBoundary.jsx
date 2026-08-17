import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isRecovering: false };
  }

  static getDerivedStateFromError(error) {
    const isChunkError = 
      error?.name === 'ChunkLoadError' || 
      (error?.message && /Failed to fetch dynamically imported module/i.test(error.message)) ||
      (error?.message && /Importing a module script failed/i.test(error.message));

    if (isChunkError) {
      const lastReload = parseInt(sessionStorage.getItem('chunk-error-last-reload') || '0', 10);
      const now = Date.now();
      // Only auto-reload if we haven't already reloaded for a chunk error in the last 10 seconds
      if (now - lastReload > 10000) {
        sessionStorage.setItem('chunk-error-last-reload', now.toString());
        return { hasError: true, error, isRecovering: true };
      }
    }

    return { hasError: true, error, isRecovering: false };
  }

  async componentDidCatch(error, errorInfo) {
    console.error('SaathApp Error Boundary caught an error:', error, errorInfo);
    if (this.state.isRecovering) {
      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
          }
        } catch (e) {}
      }
      if (window.caches) {
        try {
          const names = await caches.keys();
          for (const name of names) {
            await caches.delete(name);
          }
        } catch (e) {}
      }
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('v', Date.now().toString());
      window.location.href = newUrl.toString();
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.isRecovering) {
      // Show nothing or a minimalistic loader while recovering
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 font-sans">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mb-4"></div>
            <p className="text-slate-400 text-sm font-medium">Updating application...</p>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 font-sans text-center">
          <div className="max-w-md w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 text-2xl font-black">
              ⚠️
            </div>
            <h2 className="text-2xl font-black text-white">Something went wrong</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              An unexpected error occurred while loading this view.
            </p>
            <p className="text-[11px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 text-rose-300 text-left overflow-x-auto max-h-32">
              {this.state.error?.toString()}
            </p>
            <button
              onClick={this.handleReload}
              className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-black text-white shadow-lg transition cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
