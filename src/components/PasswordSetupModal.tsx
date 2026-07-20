'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Lock, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface PasswordSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export function PasswordSetupModal({ isOpen, onClose, userEmail }: PasswordSetupModalProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || 'Failed to save password.');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0f172a] border border-teal-500/40 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-panel-border/40 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-accent shrink-0 shadow-inner">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white tracking-tight">Set Up Account Password</h3>
            <p className="text-xs text-slate-400">Secure your account for direct 1-click password sign in</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-6 text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-teal-accent mx-auto animate-bounce" />
            <h4 className="font-extrabold text-white text-base">Password Saved Successfully!</h4>
            <p className="text-xs text-slate-300">
              Your browser will now prompt you to save this password. Session cookies remain active for 30 days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" method="post" action="#">
            {/* Hidden Username input for Browser Password Manager Integration */}
            <input
              type="text"
              name="username"
              value={userEmail}
              readOnly
              autoComplete="username"
              className="hidden"
            />

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-teal-accent" />
                <span>New Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                required
                className="w-full bg-slate-900 border border-panel-border focus:border-teal-accent rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-accent" />
                <span>Confirm New Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                className="w-full bg-slate-900 border border-panel-border focus:border-teal-accent rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 text-xs font-bold transition-all cursor-pointer"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !password || !confirmPassword}
                className="px-5 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-extrabold text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <KeyRound className="w-3.5 h-3.5" />
                )}
                <span>Save Password & Enable Auto-Login</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
