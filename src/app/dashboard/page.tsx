'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Network, 
  ArrowRight, 
  Shield, 
  User,
  Users, 
  Layers, 
  Database,
  Search,
  FileText,
  Sparkles,
  BarChart3,
  Loader2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ShieldAlert,
  Settings,
  Mail,
  ClipboardList,
  BookOpen,
  Upload,
  FileCode,
  ShieldCheck,
  ChevronDown,
  Compass,
  RefreshCw,
  History,
  X,
  Settings2,
  Menu,
  RotateCcw
} from 'lucide-react';
import { ContactUsModal } from '@/components/ContactUsModal';
import { AIGenerationProgressModal } from '@/components/AIGenerationProgressModal';
import { AuthModal } from '@/components/AuthModal';
import { UseCaseIntakeModal } from '@/components/UseCaseIntakeModal';
import { checkDiagramStaleness } from '@/lib/diagramStaleness';
import { TEMPLATE_CATALOG_ITEMS } from '@/lib/templateCategories';
import { generateUniqueProjectName, generateUniqueDiagramName } from '@/app/workspace/page';
import {
  PHASE_NAME_OPTIONS,
  ARCHITECTURE_DOMAIN_OPTIONS,
  ABSTRACTION_LEVEL_OPTIONS,
  ARCHITECTURAL_STACK_LAYER_OPTIONS,
  DEFAULT_LAYOUT_DIRECTION_OPTIONS,
  SALES_CYCLE_STAGE_OPTIONS,
  LIFECYCLE_PHASE_OPTIONS,
  BLUEPRINT_KNOWLEDGE_MATRIX,
  getBlueprintMetadataById,
  getFacetedBlueprintFilters
} from '@/lib/blueprintKnowledgeMatrix';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';

interface Diagram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersion[];
  xml_content?: string;
  prompt?: string | null;
  architecture_type?: string | null;
}

interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
  prompt?: string | null;
  ai_reasoning?: string | null;
  business_usecase?: string | null;
  technical_usecase?: string | null;
}

const TEMPLATE_PROMPTS = [
  {
    name: "Clean Slate (Empty Workspace)",
    prompt: "Act as an Enterprise Cloud Architect. Design a multi-tier cloud system architecture."
  },
  {
    name: "Serverless Web Application (GCP)",
    prompt: "Act as a GCP Cloud Architect. Design a serverless web application architecture. It should include: a Global HTTPS Load Balancer, Cloud CDN, Cloud Run for the frontend/backend services, Cloud SQL (PostgreSQL) for relational data, and Cloud Storage for static media assets."
  },
  {
    name: "Real-time Streaming Analytics (GCP)",
    prompt: "Act as a GCP Data Architect. Design a real-time streaming data analytics pipeline. It should ingest streaming data via Pub/Sub, process it with Cloud Dataflow, store the structured results in BigQuery, and visualize it with Looker."
  },
  {
    name: "Microservices Kubernetes Cluster (AWS)",
    prompt: "Act as an AWS Solutions Architect. Design a microservices architecture hosted on EKS (Elastic Kubernetes Service). It should include: an Application Load Balancer, Amazon API Gateway, EKS worker nodes running services, RDS PostgreSQL for main DB, DynamoDB for session state, and ElastiCache Redis for caching."
  },
  {
    name: "Data Lakehouse (AWS)",
    prompt: "Act as an AWS Data Architect. Design a modern Data Lakehouse architecture. It should include: raw/processed data landing zones in Amazon S3, AWS Glue Catalog for schema registry, AWS Athena for ad-hoc querying, Amazon Redshift for data warehousing, and Amazon QuickSight for business intelligence."
  },
  {
    name: "Enterprise LLM Evaluation, Toxicity & Safety Benchmarking (7-Tier Platform)",
    prompt: "Act as an AI Safety Architect. Design a 7-tier widescreen Enterprise LLM Evaluation, Toxicity & Safety Benchmarking platform (eval_safety_benchmarking). Include: User Input & Query Ingestion, Automated Toxicity & Red-Teaming Screening, Model Evaluation Engine, Human & Automated Scoring Tier, Grounding & Bias Verdict Router, Security Audit & Evidence Log, and Feedback Loop."
  },
  {
    name: "Multi-Agent AI & LLM Orchestration Platform (Vertex AI / LangGraph)",
    prompt: "Act as an AI Orchestration Architect. Design a multi-agent AI platform using Vertex AI and LangGraph. Include: Master Agent Router, Autonomous Worker Agents (Research, Code, Validation), Tool Execution Sandbox, Vector Memory Store (pgvector), and Human-in-the-Loop Approval Gate."
  },
  {
    name: "FinTech Real-Time Core Transaction Ledger (PCI-DSS Active-Active)",
    prompt: "Act as a FinTech Solutions Architect. Design a PCI-DSS compliant core banking & transaction ledger platform. Include: API Gateway with Web Application Firewall, Real-time Fraud Detection ML Pipeline, Cloud Spanner Active-Active multi-region database, Immutable Audit Ledger, and KMS Hardware Security Modules."
  },
  {
    name: "Zero-Trust Multi-Cloud Enterprise Security & SASE (GCP/AWS)",
    prompt: "Act as an Enterprise Security Architect. Design a Zero-Trust Multi-Cloud architecture. Include: BeyondCorp Identity-Aware Proxy (IAP), Cloud Armor WAF, VPC Service Controls perimeter, IAM Role Federation, Security Command Center telemetry, and HSM Key Management."
  },
  {
    name: "DevSecOps GitOps Automated Cloud Delivery (ArgoCD + Terraform HCL)",
    prompt: "Act as a DevSecOps Architect. Design an enterprise GitOps deployment pipeline. Include: GitHub repository push triggering Automated SAST Security Scanning, Terraform Plan dry-run validation, ArgoCD GitOps sync to GKE/EKS Kubernetes clusters, and Automated Rollback on metric alerts."
  }
];

