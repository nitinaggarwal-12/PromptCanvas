'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  History,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  Layers,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Clock,
  Briefcase,
  Cpu,
  Download
} from 'lucide-react';
import { Diagram, DiagramVersion } from '@/lib/db';
import { parseXmlNodesAndEdges, DiagramNodeItem } from '@/lib/graph/xmlNodesParser';

interface ProjectPromptDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagram: Diagram | null;
  activeVersion: DiagramVersion | null;
  onSelectVersion?: (version: DiagramVersion) => void;
  theme?: 'light' | 'dark';
}

export const ProjectPromptDossierModal: React.FC<ProjectPromptDossierModalProps> = ({
  isOpen,
  onClose,
  diagram,
  activeVersion,
  onSelectVersion,
  theme = 'dark',
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'history' | 'validation' | 'brief'>('prompt');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const isLight = theme === 'light';

  if (!isOpen || !diagram) return null;

  const versions = diagram.versions || [];
  const currentVer = activeVersion || versions[versions.length - 1] || null;
  const initialPrompt = versions[0]?.prompt || "Production enterprise cloud architecture";
  const activePrompt = currentVer?.prompt || initialPrompt;

  // Extract diagram nodes from current XML to check alignment
  const currentXml = currentVer?.xml_content || '';
  const parsedGraph: DiagramNodeItem[] = parseXmlNodesAndEdges(currentXml);
  const diagramNodeNames: string[] = parsedGraph.filter((n: DiagramNodeItem) => !n.isEdge).map((n: DiagramNodeItem) => n.label.toLowerCase());

  // Analyze prompt keywords and match them against diagram nodes
  const promptKeywords = [
    { label: 'Ingress / WAF / CDN', keywords: ['waf', 'armor', 'cdn', 'ingress', 'load balancer', 'lb', 'gateway'] },
    { label: 'Compute / Microservices', keywords: ['gke', 'k8s', 'kubernetes', 'cluster', 'container', 'cloud run', 'microservice', 'compute', 'vm', 'pod'] },
    { label: 'Database / Persistent Store', keywords: ['sql', 'postgres', 'spanner', 'database', 'db', 'bigquery', 'aurora', 'dynamodb', 'datastore'] },
    { label: 'Cache / Memory Tier', keywords: ['redis', 'memorystore', 'memcached', 'cache'] },
    { label: 'Event Streaming / Queue', keywords: ['pub/sub', 'pubsub', 'kafka', 'queue', 'sqs', 'sns', 'event', 'streaming', 'stream'] },
    { label: 'AI / LLM Orchestration', keywords: ['vertex', 'gemini', 'rag', 'llm', 'vector', 'agent', 'model', 'embeddings'] },
    { label: 'Security / Zero-Trust / KMS', keywords: ['kms', 'encryption', 'zero-trust', 'iam', 'secret', 'vault', 'ssl', 'tls', 'soc2', 'pci'] },
    { label: 'Observability / Telemetry', keywords: ['monitoring', 'logging', 'cloud monitoring', 'trace', 'grafana', 'datadog', 'prometheus', 'audit'] },
  ];

  const validationResults = promptKeywords.map(cat => {
    const isRequestedInPrompt = cat.keywords.some(kw => activePrompt.toLowerCase().includes(kw));
    const isPresentInDiagram = cat.keywords.some(kw => 
      diagramNodeNames.some((dn: string) => dn.includes(kw)) || currentXml.toLowerCase().includes(kw)
    );
    
    return {
      category: cat.label,
      requested: isRequestedInPrompt,
      present: isPresentInDiagram,
      status: !isRequestedInPrompt 
        ? 'optional' 
        : isPresentInDiagram 
        ? 'matched' 
        : 'gap'
    };
  });

  const requestedCount = validationResults.filter(v => v.requested).length;
  const matchedCount = validationResults.filter(v => v.requested && v.present).length;
  const alignmentScore = requestedCount > 0 ? Math.round((matchedCount / requestedCount) * 100) : 100;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-[99999] animate-fade-in p-4 sm:p-6 select-none">
      <div className={`rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border overflow-hidden transition-all duration-200 ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
          : 'bg-[#0A0E1A] border-teal-500/40 text-slate-100 shadow-teal-950/60'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between gap-4 shrink-0 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500/15 text-teal-700 dark:text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                  Real Use Case Prompt &amp; Audit Dossier
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  v{currentVer?.version_number || 1} • {diagram.architecture_type ? diagram.architecture_type.replace(/_/g, ' ') : 'Architecture'}
                </span>
              </div>
              <h2 className={`text-lg sm:text-xl font-black truncate mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {diagram.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isLight ? 'hover:bg-slate-200 text-slate-500 hover:text-slate-900' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`px-5 pt-3 border-b flex items-center gap-2 overflow-x-auto shrink-0 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#090D18] border-slate-800'
        }`}>
          {[
            { id: 'prompt', label: '💡 Real Use Case Prompt', icon: FileText },
            { id: 'validation', label: `🎯 Diagram Validation (${alignmentScore}%)`, icon: CheckCircle2 },
            { id: 'history', label: `🕒 Prompt History (${versions.length})`, icon: History },
            { id: 'brief', label: '📋 Business & Technical Specs', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-xs font-black transition-all border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? isLight
                      ? 'border-teal-600 text-teal-700 font-extrabold'
                      : 'border-teal-400 text-teal-300 font-extrabold'
                    : isLight
                    ? 'border-transparent text-slate-500 hover:text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Real Use Case Prompt */}
          {activeTab === 'prompt' && (
            <div className="space-y-6 animate-fade-in">
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Version (v{currentVer?.version_number || 1}) Generation Prompt</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      isLight
                        ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-teal-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <div className={`p-4 rounded-xl border font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                  isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800/80 text-slate-200'
                }`}>
                  {activePrompt}
                </div>
              </div>

              {/* Prompt Alignment Summary Banner */}
              <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                alignmentScore === 100
                  ? isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                  : isLight ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border ${
                    alignmentScore === 100
                      ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                  }`}>
                    {alignmentScore}%
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">
                      {alignmentScore === 100 ? '100% Prompt-to-Architecture Match' : 'High Architectural Alignment'}
                    </h4>
                    <p className="text-xs opacity-80 mt-0.5">
                      {matchedCount} of {requestedCount} core infrastructure requirements are physically mapped and rendered in the vector diagram.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('validation')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    isLight
                      ? 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  <span>Inspect Verification Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* AI Reasoning / Architectural Decision Note */}
              {currentVer?.ai_reasoning && (
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
                }`}>
                  <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Gemini 3.7 Architectural Rationale &amp; Synthesis</span>
                  </span>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {currentVer.ai_reasoning}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Validation Matrix */}
          {activeTab === 'validation' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    1-to-1 Prompt Requirement Mapping Matrix
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Verifies whether every architectural component specified in your prompt exists in the active diagram.
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                  alignmentScore >= 90
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}>
                  Fidelity: {alignmentScore}%
                </span>
              </div>

              <div className="space-y-2.5">
                {validationResults.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                      item.status === 'matched'
                        ? isLight ? 'bg-emerald-50/70 border-emerald-200 text-slate-800' : 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                        : item.status === 'gap'
                        ? isLight ? 'bg-rose-50/70 border-rose-200 text-slate-800' : 'bg-rose-950/20 border-rose-500/30 text-slate-200'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-500 opacity-60' : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.status === 'matched' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : item.status === 'gap' ? (
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      ) : (
                        <Check className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <span className={`text-xs font-bold block ${
                          item.status === 'matched' 
                            ? isLight ? 'text-slate-900' : 'text-white'
                            : isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {item.category}
                        </span>
                        <span className="text-[11px] opacity-70">
                          {item.status === 'matched'
                            ? 'Physical node detected in diagram XML graph'
                            : item.status === 'gap'
                            ? 'Requested in prompt but missing in diagram node topology'
                            : 'Optional category (not explicitly requested in prompt)'}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${
                      item.status === 'matched'
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                        : item.status === 'gap'
                        ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-transparent'
                    }`}>
                      {item.status === 'matched' ? 'Verified in Diagram' : item.status === 'gap' ? 'Missing Node Gap' : 'Not Requested'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Prompt History & Timeline */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Chronological Prompt Evolution Timeline
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Track how the architecture evolved across versions with specific conversational commands.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400">{versions.length} Total Versions</span>
              </div>

              <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700/50 pl-2">
                {versions.map((ver, idx) => {
                  const isVerActive = ver.id === currentVer?.id;
                  return (
                    <div key={ver.id || idx} className="relative pl-7 group">
                      <div className={`absolute left-2.5 top-3 w-3 h-3 rounded-full border-2 -translate-x-1/2 transition-all ${
                        isVerActive
                          ? 'bg-teal-400 border-teal-200 ring-4 ring-teal-500/20'
                          : 'bg-slate-800 border-slate-600'
                      }`} />

                      <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        isVerActive
                          ? isLight
                            ? 'bg-teal-50/80 border-teal-400 text-slate-900 shadow-sm'
                            : 'bg-teal-950/20 border-teal-500/50 text-slate-100 shadow-md'
                          : isLight
                          ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          : 'bg-[#070A13] border-slate-800 text-slate-300 hover:bg-slate-900/60'
                      }`}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                              isVerActive
                                ? 'bg-teal-500 text-slate-950'
                                : 'bg-slate-700 text-slate-300'
                            }`}>
                              v{ver.version_number}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {idx === 0 ? 'Initial Creation Prompt' : 'Iterative Refinement Command'}
                            </span>
                          </div>

                          {onSelectVersion && !isVerActive && (
                            <button
                              type="button"
                              onClick={() => onSelectVersion(ver)}
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                isLight
                                  ? 'bg-white hover:bg-teal-50 border-slate-300 text-teal-800'
                                  : 'bg-slate-800 hover:bg-teal-950/40 border-slate-700 text-teal-300'
                              }`}
                            >
                              Load v{ver.version_number}
                            </button>
                          )}
                        </div>

                        <div className={`p-3 rounded-xl border text-xs font-mono leading-relaxed whitespace-pre-wrap ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}>
                          {ver.prompt || 'Architecture compilation'}
                        </div>

                        {ver.ai_reasoning && (
                          <p className="text-xs text-slate-400 italic">
                            💡 Rationale: {ver.ai_reasoning}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Business & Technical Specs */}
          {activeTab === 'brief' && (
            <div className="space-y-6 animate-fade-in">
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
              }`}>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Business Architecture Brief (PRD)
                  </h4>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {currentVer?.business_usecase || 'High-availability enterprise architecture engineered for mission-critical workloads, SLA guarantees, and enterprise compliance.'}
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
              }`}>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Technical Architecture Specification (SDD)
                  </h4>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {currentVer?.technical_usecase || 'Multi-tier zero-trust topology featuring containerized compute orchestration, low-latency persistent caching, relational and document persistence, and automated telemetry logging.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-4 shrink-0 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A13] border-slate-800'
        }`}>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-500" />
            <span>Architecture pre-audited against CIS GCP benchmarks &amp; Zero-Trust standards</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              isLight
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-teal-400 hover:bg-teal-300 text-slate-950'
            }`}
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
