'use client';

import React, { useMemo } from 'react';
import { X, CheckCircle2, RefreshCw, Cpu, AlertTriangle } from 'lucide-react';
import { validateDrawioXml } from '@/lib/validate/validator';
import { auditXmlContrast, type ContrastGrade } from '@/lib/validate/contrast';

interface BrainGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAutoHeal: () => void;
  isHealing: boolean;
  currentXml?: string;
}

const CONTRAST_TONES: Record<ContrastGrade, { box: string; label: string; value: string }> = {
  'AAA': { box: 'bg-purple-50 border-purple-200', label: 'text-purple-800', value: 'text-purple-700' },
  'AA': { box: 'bg-blue-50 border-blue-200', label: 'text-blue-800', value: 'text-blue-700' },
  'AA Large': { box: 'bg-amber-50 border-amber-200', label: 'text-amber-800', value: 'text-amber-700' },
  'Fail': { box: 'bg-rose-50 border-rose-200', label: 'text-rose-800', value: 'text-rose-700' },
  'N/A': { box: 'bg-slate-50 border-slate-200', label: 'text-slate-600', value: 'text-slate-500' },
};

export function BrainGroundingModal({ isOpen, onClose, onAutoHeal, isHealing, currentXml }: BrainGroundingModalProps) {
  const validation = useMemo(() => {
    if (!currentXml || !currentXml.trim()) return null;
    try {
      return validateDrawioXml(currentXml);
    } catch {
      return null;
    }
  }, [currentXml]);

  // Real WCAG 2.x fill/font contrast computed from the live XML — replaces the
  // previous hardcoded "WCAG AAA" badge that was shown regardless of the canvas.
  const contrast = useMemo(() => auditXmlContrast(currentXml || ''), [currentXml]);

  if (!isOpen) return null;

  const overlapDefects = validation
    ? validation.errors.filter(
        (e) =>
          e.code === 'OVERLAP' ||
          e.code === 'EDGE_INTERSECTS_VERTEX' ||
          e.code === 'CONTAINER_HEADER_SLICED'
      ).length
    : 0;
  const totalErrors = validation ? validation.errors.length : 0;
  const qualityScore = validation
    ? Math.max(40, 100 - totalErrors * 5 - overlapDefects * 3)
    : 100;

  return (
    <aside
      data-testid="studio-right-brain-panel"
      className="h-full shrink-0 w-[390px] sm:w-[420px] bg-white border-l border-slate-200 shadow-xl z-30 flex flex-col justify-between animate-in slide-in-from-right duration-200 text-slate-900"
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/20 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-slate-900 tracking-tight truncate">Architecture Brain & Grounding</h2>
            <p className="text-[11px] text-slate-500 font-mono truncate">Live AST & 2D AABB Geometry Validator</p>
          </div>
        </div>
        <button
          onClick={onClose}
          title="Collapse right panel"
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
        {/* Quality Score Badges */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className={`${qualityScore >= 90 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} border p-2.5 rounded-xl`}>
            <div className={`text-[10px] ${qualityScore >= 90 ? 'text-emerald-800' : 'text-amber-800'} uppercase font-mono font-bold`}>Quality</div>
            <div className={`text-base font-black ${qualityScore >= 90 ? 'text-emerald-700' : 'text-amber-700'} mt-0.5`}>{qualityScore} / 100</div>
          </div>
          <div className={`${overlapDefects === 0 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'} border p-2.5 rounded-xl`}>
            <div className={`text-[10px] ${overlapDefects === 0 ? 'text-blue-800' : 'text-amber-800'} uppercase font-mono font-bold`}>Collisions</div>
            <div className={`text-base font-black ${overlapDefects === 0 ? 'text-blue-700' : 'text-amber-700'} mt-0.5`}>
              {overlapDefects} {overlapDefects === 1 ? 'Defect' : 'Defects'}
            </div>
          </div>
          <div
            data-testid="brain-contrast-badge"
            className={`${CONTRAST_TONES[contrast.grade].box} border p-2.5 rounded-xl`}
            title={
              contrast.worst
                ? `Weakest pair: "${contrast.worst.label}" (${contrast.worst.font} on ${contrast.worst.fill}) = ${contrast.worst.ratio}:1 across ${contrast.pairsEvaluated} labelled nodes`
                : 'No labelled vertices to evaluate'
            }
          >
            <div className={`text-[10px] ${CONTRAST_TONES[contrast.grade].label} uppercase font-mono font-bold`}>Contrast</div>
            <div className={`text-base font-black ${CONTRAST_TONES[contrast.grade].value} mt-0.5`}>
              {contrast.grade === 'N/A' ? 'N/A' : `WCAG ${contrast.grade}`}
            </div>
            {contrast.minRatio !== null && (
              <div className={`text-[10px] font-mono ${CONTRAST_TONES[contrast.grade].label} opacity-80`}>
                min {contrast.minRatio}:1 · {contrast.pairsEvaluated} nodes
              </div>
            )}
          </div>
        </div>

        {contrast.failing.length > 0 && (
          <div
            data-testid="brain-contrast-findings"
            className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-900 space-y-1"
          >
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{contrast.failing.length} node(s) below WCAG AA (4.5:1) text contrast:</span>
            </div>
            {contrast.failing.map((p) => (
              <div key={p.cellId} className="text-[11px] text-rose-800 font-mono break-words">
                • {p.ratio}:1 — &ldquo;{p.label}&rdquo; ({p.font} on {p.fill})
              </div>
            ))}
          </div>
        )}

        {validation && validation.errors.length > 0 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Detected {validation.errors.length} live geometry/structural finding(s):</span>
            </div>
            {validation.errors.slice(0, 4).map((err, i) => (
              <div key={i} className="text-[11px] text-amber-800 font-mono break-words">
                • [{err.code}] {err.detail}
              </div>
            ))}
          </div>
        )}

        {/* Active Skills List */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Ground-Truth Skills Loaded:</h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 font-mono">gcp-enterprise-diagram-engine</div>
                <p className="text-slate-600 text-[11px] mt-0.5">Enforces 6 mandatory cloud zones, official Google Cloud vector SVGs, and VPC CIDRs (10.100.0.0/16).</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 font-mono">diagram-generation-engine</div>
                <p className="text-slate-600 text-[11px] mt-0.5">2D AABB bounding box collision avoidance, 140px column channels, and typed orthogonal routing.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 font-mono">living-specs-engine (16 Documents)</div>
                <p className="text-slate-600 text-[11px] mt-0.5">Synchronizes all 16 Living Specs (PRD, FDD, HLD, LLD, SQL DDL, STRIDE, AI Card, Terraform HCL, BCDR, CI/CD, SRE, 6-Rs, Cutover, FinOps, Compliance, ADRs).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
        <span className="text-[11px] text-slate-500 font-mono truncate">
          {totalErrors === 0 ? 'Grounded (0 Defects)' : `${totalErrors} Finding(s)`}
        </span>
        <button
          onClick={onAutoHeal}
          disabled={isHealing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50 cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isHealing ? 'animate-spin' : ''}`} />
          <span>{isHealing ? 'Healing...' : 'Re-Ground & Auto-Heal'}</span>
        </button>
      </div>
    </aside>
  );
}
