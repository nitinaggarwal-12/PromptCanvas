'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Check,
  ShieldCheck
} from 'lucide-react';

interface ActiveSessionPeer {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  initials: string;
}

interface CollaborativeTeamPresenceProps {
  projectId: string;
  isLight: boolean;
}

export default function CollaborativeTeamPresence({
  projectId,
  isLight,
}: CollaborativeTeamPresenceProps) {
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ActiveSessionPeer>({
    id: 'session-self',
    name: 'Lead Architect (You)',
    role: 'Active Authoring Session',
    avatarColor: 'bg-sky-600',
    initials: 'LA',
  });
  const [peerCount, setPeerCount] = useState<number>(1);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!mounted || !data?.user) return;
        const displayName = data.user.name || data.user.email || 'Lead Architect';
        const parts = String(displayName).trim().split(/\s+/);
        const initials =
          parts.length >= 2
            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
            : String(displayName).slice(0, 2).toUpperCase();
        setCurrentUser({
          id: String(data.user.id || 'session-self'),
          name: `${displayName} (You)`,
          role: data.user.is_guest ? 'Guest Workspace Session' : 'Authenticated Architect',
          avatarColor: 'bg-sky-600',
          initials: initials || 'LA',
        });
      })
      .catch(() => {
        // Keep default local session descriptor if offline
      });

    // Track real multi-tab presence via BroadcastChannel when available
    let channel: BroadcastChannel | null = null;
    const peers = new Set<string>();
    const tabId = `tab_${Math.random().toString(36).slice(2, 9)}`;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel(`promptcanvas_presence_${projectId || 'default'}`);
        channel.onmessage = (ev) => {
          if (ev.data?.type === 'ping' && ev.data?.tabId) {
            peers.add(ev.data.tabId);
            if (mounted) setPeerCount(1 + peers.size);
            channel?.postMessage({ type: 'pong', tabId });
          } else if (ev.data?.type === 'pong' && ev.data?.tabId) {
            peers.add(ev.data.tabId);
            if (mounted) setPeerCount(1 + peers.size);
          } else if (ev.data?.type === 'leave' && ev.data?.tabId) {
            peers.delete(ev.data.tabId);
            if (mounted) setPeerCount(1 + peers.size);
          }
        };
        channel.postMessage({ type: 'ping', tabId });
      } catch {
        // Ignore BroadcastChannel errors in restricted contexts
      }
    }

    return () => {
      mounted = false;
      if (channel) {
        try {
          channel.postMessage({ type: 'leave', tabId });
          channel.close();
        } catch {
          // Ignore close errors
        }
      }
    };
  }, [projectId]);

  const handleShareRoomLink = () => {
    if (typeof window !== 'undefined') {
      const roomUrl = `${window.location.origin}/docgen?proj=${encodeURIComponent(projectId || 'default')}`;
      navigator.clipboard.writeText(roomUrl);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border transition-all no-print ${
      isLight ? 'bg-white border-slate-200/90 shadow-xs' : 'bg-[#0B111E]/80 border-slate-800/80 shadow-xs'
    }`}>
      {/* Left: Real Active Session Presence */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{peerCount === 1 ? '1 Active Session (You)' : `${peerCount} Active Sessions`}</span>
        </div>

        {/* Authenticated User Avatar Pod */}
        <div className="flex items-center gap-2">
          <div
            className={`relative inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-[11px] font-bold ring-2 ring-white dark:ring-slate-900 shadow-sm ${currentUser.avatarColor}`}
            title={`${currentUser.name} — ${currentUser.role}`}
          >
            {currentUser.initials}
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-white dark:border-slate-900 rounded-full" />
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
            {currentUser.name}
          </span>
        </div>

        {/* Workspace Sync Status */}
        <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
          <span>Workspace <span className="text-sky-500 font-bold">#{projectId ? projectId.slice(-6) : 'active'}</span></span>
        </span>
      </div>

      {/* Right: Share Workspace Link Button */}
      <button
        onClick={handleShareRoomLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/15 hover:text-sky-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
        title="Copy direct document workspace link"
      >
        {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
        <span>{copiedSuccess ? 'Workspace Link Copied!' : 'Share Workspace Link'}</span>
      </button>
    </div>
  );
}
