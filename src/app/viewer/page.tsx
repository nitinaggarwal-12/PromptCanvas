'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Presentation, FileText, Sparkles, ChevronDown, Printer, ArrowLeft } from 'lucide-react';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';

function CloudViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawBlueprintParam = searchParams.get('blueprint') || searchParams.get('id') || '';
  const rawTitleParam = searchParams.get('title') || '';
  const rawModeParam = searchParams.get('mode');

  const [engine] = useState<'microsoft' | 'google'>('google');
  const [activeMode, setActiveMode] = useState<'slides' | 'docs' | 'pdf'>(
    rawModeParam === 'docs' ? 'docs' : rawModeParam === 'pdf' ? 'pdf' : 'slides'
  );
  const [showTopDropdown, setShowTopDropdown] = useState<boolean>(false);
  const [xmlContent, setXmlContent] = useState<string>('');
  const [resolvedTitle, setResolvedTitle] = useState<string>(rawTitleParam || 'Google Cloud Enterprise Architecture');
  const [resolvedId, setResolvedId] = useState<string>(rawBlueprintParam || '00');

  useEffect(() => {
    const bpId = rawBlueprintParam || '00';
    const matchedTemplate = CANONICAL_TEMPLATES.find(
      (t) => t.id === bpId || t.id === bpId.replace(/^#/, '').padStart(2, '0')
    );

    if (matchedTemplate) {
      setResolvedId(`#${matchedTemplate.id}`);
      setResolvedTitle(rawTitleParam || matchedTemplate.name);
      setXmlContent(matchedTemplate.generateXml('enterprise', 'light'));
      return;
    }

    let loadedXml = '';
    if (typeof window !== 'undefined') {
      loadedXml = localStorage.getItem('pc_vision_last_xml') || '';
    }
    if (!loadedXml) {
      loadedXml = generateAzureLandingZoneArchitectureXml();
    }
    setResolvedId(bpId || 'VIS-9745');
    setResolvedTitle(rawTitleParam || 'Azure Application Landing Zone');
    setXmlContent(loadedXml);
  }, [rawBlueprintParam, rawTitleParam]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#090D16] text-slate-100 flex flex-col">
      {/* Top Gmail-Style Cloud Viewer Bar */}
      <header className="dark h-14 px-4 md:px-6 bg-[#090D16] border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 z-[110]">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Presentation className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                {resolvedId}
              </span>
              <h1 className="text-sm md:text-base font-bold text-white tracking-tight truncate max-w-xs lg:max-w-md">
                {resolvedTitle}
              </h1>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                <Sparkles className="w-3 h-3" /> 1:1 Master &amp; Editable Vector Deck ({engine.toUpperCase()})
              </span>
            </div>
          </div>
        </div>

        {/* Center Gmail-Style "Open with ▾" Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTopDropdown((prev) => !prev)}
            data-testid="viewer-gmail-open-with-dropdown-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-extrabold text-white shadow-md transition cursor-pointer"
          >
            {activeMode === 'slides' ? (
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
            ) : activeMode === 'docs' ? (
              <FileText className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <Printer className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>
              Open with{' '}
              {activeMode === 'slides' ? 'Google Slides' : activeMode === 'docs' ? 'Google Docs' : 'PDF Viewer'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTopDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showTopDropdown && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl py-1.5 z-[120]">
              <button
                type="button"
                onClick={() => {
                  setActiveMode('slides');
                  setShowTopDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 hover:bg-slate-800 text-amber-300 font-bold cursor-pointer"
              >
                <Presentation className="w-4 h-4 text-amber-400" />
                <span>Open with Google Slides (3-Slide Deck)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMode('docs');
                  setShowTopDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 hover:bg-slate-800 text-sky-300 font-bold cursor-pointer"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Open with Google Docs (Specification)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMode('pdf');
                  setShowTopDropdown(false);
                }}
                className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 hover:bg-slate-800 text-rose-300 font-bold cursor-pointer"
              >
                <Printer className="w-4 h-4 text-rose-400" />
                <span>Open with PDF Viewer / Print</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Action Controls: Open with Google Slides, Open with Google Docs, PDF */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveMode('slides')}
            data-testid="viewer-open-with-google-slides-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md transition-all cursor-pointer"
            title="Preview & Open 3-Slide Deck (.pptx) with Google Slides"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Open with Google Slides</span>
          </button>

          <button
            onClick={() => setActiveMode('docs')}
            data-testid="viewer-open-with-google-docs-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md transition-all cursor-pointer"
            title="Preview & Open Architecture Specification (.docx) with Google Docs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open with Google Docs</span>
          </button>

          <button
            onClick={() => setActiveMode('pdf')}
            data-testid="viewer-open-with-pdf-btn"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-all cursor-pointer"
            title="Preview & Print Executive PDF Dossier"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </header>

      {/* Main Embedded Same-Screen Cloud Studio Viewport (Zero external SSO HTML leakage) */}
      <main className="flex-1 w-full h-[calc(100vh-3.5rem)] relative bg-[#0B111E]">
        {xmlContent && (
          <GoogleWorkspaceDirectOpenModal
            isOpen={true}
            onClose={() => router.push('/dashboard')}
            mode={activeMode}
            xmlContent={xmlContent}
            diagramName={resolvedTitle}
            blueprintId={resolvedId}
          />
        )}
      </main>
    </div>
  );
}

export default function CloudViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#090D16] flex items-center justify-center text-slate-300 text-sm">
          Loading PromptCanvas Cloud Presentation Viewer...
        </div>
      }
    >
      <CloudViewerContent />
    </Suspense>
  );
}
