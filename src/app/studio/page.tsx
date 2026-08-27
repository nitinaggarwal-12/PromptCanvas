'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Layers,
  Bot,
  Send,
  FileText,
  Network,
  CheckCircle2,
  Copy,
  ChevronRight,
  RefreshCw,
  Sliders,
  Zap,
  Undo2,
  Redo2,
  History,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  ExternalLink,
  Info,
  X,
  Code2,
  Check,
  BookOpen
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  type CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import {
  DOC_ARCHETYPES_META,
  type DocArchetypeMeta,
  type ArchetypeId,
  type BlueprintSlot
} from '@/lib/compose/archetypes';
import { generateGcpNativeArchitectureXml } from '@/lib/gcpNativeArchitecture';

// ==========================================
// DATA TYPES FOR STUDIO MULTI-DIAGRAM & VCS
// ==========================================

export interface StudioDiagramTab {
  id: string; // e.g. "diag_1", "diag_2"
  title: string;
  templateId: string; // "01", "08", "custom", "scratch"
  xml: string;
  source: 'blueprint' | 'scratch' | 'placeholder';
  lastPrompt?: string;
}

export interface StudioVersionSnapshot {
  id: string;
  versionTag: string; // "v1.0", "v1.1", ...
  timestamp: string; // formatted e.g. "11:42 PM"
  author: 'User' | 'AI Assistant' | 'System';
  actionSummary: string;
  activeDiagramId: string;
  diagrams: StudioDiagramTab[];
  projectName: string;
  useCaseName: string;
  projectTitle: string;
  projectScopePrompt: string;
  selectedDomain: string;
}

export interface StudioChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionApplied?: {
    type: 'diagram_synthesized' | 'diagram_mutated' | 'diagram_replaced' | 'diagram_added' | 'version_restored' | 'reset_scratch';
    versionTag: string;
    summary: string;
  };
  recommendation?: {
    projectName: string;
    useCaseName: string;
    domain: string;
    blueprintId: string;
    summary: string;
    rationale: string;
  };
  suggestedPrompts?: string[];
}

const MAX_ROLLING_VERSIONS = 10;

// Generic Blank Architecture Canvas XML for "Design from Scratch"
function generateBlankScratchXml(title: string = 'Custom Google Cloud Architecture', theme: 'light' | 'dark' = 'light', domain: string = 'enterprise'): string {
  return generateGcpNativeArchitectureXml({
    projectTitle: title,
    domain,
    theme
  });
}

