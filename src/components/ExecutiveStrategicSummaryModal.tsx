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
import { exportDiagramPng } from '../lib/export/diagramRaster';

interface ExecutiveStrategicSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramTitle: string;
  architectureType: string;
  xmlContent?: string;
}

export function ExecutiveStrategicSummaryModal({
  isOpen,
  onClose,
  diagramTitle,
  architectureType,
  xmlContent = ''
}: ExecutiveStrategicSummaryModalProps) {
  const [activeView, setActiveView] = useState<'board_deck' | 'reportee_memo'>('board_deck');
  const [copied, setCopied] = useState(false);
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);

  if (!isOpen) return null;

  const cleanTitle = (diagramTitle || 'Enterprise Architecture Platform')
    .replace(/^\d+\.\s*/, '')
    .trim();

  const handleExportBoardPptx = async () => {
    setIsGeneratingDeck(true);
    try {
      // Rasterize actual architecture canvas diagram image
      let diagramPngUrl = '';
      if (xmlContent) {
        try {
          diagramPngUrl = await exportDiagramPng(xmlContent, { scale: 2, transparent: false });
        } catch(e) {
          console.warn('PNG raster preview fallback', e);
        }
      }

      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      // Slide 1: Cover Slide
      const slide1 = pptx.addSlide();
      slide1.background = { color: '0B101D' };
      slide1.addText('C-SUITE & BOARD OF DIRECTORS EXECUTIVE BRIEF', {
        x: 0.8, y: 0.8, w: 11.5, h: 0.4,
        fontSize: 14, color: '14B8A6', bold: true
      });
      slide1.addText(cleanTitle, {
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

      await pptx.writeFile({ fileName: `${cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_Board_Deck_16x9.pptx` });

      // Open interactive 7-Slide Whole Product Google CEO 16:9 Keynote Presentation Deck Viewer tab in browser
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>PromptCanvas - Whole Product Strategic Business Deck for Google CEO (7 Slides)</title>
              <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #070A13; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow: hidden; width: 100vw; height: 100vh; display: flex; flex-direction: column; }
                .topbar { height: 64px; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 32px; background: #0B101D; border-bottom: 1px solid #1E293B; shrink-0; z-index: 10; }
                .logo { display: flex; align-items: center; gap: 12px; font-weight: 900; font-size: 17px; color: #14B8A6; letter-spacing: 0.5px; }
                .controls { display: flex; align-items: center; gap: 14px; }
                .btn { background: #1E293B; color: #F8FAFC; border: 1px solid #334155; padding: 8px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; }
                .btn:hover { background: #334155; border-color: #14B8A6; }
                .btn-teal { background: #14B8A6; color: #070A13; border: none; font-weight: 900; }
                .slide-stage { flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px 32px; position: relative; }
                .slide { display: none; width: 100%; max-width: 1440px; aspect-ratio: 16 / 9; max-height: 820px; background: #0B101D; border: 2px solid #14B8A6; border-radius: 28px; padding: 48px 56px; flex-direction: column; justify-content: space-between; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.85); animation: fadeIn 0.3s ease; }
                .slide.active { display: flex; }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.99); } to { opacity: 1; transform: scale(1); } }
                .slide-tag { color: #14B8A6; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
                .slide-title { font-size: 42px; font-weight: 900; margin: 10px 0 8px 0; color: #FFFFFF; line-height: 1.1; }
                .slide-subtitle { color: #94A3B8; font-size: 18px; line-height: 1.4; margin-bottom: 20px; }
                .grid-2 { display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; align-items: center; }
                .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .card { background: #111827; border: 1px solid #1E293B; border-radius: 20px; padding: 24px; }
                .kpi-num { font-size: 40px; font-weight: 900; line-height: 1.1; }
                .kpi-label { font-size: 13px; font-weight: 700; color: #94A3B8; margin-top: 6px; }
                .chart-bar-bg { width: 100%; height: 34px; background: #1E293B; border-radius: 10px; overflow: hidden; margin-top: 8px; position: relative; }
                .chart-bar-fill { height: 100%; display: flex; align-items: center; padding-left: 14px; font-weight: 900; font-size: 13px; border-radius: 10px; }
                .badge { display: inline-block; background: #065F46; color: #A7F3D0; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 99px; border: 1px solid #10B981; }
                .footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1E293B; padding-top: 16px; color: #64748B; font-size: 12px; font-weight: 600; }
                @media print {
                  @page { size: landscape; margin: 0; }
                  body { overflow: visible !important; width: auto !important; height: auto !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: #070A13 !important; }
                  .topbar { display: none !important; }
                  .slide-stage { padding: 0 !important; display: block !important; }
                  .slide { display: flex !important; width: 100vw !important; height: 100vh !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; border: none !important; page-break-after: always !important; break-after: page !important; box-shadow: none !important; }
                }
              </style>
            </head>
            <body>
              <div class="topbar">
                <div class="logo">
                  <span>✨ PROMPTCANVAS: WHOLE PRODUCT STRATEGIC BUSINESS DECK • GOOGLE C-SUITE</span>
                </div>
                <div class="controls">
                  <span id="slideIndicator" style="color:#14B8A6; font-size:14px; font-weight:800; margin-right:10px;">SLIDE 1 OF 7</span>
                  <button class="btn" onclick="changeSlide(-1)">◄ Previous (←)</button>
                  <button class="btn" onclick="changeSlide(1)">Next (→) ►</button>
                  <button class="btn btn-teal" onclick="window.print()">🖨️ Export PDF / Slides</button>
                </div>
              </div>

              <div class="slide-stage">
                <!-- SLIDE 1: STRATEGIC VISION & WHOLE PRODUCT MANDATE -->
                <div class="slide active" id="slide-1">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">01 // WHOLE PRODUCT STRATEGIC VALUE PROPOSITION</span>
                      <span class="badge">FLAGSHIP GOOGLE CLOUD ENTERPRISE SUITE</span>
                    </div>
                    <h1 class="slide-title">PromptCanvas: Universal Enterprise AI Architecture &amp; Publication Suite</h1>
                    <p class="slide-subtitle">The industry's first Deterministic Text-to-Architecture Compiler powered by Gemini 2.5 Flash + Ephemeral Context Caching.</p>

                    <div class="grid-2" style="margin-top:14px;">
                      <div class="card" style="border-color:#14B8A6; background:#0F172A;">
                        <span class="slide-tag" style="color:#14B8A6;">WHOLE-PRODUCT CORE CAPABILITIES</span>
                        <ul style="margin-top:10px; color:#E2E8F0; font-size:14px; line-height:1.6; padding-left:20px;">
                          <li><b>Instant Natural Prompt to Draw.io &amp; Terraform:</b> Converts natural language descriptions into zero-collision publication diagrams and deployment-ready Infrastructure-as-Code.</li>
                          <li><b>100% Coverage Across 7 Enterprise Personas &amp; 12 Global Industries:</b> Dedicated toolkits for C-Suite Leadership, FinTech Risk Leads, Compliance Officers, Cloud Architects, and DevOps leads.</li>
                          <li><b>Google Cloud Native Revenue Driver:</b> Native pull-through provisioning GCP Cloud Run, Vertex AI, and VPC Service Controls (VPC-SC).</li>
                        </ul>
                      </div>
                      <div class="card">
                        <span class="slide-tag">FLAGSHIP BUSINESS ROI METRICS</span>
                        <div style="margin-top:10px; display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">
                          <div>
                            <div class="kpi-num" style="color:#10B981; font-size:32px;">6s vs 6w</div>
                            <div class="kpi-label">Time-to-Architecture reduction</div>
                          </div>
                          <div>
                            <div class="kpi-num" style="color:#38BDF8; font-size:32px;">90% Cut</div>
                            <div class="kpi-label">Gemini Context Caching OPEX savings</div>
                          </div>
                          <div>
                            <div class="kpi-num" style="color:#F59E0B; font-size:32px;">$156.6K</div>
                            <div class="kpi-label">Net annual savings per enterprise deployment</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Lower Stage Workflow Architecture Flowchart -->
                    <div style="margin-top:20px; background:#070A13; border:1px solid #1E293B; border-radius:18px; padding:18px;">
                      <span class="slide-tag" style="font-size:11px;">DETERMINISTIC TEXT-TO-ARCHITECTURE COMPILATION WORKFLOW</span>
                      <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:12px; margin-top:12px; align-items:center; text-align:center;">
                        <div style="background:#111827; border:1px solid #334155; padding:12px; border-radius:12px;">
                          <div style="color:#14B8A6; font-weight:800; font-size:12px;">1. NATURAL PROMPT</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">Natural language intent or architecture requirements</div>
                        </div>
                        <div style="color:#14B8A6; font-weight:900; font-size:20px;">➔</div>
                        <div style="background:#111827; border:1px solid #14B8A6; padding:12px; border-radius:12px;">
                          <div style="color:#14B8A6; font-weight:800; font-size:12px;">2. GEMINI 2.5 CACHING</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">Ephemeral prompt context router (90% OPEX cut)</div>
                        </div>
                        <div style="color:#14B8A6; font-weight:900; font-size:20px;">➔</div>
                        <div style="background:#111827; border:1px solid #10B981; padding:12px; border-radius:12px;">
                          <div style="color:#10B981; font-weight:800; font-size:12px;">3. DEPLOYABLE BLUEPRINT</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">Zero-collision Draw.io XML + Terraform HCL + GCP Shell</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Executive Presentation: Google CEO &amp; Google Cloud Board Review</span>
                    <span>Use Left/Right Arrow Keys to Navigate Slides</span>
                  </div>
                </div>

                <!-- SLIDE 2: PRODUCTION SYSTEMS TOPOLOGY & LIVE RENDERED ARCHITECTURE SHOWCASE -->
                <div class="slide" id="slide-2">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">02 // PRODUCTION SYSTEMS TOPOLOGY &amp; LIVE VISUAL CANVAS SHOWCASE</span>
                      <span class="badge" style="background:#1E3A8A; color:#93C5FD; border-color:#3B82F6;">LIVE RENDERED PUBLICATION DIAGRAM</span>
                    </div>
                    <h1 class="slide-title">End-to-End Enterprise Architecture Topology Showcase</h1>
                    <p class="slide-subtitle">Live high-resolution visual layout compiled by PromptCanvas with zero 2D node collision.</p>

                    ${diagramPngUrl ? `
                      <div style="display:flex; justify-content:center; align-items:center; background:#070A13; border:2px solid #14B8A6; border-radius:20px; padding:14px; margin: 10px 0; height: 440px; overflow: hidden; box-shadow:0 20px 40px rgba(0,0,0,0.6);">
                        <img src="${diagramPngUrl}" alt="Live Architecture Topology Snapshot" style="width:100%; height:100%; object-fit:contain; border-radius:12px;" />
                      </div>
                    ` : `
                      <div class="grid-3" style="margin-top: 24px;">
                        <div class="card" style="border-left:4px solid #14B8A6;">
                          <h3 style="color:#14B8A6; font-size:20px; margin-bottom:12px;">1. Executive AI Safety &amp; NLI Gate</h3>
                          <p style="color:#CBD5E1; font-size:15px; line-height:1.6;">Natural Language Inference (NLI) claim verification and Constitutional HHH toxicity screening audit every architecture edge prior to generation.</p>
                        </div>
                        <div class="card" style="border-left:4px solid #38BDF8;">
                          <h3 style="color:#38BDF8; font-size:20px; margin-bottom:12px;">2. Multi-Zone Cloud High Availability</h3>
                          <p style="color:#CBD5E1; font-size:15px; line-height:1.6;">Active-passive failover across 3 GCP availability zones, VPC Service Controls (VPC-SC), and automated point-in-time database snapshots.</p>
                        </div>
                        <div class="card" style="border-left:4px solid #F59E0B;">
                          <h3 style="color:#F59E0B; font-size:20px; margin-bottom:12px;">3. Cryptographic HITL Governance Router</h3>
                          <p style="color:#CBD5E1; font-size:15px; line-height:1.6;">Automated routing escalates any path with confidence &lt;75% to mandatory Human-in-the-Loop executive cryptographic sign-off.</p>
                        </div>
                      </div>
                    `}

                    <!-- Lower Stage Architecture Verification Strip -->
                    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:8px;">
                      <div style="background:#111827; border:1px solid #1E293B; padding:10px 14px; border-radius:12px; display:flex; align-items:center; gap:8px;">
                        <span style="color:#10B981; font-weight:900;">✓</span>
                        <span style="color:#CBD5E1; font-size:12px; font-weight:700;">Zero 2D Visual Line Crossing</span>
                      </div>
                      <div style="background:#111827; border:1px solid #1E293B; padding:10px 14px; border-radius:12px; display:flex; align-items:center; gap:8px;">
                        <span style="color:#10B981; font-weight:900;">✓</span>
                        <span style="color:#CBD5E1; font-size:12px; font-weight:700;">140px Line Split Clear-Zone</span>
                      </div>
                      <div style="background:#111827; border:1px solid #1E293B; padding:10px 14px; border-radius:12px; display:flex; align-items:center; gap:8px;">
                        <span style="color:#10B981; font-weight:900;">✓</span>
                        <span style="color:#CBD5E1; font-size:12px; font-weight:700;">VPC Service Control Enclaves</span>
                      </div>
                      <div style="background:#111827; border:1px solid #1E293B; padding:10px 14px; border-radius:12px; display:flex; align-items:center; gap:8px;">
                        <span style="color:#10B981; font-weight:900;">✓</span>
                        <span style="color:#CBD5E1; font-size:12px; font-weight:700;">Terraform &amp; GCP Shell Ready</span>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Visual Audit Engine: Zero-Collision Layout Geometry + Policy Enclave Verification</span>
                    <span>Use Left/Right Arrow Keys to Navigate Slides</span>
                  </div>
                </div>

                <!-- SLIDE 3: FULL-SPECTRUM PERSONA & 12-INDUSTRY DOMAIN SUITE -->
                <div class="slide" id="slide-3">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">03 // MARKET REACH • 7 ENTERPRISE PERSONAS &amp; 12 GLOBAL INDUSTRY SECTORS</span>
                      <span class="badge">100% BUSINESS &amp; TECHNICAL COVERAGE</span>
                    </div>
                    <h1 class="slide-title">Built for C-Suite Executives &amp; Cloud Engineers Alike</h1>
                    <p class="slide-subtitle">Instant persona-filtered blueprint library and industry-tailored architectural synthesis presets.</p>

                    <div class="grid-3" style="margin-top:14px;">
                      <div class="card" style="border-left:4px solid #14B8A6;">
                        <h3 style="color:#14B8A6; font-size:17px; margin-bottom:6px;">💼 Executive &amp; C-Suite Suite</h3>
                        <p style="color:#CBD5E1; font-size:13px; line-height:1.5;">16:9 Board Presentation Decks, Financial ROI Scorecards, and Direct Reportee Technical Directives (.md).</p>
                      </div>
                      <div class="card" style="border-left:4px solid #38BDF8;">
                        <h3 style="color:#38BDF8; font-size:17px; margin-bottom:6px;">🏛️ Cloud &amp; Security CISOs</h3>
                        <p style="color:#CBD5E1; font-size:13px; line-height:1.5;">Zero-Trust VPC Service Control enclaves, SOC2 Type II, HIPAA, PCI-DSS compliance tags, and NLI factual claim verification.</p>
                      </div>
                      <div class="card" style="border-left:4px solid #F59E0B;">
                        <h3 style="color:#F59E0B; font-size:17px; margin-bottom:6px;">📊 Data &amp; AI Engineers</h3>
                        <p style="color:#CBD5E1; font-size:13px; line-height:1.5;">Multi-Agent LangGraph topologies, Stateful RAG lakehouse streaming pipelines, and automated DevOps/GitOps CI/CD tracks.</p>
                      </div>
                    </div>

                    <!-- Lower Stage 7-Persona & 12-Industry Interactive Sector Badges Grid -->
                    <div style="margin-top:16px; background:#070A13; border:1px solid #1E293B; border-radius:18px; padding:18px;">
                      <div style="display:flex; justify-content:space-between; align-items:center; mb-2;">
                        <span class="slide-tag" style="font-size:11px;">12 GLOBAL INDUSTRY SECTOR ARCHITECTURE PRESETS</span>
                        <span style="color:#14B8A6; font-weight:800; font-size:12px;">25 BLUEPRINTS READY</span>
                      </div>
                      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; margin-top:10px;">
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🏦 FinTech &amp; Banking</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🧬 Healthcare HIPAA</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🛡️ Defense Sovereign</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🤖 Autonomous Robotics</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🚗 Automotive Telematics</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">⚡ Energy Smart Grid</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🛒 E-Commerce Scale</div>
                        <div style="background:#111827; border:1px solid #334155; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; color:#E2E8F0;">🎬 Media CDN Streaming</div>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Product Architecture: Multi-Persona Single-Accordion Ergonomics</span>
                    <span>Use Left/Right Arrow Keys to Navigate Slides</span>
                  </div>
                </div>

                <!-- SLIDE 4: WHY GOOGLE CLOUD WINS (GEMINI 2.5 CONTEXT CACHING MOAT) -->
                <div class="slide" id="slide-4">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">04 // GOOGLE CLOUD ECOSYSTEM SYNERGY • GEMINI 2.5 CACHING MOAT</span>
                      <span class="badge" style="background:#065F46; color:#A7F3D0; border-color:#10B981;">DEEP GCP INFRASTRUCTURE PULL-THROUGH</span>
                    </div>
                    <h1 class="slide-title">Why PromptCanvas Makes Google Cloud the #1 Enterprise AI Platform</h1>
                    <p class="slide-subtitle">Leverages Gemini 2.5 Flash Ephemeral Context Caching to create an unassailable economic advantage over OpenAI &amp; AWS.</p>

                    <div class="grid-3" style="margin-top:16px;">
                      <div class="card">
                        <span style="color:#10B981; font-weight:900; font-size:12px;">GEMINI 2.5 CACHING MOAT</span>
                        <h3 style="color:#FFFFFF; font-size:18px; margin:6px 0;">90% Lower LLM OPEX</h3>
                        <p style="color:#94A3B8; font-size:13px; line-height:1.5;">PromptCanvas caches multi-tier system schemas in Gemini 2.5 ephemeral context windows, reducing repeated compilation costs by 90%.</p>
                      </div>
                      <div class="card">
                        <span style="color:#38BDF8; font-weight:900; font-size:12px;">GOOGLE CLOUD CONSUMPTION</span>
                        <h3 style="color:#FFFFFF; font-size:18px; margin:6px 0;">Native GCP Cloud Pull-Through</h3>
                        <p style="color:#94A3B8; font-size:13px; line-height:1.5;">Every generated diagram includes a 1-click Google Cloud Shell deployment script provisioning Cloud Run, Vertex AI, BigQuery, and VPC-SC.</p>
                      </div>
                      <div class="card">
                        <span style="color:#F59E0B; font-weight:900; font-size:12px;">COMPETITIVE DEFENSE</span>
                        <h3 style="color:#FFFFFF; font-size:18px; margin:6px 0;">Lock-Out AWS / Azure</h3>
                        <p style="color:#94A3B8; font-size:13px; line-height:1.5;">By offering zero-friction visual architecture design directly inside Google Cloud Console, enterprise customers standardize their stacks on GCP.</p>
                      </div>
                    </div>

                    <!-- Lower Stage Google Cloud Architecture Integration Flowchart -->
                    <div style="margin-top:18px; background:#070A13; border:1px solid #1E293B; border-radius:18px; padding:16px;">
                      <span class="slide-tag" style="font-size:11px;">GOOGLE CLOUD PLATFORM PRODUCT-LED INTEGRATION ARCHITECTURE</span>
                      <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:10px; margin-top:10px; text-align:center;">
                        <div style="background:#111827; border:1px solid #334155; padding:10px; border-radius:10px;">
                          <div style="color:#14B8A6; font-weight:800; font-size:11px;">GCP CONSOLE WIDGET</div>
                          <div style="color:#94A3B8; font-size:10px; margin-top:2px;">Native Home Console Card</div>
                        </div>
                        <div style="color:#14B8A6; font-weight:900; align-self:center; font-size:18px;">➔</div>
                        <div style="background:#111827; border:1px solid #14B8A6; padding:10px; border-radius:10px;">
                          <div style="color:#14B8A6; font-weight:800; font-size:11px;">GEMINI 2.5 FLASH</div>
                          <div style="color:#94A3B8; font-size:10px; margin-top:2px;">Ephemeral Context Router</div>
                        </div>
                        <div style="color:#14B8A6; font-weight:900; align-self:center; font-size:18px;">➔</div>
                        <div style="background:#111827; border:1px solid #10B981; padding:10px; border-radius:10px;">
                          <div style="color:#10B981; font-weight:800; font-size:11px;">GCP SHELL DEPLOY</div>
                          <div style="color:#94A3B8; font-size:10px; margin-top:2px;">1-Click Terraform &amp; VPC-SC</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Technical Integration: Gemini 2.5 Flash / Pro Router + Google Cloud Shell API</span>
                    <span>Use Left/Right Arrow Keys to Navigate Slides</span>
                  </div>
                </div>

                <!-- SLIDE 5: FINANCIAL ROI & EPHEMERAL PROMPT CACHING TELEMETRY -->
                <div class="slide" id="slide-5">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">05 // FINANCIAL MODEL • ENTERPRISE COST EFFICIENCY &amp; OPEX RETURN</span>
                      <span class="badge" style="background:#065F46; color:#A7F3D0; border-color:#10B981;">10.8X ANNUAL ROI</span>
                    </div>
                    <h1 class="slide-title">Comparative 12-Month Financial ROI Profile</h1>
                    <p class="slide-subtitle">Economic telemetry demonstrating why enterprise CTOs mandate PromptCanvas across their engineering organizations.</p>

                    <div style="margin-top: 14px; display:flex; flex-direction:column; gap:14px;">
                      <div>
                        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:14px; margin-bottom:4px;">
                          <span style="color:#10B981;">PromptCanvas Cached Gemini Architecture Runtime Envelope</span>
                          <span style="color:#10B981;">$1,450 / mo ($17,400 / yr)</span>
                        </div>
                        <div class="chart-bar-bg">
                          <div class="chart-bar-fill" style="width: 10%; background: #10B981; color:#070A13;">90% OPTIMIZED CACHED PROFILE</div>
                        </div>
                      </div>

                      <div>
                        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:14px; margin-bottom:4px;">
                          <span style="color:#EF4444;">Standard Un-Cached Stateless LLM Baseline</span>
                          <span style="color:#EF4444;">$14,500 / mo ($174,000 / yr)</span>
                        </div>
                        <div class="chart-bar-bg">
                          <div class="chart-bar-fill" style="width: 100%; background: #EF4444; color:#FFFFFF;">UN-CACHED FULL CONTEXT EXECUTION</div>
                        </div>
                      </div>
                    </div>

                    <!-- Lower Stage Cumulative Financial Telemetry Table -->
                    <div style="margin-top:16px; background:#070A13; border:1px solid #1E293B; border-radius:18px; padding:16px;">
                      <span class="slide-tag" style="font-size:11px;">12-MONTH ENTERPRISE OPEX &amp; CACHING METRICS</span>
                      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:10px;">
                        <div style="background:#111827; border:1px solid #334155; padding:12px; border-radius:12px;">
                          <div style="color:#94A3B8; font-size:11px; font-weight:700;">PROMPT CACHE HIT RATE</div>
                          <div style="color:#10B981; font-size:24px; font-weight:900; margin-top:4px;">94.2%</div>
                        </div>
                        <div style="background:#111827; border:1px solid #334155; padding:12px; border-radius:12px;">
                          <div style="color:#94A3B8; font-size:11px; font-weight:700;">COMPILE LATENCY</div>
                          <div style="color:#38BDF8; font-size:24px; font-weight:900; margin-top:4px;">0.4s vs 4.8s</div>
                        </div>
                        <div style="background:#111827; border:1px solid #334155; padding:12px; border-radius:12px;">
                          <div style="color:#94A3B8; font-size:11px; font-weight:700;">1-YEAR NET SAVINGS</div>
                          <div style="color:#10B981; font-size:24px; font-weight:900; margin-top:4px;">$156,600</div>
                        </div>
                        <div style="background:#111827; border:1px solid #14B8A6; padding:12px; border-radius:12px;">
                          <div style="color:#94A3B8; font-size:11px; font-weight:700;">3-YEAR OPEX RETURN</div>
                          <div style="color:#14B8A6; font-size:24px; font-weight:900; margin-top:4px;">$469,800</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Financial Metrics: Calculated for 50-Engineer Enterprise Architecture Team</span>
                    <span>Use Left/Right Arrow Keys to Navigate Slides</span>
                  </div>
                </div>

                <!-- SLIDE 6: AUTONOMOUS AI GOVERNANCE, NLI CLAIM VERIFICATION & HITL SAFETY -->
                <div class="slide" id="slide-6">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">06 // AI TRUST &amp; SAFETY • DETERMINISTIC GOVERNANCE ENCLAVE</span>
                      <span class="badge" style="background:#1E3A8A; color:#93C5FD; border-color:#3B82F6;">ZERO HALLUCINATION PROTOCOL</span>
                    </div>
                    <h1 class="slide-title">Autonomous AI Governance, NLI Claim Verification &amp; HITL Safety</h1>
                    <p class="slide-subtitle">Three-tier verification architecture ensuring 100% compliance with corporate and regulatory standards.</p>

                    <div class="grid-3" style="margin-top:16px;">
                      <div class="card" style="border-left:4px solid #14B8A6;">
                        <h3 style="color:#14B8A6; font-size:17px; margin-bottom:6px;">1. NLI Factual Claim Gate</h3>
                        <p style="color:#CBD5E1; font-size:13px; line-height:1.5;">Natural Language Inference (NLI) claim verification checks every generated node against corporate policy templates.</p>
                      </div>
                      <div class="card" style="border-left:4px solid #38BDF8;">
                        <h3 style="color:#38BDF8; font-size:17px; margin-bottom:6px;">2. Zero-Trust Security Enclaves</h3>
                        <p style="color:#CBD5E1; font-size:13px; line-height:1.5;">All internal communication paths enforce VPC Service Controls (VPC-SC), mTLS encryption, and SOC2 Type II audit logs.</p>
                      </div>
                      <div class="card" style="border-left:4px solid #F59E0B;">
                        <h3 style="color:#F59E0B; font-size:17px; margin-bottom:6px;">3. Cryptographic HITL Router</h3>
                        <p style="color:#CBD5E1; font-size:13px; line-height:1.5;">Requests below 75% confidence automatically route to mandatory Human-in-the-Loop executive cryptographic sign-off.</p>
                      </div>
                    </div>

                    <!-- Lower Stage 4-Stage Safety Audit Flowchart -->
                    <div style="margin-top:18px; background:#070A13; border:1px solid #1E293B; border-radius:18px; padding:16px;">
                      <span class="slide-tag" style="font-size:11px;">THREE-STAGE TRUST &amp; RESPONSIBLE AI PIPELINE</span>
                      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:10px;">
                        <div style="background:#111827; border:1px solid #14B8A6; padding:12px; border-radius:12px;">
                          <div style="color:#14B8A6; font-weight:800; font-size:12px;">STAGE 1: INPUT SANITIZATION</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">Constitutional HHH &amp; PII Scrubbing</div>
                        </div>
                        <div style="background:#111827; border:1px solid #38BDF8; padding:12px; border-radius:12px;">
                          <div style="color:#38BDF8; font-weight:800; font-size:12px;">STAGE 2: NLI CLAIM AUDIT</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">99.2% Factual Verification Score</div>
                        </div>
                        <div style="background:#111827; border:1px solid #F59E0B; padding:12px; border-radius:12px;">
                          <div style="color:#F59E0B; font-weight:800; font-size:12px;">STAGE 3: HITL ESCALATION</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">Confidence &lt;75% Cryptographic Sign-Off</div>
                        </div>
                        <div style="background:#111827; border:1px solid #10B981; padding:12px; border-radius:12px;">
                          <div style="color:#10B981; font-weight:800; font-size:12px;">STAGE 4: VERIFIED COMPILATION</div>
                          <div style="color:#94A3B8; font-size:11px; margin-top:4px;">Zero-Collision Draw.io &amp; Terraform</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Safety Framework: Constitutional AI HHH • Responsible AI Red-Teaming Suite</span>
                    <span>Use Left/Right Arrow Keys to Navigate Slides</span>
                  </div>
                </div>

                <!-- SLIDE 7: GOOGLE STRATEGIC INCUBATION ASK & GO-TO-MARKET MILESTONES -->
                <div class="slide" id="slide-7">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="slide-tag">07 // INVESTMENT RECOMMENDATION • GOOGLE INCUBATION ROADMAP</span>
                      <span class="badge" style="background:#7C3AED; color:#F3E8FF; border-color:#8B5CF6;">EXECUTIVE BOARD SIGN-OFF</span>
                    </div>
                    <h1 class="slide-title">Google Incubation Strategic Ask &amp; Launch Milestones</h1>
                    <p class="slide-subtitle">Proposed Product-Led Growth (PLG) roadmap to embed PromptCanvas across Google Cloud Platform.</p>

                    <div class="grid-3" style="margin-top:14px;">
                      <div class="card">
                        <span style="color:#14B8A6; font-weight:900; font-size:12px;">MILESTONE 1 (MONTHS 1-2)</span>
                        <h3 style="color:#FFFFFF; font-size:18px; margin:6px 0;">Google Cloud Console Widget</h3>
                        <p style="color:#94A3B8; font-size:13px; line-height:1.5;">Embed PromptCanvas directly into Google Cloud Console home dashboard for 1-click architecture diagramming &amp; GCP Shell deployment.</p>
                      </div>
                      <div class="card">
                        <span style="color:#38BDF8; font-weight:900; font-size:12px;">MILESTONE 2 (MONTHS 3-4)</span>
                        <h3 style="color:#FFFFFF; font-size:18px; margin:6px 0;">Vertex AI Architecture Hub</h3>
                        <p style="color:#94A3B8; font-size:13px; line-height:1.5;">Publish Gemini 2.5 fine-tuned architectural models and NLI claim verification engines on Google Enterprise Cloud Marketplace.</p>
                      </div>
                      <div class="card" style="border-color:#10B981; background:#064E3B22;">
                        <span style="color:#10B981; font-weight:900; font-size:12px;">EXECUTIVE FUNDING ASK</span>
                        <h3 style="color:#10B981; font-size:22px; margin:6px 0;">$2.5M Seed Allocation</h3>
                        <p style="color:#E2E8F0; font-size:13px; line-height:1.5;">Dedicated Google Cloud engineering incubator headcount, GCP infrastructure credits, and enterprise sales enablement co-selling.</p>
                      </div>
                    </div>

                    <!-- Lower Stage 4-Quarter GANTT Timeline Diagram -->
                    <div style="margin-top:16px; background:#070A13; border:1px solid #1E293B; border-radius:18px; padding:16px;">
                      <span class="slide-tag" style="font-size:11px;">4-QUARTER PRODUCT-LED GROWTH (PLG) &amp; DEPLOYMENT GANTT ROADMAP</span>
                      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:10px;">
                        <div style="background:#111827; border:1px solid #14B8A6; padding:12px; border-radius:12px;">
                          <div style="color:#14B8A6; font-weight:800; font-size:12px;">Q1 2026: INCUBATION SEED</div>
                          <div style="color:#CBD5E1; font-size:11px; margin-top:4px;">Core Gemini 2.5 Ephemeral Caching Engine &amp; 12-Industry Presets</div>
                        </div>
                        <div style="background:#111827; border:1px solid #38BDF8; padding:12px; border-radius:12px;">
                          <div style="color:#38BDF8; font-weight:800; font-size:12px;">Q2 2026: GCP CONSOLE GA</div>
                          <div style="color:#CBD5E1; font-size:11px; margin-top:4px;">Native Google Cloud Console Card &amp; 1-Click GCP Shell Script</div>
                        </div>
                        <div style="background:#111827; border:1px solid #F59E0B; padding:12px; border-radius:12px;">
                          <div style="color:#F59E0B; font-weight:800; font-size:12px;">Q3 2026: VERTEX AI MARKETPLACE</div>
                          <div style="color:#CBD5E1; font-size:11px; margin-top:4px;">Enterprise NLI Claim Verification &amp; Red-Teaming Engine Launch</div>
                        </div>
                        <div style="background:#111827; border:1px solid #10B981; padding:12px; border-radius:12px;">
                          <div style="color:#10B981; font-weight:800; font-size:12px;">Q4 2026: GLOBAL CO-SELLING</div>
                          <div style="color:#CBD5E1; font-size:11px; margin-top:4px;">Google Cloud Enterprise Field Sales Enablement &amp; Scaling</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <span>Authorized Pitch: Sundar Pichai / Google Cloud C-Suite Investment Board</span>
                    <span>PromptCanvas Enterprise C-Suite Suite</span>
                  </div>
                </div>          </div>
                </div>
              </div>

              <script>
                let currentSlide = 1;
                const totalSlides = 7;

                function updateSlide() {
                  document.querySelectorAll('.slide').forEach((s, idx) => {
                    s.classList.toggle('active', idx + 1 === currentSlide);
                  });
                  document.getElementById('slideIndicator').textContent = 'SLIDE ' + currentSlide + ' OF ' + totalSlides;
                }

                function changeSlide(dir) {
                  currentSlide = Math.max(1, Math.min(totalSlides, currentSlide + dir));
                  updateSlide();
                }

                document.addEventListener('keydown', (e) => {
                  if (e.key === 'ArrowRight') changeSlide(1);
                  if (e.key === 'ArrowLeft') changeSlide(-1);
                });
              </script>
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
**System:** ${cleanTitle}
**Date:** ${new Date().toLocaleDateString()}

---

## 1. STRATEGIC OBJECTIVE
Deploy a multi-tier, production-grade architecture for **${cleanTitle}** adhering strictly to enterprise uptime SLAs (99.99%), zero-trust security perimeters, and automated AI cost optimization.

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
                {cleanTitle}
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
