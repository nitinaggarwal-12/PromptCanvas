'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  ChevronUp,
  ChevronDown,
  History,
  Shield,
  DollarSign,
  Download,
  BookOpen,
  Star,
  FileText,
  Clock,
  Check,
  ChevronRight,
  Maximize2,
  Minimize2,
  Cpu
} from 'lucide-react';
import { Diagram, DiagramVersion } from '@/lib/db';
import { computeVersionDiff } from '@/lib/versionDiff';
import { parseXmlNodesAndEdges } from '@/lib/graph/xmlNodesParser';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  versionNumber?: number;
}

interface GeminiEnterpriseBottomChatProps {
  activeDiagram: Diagram | null;
  activeVersion: DiagramVersion | null;
  displayedVersion: DiagramVersion | null;
  selectedArchType: string;
  chatMessages: ChatMessage[];
  suggestions: string[];
  promptInput: string;
  isGenerating: boolean;
  isAuditing: boolean;
  costEstimateMonthly: number;
  dynamicPlaceholder?: string;
  
  // Handlers
  onPromptChange: (val: string) => void;
  onSendPrompt: (e: React.FormEvent) => void;
  onSelectSuggestion: (suggestion: string) => void;
  onOpenExportModal: () => void;
  onOpenPlaybookModal: () => void;
  onOpenSetMasterModal: () => void;
  onOpenCostModal: () => void;
  onOpenComposeModal: () => void;
  onAuditDiagram: () => void;
}

