'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Key, CheckCircle2, ShieldCheck, Trash2, Sparkles, X, Eye, EyeOff, Lock, ExternalLink, UserCheck, AlertCircle } from 'lucide-react';

interface ByokStatus {
  authenticated: boolean;
  isGuest: boolean;
  userId: string;
  email: string;
  hasKey: boolean;
  maskedKey: string | null;
  keySource: 'user_byok' | 'system_default';
  activeModels?: {
    pro: string;
    flash: string;
    vision: string;
  };
}

export default function ByokHeaderButton({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<ByokStatus | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKeyText, setShowKeyText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Optional inline quick sign-in if user is currently in Guest mode inside the modal
  const [loginEmail, setLoginEmail] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const fetchKeyStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/user/apikey', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // Ignore fetch errors silently on initial load
    }
  }, []);

  useEffect(() => {
    fetchKeyStatus();
    const handleAuthChanged = () => fetchKeyStatus();
    window.addEventListener('promptcanvas-auth-changed', handleAuthChanged);
    return () => window.removeEventListener('promptcanvas-auth-changed', handleAuthChanged);
  }, [fetchKeyStatus]);

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/user/apikey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKeyInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: 'error', message: data.error || 'Failed to save Gemini API key.' });
      } else {
        setApiKeyInput('');
        setFeedback({
          type: 'success',
          message: 'Personal Gemini API key saved and bound to your user ID!',
        });
        await fetchKeyStatus();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Network error while saving API key.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveKey = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/user/apikey', { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: data.message || 'Personal API key cleared. Using system default key.',
        });
        await fetchKeyStatus();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to remove key.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Network error.' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes('@')) return;
    setSigningIn(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim() }),
      });
      if (res.ok) {
        setLoginEmail('');
        window.dispatchEvent(new CustomEvent('promptcanvas-auth-changed'));
        await fetchKeyStatus();
        setFeedback({
          type: 'success',
          message: 'Signed in! You can now save your personal Gemini API key tied to your account.',
        });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Unable to sign in right now.' });
    } finally {
      setSigningIn(false);
    }
  };

  const isByokActive = Boolean(status && !status.isGuest && status.hasKey);
  const isGuestMode = !status || status.isGuest;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setFeedback(null);
          fetchKeyStatus();
          setIsOpen(true);
        }}
        title={
          isByokActive
            ? `Bring Your Own Key Active (${status?.maskedKey}) — Bound to ${status?.email}`
            : isGuestMode
            ? 'Bring Your Own Key (Guest Mode: Using Default System Key)'
            : 'Bring Your Own Key — Configure Personal Gemini API Key'
        }
        data-testid="byok-header-button"
        className={`inline-flex items-center gap-1.5 rounded-lg border transition-all font-semibold ${
          compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-1.5 text-xs'
        } ${
          isByokActive
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-sm shadow-emerald-950/50'
            : 'bg-slate-800/90 border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-500/40 hover:bg-slate-800'
        }`}
      >
        <Key className="w-3.5 h-3.5 shrink-0" />
        <span>{compact ? 'BYOK' : 'Bring Your Own Key'}</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
            isByokActive
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : isGuestMode
              ? 'bg-slate-700/80 text-slate-300'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {isByokActive ? 'Active' : isGuestMode ? 'Guest Key' : 'System Key'}
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Bring Your Own Key (BYOK)
                    {isByokActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Personal Key Active
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Bind your personal Gemini API key to your User ID for all AI model synthesis
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Active Session & Key Routing Status Card */}
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                    Current Identity:
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {isGuestMode
                      ? 'Guest Mode (Anonymous Session)'
                      : `${status?.email} (${status?.userId?.slice(0, 12)})`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Active Key Source:
                  </span>
                  <span
                    className={`font-semibold ${
                      isByokActive ? 'text-emerald-400' : 'text-amber-300'
                    }`}
                  >
                    {isByokActive
                      ? `Personal BYOK (${status?.maskedKey})`
                      : 'Current Default System Key (GEMINI_API_KEY)'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Target Models:
                  </span>
                  <span className="font-mono text-slate-300">
                    {status?.activeModels?.pro || 'gemini-2.5-pro'} ·{' '}
                    {status?.activeModels?.flash || 'gemini-2.5-flash'}
                  </span>
                </div>
              </div>

              {isGuestMode ? (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-200 leading-relaxed">
                      <p className="font-bold text-amber-300 mb-1">
                        Guest Mode Active — Using Current Default System Key
                      </p>
                      <p className="text-slate-300">
                        In Guest Mode, PromptCanvas automatically routes requests through the default system{' '}
                        <code className="text-amber-200 font-mono">GEMINI_API_KEY</code>. Sign in with your email below to bind and save your own personal Gemini API key tied to your User ID.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleQuickSignIn} className="flex gap-2 pt-1">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter your email to sign in (e.g. architect@company.com)"
                      className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      disabled={signingIn}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors disabled:opacity-50"
                    >
                      {signingIn ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleSaveKey} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      {status?.hasKey
                        ? 'Update Personal Gemini API Key'
                        : 'Enter Your Gemini API Key (Google AI Studio)'}
                    </label>
                    <div className="relative">
                      <input
                        type={showKeyText ? 'text' : 'password'}
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        placeholder={
                          status?.hasKey
                            ? `Saved: ${status.maskedKey} (enter new key to replace)`
                            : 'AIzaSy...'
                        }
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-3.5 pr-10 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKeyText((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                        title={showKeyText ? 'Hide key' : 'Show key'}
                      >
                        {showKeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Stored securely in your user profile & used across all studios.</span>
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium"
                      >
                        Get API Key <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    {status?.hasKey ? (
                      <button
                        type="button"
                        onClick={handleRemoveKey}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove Saved Key
                      </button>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !apiKeyInput.trim()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        <Key className="w-3.5 h-3.5" />
                        {loading ? 'Saving...' : 'Save Key to User ID'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {feedback && (
                <div
                  className={`flex items-start gap-2 rounded-xl p-3 text-xs border ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
