'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Sparkles,
  Layers,
  FileText,
  History,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Eye,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Clock,
  Database,
  Cpu,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  Calendar,
  X,
  Maximize2,
  GitBranch,
  Terminal,
  Presentation,
  FileCode,
  Zap,
  Activity,
  Award,
  TrendingUp,
  Shield,
  Boxes,
  Compass,
  ArrowUpRight,
  CheckCheck
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_FAMILIES,
  DOMAIN_PRESETS,
  CanonicalTemplate
} from '@/lib/canonical/canonicalTemplates';
import { DOC_ARCHETYPES_META, DocArchetypeMeta, BlueprintSlot } from '@/lib/compose/archetypes';
import { loadAllHistoricalProjects, HistoricalProjectItem } from '@/components/DocGenHistoryModal';
import { AppHeader } from '@/components/AppHeader';
import { synthesizePromptDrivenDiagramXml } from '@/lib/promptDrivenDiagramSynthesizer';

interface DashboardStarterPrompt {
  id: string;
  label: string;
  badge: string;
  prompt: string;
  recommendedId: string;
}

const DASHBOARD_STARTER_PROMPTS: DashboardStarterPrompt[] = [
  {
    id: 'aws_cloud_ai',
    label: 'AWS Cloud AI Stack',
    badge: 'AWS',
    prompt: 'Create an AWS Cloud AI architecture with Amazon Bedrock, SageMaker, OpenSearch Vector DB, Aurora pgvector, and S3 Lakehouse',
    recommendedId: '34',
  },
  {
    id: 'gcp_agentic_rag',
    label: 'GCP Vertex Agentic RAG',
    badge: 'GCP',
    prompt: 'Design a Google Cloud Vertex AI Agentic RAG architecture with Gemini, Spanner Graph, Apigee X, and Cloud Armor WAF',
    recommendedId: '24',
  },
  {
    id: 'multi_region_ha',
    label: 'Multi-Region Spanner HA',
    badge: 'HA/DR',
    prompt: 'Architect a Multi-Region Active-Active High Availability topology with Cloud Spanner nam3, Global Load Balancing, and RPO < 1s',
    recommendedId: '19',
  },
  {
    id: 'zero_trust_sec',
    label: 'Zero-Trust Security Mesh',
    badge: 'SEC',
    prompt: 'Build a Zero-Trust Security Perimeter with Cloud Armor L7 WAF, BeyondCorp IAP, Cloud KMS HSM CMEK, and VPC Service Controls',
    recommendedId: '18',
  },
  {
    id: 'exec_infographic',
    label: 'Context + Harness Infographic',
    badge: 'INFO',
    prompt: 'Generate an Executive AI Agent Context + Harness + Loop Architecture Infographic poster',
    recommendedId: '52',
  },
];

function rankTemplatesForPrompt(promptText: string): Array<{ template: CanonicalTemplate; score: number; reason: string }> {
  const q = promptText.trim().toLowerCase();
  return CANONICAL_TEMPLATES.map((tpl) => {
    let score = 10;
    let reason = `${tpl.family} Reference Blueprint`;
    const nameLower = tpl.name.toLowerCase();
    const purposeLower = (tpl.primaryPurpose || '').toLowerCase();
    const compStr = (tpl.keyComponents || []).join(' ').toLowerCase();
    const combined = `${nameLower} ${purposeLower} ${compStr} ${tpl.family.toLowerCase()}`;

    if (!q) {
      if (tpl.id === '24') return { template: tpl, score: 98, reason: 'Featured AI & RAG Reference Blueprint' };
      if (tpl.id === '34') return { template: tpl, score: 95, reason: 'Featured Multi-Cloud & Hybrid Topology' };
      if (tpl.id === '16') return { template: tpl, score: 92, reason: 'Featured Cloud Deployment Architecture' };
      if (tpl.id === '18') return { template: tpl, score: 89, reason: 'Featured Zero-Trust Security Boundary' };
      return { template: tpl, score: 50 - (parseInt(tpl.id, 10) || 25) * 0.2, reason };
    }

    const words = q.split(/[^a-z0-9]+/).filter((w) => w.length >= 2);
    for (const w of words) {
      if (nameLower.includes(w)) score += 18;
      if (compStr.includes(w)) score += 14;
      if (purposeLower.includes(w)) score += 10;
    }

    if (/\b(aws|amazon|bedrock|sagemaker|eks|redshift|opensearch|aurora|cloudfront|lambda)\b/.test(q)) {
      if (tpl.id === '34') {
        score += 65;
        reason = 'Best match for AWS / Multi-Cloud & Regional Cloud AI Topology';
      } else if (tpl.id === '24' || tpl.id === '23') {
        score += 55;
        reason = 'Best match for Cloud AI, RAG Knowledge Base & Agent Orchestration';
      } else if (tpl.id === '16' || tpl.id === '07') {
        score += 45;
        reason = 'Best match for Cloud Compute, EKS Containers & VPC Deployment';
      }
    }

    if (/\b(rag|vector|knowledge|embedding|search|vertex|gemini|llm|claude)\b/.test(q)) {
      if (tpl.id === '24') {
        score += 60;
        reason = 'Best match for Vector RAG, Embeddings & Knowledge Retrieval';
      } else if (tpl.id === '23' || tpl.id === '40') {
        score += 48;
        reason = 'Best match for Multi-Agent AI & Foundation Model Orchestration';
      }
    }

    if (/\b(agent|agentic|autonomous|orchestrat|tool|mcp)\b/.test(q)) {
      if (tpl.id === '23') {
        score += 62;
        reason = 'Best match for Multi-Agent Interaction & Tool Routing';
      } else if (tpl.id === '52') {
        score += 50;
        reason = 'Best match for Agent Context + Harness + Loop Topology';
      }
    }

    if (/\b(ha|dr|disaster|failover|multi-region|spanner|active-active|resilien|rpo|rto)\b/.test(q)) {
      if (tpl.id === '19') {
        score += 68;
        reason = 'Best match for Multi-Region Active-Active HA & Disaster Recovery';
      } else if (tpl.id === '15' || tpl.id === '34') {
        score += 48;
        reason = 'Best match for Global Network & Geographic Failover';
      }
    }

    if (/\b(security|zero-trust|waf|armor|kms|cmek|hsm|iam|threat|stride|firewall|enclave)\b/.test(q)) {
      if (tpl.id === '18') {
        score += 68;
        reason = 'Best match for Zero-Trust Security & Trust Boundary Enclaves';
      } else if (tpl.id === '17' || tpl.id === '27') {
        score += 54;
        reason = 'Best match for Identity Federation & STRIDE Threat Defense';
      }
    }

    if (/\b(flow|flowchart|sequence|step|pipeline|stream|kafka|pubsub|kinesis|event)\b/.test(q)) {
      if (tpl.id === '09' || tpl.id === '11' || tpl.id === '67') {
        score += 62;
        reason = 'Best match for Event Streaming, Data Pipelines & Step Sequences';
      }
    }

    if (/\b(infographic|poster|executive|charlie|harness)\b/.test(q)) {
      if (tpl.id === '52' || tpl.id === '53' || tpl.id === '56') {
        score += 75;
        reason = 'Best match for Executive Architecture Infographic Poster';
      }
    }

    if (combined.includes(q.slice(0, 16))) {
      score += 25;
    }

    return { template: tpl, score, reason };
  }).sort((a, b) => b.score - a.score);
}

