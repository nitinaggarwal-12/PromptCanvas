'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Key, CheckCircle2, ShieldCheck, Trash2, Sparkles, X, Eye, EyeOff, Lock, ExternalLink, UserCheck, AlertCircle } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

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

export default function ByokHeaderButton({
  compact = false,
  sidebarMode = false,
  isSidebarCollapsed = false,
}: {
  compact?: boolean;
  sidebarMode?: boolean;
  isSidebarCollapsed?: boolean;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [status, setStatus] = useState<ByokStatus | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKeyText, setShowKeyText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);

  // Optional inline quick sign-in if user is currently in Guest mode inside the modal
  const [loginEmail, setLoginEmail] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setConfirmingRemove(false);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  }, []);

  // UX-22: Modal Escape key dismissal and Tab/Shift+Tab Focus Trap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

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
    setConfirmingRemove(false);
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
        setConfirmingRemove(false);
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
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setLoginEmail('');
        window.dispatchEvent(new CustomEvent('promptcanvas-auth-changed'));
        await fetchKeyStatus();
        setFeedback({
          type: 'success',
          message: 'Signed in! You can now save your personal Gemini API key tied to your account.',
        });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Unable to sign in with that email address.',
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
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          setFeedback(null);
          setConfirmingRemove(false);
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
        className={
          sidebarMode
            ? `w-full min-h-[42px] flex items-center ${
                isSidebarCollapsed ? 'justify-center' : 'justify-between'
              } p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isByokActive
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                  : isLight
                  ? 'text-amber-800 hover:text-amber-900 hover:bg-amber-100/70 border border-amber-300 bg-amber-50'
                  : 'text-amber-300 hover:text-amber-200 hover:bg-slate-800/80 border border-amber-500/25 bg-amber-500/10'
              }`
            : `inline-flex items-center gap-1.5 rounded-lg border transition-all font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95 ${
                compact ? 'px-2.5 py-1.5 text-[11px] min-h-[36px]' : 'px-3 py-1.5 text-xs min-h-[38px]'
              } ${
                isByokActive
                  ? isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-sm shadow-emerald-950/50'
                  : isLight
                  ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                  : 'bg-slate-800/90 border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-500/40 hover:bg-slate-800'
              }`
        }
      >
        {sidebarMode ? (
          <>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 min-w-0'} shrink-0`}>
              <Key className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} aria-hidden="true" />
              <span className={isSidebarCollapsed ? 'sr-only' : 'truncate'}>BYOK API Key</span>
            </div>
            {!isSidebarCollapsed && (
              <span
                className={`shrink-0 ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                  isByokActive
                    ? isLight
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isGuestMode
                    ? isLight
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-slate-700/80 text-slate-300'
                    : isLight
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {isByokActive ? 'Active' : isGuestMode ? 'Guest' : 'System'}
              </span>
            )}
          </>
        ) : (
          <>
            <Key className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{compact ? 'BYOK' : 'Bring Your Own Key'}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                isByokActive
                  ? isLight
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : isGuestMode
                  ? isLight
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-slate-700/80 text-slate-300'
                  : isLight
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isByokActive ? 'Active' : isGuestMode ? 'Guest Key' : 'System Key'}
            </span>
          </>
        )}
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={closeModal}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="byok-modal-title"
              className="w-full max-w-lg my-auto rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Key className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 id="byok-modal-title" className="text-sm font-bold text-white flex items-center gap-2">
                      Bring Your Own Key (BYOK)
                      {isByokActive && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Personal Key Active
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      Bind your personal Gemini API key to your User ID for all AI model synthesis
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close Bring Your Own Key modal"
                  className="min-h-[38px] inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span>Close</span>
                </button>
              </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Active Session & Key Routing Status Card */}
              <div role="status" aria-live="polite" className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                    Current Identity:
                  </span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {isGuestMode
                      ? 'Guest Mode (Anonymous Session)'
                      : `${status?.email} (${status?.userId?.slice(0, 12)})`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
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

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" aria-hidden="true" />
                    Target Models:
                  </span>
                  <span className="font-mono text-slate-200">
                    {status?.activeModels?.pro || 'gemini-3.1-pro-preview'} ·{' '}
                    {status?.activeModels?.flash || 'gemini-3.8-flash'}
                  </span>
                </div>
              </div>

              {isGuestMode ? (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-xs text-slate-200 leading-relaxed">
                      <p className="font-bold text-amber-300 mb-1">
                        Guest Mode Active — Using Current Default System Key
                      </p>
                      <p className="text-slate-200">
                        In Guest Mode, PromptCanvas automatically routes requests through the default system{' '}
                        <code className="text-amber-200 font-mono">GEMINI_API_KEY</code>. Sign in with your email below to bind and save your own personal Gemini API key tied to your User ID.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleQuickSignIn} className="flex gap-2 pt-1">
                    <label htmlFor="byok-guest-email-input" className="sr-only">
                      Email address for quick sign-in
                    </label>
                    <input
                      id="byok-guest-email-input"
                      type="email"
                      autoComplete="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter your email to sign in (e.g. architect@company.com)"
                      className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400"
                    />
                    <button
                      type="submit"
                      disabled={signingIn}
                      aria-busy={signingIn}
                      className="min-h-[38px] px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {signingIn ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                  <div className="flex justify-end pt-2 border-t border-amber-500/20">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="min-h-[38px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveKey} className="space-y-4">
                  <div>
                    <label htmlFor="byok-api-key-input" className="block text-xs font-semibold text-slate-200 mb-1.5">
                      {status?.hasKey
                        ? 'Update Personal Gemini API Key'
                        : 'Enter Your Gemini API Key (Google AI Studio)'}
                    </label>
                    <div className="relative">
                      <input
                        id="byok-api-key-input"
                        type={showKeyText ? 'text' : 'password'}
                        autoComplete="off"
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        aria-invalid={feedback?.type === 'error'}
                        aria-describedby={feedback ? 'byok-feedback-alert' : undefined}
                        placeholder={
                          status?.hasKey
                            ? `Saved: ${status.maskedKey} (enter new key to replace)`
                            : 'AIzaSy...'
                        }
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-3.5 pr-11 py-2.5 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKeyText((v) => !v)}
                        aria-label={showKeyText ? 'Hide API key' : 'Show API key'}
                        aria-pressed={showKeyText}
                        className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        title={showKeyText ? 'Hide key' : 'Show key'}
                      >
                        {showKeyText ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-300">
                      <span>Stored securely in your user profile &amp; used across all studios.</span>
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline underline-offset-4 font-medium"
                      >
                        Get API Key <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* UX-12 (P1): Two-Step Destructive BYOK Key Removal Guardrail */}
                  {confirmingRemove && status?.hasKey && (
                    <div
                      role="alertdialog"
                      aria-labelledby="byok-confirm-remove-title"
                      aria-describedby="byok-confirm-remove-desc"
                      className="rounded-xl bg-rose-950/60 border border-rose-500/40 p-3.5 space-y-2.5"
                    >
                      <p id="byok-confirm-remove-title" className="text-xs font-bold text-rose-200">
                        Confirm Personal Gemini API Key Removal?
                      </p>
                      <p id="byok-confirm-remove-desc" className="text-[11px] text-rose-300">
                        Removing your saved key (<code className="font-mono">{status.maskedKey}</code>) will revert your session to the default system key.
                      </p>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmingRemove(false)}
                          className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveKey}
                          disabled={loading}
                          aria-busy={loading}
                          className="min-h-[36px] px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Removing...' : 'Confirm Remove Key'}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-1">
                    {status?.hasKey && !confirmingRemove ? (
                      <button
                        type="button"
                        onClick={() => setConfirmingRemove(true)}
                        disabled={loading}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Remove Saved Key
                      </button>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !apiKeyInput.trim()}
                        aria-busy={loading}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        <Key className="w-3.5 h-3.5" aria-hidden="true" />
                        {loading ? 'Saving...' : 'Save Key to User ID'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {feedback && (
                <div
                  id="byok-feedback-alert"
                  role={feedback.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  className={`flex items-start gap-2 rounded-xl p-3 text-xs border ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
