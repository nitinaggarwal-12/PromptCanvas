'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Clipboard,
  Download,
  ExternalLink,
  FileCode2,
  ImageIcon,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { generateSystemContextXml } from '@/lib/canonical/canonicalTemplates';

const DRAWIO_EMBED_URL =
  'https://embed.diagrams.net/?embed=1&proto=json&spin=1&ui=kennedy&libraries=1&saveAndExit=0&noSaveBtn=0';

export default function CanonicalTemplatesPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const canonicalXml = useMemo(() => generateSystemContextXml('biopharma', 'light'), []);
  const [xml, setXml] = useState(canonicalXml);
  const [copied, setCopied] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  const postToEditor = (payload: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(payload), '*');
  };

  const loadXmlIntoEditor = (nextXml: string) => {
    postToEditor({
      action: 'load',
      xml: nextXml,
      autosave: 1,
      title: '01 - System Context - Canonical Template',
    });
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;

      let message: { event?: string; xml?: string };
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }

      if (message.event === 'init') {
        setEditorReady(true);
        loadXmlIntoEditor(xml);
      }

      if ((message.event === 'save' || message.event === 'autosave') && message.xml) {
        setXml(message.xml);
      }

      if (message.event === 'exit' && message.xml) {
        setXml(message.xml);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [xml]);

  const resetReplica = () => {
    setXml(canonicalXml);
    loadXmlIntoEditor(canonicalXml);
  };

  const copyXml = async () => {
    await navigator.clipboard.writeText(xml);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadXml = () => {
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '01-system-context-canonical.drawio.xml';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between gap-4 px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              aria-label="Back to PromptCanvas"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <h1 className="truncate text-lg font-black tracking-tight">Canonical Templates</h1>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Editable Draw.io
                </span>
              </div>
              <p className="truncate text-xs text-slate-500">
                Template 01 · System Context · source reference: /images/01.png
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetReplica}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset replica
            </button>
            <button
              onClick={copyXml}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Clipboard className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy XML'}
            </button>
            <button
              onClick={downloadXml}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-black text-white shadow-sm transition hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5" />
              Download XML
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-5 py-5 lg:px-8">
        <div className="mb-4 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(360px,0.48fr)_minmax(760px,1fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-black">
                  <ImageIcon className="h-4 w-4 text-indigo-600" />
                  Source image 01
                </div>
                <p className="mt-1 text-xs text-slate-500">Original full-resolution PNG committed in PromptCanvas.</p>
              </div>
              <a
                href="/images/01.png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Open PNG
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <Image
                src="/images/01.png"
                alt="Canonical source image 01"
                width={1536}
                height={1024}
                className="h-auto w-full object-contain"
                priority
              />
            </div>

            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-950">
                <FileCode2 className="h-4 w-4" />
                Replica contract
              </div>
              <p className="mt-1.5 text-xs leading-5 text-indigo-900/80">
                The right-hand canvas is a semantic Draw.io reconstruction of image 01. Every box, label,
                boundary and connector is an editable mxCell — the PNG is reference-only and is never embedded
                as a flattened background.
              </p>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
              <div>
                <div className="text-sm font-black">Editable Draw.io canvas</div>
                <div className="text-[11px] text-slate-500">
                  {editorReady ? 'Editor loaded · changes are captured into downloadable XML' : 'Loading diagrams.net editor…'}
                </div>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Template 01 · L1
              </div>
            </div>

            <iframe
              ref={iframeRef}
              title="Canonical Template 01 Draw.io Editor"
              src={DRAWIO_EMBED_URL}
              className="h-[760px] w-full bg-white"
              allow="clipboard-read; clipboard-write"
            />
          </section>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black">Current clean Draw.io XML</h2>
              <p className="text-xs text-slate-500">Live state from the editor. Download remains fully editable in diagrams.net / draw.io.</p>
            </div>
            <span className="font-mono text-[10px] text-slate-400">{xml.length.toLocaleString()} characters</span>
          </div>
          <pre className="max-h-56 overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-[10px] leading-4 text-slate-200">
            {xml}
          </pre>
        </section>
      </main>
    </div>
  );
}
