# PromptCanvas Architecture Taxonomy

This document defines the canonical product taxonomy for PromptCanvas. It replaces a flat template-centric mental model with a semantic architecture model that supports architecture generation, document generation, assurance, traceability, and operational lifecycle management.

## Product model

**30 Blueprint Families** × **3 Architecture Levels** × **30 Supporting View Types** × **Technology/Cloud Variants** × **16 Document Types** × **Industry Accelerators** × **Architecture Assurance Frameworks**, all backed by one semantic architecture model with end-to-end traceability.

Lifecycle:

**Requirements → Architecture → L1 → L2 → L3 → Documents → Decisions → Implementation → Assurance → Tests → Evidence → Operations → Change → Architecture**

## Architecture Levels

| Level | Name | Question | Primary Audience | Canonical Content |
|---|---|---|---|---|
| L1 | Conceptual / Executive | What and why? | Executive, business, product | Actors, capabilities, systems, outcomes, major flows, boundaries |
| L2 | Logical / Solution | How does it work? | Architects, security, data/AI/platform leads | Components, responsibilities, interfaces, zones, data/control flows |
| L3 | Physical / Implementation | How exactly is it built? | Engineers, SRE, DevOps | Products/services, regions, networks, IAM, protocols, configuration, deployment, observability |

## 30 Blueprint Families

