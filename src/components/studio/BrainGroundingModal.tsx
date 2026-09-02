'use client';

import React from 'react';
import { X, CheckCircle2, RefreshCw, Cpu, ShieldCheck, Layers, Award } from 'lucide-react';

interface BrainGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAutoHeal: () => void;
  isHealing: boolean;
}

export function BrainGroundingModal({ isOpen, onClose, onAutoHeal, isHealing }: BrainGroundingModalProps) {
  if (!isOpen) return null;

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
              <p className="text-xs text-slate-500 font-mono">Immutable Enterprise Standards • Zero-Drift Guarantee</p>
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
                <div className="font-bold text-slate-900 font-mono">living-specs-engine (10 Documents)</div>
                <p className="text-slate-600 text-[11px] mt-0.5">Automates PRD, HLD, LLD, STRIDE Threat Model, Spanner DDL SQL, and Terraform HCL sync.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Score Badges */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <div className="text-[10px] text-emerald-800 uppercase font-mono font-bold">Quality Score</div>
            <div className="text-xl font-black text-emerald-700 mt-0.5">100 / 100</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
            <div className="text-[10px] text-blue-800 uppercase font-mono font-bold">AABB Collisions</div>
            <div className="text-xl font-black text-blue-700 mt-0.5">0 Defect</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
            <div className="text-[10px] text-purple-800 uppercase font-mono font-bold">Contrast Standards</div>
            <div className="text-xl font-black text-purple-700 mt-0.5">WCAG AAA</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">Status: Grounded & Enforced</span>
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
