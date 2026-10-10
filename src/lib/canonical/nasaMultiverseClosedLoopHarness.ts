/**
 * Purpose-Built Zero-Blueprint Synthesis Topology:
 * NASA Closed-Loop Mission Control & Parallel Multi-Universe Counterfactual Digital-Twin Agentic Harness
 *
 * Implements the 4 structural upgrades over a standard vertical cloud stack:
 * 1. FLOW: Closed-Loop 100Hz CCSDS Telemetry Return Highway + Hard GO/NO-GO Branching + 1:3 Parallel Universe Fork-Join
 * 2. SHAPES:
 *    - shape=rhombus (Decision Diamond) for Launch Commit Criteria (LCC) & AFTS Gate
 *    - shape=hexagon for Autonomous Google ADK / A2A Agents
 *    - 3 Stacked Parallel Swimlane Enclaves for Universe α, Universe β, Universe γ
 *    - shape=cylinder3 for Stateful Ephemeris, 100Hz Telemetry & NASA NTRS Vector Stores
 *    - Full-Width Dashed RF Space-Link Air-Gap Boundary Band separating Ground Cloud from Spacecraft Bus
 * 3. COMPONENTS: AFTS Abort Quarantine Sink, Universe α/β/γ Rollout Lanes, Cross-Universe Pareto Policy Distiller,
 *    and Onboard cFS / JPL F' Spacecraft Flight Segment.
 * 4. ARROWS: Color-coded orthogonal protocol connectors (Blue Telecommand Uplink, Emerald GO, Crimson NO-GO Abort,
 *    Purple Dashed 1:3 Fork / 3:1 Join, and Teal Outer Closed-Loop 100Hz Telemetry Return Highway).
 */

