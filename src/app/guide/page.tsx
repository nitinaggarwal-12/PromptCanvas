'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  FileText, 
  Presentation, 
  Layers, 
  Shield, 
  Database, 
  Bot, 
  Cpu, 
  Compass, 
  ChevronRight, 
  Search, 
  Zap, 
  History, 
  Check, 
  Copy, 
  Eye, 
  ExternalLink,
  Code,
  Sliders,
  DollarSign,
  Lock,
  Workflow,
  HelpCircle,
  Laptop,
  Terminal,
  Share2,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import { BLUEPRINT_CATALOG_ITEMS } from '@/components/workspace/BlueprintCatalogModal';

type PersonaKey = 'architect' | 'data_ai' | 'consultant' | 'secops';

interface PersonaWorkflow {
  id: PersonaKey;
  title: string;
  badge: string;
  role: string;
  avatar: string;
  tagline: string;
  color: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  blueprintExample: {
    id: string;
    name: string;
    number: number;
  };
  steps: {
    stepNumber: number;
    title: string;
    whereToClick: string;
    description: string;
    actionPrompt?: string;
    validationChecklist: string[];
    outputVisualType: 'matrix' | 'prompting' | 'canvas_render' | 'version_diff' | 'export_modal';
    tip: string;
  }[];
}

