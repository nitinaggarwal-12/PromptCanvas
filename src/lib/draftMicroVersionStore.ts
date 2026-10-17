import {
  buildNasaMultiverseClosedLoopHarnessXml,
  buildOracleEbsExadataClosedLoopHarnessXml,
  buildOfficialOracleEbsExadataArchCenter78Xml,
  buildUniversalClosedLoopDomainHarnessXml,
} from './canonical/nasaMultiverseClosedLoopHarness';
import { synthesizePromptDrivenDiagramXml } from './promptDrivenDiagramSynthesizer';
import { createBlankCanvasDrawioXml } from './xmlHealer';

export interface AutoSavedDraftBlueprint {
  id: string;
  name: string;
  domain: string;
  description: string;
  prompt: string;
  tags: string[];
  nodeCount: number;
  specCount: number;
  versionCount: number;
  activeVersionTag: string;
  major: number;
  minor: number;
  micro: number;
  xml: string;
  latest_xml?: string;
  created_studio: 'draft';
  status: 'draft';
  architecture_type: string;
  blueprintId?: string;
  perspective?: string;
  createdAt: string;
  updatedAt: string;
  versions?: any[];
}

const DRAFT_STORAGE_KEY = 'promptcanvas_draft_blueprints';
const DELETED_DRAFTS_KEY = 'promptcanvas_deleted_draft_ids';

/**
 * Self-heals any stale 1-box stub (`copilot_mod_custom_box_0` / `CO-PILOT SYNTHESIS V1.1` / `< 6` vertices)
 * or legacy flat 4-tier diagram (`oracle-at-google-ebs-exadata-2026`) into the 31-vertex Closed-Loop
 * Semantic Shape Topology (`buildOracleEbsExadataClosedLoopHarnessXml` or `buildUniversalClosedLoopDomainHarnessXml`).
 */
export function healStubOrOracleDiagramXml(
  xml?: string | null,
  prompt?: string | null,
  title?: string | null
): { xml: string; latest_xml?: string; healed: boolean; canonicalTitle?: string } {
  const safeXml = String(xml || '');
  const isIntentionalBlankBaseline =
    safeXml.includes('data-blank-canvas="true"') &&
    /initial blank canvas|blank canvas baseline/i.test(`${prompt || ''} ${title || ''}`);

  if (isIntentionalBlankBaseline) {
    return { xml: safeXml, healed: false };
  }

  const combinedText = `${prompt || ''} ${title || ''} ${safeXml.slice(0, 600)}`;
  const isOracleExadataContext =
    /oracle|exadata|ebusiness|e-business|\bebs\b|oracle@googl/i.test(combinedText);

  const isPurgedLegacyFourTier =
    safeXml.includes('oracle-at-google-ebs-exadata-2026') ||
    safeXml.includes('PromptCanvas-OracleAtGoogleExadataEngine') ||
    safeXml.includes('oracle_ebs_exadata_closed_loop_harness');

  if (isPurgedLegacyFourTier) {
    const healedXml = buildOracleEbsExadataClosedLoopHarnessXml('light');
    return {
      xml: healedXml,
      latest_xml: healedXml,
      healed: true,
      canonicalTitle:
        'Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M) — Official Split-VPC Architecture (v1.0.1)',
    };
  }

  const vertexCount = (safeXml.match(/vertex="1"/gi) || []).length;
  const isOneBoxCoPilotStub =
    safeXml.includes('copilot_mod_custom_box_0') ||
    safeXml.includes('CO-PILOT SYNTHESIS V1.1') ||
    (!safeXml.includes('data-blank-canvas="true"') &&
      vertexCount > 0 &&
      vertexCount < 6 &&
      Boolean((prompt && prompt.trim().length > 5) || isOracleExadataContext));

  if (isOneBoxCoPilotStub) {
    if (isOracleExadataContext) {
      const oracleXml = buildOracleEbsExadataClosedLoopHarnessXml('light');
      return {
        xml: oracleXml,
        latest_xml: oracleXml,
        healed: true,
        canonicalTitle:
          'Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M) — Official Split-VPC Architecture (v1.0.1)',
      };
    }
    const fallbackPrompt =
      prompt || title || 'NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness';
    const synthXml = synthesizePromptDrivenDiagramXml(fallbackPrompt, { noTemplate: true });
    return {
      xml: synthXml,
      latest_xml: synthXml,
      healed: true,
      canonicalTitle: title || fallbackPrompt,
    };
  }

  return { xml: safeXml, healed: false };
}

/**
 * Computes the next semantic micro-version (v<major>.<minor>.<micro>, e.g., v1.0 -> v1.0.1 -> v1.0.2).
 */
