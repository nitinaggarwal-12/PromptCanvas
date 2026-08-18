'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { id: string; email: string; name?: string | null }) => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'signin' }: AuthModalProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [mode, setMode] = useState<'signin' | 'signup' | 'magiclink'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setError(null);
      setSuccessMsg(null);
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleGuestLogin = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start guest session');
      setSuccessMsg('Guest session initialized! Redirecting...');
      setTimeout(() => {
        onSuccess(data.user);
        onClose();
      }, 500);
    } catch {
      const fallbackUser = { id: `guest-${Date.now()}`, email: 'guest@promptcanvas.app', name: 'Guest Explorer' };
      setSuccessMsg('Guest session initialized! Redirecting...');
      setTimeout(() => {
        onSuccess(fallbackUser);
        onClose();
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'magiclink') {
        const res = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send magic link');

        setSuccessMsg(data.message || 'Magic link dispatched! Please check your inbox to complete sign in.');
        return;
      }

      const endpoint = mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const payload = mode === 'signin' 
        ? { email, password } 
        : { email, password, name };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      setSuccessMsg(mode === 'signin' ? 'Signed in successfully!' : 'Account created successfully!');
      setTimeout(() => {
        onSuccess(data.user);
        onClose();
      }, 600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-xl rounded-3xl p-8 md:p-10 shadow-2xl transition-all border ${
        isLight
          ? 'bg-white border-slate-300 text-slate-900 shadow-slate-300/60'
          : 'bg-[#0b101d] border-slate-800/80 text-white shadow-teal-500/10'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="auth-modal-close-btn"
          className={`absolute top-5 right-5 p-2.5 rounded-xl transition-colors cursor-pointer ${
            isLight
              ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-extrabold border ${
            isLight
              ? 'bg-teal-100 border-teal-300 text-teal-800'
              : 'bg-teal-500/10 border-teal-500/30 text-teal-400'
          }`}>
            <Sparkles className="w-4 h-4" /> PromptCanvas Account
          </div>
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Your Account' : 'Passwordless Login'}
          </h2>
          <p className={`text-sm md:text-base ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {mode === 'signin' 
              ? 'Sign in to access your saved architecture diagrams' 
              : mode === 'signup'
              ? 'Sign up to create, save, and export multi-cloud architecture diagrams'
              : 'Enter your email to receive an instant passwordless login link'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className={`grid grid-cols-3 p-1.5 rounded-2xl border mb-8 gap-1.5 ${
          isLight
            ? 'bg-slate-100 border-slate-300'
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <button
            id="auth-tab-signin"
            type="button"
            onClick={() => {
              setMode('signin');
              setError(null);
            }}
            className={`py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-[#070a13] shadow-md'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-signup"
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-[#070a13] shadow-md'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            id="auth-tab-magiclink"
            type="button"
            onClick={() => {
              setMode('magiclink');
              setError(null);
            }}
            className={`py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === 'magiclink'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ✨ Magic Link
          </button>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span className="font-bold">{error}</span>
            </div>
            {mode === 'signin' && error.includes('Invalid') && (
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                }}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline text-left font-extrabold mt-1 cursor-pointer"
              >
                Don&apos;t have an account yet? Click here to Sign Up instead →
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-sm flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-600" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="auth-input-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className={`block text-sm font-bold mb-2 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
              <input
                id="auth-input-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                    : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                }`}
              />
            </div>
          </div>

          {mode !== 'magiclink' && (
            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="auth-input-password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
              {mode === 'signup' && (
                <p className={`mt-1.5 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Minimum 6 characters required.</p>
              )}
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-black text-base md:text-lg tracking-wide transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.01] flex items-center justify-center gap-2.5 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{mode === 'signin' ? 'Signing In...' : mode === 'signup' ? 'Creating Account...' : 'Generating Link...'}</span>
              </>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Magic Link ✨'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className={`pt-6 mt-6 border-t text-center ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          <button
            id="auth-guest-btn"
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className={`w-full py-3.5 px-6 rounded-2xl border font-extrabold text-sm md:text-base transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 hover:text-slate-950'
                : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Explore as a Guest (No email required)</span>
          </button>
          <p className={`text-[11px] mt-2.5 leading-relaxed ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Note: Content created as a Guest will be visible to all users unless deleted. To save your work privately, you can create a login profile anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
