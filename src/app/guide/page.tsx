'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Gauge,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MessageSquareQuote,
  X
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { ThemeToggleBtn } from '@/components/ThemeToggleBtn';
import UnifiedAppSidebar from '@/components/UnifiedAppSidebar';

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
    narrationText: string;
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
    tagline: 'Learn how to navigate, enter prompts, choose options, inspect live diagrams, edit, increase versions, and export PDF/PPTX.',
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
        narrationText: 'Welcome to PromptCanvas. The interface is split into three zones: the Left Studio prompt engine, the Top Header navigation, and the Central High-DPI 2D Canvas.',
        stepNumber: 1,
        title: 'Workspace Orientation & Layout',
        whereToClick: 'Main Workspace Interface',
        description: 'PromptCanvas gives you a zero-friction workspace. On the left is the AI Prompt Studio. Across the top is your Project and View Manager. In the center is the 1600px high-DPI 2D diagram viewport.',
        validationChecklist: [
          'Left Studio is ready for prompt input',
          'Canvas is set to high-DPI 1600px desktop grid'
        ],
        tip: 'Hit Cmd+D or Ctrl+D anytime to toggle synchronized dark/light contrast backgrounds.'
      },
      {
        frameIndex: 1,
        imagePath: '/workflows/frames/quickstart/frame_02.png',
        actionLabel: '2. Prompt Entry & Options: Type System Requirements & Select Architecture Type',
        narrationText: 'Step two: Click into the prompt box in the Left Studio. Type your plain English architectural requirements and select your architecture notation type.',
        stepNumber: 2,
        title: 'Prompt Entry & Option Selection',
        whereToClick: 'Left Studio -> "ACTIVE USE CASE PROMPT" text area',
        description: 'Type plain English requirements with concrete details (e.g. GKE Autopilot, Cloud SQL for PostgreSQL, Pub/Sub, and Cloud Armor WAF) and choose your Diagram Standard.',
        promptRecipe: 'Design an Enterprise Cloud Platform on Google Cloud featuring Cloud Armor WAF, GKE Autopilot microservices with private VPC peering, Cloud SQL high availability, and Pub/Sub event ingestion.',
        validationChecklist: [
          'Cursor focus active inside the prompt input box',
          'Architecture type selector set to Multi-tier Enterprise GCP'
        ],
        tip: 'You can also click "Suggested Transformations" below the box for 1-click feature additions.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/quickstart/frame_03.png',
        actionLabel: '3. Generating: Gemini 3.7 Flash Compiling 2D AST Architecture Graph',
        narrationText: 'Step three: Click Generate. Gemini 3.7 Flash parses your prompt into functional tiers and compiles a 2D collision-free Draw.io XML graph in under two seconds.',
        stepNumber: 3,
        title: 'Compiling AST Architecture Graph',
        whereToClick: 'Left Studio -> Click "✨ Generate Architecture"',
        description: 'Gemini 3.7 Flash reasons over your prompt, parses services into functional tiers, calculates 2D bounding boxes with zero line collision, and compiles the Draw.io XML graph.',
        validationChecklist: [
          'AI generation progress modal reflects AST validation',
          'Zero-overlap layout engine verifies node margins'
        ],
        tip: 'Compilation runs asynchronously in the background without freezing browser interaction.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/quickstart/frame_04.png',
        actionLabel: '4. Diagram Open & Rendered: 1600px High-DPI Multi-Tier Canvas View',
        narrationText: 'Step four: The live diagram opens on the canvas. Use Spacebar plus drag to pan, and inspect clean tier boxes, subnets, and collision-free connector lines.',
        stepNumber: 4,
        title: 'Opening & Inspecting Diagram on Canvas',
        whereToClick: 'Central 2D Canvas Viewport',
        description: 'The compiled architecture diagram renders instantly on the canvas with clean tier containers, high-contrast badges, and color-coded connector lines.',
        validationChecklist: [
          'Verify all architectural tiers render in logical left-to-right flow',
          'Check that connecting lines have pill-shaped protocol labels'
        ],
        tip: 'Hold Spacebar + Click-Drag to smoothly pan across wide 1600px topologies.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/quickstart/frame_05.png',
        actionLabel: '5. Edit & Refine: Prompt Conversational Changes in Left Studio Chat',
        narrationText: 'Step five: Make edits. In the refinement chat, type any adjustments, like adding Cloud HA VPN dual tunnels and Cloud KMS HSM key rotation.',
        stepNumber: 5,
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
        frameIndex: 5,
        imagePath: '/workflows/frames/quickstart/frame_06.png',
        actionLabel: '6. Save & Version Increase: Auto-Committed to v2 with Rollback Timeline',
        narrationText: 'Step six: Saving and version control. Version v2 is automatically committed. You can click the version dropdown to inspect history or perform one-click rollbacks.',
        stepNumber: 6,
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
        frameIndex: 6,
        imagePath: '/workflows/frames/quickstart/frame_07.png',
        actionLabel: '7. Export: Choose PDF Architecture Dossier or Boardroom PPTX Deck',
        narrationText: 'Step seven: Export deliverables. Click Edit and Export to choose between Executive PDF Dossiers, PowerPoint slide presentations, high-res PNG, or Draw.io XML.',
        stepNumber: 7,
        title: 'Selecting Export Format',
        whereToClick: 'Top Right Navigation -> Click "Edit ▾" or "Export"',
        description: 'Export publication-grade deliverables for your Architecture Review Board (ARB). Choose Executive PDF Dossiers, Boardroom PowerPoint (.pptx) slides, high-res PNG/SVG vectors, or editable Draw.io XML.',
        validationChecklist: [
          'Choose PDF Architecture Dossier with Executive Summary',
          'Choose native PowerPoint (.pptx) slide presentation'
        ],
        tip: 'Click "Insights & Cost" ($/mo) before exporting to automatically include live GCP cloud cost estimates.'
      },
      {
        frameIndex: 7,
        imagePath: '/workflows/frames/quickstart/frame_08.png',
        actionLabel: '8. Open PDF Architecture Dossier: Executive Summary, SLAs & Vector Topology',
        narrationText: 'Step eight: Open the generated PDF Architecture Dossier. It contains your high-resolution 300 DPI vector diagram, executive SLA summaries, and cloud cost projections.',
        stepNumber: 8,
        title: 'Inspecting Open PDF Architecture Dossier',
        whereToClick: 'Export Viewer -> Downloaded PDF Dossier',
        description: 'The downloaded PDF Dossier includes a 300 DPI high-resolution diagram vector embed, executive summary, target specifications, and SHA-256 audit digest ready for compliance sign-off.',
        validationChecklist: [
          'Executive summary accurately reflects prompt specifications',
          'Diagram vector embed renders sharp at 300 DPI'
        ],
        tip: 'Send this dossier directly to your CISO and Architecture Review Board for formal approval.'
      },
      {
        frameIndex: 8,
        imagePath: '/workflows/frames/quickstart/frame_09.png',
        actionLabel: '9. Open PowerPoint (.pptx) Deck: Boardroom Vector Slides Ready for ARB Sign-Off',
        narrationText: 'Step nine: Open the PowerPoint deck. The slides feature native vector diagram shapes, executive decision points, and financial ROI models ready for boardroom presentations.',
        stepNumber: 9,
        title: 'Inspecting Open PowerPoint (.pptx) Slide Deck',
        whereToClick: 'Export Viewer -> Downloaded .pptx Presentation',
        description: 'The generated PowerPoint deck provides native editable vector shape groups, executive takeaways, network demarcation details, and 3-year TCO financial ROI modeling.',
        validationChecklist: [
          'Slides contain native grouped diagram shapes',
          'Executive bullet points summarize key architecture decisions'
        ],
        tip: 'Present the generated slide deck directly in your ARB or executive leadership meetings.'
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
        actionLabel: '1. Prompt Entry & Options: Greenfield Shared VPC, 100G Interconnect & CIDRs',
        narrationText: 'Enter your greenfield Landing Zone requirements into the Left Studio: 100G Dedicated Interconnect, Cloud Router BGP, GKE Autopilot subnets, and VPC Service Controls.',
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
        actionLabel: '2. Open Diagram: 5-Tier Zero-Trust Hub & Spoke with Clean Lines',
        narrationText: 'Open and inspect the rendered diagram on the canvas. Notice the clear 5-tier demarcation, Cloud Router BGP routes, and zero line collisions.',
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
        actionLabel: '3. Edit & Refine: Adding Cloud HA VPN Failover & Cloud KMS HSM Dual Rings',
        narrationText: 'In the refinement chat, add Cloud HA VPN IPsec backup tunnels and Cloud KMS HSM dual rings for automated key rotation.',
        stepNumber: 3,
        title: 'Adding Resilience & Key Management',
        whereToClick: 'Left Studio Chat',
        description: 'Conversational prompt modifies the AST graph non-destructively to add backup tunnels and HSM key rings.',
        promptRecipe: 'Add Cloud HA VPN dual tunnels as automated failover and configure Cloud KMS HSM dual rings.',
        validationChecklist: ['New components route cleanly into security column'],
        tip: 'Check that existing subnet CIDRs remain intact.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/architect/frame_04.png',
        actionLabel: '4. Save & Version Increase: Auto-Committed to v2 Baseline',
        narrationText: 'Version v2 is committed automatically with immutable history for your Architecture Review Board sign-off.',
        stepNumber: 4,
        title: 'Committing Version 2 for ARB Sign-off',
        whereToClick: 'Header -> Version Tag (v2)',
        description: 'Hardened version v2 committed with complete audit lineage.',
        validationChecklist: ['Version v2 tagged with timestamp'],
        tip: 'Compare visual diff between v1 and v2 before exporting.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/architect/frame_05.png',
        actionLabel: '5. Export Deliverables: Generate PDF Dossier and PowerPoint Deck',
        narrationText: 'Open the export menu and choose PowerPoint presentation or PDF Architecture Dossier.',
        stepNumber: 5,
        title: 'Selecting Export Deliverables',
        whereToClick: 'Top Navigation -> Edit ▾ -> Export',
        description: 'Generate boardroom PowerPoint presentation and PDF architecture dossier.',
        validationChecklist: ['PPTX and PDF files download successfully'],
        tip: 'Present the generated slide deck directly in ARB meetings.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/architect/frame_06.png',
        actionLabel: '6. Open PowerPoint (.pptx): High-DPI Vector Slides for Enterprise ARB',
        narrationText: 'Open the PowerPoint presentation to inspect your high-res vector diagram slides, network demarcation specs, and executive takeaways.',
        stepNumber: 6,
        title: 'Open PowerPoint (.pptx) Slide Deck',
        whereToClick: 'Export Viewer -> PowerPoint Presentation',
        description: 'Open the downloaded .pptx slide deck showing native vector diagram embeds, hub transit subnets, and decision points ready for executive review.',
        validationChecklist: ['Slide 1 embeds high-res landing zone diagram', 'Decision points reflect ARB governance requirements'],
        tip: 'All shapes inside PowerPoint are fully editable and native.'
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
        actionLabel: '1. Prompt Entry & Options: Retail AI, AlloyDB pgvector & Lakehouse Star Schema',
        narrationText: 'Enter data and AI platform requirements: AlloyDB pgvector with text-embedding-004, BigQuery Lakehouse Star Schema, and Looker BI.',
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
        actionLabel: '2. Open Diagram: Inspecting AlloyDB pgvector Core & BigQuery Star Schema',
        narrationText: 'Open the diagram to validate the AI intelligence core, sub-10ms vector similarity recall, and BigQuery Star Schema relationships.',
        stepNumber: 2,
        title: 'Inspecting AI Intelligence Core',
        whereToClick: 'Canvas -> Column 3 & 4',
        description: 'Validate sub-10ms similarity recall and Gemini 3.7 Pro Concierge microservices with BigQuery Lakehouse tables.',
        validationChecklist: ['AlloyDB pgvector connects to Cloud Run and BigQuery'],
        tip: 'Check vector dimension parameters on the embedding nodes.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/data_ai/frame_03.png',
        actionLabel: '3. Edit & Refine: Injecting Real-Time Fraud Scoring & Looker BI Cockpit',
        narrationText: 'Refine the pipeline in chat by prompting Gemini to add sub-second fraud anomaly scoring on Cloud Run and real-time conversion BI.',
        stepNumber: 3,
        title: 'Refining Pipeline with Chat',
        whereToClick: 'Left Studio Chat',
        description: 'Prompt Gemini to inject real-time fraud scoring and automated alert triggers.',
        promptRecipe: 'Add real-time fraud scoring microservice on Cloud Run with sub-50ms latency.',
        validationChecklist: ['Fraud scoring service added to pipeline'],
        tip: 'Check Eventarc trigger links connecting to alerting topics.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/data_ai/frame_04.png',
        actionLabel: '4. Save & Version Increase: Committed to v2 with Immutable Rollback',
        narrationText: 'Version v2 is committed with an immutable snapshot, preserving previous states in rollback history.',
        stepNumber: 4,
        title: 'Committing Version 2 Snapshot',
        whereToClick: 'Header -> Version Tag (v2)',
        description: 'Version v2 saved with rollback ability to baseline state.',
        validationChecklist: ['v2 snapshot committed'],
        tip: 'Create branched views to explore alternative vector stores.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/data_ai/frame_05.png',
        actionLabel: '5. Export Deliverables: Select PDF Data Dictionary and Draw.io XML',
        narrationText: 'Export your data architecture as a comprehensive PDF Data Dictionary or editable Draw.io XML.',
        stepNumber: 5,
        title: 'Exporting Data Architecture Package',
        whereToClick: 'Top Navigation -> Export',
        description: 'Download Draw.io XML and comprehensive PDF Data Dictionary.',
        validationChecklist: ['Draw.io XML loads in diagrams.net'],
        tip: 'Use Draw.io XML for collaborative editing with external partners.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/data_ai/frame_06.png',
        actionLabel: '6. Open PDF Architecture Dossier: Data Flow Lineage & Model Specs',
        narrationText: 'Open the PDF Architecture Dossier to review end-to-end data flow lineage, table schemas, and model hosting specs.',
        stepNumber: 6,
        title: 'Open PDF Architecture Dossier',
        whereToClick: 'Export Viewer -> PDF Architecture Dossier',
        description: 'Inspect the generated PDF dossier containing Star Schema definitions, vector embedding parameters, and Pub/Sub streaming topologies.',
        validationChecklist: ['Data dictionary lists all table fields', 'Model specs include HNSW index configuration'],
        tip: 'Include this PDF dossier in your data governance repository.'
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
        actionLabel: '1. Prompt Entry & Options: Legacy Silos Discovery & 6Rs 4-Wave Plan',
        narrationText: 'Provide your legacy infrastructure inventory: Mainframe, Oracle 11g RAC, SAP ECC, and spaghetti ETL scripts.',
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
        actionLabel: '2. Open Diagram: On-Prem Monoliths, Spaghetti Matrix & 4 Migration Waves',
        narrationText: 'Open the diagram to see legacy silos in the red zone, spaghetti integrations, and the 4 target migration waves.',
        stepNumber: 2,
        title: 'Mapping On-Premises Monoliths',
        whereToClick: 'Canvas -> Column 1 & Column 4',
        description: 'Inspect mainframe workloads, RAC database coupling, and the 4-wave modernization schedule (Rehost to Retire).',
        validationChecklist: ['All 4 waves display concrete outcomes'],
        tip: 'Risk callouts highlight schema drift and hardcoded credentials.'
      },
      {
        frameIndex: 2,
        imagePath: '/workflows/frames/consultant/frame_03.png',
        actionLabel: '3. Edit & FinOps Insights: 42% TCO OpEx Savings & Strangler Fig Proxy',
        narrationText: 'Click Insights and Cost to review the 3-year TCO financial model and 42 percent operating expenditure savings.',
        stepNumber: 3,
        title: 'Reviewing TCO & FinOps Score',
        whereToClick: 'Top Header -> Insights & Cost ($/mo)',
        description: 'Inspect 3-year TCO financial modeling and 42% OpEx reduction calculation.',
        validationChecklist: ['TCO savings breakdown displayed'],
        tip: 'Include TCO numbers in your client steering committee slides.'
      },
      {
        frameIndex: 3,
        imagePath: '/workflows/frames/consultant/frame_04.png',
        actionLabel: '4. Save & Version Increase: Roadmap Committed to v2',
        narrationText: 'The modernization roadmap is saved as version v2 with Strangler Fig API proxies approved.',
        stepNumber: 4,
        title: 'Committing Version 2 Roadmap',
        whereToClick: 'Header -> Version Tag (v2)',
        description: 'Roadmap committed to v2 with decommissioning milestones preserved.',
        validationChecklist: ['Version v2 tagged with timestamp'],
        tip: 'Export the visual diff to present before-and-after states.'
      },
      {
        frameIndex: 4,
        imagePath: '/workflows/frames/consultant/frame_05.png',
        actionLabel: '5. Export Deliverables: Exporting Boardroom PPTX Pitch Pack',
        narrationText: 'Export the client pitch deck as a native PowerPoint presentation.',
        stepNumber: 5,
        title: 'Exporting Client Pitch Deck',
        whereToClick: 'Top Navigation -> Export -> PowerPoint (.pptx)',
        description: 'Export boardroom PowerPoint presentation and executive migration dossier.',
        validationChecklist: ['PPTX pitch pack downloaded'],
        tip: 'Editable slides allow instant customization with client branding.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/consultant/frame_06.png',
        actionLabel: '6. Open PowerPoint (.pptx): Client Pitch Deck with 4-Wave Roadmap',
        narrationText: 'Open the PowerPoint pitch pack to view the 4-wave modernization roadmap, financial ROI charts, and decommissioning timeline.',
        stepNumber: 6,
        title: 'Open PowerPoint (.pptx) Client Pitch Deck',
        whereToClick: 'Export Viewer -> PowerPoint Pitch Deck',
        description: 'Inspect the generated PowerPoint slides outlining Wave 1 Rehost, Wave 2 Replatform, Wave 3 Refactor, and Wave 4 Retire.',
        validationChecklist: ['Wave timelines render clearly on slides', 'ROI financial metrics are summarized for executive steering committee'],
        tip: 'Customize the slides with your firm branding before client presentations.'
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
        actionLabel: '1. Prompt Entry & Options: Zero-Trust Isolation, STRIDE Threat Model & VPC-SC',
        narrationText: 'Enter zero-trust regulatory constraints: PCI-DSS 4.0, SOC2 Type II, Cloud KMS HSM CMEK, and VPC Service Controls.',
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
        actionLabel: '2. Open Diagram: Auditing Zero-Trust Perimeters & Egress Demarcations',
        narrationText: 'Open the diagram to audit perimeter boundaries, Cloud KMS HSM dual rings, and zero plain-text egress paths.',
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
        actionLabel: '3. Edit & Remediate: 1-Click Automated Security Rule Hardening',
        narrationText: 'Apply one-click automated remediation in chat to patch findings and seal exposed endpoints with Private Service Connect.',
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
        actionLabel: '4. Save & Version Increase: Version Hardened to v2 (100% SOC2 Compliant)',
        narrationText: 'The hardened architecture is committed as version v2, achieving 100 percent SOC2 and CIS compliance.',
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
        actionLabel: '5. Export Deliverables: Exporting SOC2 / ISO 27001 Cryptographic Package',
        narrationText: 'Export the cryptographic SOC2 and ISO 27001 compliance audit package.',
        stepNumber: 5,
        title: 'Exporting Compliance Audit Package',
        whereToClick: 'Top Navigation -> Export -> PDF Audit Package',
        description: 'Download cryptographic, timestamped SOC2 / ISO 27001 Security Audit Package.',
        validationChecklist: ['PDF audit package contains cryptographic hash'],
        tip: 'Security dossiers include SHA-256 graph hashes for audit proof.'
      },
      {
        frameIndex: 5,
        imagePath: '/workflows/frames/secops/frame_06.png',
        actionLabel: '6. Open PDF Compliance Dossier: Cryptographic Proof for SOC2 Auditors',
        narrationText: 'Open the PDF compliance dossier to inspect perimeter boundary rules, key rotation policies, and SHA-256 proof for auditors.',
        stepNumber: 6,
        title: 'Open PDF Compliance Dossier',
        whereToClick: 'Export Viewer -> PDF Security Audit Package',
        description: 'Review the formal security report verifying VPC Service Controls sealed perimeter, Cloud KMS HSM 90-day rotation, and SHA-256 graph digest.',
        validationChecklist: ['VPC-SC perimeter validation certificate included', 'Cryptographic SHA-256 digest verified for audit proof'],
        tip: 'Deliver this PDF dossier directly to external compliance auditors.'
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

  // New audio, captions, and maximize controls
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState<boolean>(true);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const currentWorkflow = PERSONA_WORKFLOWS[activePersona];
  const totalFrames = currentWorkflow.frames.length;
  const activeFrame = currentWorkflow.frames[currentFrameIndex] || currentWorkflow.frames[0];

  // Speech Synthesis Audio Narration
  const speakNarration = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!isAudioEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.min(2.0, Math.max(0.7, playbackSpeed * 0.95));
    utterance.pitch = 1.0;
    
    // Choose pleasant English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex')));
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);
  }, [isAudioEnabled, playbackSpeed]);

  // Trigger narration when frame changes or audio toggles
  useEffect(() => {
    if (isAudioEnabled && activeFrame?.narrationText) {
      speakNarration(activeFrame.narrationText);
    } else if (!isAudioEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [currentFrameIndex, isAudioEnabled, activeFrame, speakNarration]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Playback timer with speed control
  useEffect(() => {
    if (!isPlaying) return;
    const baseDelay = 2200;
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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
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

  // Keyboard shortcut listener for Space, Escape, Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepBackward();
      } else if (e.code === 'Escape' && isMaximized) {
        setIsMaximized(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMaximized, totalFrames]);

  return (
    <div className={`flex min-h-screen font-sans ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0B0F19] text-white'}`}>
      {/* Collapsible Left Navigation Menu */}
      <UnifiedAppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* ==================== STICKY CONSOLIDATED TOP NAVBAR ==================== */}
        <header className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${
          isLight ? 'bg-white/95 border-slate-200 shadow-xs' : 'bg-[#0F172A]/95 border-slate-800 shadow-md shadow-black/20'
        }`}>
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`flex items-center gap-2 text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Link href="/" className={`font-extrabold transition-colors ${isLight ? 'text-slate-900 hover:text-teal-600' : 'text-white hover:text-teal-300'}`} title="Home">
                  PromptCanvas
                </Link>
                <span className="text-slate-400">/</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>User Guide &amp; Playbooks</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/20 shrink-0">
                  Interactive GIFs
                </span>
              </div>
            </div>

            {/* Right: Hub Links & Action */}
            <div className="flex items-center gap-2.5 shrink-0">
              <ThemeToggleBtn id="guide-theme-toggle-btn" />

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
      <section className="pt-5 pb-3 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto space-y-3">
        
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
            Watch how to enter prompts, choose options, generate 2D collision-free diagrams, chat to iterate, save versions (v1 → v2), and export open PDF / PPTX decks.
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
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
        <div className={`rounded-2xl border p-5 md:p-6 transition-all ${
          isMaximized 
            ? 'fixed inset-4 z-[99999] overflow-y-auto bg-slate-950/98 border-teal-500/60 shadow-2xl backdrop-blur-2xl p-6 md:p-8'
            : isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900/90 border-slate-800 shadow-2xl'
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

            {/* Right: Audio, Captions, Speed, Maximize & Playback Controls */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
              
              {/* Step Backward */}
              <button
                onClick={handleStepBackward}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Step Backward (Previous Frame - ArrowLeft)"
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
                title={isPlaying ? 'Pause Workflow (Space)' : 'Play Workflow (Space)'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-amber-300" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              {/* Step Forward */}
              <button
                onClick={handleStepForward}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Step Forward (Next Frame - ArrowRight)"
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

              <div className="h-5 w-px bg-slate-800 mx-0.5" />

              {/* 🔊 Audio Description / Voiceover Toggle */}
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isAudioEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isAudioEnabled ? "Audio Description Enabled (Click to Mute)" : "Enable Audio Voiceover Description"}
              >
                {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAudioEnabled ? 'Voiceover ON' : 'Audio'}</span>
              </button>

              {/* 💬 Captions / Subtitles Toggle */}
              <button
                onClick={() => setIsCaptionsEnabled(!isCaptionsEnabled)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isCaptionsEnabled
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isCaptionsEnabled ? "Subtitles / Captions Enabled" : "Enable Subtitles / Captions"}
              >
                <MessageSquareQuote className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">CC</span>
              </button>

              <div className="h-5 w-px bg-slate-800 mx-0.5" />

              {/* Speed Controls: 0.5x, 1.0x, 1.5x, 2.0x */}
              <div className="flex items-center gap-1">
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

              <div className="h-5 w-px bg-slate-800 mx-0.5" />

              {/* 🗖 Maximize / Fullscreen & Minimize Toggle */}
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className={`p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors ${
                  isMaximized ? 'bg-teal-500/20 text-teal-300' : 'hover:bg-slate-800'
                }`}
                title={isMaximized ? "Minimize View (Esc)" : "Maximize / Fullscreen Video"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4 text-teal-400" /> : <Maximize2 className="w-4 h-4" />}
              </button>

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
                    className={`h-2 rounded-full transition-all relative cursor-pointer ${
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
                    Step {activeFrame.stepNumber} of {totalFrames}
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

            {/* RIGHT (7.5 Cols): HIGH-DPI WORKFLOW SCREENSHOT FRAME WITH CAPTIONS */}
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

                {/* Frame Screen Image with Live Captions Overlay */}
                <div className={`w-full rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center relative ${
                  isMaximized ? 'h-[620px]' : 'h-[440px]'
                }`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeFrame.imagePath}
                    alt={activeFrame.actionLabel}
                    className="w-full h-full object-contain"
                  />

                  {/* 💬 Live Subtitles / Captions Overlay */}
                  {isCaptionsEnabled && activeFrame.narrationText && (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-2xl flex items-center gap-3 animate-fade-in">
                      <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold shrink-0">
                        CC
                      </div>
                      <p className="text-xs md:text-sm font-medium text-slate-100 leading-snug">
                        {activeFrame.narrationText}
                      </p>
                    </div>
                  )}
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
                Open or download standalone animated GIFs showing prompt entry, options selection, canvas inspection, editing, versioning, and open PDF / PPTX deliverables.
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
                  Prompt Entry → Options → Live Canvas → Chat Refine → Version v2 → Open PDF &amp; PPTX.
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
                  Landing Zone Shared VPC, 100G Interconnect, Subnets, v1→v2, and Open PPTX Slides.
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
                  Retail AI Core, AlloyDB pgvector, Star Schema Lakehouse, and Open PDF Dossier.
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
                  Legacy discovery, spaghetti matrix, 4 migration waves, TCO $/mo, and Open PPTX.
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
                  VPC-SC perimeter audit, automated static remediation, and Open PDF SOC2 Dossier.
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
    </div>
  );
}
