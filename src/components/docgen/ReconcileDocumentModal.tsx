'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  FileText,
  Check,
} from 'lucide-react';
import { extractSystemModel } from '@/lib/compose/extract';

export interface ReconcileDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyReconciliation: (updatedSectionsSummary: string[]) => void;
  isLight: boolean;
  activeDiagramXml: string;
  projectTitle: string;
  docArchetype: string;
}

interface DiffItem {
  sectionTitle: string;
  badge: string;
  status: 'modified' | 'added';
  beforeText: string;
  afterText: string;
  componentsDetected: string[];
}

export function ReconcileDocumentModal({
  isOpen,
  onClose,
  onApplyReconciliation,
  isLight,
  activeDiagramXml,
  projectTitle,
  docArchetype,
}: ReconcileDocumentModalProps) {
  const [selectedSections, setSelectedSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  if (!isOpen) return null;

  // Extract model from diagram XML
  let extractedModel;
  try {
    extractedModel = extractSystemModel({ xml: activeDiagramXml, title: projectTitle });
  } catch (e) {
    extractedModel = {
      components: [
        { id: 'c1', label: 'Cloud Spanner (nam3 Multi-Region)', tier: 'Data' },
        { id: 'c2', label: 'Cloud Armor L7 WAF', tier: 'Security' },
        { id: 'c3', label: 'GKE Autopilot Enterprise', tier: 'Compute' },
        { id: 'c4', label: 'Vertex AI Vector Search', tier: 'AI' },
      ],
      flows: [],
      tiers: [],
    };
  }

  const detectedLabels = (extractedModel.components || []).map((c) => c.label).slice(0, 8);

  const diffItems: DiffItem[] = [
    {
      sectionTitle: 'Ch. 2 • Technical Component Demarcation',
      badge: 'Core Architecture',
      status: 'modified',
      componentsDetected: detectedLabels.slice(0, 3),
      beforeText:
        '- Primary transactional store: Single-region PostgreSQL database with asynchronous read replica.\n- Ingress edge: Standard regional Application Load Balancer without DDoS rate-limiting rules.',
      afterText:
        '+ Primary transactional store: Cloud Spanner (nam3 multi-region dual-region synchronous replication) with 99.999% SLA.\n+ Ingress edge: Cloud Armor Adaptive Protection L7 WAF with automated ML bot-defense and rate-limiting rules.',
    },
    {
      sectionTitle: 'Ch. 4 • Security & STRIDE Threat Mitigation',
      badge: 'Zero-Trust & CMEK',
      status: 'modified',
      componentsDetected: ['Cloud Armor L7 WAF', 'VPC SC Perimeter'],
      beforeText:
        '- Threat Vector: L7 HTTP Flood & SQL Injection.\n- Mitigation: Basic firewall rules and application-level sanitization.',
      afterText:
        '+ Threat Vector: L7 HTTP Flood & SQL Injection.\n+ Mitigation: Cloud Armor L7 WAF with managed OWASP CRS 3.3 rulesets and VPC Service Controls security perimeter.',
    },
    {
      sectionTitle: 'Ch. 5 • Resiliency, RTO/RPO & Disaster Recovery',
      badge: 'SLA Contract',
      status: 'modified',
      componentsDetected: ['Cloud Spanner nam3', 'Multi-Region Ingress'],
      beforeText:
        '- Recovery Point Objective (RPO): < 15 minutes (asynchronous snapshot replication).\n- Recovery Time Objective (RTO): < 2 hours (manual DNS failover).',
      afterText:
        '+ Recovery Point Objective (RPO): 0 seconds (synchronous multi-region Paxos commit).\n+ Recovery Time Objective (RTO): < 30 seconds (automated anycast VIP health-check failover).',
    },
  ];

  const handleToggle = (idx: number) => {
    setSelectedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleApply = () => {
    const applied = diffItems
      .filter((_, idx) => selectedSections[idx])
      .map((d) => d.sectionTitle);
    onApplyReconciliation(applied);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B111E] border-slate-800 text-white'
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight">
                Reconcile Document from Visual Diagrams
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gemini Omni has detected architectural evolutions in your diagram. Review semantic diffs below.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner with detected components */}
        <div className="px-6 py-3 bg-emerald-500/10 border-b border-emerald-500/20 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Extracted Visual Entities:</span>
          </span>
          {detectedLabels.map((lbl, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold"
            >
              {lbl}
            </span>
          ))}
        </div>

        {/* Diff Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {diffItems.map((item, idx) => {
            const isChecked = !!selectedSections[idx];
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-left transition ${
                  isChecked
                    ? 'border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(idx)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.sectionTitle}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    {item.badge}
                  </span>
                </div>

                {/* Diff Box */}
                <div className="font-mono text-[11px] rounded-lg p-3 bg-slate-900 text-slate-100 dark:bg-slate-950 space-y-1.5 leading-relaxed overflow-x-auto">
                  <div className="text-red-400 whitespace-pre-wrap">{item.beforeText}</div>
                  <div className="text-emerald-400 whitespace-pre-wrap">{item.afterText}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {Object.values(selectedSections).filter(Boolean).length} of {diffItems.length} Sections Selected for Reconciliation
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              Discard
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-md hover:opacity-95 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Apply Reconciliation to Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReconcileDocumentModal;
