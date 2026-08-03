'use client';

import React, { useState } from 'react';
import { X, ClipboardList, Sparkles, ShieldCheck, Server, ArrowRight, Layers } from 'lucide-react';

interface UseCaseIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitUseCase: (useCaseData: {
    title: string;
    domain: string;
    description: string;
    cloudProvider: string;
    complianceTier: string;
  }) => void;
}

export function UseCaseIntakeModal({ isOpen, onClose, onSubmitUseCase }: UseCaseIntakeModalProps) {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('FinTech & Banking');
  const [cloudProvider, setCloudProvider] = useState('Google Cloud Platform (GCP)');
  const [complianceTier, setComplianceTier] = useState('SOC2 Type II + Zero-Trust Network');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitUseCase({
        title,
        domain,
        description,
        cloudProvider,
        complianceTier
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[1100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#0b101d] border border-teal-500/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                <span>📋 NEW USE CASE INTAKE FORM</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">AI Architecture Synthesis</span>
              </h3>
              <p className="text-xs text-slate-400">Describe your architectural requirements to compile a tailored publication-grade Draw.io topology.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-all cursor-pointer"
            aria-label="Close Use Case Intake Form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Use Case Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              1. Architecture / Use Case Name <span className="text-teal-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Real-Time Transaction Fraud Detection Engine with AI Safety Gateway"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Grid: Industry Domain + Cloud Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Industry Domain</span>
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
              >
                <option value="FinTech & Banking">FinTech &amp; Banking</option>
                <option value="Healthcare & Genomics">Healthcare &amp; Genomics</option>
                <option value="Autonomous AI & Robotics">Autonomous AI &amp; Robotics</option>
                <option value="E-Commerce & Retail Scale">E-Commerce &amp; Retail Scale</option>
                <option value="DevSecOps & Multi-Cloud">DevSecOps &amp; Multi-Cloud</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Cloud Infrastructure</span>
              </label>
              <select
                value={cloudProvider}
                onChange={(e) => setCloudProvider(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
              >
                <option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                <option value="Hybrid Multi-Cloud Architecture">Hybrid Multi-Cloud Architecture</option>
              </select>
            </div>
          </div>

          {/* Compliance & Security Tier */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compliance &amp; Security Mandate</span>
            </label>
            <select
              value={complianceTier}
              onChange={(e) => setComplianceTier(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-100 outline-none cursor-pointer"
            >
              <option value="SOC2 Type II + Zero-Trust Network">SOC2 Type II + Zero-Trust Network Perimeter</option>
              <option value="HIPAA Compliance + KMS Envelope Encryption">HIPAA Compliance + KMS Envelope Encryption</option>
              <option value="PCI-DSS Active-Active Financial Ledger">PCI-DSS Active-Active Financial Ledger</option>
              <option value="GDPR / PII Dynamic Data Masking">GDPR / PII Dynamic Data Masking</option>
            </select>
          </div>

          {/* Prompt Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              2. Core Workflow &amp; Components Prompt
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Ingress via Public ALB -> Safety Gateway -> MicroVM Sandbox Exec Engine -> Cloud SQL pgvector database with automated daily backup and Slack alerts."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Cancel (View Existing Workspaces)
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-[#070a13] font-extrabold text-xs tracking-wide transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Synthesizing Architecture...' : 'Generate Architecture Diagram'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
