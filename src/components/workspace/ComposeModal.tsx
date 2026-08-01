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
  const [format, setFormat] = useState<'docx' | 'md'>('docx');
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const archetypes = Object.values(ARCHETYPE_REGISTRY);
  const currentArch = ARCHETYPE_REGISTRY[selectedArchetype];

  const handleCompose = async () => {
    setIsComposing(true);
    setError(null);
    try {
      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetype,
          format,
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

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedArchetype}_${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to compose document');
    } finally {
      setIsComposing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>📄</span> Compose Authoritative Deliverable Document
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Reverse-engineer PRDs, SDDs, Threat Models, and FDDs with mechanical provenance tagging.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg text-sm bg-slate-800/60 hover:bg-slate-800 transition"
          >
            ✕ Close
          </button>
        </div>

        {/* Provenance Tagging Banner */}
        <div className="px-6 py-2.5 bg-sky-950/40 border-b border-sky-800/40 text-xs text-sky-200 flex items-center gap-3">
          <span className="font-semibold px-2 py-0.5 bg-sky-900/60 text-sky-300 rounded border border-sky-700/50">
            PROVENANCE GUARANTEE
          </span>
          <span>
            Every sentence tagged: <strong className="text-emerald-300">[derived]</strong> graph trace,{' '}
            <strong className="text-sky-300">[inferred]</strong> AI reconstruction with verification cues,{' '}
            <strong className="text-amber-300">[human]</strong> explicit TODO block.
          </span>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-3.5 bg-red-950/60 border border-red-800/60 rounded-xl text-red-200 text-sm">
              ❌ {error}
            </div>
          )}

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

          {/* Selected Archetype Structure Breakdown */}
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

          {/* Export Format Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              2. Select Output Document Format
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormat('docx')}
                className={`flex-1 p-3 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 ${
                  format === 'docx'
                    ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                    : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>📘</span>
                <div>
                  <div className="font-semibold">Microsoft Word (.docx)</div>
                  <div className="text-[11px] opacity-75">Printable color-coded provenance shading & tables</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('md')}
                className={`flex-1 p-3 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 ${
                  format === 'md'
                    ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                    : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>📝</span>
                <div>
                  <div className="font-semibold">Markdown (.md)</div>
                  <div className="text-[11px] opacity-75">Provenance summary table & markdown TODO blocks</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Source model: <strong className="text-slate-200">{currentTitle}</strong>
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCompose}
              disabled={isComposing}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-950/50 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isComposing ? (
                <>
                  <span className="animate-spin">⏳</span> Composing Document...
                </>
              ) : (
                <>
                  <span>✨</span> Generate & Download {format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
