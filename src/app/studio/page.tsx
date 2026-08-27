'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
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
  Check
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
function generateBlankScratchXml(title: string = 'Custom Google Cloud Architecture', theme: 'light' | 'dark' = 'light'): string {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FFFFFF';
  const stroke = isDark ? '#334155' : '#E2E8F0';
  const text = isDark ? '#F8FAFC' : '#0F172A';
  const subtext = isDark ? '#94A3B8' : '#64748B';

  return `<mxfile host="embed.diagrams.net">
  <diagram id="scratch_diagram" name="${title}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Canvas Frame & Brand Header -->
        <mxCell id="frame_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#090E17' : '#F8FAFC'};strokeColor=${stroke};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1520" height="920" as="geometry"/>
        </mxCell>
        
        <!-- Header Banner -->
        <mxCell id="header_title" value="&lt;b style=&quot;font-size: 20px; color: ${text};&quot;&gt;${title}&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size: 12px; color: ${subtext};&quot;&gt;Generic Google Cloud Platform Architecture &amp;bull; Custom Scratch Canvas&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="70" y="60" width="900" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Brand Block -->
        <mxCell id="brand_block" value="&lt;span style=&quot;font-size: 11px; font-weight: bold; color: #0EA5E9;&quot;&gt;☁️ Google Cloud Reference Architecture&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0F172A' : '#FFFFFF'};strokeColor=#0EA5E9;strokeWidth=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="1250" y="65" width="280" height="40" as="geometry"/>
        </mxCell>

        <!-- Initial Core Cloud Services Subsystems -->
        <mxCell id="box_ingress" value="&lt;b style=&quot;color: #0284C7;&quot;&gt;1. Edge &amp;amp; Ingress&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size: 10px; color: ${subtext};&quot;&gt;Cloud CDN • Cloud Armor • Cloud Load Balancing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E293B' : '#F0F9FF'};strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="80" y="180" width="300" height="200" as="geometry"/>
        </mxCell>

        <mxCell id="box_compute" value="&lt;b style=&quot;color: #7C3AED;&quot;&gt;2. Application &amp;amp; Microservices&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size: 10px; color: ${subtext};&quot;&gt;Google Kubernetes Engine (GKE Autopilot) • Cloud Run&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E1B4B' : '#F5F3FF'};strokeColor=#7C3AED;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="460" y="180" width="340" height="200" as="geometry"/>
        </mxCell>

        <mxCell id="box_ai" value="&lt;b style=&quot;color: #D97706;&quot;&gt;3. Vertex AI &amp;amp; Cognitive Engine&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size: 10px; color: ${subtext};&quot;&gt;Gemini 2.5 Flash • Vector Search • Model Armor&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#451A03' : '#FFFBEB'};strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="880" y="180" width="320" height="200" as="geometry"/>
        </mxCell>

        <mxCell id="box_data" value="&lt;b style=&quot;color: #059669;&quot;&gt;4. Data &amp;amp; Storage Layer&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size: 10px; color: ${subtext};&quot;&gt;Cloud Spanner • BigQuery • Cloud Storage (CMEK)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#064E3B' : '#ECFDF5'};strokeColor=#059669;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1260" y="180" width="270" height="200" as="geometry"/>
        </mxCell>

        <!-- Governance & Security Zone -->
        <mxCell id="box_security" value="&lt;b style=&quot;color: #475569;&quot;&gt;5. Sovereign Security &amp;amp; Zero-Trust Control Plane&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size: 10px; color: ${subtext};&quot;&gt;VPC Service Perimeters • IAM Workload Identity • Cloud KMS • Security Command Center (SCC)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0F172A' : '#F1F5F9'};strokeColor=#64748B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="80" y="440" width="1450" height="140" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="conn_1" value="HTTPS / TLS 1.3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;fontSize=10;fontColor=#0284C7;labelBackgroundColor=${bg};" edge="1" parent="1" source="box_ingress" target="box_compute">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="conn_2" value="gRPC / RAG" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;fontSize=10;fontColor=#7C3AED;labelBackgroundColor=${bg};" edge="1" parent="1" source="box_compute" target="box_ai">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="conn_3" value="CDC / Storage" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;fontSize=10;fontColor=#059669;labelBackgroundColor=${bg};" edge="1" parent="1" source="box_ai" target="box_data">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
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
    // Initial placeholder diagram: Generic GCP Reference Architecture
    const genericTemplate = CANONICAL_TEMPLATES.find((t) => t.id === '08') || CANONICAL_TEMPLATES[0];
    const initialXml = genericTemplate.generateXml('saas', isLight ? 'light' : 'dark');
    return [
      {
        id: 'diag_1',
        title: 'Diagram 1 • GCP Architecture',
        templateId: '08',
        xml: initialXml,
        source: 'placeholder'
      }
    ];
  });

  // Active Document Archetype (for documents view)
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('sdd');

  // UI Modals & Menus
  const [showReplaceModal, setShowReplaceModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);

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
        updatedXml = generateBlankScratchXml(projectTitle || 'Custom Google Cloud Architecture', isLight ? 'light' : 'dark');
        actionSummary = 'Reset to Generic Custom Scratch Canvas';
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
    const scratchXml = generateBlankScratchXml(projectTitle || 'Custom Google Cloud Architecture', isLight ? 'light' : 'dark');
    const updatedDiagrams: StudioDiagramTab[] = diagrams.map((diag) => {
      if (diag.id === activeDiagramId) {
        return {
          ...diag,
          title: `${projectTitle || 'Custom Architecture'} • Generic Scratch Canvas`,
          templateId: 'scratch',
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

                {/* 3. Combined Architecture Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      3. Combined Architecture Title
                    </label>
                    <span className="text-[10px] font-mono text-teal-600 font-bold">
                      Auto-Synced &bull; Diagram Brand Header
                    </span>
                  </div>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => handleUpdateProjectTitle(e.target.value)}
                    placeholder="e.g. Bio-Pharma Clinical Platform — Genomics Analysis & Regulatory AI"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  />
                </div>

                {/* 4. Architectural Scope & Topology Requirements */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                      4. Architectural Scope &amp; Topology Requirements
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      Gemini 3.7 &bull; Real-Time AST
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={projectScopePrompt}
                    onChange={(e) => setProjectScopePrompt(e.target.value)}
                    placeholder="Describe your target cloud services, data flow, throughput requirements, security policies, and integrations..."
                    className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  />
                </div>

                {/* 5. Enterprise Domain Flavor */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">
                    5. Enterprise Domain Flavor
                  </label>
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

                {/* Primary Submit / Synthesize Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleSynthesizeArchitecture()}
                    disabled={isSynthesizing}
                    className="w-full py-3 px-5 rounded-2xl text-xs font-black bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-600 hover:opacity-95 text-white shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
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

              {/* BOTTOM LEFT: ARCHITECTURAL CHATBOT & CONVERSATIONAL ASSISTANT */}
              <div className={`p-5 rounded-3xl border shadow-sm space-y-4 flex flex-col ${
                isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-xl'
              }`}>
                <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-teal-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Architectural Chatbot &bull; Conversational Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                      Target: {activeDiagram.title.split('•')[0].trim()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Gemini 3.7 Online
                    </span>
                  </div>
                </div>

                {/* Chat Messages Container */}
                <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl text-xs max-w-[90%] leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-teal-600 text-white font-medium rounded-tr-xs'
                            : isLight
                            ? 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80'
                            : 'bg-slate-900 text-slate-200 rounded-tl-xs border border-slate-800'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Action Badge */}
                        {msg.actionApplied && (
                          <div className="mt-2.5 p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-between gap-2 text-[10.5px]">
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
                          <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
                            <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 block">
                              Suggested Next Iterations:
                            </span>
                            <div className="flex flex-col gap-1">
                              {msg.suggestedPrompts.map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => handleSendChatMessage(p)}
                                  className="text-left text-[10.5px] font-semibold text-teal-600 dark:text-teal-400 hover:underline hover:text-teal-500 transition-colors cursor-pointer"
                                >
                                  &rarr; {p}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-center gap-2 text-xs text-teal-600 font-bold p-3">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>AI Assistant is analyzing context &amp; updating diagram...</span>
                    </div>
                  )}
                </div>

                {/* Quick Scenario Starters */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    ⚡ Quick Scenario Prompts:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '🚁 Drone Delivery UTM', prompt: 'Architect a nationwide drone delivery network with real-time 5G UTM airspace telemetry and FAA audit logging.' },
                      { label: '⚡ Smart EV Microgrid', prompt: 'Architect a decentralized smart EV fast-charging network with OCPP 2.0.1 and BESS battery storage load balancing.' },
                      { label: '🧬 Bio-Pharma Clinical', prompt: 'Architect an FDA 21 CFR Part 11 pharmacovigilance platform with automated adverse event triage and GxP audit ledgers.' },
                      { label: '💳 Real-Time Fraud Hub', prompt: 'Architect a high-throughput ISO 20022 banking payment gateway with sub-5ms pre-trade risk and real-time fraud clustering.' },
                      { label: '🧠 Vertex AI RAG Swarm', prompt: 'Architect an enterprise Vertex AI multi-agent orchestration platform with Redis semantic caching and vector grounding.' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSendChatMessage(item.prompt)}
                        className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                          isLight
                            ? 'bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200'
                            : 'bg-slate-900 hover:bg-teal-950/40 hover:text-teal-400 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input Box */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendChatMessage();
                    }}
                    placeholder="Ask AI to modify, add components, or alter the shown diagram..."
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleSendChatMessage()}
                    disabled={!chatInput.trim() || isAiThinking}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
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
                      onClick={() => {
                        navigator.clipboard.writeText(activeDiagram.xml);
                        setCopiedXml(true);
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

      {/* ==========================================
          MODAL 1: REPLACE BLUEPRINT PICKER
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
                  Replace Diagram with Blueprint or Generic Model
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
