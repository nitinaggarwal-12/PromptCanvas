'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack,
  SkipForward,
  Download, 
  FileText, 
  Presentation, 
  Layers, 
  Shield, 
  Database, 
  Bot, 
  Cpu, 
  Compass, 
  Search, 
  Zap, 
  History, 
  Check, 
  Copy, 
  ExternalLink,
  Code,
  Sliders,
  DollarSign,
  Lock,
  Workflow,
  Terminal,
  Gauge
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';

type PersonaKey = 'quickstart' | 'architect' | 'data_ai' | 'consultant' | 'secops';

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
  gifPath: string;
  frames: {
    frameIndex: number;
    imagePath: string;
    actionLabel: string;
    stepNumber: number;
    title: string;
    whereToClick: string;
    description: string;
    promptRecipe?: string;
    validationChecklist: string[];
    tip: string;
  }[];
}

const PERSONA_WORKFLOWS: Record<PersonaKey, PersonaWorkflow> = {
  quickstart: {
    id: 'quickstart',
    title: 'Universal First-Time User Quickstart',
    badge: 'End-to-End Tour',
    role: 'First-Time User Guide',
    avatar: '🚀',
    tagline: 'Learn how to navigate, where to click, provide input, validate canvas output, make edits, save versions, and export.',
    color: '#14B8A6',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/30',
    accentText: 'text-teal-400',
    gifPath: '/workflows/workflow_first_time_user_quickstart.gif',
    frames: [
      {
        frameIndex: 0,
        imagePath: '/workflows/frames/quickstart/frame_01.png',
        actionLabel: '1. Workspace Orientation: Studio (Left), Header (Top) & 2D Canvas (Center)',
        stepNumber: 1,
        title: 'Workspace Orientation & Layout',
        whereToClick: 'Main Workspace Interface',
        description: 'PromptCanvas is split into 3 primary zones: Left Studio (AI Prompt Engine & Use Case Intake), Top Header (Project Name, View Tabs, Version Pill, Theme & Export), and Central 2D High-DPI Canvas Viewport.',
        validationChecklist: [
          'Left Studio is ready for prompt input',
          'Canvas is set to high-DPI 1600px desktop grid'
        ],
        tip: 'Pro-Tip: Hit Cmd+D / Ctrl+D anytime to toggle synchronized dark/light contrast backgrounds.'
      },
      {
        frameIndex: 1,
        imagePath: '/workflows/frames/quickstart/frame_02.png',
        actionLabel: '2. Where to Click: Active Use Case Prompt Area in Left Studio',
        stepNumber: 2,
        title: 'Where to Click: Active Use Case Prompt',
        whereToClick: 'Left Studio -> "ACTIVE USE CASE PROMPT" text area',
        description: 'Click directly into the prompt text area in the Left Studio. This is where you specify your architectural scope, component requirements, databases, networking parameters, and SLAs.',
        validationChecklist: [
          'Cursor focus active inside the prompt input box',
          'Architecture type selector default set to Multi-tier Enterprise'
        ],
        tip: 'You can also click "Suggested Transformations" below the box for 1-click feature additions.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/quickstart/frame_03.png',
        actionLabel: '3. Providing Input: Type System Scope, Microservices, Databases & SLAs',
        stepNumber: 3,
        title: 'Providing Natural Language Input',
        whereToClick: 'Left Studio -> Prompt Box',
        description: 'Type plain English requirements with concrete details (e.g. GKE Autopilot, Cloud SQL for PostgreSQL, Pub/Sub, and Cloud Armor WAF).',
        promptRecipe: 'Design an Enterprise Cloud Platform on Google Cloud featuring Cloud Armor WAF, GKE Autopilot microservices with private VPC peering, Cloud SQL high availability, and Pub/Sub event ingestion.',
        validationChecklist: [
          'Prompt contains key GCP services, networking constraints, and SLAs',
          'Gemini 3.7 Flash engine badge shows ready'
        ],
        tip: 'The more specific your constraints (CIDRs, ASNs, throughput), the more detailed the compiled architecture.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/quickstart/frame_04.png',
        actionLabel: '4. Generating: Gemini 3.7 Flash Compiling 2D AST Graph',
        stepNumber: 4,
        title: 'Compiling AST Architecture Graph',
        whereToClick: 'Left Studio -> Click "✨ Generate Architecture"',
        description: 'Gemini 3.7 Flash reasons over your prompt, parses services into functional tiers, calculates 2D bounding boxes with zero line collision, and compiles the Draw.io XML graph.',
        validationChecklist: [
          'AI generation progress bar reflects AST validation',
          'Zero-overlap layout engine verifies node margins'
        ],
        tip: 'Compilation takes under 2 seconds and produces native, editable diagram elements.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/quickstart/frame_05.png',
        actionLabel: '5. Live Output Rendered: 1600px High-DPI Multi-Tier Diagram',
        stepNumber: 5,
        title: 'Live Canvas Output Rendering',
        whereToClick: 'Central 2D Canvas Viewport',
        description: 'The compiled architecture diagram renders instantly on the high-DPI canvas with clean tier containers, high-contrast badges, and color-coded connector lines.',
        validationChecklist: [
          'Verify all architectural tiers render in logical left-to-right flow',
          'Check that connecting lines have pill-shaped protocol labels'
        ],
        tip: 'Hold the Spacebar + Click-Drag to smoothly pan across wide 1600px topologies.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/quickstart/frame_06.png',
        actionLabel: '6. Validating Output: Zoom, Pan, & Verify Zero Line Collisions',
        stepNumber: 6,
        title: 'Validating Nodes & Subnets',
        whereToClick: 'Top Right Canvas Controls (Zoom +/- / 100% Reset)',
        description: 'Zoom in to inspect individual node attributes, CIDR ranges, database schemas, and verify that connector lines never slice across intermediate boxes.',
        validationChecklist: [
          'Verify node boxes maintain at least 30px safety margins from borders',
          'Inspect the Code Viewer (Code icon) to audit raw XML coordinates'
        ],
        tip: 'Click on any node to view its detailed architectural specs and GCP service lineage.'
      },
      {
        frameIndex: 6,
        imagePath: '/workflows/frames/quickstart/frame_07.png',
        actionLabel: '7. Making Edits: Prompt Conversational Refinements in Studio Chat',
        stepNumber: 7,
        title: 'Making Interactive Edits & Refinements',
        whereToClick: 'Left Studio Chat -> "Iterate: Enter any change to create v2"',
        description: 'Type follow-up adjustments in plain English (e.g. "Add Cloud HA VPN IPsec backup and Cloud KMS HSM"). Gemini AI patches the AST graph non-destructively.',
        promptRecipe: 'Add Cloud HA VPN dual tunnels as automated BGP failover and enforce Cloud KMS HSM 90-day key rotation.',
        validationChecklist: [
          'Verify the new components appear on the canvas without altering existing layout geometry',
          'Check that new version v2 is queued'
        ],
        tip: 'You can also select from the 1-click "Suggested Transformations" pills.'
      },
      {
        frameIndex: 7,
        imagePath: '/workflows/frames/quickstart/frame_08.png',
        actionLabel: '8. Saving & Version Increase: Auto-Committed to v2 with Rollback Timeline',
        stepNumber: 8,
        title: 'Saving & Version Increments (v1 -> v2)',
        whereToClick: 'Top Header -> Version Dropdown (v1 ▾)',
        description: 'PromptCanvas automatically commits an immutable version snapshot (v2) while preserving v1 in rollback history. Click the version dropdown to switch or compare visual diffs.',
        validationChecklist: [
          'Version badge increments to v2',
          'History dropdown contains both v1 and v2 with timestamps',
          '1-click rollback to v1 is instantly accessible'
        ],
        tip: 'Every version mutation preserves 100% of previous states with zero risk of code loss.'
      },
      {
        frameIndex: 8,
        imagePath: '/workflows/frames/quickstart/frame_09.png',
        actionLabel: '9. Export Deliverables: Select PDF Dossier, PPTX Slides, or Draw.io XML',
        stepNumber: 9,
        title: 'Multi-Format Enterprise Export',
        whereToClick: 'Top Right Navigation -> Click "Edit ▾" or "Export"',
        description: 'Export publication-grade deliverables for your Architecture Review Board (ARB). Download Executive PDF Dossiers, Boardroom PowerPoint (.pptx) slides, high-res PNG/SVG vectors, or editable Draw.io XML.',
        validationChecklist: [
          'Download PDF Architecture Dossier with Executive Summary and SLAs',
          'Download native PowerPoint (.pptx) slides with vector diagrams',
          'Download Draw.io XML for offline editing in diagrams.net'
        ],
        tip: 'Click "Insights & Cost" ($/mo) before exporting to automatically include live GCP cloud cost estimates.'
      }
    ]
  },
  architect: {
    id: 'architect',
    title: 'Principal Enterprise Cloud Architect',
    badge: 'Enterprise Infrastructure & C4',
    role: 'Lead Cloud Architect',
    avatar: '🏢',
    tagline: 'Design greenfield landing zones, zero-trust VPC networks, and multi-region topologies.',
    color: '#2563EB',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    accentText: 'text-blue-400',
    gifPath: '/workflows/workflow_enterprise_architect.gif',
    frames: [
      {
        frameIndex: 0,
        imagePath: '/workflows/frames/architect/frame_01.png',
        actionLabel: '1. Inputting Greenfield Landing Zone & Hub-and-Spoke Requirements',
        stepNumber: 1,
        title: 'Inputting Landing Zone Requirements',
        whereToClick: 'Left Studio -> Prompt Box',
        description: 'Provide enterprise networking constraints: 100G Dedicated Interconnect, Cloud Router BGP ASN 65001, GKE Autopilot pod CIDR (10.20.0.0/16), and PSC consumer endpoints.',
        promptRecipe: 'Design a Google Cloud Landing Zone and Shared VPC Network Fabric with 100G Dedicated Interconnect, Cloud Router BGP, PSC Hub 10.100.0.0/24, GKE Autopilot, and VPC-SC perimeter.',
        validationChecklist: ['Prompt contains CIDRs and SLA parameters'],
        tip: 'Enforce Hub-and-Spoke Shared VPC from the Diagram Type dropdown.'
      },
      {
        frameIndex: 1,
        imagePath: '/workflows/frames/architect/frame_02.png',
        actionLabel: '2. Inspecting Dedicated 100G Interconnect & Cloud Router BGP',
        stepNumber: 2,
        title: 'Inspecting Hybrid Transit & Hub',
        whereToClick: 'Canvas -> Column 1 & Column 2',
        description: 'Verify 100G Interconnect demarcation and Cloud Router dynamic BGP route propagation.',
        validationChecklist: ['Demarcation lines route cleanly into Hub'],
        tip: 'Hover over connector lines to inspect BGP session details.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/architect/frame_03.png',
        actionLabel: '3. Validating Workload Spokes (GKE Autopilot Subnets & PSC)',
        stepNumber: 3,
        title: 'Validating Workload Spokes',
        whereToClick: 'Canvas -> Column 3 (Production Workloads)',
        description: 'Confirm GKE Autopilot subnets (10.10.0.0/20), Serverless Direct VPC egress, and PSA.',
        validationChecklist: ['Spoke subnets have zero public IP ingress'],
        tip: 'Verify Private Service Connect endpoints link directly to Vertex AI.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/architect/frame_04.png',
        actionLabel: '4. Verifying Zero-Trust Perimeter (VPC-SC & Cloud KMS HSM Dual Rings)',
        stepNumber: 4,
        title: 'Auditing Zero-Trust Perimeters',
        whereToClick: 'Canvas -> Column 4 (Zero-Trust Security)',
        description: 'Verify VPC Service Controls boundary encapsulation and Cloud KMS HSM 90-day key rotation.',
        validationChecklist: ['VPC-SC perimeter demarcation is highlighted'],
        tip: 'Audit Security Command Center rules mapped on canvas.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/architect/frame_05.png',
        actionLabel: '5. Version Incremented to v2: Architecture Review Board (ARB) Baseline',
        stepNumber: 5,
        title: 'Committing Version 2 for ARB Sign-off',
        whereToClick: 'Header -> Version Tag (v2)',
        description: 'Hardened version v2 committed with complete audit lineage.',
        validationChecklist: ['Version v2 tagged with timestamp'],
        tip: 'Compare visual diff between v1 and v2 before exporting.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/architect/frame_06.png',
        actionLabel: '6. Exporting Boardroom PPTX Deck & Executive PDF Dossier',
        stepNumber: 6,
        title: 'Exporting Executive Deliverables',
        whereToClick: 'Top Navigation -> Edit ▾ -> Export',
        description: 'Generate boardroom PowerPoint presentation and PDF architecture dossier.',
        validationChecklist: ['PPTX and PDF files download successfully'],
        tip: 'Present the generated slide deck directly in ARB meetings.'
      }
    ]
  },
  data_ai: {
    id: 'data_ai',
    title: 'Data Platform & AI Solutions Engineer',
    badge: 'Lakehouse & Agentic Mesh',
    role: 'Lead Data Engineer',
    avatar: '🤖',
    tagline: 'Construct real-time streaming pipelines, Medallion Lakehouses, and Gemini multi-agent swarm meshes.',
    color: '#8B5CF6',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    accentText: 'text-purple-400',
    gifPath: '/workflows/workflow_data_ai_engineer.gif',
    frames: [
      {
        frameIndex: 0,
        imagePath: '/workflows/frames/data_ai/frame_01.png',
        actionLabel: '1. Prompting Real-Time Streaming, Vector Embeddings & Lakehouse',
        stepNumber: 1,
        title: 'Inputting Data & AI Requirements',
        whereToClick: 'Left Studio -> Prompt Box',
        description: 'Define real-time streaming, Vertex AI Search, AlloyDB pgvector, and BigQuery Lakehouse.',
        promptRecipe: 'Build an Omnichannel Retail AI Platform with AlloyDB pgvector, BigQuery Lakehouse Star Schema, and Looker BI.',
        validationChecklist: ['Data flows and model parameters defined'],
        tip: 'Specify pgvector index types (HNSW vs IVFFlat) for tailored query performance.'
      },
      {
        frameIndex: 1,
        imagePath: '/workflows/frames/data_ai/frame_02.png',
        actionLabel: '2. Inspecting Retail AI Core (AlloyDB pgvector & Gemini Concierge)',
        stepNumber: 2,
        title: 'Inspecting AI Intelligence Core',
        whereToClick: 'Canvas -> Column 3',
        description: 'Validate sub-10ms similarity recall and Gemini 3.7 Pro Concierge microservices.',
        validationChecklist: ['AlloyDB pgvector connects to Cloud Run'],
        tip: 'Check vector dimension parameters on the embedding nodes.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/data_ai/frame_03.png',
        actionLabel: '3. Validating BigQuery Lakehouse Star Schema & Looker BI Funnel',
        stepNumber: 3,
        title: 'Validating Lakehouse Star Schema',
        whereToClick: 'Canvas -> Column 4',
        description: 'Inspect Fact_Retail_Sales, Dim_Shopper tables, and real-time Looker dashboards.',
        validationChecklist: ['Star schema relationships render clearly'],
        tip: 'Verify transaction date partitioning on BigQuery tables.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/data_ai/frame_04.png',
        actionLabel: '4. Conversational Refinement: Adding Sub-Second Fraud Anomaly Rules',
        stepNumber: 4,
        title: 'Refining Pipeline with Chat',
        whereToClick: 'Left Studio Chat',
        description: 'Prompt Gemini to inject real-time fraud scoring and automated alert triggers.',
        promptRecipe: 'Add real-time fraud scoring microservice on Cloud Run with sub-50ms latency.',
        validationChecklist: ['Fraud scoring service added to pipeline'],
        tip: 'Check Eventarc trigger links connecting to alerting topics.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/data_ai/frame_05.png',
        actionLabel: '5. Version Committed to v2 with Immutable Rollback Snapshot',
        stepNumber: 5,
        title: 'Committing Version 2 Snapshot',
        whereToClick: 'Header -> Version Tag (v2)',
        description: 'Version v2 saved with rollback ability to baseline state.',
        validationChecklist: ['v2 snapshot committed'],
        tip: 'Create branched views to explore alternative vector stores.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/data_ai/frame_06.png',
        actionLabel: '6. Exporting Editable Draw.io XML & PDF Data Dictionary',
        stepNumber: 6,
        title: 'Exporting Data Architecture Package',
        whereToClick: 'Top Navigation -> Export',
        description: 'Download Draw.io XML and comprehensive PDF Data Dictionary.',
        validationChecklist: ['Draw.io XML loads in diagrams.net'],
        tip: 'Use Draw.io XML for collaborative editing with external partners.'
      }
    ]
  },
  consultant: {
    id: 'consultant',
    title: 'Cloud Migration & Modernization Consultant',
    badge: '6Rs Modernization & TCO',
    role: 'Transformation Partner',
    avatar: '💼',
    tagline: 'Transform legacy on-prem monoliths and spaghetti integrations into wave-based migration roadmaps.',
    color: '#10B981',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    gifPath: '/workflows/workflow_cloud_migration.gif',
    frames: [
      {
        frameIndex: 0,
        imagePath: '/workflows/frames/consultant/frame_01.png',
        actionLabel: '1. Prompting On-Prem Legacy Silos Discovery & 6Rs Wave Plan',
        stepNumber: 1,
        title: 'Prompting Discovery & Assessment',
        whereToClick: 'Left Studio -> Prompt Box',
        description: 'Provide legacy inventory: Mainframe, Oracle 11g RAC, SAP ECC, and spaghetti ETL scripts.',
        promptRecipe: 'Assess on-prem legacy silos, spaghetti integration matrix, StratoZone Discovery Appliance, and 4 migration waves.',
        validationChecklist: ['Legacy monoliths and discovery tools defined'],
        tip: 'Include server counts and database storage volumes for accurate TCO estimates.'
      },
      {
        frameIndex: 1,
        imagePath: '/workflows/frames/consultant/frame_02.png',
        actionLabel: '2. Mapping On-Prem Mainframe, Oracle 11g RAC & SAP ECC Monoliths',
        stepNumber: 2,
        title: 'Mapping On-Premises Monoliths',
        whereToClick: 'Canvas -> Column 1 (Legacy Silos)',
        description: 'Inspect mainframe workloads, RAC database coupling, and shadow IT file shares.',
        validationChecklist: ['Legacy silos render in red zone'],
        tip: 'Risk callouts highlight schema drift and hardcoded credentials.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/consultant/frame_03.png',
        actionLabel: '3. Auditing Spaghetti Integration Matrix & Shadow IT DB Locks',
        stepNumber: 3,
        title: 'Auditing Spaghetti Middleware',
        whereToClick: 'Canvas -> Column 2 (Spaghetti Matrix)',
        description: 'Review TIBCO ESB bus, Informatica ETL, and unmonitored shell scripts.',
        validationChecklist: ['Spaghetti interconnects route across silos'],
        tip: 'Identify critical dependencies before scheduling cutover waves.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/consultant/frame_04.png',
        actionLabel: '4. Validating 4 Target Modernization Waves (Rehost -> Retire)',
        stepNumber: 4,
        title: 'Validating 6Rs Migration Waves',
        whereToClick: 'Canvas -> Column 4 (Target State)',
        description: 'Verify 4 migration waves: Rehost (Wave 1), Replatform (Wave 2), Refactor (Wave 3), Retire (Wave 4).',
        validationChecklist: ['All 4 waves display concrete outcomes'],
        tip: 'Each wave defines clear decommission milestones.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/consultant/frame_05.png',
        actionLabel: '5. Reviewing 42% TCO OpEx Reduction & Cloud FinOps ROI',
        stepNumber: 5,
        title: 'Reviewing TCO & FinOps Score',
        whereToClick: 'Top Header -> Insights & Cost ($/mo)',
        description: 'Inspect 3-year TCO financial modeling and 42% OpEx reduction calculation.',
        validationChecklist: ['TCO savings breakdown displayed'],
        tip: 'Include TCO numbers in your client steering committee slides.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/consultant/frame_06.png',
        actionLabel: '6. Version Saved to v2: Decommissioning Roadmap Approved',
        stepNumber: 6,
        title: 'Exporting Client Pitch Deck',
        whereToClick: 'Top Navigation -> Export -> PowerPoint (.pptx)',
        description: 'Export boardroom PowerPoint presentation and executive migration dossier.',
        validationChecklist: ['PPTX pitch pack downloaded'],
        tip: 'Editable slides allow instant customization with client branding.'
      }
    ]
  },
  secops: {
    id: 'secops',
    title: 'CISO & DevSecOps Governance Lead',
    badge: 'Zero-Trust & Compliance',
    role: 'Security Architect',
    avatar: '🔒',
    tagline: 'Audit zero-trust perimeters, enforce VPC Service Controls, and generate SOC2 / CIS compliance dossiers.',
    color: '#EF4444',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/30',
    accentText: 'text-rose-400',
    gifPath: '/workflows/workflow_ciso_secops.gif',
    frames: [
      {
        frameIndex: 0,
        imagePath: '/workflows/frames/secops/frame_01.png',
        actionLabel: '1. Prompting Zero-Trust Isolation, STRIDE Threat Modeling & VPC-SC',
        stepNumber: 1,
        title: 'Prompting Zero-Trust Security Requirements',
        whereToClick: 'Left Studio -> Prompt Box',
        description: 'Specify regulatory standards: PCI-DSS 4.0, SOC2 Type II, and VPC Service Controls.',
        promptRecipe: 'Enforce PCI-DSS 4.0 and SOC2 Type II: Cloud KMS HSM CMEK, VPC Service Controls, and Cloud Armor WAF.',
        validationChecklist: ['Compliance guardrails and policy IDs defined'],
        tip: 'Security guardrails automatically enforce CIS GCP Foundations.'
      },
      {
        frameIndex: 1,
        imagePath: '/workflows/frames/secops/frame_02.png',
        actionLabel: '2. Auditing Zero-Trust Perimeter Ingress/Egress Demarcation',
        stepNumber: 2,
        title: 'Auditing Perimeter Demarcation',
        whereToClick: 'Canvas -> Column 4 (Zero-Trust Security)',
        description: 'Verify VPC Service Controls perimeter encapsulating Storage, BigQuery, and Vertex AI.',
        validationChecklist: ['Perimeter ingress/egress rules validated'],
        tip: 'Check that Cloud KMS HSM dual rings have 90-day rotation enabled.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/secops/frame_03.png',
        actionLabel: '3. Applying 1-Click Automated Security Remediation',
        stepNumber: 3,
        title: 'Executing 1-Click Security Remediation',
        whereToClick: 'Left Studio Chat -> Apply Remediation',
        description: 'Prompt AI to automatically patch flagged security findings and seal egress paths.',
        promptRecipe: 'Remediate all findings: replace public endpoints with Private Service Connect.',
        validationChecklist: ['Vulnerabilities patched automatically'],
        tip: 'Review the visual diff to inspect newly sealed perimeters.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/secops/frame_04.png',
        actionLabel: '4. Version Hardened to v2 (CIS Benchmark & SOC2 Compliant)',
        stepNumber: 4,
        title: 'Committing Hardened Version v2',
        whereToClick: 'Header -> Version Tag (v2)',
        description: 'Version v2 hardened and ready for formal compliance auditing.',
        validationChecklist: ['Security scorecard reaches 100% compliance'],
        tip: 'Attach the version diff to your change management ticket.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/secops/frame_05.png',
        actionLabel: '5. Exporting SOC2 / ISO 27001 Cryptographic Audit Package',
        stepNumber: 5,
        title: 'Exporting Compliance Audit Package',
        whereToClick: 'Top Navigation -> Export -> PDF Audit Package',
        description: 'Download cryptographic, timestamped SOC2 / ISO 27001 Security Audit Package.',
        validationChecklist: ['PDF audit package contains cryptographic hash'],
        tip: 'Security dossiers include SHA-256 graph hashes for audit proof.'
      }
    ]
  }
};