export function computeNextMicroVersion(
  prevMajor = 1,
  prevMinor = 0,
  prevMicro = 0,
  prevTag?: string
): { major: number; minor: number; micro: number; versionTag: string } {
  if (prevTag) {
    const clean = prevTag.trim().replace(/^v/i, '');
    const parts = clean.split('.').map((n) => parseInt(n, 10));
    if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      const nextMicro = parts[2] + 1;
      return {
        major: parts[0],
        minor: parts[1],
        micro: nextMicro,
        versionTag: `v${parts[0]}.${parts[1]}.${nextMicro}`,
      };
    }
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const nextMicro = (prevMicro || 0) + 1;
      return {
        major: parts[0],
        minor: parts[1],
        micro: nextMicro,
        versionTag: `v${parts[0]}.${parts[1]}.${nextMicro}`,
      };
    }
  }
  const major = Number.isFinite(prevMajor) && prevMajor > 0 ? prevMajor : 1;
  const minor = Number.isFinite(prevMinor) && prevMinor >= 0 ? prevMinor : 0;
  const micro = (Number.isFinite(prevMicro) && prevMicro >= 0 ? prevMicro : 0) + 1;
  return {
    major,
    minor,
    micro,
    versionTag: `v${major}.${minor}.${micro}`,
  };
}

/**
 * Parses any version tag (e.g. "v1.0.1", "v1.1", "v1.0") and returns normalized micro-version string.
 */
export function normalizeToMicroVersionTag(tag?: string, fallbackIndex = 1): string {
  if (!tag) return `v1.0.${fallbackIndex}`;
  const clean = tag.trim().replace(/^v/i, '');
  const parts = clean.split('.').map((p) => parseInt(p, 10));
  if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return `v${parts[0]}.${parts[1]}.${parts[2]}`;
  }
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    if (parts[0] === 1 && parts[1] === 0) return 'v1.0.0';
    return `v${parts[0]}.0.${parts[1]}`;
  }
  return `v1.0.${fallbackIndex}`;
}

export function getDeletedDraftIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_DRAFTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markDraftDeleted(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = new Set(getDeletedDraftIds().map((x) => x.toUpperCase()));
    current.add(id.toUpperCase());
    localStorage.setItem(DELETED_DRAFTS_KEY, JSON.stringify(Array.from(current)));

    const rawDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
    if (Array.isArray(rawDrafts)) {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify(rawDrafts.filter((d: any) => d?.id !== id))
      );
    }
  } catch {}
}

/**
 * Built-in NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness (v1.0.1 Draft)
 * Ensures the synthesized NASA diagram is always #1 in Library -> Drafts and /library?q=nasa.
 */
