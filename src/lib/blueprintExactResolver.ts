import {
  getExactErdReferenceXml,
} from './diagramCompiler';
import { getApprovedDevopsCicdBlueprintXml } from './approvedBlueprint24';
import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';
import { buildMultiAgentSequenceXml } from './masterBuilders/build_master_multi_agent_sequence';
import { buildSecureDeploymentPhase1Xml } from './masterBuilders/build_master_secure_deployment_phase1';
import { buildDataResidencyPhase1Xml } from './masterBuilders/build_master_data_residency_phase1';
import { buildDataOpsPhase1Xml } from './masterBuilders/build_master_dataops_phase1';
import { buildFinancialAdvisingPhase1Xml } from './masterBuilders/build_master_financial_advising_phase1';
import { buildPredictiveMaintenancePhase1Xml } from './masterBuilders/build_master_predictive_maintenance_phase1';
import { buildPharmaGenomicsPhase1Xml } from './masterBuilders/build_master_pharma_genomics_phase1';
import {
  getExactSixRsMigrationMatrixXml,
  getExactHybridStranglerTransitionXml,
  getExactCloudFinopsChargebackXml,
  getExactAiCoeOperatingModelXml,
  getExactMcpContextGatewayXml,
  getExactLogicalAiConfigTenantXml,
  getExactHubAndSpokeAgentConfigXml,
  getExactUnifiedDataGovernanceXml,
  getExactGoLiveWarRoomRunbookXml,
  getExactEnterpriseSreObservabilityXml,
  getExactFederatedIamSsoXml,
  getExactAiTrismGuardrailsXml,
  getExactAgenticRagWidescreenXml,
  getExactGcpDataLakehouseWbsXml,
  getExactMicroFrontendsXml,
  getExactMultimodalIngestionXml,
  getExactEvalSafetyXml,
  getExactAgenticMeshXml,
  getExactValueStreamMapXml,
  getExactAsIsToBeProcessFlowXml,
  getExactStreamingAnalyticsXml,
  getExactLlmopsLifecycleXml,
  getExactLlmCapacityQuotaXml,
  getExactServerlessGcpReferenceXml,
  getExactLegacyDataDependencyMapXml,
  getExactGcpLandingZoneVpcXml,
  getExactEnterpriseAgentRuntimeXml,
  getExactAiAgentApprovalWorkflowXml,
  getExactIncidentTriageSwimlaneXml,
  getExactEcommerceRetailXml,
  getExactHrTalentAiXml,
  getExactSmartFactoryIotXml,
  getExactC4ComponentLldXml,
  getExactBpmnWorkflowXml,
  getExactThreatModelingStrideXml,
  getExactDataLineageXml,
  getExactHealthcareFhirXml,
} from './newEnterpriseReferenceXmls';

export type CatalogXmlFactory = () => string;

