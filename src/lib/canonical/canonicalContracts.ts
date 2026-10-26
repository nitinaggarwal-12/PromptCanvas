/**
 * Machine-Readable Canonical Architecture Contracts for the 22 Production Blueprints
 * (7 Core Google Cloud Architecture/Flow Blueprints #78, #79, #81, #84, #00, #67, #69 + 15 Infographic Blueprints #52–#66)
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
  },
  '79': {
    id: '79',
    grammar: 'L400 Deployment & Network Spec — Multi-Tenant Agentic Hub-and-Spoke (GCP us-central1 • VPC-SC)',
    family: 'Reference Architectures',
    level: ['L3'],
    semanticQuestion: 'How are subnet CIDRs, BGP ASN 64512 routing, Cloud Armor WAF policies, PSC endpoints, and VPC-SC perimeters configured across the shared control hub and isolated tenant spokes?',
    requiredElements: ['10.100.0.0/16', '64512', 'p-finvault-silo', '10.110.0.0/20', '10.200.0.0/20'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['tls-ingress', 'mtls-grpc', 'psc-attachment', 'force-rls'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_79.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  },
  '81': {
    id: '81',
    grammar: '[L400 PRINCIPAL SEQUENCE] OIDC JWT, SPIFFE mTLS, FW & VPC-SC (P3-APP-L-10)',
    family: 'Flow',
    level: ['L3'],
    semanticQuestion: 'How do User/Requestor, Gemini Enterprise, Coordinator Agent, Agent Gateway, Retrieval Specialist, Analytics Specialist, and Enterprise Data & Tools execute 16 governed sequence interactions across A2A and MCP boundaries?',
    requiredElements: ['p3-app-l-10', 'coordinator agent', 'agent gateway', 'retrieval specialist', 'analytics specialist'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['a2a-delegation', 'mcp-tool-call', 'hitl-approval', 'audit-telemetry'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_81.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  },
  '84': {
    id: '84',
    grammar: 'Google Cloud Architecture Center #78 (L400) — Oracle E-Business Suite (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M)',
    family: 'Reference Architectures',
    level: ['L3'],
    semanticQuestion: 'How does Oracle E-Business Suite R12.2 run on Google Cloud C3 HA WebLogic & Cloud Filestore Enterprise NFSv4.1 (Zone 1) connected over <0.5ms Dual 100GbE ODB Partner Interconnect to Co-Located OCI Child Site Exadata X10M 2-Node RAC & Smart Scan (Zone 2)?',
    requiredElements: ['ebs r12.2', 'exadata x10M', 'weblogic', 'filestore', 'goldengate'],
    forbiddenElements: ['unconnected-edges', 'overlapping-cards'],
    edgeTypes: ['https-ingress', 'odb-interconnect', 'sqlnet-1521', 'rocev2-rdma'],
    iconPolicy: 'authentic-brand',
    sourceImage: 'canonical_84.png',
    generatorVersion: '4.0',
    certificationStatus: 'certified'
  }
};



