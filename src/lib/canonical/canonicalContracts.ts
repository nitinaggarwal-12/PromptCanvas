/**
 * Machine-Readable Canonical Architecture Contracts for the 23 Production Blueprints
 * (8 Core Google Cloud Architecture/Flow Blueprints #78, #00, #38, #42, #44, #67, #68, #69 + 15 Infographic Blueprints #52–#66)
 * Enforces strict semantic boundaries, required elements, forbidden antipatterns,
 * exact reference geometry, PNG aspect-ratio locks, and fail-closed QA certification.
 */
import { INFOGRAPHIC_BLUEPRINTS_LIST } from './infographicBlueprints52to66';

export interface ReferenceGeometryContract {
  pageWidth: number;
  pageHeight: number;
  aspectRatio: number; // pageWidth / pageHeight
  exactIconCount?: number;
  minIconCount?: number;
  requiredCellIds: string[];
  forbiddenCellIds: string[];
  requiredSubstrings: string[];
  forbiddenSubstrings: string[];
  /** Pairs of [earlierCellId, laterCellId] enforcing XML DOM painting order */
  domOrderPairs?: [string, string][];
}

export interface CanonicalContract {
  id: string;
  grammar: string;
  family: 'Infographic' | 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning' | 'Reference Architectures';
  level: ('L1' | 'L2' | 'L3')[];
  semanticQuestion: string; // What core architecture question does this grammar answer?
  requiredElements: string[];
  forbiddenElements: string[];
  edgeTypes: string[];
  iconPolicy: 'semantic-vector' | 'authentic-brand' | 'hybrid';
  sourceImage: string;
  generatorVersion: string;
  certificationStatus: 'certified' | 'in_review' | 'pending';
  referenceGeometry?: ReferenceGeometryContract;
}

