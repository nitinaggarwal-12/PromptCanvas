'use client';

import {
  BlueprintCatalogModal as BaseBlueprintCatalogModal,
  BLUEPRINT_CATALOG_ITEMS,
  type BlueprintCatalogItem,
} from './BlueprintCatalogModal';

const BLUEPRINT_61_STRATEGIC_CARD: BlueprintCatalogItem = {
  id: 'enterprise_ai_document_assistant',
  number: 61,
  name: 'Blueprint 61 — Enterprise AI Document Assistant Platform — Detailed Architecture & Flowchart',
  category: 'AI & Multi-Agent',
  icon: '📄',
  strategicScore: '5.0 / 5.0',
  whenToUse: 'Enterprise document Q&A, multimodal document ingestion, grounded RAG, workflow automation, policy-driven human review, and secure enterprise-system integration.',
  whereToUse: 'Enterprise AI Architecture RFC; Architecture Review Board; CISO / AI Governance Review; Document Automation Program; Gemini / Vertex AI Solution Design.',
  personas: {
    creator: 'Principal AI / Cloud Architect',
    consumer: 'AI Platform Engineering, App Engineering, Data Engineering, Enterprise Architecture, CISO & Compliance',
  },
  bigTechStandpoint: 'Production-grade secure ingress, Document AI/OCR, embeddings and vector retrieval, reranking, grounded Vertex AI Gemini generation, Model Armor/safety, HITL, eventing, observability, and auditable state.',
  consultingStandpoint: 'End-to-end document-assistant operating blueprint connecting business channels to governed AI automation, enterprise data sources, exception handling, human authority, and measurable operational controls.',
};

if (!BLUEPRINT_CATALOG_ITEMS.some((item) => item.number === 61 || item.id === BLUEPRINT_61_STRATEGIC_CARD.id)) {
  BLUEPRINT_CATALOG_ITEMS.push(BLUEPRINT_61_STRATEGIC_CARD);
}

export const BlueprintCatalogModal = BaseBlueprintCatalogModal;
export { BLUEPRINT_CATALOG_ITEMS };
export type { BlueprintCatalogItem };
