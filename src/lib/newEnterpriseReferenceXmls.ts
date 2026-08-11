/**
 * 🏛️ Master Widescreen Reference Layouts for New Enterprise Blueprints
 * JOURNAL-PUBLICATION GRADE SCIENTIFIC REFERENCE ARCHITECTURES
 * 100% Authentic Google Cloud Well-Architected & Enterprise-Certified Blueprints
 */

import { buildEnterpriseSreObservabilityXml } from './masterBuilders/master_builder_enterprise_sre';
import { buildAiTrismGuardrailsXml } from './masterBuilders/master_builder_ai_trism';
import { buildMicroFrontendsXml } from './masterBuilders/master_builder_micro_frontends';
import { buildFederatedIamSsoXml } from './masterBuilders/master_builder_federated_iam';
import { buildDataResidencySovereignMapXml } from './masterBuilders/master_builder_data_residency';
import { buildDataOpsAnomalyDetectionXml } from './masterBuilders/master_builder_dataops_anomaly';
import { buildUnifiedDataGovernanceXml } from './masterBuilders/master_builder_unified_data_governance';
import { buildLogicalAiConfigTenantXml } from './masterBuilders/master_builder_logical_ai_config';
import { buildHubAndSpokeAgentConfigXml } from './masterBuilders/master_builder_hub_spoke_agent';
import { buildPristineAiCoeXml } from './masterBuilders/master_builder_ai_coe';
import { buildMcpContextGatewayXml } from './masterBuilders/master_builder_mcp_gateway';
import { build6RsMigrationMatrixXml } from './masterBuilders/master_builder_6rs';
import { buildGoLiveWarRoomRunbookXml } from './masterBuilders/master_builder_golive_warroom';
import { buildPristineStranglerFigXml } from './masterBuilders/master_builder_strangler';
import { buildPristineFinopsXml } from './masterBuilders/master_builder_finops';
import { buildFintechPaymentsXml } from './masterBuilders/build_master_fintech_payments';
import { buildGenomicsClinicalXml } from './masterBuilders/build_master_genomics_clinical';
import { buildMultimodalIngestionXml } from './masterBuilders/build_master_multimodal_ingestion';
import { buildSupplyChainXml } from './masterBuilders/build_master_supply_chain';
import { buildEvalSafetyXml } from './masterBuilders/build_master_eval_safety';
import { buildAgenticMeshXml } from './masterBuilders/build_master_agentic_mesh';
import { buildStreamingAnalyticsXml } from './masterBuilders/build_master_streaming_analytics';
import { buildLlmopsLifecycleXml } from './masterBuilders/build_master_llmops_lifecycle';
import { buildLlmCapacityQuotaXml } from './masterBuilders/build_master_llm_capacity_quota';
import { buildIncidentTriageSreXml } from './masterBuilders/build_master_incident_triage_sre';
import { buildZeroTrustMeshXml } from './masterBuilders/build_master_zero_trust_mesh';
import { buildCompleteWellArchitectedGcpDrMasterXml } from './masterBuilders/master_builder';
import { buildDataLakehouseXml } from './masterBuilders/build_master_data_lakehouse';
import { buildValueStreamMapXml } from './masterBuilders/master_builder_vsm';
import { buildAsIsToBeProcessFlowXml } from './masterBuilders/master_builder_asis_tobe';
import { buildServerlessEdaXml } from './masterBuilders/build_master_serverless_eda';
import { buildSecureDeploymentTopologyXml } from './masterBuilders/build_master_secure_deployment';

