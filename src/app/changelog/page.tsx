'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  History,
  RefreshCw,
  UserPlus,
  MessageSquarePlus,
  CheckCircle2,
  ArrowRight,
  FileSpreadsheet,
  Search,
  Filter,
  Download,
  Code2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Users,
  Layers,
  Clock,
  ArrowLeftRight,
  Check,
  Copy,
} from 'lucide-react';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';

interface ChangelogEntry {
  id: string;
  event_category: 'USER_ADDED' | 'USER_ROLE_CHANGED' | 'COMMENT_ADDED' | 'STATUS_CHANGED' | 'BLUEPRINT_UPDATED' | 'SHEET_SYNC';
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
  source: 'UI' | 'GOOGLE_SHEET' | 'API';
  sync_status: 'SYNCED' | 'PENDING_PUSH' | 'PULLED_FROM_SHEET';
  sheet_row_ref?: string | null;
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
  last_sync_source: 'UI' | 'GOOGLE_SHEET';
  sheet_row_number: number;
  updated_at: string;
}

interface GovernanceComment {
  id: string;
  target_id: string;
  target_name: string;
  author_name: string;
  author_email: string;
  author_role: string;
  comment_text: string;
  status_at_comment?: string | null;
  source: 'UI' | 'GOOGLE_SHEET';
  sheet_row_ref?: string | null;
  created_at: string;
}

interface SheetSyncConfig {
  id: string;
  spreadsheet_id: string;
  spreadsheet_url: string;
  sheet_title: string;
  auto_sync_enabled: boolean | number;
  sync_mode: string;
  last_synced_at: string | null;
  last_sync_actor: string | null;
  total_ui_to_sheet_pushes: number;
  total_sheet_to_ui_pulls: number;
}

interface TrackedUser {
  id: string;
  email: string;
  name?: string | null;
  global_role?: string;
  created_at?: string;
}

const STATUS_OPTIONS = [
  'Draft',
  'In Review',
  'Approved',
  'Production Certified',
  'Needs Revision',
  'Deprecated',
];

