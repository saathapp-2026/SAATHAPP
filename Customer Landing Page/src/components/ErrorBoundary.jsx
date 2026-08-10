import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SaathApp Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
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
