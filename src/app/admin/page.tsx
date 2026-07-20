'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  Shield,
  Building2,
  Lock
} from 'lucide-react';
import { User } from '@/lib/db';

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Access denied.');
      }
      setUsers(data.users || []);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Forbidden. Super-Admin access required.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: 'Super-Admin' | 'Author' | 'Member') => {
    setUpdatingId(userId);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, globalRole: newRole }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update user role');
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, global_role: newRole, is_super_admin: newRole === 'Super-Admin' } : u))
      );
      setToastMsg(`Role updated to ${newRole}!`);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error updating role');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans selection:bg-amber-500/30">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-amber-950/90 border border-amber-500/50 text-amber-300 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md animate-slide-down">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full bg-[#090d18]/90 border-b border-panel-border/60 backdrop-blur-md">
        <div className="max-w-8xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-900 border border-panel-border/60 text-slate-400 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black flex items-center justify-center shadow-lg shadow-amber-500/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-black text-white tracking-wide">Admin Portal</h1>
                <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> System Governance & User Directory
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Admin Access Active
            </div>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <main className="max-w-8xl mx-auto px-6 md:px-12 py-10 space-y-8">
        {error ? (
          <div className="p-8 bg-rose-950/40 border border-rose-500/40 rounded-2xl text-center max-w-md mx-auto space-y-3">
            <Shield className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Admin Access Required</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Forbidden. Admin access required.</p>
            <Link
              href="/dashboard"
              className="inline-block px-5 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-all"
            >
              Return to User Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel border-panel-border/40 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Registered Users</span>
                  <Users className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-3xl font-black text-white">{users.length}</p>
              </div>

              <div className="glass-panel border-panel-border/40 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Admins</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-black text-amber-400">
                  {users.filter((u) => u.is_super_admin || u.global_role === 'Super-Admin').length}
                </p>
              </div>

              <div className="glass-panel border-panel-border/40 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Authors / Standard Users</span>
                  <Building2 className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-3xl font-black text-white">
                  {users.filter((u) => !u.is_super_admin && u.global_role !== 'Super-Admin').length}
                </p>
              </div>
            </div>

            {/* Users Table Header & Search */}
            <div className="glass-panel border-panel-border/60 rounded-2xl overflow-hidden shadow-2xl space-y-4">
              <div className="p-5 border-b border-panel-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090d18]/40">
                <div>
                  <h2 className="text-sm font-extrabold text-white">Global System Users</h2>
                  <p className="text-xs text-slate-400">Manage global system roles, root clearance, and account access</p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email or name..."
                    className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Users Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090d18] text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-panel-border/40">
                    <tr>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Global Role</th>
                      <th className="px-6 py-3">Created At</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-panel-border/20">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          <Loader2 className="w-6 h-6 animate-spin text-amber-400 mx-auto mb-2" />
                          <span>Loading users directory...</span>
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500 italic">
                          No users matching search filter.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const currentRole = u.is_super_admin ? 'Super-Admin' : u.global_role || 'Author';
                        return (
                          <tr key={u.id} className="hover:bg-slate-900/40 transition-all">
                            <td className="px-6 py-4 font-bold text-white flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                                {(u.name || u.email)[0].toUpperCase()}
                              </div>
                              <span>{u.name || u.email.split('@')[0]}</span>
                            </td>
                            <td className="px-6 py-4 font-mono text-slate-300">{u.email}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  currentRole === 'Super-Admin'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                    : 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                                }`}
                              >
                                {currentRole}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">
                              {new Date(u.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <select
                                value={currentRole}
                                disabled={updatingId === u.id}
                                onChange={(e) =>
                                  handleRoleChange(
                                    u.id,
                                    e.target.value as 'Super-Admin' | 'Author' | 'Member'
                                  )
                                }
                                className="bg-[#070a13] border border-panel-border/70 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none focus:border-amber-500/50 cursor-pointer"
                              >
                                <option value="Author">Author (Default)</option>
                                <option value="Super-Admin">Admin (Full Access)</option>
                                <option value="Member">Member (Standard)</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
