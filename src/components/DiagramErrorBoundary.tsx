'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackXml?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  copied: boolean;
}

export class DiagramErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, copied: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DiagramErrorBoundary] Caught rendering error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, copied: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleCopyFallback = () => {
    if (this.props.fallbackXml) {
      navigator.clipboard.writeText(this.props.fallbackXml);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center p-8 bg-[#0b101d] text-slate-200 rounded-xl border border-rose-500/30 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-inner">
            <AlertTriangle className="w-7 h-7 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-1">Diagram Rendering Recovery</h3>
          <p className="text-xs text-slate-400 max-w-md text-center mb-6">
            A temporary viewport or DOM error occurred while rendering the vector XML. Your active state and canvas edits remain preserved in memory.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-sky-600/30 transition-all cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-render Canvas
            </button>
            {this.props.fallbackXml && (
              <button
                onClick={this.handleCopyFallback}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-all cursor-pointer"
              >
                {this.state.copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {this.state.copied ? 'Copied XML' : 'Copy Backup XML'}
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
