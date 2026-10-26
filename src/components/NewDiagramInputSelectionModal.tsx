'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  X,
  ArrowRight,
  Check,
  FileCode2,
  Upload,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Search,
  Plus,
  FileUp,
  LayoutGrid
} from 'lucide-react';
import { CANONICAL_TEMPLATES, CanonicalTemplate } from '@/lib/canonical/canonicalTemplates';
import { useTheme } from '@/lib/themeContext';

export interface NewDiagramSelectionResult {
  mode: 'prompt' | 'blueprint' | 'vision' | 'blank' | 'import_xml';
  prompt?: string;
  cloudProvider?: 'gcp' | 'azure' | 'aws' | 'multicloud';
  style?: 'technical' | 'infographic' | 'conceptual' | 'paper';
  blueprintId?: string;
  blueprintTitle?: string;
  customXml?: string;
  projectName?: string;
  sourceImageBase64?: string;
}

interface NewDiagramInputSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (result: NewDiagramSelectionResult) => void;
  isLight?: boolean;
}

const STARTER_PROMPT_SUGGESTIONS = [
  {
    title: 'Teradata → BigQuery & H2O.ai → Vertex AI Migration',
    prompt: 'Technical architecture of Teradata migration to BigQuery and H2O.ai migration to Vertex AI with Cloud Interconnect, Batch SQL Translator, BigLake, H2O MOJO Importer, Feature Store, and Dataplex governance.',
    provider: 'gcp' as const,
    style: 'technical' as const
  },
  {
    title: 'Multi-Tenant Agentic AI Hub & Spoke (#78)',
    prompt: 'Design an Official Google Cloud Architecture Center Hub-and-Spoke (#78) multi-tenant agentic AI platform with Cloud Armor, Model Armor, IAP OBO+DPoP, Vertex AI Agent Engine, MCP servers, and AlloyDB RLS.',
    provider: 'gcp' as const,
    style: 'technical' as const
  },
  {
    title: 'FinTech Real-Time Payments (Spanner + GKE)',
    prompt: 'Design an enterprise real-time payment processing platform on Google Cloud with Cloud Spanner nam3 multi-region, GKE Autopilot, Pub/Sub event streaming, Cloud HSM CMEK, and Zero-Trust VPC-SC.',
    provider: 'gcp' as const,
    style: 'technical' as const
  },
  {
    title: 'Oracle Exadata Database@Google Cloud',
    prompt: 'Architect an Oracle E-Business Suite (EBS) and Exadata Database@Google Cloud Split-VPC topology with Partner Interconnect, Active/Active WebLogic, Data Guard Standby, and BigQuery analytics.',
    provider: 'gcp' as const,
    style: 'technical' as const
  }
];

