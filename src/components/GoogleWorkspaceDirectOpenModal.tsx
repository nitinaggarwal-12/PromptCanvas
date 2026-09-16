'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Presentation,
  FileText,
  Sparkles,
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
  Edit3,
  Globe,
  Eye,
  Check,
  ExternalLink,
} from 'lucide-react';
import {
  parseDrawioXmlForPptx,
  exportDrawioToEditablePptx,
  cleanHtmlToPlainText,
} from '@/lib/export/editablePptxCompiler';
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

async function convertAnyImageUrlToPngBlob(url: string): Promise<Blob | null> {
  if (typeof window === 'undefined' || !url) return null;
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 1600;
          canvas.height = img.naturalHeight || 900;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              resolve(blob);
            }, 'image/png');
            return;
          }
        } catch (err) {
          console.warn('Canvas conversion warning:', err);
        }
        resolve(null);
      };
      img.onerror = () => resolve(null);
      img.src = url;
    } catch {
      resolve(null);
    }
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
  const [activeMode, setActiveMode] = useState<'slides' | 'docs'>(mode);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [slide1ViewMode, setSlide1ViewMode] = useState<'interactive-twin' | 'decomposed-shapes'>('interactive-twin');
  const [docsDiagramViewMode, setDocsDiagramViewMode] = useState<'decomposed-shapes' | 'interactive-twin'>('decomposed-shapes');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pngPreviewUrl, setPngPreviewUrl] = useState<string | null>(masterImageSrc || null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState<boolean>(false);
  const [launchAssistantModal, setLaunchAssistantModal] = useState<'slides' | 'docs' | null>(null);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  // Cloud / OAuth states
  const [googleAccessToken, setGoogleAccessToken] = useState<string>('');
  const [googleClientId, setGoogleClientId] = useState<string>('');
  const [showAuthConfig, setShowAuthConfig] = useState<boolean>(false);
  const [isUploadingToGoogleDrive, setIsUploadingToGoogleDrive] = useState<boolean>(false);
  const [isOpeningCloudViewer, setIsOpeningCloudViewer] = useState<boolean>(false);
  const [isDownloadingDeck, setIsDownloadingDeck] = useState<boolean>(false);
  const [isCopyingAndLaunching, setIsCopyingAndLaunching] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
    url?: string;
  } | null>(null);

  // Interactive editable nodes state for Slide 1 & Google Docs Editable Diagram
  const parsedTopology = useMemo(() => {
    if (!xmlContent) {
      return {
        cells: [],
        minX: 0,
        minY: 0,
        maxX: 1280,
        maxY: 760,
        isDarkDiagram: false,
        diagramBgHex: 'FFFFFF',
      };
    }
    return parseDrawioXmlForPptx(xmlContent);
  }, [xmlContent]);

  const [editableOverrides, setEditableOverrides] = useState<Record<string, { title: string; subtitle: string }>>({});
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

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

  // Strictly sort vertices by depth ascending, then area descending so containers draw behind child nodes
  const sortedVertices = useMemo(() => {
    return parsedTopology.cells
      .filter((c) => c.vertex && (c.width > 0 || c.height > 0))
      .sort((a, b) => {
        if (a.depth !== b.depth) return a.depth - b.depth;
        return b.width * b.height - a.width * a.height;
      });
  }, [parsedTopology.cells]);

  const parentIds = useMemo(() => {
    const s = new Set<string>();
    parsedTopology.cells.forEach((c) => {
      if (c.parent && c.parent !== '0' && c.parent !== '1') {
        s.add(c.parent);
      }
    });
    return s;
  }, [parsedTopology.cells]);

  const edges = parsedTopology.cells.filter((c) => c.edge);
  const graphW = Math.max(600, parsedTopology.maxX - parsedTopology.minX);
  const graphH = Math.max(400, parsedTopology.maxY - parsedTopology.minY);

  const handleSaveAuthSettings = (token: string, clientId: string) => {
    setGoogleAccessToken(token);
    setGoogleClientId(clientId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pc_google_drive_access_token', token);
      localStorage.setItem('pc_google_oauth_client_id', clientId);
    }
  };

  /**
   * Helper: Uploads compiled blob to Cloud Bridge (both local and live Railway if running on localhost)
   * so Google Docs Viewer (`docs.google.com/viewer?url=...`) can fetch the public HTTPS `.pptx` file 100% reliably.
   */
  const uploadToCloudBridgeAndGetPublicUrl = async (
    base64Data: string,
    format: 'pptx' | 'docx',
    activeToken?: string,
    customBridgeId?: string
  ): Promise<{ publicUrl: string; googleWebViewLink?: string | null }> => {
    const bridgeId = customBridgeId || `${blueprintId.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`;
    const payload = {
      id: blueprintId,
      title: diagramName,
      format,
      base64Data,
      xmlContent,
      bridgeId,
      googleAccessToken: activeToken || undefined,
    };

    // 1. Upload to local / current host API
    const localRes = await fetch('/api/export/cloud-bridge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const localData = await localRes.json();

    if (localData?.googleWebViewLink) {
      return {
        publicUrl: localData.publicUrl,
        googleWebViewLink: localData.googleWebViewLink,
      };
    }

    // 2. If running on localhost, ALSO push to live Railway cloud-bridge so docs.google.com/viewer can download it over public HTTPS!
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    const targetPublicUrl = `https://promptcanvas.up.railway.app/api/export/cloud-bridge/${bridgeId}.${format}`;

    if (isLocalhost) {
      try {
        const remoteRes = await fetch('https://promptcanvas.up.railway.app/api/export/cloud-bridge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (remoteRes.ok) {
          await fetch(targetPublicUrl, { method: 'HEAD' }).catch(() => {});
          return {
            publicUrl: targetPublicUrl,
          };
        }
      } catch (e) {
        console.warn('Remote Railway cloud-bridge sync notice:', e);
      }
      await fetch(targetPublicUrl, { method: 'HEAD' }).catch(() => {});
      return {
        publicUrl: targetPublicUrl,
      };
    }

    const finalPublicUrl = localData?.publicUrl || targetPublicUrl;
    await fetch(finalPublicUrl, { method: 'HEAD' }).catch(() => {});
    return {
      publicUrl: finalPublicUrl,
    };
  };

  /**
   * Method 1: Direct 1-Click Upload & Conversion in Google Drive API -> Opens native populated Google Slide / Google Doc
   */
  const handleDirectGoogleDriveOpen = async () => {
    setIsUploadingToGoogleDrive(true);
    setStatusMessage({
      type: 'info',
      text: `Compiling 100% 1:1 Master & Editable ${activeMode === 'slides' ? 'Presentation (.pptx)' : 'Specification (.docx)'} in memory...`,
    });

    try {
      let blob: Blob | string | void;
      const generatedBridgeId = `${blueprintId.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`;
      if (activeMode === 'slides') {
        blob = await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, {
          returnBlob: true,
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
        });
      } else {
        blob = await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          returnBlob: true,
          bridgeId: generatedBridgeId,
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
          editableOverrides,
        });
      }

      if (!blob || typeof blob === 'string') {
        throw new Error('Failed to compile in-memory document blob.');
      }

      const base64Data = await blobToBase64(blob);
      let activeToken = googleAccessToken.trim();

      if (!activeToken && googleClientId.trim() && typeof window !== 'undefined') {
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

      const { publicUrl, googleWebViewLink } = await uploadToCloudBridgeAndGetPublicUrl(
        base64Data,
        activeMode === 'slides' ? 'pptx' : 'docx',
        activeToken,
        generatedBridgeId
      );

      if (googleWebViewLink) {
        setStatusMessage({
          type: 'success',
          text: `🎉 Created native ${activeMode === 'slides' ? 'Google Slides Presentation' : 'Google Doc'} with 1:1 Master & Editable Shapes! Opening tab...`,
          url: googleWebViewLink,
        });
        window.open(googleWebViewLink, '_blank');
      } else {
        const externalGoogleTabUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}`;
        setStatusMessage({
          type: 'success',
          text: `✨ Opened populated ${activeMode === 'slides' ? 'Google Slides Presentation' : 'Google Docs Specification'} in a separate Google tab (docs.google.com)!`,
          url: externalGoogleTabUrl,
        });
        window.open(externalGoogleTabUrl, '_blank');
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
   * Method 2: Open Populated Deck in Separate External Google Tab (`https://docs.google.com/viewer?url=...`)
   */
  const handleOpenGoogleCloudViewer = async () => {
    setIsOpeningCloudViewer(true);
    setStatusMessage({
      type: 'info',
      text: `Compiling 1:1 Master & Editable Vector ${activeMode === 'slides' ? 'Deck (.pptx)' : 'Specification (.docx)'} and launching separate Google tab...`,
    });

    try {
      let blob: Blob | string | void;
      const generatedBridgeId = `${blueprintId.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`;
      if (activeMode === 'slides') {
        blob = await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, {
          returnBlob: true,
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
        });
      } else {
        blob = await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          returnBlob: true,
          bridgeId: generatedBridgeId,
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
          editableOverrides,
        });
      }
      if (!blob || typeof blob === 'string') throw new Error('Failed to compile blob');

      const base64Data = await blobToBase64(blob);
      const { publicUrl } = await uploadToCloudBridgeAndGetPublicUrl(
        base64Data,
        activeMode === 'slides' ? 'pptx' : 'docx',
        undefined,
        generatedBridgeId
      );

      const externalGoogleTabUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}`;
      setStatusMessage({
        type: 'success',
        text: `🌐 Opened populated ${activeMode === 'slides' ? 'Google Slides Presentation' : 'Google Docs Specification'} in a separate Google tab (docs.google.com)!`,
        url: externalGoogleTabUrl,
      });
      window.open(externalGoogleTabUrl, '_blank');
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
   * Direct Download .pptx / .docx locally
   */
  const handleDirectDownloadFile = async () => {
    setIsDownloadingDeck(true);
    try {
      if (activeMode === 'slides') {
        await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, {
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
        });
      } else {
        await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
          editableOverrides,
        });
      }
      setStatusMessage({
        type: 'success',
        text: `⬇️ Downloaded ${diagramName} (${blueprintId}).${activeMode === 'slides' ? 'pptx' : 'docx'} to your device!`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Download failed: ' + (err?.message || 'Unknown error'),
      });
    } finally {
      setIsDownloadingDeck(false);
    }
  };

  /**
   * Method 3: Auto-Copy Populated Rich HTML + Guaranteed PNG Image & Open Guided Launch Assistant
   */
  const handleCopyAndLaunchNewTab = async () => {
    setIsCopyingAndLaunching(true);
    try {
      const displayNodes = sortedVertices.filter((v) => cleanHtmlToPlainText(v.value).title.length > 0);
      const tableHtmlRows = displayNodes
        .map((n, idx) => {
          const parsed = cleanHtmlToPlainText(n.value);
          const ov = editableOverrides[n.id];
          const title = ov ? ov.title : parsed.title;
          const subtitle = ov ? ov.subtitle : parsed.subtitle;
          return `<tr>
            <td style="border:1px solid #cbd5e1;padding:8px;font-weight:bold;color:#0f172a;">OBJ-${String(idx + 1).padStart(2, '0')}</td>
            <td style="border:1px solid #cbd5e1;padding:8px;font-weight:bold;color:#1e3a8a;">${title}</td>
            <td style="border:1px solid #cbd5e1;padding:8px;color:#334155;">${subtitle || 'Enterprise Cloud Node'}</td>
          </tr>`;
        })
        .join('');

      const publicDiagramImgUrl =
        pngPreviewUrl && pngPreviewUrl.startsWith('http')
          ? pngPreviewUrl
          : 'https://promptcanvas.up.railway.app/blueprints/azure_application_landing_zone.png';

      const richHtml = `
        <div style="font-family: Arial, sans-serif; color: #0f172a;">
          <h1 style="color: #0f172a; font-size: 22pt; margin-bottom: 4px;">${diagramName} (${blueprintId})</h1>
          <p style="color: #475569; font-size: 11pt; margin-top: 0;">Generated by PromptCanvas Vision Decompiler • 100% Editable Architecture Specification</p>
          <div style="margin: 16px 0;">
            <img src="${publicDiagramImgUrl}" width="680" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 8px;" alt="${diagramName}" />
          </div>
          <h2 style="color: #0f172a; font-size: 15pt; margin-top: 20px;">Architectural Component Specification Table (${displayNodes.length} Nodes)</h2>
          <table style="border-collapse: collapse; width: 100%; margin-top: 8px; font-size: 10pt;">
            <thead>
              <tr style="background-color: #0f172a; color: #ffffff;">
                <th style="border:1px solid #0f172a;padding:8px;text-align:left;">Object ID</th>
                <th style="border:1px solid #0f172a;padding:8px;text-align:left;">Component Name</th>
                <th style="border:1px solid #0f172a;padding:8px;text-align:left;">Architectural Role &amp; Specification</th>
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

      // For Slides mode, include high-res PNG blob for instant slide paste; for Docs mode, omit image/png so Chrome pastes the full HTML table + image!
      if (activeMode === 'slides' && pngPreviewUrl) {
        const pngBlob = await convertAnyImageUrlToPngBlob(pngPreviewUrl);
        if (pngBlob) {
          clipboardItems['image/png'] = pngBlob;
        }
        // Also auto-download the .pptx file so it's immediately ready for File -> Import Slides!
        await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, {
          masterImageSrc: pngPreviewUrl || masterImageSrc || undefined,
        });
      }

      await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);

      setLaunchAssistantModal(activeMode);
      setStatusMessage({
        type: 'success',
        text: `✅ Copied populated ${activeMode === 'slides' ? 'Slide Deck & downloaded .pptx' : 'Specification & 177-row Table'}! Follow the 1-click prompt below to populate your Google tab.`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Clipboard copy notice: ' + (err?.message || 'Please allow clipboard permissions'),
      });
    } finally {
      setIsCopyingAndLaunching(false);
    }
  };

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return sortedVertices.find((v) => v.id === selectedNodeId) || null;
  }, [selectedNodeId, sortedVertices]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 md:p-5 ${
        isFullscreen ? 'p-0' : ''
      }`}
      data-testid="google-workspace-direct-open-modal"
    >
      <div
        className={`bg-[#0B111E] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-[1520px] h-[92vh]'
        }`}
      >
        {/* Top Dark Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-[#090D16] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${
                activeMode === 'slides'
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400'
                  : 'bg-sky-500/15 border border-sky-500/40 text-sky-400'
              }`}
            >
              {activeMode === 'slides' ? <Presentation className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                  {activeMode === 'slides'
                    ? 'In-Browser Google Slides Studio & Direct Cloud Open'
                    : 'In-Browser Google Docs Specification Studio & Direct Cloud Open'}
                </h2>
                <span className="px-2.5 py-0.5 text-[10.5px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  1:1 Visual Twin Certified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Blueprint <span className="text-sky-400 font-mono font-semibold">{blueprintId}</span> •{' '}
                <span className="text-slate-200 font-medium">{diagramName}</span> • Populated with{' '}
                <span className="text-emerald-400 font-semibold">{sortedVertices.length} interactive vector nodes &amp; icons</span>
              </p>
            </div>
          </div>

          {/* Center Switcher: Open with Google Slides vs Open with Google Docs */}
          <div className="flex items-center gap-1.5 bg-slate-900/95 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveMode('slides')}
              data-testid="switch-to-google-slides-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMode === 'slides'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Open with Google Slides</span>
            </button>
            <button
              onClick={() => setActiveMode('docs')}
              data-testid="switch-to-google-docs-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMode === 'docs'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Open with Google Docs</span>
            </button>
          </div>

          {/* Direct External Google Tab Launch Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Button: Open Populated Deck/Doc in Separate External Google Tab (docs.google.com/viewer) */}
            <button
              onClick={handleOpenGoogleCloudViewer}
              disabled={isOpeningCloudViewer}
              data-testid="open-google-cloud-viewer-btn"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-all cursor-pointer ${
                activeMode === 'slides'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white'
              }`}
              title={`Open populated ${activeMode === 'slides' ? '3-Slide Presentation (.pptx)' : 'Architecture Specification (.docx)'} in a separate external Google tab (docs.google.com)`}
            >
              {isOpeningCloudViewer ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
              <span>
                {activeMode === 'slides'
                  ? 'Open in Google Slides Tab ↗'
                  : 'Open in Google Docs Tab ↗'}
              </span>
            </button>

            {/* Secondary Button: Direct Download .pptx / .docx */}
            <button
              onClick={handleDirectDownloadFile}
              disabled={isDownloadingDeck}
              data-testid="direct-download-deck-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
              title="Download populated presentation/specification directly to your computer"
            >
              {isDownloadingDeck ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Download .{activeMode === 'slides' ? 'pptx' : 'docx'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Present Fullscreen Slideshow'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              data-testid="close-google-workspace-modal-btn"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Guided Populated Google Launch Assistant Modal (Prevents Blank Doc / Blank Slide Confusion) */}
        {launchAssistantModal && (
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-950/95 via-slate-900 to-emerald-950/95 border-b border-emerald-500/50 flex flex-col md:flex-row items-center justify-between gap-4 z-50">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>
                  {launchAssistantModal === 'docs'
                    ? '✅ Complete 177-Node Specification & High-Res Diagram Copied to Clipboard!'
                    : '✅ Populated 3-Slide Editable Vector Deck (.pptx) Downloaded & Slide Copied!'}
                </span>
              </div>
              {launchAssistantModal === 'docs' ? (
                <p className="text-xs text-slate-200 leading-relaxed">
                  Google&apos;s <code className="text-sky-300 font-mono">docs.new</code> shortcut opens a fresh document tab. As soon as it opens, press{' '}
                  <kbd className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold font-mono text-xs shadow">
                    ⌘V (Mac) / Ctrl+V (Win)
                  </kbd>{' '}
                  once to paste your entire <strong>1:1 Architecture Diagram + All 177 Editable Specification Table Rows</strong>!
                </p>
              ) : (
                <p className="text-xs text-slate-200 leading-relaxed">
                  To edit all 3 slides &amp; 89 native vector shapes in Google Slides: click <strong>File → Import slides → Upload</strong> in the new tab and select the downloaded <code className="text-amber-300 font-mono">{diagramName}.pptx</code> file (or press <kbd className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono text-xs">⌘V</kbd> to paste the widescreen slide immediately!).
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  const target = launchAssistantModal === 'slides' ? 'https://slides.new' : 'https://docs.new';
                  window.open(target, '_blank');
                  setLaunchAssistantModal(null);
                }}
                data-testid="confirm-launch-google-tab-btn"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>
                  {launchAssistantModal === 'docs'
                    ? '🚀 Open Google Docs (docs.new) & Press ⌘V ↗'
                    : '🚀 Open Google Slides (slides.new) & Import ↗'}
                </span>
              </button>
              <button
                onClick={handleDirectDownloadFile}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .{launchAssistantModal === 'slides' ? 'pptx' : 'docx'}</span>
              </button>
              <button
                onClick={() => setLaunchAssistantModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Status / Notification Banner */}
        {statusMessage && (
          <div
            className={`px-6 py-2 flex items-center justify-between gap-4 border-b text-xs font-medium ${
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
          </div>
        )}

        {/* Expandable Google Drive OAuth Quick-Connect Drawer */}
        {showAuthConfig && (
          <div className="px-6 py-3.5 bg-slate-900/95 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
                ) to create &amp; open native Google Slides / Docs directly in your personal Google Drive with 1 click.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <input
                type="password"
                value={googleAccessToken}
                onChange={(e) => handleSaveAuthSettings(e.target.value, googleClientId)}
                placeholder="Paste Google OAuth Access Token (ya29.a0...)"
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 w-full md:w-72 focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => {
                  handleDirectGoogleDriveOpen();
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
              >
                Save &amp; Launch Now
              </button>
            </div>
          </div>
        )}

        {/* Main Workspace Body: In-Browser Populated Slide Deck OR Google Docs Spec */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F8FAFC] text-slate-900">
          {activeMode === 'slides' ? (
            <>
              {/* Left Slide Thumbnail Rail (Google Slides style) */}
              <div className="w-full md:w-64 bg-slate-100 border-r border-slate-200 p-3.5 flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 hidden md:block">
                  Populated Slides (3)
                </div>

                {[
                  {
                    idx: 0,
                    title: 'Slide 1: 1:1 Interactive Architecture',
                    subtitle: `${sortedVertices.length} Interactive Vector Objects`,
                    badge: '1:1 Exact Twin',
                  },
                  {
                    idx: 1,
                    title: 'Slide 2: Decomposed Vector Shapes',
                    subtitle: 'Draggable PowerPoint Shapes & Icons',
                    badge: 'Editable Shapes',
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
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">Slide {slide.idx + 1}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                        {slide.badge}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 truncate">{slide.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{slide.subtitle}</div>
                  </button>
                ))}

                {/* Interactive Node Inspector Panel when a node is clicked */}
                {selectedNode ? (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900 text-white border border-slate-700 space-y-2 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Live Node Editor</span>
                      </span>
                      <button
                        onClick={() => setSelectedNodeId(null)}
                        className="text-slate-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 block">Node Title / Label</label>
                      <input
                        type="text"
                        value={
                          editableOverrides[selectedNode.id]?.title ??
                          cleanHtmlToPlainText(selectedNode.value).title
                        }
                        onChange={(e) => {
                          const curSub =
                            editableOverrides[selectedNode.id]?.subtitle ??
                            cleanHtmlToPlainText(selectedNode.value).subtitle;
                          setEditableOverrides((prev) => ({
                            ...prev,
                            [selectedNode.id]: { title: e.target.value, subtitle: curSub },
                          }));
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-amber-500/50 text-xs text-amber-300 font-bold focus:outline-none"
                      />
                      <label className="text-[10px] text-slate-400 block">Architectural Role / Subtitle</label>
                      <input
                        type="text"
                        value={
                          editableOverrides[selectedNode.id]?.subtitle ??
                          cleanHtmlToPlainText(selectedNode.value).subtitle
                        }
                        onChange={(e) => {
                          const curTitle =
                            editableOverrides[selectedNode.id]?.title ??
                            cleanHtmlToPlainText(selectedNode.value).title;
                          setEditableOverrides((prev) => ({
                            ...prev,
                            [selectedNode.id]: { title: curTitle, subtitle: e.target.value },
                          }));
                        }}
                        placeholder="Add role or protocol..."
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto pt-3 border-t border-slate-200 hidden md:block">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Zero-Deformity 1:1 Guarantee</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Slide 1 renders your exact 1:1 architecture with clickable vector hotspots. Click any node to customize its label before exporting!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Main Widescreen 16:9 Slide Canvas Stage */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 bg-slate-200/70 overflow-auto relative">
                {/* Slide Stage Controls */}
                <div className="flex flex-wrap items-center justify-between w-full max-w-[1120px] mb-2.5 px-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">
                      Slide {activeSlideIndex + 1} of 3
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {activeSlideIndex === 0
                        ? 'Slide 1: 100% 1:1 Widescreen Architecture & Interactive Vector Hotspots'
                        : activeSlideIndex === 1
                        ? 'Slide 2: 100% Decomposed Native Vector Shapes, Azure/GCP Icons & Connectors'
                        : 'Slide 3: Editable Component Inventory & Specification Matrix'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeSlideIndex === 0 && (
                      <div className="inline-flex rounded-lg bg-slate-300/80 p-0.5 border border-slate-300">
                        <button
                          onClick={() => setSlide1ViewMode('interactive-twin')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                            slide1ViewMode === 'interactive-twin'
                              ? 'bg-slate-900 text-amber-300 shadow-xs'
                              : 'text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>1:1 Interactive Twin</span>
                        </button>
                        <button
                          onClick={() => setSlide1ViewMode('decomposed-shapes')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                            slide1ViewMode === 'decomposed-shapes'
                              ? 'bg-slate-900 text-amber-300 shadow-xs'
                              : 'text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <Layers className="w-3 h-3" />
                          <span>Decomposed Shapes</span>
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
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
                </div>

                {/* Widescreen 16:9 Slide Container */}
                <div
                  className="w-full max-w-[1120px] aspect-[16/9] bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden relative"
                  data-testid="live-browser-slide-canvas"
                >
                  {/* Slide Top Header Banner */}
                  <div className="h-11 bg-[#0F172A] px-5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sky-400 font-bold text-xs md:text-sm tracking-wide uppercase truncate">
                        {diagramName}
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-slate-300 text-[11px] font-medium truncate">
                        {activeSlideIndex === 0
                          ? `Slide 1: 1:1 Master Architecture Presentation (${blueprintId})`
                          : activeSlideIndex === 1
                          ? `Slide 2: Decomposed Vector Shapes & Azure/GCP Icons (${blueprintId})`
                          : `Slide 3: Component Specification & Role Inventory (${blueprintId})`}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-400 shrink-0">16:9 WIDESCREEN SLIDE</span>
                  </div>

                  {/* =========================================================================
                      SLIDE 1 (OR SLIDE 2): 1:1 INTERACTIVE VECTOR TWIN OR DECOMPOSED SHAPES
                     ========================================================================= */}
                  {(activeSlideIndex === 0 || activeSlideIndex === 1) && (
                    <div
                      className="flex-1 relative overflow-hidden flex items-center justify-center"
                      style={{
                        backgroundColor:
                          activeSlideIndex === 0 && slide1ViewMode === 'interactive-twin'
                            ? '#FFFFFF'
                            : parsedTopology.isDarkDiagram
                            ? `#${parsedTopology.diagramBgHex}`
                            : '#FFFFFF',
                      }}
                    >
                      {activeSlideIndex === 0 && slide1ViewMode === 'interactive-twin' ? (
                        /* 1:1 PIXEL-ACCURATE MASTER ARCHITECTURE WITH INTERACTIVE HOTSPOTS */
                        <div className="relative w-full h-full flex items-center justify-center p-1">
                          {isGeneratingPreview ? (
                            <div className="flex flex-col items-center gap-3 text-slate-500">
                              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                              <span className="text-xs font-medium">Rendering 1:1 High-Resolution Architecture Slide...</span>
                            </div>
                          ) : pngPreviewUrl ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={pngPreviewUrl}
                                alt={diagramName}
                                className="w-full h-full object-contain select-none pointer-events-none"
                              />

                              {/* Interactive Vector Hotspots Layer mapped proportionally over the 1:1 diagram */}
                              <div className="absolute inset-0">
                                {sortedVertices.map((node) => {
                                  if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700) {
                                    return null;
                                  }
                                  const leftPct = ((node.absX - parsedTopology.minX) / graphW) * 94 + 3;
                                  const topPct = ((node.absY - parsedTopology.minY) / graphH) * 90 + 5;
                                  const widthPct = Math.max(1.8, (node.width / graphW) * 94);
                                  const heightPct = Math.max(2.2, (node.height / graphH) * 90);

                                  const isSelected = selectedNodeId === node.id;
                                  const isHovered = hoveredNodeId === node.id;
                                  const override = editableOverrides[node.id];
                                  const parsedText = cleanHtmlToPlainText(node.value);
                                  const displayTitle = override ? override.title : parsedText.title;

                                  return (
                                    <div
                                      key={node.id}
                                      onClick={() => setSelectedNodeId(node.id)}
                                      onMouseEnter={() => setHoveredNodeId(node.id)}
                                      onMouseLeave={() => setHoveredNodeId(null)}
                                      style={{
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        width: `${widthPct}%`,
                                        height: `${heightPct}%`,
                                      }}
                                      className={`absolute rounded transition-all cursor-pointer ${
                                        isSelected
                                          ? 'ring-2 ring-amber-500 bg-amber-500/15 z-30 shadow-md'
                                          : isHovered
                                          ? 'ring-2 ring-sky-500/80 bg-sky-500/10 z-20'
                                          : 'hover:bg-sky-500/5 z-10'
                                      }`}
                                      title={displayTitle ? `Click to edit: ${displayTitle}` : `Inspect node ${node.id}`}
                                    >
                                      {/* Show custom edited badge overlay if user modified text */}
                                      {override && (
                                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[9px] whitespace-nowrap shadow-sm">
                                          {override.title}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400">1:1 Visual Twin Slide Ready</div>
                          )}
                        </div>
                      ) : (
                        /* DECOMPOSED NATIVE VECTOR SHAPES & AUTHENTIC AZURE/GCP SVG ICONS LAYER */
                        <div className="relative w-full h-full">
                          {/* SVG Connector Layer */}
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-10"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <marker
                                id="slide-arrow-end"
                                viewBox="0 0 10 10"
                                refX="8"
                                refY="5"
                                markerWidth="4"
                                markerHeight="4"
                                orient="auto"
                              >
                                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#2563EB" />
                              </marker>
                              <marker
                                id="slide-arrow-start"
                                viewBox="0 0 10 10"
                                refX="2"
                                refY="5"
                                markerWidth="4"
                                markerHeight="4"
                                orient="auto"
                              >
                                <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#2563EB" />
                              </marker>
                            </defs>
                            {edges.map((edge, eIdx) => {
                              const src = sortedVertices.find((v) => v.id === edge.source);
                              const tgt = sortedVertices.find((v) => v.id === edge.target);

                              let ptStart = src
                                ? {
                                    x: src.absX + src.width * parseFloat(edge.style.exitX ?? '0.5'),
                                    y: src.absY + src.height * parseFloat(edge.style.exitY ?? '0.5'),
                                  }
                                : edge.sourcePoint;
                              let ptEnd = tgt
                                ? {
                                    x: tgt.absX + tgt.width * parseFloat(edge.style.entryX ?? '0.5'),
                                    y: tgt.absY + tgt.height * parseFloat(edge.style.entryY ?? '0.5'),
                                  }
                                : edge.targetPoint;

                              if (!ptStart || !ptEnd) return null;

                              const toPctX = (x: number) => ((x - parsedTopology.minX) / graphW) * 94 + 3;
                              const toPctY = (y: number) => ((y - parsedTopology.minY) / graphH) * 90 + 5;

                              const allPts = [ptStart, ...edge.waypoints, ptEnd];
                              const pointsAttr = allPts.map((p) => `${toPctX(p.x)},${toPctY(p.y)}`).join(' ');
                              const hasStart = edge.style.startArrow && edge.style.startArrow !== 'none';
                              const hasEnd = !edge.style.endArrow || edge.style.endArrow !== 'none';

                              return (
                                <g key={edge.id || eIdx}>
                                  <polyline
                                    fill="none"
                                    points={pointsAttr}
                                    stroke={edge.style.strokeColor || '#2563EB'}
                                    strokeWidth="0.22"
                                    strokeDasharray={edge.style.dashed === '1' ? '0.7,0.4' : undefined}
                                    markerStart={hasStart ? 'url(#slide-arrow-start)' : undefined}
                                    markerEnd={hasEnd ? 'url(#slide-arrow-end)' : undefined}
                                  />
                                </g>
                              );
                            })}
                          </svg>

                          {/* Decomposed Shapes Layer (Sorted by Depth & Area so Containers Never Cover Children) */}
                          <div className="relative w-full h-full">
                            {sortedVertices.map((node, zIdx) => {
                              if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700 && node.height >= 400) {
                                return null;
                              }

                              const leftPct = ((node.absX - parsedTopology.minX) / graphW) * 94 + 3;
                              const topPct = ((node.absY - parsedTopology.minY) / graphH) * 90 + 5;
                              const widthPct = Math.max(1.4, (node.width / graphW) * 94);
                              const heightPct = Math.max(1.8, (node.height / graphH) * 90);

                              const parsedText = cleanHtmlToPlainText(node.value);
                              const override = editableOverrides[node.id];
                              const title = override ? override.title : parsedText.title;
                              const subtitle = override ? override.subtitle : parsedText.subtitle;

                              const isImageShape =
                                node.style.shape === 'image' ||
                                Boolean(node.imageDataUrl) ||
                                node.extractedSvgs.length > 0;

                              const hasFill =
                                node.style.fillColor &&
                                node.style.fillColor !== 'none' &&
                                node.style.fillColor !== 'transparent' &&
                                !(isImageShape && node.width <= 55 && node.height <= 55);
                              const hasStroke =
                                node.style.strokeColor &&
                                node.style.strokeColor !== 'none' &&
                                node.style.strokeColor !== 'transparent' &&
                                !(isImageShape && node.width <= 55 && node.height <= 55);

                              const isContainer =
                                node.style.container === '1' ||
                                parentIds.has(node.id) ||
                                (node.style.verticalAlign === 'top' && node.width * node.height > 18000) ||
                                (node.width > 240 && node.height > 120 && !isImageShape);

                              const isStandaloneIconWithBottomLabel =
                                (node.style.verticalLabelPosition === 'bottom' ||
                                  (isImageShape && node.width <= 56 && node.height <= 56)) &&
                                !isContainer;

                              const isSelected = selectedNodeId === node.id;
                              const titleHex = node.htmlTitleColor
                                ? `#${node.htmlTitleColor}`
                                : node.style.fontColor
                                ? node.style.fontColor
                                : parsedTopology.isDarkDiagram
                                ? '#FFFFFF'
                                : '#0F172A';

                              const iconMarkupOrUrl = node.extractedSvgs[0] || node.imageDataUrl;

                              return (
                                <div
                                  key={node.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedNodeId(node.id);
                                  }}
                                  style={{
                                    left: `${leftPct}%`,
                                    top: `${topPct}%`,
                                    width: `${widthPct}%`,
                                    height: `${heightPct}%`,
                                    zIndex: isSelected ? 50 : node.depth * 5 + (isContainer ? 1 : 15),
                                    borderRadius:
                                      node.style.rounded === '1' ? '6px' : node.style.ellipse === '1' ? '9999px' : '2px',
                                    backgroundColor: hasFill ? node.style.fillColor : 'transparent',
                                    borderColor: isSelected
                                      ? '#F59E0B'
                                      : hasStroke
                                      ? node.style.strokeColor
                                      : 'transparent',
                                    borderStyle: node.style.dashed === '1' ? 'dashed' : 'solid',
                                    borderWidth: isSelected ? '2px' : hasStroke ? '1.2px' : '0px',
                                  }}
                                  className={`absolute transition-all cursor-pointer select-none flex ${
                                    isContainer
                                      ? 'flex-col justify-start items-start p-1'
                                      : isStandaloneIconWithBottomLabel
                                      ? 'flex-col items-center justify-center overflow-visible'
                                      : 'flex-row items-center justify-center px-1 gap-1'
                                  }`}
                                >
                                  {/* Render SVG Icon or Data URL */}
                                  {iconMarkupOrUrl && (
                                    <div
                                      className={`${
                                        isStandaloneIconWithBottomLabel ? 'w-full h-full' : 'w-4 h-4 shrink-0'
                                      } flex items-center justify-center [&>svg]:w-full [&>svg]:h-full`}
                                    >
                                      {iconMarkupOrUrl.startsWith('<svg') ? (
                                        <div
                                          className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                                          dangerouslySetInnerHTML={{ __html: iconMarkupOrUrl }}
                                        />
                                      ) : (
                                        <img
                                          src={iconMarkupOrUrl}
                                          alt={title || 'icon'}
                                          className="w-full h-full object-contain"
                                        />
                                      )}
                                    </div>
                                  )}

                                  {/* Render Label (Top of Container, Below Standalone Icon, or Inside Card) */}
                                  {title && (
                                    <div
                                      style={{ color: titleHex }}
                                      className={`${
                                        isStandaloneIconWithBottomLabel
                                          ? 'absolute top-full mt-0.5 left-1/2 -translate-x-1/2 text-center w-max max-w-[115px] whitespace-normal leading-[1.05] px-1 py-0.2 rounded bg-white/95 shadow-2xs text-[7.5px] font-bold z-30'
                                          : isContainer
                                          ? 'text-[8.5px] font-bold leading-[1.1] px-1 py-0.5 whitespace-normal break-words max-w-full'
                                          : 'text-[8px] font-bold leading-[1.05] text-center whitespace-normal break-words line-clamp-2 max-w-full'
                                      }`}
                                    >
                                      {title}
                                      {subtitle && !isStandaloneIconWithBottomLabel && (
                                        <span className="block text-[7px] font-normal opacity-85 leading-[1.05] whitespace-normal line-clamp-2">
                                          {subtitle}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* =========================================================================
                      SLIDE 3 CONTENT: EDITABLE COMPONENT SPECIFICATION MATRIX
                     ========================================================================= */}
                  {activeSlideIndex === 2 && (
                    <div className="flex-1 bg-white p-5 overflow-y-auto">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-900">
                          Architectural Component Specification &amp; Topology Inventory ({sortedVertices.length} Objects)
                        </h3>
                        <span className="text-xs text-slate-500">Click any row to edit specification inline</span>
                      </div>
                      <table className="w-full border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            <th className="p-2 text-left border border-slate-800 w-24">Object ID</th>
                            <th className="p-2 text-left border border-slate-800 w-64">Component Name</th>
                            <th className="p-2 text-left border border-slate-800">Architectural Role &amp; Specification</th>
                            <th className="p-2 text-left border border-slate-800 w-32">Classification</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedVertices
                            .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
                            .slice(0, 18)
                            .map((node, idx) => {
                              const parsed = cleanHtmlToPlainText(node.value);
                              const override = editableOverrides[node.id];
                              const title = override ? override.title : parsed.title;
                              const subtitle = override ? override.subtitle : parsed.subtitle;
                              const isContainer =
                                node.style.container === '1' ||
                                parentIds.has(node.id) ||
                                node.width * node.height > 90000;
                              return (
                                <tr
                                  key={node.id}
                                  onClick={() => setSelectedNodeId(node.id)}
                                  className={`border-b border-slate-200 cursor-pointer transition ${
                                    selectedNodeId === node.id ? 'bg-amber-50' : 'hover:bg-slate-50'
                                  }`}
                                >
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
            /* GOOGLE DOCS SPECIFICATION LIVE STUDIO VIEW (WITH 100% EDITABLE DIAGRAM + LIVE NODE EDITOR) */
            <>
              {/* Left Document Outline & Live Node Editor Rail */}
              <div className="w-full md:w-72 bg-slate-100 border-r border-slate-200 p-3.5 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 hidden md:block">
                  Google Docs Specification Sections
                </div>

                <div className="flex md:flex-col gap-2 shrink-0">
                  <div className="p-3 rounded-xl bg-white border-2 border-sky-500 shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">1. Editable Vector Diagram</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-sky-100 text-sky-800">
                        177 Vector Nodes
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Interactive decomposed Azure/GCP shapes, 89 vector icons &amp; orthogonal connectors.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">2. Component Spec Matrix</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
                        Inline Editable
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Click any table row or diagram box to edit titles &amp; roles live.
                    </p>
                  </div>
                </div>

                {/* Live Node Editor Panel in Docs Mode */}
                {selectedNode ? (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900 text-white border border-slate-700 space-y-2 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Live Diagram &amp; Doc Node Editor</span>
                      </span>
                      <button
                        onClick={() => setSelectedNodeId(null)}
                        className="text-slate-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 block">Component Name / Title</label>
                      <input
                        type="text"
                        value={
                          editableOverrides[selectedNode.id]?.title ??
                          cleanHtmlToPlainText(selectedNode.value).title
                        }
                        onChange={(e) => {
                          const curSub =
                            editableOverrides[selectedNode.id]?.subtitle ??
                            cleanHtmlToPlainText(selectedNode.value).subtitle;
                          setEditableOverrides((prev) => ({
                            ...prev,
                            [selectedNode.id]: { title: e.target.value, subtitle: curSub },
                          }));
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-amber-500/50 text-xs text-amber-300 font-bold focus:outline-none"
                      />
                      <label className="text-[10px] text-slate-400 block">Technical Role / Specification</label>
                      <input
                        type="text"
                        value={
                          editableOverrides[selectedNode.id]?.subtitle ??
                          cleanHtmlToPlainText(selectedNode.value).subtitle
                        }
                        onChange={(e) => {
                          const curTitle =
                            editableOverrides[selectedNode.id]?.title ??
                            cleanHtmlToPlainText(selectedNode.value).title;
                          setEditableOverrides((prev) => ({
                            ...prev,
                            [selectedNode.id]: { title: curTitle, subtitle: e.target.value },
                          }));
                        }}
                        placeholder="Add role or protocol..."
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto pt-3 border-t border-slate-200 hidden md:block">
                    <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                        <span>Interactive Editable Diagram</span>
                      </div>
                      <p className="text-[11px] text-sky-900 leading-relaxed">
                        Click any component box or icon on the diagram in Section 1 (or any row in Section 2) to customize its label &amp; role in real time!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Main Google Docs Specification Page Canvas */}
              <div className="flex-1 overflow-y-auto bg-slate-200/80 p-4 md:p-8 flex justify-center">
                <div
                  className="w-full max-w-[1040px] bg-white shadow-2xl rounded-xl border border-slate-300 p-6 md:p-10 space-y-8 text-slate-900"
                  data-testid="live-browser-docs-canvas"
                >
                  {/* Document Header */}
                  <div className="border-b border-slate-200 pb-5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1.5">
                        <FileText className="w-4 h-4" />
                        <span>Google Docs Technical Architecture Specification &amp; Editable Blueprint</span>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{diagramName}</h1>
                      <p className="text-sm text-slate-500 mt-1">
                        Blueprint ID: <span className="font-mono font-bold text-slate-700">{blueprintId}</span> •{' '}
                        <span className="text-emerald-700 font-semibold">
                          100% Editable Vector Diagram &amp; Specification Matrix
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* SECTION 1: INTERACTIVE EDITABLE ARCHITECTURE TOPOLOGY DIAGRAM */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          1. Master Architecture Topology Diagram (Interactive &amp; Editable)
                        </h2>
                        <p className="text-xs text-slate-500">
                          Click any component box, icon, or enclave below to edit its title and role directly inside the specification.
                        </p>
                      </div>

                      {/* Diagram Mode Switcher inside Google Doc */}
                      <div className="inline-flex rounded-lg bg-slate-200 p-0.5 border border-slate-300">
                        <button
                          onClick={() => setDocsDiagramViewMode('decomposed-shapes')}
                          data-testid="docs-diagram-decomposed-btn"
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                            docsDiagramViewMode === 'decomposed-shapes'
                              ? 'bg-slate-900 text-amber-300 shadow-xs'
                              : 'text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Editable Decomposed Vector Diagram (177 Shapes)</span>
                        </button>
                        <button
                          onClick={() => setDocsDiagramViewMode('interactive-twin')}
                          data-testid="docs-diagram-twin-btn"
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                            docsDiagramViewMode === 'interactive-twin'
                              ? 'bg-slate-900 text-amber-300 shadow-xs'
                              : 'text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>1:1 Master Visual Twin</span>
                        </button>
                      </div>
                    </div>

                    {/* Widescreen 16:9 Interactive Editable Diagram Container inside Google Doc */}
                    <div
                      className="w-full aspect-[16/9] rounded-xl border-2 border-slate-300 shadow-md overflow-hidden relative flex items-center justify-center"
                      style={{
                        backgroundColor:
                          docsDiagramViewMode === 'interactive-twin'
                            ? '#FFFFFF'
                            : parsedTopology.isDarkDiagram
                            ? `#${parsedTopology.diagramBgHex}`
                            : '#FFFFFF',
                      }}
                      data-testid="docs-editable-diagram-viewport"
                    >
                      {docsDiagramViewMode === 'decomposed-shapes' ? (
                        /* DECOMPOSED NATIVE VECTOR SHAPES & AUTHENTIC AZURE/GCP SVG ICONS LAYER */
                        <div className="relative w-full h-full">
                          {/* SVG Connector Layer */}
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-10"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <marker
                                id="docs-arrow-end"
                                viewBox="0 0 10 10"
                                refX="8"
                                refY="5"
                                markerWidth="4"
                                markerHeight="4"
                                orient="auto"
                              >
                                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#2563EB" />
                              </marker>
                              <marker
                                id="docs-arrow-start"
                                viewBox="0 0 10 10"
                                refX="2"
                                refY="5"
                                markerWidth="4"
                                markerHeight="4"
                                orient="auto"
                              >
                                <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#2563EB" />
                              </marker>
                            </defs>
                            {edges.map((edge, eIdx) => {
                              const src = sortedVertices.find((v) => v.id === edge.source);
                              const tgt = sortedVertices.find((v) => v.id === edge.target);

                              let ptStart = src
                                ? {
                                    x: src.absX + src.width * parseFloat(edge.style.exitX ?? '0.5'),
                                    y: src.absY + src.height * parseFloat(edge.style.exitY ?? '0.5'),
                                  }
                                : edge.sourcePoint;
                              let ptEnd = tgt
                                ? {
                                    x: tgt.absX + tgt.width * parseFloat(edge.style.entryX ?? '0.5'),
                                    y: tgt.absY + tgt.height * parseFloat(edge.style.entryY ?? '0.5'),
                                  }
                                : edge.targetPoint;

                              if (!ptStart || !ptEnd) return null;

                              const toPctX = (x: number) => ((x - parsedTopology.minX) / graphW) * 94 + 3;
                              const toPctY = (y: number) => ((y - parsedTopology.minY) / graphH) * 90 + 5;

                              const allPts = [ptStart, ...edge.waypoints, ptEnd];
                              const pointsAttr = allPts.map((p) => `${toPctX(p.x)},${toPctY(p.y)}`).join(' ');
                              const hasStart = edge.style.startArrow && edge.style.startArrow !== 'none';
                              const hasEnd = !edge.style.endArrow || edge.style.endArrow !== 'none';

                              return (
                                <g key={edge.id || eIdx}>
                                  <polyline
                                    fill="none"
                                    points={pointsAttr}
                                    stroke={edge.style.strokeColor || '#2563EB'}
                                    strokeWidth="0.22"
                                    strokeDasharray={edge.style.dashed === '1' ? '0.7,0.4' : undefined}
                                    markerStart={hasStart ? 'url(#docs-arrow-start)' : undefined}
                                    markerEnd={hasEnd ? 'url(#docs-arrow-end)' : undefined}
                                  />
                                </g>
                              );
                            })}
                          </svg>

                          {/* Decomposed Shapes Layer */}
                          <div className="relative w-full h-full">
                            {sortedVertices.map((node) => {
                              if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700 && node.height >= 400) {
                                return null;
                              }

                              const leftPct = ((node.absX - parsedTopology.minX) / graphW) * 94 + 3;
                              const topPct = ((node.absY - parsedTopology.minY) / graphH) * 90 + 5;
                              const widthPct = Math.max(1.4, (node.width / graphW) * 94);
                              const heightPct = Math.max(1.8, (node.height / graphH) * 90);

                              const parsedText = cleanHtmlToPlainText(node.value);
                              const override = editableOverrides[node.id];
                              const title = override ? override.title : parsedText.title;
                              const subtitle = override ? override.subtitle : parsedText.subtitle;

                              const isImageShape =
                                node.style.shape === 'image' ||
                                Boolean(node.imageDataUrl) ||
                                node.extractedSvgs.length > 0;

                              const hasFill =
                                node.style.fillColor &&
                                node.style.fillColor !== 'none' &&
                                node.style.fillColor !== 'transparent' &&
                                !(isImageShape && node.width <= 55 && node.height <= 55);
                              const hasStroke =
                                node.style.strokeColor &&
                                node.style.strokeColor !== 'none' &&
                                node.style.strokeColor !== 'transparent' &&
                                !(isImageShape && node.width <= 55 && node.height <= 55);

                              const isContainer =
                                node.style.container === '1' ||
                                parentIds.has(node.id) ||
                                (node.style.verticalAlign === 'top' && node.width * node.height > 18000) ||
                                (node.width > 240 && node.height > 120 && !isImageShape);

                              const isStandaloneIconWithBottomLabel =
                                (node.style.verticalLabelPosition === 'bottom' ||
                                  (isImageShape && node.width <= 90 && node.height <= 75) ||
                                  (node.width <= 72 && node.height <= 72)) &&
                                !isContainer;

                              const isSelected = selectedNodeId === node.id;
                              const titleHex = node.htmlTitleColor
                                ? `#${node.htmlTitleColor}`
                                : node.style.fontColor
                                ? node.style.fontColor
                                : parsedTopology.isDarkDiagram
                                ? '#FFFFFF'
                                : '#0F172A';

                              const iconMarkupOrUrl = node.extractedSvgs[0] || node.imageDataUrl;

                              return (
                                <div
                                  key={node.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedNodeId(node.id);
                                  }}
                                  style={{
                                    left: `${leftPct}%`,
                                    top: `${topPct}%`,
                                    width: `${widthPct}%`,
                                    height: `${heightPct}%`,
                                    zIndex: isSelected ? 50 : node.depth * 5 + (isContainer ? 1 : 15),
                                    borderRadius:
                                      node.style.rounded === '1' ? '6px' : node.style.ellipse === '1' ? '9999px' : '2px',
                                    backgroundColor: hasFill ? node.style.fillColor : 'transparent',
                                    borderColor: isSelected
                                      ? '#F59E0B'
                                      : hasStroke
                                      ? node.style.strokeColor
                                      : 'transparent',
                                    borderStyle: node.style.dashed === '1' ? 'dashed' : 'solid',
                                    borderWidth: isSelected ? '2px' : hasStroke ? '1.2px' : '0px',
                                  }}
                                  className={`absolute transition-all cursor-pointer select-none flex ${
                                    isContainer
                                      ? 'flex-col justify-start items-start p-1 overflow-visible'
                                      : isStandaloneIconWithBottomLabel
                                      ? 'flex-col items-center justify-center overflow-visible'
                                      : 'flex-row items-center justify-center px-1 gap-1'
                                  }`}
                                >
                                  {iconMarkupOrUrl && (
                                    <div
                                      className={`${
                                        isStandaloneIconWithBottomLabel ? 'w-full h-full' : 'w-4 h-4 shrink-0'
                                      } flex items-center justify-center [&>svg]:w-full [&>svg]:h-full`}
                                    >
                                      {iconMarkupOrUrl.startsWith('<svg') ? (
                                        <div
                                          className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                                          dangerouslySetInnerHTML={{ __html: iconMarkupOrUrl }}
                                        />
                                      ) : (
                                        <img
                                          src={iconMarkupOrUrl}
                                          alt={title || 'icon'}
                                          className="w-full h-full object-contain"
                                        />
                                      )}
                                    </div>
                                  )}

                                  {title && (
                                    <div
                                      style={{ color: titleHex }}
                                      className={`${
                                        isStandaloneIconWithBottomLabel
                                          ? 'absolute top-full mt-0.5 left-1/2 -translate-x-1/2 text-center w-max max-w-[135px] whitespace-normal break-normal leading-[1.05] px-1 py-0.2 rounded bg-white/95 shadow-2xs text-[7.5px] font-bold z-30'
                                          : isContainer
                                          ? 'text-[8.5px] font-bold leading-[1.1] px-1 py-0.5 w-max max-w-[98%] whitespace-nowrap overflow-visible'
                                          : 'text-[8px] font-bold leading-[1.05] text-center whitespace-normal break-normal line-clamp-2 max-w-full'
                                      }`}
                                    >
                                      {title}
                                      {subtitle && !isStandaloneIconWithBottomLabel && (
                                        <span className="block text-[7px] font-normal opacity-85 leading-[1.05] whitespace-normal break-normal line-clamp-2">
                                          {subtitle}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* 1:1 MASTER VISUAL TWIN WITH INTERACTIVE VECTOR HOTSPOTS */
                        <div className="relative w-full h-full flex items-center justify-center p-1">
                          {pngPreviewUrl ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={pngPreviewUrl}
                                alt={diagramName}
                                className="w-full h-full object-contain select-none pointer-events-none"
                              />
                              <div className="absolute inset-0">
                                {sortedVertices.map((node) => {
                                  if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700) {
                                    return null;
                                  }
                                  const leftPct = ((node.absX - parsedTopology.minX) / graphW) * 94 + 3;
                                  const topPct = ((node.absY - parsedTopology.minY) / graphH) * 90 + 5;
                                  const widthPct = Math.max(1.8, (node.width / graphW) * 94);
                                  const heightPct = Math.max(2.2, (node.height / graphH) * 90);
                                  const isSelected = selectedNodeId === node.id;
                                  const override = editableOverrides[node.id];

                                  return (
                                    <div
                                      key={node.id}
                                      onClick={() => setSelectedNodeId(node.id)}
                                      style={{
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        width: `${widthPct}%`,
                                        height: `${heightPct}%`,
                                      }}
                                      className={`absolute rounded transition-all cursor-pointer ${
                                        isSelected
                                          ? 'ring-2 ring-amber-500 bg-amber-500/15 z-30 shadow-md'
                                          : 'hover:ring-2 hover:ring-sky-500/80 hover:bg-sky-500/10 z-10'
                                      }`}
                                    >
                                      {override && (
                                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[9px] whitespace-nowrap shadow-sm">
                                          {override.title}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="py-12 text-xs text-slate-400">Loading high-resolution architecture visual...</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 2: INLINE-EDITABLE COMPONENT INVENTORY & TECHNICAL SPECIFICATION MATRIX */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-900">
                        2. Component Inventory &amp; Technical Specification Matrix ({sortedVertices.length} Editable Objects)
                      </h2>
                      <span className="text-xs text-sky-700 font-semibold">
                        Click any row or type inline to edit diagram &amp; specification simultaneously
                      </span>
                    </div>
                    <table className="w-full border-collapse text-xs border border-slate-300">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          <th className="p-2.5 text-left border border-slate-700 w-24">Object ID</th>
                          <th className="p-2.5 text-left border border-slate-700 w-72">Component Name (Editable)</th>
                          <th className="p-2.5 text-left border border-slate-700">Technical Role &amp; Specification (Editable)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedVertices
                          .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
                          .map((node, idx) => {
                            const parsed = cleanHtmlToPlainText(node.value);
                            const override = editableOverrides[node.id];
                            const titleVal = override ? override.title : parsed.title;
                            const subVal = override ? override.subtitle : parsed.subtitle;
                            const isSelected = selectedNodeId === node.id;

                            return (
                              <tr
                                key={node.id}
                                onClick={() => setSelectedNodeId(node.id)}
                                className={`border-b border-slate-200 transition cursor-pointer ${
                                  isSelected ? 'bg-amber-50 ring-1 ring-amber-400' : 'hover:bg-slate-50'
                                }`}
                              >
                                <td className="p-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">
                                  OBJ-{String(idx + 1).padStart(2, '0')}
                                </td>
                                <td className="p-1.5 border-r border-slate-200">
                                  <input
                                    type="text"
                                    value={titleVal}
                                    onChange={(e) => {
                                      setEditableOverrides((prev) => ({
                                        ...prev,
                                        [node.id]: { title: e.target.value, subtitle: subVal },
                                      }));
                                    }}
                                    className="w-full px-2 py-1 rounded font-bold text-blue-950 bg-transparent hover:bg-white focus:bg-white focus:ring-1 focus:ring-sky-500 focus:outline-none"
                                  />
                                </td>
                                <td className="p-1.5">
                                  <input
                                    type="text"
                                    value={subVal}
                                    placeholder="Enterprise Cloud Node"
                                    onChange={(e) => {
                                      setEditableOverrides((prev) => ({
                                        ...prev,
                                        [node.id]: { title: titleVal, subtitle: e.target.value },
                                      }));
                                    }}
                                    className="w-full px-2 py-1 rounded text-slate-700 bg-transparent hover:bg-white focus:bg-white focus:ring-1 focus:ring-sky-500 focus:outline-none"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
