import fs from 'fs';
import http from 'http';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { getGcpDataUri } from '../src/lib/gcpIcons';

// =========================================================================
// 10-STAGE ARCHITECTURAL EVOLUTION DEFINITION (Google Cloud Architecture Center)
// =========================================================================

interface EvolutionStep {
  version: string;
  filename: string;
  title: string;
  subtitle: string;
  evolutionSummary: string;
  keyChanges: string[];
  targetSla: string;
}

const EVOLUTION_STEPS: EvolutionStep[] = [
  {
    version: 'v1.0',
    filename: '01_v1_0_classical_cloud_baseline',
    title: 'Autonomous Deep-Sea Robotic Fleet: Classical Cloud Baseline',
    subtitle: 'v1.0 Baseline: Satellite Telemetry Ingress, Dual Database Storage & Classical XGBoost Detection',
    evolutionSummary: 'Classical cloud architecture with unidirectional telemetry ingress from surface relay buoys into Cloud Pub/Sub Lite, Dataflow windowing, Cloud Spanner ACID state, BigQuery geospatial analytics, and passive batch XGBoost model predictions.',
    keyChanges: [
      'Established 6 foundational zones: Subsea Edge, Network Security, Stream Pipeline, Persistence, Classical ML, SRE Operations',
      'Satellite Ingress: LEO satellite mTLS uplink via Autonomous Surface Relay Buoys',
      'Dual Storage Engine: Cloud Spanner (nam3 Multi-Region) for ACID state + BigQuery Geospatial for 4D bathymetry',
      'Classical ML: Vertex AI Custom Prediction batch endpoint running XGBoost sensor anomaly classifier',
      'Passive Telemetry: Unidirectional telemetry flow with manual shore operator dashboard'
    ],
    targetSla: '99.9% Availability • Standard Batch Processing'
  },
  {
    version: 'v2.0',
    filename: '02_v2_0_realtime_feature_store',
    title: 'Autonomous Deep-Sea Robotic Fleet: Real-Time Feature Store',
    subtitle: 'v2.0 Milestone: Sub-5ms Memorystore Redis Caching & Online Vertex AI Feature Serving',
    evolutionSummary: 'Introduced an in-memory caching tier with Cloud Memorystore Redis and Vertex AI Feature Store to provide sub-5ms feature lookup for high-frequency hydrodynamic sensor readings.',
    keyChanges: [
      'Added Vertex AI Feature Store with online low-latency serving for salinity, thermal, and acoustic features',
      'Added Cloud Memorystore Redis Cluster for sub-5ms caching of active vehicle Doppler Velocity Log vectors',
      'Added Datastream CDC Sync Engine for bi-directional state synchronization between Spanner and Feature Store',
      'Dataflow pipeline enhanced with streaming feature engineering transforms',
      'Rerouted telemetry inference highway through open inter-row channel with zero box collisions'
    ],
    targetSla: '99.95% Availability • Sub-5ms Feature Retrieval'
  },
  {
    version: 'v3.0',
    filename: '03_v3_0_multimodal_vector_search',
    title: 'Autonomous Deep-Sea Robotic Fleet: Multimodal Vector Search',
    subtitle: 'v3.0 Milestone: High-Dimensional Acoustic Embeddings & Vertex Vector Search (ScaNN)',
    evolutionSummary: 'Integrated high-dimensional vector search to process side-scan multibeam sonar acoustic spectrograms and 4K hydrothermal optical imagery with sub-12ms nearest-neighbor retrieval.',
    keyChanges: [
      'Deployed Vertex AI Vector Search powered by Google ScaNN index for 1408-dimensional acoustic embeddings',
      'Connected Cloud Storage Curated Lakehouse directly to Vector Search embedding ingestion pipeline',
      'Added Multimodal Sonar Embedding generation tier for geological vent profile matching',
      'Upgraded Dataplex Universal Catalog to index acoustic vector schemas and data lineage',
      'Enabled nearest-neighbor historical dive matching against 500+ archived expeditions'
    ],
    targetSla: '99.95% Availability • Sub-12ms p99 Vector Recall'
  },
  {
    version: 'v4.0',
    filename: '04_v4_0_gemini_mcp_tool_gateway',
    title: 'Autonomous Deep-Sea Robotic Fleet: Gemini & MCP Tool Gateway',
    subtitle: 'v4.0 Milestone: Google Gemini 3.1 Pro Reasoner & Cloud Run MCP Serverless Tool Gateway',
    evolutionSummary: 'Replaced the passive XGBoost classifier with Google Gemini 3.1 Pro Reasoner acting through a Model Context Protocol (MCP) tool gateway on Cloud Run.',
    keyChanges: [
      'Replaced static XGBoost classifier with Google Gemini 3.1 Pro Reasoner on Vertex AI',
      'Deployed Model Context Protocol (MCP) Gateway on Cloud Run declaring typed JSON-RPC tools',
      'Configured typed tools: call_spanner_query(), query_vector_search(), get_bathymetry_bounds()',
      'Added MCP Tool Schema Registry and Execution Interceptor for rate-limiting and audit logging',
      'Shifted architecture from passive anomaly scoring to dynamic tool-augmented cognitive reasoning'
    ],
    targetSla: '99.99% Availability • Autonomous Cognitive Tool Execution'
  },
  {
    version: 'v5.0',
    filename: '05_v5_0_autonomous_mission_planner',
    title: 'Autonomous Deep-Sea Robotic Fleet: Autonomous Mission Planner',
    subtitle: 'v5.0 Milestone: LangGraph ReAct State Machine on GKE Autopilot & Cyclic Plan Refinement',
    evolutionSummary: 'Introduced an Autonomous Mission Planner running LangGraph on GKE Autopilot, executing cyclic Thought → Action → Observation ReAct loops with episodic working memory.',
    keyChanges: [
      'Deployed Autonomous Mission Planner Agent container on Google Kubernetes Engine (GKE Autopilot)',
      'Built LangGraph cyclic state machine orchestrating ReAct loop: Thought → Action → Observation',
      'Integrated LangGraph State Checkpointer for episodic working memory and rollback resilience',
      'Added dynamic course recalculation around subsea volcanic plumes and extreme thermals',
      'Added Agent Trajectory Evaluator and OpenTelemetry distributed tracing for goal verification'
    ],
    targetSla: '99.99% Availability • Dynamic ReAct Mission Replanning'
  },
  {
    version: 'v6.0',
    filename: '06_v6_0_multi_agent_crew_a2a_mesh',
    title: 'Autonomous Deep-Sea Robotic Fleet: Multi-Agent Crew & A2A Mesh',
    subtitle: 'v6.0 Milestone: 4 Specialized Agent Pods & Google Cloud Pub/Sub A2A Peer Event Bus',
    evolutionSummary: 'Decomposed the monolithic agent into a 4-agent specialized crew matrix with an Agent-to-Agent (A2A) event bus on Pub/Sub for peer negotiation and consensus.',
    keyChanges: [
      'Decomposed mission execution into 4 specialized agent pods: Director, Benthic, SRE, Cartographer',
      'Lead Expedition Director Agent: High-level strategic objectives and mission contract management',
      'Benthic Biome Sentinel Agent: Ecological guardrails (<350°C thermal boundary, non-invasive proximity)',
      'Kinematics & Battery SRE Agent: Motor RPM, battery degradation curves, and buoyancy calibration',
      'Spatial Cartographer Agent: 3D point-cloud SLAM and ScaNN acoustic coordinate alignment',
      'Deployed A2A Event Bus on Google Cloud Pub/Sub enabling JSON-RPC peer arbitration'
    ],
    targetSla: '99.99% Availability • Byzantine-Resilient Multi-Agent Consensus'
  },
  {
    version: 'v7.0',
    filename: '07_v7_0_hitl_safety_sandbox',
    title: 'Autonomous Deep-Sea Robotic Fleet: HITL Safety Sandbox',
    subtitle: 'v7.0 Milestone: gVisor Physics Trajectory Simulation & Maritime Admiral Approval Gate',
    evolutionSummary: 'Added a pre-execution safety gate with gVisor ephemeral code sandboxing on Cloud Run to pre-simulate 3D hydrodynamic trajectories, with human-in-the-loop sign-off.',
    keyChanges: [
      'Deployed gVisor Ephemeral Code Sandbox on Cloud Run to simulate 3D hydrodynamic trajectories',
      'Inserted Maritime Admiral Human-in-the-Loop (HITL) Decision Gate before thruster command dispatch',
      'Conditional branching: Approved trajectories (≥50m buffer) route directly to Actuator Dispatcher',
      'Proximity Alert (<50m to vent): Halts thruster execution and dispatches webhook to Research Vessel Bridge',
      'Research Vessel Bridge Console equipped with manual override controls and audit logging'
    ],
    targetSla: '99.995% Safety Continuity • Zero Unverified Thruster Dispatches'
  },
  {
    version: 'v8.0',
    filename: '08_v8_0_subsea_edge_slm_swarm',
    title: 'Autonomous Deep-Sea Robotic Fleet: Subsea Edge SLM Swarm',
    subtitle: 'v8.0 Milestone: Google Edge TPUs with Gemma 2B SLM & 12kHz Subsea Acoustic Mesh',
    evolutionSummary: 'Transformed the submersible fleet into an autonomous edge swarm by deploying Google Edge TPUs with quantized Gemma 2B SLMs on each AUV, communicating via 12kHz acoustic mesh.',
    keyChanges: [
      'Equipped 50x AUVs with on-board Google Edge TPUs running quantized Gemma 2B SLMs',
      'Established peer-to-peer 12kHz Subsea Acoustic Swarm Mesh for decentralized underwater consensus',
      'Deployed Asymmetric Edge-Cloud Sync Gateway on surface relay buoys for store-and-forward telemetry',
      'Enabled submersibles to navigate and negotiate formation trajectories when acoustic link to surface is lost',
      'Added high-frequency Doppler Velocity Log and local inertial guidance integration'
    ],
    targetSla: '99.995% Marine Autonomy • Resilient Under Total Satellite Blackout'
  },
  {
    version: 'v9.0',
    filename: '09_v9_0_spanner_graph_reflection',
    title: 'Autonomous Deep-Sea Robotic Fleet: Spanner Graph & Reflection',
    subtitle: 'v9.0 Milestone: Google Cloud Spanner Graph Episodic Memory & Post-Dive Reflection Agent',
    evolutionSummary: 'Introduced Google Cloud Spanner Graph for episodic memory and geological ontology modeling across 500+ expeditions, combined with an automated post-dive Reflection & Self-Critique Agent.',
    keyChanges: [
      'Integrated Google Cloud Spanner Graph linking 500+ historical dives, vent structures, and geological strata',
      'Deployed Reflection & Self-Critique Agent evaluating mission logs against objectives and safety margins',
      'Established closed-loop Teal reflection channel: Post-Dive Telemetry → Anomaly Extraction → Graph Update',
      'Added Autonomous Policy Store receiving tuned heuristic weights to seed subsequent dive missions',
      'Enabled cross-dive episodic recall and longitudinal geological change tracking'
    ],
    targetSla: '99.999% Reliability • Continuous Post-Mission Self-Improvement'
  },
  {
    version: 'v10.0',
    filename: '10_v10_0_closed_loop_self_healing_mesh',
    title: 'Autonomous Deep-Sea Robotic Fleet: Closed-Loop Agentic Mesh',
    subtitle: 'v10.0 Crown Milestone: Seafloor Inductive Recharging, Automated Healing & Closed Cyber-Physical Loop',
    evolutionSummary: 'Closed the cyber-physical loop with 4,000m seafloor inductive recharging stations, an Automated Self-Healing Orchestrator on GKE Autopilot, and an acoustic actuation downlink completing the continuous feedback cycle.',
    keyChanges: [
      'Deployed Seafloor Inductive Recharging Stations at 4,000m with automated dock scheduling',
      'Added Automated Self-Healing Orchestrator on GKE Autopilot with automated acoustic carrier failover',
      'Equipped Zone 6 with Acoustic Actuator Dispatcher transmitting verified acoustic command packets',
      'Established 100% Closed-Loop Return Highway (dashed green) from Actuator to Seafloor Charger',
      'Added Inductive Docking Re-seed channel returning freshly charged submersibles into active exploration',
      'Integrated Chief Oceanographer & Commander ingress persona and Maritime Bridge sign-off egress persona',
      'Delivered full Google Cloud Architecture Center enterprise compliance and 12-step process flow sequence'
    ],
    targetSla: '99.999% Autonomous Continuity • 100% Closed-Loop Actuation'
  }
];

