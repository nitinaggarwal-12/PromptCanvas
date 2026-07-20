'use client';

import React, { useState } from 'react';
import { Users, Mail, Shield, UserPlus, X, CheckCircle2, Loader2 } from 'lucide-react';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  workspaceName: string;
  onMemberInvited?: () => void;
}

export function InviteMemberModal({
  isOpen,
  onClose,
  workspaceId,
  workspaceName,
  onMemberInvited,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Editor' | 'Viewer'>('Editor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to invite member.');
      }

      setSuccessMsg(`Successfully granted ${role} access to ${email.trim()}!`);
      setEmail('');
      if (onMemberInvited) onMemberInvited();

      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Error inviting team member');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0b101d] border border-panel-border/80 rounded-2xl p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Invite Team Member</h3>
              <p className="text-xs text-slate-400 truncate max-w-[240px]">Workspace: {workspaceName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-lg font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-teal-accent" />
              <span>Collaborator Email Address</span>
            </label>
            <input
              id="invite-member-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@company.com"
              className="w-full bg-[#070a13] border border-panel-border/70 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/20"
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Workspace Role & Permissions</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('Editor')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  role === 'Editor'
                    ? 'bg-teal-500/10 border-teal-400 text-teal-300 font-bold'
                    : 'bg-slate-900/40 border-panel-border/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="text-xs font-bold">Editor</p>
                <p className="text-[10px] opacity-75 mt-0.5">Can create, edit, & update diagrams</p>
              </button>

              <button
                type="button"
                onClick={() => setRole('Viewer')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  role === 'Viewer'
                    ? 'bg-indigo-500/10 border-indigo-400 text-indigo-300 font-bold'
                    : 'bg-slate-900/40 border-panel-border/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="text-xs font-bold">Viewer</p>
                <p className="text-[10px] opacity-75 mt-0.5">Read-only view access to workspace</p>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-panel-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-invite-member-btn"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Inviting...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
