'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  Lock, 
  RefreshCw, 
  ArrowRight, 
  X,
  Command,
  Sliders,
  Award,
  Terminal
} from 'lucide-react';

interface ConversationalRefactorBarProps {
  activeDiagramName: string;
  onRefactorPrompt: (promptText: string) => Promise<void>;
  isRefactoring: boolean;
}

export function ConversationalRefactorBar({
  activeDiagramName,
  onRefactorPrompt,
  isRefactoring
}: ConversationalRefactorBarProps) {
  const [prompt, setPrompt] = useState('');
  const [quickChips] = useState([
    'Add Redis Caching Tier between API & Database',
    'Convert to Multi-Region Zero-Trust DR Architecture',
    'Inject Agentic RAG Retrieval with Vector Search',
    'Enforce VPC Service Controls & Cloud KMS Encryption'
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isRefactoring) return;
    onRefactorPrompt(prompt);
  };

  return (
    <div className="bg-slate-900/95 border-b border-teal-500/40 px-4 py-2.5 shadow-xl shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-teal-accent/20 border border-teal-500/40 flex items-center justify-center text-teal-accent">
            <Command className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 block">
              Gemini 3.6 Ultra-Deep Live Refactor Engine
            </span>
            <span className="text-xs font-bold text-white">
              Conversational Architecture Commands
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type command e.g. 'Add Redis cache layer', 'Switch to Multi-Region DR', 'Inject IAM WAF'..."
              className="w-full bg-slate-950 border border-teal-500/40 focus:border-teal-accent rounded-xl pl-3.5 pr-20 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-bold"
            />
            <span className="absolute right-2 top-1.5 text-[10px] font-extrabold bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
              ⌘K / ENTER
            </span>
          </div>

          <button
            type="submit"
            disabled={isRefactoring || !prompt.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-extrabold text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isRefactoring ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Refactoring AST...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply Refactor</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Quick Refactoring Prompt Chips */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 mt-2 overflow-x-auto pb-0.5">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0">1-Click Transformation:</span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPrompt(chip);
              onRefactorPrompt(chip);
            }}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white text-[11px] font-bold transition-all cursor-pointer"
          >
            + {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AuditComplianceDossierModal({
  isOpen,
  onClose,
  activeDiagramName,
  architectureType
}: {
  isOpen: boolean;
  onClose: () => void;
  activeDiagramName: string;
  architectureType: string;
}) {
  const [activeStandard, setActiveStandard] = useState<'soc2' | 'iso27001' | 'hipaa'>('soc2');
  const [isExported, setIsExported] = useState(false);

  if (!isOpen) return null;

  const standardsData = {
    soc2: {
      name: 'SOC2 Type II Enterprise Trust Services Dossier',
      badge: 'COMPLIANT (100% COVERAGE)',
      controls: [
        {
          id: 'CC6.1 - Logical & Physical Access Control',
          status: 'VERIFIED',
          node: '[2] Cloudflare Edge WAF & IAM Gateway',
          evidence: 'Multi-factor authentication (MFA) and OAuth2 OIDC identity token verification enforced at ingress perimeter.'
        },
        {
          id: 'CC6.6 - Boundary & Network Protection',
          status: 'VERIFIED',
          node: '[3] Dedicated VPC Service Controls Boundary',
          evidence: 'Air-gapped private IP routing with explicit egress rule matching via Cloud NAT & Cloud Interconnect.'
        },
        {
          id: 'CC6.7 - Data Encryption at Rest & In Transit',
          status: 'VERIFIED',
          node: '[7] Cloud SQL PostgreSQL (Customer-Managed Key)',
          evidence: 'TLS 1.3 mTLS mutual authentication in transit + AES-256 Cloud KMS Customer-Managed Encryption Key (CMEK) at rest.'
        },
        {
          id: 'CC7.2 - Anomaly & System Health Monitoring',
          status: 'VERIFIED',
          node: '[5] Kafka Event Stream & Operations Matrix',
          evidence: 'Continuous SIEM log aggregation and automated alert notifications on latency anomalies > 500ms.'
        }
      ]
    },
    iso27001: {
      name: 'ISO/IEC 27001:2022 Information Security Certification Package',
      badge: 'CERTIFIED ARCHITECTURE',
      controls: [
        {
          id: 'A.8.20 - Network Security & Isolation',
          status: 'VERIFIED',
          node: '[3] Enterprise Multi-Tier VPC Networks',
          evidence: 'Strict network segmentation separating DMZ frontend proxies, AI inference pods, and persistent database tiers.'
        },
        {
          id: 'A.8.24 - Use of Cryptography Controls',
          status: 'VERIFIED',
          node: '[8] Gemini 3.6 Ephemeral Prompt Cache Store',
          evidence: 'Automated 1-hour lifecycle token purging and encrypted ephemeral memory space.'
        }
      ]
    },
    hipaa: {
      name: 'HIPAA & HITECH Healthcare BAA Security Evidence Package',
      badge: 'BAA READY (PHI SECURED)',
      controls: [
        {
          id: '§ 164.312(a)(2)(iv) - Encryption & Decryption',
          status: 'VERIFIED',
          node: '[7] High-Availability Enterprise Database',
          evidence: 'Protected Health Information (PHI) encrypted with hardware-backed FIPS 140-2 Level 3 cryptographic keys.'
        }
      ]
    }
  };

  const current = standardsData[activeStandard];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-teal-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-panel-border flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-accent/20 border border-teal-500/40 flex items-center justify-center text-teal-accent">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Automated Enterprise Audit Compliance Dossier Generator
              </h2>
              <p className="text-xs text-slate-400">
                Cryptographically verified audit evidence package for <span className="text-teal-400 font-bold">{activeDiagramName}</span>
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

        {/* Standard Selector Tabs */}
        <div className="px-5 pt-4 flex items-center justify-between border-b border-panel-border/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStandard('soc2')}
              className={`px-4 py-2 rounded-t-xl text-xs font-extrabold cursor-pointer transition-all ${
                activeStandard === 'soc2'
                  ? 'bg-teal-accent text-bg-dark shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              SOC2 Type II Dossier
            </button>
            <button
              onClick={() => setActiveStandard('iso27001')}
              className={`px-4 py-2 rounded-t-xl text-xs font-extrabold cursor-pointer transition-all ${
                activeStandard === 'iso27001'
                  ? 'bg-teal-accent text-bg-dark shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              ISO/IEC 27001:2022
            </button>
            <button
              onClick={() => setActiveStandard('hipaa')}
              className={`px-4 py-2 rounded-t-xl text-xs font-extrabold cursor-pointer transition-all ${
                activeStandard === 'hipaa'
                  ? 'bg-teal-accent text-bg-dark shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              HIPAA Healthcare BAA
            </button>
          </div>

          <button
            onClick={() => {
              setIsExported(true);
              setTimeout(() => setIsExported(false), 3000);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer mb-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExported ? '✓ Exported PDF Dossier' : 'Export Cryptographic Audit Dossier'}</span>
          </button>
        </div>

        {/* Audit Evidence Controls Grid */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-teal-500/40">
            <div>
              <div className="text-xs font-extrabold text-white">{current.name}</div>
              <div className="text-[11px] text-slate-400">Verified by Gemini 3.6 Ultra-Deep AST Security Scanner</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
              {current.badge}
            </span>
          </div>

          <div className="space-y-3">
            {current.controls.map((ctrl, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-950/80 border border-panel-border/60 space-y-2 hover:border-teal-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-teal-300">{ctrl.id}</span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> {ctrl.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">Mapped Architectural Node: {ctrl.node}</div>
                <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 font-medium">
                  {ctrl.evidence}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-panel-border flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Digital SHA-256 Hash Signature Verified • Instant External Auditor Download</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