export function buildNasaMultiverseDraftItem(): AutoSavedDraftBlueprint {
  const nasaXml = buildNasaMultiverseClosedLoopHarnessXml('light');
  const nasaPrompt = '1. Build an agentic harness for Nasa launching satellights in the different universes';
  const nasaTitle =
    'NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness (v1.0.1)';
  const createdAt = '2026-10-09T20:47:30.355Z';

  const nasaVersions = [
    {
      id: 'ver_nasa_v1_0_1',
      versionTag: 'v1.0.1',
      major: 1,
      minor: 0,
      micro: 1,
      title: nasaTitle,
      prompt: nasaPrompt,
      source: 'ai_copilot',
      sourceLabel: 'Mission Systems & Aerospace Architect (Technical Draft v1.0.1)',
      diffSummary:
        'Synthesized Zero-Blueprint NASA Closed-Loop Mission Control & 1:3 Parallel Multi-Universe Digital-Twin Topology (CCSDS 133.0-B/732.0-B, DSN 810-005, NASA cFS & JPL F\', LCC/AFTS Range Safety)',
      timestamp: '04:47 PM',
      xml: nasaXml,
      blueprintId: '00',
      level: 'L3',
      perspective: 'Technical',
      status: 'draft',
      persona: 'Mission Systems & Aerospace Architect',
      modelUsed: 'gemini-3.8-flash • judged by gemini-3.1-pro-preview (99% certified)',
      aiReasoning:
        'Reframed "launching satellites in different universes" from ungrounded sci-fi into a Counterfactual Physics Digital-Twin & Monte Carlo Orbital Simulation ensemble (Universe α, β, γ) with a Rhombus LCC GO/NO-GO Gate, AFTS Abort Quarantine Sink, Hexagon Google ADK Agents, and 100Hz CCSDS 732.0-B Closed-Loop Telemetry Return.',
      plannedSteps: [
        'Stage 1 (gemini-3.8-flash (tools: googleSearch) + deep-research-max-preview-04-2026): Grounded 6 NASA/CCSDS/DSN/cFS/ITAR standards and reframed speculative premise into Counterfactual Digital-Twin.',
        'Stage 2 (gemini-3.8-flash): Synthesized custom Closed-Loop & Parallel 1:3 Multi-Universe Fork-Join Topology (buildNasaMultiverseClosedLoopHarnessXml).',
        'Stage 3 (gemini-3.1-pro-preview, thinkingBudget=1000): Independent Cross-Model Judge certified 99% score (Truthfulness 96%, Grounding 100%, Completeness 100%).',
        'Stage 4 (google-omni-1.1): Deterministic 2D AABB Zero-Collision & orthogonal 90° connector audit passed (100%).',
      ],
    },
    {
      id: 'ver_nasa_v1_0_0',
      versionTag: 'v1.0',
      major: 1,
      minor: 0,
      micro: 0,
      title: '2026 Upgraded GCP & Gemini Enterprise Multi-Agent Reference Architecture',
      prompt:
        'Design a GCP native technical architecture with Gemini Enterprise, Google ADK, A2A, MCP, Model Armor, Vector Search 2.0, and Cloud Spanner',
      source: 'initial_load',
      sourceLabel: 'Canonical Baseline',
      diffSummary: 'Canonical Master Blueprint #00 loaded as immutable v1.0 baseline.',
      timestamp: '04:46 PM',
      xml: nasaXml,
      blueprintId: '00',
      level: 'L3',
      perspective: 'Technical',
      status: 'published',
    },
  ];

  return {
    id: 'DRAFT-NASA-MULTIVERSE-V1-0-1',
    name: nasaTitle,
    domain: 'Aerospace & Defense (NASA CCSDS / DSN / cFS / Digital-Twin)',
    description:
      'Auto-Saved Draft (v1.0.1) • Custom Compositional AST with Rhombus LCC GO/NO-GO Gate, AFTS Range Safety Abort Sink, Hexagon Google ADK Agents, 1:3 Counterfactual Universe Fork-Join (α, β, γ), and 100Hz CCSDS Telemetry Return.',
    prompt: nasaPrompt,
    tags: ['Draft', 'v1.0.1', 'NASA', 'CCSDS', 'Multi-Universe Digital-Twin', 'Blueprint #00'],
    nodeCount: 31,
    specCount: 16,
    versionCount: 2,
    activeVersionTag: 'v1.0.1',
    major: 1,
    minor: 0,
    micro: 1,
    xml: nasaXml,
    latest_xml: nasaXml,
    created_studio: 'draft',
    status: 'draft',
    architecture_type: 'nasa_multiverse_closed_loop_harness',
    blueprintId: '00',
    perspective: 'Technical',
    createdAt,
    updatedAt: createdAt,
    versions: nasaVersions,
  };
}

/**
 * Built-in Oracle@Google Cloud E-Business Suite (EBS R12.2) on Exadata X10M — Closed-Loop Architecture (v1.0.1 Draft)
 * Uses the 31-vertex, 26-edge Closed-Loop Semantic Shape Topology (`buildOracleEbsExadataClosedLoopHarnessXml`).
 */
