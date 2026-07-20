'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Lock, ArrowLeft, Clock, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { AccessRequestModal } from './AccessRequestModal';

interface AccessRestrictedScreenProps {
  diagramId: string;
  diagramName?: string;
  pendingRequest?: { id: string; requested_role: string; status: string; created_at: string } | null;
  onAccessRequested?: (request: any) => void;
  onOpenAuth?: () => void;
  isAuthenticated?: boolean;
}

export function AccessRestrictedScreen({
  diagramId,
  diagramName,
  pendingRequest: initialPendingRequest,
  onAccessRequested,
  onOpenAuth,
  isAuthenticated = true,
}: AccessRestrictedScreenProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(initialPendingRequest);

  const handleRequestSuccess = (newRequest: any) => {
    setPendingRequest(newRequest);
    if (onAccessRequested) {
      onAccessRequested(newRequest);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070a13] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-rose-500/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-teal-500/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-6">
        {/* Shield Icon */}
        <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-rose-500/10">
          <ShieldAlert className="w-10 h-10 text-rose-400" />
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> 403 Forbidden Access
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Access Restricted
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-md mx-auto">
            You do not have permission to view or edit <span className="text-teal-300 font-bold">{diagramName || 'this architecture diagram'}</span>. 
            This diagram is private and owned by another Cloud Architect.
          </p>
        </div>

        {/* Request Access Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Dashboard
          </Link>

          {!isAuthenticated ? (
            <button
              id="restricted-signin-btn"
              onClick={onOpenAuth}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-bold text-xs transition-all shadow-lg shadow-teal-500/20 w-full sm:w-auto"
            >
              Sign In to Request Access
            </button>
          ) : pendingRequest && pendingRequest.status === 'Pending' ? (
            <div
              id="access-request-pending-badge"
              className="px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 cursor-not-allowed opacity-90 shadow-md"
            >
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Access Request Pending ({pendingRequest.requested_role} Access)</span>
            </div>
          ) : (
            <button
              id="restricted-request-access-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-bold text-xs tracking-wide transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.02] flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Send className="w-4 h-4" /> Request Access
            </button>
          )}
        </div>
      </div>

      <AccessRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        diagramId={diagramId}
        diagramName={diagramName}
        onSuccess={handleRequestSuccess}
      />
    </div>
  );
}
