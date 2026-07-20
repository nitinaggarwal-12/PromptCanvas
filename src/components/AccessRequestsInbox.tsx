'use client';

import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Check, X, Loader2, AlertCircle, Sparkles, Inbox } from 'lucide-react';

interface AccessRequestItem {
  id: string;
  diagram_id: string;
  requester_user_id: string;
  requested_role: 'Viewer' | 'Editor';
  status: string;
  message: string | null;
  created_at: string;
  requester_email?: string;
  requester_name?: string | null;
  diagram_name?: string;
}

interface AccessRequestsInboxProps {
  user: { id: string; email: string } | null;
}

export function AccessRequestsInbox({ user }: AccessRequestsInboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState<AccessRequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch('/api/access-requests');
      const data = await res.json();
      if (res.ok && data.pendingForOwner) {
        setRequests(data.pendingForOwner);
      }
    } catch (err) {
      console.error('Failed to fetch access requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (requestId: string, status: 'Approved' | 'Denied') => {
    setActionLoadingId(requestId);
    setError(null);

    try {
      const res = await fetch(`/api/access-requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Failed to ${status.toLowerCase()} request.`);
      }

      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!user) return null;

  const pendingCount = requests.length;

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        id="access-requests-bell-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchRequests();
        }}
        className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white transition-colors"
        title="Access Requests Inbox"
      >
        <Bell className="w-4 h-4" />
        {pendingCount > 0 && (
          <span
            id="access-requests-badge-count"
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-accent text-[#070a13] font-black text-[10px] flex items-center justify-center shadow-lg animate-pulse"
          >
            {pendingCount}
          </span>
        )}
      </button>

      {/* Slide-over Inbox Panel / Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-[#0b101d] border border-slate-800 rounded-2xl p-5 shadow-2xl shadow-teal-500/10 z-50 text-white animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-sm text-white">Access Requests</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
              {pendingCount} Pending
            </span>
          </div>

          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="py-8 flex justify-center text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
            </div>
          ) : requests.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
              <Inbox className="w-8 h-8 text-slate-600" />
              <span>No pending access requests for your diagrams.</span>
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-xs text-white">
                        {req.requester_name || req.requester_email}
                      </span>
                      <p className="text-[11px] text-teal-300">
                        Diagram: <span className="font-semibold text-white">{req.diagram_name}</span>
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-500/10 text-teal-400 border border-teal-500/30">
                      {req.requested_role}
                    </span>
                  </div>

                  {req.message && (
                    <p className="text-xs text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 italic">
                      &quot;{req.message}&quot;
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      id={`deny-btn-${req.id}`}
                      onClick={() => handleResolve(req.id, 'Denied')}
                      disabled={actionLoadingId === req.id}
                      className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1 border border-rose-500/30 transition-colors disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" /> Deny
                    </button>

                    <button
                      id={`approve-btn-${req.id}`}
                      onClick={() => handleResolve(req.id, 'Approved')}
                      disabled={actionLoadingId === req.id}
                      className="px-3 py-1 rounded-lg bg-teal-accent hover:bg-teal-hover text-[#070a13] text-xs font-bold flex items-center gap-1 shadow-md transition-all disabled:opacity-50"
                    >
                      {actionLoadingId === req.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
