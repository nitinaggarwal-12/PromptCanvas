/**
 * 🏛️ Vision Blueprint Store & LocalStorage Persistence Engine
 * Guarantees zero-compilation instant rendering for previously compiled or certified blueprints.
 */

import { buildMasterApigeeEnterpriseApiManagementXml } from './masterBuilders/build_master_enterprise_api_management';
import { buildMasterGkeEnterprisePlatformXml } from './masterBuilders/build_master_gke_enterprise_platform';
import { buildMasterEtlEltCdcPipelineXml } from './masterBuilders/build_master_etl_elt_cdc_pipeline';
import { buildMasterGraphragKnowledgeGraphXml } from './masterBuilders/build_master_graphrag_knowledge_graph';
import { buildMasterPharmaGenomicsPipelineXml } from './masterBuilders/build_master_pharma_genomics_pipeline';
import { generateGoogleMultiagentArchitectureXml } from './masterBuilders/build_master_google_multiagent_ai_system';

export interface SavedVisionBlueprint {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  desc?: string;
  xml: string;
  extractedZones: string[];
  componentCount: number;
  summaryText: string;
  isCustom: boolean;
  timestamp: number;
  source: 'cache' | 'precompiled' | 'live';
}

export interface SampleBlueprintDef {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  defaultExtractedZones: string[];
  defaultComponentCount: number;
  defaultSummary: string;
  getPrecompiledXml: () => string;
}

import { getVisionConverted01Xml } from './masterBuilders/build_vision_converted_01';
import { generateTemplate04ValueStreamXml } from './canonical/template04ValueStream';
import { generateTemplate10IntegrationArchXml } from './canonical/template10IntegrationArch';
import { generateTemplate20CiCdPipelineXml } from './canonical/template20CiCdPipeline';
import { generateTemplate35FintechWealthEngineXml } from './canonical/template35FintechWealthEngine';