const PERSONA_WORKFLOWS: Record<PersonaKey, PersonaWorkflow> = {
  architect: {
    id: 'architect',
    title: 'Principal Enterprise Cloud Architect',
    badge: 'Enterprise Infrastructure & C4',
    role: 'Lead Cloud Architect / Systems Designer',
    avatar: '🏢',
    tagline: 'Design greenfield landing zones, zero-trust VPC networks, and multi-region topologies with zero line collisions.',
    color: '#2563EB',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    accentText: 'text-blue-400',
    blueprintExample: {
      id: 'gcp_landing_zone_vpc',
      name: 'Google Cloud Infrastructure: Landing Zone & Shared VPC Topology (P4-SEC-P-02)',
      number: 17
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Discover & Bootstrap from Blueprint Matrix',
        whereToClick: 'Click "Templates Gallery" or "Blueprint Matrix" in the left sidebar',
        description: 'Open the 50-Blueprint Enterprise Catalog. Filter by "Cloud Infra Security" or search for "Shared VPC" to locate Blueprint 17. Click [ ➕ Add as New View ] to instantly instantiate a publication-grade master canvas.',
        validationChecklist: [
          'Verify Blueprint 17 loads with all 5 functional columns (On-Prem, Hub, Spokes, VPC-SC, Observability)',
          'Check that breadcrumbs reflect Phase 4 (Physical Layer)',
          'Confirm canvas dimensions scale cleanly to wide 1600px desktop monitors'
        ],
        outputVisualType: 'matrix',
        tip: 'Pro-Tip: You can also hit Cmd+K / Ctrl+K in the search bar to jump straight to any blueprint by number (e.g. "17").'
      },
      {
        stepNumber: 2,
        title: 'Provide Custom Domain Input & CIDRs',
        whereToClick: 'Left Studio -> "ACTIVE USE CASE PROMPT" Input Box',
        description: 'Input your specific enterprise constraints, such as dedicated 100G Interconnect demarcation, GKE Autopilot pod CIDR ranges (10.20.0.0/16), or private PSC endpoints (10.100.0.0/24).',
        actionPrompt: 'Customize the Landing Zone Shared VPC with a 100G Dedicated Interconnect to Equinix, GKE Autopilot Pod CIDR 10.20.0.0/16, Cloud Armor WAF rate-limiting, and VPC Service Controls protecting Vertex AI Gemini 3.7 endpoints.',
        validationChecklist: [
          'Verify the prompt contains concrete networking parameters (ASNs, CIDRs, SLAs)',
          'Review the AI Generation progress indicator as Gemini 3.7 compiles the AST graph'
        ],
        outputVisualType: 'prompting',
        tip: 'You can select "Hub-and-Spoke Shared VPC" from the Diagram Type dropdown to enforce strict topology standards.'
      },
      {
        stepNumber: 3,
        title: 'Inspect & Validate Canvas Geometry',
        whereToClick: 'Central 2D Canvas Viewport -> Zoom/Pan Controls (Top Right)',
        description: 'Inspect the rendered visual nodes, subnets, and protocol lines. Ensure the 100G Interconnect routes into the Cloud Router BGP engine, and PSC endpoints transit cleanly into the Spoke subnets with zero line-to-box collision.',
        validationChecklist: [
          'Check that all connecting lines have pill-shaped protocol labels (e.g. [1] 100G, [2] PSC Transit)',
          'Verify node boxes maintain at least 30px safety margins from column borders',
          'Inspect the Architecture Code Viewer (Code icon) to audit the raw XML structure'
        ],
        outputVisualType: 'canvas_render',
        tip: 'Hold the Spacebar + Click-Drag to smoothly pan across complex wide topologies without moving individual nodes.'
      },
      {
        stepNumber: 4,
        title: 'Iterative Refinement & Version Increments (v1 -> v2)',
        whereToClick: 'Left Studio Refinement Chat -> Suggested Transformations or Freeform Input',
        description: 'Prompt Gemini AI to add new security perimeters or failover routes (e.g. "Add Cloud HA VPN IPsec backup and Cloud KMS HSM Dual Key Rings"). PromptCanvas creates an immutable version snapshot (v2) while preserving v1 in rollback history.',
        actionPrompt: 'Add Cloud HA VPN dual tunnels as automated BGP failover (MED: 700) and enforce Cloud KMS HSM 90-day key rotation.',
        validationChecklist: [
          'Confirm the version badge increments from "v1" to "v2"',
          'Open the Version History dropdown to inspect the visual diff between v1 and v2',
          'Verify you can 1-click restore v1 at any time if needed'
        ],
        outputVisualType: 'version_diff',
        tip: 'Every version mutation executes non-destructive AST compilation, preventing manual layout regressions.'
      },
      {
        stepNumber: 5,
        title: 'Export Multi-Format Packages (PDF, PPTX, XML)',
        whereToClick: 'Top Navigation -> Click "Edit ▾" or "Export" Dropdown',
        description: 'Export publication-ready deliverables for your Architecture Review Board (ARB). Choose from Executive PDF Dossiers, Boardroom PowerPoint (.pptx) slides, high-res PNG/SVG vectors, or editable Draw.io XML.',
        validationChecklist: [
          'Download the PDF Architecture Dossier containing Executive Summary, Component Tables, and SLAs',
          'Download PPTX slides pre-formatted for executive leadership presentations',
          'Export Draw.io XML for offline editing in diagrams.net'
        ],
        outputVisualType: 'export_modal',
        tip: 'Click "Insights & Cost" ($/mo) before exporting to automatically include live GCP cloud cost estimates in your dossier.'
      }
    ]
  },
  data_ai: {
    id: 'data_ai',
    title: 'Data Platform & AI Solutions Engineer',
    badge: 'Lakehouse & Agentic Mesh',
    role: 'Lead Data Engineer / GenAI Specialist',
    avatar: '🤖',
    tagline: 'Construct real-time streaming pipelines, Medallion Lakehouses, and Gemini multi-agent swarm meshes with vector search.',
    color: '#8B5CF6',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    accentText: 'text-purple-400',
    blueprintExample: {
      id: 'ecommerce_retail',
      name: 'Google Cloud Retail Platform: OmniChannel Intelligent Commerce & Retail AI Architecture',
      number: 41
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Select Data & AI Architecture Blueprint',
        whereToClick: 'Click "Templates Gallery" -> Category "AI & Multi-Agent" or "Industry 4.0"',
        description: 'Explore blueprints such as Omnichannel Retail AI (Blueprint 41), Agentic RAG Swarms, or Medallion Data Lakehouses. Select Blueprint 41 to inspect Vertex AI Search, AlloyDB pgvector, and Gemini 3.7 Pro Concierge workflows.',
        validationChecklist: [
          'Verify Vertex AI Search & AlloyDB pgvector components render in the AI Intelligence Core',
          'Confirm multi-region Cloud Spanner global cart sync is established'
        ],
        outputVisualType: 'matrix',
        tip: 'Use the "Industry 4.0" filter tab to find tailored pipelines for Retail, Healthcare, Finance, and Smart Manufacturing.'
      },
      {
        stepNumber: 2,
        title: 'Inject Custom Data Contracts & Model Hyperparameters',
        whereToClick: 'Left Studio -> Prompt Input',
        description: 'Provide details on your data ingestion schemas, BigQuery partitioning rules, and Vertex AI vector dimensions (e.g. 1536-dim text-embedding-004 vs 16K multimodal embeddings).',
        actionPrompt: 'Configure the Retail AI Core with AlloyDB pgvector using HNSW indexing for sub-10ms similarity recall, and connect BigQuery Lakehouse partitioned by transaction date.',
        validationChecklist: [
          'Verify data flow links from Pub/Sub to BigQuery and AlloyDB pgvector',
          'Check that Gemini 3.7 Flash Reasoning badges are placed in the AI Core tier'
        ],
        outputVisualType: 'prompting',
        tip: 'Click "Suggested Transformations" for 1-click injections like "Integrate Real-Time Fraud & AML Detection".'
      },
      {
        stepNumber: 3,
        title: 'Validate Subnets, Vector Stores & Streaming Ingestion',
        whereToClick: 'Canvas -> Zoom into Column 3 (Retail AI Core) & Column 4 (BigQuery Lakehouse)',
        description: 'Verify that shoppers ingress via Apigee, requests fan out to Cloud Run microservices, and embeddings query AlloyDB vector stores with clean horizontal corridor connectors.',
        validationChecklist: [
          'Confirm [4] ACID Cart Sync routes through open corridor waypoints without slicing boxes',
          'Check the star schema representation in BigQuery (Fact_Retail_Sales, Dim_Shopper, Dim_Store)'
        ],
        outputVisualType: 'canvas_render',
        tip: 'Click on any node to view its detailed architectural specs and GCP service lineage.'
      },
      {
        stepNumber: 4,
        title: 'Refine with Conversational AI & Branching',
        whereToClick: 'Left Studio Chat -> "Iterate: Enter any change to create v2"',
        description: 'Request real-time analytics updates (e.g. "Add Looker Conversion Funnel and Geo GMV Heatmap dashboards with sub-second alert triggers"). PromptCanvas commits v2 with instant rollback ability.',
        actionPrompt: 'Add Looker Merchandising BI Cockpit with conversion funnel stages (Search > Cart > Buy) and real-time revenue spike heatmaps.',
        validationChecklist: [
          'Verify Looker BI cards appear in Column 4 with live metric mockups',
          'Verify version increments to v2 with zero state corruption'
        ],
        outputVisualType: 'version_diff',
        tip: 'You can test multiple architecture variations simultaneously by creating branched views.'
      },
      {
        stepNumber: 5,
        title: 'Compile Data Architecture Dossier & IaC Scaffolding',
        whereToClick: 'Top Navigation -> "Export" -> Select "Architecture Dossier PDF" or "Terraform IaC"',
        description: 'Generate comprehensive documentation including data lineage schemas, SLA matrices, BigQuery partition strategies, and Terraform HCL snippets for automated CI/CD deployment.',
        validationChecklist: [
          'Verify PDF contains the full data dictionary and streaming SLA breakdown',
          'Review generated Terraform HCL modules for Cloud Run, Pub/Sub, and AlloyDB'
        ],
        outputVisualType: 'export_modal',
        tip: 'Use the "Compose Doc" utility in the sidebar to generate comprehensive markdown RFCs directly into your project.'
      }
    ]
  },
  consultant: {
    id: 'consultant',
    title: 'Cloud Migration & Modernization Consultant',
    badge: '6Rs Modernization & TCO',
    role: 'Enterprise Transformation Partner / Solutions Lead',
    avatar: '💼',
    tagline: 'Transform legacy on-prem monoliths and spaghetti integrations into wave-based cloud migration roadmaps.',
    color: '#10B981',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    blueprintExample: {
      id: 'legacy_data_dependency_map',
      name: 'Google Cloud Discovery & Assessment: Legacy Silos to Modern Migration Waves (P1-APP-L-01)',
      number: 1
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Map As-Is On-Premises Legacy Silos',
        whereToClick: 'Sidebar -> "Templates Gallery" -> Select Blueprint 1 (Discovery & Assessment)',
        description: 'Load Blueprint 1 to visualize on-prem mainframe silos, Oracle 11g RAC clusters, SAP ECC monoliths, and spaghetti integration matrices (ESB bus, 1,200+ shell scripts) discovered by StratoZone.',
        validationChecklist: [
          'Verify on-prem legacy silos render in the left red/burgundy zone',
          'Confirm floating risk callouts (Schema Drift, Hardcoded Credentials, DB Locks) are visible'
        ],
        outputVisualType: 'matrix',
        tip: 'Blueprint 1 is the standard board-level deliverable for Phase 1 Datacenter Discovery & Rationalization.'
      },
      {
        stepNumber: 2,
        title: 'Define 6Rs Migration Tracks & Target Waves',
        whereToClick: 'Left Studio -> Prompt Box -> Enter Migration Parameters',
        description: 'Provide portfolio inventory figures (e.g. 450 VMs, 12 Oracle databases, 3 Mainframe applications) and prompt Gemini AI to generate wave-based migration velocity schedules.',
        actionPrompt: 'Analyze our 450-server datacenter inventory: map low-risk web tiers to Wave 1 (Rehost), Oracle databases to Wave 2 (Cloud SQL Replatform), core microservices to Wave 3 (Refactor on Cloud Run), and legacy NAS to Wave 4 (Retire).',
        validationChecklist: [
          'Verify 4 distinct migration waves populate in the green Target State zone',
          'Check that StratoZone and Migration Center connectors link discovery probes to target waves'
        ],
        outputVisualType: 'prompting',
        tip: 'Include your target completion timeline (e.g. 18 months) to auto-calculate wave velocity milestones.'
      },
      {
        stepNumber: 3,
        title: 'Validate TCO Savings & Cutover Sequence',
        whereToClick: 'Canvas -> Zoom into Center Discovery Core & Right Target State',
        description: 'Validate that the migration sequence eliminates single points of failure (SPOF) while achieving targeted 42% TCO operational expenditure savings.',
        validationChecklist: [
          'Verify DLP automated scanning is mapped to prevent sensitive PII leakage during migration',
          'Confirm all 4 wave cards display concrete transformation outcomes and decommissioning goals'
        ],
        outputVisualType: 'canvas_render',
        tip: 'Click "Insights & Cost" in the top bar to inspect 3-year TCO projections and ROI payback schedules.'
      },
      {
        stepNumber: 4,
        title: 'Iterate & Add Governance Guardrails (v1 -> v2)',
        whereToClick: 'Left Studio -> Prompt Refinement Chat',
        description: 'Refine the migration roadmap to add migration cutover freeze windows, rollbacks, and Strangler Fig API facade routing via Apigee.',
        actionPrompt: 'Add Apigee API Gateway strangler fig routing to intercept client traffic during Wave 2 and Wave 3 database cutovers.',
        validationChecklist: [
          'Verify the new version v2 displays the Strangler Fig routing proxy',
          'Confirm version switcher maintains full audit history for client stakeholders'
        ],
        outputVisualType: 'version_diff',
        tip: 'Use the "Visual Version Diff" modal to present side-by-side As-Is vs To-Be transitions to client executives.'
      },
      {
        stepNumber: 5,
        title: 'Generate Boardroom PowerPoint Deck & Executive Dossier',
        whereToClick: 'Top Navigation -> Click "Edit ▾" -> Export PowerPoint (.pptx) or PDF Dossier',
        description: 'Generate an executive presentation deck ready for CIO and Steering Committee sign-off. Slides automatically format wave timelines, risk mitigation scorecards, and cloud migration velocity metrics.',
        validationChecklist: [
          'Download editable .pptx slide deck with high-resolution vector diagrams',
          'Download executive PDF dossier with executive summary and sign-off signature blocks'
        ],
        outputVisualType: 'export_modal',
        tip: 'The PowerPoint export creates standalone native slides with editable bullet points for rapid client tailoring.'
      }
    ]
  },
  secops: {
    id: 'secops',
    title: 'CISO & DevSecOps Governance Lead',
    badge: 'Zero-Trust & Compliance',
    role: 'Chief Information Security Officer / Security Architect',
    avatar: '🔒',
    tagline: 'Audit zero-trust perimeters, enforce VPC Service Controls, and generate SOC2 / CIS compliance dossiers.',
    color: '#EF4444',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/30',
    accentText: 'text-rose-400',
    blueprintExample: {
      id: 'threat_modeling_stride',
      name: 'STRIDE Threat Modeling & Multi-Layer Security Architecture',
      number: 14
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Select Threat Modeling & Zero-Trust Blueprint',
        whereToClick: 'Sidebar -> "Templates Gallery" -> Filter by "Security & Zero-Trust"',
        description: 'Load blueprints like STRIDE Threat Modeling (Blueprint 14), GCP Landing Zone with VPC-SC (Blueprint 17), or Sovereign Cloud Data Residency. Instantly visualize trust boundaries, threat actors, and defense vectors.',
        validationChecklist: [
          'Verify STRIDE threat boundaries render with distinct security colors (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)',
          'Confirm VPC-SC perimeter demarcations are clearly highlighted'
        ],
        outputVisualType: 'matrix',
        tip: 'All security blueprints adhere strictly to CIS GCP Foundations Benchmarks and NIST 800-53 standards.'
      },
      {
        stepNumber: 2,
        title: 'Configure Regulatory Standards & Perimeter Rules',
        whereToClick: 'Left Studio -> Prompt Box',
        description: 'Enter your regulatory compliance constraints (e.g. HIPAA, PCI-DSS 4.0, GDPR, FedRAMP High, EU AI Act) and prompt Gemini AI to generate automated defense controls.',
        actionPrompt: 'Apply PCI-DSS 4.0 and SOC2 Type II compliance guardrails: enforce Cloud KMS HSM CMEK on all data at rest, VPC Service Controls on BigQuery and Vertex AI, and Cloud Armor WAF rate-limiting.',
        validationChecklist: [
          'Verify Cloud KMS HSM dual key rings and Cloud Armor WAF rules appear on canvas',
          'Check that Organization Policy Guardrails are mapped with concrete Policy IDs'
        ],
        outputVisualType: 'prompting',
        tip: 'Use the "Security Audit" button in the bottom left to automatically scan for unencrypted egress paths.'
      },
      {
        stepNumber: 3,
        title: 'Execute Automated Zero-Trust Security Audit',
        whereToClick: 'Sidebar -> "Security & Zero-Trust Audit" tab or Bottom Left "Security Audit"',
        description: 'Run automated static analysis across your architecture graph. PromptCanvas inspects every connector for unencrypted HTTP traffic, missing IAM roles, public IPs, and perimeter vulnerabilities.',
        validationChecklist: [
          'Review the Security Scorecard (e.g. 98/100 SOC2 Compliance)',
          'Inspect automated remediation recommendations for any flagged vulnerabilities'
        ],
        outputVisualType: 'canvas_render',
        tip: 'Click "Auto-Remediate" in the audit panel to have Gemini automatically patch security findings on the canvas.'
      },
      {
        stepNumber: 4,
        title: 'Auto-Remediate & Commit Hardened Version (v1 -> v2)',
        whereToClick: 'Audit Panel -> Click "Apply Security Remediation" or prompt Left Studio',
        description: 'PromptCanvas automatically injects missing Cloud Armor WAF rules, mTLS 1.3 edge termination, and Private Service Connect endpoints, creating hardened version v2.',
        actionPrompt: 'Remediate all flagged audit findings: replace public endpoints with Private Service Connect and enable Binary Authorization on GKE.',
        validationChecklist: [
          'Verify version badge updates to v2',
          'Review the Visual Version Diff to visually confirm newly sealed perimeters and green security badges'
        ],
        outputVisualType: 'version_diff',
        tip: 'You can export the security delta report as part of your change-management ticket in Jira or ServiceNow.'
      },
      {
        stepNumber: 5,
        title: 'Export Audit Dossier & SOC2 Compliance Package',
        whereToClick: 'Top Navigation -> "Edit ▾" -> Export PDF Audit Package',
        description: 'Generate a cryptographic, timestamped Security & Compliance Dossier containing STRIDE threat matrices, VPC-SC Ingress/Egress rule tables, and CIS benchmark audit attestations.',
        validationChecklist: [
          'Download the SOC2 / ISO 27001 Security Audit PDF Package',
          'Download vector SVG diagrams for internal security wiki documentation'
        ],
        outputVisualType: 'export_modal',
        tip: 'Security dossiers include cryptographic SHA-256 graph hashes to prove architecture integrity during formal audits.'
      }
    ]
  }
};