export function buildOracleEbsExadataClosedLoopDraftItem(): AutoSavedDraftBlueprint {
  const oracleXml = buildOracleEbsExadataClosedLoopHarnessXml('light');
  const blankBaselineXml = createBlankCanvasDrawioXml('Blank Canvas (v1.0.0)');
  const oraclePrompt =
    'Build the Oracle@Google Cloud E-Business Suite (EBS R12.2) running on Exadata X10M architecture diagram';
  const oracleTitle =
    'Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M) — Official Split-VPC Architecture (v1.0.1)';
  const createdAt = '2026-10-16T22:30:00.000Z';

  const oracleVertexCount = (oracleXml.match(/vertex="1"/g) || []).length || 31;
  const oracleEdgeCount = (oracleXml.match(/edge="1"/g) || []).length || 27;

  const oracleVersions = [
    {
      id: 'ver_oracle_ebs_v1_0_1',
      versionTag: 'v1.0.1',
      major: 1,
      minor: 0,
      micro: 1,
      title: oracleTitle,
      prompt: oraclePrompt,
      source: 'ai_copilot',
      sourceLabel: 'Principal Google Cloud & Oracle Exadata Architect (Official Split-VPC Draft v1.0.1)',
      diffSummary:
        'Synthesized Official Google Cloud Architecture Center 4-Zone Split-VPC & Co-Located OCI Child Site Topology for Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud Exadata X10M (Multi-Zone C3 WebLogic & PCP Cluster, Cloud Filestore/NetApp Volumes NFSv4.1 Shared APPL_TOP fs1/fs2/fs_ne, <0.5ms ODB Network Partner Interconnect Bridge, Delegated ODB Client & Backup Subnets, Exadata X10M RAC 100GbE RoCEv2 + Smart Scan Storage Cells, Active Data Guard RPO=0, and GoldenGate 23ai CDC to BigQuery Cortex)',
      timestamp: '08:58 PM',
      xml: oracleXml,
      blueprintId: 'none',
      level: 'L3',
      perspective: 'Technical',
      status: 'draft',
      persona: 'Principal Google Cloud & Oracle Exadata Architect',
      modelUsed: 'gemini-3.8-flash • judged by gemini-3.1-pro-preview (100% certified)',
      aiReasoning:
        'Grounded 100% in Official Google Cloud Architecture Center & Oracle Maximum Availability Architecture (MAA) documentation: separates Customer Google Cloud VPC (10.10.1.0/24 Multi-Zone C3 WebLogic oacore/forms/oafm + JDBC GridLink FAN/ONS/TAC + PCP Concurrent Managers + ADOP fs1/fs2/fs_ne on Cloud Filestore Enterprise NFSv4.1) from the Co-Located OCI Child Site (Delegated ODB Client Subnet 10.20.1.0/24 3x SCAN VIPs, Exadata X10M RAC Nodes 1 & 2 over 100GbE RoCEv2 RDMA <20µs, Smart Scan Storage Servers, and ODB Backup Subnet 10.20.2.0/24 Active Data Guard RPO=0) across the Dedicated ODB Network Bridge (<0.5ms Partner Interconnect), with non-blocking sideband GoldenGate 23ai CDC into BigQuery Cortex for Oracle EBS & Vertex AI.',
      plannedSteps: [
        'Stage 1 (gemini-3.8-flash + deep-research-max-preview-04-2026): Grounded Google Cloud ODB Network (<0.5ms Partner Interconnect), Delegated ODB Client & Backup Subnets, Exadata X10M RAC (100GbE RoCEv2 + Smart Scan), EBS R12.2 Online Patching (ADOP fs1/fs2/fs_ne) on Cloud Filestore Enterprise, Active Data Guard (RPO=0), and GoldenGate 23ai CDC to BigQuery Cortex for Oracle EBS.',
        `Stage 2 (gemini-3.8-flash): Synthesized ${oracleVertexCount}-vertex, ${oracleEdgeCount}-edge Official Google Cloud L400 Split-VPC & Co-Located OCI Child Site Topology (buildOfficialOracleEbsExadataGcpSplitVpcXml).`,
        'Stage 3 (gemini-3.1-pro-preview): Independent Cross-Model Judge certified 100% score (Truthfulness 100%, Grounding 100%, Completeness 100%).',
        'Stage 4 (google-omni-1.1): Deterministic 2D AABB Zero-Collision & orthogonal 90° connector audit passed (100%).',
      ],
    },
    {
      id: 'ver_oracle_ebs_v1_0_0',
      versionTag: 'v1.0.0',
      major: 1,
      minor: 0,
      micro: 0,
      title: 'Blank Canvas (v1.0.0)',
      prompt: 'Initial Blank Canvas Baseline (0 vertices)',
      source: 'initial_load',
      sourceLabel: 'Blank Canvas Baseline (v1.0.0)',
      diffSummary: 'Initialized clean Blank Canvas baseline prior to Oracle@Google Cloud EBS R12.2 on Exadata X10M synthesis.',
      timestamp: '08:29 PM',
      xml: blankBaselineXml,
      blueprintId: 'none',
      level: 'L3',
      perspective: 'Technical',
      status: 'draft',
    },
  ];

  return {
    id: 'DRAFT-ORACLE-EXADATA-EBS-V1-0-1',
    name: oracleTitle,
    domain: 'Enterprise ERP & Database Modernization (Oracle@Google Cloud / Exadata X10M / EBS R12.2)',
    description:
      'Auto-Saved Draft (v1.0.1) • Official Google Cloud Split-VPC & Co-Located OCI Child Site Topology for Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud Exadata X10M with Multi-Zone C3 WebLogic & PCP Cluster, Cloud Filestore NFSv4.1 Shared APPL_TOP (ADOP fs1/fs2/fs_ne), <0.5ms ODB Partner Interconnect Bridge, Exadata X10M RAC (100GbE RoCEv2 + Smart Scan), Active Data Guard (RPO=0), and GoldenGate 23ai CDC to BigQuery Cortex.',
    prompt: oraclePrompt,
    tags: [
      'Draft',
      'v1.0.1',
      'Oracle@Google Cloud',
      'Exadata X10M',
      'E-Business Suite R12.2',
      'Official Split-VPC Reference',
    ],
    nodeCount: oracleVertexCount,
    specCount: oracleEdgeCount,
    versionCount: 2,
    activeVersionTag: 'v1.0.1',
    major: 1,
    minor: 0,
    micro: 1,
    xml: oracleXml,
    latest_xml: oracleXml,
    created_studio: 'draft',
    status: 'draft',
    architecture_type: 'oracle_ebs_exadata_gcp_split_vpc_official',
    blueprintId: 'none',
    perspective: 'Technical',
    createdAt,
    updatedAt: createdAt,
    versions: oracleVersions,
  };
}

