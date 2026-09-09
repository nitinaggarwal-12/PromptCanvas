'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Layers,
  Workflow,
  Upload,
  Image as ImageIcon,
  Check,
  Loader2,
  Search,
  ShieldCheck,
  Database,
  Cpu,
  ArrowRight,
  Sliders,
  Filter,
  Eye,
  FileCode2,
} from 'lucide-react';
import {
  CANONICAL_TEMPLATES,
  injectDomainFlavorXml,
  CanonicalTemplate,
} from '@/lib/canonical/canonicalTemplates';
import { getTechnicalArchitectureXml } from '@/lib/technicalArchitectureXmls';
import { MERCK_GOOGLE_GE_ESCALATION_XML } from '@/lib/merckEscalationXmlClient';

export interface InsertDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertDiagram: (diagram: {
    title: string;
    type: 'blueprint' | 'flowchart' | 'vision';
    xml: string;
    templateId?: string;
    summary?: string;
  }) => void;
  isLight: boolean;
  selectedDomain?: string;
  targetChapterTitle?: string;
}

const FLOWCHART_PRESETS = [
  {
    id: 'merck_ge_escalation',
    name: 'Integrated Partnership Escalation & Decision Points',
    subtitle: 'Merck | Google | GE (Operational Break-Fix & Strategic Roadmap)',
    tag: 'Operational Swimlane',
    icon: Workflow,
    color: 'from-teal-600 to-emerald-600',
    getXml: () => MERCK_GOOGLE_GE_ESCALATION_XML,
  },
  {
    id: 'bpmn_orchestration',
    name: 'BPMN 2.0 Business Process & Gateway Orchestration',
    subtitle: 'Standard BPMN workflow with parallel forks and XOR decision gates',
    tag: 'BPMN Standard',
    icon: Workflow,
    color: 'from-blue-600 to-indigo-600',
    getXml: () => getTechnicalArchitectureXml('bpmn'),
  },
  {
    id: 'incident_triage',
    name: 'SRE & DevOps Incident Triage Swimlane',
    subtitle: 'P1/P2/P3 severity matrix, automated alerts, and on-call escalation',
    tag: 'Incident Management',
    icon: ShieldCheck,
    color: 'from-red-600 to-amber-600',
    getXml: () => getTechnicalArchitectureXml('incident_triage_swimlane'),
  },
  {
    id: 'agent_approval',
    name: 'Human-in-the-Loop AI Agent Approval & Governance',
    subtitle: 'Dual-custody verification, safety screening, and e-signatures',
    tag: 'AI Governance',
    icon: Cpu,
    color: 'from-purple-600 to-pink-600',
    getXml: () => getTechnicalArchitectureXml('approval_workflow'),
  },
  {
    id: 'as_is_to_be',
    name: 'AS-IS vs. TO-BE Process Modernization Matrix',
    subtitle: 'Legacy baseline architecture vs. automated target cloud state',
    tag: 'Transformation',
    icon: Database,
    color: 'from-emerald-600 to-teal-600',
    getXml: () => getTechnicalArchitectureXml('p5-gov-l-06'),
  },
];

const BLUEPRINT_FILTERS = [
  { id: 'all', label: 'All 50' },
  { id: 'cloud', label: 'Cloud & Network' },
  { id: 'data', label: 'Data & Warehouse' },
  { id: 'ai', label: 'Vertex & GenAI' },
  { id: 'security', label: 'Zero-Trust & Security' },
];

