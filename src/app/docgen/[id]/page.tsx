'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  Copy,
  Check,
  Layers,
  ArrowLeft,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCode,
  BookOpen,
  LayoutGrid,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { CANONICAL_TEMPLATES, DOMAIN_PRESETS } from '@/lib/canonical/canonicalTemplates';
import { ARCHETYPE_REGISTRY, ArchetypeId } from '@/lib/compose/archetypes';
import { MASTER_DOCUMENTS } from '@/lib/compose/masterDocs';

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

function DocDetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const docId = (rawId || 'sdd').toLowerCase() as ArchetypeId;

  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<'doc' | 'blueprints' | 'hierarchy'>('doc');
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Find active archetype metadata
  const docMeta = useMemo(() => {
    return DOC_ARCHETYPES_META.find((m) => m.id === docId) || DOC_ARCHETYPES_META[2];
  }, [docId]);

  // Compute navigation indices
  const currentIndex = DOC_ARCHETYPES_META.findIndex((m) => m.id === docMeta.id);
  const prevDoc = currentIndex > 0 ? DOC_ARCHETYPES_META[currentIndex - 1] : null;
  const nextDoc = currentIndex < DOC_ARCHETYPES_META.length - 1 ? DOC_ARCHETYPES_META[currentIndex + 1] : null;

  const handleCopyShareUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleCopyMarkdown = () => {
    const md = MASTER_DOCUMENTS[docMeta.id] || '';
    navigator.clipboard.writeText(md);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const handleDownloadDocx = async () => {
    try {
      const primaryTpl = CANONICAL_TEMPLATES[0];
      const primaryXml = primaryTpl.generateXml('biopharma', isLight ? 'light' : 'dark');

      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: docMeta.id,
          format: 'docx',
          xml: primaryXml,
          title: `Novacura Platform ${docMeta.name}`,
          domain: 'Bio-Pharma Precision Oncology & Regulatory AI',
          userPrompt: 'Master architectural baseline for GxP validated production.',
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Novacura_${docMeta.id.toUpperCase()}_Master_Specification.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('DOCX download error:', err);
    }
  };

  // Render formatted markdown
  const renderExecutiveDocument = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

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

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className={`text-sm md:text-base font-bold uppercase tracking-wider mt-5 mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className={`my-6 ${isLight ? 'border-slate-300' : 'border-slate-800'}`} />);
        i++;
        continue;
      }

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
          .filter((r) => !r.includes('---'))
          .map((r) => {
            const cells = parseTableRow(r);
            while (cells.length < headers.length) {
              cells.push('');
            }
            return cells.slice(0, headers.length);
          });

        elements.push(
          <div key={`table-${i}`} className={`my-5 overflow-x-auto rounded-2xl border shadow-md ${isLight ? 'border-slate-300 bg-white' : 'border-slate-700/80 bg-slate-950/60'}`}>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-800/90 text-slate-200 border-slate-700'}`}>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">{h.replace(/\*\*/g, '')}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/80'}`}>
                {dataRows.map((r, rIdx) => (
                  <tr key={rIdx} className={`transition-colors ${isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-slate-900/50 text-slate-300'}`}>
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 leading-relaxed">{cell.replace(/\*\*(.*?)\*\*/g, '$1')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

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

      if (line.trim().startsWith('```')) {
        const lang = line.trim().replace(/^```/, '').trim().toLowerCase();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++;

        const isDiagram =
          lang === 'mermaid' ||
          lang === 'diagram' ||
          codeLines.some(
            (l) =>
              l.includes('graph TD') ||
              l.includes('graph LR') ||
              l.includes('flowchart') ||
              l.includes('sequenceDiagram') ||
              l.includes('erDiagram')
          );

        if (!isDiagram) {
          // Render standard clean code block (for SQL, JSON, YAML, TypeScript, Shell, etc.)
          elements.push(
            <div
              key={`code-block-${i}`}
              className={`my-5 rounded-2xl border overflow-hidden shadow-sm ${
                isLight ? 'bg-[#0F172A] border-slate-700 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <div className="px-4 py-2 border-b border-slate-800 bg-[#0B111E] flex items-center justify-between text-xs font-mono">
                <span className="uppercase font-bold text-[11px] text-sky-400">
                  {lang || 'code'} Specification
                </span>
                <span className="text-[10px] text-slate-500 font-sans">
                  {codeLines.length} lines
                </span>
              </div>
              <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed text-teal-300">
                {codeLines.join('\n')}
              </pre>
            </div>
          );
          continue;
        }

        // Extract preceding heading for title / template matching (e.g. Template 01, Template 08)
        let precedingHeading = '';
        for (let back = i - 2; back >= Math.max(0, i - 6); back--) {
          if (lines[back] && lines[back].startsWith('#')) {
            precedingHeading = lines[back].replace(/^#+\s*/, '');
            break;
          }
        }

        const tplMatch = precedingHeading.match(/Template\s*([0-9]{2})/i);
        const matchedTemplateId = tplMatch ? tplMatch[1] : null;
        const canonicalTpl = matchedTemplateId ? CANONICAL_TEMPLATES.find((t) => t.id === matchedTemplateId) : null;

        const parsedNodes: { id: string; label: string; tier: string }[] = [];
        const parsedFlows: { from: string; to: string; label?: string }[] = [];

        for (const rawLine of codeLines) {
          const l = rawLine.trim();
          const nodeMatch = l.match(/^([A-Za-z0-9_]+)\["([^"]+)"\]/);
          if (nodeMatch) {
            const [, id, label] = nodeMatch;
            let tier = 'Architecture Subsystem';
            if (label.includes('🌐') || label.includes('Client') || label.includes('Portal') || label.includes('USERS')) tier = 'Client & Ingress Tier';
            else if (label.includes('🛡️') || label.includes('WAF') || label.includes('Gateway') || label.includes('VPC')) tier = 'Security & Perimeter Tier';
            else if (label.includes('⚙️') || label.includes('Orchestrator') || label.includes('Compute') || label.includes('Pod')) tier = 'Compute & Runtime Tier';
            else if (label.includes('🤖') || label.includes('Model') || label.includes('LLM') || label.includes('AI') || label.includes('Gemini')) tier = 'AI & Cognitive Model Tier';
            else if (label.includes('🗄️') || label.includes('Spanner') || label.includes('Lake') || label.includes('DB') || label.includes('Data')) tier = 'Enterprise Data & Knowledge Tier';
            else if (label.includes('⚖️') || label.includes('Audit') || label.includes('Governance') || label.includes('SAFETY') || label.includes('HITL')) tier = 'Governance & Audit Tier';
            else if (label.includes('☁️') || label.includes('Systems') || label.includes('External') || label.includes('API')) tier = 'External Ecosystem Tier';

            if (!parsedNodes.some((n) => n.id === id)) {
              parsedNodes.push({ id, label, tier });
            }
          }

          const flowMatch = l.match(/([A-Za-z0-9_]+)\s*(?:-->|<-->)\s*(?:\|"([^"]+)"\|\s*)?([A-Za-z0-9_]+)/);
          if (flowMatch) {
            parsedFlows.push({ from: flowMatch[1], to: flowMatch[3], label: flowMatch[2] });
          }
        }

        elements.push(
          <div
            key={`diagram-fig-${i}`}
            className={`my-6 rounded-2xl border shadow-xl overflow-hidden ${
              isLight
                ? 'border-sky-300 bg-white shadow-slate-300/40'
                : 'border-sky-500/40 bg-slate-950/95 shadow-2xl'
            }`}
          >
            {/* Figure Header */}
            <div className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${
              isLight
                ? 'bg-slate-100/90 border-slate-200'
                : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${isLight ? 'bg-sky-600' : 'bg-sky-400'}`}></span>
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                  📐 Embedded Architecture Flow Diagram {matchedTemplateId ? `(Blueprint ${matchedTemplateId})` : 'Figure'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}>
                  GxP &amp; VPC-SC Verified
                </span>
                {canonicalTpl && (
                  <Link
                    href={`/canonical/${canonicalTpl.id}`}
                    target="_blank"
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 border border-sky-500/20 flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect Draw.io XML</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Visual Figure Body */}
            <div className="p-5 space-y-4">
              {/* If Canonical Template Preview is Available */}
              {canonicalTpl?.previewImage && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 relative group">
                  <img
                    src={canonicalTpl.previewImage}
                    alt={canonicalTpl.name}
                    className="w-full max-h-80 object-contain rounded-lg"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/canonical/${canonicalTpl.id}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-sky-600/90 hover:bg-sky-600 text-white text-[11px] font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Open Canvas</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Multi-Tier Component Topology Grid */}
              {parsedNodes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {parsedNodes.map((node, nIdx) => (
                    <div
                      key={node.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 hover:border-sky-300 hover:bg-white'
                          : 'bg-slate-900/80 border-slate-800 hover:border-sky-500/60 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isLight ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                        }`}>
                          Node 0{nIdx + 1}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {node.tier}
                        </span>
                      </div>
                      <div className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                        {node.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Flow Connections Visual Bar */}
              {parsedFlows.length > 0 && (
                <div className={`p-3.5 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800/80'
                }`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span>⚡ Primary Integration Pathways &amp; Event Channels</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {parsedFlows.map((flow, fIdx) => {
                      const sourceNode = parsedNodes.find((n) => n.id === flow.from);
                      const targetNode = parsedNodes.find((n) => n.id === flow.to);
                      return (
                        <div
                          key={fIdx}
                          className={`px-3 py-2 rounded-lg border flex items-center justify-between ${
                            isLight
                              ? 'bg-white border-slate-200 text-slate-800'
                              : 'bg-slate-950/80 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className={`font-semibold truncate max-w-[42%] ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                            {sourceNode?.label.replace(/^[^\s]+\s+/, '') || flow.from}
                          </span>
                          <span className={`text-[10px] font-mono px-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                            {flow.label ? `➔ [${flow.label}] ➔` : '──────►'}
                          </span>
                          <span className={`font-semibold truncate max-w-[42%] ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>
                            {targetNode?.label.replace(/^[^\s]+\s+/, '') || flow.to}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Raw Flow Definition Accordion */}
              <details className="text-xs">
                <summary className={`cursor-pointer font-bold select-none text-[11px] uppercase tracking-wider ${isLight ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200'}`}>
                  View Raw Flow DSL Definition ({codeLines.length} lines)
                </summary>
                <pre className={`mt-2 p-3 rounded-xl font-mono text-[11px] overflow-x-auto ${
                  isLight ? 'bg-slate-100 text-slate-800' : 'bg-slate-950 text-teal-300'
                }`}>
                  {codeLines.join('\n')}
                </pre>
              </details>
            </div>
          </div>
        );
        continue;
      }

      if (!line.trim()) {
        i++;
        continue;
      }

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
      {/* HEADER */}
      <header className={`sticky top-0 w-full z-40 border-b backdrop-blur-md transition-colors ${
        isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-slate-800/80 bg-[#070A13]/90 text-white'
      }`}>
        <div className="max-w-[1600px] mx-auto h-16 md:h-20 px-4 md:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/docgen"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to DocGen Hub</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center">
                {docMeta.shortName}
              </span>
              <div>
                <h1 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                  {docMeta.name}
                </h1>
                <p className="text-[11px] text-slate-400">Master Specification Baseline</p>
              </div>
            </div>
          </div>

          {/* Navigation Prev / Next */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              disabled={!prevDoc}
              onClick={() => prevDoc && router.push(`/docgen/${prevDoc.id}`)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                prevDoc ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer' : 'opacity-30 cursor-not-allowed text-slate-400'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Prev {prevDoc ? `(${prevDoc.shortName})` : ''}</span>
            </button>

            <span className="text-[11px] font-mono font-bold px-2 text-slate-500">
              {currentIndex + 1} / {DOC_ARCHETYPES_META.length}
            </span>

            <button
              disabled={!nextDoc}
              onClick={() => nextDoc && router.push(`/docgen/${nextDoc.id}`)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                nextDoc ? 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer' : 'opacity-30 cursor-not-allowed text-slate-400'
              }`}
            >
              <span className="hidden md:inline">Next {nextDoc ? `(${nextDoc.shortName})` : ''}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Copy direct shareable URL"
            >
              {shareCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-sky-500" />}
              <span className="hidden md:inline">{shareCopied ? 'Copied Link!' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownloadDocx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download .docx</span>
            </button>

            <button
              onClick={() => router.push(`/docgen?tab=studio&doc=${docMeta.id}`)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customize in Studio</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN DOCUMENT VIEWPORT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-10 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('doc')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'doc' ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Master Specification Document</span>
            </button>

            <button
              onClick={() => setActiveTab('blueprints')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'blueprints' ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Attached Blueprint Pack ({docMeta.blueprintPack.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'hierarchy' ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-teal-400" />
              <span>Section Hierarchy</span>
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-sky-500" />
            <span>Print to PDF</span>
          </button>
        </div>

        {/* TAB A: FULL MASTER DOCUMENT */}
        {activeTab === 'doc' && (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {renderExecutiveDocument(MASTER_DOCUMENTS[docMeta.id] || '')}
          </div>
        )}

        {/* TAB B: BLUEPRINTS */}
        {activeTab === 'blueprints' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Attached Blueprints for {docMeta.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docMeta.blueprintPack.map((slot, sIdx) => {
                const tpl = CANONICAL_TEMPLATES.find((t) => t.id === slot.recommendedTemplateId);
                return (
                  <div key={sIdx} className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-500 font-bold text-xs flex items-center justify-center">
                          {slot.recommendedTemplateId}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Chapter {slot.chapterNumber}: {slot.slotTitle}</h4>
                      </div>
                      <Link
                        href={`/canonical/${slot.recommendedTemplateId}`}
                        className="text-[10px] font-bold text-sky-500 hover:underline"
                        target="_blank"
                      >
                        Inspect XML &rarr;
                      </Link>
                    </div>
                    <p className="text-xs text-slate-400">{slot.description}</p>
                    {tpl?.previewImage && (
                      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                        <img src={tpl.previewImage} alt={tpl.name} className="w-full h-full object-contain p-2" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB C: HIERARCHY */}
        {activeTab === 'hierarchy' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Chapter &amp; Section Hierarchy ({docMeta.sectionsCount} Sections)
            </h3>
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              {ARCHETYPE_REGISTRY[docMeta.id]?.sections.map((sec, secIdx) => (
                <div key={secIdx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sky-500 font-bold w-6">{secIdx + 1}.</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{sec.title}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20">
                    {sec.provenance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DocDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070A13] flex items-center justify-center text-white font-mono text-xs text-sky-400">Loading Specification...</div>}>
      <DocDetailPageContent />
    </Suspense>
  );
}
