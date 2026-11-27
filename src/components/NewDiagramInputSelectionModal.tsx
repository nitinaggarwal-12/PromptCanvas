'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Plus,
  FileUp,
  Layers,
  Lock,
  Home,
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import ArchitectureTemplateBrowser, {
  ArchitectureTemplateCloneResult,
} from '@/components/ArchitectureTemplateBrowser';
import {
  CERTIFIED_ARCHITECTURE_TEMPLATES,
  ArchitectureTemplateLevel,
  ArchitectureTemplateType,
  ArchitectureTemplateKind,
  ArchitectureTemplateUseCase,
} from '@/lib/templates/certifiedArchitectureTemplates';

export interface NewDiagramSelectionResult {
  mode: 'cloned_template' | 'prompt' | 'blueprint' | 'vision' | 'import_xml';
  instanceId?: string;
  templateId?: string;
  templateHeaderTag?: string;
  templateLevel?: ArchitectureTemplateLevel;
  templateType?: ArchitectureTemplateType;
  templateKind?: ArchitectureTemplateKind;
  templateUseCase?: ArchitectureTemplateUseCase;
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
  /**
   * When true (new-diagram flow before any template clone is locked in),
   * keeps the dynamic template selector open until the user locks in a starting template
   * or explicitly chooses another creation mode.
   */
  requireTemplateLock?: boolean;
}

