'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  VersionSnapshot,
  ChatMessage,
  DiagramSlotVersionData,
  computeTextDiff,
  formatRelativeTime,
  DiffSummary,
} from '@/lib/versioning/docVersionEngine';

interface DocGenFloatingCopilotProps {
  projectId: string;
  projectTitle: string;
  selectedDomain: string;
  archetypeId: string;
  isLight: boolean;
  docMarkdown: string;
  docVersion: string;
  diagramSlots: Record<number, DiagramSlotVersionData>;
  versionHistory: VersionSnapshot[];
  chatHistory: ChatMessage[];
  onApplyDocUpdate: (newMarkdown: string, summary: string, author?: 'AI Copilot' | 'User') => void;
  onApplyDiagramUpdate: (slotIndex: number, newPrompt: string, summary: string) => void;
  onRestoreSnapshot: (snapshot: VersionSnapshot) => void;
  onAddChatMessage: (msg: ChatMessage) => void;
}

export default function DocGenFloatingCopilot({
  projectId,
  projectTitle,
  selectedDomain,
  archetypeId,
  isLight,
  docMarkdown,
  docVersion,
  diagramSlots,
  versionHistory,
  chatHistory,
  onApplyDocUpdate,
  onApplyDiagramUpdate,
  onRestoreSnapshot,
  onAddChatMessage,
}: DocGenFloatingCopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'versions'>('chat');
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [diffTargetSnapshot, setDiffTargetSnapshot] = useState<VersionSnapshot | null>(null);
  const [diffSummary, setDiffSummary] = useState<DiffSummary | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat' && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, activeTab, isOpen]);

  // Compute diff when inspecting a historical snapshot
  useEffect(() => {
    if (diffTargetSnapshot) {
      const diff = computeTextDiff(diffTargetSnapshot.docMarkdown, docMarkdown);
      setDiffSummary(diff);
    } else {
      setDiffSummary(null);
    }
  }, [diffTargetSnapshot, docMarkdown]);

  const getInitialContextualChips = (title: string, domain: string) => {
    const d = domain.toLowerCase();
    if (d === 'manufacturing' || /\b(drone|aviation|ev|bess|robotics|fleet|aeronode)\b/i.test(title)) {
      return [
        { label: '🚁 Add FAA Part 135 & UTM Airspace Section', prompt: `Add a dedicated chapter covering FAA Part 135 compliance, BVLOS flight rules, and automated UTM airspace deconfliction to ${title}.` },
        { label: '📡 Add 5G Telemetry & ADS-B Mesh to Diagram 1', prompt: `Update Diagram 1 to incorporate sub-20ms 5G telemetry edge nodes, ADS-B transponder ingresses, and micro-hub relay routers.` },
        { label: '🔋 Add Battery Swapping State Machine', prompt: `Add a lifecycle state machine section detailing autonomous micro-hub robotic battery swapping and SoC telemetry thresholds.` },
        { label: '⚖️ Add Loss-of-Link Geofence Contingency ADR', prompt: `Add an Architecture Decision Record (ADR) defining automated fail-safe emergency landing protocols on cellular/satellite telemetry loss.` },
      ];
    }
    if (d === 'fintech' || /\b(pay|settle|ledger|trade|bank|fraud|iso 20022|apexpay)\b/i.test(title)) {
      return [
        { label: '💳 Add Sub-5ms Pre-Trade Risk & ISO 20022 Schema', prompt: `Add a section defining sub-5ms pre-trade risk evaluation, SEC 15c3-5 checks, and ISO 20022 pacs.008 schema validation for ${title}.` },
        { label: '🗄️ Add Cloud Spanner Double-Entry Ledger to Diagram 2', prompt: `Update Diagram 2 to detail the distributed Spanner double-entry accounting ledger with TrueTime Paxos replication.` },
        { label: '🛡️ Add Real-Time AML / OFAC Sanctions Screener', prompt: `Add an automated real-time AML / OFAC sanctions screening pipeline with Kafka streaming and Bloom filter lookups.` },
        { label: '🔄 Add Multi-Region Active-Active Failover Sequence', prompt: `Add an active-active multi-region failover sequence table specifying RPO=0 and automated Anycast DNS rerouting.` },
      ];
    }
    if (d === 'retail' || /\b(cart|sku|warehouse|wms|fulfillment|catalog|omnivue)\b/i.test(title)) {
      return [
        { label: '📦 Add Omnichannel Dynamic Pricing & SKU Allocator', prompt: `Add an automated omnichannel inventory reservation and real-time SKU allocation engine specification for ${title}.` },
        { label: '🚚 Add WMS Cross-Dock & 3PL Logistics to Diagram 2', prompt: `Update Diagram 2 to incorporate automated warehouse cross-docking, automated guided vehicles (AGVs), and 3PL carrier APIs.` },
        { label: '⚡ Add Sub-50ms Cart Checkout Latency Budget', prompt: `Add a strict sub-50ms checkout latency budget breakdown across edge CDN, payment tokenization, and Spanner order store.` },
        { label: '🛡️ Add Black Friday Flash Burst Auto-Scaling Policy', prompt: `Add an auto-scaling and pre-warmed Redis cache warming runbook for 10x Black Friday traffic bursts.` },
      ];
    }
    if (d === 'saas' || /\b(tenant|workspace|billing|crm|oauth|workcloud)\b/i.test(title)) {
      return [
        { label: '🏢 Add Multi-Tenant Workspace Isolation Matrix', prompt: `Add a comprehensive multi-tenant database partitioning matrix comparing pool vs silo models with Row-Level Security (RLS) for ${title}.` },
        { label: '🔒 Add Okta OIDC & SAML 2.0 Identity to Diagram 1', prompt: `Update Diagram 1 to detail enterprise IdP federation via OIDC/SAML 2.0 with SCIM automated user provisioning.` },
        { label: '📊 Add Distributed Token Bucket Rate Limiter', prompt: `Add a distributed Redis token-bucket rate limiting specification with per-tenant quota tiers and circuit breakers.` },
        { label: '📜 Add SOC 2 Type II Immutable Audit Chaining', prompt: `Add a SOC 2 Type II compliance audit section detailing SHA-256 cryptographic hash chaining for all administrative actions.` },
      ];
    }
    return [
      { label: '🧬 Add 21 CFR Part 11 Electronic Signature Matrix', prompt: `Add an FDA 21 CFR Part 11 compliance chapter detailing dual-custody electronic signatures and SHA-256 audit stamping for ${title}.` },
      { label: '🛡️ Add Pharmacovigilance Real-Time Adverse Event Gate', prompt: `Add an automated pharmacovigilance (PV) safety event detection gate with MedDRA ontology dictionary lookups.` },
      { label: '🔬 Add ScaNN Vector Knowledge Retrieval to Diagram 2', prompt: `Update Diagram 2 to feature hybrid sparse-dense ScaNN vector indexing over clinical trial protocols and IND submissions.` },
      { label: '⚖️ Add Human-in-the-Loop Medical Reviewer Workbench', prompt: `Add an architectural specification for human-in-the-loop (HITL) Medical Information Specialist review queues and overrides.` },
    ];
  };

  const [activeNextSteps, setActiveNextSteps] = useState<Array<{ label: string; prompt: string }>>(() =>
    getInitialContextualChips(projectTitle, selectedDomain)
  );

  // Update initial chips if project title or domain changes
  useEffect(() => {
    setActiveNextSteps(getInitialContextualChips(projectTitle, selectedDomain));
  }, [projectTitle, selectedDomain]);

  const handleSendMessage = async (promptToSend?: string) => {
    const text = (promptToSend || inputText).trim();
    if (!text || isGenerating) return;

    setInputText('');

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };
    onAddChatMessage(userMsg);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/docgen/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: text,
          chatHistory,
          currentDocMarkdown: docMarkdown,
          currentDocVersion: docVersion,
          currentDiagramSlots: diagramSlots,
          archetypeId,
          selectedDomain,
          projectTitle,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to process copilot request');
      }

      let appliedAction: ChatMessage['actionApplied'] = undefined;

      if (data.action === 'doc_update' && data.newMarkdown) {
        onApplyDocUpdate(data.newMarkdown, data.changeSummary || 'Copilot Document Refinement', 'AI Copilot');
        appliedAction = {
          type: 'doc_update',
          summary: data.changeSummary || 'Document text updated',
          versionTag: docVersion,
        };
      } else if (data.action === 'diagram_update') {
        const slotIdx = data.targetSlotIndex || 1;
        onApplyDiagramUpdate(slotIdx, data.newPrompt || text, data.changeSummary || `Updated Diagram Slot #${slotIdx}`);
        appliedAction = {
          type: 'diagram_update',
          summary: data.changeSummary || `Diagram Slot #${slotIdx} modified`,
          versionTag: diagramSlots[slotIdx]?.version || 'v1.1',
          targetSlotIndex: slotIdx,
        };
      }

      if (Array.isArray(data.suggestedNextSteps) && data.suggestedNextSteps.length > 0) {
        setActiveNextSteps(data.suggestedNextSteps);
      }

      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        sender: 'assistant',
        text: data.replyMessage || 'Done! I have applied your requested updates.',
        timestamp: new Date().toISOString(),
        actionApplied: appliedAction,
        suggestedNextSteps: data.suggestedNextSteps || activeNextSteps,
      };
      onAddChatMessage(assistantMsg);
    } catch (err: any) {
      console.error('[DocGen Copilot UI] Error:', err);
      const errMsg: ChatMessage = {
        id: `msg_${Date.now()}_err`,
        sender: 'assistant',
        text: `⚠️ Error: ${err.message || 'Something went wrong. Please try again.'}`,
        timestamp: new Date().toISOString(),
      };
      onAddChatMessage(errMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* FLOATING ACTION PILL TRIGGER (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 no-print">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border font-medium text-xs md:text-sm backdrop-blur-xl ${
            isOpen
              ? 'bg-sky-600 text-white border-sky-400 shadow-sky-500/25 ring-4 ring-sky-500/20'
              : isLight
              ? 'bg-white/95 text-slate-800 border-slate-200 shadow-slate-400/20 hover:bg-slate-50'
              : 'bg-[#0B1120]/95 text-slate-100 border-slate-700/80 shadow-black/50 hover:bg-[#111A2E]'
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="flex items-center gap-1.5">
            <span>✨ AI Copilot</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
              {docVersion}
            </span>
          </span>
          <span className="text-[10px] opacity-70 border-l pl-2 border-slate-500/30">
            {versionHistory.length}/10 Snapshots
          </span>
        </button>
      </div>

      {/* EXPANDABLE COPILOT & VERSION HISTORY MODAL */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-6 z-50 w-[92vw] sm:w-[460px] md:w-[500px] h-[600px] max-h-[82vh] rounded-2xl shadow-2xl flex flex-col border backdrop-blur-2xl transition-all duration-200 overflow-hidden no-print ${
            isLight
              ? 'bg-white/98 border-slate-200 shadow-slate-900/15 text-slate-900'
              : 'bg-[#070D1A]/98 border-slate-800 shadow-black/80 text-slate-100'
          }`}
        >
          {/* HEADER */}
          <div
            className={`px-4 py-3 border-b flex items-center justify-between gap-2 shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0B132B]/80 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-sky-500/20">
                ✨
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs md:text-sm font-bold tracking-tight">PromptCanvas Copilot</h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    {docVersion}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate max-w-[240px]">
                  {projectTitle}
                </p>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/60 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  activeTab === 'chat'
                    ? isLight
                      ? 'bg-white text-sky-600 shadow-sm'
                      : 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('versions')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                  activeTab === 'versions'
                    ? isLight
                      ? 'bg-white text-sky-600 shadow-sm'
                      : 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                🕒 Versions
                <span className="px-1 py-0.2 rounded-full text-[9px] bg-slate-300 dark:bg-slate-700">
                  {versionHistory.length}
                </span>
              </button>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs"
              title="Close Copilot"
            >
              ✕
            </button>
          </div>

          {/* TAB CONTENT: 1. CHAT ASSISTANT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* CHAT BUBBLE FEED */}
              <div
                ref={chatScrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin"
              >
                {/* WELCOME BANNER */}
                <div
                  className={`p-3 rounded-xl border text-[11px] leading-relaxed ${
                    isLight
                      ? 'bg-sky-50/70 border-sky-100 text-sky-900'
                      : 'bg-sky-950/20 border-sky-900/40 text-sky-200'
                  }`}
                >
                  <p className="font-semibold text-xs mb-1 flex items-center gap-1">
                    <span>💡 What can I help you customize?</span>
                  </p>
                  <p>
                    I can edit your document markdown, add technical sections, or restyle and customize specific architecture diagrams while preserving your 10-version history timeline.
                  </p>
                </div>

                {/* DYNAMIC CONTEXTUAL NEXT-STEP CHIPS */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <span>✨ Contextual Next Steps:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNextSteps.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip.prompt)}
                        disabled={isGenerating}
                        className={`text-[10px] px-2.5 py-1.5 rounded-xl border transition-all text-left font-medium cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                          isLight
                            ? 'bg-white hover:bg-sky-50 border-slate-200 hover:border-sky-300 text-slate-800'
                            : 'bg-[#0F172A] hover:bg-sky-950/40 border-slate-800 hover:border-sky-500/50 text-slate-200'
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MESSAGES */}
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky-600 text-white rounded-br-none shadow-md shadow-sky-600/20'
                          : isLight
                          ? 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200'
                          : 'bg-[#0F172A] text-slate-100 rounded-bl-none border border-slate-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {/* ACTION BADGE */}
                      {msg.actionApplied && (
                        <div className="mt-2 pt-1.5 border-t border-sky-400/20 flex items-center justify-between gap-2 text-[10px]">
                          <span className="text-sky-300 font-mono font-bold flex items-center gap-1">
                            <span>✅</span>
                            <span>{msg.actionApplied.summary}</span>
                          </span>
                          <span className="px-1 rounded bg-black/20 text-[9px] font-mono">
                            {msg.actionApplied.versionTag}
                          </span>
                        </div>
                      )}

                      {/* PER-MESSAGE CONTEXTUAL NEXT STEP CHIPS */}
                      {msg.suggestedNextSteps && msg.suggestedNextSteps.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-700/40 space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Suggested Follow-Ups:</span>
                          <div className="flex flex-wrap gap-1">
                            {msg.suggestedNextSteps.map((sChip, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleSendMessage(sChip.prompt)}
                                disabled={isGenerating}
                                className="text-[9px] px-2 py-0.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-medium cursor-pointer transition-all hover:scale-[1.02] text-left"
                              >
                                {sChip.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">
                      {formatRelativeTime(msg.timestamp)}
                    </span>
                  </div>
                ))}

                {/* GENERATING INDICATOR */}
                {isGenerating && (
                  <div className="flex items-center gap-2 text-xs text-sky-400 p-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                    <span className="italic">AI Copilot is synthesizing architectural updates...</span>
                  </div>
                )}
              </div>

              {/* CHAT INPUT FORM */}
              <div
                className={`p-3 border-t shrink-0 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0B132B]/60 border-slate-800'
                }`}
              >
                <div className="relative flex items-center">
                  <textarea
                    rows={2}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isGenerating}
                    placeholder="Ask Copilot to edit text, add tables, or update diagrams... (Enter to send)"
                    className={`w-full text-xs rounded-xl px-3 py-2 pr-12 resize-none outline-none transition-all border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10'
                        : 'bg-[#070D1A] border-slate-700 text-slate-100 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                    }`}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isGenerating}
                    className="absolute right-2.5 bottom-2.5 p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-white text-xs font-bold transition-all shadow-md"
                  >
                    ➔
                  </button>
                </div>
                <div className="flex justify-between items-center mt-1 px-1 text-[10px] text-slate-400">
                  <span>Shift + Enter for new line</span>
                  <span>10-Version Ring Buffer Active</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: 2. 10-VERSION HISTORY TIMELINE */}
          {activeTab === 'versions' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Last 10 Version Snapshots (Ring Buffer)
                </span>
                <span className="text-[10px] text-sky-400 font-mono">
                  Active: {docVersion}
                </span>
              </div>

              {versionHistory.map((snap, idx) => {
                const isCurrent = idx === 0;
                return (
                  <div
                    key={snap.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? isLight
                          ? 'bg-sky-50/80 border-sky-300 shadow-xs'
                          : 'bg-sky-950/30 border-sky-600/50 shadow-xs'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-[#0B132B]/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* TOP LINE */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-sky-500/20 text-sky-400 border border-sky-500/30">
                          {snap.versionTag}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            CURRENT LIVE
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-slate-400">
                          by {snap.author}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {formatRelativeTime(snap.timestamp)}
                      </span>
                    </div>

                    {/* CHANGE DESCRIPTION */}
                    <p className="text-xs text-slate-200 dark:text-slate-300 mb-2">
                      {snap.changeSummary}
                    </p>

                    {/* GRANULAR STATE PILLS */}
                    <div className="flex flex-wrap gap-1 mb-2.5 text-[9px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        📄 Doc: {snap.docVersion}
                      </span>
                      {Object.keys(snap.diagramSlots || {}).map((k) => (
                        <span
                          key={k}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          📐 Diag {k}: {snap.diagramSlots[parseInt(k, 10)]?.version || 'v1.0'}
                        </span>
                      ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-700/40">
                      {!isCurrent && (
                        <button
                          onClick={() => onRestoreSnapshot(snap)}
                          className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-xs"
                        >
                          ⏪ Restore {snap.versionTag}
                        </button>
                      )}
                      <button
                        onClick={() => setDiffTargetSnapshot(snap)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-medium border transition-all ${
                          isLight
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                            : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                        }`}
                      >
                        🔍 Compare Diff
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* DIFF VIEWER MODAL */}
      {diffTargetSnapshot && diffSummary && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-4xl max-h-[85vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B132B] border-slate-700 text-slate-100'
            }`}
          >
            {/* DIFF HEADER */}
            <div className="px-6 py-4 border-b border-slate-700/60 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm md:text-base font-bold flex items-center gap-2">
                  <span>Visual Line-by-Line Diff</span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    {diffTargetSnapshot.versionTag} ➔ {docVersion} (Current)
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Showing changes between historical snapshot and active live document.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">+{diffSummary.addedCount} lines</span>
                  <span className="text-rose-400 font-bold">-{diffSummary.removedCount} lines</span>
                </div>
                <button
                  onClick={() => setDiffTargetSnapshot(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* DIFF CONTENT LINES */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed bg-[#050914] text-slate-200 select-text">
              {diffSummary.lines.map((line, lIdx) => {
                if (line.type === 'added') {
                  return (
                    <div key={lIdx} className="bg-emerald-950/40 text-emerald-300 px-2 py-0.5 flex gap-2">
                      <span className="text-emerald-500 select-none w-6 text-right">+</span>
                      <span className="flex-1 whitespace-pre-wrap">{line.text}</span>
                    </div>
                  );
                }
                if (line.type === 'removed') {
                  return (
                    <div key={lIdx} className="bg-rose-950/40 text-rose-300 px-2 py-0.5 flex gap-2">
                      <span className="text-rose-500 select-none w-6 text-right">-</span>
                      <span className="flex-1 whitespace-pre-wrap">{line.text}</span>
                    </div>
                  );
                }
                return (
                  <div key={lIdx} className="text-slate-400 px-2 py-0.5 flex gap-2 hover:bg-slate-900/30">
                    <span className="text-slate-600 select-none w-6 text-right"> </span>
                    <span className="flex-1 whitespace-pre-wrap">{line.text}</span>
                  </div>
                );
              })}
            </div>

            {/* DIFF FOOTER */}
            <div className="px-6 py-3 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  onRestoreSnapshot(diffTargetSnapshot);
                  setDiffTargetSnapshot(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-all"
              >
                ⏪ Restore This Snapshot ({diffTargetSnapshot.versionTag})
              </button>
              <button
                onClick={() => setDiffTargetSnapshot(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 hover:bg-slate-800 text-slate-300"
              >
                Close Diff
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
