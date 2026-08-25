'use client';

import React, { useState } from 'react';
import {
  Users,
  Share2,
  Check,
  Circle,
  Shield,
  Cpu,
  Sparkles,
  Lock
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  initials: string;
  activeSection: string;
  status: 'active' | 'idle';
}

const DEMO_COLLABORATORS: Collaborator[] = [
  {
    id: 'collab-1',
    name: 'Sarah Chen',
    role: 'Principal Cloud Architect',
    avatarColor: 'bg-purple-600',
    initials: 'SC',
    activeSection: 'Ch. 2 System Topology',
    status: 'active',
  },
  {
    id: 'collab-2',
    name: 'David Miller',
    role: 'Lead DevOps / SRE',
    avatarColor: 'bg-sky-600',
    initials: 'DM',
    activeSection: 'Terraform IaC Module',
    status: 'active',
  },
  {
    id: 'collab-3',
    name: 'Alex Thorne',
    role: 'Product Director',
    avatarColor: 'bg-emerald-600',
    initials: 'AT',
    activeSection: 'Ch. 1 Business Vision',
    status: 'active',
  },
  {
    id: 'collab-4',
    name: 'Elena Rostova',
    role: 'Chief InfoSec Officer',
    avatarColor: 'bg-rose-600',
    initials: 'ER',
    activeSection: 'Ch. 4 STRIDE Threat Model',
    status: 'active',
  },
];

interface CollaborativeTeamPresenceProps {
  projectId: string;
  isLight: boolean;
}

export default function CollaborativeTeamPresence({
  projectId,
  isLight,
}: CollaborativeTeamPresenceProps) {
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const handleShareRoomLink = () => {
    if (typeof window !== 'undefined') {
      const roomUrl = `${window.location.origin}/docgen?proj=${projectId || 'room_alpha'}&collab=true`;
      navigator.clipboard.writeText(roomUrl);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border transition-all no-print ${
      isLight ? 'bg-white border-slate-200/90 shadow-xs' : 'bg-[#0B111E]/80 border-slate-800/80 shadow-xs'
    }`}>
      {/* Left: Active Presence Count & Avatars */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>4 Collaborators Online</span>
        </div>

        {/* Stacked Avatar Pods */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          {DEMO_COLLABORATORS.map((collab) => (
            <div
              key={collab.id}
              className={`relative inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-[11px] font-bold ring-2 ring-white dark:ring-slate-900 shadow-sm cursor-pointer ${collab.avatarColor}`}
              title={`${collab.name} (${collab.role}) - Currently editing ${collab.activeSection}`}
            >
              {collab.initials}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-white dark:border-slate-900 rounded-full" />
            </div>
          ))}
        </div>

        {/* Live Active Tag */}
        <span className="hidden md:inline-flex text-[11px] text-slate-400 font-mono">
          Live Real-Time Co-Authoring &bull; Room <span className="text-sky-500 font-bold">#{projectId ? projectId.slice(-6) : '8a9f2b'}</span>
        </span>
      </div>

      {/* Right: Share Room Link Button */}
      <button
        onClick={handleShareRoomLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/15 hover:text-sky-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
        title="Copy real-time collaborative workspace link"
      >
        {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
        <span>{copiedSuccess ? 'Room Link Copied!' : 'Invite Collaborators'}</span>
      </button>
    </div>
  );
}
