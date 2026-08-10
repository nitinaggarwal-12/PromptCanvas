'use client';

import React, { useState } from 'react';
import { Sparkles, Star, X, Check, ShieldCheck, Layers, Tag, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface SetMasterTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentXml: string;
  currentDiagramName: string;
  currentArchId?: string;
  onSuccess: (template: any) => void;
}

const CATEGORY_OPTIONS = [
  'Identity, Access & Zero-Trust',
  'AI & Cognitive Systems',
  'Data & Lakehouse Architecture',
  'Cloud Infrastructure & Networking',
  'Security & Governance',
  'DevSecOps & Platform Engineering',
  'Executive & Business Strategy',
  'FinTech & Real-Time Payments',
  'Healthcare & Clinical Systems',
  'Custom Master Architecture'
];

export const SetMasterTemplateModal: React.FC<SetMasterTemplateModalProps> = ({
  isOpen,
  onClose,
  currentXml,
  currentDiagramName,
  currentArchId,
  onSuccess
}) => {
  const [name, setName] = useState(currentDiagramName || 'New Master Architecture');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [badge, setBadge] = useState('Master Blueprint (Verified)');
  const [description, setDescription] = useState('');
  const [customId, setCustomId] = useState(
    currentArchId || name.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_')
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Template name is required.');
      return;
    }
    if (!customId.trim()) {
      setErrorMsg('Template ID is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        id: customId.trim(),
        name: name.trim(),
        category,
        badge,
        description: description.trim() || `Master architecture template for ${name.trim()}.`,
        xml: currentXml
      };

      const res = await fetch('/api/templates/master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save master template.');
      }

      onSuccess(data.template);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-[#0F172A] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-transparent border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                Set as Master Template
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Golden Reference
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Promote this diagram into the official Master Blueprint library.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Master Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!currentArchId) {
                  setCustomId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_'));
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-amber-400 text-white text-sm outline-none transition-all"
              placeholder="e.g. Google Cloud Zero-Trust Ingress & Workload Identity"
              required
            />
          </div>

          {/* Identifier Slug */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                Template ID (Slug)
              </label>
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-400 text-indigo-300 text-xs font-mono outline-none transition-all"
                placeholder="e.g. gcp_zero_trust_mesh"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Badge Label
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-teal-400 text-teal-300 text-xs font-semibold outline-none transition-all"
                placeholder="e.g. Master Blueprint (Verified)"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Architectural Domain & Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-cyan-300 text-xs font-bold outline-none cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-950 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Description & Business Context
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-amber-400 text-slate-200 text-xs outline-none transition-all resize-none"
              placeholder="Describe the architectural tiers, data flow, compliance controls, and key technologies..."
            />
          </div>

          {/* Info Notice */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 leading-relaxed">
            💡 Saving as a Master Template will register the active 2D XML layout as a golden benchmark blueprint. Any user can instantly preview or initialize workspaces from this layout.
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Master...</span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 fill-white" />
                  <span>Save &amp; Register Master Template</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
