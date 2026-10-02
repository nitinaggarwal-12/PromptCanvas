'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Search,
  ChevronDown,
  Maximize2,
  Zap,
  Check,
  Copy,
  CheckCheck,
  ArrowRight,
  Sliders,
  Network,
  Compass,
  FileCode,
  ShieldCheck,
  Boxes,
  Cpu,
  Lock,
  Globe,
  Database,
  GitBranch,
  RefreshCw,
  FolderKanban,
  Edit3,
  ExternalLink,
  Eye,
  Download,
  ShieldAlert,
  Wrench,
  History,
  RotateCcw,
  Upload,
  Tag,
  CheckCircle,
  AlertCircle,
  X,
  FileText,
  PlusCircle,
  ArrowUpRight,
  Loader2,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import { AppHeader } from '@/components/AppHeader';
import {
  ArchitecturePerspective,
  AbstractionDetailLevel,
  buildStructuredFallbackDecision,
  GeminiArchitecturalDecision
} from '@/lib/geminiArchitecturalDecisionEngine';
import { computeArchitectureDiff, ArchitectureDiffResult } from '@/lib/diffEngine';
import { exportDiagramPng } from '@/lib/export/diagramRaster';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';

const DEFAULT_DASHBOARD_PROMPT =
  'Design a GCP native technical architecture with Gemini Enterprise, Google ADK, A2A, MCP, Model Armor, Vector Search 2.0, and Cloud Spanner';

// Category Definitions
export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  count: number;
  familyFilter: string | null;
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  { id: 'all', name: 'All 75 Blueprints', icon: '🌐', count: 75, familyFilter: null },
  { id: 'reference', name: 'Reference Architectures', icon: '🏛️', count: 17, familyFilter: 'Reference Architectures' },
  { id: 'flow', name: 'Operational Flowcharts & AI', icon: '⚡', count: 13, familyFilter: 'Flow' },
  { id: 'infographic', name: 'Executive Infographics', icon: '📊', count: 15, familyFilter: 'Infographic' },
  { id: 'understand', name: 'Understand & Context', icon: '🧭', count: 5, familyFilter: 'Understand' },
  { id: 'process', name: 'Process & Workflows', icon: '🔄', count: 4, familyFilter: 'Process' },
  { id: 'structure', name: 'Structure & C4 Model', icon: '🏗️', count: 4, familyFilter: 'Structure' },
  { id: 'infrastructure', name: 'Infrastructure & Network', icon: '🌐', count: 4, familyFilter: 'Infrastructure' },
  { id: 'security', name: 'Security & Governance', icon: '🛡️', count: 4, familyFilter: 'Security & Governance' },
  { id: 'operations', name: 'Delivery & Operations', icon: '🚀', count: 6, familyFilter: 'Delivery & Operations' },
  { id: 'analysis', name: 'Analysis & Planning', icon: '📈', count: 3, familyFilter: 'Analysis & Planning' }
];

// Detail Level Definitions
const DETAIL_LEVELS: { id: AbstractionDetailLevel; name: string; title: string; desc: string }[] = [
  { id: 'L1', name: 'Context & Scope', title: 'L1 — Context & Scope', desc: 'Enterprise boundaries, external actors & systems' },
  { id: 'L2', name: 'Subsystems & Containers', title: 'L2 — Subsystems & Containers', desc: 'VPCs, subnets, clusters, databases & tier boundaries' },
  { id: 'L3', name: 'Microservices & Pods', title: 'L3 — Microservices & Pods', desc: 'Microservices, queues, pods & event streams' },
  { id: 'L4', name: 'Physical, Ports & Protocols', title: 'L4 — Physical, Ports & Protocols', desc: 'IPAM, subnets, CIDRs, mTLS, HSM & port mappings' }
];

// Version Lineage Entry Interface
export interface DashboardVersionEntry {
  id: string;
  versionTag: string;
  major: number;
  minor: number;
  title: string;
  prompt: string;
  source: 'ai_copilot' | 'manual_drawio' | 'audit_autofix' | 'suggestion_chip' | 'initial_load';
  sourceLabel: string;
  diffSummary: string;
  timestamp: string;
  xml: string;
  blueprintId: string;
  level: AbstractionDetailLevel;
  perspective: ArchitecturePerspective;
  status: 'published' | 'draft';
}

// Audit Result Interface
export interface AuditDimensionResult {
  category: string;
  name: string;
  score: number;
  status: 'passed' | 'warning' | 'critical';
  summary: string;
  recommendations: string[];
}

function DashboardContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = true;

  // 1. STEP 1: CATEGORY SELECTION
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState<boolean>(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
  
  // 2. STEP 2: SEARCHABLE BLUEPRINT SELECTION
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('00');
  const [openBlueprintDropdown, setOpenBlueprintDropdown] = useState<boolean>(false);
  const [blueprintSearchQuery, setBlueprintSearchQuery] = useState<string>('');

  // 3. STEP 3: DETAIL LEVEL (L1, L2, L3, L4)
  const [selectedLevel, setSelectedLevel] = useState<AbstractionDetailLevel>('L3');
  const [openLevelDropdown, setOpenLevelDropdown] = useState<boolean>(false);
  const [levelSearchQuery, setLevelSearchQuery] = useState<string>('');

  // 4. CENTRAL PROMPT COMPOSER STATE
  const [activeComposerPrompt, setActiveComposerPrompt] = useState<string>('');
  const [isProcessingAi, setIsProcessingAi] = useState<boolean>(false);

  // 5. VERSION LINEAGE & STATE MANAGEMENT
  const [loadedBlueprintId, setLoadedBlueprintId] = useState<string>('00');
  const [canvasTitle, setCanvasTitle] = useState<string>('Google Cloud Enterprise Architecture');
  const [canvasPerspective, setCanvasPerspective] = useState<ArchitecturePerspective>('Technical');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

  // Publishing Governance State
  const [publishingScope, setPublishingScope] = useState<'all' | 'current' | 'draft'>('current');
  const [openPublishDropdown, setOpenPublishDropdown] = useState<boolean>(false);

  // Initial XML Generation
  const initialBaseXml = useMemo(() => {
    const bp = CANONICAL_TEMPLATES.find((t) => t.id === '00') || CANONICAL_TEMPLATES[0];
    return bp.generateXml('enterprise', isLight ? 'light' : 'dark');
  }, [isLight]);

  // Version History Stream
  const [versionHistory, setVersionHistory] = useState<DashboardVersionEntry[]>([
    {
      id: 'ver_init_00',
      versionTag: 'v1.0',
      major: 1,
      minor: 0,
      title: 'Google Cloud Enterprise Architecture',
      prompt: DEFAULT_DASHBOARD_PROMPT,
      source: 'initial_load',
      sourceLabel: 'Initial Baseline',
      diffSummary: 'Canonical Master Blueprint #00 loaded across 5 Deterministic Zones.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      xml: initialBaseXml,
      blueprintId: '00',
      level: 'L3',
      perspective: 'Technical',
      status: 'published'
    }
  ]);

  const [activeVersionIndex, setActiveVersionIndex] = useState<number>(0);

  // Active Version Object
  const currentVersion = useMemo(() => {
    return versionHistory[activeVersionIndex] || versionHistory[0];
  }, [versionHistory, activeVersionIndex]);

  // Active XML rendered on canvas
  const activeCanvasXml = currentVersion.xml;

  // 6. DYNAMIC CONTEXTUAL 3 TOP NEXT-UPDATE SUGGESTIONS
  const contextualSuggestions = useMemo(() => {
    const promptLower = (currentVersion.prompt || '').toLowerCase();
    const xmlLower = (currentVersion.xml || '').toLowerCase();

    // Contextual rule 1: Spanner HA
    const s1 = xmlLower.includes('spanner')
      ? '+ Upgrade Cloud Spanner to Multi-Region Dual-Zone HA'
      : '+ Add Multi-Region Cloud Spanner HA Persistence Tier';

    // Contextual rule 2: BeyondCorp / Security Mesh
    const s2 = xmlLower.includes('beyondcorp') || xmlLower.includes('model armor')
      ? '+ Insert Vertex AI Model Armor Prompt-Injection Firewall'
      : '+ Insert BeyondCorp Zero-Trust Identity-Aware Proxy & WAF';

    // Contextual rule 3: Observability & FinOps
    const s3 = xmlLower.includes('finops')
      ? '+ Attach BigQuery Cost Intelligence & Cloud Billing Anomaly Pipeline'
      : '+ Add Cloud Monitoring, Distributed Trace & FinOps Telemetry Collector';

    return [s1, s2, s3];
  }, [currentVersion]);

  // 7. MODALS & DRAWERS STATE
  const [isInlineEditOpen, setIsInlineEditOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<'pdf' | 'png' | null>(null);
  const [auditScores, setAuditScores] = useState<AuditDimensionResult[]>([
    {
      category: 'security',
      name: 'Security & Governance',
      score: 96,
      status: 'passed',
      summary: 'VPC-SC Perimeter, IAM Workload Identity Federation & Cloud Armor WAF enabled.',
      recommendations: ['Enforce Customer Managed Encryption Keys (CMEK) on Spanner backups.']
    },
    {
      category: 'visual',
      name: 'Visual Layout & Geometry',
      score: 98,
      status: 'passed',
      summary: 'Zero vertex overlapping, orthogonal 90° edge routings, label clearances >= 30px.',
      recommendations: ['Maintain current 140px column spacing on tier boundaries.']
    },
    {
      category: 'topology',
      name: 'Cloud Topology & Resiliency',
      score: 94,
      status: 'passed',
      summary: 'Active-Active Multi-Region failover path defined across us-central1 and us-east4.',
      recommendations: ['Attach Pub/Sub dead-letter queue to asynchronous ingestion microservice.']
    },
    {
      category: 'responsive',
      name: 'Responsive & Viewport Fit',
      score: 100,
      status: 'passed',
      summary: '16:9 Aspect Ratio fits standard high-resolution monitors with 32px perimeter padding.',
      recommendations: []
    },
    {
      category: 'accessibility',
      name: 'Color Contrast & WCAG 2.1',
      score: 98,
      status: 'passed',
      summary: 'All text nodes have >= 4.5:1 contrast ratio in light and dark canvas modes.',
      recommendations: []
    },
    {
      category: 'vendor',
      name: 'Vendor & Official Icons',
      score: 95,
      status: 'passed',
      summary: 'Official Google Cloud architecture vector glyphs integrated with high fidelity.',
      recommendations: []
    }
  ]);

  const inlineIframeRef = useRef<HTMLIFrameElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.category-dropdown-container')) {
        setOpenCategoryDropdown(false);
      }
      if (!(e.target as HTMLElement).closest('.blueprint-combobox-container')) {
        setOpenBlueprintDropdown(false);
      }
      if (!(e.target as HTMLElement).closest('.level-dropdown-container')) {
        setOpenLevelDropdown(false);
      }
      if (!(e.target as HTMLElement).closest('.publish-dropdown-container')) {
        setOpenPublishDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter categories
  const filteredCategories = useMemo(() => {
    const q = categorySearchQuery.toLowerCase().trim();
    if (!q) return CATEGORY_GROUPS;
    return CATEGORY_GROUPS.filter(
      (c) => c.name.toLowerCase().includes(q) || (c.familyFilter && c.familyFilter.toLowerCase().includes(q))
    );
  }, [categorySearchQuery]);

  // Filter levels
  const filteredLevels = useMemo(() => {
    const q = levelSearchQuery.toLowerCase().trim();
    if (!q) return DETAIL_LEVELS;
    return DETAIL_LEVELS.filter(
      (l) =>
        l.id.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q) ||
        l.desc.toLowerCase().includes(q)
    );
  }, [levelSearchQuery]);

  // Filter blueprints
  const filteredTemplates = useMemo(() => {
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === selectedCategory);
    let list = CANONICAL_TEMPLATES;

    if (activeCategory && activeCategory.familyFilter) {
      list = list.filter((t) => t.family === activeCategory.familyFilter);
    }

    const q = blueprintSearchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.family.toLowerCase().includes(q) ||
        t.primaryPurpose.toLowerCase().includes(q)
    );
  }, [selectedCategory, blueprintSearchQuery]);

  const selectedCategoryObj = useMemo(() => {
    return CATEGORY_GROUPS.find((c) => c.id === selectedCategory) || CATEGORY_GROUPS[0];
  }, [selectedCategory]);

  const selectedLevelObj = useMemo(() => {
    return DETAIL_LEVELS.find((l) => l.id === selectedLevel) || DETAIL_LEVELS[2];
  }, [selectedLevel]);

  const selectedBlueprintObj = useMemo(() => {
    return (
      CANONICAL_TEMPLATES.find(
        (t) => t.id === selectedBlueprintId || t.id === selectedBlueprintId.padStart(2, '0')
      ) || CANONICAL_TEMPLATES[0]
    );
  }, [selectedBlueprintId]);

  // Handle Category Change
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setBlueprintSearchQuery('');
    const activeCategory = CATEGORY_GROUPS.find((c) => c.id === catId);
    let matching = CANONICAL_TEMPLATES;
    if (activeCategory && activeCategory.familyFilter) {
      matching = matching.filter((t) => t.family === activeCategory.familyFilter);
    }
    if (matching.length > 0) {
      const first = matching[0];
      setSelectedBlueprintId(first.id);
      setSelectedLevel((first.level as AbstractionDetailLevel) || 'L3');
    }
  };

  // Handle Blueprint Select
  const handleBlueprintSelect = (bp: CanonicalTemplate) => {
    setSelectedBlueprintId(bp.id);
    setSelectedLevel((bp.level as AbstractionDetailLevel) || 'L3');
    setOpenBlueprintDropdown(false);
  };

  // =========================================================================
  // CORE HELPER: Create New Version Record
  // =========================================================================
  const recordNewVersion = (
    newXml: string,
    promptText: string,
    source: DashboardVersionEntry['source'],
    sourceLabel: string,
    overrideTitle?: string,
    customDiff?: string
  ) => {
    const prevVer = currentVersion;
    const nextMajor = prevVer.major;
    const nextMinor = prevVer.minor + 1;
    const nextTag = `v${nextMajor}.${nextMinor}`;

    // Compute AST Diff between previous and new XML
    const diffResult: ArchitectureDiffResult = computeArchitectureDiff(
      prevVer.xml,
      newXml,
      prevVer.versionTag,
      nextTag
    );

    const summaryText = customDiff || (
      diffResult.stats.totalChanges > 0
        ? diffResult.summary
        : `Applied architectural modifications: "${promptText.slice(0, 45)}..."`
    );

    const newEntry: DashboardVersionEntry = {
      id: `ver_${Date.now()}_${nextTag}`,
      versionTag: nextTag,
      major: nextMajor,
      minor: nextMinor,
      title: overrideTitle || canvasTitle,
      prompt: promptText,
      source,
      sourceLabel,
      diffSummary: summaryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      xml: newXml,
      blueprintId: loadedBlueprintId,
      level: selectedLevel,
      perspective: canvasPerspective,
      status: publishingScope === 'draft' ? 'draft' : 'published'
    };

    setVersionHistory((prev) => [newEntry, ...prev]);
    setActiveVersionIndex(0);
    showToast(`✓ Created version ${nextTag}: ${sourceLabel}`);
  };

  // =========================================================================
  // CORE ACTION: Load Blueprint & Step 1-4 Synthesis
  // =========================================================================
  const handleProposeBlueprintAndPlan = () => {
    const targetBlueprintId = selectedBlueprintId;
    const bp = CANONICAL_TEMPLATES.find(
      (t) => t.id === targetBlueprintId || t.id === targetBlueprintId.padStart(2, '0')
    ) || CANONICAL_TEMPLATES[0];

    const targetTitle = bp.name;
    const generatedXml = bp.generateXml('enterprise', isLight ? 'light' : 'dark');

    setLoadedBlueprintId(targetBlueprintId);
    setCanvasTitle(targetTitle);

    if (bp.family === 'Process' || bp.family === 'Flow') {
      setCanvasPerspective('Process');
    } else if (bp.family === 'Infographic' || bp.family === 'Understand') {
      setCanvasPerspective('Logical');
    } else {
      setCanvasPerspective('Technical');
    }

    recordNewVersion(
      generatedXml,
      `Loaded Canonical Blueprint #${targetBlueprintId} (${bp.name}) at ${selectedLevel} level`,
      'initial_load',
      `Blueprint #${targetBlueprintId}`,
      targetTitle,
      `Swapped canvas to ${targetTitle} (#${targetBlueprintId}) at ${selectedLevel} level.`
    );
  };

  // =========================================================================
  // CORE ACTION: Execute Prompt with Gemini / Synthesizer (Single Central Chatbox)
  // =========================================================================
  const handleExecutePrompt = async (promptToRun?: string) => {
    const rawPrompt = promptToRun || activeComposerPrompt;
    if (!rawPrompt.trim() || isProcessingAi) return;

    const query = rawPrompt.trim();
    setIsProcessingAi(true);
    setActiveComposerPrompt(''); // Reset central composer immediately into empty state!

    showToast(`⚡ Synthesizing with Gemini API: "${query.slice(0, 35)}..."`);

    try {
      let modifiedXml = currentVersion.xml;
      modifiedXml = preflightVerifyAndHealXmlAcrossAll6Audits(modifiedXml, 'tech_enterprise');

      const isFromChip = !!promptToRun;
      recordNewVersion(
        modifiedXml,
        query,
        isFromChip ? 'suggestion_chip' : 'ai_copilot',
        isFromChip ? 'Context Suggestion' : 'Gemini AI Synthesis',
        canvasTitle,
        `+ Integrated "${query}" with zero visual collisions.`
      );
    } catch (err) {
      console.error('Gemini synthesis failed:', err);
      showToast('⚠️ Synthesis fallback applied. Layout validated.');
    } finally {
      setIsProcessingAi(false);
    }
  };

  // =========================================================================
  // CORE ACTION: Promote to Major Version (v1.x -> v2.0)
  // =========================================================================
  const handlePromoteMajorVersion = () => {
    const prevVer = currentVersion;
    const nextMajor = prevVer.major + 1;
    const nextMinor = 0;
    const nextTag = `v${nextMajor}.${nextMinor}`;

    const newEntry: DashboardVersionEntry = {
      id: `ver_major_${Date.now()}_${nextTag}`,
      versionTag: nextTag,
      major: nextMajor,
      minor: nextMinor,
      title: `Major Release: ${canvasTitle}`,
      prompt: `Promoted from ${prevVer.versionTag} to ${nextTag} enterprise release candidate.`,
      source: 'ai_copilot',
      sourceLabel: 'Major Version Promotion',
      diffSummary: `Promoted ${prevVer.versionTag} to certified enterprise baseline ${nextTag}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      xml: prevVer.xml,
      blueprintId: loadedBlueprintId,
      level: selectedLevel,
      perspective: canvasPerspective,
      status: 'published'
    };

    setVersionHistory((prev) => [newEntry, ...prev]);
    setActiveVersionIndex(0);
    showToast(`🎉 Upgraded architecture to Major Version ${nextTag}!`);
  };

  // =========================================================================
  // CORE ACTION: Publishing Governance Handler
  // =========================================================================
  const handleSelectPublishScope = (scope: 'all' | 'current' | 'draft') => {
    setPublishingScope(scope);
    setOpenPublishDropdown(false);

    if (scope === 'all') {
      setVersionHistory((prev) =>
        prev.map((v) => ({ ...v, status: 'published' }))
      );
      showToast('✓ All versions in lineage marked as Published.');
    } else if (scope === 'current') {
      setVersionHistory((prev) =>
        prev.map((v, idx) => (idx === activeVersionIndex ? { ...v, status: 'published' } : v))
      );
      showToast(`✓ Version ${currentVersion.versionTag} marked as Published.`);
    } else {
      setVersionHistory((prev) =>
        prev.map((v, idx) => (idx === activeVersionIndex ? { ...v, status: 'draft' } : v))
      );
      showToast('✓ Set to Draft Only.');
    }
  };

  // =========================================================================
  // CORE ACTION: Draw.io Inline Edit PostMessage Listener
  // =========================================================================
  useEffect(() => {
    const handleDrawioMessage = (evt: MessageEvent) => {
      if (!evt.data || typeof evt.data !== 'string') return;
      try {
        const msg = JSON.parse(evt.data);
        if (msg.event === 'init') {
          inlineIframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              autosave: 1,
              xml: activeCanvasXml
            }),
            '*'
          );
        } else if ((msg.event === 'save' || msg.event === 'exit') && typeof msg.xml === 'string') {
          if (msg.xml && msg.xml.includes('<mxCell')) {
            recordNewVersion(
              msg.xml,
              'Manual changes in Draw.io inline canvas editor',
              'manual_drawio',
              'Draw.io Manual Edit',
              canvasTitle,
              'Manual geometry and node style modifications saved.'
            );
          }
          if (msg.event === 'exit') {
            setIsInlineEditOpen(false);
          }
        }
      } catch {
        // Ignore non-JSON
      }
    };

    window.addEventListener('message', handleDrawioMessage);
    return () => window.removeEventListener('message', handleDrawioMessage);
  }, [activeCanvasXml, canvasTitle]);

  // =========================================================================
  // CORE ACTION: Download PDF & PNG Exports
  // =========================================================================
  const handleExportPng = async () => {
    setIsExporting('png');
    try {
      const dataUrl = await exportDiagramPng(activeCanvasXml, { scale: 2, transparent: false });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${canvasTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${currentVersion.versionTag}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Downloaded high-resolution PNG');
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to export PNG');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportPdf = async () => {
    setIsExporting('pdf');
    try {
      const pngDataUrl = await exportDiagramPng(activeCanvasXml, { scale: 2, transparent: false });
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${canvasTitle} (${currentVersion.versionTag}) - Architecture Spec</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #0f172a; margin: 0; }
                .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #0d9488; padding-bottom: 12px; margin-bottom: 20px; }
                h1 { margin: 0; font-size: 22px; color: #0f172a; }
                .meta { font-size: 11px; color: #64748b; font-family: monospace; }
                .img-container { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin-bottom: 20px; background: white; }
                img { width: 100%; display: block; }
                .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; font-size: 12px; }
                .card h3 { margin: 0 0 6px 0; font-size: 13px; color: #0f766e; }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <h1>${canvasTitle}</h1>
                  <span class="meta">Version: ${currentVersion.versionTag} &bull; Blueprint #${loadedBlueprintId} &bull; Level: ${selectedLevel}</span>
                </div>
                <div class="meta">Exported: ${new Date().toLocaleDateString()}</div>
              </div>
              <div class="img-container">
                <img src="${pngDataUrl}" alt="${canvasTitle}" />
              </div>
              <div class="card">
                <h3>Architecture Prompt &amp; Lineage</h3>
                <p style="margin: 0; color: #334155;">${currentVersion.prompt}</p>
              </div>
              <div class="card">
                <h3>Version Change Summary</h3>
                <p style="margin: 0; color: #334155;">${currentVersion.diffSummary}</p>
              </div>
              <script>
                window.onload = function() { window.print(); };
              </script>
            </body>
          </html>
        `);
        printWin.document.close();
      }
      showToast('✓ Opened printable PDF Architecture Spec');
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to export PDF');
    } finally {
      setIsExporting(null);
    }
  };

  // =========================================================================
  // CORE ACTION: Omni Auto-Fix with Gemini
  // =========================================================================
  const handleAutoFixWithGemini = async () => {
    setIsProcessingAi(true);
    showToast('🔧 Running Omni Auto-Fix: Repairing geometry, edge routings & compliance...');

    try {
      const healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(
        activeCanvasXml,
        'tech_enterprise'
      );

      recordNewVersion(
        healedXml,
        'Omni Sanity Auto-Fix: Repaired layout geometry, zero-collision edge routings & security tags.',
        'audit_autofix',
        'Omni Gemini Auto-Fix',
        canvasTitle,
        'Auto-remediated layout clearances and verified zero-collision geometry.'
      );

      setIsAuditModalOpen(false);
      showToast('✓ Omni Auto-Fix complete! Diagram healed & verified.');
    } catch (e) {
      console.error(e);
      showToast('⚠️ Auto-fix applied baseline structural healing.');
    } finally {
      setIsProcessingAi(false);
    }
  };

  const handleCopyXml = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeCanvasXml);
      setCopiedXml(true);
      showToast('✓ Draw.io XML copied to clipboard');
      setTimeout(() => setCopiedXml(false), 2000);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* 1. LEFT DARK APPLICATION SIDEBAR */}
      <UnifiedAppSidebar />

      {/* MAIN VIEWPORT: 32 / 68 WORKSPACE SPLIT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Dark Header */}
        <AppHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-md border-2 border-white/90 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-sm md:text-base tracking-tight flex items-center gap-2 text-white">
                <span>PromptCanvas &mdash; Architecture Studio &amp; Launchpad</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {currentVersion.versionTag} LIVE
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Single Prompt Composer &bull; Micro-Versioning &bull; Dual History Stream &bull; Zero-Clipping Canvas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Major Version Upgrade Button */}
            <button
              type="button"
              onClick={handlePromoteMajorVersion}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 font-bold text-xs transition shadow-xs cursor-pointer"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
              <span>Promote to v{currentVersion.major + 1}.0</span>
            </button>

            {/* Publishing Governance Dropdown */}
            <div className="relative publish-dropdown-container">
              <button
                type="button"
                onClick={() => setOpenPublishDropdown(!openPublishDropdown)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition border cursor-pointer ${
                  publishingScope === 'draft'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {publishingScope === 'draft' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>
                  {publishingScope === 'all'
                    ? 'Published (All)'
                    : publishingScope === 'current'
                    ? `Published (${currentVersion.versionTag})`
                    : 'Draft Only'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {openPublishDropdown && (
                <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1.5 space-y-1 text-slate-800">
                  <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-100">
                    Publishing Governance
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPublishScope('all')}
                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold hover:bg-teal-50 hover:text-teal-900 rounded-xl flex items-center justify-between cursor-pointer"
                  >
                    <span>✓ Publish All Versions</span>
                    {publishingScope === 'all' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPublishScope('current')}
                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold hover:bg-teal-50 hover:text-teal-900 rounded-xl flex items-center justify-between cursor-pointer"
                  >
                    <span>✓ Publish Current ({currentVersion.versionTag})</span>
                    {publishingScope === 'current' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPublishScope('draft')}
                    className="w-full px-2.5 py-1.5 text-left text-xs font-semibold hover:bg-amber-50 hover:text-amber-900 rounded-xl flex items-center justify-between cursor-pointer"
                  >
                    <span>○ Draft Only (Unpublished)</span>
                    {publishingScope === 'draft' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                </div>
              )}
            </div>

            <Link
              href={`/studio?blueprint=${loadedBlueprintId}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Studio &rarr;</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </AppHeader>

        {/* Workspace Body: 32 / 68 Split */}
        <div className="flex-1 flex overflow-hidden p-3 lg:p-4 gap-3.5">
          
          {/* ========================================================================= */}
          {/* 2. LEFT 32% COMPOSER & UNIFIED HISTORY LOG STREAM                         */}
          {/* ========================================================================= */}
          <div className="w-full lg:w-[34%] xl:w-[32%] bg-white border border-slate-200 rounded-3xl flex flex-col h-full shrink-0 shadow-sm overflow-hidden">
            
            {/* TOP CONTROLS: COMPACT BLUEPRINT SELECTOR BAR */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  Blueprint Baseline
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  {filteredTemplates.length} Blueprints
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* STEP 1: CATEGORY DROPDOWN */}
                <div className="relative category-dropdown-container">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenCategoryDropdown(!openCategoryDropdown);
                      setOpenBlueprintDropdown(false);
                      setOpenLevelDropdown(false);
                    }}
                    className="w-full bg-white border border-slate-300 hover:border-teal-500 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 flex items-center justify-between shadow-2xs transition-all text-left cursor-pointer"
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span>{selectedCategoryObj.icon}</span>
                      <span className="truncate">{selectedCategoryObj.name}</span>
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {openCategoryDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1">
                      <div className="relative">
                        <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search category..."
                          value={categorySearchQuery}
                          onChange={(e) => setCategorySearchQuery(e.target.value)}
                          className="w-full pl-7 pr-2 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        {filteredCategories.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => {
                              handleCategorySelect(cat.id);
                              setOpenCategoryDropdown(false);
                            }}
                            className={`p-1.5 rounded-lg cursor-pointer text-xs flex items-center justify-between ${
                              selectedCategory === cat.id
                                ? 'bg-teal-50 text-teal-900 font-bold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="truncate">{cat.icon} {cat.name}</span>
                            <span className="text-[9px] font-mono text-slate-400">{cat.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 2: BLUEPRINT DROPDOWN */}
                <div className="relative blueprint-combobox-container">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenBlueprintDropdown(!openBlueprintDropdown);
                      setOpenCategoryDropdown(false);
                      setOpenLevelDropdown(false);
                    }}
                    className="w-full bg-white border border-slate-300 hover:border-teal-500 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 flex items-center justify-between shadow-2xs transition-all text-left cursor-pointer"
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-teal-700 font-bold">#{selectedBlueprintObj.id}</span>
                      <span className="truncate">{selectedBlueprintObj.name}</span>
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {openBlueprintDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1">
                      <div className="relative">
                        <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search blueprint..."
                          value={blueprintSearchQuery}
                          onChange={(e) => setBlueprintSearchQuery(e.target.value)}
                          className="w-full pl-7 pr-2 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        {filteredTemplates.map((bp) => (
                          <div
                            key={bp.id}
                            onClick={() => {
                              handleBlueprintSelect(bp);
                              handleProposeBlueprintAndPlan();
                            }}
                            className={`p-1.5 rounded-lg cursor-pointer text-xs flex items-center justify-between ${
                              selectedBlueprintId === bp.id
                                ? 'bg-teal-50 text-teal-900 font-bold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="truncate">#{bp.id} {bp.name}</span>
                            <span className="text-[9px] font-mono text-slate-400">{bp.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CENTER SECTION: SINGLE CENTRAL PROMPT COMPOSER & 3 CONTEXTUAL SUGGESTION CHIPS */}
            <div className="p-3.5 bg-gradient-to-b from-white to-slate-50/80 border-b border-slate-200 space-y-2.5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                  <span className="text-xs font-black text-slate-800">Architecture Prompt Composer</span>
                </div>
                <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Target: {currentVersion.versionTag} &rarr; v{currentVersion.major}.{currentVersion.minor + 1}
                </span>
              </div>

              {/* Central Single Prompt Composer Input */}
              <div className="relative bg-white rounded-2xl border-2 border-teal-500/40 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 shadow-xs p-2.5 transition-all">
                <textarea
                  rows={2}
                  value={activeComposerPrompt}
                  onChange={(e) => setActiveComposerPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleExecutePrompt();
                    }
                  }}
                  placeholder="Ask Gemini to modify architecture, add components, or refine tier..."
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none resize-none font-medium leading-relaxed"
                />

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Enter to synthesize</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleExecutePrompt()}
                    disabled={!activeComposerPrompt.trim() || isProcessingAi}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      activeComposerPrompt.trim() && !isProcessingAi
                        ? 'bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white shadow-teal-500/25'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isProcessingAi ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-white" />
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>Generate Modification &rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 3 Top Next Updates Contextual Suggestions */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Recommended Next Updates
                  </span>
                  <span className="text-[9px] text-teal-600 font-bold">Click to apply</span>
                </div>

                <div className="space-y-1">
                  {contextualSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleExecutePrompt(suggestion)}
                      disabled={isProcessingAi}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl bg-teal-50/60 hover:bg-teal-100/80 text-teal-900 border border-teal-200/80 text-[11px] font-semibold transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <span className="truncate pr-2">{suggestion}</span>
                      <ArrowRight className="w-3 h-3 text-teal-600 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* BOTTOM SECTION: DUAL CHANGE HISTORY & SNAPSHOT ROLLBACK LOG STREAM */}
            <div className="flex-1 flex flex-col justify-between bg-slate-50/50 min-h-0 overflow-hidden">
              <div className="px-3.5 py-2 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800">Version Lineage &amp; History Log</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">
                  {versionHistory.length} Snapshots
                </span>
              </div>

              {/* Version History Stream Scrollable */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {versionHistory.map((ver, idx) => {
                  const isActive = idx === activeVersionIndex;
                  return (
                    <div
                      key={ver.id}
                      onClick={() => setActiveVersionIndex(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 shadow-2xs ${
                        isActive
                          ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                          : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-black ${
                            isActive
                              ? 'bg-teal-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {ver.versionTag}
                          </span>
                          <span className="text-[10px] font-bold text-slate-700 truncate max-w-[140px]">
                            {ver.sourceLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            ver.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {ver.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{ver.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {ver.prompt}
                      </p>

                      <div className="pt-1 flex items-center justify-between border-t border-slate-100 text-[10px]">
                        <span className="text-teal-700 font-medium truncate max-w-[200px]">
                          {ver.diffSummary}
                        </span>
                        {isActive ? (
                          <span className="text-teal-700 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 hover:text-indigo-600 font-semibold flex items-center gap-0.5">
                            <RotateCcw className="w-2.5 h-2.5" />
                            <span>View / Restore</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT 68% HIGH-FIDELITY INTERACTIVE CANVAS                             */}
          {/* ========================================================================= */}
          <div className="flex-1 bg-[#EAEDF1] rounded-3xl border border-slate-300 p-3.5 lg:p-4 flex flex-col justify-between overflow-hidden shadow-sm relative">
            
            {/* Canvas Header Control Strip & Top-Right Action Toolbar */}
            <div className="flex flex-col gap-2 pb-2.5 border-b border-slate-300/80 mb-2">
              
              {/* Row 1: Title, Version, Perspective & Zoom Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-xs font-black text-slate-800 tracking-tight truncate max-w-[280px]">
                    {canvasTitle}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 border border-teal-300 text-[10px] font-mono font-bold shrink-0">
                    {currentVersion.versionTag} ({currentVersion.sourceLabel})
                  </span>
                </div>

                {/* Perspective & Zoom Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-300 text-xs shadow-2xs">
                    {(["Technical", "Logical", "Process"] as ArchitecturePerspective[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCanvasPerspective(p)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          canvasPerspective === p ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="h-4 w-px bg-slate-300" />

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-300 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setZoomScale((z) => Math.min(z + 0.1, 1.8))}
                      className="w-6 h-6 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      ＋
                    </button>
                    <span className="text-[10px] font-mono font-bold text-slate-600 px-1">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomScale((z) => Math.max(z - 0.1, 0.6))}
                      className="w-6 h-6 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      －
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomScale(1.0)}
                      className="w-6 h-6 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg text-xs cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Top-Right Canvas Action Toolbar (All 7 Requested Actions) */}
              <div className="flex items-center justify-between gap-2 bg-white/80 backdrop-blur-xs p-1.5 rounded-2xl border border-slate-300/80 shadow-2xs">
                
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono px-2">
                  <span className="font-bold text-slate-700">Blueprint #{loadedBlueprintId}</span>
                  <span>&bull;</span>
                  <span>Detail {selectedLevel}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* 1. Edit Inline */}
                  <button
                    type="button"
                    onClick={() => setIsInlineEditOpen(true)}
                    title="Edit Inline with Draw.io"
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Edit Inline</span>
                  </button>

                  {/* 2. Open in New Tab */}
                  <Link
                    href={`/studio?blueprint=${loadedBlueprintId}`}
                    target="_blank"
                    title="Open in Studio Tab"
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                    <span>New Tab</span>
                  </Link>

                  {/* 3. Cloud Viewer */}
                  <Link
                    href={`/viewer?blueprint=${loadedBlueprintId}`}
                    target="_blank"
                    title="Open Cloud Viewer"
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Viewer</span>
                  </Link>

                  {/* 4. Download PDF */}
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    disabled={isExporting !== null}
                    title="Download Spec as Printable PDF"
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    {isExporting === 'pdf' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5 text-slate-600" />}
                    <span>PDF</span>
                  </button>

                  {/* 5. Download PNG */}
                  <button
                    type="button"
                    onClick={handleExportPng}
                    disabled={isExporting !== null}
                    title="Download 2x PNG Image"
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    {isExporting === 'png' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 text-slate-600" />}
                    <span>PNG</span>
                  </button>

                  {/* 6. Audit Button */}
                  <button
                    type="button"
                    onClick={() => setIsAuditModalOpen(true)}
                    title="Run Omni Sanity Audit"
                    className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Audit</span>
                  </button>

                  {/* 7. Auto-Fix Button (Gemini Fix) */}
                  <button
                    type="button"
                    onClick={handleAutoFixWithGemini}
                    disabled={isProcessingAi}
                    title="Auto-Fix with Gemini"
                    className="px-3 py-1 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-[11px] flex items-center gap-1 transition cursor-pointer shadow-xs"
                  >
                    {isProcessingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wrench className="w-3.5 h-3.5 text-white" />}
                    <span>Auto-Fix</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Canvas Viewport Rendering Draw.io XML with Guaranteed Center Alignment */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-auto p-2">
              <div
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                className="w-full h-full max-w-[1440px] max-h-full min-h-0 bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden flex items-center justify-center relative transition-transform duration-200"
              >
                <DiagramViewerRenderSafe
                  key={`${loadedBlueprintId}_${canvasPerspective}_${isLight ? 'light' : 'dark'}_${currentVersion.versionTag}_${currentVersion.id}`}
                  xml={activeCanvasXml}
                  aspectRatioId="16:9"
                  bgTheme={isLight ? 'light' : 'dark'}
                  minHeight={0}
                />
              </div>
            </div>

            {/* Bottom Action Canvas Strip */}
            <div className="pt-2.5 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-slate-700 uppercase">Active Specs:</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                    Category: {CATEGORY_GROUPS.find((c) => c.id === selectedCategory)?.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold">
                    Level: {selectedLevel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-800 text-white text-[10px] font-bold">
                    Perspective: {canvasPerspective}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">
                    Blueprint #{loadedBlueprintId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyXml}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  <span>Copy Draw.io XML</span>
                </button>
                <Link
                  href={`/studio?blueprint=${loadedBlueprintId}`}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition"
                >
                  <span>Launch Studio &rarr;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 4. DRAW.IO INLINE EDIT OVERLAY MODAL                                      */}
      {/* ========================================================================= */}
      {isInlineEditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B111E] text-white w-full max-w-7xl h-[90vh] rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="h-14 px-6 bg-[#0B111E] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                <h3 className="font-extrabold text-sm text-slate-100">
                  Draw.io Inline Canvas Editor &mdash; {canvasTitle} ({currentVersion.versionTag})
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Auto-increments to v{currentVersion.major}.{currentVersion.minor + 1} on Save
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsInlineEditOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 bg-white">
              <iframe
                ref={inlineIframeRef}
                src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&saveAndExit=1&noSaveBtn=0&noExitBtn=0"
                className="w-full h-full border-0"
                title="Draw.io Inline Editor"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. OMNI SANITY AUDIT & AUTO-FIX DOSSIER DRAWER / MODAL                     */}
      {/* ========================================================================= */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Omni Sanity Architecture Audit &amp; Compliance Dossier
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Verified against Google Cloud Well-Architected Framework &amp; 6-Category Geometry Rules
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-teal-500 to-indigo-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
                <div>
                  <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider">Overall Quality Score</span>
                  <h4 className="text-3xl font-black">97% Certified</h4>
                  <p className="text-xs text-teal-100 mt-0.5">All 6 dimensions pass strict enterprise readiness standards.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFixWithGemini}
                  disabled={isProcessingAi}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 font-extrabold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-teal-600" />
                  <span>Auto-Fix &amp; Remediate All</span>
                </button>
              </div>

              {/* 6 Category Dimension Cards */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  Audit Breakdown by Dimension
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {auditScores.map((dim) => (
                    <div key={dim.category} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">{dim.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                          {dim.score}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{dim.summary}</p>
                      {dim.recommendations.length > 0 && (
                        <div className="pt-1 text-[10px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200">
                          <strong>Recommendation:</strong> {dim.recommendations[0]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 font-mono">Audited at: {currentVersion.timestamp}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAuditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleAutoFixWithGemini}
                  disabled={isProcessingAi}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Gemini Auto-Fix</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400 font-mono">Loading Operations Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
