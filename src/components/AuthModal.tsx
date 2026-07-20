'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { id: string; email: string; name?: string | null }) => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'magiclink'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [magicUrl, setMagicUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setError(null);
      setSuccessMsg(null);
      setMagicUrl(null);
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setMagicUrl(null);
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

        setSuccessMsg('Magic link generated! Click below to enter instantly.');
        if (data.magicLinkUrl) {
          setMagicUrl(data.magicLinkUrl);
        }
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
      <div className="relative w-full max-w-xl bg-[#0b101d] border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl shadow-teal-500/10 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          id="auth-modal-close-btn"
          className="absolute top-5 right-5 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs md:text-sm font-extrabold">
            <Sparkles className="w-4 h-4" /> PromptCanvas Account
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Your Account' : 'Passwordless Login'}
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            {mode === 'signin' 
              ? 'Sign in to access your saved architecture diagrams' 
              : mode === 'signup'
              ? 'Sign up to create, save, and export multi-cloud architecture diagrams'
              : 'Enter your email to receive an instant passwordless login link'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="grid grid-cols-3 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-8 gap-1.5">
          <button
            id="auth-tab-signin"
            type="button"
            onClick={() => {
              setMode('signin');
              setError(null);
            }}
            className={`py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-[#070a13] shadow-md'
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
            className={`py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-[#070a13] shadow-md'
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
            className={`py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all ${
              mode === 'magiclink'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ✨ Magic Link
          </button>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span className="font-bold">{error}</span>
            </div>
            {mode === 'signin' && error.includes('Invalid') && (
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                }}
                className="text-xs text-teal-400 hover:text-teal-300 hover:underline text-left font-extrabold mt-1 cursor-pointer"
              >
                Don&apos;t have an account yet? Click here to Sign Up instead →
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-400" />
              <span className="font-bold">{successMsg}</span>
            </div>
            {magicUrl && (
              <a
                href={magicUrl}
                className="mt-1 w-full py-3 px-4 rounded-xl bg-teal-400 text-[#070a13] font-black text-center text-sm hover:bg-teal-300 transition-all shadow-md block"
              >
                🚀 Click Here to Log In Instantly →
              </a>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="auth-input-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-teal-400 text-base text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">Email Address</label>
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
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-teal-400 text-base text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>
          </div>

          {mode !== 'magiclink' && (
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-2">Password</label>
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
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-teal-400 text-base text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
              {mode === 'signup' && (
                <p className="mt-1.5 text-xs text-slate-400">Minimum 6 characters required.</p>
              )}
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-black text-base md:text-lg tracking-wide transition-all shadow-xl shadow-teal-500/20 hover:scale-[1.01] flex items-center justify-center gap-2.5 disabled:opacity-50 mt-4"
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
      </div>
    </div>
  );
}