// =========================================================================
// XML GENERATOR: AUTHENTIC GOOGLE CLOUD ARCHITECTURE CENTER BLUEPRINT
// =========================================================================

export function generateEvolutionXml(stageIndex: number): string {
  const step = EVOLUTION_STEPS[stageIndex];
  const isV10 = stageIndex === 9;
  const hasFeatureStore = stageIndex >= 1;
  const hasVectorSearch = stageIndex >= 2;
  const hasGeminiMcp = stageIndex >= 3;
  const hasLangGraphAgent = stageIndex >= 4;
  const hasMultiAgentCrew = stageIndex >= 5;
  const hasHitlSandbox = stageIndex >= 6;
  const hasEdgeSlm = stageIndex >= 7;
  const hasSpannerGraph = stageIndex >= 8;
  const hasClosedLoopDocking = stageIndex >= 9;

  // Authentic Google Cloud Vector Icons
  const iconArmor = getGcpDataUri('cloud_armor');
  const iconGlb = getGcpDataUri('cloud_load_balancing') || getGcpDataUri('cloud_armor');
  const iconVpcSc = getGcpDataUri('vpc_sc');
  const iconKms = getGcpDataUri('cloud_kms');
  const iconScc = getGcpDataUri('scc');
  const iconIam = getGcpDataUri('iam');
  const iconPubsub = getGcpDataUri('pubsub');
  const iconDataflow = getGcpDataUri('dataflow');
  const iconSpanner = getGcpDataUri('spanner');
  const iconBigQuery = getGcpDataUri('bigquery');
  const iconGcs = getGcpDataUri('cloud_storage');
  const iconVertexAi = getGcpDataUri('vertex_ai');
  const iconVectorSearch = getGcpDataUri('vertex_vector_search');
  const iconGemini = getGcpDataUri('gemini');
  const iconGke = getGcpDataUri('gke_autopilot');
  const iconCloudRun = getGcpDataUri('cloud_run');
  const iconRedis = getGcpDataUri('memorystore');
  const iconDataplex = getGcpDataUri('dataplex');

  // Google 4-Color Cloud Mark SVG (properly XML-escaped for attribute injection)
  const GOOGLE_CLOUD_SVG = `&lt;svg width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot;&gt;&lt;path d=&quot;M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z&quot; fill=&quot;#4285F4&quot;/&gt;&lt;/svg&gt;`;
  const safeTitle = step.title.replace(/&/g, '&amp;amp;');
  const safeSubtitle = step.subtitle.replace(/&/g, '&amp;amp;');

  const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram id="deepsea_evolution_${stageIndex + 1}" name="${step.version} - ${step.title.replace(/&/g, '&amp;')}">
    <mxGraphModel dx="1800" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="960" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- MASTER HEADER: OFFICIAL GOOGLE CLOUD ARCHITECTURE CENTER MASTHEAD (y=12, h=48) -->
        <!-- ========================================================================= -->
        <mxCell id="hdr_left" value="&lt;div style=&quot;display:flex;align-items:center;gap:12px;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;border:1px solid #BED8FB;letter-spacing:0.3px;&quot;&gt;[${step.version.toUpperCase()} BLUEPRINT]&lt;/span&gt;&lt;div&gt;&lt;div style=&quot;font-size:17px;font-weight:700;color:#202124;letter-spacing:-0.2px;&quot;&gt;${safeTitle}&lt;/div&gt;&lt;div style=&quot;font-size:10.5px;color:#5F6368;margin-top:2px;&quot;&gt;${safeSubtitle}&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="12" width="1250" height="46" as="geometry" />
        </mxCell>

        <!-- Official Google Cloud Architecture Center Brand Lockup -->
        <mxCell id="hdr_right" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:flex-end;gap:10px;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;&lt;div style=&quot;display:flex;align-items:center;gap:6px;&quot;&gt;${GOOGLE_CLOUD_SVG}&lt;span style=&quot;font-size:15px;font-weight:700;color:#202124;&quot;&gt;Google Cloud&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;border-left:1.5px solid #DADCE0;height:24px;margin:0 4px;&quot;&gt;&lt;/div&gt;&lt;div style=&quot;text-align:left;&quot;&gt;&lt;div style=&quot;font-size:10.5px;font-weight:700;color:#3C4043;&quot;&gt;Architecture Center&lt;/div&gt;&lt;div style=&quot;font-size:8.5px;color:#137333;font-weight:600;&quot;&gt;✓ Reference Enterprise Architecture&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=right;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1350" y="12" width="420" height="46" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 1: SUBSEA MARINE EDGE INFRASTRUCTURE (x=30, w=275, y=70, h=765)      -->
        <!-- ========================================================================= -->
        <mxCell id="z1_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="70" width="275" height="765" as="geometry" />
        </mxCell>
        <mxCell id="z1_title" value="&lt;div style=&quot;display:flex;align-items:center;gap:6px;font-family:Google Sans,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:13px;&quot;&gt;🌊&lt;/span&gt;&lt;b style=&quot;font-size:10.5px;color:#1E293B;&quot;&gt;SUBSEA MARINE EDGE FLEET&lt;/b&gt;&lt;span style=&quot;font-size:8px;color:#64748B;margin-left:auto;&quot;&gt;4,000m Abyssal Plain&lt;/span&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="76" width="250" height="20" as="geometry" />
        </mxCell>

        <!-- 1.0 Chief Oceanographer & Commander -->
        <mxCell id="c_oceanographer" value="&lt;b&gt;Chief Oceanographer &amp;amp; Commander&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Mission Directives • Survey Bounds&lt;br&gt;Expedition Objective Parameters&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="100" width="250" height="70" as="geometry" />
        </mxCell>

        <!-- 1.1 Autonomous Surface Relay Buoys -->
        <mxCell id="c_buoy" value="&lt;b&gt;Autonomous Surface Relay Buoys&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Starlink LEO Satellite • Solar Array&lt;br&gt;Asymmetric Store-and-Forward Sync&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="180" width="250" height="85" as="geometry" />
        </mxCell>

        <!-- 1.2 12kHz Subsea Acoustic Swarm Mesh -->
        <mxCell id="c_comm" value="&lt;b&gt;12kHz Subsea Acoustic Swarm Mesh&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Peer-to-Peer Acoustic Consensus&lt;br&gt;Autonomous Decentralized Formation&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="275" width="250" height="80" as="geometry" />
        </mxCell>

        <!-- 1.3 50x Autonomous Subsea AUVs -->
        ${hasEdgeSlm ? `
        <mxCell id="c_auv" value="&lt;b&gt;50x Autonomous Subsea AUVs&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;4,000m Depth • Multibeam Sonar&lt;br&gt;CTD Sensors • Doppler Log&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;⚡ Edge TPU: Gemma 2B SLM&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="365" width="250" height="100" as="geometry" />
        </mxCell>
        ` : `
        <mxCell id="c_auv" value="&lt;b&gt;50x Autonomous Subsea AUVs&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;4,000m Depth • Multibeam Sonar&lt;br&gt;CTD Sensors • Doppler Velocity Log&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="365" width="250" height="100" as="geometry" />
        </mxCell>
        `}

        <!-- 1.4 Hydrothermal Vent Biome -->
        <mxCell id="c_vent" value="&lt;b&gt;Protected Hydrothermal Vent Biome&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Extreme Thermal Plumes (350°C)&lt;br&gt;Delicate Chemotrophic Species&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA4335;strokeWidth=1.2;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="475" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- 1.5 Seafloor Inductive Recharging Grid -->
        ${hasClosedLoopDocking ? `
        <mxCell id="c_charger" value="&lt;b&gt;Seafloor Inductive Recharging Grid&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;4,000m Automated Docking Stations&lt;br&gt;Closed-Loop Energy Recharging Bus&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E6F4EA;color:#137333;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v10.0 Closed-Loop Actuation]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="560" width="250" height="85" as="geometry" />
        </mxCell>
        ` : `
        <mxCell id="c_charger" value="&lt;b&gt;Seafloor Acoustic Transponder Array&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Long Baseline (LBL) Navigation Grid&lt;br&gt;Stationary Bathymetric Landmarks&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="560" width="250" height="85" as="geometry" />
        </mxCell>
        `}

        <!-- 1.6 Benthic Mooring Grid -->
        <mxCell id="c_mooring" value="&lt;b&gt;Benthic Sensor Mooring Grid&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Acoustic Doppler Current Profilers&lt;br&gt;Seafloor CTD Ambient Telemetry&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="655" width="250" height="75" as="geometry" />
        </mxCell>

        <!-- 1.7 Edge Storage & Buffer -->
        <mxCell id="c_edge_buf" value="&lt;b&gt;Edge Flash Storage &amp;amp; Blackbox&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Non-Volatile Solid State Dive Logs&lt;br&gt;Pre-Uplink Compression Buffer&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="42" y="740" width="250" height="75" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- MASTER GOOGLE CLOUD BOUNDARY (x=320..1480, y=70..835, w=1160, h=765)     -->
        <!-- ========================================================================= -->
        <mxCell id="gcp_perimeter" value="" style="rounded=1;arcSize=3;fillColor=#F8F9FA;strokeColor=#1A73E8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="320" y="70" width="1160" height="765" as="geometry" />
        </mxCell>

        <!-- Google Cloud Master Banner Header -->
        <mxCell id="gcp_header_label" value="&lt;div style=&quot;display:flex;align-items:center;gap:8px;font-family:Google Sans,sans-serif;&quot;&gt;${GOOGLE_CLOUD_SVG}&lt;b style=&quot;font-size:12px;color:#1A73E8;&quot;&gt;Google Cloud Platform&lt;/b&gt;&lt;span style=&quot;font-size:9.5px;color:#5F6368;font-family:Roboto,sans-serif;margin-left:6px;&quot;&gt;Enterprise Multi-Region (nam3 / us-central1) • VPC: 10.128.0.0/16&lt;/span&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:8.5px;font-weight:700;padding:2px 8px;border-radius:4px;border:1px solid #BED8FB;margin-left:auto;&quot;&gt;🛡️ VPC Service Controls &amp;amp; CMEK HSM Perimeter&lt;/span&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="75" width="1130" height="24" as="geometry" />
        </mxCell>

        <!-- ------------------------------------------------------------------------- -->
        <!-- GCP SUB-ZONE A: INGRESS & NETWORK SECURITY (x=335, w=270)                 -->
        <!-- ------------------------------------------------------------------------- -->
        <mxCell id="z2_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="335" y="105" width="270" height="715" as="geometry" />
        </mxCell>
        <mxCell id="z2_title" value="&lt;b style=&quot;font-size:10px;color:#1E293B;font-family:Google Sans,sans-serif;&quot;&gt;INGRESS &amp;amp; NETWORK SECURITY&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="112" width="270" height="18" as="geometry" />
        </mxCell>

        <mxCell id="c_armor" value="&lt;b&gt;Google Cloud Armor&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Adaptive Rate Limiting 500k/m&lt;br&gt;OWASP Mitigation • Geo-IP Filter&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconArmor};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="345" y="135" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_glb" value="&lt;b&gt;Cloud Load Balancing&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Anycast IP • SSL/TLS 1.3 Offload&lt;br&gt;Marine Route Optimization&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconGlb};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_vpc" value="&lt;b&gt;Shielded VPC Network&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;10.128.0.0/16 Private Access&lt;br&gt;VPC Service Controls Perimeter&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconVpcSc};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="345" y="315" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_kms" value="&lt;b&gt;Cloud Key Management (KMS)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Hardware HSM Envelope CMEK&lt;br&gt;Rotated Keys for Sonar &amp;amp; State&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconKms};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="345" y="405" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_scc" value="&lt;b&gt;Security Command Center&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Continuous Threat Detection&lt;br&gt;Zero-Trust Vulnerability Scan&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconScc};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="345" y="495" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_iam" value="&lt;b&gt;Workload Identity &amp;amp; IAM&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Short-Lived OIDC Tokens&lt;br&gt;Least-Privilege RBAC Policies&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconIam};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="345" y="585" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_nat" value="&lt;b&gt;Cloud NAT &amp;amp; Interconnect&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Shore Fiber Cross-Connect&lt;br&gt;Egress Traffic Gateway&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="345" y="675" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_vpc_conn" value="&lt;b&gt;Serverless VPC Access&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Private Internal Connector&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="345" y="765" width="250" height="45" as="geometry" />
        </mxCell>


        <!-- ------------------------------------------------------------------------- -->
        <!-- GCP SUB-ZONE B: STREAM INGESTION & FEATURE SERVING (x=620, w=270)         -->
        <!-- ------------------------------------------------------------------------- -->
        <mxCell id="z3_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="620" y="105" width="270" height="715" as="geometry" />
        </mxCell>
        <mxCell id="z3_title" value="&lt;b style=&quot;font-size:10px;color:#1E293B;font-family:Google Sans,sans-serif;&quot;&gt;STREAM INGESTION &amp;amp; FEATURE SERVING&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="620" y="112" width="270" height="18" as="geometry" />
        </mxCell>

        <mxCell id="c_pubsub" value="&lt;b&gt;Google Cloud Pub/Sub Lite&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;200k ev/s Zonal Partitioning&lt;br&gt;Topics: sonar-raw, ctd-telemetry&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconPubsub};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="630" y="135" width="250" height="85" as="geometry" />
        </mxCell>

        <mxCell id="c_dataflow" value="&lt;b&gt;Cloud Dataflow (Apache Beam)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;10s Sliding Window Transforms&lt;br&gt;Coordinate &amp;amp; Bathymetry Calibration&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconDataflow};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="630" y="230" width="250" height="85" as="geometry" />
        </mxCell>

        ${hasFeatureStore ? `
        <mxCell id="c_feature_store" value="&lt;b&gt;Vertex AI Feature Store&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Online Low-Latency Serving&lt;br&gt;Salinity Gradient, Thermal Drift&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v2.0 Online Feature Serving]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;fontSize=9;image=${iconVertexAi};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="630" y="325" width="250" height="85" as="geometry" />
        </mxCell>
        <mxCell id="c_redis" value="&lt;b&gt;Cloud Memorystore Redis&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Sub-5ms Hydrodynamic Cache&lt;br&gt;Doppler Velocity Log Vector State&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconRedis};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="630" y="420" width="250" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_cdc_sync" value="&lt;b&gt;Datastream CDC Sync Engine&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Bi-Directional State Synchronization&lt;br&gt;Serverless Real-Time Replication&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="630" y="510" width="250" height="80" as="geometry" />
        </mxCell>
        ` : `
        <mxCell id="c_feature_store" value="&lt;b&gt;Batch Feature Repository&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Hourly Static Sensor Statistics&lt;br&gt;Hydrodynamic Mean Baseline&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="630" y="325" width="250" height="85" as="geometry" />
        </mxCell>
        <mxCell id="c_redis" value="&lt;b&gt;Local SSD Worker Cache&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Ephemeral Pipeline Storage&lt;br&gt;Dataflow Scratch Disk&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="630" y="420" width="250" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_cdc_sync" value="&lt;b&gt;Batch Acoustic Replay Job&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Nightly Raw Sonar Demuxing&lt;br&gt;Cold Archive ETL Pipeline&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="630" y="510" width="250" height="80" as="geometry" />
        </mxCell>
        `}

        <mxCell id="c_stream_buffer" value="&lt;b&gt;Telemetry Ingestion DLQ Buffer&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Dead Letter Queue • Marine Resiliency&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="630" y="600" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_flow_mon" value="&lt;b&gt;Dataflow Pipeline Telemetry&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Watermark Latency &amp;amp; Backpressure&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="630" y="690" width="250" height="75" as="geometry" />
        </mxCell>

        <mxCell id="c_pubsub_spool" value="&lt;b&gt;Pub/Sub Snapshot Archive&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;7-Day Replay Buffer&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="630" y="775" width="250" height="40" as="geometry" />
        </mxCell>


        <!-- ------------------------------------------------------------------------- -->
        <!-- GCP SUB-ZONE C: STORAGE & KNOWLEDGE REPOSITORY (x=905, w=270)             -->
        <!-- ------------------------------------------------------------------------- -->
        <mxCell id="z4_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="905" y="105" width="270" height="715" as="geometry" />
        </mxCell>
        <mxCell id="z4_title" value="&lt;b style=&quot;font-size:10px;color:#1E293B;font-family:Google Sans,sans-serif;&quot;&gt;STORAGE &amp;amp; KNOWLEDGE REPOSITORY&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="905" y="112" width="270" height="18" as="geometry" />
        </mxCell>

        <mxCell id="c_spanner" value="&lt;b&gt;Cloud Spanner (nam3 Multi-Reg)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;ACID Vehicle State • 99.999% SLA&lt;br&gt;Synchronized Telemetry Schema&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconSpanner};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="915" y="135" width="250" height="85" as="geometry" />
        </mxCell>

        <mxCell id="c_bigquery" value="&lt;b&gt;BigQuery Geospatial&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;4D Bathymetric Coordinate Mesh&lt;br&gt;Partitioned by Dive &amp;amp; GIS Tile&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconBigQuery};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="915" y="230" width="250" height="85" as="geometry" />
        </mxCell>

        <mxCell id="c_gcs" value="&lt;b&gt;Cloud Storage (Curated Lake)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Raw Multibeam Sonar (.ALL files)&lt;br&gt;Dual-Region WORM Curated Lake&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconGcs};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="915" y="325" width="250" height="85" as="geometry" />
        </mxCell>

        ${hasSpannerGraph ? `
        <mxCell id="c_spanner_graph" value="&lt;b&gt;Google Cloud Spanner Graph&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Episodic Memory &amp;amp; Geological Ontology&lt;br&gt;500+ Dives • Vent Evolution Links&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v9.0 Episodic Knowledge Graph]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;fontSize=9;image=${iconSpanner};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="915" y="420" width="250" height="85" as="geometry" />
        </mxCell>
        ` : `
        <mxCell id="c_spanner_graph" value="&lt;b&gt;Relational Mission Archive&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Tabular Dive Logs &amp;amp; Metadata&lt;br&gt;Foreign-Key Linked Tables&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="915" y="420" width="250" height="85" as="geometry" />
        </mxCell>
        `}

        <mxCell id="c_dataplex" value="&lt;b&gt;Dataplex Universal Catalog&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Unified Geological Lineage &amp;amp; Metadata&lt;br&gt;Automated Schema Guard &amp;amp; Quality&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconDataplex};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="915" y="515" width="250" height="80" as="geometry" />
        </mxCell>

        <mxCell id="c_lake_iceberg" value="&lt;b&gt;BigLake Iceberg Metastore&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Apache Iceberg Open Table Formats&lt;br&gt;Cross-Cloud Acoustic Analytics&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="915" y="605" width="250" height="75" as="geometry" />
        </mxCell>

        <mxCell id="c_cold_archive" value="&lt;b&gt;Cloud Storage Archive (WORM)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;10-Year Immutable Marine Retention&lt;br&gt;UNCLOS Legal Regulatory Tier&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="915" y="690" width="250" height="75" as="geometry" />
        </mxCell>

        <mxCell id="c_data_guard" value="&lt;b&gt;Dataplex Data Quality Guard&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Automated Schema Integrity Rules&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="915" y="775" width="250" height="40" as="geometry" />
        </mxCell>


        <!-- ------------------------------------------------------------------------- -->
        <!-- GCP SUB-ZONE D: VERTEX AI & MULTI-AGENT REASONING (x=1190, w=280)         -->
        <!-- ------------------------------------------------------------------------- -->
        <mxCell id="z5_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1190" y="105" width="280" height="715" as="geometry" />
        </mxCell>
        <mxCell id="z5_title" value="&lt;b style=&quot;font-size:10px;color:#1E293B;font-family:Google Sans,sans-serif;&quot;&gt;VERTEX AI &amp;amp; MULTI-AGENT REASONING&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="112" width="280" height="18" as="geometry" />
        </mxCell>

        ${hasMultiAgentCrew ? `
        <!-- 4-Agent Crew Container -->
        <mxCell id="c_crew_box" value="" style="rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#BED8FB;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1200" y="135" width="260" height="250" as="geometry" />
        </mxCell>
        <mxCell id="c_crew_title" value="&lt;b style=&quot;font-size:9.5px;color:#1D4ED8;font-family:Google Sans,sans-serif;&quot;&gt;4-AGENT SPECIALIZED CREW MATRIX&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1200" y="138" width="260" height="16" as="geometry" />
        </mxCell>

        <!-- 4 Specialized Agents -->
        <mxCell id="a_director" value="&lt;b&gt;1. Expedition Director Agent&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Mission Objectives &amp;amp; SLA Contract&lt;/font&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1210" y="156" width="240" height="42" as="geometry" />
        </mxCell>
        <mxCell id="a_benthic" value="&lt;b&gt;2. Benthic Biome Sentinel Agent&lt;/b&gt;&lt;br&gt;&lt;font color='#B91C1C'&gt;Ecological Guardrails (&amp;lt;350°C)&lt;/font&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA4335;strokeWidth=1;fontSize=8.5;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1210" y="202" width="240" height="42" as="geometry" />
        </mxCell>
        <mxCell id="a_sre" value="&lt;b&gt;3. Kinematics &amp;amp; Battery SRE Agent&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Motor RPM, Battery &amp;amp; Ballast Balance&lt;/font&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1210" y="248" width="240" height="42" as="geometry" />
        </mxCell>
        <mxCell id="a_carto" value="&lt;b&gt;4. Spatial Cartographer Agent&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;3D Bathymetry &amp;amp; ScaNN Alignment&lt;/font&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1210" y="294" width="240" height="42" as="geometry" />
        </mxCell>

        <!-- A2A Event Bus inside Crew -->
        <mxCell id="c_a2a_bus" value="&lt;b&gt;A2A Event Bus (Pub/Sub JSON-RPC)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Peer Negotiation &amp;amp; Multi-Agent Consensus&lt;/font&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1.2;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1210" y="340" width="240" height="38" as="geometry" />
        </mxCell>

        <!-- Google Gemini 3.1 Pro Core Reasoner -->
        <mxCell id="c_gemini_core" value="&lt;b&gt;Google Gemini 3.1 Pro Reasoner&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Shared Cognitive Backbone • Autonomous Tools&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;fontSize=9;image=${iconGemini};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="395" width="260" height="75" as="geometry" />
        </mxCell>

        <!-- Vertex Vector Search (ScaNN) -->
        <mxCell id="c_vector_search" value="&lt;b&gt;Vertex Vector Search (ScaNN)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;1408-dim Sonar Acoustic Embeddings&lt;br&gt;Nearest-Neighbor Vent Grounding&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v3.0 ScaNN Vector Index]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconVectorSearch};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="480" width="260" height="80" as="geometry" />
        </mxCell>

        <!-- Reflection & Self-Critique Agent (v9+) -->
        ${hasSpannerGraph ? `
        <mxCell id="c_reflect_agent" value="&lt;b&gt;Reflection &amp;amp; Self-Critique Agent&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Post-Dive Retrospective Analysis&lt;br&gt;Prompt Policy Tuning &amp;amp; Knowledge Sync&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E6F4EA;color:#137333;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v9.0 Cognitive Reflection Loop]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;fontSize=9;image=${iconVertexAi};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="570" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_policy_store" value="&lt;b&gt;Autonomous Policy Store&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Heuristic Weight Tuning • Edge Policy Sync&lt;br&gt;Reinforcement Feedback Checkpoints&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="660" width="260" height="75" as="geometry" />
        </mxCell>
        ` : `
        <mxCell id="c_reflect_agent" value="&lt;b&gt;Multi-Agent Consensus Verifier&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Byzantine Fault Tolerance Checker&lt;br&gt;Automated Agent Health &amp;amp; Liveness&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="570" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_policy_store" value="&lt;b&gt;Agent Working Memory Buffer&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Working Context Cache • Ephemeral State&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="660" width="260" height="75" as="geometry" />
        </mxCell>
        `}

        <mxCell id="c_agent_eval" value="&lt;b&gt;Crew Telemetry &amp;amp; OpenTelemetry Traces&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Distributed Agent Traces • Token Budget Guard&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1200" y="745" width="260" height="70" as="geometry" />
        </mxCell>
        ` : hasLangGraphAgent ? `
        <!-- Single LangGraph Agent (v5) -->
        <mxCell id="c_agent_planner" value="&lt;b&gt;Autonomous Mission Planner Agent&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;LangGraph on GKE Autopilot&lt;br&gt;ReAct: Thought → Action → Observe&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v5.0 Autonomous ReAct Agent]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;fontSize=9;image=${iconGke};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="135" width="260" height="95" as="geometry" />
        </mxCell>
        <mxCell id="c_gemini_single" value="&lt;b&gt;Gemini 3.1 Pro Reasoning Core&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Multi-Turn Decision Evaluation&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconGemini};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="245" width="260" height="85" as="geometry" />
        </mxCell>
        <mxCell id="c_vector_search" value="&lt;b&gt;Vertex Vector Search (ScaNN)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;1408-dim Sonar Acoustic Embeddings&lt;br&gt;Nearest-Neighbor Vent Grounding&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconVectorSearch};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="345" width="260" height="90" as="geometry" />
        </mxCell>
        <mxCell id="c_react_memory" value="&lt;b&gt;LangGraph State Checkpointer&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Episodic Working Memory &amp;amp; Rollback&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="450" width="260" height="85" as="geometry" />
        </mxCell>
        <mxCell id="c_agent_eval" value="&lt;b&gt;Agent Trajectory Evaluator&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Automated Goal Success Verification&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="550" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_policy_store" value="&lt;b&gt;Mission State Cache&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Working Navigation Heuristics&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="645" width="260" height="75" as="geometry" />
        </mxCell>
        <mxCell id="c_agent_traces" value="&lt;b&gt;Agent Telemetry Traces&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Token &amp;amp; Latency Export (OpenTelemetry)&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1200" y="735" width="260" height="80" as="geometry" />
        </mxCell>
        ` : hasGeminiMcp ? `
        <!-- Gemini + MCP Gateway (v4) -->
        <mxCell id="c_gemini_mcp" value="&lt;b&gt;Google Gemini 3.1 Pro Reasoner&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Native Multimodal Model Garden&lt;br&gt;Autonomous Tool Invocation Engine&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v4.0 Gemini Reasoning Core]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;fontSize=9;image=${iconGemini};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="135" width="260" height="95" as="geometry" />
        </mxCell>
        <mxCell id="c_mcp_gateway" value="&lt;b&gt;Model Context Protocol (MCP) Gateway&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Cloud Run Serverless Microservice&lt;br&gt;Typed Tools: Spanner, BigQuery, ScaNN&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconCloudRun};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="245" width="260" height="90" as="geometry" />
        </mxCell>
        <mxCell id="c_vector_search" value="&lt;b&gt;Vertex Vector Search (ScaNN)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;1408-dim Sonar Acoustic Embeddings&lt;br&gt;Nearest-Neighbor Vent Grounding&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconVectorSearch};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="350" width="260" height="90" as="geometry" />
        </mxCell>
        <mxCell id="c_tool_registry" value="&lt;b&gt;MCP Tool Schema Registry&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;JSON-RPC Protocol Definition Cache&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="455" width="260" height="85" as="geometry" />
        </mxCell>
        <mxCell id="c_mcp_audit" value="&lt;b&gt;MCP Execution Interceptor&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Tool Call Latency &amp;amp; Rate Limiting&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="555" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_policy_store" value="&lt;b&gt;Static Rule Store&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Hardcoded Safety Thresholds&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="650" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_agent_traces" value="&lt;b&gt;MCP Latency Telemetry&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Execution Traces &amp;amp; Error Tracking&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1200" y="745" width="260" height="70" as="geometry" />
        </mxCell>
        ` : `
        <!-- Classical ML Box (v1 to v3) -->
        <mxCell id="c_ml_core" value="&lt;b&gt;Vertex AI Custom Prediction&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;XGBoost Sensor Anomaly Detection&lt;br&gt;Batch Model Endpoint&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;image=${iconVertexAi};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="135" width="260" height="90" as="geometry" />
        </mxCell>
        <mxCell id="c_model_eval" value="&lt;b&gt;Vertex AI Model Evaluation&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Precision/Recall &amp;amp; Drift Scoring&lt;br&gt;Offline Batch Benchmark Reports&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="240" width="260" height="90" as="geometry" />
        </mxCell>
        ${hasVectorSearch ? `
        <mxCell id="c_vector_search" value="&lt;b&gt;Vertex Vector Search (ScaNN)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;1408-dim Sonar Acoustic Embeddings&lt;br&gt;Nearest-Neighbor Vent Grounding&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v3.0 Multimodal Vector Search]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconVectorSearch};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1200" y="345" width="260" height="95" as="geometry" />
        </mxCell>
        ` : `
        <mxCell id="c_model_registry" value="&lt;b&gt;Vertex AI Model Registry&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Artifact Lineage &amp;amp; Model Versioning&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="345" width="260" height="95" as="geometry" />
        </mxCell>
        `}
        <mxCell id="c_meta_store" value="&lt;b&gt;ML Metadata Tracking&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Hyperparameter Pipeline Runs&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="455" width="260" height="85" as="geometry" />
        </mxCell>
        <mxCell id="c_batch_infer" value="&lt;b&gt;Batch Acoustic Prediction Job&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Scheduled Hourly Anomaly Demux&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="555" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_rule_engine" value="&lt;b&gt;Static Rule Alerting Engine&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Threshold Cross-Check Matrix&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="650" width="260" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_ml_ops" value="&lt;b&gt;Vertex AI Model Monitoring&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Sensor Feature Skew &amp;amp; Drift Alerts&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1200" y="745" width="260" height="70" as="geometry" />
        </mxCell>
        `}


        <!-- ========================================================================= -->
        <!-- ZONE 6: OPERATIONS, HITL GOVERNANCE & ACTUATION (x=1495, w=275, y=70, h=765) -->
        <!-- ========================================================================= -->
        <mxCell id="z6_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1495" y="70" width="275" height="765" as="geometry" />
        </mxCell>
        <mxCell id="z6_title" value="&lt;div style=&quot;display:flex;align-items:center;gap:6px;font-family:Google Sans,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:13px;&quot;&gt;🚢&lt;/span&gt;&lt;b style=&quot;font-size:10px;color:#1E293B;&quot;&gt;OPERATIONS &amp;amp; ACTUATION&lt;/b&gt;&lt;span style=&quot;font-size:8px;color:#64748B;margin-left:auto;&quot;&gt;Safety &amp;amp; Governance&lt;/span&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1508" y="76" width="250" height="20" as="geometry" />
        </mxCell>

        ${hasHitlSandbox ? `
        <!-- Cloud Run gVisor Sandbox -->
        <mxCell id="c_sandbox" value="&lt;b&gt;Cloud Run (gVisor MicroVMs)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Isolated 3D Physics Trajectory Engine&lt;br&gt;Simulates Thruster Packets in Sandbox&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#FCE8E6;color:#C5221F;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v7.0 Trajectory Pre-Simulator]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA4335;strokeWidth=1.2;fontSize=9;image=${iconCloudRun};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1508" y="100" width="250" height="85" as="geometry" />
        </mxCell>

        <!-- Maritime Admiral Approval Gate (Decision Rhombus) -->
        <mxCell id="c_hitl_gate" value="&lt;b style=&quot;font-size:9.5px;color:#202124;&quot;&gt;HITL Decision Gate&lt;/b&gt;&lt;br&gt;&lt;font color='#EA4335'&gt;&lt;b&gt;Proximity &amp;lt; 50m to Vent?&lt;/b&gt;&lt;/font&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA4335;strokeWidth=1.5;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1553" y="200" width="160" height="85" as="geometry" />
        </mxCell>

        <!-- Research Vessel Bridge Console -->
        <mxCell id="c_admiral_console" value="&lt;b&gt;Research Vessel Bridge Console&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Maritime Admiral Manual Review&lt;br&gt;Secure Satellite Telemetry Webhook&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="305" width="250" height="80" as="geometry" />
        </mxCell>

        <!-- Acoustic Actuator Dispatcher -->
        <mxCell id="c_actuator" value="&lt;b&gt;Acoustic Actuator Dispatcher&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Verified Thruster Command Packets&lt;br&gt;Satellite / Acoustic Downlink Dispatch&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E6F4EA;color:#137333;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v10 Self-Healing Downlink]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="400" width="250" height="85" as="geometry" />
        </mxCell>

        <!-- GKE Autopilot Self-Healing Orchestrator -->
        <mxCell id="c_self_healing" value="&lt;b&gt;Google Kubernetes Engine (GKE)&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Automated GKE Pod Self-Repair&lt;br&gt;Acoustic Channel Re-routing Engine&lt;/font&gt;&lt;br&gt;&lt;span style=&quot;background:#E8F0FE;color:#1967D2;font-size:7.5px;font-weight:700;padding:1px 6px;border-radius:3px;&quot;&gt;[v10 Self-Healing Orchestrator]&lt;/span&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.2;fontSize=9;image=${iconGke};imageWidth=22;imageHeight=22;imageAlign=left;spacingLeft=32;" vertex="1" parent="1">
          <mxGeometry x="1508" y="500" width="250" height="85" as="geometry" />
        </mxCell>

        <!-- Subsea Mission Blackbox -->
        <mxCell id="c_blackbox" value="&lt;b&gt;Subsea Mission Blackbox&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Cryptographic WORM Flight Recorder&lt;br&gt;UNCLOS Legal Liability Audit Archive&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="600" width="250" height="85" as="geometry" />
        </mxCell>
        ` : `
        <!-- Classical SRE Operations (v1-v6) -->
        <mxCell id="c_admiral_console" value="&lt;b&gt;Shore Base Operations Console&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Manual Tactical Status Monitoring&lt;br&gt;Expedition Map &amp;amp; Satellite Health&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="100" width="250" height="90" as="geometry" />
        </mxCell>
        <mxCell id="c_ops_sre" value="&lt;b&gt;Cloud Monitoring &amp;amp; Logging&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Centralized Log Analytics &amp;amp; Metrics&lt;br&gt;PagerDuty &amp;amp; On-Call Escalations&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="210" width="250" height="90" as="geometry" />
        </mxCell>
        <mxCell id="c_blackbox" value="&lt;b&gt;Cryptographic Audit Trail&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Immutable Operator Action Log&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="320" width="250" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_self_healing" value="&lt;b&gt;Manual Infrastructure Runbooks&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Static Failover Documentation&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="420" width="250" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_actuator" value="&lt;b&gt;Manual Satellite Uplink Transmitter&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Operator Command Injection&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="520" width="250" height="80" as="geometry" />
        </mxCell>
        <mxCell id="c_sandbox" value="&lt;b&gt;Pre-Flight Check Script&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Static Validation Pipeline&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="615" width="250" height="70" as="geometry" />
        </mxCell>
        `}

        <mxCell id="c_coast_guard" value="&lt;b&gt;Coast Guard &amp;amp; UNCLOS Webhook&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;International Maritime Safety Uplink&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=9;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1508" y="700" width="250" height="70" as="geometry" />
        </mxCell>

        <mxCell id="c_shore_dash" value="&lt;b&gt;Shore Operations Status Bar&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Real-Time Fleet Mission Readiness&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;fontSize=8.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="1508" y="780" width="250" height="40" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- OFFICIAL GOOGLE CLOUD ARCHITECTURE CENTER FOOTER & LEGEND (y=845..945)    -->
        <!-- ========================================================================= -->
        <!-- Left Box: Data Flow Sequence -->
        <mxCell id="legend_flow_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="30" y="845" width="1280" height="75" as="geometry" />
        </mxCell>
        <mxCell id="legend_flow_title" value="&lt;div style=&quot;font-family:Google Sans,sans-serif;font-size:10px;font-weight:700;color:#1E293B;letter-spacing:0.5px;&quot;&gt;DATA FLOW SEQUENCE (END-TO-END REASONING &amp;amp; ACTUATION LIFECYCLE)&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="850" width="800" height="16" as="geometry" />
        </mxCell>

        <!-- 10 Flow Sequence Step Chips -->
        <mxCell id="step_chip_1" value="&lt;b&gt;❶ Ingress&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Oceanographer&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#BED8FB;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="872" width="105" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_2" value="&lt;b&gt;❷ Swarm LEO&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Acoustic Mesh&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#BED8FB;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="160" y="872" width="105" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_3" value="&lt;b&gt;❸ Cloud Armor&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;WAF &amp;amp; GLB&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#BED8FB;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="275" y="872" width="105" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_4" value="&lt;b&gt;❹ Pub/Sub Lite&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Streaming 200k/s&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="872" width="115" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_5" value="&lt;b&gt;❺ Dataflow&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Window Normalization&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="515" y="872" width="120" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_6" value="&lt;b&gt;❻ Spanner nam3&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;ACID State &amp;amp; ScaNN&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#A7F3D0;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="645" y="872" width="125" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_7" value="&lt;b&gt;❼ 4-Agent Crew&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;A2A Event Bus&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#DDD6FE;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="780" y="872" width="115" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_8" value="&lt;b&gt;❽ Gemini 3.1 Pro&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Vertex AI Reasoning&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#DDD6FE;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="905" y="872" width="120" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_9" value="&lt;b&gt;❾ gVisor &amp;amp; HITL&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Physics Sim &amp;amp; Gate&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FCE8E6;strokeColor=#FECACA;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="872" width="125" height="36" as="geometry" />
        </mxCell>
        <mxCell id="step_chip_10" value="&lt;b&gt;❿ Actuator Downlink&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;Seafloor Dock Re-seed&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#A7F3D0;strokeWidth=1;fontSize=7.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1170" y="872" width="125" height="36" as="geometry" />
        </mxCell>

        <!-- Right Box: Architecture Legend -->
        <mxCell id="legend_box_bg" value="" style="rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1320" y="845" width="450" height="75" as="geometry" />
        </mxCell>
        <mxCell id="legend_box_title" value="&lt;div style=&quot;font-family:Google Sans,sans-serif;font-size:10px;font-weight:700;color:#1E293B;letter-spacing:0.5px;&quot;&gt;CONNECTOR &amp;amp; PROTOCOL LEGEND&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="850" width="420" height="16" as="geometry" />
        </mxCell>
        <mxCell id="legend_items" value="&lt;table style=&quot;width:100%;font-size:8px;font-family:Roboto,sans-serif;color:#3C4043;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;&lt;span style=&quot;color:#1A73E8;font-weight:bold;&quot;&gt;━ Solid Blue:&lt;/span&gt; Sync mTLS Ingress / API&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;&lt;span style=&quot;color:#D97706;font-weight:bold;&quot;&gt;┅ Dashed Amber:&lt;/span&gt; Pub/Sub &amp;amp; CDC Stream&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;&lt;span style=&quot;color:#7C3AED;font-weight:bold;&quot;&gt;┅ Dashed Purple:&lt;/span&gt; Vertex AI &amp;amp; A2A Bus&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;&lt;span style=&quot;color:#0D9488;font-weight:bold;&quot;&gt;┅ Dashed Teal:&lt;/span&gt; Spanner Graph Reflection&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;&lt;span style=&quot;color:#137333;font-weight:bold;&quot;&gt;┅ Dashed Green:&lt;/span&gt; Closed Downlink &amp;amp; Re-seed&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;&lt;span style=&quot;color:#EA4335;font-weight:bold;&quot;&gt;━ Red / Coral:&lt;/span&gt; gVisor Sim &amp;amp; Proximity Halt&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="868" width="425" height="48" as="geometry" />
        </mxCell>

        <!-- Sub-bar: Governance & Framework Verification -->
        <mxCell id="footer_bar" value="&lt;div style=&quot;font-family:Roboto,sans-serif;font-size:9px;color:#5F6368;text-align:center;&quot;&gt;&lt;b&gt;Google Cloud Architecture Center&lt;/b&gt; • Published under Google Cloud Well-Architected Framework • Verified 6 Pillars: Security, Reliability, Operational Excellence, Performance, Cost Optimization, Sustainability&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="925" width="1740" height="18" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- CONNECTORS (MATHEMATICAL HIGHWAYS & 100% COLLISION-FREE ROUTING)          -->
        <!-- ========================================================================= -->

        <!-- Ingress: Oceanographer to Buoy -->
        <mxCell id="e_1" value="❶ Mission SLA Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1A73E8;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;fontStyle=1;" edge="1" parent="1" source="c_oceanographer" target="c_buoy">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Buoy to Acoustic Swarm Mesh -->
        <mxCell id="e_2" value="❷ Acoustic Gateway" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1A73E8;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;fontStyle=1;" edge="1" parent="1" source="c_buoy" target="c_comm">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Swarm Mesh to AUVs -->
        <mxCell id="e_swarm_auv" value="❸ Swarm Consensus" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=8;" edge="1" parent="1" source="c_comm" target="c_auv">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Buoy to Armor: Route strictly through inter-zone channel at x=312 -->
        <mxCell id="e_3" value="❹ Satellite mTLS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1A73E8;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_buoy" target="c_armor">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="312" y="222" />
              <mxPoint x="312" y="175" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_4" value="Verified Edge" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;" edge="1" parent="1" source="c_armor" target="c_glb">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- GLB to PubSub: Route strictly in inter-zone channel at x=605 to bypass Dataflow -->
        <mxCell id="e_5" value="❺ VPC Ingress (10.128.0.0/16)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;fontStyle=1;" edge="1" parent="1" source="c_glb" target="c_pubsub">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="605" y="265" />
              <mxPoint x="605" y="177" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Streaming Flow -->
        <mxCell id="e_6" value="❻ Stream (200k ev/s)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_pubsub" target="c_dataflow">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Dataflow to Spanner: Route in gap x=890 to Spanner left -->
        <mxCell id="e_7" value="ACID State (nam3)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#137333;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_dataflow" target="c_spanner">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="890" y="272" />
              <mxPoint x="890" y="177" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Dataflow to BigQuery: Direct straight horizontal connector across gap -->
        <mxCell id="e_8" value="4D Coordinates" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#137333;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;fontStyle=1;" edge="1" parent="1" source="c_dataflow" target="c_bigquery">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Dataflow to Curated Lakehouse GCS: Route in gap x=890 down to y=367 -->
        <mxCell id="e_gcs" value="Curated Raw Sonar (.ALL)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#137333;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;fontStyle=1;" edge="1" parent="1" source="c_dataflow" target="c_gcs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="890" y="272" />
              <mxPoint x="890" y="367" />
            </Array>
          </mxGeometry>
        </mxCell>

        ${hasFeatureStore ? `
        <mxCell id="e_fs" value="Real-time Features" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_dataflow" target="c_feature_store">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_redis" value="Sub-5ms Cache" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;" edge="1" parent="1" source="c_feature_store" target="c_redis">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- Spanner to Datastream CDC Sync -->
        <mxCell id="e_cdc" value="Bi-Directional CDC Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;" edge="1" parent="1" source="c_spanner" target="c_cdc_sync">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="890" y="177" />
              <mxPoint x="890" y="550" />
            </Array>
          </mxGeometry>
        </mxCell>
        ` : ''}

        ${hasVectorSearch ? `
        <!-- GCS to Vector Search ScaNN: Route in gap x=1175 across to y=520 -->
        <mxCell id="e_vector" value="Acoustic Sonar Embeddings (1408-dim)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#1A73E8;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_gcs" target="c_vector_search">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1175" y="367" />
              <mxPoint x="1175" y="${hasMultiAgentCrew ? 520 : 392}" />
            </Array>
          </mxGeometry>
        </mxCell>
        ` : ''}

        <!-- BigQuery to Dataplex Catalog Lineage -->
        <mxCell id="e_dataplex" value="Schema Guard &amp; Quality" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#137333;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=8;" edge="1" parent="1" source="c_bigquery" target="c_dataplex">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- KMS Encryption Protection: Route via y=415 between c_feature_store/c_redis and c_gcs/c_spanner_graph -->
        <mxCell id="e_kms_enc" value="CMEK Hardware HSM" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#5F6368;strokeWidth=1.2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="c_kms" target="c_spanner">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="605" y="445" />
              <mxPoint x="605" y="415" />
              <mxPoint x="890" y="415" />
              <mxPoint x="890" y="177" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- SCC Security Telemetry: Route via left internal gutter x=340 to bypass c_kms -->
        <mxCell id="e_scc_mon" value="Zero-Trust Threat Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#1A73E8;strokeWidth=1.2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="c_vpc" target="c_scc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="340" y="355" />
              <mxPoint x="340" y="535" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Vent Biome Sensing & Guardrail -->
        <mxCell id="e_vent_sense" value="Thermal Survey (350°C)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=8;" edge="1" parent="1" source="c_auv" target="c_vent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        ${!hasGeminiMcp ? `
        <mxCell id="e_ml_predict" value="Telemetry Inference" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="${hasFeatureStore ? 'c_feature_store' : 'c_bigquery'}" target="c_ml_core">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              ${hasFeatureStore ? `
              <mxPoint x="890" y="367" />
              <mxPoint x="890" y="225" />
              <mxPoint x="1175" y="225" />
              <mxPoint x="1175" y="180" />
              ` : `
              <mxPoint x="1175" y="272" />
              <mxPoint x="1175" y="180" />
              `}
            </Array>
          </mxGeometry>
        </mxCell>
        ` : ''}

        ${hasGeminiMcp && !hasMultiAgentCrew ? `
        <mxCell id="e_mcp_tool1" value="call_spanner_query()" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#7C3AED;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_mcp_gateway" target="c_spanner">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1175" y="290" />
              <mxPoint x="1175" y="177" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_mcp_tool2" value="get_bathymetry_bounds()" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#7C3AED;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_mcp_gateway" target="c_bigquery">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1175" y="290" />
              <mxPoint x="1175" y="272" />
            </Array>
          </mxGeometry>
        </mxCell>
        ` : ''}

        ${hasMultiAgentCrew ? `
        <!-- Multi-Agent A2A internal sequential pipeline -->
        <mxCell id="e_a2a_1" value="1. Mission Contract" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="a_director" target="a_benthic">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_a2a_2" value="2. Biome Guardrails" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="a_benthic" target="a_sre">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_a2a_3" value="3. Kinematic Budgets" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="a_sre" target="a_carto">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_a2a_4" value="4. Spatial Consensus" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#137333;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="a_carto" target="c_a2a_bus">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_a2a_5" value="❼ Consensus Context to Gemini 3.1 Pro" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1A73E8;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;fontStyle=1;" edge="1" parent="1" source="c_a2a_bus" target="c_gemini_core">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Vector Search grounding back into Gemini Core -->
        <mxCell id="e_vector_ground" value="ScaNN Nearest-Neighbor Vent Grounding" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#1A73E8;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;fontStyle=1;" edge="1" parent="1" source="c_vector_search" target="c_gemini_core">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        ` : ''}

        ${hasHitlSandbox ? `
        <!-- Sandbox Ingress from Gemini Reasoning Core: Route via gap x=1487 up to y=142 -->
        <mxCell id="e_sandbox_in" value="❽ 3D Physics Simulation (gVisor)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA4335;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="${hasMultiAgentCrew ? 'c_gemini_core' : 'c_agent_planner'}" target="c_sandbox">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1487" y="${hasMultiAgentCrew ? 432 : 182}" />
              <mxPoint x="1487" y="142" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Sandbox to HITL Gate: Straight vertical -->
        <mxCell id="e_sandbox_eval" value="❾ Safe Trajectory?" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA4335;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_sandbox" target="c_hitl_gate">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- HITL Gate to Admiral Console (NO branch: straight down) -->
        <mxCell id="e_hitl_no" value="Proximity Alert (&lt;50m)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA4335;strokeWidth=2;endArrow=block;labelBackgroundColor=#FCE8E6;labelBorderColor=#EA4335;padding=2.5;fontSize=8.5;fontColor=#C5221F;fontStyle=1;" edge="1" parent="1" source="c_hitl_gate" target="c_admiral_console">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- HITL Gate to Actuator (YES branch: bypass via right corridor x=1782) -->
        <mxCell id="e_hitl_yes" value="Approved (≥50m buffer)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#137333;strokeWidth=2;endArrow=block;labelBackgroundColor=#E6F4EA;labelBorderColor=#137333;padding=2.5;fontSize=8.5;fontColor=#137333;fontStyle=1;" edge="1" parent="1" source="c_hitl_gate" target="c_actuator">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1782" y="242" />
              <mxPoint x="1782" y="442" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Admiral Manual Override & Sign-off to Actuator -->
        <mxCell id="e_admiral_override" value="❿ Manual Override / Sign-Off" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#137333;strokeWidth=1.8;endArrow=block;labelBackgroundColor=#E6F4EA;labelBorderColor=#137333;padding=2;fontSize=8;fontColor=#137333;fontStyle=1;" edge="1" parent="1" source="c_admiral_console" target="c_actuator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Actuator to Cryptographic WORM Blackbox -->
        <mxCell id="e_act_blackbox" value="Cryptographic Flight Recording" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#5F6368;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="c_actuator" target="c_blackbox">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        ` : ''}

        ${hasSpannerGraph ? `
        <!-- Reflection Loop: Spanner to Reflection Agent strictly via gap x=1175 -->
        <mxCell id="e_reflect_in" value="Post-Dive Telemetry Deltas" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#0D9488;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8;fontStyle=1;" edge="1" parent="1" source="c_spanner" target="c_reflect_agent">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1175" y="177" />
              <mxPoint x="1175" y="610" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Reflection Agent back to Spanner Graph via gap x=1175 -->
        <mxCell id="e_reflect_out" value="Update Geological Knowledge Graph" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2.5;fontSize=8.5;fontStyle=1;" edge="1" parent="1" source="c_reflect_agent" target="c_spanner_graph">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1175" y="610" />
              <mxPoint x="1175" y="462" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Reflection Agent updates Autonomous Policy Store -->
        <mxCell id="e_policy_update" value="Tuned Heuristic Weights" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=8;" edge="1" parent="1" source="c_reflect_agent" target="c_policy_store">
          <mxGeometry relative="1" as="geometry">
            <Array as="points" />
          </mxGeometry>
        </mxCell>

        <!-- Policy Store seeds Director Agent for next expedition -->
        <mxCell id="e_policy_seed" value="Reinforcement Seed for Next Dive" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="c_policy_store" target="a_director">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1487" y="697" />
              <mxPoint x="1487" y="177" />
            </Array>
          </mxGeometry>
        </mxCell>
        ` : ''}

        ${hasClosedLoopDocking ? `
        <!-- Self-Healing Orchestration Sync -->
        <mxCell id="e_heal_sync" value="Dynamic Re-routing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#137333;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=8;" edge="1" parent="1" source="c_actuator" target="c_self_healing">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Closed Loop Highway: Returns via right margin x=1782 and bottom corridor y=948 strictly OUTSIDE containers to Seafloor Dock -->
        <mxCell id="e_closed_loop" value="⓫ Downlink Acoustic Thruster &amp; Docking Commands" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#137333;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#E6F4EA;labelBorderColor=#137333;padding=3;fontColor=#137333;fontSize=9.5;fontStyle=1;" edge="1" parent="1" source="c_actuator" target="c_charger">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1782" y="442" />
              <mxPoint x="1782" y="948" />
              <mxPoint x="167" y="948" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Closed-Loop Feedback to Vehicles: Seafloor Charger re-seeds AUVs via left margin x=18 -->
        <mxCell id="e_reseed" value="⓬ Inductive Docking Re-seed" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#137333;strokeWidth=2;endArrow=block;labelBackgroundColor=#E6F4EA;labelBorderColor=#137333;padding=2.5;fontSize=8.5;fontColor=#137333;fontStyle=1;" edge="1" parent="1" source="c_charger" target="c_auv">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="18" y="602" />
              <mxPoint x="18" y="415" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Self-Healing Carrier Failover to Comm Mesh -->
        <mxCell id="e_heal_failover" value="Automated Acoustic Carrier Failover" style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;strokeColor=#137333;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=2;fontSize=7.5;" edge="1" parent="1" source="c_self_healing" target="c_comm">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1487" y="542" />
              <mxPoint x="1487" y="830" />
              <mxPoint x="312" y="830" />
              <mxPoint x="312" y="315" />
            </Array>
          </mxGeometry>
        </mxCell>
        ` : ''}

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  // Clean all comments so that no double-hyphens exist inside XML comments (W3C standard)
  return rawXml.replace(/<!--[\s\S]*?-->/g, (comment) => {
    const inner = comment.slice(4, -3).replace(/--+/g, '==');
    return `<!--${inner}-->`;
  });
}

