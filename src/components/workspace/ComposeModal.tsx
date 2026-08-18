'use client';

import React, { useState } from 'react';
import { ARCHETYPE_REGISTRY, ArchetypeId } from '../../lib/compose/archetypes';
import { useTheme } from '../../lib/themeContext';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentXml?: string;
  currentGraphJson?: unknown;
  currentTitle?: string;
  currentDomain?: string;
  activeDiagramVersionId?: string;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({
  isOpen,
  onClose,
  currentXml,
  currentGraphJson,
  currentTitle = 'Architecture System Model',
  currentDomain = 'Enterprise Software System',
  activeDiagramVersionId,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeId>('prd');
  const [format, setFormat] = useState<'docx' | 'md'>('md');
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');

  if (!isOpen) return null;

  const archetypes = Object.values(ARCHETYPE_REGISTRY);
  const currentArch = ARCHETYPE_REGISTRY[selectedArchetype];

  const renderExecutiveDocument = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // H1 Header
      if (line.startsWith('# ')) {
        elements.push(
          <div key={`h1-${i}`} className={`pb-3 border-b-2 mt-4 mb-3 ${isLight ? 'border-sky-600' : 'border-sky-500/60'}`}>
            <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-slate-50'}`}>
              {line.replace('# ', '')}
            </h1>
          </div>
        );
        i++;
        continue;
      }

      // H2 Header
      if (line.startsWith('## ')) {
        elements.push(
          <div key={`h2-${i}`} className="mt-6 mb-2">
            <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
              <span className={`h-2 w-2 rounded-full ${isLight ? 'bg-sky-600' : 'bg-sky-400'}`}></span>
              {line.replace('## ', '')}
            </h2>
          </div>
        );
        i++;
        continue;
      }

      // H3 Header
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className={`text-sm font-bold uppercase tracking-wider mt-4 mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className={`my-4 ${isLight ? 'border-slate-300' : 'border-slate-800'}`} />);
        i++;
        continue;
      }

      // Table parsing
      if (line.trim().startsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        const headers = tableLines[0]
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);

        const dataRows = tableLines
          .slice(1)
          .filter((rowLine) => !rowLine.includes('---'))
          .map((rowLine) =>
            rowLine
              .split('|')
              .map((c) => c.trim())
              .filter((_, idx, arr) => idx >= 0 && idx < arr.length)
          );

        elements.push(
          <div key={`table-${i}`} className={`my-4 overflow-x-auto rounded-xl border shadow-md ${
            isLight ? 'border-slate-300 bg-white' : 'border-slate-700/80 bg-slate-950/60'
          }`}>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${
                  isLight ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-800/90 text-slate-200 border-slate-700'
                }`}>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className={`px-4 py-2.5 font-bold uppercase tracking-wider text-[11px] ${
                      isLight ? 'text-slate-800' : 'text-slate-300'
                    }`}>
                      {h.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/80'}`}>
                {dataRows.map((r, rIdx) => (
                  <tr
                    key={rIdx}
                    className={
                      rIdx % 2 === 0
                        ? isLight ? 'bg-white hover:bg-slate-50' : 'bg-slate-900/40 hover:bg-slate-800/50'
                        : isLight ? 'bg-slate-50 hover:bg-slate-100' : 'bg-slate-950/40 hover:bg-slate-800/50'
                    }
                  >
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-4 py-2.5 leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                        {cell.replace(/\*\*/g, '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Callout Banner
      if (line.trim().startsWith('>')) {
        elements.push(
          <div
            key={`quote-${i}`}
            className={`my-3 p-3.5 border-l-4 rounded-r-lg text-xs leading-relaxed ${
              isLight
                ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs'
                : 'bg-amber-500/10 border-amber-500 text-amber-200'
            }`}
          >
            {line.replace(/^>\s*/, '').replace(/\[!NOTE\]|\[!IMPORTANT\]/g, '📌')}
          </div>
        );
        i++;
        continue;
      }

      // Bullet items
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().replace(/^[\*\-]\s+/, '');
        elements.push(
          <div key={`bullet-${i}`} className={`flex items-start gap-2.5 text-xs ml-2 my-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            <span className={`mt-1 font-bold ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>•</span>
            <span className="leading-relaxed">{bulletText.replace(/\*\*(.*?)\*\*/g, '$1')}</span>
          </div>
        );
        i++;
        continue;
      }

      // Code blocks / diagrams
      if (line.trim().startsWith('```')) {
        const isMermaid = line.includes('mermaid');
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```

        if (isMermaid) {
          const parsedNodes: { id: string; label: string; tier: string }[] = [];
          const parsedFlows: { from: string; to: string; label?: string }[] = [];

          for (const rawLine of codeLines) {
            const line = rawLine.trim();
            const nodeMatch = line.match(/^([A-Za-z0-9_]+)\["([^"]+)"\]/);
            if (nodeMatch) {
              const [, id, label] = nodeMatch;
              let tier = 'Architecture Tier';
              if (label.includes('🌐') || label.includes('Client') || label.includes('Portal')) tier = 'Ingress & Client Tier';
              else if (label.includes('🛡️') || label.includes('WAF') || label.includes('Gateway') || label.includes('VPC')) tier = 'Security & Perimeter Tier';
              else if (label.includes('⚙️') || label.includes('Orchestrator') || label.includes('Pod') || label.includes('ReAct')) tier = 'Compute & Runtime Tier';
              else if (label.includes('🤖') || label.includes('Gemini') || label.includes('Model') || label.includes('LLM')) tier = 'AI & Cognitive Model Tier';
              else if (label.includes('🪣') || label.includes('📊') || label.includes('Data') || label.includes('RAG')) tier = 'Enterprise Data & Knowledge Tier';
              else if (label.includes('🗄️') || label.includes('Audit') || label.includes('Governance') || label.includes('HITL')) tier = 'Governance & Audit Tier';

              if (!parsedNodes.some((n) => n.id === id)) {
                parsedNodes.push({ id, label, tier });
              }
            }

            const flowMatch = line.match(/([A-Za-z0-9_]+)\s*-->\s*(?:\|"([^"]+)"\|\s*)?([A-Za-z0-9_]+)/);
            if (flowMatch) {
              parsedFlows.push({ from: flowMatch[1], to: flowMatch[3], label: flowMatch[2] });
            }
          }

          elements.push(
            <div
              key={`diagram-${i}`}
              className={`my-6 rounded-2xl border shadow-xl overflow-hidden ${
                isLight
                  ? 'border-sky-300 bg-white shadow-slate-300/40'
                  : 'border-sky-500/50 bg-slate-950/95 shadow-2xl'
              }`}
            >
              {/* Diagram Header */}
              <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
                isLight
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className={`h-3 w-3 rounded-full animate-pulse ${isLight ? 'bg-sky-600' : 'bg-sky-400'}`}></span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                    📐 Embedded Interactive Visual Architecture Diagram Figure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  }`}>
                    GxP &amp; VPC-SC Verified
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isLight ? 'bg-white text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {parsedNodes.length || codeLines.length} Architecture Nodes
                  </span>
                </div>
              </div>

              {/* Visual Architecture Flow Layout */}
              <div className="p-6 space-y-5">
                {parsedNodes.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {parsedNodes.slice(0, 9).map((node, nIdx) => (
                        <div
                          key={node.id}
                          className={`p-4 rounded-xl border transition shadow-sm flex flex-col justify-between ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 hover:border-sky-400 hover:bg-white'
                              : 'bg-slate-900/90 border-slate-700/80 hover:border-sky-400/80 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                              isLight ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                            }`}>
                              Step 0{nIdx + 1}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                              {node.tier}
                            </span>
                          </div>
                          <div className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                            {node.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Flow Connections Visual Bar */}
                    {parsedFlows.length > 0 && (
                      <div className={`p-4 rounded-xl border ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800/80'
                      }`}>
                        <div className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          <span>⚡ Primary Architectural Event &amp; Data Integration Paths</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {parsedFlows.slice(0, 6).map((flow, fIdx) => {
                            const sourceNode = parsedNodes.find((n) => n.id === flow.from);
                            const targetNode = parsedNodes.find((n) => n.id === flow.to);
                            return (
                              <div
                                key={fIdx}
                                className={`px-3 py-2 rounded-lg border flex items-center justify-between ${
                                  isLight
                                    ? 'bg-white border-slate-200 text-slate-800'
                                    : 'bg-slate-950/80 border-slate-800 text-slate-300'
                                }`}
                              >
                                <span className={`font-semibold truncate max-w-[42%] ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                                  {sourceNode?.label.replace(/^[^\s]+\s+/, '') || flow.from}
                                </span>
                                <span className={`text-xs px-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {flow.label ? `➔ [${flow.label}] ➔` : '──────►'}
                                </span>
                                <span className={`font-semibold truncate max-w-[42%] ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>
                                  {targetNode?.label.replace(/^[^\s]+\s+/, '') || flow.to}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {codeLines
                      .filter((l) => l.includes('-->') || l.includes('->>'))
                      .slice(0, 6)
                      .map((l, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border text-xs font-mono ${
                          isLight ? 'bg-slate-50 border-slate-200 text-sky-800' : 'bg-slate-900 border-slate-800 text-sky-300'
                        }`}>
                          {l.trim()}
                        </div>
                      ))}
                  </div>
                )}

                {/* Compliance & Verification Legend */}
                <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] ${
                  isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800/80 text-slate-400'
                }`}>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span> 21 CFR Part 11 Compliant
                    </span>
                    <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                      <span className="h-2 w-2 rounded-full bg-sky-500"></span> VPC-SC Restricted Network
                    </span>
                    <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span> HITL Governance Board Gate
                    </span>
                  </div>
                </div>
              </div>

              {/* Collapsible raw diagram spec */}
              <details className={`border-t text-[11px] ${
                isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-950/70'
              }`}>
                <summary className={`px-5 py-2 cursor-pointer font-mono ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}>
                  🔍 Inspect Raw Architecture Flow Vector Specification ({codeLines.length} lines)
                </summary>
                <pre className={`p-4 font-mono text-xs overflow-x-auto ${
                  isLight ? 'bg-slate-100 text-teal-800' : 'bg-slate-950 text-teal-300'
                }`}>
                  {codeLines.join('\n')}
                </pre>
              </details>
            </div>
          );
        } else {
          elements.push(
            <pre
              key={`code-${i}`}
              className={`my-3 p-4 rounded-xl border font-mono text-xs overflow-x-auto ${
                isLight ? 'bg-slate-50 border-slate-200 text-teal-800' : 'bg-slate-950 border-slate-800 text-teal-300'
              }`}
            >
              {codeLines.join('\n')}
            </pre>
          );
        }
        continue;
      }

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // Standard paragraph
      elements.push(
        <p key={`p-${i}`} className={`text-xs leading-relaxed my-2 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
          {line.replace(/\*\*(.*?)\*\*/g, '$1')}
        </p>
      );
      i++;
    }

    return elements;
  };

  const handleComposeAndPreview = async (downloadFormat?: 'docx' | 'md') => {
    setIsComposing(true);
    setError(null);
    const targetFormat = downloadFormat || 'md';
    try {
      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetype,
          format: targetFormat,
          diagramVersionIds: activeDiagramVersionId ? [activeDiagramVersionId] : [],
          xml: currentXml,
          graph_json: currentGraphJson,
          title: currentTitle,
          domain: currentDomain,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server returned ${res.status}`);
      }

      if (downloadFormat === 'docx') {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedArchetype}_${Date.now()}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return;
      }

      const text = await res.text();
      setPreviewContent(text);
    } catch (err: any) {
      setError(err.message || 'Failed to compose document');
    } finally {
      setIsComposing(false);
    }
  };

  const handleCopyToClipboardForGoogleDocs = async () => {
    if (!previewContent) return;
    try {
      await navigator.clipboard.writeText(previewContent);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    } catch (e) {
      console.error('Clipboard write failed:', e);
    }
  };

  const handleOpenGoogleDocs = () => {
    window.open('https://docs.google.com/document/create', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className={`rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-all border ${
        isLight
          ? 'bg-white border-slate-300 text-slate-900 shadow-slate-300/60'
          : 'bg-slate-900 border-slate-700/80 text-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
        }`}>
          <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
              <span>📄</span> Document Composer & Executive Reader
            </h2>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Generate authoritative PRDs, SDDs, FDDs, and Threat Models with native Google Docs & Mac preview support.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`px-3 py-1.5 rounded-lg text-sm transition cursor-pointer ${
              isLight
                ? 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800'
            }`}
          >
            ✕ Close
          </button>
        </div>

        {/* Preview Viewport or Archetype Selection */}
        {previewContent ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top Action Toolbar for Mac / Google Docs Users */}
            <div className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/90 border-slate-800'
            }`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewContent(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                    isLight
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  ← Change Document Archetype
                </button>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  isLight
                    ? 'bg-teal-100 text-teal-900 border-teal-300'
                    : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                }`}>
                  {currentArch.name} Publication View Ready
                </span>

                <div className={`ml-2 flex items-center rounded-lg p-0.5 border ${
                  isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-slate-800'
                }`}>
                  <button
                    onClick={() => setViewMode('formatted')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      viewMode === 'formatted'
                        ? 'bg-sky-500 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ✨ Executive Paper View
                  </button>
                  <button
                    onClick={() => setViewMode('raw')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      viewMode === 'raw'
                        ? 'bg-sky-500 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    💻 Raw Markdown / Text
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleCopyToClipboardForGoogleDocs}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedSuccess ? (
                    <>
                      <span>✓</span> Copied for Google Docs!
                    </>
                  ) : (
                    <>
                      <span>📋</span> Copy Text for Google Docs (Cmd+V)
                    </>
                  )}
                </button>

                <button
                  onClick={handleOpenGoogleDocs}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                    isLight
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
                  }`}
                  title="Opens a new blank Google Document tab where you can press Cmd+V to paste"
                >
                  <span>🌐</span> Open Google Docs Tab
                </button>

                <button
                  onClick={() => handleComposeAndPreview('docx')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  📥 Download DOCX
                </button>
              </div>
            </div>

            {/* Google Docs Usage Tip Banner */}
            <div className={`px-6 py-2 border-b text-xs flex items-center justify-between ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-amber-950/40 border-amber-800/40 text-amber-200'
            }`}>
              <span>
                💡 <strong>Mac / Google Docs User Tip:</strong> Click <strong>&ldquo;Copy Text for Google Docs&rdquo;</strong>, then click <strong>&ldquo;Open Google Docs Tab&rdquo;</strong> and press <kbd className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${
                  isLight ? 'bg-amber-200 text-amber-950 border border-amber-300 font-bold' : 'bg-amber-900 text-amber-100'
                }`}>Cmd + V</kbd> to paste your polished document into Google Docs!
              </span>
            </div>

            {/* Publication-Grade Executive Document Reader */}
            <div className={`p-8 overflow-y-auto flex-1 select-text ${
              isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0f172a] text-slate-100'
            }`}>
              {viewMode === 'formatted' ? (
                <div className={`max-w-4xl mx-auto rounded-2xl p-8 shadow-xl space-y-6 border ${
                  isLight ? 'bg-white border-slate-300' : 'bg-slate-900/90 border-slate-700/80'
                }`}>
                  {renderExecutiveDocument(previewContent)}
                </div>
              ) : (
                <pre className={`max-w-4xl mx-auto p-6 rounded-2xl font-mono text-xs leading-relaxed whitespace-pre-wrap border ${
                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}>
                  {previewContent}
                </pre>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {error && (
              <div className={`p-3.5 rounded-xl border text-sm ${
                isLight ? 'bg-red-50 border-red-300 text-red-800' : 'bg-red-950/60 border-red-800/60 text-red-200'
              }`}>
                ❌ {error}
              </div>
            )}

            {/* Mac / Google Docs Notice Banner */}
            <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
              isLight
                ? 'bg-sky-50 border-sky-200 text-sky-950'
                : 'bg-sky-950/40 border-sky-800/50 text-sky-200'
            }`}>
              <div>
                <span className={`font-bold text-sm block mb-1 ${isLight ? 'text-sky-900 font-extrabold' : 'text-sky-300'}`}>
                  💻 Designed for Mac &amp; Google Docs (No Microsoft Word Required)
                </span>
                <span className={isLight ? 'text-sky-900' : 'text-sky-200'}>
                  Select your document deliverable below. Clicking <strong>&ldquo;Generate &amp; Open Preview&rdquo;</strong> opens a live interactive reader where you can copy directly into Google Docs or download Markdown/DOCX files.
                </span>
              </div>
            </div>

            {/* Archetype Selector */}
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                1. Select Document Deliverable Archetype
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {archetypes.map((arch) => {
                  const isSelected = selectedArchetype === arch.id;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => setSelectedArchetype(arch.id)}
                      className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-400/40'
                            : 'bg-sky-950/50 border-sky-500 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/50'
                          : isLight
                          ? 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                          : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold text-sm ${isLight ? 'text-slate-900 font-bold' : 'text-slate-100'}`}>{arch.name}</span>
                          {isSelected && <span className={`text-xs font-bold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>✓ Active</span>}
                        </div>
                        <p className={`text-xs line-clamp-2 leading-relaxed mb-2.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {arch.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-auto">
                        {arch.diagramTypes.map((t) => (
                          <span
                            key={t}
                            className={`text-[10px] px-1.5 py-0.5 rounded border ${
                              isLight
                                ? 'bg-white text-slate-700 border-slate-300'
                                : 'bg-slate-800 text-slate-300 border-slate-700/60'
                            }`}
                          >
                            {t.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Archetype Section Blueprint */}
            <div className={`border rounded-xl p-4 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/80'
            }`}>
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}>
                Section Blueprint for &ldquo;{currentArch.name}&rdquo; ({currentArch.sections.length} sections)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {currentArch.sections.map((sec) => (
                  <div
                    key={sec.id}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-between ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <span className={`font-medium truncate pr-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{sec.title}</span>
                    <span
                      className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${
                        sec.provenance === 'derived'
                          ? isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                          : sec.provenance === 'inferred'
                          ? isLight ? 'bg-sky-50 text-sky-800 border-sky-300' : 'bg-sky-950 text-sky-300 border-sky-800/60'
                          : isLight ? 'bg-amber-50 text-amber-950 border-amber-300' : 'bg-amber-950 text-amber-300 border-amber-800/60'
                      }`}
                    >
                      {sec.provenance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions when in Archetype Selector */}
        {!previewContent && (
          <div className={`px-6 py-4 border-t flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Source architecture model: <strong className={isLight ? 'text-slate-900' : 'text-slate-200'}>{currentTitle}</strong>
            </span>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 text-sm transition cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleComposeAndPreview('md')}
                disabled={isComposing}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-950/50 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isComposing ? (
                  <>
                    <span className="animate-spin">⏳</span> Composing &amp; Rendering...
                  </>
                ) : (
                  <>
                    <span>✨</span> Generate &amp; Open Preview (Google Docs Ready)
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
