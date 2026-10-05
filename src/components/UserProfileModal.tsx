'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, User, Mail, Lock, ShieldCheck, LogOut, CheckCircle2, AlertCircle, Loader2, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; email: string; name?: string | null; created_at?: string | Date; is_guest?: boolean } | null;
  onUpdateUser: (updatedUser: { id: string; email: string; name?: string | null }) => void;
  onLogout: () => void;
}

interface UserLogItem {
  id: string;
  event_type: string;
  ip_address?: string | null;
  created_at: string;
}

export function UserProfileModal({ isOpen, onClose, user, onUpdateUser, onLogout }: UserProfileModalProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<'profile' | 'ai_tier' | 'password' | 'logs'>('ai_tier');
  const activeUser = user || { id: 'guest', email: 'guest@promptcanvas.guest', name: 'Guest Explorer', is_guest: true };
  const [name, setName] = useState(activeUser.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [logs, setLogs] = useState<UserLogItem[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeUser) {
      setName(activeUser.name || '');
    }
  }, [isOpen, activeUser?.name]);

  // UX-22: WAI-ARIA Modal Focus Trap & Escape Handler
  useEffect(() => {
    if (!isOpen) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => {
      const firstBtn = dialogRef.current?.querySelector<HTMLElement>('button, input');
      firstBtn?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      prevActive?.focus?.();
    };
  }, [isOpen, onClose]);

  const fetchUserLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetch('/api/user/logs');
      const data = await res.json();
      if (res.ok) {
        const logList = Array.isArray(data) ? data : (data.logs || []);
        setLogs(logList);
      }
    } catch (err) {
      console.error('Failed to fetch user logs:', err);
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'logs') {
      fetchUserLogs();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      setSuccessMsg('Profile updated successfully!');
      onUpdateUser(data.user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setSuccessMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-profile-modal-title"
        className={`relative w-full max-w-xl rounded-3xl p-8 md:p-10 shadow-2xl transition-all ${
          isLight
            ? 'bg-white border border-slate-300 text-slate-900 shadow-slate-300/60'
            : 'bg-[#0b101d] border border-slate-800/80 text-white shadow-teal-500/10'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          id="profile-modal-close-btn"
          aria-label="Close user profile modal"
          className={`absolute top-5 right-5 min-w-[44px] min-h-[44px] p-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
            isLight
              ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className={`flex items-center gap-4 mb-8 pb-6 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-xl shadow-teal-500/20 flex items-center justify-center">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
              isLight ? 'bg-white' : 'bg-[#0b101d]'
            }`}>
              <span className="font-black text-2xl text-teal-600 dark:text-teal-400">
                {(activeUser.name || activeUser.email)[0].toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h2
              id="user-profile-modal-title"
              className={`text-2xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {activeUser.name || 'PromptCanvas User'}
            </h2>
            <p className={`text-sm mt-0.5 ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>{activeUser.email}</p>
          </div>
        </div>

        {/* Profile Tabs */}
        <div
          role="tablist"
          aria-label="User Profile Sections"
          className={`flex items-center gap-2 p-1.5 rounded-2xl border mb-8 ${
            isLight
              ? 'bg-slate-100 border-slate-300'
              : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <button
            id="profile-tab-ai-tier"
            type="button"
            role="tab"
            aria-selected={activeTab === 'ai_tier'}
            aria-controls="profile-tabpanel-ai-tier"
            onClick={() => {
              setActiveTab('ai_tier');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              activeTab === 'ai_tier'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" /> AI Tier
          </button>
          <button
            id="profile-tab-info"
            type="button"
            role="tab"
            aria-selected={activeTab === 'profile'}
            aria-controls="profile-tabpanel-info"
            onClick={() => {
              setActiveTab('profile');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              activeTab === 'profile'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" aria-hidden="true" /> Profile
          </button>
          <button
            id="profile-tab-password"
            type="button"
            role="tab"
            aria-selected={activeTab === 'password'}
            aria-controls="profile-tabpanel-password"
            onClick={() => {
              setActiveTab('password');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              activeTab === 'password'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" aria-hidden="true" /> Password
          </button>
          <button
            id="profile-tab-logs"
            type="button"
            role="tab"
            aria-selected={activeTab === 'logs'}
            aria-controls="profile-tabpanel-logs"
            onClick={() => {
              setActiveTab('logs');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              activeTab === 'logs'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" aria-hidden="true" /> Audit Logs
          </button>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div
            id="profile-error-alert"
            role="alert"
            aria-live="assertive"
            className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-sm flex items-center gap-2.5"
          >
            <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {successMsg && (
          <div
            id="profile-success-status"
            role="status"
            aria-live="polite"
            className="mb-6 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-sm flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Tab 0: AI Tier & Enterprise Governance */}
        {activeTab === 'ai_tier' && (
          <div id="profile-tabpanel-ai-tier" role="tabpanel" aria-labelledby="profile-tab-ai-tier" className="space-y-4">
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-teal-50 border-teal-200 text-slate-900' : 'bg-teal-950/30 border-teal-500/30 text-white'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">Active AI Model Tier</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-500 text-slate-950">ENTERPRISE PRO</span>
              </div>
              <h3 className="text-base font-black">Gemini 3.1 Pro Vision &amp; Gemini 3.8 Flash</h3>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Full multimodal 1:1 visual twin decompilation, zero-collision Draw.io XML compilation, and automated Omni 1.1 forensic auditing active across Architecture Studio, Prompt Lab, and Image to Diagram.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-300 block">Omni 1.1 Quality Gate</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">✓ 100% Active (Zero Bypass)</span>
              </div>
              <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-300 block">Slides &amp; Export Studio</span>
                <span className="text-sm font-black text-sky-600 dark:text-sky-400 mt-0.5 block">✓ 1:1 Interactive Twin</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Profile Info */}
        {activeTab === 'profile' && (
          <form id="profile-tabpanel-info" role="tabpanel" aria-labelledby="profile-tab-info" onSubmit={handleUpdateProfile} className="space-y-5">
            {activeUser.is_guest && (
              <div className={`p-4 rounded-2xl border text-xs md:text-sm space-y-2 mb-4 ${
                isLight
                  ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                  : 'bg-amber-500/15 border-amber-500/30 text-amber-200'
              }`}>
                <div className={`flex items-center gap-2 font-bold ${
                  isLight ? 'text-amber-800' : 'text-amber-400'
                }`}>
                  <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Exploring in Guest Mode</span>
                </div>
                <p className={`leading-relaxed ${isLight ? 'text-amber-900' : 'text-amber-200'}`}>
                  Your diagrams are public and visible to all users unless deleted. To save your work and keep it private, create a login profile.
                </p>
              </div>
            )}
            <div>
              <label
                htmlFor="profile-input-email"
                className={`block text-sm font-bold mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  id="profile-input-email"
                  type="email"
                  disabled
                  value={activeUser.email}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base cursor-not-allowed outline-none ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-600'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400'
                  }`}
                />
              </div>
              <p className={`mt-1.5 text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Email address cannot be modified.</p>
            </div>

            <div>
              <label
                htmlFor="profile-input-name"
                className={`block text-sm font-bold mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  id="profile-input-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isLight
                      ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div className={`flex items-center justify-between pt-6 border-t ${
              isLight ? 'border-slate-200' : 'border-slate-800/80'
            }`}>
              <button
                id="profile-logout-btn"
                type="button"
                onClick={onLogout}
                className={`px-5 py-3 rounded-2xl font-extrabold text-sm transition-colors flex items-center gap-2 border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                  isLight
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300'
                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                <LogOut className="w-4 h-4" aria-hidden="true" /> Sign Out
              </button>
              <button
                id="profile-save-btn"
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="px-7 py-3.5 rounded-2xl bg-teal-accent hover:bg-teal-hover text-[#070a13] font-black text-sm md:text-base tracking-wide transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Change Password */}
        {activeTab === 'password' && (
          <form id="profile-tabpanel-password" role="tabpanel" aria-labelledby="profile-tab-password" onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label
                htmlFor="password-input-current"
                className={`block text-sm font-bold mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  id="password-input-current"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isLight
                      ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password-input-new"
                className={`block text-sm font-bold mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  id="password-input-new"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isLight
                      ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password-input-confirm"
                className={`block text-sm font-bold mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" aria-hidden="true" />
                <input
                  id="password-input-confirm"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isLight
                      ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div className={`flex justify-end pt-6 border-t ${
              isLight ? 'border-slate-200' : 'border-slate-800/80'
            }`}>
              <button
                id="password-update-btn"
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-black text-sm md:text-base tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                <span>Update Password</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Audit Logs (UX-04 Actionable Empty State Recovery) */}
        {activeTab === 'logs' && (
          <div id="profile-tabpanel-logs" role="tabpanel" aria-labelledby="profile-tab-logs" className="space-y-5">
            {logsLoading ? (
              <div role="status" aria-live="polite" className="py-10 flex flex-col items-center justify-center gap-2 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" aria-hidden="true" />
                <span className="text-xs font-medium">Loading audit trail...</span>
              </div>
            ) : logs.length === 0 ? (
              <div className={`py-8 px-6 rounded-2xl border text-center space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}>
                <p className="text-sm font-semibold">
                  No activity logs recorded yet.
                </p>
                <p className="text-xs opacity-80">
                  Generate or export an architecture diagram in the Studio to populate your session audit trail.
                </p>
                <div className="pt-1">
                  <Link
                    href="/studio"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-teal-500/15 hover:bg-teal-500/25 text-teal-600 dark:text-teal-300 border border-teal-500/30 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <span>Open Architecture Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1 custom-scrollbar" tabIndex={0} aria-label="Session activity logs">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between text-xs md:text-sm ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-slate-900/80 border-slate-800/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0" aria-hidden="true" />
                      <div>
                        <span className={`font-bold uppercase tracking-wider text-xs ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>
                          {log.event_type}
                        </span>
                        <p className={`text-xs mt-0.5 ${
                          isLight ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {log.ip_address ? `IP: ${log.ip_address}` : 'Local Session'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-mono tabular-nums ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