export const PRECOMPILED_SAMPLE_BLUEPRINTS: SampleBlueprintDef[] = [
  {
    id: 'GCP-MULTIAGENT-01',
    title: 'Google Multiagent AI System',
    category: 'Agentic AI & Orchestration',
    image: '/blueprints/GCP-MULTIAGENT-01_google_multiagent_ai_system.png',
    desc: 'Google Cloud Multiagent AI System Architecture with Coordinator Agent, Sequence & Iterative Refinement Enclaves, ADK, Model Armor, and MCP Integration.',
    defaultExtractedZones: [
      'Application Users & Ingress',
      'Coordinator & Sequence Subagents',
      'Iterative Refinement & Prompt Enhancer',
      'Model Armor & AI Model Runtime',
      'Model Context Protocol (MCP) Clients & Tools'
    ],
    defaultComponentCount: 36,
    defaultSummary: 'Master Architecture Blueprint: Official Google Cloud Multiagent AI System Architecture with Coordinator Agent, Sequence & Iterative Refinement subagent loops, Model Armor, ADK, and Model Context Protocol (MCP) tool integration.',
    getPrecompiledXml: generateGoogleMultiagentArchitectureXml
  },
  {
    id: '01',
    title: 'Bio-Pharma System Context',
    category: 'System Context & Portals',
    image: '/images/01.png',
    desc: 'NOVACURA Bio-Pharma Platform System Context: Vision-decompiled from images/01.png with Gemini 3.1 Pro AST Builder. Includes Internal Business Users, External Ecosystem, Governance & Oversight, Core Platform, Enterprise Systems, and AI Services.',
    defaultExtractedZones: [
      'Internal Business Users',
      'Governance & Oversight',
      'NOVACURA Bio-Pharma Platform',
      'External Ecosystem',
      'Enterprise Systems (Upstream / Downstream)',
      'AI / Knowledge Services'
    ],
    defaultComponentCount: 70,
    defaultSummary: 'Vision-Decompiled Blueprint: Bio-Pharma System Context synthesized directly from images/01.png via Gemini 3.1 Pro 2-pass AST pipeline (53 semantic nodes, 17 typed directional connector edges).',
    getPrecompiledXml: getVisionConverted01Xml
  },
  {
    id: '04',
    title: 'Value Stream Delivery',
    category: 'Value Stream & Lifecycle',
    image: '/images/04.png',
    desc: 'End-to-End Value Delivery from Research to Patient Impact: 5 Value Stages, Activities, Metrics, Flow, and Google Cloud Platform Enablers.',
    defaultExtractedZones: [
      'Value Stages (Research to Patient)',
      'Key Activities & Milestones',
      'Value Metrics & KPIs',
      'Technology Platform (GCP)',
      'Value Outcomes'
    ],
    defaultComponentCount: 38,
    defaultSummary: 'Master Architecture Blueprint: End-to-End Value Delivery from Research to Patient Impact with 5 Lifecycle Stages, KPI Metrics, and GCP Enablers.',
    getPrecompiledXml: () => generateTemplate04ValueStreamXml('biopharma', 'light')
  },
  {
    id: '10',
    title: 'Enterprise Integration Mesh',
    category: 'Integration & Messaging',
    image: '/images/10.png',
    desc: 'Enterprise Integration Backbone: External Systems, Apigee X API Gateway, Pub/Sub Event Streaming, Datastream CDC, and Consumers.',
    defaultExtractedZones: [
      'External Systems & Gateways',
      'API & Service Integration (Apigee X)',
      'Event Integration (Pub/Sub)',
      'Data Integration (Dataflow/CDC)',
      'Integration Consumers & Protocols'
    ],
    defaultComponentCount: 44,
    defaultSummary: 'Master Architecture Blueprint: Enterprise Integration Architecture with Apigee X API Gateway, Pub/Sub Event Streaming, Datastream CDC, and Protocol Standards.',
    getPrecompiledXml: () => generateTemplate10IntegrationArchXml('biopharma', 'light')
  },
  {
    id: '20',
    title: 'DevSecOps CI/CD Pipeline',
    category: 'DevSecOps & Operations',
    image: '/images/20.png',
    desc: 'Enterprise DevSecOps CI/CD Pipeline: Source Trigger, Cloud Build CI, Security & Compliance Gates (SAST/DAST), Artifact Registry, and Progressive Canary Rollout.',
    defaultExtractedZones: [
      'Source Control & Trigger',
      'Continuous Integration & Build',
      'Security & Compliance Gates',
      'Continuous Delivery & Canary Rollout',
      'Production Telemetry & Rollback'
    ],
    defaultComponentCount: 35,
    defaultSummary: 'Master Architecture Blueprint: Enterprise CI/CD Pipeline with Automated Testing, Security Scanners, Container Registry, and Multi-Stage Canary Deployment.',
    getPrecompiledXml: () => generateTemplate20CiCdPipelineXml('biopharma', 'light')
  },
  {
    id: '35',
    title: 'FinTech Autonomous Wealth',
    category: 'FinTech & Financial AI',
    image: '/images/35.png',
    desc: 'Google Cloud FinTech Autonomous Wealth & High-Speed Payments Platform: Experience Layer, Autonomous AI Layer, Trading Ecosystem, and Security Foundation.',
    defaultExtractedZones: [
      'Channels / Experience Layer',
      'Identity & Onboarding',
      'Core Wealth Platform',
      'Autonomous AI Layer',
      'Trading & External Market Ecosystem',
      'Data & Intelligence (Google Cloud)'
    ],
    defaultComponentCount: 36,
    defaultSummary: 'Master Architecture Blueprint: FinTech Autonomous Wealth Engine with Real-Time Risk Analytics, Portfolio Optimization, and Ledger Settlement.',
    getPrecompiledXml: () => generateTemplate35FintechWealthEngineXml('fintech', 'light')
  },
  // Legacy / Additional Master Blueprints for backward compatibility
  {
    id: 'IND-PHARMA-01',
    title: 'Pharma Genomics Pipeline',
    category: 'Healthcare & Life Sciences',
    image: '/blueprints/IND-PHARMA-03_IND-PHARMA-01_pharma_genomics_pipeline.png',
    desc: 'Pharma-Specific Genomics & Drug Discovery Pipeline with Agentic AI, AlphaFold, CMEK, and Gemini Enterprise.',
    defaultExtractedZones: [
      'On-Premises Omics Lake',
      'Google Cloud Ingestion & WGS Pre-Processing',
      'Variant Calling & Clinico-Genomic Warehouse',
      'AlphaFold Protein Prediction & In-Silico Screening'
    ],
    defaultComponentCount: 38,
    defaultSummary: 'Master Architecture Blueprint: Pharma-Specific Genomics & Drug Discovery Pipeline with Agentic AI, AlphaFold Protein Prediction, CMEK Yellow Subnet, and Clinico-Genomic BigQuery Warehouse.',
    getPrecompiledXml: buildMasterPharmaGenomicsPipelineXml
  },
  {
    id: '51',
    title: 'Enterprise API Management',
    category: 'Ingress & Gateway',
    image: '/blueprints/51_enterprise_api_management.png',
    desc: 'Apigee X, Cloud Armor, Global HTTPS Load Balancer, and Private Service Connect.',
    defaultExtractedZones: [
      'Multi-Channel Ingress',
      'Edge Ingress & WAF',
      'Apigee X Gateway Platform',
      'Core Application & Microservices',
      'Security, Governance & Observability Plane'
    ],
    defaultComponentCount: 32,
    defaultSummary: 'Master Architecture Blueprint: Google Cloud Enterprise API Management with Apigee X, Cloud Armor WAF, GKE Enterprise, and Private Service Connect.',
    getPrecompiledXml: buildMasterApigeeEnterpriseApiManagementXml
  },
  {
    id: '52',
    title: 'GKE Enterprise Platform',
    category: 'Compute & Mesh',
    image: '/blueprints/52_gke_enterprise_platform.png',
    desc: 'GKE Autopilot multi-cluster, Anthos Service Mesh, Cloud Armor, and Artifact Registry.',
    defaultExtractedZones: [
      'Global Multi-Cluster Ingress',
      'GKE Autopilot Clusters',
      'Anthos Service Mesh',
      'GitOps & Fleet Management',
      'Binary Authorization & Security'
    ],
    defaultComponentCount: 28,
    defaultSummary: 'Master Architecture Blueprint: GKE Enterprise Multi-Cluster Platform with Anthos Service Mesh, Global Multi-Cluster Ingress, and Cloud Spanner.',
    getPrecompiledXml: buildMasterGkeEnterprisePlatformXml
  },
  {
    id: '54',
    title: 'Real-Time ETL / CDC Pipeline',
    category: 'Data & Event Streams',
    image: '/blueprints/54_etl_elt_cdc_pipeline.png',
    desc: 'Datastream CDC, Pub/Sub event bus, Dataflow stream analytics, and BigQuery lakehouse.',
    defaultExtractedZones: [
      'Operational OLTP Data Sources',
      'Datastream Serverless CDC',
      'Pub/Sub Event Ingestion',
      'Dataflow Stream Analytics',
      'BigQuery Lakehouse & Dataplex'
    ],
    defaultComponentCount: 26,
    defaultSummary: 'Master Architecture Blueprint: Real-Time Event-Driven Streaming ETL/CDC Pipeline with Datastream, Pub/Sub, Dataflow, and BigQuery.',
    getPrecompiledXml: buildMasterEtlEltCdcPipelineXml
  },
  {
    id: '58',
    title: 'GraphRAG Knowledge Engine',
    category: 'AI & Vertex Search',
    image: '/blueprints/58_graphrag_knowledge_graph.png',
    desc: 'Vertex Vector Search (ScaNN), Spanner Graph DDL, Gemini 3.1 Pro embeddings, and Model Armor.',
    defaultExtractedZones: [
      'Multimodal Document Ingestion',
      'Embedding & Entity Extraction',
      'Spanner Graph Database',
      'Vertex Vector Search (ScaNN)',
      'Model Armor Guardrails'
    ],
    defaultComponentCount: 27,
    defaultSummary: 'Master Architecture Blueprint: GraphRAG & Enterprise Knowledge Graph Engine with Spanner Graph, Vertex Vector Search, Gemini 3.1 Pro, and Guardrails.',
    getPrecompiledXml: buildMasterGraphragKnowledgeGraphXml
  }
];

