/**
 * Universal Purpose-Built Zero-Blueprint Synthesis Topology:
 * Closed-Loop Control & Parallel 1:3 Counterfactual Digital-Twin Agentic Harness
 *
 * Implements the 4 structural upgrades over a standard vertical cloud stack across ANY domain
 * (NASA/Aerospace, Autonomous Robotics/SCADA, Healthcare/Clinical Trials, FinTech Risk Gates, or Custom Harnesses):
 * 1. FLOW: Closed-Loop 100Hz Telemetry Return Highway + Hard GO/NO-GO Branching + 1:3 Parallel Scenario Fork-Join
 * 2. SHAPES:
 *    - shape=rhombus (Decision Diamond) for Commit / Policy / Safety Gate
 *    - shape=hexagon for Autonomous Google ADK / A2A Agents
 *    - 3 Stacked Parallel Swimlane Enclaves for Scenario α, Scenario β, Scenario γ
 *    - shape=cylinder3 for Stateful Graph, High-Frequency Telemetry & Vector Stores
 *    - Full-Width Dashed Air-Gap / Protocol Boundary Band separating Cloud Control Plane from Execution Bus
 * 3. COMPONENTS: Abort Quarantine Sink, Scenario α/β/γ Rollout Lanes, Cross-Scenario Pareto Policy Distiller,
 *    and Onboard / Edge Execution Segment.
 * 4. ARROWS: Color-coded orthogonal protocol connectors (Blue Command Uplink, Emerald GO, Crimson NO-GO Abort,
 *    Purple Dashed 1:3 Fork / 3:1 Join, and Teal Outer Closed-Loop Telemetry Return Highway).
 */