// =========================================================================
// GEOMETRIC AUDITOR & COLLISION CERTIFIER
// =========================================================================

interface Point { x: number; y: number; }
interface Box { id: string; x: number; y: number; w: number; h: number; }

function segmentIntersectsRect(p1: Point, p2: Point, rect: Box, pad = 4): boolean {
  const rL = rect.x - pad;
  const rR = rect.x + rect.w + pad;
  const rT = rect.y - pad;
  const rB = rect.y + rect.h + pad;

  let t0 = 0.0;
  let t1 = 1.0;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  const p = [-dx, dx, -dy, dy];
  const q = [p1.x - rL, rR - p1.x, p1.y - rT, rB - p1.y];

  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return false;
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > t1) return false;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return false;
        if (t < t1) t1 = t;
      }
    }
  }
  return t0 <= t1;
}

export function auditAndCertifyXmlGeometry(xml: string, versionTag: string) {
  const issues: string[] = [];
  const vertices: Box[] = [];

  const vertexRegex = /<mxCell[^>]*id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<mxGeometry[^>]*x="(-?[\d.]+)"[^>]*y="(-?[\d.]+)"[^>]*width="(-?[\d.]+)"[^>]*height="(-?[\d.]+)"/g;
  let match;
  while ((match = vertexRegex.exec(xml)) !== null) {
    vertices.push({
      id: match[1],
      x: parseFloat(match[2]),
      y: parseFloat(match[3]),
      w: parseFloat(match[4]),
      h: parseFloat(match[5])
    });
  }

  // Check fill factor in sub-zones
  const subZones = vertices.filter(v => v.id.startsWith('z') && v.id.endsWith('_bg'));
  let minFillFactor = 1.0;

  subZones.forEach(zone => {
    const children = vertices.filter(v => 
      v.id !== zone.id && 
      !v.id.startsWith('z') &&
      v.id !== 'gcp_perimeter' &&
      v.x >= zone.x - 5 && 
      v.x + v.w <= zone.x + zone.w + 5 &&
      v.y >= zone.y &&
      v.y + v.h <= zone.y + zone.h + 25
    );

    if (children.length >= 2) {
      const minChildY = Math.min(...children.map(c => c.y));
      const maxChildBottom = Math.max(...children.map(c => c.y + c.h));
      const occupiedHeight = maxChildBottom - minChildY;
      const fillRatio = occupiedHeight / (zone.h - 40);
      if (fillRatio < minFillFactor) minFillFactor = fillRatio;

      if (fillRatio < 0.75) {
        issues.push(`Low fill factor in ${zone.id}: ${(fillRatio * 100).toFixed(1)}% (expected >= 75%)`);
      }
    }
  });

  const edgeRegex = /<mxCell[^>]*id="([^"]+)"[^>]*edge="1"[^>]*source="([^"]+)"[^>]*target="([^"]+)"[\s\S]*?>([\s\S]*?)<\/mxCell>/g;
  let eMatch;
  let collisions = 0;

  while ((eMatch = edgeRegex.exec(xml)) !== null) {
    const edgeId = eMatch[1];
    const srcId = eMatch[2];
    const tgtId = eMatch[3];
    const inner = eMatch[4];

    const srcBox = vertices.find(v => v.id === srcId);
    const tgtBox = vertices.find(v => v.id === tgtId);
    if (!srcBox || !tgtBox) continue;

    const waypoints: Point[] = [];
    const arrayMatch = /<Array as="points">([\s\S]*?)<\/Array>/.exec(inner);
    if (arrayMatch) {
      const ptRegex = /<mxPoint\s+x="(-?[\d.]+)"\s+y="(-?[\d.]+)"/g;
      let ptMatch;
      while ((ptMatch = ptRegex.exec(arrayMatch[1])) !== null) {
        waypoints.push({ x: parseFloat(ptMatch[1]), y: parseFloat(ptMatch[2]) });
      }
    }

    if (waypoints.length >= 2) {
      for (let s = 0; s < waypoints.length - 1; s++) {
        const pA = waypoints[s];
        const pB = waypoints[s + 1];

        for (const box of vertices) {
          if (box.id.startsWith('z') || box.id === 'gcp_perimeter' || box.id.startsWith('hdr') || box.id.startsWith('legend') || box.id.startsWith('step_') || box.id === 'footer_bar') continue;
          if (box.id === srcId || box.id === tgtId) continue;
          if (box.id === 'c_crew_box' && srcId.startsWith('a_') && tgtId.startsWith('a_')) continue;

          if (segmentIntersectsRect(pA, pB, box, 4)) {
            collisions++;
            issues.push(`Collision: Edge '${edgeId}' waypoint segment (${pA.x},${pA.y})->(${pB.x},${pB.y}) cuts box '${box.id}'`);
          }
        }
      }
    }
  }

  return {
    version: versionTag,
    certified: issues.length === 0,
    collisions,
    fillFactor: minFillFactor,
    issues
  };
}