const STORAGE_PREFIX = 'promptcanvas_vision_cache_v2_';
const LAST_ACTIVE_KEY = 'promptcanvas_vision_last_active_id_v2';
const CUSTOM_LIST_KEY = 'promptcanvas_vision_custom_blueprints_v2';

/**
 * Get precompiled fallback for a known sample ID
 */
/**
 * Memoized measured node counts. The hand-authored `defaultComponentCount` values
 * had drifted far from reality (e.g. '04' declared 38 while its generator emits 82
 * vertices, '20' declared 35 vs 151), which made the "Nodes:" readout and the chip
 * badges fiction. Counts are now measured once per blueprint from the real XML.
 */
const componentCountCache = new Map<string, number>();

/** Count the addressable graph elements (vertices + edges) in a Draw.io document. */
export function countDiagramNodes(xml: string): number {
  return (xml.match(/<mxCell[^>]+(?:vertex|edge)="1"/gi) || []).length;
}

/** Measured node count for a certified sample blueprint, memoized per process/tab. */
export function getBlueprintComponentCount(id: string): number {
  const cached = componentCountCache.get(id);
  if (cached !== undefined) return cached;

  const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === id);
  if (!sample) return 0;

  let count = sample.defaultComponentCount;
  try {
    count = countDiagramNodes(sample.getPrecompiledXml());
  } catch (err) {
    console.warn(`[VisionBlueprintStore] Could not measure node count for "${id}":`, err);
  }
  componentCountCache.set(id, count);
  return count;
}