| ID | Domain | Blueprint Family | L1 | L2 | L3 | Primary Supporting Views | Common Variants | Primary Documents | Assurance |
|---|---|---|---|---|---|---|---|---|---|
| STR-01 | Strategy | Enterprise Conceptual & System Landscape | Actors, capabilities, systems, outcomes | Domains, applications, integrations, ownership | Systems, endpoints, platforms, dependencies | Current, Target, Unified | BRD, PRD, HLD, SDD, Executive Brief | TOGAF, Well-Architected, NIST |
| STR-02 | Strategy | Business Process & Value Stream | Journey, actors, value stages | Swimlanes, decisions, handoffs, systems | Workflow engines, APIs, queues, automation | As-Is, To-Be, VSM | BRD, PRD, FDD, Migration Design | Lean, Six Sigma, COBIT |
| STR-03 | Governance | AI Operating Model & Governance | Stakeholders, governance, accountability | RACI, risk tiers, HITL, approvals | Policies, IAM, audit, enforcement | HITL, AI CoE, Federated | BRD, AI Design, HLD, Assurance | NIST AI RMF, ISO 42001, AI TRiSM |
| STR-04 | Transformation | Cloud Migration & Modernization | Current estate, target, objectives | 6Rs, waves, dependencies, coexistence | Replication, cutover, migration implementation | 6R, Strangler, Replatform | BRD, HLD, Migration Design, Runbook | CAF, Well-Architected, NIST |
| STR-05 | FinOps | FinOps & Cloud Economics | Spend, value, accountability | Allocation, budgets, optimization | Billing exports, labels, dashboards, automation | Showback, Chargeback | BRD, HLD, Executive Brief | FinOps Framework, Well-Architected Cost |
| APP-01 | Application | Application & Service Architecture | Users, systems, capabilities | Containers/services, APIs, stores | Runtime services, endpoints, databases, queues | Monolith, Microservices, Modular | PRD, FDD, HLD, LLD, SDD, TDD | OWASP, Well-Architected, NIST |
| APP-02 | Application | Serverless Application Architecture | User, app, backend, data | API, functions/services, events, identity | Cloud runtime, gateway, IAM, scaling | API, Web, Event | PRD, HLD, LLD, TDD | Well-Architected, OWASP |
| APP-03 | Integration | Event-Driven Architecture & Event Mesh | Producers, events, consumers | Topics, schemas, routing, retries, DLQ | Broker configuration, partitions, replay | Pub/Sub, Kafka, EventBridge | FDD, HLD, LLD, TDD | Well-Architected, AsyncAPI, NIST |
| APP-04 | Experience | Frontend & Digital Experience | Users, channels, experiences | Shell, micro-frontends, BFFs, identity | Hosting, federation, CDN, telemetry | SPA, Micro-frontend, Mobile | PRD, FDD, HLD, LLD | OWASP, WCAG |
| APP-05 | DevSecOps | DevSecOps & Software Delivery | Code→build→validate→release→operate | CI/CD stages, environments, approvals | Triggers, runners, registries, signing, deployment | GitOps, Canary, Blue-Green, Security-Gated | HLD, LLD, TDD, Security Design, Runbook | SLSA, SSDF, CIS, OWASP |
| CLD-01 | Cloud | Cloud Foundation & Secure Deployment | Cloud boundaries, workloads, connectivity | Landing zones, projects/accounts, network zones | VPCs, subnets, routes, NAT, firewalls, DNS | Single, Multi-project, Hub-Spoke | HLD, LLD, Security Design, SDD | CIS, NIST, Well-Architected, CSA CCM |
| CLD-02 | Resilience | HA, Resilience & Disaster Recovery | Critical services, regions, RTO/RPO | Failure domains, replication, failover | Multi-region resources, DNS, backups, automation | Active-Active, Active-Passive, Backup-Restore | HLD, LLD, DR/BCP, Runbook | ISO 22301, Well-Architected Reliability |
| SEC-01 | Security | Identity, Federation & Access | Humans, workloads, identity providers | Federation, RBAC/ABAC, privileged access | SAML/OIDC, service accounts, workload identity | Workforce, Customer, Workload | Security Design, HLD, LLD, SDD | Zero Trust, NIST 800-63, CIS |
| SEC-02 | Security | Sovereignty & Data Residency | Jurisdictions, data classes, residency | Regional processing, cross-border flow | Regions, CMEK/EKM, policy enforcement | Sovereign, Regional, Global | Security Design, Data Design, HLD | GDPR, HIPAA, NIST |
| OPS-01 | Operations | SRE, Reliability & Observability | Services, users, reliability objectives | SLIs/SLOs, telemetry, incidents | Logs, metrics, traces, alerts, runbooks | Logs, Metrics, Traces, SLO | HLD, LLD, Runbook, Assurance | SRE, DORA, Well-Architected |
| OPS-02 | Operations | Operational Readiness & Go-Live | Go-live stages, owners, gates | Cutover waves, go/no-go, rollback | Scripts, validation, war room, reconciliation | Big Bang, Phased, Blue-Green | Runbook, HLD, Migration Design | ITIL, COBIT |
| DAT-01 | Data | Enterprise Data Platform & Lakehouse | Sources→platform→consumers | Ingestion, storage, processing, serving | Tables, pipelines, formats, compute, IAM | Lakehouse, Warehouse, Mesh | Data Design, HLD, LLD, SDD | DAMA, Well-Architected, NIST |
| DAT-02 | Data | Data Modeling & Information Architecture | Concepts and subject areas | Logical entities, relationships, facts/dimensions | Tables, columns, PK/FK, partitions | Dimensional, 3NF, Data Vault | FDD, Data Design, LLD, TDD | DAMA |
| DAT-03 | Data | Streaming & Real-Time Analytics | Sources→real-time insight/action | Ingestion, processing, state, serving | Topics, partitions, windows, offsets, stores | Streaming, CDC, IoT | Data Design, HLD, LLD, TDD | Well-Architected, AsyncAPI |
| DAT-04 | Data Governance | Data Governance, Catalog & Access | Domains, owners, sensitive data | Catalog, classification, lineage, access | Tags, policies, masking, row/column security | Central, Federated | Data Design, Security Design, HLD | DAMA, NIST, GDPR, HIPAA |
| DAT-05 | DataOps | DataOps, Quality & Observability | Data products, quality objectives | Contracts, tests, anomalies, ownership | Rules, monitors, quarantine, reprocessing | Batch, Streaming, Data Product | Data Design, LLD, Runbook | DAMA, DataOps |
| AI-01 | GenAI | Agentic RAG & Enterprise Knowledge | User→AI→knowledge→grounded answer | Ingestion, retrieval, reranking, generation | Embeddings, vector DB, prompts, retrieval params | Basic RAG, Agentic RAG, Graph RAG | AI Design, HLD, LLD, TDD | NIST AI RMF, OWASP LLM, AI TRiSM |
| AI-02 | Agentic AI | Multi-Agent Orchestration & Agent Mesh | Business objective and agent roles | Supervisor, DAG, hub-spoke, swarm | Framework state, messages, retries, checkpoints | Supervisor, DAG, Hub-Spoke, Swarm | AI Design, HLD, LLD, TDD | NIST AI RMF, OWASP Agentic |
| AI-03 | Agentic Platform | Enterprise Agent Runtime & Harness | Agent platform and users | Runtime, memory, sessions, tools, policy | Containers, queues, stores, sandbox, telemetry | Serverless, Kubernetes | AI Design, HLD, LLD, SDD | NIST AI RMF, CIS, SRE |
| AI-04 | Agent Integration | MCP & Tool Integration | Agents and enterprise tools | MCP gateway, servers, registry, policy | Tool schemas, OAuth, transport, secrets | MCP, A2A, REST, gRPC | AI Design, HLD, LLD, Security Design | OWASP Agentic, Zero Trust |
| AI-05 | AI Platform | Multi-Tenant AI Platform | Tenants and shared platform | Control plane/data plane, quotas, isolation | Tenant routing, keys, endpoints, stores | Shared, Dedicated, Hybrid | PRD, HLD, LLD, Security Design | CIS, NIST, SaaS isolation controls |
| AI-06 | AI Governance | AI Trust, Risk, Guardrails & Evaluation | Risks, models, humans, controls | Guardrails, HITL, evaluation, red team | Filters, eval datasets, thresholds, judge models | TRiSM, LLM Judge, HITL, Red Team | AI Design, Security Design, Assurance | NIST AI RMF, ISO 42001, OWASP LLM, AI TRiSM |
| IND-01 | Industry—Finance | Real-Time Payments & Transaction Architecture | Customer, bank, network, clearing | Payment orchestration, fraud, ledger | ISO 20022, HSM, message flows, settlement | Real-Time, Batch, Cross-Border | HLD, LLD, Security Design, TDD | PCI DSS, ISO 20022, NIST |
| IND-02 | Industry—HCLS | Genomics & Clinical Bioinformatics | Patient/specimen→analysis→clinical use | QC, alignment, variant calling, annotation | FASTQ/BAM/VCF, workflow engine, compute | Clinical, Research, Hybrid | Data Design, HLD, LLD, TDD | HIPAA, GxP where applicable, NIST |
| IND-03 | Industry—Supply Chain | Supply Chain, Fleet & IoT | Devices/assets→operations→outcomes | Edge, telemetry, digital twin, optimization | MQTT, device certs, time series, OTA | Fleet, Factory, Logistics | HLD, LLD, Data Design, TDD | IEC 62443, NIST IoT |

