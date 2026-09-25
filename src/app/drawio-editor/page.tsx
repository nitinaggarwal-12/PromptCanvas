'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Save, ArrowLeft, Layers } from 'lucide-react';

export default function FullscreenDrawioEditorPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [xml, setXml] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('Enterprise Architecture');
  const [versionTag, setVersionTag] = useState<string>('v1.0');
  const [syncStatus, setSyncStatus] = useState<'ready' | 'saving' | 'synced'>('ready');
  const latestXmlRef = useRef<string>('');

  useEffect(() => {
    try {
      const storedRaw = localStorage.getItem('promptcanvas_drawio_active_session');
      if (storedRaw) {
        const parsed = JSON.parse(storedRaw);
        if (parsed.xml) {
          setXml(parsed.xml);
          latestXmlRef.current = parsed.xml;
        }
        if (parsed.projectTitle) setProjectTitle(parsed.projectTitle);
        if (parsed.versionTag) setVersionTag(parsed.versionTag);
      }
    } catch (e) {
      console.error('Failed to load active Draw.io session:', e);
    }
  }, []);

  const broadcastSavedXmlToStudio = (savedXml: string, note = 'Edited & Saved in Draw.io Fullscreen Tab') => {
    if (!savedXml || !savedXml.includes('<mxfile')) return;
    setSyncStatus('saving');
    latestXmlRef.current = savedXml;
    const payload = {
      xml: savedXml,
      note,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem('promptcanvas_drawio_saved_payload', JSON.stringify(payload));
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('promptcanvas_drawio_sync');
        bc.postMessage(payload);
        bc.close();
      }
    } catch (e) {
      console.error('Broadcast sync error:', e);
    }
    setTimeout(() => setSyncStatus('synced'), 250);
  };

  useEffect(() => {
    const handleMessage = (evt: MessageEvent) => {
      if (!evt.data || typeof evt.data !== 'string') return;
      try {
        const msg = JSON.parse(evt.data);
        if (msg.event === 'init') {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              autosave: 1,
              xml: latestXmlRef.current || xml,
            }),
            '*'
          );
        } else if (msg.event === 'autosave' && typeof msg.xml === 'string') {
          latestXmlRef.current = msg.xml;
        } else if ((msg.event === 'save' || msg.event === 'exit') && typeof msg.xml === 'string') {
          broadcastSavedXmlToStudio(msg.xml, 'Saved from Fullscreen Draw.io Tab');
          if (msg.event === 'exit') {
            window.close();
          }
        }
      } catch {
        // Ignore non-JSON postMessages
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [xml]);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0B111E] text-white overflow-hidden">
      {/* Top Sync Bar */}
      <header className="h-12 px-6 bg-[#0B111E] border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.close()}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio Tab</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Draw.io Live Bidirectional Editor:</span>
            <span className="text-sky-400 font-mono">{projectTitle}</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[11px]">
              Base {versionTag}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {syncStatus === 'synced' && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>✓ Synced to Studio Canvas &amp; Version History!</span>
            </span>
          )}
          <button
            id="drawio-tab-save-sync-btn"
            onClick={() =>
              broadcastSavedXmlToStudio(
                latestXmlRef.current || xml,
                'Manual Edit Saved in Draw.io Tab'
              )
            }
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>💾 Save &amp; Sync Back to Studio Canvas</span>
          </button>
        </div>
      </header>

      {/* Embedded Full-Screen Draw.io Editor */}
      <div className="flex-1 w-full h-full bg-white">
        <iframe
          ref={iframeRef}
          title="Full-Screen Draw.io Bidirectional Editor"
          src="https://embed.diagrams.net/?embed=1&proto=json&spin=1&ui=kennedy&saveAndExit=1&noExitBtn=0"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
