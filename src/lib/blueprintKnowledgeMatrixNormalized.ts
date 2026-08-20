import {
  BLUEPRINT_KNOWLEDGE_MATRIX as RAW_BLUEPRINT_KNOWLEDGE_MATRIX,
  getBlueprintMetadataById as getRawBlueprintMetadataById,
  PHASE_NAME_OPTIONS,
  DEFAULT_LAYOUT_DIRECTION_OPTIONS,
  SALES_CYCLE_STAGE_OPTIONS,
  LIFECYCLE_PHASE_OPTIONS,
} from './blueprintKnowledgeMatrix';
import type {
  BlueprintKnowledgeItem,
  BlueprintFilterState,
  FacetedFilterResult,
} from './blueprintKnowledgeMatrix';

export type { BlueprintKnowledgeItem, BlueprintFilterState, FacetedFilterResult } from './blueprintKnowledgeMatrix';
export { PHASE_NAME_OPTIONS, DEFAULT_LAYOUT_DIRECTION_OPTIONS, SALES_CYCLE_STAGE_OPTIONS, LIFECYCLE_PHASE_OPTIONS };

/**
 * Batch 1 catalog normalization layer.
 * Metadata-only: does not change blueprint IDs, XML builders, resolver behavior, or live links.
 */

const GLOBAL_TEXT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cloud DLP/g, 'Sensitive Data Protection'],
  [/Dataplex Universal Catalog/g, 'Knowledge Catalog'],
  [/BigLake metastore/gi, 'Lakehouse runtime catalog'],
  [/BigLake Apache Iceberg/gi, 'Lakehouse for Apache Iceberg'],
  [/BigQuery BigLake/gi, 'BigQuery + Lakehouse for Apache Iceberg'],
  [/Google Cloud Serverless for Apache Spark/gi, 'Managed Service for Apache Spark'],
  [/Dataproc Serverless for Spark/gi, 'Managed Service for Apache Spark'],
  [/Cloud Source Repositories/g, 'Secure Source Manager'],
  [/Cloud Source Repos/g, 'Secure Source Manager'],
  [/Vertex AI Quota Governor/g, 'Vertex AI quotas & Provisioned Throughput'],
  [/Gemini Enterprise AIOps/g, 'Gemini-assisted AIOps'],
  [/Vertex AI AlphaFold/g, 'AlphaFold workload on Google Cloud'],
  [/AlphaFold Pro/g, 'AlphaFold workload'],
  [/Vertex AI Predictive Maintenance/g, 'Vertex AI predictive maintenance model'],
  [/Gemini 3\.7 Flash \/ Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro Vision/g, 'Gemini multimodal model'],
  [/Gemini 3\.7 Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Flash/g, 'Gemini (approved model)'],
  [/Gemini 3\.7/g, 'Gemini'],
];

function normalizeText(value: string): string {
  return GLOBAL_TEXT_REPLACEMENTS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    value,
  );
}

function normalizeStringFields(item: BlueprintKnowledgeItem): BlueprintKnowledgeItem {
  const normalized: BlueprintKnowledgeItem = { ...item };

  (Object.keys(normalized) as Array<keyof BlueprintKnowledgeItem>).forEach((key) => {
    const value = normalized[key];
    if (typeof value === 'string') {
      (normalized as unknown as Record<string, unknown>)[key] = normalizeText(value);
    } else if (Array.isArray(value)) {
      (normalized as unknown as Record<string, unknown>)[key] = value.map((entry) =>
        typeof entry === 'string' ? normalizeText(entry) : entry,
      );
    }
  });

  return normalized;
}

type MetadataPatch = Partial<BlueprintKnowledgeItem>;

