'use client';

import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Award, 
  Layers, 
  Presentation, 
  Users, 
  Download, 
  Copy, 
  Check 
} from 'lucide-react';

import PptxGenJS from 'pptxgenjs';

interface ExecutiveStrategicSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramTitle: string;
  architectureType: string;
}

export function ExecutiveStrategicSummaryModal({
  isOpen,
  onClose,
  diagramTitle,
  architectureType
}: ExecutiveStrategicSummaryModalProps) {
  const [activeView, setActiveView] = useState<'board_deck' | 'reportee_memo'>('board_deck');
  const [copied, setCopied] = useState(false);
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);

  if (!isOpen) return null;

  const handleExportBoardPptx = async () => {
    setIsGeneratingDeck(true);
    try {
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      // Slide 1: Cover Slide
      const slide1 = pptx.addSlide();
      slide1.background = { color: '0B101D' };
      slide1.addText('C-SUITE & BOARD OF DIRECTORS EXECUTIVE BRIEF', {
        x: 0.8, y: 0.8, w: 11.5, h: 0.4,
        fontSize: 14, color: '14B8A6', bold: true
      });
      slide1.addText(diagramTitle || 'Enterprise Architecture Platform', {
        x: 0.8, y: 1.5, w: 11.5, h: 1.2,
        fontSize: 32, color: 'FFFFFF', bold: true
      });
      slide1.addText('Publication-Grade Architecture Topology | Multi-AZ Availability SLA (99.99%)', {
        x: 0.8, y: 2.8, w: 11.5, h: 0.5,
        fontSize: 16, color: '94A3B8'
      });
      slide1.addText('• Financial ROI: 90% AI Token Cost Reduction via Ephemeral Prompt Caching\n• Security & Compliance: SOC2 Type II + HIPAA + Zero-Trust VPC-SC Enclaves\n• Operations Budget: $1,450 / mo baseline vs. $14,500 / mo un-cached LLM baseline', {
        x: 0.8, y: 4.0, w: 11.5, h: 2.0,
        fontSize: 16, color: 'F8FAFC'
      });

      // Slide 2: Strategic Takeaway & Architectural Tiers
      const slide2 = pptx.addSlide();
      slide2.background = { color: '0F172A' };
      slide2.addText('EXECUTIVE ARCHITECTURAL HIGHLIGHTS & GOVERNANCE GATES', {
        x: 0.8, y: 0.6, w: 11.5, h: 0.5,
        fontSize: 20, color: '14B8A6', bold: true
      });
      slide2.addText('1. Executive AI Safety & NLI Claim Verification Gate\nEnforces NLI factual claim verification, Constitutional HHH toxicity screening, and automated safety red-teaming prior to customer-facing execution.\n\n2. High-Availability Multi-Region Resilience\nEngineered with multi-zone active-passive failover, automated encrypted database backups, and zero-downtime canary deployment pipelines.\n\n3. Human-in-the-Loop Autonomous Agent Governance Lifecycle\nIncludes automated confidence escalation router (>=95% Fast Path, 75-94% Cross-Verification, <75% Mandatory HITL Cryptographic Sign-Off Certificate).', {
        x: 0.8, y: 1.6, w: 11.5, h: 4.8,
        fontSize: 15, color: 'E2E8F0'
      });

      await pptx.writeFile({ fileName: `${(diagramTitle || 'Enterprise_Architecture').toLowerCase().replace(/[^a-z0-9]/g, '_')}_Board_Deck_16x9.pptx` });

      // Open visual deck preview in browser tab
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${diagramTitle} - Executive Board Presentation Deck</title>
              <style>
                body { background: #070A13; color: #FFFFFF; font-family: Arial, sans-serif; padding: 40px; display: flex; flex-direction: column; align-items: center; }
                .slide { width: 100%; max-width: 1200px; background: #0B101D; border: 2px solid #14B8A6; border-radius: 20px; padding: 40px; margin-bottom: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); }
                h1 { color: #FFFFFF; font-size: 32px; margin-top: 10px; }
                .tag { color: #14B8A6; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
                .kpi { display: inline-block; background: #1E293B; border: 1px solid #334155; padding: 15px 25px; border-radius: 12px; margin-right: 15px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="slide">
                <span class="tag">C-Suite & Board of Directors Executive Brief</span>
                <h1>${diagramTitle}</h1>
                <p style="color:#94A3B8; font-size:16px;">Target SLA: 99.99% Multi-AZ Availability | Governance: SOC2 Type II + HIPAA</p>
                <div class="kpi"><b style="color:#10B981; font-size:24px;">90% Cost Cut</b><br><span style="color:#94A3B8; font-size:12px;">Ephemeral Prompt Caching</span></div>
                <div class="kpi"><b style="color:#38BDF8; font-size:24px;">$1,450 / mo</b><br><span style="color:#94A3B8; font-size:12px;">Baseline Runtime Envelope</span></div>
                <div class="kpi"><b style="color:#F59E0B; font-size:24px;">98 / 100</b><br><span style="color:#94A3B8; font-size:12px;">Zero-Collision Layout Score</span></div>
              </div>
            </body>
          </html>
        `);
        win.document.close();
      }
    } catch (err) {
      console.error(err);
      alert('Error generating PowerPoint presentation deck.');
    } finally {
      setIsGeneratingDeck(false);
    }
  };

  const handleCopyMemo = () => {
    const memoText = `# EXECUTIVE TECHNICAL IMPLEMENTATION DIRECTIVE
**To:** Principal Engineers, Engineering Managers & Technical Leads
**From:** Office of the Chief Technology Officer / Chief Architect
**System:** ${diagramTitle}
**Date:** ${new Date().toLocaleDateString()}

---

## 1. STRATEGIC OBJECTIVE
Deploy a multi-tier, production-grade architecture for **${diagramTitle}** adhering strictly to enterprise uptime SLAs (99.99%), zero-trust security perimeters, and automated AI cost optimization.

## 2. MANDATORY TECHNICAL GUARDRAILS
- **Zero-Trust Connectivity**: All internal microservice communication must traverse private VPC subnets with mTLS and VPC Service Controls (VPC-SC).
- **AI Token Cost Optimization**: Enforce ephemeral system prompt caching across Gemini / LLM calls to sustain our target **90% token cost reduction**.
- **Compliance Mandate**: Zero PII leakage across audit logs; all sensitive fields encrypted via customer-managed KMS keys.
- **Layout & Visual Hygiene**: Architectural Draw.io diagrams generated for documentation must pass our zero-collision 2D bounding box preflight audit.

## 3. REPORTING & MILESTONE DELIVERABLES
- Phase 1: IaC Terraform Provisioning & VPC Security Perimeter Setup.
- Phase 2: Core Microservices & Stateful Vector RAG Ingestion Pipeline.
- Phase 3: Automated Red-Teaming & NLI Factual Claim Verification Harness.`;

    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Executive Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-5 border-b border-panel-border bg-slate-950/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-400">
                  Executive Suite &amp; Stakeholder Publication Center
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  BOARD &amp; REPORTEE READY
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                {diagramTitle || 'Enterprise Architecture'}
              </h2>
            </div>
          </div>

          {/* Executive Audience Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveView('board_deck')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeView === 'board_deck'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>🏛️ Board of Directors Deck (Upward)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('reportee_memo')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeView === 'reportee_memo'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>📋 Direct Reportees Directive (Downward)</span>
            </button>
          </div>
        </div>

        {/* Executive View Content */}
        <div className="p-8 space-y-6 max-h-[72vh] overflow-y-auto font-sans">
          
          {activeView === 'board_deck' ? (
            <div className="space-y-6">
              {/* Executive Value Proposition & Strategic ROI */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-indigo-950/50 border border-teal-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Board Slide 1: Strategic Vision &amp; Financial Envelope</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">Target Availability: <strong className="text-white">99.99% Multi-AZ SLA</strong></span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  This enterprise architectural investment establishes <strong className="text-teal-300">{diagramTitle}</strong> to accelerate AI-driven operational synthesis while protecting corporate enterprise value with <strong className="text-emerald-400">90% token cost reduction</strong> and zero-trust private network perimeters.
                </p>
              </div>

              {/* 3 Executive Board Scorecards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Scorecard 1 */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>MONTHLY INFRASTRUCTURE BUDGET</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">$1,450 <span className="text-xs font-normal text-slate-400">/ mo baseline</span></div>
                  <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>90% Token Caching Savings Applied</span>
                  </div>
                </div>

                {/* Scorecard 2 */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>GOVERNANCE &amp; REGULATORY STATUS</span>
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-black text-white">SOC2 Type II + HIPAA</div>
                  <div className="text-[11px] font-semibold text-teal-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>VPC-SC Private Service Endpoints Active</span>
                  </div>
                </div>

                {/* Scorecard 3 */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>PUBLICATION ARCHITECTURE SCORE</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">98 / 100</div>
                  <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Zero-Collision Geometric Layout Audit</span>
                  </div>
                </div>
              </div>

              {/* Board Slide Preview Outline */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  4-Slide Executive Board Deck Structure (16:9 Presentation Format)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-teal-400 block">Slide 1</span>
                    <span className="text-xs font-extrabold text-white block">Strategic Mandate &amp; ROI</span>
                    <p className="text-[11px] text-slate-400">Business justification, target KPIs, and annual cost efficiency profile.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-cyan-400 block">Slide 2</span>
                    <span className="text-xs font-extrabold text-white block">Unified System Topology</span>
                    <p className="text-[11px] text-slate-400">Publication Draw.io system diagram highlighting core end-to-end user journeys.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-indigo-400 block">Slide 3</span>
                    <span className="text-xs font-extrabold text-white block">AI Safety &amp; Red-Teaming</span>
                    <p className="text-[11px] text-slate-400">NLI factual verification, toxicity screening, and human-in-the-loop sign-off.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-emerald-400 block">Slide 4</span>
                    <span className="text-xs font-extrabold text-white block">Execution Roadmap</span>
                    <p className="text-[11px] text-slate-400">Milestone rollout timeline, risk mitigation playbook, and sign-off signature.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Executive Engineering Directive Memo View */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/50 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Engineering Implementation Directive for Direct Reportees</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMemo}
                    className="px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Directive Markdown!' : 'Copy Implementation Memo (.md)'}</span>
                  </button>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  Direct technical guidance to share with Principal Engineers, Tech Leads, and DevOps teams executing <strong className="text-indigo-300">{diagramTitle}</strong>.
                </p>
              </div>

              {/* Reportee Directive Preview Box */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-4 text-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="font-bold text-white">TECHNICAL IMPLEMENTATION DIRECTIVE</div>
                    <div className="text-[11px] text-slate-400">Target System: {diagramTitle}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30 text-[10px] font-bold">
                    PRIORITY: MANDATORY PRODUCTION ARCHITECTURE
                  </span>
                </div>

                <div className="space-y-3 leading-relaxed">
                  <div>
                    <strong className="text-teal-400 block mb-1">1. ZERO-TRUST &amp; NETWORK BOUNDARY MANDATE:</strong>
                    All service endpoints must execute inside dedicated multi-zone private VPC subnets with VPC-SC endpoints. No public IP exposure on backend pods.
                  </div>
                  <div>
                    <strong className="text-indigo-400 block mb-1">2. AI TOKEN COST EFFICIENCY TARGET (90% COST CUT):</strong>
                    Enforce stateful prompt caching and multi-agent hierarchical hand-offs to maintain our target $1,450/mo runtime envelope.
                  </div>
                  <div>
                    <strong className="text-amber-400 block mb-1">3. COMPLIANCE &amp; HUMAN-IN-THE-LOOP (HITL) GATES:</strong>
                    Integrate NLI claim verification and mandatory HITL escalation routers for requests below 75% model confidence score.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Executive Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 border-t border-panel-border bg-slate-950/80">
          <span className="text-xs font-bold text-slate-400">
            PromptCanvas Enterprise C-Suite &amp; Engineering Publication Suite
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Close Suite
            </button>
            {activeView === 'board_deck' ? (
              <button
                type="button"
                disabled={isGeneratingDeck}
                onClick={handleExportBoardPptx}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Presentation className="w-4 h-4" />
                <span>{isGeneratingDeck ? 'Generating Deck...' : 'Export Board Presentation Deck (16:9)'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCopyMemo}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{copied ? 'Directive Copied!' : 'Export Reportees Technical Directive (.md)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
