'use client';

import React, { useState, useEffect } from 'react';
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
  Check,
  ChevronLeft,
  ChevronRight,
  Printer
} from 'lucide-react';

import PptxGenJS from 'pptxgenjs';
import { exportDiagramPng } from '../lib/export/diagramRaster';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '../lib/preflightAuditEngine';
import { estimateCloudArchitectureCost } from '../lib/cost/cloudCostEstimator';
import { parseXmlNodesAndEdges, DiagramNodeItem } from '../lib/graph/xmlNodesParser';
import { getArchitectureTypeById } from '../lib/architectureTypes';

interface ExecutiveStrategicSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramTitle: string;
  architectureType: string;
  xmlContent?: string;
  prompt?: string;
  businessUsecase?: string;
  technicalUsecase?: string;
  aiReasoning?: string;
}

export function ExecutiveStrategicSummaryModal({
  isOpen,
  onClose,
  diagramTitle,
  architectureType,
  xmlContent = '',
  prompt = '',
  businessUsecase = '',
  technicalUsecase = '',
  aiReasoning = ''
}: ExecutiveStrategicSummaryModalProps) {
  const [activeView, setActiveView] = useState<'slideshow' | 'board_deck' | 'reportee_memo'>('slideshow');
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [diagramPngUrl, setDiagramPngUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);

  useEffect(() => {
    if (isOpen && xmlContent) {
      try {
        const healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(xmlContent, architectureType);
        exportDiagramPng(healedXml, { scale: 3, transparent: true })
          .then(url => setDiagramPngUrl(url))
          .catch(() => {
            exportDiagramPng(xmlContent, { scale: 2, transparent: false })
              .then(url => setDiagramPngUrl(url))
              .catch(() => {});
          });
      } catch (e) {
        exportDiagramPng(xmlContent, { scale: 2, transparent: false })
          .then(url => setDiagramPngUrl(url))
          .catch(() => {});
      }
    }
  }, [isOpen, xmlContent, architectureType]);

  if (!isOpen) return null;

  const cleanTitle = (diagramTitle || 'Enterprise Architecture Platform')
    .replace(/^\d+\.\s*/, '')
    .trim();

  const archMeta = getArchitectureTypeById(architectureType);
  const costReport = estimateCloudArchitectureCost(xmlContent, cleanTitle, architectureType);
  const nodesAll = parseXmlNodesAndEdges(xmlContent || '').filter((i: DiagramNodeItem) => !i.isEdge);
  
  const displayPrompt = prompt || cleanTitle || 'Enterprise Cloud Architecture';
  const displayBusiness = businessUsecase || `Strategic enterprise deployment designed for ${cleanTitle}, delivering high-availability cloud infrastructure with continuous security, SLA-backed performance, and compliance governance.`;
  const displayTechnical = technicalUsecase || `Multi-tier decoupled cloud architecture leveraging modern API ingress gateways, containerized microservices, distributed persistence, and automated telemetry.`;
  const displayReasoning = aiReasoning || `Calibrated topology with deterministic 2D routing, zero line collision, and domain-tailored service boundaries.`;

  // Detect domain specifics
  const isFintech = /fintech|payment|bank|ledger|card|transact|pci/i.test(`${cleanTitle} ${displayPrompt}`);
  const isHealthcare = /health|fhir|hl7|patient|clinical|hipaa|medical/i.test(`${cleanTitle} ${displayPrompt}`);
  const complianceStandard = isFintech 
    ? 'PCI-DSS Level 1 • SOC2 Type II • KYC/AML • ISO 20022'
    : isHealthcare 
    ? 'HIPAA • HITRUST • GDPR • PHI De-Identification'
    : 'SOC2 Type II • ISO 27001 • CIS Benchmark Level 2 • GDPR';

  const handlePrintPdf = () => {
    window.print();
  };

  const handleExportBoardPptx = async () => {
    setIsGeneratingDeck(true);
    try {
      let pngUrl = diagramPngUrl;
      if (!pngUrl && xmlContent) {
        try {
          const healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(xmlContent, architectureType);
          pngUrl = await exportDiagramPng(healedXml, { scale: 3, transparent: true });
        } catch(e) {
          try {
            pngUrl = await exportDiagramPng(xmlContent, { scale: 2, transparent: false });
          } catch(err) {}
        }
      }

      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      // Slide 1: Cover / Executive Summary
      const slide1 = pptx.addSlide();
      slide1.background = { color: '0B101D' };
      slide1.addText('C-SUITE & BOARD EXECUTIVE ARCHITECTURE BRIEF', {
        x: 0.8, y: 0.8, w: 11.5, h: 0.4,
        fontSize: 14, color: '14B8A6', bold: true
      });
      slide1.addText(cleanTitle, {
        x: 0.8, y: 1.4, w: 11.5, h: 1.0,
        fontSize: 30, color: 'FFFFFF', bold: true
      });
      slide1.addText(`Domain Objective: ${displayPrompt}`, {
        x: 0.8, y: 2.5, w: 11.5, h: 0.5,
        fontSize: 15, color: '38BDF8', bold: true
      });
      slide1.addText(`• Strategic Objective: ${displayBusiness.slice(0, 160)}...\n• Technical Architecture: ${displayTechnical.slice(0, 160)}...\n• Estimated Monthly Cloud OPEX: $${costReport.totalMonthlyCostUsd.toLocaleString()}/mo ($${costReport.totalAnnualCostUsd.toLocaleString()}/yr)\n• Compliance Framework: ${complianceStandard}`, {
        x: 0.8, y: 3.2, w: 11.5, h: 2.8,
        fontSize: 14, color: 'E2E8F0'
      });

      // Slide 2: Visual Architecture Topology
      const slide2 = pptx.addSlide();
      slide2.background = { color: '0F172A' };
      slide2.addText(`PRODUCTION ARCHITECTURE TOPOLOGY: ${cleanTitle.toUpperCase()}`, {
        x: 0.8, y: 0.5, w: 11.5, h: 0.5,
        fontSize: 16, color: '14B8A6', bold: true
      });
      if (pngUrl) {
        slide2.addImage({
          data: pngUrl,
          x: 0.8, y: 1.2, w: 11.5, h: 5.6,
          sizing: { type: 'contain', w: 11.5, h: 5.6 }
        });
      }

      // Slide 3: Cost & Implementation Roadmap
      const slide3 = pptx.addSlide();
      slide3.background = { color: '0B101D' };
      slide3.addText('FINANCIAL ROI, OPEX & DEPLOYMENT ROADMAP', {
        x: 0.8, y: 0.6, w: 11.5, h: 0.5,
        fontSize: 16, color: '14B8A6', bold: true
      });
      slide3.addText(`Total Monthly OPEX: $${costReport.totalMonthlyCostUsd.toLocaleString()} / mo  |  Annual Budget: $${costReport.totalAnnualCostUsd.toLocaleString()} / yr`, {
        x: 0.8, y: 1.3, w: 11.5, h: 0.5,
        fontSize: 18, color: 'F59E0B', bold: true
      });
      slide3.addText(`• Phase 1 (Foundation): VPC Perimeter, Zero-Trust IAM & Ingress Gateways\n• Phase 2 (Core Services): Microservices, Event Buses & Active Ledger/Datastores\n• Phase 3 (Intelligence & Governance): AI Inference, Real-Time Analytics & FinOps\n• Recommendation: ${costReport.savingsRecommendation}`, {
        x: 0.8, y: 2.2, w: 11.5, h: 3.5,
        fontSize: 14, color: 'CBD5E1'
      });

      await pptx.writeFile({ fileName: `${cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_executive_board_deck.pptx` });
    } catch(e) {
      console.error('PPTX export failed:', e);
    } finally {
      setIsGeneratingDeck(false);
    }
  };

  const memoContent = `# C-Suite Executive Architecture Directive: ${cleanTitle}

**Target Domain / Prompt**: ${displayPrompt}
**Architecture Archetype**: ${archMeta?.name || architectureType}
**Date**: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
**Target Compliance Standard**: ${complianceStandard}
**Estimated Infrastructure Run-Rate**: $${costReport.totalMonthlyCostUsd.toLocaleString()} / month ($${costReport.totalAnnualCostUsd.toLocaleString()} / year)

---

## 1. Executive Summary & Business Strategic Intent
${displayBusiness}

### Key Business Value Drivers:
- **Time-to-Market Acceleration**: Rapid deployment of production-grade cloud topology tailored for ${displayPrompt}.
- **Regulatory & Compliance Assurance**: Enforces strict ${complianceStandard} compliance across all data flows.
- **Cost Predictability**: Optimized baseline monthly expenditure of $${costReport.totalMonthlyCostUsd.toLocaleString()} with commitment discounts saving up to 30%.

---

## 2. Technical Architecture & Component Specification
${displayTechnical}

### Core Subsystems & Components:
${nodesAll.slice(0, 8).map(n => `- **${n.label.replace(/<[^>]+>/g, '').trim()}**: Managed cloud component with high-availability clustering and automated health probes.`).join('\n')}

---

## 3. AI Architectural Reasoning & Design Verification
${displayReasoning}

- **Zero 2D Visual Collision**: Deterministic spatial layout and non-overlapping bus channels.
- **Zero-Trust Network Perimeter**: Ingress traffic routed through authenticated, encrypted conduits.

---

## 4. Implementation Directives & Milestones
1. **Milestone 1 (Infra Setup)**: Provision Cloud VPCs, IAM roles, and secret managers.
2. **Milestone 2 (Services Deploy)**: Deploy application workloads with autoscaling policies.
3. **Milestone 3 (Audit Sign-Off)**: Execute end-to-end security pen-tests and compliance verification.
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0B101D] border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070A13] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-extrabold text-base">
              💼
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-wide">
                  Executive Suite: {cleanTitle}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  C-SUITE BRIEF
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Contextual Executive Brief, Board Presentation Deck, and Technical Directives for <span className="text-teal-300 font-semibold">{displayPrompt}</span>
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setActiveView('slideshow')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'slideshow' ? 'bg-teal-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>16:9 Slides</span>
              </button>
              <button
                onClick={() => setActiveView('board_deck')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'board_deck' ? 'bg-teal-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Executive Deck</span>
              </button>
              <button
                onClick={() => setActiveView('reportee_memo')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'reportee_memo' ? 'bg-teal-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Technical Memo</span>
              </button>
            </div>

            <button
              onClick={handleExportBoardPptx}
              disabled={isGeneratingDeck}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 disabled:opacity-50"
              title="Download 16:9 PowerPoint Presentation Deck"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingDeck ? 'Generating...' : 'Export PPTX'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
              title="Close Executive Suite"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0B101D]">
          {activeView === 'slideshow' && (
            <div className="flex flex-col gap-4 max-w-5xl mx-auto">
              {/* Slide Container Frame (16:9 Aspect Ratio Look) */}
              <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-8 shadow-2xl relative min-h-[480px] flex flex-col justify-between">
                
                {/* Slide 1: Executive Overview & ROI */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">
                          SLIDE 01 // STRATEGIC EXECUTIVE BRIEF
                        </span>
                        <h3 className="text-2xl font-black text-white mt-1">
                          {cleanTitle}
                        </h3>
                        <p className="text-sm text-slate-400 mt-0.5 font-medium">
                          Domain Goal: <span className="text-teal-300 font-bold">{displayPrompt}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase font-semibold">Estimated Run-Rate</div>
                        <div className="text-2xl font-black text-amber-400">
                          ${costReport.totalMonthlyCostUsd.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                        <div className="flex items-center gap-2 text-teal-400 font-extrabold text-sm">
                          <Briefcase className="w-4 h-4" />
                          <span>BUSINESS VALUE &amp; SCOPE</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {displayBusiness}
                        </p>
                      </div>

                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                        <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm">
                          <ShieldCheck className="w-4 h-4" />
                          <span>COMPLIANCE &amp; GOVERNANCE</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-mono">
                          {complianceStandard}
                        </p>
                        <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Zero-Trust Ingress &amp; Continuous Telemetry Active</span>
                        </div>
                      </div>
                    </div>

                    {/* KPI Highlights */}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
                        <div className="text-xs text-slate-400 font-semibold">SLA Target</div>
                        <div className="text-xl font-extrabold text-emerald-400 mt-1">99.99%</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Multi-AZ Resiliency</div>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Annual OPEX Budget</div>
                        <div className="text-xl font-extrabold text-amber-400 mt-1">${costReport.totalAnnualCostUsd.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Enterprise Cloud Run-Rate</div>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Security Level</div>
                        <div className="text-xl font-extrabold text-teal-400 mt-1">Bank-Grade</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">KMS / HSM Enforced</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Slide 2: Active Architecture Canvas Visual */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">
                          SLIDE 02 // ARCHITECTURE TOPOLOGY MAP
                        </span>
                        <h3 className="text-xl font-black text-white mt-0.5">
                          {cleanTitle} Visual Blueprint
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                        {nodesAll.length} Discovered Components
                      </span>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-center min-h-[300px] overflow-hidden">
                      {diagramPngUrl ? (
                        <img 
                          src={diagramPngUrl} 
                          alt={cleanTitle} 
                          className="max-h-[340px] max-w-full object-contain rounded-lg border border-slate-800/80 shadow-lg"
                        />
                      ) : (
                        <div className="text-center text-slate-500 text-xs py-12">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 text-teal-400 animate-pulse" />
                          <span>Compiling High-Resolution Topology Snapshot...</span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 italic text-center">
                      Deterministic 2D AST spatial alignment with 140px clear-zone and zero line collisions.
                    </div>
                  </div>
                )}

                {/* Slide 3: Technical Implementation Roadmap */}
                {currentSlide === 3 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">
                          SLIDE 03 // TECHNICAL ROADMAP &amp; DIRECTIVES
                        </span>
                        <h3 className="text-xl font-black text-white mt-0.5">
                          Engineering Execution Plan
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        {costReport.provider} Infrastructure
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                        <div className="text-teal-400 font-extrabold mb-1">Phase 1: Ingress &amp; Security Boundary (Days 1–15)</div>
                        <p className="text-slate-300">Deploy VPC Service Controls, Cloud Armor Anti-DDoS, and OAuth 2.0 / mTLS gateways.</p>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                        <div className="text-indigo-400 font-extrabold mb-1">Phase 2: Core Microservices &amp; Persistence (Days 16–35)</div>
                        <p className="text-slate-300">Deploy containerized APIs on Cloud Run, Pub/Sub messaging bus, and High-Availability databases.</p>
                      </div>
                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                        <div className="text-emerald-400 font-extrabold mb-1">Phase 3: Intelligence, Analytics &amp; FinOps (Days 36–50)</div>
                        <p className="text-slate-300">Integrate Vertex AI / Gemini reasoning models, BigQuery analytics, and continuous cost optimization.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Slide Controls Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
                      disabled={currentSlide === 1}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-400">
                      Slide {currentSlide} of 3
                    </span>
                    <button
                      onClick={() => setCurrentSlide(prev => Math.min(3, prev + 1))}
                      disabled={currentSlide === 3}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintPdf}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Brief</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeView === 'board_deck' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white">Board of Directors Architecture Dossier</h3>
                    <p className="text-xs text-slate-400">Strategic investment breakdown for {cleanTitle}</p>
                  </div>
                  <button
                    onClick={handleExportBoardPptx}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 16:9 Board Deck (.pptx)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 font-semibold">Monthly Cloud Investment</div>
                    <div className="text-2xl font-black text-teal-400 mt-1">${costReport.totalMonthlyCostUsd.toLocaleString()}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{costReport.provider} Infrastructure</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 font-semibold">Target Compliance</div>
                    <div className="text-sm font-extrabold text-white mt-1">{complianceStandard.split('•')[0]}</div>
                    <div className="text-[11px] text-emerald-400 mt-1">Audit Ready</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 font-semibold">Architecture Readiness</div>
                    <div className="text-2xl font-black text-indigo-400 mt-1">Tier-1 HA</div>
                    <div className="text-[11px] text-slate-500 mt-1">99.99% Availability</div>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-sm font-extrabold text-teal-300">Executive Strategic Summary</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{displayBusiness}</p>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-sm font-extrabold text-indigo-300">Cost Optimization Recommendation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{costReport.savingsRecommendation}</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'reportee_memo' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-teal-400 uppercase tracking-wider">
                    Direct Reportee Technical Implementation Directive
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(memoContent);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown Memo'}</span>
                  </button>
                </div>

                <pre className="bg-[#070A13] border border-slate-800 rounded-xl p-5 text-xs text-slate-200 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[480px]">
                  {memoContent}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