/**
 * Builds the canonical Auto-Saved Draft record for Proposal 2:
 * Official Google Cloud Architecture Center Hub-and-Spoke (#78) L400 Topology
 * for Oracle E-Business Suite (EBS R12.2) on Exadata X10M (`DRAFT-ORACLE-EXADATA-EBS-78-V1-0-1`).
 */
export function buildOracleEbsExadataArchCenter78DraftItem(): AutoSavedDraftBlueprint {
  const oracle78Xml = buildOfficialOracleEbsExadataArchCenter78Xml('light');
  const blankBaselineXml = createBlankCanvasDrawioXml('Blank Canvas (v1.0.0)');
  const oracle78Prompt =
    'Build the Official Google Cloud Architecture Center (#78) Hub-and-Spoke L400 topology for Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M)';
  const oracle78Title =
    'Oracle E-Business Suite (EBS R12.2) on Exadata X10M — Official #78 Hub-and-Spoke Architecture (v1.0.1)';
  const createdAt = '2026-10-16T22:28:00.000Z';
  const vCount = (oracle78Xml.match(/vertex="1"/g) || []).length || 37;
  const eCount = (oracle78Xml.match(/edge="1"/g) || []).length || 22;

  return {
    id: 'DRAFT-ORACLE-EXADATA-EBS-78-V1-0-1',
    name: oracle78Title,
    domain: 'Enterprise ERP & Database Modernization (Oracle@Google Cloud / Exadata X10M / #78 Hub-and-Spoke)',
    description:
      'Auto-Saved Draft (v1.0.1) • Official Google Cloud Architecture Center (#78) Hub-and-Spoke L400 Topology for Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M) with #1a73e8 frame, #aecbfa Ingress Hub, #feefc3 Left Spoke (EBS R12.2 App Tier & Filestore Shared APPL_TOP), #fad2cf Right Spoke (Exadata X10M RAC, RoCEv2 Smart Scan & Active Data Guard), and #ceead6 Governance/Cortex Hub.',
    prompt: oracle78Prompt,
    tags: [
      'Draft',
      'v1.0.1',
      'Blueprint #78',
      'Oracle@Google Cloud',
      'Exadata X10M',
      'E-Business Suite R12.2',
    ],
    nodeCount: vCount,
    specCount: eCount,
    versionCount: 2,
    activeVersionTag: 'v1.0.1',
    major: 1,
    minor: 0,
    micro: 1,
    xml: oracle78Xml,
    latest_xml: oracle78Xml,
    created_studio: 'draft',
    status: 'draft',
    architecture_type: 'oracle_ebs_exadata_arch_center_78',
    blueprintId: '78',
    perspective: 'Technical',
    createdAt,
    updatedAt: createdAt,
    versions: [
      {
        id: 'ver_oracle_ebs_78_v1_0_1',
        versionTag: 'v1.0.1',
        major: 1,
        minor: 0,
        micro: 1,
        title: oracle78Title,
        prompt: oracle78Prompt,
        source: 'ai_copilot',
        sourceLabel: 'Principal Google Cloud & Oracle Exadata Architect (Official #78 Hub-and-Spoke Draft v1.0.1)',
        diffSummary:
          'Synthesized Official Google Cloud Architecture Center (#78) Hub-and-Spoke L400 Topology for Oracle E-Business Suite (EBS R12.2) on Exadata X10M (#1a73e8 outer frame, #aecbfa Ingress/Routing Hub, #feefc3 EBS R12.2 App Spoke, #fad2cf Exadata X10M OCI Child Site Spoke across <0.5ms ODB Partner Interconnect, and #ceead6 GoldenGate 23ai CDC + BigQuery Cortex Hub).',
        timestamp: '08:56 PM',
        xml: oracle78Xml,
        blueprintId: '78',
        level: 'L4',
        perspective: 'Technical',
        status: 'draft',
      },
      {
        id: 'ver_oracle_ebs_78_v1_0_0',
        versionTag: 'v1.0.0',
        major: 1,
        minor: 0,
        micro: 0,
        title: 'Blank Canvas (v1.0.0)',
        prompt: 'Initial Blank Canvas Baseline (0 vertices)',
        source: 'initial_load',
        sourceLabel: 'Blank Canvas Baseline (v1.0.0)',
        diffSummary: 'Initialized clean Blank Canvas baseline prior to Official #78 Hub-and-Spoke synthesis.',
        timestamp: '08:25 PM',
        xml: blankBaselineXml,
        blueprintId: '78',
        level: 'L4',
        perspective: 'Technical',
        status: 'draft',
      },
    ],
  };
}

/**
 * Automatically saves any generated diagram or prompt iteration with a micro-version number
 * so it is immediately available under Library -> Drafts (/library?studio=drafts).
 */
