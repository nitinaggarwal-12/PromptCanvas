'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Loader2,
  ArrowLeft,
  Share2,
  Check,
} from 'lucide-react';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import AppHeader, { btnClass } from '@/components/AppHeader';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { useTheme } from '@/lib/themeContext';
import {
  INFOGRAPHIC_BLUEPRINTS_LIST,
  generateInfographicBlueprintXmlById,
} from '@/lib/canonical/infographicBlueprints52to66';

function InfographicsPageContent() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const searchParams = useSearchParams();
  const [expandedId, setExpandedId] = useState<string | null>(
    () => searchParams.get('id') || searchParams.get('blueprint') || null
  );
  const [cloningId, setCloningId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const qId = searchParams.get('id') || searchParams.get('blueprint');
    if (qId && INFOGRAPHIC_BLUEPRINTS_LIST.some((ib) => ib.id === qId)) {
      setExpandedId(qId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (expandedId) {
        if (url.searchParams.get('id') !== expandedId) {
          url.searchParams.set('id', expandedId);
          url.searchParams.delete('blueprint');
          window.history.replaceState(null, '', url.toString());
        }
      } else if (url.searchParams.has('id') || url.searchParams.has('blueprint')) {
        url.searchParams.delete('id');
        url.searchParams.delete('blueprint');
        window.history.replaceState(null, '', url.toString());
      }
    } catch {}
  }, [expandedId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setExpandedId(params.get('id') || params.get('blueprint') || null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleCopyInfographicShareLink = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/infographics?id=${encodeURIComponent(id)}`;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2200);
  };

  const expandedIndex = useMemo(() => {
    if (!expandedId) return -1;
    return INFOGRAPHIC_BLUEPRINTS_LIST.findIndex((ib) => ib.id === expandedId);
  }, [expandedId]);

  const expandedItem = expandedIndex >= 0 ? INFOGRAPHIC_BLUEPRINTS_LIST[expandedIndex] : null;

  const stepExpanded = useCallback(
    (delta: -1 | 1) => {
      if (expandedIndex < 0 || INFOGRAPHIC_BLUEPRINTS_LIST.length === 0) return;
      const next =
        (expandedIndex + delta + INFOGRAPHIC_BLUEPRINTS_LIST.length) %
        INFOGRAPHIC_BLUEPRINTS_LIST.length;
      setExpandedId(INFOGRAPHIC_BLUEPRINTS_LIST[next].id);
    },
    [expandedIndex]
  );

  useEffect(() => {
    if (!expandedItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedId(null);
      if (e.key === 'ArrowLeft') stepExpanded(-1);
      if (e.key === 'ArrowRight') stepExpanded(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedItem, stepExpanded]);

  const handleCloneInfographic = async (id: string, title: string, subtitle: string) => {
    if (cloningId) return;
    setCloningId(id);
    try {
      const xml = generateInfographicBlueprintXmlById(id);
      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title,
          xml,
          comment: `Cloned from Executive Infographic #${id}`,
          prompt: subtitle,
          architectureType: `canonical_${id}`,
          createdStudio: 'dashboard',
        }),
      });
      const data = await res.json();
      const newId = data?.diagram?.id || data?.id;
      if (res.ok && newId) {
        window.location.assign(`/dashboard?id=${encodeURIComponent(newId)}&blueprint=${encodeURIComponent(id)}`);
      }
    } finally {
      setCloningId(null);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#070a13] text-slate-100'
      }`}
    >
      <UnifiedAppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          icon={BarChart3}
          tone="amber"
          title="Infographics"
          badge="15 Executive Infographics"
          actions={
            <>
              <Link href="/templates" className={btnClass('neutral')}>
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Architecture Templates (33)</span>
              </Link>
              <ThemeToggleBtn id="infographics-theme-toggle" />
            </>
          }
        />

        <main className="flex-1 p-4 md:p-6 max-w-[1640px] w-full mx-auto space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              Executive Infographics, Roadmaps &amp; Strategic Matrices
            </h2>
            <p className={`text-xs md:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Dedicated gallery for the 15 untouched executive infographic layouts (`#52`–`#66`), kept strictly separate from the 33 engineering templates on{' '}
              <Link href="/templates" className="text-blue-600 font-bold hover:underline">
                /templates
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {INFOGRAPHIC_BLUEPRINTS_LIST.map((ib) => (
              <article
                key={ib.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between shadow-xs ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div>
                  <div
                    onClick={() => setExpandedId(ib.id)}
                    className="relative aspect-video w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white cursor-pointer"
                  >
                    <img
                      src={ib.previewImage}
                      alt={ib.name}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(ib.id);
                      }}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-xs font-bold cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand</span>
                    </button>
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-600 text-white font-mono text-xs font-bold">
                      #{ib.id} · Infographic
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-extrabold">{ib.shortType}</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {ib.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-4 py-3 border-t flex items-center justify-between gap-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
                  }`}
                >
                  <button
                    type="button"
                    data-testid={`infographic-share-btn-${ib.id}`}
                    onClick={(e) => handleCopyInfographicShareLink(ib.id, e)}
                    className={`py-1.5 px-3 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                      copiedId === ib.id
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : isLight
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    {copiedId === ib.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Share Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={Boolean(cloningId)}
                    onClick={() => void handleCloneInfographic(ib.id, ib.shortType, ib.subtitle)}
                    className="py-1.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {cloningId === ib.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Cloning…</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Clone New ID</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {expandedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-sm flex flex-col p-4"
          onClick={() => setExpandedId(null)}
        >
          <div
            className={`w-full max-w-[1440px] mx-auto flex-1 rounded-2xl border overflow-hidden flex flex-col ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <h3 className="text-base font-extrabold">
                #{expandedItem.id} — {expandedItem.shortType}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="infographic-expanded-share-btn"
                  onClick={() => handleCopyInfographicShareLink(expandedItem.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                    copiedId === expandedItem.id
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {copiedId === expandedItem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => stepExpanded(-1)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <span className="text-xs font-mono font-bold">
                  {expandedIndex + 1} / {INFOGRAPHIC_BLUEPRINTS_LIST.length}
                </span>
                <button
                  type="button"
                  onClick={() => stepExpanded(1)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
                >
                  <span>Forward</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedId(null)}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white flex items-center justify-center p-4 overflow-auto">
              <img
                src={expandedItem.previewImage}
                alt={expandedItem.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InfographicsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-sm">Loading Infographics…</div>}>
      <InfographicsPageContent />
    </Suspense>
  );
}