export default function GuidePage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activePersona, setActivePersona] = useState<PersonaKey>('quickstart');
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const currentWorkflow = PERSONA_WORKFLOWS[activePersona];
  const totalFrames = currentWorkflow.frames.length;
  const activeFrame = currentWorkflow.frames[currentFrameIndex] || currentWorkflow.frames[0];

  // Playback timer with speed control
  useEffect(() => {
    if (!isPlaying) return;
    const baseDelay = 1800; // base delay in ms per frame
    const delay = Math.round(baseDelay / playbackSpeed);

    const timer = setInterval(() => {
      setCurrentFrameIndex(prev => (prev + 1) % totalFrames);
    }, delay);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, totalFrames, activePersona]);

  // Handle persona switch
  const handleSelectPersona = (key: PersonaKey) => {
    setActivePersona(key);
    setCurrentFrameIndex(0);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(prev => (prev + 1) % totalFrames);
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(prev => (prev - 1 + totalFrames) % totalFrames);
  };

  const handleRestart = () => {
    setCurrentFrameIndex(0);
    setIsPlaying(true);
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(promptText);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className={`min-h-screen font-sans ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0B0F19] text-white'}`}>
      
      {/* ==================== STICKY COMPACT TOP NAVBAR ==================== */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
        isLight ? 'bg-white/95 border-slate-200 shadow-xs' : 'bg-[#0F172A]/95 border-slate-800 shadow-md shadow-black/20'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                  PromptCanvas <span className="text-[10px] px-2 py-0.2 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono">Playbooks</span>
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-700/40 text-xs font-semibold">
              <Link href="/workspace" className={`px-3 py-1.5 rounded-lg transition-colors ${
                isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}>
                Canvas Workspace
              </Link>
              <Link href="/templates" className={`px-3 py-1.5 rounded-lg transition-colors ${
                isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}>
                50-Blueprint Matrix
              </Link>
              <span className="px-3 py-1.5 rounded-lg text-teal-400 bg-teal-500/10 border border-teal-500/20">
                Interactive Persona Guide
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleBtn />
            <Link
              href="/workspace"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Launch Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ==================== COMPACT HERO & PERSONA SWITCHER ==================== */}
      <section className="pt-6 pb-4 px-6 md:px-12 max-w-[1600px] mx-auto space-y-4">
        
        {/* Compact Title Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-700/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" /> First-Time User Playbooks &amp; Interactive Video Player
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Master PromptCanvas: <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">End-to-End Persona Workflows</span>
            </h1>
          </div>
          <p className={`text-xs max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Watch how to start with a prompt, navigate the workspace, validate 2D collision-free canvas output, chat to iterate, increase versions (v1 → v2), and export PDF/PPTX.
          </p>
        </div>

        {/* Compact Persona Switcher Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {(Object.keys(PERSONA_WORKFLOWS) as PersonaKey[]).map(key => {
            const p = PERSONA_WORKFLOWS[key];
            const isSelected = activePersona === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectPersona(key)}
                className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? isLight
                      ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'bg-slate-800 border-teal-400 shadow-lg shadow-teal-500/10 ring-2 ring-teal-400/30'
                    : isLight
                      ? 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500" />
                )}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-lg">{p.avatar}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${p.accentBg} ${p.accentBorder} ${p.accentText}`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-xs tracking-tight line-clamp-1">{p.title}</h3>
              </button>
            );
          })}
        </div>

      </section>

      {/* ==================== INTERACTIVE WORKFLOW VIDEO PLAYER & CANVAS CONTROLS ==================== */}
      <section className="pb-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className={`rounded-2xl border p-5 md:p-6 ${
          isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900/90 border-slate-800 shadow-2xl'
        }`}>
          
          {/* PLAYER TOP CONTROL BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/30">
            
            {/* Left: Active Persona & Step Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-xl shadow-md">
                {currentWorkflow.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base md:text-lg font-black">{currentWorkflow.title}</h2>
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold border ${currentWorkflow.accentBg} ${currentWorkflow.accentBorder} ${currentWorkflow.accentText}`}>
                    {currentWorkflow.role}
                  </span>
                </div>
                <p className="text-xs text-teal-400 font-mono font-bold flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeFrame.actionLabel}
                </p>
              </div>
            </div>

            {/* Right: Video Playback Controls (Play, Pause, Rev, Fwd, Speed) */}
            <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              
              {/* Step Backward */}
              <button
                onClick={handleStepBackward}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Step Backward (Previous Frame)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPlaying
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-teal-500 text-slate-950 font-black shadow-md hover:bg-teal-400'
                }`}
                title={isPlaying ? 'Pause Workflow' : 'Play Workflow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-amber-300" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              {/* Step Forward */}
              <button
                onClick={handleStepForward}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Step Forward (Next Frame)"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Restart Workflow"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Divider */}
              <div className="h-5 w-px bg-slate-800 mx-1" />

              {/* Speed Controls: 0.5x, 1.0x, 1.5x, 2.0x */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline flex items-center gap-0.5">
                  <Gauge className="w-3 h-3 text-slate-400" /> Speed:
                </span>
                {[0.5, 1.0, 1.5, 2.0].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      playbackSpeed === speed
                        ? 'bg-teal-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* INTERACTIVE TIMELINE SCRUBBER BAR */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-teal-400 font-bold">
                Frame {currentFrameIndex + 1} of {totalFrames} • Step {activeFrame.stepNumber}: {activeFrame.title}
              </span>
              <span>Speed: {playbackSpeed}x • Click any segment to scrub</span>
            </div>

            {/* Clickable Scrubber Segments */}
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5">
              {currentWorkflow.frames.map((frame, idx) => {
                const isCurrent = idx === currentFrameIndex;
                const isPast = idx < currentFrameIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentFrameIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all relative ${
                      isCurrent
                        ? 'bg-teal-400 ring-2 ring-teal-400/50 shadow-md shadow-teal-400/30'
                        : isPast
                          ? 'bg-teal-600/70 hover:bg-teal-500'
                          : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`Frame ${idx + 1}: ${frame.title}`}
                  />
                );
              })}
            </div>
          </div>

          {/* MAIN 2-COLUMN VIEW: STEP GUIDE (LEFT) + HIGH-DPI FRAME SCREEN (RIGHT) */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT (4.5 Cols): Step Instructions, Where to Click, & Prompt Recipe */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Step Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-400 text-[11px] font-bold font-mono">
                    Step {activeFrame.stepNumber}
                  </span>
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {activeFrame.whereToClick}
                  </span>
                </div>
                <h3 className="text-xl font-black">{activeFrame.title}</h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {activeFrame.description}
                </p>
              </div>

              {/* Where to Click Callout Box */}
              <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                isLight ? 'bg-blue-50 border-blue-200 text-blue-950' : 'bg-blue-950/30 border-blue-800/50 text-blue-200'
              }`}>
                <Compass className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <b className="font-bold uppercase tracking-wider text-[10px] text-blue-400">Navigation Hotspot</b>
                  <p className="font-medium text-[11px]">{activeFrame.whereToClick}</p>
                </div>
              </div>

              {/* Actionable Prompt Recipe Box (if applicable) */}
              {activeFrame.promptRecipe && (
                <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-slate-700/60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3" /> Input Prompt Recipe
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(activeFrame.promptRecipe!)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedPrompt === activeFrame.promptRecipe ? (
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
                  <p className={`text-[11px] font-mono p-2.5 rounded-lg border leading-relaxed ${
                    isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}>
                    {activeFrame.promptRecipe}
                  </p>
                </div>
              )}

              {/* Validation Checklist */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  What to Validate on Screen
                </h4>
                <ul className="space-y-1">
                  {activeFrame.validationChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="w-3.5 h-3.5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro-Tip Box */}
              <div className={`p-3 rounded-xl border flex items-start gap-2 ${
                isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
              }`}>
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed font-medium">
                  {activeFrame.tip}
                </p>
              </div>

            </div>

            {/* RIGHT (7.5 Cols): HIGH-DPI WORKFLOW SCREENSHOT FRAME */}
            <div className="lg:col-span-7">
              <div className={`rounded-2xl border p-4 shadow-2xl relative overflow-hidden ${
                isLight ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-950 border-slate-800 text-white'
              }`}>
                
                {/* Window Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2">
                      PromptCanvas • {currentWorkflow.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono px-2 py-0.2 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      LIVE RECORDING
                    </span>
                    <a
                      href={currentWorkflow.gifPath}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-bold text-slate-400 hover:text-teal-400 flex items-center gap-1"
                    >
                      <span>Watch Full GIF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Frame Screen Image */}
                <div className="w-full h-[440px] rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeFrame.imagePath}
                    alt={activeFrame.actionLabel}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Frame Footer Info */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-teal-400 font-bold">
                    <Sparkles className="w-3 h-3" /> {activeFrame.actionLabel}
                  </span>
                  <span>Frame {currentFrameIndex + 1} / {totalFrames}</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== PERSONA WORKFLOW GIF DOWNLOAD & WATCH GALLERY ==================== */}
      <section className={`py-12 px-6 md:px-12 border-t ${
        isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" /> Compressed Workflow GIF Library
              </div>
              <h2 className="text-2xl md:text-3xl font-black">
                Watch &amp; Download Persona Workflow GIFs
              </h2>
              <p className={`text-xs max-w-2xl mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Open or download standalone animated GIFs to watch complete workflows without needing to navigate menus.
              </p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-105 shrink-0"
            >
              <span>Launch Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Quickstart Tour */}
            <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl">🚀</span>
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    Quickstart Tour
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-teal-400">First-Time User Quickstart</h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Orientation → Input Prompt → 2D Output → Chat Refine → Version v2 → PDF Export.
                </p>
                <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_first_time_user_quickstart.gif"
                    alt="Quickstart Tour"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <a
                  href="/workflows/workflow_first_time_user_quickstart.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-teal-400 hover:underline flex items-center gap-1"
                >
                  <span>Watch GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_first_time_user_quickstart.gif"
                  download="workflow_first_time_user_quickstart.gif"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Save</span>
                </a>
              </div>
            </div>

            {/* Enterprise Architect */}
            <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl">🏢</span>
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Blueprint #17
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-blue-400">Enterprise Cloud Architect</h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Landing Zone Shared VPC, 100G Interconnect, Subnets, v1→v2, and Boardroom PPTX.
                </p>
                <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_enterprise_architect.gif"
                    alt="Enterprise Architect Workflow"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <a
                  href="/workflows/workflow_enterprise_architect.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Watch GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_enterprise_architect.gif"
                  download="workflow_enterprise_architect.gif"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Save</span>
                </a>
              </div>
            </div>

            {/* Data & AI Engineer */}
            <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl">🤖</span>
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Blueprint #41
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-purple-400">Data Platform &amp; AI</h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Retail AI Core, AlloyDB pgvector, Star Schema Lakehouse, and Draw.io XML export.
                </p>
                <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_data_ai_engineer.gif"
                    alt="Data & AI Workflow"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <a
                  href="/workflows/workflow_data_ai_engineer.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-purple-400 hover:underline flex items-center gap-1"
                >
                  <span>Watch GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_data_ai_engineer.gif"
                  download="workflow_data_ai_engineer.gif"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Save</span>
                </a>
              </div>
            </div>

            {/* Migration Consultant */}
            <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl">💼</span>
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Blueprint #1
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-emerald-400">Migration Consultant</h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Legacy discovery, spaghetti matrix, 4 migration waves, TCO $/mo, and PPTX pitch.
                </p>
                <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_cloud_migration.gif"
                    alt="Migration Consultant Workflow"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <a
                  href="/workflows/workflow_cloud_migration.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Watch GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_cloud_migration.gif"
                  download="workflow_cloud_migration.gif"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Save</span>
                </a>
              </div>
            </div>

            {/* CISO & DevSecOps */}
            <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl">🔒</span>
                  <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Blueprint #14
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-rose-400">CISO &amp; DevSecOps</h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  VPC-SC perimeter audit, automated static remediation, and SOC2 / CIS compliance PDF.
                </p>
                <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/workflows/workflow_ciso_secops.gif"
                    alt="CISO & DevSecOps Workflow"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <a
                  href="/workflows/workflow_ciso_secops.gif"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-rose-400 hover:underline flex items-center gap-1"
                >
                  <span>Watch GIF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/workflows/workflow_ciso_secops.gif"
                  download="workflow_ciso_secops.gif"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Save</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== COMPACT HOTSPOT MAP & PRO-TIPS ==================== */}
      <section className="py-12 px-6 md:px-12 max-w-[1600px] mx-auto space-y-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-black">Workspace Interface Map &amp; Shortcuts</h2>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Numbered guide to the 6 primary controls in PromptCanvas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className={`p-3.5 rounded-xl border space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs">1</span>
            <b className="text-xs block text-white">Left Studio</b>
            <p className="text-[10px] text-slate-400">Prompt input, architecture notation standards, &amp; AI compiler.</p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="w-6 h-6 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-xs">2</span>
            <b className="text-xs block text-white">Templates Matrix</b>
            <p className="text-[10px] text-slate-400">50 reference blueprints with 1-click &quot;Add as New View&quot;.</p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xs">3</span>
            <b className="text-xs block text-white">2D Viewport</b>
            <p className="text-[10px] text-slate-400">1600px wide canvas with pan, zoom, &amp; zero line collisions.</p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs">4</span>
            <b className="text-xs block text-white">Version Dropdown</b>
            <p className="text-[10px] text-slate-400">Automatic v1→v2 commits with visual diff &amp; instant rollback.</p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">5</span>
            <b className="text-xs block text-white">Insights &amp; Cost</b>
            <p className="text-[10px] text-slate-400">Live GCP cloud cost estimation ($/mo) &amp; FinOps score.</p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold text-xs">6</span>
            <b className="text-xs block text-white">Export Engine</b>
            <p className="text-[10px] text-slate-400">Executive PDF Dossiers, Boardroom PPTX, SVG, &amp; Draw.io XML.</p>
          </div>
        </div>

      </section>

    </div>
  );
}
