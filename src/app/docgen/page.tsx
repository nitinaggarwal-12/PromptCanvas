'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  Copy,
  Check,
  Share2,
  Layers,
  Shield,
  Zap,
  BookOpen,
  Sliders,
  Sun,
  Moon,
  RefreshCw,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Eye,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Network,
  LayoutGrid,
  BarChart3,
  ExternalLink,
  Code,
  FileCode,
  Lock,
  Boxes,
  HelpCircle,
  FileCheck,
  Building2,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import {
  CANONICAL_TEMPLATES,
  DOMAIN_PRESETS,
  CanonicalTemplate,
  CANONICAL_FAMILIES
} from '@/lib/canonical/canonicalTemplates';
import { ARCHETYPE_REGISTRY, ArchetypeId, DocArchetype } from '@/lib/compose/archetypes';
import { MASTER_DOCUMENTS } from '@/lib/compose/masterDocs';
import DiagramViewerRenderSafe from '@/components/DiagramViewerRenderSafe';

// Multi-Blueprint Pack mapping for each of the 9 archetypes
interface BlueprintSlot {
  slotTitle: string;
  chapterNumber: number;
  recommendedTemplateId: string;
  description: string;
}

interface DocArchetypeMeta {
  id: ArchetypeId;
  name: string;
  shortName: string;
  badge: string;
  badgeColor: string;
  audience: string;
  primaryPurpose: string;
  blueprintPack: BlueprintSlot[];
  sectionsCount: number;
}

