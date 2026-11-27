'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  History,
  UserPlus,
  MessageSquarePlus,
  CheckCircle2,
  ArrowRight,
  Search,
  Download,
  ShieldCheck,
  Sparkles,
  Users,
  Check,
  Share2,
} from 'lucide-react';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { useTheme } from '@/lib/themeContext';

interface ChangelogEntry {
  id: string;
  event_category: 'USER_ADDED' | 'USER_ROLE_CHANGED' | 'COMMENT_ADDED' | 'STATUS_CHANGED' | 'BLUEPRINT_UPDATED';
  actor_id?: string | null;
  actor_name: string;
  actor_email: string;
  actor_role: string;
  entity_type: string;
  entity_id: string;
  entity_name: string;
  field_changed: string;
  old_value?: string | null;
  new_value?: string | null;
  summary: string;
  source: string;
  created_at: string;
}

interface GovernanceTrackerItem {
  id: string;
  blueprint_code: string;
  blueprint_name: string;
  domain_layer: string;
  status: string;
  priority: string;
  owner_name: string;
  owner_email: string;
  latest_comment?: string | null;
  comment_author?: string | null;
  version: string;
  last_modified_by: string;
  updated_at: string;
}

const STATUS_OPTIONS = [
  'Draft',
  'In Review',
  'Approved',
  'Production Certified',
  'Needs Revision',
  'Deprecated',
];