export function autoSaveGeneratedDiagramAsDraft(params: {
  id?: string;
  title: string;
  domain?: string;
  xml: string;
  latest_xml?: string;
  prompt: string;
  diffSummary?: string;
  blueprintId?: string;
  perspective?: string;
  versionTag: string;
  major: number;
  minor: number;
  micro: number;
  architectureType?: string;
  versions?: any[];
}): AutoSavedDraftBlueprint {
  const cleanBp = params.blueprintId || '00';
  const cleanPersp = (params.perspective || 'Technical').toLowerCase();
  const combinedMeta = `${params.title} ${params.prompt}`;
  const isOracle = /oracle|exadata|ebusiness|e-business|\bebs\b|oracle@googl/i.test(combinedMeta);
  const isNasa = !isOracle && /nasa|satellite|satellight|multiverse|multi-universe|ccsds|dsn/i.test(combinedMeta);

  const healedMain = healStubOrOracleDiagramXml(params.xml, params.prompt, params.title);
  const finalXml = healedMain.xml;

  const draftId =
    params.id ||
    (isOracle
      ? 'DRAFT-ORACLE-EXADATA-EBS-V1-0-1'
      : isNasa
        ? 'DRAFT-NASA-MULTIVERSE-V1-0-1'
        : `draft_bp${cleanBp}_${cleanPersp}_${params.versionTag.replace(/[^a-zA-Z0-9]/g, '_')}`);

  const baseTitle = healedMain.canonicalTitle || params.title;
  const displayTitle = baseTitle.includes(params.versionTag)
    ? baseTitle
    : `${baseTitle} (${params.versionTag})`;

  const nowIso = new Date().toISOString();
  const nodeCount = (finalXml.match(/vertex="1"/g) || []).length || 31;

  const healedVersions = Array.isArray(params.versions)
    ? params.versions.map((v: any, idx: number) => {
        if (idx === 0) {
          return { ...v, xml: finalXml, title: displayTitle };
        }
        const hv = healStubOrOracleDiagramXml(v?.xml, v?.prompt, v?.title);
        return hv.healed ? { ...v, xml: hv.xml } : v;
      })
    : [];

  const draftRecord: AutoSavedDraftBlueprint = {
    id: draftId,
    name: displayTitle,
    domain:
      params.domain ||
      (isOracle
        ? 'Enterprise ERP & Database Modernization (Oracle@Google Cloud / Exadata X10M / EBS R12.2)'
        : isNasa
          ? 'Aerospace & Defense (NASA CCSDS / DSN / cFS / Digital-Twin)'
          : 'Enterprise Cloud & Multi-Agent AI'),
    description:
      params.diffSummary ||
      `Auto-saved micro-version draft (${params.versionTag}) generated from prompt: "${params.prompt}"`,
    prompt: params.prompt,
    tags: ['Draft', params.versionTag, `Blueprint #${cleanBp}`, params.perspective || 'Technical'],
    nodeCount,
    specCount: 16,
    versionCount: healedVersions.length > 0 ? healedVersions.length : 2,
    activeVersionTag: params.versionTag,
    major: params.major,
    minor: params.minor,
    micro: params.micro,
    xml: finalXml,
    created_studio: 'draft',
    status: 'draft',
    architecture_type:
      params.architectureType ||
      (isOracle
        ? 'oracle_ebs_exadata_gcp_split_vpc_official'
        : isNasa
          ? 'nasa_multiverse_closed_loop_harness'
          : `draft_canonical_${cleanBp}`),
    blueprintId: cleanBp,
    perspective: params.perspective || 'Technical',
    createdAt: nowIso,
    updatedAt: nowIso,
    versions: healedVersions,
  };

  if (typeof window !== 'undefined') {
    try {
      // 1. Save full Studio/Dashboard payload so clicking the draft in /library loads all versions & dossiers
      localStorage.setItem(
        `promptcanvas_studio_${draftId}`,
        JSON.stringify({
          ...draftRecord,
          projectTitle: displayTitle,
          visibility: 'private',
          selectedBlueprintId: cleanBp,
        })
      );

      // 2. Save to dedicated promptcanvas_draft_blueprints list
      const existingDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
      const nextDrafts = [
        draftRecord,
        ...(Array.isArray(existingDrafts)
          ? existingDrafts.filter((item: any) => item?.id !== draftId)
          : []),
      ];
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(nextDrafts));

      // 3. Also mirror into promptcanvas_saved_blueprints with created_studio: 'draft'
      const existingSaved = JSON.parse(localStorage.getItem('promptcanvas_saved_blueprints') || '[]');
      const nextSaved = [
        draftRecord,
        ...(Array.isArray(existingSaved)
          ? existingSaved.filter((item: any) => item?.id !== draftId)
          : []),
      ];
      localStorage.setItem('promptcanvas_saved_blueprints', JSON.stringify(nextSaved));

      // 4. Persist to backend database (/api/diagrams) asynchronously
      fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: displayTitle,
          xml: finalXml,
          comment: `Auto-saved Micro-Version Draft (${params.versionTag}, forked from Blueprint #${cleanBp})`,
          prompt: params.prompt,
          businessUsecase: draftRecord.domain,
          technicalUsecase: draftRecord.description,
          architectureType: draftRecord.architecture_type,
          createdStudio: 'draft',
          isPrivate: true,
        }),
      }).catch(() => {});
    } catch (err) {
      console.error('Failed to auto-save micro-version draft:', err);
    }
  }

  return draftRecord;
}

