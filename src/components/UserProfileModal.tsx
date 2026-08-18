'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, ShieldCheck, LogOut, CheckCircle2, AlertCircle, Loader2, Clock, ShieldAlert } from 'lucide-react';
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

  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'logs'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [logs, setLogs] = useState<UserLogItem[]>([]);

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || '');
    }
  }, [isOpen, user?.name]);

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

  if (!isOpen || !user) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-xl rounded-3xl p-8 md:p-10 shadow-2xl transition-all ${
        isLight
          ? 'bg-white border border-slate-300 text-slate-900 shadow-slate-300/60'
          : 'bg-[#0b101d] border border-slate-800/80 text-white shadow-teal-500/10'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          id="profile-modal-close-btn"
          className={`absolute top-5 right-5 p-2.5 rounded-xl transition-colors cursor-pointer ${
            isLight
              ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <X className="w-6 h-6" />
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
                {(user.name || user.email)[0].toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h2 className={`text-2xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {user.name || 'PromptCanvas User'}
            </h2>
            <p className={`text-sm mt-0.5 ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>{user.email}</p>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border mb-8 ${
          isLight
            ? 'bg-slate-100 border-slate-300'
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <button
            id="profile-tab-info"
            type="button"
            onClick={() => {
              setActiveTab('profile');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
          <button
            id="profile-tab-password"
            type="button"
            onClick={() => {
              setActiveTab('password');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'password'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" /> Password
          </button>
          <button
            id="profile-tab-logs"
            type="button"
            onClick={() => {
              setActiveTab('logs');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'logs'
                ? isLight
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-300'
                  : 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" /> Audit Logs
          </button>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-sm flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Tab 1: Profile Info */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {user.is_guest && (
              <div className={`p-4 rounded-2xl border text-xs md:text-sm space-y-2 mb-4 ${
                isLight
                  ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                  : 'bg-amber-500/15 border-amber-500/30 text-amber-200'
              }`}>
                <div className={`flex items-center gap-2 font-bold ${
                  isLight ? 'text-amber-800' : 'text-amber-400'
                }`}>
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Exploring in Guest Mode</span>
                </div>
                <p className={`leading-relaxed ${isLight ? 'text-amber-900' : 'text-amber-200'}`}>
                  Your diagrams are public and visible to all users unless deleted. To save your work and keep it private, create a login profile.
                </p>
              </div>
            )}
            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base cursor-not-allowed outline-none ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-600'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400'
                  }`}
                />
              </div>
              <p className={`mt-1.5 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Email address cannot be modified.</p>
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="profile-input-name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
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
                className={`px-5 py-3 rounded-2xl font-extrabold text-sm transition-colors flex items-center gap-2 border cursor-pointer ${
                  isLight
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300'
                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
              <button
                id="profile-save-btn"
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-2xl bg-teal-accent hover:bg-teal-hover text-[#070a13] font-black text-sm md:text-base tracking-wide transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Change Password */}
        {activeTab === 'password' && (
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="password-input-current"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
                    isLight
                      ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="password-input-new"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
                    isLight
                      ? 'bg-white border-slate-300 focus:border-teal-500 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-900/80 border-slate-800 focus:border-teal-400 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="password-input-confirm"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-base outline-none transition-colors ${
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
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-black text-sm md:text-base tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Update Password</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Audit Logs */}
        {activeTab === 'logs' && (
          <div className="space-y-5">
            {logsLoading ? (
              <div className="py-10 flex justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              </div>
            ) : logs.length === 0 ? (
              <div className={`py-10 text-center text-sm italic ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                No activity logs recorded yet.
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
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
                      <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0" />
                      <div>
                        <span className={`font-bold uppercase tracking-wider text-xs ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>
                          {log.event_type}
                        </span>
                        <p className={`text-xs mt-0.5 ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          {log.ip_address ? `IP: ${log.ip_address}` : 'Local Session'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-mono ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
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