export default function ChangelogAndSheetSyncPage() {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [trackerItems, setTrackerItems] = useState<GovernanceTrackerItem[]>([]);
  const [comments, setComments] = useState<GovernanceComment[]>([]);
  const [users, setUsers] = useState<TrackedUser[]>([]);
  const [syncConfig, setSyncConfig] = useState<SheetSyncConfig | null>(null);
  const [stats, setStats] = useState({
    totalChanges: 0,
    userChanges: 0,
    commentChanges: 0,
    statusChanges: 0,
    uiOriginated: 0,
    sheetOriginated: 0,
  });
  const [appsScriptCode, setAppsScriptCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Main View Mode: 'unified_changelog' | 'google_sheet_twin' | 'apps_script'
  const [activeMainTab, setActiveMainTab] = useState<'unified_changelog' | 'google_sheet_twin' | 'apps_script'>('unified_changelog');
  // Google Sheet Sub-Tab: 'Tracker' | 'Users' | 'Comments' | 'Changelog'
  const [activeSheetTab, setActiveSheetTab] = useState<'Tracker' | 'Users' | 'Comments' | 'Changelog'>('Tracker');

  // Quick Mutation Form States (UI Originated OR Google Sheet Simulated)
  const [actorName, setActorName] = useState<string>('Nitin Aggarwal');
  const [actorEmail, setActorEmail] = useState<string>('nitin.aggarwal@enterprise-arch.io');

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

  // Google Sheet Inline Edits State (for 2-Way Google Sheet -> UI sync verification)
  const [sheetDraftEdits, setSheetDraftEdits] = useState<Record<string, { status: string; latest_comment: string }>>({});
  const [sheetNewUserRow, setSheetNewUserRow] = useState({ name: '', email: '', role: 'Author' as 'Super-Admin' | 'Author' | 'Member' });
  const [sheetEditorName, setSheetEditorName] = useState<string>('Marcus Vance');
  const [sheetEditorEmail, setSheetEditorEmail] = useState<string>('marcus.vance@enterprise-arch.io');
  const [sheetUrlInput, setSheetUrlInput] = useState<string>('');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const fetchChangelogData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'ALL') params.set('category', categoryFilter);
      if (sourceFilter !== 'ALL') params.set('source', sourceFilter);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const [res, sheetRes] = await Promise.all([
        fetch(`/api/changelog?${params.toString()}`),
        fetch('/api/changelog/sheet-sync'),
      ]);
      if (res.ok) {
        const data = await res.json();
        setChangelog(data.changelog || []);
        setTrackerItems(data.trackerItems || []);
        setComments(data.comments || []);
        setUsers(data.users || []);
        setSyncConfig(data.syncConfig || null);
        if (data.syncConfig?.spreadsheet_url && !sheetUrlInput) {
          setSheetUrlInput(data.syncConfig.spreadsheet_url);
        }
        if (data.stats) setStats(data.stats);

        // Initialize sheetDraftEdits from trackerItems
        const drafts: Record<string, { status: string; latest_comment: string }> = {};
        for (const item of data.trackerItems || []) {
          drafts[item.blueprint_code] = {
            status: item.status,
            latest_comment: item.latest_comment || '',
          };
        }
        setSheetDraftEdits(drafts);
      }
      if (sheetRes.ok) {
        const sData = await sheetRes.json();
        if (sData.appsScriptCode) setAppsScriptCode(sData.appsScriptCode);
      }
    } catch (err) {
      console.error('Failed to load changelog data:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, sourceFilter, searchQuery, sheetUrlInput]);

  useEffect(() => {
    fetchChangelogData();
  }, [fetchChangelogData]);

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
        showToast(`Status of ${selectedBpForStatus} updated to "${newStatusVal}" in UI & synced to Google Sheet!`);
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
        showToast(`Comment added to ${selectedBpForComment} in UI & synced to Google Sheet!`);
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
        showToast(`User "${addedLabel}" (${newUserRole}) recorded in UI & synced to Google Sheet [Users tab]!`);
        await fetchChangelogData();
      } else {
        showToast(data.error || 'Failed to add user.');
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleTwoWaySheetSync = async (fromSheetGrid = false) => {
    setSyncing(true);
    try {
      const trackerEdits = fromSheetGrid
        ? Object.entries(sheetDraftEdits).map(([blueprint_code, vals]) => ({
            blueprint_code,
            status: vals.status,
            latest_comment: vals.latest_comment,
          }))
        : [];

      const addedUsers =
        fromSheetGrid && sheetNewUserRow.name.trim() && sheetNewUserRow.email.trim()
          ? [
              {
                name: sheetNewUserRow.name.trim(),
                email: sheetNewUserRow.email.trim(),
                role: sheetNewUserRow.role,
              },
            ]
          : [];

      const res = await fetch('/api/changelog/sheet-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actorName: fromSheetGrid ? sheetEditorName : actorName,
          actorEmail: fromSheetGrid ? sheetEditorEmail : actorEmail,
          sheetEdits: {
            trackerEdits,
            addedUsers,
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        if (addedUsers.length > 0) {
          setSheetNewUserRow({ name: '', email: '', role: 'Author' });
        }
        showToast(data.message || '2-Way Google Sheet Sync completed!');
        await fetchChangelogData();
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveSheetUrl = async () => {
    if (!sheetUrlInput.trim()) return;
    setSyncing(true);
    try {
      const res = await fetch('/api/changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_SHEET_CONFIG',
          spreadsheet_url: sheetUrlInput.trim(),
        }),
      });
      if (res.ok) {
        showToast('Connected Google Sheet URL updated & 2-way sync bound!');
        await fetchChangelogData();
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Production Certified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'Approved':
        return 'bg-sky-50 text-sky-700 border-sky-300';
      case 'In Review':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Needs Revision':
        return 'bg-rose-50 text-rose-700 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900">
      {/* Dark Left Navigation Shell */}
      <UnifiedAppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dark Application Top Header */}
        <header className="dark sticky top-0 z-30 w-full bg-[#0B111E] border-b border-slate-800 text-white px-6 md:px-10 py-4">
          <div className="w-full max-w-none flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    Unified Governance Changelog &amp; 2-Way Google Sheets Sync
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    2-WAY LIVE SYNC ACTIVE
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-300 mt-0.5">
                  Every user addition, role update, review comment, and blueprint status change is attributed and synchronized bidirectionally between PromptCanvas UI and Google Sheets.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/api/changelog/sheet-sync?format=csv"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                Export Sheet (.CSV)
              </a>
              <button
                onClick={() => handleTwoWaySheetSync(false)}
                disabled={syncing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing UI ⇄ Google Sheet...' : 'Sync Now (2-Way UI ⇄ Sheet)'}
              </button>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Console
              </Link>
            </div>
          </div>
        </header>

        {/* Workspace Container (Strictly Light Mode, Full Width w-full max-w-none) */}
        <main className="w-full max-w-none px-6 md:px-10 py-6 space-y-6">
          {/* KPI Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Audited Changes</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.totalChanges}</div>
              <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Attributed
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
              <div className="text-xs text-slate-600 mt-1">UI &amp; Sheet inline notes</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Status Transitions</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.statusChanges}</div>
              <div className="text-xs text-slate-600 mt-1">Draft → Review → Certified</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">UI → Sheet Pushes</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                {syncConfig?.total_ui_to_sheet_pushes ?? stats.uiOriginated}
              </div>
              <div className="text-xs text-slate-600 mt-1">Real-time outbound sync</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700">Google Sheet → UI Pulls</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                {syncConfig?.total_sheet_to_ui_pulls ?? stats.sheetOriginated}
              </div>
              <div className="text-xs text-slate-600 mt-1">Inbound sheet cell diffs</div>
            </div>
          </div>

          {/* Connected Google Sheet Status & Actor Identity Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[300px]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Connected Google Sheet:
              </div>
              <input
                type="text"
                value={sheetUrlInput}
                onChange={(e) => setSheetUrlInput(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="flex-1 min-w-[260px] px-3 py-1.5 rounded-lg border border-slate-300 text-xs md:text-sm text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSaveSheetUrl}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer"
              >
                Bind Sheet URL
              </button>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Last synced by <span className="font-semibold text-slate-700">{syncConfig?.last_sync_actor || 'Auto-Sync Engine'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600">Active UI Actor:</span>
              <input
                type="text"
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-900 font-semibold w-36"
                placeholder="Your Name"
              />
              <input
                type="email"
                value={actorEmail}
                onChange={(e) => setActorEmail(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-700 w-52"
                placeholder="your.email@domain.com"
              />
            </div>
          </div>

          {/* Quick Live Action Cards: 1) Change Status, 2) Add Comment, 3) Add User / Change Role */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Card 1: Change Blueprint Status */}
            <form onSubmit={handleUiStatusChange} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                    <CheckCircle2 className="w-4 h-4" /> 1. Record Status Change (UI ⇄ Sheet)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Syncs to Tracker!E:E</span>
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
                Update Status &amp; Sync to Sheet
              </button>
            </form>

            {/* Card 2: Add Architecture Comment */}
            <form onSubmit={handleUiAddComment} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
                    <MessageSquarePlus className="w-4 h-4" /> 2. Add Review Comment (UI ⇄ Sheet)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Syncs to Comments!A:G</span>
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
                Post Comment &amp; Sync to Sheet
              </button>
            </form>

            {/* Card 3: Add User or Change User Role */}
            <form onSubmit={handleUiAddUser} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <UserPlus className="w-4 h-4" /> 3. Add User / Role Change (UI ⇄ Sheet)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Syncs to Users!A:F</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mt-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="e.g. Dr. Raj Patel"
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
                    placeholder="raj.patel@enterprise-arch.io"
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
                Add / Update User &amp; Sync to Sheet
              </button>
            </form>
          </div>

          {/* Primary Navigation Tabs: Unified Changelog Table vs Interactive 2-Way Google Sheet Twin vs Apps Script Webhook */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMainTab('unified_changelog')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition cursor-pointer ${
                    activeMainTab === 'unified_changelog'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <History className="w-4 h-4" />
                  Unified Audit Changelog ({changelog.length})
                </button>
                <button
                  onClick={() => setActiveMainTab('google_sheet_twin')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition cursor-pointer ${
                    activeMainTab === 'google_sheet_twin'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Interactive 2-Way Google Sheet Twin (4 Synchronized Tabs)
                </button>
                <button
                  onClick={() => setActiveMainTab('apps_script')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition cursor-pointer ${
                    activeMainTab === 'apps_script'
                      ? 'bg-indigo-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  Google Apps Script 2-Way Connector
                </button>
              </div>

              {activeMainTab === 'unified_changelog' && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search actor, blueprint, value, cell..."
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

                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="ALL">All Sources (UI + Google Sheet)</option>
                    <option value="UI">Origin: PromptCanvas UI</option>
                    <option value="GOOGLE_SHEET">Origin: Google Sheet</option>
                  </select>
                </div>
              )}
            </div>

            {/* TAB 1: UNIFIED AUDIT CHANGELOG TABLE */}
            {activeMainTab === 'unified_changelog' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <th className="py-3.5 px-5">When &amp; Sync Origin</th>
                      <th className="py-3.5 px-5">Who Changed It (Actor)</th>
                      <th className="py-3.5 px-5">Change Category</th>
                      <th className="py-3.5 px-5">Target Entity</th>
                      <th className="py-3.5 px-5">What Changed (Before → After)</th>
                      <th className="py-3.5 px-5">Google Sheet Cell &amp; Summary</th>
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
                            {entry.source === 'GOOGLE_SHEET' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                                <FileSpreadsheet className="w-3 h-3 text-teal-600" />
                                Edited in Google Sheet → UI
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                                <Sparkles className="w-3 h-3 text-indigo-600" />
                                Edited in UI → Synced to Sheet
                              </span>
                            )}
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
                          {entry.sheet_row_ref && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                              <FileSpreadsheet className="w-3 h-3" /> {entry.sheet_row_ref}
                            </span>
                          )}
                          <p className="text-xs text-slate-700 leading-relaxed">{entry.summary}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: INTERACTIVE 2-WAY GOOGLE SHEET TWIN */}
            {activeMainTab === 'google_sheet_twin' && (
              <div className="p-6 space-y-5">
                {/* Google Sheet Toolbar */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-base font-bold text-slate-900">
                        {syncConfig?.sheet_title || 'PromptCanvas — Master Architecture Governance & Changelog (2-Way Synced)'}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Edit any cell in the <strong>Tracker</strong> or <strong>Users</strong> sheet tab below and click{' '}
                      <strong>&ldquo;Commit Google Sheet Edits → Sync to UI&rdquo;</strong> to test real-time Sheet → UI synchronization.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-slate-700">Sheet Editor:</span>
                      <input
                        type="text"
                        value={sheetEditorName}
                        onChange={(e) => setSheetEditorName(e.target.value)}
                        className="px-2.5 py-1 rounded border border-emerald-300 bg-white text-slate-900 font-semibold w-36"
                      />
                    </div>
                    <button
                      onClick={() => handleTwoWaySheetSync(true)}
                      disabled={syncing}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs transition cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                      Commit Google Sheet Edits → Sync to UI
                    </button>
                  </div>
                </div>

                {/* Sheet Bottom-Style Tab Selector */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  {(['Tracker', 'Users', 'Comments', 'Changelog'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSheetTab(tab)}
                      className={`px-4 py-2 rounded-t-lg text-xs font-bold border-b-2 transition cursor-pointer ${
                        activeSheetTab === tab
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                          : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      Sheet Tab: {tab}
                    </button>
                  ))}
                </div>

                {/* Sheet Sub-Tab 1: Tracker */}
                {activeSheetTab === 'Tracker' && (
                  <div className="overflow-x-auto border border-slate-300 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-200 text-slate-700 font-mono text-[11px] border-b border-slate-300">
                          <th className="py-1.5 px-3 border-r border-slate-300 w-10 text-center">#</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">A • Blueprint Code</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">B • Blueprint Name</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">C • Layer</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">D • Status (Editable in Sheet)</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">E • Owner</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">F • Latest Review Comment (Editable in Sheet)</th>
                          <th className="py-1.5 px-3">G • Last Modified By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {trackerItems.map((item) => {
                          const draft = sheetDraftEdits[item.blueprint_code] || {
                            status: item.status,
                            latest_comment: item.latest_comment || '',
                          };
                          return (
                            <tr key={item.id} className="hover:bg-emerald-50/30">
                              <td className="py-2.5 px-3 border-r border-slate-200 bg-slate-100 font-mono text-center font-bold text-slate-500">
                                {item.sheet_row_number}
                              </td>
                              <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                                {item.blueprint_code}
                              </td>
                              <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-900">
                                {item.blueprint_name}
                              </td>
                              <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                                {item.domain_layer}
                              </td>
                              <td className="py-2 px-3 border-r border-slate-200">
                                <select
                                  value={draft.status}
                                  onChange={(e) =>
                                    setSheetDraftEdits((prev) => ({
                                      ...prev,
                                      [item.blueprint_code]: {
                                        ...draft,
                                        status: e.target.value,
                                      },
                                    }))
                                  }
                                  className={`px-2.5 py-1 rounded border text-xs font-bold ${getStatusBadgeClass(draft.status)}`}
                                >
                                  {STATUS_OPTIONS.map((st) => (
                                    <option key={st} value={st}>
                                      {st}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-2.5 px-3 border-r border-slate-200">
                                <div className="font-semibold text-slate-800">{item.owner_name}</div>
                                <div className="text-[11px] text-slate-500">{item.owner_email}</div>
                              </td>
                              <td className="py-2 px-3 border-r border-slate-200 min-w-[280px]">
                                <input
                                  type="text"
                                  value={draft.latest_comment}
                                  onChange={(e) =>
                                    setSheetDraftEdits((prev) => ({
                                      ...prev,
                                      [item.blueprint_code]: {
                                        ...draft,
                                        latest_comment: e.target.value,
                                      },
                                    }))
                                  }
                                  className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                              <td className="py-2.5 px-3 text-slate-600 font-medium">
                                {item.last_modified_by}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sheet Sub-Tab 2: Users */}
                {activeSheetTab === 'Users' && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto border border-slate-300 rounded-lg">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-200 text-slate-700 font-mono text-[11px] border-b border-slate-300">
                            <th className="py-1.5 px-3 border-r border-slate-300 w-10 text-center">#</th>
                            <th className="py-1.5 px-3 border-r border-slate-300">A • Full Name</th>
                            <th className="py-1.5 px-3 border-r border-slate-300">B • Email Address</th>
                            <th className="py-1.5 px-3 border-r border-slate-300">C • Global Role</th>
                            <th className="py-1.5 px-3">D • Provisioned Timestamp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {users.map((u, idx) => (
                            <tr key={u.id} className="hover:bg-emerald-50/30">
                              <td className="py-2 px-3 border-r border-slate-200 bg-slate-100 font-mono text-center font-bold text-slate-500">
                                {idx + 2}
                              </td>
                              <td className="py-2 px-3 border-r border-slate-200 font-bold text-slate-900">
                                {u.name || 'Enterprise User'}
                              </td>
                              <td className="py-2 px-3 border-r border-slate-200 font-mono text-slate-700">
                                {u.email}
                              </td>
                              <td className="py-2 px-3 border-r border-slate-200">
                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                                  {u.global_role || 'Author'}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-500">
                                {u.created_at ? new Date(u.created_at).toLocaleString() : 'Synced'}
                              </td>
                            </tr>
                          ))}
                          {/* New Row in Google Sheet to add a user directly from the Sheet */}
                          <tr className="bg-emerald-50/50">
                            <td className="py-2 px-3 border-r border-slate-200 font-mono text-center font-bold text-emerald-700">
                              +
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200">
                              <input
                                type="text"
                                value={sheetNewUserRow.name}
                                onChange={(e) => setSheetNewUserRow((p) => ({ ...p, name: e.target.value }))}
                                placeholder="Add new user name in Sheet row..."
                                className="w-full px-2.5 py-1 rounded border border-emerald-300 bg-white text-xs text-slate-900"
                              />
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200">
                              <input
                                type="email"
                                value={sheetNewUserRow.email}
                                onChange={(e) => setSheetNewUserRow((p) => ({ ...p, email: e.target.value }))}
                                placeholder="new.user@enterprise-arch.io"
                                className="w-full px-2.5 py-1 rounded border border-emerald-300 bg-white text-xs text-slate-900"
                              />
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200">
                              <select
                                value={sheetNewUserRow.role}
                                onChange={(e) =>
                                  setSheetNewUserRow((p) => ({
                                    ...p,
                                    role: e.target.value as 'Super-Admin' | 'Author' | 'Member',
                                  }))
                                }
                                className="px-2.5 py-1 rounded border border-emerald-300 bg-white text-xs font-bold text-slate-900"
                              >
                                <option value="Author">Author</option>
                                <option value="Super-Admin">Super-Admin</option>
                                <option value="Member">Member</option>
                              </select>
                            </td>
                            <td className="py-2 px-3 text-emerald-800 font-semibold">
                              Click &ldquo;Commit Google Sheet Edits&rdquo; above to sync new user to UI
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Sheet Sub-Tab 3: Comments */}
                {activeSheetTab === 'Comments' && (
                  <div className="overflow-x-auto border border-slate-300 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-200 text-slate-700 font-mono text-[11px] border-b border-slate-300">
                          <th className="py-1.5 px-3 border-r border-slate-300 w-10 text-center">#</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">A • Blueprint ID</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">B • Author</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">C • Comment Text</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">D • Origin</th>
                          <th className="py-1.5 px-3">E • Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {comments.map((c, idx) => (
                          <tr key={c.id}>
                            <td className="py-2 px-3 border-r border-slate-200 bg-slate-100 font-mono text-center font-bold text-slate-500">
                              {idx + 2}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                              {c.target_id}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">
                              {c.author_name} ({c.author_email})
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 text-slate-800">
                              {c.comment_text}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-bold text-slate-700">
                              {c.source}
                            </td>
                            <td className="py-2 px-3 text-slate-500">
                              {new Date(c.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sheet Sub-Tab 4: Changelog */}
                {activeSheetTab === 'Changelog' && (
                  <div className="overflow-x-auto border border-slate-300 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-200 text-slate-700 font-mono text-[11px] border-b border-slate-300">
                          <th className="py-1.5 px-3 border-r border-slate-300 w-10 text-center">#</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">A • Timestamp</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">B • Category</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">C • Who Changed</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">D • Target</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">E • Before</th>
                          <th className="py-1.5 px-3 border-r border-slate-300">F • After</th>
                          <th className="py-1.5 px-3">G • Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {changelog.map((c, idx) => (
                          <tr key={c.id}>
                            <td className="py-2 px-3 border-r border-slate-200 bg-slate-100 font-mono text-center font-bold text-slate-500">
                              {idx + 2}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-mono text-slate-600">
                              {new Date(c.created_at).toLocaleString()}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-bold text-slate-900">
                              {c.event_category}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">
                              {c.actor_name}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 text-slate-800">
                              {c.entity_name}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 text-rose-700">
                              {c.old_value || '—'}
                            </td>
                            <td className="py-2 px-3 border-r border-slate-200 font-bold text-emerald-800">
                              {c.new_value || '—'}
                            </td>
                            <td className="py-2 px-3 font-bold text-slate-700">{c.source}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GOOGLE APPS SCRIPT 2-WAY WEBHOOK CONNECTOR */}
            {activeMainTab === 'apps_script' && (
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Google Sheets `onEdit(e)` 2-Way Live Webhook Script
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Paste this into <strong>Extensions → Apps Script</strong> inside your Google Sheet to stream every cell edit (User added, Role changed, Comment added, Status changed) into PromptCanvas in real time.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(appsScriptCode);
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 2500);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedScript ? 'Copied to Clipboard!' : 'Copy Apps Script Code'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                  {appsScriptCode}
                </pre>
              </div>
            )}
          </div>
        </main>

        {/* Compact Non-Blocking Bottom-Right Toast */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-[420px] p-3.5 rounded-xl bg-slate-900 text-white border border-emerald-500/40 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
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