const SVG_GCP_LOGO = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%20width%3D%2236%22%20height%3D%2236%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E";
const SVG_CYLINDER_3D_RED = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2060%2070%22%20width%3D%2238%22%20height%3D%2244%22%3E%3Cpath%20d%3D%22M5%2C15%20L5%2C50%20C5%2C60%2055%2C60%2055%2C50%20L55%2C15%20Z%22%20fill%3D%22%23EF4444%22%20stroke%3D%22%23B91C1C%22%20stroke-width%3D%222%22%2F%3E%3Cellipse%20cx%3D%2230%22%20cy%3D%2250%22%20rx%3D%2225%22%20ry%3D%229%22%20fill%3D%22%23DC2626%22%20stroke%3D%22%23B91C1C%22%20stroke-width%3D%221.5%22%2F%3E%3Cellipse%20cx%3D%2230%22%20cy%3D%2215%22%20rx%3D%2225%22%20ry%3D%229%22%20fill%3D%22%23F87171%22%20stroke%3D%22%23B91C1C%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E";
const SVG_CYLINDER_3D_BLUE = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2060%2070%22%20width%3D%2238%22%20height%3D%2244%22%3E%3Cpath%20d%3D%22M5%2C15%20L5%2C50%20C5%2C60%2055%2C60%2055%2C50%20L55%2C15%20Z%22%20fill%3D%22%233B82F6%22%20stroke%3D%22%231D4ED8%22%20stroke-width%3D%222%22%2F%3E%3Cellipse%20cx%3D%2230%22%20cy%3D%2250%22%20rx%3D%2225%22%20ry%3D%229%22%20fill%3D%22%232563EB%22%20stroke%3D%22%231D4ED8%22%20stroke-width%3D%221.5%22%2F%3E%3Cellipse%20cx%3D%2230%22%20cy%3D%2215%22%20rx%3D%2225%22%20ry%3D%229%22%20fill%3D%22%2360A5FA%22%20stroke%3D%22%231D4ED8%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E";
const SVG_CYLINDER_3D_GREEN = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2060%2070%22%20width%3D%2238%22%20height%3D%2244%22%3E%3Cpath%20d%3D%22M5%2C15%20L5%2C50%20C5%2C60%2055%2C60%2055%2C50%20L55%2C15%20Z%22%20fill%3D%22%2310B981%22%20stroke%3D%22%23047857%22%20stroke-width%3D%222%22%2F%3E%3Cellipse%20cx%3D%2230%22%20cy%3D%2250%22%20rx%3D%2225%22%20ry%3D%229%22%20fill%3D%22%23059669%22%20stroke%3D%22%23047857%22%20stroke-width%3D%221.5%22%2F%3E%3Cellipse%20cx%3D%2230%22%20cy%3D%2215%22%20rx%3D%2225%22%20ry%3D%229%22%20fill%3D%22%2334D399%22%20stroke%3D%22%23047857%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E";
const SVG_HOPPER_RED = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20d%3D%22M12%2C18%20L68%2C18%20L56%2C66%20L24%2C66%20Z%22%20fill%3D%22%23EF4444%22%20stroke%3D%22%23B91C1C%22%20stroke-width%3D%222%22%2F%3E%3Cellipse%20cx%3D%2240%22%20cy%3D%2218%22%20rx%3D%2228%22%20ry%3D%227%22%20fill%3D%22%23F87171%22%20stroke%3D%22%23B91C1C%22%20stroke-width%3D%221.5%22%2F%3E%3Cpolygon%20points%3D%2230%2C36%2036%2C26%2042%2C36%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2246%22%20r%3D%224.5%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2244%22%20width%3D%228.5%22%20height%3D%228.5%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";
const SVG_HOPPER_BLUE = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20d%3D%22M12%2C18%20L68%2C18%20L56%2C66%20L24%2C66%20Z%22%20fill%3D%22%233B82F6%22%20stroke%3D%22%231D4ED8%22%20stroke-width%3D%222%22%2F%3E%3Cellipse%20cx%3D%2240%22%20cy%3D%2218%22%20rx%3D%2228%22%20ry%3D%227%22%20fill%3D%22%2360A5FA%22%20stroke%3D%22%231D4ED8%22%20stroke-width%3D%221.5%22%2F%3E%3Cpolygon%20points%3D%2230%2C36%2036%2C26%2042%2C36%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2246%22%20r%3D%224.5%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2244%22%20width%3D%228.5%22%20height%3D%228.5%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";
const SVG_HOPPER_GREEN = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20d%3D%22M12%2C18%20L68%2C18%20L56%2C66%20L24%2C66%20Z%22%20fill%3D%22%2310B981%22%20stroke%3D%22%23047857%22%20stroke-width%3D%222%22%2F%3E%3Cellipse%20cx%3D%2240%22%20cy%3D%2218%22%20rx%3D%2228%22%20ry%3D%227%22%20fill%3D%22%2334D399%22%20stroke%3D%22%23047857%22%20stroke-width%3D%221.5%22%2F%3E%3Cpolygon%20points%3D%2230%2C36%2036%2C26%2042%2C36%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2246%22%20r%3D%224.5%22%20fill%3D%22white%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2244%22%20width%3D%228.5%22%20height%3D%228.5%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";
const SVG_SOC2_MEDAL = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20120%22%20width%3D%2246%22%20height%3D%2256%22%3E%3Cpolygon%20points%3D%2235%2C68%2018%2C115%2045%2C95%22%20fill%3D%22%231E40AF%22%2F%3E%3Cpolygon%20points%3D%2265%2C68%2082%2C115%2055%2C95%22%20fill%3D%22%231E40AF%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2248%22%20r%3D%2238%22%20fill%3D%22%232563EB%22%20stroke%3D%22%231D4ED8%22%20stroke-width%3D%223%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2240%22%20fill%3D%22white%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%3ESOC%3C%2Ftext%3E%3Ctext%20x%3D%2250%22%20y%3D%2262%22%20fill%3D%22white%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%3E2%3C%2Ftext%3E%3Ctext%20x%3D%2250%22%20y%3D%2274%22%20fill%3D%22%23BFDBFE%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%227.5%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3ECOMPLIANCE%3C%2Ftext%3E%3C%2Fsvg%3E";
const SVG_21CFR_MEDAL = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20120%22%20width%3D%2246%22%20height%3D%2256%22%3E%3Cpolygon%20points%3D%2235%2C68%2018%2C115%2045%2C95%22%20fill%3D%22%23B91C1C%22%2F%3E%3Cpolygon%20points%3D%2265%2C68%2082%2C115%2055%2C95%22%20fill%3D%22%23B91C1C%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2248%22%20r%3D%2238%22%20fill%3D%22%23FEE2E2%22%20stroke%3D%22%23DC2626%22%20stroke-width%3D%223%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2242%22%20fill%3D%22%23991B1B%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E21%20CFR%3C%2Ftext%3E%3Ctext%20x%3D%2250%22%20y%3D%2260%22%20fill%3D%22%23991B1B%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2211.5%22%20text-anchor%3D%22middle%22%3EPart%2011%3C%2Ftext%3E%3C%2Fsvg%3E";
const SVG_GXP_MEDAL = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20120%22%20width%3D%2246%22%20height%3D%2256%22%3E%3Cpolygon%20points%3D%2235%2C68%2018%2C115%2045%2C95%22%20fill%3D%22%231D4ED8%22%2F%3E%3Cpolygon%20points%3D%2265%2C68%2082%2C115%2055%2C95%22%20fill%3D%22%231D4ED8%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2248%22%20r%3D%2238%22%20fill%3D%22%23FEF3C7%22%20stroke%3D%22%23D97706%22%20stroke-width%3D%223%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2248%22%20r%3D%2232%22%20fill%3D%22%23FDE68A%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2255%22%20fill%3D%22%2378350F%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2218%22%20text-anchor%3D%22middle%22%3EGxP%3C%2Ftext%3E%3C%2Fsvg%3E";
const SVG_ANALYTICAL_CHART = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20140%2070%22%20width%3D%22110%22%20height%3D%2250%22%3E%3Cpath%20d%3D%22M5%2C55%20Q35%2C15%2070%2C35%20T135%2C10%20L135%2C65%20L5%2C65%20Z%22%20fill%3D%22%23DBEAFE%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%225%22%20y1%3D%2265%22%20x2%3D%22135%22%20y2%3D%2265%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%225%22%20y1%3D%225%22%20x2%3D%225%22%20y2%3D%2265%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E";

