/**
 * 🏛️ ENTERPRISE ARCHITECTURE LINEAGE & HIERARCHY REGISTRY
 * Maps the 32 Canonical WBS Master Blueprints (Phases 1-5) and Separate Industry Specialized Blueprints.
 */

export interface BlueprintLineage {
  uniqueId: string;           // e.g. "P4-DAT-P-09", "IND-PHARMA-01"
  canonicalWbsId: string;     // e.g. "P4-DAT-P-09_multimodal_ingestion_flow"
  canonicalArchId: string;    // e.g. "tech_multimodal_ingestion"
  name: string;
  phaseId: string;            // "P1" | "P2" | "P3" | "P4" | "P5" | "IND"
  phaseTitle: string;         // e.g. "Phase 4: Platform Engineering & Intelligence"
  layer: 'Conceptual' | 'Logical' | 'Physical' | 'Industry';
  layerCode: '-C-' | '-L-' | '-P-' | '-IND-';
  domain: string;             // e.g. "Data & Ingestion", "AI & ML", "Security & IAM"
  isIndustrySpecialized: boolean;
  industryName?: string;      // e.g. "Pharma & Life Sciences", "Autonomous Supply Chain"
  lineageBreadcrumb: string[];// ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "Data & Ingestion", "P4-DAT-P-09"]
}

