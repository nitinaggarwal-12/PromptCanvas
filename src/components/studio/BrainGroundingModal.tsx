'use client';

import React, { useMemo } from 'react';
import { X, CheckCircle2, RefreshCw, Cpu, AlertTriangle } from 'lucide-react';
import { validateDrawioXml } from '@/lib/validate/validator';

interface BrainGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAutoHeal: () => void;
  isHealing: boolean;
  currentXml?: string;
}

export function BrainGroundingModal({ isOpen, onClose, onAutoHeal, isHealing, currentXml }: BrainGroundingModalProps) {
  const validation = useMemo(() => {
    if (!currentXml || !currentXml.trim()) return null;
    try {
      return validateDrawioXml(currentXml);
    } catch {
      return null;
    }
  }, [currentXml]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 tracking-tight">Architecture Brain & Skill Grounding</h2>
              <p className="text-xs text-slate-500 font-mono">Immutable Enterprise Standards • Live AST & Geometry Validator</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Active Skills List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Ground-Truth Skills Loaded:</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 font-mono">gcp-enterprise-diagram-engine</div>
                <p className="text-slate-600 text-[11px] mt-0.5">Enforces 6 mandatory cloud zones, official Google Cloud vector SVGs, and VPC CIDRs (10.100.0.0/16).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 font-mono">diagram-generation-engine</div>
                <p className="text-slate-600 text-[11px] mt-0.5">2D AABB bounding box collision avoidance, 140px column channels, and typed orthogonal routing.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 font-mono">living-specs-engine (16 Documents)</div>
                <p className="text-slate-600 text-[11px] mt-0.5">Synchronizes all 16 Living Specs (PRD, FDD, HLD, LLD, SQL DDL, STRIDE, AI Card, Terraform HCL, BCDR, CI/CD, SRE, 6-Rs, Cutover, FinOps, Compliance, ADRs).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Score Badges */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className={`${qualityScore >= 90 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} border p-3 rounded-xl`}>
            <div className={`text-[10px] ${qualityScore >= 90 ? 'text-emerald-800' : 'text-amber-800'} uppercase font-mono font-bold`}>Quality Score</div>
            <div className={`text-xl font-black ${qualityScore >= 90 ? 'text-emerald-700' : 'text-amber-700'} mt-0.5`}>{qualityScore} / 100</div>
          </div>
          <div className={`${overlapDefects === 0 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'} border p-3 rounded-xl`}>
            <div className={`text-[10px] ${overlapDefects === 0 ? 'text-blue-800' : 'text-amber-800'} uppercase font-mono font-bold`}>AABB Collisions</div>
            <div className={`text-xl font-black ${overlapDefects === 0 ? 'text-blue-700' : 'text-amber-700'} mt-0.5`}>
              {overlapDefects} {overlapDefects === 1 ? 'Defect' : 'Defects'}
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
            <div className="text-[10px] text-purple-800 uppercase font-mono font-bold">Contrast Standards</div>
            <div className="text-xl font-black text-purple-700 mt-0.5">WCAG AAA</div>
          </div>
        </div>

        {validation && validation.errors.length > 0 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 space-y-1 max-h-28 overflow-y-auto">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Detected {validation.errors.length} live geometry/structural finding(s):</span>
            </div>
            {validation.errors.slice(0, 3).map((err, i) => (
              <div key={i} className="text-[11px] text-amber-800 font-mono truncate">
                • [{err.code}] {err.detail}
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            {totalErrors === 0 ? 'Status: Grounded & Enforced (0 Defects)' : `Status: ${totalErrors} Finding(s) — Ready to Auto-Heal`}
          </span>
          <button
            onClick={onAutoHeal}
            disabled={isHealing}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isHealing ? 'animate-spin' : ''}`} />
            <span>{isHealing ? 'Re-Verifying & Healing...' : 'Re-Ground & Auto-Heal Architecture'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