export const CANONICAL_CONTRACTS: Record<string, CanonicalContract> = {
  '00': {
    id: '00',
    grammar: 'GCP Enterprise Architecture',
    family: 'Reference Architectures',
    level: ['L1', 'L2'],
    semanticQuestion: 'What is the end-to-end multi-tier Google Cloud enterprise topology spanning edge ingress, application mesh, event streaming, Vertex AI, multi-region lakehouse, and zero-trust security?',
    requiredElements: ['edge-ingress', 'cloud-run', 'vertex-ai', 'gemini', 'spanner', 'model-armor'],
    forbiddenElements: ['untyped-connectors', 'crossing-lines-over-text', 'unverified-external-urls'],
    edgeTypes: ['direct-straight-sync', 'cdc-event-stream', 'vertex-rag', 'react-tool-loop', 'lakehouse-sync'],
    iconPolicy: 'authentic-brand',
    sourceImage: '00.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified'
  },
  '38': {
    id: '38',
    grammar: 'Cloud Landing Zone & Enterprise Shared Services',
    family: 'Infrastructure',
    level: ['L1', 'L2', 'L3'],
    semanticQuestion: 'How does an enterprise structure multi-tenant cloud organization hierarchy, landing zone networking, shared services, and FinOps guardrails?',
    requiredElements: ['enterprise-business-units', 'organization-structure-hierarchy', 'identity-access-admin', 'core-landing-zone-network', 'enterprise-shared-services-platform', 'security-risk-compliance', 'data-integration-ai-shared', 'reliability-dr-platform-ops', 'finops-billing-chargeback'],
    forbiddenElements: ['flat-unstructured-cloud-accounts', 'unbounded-admin-privilege'],
    edgeTypes: ['private-data-flow', 'control-mgmt-flow', 'public-flow', 'hybrid-flow', 'policy-guardrails'],
    iconPolicy: 'hybrid',
    sourceImage: '38.png',
    generatorVersion: '1.0',
    certificationStatus: 'certified'
  },
  '42': {
    id: '42',
    grammar: 'Modern Data Lakehouse & Data Mesh',
    family: 'Structure',
    level: ['L1', 'L2', 'L3'],
    semanticQuestion: 'How is an enterprise modern data lakehouse and decentralized data mesh architected across ingestion, compute, storage, governance, data products, and consumption?',
    requiredElements: ['data-sources-layer', 'data-ingestion-layer', 'data-processing-compute-layer', 'lakehouse-storage-layer', 'data-mesh-governance-layer', 'data-product-layer', 'consumption-layer', 'governance-data-management', 'observability-operations', 'platform-operations', 'data-flow-legend'],
    forbiddenElements: ['unmanaged-shadow-data-silos', 'unauthenticated-data-egress'],
    edgeTypes: ['data-flow', 'metadata-control-flow', 'governance-security'],
    iconPolicy: 'hybrid',
    sourceImage: '42.png',
    generatorVersion: '1.0',
    certificationStatus: 'certified'
  },
  '44': {
    id: '44',
    grammar: 'Zero-Trust Cybersecurity & SOC Platform',
    family: 'Security & Governance',
    level: ['L1', 'L2', 'L3'],
    semanticQuestion: 'How is an enterprise zero-trust cybersecurity and SecOps platform architected across consumption, access verification, threat detection, security controls, telemetry, connectivity, infrastructure, and SOC operations?',
    requiredElements: ['consumption-layer', 'zero-trust-access-layer', 'threat-detection-response-layer', 'security-controls-layer', 'visibility-telemetry-layer', 'secure-connectivity-layer', 'asset-infrastructure-layer', 'google-cloud-security-foundation', 'governance-risk-compliance', 'security-operations-soc', 'platform-operations', 'data-flow-legend', 'zero-trust-principles'],
    forbiddenElements: ['implicit-trust-zones', 'unencrypted-data-transit'],
    edgeTypes: ['telemetry-logs-events', 'control-policy-config', 'response-action'],
    iconPolicy: 'hybrid',
    sourceImage: '44.png',
    generatorVersion: '1.0',
    certificationStatus: 'certified'
  },
  '67': {
    id: '67',
    grammar: '7-Stage Synchronous & Asynchronous Agentic Request-Response Flow',
    family: 'Flow',
    level: ['L2', 'L3'],
    semanticQuestion: 'How do synchronous and asynchronous agentic requests flow across 7 operational layers with Google Cloud Brand Light styling?',
    requiredElements: ['tier_1_tab', 'tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_6_tab', 'tier_7_tab', 'google cloud', 'gemini'],
    forbiddenElements: ['funky-neon-colors', 'unconnected-nodes'],
    edgeTypes: ['sync-request', 'async-callback', 'policy-gate'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_67.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1640,
      pageHeight: 1285,
      aspectRatio: 1640 / 1285,
      minIconCount: 17,
      requiredCellIds: ['header_logo', 'tier_1_tab', 'tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_6_tab', 'tier_7_tab'],
      forbiddenCellIds: [],
      requiredSubstrings: ['Google Cloud', 'Vertex AI', 'Gemini 3.1 Pro', 'Cloud Operations Suite (SRE Hub)'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '68': {
    id: '68',
    grammar: 'Multi-Agent Orchestration, Sub-Agent Routing & Tool Execution Flow',
    family: 'Process',
    level: ['L2', 'L3'],
    semanticQuestion: 'How does a root orchestrator delegate tasks across specialist sub-agents and MCP tool servers?',
    requiredElements: ['tier_1_tab', 'tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_6_tab', 'tier_7_tab', 'google cloud', 'gemini'],
    forbiddenElements: ['funky-neon-colors', 'unconnected-nodes'],
    edgeTypes: ['agent-delegation', 'mcp-tool-call', 'synthesis-return'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_68.png',
    generatorVersion: '3.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1640,
      pageHeight: 1285,
      aspectRatio: 1640 / 1285,
      minIconCount: 17,
      requiredCellIds: ['header_logo', 'tier_1_tab', 'tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_6_tab', 'tier_7_tab'],
      forbiddenCellIds: [],
      requiredSubstrings: ['Google Cloud', 'Vertex AI', 'Gemini 3.1 Pro', 'Cloud Operations Suite (SRE Hub)'],
      forbiddenSubstrings: ['image=data:image/svg+xml;utf8,']
    }
  },
  '69': {
    id: '69',
    grammar: 'Unified 7-Layer Enterprise Operational Flowchart (WBS 1.1.0)',
    family: 'Flow',
    level: ['L2', 'L3'],
    semanticQuestion: 'How does the Central Execution Spine route requests from Ingress and Apigee Gateway through GKE Orchestrator, Vertex AI Gemini 3.1 Pro, Redis Cache, Pub/Sub Mesh, Async Agents, Persistence, and the Enterprise SRE Observability Hub?',
    requiredElements: ['tier_2_tab', 'tier_3_tab', 'tier_4_tab', 'tier_5_tab', 'tier_7_tab', 'google cloud', 'gemini'],
    forbiddenElements: ['tier_1_tab', 'tier_6_tab', 'icon_node_7a_dlq', 'Cloud Operations Suite (SRE Hub)'],
    edgeTypes: ['sync-request', 'state-persistence', 'async-event-mesh', 'sre-observability'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_69.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified',
    referenceGeometry: {
      pageWidth: 1536,
      pageHeight: 864,
      aspectRatio: 1536 / 864, // 1.7778 (16:9 exact match to 1024x576 reference)
      exactIconCount: 16,
      requiredCellIds: [
        'header_logo',
        'tier_1_frame',
        'tier_2_frame',
        'tier_3_frame',
        'tier_4_frame',
        'tier_5_frame',
        'tier_7_frame',
        'tier_2_tab',
        'tier_3_tab',
        'tier_4_tab',
        'tier_5_tab',
        'tier_7_tab',
        'node_7a_dlq',
        'flow_8_ingest_task',
        'flow_9_embed_request'
      ],
      forbiddenCellIds: ['tier_1_tab', 'tier_6_tab', 'icon_node_7a_dlq'],
      requiredSubstrings: [
        'Unified 7-Layer Enterprise Operational Flowchart (WBS 1.1.0)',
        'ASYNC EVENT BUS &amp;',
        'Dead-Letter Queue (DLQ)',
        'Cloud Operations Suite'
      ],
      forbiddenSubstrings: [
        'Cloud Operations Suite (SRE Hub)',
        'image=data:image/svg+xml;utf8,'
      ],
      domOrderPairs: [['flow_9_embed_request', 'flow_8_ingest_task']]
    }
  },
  ...Object.fromEntries(
    INFOGRAPHIC_BLUEPRINTS_LIST.map((ib) => [
      ib.id,
      {
        id: ib.id,
        grammar: `${ib.shortType} Infographic Blueprint (${ib.name})`,
        family: 'Infographic' as const,
        level: ['L1', 'L2'] as ('L1' | 'L2' | 'L3')[],
        semanticQuestion: ib.subtitle,
        requiredElements: [`infographic_${ib.id}`, 'mxGraphModel'],
        forbiddenElements: ['untyped-connectors', 'crossing-lines-over-text'],
        edgeTypes: ['visual-flow', 'semantic-hierarchy', 'comparison-link'],
        iconPolicy: 'hybrid' as const,
        sourceImage: `canonical_${ib.id}.png`,
        generatorVersion: '3.0',
        certificationStatus: 'certified' as const,
      },
    ])
  ),
  '78': {
    id: '78',
    grammar: 'Official Google Cloud Architecture Center Hub-and-Spoke Blueprint',
    family: 'Reference Architectures',
    level: ['L1', 'L2', 'L3'],
    semanticQuestion: 'How does the official Google Cloud Architecture Center Hub-and-Spoke topology orchestrate routing, central governance, and isolated tenant spokes across 7 numbered causal steps?',
    requiredElements: ['routing', 'security', 'tenant', 'google', 'gemini'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['ingress-request', 'hub-routing', 'spoke-delegation', 'governance-telemetry'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_78.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  }
};