const METADATA_PATCHES: Record<string, MetadataPatch> = {
  // Blueprint 6 is the high-level orientation/reference view for the whole architecture library.
  'P3-APP-C-01_total_unified_system_view': {
    diagramName: 'Enterprise Reference Architecture',
    domain: 'Architecture Standards',
    abstractionLevel: 'Conceptual',
    notationStandard: 'Enterprise Reference Architecture',
    uiCardDesc: 'High-level enterprise reference architecture spanning experience, applications, integration, data, AI, cloud platform, and cross-cutting security, governance, observability, reliability, DevSecOps, and FinOps.',
    phaseGoal: 'Establish a clear enterprise orientation map and layer boundaries, with specialized blueprints used for implementation-level detail.',
  },

  // Blueprint 9 is the current Google Cloud open lakehouse reference, not a GE-specific agent mesh.
  'P3-DAT-L-04_gcp_enterprise_data_lakehouse': {
    diagramName: 'Enterprise Open Lakehouse & AI Data Foundation on Google Cloud',
    domain: 'Data & Analytics',
    abstractionLevel: 'Logical',
    notationStandard: 'Open Lakehouse Reference Architecture',
    uiCardDesc: 'Governed open lakehouse using Lakehouse for Apache Iceberg, Lakehouse runtime catalog, BigQuery, Managed Service for Apache Spark, Knowledge Catalog, batch/CDC/stream ingestion, and explicit analytics/AI consumption paths.',
    phaseGoal: 'Establish an interoperable governed data foundation across native BigQuery and Apache Iceberg workloads without conflating the lakehouse with an agent runtime.',
    coreGcpServices: [
      'Lakehouse for Apache Iceberg',
      'Lakehouse runtime catalog',
      'BigQuery',
      'Managed Service for Apache Spark',
      'Knowledge Catalog',
      'Cloud Storage',
      'Datastream',
      'Pub/Sub',
      'Dataflow',
      'Sensitive Data Protection',
    ],
    generativeBuildSequence: '1. Draw operational, SaaS, file/object, streaming and optional cross-cloud sources. 2. Separate Datastream CDC, Storage Transfer, Pub/Sub and Dataflow ingestion paths. 3. Draw Lakehouse for Apache Iceberg on Cloud Storage with the Lakehouse runtime catalog, plus native BigQuery storage where appropriate. 4. Draw BigQuery and Managed Service for Apache Spark compute. 5. Add Knowledge Catalog, Sensitive Data Protection, IAM, scoped credentials and audit/security controls. 6. Draw BI, data-science, Gemini Enterprise and custom-agent consumption as governed consumers rather than as the lakehouse control plane.',
  },

  // Data governance is fundamentally a governance/control-plane blueprint.
  'P3-DAT-C-06_unified_data_governance': {
    domain: 'Strategy & Governance',
  },

  // Multi-tenant AI configuration is an AI platform/LLMOps concern, not general governance.
  'P3-GOV-L-09_logical_ai_config_tenant': {
    domain: 'AI Agentic & LLMOps',
    stackLayer: 'Layer 3 (Complex)',
  },

  // AI TRiSM is an AI security/LLMOps control pipeline.
  'P4-GOV-L-07_ai_trism_guardrails': {
    domain: 'AI Agentic & LLMOps',
  },

  // DevSecOps and operational reliability deserve an explicit catalog domain.
  'P4-GOV-P-09_devsecops_ci_cd_pipeline': {
    domain: 'DevSecOps & Reliability',
  },
  'P5-SEC-P-02_enterprise_sre_observability': {
    domain: 'DevSecOps & Reliability',
  },
  'P5-GOV-P-03_golive_warroom_runbook': {
    domain: 'DevSecOps & Reliability',
    abstractionLevel: 'Process',
  },
  'P5-GOV-L-04_incident_triage_swimlane': {
    domain: 'DevSecOps & Reliability',
    abstractionLevel: 'Process',
  },

  // An operating model is conceptual governance, not an application-layer design.
  'P5-AI-L-06_ai_coe_operating_model': {
    abstractionLevel: 'Conceptual',
    stackLayer: 'Layer 1 (Foundation)',
  },

  // Resolve the Active-Active vs Pilot-Light/Active-Passive contradiction.
  'P5-GOV-P-09_bcdr_multi_region_failover': {
    diagramName: 'Multi-Region Active-Passive Disaster Recovery',
    notationStandard: 'Active-Passive Multi-Region Failover',
    uiCardDesc: 'Active-passive multi-region DR with global health-based routing, cross-region data replication, governed failover, and explicit workload-defined RTO/RPO targets.',
    phaseGoal: 'Active-passive multi-region DR with global health-based routing, cross-region data replication, governed failover, and explicit workload-defined RTO/RPO targets.',
  },

  // Separate the two manufacturing blueprints: predictive maintenance vs full smart-factory platform.
  'IND-MFG-02_ge_equipment_optimization_gemini': {
    diagramName: 'Google Cloud Industry 4.0: Equipment Predictive Maintenance Architecture',
    uiCardDesc: 'Equipment-focused predictive maintenance: GDC Edge telemetry, streaming time-series processing, multimodal anomaly detection, SAP PM work orders, and OEE insights.',
    phaseGoal: 'Equipment-focused predictive maintenance: GDC Edge telemetry, streaming time-series processing, multimodal anomaly detection, SAP PM work orders, and OEE insights.',
  },
  'IND-MFG-05_smart_manufacturing_iot': {
    diagramName: 'Google Cloud Industry 4.0: Smart Factory Digital Twin & Operations Platform',
    uiCardDesc: 'Plant-wide ISA-95 smart-factory platform with edge telemetry, AlloyDB digital twin, streaming analytics, BigQuery time-series lakehouse, AI operations, and OEE cockpit.',
    phaseGoal: 'Plant-wide ISA-95 smart-factory platform with edge telemetry, AlloyDB digital twin, streaming analytics, BigQuery time-series lakehouse, AI operations, and OEE cockpit.',
  },

  // C4 L3 is a logical software component model, not a physical operations topology.
  'ARCH-C4-02_ARCH-C4-03_c4_component_lld': {
    abstractionLevel: 'Logical',
    stackLayer: 'Layer 4 (Application)',
  },

  // STRIDE is primarily a logical threat/trust-boundary model.
  'ARCH-SEC-04_ARCH-SEC-01_threat_modeling_stride': {
    abstractionLevel: 'Logical',
  },

  // Modernize Blueprint 50 metadata while keeping the canonical ID stable.
  'ARCH-MCP-06_ARCH-MCP-02_model_context_protocol_gateway': {
    diagramName: 'Enterprise MCP Gateway on Google Cloud',
    uiCardDesc: 'AI hosts and MCP clients invoke policy-governed remote MCP servers on Cloud Run through a secure, stateless enterprise MCP gateway with IAM, authorization, routing, rate limits, and audit logging.',
    phaseGoal: 'AI hosts and MCP clients invoke policy-governed remote MCP servers on Cloud Run through a secure, stateless enterprise MCP gateway with IAM, authorization, routing, rate limits, and audit logging.',
    notationStandard: 'Enterprise Remote MCP Gateway & Tool Access Pattern',
    generativeBuildSequence: '1. Draw AI Hosts & Agents (Gemini, Vertex AI agents, ADK, IDE/CLI agents). 2. Draw MCP Client Layer (tool discovery, capability cache, request builder, response normalization). 3. Draw Enterprise MCP Gateway (OAuth/OIDC, IAM, policy/allowlists, rate limits, Model Armor, header routing, audit). 4. Draw stateless remote MCP servers on Cloud Run. 5. Draw enterprise tools and data systems. 6. Show explicit Streamable HTTP request and response paths.',
  },
};