export function NewDiagramInputSelectionModal({
  isOpen,
  onClose,
  onSelectOption,
  isLight: propIsLight,
  requireTemplateLock = false,
}: NewDiagramInputSelectionModalProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = propIsLight !== undefined ? propIsLight : theme === 'light';

  const [activeTab, setActiveTab] = useState<'blueprint' | 'prompt' | 'vision' | 'import'>('blueprint');
  const [isExpandedWide, setIsExpandedWide] = useState(true);

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

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.querySelector('[data-testid="template-expanded-modal"]')) return;
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLockedInTemplateClone = ({
    instanceId,
    xml,
    template,
  }: ArchitectureTemplateCloneResult) => {
    onSelectOption({
      mode: 'cloned_template',
      instanceId,
      templateId: template.id,
      templateHeaderTag: template.headerTag,
      templateLevel: template.level,
      templateType: template.type,
      templateKind: template.kind,
      templateUseCase: template.useCase,
      blueprintId: template.id,
      blueprintTitle: template.title,
      prompt: template.summary,
      customXml: xml,
      projectName: template.title,
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
    } catch (err: unknown) {
      setDecompileStatus(
        `Error: ${err instanceof Error ? err.message : 'Failed to decompile image'}`
      );
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
        isLight ? 'bg-slate-900/25' : 'bg-slate-950/55'
      }`}
      onClick={onClose}
    >
      <div
        data-testid="new-diagram-docked-drawer"
        className={`relative h-full w-full ${
          isExpandedWide ? 'lg:w-[calc(100vw-16rem)] max-w-[1240px]' : 'max-w-[760px]'
        } border-l shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* DRAWER HEADER */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 shrink-0 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              title="Go to PromptCanvas Homepage"
              aria-label="Go to PromptCanvas Homepage"
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/"
                  data-testid="new-diagram-home-brand-link"
                  title="Go to PromptCanvas Homepage"
                  className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md border transition inline-flex items-center gap-1 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700 border-slate-200'
                      : 'bg-slate-800 hover:bg-sky-500/20 text-slate-100 hover:text-sky-300 border-slate-700'
                  }`}
                >
                  <Home className="w-3 h-3" />
                  <span>PromptCanvas Home</span>
                </Link>
                <h2
                  id="new-diagram-modal-title"
                  className={`text-sm sm:text-base font-extrabold tracking-tight truncate ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Choose &amp; Lock In a Starting Architecture Template
                </h2>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border shrink-0 hidden xl:inline-block ${
                    isLight
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}
                >
                  CLONES UNIQUE ID · ORIGINAL INTACT
                </span>
              </div>
              <p className={`text-xs truncate ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Filter dynamically by Level (L200–L400), Type, Diagram Kind, and Use Case — or use the left sidebar / Close button anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href="/templates"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition hidden md:inline-flex items-center gap-1 ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-blue-700 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-blue-300 border-slate-700'
              }`}
            >
              <span>Full Templates Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={() => setIsExpandedWide(!isExpandedWide)}
              data-testid="new-diagram-drawer-width-toggle"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer hidden sm:inline-flex ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {isExpandedWide ? '⇥ Compact' : '⇤ Expand'}
            </button>
            <button
              type="button"
              data-testid="new-diagram-close-btn"
              onClick={onClose}
              aria-label="Close new diagram dialog"
              title="Close drawer (Esc)"
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1 transition cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
              }`}
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* 4-COLUMN SEGMENTED TAB GRID */}
        <div
          data-testid="new-diagram-segmented-tabs"
          className={`px-5 py-2.5 border-b grid grid-cols-4 gap-1.5 shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/90' : 'border-slate-800/80 bg-slate-950/30'
          }`}
        >
          <button
            type="button"
            data-testid="new-diagram-tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`px-2 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'blueprint'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : inactiveTabClass
            }`}
          >
            <Layers
              className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'blueprint' ? 'text-blue-100' : 'text-blue-600'
              }`}
            />
            <span className="truncate">
              {CERTIFIED_ARCHITECTURE_TEMPLATES.length} Architecture Templates
            </span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-prompt"
            onClick={() => setActiveTab('prompt')}
            className={`px-2 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'prompt'
                ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                : inactiveTabClass
            }`}
          >
            <Sparkles
              className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'prompt' ? 'text-teal-100' : 'text-teal-600'
              }`}
            />
            <span className="truncate">Prompt Only</span>
          </button>

          <button
            type="button"
            data-testid="new-diagram-tab-vision"
            onClick={() => setActiveTab('vision')}
            className={`px-2 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
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
            className={`px-2 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
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
          {/* TAB 1 (DEFAULT): DYNAMIC 4-DROPDOWN ARCHITECTURE TEMPLATE SELECTOR + CLONE-ON-LOCK */}
          {activeTab === 'blueprint' && (
            <ArchitectureTemplateBrowser
              mode="picker"
              onLockedInClone={handleLockedInTemplateClone}
            />
          )}

          {/* TAB 2: DIRECT HANDOFF TO WORLD 2 (/prompt-to-diagram — NO TEMPLATES, NO EXTRA OPTIONS) */}
          {activeTab === 'prompt' && (
            <form onSubmit={handleLaunchPurePromptWorld} className="space-y-4 max-w-2xl">
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
                  className={`text-xs leading-relaxed ${
                    isLight ? 'text-blue-900/80' : 'text-blue-300/80'
                  }`}
                >
                  Blueprint Studio (<code>/dashboard</code>) clones a chosen architecture template
                  into a unique Diagram ID first before applying AI prompt mutations. To generate a
                  brand-new diagram from scratch with zero templates, launch{' '}
                  <strong>Prompt to Diagram</strong>.
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
                  placeholder="e.g., Build an L400 architecture design diagram of a Borderless Lakehouse on GCP..."
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
            <div className="space-y-4 max-w-2xl">
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
                      ? 'border-slate-300 hover:border-teal-500 bg-white hover:bg-teal-50/30'
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
                      <span className="text-xs text-slate-400 font-mono">(Click to change)</span>
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
                      <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
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
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
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
            <form id="new-diagram-import-form" onSubmit={handleImportXmlSubmit} className="space-y-4 max-w-2xl">
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
                  className={`w-full border font-mono text-xs p-3 rounded-xl focus:border-purple-500 outline-none transition resize-none ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
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
          className={`px-5 py-3 border-t flex items-center justify-between gap-3 shrink-0 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          <div className="min-w-0 flex items-center gap-1.5 text-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className={`font-medium truncate ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {activeTab === 'blueprint'
                ? 'Select any filtered template above (or click Inspect for Back/Forward preview) to lock in a fresh cloned Diagram ID.'
                : activeTab === 'prompt'
                ? 'Opens dedicated Pure Prompt-to-Diagram Studio (/prompt-to-diagram)'
                : activeTab === 'vision'
                ? uploadedFileName
                  ? `Ready: ${uploadedFileName}`
                  : 'Upload PNG/JPG/SVG to decompile'
                : pastedXml.trim()
                ? `${pastedXml.trim().length} bytes XML ready`
                : 'Paste <mxGraphModel> XML above'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              data-testid="new-diagram-cancel-btn"
              onClick={onClose}
              className={cancelBtnClass}
            >
              Close
            </button>

            {activeTab === 'prompt' && (
              <button
                type="button"
                onClick={() => handleLaunchPurePromptWorld()}
                data-testid="new-diagram-synthesize-submit-btn"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-md shadow-teal-600/20 transition flex items-center gap-1.5 cursor-pointer"
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
