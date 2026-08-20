import type { ArchitectureTypeOption as RawArchitectureTypeOption } from './architectureTypes';
import {
  BUSINESS_ARCHITECTURE_TYPES as RAW_BUSINESS_ARCHITECTURE_TYPES,
  TECHNICAL_ARCHITECTURE_TYPES as RAW_TECHNICAL_ARCHITECTURE_TYPES,
  ARCHITECTURE_TYPES as RAW_ARCHITECTURE_TYPES,
  normalizeArchitectureId as rawNormalizeArchitectureId,
  getArchitectureTypeById as rawGetArchitectureTypeById,
  getDefaultXmlForArchitecture as rawGetDefaultXmlForArchitecture,
  getTechnicalArchitectureXml as rawGetTechnicalArchitectureXml
} from './architectureTypes';
import { applyBlueprintTechnicalAccuracy } from './blueprintTechnicalAccuracy';
import { applyBlueprintVisualSystem } from './blueprintVisualSystem';
import { applyBlueprintSemanticIcons } from './blueprintSemanticIcons';
import { applyBlueprintTextContainment } from './blueprintTextContainment';
import { buildEnterpriseReferenceArchitectureXml } from './masterBuilders/build_master_enterprise_reference';

export type ArchitectureTypeOption = RawArchitectureTypeOption;

const ENTERPRISE_REFERENCE_ID = 'unified_system_view';

const OPTION_TEXT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Gemini 3\.7 Flash \/ Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro Vision/g, 'Gemini multimodal model'],
  [/Gemini 3\.7 Flash/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7/g, 'Gemini'],
  [/Cloud Source Repositories/g, 'Secure Source Manager'],
  [/Cloud Source Repos/g, 'Secure Source Manager'],
  [/Dataplex Universal Catalog/g, 'Knowledge Catalog'],
  [/Dataplex Data Catalog/g, 'Knowledge Catalog'],
  [/Vertex AI Matching Engine/g, 'Vertex AI Vector Search'],
  [/Anthos Service Mesh/g, 'Cloud Service Mesh'],
  [/Cloud Functions/g, 'Cloud Run functions'],
  [/Global L7 HTTPS Load Balancing/g, 'Cloud Load Balancing'],
  [/Global HTTPS Load Balancer/g, 'Cloud Load Balancing'],
];

function currentText(value: string): string {
  return OPTION_TEXT_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value,
  );
}