## 30 Supporting View Types

| ID | View | Typical Level |
|---|---|---|
| V01 | System Context | L1 |
| V02 | Capability Map | L1 |
| V03 | Business Process / Swimlane | L1/L2 |
| V04 | Value Stream Map | L1 |
| V05 | As-Is vs To-Be | L1/L2 |
| V06 | C4 System Context | L1 |
| V07 | C4 Container | L2 |
| V08 | Component Architecture | L2/L3 |
| V09 | Data Flow Diagram | L1/L2/L3 |
| V10 | Integration Architecture | L2 |
| V11 | Sequence Diagram | L2/L3 |
| V12 | State Machine | L2/L3 |
| V13 | Decision Flow | L1/L2 |
| V14 | ERD / Data Model | L2/L3 |
| V15 | Network Topology | L2/L3 |
| V16 | Deployment Architecture | L2/L3 |
| V17 | IAM / Identity Flow | L2/L3 |
| V18 | Security / Trust Boundary | L2/L3 |
| V19 | HA / DR | L2/L3 |
| V20 | CI/CD Flow | L2/L3 |
| V21 | Observability | L2/L3 |
| V22 | Migration / Transition | L1/L2 |
| V23 | Agent Interaction | L1/L2 |
| V24 | RAG Flow | L2/L3 |
| V25 | MCP / Tool Interaction | L2/L3 |
| V26 | HITL / Governance | L1/L2 |
| V27 | Threat Model | L2/L3 |
| V28 | Failure / Exception Flow | L2/L3 |
| V29 | Cutover / Runbook Flow | L3 |
| V30 | FinOps / Cost Flow | L1/L2 |

