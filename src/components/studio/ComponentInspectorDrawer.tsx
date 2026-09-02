'use client';

import React from 'react';
import { X, Copy, Check, Shield, Server, Zap, ExternalLink, Sparkles } from 'lucide-react';
import { AstComponent } from '@/lib/ast/architectureAst';

interface ComponentInspectorProps {
  component: AstComponent | null;
  onClose: () => void;
  onAiRefinePrompt?: (prompt: string) => void;
}

export function ComponentInspectorDrawer({ component, onClose, onAiRefinePrompt }: ComponentInspectorProps) {
  const [copiedTf, setCopiedTf] = React.useState(false);

  if (!component) return null;

  const terraformSnippet = `resource "google_${component.service.toLowerCase().replace(/\s+/g, '_')}" "${component.id}" {
  name        = "${component.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}"
  region      = "${component.region}"
  description = "${component.description}"
  
  labels = {
    tier       = "${component.tier}"
    compliance = "pci-dss-4.0"
    managed_by = "promptcanvas"
  }
}`;

  const copyTerraform = () => {
    navigator.clipboard.writeText(terraformSnippet);
    setCopiedTf(true);
    setTimeout(() => setCopiedTf(false), 2000);
  };

  return (
    <aside className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            GCP
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 leading-tight">{component.name}</h3>
            <p className="text-[11px] text-slate-500 font-mono">{component.service} • {component.region}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
        
        {/* Role & SLA Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Tier & Role</div>
            <div className="font-bold text-slate-900 mt-0.5 capitalize">{component.tier} • {component.role || 'Primary'}</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Availability SLA</div>
            <div className="font-bold text-emerald-600 mt-0.5">{component.sla || '99.99% SLA'}</div>
          </div>
        </div>

        {/* Technical Description */}
        <div className="space-y-1.5">
          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-blue-600" />
            <span>Architecture Specification</span>
          </div>
          <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-200/80">
            {component.description}
          </p>
        </div>

        {/* Zero-Trust Security & IAM Baseline */}
        <div className="space-y-1.5">
          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Trust IAM & Security Controls</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Identity:</span>
              <span className="font-mono font-medium text-slate-900">Workload Identity Federation</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Encryption:</span>
              <span className="font-mono font-medium text-slate-900">Cloud KMS HSM (CMEK FIPS 140-3)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Network Perimeter:</span>
              <span className="font-mono font-medium text-emerald-600 font-semibold">VPC Service Controls (VPC-SC)</span>
            </div>
          </div>
        </div>

        {/* Terraform HCL Snippet */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Terraform GCP HCL Code</span>
            </span>
            <button 
              onClick={copyTerraform}
              className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 transition"
            >
              {copiedTf ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedTf ? 'Copied!' : 'Copy HCL'}</span>
            </button>
          </div>
          <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[10px] overflow-x-auto leading-tight shadow-inner">
            {terraformSnippet}
          </pre>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-2">
        <button 
          onClick={() => {
            if (onAiRefinePrompt) {
              onAiRefinePrompt(`Optimize ${component.name} configuration for zero-downtime multi-region failover and lower latency.`);
            }
          }}
          className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Refine {component.name} with AI</span>
        </button>
      </div>

    </aside>
  );
}
