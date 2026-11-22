'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Save, ArrowLeft, Layers, AlertCircle } from 'lucide-react';

const DRAWIO_EMBED_ORIGIN = 'https://embed.diagrams.net';

export default function FullscreenDrawioEditorPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [xml, setXml] = useState<string>('');
  const [diagramId, setDiagramId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState<string>('Enterprise Architecture');
  const [versionTag, setVersionTag] = useState<string>('v1.0');
  const [syncStatus, setSyncStatus] = useState<'ready' | 'saving' | 'synced' | 'error'>('ready');
  const [syncDetail, setSyncDetail] = useState<string>('');
  const latestXmlRef = useRef<string>('');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlDiagramId = params.get('diagramId')?.trim() || null;
      const storedRaw = localStorage.getItem('promptcanvas_drawio_active_session');
      if (storedRaw) {
        const parsed = JSON.parse(storedRaw);
        if (parsed.xml) {
          setXml(parsed.xml);
          latestXmlRef.current = parsed.xml;
        }
        if (parsed.projectTitle) setProjectTitle(parsed.projectTitle);
        if (parsed.versionTag) setVersionTag(parsed.versionTag);
        if (urlDiagramId || parsed.diagramId) {
          setDiagramId(urlDiagramId || parsed.diagramId);
        }
      } else if (urlDiagramId) {
        setDiagramId(urlDiagramId);
        fetch(`/api/diagrams/${encodeURIComponent(urlDiagramId)}`, { cache: 'no-store' })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data?.xml_content) {
              setXml(data.xml_content);
              latestXmlRef.current = data.xml_content;
            }
            if (data?.name) setProjectTitle(data.name);
          })
          .catch(() => {});
      }
    } catch (e) {
      console.error('Failed to load active Draw.io session:', e);
    }
  }, []);

  const broadcastSavedXmlToStudio = async (
    savedXml: string,
    note = 'Edited & Saved in Draw.io Fullscreen Tab'
  ) => {
    if (!savedXml || !savedXml.includes('<mxfile')) return;
    setSyncStatus('saving');
    setSyncDetail('');

    const taggedXml = savedXml.includes('data-user-drawio="true"')
      ? savedXml
      : savedXml.replace('<mxfile ', '<mxfile data-user-drawio="true" ');
    latestXmlRef.current = taggedXml;

    const payload = {
      xml: taggedXml,
      diagramId,
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

    // Persist directly to DB version history whenever linked to a real persisted diagramId
    const isPersistedDbId =
      Boolean(diagramId) &&
      !diagramId!.startsWith('ses_') &&
      !diagramId!.startsWith('proj_') &&
      !diagramId!.startsWith('tab_');

    if (isPersistedDbId && diagramId) {
      try {
        const res = await fetch(`/api/diagrams/${encodeURIComponent(diagramId)}/versions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            xmlContent: taggedXml,
            comment: note,
            createdBy: 'Draw.io Editor',
          }),
        });
        if (res.ok) {
          setSyncDetail('Saved to Database + Studio Canvas');
          setSyncStatus('synced');
          return;
        }
      } catch (dbErr) {
        console.warn('Direct DB persist from Draw.io tab failed:', dbErr);
      }
    }

    setSyncDetail('Synced to Studio Canvas');
    setSyncStatus('synced');
  };

  useEffect(() => {
    const sanitizeXmlAttributeValues = (raw: string): string =>
      String(raw || '').replace(/value="([^"]*)"/g, (_m, val: string) => {
        if (!val.includes('<') && !val.includes('>')) return _m;
        return `value="${val.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`;
      });

    const handleMessage = (evt: MessageEvent) => {
      // Strict origin validation: only accept messages from official embed.diagrams.net iframe
      if (evt.origin !== DRAWIO_EMBED_ORIGIN) return;
      if (!evt.data || typeof evt.data !== 'string') return;
      try {
        const msg = JSON.parse(evt.data);
        if (msg.event === 'init') {
          const safeXml = sanitizeXmlAttributeValues(latestXmlRef.current || xml);
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              autosave: 1,
              xml: safeXml,
            }),
            DRAWIO_EMBED_ORIGIN
          );
        } else if (msg.event === 'autosave' && typeof msg.xml === 'string') {
          latestXmlRef.current = msg.xml;
        } else if ((msg.event === 'save' || msg.event === 'exit') && typeof msg.xml === 'string') {
          void broadcastSavedXmlToStudio(msg.xml, 'Saved from Fullscreen Draw.io Tab').then(() => {
            if (msg.event === 'exit') {
              window.close();
            }
          });
        }
      } catch {
        // Ignore non-JSON postMessages
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [xml, diagramId]);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Top Light-Theme Sync Bar */}
      <header className="h-12 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.close()}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio Tab</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Draw.io Live Bidirectional Editor:</span>
            <span className="text-blue-700 font-mono">{projectTitle}</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px]">
              Base {versionTag}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {syncStatus === 'synced' && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{syncDetail || 'Synced to Studio Canvas & Version History'}</span>
            </span>
          )}
          {syncStatus === 'error' && (
            <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Sync failed — retry save</span>
            </span>
          )}
          <button
            id="drawio-tab-save-sync-btn"
            onClick={() =>
              void broadcastSavedXmlToStudio(
                latestXmlRef.current || xml,
                'Manual Edit Saved in Draw.io Tab'
              )
            }
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save &amp; Sync Back</span>
          </button>
        </div>
      </header>

      {/* Embedded Full-Screen Draw.io Editor */}
      <div className="flex-1 w-full h-full bg-white">
        <iframe
          ref={iframeRef}
          title="Full-Screen Draw.io Bidirectional Editor"
          src="https://embed.diagrams.net/?embed=1&proto=json&spin=1&ui=kennedy&saveAndExit=1&noExitBtn=0"
          referrerPolicy="no-referrer"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