function escAttr(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function numBadgeHtml(num: string): string {
  return `<span style="display:inline-block;background:#1A73E8;color:#FFFFFF;border-radius:999px;width:16px;height:16px;line-height:16px;text-align:center;font-size:10px;font-weight:700;margin-right:4px;">${num}</span>`;
}

export function buildNasaMultiverseClosedLoopHarnessXml(
  theme: 'light' | 'dark' = 'light'
): string {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0B111E' : '#FFFFFF';
  const strokeMain = isDark ? '#94A3B8' : '#334155';

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
      `<b style="font-size:12.5px;color:#0F172A;">NASA CLOSED-LOOP MISSION CONTROL &amp; PARALLEL MULTI-UNIVERSE DIGITAL-TWIN AGENTIC HARNESS</b><br/>` +
      `<span style="font-size:9px;color:#475569;">Custom Compositional AST • Rhombus LCC Gate (GO/NO-GO) • Hexagon ADK Agents • 1:3 Counterfactual Universe Fork-Join • 100Hz CCSDS Closed-Loop Telemetry Return</span>` +
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
      `<span style="font-size:7.8px;color:#475569;">CCSDS 133.0-B/732.0-B • DSN 810-005 • cFS/F&#39; • NPR 8715.5</span>` +
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
      `${numBadgeHtml('1')}<b style="font-size:11px;color:#0F172A;">NASA Mission Control UI</b><br/>` +
      `<span style="font-size:8.8px;color:#334155;">(Goddard GMSEC / Flight Director Console / AG-UI)</span>` +
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
      `${numBadgeHtml('2')}<b style="font-size:11px;color:#0F172A;">DSN &amp; NSN RF Edge Layer</b><br/>` +
      `<span style="font-size:8.8px;color:#334155;">(CCSDS 732.0-B AOS, Cloud Armor, Apigee X)</span><br/>` +
      `<span style="font-size:8.2px;color:#475569;">(S/X/Ka-Band TT&amp;C Link, SLE Uplink &amp; Guard)</span>` +
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
      `<b style="font-size:10.5px;color:#0F172A;">Identity Platform</b><br/>` +
      `<span style="font-size:8.8px;color:#334155;">ITAR / FedRAMP High IAM</span><br/>` +
      `<span style="font-size:8.2px;color:#475569;">(NASA PIV/CAC &amp; Zero-Trust OIDC)</span>` +
      `</div>`,
    `rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    870,
    140,
    260,
    56
  );

  // =========================================================================
  // TIER 2: RHOMBUS DECISION DIAMOND (LAUNCH COMMIT LCC & AFTS GATE) + ABORT SINK
  // =========================================================================
  v(
    'afts_abort_sink',
    `<div style="line-height:1.2;font-family:Inter,Arial,sans-serif;">` +
      `<b style="font-size:10px;color:#991B1B;">⛔ AFTS Range Safety Abort Sink</b><br/>` +
      `<span style="font-size:8.5px;color:#7F1D1D;">NPR 8715.5 Autonomous Flight Termination</span><br/>` +
      `<span style="font-size:8.2px;color:#991B1B;">Pad Hold • Safe-Mode Thruster Lockout</span>` +
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
      `${numBadgeHtml('3')}<b style="font-size:10.5px;color:#92400E;">Launch Commit (LCC) Gate</b><br/>` +
      `<span style="font-size:8.5px;color:#78350F;">CCSDS 133.0-B &amp; AFTS Decision Gate</span><br/>` +
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
      `<b style="font-size:10px;color:#0F172A;">Model Armor &amp; Physics Guard</b><br/>` +
      `<span style="font-size:8.5px;color:#334155;">(Range Safety AFTS &amp; Counterfactual</span><br/>` +
      `<span style="font-size:8.5px;color:#334155;">Physics Hallucination Firewall)</span>` +
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
      `<b style="font-size:9.5px;color:#0F172A;">NASA Observability,<br/>AgentOps &amp; FinOps</b>` +
      `<hr style="border:none;border-top:1px solid #CBD5E1;margin:5px 0;"/>` +
      `<div style="font-size:8.2px;color:#1E293B;text-align:left;">` +
      `• <b>Cloud Logging</b><br/>&nbsp;&nbsp;(OTel CCSDS Spans)<br/><br/>` +
      `• <b>Cloud Monitoring</b><br/>&nbsp;&nbsp;(100Hz Link Margin)<br/><br/>` +
      `• <b>Vertex Evaluation</b><br/>&nbsp;&nbsp;(Trajectory Fidelity)<br/><br/>` +
      `• <b>GCP FinOps Hub</b><br/>&nbsp;&nbsp;(TPU v5e Sim Budget)` +
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
      `<span style="font-size:7.8px;color:#475569;">(WIF &amp; ITAR RBAC)</span>` +
      `</div>`,
    `rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.5;align=center;verticalAlign=middle;`,
    208,
    356,
    102,
    58
  );

  // Keep label short & left-aligned so the center vertical arrow at x=590 never touches header text
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
      `${numBadgeHtml('4')}<b style="font-size:10.5px;color:#0F172A;">Flight Director Coordinator</b><br/>` +
      `<span style="font-size:8.2px;color:#004D40;">(Vertex AI Agent Engine / Google ADK /</span><br/>` +
      `<span style="font-size:8.2px;color:#004D40;">LangGraph &amp; CCSDS Mission Ops Hexagon)</span>` +
      `</div>`,
    `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=16;fillColor=#E0F7FA;strokeColor=#00838F;strokeWidth=2;align=center;verticalAlign=middle;`,
    415,
    360,
    350,
    64
  );

  // 3 HEXAGON Specialized Sub-Agents (size=10 + generous width so text sits cleanly inside hexagon walls)
  v(
    'agent_order',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;padding:0 6px;">` +
      `<b style="font-size:9px;color:#064E3B;">GNC &amp; Orbit FDS<br/>Agent</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">(J2000 Ephemeris / ADK)</span>` +
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
      `<b style="font-size:9px;color:#064E3B;">cFS / F&#39; Avionics<br/>&amp; LCC Agent</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">(Range Safety AFTS / ADK)</span>` +
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
      `<b style="font-size:9px;color:#064E3B;">Multiverse Sim<br/>Digital-Twin Agent</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">(1:3 Counterfactual Fork)</span>` +
      `</div>`,
    `shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=1.8;align=center;verticalAlign=middle;`,
    678,
    478,
    152,
    90
  );

  // =========================================================================
  // TIER 4 RIGHT WING: PARALLEL 1:3 COUNTERFACTUAL MULTI-UNIVERSE ENCLAVE (FORK-JOIN)
  // =========================================================================
  v(
    'llm_container',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:9.5px;font-weight:700;color:#0F172A;">` +
      `${numBadgeHtml('5')}Parallel Multi-Universe Digital-Twin Sandbox <span style="color:#B45309;">(Vertex AI Gemini 3.1 Pro / 3.8 Flash + GKE TPU v5e &amp; H100)</span>` +
      `</div>`,
    `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEFCE8;strokeColor=#CA8A04;strokeWidth=2;align=left;verticalAlign=top;spacingLeft=10;spacingTop=6;`,
    870,
    332,
    560,
    260
  );

  // 3 Stacked Parallel Universe Swimlane Cards (1:3 Fork)
  v(
    'universe_alpha_lane',
    `<div style="line-height:1.18;font-family:Inter,Arial,sans-serif;text-align:left;padding-left:6px;">` +
      `<b style="font-size:9px;color:#1E40AF;">🌌 Universe α (Nominal ΛCDM &amp; J2000 Ephemeris)</b><br/>` +
      `<span style="font-size:7.8px;color:#1E3A8A;">Physics Digital-Twin Sims • G = G₀ • Standard LEO/GEO/Deep-Space Orbit</span>` +
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
      `<b style="font-size:9px;color:#6B21A8;">🌌 Universe β (Counterfactual High-Gravity ΔG)</b><br/>` +
      `<span style="font-size:7.8px;color:#581C87;">G = 1.35 G₀ • Relativistic Thrust &amp; Escape-Velocity Monte Carlo Sweep</span>` +
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
      `<b style="font-size:9px;color:#9F1239;">🌌 Universe γ (Extreme Solar-Storm &amp; Drag Regime)</b><br/>` +
      `<span style="font-size:7.8px;color:#881337;">10x Coronal Mass Ejection Flux • Non-Keplerian Attitude Perturbation</span>` +
      `</div>`,
    `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFE4E6;strokeColor=#E11D48;strokeWidth=1.6;dashed=1;dashPattern=4 2;align=left;verticalAlign=middle;`,
    888,
    508,
    295,
    54
  );

  // 3:1 Join Distiller Node
  v(
    'multiverse_policy_distiller',
    `<div style="line-height:1.22;font-family:Inter,Arial,sans-serif;padding:0 4px;">` +
      `<b style="font-size:9.5px;color:#065F46;">Cross-Universe Pareto Policy Distiller</b><br/>` +
      `<hr style="border:none;border-top:1px solid #A7F3D0;margin:4px 0;"/>` +
      `<span style="font-size:8.2px;color:#047857;"><b>Gemini 3.1 Pro + 3.8 Flash</b><br/>(Deep Research Max)</span><br/><br/>` +
      `<span style="font-size:7.8px;color:#064E3B;">3:1 Trajectory Consensus &amp; Optimal Burn Synthesis</span>` +
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
      `<span style="font-size:7.8px;color:#334155;">(J2000 Ephemeris &amp; LCC Graph)</span>` +
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
      `<span style="font-size:7.8px;color:#991B1B;">(100Hz CCSDS Telemetry)</span>` +
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
      `<span style="font-size:7.8px;color:#334155;">(ITAR Flight Rules &amp; FMEA)</span>` +
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
      `<span style="font-size:8px;color:#334155;">(Gemini Embedding 2 • NASA NTRS &amp; cFS Anomaly Corpus)</span>` +
      `</div>`,
    `shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#D6E4FF;strokeColor=#5B8DEF;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    870,
    622,
    380,
    74
  );

  // =========================================================================
  // TIER 6: DSN S/X/Ka-BAND RF SPACE-LINK AIR-GAP BOUNDARY + SPACECRAFT FLIGHT SEGMENT
  // =========================================================================
  v(
    'dsn_rf_airgap_boundary',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:8.5px;font-weight:700;color:#0369A1;text-align:right;padding-right:14px;">` +
      `📡 DSN &amp; NSN S/X/Ka-BAND RF SPACE-LINK AIR-GAP BOUNDARY (CCSDS 133.0-B Uplink ▼ / 732.0-B AOS Downlink ▲)` +
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
      `🛰️ Spacecraft Flight Segment &amp; Avionics Bus <span style="color:#0369A1;">(Onboard NASA Goddard cFS • JPL F Prime [F&#39;] • HIL)</span>` +
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
      `<b style="font-size:9.2px;color:#0F172A;">CCSDS 133.0-B Telecommand Decoder</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">Onboard cFS / JPL F&#39; Command Uplink</span><br/>` +
      `<span style="font-size:7.8px;color:#047857;">Cryptographic TC Frame Verification</span>` +
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
      `<b style="font-size:9.2px;color:#0F172A;">GNC Thruster &amp; Attitude Actuator</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">Launch Commit (LCC) &amp; AFTS Range Gate</span><br/>` +
      `<span style="font-size:7.8px;color:#1D4ED8;">J2000 Orbital Insertion Burn Execution</span>` +
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
      `<b style="font-size:9.2px;color:#0F172A;">FDIR Autonomous Fault Recovery</b><br/>` +
      `<span style="font-size:7.8px;color:#334155;">Multi-Universe Sim Policy Execution</span><br/>` +
      `<span style="font-size:7.8px;color:#7C3AED;">Onboard Anomaly Isolation &amp; Re-Route</span>` +
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
      `<b style="font-size:9.2px;color:#065F46;">DSN S/X/Ka-Band Telemetry Encoder</b><br/>` +
      `<span style="font-size:7.8px;color:#047857;">CCSDS 732.0-B AOS 100Hz Frame Downlink</span><br/>` +
      `<span style="font-size:7.8px;color:#0D9488;">Feeds Outer Closed-Loop Return Bus</span>` +
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

  // 1. UI -> DSN RF Edge Layer (Telecommand Uplink)
  e(
    'e_ui_edge',
    '',
    `${baseOrtho}strokeColor=#1D4ED8;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'ui_agent',
    'edge_layer'
  );

  // 2. DSN RF Edge -> Identity Platform (PIV/CAC Auth)
  e(
    'e_edge_id',
    `<span style="font-size:8px;color:#1E40AF;background:#FFFFFF;padding:1px 3px;">PIV/CAC OIDC</span>`,
    `${baseOrtho}strokeColor=#3B82F6;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'edge_layer',
    'identity_platform'
  );

  // 3. DSN RF Edge -> Launch Commit (LCC) Rhombus Diamond
  e(
    'e_edge_lcc',
    '',
    `${baseOrtho}strokeColor=#D97706;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'edge_layer',
    'api_cloud_run'
  );

  // 4a. LCC Rhombus Diamond -> [NO-GO / ABORT] Left Branch to AFTS Range Safety Abort Sink
  e(
    'e_lcc_nogo_abort',
    `<b style="font-size:8px;color:#DC2626;background:#FFFFFF;padding:1px 3px;">[NO-GO / ABORT]</b>`,
    `${baseOrtho}strokeColor=#DC2626;strokeWidth=2.2;dashed=1;dashPattern=5 3;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=1;entryY=0.5;`,
    'api_cloud_run',
    'afts_abort_sink'
  );

  // 4b. LCC Rhombus Diamond -> Model Armor Physics Guard (Right Inspection)
  e(
    'e_lcc_armor',
    `<span style="font-size:8px;color:#7E22CE;background:#FFFFFF;padding:1px 3px;">AFTS &amp; Physics Check</span>`,
    `${baseOrtho}strokeColor=#9333EA;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'api_cloud_run',
    'dlp_model_armor'
  );

  // 4c. LCC Rhombus Diamond -> [GO: LCC Verified] Downward to Flight Director Coordinator Hexagon
  e(
    'e_lcc_go_coord',
    `<b style="font-size:8px;color:#047857;background:#FFFFFF;padding:1px 4px;">[GO: LCC PASS]</b>`,
    `${baseOrtho}strokeColor=#059669;strokeWidth=2.4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'api_cloud_run',
    'coord_agent'
  );

  // 5. IAM -> Flight Director Coordinator
  e(
    'e_iam_coord',
    '',
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.5;startArrow=block;startFill=1;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'iam_auth',
    'coord_agent'
  );

  // 6. A2A Fan-Out from Flight Director Coordinator Hexagon to 3 Sub-Agent Hexagons
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

  // 7. 1:3 PARALLEL MULTIVERSE FORK (Multiverse Sim Agent -> Universe α, β, γ Lanes)
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

  // 8. 3:1 PARALLEL MULTIVERSE JOIN (Universe α, β, γ -> Cross-Universe Pareto Policy Distiller)
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

  // 9. Distiller -> Vector Search 2.0 Grounding & Memory
  e(
    'e_distiller_vector',
    `<span style="font-size:8px;color:#1E40AF;background:#FFFFFF;padding:0 3px;">NTRS Grounding</span>`,
    `${baseOrtho}strokeColor=#2563EB;strokeWidth=1.6;startArrow=block;startFill=1;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=1;entryY=0.5;`,
    'multiverse_policy_distiller',
    'vector_search_db',
    [[1325, 659]]
  );

  // 10. MCP Links from 3 Sub-Agents to 3 Cylinder Datastores
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

  // 11. Cross-Boundary Telecommand Uplink (Waypoints at y=768 below the RF boundary band so labels sit in open air!)
  e(
    'e_spanner_tc_uplink',
    `<b style="font-size:7.8px;color:#1D4ED8;background:#FFFFFF;padding:0 3px;">CCSDS 133.0-B TC Uplink</b>`,
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
    `<b style="font-size:7.8px;color:#1D4ED8;background:#FFFFFF;padding:0 3px;">LCC Burn Commit</b>`,
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
    `<b style="font-size:7.8px;color:#7C3AED;background:#FFFFFF;padding:0 3px;">Distilled Sim Policy</b>`,
    `${baseOrtho}strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;`,
    'db_firestore',
    'act_block_card',
    [
      [754, 768],
      [967, 768],
    ]
  );

  // Internal Spacecraft Bus Flow -> Telemetry Encoder
  e(
    'e_fdir_encoder',
    '',
    `${baseOrtho}strokeColor=#0D9488;strokeWidth=1.8;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;`,
    'act_block_card',
    'act_statement'
  );

  // 12. OUTER CLOSED-LOOP 100Hz CCSDS 732.0-B TELEMETRY FEEDBACK RETURN HIGHWAY
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

  // 13. OTel AI Tracing & Telemetry to Left Observability Hub
  e(
    'e_cluster_obs',
    `<span style="font-size:7.8px;color:#334155;background:#FFFFFF;padding:0 3px;">OTel Tracing</span>`,
    `${baseOrtho}strokeColor=${strokeMain};strokeWidth=1.5;endArrow=block;endFill=1;exitX=0;exitY=0.65;entryX=1;entryY=0.65;`,
    'ai_cluster_container',
    'obs_box'
  );

  // Render Closed-Loop Return Pill LAST (highest z-index) so its opaque background sits cleanly over the wire
  v(
    'closed_loop_return_pill',
    `<div style="font-family:Inter,Arial,sans-serif;font-size:8.5px;font-weight:700;color:#0F766E;text-align:center;">` +
      `🔄 CLOSED-LOOP 100Hz CCSDS 732.0-B AOS TELEMETRY RETURN HIGHWAY` +
      `</div>`,
    `rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#0D9488;strokeWidth=1.6;align=center;verticalAlign=middle;`,
    915,
    82,
    380,
    24
  );

  return (
    `<mxfile host="app.diagrams.net" modified="2026-10-09T19:40:00.000Z" agent="PromptCanvas Zero-Blueprint Custom AST Engine" version="24.0.0">\n` +
    `  <diagram id="nasa_multiverse_closed_loop_harness" name="NASA Closed-Loop &amp; Multi-Universe Agentic Harness">\n` +
    `    <mxGraphModel dx="1500" dy="930" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1500" pageHeight="930" background="${bg}" math="0" shadow="0">\n` +
    `      <root>\n` +
    cells.join('\n') +
    `\n      </root>\n` +
    `    </mxGraphModel>\n` +
    `  </diagram>\n` +
    `</mxfile>`
  );
}