export function getExactEnterpriseSreObservabilityXml(): string {
  return buildEnterpriseSreObservabilityXml();
}

export function getExactAiTrismGuardrailsXml(): string {
  return buildAiTrismGuardrailsXml();
}

export function getExactMicroFrontendsXml(): string {
  return buildMicroFrontendsXml();
}

export function getExactFederatedIamSsoXml(): string {
  return buildFederatedIamSsoXml();
}

export function getExactDataResidencySovereignMapXml(): string {
  return buildDataResidencySovereignMapXml();
}

export function getExactDataOpsAnomalyDetectionXml(): string {
  return buildDataOpsAnomalyDetectionXml();
}

export function getExactUnifiedDataGovernanceXml(): string {
  return buildUnifiedDataGovernanceXml();
}

export function getExactLogicalAiConfigTenantXml(): string {
  return buildLogicalAiConfigTenantXml();
}

export function getExactHubAndSpokeAgentConfigXml(): string {
  return buildHubAndSpokeAgentConfigXml();
}

export function getExactAiCoeOperatingModelXml(): string {
  return buildPristineAiCoeXml();
}

export function getExactMcpContextGatewayXml(): string {
  return buildMcpContextGatewayXml();
}

export function getExactSixRsMigrationMatrixXml(): string {
  return build6RsMigrationMatrixXml();
}

