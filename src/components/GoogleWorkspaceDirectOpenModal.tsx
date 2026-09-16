'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ExternalLink,
  Presentation,
  FileText,
  Sparkles,
  Check,
  Copy,
  CloudUpload,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Download,
  Loader2,
  Layers,
  Eye,
  Edit3,
  Globe,
} from 'lucide-react';
import { parseDrawioXmlForPptx, exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import { exportDrawioToEditableDocx } from '@/lib/export/editableDocxCompiler';
import { exportDiagramPng } from '@/lib/export/diagramRaster';

interface GoogleWorkspaceDirectOpenModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'slides' | 'docs';
  xmlContent: string;
  diagramName: string;
  blueprintId: string;
  masterImageSrc?: string;
}

function cleanCellText(html: string): { title: string; subtitle: string } {
  if (!html) return { title: '', subtitle: '' };
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  const noSvg = decoded.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  const lines = noSvg
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  return {
    title: lines[0] || '',
    subtitle: lines.slice(1).join(' • ') || '',
  };
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      const base64Idx = res.indexOf(';base64,');
      resolve(base64Idx !== -1 ? res.substring(base64Idx + 8) : res);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function GoogleWorkspaceDirectOpenModal({
  isOpen,
  onClose,
  mode,
  xmlContent,
  diagramName,
  blueprintId,
  masterImageSrc,
}: GoogleWorkspaceDirectOpenModalProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pngPreviewUrl, setPngPreviewUrl] = useState<string | null>(masterImageSrc || null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState<boolean>(false);

  // Cloud / OAuth states
  const [googleAccessToken, setGoogleAccessToken] = useState<string>('');
  const [googleClientId, setGoogleClientId] = useState<string>('');
  const [showAuthConfig, setShowAuthConfig] = useState<boolean>(false);
  const [isUploadingToGoogleDrive, setIsUploadingToGoogleDrive] = useState<boolean>(false);
  const [isOpeningCloudViewer, setIsOpeningCloudViewer] = useState<boolean>(false);
  const [isCopyingAndLaunching, setIsCopyingAndLaunching] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
    url?: string;
  } | null>(null);

  // Interactive editable nodes state for Slide 1
  const parsedTopology = useMemo(() => {
    if (!xmlContent) return { cells: [], minX: 0, minY: 0, maxX: 1485, maxY: 840 };
    return parseDrawioXmlForPptx(xmlContent);
  }, [xmlContent]);

  const [editableOverrides, setEditableOverrides] = useState<Record<string, { title: string; subtitle: string }>>({});
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('pc_google_drive_access_token') || '';
      const savedClientId = localStorage.getItem('pc_google_oauth_client_id') || '';
      setGoogleAccessToken(savedToken);
      setGoogleClientId(savedClientId);
    }
  }, []);

  useEffect(() => {
    if (masterImageSrc) {
      setPngPreviewUrl(masterImageSrc);
      setIsGeneratingPreview(false);
      return;
    }
    if (!isOpen || !xmlContent) return;
    let cancelled = false;
    setIsGeneratingPreview(true);
    exportDiagramPng(xmlContent, { scale: 2, transparent: false })
      .then((dataUrl) => {
        if (!cancelled && dataUrl) {
          setPngPreviewUrl(dataUrl);
        }
      })
      .catch((err) => console.warn('Preview rasterization warning:', err))
      .finally(() => {
        if (!cancelled) setIsGeneratingPreview(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, xmlContent, masterImageSrc]);

  // Keyboard navigation for slides
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveSlideIndex((prev) => Math.min(2, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen]);

  if (!isOpen) return null;

  const vertices = parsedTopology.cells.filter((c) => c.vertex);
  const edges = parsedTopology.cells.filter((c) => c.edge);
  const graphW = Math.max(800, parsedTopology.maxX - parsedTopology.minX);
  const graphH = Math.max(500, parsedTopology.maxY - parsedTopology.minY);

  const handleSaveAuthSettings = (token: string, clientId: string) => {
    setGoogleAccessToken(token);
    setGoogleClientId(clientId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pc_google_drive_access_token', token);
      localStorage.setItem('pc_google_oauth_client_id', clientId);
    }
  };

  /**
   * Method 1: Direct 1-Click Upload & Conversion in Google Drive API -> Opens native populated Google Slide / Google Doc
   */
  const handleDirectGoogleDriveOpen = async () => {
    setIsUploadingToGoogleDrive(true);
    setStatusMessage({
      type: 'info',
      text: `Compiling 100% editable ${mode === 'slides' ? 'vector slide shapes (.pptx)' : 'specification tables (.docx)'} in memory...`,
    });

    try {
      let blob: Blob | void;
      if (mode === 'slides') {
        blob = await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, { returnBlob: true });
      } else {
        blob = await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, { returnBlob: true });
      }

      if (!blob) {
        throw new Error('Failed to compile in-memory document blob.');
      }

      const base64Data = await blobToBase64(blob);

      // Check if user has a Google Access Token or wants to trigger Google Identity OAuth Popup
      let activeToken = googleAccessToken.trim();

      if (!activeToken && googleClientId.trim() && typeof window !== 'undefined') {
        // Dynamically load Google Identity Services script if needed
        setStatusMessage({
          type: 'info',
          text: 'Opening Google Sign-In popup to authorize 1-click Drive file creation...',
        });
        activeToken = await new Promise<string>((resolve, reject) => {
          const scriptId = 'google-gsi-client-script';
          const initGsi = () => {
            const googleObj = (window as any).google;
            if (!googleObj?.accounts?.oauth2) {
              reject(new Error('Google Identity Services failed to initialize'));
              return;
            }
            const tokenClient = googleObj.accounts.oauth2.initTokenClient({
              client_id: googleClientId.trim(),
              scope: 'https://www.googleapis.com/auth/drive.file',
              callback: (resp: any) => {
                if (resp.error) {
                  reject(new Error(resp.error_description || resp.error));
                } else if (resp.access_token) {
                  handleSaveAuthSettings(resp.access_token, googleClientId);
                  resolve(resp.access_token);
                }
              },
            });
            tokenClient.requestAccessToken({ prompt: 'consent' });
          };

          if (document.getElementById(scriptId)) {
            initGsi();
          } else {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = initGsi;
            script.onerror = () => reject(new Error('Could not load Google Identity Services script'));
            document.body.appendChild(script);
          }
        });
      }

      setStatusMessage({
        type: 'info',
        text: activeToken
          ? `Uploading directly to your Google Drive & converting into native ${mode === 'slides' ? 'Google Slides presentation' : 'Google Doc'}...`
          : `Creating Cloud Bridge URL for browser viewer...`,
      });

      const res = await fetch('/api/export/cloud-bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blueprintId,
          title: diagramName,
          format: mode === 'slides' ? 'pptx' : 'docx',
          base64Data,
          googleAccessToken: activeToken || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Cloud bridge request failed');
      }

      if (data.googleWebViewLink) {
        setStatusMessage({
          type: 'success',
          text: `🎉 Created native ${mode === 'slides' ? 'Google Slides Presentation' : 'Google Doc'} with diagram already populated! Opening tab...`,
          url: data.googleWebViewLink,
        });
        window.open(data.googleWebViewLink, '_blank');
      } else {
        // If no OAuth token was provided, open via Google Docs Cloud Viewer if public HTTPS, or open Auth helper
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (!isLocalhost && data.googleViewerUrl) {
          setStatusMessage({
            type: 'success',
            text: `✨ Opened populated ${mode === 'slides' ? 'Presentation' : 'Document'} in Google Cloud Viewer! Click "Open with Google ${mode === 'slides' ? 'Slides' : 'Docs'}" at the top of the viewer tab.`,
            url: data.googleViewerUrl,
          });
          window.open(data.googleViewerUrl, '_blank');
        } else {
          setShowAuthConfig(true);
          setStatusMessage({
            type: 'info',
            text: `To create a live editable file directly inside your personal Google Drive (${mode === 'slides' ? 'docs.google.com/presentation' : 'docs.google.com/document'}), paste a Google OAuth Access Token below, OR use the Live Browser Slide Studio right below!`,
          });
        }
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Direct Google Drive upload encountered an error.',
      });
    } finally {
      setIsUploadingToGoogleDrive(false);
    }
  };

  /**
   * Method 2: Open Populated Deck in Google Cloud Viewer (`https://docs.google.com/viewer?url=...`)
   */
  const handleOpenGoogleCloudViewer = async () => {
    setIsOpeningCloudViewer(true);
    setStatusMessage({
      type: 'info',
      text: `Generating temporary Cloud Bridge URL for populated ${mode === 'slides' ? '.pptx Slide Deck' : '.docx Document'}...`,
    });

    try {
      let blob: Blob | void;
      if (mode === 'slides') {
        blob = await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, { returnBlob: true });
      } else {
        blob = await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, { returnBlob: true });
      }
      if (!blob) throw new Error('Failed to compile blob');

      const base64Data = await blobToBase64(blob);
      const res = await fetch('/api/export/cloud-bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blueprintId,
          title: diagramName,
          format: mode === 'slides' ? 'pptx' : 'docx',
          base64Data,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Cloud bridge failed');

      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const targetUrl = isLocalhost
        ? `https://promptcanvas.up.railway.app/api/export/cloud-bridge?id=${data.bridgeId}&ext=.${mode === 'slides' ? 'pptx' : 'docx'}`
        : data.publicUrl;

      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(targetUrl)}&embedded=false`;
      setStatusMessage({
        type: 'success',
        text: `🌐 Opened populated ${mode === 'slides' ? 'Slide Deck' : 'Specification'} in Google Cloud Viewer!`,
        url: viewerUrl,
      });
      window.open(viewerUrl, '_blank');
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to launch Google Cloud Viewer',
      });
    } finally {
      setIsOpeningCloudViewer(false);
    }
  };

  /**
   * Method 3: Auto-Copy Populated Rich HTML + High-Res Image & Open slides.new / docs.new
   */
  const handleCopyAndLaunchNewTab = async () => {
    setIsCopyingAndLaunching(true);
    try {
      const displayNodes = vertices.filter((v) => cleanCellText(v.value).title.length > 0);
      const tableHtmlRows = displayNodes
        .map((n, idx) => {
          const { title, subtitle } = cleanCellText(n.value);
          return `<tr>
            <td style="border:1px solid #cbd5e1;padding:8px;font-weight:bold;color:#0f172a;">OBJ-${String(idx + 1).padStart(2, '0')}</td>
            <td style="border:1px solid #cbd5e1;padding:8px;font-weight:bold;color:#1e3a8a;">${title}</td>
            <td style="border:1px solid #cbd5e1;padding:8px;color:#334155;">${subtitle || 'Enterprise Cloud Node'}</td>
          </tr>`;
        })
        .join('');

      const richHtml = `
        <div style="font-family: Arial, sans-serif; color: #0f172a;">
          <h1 style="color: #0f172a; font-size: 22pt; margin-bottom: 4px;">${diagramName} (${blueprintId})</h1>
          <p style="color: #475569; font-size: 11pt; margin-top: 0;">Generated by PromptCanvas Vision Decompiler • 100% Editable Architecture</p>
          ${pngPreviewUrl ? `<div style="margin: 16px 0;"><img src="${pngPreviewUrl}" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 8px;" /></div>` : ''}
          <h2 style="color: #0f172a; font-size: 15pt; margin-top: 20px;">Architectural Component Specification Table (${displayNodes.length} Nodes)</h2>
          <table style="border-collapse: collapse; width: 100%; margin-top: 8px; font-size: 10pt;">
            <thead>
              <tr style="background-color: #0f172a; color: #ffffff;">
                <th style="border:1px solid #0f172a;padding:8px;text-align:left;">Object ID</th>
                <th style="border:1px solid #0f172a;padding:8px;text-align:left;">Component Name</th>
                <th style="border:1px solid #0f172a;padding:8px;text-align:left;">Architectural Role & Specification</th>
              </tr>
            </thead>
            <tbody>${tableHtmlRows}</tbody>
          </table>
        </div>
      `;

      const clipboardItems: Record<string, Blob> = {
        'text/html': new Blob([richHtml], { type: 'text/html' }),
        'text/plain': new Blob([`${diagramName} (${blueprintId}) - Architecture Specification`], { type: 'text/plain' }),
      };

      if (pngPreviewUrl && mode === 'slides') {
        const res = await fetch(pngPreviewUrl);
        const imgBlob = await res.blob();
        clipboardItems['image/png'] = imgBlob;
      }

      await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);

      const targetUrl = mode === 'slides' ? 'https://slides.new' : 'https://docs.new';
      window.open(targetUrl, '_blank');

      setStatusMessage({
        type: 'success',
        text: `✅ Copied entire ${mode === 'slides' ? 'Architecture Diagram & Slide Spec' : 'Formatted Google Doc & Editable Tables'} to your clipboard and opened ${targetUrl}! Simply press ⌘V (or Ctrl+V) inside the new Google tab!`,
        url: targetUrl,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Clipboard copy warning: ' + (err?.message || 'Please allow clipboard permissions'),
      });
    } finally {
      setIsCopyingAndLaunching(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 md:p-6 ${
        isFullscreen ? 'p-0' : ''
      }`}
      data-testid="google-workspace-direct-open-modal"
    >
      <div
        className={`bg-[#0B111E] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-[1440px] h-[90vh]'
        }`}
      >
        {/* Top Dark Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#090D16] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${
                mode === 'slides'
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400'
                  : 'bg-sky-500/15 border border-sky-500/40 text-sky-400'
              }`}
            >
              {mode === 'slides' ? <Presentation className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {mode === 'slides'
                    ? 'In-Browser Google Slides Studio & Direct Cloud Open'
                    : 'In-Browser Google Docs Specification Studio & Direct Cloud Open'}
                </h2>
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Zero Local Download Required
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Blueprint <span className="text-sky-400 font-mono font-semibold">{blueprintId}</span> •{' '}
                <span className="text-slate-200 font-medium">{diagramName}</span> • Populated with{' '}
                <span className="text-emerald-400 font-semibold">{vertices.length} editable vector objects</span>
              </p>
            </div>
          </div>

          {/* Direct Cloud Launch Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Button 1: 1-Click Direct Google Drive API Creation */}
            <button
              onClick={handleDirectGoogleDriveOpen}
              disabled={isUploadingToGoogleDrive}
              data-testid="direct-google-drive-open-btn"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all cursor-pointer ${
                mode === 'slides'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white'
              }`}
            >
              {isUploadingToGoogleDrive ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CloudUpload className="w-4 h-4" />
              )}
              <span>
                {mode === 'slides'
                  ? '1-Click Create & Open in Google Slides ↗'
                  : '1-Click Create & Open in Google Docs ↗'}
              </span>
            </button>

            {/* Button 2: Google Cloud Viewer (Zero-Auth Populated Preview Tab) */}
            <button
              onClick={handleOpenGoogleCloudViewer}
              disabled={isOpeningCloudViewer}
              data-testid="open-google-cloud-viewer-btn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-all cursor-pointer"
            >
              {isOpeningCloudViewer ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4 text-sky-400" />}
              <span>Open Populated in Google Viewer ↗</span>
            </button>

            {/* Button 3: Auto-Copy & Open slides.new / docs.new */}
            <button
              onClick={handleCopyAndLaunchNewTab}
              disabled={isCopyingAndLaunching}
              data-testid="copy-and-launch-new-tab-btn"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              title="Copies rich diagram & editable table to clipboard and launches Google tab"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copy & Launch {mode === 'slides' ? 'slides.new' : 'docs.new'} (⌘V)</span>
            </button>

            {/* OAuth Config Toggle */}
            <button
              onClick={() => setShowAuthConfig(!showAuthConfig)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                showAuthConfig || googleAccessToken
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Configure Google Drive OAuth Token / Client ID for instant 1-click cloud file creation"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Present Fullscreen Slideshow'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              data-testid="close-google-workspace-modal-btn"
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status / Notification Banner */}
        {statusMessage && (
          <div
            className={`px-6 py-3 flex items-center justify-between gap-4 border-b text-xs font-medium ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-950/70 border-rose-500/40 text-rose-200'
                : 'bg-sky-950/70 border-sky-500/40 text-sky-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{statusMessage.text}</span>
            </div>
            {statusMessage.url && (
              <a
                href={statusMessage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold shrink-0 transition-all"
              >
                <span>Open Tab Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Expandable Google Drive OAuth Quick-Connect Drawer */}
        {showAuthConfig && (
          <div className="px-6 py-4 bg-slate-900/95 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Direct Google Drive API Integration (Optional for 1-Click Native Creation)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Provide a Google Drive OAuth2 Access Token (with <code className="text-sky-300">drive.file</code> scope from{' '}
                <a
                  href="https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline hover:text-sky-300"
                >
                  Google OAuth Playground ↗
                </a>
                ) to create & open native Google Slides / Docs directly in your personal Google Drive with 1 click.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <input
                type="password"
                value={googleAccessToken}
                onChange={(e) => handleSaveAuthSettings(e.target.value, googleClientId)}
                placeholder="Paste Google OAuth Access Token (ya29.a0...)"
                className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 w-full md:w-72 focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => {
                  handleDirectGoogleDriveOpen();
                }}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
              >
                Save & Launch Now
              </button>
            </div>
          </div>
        )}

        {/* Main Workspace Body: In-Browser Populated Slide Deck OR Google Docs Spec */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F8FAFC] text-slate-900">
          {mode === 'slides' ? (
            <>
              {/* Left Slide Thumbnail Rail (Google Slides style) */}
              <div className="w-full md:w-64 bg-slate-100 border-r border-slate-200 p-4 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 hidden md:block">
                  Populated Slides (3)
                </div>

                {[
                  {
                    idx: 0,
                    title: 'Slide 1: Editable Vector Topology',
                    subtitle: `${vertices.length} Native Vector Nodes`,
                    badge: '100% Editable Shapes',
                  },
                  {
                    idx: 1,
                    title: 'Slide 2: Master Visual Reference',
                    subtitle: 'High-Resolution Widescreen 16:9',
                    badge: '1:1 Visual Twin',
                  },
                  {
                    idx: 2,
                    title: 'Slide 3: Component Spec Matrix',
                    subtitle: 'Object Inventory & Roles Table',
                    badge: 'Editable Table',
                  },
                ].map((slide) => (
                  <button
                    key={slide.idx}
                    onClick={() => setActiveSlideIndex(slide.idx)}
                    data-testid={`slide-thumbnail-${slide.idx}`}
                    className={`flex flex-col text-left p-3 rounded-xl border-2 transition-all cursor-pointer shrink-0 w-56 md:w-full ${
                      activeSlideIndex === slide.idx
                        ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-900">Slide {slide.idx + 1}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                        {slide.badge}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 truncate">{slide.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{slide.subtitle}</div>
                  </button>
                ))}

                {/* Slide Navigation & Info Card */}
                <div className="mt-auto pt-4 border-t border-slate-200 hidden md:block space-y-2">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Interactive Browser Canvas</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Click any node on Slide 1 to edit its text inline right here in your browser, or click{' '}
                      <strong>1-Click Create & Open in Google Slides</strong> above!
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Main Widescreen 16:9 Slide Canvas Stage */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-slate-200/70 overflow-auto relative">
                {/* Slide Stage Controls */}
                <div className="flex items-center justify-between w-full max-w-[1080px] mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">
                      Slide {activeSlideIndex + 1} of 3
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {activeSlideIndex === 0
                        ? '100% Native Vector Shapes Canvas (Click any box to edit text)'
                        : activeSlideIndex === 1
                        ? 'Widescreen 16:9 Master High-Resolution Architecture'
                        : 'Editable Component Inventory & Specification Matrix'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveSlideIndex((p) => Math.max(0, p - 1))}
                      disabled={activeSlideIndex === 0}
                      className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveSlideIndex((p) => Math.min(2, p + 1))}
                      disabled={activeSlideIndex === 2}
                      className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Widescreen 16:9 Slide Container */}
                <div
                  className="w-full max-w-[1080px] aspect-[16/9] bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden relative"
                  data-testid="live-browser-slide-canvas"
                >
                  {/* Slide Top Header Banner (Matches PPTX Slide Header) */}
                  <div className="h-12 bg-[#0F172A] px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sky-400 font-bold text-sm tracking-wide uppercase">
                        {diagramName}
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-slate-300 text-xs font-medium">
                        {activeSlideIndex === 0
                          ? `Interactive Editable Vector Topology (${blueprintId})`
                          : activeSlideIndex === 1
                          ? `High-Resolution Master Reference (${blueprintId})`
                          : `Component Specification & Role Inventory (${blueprintId})`}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">16:9 WIDESCREEN SLIDE</span>
                  </div>

                  {/* SLIDE 1 CONTENT: Interactive Editable Vector Topology */}
                  {activeSlideIndex === 0 && (
                    <div className="flex-1 relative bg-[#0B111E] overflow-hidden p-4">
                      {/* Render SVG connectors in background */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox={`${parsedTopology.minX - 20} ${parsedTopology.minY - 20} ${graphW + 40} ${graphH + 40}`}
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <defs>
                          <marker
                            id="slide-arrow"
                            viewBox="0 0 10 10"
                            refX="6"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                          >
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38BDF8" />
                          </marker>
                        </defs>
                        {edges.map((edge, eIdx) => {
                          const src = vertices.find((v) => v.id === edge.source);
                          const tgt = vertices.find((v) => v.id === edge.target);
                          if (!src || !tgt) return null;
                          const x1 = src.absX + src.width / 2;
                          const y1 = src.absY + src.height / 2;
                          const x2 = tgt.absX + tgt.width / 2;
                          const y2 = tgt.absY + tgt.height / 2;
                          return (
                            <g key={edge.id || eIdx}>
                              <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={edge.style.strokeColor || '#38BDF8'}
                                strokeWidth="2.5"
                                strokeDasharray={edge.style.dashed === '1' ? '6,4' : undefined}
                                markerEnd="url(#slide-arrow)"
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {/* Render Interactive Editable Vector Boxes */}
                      <div className="relative w-full h-full">
                        {vertices.map((node) => {
                          const leftPct = ((node.absX - parsedTopology.minX) / graphW) * 92 + 4;
                          const topPct = ((node.absY - parsedTopology.minY) / graphH) * 88 + 6;
                          const widthPct = Math.max(8, (node.width / graphW) * 92);
                          const heightPct = Math.max(7, (node.height / graphH) * 88);

                          const parsedText = cleanCellText(node.value);
                          const override = editableOverrides[node.id];
                          const title = override ? override.title : parsedText.title;
                          const subtitle = override ? override.subtitle : parsedText.subtitle;

                          if (!title && node.width * node.height > 250000) {
                            // Large background container frame
                            return (
                              <div
                                key={node.id}
                                style={{
                                  left: `${leftPct}%`,
                                  top: `${topPct}%`,
                                  width: `${widthPct}%`,
                                  height: `${heightPct}%`,
                                }}
                                className="absolute rounded-xl border border-sky-500/30 bg-slate-900/40 pointer-events-none"
                              />
                            );
                          }

                          const isSelected = selectedNodeId === node.id;

                          return (
                            <div
                              key={node.id}
                              onClick={() => setSelectedNodeId(node.id)}
                              style={{
                                left: `${leftPct}%`,
                                top: `${topPct}%`,
                                width: `${widthPct}%`,
                                minHeight: `${heightPct}%`,
                              }}
                              className={`absolute rounded-lg p-1.5 flex flex-col justify-center transition-all cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-sky-950/95 border-2 border-amber-400 shadow-lg z-30 ring-2 ring-amber-400/30'
                                  : 'bg-slate-900/90 hover:bg-slate-800/95 border border-sky-500/50 z-10'
                              }`}
                            >
                              {isSelected ? (
                                <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                      setEditableOverrides((prev) => ({
                                        ...prev,
                                        [node.id]: { title: e.target.value, subtitle },
                                      }))
                                    }
                                    className="w-full bg-slate-950 text-amber-300 font-bold text-[10px] px-1 py-0.5 rounded border border-amber-400/50 focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) =>
                                      setEditableOverrides((prev) => ({
                                        ...prev,
                                        [node.id]: { title, subtitle: e.target.value },
                                      }))
                                    }
                                    placeholder="Subtitle / Role"
                                    className="w-full bg-slate-950 text-slate-300 text-[9px] px-1 py-0.5 rounded border border-slate-700 focus:outline-none"
                                  />
                                </div>
                              ) : (
                                <>
                                  <div className="text-[10px] font-bold text-sky-300 leading-tight text-center truncate px-1">
                                    {title || 'Architecture Node'}
                                  </div>
                                  {subtitle && (
                                    <div className="text-[8.5px] text-slate-300 leading-tight text-center truncate px-1 mt-0.5">
                                      {subtitle}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2 CONTENT: High-Resolution Master Architecture Visual */}
                  {activeSlideIndex === 1 && (
                    <div className="flex-1 flex items-center justify-center bg-[#090D16] p-6 overflow-hidden">
                      {isGeneratingPreview ? (
                        <div className="flex flex-col items-center gap-3 text-slate-400">
                          <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
                          <span className="text-xs font-medium">Rendering High-Resolution Master Slide...</span>
                        </div>
                      ) : pngPreviewUrl ? (
                        <img
                          src={pngPreviewUrl}
                          alt={diagramName}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg border border-slate-800"
                        />
                      ) : (
                        <div className="text-xs text-slate-400">High-resolution visual preview ready</div>
                      )}
                    </div>
                  )}

                  {/* SLIDE 3 CONTENT: Editable Component Specification Table */}
                  {activeSlideIndex === 2 && (
                    <div className="flex-1 bg-white p-6 overflow-y-auto">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">
                        Architectural Component Specification & Topology Inventory
                      </h3>
                      <table className="w-full border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            <th className="p-2.5 text-left border border-slate-800 w-24">Object ID</th>
                            <th className="p-2.5 text-left border border-slate-800 w-64">Component Name</th>
                            <th className="p-2.5 text-left border border-slate-800">Architectural Role & Specification</th>
                            <th className="p-2.5 text-left border border-slate-800 w-32">Classification</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vertices
                            .filter((v) => cleanCellText(v.value).title.length > 0)
                            .slice(0, 14)
                            .map((node, idx) => {
                              const { title, subtitle } = cleanCellText(node.value);
                              const isContainer = node.width * node.height > 90000;
                              return (
                                <tr key={node.id} className="border-b border-slate-200 hover:bg-slate-50">
                                  <td className="p-2 font-mono font-bold text-slate-900">
                                    OBJ-{String(idx + 1).padStart(2, '0')}
                                  </td>
                                  <td className="p-2 font-bold text-blue-900">{title}</td>
                                  <td className="p-2 text-slate-600">{subtitle || 'Core Enterprise Cloud Service'}</td>
                                  <td className="p-2">
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        isContainer
                                          ? 'bg-purple-100 text-purple-800'
                                          : 'bg-sky-100 text-sky-800'
                                      }`}
                                    >
                                      {isContainer ? 'Enclave / Tier' : 'Service Node'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* GOOGLE DOCS SPECIFICATION LIVE STUDIO VIEW */
            <div className="flex-1 overflow-y-auto bg-slate-200/80 p-4 md:p-8 flex justify-center">
              <div
                className="w-full max-w-[920px] bg-white shadow-2xl rounded-xl border border-slate-300 p-8 md:p-12 space-y-6 text-slate-900"
                data-testid="live-browser-docs-canvas"
              >
                <div className="border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Google Docs Technical Architecture Specification</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{diagramName}</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Blueprint ID: <span className="font-mono font-bold text-slate-700">{blueprintId}</span> • Compiled for
                    100% Editable Google Docs Collaboration
                  </p>
                </div>

                {/* High-Res Embedded Diagram Section */}
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">1. Master Architecture Topology Diagram</h2>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {pngPreviewUrl ? (
                      <img src={pngPreviewUrl} alt={diagramName} className="max-h-[420px] w-auto rounded-lg" />
                    ) : (
                      <div className="py-12 text-xs text-slate-400">Loading high-resolution architecture visual...</div>
                    )}
                  </div>
                </div>

                {/* Editable Component Table Section */}
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    2. Component Inventory & Technical Specification Matrix ({vertices.length} Objects)
                  </h2>
                  <table className="w-full border-collapse text-xs border border-slate-300">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        <th className="p-2.5 text-left border border-slate-700 w-24">Object ID</th>
                        <th className="p-2.5 text-left border border-slate-700 w-60">Component Name</th>
                        <th className="p-2.5 text-left border border-slate-700">Technical Role & Specification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vertices
                        .filter((v) => cleanCellText(v.value).title.length > 0)
                        .map((node, idx) => {
                          const { title, subtitle } = cleanCellText(node.value);
                          return (
                            <tr key={node.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="p-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">
                                OBJ-{String(idx + 1).padStart(2, '0')}
                              </td>
                              <td className="p-2.5 font-bold text-blue-950 border-r border-slate-200">{title}</td>
                              <td className="p-2.5 text-slate-700">{subtitle || 'Enterprise Cloud Node'}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
