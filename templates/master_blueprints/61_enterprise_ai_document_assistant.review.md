# Blueprint 61 — Enterprise AI Document Assistant Platform

Status: **Review candidate**

This blueprint is intentionally numbered **61**. Blueprints **51–60 were developed and certified in a separate workflow** and remain untouched by this review extension.

## Architecture scope

The diagram covers the complete request-to-response lifecycle for an enterprise document assistant: users and channels, edge/identity/security, application orchestration, document processing and retrieval, Vertex AI/Gemini reasoning, safety and grounding gates, human review, enterprise data sources, eventing/integration, and DevOps/observability/governance.

## Review standard

- Native, uncompressed Draw.io XML for direct editing and inspection.
- Correct flowchart semantics: decisions use diamonds; inputs/outputs use parallelograms; persisted state uses cylinders.
- Numbered primary process flow with explicit YES/NO branches and red rejection/fallback paths.
- Distinct process, data/context, event/telemetry, and failure paths with a visible legend.
- Security is first-class: Cloud Armor/WAF, SSO/AuthZ, Secret Manager, IAM, KMS, DLP, audit logging and policy controls.
- Named Google Cloud and enterprise services instead of anonymous generic tiers.
- RAG is explicit: Document AI/OCR → embeddings → vector store → retrieval → reranking → prompt orchestration → Gemini → grounding → safety.
- HITL is explicit and auditable: human approval decision → review task → notification → final response.
- Operational lifecycle is visible: GitHub → Cloud Build → Artifact Registry → Terraform/deploy plus Logging, Monitoring, Error Reporting and Audit Logs.
- Regression coverage validates both the editable master and runtime resolver for topology, required services, decision shapes, and zero provisional Blueprint 51 identity leakage.

## Canonical identity

- Catalog ID: `enterprise_ai_document_assistant`
- Reserved blueprint number: `61`
- Native master: `templates/master_blueprints/xml/61_enterprise_ai_document_assistant.drawio`
- Runtime factory: `src/lib/approvedBlueprint61Safe.ts`
- Regression: `src/lib/__tests__/blueprint61EnterpriseAiDocumentAssistant.test.ts`

## Activation boundary

Blueprint 61 is directly resolvable on this review branch but intentionally excluded from the certified `CATALOG_CANONICAL_IDS` / knowledge-matrix count until approval. The existing 60-blueprint quality gate therefore remains unchanged during review. After approval, #61 can be promoted into the sequential catalog and the certification count ratcheted from 60 to 61 in one controlled change.
