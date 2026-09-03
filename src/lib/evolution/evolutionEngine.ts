import { ArchitectureAst, AstComponent } from "@/lib/ast/architectureAst";
import { generateGcpNativeArchitectureXml } from "@/lib/gcpNativeArchitecture";

export interface EvolutionStep {
  versionTag: string;
  versionName: string;
  domain: string;
  projectTitle: string;
  prompt: string;
  description: string;
  persona: string;
  slaTarget: string;
  targetRpo: string;
  targetRto: string;
  drRegions: string[];
  compliance: string[];
  addedComponents: AstComponent[];
  removedComponentIds?: string[];
  canvasDiff: string;
  specDiff: string;
}

export const EVOLUTION_STEPS: EvolutionStep[] = [
  // 1. v1.0 - Baseline Payments Mesh
  {
    versionTag: "v1.0",
    versionName: "v1.0 • Global Payments Mesh Baseline",
    domain: "Financial Services & Payments",
    projectTitle: "Global Real-Time Payments Mesh & Settlement Engine",
    prompt: "Design a high-throughput 6-zone Google Cloud reference architecture for global real-time payments with Cloud Spanner nam3, GKE Autopilot, Vertex AI, and Cloud KMS HSM.",
    description: "Initial baseline reference topology supporting 50k TPS multi-region payment processing.",
    persona: "Lead Cloud Architect",
    slaTarget: "99.999%",
    targetRpo: "< 1 Second (Zero Data Loss)",
    targetRto: "< 30 Seconds",
    drRegions: ["nam3 (Multi-Region)"],
    compliance: ["PCI-DSS 4.0", "SOC2 Type II", "ISO 27001"],
    addedComponents: [],
    canvasDiff: "Synthesized 16 authoritative GCP nodes across 6 architectural tiers with dual-hub VPCs.",
    specDiff: "Generated 16 living specification documents (DOC-01 PRD through DOC-16 Cost Analysis)."
  },

  // 2. v2.0 - Healthcare & Clinical FHIR R4 Lakehouse
  {
    versionTag: "v2.0",
    versionName: "v2.0 • Healthcare Clinical FHIR R4 Intake",
    domain: "Healthcare & Precision Medicine",
    projectTitle: "Enterprise Clinical Health Lakehouse & FHIR R4 Intake Hub",
    prompt: "Pivot architecture to Healthcare: Add Cloud Healthcare API, Emergency Patient Admission Ingress on Cloud Run, OMOP BigQuery schema, and Gemini Clinical Diagnostic RAG.",
    description: "Healthcare evolution supporting HIPAA compliance, HL7/FHIR R4 protocol ingestion, and clinical NLP.",
    persona: "Product Manager",
    slaTarget: "99.999%",
    targetRpo: "< 5 Seconds",
    targetRto: "< 15 Seconds",
    drRegions: ["nam3 (us-central1 + us-east4)"],
    compliance: ["HIPAA", "HITECH", "FDA 21 CFR Part 11", "SOC2 Type II"],
    addedComponents: [
      {
        id: "comp_patient_portal",
        name: "Emergency Patient Ingress Portal",
        service: "Cloud Run",
        tier: "compute",
        region: "global",
        role: "Patient Intake & FHIR R4 Triage Gateway",
        description: "Sub-10ms clinical intake gateway with automated HL7 to FHIR R4 format conversion.",
        sla: "99.999%",
        protocols: ["HTTPS", "FHIR R4", "gRPC"]
      },
      {
        id: "comp_doc_ai",
        name: "Document AI OCR Hub",
        service: "Document AI",
        tier: "compute",
        region: "us-central1",
        role: "Clinical Document & Lab Report Parser",
        description: "Specialized layout parser extracting tabular lab values and diagnostic entities.",
        sla: "99.9%",
        protocols: ["HTTPS REST", "gRPC"]
      }
    ],
    canvasDiff: "+ Added Emergency Patient Ingress Portal (Zone 2) and Document AI Clinical Parser (Zone 4).",
    specDiff: "Reconciled DOC-01 PRD, DOC-02 Clinical Workflows, and DOC-06 HIPAA Compliance Matrix."
  },

  // 3. v3.0 - Retail & Autonomous IoT Supply Chain
  {
    versionTag: "v3.0",
    versionName: "v3.0 • Retail IoT Supply Chain & Bigtable Store",
    domain: "Retail & Autonomous Supply Chain",
    projectTitle: "Real-Time Supply Chain Optimization & IoT Telemetry Grid",
    prompt: "Transform into Autonomous Supply Chain: Add IoT Telemetry Ingress, Cloud Bigtable Time-Series Sensor Store, and Dataflow Streaming Demand Forecasting.",
    description: "Supply chain grid tracking real-time warehouse RFID, fleet sensors, and dynamic demand forecasting.",
    persona: "Lead Cloud Architect",
    slaTarget: "99.99%",
    targetRpo: "< 1 Second",
    targetRto: "< 60 Seconds",
    drRegions: ["us-central1", "us-east4"],
    compliance: ["SOC2 Type II", "ISO 27001", "GS1 Standards"],
    addedComponents: [
      {
        id: "comp_kafka_mirror",
        name: "Managed Kafka Mirror",
        service: "Apache Kafka on GKE",
        tier: "compute",
        region: "us-central1",
        role: "Warehouse IoT Sensor Bus Replicator",
        description: "Strimzi Kafka broker streaming 5M events/sec from warehouse RFID tags into Dataflow.",
        sla: "99.95%",
        protocols: ["Kafka Protocol", "MQTT-SN", "TLS"]
      }
    ],
    canvasDiff: "+ Added Managed Kafka Mirror (Zone 3) with horizontal stream replication to Pub/Sub.",
    specDiff: "Updated DOC-04 Component Catalog and DOC-05 Time-Series Bigtable Schema."
  },

  // 4. v4.0 - FinTech Open Banking & PCI-DSS L1 Vault
  {
    versionTag: "v4.0",
    versionName: "v4.0 • FinTech PCI-DSS L1 Token Vault",
    domain: "FinTech & Open Banking",
    projectTitle: "Next-Gen Open Banking & PCI-DSS Level 1 Enclave Mesh",
    prompt: "Enforce FinTech Open Banking Hardening: Add Confidential Cloud Run Payment Token Vault in Zone 2, FIPS 140-3 Level 3 HSM CMEK, and Sub-1ms Redis Caching.",
    description: "Confidential computing hardware enclave for isolated cardholder tokenization.",
    persona: "CISO / Security Architect",
    slaTarget: "99.999%",
    targetRpo: "< 1 Second",
    targetRto: "< 15 Seconds",
    drRegions: ["nam3 (us-central1 + europe-west1)"],
    compliance: ["PCI-DSS 4.0 Level 1", "FIPS 140-3 Level 3", "GLBA", "SOX"],
    addedComponents: [
      {
        id: "comp_token_vault",
        name: "Payment Token Vault",
        service: "Cloud Run",
        tier: "compute",
        region: "us-central1",
        role: "Confidential Computing Hardware Enclave",
        description: "AMD SEV hardware-isolated microservice for PCI-DSS Level 1 cardholder tokenization.",
        sla: "99.999%",
        protocols: ["gRPC mTLS", "Cloud KMS API"]
      },
      {
        id: "comp_hsm_cmek",
        name: "Cloud KMS HSM CMEK Keys",
        service: "Cloud Key Management Service",
        tier: "security",
        region: "global",
        role: "Hardware Security Module Envelope Encryption",
        description: "FIPS 140-3 Level 3 HSM keys protecting Spanner, BigQuery, and GCS buckets.",
        sla: "99.999%",
        protocols: ["Cloud KMS API", "gRPC mTLS"]
      }
    ],
    canvasDiff: "⚡ Partitioned Zone 2 into a 2-Column Pod Grid with Payment Token Vault & Enforced Cloud KMS HSM.",
    specDiff: "Reconciled DOC-06 STRIDE Threat Model & DOC-10 PCI-DSS Compliance Baseline."
  },

  // 5. v5.0 - Telco 5G Network Slice Orchestration
  {
    versionTag: "v5.0",
    versionName: "v5.0 • Telco 5G Network Slice & Edge Core",
    domain: "Telecommunications & 5G Core",
    projectTitle: "Telco 5G Network Slice Orchestrator & Distributed Edge",
    prompt: "Scale for Telco 5G: Deploy Google Distributed Cloud (Anthos) Edge nodes, sub-5ms network slicing, and Pub/Sub Lite streaming.",
    description: "Carrier-grade 5G network slicing and low-latency edge orchestration.",
    persona: "Lead Cloud Architect",
    slaTarget: "99.999%",
    targetRpo: "< 100ms",
    targetRto: "< 10 Seconds",
    drRegions: ["nam3", "europe-west1", "asia-east1"],
    compliance: ["NEBS Level 3", "3GPP Release 17", "SOC2 Type II"],
    addedComponents: [
      {
        id: "comp_cdn",
        name: "Cloud CDN & Media Edge",
        service: "Cloud CDN",
        tier: "ingress",
        region: "global",
        role: "Carrier Anycast PoP Edge Cache",
        description: "Global edge points of presence terminating 5G user plane traffic with sub-8ms latency.",
        sla: "99.99%",
        protocols: ["HTTP/3", "QUIC", "eBPF"]
      }
    ],
    canvasDiff: "+ Integrated Cloud CDN Edge PoPs in Zone 1 with proportional vertical height scaling.",
    specDiff: "Reconciled DOC-03 HLD 5G Topologies and DOC-09 SRE Latency SLOs."
  },

  // 6. v6.0 - Global Media Streaming & Multimodal Content CoE
  {
    versionTag: "v6.0",
    versionName: "v6.0 • Global Media Streaming & Veo/Imagen CoE",
    domain: "Digital Media & Entertainment",
    projectTitle: "Global Multimodal Media Delivery & Content Generation CoE",
    prompt: "Expand to Global Media: Add Cloud CDN Media Edge, Dual-Region GCS Object Store, and Vertex AI Veo 2 / Imagen 3 Multimodal Content Generation Engine.",
    description: "High-bandwidth video streaming, real-time transcoding, and generative multimodal content generation.",
    persona: "Product Manager",
    slaTarget: "99.99%",
    targetRpo: "< 5 Seconds",
    targetRto: "< 30 Seconds",
    drRegions: ["nam3 Multi-Region"],
    compliance: ["MPAA Security", "SOC2 Type II", "GDPR"],
    addedComponents: [
      {
        id: "comp_cdn",
        name: "Cloud CDN & Media Edge",
        service: "Cloud CDN",
        tier: "ingress",
        region: "global",
        role: "Global Anycast Video & Content Cache",
        description: "4K video chunk caching with sub-8ms edge hits and Cloud Storage byte serving.",
        sla: "99.99%",
        protocols: ["HLS", "DASH", "HTTP/3"]
      }
    ],
    canvasDiff: "+ Expanded Ingress to 5 full-height nodes with Cloud CDN Byte Serving.",
    specDiff: "Reconciled DOC-01 PRD Media KPIs and DOC-04 Component Specifications."
  },

  // 7. v7.0 - Connected Autonomous Vehicle Fleet Telematics
  {
    versionTag: "v7.0",
    versionName: "v7.0 • Autonomous Fleet Telematics & Geospatial BigQuery",
    domain: "Automotive & Fleet Intelligence",
    projectTitle: "Connected Autonomous Fleet Telematics & Geospatial Analytics",
    prompt: "Deploy Connected Fleet Telematics: Add Managed Kafka Mirror for vehicle CAN-bus ingest, Spanner Vehicle Fleet Registry, and Geospatial BigQuery GIS.",
    description: "Real-time telemetry ingestion from 1M+ connected vehicles with geospatial geofencing.",
    persona: "Lead Cloud Architect",
    slaTarget: "99.999%",
    targetRpo: "< 1 Second",
    targetRto: "< 15 Seconds",
    drRegions: ["us-central1", "us-east4", "europe-west1"],
    compliance: ["ISO 26262 (ASIL-D)", "UN R155 / R156", "SOC2 Type II"],
    addedComponents: [
      {
        id: "comp_kafka_mirror",
        name: "Managed Kafka Mirror",
        service: "Apache Kafka on GKE",
        tier: "compute",
        region: "us-central1",
        role: "Automotive CAN-Bus Telematics Replicator",
        description: "High-throughput Strimzi Kafka cluster streaming vehicle sensor telemetry.",
        sla: "99.95%",
        protocols: ["Kafka Protocol", "MQTT", "TLS"]
      }
    ],
    canvasDiff: "+ Configured 3-card top streaming row in Zone 3 with direct horizontal Kafka/CDC channels.",
    specDiff: "Updated DOC-05 Fleet Schema and DOC-07 Geospatial Streaming Specs."
  },

  // 8. v8.0 - Cyber Defense & Threat Intelligence SOC
  {
    versionTag: "v8.0",
    versionName: "v8.0 • Zero-Trust Threat Intel & Model Armor SOC",
    domain: "Cybersecurity & Threat Intelligence",
    projectTitle: "Autonomous Cyber Defense Platform & Zero-Trust SOC",
    prompt: "Harden Cyber Defense SOC: Deploy Model Armor Prompt Shield in Zone 4, Chronicle SIEM telemetry, Cloud Armor adaptive DDoS, and Sensitive Data Protection DLP.",
    description: "Autonomous Security Operations Center with real-time LLM jailbreak defense and automated SIEM containment.",
    persona: "CISO / Security Architect",
    slaTarget: "99.999%",
    targetRpo: "< 1 Second",
    targetRto: "< 5 Seconds",
    drRegions: ["nam3 (Zero-Trust VPC Perimeter)"],
    compliance: ["NIST SP 800-53", "FedRAMP High", "PCI-DSS 4.0", "ISO 27001"],
    addedComponents: [
      {
        id: "comp_hsm_cmek",
        name: "Cloud KMS HSM CMEK",
        service: "Cloud Key Management Service",
        tier: "security",
        region: "global",
        role: "FIPS 140-3 Hardware Key Hierarchy",
        description: "Hardware key protection for SIEM event vaults and immutable audit logs.",
        sla: "99.999%",
        protocols: ["Cloud KMS API"]
      }
    ],
    canvasDiff: "🛡️ Enforced Model Armor Prompt Shield (Zone 4) and Security Command Center Premium Baseline.",
    specDiff: "Reconciled DOC-06 STRIDE Threat Model & DOC-11 Zero-Trust Perimeter Rules."
  },

  // 9. v9.0 - Smart Manufacturing & Edge TPU Predictive Maintenance
  {
    versionTag: "v9.0",
    versionName: "v9.0 • Smart Manufacturing & Edge TPU Maintenance",
    domain: "Industrial IoT & Manufacturing",
    projectTitle: "Smart Factory Automation & Predictive Maintenance Lakehouse",
    prompt: "Optimize for Smart Manufacturing: Deploy Edge TPU Ingress, BigLake Iceberg table storage on GCS, and Gemini Dynamic Thinking for anomaly diagnosis.",
    description: "Smart factory telemetry grid processing sensor anomalies with sub-20ms predictive maintenance inference.",
    persona: "FinOps & SRE Lead",
    slaTarget: "99.95%",
    targetRpo: "< 5 Seconds",
    targetRto: "< 30 Seconds",
    drRegions: ["us-central1", "europe-west1"],
    compliance: ["IEC 62443", "ISO 9001", "SOC2 Type II"],
    addedComponents: [
      {
        id: "comp_doc_ai",
        name: "Document AI OCR Hub",
        service: "Document AI",
        tier: "compute",
        region: "us-central1",
        role: "Industrial Schematic & Work Order Parser",
        description: "Automated OCR extraction of engineering CAD drawings, work orders, and equipment manuals.",
        sla: "99.9%",
        protocols: ["HTTPS REST"]
      }
    ],
    canvasDiff: "+ Integrated Document AI Schematic Parser and BigLake Iceberg continuous ingestion sinks.",
    specDiff: "Reconciled DOC-04 Component Catalog and DOC-09 FinOps Resource Allocation."
  },

  // 10. v10.0 - Sovereign AI Cloud & Federated EU Data Governance
  {
    versionTag: "v10.0",
    versionName: "v10.0 • Sovereign AI Cloud & EU Data Residency",
    domain: "Sovereign Cloud & Global Governance",
    projectTitle: "Global Sovereign AI Platform & Federated Data Residency Grid",
    prompt: "Finalize as Sovereign AI Cloud: Enforce Dual EU Data Sovereignty (europe-west1 + europe-west3), FIPS 140-3 CMEK keys, Dataplex Universal Catalog, and Gemini 3.7 Dynamic Reasoning.",
    description: "Strict EU data residency, zero cross-border telemetry leakage, and sovereign multi-region AI orchestration.",
    persona: "Lead Cloud Architect",
    slaTarget: "99.999%",
    targetRpo: "< 1 Second (TrueTime Synchronized)",
    targetRto: "< 15 Seconds (Automated Failover)",
    drRegions: ["europe-west1", "europe-west3", "nam3"],
    compliance: ["EU GDPR", "EU AI Act", "BSI C5", "FIPS 140-3 Level 3", "SOC2 Type II"],
    addedComponents: [
      {
        id: "comp_cdn",
        name: "Cloud CDN & Media Edge",
        service: "Cloud CDN",
        tier: "ingress",
        region: "global",
        role: "Global Anycast Ingress & Regional Edge Term",
        description: "Low-latency regional edge cache adhering to strict European data sovereignty boundaries.",
        sla: "99.99%",
        protocols: ["HTTP/3", "TLS 1.3"]
      },
      {
        id: "comp_token_vault",
        name: "Payment Token Vault",
        service: "Cloud Run",
        tier: "compute",
        region: "europe-west1",
        role: "Confidential Computing Hardware Enclave",
        description: "AMD SEV hardware-isolated microservice for GDPR-compliant cardholder tokenization.",
        sla: "99.999%",
        protocols: ["gRPC mTLS", "Cloud KMS API"]
      },
      {
        id: "comp_kafka_mirror",
        name: "Managed Kafka Mirror",
        service: "Apache Kafka on GKE",
        tier: "compute",
        region: "europe-west1",
        role: "Sovereign Cross-Region Event Replicator",
        description: "Strimzi Kafka broker mirroring telemetry between europe-west1 and europe-west3.",
        sla: "99.95%",
        protocols: ["Kafka Protocol", "TLS"]
      },
      {
        id: "comp_doc_ai",
        name: "Document AI OCR Hub",
        service: "Document AI",
        tier: "compute",
        region: "europe-west1",
        role: "Multi-lingual Sovereign Layout Parser",
        description: "Specialized layout parser extracting tabular entities under strict EU data residency controls.",
        sla: "99.9%",
        protocols: ["HTTPS REST", "gRPC"]
      },
      {
        id: "comp_hsm_cmek",
        name: "Cloud KMS HSM CMEK",
        service: "Cloud Key Management Service",
        tier: "security",
        region: "europe-west1",
        role: "FIPS 140-3 Level 3 Sovereign Hardware Keys",
        description: "Dedicated European HSM keys with external key manager (EKM) support.",
        sla: "99.999%",
        protocols: ["Cloud KMS API", "EKM"]
      }
    ],
    canvasDiff: "👑 Certified v10.0 Sovereign AI Cloud Topology: 100% Collision-Free 6-Zone Master Architecture with 20 GCP nodes, Dual-Hub VPC, and Spanner Multi-Region TrueTime.",
    specDiff: "Fully reconciled all 16 Living Specifications (DOC-01 through DOC-16) to 100% certified production standard."
  }
];

export function evolveAst(baseAst: ArchitectureAst, step: EvolutionStep): ArchitectureAst {
  const updated: ArchitectureAst = {
    ...baseAst,
    metadata: {
      ...baseAst.metadata,
      projectTitle: step.projectTitle,
      domain: step.domain,
      slaTarget: step.slaTarget,
      targetRpo: step.targetRpo,
      targetRto: step.targetRto,
      drRegions: step.drRegions,
      compliance: step.compliance,
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  };

  // Merge or replace components
  let comps = [...updated.components];
  if (step.removedComponentIds && step.removedComponentIds.length > 0) {
    comps = comps.filter(c => !step.removedComponentIds!.includes(c.id));
  }
  if (step.addedComponents && step.addedComponents.length > 0) {
    comps = [...comps.filter(c => !step.addedComponents.some(ac => ac.id === c.id)), ...step.addedComponents];
  }
  updated.components = comps;

  return updated;
}