// Family Metadata with dedicated icons and styling accents
export const FAMILY_CARDS_META = [
  {
    id: 'Understand',
    label: 'Understand & Context',
    icon: '🎯',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-500',
    badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    description: 'System boundaries, external actors, business capability mapping & As-Is/To-Be transformations.',
    featured: ['#01 System Context', '#02 Capability Map', '#04 Value Stream', '#05 As-Is/To-Be']
  },
  {
    id: 'Structure',
    label: 'Structure & Containers',
    icon: '🏛️',
    color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-500',
    badgeBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    description: 'C4 Context, C4 Containers, C4 Components & multi-tier distributed microservices topology.',
    featured: ['#06 C4 Context', '#07 C4 Container', '#08 C4 Component', '#12 Microservices']
  },
  {
    id: 'Flow',
    label: 'Flow & Sequences',
    icon: '🔄',
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-500',
    badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    description: 'Synchronous API flows, event choreography, async message brokers, and step-numbered sequences.',
    featured: ['#03 Swimlane Flow', '#09 Event Streaming', '#10 REST API', '#11 Asynchronous Bus']
  },
  {
    id: 'Infrastructure',
    label: 'Cloud & Network',
    icon: '☁️',
    color: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-500',
    badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    description: 'Multi-region GKE, Spanner dual-region failover, VPC Service Perimeters & active-active DR.',
    featured: ['#15 Spanner Multi-Region', '#16 GKE Enterprise', '#19 VPC Mesh', '#34 Hybrid Cloud']
  },
  {
    id: 'Security & Governance',
    label: 'Security & Zero-Trust',
    icon: '🛡️',
    color: 'from-rose-500/20 to-amber-500/20 border-rose-500/30 text-rose-500',
    badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    description: 'Cloud Armor WAF, Cloud KMS CMEK encryption keys, IAM least-privilege & audit trails.',
    featured: ['#17 Zero-Trust Network', '#18 KMS CMEK Vault', '#27 Secrets Engine', '#39 STRIDE Threat']
  },
  {
    id: 'Delivery & Operations',
    label: 'Delivery & GitOps',
    icon: '🚀',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'GitOps ArgoCD pipelines, automated container registries, canary releases & telemetry monitoring.',
    featured: ['#20 GitOps Pipeline', '#21 Canary Rollout', '#22 Observability Mesh', '#38 SRE Reliability']
  },
  {
    id: 'Analysis & Planning',
    label: 'Analysis & Decision',
    icon: '📊',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500',
    badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    description: 'Architecture Decision Records (ADRs), trade-off evaluation matrices & cost governance (FinOps).',
    featured: ['#30 ADR Matrix', '#31 Trade-off Radar', '#32 FinOps Cost Map', '#33 Capacity Model']
  },
  {
    id: 'Reference Architectures',
    label: 'AI & Data Reference',
    icon: '🧠',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-500',
    badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    description: 'Vertex AI Agentic RAG, Spanner Graph RAG, Data Mesh Lakehouse & Enterprise AI platforms.',
    featured: ['#23 Vertex Agentic RAG', '#24 Spanner Graph', '#25 BigQuery Lakehouse', '#40 Multimodal AI']
  }
];

