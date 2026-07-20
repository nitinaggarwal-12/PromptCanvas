'use client';

import React, { useState } from 'react';
import { X, Shield, Eye, Edit3, MessageSquare, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramId: string;
  diagramName?: string;
  onSuccess: (request: any) => void;
}

export function AccessRequestModal({ isOpen, onClose, diagramId, diagramName, onSuccess }: AccessRequestModalProps) {
  const [requestedRole, setRequestedRole] = useState<'Viewer' | 'Editor'>('Viewer');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/access-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagramId,
          requestedRole,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit access request.');
      }

      onSuccess(data.accessRequest);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0b101d] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-teal-500/10 text-white">
        <button
          onClick={onClose}
          id="access-modal-close-btn"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" /> Item-Level Authorization
          </div>
          <h2 className="text-2xl font-extrabold text-white">Request Access</h2>
          <p className="text-xs text-slate-400">
            Request permission from the diagram owner to access <span className="text-teal-300 font-semibold">{diagramName || 'this architecture blueprint'}</span>.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Desired Permission Level</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="role-btn-viewer"
                onClick={() => setRequestedRole('Viewer')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  requestedRole === 'Viewer'
                    ? 'bg-teal-500/10 border-teal-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4 text-teal-400 mb-1" />
                <div className="text-xs font-bold text-white">View Access</div>
                <div className="text-[11px] text-slate-400">Inspect & read diagram versions</div>
              </button>

              <button
                type="button"
                id="role-btn-editor"
                onClick={() => setRequestedRole('Editor')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  requestedRole === 'Editor'
                    ? 'bg-indigo-500/10 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-4 h-4 text-indigo-400 mb-1" />
                <div className="text-xs font-bold text-white">Edit Access</div>
                <div className="text-[11px] text-slate-400">Modify diagram & save versions</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Justification Note (Optional)</label>
            <textarea
              id="access-request-message"
              placeholder="Explain why you need access to this cloud architecture diagram..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-teal-400 text-xs text-white placeholder-slate-500 outline-none transition-colors resize-none"
            />
          </div>

          <button
            id="submit-access-request-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-bold text-xs tracking-wide transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Request...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Access Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