import { UserProfileModal } from '@/components/UserProfileModal';
import { AccessRequestsInbox } from '@/components/AccessRequestsInbox';
import { ARCHITECTURE_TYPES, BUSINESS_ARCHITECTURE_TYPES, TECHNICAL_ARCHITECTURE_TYPES, getArchitectureTypeById, getDefaultXmlForArchitecture } from '@/lib/architectureTypes';

export default function Dashboard() {
  const router = useRouter();
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [scopeTab, setScopeTab] = useState<'my_workspaces' | 'community'>('my_workspaces');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string; name?: string | null; is_guest?: boolean } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isGuestDisclaimerDismissed, setIsGuestDisclaimerDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('promptcanvas_dismiss_guest_disclaimer') === 'true';
      } catch (e) {}
    }
    return false;
  });
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>(() => generateUniqueProjectName());
  const [newDiagramName, setNewDiagramName] = useState('');
  const [newDiagramPrompt, setNewDiagramPrompt] = useState('');
  const [selectedArchType, setSelectedArchType] = useState('conceptual_diagram');
  const [selectedTemplate, setSelectedTemplate] = useState('0');
  const [isCreating, setIsCreating] = useState(false);
  const [isUseCaseModalOpen, setIsUseCaseModalOpen] = useState(false);

  // 🏛️ 7 Architectural Classification & Lifecycle Dropdown States (Cascading Facets)
  const [selectedPhaseName, setSelectedPhaseName] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedAbstractionLevel, setSelectedAbstractionLevel] = useState<string>('ALL');
  const [selectedStackLayer, setSelectedStackLayer] = useState<string>('ALL');
  const [selectedLayoutDirection, setSelectedLayoutDirection] = useState<string>('ALL');
  const [selectedSalesCycleStage, setSelectedSalesCycleStage] = useState<string>('ALL');
  const [selectedLifecyclePhase, setSelectedLifecyclePhase] = useState<string>('ALL');

  const facetedOptions = useMemo(() => {
    return getFacetedBlueprintFilters({
      phaseName: selectedPhaseName === 'ALL' ? undefined : selectedPhaseName,
      domain: selectedDomain === 'ALL' ? undefined : selectedDomain,
      abstractionLevel: selectedAbstractionLevel === 'ALL' ? undefined : selectedAbstractionLevel,
      stackLayer: selectedStackLayer === 'ALL' ? undefined : selectedStackLayer,
      defaultDirection: selectedLayoutDirection === 'ALL' ? undefined : (selectedLayoutDirection.startsWith('TD') ? 'TD' : selectedLayoutDirection.startsWith('LR') ? 'LR' : selectedLayoutDirection),
      salesStage: selectedSalesCycleStage === 'ALL' ? undefined : selectedSalesCycleStage,
      lifecyclePhase: selectedLifecyclePhase === 'ALL' ? undefined : selectedLifecyclePhase,
    });
  }, [
    selectedPhaseName,
    selectedDomain,
    selectedAbstractionLevel,
    selectedStackLayer,
    selectedLayoutDirection,
    selectedSalesCycleStage,
    selectedLifecyclePhase
  ]);

  const handleResetFilters = () => {
    setSelectedPhaseName('ALL');
    setSelectedDomain('ALL');
    setSelectedAbstractionLevel('ALL');
    setSelectedStackLayer('ALL');
    setSelectedLayoutDirection('ALL');
    setSelectedSalesCycleStage('ALL');
    setSelectedLifecyclePhase('ALL');
  };

  const syncDimensionsForBlueprint = (archId: string) => {
    const meta = getBlueprintMetadataById(archId);
    if (meta) {
      if (meta.phaseName) setSelectedPhaseName(meta.phaseName);
      if (meta.domain) setSelectedDomain(meta.domain);
      if (meta.abstractionLevel) setSelectedAbstractionLevel(meta.abstractionLevel);
      if (meta.stackLayer) setSelectedStackLayer(meta.stackLayer);
      if (meta.defaultDirection) setSelectedLayoutDirection(meta.defaultDirection === 'TD' ? 'TD' : 'LR');
      if (meta.salesStage) setSelectedSalesCycleStage(meta.salesStage);
      if (meta.lifecyclePhase) setSelectedLifecyclePhase(meta.lifecyclePhase);
    }
  };

  const earlierProjects = useMemo(() => {
    const names = new Set<string>();
    diagrams.forEach((d) => {
      if (d.name) names.add(d.name);
    });
    return Array.from(names);
  }, [diagrams]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const fetchDiagrams = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diagrams');
      if (!res.ok) throw new Error('Failed to fetch diagrams');
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.diagrams || []);
      setDiagrams(list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    setTimeout(() => {
      fetchDiagrams();
    }, 0);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsProfileModalOpen(false);
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const [refreshingDiagramIds, setRefreshingDiagramIds] = useState<Set<string>>(new Set());
  const [refreshToast, setRefreshToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const handleDeleteDiagram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this architecture workspace?')) return;
    
    try {
      const res = await fetch(`/api/diagrams/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete diagram');
      setDiagrams(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting diagram');
    }
  };

  const handleForceRefreshDiagram = async (diagramId: string, diagramName: string, architectureType?: string | null, prompt?: string | null, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setRefreshingDiagramIds(prev => new Set(prev).add(diagramId));
    setRefreshToast({ message: `⚡ Calling Live API to force-refresh "${diagramName}" from Master Template...`, type: 'info' });

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagramId,
          name: diagramName,
          architectureType: architectureType || 'conceptual_diagram',
          prompt: prompt || diagramName,
          forceRefresh: true,
          forceFreshMaster: true
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Failed to force-refresh diagram');
      }

      await fetchDiagrams();
      setRefreshToast({ message: `✅ Successfully Force-Refreshed "${diagramName}" from Master Template via Live API!`, type: 'success' });
      setTimeout(() => setRefreshToast(null), 4000);
    } catch (err: any) {
      console.error('Force refresh error:', err);
      setRefreshToast({ message: `❌ Error force-refreshing diagram: ${err.message}`, type: 'error' });
      setTimeout(() => setRefreshToast(null), 5000);
    } finally {
      setRefreshingDiagramIds(prev => {
        const next = new Set(prev);
        next.delete(diagramId);
        return next;
      });
    }
  };

  const handleCreateDiagram = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalDiagramName = newDiagramName.trim() || newProjectName.trim() || generateUniqueDiagramName();
    setIsCreating(true);

    try {
      const defaultXml = getDefaultXmlForArchitecture(selectedArchType, finalDiagramName, finalDiagramName);

      const promptToGenerate = newDiagramPrompt.trim();

      if (promptToGenerate) {
        // AI Generated Version 1 directly!
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: finalDiagramName,
            prompt: promptToGenerate,
            architectureType: selectedArchType,
            phaseName: selectedPhaseName,
            domain: selectedDomain,
            abstractionLevel: selectedAbstractionLevel,
            stackLayer: selectedStackLayer,
            layoutDirection: selectedLayoutDirection,
            salesStage: selectedSalesCycleStage,
            lifecyclePhase: selectedLifecyclePhase
          })
        });

        if (!res.ok) throw new Error('Failed to generate diagram');
        const data = await res.json();
        
        setIsCreateModalOpen(false);
        setNewProjectName(generateUniqueProjectName());
        setNewDiagramName('');
        setNewDiagramPrompt('');
        router.push(`/workspace?diagram=${data.diagram.id}`);
        return;
      }

      // Clean Slate Version 1
      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: finalDiagramName,
          xml: defaultXml,
          comment: 'Initial canvas created',
          architectureType: selectedArchType
        })
      });

      if (!res.ok) throw new Error('Failed to create diagram');
      const newDiagram = await res.json();
      
      setIsCreateModalOpen(false);
      setNewProjectName(generateUniqueProjectName());
      setNewDiagramName('');
      setNewDiagramPrompt('');
      router.push(`/workspace?diagram=${newDiagram.diagram.id}`);
    } catch (err) {
      console.error(err);
      alert('Error creating diagram');
    } finally {
      setIsCreating(false);
    }
  };

  // Filter and deduplicate diagrams based on search and unique IDs
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>('editor');

  const myCanvasesList = React.useMemo(() => {
    return diagrams.filter(d => {
      if (user?.id && (d as any).user_id === user.id) return true;
      if (user?.email && (d as any).created_by === user.email) return true;
      return false;
    });
  }, [diagrams, user]);

  const filteredDiagrams = React.useMemo(() => {
    const baseSource = scopeTab === 'my_workspaces' ? myCanvasesList : diagrams;
    const seen = new Set<string>();
    return baseSource.filter(d => {
      if (!d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (seen.has(d.id)) return false;
      seen.add(d.id);
      return true;
    });
  }, [diagrams, myCanvasesList, scopeTab, searchQuery]);

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans relative selection:bg-teal-500/30 selection:text-teal-200 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070a13] text-slate-100'
    }`}>
      
      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar />

      {/* Main Dashboard Portal Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto relative">
        {/* Background radial overlays */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none z-0" />

        {/* Blueprint Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none z-0" />

        {/* Header Bar */}
        <header className={`w-full border-b h-16 backdrop-blur-md px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between sticky top-0 z-30 shrink-0 transition-colors ${
          isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-panel-border/30 bg-[#070a13]/80 text-white'
        }`}>
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-xl border shrink-0 cursor-pointer ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-panel-border text-slate-300 hover:text-teal-400'
            }`}
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <Link href="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" title="Home">
              PromptCanvas
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5 truncate">
              <BarChart3 className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Operations Dashboard</span>
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
              Telemetry &amp; Governance
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/canonical"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Canonical Blueprints Hub"
          >
            <span>Canonical Hub</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500/20 font-mono font-bold text-sky-600 dark:text-sky-400">50</span>
          </Link>

          <Link
            href="/docgen"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="DocGen Studio & Specifications"
          >
            <span>DocGen Hub</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/20 font-mono font-bold text-indigo-600 dark:text-indigo-400">17</span>
          </Link>

          <ThemeToggleBtn id="dashboard-theme-toggle-btn" />
          {user && (
            <>
              <AccessRequestsInbox user={user} />
              <button
                id="dashboard-user-profile-btn"
                onClick={() => setIsProfileModalOpen(true)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    : 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-200'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-xs">
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{user.name || user.email}</span>
              </button>
            </>
          )}

          <button
            id="new-diagram-btn"
            onClick={() => {
              setNewDiagramName('');
              setNewDiagramPrompt('');
              setSelectedTemplate('0');
              setIsCreateModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-teal-accent hover:bg-teal-hover text-bg-dark font-extrabold text-xs tracking-wide transition-all shadow-md shadow-teal-500/15 hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Architecture</span>
          </button>
        </div>
      </header>

      {user?.is_guest && !isGuestDisclaimerDismissed && (
        <div className={`w-full border-b py-2.5 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm backdrop-blur-md z-40 shrink-0 animate-fade-in ${
          isLight
            ? 'bg-amber-50/95 border-amber-300 text-amber-950 shadow-sm'
            : 'bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-indigo-500/15 border-amber-500/30 text-amber-200'
        }`}>
          <div className="flex items-center gap-2 font-medium min-w-0">
            <ShieldAlert className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span className="truncate sm:whitespace-normal">
              <strong className={`font-bold ${isLight ? 'text-amber-950 font-black' : 'text-amber-300'}`}>Guest Mode Disclaimer:</strong>{' '}
              <span className={isLight ? 'text-amber-900 font-medium' : 'text-amber-200'}>
                Content created as a Guest is visible to all users unless deleted.
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setIsAuthOpen(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#070a13] font-black rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs hover:scale-[1.02]"
            >
              <User className="w-3.5 h-3.5" />
              <span>Create Login Profile to Keep Private</span>
            </button>
            <button
              onClick={() => {
                setIsGuestDisclaimerDismissed(true);
                if (typeof window !== 'undefined') {
                  try {
                    sessionStorage.setItem('promptcanvas_dismiss_guest_disclaimer', 'true');
                  } catch (e) {}
                }
              }}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isLight
                  ? 'hover:bg-amber-200/60 text-amber-800 hover:text-amber-950'
                  : 'hover:bg-amber-500/20 text-amber-300 hover:text-white'
              }`}
              title="Dismiss warning"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {isCreating && (
        <div className={`w-full border-b py-2 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-center gap-2 text-xs font-semibold animate-pulse z-40 shrink-0 ${
          isLight
            ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
            : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
        }`}>
          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
          <span>⚡ Gemini API active: Please wait for current generation to complete before starting another request.</span>
        </div>
      )}

      {/* Main Portal View */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 space-y-4 relative z-10">
        
        {/* Compact Page Title Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-3.5 border-b border-slate-200 dark:border-slate-800 min-w-0">
          <div className="space-y-1 flex-1 min-w-0">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Enterprise Operations Portal</h1>
            <p className={`text-xs leading-normal line-clamp-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>High-level telemetry, security compliance matrices, and active diagram workspaces.</p>
          </div>
          
          {/* Compact Telemetry Box */}
          <div className={`flex items-center gap-4 border rounded-xl px-4 py-2 shadow-xs backdrop-blur-sm shrink-0 w-full sm:w-auto ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/60 border-panel-border/30 text-white'
          }`}>
            <div className="text-center">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Compliance</span>
              <span className="text-base font-black text-teal-600 dark:text-teal-accent flex items-center gap-1 mt-0.5 justify-center">
                <Shield className="w-4 h-4 text-teal-600 dark:text-teal-accent" />
                <span>94.2%</span>
              </span>
            </div>
            <div className={`h-8 w-[1px] ${isLight ? 'bg-slate-200' : 'bg-panel-border/50'}`} />
            <div className="text-center">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Blueprints</span>
              <span className={`text-base font-black mt-0.5 block ${isLight ? 'text-slate-900' : 'text-white'}`}>{diagrams.length > 0 ? `${diagrams.length} Stacks` : '0 Stacks'}</span>
            </div>
          </div>
        </div>

        {/* 1. Summary Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              name: "Active Workspaces",
              value: scopeTab === 'my_workspaces' ? myCanvasesList.length : diagrams.length,
              sub: scopeTab === 'my_workspaces' ? "In your active workspace" : "Total enterprise blueprints & canvases",
              icon: Layers,
              color: "text-teal-600 dark:text-teal-400 bg-teal-500/10",
              border: "hover:border-teal-500/35 hover:shadow-teal-500/5"
            },
            {
              name: "Security Health Index",
              value: "A- Grade",
              sub: "Compliance rating active",
              icon: Shield,
              color: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
              border: "hover:border-purple-500/35 hover:shadow-purple-500/5"
            },
            {
              name: "Active Team Nodes",
              value: diagrams.length > 0 ? `${diagrams.length + 3} Worker Nodes` : "3 Gateway Nodes",
              sub: "DevOps, SecOps, Core Infrastructure",
              icon: Users,
              color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
              border: "hover:border-indigo-500/35 hover:shadow-indigo-500/5"
            },
            {
              name: "Data & Persistence Layer",
              value: "Enterprise Storage",
              sub: "AES-256 Multi-Tenant Connected",
              icon: Database,
              color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
              border: "hover:border-amber-500/35 hover:shadow-amber-500/5"
            }
          ].map((metric, idx) => (
            <div key={idx} className={`rounded-xl p-5 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border ${
              isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-white'
            } ${metric.border}`}>
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${metric.color}`}>
                <metric.icon className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{metric.name}</span>
                <span className={`text-3xl font-black block tracking-tight leading-none mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{metric.value}</span>
                <span className={`text-xs block pt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{metric.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Custom Analytical Visual Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Activity by Team */}
          <div className={`rounded-xl p-6 space-y-5 border ${
            isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-slate-200'
          }`}>
            <div>
              <h3 className={`text-base font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                <BarChart3 className="w-5 h-5 text-teal-accent" />
                <span>Usecase Allocation Matrix</span>
              </h3>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Distribution of designs across active business departments.</p>
            </div>
            
            <div className="space-y-4 pt-2">
              {[
                { name: "Enterprise Core Architecture", count: 5, pct: 45, color: "bg-teal-500" },
                { name: "DevOps Build Pipelines", count: 4, pct: 30, color: "bg-indigo-500" },
                { name: "AI RAG & Analytics Core", count: 3, pct: 15, color: "bg-purple-500" },
                { name: "Retail Database Store", count: 2, pct: 10, color: "bg-amber-500" }
              ].map((team, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{team.name}</span>
                    <span className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{team.count} ({team.pct}%)</span>
                  </div>
                  <div className={`w-full h-2 rounded-full border overflow-hidden ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-bg-dark border-panel-border/30'}`}>
                    <div className={`h-full rounded-full ${team.color}`} style={{ width: `${team.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Security compliance scorecard */}
          <div className={`rounded-xl p-6 space-y-5 border ${
            isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-slate-200'
          }`}>
            <div>
              <h3 className={`text-base font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                <Shield className="w-5 h-5 text-purple-500" />
                <span>Security Compliance Scorecard</span>
              </h3>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Average security ratings calculated by Gemini.</p>
            </div>

            <div className="space-y-5 pt-2">
              <div className={`flex items-center gap-6 border rounded-xl p-5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-bg-dark/40 border-panel-border/30'
              }`}>
                <span className="text-6xl font-black text-teal-600 dark:text-teal-accent leading-none">A-</span>
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Global Compliance Grade</span>
                  <p className={`text-sm mt-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Excellent posture. Minor risks identified in database subnets.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className={`border rounded-lg p-3.5 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-panel-border/30'}`}>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 block leading-none">0</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider mt-1.5 block font-bold">Critical Risks</span>
                </div>
                <div className={`border rounded-lg p-3.5 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-panel-border/30'}`}>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400 block leading-none">3</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider mt-1.5 block font-bold">Warnings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Quick Start Presets Launcher */}
          <div className={`rounded-xl p-6 space-y-5 border ${
            isLight ? 'bg-white border-slate-200 shadow-md text-slate-800' : 'glass-panel border-panel-border/30 text-slate-200'
          }`}>
            <div>
              <h3 className={`text-base font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                <Sparkles className="w-5 h-5 text-teal-500 dark:text-teal-accent animate-pulse" />
                <span>Quick Launch Templates</span>
              </h3>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Select a pre-designed cloud architecture template to build instantly.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              {[
                { name: "GCP Serverless", desc: "Global CDN, Cloud Run, Cloud Storage", color: "border-teal-500/20 hover:border-teal-500/40" },
                { name: "AWS Kubernetes", desc: "ALB, EKS Worker nodes, RDS Postgre", color: "border-amber-500/20 hover:border-amber-500/40" },
                { name: "AI RAG Pipeline", desc: "pgvector DB, Vertex AI, Gemini models", color: "border-purple-500/20 hover:border-purple-500/40" },
                { name: "DevOps CI/CD", desc: "GitHub Actions, Terraform builds", color: "border-indigo-500/20 hover:border-indigo-500/40" }
              ].map((tpl, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setNewDiagramName(tpl.name + " Workspace");
                    setNewDiagramPrompt(`Act as an Architect. Design a ${tpl.name} layout with ${tpl.desc}`);
                    setIsCreateModalOpen(true);
                  }}
                  className={`rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:scale-[1.03] hover:shadow-lg transition-all duration-300 min-h-[105px] h-full border ${
                    isLight ? 'bg-slate-50 border-slate-200 hover:border-teal-400' : 'glass-panel'
                  } ${tpl.color}`}
                >
                  <span className={`font-extrabold text-sm block leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>{tpl.name}</span>
                  <span className={`text-xs block leading-relaxed mt-1.5 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{tpl.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Workspace Diagrams Manager */}
        <div className="space-y-4">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 ${isLight ? 'border-slate-200' : 'border-panel-border/30'}`}>
            <div>
              <h2 className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Active Architecture Workspaces</h2>
              <p className="text-xs text-slate-500 mt-0.5">Review, audit, or delete active enterprise canvas files.</p>
            </div>

            {/* Scope Tab Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="dashboard-scope-my-workspaces-btn"
                onClick={() => setScopeTab('my_workspaces')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  scopeTab === 'my_workspaces'
                    ? isLight
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-teal-500 text-[#070A13] border-teal-400 shadow-md shadow-teal-500/20'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>My Workspaces ({myCanvasesList.length})</span>
              </button>

              <button
                type="button"
                id="dashboard-scope-community-btn"
                onClick={() => setScopeTab('community')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  scopeTab === 'community'
                    ? isLight
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-indigo-500 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Community ({diagrams.length})</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search diagrams by name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-teal-500 placeholder-slate-400'
                    : 'bg-[#0b0f19]/80 border-panel-border/50 focus:border-teal-500/50 text-slate-300 placeholder-slate-600'
                }`}
              />
            </div>
          </div>

          {/* Diagrams List Table */}
          {isLoading ? (
            <div className={`h-64 flex flex-col items-center justify-center gap-3 rounded-xl border ${
              isLight ? 'bg-white border-slate-200' : 'glass-panel border-panel-border/20'
            }`}>
              <Loader2 className="w-8 h-8 animate-spin text-teal-accent" />
              <span className="text-xs text-slate-500">Loading diagrams database...</span>
            </div>
          ) : filteredDiagrams.length === 0 ? (
            <div className={`h-64 flex flex-col items-center justify-center gap-4 rounded-xl text-center p-8 border ${
              isLight ? 'bg-white border-slate-200' : 'glass-panel border-panel-border/20 bg-panel-dark/10'
            }`}>
              <FileText className="w-12 h-12 text-slate-400" />
              <div>
                <h4 className={`font-bold text-sm ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                  {scopeTab === 'my_workspaces' ? 'No Workspaces Created Yet' : 'No workspaces found'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  {scopeTab === 'my_workspaces'
                    ? "You haven't created any custom diagrams in this workspace yet. Create one or explore the community blueprints."
                    : "Try adjusting your search query to find relevant diagrams."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="new-diagram-btn"
                  onClick={() => {
                    setNewDiagramName('');
                    setNewDiagramPrompt('');
                    setSelectedTemplate('0');
                    setIsCreateModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Diagram</span>
                </button>
                {scopeTab === 'my_workspaces' && (
                  <button
                    onClick={() => setScopeTab('community')}
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    Browse Community ({diagrams.length})
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={`rounded-xl overflow-hidden shadow-lg border ${
              isLight ? 'bg-white border-slate-200' : 'glass-panel border-panel-border/30'
            }`}>
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className={`border-b text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px] ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-panel-dark/40 border-panel-border/50'
                    }`}>
                      <th className="px-8 py-5">Workspace Title</th>
                      <th className="px-8 py-5">Template Status</th>
                      <th className="px-8 py-5">Versions</th>
                      <th className="px-8 py-5">Deployment Platform</th>
                      <th className="px-8 py-5">Last Modified</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-panel-border/30'}`}>
                    {filteredDiagrams.map((diagram) => {
                      const verCount = diagram.versions?.length || 1;
                      const hasGcp = diagram.name.toLowerCase().includes('gcp') || diagram.name.toLowerCase().includes('serverless');
                      const hasAws = diagram.name.toLowerCase().includes('aws') || diagram.name.toLowerCase().includes('kubernetes');
                      const platform = hasGcp ? 'GCP' : hasAws ? 'AWS' : 'Hybrid/Multi-Cloud';
                      const staleness = checkDiagramStaleness(diagram);
                      const isRefreshing = refreshingDiagramIds.has(diagram.id);
                      
                      return (
                        <tr 
                          key={diagram.id}
                          onClick={() => router.push(`/workspace?diagram=${diagram.id}`)}
                          className={`transition-all cursor-pointer group ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/30'}`}
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3.5">
                              <div className="w-9 h-9 rounded bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-accent">
                                <Network className="w-5 h-5" />
                              </div>
                              <div>
                                <span className={`font-extrabold transition-colors block text-base ${
                                  isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-accent'
                                }`}>{diagram.name}</span>
                                <span className="text-xs text-slate-500 block truncate max-w-xs">{diagram.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            {staleness.isStale ? (
                              <span 
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30"
                                title={`Master Template Updated: ${staleness.reason}`}
                              >
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                <span>Update Available</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Up-to-Date</span>
                              </span>
                            )}
                          </td>
                          <td className={`px-8 py-5 font-bold text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{verCount} version{verCount > 1 ? 's' : ''}</td>
                          <td className="px-8 py-5">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${
                              platform === 'GCP' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20' :
                              platform === 'AWS' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
                              'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                            }`}>
                              {platform}
                            </span>
                          </td>
                          <td className={`px-8 py-5 font-bold text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {new Date(diagram.updated_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {new Date(diagram.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-8 py-5 text-right" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2.5">
                              {/* Force Refresh Button Per Diagram */}
                              <button
                                onClick={(e) => handleForceRefreshDiagram(diagram.id, diagram.name, diagram.architecture_type, diagram.prompt, e)}
                                disabled={isRefreshing}
                                className={`px-2.5 py-1.5 rounded border transition-all cursor-pointer flex items-center gap-1.5 ${
                                  staleness.isStale
                                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-sm animate-pulse'
                                    : isLight
                                    ? 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border-slate-300 hover:border-teal-400'
                                    : 'bg-slate-800/80 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border-slate-700 hover:border-teal-500/40'
                                }`}
                                title={
                                  staleness.isStale
                                    ? `⚠️ Stale Master Template: ${staleness.reason}. Click to Force Refresh via Live API!`
                                    : `⚡ Force Refresh from Master Template via Live API (Bypasses all shortcuts & caches)`
                                }
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-400' : staleness.isStale ? 'text-amber-400' : 'text-teal-400'}`} />
                                <span className="text-xs font-bold">{isRefreshing ? 'Refreshing...' : staleness.isStale ? 'Update' : 'Refresh'}</span>
                              </button>

                              <button
                                onClick={() => router.push(`/workspace?diagram=${diagram.id}`)}
                                className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                                  isLight
                                    ? 'bg-teal-600 hover:bg-teal-700 text-white border-transparent shadow-sm'
                                    : 'hover:bg-teal-accent hover:text-bg-dark text-slate-300 border-slate-700 hover:border-transparent'
                                }`}
                              >
                                <span>Launch</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteDiagram(diagram.id, e)}
                                className="p-1.5 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                                title="Delete Diagram Workspace"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-panel-border/30 bg-[#070a13] py-10 mt-16">
        <div className="max-w-[1600px] mx-auto px-12 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-slate-600" />
            <span className="font-bold text-slate-400">PROMPT CANVAS</span>
          </div>
          <span>&copy; {new Date().getFullYear()} PromptCanvas. All rights reserved.</span>
        </div>
      </footer>
      </div> {/* Closes main portal container */}

      {/* CREATE WORKSPACE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-2xl p-10 w-full max-w-2xl shadow-2xl relative space-y-7">
            <div>
              <h3 className="font-extrabold text-3xl text-white flex items-center gap-3">
                <Plus className="w-7 h-7 text-teal-accent" />
                <span>Create Diagram Workspace</span>
              </h3>
              <p className="text-base text-slate-400 mt-2">Initialize a clean architecture design canvas with your custom name and prompts.</p>
            </div>
            
            <form onSubmit={handleCreateDiagram} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <label className="block text-base font-bold text-slate-200 flex items-center justify-between">
                    <span>Project</span>
                    {earlierProjects.length > 0 && (
                      <span className="text-xs text-teal-400 font-mono">({earlierProjects.length} earlier)</span>
                    )}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Project-842"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="w-full bg-[#0b0f19] border border-panel-border/80 focus:border-teal-500/50 rounded-lg px-5 py-3.5 text-base text-slate-200 focus:outline-none transition-all placeholder-slate-600 font-semibold"
                    />
                    {earlierProjects.length > 0 && (
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            setNewProjectName(e.target.value);
                          }
                        }}
                        className="bg-[#0b0f19] border border-panel-border/80 focus:border-teal-500/50 text-teal-400 rounded-lg px-3 py-3.5 text-sm outline-none cursor-pointer shrink-0"
                        title="Choose from earlier projects"
                      >
                        <option value="" disabled>📂 Earlier</option>
                        {earlierProjects.map((p: string) => (
                          <option key={p} value={p} className="bg-[#0B101D] text-slate-200">
                            {p}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-base font-bold text-slate-200">Diagram Name</label>
                  <input
                    id="modal-diagram-name"
                    type="text"
                    placeholder="e.g., Google Cloud E-Commerce"
                    value={newDiagramName}
                    onChange={(e) => setNewDiagramName(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-panel-border/80 focus:border-teal-500/50 rounded-lg px-5 py-3.5 text-base text-slate-200 focus:outline-none transition-all placeholder-slate-600 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-base font-bold text-slate-200 flex items-center justify-between">
                  <span>Blueprint</span>
                  <span className="text-xs text-teal-400 font-mono">({facetedOptions.matchingCount} matching)</span>
                </label>
                <select
                  id="modal-template-select"
                  value={selectedTemplate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTemplate(val);
                    if (val.startsWith('arch_')) {
                      const archId = val.replace('arch_', '');
                      setSelectedArchType(archId);
                      syncDimensionsForBlueprint(archId);
                      const meta = getBlueprintMetadataById(archId);
                      if (meta?.goldenExamplePayload) {
                        setNewDiagramPrompt(meta.goldenExamplePayload);
                      } else {
                        const arch = getArchitectureTypeById(archId);
                        if (arch) {
                          setNewDiagramPrompt(arch.prompt);
                        }
                      }
                    } else if (val !== 'custom') {
                      const idx = parseInt(val, 10);
                      const t = TEMPLATE_PROMPTS[idx];
                      if (t) {
                        setNewDiagramPrompt(t.prompt);
                      }
                    }
                  }}
                  className="w-full bg-[#0b0f19] border border-teal-500/50 hover:border-teal-400 rounded-xl px-5 py-4 text-base text-teal-300 font-bold focus:outline-none transition-all cursor-pointer shadow-lg"
                >
                  <option value="0" className="bg-[#0b101d] text-teal-300 font-bold py-1">
                    ✨ Auto-Detect Architecture ({facetedOptions.matchingCount} Matching)
                  </option>
                  {facetedOptions.matchingBlueprints.length > 0 ? (
                    facetedOptions.matchingBlueprints.map((item) => (
                      <option key={item.combinedId} value={`arch_${item.combinedId}`} className="bg-[#0b101d] text-slate-100 font-bold py-1">
                        🏛️ {item.diagramName}
                      </option>
                    ))
                  ) : (
                    <option disabled value="" className="bg-[#0b101d] text-amber-400 font-bold py-1">
                      ⚠️ No blueprints match this combination
                    </option>
                  )}
                  <option value="custom" className="bg-[#0b101d] text-teal-300 font-bold py-1">✍️ Custom Freeform Prompt...</option>
                </select>
              </div>

              {/* 7 Architectural Classification & Lifecycle Dropdowns (Cascading Facets) */}
              <div className="bg-[#070A13]/90 border border-slate-800/90 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                      <Settings2 className="w-4 h-4 text-teal-400" />
                      <span>Architectural Classification &amp; Lifecycle Dimensions</span>
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono">
                      {facetedOptions.matchingCount} of {BLUEPRINT_KNOWLEDGE_MATRIX.length} Matching
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-slate-400 hover:text-teal-300 hover:underline flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Reset all dimension filters"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400 hover:text-teal-300" />
                    <span>Reset Filters</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {/* 1. Phase Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Phase Name
                    </label>
                    <select
                      value={selectedPhaseName}
                      onChange={(e) => setSelectedPhaseName(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Phases</option>
                      {PHASE_NAME_OPTIONS.map((opt) => {
                        const count = facetedOptions.phaseCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 2. Architecture Domain */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Architecture Domain
                    </label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Domains</option>
                      {ARCHITECTURE_DOMAIN_OPTIONS.map((opt) => {
                        const count = facetedOptions.domainCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 3. Abstraction Level */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Abstraction Level
                    </label>
                    <select
                      value={selectedAbstractionLevel}
                      onChange={(e) => setSelectedAbstractionLevel(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Levels</option>
                      {ABSTRACTION_LEVEL_OPTIONS.map((opt) => {
                        const count = facetedOptions.abstractionCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 4. Architectural Stack Layer */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Stack Layer
                    </label>
                    <select
                      value={selectedStackLayer}
                      onChange={(e) => setSelectedStackLayer(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Layers</option>
                      {ARCHITECTURAL_STACK_LAYER_OPTIONS.map((opt) => {
                        const count = facetedOptions.stackLayerCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 5. Default Layout Direction */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Layout Direction
                    </label>
                    <select
                      value={selectedLayoutDirection}
                      onChange={(e) => setSelectedLayoutDirection(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Directions</option>
                      {DEFAULT_LAYOUT_DIRECTION_OPTIONS.map((opt) => {
                        const count = facetedOptions.directionCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt === 'LR' ? 'LR (Left to Right)' : opt === 'TD' ? 'TD (Top to Down)' : opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 6. Sales Cycle Stage */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Sales Stage
                    </label>
                    <select
                      value={selectedSalesCycleStage}
                      onChange={(e) => setSelectedSalesCycleStage(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Stages</option>
                      {SALES_CYCLE_STAGE_OPTIONS.map((opt) => {
                        const count = facetedOptions.salesStageCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* 7. Lifecycle Phase */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 truncate">
                      Lifecycle Phase
                    </label>
                    <select
                      value={selectedLifecyclePhase}
                      onChange={(e) => setSelectedLifecyclePhase(e.target.value)}
                      className="w-full bg-[#0B101D] border border-slate-700/80 focus:border-teal-400 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer transition-all truncate"
                    >
                      <option value="ALL" className="bg-[#0B101D] text-teal-300 font-bold">✨ All Lifecycles</option>
                      {LIFECYCLE_PHASE_OPTIONS.map((opt) => {
                        const count = facetedOptions.lifecycleCounts[opt] || 0;
                        return (
                          <option key={opt} value={opt} disabled={count === 0} className={`bg-[#0B101D] ${count > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {opt} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-base font-bold text-slate-200 flex items-center justify-between">
                  <span>Prompt</span>
                  <span className="text-xs text-teal-400 font-mono">Gemini 3.7 Flash</span>
                </label>
                <textarea
                  id="modal-diagram-prompt"
                  placeholder="e.g., Act as a Solutions Architect. Design a serverless backend using Cloud Run..."
                  value={newDiagramPrompt}
                  onChange={(e) => setNewDiagramPrompt(e.target.value)}
                  className="w-full h-32 bg-[#0b0f19] border border-panel-border/80 focus:border-teal-500/50 rounded-lg px-5 py-3.5 text-base text-slate-200 focus:outline-none transition-all placeholder-slate-600 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-6 border-t border-panel-border/30 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-base font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="confirm-create-diagram-btn"
                  type="submit"
                  disabled={isCreating}
                  className="px-8 py-3 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-base transition-all shadow-xl shadow-teal-500/15 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCreating && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>{isCreating ? 'Creating...' : 'Create Canvas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI GENERATION REAL-TIME PROGRESS MODAL */}
      <AIGenerationProgressModal isOpen={isCreating} promptTitle={newDiagramPrompt || newDiagramName} />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updatedUser) => {
          setUser(updatedUser);
        }}
        onLogout={handleLogout}
      />

      {/* Contact Us Modal */}
      <ContactUsModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        currentUser={user}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          setIsAuthOpen(false);
          fetchDiagrams();
        }}
        initialMode="signup"
      />

      <UseCaseIntakeModal
        isOpen={isUseCaseModalOpen}
        onClose={() => setIsUseCaseModalOpen(false)}
        onSubmitUseCase={(data) => {
          const promptText = `Act as an Enterprise Cloud Architect for ${data.domain} on ${data.cloudProvider} with ${data.complianceTier}. Build standard publication-grade architecture for: ${data.title}. System details: ${data.description}`;
          router.push(`/workspace?prompt=${encodeURIComponent(promptText)}`);
        }}
      />

      {/* Live Refresh Toast Notification */}
      {refreshToast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs font-bold transition-all animate-bounce ${
          refreshToast.type === 'success'
            ? 'bg-teal-950/95 border-teal-400 text-teal-200'
            : refreshToast.type === 'error'
            ? 'bg-rose-950/95 border-rose-400 text-rose-200'
            : 'bg-slate-900/95 border-teal-500/50 text-slate-100'
        }`}>
          {refreshToast.type === 'info' && <Loader2 className="w-4 h-4 animate-spin text-teal-400" />}
          {refreshToast.type === 'success' && <ShieldCheck className="w-4 h-4 text-teal-400" />}
          <span>{refreshToast.message}</span>
        </div>
      )}
    </div>
  );
}
