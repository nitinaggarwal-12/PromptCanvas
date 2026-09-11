/**
 * 🏛️ Omni 1.1 Multi-Agent Architecture Engine Types
 * 
 * Defines the roles, execution states, audit criteria, and remediation contracts
 * where Omni 1.1 acts as the Director & Quality Control Chief.
 */

export type AgentRole = 
  | 'OMNI_DIRECTOR'     // Omni 1.1: Work intake, decomposition, crew dispatch
  | 'TOPOLOGY_PLANNER'  // Flash: Fast OCR, spatial zoning, signature matching
  | 'AST_BUILDER'       // Pro: High-fidelity Draw.io XML graph AST synthesis
  | 'OMNI_QC_CHIEF'     // Omni 1.1: Multimodal forensic inspection & blocking gate
  | 'REMEDIATION_AGENT';// Surgical AST auto-healing

export type AuditCategory =
  | 'SHAPE_GEOMETRY'    // Bounding boxes, container sizes, header span, aspect ratio
  | 'ICON_GLYPH'        // Placeholder detection (e.g. circle with slash), exact cloud icons
  | 'CONNECTORS_FLOW'   // Step sequence numbers, dashed feedback return loops, arrowheads
  | 'CONTAINER_ENCLAVE' // Nested subnets, CMEK security colors, platform boundaries
  | 'LEGEND_INTEGRITY'  // Non-empty legend box, verified definitions table
  | 'CHEVRON_STAGE'     // Process chevron cards vs plain unstyled text lines
  | 'MASCOT_AVATAR'     // Agentic robot avatars (🤖) and interface nodes
  | 'BRANDING_STYLE';   // Gemini gradient logos, palette contrast, font scaling

export interface QualityGap {
  category: AuditCategory;
  elementId?: string;
  elementName: string;
  description: string;
  expected: string;
  actual: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  remediation: string;
}

export interface OmniAuditReport {
  timestamp: number;
  iteration: number;
  verdict: 'PASS' | 'REMEDIATE' | 'BLOCKED';
  parityScore: number; // 0 to 100%
  checkedDimensions: {
    shapes: boolean;
    icons: boolean;
    connectors: boolean;
    containers: boolean;
    legend: boolean;
    chevrons: boolean;
    mascots: boolean;
    branding: boolean;
  };
  gaps: QualityGap[];
  remediationDirectives: string[];
  certifiedBy: 'Omni 1.1 (Quality Control Chief)';
}

export interface MultiAgentExecutionStep {
  agent: AgentRole;
  agentModel: string;
  phase: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  message: string;
  durationMs?: number;
  outputSummary?: string;
}

export interface ModelCallSpec {
  model: string;
  role: AgentRole | string;
  order: number;
  inputContract: string;
  outputContract: string;
  isOptional?: boolean;
}

export interface DynamicModelOrchestrationPlan {
  decidedBy: 'Google Omni 1.1';
  executionStrategy: 'SEQUENTIAL' | 'PARALLEL' | 'HYBRID_DAG';
  selectedModels: ModelCallSpec[];
  coordinationProtocol: string;
}

export interface OmniOrchestrationResult {
  success: boolean;
  xml: string;
  summary: string;
  extractedZones: string[];
  componentCount: number;
  isCertified: boolean;
  auditReport: OmniAuditReport;
  orchestrationPlan?: DynamicModelOrchestrationPlan;
  steps: MultiAgentExecutionStep[];
  matchedMasterBlueprintId?: string;
  masterBlueprintTitle?: string;
  totalDurationMs: number;
}
