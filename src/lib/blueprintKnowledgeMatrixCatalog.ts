import {
  BLUEPRINT_KNOWLEDGE_MATRIX as BASE_BLUEPRINT_KNOWLEDGE_MATRIX,
  getBlueprintMetadataById as getBaseBlueprintMetadataById,
  PHASE_NAME_OPTIONS,
  ARCHITECTURE_DOMAIN_OPTIONS,
  ABSTRACTION_LEVEL_OPTIONS,
  ARCHITECTURAL_STACK_LAYER_OPTIONS,
  DEFAULT_LAYOUT_DIRECTION_OPTIONS,
  SALES_CYCLE_STAGE_OPTIONS,
  LIFECYCLE_PHASE_OPTIONS,
} from './blueprintKnowledgeMatrixNormalized';
import type {
  BlueprintKnowledgeItem,
  BlueprintFilterState,
  FacetedFilterResult,
} from './blueprintKnowledgeMatrixNormalized';

export type { BlueprintKnowledgeItem, BlueprintFilterState, FacetedFilterResult } from './blueprintKnowledgeMatrixNormalized';
export {
  PHASE_NAME_OPTIONS,
  ARCHITECTURE_DOMAIN_OPTIONS,
  ABSTRACTION_LEVEL_OPTIONS,
  ARCHITECTURAL_STACK_LAYER_OPTIONS,
  DEFAULT_LAYOUT_DIRECTION_OPTIONS,
  SALES_CYCLE_STAGE_OPTIONS,
  LIFECYCLE_PHASE_OPTIONS,
};

/**
 * Blueprint 61 is intentionally appended after the certified 1-60 catalog so its visible
 * number is deterministic and can never collide with the independently-built 51-60 series.
 */
export const BLUEPRINT_61_ENTERPRISE_AI_DOCUMENT_ASSISTANT: BlueprintKnowledgeItem = {
  combinedId: 'enterprise_ai_document_assistant',
  diagramName: 'Enterprise AI Document Assistant Platform — Detailed Architecture & Flowchart',
  intentKeywords: 'enterprise document assistant, document q&a, rag, multimodal document ingestion, document ai, ocr, embeddings, vector search, reranking, vertex ai gemini, model armor, grounding, confidence gate, human in the loop, hitl, sharepoint, salesforce, servicenow, google drive, api gateway, cloud armor, sso, pubsub, eventarc, observability, audit',
  goldenExamplePayload: 'Design a production-grade Enterprise AI Document Assistant on Google Cloud. Show multi-channel users and clients, Global Load Balancer, Cloud Armor, API Gateway, SSO/AuthN/AuthZ, workflow orchestration, document upload and Document AI/OCR, embeddings and vector retrieval, reranking, grounded Gemini generation, safety and grounding gates, confidence/HITL approval, enterprise connectors such as SharePoint/Salesforce/ServiceNow/Google Drive, Pub/Sub/Eventarc integration, persisted state, final response delivery, CI/CD, observability, audit, IAM, DLP and KMS controls.',
  uiCardDesc: 'Seven-layer enterprise document assistant with secure multi-channel ingress, Document AI + RAG, Gemini reasoning, enterprise connectors, safety/grounding gates, HITL approval, eventing, and operational governance.',
  phase: 'Phase 3',
  phaseName: 'Phase 3: Target State Logical Architecture',
  phaseGoal: 'Define the end-to-end target architecture for governed enterprise document Q&A and document-driven workflows, from secure ingress and document processing through RAG, Gemini reasoning, HITL, integrations, response delivery and auditability.',
  domain: 'AI Agentic & LLMOps',
  abstractionLevel: 'Logical',
  stackLayer: 'Layer 3 (Complex)',
  notationStandard: 'Enterprise AI / RAG Flowchart & Reference Architecture',
  defaultDirection: 'LR',
  coreGcpServices: [
    'Global External Application Load Balancer',
    'Cloud Armor',
    'API Gateway',
    'Identity Platform / OIDC SSO',
    'Cloud Run / GKE',
    'Document AI',
    'Vertex AI Embeddings',
    'Vertex AI Vector Search',
    'Vertex AI Gemini',
    'Model Armor',
    'Cloud Storage',
    'BigQuery',
    'Cloud SQL for PostgreSQL',
    'Firestore',
    'Pub/Sub',
    'Eventarc',
    'Integration Connectors',
    'Cloud Logging',
    'Cloud Monitoring',
    'Secret Manager',
    'Cloud KMS',
    'Sensitive Data Protection',
  ],
  generativeBuildSequence: '1. Draw users/channels and request/document input. 2. Draw Load Balancer → Cloud Armor → API Gateway → SSO/AuthZ gate. 3. Draw BFF and Workflow Orchestrator. 4. Draw document-type decision, processing service and Document AI/OCR. 5. Persist original/processed documents and generate embeddings. 6. Draw Vector Search plus enterprise connector retrieval and reranking. 7. Draw Prompt Orchestration → Vertex AI Gemini with grounded generation and tools. 8. Draw grounding/safety gates and clarification fallback. 9. Draw HITL decision, review task and notification path. 10. Draw final response to original channel. 11. Draw Pub/Sub/Eventarc/integration actions. 12. Draw CI/CD, logging, monitoring, audit, IAM, DLP, KMS and cost/quota governance.',
  advancedPromptLogic: 'Maintain four visually distinct path semantics: green solid process/control flow, blue dashed data/context flow, gray dashed event/telemetry flow, and red rejection/fallback flow. Use orthogonal routing, explicit YES/NO decisions, readable labels, no line/text overlap, and numbered request-to-response steps. Keep human approval policy-driven and preserve citation/grounding provenance through the response and audit path.',
  requiredUserInputs: 'Document sources and formats, user/channel mix, identity provider, data residency constraints, target enterprise systems/connectors, grounding corpus, confidence thresholds, HITL policy, latency/SLA targets, compliance requirements',
  prerequisite: 'Enterprise identity model, document/data source inventory, connector authorization model, security/governance policy, approved Gemini/embedding models',
  primaryPersonas: 'Creator: Principal AI / Cloud Architect | Consumers: AI Platform Engineers, Application Engineers, Data Engineers | Stakeholders: CISO, Enterprise Architecture, Business Operations, Compliance, Product Owners',
  salesStage: 'Architecture Design / Review',
  lifecyclePhase: 'Design → Build',
  liveRailwayLink: 'https://promptcanvas-production-235c.up.railway.app/workspace?tab=templates&blueprint=enterprise_ai_document_assistant',
};

export const BLUEPRINT_KNOWLEDGE_MATRIX: BlueprintKnowledgeItem[] = [
  ...BASE_BLUEPRINT_KNOWLEDGE_MATRIX,
  BLUEPRINT_61_ENTERPRISE_AI_DOCUMENT_ASSISTANT,
];

const normalizeLookup = (value: string): string => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_');

export function getBlueprintMetadataById(id: string): BlueprintKnowledgeItem | null {
  if (!id) return null;
  const normalized = normalizeLookup(id);
  if (
    normalized === 'enterprise_ai_document_assistant' ||
    normalized === 'blueprint_61' ||
    normalized === 'p61' ||
    normalized.includes('enterprise_ai_document_assistant') ||
    normalized.includes('new_ai_11')
  ) {
    return BLUEPRINT_61_ENTERPRISE_AI_DOCUMENT_ASSISTANT;
  }
  return getBaseBlueprintMetadataById(id);
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
