/**
 * Canonical Blueprint 00: GCP Enterprise Architecture
 * Google Cloud Native Enterprise Reference Topology spanning 6 balanced zones:
 * 1. Ingress & Edge (Anycast Edge, Cloud Armor, External HTTPS GCLB, Apigee X)
 * 2. Application Core Mesh (GKE Autopilot, Cloud Run, Memorystore Redis)
 * 3. Real-Time Event Streaming (Cloud Pub/Sub, Datastream CDC, Cloud Dataflow Engine)
 * 4. Vertex AI & Intelligence Hub (ScaNN Vector Search, Model Armor Shield, Gemini 3.7 Flash & Pro Hybrid Engine)
 * 5. Multi-Region Lakehouse & DB (Cloud Spanner nam3, BigQuery Lakehouse, Cloud Storage Dual-Region)
 * 6. Zero-Trust Security Baseline (VPC-SC, Workload Identity, Cloud KMS HSM, Secret Manager, Dataplex, Cloud SCC)
 */

import { generateGcpNativeArchitectureXml } from "../gcpNativeArchitecture";

export function generateTemplate00GcpEnterpriseArchXml(
  domainFlavor?: string,
  theme: "light" | "dark" = "light"
): string {
  return generateGcpNativeArchitectureXml({
    projectTitle: "00 — GCP Enterprise Architecture",
    projectName: "Google Cloud Enterprise",
    useCaseName: domainFlavor || "Multi-Tier Native Reference Architecture",
    domain: "GCP ENTERPRISE",
    theme,
  });
}