export const BLUEPRINT_LINEAGE_REGISTRY: Record<string, BlueprintLineage> = {
  // ==========================================
  // PHASE 1: FOUNDATION & DISCOVERY
  // ==========================================
  "hybrid_strangler_transition": {
    uniqueId: "P1-APP-L-01",
    canonicalWbsId: "P1-APP-L-01_strangler_fig_migration",
    canonicalArchId: "hybrid_strangler_transition",
    name: "Strangler Fig Legacy Modernization & Coexistence",
    phaseId: "P1",
    phaseTitle: "Phase 1: Foundation & Discovery",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Application Migration",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 1: Foundation & Discovery", "Logical Layer (-L-)", "Application Migration", "P1-APP-L-01"]
  },
  "value_stream_map": {
    uniqueId: "P1-GOV-C-02",
    canonicalWbsId: "P1-GOV-C-02_value_stream_map",
    canonicalArchId: "value_stream_map",
    name: "Enterprise Value Stream Map",
    phaseId: "P1",
    phaseTitle: "Phase 1: Foundation & Discovery",
    layer: "Conceptual",
    layerCode: "-C-",
    domain: "Governance & Value Stream",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 1: Foundation & Discovery", "Conceptual Layer (-C-)", "Governance & Value Stream", "P1-GOV-C-02"]
  },
  "asis_vs_tobe_process_flow": {
    uniqueId: "P1-GOV-C-03",
    canonicalWbsId: "P1-GOV-C-03_asis_vs_tobe_process_flow",
    canonicalArchId: "asis_vs_tobe_process_flow",
    name: "As-Is vs. To-Be Process Transformation Flow",
    phaseId: "P1",
    phaseTitle: "Phase 1: Foundation & Discovery",
    layer: "Conceptual",
    layerCode: "-C-",
    domain: "Business Architecture",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 1: Foundation & Discovery", "Conceptual Layer (-C-)", "Business Architecture", "P1-GOV-C-03"]
  },

  // ==========================================
  // PHASE 2: STRATEGY & ECONOMICS
  // ==========================================
  "cloud_finops_chargeback": {
    uniqueId: "P2-GOV-C-03",
    canonicalWbsId: "P2-GOV-C-03_cloud_finops_chargeback",
    canonicalArchId: "cloud_finops_chargeback",
    name: "Cloud FinOps & Unit Economics Chargeback",
    phaseId: "P2",
    phaseTitle: "Phase 2: Strategy, Economics & Cloud Transformation",
    layer: "Conceptual",
    layerCode: "-C-",
    domain: "FinOps & Economics",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 2: Strategy & Economics", "Conceptual Layer (-C-)", "FinOps & Economics", "P2-GOV-C-03"]
  },

  // ==========================================
  // PHASE 3: CORE AI, DATA & INTEGRATION
  // ==========================================
  "unified_system_view": {
    uniqueId: "P3-APP-C-01",
    canonicalWbsId: "P3-APP-C-01_unified_system_view",
    canonicalArchId: "unified_system_view",
    name: "Unified System Architecture View",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Conceptual",
    layerCode: "-C-",
    domain: "Core Architecture",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Conceptual Layer (-C-)", "Core Architecture", "P3-APP-C-01"]
  },
  "agentic_rag": {
    uniqueId: "P3-AI-L-02",
    canonicalWbsId: "P3-AI-L-02_agentic_rag_grounding",
    canonicalArchId: "agentic_rag",
    name: "Cognitive Agentic RAG & Knowledge Grounding",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "AI & Knowledge Retrieval",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "AI & Knowledge Retrieval", "P3-AI-L-02"]
  },
  "hub_and_spoke_agent_config": {
    uniqueId: "P3-AI-L-03",
    canonicalWbsId: "P3-AI-L-03_hub_and_spoke_agent_mesh",
    canonicalArchId: "hub_and_spoke_agent_config",
    name: "Hub-and-Spoke Agent Configuration Mesh",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "AI Agent Orchestration",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "AI Agent Orchestration", "P3-AI-L-03"]
  },
  "tech_data_lakehouse_gcp": {
    uniqueId: "P3-DAT-L-04",
    canonicalWbsId: "P3-DAT-L-04_modern_data_stack_architecture",
    canonicalArchId: "tech_data_lakehouse_gcp",
    name: "Modern Data Stack & GCP Lakehouse",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Data & Storage",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "Data & Storage", "P3-DAT-L-04"]
  },
  "erd": {
    uniqueId: "P3-DAT-L-05",
    canonicalWbsId: "P3-DAT-L-05_enterprise_data_model_erd",
    canonicalArchId: "erd",
    name: "Enterprise Data Model (Crow's Foot ERD)",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Data Modeling",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "Data Modeling", "P3-DAT-L-05"]
  },
  "unified_data_governance": {
    uniqueId: "P3-DAT-C-06",
    canonicalWbsId: "P3-DAT-C-06_unified_data_governance",
    canonicalArchId: "unified_data_governance",
    name: "Unified Data Governance & Access Control",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Conceptual",
    layerCode: "-C-",
    domain: "Data Governance",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Conceptual Layer (-C-)", "Data Governance", "P3-DAT-C-06"]
  },
  "federated_iam_sso": {
    uniqueId: "P3-SEC-L-07",
    canonicalWbsId: "P3-SEC-L-07_federated_iam_sso",
    canonicalArchId: "federated_iam_sso",
    name: "Google Cloud Federated IAM & SSO",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Security & Zero-Trust",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "Security & Zero-Trust", "P3-SEC-L-07"]
  },
  "tech_micro_frontends": {
    uniqueId: "P3-APP-L-08",
    canonicalWbsId: "P3-APP-L-08_micro_frontends_ui",
    canonicalArchId: "tech_micro_frontends",
    name: "Micro-Frontend & Modular UI Presentation",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Frontend Architecture",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "Frontend Architecture", "P3-APP-L-08"]
  },
  "logical_ai_config_tenant": {
    uniqueId: "P3-GOV-L-09",
    canonicalWbsId: "P3-GOV-L-09_logical_ai_config_tenant",
    canonicalArchId: "logical_ai_config_tenant",
    name: "Logical AI Multi-Tenant Architecture",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Tenancy & Config",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "Tenancy & Config", "P3-GOV-L-09"]
  },
  "sequence_diagram": {
    uniqueId: "P3-APP-L-10",
    canonicalWbsId: "P3-APP-L-10_multi_agent_sequence_flow",
    canonicalArchId: "sequence_diagram",
    name: "Multi-Agent Execution Lifeline Sequence",
    phaseId: "P3",
    phaseTitle: "Phase 3: Core AI, Data & Integration Architecture",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Execution Flow",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 3: Core AI & Data", "Logical Layer (-L-)", "Execution Flow", "P3-APP-L-10"]
  },

  // ==========================================
  // PHASE 4: PLATFORM ENGINEERING & INTELLIGENCE
  // ==========================================
  "secure_deployment_map": {
    uniqueId: "P4-SEC-P-01",
    canonicalWbsId: "P4-SEC-P-01_secure_deployment_map",
    canonicalArchId: "secure_deployment_map",
    name: "Production Zero-Trust Kubernetes & Network Perimeter",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Physical",
    layerCode: "-P-",
    domain: "Infrastructure Security",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "Infrastructure Security", "P4-SEC-P-01"]
  },
  "data_residency_sovereign_map": {
    uniqueId: "P4-SEC-P-02",
    canonicalWbsId: "P4-SEC-P-02_data_residency_sovereign_map",
    canonicalArchId: "data_residency_sovereign_map",
    name: "Data Residency & Sovereign Cloud Map",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Physical",
    layerCode: "-P-",
    domain: "Sovereign Cloud & Compliance",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "Sovereign Cloud & Compliance", "P4-SEC-P-02"]
  },
  "tech_agentic_mesh": {
    uniqueId: "P4-AI-P-03",
    canonicalWbsId: "P4-AI-P-03_tech_agentic_mesh",
    canonicalArchId: "tech_agentic_mesh",
    name: "Agentic Mesh & Multi-Agent Swarm Orchestration",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Physical",
    layerCode: "-P-",
    domain: "AI Mesh & Swarm",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "AI Mesh & Swarm", "P4-AI-P-03"]
  },
  "tech_eval_safety": {
    uniqueId: "P4-GOV-L-04",
    canonicalWbsId: "P4-GOV-L-04_tech_eval_safety",
    canonicalArchId: "tech_eval_safety",
    name: "LLM-as-a-Judge AI Safety & Benchmarking Platform",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Logical",
    layerCode: "-L-",
    domain: "AI Safety & Evaluation",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Logical Layer (-L-)", "AI Safety & Evaluation", "P4-GOV-L-04"]
  },
  "tech_ai_trism_guardrails": {
    uniqueId: "P4-GOV-L-05",
    canonicalWbsId: "P4-GOV-L-05_tech_ai_trism_guardrails",
    canonicalArchId: "tech_ai_trism_guardrails",
    name: "AI TRiSM Security Guardrail Pipeline",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Logical",
    layerCode: "-L-",
    domain: "AI Security & Guardrails",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Logical Layer (-L-)", "AI Security & Guardrails", "P4-GOV-L-05"]
  },
  "devops_cicd_pipeline": {
    uniqueId: "P4-GOV-P-06",
    canonicalWbsId: "P4-GOV-P-06_devops_cicd_pipeline",
    canonicalArchId: "devops_cicd_pipeline",
    name: "Enterprise DevSecOps Polyrepo CI/CD Pipeline",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Physical",
    layerCode: "-P-",
    domain: "DevSecOps & CI/CD",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "DevSecOps & CI/CD", "P4-GOV-P-06"]
  },
  "tech_event_driven_eda": {
    uniqueId: "P4-APP-L-07",
    canonicalWbsId: "P4-APP-L-07_tech_event_driven_eda",
    canonicalArchId: "tech_event_driven_eda",
    name: "Event-Driven Architecture (EDA) & Kafka Event Mesh",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Event Mesh & Messaging",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Logical Layer (-L-)", "Event Mesh & Messaging", "P4-APP-L-07"]
  },
  "tech_serverless_gcp": {
    uniqueId: "P4-APP-L-08",
    canonicalWbsId: "P4-APP-L-08_tech_serverless_gcp",
    canonicalArchId: "tech_serverless_gcp",
    name: "Google Cloud Serverless Microservices Platform",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Serverless & Microservices",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Logical Layer (-L-)", "Serverless & Microservices", "P4-APP-L-08"]
  },
  "tech_multimodal_ingestion": {
    uniqueId: "P4-DAT-P-09",
    canonicalWbsId: "P4-DAT-P-09_multimodal_ingestion_flow",
    canonicalArchId: "tech_multimodal_ingestion",
    name: "Agentic Multi-Modal Ingestion Flow",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Physical",
    layerCode: "-P-",
    domain: "Data & Ingestion",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "Data & Ingestion", "P4-DAT-P-09"]
  },
  "tech_streaming_analytics": {
    uniqueId: "P4-DAT-P-10",
    canonicalWbsId: "P4-DAT-P-10_tech_streaming_analytics",
    canonicalArchId: "tech_streaming_analytics",
    name: "Real-Time Streaming Analytics & Telemetry Pipeline",
    phaseId: "P4",
    phaseTitle: "Phase 4: Platform Engineering, Mesh & Real-Time Intelligence",
    layer: "Physical",
    layerCode: "-P-",
    domain: "Streaming & Analytics",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 4: Platform Engineering", "Physical Layer (-P-)", "Streaming & Analytics", "P4-DAT-P-10"]
  },

  // ==========================================
  // PHASE 5: OPERATIONS & RELIABILITY
  // ==========================================
  "six_rs_migration_matrix": {
    uniqueId: "P5-APP-L-01",
    canonicalWbsId: "P5-APP-L-01_six_rs_migration_matrix",
    canonicalArchId: "six_rs_migration_matrix",
    name: "AWS 6-Rs Cloud Migration Matrix",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Cloud Migration Strategy",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Logical Layer (-L-)", "Cloud Migration Strategy", "P5-APP-L-01"]
  },
  "golive_warroom_runbook": {
    uniqueId: "P5-GOV-P-03",
    canonicalWbsId: "P5-GOV-P-03_golive_warroom_runbook",
    canonicalArchId: "golive_warroom_runbook",
    name: "Day-1 Cutover Go-Live War Room Runbook",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Physical",
    layerCode: "-P-",
    domain: "Release & Cutover",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Physical Layer (-P-)", "Release & Cutover", "P5-GOV-P-03"]
  },
  "enterprise_sre_observability": {
    uniqueId: "P5-GOV-L-04",
    canonicalWbsId: "P5-GOV-L-04_incident_triage_escalation",
    canonicalArchId: "enterprise_sre_observability",
    name: "Enterprise SRE Observability & Incident Triage",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Logical",
    layerCode: "-L-",
    domain: "SRE & Incident Management",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Logical Layer (-L-)", "SRE & Incident Management", "P5-GOV-L-04"]
  },
  "tech_llm_capacity_quota": {
    uniqueId: "P5-AI-L-05",
    canonicalWbsId: "P5-AI-L-05_llm_capacity_quota_management",
    canonicalArchId: "tech_llm_capacity_quota",
    name: "LLM Capacity & Quota Management Topology",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Logical",
    layerCode: "-L-",
    domain: "AI Capacity & Quota",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Logical Layer (-L-)", "AI Capacity & Quota", "P5-AI-L-05"]
  },
  "ai_coe_operating_model": {
    uniqueId: "P5-AI-L-06",
    canonicalWbsId: "P5-AI-L-06_ai_coe_operating_model",
    canonicalArchId: "ai_coe_operating_model",
    name: "AI Center of Excellence (CoE) Operating Model",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Logical",
    layerCode: "-L-",
    domain: "AI Governance & CoE",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Logical Layer (-L-)", "AI Governance & CoE", "P5-AI-L-06"]
  },
  "tech_llmops_lifecycle": {
    uniqueId: "P5-AI-P-07",
    canonicalWbsId: "P5-AI-P-07_tech_llmops_lifecycle",
    canonicalArchId: "tech_llmops_lifecycle",
    name: "LLMOps Prompt Lifecycle & Model Operations",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Physical",
    layerCode: "-P-",
    domain: "LLMOps & Model Lifecycle",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Physical Layer (-P-)", "LLMOps & Model Lifecycle", "P5-AI-P-07"]
  },
  "dataops_anomaly_detection": {
    uniqueId: "P5-DAT-P-08",
    canonicalWbsId: "P5-DAT-P-08_dataops_anomaly_detection",
    canonicalArchId: "dataops_anomaly_detection",
    name: "DataOps & Anomaly Detection Control Plane",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Physical",
    layerCode: "-P-",
    domain: "DataOps & Reliability",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Physical Layer (-P-)", "DataOps & Reliability", "P5-DAT-P-08"]
  },
  "tech_multi_region_dr": {
    uniqueId: "P5-GOV-P-09",
    canonicalWbsId: "P5-GOV-P-09_tech_multi_region_dr",
    canonicalArchId: "tech_multi_region_dr",
    name: "Multi-Region Active-Active Disaster Recovery",
    phaseId: "P5",
    phaseTitle: "Phase 5: Operations, Reliability & Day-2 Governance",
    layer: "Physical",
    layerCode: "-P-",
    domain: "Resilience & DR",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Phase 5: Operations & Reliability", "Physical Layer (-P-)", "Resilience & DR", "P5-GOV-P-09"]
  },

  // ==========================================
  // SEPARATE INDUSTRY SPECIALIZED BLUEPRINTS
  // ==========================================
  "tech_genomics_clinical": {
    uniqueId: "IND-PHARMA-01",
    canonicalWbsId: "IND-PHARMA-01_pharma_genomics_pipeline",
    canonicalArchId: "tech_genomics_clinical",
    name: "Pharma-Specific Genomics & Drug Discovery Pipeline",
    phaseId: "IND",
    phaseTitle: "Industry Specialized Solutions",
    layer: "Industry",
    layerCode: "-IND-",
    domain: "Pharma & Life Sciences",
    isIndustrySpecialized: true,
    industryName: "Pharma & Healthcare",
    lineageBreadcrumb: ["Industry Solutions", "Pharma & Healthcare", "Genomics & Drug Discovery", "IND-PHARMA-01"]
  },
  "tech_supply_chain": {
    uniqueId: "IND-SUPPLY-02",
    canonicalWbsId: "IND-SUPPLY-02_autonomous_supply_chain",
    canonicalArchId: "tech_supply_chain",
    name: "QuantumFlow Global Autonomous Supply Chain & Logistics",
    phaseId: "IND",
    phaseTitle: "Industry Specialized Solutions",
    layer: "Industry",
    layerCode: "-IND-",
    domain: "Supply Chain & Logistics",
    isIndustrySpecialized: true,
    industryName: "Supply Chain & Logistics",
    lineageBreadcrumb: ["Industry Solutions", "Supply Chain & Logistics", "Autonomous Logistics", "IND-SUPPLY-02"]
  },
  "tech_fintech_payments": {
    uniqueId: "IND-FINTECH-03",
    canonicalWbsId: "IND-FINTECH-03_realtime_payments_iso20022",
    canonicalArchId: "tech_fintech_payments",
    name: "ApexPay Real-Time ISO 20022 Payments & Settlement Clearing",
    phaseId: "IND",
    phaseTitle: "Industry Specialized Solutions",
    layer: "Industry",
    layerCode: "-IND-",
    domain: "Financial Services & Banking",
    isIndustrySpecialized: true,
    industryName: "FinTech & Banking",
    lineageBreadcrumb: ["Industry Solutions", "FinTech & Banking", "ISO 20022 Payments", "IND-FINTECH-03"]
  },
  "tech_ecommerce_retail": {
    uniqueId: "IND-RETAIL-04",
    canonicalWbsId: "IND-RETAIL-04_omnichannel_ecommerce_retail",
    canonicalArchId: "tech_ecommerce_retail",
    name: "OmniChannel Intelligent E-Commerce Commerce Platform",
    phaseId: "IND",
    phaseTitle: "Industry Specialized Solutions",
    layer: "Industry",
    layerCode: "-IND-",
    domain: "Retail & E-Commerce",
    isIndustrySpecialized: true,
    industryName: "Retail & E-Commerce",
    lineageBreadcrumb: ["Industry Solutions", "Retail & E-Commerce", "OmniChannel Commerce", "IND-RETAIL-04"]
  },
  "tech_manufacturing_iot": {
    uniqueId: "IND-MFG-05",
    canonicalWbsId: "IND-MFG-05_smart_manufacturing_iot",
    canonicalArchId: "tech_manufacturing_iot",
    name: "Smart Factory Industry 4.0 IoT & Predictive Maintenance",
    phaseId: "IND",
    phaseTitle: "Industry Specialized Solutions",
    layer: "Industry",
    layerCode: "-IND-",
    domain: "Manufacturing & Industrial IoT",
    isIndustrySpecialized: true,
    industryName: "Manufacturing & IoT",
    lineageBreadcrumb: ["Industry Solutions", "Manufacturing & IoT", "Smart Factory IoT", "IND-MFG-05"]
  },
  "tech_hr_talent_ai": {
    uniqueId: "IND-HR-06",
    canonicalWbsId: "IND-HR-06_workforce_talent_ai",
    canonicalArchId: "tech_hr_talent_ai",
    name: "WorkforceAI Enterprise HR Talent & People Intelligence",
    phaseId: "IND",
    phaseTitle: "Industry Specialized Solutions",
    layer: "Industry",
    layerCode: "-IND-",
    domain: "Human Resources (HR) & People AI",
    isIndustrySpecialized: true,
    industryName: "Human Resources & Talent",
    lineageBreadcrumb: ["Industry Solutions", "Human Resources & Talent", "People Intelligence AI", "IND-HR-06"]
  }
};