export function getExactGoLiveWarRoomRunbookXml(): string {
  return buildGoLiveWarRoomRunbookXml();
}

export function getExactHybridStranglerTransitionXml(): string {
  return buildPristineStranglerFigXml();
}

export function getExactCloudFinopsChargebackXml(): string {
  return buildPristineFinopsXml();
}

export function getExactFintechPaymentsXml(): string {
  return buildFintechPaymentsXml();
}

export function getExactGenomicsClinicalXml(): string {
  return buildGenomicsClinicalXml();
}

export function getExactMultimodalIngestionXml(): string {
  return buildMultimodalIngestionXml();
}

export function getExactSupplyChainXml(): string {
  return buildSupplyChainXml();
}

export function getExactEvalSafetyXml(): string {
  return buildEvalSafetyXml();
}

export function getExactAgenticMeshXml(): string {
  return buildAgenticMeshXml();
}

export function getExactStreamingAnalyticsXml(): string {
  return buildStreamingAnalyticsXml();
}

export function getExactLlmopsLifecycleXml(): string {
  return buildLlmopsLifecycleXml();
}

export function getExactLlmCapacityQuotaXml(): string {
  return buildLlmCapacityQuotaXml();
}

export function getExactIncidentTriageSreXml(): string {
  return buildIncidentTriageSreXml();
}

export function getExactZeroTrustMeshXml(): string {
  return buildZeroTrustMeshXml();
}

export function getExactMultiRegionDrReferenceXml(): string {
  return buildCompleteWellArchitectedGcpDrMasterXml();
}

export function getExactDataLakehouseXml(): string {
  return buildDataLakehouseXml();
}

export function getExactGcpDataLakehouseWbsXml(): string {
  return buildDataLakehouseXml();
}

export function getExactSecureDeploymentMapWidescreenXml(): string {
  return buildSecureDeploymentTopologyXml();
}

export function getExactAgenticRagWidescreenXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="agentic_rag_master" name="Cognitive Architecture (Agentic RAG)">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1600" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="zone_1" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;Zone 1: The Interface&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;color:#475569;&quot;&gt;(User Interaction)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="300" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="zone_2" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;Zone 2: The Agentic Core&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;color:#475569;&quot;&gt;(Orchestration &amp; Reasoning)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="380" y="40" width="600" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="zone_3" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;Zone 3: The Tool Ecosystem&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;color:#475569;&quot;&gt;(Secured Environment)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="1020" y="40" width="580" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="sec_bound" value="Secure Managed Gemini Enterprise Ecosystem Boundary" style="rounded=0;whiteSpace=wrap;html=1;dashed=1;fillColor=none;strokeColor=#64748B;strokeWidth=2;strokeDashArray=6 6;verticalAlign=top;align=left;spacingLeft=18;spacingTop=12;fontFamily=Helvetica;fontSize=14;fontStyle=1;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="400" y="110" width="560" height="630" as="geometry"/>
        </mxCell>
        <mxCell id="user_chat" value="&lt;img src=&apos;https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-messages.png&apos; width=&apos;44&apos; height=&apos;44&apos;&gt;&lt;br&gt;&lt;b style=&apos;font-size:16px;color:#1E293B;&apos;&gt;User Interface /&lt;br&gt;Chat App&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="320" width="220" height="180" as="geometry"/>
        </mxCell>
        <mxCell id="orchestrator_box" value="&lt;img src=&apos;https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-cloud.png&apos; width=&apos;24&apos; height=&apos;24&apos; style=&apos;vertical-align:middle;&apos;&gt;&amp;nbsp;&amp;nbsp;Agent Orchestrator (Vertex AI)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=18;spacingTop=15;fontFamily=Helvetica;fontSize=16;fontStyle=1;fontColor=#1D4ED8;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="430" y="150" width="520" height="560" as="geometry"/>
        </mxCell>
        <mxCell id="sys_prompt" value="&lt;b style=&apos;font-size:15px;color:#1E293B;&apos;&gt;System Prompt /&lt;br&gt;Persona&lt;/b&gt;&lt;br&gt;&lt;span style=&apos;font-size:12px;color:#475569;&apos;&gt;Guardrails and identity&lt;br&gt;(e.g., &amp;quot;Financial Analyst&amp;quot;)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="460" y="210" width="210" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="conv_mem" value="&lt;b style=&apos;font-size:15px;color:#1E293B;&apos;&gt;Conversation&lt;br&gt;Memory&lt;/b&gt;&lt;br&gt;&lt;span style=&apos;font-size:12px;color:#475569;&apos;&gt;Persistent short-term&lt;br&gt;context&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="710" y="210" width="210" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="reasoner_box" value="The Reasoner: Gemini 3.1 Pro (LLM)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=2;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;fontSize=16;fontStyle=1;fontColor=#0F172A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="460" y="360" width="460" height="320" as="geometry"/>
        </mxCell>
        <mxCell id="react_center" value="&lt;b style=&apos;font-size:16px;color:#1E293B;&apos;&gt;ReAct&lt;br&gt;Loop&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="640" y="490" width="100" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="react_thought" value="Thought" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="640" y="420" width="100" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="react_action" value="Action" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="770" y="505" width="80" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="react_obs" value="Observation" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="640" y="590" width="100" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="react_syn" value="Synthesis" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="530" y="505" width="80" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="e_r1" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="react_thought" target="react_action">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="815" y="435"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_r2" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=1;entryY=0.5;" edge="1" parent="1" source="react_action" target="react_obs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="815" y="605"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_r3" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=0.5;entryY=1;" edge="1" parent="1" source="react_obs" target="react_syn">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="570" y="605"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_r4" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=0.5;exitY=0;entryX=0;entryY=0.5;" edge="1" parent="1" source="react_syn" target="react_thought">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="570" y="435"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="tool_vec" value="&lt;b style=&apos;font-size:15px;color:#1E293B;&apos;&gt;Document Index&lt;/b&gt;&lt;br&gt;&lt;span style=&apos;font-size:12px;color:#475569;&apos;&gt;Vertex AI Vector Search&lt;br&gt;(PDFs, DOCX, Text)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8B5CF6;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1060" y="140" width="220" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="tool_sql" value="&lt;b style=&apos;font-size:15px;color:#1E293B;&apos;&gt;Enterprise DB&lt;/b&gt;&lt;br&gt;&lt;span style=&apos;font-size:12px;color:#475569;&apos;&gt;BigQuery / AlloyDB SQL&lt;br&gt;(Structured Tables)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8B5CF6;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1060" y="320" width="220" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="tool_api" value="&lt;b style=&apos;font-size:15px;color:#1E293B;&apos;&gt;External API / Tools&lt;/b&gt;&lt;br&gt;&lt;span style=&apos;font-size:12px;color:#475569;&apos;&gt;gVisor Code Sandbox &amp;amp;&lt;br&gt;REST Integrations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8B5CF6;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1060" y="500" width="220" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="e_u_to_o" value="User Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1" source="user_chat" target="orchestrator_box">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_o_to_v" value="Semantic Retrieval" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#8B5CF6;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontStyle=1;fontSize=11;fontColor=#6D28D9;" edge="1" parent="1" source="orchestrator_box" target="tool_vec">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_o_to_s" value="SQL Query Gen" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#8B5CF6;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontStyle=1;fontSize=11;fontColor=#6D28D9;" edge="1" parent="1" source="orchestrator_box" target="tool_sql">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_o_to_a" value="Sandboxed Execution" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#8B5CF6;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontStyle=1;fontSize=11;fontColor=#6D28D9;" edge="1" parent="1" source="orchestrator_box" target="tool_api">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export function getExactServerlessGcpReferenceXml(): string {
  return buildServerlessEdaXml();
}

export function getExactValueStreamMapXml(): string {
  return buildValueStreamMapXml();
}

export function getExactAsIsToBeProcessFlowXml(): string {
  return buildAsIsToBeProcessFlowXml();
}