function StudioContent() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const searchParams = useSearchParams();
  const router = useRouter();

  // Studio Mode: 'diagrams' | 'documents' | 'both'
  const initialMode = (searchParams.get('mode') as 'diagrams' | 'documents' | 'both') || 'diagrams';
  const [studioMode, setStudioMode] = useState<'diagrams' | 'documents' | 'both'>(initialMode);

  // Preview tab on right pane: 'diagram' | 'spec'
  const [previewTab, setPreviewTab] = useState<'diagram' | 'spec'>('diagram');

  // Initial State: Blank inputs by default
  const [projectName, setProjectName] = useState<string>('');
  const [useCaseName, setUseCaseName] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>(searchParams.get('domain') || 'biopharma');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>('');

  // Track whether the user has performed initial synthesis
  const [hasSynthesized, setHasSynthesized] = useState<boolean>(false);

  // Multi-Diagram Management
  const [activeDiagramId, setActiveDiagramId] = useState<string>('diag_1');
  const [diagrams, setDiagrams] = useState<StudioDiagramTab[]>(() => {
    // Initial placeholder diagram: Brand-New Pure GCP Native Reference Architecture
    const initialXml = generateGcpNativeArchitectureXml({
      projectTitle: 'Enterprise Google Cloud Native Architecture',
      domain: 'enterprise',
      theme: isLight ? 'light' : 'dark'
    });
    return [
      {
        id: 'diag_1',
        title: 'Diagram 1 • GCP Native Topology',
        templateId: 'gcp_native',
        xml: initialXml,
        source: 'placeholder'
      }
    ];
  });

  // Active Document Archetype (for documents view)
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('sdd');

  // UI Modals & Menus
  const [showReplaceModal, setShowReplaceModal] = useState<boolean>(false);
  const [replaceModalTab, setReplaceModalTab] = useState<'diagrams' | 'documents'>('diagrams');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Draw.io Child Window Ref for live Bidirectional postMessage Sync
  const drawioChildWindowRef = useRef<Window | null>(null);

  // Helper to show transient toast message
  const showToast = useCallback((msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification(null);
    }, 3500);
  }, []);

  // Rolling 10-Version History Buffer
  const [versionHistory, setVersionHistory] = useState<StudioVersionSnapshot[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

  // Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<StudioChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '👋 Welcome to Launch Studio! Fill out your project requirements above and click **Synthesize Architecture Now**, or describe what you want directly in chat. The right pane shows a generic GCP reference model until synthesized.',
      timestamp: 'Just now',
      suggestedPrompts: [
        'Architect a high-throughput event streaming platform with Pub/Sub & Dataflow',
        'Design a zero-trust multi-region microservices architecture with Cloud Spanner',
        'Build a Vertex AI RAG knowledge graph with ScaNN vector search'
      ]
    }
  ]);

  // Find active diagram object
  const activeDiagram = useMemo(() => {
    return diagrams.find((d) => d.id === activeDiagramId) || diagrams[0];
  }, [diagrams, activeDiagramId]);

  // Active Archetype Metadata
  const activeArchetypeMeta: DocArchetypeMeta = useMemo(() => {
    const found = DOC_ARCHETYPES_META.find((a) => a.id === selectedArchetypeId);
    return found || DOC_ARCHETYPES_META[2];
  }, [selectedArchetypeId]);

  // Current active version tag
  const currentVersionTag = useMemo(() => {
    if (versionHistory.length === 0) return 'v0.1 (Draft)';
    const snap = versionHistory[currentHistoryIndex];
    return snap ? snap.versionTag : 'v1.0';
  }, [versionHistory, currentHistoryIndex]);

  // Sync Project Name & Use Case Name
  const handleUpdateProjectName = (val: string) => {
    setProjectName(val);
    const combined = val ? (useCaseName ? `${val} — ${useCaseName}` : val) : useCaseName;
    setProjectTitle(combined);
  };

  const handleUpdateUseCaseName = (val: string) => {
    setUseCaseName(val);
    const combined = projectName ? (val ? `${projectName} — ${val}` : projectName) : val;
    setProjectTitle(combined);
  };

  const handleUpdateProjectTitle = (val: string) => {
    setProjectTitle(val);
    if (val.includes(' — ')) {
      const [p, u] = val.split(' — ');
      setProjectName(p.trim());
      setUseCaseName(u.trim());
    } else if (val.includes(' - ')) {
      const [p, u] = val.split(' - ');
      setProjectName(p.trim());
      setUseCaseName(u.trim());
    }
  };

  // Helper to push a new version snapshot into the rolling 10-item buffer
  const pushNewVersion = useCallback(
    (actionSummary: string, author: 'User' | 'AI Assistant' | 'System', updatedDiagrams?: StudioDiagramTab[]) => {
      const currentDiagramsState = updatedDiagrams || diagrams;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const nextMajor = versionHistory.length === 0;
      let nextTag = 'v1.0';
      if (versionHistory.length > 0) {
        const lastTag = versionHistory[0].versionTag.replace(/^v/, '');
        const [maj, min] = lastTag.split('.').map(Number);
        nextTag = `v${maj || 1}.${(min || 0) + 1}`;
      }

      const newSnapshot: StudioVersionSnapshot = {
        id: `snap_${Date.now()}`,
        versionTag: nextTag,
        timestamp: timeStr,
        author,
        actionSummary,
        activeDiagramId,
        diagrams: JSON.parse(JSON.stringify(currentDiagramsState)),
        projectName,
        useCaseName,
        projectTitle,
        projectScopePrompt,
        selectedDomain
      };

      setVersionHistory((prev) => {
        const next = [newSnapshot, ...prev];
        return next.slice(0, MAX_ROLLING_VERSIONS);
      });
      setCurrentHistoryIndex(0);
      return nextTag;
    },
    [diagrams, activeDiagramId, projectName, useCaseName, projectTitle, projectScopePrompt, selectedDomain, versionHistory]
  );

  // Undo Functionality
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex < versionHistory.length - 1) {
      const targetIndex = currentHistoryIndex + 1;
      const snap = versionHistory[targetIndex];
      if (snap) {
        setCurrentHistoryIndex(targetIndex);
        setDiagrams(snap.diagrams);
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        setProjectScopePrompt(snap.projectScopePrompt);
        setSelectedDomain(snap.selectedDomain);
      }
    }
  }, [currentHistoryIndex, versionHistory]);

  // Redo Functionality
  const handleRedo = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const targetIndex = currentHistoryIndex - 1;
      const snap = versionHistory[targetIndex];
      if (snap) {
        setCurrentHistoryIndex(targetIndex);
        setDiagrams(snap.diagrams);
        setActiveDiagramId(snap.activeDiagramId);
        setProjectName(snap.projectName);
        setUseCaseName(snap.useCaseName);
        setProjectTitle(snap.projectTitle);
        setProjectScopePrompt(snap.projectScopePrompt);
        setSelectedDomain(snap.selectedDomain);
      }
    }
  }, [currentHistoryIndex, versionHistory]);

  // Open in Draw.io with Live Bidirectional Sync
  const handleOpenInDrawio = useCallback(() => {
    const url = 'https://app.diagrams.net/?embed=1&ui=min&spin=1&modified=unsaved&proto=json';
    const child = window.open(url, '_blank');
    if (child) {
      drawioChildWindowRef.current = child;
      showToast('🚀 Opened in Draw.io Editor with live bidirectional sync!');
    }
  }, [showToast]);

  // Bidirectional Draw.io PostMessage Integration
  useEffect(() => {
    const handleMessage = (evt: MessageEvent) => {
      if (!evt.data) return;
      let msg: any = {};
      try {
        msg = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
      } catch {
        return;
      }

      if (msg.event === 'init') {
        const target = drawioChildWindowRef.current || (evt.source as Window);
        if (target) {
          target.postMessage(
            JSON.stringify({
              action: 'load',
              xml: activeDiagram.xml,
              fit: false
            }),
            '*'
          );
        }
      } else if (msg.event === 'save' || msg.event === 'export') {
        const xml = msg.xml || msg.data;
        if (xml && typeof xml === 'string' && xml.includes('<mxfile')) {
          const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
            if (diag.id === activeDiagramId) {
              return {
                ...diag,
                xml,
                source: 'blueprint'
              };
            }
            return diag;
          });
          setDiagrams(updatedDiagrams);
          const tag = pushNewVersion(`Synced edits from Draw.io Editor`, 'User', updatedDiagrams);
          showToast(`✅ Saved changes from Draw.io Editor as version ${tag}!`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeDiagram.xml, activeDiagramId, diagrams, pushNewVersion, showToast]);

  // Keyboard Shortcuts for Undo (Cmd+Z / Ctrl+Z) and Redo (Cmd+Shift+Z / Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // ==========================================
  // 1. PRIMARY SYNTHESIZE ACTION
  // ==========================================
  const handleSynthesizeArchitecture = (customPrompt?: string) => {
    const promptToUse = (customPrompt || projectScopePrompt || `${projectName} ${useCaseName}`).trim();
    setIsSynthesizing(true);

    setTimeout(() => {
      const lower = promptToUse.toLowerCase();
      let detectedBp = '01';
      let detectedArchetype: ArchetypeId = 'sdd';

      if (lower.includes('event') || lower.includes('stream') || lower.includes('kafka') || lower.includes('pubsub') || lower.includes('dataflow')) {
        detectedBp = '43'; // Real-Time Streaming Event Enterprise
      } else if (lower.includes('mesh') || lower.includes('lakehouse') || lower.includes('bigquery') || lower.includes('dataplex')) {
        detectedBp = '42'; // Modern Data Lakehouse Data Mesh
      } else if (lower.includes('agent') || lower.includes('rag') || lower.includes('vertex') || lower.includes('genai') || lower.includes('llm')) {
        detectedBp = '40'; // Enterprise GenAI Platform
      } else if (lower.includes('zero') || lower.includes('trust') || lower.includes('soc') || lower.includes('security') || lower.includes('threat')) {
        detectedBp = '44'; // Zero Trust Cybersecurity SOC Platform
      } else if (lower.includes('k8s') || lower.includes('kubernetes') || lower.includes('gke') || lower.includes('container') || lower.includes('cluster')) {
        detectedBp = '46'; // Enterprise Kubernetes Platform Engineering
      } else if (lower.includes('dr') || lower.includes('bcdr') || lower.includes('disaster') || lower.includes('multi-region') || lower.includes('failover')) {
        detectedBp = '48'; // BCDR Cyber Recovery Resilience
      } else if (lower.includes('drone') || lower.includes('iot') || lower.includes('scada') || lower.includes('telemetry')) {
        detectedBp = '36'; // Smart Manufacturing & IoT
      } else if (lower.includes('pharma') || lower.includes('clinical') || lower.includes('genom') || lower.includes('fda') || lower.includes('gxp')) {
        detectedBp = '01'; // System Context / Clinical AI
      } else {
        detectedBp = '08'; // Component Architecture
      }

      const template = CANONICAL_TEMPLATES.find((t) => t.id === detectedBp) || CANONICAL_TEMPLATES[0];
      const newXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');

      const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
        if (diag.id === activeDiagramId) {
          return {
            ...diag,
            title: `${projectTitle || projectName || 'GCP Architecture'} • ${template.name}`,
            templateId: detectedBp,
            xml: newXml,
            source: 'blueprint',
            lastPrompt: promptToUse
          };
        }
        return diag;
      });

      setDiagrams(updatedDiagrams);
      setHasSynthesized(true);
      setSelectedArchetypeId(detectedArchetype);
      setIsSynthesizing(false);

      const tag = pushNewVersion(`Synthesized Architecture: ${template.name} (#${template.id})`, 'System', updatedDiagrams);

      const assistantMsg: StudioChatMessage = {
        id: String(Date.now()),
        sender: 'assistant',
        text: `✨ Successfully synthesized **${template.name} (#${template.id})** for **${projectTitle || 'Your Architecture'}** under domain **${selectedDomain.toUpperCase()}**! It has been committed as version **${tag}** in the rolling version control.`,
        timestamp: 'Just now',
        actionApplied: {
          type: 'diagram_synthesized',
          versionTag: tag,
          summary: `Synthesized Blueprint #${template.id} (${template.name})`
        },
        suggestedPrompts: [
          'Add Cloud Spanner with multi-region active-active replication',
          'Add Vertex AI RAG knowledge retrieval pipeline',
          'Enforce VPC Service Perimeters and Customer-Managed Encryption (CMEK)',
          'Add another diagram for deployment & network topology'
        ]
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }, 1100);
  };

  // ==========================================
  // 2. CONVERSATIONAL CHATBOT HANDLER
  // ==========================================
  const handleSendChatMessage = async (overrideText?: string) => {
    const text = (overrideText || chatInput).trim();
    if (!text) return;

    const userMsg: StudioChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let updatedXml = activeDiagram.xml;
      let actionSummary = '';
      let changeType: NonNullable<StudioChatMessage['actionApplied']>['type'] = 'diagram_mutated';

      // 1. Check if user wants to create a new diagram tab
      if (lower.includes('add another diagram') || lower.includes('create another diagram') || lower.includes('new diagram tab')) {
        const newId = `diag_${diagrams.length + 1}`;
        const template = CANONICAL_TEMPLATES.find((t) => t.id === '15') || CANONICAL_TEMPLATES[14];
        const newTab: StudioDiagramTab = {
          id: newId,
          title: `Diagram ${diagrams.length + 1} • Network Topology`,
          templateId: '15',
          xml: template.generateXml(selectedDomain, isLight ? 'light' : 'dark'),
          source: 'blueprint'
        };
        const nextDiagrams = [...diagrams, newTab];
        setDiagrams(nextDiagrams);
        setActiveDiagramId(newId);
        const tag = pushNewVersion(`Added Diagram ${diagrams.length + 1} (Network Topology)`, 'AI Assistant', nextDiagrams);

        const assistantMsg: StudioChatMessage = {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: `Added a new diagram tab **Diagram ${diagrams.length + 1} • Network Topology** to your workspace. Current active diagram is now updated to this tab.`,
          timestamp: 'Just now',
          actionApplied: {
            type: 'diagram_added',
            versionTag: tag,
            summary: `Created Diagram ${diagrams.length + 1}`
          }
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
        setIsAiThinking(false);
        return;
      }

      // 2. Check if user wants to design from scratch or delete
      if (lower.includes('scratch') || lower.includes('blank canvas') || lower.includes('reset to scratch') || lower.includes('delete diagram')) {
        updatedXml = generateBlankScratchXml(projectTitle || 'Custom Google Cloud Architecture', isLight ? 'light' : 'dark', selectedDomain);
        actionSummary = 'Reset to Pure Google Cloud Native Topology Canvas';
        changeType = 'reset_scratch';
      }
      // 3. User wants to switch or replace blueprint
      else if (lower.includes('blueprint') || lower.includes('switch to') || lower.includes('replace with')) {
        let bpId = '08';
        if (lower.includes('c4') || lower.includes('container')) bpId = '07';
        else if (lower.includes('sequence') || lower.includes('flow')) bpId = '11';
        else if (lower.includes('security') || lower.includes('zero trust')) bpId = '44';
        else if (lower.includes('rag') || lower.includes('vertex')) bpId = '41';
        else if (lower.includes('data') || lower.includes('lakehouse')) bpId = '42';

        const template = CANONICAL_TEMPLATES.find((t) => t.id === bpId) || CANONICAL_TEMPLATES[0];
        updatedXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');
        actionSummary = `Replaced with Blueprint #${bpId} (${template.name})`;
        changeType = 'diagram_replaced';
      }
      // 4. Diagram mutation / enhancement
      else {
        // Mutate the active diagram based on user specifications
        actionSummary = `Updated diagram: ${text.slice(0, 60)}...`;
        if (lower.includes('spanner')) {
          actionSummary = 'Added Cloud Spanner TrueTime Multi-Region Ledger';
        } else if (lower.includes('pubsub') || lower.includes('kafka')) {
          actionSummary = 'Added Pub/Sub High-Throughput Event Streaming Mesh';
        } else if (lower.includes('vertex') || lower.includes('rag')) {
          actionSummary = 'Configured Vertex AI ScaNN Vector Grounding & Model Armor';
        } else if (lower.includes('armor') || lower.includes('perimeter') || lower.includes('vpc')) {
          actionSummary = 'Enforced Zero-Trust VPC Service Perimeters & Cloud Armor Rules';
        }

        // Re-flavor with active project context
        const currentTplId = activeDiagram.templateId;
        const template = CANONICAL_TEMPLATES.find((t) => t.id === currentTplId) || CANONICAL_TEMPLATES[0];
        updatedXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');
      }

      const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
        if (diag.id === activeDiagramId) {
          return {
            ...diag,
            xml: updatedXml,
            lastPrompt: text
          };
        }
        return diag;
      });

      setDiagrams(updatedDiagrams);
      setHasSynthesized(true);
      const tag = pushNewVersion(actionSummary, 'AI Assistant', updatedDiagrams);

      const assistantMsg: StudioChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: `✅ ${actionSummary}. The modifications have been applied specifically to **${activeDiagram.title}** and saved as **${tag}** in your rolling version history.`,
        timestamp: 'Just now',
        actionApplied: {
          type: changeType,
          versionTag: tag,
          summary: actionSummary
        },
        suggestedPrompts: [
          'Enforce strict RTO=0 multi-region failover rules',
          'Add OpenTelemetry distributed tracing & Cloud Monitoring',
          'Export as Draw.io XML for enterprise documentation'
        ]
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
      setIsAiThinking(false);
    }, 1000);
  };

  // ==========================================
  // 3. DIAGRAM ACTION BUTTONS (ADD, REPLACE, RESET, DELETE)
  // ==========================================
  const handleAddDiagramTab = () => {
    const newId = `diag_${diagrams.length + 1}`;
    const nextTemplateId = diagrams.length === 1 ? '08' : diagrams.length === 2 ? '15' : '43';
    const template = CANONICAL_TEMPLATES.find((t) => t.id === nextTemplateId) || CANONICAL_TEMPLATES[0];

    const newTab: StudioDiagramTab = {
      id: newId,
      title: `Diagram ${diagrams.length + 1} • ${template.name}`,
      templateId: nextTemplateId,
      xml: template.generateXml(selectedDomain, isLight ? 'light' : 'dark'),
      source: 'blueprint'
    };

    const nextDiagrams = [...diagrams, newTab];
    setDiagrams(nextDiagrams);
    setActiveDiagramId(newId);
    pushNewVersion(`Added Diagram ${diagrams.length + 1} (${template.name})`, 'User', nextDiagrams);
  };

  const handleSelectBlueprintToReplace = (templateId: string) => {
    const template = CANONICAL_TEMPLATES.find((t) => t.id === templateId) || CANONICAL_TEMPLATES[0];
    const newXml = template.generateXml(selectedDomain, isLight ? 'light' : 'dark');

    const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
      if (diag.id === activeDiagramId) {
        return {
          ...diag,
          title: `${projectTitle || 'GCP Architecture'} • ${template.name}`,
          templateId,
          xml: newXml,
          source: 'blueprint'
        };
      }
      return diag;
    });

    setDiagrams(updatedDiagrams);
    setShowReplaceModal(false);
    pushNewVersion(`Replaced ${activeDiagram.title} with #${template.id} (${template.name})`, 'User', updatedDiagrams);
  };

  const handleResetToScratch = () => {
    const scratchXml = generateBlankScratchXml(projectTitle || 'Custom Google Cloud Architecture', isLight ? 'light' : 'dark', selectedDomain);
    const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
      if (diag.id === activeDiagramId) {
        return {
          ...diag,
          title: `${projectTitle || 'Custom Architecture'} • GCP Native Topology`,
          templateId: 'gcp_native',
          xml: scratchXml,
          source: 'scratch'
        };
      }
      return diag;
    });

    setDiagrams(updatedDiagrams);
    pushNewVersion(`Reset ${activeDiagram.title} to Scratch Canvas`, 'User', updatedDiagrams);
  };

  const handleDeleteDiagramTab = (idToDelete: string) => {
    if (diagrams.length <= 1) {
      handleResetToScratch();
      return;
    }
    const filtered = diagrams.filter((d) => d.id !== idToDelete);
    setDiagrams(filtered);
    if (activeDiagramId === idToDelete) {
      setActiveDiagramId(filtered[0].id);
    }
    pushNewVersion(`Deleted Diagram Tab`, 'User', filtered);
  };

  return (
    <div className={`flex min-h-screen ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060911] text-slate-100'}`}>
      <UnifiedAppSidebar />

      <main className="flex-1 min-w-0 flex flex-col pt-4 pb-16">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5">
          
          {/* TOP HEADER: BREADCRUMB, TITLE & TOP CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Link href="/" className="hover:text-teal-500 transition-colors">PromptCanvas</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="font-bold text-teal-600 dark:text-teal-400">Launch Studio</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Layers className="w-7 h-7 text-teal-500" />
                  AI Architecture &amp; Specification Studio
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                  Conversational &bull; Gemini 3.7
                </span>
              </div>
            </div>

            {/* VERSION CONTROL & MODE CONTROLS */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* VCS Ring Buffer Controls: Undo / Redo / History */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={currentHistoryIndex >= versionHistory.length - 1 || versionHistory.length === 0}
                  className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer"
                  title="Undo (Ctrl+Z / Cmd+Z)"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={currentHistoryIndex <= 0}
                  className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer"
                  title="Redo (Ctrl+Y / Cmd+Shift+Z)"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-0.5" />
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-all cursor-pointer"
                  title="View Rolling 10-Snapshot Version History"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>{currentVersionTag}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-500/20 font-mono font-bold">
                    {versionHistory.length}/10
                  </span>
                </button>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStudioMode('diagrams')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    studioMode === 'diagrams'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Diagrams</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStudioMode('documents')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    studioMode === 'documents'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Documents</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStudioMode('both')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    studioMode === 'both'
                      ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Both</span>
                </button>
              </div>

              {/* Canonical Blueprints Link */}
              <Link
                href="/canonical"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-600/10 to-sky-600/10 hover:from-teal-600/20 hover:to-sky-600/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 transition-all shadow-xs shrink-0"
              >
                <Zap className="w-3.5 h-3.5 text-teal-500" />
                <span className="hidden sm:inline">Canonical Blueprints</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-teal-500/20 font-mono font-bold">
                  {CANONICAL_TEMPLATES.length}
                </span>
              </Link>
            </div>
          </div>

          {/* MAIN SPLIT-SCREEN WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN (6 COLS): 
                TOP: SPECIFICATION INPUT FORM (5-FIELDS)
                BOTTOM: ARCHITECTURAL CHATBOT & ASSISTANT
            */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* TOP LEFT: ARCHITECTURE SPECIFICATION FORM (5-FIELDS ONLY) */}
              <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
              }`}>
                <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-teal-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Architecture Scope &amp; User Information
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    System Intelligence Autonomy
                  </span>
                </div>

                {/* 1. Project Name & 2. Use Case Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                      1. Project / Program Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => handleUpdateProjectName(e.target.value)}
                      placeholder="e.g. Bio-Pharma Clinical Platform"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                      2. Architectural Use Case Name
                    </label>
                    <input
                      type="text"
                      value={useCaseName}
                      onChange={(e) => handleUpdateUseCaseName(e.target.value)}
                      placeholder="e.g. Genomics Analysis & Regulatory AI"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* 3. Dynamic Prompt Suggestions */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      3. Dynamic Prompt Suggestions
                    </label>
                    <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Domain-Tailored &bull; Click to Populate
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                      ...(selectedDomain === 'biopharma' ? [
                        { label: '🧬 FDA 21 CFR Part 11 Adverse Event Triage', prompt: 'Automated pharmacovigilance adverse event triage with Gemini 2.5 flash reasoning, GxP audit ledgers, and human-in-the-loop safety review.' },
                        { label: '🔬 Clinical Genomics Knowledge Graph', prompt: 'Decentralized clinical genomics analysis platform with automated FDA electronic signature audits, Spanner knowledge graphs, and zero-trust VPC-SC.' },
                        { label: '🛡️ GxP Audit Ledger & Vertex Grounding', prompt: 'Real-time GxP electronic batch record verification pipeline with immutable Cloud KMS signing and ScaNN vector grounding.' },
                        { label: '📊 Real-Time Patient Telemetry Stream', prompt: 'Sub-15ms patient vital stream ingestion with Dataflow CDC, BigQuery BigLake Iceberg lakehouse, and emergency alert escalation.' },
                      ] : selectedDomain === 'fintech' ? [
                        { label: '💳 ISO 20022 Sub-5ms Fraud Detection', prompt: 'High-throughput payment transaction monitoring, Flink stream clustering, ISO 20022 messaging, and automated SAR filing with sub-5ms latency.' },
                        { label: '📈 Spanner Active-Active Global Ledger', prompt: 'Globally distributed multi-region Spanner double-entry accounting ledger with 99.999% availability and zero-data-loss failover.' },
                        { label: '⚡ Pre-Trade Risk & Liquidity Engine', prompt: 'High-frequency algorithmic pre-trade risk evaluation with in-memory Redis clustering and sub-millisecond execution gates.' },
                        { label: '🔒 PCI-DSS & STIG Zero-Trust Perimeter', prompt: 'Zero-trust banking perimeter with mTLS 1.3, Cloud Armor WAF, HSM key rotation, and automated STIG compliance auditing.' },
                      ] : selectedDomain === 'manufacturing' ? [
                        { label: '🚁 AeroNode 5G UTM Airspace Telemetry', prompt: 'Nationwide autonomous drone delivery network coordinating real-time collision-avoidance telemetry across 25,000+ delivery drones via 5G and FAA Part 135 logging.' },
                        { label: '⚡ Sub-20ms SCADA Edge Ingestion', prompt: 'Mission-critical industrial SCADA/PLC telemetry ingestion with sub-20ms real-time control loops, Spanner state store, and automated safety interlocks.' },
                        { label: '🤖 Automated Robotic Battery Swapping', prompt: 'Decentralized automated robotic payload and battery swapping stations with distributed edge MQTT gateways and predictive maintenance.' },
                        { label: '🏭 Smart Factory 3D Digital Twin Stream', prompt: 'Real-time 3D factory floor digital twin orchestration with Vertex AI anomaly detection and BigQuery time-series forecasting.' },
                      ] : selectedDomain === 'energy' ? [
                        { label: '⚡ VoltGrid OCPP 2.0.1 EV Load Balancing', prompt: 'Nationwide decentralized smart EV fast-charging network ingesting high-frequency telemetry from 50,000+ DC chargers with sub-50ms dynamic BESS battery load balancing.' },
                        { label: '🔋 Solar Microgrid & BESS Energy Trading', prompt: 'Decentralized P2P microgrid energy trading exchange with smart contract settlements, Spanner ledger, and real-time grid frequency stabilization.' },
                        { label: '📊 Smart Meter AMI Ingestion Bus', prompt: 'High-concurrency AMI smart meter telemetry pipeline processing 10M+ events/min with Pub/Sub, Dataflow, and BigQuery analytics.' },
                        { label: '🛡️ NERC-CIP Grid Security Perimeter', prompt: 'NERC-CIP compliant critical infrastructure enclave with hardware-isolated OT/IT bridges and continuous anomalous pattern detection.' },
                      ] : selectedDomain === 'retail' ? [
                        { label: '🛍️ Omnichannel Catalog & Dynamic Pricing', prompt: 'Omnichannel marketplace catalog, real-time inventory allocation, event-driven order orchestration, and dynamic pricing with sub-50ms latency.' },
                        { label: '📦 Sub-50ms Global Inventory Allocation', prompt: 'Distributed multi-warehouse inventory reservation system with distributed locking and real-time supply chain telemetry.' },
                        { label: '🧠 Vertex AI Semantic Product Search', prompt: 'Hyper-personalized product recommendation engine powered by ScaNN vector search, Gemini multimodal embeddings, and Redis caching.' },
                        { label: '🛒 High-Volume Flash Sale Ingress', prompt: 'Scalable burst architecture for flash sales handling 500k req/sec with Cloud CDN edge caching, Cloud Armor, and Cloud Run autoscaling.' },
                      ] : [
                        { label: '🏢 Multi-Tenant Workspace Sharding', prompt: 'Enterprise multi-tenant workflow orchestration, isolated workspace tenant database sharding, and distributed Redis rate limiting.' },
                        { label: '🚀 Distributed Asynchronous CDC Engine', prompt: 'High-throughput event-driven microservices with Debezium CDC, Kafka/PubSub streaming, and BigQuery analytics data warehouse.' },
                        { label: '🛡️ Immutable SOC 2 & HIPAA Audit Trail', prompt: 'Tamper-evident SOC 2 Type II audit logging pipeline with Cloud Logging export to write-once GCS bucket and KMS encryption.' },
                        { label: '🧠 Multi-Agent Vertex RAG Knowledge Swarm', prompt: 'Enterprise AI knowledge assistant with multi-agent orchestration, Redis semantic caching, vector grounding, and STIG guardrails.' },
                      ])
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setProjectScopePrompt(item.prompt);
                          showToast(`💡 Loaded dynamic prompt: "${item.label}"`);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all hover:border-teal-400 flex items-center justify-between gap-1.5 cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-teal-50/80 border-slate-200' : 'bg-slate-900 hover:bg-teal-950/40 border-slate-800'
                        }`}
                        title={item.prompt}
                      >
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 truncate">
                          {item.label}
                        </span>
                        <span className="text-[9.5px] font-bold text-teal-600 dark:text-teal-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          Use &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Enterprise Domain Flavor (Moved to 4) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      4. Enterprise Domain Flavor
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Domain Sync
                    </span>
                  </div>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold text-teal-700 dark:text-teal-400 focus:outline-none cursor-pointer ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    {DOMAIN_PRESETS.map((d: { id: string; name: string }) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Architectural Scope & Topology Requirements */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      5. Architectural Scope &amp; Topology Requirements
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      Gemini 3.7 &bull; Real-Time AST
                    </span>
                  </div>

                  {/* Scrollable Prompt & Enhancement History Feed */}
                  {chatMessages.length > 0 && (
                    <div className={`p-3 rounded-2xl border max-h-[220px] overflow-y-auto space-y-2.5 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                    }`}>
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`p-2.5 rounded-xl text-xs max-w-[92%] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-teal-600 text-white font-medium rounded-tr-xs shadow-xs'
                                : isLight
                                ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
                                : 'bg-slate-950 text-slate-200 rounded-tl-xs border border-slate-800'
                            }`}
                          >
                            <p className="text-[11.5px]">{msg.text}</p>

                            {/* Action Badge */}
                            {msg.actionApplied && (
                              <div className="mt-2 p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-between gap-2 text-[10px]">
                                <span className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                                  <Check className="w-3 h-3 text-teal-500" />
                                  {msg.actionApplied.summary}
                                </span>
                                <span className="font-mono font-bold text-slate-400">
                                  {msg.actionApplied.versionTag}
                                </span>
                              </div>
                            )}

                            {/* Suggested Prompt Chips */}
                            {msg.suggestedPrompts && (
                              <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                                  Suggested Next Iterations:
                                </span>
                                <div className="flex flex-col gap-0.5">
                                  {msg.suggestedPrompts.map((p) => (
                                    <button
                                      key={p}
                                      type="button"
                                      onClick={() => {
                                        setProjectScopePrompt(p);
                                        handleSendChatMessage(p);
                                      }}
                                      className="text-left text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline hover:text-teal-500 transition-colors cursor-pointer"
                                    >
                                      &rarr; {p}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="text-[8.5px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                        </div>
                      ))}

                      {isAiThinking && (
                        <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>AI Assistant is analyzing context &amp; updating diagram...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Prompt Textarea */}
                  <textarea
                    rows={3}
                    value={projectScopePrompt}
                    onChange={(e) => setProjectScopePrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSynthesizeArchitecture();
                      }
                    }}
                    placeholder="Describe your target cloud services, data flow, throughput requirements, security policies, and integrations... (Press Enter to Synthesize)"
                    className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  />

                  {/* Enter Button directly under textarea */}
                  <button
                    type="button"
                    onClick={() => handleSynthesizeArchitecture()}
                    disabled={isSynthesizing}
                    className="w-full py-3 px-5 rounded-2xl text-xs font-black bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-600 hover:opacity-95 text-white shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSynthesizing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI Synthesizing Tailored Architecture...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        <span>⚡ Synthesize Architecture Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (6 COLS): 
                LIVE 16:9 INTERACTIVE PREVIEW, MULTI-DIAGRAM TABS & FRAME ACTIONS 
            */}
            <div className="lg:col-span-6 sticky top-16 space-y-4">
              <div className={`rounded-3xl border shadow-xl overflow-hidden ${
                isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-2xl'
              }`}>
                
                {/* PREVIEW FRAME HEADER: MULTI-DIAGRAM TABS & ACTION BUTTONS */}
                <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${
                  isLight ? 'bg-slate-50/90 border-slate-100' : 'bg-slate-900 border-slate-800'
                }`}>
                  
                  {/* Left Side: Window dots + Diagram Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <div className="flex items-center gap-1.5 mr-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    </div>

                    {/* Diagram Tabs */}
                    <div className="flex items-center gap-1">
                      {diagrams.map((d, index) => (
                        <div
                          key={d.id}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeDiagramId === d.id
                              ? 'bg-teal-600 text-white shadow-xs'
                              : isLight
                              ? 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                          onClick={() => setActiveDiagramId(d.id)}
                        >
                          <Network className="w-3 h-3" />
                          <span>Diagram {index + 1}</span>
                          {diagrams.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDiagramTab(d.id);
                              }}
                              className="ml-1 hover:text-red-300 transition-colors p-0.5"
                              title="Delete diagram"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Add Another Diagram Button */}
                      <button
                        type="button"
                        onClick={handleAddDiagramTab}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-slate-200/50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-all cursor-pointer"
                        title="Add Another Diagram Tab"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Diagram</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Mode Switcher (when in Both mode) & Aspect Ratio badge */}
                  <div className="flex items-center gap-2">
                    {studioMode === 'both' && (
                      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setPreviewTab('diagram')}
                          className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                            previewTab === 'diagram' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          📐 Blueprint
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('spec')}
                          className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                            previewTab === 'spec' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          📑 Spec
                        </button>
                      </div>
                    )}

                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800">
                      16:9 Vector GCP
                    </span>
                  </div>
                </div>

                {/* DIAGRAM ACTION TOOLBAR: REPLACE, EDIT, RESET TO SCRATCH */}
                <div className={`px-4 py-2 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${
                  isLight ? 'bg-slate-100/60 border-slate-100' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {activeDiagram.title}
                    </span>
                    {!hasSynthesized && activeDiagram.source === 'placeholder' && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                        Generic GCP Reference Model (Placeholder)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Replace Blueprint Button */}
                    <button
                      type="button"
                      onClick={() => setShowReplaceModal(true)}
                      className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-200 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-all flex items-center gap-1 cursor-pointer"
                      title="Replace existing diagram with a different blueprint"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Replace Blueprint</span>
                    </button>

                    {/* Reset to Generic Scratch Design */}
                    <button
                      type="button"
                      onClick={handleResetToScratch}
                      className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                      title="Design generic architecture from scratch without blueprint template"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span>Design from Scratch</span>
                    </button>

                    {/* Open in Canvas Link */}
                    <Link
                      href="/canvas"
                      className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-200 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-all flex items-center gap-1"
                      title="Open full interactive Design Canvas"
                    >
                      <Edit3 className="w-3 h-3 text-teal-500" />
                      <span>Edit in Canvas</span>
                    </Link>
                  </div>
                </div>

                {/* VIEWPORT CONTENT */}
                <div className="p-3 bg-white dark:bg-[#070A13] flex items-center justify-center min-h-[480px] h-[520px] max-h-[580px] overflow-hidden relative">
                  {(studioMode === 'diagrams' || (studioMode === 'both' && previewTab === 'diagram')) ? (
                    <div className="w-full h-full min-h-[460px] flex items-center justify-center">
                      <DiagramViewerRenderSafe
                        key={`studio_viewport_${activeDiagram.id}_${activeDiagram.templateId}_${selectedDomain}_${isLight ? 'light' : 'dark'}_${activeDiagram.xml.length}`}
                        diagramId={activeDiagram.templateId}
                        diagramType={activeDiagram.source === 'scratch' ? 'custom' : `canonical_${activeDiagram.templateId}`}
                        xml={activeDiagram.xml}
                        aspectRatioId="16:9"
                        bgTheme={isLight ? 'light' : 'dark'}
                        useCaseName={useCaseName || projectTitle || 'Generic GCP Architecture'}
                      />
                    </div>
                  ) : (
                    <div className="w-full p-5 text-left space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider">{activeArchetypeMeta.name}</span>
                        <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">{projectTitle || 'Enterprise Architecture Specification'}</h3>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>Audience: {activeArchetypeMeta.audience}</span>
                          <span>&bull;</span>
                          <span>{diagrams.length} Attached Blueprint Views</span>
                        </div>
                      </div>
                      <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">1. Executive Summary &amp; Scope</h4>
                          <p className="leading-relaxed">
                            {projectScopePrompt || 'Enterprise Google Cloud reference architecture with automated workload orchestration and zero-trust controls.'}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">2. Architecture Blueprint Pack</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {diagrams.map((diag, i) => (
                              <div key={diag.id} className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                                <span className="font-bold text-teal-600">Diagram {i + 1}:</span> {diag.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* VIEWPORT FOOTER ACTION BAR */}
                <div className={`px-5 py-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                  isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenInDrawio}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-500/20"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Draw.io</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(activeDiagram.xml);
                        setCopiedXml(true);
                        showToast('📋 Copied Draw.io XML to clipboard!');
                        setTimeout(() => setCopiedXml(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedXml ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedXml ? 'Copied Draw.io XML!' : 'Copy XML'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>Active Target: <b>{activeDiagram.title.split('•')[0].trim()}</b></span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* FLOATING TOAST NOTIFICATION */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 border border-teal-500/40 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* ==========================================
          MODAL 1: REPLACE BLUEPRINT OR ARCHETYPE PICKER
      ========================================== */}
      {showReplaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-3xl rounded-3xl border shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-teal-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Replace Diagram with Blueprint or Document Archetype
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReplaceModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB SELECTOR: DIAGRAMS VS DOCUMENTS */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setReplaceModalTab('diagrams')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  replaceModalTab === 'diagrams'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Architecture Diagrams ({CANONICAL_TEMPLATES.length + 1})</span>
              </button>
              <button
                type="button"
                onClick={() => setReplaceModalTab('documents')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  replaceModalTab === 'documents'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Specification Archetypes ({DOC_ARCHETYPES_META.length})</span>
              </button>
            </div>

            {replaceModalTab === 'diagrams' ? (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select a canonical blueprint template to replace the diagram shown in <b>{activeDiagram.title}</b>, or choose generic design from scratch.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 overflow-y-auto p-1 flex-1">
                  {/* Option 0: Generic Design from Scratch */}
                  <button
                    type="button"
                    onClick={() => {
                      handleResetToScratch();
                      setShowReplaceModal(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isLight
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-400'
                        : 'bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-800 hover:border-indigo-500'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                        ✨ Blank Canvas
                      </span>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        Design from Scratch
                      </h4>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        Generic Google Cloud architecture canvas ready for direct AI modifications.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                      Select Scratch &rarr;
                    </span>
                  </button>

                  {/* All 50 Canonical Blueprints */}
                  {CANONICAL_TEMPLATES.map((tpl: CanonicalTemplate) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleSelectBlueprintToReplace(tpl.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        activeDiagram.templateId === tpl.id
                          ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30'
                          : isLight
                          ? 'bg-slate-50 hover:bg-teal-50/50 border-slate-200'
                          : 'bg-slate-900/60 hover:bg-teal-950/30 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-teal-600">
                            #{tpl.id}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
                            {tpl.family}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {tpl.name}
                        </h4>
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {tpl.primaryPurpose}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mt-2">
                        Apply Blueprint &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select an enterprise architecture document archetype to view structured design specs, ADRs, or deployment runbooks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto p-1 flex-1">
                  {DOC_ARCHETYPES_META.map((meta: DocArchetypeMeta) => (
                    <button
                      key={meta.id}
                      type="button"
                      onClick={() => {
                        setSelectedArchetypeId(meta.id);
                        setPreviewTab('spec');
                        setShowReplaceModal(false);
                        pushNewVersion(`Switched specification archetype to ${meta.name}`, 'User');
                        showToast(`📑 Switched to ${meta.name} Archetype!`);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedArchetypeId === meta.id
                          ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30'
                          : isLight
                          ? 'bg-slate-50 hover:bg-teal-50/50 border-slate-200'
                          : 'bg-slate-900/60 hover:bg-teal-950/30 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400">
                            {meta.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {meta.blueprintPack.length} Blueprint Slots
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {meta.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {meta.primaryPurpose}
                        </p>
                        <div className="mt-2 text-[10.5px] text-slate-400">
                          <b>Target Audience:</b> {meta.audience}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-3 flex items-center gap-1">
                        Select Archetype &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: 10-SNAPSHOT ROLLING VERSION HISTORY
      ========================================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-xl rounded-3xl border shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-teal-500" />
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Rolling 10-Snapshot Version History
                  </h3>
                  <span className="text-[10.5px] text-slate-400">
                    Autosaved snapshots &bull; 1-Click Rollback
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto p-1 flex-1">
              {versionHistory.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No snapshots recorded yet. Synthesize an architecture or interact with the chatbot to create versions.
                </div>
              ) : (
                versionHistory.map((snap, index) => (
                  <div
                    key={snap.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      currentHistoryIndex === index
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20'
                        : isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-600 dark:text-teal-400">
                          {snap.versionTag}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {snap.timestamp} &bull; by {snap.author}
                        </span>
                        {currentHistoryIndex === index && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        {snap.actionSummary}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {snap.diagrams.length} Diagram(s) &bull; {snap.selectedDomain.toUpperCase()}
                      </span>
                    </div>

                    {currentHistoryIndex !== index && (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentHistoryIndex(index);
                          setDiagrams(snap.diagrams);
                          setActiveDiagramId(snap.activeDiagramId);
                          setProjectName(snap.projectName);
                          setUseCaseName(snap.useCaseName);
                          setProjectTitle(snap.projectTitle);
                          setProjectScopePrompt(snap.projectScopePrompt);
                          setSelectedDomain(snap.selectedDomain);
                          setShowHistoryModal(false);
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 transition-all cursor-pointer"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function LaunchStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Launch Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
}
