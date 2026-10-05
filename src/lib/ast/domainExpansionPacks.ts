import type { AstComponent } from "./architectureAst";

/**
 * Domain-aware "add N more components" expansion packs.
 *
 * The co-pilot used to inject a fixed FinTech quartet (Payment Token Vault, Kafka
 * Financial Event Mesh, KYC Document AI, …) into every project — including clinical and
 * robotics canvases. Each pack keeps the same four archetypes (edge cache, confidential
 * vault, event mesh, document extractor) but names/describes them for the active domain.
 */

export type ExpansionDomain = "fintech" | "healthcare" | "robotics" | "manufacturing" | "secops" | "agentic" | "enterprise";

export function resolveExpansionDomain(projectTitle: string, rawDomain: string): ExpansionDomain {
  const l = `${projectTitle} ${rawDomain}`.toLowerCase();
  if (/(hospital|triage|patient|clinical|hl7|fhir|sepsis|icu|health|pharma|biopharma|gxp|life sciences)/.test(l)) return "healthcare";
  if (/(drone|lidar|robot|autonomous|collision|edge telemetry)/.test(l)) return "robotics";
  if (/(sap|manufactur|supply chain|opc-ua|plant|factory)/.test(l)) return "manufacturing";
  if (/(secops|chronicle|cyber|soar|siem|soc\b)/.test(l)) return "secops";
  if (/(rag|vector|agentic|llm|vllm|knowledge)/.test(l)) return "agentic";
  if (/(payment|settlement|bank|fintech|financial|trading|ledger|card)/.test(l)) return "fintech";
  return "enterprise";
}

interface PackSpec {
  vault: { name: string; role: string; description: string; protocols: string[] };
  mesh: { name: string; role: string; description: string; protocols: string[] };
  extractor: { name: string; role: string; description: string; protocols: string[] };
  cdnDescription: string;
}

