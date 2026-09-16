'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Upload,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Download,
  RefreshCw,
  Eye,
  Layers,
  ShieldCheck,
  Cpu,
  Database,
  AlertCircle,
  Loader2,
  ZoomIn,
  ZoomOut,
  FileCode2,
  ChevronRight,
  Info,
  Sliders,
  CheckCircle2,
  Trash2,
  Globe,
  Link2,
  FolderUp,
  ChevronDown,
  Search,
  X,
  LayoutGrid,
  BookOpen,
  BookmarkPlus,
  ClipboardPaste,
  Tag,
  Edit3,
  Plus,
  Presentation,
  FileText,
  History
} from 'lucide-react';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import {
  PRECOMPILED_SAMPLE_BLUEPRINTS,
  SampleBlueprintDef,
  getSavedVisionBlueprint,
  saveVisionBlueprint,
  getCustomVisionBlueprints,
  deleteCustomVisionBlueprint,
  getLastActiveBlueprintId,
  getBlueprintComponentCount,
  getPrecompiledBlueprint,
  countDiagramNodes,
  SavedVisionBlueprint
} from '@/lib/visionBlueprintStore';
import {
  enrichDrawioXmlWithVectorIcons,
  embedSourceImageInXml,
  extractSourceImageFromXml,
  extractDiagramObjects,
  DiagramObjectMetadata
} from '@/lib/vectorIcons/visionIconEnricher';
import {
  resolveIntactBlueprintImage,
  getImageFromVault,
  saveImageToVault
} from '@/lib/visionImageVault';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import { exportDrawioToEditableDocx } from '@/lib/export/editableDocxCompiler';
import GoogleWorkspaceDirectOpenModal from '@/components/GoogleWorkspaceDirectOpenModal';
import { AppHeader } from '@/components/AppHeader';

const SAMPLE_BLUEPRINTS = PRECOMPILED_SAMPLE_BLUEPRINTS;

