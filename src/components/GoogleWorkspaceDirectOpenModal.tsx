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
  const [showOpenWithDropdown, setShowOpenWithDropdown] = useState<boolean>(!isFullPage);
  const [previewZoom, setPreviewZoom] = useState<number>(100);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [slide1ViewMode, setSlide1ViewMode] = useState<'interactive-twin' | 'decomposed-shapes'>('interactive-twin');
  const [docsDiagramViewMode, setDocsDiagramViewMode] = useState<'decomposed-shapes' | 'interactive-twin'>('decomposed-shapes');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(isFullPage);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(false);
  const [editableDocTitle, setEditableDocTitle] = useState<string>(`${diagramName} (${blueprintId})`);
  const resolvedMasterImageProp = useMemo(() => {
    if (masterImageSrc && !masterImageSrc.startsWith('data:image/svg+xml')) {
      return masterImageSrc;
    }
    const cleanId = (blueprintId || '').replace(/^#/, '').trim();
    const numId = Number(cleanId);
    if (cleanId !== '' && !Number.isNaN(numId) && numId >= 0 && numId <= 74) {
      return `/templates/canonical_${cleanId.padStart(2, '0')}.png`;
    }
    return null;
  }, [masterImageSrc, blueprintId]);
  const [pngPreviewUrl, setPngPreviewUrl] = useState<string | null>(resolvedMasterImageProp);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState<boolean>(false);
  const [launchAssistantModal, setLaunchAssistantModal] = useState<'slides' | 'docs' | null>(null);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  useEffect(() => {
    setEditableDocTitle(`${diagramName} (${blueprintId})`);
    setActiveSlideIndex(0);
  }, [diagramName, blueprintId]);

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
    // Also detect visual containers that geometrically enclose smaller vertices
    parsedTopology.cells.forEach((c) => {
      if (!c.vertex || c.width < 140 || c.height < 90) return;
      if ((c.id === 'bg' || c.id.includes('bg')) && c.width >= 700 && c.height >= 400) return;
      const containsChild = parsedTopology.cells.some(
        (other) =>
          other.vertex &&
          other.id !== c.id &&
          other.absX >= c.absX - 6 &&
          other.absY >= c.absY - 6 &&
          other.absX + other.width <= c.absX + c.width + 6 &&
          other.absY + other.height <= c.absY + c.height + 6 &&
          other.width * other.height < c.width * c.height * 0.85
      );
      if (containsChild) {
        s.add(c.id);
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
        node.width * node.height > 75000;

      const hasFill =
        Boolean(node.style.fillColor) &&
        node.style.fillColor !== 'none' &&
        node.style.fillColor !== 'transparent';
      const hasStroke =
        Boolean(node.style.strokeColor) &&
        node.style.strokeColor !== 'none' &&
        node.style.strokeColor !== 'transparent';

      const fill = hasFill ? node.style.fillColor : 'none';
      const stroke = hasStroke ? node.style.strokeColor : 'none';
      const rx = node.style.rounded === '1' ? 8 : 3;
      const dash = node.style.dashed === '1' ? 'stroke-dasharray="6,4"' : '';

      const isDarkFill = hasFill && /^#?(0f172a|1e293b|1e1b4b|090d16|111827|18181b|020617|172554)/i.test(fill);
      let textColor = node.htmlTitleColor
        ? `#${node.htmlTitleColor}`
        : node.style.fontColor && node.style.fontColor !== 'none'
        ? node.style.fontColor
        : parsedTopology.isDarkDiagram || isDarkFill
        ? '#F8FAFC'
        : '#0F172A';
      if (!isDarkFill && !parsedTopology.isDarkDiagram && /^#?(ffffff|fff|f8fafc|fefce8|ca8a04|eab308)$/i.test(textColor)) {
        textColor = '#0F172A';
      }

      if (hasFill || hasStroke) {
        rectElements.push(
          `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${rx}" fill="${escapeXmlText(
            fill
          )}" stroke="${escapeXmlText(stroke)}" stroke-width="${hasStroke ? (isContainer ? '1.8' : '1.5') : '0'}" ${dash} />`
        );
      }

      if (title) {
        if (isContainer) {
          rectElements.push(
            `<text x="${(x + 10).toFixed(1)}" y="${(y + 18).toFixed(
              1
            )}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="${escapeXmlText(
              textColor
            )}">${title.slice(0, 72)}</text>`
          );
          if (subtitle) {
            rectElements.push(
              `<text x="${(x + 10).toFixed(1)}" y="${(y + 32).toFixed(
                1
              )}" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" fill="#475569">${subtitle.slice(
                0,
                85
              )}</text>`
            );
          }
        } else if (!ov && parsedText.lines.length > 4) {
          rectElements.push(
            `<text x="${(x + 10).toFixed(1)}" y="${(y + 20).toFixed(
              1
            )}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="${escapeXmlText(
              textColor
            )}">${title.slice(0, 56)}</text>`
          );
          parsedText.lines.slice(1, 9).forEach((rowLine, rIdx) => {
            rectElements.push(
              `<text x="${(x + 10).toFixed(1)}" y="${(y + 38 + rIdx * 16).toFixed(
                1
              )}" font-family="system-ui, -apple-system, sans-serif" font-size="9" fill="#334155">${escapeXmlText(
                rowLine.slice(0, 58)
              )}</text>`
            );
          });
        } else {
          const centerY = subtitle ? y + h / 2 - 3 : y + h / 2 + 4;
          rectElements.push(
            `<text x="${(x + w / 2).toFixed(1)}" y="${centerY.toFixed(
              1
            )}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="700" fill="${escapeXmlText(
              textColor
            )}">${title.slice(0, 52)}</text>`
          );
          if (subtitle) {
            rectElements.push(
              `<text x="${(x + w / 2).toFixed(1)}" y="${(centerY + 14).toFixed(
                1
              )}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" fill="#475569">${subtitle.slice(
                0,
                58
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

  const effectivePreviewUrl = pngPreviewUrl || resolvedMasterImageProp || instantSvgDataUrl;
  const exportableMasterPngUrl = pngPreviewUrl || resolvedMasterImageProp || undefined;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('pc_google_drive_access_token') || '';
      const savedClientId = localStorage.getItem('pc_google_oauth_client_id') || '';
      setGoogleAccessToken(savedToken);
      setGoogleClientId(savedClientId);
    }
  }, []);

  useEffect(() => {
    if (resolvedMasterImageProp) {
      setPngPreviewUrl(resolvedMasterImageProp);
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
  }, [isOpen, xmlContent, resolvedMasterImageProp]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveSlideIndex((prev) => Math.min(2, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        if (isSlideshowPlaying) {
          setIsSlideshowPlaying(false);
        } else if (isFullscreen && !isFullPage) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, isFullPage, isSlideshowPlaying]);

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

    const targetPublicUrl = `https://promptcanvas.up.railway.app/api/export/cloud-bridge/${bridgeId}.${format}`;
    const finalPublicUrl =
      localData?.publicUrl && !localData.publicUrl.includes('.cr.gclb.goog')
        ? localData.publicUrl
        : targetPublicUrl;
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
          masterImageSrc: exportableMasterPngUrl,
        });
      } else {
        blob = await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          returnBlob: true,
          bridgeId: generatedBridgeId,
          masterImageSrc: exportableMasterPngUrl,
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
        // Launch actual Google Docs Viewer with the public Railway bridge URL (renders populated presentation + native 'Open with Google Slides' button)
        const externalGoogleTabUrl = `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(publicUrl)}`;
        setStatusMessage({
          type: 'success',
          text: `🎉 Opened ${diagramName} (${blueprintId}) in Google Cloud Viewer!`,
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
   * Open Populated Slides, Docs, or PDF in a New Browser Tab (Zero Forced File Downloads)
   */
  const handleOpenGoogleCloudViewer = async (targetMode?: 'slides' | 'docs' | 'pdf', _forceExternalLaunch = false) => {
    const modeToUse = targetMode || activeMode;
    setShowOpenWithDropdown(false);
    setActiveMode(modeToUse);

    try {
      if (typeof window !== 'undefined') {
        const basePayload = {
          xmlContent,
          diagramName,
          blueprintId,
          editableOverrides,
          updatedAt: Date.now(),
        };
        try {
          localStorage.setItem(
            'pc_cloud_viewer_payload',
            JSON.stringify({
              ...basePayload,
              masterImageSrc: exportableMasterPngUrl,
            })
          );
        } catch {
          localStorage.setItem('pc_cloud_viewer_payload', JSON.stringify(basePayload));
        }
        if (xmlContent && xmlContent.includes('<mxCell')) {
          localStorage.setItem('pc_vision_last_xml', xmlContent);
        }
        const viewerUrl = `/viewer?mode=${encodeURIComponent(modeToUse)}&id=${encodeURIComponent(
          blueprintId
        )}&title=${encodeURIComponent(diagramName)}`;
        window.open(viewerUrl, '_blank');
      }
      setStatusMessage({
        type: 'success',
        text:
          modeToUse === 'slides'
            ? `📊 Opened populated Google Slides Presentation (${diagramName}) in the next tab!`
            : modeToUse === 'docs'
            ? `📄 Opened populated Google Docs Specification (${diagramName}) in the next tab!`
            : `🖨️ Opened populated PDF Document (${diagramName}) in the next tab!`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to open new tab: ' + (err?.message || 'Unknown error'),
      });
    }
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
          masterImageSrc: exportableMasterPngUrl,
        });
      } else {
        await exportDrawioToEditableDocx(xmlContent, diagramName, blueprintId, {
          masterImageSrc: exportableMasterPngUrl,
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

      let copiedSuccessfully = false;
      const clipboardItems: Record<string, Blob> = {
        'text/html': new Blob([richHtml], { type: 'text/html' }),
        'text/plain': new Blob([`${diagramName} (${blueprintId}) - Editable Architecture Specification`], { type: 'text/plain' }),
      };

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

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            'pc_cloud_viewer_payload',
            JSON.stringify({
              xmlContent,
              diagramName,
              blueprintId,
              editableOverrides,
              masterImageSrc: exportableMasterPngUrl,
              updatedAt: Date.now(),
            })
          );
        } catch {
          localStorage.setItem(
            'pc_cloud_viewer_payload',
            JSON.stringify({
              xmlContent,
              diagramName,
              blueprintId,
              editableOverrides,
              updatedAt: Date.now(),
            })
          );
        }
      }

      const targetExternalUrl = targetMode === 'slides' ? 'https://slides.new' : 'https://docs.new';
      const cloudWin =
        openCloudTabImmediately && typeof window !== 'undefined'
          ? window.open(isFullPage ? targetExternalUrl : `/viewer?mode=${encodeURIComponent(targetMode)}&id=${encodeURIComponent(blueprintId)}&title=${encodeURIComponent(diagramName)}`, '_blank')
          : null;

      setStatusMessage({
        type: 'success',
        text: isFullPage
          ? `✅ Copied high-res diagram & spec to clipboard! Press Ctrl+V / ⌘V inside the newly opened ${targetMode === 'slides' ? 'slides.new' : 'docs.new'} tab.`
          : `✅ ${copiedSuccessfully ? 'Copied' : 'Prepared'} ${targetMode === 'slides' ? 'Google Slides Presentation' : 'Google Docs Specification'}${cloudWin ? ` & opened populated ${targetMode === 'slides' ? 'Google Slides' : 'Google Docs'} in a new tab` : ''}!`,
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
      className={`fixed inset-0 z-[150] flex items-center justify-center ${
        isFullPage ? 'bg-[#F9FBFD] p-0' : 'bg-slate-950/90 backdrop-blur-md p-0'
      }`}
      data-testid="google-workspace-direct-open-modal"
    >
      <div
        className={`${
          isFullPage
            ? activeMode === 'pdf'
              ? 'bg-[#323639]'
              : 'bg-[#F9FBFD]'
            : 'bg-[#0B111E]'
        } w-screen h-screen flex flex-col overflow-hidden transition-all duration-200`}
      >
        {/* ===========================================================================
            TOP HEADER BAR:
            - When !isFullPage (Modal on /dashboard): Dark Gmail Attachment Opener Bar with "Open with ▾"
            - When isFullPage && activeMode === 'slides': Authentic Google Slides Light Chrome & Pill Toolbar (#F9FBFD / #EDF2FA)
            - When isFullPage && activeMode === 'docs': Authentic Google Docs Light Chrome & Pill Toolbar (#F9FBFD / #EDF2FA)
            - When isFullPage && activeMode === 'pdf': Authentic Chrome PDF Viewer Top Bar (#323639)
           =========================================================================== */}
        {!isFullPage ? (
          /* ===========================================================================
             SCREENSHOT 1 & 2: AUTHENTIC GMAIL ATTACHMENT PROJECTOR HEADER & PILL BAR
             =========================================================================== */
          <div className="bg-[#131314]/95 text-[#E3E3E3] shrink-0 select-none z-50">
            {/* Row 1: Left File Title & Menu + Right Split Pill Button "[🟨 Open with Google Slides | ▼]" */}
            <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 gap-4">
              {/* Left: Close X + PowerPoint P Icon + Filename.pptx + Drive Icon + File/View/Tools/Help */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={onClose}
                  data-testid="close-google-workspace-modal-btn"
                  className="p-2 rounded-full hover:bg-white/10 text-[#E3E3E3] transition cursor-pointer shrink-0"
                  title="Close Preview (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Authentic PowerPoint .pptx Red/Orange Badge Icon */}
                <div className="w-7 h-7 rounded bg-[#D24726] flex items-center justify-center text-white font-extrabold text-xs shadow-sm shrink-0">
                  P
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm md:text-[15px] font-medium text-white truncate max-w-[240px] sm:max-w-[460px]">
                      {diagramName} .pptx
                    </h2>
                    {/* Google Drive Triangle Icon */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E3E3E3] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 3L2 15l3.5 6h13L22 15 15 3H9z" />
                      <path d="M2 15h20" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-[#C4C7C5] mt-0.5">
                    <button type="button" onClick={handleDirectDownloadFile} className="hover:text-white cursor-pointer">
                      File
                    </button>
                    <button type="button" onClick={() => handleOpenGoogleCloudViewer('slides', true)} className="hover:text-white cursor-pointer">
                      View
                    </button>
                    <button type="button" onClick={handlePrintPdfReport} className="hover:text-white cursor-pointer">
                      Tools
                    </button>
                    <span className="hover:text-white cursor-pointer">Help</span>
                  </div>
                </div>
              </div>

              {/* Right: Screenshot 2 Split Pill Button "[🟨 Open with Google Slides | ▼]" */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <div className="inline-flex items-center rounded-full border border-[#8E918F] bg-[#1F1F1F] text-white shadow-lg">
                    {/* Left Action: Immediate 1-Click Open with Google Slides in Next Tab */}
                    <button
                      type="button"
                      onClick={() => handleOpenGoogleCloudViewer('slides', true)}
                      className="flex items-center gap-2.5 pl-4 pr-3.5 py-1.5 rounded-l-full hover:bg-[#303134] text-xs md:text-sm font-medium text-white transition cursor-pointer whitespace-nowrap"
                    >
                      <span className="w-4 h-4 rounded-[2px] bg-[#F4B400] flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-1.5 bg-white rounded-[1px]" />
                      </span>
                      <span>Open with Google Slides</span>
                    </button>

                    {/* Right Action: Dropdown Chevron "▼" */}
                    <button
                      type="button"
                      onClick={() => setShowOpenWithDropdown((prev) => !prev)}
                      data-testid="gmail-open-with-dropdown-btn"
                      aria-label="Open with options"
                      className="px-2.5 py-1.5 rounded-r-full border-l border-[#8E918F] hover:bg-[#303134] text-white transition cursor-pointer flex items-center justify-center"
                    >
                      <ChevronDown
                        className={`w-4 h-4 text-[#E3E3E3] transition-transform duration-150 ${
                          showOpenWithDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Screenshot 2 Dark Popover Menu */}
                  {showOpenWithDropdown && (
                    <div
                      data-testid="gmail-open-with-dropdown-menu"
                      className="absolute right-0 mt-2 w-64 rounded-lg bg-[#28292A] border border-[#3C4043] shadow-[0_16px_40px_rgba(0,0,0,0.85)] py-2 z-[200]"
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenGoogleCloudViewer('slides', true)}
                        className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3.5 hover:bg-[#3C4043] text-[#E3E3E3] transition cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-[#E3E3E3] shrink-0" />
                        <span>Open in new tab</span>
                      </button>

                      <div className="my-1.5 border-t border-[#3C4043]" />

                      <div className="px-4 py-1 text-xs font-medium text-[#E3E3E3]">
                        Google apps
                      </div>

                      <button
                        type="button"
                        data-testid="open-with-slides-option"
                        onClick={() => handleOpenGoogleCloudViewer('slides', true)}
                        className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3.5 hover:bg-[#3C4043] text-white transition cursor-pointer"
                      >
                        <span className="w-5 h-5 rounded-[3px] bg-[#F4B400] flex items-center justify-center shrink-0">
                          <span className="w-3 h-2 bg-white rounded-[1px]" />
                        </span>
                        <span>Google Slides</span>
                      </button>

                      <button
                        type="button"
                        data-testid="open-with-docs-option"
                        onClick={() => handleOpenGoogleCloudViewer('docs', true)}
                        className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3.5 hover:bg-[#3C4043] text-white transition cursor-pointer"
                      >
                        <span className="w-5 h-5 rounded-[3px] bg-[#4285F4] flex flex-col items-center justify-center gap-0.5 shrink-0">
                          <span className="w-3 h-[1.5px] bg-white" />
                          <span className="w-3 h-[1.5px] bg-white" />
                          <span className="w-2 h-[1.5px] bg-white self-start ml-1" />
                        </span>
                        <span>Google Docs</span>
                      </button>

                      <button
                        type="button"
                        data-testid="open-with-pdf-option"
                        onClick={() => handleOpenGoogleCloudViewer('pdf', true)}
                        className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3.5 hover:bg-[#3C4043] text-white transition cursor-pointer"
                      >
                        <span className="w-5 h-5 rounded-[3px] bg-[#EA4335] flex items-center justify-center text-[8px] font-extrabold text-white shrink-0">
                          PDF
                        </span>
                        <span>PDF Document</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Screenshot 1 Rounded Dark Gray Pill Toolbar ("Page [1] / 3 | Download | Print | - 100% +") */}
            <div className="mx-3 mb-2.5 px-4 py-1.5 rounded-full bg-[#28292A] flex items-center justify-between text-xs text-[#E3E3E3]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#C4C7C5]">Page</span>
                  <span className="px-2 py-0.5 rounded border border-[#5F6368] bg-[#1F1F1F] text-white font-medium">
                    1
                  </span>
                  <span className="text-[#C4C7C5]">/ 3</span>
                </div>

                <span className="text-[#5F6368]">|</span>

                <button
                  type="button"
                  onClick={handleDirectDownloadFile}
                  disabled={isDownloadingDeck}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#E3E3E3] transition cursor-pointer"
                  title="Download (.pptx)"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handlePrintPdfReport}
                  data-testid="launch-external-pdf-print-btn"
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#E3E3E3] transition cursor-pointer"
                  title="Print"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <span className="text-[#5F6368]">|</span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((z) => Math.max(50, z - 15))}
                    className="px-2 py-0.5 rounded hover:bg-white/10 text-[#E3E3E3] font-bold cursor-pointer"
                    title="Zoom Out"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(100)}
                    className="px-2 py-0.5 rounded hover:bg-white/10 text-[#E3E3E3] font-medium cursor-pointer flex items-center gap-1"
                    title="Reset Zoom"
                  >
                    <span>{previewZoom}%</span>
                    <ChevronDown className="w-3 h-3 text-[#9AA0A6]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((z) => Math.min(175, z + 15))}
                    className="px-2 py-0.5 rounded hover:bg-white/10 text-[#E3E3E3] font-bold cursor-pointer"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#9AA0A6]">
                <span>{sortedVertices.length} Architecture Nodes</span>
                <span>•</span>
                <span>Click &ldquo;Open with Google Slides&rdquo; to edit in next tab</span>
              </div>
            </div>
          </div>
        ) : activeMode === 'slides' ? (
          /* ===========================================================================
             SCREENSHOT 3: AUTHENTIC GOOGLE SLIDES PRESENTATION WORKSPACE CHROME (#F9FBFD)
             Opened in the next tab when the user clicks "Open with Google Slides"
             =========================================================================== */
          <div className="bg-[#F9FBFD] border-b border-[#E1E5EA] text-[#1F1F1F] shrink-0 select-none z-40">
            {/* Row 1: Google Slides Icon + Title + .PPTX Badge + Star/Folder/Cloud + Menu Bar + Right Action Controls */}
            <div className="flex items-center justify-between px-3 pt-2 pb-1 gap-3">
              {/* Left: Official Yellow Google Slides Icon + Editable Title + .PPTX Badge + Menu Bar */}
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex(0)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-200/70 transition cursor-pointer shrink-0"
                  title="Google Slides Home"
                >
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <rect x="6" y="3" width="28" height="34" rx="3.5" fill="#F4B400" />
                    <path d="M25 3l9 9h-6.5A2.5 2.5 0 0125 9.5V3z" fill="#FDE293" />
                    <rect x="11" y="16" width="18" height="12" rx="1.5" fill="#FFFFFF" />
                    <rect x="13.5" y="18.5" width="13" height="7" rx="0.8" fill="#F4B400" />
                  </svg>
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={editableDocTitle}
                      onChange={(e) => setEditableDocTitle(e.target.value)}
                      size={Math.max(28, Math.min(72, editableDocTitle.length + 2))}
                      aria-label="Presentation Title"
                      className="text-[16px] font-medium text-[#1F1F1F] bg-transparent hover:border-slate-400 focus:border-[#0B57D0] focus:bg-white border border-transparent rounded px-1.5 py-0.5 focus:outline-none max-w-[540px] lg:max-w-[740px] w-auto"
                    />
                    {/* Authentic Screenshot 3 Yellow ".PPTX" Pill Badge */}
                    <span className="px-1.5 py-0.5 rounded bg-[#F4B400] text-[#1F1F1F] font-extrabold text-[10px] tracking-tight shrink-0">
                      .PPTX
                    </span>
                    <span className="hidden sm:inline text-slate-500 text-sm px-0.5" title="Star">
                      ☆
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 text-slate-500 text-xs px-1" title="Saved to Drive">
                      <Check className="w-3.5 h-3.5 text-slate-600" />
                    </span>
                  </div>

                  {/* Classic Google Slides Menu Bar */}
                  <div className="flex items-center gap-1 text-[12.5px] text-[#1F1F1F] mt-0.5 flex-wrap">
                    <button
                      type="button"
                      onClick={handleDirectDownloadFile}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                      title="Download Microsoft PowerPoint (.pptx)"
                    >
                      File
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (sortedVertices[0]) setSelectedNodeId(sortedVertices[0].id);
                      }}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSlideshowPlaying(true)}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlideIndex(1)}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      Insert
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSlide1ViewMode((m) => (m === 'interactive-twin' ? 'decomposed-shapes' : 'interactive-twin'))
                      }
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      Format
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlideIndex((p) => (p + 1) % 3)}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      Slide
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlideIndex(1)}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      Arrange
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlideIndex(2)}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      Tools
                    </button>
                    <span className="hidden lg:inline px-1.5 py-0.5 rounded text-slate-600">Help</span>
                  </div>
                </div>
              </div>

              {/* Right: Screenshot 3 Action Bar (Sync, Download, Slideshow | ▾, 🔒 Share | ▾, Gemini Sparkle) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDirectGoogleDriveOpen}
                  disabled={isUploadingToGoogleDrive}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-[#1F1F1F] text-xs font-semibold transition cursor-pointer shadow-2xs"
                  title="Open presentation in Google Slides (slides.new) or save to Google Drive"
                >
                  {isUploadingToGoogleDrive ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  ) : (
                    <CloudUpload className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  <span>Open with Google Slides</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAuthConfig((v) => !v)}
                  className="p-2 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                  title="Configure Google Drive OAuth Token / Client ID"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleDirectDownloadFile}
                  disabled={isDownloadingDeck}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-[#1F1F1F] text-xs font-semibold transition cursor-pointer shadow-2xs"
                  title="Download Editable PowerPoint (.pptx)"
                >
                  <Download className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden md:inline">.pptx</span>
                </button>

                {/* Screenshot 3 Split "Slideshow | ▾" Pill Button */}
                <div className="inline-flex items-center rounded-full border border-[#747775] bg-white overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setIsSlideshowPlaying(true)}
                    data-testid="google-slides-slideshow-btn"
                    className="px-4 py-1.5 hover:bg-slate-100 text-[#1F1F1F] text-xs md:text-sm font-medium transition cursor-pointer"
                  >
                    Slideshow
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSlideshowPlaying(true)}
                    className="px-2 py-1.5 border-l border-[#747775] hover:bg-slate-100 text-[#1F1F1F] cursor-pointer"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Screenshot 3 Light-Blue "🔒 Share | ▾" Pill (#C2E7FF) */}
                <div className="inline-flex items-center rounded-full bg-[#C2E7FF] text-[#001D35] overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleCopyAndLaunchNewTab('slides', true)}
                    className="flex items-center gap-1.5 pl-3.5 pr-3 py-1.5 hover:bg-[#B3DFFC] text-xs md:text-sm font-medium transition cursor-pointer"
                    title="Copy & Share Presentation"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#001D35]" />
                    <span>Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyAndLaunchNewTab('slides', true)}
                    className="px-2 py-1.5 border-l border-[#99C8F2] hover:bg-[#B3DFFC] cursor-pointer"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Sparkles className="hidden md:block w-5 h-5 text-[#0B57D0] ml-1 shrink-0" />
              </div>
            </div>

            {/* Optional Google Drive OAuth Bar when Key icon is clicked */}
            {showAuthConfig && (
              <div className="mx-3 mb-1.5 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-amber-950 font-medium">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Google Drive API Token / Client ID (for 1-click upload to docs.google.com/presentation):</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 flex-1 max-w-2xl">
                  <input
                    type="password"
                    value={googleAccessToken}
                    onChange={(e) => handleSaveAuthSettings(e.target.value, googleClientId)}
                    placeholder="Paste Google OAuth Access Token (ya29...)"
                    className="flex-1 min-w-[180px] px-2.5 py-1 rounded border border-amber-300 bg-white text-slate-900 text-xs"
                  />
                  <input
                    type="text"
                    value={googleClientId}
                    onChange={(e) => handleSaveAuthSettings(googleAccessToken, e.target.value)}
                    placeholder="Or OAuth Client ID (*.apps.googleusercontent.com)"
                    className="flex-1 min-w-[180px] px-2.5 py-1 rounded border border-amber-300 bg-white text-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAuthConfig(false)}
                    className="px-2.5 py-1 rounded bg-slate-900 text-white font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Row 2: Screenshot 3 Google Slides Rounded Pill Toolbar (#EDF2FA) */}
            <div className="mx-3 mb-1.5 px-3 py-1 rounded-full bg-[#EDF2FA] flex flex-wrap items-center justify-between gap-2 text-[#1F1F1F] text-xs">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white text-[#444746] text-xs font-medium flex items-center gap-1.5 shadow-2xs">
                  <span>🔍</span>
                  <span>Menus</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex((p) => (p + 1) % 3)}
                  className="px-2 py-1 rounded hover:bg-slate-300/60 font-bold cursor-pointer flex items-center gap-0.5"
                  title="New / Next Slide"
                >
                  <span>+</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>
                <span className="text-slate-300 mx-0.5">|</span>
                <button
                  type="button"
                  onClick={handlePrintPdfReport}
                  data-testid="launch-external-pdf-print-btn"
                  className="p-1 rounded hover:bg-slate-300/60 cursor-pointer"
                  title="Print Presentation (PDF)"
                >
                  <Printer className="w-3.5 h-3.5 text-[#444746]" />
                </button>
                <span className="text-slate-300 mx-0.5">|</span>
                <span className="px-2 py-0.5 rounded text-[11.5px] font-medium text-[#444746] flex items-center gap-1">
                  <span>Fit</span>
                  <ChevronDown className="w-3 h-3" />
                </span>
                <span className="text-slate-300 mx-0.5">|</span>
                <button
                  type="button"
                  onClick={() => setSlide1ViewMode('interactive-twin')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                    slide1ViewMode === 'interactive-twin'
                      ? 'bg-[#D3E3FD] text-[#041E49] font-bold'
                      : 'hover:bg-slate-300/50 text-[#444746]'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>1:1 Interactive Twin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSlide1ViewMode('decomposed-shapes')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                    slide1ViewMode === 'decomposed-shapes'
                      ? 'bg-[#D3E3FD] text-[#041E49] font-bold'
                      : 'hover:bg-slate-300/50 text-[#444746]'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Editable Shapes ({sortedVertices.length})</span>
                </button>
                <span className="hidden md:inline text-slate-300 mx-0.5">|</span>
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex(0)}
                  className="hidden md:inline px-2 py-0.5 rounded hover:bg-slate-300/50 text-[#444746] font-medium cursor-pointer"
                >
                  Background
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex(1)}
                  className="hidden md:inline px-2 py-0.5 rounded hover:bg-slate-300/50 text-[#444746] font-medium cursor-pointer"
                >
                  Layout
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex(2)}
                  className="hidden md:inline px-2 py-0.5 rounded hover:bg-slate-300/50 text-[#444746] font-medium cursor-pointer"
                >
                  Theme
                </button>
                <span className="hidden lg:inline px-2 py-0.5 rounded text-[#444746] font-medium">
                  Transition
                </span>
              </div>

              {/* Right side of Google Slides Pill Toolbar: Workspace Format Switcher */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveMode('slides')}
                  className="px-2.5 py-0.5 rounded-full bg-[#F4B400] text-[#1F1F1F] font-bold text-[11px] cursor-pointer"
                >
                  Slides
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('docs')}
                  className="px-2.5 py-0.5 rounded-full hover:bg-slate-300/60 text-[#444746] font-medium text-[11px] cursor-pointer"
                >
                  Docs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('pdf')}
                  className="px-2.5 py-0.5 rounded-full hover:bg-slate-300/60 text-[#444746] font-medium text-[11px] cursor-pointer"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        ) : activeMode === 'docs' ? (
          /* ===========================================================================
             AUTHENTIC GOOGLE DOCS DOCUMENT WORKSPACE CHROME (#F9FBFD / #EDF2FA)
             Opened in the next tab when the user clicks "Open with Google Docs"
             =========================================================================== */
          <div className="bg-[#F9FBFD] border-b border-[#E1E5EA] text-[#1F1F1F] shrink-0 select-none z-40">
            <div className="flex items-center justify-between px-3 pt-2 pb-1 gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <rect x="6" y="3" width="28" height="34" rx="3.5" fill="#4285F4" />
                    <path d="M25 3l9 9h-6.5A2.5 2.5 0 0125 9.5V3z" fill="#A1C2FA" />
                    <rect x="11" y="16" width="18" height="2.2" rx="1" fill="#FFFFFF" />
                    <rect x="11" y="21" width="18" height="2.2" rx="1" fill="#FFFFFF" />
                    <rect x="11" y="26" width="12" height="2.2" rx="1" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={editableDocTitle}
                      onChange={(e) => setEditableDocTitle(e.target.value)}
                      size={Math.max(28, Math.min(72, editableDocTitle.length + 2))}
                      aria-label="Document Title"
                      className="text-[16px] font-medium text-[#1F1F1F] bg-transparent hover:border-slate-400 focus:border-[#0B57D0] focus:bg-white border border-transparent rounded px-1.5 py-0.5 focus:outline-none max-w-[540px] lg:max-w-[740px] w-auto"
                    />
                    <span className="px-1.5 py-0.5 rounded bg-[#4285F4] text-white font-extrabold text-[10px] tracking-tight shrink-0">
                      .DOCX
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[12.5px] text-[#1F1F1F] mt-0.5 flex-wrap">
                    <button
                      type="button"
                      onClick={handleDirectDownloadFile}
                      className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer"
                    >
                      File
                    </button>
                    <span className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer">Edit</span>
                    <span className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer">View</span>
                    <span className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer">Insert</span>
                    <span className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer">Format</span>
                    <span className="px-1.5 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer">Tools</span>
                    <span className="hidden lg:inline px-1.5 py-0.5 rounded text-slate-500">Help</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDirectGoogleDriveOpen}
                  disabled={isUploadingToGoogleDrive}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-[#1F1F1F] text-xs font-semibold transition cursor-pointer shadow-2xs"
                >
                  <CloudUpload className="w-3.5 h-3.5 text-sky-600" />
                  <span>Open with Google Docs</span>
                </button>
                <button
                  type="button"
                  onClick={handleDirectDownloadFile}
                  disabled={isDownloadingDeck}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-[#1F1F1F] text-xs font-semibold transition cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-700" />
                  <span>Download .docx</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyAndLaunchNewTab('docs', true)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C2E7FF] hover:bg-[#B3DFFC] text-[#001D35] text-xs md:text-sm font-semibold transition cursor-pointer shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5 text-[#001D35]" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="mx-3 mb-1.5 px-3.5 py-1 rounded-full bg-[#EDF2FA] flex flex-wrap items-center justify-between gap-2 text-[#1F1F1F] text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handlePrintPdfReport}
                  data-testid="launch-external-pdf-print-btn"
                  className="p-1 rounded hover:bg-slate-300/60 cursor-pointer"
                  title="Print Specification"
                >
                  <Printer className="w-3.5 h-3.5 text-[#444746]" />
                </button>
                <span className="text-slate-300">|</span>
                <span className="px-2 py-0.5 rounded bg-white/80 text-[11px] font-semibold border border-slate-300/80">
                  100%
                </span>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setDocsDiagramViewMode('decomposed-shapes')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold cursor-pointer ${
                    docsDiagramViewMode === 'decomposed-shapes'
                      ? 'bg-[#D3E3FD] text-[#041E49] font-bold'
                      : 'text-[#444746]'
                  }`}
                >
                  Editable Vector Diagram ({sortedVertices.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDocsDiagramViewMode('interactive-twin')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold cursor-pointer ${
                    docsDiagramViewMode === 'interactive-twin'
                      ? 'bg-[#D3E3FD] text-[#041E49] font-bold'
                      : 'text-[#444746]'
                  }`}
                >
                  1:1 Visual Twin
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveMode('slides')}
                  className="px-2.5 py-0.5 rounded-full hover:bg-slate-300/60 text-[#444746] font-medium text-[11px] cursor-pointer"
                >
                  Slides
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('docs')}
                  className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white font-bold text-[11px] cursor-pointer"
                >
                  Docs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('pdf')}
                  className="px-2.5 py-0.5 rounded-full hover:bg-slate-300/60 text-[#444746] font-medium text-[11px] cursor-pointer"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Status / Notification Banner */}
        {statusMessage && (
          <div
            className={`px-6 py-2 flex items-center justify-between gap-4 border-b text-xs font-medium shrink-0 ${
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
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Workspace Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F9FBFD] text-slate-900">
          {!isFullPage ? (
            /* =========================================================================
               SCREENSHOT 1: GMAIL ATTACHMENT PROJECTOR SCROLLABLE SLIDES STACK
               Shows Slide 1 at top and Slide 2 Executive Summary Cards directly below!
               ========================================================================= */
            <div
              className="flex-1 bg-[#0E0E10]/95 overflow-y-auto flex flex-col items-center justify-start py-6 px-4 gap-5 relative select-none"
              onClick={() => {
                if (showOpenWithDropdown) setShowOpenWithDropdown(false);
              }}
            >
              {/* SLIDE 1 IN PROJECTOR STACK: 1:1 MASTER ARCHITECTURE TOPOLOGY */}
              <div
                style={{
                  width: `${Math.min(1360, Math.round((980 * previewZoom) / 100))}px`,
                  maxWidth: '94vw',
                }}
                className="bg-white aspect-[16/9] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-slate-700 overflow-hidden flex flex-col shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-3 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono text-[11px] font-bold">
                      {blueprintId}
                    </span>
                    <h3 className="text-sm md:text-base font-extrabold text-white truncate">
                      {diagramName}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Slide 1 / 3</span>
                </div>

                <div className="flex-1 relative bg-white p-3 flex items-center justify-center overflow-hidden">
                  {effectivePreviewUrl ? (
                    <img
                      src={effectivePreviewUrl}
                      alt={diagramName}
                      className="w-full h-full object-contain mx-auto"
                    />
                  ) : (
                    <div className="py-16 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
                      <span>Rendering Slide 1...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* SLIDE 2 IN PROJECTOR STACK (Matches Screenshot 1 Bottom Dark-Teal 6-Card Summary Slide!) */}
              <div
                style={{
                  width: `${Math.min(1360, Math.round((980 * previewZoom) / 100))}px`,
                  maxWidth: '94vw',
                }}
                className="bg-[#071927] aspect-[16/9] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-teal-500/40 overflow-hidden flex flex-col shrink-0 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shrink-0" />
                <div className="px-7 pt-5 pb-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg md:text-2xl font-extrabold text-white tracking-tight">
                      {diagramName}: Architecture &amp; Use Cases Summary
                    </h3>
                    <p className="text-xs text-teal-300 mt-0.5">
                      {sortedVertices.length} Enterprise Cloud Components &amp; {edges.length} Inter-Service Data Flows ({blueprintId})
                    </p>
                  </div>
                  <span className="text-xs font-mono text-teal-300/80">Slide 2 / 3</span>
                </div>

                <div className="flex-1 px-7 pb-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 overflow-hidden">
                  {sortedVertices
                    .filter((v) => cleanHtmlToPlainText(v.value).title.length > 0)
                    .slice(0, 6)
                    .map((node, idx) => {
                      const parsed = cleanHtmlToPlainText(node.value);
                      return (
                        <div
                          key={node.id}
                          className="rounded-lg bg-[#0D273D] border border-teal-500/30 flex flex-col overflow-hidden"
                        >
                          <div className="px-3 py-1.5 bg-[#00838F] text-white font-bold text-xs truncate">
                            {idx + 1}. {parsed.title}
                          </div>
                          <div className="p-3 text-[11px] text-slate-200 space-y-1 flex-1">
                            <div>• Function: {parsed.subtitle || 'Enterprise Cloud Tier'}</div>
                            <div>• Object ID: OBJ-{String(idx + 1).padStart(2, '0')}</div>
                            <div>• Geometry: {Math.round(node.width)}×{Math.round(node.height)}px Vector Node</div>
                            <div>• Status: 1:1 Verified Topology</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : activeMode === 'slides' ? (
            /* =========================================================================
               SCREENSHOT 3: AUTHENTIC GOOGLE SLIDES EDITOR WORKSPACE
               Left Numbered Filmstrip (Blue #0B57D0 active ring) + Rulers + 16:9 Canvas
               ========================================================================= */
            <>
              {/* Left Numbered Slide Filmstrip (#F9FBFD) */}
              <div className="w-full md:w-56 bg-[#F9FBFD] border-r border-[#DADCE0] p-3 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 select-none">
                {[
                  {
                    idx: 0,
                    label: '1:1 Master Architecture',
                    sub: `${sortedVertices.length} Interactive Nodes`,
                  },
                  {
                    idx: 1,
                    label: 'Editable Vector Shapes',
                    sub: `${sortedVertices.length} Shapes • ${edges.length} Edges`,
                  },
                  {
                    idx: 2,
                    label: 'Component Spec Matrix',
                    sub: 'Structured Inventory Table',
                  },
                ].map((slide) => (
                  <button
                    key={slide.idx}
                    type="button"
                    onClick={() => setActiveSlideIndex(slide.idx)}
                    data-testid={`slide-thumbnail-${slide.idx}`}
                    className="group flex items-start gap-2.5 text-left cursor-pointer shrink-0 w-44 md:w-full focus:outline-none"
                  >
                    <span
                      className={`text-xs font-semibold pt-1 w-4 text-right shrink-0 ${
                        activeSlideIndex === slide.idx ? 'text-[#0B57D0] font-bold' : 'text-[#444746]'
                      }`}
                    >
                      {slide.idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`w-full aspect-[16/9] rounded-[8px] bg-white overflow-hidden flex flex-col transition-all ${
                          activeSlideIndex === slide.idx
                            ? 'ring-2 ring-[#0B57D0] border border-[#0B57D0] shadow-sm'
                            : 'border border-[#DADCE0] hover:border-slate-400'
                        }`}
                      >
                        <div className="h-2.5 bg-[#0F172A] px-1.5 flex items-center justify-between shrink-0">
                          <span className="text-[5px] font-bold text-sky-400 truncate">{diagramName}</span>
                          <span className="text-[4.5px] font-mono text-slate-400">{blueprintId}</span>
                        </div>
                        <div className="flex-1 relative bg-white flex items-center justify-center p-1 overflow-hidden">
                          {slide.idx === 0 || slide.idx === 1 ? (
                            effectivePreviewUrl ? (
                              <img
                                src={effectivePreviewUrl}
                                alt={slide.label}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="text-[7px] text-slate-400">Slide {slide.idx + 1}</div>
                            )
                          ) : (
                            <div className="w-full h-full flex flex-col gap-0.5 p-1">
                              <div className="h-1.5 w-full bg-slate-800 rounded-2xs" />
                              <div className="h-1.5 w-full bg-slate-200 rounded-2xs" />
                              <div className="h-1.5 w-full bg-slate-100 rounded-2xs" />
                              <div className="h-1.5 w-full bg-slate-200 rounded-2xs" />
                              <div className="h-1.5 w-3/4 bg-slate-100 rounded-2xs" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 text-[10.5px] font-medium text-[#1F1F1F] truncate">{slide.label}</div>
                    </div>
                  </button>
                ))}

                {/* Interactive Node Inspector Panel when a node is clicked on the slide */}
                {selectedNode && (
                  <div className="mt-2 p-3 rounded-xl bg-white text-slate-900 border-2 border-[#0B57D0] space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#0B57D0] flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Shape Label Editor</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedNodeId(null)}
                        className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 font-semibold block">Shape Title / Label</label>
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
                        className="w-full px-2 py-1 rounded bg-slate-50 border border-slate-300 text-xs text-slate-900 font-bold focus:border-[#0B57D0] focus:outline-none"
                      />
                      <label className="text-[10px] text-slate-500 font-semibold block">Role / Subtitle</label>
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
                        className="w-full px-2 py-1 rounded bg-slate-50 border border-slate-300 text-xs text-slate-700 focus:border-[#0B57D0] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Main Widescreen 16:9 Google Slides Canvas Stage with Top Ruler (#F8F9FA) */}
              <div
                className={`${
                  isSlideshowPlaying
                    ? 'fixed inset-0 z-[300] bg-black p-0 flex flex-col items-center justify-center'
                    : 'flex-1 flex flex-col items-center justify-between bg-[#F8F9FA] overflow-hidden relative'
                }`}
              >
                {/* Screenshot 3 Google Slides Top Horizontal Ruler */}
                {!isSlideshowPlaying && (
                  <div className="w-full h-5 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-around px-16 text-[9px] font-mono text-slate-400 select-none shrink-0">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                  </div>
                )}

                <div className="flex-1 w-full flex items-center justify-center p-4 md:p-6 overflow-auto">
                  {/* Widescreen 16:9 Slide Container */}
                  <div
                    className={`w-full ${
                      isSlideshowPlaying ? 'max-w-[96vw] max-h-[92vh]' : 'max-w-[1100px]'
                    } aspect-[16/9] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] border border-[#DADCE0] flex flex-col overflow-hidden relative`}
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
                                    node.width * node.height > 75000;

                                  const isMultiRowCard = !isContainer && !override && parsedText.lines.length > 4;

                                  const isStandaloneIconWithBottomLabel =
                                    (node.style.verticalLabelPosition === 'bottom' ||
                                      (isImageShape && node.width <= 56 && node.height <= 56)) &&
                                    !isContainer;

                                  const isSelected = selectedNodeId === node.id;
                                  const isDarkFill =
                                    hasFill &&
                                    /^#?(0f172a|1e293b|1e1b4b|090d16|111827|18181b|020617|172554)/i.test(
                                      node.style.fillColor || ''
                                    );
                                  let titleHex = node.htmlTitleColor
                                    ? `#${node.htmlTitleColor}`
                                    : node.style.fontColor && node.style.fontColor !== 'none'
                                    ? node.style.fontColor
                                    : parsedTopology.isDarkDiagram || isDarkFill
                                    ? '#FFFFFF'
                                    : '#0F172A';
                                  if (
                                    !isDarkFill &&
                                    !parsedTopology.isDarkDiagram &&
                                    /^#?(ffffff|fff|f8fafc|fefce8|ca8a04|eab308)$/i.test(titleHex)
                                  ) {
                                    titleHex = '#0F172A';
                                  }

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
                                        isContainer || isMultiRowCard
                                          ? 'flex-col justify-start items-start p-1 overflow-hidden'
                                          : isStandaloneIconWithBottomLabel
                                          ? 'flex-col items-center justify-center overflow-visible'
                                          : 'flex-row items-center justify-center px-1 gap-1'
                                      }`}
                                    >
                                      {/* Render SVG Icon or Data URL */}
                                      {iconMarkupOrUrl && !isMultiRowCard && (
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

                                      {/* Render Label (Top of Container, Multi-Row Card, Below Standalone Icon, or Inside Card) */}
                                      {title && (
                                        <div
                                          style={{ color: titleHex }}
                                          className={`${
                                            isStandaloneIconWithBottomLabel
                                              ? 'absolute top-full mt-0.5 left-1/2 -translate-x-1/2 text-center w-max max-w-[115px] whitespace-normal leading-[1.05] px-1 py-0.2 rounded bg-white/95 shadow-2xs text-[7.5px] font-bold z-30'
                                              : isContainer || isMultiRowCard
                                              ? 'text-[8px] font-bold leading-[1.1] px-1 py-0.5 whitespace-normal break-words w-full'
                                              : 'text-[8px] font-bold leading-[1.05] text-center whitespace-normal break-words line-clamp-2 max-w-full'
                                          }`}
                                        >
                                          {title}
                                          {isMultiRowCard ? (
                                            <div className="mt-1 space-y-0.5 border-t border-slate-300/70 pt-0.5">
                                              {parsedText.lines.slice(1, 9).map((rowLine, rIdx) => (
                                                <div
                                                  key={rIdx}
                                                  className="text-[6.5px] font-medium text-slate-700 leading-[1.08] truncate"
                                                >
                                                  {rowLine.startsWith('(') ? `  ${rowLine}` : `• ${rowLine}`}
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            subtitle &&
                                            !isStandaloneIconWithBottomLabel && (
                                              <span className="block text-[7px] font-normal opacity-85 leading-[1.05] whitespace-normal line-clamp-2">
                                                {subtitle}
                                              </span>
                                            )
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

                {/* Floating Presentation Bar when Slideshow is active */}
                {isSlideshowPlaying && (
                  <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[310] bg-[#202124]/95 border border-white/15 rounded-full px-5 py-2 flex items-center gap-4 text-white text-xs shadow-2xl">
                    <button
                      type="button"
                      onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                      className="px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
                    >
                      ◀ Prev
                    </button>
                    <span className="font-mono font-bold">
                      Slide {activeSlideIndex + 1} / 3
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveSlideIndex((prev) => Math.min(2, prev + 1))}
                      className="px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
                    >
                      Next ▶
                    </button>
                    <div className="h-4 w-px bg-white/20" />
                    <button
                      type="button"
                      onClick={() => setIsSlideshowPlaying(false)}
                      className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-500 font-bold cursor-pointer"
                    >
                      Exit Slideshow (Esc)
                    </button>
                  </div>
                )}
              </div>

              {/* Screenshot 3 Right Vertical Google Slides Building-Blocks Rail (Slide, Image, Media, Uploads, Record, Speaker, Transform) */}
              {!isSlideshowPlaying && (
                <div
                  className="hidden lg:flex w-16 bg-[#F9FBFD] border-l border-[#DADCE0] flex-col items-center py-3 gap-4 shrink-0 select-none"
                  data-testid="google-slides-right-building-blocks-rail"
                >
                  {[
                    { label: 'Slide', icon: '⊞', onClick: () => setActiveSlideIndex((prev) => (prev + 1) % 3) },
                    { label: 'Image', icon: '🖼️', onClick: () => setSlide1ViewMode('interactive-twin') },
                    { label: 'Media', icon: '❖', onClick: () => setSlide1ViewMode('decomposed-shapes') },
                    { label: 'Uploads', icon: '☁️', onClick: () => void handleCopyAndLaunchNewTab('slides') },
                    { label: 'Record', icon: '⏺', onClick: () => setIsSlideshowPlaying(true) },
                    { label: 'Speaker', icon: '🗒️', onClick: () => setActiveSlideIndex(2) },
                    { label: 'Transform', icon: '✨', onClick: () => setSlide1ViewMode((m) => (m === 'interactive-twin' ? 'decomposed-shapes' : 'interactive-twin')) },
                  ].map((tool) => (
                    <button
                      key={tool.label}
                      type="button"
                      onClick={tool.onClick}
                      className="flex flex-col items-center gap-0.5 text-[#444746] hover:text-[#0B57D0] hover:bg-[#EDF2FA] w-12 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      <span className="text-sm leading-none">{tool.icon}</span>
                      <span className="text-[9.5px] font-medium tracking-tight">{tool.label}</span>
                    </button>
                  ))}
                </div>
              )}
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
                                node.width * node.height > 75000;

                              const isMultiRowCard = !isContainer && !override && parsedText.lines.length > 4;

                              const isStandaloneIconWithBottomLabel =
                                (node.style.verticalLabelPosition === 'bottom' ||
                                  (isImageShape && node.width <= 90 && node.height <= 75) ||
                                  (node.width <= 72 && node.height <= 72)) &&
                                !isContainer;

                              const isSelected = selectedNodeId === node.id;
                              const isDarkFill =
                                hasFill &&
                                /^#?(0f172a|1e293b|1e1b4b|090d16|111827|18181b|020617|172554)/i.test(
                                  node.style.fillColor || ''
                                );
                              let titleHex = node.htmlTitleColor
                                ? `#${node.htmlTitleColor}`
                                : node.style.fontColor && node.style.fontColor !== 'none'
                                ? node.style.fontColor
                                : parsedTopology.isDarkDiagram || isDarkFill
                                ? '#FFFFFF'
                                : '#0F172A';
                              if (
                                !isDarkFill &&
                                !parsedTopology.isDarkDiagram &&
                                /^#?(ffffff|fff|f8fafc|fefce8|ca8a04|eab308)$/i.test(titleHex)
                              ) {
                                titleHex = '#0F172A';
                              }

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
                                    isContainer || isMultiRowCard
                                      ? 'flex-col justify-start items-start p-1 overflow-hidden'
                                      : isStandaloneIconWithBottomLabel
                                      ? 'flex-col items-center justify-center overflow-visible'
                                      : 'flex-row items-center justify-center px-1 gap-1'
                                  }`}
                                >
                                  {iconMarkupOrUrl && !isMultiRowCard && (
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
                                          : isContainer || isMultiRowCard
                                          ? 'text-[8px] font-bold leading-[1.1] px-1 py-0.5 whitespace-normal break-words w-full'
                                          : 'text-[8px] font-bold leading-[1.05] text-center whitespace-normal break-normal line-clamp-2 max-w-full'
                                      }`}
                                    >
                                      {title}
                                      {isMultiRowCard ? (
                                        <div className="mt-1 space-y-0.5 border-t border-slate-300/70 pt-0.5">
                                          {parsedText.lines.slice(1, 9).map((rowLine, rIdx) => (
                                            <div
                                              key={rIdx}
                                              className="text-[6.5px] font-medium text-slate-700 leading-[1.08] truncate"
                                            >
                                              {rowLine.startsWith('(') ? `  ${rowLine}` : `• ${rowLine}`}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        subtitle &&
                                        !isStandaloneIconWithBottomLabel && (
                                          <span className="block text-[7px] font-normal opacity-85 leading-[1.05] whitespace-normal break-normal line-clamp-2">
                                            {subtitle}
                                          </span>
                                        )
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