const ZERO_TYPING_ARCHITECT_DEPARTMENTS = [
  {
    id: 'domain',
    label: '1. Industry Domain',
    options: [
      { id: 'FinTech & Real-Time Payments', snippet: 'for a PCI-DSS Level 1 FinTech real-time payments platform' },
      { id: 'Healthcare & HIPAA Clinical FHIR', snippet: 'for a HIPAA-compliant clinical FHIR R4 & genomics lakehouse' },
      { id: 'NASA Aerospace & Orbital TT&C', snippet: 'for a NASA CCSDS 133.0-B orbital satellite TT&C and counterfactual digital-twin mission control system' },
      { id: 'Multi-Tenant SaaS & Retail', snippet: 'for a global omnichannel retail & multi-tenant B2B SaaS platform' },
    ],
  },
  {
    id: 'topology',
    label: '2. Topology Archetype',
    options: [
      { id: 'Official #78 Hub & Spoke', snippet: 'using Official Google Cloud Architecture Center Hub-and-Spoke (#78) topology with Routing Hub, Governance Hub, and Left/Right Spokes' },
      { id: '7-Tier Enterprise Mesh (#00)', snippet: 'structured across 7 enterprise security & runtime zones with Global Front-Door, GKE Autopilot, and DR failover' },
      { id: 'Closed-Loop 1:3 Digital Twin', snippet: 'with a closed-loop 100Hz telemetry feedback loop and 1:3 parallel Monte Carlo simulation lanes' },
      { id: 'Oracle@Google Exadata Split-VPC', snippet: 'integrating Oracle Exadata X10M Database@Google Cloud across Partner Interconnect and Client/Backup subnets' },
    ],
  },
  {
    id: 'data',
    label: '3. Data & Storage Tier',
    options: [
      { id: 'Cloud Spanner + BigQuery', snippet: 'backed by Cloud Spanner nam3 multi-region TrueTime consistency, Pub/Sub CDC, and BigQuery Iceberg Lakehouse' },
      { id: 'AlloyDB + Vertex Vector Search', snippet: 'backed by AlloyDB PostgreSQL with ScaNN vector index and Vertex AI Vector Search (gemini-embedding-2)' },
      { id: 'Firestore + Memorystore Redis', snippet: 'backed by Firestore low-latency document state and Memorystore Redis Cluster sub-millisecond cache' },
    ],
  },
  {
    id: 'security',
    label: '4. Security & AI Runtime',
    options: [
      { id: 'Model Armor + VPC-SC + CMEK', snippet: 'protected by Cloud Armor WAF, IAP Zero-Trust, VPC Service Controls, Cloud KMS HSM CMEK, and Model Armor Guardrails orchestrating Gemini 4 Argon & 3.8 Flash ADK/A2A agents' },
      { id: 'Assured Workloads FedRAMP High', snippet: 'enforcing Assured Workloads FedRAMP High / ITAR sovereignty, Secret Manager rotation, and Cloud Audit Logs' },
    ],
  },
];

