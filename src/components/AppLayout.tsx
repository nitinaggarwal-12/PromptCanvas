'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Workspace } from '@/lib/db';
import { Plus, X, Building2, Loader2 } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; global_role?: string; is_super_admin?: boolean } | null>(null);
  const [personalWorkspace, setPersonalWorkspace] = useState<Workspace | null>(null);
  const [sharedWorkspaces, setSharedWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const fetchWorkspaces = useCallback(async () => {
    try {
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();

      if (authData.authenticated && authData.user) {
        setUser(authData.user);

        const wsRes = await fetch('/api/workspaces');
        const wsData = await wsRes.json();

        if (wsData.success && wsData.data) {
          setPersonalWorkspace(wsData.data.personalWorkspace);
          setSharedWorkspaces(wsData.data.sharedWorkspaces || []);

          // Set active workspace ID from URL or default to personal
          const urlWs = searchParams?.get('workspace');
          if (urlWs) {
            setActiveWorkspaceId(urlWs);
          } else if (wsData.data.personalWorkspace) {
            setActiveWorkspaceId(wsData.data.personalWorkspace.id);
          }
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error in AppLayout workspace sync:', err);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const handleSelectWorkspace = (workspaceId: string) => {
    setActiveWorkspaceId(workspaceId);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('workspace', workspaceId);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  };

  const handleCreateTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    setIsCreatingTeam(true);
    try {
      const res = await fetch('/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTeamName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create team workspace.');
      }

      setNewTeamName('');
      setIsCreateTeamModalOpen(false);
      await fetchWorkspaces();

      if (data.workspace) {
        handleSelectWorkspace(data.workspace.id);
      }
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error creating team workspace');
    } finally {
      setIsCreatingTeam(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#070a13] text-slate-100 overflow-hidden font-sans selection:bg-teal-500/30">
      
      {/* 1. PERSISTENT LEFT SIDEBAR */}
      <Sidebar
        currentUser={user}
        personalWorkspace={personalWorkspace}
        sharedWorkspaces={sharedWorkspaces}
        activeWorkspaceId={activeWorkspaceId}
        onSelectWorkspace={handleSelectWorkspace}
        onCreateTeamClick={() => setIsCreateTeamModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. MAIN CONTENT VIEWPORT */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {children}
      </main>

      {/* CREATE TEAM WORKSPACE MODAL */}
      {isCreateTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0b101d] border border-panel-border/80 rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-panel-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-accent">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create Team Workspace</h3>
                  <p className="text-xs text-slate-400">Collaborate on architecture diagrams with team members</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateTeamModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Team Workspace Name
                </label>
                <input
                  id="create-team-name-input"
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g., Cloud Infra Engineering"
                  className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400/60"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-panel-border/40">
                <button
                  type="button"
                  onClick={() => setIsCreateTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-create-team-btn"
                  disabled={isCreatingTeam}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isCreatingTeam ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Workspace</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
