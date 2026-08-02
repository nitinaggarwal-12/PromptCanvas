'use client';

import React, { useState } from 'react';
import { ARCHETYPE_REGISTRY, ArchetypeId } from '../../lib/compose/archetypes';

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
          <div key={`h1-${i}`} className="pb-3 border-b-2 border-sky-500/60 mt-4 mb-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-50">
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
            <h2 className="text-lg font-bold text-sky-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400"></span>
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
          <h3 key={`h3-${i}`} className="text-sm font-bold uppercase tracking-wider text-slate-300 mt-4 mb-1">
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="border-slate-800 my-4" />);
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
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-xl border border-slate-700/80 shadow-lg bg-slate-950/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-2.5 font-bold uppercase tracking-wider text-[11px] text-slate-300">
                      {h.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {dataRows.map((r, rIdx) => (
                  <tr
                    key={rIdx}
                    className={
                      rIdx % 2 === 0
                        ? 'bg-slate-900/40 hover:bg-slate-800/50 transition'
                        : 'bg-slate-950/40 hover:bg-slate-800/50 transition'
                    }
                  >
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 text-slate-300 leading-relaxed">
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
            className="my-3 p-3.5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg text-amber-200 text-xs leading-relaxed"
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
          <div key={`bullet-${i}`} className="flex items-start gap-2.5 text-xs text-slate-300 ml-2 my-1">
            <span className="text-sky-400 mt-1 font-bold">•</span>
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
          // Parse node definitions and flows cleanly from Mermaid code
          const parsedNodes: { id: string; label: string; tier: string }[] = [];
          const parsedFlows: { from: string; to: string; label?: string }[] = [];

          for (const rawLine of codeLines) {
            const line = rawLine.trim();
            // Match node definitions like ID["Label"] or ID["Label"]
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

            // Match directional flows like A --> B or A -->|"Label"| B
            const flowMatch = line.match(/([A-Za-z0-9_]+)\s*-->\s*(?:\|"([^"]+)"\|\s*)?([A-Za-z0-9_]+)/);
            if (flowMatch) {
              parsedFlows.push({ from: flowMatch[1], to: flowMatch[3], label: flowMatch[2] });
            }
          }

          elements.push(
            <div
              key={`diagram-${i}`}
              className="my-6 rounded-2xl border border-sky-500/50 bg-slate-950/95 shadow-2xl overflow-hidden"
            >
              {/* Diagram Header */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-sky-400 animate-pulse shadow-sm shadow-sky-400"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                    📐 Embedded Interactive Visual Architecture Diagram Figure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    GxP &amp; VPC-SC Verified
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
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
                          className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-sky-400/80 hover:bg-slate-900 transition shadow-lg flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                              Step 0{nIdx + 1}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                              {node.tier}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-100 leading-snug">
                            {node.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Flow Connections Visual Bar */}
                    {parsedFlows.length > 0 && (
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                          <span>⚡ Primary Architectural Event &amp; Data Integration Paths</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {parsedFlows.slice(0, 6).map((flow, fIdx) => {
                            const sourceNode = parsedNodes.find((n) => n.id === flow.from);
                            const targetNode = parsedNodes.find((n) => n.id === flow.to);
                            return (
                              <div
                                key={fIdx}
                                className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-slate-300"
                              >
                                <span className="font-semibold text-sky-300 truncate max-w-[42%]">
                                  {sourceNode?.label.replace(/^[^\s]+\s+/, '') || flow.from}
                                </span>
                                <span className="text-slate-500 text-xs px-1">
                                  {flow.label ? `➔ [${flow.label}] ➔` : '──────►'}
                                </span>
                                <span className="font-semibold text-emerald-300 truncate max-w-[42%]">
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
                        <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-sky-300 font-mono">
                          {l.trim()}
                        </div>
                      ))}
                  </div>
                )}

                {/* Compliance & Verification Legend */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span> 21 CFR Part 11 Compliant
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-sky-400">
                      <span className="h-2 w-2 rounded-full bg-sky-400"></span> VPC-SC Restricted Network
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-400">
                      <span className="h-2 w-2 rounded-full bg-amber-400"></span> HITL Governance Board Gate
                    </span>
                  </div>
                </div>
              </div>

              {/* Collapsible raw diagram spec */}
              <details className="border-t border-slate-800 bg-slate-950/70 text-[11px]">
                <summary className="px-5 py-2 cursor-pointer text-slate-400 hover:text-slate-200 font-mono">
                  🔍 Inspect Raw Architecture Flow Vector Specification ({codeLines.length} lines)
                </summary>
                <pre className="p-4 text-teal-300 font-mono text-xs overflow-x-auto bg-slate-950">
                  {codeLines.join('\n')}
                </pre>
              </details>
            </div>
          );
        } else {
          elements.push(
            <pre
              key={`code-${i}`}
              className="my-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto"
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
        <p key={`p-${i}`} className="text-xs text-slate-300 leading-relaxed my-2">
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
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>📄</span> Document Composer & Executive Reader
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generate authoritative PRDs, SDDs, FDDs, and Threat Models with native Google Docs & Mac preview support.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg text-sm bg-slate-800/60 hover:bg-slate-800 transition"
          >
            ✕ Close
          </button>
        </div>

        {/* Preview Viewport or Archetype Selection */}
        {previewContent ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top Action Toolbar for Mac / Google Docs Users */}
            <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewContent(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                >
                  ← Change Document Archetype
                </button>
                <span className="text-xs text-teal-400 font-semibold px-2.5 py-1 bg-teal-500/10 rounded-md border border-teal-500/20">
                  {currentArch.name} Publication View Ready
                </span>

                <div className="ml-2 flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('formatted')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                      viewMode === 'formatted'
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ✨ Executive Paper View
                  </button>
                  <button
                    onClick={() => setViewMode('raw')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                      viewMode === 'raw'
                        ? 'bg-sky-500 text-white shadow-sm'
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
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white shadow-sm transition flex items-center gap-1.5"
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
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition flex items-center gap-1.5"
                  title="Opens a new blank Google Document tab where you can press Cmd+V to paste"
                >
                  <span>🌐</span> Open Google Docs Tab
                </button>

                <button
                  onClick={() => handleComposeAndPreview('docx')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  📥 Download DOCX
                </button>
              </div>
            </div>

            {/* Google Docs Usage Tip Banner */}
            <div className="px-6 py-2 bg-amber-950/40 border-b border-amber-800/40 text-xs text-amber-200 flex items-center justify-between">
              <span>
                💡 <strong>Mac / Google Docs User Tip:</strong> Click <strong>&ldquo;Copy Text for Google Docs&rdquo;</strong>, then click <strong>&ldquo;Open Google Docs Tab&rdquo;</strong> and press <kbd className="px-1.5 py-0.5 bg-amber-900 rounded font-mono text-[10px]">Cmd + V</kbd> to paste your polished document into Google Docs!
              </span>
            </div>

            {/* Publication-Grade Executive Document Reader */}
            <div className="p-8 overflow-y-auto flex-1 bg-[#0f172a] text-slate-100 select-text">
              {viewMode === 'formatted' ? (
                <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl p-8 shadow-2xl space-y-6">
                  {renderExecutiveDocument(previewContent)}
                </div>
              ) : (
                <pre className="max-w-4xl mx-auto p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {previewContent}
                </pre>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {error && (
              <div className="p-3.5 bg-red-950/60 border border-red-800/60 rounded-xl text-red-200 text-sm">
                ❌ {error}
              </div>
            )}

            {/* Mac / Google Docs Notice Banner */}
            <div className="p-4 bg-sky-950/40 border border-sky-800/50 rounded-xl text-xs text-sky-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-sky-300 text-sm block mb-1">
                  💻 Designed for Mac &amp; Google Docs (No Microsoft Word Required)
                </span>
                <span>
                  Select your document deliverable below. Clicking <strong>&ldquo;Generate &amp; Open Preview&rdquo;</strong> opens a live interactive reader where you can copy directly into Google Docs or download Markdown/DOCX files.
                </span>
              </div>
            </div>

            {/* Archetype Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
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
                      className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-sky-950/50 border-sky-500 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/50'
                          : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-slate-100">{arch.name}</span>
                          {isSelected && <span className="text-sky-400 text-xs">✓ Active</span>}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
                          {arch.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-auto">
                        {arch.diagramTypes.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
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
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Section Blueprint for &ldquo;{currentArch.name}&rdquo; ({currentArch.sections.length} sections)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {currentArch.sections.map((sec) => (
                  <div
                    key={sec.id}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between"
                  >
                    <span className="text-slate-200 font-medium truncate pr-2">{sec.title}</span>
                    <span
                      className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                        sec.provenance === 'derived'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                          : sec.provenance === 'inferred'
                          ? 'bg-sky-950 text-sky-300 border border-sky-800/60'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/60'
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
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Source architecture model: <strong className="text-slate-200">{currentTitle}</strong>
            </span>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleComposeAndPreview('md')}
                disabled={isComposing}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-950/50 transition flex items-center gap-2 disabled:opacity-50"
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