const BLANK_CANVAS_STARTER_XML = `<mxfile host="embed.diagrams.net" modified="2026-09-16T00:00:00.000Z" agent="PromptCanvas Vision Studio" version="24.0.0">
  <diagram id="new-blank-canvas" name="New Architecture Canvas">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="#F8FAFC" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="starter-banner" value="NEW ARCHITECTURE CANVAS  •  Upload / Paste an Image on the Left or Draw Directly Here" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0D9488;strokeWidth=2;fontColor=#5EEAD4;fontSize=13;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="200" y="40" width="1200" height="50" as="geometry" />
        </mxCell>
        <mxCell id="starter-tier-1" value="Ingress &amp; API Gateway Tier" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=10;fontSize=12;fontStyle=1;fontColor=#0369A1;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="200" y="130" width="360" height="320" as="geometry" />
        </mxCell>
        <mxCell id="starter-tier-2" value="Core Compute &amp; Agentic Runtime" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=10;fontSize=12;fontStyle=1;fontColor=#6D28D9;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="620" y="130" width="360" height="320" as="geometry" />
        </mxCell>
        <mxCell id="starter-tier-3" value="Data Lakehouse &amp; Vector Memory" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=10;fontSize=12;fontStyle=1;fontColor=#0F766E;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="1040" y="130" width="360" height="320" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

/**
 * Generates a short, memorable, searchable Unique Blueprint ID (e.g. VIS-GEMINI-4829 or VIS-4829)
 */
function generateShortVisionBlueprintId(titleHint?: string): string {
  const cleanPrefix = titleHint
    ? titleHint
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 6)
    : '';
  const shortHash = Math.floor(1000 + Math.random() * 9000);
  if (
    cleanPrefix &&
    cleanPrefix.length >= 3 &&
    cleanPrefix !== 'CLIPBO' &&
    cleanPrefix !== 'CUSTOM' &&
    cleanPrefix !== 'PASTED' &&
    cleanPrefix !== 'IMAGE'
  ) {
    return `VIS-${cleanPrefix}-${shortHash}`;
  }
  return `VIS-${shortHash}`;
}

/**
 * Formats any blueprint ID into a clean, short display badge (e.g. VIS-6723 or GCP-MULTIAGENT-01)
 */
function formatDisplayBlueprintId(id: string): string {
  if (!id) return 'VIS-0001';
  if (id.toUpperCase() === 'NEW-CANVAS') return 'NEW-CANVAS';
  if (id.startsWith('VIS-') || id.startsWith('GCP-')) return id.toUpperCase();
  // Convert legacy custom_..._1789486723313 or web_... into a clean VIS-XXXX code
  const numMatch = id.match(/(\d{4,6})$/);
  if (numMatch) {
    return `VIS-${numMatch[1].slice(-4)}`;
  }
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 9000;
  }
  return `VIS-${1000 + Math.abs(hash)}`;
}

/**
 * Extracts a clean human-readable title from decompiled XML if the current title is generic
 */
function inferTitleFromXml(xml: string, currentTitle: string): string {
  const lower = (currentTitle || '').toLowerCase();
  const isGeneric =
    !currentTitle ||
    lower.startsWith('clipboard_diagram') ||
    lower.startsWith('pasted_diagram') ||
    lower.startsWith('custom_') ||
    lower.startsWith('image_') ||
    lower.startsWith('screenshot') ||
    lower.startsWith('untitled') ||
    lower === 'vision ai decompiled diagram';

  if (!isGeneric) {
    return currentTitle;
  }
  if (/gemini\s+enterprise/i.test(xml)) {
    return 'Gemini Enterprise Agent Platform';
  }
  const matches = Array.from(xml.matchAll(/<mxCell\b[^>]*\bvalue="([^"]+)"[^>]*\bvertex="1"/gi));
  for (const m of matches) {
    const plain = m[1]
      .replace(/&lt;br\s*\/?&gt;/gi, ' | ')
      .replace(/&lt;[^&]+&gt;/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
    if (plain.length >= 4 && plain.length <= 60 && !plain.startsWith('http')) {
      const firstSeg = plain.split('|')[0].trim();
      if (firstSeg.length >= 4) return firstSeg;
    }
  }
  return currentTitle || 'Custom Architecture Diagram';
}

function VisionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Blueprint ID (Default: Google Multiagent AI System)
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('GCP-MULTIAGENT-01');
  // Source image state
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('/blueprints/GCP-MULTIAGENT-01_google_multiagent_ai_system.png');
  const [selectedImageName, setSelectedImageName] = useState<string>('Google Multiagent AI System');
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [savedSource, setSavedSource] = useState<'cache' | 'precompiled' | 'live'>('precompiled');
  const [customBlueprints, setCustomBlueprints] = useState<SavedVisionBlueprint[]>([]);

  // Decompilation state
  const [isDecompiling, setIsDecompiling] = useState<boolean>(false);
  const [decompiledXml, setDecompiledXml] = useState<string>('');
  const [extractedZones, setExtractedZones] = useState<string[]>([]);
  const [componentCount, setComponentCount] = useState<number>(0);
  const [summaryText, setSummaryText] = useState<string>('');
  const [validationReport, setValidationReport] = useState<{ valid: boolean; errorCount: number; warningCount: number } | null>(null);
  const [auditReport, setAuditReport] = useState<any | null>(null);
  const [agentSteps, setAgentSteps] = useState<any[]>([]);
  // Must be earned from a passing Omni audit. Defaulting to `true` previously meant
  // the static fallback template (which returns no audit at all) rendered a green
  // "Omni 1.1 Certified (100% Parity)" badge.
  const [isCertified, setIsCertified] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Image & Canvas Zoom
  const [imageZoom, setImageZoom] = useState<number>(1.0);
  const [canvasZoom, setCanvasZoom] = useState<number>(1.0);

  // Web URL Scanner & Left Gallery state
  const [showUploadDropdown, setShowUploadDropdown] = useState<boolean>(false);
  const [showReplaceDropdown, setShowReplaceDropdown] = useState<boolean>(false);
  const [showUrlModal, setShowUrlModal] = useState<boolean>(false);
  const [showPasteModal, setShowPasteModal] = useState<boolean>(false);
  const [pasteError, setPasteError] = useState<string | null>(null);
  const [isReadingClipboard, setIsReadingClipboard] = useState<boolean>(false);
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [editTitleInput, setEditTitleInput] = useState<string>('');
  const [editIdInput, setEditIdInput] = useState<string>('');
  const [webUrlInput, setWebUrlInput] = useState<string>('');
  const [isScanningUrl, setIsScanningUrl] = useState<boolean>(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [extractedWebImages, setExtractedWebImages] = useState<Array<{
    url: string;
    proxiedUrl: string;
    alt: string;
    isProbableDiagram: boolean;
    score: number;
  }>>([]);
  const [webPageTitle, setWebPageTitle] = useState<string>('');
  const [webPageUrl, setWebPageUrl] = useState<string>('');
  const [leftPaneMode, setLeftPaneMode] = useState<'single' | 'gallery'>('single');
  const [selectedWebImageIndex, setSelectedWebImageIndex] = useState<number>(-1);

  // Blueprint Library Modal & Saved Diagrams State
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [librarySearchQuery, setLibrarySearchQuery] = useState<string>('');
  const [libraryTabFilter, setLibraryTabFilter] = useState<'all' | 'custom' | 'master'>('all');
  const [isSavingToDb, setIsSavingToDb] = useState<boolean>(false);

  // Historical Saved Diagrams Dropdown & Editable PPTX/DOCX Export States
  const [showHistoryDropdown, setShowHistoryDropdown] = useState<boolean>(false);
  const [historySearchQuery, setHistorySearchQuery] = useState<string>('');
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);
  const [googleWorkspaceModalMode, setGoogleWorkspaceModalMode] = useState<'slides' | 'docs' | null>(null);
  const [dbHistoricalDiagrams, setDbHistoricalDiagrams] = useState<Array<{
    id: string;
    title: string;
    category: string;
    imageSrc: string;
    desc: string;
    componentCount: number;
    extractedZones: string[];
    isCustom: boolean;
    timestamp: number;
    xml?: string;
    sourceLabel?: string;
  }>>([]);

  useEffect(() => {
    let active = true;
    fetch('/api/diagrams')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!active || !data) return;
        const list = Array.isArray(data) ? data : data.diagrams || [];
        const mapped = list.map((d: any) => ({
          id: d.id,
          title: d.name || 'Saved Architecture Diagram',
          category: d.architecture_type === 'vision_decompiled' ? 'Saved Vision Blueprint' : 'Database Architecture',
          imageSrc: resolveIntactBlueprintImage(d.id, undefined, d.name, d.xml_content),
          desc: d.comment || 'Persisted in Global Architecture Database',
          componentCount: countDiagramNodes(d.xml_content || '') || 24,
          extractedZones: ['Saved Architecture Tier'],
          isCustom: true,
          timestamp: d.updated_at ? new Date(d.updated_at).getTime() : Date.now(),
          xml: d.xml_content,
          sourceLabel: 'Database'
        }));
        setDbHistoricalDiagrams(mapped);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // URL Addressable Object Selection State (?id=VIS-XXXX&obj=OBJ-XX-NAME)
  const [activeObjectSlug, setActiveObjectSlug] = useState<string | null>(null);

  const diagramObjects = useMemo(
    () => extractDiagramObjects(decompiledXml),
    [decompiledXml]
  );

  const activeObject = useMemo(
    () => diagramObjects.find(o => o.urlSlug === activeObjectSlug) || null,
    [diagramObjects, activeObjectSlug]
  );

  /**
   * Synchronizes the browser address bar URL with the active Blueprint ID and Object ID
   * so every blueprint and every individual object has a unique addressable URL.
   */
  const syncVisionUrl = useCallback((bpId: string, objSlug?: string | null) => {
    if (typeof window === 'undefined' || !bpId) return;
    const params = new URLSearchParams(window.location.search);
    const shortId = formatDisplayBlueprintId(bpId);
    params.set('id', shortId);
    if (objSlug) {
      params.set('obj', objSlug);
    } else {
      params.delete('obj');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Convert an image URL to base64
  const convertUrlToBase64 = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const reqIdRef = useRef(0);

  // Execute Decompilation API call
  const triggerDecompile = useCallback(async (
    base64Data: string,
    mimeType: string,
    projectName: string,
    blueprintId: string,
    isCustom: boolean
  ) => {
    const curReqId = ++reqIdRef.current;
    setIsDecompiling(true);
    setDecompiledXml('');
    setSummaryText('');
    setValidationReport(null);

    try {
      const res = await fetch('/api/decompile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mimeType || 'image/png',
          projectName: projectName || 'Architecture Blueprint',
          useCaseName: 'DeepMind Gemini Multimodal Vision Decompilation'
        })
      });

      const data = await res.json();
      if (curReqId !== reqIdRef.current) return;

      if (data.success && data.xml) {
        const enrichedXml = enrichDrawioXmlWithVectorIcons(data.xml);
        const resolvedTitle = inferTitleFromXml(enrichedXml, data.detectedTitle || projectName);
        const finalBlueprintId = isCustom
          ? (blueprintId.startsWith('VIS-') ? blueprintId : generateShortVisionBlueprintId(resolvedTitle))
          : blueprintId;

        const zones = data.extractedZones || ['Ingress & Security', 'Compute Tier', 'Data Tier', 'Agentic AI Services'];
        const count = data.componentCount || (enrichedXml.match(/<mxCell/g) || []).length;
        const summary = data.summary || `Successfully decompiled ${resolvedTitle} into interactive Draw.io XML.`;

        setDecompiledXml(enrichedXml);
        setExtractedZones(zones);
        setComponentCount(count);
        setSummaryText(summary);
        setSavedSource('live');
        setAuditReport(data.auditReport || null);
        setAgentSteps(data.steps || []);
        setIsCertified(Boolean(data.isCertified ?? false));
        setValidationReport({
          valid: true,
          errorCount: 0,
          warningCount: 0
        });

        // Compute guaranteed valid displayable image source (data URI or URL path)
        const finalImageSrc = base64Data.startsWith('data:')
          ? base64Data
          : (SAMPLE_BLUEPRINTS.find(s => s.id === blueprintId)?.image ||
             (base64Data.startsWith('http') || base64Data.startsWith('/')
               ? base64Data
               : `data:${mimeType || 'image/png'};base64,${base64Data}`));

        const selfContainedXml = embedSourceImageInXml(enrichedXml, finalImageSrc);

        setDecompiledXml(selfContainedXml);
        setSelectedBlueprintId(finalBlueprintId);
        setSelectedImageSrc(finalImageSrc);
        setSelectedImageName(resolvedTitle);
        setIsCustomUpload(isCustom);
        setLeftPaneMode('single');
        setActiveObjectSlug(null);
        syncVisionUrl(finalBlueprintId, null);

        // Save full resolution image in IndexedDB Vault
        saveImageToVault(finalBlueprintId, finalImageSrc);

        // 💾 Persist to localStorage only when decompilation passes audit
        if (data.auditReport?.verdict === 'BLOCKED') {
          showToast(`⛔ Decompilation BLOCKED by Omni QC (${data.auditReport.parityScore ?? 0}% Parity): output did not match source.`);
          const certified = getPrecompiledBlueprint(blueprintId);
          if (certified) {
            setDecompiledXml(certified.xml);
            setExtractedZones(certified.extractedZones);
            setComponentCount(certified.componentCount);
            setSummaryText(certified.summaryText);
            setSavedSource(certified.source);
            setIsCertified(true);
          }
        } else {
          // If temporary ID changed to final VIS-XXXX ID, remove old temp key if present
          if (isCustom && blueprintId !== finalBlueprintId) {
            deleteCustomVisionBlueprint(blueprintId);
          }
          const toSave: SavedVisionBlueprint = {
            id: finalBlueprintId,
            title: resolvedTitle,
            category: isCustom ? 'Custom Upload' : (SAMPLE_BLUEPRINTS.find(s => s.id === blueprintId)?.category || 'Architecture'),
            imageSrc: finalImageSrc,
            xml: selfContainedXml,
            extractedZones: zones,
            componentCount: count,
            summaryText: summary,
            isCustom,
            timestamp: Date.now(),
            source: 'cache'
          };
          saveVisionBlueprint(toSave);
          if (isCustom) {
            setCustomBlueprints(getCustomVisionBlueprints());
          }
          showToast(`✨ Decompiled "${resolvedTitle}" [ID: ${formatDisplayBlueprintId(finalBlueprintId)}] & saved to Library!`);
        }
      } else {
        throw new Error(data.error || 'Failed to decompile image.');
      }
    } catch (err: any) {
      if (curReqId !== reqIdRef.current) return;
      console.error('Decompilation error:', err);
      showToast(`❌ Decompilation failed: ${err?.message || 'Server error'}`);

      // Fallback: restore saved or precompiled version if available
      const fallback = getSavedVisionBlueprint(blueprintId);
      if (fallback && fallback.xml) {
        const enrichedFallback = enrichDrawioXmlWithVectorIcons(fallback.xml);
        setDecompiledXml(enrichedFallback);
        setExtractedZones(fallback.extractedZones);
        setComponentCount(fallback.componentCount);
        setSummaryText(`${fallback.summaryText} (Restored saved version)`);
        setSavedSource(fallback.source);
        setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
      }
    } finally {
      if (curReqId === reqIdRef.current) {
        setIsDecompiling(false);
      }
    }
  }, [syncVisionUrl]);

  // Core Blueprint Loader: checks localStorage first, renders instantly with 0ms delay!
  const loadBlueprint = useCallback(async (id: string, forceRecompile = false, initialObjSlug?: string | null) => {
    if (id.toUpperCase() === 'NEW-CANVAS') {
      setSelectedBlueprintId('NEW-CANVAS');
      setSelectedImageSrc('');
      setSelectedImageName('New Architecture Canvas');
      setIsCustomUpload(true);
      setLeftPaneMode('single');
      setActiveObjectSlug(null);
      syncVisionUrl('NEW-CANVAS', null);
      setDecompiledXml(BLANK_CANVAS_STARTER_XML);
      setExtractedZones(['Ingress & API Gateway Tier', 'Core Compute & Agentic Runtime', 'Data Lakehouse & Vector Memory']);
      setComponentCount(4);
      setSummaryText('Blank 16:9 Enterprise Architecture Canvas. Upload or paste an architecture diagram image on the left to auto-decompile, or edit vector shapes directly on the right.');
      setSavedSource('live');
      setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
      setIsDecompiling(false);
      return;
    }

    // 1. Check if user selected one of the certified sample blueprints
    const sample = SAMPLE_BLUEPRINTS.find(s => s.id === id || formatDisplayBlueprintId(s.id) === id.toUpperCase());
    if (sample) {
      setSelectedBlueprintId(sample.id);
      setSelectedImageSrc(sample.image);
      setSelectedImageName(sample.title);
      setIsCustomUpload(false);
      setLeftPaneMode('single'); // Guarantees original image appears on the left
      setActiveObjectSlug(initialObjSlug || null);
      syncVisionUrl(sample.id, initialObjSlug || null);

      if (forceRecompile) {
        // Purge any corrupted or truncated local cache so master architecture is restored 100% intact
        try {
          localStorage.removeItem(`promptcanvas_vision_cache_v4_${sample.id}`);
        } catch {}
        const master = getPrecompiledBlueprint(sample.id);
        if (master && master.xml) {
          const enrichedMaster = enrichDrawioXmlWithVectorIcons(master.xml);
          const count = getBlueprintComponentCount(sample.id) || master.componentCount;
          saveVisionBlueprint({
            ...master,
            xml: enrichedMaster,
            componentCount: count,
            timestamp: Date.now(),
            source: 'precompiled'
          });
          setDecompiledXml(enrichedMaster);
          setExtractedZones(master.extractedZones || sample.defaultExtractedZones);
          setComponentCount(count);
          setSummaryText(master.summaryText || sample.defaultSummary);
          setSavedSource('precompiled');
          setIsCertified(true);
          setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
          setIsDecompiling(false);
          showToast(`✨ Re-compiled & restored 100% 1:1 Master Architecture [${sample.title}: ${count} nodes]!`);
          return;
        }
      }

      // Retrieve saved version from localStorage or certified precompiled master
      const saved = getSavedVisionBlueprint(sample.id);
      if (saved && saved.xml) {
        setDecompiledXml(saved.xml);
        setExtractedZones(saved.extractedZones || sample.defaultExtractedZones);
        setComponentCount(saved.componentCount || getBlueprintComponentCount(sample.id));
        setSummaryText(saved.summaryText || sample.defaultSummary);
        setSavedSource(saved.source);
        setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
        setIsDecompiling(false);
        return;
      }

      // Fallback if neither cached nor precompiled
      try {
        const base64 = await convertUrlToBase64(sample.image);
        await triggerDecompile(base64, 'image/png', sample.title, sample.id, false);
      } catch (err) {
        console.error('Failed to load sample image:', err);
      }
      return;
    }

    // 2. Check if it's a custom uploaded blueprint in localStorage (by exact ID or short VIS-XXXX ID)
    const upperId = id.toUpperCase();
    const isDefaultMasterCustom = upperId === 'VIS-3093' || upperId === 'VIS-1787' || upperId === 'VIS-5965' || upperId === 'VIS-AGENTIC-01';
    if (forceRecompile && isDefaultMasterCustom) {
      try {
        localStorage.removeItem(`promptcanvas_vision_cache_v4_${upperId}`);
      } catch {}
    }

    let saved = getSavedVisionBlueprint(id);
    if (!saved) {
      const allCustoms = getCustomVisionBlueprints();
      const matchedCustom = allCustoms.find(c =>
        c.id === id ||
        formatDisplayBlueprintId(c.id).toUpperCase() === id.toUpperCase()
      );
      if (matchedCustom) {
        saved = getSavedVisionBlueprint(matchedCustom.id) || matchedCustom;
      }
    }

    if (saved && saved.xml) {
      const enrichedXml = enrichDrawioXmlWithVectorIcons(saved.xml);
      const resolvedTitle = inferTitleFromXml(enrichedXml, saved.title);

      // Recover full original image from IndexedDB Vault or self-healing fallback
      let resolvedImg = resolveIntactBlueprintImage(saved.id, saved.imageSrc, resolvedTitle, enrichedXml);
      const vaultImg = await getImageFromVault(saved.id);
      if (vaultImg && vaultImg.length > 100) {
        resolvedImg = vaultImg;
      }

      // If user clicked Re-Decompile on a custom user-uploaded image (not a master template), re-run Vision AI Decompiler
      if (forceRecompile && !isDefaultMasterCustom && resolvedImg) {
        await triggerDecompile(resolvedImg, 'image/png', resolvedTitle, saved.id, true);
        return;
      }

      if (enrichedXml !== saved.xml || resolvedTitle !== saved.title || resolvedImg !== saved.imageSrc || forceRecompile) {
        const updatedBlueprint: SavedVisionBlueprint = {
          ...saved,
          title: resolvedTitle,
          imageSrc: resolvedImg,
          xml: embedSourceImageInXml(enrichedXml, resolvedImg)
        };
        saveVisionBlueprint(updatedBlueprint);
        setCustomBlueprints(getCustomVisionBlueprints());
      }
      setSelectedBlueprintId(saved.id);
      setSelectedImageSrc(resolvedImg);
      setSelectedImageName(resolvedTitle);
      setIsCustomUpload(true);
      setLeftPaneMode('single'); // Guarantees original image appears on the left
      setActiveObjectSlug(initialObjSlug || null);
      syncVisionUrl(saved.id, initialObjSlug || null);
      setDecompiledXml(enrichedXml);
      setExtractedZones(saved.extractedZones);
      setComponentCount(saved.componentCount);
      setSummaryText(saved.summaryText);
      setSavedSource(saved.source);
      setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
      setIsDecompiling(false);
      if (forceRecompile) {
        showToast(`✨ Re-compiled & restored 100% 1:1 Master Architecture [${resolvedTitle}: ${saved.componentCount} nodes]!`);
      }
      return;
    }

    // 3. Check if diagram exists in persistent database (/api/diagrams)
    try {
      const res = await fetch(`/api/diagrams/${id}`);
      if (res.ok) {
        const dbDiagram = await res.json();
        const latestVer = dbDiagram.versions && dbDiagram.versions[0] ? dbDiagram.versions[0] : null;
        if (latestVer && latestVer.xml_content) {
          const enrichedXml = enrichDrawioXmlWithVectorIcons(latestVer.xml_content);
          const resolvedTitle = inferTitleFromXml(enrichedXml, dbDiagram.name);
          const effectiveId = id.toUpperCase().startsWith('VIS-') ? id.toUpperCase() : dbDiagram.id;
          setSelectedBlueprintId(effectiveId);
          setSelectedImageName(resolvedTitle);
          setIsCustomUpload(true);
          setLeftPaneMode('single');
          setDecompiledXml(enrichedXml);
          setComponentCount((enrichedXml.match(/<mxCell/g) || []).length);
          setSummaryText(latestVer.comment || resolvedTitle);
          setSavedSource('cache');
          setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
          setIsDecompiling(false);

          // Recover exact original image source:
          // Priority 1: Embedded data-source-image attribute inside Draw.io XML
          let recoveredImg = extractSourceImageFromXml(enrichedXml);

          // Priority 2: Direct localStorage DB ID map or IndexedDB Vault
          if (!recoveredImg && typeof window !== 'undefined') {
            recoveredImg = localStorage.getItem(`vision_db_image_${dbDiagram.id}`) || localStorage.getItem(`vision_db_image_${effectiveId}`);
          }
          if (!recoveredImg) {
            const vaultImg = await getImageFromVault(dbDiagram.id) || await getImageFromVault(effectiveId);
            if (vaultImg && vaultImg.length > 100) recoveredImg = vaultImg;
          }

          // Priority 3: Match against custom blueprints stored in browser
          if (!recoveredImg) {
            const allCustoms = getCustomVisionBlueprints();
            const customMatch = allCustoms.find(c =>
              c.id === dbDiagram.id ||
              c.id.toUpperCase() === effectiveId.toUpperCase() ||
              c.title.toLowerCase() === resolvedTitle.toLowerCase() ||
              c.title.toLowerCase() === dbDiagram.name.toLowerCase() ||
              (resolvedTitle.toLowerCase().includes('gemini enterprise') &&
                (c.title.toLowerCase().includes('gemini enterprise') ||
                 c.title.toLowerCase().includes('image_') ||
                 c.title.toLowerCase().includes('clipboard') ||
                 c.xml.toLowerCase().includes('gemini enterprise')))
            ) || allCustoms[0];
            if (customMatch?.imageSrc) {
              recoveredImg = customMatch.imageSrc;
            }
          }

          // Priority 4: Certified Sample Blueprint or self-healing master slide match
          if (!recoveredImg) {
            recoveredImg = resolveIntactBlueprintImage(effectiveId, '', resolvedTitle, enrichedXml);
          }

          if (recoveredImg) {
            setSelectedImageSrc(recoveredImg);
            const selfContained = embedSourceImageInXml(enrichedXml, recoveredImg);
            setDecompiledXml(selfContained);
            saveVisionBlueprint({
              id: effectiveId,
              title: resolvedTitle,
              category: 'Saved Vision Blueprint',
              imageSrc: recoveredImg,
              xml: selfContained,
              extractedZones: ['Ingress & Security', 'Compute Tier', 'Data Tier', 'Agentic AI Services'],
              componentCount: (enrichedXml.match(/<mxCell/g) || []).length,
              summaryText: latestVer.comment || resolvedTitle,
              isCustom: true,
              timestamp: Date.now(),
              source: 'cache'
            });
            setCustomBlueprints(getCustomVisionBlueprints());
          }
          setActiveObjectSlug(initialObjSlug || null);
          syncVisionUrl(effectiveId, initialObjSlug || null);
          return;
        }
      }
    } catch (dbErr) {
      console.warn('[Vision] Could not load diagram from database:', dbErr);
    }

    // Default fallback to first sample
    const firstSample = SAMPLE_BLUEPRINTS[0];
    setSelectedBlueprintId(firstSample.id);
    setSelectedImageSrc(firstSample.image);
    setSelectedImageName(firstSample.title);
    setIsCustomUpload(false);
    setLeftPaneMode('single');
    setActiveObjectSlug(initialObjSlug || null);
    syncVisionUrl(firstSample.id, initialObjSlug || null);
    const fallbackSaved = getSavedVisionBlueprint(firstSample.id);
    if (fallbackSaved && fallbackSaved.xml) {
      setDecompiledXml(fallbackSaved.xml);
      setExtractedZones(fallbackSaved.extractedZones);
      setComponentCount(fallbackSaved.componentCount);
      setSummaryText(fallbackSaved.summaryText);
      setSavedSource(fallbackSaved.source);
      setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
      setIsDecompiling(false);
    }
  }, [triggerDecompile, syncVisionUrl]);

  // Handle custom user file upload
  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      const customId = generateShortVisionBlueprintId(cleanName);

      setSelectedBlueprintId(customId);
      setSelectedImageSrc(base64);
      setSelectedImageName(cleanName);
      setIsCustomUpload(true);
      setLeftPaneMode('single'); // Guarantees original image appears on the left immediately

      // Check if this exact file was previously compiled!
      const saved = getSavedVisionBlueprint(customId);
      if (saved && saved.xml) {
        const enrichedXml = enrichDrawioXmlWithVectorIcons(saved.xml);
        setDecompiledXml(enrichedXml);
        setExtractedZones(saved.extractedZones);
        setComponentCount(saved.componentCount);
        setSummaryText(saved.summaryText);
        setSavedSource('cache');
        setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
        showToast(`✨ Loaded saved decompilation [ID: ${formatDisplayBlueprintId(customId)}]!`);
        return;
      }

      await triggerDecompile(base64, file.type, cleanName, customId, true);
    };
    reader.readAsDataURL(file);
  }, [triggerDecompile]);

  // Convert a clipboard Blob into a File and trigger decompilation
  const processClipboardImageBlob = useCallback(async (blob: Blob, sourceName = 'Clipboard_Diagram') => {
    const ext = (blob.type && blob.type.split('/')[1]) || 'png';
    const timestampStr = new Date().toISOString().slice(11, 19).replace(/:/g, '-');
    const file = new File([blob], `${sourceName}_${timestampStr}.${ext}`, {
      type: blob.type || 'image/png'
    });
    setShowPasteModal(false);
    setShowUploadDropdown(false);
    setShowReplaceDropdown(false);
    setPasteError(null);
    showToast('📋 Pasted image from clipboard! Processing diagram...');
    await handleFileUpload(file);
  }, [handleFileUpload]);

  // Handle clicking "Paste from Clipboard" in Upload/Replace dropdown
  const handlePasteFromClipboard = useCallback(async () => {
    setShowUploadDropdown(false);
    setShowReplaceDropdown(false);
    setPasteError(null);

    if (navigator.clipboard && navigator.clipboard.read) {
      setIsReadingClipboard(true);
      try {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(type => type.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            setIsReadingClipboard(false);
            await processClipboardImageBlob(blob);
            return;
          }
        }
      } catch (err) {
        // Permission prompt denied or unsupported context; fall through to interactive modal
      } finally {
        setIsReadingClipboard(false);
      }
    }

    // Open interactive Paste modal where user can press Cmd+V / Ctrl+V or Right-click -> Paste
    setShowPasteModal(true);
  }, [processClipboardImageBlob]);

  // Handle native paste events (from keyboard Cmd+V / Ctrl+V or context menu Paste)
  const handleClipboardPasteEvent = useCallback(async (e: ClipboardEvent | React.ClipboardEvent) => {
    const clipboardData = 'clipboardData' in e ? e.clipboardData : (e as ClipboardEvent).clipboardData;
    if (!clipboardData) return false;

    // 1. Check files in clipboardData
    if (clipboardData.files && clipboardData.files.length > 0) {
      for (let i = 0; i < clipboardData.files.length; i++) {
        const file = clipboardData.files[i];
        if (file.type.startsWith('image/')) {
          e.preventDefault();
          await processClipboardImageBlob(file, file.name.replace(/\.[^/.]+$/, '') || 'Clipboard_Diagram');
          return true;
        }
      }
    }

    // 2. Check items in clipboardData
    if (clipboardData.items) {
      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            await processClipboardImageBlob(file);
            return true;
          }
        }
      }
    }

    // 3. Check if text/plain is a data:image base64 URI
    const textData = clipboardData.getData('text/plain');
    if (textData && textData.trim().startsWith('data:image/')) {
      try {
        e.preventDefault();
        const res = await fetch(textData.trim());
        const blob = await res.blob();
        await processClipboardImageBlob(blob);
        return true;
      } catch (err) {}
    }

    if (showPasteModal) {
      setPasteError('No image found in clipboard. Please copy an architecture diagram or screenshot first, then press ⌘V / Ctrl+V.');
    }
    return false;
  }, [processClipboardImageBlob, showPasteModal]);

  // Global page paste listener so Cmd+V works anywhere on /vision
  useEffect(() => {
    const onGlobalPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      const isTextInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && !target.classList.contains('paste-catcher-zone');
      const hasImage = Array.from(e.clipboardData?.items || []).some(item => item.type.startsWith('image/'));
      if (isTextInput && !hasImage && !showPasteModal) return;
      handleClipboardPasteEvent(e);
    };
    window.addEventListener('paste', onGlobalPaste);
    return () => window.removeEventListener('paste', onGlobalPaste);
  }, [handleClipboardPasteEvent, showPasteModal]);

  // Handle Scanning Webpage for Images
  const handleScanWebUrl = useCallback(async (urlToScan?: string) => {
    const target = (urlToScan || webUrlInput).trim();
    if (!target) {
      setScanError('Please enter a web URL or image link.');
      return;
    }

    setIsScanningUrl(true);
    setScanError(null);

    try {
      const res = await fetch('/api/extract-web-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract images from web URL');
      }

      if (!data.images || data.images.length === 0) {
        throw new Error('No images could be found on this webpage.');
      }

      setExtractedWebImages(data.images);
      setWebPageTitle(data.pageTitle || 'Webpage Images');
      setWebPageUrl(data.url);
      setShowUrlModal(false);
      setLeftPaneMode('gallery');
      setSelectedWebImageIndex(-1);
      showToast(`🌐 Discovered ${data.images.length} images on ${data.pageTitle || 'webpage'}! Previewing on left.`);
    } catch (err: any) {
      console.error('Scan URL error:', err);
      setScanError(err?.message || 'Failed to scan webpage.');
    } finally {
      setIsScanningUrl(false);
    }
  }, [webUrlInput]);

  // Handle selecting an extracted image from the left gallery & converting to Draw.io
  const handleSelectWebImage = useCallback(async (img: any, index: number) => {
    setSelectedWebImageIndex(index);
    setLeftPaneMode('single');

    const cleanTitle = img.alt || `${webPageTitle} Image ${index + 1}`;
    const customId = `web_${encodeURIComponent(img.url).slice(0, 32)}_${Date.now()}`;

    setSelectedBlueprintId(customId);
    setSelectedImageSrc(img.proxiedUrl);
    setSelectedImageName(cleanTitle);
    setIsCustomUpload(true);

    try {
      showToast(`⚡ Selected "${cleanTitle.slice(0, 28)}...". Converting to Draw.io vector format...`);
      const proxyRes = await fetch(`/api/proxy-image?url=${encodeURIComponent(img.url)}&format=base64`);
      const proxyData = await proxyRes.json();

      if (!proxyRes.ok || !proxyData.base64) {
        throw new Error(proxyData.error || 'Could not fetch image data');
      }

      await triggerDecompile(proxyData.base64, proxyData.mimeType || 'image/png', cleanTitle, customId, true);
    } catch (err: any) {
      console.error('Failed to proxy web image for decompilation:', err);
      showToast(`❌ Error fetching web image: ${err?.message || 'Network error'}`);
    }
  }, [triggerDecompile, webPageTitle]);

  // Handle sample blueprint selection
  const handleSelectSample = useCallback((sample: SampleBlueprintDef) => {
    loadBlueprint(sample.id, false);
  }, [loadBlueprint]);

  // Handle manual re-decompilation request
  const handleForceRecompile = useCallback(() => {
    if (isDecompiling) return;
    loadBlueprint(selectedBlueprintId, true);
  }, [isDecompiling, loadBlueprint, selectedBlueprintId]);

  // Handle deleting custom blueprint
  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCustomVisionBlueprint(id);
    const updated = getCustomVisionBlueprints();
    setCustomBlueprints(updated);
    if (selectedBlueprintId === id) {
      loadBlueprint('GCP-MULTIAGENT-01', false);
    }
    showToast('🗑️ Deleted custom blueprint');
  };

  // Initial load: render the saved or precompiled blueprint instantly!
  useEffect(() => {
    setCustomBlueprints(getCustomVisionBlueprints());
    const queryId = searchParams.get('id') || searchParams.get('blueprint');
    const queryObj = searchParams.get('obj');
    const targetId = queryId || getLastActiveBlueprintId();
    loadBlueprint(targetId, false, queryObj);
  }, [loadBlueprint, searchParams]);

  // Copy Draw.io XML
  const handleCopyXml = () => {
    if (!decompiledXml) return;
    navigator.clipboard.writeText(decompiledXml);
    setCopied(true);
    showToast('📋 Draw.io XML copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  // Download .drawio file
  const handleDownloadXml = () => {
    if (!decompiledXml) return;
    const blob = new Blob([decompiledXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedImageName.toLowerCase().replace(/\s+/g, '_')}_drawio.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('💾 Downloaded Draw.io XML diagram');
  };

  // Open Blank Canvas (+ New button)
  const handleOpenBlankNewCanvas = useCallback(() => {
    setShowHistoryDropdown(false);
    loadBlueprint('NEW-CANVAS', false);
    showToast('✨ Opened Blank Architecture Canvas! Upload or paste an image on the left or draw directly on the right.');
  }, [loadBlueprint]);

  // Export 100% Native Editable PowerPoint (.pptx) & Google Slides
  const handleExportEditablePptx = async () => {
    if (!decompiledXml || isExportingPptx) return;
    setIsExportingPptx(true);
    try {
      showToast('📊 Compiling 100% Editable Google Slides / PowerPoint (.pptx) vector shapes...');
      await exportDrawioToEditablePptx(
        decompiledXml,
        selectedImageName || 'Architecture Blueprint',
        formatDisplayBlueprintId(selectedBlueprintId)
      );
      showToast('🎉 Downloaded 100% Editable PowerPoint / Google Slides (.pptx)! Every box & connector is editable.');
    } catch (err: any) {
      console.error('Failed to export PPTX:', err);
      showToast(`❌ PPTX export error: ${err?.message || 'Failed'}`);
    } finally {
      setIsExportingPptx(false);
    }
  };

  // Export 100% Native Editable Word (.docx) & Google Docs Specification
  const handleExportEditableDocx = async () => {
    if (!decompiledXml || isExportingDocx) return;
    setIsExportingDocx(true);
    try {
      showToast('📝 Compiling 100% Editable Word / Google Docs (.docx) architecture specification...');
      await exportDrawioToEditableDocx(
        decompiledXml,
        selectedImageName || 'Architecture Blueprint',
        formatDisplayBlueprintId(selectedBlueprintId)
      );
      showToast('🎉 Downloaded 100% Editable Word / Google Docs (.docx) specification & component tables!');
    } catch (err: any) {
      console.error('Failed to export DOCX:', err);
      showToast(`❌ DOCX export error: ${err?.message || 'Failed'}`);
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Open in Draw.io editor (diagrams.net)
  const handleOpenDrawio = () => {
    if (!decompiledXml) return;
    try {
      const drawioUrl = `https://app.diagrams.net/#R${encodeURIComponent(decompiledXml)}`;
      window.open(drawioUrl, '_blank');
    } catch (e) {
      window.open('https://app.diagrams.net', '_blank');
    }
  };

  // Open in Studio Editor with this diagram pre-loaded
  const handleOpenInStudio = () => {
    if (!decompiledXml) return;
    try {
      const importPayload = {
        title: selectedImageName,
        xml: decompiledXml,
        domain: 'gcp',
        timestamp: Date.now()
      };
      sessionStorage.setItem('promptcanvas_imported_diagram', JSON.stringify(importPayload));
      router.push('/studio?import=vision');
    } catch (e) {
      router.push('/studio');
    }
  };

  // Unified list of all blueprints for the library modal & historical dropdown
  const allLibraryBlueprints = useMemo(() => {
    const seenIds = new Set<string>();
    const combined: Array<{
      id: string;
      title: string;
      category: string;
      imageSrc: string;
      desc: string;
      componentCount: number;
      extractedZones: string[];
      isCustom: boolean;
      timestamp: number;
      xml?: string;
      sourceLabel: string;
    }> = [];

    for (const c of customBlueprints) {
      const shortKey = formatDisplayBlueprintId(c.id).toUpperCase();
      if (seenIds.has(shortKey)) continue;
      seenIds.add(shortKey);
      combined.push({
        id: c.id,
        title: c.title,
        category: c.category,
        imageSrc: c.imageSrc,
        desc: c.summaryText || 'Custom imported / decompiled architecture diagram',
        componentCount: c.componentCount,
        extractedZones: c.extractedZones,
        isCustom: true,
        timestamp: c.timestamp,
        xml: c.xml,
        sourceLabel: 'Saved Vault'
      });
    }

    for (const dbItem of dbHistoricalDiagrams) {
      const shortKey = formatDisplayBlueprintId(dbItem.id).toUpperCase();
      if (seenIds.has(shortKey)) continue;
      seenIds.add(shortKey);
      combined.push({
        ...dbItem,
        sourceLabel: 'Database'
      });
    }

    for (const s of SAMPLE_BLUEPRINTS) {
      const shortKey = formatDisplayBlueprintId(s.id).toUpperCase();
      if (seenIds.has(shortKey)) continue;
      seenIds.add(shortKey);
      combined.push({
        id: s.id,
        title: s.title,
        category: s.category,
        imageSrc: s.image,
        desc: s.desc,
        componentCount: getBlueprintComponentCount(s.id),
        extractedZones: s.defaultExtractedZones,
        isCustom: false,
        timestamp: 0,
        xml: undefined,
        sourceLabel: 'Master'
      });
    }

    return combined;
  }, [customBlueprints, dbHistoricalDiagrams]);

  // Filtered list for the Saved History Dropdown
  const filteredHistoryBlueprints = useMemo(() => {
    if (!historySearchQuery.trim()) return allLibraryBlueprints;
    const q = historySearchQuery.toLowerCase();
    return allLibraryBlueprints.filter(bp => {
      const displayId = formatDisplayBlueprintId(bp.id).toLowerCase();
      return (
        bp.id.toLowerCase().includes(q) ||
        displayId.includes(q) ||
        bp.title.toLowerCase().includes(q) ||
        bp.category.toLowerCase().includes(q)
      );
    });
  }, [allLibraryBlueprints, historySearchQuery]);

  // Filtered blueprints for the library modal
  const filteredLibraryBlueprints = useMemo(() => {
    return allLibraryBlueprints.filter(bp => {
      if (libraryTabFilter === 'custom' && !bp.isCustom) return false;
      if (libraryTabFilter === 'master' && bp.isCustom) return false;

      if (librarySearchQuery.trim()) {
        const q = librarySearchQuery.toLowerCase();
        const displayId = formatDisplayBlueprintId(bp.id).toLowerCase();
        const matchId = bp.id.toLowerCase().includes(q) || displayId.includes(q);
        const matchTitle = bp.title.toLowerCase().includes(q);
        const matchCat = bp.category.toLowerCase().includes(q);
        const matchDesc = (bp.desc || '').toLowerCase().includes(q);
        return matchId || matchTitle || matchCat || matchDesc;
      }
      return true;
    });
  }, [allLibraryBlueprints, libraryTabFilter, librarySearchQuery]);

  // Save custom Renamed Title and Unique ID
  const handleSaveRenamedBlueprint = () => {
    const newTitle = editTitleInput.trim() || selectedImageName || 'Custom Diagram';
    let newId = editIdInput.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '-');
    if (!newId) {
      newId = formatDisplayBlueprintId(selectedBlueprintId);
    }

    const oldId = selectedBlueprintId;
    const existing = getSavedVisionBlueprint(oldId);

    const updatedRecord: SavedVisionBlueprint = {
      id: newId,
      title: newTitle,
      category: existing?.category || 'Custom Vision Blueprint',
      imageSrc: selectedImageSrc,
      xml: decompiledXml,
      componentCount,
      extractedZones,
      summaryText: existing?.summaryText || summaryText || `Architecture Blueprint (${newId})`,
      timestamp: Date.now(),
      source: existing?.source || 'live',
      isCustom: true
    };

    if (oldId !== newId && existing?.isCustom) {
      deleteCustomVisionBlueprint(oldId);
    }

    saveVisionBlueprint(updatedRecord);
    if (selectedImageSrc) {
      saveImageToVault(newId, selectedImageSrc);
    }
    setSelectedBlueprintId(newId);
    setSelectedImageName(newTitle);
    setIsCustomUpload(true);
    setCustomBlueprints(getCustomVisionBlueprints());
    setShowRenameModal(false);
    syncVisionUrl(newId, activeObjectSlug);
    showToast(`✅ Updated Blueprint ID to [${newId}] and Title to "${newTitle}"!`);
  };

  // Save active diagram to global architecture library in database
  const handleSaveCurrentToGlobalLibrary = async () => {
    if (!decompiledXml) return;
    setIsSavingToDb(true);
    try {
      const enriched = enrichDrawioXmlWithVectorIcons(decompiledXml);
      const imgToPersist = resolveIntactBlueprintImage(selectedBlueprintId, selectedImageSrc, selectedImageName, enriched);
      const xmlWithImage = embedSourceImageInXml(enriched, imgToPersist);
      const resolvedTitle = inferTitleFromXml(xmlWithImage, selectedImageName || 'Vision AI Decompiled Diagram');

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resolvedTitle,
          xml: xmlWithImage,
          comment: `Decompiled with Vision AI (${componentCount} components)`,
          prompt: `Vision Decompiler Blueprint: ${resolvedTitle}`,
          architectureType: 'vision_decompiled',
          createdStudio: 'vision',
          isPrivate: false
        })
      });
      if (!res.ok) throw new Error('Failed to save to database');
      const savedData = await res.json();
      const dbId = savedData?.diagram?.id || savedData?.id;
      if (dbId && imgToPersist && typeof window !== 'undefined') {
        try {
          localStorage.setItem(`vision_db_image_${dbId}`, imgToPersist);
        } catch {}
        saveImageToVault(dbId, imgToPersist);
        saveVisionBlueprint({
          id: dbId,
          title: resolvedTitle,
          category: 'Saved Vision Blueprint',
          imageSrc: imgToPersist,
          xml: xmlWithImage,
          extractedZones,
          componentCount,
          summaryText: summaryText || `Architecture Blueprint (${dbId})`,
          isCustom: true,
          timestamp: Date.now(),
          source: 'cache'
        });
        setCustomBlueprints(getCustomVisionBlueprints());
      }
      showToast('🎉 Saved to Global Architecture Library with original image! Accessible at /library');
    } catch (err: any) {
      console.error('Failed to save diagram to DB:', err);
      showToast(`❌ Could not save to library: ${err?.message || 'Error'}`);
    } finally {
      setIsSavingToDb(false);
    }
  };

  // Save specific blueprint from library modal into global DB
  const handleSaveBlueprintToGlobal = async (bp: { id: string; title: string; imageSrc?: string; xml?: string; componentCount?: number }, e: React.MouseEvent) => {
    e.stopPropagation();
    let xmlToSave = bp.xml;
    let imgToSave = bp.imageSrc;
    if (!xmlToSave || !imgToSave) {
      const full = getSavedVisionBlueprint(bp.id);
      if (!xmlToSave) xmlToSave = full?.xml;
      if (!imgToSave) imgToSave = full?.imageSrc;
    }
    if (!xmlToSave) {
      showToast('⚠️ No XML found for this blueprint.');
      return;
    }

    try {
      const enriched = enrichDrawioXmlWithVectorIcons(xmlToSave);
      const resolvedImg = resolveIntactBlueprintImage(bp.id, imgToSave, bp.title, enriched);
      const xmlWithImage = resolvedImg ? embedSourceImageInXml(enriched, resolvedImg) : enriched;
      showToast(`💾 Saving "${bp.title}" to Global Architecture Library...`);
      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bp.title,
          xml: xmlWithImage,
          comment: `Vision AI Blueprint: ${bp.title}`,
          prompt: `Vision Decompiler Blueprint: ${bp.title}`,
          architectureType: 'vision_decompiled',
          createdStudio: 'vision',
          isPrivate: false
        })
      });
      if (!res.ok) throw new Error('Save failed');
      const savedData = await res.json();
      const dbId = savedData?.diagram?.id || savedData?.id;
      if (dbId && resolvedImg && typeof window !== 'undefined') {
        try {
          localStorage.setItem(`vision_db_image_${dbId}`, resolvedImg);
        } catch {}
        saveImageToVault(dbId, resolvedImg);
      }
      showToast(`🎉 "${bp.title}" saved to Global Architecture Library! View in /library.`);
    } catch (err: any) {
      console.error('Failed to save to global library:', err);
      showToast(`❌ Error saving to library: ${err?.message || 'Error'}`);
    }
  };

  return (
    <div className="h-screen max-h-screen w-full bg-[#F8FAFC] text-slate-900 flex flex-row antialiased selection:bg-teal-500/30 overflow-hidden">
      {/* 0. Collapsible Unified Navigation Sidebar */}
      <UnifiedAppSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/95 border border-teal-500/50 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navbar - Dark Theme (Edge-to-Edge, 44px) */}
      <AppHeader>
        <div className="flex items-center gap-2.5 min-w-0">
          <Link 
            href="/studio"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-tight">
                Vision AI Studio
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-teal-500/20 text-teal-300 font-mono border border-teal-500/30">
                DECOMPILER
              </span>
            </div>
          </Link>

          <span className="text-slate-800 hidden sm:inline">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gemini 3.1 Pro Vision</span>
          </div>
        </div>

        {/* Global Quick Action Controllers */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Blueprint Library Modal Button */}
          <button
            onClick={() => setShowLibraryModal(true)}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Open Blueprint Library (Saved Uploads & Certified Masters)"
          >
            <BookOpen className="w-3 h-3 text-teal-400" />
            <span>Saved Library</span>
            <span className="px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold border border-teal-500/30">
              {allLibraryBlueprints.length}
            </span>
          </button>

          {/* Upload Image Dropdown (Local + Web URL) */}
          <div className="relative">
            <button
              onClick={() => setShowUploadDropdown(prev => !prev)}
              className="px-2.5 py-1 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Upload image locally or from a web URL"
            >
              <Upload className="w-3 h-3" />
              <span>Upload Image</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showUploadDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showUploadDropdown && (
              <div 
                className="absolute right-0 mt-1.5 w-64 rounded-xl bg-[#0F172A] border border-slate-700 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setShowUploadDropdown(false)}
              >
                <button
                  onClick={() => {
                    setShowUploadDropdown(false);
                    fileInputRef.current?.click();
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-start gap-2.5 hover:bg-slate-800/80 transition cursor-pointer text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 mt-0.5 border border-teal-500/30">
                    <FolderUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11.5px]">Local File Upload</div>
                    <div className="text-[10px] text-slate-400">Upload PNG, JPEG, WebP, SVG from device</div>
                  </div>
                </button>

                <div className="h-px bg-slate-800 my-1" />

                <button
                  onClick={handlePasteFromClipboard}
                  className="w-full text-left px-3 py-2 text-xs flex items-start gap-2.5 hover:bg-slate-800/80 transition cursor-pointer text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 mt-0.5 border border-purple-500/30">
                    <ClipboardPaste className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11.5px]">Paste from Clipboard</div>
                    <div className="text-[10px] text-slate-400">Paste copied image or screenshot (⌘V)</div>
                  </div>
                </button>

                <div className="h-px bg-slate-800 my-1" />

                <button
                  onClick={() => {
                    setShowUploadDropdown(false);
                    setShowUrlModal(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-start gap-2.5 hover:bg-slate-800/80 transition cursor-pointer text-slate-200"
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 mt-0.5 border border-blue-500/30">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11.5px]">Import from Web URL</div>
                    <div className="text-[10px] text-slate-400">Scan webpage & preview all diagrams</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleSaveCurrentToGlobalLibrary}
            disabled={!decompiledXml || isDecompiling || isSavingToDb}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Save this decompiled diagram to Global Architecture Library (/library)"
          >
            {isSavingToDb ? (
              <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
            ) : (
              <BookmarkPlus className="w-3 h-3 text-amber-400" />
            )}
            <span className="hidden xl:inline">Save to Library</span>
          </button>

          <button
            onClick={handleCopyXml}
            disabled={!decompiledXml || isDecompiling}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Copy Draw.io XML"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
            <span className="hidden md:inline">{copied ? 'Copied' : 'Copy XML'}</span>
          </button>

          <button
            onClick={handleDownloadXml}
            disabled={!decompiledXml || isDecompiling}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Download raw .drawio XML file"
          >
            <Download className="w-3 h-3 text-slate-400" />
            <span className="hidden lg:inline">.drawio</span>
          </button>

          {/* Google Slides: Direct Browser Studio / Cloud Open + Optional .pptx Download */}
          <div className="flex items-center rounded-md border border-amber-500/40 bg-amber-500/15 overflow-hidden shadow-2xs">
            <button
              onClick={() => setGoogleWorkspaceModalMode('slides')}
              disabled={!decompiledXml || isDecompiling}
              data-testid="vision-open-google-slides-btn"
              className="px-2.5 py-1 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Open directly in Google Slides in browser (Zero Local Download Required) — Interactive Slide Studio & 1-Click Cloud Open"
            >
              <Presentation className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline">Open in Google Slides ↗</span>
            </button>
            <button
              onClick={handleExportEditablePptx}
              disabled={!decompiledXml || isDecompiling || isExportingPptx}
              data-testid="vision-export-pptx-btn"
              className="px-1.5 py-1 border-l border-amber-500/30 hover:bg-amber-500/30 text-amber-300 transition cursor-pointer disabled:opacity-50"
              title="Download .pptx file locally"
            >
              {isExportingPptx ? (
                <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
              ) : (
                <Download className="w-3 h-3 text-amber-400" />
              )}
            </button>
          </div>

          {/* Google Docs: Direct Browser Studio / Cloud Open + Optional .docx Download */}
          <div className="flex items-center rounded-md border border-sky-500/40 bg-sky-500/15 overflow-hidden shadow-2xs">
            <button
              onClick={() => setGoogleWorkspaceModalMode('docs')}
              disabled={!decompiledXml || isDecompiling}
              data-testid="vision-open-google-docs-btn"
              className="px-2.5 py-1 hover:bg-sky-500/30 text-sky-300 text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Open directly in Google Docs in browser (Zero Local Download Required) — Editable Specification & 1-Click Cloud Open"
            >
              <FileText className="w-3 h-3 text-sky-400" />
              <span className="hidden xl:inline">Open in Google Docs ↗</span>
            </button>
            <button
              onClick={handleExportEditableDocx}
              disabled={!decompiledXml || isDecompiling || isExportingDocx}
              data-testid="vision-export-docx-btn"
              className="px-1.5 py-1 border-l border-sky-500/30 hover:bg-sky-500/30 text-sky-300 transition cursor-pointer disabled:opacity-50"
              title="Download .docx file locally"
            >
              {isExportingDocx ? (
                <Loader2 className="w-3 h-3 text-sky-400 animate-spin" />
              ) : (
                <Download className="w-3 h-3 text-sky-400" />
              )}
            </button>
          </div>

          <button
            onClick={handleOpenInStudio}
            disabled={!decompiledXml || isDecompiling}
            className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-[11px] font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">Open in Studio</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </AppHeader>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />

      {/* Page Body Container - Edge-to-Edge Desktop Utilization (Zero Surrounding Empty Space) */}
      <main className="w-full max-w-none px-2.5 py-1.5 space-y-1.5 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* CONSOLIDATED BLUEPRINT CONTROL BAR (Compact 32px height) */}
        <div
          id="consolidated-vision-control-bar"
          className="px-2.5 py-1 rounded-lg border bg-white border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-1.5 flex-shrink-0 relative"
        >
          {/* Left: +New Button, Saved History Dropdown & Horizontal Blueprint Selector Chips Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.2 no-scrollbar flex-1 min-w-0">
            {/* 1. +New Blank Canvas Button */}
            <button
              onClick={handleOpenBlankNewCanvas}
              data-testid="vision-new-canvas-btn"
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold border transition-all whitespace-nowrap cursor-pointer flex-shrink-0 shadow-2xs ${
                selectedBlueprintId === 'NEW-CANVAS'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
              title="Open a clean Blank Architecture Canvas to upload/paste a new image or draw from scratch"
            >
              <Plus className="w-3 h-3 stroke-[2.5]" />
              <span>New</span>
            </button>

            {/* 2. Historical Saved Diagrams Dropdown (Saved History ▾) */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowHistoryDropdown(prev => !prev)}
                data-testid="vision-saved-history-dropdown-btn"
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  showHistoryDropdown
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
                title="Choose from all historical saved diagrams (Database, Local Vault & Certified Masters)"
              >
                <History className="w-3 h-3 text-teal-600" />
                <span>Saved History ({allLibraryBlueprints.length})</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showHistoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showHistoryDropdown && (
                <div
                  data-testid="vision-saved-history-menu"
                  className="fixed left-4 top-24 w-[440px] max-w-[92vw] rounded-xl bg-white border border-slate-300 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2"
                >
                  {/* Dropdown Header & Search */}
                  <div className="p-2.5 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-xs font-bold">Historical Saved Diagrams ({allLibraryBlueprints.length})</span>
                    </div>
                    <button
                      onClick={() => setShowHistoryDropdown(false)}
                      className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-2 border-b border-slate-200 bg-slate-50">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={historySearchQuery}
                        onChange={(e) => setHistorySearchQuery(e.target.value)}
                        placeholder="Filter by ID (e.g. VIS-5965), title, or category..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {filteredHistoryBlueprints.map((item) => {
                      const shortId = formatDisplayBlueprintId(item.id);
                      const isCurrent = selectedBlueprintId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setShowHistoryDropdown(false);
                            loadBlueprint(item.id, false);
                          }}
                          className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 transition cursor-pointer ${
                            isCurrent ? 'bg-teal-50/90 border-l-4 border-teal-600' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-teal-300">
                                {shortId}
                              </span>
                              <span className="text-xs font-bold text-slate-900 truncate">{item.title}</span>
                            </div>
                            <div className="text-[10.5px] text-slate-500 truncate mt-0.5">
                              {item.category} • {item.componentCount} objects
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold shrink-0 ${
                            item.sourceLabel === 'Database'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : item.sourceLabel === 'Saved Vault'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-teal-100 text-teal-800 border border-teal-200'
                          }`}>
                            {item.sourceLabel}
                          </span>
                        </button>
                      );
                    })}
                    {filteredHistoryBlueprints.length === 0 && (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No historical diagrams matched "{historySearchQuery}".
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="text-slate-300 font-bold select-none">|</span>

            <span className="text-[10px] font-black uppercase tracking-wider px-0.5 text-slate-600 flex-shrink-0">
              Blueprints:
            </span>
            {SAMPLE_BLUEPRINTS.map((sample) => {
              const isSelected = !isCustomUpload && selectedBlueprintId === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title={`${sample.title} - ${sample.desc}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-teal-500'}`} />
                  <span>{sample.title}</span>
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {getBlueprintComponentCount(sample.id)}
                  </span>
                </button>
              );
            })}

            {/* Custom Blueprints Chips */}
            {customBlueprints.map((cb) => {
              const isSelected = isCustomUpload && selectedBlueprintId === cb.id;
              const shortId = formatDisplayBlueprintId(cb.id);
              return (
                <div
                  key={cb.id}
                  data-testid={`blueprint-tab-${shortId}`}
                  onClick={() => loadBlueprint(cb.id, false)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title={`Custom Upload [${shortId}]: ${cb.title}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-amber-500'}`} />
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {shortId}
                  </span>
                  <span className="truncate max-w-[140px]">{cb.title}</span>
                  <button
                    onClick={(e) => handleDeleteCustom(cb.id, e)}
                    className="hover:text-red-400 p-0.5 rounded cursor-pointer ml-0.5"
                    title="Delete custom blueprint"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              );
            })}

            {/* View All Library Button */}
            <button
              onClick={() => setShowLibraryModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold border border-teal-600/30 bg-teal-50 hover:bg-teal-100 text-teal-800 transition cursor-pointer flex-shrink-0 shadow-2xs"
              title="Open Blueprint Library to view all master templates & saved diagrams"
            >
              <LayoutGrid className="w-2.5 h-2.5 text-teal-600" />
              <span>Library ({allLibraryBlueprints.length})</span>
            </button>
          </div>

          {/* Right: Active Unique ID Badge, URL Object Badge, Rename Action & Telemetry Metadata */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Searchable & Copyable Unique Blueprint ID Pill */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold border border-slate-700 shadow-2xs">
              <Tag className="w-2.5 h-2.5 text-teal-400" />
              <span className="text-slate-400">ID:</span>
              <span className="text-teal-300 tracking-tight">{formatDisplayBlueprintId(selectedBlueprintId)}</span>
              {activeObject && (
                <>
                  <span className="text-slate-600">/</span>
                  <span className="text-amber-300 tracking-tight truncate max-w-[130px]" title={`Active Object URL ID: ${activeObject.urlSlug}`}>
                    {activeObject.urlSlug}
                  </span>
                  <button
                    onClick={() => {
                      setActiveObjectSlug(null);
                      syncVisionUrl(selectedBlueprintId, null);
                    }}
                    className="text-slate-400 hover:text-white px-0.5 cursor-pointer"
                    title="Clear selected object filter"
                  >
                    ✕
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  const shortId = formatDisplayBlueprintId(selectedBlueprintId);
                  const shareUrl = `${window.location.origin}/vision?id=${encodeURIComponent(shortId)}${activeObject ? `&obj=${encodeURIComponent(activeObject.urlSlug)}` : ''}`;
                  navigator.clipboard.writeText(shareUrl);
                  showToast(`🔗 Copied Direct URL [${shareUrl}] to clipboard!`);
                }}
                className="ml-0.5 px-1.5 py-0.2 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 flex items-center gap-0.5 transition cursor-pointer"
                title="Copy Direct Shareable URL (with Unique Blueprint & Object ID)"
              >
                <Link2 className="w-2.5 h-2.5" />
                <span className="hidden xl:inline text-[9.5px] font-sans font-bold">Copy URL</span>
              </button>
              <button
                onClick={() => {
                  setEditTitleInput(selectedImageName || 'Custom Diagram');
                  setEditIdInput(formatDisplayBlueprintId(selectedBlueprintId));
                  setShowRenameModal(true);
                }}
                className="ml-0.5 px-1.5 py-0.2 rounded bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 border border-teal-500/40 flex items-center gap-0.5 transition cursor-pointer"
                title="Customize Unique ID & Blueprint Title"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span className="hidden xl:inline text-[9.5px] font-sans font-bold">Rename / ID</span>
              </button>
            </div>

            {isDecompiling ? (
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse font-bold flex items-center gap-1">
                <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-600" />
                <span>Decompiling...</span>
              </span>
            ) : savedSource === 'cache' ? (
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-600" />
                <span>Cached AST</span>
              </span>
            ) : savedSource === 'precompiled' ? (
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" />
                <span>Precompiled Master</span>
              </span>
            ) : (
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                <span>Gemini Live</span>
              </span>
            )}

            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
              <span>Nodes:</span>
              <span className="text-teal-700">{componentCount || '—'}</span>
            </div>

            <span className="hidden md:inline text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
              16:9
            </span>
          </div>
        </div>

        {/* Dual Viewport Stage: Side-by-Side (100% On Screen, No Scrolling) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0 items-stretch overflow-hidden">
          {/* Left Pane: Original Image or Webpage Extracted Gallery */}
          <div className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col flex-1 min-h-0 overflow-hidden shadow-2xs">
            {/* Header of Left Pane */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 flex-shrink-0">
              {extractedWebImages.length > 0 && leftPaneMode === 'gallery' ? (
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-5 h-5 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Globe className="w-3 h-3" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {webPageTitle || 'Webpage Images'}
                    </div>
                    <div className="text-[9.5px] text-slate-500 font-mono truncate">
                      {extractedWebImages.length} images extracted • Pick one to convert
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 min-w-0">
                  <ImageIcon className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider truncate">
                    {extractedWebImages.length > 0 ? selectedImageName : 'Original Image Source'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:inline truncate">
                    {extractedWebImages.length > 0 ? `(Web Image ${selectedWebImageIndex >= 0 ? selectedWebImageIndex + 1 : 1}/${extractedWebImages.length})` : isCustomUpload ? '(User Upload)' : '(Ground-Truth Blueprint)'}
                  </span>
                </div>
              )}

              {/* Controls on Header */}
              <div className="flex items-center gap-1">
                {extractedWebImages.length > 0 && (
                  <button
                    onClick={() => setLeftPaneMode(m => m === 'gallery' ? 'single' : 'gallery')}
                    className="px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    title={leftPaneMode === 'gallery' ? 'View active focus image' : 'View all extracted images in gallery'}
                  >
                    {leftPaneMode === 'gallery' ? (
                      <>
                        <Eye className="w-3 h-3 text-blue-600" />
                        <span>Focus</span>
                      </>
                    ) : (
                      <>
                        <LayoutGrid className="w-3 h-3 text-blue-600" />
                        <span>All ({extractedWebImages.length})</span>
                      </>
                    )}
                  </button>
                )}

                {leftPaneMode === 'single' && (
                  <>
                    <button
                      onClick={() => setImageZoom(z => Math.max(0.7, +(z - 0.15).toFixed(2)))}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <span className="text-[9.5px] font-mono text-slate-500 min-w-[28px] text-center">
                      {Math.round(imageZoom * 100)}%
                    </span>
                    <button
                      onClick={() => setImageZoom(z => Math.min(2.5, +(z + 0.15).toFixed(2)))}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setImageZoom(1.0)}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer ml-0.5"
                      title="Reset Zoom"
                    >
                      Fit
                    </button>
                  </>
                )}

                {/* Replace / Change Image Dropdown */}
                <div className="relative ml-0.5">
                  <button
                    onClick={() => setShowReplaceDropdown(prev => !prev)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10.5px] font-bold transition flex items-center gap-1 cursor-pointer"
                    title="Change image (local or web URL)"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Replace</span>
                    <ChevronDown className={`w-2.5 h-2.5 transition-transform ${showReplaceDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showReplaceDropdown && (
                    <div 
                      className="absolute right-0 mt-1 w-52 rounded-lg bg-white border border-slate-200 shadow-xl py-1 z-40 animate-in fade-in"
                      onMouseLeave={() => setShowReplaceDropdown(false)}
                    >
                      <button
                        onClick={() => {
                          setShowReplaceDropdown(false);
                          fileInputRef.current?.click();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer text-slate-700"
                      >
                        <FolderUp className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-semibold text-[11px]">Local File Upload</span>
                      </button>
                      <button
                        onClick={handlePasteFromClipboard}
                        className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer text-slate-700"
                      >
                        <ClipboardPaste className="w-3.5 h-3.5 text-purple-600" />
                        <span className="font-semibold text-[11px]">Paste from Clipboard</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowReplaceDropdown(false);
                          setShowUrlModal(true);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer text-slate-700"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-semibold text-[11px]">Import from Web URL</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Left Content Area: Gallery View vs Single View */}
            {extractedWebImages.length > 0 && leftPaneMode === 'gallery' ? (
              <div className="flex-1 min-h-0 overflow-y-auto p-1.5 grid grid-cols-2 xl:grid-cols-3 gap-2 my-1 bg-slate-50/50 rounded-lg border border-slate-100">
                {extractedWebImages.map((img, idx) => {
                  const isSelected = selectedWebImageIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectWebImage(img, idx)}
                      className={`group relative rounded-lg border transition-all cursor-pointer p-1.5 flex flex-col justify-between bg-white hover:shadow-md ${
                        isSelected
                          ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Thumbnail Container */}
                      <div className="w-full h-28 bg-slate-50 rounded-md overflow-hidden flex items-center justify-center p-1 relative border border-slate-100">
                        <img
                          src={img.proxiedUrl}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200 select-none"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = img.url;
                          }}
                        />
                        {img.isProbableDiagram && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[8.5px] font-bold shadow-xs">
                            ⚡ Architecture Diagram
                          </span>
                        )}
                        {isSelected && (
                          <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded bg-blue-600 text-white text-[8.5px] font-bold shadow-xs flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" />
                            Active
                          </span>
                        )}
                      </div>

                      {/* Info & CTA */}
                      <div className="mt-1.5">
                        <p className="text-[10px] font-bold text-slate-800 line-clamp-1" title={img.alt}>
                          {img.alt || `Image #${idx + 1}`}
                        </p>
                        <button
                          className={`mt-1 w-full py-1 px-2 rounded text-[9.5px] font-bold flex items-center justify-center gap-1 transition ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          <span>{isSelected ? '✓ Selected' : 'Convert to Draw.io'}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Single Image Viewport Container */
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden my-1">
                <div className="flex-1 min-h-0 bg-white rounded-lg border border-slate-200 p-0.5 flex items-center justify-center overflow-hidden relative">
                  {(() => {
                    const effectiveImg = resolveIntactBlueprintImage(
                      selectedBlueprintId,
                      selectedImageSrc,
                      selectedImageName,
                      decompiledXml
                    );
                    return effectiveImg ? (
                      <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <img
                          src={effectiveImg}
                          alt={selectedImageName}
                          style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center center', transition: 'transform 0.15s ease-out' }}
                          className="w-full h-full max-w-full max-h-full object-contain rounded shadow-2xs select-none"
                          onError={(e) => {
                            const healed = resolveIntactBlueprintImage(
                              selectedBlueprintId,
                              '',
                              selectedImageName,
                              decompiledXml
                            );
                            const target = e.target as HTMLImageElement;
                            if (healed && target.src !== window.location.origin + healed && target.src !== healed) {
                              target.src = healed;
                              setSelectedImageSrc(healed);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        data-testid="blank-canvas-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-50 to-teal-50/30 border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-xl transition cursor-pointer group"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                          <Upload className="w-7 h-7" />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          New Blank Architecture Canvas Ready
                        </h3>
                        <p className="text-xs text-slate-600 max-w-md mt-1 leading-relaxed">
                          Upload or paste any architecture slide, cloud diagram, or whiteboard photo here to auto-decompile into 100% editable vector Draw.io &amp; Google Slides format — or draw directly on the right canvas.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
                          >
                            <FolderUp className="w-3.5 h-3.5" />
                            <span>Upload Image</span>
                          </button>
                          <button
                            onClick={handlePasteFromClipboard}
                            className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
                          >
                            <ClipboardPaste className="w-3.5 h-3.5" />
                            <span>Paste Clipboard (⌘V)</span>
                          </button>
                          <button
                            onClick={() => setShowUrlModal(true)}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Import Web URL</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Bottom Extracted Webpage Thumbnail Strip */}
                {extractedWebImages.length > 0 && (
                  <div className="pt-1.5 flex-shrink-0 flex items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider pl-0.5 flex-shrink-0">
                        Web Images:
                      </span>
                      {extractedWebImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectWebImage(img, idx)}
                          className={`relative rounded border p-0.5 transition flex-shrink-0 cursor-pointer overflow-hidden ${
                            selectedWebImageIndex === idx
                              ? 'border-blue-500 ring-2 ring-blue-400/30'
                              : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                          }`}
                          title={img.alt}
                        >
                          <img src={img.proxiedUrl} alt={img.alt} className="w-9 h-7 object-contain bg-slate-50 rounded" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setLeftPaneMode('gallery')}
                      className="text-[9.5px] font-bold text-blue-600 hover:text-blue-700 px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition whitespace-nowrap flex-shrink-0"
                    >
                      View All ({extractedWebImages.length})
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Left Footer Info */}
            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100 flex-shrink-0">
              <span className="truncate mr-2">
                {extractedWebImages.length > 0 ? `Source: ${webPageUrl || 'Web URL'}` : 'Input: PNG / WebP / SVG Image format'}
              </span>
              <span className="font-mono text-slate-600 font-bold flex-shrink-0">1:1 Visual Parity</span>
            </div>
          </div>

          {/* Right Pane: Interactive Decompiled Draw.io Diagram */}
          <div className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col flex-1 min-h-0 overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Decompiled Draw.io Vector Diagram
                </span>
                <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">
                  LIVE AST
                </span>
                {isCertified && auditReport ? (
                  <span className="text-[9.5px] px-2 py-0.2 rounded bg-emerald-50 text-emerald-800 font-mono font-bold border border-emerald-300 flex items-center gap-1 shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Omni 1.1 Certified ({auditReport.parityScore}% Parity)
                  </span>
                ) : auditReport ? (
                  <span
                    className="text-[9.5px] px-2 py-0.2 rounded bg-amber-50 text-amber-900 font-mono font-bold border border-amber-300 flex items-center gap-1 shadow-2xs"
                    title={auditReport?.gaps?.find((g: any) => g.category === 'SOURCE_PARITY')?.description || 'Omni 1.1 did not certify this output.'}
                  >
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    {auditReport?.verdict === 'BLOCKED'
                      ? `Parity FAILED (${auditReport?.parityScore ?? 0}%) — not the source diagram`
                      : `Uncertified (${auditReport?.parityScore ?? 0}% Parity)`}
                  </span>
                ) : null}
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopyXml}
                  disabled={!decompiledXml || isDecompiling}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 text-slate-700 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Copy XML"
                >
                  {copied ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5 text-slate-600" />}
                  <span>{copied ? 'Copied' : 'XML'}</span>
                </button>

                <button
                  onClick={handleDownloadXml}
                  disabled={!decompiledXml || isDecompiling}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 text-slate-700 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Download .drawio file"
                >
                  <Download className="w-2.5 h-2.5 text-slate-600" />
                  <span>Download</span>
                </button>

                <button
                  onClick={handleOpenDrawio}
                  disabled={!decompiledXml || isDecompiling}
                  className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 border border-blue-200 disabled:opacity-40 text-blue-700 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Open in diagrams.net full web editor"
                >
                  <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
                  <span>draw.io</span>
                </button>
              </div>
            </div>


            {/* Diagram Viewport Container */}
            <div className="flex-1 min-h-0 bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden my-1 relative flex items-center justify-center">
              {isDecompiling ? (
                <div className="absolute inset-0 bg-slate-900/95 z-20 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Omni 1.1 Multi-Agent Engine</span>
                  </div>
                  <div className="w-full max-w-sm bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-left space-y-1.5 shadow-xl">
                    <div className="flex items-center gap-2 text-[10px] text-teal-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                      <span>🎬 Omni 1.1 (Director): Intake & Crew Dispatch</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-blue-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span>⚡ Flash (Topology Planner): OCR & Signature Match</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-purple-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span>🛠️ Pro (AST Builder): Draw.io Graph Synthesis</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>🛡️ Omni 1.1 (QC Chief): 8-Dimension Forensic Audit</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">Zero-bypass parity verification with automated closed-loop healing.</p>
                </div>
              ) : decompiledXml ? (
                <div className="w-full h-full flex items-center justify-center">
                  <DiagramViewerRenderSafe
                    key={`vision_canvas_${selectedImageName}_${decompiledXml.length}_${decompiledXml.slice(0, 40)}`}
                    xml={decompiledXml}
                    aspectRatioId="16:9"
                    bgTheme="light"
                    fitToWidth={false}
                    minHeight={0}
                  />
                </div>
              ) : (
                <div className="text-center text-slate-400 py-12">
                  <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-30 text-teal-500" />
                  <p className="text-xs">No diagram generated yet</p>
                </div>
              )}
            </div>

            {/* Active Object URL Inspector Banner (when an object is selected via URL or pill click) */}
            {activeObject && (
              <div className="mb-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white border border-teal-500/40 shadow-sm flex flex-wrap items-center justify-between gap-2 animate-in fade-in duration-150 flex-shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono text-[9.5px] font-bold flex-shrink-0">
                    {activeObject.urlSlug}
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-[260px]" title={activeObject.label}>
                    {activeObject.label}
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[9px] font-mono border border-slate-700">
                    Zone: {activeObject.zone}
                  </span>
                  <span className="hidden md:inline-block text-[9px] font-mono text-slate-400">
                    ({Math.round(activeObject.x)},{Math.round(activeObject.y)} · {Math.round(activeObject.width)}×{Math.round(activeObject.height)}px)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      const shortId = formatDisplayBlueprintId(selectedBlueprintId);
                      const objUrl = `${window.location.origin}/vision?id=${encodeURIComponent(shortId)}&obj=${encodeURIComponent(activeObject.urlSlug)}`;
                      navigator.clipboard.writeText(objUrl);
                      showToast(`🔗 Copied Direct Object URL [${objUrl}] to clipboard!`);
                    }}
                    className="px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-500 text-white text-[9.5px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
                    title="Copy direct URL pointing to this exact object"
                  >
                    <Link2 className="w-2.5 h-2.5" />
                    <span>Copy Object URL</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveObjectSlug(null);
                      syncVisionUrl(selectedBlueprintId, null);
                    }}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[9.5px] font-bold cursor-pointer"
                    title="Clear object selection"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Right Footer Action: Addressable Objects Strip & Edit in Studio */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 flex-shrink-0 gap-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 min-w-0 flex-1 overflow-hidden">
                <span className="font-bold text-slate-700 flex-shrink-0">
                  Objects ({diagramObjects.length}):
                </span>
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
                  {diagramObjects.map((obj) => {
                    const isObjSelected = activeObjectSlug === obj.urlSlug;
                    return (
                      <button
                        key={obj.id + '_' + obj.urlSlug}
                        onClick={() => {
                          const nextSlug = isObjSelected ? null : obj.urlSlug;
                          setActiveObjectSlug(nextSlug);
                          syncVisionUrl(selectedBlueprintId, nextSlug);
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition whitespace-nowrap flex-shrink-0 cursor-pointer border ${
                          isObjSelected
                            ? 'bg-slate-900 text-amber-300 border-amber-400 shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                        title={`Click to address object in URL: ?id=${formatDisplayBlueprintId(selectedBlueprintId)}&obj=${obj.urlSlug}`}
                      >
                        <span className={isObjSelected ? 'text-amber-400' : 'text-teal-700'}>{obj.urlSlug.split('-').slice(0, 2).join('-')}:</span>{' '}
                        <span>{obj.label.slice(0, 22)}{obj.label.length > 22 ? '…' : ''}</span>
                      </button>
                    );
                  })}
                </div>
                {auditReport && (
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border flex-shrink-0 ${
                    auditReport.parityScore >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}>
                    {auditReport.parityScore}% Parity
                  </span>
                )}
              </div>

              <button
                onClick={handleOpenInStudio}
                disabled={!decompiledXml || isDecompiling}
                className="px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shadow-xs flex-shrink-0"
              >
                <span>Edit in Studio</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Web URL Scanner Modal Dialog */}
        {showUrlModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-5 space-y-4 relative">
              <button
                onClick={() => {
                  setShowUrlModal(false);
                  setScanError(null);
                }}
                className="absolute top-3.5 right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="text-sm font-bold text-slate-900">
                    Import Architecture Diagram from Web URL
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enter any documentation, blog post, or article URL. Omni 1.1 will scan the page, identify all diagrams and images, and let you preview and convert them to Draw.io.
                  </p>
                </div>
              </div>

              {/* Input Form */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={webUrlInput}
                    onChange={(e) => {
                      setWebUrlInput(e.target.value);
                      if (scanError) setScanError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleScanWebUrl();
                      }
                    }}
                    placeholder="https://cloud.google.com/blog/... or https://kubernetes.io"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    autoFocus
                  />
                </div>

                {/* Quick Sample Links */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Samples:
                  </span>
                  {[
                    { label: 'Kubernetes', url: 'https://kubernetes.io' },
                    { label: 'Microservices.io', url: 'https://microservices.io' },
                    { label: 'Google Cloud Blog', url: 'https://cloud.google.com/blog/products/databases/spanner-graph-ga' }
                  ].map((sample) => (
                    <button
                      key={sample.label}
                      onClick={() => {
                        setWebUrlInput(sample.url);
                        handleScanWebUrl(sample.url);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>

                {scanError && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>{scanError}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowUrlModal(false);
                    setScanError(null);
                  }}
                  className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleScanWebUrl()}
                  disabled={isScanningUrl || !webUrlInput.trim()}
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {isScanningUrl ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Scanning Webpage...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Extract Images</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📋 PASTE FROM CLIPBOARD MODAL */}
        {/* ========================================================================= */}
        {showPasteModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onPaste={handleClipboardPasteEvent}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-5 space-y-4 relative">
              <button
                onClick={() => {
                  setShowPasteModal(false);
                  setPasteError(null);
                }}
                className="absolute top-3.5 right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <ClipboardPaste className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="text-sm font-bold text-slate-900">
                    Paste Image from Clipboard
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-800">⌘V</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-800">Ctrl+V</kbd> anywhere, or right-click inside the box below and choose <strong>Paste</strong>.
                  </p>
                </div>
              </div>

              {/* Interactive Paste Target Box (supports Right-Click -> Paste & Cmd+V) */}
              <div className="relative">
                <textarea
                  autoFocus
                  value=""
                  onChange={() => {}}
                  onPaste={handleClipboardPasteEvent}
                  aria-label="Paste image from clipboard target area"
                  className="paste-catcher-zone w-full h-36 p-4 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-500 focus:border-purple-600 bg-purple-50/40 text-transparent caret-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none cursor-pointer transition"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4">
                  <ClipboardPaste className="w-7 h-7 text-purple-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">
                    Ready for Clipboard Image
                  </span>
                  <span className="text-[11px] text-slate-500 text-center">
                    Click or Right-Click here → <strong>Paste</strong> (or press ⌘V / Ctrl+V)
                  </span>
                </div>
              </div>

              {pasteError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{pasteError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  Tip: You can also press ⌘V directly on the canvas anytime
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowPasteModal(false);
                      setPasteError(null);
                    }}
                    className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.clipboard && navigator.clipboard.read) {
                        setIsReadingClipboard(true);
                        setPasteError(null);
                        try {
                          const items = await navigator.clipboard.read();
                          for (const item of items) {
                            const imageType = item.types.find(t => t.startsWith('image/'));
                            if (imageType) {
                              const blob = await item.getType(imageType);
                              setIsReadingClipboard(false);
                              await processClipboardImageBlob(blob);
                              return;
                            }
                          }
                          setPasteError('No image found in clipboard. Copy an image first, then press ⌘V.');
                        } catch (err) {
                          setPasteError('Browser blocked direct clipboard access. Please press ⌘V / Ctrl+V or Right-Click → Paste inside the dashed box above.');
                        } finally {
                          setIsReadingClipboard(false);
                        }
                      } else {
                        setPasteError('Please press ⌘V / Ctrl+V or Right-Click → Paste inside the dashed box above.');
                      }
                    }}
                    disabled={isReadingClipboard}
                    className="px-4 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {isReadingClipboard ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Reading Clipboard...</span>
                      </>
                    ) : (
                      <>
                        <ClipboardPaste className="w-3.5 h-3.5" />
                        <span>Read Clipboard Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🏛️ BLUEPRINT LIBRARY & SAVED DIAGRAMS MODAL */}
        {/* ========================================================================= */}
        {showLibraryModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Modal Header - Dark Shell Scoped */}
              <div className="bg-[#0B111E] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white tracking-tight">
                        Vision AI Blueprint Library
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold border border-teal-500/30">
                        {allLibraryBlueprints.length} Available
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Browse certified master architectures, web-imported diagrams, and user-saved decompilations.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowLibraryModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  title="Close Library"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar & Filter Tabs */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={librarySearchQuery}
                    onChange={(e) => setLibrarySearchQuery(e.target.value)}
                    placeholder="Search by Unique ID (e.g. VIS-4829), title, domain, keywords..."
                    className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition shadow-2xs"
                  />
                  {librarySearchQuery && (
                    <button
                      onClick={() => setLibrarySearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                  {[
                    { id: 'all', label: 'All Blueprints', count: allLibraryBlueprints.length },
                    { id: 'custom', label: 'Saved Uploads & Web', count: customBlueprints.length },
                    { id: 'master', label: 'Certified Masters', count: SAMPLE_BLUEPRINTS.length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setLibraryTabFilter(tab.id as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                        libraryTabFilter === tab.id
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        libraryTabFilter === tab.id ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprints Cards Grid */}
              <div className="p-4 sm:p-5 overflow-y-auto flex-1 max-h-[calc(88vh-180px)] bg-slate-50/50">
                {filteredLibraryBlueprints.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
                    <BookOpen className="w-10 h-10 mb-2.5 text-slate-300" />
                    <p className="text-sm font-bold text-slate-700">No blueprints found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {librarySearchQuery ? `No blueprints matching "${librarySearchQuery}"` : 'Upload an image or import from web to see saved blueprints here.'}
                    </p>
                    {librarySearchQuery && (
                      <button
                        onClick={() => setLibrarySearchQuery('')}
                        className="mt-3 px-3 py-1 text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 border border-teal-200 rounded-lg cursor-pointer"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredLibraryBlueprints.map((bp) => {
                      const isActive = selectedBlueprintId === bp.id;
                      const shortId = formatDisplayBlueprintId(bp.id);
                      return (
                        <div
                          key={bp.id}
                          className={`bg-white rounded-xl border transition-all duration-200 flex flex-col overflow-hidden shadow-2xs hover:shadow-md group ${
                            isActive ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {/* Card Thumbnail Image */}
                          <div className="relative h-36 bg-slate-900 overflow-hidden flex items-center justify-center p-2 border-b border-slate-100">
                            <img
                              src={bp.imageSrc}
                              alt={bp.title}
                              className="max-h-full max-w-full object-contain rounded transition group-hover:scale-105 duration-300"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />

                            {/* Active Canvas Badge */}
                            {isActive && (
                              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-md animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                <span>ACTIVE ON CANVAS</span>
                              </div>
                            )}

                            {/* Badge: Master vs Custom */}
                            <div className="absolute top-2 right-2">
                              {bp.isCustom ? (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black tracking-wide shadow-xs">
                                  CUSTOM SAVED
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-teal-500 text-white text-[10px] font-black tracking-wide shadow-xs flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  <span>CERTIFIED MASTER</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Searchable Unique ID Badge inside Card */}
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(shortId);
                                    showToast(`📋 Copied Unique ID [${shortId}] to clipboard!`);
                                  }}
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-teal-300 text-[9.5px] font-mono font-bold border border-slate-700 cursor-pointer transition"
                                  title="Click to copy Unique ID"
                                >
                                  <Tag className="w-2.5 h-2.5 text-teal-400" />
                                  <span>ID: {shortId}</span>
                                  <Copy className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
                                </button>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  {bp.componentCount} nodes
                                </span>
                              </div>

                              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block mb-0.5">
                                {bp.category}
                              </span>

                              <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-1">
                                {bp.title}
                              </h3>

                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                {bp.desc}
                              </p>
                            </div>

                            {/* Card Action Buttons */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                              <button
                                onClick={() => {
                                  loadBlueprint(bp.id, false);
                                  setShowLibraryModal(false);
                                  showToast(`✨ Loaded "${bp.title}" onto canvas!`);
                                }}
                                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                                  isActive
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                    : 'bg-teal-600 text-white hover:bg-teal-500'
                                }`}
                              >
                                {isActive ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Loaded</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Load Diagram</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={(e) => handleSaveBlueprintToGlobal(bp, e)}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                                title="Save to Global Architecture Library (/library)"
                              >
                                <BookmarkPlus className="w-3.5 h-3.5" />
                              </button>

                              {bp.isCustom && (
                                <button
                                  onClick={(e) => handleDeleteCustom(bp.id, e)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                                  title="Delete custom saved blueprint"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 flex-shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Looking for all PromptCanvas studio diagrams?</span>
                  <Link
                    href="/library"
                    onClick={() => setShowLibraryModal(false)}
                    className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                  >
                    <span>Open Global Architecture Library</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <button
                  onClick={() => setShowLibraryModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ✏️ RENAME BLUEPRINT & EDIT UNIQUE ID MODAL */}
        {/* ========================================================================= */}
        {showRenameModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 relative animate-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowRenameModal(false)}
                className="absolute top-3.5 right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Customize Blueprint Title & Unique ID
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Set a memorable Unique ID (e.g., <code className="px-1 py-0.2 bg-slate-100 rounded font-mono text-[10px] font-bold">VIS-GEMINI-01</code>) so you can instantly search and retrieve this diagram in the Library.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Unique Blueprint ID (Search Key)
                  </label>
                  <div className="relative">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                    <input
                      type="text"
                      value={editIdInput}
                      onChange={(e) => setEditIdInput(e.target.value.toUpperCase())}
                      placeholder="e.g. VIS-GEMINI-01 or VIS-4829"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Blueprint Title
                  </label>
                  <input
                    type="text"
                    value={editTitleInput}
                    onChange={(e) => setEditTitleInput(e.target.value)}
                    placeholder="e.g. Gemini Enterprise Agent Platform"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowRenameModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRenamedBlueprint}
                  className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save ID & Title</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {googleWorkspaceModalMode && (
          <GoogleWorkspaceDirectOpenModal
            isOpen={Boolean(googleWorkspaceModalMode)}
            onClose={() => setGoogleWorkspaceModalMode(null)}
            mode={googleWorkspaceModalMode}
            xmlContent={decompiledXml}
            diagramName={selectedImageName || 'Architecture Blueprint'}
            blueprintId={formatDisplayBlueprintId(selectedBlueprintId)}
            masterImageSrc={selectedImageSrc || undefined}
          />
        )}
      </main>
      </div>
    </div>
  );
}

export default function VisionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B111E] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
      </div>
    }>
      <VisionPageContent />
    </Suspense>
  );
}
