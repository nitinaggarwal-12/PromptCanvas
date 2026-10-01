/**
 * Canonical Blueprint 00: GCP Enterprise Architecture (Default 2026 GCP & Gemini Enterprise Native Technical Architecture)
 * Compact, uncluttered L2/L3 Logical-Component Reference Topology:
 * 1. User Interface (Chat / Gemini Live / AG-UI)
 * 2. Edge Layer (Cloud Armor, Apigee X, Envoy AI) & Identity Platform (Firebase Auth & Passkeys)
 * 3. API Gateway (Cloud Run Gen2) & Model Armor + SDP (DLP PII Redaction & Guardrails)
 * 4. AI Cluster (Gemini Enterprise, Vertex Agent Engine, Google ADK, LangGraph & A2A Specialist Agents)
 * 5. LLM Layer (Gemini 3.1 Pro / 3.8 Flash on Vertex AI + Gemma 3 / Llama 4 on GKE vLLM)
 * 6. Vector Search 2.0 (ScaNN & Valkey Session Memory)
 * 7. Cloud Databases via MCP (Cloud Spanner TrueTime/Graph, Bigtable + AlloyDB AI, Firestore + Document AI)
 * + GCP Observability, AgentOps & FinOps (Cloud Logging OTel, Cloud Monitoring, Vertex AI Eval, FinOps Hub)
 */

import { generateUpgradedGcpGeBankingArchitectureXml } from "./upgradedGcpGeBankingAgentTemplate";

export function generateTemplate00GcpEnterpriseArchXml(
  domainFlavor?: string,
  theme: "light" | "dark" = "light"
): string {
  return generateUpgradedGcpGeBankingArchitectureXml({
    projectTitle: "00 — GCP Native Technical Architecture (Gemini Enterprise, ADK, A2A & MCP)",
    projectName: "Google Cloud & Gemini Enterprise",
    useCaseName: domainFlavor || "Multi-Agent Native Technical Reference Architecture",
    domain: domainFlavor || "GCP ENTERPRISE",
    theme,
  });
}