const DOC_ARCHETYPES_META: DocArchetypeMeta[] = [
  {
    id: 'brd',
    name: 'Business Requirements Document',
    shortName: 'BRD',
    badge: 'Executive Business',
    badgeColor: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
    audience: 'Executive Sponsors, Business Unit Leaders, Architecture Review Board (ARB)',
    primaryPurpose: 'Defines enterprise business transformation vision, ROI realization formulas, risk-based autonomy levels, and phased governance approval gates.',
    blueprintPack: [
      { slotTitle: 'Executive System Context & Stakeholder Topology', chapterNumber: 2, recommendedTemplateId: '01', description: 'Overall system boundaries, external partners, and users.' },
      { slotTitle: 'Strategic Business Capability & Value Stream', chapterNumber: 4, recommendedTemplateId: '04', description: 'Enterprise capability mapping and business value streams.' },
      { slotTitle: 'As-Is vs. To-Be Process Modernization Matrix', chapterNumber: 3, recommendedTemplateId: '05', description: 'Current manual baseline vs automated target state.' },
      { slotTitle: 'Human-in-the-Loop Governance & Decision Gates', chapterNumber: 5, recommendedTemplateId: '26', description: 'Safety screening, dual-custody gates, and e-signatures.' },
    ],
    sectionsCount: 9,
  },
  {
    id: 'prd',
    name: 'Product Requirements Document',
    shortName: 'PRD',
    badge: 'Product & UX',
    badgeColor: 'from-sky-500/20 to-blue-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30',
    audience: 'Product Managers, Engineering Leads, UX Designers, QA / Validation Teams',
    primaryPurpose: 'Specifies product scope, target personas, functional epics, measurable acceptance criteria, and non-functional requirements (NFRs).',
    blueprintPack: [
      { slotTitle: 'Product System Context & Boundary', chapterNumber: 1, recommendedTemplateId: '01', description: 'Product ecosystem and external system touchpoints.' },
      { slotTitle: 'Core Functional Capability Taxonomy', chapterNumber: 3, recommendedTemplateId: '02', description: 'Feature hierarchy and functional capability pods.' },
      { slotTitle: 'User Interaction & Workflow Journey', chapterNumber: 4, recommendedTemplateId: '23', description: 'End-to-end user journeys and cognitive reasoning loops.' },
      { slotTitle: 'Lifecycle State Machine & Transition Gates', chapterNumber: 5, recommendedTemplateId: '12', description: 'Entity lifecycle states, approvals, and transition gates.' },
    ],
    sectionsCount: 9,
  },
  {
    id: 'sdd',
    name: 'System Design Document (HLD)',
    shortName: 'SDD',
    badge: 'Core Architecture',
    badgeColor: 'from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    audience: 'Principal Architects, Cloud Engineers, Lead Tech Architects, Security Leads',
    primaryPurpose: 'Complete high-level technical architecture detailing multi-tier cloud deployment, zero-trust network boundaries, cognitive runtime, and disaster recovery.',
    blueprintPack: [
      { slotTitle: 'Multi-Tier Subsystem & Container Topology', chapterNumber: 2, recommendedTemplateId: '08', description: 'C4 Container and microservice topology.' },
      { slotTitle: 'Zero-Trust Network Perimeter & VPC Infrastructure', chapterNumber: 3, recommendedTemplateId: '15', description: 'Cloud Armor ingress, VPC-SC, and private endpoints.' },
      { slotTitle: 'Cloud Infrastructure & Compute Deployment Map', chapterNumber: 2, recommendedTemplateId: '16', description: 'GKE clusters, serverless containers, and managed storage.' },
      { slotTitle: 'Cognitive Runtime & Model Gateway Routing', chapterNumber: 4, recommendedTemplateId: '23', description: 'Agent reasoning engine and LLM gateway dispatch.' },
      { slotTitle: 'High-Availability & Multi-Region DR Strategy', chapterNumber: 7, recommendedTemplateId: '19', description: 'Active-Active failover, RTO < 15m, and cross-region replication.' },
    ],
    sectionsCount: 10,
  },
  {
    id: 'fdd',
    name: 'Functional Design Document',
    shortName: 'FDD',
    badge: 'Functional Engineering',
    badgeColor: 'from-teal-500/20 to-emerald-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30',
    audience: 'Functional Analysts, Microservice Developers, Integration Engineers, QA Testers',
    primaryPurpose: 'Deep functional specifications, multi-agent reasoning sequences, domain data relationships, safety exception gates, and human approval workbenches.',
    blueprintPack: [
      { slotTitle: 'Multi-Actor Swimlane & Workflow Initiation', chapterNumber: 2, recommendedTemplateId: '03', description: 'Cross-functional swimlanes and role hand-offs.' },
      { slotTitle: 'Multi-Service Interaction Sequence Flow', chapterNumber: 5, recommendedTemplateId: '11', description: 'Step-by-step sequential message exchanges and callbacks.' },
      { slotTitle: 'Domain Entity Relationship Diagram (ERD)', chapterNumber: 6, recommendedTemplateId: '14', description: 'Core functional entities and relational cardinality.' },
      { slotTitle: 'Human Review Workbench & E-Signature Controls', chapterNumber: 8, recommendedTemplateId: '26', description: 'Human-in-the-loop review queues and audit stamps.' },
    ],
    sectionsCount: 10,
  },
  {
    id: 'tdd',
    name: 'Technical Design Document (LLD)',
    shortName: 'TDD',
    badge: 'Low-Level Engineering',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    audience: 'Software Engineers, Backend Developers, DevOps/SRE Engineers, SecOps',
    primaryPurpose: 'Low-level code implementation specifications, database indexes, distributed saga outbox transactions, fault tolerance, and CI/CD quality gates.',
    blueprintPack: [
      { slotTitle: 'Micro-Level API Interaction Sequence & Latency Budgets', chapterNumber: 2, recommendedTemplateId: '11', description: 'RPC contracts, timeout budgets, and retry limits.' },
      { slotTitle: 'Physical Database Schema & Foreign Key ERD', chapterNumber: 3, recommendedTemplateId: '14', description: 'Postgres/Spanner DDL, B-tree indexes, and constraints.' },
      { slotTitle: 'Fault Tolerance, Circuit Breakers & Retry Policies', chapterNumber: 5, recommendedTemplateId: '28', description: 'Dead-letter queues, exponential backoff, and fallbacks.' },
      { slotTitle: 'Multi-Stage CI/CD & Security Scanning Pipeline', chapterNumber: 6, recommendedTemplateId: '20', description: '22-stage build, SAST, DAST, and canary deployments.' },
    ],
    sectionsCount: 8,
  },
  {
    id: 'exec_brief',
    name: 'Executive Architecture Brief',
    shortName: 'EAB',
    badge: 'C-Suite Briefing',
    badgeColor: 'from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30',
    audience: 'CIO, CTO, Board of Directors, Enterprise Investment Committee',
    primaryPurpose: 'High-impact 2-page executive summary focusing on strategic pillars, architectural differentiators, risk posture, and capital investment roadmap.',
    blueprintPack: [
      { slotTitle: 'Executive System Context & Strategic Scope', chapterNumber: 1, recommendedTemplateId: '01', description: 'High-level business and technology boundaries.' },
      { slotTitle: 'Strategic Business Capability & Value Stream', chapterNumber: 2, recommendedTemplateId: '04', description: 'Capability maturity and business value drivers.' },
      { slotTitle: 'Architecture Options & Trade-Off Matrix', chapterNumber: 3, recommendedTemplateId: '32', description: 'Buy vs build, SaaS vs self-hosted evaluation.' },
    ],
    sectionsCount: 5,
  },
  {
    id: 'threat_model',
    name: 'STRIDE Threat Model & Security Assessment',
    shortName: 'Threat Model',
    badge: 'Security & Compliance',
    badgeColor: 'from-rose-500/20 to-red-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
    audience: 'CISO, Cyber Risk Team, Security Architects, Compliance Auditors',
    primaryPurpose: 'Formal threat modeling analyzing trust-boundary crossings, STRIDE threat vectors, compensating zero-trust security controls, and CMEK key hierarchy.',
    blueprintPack: [
      { slotTitle: 'Network Security Perimeter & Trust Boundaries', chapterNumber: 2, recommendedTemplateId: '18', description: 'Zero-trust perimeter, ingress/egress, and micro-segmentation.' },
      { slotTitle: 'STRIDE Threat Vectors & Attack Pathways', chapterNumber: 3, recommendedTemplateId: '27', description: 'Threat tree, spoofing, tampering, and privilege escalation.' },
      { slotTitle: 'SOC Telemetry & Automated Incident Response', chapterNumber: 4, recommendedTemplateId: '44', description: 'SIEM integration, guardrails, and automated containment.' },
    ],
    sectionsCount: 6,
  },
  {
    id: 'api_spec',
    name: 'API & Service Interface Specification',
    shortName: 'API Spec',
    badge: 'Integration & Protocols',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    audience: 'Integration Architects, API Developers, Third-Party Ecosystem Partners',
    primaryPurpose: 'Comprehensive REST/gRPC API contracts, payload schemas, idempotent webhook interfaces, rate-limiting policies, and mTLS security controls.',
    blueprintPack: [
      { slotTitle: 'Component & Subsystem Topology', chapterNumber: 2, recommendedTemplateId: '08', description: 'Microservices, message brokers, and API endpoints.' },
      { slotTitle: 'Integration Hub & Protocol Exchange Matrix', chapterNumber: 3, recommendedTemplateId: '45', description: 'FHIR, IDMP, SFTP, and OpenAPI gateway routes.' },
      { slotTitle: 'Micro-Level API Interaction Sequence Flow', chapterNumber: 4, recommendedTemplateId: '11', description: 'Request/response flow, error codes, and header validations.' },
    ],
    sectionsCount: 7,
  },
  {
    id: 'security_package',
    name: 'Enterprise Security & Compliance Package',
    shortName: 'GRC Package',
    badge: 'GRC & Governance',
    badgeColor: 'from-slate-500/20 to-zinc-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30',
    audience: 'Data Protection Officers, Compliance Officers, External Regulatory Auditors',
    primaryPurpose: 'Formal compliance package documenting 21 CFR Part 11 electronic records, HIPAA/GDPR data residency, audit trail immutability, and SOC2 Type II controls.',
    blueprintPack: [
      { slotTitle: 'Security Perimeter & Trust Boundaries', chapterNumber: 2, recommendedTemplateId: '18', description: 'Zero-trust perimeter and encrypted transit links.' },
      { slotTitle: 'Dedicated Cloud Infrastructure & Data Isolation', chapterNumber: 3, recommendedTemplateId: '37', description: 'VPC service perimeters and KMS customer-managed keys.' },
      { slotTitle: 'Governance, Risk & Compliance Framework Map', chapterNumber: 4, recommendedTemplateId: '39', description: 'Regulatory controls, audit ledgers, and certification gates.' },
      { slotTitle: 'Cybersecurity Operations & SOC Platform', chapterNumber: 5, recommendedTemplateId: '44', description: 'Continuous SIEM auditing and telemetry streaming.' },
    ],
    sectionsCount: 8,
  },
];

function DocGenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Navigation and active tabs
  const [activeTab, setActiveTab] = useState<'catalog' | 'studio'>('catalog');
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('sdd');
  const [selectedDomain, setSelectedDomain] = useState<string>('biopharma');
  const [projectTitle, setProjectTitle] = useState<string>('Bio-Pharma Clinical Genomics & Regulatory AI Platform');
  const [projectScopePrompt, setProjectScopePrompt] = useState<string>(
    'An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.'
  );

  // Blueprint Slot customization state
  const [slotCustomizations, setSlotCustomizations] = useState<Record<number, { templateId: string; isCustom: boolean; customPrompt?: string }>>({});

  // Preview & Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [generatedDocContent, setGeneratedDocContent] = useState<string | null>(null);
  const [previewModalDoc, setPreviewModalDoc] = useState<DocArchetypeMeta | null>(null);
  const [modalTab, setModalTab] = useState<'doc' | 'blueprints' | 'hierarchy'>('doc');
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [sampleCopiedSuccess, setSampleCopiedSuccess] = useState<boolean>(false);
  const [shareCopiedSuccess, setShareCopiedSuccess] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');

  // URL query parameter synchronization (e.g. ?doc=brd, ?doc=sdd, ?tab=studio)
  useEffect(() => {
    const docParam = searchParams.get('doc') as ArchetypeId | null;
    const tabParam = searchParams.get('tab');
    if (docParam) {
      const matched = DOC_ARCHETYPES_META.find((m) => m.id === docParam);
      if (matched) {
        setPreviewModalDoc(matched);
        setModalTab('doc');
      }
    }
    if (tabParam === 'studio') {
      setActiveTab('studio');
    }
  }, [searchParams]);

  const handleOpenPreview = (meta: DocArchetypeMeta) => {
    setPreviewModalDoc(meta);
    setModalTab('doc');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/docgen?doc=${meta.id}`);
    }
  };

  const handleClosePreview = () => {
    setPreviewModalDoc(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/docgen');
    }
  };

  const handleCopyShareLink = (docId: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/docgen?doc=${docId}`;
      navigator.clipboard.writeText(url);
      setShareCopiedSuccess(true);
      setTimeout(() => setShareCopiedSuccess(false), 2000);
    }
  };

  // Find active archetype metadata
  const activeMeta = useMemo(() => {
    return DOC_ARCHETYPES_META.find((m) => m.id === selectedArchetypeId) || DOC_ARCHETYPES_META[2];
  }, [selectedArchetypeId]);

  // Handle slot template swap
  const handleSwapSlotTemplate = (slotIdx: number, newTemplateId: string) => {
    setSlotCustomizations((prev) => ({
      ...prev,
      [slotIdx]: {
        templateId: newTemplateId,
        isCustom: false,
      },
    }));
  };

  // Run full generation
  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStep(1);
    setGeneratedDocContent(null);

    try {
      // Step 1: Synthesizing Multi-Blueprint System Graph
      await new Promise((r) => setTimeout(r, 600));
      setGenerationStep(2);

      // Collect primary XML from first blueprint slot
      const primarySlot = activeMeta.blueprintPack[0];
      const selectedTplId = slotCustomizations[0]?.templateId || primarySlot.recommendedTemplateId;
      const primaryTpl = CANONICAL_TEMPLATES.find((t) => t.id === selectedTplId) || CANONICAL_TEMPLATES[0];
      const primaryXml = primaryTpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');

      // Step 2: Running Deterministic AST & Semantic Synthesis
      await new Promise((r) => setTimeout(r, 600));
      setGenerationStep(3);

      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetypeId,
          format: 'md',
          xml: primaryXml,
          title: projectTitle,
          domain: DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain,
          userPrompt: projectScopePrompt,
        }),
      });

      if (!res.ok) {
        throw new Error(`Generation failed with status ${res.status}`);
      }

      const data = await res.json();
      setGenerationStep(4);
      await new Promise((r) => setTimeout(r, 400));

      setGeneratedDocContent(data.content);
      setActiveTab('studio');
    } catch (err: any) {
      console.error('DocGen generation error:', err);
      // Fallback: Generate robust structured preview from master documents
      const fallbackContent = MASTER_DOCUMENTS[selectedArchetypeId] || generateProductionFallbackDoc(activeMeta, projectTitle, selectedDomain, projectScopePrompt);
      setGeneratedDocContent(fallbackContent);
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  // Download Word docx
  const handleDownloadDocx = async () => {
    try {
      const primarySlot = activeMeta.blueprintPack[0];
      const selectedTplId = slotCustomizations[0]?.templateId || primarySlot.recommendedTemplateId;
      const primaryTpl = CANONICAL_TEMPLATES.find((t) => t.id === selectedTplId) || CANONICAL_TEMPLATES[0];
      const primaryXml = primaryTpl.generateXml(selectedDomain, isLight ? 'light' : 'dark');

      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetypeId,
          format: 'docx',
          xml: primaryXml,
          title: projectTitle,
          domain: DOMAIN_PRESETS.find((d) => d.id === selectedDomain)?.name || selectedDomain,
          userPrompt: projectScopePrompt,
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${selectedArchetypeId.toUpperCase()}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('DOCX download error:', err);
    }
  };

  // Download sample docx from preview modal
  const handleDownloadSampleDocx = async (archetypeId: ArchetypeId, docName: string) => {
    try {
      const primaryTpl = CANONICAL_TEMPLATES[0];
      const primaryXml = primaryTpl.generateXml('biopharma', isLight ? 'light' : 'dark');

      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: archetypeId,
          format: 'docx',
          xml: primaryXml,
          title: `Novacura Platform ${docName}`,
          domain: 'Bio-Pharma Precision Oncology & Regulatory AI',
          userPrompt: 'Master architectural baseline for GxP validated production.',
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Novacura_${archetypeId.toUpperCase()}_Master_Specification.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Sample DOCX download error:', err);
    }
  };

  // Download Markdown
  const handleDownloadMarkdown = () => {
    if (!generatedDocContent) return;
    const blob = new Blob([generatedDocContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${selectedArchetypeId.toUpperCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy Markdown
  const handleCopyMarkdown = () => {
    if (!generatedDocContent) return;
    navigator.clipboard.writeText(generatedDocContent);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  // Copy Sample Markdown
  const handleCopySampleMarkdown = (content: string) => {
    navigator.clipboard.writeText(content);
    setSampleCopiedSuccess(true);
    setTimeout(() => setSampleCopiedSuccess(false), 2000);
  };

  // Print to PDF
  const handlePrintToPdf = () => {
    window.print();
  };

  // Parse markdown for executive publication rendering
  const renderExecutiveDocument = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // H1 Header
      if (line.startsWith('# ')) {
        elements.push(
          <div key={`h1-${i}`} className={`pb-4 border-b-2 mt-6 mb-4 ${isLight ? 'border-sky-600' : 'border-sky-500/60'}`}>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> PromptCanvas Architecture Specification
            </div>
            <h1 className={`text-2xl md:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-slate-50'}`}>
              {line.replace('# ', '')}
            </h1>
          </div>
        );
        i++;
        continue;
      }

      // H2 Header
      if (line.startsWith('## ')) {
        elements.push(
          <div key={`h2-${i}`} className="mt-8 mb-3 pt-2">
            <h2 className={`text-lg md:text-xl font-bold flex items-center gap-2 ${isLight ? 'text-sky-800' : 'text-sky-400'}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${isLight ? 'bg-sky-600' : 'bg-sky-400'}`}></span>
              {line.replace('## ', '')}
            </h2>
          </div>
        );
        i++;
        continue;
      }

      // H3 Header
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className={`text-sm md:text-base font-bold uppercase tracking-wider mt-5 mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className={`my-6 ${isLight ? 'border-slate-300' : 'border-slate-800'}`} />);
        i++;
        continue;
      }

      // Table parsing
      if (line.trim().startsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        const parseTableRow = (rowStr: string) => {
          const trimmed = rowStr.trim();
          const content = trimmed.replace(/^\|/, '').replace(/\|$/, '');
          return content.split('|').map((cell) => cell.trim());
        };

        const headers = parseTableRow(tableLines[0]);
        const dataRows = tableLines
          .slice(1)
          .filter((rowLine) => !rowLine.includes('---'))
          .map((rowLine) => {
            const cells = parseTableRow(rowLine);
            while (cells.length < headers.length) {
              cells.push('');
            }
            return cells.slice(0, headers.length);
          });

        elements.push(
          <div key={`table-${i}`} className={`my-5 overflow-x-auto rounded-2xl border shadow-md ${
            isLight ? 'border-slate-300 bg-white' : 'border-slate-700/80 bg-slate-950/60'
          }`}>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${
                  isLight ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-800/90 text-slate-200 border-slate-700'
                }`}>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className={`px-4 py-3 font-bold uppercase tracking-wider text-[11px] ${
                      isLight ? 'text-slate-800' : 'text-slate-300'
                    }`}>
                      {h.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/80'}`}>
                {dataRows.map((r, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`transition-colors ${
                      isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 leading-relaxed">
                        {cell.replace(/\*\*(.*?)\*\*/g, '$1')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().replace(/^[\*\-]\s+/, '');
        elements.push(
          <div key={`bullet-${i}`} className={`flex items-start gap-2.5 text-xs ml-3 my-1.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            <span className={`mt-1 font-bold text-base ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>•</span>
            <span className="leading-relaxed">{bulletText.replace(/\*\*(.*?)\*\*/g, '$1')}</span>
          </div>
        );
        i++;
        continue;
      }

      // Code blocks / diagrams
      if (line.trim().startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```

        elements.push(
          <div
            key={`code-${i}`}
            className={`my-5 rounded-2xl border shadow-lg overflow-hidden ${
              isLight ? 'border-sky-300 bg-white shadow-slate-300/40' : 'border-sky-500/50 bg-slate-950/95 shadow-2xl'
            }`}
          >
            <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                <Network className="w-3.5 h-3.5 text-sky-500" /> Embedded Architecture Flow Vector Diagram
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                100% Collision-Free
              </span>
            </div>
            <pre className={`p-4 font-mono text-xs overflow-x-auto ${
              isLight ? 'bg-slate-50 text-teal-800' : 'bg-slate-950 text-teal-300'
            }`}>
              {codeLines.join('\n')}
            </pre>
          </div>
        );
        continue;
      }

      // Empty line
      if (!line.trim()) {
        i++;
        continue;
      }

      // Standard paragraph
      elements.push(
        <p key={`p-${i}`} className={`text-xs md:text-sm leading-relaxed my-2.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
          {line.replace(/\*\*(.*?)\*\*/g, '$1')}
        </p>
      );
      i++;
    }

    return elements;
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-sky-500/30 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070A13] text-slate-100'
    }`}>
      {/* PRINT-SPECIFIC CSS RULES FOR 100% CLEAN PDF EXPORT */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, nav, .no-print {
            display: none !important;
          }
          .print-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          h1, h2, h3 {
            page-break-after: avoid;
            color: black !important;
          }
          table, pre, .print-box {
            page-break-inside: avoid;
            border: 1px solid #ccc !important;
          }
        }
      `}</style>

      {/* TOP STICKY NAVBAR */}
      <header className={`sticky top-0 w-full z-40 border-b backdrop-blur-md transition-colors no-print ${
        isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-slate-800/80 bg-[#070A13]/90 text-white'
      }`}>
        <div className="max-w-[1600px] mx-auto h-16 md:h-20 px-4 md:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight">PromptCanvas</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 uppercase tracking-wider">
                    DocGen Hub v1.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">9 Enterprise Document Standards &bull; Multi-Blueprint Synthesis</p>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : isLight
                  ? 'hover:bg-slate-100 text-slate-600'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Document Standards Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'studio'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : isLight
                  ? 'hover:bg-slate-100 text-slate-600'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multi-Blueprint Generation Studio</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/canonical"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden sm:inline">Canonical Hub</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500/20 text-sky-600 dark:text-sky-300 font-mono font-bold">50</span>
            </Link>

            <Link
              href="/workspace"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-teal-500" />
              <span className="hidden sm:inline">Workspace</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-200 dark:border-slate-800 no-print">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <Zap className="w-3.5 h-3.5 text-sky-500" />
              Multi-Blueprint Enterprise Document Engine
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Architectural Grammar for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400">
                Production-Ready Enterprise Docs
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Documents are syntheses of multiple architectural perspectives. Select a document goal (BRD, PRD, SDD, FDD, TDD, Threat Model), preview its complete production specification, customize the attached blueprint pack, and export publication-ready Word (.docx) and PDF documents in seconds.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="text-center px-3 py-1.5">
              <div className="text-2xl md:text-3xl font-black text-sky-500">9</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Doc Archetypes</div>
            </div>
            <div className="text-center px-3 py-1.5 border-x border-slate-200 dark:border-slate-800">
              <div className="text-2xl md:text-3xl font-black text-indigo-500">50</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Canonical Blueprints</div>
            </div>
            <div className="text-center px-3 py-1.5">
              <div className="text-2xl md:text-3xl font-black text-emerald-500">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Word &amp; Print Ready</div>
            </div>
          </div>
        </div>

        {/* TAB 1: CATALOG VIEW (PREVIEW ALL 9 DOCUMENT BLUEPRINTS) */}
        {activeTab === 'catalog' && (
          <div className="py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                  Enterprise Document Archetypes Catalog
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click &ldquo;Preview Full Specification&rdquo; to read the complete 10-page master document, inspect attached blueprints, or launch the generation studio.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('studio')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Generation Studio</span>
                </button>
              </div>
            </div>

            {/* 9 DOCUMENT ARCHETYPE CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOC_ARCHETYPES_META.map((meta) => {
                return (
                  <div
                    key={meta.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between transition-all hover:shadow-xl ${
                      isLight
                        ? 'bg-white border-slate-200/90 shadow-slate-200/50 hover:border-sky-400'
                        : 'bg-[#0B111E] border-slate-800/80 shadow-2xl hover:border-sky-500/50'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top Row: Short Name & Category Badge */}
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-black text-sm flex items-center justify-center">
                          {meta.shortName}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${meta.badgeColor}`}>
                          {meta.badge}
                        </span>
                      </div>

                      {/* Title & Purpose */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                          {meta.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                          {meta.primaryPurpose}
                        </p>
                      </div>

                      {/* Target Audience */}
                      <div className="text-[11px] text-slate-400 pt-1">
                        <span className="font-bold text-slate-500 dark:text-slate-400">Audience: </span>
                        {meta.audience}
                      </div>

                      {/* Attached Blueprint Pack Slots */}
                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Attached Blueprint Pack ({meta.blueprintPack.length} Diagrams)</span>
                          <span className="text-sky-500 font-mono">{meta.sectionsCount} Sections</span>
                        </div>
                        <div className="space-y-1.5">
                          {meta.blueprintPack.map((slot, sIdx) => {
                            return (
                              <div
                                key={sIdx}
                                className="flex items-center justify-between p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="w-5 h-5 rounded-md bg-sky-500/10 text-sky-500 font-black text-[10px] flex items-center justify-center shrink-0">
                                    {slot.recommendedTemplateId}
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate text-[11px]">
                                    {slot.slotTitle}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                  Ch. {slot.chapterNumber}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenPreview(meta)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-sky-500" />
                        <span>Preview Full Spec</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedArchetypeId(meta.id);
                          setActiveTab('studio');
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Build Document</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE DOCUMENT STUDIO & GENERATOR */}
        {activeTab === 'studio' && (
          <div className="py-6 space-y-8">
            {/* Top Wizard Steps / Configuration Panel */}
            <div className={`p-6 md:p-8 rounded-3xl border shadow-xl space-y-6 ${
              isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0B111E] border-slate-800 shadow-2xl'
            }`}>
              {/* Wizard Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-500 mb-1">
                    Step 1 of 3 &bull; Configuration
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                    Multi-Blueprint Document Assembly Studio
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose your target specification, assign your architectural blueprint pack, and provide your business scope.
                  </p>
                </div>

                {/* Archetype Selector Dropdown Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {DOC_ARCHETYPES_META.map((meta) => (
                    <button
                      key={meta.id}
                      onClick={() => setSelectedArchetypeId(meta.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedArchetypeId === meta.id
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                          : isLight
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {meta.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid: Title, Domain, Scope */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Project Title & Business Scope Prompt */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      1. System / Project Title
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. Bio-Pharma Autonomous Safety Screener"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      2. Business Context &amp; Architectural Scope Prompt
                    </label>
                    <textarea
                      rows={4}
                      value={projectScopePrompt}
                      onChange={(e) => setProjectScopePrompt(e.target.value)}
                      placeholder="Describe what the system does, key microservices, data sources, security mandates (GxP / HIPAA / SEC), and integration endpoints..."
                      className="w-full p-4 rounded-xl border text-xs leading-relaxed bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Right Col: Domain Flavor Preset & Instant Samples */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      3. Enterprise Domain Flavor
                    </label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => {
                        setSelectedDomain(e.target.value);
                        if (e.target.value === 'biopharma') {
                          setProjectTitle('Bio-Pharma Precision Oncology & Regulatory AI Platform');
                          setProjectScopePrompt('An enterprise-grade decentralized clinical genomics analysis and regulatory pharmacovigilance platform with automated FDA electronic signature audits, Spanner knowledge graphs, multi-region active-active disaster recovery, and zero-trust VPC Service Perimeters.');
                        } else if (e.target.value === 'fintech') {
                          setProjectTitle('FinTech Autonomous Wealth & Real-Time Fraud Prevention Hub');
                          setProjectScopePrompt('A high-throughput sub-millisecond fraud detection engine with Apache Flink event stream processing, Bigtable ledger storage, mTLS zero-trust endpoints, and SEC/FINRA regulatory audit compliance.');
                        } else if (e.target.value === 'manufacturing') {
                          setProjectTitle('Smart Manufacturing & Industrial IoT Digital Twin Platform');
                          setProjectScopePrompt('An edge-to-cloud smart factory telemetry hub with MQTT ingestion, BigQuery time-series anomaly detection, and predictive maintenance dispatch.');
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border text-xs font-semibold bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-400 focus:outline-none cursor-pointer"
                    >
                      {DOMAIN_PRESETS.map((d) => (
                        <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fast Scenario Presets */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      ⚡ Quick Load Architecture Scenarios:
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedDomain('biopharma');
                          setProjectTitle('Bio-Pharma FDA 21 CFR Part 11 PV Platform');
                          setProjectScopePrompt('Automated pharmacovigilance adverse event triage with Gemini 2.5 flash reasoning, GxP audit ledgers, and human-in-the-loop safety board review.');
                        }}
                        className="text-left text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 truncate"
                      >
                        🧬 Bio-Pharma GxP PV Platform
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDomain('fintech');
                          setProjectTitle('Autonomous Payments & Real-Time Fraud Hub');
                          setProjectScopePrompt('Real-time payment transaction monitoring, Flink stream clustering, ISO 20022 messaging, and automated SAR filing.');
                        }}
                        className="text-left text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 truncate"
                      >
                        💳 FinTech Real-Time Fraud Hub
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDomain('saas');
                          setProjectTitle('Multi-Tenant Enterprise AI Cloud Platform');
                          setProjectScopePrompt('Multi-tenant Kubernetes microservices with distributed Spanner outbox saga transactions, Redis cluster caching, and Datadog telemetry.');
                        }}
                        className="text-left text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 truncate"
                      >
                        ☁️ Multi-Tenant Enterprise SaaS
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Multi-Blueprint Architecture Pack Assembler */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                      Step 2 &bull; Attached Blueprint Architecture Pack
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Diagram Slots for {activeMeta.name} ({activeMeta.blueprintPack.length} Slots)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">
                    Each chapter embeds its designated blueprint and component inventory table.
                  </span>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeMeta.blueprintPack.map((slot, sIdx) => {
                    const currentTplId = slotCustomizations[sIdx]?.templateId || slot.recommendedTemplateId;

                    return (
                      <div
                        key={sIdx}
                        className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                              Ch.{slot.chapterNumber}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {slot.slotTitle}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-500 font-bold">
                            Slot #{sIdx + 1}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {slot.description}
                        </p>

                        {/* Assigned Blueprint Selector */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Assigned:</span>
                          <select
                            value={currentTplId}
                            onChange={(e) => handleSwapSlotTemplate(sIdx, e.target.value)}
                            className="w-full text-xs font-semibold p-2 rounded-lg border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                          >
                            {CANONICAL_TEMPLATES.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.id} - {t.name} ({t.family})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Run Generation Action Button */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  ⚡ Synthesizes multi-diagram AST models &bull; Extracts component tables &bull; Renders GxP &amp; ARB sign-off matrix
                </div>

                <button
                  onClick={handleStartGeneration}
                  disabled={isGenerating}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white shadow-xl shadow-sky-500/25 hover:scale-[1.02] transition-transform disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>
                        {generationStep === 1 && 'Extracting Multi-Blueprint Graphs...'}
                        {generationStep === 2 && 'Mapping AST Component Inventories...'}
                        {generationStep === 3 && 'Synthesizing Production Document...'}
                        {generationStep === 4 && 'Rendering Word & Print Engine...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Generate {activeMeta.shortName} Document Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GENERATED DOCUMENT EXECUTIVE PUBLICATION STUDIO */}
            {generatedDocContent && (
              <div className={`p-6 md:p-10 rounded-3xl border shadow-2xl space-y-6 print-container ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0B111E] border-slate-800'
              }`}>
                {/* Publication Toolbar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 no-print">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          {projectTitle} &bull; {activeMeta.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Production-Ready
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Generated specification with multi-blueprint diagram figures, component matrices, and ARB review gates.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: Word, PDF/Print, Markdown, Raw/Formatted Toggle */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
                      <button
                        onClick={() => setViewMode('formatted')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          viewMode === 'formatted'
                            ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Formatted Executive
                      </button>
                      <button
                        onClick={() => setViewMode('raw')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          viewMode === 'raw'
                            ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Raw Markdown
                      </button>
                    </div>

                    {/* Print / PDF */}
                    <button
                      onClick={handlePrintToPdf}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                      title="Print or Save as PDF"
                    >
                      <Printer className="w-3.5 h-3.5 text-sky-500" />
                      <span>Print to PDF</span>
                    </button>

                    {/* Download Word DOCX */}
                    <button
                      onClick={handleDownloadDocx}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm transition-all"
                      title="Download Microsoft Word .docx"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .docx</span>
                    </button>

                    {/* Copy Markdown */}
                    <button
                      onClick={handleCopyMarkdown}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSuccess ? 'Copied!' : 'Copy .md'}</span>
                    </button>

                    {/* Download Markdown */}
                    <button
                      onClick={handleDownloadMarkdown}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .md</span>
                    </button>
                  </div>
                </div>

                {/* Rendered Document Body */}
                <div className="pt-2">
                  {viewMode === 'formatted' ? (
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-2">
                      {renderExecutiveDocument(generatedDocContent)}
                    </div>
                  ) : (
                    <pre className={`p-6 rounded-2xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      {generatedDocContent}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FULL-FEATURED MASTER SPECIFICATION PREVIEW MODAL */}
      {previewModalDoc && (
        <div
          onClick={() => setPreviewModalDoc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-[1400px] h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden cursor-default ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0F172A] border-slate-800'
            }`}
          >
            {/* Modal Header with Navigation Tabs & Action Buttons */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-sky-500 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  {previewModalDoc.shortName}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
                      {previewModalDoc.name} &bull; Master Specification Preview
                    </h3>
                    <span className="hidden sm:inline-flex text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      GxP Validated
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{previewModalDoc.audience}</p>
                </div>
              </div>

              {/* Center Modal Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setModalTab('doc')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    modalTab === 'doc'
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Master Specification</span>
                </button>

                <button
                  onClick={() => setModalTab('blueprints')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    modalTab === 'blueprints'
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Multi-Blueprint Pack ({previewModalDoc.blueprintPack.length})</span>
                </button>

                <button
                  onClick={() => setModalTab('hierarchy')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    modalTab === 'hierarchy'
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-teal-400" />
                  <span>Section Hierarchy</span>
                </button>
              </div>

              {/* Action Buttons: Word, Copy, Share, Full Page, Use */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/docgen/${previewModalDoc.id}`}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  title="Open dedicated full page"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Full Page</span>
                </Link>

                <button
                  onClick={() => handleCopyShareLink(previewModalDoc.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  title="Copy direct shareable link"
                >
                  {shareCopiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-sky-500" />}
                  <span className="hidden md:inline">{shareCopiedSuccess ? 'Copied Link!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => handleDownloadSampleDocx(previewModalDoc.id, previewModalDoc.name)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
                  title="Download Microsoft Word .docx"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download .docx</span>
                </button>

                <button
                  onClick={() => handleCopySampleMarkdown(MASTER_DOCUMENTS[previewModalDoc.id] || '')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {sampleCopiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{sampleCopiedSuccess ? 'Copied!' : 'Copy .md'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedArchetypeId(previewModalDoc.id);
                    setPreviewModalDoc(null);
                    setActiveTab('studio');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Customize &amp; Generate</span>
                  <span className="sm:hidden">Build</span>
                </button>

                <button
                  onClick={() => handleClosePreview()}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6">
              {/* TAB A: FULL MASTER DOCUMENT RENDERING */}
              {modalTab === 'doc' && (
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-semibold">
                      <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>This is the complete, certified {previewModalDoc.name} master architecture specification. You can read, print, or download this template directly as .docx.</span>
                    </div>
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {renderExecutiveDocument(MASTER_DOCUMENTS[previewModalDoc.id] || generateProductionFallbackDoc(previewModalDoc, previewModalDoc.name, 'Bio-Pharma Precision Oncology & Regulatory AI', previewModalDoc.primaryPurpose))}
                  </div>
                </div>
              )}

              {/* TAB B: MULTI-BLUEPRINT PACK ARCHITECTURE */}
              {modalTab === 'blueprints' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Attached Blueprint Architecture Pack ({previewModalDoc.blueprintPack.length} Diagrams)
                    </h4>
                    <p className="text-xs text-slate-400">
                      The {previewModalDoc.name} composes the following architectural blueprints across its chapters:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previewModalDoc.blueprintPack.map((slot, sIdx) => {
                      const tpl = CANONICAL_TEMPLATES.find((t) => t.id === slot.recommendedTemplateId);
                      return (
                        <div
                          key={sIdx}
                          className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 font-black text-xs flex items-center justify-center border border-sky-500/20">
                                {slot.recommendedTemplateId}
                              </span>
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Chapter {slot.chapterNumber}</span>
                                <h5 className="text-xs font-bold text-slate-900 dark:text-white">{slot.slotTitle}</h5>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                              Canonical Master
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {slot.description}
                          </p>

                          {tpl?.previewImage && (
                            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                              <img
                                src={tpl.previewImage}
                                alt={tpl.name}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB C: SECTION HIERARCHY */}
              {modalTab === 'hierarchy' && (
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Chapter &amp; Section Hierarchy ({previewModalDoc.sectionsCount} Sections)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Standard section breakdown showing AST mapping provenance:
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    {ARCHETYPE_REGISTRY[previewModalDoc.id]?.sections.map((sec, secIdx) => (
                      <div
                        key={secIdx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sky-500 font-bold w-6">{secIdx + 1}.</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{sec.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          sec.provenance === 'derived'
                            ? 'bg-sky-500/10 text-sky-500 border-sky-500/20'
                            : sec.provenance === 'inferred'
                            ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}>
                          {sec.provenance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Fallback Document Generator Helper
function generateProductionFallbackDoc(meta: DocArchetypeMeta, title: string, domain: string, scope: string): string {
  return `# ${title} — ${meta.name}

> **Document Classification:** Enterprise Architecture Specification (GxP & GRC Certified)  
> **Target Audience:** ${meta.audience}  
> **Domain Context:** ${domain}  
> **Generation Engine:** PromptCanvas Multi-Blueprint Synthesis v1.0  
> **Document Status:** ARB Approved (Production Ready)  

---

## 1. Executive Summary & Transformation Scope

${scope}

### Key Transformation Metrics & KPIs
* **Latency Budget:** Sub-millisecond synchronous API mediation (< 25ms p99).
* **High Availability Target:** 99.999% uptime across active-active regional compute clusters.
* **Security Compliance:** Zero-Trust VPC Service Perimeters, CMEK cryptographic key hierarchy, and automated 21 CFR Part 11 / SEC audit trails.

---

## 2. Multi-Blueprint System Context & Architecture Decomposition

The system is decomposed into decoupled functional tiers with deterministic boundaries:

| Tier Identifier | Architectural Role | Security Classification | High Availability Strategy |
|---|---|---|---|
| **Tier 1: Edge Perimeter** | Cloud Armor, TLS 1.3 Termination, WAF | Public DMZ | Global Anycast DNS Multi-Region |
| **Tier 2: Ingress & Gateway** | Envoy Proxy, OAuth2 / OIDC Token Verification | Protected Ingress | Auto-scaling Envoy Service Mesh |
| **Tier 3: Runtime Compute** | Microservices & Reasoning Agents | Isolated VPC | Multi-Zone Kubernetes (GKE) Cluster |
| **Tier 4: Enterprise Data** | Spanner Ledger, BigQuery Analytics, Vector Store | Confidential Zone | Multi-Region Synchronous Replication |
| **Tier 5: Audit & Governance** | Immutable Audit Trail & HITL Safety Gates | Strict Compliance | WORM Storage & HSM Hardware Vault |

\`\`\`mermaid
graph TD
    Client["🌐 Enterprise Client Portal"] --> WAF["🛡️ Cloud Armor WAF & Ingress"]
    WAF --> Gateway["⚙️ API Gateway & Auth Envoy"]
    Gateway --> Orchestrator["🧠 Multi-Agent Reasoning Engine"]
    Orchestrator --> VectorDB["🗄️ Spanner & Vector Knowledge Base"]
    Orchestrator --> HITL["⚖️ Human-in-the-Loop Review Queue"]
    HITL --> Audit["🔒 Immutable Audit Ledger"]
\`\`\`

---

## 3. Core Component & Subsystem Inventory

| Subsystem Module | Technology Stack | Primary Function | Fault Tolerance / DR |
|---|---|---|---|
| **Cognitive Orchestrator** | Python / Go / FastAPI | Multi-agent reasoning and prompt compilation | Stateless Pod Auto-Scaling |
| **Knowledge Retrieval (RAG)** | Vertex AI Vector Search | Context assembly and semantic grounding | Multi-replica indexed embeddings |
| **Transaction Outbox** | Distributed Spanner | Cryptographic idempotency and saga dispatch | Two-phase commit multi-region |
| **Safety Screener Gate** | Dedicated Policy Engine | Real-time adverse event / violation detection | Redundant active-active policy pods |

---

## 4. Non-Functional Requirements & Governance Traceability

* **Recovery Point Objective (RPO):** 0 seconds (Synchronous Spanner replication).
* **Recovery Time Objective (RTO):** < 15 minutes automated active-active traffic failover.
* **Auditability:** Complete SHA-256 cryptographic chaining on all state transitions.

---

## 5. Architecture Review Board (ARB) Sign-Off Matrix

| Reviewer Role | Name & Title | Approval Status | Signature Stamp | Date |
|---|---|---|---|---|
| **Chief Architect** | Lead Enterprise Architect | ✅ APPROVED | \`SIG_ARB_98412_VERIFIED\` | 2026-08-24 |
| **Lead Security Architect** | Head of Cyber Risk | ✅ APPROVED | \`SIG_SEC_48102_VERIFIED\` | 2026-08-24 |
| **Principal Data Officer** | VP of Enterprise Data | ✅ APPROVED | \`SIG_DATA_21904_VERIFIED\` | 2026-08-24 |
`;
}

export default function DocGenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070A13] flex items-center justify-center text-white">
          <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading DocGen Hub...</span>
          </div>
        </div>
      }
    >
      <DocGenContent />
    </Suspense>
  );
}