const CURRENT_OPTION_PATCHES: Record<string, Partial<RawArchitectureTypeOption>> = {
  unified_system_view: {
    name: 'Enterprise Reference Architecture',
    category: 'Executive & Business Strategy',
    whenToUse: 'High-level enterprise reference architecture spanning experience, applications, integration, data, AI, cloud platform, and cross-cutting security, governance, reliability, DevSecOps, and FinOps.',
    prompt: 'Enterprise Reference Architecture: Experience Layer -> Business Application Layer -> Integration Layer -> Data & Knowledge Layer -> AI & Agentic Layer -> Cloud Platform Layer, with cross-cutting Security & Identity, Governance & Compliance, Observability, Reliability & Resilience, DevSecOps, and FinOps. Include Gemini Enterprise capabilities only where they belong: connectors and Gemini Notebook Enterprise for enterprise knowledge workflows, Skills for reusable assistant instructions, Agent Gallery/Designer for employee agents, and Gemini Enterprise Agent Platform / ADK / Agent Runtime for custom production agents.'
  },
  agentic_rag: {
    name: 'Production Agentic RAG on Google Cloud',
    whenToUse: 'Grounded agent architecture with a permissions-aware query path, separate knowledge ingestion/indexing, managed retrieval, citations, governed tool use, evaluation, safety, and production observability.',
    prompt: 'Design a production Agentic RAG architecture with: authenticated host/client -> governed Agent Gateway path -> Agent Runtime coordinator -> selectable grounding using RAG Engine, Agent Search, or Vector Search according to requirements -> evidence/citations -> governed MCP/API/A2A actions -> evaluation and observability. Keep ingestion/indexing asynchronous from the query path, preserve source attribution, and do not expose private chain-of-thought.'
  },
  hub_and_spoke_agent_config: {
    name: 'Governed Hub-and-Spoke Multi-Agent Architecture',
    whenToUse: 'Coordinator-led multi-agent architecture with bounded specialist contracts, Agent Registry/Identity, Agent Gateway policy enforcement, optional A2A for independently deployed agents, governed tools, observability, and human escalation.',
    prompt: 'Design a governed hub-and-spoke multi-agent architecture on Gemini Enterprise Agent Platform. Use one accountable coordinator, a small number of bounded specialist agents, explicit input/output/tool/data contracts, Agent Registry and Agent Identity, Agent Gateway for governed communications, MCP for tools, A2A only for separately deployed remote agents when justified, failure limits, observability, and human escalation for consequential actions. Do not model Gemini Enterprise Skills as subagents.'
  },
  enterprise_agent_runtime: {
    name: 'Enterprise Agent Runtime on Gemini Enterprise Agent Platform',
    whenToUse: 'Production custom-agent runtime showing governed client ingress, Agent Runtime, Sessions and Memory Bank where configured, Agent Registry/Identity, Agent Gateway egress, MCP/A2A tools, evaluation, observability, and human authority.',
    prompt: 'Design an enterprise agent runtime on Gemini Enterprise Agent Platform: AI hosts -> governed client-to-agent ingress -> Agent Runtime -> Sessions / optional Memory Bank / Code Execution as needed -> Agent Registry and Agent Identity -> governed agent-to-anywhere egress through Agent Gateway -> registered MCP/API/A2A destinations -> Agent Observability, evaluation, safety and human approval. Keep Gemini Enterprise connectors, Notebook and Skills scoped to the Gemini Enterprise experience rather than silently inheriting them into custom Agent Runtime.'
  },
  tech_agentic_mesh: {
    name: 'Hybrid & Multi-Cloud Connectivity on Google Cloud',
    category: 'Cloud Infrastructure & Networking',
    whenToUse: 'Hybrid and multi-cloud network topology connecting enterprise sites, Google Cloud VPCs, AWS and Azure with Cloud Interconnect, HA VPN, Cloud Router, Network Connectivity Center, Cross-Cloud Interconnect, private service access, federated identity, firewall policy, and network operations.',
    prompt: 'Design a production hybrid and multi-cloud connectivity architecture on Google Cloud. Show on-premises/edge -> Dedicated or Partner Cloud Interconnect with Cloud Router as the primary private path; HA VPN as a primary or resilience path according to requirements; Network Connectivity Center hub with explicit VPC/hybrid spokes; AWS/Azure private connectivity using Cross-Cloud Interconnect where supported or HA VPN as an alternative; Private Service Connect only for supported producer/service patterns; Cloud NGFW/firewall policies; Workforce Identity Federation for external workforce identities and Workload Identity Federation for external workloads; VPC Service Controls only around supported services; and Network Intelligence Center / Cloud Monitoring / logging for operations.'
  },
  tech_eval_safety: {
    name: 'Agent Evaluation, Safety & Runtime Assurance',
    whenToUse: 'Agent quality and safety lifecycle separating representative pre-release evaluation, adversarial/security testing, controlled release, Agent Observability, asynchronous online quality monitoring, incident handling, and auditable evidence.',
    prompt: 'Design an agent evaluation and runtime-assurance architecture. Separate Rapid Evaluation and repeatable Test Case Evaluation from runtime security. Test Model Armor templates for prompt injection/jailbreak, harmful content, malicious content/URLs and sensitive data according to policy. Promote only evidence-backed versions. In production, use Agent Observability for traces and Online Monitoring for asynchronous quality signals; route security enforcement through Agent Gateway/Model Armor/IAM. Use use-case-specific thresholds, never invented universal pass percentages.'
  },
  tech_ai_trism_guardrails: {
    name: 'AI TRiSM Runtime Guardrail Architecture',
    whenToUse: 'Trust, risk and security operating model implemented with concrete Agent Gateway, IAM/Agent Identity, Model Armor, registered destinations, human authority, observability, audit evidence and incident response.',
    prompt: 'Design an AI TRiSM runtime guardrail architecture using concrete enforcement services: client/agent identity and authorization, Agent Gateway ingress/egress, Model Armor request/response screening, Agent Registry destination allowlists, governed Agent Runtime execution, human approval for consequential actions, content-security monitoring, Agent Observability, audit evidence and incident response. Do not invent a generic TRiSM engine or expose model chain-of-thought.'
  },
  ai_agent_approval_workflow: {
    name: 'AI Agent Approval & Governance Workflow',
    whenToUse: 'Risk-tiered agent approval workflow covering ownership/scope, automated quality/safety/access evidence, policy-defined decision gates, human authority where required, controlled publication/deployment, rollback, runtime assurance and re-review triggers.',
    prompt: 'Design a risk-tiered AI agent approval workflow for Gemini Enterprise / Gemini Enterprise Agent Platform. Include accountable ownership, declared users/data/tools/autonomy, task-quality evaluation, adversarial/safety tests, access and tool verification, data/privacy evidence, failure recovery, policy-specific risk classification, named human approvers when required, Agent Registry/release evidence, progressive exposure, rollback/disable, runtime observability, and material-change re-approval. Do not hardcode universal benchmark percentages.'
  },
  ai_coe_operating_model: {
    name: 'Gemini Enterprise AI Center of Excellence Operating Model',
    category: 'AI & Cognitive Systems',
    whenToUse: 'Enterprise operating model for selecting, governing, adopting and measuring Gemini Enterprise capabilities and custom Gemini Enterprise Agent Platform workloads.',
    prompt: 'Design a Gemini Enterprise AI CoE operating model spanning strategy/use-case intake/readiness; the end-user capability portfolio (Assistant/search, connectors, Gemini Notebook Enterprise, Skills, Agent Gallery/Agent Designer); custom agent engineering on Agent Studio/ADK/Agent Runtime; connector/MCP governance and feature-maturity validation; security/privacy/AI governance; enablement/champions/Community of Practice; product-feedback loop; value realization; and explicit operational handoff/exit criteria. Keep Skills separate from agents and distinguish Gemini Enterprise custom MCP connector traffic from Agent Gateway-governed custom-agent egress.'
  },
  tech_llmops_lifecycle: {
    name: 'LLMOps & AgentOps Delivery Lifecycle',
    whenToUse: 'Versioned delivery lifecycle for prompt/model configuration and agent code covering review, CI evaluation, security testing, release evidence, Agent Runtime deployment, optional Gemini Enterprise publication, observability, rollback and controlled improvement.',
    prompt: 'Design an LLMOps and AgentOps lifecycle: design/experiment -> Git-based version/review -> deterministic tests plus Gen AI Evaluation and adversarial/safety tests -> evidence-backed package/release -> Agent Runtime or application deployment -> optional Gemini Enterprise registration/publication as a separate administrative step -> Agent Observability and online/scheduled evaluation -> rollback/disable -> controlled improvement. Treat Skills as a separate Gemini Enterprise assistant content lifecycle, not an Agent Runtime deployment artifact.'
  },
  tech_multi_region_dr: {
    name: 'Multi-Region Active-Passive Disaster Recovery',
    whenToUse: 'Workload-defined active-passive multi-region DR with explicit primary/passive regions, service-specific asynchronous replication where applicable, governed failover, validated application/data recovery, scheduled failback, and tested RTO/RPO objectives.',
    prompt: 'Design an active-passive multi-region disaster-recovery architecture on Google Cloud. Use one explicit active region and one passive/warm region; describe service-specific replication accurately (for example an asynchronous Cloud SQL cross-region DR replica when that is the selected database pattern); use governed detection, decision, data failover/promotion, application activation, traffic shift, validation and later controlled failback. Label RTO/RPO as workload-defined targets validated through drills, never Google Cloud guarantees or universal zero-data-loss claims.'
  },
  tech_supply_chain: {
    name: 'Equipment Predictive Maintenance & Reliability Intelligence',
    whenToUse: 'Equipment-focused condition monitoring and predictive maintenance using Manufacturing Connect/Manufacturing Data Engine, governed reliability data, Vertex AI models, grounded Gemini maintenance assistance, human-authorized work management, and explicit OT safety boundaries.',
    prompt: 'Design an equipment predictive-maintenance architecture: critical equipment and condition/inspection signals -> Manufacturing Connect and Manufacturing Data Engine -> governed time-series/history foundation -> Vertex AI anomaly/failure-risk models and grounded Gemini maintenance assistant -> reliability/technician review -> authorized CMMS/EAM work order -> outcome feedback. Keep PLC/SIS deterministic safety and control loops authoritative; do not create a direct GenAI-to-setpoint control path or unsupported numeric performance claims.'
  },
  smart_factory_iot: {
    name: 'Smart Factory Digital Twin & Operations Platform',
    whenToUse: 'Plant-wide ISA-95 smart-factory platform with industrial connectivity, contextualized OT/IT data, event/data foundation, a custom digital-twin application pattern, OEE/quality/energy intelligence, grounded operations assistance, governed enterprise workflows and explicit OT authority boundaries.',
    prompt: 'Design a plant-wide smart-factory architecture: ISA-95 Levels 0–4 -> Manufacturing Connect and Manufacturing Data Engine -> optional Google Distributed Cloud connected for justified local processing -> Pub/Sub/Dataflow/BigQuery and operational serving -> custom digital-twin service/state store (label it as an application pattern, not a managed Google Cloud product) -> OEE, quality, energy and grounded Gemini operations assistance -> approved ERP/EAM/MES workflows. Keep safety/PLC/SIS control deterministic and local.'
  },
  mcp_context_gateway: {
    name: 'Enterprise MCP Gateway on Google Cloud',
    whenToUse: 'Secure remote MCP access pattern with AI hosts and MCP clients, centralized gateway authentication/authorization/routing/rate control/audit, stateless remote MCP servers, enterprise tools/data, and explicit request/response/governance flows.',
    prompt: 'Design an Enterprise MCP Gateway on Google Cloud: AI hosts/agents -> MCP client layer -> secure stateless enterprise MCP gateway -> authenticated remote MCP servers (for example on Cloud Run) -> enterprise tools/data. Include OAuth/OIDC/IAM as appropriate, allowlists/policy, rate limits, optional Model Armor content inspection where supported, routing, audit/request logs, explicit Streamable HTTP request and response paths, and separate governance/observability controls. Do not model MCP as a generic LLM context bus.'
  }
};

