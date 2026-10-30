'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  X,
  ArrowRight,
  Check,
  Upload,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Search,
  Plus,
  FileUp,
  LayoutGrid,
} from 'lucide-react';
import { CANONICAL_TEMPLATES, CanonicalTemplate } from '@/lib/canonical/canonicalTemplates';
import { useTheme } from '@/lib/themeContext';

export interface NewDiagramSelectionResult {
  mode: 'prompt' | 'blueprint' | 'vision' | 'import_xml';
  prompt?: string;
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

export function NewDiagramInputSelectionModal({
  isOpen,
  onClose,
  onSelectOption,
  isLight: propIsLight,
}: NewDiagramInputSelectionModalProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = propIsLight !== undefined ? propIsLight : theme === 'light';

  // World 1 (/dashboard) defaults strictly to Certified Blueprint selection
  const [activeTab, setActiveTab] = useState<'blueprint' | 'prompt' | 'vision' | 'import'>('blueprint');
  const [isExpandedWide, setIsExpandedWide] = useState(false);

  // Blueprint Mode State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('78');

  // Pure Prompt-to-Diagram Handoff State (navigates to World 2: /prompt-to-diagram)
  const [promptText, setPromptText] = useState('');

  // Vision Decompile Mode State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [visionProjectName, setVisionProjectName] = useState<string>('');
  const [isDecompiling, setIsDecompiling] = useState<boolean>(false);
  const [decompileStatus, setDecompileStatus] = useState<string>('');

  // Import XML Mode State
  const [pastedXml, setPastedXml] = useState('');
  const [importTitle, setImportTitle] = useState('Imported Draw.io Diagram');

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

  const handleBlueprintSubmit = (bp: CanonicalTemplate) => {
    onSelectOption({
      mode: 'blueprint',
      blueprintId: bp.id,
      blueprintTitle: bp.name,
    });
  };

  const handleLaunchPurePromptWorld = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = promptText.trim();
    onClose();
    if (q) {
      router.push(`/prompt-to-diagram?prompt=${encodeURIComponent(q)}`);
    } else {
      router.push('/prompt-to-diagram');
    }
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
    setDecompileStatus('Gemini Vision is decompiling architectural nodes, zones & flows...');

    try {
      const res = await fetch('/api/decompile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImageBase64,
          projectName:
            visionProjectName.trim() ||
            uploadedFileName.replace(/\.[^/.]+$/, '') ||
            'Decompiled Architecture',
          useCaseName: 'Architecture Vision Blueprint Extraction',
        }),
      });

      const data = await res.json();
      if (data.success && data.xml) {
        setDecompileStatus('Decompilation complete! Initializing canvas...');
        onSelectOption({
          mode: 'vision',
          projectName: visionProjectName.trim() || 'Decompiled Architecture',
          customXml: data.xml,
          sourceImageBase64: uploadedImageBase64,
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

  const handleImportXmlSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pastedXml.trim()) return;
    onSelectOption({
      mode: 'import_xml',
      projectName: importTitle.trim() || 'Imported Diagram',
      customXml: pastedXml.trim(),
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 shrink-0">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="new-diagram-modal-title"
                  className={`text-sm font-extrabold tracking-tight truncate ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Select Starting Blueprint or Input Source
                </h2>
                <span
                  className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isLight
                      ? 'bg-teal-50 text-teal-700 border-teal-200'
                      : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                  }`}
                >
                  TEMPLATE-FIRST STUDIO
                </span>
              </div>
              <p className={`text-[11px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Pick one of {CANONICAL_TEMPLATES.length} certified templates to mutate, or launch Pure Prompt-to-Diagram
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
            >
              {isExpandedWide ? '⇥ Compact' : '⇤ Expand'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close new diagram dialog"
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                isLight
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-COLUMN SEGMENTED TAB GRID */}
        <div
          data-testid="new-diagram-segmented-tabs"
          className={`px-5 py-2.5 border-b grid grid-cols-4 gap-1.5 shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/80' : 'border-slate-800/80 bg-slate-950/30'
          }`}
        >
          <button
            type="button"
            data-testid="new-diagram-tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'blueprint'
                ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                : inactiveTabClass
            }`}
          >
            <LayoutGrid
              className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'blueprint' ? 'text-teal-100' : 'text-teal-600'
              }`}
            />
            <span className="truncate">{CANONICAL_TEMPLATES.length} Blueprints</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-prompt"
            onClick={() => setActiveTab('prompt')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'prompt'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : inactiveTabClass
            }`}
          >
            <Sparkles
              className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'prompt' ? 'text-blue-100' : 'text-blue-600'
              }`}
            />
            <span className="truncate">Prompt Only</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-vision"
            onClick={() => setActiveTab('vision')}
            className={`px-2 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'vision'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : inactiveTabClass
            }`}
          >
            <ImageIcon
              className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'vision' ? 'text-indigo-200' : 'text-indigo-500'
              }`}
            />
            <span className="truncate">Vision AI</span>
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
            <FileUp
              className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'import' ? 'text-purple-200' : 'text-purple-500'
              }`}
            />
            <span className="truncate">Import XML</span>
          </button>
        </div>

        {/* DRAWER BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* TAB 1 (DEFAULT): CERTIFIED BLUEPRINT CATALOG */}
          {activeTab === 'blueprint' && (
            <div className="space-y-3.5">
              <div className={`flex ${!isExpandedWide ? 'flex-col items-stretch' : 'flex-col sm:flex-row items-center'} gap-2.5`}>
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${CANONICAL_TEMPLATES.length} certified reference architectures...`}
                    className={`w-full border rounded-xl pl-9 pr-3.5 py-2 text-xs outline-none focus:border-teal-500 font-medium ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-1.5 shrink-0 flex-wrap w-full">
                  {['all', 'Reference Architectures', 'Infographic', 'Flow'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setSelectedCategory(f)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition shrink-0 cursor-pointer ${
                        selectedCategory === f
                          ? isLight
                            ? 'bg-teal-100 text-teal-900 border border-teal-300'
                            : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
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
                            ? 'bg-teal-50 border-teal-500 shadow-sm'
                            : 'bg-teal-500/15 border-teal-500 shadow-md shadow-teal-500/10'
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
                                ? 'bg-white text-teal-800 border-teal-200'
                                : 'bg-slate-800 text-teal-300 border-slate-700'
                            }`}
                          >
                            #{bp.id} • {bp.family}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <h4
                          className={`text-xs font-bold mb-1 leading-snug ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {bp.name}
                        </h4>
                        <p
                          className={`text-[11px] line-clamp-2 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          {bp.primaryPurpose}
                        </p>
                      </div>

                      <div
                        className={`mt-2.5 pt-2 border-t flex items-center justify-between ${
                          isLight ? 'border-slate-200' : 'border-slate-800/60'
                        }`}
                      >
                        <span
                          className={`text-[10px] truncate max-w-[140px] ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
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
                              ? 'bg-teal-100 hover:bg-teal-200 text-teal-900 border-teal-300'
                              : 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border-teal-500/30'
                          }`}
                        >
                          <span>Load Template</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT HANDOFF TO WORLD 2 (/prompt-to-diagram — NO TEMPLATES, NO EXTRA OPTIONS) */}
          {activeTab === 'prompt' && (
            <form onSubmit={handleLaunchPurePromptWorld} className="space-y-4">
              <div
                className={`p-4 rounded-2xl border ${
                  isLight ? 'bg-blue-50/70 border-blue-200' : 'bg-blue-950/20 border-blue-800'
                }`}
              >
                <h3
                  className={`text-xs font-extrabold mb-1 ${
                    isLight ? 'text-blue-950' : 'text-blue-200'
                  }`}
                >
                  Pure Prompt-to-Diagram Studio (No Templates)
                </h3>
                <p
                  className={`text-[11px] leading-relaxed ${
                    isLight ? 'text-blue-900/80' : 'text-blue-300/80'
                  }`}
                >
                  Blueprint Studio (<code>/dashboard</code>) requires selecting a certified template
                  first before applying AI mutations. To generate a brand-new architecture directly
                  from a prompt with zero templates and zero extra options, use the dedicated{' '}
                  <strong>Prompt to Diagram</strong> workspace.
                </p>
              </div>

              <div>
                <label
                  htmlFor="new-diagram-prompt-textarea"
                  className={`block text-xs font-extrabold mb-1.5 ${
                    isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}
                >
                  Architecture Prompt (Optional — or enter directly on /prompt-to-diagram)
                </label>
                <textarea
                  id="new-diagram-prompt-textarea"
                  data-testid="new-diagram-prompt-textarea"
                  rows={5}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g., Build an L400 architecture design diagram of a Borderless Lakehouse on GCP including Databricks..."
                  className={`w-full border focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 rounded-2xl p-3.5 text-xs outline-none transition leading-relaxed resize-none font-medium ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                  }`}
                />
              </div>
            </form>
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
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                          : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                      }`}
                    >
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Drop architecture screenshot, diagram PNG, or whiteboard photo here
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Supports PNG, JPG, WEBP, SVG • Analyzed with Gemini Vision
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
                    isLight ? 'text-indigo-700 hover:text-indigo-800' : 'text-indigo-400 hover:text-indigo-300'
                  }`}
                >
                  <span>Open Full Side-by-Side Vision Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 4: IMPORT XML */}
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

        {/* STICKY FOOTER */}
        <div
          data-testid="new-diagram-sticky-footer"
          className={`px-5 py-3.5 border-t flex items-center justify-between gap-3 shrink-0 ${
            isLight ? 'bg-slate-50/95 border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          <div className="min-w-0">
            {activeTab === 'blueprint' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Showing {filteredBlueprints.length} of {CANONICAL_TEMPLATES.length} Certified Blueprints
              </span>
            )}
            {activeTab === 'prompt' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Opens dedicated Pure Prompt-to-Diagram Studio (/prompt-to-diagram)
              </span>
            )}
            {activeTab === 'vision' && (
              <span className={`text-[11px] font-medium block truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {uploadedFileName ? `Ready: ${uploadedFileName}` : 'Upload PNG/JPG/SVG to decompile'}
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

            {activeTab === 'blueprint' && (
              <button
                type="button"
                onClick={() => {
                  const bp = CANONICAL_TEMPLATES.find((t) => t.id === selectedBlueprintId);
                  if (bp) handleBlueprintSubmit(bp);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold shadow-md shadow-teal-600/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Load Blueprint #{selectedBlueprintId} →</span>
              </button>
            )}

            {activeTab === 'prompt' && (
              <button
                type="button"
                onClick={() => handleLaunchPurePromptWorld()}
                data-testid="new-diagram-synthesize-submit-btn"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {promptText.trim() ? 'Generate in Prompt Studio →' : 'Open Prompt to Diagram →'}
                </span>
              </button>
            )}

            {activeTab === 'vision' && (
              <button
                type="button"
                disabled={!uploadedImageBase64 || isDecompiling}
                onClick={handleDecompileAndOpen}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer"
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