/** Exact canonical dispatch for the 50-blueprint catalog. */
export const CATALOG_EXACT_FACTORIES: Readonly<Record<string, CatalogXmlFactory>> = {
  legacy_data_dependency_map: getExactLegacyDataDependencyMapXml,
  hybrid_strangler_transition: getExactHybridStranglerTransitionXml,
  value_stream_map: getExactValueStreamMapXml,
  asis_vs_tobe_process_flow: getExactAsIsToBeProcessFlowXml,
  cloud_finops_chargeback: getExactCloudFinopsChargebackXml,
  agentic_rag: getExactAgenticRagWidescreenXml,
  hub_and_spoke_agent_config: getExactHubAndSpokeAgentConfigXml,
  tech_data_lakehouse_gcp: getExactGcpDataLakehouseWbsXml,
  erd: getExactErdReferenceXml,
  unified_data_governance: getExactUnifiedDataGovernanceXml,
  federated_iam_sso: getExactFederatedIamSsoXml,
  tech_micro_frontends: getExactMicroFrontendsXml,
  logical_ai_config_tenant: getExactLogicalAiConfigTenantXml,
  sequence_diagram: buildMultiAgentSequenceXml,
  secure_deployment_map: buildSecureDeploymentPhase1Xml,
  gcp_landing_zone_vpc: getExactGcpLandingZoneVpcXml,
  data_residency_sovereign_map: buildDataResidencyPhase1Xml,
  enterprise_agent_runtime: getExactEnterpriseAgentRuntimeXml,
  tech_agentic_mesh: getExactAgenticMeshXml,
  tech_eval_safety: getExactEvalSafetyXml,
  tech_ai_trism_guardrails: getExactAiTrismGuardrailsXml,
  ai_agent_approval_workflow: getExactAiAgentApprovalWorkflowXml,
  // Blueprint 24: approved master supersedes the former diagramCompiler implementation.
  devops_cicd_pipeline: getApprovedDevopsCicdBlueprintXml,
  tech_event_driven_eda: () => getTechnicalArchitectureXml('tech_event_driven_eda'),
  tech_serverless_gcp: getExactServerlessGcpReferenceXml,
  tech_multimodal_ingestion: getExactMultimodalIngestionXml,
  tech_streaming_analytics: getExactStreamingAnalyticsXml,
  six_rs_migration_matrix: getExactSixRsMigrationMatrixXml,
  enterprise_sre_observability: getExactEnterpriseSreObservabilityXml,
  golive_warroom_runbook: getExactGoLiveWarRoomRunbookXml,
  incident_triage_swimlane: getExactIncidentTriageSwimlaneXml,
  tech_llm_capacity_quota: getExactLlmCapacityQuotaXml,
  ai_coe_operating_model: getExactAiCoeOperatingModelXml,
  tech_llmops_lifecycle: getExactLlmopsLifecycleXml,
  dataops_anomaly_detection: buildDataOpsPhase1Xml,
  tech_multi_region_dr: () => getTechnicalArchitectureXml('tech_multi_region_dr'),
  tech_fintech_payments: buildFinancialAdvisingPhase1Xml,
  tech_supply_chain: buildPredictiveMaintenancePhase1Xml,
  tech_genomics_clinical: buildPharmaGenomicsPhase1Xml,
  ecommerce_retail: getExactEcommerceRetailXml,
  smart_factory_iot: getExactSmartFactoryIotXml,
  hr_talent_ai: getExactHrTalentAiXml,
  healthcare_fhir_hl7: getExactHealthcareFhirXml,
  tech_c4_system_context: () => getTechnicalArchitectureXml('tech_c4_system_context'),
  c4_component_lld: getExactC4ComponentLldXml,
  bpmn_process_workflow: getExactBpmnWorkflowXml,
  threat_modeling_stride: getExactThreatModelingStrideXml,
  data_lineage_provenance: getExactDataLineageXml,
  mcp_context_gateway: getExactMcpContextGatewayXml,
};

export const CATALOG_CANONICAL_IDS = Object.freeze([
  'legacy_data_dependency_map','hybrid_strangler_transition','value_stream_map','asis_vs_tobe_process_flow','cloud_finops_chargeback','unified_system_view','agentic_rag','hub_and_spoke_agent_config','tech_data_lakehouse_gcp','erd','unified_data_governance','federated_iam_sso','tech_micro_frontends','logical_ai_config_tenant','sequence_diagram','secure_deployment_map','gcp_landing_zone_vpc','data_residency_sovereign_map','enterprise_agent_runtime','tech_agentic_mesh','tech_eval_safety','tech_ai_trism_guardrails','ai_agent_approval_workflow','devops_cicd_pipeline','tech_event_driven_eda','tech_serverless_gcp','tech_multimodal_ingestion','tech_streaming_analytics','six_rs_migration_matrix','enterprise_sre_observability','golive_warroom_runbook','incident_triage_swimlane','tech_llm_capacity_quota','ai_coe_operating_model','tech_llmops_lifecycle','dataops_anomaly_detection','tech_multi_region_dr','tech_fintech_payments','tech_supply_chain','tech_genomics_clinical','ecommerce_retail','smart_factory_iot','hr_talent_ai','healthcare_fhir_hl7','tech_c4_system_context','c4_component_lld','bpmn_process_workflow','threat_modeling_stride','data_lineage_provenance','mcp_context_gateway',
] as const);

function stampCanonicalIdentity(xml: string, canonicalId: string): string {
  if (!xml) return xml;
  let next = xml;
  const safeDiagramId = `catalog_${canonicalId}`;
  if (/<diagram\b[^>]*\bid="[^"]*"/i.test(next)) next = next.replace(/(<diagram\b[^>]*\bid=")[^"]*(")/i, `$1${safeDiagramId}$2`);
  if (!next.includes(`pc-catalog-id:${canonicalId}`)) next = next.replace(/(<mxGraphModel\b)/, `<!-- pc-catalog-id:${canonicalId} -->\n$1`);
  return next;
}

export function getExactCatalogBlueprintXml(canonicalId: string): string | null {
  if (canonicalId === 'unified_system_view') return null;
  const factory = CATALOG_EXACT_FACTORIES[canonicalId];
  return factory ? stampCanonicalIdentity(factory(), canonicalId) : null;
}
