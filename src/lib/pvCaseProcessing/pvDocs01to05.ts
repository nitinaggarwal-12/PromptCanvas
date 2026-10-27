export interface PvDocTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface PvDocCodeBlock {
  title: string;
  language: string;
  code: string;
}

export interface PvDocSection {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: {
    tone: 'blue' | 'emerald' | 'amber' | 'purple';
    title: string;
    body: string;
  };
  tables?: PvDocTable[];
  codeBlocks?: PvDocCodeBlock[];
  diagramRowIds?: number[];
}

export interface PvAssociatedDocument {
  docId: string;
  docNum: number;
  shortCode: string;
  title: string;
  subtitle: string;
  owner: string;
  level: string;
  projectType: string;
  version: string;
  status: string;
  date: string;
  diagramRowIds: number[];
  executiveSummary: string;
  relatedDocIds: string[];
  sections: PvDocSection[];
}

export const PV_DOCS_01_TO_05: PvAssociatedDocument[] = [
  // =========================================================================
  // DOC 1: BRD / PRD
  // =========================================================================
  {
    docId: 'doc-01',
    docNum: 1,
    shortCode: 'BRD / PRD',
    title: 'Agentic PV Case Processing — BRD / PRD',
    subtitle: 'Business & Product Requirements Document · Multi-Agent Pharmacovigilance on Google Cloud',
    owner: 'PM / BA · UX Designer',
    level: 'Business & User',
    projectType: 'All / All (if UI)',
    version: '1.0',
    status: 'Draft for Review',
    date: 'October 2026',
    diagramRowIds: [1, 2, 3, 4, 5],
    executiveSummary:
      'Defines the business problem, target KPIs, release scope, user personas, 5 business/user diagrams (Context, As-Is/To-Be BPMN, User Journey, Use Case Diagram, 3-Pane Reviewer Console Wireframe), 12 functional requirements (FR-01..FR-12), and regulated non-functional requirements for processing ~500,000 adverse event reports/year on Google Cloud.',
    relatedDocIds: ['doc-02', 'doc-04', 'doc-08', 'doc-10'],
    sections: [
      {
        id: 'business-problem-and-objectives',
        number: '1',
        title: 'Business Problem and Objectives',
        paragraphs: [
          'Our pharmacovigilance (PV) organization processes roughly 500,000 adverse event (AE) reports per year from patients, healthcare professionals, call centers, clinical trials, medical literature, and health authority feeds. Volume grows 12–15% each year. Each report must be triaged, extracted, coded to MedDRA and WHODrug, checked for duplicates, summarized in a medical narrative, reviewed by a qualified person, and submitted to regulators (FDA, EMA, PMDA) as an E2B(R3) XML file.',
          'Serious and unexpected cases must reach regulators within 7 or 15 calendar days of Day-0 receipt. Today, most of this work is manual across disconnected tools, creating four critical operational pain points:'
        ],
        bullets: [
          'High cost & slow cycle time: 45–90 minutes of human effort per case; surging backlogs during seasonal peaks or new drug launches.',
          'Compliance risk: Late expedited submissions risk FDA Warning Letters, EMA inspection findings, and financial penalties.',
          'Inconsistent quality: Manual data entry and coding vary across global regions and outsourced BPO vendors (10–15% rework rate).',
          'Poor reviewer experience: Safety physicians and case processors spend ~70% of their time copying text and looking up codes instead of making clinical judgements.'
        ],
        callout: {
          tone: 'blue',
          title: 'Core Product Principle',
          body: 'Use a multi-agent AI system on Google Cloud to prepare every incoming case end-to-end — intake, triage, extraction, coding, duplicate check, narrative draft, and E2B(R3) packaging — so a human safety reviewer only verifies, edits where needed, and applies a 21 CFR Part 11 electronic signature.'
        },
        tables: [
          {
            caption: 'Table 1.1 — Business Objectives and Target KPIs',
            headers: ['Objective', 'Metric (KPI)', 'Baseline (Today)', 'Target (Release 1)'],
            rows: [
              ['Faster case processing', 'Average human touch time per case', '62 min', '≤ 30 min (≥ 50% reduction)'],
              ['Faster end-to-end preparation', 'Receipt to reviewer-ready case (P95)', '18–36 hours', '< 15 minutes (target < 3 min)'],
              ['Regulatory compliance', 'On-time 7-day & 15-day expedited submissions', '96.4%', '100.0%'],
              ['Data quality', 'Extracted fields accepted by reviewer without edit', 'N/A (manual)', '≥ 90%'],
              ['Coding accuracy', 'MedDRA PT / LLT first-pass Top-1 match', '85–88%', '≥ 95%'],
              ['Duplicate control', 'True duplicate cases caught before creation', '82%', '≥ 98%'],
              ['Audit readiness', 'Cases with complete, linked AI + human audit trail', 'Partial', '100% (ALCOA+ compliant)']
            ]
          }
        ]
      },
      {
        id: 'scope-and-stakeholders',
        number: '2',
        title: 'Scope & Stakeholders',
        paragraphs: [
          'Release 1 focuses on automating individual case preparation across all primary intake channels while keeping the existing enterprise Safety Database (Veeva Vault Safety / Oracle Argus) as the authoritative system of record (`ADR-004`).'
        ],
        tables: [
          {
            caption: 'Table 2.1 — Release 1 In-Scope vs. Out-of-Scope',
            headers: ['In Scope (Release 1)', 'Out of Scope (Future Releases)'],
            rows: [
              ['Spontaneous, clinical trial SAE, literature, and authority reports', 'Aggregate periodic reports (PBRER, DSUR, PSUR) generation'],
              ['PDF, scanned fax, email text, call-center audio, and EHR FHIR R4 inputs', 'Direct automated outreach to patients/reporters without human review'],
              ['English, German, French, Spanish, and Japanese source reports', 'Replacing the underlying Safety Database of Record (Argus / Veeva)'],
              ['8-agent workflow: Intake, Triage, Extraction, Coding, Dedup, Narrative, Submission, Orchestrator', 'Fully autonomous submission to FDA/EMA without human e-signature (prohibited by policy)'],
              ['Single-screen Reviewer Console with 21 CFR Part 11 e-signature', 'Signal detection & pharmacoepidemiology disproportionality mining']
            ]
          },
          {
            caption: 'Table 2.2 — Key Stakeholders and Personas',
            headers: ['Persona / Role', 'What They Care About', 'How They Use the System'],
            rows: [
              ['Case Processor', 'Speed, clear highlights, minimal typing, zero tab switching', 'Reviews extracted fields, picks MedDRA/WHODrug codes, resolves duplicates'],
              ['Safety Reviewer / Physician', 'Medical accuracy, causality evidence, drug label grounding', 'Reviews narrative & causality assessment, edits medical prose, applies Part 11 e-signature'],
              ['QPPV / Head of PV', '100% on-time 7-day and 15-day submissions, global visibility', 'Monitors real-time SLA clock dashboard and escalations'],
              ['PV Quality & Compliance (QA)', '21 CFR Part 11, EU Annex 11, GVP Module VI, GAMP 5 validation', 'Audits immutable WORM logs, prompt/model versions, and e-signature records'],
              ['IT / Platform Engineering', 'Reliability, security, cost per case, clean integration with Safety DB', 'Operates GCP platform, MCP tool servers, and CI/CD eval pipelines'],
              ['Data Privacy Officer (DPO)', 'HIPAA & GDPR compliance, PHI minimization, zero unauthorized training', 'Reviews SDP de-identification rules, CMEK keys, and retention locks'],
              ['Regulators (FDA, EMA, PMDA)', 'Valid E2B(R3) XML, timely reporting, inspection-ready traceability', 'Receives E2B(R3) submissions and inspects validation & audit records']
            ]
          }
        ]
      },
      {
        id: 'context-and-process-diagrams',
        number: '3',
        title: 'Context Diagram & As-Is / To-Be Process (BPMN)',
        paragraphs: [
          'The Context Diagram (`Row #1`) establishes the external actors, enterprise systems, and regulatory boundaries around the Agentic PV System. The As-Is vs. To-Be BPMN flow (`Row #2`) demonstrates how sequential manual bottlenecks are replaced by parallel agentic execution followed by a single human verification gate.'
        ],
        diagramRowIds: [1, 2]
      },
      {
        id: 'user-journey-use-cases-and-wireframes',
        number: '4',
        title: 'User Journey, Use Case Diagram & Reviewer Console Wireframes',
        paragraphs: [
          'The User Journey (`Row #3`), Use Case Diagram (`Row #4`), and 3-Pane Reviewer Console Wireframe (`Row #5`) specify the end-to-end human-in-the-loop experience. Clicking any AI-extracted field or narrative sentence scrolls the left-hand source PDF viewer directly to the highlighted bounding box (`char_start..char_end`).'
        ],
        diagramRowIds: [3, 4, 5]
      },
      {
        id: 'functional-and-non-functional-requirements',
        number: '5',
        title: 'Functional (FR-01..FR-12) & Non-Functional Requirements',
        tables: [
          {
            caption: 'Table 5.1 — Functional Requirements Catalog (FR-01 to FR-12)',
            headers: ['ID', 'Area', 'Requirement Description', 'Priority'],
            rows: [
              ['FR-01', 'Intake', 'Ingest reports from email, PDF, scanned fax (OCR), call audio (speech-to-text), FHIR R4, and literature feeds; store unmodified original in WORM storage with SHA-256 hash.', 'Must'],
              ['FR-02', 'Triage & Clock', 'Check the 4 ICH E2D validity criteria (identifiable reporter, patient, suspect drug, adverse event), classify seriousness/expectedness, and start the 7-day or 15-day regulatory SLA clock from Day-0.', 'Must'],
              ['FR-03', 'Extraction', 'Extract patient demographics, suspect/concomitant drugs, dosages, adverse events, lab results, outcomes, and reporter details with per-field confidence and source character/bounding-box offsets.', 'Must'],
              ['FR-04', 'Coding', 'Map adverse events to MedDRA (LLT/PT/SOC) and drugs to WHODrug using the active pinned dictionary version, returning Top-3 ranked candidates with confidence.', 'Must'],
              ['FR-05', 'Duplicate Check', 'Search the Safety DB for potential duplicates using weighted similarity across patient, drug, event, and dates; flag matches ≥0.75 for merge/new decision.', 'Must'],
              ['FR-06', 'Narrative & Causality', 'Draft a structured ICH-compliant medical narrative and WHO-UMC causality assessment where every claim links to an extracted field or source span.', 'Must'],
              ['FR-07', 'Submission Prep', 'Generate an ICH E2B(R3) XML document and validate against ~200 ICH, FDA FAERS, and EMA EudraVigilance business rules before review.', 'Must'],
              ['FR-08', 'Reviewer Console', 'Provide a single-screen side-by-side console showing highlighted source PDF, extracted fields, coding candidates, duplicate matches, and narrative draft.', 'Must'],
              ['FR-09', 'Approval & Part 11 Sign', 'Require explicit human approval with 21 CFR Part 11 re-authentication and cryptographic content hash binding before any Safety DB write or E2B transmission.', 'Must'],
              ['FR-10', 'Orchestration', 'Coordinate agent handoffs, parallel execution, bounded retries, error escalation, and state transitions from NEW to CLOSED.', 'Must'],
              ['FR-11', 'Audit Trail', 'Record an immutable, append-only audit trail of every agent invocation, prompt/model version, tool call, confidence score, human edit, and e-signature.', 'Must'],
              ['FR-12', 'SLA Monitoring', 'Provide live countdown timers and automated alerts at 48h, 24h, and 4h before 7-day and 15-day regulatory deadlines.', 'Must']
            ]
          },
          {
            caption: 'Table 5.2 — Non-Functional Requirements (NFRs)',
            headers: ['Category', 'Requirement', 'Target Metric'],
            rows: [
              ['Performance', 'End-to-end AI case preparation time (receipt to READY_FOR_REVIEW)', 'P50 < 90 sec · P95 < 3 min · P99 < 5 min'],
              ['Scale', 'Sustained throughput and peak surge capacity', '500k cases/year (~60/hr avg, 180/hr 3× peak)'],
              ['Availability & DR', 'Production uptime and disaster recovery objectives', '99.9% availability · RPO ≤ 15 min · RTO ≤ 4 hours'],
              ['Security', 'Network isolation, encryption, and access control', 'VPC-SC perimeter, CMEK HSM keys, IAP + OIDC MFA'],
              ['Privacy (PHI/PII)', 'HIPAA & GDPR data minimization before LLM inference', '0% raw direct PHI sent to Gemini or written to logs'],
              ['Compliance', 'Electronic records, signatures, and GxP validation', '21 CFR Part 11, EU Annex 11, GVP Module VI, GAMP 5 CSA'],
              ['AI Guardrails', 'Protection against indirect prompt injection and unauthorized actions', '100% red-team block rate; hard server-side signature gate']
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // DOC 2: SAD (SOLUTION ARCHITECTURE DOCUMENT)
  // =========================================================================
  {
    docId: 'doc-02',
    docNum: 2,
    shortCode: 'SAD',
    title: 'Agentic PV Case Processing — Solution Architecture',
    subtitle: 'End-to-End Solution Architecture Document (Context, Conceptual, Logical, Technical, Deployment, Agent & Guardrails)',
    owner: 'Solution Architect',
    level: 'Very High → Physical',
    projectType: 'All & AI',
    version: '1.0',
    status: 'Approved Baseline',
    date: 'October 2026',
    diagramRowIds: [6, 7, 8, 9, 10, 11, 12],
    executiveSummary:
      'Establishes the 7 core architectural principles, the 7 SAD architecture views (Rows #6–#12), the 8-agent responsibility matrix, the 5-layer guardrail & HITL control model, and the 13-service Google Cloud physical mapping.',
    relatedDocIds: ['doc-01', 'doc-03', 'doc-04', 'doc-07', 'doc-09'],
    sections: [
      {
        id: 'architecture-principles',
        number: '1',
        title: 'Architecture Principles & Key Decisions',
        tables: [
          {
            caption: 'Table 1.1 — Core Architectural Principles Mapped to ADRs',
            headers: ['#', 'Principle', 'Architectural Implication', 'Linked ADR'],
            rows: [
              ['1', 'Human-in-the-loop by design', 'AI agents only prepare drafts; writing to the Safety DB or sending E2B files requires a verified human 21 CFR Part 11 signature token.', 'ADR-001'],
              ['2', 'Orchestrated specialist agents', 'One stateful Orchestrator coordinates 7 stateless, narrow-purpose ADK agents over typed A2A messages.', 'ADR-002'],
              ['3', 'Tools behind MCP boundaries', 'Agents never hold DB credentials or call external APIs directly; all side effects go through IAM-scoped Cloud Run MCP servers.', 'ADR-003'],
              ['4', 'Safety DB remains System of Record', 'Firestore holds working drafts; Veeva Vault Safety / Oracle Argus remains the authoritative GxP record after approval.', 'ADR-004'],
              ['5', 'Two-tier pinned models', 'Gemini Flash tier handles fast triage/coding/dedup; Gemini Pro tier handles extraction & medical reasoning; versions are strictly pinned.', 'ADR-005'],
              ['6', 'Co-versioned release bundles', 'Prompts, model version pins, schemas, and eval sets ship together in a signed bundle.yaml.', 'ADR-006'],
              ['7', 'Zero-trust single-region perimeter', 'All PHI stays in us-central1 inside a VPC Service Controls perimeter encrypted with customer-managed CMEK keys.', 'ADR-007']
            ]
          }
        ]
      },
      {
        id: 'sad-context-conceptual-logical',
        number: '2',
        title: 'Context, Conceptual & Logical Architecture Views',
        paragraphs: [
          'The SAD Context Diagram (`Row #6`), Conceptual Architecture (`Row #7`), and Logical Architecture (`Row #8`) decompose the platform from external regulatory interfaces down to logical subsystems and event buses.'
        ],
        diagramRowIds: [6, 7, 8]
      },
      {
        id: 'sad-agent-and-guardrails',
        number: '3',
        title: 'Agent Architecture & Guardrails / HITL Approval Flow',
        paragraphs: [
          'The Agent Architecture (`Row #11`) and Guardrails / HITL Approval Flow (`Row #12`) define how the Orchestrator coordinates the 7 specialist agents and how 5 concentric control layers prevent prompt injection, hallucination, or unauthorized submission.'
        ],
        diagramRowIds: [11, 12],
        tables: [
          {
            caption: 'Table 3.1 — 8-Agent Architecture & Scoped MCP Tool Allow-List',
            headers: ['Agent', 'Model Tier', 'Responsibility', 'Allowed MCP Tools'],
            rows: [
              ['8. Orchestrator', 'Deterministic ADK', 'Manages case state machine, parallel A2A fan-out, retries, and SLA timers', 'None (A2A dispatch & Pub/Sub only)'],
              ['1. Intake Agent', 'Gemini Flash Tier', 'Normalizes PDF, fax, audio, FHIR; extracts layout blocks and language', 'parse_document'],
              ['2. Triage Agent', 'Gemini Flash Tier', 'Verifies 4 validity criteria; classifies 7-day vs 15-day expedited cases', 'search_knowledge (SOPs)'],
              ['3. Extraction Agent', 'Gemini Pro Tier', 'Extracts patient, drug, dose, event, lab & reporter fields with char offsets', 'parse_document · search_knowledge'],
              ['4. Coding Agent', 'Gemini Flash Tier', 'Maps adverse events to MedDRA v27.1 and drugs to WHODrug (Top-3 candidates)', 'suggest_codes'],
              ['5. Duplicate Check Agent', 'Gemini Flash Tier', 'Searches Safety DB for candidate matches using weighted similarity scoring', 'search_cases'],
              ['6. Causality / Narrative', 'Gemini Pro Tier', 'Drafts ICH medical narrative and WHO-UMC causality grounded in drug labels', 'search_knowledge'],
              ['7. Submission Agent', 'Flash + Deterministic', 'Builds E2B(R3) XML, validates 200 rules, and commits post-approval', 'build_e2b · validate_e2b · write_case* · send_e2b* (*requires sig_id)']
            ]
          },
          {
            caption: 'Table 3.2 — Defense-in-Depth Guardrails & HITL Controls',
            headers: ['Layer', 'Control Mechanism', 'Enforced By', 'Failure Behavior'],
            rows: [
              ['1. Input', 'SDP PHI tokenization + Model Armor prompt injection screening + XML delimiters', 'guardrail-proxy', 'Quarantines suspect input or masks PHI tokens before LLM call'],
              ['2. Tool Access', 'Per-agent Cloud Run IAM service account allow-list', 'Cloud Run IAM + MCP Server', 'HTTP 403 Forbidden + security audit event'],
              ['3. Output Grounding', 'Strict JSON Schema validation + source character offset verification', 'BaseAgent.validate_output()', 'PV-220 repair retry (max 2x), then routes field to manual review'],
              ['4. UI Confidence Gate', 'Fields with confidence <0.85 highlighted Amber; batch-accept disabled', 'Reviewer Console UI + API', 'Reviewer must explicitly inspect source span before accepting'],
              ['5. Part 11 Hard Lock', 'write_case and send_e2b verify cryptographic signature_id & SHA-256 content_hash', 'mcp-safety-db & mcp-e2b', 'Rejects call with PV-411 / PV-410; impossible for agent to bypass']
            ]
          }
        ]
      },
      {
        id: 'sad-technical-and-deployment',
        number: '4',
        title: 'Technical Architecture & Deployment Summary',
        paragraphs: [
          'The Technical Architecture (`Row #9`) maps every logical component to concrete Google Cloud services inside `us-central1`, while the Deployment Summary (`Row #10`) illustrates promotion across `pv-dev`, `pv-val`, and `pv-prod`.'
        ],
        diagramRowIds: [9, 10],
        tables: [
          {
            caption: 'Table 4.1 — Logical Component to Google Cloud Service Mapping',
            headers: ['Logical Component', 'Google Cloud Service', 'Configuration & Purpose'],
            rows: [
              ['Raw Report Archive', 'Cloud Storage (CMEK + Bucket Lock)', 'Immutable 10-year WORM storage for original PDFs, faxes, audio, and E2B XMLs'],
              ['Clinical Structured Intake', 'Cloud Healthcare API (FHIR R4)', 'Ingests structured EHR adverse event bundles'],
              ['Multimodal Parsing', 'Document AI + Cloud Speech-to-Text v2', 'Layout-aware OCR with bounding boxes and medical speech transcription'],
              ['Event Bus & SLA Triggers', 'Cloud Pub/Sub + Cloud Scheduler', 'Decoupled event routing, dead-letter queues, and 15-minute SLA clock sweeps'],
              ['AI Privacy & Safety Shield', 'Sensitive Data Protection (DLP) + Model Armor', 'Tokenizes HIPAA 18 identifiers and screens for indirect prompt injection'],
              ['Agent Runtime', 'Vertex AI Agent Engine (ADK)', 'Managed runtime hosting Orchestrator and 7 specialist agents with A2A'],
              ['Foundation Models', 'Gemini on Vertex AI (Flash & Pro Tiers)', 'Pinned model versions (@001/@002), regional endpoint, zero Google data logging'],
              ['MCP Tool Servers', 'Cloud Run (Internal Ingress Only)', '5 stateless container services exposing typed MCP tools via Workload Identity'],
              ['Knowledge Grounding (RAG)', 'Vertex AI Search', 'Indexed SOPs, product labels (SmPC/USPI), and historical narratives'],
              ['Medical Dictionaries', 'Cloud SQL for PostgreSQL 15 (HA + pgvector)', 'Stores versioned MedDRA & WHODrug tables with 768-d HNSW embeddings'],
              ['Operational Case Store', 'Cloud Firestore (Native Mode)', 'Low-latency working store for active cases, suggestions, and Part 11 signatures'],
              ['Immutable Audit Trail', 'BigQuery (Append-Only Partitioned Dataset)', '10-year WORM table recording every prompt hash, tool call, and human action'],
              ['Reviewer Console & Edge', 'Cloud Run + Identity-Aware Proxy (IAP) + Cloud Armor', 'Zero-trust web console and REST API v1 for Case Processors and Physicians']
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // DOC 3: ADRs (ARCHITECTURE DECISION RECORDS)
  // =========================================================================
  {
    docId: 'doc-03',
    docNum: 3,
    shortCode: 'ADRs',
    title: 'Agentic PV Case Processing — Architecture Decision Records',
    subtitle: '7 Normative Architecture Decision Records (ADR-001 to ADR-007) & Option Comparison Sketch',
    owner: 'Architect',
    level: 'Narrow (Decision)',
    projectType: 'All',
    version: '1.0',
    status: 'Accepted',
    date: 'October 2026',
    diagramRowIds: [13],
    executiveSummary:
      'Captures the 7 foundational architecture decisions (`ADR-001` through `ADR-007`) governing human approval gates, multi-agent orchestration, MCP tool isolation, safety database coexistence, two-tier Gemini routing, co-versioned release bundles, and single-region VPC-SC security.',
    relatedDocIds: ['doc-02', 'doc-04', 'doc-05', 'doc-07'],
    sections: [
      {
        id: 'adr-decision-log',
        number: '1',
        title: 'Architecture Decision Log (ADR-001 to ADR-007)',
        diagramRowIds: [13],
        tables: [
          {
            caption: 'Table 1.1 — Master Architecture Decision Record Index',
            headers: ['ADR ID', 'Title', 'Status', 'Rejected Alternatives', 'Chosen Decision'],
            rows: [
              ['ADR-001', 'Human approval before any external action', 'Accepted', 'Full auto-submit for high-confidence cases; UI-only button lock', 'Enforce server-side 21 CFR Part 11 signature_id verification inside MCP tool servers before write_case or send_e2b'],
              ['ADR-002', 'Multi-agent topology with central Orchestrator', 'Accepted', 'Single monolithic LLM prompt; Autonomous peer-to-peer agent swarm', 'Central deterministic ADK Orchestrator dispatching 7 narrow specialist agents over A2A'],
              ['ADR-003', 'MCP tool servers as the only path to enterprise systems', 'Accepted', 'Direct DB/API SDKs embedded inside agent code', 'All external reads/writes traverse 5 IAM-scoped Cloud Run MCP servers'],
              ['ADR-004', 'Existing Safety DB remains System of Record', 'Accepted', 'Replace Veeva/Argus with custom GCP safety DB; Dual-write during draft', 'Keep Firestore as draft store; commit once to Veeva/Argus post-approval'],
              ['ADR-005', 'Gemini on Vertex AI with two pinned model tiers', 'Accepted', 'Single Pro model for all agents; Unpinned latest model aliases', 'Route Triage/Coding/Dedup to pinned Gemini Flash and Extraction/Narrative to pinned Gemini Pro'],
              ['ADR-006', 'Co-versioned release bundle (code + prompts + model + evals)', 'Accepted', 'Editable prompts in DB without CI gate; Independent lifecycles', 'Version prompts, model IDs, schemas, and eval thresholds in a single git-tagged bundle.yaml'],
              ['ADR-007', 'Single-region VPC-SC perimeter with CMEK encryption', 'Accepted', 'Multi-region active-active with cross-border PHI; Google-managed keys', 'Deploy in us-central1 inside VPC-SC with HSM-backed CMEK keys and warm DR in us-east4']
            ]
          }
        ]
      },
      {
        id: 'adr-detailed-rationales',
        number: '2',
        title: 'Detailed ADR Breakdowns & Trade-Off Analysis',
        paragraphs: [
          'Why ADR-002 (Orchestrator + 7 Specialists) beat Peer-to-Peer Swarms: In a GxP regulated environment, non-deterministic agent-to-agent handoff loops are impossible to validate under GAMP 5. A central Orchestrator guarantees a fixed, auditable state machine while still executing Extraction, Coding, and Duplicate Check in parallel.',
          'Why ADR-005 (Two-Tier Pinned Gemini) beat Single-Model Routing: Triage, MedDRA candidate ranking, and duplicate scoring are structured classification tasks where Gemini Flash achieves equal accuracy at 3.5× lower latency and 65% lower token cost, saving ~55% blended inference cost per case while reserving Gemini Pro for complex multimodal extraction and medical causality synthesis.'
        ],
        tables: [
          {
            caption: 'Table 2.1 — Quantitative Comparison for ADR-002 & ADR-005 on 500-Case PV Benchmark',
            headers: ['Architecture Option', 'P95 End-to-End Latency', 'Relative Inference Cost', 'MedDRA Top-1 Accuracy', 'GxP Validation Complexity'],
            rows: [
              ['Option 1: Single Monolithic Prompt (Pro)', '195 sec', '1.85×', '89.2% (fails ≥95% gate)', 'Medium'],
              ['Option 2: Autonomous Peer Swarm (Pro)', '260 sec (variable)', '2.40×', '95.4%', 'Unacceptable (non-deterministic paths)'],
              ['Option 3: Orchestrated 7 Agents + 2-Tier Gemini (Chosen)', '112 sec (<2 min)', '1.00× (Baseline)', '96.8% (passes ≥95% gate)', 'Low (deterministic state machine)']
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // DOC 4: HLD (HIGH-LEVEL DESIGN)
  // =========================================================================
  {
    docId: 'doc-04',
    docNum: 4,
    shortCode: 'HLD',
    title: 'Agentic PV Case Processing — High-Level Design',
    subtitle: '12-Module C4 L3 Architecture, Key Sequences, A2A/MCP Contracts, Data Flow & Conceptual/Logical ERDs',
    owner: 'Tech Lead',
    level: 'High → Mid',
    projectType: 'All & AI',
    version: '1.0',
    status: 'Approved Baseline',
    date: 'October 2026',
    diagramRowIds: [14, 15, 16, 17, 18, 19],
    executiveSummary:
      'Specifies the 12 deployable modules across 5 engineering groups, the C4 Level-3 component diagram (`Row #14`), the 2 end-to-end sequence flows (`Row #15`), Conceptual & Logical ERDs (`Rows #16–#17`), PHI-redacted Data Flow Diagram (`Row #18`), and A2A/MCP protocol interaction sequence (`Row #19`).',
    relatedDocIds: ['doc-02', 'doc-05', 'doc-06', 'doc-07'],
    sections: [
      {
        id: 'module-breakdown-and-c4',
        number: '1',
        title: '12-Module Breakdown & C4 Level-3 Component Diagram',
        diagramRowIds: [14],
        tables: [
          {
            caption: 'Table 1.1 — 12 Deployable Modules Across 5 Functional Groups',
            headers: ['Group', 'Module Name', 'Runtime Target', 'Responsibility'],
            rows: [
              ['Ingestion', '1. channel-ingest', 'Cloud Run', 'Receives email, fax, portal, literature, and FHIR inputs; writes raw artifact to gs://pv-raw-reports'],
              ['Ingestion', '2. doc-prep', 'Cloud Run', 'Invokes Document AI & Speech-to-Text; normalizes pages and character offsets; emits report.received'],
              ['Ingestion', '3. clock-service', 'Cloud Run + Scheduler', 'Calculates Day-0, sets 7-day / 15-day due_at timestamps, and emits case.clock_alert events'],
              ['Agents', '4. orchestrator', 'Vertex AI Agent Engine', 'Owns case state machine, dispatches A2A tasks, manages parallel fan-out and bounded retries'],
              ['Agents', '5. specialist-agents (×7)', 'Vertex AI Agent Engine', 'Stateless ADK agents for Intake, Triage, Extraction, Coding, Dedup, Narrative, and Submission'],
              ['Agents', '6. guardrail-proxy', 'Cloud Run (Internal)', 'Performs SDP PHI tokenization and Model Armor screening around every Gemini inference call'],
              ['Tools (MCP)', '7. mcp-doc-tools & mcp-knowledge', 'Cloud Run (Internal)', 'Exposes parse_document and search_knowledge (SOPs & drug labels in Vertex AI Search)'],
              ['Tools (MCP)', '8. mcp-coding & mcp-safety-db', 'Cloud Run (Internal)', 'Exposes suggest_codes (Cloud SQL) and search_cases / write_case (Veeva / Argus adapter)'],
              ['Tools (MCP)', '9. mcp-e2b', 'Cloud Run (Internal)', 'Exposes build_e2b, validate_e2b (200 rules), and send_e2b (AS2 gateway adapter)'],
              ['Data & Audit', '10. audit-writer', 'Cloud Run Worker', 'Consumes audit.event Pub/Sub messages and streams immutable rows into BigQuery pv_audit.events'],
              ['Experience', '11. console-api', 'Cloud Run (Behind IAP)', 'REST API v1 serving the Reviewer Console, optimistic concurrency, and Part 11 signature validation'],
              ['Experience', '12. console-ui', 'Cloud Run (Behind IAP)', 'Next.js 3-pane Reviewer Console and QPPV SLA Dashboard']
            ]
          }
        ]
      },
      {
        id: 'sequences-and-a2a-mcp',
        number: '2',
        title: 'Key Sequence Diagrams & A2A / MCP Interaction Sequence',
        paragraphs: [
          'The Key Sequence Diagrams (`Row #15`) trace both the asynchronous report-to-ready pipeline and the synchronous human approval-to-E2B pipeline. The A2A / MCP Interaction Sequence (`Row #19`) details the exact envelope contracts and dual audit emission.'
        ],
        diagramRowIds: [15, 19],
        tables: [
          {
            caption: 'Table 2.1 — Agent Specification & Autonomy Matrix',
            headers: ['Agent', 'Input', 'Output', 'Model Tier', 'Max Retries', 'Autonomy Level'],
            rows: [
              ['Intake', 'gcs_uri, mime_type', 'Normalized pages + layout blocks + language', 'Flash (@001)', '3 (backoff)', 'Draft-only'],
              ['Triage', 'Parsed text + blocks', 'valid (bool), 4 criteria, seriousness, 7d/15d tier', 'Flash (@001)', '2', 'Draft-only (starts clock)'],
              ['Extraction', 'Redacted text + layout', 'Typed FieldSuggestion[] with confidence + bbox', 'Pro (@002)', '2 (PV-220 repair)', 'Draft-only'],
              ['Coding', 'Extracted drug/event strings', 'Top-3 MedDRA PT/LLT & WHODrug candidates', 'Flash (@001)', '2', 'Draft-only'],
              ['Duplicate Check', 'Extracted patient/drug/event/dates', 'DuplicateCandidate[] with similarity score 0..1', 'Flash (@001)', '2', 'Draft-only'],
              ['Narrative', 'Accepted/draft fields + label RAG', 'Structured ICH narrative + WHO-UMC causality', 'Pro (@002)', '2', 'Draft-only'],
              ['Submission', 'Approved case + signature_id', 'Validated E2B(R3) XML + SoR safety_db_id', 'Deterministic', '3 (gateway)', 'Gated by human signature_id']
            ]
          }
        ]
      },
      {
        id: 'dfd-and-erds',
        number: '3',
        title: 'Data Flow Diagram (PHI Redaction) & Conceptual / Logical ERDs',
        paragraphs: [
          'The Conceptual ERD (`Row #16`), Logical ERD (`Row #17`), and Data Flow Diagram (`Row #18`) enforce strict separation between raw PHI in the vault, probabilistic `FIELD_SUGGESTION` entities, and curated post-review case records.'
        ],
        diagramRowIds: [16, 17, 18]
      }
    ]
  },

  // =========================================================================
  // DOC 5: LLD (LOW-LEVEL DESIGN)
  // =========================================================================
  {
    docId: 'doc-05',
    docNum: 5,
    shortCode: 'LLD',
    title: 'Agentic PV Case Processing — Low-Level Design',
    subtitle: 'Monorepo Structure, Class Hierarchy, 12-State Machine, Detailed Sequences, Physical ERD, Algorithms & PV-* Error Codes',
    owner: 'Developer',
    level: 'Low (Implementation)',
    projectType: 'All',
    version: '1.0',
    status: 'Approved Baseline',
    date: 'October 2026',
    diagramRowIds: [20, 21, 22, 23],
    executiveSummary:
      'Provides implementation-ready specifications for developers: the `pv-agents/` monorepo structure, `BaseAgent` template method class diagram (`Row #21`), 12-state Case lifecycle machine (`Row #22`), detailed extraction & Part 11 sequences (`Row #20`), Physical ERD across Firestore/Cloud SQL/BigQuery (`Row #23`), scoring algorithms, `bundle.yaml` manifest, and `PV-100..599` error codes.',
    relatedDocIds: ['doc-04', 'doc-06', 'doc-08'],
    sections: [
      {
        id: 'code-layout-and-class-diagram',
        number: '1',
        title: 'Monorepo Layout & BaseAgent Class Diagram',
        paragraphs: [
          'All agents inherit from `BaseAgent` (`Row #21`), which implements a final `handle(task: A2ATask) -> A2AResult` template method. Individual specialist agents cannot bypass input validation, guardrail proxying, schema repair retries (`PV-220`), or immutable audit emission.'
        ],
        diagramRowIds: [21],
        codeBlocks: [
          {
            title: 'pv-agents/ Monorepo Directory Structure & bundle.yaml',
            language: 'yaml',
            code: `# bundle.yaml — Co-versioned Release Manifest (ADR-006)
bundle_version: "pv-bundle-2026.10.2"
git_commit: "a94f82c1e09b4d1289f0123456789abcdef01234"
dictionaries:
  meddra_version: "27.1"
  whodrug_version: "2026-Q3"
models:
  fast_tier: "gemini-2.5-flash@001"
  reasoning_tier: "gemini-2.5-pro@002"
  temperature: 0.0
  seed: 42
agents:
  intake:     { prompt_sha256: "8f12c9...a1", model_tier: "fast_tier",      timeout_ms: 30000 }
  triage:     { prompt_sha256: "3d90e1...b4", model_tier: "fast_tier",      timeout_ms: 20000 }
  extraction: { prompt_sha256: "7a44f0...c8", model_tier: "reasoning_tier", timeout_ms: 60000 }
  coding:     { prompt_sha256: "1c88b2...d9", model_tier: "fast_tier",      timeout_ms: 25000 }
  dedup:      { prompt_sha256: "5e21a7...e2", model_tier: "fast_tier",      timeout_ms: 25000 }
  narrative:  { prompt_sha256: "9b73d4...f6", model_tier: "reasoning_tier", timeout_ms: 60000 }
  submission: { prompt_sha256: "2f09c3...01", model_tier: "fast_tier",      timeout_ms: 45000 }`
          }
        ]
      },
      {
        id: 'state-machine-and-detailed-sequences',
        number: '2',
        title: '12-State Case Lifecycle & Detailed Sequence Diagrams',
        paragraphs: [
          'The Detailed Sequence Diagrams (`Row #20`) and Case State Diagram (`Row #22`) govern runtime execution, optimistic locking, and regulatory clock transitions.'
        ],
        diagramRowIds: [20, 22]
      },
      {
        id: 'physical-erd-algorithms-and-errors',
        number: '3',
        title: 'Physical Data Model (ERD), Core Algorithms & Error Catalog',
        diagramRowIds: [23],
        tables: [
          {
            caption: 'Table 3.1 — Key Deterministic & Hybrid Scoring Algorithms',
            headers: ['Algorithm', 'Formula / Logic', 'Threshold / Rule'],
            rows: [
              ['Field Confidence Score', 'conf = 0.60 * exp(mean_token_logprob) + 0.40 * span_exact_match_bonus', '≥ 0.85 = GREEN (batch-acceptable); < 0.85 = AMBER (requires manual view)'],
              ['MedDRA / WHODrug Rank', 'score = 0.70 * cosine_sim(embed(term), embed(dict)) + 0.30 * trigram_sim', 'Returns Top-3 candidates; ≥ 0.92 auto-preselected as primary'],
              ['Duplicate Similarity', 'score = 0.30*drug + 0.30*event_pt + 0.25*patient_age_sex + 0.15*onset_date', '≥ 0.75 surfaces DuplicateCandidate card in Reviewer Console'],
              ['Regulatory Clock Due Date', 'due_at = day_zero_receipt_utc + (7 days if fatal/life_threatening else 15 days)', 'Calendar days (including weekends/holidays per ICH E2D)'],
              ['Part 11 Content Hash', 'sha256(canonical_json({case_id, version, accepted_fields, codes, narrative}))', 'Verified on POST /approve; mismatch raises PV-410']
            ]
          },
          {
            caption: 'Table 3.2 — Standardized PV-* Error Code Catalog',
            headers: ['Error Code', 'Category', 'HTTP / A2A Status', 'Retryable?', 'Handling Action'],
            rows: [
              ['PV-101', 'Ingestion', '422 Unprocessable', 'No', 'Corrupt/password-protected PDF; route to manual intake queue'],
              ['PV-210', 'Guardrail', '400 Blocked', 'No', 'Model Armor prompt injection detected; quarantine & alert SOC'],
              ['PV-220', 'Agent Output', 'RETRYABLE_ERROR', 'Yes (max 2×)', 'JSON schema or char-offset validation failed; run repair prompt'],
              ['PV-303', 'MCP Tool', '503 Unavailable', 'Yes (exp backoff)', 'Downstream Cloud SQL or Safety DB timeout; retry with Idempotency-Key'],
              ['PV-409', 'Concurrency', '409 Conflict', 'No', 'If-Match version mismatch; UI reloads latest case state'],
              ['PV-410', 'Part 11 Sign', '409 Stale Hash', 'No', 'Case modified since reviewer loaded screen; re-verify & sign again'],
              ['PV-411', 'Part 11 Auth', '401 Unauthorized', 'No', 'IdP re-authentication token missing, expired (>60s), or replayed JTI'],
              ['PV-412', 'E2B Gate', '422 Validation', 'No', 'One or more of the 200 ICH/FDA/EMA rules failed; fix highlighted field'],
              ['PV-501', 'Gateway ACK', '502 Bad Gateway', 'Yes / Alert P1', 'Negative ACK2/ACK3 from FDA/EMA; re-open clock & page PV Duty Lead']
            ]
          }
        ]
      }
    ]
  }
];
