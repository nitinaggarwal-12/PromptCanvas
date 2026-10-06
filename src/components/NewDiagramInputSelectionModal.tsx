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
    title: 'FinTech Real-Time Payments Mesh',
    prompt: 'Design an enterprise real-time payment processing platform on Google Cloud with Cloud Spanner nam3 multi-region, Pub/Sub event streaming, Cloud HSM CMEK, Model Armor, and Zero-Trust VPC-SC.',
    provider: 'gcp' as const,
    style: 'technical' as const
  },
  {
    title: 'GenAI RAG Hub with Gemini & Vector Search',
    prompt: 'Build a production Agentic RAG and Knowledge Retrieval Hub with Vertex Vector Search (ScaNN), Gemini 2.5 Flash / Pro reasoning engine, Document AI ingestion, and Model Armor guardrails.',
    provider: 'gcp' as const,
    style: 'technical' as const
  },
  {
    title: 'Multi-Region Azure Kubernetes Mesh',
    prompt: 'Architect a high-availability Azure Application Landing Zone with Azure Front Door, AKS cluster across dual regions, Cosmos DB multi-master, and Azure Key Vault private endpoints.',
    provider: 'azure' as const,
    style: 'technical' as const
  },
  {
    title: 'Executive Cloud AI Transformation Infographic',
    prompt: 'Create an executive C-suite visual infographic showcasing multi-agent orchestration, enterprise data lakehouse governance, and business ROI across 4 transformation phases.',
    provider: 'multicloud' as const,
    style: 'infographic' as const
  }
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

  // Prompt Mode State
  const [promptText, setPromptText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'gcp' | 'azure' | 'aws' | 'multicloud'>('gcp');
  const [selectedStyle, setSelectedStyle] = useState<'technical' | 'infographic' | 'conceptual' | 'paper'>('technical');

  // Blueprint Mode State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');

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

  const handleApplySuggestion = (sug: typeof STARTER_PROMPT_SUGGESTIONS[0]) => {
    setPromptText(sug.prompt);
    setSelectedProvider(sug.provider);
    setSelectedStyle(sug.style);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setDecompileStatus('Gemini 2.5 Pro Vision is decompiling architectural nodes, tiers & flows...');

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

  const handleBlankCanvasSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectOption({
      mode: 'blank',
      projectName: blankCanvasTitle.trim() || 'New Blank Canvas'
    });
  };

  const handleImportXmlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedXml.trim()) return;
    onSelectOption({
      mode: 'import_xml',
      projectName: importTitle.trim() || 'Imported Diagram',
      customXml: pastedXml.trim()
    });
  };

  const inactiveTabClass = isLight
    ? 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
    : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800';

  const inputClass = isLight
    ? 'w-full bg-white border border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition font-medium'
    : 'w-full bg-slate-950 border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition font-medium';

  const cancelBtnClass = isLight
    ? 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer'
    : 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-diagram-modal-title"
      className={`fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200 ${
        isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="new-diagram-modal-title"
                  className={`text-base font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}
                >
                  Create New Architecture Diagram
                </h2>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                  }`}
                >
                  INPUT SELECTION
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Choose how you want to initiate your architecture canvas
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close new diagram dialog"
            className={`p-2 rounded-xl transition cursor-pointer ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INPUT SELECTION TABS */}
        <div
          className={`px-6 pt-3 pb-2 border-b flex items-center gap-2 overflow-x-auto shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/70' : 'border-slate-800/80 bg-slate-950/30'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'prompt'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : inactiveTabClass
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeTab === 'prompt' ? 'text-sky-200' : 'text-sky-500'}`} />
            <span>1. Prompt to Architecture (AI)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blueprint')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'blueprint'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : inactiveTabClass
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${activeTab === 'blueprint' ? 'text-amber-200' : 'text-amber-500'}`} />
            <span>2. 77 Certified Blueprints</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'vision'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : inactiveTabClass
            }`}
          >
            <ImageIcon className={`w-4 h-4 ${activeTab === 'vision' ? 'text-teal-200' : 'text-teal-500'}`} />
            <span>3. Image Decompile (Vision AI)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blank')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'blank'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : inactiveTabClass
            }`}
          >
            <FileCode2 className={`w-4 h-4 ${activeTab === 'blank' ? 'text-indigo-200' : 'text-indigo-500'}`} />
            <span>4. Blank Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'import'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : inactiveTabClass
            }`}
          >
            <FileUp className={`w-4 h-4 ${activeTab === 'import' ? 'text-purple-200' : 'text-purple-500'}`} />
            <span>5. Import XML</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PROMPT TO ARCHITECTURE */}
          {activeTab === 'prompt' && (
            <form onSubmit={handlePromptSubmit} className="space-y-5">
              {/* Quick suggestions */}
              <div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  ⚡ 1-Click Starter Prompts:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STARTER_PROMPT_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplySuggestion(sug)}
                      className={`text-left p-2.5 rounded-xl border transition group cursor-pointer ${
                        isLight
                          ? 'bg-slate-50 hover:bg-sky-50/60 border-slate-200 hover:border-sky-400 text-slate-800'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-sky-500/50 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isLight ? 'text-sky-700 group-hover:text-sky-800' : 'text-sky-400 group-hover:text-sky-300'}`}>
                          {sug.title}
                        </span>
                        <span
                          className={`text-[9.5px] uppercase font-mono px-1.5 py-0.5 rounded border ${
                            isLight
                              ? 'bg-white text-slate-600 border-slate-200'
                              : 'bg-slate-900 text-slate-400 border-slate-700'
                          }`}
                        >
                          {sug.provider}
                        </span>
                      </div>
                      <p className={`text-[11px] line-clamp-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {sug.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cloud Provider & Architectural Style selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Cloud Provider Ecosystem
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'gcp', label: 'Google Cloud' },
                      { id: 'azure', label: 'Microsoft Azure' },
                      { id: 'aws', label: 'AWS' },
                      { id: 'multicloud', label: 'Multi-Cloud / Hybrid' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProvider(p.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                          selectedProvider === p.id
                            ? isLight
                              ? 'bg-sky-50 border-sky-500 text-sky-800 shadow-2xs'
                              : 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-xs'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            : 'bg-slate-800/40 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Diagram Perspective &amp; Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'technical', label: 'Technical Components' },
                      { id: 'infographic', label: 'Executive Infographic' },
                      { id: 'conceptual', label: 'Conceptual Flow' },
                      { id: 'paper', label: 'Hand-Drawn Paper' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStyle(s.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                          selectedStyle === s.id
                            ? isLight
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-800 shadow-2xs'
                              : 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-xs'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            : 'bg-slate-800/40 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Natural Language Prompt Input */}
              <div>
                <label className={`block text-xs font-bold mb-1.5 flex items-center justify-between ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  <span>Describe Your Architecture Goals</span>
                  <span className={`text-[11px] font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Gemini 3.8 Flash AI Synthesis
                  </span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. Design a multi-region retail checkout system with Cloud Spanner dual-region nam3, Cloud Armor WAF, GKE autopilot, Pub/Sub order queue, and Gemini real-time fraud scoring..."
                  className={`w-full border focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-2xl p-3.5 text-xs outline-none transition leading-relaxed resize-none font-medium ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={onClose} className={cancelBtnClass}>
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!promptText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-lg shadow-sky-500/25 transition flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Architecture Diagram →</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CERTIFIED BLUEPRINT CATALOG */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 77 certified reference architectures..."
                    className={`w-full border rounded-xl pl-9 pr-3.5 py-2 text-xs outline-none focus:border-sky-500 font-medium ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto w-full sm:w-auto">
                  {['all', 'Reference Architectures', 'Infographic', 'Flow'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setSelectedCategory(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
                        selectedCategory === f
                          ? isLight
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 hover:text-slate-900'
                          : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {f === 'all' ? 'All (77)' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprints Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
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
                        <span className={`text-[10px] truncate max-w-[160px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
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

              {/* Action bar */}
              <div
                className={`pt-2 border-t flex items-center justify-between ${
                  isLight ? 'border-slate-200' : 'border-slate-800'
                }`}
              >
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Showing {filteredBlueprints.length} of 77 Reference Blueprints
                </span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={onClose} className={cancelBtnClass}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const bp = CANONICAL_TEMPLATES.find((t) => t.id === selectedBlueprintId);
                      if (bp) handleBlueprintSubmit(bp);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Load Selected Blueprint →</span>
                  </button>
                </div>
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
                        Supports PNG, JPG, WEBP, SVG • Analyzed with Gemini 2.5 Pro Vision
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

              <div
                className={`pt-2 border-t flex items-center justify-between ${
                  isLight ? 'border-slate-200' : 'border-slate-800'
                }`}
              >
                <Link
                  href="/vision"
                  onClick={onClose}
                  className={`text-xs flex items-center gap-1 font-semibold hover:underline ${
                    isLight ? 'text-teal-700 hover:text-teal-800' : 'text-teal-400 hover:text-teal-300'
                  }`}
                >
                  <span>Open Full Side-by-Side Vision Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-3">
                  <button type="button" onClick={onClose} className={cancelBtnClass}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!uploadedImageBase64 || isDecompiling}
                    onClick={handleDecompileAndOpen}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-teal-500/25 transition flex items-center gap-2 cursor-pointer"
                  >
                    {isDecompiling ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Decompiling Blueprint...</span>
                      </>
                    ) : (
                      <span>Decompile &amp; Open Canvas →</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLANK CANVAS */}
          {activeTab === 'blank' && (
            <form onSubmit={handleBlankCanvasSubmit} className="space-y-5">
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

              <div
                className={`pt-2 border-t flex items-center justify-end gap-3 ${
                  isLight ? 'border-slate-200' : 'border-slate-800'
                }`}
              >
                <button type="button" onClick={onClose} className={cancelBtnClass}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Create Blank Canvas →</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: IMPORT XML */}
          {activeTab === 'import' && (
            <form onSubmit={handleImportXmlSubmit} className="space-y-4">
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

              <div
                className={`pt-2 border-t flex items-center justify-end gap-3 ${
                  isLight ? 'border-slate-200' : 'border-slate-800'
                }`}
              >
                <button type="button" onClick={onClose} className={cancelBtnClass}>
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!pastedXml.trim()}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-lg shadow-purple-500/25 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Load Imported XML →</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
