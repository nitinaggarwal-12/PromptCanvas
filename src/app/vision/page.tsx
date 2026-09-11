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
  BookmarkPlus
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

const SAMPLE_BLUEPRINTS = PRECOMPILED_SAMPLE_BLUEPRINTS;

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
        const zones = data.extractedZones || ['Ingress & Security', 'Compute Tier', 'Data Tier', 'Agentic AI Services'];
        const count = data.componentCount || (data.xml.match(/<mxCell/g) || []).length;
        const summary = data.summary || `Successfully decompiled ${projectName} into interactive Draw.io XML.`;

        setDecompiledXml(data.xml);
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

        setSelectedBlueprintId(blueprintId);
        setSelectedImageSrc(finalImageSrc);
        setSelectedImageName(projectName);
        setIsCustomUpload(isCustom);
        setLeftPaneMode('single');

        // 💾 Persist to localStorage only when decompilation passes audit
        if (data.auditReport?.verdict === 'BLOCKED') {
          showToast('⛔ Decompilation BLOCKED by Omni QC: output does not match the source image.');
        } else {
          const toSave: SavedVisionBlueprint = {
            id: blueprintId,
            title: projectName,
            category: isCustom ? 'Custom Upload' : (SAMPLE_BLUEPRINTS.find(s => s.id === blueprintId)?.category || 'Architecture'),
            imageSrc: finalImageSrc,
            xml: data.xml,
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
          showToast('✨ Decompilation complete & saved to storage! Diagram synthesized.');
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
        setDecompiledXml(fallback.xml);
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
  }, []);

  // Core Blueprint Loader: checks localStorage first, renders instantly with 0ms delay!
  const loadBlueprint = useCallback(async (id: string, forceRecompile = false) => {
    // 1. Check if user selected one of the certified sample blueprints
    const sample = SAMPLE_BLUEPRINTS.find(s => s.id === id);
    if (sample) {
      setSelectedBlueprintId(sample.id);
      setSelectedImageSrc(sample.image);
      setSelectedImageName(sample.title);
      setIsCustomUpload(false);
      setLeftPaneMode('single'); // Guarantees original image appears on the left

      if (!forceRecompile) {
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
      }

      // If forceRecompile is true, call live decompiler
      try {
        const base64 = await convertUrlToBase64(sample.image);
        await triggerDecompile(base64, 'image/png', sample.title, sample.id, false);
      } catch (err) {
        console.error('Failed to load sample image:', err);
      }
      return;
    }

    // 2. Check if it's a custom uploaded blueprint in localStorage
    const saved = getSavedVisionBlueprint(id);
    if (saved && saved.xml) {
      setSelectedBlueprintId(saved.id);
      setSelectedImageSrc(saved.imageSrc);
      setSelectedImageName(saved.title);
      setIsCustomUpload(true);
      setLeftPaneMode('single'); // Guarantees original image appears on the left
      setDecompiledXml(saved.xml);
      setExtractedZones(saved.extractedZones);
      setComponentCount(saved.componentCount);
      setSummaryText(saved.summaryText);
      setSavedSource(saved.source);
      setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
      setIsDecompiling(false);
      return;
    }

    // 3. Check if diagram exists in persistent database (/api/diagrams)
    try {
      const res = await fetch(`/api/diagrams/${id}`);
      if (res.ok) {
        const dbDiagram = await res.json();
        const latestVer = dbDiagram.versions && dbDiagram.versions[0] ? dbDiagram.versions[0] : null;
        if (latestVer && latestVer.xml_content) {
          setSelectedBlueprintId(dbDiagram.id);
          setSelectedImageName(dbDiagram.name);
          setIsCustomUpload(true);
          setLeftPaneMode('single');
          setDecompiledXml(latestVer.xml_content);
          setComponentCount((latestVer.xml_content.match(/<mxCell/g) || []).length);
          setSummaryText(latestVer.comment || dbDiagram.name);
          setSavedSource('cache');
          setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
          setIsDecompiling(false);

          // Find best matching reference image or fallback
          const matched = SAMPLE_BLUEPRINTS.find(s =>
            s.id === dbDiagram.id ||
            s.title.toLowerCase() === dbDiagram.name.toLowerCase() ||
            (dbDiagram.name.toLowerCase().includes('multiagent') && s.id === 'GCP-MULTIAGENT-01') ||
            (dbDiagram.name.toLowerCase().includes('pharma') && s.id === 'IND-PHARMA-01') ||
            (dbDiagram.name.toLowerCase().includes('api') && s.id === '51')
          );
          if (matched) {
            setSelectedImageSrc(matched.image);
          }
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
  }, [triggerDecompile]);

  // Handle custom user file upload
  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      const customId = `custom_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${file.size}`;

      setSelectedBlueprintId(customId);
      setSelectedImageSrc(base64);
      setSelectedImageName(cleanName);
      setIsCustomUpload(true);
      setLeftPaneMode('single'); // Guarantees original image appears on the left immediately

      // Check if this exact file was previously compiled!
      const saved = getSavedVisionBlueprint(customId);
      if (saved && saved.xml) {
        setDecompiledXml(saved.xml);
        setExtractedZones(saved.extractedZones);
        setComponentCount(saved.componentCount);
        setSummaryText(saved.summaryText);
        setSavedSource('cache');
        setValidationReport({ valid: true, errorCount: 0, warningCount: 0 });
        showToast('✨ Loaded saved decompilation for this image!');
        return;
      }

      await triggerDecompile(base64, file.type, cleanName, customId, true);
    };
    reader.readAsDataURL(file);
  }, [triggerDecompile]);

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
    const targetId = queryId || getLastActiveBlueprintId();
    loadBlueprint(targetId, false);
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

  // Unified list of all blueprints for the library modal
  const allLibraryBlueprints = useMemo(() => {
    const masters = SAMPLE_BLUEPRINTS.map(s => ({
      id: s.id,
      title: s.title,
      category: s.category,
      imageSrc: s.image,
      desc: s.desc,
      componentCount: getBlueprintComponentCount(s.id),
      extractedZones: s.defaultExtractedZones,
      isCustom: false,
      timestamp: 0,
      xml: undefined as string | undefined
    }));

    const customs = customBlueprints.map(c => ({
      id: c.id,
      title: c.title,
      category: c.category,
      imageSrc: c.imageSrc,
      desc: c.summaryText || 'Custom imported / decompiled architecture diagram',
      componentCount: c.componentCount,
      extractedZones: c.extractedZones,
      isCustom: true,
      timestamp: c.timestamp,
      xml: c.xml
    }));

    return [...customs, ...masters];
  }, [customBlueprints]);

  // Filtered blueprints for the library modal
  const filteredLibraryBlueprints = useMemo(() => {
    return allLibraryBlueprints.filter(bp => {
      if (libraryTabFilter === 'custom' && !bp.isCustom) return false;
      if (libraryTabFilter === 'master' && bp.isCustom) return false;

      if (librarySearchQuery.trim()) {
        const q = librarySearchQuery.toLowerCase();
        const matchTitle = bp.title.toLowerCase().includes(q);
        const matchCat = bp.category.toLowerCase().includes(q);
        const matchDesc = (bp.desc || '').toLowerCase().includes(q);
        return matchTitle || matchCat || matchDesc;
      }
      return true;
    });
  }, [allLibraryBlueprints, libraryTabFilter, librarySearchQuery]);

  // Save active diagram to global architecture library in database
  const handleSaveCurrentToGlobalLibrary = async () => {
    if (!decompiledXml) return;
    setIsSavingToDb(true);
    try {
      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedImageName || 'Vision AI Decompiled Diagram',
          xml: decompiledXml,
          comment: `Decompiled with Vision AI (${componentCount} components)`,
          prompt: `Vision Decompiler Blueprint: ${selectedImageName}`,
          architectureType: 'vision_decompiled',
          createdStudio: 'vision',
          isPrivate: false
        })
      });
      if (!res.ok) throw new Error('Failed to save to database');
      showToast('🎉 Saved to Global Architecture Library! Accessible at /library');
    } catch (err: any) {
      console.error('Failed to save diagram to DB:', err);
      showToast(`❌ Could not save to library: ${err?.message || 'Error'}`);
    } finally {
      setIsSavingToDb(false);
    }
  };

  // Save specific blueprint from library modal into global DB
  const handleSaveBlueprintToGlobal = async (bp: { id: string; title: string; xml?: string; componentCount?: number }, e: React.MouseEvent) => {
    e.stopPropagation();
    let xmlToSave = bp.xml;
    if (!xmlToSave) {
      const full = getSavedVisionBlueprint(bp.id);
      xmlToSave = full?.xml;
    }
    if (!xmlToSave) {
      showToast('⚠️ No XML found for this blueprint.');
      return;
    }

    try {
      showToast(`💾 Saving "${bp.title}" to Global Architecture Library...`);
      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bp.title,
          xml: xmlToSave,
          comment: `Vision AI Blueprint: ${bp.title}`,
          prompt: `Vision Decompiler Blueprint: ${bp.title}`,
          architectureType: 'vision_decompiled',
          createdStudio: 'vision',
          isPrivate: false
        })
      });
      if (!res.ok) throw new Error('Save failed');
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
      <header className="dark w-full h-11 bg-[#0B111E] border-b border-slate-800 px-3 md:px-4 flex items-center justify-between shadow-xs flex-shrink-0 z-40">
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
            onClick={handleForceRecompile}
            disabled={isDecompiling}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Re-run live Gemini Vision decompilation over the network"
          >
            <RefreshCw className={`w-3 h-3 text-teal-400 ${isDecompiling ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isDecompiling ? 'Decompiling...' : 'Re-Decompile'}</span>
          </button>

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
            title="Download .drawio file"
          >
            <Download className="w-3 h-3 text-slate-400" />
            <span className="hidden lg:inline">Export</span>
          </button>

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
      </header>

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
          className="px-2.5 py-1 rounded-lg border bg-white border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-1.5 flex-shrink-0"
        >
          {/* Left: Horizontal Blueprint Selector Chips Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.2 no-scrollbar flex-1 min-w-0">
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
              return (
                <div
                  key={cb.id}
                  onClick={() => loadBlueprint(cb.id, false)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title={`Custom Upload: ${cb.title}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-amber-500'}`} />
                  <span className="truncate max-w-[120px]">{cb.title}</span>
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

          {/* Right: Active Status Badge & Telemetry Metadata */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
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
                  {selectedImageSrc ? (
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedImageSrc}
                        alt={selectedImageName}
                        style={{ transform: `scale(${imageZoom})`, transformOrigin: 'center center', transition: 'transform 0.15s ease-out' }}
                        className="w-full h-full max-w-full max-h-full object-contain rounded shadow-2xs select-none"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 py-12">
                      <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">No image selected</p>
                    </div>
                  )}
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
                  onClick={handleForceRecompile}
                  disabled={isDecompiling}
                  className="px-2 py-0.5 rounded-md bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-800 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs disabled:opacity-50"
                  title="Re-run live Omni 1.1 multi-agent decompilation"
                >
                  <RefreshCw className={`w-2.5 h-2.5 text-teal-600 ${isDecompiling ? 'animate-spin' : ''}`} />
                  <span>{isDecompiling ? 'Decompiling...' : 'Re-Decompile'}</span>
                </button>

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

            {/* Right Footer Action */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 truncate mr-2">
                <span>Zones:</span>
                <div className="flex items-center gap-1 truncate">
                  {extractedZones.slice(0, 3).map((z, idx) => (
                    <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[9px] font-mono font-bold truncate">
                      {z}
                    </span>
                  ))}
                  {extractedZones.length > 3 && (
                    <span className="text-[9px] text-slate-500 font-bold">+{extractedZones.length - 3}</span>
                  )}
                </div>
                {auditReport && (
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
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
                    placeholder="Search by title, domain, keywords..."
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
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                                  {bp.category}
                                </span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  {bp.componentCount} nodes
                                </span>
                              </div>

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