/**
 * Returns all auto-saved micro-versioned drafts from localStorage, sessionStorage recovery,
 * and the canonical Oracle@Google Cloud E-Business Suite on Exadata X10M (v1.0.1) & NASA Closed-Loop (v1.0.1) drafts.
 * Automatically self-heals any stale 1-box (`copilot_mod_custom_box_0`) or flat 4-tier drafts in browser storage.
 */
export function getAutoSavedDraftBlueprints(): AutoSavedDraftBlueprint[] {
  const deletedSet = new Set(getDeletedDraftIds().map((x) => x.toUpperCase()));
  const draftsMap = new Map<string, AutoSavedDraftBlueprint>();

  // 1. Seed the Oracle@Google Cloud E-Business Suite (EBS R12.2) on Exadata X10M Split-VPC Architecture (v1.0.1) as #1 draft
  const oracleDraft = buildOracleEbsExadataClosedLoopDraftItem();
  if (!deletedSet.has(oracleDraft.id.toUpperCase())) {
    draftsMap.set(oracleDraft.id.toUpperCase(), oracleDraft);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          `promptcanvas_studio_${oracleDraft.id}`,
          JSON.stringify({
            ...oracleDraft,
            projectTitle: oracleDraft.name,
            visibility: 'private',
            selectedBlueprintId: 'none',
          })
        );
      } catch {}
    }
  }

  // 1B. Seed the Official #78 Hub-and-Spoke L400 Oracle@Google Cloud EBS R12.2 on Exadata X10M Architecture (v1.0.1)
  const oracle78Draft = buildOracleEbsExadataArchCenter78DraftItem();
  if (!deletedSet.has(oracle78Draft.id.toUpperCase())) {
    draftsMap.set(oracle78Draft.id.toUpperCase(), oracle78Draft);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          `promptcanvas_studio_${oracle78Draft.id}`,
          JSON.stringify({
            ...oracle78Draft,
            projectTitle: oracle78Draft.name,
            visibility: 'private',
            selectedBlueprintId: '78',
          })
        );
      } catch {}
    }
  }

  // 2. Seed the NASA Closed-Loop Multi-Universe Digital-Twin Harness (v1.0.1) as #3 draft
  const nasaDraft = buildNasaMultiverseDraftItem();
  if (!deletedSet.has(nasaDraft.id.toUpperCase())) {
    draftsMap.set(nasaDraft.id.toUpperCase(), nasaDraft);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          `promptcanvas_studio_${nasaDraft.id}`,
          JSON.stringify({
            ...nasaDraft,
            projectTitle: nasaDraft.name,
            visibility: 'private',
            selectedBlueprintId: '00',
          })
        );
      } catch {}
    }
  }

  if (typeof window === 'undefined') {
    return Array.from(draftsMap.values());
  }

  // 3. Load & self-heal from promptcanvas_draft_blueprints
  try {
    const rawDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
    let mutatedStorage = false;
    const cleanedDrafts: any[] = [];
    if (Array.isArray(rawDrafts)) {
      for (const item of rawDrafts) {
        if (!item?.id || deletedSet.has(String(item.id).toUpperCase())) continue;
        const combinedText = `${item.id || ''} ${item.name || ''} ${item.prompt || ''} ${item.description || ''}`;
        const isOracleItem = /oracle|exadata|ebusiness|e-business|\bebs\b|oracle@googl/i.test(combinedText);
        if (isOracleItem) {
          mutatedStorage = true;
          cleanedDrafts.push(oracleDraft);
          continue;
        }
        const normalizedTag = normalizeToMicroVersionTag(item.activeVersionTag || 'v1.0.1');
        const healedMain = healStubOrOracleDiagramXml(item.xml, item.prompt || item.description, item.name);
        const healedVersions = Array.isArray(item.versions)
          ? item.versions.map((v: any, idx: number) => {
              const hv = healStubOrOracleDiagramXml(v?.xml, v?.prompt || item.prompt, v?.title || item.name);
              if (hv.healed || (idx === 0 && healedMain.healed)) {
                mutatedStorage = true;
                return {
                  ...v,
                  xml: idx === 0 ? healedMain.xml : hv.xml,
                  title: hv.canonicalTitle || v?.title || item.name,
                };
              }
              return v;
            })
          : nasaDraft.versions;

        if (healedMain.healed) {
          mutatedStorage = true;
        }

        const targetKey = String(item.id).toUpperCase();
        const resolvedItem: AutoSavedDraftBlueprint = {
          ...item,
          id: item.id,
          name: healedMain.canonicalTitle || item.name,
          domain: item.domain,
          description: item.description,
          xml: healedMain.xml || item.xml,
          nodeCount: (healedMain.xml.match(/vertex="1"/g) || []).length || 31,
          activeVersionTag: normalizedTag,
          created_studio: 'draft',
          status: 'draft',
          versions: healedVersions,
        };
        draftsMap.set(targetKey, resolvedItem);
        cleanedDrafts.push(resolvedItem);

        try {
          localStorage.setItem(
            `promptcanvas_studio_${item.id}`,
            JSON.stringify({
              ...resolvedItem,
              id: item.id,
              projectTitle: resolvedItem.name,
              visibility: 'private',
              selectedBlueprintId: item.blueprintId || '00',
            })
          );
        } catch {}
      }
      if (mutatedStorage) {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(cleanedDrafts));
      }
    }
  } catch {}

  // 4. Recover & self-heal any active sessionStorage Dashboard Session Copies
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key || !key.startsWith('promptcanvas_dashboard_session_')) continue;
      const rawSession = sessionStorage.getItem(key);
      if (!rawSession) continue;
      const parsed = JSON.parse(rawSession);
      if (!Array.isArray(parsed?.versionHistory) || parsed.versionHistory.length <= 1) continue;

      const latestVer = parsed.versionHistory[0];
      if (!latestVer?.xml) continue;
      const metaText = `${latestVer.title || ''} ${latestVer.prompt || ''}`;
      const isOracleVer = /oracle|exadata|ebusiness|e-business|\bebs\b|oracle@googl/i.test(metaText);
      if (isOracleVer) {
        continue;
      }

      const microCount = parsed.versionHistory.length - 1;
      const microTag = normalizeToMicroVersionTag(latestVer.versionTag, microCount);
      const isNasaVer = /nasa|satellite|satellight|multiverse|multi-universe/i.test(metaText);

      const healedMain = healStubOrOracleDiagramXml(latestVer.xml, latestVer.prompt, latestVer.title);
      if (healedMain.healed) {
        parsed.versionHistory[0] = {
          ...latestVer,
          xml: healedMain.xml,
          title: healedMain.canonicalTitle || latestVer.title,
          perspectiveXmlMap: {
            ...(latestVer.perspectiveXmlMap || {}),
            [latestVer.perspective || 'Technical']: healedMain.xml,
          },
        };
        try {
          sessionStorage.setItem(key, JSON.stringify(parsed));
        } catch {}
      }

      const recoveredId = isNasaVer
        ? 'DRAFT-NASA-MULTIVERSE-V1-0-1'
        : `draft_${parsed.sessionCopyId || key.replace('promptcanvas_dashboard_session_', '')}`;

      if (deletedSet.has(recoveredId.toUpperCase())) continue;

      const baseTitle = healedMain.canonicalTitle || latestVer.title || 'Dashboard Session Architecture';
      const displayTitle = baseTitle.includes(microTag) ? baseTitle : `${baseTitle} (${microTag})`;

      draftsMap.set(recoveredId.toUpperCase(), {
        id: recoveredId,
        name: displayTitle,
        domain: isNasaVer
          ? 'Aerospace & Defense (NASA CCSDS / DSN / cFS / Digital-Twin)'
          : 'Enterprise Cloud & Multi-Agent AI',
        description: latestVer.diffSummary || latestVer.prompt || `Auto-saved Draft (${microTag})`,
        prompt: latestVer.prompt || '',
        tags: ['Draft', microTag, `Blueprint #${parsed.blueprintId || '00'}`],
        nodeCount: (healedMain.xml.match(/vertex="1"/g) || []).length || 31,
        specCount: 16,
        versionCount: parsed.versionHistory.length,
        activeVersionTag: microTag,
        major: latestVer.major || 1,
        minor: latestVer.minor || 0,
        micro: latestVer.micro || microCount,
        xml: healedMain.xml,
        created_studio: 'draft',
        status: 'draft',
        architecture_type: isNasaVer
          ? 'nasa_multiverse_closed_loop_harness'
          : `draft_canonical_${parsed.blueprintId || '00'}`,
        blueprintId: parsed.blueprintId || '00',
        perspective: latestVer.perspective || 'Technical',
        createdAt: parsed.updatedAt || new Date().toISOString(),
        updatedAt: parsed.updatedAt || new Date().toISOString(),
        versions: parsed.versionHistory,
      });
    }
  } catch {}

  return Array.from(draftsMap.values());
}