export const BLUEPRINT_KNOWLEDGE_MATRIX: BlueprintKnowledgeItem[] = RAW_BLUEPRINT_KNOWLEDGE_MATRIX.map((rawItem) => {
  const item = normalizeStringFields(rawItem);
  return {
    ...item,
    ...(METADATA_PATCHES[item.combinedId] || {}),
  };
});

export const ARCHITECTURE_DOMAIN_OPTIONS = [
  'App & Integration',
  'Data & Analytics',
  'AI Agentic & LLMOps',
  'Cloud Infra Security',
  'Strategy & Governance',
  'DevSecOps & Reliability',
  'Industry',
];

export const ABSTRACTION_LEVEL_OPTIONS = [
  'Conceptual',
  'Logical',
  'Physical',
  'Process',
  'Industry',
];

export const ARCHITECTURAL_STACK_LAYER_OPTIONS = [
  'Layer 1 (Foundation)',
  'Layer 2 (Intermediary)',
  'Layer 3 (Complex)',
  'Layer 4 (Application)',
  'Layer 5 (Operations)',
];

export function getBlueprintMetadataById(id: string): BlueprintKnowledgeItem | null {
  const rawMatch = getRawBlueprintMetadataById(id);
  if (!rawMatch) return null;
  return BLUEPRINT_KNOWLEDGE_MATRIX.find((item) => item.combinedId === rawMatch.combinedId) || null;
}

export function getFacetedBlueprintFilters(filters: BlueprintFilterState = {}): FacetedFilterResult {
  const isMatch = (item: BlueprintKnowledgeItem, f: BlueprintFilterState): boolean => {
    if (f.phaseName && f.phaseName !== 'ALL' && item.phaseName !== f.phaseName) return false;
    if (f.domain && f.domain !== 'ALL' && item.domain !== f.domain) return false;
    if (f.abstractionLevel && f.abstractionLevel !== 'ALL' && item.abstractionLevel !== f.abstractionLevel) return false;
    if (f.stackLayer && f.stackLayer !== 'ALL' && item.stackLayer !== f.stackLayer) return false;
    if (f.defaultDirection && f.defaultDirection !== 'ALL' && item.defaultDirection !== f.defaultDirection) return false;
    if (f.salesStage && f.salesStage !== 'ALL' && item.salesStage !== f.salesStage) return false;
    if (f.lifecyclePhase && f.lifecyclePhase !== 'ALL' && item.lifecyclePhase !== f.lifecyclePhase) return false;
    return true;
  };

  const matchingBlueprints = BLUEPRINT_KNOWLEDGE_MATRIX.filter((item) => isMatch(item, filters));

  const countBy = (field: keyof BlueprintKnowledgeItem, excludeKey?: keyof BlueprintFilterState): Record<string, number> => {
    const counts: Record<string, number> = {};
    const subFilters = { ...filters };
    if (excludeKey) delete subFilters[excludeKey];

    BLUEPRINT_KNOWLEDGE_MATRIX.filter((item) => isMatch(item, subFilters)).forEach((item) => {
      const value = String(item[field]);
      if (value) counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  };

  return {
    matchingCount: matchingBlueprints.length,
    matchingBlueprints,
    phaseCounts: countBy('phaseName'),
    domainCounts: countBy('domain'),
    abstractionCounts: countBy('abstractionLevel'),
    stackLayerCounts: countBy('stackLayer'),
    directionCounts: countBy('defaultDirection'),
    salesStageCounts: countBy('salesStage'),
    lifecycleCounts: countBy('lifecyclePhase'),
  };
}