export default function GovernanceChangelogPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [trackerItems, setTrackerItems] = useState<GovernanceTrackerItem[]>([]);
  const [stats, setStats] = useState({
    totalChanges: 0,
    userChanges: 0,
    commentChanges: 0,
    statusChanges: 0,
  });
  const [syncing, setSyncing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Person-neutral defaults; auto-hydrated from /api/auth/me when signed in
  const [actorName, setActorName] = useState<string>('Cloud Architecture Team');
  const [actorEmail, setActorEmail] = useState<string>('architecture-governance@cloud-review.internal');

  // 1. Status Change Form
  const [selectedBpForStatus, setSelectedBpForStatus] = useState<string>('BP-03');
  const [newStatusVal, setNewStatusVal] = useState<string>('Approved');
  const [statusCommentVal, setStatusCommentVal] = useState<string>('');

  // 2. Add Comment Form
  const [selectedBpForComment, setSelectedBpForComment] = useState<string>('BP-05');
  const [commentTextVal, setCommentTextVal] = useState<string>('');

  // 3. Add User / Role Form
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<'Super-Admin' | 'Author' | 'Member'>('Author');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleCopyChangelogShareLink = () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/changelog`;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2200);
  };

  const fetchChangelogData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'ALL') params.set('category', categoryFilter);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const res = await fetch(`/api/changelog?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setChangelog(data.changelog || []);
        setTrackerItems(data.trackerItems || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load changelog data:', err);
    }
  }, [categoryFilter, searchQuery]);

  useEffect(() => {
    void fetchChangelogData();
  }, [fetchChangelogData]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user?.email && !data.user.email.endsWith('@promptcanvas.guest')) {
          if (data.user.name) setActorName(data.user.name);
          setActorEmail(data.user.email);
        }
      })
      .catch(() => {});
  }, []);

  const handleUiStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSyncing(true);
    try {
      const res = await fetch('/api/changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CHANGE_STATUS',
          blueprintCode: selectedBpForStatus,
          newStatus: newStatusVal,
          comment: statusCommentVal.trim() || undefined,
          actorName,
          actorEmail,
          source: 'UI',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusCommentVal('');
        showToast(`Status of ${selectedBpForStatus} updated to "${newStatusVal}" in audit ledger.`);
        await fetchChangelogData();
      } else {
        showToast(data.error || 'Failed to update status.');
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleUiAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentTextVal.trim()) return;
    setSyncing(true);
    try {
      const res = await fetch('/api/changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ADD_COMMENT',
          targetId: selectedBpForComment,
          commentText: commentTextVal.trim(),
          actorName,
          actorEmail,
          source: 'UI',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommentTextVal('');
        showToast(`Review comment recorded on ${selectedBpForComment}.`);
        await fetchChangelogData();
      } else {
        showToast(data.error || 'Failed to add comment.');
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleUiAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    setSyncing(true);
    try {
      const res = await fetch('/api/changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ADD_USER',
          name: newUserName.trim(),
          email: newUserEmail.trim(),
          role: newUserRole,
          actorName,
          actorEmail,
          source: 'UI',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const addedLabel = newUserName.trim();
        setNewUserName('');
        setNewUserEmail('');
        showToast(`User "${addedLabel}" (${newUserRole}) recorded in governance RBAC directory.`);
        await fetchChangelogData();
      } else {
        showToast(data.error || 'Failed to add user.');
      }
    } finally {
      setSyncing(false);
    }
  };

  const getCategoryBadge = (cat: ChangelogEntry['event_category']) => {
    switch (cat) {
      case 'USER_ADDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <UserPlus className="w-3.5 h-3.5" /> USER ADDED
          </span>
        );
      case 'USER_ROLE_CHANGED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Users className="w-3.5 h-3.5" /> ROLE CHANGED
          </span>
        );
      case 'COMMENT_ADDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <MessageSquarePlus className="w-3.5 h-3.5" /> COMMENT ADDED
          </span>
        );
      case 'STATUS_CHANGED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> STATUS CHANGED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <History className="w-3.5 h-3.5" /> UPDATED
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900">
      <UnifiedAppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader>
          <div className="w-full max-w-none flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold truncate">
                <Link
                  href="/"
                  className={`transition-colors shrink-0 ${
                    isLight ? 'text-slate-700 hover:text-indigo-600' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PromptCanvas
                </Link>
                <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>/</span>
                <span className={`font-bold flex items-center gap-1.5 truncate ${isLight ? 'text-indigo-700' : 'text-indigo-400'}`}>
                  <History className="w-4 h-4 shrink-0" />
                  <span className="inline-block max-w-full truncate">Governance Changelog &amp; Audit Ledger</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                data-testid="changelog-share-link-btn"
                onClick={handleCopyChangelogShareLink}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  shareCopied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : isLight
                      ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                }`}
              >
                {shareCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Share Link</span>
                  </>
                )}
              </button>
              <a
                href="/api/changelog?format=csv"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                }`}
              >
                <Download className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <span>Export CSV</span>
              </a>
              <Link
                href="/admin"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  isLight ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border-indigo-500/30'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white shadow-xs transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Home Dashboard</span>
              </Link>
            </div>
          </div>
        </AppHeader>

        <main className="w-full max-w-none px-6 md:px-10 py-6 space-y-6">
          {/* KPI Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Audited Changes</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.totalChanges}</div>
              <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Actor-Attributed Ledger
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Users &amp; Roles Changed</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.userChanges}</div>
              <div className="text-xs text-slate-600 mt-1">Additions &amp; RBAC updates</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700">Comments Logged</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.commentChanges}</div>
              <div className="text-xs text-slate-600 mt-1">Blueprint review notes</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Status Transitions</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.statusChanges}</div>
              <div className="text-xs text-slate-600 mt-1">Draft → Review → Approved</div>
            </div>
          </div>

          {/* Actor Identity Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              All governance status transitions, review comments, and role updates are persisted in the PromptCanvas database and exportable via CSV.
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600">Active UI Actor:</span>
              <input
                type="text"
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-900 font-semibold w-36"
                placeholder="Actor Name"
              />
              <input
                type="email"
                value={actorEmail}
                onChange={(e) => setActorEmail(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-700 w-52"
                placeholder="actor@domain.com"
              />
            </div>
          </div>

          {/* Quick Live Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <form onSubmit={handleUiStatusChange} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                    <CheckCircle2 className="w-4 h-4" /> 1. Record Status Change
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Audit Ledger</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mt-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Target Blueprint</label>
                    <select
                      value={selectedBpForStatus}
                      onChange={(e) => setSelectedBpForStatus(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                    >
                      {trackerItems.map((item) => (
                        <option key={item.blueprint_code} value={item.blueprint_code}>
                          {item.blueprint_code} ({item.status})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">New Status</label>
                    <select
                      value={newStatusVal}
                      onChange={(e) => setNewStatusVal(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={statusCommentVal}
                    onChange={(e) => setStatusCommentVal(e.target.value)}
                    placeholder="Optional status transition reason..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={syncing}
                className="w-full py-2 px-4 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition cursor-pointer"
              >
                Update Status
              </button>
            </form>

            <form onSubmit={handleUiAddComment} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
                    <MessageSquarePlus className="w-4 h-4" /> 2. Add Review Comment
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Review Notes</span>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Target Blueprint</label>
                  <select
                    value={selectedBpForComment}
                    onChange={(e) => setSelectedBpForComment(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                  >
                    {trackerItems.map((item) => (
                      <option key={item.blueprint_code} value={item.blueprint_code}>
                        {item.blueprint_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={commentTextVal}
                    onChange={(e) => setCommentTextVal(e.target.value)}
                    placeholder="Enter architectural review comment or sign-off note..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={syncing}
                className="w-full py-2 px-4 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition cursor-pointer"
              >
                Post Review Comment
              </button>
            </form>

            <form onSubmit={handleUiAddUser} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <UserPlus className="w-4 h-4" /> 3. Add User / Role Change
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">RBAC Directory</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mt-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="e.g. Cloud Security Review Board"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as 'Super-Admin' | 'Author' | 'Member')}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                    >
                      <option value="Author">Author</option>
                      <option value="Super-Admin">Super-Admin</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                </div>
                <div className="mt-2.5">
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="cloud-security-review@google.com"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={syncing}
                className="w-full py-2 px-4 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
              >
                Add / Update User
              </button>
            </form>
          </div>

          {/* Unified Audit Changelog Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold bg-slate-900 text-white shadow-xs">
                  <History className="w-4 h-4" />
                  Unified Audit Changelog ({changelog.length})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search actor, blueprint, value..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white w-56"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                >
                  <option value="ALL">All Categories</option>
                  <option value="USER_ADDED">Users Added</option>
                  <option value="USER_ROLE_CHANGED">User Roles Changed</option>
                  <option value="COMMENT_ADDED">Comments Added</option>
                  <option value="STATUS_CHANGED">Status Changes</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-3.5 px-5">Recorded At</th>
                    <th className="py-3.5 px-5">Actor</th>
                    <th className="py-3.5 px-5">Change Category</th>
                    <th className="py-3.5 px-5">Target Entity</th>
                    <th className="py-3.5 px-5">Before → After</th>
                    <th className="py-3.5 px-5">Audit Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs md:text-sm">
                  {changelog.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/90 transition">
                      <td className="py-4 px-5 whitespace-nowrap align-top">
                        <div className="font-semibold text-slate-900">
                          {new Date(entry.created_at).toLocaleString()}
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            PromptCanvas UI
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-5 align-top">
                        <div className="font-bold text-slate-900">{entry.actor_name}</div>
                        <div className="text-xs text-slate-500">{entry.actor_email}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          {entry.actor_role}
                        </span>
                      </td>

                      <td className="py-4 px-5 align-top whitespace-nowrap">
                        {getCategoryBadge(entry.event_category)}
                      </td>

                      <td className="py-4 px-5 align-top">
                        <div className="font-bold text-slate-900">{entry.entity_name}</div>
                        <div className="text-xs text-slate-500">
                          Type: <span className="font-semibold text-slate-700">{entry.entity_type}</span> • Field:{' '}
                          <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px]">
                            {entry.field_changed}
                          </code>
                        </div>
                      </td>

                      <td className="py-4 px-5 align-top max-w-md">
                        <div className="flex flex-wrap items-center gap-2">
                          {entry.old_value && entry.old_value !== 'None' ? (
                            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 line-through">
                              {entry.old_value}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-xs text-slate-400 italic">None</span>
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                            {entry.new_value}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-5 align-top max-w-md">
                        <p className="text-xs text-slate-700 leading-relaxed">{entry.summary}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {toastMessage && (
          <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-[420px] p-3.5 rounded-xl bg-slate-900 text-white border border-emerald-500/40 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs font-bold px-1.5"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
