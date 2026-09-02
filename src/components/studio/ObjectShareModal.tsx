'use client';

import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  Lock,
  Users,
  MessageSquare,
  Shield,
  Layers,
  FileText,
  Network,
  ExternalLink,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { AstComponent } from '@/lib/ast/architectureAst';
import { LivingSpecDocument } from '@/lib/spec/livingSpecsGenerator';

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
  const [copied, setCopied] = useState(false);
  const [accessRole, setAccessRole] = useState<'viewer' | 'commenter' | 'editor'>('commenter');
  const [comments, setComments] = useState<Array<{ id: string; author: string; role: string; text: string; time: string }>>([
    {
      id: 'c1',
      author: 'Dr. Sarah Jenkins',
      role: 'Clinical Operations Lead (Merck)',
      text: 'Verified 21 CFR Part 11 audit trails in DOC-07. Spanner mutation logs match GxP requirements.',
      time: '12m ago'
    },
    {
      id: 'c2',
      author: 'Alex Rivera',
      role: 'Principal Cloud Architect (Google)',
      text: 'Multi-region failover latency verified under 15ms with global HTTPS load balancing.',
      time: '4m ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  // Build canonical deep link
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://promptcanvas.up.railway.app';
  let deepLink = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&v=${activeVersionTag}`;

  if (targetType === 'doc' && activeDoc) {
    deepLink = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&view=specs&doc=${activeDoc.id}&v=${activeVersionTag}`;
  } else if (targetType === 'node' && activeNode) {
    deepLink = `${origin}/studio?project=${encodeURIComponent(projectTitle)}&view=diagram&node=${activeNode.id}&v=${activeVersionTag}`;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deepLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        author: 'Lead Architect (You)',
        role: 'Enterprise Reviewer',
        text: newComment,
        time: 'Just now'
      }
    ]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 text-slate-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">Share & Collaborate</h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Granular Object Addressability • Unique Anchor ID: <span className="font-bold text-blue-600">{targetId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Object Hierarchy Badge */}
        <div className="px-6 py-3 bg-blue-50/60 border-b border-blue-100/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-[10px] text-blue-700 font-mono">Target Object:</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              {targetType === 'doc' && <FileText className="w-3.5 h-3.5 text-indigo-600" />}
              {targetType === 'node' && <Network className="w-3.5 h-3.5 text-emerald-600" />}
              {targetType === 'project' && <Layers className="w-3.5 h-3.5 text-blue-600" />}
              <span className="font-bold text-slate-900">{targetTitle}</span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono text-blue-800">
                {activeVersionTag}
              </span>
            </div>
          </div>

          <span className="text-[10px] text-emerald-700 bg-emerald-100/80 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Deep Link</span>
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Deep-Link Copy Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
              <span>Object URL & Deep Link:</span>
              <span className="text-slate-400 font-normal">Restores exact diagram node / living spec chapter</span>
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Access Permissions & Governance Roles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
              <span>Collaboration Permissions:</span>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Merck GxP & GCP RBAC Active
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setAccessRole('viewer')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  accessRole === 'viewer'
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold ring-1 ring-blue-400/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-500" />
                  <span>Viewer</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Read-only access to diagrams and specs</p>
              </button>

              <button
                onClick={() => setAccessRole('commenter')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  accessRole === 'commenter'
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold ring-1 ring-blue-400/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-indigo-500" />
                  <span>Commenter</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Annotate & review governance gates</p>
              </button>

              <button
                onClick={() => setAccessRole('editor')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  accessRole === 'editor'
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold ring-1 ring-blue-400/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1">
                  <Shield className="w-3 h-3 text-purple-500" />
                  <span>Architect / Editor</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Live Draw.io edit & spec sync</p>
              </button>
            </div>
          </div>

          {/* Object-Level Discussion & Annotation Feed */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Object Discussion & Cross-Functional Sign-offs ({comments.length})</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Anchored to {targetId}</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {comments.map(c => (
                <div key={c.id} className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">{c.author}</span>
                    <span className="text-[9px] text-slate-400">{c.time}</span>
                  </div>
                  <div className="text-[9.5px] text-blue-700 font-medium">{c.role}</div>
                  <p className="text-[11px] text-slate-600 leading-snug">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Post Comment Input */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                placeholder={`Leave a comment on ${targetTitle}...`}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
              />
              <button
                onClick={handleAddComment}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-2xs"
              >
                Post
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multi-persona sync: 4 stakeholders active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition shadow-2xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