function isEnterpriseReferenceId(archId?: string | null): boolean {
  const raw = String(archId || '').toLowerCase();
  const normalized = rawNormalizeArchitectureId(archId);
  return normalized === ENTERPRISE_REFERENCE_ID || raw.includes('total_unified_system_view') || raw.includes('unified_system_view');
}

function polish(xml: string, architectureId?: string | null): string {
  return applyBlueprintTextContainment(
    applyBlueprintSemanticIcons(
      applyBlueprintVisualSystem(
        applyBlueprintTechnicalAccuracy(xml),
        architectureId,
      ),
      architectureId,
    ),
    architectureId,
  );
}

function normalizeCustomerFacingOption(option: RawArchitectureTypeOption): RawArchitectureTypeOption {
  const normalized: RawArchitectureTypeOption = {
    ...option,
    name: currentText(option.name),
    category: currentText(option.category),
    whenToUse: currentText(option.whenToUse),
    prompt: currentText(option.prompt),
  };

  return {
    ...normalized,
    ...(CURRENT_OPTION_PATCHES[option.id] || {}),
  };
}

export const BUSINESS_ARCHITECTURE_TYPES = RAW_BUSINESS_ARCHITECTURE_TYPES.map(normalizeCustomerFacingOption);
export const TECHNICAL_ARCHITECTURE_TYPES = RAW_TECHNICAL_ARCHITECTURE_TYPES.map(normalizeCustomerFacingOption);
export const ARCHITECTURE_TYPES = RAW_ARCHITECTURE_TYPES.map(normalizeCustomerFacingOption);
export const normalizeArchitectureId = rawNormalizeArchitectureId;

export function getArchitectureTypeById(id?: string | null): RawArchitectureTypeOption | undefined {
  const option = rawGetArchitectureTypeById(id || '');
  return option ? normalizeCustomerFacingOption(option) : option;
}

export function getTemplateTitle(id?: string | null): string {
  const option = getArchitectureTypeById(id);
  if (option) return option.name;
  return id || 'Architecture Diagram';
}

export const getTechnicalArchitectureXml = rawGetTechnicalArchitectureXml;

export function getDefaultXmlForArchitecture(
  archId?: string | null,
  useCaseContext?: string,
  userPrompt?: string
): string | null {
  const normalizedId = rawNormalizeArchitectureId(archId);

  if (isEnterpriseReferenceId(archId)) {
    return polish(buildEnterpriseReferenceArchitectureXml(), ENTERPRISE_REFERENCE_ID);
  }

  const xml = rawGetDefaultXmlForArchitecture(archId, useCaseContext, userPrompt);
  if (!xml) return xml;

  if (normalizedId === 'blank_canvas' || normalizedId === 'arch_blank_canvas' || archId === 'v2_freeform') {
    return xml;
  }

  return polish(xml, normalizedId);
}
