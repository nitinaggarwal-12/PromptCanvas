'use client';

import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  Users,
  MessageSquare,
  Shield,
  Layers,
  FileText,
  Network,
  ExternalLink,
  UserCheck
} from 'lucide-react';
import { AstComponent } from '@/lib/ast/architectureAst';
import { LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';
import { getPublicAppOrigin } from '@/lib/appOrigin';
import { copyTextToClipboard } from '@/lib/clipboard';

type ShareRole = 'viewer' | 'commenter' | 'editor';
interface StoredComment { id: string; author: string; role: string; text: string; time: string }

function loadStoredRole(targetId: string): ShareRole {
  if (typeof window === 'undefined' || !targetId) return 'commenter';
  const saved = window.localStorage.getItem(`promptcanvas_share_role_${targetId}`);
  return saved === 'viewer' || saved === 'commenter' || saved === 'editor' ? saved : 'commenter';
}

function loadStoredComments(targetId: string): StoredComment[] {
  if (typeof window === 'undefined' || !targetId) return [];
  try {
    const raw = window.localStorage.getItem(`promptcanvas_object_comments_${targetId}`);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export interface ObjectShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'project' | 'doc' | 'node' | 'version';
  targetId: string;
  targetTitle: string;
  projectTitle: string;
  domain: string;
  activeVersionTag: string;
  activeDoc?: LivingSpecDocument;
  activeNode?: AstComponent | null;
}

export function ObjectShareModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
  projectTitle,
  domain,
  activeVersionTag,
  activeDoc,
  activeNode
}: ObjectShareModalProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [accessRole, setAccessRole] = useState<'viewer' | 'commenter' | 'editor'>(() => loadStoredRole(targetId));
  const [comments, setComments] = useState<StoredComment[]>(() => loadStoredComments(targetId));
  const [newComment, setNewComment] = useState('');

  // Re-hydrate when the anchored object changes. Adjusting state during render for a
  // changed prop is React's recommended alternative to setState inside an effect.
  const [hydratedFor, setHydratedFor] = useState(targetId);
  if (hydratedFor !== targetId) {
    setHydratedFor(targetId);
    setAccessRole(loadStoredRole(targetId));
    setComments(loadStoredComments(targetId));
  }

  const handleSelectRole = (role: 'viewer' | 'commenter' | 'editor') => {
    setAccessRole(role);
    if (typeof window !== 'undefined' && targetId) {
      window.localStorage.setItem(`promptcanvas_share_role_${targetId}`, role);
    }
  };

  if (!isOpen) return null;

  // Build canonical deep link with active accessRole encoded. The origin resolves to the
  // current host in the browser and to the verified BeyondCorp endpoint otherwise.
  const origin = getPublicAppOrigin();
  let deepLink = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&v=${activeVersionTag}&role=${accessRole}`;

  if (targetType === 'doc' && activeDoc) {
    deepLink = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&view=specs&doc=${activeDoc.id}&v=${activeVersionTag}&role=${accessRole}`;
  } else if (targetType === 'node' && activeNode) {
    deepLink = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&view=diagram&node=${activeNode.id}&v=${activeVersionTag}&role=${accessRole}`;
  }

  const handleCopyLink = async () => {
    const ok = await copyTextToClipboard(deepLink);
    setCopyState(ok ? 'copied' : 'failed');
    setTimeout(() => setCopyState('idle'), 2500);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const nextItem = {
      id: `c_${Date.now()}`,
      author: 'Lead Architect (You)',
      role: `Session Reviewer (${accessRole})`,
      text: newComment.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setComments(prev => {
      const updated = [...prev, nextItem];
      if (typeof window !== 'undefined' && targetId) {
        window.localStorage.setItem(`promptcanvas_object_comments_${targetId}`, JSON.stringify(updated));
      }
      return updated;
    });
    setNewComment('');
  };

  return (
    <aside
      data-testid="studio-right-share-panel"
      className="h-full shrink-0 w-[390px] sm:w-[420px] bg-white border-l border-slate-200 shadow-xl z-30 flex flex-col justify-between animate-in slide-in-from-right duration-200 text-slate-900"
    >
      {/* Top Header (Google Docs / Slides Right Panel Style) */}
      <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-slate-900 leading-tight truncate">Share & Collaborate</h3>
            <p className="text-[11px] text-slate-500 font-mono truncate">
              Anchor ID: <span className="font-bold text-blue-600">{targetId}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          title="Collapse right panel"
          className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Object Hierarchy Badge */}
      <div className="px-5 py-2.5 bg-blue-50/60 border-b border-blue-100/80 flex items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-bold uppercase tracking-wider text-[10px] text-blue-700 font-mono shrink-0">Target:</span>
          <div className="flex items-center gap-1.5 font-medium text-slate-800 min-w-0">
            {targetType === 'doc' && <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
            {targetType === 'node' && <Network className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            {targetType === 'project' && <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
            <span className="font-bold text-slate-900 truncate">{targetTitle}</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono text-blue-800 shrink-0">
              {activeVersionTag}
            </span>
          </div>
        </div>

        <span
          data-testid="share-link-kind-badge"
          className="text-[10px] text-slate-700 bg-slate-100 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0"
          title="A URL that restores this exact project/doc/node view. It is not a live-sync session."
        >
          <ExternalLink className="w-3 h-3 text-slate-500" />
          <span>Deep link</span>
        </span>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
        {/* Deep-Link Copy Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
            <span>Object URL & Deep Link:</span>
            <span className="text-slate-400 font-normal text-[10px]">Restores exact node / spec</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={deepLink}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 select-all focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer ${
                copyState === 'copied'
                  ? 'bg-emerald-600 text-white'
                  : copyState === 'failed'
                    ? 'bg-amber-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              title={copyState === 'failed' ? 'Clipboard access was blocked — select the URL and copy manually' : 'Copy deep link'}
            >
              {copyState === 'copied' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyState === 'copied' ? 'Copied!' : copyState === 'failed' ? 'Select & copy' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Access Permissions & Governance Roles */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
            <span>Collaboration Permissions:</span>
            <span
              data-testid="share-rbac-badge"
              className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
              title="The selected role is encoded as a ?role= parameter in the link so the recipient's studio opens in that mode. It is not enforced by the server."
            >
              Link hint · not enforced
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSelectRole('viewer')}
              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                accessRole === 'viewer'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold ring-1 ring-blue-400/30'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-500 shrink-0" />
                <span>Viewer</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Read-only access</p>
            </button>

            <button
              onClick={() => handleSelectRole('commenter')}
              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                accessRole === 'commenter'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold ring-1 ring-blue-400/30'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>Commenter</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Annotate & review</p>
            </button>

            <button
              onClick={() => handleSelectRole('editor')}
              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                accessRole === 'editor'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold ring-1 ring-blue-400/30'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1">
                <Shield className="w-3 h-3 text-purple-500 shrink-0" />
                <span>Editor</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Opens in edit mode</p>
            </button>
          </div>
        </div>

        {/* Object-Level Discussion & Annotation Feed */}
        <div className="space-y-2.5 pt-3 border-t border-slate-100 flex-1 flex flex-col">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Comments & Notes ({comments.length})</span>
            </span>
            <span
              data-testid="share-comments-scope"
              className="text-[10px] text-slate-500 font-normal"
              title="Notes are kept in this browser's localStorage, keyed by anchor ID. They are not shared with link recipients."
            >
              This browser only · {targetId}
            </span>
          </div>

          <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 min-h-[140px]">
            {comments.length === 0 ? (
              <div className="text-[11px] text-slate-400 italic py-6 text-center">
                No annotations recorded yet for {targetTitle}. Add a review note below while viewing the document.
              </div>
            ) : (
              comments.map(c => (
                <div key={c.id} className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">{c.author}</span>
                    <span className="text-[9px] text-slate-400">{c.time}</span>
                  </div>
                  <div className="text-[9.5px] text-blue-700 font-medium">{c.role}</div>
                  <p className="text-[11px] text-slate-600 leading-snug">{c.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Post Comment Input */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddComment()}
              placeholder={`Comment on ${targetTitle}...`}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
            <button
              onClick={handleAddComment}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Anchor: {targetId} &bull; Role: {accessRole.toUpperCase()}</span>
        </div>
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition shadow-2xs cursor-pointer"
        >
          Collapse
        </button>
      </div>
    </aside>
  );
}
