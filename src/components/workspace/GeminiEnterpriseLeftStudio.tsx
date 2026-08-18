'use client';

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
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
  ChevronDown,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { Diagram, DiagramVersion } from '@/lib/db';
import { renderMarkdownToHtml } from '@/lib/renderMarkdown';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  versionNumber?: number;
}

interface GeminiEnterpriseLeftStudioProps {
  activeDiagram: Diagram | null;
  activeVersion: DiagramVersion | null;
  displayedVersion: DiagramVersion | null;
  selectedArchType: string;
  suggestions: string[];
  chatMessages?: ChatMessage[];
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
  onOpenPromptDossier: () => void;
}

export const GeminiEnterpriseLeftStudio: React.FC<GeminiEnterpriseLeftStudioProps> = ({
  activeDiagram,
  activeVersion,
  displayedVersion,
  selectedArchType,
  suggestions,
  chatMessages = [],
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
  onAuditDiagram,
  onOpenPromptDossier,
}) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isToolsExpanded, setIsToolsExpanded] = useState(true);
  const [isQaResponseExpanded, setIsQaResponseExpanded] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

  const versions = activeDiagram?.versions || [];
  const currentVer = activeVersion || displayedVersion || (versions.length > 0 ? versions[versions.length - 1] : null);
  const realPrompt = currentVer?.prompt || versions[0]?.prompt || "Multi-tier enterprise architecture on Google Cloud";

  // Find latest AI response if any
  const aiMessages = chatMessages.filter(m => m.sender === 'ai');
  const latestAiMessage = aiMessages.length > 0 ? aiMessages[aiMessages.length - 1] : null;
  const userQuestions = chatMessages.filter(m => m.sender === 'user');
  const latestUserQuestion = userQuestions.length > 0 ? userQuestions[userQuestions.length - 1] : null;

  React.useEffect(() => {
    if (latestAiMessage && qaRef.current) {
      qaRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [latestAiMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendPrompt(e);
    }
  };

  return (
    <div className={`w-full flex flex-col space-y-3.5 select-none transition-colors duration-200 ${
      isLight ? 'text-slate-800' : 'text-slate-200'
    }`}>
      
      {/* 1. ASSOCIATED REAL USE CASE PROMPT CARD */}
      <div className={`p-3 rounded-2xl border transition-all ${
        isLight
          ? 'bg-white border-teal-200 shadow-sm'
          : 'bg-[#090D18] border-teal-500/30 shadow-md'
      }`}>
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Active Use Case Prompt
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenPromptDossier}
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
              isLight
                ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-800'
                : 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/40 text-teal-300'
            }`}
            title="Inspect Full Prompt, Requirements Validation Matrix, and Evolution History"
          >
            📜 Dossier
          </button>
        </div>

        <p className={`text-xs font-medium line-clamp-3 leading-relaxed ${
          isLight ? 'text-slate-700' : 'text-slate-300'
        }`}>
          &ldquo;{realPrompt}&rdquo;
        </p>

        <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-400 font-bold">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Vector Matched</span>
          </span>
          <span>v{currentVer?.version_number || 1} • {versions.length} versions</span>
        </div>
      </div>

      {/* 2. GEMINI ENTERPRISE AI REFINEMENT PROMPT INPUT */}
      <div className={`p-3 rounded-2xl border space-y-2.5 transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm'
          : 'bg-[#090D18] border-teal-500/30 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Sparkles className="w-3 h-3" />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-wide block">Gemini Enterprise AI</span>
              <span className="text-[9px] font-bold text-teal-500 dark:text-teal-400 block -mt-0.5">3.7 Flash Architecture Engine</span>
            </div>
          </div>

          <span className="text-[9px] font-mono text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            Enter ↵
          </span>
        </div>

        <form onSubmit={onSendPrompt} className="space-y-2">
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={2}
              value={promptInput}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={dynamicPlaceholder}
              disabled={isGenerating}
              className={`w-full text-xs rounded-xl p-2.5 pr-8 border outline-none font-medium resize-none transition-all leading-relaxed ${
                isLight
                  ? 'bg-slate-50 border-slate-300 focus:border-teal-500 focus:bg-white text-slate-900 placeholder-slate-400'
                  : 'bg-slate-950 border-slate-700/80 focus:border-teal-400 text-white placeholder-slate-500'
              }`}
            />
            <button
              type="submit"
              disabled={!promptInput.trim() || isGenerating}
              className="absolute right-2 bottom-2.5 p-1.5 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark disabled:opacity-40 transition-all cursor-pointer shadow-sm"
              title="Apply Architecture Refactor"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className={`text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium border ${
            isLight ? 'bg-indigo-50/70 border-indigo-200 text-indigo-800' : 'bg-indigo-950/40 border-indigo-800/60 text-indigo-300'
          }`}>
            <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
            <span>Iterate: Enter any change to create <strong>v{(currentVer?.version_number || 1) + 1}</strong> with full rollback in history.</span>
          </div>
        </form>

        {/* 1-Click Suggestions Chips */}
        {suggestions.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
              Suggested Transformations:
            </span>
            <div className="space-y-1 max-h-28 overflow-y-auto custom-scrollbar pr-0.5">
              {suggestions.slice(0, 3).map((sugg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectSuggestion(sugg)}
                  className={`w-full text-left p-1.5 rounded-lg text-[11px] font-medium transition-all truncate border flex items-center gap-1.5 cursor-pointer ${
                    isLight
                      ? 'bg-slate-50 hover:bg-teal-50/70 border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-900'
                      : 'bg-slate-950/70 hover:bg-slate-800 border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-teal-300'
                  }`}
                  title={sugg}
                >
                  <Sparkles className="w-2.5 h-2.5 text-teal-500 shrink-0" />
                  <span className="truncate">{sugg}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🏛️ ARCHITECTURE Q&A & ADVISORY RESPONSE (Truthful text analysis without diagram modification) */}
      {(latestAiMessage || (isGenerating && latestUserQuestion)) && (
        <div ref={qaRef} className={`p-3 rounded-2xl border space-y-2 transition-all ${
          isLight
            ? 'bg-white border-teal-300/80 shadow-md ring-1 ring-teal-500/20'
            : 'bg-[#080D1A] border-teal-500/50 shadow-lg ring-1 ring-teal-400/20'
        }`}>
          <div 
            onClick={() => setIsQaResponseExpanded(!isQaResponseExpanded)}
            className="flex items-center justify-between cursor-pointer border-b pb-2 border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[11px] font-black tracking-wide block text-teal-600 dark:text-teal-400">
                  Architecture Q&amp;A Advisory
                </span>
                <span className="text-[9px] font-mono text-slate-400 block -mt-0.5">
                  Truthful Analysis • 0 Diagram Mutations
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
              }`}>
                Advisory Active
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isQaResponseExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {isQaResponseExpanded && (
            <div className="space-y-2.5 pt-1">
              {latestUserQuestion && (
                <div className={`p-2 rounded-xl text-xs font-medium border ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-800 text-slate-200'
                }`}>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Your Question:
                  </div>
                  <p className="line-clamp-2 italic">&ldquo;{latestUserQuestion.text}&rdquo;</p>
                </div>
              )}

              {isGenerating ? (
                <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                  isLight ? 'bg-teal-50/50 border-teal-200 text-teal-900' : 'bg-teal-950/20 border-teal-800/60 text-teal-200'
                }`}>
                  <Loader2 className="w-4 h-4 animate-spin text-teal-500 shrink-0" />
                  <span>Evaluating diagram topology against GCP Well-Architected Framework...</span>
                </div>
              ) : latestAiMessage ? (
                <div className={`p-2.5 rounded-xl border max-h-64 overflow-y-auto custom-scrollbar text-xs leading-relaxed ${
                  isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}>
                  <div 
                    className="prose prose-sm max-w-none text-xs"
                    dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(latestAiMessage.text, theme) }}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* 3. ARCHITECTURAL UTILITIES GRID */}
      <div className={`p-3 rounded-2xl border space-y-2 transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm'
          : 'bg-[#090D18] border-slate-800 shadow-md'
      }`}>
        <div 
          onClick={() => setIsToolsExpanded(!isToolsExpanded)}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Architecture Utilities
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isToolsExpanded ? 'rotate-180' : ''}`} />
        </div>

        {isToolsExpanded && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={onAuditDiagram}
              disabled={isAuditing}
              className={`p-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-900'
                  : 'bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/30 text-teal-300'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span className="truncate">Security Audit</span>
            </button>

            <button
              type="button"
              onClick={onOpenCostModal}
              className={`p-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">${costEstimateMonthly.toLocaleString()}/mo</span>
            </button>

            <button
              type="button"
              onClick={onOpenComposeModal}
              className={`p-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900'
                  : 'bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/30 text-sky-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">Compose Doc</span>
            </button>

            <button
              type="button"
              onClick={onOpenPlaybookModal}
              className={`p-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900'
                  : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="truncate">Blueprint Matrix</span>
            </button>

            <button
              type="button"
              onClick={onOpenSetMasterModal}
              className={`p-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">Set Master</span>
            </button>

            <button
              type="button"
              onClick={onOpenExportModal}
              className={`p-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span className="truncate">Export Studio</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. PROMPT & VERSION EVOLUTION ACCORDION */}
      {versions.length > 1 && (
        <div className={`p-3 rounded-2xl border space-y-2 transition-all ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-[#090D18] border-slate-800 shadow-md'
        }`}>
          <div
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-teal-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Prompt History ({versions.length})
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isHistoryExpanded ? 'rotate-180' : ''}`} />
          </div>

          {isHistoryExpanded && (
            <div className="space-y-1.5 pt-1 max-h-40 overflow-y-auto custom-scrollbar">
              {versions.map((ver, idx) => (
                <div
                  key={ver.id || idx}
                  className={`p-2 rounded-xl border text-[11px] space-y-0.5 ${
                    ver.id === currentVer?.id
                      ? isLight ? 'bg-teal-50 border-teal-300 text-teal-950 font-bold' : 'bg-teal-950/30 border-teal-500/40 text-teal-200 font-bold'
                      : isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[10px] text-teal-600 dark:text-teal-400">v{ver.version_number}</span>
                    <span className="text-[9px] text-slate-400">{ver.comment || 'Refinement'}</span>
                  </div>
                  <p className="text-[10px] line-clamp-1 font-mono opacity-80">{ver.prompt || 'Architecture update'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
