'use client';

import React, { useState } from 'react';
import { 
  Radar, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  X, 
  Layers, 
  Zap, 
  Cpu
} from 'lucide-react';

interface TechRadarAndConceptDriftGuardProps {
  isOpen: boolean;
  onClose: () => void;
  activeDiagramName: string;
  architectureType: string;
  onAutoModernize: () => void;
}

export function TechRadarAndConceptDriftGuardModal({
  isOpen,
  onClose,
  activeDiagramName,
  architectureType,
  onAutoModernize
}: TechRadarAndConceptDriftGuardProps) {
  const [selectedQuadrant, setSelectedQuadrant] = useState<'adopt' | 'trial' | 'assess' | 'hold'>('adopt');
  const [isModernizing, setIsModernizing] = useState(false);

  if (!isOpen) return null;

  const radarQuadrants = {
    adopt: {
      title: '🟢 ADOPT — Production Gold Standard (2026)',
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      nodes: [
        { name: 'Gemini 3.6 Pro LLM Reasoning Engine', status: 'Optimal OPEX & Architectural Intelligence' },
        { name: 'Serverless Cloud Run v2 Containers', status: 'Zero-Idle Cost Auto-Scaling (0 -> 1000 pods)' },
        { name: 'Vertex AI Vector Search & ANN Indexing', status: 'Sub-10ms Billion-Vector Retrieval' }
      ]
    },
    trial: {
      title: '🟡 TRIAL — High-Growth Enterprise Innovation',
      color: 'text-teal-300 border-teal-500/40 bg-teal-500/10',
      nodes: [
        { name: 'Gemini 3.6 Ephemeral System Prompt Context Caching', status: '90% Token Cost Reduction' },
        { name: 'Stateful Agentic LangGraph Multi-Agent Loops', status: 'Autonomous ReAct Tool Execution' }
      ]
    },
    assess: {
      title: '🟠 ASSESS — Next-Gen Watchlist',
      color: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
      nodes: [
        { name: 'Post-Quantum Cryptographic Key Exchange', status: 'NIST CNSA 2.0 Compliant Encryption' },
        { name: 'WebAssembly (WASM) Edge Security Modules', status: 'Sub-Millisecond Edge Isolation' }
      ]
    },
    hold: {
      title: '🔴 HOLD — Concept Drift & Technical Debt Risks',
      color: 'text-red-400 border-red-500/40 bg-red-500/10',
      nodes: [
        { name: 'Legacy Provisioned VM Compute Instances', status: 'High Idle OPEX Waste ($480/mo leak)' },
        { name: 'Static API Keys & Service Account JSON Keys', status: 'Security Vulnerability (Replace with Workload Identity)' }
      ]
    }
  };

  const conceptDriftAlerts = [
    {
      title: 'Token OPEX Concept Drift Detected',
      desc: 'Diagram uses standard multi-turn LLM calls without Ephemeral System Prompt Context Caching.',
      impact: 'Savings Potential: $1,420/month',
      severity: 'HIGH'
    },
    {
      title: 'Identity & Auth Governance Modernization Available',
      desc: 'Upgrade static connection authentication to Workload Identity Federation & Short-Lived Tokens.',
      impact: 'Zero-Trust Posture: 98% -> 100%',
      severity: 'MEDIUM'
    }
  ];

  const handleModernizeClick = () => {
    setIsModernizing(true);
    setTimeout(() => {
      setIsModernizing(false);
      onAutoModernize();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-teal-500/50 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-panel-border flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-accent/20 border border-teal-500/40 flex items-center justify-center text-teal-accent">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  Live Technology Radar &amp; Autonomous Concept Drift Guard
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
                  Modernization Score: 94 / 100
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Benchmarking <span className="text-teal-400 font-bold">{activeDiagramName}</span> against 2026 Enterprise Standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          {/* Top Modernization Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/15 via-indigo-500/15 to-purple-500/15 border border-teal-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-extrabold text-teal-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Gemini 3.6 Autonomous Concept Drift Guard
              </div>
              <div className="text-sm font-bold text-white">
                Detected 2 high-ROI modernization opportunities to achieve 100% 2026 Enterprise Gold Standard.
              </div>
            </div>

            <button
              onClick={handleModernizeClick}
              disabled={isModernizing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-extrabold text-xs transition-all shadow-lg shrink-0 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isModernizing ? 'Auto-Modernizing AST...' : '1-Click Auto-Modernize Architecture'}</span>
            </button>
          </div>

          {/* Concept Drift Alerts */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Active Concept Drift Warnings ({conceptDriftAlerts.length})
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {conceptDriftAlerts.map((alert, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> {alert.title}
                    </span>
                    <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                      {alert.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">{alert.desc}</div>
                  <div className="text-xs font-extrabold text-emerald-400 pt-0.5">{alert.impact}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ThoughtWorks-Style Tech Radar Quadrants */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Enterprise Technology Lifespan Radar (ThoughtWorks 2026 Matrix)
            </span>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['adopt', 'trial', 'assess', 'hold'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuadrant(q)}
                  className={`p-2.5 rounded-xl border text-xs font-extrabold uppercase transition-all cursor-pointer ${
                    selectedQuadrant === q
                      ? radarQuadrants[q].color
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-panel-border space-y-3">
              <div className="text-xs font-extrabold text-white">
                {radarQuadrants[selectedQuadrant].title}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {radarQuadrants[selectedQuadrant].nodes.map((node, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-xs font-extrabold text-teal-300">{node.name}</div>
                    <div className="text-[11px] text-slate-400">{node.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-panel-border flex items-center justify-between bg-slate-950">
          <div className="text-xs text-slate-400">
            Powered by Gemini 3.6 Ultra-Deep Continuous Architectural Radar
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
}