// =========================================================================
// RUNNER: COMPILE ALL 10 STAGES & RENDER HIGH-RES SCREENSHOTS
// =========================================================================

async function main() {
  const taskDir = path.resolve(process.cwd(), 'scratch/screenshots_agentic_evolution');
  const brainDir = path.resolve('/Users/nitinagga/.gemini/jetski/brain/8d379ad2-8382-4c17-976c-6502e40a06cb');
  if (!fs.existsSync(taskDir)) fs.mkdirSync(taskDir, { recursive: true });

  console.log('🚀 Starting Autonomous Deep-Sea Robotic Fleet 10-Stage Evolution Pipeline (Google Cloud Architecture Center)...');

  // 1. Setup local HTTP server for viewer-static.min.js
  let currentHtml = '';
  const server = http.createServer((req, res) => {
    if (req.url === '/viewer-static.min.js') {
      const p = path.resolve(process.cwd(), 'public/viewer-static.min.js');
      if (fs.existsSync(p)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fs.readFileSync(p));
        return;
      }
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(currentHtml);
  });

  await new Promise<void>(resolve => server.listen(0, resolve));
  const address = server.address() as any;
  const port = address.port;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  const manifest = [];

  for (let i = 0; i < EVOLUTION_STEPS.length; i++) {
    const step = EVOLUTION_STEPS[i];
    console.log(`⏳ [Stage ${i + 1}/10] Compiling & Auditing ${step.version}: ${step.title}...`);

    const currentXml = generateEvolutionXml(i);

    const xmlPath = path.join(taskDir, `${step.filename}.drawio.xml`);
    fs.writeFileSync(xmlPath, currentXml, 'utf-8');

    const audit = auditAndCertifyXmlGeometry(currentXml, step.version);
    if (!audit.certified) {
      console.error(`❌ CERTIFICATION FAILED for ${step.version}:`);
      audit.issues.forEach(iss => console.error(`   ${iss}`));
      throw new Error(`Geometric certification failed for ${step.version} with ${audit.collisions} collisions and ${(audit.fillFactor * 100).toFixed(1)}% fill factor.`);
    }

    console.log(`   ✅ CERTIFIED: 0 AABB Collisions | Fill Factor: ${(audit.fillFactor * 100).toFixed(1)}%`);

    const configObj = {
      highlight: '#1A73E8',
      nav: false,
      resize: true,
      toolbar: null,
      edit: null,
      xml: currentXml
    };

    currentHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body {
      margin: 0; padding: 0; width: 100%; height: 100%; background: #FFFFFF; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .mxgraph {
      width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    }
    .mxgraph > svg {
      width: 100% !important; height: auto !important; margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="mxgraph" id="diagram-container"></div>
  <script src="/viewer-static.min.js"></script>
  <script>
    try {
      const cfg = ${JSON.stringify(configObj)};
      const cont = document.getElementById("diagram-container");
      cont.setAttribute("data-mxgraph", JSON.stringify(cfg));
      if (window.GraphViewer && window.GraphViewer.processElements) {
        window.GraphViewer.processElements();
      }
    } catch(e) {
      console.error("Initialization error:", e);
    }
  </script>
</body>
</html>`;

    await page.setViewport({ width: 1800, height: 1000, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise(r => setTimeout(r, 1500));

    const svgElem = (await page.$('.mxgraph > svg')) || (await page.$('#diagram-container'));
    const pngPathWorkspace = path.join(taskDir, `${step.filename}.png`);
    const pngPathBrain = path.join(brainDir, `${step.filename}.png`);

    if (svgElem) {
      await svgElem.screenshot({ path: pngPathWorkspace });
    } else {
      await page.screenshot({ path: pngPathWorkspace, fullPage: true });
    }

    fs.copyFileSync(pngPathWorkspace, pngPathBrain);
    const stat = fs.statSync(pngPathWorkspace);
    if (stat.size < 50000) {
      throw new Error(`Quality Gate Failure: ${step.filename}.png rendered as only ${stat.size} bytes (expected >50KB)!`);
    }
    console.log(`   📸 Rendered high-res PNG: ${step.filename}.png (${Math.round(stat.size / 1024)} KB)\n`);

    manifest.push({
      version: step.version,
      filename: step.filename,
      title: step.title,
      subtitle: step.subtitle,
      evolutionSummary: step.evolutionSummary,
      keyChanges: step.keyChanges,
      targetSla: step.targetSla,
      certified: true,
      fillFactor: audit.fillFactor,
      collisions: 0,
      pngWorkspace: pngPathWorkspace,
      pngBrain: pngPathBrain,
      xmlWorkspace: xmlPath
    });
  }

  await browser.close();
  server.close();

  const manifestPath = path.join(taskDir, 'evolution_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`📋 Saved evolution manifest: ${manifestPath}`);
  console.log(`\n🎉 ALL 10 EVOLUTION STAGES MATHEMATICALLY CERTIFIED & RENDERED TO HIGH-RES PNG!\n`);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
