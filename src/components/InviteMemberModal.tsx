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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0b101d] border border-panel-border/80 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-panel-border/50 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">Invite Team Member</h3>
              <p className="text-sm text-slate-300 truncate max-w-[320px]">Workspace: {workspaceName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm rounded-xl font-medium flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Address Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-teal-accent" />
              <span>Collaborator Email Address</span>
            </label>
            <input
              id="invite-member-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@company.com"
              className="w-full bg-[#070a13] border border-panel-border/70 rounded-2xl px-4 py-3.5 text-sm md:text-base text-white placeholder:text-slate-600 outline-none focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20"
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Workspace Role & Permissions</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('Editor')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  role === 'Editor'
                    ? 'bg-teal-500/10 border-teal-400 text-teal-300 font-bold'
                    : 'bg-slate-900/40 border-panel-border/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="text-sm font-extrabold">Editor</p>
                <p className="text-xs opacity-80 mt-1">Can create, edit, & update diagrams</p>
              </button>

              <button
                type="button"
                onClick={() => setRole('Viewer')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  role === 'Viewer'
                    ? 'bg-indigo-500/10 border-indigo-400 text-indigo-300 font-bold'
                    : 'bg-slate-900/40 border-panel-border/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="text-sm font-extrabold">Viewer</p>
                <p className="text-xs opacity-80 mt-1">Read-only view access to workspace</p>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-panel-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl text-sm font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-invite-member-btn"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-extrabold text-sm md:text-base transition-all cursor-pointer shadow-lg shadow-teal-500/20 hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Inviting...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
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