## 16 Document Types

| ID | Document | Typical Levels | Required / Core Views |
|---|---|---|---|
| DOC-01 | BRD | L1 | Context, Process, Capability, As-Is/To-Be |
| DOC-02 | PRD | L1/L2 | Product Context, Journey, Logical Solution |
| DOC-03 | FDD | L2 | Functional Flow, Sequence, Data Flow, Decision |
| DOC-04 | HLD | L1/L2 | Context, Solution, Integration, Security, Deployment |
| DOC-05 | LLD | L2/L3 | Components, Sequence, Network, IAM, Deployment |
| DOC-06 | SDD | L1/L2/L3 | End-to-end System Architecture |
| DOC-07 | TDD | L2/L3 | Components, APIs, Data, Deployment |
| DOC-08 | Executive Architecture Brief | L1 | Context, Target State, Outcomes |
| DOC-09 | ADR | L1/L2 | Decision Context, Options, Selected Design |
| DOC-10 | Security Design | L2/L3 | Trust, IAM, Network, Threat Model |
| DOC-11 | Data Design | L1/L2/L3 | Data Flow, Model, Governance |
| DOC-12 | AI / Agentic Design | L1/L2/L3 | Agent/RAG/MCP/Guardrails |
| DOC-13 | Migration Design | L1/L2/L3 | As-Is, Target, Transition, Cutover |
| DOC-14 | DR / BCP Design | L1/L2/L3 | Resilience, Failover, Recovery |
| DOC-15 | Operational Runbook | L2/L3 | Operations, Failure, Escalation |
| DOC-16 | Architecture Assurance Report | L1/L2/L3 | Findings mapped to architecture |

## Technology / Cloud Variant Layer

Variants are selectors on a blueprint family, not independent blueprint families.

- Cloud: Generic, GCP, AWS, Azure, OCI
- Environment: On-Prem, Hybrid, Multi-Cloud
- Compute: VM, Kubernetes, Serverless, Managed PaaS
- Data: BigQuery, Databricks, Snowflake, Redshift, Fabric
- Integration: REST, gRPC, GraphQL, Kafka, Pub/Sub, EventBridge
- AI: Vertex AI, OpenAI, Azure OpenAI, Bedrock, Anthropic
- Agent framework: ADK, LangGraph, CrewAI, Semantic Kernel, Generic
- CI/CD: Cloud Build, GitHub Actions, GitLab, Jenkins, Azure DevOps
- Identity: Cloud IAM, Entra ID, Okta, Ping, Auth0
- Observability: Cloud Monitoring, Datadog, Splunk, Grafana, New Relic
- Deployment: Rolling, Canary, Blue-Green, GitOps
- Tenancy: Shared, Dedicated, Hybrid
- Resilience: Single Region, Multi-AZ, Active-Active, Active-Passive
- Connectivity: Public, Private, VPN, Interconnect/ExpressRoute/Direct Connect

## Industry Accelerators

Industry accelerators compose reusable families rather than creating a new architecture primitive for every industry use case.

- Financial Services / Payments: APP-03, DAT-03, SEC-01, CLD-02, IND-01
- Healthcare & Life Sciences: DAT-01, DAT-02, DAT-04, AI-01, SEC-02, IND-02
- Manufacturing / Supply Chain / IoT: APP-03, DAT-03, CLD-01, OPS-01, IND-03
- Pharma / Clinical AI: AI-01, AI-02, AI-06, DAT-04, SEC-02
- Retail / Ecommerce: APP-01, APP-03, APP-04, DAT-03
- Telecom: APP-03, DAT-03, OPS-01, CLD-01
- Public Sector: CLD-01, SEC-01, SEC-02, OPS-01
- SaaS / ISV: APP-01, AI-05, CLD-01, APP-05

## Assurance Framework Layer