export function getBlueprintLineage(archId?: string | null): BlueprintLineage {
  if (!archId) return BLUEPRINT_LINEAGE_REGISTRY["unified_system_view"];
  const id = archId.toLowerCase().trim();

  // Direct key lookup
  if (BLUEPRINT_LINEAGE_REGISTRY[id]) return BLUEPRINT_LINEAGE_REGISTRY[id];

  // Search by canonical WBS or unique ID
  const entry = Object.values(BLUEPRINT_LINEAGE_REGISTRY).find(
    (b) =>
      b.uniqueId.toLowerCase() === id ||
      b.canonicalWbsId.toLowerCase() === id ||
      b.canonicalArchId.toLowerCase() === id ||
      id.startsWith(b.uniqueId.toLowerCase()) ||
      id.startsWith(b.canonicalWbsId.toLowerCase())
  );

  if (entry) return entry;

  // Fallback
  return {
    uniqueId: "ARCH-CUSTOM",
    canonicalWbsId: id,
    canonicalArchId: id,
    name: "Custom Enterprise Architecture",
    phaseId: "CUSTOM",
    phaseTitle: "Custom Enterprise Blueprint",
    layer: "Logical",
    layerCode: "-L-",
    domain: "Enterprise Systems",
    isIndustrySpecialized: false,
    lineageBreadcrumb: ["Enterprise Architecture", "Custom Blueprint", id]
  };
}
