/**
 * ☀️ Master Builders for Templates 1 through 10 (Light Executive Theme)
 * Highly detailed, technically accurate, visually rich, crisp light theme with proper data flow arrows.
 */

import {
  LIGHT_ICONS,
  lightCell,
  lightTier,
  lightCard,
  lightPill,
  lightFlowEdge,
} from '../lightExecutiveArchitectureTheme';

function wrapDiagramXml(id: string, name: string, cells: string[]): string {
  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T23:45:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="${id}" name="${name}">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1000" pageHeight="720" background="#F8FAFC">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// ============================================================================
// TEMPLATE #1: Discovery & Assessment: Legacy Silos to Modern Migration Waves
// ============================================================================
export function buildLightLegacyDataDependencyMapXml(): string {
  const cells: string[] = [
    // Top Ingress Sources
    lightPill('src_main', 'On-Premises Mainframe', 'COBOL / DB2 Core', 260, 20, 150),
    lightPill('src_erp', 'Legacy Oracle ERP', 'OLTP & Financials', 430, 20, 150),
    lightPill('src_custom', 'Custom Monolithic Apps', '.NET / Java EE', 600, 20, 150),
    lightPill('src_nas', 'Enterprise NAS / SAN', 'Unstructured Files', 770, 20, 150),

    // Tier 1: DISCOVERY & ASSESSMENT
    lightTier('t1', '1. DISCOVERY &amp; ASSESSMENT<br/>INVENTORY TIER', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_mc', 'Migration Center Discovery', 'Automated OS &amp; VM Inventory Scan', LIGHT_ICONS.gce, 300, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_sz', 'StratoZone Assessment', 'TCO Modeling &amp; Workload Profiling', LIGHT_ICONS.finops, 600, 110, 270, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: DEPENDENCY MAPPING & WAVE PLANNING
    lightTier('t2', '2. DEPENDENCY MAPPING<br/>&amp; WAVE PLANNING GATE', 210, 110, 940, 30, '#1E3A8A'),
    lightCard('n_dep', 'Application Dependency Graph', 'Inter-Service Affinity &amp; Latency Grouping', LIGHT_ICONS.dataplex, 280, 230, 200, 70, '#1D4ED8'),
    lightCard('n_w1', 'Wave 1: Quick Wins', 'Dev/Test &amp; Web Rehost (Lift &amp; Shift)', LIGHT_ICONS.gce, 500, 230, 200, 70, '#059669'),
    lightCard('n_w2', 'Wave 2 &amp; 3: Core Modernization', 'Database Migration &amp; Microservices Refactor', LIGHT_ICONS.gke, 720, 230, 220, 70, '#7C3AED'),

    // Tier 3: REPLICATION & TRANSIT ENGINES
    lightTier('t3', '3. DATA MIGRATION<br/>&amp; CDC REPLICATION', 340, 100, 940, 30, '#0F766E'),
    lightCard('n_dms', 'Database Migration Service (DMS)', 'Continuous Minimal-Downtime CDC', LIGHT_ICONS.sql, 340, 360, 260, 60, '#059669', LIGHT_ICONS.google),
    lightCard('n_sts', 'Storage Transfer Service (STS)', 'PB-Scale Parallel File Ingestion', LIGHT_ICONS.gcs, 640, 360, 260, 60, '#059669', LIGHT_ICONS.google),

    // Tier 4: TARGET GOOGLE CLOUD LANDING ZONE
    lightTier('t4', '4. TARGET GOOGLE CLOUD<br/>LANDING ZONE STATE', 460, 110, 940, 30, '#1E293B'),
    lightCard('c_gke', 'GKE Enterprise Fleet', 'Modern Container Workloads', LIGHT_ICONS.gke, 280, 480, 200, 70, '#2563EB'),
    lightCard('c_alloy', 'AlloyDB / Cloud SQL', 'Managed HA Relational Stores', LIGHT_ICONS.sql, 500, 480, 200, 70, '#2563EB'),
    lightCard('c_lake', 'BigQuery Lakehouse', 'Centralized Analytical State', LIGHT_ICONS.bq, 720, 480, 220, 70, '#2563EB'),

    // Tier 5: GOVERNANCE & CUTOVER VALIDATION
    lightTier('t5', '5. CUTOVER VALIDATION<br/>&amp; FINOPS GOVERNANCE', 590, 110, 940, 30, '#047857'),
    lightCard('c_mon', 'Cloud Monitoring &amp; Logging', 'SLA &amp; Performance Baselines', LIGHT_ICONS.looker, 280, 610, 200, 70, '#059669'),
    lightCard('c_lineage', 'Dataplex Lineage &amp; Quality', 'Data Integrity &amp; Parity Check', LIGHT_ICONS.dataplex, 500, 610, 210, 70, '#059669'),
    lightCard('c_fin', 'FinOps TCO Dashboard', 'Actual vs. Projected Cloud ROI', LIGHT_ICONS.finops, 730, 610, 210, 70, '#059669'),

    // Flow Edges
    lightFlowEdge('e_src_mc', 'src_erp', 'n_mc', '1. OS Discovery Scan', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_mc_sz', 'n_mc', 'n_sz', '2. Telemetry Export', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_sz_dep', 'n_sz', 'n_dep', '3. Map Affinities', 0.5, 1, 0.5, 0, [[735, 190], [380, 190]]),
    lightFlowEdge('e_dep_w1', 'n_dep', 'n_w1', 'Assign Wave 1', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_w1_w2', 'n_w1', 'n_w2', 'Sequence Waves', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_w2_dms', 'n_w2', 'n_dms', '4. Replicate Data', 0.5, 1, 0.5, 0, [[830, 320], [470, 320]]),
    lightFlowEdge('e_dms_alloy', 'n_dms', 'c_alloy', '5. Replicate to Cloud', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_w2_gke', 'n_w2', 'c_gke', 'Deploy Pods', 0.2, 1, 0.5, 0, [[764, 320], [380, 320]]),
    lightFlowEdge('e_alloy_lineage', 'c_alloy', 'c_lineage', '6. Parity Verification', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_gke_mon', 'c_gke', 'c_mon', 'Telemetry', 0.5, 1, 0.5, 0),
  ];

  return wrapDiagramXml('catalog_legacy_data_dependency_map', 'Legacy Silos to Modern Migration Waves', cells);
}

// ============================================================================
// TEMPLATE #2: Hybrid / Strangler Fig Transition Architecture
// ============================================================================
export function buildLightHybridStranglerTransitionXml(): string {
  const cells: string[] = [
    // Top Ingress Clients
    lightPill('src_users', 'Enterprise Web Users', 'HTTPS / TLS 1.3', 280, 20, 170),
    lightPill('src_mobile', 'Mobile App Clients', 'REST &amp; GraphQL', 480, 20, 170),
    lightPill('src_b2b', 'B2B Partners', 'mTLS / API Keys', 680, 20, 170),

    // Tier 1: EDGE SECURITY & GLOBAL INGRESS
    lightTier('t1', '1. EDGE ROUTING<br/>&amp; API GATEWAY TIER', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_armor', 'Cloud Armor &amp; GCLB', 'DDoS Protection &amp; WAF Rules', LIGHT_ICONS.shield, 320, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_apigee', 'Apigee X API Gateway', 'Traffic Interception &amp; Rate Limiting', LIGHT_ICONS.api, 620, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: STRANGLER ROUTING & ANTI-CORRUPTION LAYER (ACL)
    lightTier('t2', '2. STRANGLER ROUTER<br/>&amp; ANTI-CORRUPTION LAYER', 210, 110, 940, 30, '#7C3AED'),
    lightCard('n_router', 'Dynamic Strangler Router', 'Canary Traffic Split (e.g., 90/10 to 0/100)', LIGHT_ICONS.router, 300, 230, 260, 70, '#7C3AED'),
    lightCard('n_acl', 'Anti-Corruption Layer (ACL)', 'Domain Model Translation &amp; Facade', LIGHT_ICONS.dataplex, 600, 230, 270, 70, '#7C3AED'),

    // Tier 3: LEGACY MONOLITH (DRAINING) vs CLOUD MICROSERVICES
    lightTier('t3', '3. DUAL EXECUTION TIER<br/>(LEGACY VS. MODERN)', 340, 110, 940, 30, '#1E3A8A'),
    lightCard('n_mono', 'On-Premises Monolith (Draining)', 'Legacy Mainframe / Monolithic DB', LIGHT_ICONS.gce, 280, 360, 220, 70, '#DC2626'),
    lightCard('n_gke', 'GKE Modern Microservices', 'Domain Services (Auth, Billing, Orders)', LIGHT_ICONS.gke, 520, 360, 210, 70, '#059669'),
    lightCard('n_pubsub', 'Pub/Sub Event Mesh', 'Async Event Choreography', LIGHT_ICONS.pubsub, 750, 360, 195, 70, '#2563EB'),

    // Tier 4: TARGET CLOUD PERSISTENCE & DUAL WRITE
    lightTier('t4', '4. CLOUD PERSISTENCE<br/>&amp; EVENT OUTBOX', 470, 100, 940, 30, '#047857'),
    lightCard('c_spanner', 'Cloud Spanner / AlloyDB', 'Scalable Cloud-Native Database', LIGHT_ICONS.spanner, 340, 490, 260, 60, '#059669', LIGHT_ICONS.google),
    lightCard('c_datastream', 'Datastream CDC Backfill', 'Bi-Directional Legacy Sync', LIGHT_ICONS.sql, 640, 490, 260, 60, '#059669', LIGHT_ICONS.google),

    // Tier 5: OBSERVABILITY & COMPLETE MONOLITH RETIREMENT
    lightTier('t5', '5. SRE OBSERVABILITY<br/>&amp; RETIREMENT GATE', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_sre', 'Cloud Trace &amp; OpenTelemetry', 'End-to-End Distributed Request Tracing', LIGHT_ICONS.looker, 280, 610, 220, 70, '#2563EB'),
    lightCard('c_traffic', 'Traffic Parity Monitor', 'Zero-Error Functional Validation', LIGHT_ICONS.looker, 520, 610, 210, 70, '#2563EB'),
    lightCard('c_decom', 'Decommissioning Sign-Off', 'Monolith Final Sunset &amp; Cost Cut', LIGHT_ICONS.shield, 750, 610, 200, 70, '#059669'),

    // Flow Edges
    lightFlowEdge('e_mob_armor', 'src_mobile', 'n_armor', '1. Inbound Requests', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_armor_apigee', 'n_armor', 'n_apigee', 'WAF Verified', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_apigee_route', 'n_apigee', 'n_router', '2. Dynamic Interception', 0.5, 1, 0.5, 0, [[750, 190], [430, 190]]),
    lightFlowEdge('e_route_mono', 'n_router', 'n_mono', 'Legacy Route (Draining)', 0.3, 1, 0.5, 0),
    lightFlowEdge('e_route_gke', 'n_router', 'n_gke', '3. Modern Route (Strangled)', 0.7, 1, 0.5, 0),
    lightFlowEdge('e_gke_pub', 'n_gke', 'n_pubsub', 'Publish Event', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_gke_span', 'n_gke', 'c_spanner', '4. ACID Write', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_mono_ds', 'n_mono', 'c_datastream', 'Legacy CDC Stream', 0.5, 1, 0.3, 0, [[390, 450], [718, 450]]),
    lightFlowEdge('e_span_sre', 'c_spanner', 'c_sre', '5. Latency Telemetry', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_ds_traffic', 'c_datastream', 'c_traffic', 'Data Parity Check', 0.5, 1, 0.5, 0),
  ];

  return wrapDiagramXml('catalog_hybrid_strangler_fig_transition', 'Hybrid Strangler Fig Transition Architecture', cells);
}

// ============================================================================
// TEMPLATE #3: Enterprise AI Architecture & Delivery Value Stream Map
// ============================================================================
export function buildLightValueStreamMapXml(): string {
  const cells: string[] = [
    // Top Ingress Personas
    lightPill('src_biz', 'Business Product Owner', 'Value &amp; KPIs', 260, 20, 160),
    lightPill('src_ds', 'Data Scientist / ML Eng', 'Models &amp; Tuning', 440, 20, 160),
    lightPill('src_gov', 'Compliance &amp; Risk Lead', 'AI TRiSM Guardrails', 620, 20, 160),

    // Tier 1: DISCOVERY & VALUE HYPOTHESIS
    lightTier('t1', '1. AI DISCOVERY<br/>&amp; VALUE PRIORITIZATION', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_roi', 'AI Business Opportunity Matrix', 'ROI Scoring &amp; Cost-Benefit Feasibility', LIGHT_ICONS.finops, 320, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_trism', 'AI TRiSM Risk Assessment', 'Fairness, PII &amp; Compliance Filter', LIGHT_ICONS.shield, 620, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: DATA CURATION & FEATURE ENGINEERING
    lightTier('t2', '2. DATA CURATION<br/>&amp; GROUNDING FOUNDATION', 210, 110, 940, 30, '#1E3A8A'),
    lightCard('n_lake', 'BigQuery Enterprise Lakehouse', 'Clean Bronze/Silver/Gold Datasets', LIGHT_ICONS.bq, 300, 230, 260, 70, '#1D4ED8'),
    lightCard('n_feat', 'Vertex AI Feature Store', 'Point-in-Time Accurate Online/Offline Features', LIGHT_ICONS.vertex, 600, 230, 270, 70, '#1D4ED8'),

    // Tier 3: MODEL EXPERIMENTATION & PROMPT ENGINEERING
    lightTier('t3', '3. EXPERIMENTATION<br/>&amp; PROMPT OPTIMIZATION', 340, 100, 940, 30, '#7C3AED'),
    lightCard('n_studio', 'Vertex AI Model Garden &amp; Studio', 'Gemini Model Selection &amp; System Prompts', LIGHT_ICONS.gemini, 340, 360, 270, 60, '#7C3AED', LIGHT_ICONS.google),
    lightCard('n_eval', 'Vertex Model Evaluation Gate', 'Benchmark Scoring against Ground Truth', LIGHT_ICONS.dataplex, 640, 360, 260, 60, '#7C3AED', LIGHT_ICONS.google),

    // Tier 4: AUTOMATED CI/CD/CT PIPELINES
    lightTier('t4', '4. AUTOMATED CI/CD/CT<br/>&amp; ATTESTATION GATE', 460, 110, 940, 30, '#047857'),
    lightCard('c_pipe', 'Vertex AI Pipelines (Kubeflow)', 'Reproducible Training &amp; Fine-Tuning', LIGHT_ICONS.vertex, 280, 480, 220, 70, '#059669'),
    lightCard('c_reg', 'Vertex AI Model Registry', 'Versioned Artifacts &amp; Lineage', LIGHT_ICONS.vertex, 520, 480, 210, 70, '#059669'),
    lightCard('c_binauth', 'Binary Authorization Gate', 'Cryptographic Signature Verification', LIGHT_ICONS.shield, 750, 480, 200, 70, '#059669'),

    // Tier 5: VALUE REALIZATION & LIVE MONITORING
    lightTier('t5', '5. PRODUCTION VALUE<br/>&amp; CONTINUOUS FEEDBACK', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_end', 'Vertex Online Endpoints', 'Sub-100ms Production Inference', LIGHT_ICONS.vertex, 280, 610, 200, 70, '#2563EB'),
    lightCard('c_mon', 'Vertex Model Monitoring', 'Real-Time Drift &amp; Outlier Detection', LIGHT_ICONS.looker, 500, 610, 210, 70, '#2563EB'),
    lightCard('c_dash', 'Executive Value Dashboard', 'Realized Cost Savings &amp; Efficiency KPIs', LIGHT_ICONS.finops, 730, 610, 210, 70, '#2563EB'),

    // Flow Edges
    lightFlowEdge('e_biz_roi', 'src_biz', 'n_roi', '1. Submit Business Case', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_roi_trism', 'n_roi', 'n_trism', 'Feasible Case', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_trism_lake', 'n_trism', 'n_lake', '2. Curate Grounding Data', 0.5, 1, 0.5, 0, [[750, 190], [430, 190]]),
    lightFlowEdge('e_lake_feat', 'n_lake', 'n_feat', 'Generate Features', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_feat_studio', 'n_feat', 'n_studio', '3. Grounded Prompts', 0.5, 1, 0.5, 0, [[735, 320], [475, 320]]),
    lightFlowEdge('e_studio_eval', 'n_studio', 'n_eval', 'Run Benchmarks', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_eval_pipe', 'n_eval', 'c_pipe', '4. Quality Approved', 0.5, 1, 0.5, 0, [[770, 440], [390, 440]]),
    lightFlowEdge('e_pipe_reg', 'c_pipe', 'c_reg', 'Register Model', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_reg_bin', 'c_reg', 'c_binauth', 'Sign Artifact', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_bin_end', 'c_binauth', 'c_end', '5. Deploy to Prod', 0.5, 1, 0.5, 0, [[850, 570], [380, 570]]),
    lightFlowEdge('e_end_mon', 'c_end', 'c_mon', 'Log Predictions', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_mon_dash', 'c_mon', 'c_dash', 'Realized ROI Metrics', 1, 0.5, 0, 0.5),
  ];

  return wrapDiagramXml('catalog_value_stream_map_vsm', 'Enterprise AI Value Stream Map', cells);
}

// ============================================================================
// TEMPLATE #4: As-Is vs. To-Be Process & Architecture Flow
// ============================================================================
export function buildLightAsIsToBeProcessFlowXml(): string {
  const cells: string[] = [
    // Top Ingress Customer Touchpoints
    lightPill('src_email', 'Customer Inbound Email', 'Unstructured Free-Text', 260, 20, 160),
    lightPill('src_portal', 'Legacy Web Portal Form', 'Static Forms &amp; Uploads', 440, 20, 160),
    lightPill('src_phone', 'Call Center Inquiries', 'Voice Recordings &amp; Logs', 620, 20, 160),

    // Tier 1: AS-IS CURRENT STATE (BOTTLENECK)
    lightTier('t1', '1. CURRENT AS-IS STATE<br/>(MANUAL SILOS &amp; DELAYS)', 90, 100, 940, 30, '#DC2626'),
    lightCard('n_man_triage', 'Manual Email &amp; Ticket Triage', 'Human Operator Reads &amp; Classifies (4-8 hr delay)', LIGHT_ICONS.shield, 300, 110, 260, 60, '#DC2626'),
    lightCard('n_batch_etl', 'Nightly Overnight Batch ETL', 'Stale Siloed Database Updates (24-48 hr lag)', LIGHT_ICONS.sql, 600, 110, 270, 60, '#DC2626'),

    // Tier 2: MODERN INGESTION & AUTOMATED PIPELINE BRIDGE
    lightTier('t2', '2. REAL-TIME EVENT BRIDGE<br/>&amp; INGESTION TIER', 210, 110, 940, 30, '#1E3A8A'),
    lightCard('n_pub_bridge', 'Pub/Sub Real-Time Intake', 'Sub-second Event Decoupling &amp; Fan-out', LIGHT_ICONS.pubsub, 300, 230, 260, 70, '#1D4ED8'),
    lightCard('n_df_clean', 'Dataflow Streaming Transformation', 'Automatic PII Redaction &amp; Schema Validation', LIGHT_ICONS.dataflow, 600, 230, 270, 70, '#1D4ED8'),

    // Tier 3: AGENTIC AI & AUTONOMOUS RESOLUTION TIER
    lightTier('t3', '3. AGENTIC AI &amp; GENAI<br/>AUTONOMOUS RESOLUTION', 340, 100, 940, 30, '#7C3AED'),
    lightCard('n_gemini_agent', 'Gemini 2.5 Autonomous Agent', 'Context Understanding &amp; Intent Routing', LIGHT_ICONS.gemini, 340, 360, 260, 60, '#7C3AED', LIGHT_ICONS.google),
    lightCard('n_hitl_router', 'Confidence Gate &amp; HITL Router', '>95% Straight-Through / <95% Specialist', LIGHT_ICONS.dataplex, 640, 360, 260, 60, '#7C3AED', LIGHT_ICONS.google),

    // Tier 4: TO-BE CLOUD-NATIVE EXECUTION STATE
    lightTier('t4', '4. TARGET TO-BE STATE<br/>(ZERO-TOUCH EXECUTION)', 460, 110, 940, 30, '#047857'),
    lightCard('c_run', 'Cloud Run Event Handler', 'Automated Instant Workflow Execution', LIGHT_ICONS.gke, 280, 480, 210, 70, '#059669'),
    lightCard('c_lake', 'BigQuery Real-Time Lakehouse', 'Immediate Live Analytics &amp; Reporting', LIGHT_ICONS.bq, 510, 480, 210, 70, '#059669'),
    lightCard('c_notify', 'Omni-Channel Customer Reply', 'Instant Automated Resolution &amp; Summary', LIGHT_ICONS.looker, 740, 480, 210, 70, '#059669'),

    // Tier 5: MEASURABLE BUSINESS IMPACT & KPIS
    lightTier('t5', '5. MEASURED BUSINESS ROI<br/>&amp; ACCELERATION METRICS', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_kpi1', 'Processing Latency Reduction', 'From 48 Hours to &lt; 3 Seconds', LIGHT_ICONS.finops, 280, 610, 210, 70, '#2563EB'),
    lightCard('c_kpi2', 'Straight-Through Rate (STP)', '94.2% Automated Zero-Touch Resolution', LIGHT_ICONS.shield, 510, 610, 210, 70, '#2563EB'),
    lightCard('c_kpi3', 'Operational Cost Savings', '68% Lower Manual Support Overhead', LIGHT_ICONS.looker, 740, 610, 210, 70, '#2563EB'),

    // Flow Edges
    lightFlowEdge('e_email_pub', 'src_email', 'n_pub_bridge', '1. Real-Time Intake', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_pub_df', 'n_pub_bridge', 'n_df_clean', 'Stream Records', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_df_gemini', 'n_df_clean', 'n_gemini_agent', '2. Grounded Agent Analysis', 0.5, 1, 0.5, 0, [[735, 320], [470, 320]]),
    lightFlowEdge('e_gemini_gate', 'n_gemini_agent', 'n_hitl_router', 'Confidence Score', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_gate_run', 'n_hitl_router', 'c_run', '3. Automated Fast Path', 0.5, 1, 0.5, 0, [[770, 440], [385, 440]]),
    lightFlowEdge('e_run_lake', 'c_run', 'c_lake', 'Sync Lakehouse', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_run_notif', 'c_run', 'c_notify', '4. Instant Resolution Reply', 1, 0.5, 0.5, 0, [[500, 470], [845, 470]]),
    lightFlowEdge('e_lake_kpi', 'c_lake', 'c_kpi2', '5. Real-Time Telemetry &amp; KPIs', 0.5, 1, 0.5, 0),
  ];

  return wrapDiagramXml('catalog_as_is_vs_to_be_process_flow', 'As-Is vs To-Be Process Flow', cells);
}

// ============================================================================
// TEMPLATE #5: Cloud FinOps & Chargeback Model
// ============================================================================
export function buildLightCloudFinopsChargebackXml(): string {
  const cells: string[] = [
    // Top Ingress Billing Streams
    lightPill('src_gce', 'Compute &amp; GKE Fleets', 'CPU / RAM Usage', 260, 20, 160),
    lightPill('src_bq', 'BigQuery Analytics', 'Slots &amp; Storage', 440, 20, 160),
    lightPill('src_ai', 'Vertex AI &amp; Gemini LLMs', 'Token Consumption', 620, 20, 160),

    // Tier 1: INFORM - COST VISIBILITY & ATTRIBUTION
    lightTier('t1', '1. INFORM PHASE<br/>(COST VISIBILITY &amp; TAGGING)', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_export', 'BigQuery Detailed Billing Export', 'Resource-Level SKU &amp; Cost Streaming', LIGHT_ICONS.bq, 300, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_labels', 'Mandatory Cost Center Labels', 'Org Policy: env, cost-center, owner', LIGHT_ICONS.shield, 600, 110, 270, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: OPTIMIZE - RATE & USAGE REDUCTION
    lightTier('t2', '2. OPTIMIZE PHASE<br/>(RATE &amp; USAGE EFFICIENCY)', 210, 110, 940, 30, '#047857'),
    lightCard('n_cud', 'Committed Use Discounts (CUDs)', 'Flexible Compute &amp; BigQuery Edition CUDs', LIGHT_ICONS.finops, 300, 230, 260, 70, '#059669'),
    lightCard('n_recom', 'Active Assist &amp; Rightsizing', 'Automated Idle VM &amp; Unused IP Reclamation', LIGHT_ICONS.vertex, 600, 230, 270, 70, '#059669'),

    // Tier 3: OPERATE - CONTINUOUS GOVERNANCE & BUDGETS
    lightTier('t3', '3. OPERATE PHASE<br/>(BUDGET ALERTS &amp; GUARDS)', 340, 100, 940, 30, '#D97706'),
    lightCard('n_budgets', 'Cloud Billing Budgets &amp; Alerts', 'Pub/Sub Triggers on 50%, 80%, 100% Thresholds', LIGHT_ICONS.finops, 340, 360, 270, 60, '#D97706', LIGHT_ICONS.google),
    lightCard('n_quota', 'Automated Quota Safeguards', 'Hard Rate Limiting &amp; Spike Prevention', LIGHT_ICONS.shield, 640, 360, 260, 60, '#D97706', LIGHT_ICONS.google),

    // Tier 4: CHARGEBACK & SHOWBACK ATTRIBUTION
    lightTier('t4', '4. CHARGEBACK TIER<br/>(BUSINESS UNIT COSTING)', 460, 110, 940, 30, '#7C3AED'),
    lightCard('c_fin', 'Finance &amp; Corporate GL', 'Direct Invoice Chargeback Attribution', LIGHT_ICONS.finops, 280, 480, 205, 70, '#7C3AED'),
    lightCard('c_eng', 'Product Engineering BU', 'Per-Microservice Unit Costing', LIGHT_ICONS.gke, 510, 480, 200, 70, '#7C3AED'),
    lightCard('c_ai', 'AI &amp; Innovation Lab', 'Token Cost Attribution per Model', LIGHT_ICONS.gemini, 730, 480, 220, 70, '#7C3AED'),

    // Tier 5: EXECUTIVE FINOPS DASHBOARDS & KPIS
    lightTier('t5', '5. EXECUTIVE FINOPS<br/>STUDIO &amp; SCORECARDS', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_looker', 'Looker Studio Executive FinOps', 'Unit Economics &amp; Spend Projections', LIGHT_ICONS.looker, 280, 610, 210, 70, '#2563EB'),
    lightCard('c_unit', 'Unit Cost per Transaction', 'Cost per API Call / Checkout KPI', LIGHT_ICONS.finops, 510, 610, 205, 70, '#2563EB'),
    lightCard('c_waste', 'Waste Reduction Metrics', '32% Cumulative Cloud Spend Optimized', LIGHT_ICONS.shield, 735, 610, 215, 70, '#059669'),

    // Flow Edges
    lightFlowEdge('e_bq_export', 'src_bq', 'n_export', '1. Stream Raw Billing Data', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_exp_labels', 'n_export', 'n_labels', 'Verify Tags', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_labels_cud', 'n_labels', 'n_cud', '2. Analyze Commitment Needs', 0.5, 1, 0.5, 0, [[735, 190], [430, 190]]),
    lightFlowEdge('e_cud_recom', 'n_cud', 'n_recom', 'Execute Rightsizing', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_recom_bud', 'n_recom', 'n_budgets', '3. Configure Budgets', 0.5, 1, 0.5, 0, [[735, 320], [475, 320]]),
    lightFlowEdge('e_bud_quota', 'n_budgets', 'n_quota', 'Attach Safeguard', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_quota_fin', 'n_quota', 'c_fin', '4. Export Unit Chargeback', 0.5, 1, 0.5, 0, [[770, 440], [380, 440]]),
    lightFlowEdge('e_fin_eng', 'c_fin', 'c_eng', 'Allocate', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_eng_ai', 'c_eng', 'c_ai', 'Allocate', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_fin_looker', 'c_fin', 'c_looker', '5. Executive Dashboard Feed', 0.5, 1, 0.5, 0),
  ];

  return wrapDiagramXml('catalog_cloud_finops_chargeback_model', 'Cloud FinOps & Chargeback Model', cells);
}

// ============================================================================
// TEMPLATE #6: Enterprise Reference Architecture (Total Unified View)
// ============================================================================
export function buildLightEnterpriseReferenceArchitectureXml(): string {
  const cells: string[] = [
    // Top Ingress Client Channels
    lightPill('src_web', 'Web Applications', 'React / Next.js', 260, 20, 150),
    lightPill('src_mob', 'Mobile Devices', 'iOS / Android SDKs', 430, 20, 150),
    lightPill('src_iot', 'IoT &amp; Edge Gateways', 'MQTT / HTTPS', 600, 20, 150),
    lightPill('src_b2b', 'B2B API Partners', 'OpenAPI / gRPC', 770, 20, 150),

    // Tier 1: EDGE & INTEGRATION PLANE
    lightTier('t1', '1. EDGE DEFENSE<br/>&amp; API GATEWAY TIER', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_gclb', 'Cloud Armor &amp; GCLB', 'Global Anycast IP • L7 DDoS Defense', LIGHT_ICONS.shield, 300, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_apigee', 'Apigee X API Management', 'OAuth2 / JWT • Rate Limiting • Analytics', LIGHT_ICONS.api, 600, 110, 270, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: APPLICATION & MICROSERVICES RUNTIME
    lightTier('t2', '2. CONTAINER FLEET<br/>&amp; SERVERLESS RUNTIME', 210, 110, 940, 30, '#1E3A8A'),
    lightCard('n_gke', 'GKE Enterprise Cluster', 'Autoscaling Microservices &amp; Service Mesh', LIGHT_ICONS.gke, 300, 230, 260, 70, '#1D4ED8'),
    lightCard('n_run', 'Cloud Run &amp; Eventarc', 'Serverless Event-Driven Microservices', LIGHT_ICONS.gke, 600, 230, 270, 70, '#1D4ED8'),

    // Tier 3: DATA & LAKEHOUSE FOUNDATION
    lightTier('t3', '3. OPEN LAKEHOUSE<br/>&amp; PERSISTENCE FOUNDATION', 340, 100, 940, 30, '#047857'),
    lightCard('n_bq', 'BigQuery Enterprise Lakehouse', 'Columnar Analytics &amp; Iceberg Storage', LIGHT_ICONS.bq, 340, 360, 260, 60, '#059669', LIGHT_ICONS.google),
    lightCard('n_span', 'Cloud Spanner / Cloud SQL', 'Global ACID Transaction Processing', LIGHT_ICONS.spanner, 640, 360, 260, 60, '#059669', LIGHT_ICONS.google),

    // Tier 4: AI/ML & AGENTIC PLATFORM
    lightTier('t4', '4. AI/ML PLATFORM<br/>&amp; AGENT PLATFORM', 460, 110, 940, 30, '#7C3AED'),
    lightCard('c_gemini', 'Gemini 2.5 Multimodal AI', 'Gemini Notebook &amp; Skills Tooling', LIGHT_ICONS.gemini, 280, 480, 210, 70, '#7C3AED'),
    lightCard('c_vertex', 'Vertex AI Search &amp; Connectors', 'Hybrid Semantic Vector Grounding', LIGHT_ICONS.vertex, 510, 480, 210, 70, '#7C3AED'),
    lightCard('c_agent', 'Enterprise Agent Platform', 'Agent Gallery &amp; Multi-Agent Mesh', LIGHT_ICONS.gke, 740, 480, 210, 70, '#7C3AED'),

    // Tier 5: SECURITY, OBSERVABILITY & GOVERNANCE
    lightTier('t5', '5. ENTERPRISE SRE<br/>&amp; IDENTITY GOVERNANCE', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_iam', 'Workload Identity &amp; IAM', 'Zero-Trust Role-Based Access Control', LIGHT_ICONS.shield, 280, 610, 210, 70, '#2563EB'),
    lightCard('c_prom', 'Google Managed Prometheus', 'Full-Stack Telemetry &amp; SRE Alerts', LIGHT_ICONS.looker, 510, 610, 210, 70, '#2563EB'),
    lightCard('c_scc', 'Security Command Center', 'Real-Time Posture &amp; Threat Detection', LIGHT_ICONS.shield, 740, 610, 210, 70, '#2563EB'),

    // Flow Edges
    lightFlowEdge('e_web_gclb', 'src_web', 'n_gclb', '1. HTTPS Anycast Ingress', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_gclb_apigee', 'n_gclb', 'n_apigee', 'Sanitized Traffic', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_apigee_gke', 'n_apigee', 'n_gke', '2. Route to Services', 0.5, 1, 0.5, 0, [[735, 190], [430, 190]]),
    lightFlowEdge('e_gke_run', 'n_gke', 'n_run', 'Async Events', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_gke_bq', 'n_gke', 'n_bq', '3. Query Lakehouse', 0.5, 1, 0.5, 0, [[430, 320], [470, 320]]),
    lightFlowEdge('e_run_span', 'n_run', 'n_span', 'ACID Commits', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_bq_vertex', 'n_bq', 'c_vertex', '4. Extract Embeddings', 0.5, 1, 0.5, 0, [[470, 440], [615, 440]]),
    lightFlowEdge('e_vertex_gem', 'c_vertex', 'c_gemini', 'Grounded Context', 0, 0.5, 1, 0.5),
    lightFlowEdge('e_gem_agent', 'c_gemini', 'c_agent', 'Execute Action', 1, 0.3, 0, 0.3),
    lightFlowEdge('e_gem_iam', 'c_gemini', 'c_iam', '5. Zero-Trust Audit Log', 0.5, 1, 0.5, 0),
  ];

  return wrapDiagramXml('catalog_total_unified_system_view', 'Enterprise Reference Architecture', cells);
}

// ============================================================================
// TEMPLATE #7: Cognitive Architecture / Agentic RAG
// ============================================================================
export function buildLightAgenticRagWidescreenXml(): string {
  const cells: string[] = [
    // Top Ingress Client Request
    lightPill('src_query', 'Natural Language User Prompt', 'Enterprise Copilot / Chat UI', 320, 20, 220),
    lightPill('src_doc', 'Enterprise Documents &amp; PDFs', 'Contracts, Wikis &amp; SOPs', 580, 20, 220),

    // Tier 1: QUERY ANALYSIS & RE-WRITING
    lightTier('t1', '1. INTENT RECOGNITION<br/>&amp; QUERY EXPANSION', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_intent', 'Query Intent Classifier', 'Task Decomposition &amp; Routing', LIGHT_ICONS.gemini, 300, 110, 260, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_hyde', 'HyDE &amp; Query Expansion', 'Hypothetical Document Embeddings', LIGHT_ICONS.vertex, 600, 110, 270, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: MULTI-MODAL EMBEDDING & HYBRID RETRIEVAL
    lightTier('t2', '2. HYBRID VECTOR SEARCH<br/>&amp; EMBEDDING RETRIEVAL', 210, 110, 940, 30, '#1E3A8A'),
    lightCard('n_emb', 'Vertex AI Text-Embedding-004', '768-dim Semantic Vectorization', LIGHT_ICONS.vertex, 300, 230, 260, 70, '#1D4ED8'),
    lightCard('n_vec', 'Vertex Vector Search (ScANN)', 'Sub-10ms Approximate Nearest Neighbor', LIGHT_ICONS.dataplex, 600, 230, 270, 70, '#1D4ED8'),

    // Tier 3: CONTEXT RERANKING & SECURITY FILTER
    lightTier('t3', '3. RERANKING &amp; RBAC<br/>METADATA FILTERING', 340, 100, 940, 30, '#047857'),
    lightCard('n_rerank', 'Vertex AI Reranking Engine', 'Cross-Encoder Relevance Scoring', LIGHT_ICONS.dataplex, 340, 360, 260, 60, '#059669', LIGHT_ICONS.google),
    lightCard('n_rbac', 'Fine-Grained RBAC Filter', 'Document-Level Access Verification', LIGHT_ICONS.shield, 640, 360, 260, 60, '#059669', LIGHT_ICONS.google),

    // Tier 4: GEMINI REASONING & DYNAMIC TOOL CALLING
    lightTier('t4', '4. GEMINI REASONING<br/>&amp; TOOL ORCHESTRATION', 460, 110, 940, 30, '#7C3AED'),
    lightCard('c_gem_core', 'Gemini 2.5 Pro Reasoner', '1M+ Context Multi-Step Analysis', LIGHT_ICONS.gemini, 280, 480, 210, 70, '#7C3AED'),
    lightCard('c_tools', 'Function Calling &amp; SQL Tools', 'Execute BigQuery &amp; API Actions', LIGHT_ICONS.api, 510, 480, 210, 70, '#7C3AED'),
    lightCard('c_ground', 'Grounding Verification Gate', 'Faithfulness &amp; Hallucination Check', LIGHT_ICONS.shield, 740, 480, 210, 70, '#7C3AED'),

    // Tier 5: RESPONSE SYNTHESIS & AUDIT LOGGING
    lightTier('t5', '5. RESPONSE SYNTHESIS<br/>&amp; AUDIT GOVERNANCE', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_resp', 'Grounded Response with Citations', 'Direct Snippet References &amp; Links', LIGHT_ICONS.looker, 280, 610, 220, 70, '#2563EB'),
    lightCard('c_log', 'Cloud Logging &amp; Evaluation', 'Latency, Token Cost &amp; Accuracy SLAs', LIGHT_ICONS.looker, 520, 610, 205, 70, '#2563EB'),
    lightCard('c_active', 'Active Feedback Curation', 'Continuous RAG Quality Improvement', LIGHT_ICONS.dataplex, 745, 610, 205, 70, '#059669'),

    // Flow Edges
    lightFlowEdge('e_q_intent', 'src_query', 'n_intent', '1. User Prompt Intake', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_intent_hyde', 'n_intent', 'n_hyde', 'Expand Query', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_hyde_emb', 'n_hyde', 'n_emb', '2. Generate Vectors', 0.5, 1, 0.5, 0, [[735, 190], [430, 190]]),
    lightFlowEdge('e_emb_vec', 'n_emb', 'n_vec', 'KNN Similarity', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_vec_rerank', 'n_vec', 'n_rerank', '3. Top 50 Chunks', 0.5, 1, 0.5, 0, [[735, 320], [470, 320]]),
    lightFlowEdge('e_rerank_rbac', 'n_rerank', 'n_rbac', 'Filter Authorized Chunks', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_rbac_gem', 'n_rbac', 'c_gem_core', '4. Synthesize with Grounded Chunks', 0.5, 1, 0.5, 0, [[770, 440], [385, 440]]),
    lightFlowEdge('e_gem_tools', 'c_gem_core', 'c_tools', 'Invoke Tools', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_tools_ground', 'c_tools', 'c_ground', 'Verify Citations', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_ground_resp', 'c_ground', 'c_resp', '5. Render Cited Answer', 0.5, 1, 0.5, 0, [[845, 570], [390, 570]]),
    lightFlowEdge('e_resp_log', 'c_resp', 'c_log', 'Log Audit Trail', 1, 0.5, 0, 0.5),
  ];

  return wrapDiagramXml('catalog_cognitive_architecture_agentic_rag', 'Cognitive Architecture & Agentic RAG', cells);
}

// ============================================================================
// TEMPLATE #8: Hub-and-Spoke Agent Configuration Map
// ============================================================================
export function buildLightHubAndSpokeAgentConfigXml(): string {
  const cells: string[] = [
    // Top Ingress Client Trigger
    lightPill('src_user', 'Enterprise User Request', 'Multi-Turn Chat / API', 340, 20, 200),
    lightPill('src_event', 'Autonomous Event Trigger', 'Pub/Sub / Webhook Event', 580, 20, 200),

    // Tier 1: SUPERVISORY ORCHESTRATOR HUB
    lightTier('t1', '1. SUPERVISORY HUB<br/>ORCHESTRATOR AGENT', 90, 110, 940, 30, '#1E293B'),
    lightCard('n_super', 'Master Supervisor Agent (Gemini 2.5 Pro)', 'Goal Decomposition • Task Planning • Agent Delegation', LIGHT_ICONS.gemini, 300, 110, 320, 70, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_state', 'Global Conversation State', 'Shared Working Memory &amp; Session Store', LIGHT_ICONS.spanner, 650, 110, 250, 70, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: DOMAIN-SPECIFIC SPOKE WORKER AGENTS
    lightTier('t2', '2. DOMAIN SPECIALIZED<br/>SPOKE WORKER AGENTS', 220, 110, 940, 30, '#1E3A8A'),
    lightCard('n_spoke_data', 'SQL Data Analyst Agent', 'NL-to-SQL &amp; Metric Extraction', LIGHT_ICONS.bq, 280, 240, 205, 70, '#1D4ED8'),
    lightCard('n_spoke_doc', 'Document Specialist Agent', 'OCR, Policy &amp; Contract Analysis', LIGHT_ICONS.vertex, 505, 240, 215, 70, '#1D4ED8'),
    lightCard('n_spoke_ops', 'SRE / Ops Incident Agent', 'Log Parsing &amp; Root Cause Analysis', LIGHT_ICONS.shield, 740, 240, 210, 70, '#1D4ED8'),

    // Tier 3: TOOL & API INTEGRATION LAYER
    lightTier('t3', '3. ENTERPRISE TOOLS<br/>&amp; MCP GATEWAYS', 350, 100, 940, 30, '#7C3AED'),
    lightCard('n_tool_bq', 'BigQuery MCP Tool', 'Execute Validated SQL Queries', LIGHT_ICONS.bq, 340, 370, 260, 60, '#7C3AED', LIGHT_ICONS.google),
    lightCard('n_tool_erp', 'ERP / CRM API Connectors', 'SAP, Salesforce &amp; Workday REST APIs', LIGHT_ICONS.api, 640, 370, 260, 60, '#7C3AED', LIGHT_ICONS.google),

    // Tier 4: KNOWLEDGE BASES & VECTOR GROUNDING
    lightTier('t4', '4. ENTERPRISE KNOWLEDGE<br/>&amp; GROUNDING STORES', 470, 110, 940, 30, '#047857'),
    lightCard('c_vec', 'Vertex Vector Search', 'Enterprise Semantic Knowledge Base', LIGHT_ICONS.dataplex, 280, 490, 220, 70, '#059669'),
    lightCard('c_lake', 'BigQuery Enterprise Lakehouse', 'Structured Historical Analytics', LIGHT_ICONS.bq, 520, 490, 210, 70, '#059669'),
    lightCard('c_crm', 'Live Enterprise Database', 'Customer &amp; Inventory Transaction Records', LIGHT_ICONS.spanner, 750, 490, 200, 70, '#059669'),

    // Tier 5: AGENT GOVERNANCE & SAFETY GATE
    lightTier('t5', '5. AGENT EVALUATION<br/>&amp; SAFETY GUARDRAIL', 600, 110, 940, 30, '#1E293B'),
    lightCard('c_guard', 'Model Armor &amp; Safety Filter', 'Prompt Injection &amp; Toxicity Defense', LIGHT_ICONS.shield, 280, 620, 215, 70, '#2563EB'),
    lightCard('c_eval', 'Agent Execution Evaluator', 'Tool Calling Accuracy &amp; Faithfulness', LIGHT_ICONS.looker, 515, 620, 210, 70, '#2563EB'),
    lightCard('c_hitl', 'Human Escalation Gate', 'Specialist Review for Critical Actions', LIGHT_ICONS.shield, 745, 620, 205, 70, '#059669'),

    // Flow Edges
    lightFlowEdge('e_user_super', 'src_user', 'n_super', '1. Ingest Goal', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_super_state', 'n_super', 'n_state', 'Read Context', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_super_data', 'n_super', 'n_spoke_data', '2. Delegate SQL Task', 0.3, 1, 0.5, 0),
    lightFlowEdge('e_super_doc', 'n_super', 'n_spoke_doc', 'Delegate Document Task', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_super_ops', 'n_super', 'n_spoke_ops', 'Delegate Ops Task', 0.7, 1, 0.5, 0),
    lightFlowEdge('e_spoke_bq', 'n_spoke_data', 'n_tool_bq', '3. Execute Query Tool', 0.5, 1, 0.5, 0, [[382, 330], [470, 330]]),
    lightFlowEdge('e_spoke_erp', 'n_spoke_doc', 'n_tool_erp', 'Call CRM Tool', 0.5, 1, 0.5, 0, [[612, 330], [770, 330]]),
    lightFlowEdge('e_tool_lake', 'n_tool_bq', 'c_lake', '4. Fetch Grounded Records', 0.5, 1, 0.5, 0, [[470, 450], [625, 450]]),
    lightFlowEdge('e_tool_crm', 'n_tool_erp', 'c_crm', 'Fetch CRM State', 0.5, 1, 0.5, 0, [[770, 450], [850, 450]]),
    lightFlowEdge('e_lake_guard', 'c_lake', 'c_guard', '5. Safety &amp; Guardrail Check', 0.5, 1, 0.5, 0, [[625, 580], [387, 580]]),
    lightFlowEdge('e_guard_eval', 'c_guard', 'c_eval', 'Score Reliability', 1, 0.5, 0, 0.5),
    lightFlowEdge('e_eval_hitl', 'c_eval', 'c_hitl', 'Approve Action', 1, 0.5, 0, 0.5),
  ];

  return wrapDiagramXml('catalog_hub_and_spoke_agent_mesh', 'Hub-and-Spoke Agent Mesh Architecture', cells);
}

// ============================================================================
// TEMPLATE #9: Enterprise Open Lakehouse & AI Data Foundation
// ============================================================================
export function buildLightGcpDataLakehouseWbsXml(): string {
  const cells: string[] = [
    '<mxCell id="consume" value="" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="30" y="590" width="1540" height="200" as="geometry"/></mxCell>',

    // Top Ingress Data Sources
    lightPill('src_db', 'Operational RDBMS', 'PostgreSQL / Oracle / MySQL', 260, 20, 150),
    lightPill('src_saas', 'SaaS Applications', 'Salesforce, SAP, Workday', 430, 20, 150),
    lightPill('src_iot', 'Real-Time IoT &amp; Logs', 'Sensors &amp; Telemetry Streams', 600, 20, 150),
    lightPill('src_files', 'Unstructured Media', 'PDFs, Images &amp; Audio', 770, 20, 150),

    // Tier 1: MULTI-SPEED INGESTION TIER
    lightTier('t1', '1. INGESTION TIER<br/>(CDC, BATCH &amp; STREAMING)', 90, 100, 940, 30, '#1E293B'),
    lightCard('n_ds', 'Datastream CDC Engine', 'Serverless Change Data Capture', LIGHT_ICONS.sql, 280, 110, 200, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_sts', 'Storage Transfer Service', 'Automated File Batch Ingestion', LIGHT_ICONS.gcs, 500, 110, 200, 60, '#2563EB', LIGHT_ICONS.google),
    lightCard('n_pub', 'Pub/Sub &amp; Dataflow', 'Sub-second Streaming Pipeline', LIGHT_ICONS.pubsub, 720, 110, 220, 60, '#2563EB', LIGHT_ICONS.google),

    // Tier 2: OPEN LAKEHOUSE STORAGE (BRONZE / SILVER / GOLD)
    lightTier('t2', '2. OPEN LAKEHOUSE STORAGE<br/>&amp; APACHE ICEBERG TIER', 210, 110, 940, 30, '#047857'),
    lightCard('n_iceberg', 'Cloud Storage (Apache Iceberg)', 'Open Table Format • Parquet Files', LIGHT_ICONS.iceberg, 300, 230, 260, 70, '#059669', LIGHT_ICONS.google),
    lightCard('n_bq_stor', 'BigQuery Managed Storage', 'Native High-Performance Columnar Format', LIGHT_ICONS.bq, 600, 230, 270, 70, '#059669', LIGHT_ICONS.google),

    // Tier 3: DUAL ENGINE COMPUTE & TRANSFORMATION
    lightTier('t3', '3. COMPUTE &amp; TRANSFORMATION<br/>(SQL + SPARK + DATAFORM)', 340, 100, 940, 30, '#1E3A8A'),
    lightCard('n_spark', 'Managed Service for Apache Spark', 'Serverless Large-Scale PySpark / Scala', LIGHT_ICONS.spark, 340, 360, 260, 60, '#1D4ED8', LIGHT_ICONS.google),
    lightCard('n_bq_eng', 'BigQuery SQL &amp; Dataform Pipelines', 'ELT Modeling &amp; Dimensional Transformations', LIGHT_ICONS.bq, 640, 360, 260, 60, '#1D4ED8', LIGHT_ICONS.google),

    // Tier 4: UNIFIED GOVERNANCE & SECURITY MESH
    lightTier('t4', '4. DATA GOVERNANCE<br/>&amp; ACCESS SECURITY', 460, 110, 940, 30, '#7C3AED'),
    lightCard('c_cat', 'Dataplex Knowledge Catalog', 'Universal Metadata, Lineage &amp; Search', LIGHT_ICONS.dataplex, 280, 480, 210, 70, '#7C3AED'),
    lightCard('c_dlp', 'Sensitive Data Protection (DLP)', 'Automatic PII Masking &amp; Tokenization', LIGHT_ICONS.shield, 510, 480, 210, 70, '#7C3AED'),
    lightCard('c_row', 'Column &amp; Row-Level Security', 'Dynamic Tag-Based Data Masking', LIGHT_ICONS.shield, 740, 480, 210, 70, '#7C3AED'),

    // Tier 5: ANALYTICS & AI CONSUMPTION TIER
    lightTier('t5', '5. CONSUMPTION TIER<br/>(BI, ML &amp; AGENT FOUNDATION)', 590, 110, 940, 30, '#1E293B'),
    lightCard('c_looker', 'Looker Enterprise BI', 'Semantic Layer &amp; Interactive Reports', LIGHT_ICONS.looker, 280, 610, 210, 70, '#2563EB'),
    lightCard('c_vertex', 'Vertex AI &amp; Feature Store', 'Grounded RAG &amp; Predictive ML Models', LIGHT_ICONS.vertex, 510, 610, 210, 70, '#2563EB'),
    lightCard('c_gemini', 'Gemini Data Canvas &amp; APIs', 'Natural Language Analytics &amp; Reverse ETL', LIGHT_ICONS.gemini, 740, 610, 210, 70, '#2563EB'),

    // Flow Edges
    lightFlowEdge('e_db_ds', 'src_db', 'n_ds', '1. CDC Streams', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_saas_sts', 'src_saas', 'n_sts', 'Batch Extract', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_iot_pub', 'src_iot', 'n_pub', 'Telemetry Events', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_ds_ice', 'n_ds', 'n_iceberg', '2. Land Bronze Raw', 0.5, 1, 0.3, 0),
    lightFlowEdge('e_pub_bq', 'n_pub', 'n_bq_stor', 'Direct Streaming', 0.5, 1, 0.7, 0),
    lightFlowEdge('e_ice_spark', 'n_iceberg', 'n_spark', '3. Spark Lakehouse Compute', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_bq_sql', 'n_bq_stor', 'n_bq_eng', 'Execute SQL Models', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_spark_cat', 'n_spark', 'c_cat', '4. Register Lineage', 0.5, 1, 0.5, 0, [[470, 440], [385, 440]]),
    lightFlowEdge('e_bq_dlp', 'n_bq_eng', 'c_dlp', 'Mask PII Columns', 0.5, 1, 0.5, 0, [[770, 440], [615, 440]]),
    lightFlowEdge('e_cat_looker', 'c_cat', 'c_looker', '5. Governed BI Queries', 0.5, 1, 0.5, 0),
    lightFlowEdge('e_dlp_vertex', 'c_dlp', 'c_vertex', 'ML Feature Feed', 0.5, 1, 0.5, 0),
  ];

  return wrapDiagramXml('catalog_gcp_enterprise_data_lakehouse', 'Enterprise Open Lakehouse & AI Data Foundation', cells);
}

// ============================================================================
// TEMPLATE #10: Dimensional Data Model - Crow's Foot ERD
// ============================================================================
export function buildLightErdReferenceXml(): string {
  const cells: string[] = [
    // Header Banner Pod
    lightCell('hdr_banner', `<table style="width:100%;height:100%;border-collapse:collapse;"><tr><td style="text-align:left;padding-left:12px;"><b style="font-size:14px;color:#0F172A;">Dimensional Data Model - Enterprise Retail &amp; Orders Star Schema (Crow's Foot ERD)</b><br><span style="font-size:10px;color:#475569;font-weight:600;">Grain: Single Item Transaction Line • Partitioned by transaction_date • Clustered by customer_id, product_id</span></td><td style="text-align:right;padding-right:12px;"><span style="background:#EFF6FF;color:#2563EB;font-weight:800;font-size:11px;padding:4px 10px;border-radius:6px;border:1px solid #BFDBFE;">Star Schema Model</span></td></tr></table>`,
      'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', 30, 20, 940, 54),

    // CENTRAL FACT TABLE
    lightCell('tbl_fact_sales', `<table style="width:100%;height:100%;border-collapse:collapse;font-size:10px;color:#0F172A;">
      <tr style="background:#1E3A8A;color:#FFFFFF;"><th colspan="3" style="padding:6px;font-size:11.5px;">⭐ fact_sales_transaction</th></tr>
      <tr style="background:#EFF6FF;font-weight:700;"><td style="padding:3px 6px;">PK/FK</td><td style="padding:3px 6px;">sales_transaction_id</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;color:#2563EB;font-weight:700;">FK</td><td style="padding:3px 6px;">customer_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;color:#2563EB;font-weight:700;">FK</td><td style="padding:3px 6px;">product_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;color:#2563EB;font-weight:700;">FK</td><td style="padding:3px 6px;">store_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;color:#2563EB;font-weight:700;">FK</td><td style="padding:3px 6px;">date_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr style="background:#F8FAFC;"><td style="padding:3px 6px;color:#059669;font-weight:700;">M</td><td style="padding:3px 6px;">quantity_sold</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr style="background:#F8FAFC;"><td style="padding:3px 6px;color:#059669;font-weight:700;">M</td><td style="padding:3px 6px;">gross_amount</td><td style="padding:3px 6px;">NUMERIC</td></tr>
      <tr style="background:#F8FAFC;"><td style="padding:3px 6px;color:#059669;font-weight:700;">M</td><td style="padding:3px 6px;">discount_amount</td><td style="padding:3px 6px;">NUMERIC</td></tr>
      <tr style="background:#F8FAFC;"><td style="padding:3px 6px;color:#059669;font-weight:700;">M</td><td style="padding:3px 6px;">net_sales_amount</td><td style="padding:3px 6px;">NUMERIC</td></tr>
    </table>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=2;shadow=1;', 360, 240, 280, 230),

    // DIMENSION 1: CUSTOMER (SCD Type 2)
    lightCell('tbl_dim_customer', `<table style="width:100%;height:100%;border-collapse:collapse;font-size:10px;color:#0F172A;">
      <tr style="background:#1E293B;color:#FFFFFF;"><th colspan="3" style="padding:5px;font-size:11px;">👤 dim_customer (SCD Type 2)</th></tr>
      <tr style="background:#EFF6FF;font-weight:700;"><td style="padding:3px 6px;">PK</td><td style="padding:3px 6px;">customer_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;">NK</td><td style="padding:3px 6px;">customer_id</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">full_name</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">customer_tier</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">effective_start_date</td><td style="padding:3px 6px;">DATE</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">is_current</td><td style="padding:3px 6px;">BOOL</td></tr>
    </table>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;', 40, 110, 240, 160),

    // DIMENSION 2: PRODUCT
    lightCell('tbl_dim_product', `<table style="width:100%;height:100%;border-collapse:collapse;font-size:10px;color:#0F172A;">
      <tr style="background:#1E293B;color:#FFFFFF;"><th colspan="3" style="padding:5px;font-size:11px;">📦 dim_product</th></tr>
      <tr style="background:#EFF6FF;font-weight:700;"><td style="padding:3px 6px;">PK</td><td style="padding:3px 6px;">product_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;">NK</td><td style="padding:3px 6px;">sku</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">product_name</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">category</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">unit_price</td><td style="padding:3px 6px;">NUMERIC</td></tr>
    </table>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;', 720, 110, 240, 150),

    // DIMENSION 3: STORE LOCATION
    lightCell('tbl_dim_store', `<table style="width:100%;height:100%;border-collapse:collapse;font-size:10px;color:#0F172A;">
      <tr style="background:#1E293B;color:#FFFFFF;"><th colspan="3" style="padding:5px;font-size:11px;">🏬 dim_store_location</th></tr>
      <tr style="background:#EFF6FF;font-weight:700;"><td style="padding:3px 6px;">PK</td><td style="padding:3px 6px;">store_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;">NK</td><td style="padding:3px 6px;">store_id</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">store_name</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">region_code</td><td style="padding:3px 6px;">STRING</td></tr>
    </table>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;', 40, 440, 240, 140),

    // DIMENSION 4: DATE & TIME
    lightCell('tbl_dim_date', `<table style="width:100%;height:100%;border-collapse:collapse;font-size:10px;color:#0F172A;">
      <tr style="background:#1E293B;color:#FFFFFF;"><th colspan="3" style="padding:5px;font-size:11px;">📅 dim_date_time</th></tr>
      <tr style="background:#EFF6FF;font-weight:700;"><td style="padding:3px 6px;">PK</td><td style="padding:3px 6px;">date_key</td><td style="padding:3px 6px;">INT64</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">full_date</td><td style="padding:3px 6px;">DATE</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">fiscal_quarter</td><td style="padding:3px 6px;">STRING</td></tr>
      <tr><td style="padding:3px 6px;">ATT</td><td style="padding:3px 6px;">day_of_week</td><td style="padding:3px 6px;">STRING</td></tr>
    </table>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;', 720, 440, 240, 140),

    // AGGREGATE SUMMARY MART (BOTTOM POD)
    lightCell('tbl_agg_mart', `<table style="width:100%;height:100%;border-collapse:collapse;font-size:10px;color:#0F172A;">
      <tr style="background:#047857;color:#FFFFFF;"><th colspan="4" style="padding:5px;font-size:11px;">📊 agg_monthly_regional_sales_mart (Materialized BI Engine View)</th></tr>
      <tr><td style="padding:3px 6px;">region_code</td><td style="padding:3px 6px;">year_month</td><td style="padding:3px 6px;">total_revenue</td><td style="padding:3px 6px;">active_customers_count</td></tr>
    </table>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.5;shadow=1;', 260, 610, 480, 80),

    // Crow's Foot Relationships (1-to-Many FKs)
    lightFlowEdge('rel_cust_fact', 'tbl_dim_customer', 'tbl_fact_sales', '1:N (customer_key)', 1, 0.5, 0, 0.3, [], '#1D4ED8'),
    lightFlowEdge('rel_prod_fact', 'tbl_dim_product', 'tbl_fact_sales', '1:N (product_key)', 0, 0.5, 1, 0.3, [], '#1D4ED8'),
    lightFlowEdge('rel_store_fact', 'tbl_dim_store', 'tbl_fact_sales', '1:N (store_key)', 1, 0.5, 0, 0.7, [], '#1D4ED8'),
    lightFlowEdge('rel_date_fact', 'tbl_dim_date', 'tbl_fact_sales', '1:N (date_key)', 0, 0.5, 1, 0.7, [], '#1D4ED8'),
    lightFlowEdge('rel_fact_mart', 'tbl_fact_sales', 'tbl_agg_mart', 'Aggregate Rollup', 0.5, 1, 0.5, 0, [], '#059669'),
  ];

  return wrapDiagramXml('catalog_dimensional_data_model_erd', 'Dimensional Data Model ERD', cells);
}
