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
import { renderMarkdownToHtml } from '@/lib/renderMarkdown';

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
  theme?: 'light' | 'dark';
  
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
  theme = 'dark',
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

  const isLight = theme === 'light';

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
    <div className={`w-full border-t shadow-2xl flex flex-col z-30 shrink-0 transition-all ${
      isLight ? 'bg-white/95 backdrop-blur-xl border-slate-200' : 'bg-[#070A13]/95 backdrop-blur-xl border-slate-800'
    }`}>
      
      {/* 📜 EXPANDABLE HISTORY & AUDIT TRAIL DRAWER */}
      {isHistoryDrawerOpen && (
        <div className={`border-b overflow-y-auto px-4 md:px-8 py-4 space-y-4 transition-all ${
          isLight ? 'bg-slate-50/98 border-slate-200' : 'bg-[#090D18]/98 border-slate-800'
        } ${isDrawerExpanded ? 'max-h-[500px]' : 'max-h-[280px]'}`}>
          <div className={`flex items-center justify-between border-b pb-2 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div className="flex items-center gap-2">
              <History className={`w-4 h-4 ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Project Chat &amp; Architecture Audit Log
              </h4>
              {displayedVersion && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-teal-50 text-teal-800 border-teal-200' : 'bg-teal-950 text-teal-300 border border-teal-800'
                }`}>
                  Active View v{displayedVersion.version_number}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
                className={`p-1 rounded transition-colors ${
                  isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isDrawerExpanded ? "Minimize Drawer" : "Expand Drawer"}
              >
                {isDrawerExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsHistoryDrawerOpen(false)}
                className={`p-1 rounded transition-colors ${
                  isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Close History Drawer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Chat Messages */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Prompt &amp; AI Evolution History
              </span>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? isLight
                        ? 'bg-teal-50 border-teal-200 text-teal-950 ml-4'
                        : 'bg-teal-950/40 border-teal-500/40 text-teal-100 ml-4'
                      : isLight
                        ? 'bg-white border-slate-200 text-slate-800 mr-4 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-200 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                      {msg.sender === 'user' ? '👤 Architect' : '✨ Gemini Enterprise'}
                    </span>
                    <span className={`text-[9px] font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>{msg.timestamp}</span>
                  </div>
                  {msg.sender === 'ai' ? (
                    <div 
                      className="prose prose-sm max-w-none text-xs leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(msg.text, theme) }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              ))}
              <div ref={historyEndRef} />
            </div>

            {/* Column 2: Audit Trail of Changes in this version */}
            <div className={`space-y-2 border-l pl-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Component Changes (Audit Trail)
              </span>
              {displayedVersion ? (
                <div className={`space-y-1.5 p-2.5 rounded-xl border text-[10px] font-mono max-h-[200px] overflow-y-auto ${
                  isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-[#05070E] border-slate-800 text-slate-300'
                }`}>
                  <div className={`font-bold mb-1 ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>
                    Version v{displayedVersion.version_number}: {displayedVersion.comment || 'Initial Baseline'}
                  </div>
                  {!hasDiffChanges ? (
                    <p className="text-slate-400 italic">No structural changes detected.</p>
                  ) : (
                    <>
                      {versionDiff.added.map((item: string, i: number) => (
                        <div key={`add-${i}`} className="text-emerald-600 dark:text-emerald-400 flex items-start gap-1">
                          <span className="font-bold text-emerald-600 dark:text-emerald-500">+</span>
                          <span>Added {item}</span>
                        </div>
                      ))}
                      {versionDiff.modified.map((item: string, i: number) => (
                        <div key={`mod-${i}`} className="text-amber-600 dark:text-amber-400 flex items-start gap-1">
                          <span className="font-bold text-amber-600 dark:text-amber-500">~</span>
                          <span>Modified {item}</span>
                        </div>
                      ))}
                      {versionDiff.removed.map((item: string, i: number) => (
                        <div key={`rem-${i}`} className="text-rose-600 dark:text-rose-400 flex items-start gap-1">
                          <span className="font-bold text-rose-600 dark:text-rose-500">-</span>
                          <span>Removed {item}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active version selected.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 💡 FLOATING SUGGESTION CHIPS ROW */}
      {suggestions.length > 0 && !isGenerating && (
        <div className="px-4 md:px-8 pt-2.5 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className={`flex items-center gap-1 text-[10px] font-extrabold uppercase shrink-0 select-none mr-1 ${
            isLight ? 'text-teal-700' : 'text-teal-400'
          }`}>
            <Sparkles className="w-3 h-3" />
            <span>Suggested:</span>
          </div>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className={`shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full transition-all cursor-pointer shadow-sm hover:scale-[1.02] border ${
                isLight
                  ? 'bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 border-slate-200 hover:border-teal-300'
                  : 'bg-slate-900/90 hover:bg-teal-950/60 hover:text-teal-200 text-slate-300 border-slate-700/80 hover:border-teal-500/60'
              }`}
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
        <div className={`hidden lg:flex items-center gap-2 shrink-0 select-none ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md border ${
            isLight
              ? 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-200 text-teal-700'
              : 'bg-gradient-to-br from-teal-500/20 to-indigo-500/20 border-teal-500/40 text-teal-400'
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className={`text-xs font-black block leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>Gemini Enterprise</span>
            <span className={`text-[9px] font-mono leading-none ${isLight ? 'text-teal-700 font-bold' : 'text-teal-400'}`}>3.7 Flash AI</span>
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
            className={`w-full rounded-2xl pl-4 pr-24 py-2.5 text-xs md:text-sm font-medium focus:outline-none resize-none transition-all shadow-inner border ring-1 ${
              isLight
                ? 'bg-slate-50 border-slate-300 hover:border-teal-600 focus:border-teal-600 text-slate-900 placeholder-slate-400 ring-slate-200 focus:ring-2 focus:ring-teal-500/30'
                : 'bg-[#0B0F1C] border-slate-700 hover:border-teal-500/70 focus:border-teal-400 text-slate-100 placeholder-slate-400 ring-slate-800 focus:ring-2 focus:ring-teal-400/40'
            }`}
          />

          {/* Action Tools Inside Input Box */}
          <div className="absolute right-2 flex items-center gap-1.5">
            
            {/* Toggle History & Audit Button */}
            <button
              type="button"
              onClick={() => setIsHistoryDrawerOpen(!isHistoryDrawerOpen)}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                isHistoryDrawerOpen
                  ? isLight
                    ? 'bg-teal-100 text-teal-900 border-teal-300'
                    : 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : isLight
                    ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200 border-transparent'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border-transparent'
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
          className={`lg:hidden p-2 rounded-xl border ${
            isLight
              ? 'bg-slate-100 border-slate-300 text-slate-700 hover:text-teal-700'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-teal-400'
          }`}
          title="History"
        >
          <History className="w-4 h-4" />
        </button>

      </div>

      {/* 🛠️ BOTTOM COMPACT ACTION TOOLBAR (Persistent Governance, FinOps & Delivery Dock) */}
      <div className={`px-4 md:px-8 py-1.5 border-t flex items-center justify-between text-[11px] overflow-x-auto no-scrollbar ${
        isLight ? 'bg-slate-100/90 border-slate-200 text-slate-700' : 'bg-[#050811] border-slate-800/80 text-slate-400'
      }`}>
        
        <div className="flex items-center gap-2">
          {/* Security Audit */}
          <button
            type="button"
            onClick={onAuditDiagram}
            disabled={isAuditing}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50 border ${
              isLight
                ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-800'
                : 'bg-teal-950/40 hover:bg-teal-900/50 border-teal-500/40 text-teal-300'
            }`}
            title="Run CIS GCP & Zero-Trust Security Audit"
          >
            {isAuditing ? <Loader2 className="w-3 h-3 animate-spin text-teal-500" /> : <Shield className="w-3 h-3 text-teal-500" />}
            <span>Security Audit</span>
          </button>

          {/* Cost Estimator */}
          <button
            type="button"
            onClick={onOpenCostModal}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shadow-sm border ${
              isLight
                ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-500/40 text-emerald-300'
            }`}
            title="View Live GCP Cost Estimation"
          >
            <DollarSign className="w-3 h-3 text-emerald-500" />
            <span>Est. ${costEstimateMonthly.toLocaleString()}/mo</span>
          </button>

          {/* Compose Doc */}
          <button
            type="button"
            onClick={onOpenComposeModal}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shadow-sm border ${
              isLight
                ? 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-800'
                : 'bg-sky-950/40 hover:bg-sky-900/50 border-sky-500/40 text-sky-300'
            }`}
            title="Generate PRD, SDD & Architecture Document"
          >
            <FileText className="w-3 h-3 text-sky-500" />
            <span>Compose Doc</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Blueprint Matrix */}
          <button
            type="button"
            onClick={onOpenPlaybookModal}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shadow-sm border ${
              isLight
                ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-800'
                : 'bg-purple-950/40 hover:bg-purple-900/50 border-purple-500/40 text-purple-300'
            }`}
            title="Architecture Knowledge Matrix"
          >
            <BookOpen className="w-3 h-3 text-purple-500" />
            <span className="hidden sm:inline">Blueprint Matrix</span>
          </button>

          {/* Set Master Template */}
          <button
            type="button"
            onClick={onOpenSetMasterModal}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-extrabold transition-all cursor-pointer shadow-sm border ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-amber-950/40 hover:bg-amber-900/50 border-amber-500/40 text-amber-300'
            }`}
            title="Promote diagram as Master Blueprint"
          >
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="hidden sm:inline">Set Master</span>
          </button>

          {/* Export Studio */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shadow-sm border ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-teal-500 text-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-teal-500/50 text-teal-300'
            }`}
            title="Export PNG, PDF, SVG, Draw.io XML, Terraform"
          >
            <Download className={`w-3.5 h-3.5 ${isLight ? 'text-slate-700' : 'text-teal-400'}`} />
            <span>Export Studio</span>
          </button>
        </div>

      </div>

    </div>
  );
};