export function InsertDiagramModal({
  isOpen,
  onClose,
  onInsertDiagram,
  isLight,
  selectedDomain = 'biopharma',
  targetChapterTitle,
}: InsertDiagramModalProps) {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'flowchart' | 'vision'>('blueprint');

  // Blueprint Tab State
  const [blueprintSearch, setBlueprintSearch] = useState('');
  const [blueprintFilter, setBlueprintFilter] = useState('all');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState('01');

  // Flowchart Tab State
  const [selectedFlowchartId, setSelectedFlowchartId] = useState('merck_ge_escalation');

  // Vision Decompiler State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDecompiling, setIsDecompiling] = useState(false);
  const [decompiledXml, setDecompiledXml] = useState<string | null>(null);
  const [decompiledSummary, setDecompiledSummary] = useState<string | null>(null);
  const [decompileZones, setDecompileZones] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter blueprints
  const filteredBlueprints = CANONICAL_TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.name.toLowerCase().includes(blueprintSearch.toLowerCase()) ||
      tpl.id.includes(blueprintSearch);
    if (!matchesSearch) return false;
    if (blueprintFilter === 'cloud') {
      return ['01', '06', '07', '08', '14', '15', '16', '38', '46'].includes(tpl.id);
    }
    if (blueprintFilter === 'data') {
      return ['02', '03', '05', '10', '11', '13', '18', '20'].includes(tpl.id);
    }
    if (blueprintFilter === 'ai') {
      return ['04', '09', '21', '22', '23', '24', '25', '26'].includes(tpl.id);
    }
    if (blueprintFilter === 'security') {
      return ['00', '12', '17', '19', '27', '28', '29', '30'].includes(tpl.id);
    }
    return true;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result as string;
      setUploadedBase64(b64);
    };
    reader.readAsDataURL(file);
  };

  const handleRunDecompiler = async () => {
    if (!uploadedBase64) return;
    setIsDecompiling(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/decompile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedBase64,
          mimeType: uploadedFileName.endsWith('.pdf') ? 'application/pdf' : 'image/png',
          projectName: 'DocGen Decompiled Diagram',
          useCaseName: targetChapterTitle || 'Living Spec Decompilation',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to decompile image.');
      }

      setDecompiledXml(data.xml);
      setDecompiledSummary(data.summary || '100% Verbatim visual extraction complete.');
      setDecompileZones(data.extractedZones || []);
    } catch (err: any) {
      setErrorMsg(err.message || 'Decompilation encountered an error.');
    } finally {
      setIsDecompiling(false);
    }
  };

  const handleConfirmInsert = () => {
    if (activeTab === 'blueprint') {
      const tpl = CANONICAL_TEMPLATES.find((t) => t.id === selectedBlueprintId) || CANONICAL_TEMPLATES[0];
      const flavoredXml = tpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');
      onInsertDiagram({
        title: tpl.name,
        type: 'blueprint',
        xml: flavoredXml,
        templateId: tpl.id,
        summary: `Canonical Blueprint #${tpl.id} (${tpl.name}) injected into document.`,
      });
      onClose();
    } else if (activeTab === 'flowchart') {
      const flow = FLOWCHART_PRESETS.find((f) => f.id === selectedFlowchartId) || FLOWCHART_PRESETS[0];
      const xml = flow.getXml();
      onInsertDiagram({
        title: flow.name,
        type: 'flowchart',
        xml,
        templateId: flow.id,
        summary: `${flow.tag}: ${flow.subtitle}`,
      });
      onClose();
    } else if (activeTab === 'vision') {
      if (!decompiledXml) return;
      onInsertDiagram({
        title: uploadedFileName.replace(/\.[^/.]+$/, '') || 'Decompiled Architecture Diagram',
        type: 'vision',
        xml: decompiledXml,
        summary: decompiledSummary || 'Decompiled from raster artifact with verbatim fidelity.',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B111E] border-slate-800 text-white'
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight">
                Insert Architecture Diagram into Document
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {targetChapterTitle
                  ? `Target: ${targetChapterTitle}`
                  : 'Enrich your living specification with interactive vector visuals'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Authoring Modalities Tab Switcher */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/80">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition ${
                activeTab === 'blueprint'
                  ? 'bg-white dark:bg-slate-950 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Blueprint Templates (50)</span>
            </button>

            <button
              onClick={() => setActiveTab('flowchart')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition ${
                activeTab === 'flowchart'
                  ? 'bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>2. Flowcharts &amp; Swimlanes</span>
            </button>

            <button
              onClick={() => setActiveTab('vision')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition ${
                activeTab === 'vision'
                  ? 'bg-white dark:bg-slate-950 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>3. Vision AI Decompiler</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: BLUEPRINT TEMPLATES */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search 50 blueprints..."
                    value={blueprintSearch}
                    onChange={(e) => setBlueprintSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {BLUEPRINT_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setBlueprintFilter(f.id)}
                      className={`px-2.5 py-1 text-[11px] rounded-md font-bold transition shrink-0 ${
                        blueprintFilter === f.id
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredBlueprints.map((t) => {
                  const isSelected = selectedBlueprintId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedBlueprintId(t.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-start gap-3 ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/40 dark:bg-sky-950/30 shadow-sm ring-1 ring-sky-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        #{t.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold truncate text-slate-900 dark:text-white">
                            {t.name}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-sky-600 shrink-0 ml-1" />}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {t.primaryPurpose}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FLOWCHARTS & SWIMLANES */}
          {activeTab === 'flowchart' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300">
                <span className="font-bold">Operational Workflow Presets:</span> Includes sharp
                90° geometric connectors, role-based RACI swimlanes, and sequential step badges
                (❶..❿).
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {FLOWCHART_PRESETS.map((f) => {
                  const isSelected = selectedFlowchartId === f.id;
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFlowchartId(f.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-start gap-3 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-sm ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${f.color} text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {f.tag}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          {f.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {f.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: VISION AI DECOMPILER */}
          {activeTab === 'vision' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-xs text-purple-800 dark:text-purple-300">
                <span className="font-bold">Multimodal Raster Decompiler:</span> Drag &amp; drop an
                existing architecture screenshot, whiteboard photo, or PDF. Gemini decomposes the
                spatial layout into Draw.io vector with 100% verbatim textual fidelity.
              </div>

              {!uploadedBase64 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500 transition bg-slate-50/50 dark:bg-slate-900/30"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-10 h-10 text-purple-500 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                    Upload Architecture Image or PDF
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Supports PNG, JPEG, WebP, or PDF exports up to 20MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">
                          {uploadedFileName}
                        </p>
                        <p className="text-[10px] text-slate-500">Ready for Multimodal Vision Decompilation</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedBase64(null);
                        setDecompiledXml(null);
                        setDecompiledSummary(null);
                      }}
                      className="text-xs font-bold text-slate-400 hover:text-red-500"
                    >
                      Change
                    </button>
                  </div>

                  {!decompiledXml ? (
                    <button
                      onClick={handleRunDecompiler}
                      disabled={isDecompiling}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-md disabled:opacity-50"
                    >
                      {isDecompiling ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Decompiling Spatial AST with Gemini Omni...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Decompile Image to Draw.io Vector</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Decompilation Successful!</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{decompiledSummary}</p>
                      {decompileZones.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {decompileZones.map((z, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px] font-mono font-bold"
                            >
                              {z}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {errorMsg && (
                    <p className="text-xs text-red-500 font-bold text-center">{errorMsg}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Selected Modality: <span className="font-bold capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmInsert}
              disabled={activeTab === 'vision' && !decompiledXml}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-black shadow-md hover:opacity-95 transition flex items-center gap-2 disabled:opacity-50"
            >
              <span>Insert Diagram into Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InsertDiagramModal;