const PACKS: Record<ExpansionDomain, PackSpec> = {
  fintech: {
    cdnDescription: "Low-latency static and dynamic media caching with sub-8ms p99 cache hits.",
    vault: { name: "Payment Token Vault", role: "Confidential Computing Tokenization Enclave", description: "Hardware-isolated microservice for PCI-DSS Level 1 tokenization.", protocols: ["gRPC mTLS", "Cloud KMS API"] },
    mesh: { name: "Financial Event Mesh", role: "Asynchronous Financial Event Distribution", description: "Partitioned event stream for payment, ledger and fraud-signal fan-out.", protocols: ["Kafka Protocol", "Pub/Sub gRPC"] },
    extractor: { name: "Document AI KYC Extractor", role: "Identity & Document Parsing", description: "Automated KYC extraction converting identity documents to structured JSON.", protocols: ["HTTPS REST", "gRPC"] },
  },
  healthcare: {
    cdnDescription: "Edge caching for clinician portals and imaging thumbnails; PHI is never cached at the edge.",
    vault: { name: "PHI Consent & De-identification Vault", role: "Confidential Computing PHI Enclave", description: "Hardware-isolated service for HIPAA de-identification, consent tokens and break-glass audit.", protocols: ["gRPC mTLS", "Cloud KMS API", "Cloud DLP API"] },
    mesh: { name: "HL7v2 / FHIR Event Mesh", role: "Asynchronous Clinical Event Distribution", description: "Ordered ADT/ORU event stream fanning out admissions, labs and vitals to downstream care services.", protocols: ["FHIR R4 Subscriptions", "HL7v2 MLLP", "Pub/Sub gRPC"] },
    extractor: { name: "Document AI Clinical Notes Extractor", role: "Multimodal Clinical Document Parsing", description: "Extracts structured observations from scanned referrals, discharge summaries and consent forms.", protocols: ["HTTPS REST", "gRPC"] },
  },
  robotics: {
    cdnDescription: "Edge caching for fleet dashboards, map tiles and OTA firmware manifests.",
    vault: { name: "Fleet Credential & Firmware Signing Vault", role: "Confidential Computing Attestation Enclave", description: "Hardware-isolated service issuing short-lived device credentials and signing OTA bundles.", protocols: ["gRPC mTLS", "Cloud KMS API", "SPIFFE/SVID"] },
    mesh: { name: "Telemetry Event Mesh", role: "Asynchronous Sensor Event Distribution", description: "Partitioned stream for LiDAR/IMU telemetry, geofence alerts and collision events.", protocols: ["MQTT", "Pub/Sub gRPC"] },
    extractor: { name: "Document AI Compliance Log Extractor", role: "Flight / Mission Log Parsing", description: "Extracts structured incident and maintenance records from mission logs and inspection forms.", protocols: ["HTTPS REST", "gRPC"] },
  },
  manufacturing: {
    cdnDescription: "Edge caching for plant dashboards, work instructions and digital-twin assets.",
    vault: { name: "OT Credential & Recipe Vault", role: "Confidential Computing OT Enclave", description: "Hardware-isolated service protecting PLC credentials and proprietary process recipes.", protocols: ["gRPC mTLS", "Cloud KMS API"] },
    mesh: { name: "OPC-UA / MES Event Mesh", role: "Asynchronous Shop-Floor Event Distribution", description: "Ordered stream for machine states, quality holds and material movements.", protocols: ["OPC-UA PubSub", "Pub/Sub gRPC"] },
    extractor: { name: "Document AI Quality Record Extractor", role: "Inspection & Certificate Parsing", description: "Extracts structured data from certificates of analysis, inspection sheets and supplier documents.", protocols: ["HTTPS REST", "gRPC"] },
  },
  secops: {
    cdnDescription: "Edge caching for analyst consoles and threat-intel feeds.",
    vault: { name: "Detection Secrets & Case Evidence Vault", role: "Confidential Computing Evidence Enclave", description: "Hardware-isolated custody for case evidence hashes, API secrets and signing keys.", protocols: ["gRPC mTLS", "Cloud KMS API"] },
    mesh: { name: "Security Telemetry Event Mesh", role: "Asynchronous Detection Event Distribution", description: "High-throughput stream for normalized logs, detections and SOAR playbook triggers.", protocols: ["Pub/Sub gRPC", "Syslog/TLS"] },
    extractor: { name: "Document AI Threat Report Extractor", role: "Intel & Incident Report Parsing", description: "Extracts IOCs and TTPs from PDF advisories, vendor reports and incident write-ups.", protocols: ["HTTPS REST", "gRPC"] },
  },
  agentic: {
    cdnDescription: "Edge caching for the assistant UI and static knowledge assets.",
    vault: { name: "Tool Credential & Prompt Secrets Vault", role: "Confidential Computing Agent Enclave", description: "Hardware-isolated custody for tool-calling credentials and tenant-scoped prompt secrets.", protocols: ["gRPC mTLS", "Cloud KMS API"] },
    mesh: { name: "Agent Event & Trace Mesh", role: "Asynchronous Agent Step Distribution", description: "Ordered stream for agent steps, tool results and evaluation traces.", protocols: ["Pub/Sub gRPC", "OpenTelemetry"] },
    extractor: { name: "Document AI Knowledge Ingestion Extractor", role: "Multimodal Corpus Parsing", description: "Layout-aware extraction of PDFs, slides and scans into chunked, embeddable text.", protocols: ["HTTPS REST", "gRPC"] },
  },
  enterprise: {
    cdnDescription: "Low-latency static and dynamic content caching for global users.",
    vault: { name: "Secrets & Token Vault", role: "Confidential Computing Tokenization Enclave", description: "Hardware-isolated microservice for tokenizing sensitive identifiers and holding service secrets.", protocols: ["gRPC mTLS", "Cloud KMS API"] },
    mesh: { name: "Domain Event Mesh", role: "Asynchronous Domain Event Distribution", description: "Partitioned event stream decoupling producers from downstream consumers.", protocols: ["Pub/Sub gRPC", "Kafka Protocol"] },
    extractor: { name: "Document AI Extractor", role: "Multimodal Document Parsing", description: "Converts scanned and digital documents into structured JSON for downstream workflows.", protocols: ["HTTPS REST", "gRPC"] },
  },
};

export function buildDomainExpansionPack(projectTitle: string, rawDomain: string, primaryRegion: string = "us-central1"): AstComponent[] {
  const domain = resolveExpansionDomain(projectTitle, rawDomain);
  const p = PACKS[domain];
  return [
    {
      id: "comp_cdn",
      name: "Cloud CDN & Media Edge",
      service: "Cloud CDN",
      tier: "ingress",
      region: "global",
      role: "Global Anycast Edge Cache & HTTP/3 Ingress",
      description: p.cdnDescription,
      sla: "99.99%",
      protocols: ["HTTP/3", "QUIC", "TLS 1.3"],
    },
    {
      id: "comp_token_vault",
      name: p.vault.name,
      service: "Cloud Run",
      tier: "compute",
      region: primaryRegion,
      role: p.vault.role,
      description: p.vault.description,
      sla: "99.95%",
      protocols: p.vault.protocols,
    },
    {
      id: "comp_event_bus",
      name: p.mesh.name,
      service: "Pub/Sub",
      tier: "data",
      region: primaryRegion,
      role: p.mesh.role,
      description: p.mesh.description,
      sla: "99.95%",
      protocols: p.mesh.protocols,
    },
    {
      id: "comp_doc_ai",
      name: p.extractor.name,
      service: "Document AI",
      tier: "compute",
      region: primaryRegion,
      role: p.extractor.role,
      description: p.extractor.description,
      sla: "99.9%",
      protocols: p.extractor.protocols,
    },
  ];
}