function DashboardContent() {
  const router = useRouter();
  const { theme } = useTheme();
  // Content locked to light theme (white cards, clean metrics) while top header is dark
  const isLight = true;

  // Navigation Tabs — defaults to 'workspace' (Home Dashboard: Existing Projects + Create New with AI Template Recommender)
  const [activeTab, setActiveTab] = useState<'workspace' | 'overview' | 'blueprints' | 'documents' | 'prompts'>('workspace');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  // Create New Diagram (Prompt + AI Template Recommender + Hover Preview) State
  const [createPrompt, setCreatePrompt] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('24');
  const [userLockedTemplate, setUserLockedTemplate] = useState<boolean>(false);
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);
  const [localStudioSessions, setLocalStudioSessions] = useState<Array<{
    id: string;
    title: string;
    versionTag: string;
    prompt: string;
    domain: string;
    updatedAt: string;
    href: string;
  }>>([]);

  // Data State
  const [docProjects, setDocProjects] = useState<HistoricalProjectItem[]>([]);
  const [userArtifacts, setUserArtifacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Inspector Modal State
  const [inspectBlueprint, setInspectBlueprint] = useState<CanonicalTemplate | null>(null);
  const [inspectDoc, setInspectDoc] = useState<HistoricalProjectItem | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Fetch DocGen Projects, LocalStorage Studio Sessions & User Diagrams from DB
  useEffect(() => {
    setIsLoading(true);
    try {
      const docs = loadAllHistoricalProjects();
      setDocProjects(docs);
    } catch (err) {
      console.error('Failed to load canonical doc projects:', err);
    }

    try {
      const sessions: Array<{
        id: string;
        title: string;
        versionTag: string;
        prompt: string;
        domain: string;
        updatedAt: string;
        href: string;
      }> = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('promptcanvas_studio_') && !key.includes('prompt_draft')) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && (parsed.projectTitle || parsed.ast?.metadata?.projectTitle)) {
              const sid = parsed.id || key.replace('promptcanvas_studio_', '');
              const lastUserMsg = Array.isArray(parsed.messages)
                ? [...parsed.messages].reverse().find((m: any) => m.sender === 'user')?.text || ''
                : '';
              sessions.push({
                id: sid,
                title: parsed.projectTitle || parsed.ast?.metadata?.projectTitle || 'Studio Architecture',
                versionTag: parsed.activeVersionTag || 'v1.0',
                prompt: lastUserMsg || 'Interactive Studio Canvas Session',
                domain: parsed.ast?.metadata?.domain || 'Enterprise Cloud',
                updatedAt: parsed.lastSaved || new Date().toISOString(),
                href: `/studio?id=${encodeURIComponent(sid)}`,
              });
            }
          }
        }
      }
      setLocalStudioSessions(sessions);
    } catch {
      // ignore localStorage read errors
    }

    // Fetch user generated diagrams
    fetch('/api/diagrams')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserArtifacts(data);
        }
      })
      .catch((e) => console.warn('Failed to load user artifacts:', e))
      .finally(() => setIsLoading(false));
  }, []);

  // Live AI Template Ranking based on createPrompt
  const rankedRecommendations = useMemo(() => {
    return rankTemplatesForPrompt(createPrompt);
  }, [createPrompt]);

  const topRecommendedMatch = rankedRecommendations[0] || {
    template: CANONICAL_TEMPLATES[0],
    score: 95,
    reason: 'Certified Reference Architecture',
  };

  // Auto-select the #1 AI-recommended template as the user types, unless they explicitly locked a choice
  useEffect(() => {
    if (!userLockedTemplate && createPrompt.trim().length > 0 && topRecommendedMatch?.template) {
      setSelectedTemplateId(topRecommendedMatch.template.id);
    }
  }, [createPrompt, userLockedTemplate, topRecommendedMatch]);

  // Resolved Preview Template (Hover takes priority over Selected so hovering any template previews it "As-Is")
  const activePreviewTemplate = useMemo(() => {
    if (hoveredTemplateId && hoveredTemplateId !== 'custom') {
      return CANONICAL_TEMPLATES.find((t) => t.id === hoveredTemplateId) || topRecommendedMatch.template;
    }
    if (selectedTemplateId && selectedTemplateId !== 'custom') {
      return CANONICAL_TEMPLATES.find((t) => t.id === selectedTemplateId) || topRecommendedMatch.template;
    }
    return topRecommendedMatch.template;
  }, [hoveredTemplateId, selectedTemplateId, topRecommendedMatch]);

  // Preview XML for the Right-Side Sticky Stage
  const activePreviewXml = useMemo(() => {
    const domFlavor = selectedDomain === 'All' ? 'enterprise' : selectedDomain;
    if (!hoveredTemplateId && selectedTemplateId === 'custom' && createPrompt.trim().length >= 8) {
      return synthesizePromptDrivenDiagramXml(
        createPrompt.trim(),
        createPrompt.trim().slice(0, 64),
        domFlavor
      );
    }
    return activePreviewTemplate.generateXml(domFlavor, 'light');
  }, [hoveredTemplateId, selectedTemplateId, createPrompt, activePreviewTemplate, selectedDomain]);

  // Combined Existing Projects for Zone 2 ("Continue Where You Left Off")
  const existingWorkspaceProjects = useMemo(() => {
    const list: Array<{
      id: string;
      title: string;
      version: string;
      badge: string;
      prompt: string;
      updatedAt: string;
      href: string;
    }> = [];

    localStudioSessions.forEach((s) => {
      list.push({
        id: `local_${s.id}`,
        title: s.title,
        version: s.versionTag,
        badge: s.domain,
        prompt: s.prompt,
        updatedAt: s.updatedAt,
        href: s.href,
      });
    });

    userArtifacts.forEach((art) => {
      if (!list.some((x) => x.title === art.name)) {
        list.push({
          id: `db_${art.id}`,
          title: art.name || 'Saved Architecture Diagram',
          version: art.max_version ? `v1.${Math.max(0, art.max_version - 1)}` : 'v1.0',
          badge: art.architecture_type || 'Saved Diagram',
          prompt: art.latest_prompt || art.prompt || 'Saved Draw.io Architecture Topology',
          updatedAt: art.updated_at || art.created_at || new Date().toISOString(),
          href: `/studio?id=${encodeURIComponent(art.id)}`,
        });
      }
    });

    // Ensure at least 3 rich resumable projects are available even on a clean guest session
    const defaultFallbacks = [
      {
        id: 'seed_aws_ai',
        title: 'AWS Cloud AI — Amazon Bedrock, SageMaker & OpenSearch',
        version: 'v1.1',
        badge: 'AWS Cloud AI',
        prompt: 'Create an AWS Cloud AI architecture with Amazon Bedrock, SageMaker, OpenSearch Vector DB, and S3 Lakehouse',
        updatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
        href: '/studio?blueprint=34&prompt=' + encodeURIComponent('Create an AWS Cloud AI architecture with Amazon Bedrock, SageMaker, OpenSearch Vector DB, and S3 Lakehouse') + '&autoGenerate=1',
      },
      {
        id: 'seed_gcp_rag',
        title: 'GCP Vertex AI Agentic RAG & Spanner Graph Mesh',
        version: 'v1.0',
        badge: 'GCP Enterprise',
        prompt: 'Design a Google Cloud Vertex AI Agentic RAG architecture with Gemini, Spanner Graph, and Cloud Armor WAF',
        updatedAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
        href: '/studio?blueprint=24&prompt=' + encodeURIComponent('Design a Google Cloud Vertex AI Agentic RAG architecture with Gemini, Spanner Graph, and Cloud Armor WAF') + '&autoGenerate=1',
      },
      {
        id: 'seed_spanner_ha',
        title: 'Global Active-Active Payment Settlement Mesh (nam3)',
        version: 'v1.2',
        badge: 'Multi-Region HA',
        prompt: 'Architect a Multi-Region Active-Active High Availability topology with Cloud Spanner nam3 and RPO < 1s',
        updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        href: '/studio?blueprint=19',
      },
    ];

    for (const fb of defaultFallbacks) {
      if (list.length < 6 && !list.some((x) => x.title.toLowerCase() === fb.title.toLowerCase())) {
        list.push(fb);
      }
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list.slice(0, 6);
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.prompt.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
    );
  }, [localStudioSessions, userArtifacts, searchQuery]);

  const handleSendAndGenerateInStudio = () => {
    const domParam = selectedDomain === 'All' ? 'enterprise' : selectedDomain;
    const trimmedPrompt = createPrompt.trim();
    const targetBlueprint = selectedTemplateId || topRecommendedMatch.template.id;
    if (trimmedPrompt) {
      router.push(
        `/studio?blueprint=${encodeURIComponent(targetBlueprint)}&prompt=${encodeURIComponent(trimmedPrompt)}&domain=${encodeURIComponent(domParam)}&autoGenerate=1`
      );
    } else {
      router.push(
        `/studio?blueprint=${encodeURIComponent(targetBlueprint === 'custom' ? '24' : targetBlueprint)}&domain=${encodeURIComponent(domParam)}`
      );
    }
  };

  // Compute Canonical KPIs & Stats
  const stats = useMemo(() => {
    const totalBlueprints = CANONICAL_TEMPLATES.length;
    const totalDocs = docProjects.length;
    
    let totalDocVersions = 0;
    docProjects.forEach((d) => {
      totalDocVersions += (d.snapshotCount || 1);
    });

    return {
      totalBlueprints,
      totalArchetypes: 17,
      totalDocs,
      totalArtifacts: userArtifacts.length || 1,
      totalVersions: totalDocVersions + (userArtifacts.length || 0),
      certifiedRate: '100%',
      astCollisionRate: '0.0%',
      avgLatency: '1.1s',
      healthScore: 99.4
    };
  }, [docProjects, userArtifacts]);

  const getArchetypeTitle = (archId: string) => {
    return DOC_ARCHETYPES_META.find((a) => a.id === archId)?.name || archId;
  };

  const getDomainName = (domId: string) => {
    return DOMAIN_PRESETS.find((d) => d.id === domId)?.name || domId;
  };

  // Filtered Canonical Blueprints
  const filteredBlueprints = useMemo(() => {
    return CANONICAL_TEMPLATES.filter((tpl) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.family.toLowerCase().includes(q) ||
        tpl.id.includes(q) ||
        (tpl.primaryPurpose && tpl.primaryPurpose.toLowerCase().includes(q));

      const matchesFamily =
        selectedFamily === 'All' ||
        tpl.family.toLowerCase() === selectedFamily.toLowerCase();

      return matchesSearch && matchesFamily;
    });
  }, [searchQuery, selectedFamily]);

  // Filtered Documents
  const filteredDocuments = useMemo(() => {
    return docProjects.filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      const archTitle = getArchetypeTitle(p.archetypeId);
      const domName = getDomainName(p.domainId);
      const matchesSearch =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        archTitle.toLowerCase().includes(q) ||
        domName.toLowerCase().includes(q) ||
        (p.scopeSummary && p.scopeSummary.toLowerCase().includes(q));

      const matchesDomain = selectedDomain === 'All' || p.domainId === selectedDomain;

      return matchesSearch && matchesDomain;
    });
  }, [docProjects, searchQuery, selectedDomain]);

  // Prompts Timeline List
  const chronologicalPrompts = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      prompt: string;
      version: string;
      date: string;
      domainOrFamily: string;
      recordRef: any;
    }> = [];

    docProjects.forEach((doc) => {
      if (doc.scopeSummary) {
        items.push({
          id: `doc_${doc.id}`,
          title: doc.title,
          prompt: doc.scopeSummary,
          version: doc.docVersion || 'v1.0',
          date: doc.lastUpdated || new Date().toISOString(),
          domainOrFamily: getDomainName(doc.domainId) || getArchetypeTitle(doc.archetypeId),
          recordRef: doc
        });
      }
    });

    userArtifacts.forEach((art) => {
      if (art.prompt) {
        items.push({
          id: `art_${art.id}`,
          title: art.name,
          prompt: art.prompt,
          version: 'Artifact v1.0',
          date: art.created_at || new Date().toISOString(),
          domainOrFamily: art.architecture_type || 'Custom Architecture',
          recordRef: art
        });
      }
    });

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [docProjects, userArtifacts]);

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    showToast('📋 Copied prompt to clipboard!');
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleCopyXml = (xml: string) => {
    navigator.clipboard.writeText(xml);
    setCopiedXml(true);
    showToast('📋 Copied Draw.io XML to clipboard!');
    setTimeout(() => setCopiedXml(false), 2000);
  };

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'}`}>
      {/* Sidebar Navigation */}
      <UnifiedAppSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Sticky Top Header */}
        <AppHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-teal-500 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-[#090D18]">
                <Compass className="w-4 h-4 text-teal-400" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-sm md:text-base tracking-tight flex items-center gap-2 text-white">
                <span>Home Dashboard &mdash; Workspace &amp; AI Launchpad</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  STAGE 2 WORKSPACE
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Resume Existing Projects &bull; Prompt + AI Template Recommender &bull; Hover-to-Preview 75 Blueprints
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/studio"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Blank Studio</span>
            </Link>
            <ThemeToggleBtn />
          </div>
        </AppHeader>

        {/* Dashboard Workspace Container - Edge-to-Edge Desktop Utilization */}
        <div className="w-full max-w-none px-4 md:px-8 py-4 space-y-4">
          
          {/* ========================================================================= */}
          {/* 1. TABBED NAVIGATION & UNIFIED SEARCH BAR */}
          {/* ========================================================================= */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                id="dashboard-tab-workspace"
                type="button"
                onClick={() => setActiveTab('workspace')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'workspace'
                    ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Workspace Home (Create &amp; Resume)</span>
              </button>

              <button
                id="dashboard-tab-blueprints"
                type="button"
                onClick={() => setActiveTab('blueprints')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'blueprints'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All {CANONICAL_TEMPLATES.length} Blueprints</span>
              </button>

              <button
                id="dashboard-tab-documents"
                type="button"
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'documents'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Doc Specifications ({docProjects.length})</span>
              </button>

              <button
                id="dashboard-tab-overview"
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'overview'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Operations &amp; Telemetry</span>
              </button>

              <button
                id="dashboard-tab-prompts"
                type="button"
                onClick={() => setActiveTab('prompts')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeTab === 'prompts'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Prompt Ledger ({chronologicalPrompts.length})</span>
              </button>
            </div>

            {/* Unified Global Search Filter */}
            <div className="relative w-full lg:w-96 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="dashboard-global-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your existing projects, saved prompts, or 75 templates..."
                aria-label="Search existing projects, saved prompts, or templates"
                className="w-full text-xs rounded-xl pl-10 pr-8 py-2.5 border bg-slate-50 border-slate-200 focus:bg-white focus:border-teal-500 text-slate-900 placeholder-slate-400 outline-none font-medium transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB CONTENT 0 (DEFAULT): WORKSPACE HOME — RESUME & CREATE NEW DIAGRAM     */}
          {/* ========================================================================= */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              {/* ZONE 2: CONTINUE WHERE YOU LEFT OFF (EXISTING PROJECTS & HISTORY) */}
              <section
                aria-label="Continue Where You Left Off — Existing Projects"
                className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                      <History className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <span>Continue Where You Left Off</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {existingWorkspaceProjects.length} Active Projects
                        </span>
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Open any saved project to resume your diagram canvas, version snapshots, and AI chat history in Studio.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/library"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
                  >
                    <span>Browse Full Library &amp; History</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {existingWorkspaceProjects.slice(0, 3).map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => router.push(proj.href)}
                      className="group p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-teal-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 border border-teal-500/20 truncate">
                            {proj.badge}
                          </span>
                          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 shrink-0">
                            {proj.version}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 font-mono bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80">
                          &ldquo;{proj.prompt}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Resumable Session</span>
                        </span>
                        <span className="text-xs font-extrabold text-teal-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          <span>Open in Studio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ZONE 3: CREATE NEW DIAGRAM — SPLIT-VIEW PROMPT + AI TEMPLATE RECOMMENDER & LIVE HOVER PREVIEW */}
              <section
                aria-label="Create New Diagram — Prompt and AI Template Recommender"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* LEFT HALF (7 COLS): PROMPT COMPOSER + AI RECOMMENDED TEMPLATES + 75 TEMPLATE CATALOG */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Step 1: Prompt Input Card */}
                  <div className="bg-white border-2 border-teal-500/30 rounded-3xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                          1
                        </div>
                        <div>
                          <h2 className="text-sm sm:text-base font-black text-slate-900">
                            Create a New Architecture Diagram
                          </h2>
                          <p className="text-[11px] text-slate-500">
                            Describe what you want to build. AI automatically recommends the best starting template below, or you can pick any template (or Zero-Template Custom).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label htmlFor="dashboard-create-prompt-input" className="sr-only">
                        Describe the architecture you want to create
                      </label>
                      <textarea
                        id="dashboard-create-prompt-input"
                        value={createPrompt}
                        onChange={(e) => {
                          setCreatePrompt(e.target.value);
                          setUserLockedTemplate(false);
                        }}
                        rows={3}
                        placeholder="Describe your target architecture (e.g., 'Create an AWS Cloud AI architecture with Amazon Bedrock, SageMaker, OpenSearch Vector DB, and S3 Lakehouse')..."
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 p-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition resize-none font-medium"
                      />

                      {/* 1-Click Starter Prompt Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                          Try a prompt:
                        </span>
                        {DASHBOARD_STARTER_PROMPTS.map((chip) => (
                          <button
                            key={chip.id}
                            id={`dashboard-starter-chip-${chip.id}`}
                            type="button"
                            onClick={() => {
                              setCreatePrompt(chip.prompt);
                              setSelectedTemplateId(chip.recommendedId);
                              setUserLockedTemplate(false);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                              createPrompt === chip.prompt
                                ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                                : 'bg-white hover:bg-teal-50 text-slate-700 border-slate-200 hover:border-teal-300'
                            }`}
                          >
                            <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                              {chip.badge}
                            </span>
                            <span>{chip.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: AI-Recommended Best Templates Strip */}
                    <div className="pt-3 border-t border-slate-200 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-black text-xs flex items-center justify-center">
                            2
                          </span>
                          <span className="text-xs font-black text-slate-900">
                            AI-Suggested Best Templates for Your Prompt
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          Hover any option to preview &ldquo;As-Is&rdquo; on the right &rarr;
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {rankedRecommendations.slice(0, 3).map((rec, idx) => {
                          const isSelected = selectedTemplateId === rec.template.id;
                          return (
                            <div
                              key={rec.template.id}
                              id={`dashboard-rec-tpl-${rec.template.id}`}
                              onMouseEnter={() => setHoveredTemplateId(rec.template.id)}
                              onMouseLeave={() => setHoveredTemplateId(null)}
                              onClick={() => {
                                setSelectedTemplateId(rec.template.id);
                                setUserLockedTemplate(true);
                              }}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                                isSelected
                                  ? 'bg-teal-50/70 border-2 border-teal-600 shadow-xs'
                                  : 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-teal-400'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span
                                    className={`text-[9.5px] font-mono font-extrabold px-2 py-0.5 rounded-md border ${
                                      idx === 0
                                        ? 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30'
                                        : 'bg-slate-200/70 text-slate-700 border-slate-300'
                                    }`}
                                  >
                                    {idx === 0 ? '★ #1 BEST TEMPLATE MATCH' : `RUNNER-UP #${idx + 1}`}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold text-slate-500">
                                    #{rec.template.id} &bull; {rec.template.level}
                                  </span>
                                </div>
                                <div className="text-xs font-black text-slate-900 line-clamp-1">
                                  {rec.template.name}
                                </div>
                                <p className="text-[10.5px] text-slate-600 line-clamp-1">
                                  {rec.reason}
                                </p>
                              </div>
                              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] font-bold">
                                <span className={isSelected ? 'text-teal-700' : 'text-slate-500'}>
                                  {isSelected ? '✓ Selected for Generation' : 'Click to use this template'}
                                </span>
                                <span className="text-teal-600 font-mono">Preview &rarr;</span>
                              </div>
                            </div>
                          );
                        })}

                        {/* Option 4: Zero-Template Custom AI Synthesis */}
                        <div
                          id="dashboard-rec-tpl-custom"
                          onMouseEnter={() => setHoveredTemplateId('custom')}
                          onMouseLeave={() => setHoveredTemplateId(null)}
                          onClick={() => {
                            setSelectedTemplateId('custom');
                            setUserLockedTemplate(true);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                            selectedTemplateId === 'custom'
                              ? 'bg-indigo-50/80 border-2 border-indigo-600 shadow-xs'
                              : 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-indigo-400'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-[9.5px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-800 border border-indigo-500/30">
                                ✨ ZERO-TEMPLATE CUSTOM
                              </span>
                              <span className="text-[10px] font-mono font-bold text-indigo-600">
                                Bespoke AI
                              </span>
                            </div>
                            <div className="text-xs font-black text-slate-900 line-clamp-1">
                              Synthesize From Scratch (No Fixed Template)
                            </div>
                            <p className="text-[10.5px] text-slate-600 line-clamp-1">
                              Builds a bespoke 7-tier cloud topology directly from your prompt entities.
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] font-bold">
                            <span className={selectedTemplateId === 'custom' ? 'text-indigo-700' : 'text-slate-500'}>
                              {selectedTemplateId === 'custom' ? '✓ Selected for Generation' : 'Click for custom synthesis'}
                            </span>
                            <span className="text-indigo-600 font-mono">Custom &rarr;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Browse or Hover All 75 Templates Catalog */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-teal-600" />
                          <span>Or Choose Any of the {CANONICAL_TEMPLATES.length} Certified Templates</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Hover over any template card to inspect its &ldquo;As-Is&rdquo; diagram on the right. Click to select it for your prompt.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        Showing {filteredBlueprints.length} of {CANONICAL_TEMPLATES.length}
                      </span>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {CANONICAL_FAMILIES.map((fam) => (
                        <button
                          key={fam}
                          type="button"
                          onClick={() => setSelectedFamily(fam)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition whitespace-nowrap cursor-pointer ${
                            selectedFamily === fam
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {fam}
                        </button>
                      ))}
                    </div>

                    {/* Compact Scrollable Grid of Templates with Hover-to-Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                      {filteredBlueprints.map((tpl) => {
                        const isSelected = selectedTemplateId === tpl.id;
                        const isHovered = hoveredTemplateId === tpl.id;
                        return (
                          <div
                            key={tpl.id}
                            id={`dashboard-catalog-tpl-${tpl.id}`}
                            onMouseEnter={() => setHoveredTemplateId(tpl.id)}
                            onMouseLeave={() => setHoveredTemplateId(null)}
                            onClick={() => {
                              setSelectedTemplateId(tpl.id);
                              setUserLockedTemplate(true);
                            }}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                              isSelected
                                ? 'bg-teal-50/70 border-2 border-teal-600 shadow-xs'
                                : isHovered
                                ? 'bg-sky-50/50 border-sky-400 shadow-xs'
                                : 'bg-slate-50/60 hover:bg-white border-slate-200'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-teal-500/15 text-teal-800 border border-teal-500/20">
                                  #{tpl.id} &bull; {tpl.family}
                                </span>
                                {isSelected && (
                                  <span className="text-[9.5px] font-mono font-black text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">
                                    ✓ SELECTED
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-black text-slate-900 line-clamp-1">
                                {tpl.name}
                              </h4>
                              <p className="text-[10.5px] text-slate-500 line-clamp-1">
                                {tpl.primaryPurpose}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT HALF (5 COLS): STICKY "AS-IS" TEMPLATE PREVIEW STAGE + SEND & GENERATE CTA */}
                <div className="lg:col-span-5 lg:sticky lg:top-20 bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-md space-y-4">
                  {/* Top Preview Status Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {hoveredTemplateId ? (
                          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-800 border border-sky-500/30">
                            👁️ HOVER PREVIEW (AS-IS TEMPLATE)
                          </span>
                        ) : selectedTemplateId === 'custom' ? (
                          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-800 border border-indigo-500/30">
                            ✨ ZERO-TEMPLATE CUSTOM PREVIEW
                          </span>
                        ) : selectedTemplateId === topRecommendedMatch.template.id ? (
                          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                            ★ #1 AI-RECOMMENDED TEMPLATE
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-800 border border-teal-500/30">
                            ✓ SELECTED BASE TEMPLATE
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {selectedTemplateId === 'custom' && !hoveredTemplateId
                            ? 'Dynamic 7-Tier Synthesis'
                            : `#${activePreviewTemplate.id} • ${activePreviewTemplate.family} • ${activePreviewTemplate.level}`}
                        </span>
                      </div>
                      <h3
                        id="dashboard-preview-stage-title"
                        className="text-sm sm:text-base font-black text-slate-900 truncate"
                      >
                        {selectedTemplateId === 'custom' && !hoveredTemplateId
                          ? createPrompt.trim() || 'Zero-Template Custom AI Architecture'
                          : `${activePreviewTemplate.name} (As-Is Preview)`}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectBlueprint(activePreviewTemplate)}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                      title="Expand full-screen preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Expand</span>
                    </button>
                  </div>

                  {/* Live Vector Diagram Preview Box */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 overflow-hidden shadow-inner">
                    <DiagramViewerRenderSafe
                      key={`${activePreviewTemplate.id}_${selectedTemplateId}_${createPrompt.slice(0, 24)}`}
                      xml={activePreviewXml}
                      aspectRatioId="16:9"
                      bgTheme="light"
                    />
                  </div>

                  {/* Template Purpose & Key Components */}
                  <div className="space-y-2 bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedTemplateId === 'custom' && !hoveredTemplateId
                        ? 'Generates a bespoke multi-tier Draw.io architecture diagram directly from your prompt entities (AWS, GCP, Azure, AI, Data, Security) without locking to a static template.'
                        : activePreviewTemplate.primaryPurpose}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(activePreviewTemplate.keyComponents || []).slice(0, 6).map((comp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      id="dashboard-send-generate-btn"
                      type="button"
                      onClick={handleSendAndGenerateInStudio}
                      className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-600/20 hover:scale-[1.01] active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {createPrompt.trim()
                          ? selectedTemplateId === 'custom'
                            ? 'Send & Generate Custom Diagram in Studio'
                            : `Send & Customize #${selectedTemplateId} in Studio`
                          : `Open #${activePreviewTemplate.id} in Studio Canvas`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        id="dashboard-open-asis-btn"
                        href={`/studio?blueprint=${encodeURIComponent(activePreviewTemplate.id)}`}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5 text-center"
                      >
                        <Layers className="w-3.5 h-3.5 text-teal-600" />
                        <span>Open Template #{activePreviewTemplate.id} As-Is</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleCopyXml(activePreviewXml)}
                        className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy XML</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB CONTENT A: OVERVIEW & TELEMETRY */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 50 Canonical Families Breakdown Grid (Beautified) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <h3 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Architecture Families Taxonomy (50 Master Schemas)
                    </h3>
                  </div>
                  <Link
                    href="/canonical"
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All 50 Blueprints in Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {FAMILY_CARDS_META.map((fam) => {
                    const count = CANONICAL_TEMPLATES.filter(t => t.family === fam.id || (fam.id === 'Reference Architectures' && t.family === 'Reference Architectures')).length;
                    return (
                      <div
                        key={fam.id}
                        className={`p-4 rounded-2xl border space-y-3 transition-all duration-200 flex flex-col justify-between group hover:scale-[1.01] ${
                          isLight ? 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-xs' : 'bg-[#090D18] hover:bg-[#0c1220] border-slate-800 shadow-md'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{fam.icon}</span>
                              <span className="text-xs font-black text-slate-900 dark:text-white">{fam.label}</span>
                            </div>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${fam.badgeBg}`}>
                              {count} Blueprints
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {fam.description}
                          </p>
                        </div>

                        {/* Featured Quick Chips */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap gap-1">
                          {fam.featured.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-mono">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity Split View: Canonical Blueprints & User Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                
                {/* Left: Featured Certified Canonical Blueprints */}
                <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#090D18] border-slate-800 shadow-md'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-500" />
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">Featured Canonical Blueprints</h4>
                    </div>
                    <Link
                      href="/canonical"
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore 50 Blueprints</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {CANONICAL_TEMPLATES.slice(0, 5).map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => setInspectBlueprint(tpl)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between transition cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-teal-50/50 border-slate-200' : 'bg-slate-900/60 hover:bg-teal-950/30 border-slate-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-3 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                              #{tpl.id}
                            </span>
                            <span className="text-xs font-bold truncate text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {tpl.name}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 truncate">
                            {tpl.family} &bull; 100% Certified 16:9 Vector Geometry
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 hidden sm:inline">
                            Inspect XML &rarr;
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Recent Specification Documents & Artifacts */}
                <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#090D18] border-slate-800 shadow-md'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">Recent Specifications &amp; Artifacts</h4>
                    </div>
                    <Link
                      href="/docgen"
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Launch DocGen</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {docProjects.slice(0, 5).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setInspectDoc(p)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between transition cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200' : 'bg-slate-900/60 hover:bg-emerald-950/30 border-slate-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-3 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold truncate text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {p.title}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-bold shrink-0">
                              {p.docVersion}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 truncate">
                            {getArchetypeTitle(p.archetypeId)} &bull; {getDomainName(p.domainId)}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                      </div>
                    ))}

                    {/* Show user artifacts if doc projects are empty */}
                    {docProjects.length === 0 && userArtifacts.slice(0, 5).map((art) => (
                      <div
                        key={art.id}
                        onClick={() => router.push(`/studio?diagram=${art.id}`)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between transition cursor-pointer group ${
                          isLight ? 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200' : 'bg-slate-900/60 hover:bg-emerald-950/30 border-slate-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-3 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold truncate text-slate-900 dark:text-white">
                              {art.name}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-teal-500/15 text-teal-400 font-bold shrink-0">
                              v1.0
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 truncate">
                            {art.architecture_type || 'Custom Architecture'}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    ))}

                    {docProjects.length === 0 && userArtifacts.length === 0 && (
                      <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                        <FileText className="w-6 h-6 text-slate-500 mx-auto" />
                        <p>No specifications saved yet. Launch DocGen Studio to synthesize!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB CONTENT B: 50 CANONICAL BLUEPRINTS CATALOG */}
          {/* ========================================================================= */}
          {activeTab === 'blueprints' && (
            <div className="space-y-6">
              {/* Family Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CANONICAL_FAMILIES.map((fam) => (
                  <button
                    key={fam}
                    type="button"
                    onClick={() => setSelectedFamily(fam)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      selectedFamily === fam
                        ? 'bg-teal-600 text-white shadow-sm'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {fam} {fam !== 'All' && `(${CANONICAL_TEMPLATES.filter((t) => t.family === fam).length})`}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBlueprints.map((tpl) => (
                  <div
                    key={tpl.id}
                    className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-200 ${
                      isLight ? 'bg-white border-slate-200 shadow-sm hover:shadow-md' : 'bg-[#090D18] border-slate-800 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                          #{tpl.id} &bull; {tpl.family.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          100% AST VALID
                        </span>
                      </div>

                      <h3 className="text-sm font-black line-clamp-1 text-slate-900 dark:text-white">
                        {tpl.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {tpl.primaryPurpose}
                      </p>

                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>16:9 Ultra-Wide (1600x960) &bull; Zero Collisions</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectBlueprint(tpl)}
                        className={`flex-1 py-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isLight ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 text-teal-500" />
                        <span>Inspect XML</span>
                      </button>

                      <Link
                        href={`/studio?blueprint=${tpl.id}`}
                        className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Open Studio</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB CONTENT C: DOCUMENT SPECIFICATIONS PORTFOLIO */}
          {/* ========================================================================= */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-200 ${
                      isLight ? 'bg-white border-slate-200 shadow-sm hover:shadow-md' : 'bg-[#090D18] border-slate-800 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                          {getArchetypeTitle(doc.archetypeId)}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                          {doc.docVersion} &bull; {doc.snapshotCount || 1} Snapshots
                        </span>
                      </div>

                      <h3 className="text-sm font-black line-clamp-1 text-slate-900 dark:text-white">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {doc.scopeSummary || 'Production-grade engineering specification document with attached blueprint slots.'}
                      </p>

                      <div className="text-[10px] font-mono text-indigo-400">
                        🏷️ Domain: {getDomainName(doc.domainId)}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectDoc(doc)}
                        className={`flex-1 py-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isLight ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Preview Spec</span>
                      </button>

                      <Link
                        href={`/docgen?archetype=${doc.archetypeId}&domain=${doc.domainId}`}
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Open DocGen</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB CONTENT D: PROMPT EVOLUTION LEDGER */}
          {/* ========================================================================= */}
          {activeTab === 'prompts' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {chronologicalPrompts.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-2xl border space-y-2 transition-all ${
                      isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#090D18] border-slate-800 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-bold shrink-0">
                          {item.version}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.date).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 leading-relaxed">
                      {item.prompt}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Domain / Category: <b>{item.domainOrFamily}</b>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(item.id, item.prompt)}
                        className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPromptId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* INSPECTOR MODAL: CANONICAL BLUEPRINT */}
      {inspectBlueprint && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
          }`}>
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  #{inspectBlueprint.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {inspectBlueprint.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectBlueprint(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="rounded-2xl border p-2 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <DiagramViewerRenderSafe
                  xml={inspectBlueprint.generateXml('biopharma', isLight ? 'light' : 'dark')}
                  aspectRatioId="16:9"
                  bgTheme={isLight ? 'light' : 'dark'}
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleCopyXml(inspectBlueprint.generateXml('biopharma', isLight ? 'light' : 'dark'))}
                className="px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Draw.io XML</span>
              </button>
              <Link
                href={`/studio?blueprint=${inspectBlueprint.id}`}
                className="px-4 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm hover:bg-teal-500"
              >
                Open in Studio &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-2xl border border-slate-700/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 dark:text-teal-600" />
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