export function getPrecompiledBlueprint(id: string): SavedVisionBlueprint | null {
  const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === id);
  if (!sample) return null;

  const xml = sample.getPrecompiledXml();
  const measured = countDiagramNodes(xml);
  componentCountCache.set(sample.id, measured);

  return {
    id: sample.id,
    title: sample.title,
    category: sample.category,
    imageSrc: sample.image,
    desc: sample.desc,
    xml,
    extractedZones: sample.defaultExtractedZones,
    componentCount: measured,
    summaryText: sample.defaultSummary,
    isCustom: false,
    timestamp: Date.now(),
    source: 'precompiled'
  };
}

/**
 * Retrieve saved blueprint from localStorage or certified precompiled master
 */
export function getSavedVisionBlueprint(id: string): SavedVisionBlueprint | null {
  if (typeof window === 'undefined') return null;

  // 1. First check if user or decompiler has saved a version in localStorage
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.xml) {
        // If this is a certified sample blueprint, verify the cached XML is not a corrupt/blocked artifact
        const sample = PRECOMPILED_SAMPLE_BLUEPRINTS.find(s => s.id === id);
        if (sample && id === '01') {
          if (!parsed.xml.includes('NOVACURA') || !parsed.xml.includes('System Context') || parsed.xml.includes('Value Delivery')) {
            localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
            return getPrecompiledBlueprint(id);
          }
        }
        return {
          ...parsed,
          source: 'cache'
        };
      }
    }
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error reading from localStorage:', err);
  }

  // 2. Fallback to precompiled template if not yet decompiled
  const precompiled = getPrecompiledBlueprint(id);
  if (precompiled) return precompiled;

  // 3. Fallback for multiagent ID aliases
  if (id.toLowerCase().includes('multiagent')) {
    const multiagentMaster = getPrecompiledBlueprint('GCP-MULTIAGENT-01');
    if (multiagentMaster) return multiagentMaster;
  }

  return null;
}

/**
 * Save a newly compiled or imported blueprint into localStorage
 */
export function saveVisionBlueprint(blueprint: SavedVisionBlueprint): void {
  if (typeof window === 'undefined') return;

  // Guard against caching mismatched artifacts for certified master blueprints
  if (blueprint.id === '01' && (!blueprint.xml.includes('NOVACURA') || blueprint.xml.includes('Value Delivery'))) {
    console.warn('[VisionBlueprintStore] Refusing to cache mismatched 01 blueprint artifact.');
    return;
  }

  try {
    // 🛡️ Quota Armor: ensure imageSrc doesn't exceed 50KB in localStorage to avoid QuotaExceededError
    const safeImageSrc = (blueprint.imageSrc && blueprint.imageSrc.startsWith('data:image') && blueprint.imageSrc.length > 50000)
      ? (blueprint.imageSrc.slice(0, 1000) + '...[truncated_for_storage]')
      : blueprint.imageSrc;

    const payload = JSON.stringify({
      ...blueprint,
      imageSrc: safeImageSrc,
      source: 'cache'
    });

    try {
      localStorage.setItem(`${STORAGE_PREFIX}${blueprint.id}`, payload);
    } catch (quotaErr) {
      // Evict older cache entries to recover quota
      console.warn('[VisionBlueprintStore] Quota warning, pruning old vision cache entries...');
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX) && !k.endsWith(blueprint.id)) {
          localStorage.removeItem(k);
        }
      }
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${blueprint.id}`, payload);
      } catch (retryErr) {
        console.warn('[VisionBlueprintStore] Could not persist to localStorage after pruning:', retryErr);
      }
    }

    localStorage.setItem(LAST_ACTIVE_KEY, blueprint.id);

    // If custom, also record in custom blueprints index
    if (blueprint.isCustom) {
      const existing = getCustomVisionBlueprints();
      const updated = [
        { ...blueprint, imageSrc: safeImageSrc },
        ...existing.filter(b => b.id !== blueprint.id)
      ].slice(0, 10); // Keep last 10 custom uploads

      localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error writing to localStorage:', err);
  }
}

/**
 * Get all custom uploaded blueprints saved in localStorage
 */
export function getCustomVisionBlueprints(): SavedVisionBlueprint[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(CUSTOM_LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error reading custom blueprints:', err);
  }

  return [];
}

/**
 * Delete a custom blueprint from localStorage
 */
export function deleteCustomVisionBlueprint(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
    const existing = getCustomVisionBlueprints();
    const updated = existing.filter(b => b.id !== id);
    localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[VisionBlueprintStore] Error deleting custom blueprint:', err);
  }
}

/**
 * Retrieve the last active blueprint ID
 */
export function getLastActiveBlueprintId(): string {
  if (typeof window === 'undefined') return 'GCP-MULTIAGENT-01';

  try {
    const lastId = localStorage.getItem(LAST_ACTIVE_KEY);
    if (lastId) return lastId;
  } catch (err) {
    // Ignore error
  }

  return 'GCP-MULTIAGENT-01';
}