export function NewDiagramInputSelectionModal({
  isOpen,
  onClose,
  onSelectOption,
  isLight: propIsLight
}: NewDiagramInputSelectionModalProps) {
  const { theme } = useTheme();
  const isLight = propIsLight !== undefined ? propIsLight : theme === 'light';

  const [activeTab, setActiveTab] = useState<'prompt' | 'blueprint' | 'vision' | 'blank' | 'import'>('prompt');

  // Drawer Width State (Slim 640px vs Wide 880px so live canvas remains visible)
  const [isExpandedWide, setIsExpandedWide] = useState(false);

  // Prompt Mode State
  const [promptText, setPromptText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'gcp' | 'azure' | 'aws' | 'multicloud'>('gcp');
  const [selectedStyle, setSelectedStyle] = useState<'technical' | 'infographic' | 'conceptual' | 'paper'>('technical');
  // Honest initial state: empty object when prompt is empty (no false blue active pills)
  const [directorSelections, setDirectorSelections] = useState<Record<string, number>>({});

  // Blueprint Mode State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('78');

  // Vision Decompile Mode State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [visionProjectName, setVisionProjectName] = useState<string>('');
  const [isDecompiling, setIsDecompiling] = useState<boolean>(false);
  const [decompileStatus, setDecompileStatus] = useState<string>('');

  // Blank Canvas Mode State
  const [blankCanvasTitle, setBlankCanvasTitle] = useState('New Architecture Canvas');

  // Import XML Mode State
  const [pastedXml, setPastedXml] = useState('');
  const [importTitle, setImportTitle] = useState('Imported Draw.io Diagram');

  // Filtered blueprints
  const filteredBlueprints = useMemo(() => {
    let list = CANONICAL_TEMPLATES;
    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.family === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.primaryPurpose.toLowerCase().includes(q) ||
          (t.examples && t.examples.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handlePromptChange = (val: string) => {
    setPromptText(val);
    const low = val.toLowerCase();
    if (/\b(gcp|google|bigquery|big\s*query|vertex|vertx|vertxai|spanner|alloydb|gke|dataplex|teradata|h2o|h20|cloud\s+run|pub\/?sub)\b/i.test(low)) {
      setSelectedProvider('gcp');
    }
  };

  const handleApplySuggestion = (sug: typeof STARTER_PROMPT_SUGGESTIONS[0]) => {
    setPromptText(sug.prompt);
    setSelectedProvider(sug.provider);
    setSelectedStyle(sug.style);
  };

  const composeDirectorPrompt = (nextSelections: Record<string, number>) => {
    const activeEntries = ZERO_TYPING_ARCHITECT_DEPARTMENTS.filter(
      (dept) => nextSelections[dept.id] !== undefined
    );
    if (activeEntries.length === 0) {
      return;
    }
    const parts = activeEntries.map((dept) => {
      const idx = nextSelections[dept.id] ?? 0;
      return dept.options[idx]?.snippet || dept.options[0].snippet;
    });
    setPromptText(`Architect a production Google Cloud topology ${parts.join(', ')}.`);
    setSelectedProvider('gcp');
  };

  const handleDirectorSelect = (deptId: string, optionIdx: number) => {
    const next = { ...directorSelections };
    if (next[deptId] === optionIdx) {
      delete next[deptId];
    } else {
      next[deptId] = optionIdx;
    }
    setDirectorSelections(next);
    composeDirectorPrompt(next);
  };

  const handleRandomizeDirector = () => {
    const next: Record<string, number> = {};
    for (const dept of ZERO_TYPING_ARCHITECT_DEPARTMENTS) {
      next[dept.id] = Math.floor(Math.random() * dept.options.length);
    }
    setDirectorSelections(next);
    composeDirectorPrompt(next);
  };

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onSelectOption({
      mode: 'prompt',
      prompt: promptText.trim(),
      cloudProvider: selectedProvider,
      style: selectedStyle,
      projectName: promptText.slice(0, 48).trim()
    });
  };

  const handleBlueprintSubmit = (bp: CanonicalTemplate) => {
    onSelectOption({
      mode: 'blueprint',
      blueprintId: bp.id,
      blueprintTitle: bp.name
    });
  };

  const handleFileSelect = (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);
    setVisionProjectName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDecompileAndOpen = async () => {
    if (!uploadedImageBase64) return;
    setIsDecompiling(true);
    setDecompileStatus('Gemini 3.1 Pro & 3.8 Flash Vision is decompiling architectural nodes, tiers & flows...');

    try {
      const res = await fetch('/api/decompile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImageBase64,
          projectName: visionProjectName.trim() || uploadedFileName.replace(/\.[^/.]+$/, '') || 'Decompiled Architecture',
          useCaseName: 'Architecture Vision Blueprint Extraction'
        })
      });

      const data = await res.json();
      if (data.success && data.xml) {
        setDecompileStatus('Decompilation complete! Initializing canvas...');
        onSelectOption({
          mode: 'vision',
          projectName: visionProjectName.trim() || 'Decompiled Architecture',
          customXml: data.xml,
          sourceImageBase64: uploadedImageBase64
        });
      } else {
        throw new Error(data.error || 'Decompilation failed.');
      }
    } catch (err: any) {
      setDecompileStatus(`Error: ${err.message || 'Failed to decompile image'}`);
    } finally {
      setIsDecompiling(false);
    }
  };

  const handleBlankCanvasSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSelectOption({
      mode: 'blank',
      projectName: blankCanvasTitle.trim() || 'New Blank Canvas'
    });
  };

  const handleImportXmlSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pastedXml.trim()) return;
    onSelectOption({
      mode: 'import_xml',
      projectName: importTitle.trim() || 'Imported Diagram',
      customXml: pastedXml.trim()
    });
  };

  const inactiveTabClass = isLight
    ? 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90'
    : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700';

  const inputClass = isLight
    ? 'w-full bg-white border border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition font-medium'
    : 'w-full bg-slate-950 border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition font-medium';

  const cancelBtnClass = isLight
    ? 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition cursor-pointer'
    : 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer';

  const activeDirectorCount = Object.keys(directorSelections).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-diagram-modal-title"
      data-testid="new-diagram-drawer-backdrop"
      className={`fixed inset-0 z-[140] flex justify-end animate-in fade-in duration-150 ${
        isLight ? 'bg-slate-900/15' : 'bg-slate-950/45'
      }`}
      onClick={onClose}
    >
      <div
        data-testid="new-diagram-docked-drawer"
        className={`relative h-full w-full ${
          isExpandedWide ? 'max-w-[860px]' : 'max-w-[640px]'
        } border-l shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* DRAWER HEADER */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between shrink-0 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="new-diagram-modal-title"
                  className={`text-sm font-extrabold tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}
                >
                  New Google Cloud Architecture Diagram
                </h2>
                <span
                  className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isLight
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                  }`}
                >
                  OFFICIAL #78 STANDARD
                </span>
              </div>
              <p className={`text-[11px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Describe your use case, pick a certified blueprint, or upload an image
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsExpandedWide(!isExpandedWide)}
              data-testid="new-diagram-drawer-width-toggle"
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title={isExpandedWide ? 'Dock to compact 640px drawer' : 'Expand drawer to 860px wide'}
            >
              {isExpandedWide ? '⇥ Compact' : '⇤ Expand'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close new diagram dialog"
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-COLUMN EQUAL-WIDTH SEGMENTED TAB GRID (ZERO HORIZONTAL OVERFLOW) */}
        <div
          data-testid="new-diagram-segmented-tabs"
          className={`px-5 py-2.5 border-b grid grid-cols-5 gap-1.5 shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/80' : 'border-slate-800/80 bg-slate-950/30'
          }`}
        >
          <button
            type="button"
            data-testid="new-diagram-tab-prompt"
            onClick={() => setActiveTab('prompt')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'prompt'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                : inactiveTabClass
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'prompt' ? 'text-sky-200' : 'text-sky-500'}`} />
            <span className="truncate">AI Prompt</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'blueprint'
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                : inactiveTabClass
            }`}
          >
            <LayoutGrid className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'blueprint' ? 'text-amber-100' : 'text-amber-500'}`} />
            <span className="truncate">{CANONICAL_TEMPLATES.length} Blueprints</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-vision"
            onClick={() => setActiveTab('vision')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'vision'
                ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                : inactiveTabClass
            }`}
          >
            <ImageIcon className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'vision' ? 'text-teal-200' : 'text-teal-500'}`} />
            <span className="truncate">Vision AI</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-blank"
            onClick={() => setActiveTab('blank')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'blank'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : inactiveTabClass
            }`}
          >
            <FileCode2 className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'blank' ? 'text-indigo-200' : 'text-indigo-500'}`} />
            <span className="truncate">Blank Canvas</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-import"
            onClick={() => setActiveTab('import')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'import'
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                : inactiveTabClass
            }`}
          >
            <FileUp className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'import' ? 'text-purple-200' : 'text-purple-500'}`} />
            <span className="truncate">Import XML</span>
          </button>
        </div>

        {/* DRAWER BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* TAB 1: PROMPT TO ARCHITECTURE (CLEAN, FOCUSED 2-STEP FLOW) */}
          {activeTab === 'prompt' && (
            <form id="new-diagram-prompt-form" onSubmit={handlePromptSubmit} className="space-y-4">
              {/* 1. PRIMARY INPUT AT TOP: Natural Language Prompt Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="new-diagram-prompt-textarea"
                    className={`text-xs font-extrabold flex items-center gap-1.5 ${
                      isLight ? 'text-slate-900' : 'text-slate-100'
                    }`}
                  >
                    <span>1. What Architecture Do You Want to Build or Migrate?</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      data-testid="prompt-readiness-badge"
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        promptText.trim()
                          ? isLight
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : isLight
                          ? 'bg-slate-100 text-slate-500 border-slate-200'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {promptText.trim() ? '🟢 Ready to Synthesize (#78 GCP Standard)' : 'Type below or click an example'}
                    </span>
                    {promptText.trim() && (
                      <button
                        type="button"
                        onClick={() => {
                          setPromptText('');
                          setDirectorSelections({});
                          setSelectedProvider('gcp');
                          setSelectedStyle('technical');
                        }}
                        className={`text-[10px] font-bold hover:underline cursor-pointer ${
                          isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  id="new-diagram-prompt-textarea"
                  data-testid="new-diagram-prompt-textarea"
                  rows={4}
                  required
                  value={promptText}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  placeholder="e.g. Technical architecture of Teradata migration to BigQuery and H2O.ai migration to Vertex AI with Cloud Interconnect, Batch SQL Translator, BigLake, and Dataplex governance..."
                  className={`w-full border focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-2xl p-3.5 text-xs outline-none transition leading-relaxed resize-none font-medium ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-2xs'
                      : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                  }`}
                />

                {/* 1-Click Enterprise Architecture Examples */}
                <div className="mt-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    ⚡ 1-Click Enterprise Examples:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {STARTER_PROMPT_SUGGESTIONS.map((sug, idx) => {
                      const isApplied = promptText === sug.prompt;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleApplySuggestion(sug)}
                          className={`px-3 py-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-left flex items-center justify-between gap-1.5 ${
                            isApplied
                              ? isLight
                                ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-2xs'
                                : 'bg-sky-500/25 border-sky-400 text-sky-200'
                              : isLight
                              ? 'bg-slate-50 hover:bg-sky-50/70 border-slate-200 hover:border-sky-300 text-slate-700'
                              : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="truncate">{sug.title}</span>
                          <ArrowRight className="w-3 h-3 shrink-0 opacity-60" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. COMPACT 1-ROW SEGMENTED STRIPS: Cloud Provider & Diagram Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className={`block text-[11px] font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    2. Cloud Ecosystem (Default: GCP)
                  </label>
                  <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl border ${isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    {[
                      { id: 'gcp', label: 'GCP' },
                      { id: 'multicloud', label: 'Hybrid' },
                      { id: 'aws', label: 'AWS' },
                      { id: 'azure', label: 'Azure' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProvider(p.id as any)}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-bold text-center transition cursor-pointer truncate ${
                          selectedProvider === p.id
                            ? isLight
                              ? 'bg-white text-sky-800 shadow-xs border border-sky-400'
                              : 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                            : isLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-[11px] font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    3. Architecture Standard
                  </label>
                  <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl border ${isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    {[
                      { id: 'technical', label: 'GCP #78' },
                      { id: 'infographic', label: 'Executive' },
                      { id: 'conceptual', label: 'Flow' },
                      { id: 'paper', label: 'Sketch' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStyle(s.id as any)}
                        className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold text-center transition cursor-pointer truncate ${
                          selectedStyle === s.id
                            ? isLight
                              ? 'bg-white text-indigo-800 shadow-xs border border-indigo-400'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                            : isLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Optional Collapsible Guided L400 Builder (Collapsed by default to eliminate clutter) */}
              <details
                data-testid="zero-typing-architecture-director"
                className={`rounded-2xl border overflow-hidden ${
                  isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <summary className="px-3.5 py-2.5 cursor-pointer flex items-center justify-between gap-2 select-none">
                  <span
                    className={`text-[11px] font-bold truncate ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    🎛️ Optional: Guided L400 Prompt Builder ({activeDirectorCount}/4 Selected) ▾
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRandomizeDirector();
                    }}
                    data-testid="zero-typing-randomize-btn"
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer shrink-0 whitespace-nowrap ${
                      isLight
                        ? 'bg-white hover:bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-sky-300 border-slate-700'
                    }`}
                  >
                    🎲 Auto-Compose L400 Prompt
                  </button>
                </summary>
                <div className="px-3.5 pb-3.5 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-slate-200/70">
                  {ZERO_TYPING_ARCHITECT_DEPARTMENTS.map((dept) => (
                    <div key={dept.id} className="space-y-1">
                      <span className={`text-[10px] font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {dept.label}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {dept.options.map((opt, idx) => {
                          const active = directorSelections[dept.id] === idx;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleDirectorSelect(dept.id, idx)}
                              className={`px-2 py-1 rounded-lg text-[10.5px] font-semibold border transition cursor-pointer ${
                                active
                                  ? isLight
                                    ? 'bg-sky-100 border-sky-400 text-sky-900 shadow-2xs'
                                    : 'bg-sky-500/20 border-sky-500/60 text-sky-300'
                                  : isLight
                                  ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {opt.id}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </form>
          )}

          {/* TAB 2: CERTIFIED BLUEPRINT CATALOG */}
          {activeTab === 'blueprint' && (
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${CANONICAL_TEMPLATES.length} certified reference architectures...`}
                    className={`w-full border rounded-xl pl-9 pr-3.5 py-2 text-xs outline-none focus:border-sky-500 font-medium ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-1 shrink-0 flex-wrap w-full sm:w-auto">
                  {['all', 'Reference Architectures', 'Infographic', 'Flow'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setSelectedCategory(f)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition shrink-0 cursor-pointer ${
                        selectedCategory === f
                          ? isLight
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 hover:text-slate-900'
                          : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {f === 'all' ? `All (${CANONICAL_TEMPLATES.length})` : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprints Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-1">
                {filteredBlueprints.map((bp) => {
                  const isSelected = selectedBlueprintId === bp.id;
                  return (
                    <div
                      key={bp.id}
                      onClick={() => setSelectedBlueprintId(bp.id)}
                      className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-amber-50 border-amber-400 shadow-sm'
                            : 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                          : isLight
                          ? 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              isLight
                                ? 'bg-white text-amber-800 border-amber-200'
                                : 'bg-slate-800 text-amber-300 border-slate-700'
                            }`}
                          >
                            #{bp.id} • {bp.family}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <h4 className={`text-xs font-bold mb-1 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {bp.name}
                        </h4>
                        <p className={`text-[11px] line-clamp-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {bp.primaryPurpose}
                        </p>
                      </div>

                      <div
                        className={`mt-2.5 pt-2 border-t flex items-center justify-between ${
                          isLight ? 'border-slate-200' : 'border-slate-800/60'
                        }`}
                      >
                        <span className={`text-[10px] truncate max-w-[140px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {bp.examples || 'Enterprise Cloud Topology'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlueprintSubmit(bp);
                          }}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition border flex items-center gap-1 cursor-pointer ${
                            isLight
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                              : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          <span>Load Diagram</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: IMAGE TO DIAGRAM (VISION AI) */}
          {activeTab === 'vision' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileSelect(f);
                }}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleFileSelect(f);
                }}
                className={`p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
                  uploadedImageBase64
                    ? isLight
                      ? 'border-teal-500 bg-teal-50/50'
                      : 'border-teal-500/80 bg-teal-950/20'
                    : isLight
                    ? 'border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/30'
                    : 'border-slate-700 hover:border-teal-500 bg-slate-950/40 hover:bg-teal-950/10'
                }`}
              >
                {uploadedImageBase64 ? (
                  <div className="flex flex-col items-center gap-2.5">
                    <img
                      src={uploadedImageBase64}
                      alt="Uploaded Diagram Preview"
                      className="max-h-44 object-contain rounded-xl border border-teal-500/40 shadow-lg"
                    />
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
                        {uploadedFileName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">(Click to change)</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                        isLight
                          ? 'bg-teal-50 border-teal-200 text-teal-600'
                          : 'bg-teal-500/10 border-teal-500/30 text-teal-400'
                      }`}
                    >
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Drop architecture screenshot, diagram PNG, or whiteboard photo here
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Supports PNG, JPG, WEBP, SVG • Analyzed with Gemini 3.8 Flash Vision
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Diagram Title (Optional)
                </label>
                <input
                  type="text"
                  value={visionProjectName}
                  onChange={(e) => setVisionProjectName(e.target.value)}
                  placeholder="e.g. Decompiled Cloud Infrastructure Topology"
                  className={inputClass}
                />
              </div>

              {decompileStatus && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  {isDecompiling && <Loader2 className="w-4 h-4 animate-spin text-teal-500 shrink-0" />}
                  <span
                    className={
                      decompileStatus.startsWith('Error')
                        ? 'text-red-500 font-medium'
                        : isLight
                        ? 'text-teal-700 font-medium'
                        : 'text-teal-300 font-medium'
                    }
                  >
                    {decompileStatus}
                  </span>
                </div>
              )}

              <div className="pt-1">
                <Link
                  href="/vision"
                  onClick={onClose}
                  className={`text-xs inline-flex items-center gap-1 font-semibold hover:underline ${
                    isLight ? 'text-teal-700 hover:text-teal-800' : 'text-teal-400 hover:text-teal-300'
                  }`}
                >
                  <span>Open Full Side-by-Side Vision Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 4: BLANK CANVAS */}
          {activeTab === 'blank' && (
            <form id="new-diagram-blank-form" onSubmit={handleBlankCanvasSubmit} className="space-y-5">
              <div
                className={`p-6 rounded-2xl border text-center space-y-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto ${
                    isLight
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                  }`}
                >
                  <FileCode2 className="w-7 h-7" />
                </div>
                <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Start with a Fresh, Empty Canvas
                </h3>
                <p className={`text-xs max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Initializes a clean slate 16:9 canvas with zero pre-loaded components. You can add components with the AI prompt composer or use Draw.io vector tools.
                </p>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Canvas Name
                </label>
                <input
                  type="text"
                  required
                  value={blankCanvasTitle}
                  onChange={(e) => setBlankCanvasTitle(e.target.value)}
                  placeholder="e.g. Multi-Cloud Event Mesh"
                  className={inputClass}
                />
              </div>
            </form>
          )}

          {/* TAB 5: IMPORT XML */}
          {activeTab === 'import' && (
            <form id="new-diagram-import-form" onSubmit={handleImportXmlSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Diagram Title
                </label>
                <input
                  type="text"
                  value={importTitle}
                  onChange={(e) => setImportTitle(e.target.value)}
                  placeholder="e.g. Imported Enterprise Architecture"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Paste Draw.io XML or MxGraph Code
                </label>
                <textarea
                  rows={8}
                  required
                  value={pastedXml}
                  onChange={(e) => setPastedXml(e.target.value)}
                  placeholder="<mxGraphModel>...</mxGraphModel>"
                  className={`w-full border font-mono text-[11px] p-3 rounded-xl focus:border-purple-500 outline-none transition resize-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                      : 'bg-slate-950 border-slate-700 text-slate-200 placeholder-slate-500'
                  }`}
                />
              </div>
            </form>
          )}
        </div>

        {/* STICKY BOTTOM FOOTER: PRIMARY CTA ALWAYS VISIBLE ABOVE THE FOLD */}
        <div
          data-testid="new-diagram-sticky-footer"
          className={`px-5 py-3.5 border-t flex items-center justify-between gap-3 shrink-0 ${
            isLight ? 'bg-slate-50/95 border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          <div className="min-w-0">
            {activeTab === 'prompt' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {promptText.trim()
                  ? `${promptText.trim().length} chars • ${selectedProvider.toUpperCase()} • ${selectedStyle}`
                  : 'Tap a preset or type a prompt above'}
              </span>
            )}
            {activeTab === 'blueprint' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Showing {filteredBlueprints.length} of {CANONICAL_TEMPLATES.length} Certified Blueprints
              </span>
            )}
            {activeTab === 'vision' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {uploadedFileName ? `Ready: ${uploadedFileName}` : 'Upload PNG/JPG/SVG to decompile'}
              </span>
            )}
            {activeTab === 'blank' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                16:9 Vector Canvas • 0 pre-loaded nodes
              </span>
            )}
            {activeTab === 'import' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {pastedXml.trim() ? `${pastedXml.trim().length} bytes XML ready` : 'Paste <mxGraphModel> XML above'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button type="button" onClick={onClose} className={cancelBtnClass}>
              Cancel
            </button>

            {activeTab === 'prompt' && (
              <button
                type="button"
                onClick={() => handlePromptSubmit()}
                disabled={!promptText.trim()}
                data-testid="new-diagram-synthesize-submit-btn"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-md shadow-sky-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesize Architecture Diagram →</span>
              </button>
            )}

            {activeTab === 'blueprint' && (
              <button
                type="button"
                onClick={() => {
                  const bp = CANONICAL_TEMPLATES.find((t) => t.id === selectedBlueprintId);
                  if (bp) handleBlueprintSubmit(bp);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Load Blueprint #{selectedBlueprintId} →</span>
              </button>
            )}

            {activeTab === 'vision' && (
              <button
                type="button"
                disabled={!uploadedImageBase64 || isDecompiling}
                onClick={handleDecompileAndOpen}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-md shadow-teal-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                {isDecompiling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Decompiling Blueprint...</span>
                  </>
                ) : (
                  <span>Decompile &amp; Open Canvas →</span>
                )}
              </button>
            )}

            {activeTab === 'blank' && (
              <button
                type="button"
                onClick={() => handleBlankCanvasSubmit()}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Create Blank Canvas →</span>
              </button>
            )}

            {activeTab === 'import' && (
              <button
                type="button"
                disabled={!pastedXml.trim()}
                onClick={() => handleImportXmlSubmit()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-md shadow-purple-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Load Imported XML →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