- Cloud Architecture: Google Cloud Well-Architected, AWS Well-Architected, Azure Well-Architected
- Enterprise Architecture: TOGAF
- Cybersecurity: NIST CSF, NIST 800-53, CIS Controls
- Zero Trust: NIST 800-207
- Application Security: OWASP ASVS, OWASP Top 10
- GenAI Security: OWASP Top 10 for LLM Applications
- AI Risk: NIST AI RMF
- AI Management: ISO/IEC 42001
- AI Governance: AI TRiSM concepts
- Software Supply Chain: SLSA, NIST SSDF
- Resilience: ISO 22301
- Service Management: ITIL
- Data Governance: DAMA-DMBOK
- Cost Management: FinOps Framework
- Privacy / Residency: GDPR and applicable regional regulations
- Healthcare: HIPAA; GxP controls where applicable
- Payments: PCI DSS
- Industrial / OT: IEC 62443
- Accessibility: WCAG

## Semantic Architecture Model

The architecture graph is the source of truth. Diagrams and documents are views over the same semantic objects.

```text
Project
├── Requirements
│   ├── BusinessRequirement
│   ├── ProductRequirement
│   ├── FunctionalRequirement
│   └── NonFunctionalRequirement
├── Architecture
│   ├── Actor
│   ├── Capability
│   ├── System
│   ├── Component
│   ├── Service
│   ├── Interface
│   ├── API
│   ├── Event
│   ├── DataAsset
│   ├── NetworkZone
│   ├── Identity
│   ├── Control
│   └── Flow
├── Views
│   ├── BlueprintFamily
│   ├── ArchitectureLevel
│   └── SupportingView
├── Documents
├── Decisions
│   └── ADR
├── Assurance
│   ├── Framework
│   ├── Rule
│   ├── Finding
│   ├── Risk
│   ├── Control
│   └── Recommendation
├── Implementation
│   ├── Code
│   ├── Infrastructure
│   ├── Pipeline
│   ├── Configuration
│   └── Deployment
├── Validation
│   ├── Test
│   └── Evidence
└── Operations
    ├── SLO
    ├── Alert
    ├── Runbook
    ├── Incident
    └── Change
```

## Traceability

Canonical relationship chain:

`Requirement → Architecture Component → Architecture View → Document Section → Decision → Implementation Artifact → Control → Test → Evidence → Runbook / Operation`

Traceability must be bidirectional so the product can answer both:

- Why does this architecture element exist?
- What is impacted if this architecture element changes?

## Conditional Diagram / Document Rules

The document generator should select views based on architecture metadata.

| Condition | Add |
|---|---|
| uses_ai = true | AI Trust & Guardrails L2 |
| uses_agents = true | Agent Interaction L2 |
| uses_rag = true | RAG Architecture L2/L3 |
| uses_mcp = true | MCP Integration L2/L3 |
| human_approval = true | HITL Flow |
| sensitive_data = true | Data Governance + Security |
| pii_phi = true | Data Flow + Trust Boundaries + IAM |
| multi_region = true | HA/DR |
| internet_facing = true | Security + Network |
| hybrid_cloud = true | Hybrid Connectivity |
| event_driven = true | Event Architecture |
| streaming = true | Streaming Architecture |
| multi_tenant = true | Tenant Isolation |
| production = true | CI/CD + Observability + SRE |
| migration = true | As-Is + To-Be + Transition |
| high_risk_ai = true | Guardrails + Evaluation + HITL |
| regulated = true | Governance + Residency + Audit |

## Product Navigation Model

Create:
- Architecture: From Blueprint, From Requirements, From Prompt, Import Existing Architecture
- Document: BRD, PRD, FDD, HLD, LLD, SDD, TDD, Security, Data, AI/Agent, Migration, DR/BCP, Runbook, Executive Brief
- Assess: Architecture Review, Security Review, Well-Architected Review, AI Risk Review, Cost Review, Production Readiness
- Explore: Blueprint Families, Industry Accelerators, Architecture Patterns, Technology Catalog, Reference Architectures

## Canonical lifecycle

1. Requirements
2. Architecture semantic model
3. L1 Conceptual
4. L2 Logical / Solution
5. L3 Physical / Implementation
6. Documents
7. Decisions / ADRs
8. Implementation
9. Assurance
10. Tests
11. Evidence
12. Operations
13. Change impact
14. Architecture refresh