export const GeminiEnterpriseBottomChat: React.FC<GeminiEnterpriseBottomChatProps> = ({
  activeDiagram,
  activeVersion,
  displayedVersion,
  selectedArchType,
  chatMessages,
  suggestions,
  promptInput,
  isGenerating,
  isAuditing,
  costEstimateMonthly,
  dynamicPlaceholder = "Ask Gemini to refine architecture, add cloud tiers, enforce security policies...",
  onPromptChange,
  onSendPrompt,
  onSelectSuggestion,
  onOpenExportModal,
  onOpenPlaybookModal,
  onOpenSetMasterModal,
  onOpenCostModal,
  onOpenComposeModal,
  onAuditDiagram
}) => {
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll history when opened or updated
  useEffect(() => {
    if (isHistoryDrawerOpen) {
      historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isHistoryDrawerOpen, chatMessages, isGenerating]);

  // Compute version audit diff
  const versionDiff = React.useMemo(() => {
    if (!displayedVersion) return { added: [], removed: [], modified: [] };
    const sorted = activeDiagram?.versions
      ?.filter(v => (v.architecture_type || 'conceptual_diagram') === selectedArchType)
      .slice()
      .sort((a, b) => a.version_number - b.version_number) || [];
    const curIdx = sorted.findIndex(v => v.id === displayedVersion.id);
    const parent = curIdx > 0 ? sorted[curIdx - 1] : null;

    if (parent) {
      return computeVersionDiff(displayedVersion.xml_content, parent.xml_content);
    } else {
      const items = parseXmlNodesAndEdges(displayedVersion.xml_content);
      return {
        added: items.map(i => (i.isEdge ? `Connection: ${i.label || 'Link'}` : i.label)),
        removed: [],
        modified: []
      };
    }
  }, [activeDiagram, displayedVersion, selectedArchType]);

  const hasDiffChanges = versionDiff.added.length > 0 || versionDiff.removed.length > 0 || versionDiff.modified.length > 0;

  return (
    <div className="w-full bg-[#070A13]/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl flex flex-col z-30 shrink-0 transition-all">
      
      {/* 📜 EXPANDABLE HISTORY & AUDIT TRAIL DRAWER */}
      {isHistoryDrawerOpen && (
        <div className={`border-b border-slate-800 bg-[#090D18]/98 overflow-y-auto px-4 md:px-8 py-4 space-y-4 transition-all ${
          isDrawerExpanded ? 'max-h-[500px]' : 'max-h-[280px]'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-teal-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
                Project Chat &amp; Architecture Audit Log
              </h4>
              {displayedVersion && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                  Active View v{displayedVersion.version_number}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isDrawerExpanded ? "Minimize Drawer" : "Expand Drawer"}
              >
                {isDrawerExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsHistoryDrawerOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close History Drawer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Chat Messages */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Prompt &amp; AI Evolution History
              </span>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-950/40 border-teal-500/40 text-teal-100 ml-4'
                      : 'bg-slate-900/60 border-slate-800 text-slate-200 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase text-teal-400">
                      {msg.sender === 'user' ? '👤 Architect' : '✨ Gemini Enterprise'}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{msg.timestamp}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
              <div ref={historyEndRef} />
            </div>

            {/* Column 2: Audit Trail of Changes in this version */}
            <div className="space-y-2 border-l border-slate-800 pl-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Component Changes (Audit Trail)
              </span>
              {displayedVersion ? (
                <div className="space-y-1.5 bg-[#05070E] p-2.5 rounded-xl border border-slate-800 text-[10px] font-mono max-h-[200px] overflow-y-auto">
                  <div className="text-slate-400 font-bold mb-1">
                    Version v{displayedVersion.version_number}: {displayedVersion.comment || 'Initial Baseline'}
                  </div>
                  {!hasDiffChanges ? (
                    <p className="text-slate-500 italic">No structural changes detected.</p>
                  ) : (
                    <>
                      {versionDiff.added.map((item: string, i: number) => (
                        <div key={`add-${i}`} className="text-emerald-400 flex items-start gap-1">
                          <span className="font-bold text-emerald-500">+</span>
                          <span>Added {item}</span>
                        </div>
                      ))}
                      {versionDiff.modified.map((item: string, i: number) => (
                        <div key={`mod-${i}`} className="text-amber-400 flex items-start gap-1">
                          <span className="font-bold text-amber-500">~</span>
                          <span>Modified {item}</span>
                        </div>
                      ))}
                      {versionDiff.removed.map((item: string, i: number) => (
                        <div key={`rem-${i}`} className="text-rose-400 flex items-start gap-1">
                          <span className="font-bold text-rose-500">-</span>
                          <span>Removed {item}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No active version selected.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 💡 FLOATING SUGGESTION CHIPS ROW */}
      {suggestions.length > 0 && !isGenerating && (
        <div className="px-4 md:px-8 pt-2.5 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-teal-400 shrink-0 select-none mr-1">
            <Sparkles className="w-3 h-3" />
            <span>Suggested:</span>
          </div>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className="shrink-0 text-[11px] font-semibold bg-slate-900/90 hover:bg-teal-950/60 hover:text-teal-200 text-slate-300 border border-slate-700/80 hover:border-teal-500/60 px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title={suggestion}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* ⚡ GEMINI ENTERPRISE PROMPT INPUT CONTAINER */}
      <div className="px-4 md:px-8 py-2.5 flex items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        
        {/* Gemini Sparkle Branding */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 select-none text-slate-400">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500/20 to-indigo-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black text-white block leading-none">Gemini Enterprise</span>
            <span className="text-[9px] font-mono text-teal-400 leading-none">3.7 Flash AI</span>
          </div>
        </div>

        {/* The Main Wide Gemini Chatbox */}
        <form onSubmit={onSendPrompt} className="flex-1 relative flex items-center">
          <textarea
            ref={textareaRef}
            rows={1}
            value={promptInput}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder={dynamicPlaceholder}
            disabled={!activeDiagram || isGenerating}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendPrompt(e);
              }
            }}
            className="w-full bg-[#0B0F1C] border border-slate-700 hover:border-teal-500/70 focus:border-teal-400 rounded-2xl pl-4 pr-24 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-400 focus:outline-none resize-none transition-all shadow-inner ring-1 ring-slate-800 focus:ring-2 focus:ring-teal-400/40 font-medium"
          />

          {/* Action Tools Inside Input Box */}
          <div className="absolute right-2 flex items-center gap-1.5">
            
            {/* Toggle History & Audit Button */}
            <button
              type="button"
              onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isHistoryDrawerOpen
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="View Version Timeline & Audit History"
            >
              <History className="w-3.5 h-3.5" />
              {isHistoryDrawerOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!activeDiagram || isGenerating || !promptInput.trim()}
              className="p-2 rounded-xl bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 font-bold transition-all cursor-pointer shadow-md disabled:cursor-not-allowed hover:scale-105"
              title="Send to Gemini Enterprise (Enter)"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>

        {/* History Toggle Button for Mobile / Small Screens */}
        <button
          type="button"
          onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-teal-400"
          title="History"
        >
          <History className="w-4 h-4" />
        </button>

      </div>

      {/* 🛠️ BOTTOM COMPACT ACTION TOOLBAR (Persistent Governance, FinOps & Delivery Dock) */}
      <div className="px-4 md:px-8 py-1.5 bg-[#050811] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto no-scrollbar">
        
        <div className="flex items-center gap-2">
          {/* Security Audit */}
          <button
            type="button"
            onClick={onAuditDiagram}
            disabled={isAuditing}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-950/40 hover:bg-teal-900/50 border border-teal-500/40 text-teal-300 font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
            title="Run CIS GCP & Zero-Trust Security Audit"
          >
            {isAuditing ? <Loader2 className="w-3 h-3 animate-spin text-teal-400" /> : <Shield className="w-3 h-3 text-teal-400" />}
            <span>Security Audit</span>
          </button>

          {/* Cost Estimator */}
          <button
            type="button"
            onClick={onOpenCostModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 font-bold transition-all cursor-pointer shadow-sm"
            title="View Live GCP Cost Estimation"
          >
            <DollarSign className="w-3 h-3 text-emerald-400" />
            <span>Est. ${costEstimateMonthly.toLocaleString()}/mo</span>
          </button>

          {/* Compose Doc */}
          <button
            type="button"
            onClick={onOpenComposeModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 font-bold transition-all cursor-pointer shadow-sm"
            title="Generate PRD, SDD & Architecture Document"
          >
            <FileText className="w-3 h-3 text-sky-400" />
            <span>Compose Doc</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Blueprint Matrix */}
          <button
            type="button"
            onClick={onOpenPlaybookModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 font-bold transition-all cursor-pointer shadow-sm"
            title="Architecture Knowledge Matrix"
          >
            <BookOpen className="w-3 h-3 text-purple-400" />
            <span className="hidden sm:inline">Blueprint Matrix</span>
          </button>

          {/* Set Master Template */}
          <button
            type="button"
            onClick={onOpenSetMasterModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-300 font-extrabold transition-all cursor-pointer shadow-sm"
            title="Promote diagram as Master Blueprint"
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="hidden sm:inline">Set Master</span>
          </button>

          {/* Export Studio */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-teal-500/50 text-teal-300 font-bold transition-all cursor-pointer shadow-sm"
            title="Export PNG, PDF, SVG, Draw.io XML, Terraform"
          >
            <Download className="w-3 h-3 text-teal-400" />
            <span>Export Studio</span>
          </button>
        </div>

      </div>

    </div>
  );
};