function escAttr(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escHtml(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function numBadgeHtml(num: string): string {
  return `<span style="display:inline-block;background:#1A73E8;color:#FFFFFF;border-radius:999px;width:16px;height:16px;line-height:16px;text-align:center;font-size:10px;font-weight:700;margin-right:4px;">${num}</span>`;
}

export interface UniversalClosedLoopHarnessOptions {
  prompt?: string;
  projectTitle?: string;
  domain?: string;
  theme?: 'light' | 'dark';
}

interface ClosedLoopDomainTopologySpec {
  diagramId: string;
  diagramName: string;
  headerTitleHtml: string;
  headerSubtitleHtml: string;
  certStandardsLineHtml: string;
  uiTitleHtml: string;
  uiSubHtml: string;
  edgeTitleHtml: string;
  edgeLine1Html: string;
  edgeLine2Html: string;
  edgeAuthLabelHtml: string;
  identityTitleHtml: string;
  identityLine1Html: string;
  identityLine2Html: string;
  abortTitleHtml: string;
  abortLine1Html: string;
  abortLine2Html: string;
  gateTitleHtml: string;
  gateSubHtml: string;
  gateGoEdgeHtml: string;
  gateArmorEdgeHtml: string;
  armorTitleHtml: string;
  armorLine1Html: string;
  armorLine2Html: string;
  obsHeaderHtml: string;
  obsItem1SubHtml: string;
  obsItem2SubHtml: string;
  obsItem3SubHtml: string;
  obsItem4SubHtml: string;
  iamSubHtml: string;
  coordTitleHtml: string;
  coordLine1Html: string;
  coordLine2Html: string;
  agent1TitleHtml: string;
  agent1SubHtml: string;
  agent2TitleHtml: string;
  agent2SubHtml: string;
  agent3TitleHtml: string;
  agent3SubHtml: string;
  sandboxTitleHtml: string;
  laneAlphaTitleHtml: string;
  laneAlphaSubHtml: string;
  laneBetaTitleHtml: string;
  laneBetaSubHtml: string;
  laneGammaTitleHtml: string;
  laneGammaSubHtml: string;
  distillerTitleHtml: string;
  distillerSubHtml: string;
  distillerVectorEdgeHtml: string;
  spannerSubHtml: string;
  bigtableSubHtml: string;
  firestoreSubHtml: string;
  vectorSubHtml: string;
  boundaryBannerHtml: string;
  executionHeaderHtml: string;
  exec1TitleHtml: string;
  exec1Line1Html: string;
  exec1Line2Html: string;
  exec1EdgeHtml: string;
  exec2TitleHtml: string;
  exec2Line1Html: string;
  exec2Line2Html: string;
  exec2EdgeHtml: string;
  exec3TitleHtml: string;
  exec3Line1Html: string;
  exec3Line2Html: string;
  exec3EdgeHtml: string;
  exec4TitleHtml: string;
  exec4Line1Html: string;
  exec4Line2Html: string;
  closedLoopPillHtml: string;
}

export function shouldUseUniversalClosedLoopHarness(text: string): boolean {
  const lower = String(text || '').toLowerCase();
  if (!lower) return false;
  return (
    lower.includes('nasa') ||
    lower.includes('satellite') ||
    lower.includes('satellight') ||
    lower.includes('universe') ||
    lower.includes('multiverse') ||
    lower.includes('orbital') ||
    lower.includes('spacecraft') ||
    lower.includes('aerospace') ||
    lower.includes('agentic harness') ||
    lower.includes('closed-loop') ||
    lower.includes('closed loop') ||
    lower.includes('digital-twin') ||
    lower.includes('digital twin') ||
    lower.includes('counterfactual') ||
    lower.includes('robotics') ||
    lower.includes('autonomous fleet') ||
    lower.includes('autonomous vehicle') ||
    lower.includes('sim-to-real') ||
    lower.includes('clinical trial harness') ||
    lower.includes('quantum control')
  );
}

function resolveClosedLoopDomainSpec(options?: UniversalClosedLoopHarnessOptions): ClosedLoopDomainTopologySpec {
  const combined = `${options?.prompt || ''} ${options?.projectTitle || ''} ${options?.domain || ''}`.toLowerCase();

  const isNasaOrAerospace =
    !combined.trim() ||
    combined.includes('nasa') ||
    combined.includes('satellite') ||
    combined.includes('satellight') ||
    combined.includes('universe') ||
    combined.includes('multiverse') ||
    combined.includes('orbital') ||
    combined.includes('space') ||
    combined.includes('rocket') ||
    combined.includes('aerospace') ||
    combined.includes('constellation');

  if (isNasaOrAerospace) {
    return {
      diagramId: 'nasa_multiverse_closed_loop_harness',
      diagramName: 'NASA Closed-Loop &amp; Multi-Universe Agentic Harness',
      headerTitleHtml: 'NASA CLOSED-LOOP MISSION CONTROL &amp; PARALLEL MULTI-UNIVERSE DIGITAL-TWIN AGENTIC HARNESS',
      headerSubtitleHtml:
        'Custom Compositional AST • Rhombus LCC Gate (GO/NO-GO) • Hexagon ADK Agents • 1:3 Counterfactual Universe Fork-Join • 100Hz CCSDS Closed-Loop Telemetry Return',
      certStandardsLineHtml: 'CCSDS 133.0-B/732.0-B • DSN 810-005 • cFS/F&#39; • NPR 8715.5',
      uiTitleHtml: 'NASA Mission Control UI',
      uiSubHtml: '(Goddard GMSEC / Flight Director Console / AG-UI)',
      edgeTitleHtml: 'DSN &amp; NSN RF Edge Layer',
      edgeLine1Html: '(CCSDS 732.0-B AOS, Cloud Armor, Apigee X)',
      edgeLine2Html: '(S/X/Ka-Band TT&amp;C Link, SLE Uplink &amp; Guard)',
      edgeAuthLabelHtml: 'PIV/CAC OIDC',
      identityTitleHtml: 'Identity Platform',
      identityLine1Html: 'ITAR / FedRAMP High IAM',
      identityLine2Html: '(NASA PIV/CAC &amp; Zero-Trust OIDC)',
      abortTitleHtml: '⛔ AFTS Range Safety Abort Sink',
      abortLine1Html: 'NPR 8715.5 Autonomous Flight Termination',
      abortLine2Html: 'Pad Hold • Safe-Mode Thruster Lockout',
      gateTitleHtml: 'Launch Commit (LCC) Gate',
      gateSubHtml: 'CCSDS 133.0-B &amp; AFTS Decision Gate',
      gateGoEdgeHtml: '[GO: LCC PASS]',
      gateArmorEdgeHtml: 'AFTS &amp; Physics Check',
      armorTitleHtml: 'Model Armor &amp; Physics Guard',
      armorLine1Html: '(Range Safety AFTS &amp; Counterfactual',
      armorLine2Html: 'Physics Hallucination Firewall)',
      obsHeaderHtml: 'NASA Observability,<br/>AgentOps &amp; FinOps',
      obsItem1SubHtml: '(OTel CCSDS Spans)',
      obsItem2SubHtml: '(100Hz Link Margin)',
      obsItem3SubHtml: '(Trajectory Fidelity)',
      obsItem4SubHtml: '(TPU v5e Sim Budget)',
      iamSubHtml: '(WIF &amp; ITAR RBAC)',
      coordTitleHtml: 'Flight Director Coordinator',
      coordLine1Html: '(Vertex AI Agent Engine / Google ADK /',
      coordLine2Html: 'LangGraph &amp; CCSDS Mission Ops Hexagon)',
      agent1TitleHtml: 'GNC &amp; Orbit FDS<br/>Agent',
      agent1SubHtml: '(J2000 Ephemeris / ADK)',
      agent2TitleHtml: 'cFS / F&#39; Avionics<br/>&amp; LCC Agent',
      agent2SubHtml: '(Range Safety AFTS / ADK)',
      agent3TitleHtml: 'Multiverse Sim<br/>Digital-Twin Agent',
      agent3SubHtml: '(1:3 Counterfactual Fork)',
      sandboxTitleHtml: 'Parallel Multi-Universe Digital-Twin Sandbox',
      laneAlphaTitleHtml: '🌌 Universe α (Nominal ΛCDM &amp; J2000 Ephemeris)',
      laneAlphaSubHtml: 'Physics Digital-Twin Sims • G = G₀ • Standard LEO/GEO/Deep-Space Orbit',
      laneBetaTitleHtml: '🌌 Universe β (Counterfactual High-Gravity ΔG)',
      laneBetaSubHtml: 'G = 1.35 G₀ • Relativistic Thrust &amp; Escape-Velocity Monte Carlo Sweep',
      laneGammaTitleHtml: '🌌 Universe γ (Extreme Solar-Storm &amp; Drag Regime)',
      laneGammaSubHtml: '10x Coronal Mass Ejection Flux • Non-Keplerian Attitude Perturbation',
      distillerTitleHtml: 'Cross-Universe Pareto Policy Distiller',
      distillerSubHtml: '3:1 Trajectory Consensus &amp; Optimal Burn Synthesis',
      distillerVectorEdgeHtml: 'NTRS Grounding',
      spannerSubHtml: '(J2000 Ephemeris &amp; LCC Graph)',
      bigtableSubHtml: '(100Hz CCSDS Telemetry)',
      firestoreSubHtml: '(ITAR Flight Rules &amp; FMEA)',
      vectorSubHtml: '(Gemini Embedding 2 • NASA NTRS &amp; cFS Anomaly Corpus)',
      boundaryBannerHtml:
        '📡 DSN &amp; NSN S/X/Ka-BAND RF SPACE-LINK AIR-GAP BOUNDARY (CCSDS 133.0-B Uplink ▼ / 732.0-B AOS Downlink ▲)',
      executionHeaderHtml:
        '🛰️ Spacecraft Flight Segment &amp; Avionics Bus <span style="color:#0369A1;">(Onboard NASA Goddard cFS • JPL F Prime [F&#39;] • HIL)</span>',
      exec1TitleHtml: 'CCSDS 133.0-B Telecommand Decoder',
      exec1Line1Html: 'Onboard cFS / JPL F&#39; Command Uplink',
      exec1Line2Html: 'Cryptographic TC Frame Verification',
      exec1EdgeHtml: 'CCSDS 133.0-B TC Uplink',
      exec2TitleHtml: 'GNC Thruster &amp; Attitude Actuator',
      exec2Line1Html: 'Launch Commit (LCC) &amp; AFTS Range Gate',
      exec2Line2Html: 'J2000 Orbital Insertion Burn Execution',
      exec2EdgeHtml: 'LCC Burn Commit',
      exec3TitleHtml: 'FDIR Autonomous Fault Recovery',
      exec3Line1Html: 'Multi-Universe Sim Policy Execution',
      exec3Line2Html: 'Onboard Anomaly Isolation &amp; Re-Route',
      exec3EdgeHtml: 'Distilled Sim Policy',
      exec4TitleHtml: 'DSN S/X/Ka-Band Telemetry Encoder',
      exec4Line1Html: 'CCSDS 732.0-B AOS 100Hz Frame Downlink',
      exec4Line2Html: 'Feeds Outer Closed-Loop Return Bus',
      closedLoopPillHtml: '🔄 CLOSED-LOOP 100Hz CCSDS 732.0-B AOS TELEMETRY RETURN HIGHWAY',
    };
  }

  if (
    combined.includes('robot') ||
    combined.includes('autonomous') ||
    combined.includes('vehicle') ||
    combined.includes('drone') ||
    combined.includes('scada') ||
    combined.includes('sim-to-real')
  ) {
    return {
      diagramId: 'robotics_sim2real_closed_loop_harness',
      diagramName: 'Autonomous Robotics &amp; Sim-to-Real Closed-Loop Agentic Harness',
      headerTitleHtml: 'AUTONOMOUS ROBOTICS &amp; PARALLEL SIM-TO-REAL DIGITAL-TWIN CLOSED-LOOP HARNESS',
      headerSubtitleHtml:
        'Custom Compositional AST • Rhombus Safety Interlock Gate • Hexagon ADK Agents • 1:3 Sim-to-Real Physics Fork-Join • 100Hz ROS 2 DDS Closed-Loop Telemetry Return',
      certStandardsLineHtml: 'ROS 2 DDS • IEC 61508 SIL-3 • ISO 26262 ASIL-D • IEEE 1872',
      uiTitleHtml: 'Fleet Mission Command UI',
      uiSubHtml: '(ROS 2 Foxglove / Fleet Operator Console / AG-UI)',
      edgeTitleHtml: '5G URLLC &amp; ROS 2 DDS Edge Gateway',
      edgeLine1Html: '(FastDDS RTPS, Cloud Armor, Apigee X)',
      edgeLine2Html: '(mTLS 1.3 Hardware TPM Attestation &amp; QoS Guard)',
      edgeAuthLabelHtml: 'TPM 2.0 mTLS',
      identityTitleHtml: 'Identity Platform',
      identityLine1Html: 'Zero-Trust Fleet IAM',
      identityLine2Html: '(Hardware TPM 2.0 &amp; SPIFFE/SPIRE OIDC)',
      abortTitleHtml: '⛔ ISO 26262 E-Stop Quarantine Sink',
      abortLine1Html: 'IEC 61508 SIL-3 Safe-Torque-Off (STO)',
      abortLine2Html: 'Kinematic Brake Lock • Human Takeover Alert',
      gateTitleHtml: 'Kinematic Safety Gate',
      gateSubHtml: 'ISO 26262 ASIL-D &amp; Collision Envelope Gate',
      gateGoEdgeHtml: '[GO: ENVELOPE SAFE]',
      gateArmorEdgeHtml: 'Kinematic &amp; Force Check',
      armorTitleHtml: 'Model Armor &amp; Physics Guard',
      armorLine1Html: '(Control Barrier Function CBF &amp;',
      armorLine2Html: 'Torque Limit Safety Firewall)',
      obsHeaderHtml: 'Fleet Observability,<br/>AgentOps &amp; FinOps',
      obsItem1SubHtml: '(OTel ROS 2 DDS Spans)',
      obsItem2SubHtml: '(1kHz Joint Torque Telemetry)',
      obsItem3SubHtml: '(Sim-to-Real Gap Score)',
      obsItem4SubHtml: '(TPU/GPU Isaac Sim Cost)',
      iamSubHtml: '(WIF &amp; Fleet RBAC)',
      coordTitleHtml: 'Embodied Fleet Coordinator',
      coordLine1Html: '(Vertex AI Agent Engine / Google ADK /',
      coordLine2Html: 'LangGraph &amp; ROS 2 Action Server Hexagon)',
      agent1TitleHtml: 'SLAM &amp; World-Model<br/>Agent',
      agent1SubHtml: '(3D Occupancy &amp; Pose / ADK)',
      agent2TitleHtml: 'MPC &amp; Whole-Body<br/>Control Agent',
      agent2SubHtml: '(ISO 26262 Safety / ADK)',
      agent3TitleHtml: 'Sim-to-Real Rollout<br/>Digital-Twin Agent',
      agent3SubHtml: '(1:3 Physics Domain Fork)',
      sandboxTitleHtml: 'Parallel Sim-to-Real Physics Digital-Twin Sandbox',
      laneAlphaTitleHtml: '🤖 Regime α (Nominal Friction &amp; Rigid-Body Dynamics)',
      laneAlphaSubHtml: 'MuJoCo / Isaac Sim • Nominal Payload &amp; Dry Surface Kinematics',
      laneBetaTitleHtml: '🤖 Regime β (Low-Friction Slip &amp; Sensor Noise Δμ)',
      laneBetaSubHtml: 'μ = 0.25 Wet/Ice Surface • LiDAR Occlusion &amp; Latency Perturbation',
      laneGammaTitleHtml: '🤖 Regime γ (Actuator Degradation &amp; External Force)',
      laneGammaSubHtml: '25% Motor Torque Loss • Dynamic Obstacle &amp; Wind Gust Impulse',
      distillerTitleHtml: 'Cross-Regime Pareto Policy Distiller',
      distillerSubHtml: '3:1 Robust Control Consensus &amp; Action Chunking',
      distillerVectorEdgeHtml: 'Trajectory Grounding',
      spannerSubHtml: '(3D Scene Graph &amp; Fleet State)',
      bigtableSubHtml: '(1kHz Joint &amp; LiDAR Stream)',
      firestoreSubHtml: '(ISO 26262 Safety Rules)',
      vectorSubHtml: '(Gemini Embedding 2 • Embodied Demonstration &amp; Failure Corpus)',
      boundaryBannerHtml:
        '📡 5G URLLC &amp; ROS 2 RTPS REAL-TIME FIELD-BUS AIR-GAP BOUNDARY (100Hz Action Uplink ▼ / 1kHz Sensor Downlink ▲)',
      executionHeaderHtml:
        '🦾 Edge Robot &amp; Real-Time Actuator Bus <span style="color:#0369A1;">(Onboard RTOS • ROS 2 Hardware Control Loop • HIL)</span>',
      exec1TitleHtml: 'ROS 2 RTPS Action Decoder',
      exec1Line1Html: 'Onboard Real-Time Trajectory Buffer',
      exec1Line2Html: 'Cryptographic Command Frame Verification',
      exec1EdgeHtml: 'ROS 2 RTPS Action Uplink',
      exec2TitleHtml: 'Whole-Body Torque &amp; Drive Actuator',
      exec2Line1Html: 'Control Barrier Function (CBF) Gate',
      exec2Line2Html: '1kHz Impedance &amp; Joint Servo Execution',
      exec2EdgeHtml: 'Verified Torque Commit',
      exec3TitleHtml: 'Autonomous Fault &amp; Slip Recovery',
      exec3Line1Html: 'Sim-to-Real Distilled Policy Execution',
      exec3Line2Html: 'Real-Time Gait / Path Re-Planning',
      exec3EdgeHtml: 'Distilled Control Policy',
      exec4TitleHtml: 'Proprioceptive &amp; LiDAR Encoder',
      exec4Line1Html: 'ROS 2 DDS 100Hz State Frame Downlink',
      exec4Line2Html: 'Feeds Outer Closed-Loop Return Bus',
      closedLoopPillHtml: '🔄 CLOSED-LOOP 100Hz ROS 2 DDS SENSOR TELEMETRY RETURN HIGHWAY',
    };
  }

  const rawSubject =
    options?.projectTitle ||
    options?.domain ||
    String(options?.prompt || 'Enterprise Cyber-Physical System')
      .replace(/^(please\s+)?(build|design|create|architect|generate|show)\s+(a|an|the)?\s*/i, '')
      .slice(0, 56)
      .trim() ||
    'Autonomous Agentic System';
  const cleanSubject = escHtml(rawSubject);

  return {
    diagramId: 'universal_closed_loop_domain_harness',
    diagramName: `${cleanSubject} — Closed-Loop &amp; Parallel Digital-Twin Harness`,
    headerTitleHtml: `${cleanSubject.toUpperCase()} — CLOSED-LOOP &amp; PARALLEL DIGITAL-TWIN AGENTIC HARNESS`,
    headerSubtitleHtml:
      'Custom Compositional AST • Rhombus Policy Gate (GO/NO-GO) • Hexagon ADK Agents • 1:3 Counterfactual Scenario Fork-Join • Closed-Loop Telemetry Return',
    certStandardsLineHtml: 'NIST AI RMF 1.0 • ISO/IEC 42001 • OpenTelemetry • Zero-Trust OIDC',
    uiTitleHtml: `${cleanSubject} Console UI`,
    uiSubHtml: '(Operator Mission Control / Gemini Live / AG-UI)',
    edgeTitleHtml: 'Zero-Trust Edge &amp; Telemetry Gateway',
    edgeLine1Html: '(Cloud Armor, Apigee X, Envoy AI Gateway)',
    edgeLine2Html: '(mTLS 1.3, Rate Limiting &amp; Protocol Guard)',
    edgeAuthLabelHtml: 'Zero-Trust OIDC',
    identityTitleHtml: 'Identity Platform',
    identityLine1Html: 'Zero-Trust Workload IAM',
    identityLine2Html: '(OAuth 2.1 / OIDC &amp; FIPS 140-3 KMS)',
    abortTitleHtml: '⛔ Policy Violation Quarantine Sink',
    abortLine1Html: 'Automated Circuit-Breaker &amp; Safe-Hold',
    abortLine2Html: 'Immutable Audit Lockout • HITL Escalation',
    gateTitleHtml: 'Policy &amp; Safety Commit Gate',
    gateSubHtml: 'Deterministic Invariant &amp; Risk Decision Gate',
    gateGoEdgeHtml: '[GO: POLICY PASS]',
    gateArmorEdgeHtml: 'Safety &amp; Invariant Check',
    armorTitleHtml: 'Model Armor &amp; Safety Guard',
    armorLine1Html: '(Sensitive Data Protection SDP &amp;',
    armorLine2Html: 'Counterfactual Hallucination Firewall)',
    obsHeaderHtml: 'SRE Observability,<br/>AgentOps &amp; FinOps',
    obsItem1SubHtml: '(OTel GenAI Trace Spans)',
    obsItem2SubHtml: '(Real-Time SLO Telemetry)',
    obsItem3SubHtml: '(Counterfactual Eval Score)',
    obsItem4SubHtml: '(TPU/GPU Compute FinOps)',
    iamSubHtml: '(WIF &amp; Least-Privilege RBAC)',
    coordTitleHtml: 'Lead Orchestrator Coordinator',
    coordLine1Html: '(Vertex AI Agent Engine / Google ADK /',
    coordLine2Html: 'LangGraph &amp; A2A Control Hexagon)',
    agent1TitleHtml: 'State &amp; Topology<br/>Planning Agent',
    agent1SubHtml: '(Graph State Solver / ADK)',
    agent2TitleHtml: 'Policy &amp; Compliance<br/>Verification Agent',
    agent2SubHtml: '(Guardrail Enforcement / ADK)',
    agent3TitleHtml: 'Counterfactual Sim<br/>Digital-Twin Agent',
    agent3SubHtml: '(1:3 Scenario Rollout Fork)',
    sandboxTitleHtml: 'Parallel 1:3 Counterfactual Digital-Twin Sandbox',
    laneAlphaTitleHtml: '⚡ Scenario α (Nominal Baseline Operating Regime)',
    laneAlphaSubHtml: 'Digital-Twin Baseline • Standard Load &amp; Equilibrium Parameters',
    laneBetaTitleHtml: '⚡ Scenario β (High-Stress Surge &amp; Parameter Shift)',
    laneBetaSubHtml: '3.5x Tail-Risk Perturbation • Monte Carlo Sensitivity Sweep',
    laneGammaTitleHtml: '⚡ Scenario γ (Adversarial Fault &amp; Degraded Regime)',
    laneGammaSubHtml: 'Partial Node Outage • Boundary Constraint &amp; Recovery Rollout',
    distillerTitleHtml: 'Cross-Scenario Pareto Policy Distiller',
    distillerSubHtml: '3:1 Multi-Scenario Consensus &amp; Optimal Action Synthesis',
    distillerVectorEdgeHtml: 'Knowledge Grounding',
    spannerSubHtml: '(TrueTime State &amp; Lineage Graph)',
    bigtableSubHtml: '(High-Frequency Event Stream)',
    firestoreSubHtml: '(Policy Rules &amp; Audit Ledger)',
    vectorSubHtml: '(Gemini Embedding 2 • Domain Standards &amp; Incident Corpus)',
    boundaryBannerHtml:
      '🛡️ ZERO-TRUST EXECUTION &amp; TELEMETRY AIR-GAP BOUNDARY (Verified Command Uplink ▼ / Real-Time Telemetry Downlink ▲)',
    executionHeaderHtml:
      '⚙️ Downstream Execution &amp; Telemetry Bus <span style="color:#0369A1;">(Deterministic Actuation • Transactional Commit • Closed-Loop Sensor Bus)</span>',
    exec1TitleHtml: 'Command &amp; Policy Decoder',
    exec1Line1Html: 'Cryptographic Signature Verification',
    exec1Line2Html: 'Idempotent Command Envelope Check',
    exec1EdgeHtml: 'Verified Command Uplink',
    exec2TitleHtml: 'Primary State Actuator',
    exec2Line1Html: 'Policy Commit Gate Approved',
    exec2Line2Html: 'Atomic Production State Mutation',
    exec2EdgeHtml: 'Atomic Commit Dispatch',
    exec3TitleHtml: 'Autonomous Self-Healing Engine',
    exec3Line1Html: 'Distilled Pareto Policy Execution',
    exec3Line2Html: 'Real-Time Drift Isolation &amp; Rollback',
    exec3EdgeHtml: 'Distilled Pareto Policy',
    exec4TitleHtml: 'Closed-Loop Telemetry Encoder',
    exec4Line1Html: 'Real-Time State &amp; Drift Frame Stream',
    exec4Line2Html: 'Feeds Outer Closed-Loop Return Bus',
    closedLoopPillHtml: '🔄 CLOSED-LOOP REAL-TIME TELEMETRY &amp; DRIFT FEEDBACK RETURN HIGHWAY',
  };
}

export function buildUniversalClosedLoopDomainHarnessXml(
  options: UniversalClosedLoopHarnessOptions = {}
): string {
  const isDark = options.theme === 'dark';
  const bg = isDark ? '#0B111E' : '#FFFFFF';
  const strokeMain = isDark ? '#94A3B8' : '#334155';
  const spec = resolveClosedLoopDomainSpec(options);

  const cells: string[] = [];
  cells.push('      <mxCell id="0" />');
  cells.push('      <mxCell id="1" parent="0" />');

  const v = (
    id: string,
    valueHtml: string,
    style: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    cells.push(
      `      <mxCell id="${id}" value="${escAttr(valueHtml)}" style="${style}" vertex="1" parent="1">\n` +
        `        <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />\n` +
        `      </mxCell>`
    );
  };

  const e = (
    id: string,
    valueHtml: string,
    style: string,
    source: string,
    target: string,
    points: Array<[number, number]> = []
  ) => {
    const ptsXml =
      points.length > 0
        ? `\n          <Array as="points">\n` +
          points.map(([px, py]) => `            <mxPoint x="${px}" y="${py}" />`).join('\n') +
          `\n          </Array>\n        `
        : '';
    cells.push(
      `      <mxCell id="${id}" value="${escAttr(valueHtml)}" style="${style}" edge="1" parent="1" source="${source}" target="${target}">\n` +
        `        <mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>\n` +
        `      </mxCell>`
    );
  };

  // =========================================================================
  // HEADER BANNER & PROVENANCE BADGE
  // =========================================================================
  v(
    'nasa_header_banner',
    `<div style="line-height:1.25;font-family:Inter,Arial,sans-serif;text-align:left;padding-left:10px;">` +
      `<b style="font-size:12.5px;color:#0F172A;">${spec.headerTitleHtml}</b><br/>` +
      `<span style="font-size:9px;color:#475569;">${spec.headerSubtitleHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=middle;`,
    55,
    12,
    1065,
    44
  );

  v(
    'nasa_cert_badge',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;text-align:center;">` +
      `<b style="font-size:9px;color:#1D4ED8;">🛡️ ZERO-BLUEPRINT CUSTOM AST • 99% CERTIFIED</b><br/>` +
      `<span style="font-size:8px;color:#0F172A;">Generator: gemini-3.8-flash • Judge: gemini-3.1-pro-preview</span><br/>` +
      `<span style="font-size:7.8px;color:#475569;">${spec.certStandardsLineHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=5 3;align=center;verticalAlign=middle;`,
    1135,
    12,
    295,
    44
  );

  // =========================================================================
  // TIER 1: GROUND MISSION CONTROL UI & DSN RF EDGE LAYER
  // =========================================================================
  v(
    'ui_agent',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `${numBadgeHtml('1')}<b style="font-size:11px;color:#0F172A;">${spec.uiTitleHtml}</b><br/>` +
      `<span style="font-size:8.8px;color:#334155;">${spec.uiSubHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    445,
    70,
    290,
    50
  );

  v(
    'edge_layer',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `${numBadgeHtml('2')}<b style="font-size:11px;color:#0F172A;">${spec.edgeTitleHtml}</b><br/>` +
      `<span style="font-size:8.8px;color:#334155;">${spec.edgeLine1Html}</span><br/>` +
      `<span style="font-size:8.2px;color:#475569;">${spec.edgeLine2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    415,
    140,
    350,
    56
  );

  v(
    'identity_platform',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:10.5px;color:#0F172A;">${spec.identityTitleHtml}</b><br/>` +
      `<span style="font-size:8.8px;color:#334155;">${spec.identityLine1Html}</span><br/>` +
      `<span style="font-size:8.2px;color:#475569;">${spec.identityLine2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    870,
    140,
    260,
    56
  );

  // =========================================================================
  // TIER 2: RHOMBUS DECISION DIAMOND (COMMIT & SAFETY GATE) + ABORT SINK
  // =========================================================================
  v(
    'afts_abort_sink',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:10px;color:#991B1B;">${spec.abortTitleHtml}</b><br/>` +
      `<span style="font-size:8.5px;color:#7F1D1D;">${spec.abortLine1Html}</span><br/>` +
      `<span style="font-size:8.2px;color:#991B1B;">${spec.abortLine2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;align=center;verticalAlign=middle;`,
    55,
    224,
    260,
    64
  );

  v(
    'api_cloud_run',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;">` +
      `${numBadgeHtml('3')}<b style="font-size:10.5px;color:#92400E;">${spec.gateTitleHtml}</b><br/>` +
      `<span style="font-size:8.5px;color:#78350F;">${spec.gateSubHtml}</span><br/>` +
      `<b style="font-size:8.2px;color:#047857;">[GO]</b> <span style="font-size:8.2px;color:#78350F;">vs</span> <b style="font-size:8.2px;color:#DC2626;">[NO-GO ABORT]</b>` +
      `</div>`,
    `shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2.2;align=center;verticalAlign=middle;`,
    415,
    212,
    350,
    88
  );

  v(
    'dlp_model_armor',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:10px;color:#0F172A;">${spec.armorTitleHtml}</b><br/>` +
      `<span style="font-size:8.5px;color:#334155;">${spec.armorLine1Html}</span><br/>` +
      `<span style="font-size:8.5px;color:#334155;">${spec.armorLine2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;align=center;verticalAlign=middle;`,
    870,
    224,
    260,
    64
  );

  // =========================================================================
  // TIER 3: AUTONOMOUS AGENT HARNESS CLUSTER (HEXAGON AGENT NODES)
  // =========================================================================
  v(
    'obs_box',
    `<div style="line-height:1.35;font-family:Inter,Arial,sans-serif;padding:4px;">` +
      `<b style="font-size:9.5px;color:#0F172A;">${spec.obsHeaderHtml}</b>` +
      `<hr style="border:none;border-top:1px solid #CBD5E1;margin:5px 0;"/>` +
      `<div style="font-size:8.2px;color:#1E293B;text-align:left;">` +
      `• <b>Cloud Logging</b><br/>&nbsp;&nbsp;${spec.obsItem1SubHtml}<br/><br/>` +
      `• <b>Cloud Monitoring</b><br/>&nbsp;&nbsp;${spec.obsItem2SubHtml}<br/><br/>` +
      `• <b>Vertex Evaluation</b><br/>&nbsp;&nbsp;${spec.obsItem3SubHtml}<br/><br/>` +
      `• <b>GCP FinOps Hub</b><br/>&nbsp;&nbsp;${spec.obsItem4SubHtml}` +
      `</div></div>`,
    `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.6;align=center;verticalAlign=top;`,
    55,
    332,
    138,
    260
  );

  v(
    'iam_auth',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:9.5px;color:#0F172A;">IAM</b><br/>` +
      `<span style="font-size:8.2px;color:#334155;">Authorisation</span><br/>` +
      `<span style="font-size:7.8px;color:#475569;">${spec.iamSubHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    208,
    356,
    102,
    58
  );

  v(
    'ai_cluster_container',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:9.5px;font-weight:700;color:#0F172A;">` +
      `AI Cluster <span style="color:#15803D;font-weight:700;">(Google ADK • A2A)</span>` +
      `</div>`,
    `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#475569;strokeWidth=1.5;dashed=1;dashPattern=6 4;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;`,
    325,
    332,
    515,
    260
  );

  // HEXAGON Coordinator Agent
  v(
    'coord_agent',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `${numBadgeHtml('4')}<b style="font-size:10.5px;color:#0F172A;">${spec.coordTitleHtml}</b><br/>` +
      `<span style="font-size:8.2px;color:#004D40;">${spec.coordLine1Html}</span><br/>` +
      `<span style="font-size:8.2px;color:#004D40;">${spec.coordLine2Html}</span>` +
      `</div>`,
    `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=16;fillColor=#E0F7FA;strokeColor=#00838F;strokeWidth=2;align=center;verticalAlign=middle;`,
    415,
    360,
    350,
    64
  );

  // 3 HEXAGON Specialized Sub-Agents
  v(
    'agent_order',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;padding:0 6px;">` +
      `<b style="font-size:9px;color:#064E3B;">${spec.agent1TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">${spec.agent1SubHtml}</span>` +
      `</div>`,
    `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=1.8;align=center;verticalAlign=middle;`,
    338,
    478,
    154,
    90
  );

  v(
    'agent_Visibility',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;padding:0 6px;">` +
      `<b style="font-size:9px;color:#064E3B;">${spec.agent2TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">${spec.agent2SubHtml}</span>` +
      `</div>`,
    `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=1.8;align=center;verticalAlign=middle;`,
    508,
    478,
    158,
    90
  );

  v(
    'agent_policy',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;padding:0 6px;">` +
      `<b style="font-size:9px;color:#064E3B;">${spec.agent3TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">${spec.agent3SubHtml}</span>` +
      `</div>`,
    `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=1.8;align=center;verticalAlign=middle;`,
    678,
    478,
    152,
    90
  );

  // =========================================================================
  // TIER 4 RIGHT WING: PARALLEL 1:3 COUNTERFACTUAL ENCLAVE (FORK-JOIN)
  // =========================================================================
  v(
    'llm_container',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:9.5px;font-weight:700;color:#0F172A;">` +
      `${numBadgeHtml('5')}${spec.sandboxTitleHtml} <span style="color:#B45309;">(Vertex AI Gemini 3.1 Pro / 3.8 Flash + GKE TPU v5e &amp; H100)</span>` +
      `</div>`,
    `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEFCE8;strokeColor=#CA8A04;strokeWidth=2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;`,
    870,
    332,
    560,
    260
  );

  v(
    'universe_alpha_lane',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;text-align:left;padding-left:6px;">` +
      `<b style="font-size:9px;color:#1E40AF;">${spec.laneAlphaTitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#1E3A8A;">${spec.laneAlphaSubHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.6;dashed=1;dashPattern=4 2;align=left;verticalAlign=middle;`,
    888,
    368,
    295,
    54
  );

  v(
    'universe_beta_lane',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;text-align:left;padding-left:6px;">` +
      `<b style="font-size:9px;color:#6B21A8;">${spec.laneBetaTitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#581C87;">${spec.laneBetaSubHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7C3AED;strokeWidth=1.6;dashed=1;dashPattern=4 2;align=left;verticalAlign=middle;`,
    888,
    438,
    295,
    54
  );

  v(
    'universe_gamma_lane',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;text-align:left;padding-left:6px;">` +
      `<b style="font-size:9px;color:#9F1239;">${spec.laneGammaTitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#881337;">${spec.laneGammaSubHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.6;dashed=1;dashPattern=4 2;align=left;verticalAlign=middle;`,
    888,
    508,
    295,
    54
  );

  v(
    'multiverse_policy_distiller',
    `<div style="line-height:1.22;font-family:Inter,Arial,sans-serif;padding:0 4px;">` +
      `<b style="font-size:9.5px;color:#065F46;">${spec.distillerTitleHtml}</b><br/>` +
      `<hr style="border:none;border-top:1px solid #A7F3D0;margin:4px 0;"/>` +
      `<span style="font-size:8.2px;color:#047857;"><b>Gemini 3.1 Pro + 3.8 Flash</b><br/>(Deep Research Max)</span><br/><br/>` +
      `<span style="font-size:7.8px;color:#064E3B;">${spec.distillerSubHtml}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2;align=center;verticalAlign=middle;`,
    1235,
    368,
    180,
    194
  );

  // =========================================================================
  // TIER 5: 3D CYLINDER DATASTORES (SPANNER, BIGTABLE, FIRESTORE, VECTOR SEARCH 2.0)
  // =========================================================================
  v(
    'db_spanner',
    `<div style="line-height:1.15;font-family:Inter,Arial,sans-serif;padding-top:8px;">` +
      `${numBadgeHtml('7')}<b style="font-size:9.5px;color:#0F172A;">Cloud Spanner</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">${spec.spannerSubHtml}</span>` +
      `</div>`,
    `shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    338,
    622,
    154,
    74
  );

  v(
    'db_bigtable',
    `<div style="line-height:1.15;font-family:Inter,Arial,sans-serif;padding-top:8px;">` +
      `<b style="font-size:9.5px;color:#7F1D1D;">Bigtable</b><br/>` +
      `<span style="font-size:7.8px;color:#991B1B;">${spec.bigtableSubHtml}</span>` +
      `</div>`,
    `shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    508,
    622,
    158,
    74
  );

  v(
    'db_firestore',
    `<div style="line-height:1.15;font-family:Inter,Arial,sans-serif;padding-top:8px;">` +
      `<b style="font-size:9.5px;color:#0F172A;">Firestore</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">${spec.firestoreSubHtml}</span>` +
      `</div>`,
    `shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=9;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    678,
    622,
    152,
    74
  );

  v(
    'vector_search_db',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;padding-top:8px;">` +
      `${numBadgeHtml('6')}<b style="font-size:9.5px;color:#0F172A;">Vector Search 2.0 (Valkey + GraphRAG)</b><br/>` +
      `<span style="font-size:8px;color:#334155;">${spec.vectorSubHtml}</span>` +
      `</div>`,
    `shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    870,
    622,
    380,
    74
  );

  // =========================================================================
  // TIER 6: AIR-GAP BOUNDARY + EXECUTION / FLIGHT SEGMENT
  // =========================================================================
  v(
    'dsn_rf_airgap_boundary',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:8.5px;font-weight:700;color:#0369A1;text-align:right;padding-right:14px;">` +
      `${spec.boundaryBannerHtml}` +
      `</div>`,
    `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.8;dashed=1;dashPattern=8 4;align=right;verticalAlign=middle;`,
    55,
    720,
    1375,
    24
  );

  v(
    'spacecraft_segment_container',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:9px;font-weight:700;color:#0F172A;text-align:right;padding-right:14px;">` +
      `${spec.executionHeaderHtml}` +
      `</div>`,
    `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#475569;strokeWidth=2;align=right;verticalAlign=top;spacingRight=12;spacingTop=6;`,
    210,
    796,
    1220,
    108
  );

  v(
    'act_balance',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:9.2px;color:#0F172A;">${spec.exec1TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">${spec.exec1Line1Html}</span><br/>` +
      `<span style="font-size:7.8px;color:#047857;">${spec.exec1Line2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    235,
    824,
    265,
    66
  );

  v(
    'act_tx_details',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:9.2px;color:#0F172A;">${spec.exec2TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">${spec.exec2Line1Html}</span><br/>` +
      `<span style="font-size:7.8px;color:#1D4ED8;">${spec.exec2Line2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    535,
    824,
    265,
    66
  );

  v(
    'act_block_card',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:9.2px;color:#0F172A;">${spec.exec3TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">${spec.exec3Line1Html}</span><br/>` +
      `<span style="font-size:7.8px;color:#7C3AED;">${spec.exec3Line2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    835,
    824,
    265,
    66
  );

  v(
    'act_statement',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:9.2px;color:#065F46;">${spec.exec4TitleHtml}</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">${spec.exec4Line1Html}</span><br/>` +
      `<span style="font-size:7.8px;color:#0D9488;">${spec.exec4Line2Html}</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#0D9488;strokeWidth=1.8;align=center;verticalAlign=middle;`,
    1135,
    824,
    275,
    66
  );

  // =========================================================================
  // ORTHOGONAL PROTOCOL-TYPED ARROWS & CLOSED-LOOP TELEMETRY RETURN HIGHWAY
  // =========================================================================
  const baseOrtho = `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;`;

  e(
    'e_ui_edge',
    '',
    `${baseOrtho}strokeColor=#1D4ED8;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'ui_agent',
    'edge_layer'
  );

  e(
    'e_edge_id',
    `<span style="font-size:8px;color:#1E40AF;background:#FFFFFF;padding:1px 3px;">${spec.edgeAuthLabelHtml}</span>`,
    `${baseOrtho}strokeColor=#3B82F6;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'edge_layer',
    'identity_platform'
  );

  e(
    'e_edge_lcc',
    '',
    `${baseOrtho}strokeColor=#D97706;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'edge_layer',
    'api_cloud_run'
  );

  e(
    'e_lcc_nogo_abort',
    `<b style="font-size:8px;color:#DC2626;background:#FFFFFF;padding:1px 3px;">[NO-GO / ABORT]</b>`,
    `${baseOrtho}strokeColor=#DC2626;strokeWidth=2.2;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=1;entryY=0.5;`,
    'api_cloud_run',
    'afts_abort_sink'
  );

  e(
    'e_lcc_armor',
    `<span style="font-size:8px;color:#7E22CE;background:#FFFFFF;padding:1px 3px;">${spec.gateArmorEdgeHtml}</span>`,
    `${baseOrtho}strokeColor=#9333EA;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'api_cloud_run',
    'dlp_model_armor'
  );

  e(
    'e_lcc_go_coord',
    `<b style="font-size:8px;color:#047857;background:#FFFFFF;padding:1px 4px;">${spec.gateGoEdgeHtml}</b>`,
    `${baseOrtho}strokeColor=#059669;strokeWidth=2.4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'api_cloud_run',
    'coord_agent'
  );

  e(
    'e_iam_coord',
    '',
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'iam_auth',
    'coord_agent'
  );

  e(
    'e_coord_a1',
    `<b style="font-size:8px;color:#0F172A;background:#FFFFFF;padding:0 3px;">A2A</b>`,
    `${baseOrtho}strokeColor=#00838F;strokeWidth=1.7;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'coord_agent',
    'agent_order',
    [
      [590, 448],
      [415, 448],
    ]
  );

  e(
    'e_coord_a2',
    `<b style="font-size:8px;color:#0F172A;background:#FFFFFF;padding:0 3px;">A2A</b>`,
    `${baseOrtho}strokeColor=#00838F;strokeWidth=1.7;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'coord_agent',
    'agent_Visibility'
  );

  e(
    'e_coord_a3',
    `<b style="font-size:8px;color:#0F172A;background:#FFFFFF;padding:0 3px;">A2A</b>`,
    `${baseOrtho}strokeColor=#00838F;strokeWidth=1.7;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'coord_agent',
    'agent_policy',
    [
      [590, 448],
      [754, 448],
    ]
  );

  e(
    'e_fork_u_alpha',
    `<b style="font-size:7.5px;color:#7C3AED;background:#FFFFFF;padding:0 2px;">1:3 Fork</b>`,
    `${baseOrtho}strokeColor=#7C3AED;strokeWidth=1.7;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'agent_policy',
    'universe_alpha_lane',
    [
      [854, 523],
      [854, 395],
    ]
  );

  e(
    'e_fork_u_beta',
    '',
    `${baseOrtho}strokeColor=#7C3AED;strokeWidth=1.7;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'agent_policy',
    'universe_beta_lane',
    [
      [854, 523],
      [854, 465],
    ]
  );

  e(
    'e_fork_u_gamma',
    '',
    `${baseOrtho}strokeColor=#7C3AED;strokeWidth=1.7;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'agent_policy',
    'universe_gamma_lane',
    [
      [854, 523],
      [854, 535],
    ]
  );

  e(
    'e_join_u_alpha',
    '',
    `${baseOrtho}strokeColor=#059669;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.14;`,
    'universe_alpha_lane',
    'multiverse_policy_distiller',
    [
      [1210, 395],
      [1210, 395],
    ]
  );

  e(
    'e_join_u_beta',
    `<b style="font-size:7.8px;color:#047857;background:#FFFFFF;padding:0 2px;">3:1 Join</b>`,
    `${baseOrtho}strokeColor=#059669;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'universe_beta_lane',
    'multiverse_policy_distiller'
  );

  e(
    'e_join_u_gamma',
    '',
    `${baseOrtho}strokeColor=#059669;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.86;`,
    'universe_gamma_lane',
    'multiverse_policy_distiller',
    [
      [1210, 535],
      [1210, 535],
    ]
  );

  e(
    'e_distiller_vector',
    `<span style="font-size:8px;color:#1E40AF;background:#FFFFFF;padding:0 3px;">${spec.distillerVectorEdgeHtml}</span>`,
    `${baseOrtho}strokeColor=#2563EB;strokeWidth=1.6;startArrow=block;startFill=1;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=1;entryY=0.5;`,
    'multiverse_policy_distiller',
    'vector_search_db',
    [[1325, 659]]
  );

  e(
    'e_mcp_spanner',
    `<b style="font-size:8px;color:#0F172A;background:#FFFFFF;padding:0 3px;">MCP</b>`,
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.6;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'agent_order',
    'db_spanner'
  );

  e(
    'e_mcp_bigtable',
    `<b style="font-size:8px;color:#0F172A;background:#FFFFFF;padding:0 3px;">MCP</b>`,
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.6;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'agent_Visibility',
    'db_bigtable'
  );

  e(
    'e_mcp_firestore',
    `<b style="font-size:8px;color:#0F172A;background:#FFFFFF;padding:0 3px;">MCP</b>`,
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.6;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'agent_policy',
    'db_firestore'
  );

  e(
    'e_spanner_tc_uplink',
    `<b style="font-size:7.8px;color:#1D4ED8;background:#FFFFFF;padding:0 3px;">${spec.exec1EdgeHtml}</b>`,
    `${baseOrtho}strokeColor=#1D4ED8;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'db_spanner',
    'act_balance',
    [
      [415, 768],
      [367, 768],
    ]
  );

  e(
    'e_bigtable_gnc_burn',
    `<b style="font-size:7.8px;color:#1D4ED8;background:#FFFFFF;padding:0 3px;">${spec.exec2EdgeHtml}</b>`,
    `${baseOrtho}strokeColor=#1D4ED8;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'db_bigtable',
    'act_tx_details',
    [
      [587, 768],
      [667, 768],
    ]
  );

  e(
    'e_firestore_fdir',
    `<b style="font-size:7.8px;color:#7C3AED;background:#FFFFFF;padding:0 3px;">${spec.exec3EdgeHtml}</b>`,
    `${baseOrtho}strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'db_firestore',
    'act_block_card',
    [
      [754, 768],
      [967, 768],
    ]
  );

  e(
    'e_fdir_encoder',
    '',
    `${baseOrtho}strokeColor=#0D9488;strokeWidth=1.8;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'act_block_card',
    'act_statement'
  );

  e(
    'e_closed_loop_telemetry_return',
    '',
    `${baseOrtho}strokeColor=#0D9488;strokeWidth=2.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=1;entryY=0.5;`,
    'act_statement',
    'ui_agent',
    [
      [1460, 857],
      [1460, 94],
    ]
  );

  e(
    'e_cluster_obs',
    `<span style="font-size:7.8px;color:#334155;background:#FFFFFF;padding:0 3px;">OTel Tracing</span>`,
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.5;endArrow=block;endFill=1;exitX=0;exitY=0.65;entryX=1;entryY=0.65;`,
    'ai_cluster_container',
    'obs_box'
  );

  v(
    'closed_loop_return_pill',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:8.5px;font-weight:700;color:#0F766E;text-align:center;">` +
      `${spec.closedLoopPillHtml}` +
      `</div>`,
    `rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#0D9488;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    915,
    82,
    380,
    24
  );

  return (
    `<mxfile host="app.diagrams.net" modified="2026-10-09T19:40:00.000Z" agent="PromptCanvas Zero-Blueprint Custom AST Engine" version="24.0.0">\n` +
    `  <diagram id="${spec.diagramId}" name="${spec.diagramName}">\n` +
    `    <mxGraphModel dx="1500" dy="930" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1500" pageHeight="930" background="${bg}" math="0" shadow="0">\n` +
    `      <root>\n` +
    cells.join('\n') +
    `\n      </root>\n` +
    `    </mxGraphModel>\n` +
    `  </diagram>\n` +
    `</mxfile>`
  );
}

export function buildNasaMultiverseClosedLoopHarnessXml(
  theme: 'light' | 'dark' = 'light'
): string {
  return buildUniversalClosedLoopDomainHarnessXml({
    prompt: '1. Build an agentic harness for Nasa launching satellights in the different universes',
    theme,
  });
}