export default function GuidePage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activePersona, setActivePersona] = useState<PersonaKey>('architect');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const currentWorkflow = PERSONA_WORKFLOWS[activePersona];
  const currentStep = currentWorkflow.steps[activeStepIndex];

  // Auto-play stepper simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIndex(prev => (prev + 1) % currentWorkflow.steps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, currentWorkflow.steps.length, activePersona]);

  const [visualMode, setVisualMode] = useState<'gif' | 'simulation'>('gif');

  const PERSONA_GIFS: Record<PersonaKey, string> = {
    architect: '/workflows/workflow_enterprise_architect.gif',
    data_ai: '/workflows/workflow_data_ai_engineer.gif',
    consultant: '/workflows/workflow_cloud_migration.gif',
    secops: '/workflows/workflow_ciso_secops.gif',
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(promptText);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className={`min-h-screen font-sans ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0B0F19] text-white'}`}>
      
      {/* ==================== STICKY TOP NAVBAR ==================== */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
        isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-[#0F172A]/90 border-slate-800 shadow-lg shadow-black/20'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight flex items-center gap-1.5">
                  PromptCanvas <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono">Guide</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">Interactive Persona Playbooks</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-700/40">
              <Link href="/workspace" className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}>
                Workspace Canvas
              </Link>
              <Link href="/templates" className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}>
                50-Blueprint Matrix
              </Link>
              <Link href="/dashboard" className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}>
                Operations Dashboard
              </Link>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20">
                User Guide &amp; Workflows
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleBtn />
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all hover:scale-[1.02]"
            >
              <span>Launch Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ==================== HERO BANNER ==================== */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            First-Time User Playbook &amp; Persona Workflows
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Master PromptCanvas in Minutes: <br />
            <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              End-to-End Persona Playbooks
            </span>
          </h1>
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Explore complete, step-by-step interactive workflows customized for your role. Learn how to navigate the 50-blueprint catalog, provide precise natural language input, validate collision-free 2D canvas outputs, manage versions, and export boardroom-ready PDF and PowerPoint packages.
          </p>
        </div>

        {/* ==================== PERSONA SWITCHER TABS ==================== */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(PERSONA_WORKFLOWS) as PersonaKey[]).map(key => {
            const p = PERSONA_WORKFLOWS[key];
            const isSelected = activePersona === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActivePersona(key);
                  setActiveStepIndex(0);
                }}
                className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden ${
                  isSelected
                    ? isLight
                      ? 'bg-white border-blue-500 shadow-xl ring-2 ring-blue-500/20'
                      : 'bg-slate-800/90 border-teal-400 shadow-xl shadow-teal-500/10 ring-2 ring-teal-400/20'
                    : isLight
                      ? 'bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-500" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{p.avatar}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.accentBg} ${p.accentBorder} ${p.accentText}`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm tracking-tight mb-1">{p.title}</h3>
                <p className={`text-xs line-clamp-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {p.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ==================== ACTIVE WORKFLOW PLAYGROUND ==================== */}
      <section className="pb-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className={`rounded-3xl border p-6 md:p-8 ${
          isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900/80 border-slate-800 shadow-2xl'
        }`}>
          
          {/* Workflow Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-2xl shadow-lg">
                {currentWorkflow.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-black">{currentWorkflow.title}</h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${currentWorkflow.accentBg} ${currentWorkflow.accentBorder} ${currentWorkflow.accentText}`}>
                    {currentWorkflow.role}
                  </span>
                </div>
                <p className={`text-xs md:text-sm mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Flagship Blueprint: <b className="text-teal-400">{currentWorkflow.blueprintExample.name}</b> (Blueprint #{currentWorkflow.blueprintExample.number})
                </p>
              </div>
            </div>

            {/* Interactive Player Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  isPlaying 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-teal-500/10 text-teal-400 border-teal-500/30 hover:bg-teal-500/20'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Auto-Play' : 'Auto-Play Simulation'}</span>
              </button>

              <button
                onClick={() => setActiveStepIndex(0)}
                className={`p-2 rounded-xl border transition-colors ${
                  isLight ? 'border-slate-200 text-slate-600 hover:bg-slate-100' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
                title="Restart Workflow"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <Link
                href={`/workspace?blueprint=${currentWorkflow.blueprintExample.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-105"
              >
                <span>Try on Canvas</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-8 grid grid-cols-5 gap-2 md:gap-4">
            {currentWorkflow.steps.map((step, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`text-left p-3 md:p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-teal-500/15 border-teal-500 text-teal-400 shadow-md ring-1 ring-teal-500/30'
                      : isPast
                        ? isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800/40 border-slate-700 text-slate-300'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase">Phase {step.stepNumber}</span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-teal-400 animate-pulse' : 'bg-slate-600'}`} />
                    )}
                  </div>
                  <h4 className="font-bold text-xs line-clamp-1">{step.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Main 2-Column Split: Step Details (Left) + Interactive Visual Simulation (Right) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN (5 Cols): Step Instructions & Pro-Tips */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Step Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold font-mono">
                    Step {currentStep.stepNumber} of 5
                  </span>
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {currentStep.whereToClick}
                  </span>
                </div>
                <h3 className="text-2xl font-black">{currentStep.title}</h3>
                <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {currentStep.description}
                </p>
              </div>

              {/* Where to Click Callout Box */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isLight ? 'bg-blue-50/70 border-blue-200 text-blue-950' : 'bg-blue-950/30 border-blue-800/50 text-blue-200'
              }`}>
                <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <b className="font-bold uppercase tracking-wider text-[10px] text-blue-400">Navigation Hotspot</b>
                  <p className="font-medium">{currentStep.whereToClick}</p>
                </div>
              </div>

              {/* Actionable Prompt Recipe Box (if applicable) */}
              {currentStep.actionPrompt && (
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-slate-700/60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Prompt Recipe
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(currentStep.actionPrompt!)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedPrompt === currentStep.actionPrompt ? (
                        <>
                          <Check className="w-3 h-3 text-teal-400" />
                          <span className="text-teal-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className={`text-xs font-mono p-3 rounded-xl border leading-relaxed ${
                    isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}>
                    {currentStep.actionPrompt}
                  </p>
                </div>
              )}

              {/* Validation Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  What to Validate on Screen
                </h4>
                <ul className="space-y-2">
                  {currentStep.validationChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro-Tip Box */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
              }`}>
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-medium">
                  {currentStep.tip}
                </p>
              </div>

              {/* Navigation Stepper Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => {
                    setActiveStepIndex(Math.max(0, activeStepIndex - 1));
                    setIsPlaying(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    activeStepIndex === 0
                      ? 'opacity-40 cursor-not-allowed border-slate-700 text-slate-500'
                      : isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ← Previous Phase
                </button>

                <button
                  disabled={activeStepIndex === currentWorkflow.steps.length - 1}
                  onClick={() => {
                    setActiveStepIndex(Math.min(currentWorkflow.steps.length - 1, activeStepIndex + 1));
                    setIsPlaying(false);
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeStepIndex === currentWorkflow.steps.length - 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-700 text-slate-400'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20 hover:scale-105'
                  }`}
                >
                  Next Phase →
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN (7 Cols): Animated Canvas Simulation / Visual Walkthrough */}
            <div className="lg:col-span-7">
              <div className={`rounded-2xl border p-5 shadow-2xl relative overflow-hidden ${
                isLight ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-950 border-slate-800 text-white'
              }`}>
                
                {/* Visual Window Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      PromptCanvas Viewport • {currentWorkflow.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
                      <button
                        onClick={() => setVisualMode('gif')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                          visualMode === 'gif'
                            ? 'bg-teal-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        🎬 Workflow GIF
                      </button>
                      <button
                        onClick={() => setVisualMode('simulation')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                          visualMode === 'simulation'
                            ? 'bg-teal-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        ⚡ Step Simulator
                      </button>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">1600 × 900 px</span>
                  </div>
                </div>

                {/* VISUAL SIMULATOR BODY */}
                <div className="h-[460px] rounded-xl bg-[#0F172A] border border-slate-800 relative overflow-hidden flex flex-col justify-between p-4">
                  
                  {visualMode === 'gif' ? (
                    <div className="w-full h-full flex flex-col items-center justify-between animate-fadeIn space-y-2">
                      <div className="relative w-full flex-1 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={PERSONA_GIFS[activePersona]}
                          alt={`${currentWorkflow.title} End-to-End Workflow`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
                        <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                          <Sparkles className="w-3.5 h-3.5" /> End-to-End Persona Workflow Recording
                        </span>
                        <a
                          href={PERSONA_GIFS[activePersona]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-teal-400 flex items-center gap-1 font-bold underline"
                        >
                          <span>Open Full GIF</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* SIMULATION 1: BLUEPRINT MATRIX DISCOVERY */}
                  {currentStep.outputVisualType === 'matrix' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-teal-400" />
                          <span className="text-xs font-mono text-slate-200">Search: &quot;{currentWorkflow.blueprintExample.name.slice(0, 30)}...&quot;</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">50 of 50 Blueprints</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-slate-800/60 border border-teal-500/60 shadow-lg shadow-teal-500/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-teal-400">Blueprint #{currentWorkflow.blueprintExample.number}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">5.0 / 5.0</span>
                          </div>
                          <h5 className="text-xs font-black text-white">{currentWorkflow.blueprintExample.name}</h5>
                          <div className="flex items-center gap-2 pt-2">
                            <button className="px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-[10px] flex items-center gap-1 animate-bounce">
                              <span>[ ➕ Add as New View ]</span>
                            </button>
                            <button className="px-2 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-[10px]">
                              Preview
                            </button>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-850/40 border border-slate-800 opacity-60 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">Blueprint #11</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">Strategy</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-300">C4 Enterprise System Context</h5>
                          <div className="pt-2">
                            <span className="text-[10px] text-slate-500">Available in Catalog</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Clicking <b>Add as New View</b> closes the matrix modal, creates a new view tab, and renders the collision-free master diagram onto the canvas.</span>
                      </div>
                    </div>
                  )}

                  {/* SIMULATION 2: PROMPT INGESTION & AI PARSING */}
                  {currentStep.outputVisualType === 'prompting' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                          <span>Prompt Input Stream</span>
                          <span className="text-teal-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 animate-spin" /> Gemini 3.7 Flash Reasoning
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                          &quot;{currentStep.actionPrompt}&quot;
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>AST Compilation &amp; Layout Engine</span>
                          <span className="text-teal-400 font-mono font-bold">100% Validated</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full w-full animate-pulse" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-teal-300">
                          ✓ 2D Bounding Boxes
                        </div>
                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-teal-300">
                          ✓ Zero Line Collisions
                        </div>
                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-teal-300">
                          ✓ Subnet Isolation
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SIMULATION 3: 2D CANVAS RENDER & COLLISION-FREE INSPECTION */}
                  {currentStep.outputVisualType === 'canvas_render' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px]">
                        <span className="font-bold text-slate-300 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-teal-400" /> Multi-Tier Enterprise Topology Viewport
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                            100% Vector Matched
                          </span>
                          <span className="text-slate-400">Zoom: 100%</span>
                        </div>
                      </div>

                      {/* Mock Canvas Viewport Diagram */}
                      <div className="grid grid-cols-4 gap-2 p-3 bg-white/95 text-slate-900 rounded-xl border border-slate-300 shadow-inner h-[280px]">
                        <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[9px] flex flex-col justify-between">
                          <b className="text-blue-700">Tier 1: Ingress / Edge</b>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">Dedicated 100G Interconnect</div>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">Cloud HA VPN Backup</div>
                        </div>

                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[9px] flex flex-col justify-between">
                          <b className="text-emerald-700">Tier 2: Hub Project</b>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">Cloud Router BGP</div>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">Private Service Connect</div>
                        </div>

                        <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-[9px] flex flex-col justify-between">
                          <b className="text-purple-700">Tier 3: Workload Spokes</b>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">GKE Autopilot Subnet</div>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">Vertex AI Gemini 3.7</div>
                        </div>

                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[9px] flex flex-col justify-between">
                          <b className="text-amber-700">Tier 4: Zero-Trust &amp; Obs</b>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">VPC-SC Perimeter</div>
                          <div className="p-1.5 bg-white rounded border text-slate-700 text-[8px]">Cloud Asset Inventory</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                        <span>Collision Score: 0 (Strictly Zero Overlap)</span>
                        <span>Channel Gap: 140px Column Pitch</span>
                      </div>
                    </div>
                  )}

                  {/* SIMULATION 4: VERSION DIFFING (v1 -> v2) */}
                  {currentStep.outputVisualType === 'version_diff' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-2">
                          <History className="w-4 h-4 text-teal-400" />
                          <span className="text-xs font-mono font-bold text-white">Version Timeline Inspector</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">v1 (Base)</span>
                          <span className="text-slate-500">→</span>
                          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 font-bold text-[10px]">v2 (Hardened)</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Baseline (v1)</span>
                            <span className="text-[9px] text-slate-500">Initial Generation</span>
                          </div>
                          <p className="text-[11px] text-slate-300">Standard Hub-and-Spoke Shared VPC topology.</p>
                          <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            9 Components
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/50 space-y-1.5 shadow-lg shadow-teal-500/10">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-teal-400">Active (v2)</span>
                            <span className="text-[9px] text-teal-300">Refined via Chat</span>
                          </div>
                          <p className="text-[11px] text-slate-200">+ Cloud HA VPN, Cloud KMS HSM, &amp; Cloud Armor WAF.</p>
                          <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                            12 Components (+3 Added)
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                          Zero manual code loss with instant 1-click rollback to v1.
                        </span>
                        <button className="px-3 py-1 rounded bg-slate-800 text-xs font-bold text-slate-300 hover:text-white">
                          Rollback
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SIMULATION 5: ENTERPRISE EXPORT MODAL */}
                  {currentStep.outputVisualType === 'export_modal' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-teal-400" />
                          <span className="text-xs font-bold text-white">Enterprise Export Matrix</span>
                        </div>
                        <span className="text-[10px] font-mono text-teal-400">Multi-Format Dispatch</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition-colors cursor-pointer group space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-red-400" />
                              <b className="text-xs text-white">Architecture Dossier (PDF)</b>
                            </div>
                            <span className="text-[10px] text-teal-400 group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Executive Summary, Component Inventory, SLAs &amp; Sign-off blocks.</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition-colors cursor-pointer group space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Presentation className="w-4 h-4 text-orange-400" />
                              <b className="text-xs text-white">PowerPoint Presentation (.pptx)</b>
                            </div>
                            <span className="text-[10px] text-teal-400 group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Native Boardroom slide deck with high-res vector diagram embeds.</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition-colors cursor-pointer group space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Download className="w-4 h-4 text-blue-400" />
                              <b className="text-xs text-white">High-Res PNG &amp; Vector SVG</b>
                            </div>
                            <span className="text-[10px] text-teal-400 group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Ultra-sharp 300 DPI vector graphic for wikis and technical documentation.</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-400 transition-colors cursor-pointer group space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Code className="w-4 h-4 text-purple-400" />
                              <b className="text-xs text-white">Draw.io Editable XML</b>
                            </div>
                            <span className="text-[10px] text-teal-400 group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Standard diagrams.net XML with 100% preserved geometry coordinates.</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-300 text-center font-mono">
                        Ready for instant download with 1-click execution.
                      </div>
                    </div>
                  )}

                  {/* Visual Footer Simulation Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-400" /> Phase {currentStep.stepNumber} of 5 Active
                    </span>
                    <span>PromptCanvas Enterprise Architecture Suite</span>
                  </div>
                    </>
                  )}

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== PERSONA WORKFLOW GIF GALLERY ==================== */}
      <section className={`py-16 px-6 md:px-12 border-t ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-slate-800'
      }`}>
        <div className="max-w-[1600px] mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Direct Video / GIF Links
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              Watch End-to-End Workflow Recordings
            </h2>
            <p className={`text-sm md:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Click on any animated workflow GIF below to watch the full screen recording, see where to click, how to input prompts, validate canvas outputs, and export boardroom deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* GIF 1: Enterprise Cloud Architect */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] shadow-xl ${
              isLight ? 'bg-white border-slate-200 hover:border-blue-500' : 'bg-slate-900 border-slate-800 hover:border-blue-500'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🏢</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Blueprint #17
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-blue-400">
                  Principal Enterprise Architect
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Landing Zone discovery, CIDR prompting, Hub-and-Spoke Shared VPC validation, version v1 → v2 increment, and PDF/PPTX export.
                </p>
                <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_enterprise_architect.gif"
                    alt="Enterprise Architect Workflow"
                    className="w-full h-full object-cover"
                  />
                  <a
                    href="/workflows/workflow_enterprise_architect.gif"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs font-bold text-white transition-opacity backdrop-blur-xs"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Full GIF</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/30 flex items-center justify-between">
                <a
                  href="/workflows/workflow_enterprise_architect.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_enterprise_architect.gif"
                  download="workflow_enterprise_architect.gif"
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* GIF 2: Data Platform & AI Engineer */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] shadow-xl ${
              isLight ? 'bg-white border-slate-200 hover:border-purple-500' : 'bg-slate-900 border-slate-800 hover:border-purple-500'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🤖</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Blueprint #41
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-purple-400">
                  Data Platform &amp; AI Engineer
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Retail AI Core with AlloyDB pgvector, BigQuery Lakehouse, Star Schema validation, Looker BI, and Draw.io XML export.
                </p>
                <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_data_ai_engineer.gif"
                    alt="Data & AI Engineer Workflow"
                    className="w-full h-full object-cover"
                  />
                  <a
                    href="/workflows/workflow_data_ai_engineer.gif"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs font-bold text-white transition-opacity backdrop-blur-xs"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Full GIF</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/30 flex items-center justify-between">
                <a
                  href="/workflows/workflow_data_ai_engineer.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-purple-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_data_ai_engineer.gif"
                  download="workflow_data_ai_engineer.gif"
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* GIF 3: Cloud Migration Consultant */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] shadow-xl ${
              isLight ? 'bg-white border-slate-200 hover:border-emerald-500' : 'bg-slate-900 border-slate-800 hover:border-emerald-500'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">💼</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Blueprint #1
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-emerald-400">
                  Cloud Migration Consultant
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Legacy on-prem silos, spaghetti integration matrix, StratoZone profiling, 6Rs 4-wave roadmap, TCO $/mo analysis, and PPTX pitch pack.
                </p>
                <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_cloud_migration.gif"
                    alt="Cloud Migration Consultant Workflow"
                    className="w-full h-full object-cover"
                  />
                  <a
                    href="/workflows/workflow_cloud_migration.gif"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs font-bold text-white transition-opacity backdrop-blur-xs"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Full GIF</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/30 flex items-center justify-between">
                <a
                  href="/workflows/workflow_cloud_migration.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_cloud_migration.gif"
                  download="workflow_cloud_migration.gif"
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* GIF 4: CISO & DevSecOps Lead */}
            <div className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] shadow-xl ${
              isLight ? 'bg-white border-slate-200 hover:border-rose-500' : 'bg-slate-900 border-slate-800 hover:border-rose-500'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🔒</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Blueprint #14
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-rose-400">
                  CISO &amp; DevSecOps Lead
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  VPC-SC perimeter audit, automated static security scanner, 1-click remediation to hardened v2, and SOC2 / CIS compliance PDF export.
                </p>
                <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_ciso_secops.gif"
                    alt="CISO & DevSecOps Workflow"
                    className="w-full h-full object-cover"
                  />
                  <a
                    href="/workflows/workflow_ciso_secops.gif"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs font-bold text-white transition-opacity backdrop-blur-xs"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Full GIF</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/30 flex items-center justify-between">
                <a
                  href="/workflows/workflow_ciso_secops.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-rose-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_ciso_secops.gif"
                  download="workflow_ciso_secops.gif"
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== WORKSPACE INTERFACE MAP & WHERE TO CLICK ==================== */}
      <section className={`py-16 px-6 md:px-12 border-t ${
        isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div className="max-w-[1600px] mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-black">Workspace Interface &amp; Hotspot Map</h2>
            <p className={`text-sm md:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Get familiar with the PromptCanvas layout. Every control is engineered for sub-second execution without hidden menus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-extrabold text-base">Left Studio &amp; AI Prompt Engine</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Enter your architectural requirements in plain English, select architecture notation standards, and click <b>Generate / Iterate</b> to trigger Gemini 3.7 Flash reasoning.
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 inline-block">
                Hotspot: Left Sidebar Studio
              </span>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-extrabold text-base">Templates Gallery &amp; Blueprint Matrix</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Explore all 50 enterprise architecture blueprints categorized across Strategy, Migration, Data, AI, Security, and Industry 4.0. Click <b>[ ➕ Add as New View ]</b> for 1-click loading.
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 inline-block">
                Hotspot: Sidebar &quot;Templates Gallery&quot;
              </span>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-extrabold text-base">Central High-DPI Canvas Viewport</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Full 1600px wide interactive diagram viewport with pan, zoom, dark/light theme synchronization, and 2D bounding box collision protection.
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 inline-block">
                Hotspot: Main Center Workspace
              </span>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black">
                4
              </div>
              <h3 className="font-extrabold text-base">Version History &amp; Visual Diff</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Every prompt modification increments your version tag (v1 → v2 → v3). Use the top version dropdown to rollback or compare visual diffs side-by-side.
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 inline-block">
                Hotspot: Top Header Version Pill (v1 ▾)
              </span>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black">
                5
              </div>
              <h3 className="font-extrabold text-base">Insights &amp; Cloud Cost Estimation</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Click the <b>Insights</b> / <b>$/mo</b> pill in the top header to view automated cloud infrastructure cost calculations, SKU breakdowns, and FinOps optimization recommendations.
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 inline-block">
                Hotspot: Top Right &quot;Insights ▾&quot;
              </span>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-black">
                6
              </div>
              <h3 className="font-extrabold text-base">Multi-Format Enterprise Export</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Click <b>Edit ▾</b> or <b>Export</b> to dispatch high-res PNG, vector SVG, Draw.io XML, Executive PDF Dossiers, or Boardroom PowerPoint presentations (.pptx).
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 inline-block">
                Hotspot: Top Right &quot;Edit ▾&quot; → Export
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== QUICK PRO-TIPS & KEYBOARD SHORTCUTS ==================== */}
      <section className="py-16 px-6 md:px-12 max-w-[1600px] mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-black">Pro-Tips &amp; Keyboard Shortcuts</h2>
          <p className={`text-xs md:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Accelerate your architecture workflow with these power-user shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl border space-y-1.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Search Blueprints</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-mono text-[10px]">Cmd / Ctrl + K</kbd>
            </div>
            <p className="text-[11px] text-slate-400">Instantly search all 50 reference architectures by domain or keywords.</p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Export Modal</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-mono text-[10px]">Cmd / Ctrl + E</kbd>
            </div>
            <p className="text-[11px] text-slate-400">Open the multi-format export dialog (PDF, PPTX, SVG, XML).</p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Pan Canvas</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-mono text-[10px]">Space + Drag</kbd>
            </div>
            <p className="text-[11px] text-slate-400">Smoothly navigate across wide 1600px enterprise multi-tier topologies.</p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Toggle Dark / Light</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-mono text-[10px]">Cmd / Ctrl + D</kbd>
            </div>
            <p className="text-[11px] text-slate-400">Synchronize the UI and canvas contrast background instantly.</p>
          </div>
        </div>
      </section>

      {/* ==================== ACTION CTA FOOTER ==================== */}
      <section className={`py-16 px-6 md:px-12 border-t ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">
            Ready to Build Your Enterprise Architecture?
          </h2>
          <p className={`text-sm md:text-base max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Launch PromptCanvas now to explore all 50 master blueprints or compile custom architectures with Gemini 3.7 Flash in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-teal-500/20 hover:scale-105 transition-all"
            >
              <span>Launch Interactive Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border transition-colors ${
                isLight ? 'border-slate-300 text-slate-800 hover:bg-slate-100' : 'border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Explore 50-Blueprint Matrix</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
