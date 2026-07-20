'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Network, 
  User, 
  Users, 
  Plus, 
  LogOut, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  LayoutGrid,
  ShieldAlert,
  Settings,
  FolderGit2
} from 'lucide-react';
import { Workspace } from '@/lib/db';

interface SidebarProps {
  currentUser: { id: string; email: string; name?: string | null; global_role?: string; is_super_admin?: boolean } | null;
  personalWorkspace: Workspace | null;
  sharedWorkspaces: Workspace[];
  activeWorkspaceId: string | null;
  onSelectWorkspace: (workspaceId: string) => void;
  onCreateTeamClick: () => void;
  onLogout: () => void;
}

export function Sidebar({
  currentUser,
  personalWorkspace,
  sharedWorkspaces,
  activeWorkspaceId,
  onSelectWorkspace,
  onCreateTeamClick,
  onLogout,
}: SidebarProps) {
  const router = useRouter();
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);

  const isSuperAdmin = currentUser?.is_super_admin || currentUser?.global_role === 'Super-Admin';

  return (
    <aside className="w-64 h-screen bg-[#070a13] border-r border-panel-border/60 flex flex-col justify-between shrink-0 font-sans selection:bg-teal-500/30">
      
      {/* 1. Header: Branding & Logo */}
      <div className="p-5 border-b border-panel-border/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-bg-dark font-black shadow-lg shadow-teal-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wide uppercase">PromptCanvas</h1>
            <p className="text-[10px] text-teal-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Multi-Tenant Workspace
            </p>
          </div>
        </div>
      </div>

      {/* 2. Workspace Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        
        {/* Navigation Core Tabs */}
        <div className="space-y-1">
          <Link href="/dashboard" className="block">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
              <LayoutGrid className="w-4 h-4 text-slate-500" />
              <span>Dashboard Overview</span>
            </div>
          </Link>
          {isSuperAdmin && (
            <Link href="/admin" className="block">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 transition-all">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Super-Admin Hub</span>
              </div>
            </Link>
          )}
        </div>

        {/* SECTION 1: Personal Canvas */}
        <div className="space-y-2">
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>My Canvas</span>
            <User className="w-3 h-3 text-slate-600" />
          </div>

          {personalWorkspace && (
            <button
              type="button"
              onClick={() => onSelectWorkspace(personalWorkspace.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                activeWorkspaceId === personalWorkspace.id
                  ? 'bg-teal-500/10 border-teal-500/50 text-teal-300 shadow-md shadow-teal-500/5 border-l-4 border-l-teal-400'
                  : 'bg-slate-900/40 border-panel-border/30 text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 font-black text-[10px] flex items-center justify-center shrink-0">
                  P
                </div>
                <span className="truncate">{personalWorkspace.name}</span>
              </div>
              {activeWorkspaceId === personalWorkspace.id && (
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
              )}
            </button>
          )}
        </div>

        {/* SECTION 2: Shared Teams (Collapsible) */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsTeamsOpen(!isTeamsOpen)}
            className="w-full px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between hover:text-slate-300 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-slate-500" />
              <span>Shared Teams</span>
            </div>
            {isTeamsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {isTeamsOpen && (
            <div className="space-y-1 pl-1">
              {sharedWorkspaces.length === 0 ? (
                <p className="text-[11px] text-slate-600 italic px-3 py-1">No team workspaces joined yet.</p>
              ) : (
                sharedWorkspaces.map((ws) => {
                  const isActive = activeWorkspaceId === ws.id;
                  return (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => onSelectWorkspace(ws.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer border ${
                        isActive
                          ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-300 shadow-md border-l-4 border-l-indigo-400 font-bold'
                          : 'bg-slate-900/20 border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-[9px] flex items-center justify-center shrink-0">
                          {ws.name[0].toUpperCase()}
                        </div>
                        <span className="truncate">{ws.name}</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {ws.user_role || 'Member'}
                      </span>
                    </button>
                  );
                })
              )}

              {/* Action Button: Create Team Workspace */}
              <button
                type="button"
                id="sidebar-create-team-btn"
                onClick={onCreateTeamClick}
                className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-panel-border/70 hover:border-teal-500/50 text-slate-400 hover:text-teal-300 text-xs font-bold transition-all hover:bg-teal-500/5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-teal-accent" />
                <span>Create Team Workspace</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer: User Profile & Logout */}
      {currentUser && (
        <div className="p-4 border-t border-panel-border/40 bg-[#090d18] flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold flex items-center justify-center text-xs shrink-0">
              {(currentUser.name || currentUser.email)[0].toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{currentUser.name || currentUser.email.split('@')[0]}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
            </div>
          </div>

          <button
            type="button"
            id="sidebar-signout-btn"
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
}
