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
  ChevronDown,
  Printer,
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
  mode: 'slides' | 'docs' | 'pdf';
  xmlContent: string;
  diagramName: string;
  blueprintId: string;
  masterImageSrc?: string;
  isFullPage?: boolean;
}

function escapeXmlText(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
  isFullPage = false,
}: GoogleWorkspaceDirectOpenModalProps) {
  const [activeMode, setActiveMode] = useState<'slides' | 'docs' | 'pdf'>(mode);
  const [showOpenWithDropdown, setShowOpenWithDropdown] = useState<boolean>(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [slide1ViewMode, setSlide1ViewMode] = useState<'interactive-twin' | 'decomposed-shapes'>('interactive-twin');
  const [docsDiagramViewMode, setDocsDiagramViewMode] = useState<'decomposed-shapes' | 'interactive-twin'>('decomposed-shapes');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(isFullPage);
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

  const edges = useMemo(() => parsedTopology.cells.filter((c) => c.edge), [parsedTopology.cells]);
  const graphW = Math.max(600, parsedTopology.maxX - parsedTopology.minX);
  const graphH = Math.max(400, parsedTopology.maxY - parsedTopology.minY);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return sortedVertices.find((v) => v.id === selectedNodeId) || null;
  }, [selectedNodeId, sortedVertices]);

  /**
   * Instant Synchronous Vector Diagram SVG Data URL (0ms latency, zero dependency on external embed.diagrams.net iframe)
   * Guarantees Slide 1, PDF Print Dossier, and PPTX/DOCX exports always have a crisp 1600x900 visual twin immediately.
   */
  const instantSvgDataUrl = useMemo(() => {
    if (sortedVertices.length === 0) return '';
    const svgW = 1600;
    const svgH = 900;
    const padX = 48;
    const padY = 48;
    const usableW = svgW - padX * 2;
    const usableH = svgH - padY * 2;

    const toX = (x: number) => ((x - parsedTopology.minX) / graphW) * usableW + padX;
    const toY = (y: number) => ((y - parsedTopology.minY) / graphH) * usableH + padY;
    const toW = (w: number) => Math.max(24, (w / graphW) * usableW);
    const toH = (h: number) => Math.max(20, (h / graphH) * usableH);

    const bgHex = parsedTopology.isDarkDiagram ? `#${parsedTopology.diagramBgHex || '0F172A'}` : '#FFFFFF';

    const rectElements: string[] = [];
    sortedVertices.forEach((node) => {
      if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700 && node.height >= 400) {
        return;
      }
      const x = toX(node.absX);
      const y = toY(node.absY);
      const w = toW(node.width);
      const h = toH(node.height);

      const parsedText = cleanHtmlToPlainText(node.value);
      const ov = editableOverrides[node.id];
      const title = escapeXmlText(ov ? ov.title : parsedText.title);
      const subtitle = escapeXmlText(ov ? ov.subtitle : parsedText.subtitle);

      const isContainer =
        node.style.container === '1' ||
        parentIds.has(node.id) ||
        (node.style.verticalAlign === 'top' && node.width * node.height > 18000) ||
        (node.width > 240 && node.height > 120);

      const fill =
        node.style.fillColor && node.style.fillColor !== 'none' && node.style.fillColor !== 'transparent'
          ? node.style.fillColor
          : isContainer
          ? '#F8FAFC'
          : '#FFFFFF';
      const stroke =
        node.style.strokeColor && node.style.strokeColor !== 'none' && node.style.strokeColor !== 'transparent'
          ? node.style.strokeColor
          : '#94A3B8';
      const rx = node.style.rounded === '1' ? 8 : 3;
      const dash = node.style.dashed === '1' ? 'stroke-dasharray="6,4"' : '';
      const textColor = node.htmlTitleColor
        ? `#${node.htmlTitleColor}`
        : node.style.fontColor
        ? node.style.fontColor
        : parsedTopology.isDarkDiagram
        ? '#F8FAFC'
        : '#0F172A';

      rectElements.push(
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${rx}" fill="${escapeXmlText(
          fill
        )}" stroke="${escapeXmlText(stroke)}" stroke-width="${isContainer ? '1.8' : '1.5'}" ${dash} />`
      );

      if (title) {
        if (isContainer) {
          rectElements.push(
            `<text x="${(x + 10).toFixed(1)}" y="${(y + 18).toFixed(
              1
            )}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="${escapeXmlText(
              textColor
            )}">${title.slice(0, 65)}</text>`
          );
        } else {
          const centerY = subtitle ? y + h / 2 - 3 : y + h / 2 + 4;
          rectElements.push(
            `<text x="${(x + w / 2).toFixed(1)}" y="${centerY.toFixed(
              1
            )}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="700" fill="${escapeXmlText(
              textColor
            )}">${title.slice(0, 42)}</text>`
          );
          if (subtitle) {
            rectElements.push(
              `<text x="${(x + w / 2).toFixed(1)}" y="${(centerY + 14).toFixed(
                1
              )}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" fill="#475569">${subtitle.slice(
                0,
                48
              )}</text>`
            );
          }
        }
      }
    });

    const edgeElements: string[] = [];
    edges.forEach((edge) => {
      const src = sortedVertices.find((v) => v.id === edge.source);
      const tgt = sortedVertices.find((v) => v.id === edge.target);
      const exitX = parseFloat(edge.style.exitX ?? '0.5');
      const exitY = parseFloat(edge.style.exitY ?? '0.5');
      const entryX = parseFloat(edge.style.entryX ?? '0.5');
      const entryY = parseFloat(edge.style.entryY ?? '0.5');

      const ptStart = src
        ? { x: src.absX + src.width * exitX, y: src.absY + src.height * exitY }
        : edge.sourcePoint;
      const ptEnd = tgt
        ? { x: tgt.absX + tgt.width * entryX, y: tgt.absY + tgt.height * entryY }
        : edge.targetPoint;
      if (!ptStart || !ptEnd) return;

      let routedWaypoints = [...edge.waypoints];
      if (routedWaypoints.length === 0 && Math.abs(ptStart.x - ptEnd.x) > 4 && Math.abs(ptStart.y - ptEnd.y) > 4) {
        const isHorizontalExit =
          exitX === 0 || exitX === 1 || Math.abs(ptEnd.x - ptStart.x) >= Math.abs(ptEnd.y - ptStart.y);
        if (isHorizontalExit) {
          const midX = (ptStart.x + ptEnd.x) / 2;
          routedWaypoints = [
            { x: midX, y: ptStart.y },
            { x: midX, y: ptEnd.y },
          ];
        } else {
          const midY = (ptStart.y + ptEnd.y) / 2;
          routedWaypoints = [
            { x: ptStart.x, y: midY },
            { x: ptEnd.x, y: midY },
          ];
        }
      }
      const allPts = [ptStart, ...routedWaypoints, ptEnd];
      const ptsStr = allPts.map((p) => `${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(' ');
      const strokeColor = edge.style.strokeColor || '#2563EB';
      const dash = edge.style.dashed === '1' ? 'stroke-dasharray="5,4"' : '';
      edgeElements.push(
        `<polyline fill="none" points="${ptsStr}" stroke="${escapeXmlText(
          strokeColor
        )}" stroke-width="2" ${dash} marker-end="url(#instant-arrow)" />`
      );
    });

    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
      <defs>
        <marker id="instant-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#2563EB" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="${escapeXmlText(bgHex)}" />
      ${rectElements.join('\n')}
      ${edgeElements.join('\n')}
    </svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
  }, [sortedVertices, parentIds, edges, parsedTopology, graphW, graphH, editableOverrides]);

  const effectivePreviewUrl = pngPreviewUrl || masterImageSrc || instantSvgDataUrl;

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
    exportDiagramPng(xmlContent, { scale: 2, transparent: false })
      .then((dataUrl) => {
        if (!cancelled && dataUrl) {
          setPngPreviewUrl(dataUrl);
        }
      })
      .catch(() => {
        // Fallback to instantSvgDataUrl already active
      })
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
      } else if (e.key === 'Escape' && isFullscreen && !isFullPage) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, isFullPage]);

  if (!isOpen) return null;

  const handleSaveAuthSettings = (token: string, clientId: string) => {
    setGoogleAccessToken(token);
    setGoogleClientId(clientId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pc_google_drive_access_token', token);
      localStorage.setItem('pc_google_oauth_client_id', clientId);
    }
  };

  /**
   * Helper: Uploads compiled blob to Cloud Bridge
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

    const targetPublicUrl = `https://promptcanvas-248990048888.cr.gclb.goog/api/export/cloud-bridge/${bridgeId}.${format}`;
    const finalPublicUrl = localData?.publicUrl || targetPublicUrl;
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
          masterImageSrc: effectivePreviewUrl || undefined,
        });
      } else {
        blob = await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          returnBlob: true,
          bridgeId: generatedBridgeId,
          masterImageSrc: effectivePreviewUrl || undefined,
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
   * Print / Save Executive PDF Report — 100% Synchronous window.open (Zero Popup Blocking & 0ms Wait)
   */
  const handlePrintPdfReport = () => {
    try {
      const imgUrl = effectivePreviewUrl;
      const printWin = typeof window !== 'undefined' ? window.open('', '_blank') : null;
      if (!printWin) {
        setStatusMessage({
          type: 'info',
          text: 'Switched to Same-Screen PDF Document Viewer. Use Ctrl+P / ⌘P or allow popups to open the print window.',
        });
        setActiveMode('pdf');
        return;
      }

      const rowsHtml = sortedVertices
        .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
        .slice(0, 80)
        .map((node, idx) => {
          const parsed = cleanHtmlToPlainText(node.value);
          const ov = editableOverrides[node.id];
          const t = escapeXmlText(ov ? ov.title : parsed.title || node.id);
          const s = escapeXmlText(ov ? ov.subtitle : parsed.subtitle || 'Enterprise Cloud Architecture Component');
          return `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;font-family:monospace;font-size:11px;color:#475569;">OBJ-${String(
              idx + 1
            ).padStart(2, '0')}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;font-weight:700;font-size:12px;color:#0f172a;">${t}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #e2e8f0;font-size:11.5px;color:#334155;">${s}</td>
          </tr>`;
        })
        .join('');

      printWin.document.write(`<!DOCTYPE html>
        <html>
          <head>
            <title>${escapeXmlText(diagramName)} (${escapeXmlText(blueprintId)}) — Executive Architecture PDF</title>
            <style>
              @page { size: landscape; margin: 14mm; }
              body { font-family: system-ui, -apple-system, sans-serif; padding: 24px 32px; color: #0f172a; margin: 0; background: #ffffff; }
              .hdr { border-bottom: 2px solid #0d9488; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
              h1 { font-size: 22px; margin: 4px 0 0 0; color: #0f172a; }
              .badge { font-family: monospace; font-size: 12px; font-weight: 700; color: #0d9488; text-transform: uppercase; }
              img { width: 100%; max-height: 520px; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 10px; margin-bottom: 24px; background: #ffffff; }
              table { width: 100%; border-collapse: collapse; page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              th { text-align: left; padding: 8px 10px; background: #0f172a; color: #ffffff; font-size: 11px; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <div class="hdr">
              <div>
                <div class="badge">BLUEPRINT ${escapeXmlText(blueprintId)} • 1:1 MASTER ARCHITECTURE DOSSIER</div>
                <h1>${escapeXmlText(diagramName)}</h1>
              </div>
              <div style="font-size:11px;color:#64748b;font-weight:600;">Vector Nodes: ${sortedVertices.length} • Connectors: ${edges.length}</div>
            </div>
            ${imgUrl ? `<img src="${imgUrl}" alt="${escapeXmlText(diagramName)}" />` : ''}
            <h2 style="font-size:15px;margin-bottom:8px;">Component Inventory &amp; Technical Specification (${sortedVertices.length} Objects)</h2>
            <table>
              <thead><tr><th style="width:90px;">Object ID</th><th style="width:260px;">Component Name</th><th>Technical Role &amp; Specification</th></tr></thead>
              <tbody>${rowsHtml}</tbody>
            </table>
            <script>window.onload = function() { setTimeout(function() { window.print(); }, 200); };</script>
          </body>
        </html>`);
      printWin.document.close();
      setStatusMessage({
        type: 'success',
        text: `🖨️ Opened Printable Executive PDF Dossier for ${diagramName} (${blueprintId})!`,
      });
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: 'PDF Print error: ' + (e?.message || 'Unknown error') });
    }
  };

  /**
   * Method 2: Switch Same-Screen Preview Mode (Zero Forced File Downloads)
   */
  const handleOpenGoogleCloudViewer = async (targetMode?: 'slides' | 'docs' | 'pdf', forceExternalLaunch = false) => {
    const modeToUse = targetMode || activeMode;
    setShowOpenWithDropdown(false);
    setActiveMode(modeToUse);

    if (!forceExternalLaunch) {
      setStatusMessage({
        type: 'info',
        text:
          modeToUse === 'slides'
            ? `📊 Viewing Same-Screen Google Slides 3-Slide Widescreen Deck (${sortedVertices.length} interactive vector nodes).`
            : modeToUse === 'docs'
            ? `📄 Viewing Same-Screen Google Docs Architecture Specification (${sortedVertices.length} interactive vector nodes).`
            : `🖨️ Viewing Same-Screen 2-Page Executive PDF Document Dossier.`,
      });
      return;
    }

    if (modeToUse === 'pdf') {
      handlePrintPdfReport();
      return;
    }

    await handleCopyAndLaunchNewTab(modeToUse, true);
  };

  /**
   * Direct Download .pptx / .docx / .pdf locally (ONLY invoked when user explicitly clicks Download)
   */
  const handleDirectDownloadFile = async () => {
    if (activeMode === 'pdf') {
      handlePrintPdfReport();
      return;
    }
    setIsDownloadingDeck(true);
    try {
      if (activeMode === 'slides') {
        await exportDrawioToEditablePptx(xmlContent, diagramName, blueprintId, {
          masterImageSrc: effectivePreviewUrl || undefined,
        });
      } else {
        await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          masterImageSrc: effectivePreviewUrl || undefined,
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
   * Method 3: Zero-Download Clipboard Copy + Open Google Slides/Docs Tab (Never forces a .pptx or .docx file download!)
   */
  const handleCopyAndLaunchNewTab = async (overrideMode?: 'slides' | 'docs', openCloudTabImmediately = true) => {
    const targetMode = overrideMode || (activeMode === 'pdf' ? 'docs' : activeMode);
    setActiveMode(targetMode);
    setShowOpenWithDropdown(false);
    setIsCopyingAndLaunching(true);

    try {
      const publicDiagramImgUrl =
        effectivePreviewUrl && effectivePreviewUrl.startsWith('http')
          ? effectivePreviewUrl
          : 'https://promptcanvas-248990048888.cr.gclb.goog/blueprints/azure_application_landing_zone.png';

      const tableRowsHtml = sortedVertices
        .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
        .slice(0, 80)
        .map((node, idx) => {
          const parsed = cleanHtmlToPlainText(node.value);
          const ov = editableOverrides[node.id];
          const t = escapeXmlText(ov ? ov.title : parsed.title);
          const s = escapeXmlText(ov ? ov.subtitle : parsed.subtitle || 'Core Enterprise Cloud Service');
          return `<tr>
            <td style="padding:6px 10px;border:1px solid #cbd5e1;font-family:monospace;font-size:10pt;">OBJ-${String(idx + 1).padStart(2, '0')}</td>
            <td style="padding:6px 10px;border:1px solid #cbd5e1;font-weight:bold;font-size:10.5pt;color:#0f172a;">${t}</td>
            <td style="padding:6px 10px;border:1px solid #cbd5e1;font-size:10pt;color:#334155;">${s}</td>
          </tr>`;
        })
        .join('');

      const richHtml = `
        <div style="font-family: Arial, sans-serif; color: #0f172a;">
          <h1 style="color: #0f172a; font-size: 18pt; margin-bottom: 4px;">${escapeXmlText(diagramName)} — Architecture Specification (${escapeXmlText(blueprintId)})</h1>
          <p style="color: #0d9488; font-weight: bold; font-size: 10.5pt; margin-top: 0;">1:1 Master Architecture Topology • ${sortedVertices.length} Interactive Vector Components • ${edges.length} Connectors</p>
          <div style="margin: 12px 0;">
            <img src="${publicDiagramImgUrl}" width="840" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 8px;" alt="${escapeXmlText(diagramName)}" />
          </div>
          <h2 style="font-size: 13pt; color: #0f172a; margin-top: 16px; margin-bottom: 8px;">Component Inventory &amp; Technical Specification Matrix</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background-color: #0f172a; color: #ffffff;">
                <th style="padding: 8px 10px; text-align: left; border: 1px solid #0f172a;">Object ID</th>
                <th style="padding: 8px 10px; text-align: left; border: 1px solid #0f172a;">Component Name</th>
                <th style="padding: 8px 10px; text-align: left; border: 1px solid #0f172a;">Technical Role &amp; Specification</th>
              </tr>
            </thead>
            <tbody>${tableRowsHtml}</tbody>
          </table>
        </div>
      `;

      // Write to clipboard BEFORE opening the new tab so the current document still has focus!
      let copiedSuccessfully = false;
      const clipboardItems: Record<string, Blob> = {
        'text/html': new Blob([richHtml], { type: 'text/html' }),
        'text/plain': new Blob([`${diagramName} (${blueprintId}) - Editable Architecture Specification`], { type: 'text/plain' }),
      };

      // Per SKILL.md Rule 49: Only include image/png in Slides mode; omit image/png in Docs mode so Google Docs pastes the full HTML + table
      if (targetMode === 'slides' && effectivePreviewUrl) {
        const pngBlob = await convertAnyImageUrlToPngBlob(effectivePreviewUrl);
        if (pngBlob) {
          clipboardItems['image/png'] = pngBlob;
        }
      }

      try {
        await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);
        copiedSuccessfully = true;
      } catch {
        // Fallback DOM selection copy if navigator.clipboard.write is restricted
        try {
          const tempEl = document.createElement('div');
          tempEl.contentEditable = 'true';
          tempEl.style.position = 'fixed';
          tempEl.style.left = '-9999px';
          tempEl.innerHTML = richHtml;
          document.body.appendChild(tempEl);
          const range = document.createRange();
          range.selectNodeContents(tempEl);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          document.execCommand('copy');
          sel?.removeAllRanges();
          document.body.removeChild(tempEl);
          copiedSuccessfully = true;
        } catch {
          // ignore
        }
      }

      const targetCloudUrl = targetMode === 'slides' ? 'https://slides.new' : 'https://docs.new';
      const cloudWin =
        openCloudTabImmediately && typeof window !== 'undefined' ? window.open(targetCloudUrl, '_blank') : null;

      setLaunchAssistantModal(targetMode);
      setStatusMessage({
        type: 'success',
        text: `✅ ${copiedSuccessfully ? 'Copied' : 'Prepared'} high-res ${targetMode === 'slides' ? 'Widescreen Slide Visual' : 'Architecture Specification & Component Table'} to clipboard${cloudWin ? ` & opened Google ${targetMode === 'slides' ? 'Slides' : 'Docs'}` : ''}! Press ⌘V / Ctrl+V in the Google tab to paste immediately (Zero file download required).`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Cloud launch notice: ' + (err?.message || 'Opened Google Workspace tab.'),
      });
    } finally {
      setIsCopyingAndLaunching(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/85 backdrop-blur-md ${
        isFullscreen || isFullPage ? 'p-0' : 'p-2 md:p-4'
      }`}
      data-testid="google-workspace-direct-open-modal"
    >
      <div
        className={`bg-[#0B111E] border border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen || isFullPage ? 'w-screen h-screen rounded-none border-0' : 'w-full max-w-[1560px] h-[94vh] rounded-2xl'
        }`}
      >
        {/* Top Dark Gmail-Style Single-Row Preview Header Bar */}
        <div className="flex items-center justify-between gap-2.5 px-4 py-2.5 bg-[#090D16] border-b border-slate-800 relative z-50 shrink-0">
          {/* Left: Document Title & Metadata */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-inner shrink-0 ${
                activeMode === 'slides'
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400'
                  : activeMode === 'docs'
                  ? 'bg-sky-500/15 border border-sky-500/40 text-sky-400'
                  : 'bg-rose-500/15 border border-rose-500/40 text-rose-400'
              }`}
            >
              {activeMode === 'slides' ? (
                <Presentation className="w-4 h-4" />
              ) : activeMode === 'docs' ? (
                <FileText className="w-4 h-4" />
              ) : (
                <Printer className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                  {blueprintId}
                </span>
                <h2 className="text-xs md:text-sm font-bold text-white tracking-tight truncate max-w-[180px] lg:max-w-[300px] xl:max-w-[380px]">
                  {diagramName}
                </h2>
              </div>
              <p className="text-[10.5px] text-slate-400 truncate">
                Same-Screen Cloud Preview •{' '}
                <span className="text-emerald-400 font-semibold">{sortedVertices.length} interactive vector nodes</span>
              </p>
            </div>
          </div>

          {/* Center: Same-Screen Preview Switcher Tabs + Gmail-Style "Open with ▾" Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:inline-flex items-center bg-slate-900 border border-slate-700/80 p-1 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => handleOpenGoogleCloudViewer('slides', false)}
                disabled={isOpeningCloudViewer}
                data-testid="switch-to-google-slides-btn"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'slides'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Switch same-screen preview to Google Slides 3-Slide Widescreen Deck (Zero file download)"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Slides Preview</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenGoogleCloudViewer('docs', false)}
                disabled={isOpeningCloudViewer}
                data-testid="switch-to-google-docs-btn"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'docs'
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Switch same-screen preview to Google Docs Specification (Zero file download)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Docs Preview</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenGoogleCloudViewer('pdf', false)}
                data-testid="switch-to-pdf-btn"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'pdf'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Switch same-screen preview to Printable Executive PDF Document (Zero file download)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PDF Preview</span>
              </button>
            </div>

            <div className="relative">
              <div className="inline-flex items-center rounded-xl bg-slate-800/95 border border-slate-600/80 shadow-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowOpenWithDropdown((prev) => !prev)}
                  data-testid="gmail-open-with-dropdown-btn"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-white hover:bg-slate-700/80 transition cursor-pointer whitespace-nowrap"
                >
                  <span>Open with</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${showOpenWithDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {showOpenWithDropdown && (
                <div
                  data-testid="gmail-open-with-dropdown-menu"
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0F172A] border border-slate-700 shadow-2xl py-2 z-[200]"
                >
                  <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Switch Same-Screen Preview Format (Zero Download)
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenGoogleCloudViewer('slides', false)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-3 hover:bg-slate-800 transition cursor-pointer ${
                      activeMode === 'slides' ? 'bg-amber-500/10 text-amber-300 font-bold' : 'text-slate-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Presentation className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center justify-between">
                        <span>Google Slides (3-Slide Deck)</span>
                        {activeMode === 'slides' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div className="text-[10.5px] text-slate-400">1:1 Visual Twin + Editable Vector Topology</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenGoogleCloudViewer('docs', false)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-3 hover:bg-slate-800 transition cursor-pointer ${
                      activeMode === 'docs' ? 'bg-sky-500/10 text-sky-300 font-bold' : 'text-slate-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center justify-between">
                        <span>Google Docs (Specification)</span>
                        {activeMode === 'docs' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </div>
                      <div className="text-[10.5px] text-slate-400">Interactive Architecture Spec &amp; Component Table</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenGoogleCloudViewer('pdf', false)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-3 hover:bg-slate-800 transition cursor-pointer ${
                      activeMode === 'pdf' ? 'bg-rose-500/10 text-rose-300 font-bold' : 'text-slate-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      <Printer className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center justify-between">
                        <span>PDF Document Viewer</span>
                        {activeMode === 'pdf' && <Check className="w-3.5 h-3.5 text-rose-400" />}
                      </div>
                      <div className="text-[10.5px] text-slate-400">Multi-page Executive PDF Dossier &amp; Print</div>
                    </div>
                  </button>

                  <div className="h-px bg-slate-800 my-1.5" />
                  <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Launch External Google Cloud Tab (Zero Download)
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowOpenWithDropdown(false);
                      handleCopyAndLaunchNewTab('slides', true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800 text-amber-300 font-semibold cursor-pointer"
                  >
                    <span>🚀 Launch in Google Slides (slides.new + Copy)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowOpenWithDropdown(false);
                      handleCopyAndLaunchNewTab('docs', true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800 text-sky-300 font-semibold cursor-pointer"
                  >
                    <span>🚀 Launch in Google Docs (docs.new + Copy)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowOpenWithDropdown(false);
                      handlePrintPdfReport();
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800 text-rose-300 font-semibold cursor-pointer"
                  >
                    <span>🖨️ Print / Save as PDF Report</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Controls: Primary Cloud Launch + Download + Close */}
          <div className="flex items-center gap-2 shrink-0">
            {activeMode === 'slides' ? (
              <button
                onClick={() => handleOpenGoogleCloudViewer('slides', true)}
                disabled={isCopyingAndLaunching}
                data-testid="launch-external-google-slides-btn"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 whitespace-nowrap"
                title="Copy 1:1 Widescreen Slide & Open Google Slides (slides.new) in a new tab — Zero file download"
              >
                {isCopyingAndLaunching ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>Open in Google Slides ↗</span>
              </button>
            ) : activeMode === 'docs' ? (
              <button
                onClick={() => handleOpenGoogleCloudViewer('docs', true)}
                disabled={isCopyingAndLaunching}
                data-testid="launch-external-google-docs-btn"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white whitespace-nowrap"
                title="Copy Architecture Spec & Open Google Docs (docs.new) in a new tab — Zero file download"
              >
                {isCopyingAndLaunching ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>Open in Google Docs ↗</span>
              </button>
            ) : (
              <button
                onClick={handlePrintPdfReport}
                data-testid="launch-external-pdf-print-btn"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white whitespace-nowrap"
                title="Open Printable Executive PDF Dossier"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF ↗</span>
              </button>
            )}

            <button
              onClick={handleDirectDownloadFile}
              disabled={isDownloadingDeck}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Explicitly download local file (.pptx / .docx / .pdf)"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              data-testid="close-google-workspace-modal-btn"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-all cursor-pointer ml-0.5"
              title="Close Cloud Viewer (Esc)"
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
                    ? '✅ Complete Architecture Specification & High-Res Diagram Copied to Clipboard!'
                    : '✅ High-Resolution 16:9 Widescreen Architecture Slide Copied to Clipboard!'}
                </span>
              </div>
              {launchAssistantModal === 'docs' ? (
                <p className="text-xs text-slate-200 leading-relaxed">
                  Google&apos;s <code className="text-sky-300 font-mono">docs.new</code> tab is open. Press{' '}
                  <kbd className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold font-mono text-xs shadow">
                    ⌘V (Mac) / Ctrl+V (Win)
                  </kbd>{' '}
                  inside the Google Docs tab to paste your entire <strong>1:1 Architecture Diagram + Editable Specification Table</strong> with zero file downloads!
                </p>
              ) : (
                <p className="text-xs text-slate-200 leading-relaxed">
                  Google&apos;s <code className="text-amber-300 font-mono">slides.new</code> tab is open. Press{' '}
                  <kbd className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold font-mono text-xs shadow">
                    ⌘V (Mac) / Ctrl+V (Win)
                  </kbd>{' '}
                  inside the Google Slides tab to paste your high-resolution widescreen slide immediately (zero file download required)!
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
                    : '🚀 Open Google Slides (slides.new) & Press ⌘V ↗'}
                </span>
              </button>
              <button
                onClick={handleDirectDownloadFile}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Optional: Download .{launchAssistantModal === 'slides' ? 'pptx' : 'docx'}</span>
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
                          {effectivePreviewUrl ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={effectivePreviewUrl}
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
                        (() => {
                          // Lock diagram aspect ratio inside the 16:9 slide frame so portrait/square topologies
                          // (e.g. GCP-MULTIAGENT-01 at 1020x1140) are never squashed vertically.
                          const slideAspect = 16 / 9;
                          const diagramAspect = Math.max(0.25, Math.min(4, graphW / Math.max(1, graphH)));
                          const maxStageW = 94;
                          const maxStageH = 92;
                          const stageWidthPct =
                            diagramAspect >= slideAspect
                              ? maxStageW
                              : Math.min(maxStageW, maxStageH * (diagramAspect / slideAspect));
                          const stageHeightPct =
                            diagramAspect >= slideAspect
                              ? Math.min(maxStageH, maxStageW * (slideAspect / diagramAspect))
                              : maxStageH;
                          const stageOffsetX = (100 - stageWidthPct) / 2;
                          const stageOffsetY = (100 - stageHeightPct) / 2;

                          const toPctX = (x: number) =>
                            ((x - parsedTopology.minX) / graphW) * stageWidthPct + stageOffsetX;
                          const toPctY = (y: number) =>
                            ((y - parsedTopology.minY) / graphH) * stageHeightPct + stageOffsetY;

                          return (
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

                                  const exitX = parseFloat(edge.style.exitX ?? '0.5');
                                  const exitY = parseFloat(edge.style.exitY ?? '0.5');
                                  const entryX = parseFloat(edge.style.entryX ?? '0.5');
                                  const entryY = parseFloat(edge.style.entryY ?? '0.5');

                                  const ptStart = src
                                    ? {
                                        x: src.absX + src.width * exitX,
                                        y: src.absY + src.height * exitY,
                                      }
                                    : edge.sourcePoint;
                                  const ptEnd = tgt
                                    ? {
                                        x: tgt.absX + tgt.width * entryX,
                                        y: tgt.absY + tgt.height * entryY,
                                      }
                                    : edge.targetPoint;

                                  if (!ptStart || !ptEnd) return null;

                                  // Generate orthogonal 90-degree elbow waypoints when none are explicitly stored
                                  let routedWaypoints = [...edge.waypoints];
                                  if (
                                    routedWaypoints.length === 0 &&
                                    Math.abs(ptStart.x - ptEnd.x) > 4 &&
                                    Math.abs(ptStart.y - ptEnd.y) > 4
                                  ) {
                                    const isHorizontalExit = exitX === 0 || exitX === 1 || Math.abs(ptEnd.x - ptStart.x) >= Math.abs(ptEnd.y - ptStart.y);
                                    if (isHorizontalExit) {
                                      const midX = (ptStart.x + ptEnd.x) / 2;
                                      routedWaypoints = [
                                        { x: midX, y: ptStart.y },
                                        { x: midX, y: ptEnd.y },
                                      ];
                                    } else {
                                      const midY = (ptStart.y + ptEnd.y) / 2;
                                      routedWaypoints = [
                                        { x: ptStart.x, y: midY },
                                        { x: ptEnd.x, y: midY },
                                      ];
                                    }
                                  }

                                  const allPts = [ptStart, ...routedWaypoints, ptEnd];
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
                                {sortedVertices.map((node) => {
                                  if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700 && node.height >= 400) {
                                    return null;
                                  }

                                  const leftPct = toPctX(node.absX);
                                  const topPct = toPctY(node.absY);
                                  const widthPct = Math.max(1.2, (node.width / graphW) * stageWidthPct);
                                  const heightPct = Math.max(1.5, (node.height / graphH) * stageHeightPct);

                                  const parsedText = cleanHtmlToPlainText(node.value);
                                  const override = editableOverrides[node.id];
                                  const title = override ? override.title : parsedText.title;
                                  const subtitle = override ? override.subtitle : parsedText.subtitle;

                                  // Extract inline <img src="data:image/..."> from HTML value if not already extracted
                                  let htmlImgSrc = '';
                                  if (!node.extractedSvgs[0] && !node.imageDataUrl && node.value) {
                                    const decodedVal = node.value
                                      .replace(/&quot;/g, '"')
                                      .replace(/&apos;/g, "'")
                                      .replace(/&lt;/g, '<')
                                      .replace(/&gt;/g, '>')
                                      .replace(/&amp;/g, '&');
                                    const imgMatch = decodedVal.match(/<img[^>]+src=["']([^"']+)["']/i);
                                    if (imgMatch && imgMatch[1]) {
                                      htmlImgSrc = imgMatch[1];
                                    }
                                  }

                                  const iconMarkupOrUrl = node.extractedSvgs[0] || node.imageDataUrl || htmlImgSrc;

                                  const isImageShape =
                                    node.style.shape === 'image' ||
                                    Boolean(node.imageDataUrl) ||
                                    node.extractedSvgs.length > 0 ||
                                    Boolean(htmlImgSrc);

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
                          );
                        })()
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
          ) : activeMode === 'pdf' ? (
            /* =========================================================================
               DEDICATED 2-PAGE CHROME / GMAIL-STYLE PDF DOCUMENT VIEWER (activeMode === 'pdf')
               ========================================================================= */
            <>
              {/* Left PDF Pages & Print Controls Rail */}
              <div className="w-full md:w-72 bg-slate-100 border-r border-slate-200 p-3.5 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 hidden md:block">
                  Executive PDF Dossier (2 Pages)
                </div>

                <div className="p-3.5 rounded-xl bg-white border-2 border-rose-500 shadow-sm space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-900">Page 1 &amp; 2 • PDF Dossier</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-100 text-rose-800">
                      A4 Landscape
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Page 1: 1:1 High-Resolution Architecture Diagram ({sortedVertices.length} nodes).<br />
                    Page 2: Complete Component Inventory &amp; Technical Specification Matrix.
                  </p>
                  <button
                    type="button"
                    onClick={handlePrintPdfReport}
                    data-testid="pdf-viewer-print-save-btn"
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save as PDF (.pdf)</span>
                  </button>
                </div>

                <div className="mt-auto pt-3 border-t border-slate-200 hidden md:block">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Printer className="w-3.5 h-3.5 text-rose-600" />
                      <span>Vector-Grade PDF Output</span>
                    </div>
                    <p className="text-[11px] text-rose-900 leading-relaxed">
                      Click &ldquo;Print / Save as PDF&rdquo; above to open the native browser PDF print dialog in landscape mode.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Main Chrome/Gmail Dark Gray PDF Reader Backdrop (#525659) */}
              <div
                className="flex-1 overflow-y-auto bg-[#525659] flex flex-col items-center"
                data-testid="live-browser-pdf-canvas"
              >
                {/* Sticky Top PDF Reader Toolbar */}
                <div className="sticky top-0 z-30 w-full bg-[#323639] text-slate-100 px-6 py-2.5 shadow-lg border-b border-black/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono text-[11px] font-bold">
                      PDF
                    </span>
                    <span className="text-xs font-bold truncate">
                      {diagramName.replace(/\s+/g, '_')}_{blueprintId.replace('#', '')}_Architecture_Dossier.pdf
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                    <span className="px-2.5 py-1 rounded bg-black/40">Page 1 – 2 / 2</span>
                    <span className="hidden sm:inline px-2.5 py-1 rounded bg-black/40">100% Landscape</span>
                  </div>
                  <button
                    type="button"
                    onClick={handlePrintPdfReport}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>

                {/* PDF Pages Stack */}
                <div className="w-full max-w-[1060px] p-6 md:p-8 space-y-8">
                  {/* PDF PAGE 1: WIDESCREEN ARCHITECTURE DIAGRAM SHEET */}
                  <div className="bg-white shadow-2xl border border-slate-400 p-8 text-slate-900 space-y-5">
                    <div className="border-b-2 border-teal-600 pb-3 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-teal-700 uppercase">
                          BLUEPRINT {blueprintId} • PAGE 1 OF 2 • 1:1 MASTER ARCHITECTURE TOPOLOGY
                        </div>
                        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-0.5">{diagramName}</h1>
                      </div>
                      <div className="text-xs font-mono text-slate-500 shrink-0">
                        Nodes: {sortedVertices.length} • Edges: {edges.length}
                      </div>
                    </div>

                    <div className="w-full aspect-[16/9] border border-slate-300 rounded-lg overflow-hidden bg-white flex items-center justify-center p-2">
                      <img
                        src={effectivePreviewUrl}
                        alt={diagramName}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Generated by PromptCanvas Enterprise Architecture Engine (Omni 1.1)</span>
                      <span>Page 1 of 2</span>
                    </div>
                  </div>

                  {/* PDF PAGE 2: COMPONENT INVENTORY & TECHNICAL SPECIFICATION SHEET */}
                  <div className="bg-white shadow-2xl border border-slate-400 p-8 text-slate-900 space-y-5">
                    <div className="border-b-2 border-teal-600 pb-3 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-teal-700 uppercase">
                          BLUEPRINT {blueprintId} • PAGE 2 OF 2 • COMPONENT SPECIFICATION INVENTORY
                        </div>
                        <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-0.5">
                          Component Inventory &amp; Technical Specification ({sortedVertices.length} Objects)
                        </h2>
                      </div>
                      <span className="text-xs font-mono text-slate-500">Page 2 of 2</span>
                    </div>

                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          <th className="p-2.5 text-left border border-slate-800 w-24">Object ID</th>
                          <th className="p-2.5 text-left border border-slate-800 w-64">Component Name</th>
                          <th className="p-2.5 text-left border border-slate-800">Technical Role &amp; Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedVertices
                          .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
                          .slice(0, 40)
                          .map((node, idx) => {
                            const parsed = cleanHtmlToPlainText(node.value);
                            const override = editableOverrides[node.id];
                            const title = override ? override.title : parsed.title;
                            const subtitle = override ? override.subtitle : parsed.subtitle;
                            return (
                              <tr key={node.id} className="border-b border-slate-200 even:bg-slate-50">
                                <td className="p-2 font-mono font-bold text-slate-700">
                                  OBJ-{String(idx + 1).padStart(2, '0')}
                                </td>
                                <td className="p-2 font-bold text-slate-900">{title}</td>
                                <td className="p-2 text-slate-600">{subtitle || 'Core Enterprise Cloud Component'}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* GOOGLE DOCS SPECIFICATION LIVE STUDIO VIEW (WITH 100% EDITABLE DIAGRAM + LIVE NODE EDITOR + COMPONENT TABLE) */
            <>
              {/* Left Document Outline & Live Node Editor Rail */}
              <div className="w-full md:w-72 bg-slate-100 border-r border-slate-200 p-3.5 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 hidden md:block">
                  Google Docs Specification Sections
                </div>

                <div className="flex md:flex-col gap-2 shrink-0">
                  <div className="p-3 rounded-xl bg-white border-2 border-sky-500 shadow-xs space-y-2">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">1. Editable Vector Diagram</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-sky-100 text-sky-800">
                        {sortedVertices.length} Vector Nodes
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      100% Native Editable Word DrawingML Vector Diagram + Full Component Specification Table.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyAndLaunchNewTab('docs', true)}
                      data-testid="docs-sidebar-launch-btn"
                      className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Copy &amp; Open in Google Docs ↗</span>
                    </button>
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
                        <span>Interactive Editable Word Diagram</span>
                      </div>
                      <p className="text-[11px] text-sky-900 leading-relaxed">
                        Click any component box, enclave, or icon on the diagram to customize its label &amp; role before opening in Google Docs!
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
                        <span>Google Docs Architecture Specification &amp; Editable Diagram</span>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{diagramName}</h1>
                      <p className="text-sm text-slate-500 mt-1">
                        Blueprint ID: <span className="font-mono font-bold text-slate-700">{blueprintId}</span> •{' '}
                        <span className="text-emerald-700 font-semibold">
                          100% Native Editable Vector Diagram &amp; Specification Table
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyAndLaunchNewTab('docs', true)}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Copy &amp; Open in Google Docs ↗</span>
                    </button>
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
                          <span>Editable Decomposed Vector Diagram ({sortedVertices.length} Shapes)</span>
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

                              const ptStart = src
                                ? {
                                    x: src.absX + src.width * parseFloat(edge.style.exitX ?? '0.5'),
                                    y: src.absY + src.height * parseFloat(edge.style.exitY ?? '0.5'),
                                  }
                                : edge.sourcePoint;
                              const ptEnd = tgt
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
                          {effectivePreviewUrl ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={effectivePreviewUrl}
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

                  {/* SECTION 2: COMPONENT INVENTORY & TECHNICAL SPECIFICATION TABLE IN GOOGLE DOCS */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          2. Component Inventory &amp; Technical Specification Matrix ({sortedVertices.length} Objects)
                        </h2>
                        <p className="text-xs text-slate-500">
                          Click any row below to edit the component title or technical role live before launching Google Docs.
                        </p>
                      </div>
                    </div>

                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          <th className="p-2.5 text-left border border-slate-800 w-24">Object ID</th>
                          <th className="p-2.5 text-left border border-slate-800 w-64">Component Name</th>
                          <th className="p-2.5 text-left border border-slate-800">Technical Role &amp; Specification</th>
                          <th className="p-2.5 text-left border border-slate-800 w-32">Classification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedVertices
                          .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
                          .slice(0, 30)
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
                                  selectedNodeId === node.id ? 'bg-sky-50' : 'hover:bg-slate-50'
                                }`}
                              >
                                <td className="p-2 font-mono font-bold text-slate-800">
                                  OBJ-{String(idx + 1).padStart(2, '0')}
                                </td>
                                <td className="p-2 font-bold text-sky-900">{title}</td>
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
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
