# Blueprint 61 — Enterprise AI Document Assistant Platform

Status: **Review candidate**

This blueprint is intentionally numbered **61**. Blueprints **51–60 are being developed in a separate workflow** and are not modified by this branch.

## Architecture scope

The diagram covers the complete request-to-response lifecycle for an enterprise document assistant: users and channels, edge/identity/security, application orchestration, document processing and retrieval, Vertex AI/Gemini reasoning, safety and confidence gates, human review, enterprise data sources, eventing/integration, and DevOps/observability/governance.

## Review standard

- Correct flowchart semantics: decisions use diamonds; data stores use storage/database shapes; human review and failure paths are explicit.
- Numbered primary flow from request through authentication, orchestration, ingestion/OCR, embedding/retrieval, generation, safety/confidence, HITL, response, and telemetry.
- Distinct process, data, event, and negative/fallback paths.
- Security controls are first-class: WAF, IAM/SSO, secrets, KMS, DLP, audit logging and policy enforcement.
- Google Cloud services and enterprise systems are named explicitly rather than represented by generic unlabeled boxes.
- Runtime output is identity-locked to Blueprint 61 and regression-tested to reject any leaked provisional Blueprint 51 markers.

## Canonical identity

- Catalog ID: `enterprise_ai_document_assistant`
- Blueprint number: `61`
- Master: `templates/master_blueprints/xml/61_enterprise_ai_document_assistant.drawio`
- Runtime factory: `src/lib/approvedBlueprint61Safe.ts`

## Activation note

The direct resolver is enabled for review. Full sequential catalog placement should be merged only after the independent 51–60 workflow lands, so no numbering or ordering assumptions are introduced prematurely.
