import { generateTemplate52ContextHarnessLoopGraphXml } from './template52ContextHarnessLoopGraph';

export interface InfographicBlueprintMeta {
  id: string;
  shortType: string;
  name: string;
  subtitle: string;
  previewImage: string;
  keyComponents: string[];
}

export interface DynamicInfographicItem {
  code: string;
  title: string;
  badge: string;
  description: string;
  secondaryTitle?: string;
  secondaryBadge?: string;
  secondaryDescription?: string;
  bullets?: string[];
  metricOrScore?: string;
}

export interface DynamicInfographicSpec {
  blueprintId: string;
  title: string;
  subtitle: string;
  leftHeader?: string;
  rightHeader?: string;
  takeaway: string;
  footerText?: string;
  items: DynamicInfographicItem[];
}

export const INFOGRAPHIC_BLUEPRINTS_LIST: InfographicBlueprintMeta[] = [
  {
    id: '52',
    shortType: 'Anatomy / Deconstruction',
    name: 'Infographic: Anatomy / Deconstruction (Context + Harness + Loop + Graph)',
    subtitle: 'Four parts of your AI setup: Context, Harness, Loop, and Graph with actionable prompts.',
    previewImage: '/templates/52.png',
    keyComponents: ['01 Context (Loaded Context & Model)', '02 Harness (CLAUDE.md, Skills & Tools)', '03 Loop (Check, Fix & Recheck Cycle)', '04 Graph (File Relationship Mesh & MAP.md)']
  },
  {
    id: '53',
    shortType: 'Process Workflow Diagram',
    name: 'Infographic: Process Workflow Diagram (Claude Code + Codex)',
    subtitle: 'Install the apps, add your tools (Files+Skills / MCP / Computer Use), then check & approve the result.',
    previewImage: '/templates/53.png',
    keyComponents: ['01 Install + Start (Codex leads, Claude Code advises)', '02 Add Your Tools (Decision Branching)', '03 Check It (Validation & Recheck Loop)']
  },
  {
    id: '54',
    shortType: 'Cheat Sheet Quick-Start Card',
    name: 'Infographic: Cheat Sheet Quick-Start Card (GPT-6 Astra Computer Use)',
    subtitle: '7-step setup checklist on the left + 4 ready-to-copy job prompts on the right.',
    previewImage: '/templates/54.png',
    keyComponents: ['Start Using It (Steps 01–07)', 'Try This Prompt Template', 'Four Jobs to Start With (Accounts, Sales, Research, Design)']
  },
  {
    id: '55',
    shortType: 'Bubble Conceptual',
    name: 'Infographic: Bubble Conceptual (The AI Nobody Signed Off)',
    subtitle: 'Contrasting What Leadership Thinks (4 statements) vs What Is Actually Running (16+ shadow AI bubbles).',
    previewImage: '/templates/55.png',
    keyComponents: ['What Leadership Thinks (Executive Persona & 3 Assumptions)', 'What Is Actually Running (16 Color-Coded Shadow AI Bubbles)']
  },
  {
    id: '56',
    shortType: 'Side-by-Side Comparison',
    name: 'Infographic: Side-by-Side Comparison (Raw Gemini API vs. Vertex AI Agent Engine)',
    subtitle: '5-tier head-to-head comparison with OFF/ON state toggles across State, Security, Grounding, Governance, and Ecosystem.',
    previewImage: '/templates/56.png',
    keyComponents: ['01 State Persistence (Stateless vs Persistent)', '02 Security & Sandboxing (Local vs VPC GKE)', '03 Information Grounding (Manual vs Native RAG)', '04 Governance & Control (Custom vs Managed)', '05 Integration Ecosystem (Fragmented vs First-Party)']
  },
  {
    id: '57',
    shortType: 'Funnel Chart',
    name: 'Infographic: Funnel Chart (Context Compression & Token Refinement)',
    subtitle: '5-stage tapering funnel from 1M Raw Ingestion tokens down to 2k Gemini In-Context Window tokens with drop-off badges.',
    previewImage: '/templates/57.png',
    keyComponents: ['01 Raw Ingestion (1M Tokens)', '02 Metadata Filter (250k Tokens • 75% Discarded)', '03 BigQuery Vector Search (50k Tokens • 80% Discarded)', '04 Cross-Encoder Re-Ranking (10k Tokens)', '05 Gemini In-Context Window (2k Tokens • 0.2% Remaining)']
  },
  {
    id: '58',
    shortType: 'Process Checklist',
    name: 'Infographic: Process Checklist (Autonomous Agent Deployment)',
    subtitle: '6-step numbered deployment checklist with status pills, technical config tags, and ON toggle switches.',
    previewImage: '/templates/58.png',
    keyComponents: ['01 Define Mission & Scope (DEFINED)', '02 Configure API Gateway & Ingress (CONNECTED)', '03 Establish Sandboxed GKE Cluster (ISOLATED)', '04 Enable Memory & Persistent State (PERSISTENT)', '05 Integrate HIL Validation Loop (GATEWAY)', '06 Deploy to Vertex AI Run (DEPLOYED)']
  },
  {
    id: '59',
    shortType: 'Timeline & Roadmap',
    name: 'Infographic: Timeline & Roadmap (Phased Quarterly Blueprint Q1–Q4)',
    subtitle: '4 horizontal quarterly phase tracks (Q1 Discovery, Q2 Secure Prototyping, Q3 State & Grounding, Q4 Governance & Prod).',
    previewImage: '/templates/59.png',
    keyComponents: ['Phase 1 (Q1): Discovery & Evaluation (01–02)', 'Phase 2 (Q2): Secure Prototyping (03–04)', 'Phase 3 (Q3): State & Grounding (05–06)', 'Phase 4 (Q4): Governance & Deployment (07–08)']
  },
  {
    id: '60',
    shortType: 'Architecture & Topology',
    name: 'Infographic: Architecture & Topology (Enterprise Agent Runtimes)',
    subtitle: '4-node interconnected runtime topology linking Cloud Run Orchestrator, Vertex AI Reasoning Engine, AlloyDB pgvector, and GKE gVisor Sandbox.',
    previewImage: '/templates/60.png',
    keyComponents: ['01 Vertex AI Reasoning Engine (Gemini 1.5 Pro)', '02 Cloud Run Agent Orchestrator (POST /v1/agent/run)', '03 GKE gVisor Sandbox Cluster (Isolated Pods)', '04 AlloyDB Database (PostgreSQL + pgvector)']
  },
  {
    id: '61',
    shortType: 'Hierarchical Tree',
    name: 'Infographic: Hierarchical Tree (Multi-Agent Supervisor Delegation)',
    subtitle: '3-tier delegation tree: 01 Supervisor Agent -> 02a SQL Data, 02b Web Researcher, 02c Code Synthesis -> 03 Unified Resource Layer.',
    previewImage: '/templates/61.png',
    keyComponents: ['01 Supervision Zone (Supervisor Agent)', '02 Specialized Worker Zone (02a SQL, 02b Web, 02c Code)', '03 Unified Resource & Environment Layer (DB, gVisor, RAG)']
  },
  {
    id: '62',
    shortType: '2x2 Quadrant Matrix',
    name: 'Infographic: 2x2 Quadrant Matrix (Business Impact vs Technical Complexity)',
    subtitle: '4-quadrant prioritization grid: 01 Quick Wins, 02 Strategic Bets, 03 Low Priority, 04 High Risk Traps.',
    previewImage: '/templates/62.png',
    keyComponents: ['01 Quick Wins (High Impact / Low Complexity)', '02 Strategic Bets (High Impact / High Complexity)', '03 Low Priority (Low Impact / Low Complexity)', '04 High Risk Traps (Low Impact / High Complexity)']
  },
  {
    id: '63',
    shortType: 'Decision Tree',
    name: 'Infographic: Decision Tree (Conditional Branching Logic)',
    subtitle: '3-stage conditional decision tree across 01 Ingest, 02 Tool Check, and 03 Execute with YES/NO pill branches and self-correction loop.',
    previewImage: '/templates/63.png',
    keyComponents: ['01 Ingest (Receive Input & Objective Check)', '02 Tool Check (External Tools & Permission Gates)', '03 Execute (Validation Gate, Self-Correction Loop & Final Delivery)']
  },
  {
    id: '64',
    shortType: 'Feature Matrix Grid',
    name: 'Infographic: Feature Matrix Grid (Multi-Criteria Evaluation & Scoring)',
    subtitle: '5x4 architectural comparison matrix across Framework Alpha, Beta, Gamma, and Delta with capability badges and overall fit scores.',
    previewImage: '/templates/64.png',
    keyComponents: ['Architectural Criteria Rows (Persistence, Isolation, HITL, Memory, Scale)', 'Framework Alpha (4.2/5)', 'Framework Beta (3.8/5)', 'Framework Gamma (4.8/5)', 'Framework Delta (2.2/5)']
  },
  {
    id: '65',
    shortType: 'Capability Pyramid',
    name: 'Infographic: Capability Pyramid (AI Capability Evolution)',
    subtitle: '4-tier ascending capability pyramid from 01 Base Gemini (Raw Inference) up to 04 Autonomous Agents (Goal-Driven) with side callout cards.',
    previewImage: '/templates/65.png',
    keyComponents: ['04 Autonomous Agents (Goal-Driven Apex)', '03 Multi-Agent Collaboration (Cooperative)', '02 Tool Calling & Workflows (Interactive)', '01 Base Gemini (Raw Inference Foundation)']
  },
  {
    id: '66',
    shortType: 'Loop & Cycle',
    name: 'Infographic: Loop & Cycle (Autonomous Self-Healing Agent Loop)',
    subtitle: 'Circular 4-stage autonomous agent loop (01 Model Generation -> 02 Sandboxed Test -> 03 Evaluation Gate -> 04 Self-Healing Loop + Exit to Deploy).',
    previewImage: '/templates/66.png',
    keyComponents: ['01 Model Generation (Gemini Candidate)', '02 Sandboxed Test (GKE/gVisor)', '03 Evaluation Gate (PASS -> Deploy / FAIL -> Retry)', '04 Self-Healing Loop (Retry Feedback Path)', 'Continuous Safeguards & Key Artifacts']
  }
];

function esc(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getLevelTechSpec(level: 'L1' | 'L2' | 'L3' | 'L4', idx: number): string {
  const specs = {
    L1: [
      'Executive KPI: Business Value & Stakeholder Alignment',
      'Strategic Governance: Board-Level Risk & Policy Sign-Off',
      'Core Outcome: Cycle-Time Compression & 3.4x Target ROI',
      'Delivery Milestone: Executive SLA 99.9% & Adoption Readiness',
      'Portfolio Impact: Cross-Functional Operating Efficiency',
      'Executive Summary: Zero Low-Level Infrastructure Noise',
    ],
    L2: [
      'Logical Flow: Request Normalization → Schema & Policy Gate',
      'Decision Gate: RBAC Auth + Safety Guardrail → Retry Loop',
      'Orchestration: Deterministic State Machine & Context Store',
      'State Contract: Transactional Commit + Domain Event Bus',
      'Exception Path: Quarantine Queue + Exponential Backoff (Max 3)',
      'Audit Trail: Immutable Compliance & Decision Ledger',
    ],
    L3: [
      'API & Auth: Apigee X • gRPC/HTTP2 TLS 1.3 • OAuth2/OIDC JWT • 10k RPS',
      'Guardrail & Schema: Cloud DLP PII Redaction • OPA Rego • Protobuf v3',
      'Compute & L1 Cache: GKE Autopilot (HPA 3..50) • Memorystore Redis p99 <1.2ms',
      'Persistence & CDC: Cloud Spanner Serializable ACID • Pub/Sub Avro CDC',
      'Recovery & DLQ: Pub/Sub Dead-Letter Topic • Cloud Run Jittered Replay',
      'Observability: OpenTelemetry W3C TraceContext • Cloud Trace p99 <45ms',
    ],
    L4: [
      'Global Edge: Anycast ALB (34.102.0.0/16) • Cloud Armor WAF OWASP CRS 3.3',
      'Primary Region: us-central1 (VPC 10.100.0.0/16) • VPC-SC • gVisor + Istio mTLS',
      'Failover Region: us-east4 (Standby 10.101.0.0/16) • <3s Auto-Failover • RTO <5m',
      'Quorum Storage: Spanner nam3 Multi-Region Leader/Witness • 99.999% SLA • RPO=0',
      'Crypto & KMS: Cloud KMS Hardware HSM (FIPS 140-3 L3) • 30-Day CMEK Rotation',
      'SecOps & SRE: Chronicle SIEM + PagerDuty Burn-Rate Alert • SOC2/ISO27001',
    ],
  }[level];
  return specs[idx % specs.length];
}

function buildInfographicLevelDetailStrip(level: 'L1' | 'L2' | 'L3' | 'L4', yOffset = 838): string {
  const stripConfigs: Record<
    'L1' | 'L2' | 'L3' | 'L4',
    { header: string; fill: string; stroke: string; badgeBg: string; nodes: { badge: string; title: string; desc: string }[] }
  > = {
    L1: {
      header: 'L1 CONCEPTUAL EXECUTIVE SUMMARY • HIGH-LEVEL VALUE STREAM & BUSINESS KPIs (2 CORE PILLARS)',
      fill: '#EFF6FF',
      stroke: '#93C5FD',
      badgeBg: '#1D4ED8',
      nodes: [
        {
          badge: 'L1 • BUSINESS OUTCOME',
          title: 'Executive Value & ROI Alignment',
          desc: 'High-level conceptual view focused on 3.4x ROI, -65% cycle time, and stakeholder outcomes.',
        },
        {
          badge: 'L1 • STRATEGIC GOVERNANCE',
          title: 'Enterprise Policy & Continuity SLA',
          desc: '99.9% business continuity SLA with zero low-level protocol or infrastructure clutter.',
        },
      ],
    },
    L2: {
      header: 'L2 LOGICAL ARCHITECTURE • SWIMLANES, DECISION GATES & CLOSED-LOOP RETRY CONTRACTS (3 LOGICAL PILLARS)',
      fill: '#F0FDF4',
      stroke: '#86EFAC',
      badgeBg: '#15803D',
      nodes: [
        {
          badge: 'L2 • LOGICAL INGRESS & AUTH',
          title: 'Payload Normalization & Policy Gate',
          desc: 'Validates RBAC permissions, business rules, and safety guardrails before workflow execution.',
        },
        {
          badge: 'L2 • STATE ORCHESTRATION',
          title: 'Deterministic Workflow & Event Bus',
          desc: 'Executes core logical state transitions and emits domain events upon SLA verification.',
        },
        {
          badge: 'L2 • EXCEPTION & RETRY LOOP',
          title: 'Quarantine Handler & Audit Ledger',
          desc: 'Routes rejected or timed-out requests to exponential backoff retry (max 3) and audit log.',
        },
      ],
    },
    L3: {
      header: 'L3 TECHNICAL IMPLEMENTATION • PROTOCOLS, REDIS L1 CACHE, SPANNER ACID & PUB/SUB CDC (4 TECHNICAL TIERS)',
      fill: '#FEFCE8',
      stroke: '#FDE047',
      badgeBg: '#B45309',
      nodes: [
        {
          badge: 'L3 • API GATEWAY & DLP',
          title: 'Apigee X (gRPC/TLS 1.3) + Cloud DLP',
          desc: 'OAuth2/OIDC JWT validation, 10k RPS quota, OPA Rego policy, and Protobuf v3 schema check.',
        },
        {
          badge: 'L3 • COMPUTE & L1 CACHE',
          title: 'GKE Autopilot + Memorystore Redis 7.2',
          desc: 'HPA 3..50 pods with sub-millisecond Redis read-through cache (TTL 300s, p99 <1.2ms).',
        },
        {
          badge: 'L3 • ACID DB & EVENT MESH',
          title: 'Cloud Spanner + Pub/Sub CDC Stream',
          desc: 'Serializable ACID transactions with exactly-once Avro/Protobuf change-data-capture fanout.',
        },
        {
          badge: 'L3 • DLQ REPLAY & OTEL',
          title: 'Cloud Run Replay + OpenTelemetry',
          desc: 'Dead-letter topic quarantine, jittered 1s→32s replay worker, and W3C TraceContext spans.',
        },
      ],
    },
    L4: {
      header: 'L4 PRODUCTION MULTI-REGION HA • ACTIVE-ACTIVE us-central1 ⇄ us-east4, VPC-SC, KMS HSM & SRE (5 PROD STRATA)',
      fill: '#FAF5FF',
      stroke: '#D8B4FE',
      badgeBg: '#6D28D9',
      nodes: [
        {
          badge: 'L4 • GLOBAL ANYCAST EDGE',
          title: 'Anycast ALB (34.102.0.0/16) + WAF',
          desc: 'Cloud Armor Enterprise OWASP CRS 3.3, L7 DDoS protection, and BeyondCorp mTLS IAP.',
        },
        {
          badge: 'L4 • PRIMARY (us-central1)',
          title: 'Active VPC 10.100.0.0/16 • Istio mTLS',
          desc: 'GKE Autopilot gVisor sandbox pods + Vertex AI PSC (10.100.64.0/24) inside VPC-SC perimeter.',
        },
        {
          badge: 'L4 • FAILOVER (us-east4)',
          title: 'Standby VPC 10.101.0.0/16 • <3s Shift',
          desc: '1s global health probes trigger automatic BGP/Anycast drain to warm standby pool (RTO <5m).',
        },
        {
          badge: 'L4 • QUORUM & KMS HSM',
          title: 'Spanner nam3 (RPO=0) + FIPS 140-3',
          desc: 'TrueTime Paxos multi-region quorum (99.999% SLA) encrypted with 30-day KMS HSM CMEK.',
        },
        {
          badge: 'L4 • SECOPS & SRE SLOs',
          title: 'Chronicle SIEM + PagerDuty Burn Alert',
          desc: 'Real-time SOC2/ISO27001 audit telemetry, DLQ circuit breaker, and p99 <42ms SLO gate.',
        },
      ],
    },
  };

  const cfg = stripConfigs[level] || stripConfigs.L2;
  const count = cfg.nodes.length;
  const totalW = 1320;
  const gap = 16;
  const cardW = Math.floor((totalW - (count - 1) * gap) / count);
  let xml = `<mxCell id="lvl_strip_zone_${level}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cfg.fill};strokeColor=${cfg.stroke};strokeWidth=2;dashed=1;" vertex="1" parent="1"><mxGeometry x="60" y="${yOffset}" width="${totalW}" height="148" as="geometry"/></mxCell>`;
  xml += `<mxCell id="lvl_strip_hdr_${level}" value="${esc(cfg.header)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cfg.badgeBg};strokeColor=${cfg.badgeBg};fontColor=#FFFFFF;fontStyle=1;fontSize=10.5;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="76" y="${yOffset + 10}" width="${totalW - 32}" height="26" as="geometry"/></mxCell>`;

  cfg.nodes.forEach((n, idx) => {
    const x = 76 + idx * (cardW - Math.ceil(32 / count) + gap);
    const w = cardW - Math.ceil(32 / count);
    xml += `<mxCell id="lvl_strip_node_${level}_${idx}" value="&lt;div style='padding:6px 8px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:8.5px;font-weight:900;color:${cfg.badgeBg};'&gt;${esc(n.badge)}&lt;/div&gt;&lt;div style='font-size:11px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${esc(n.title)}&lt;/div&gt;&lt;div style='font-size:9.5px;color:#334155;margin-top:3px;line-height:1.35;'&gt;${esc(n.desc)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${cfg.stroke};strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${x}" y="${yOffset + 44}" width="${w}" height="94" as="geometry"/></mxCell>`;
  });

  return xml;
}

export function generateInfographicBlueprintXmlById(
  id: string,
  customTitle?: string,
  spec?: DynamicInfographicSpec,
  level: 'L1' | 'L2' | 'L3' | 'L4' = 'L2'
): string {
  const cleanCustomTitle =
    customTitle &&
    !customTitle.includes('Global Real-Time Payments Mesh') &&
    customTitle.trim() !== ''
      ? customTitle.trim()
      : undefined;

  const levelBadgeMap: Record<'L1' | 'L2' | 'L3' | 'L4', string> = {
    L1: 'L1 • CONCEPTUAL EXECUTIVE VIEW',
    L2: 'L2 • LOGICAL ARCHITECTURE VIEW',
    L3: 'L3 • TECHNICAL IMPLEMENTATION VIEW',
    L4: 'L4 • PRODUCTION DEPLOYMENT VIEW',
  };
  const activeLevelLabel = levelBadgeMap[level] || levelBadgeMap.L2;

  const meta = INFOGRAPHIC_BLUEPRINTS_LIST.find((m) => m.id === id) || INFOGRAPHIC_BLUEPRINTS_LIST[0];
  const title = esc(spec?.title ? `${spec.title} [${level}]` : cleanCustomTitle ? `${cleanCustomTitle} [${level}]` : `${meta.name.replace(/^Infographic:\s*/i, '')} [${level}]`);
  const subtitle = esc(spec?.subtitle || `${meta.subtitle} (${activeLevelLabel})`);
  const takeaway = esc(
    spec?.takeaway ||
      `KEY TAKEAWAY (${activeLevelLabel}): Structured ${meta.shortType} blueprint with ${level} technical depth engineered for live Draw.io customization.`
  );
  const items = spec?.items && spec.items.length > 0 ? spec.items : null;
  const levelStripXml = buildInfographicLevelDetailStrip(level, 836);

  const gcpLogoBadge = `&lt;span style='display:inline-block;background:#EFF6FF;border:1px solid #BFDBFE;color:#1D4ED8;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:800;margin-right:6px;'&gt;☁ Google Cloud • Vertex AI • Gemini 2.5&lt;/span&gt;`;

  // 1. #52: ANATOMY / DECONSTRUCTION (Exact 1:1 Vector Twin of 52.png + L1-L4 Level Strip)
  if (id === '52' && !items) {
    const base52 = generateTemplate52ContextHarnessLoopGraphXml(
      cleanCustomTitle ? `${cleanCustomTitle} [${level}]` : `Context • Harness • Loop • Graph [${level} • Google Cloud & Gemini Edition]`
    );
    return base52.replace('</root>', `${buildInfographicLevelDetailStrip(level, 965)}</root>`);
  }

  // 2. #53: WORKFLOW INFOGRAPHIC (3-Zone Claude Code + Codex Hybrid Workflow matching 53.png)
  if (id === '53') {
    const z1 = items?.[0] || { code: '01', title: 'ZONE 1: WRITE & BUILD (Claude Code + Gemini CLI)', badge: 'BUILDER ENGINE', description: 'Fast interactive scaffolding, multi-file edits, and repo-wide context navigation.' };
    const z2 = items?.[1] || { code: '02', title: 'ZONE 2: SHARED REPO HANDOFF (.claude/ + Git Branch)', badge: 'ARTIFACT BRIDGE', description: 'Clean git worktree state, CLAUDE.md rules, and deterministic test harness handoff.' };
    const z3 = items?.[2] || { code: '03', title: 'ZONE 3: ADVERSARIAL REVIEW & VERIFY (Codex + Vertex Eval)', badge: 'AUDITOR GATE', description: 'Deep static/reasoning audit, edge-case bug hunting, and security regression check.' };
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_53_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #53 • WORKFLOW COMPARISON • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:3px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      <mxCell id="z1" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;div style='background:#EA580C;color:#FFF;display:inline-block;padding:3px 10px;border-radius:999px;font-size:10.5px;font-weight:800;'&gt;${esc(z1.code || '01')} • ${esc(z1.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z1.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z1.description)}&lt;/div&gt;${getLevelTechSpec(level, 0)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="55" y="125" width="405" height="390" as="geometry"/></mxCell>
      <mxCell id="z1_s1" value="1. Read CLAUDE.md + Repo Map (${level})" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F97316;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="80" y="290" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z1_s2" value="2. Scaffold Feature &amp; Multi-File Patch" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F97316;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="80" y="348" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z1_s3" value="3. Run Local Unit &amp; Type Checks (tsc)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F97316;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="80" y="406" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z1_cmd" value="$ claude &quot;Implement feature &amp; run tests&quot;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FDBA74;fontFamily=monospace;fontStyle=1;fontSize=11;" vertex="1" parent="1"><mxGeometry x="80" y="460" width="355" height="36" as="geometry"/></mxCell>

      <mxCell id="z2" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;div style='background:#2563EB;color:#FFF;display:inline-block;padding:3px 10px;border-radius:999px;font-size:10.5px;font-weight:800;'&gt;${esc(z2.code || '02')} • ${esc(z2.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z2.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z2.description)}&lt;/div&gt;${getLevelTechSpec(level, 1)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="518" y="125" width="405" height="390" as="geometry"/></mxCell>
      <mxCell id="z2_s1" value="Git Diff + Staged Worktree Snapshot" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="543" y="290" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z2_s2" value="Shared Rules: CLAUDE.md + AGENTS.md" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="543" y="348" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z2_s3" value="Cloud Build / Artifact Registry Sync" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="543" y="406" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z2_cmd" value="git diff origin/main...HEAD &gt; review.patch" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#93C5FD;fontFamily=monospace;fontStyle=1;fontSize=11;" vertex="1" parent="1"><mxGeometry x="543" y="460" width="355" height="36" as="geometry"/></mxCell>

      <mxCell id="z3" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;div style='background:#059669;color:#FFF;display:inline-block;padding:3px 10px;border-radius:999px;font-size:10.5px;font-weight:800;'&gt;${esc(z3.code || '03')} • ${esc(z3.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z3.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z3.description)}&lt;/div&gt;${getLevelTechSpec(level, 2)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="980" y="125" width="405" height="390" as="geometry"/></mxCell>
      <mxCell id="z3_s1" value="1. Adversarial Logic &amp; Race-Condition Audit" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="1005" y="290" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z3_s2" value="2. Security Boundary &amp; IAM Policy Check" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="1005" y="348" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z3_s3" value="3. Approve PR or Return Fix List to Zone 1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="1005" y="406" width="355" height="44" as="geometry"/></mxCell>
      <mxCell id="z3_cmd" value="$ codex review --base main --strict" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#6EE7B7;fontFamily=monospace;fontStyle=1;fontSize=11;" vertex="1" parent="1"><mxGeometry x="1005" y="460" width="355" height="36" as="geometry"/></mxCell>

      <mxCell id="e53_1" value="1. Push Diff" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="z1" target="z2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_2" value="2. Audit Patch" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="z2" target="z3"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="loop_bar" value="&lt;div style='padding:10px 18px;text-align:center;'&gt;&lt;b style='color:#DC2626;font-size:13px;'&gt;↺ ADVERSARIAL SELF-CORRECTION LOOP (${level}):&lt;/b&gt; &lt;span style='font-size:12.5px;color:#0F172A;font-weight:600;'&gt;Codex / Vertex AI Eval flags subtle edge-case bugs ➔ feeds structured fix list back into Claude Code ➔ re-verifies until 0 P1/P2 defects remain.&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=2;dashed=1;" vertex="1" parent="1"><mxGeometry x="55" y="540" width="1330" height="52" as="geometry"/></mxCell>

      <mxCell id=" c1" value="&lt;b style='color:#EA580C;'&gt;WHY CLAUDE CODE + GEMINI BUILD:&lt;/b&gt;&lt;br/&gt;• Fast repo-wide file edits &amp; terminal loop&lt;br/&gt;• Great UX &amp; rapid feature velocity" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;align=left;spacingLeft=14;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="612" width="420" height="90" as="geometry"/></mxCell>
      <mxCell id="c2" value="&lt;b style='color:#2563EB;'&gt;WHY SEPARATE BUILDER VS AUDITOR:&lt;/b&gt;&lt;br/&gt;• Eliminates single-model blind spots&lt;br/&gt;• Enforces deterministic CI/CD quality gates" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;align=left;spacingLeft=14;fontSize=12;" vertex="1" parent="1"><mxGeometry x="510" y="612" width="420" height="90" as="geometry"/></mxCell>
      <mxCell id="c3" value="&lt;b style='color:#059669;'&gt;WHY CODEX + VERTEX EVAL REVIEW:&lt;/b&gt;&lt;br/&gt;• Deep multi-step code path verification&lt;br/&gt;• Catches race conditions &amp; missing guards" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;align=left;spacingLeft=14;fontSize=12;" vertex="1" parent="1"><mxGeometry x="965" y="612" width="420" height="90" as="geometry"/></mxCell>

      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12.5;" vertex="1" parent="1"><mxGeometry x="55" y="722" width="1330" height="46" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 3. #54: EXECUTIVE CHEAT SHEET (2-Column 6-Panel Feature & Toggle Cheat Sheet matching 54.png)
  if (id === '54') {
    const cards = items?.slice(0, 6) || [
      { code: '01', title: 'Reasoning Engine & Thinking Budget', badge: 'CORE ENGINE', description: 'Dynamic test-time compute scaling with configurable thinking token budgets for math, code, and planning.', metricOrScore: 'THINKING: ON' },
      { code: '02', title: 'Native Computer Use & GUI Action Loop', badge: 'DESKTOP / BROWSER', description: 'Direct screen pixel grounding, DOM inspection, cursor click/type synthesis, and terminal command execution.', metricOrScore: 'GUI LOOP: ON' },
      { code: '03', title: '2M+ Context Window & Repo Memory', badge: 'DEEP CONTEXT', description: 'Ingests full monorepos, multi-hour video/audio streams, and 1,500-page architecture PDFs in a single pass.', metricOrScore: '2M CTX: ON' },
      { code: '04', title: 'Parallel MCP Tool & API Orchestration', badge: 'TOOL CALLING', description: 'Executes parallel function calls across BigQuery, AlloyDB, GitHub, and sandboxed GKE code runners.', metricOrScore: 'MCP: ACTIVE' },
      { code: '05', title: 'VPC-SC Guardrails & IAM Policy Gate', badge: 'ZERO-TRUST', description: 'Enforces Google Cloud IAM, CMEK encryption, PII redaction, and Human-in-the-Loop approval checkpoints.', metricOrScore: 'VPC-SC: ON' },
      { code: '06', title: 'Latency vs Cost Routing Tier', badge: 'FINOPS ROUTER', description: 'Routes fast sub-second tasks to Flash/Lite and deep multi-step architecture synthesis to Pro/Ultra.', metricOrScore: 'AUTO-ROUTE: ON' }
    ];
    let cardsXml = '';
    const strokes = ['#2563EB', '#059669', '#D97706', '#7C3AED', '#DC2626', '#0891B2'];
    const fills = ['#EFF6FF', '#ECFDF5', '#FFFBEB', '#FAF5FF', '#FEF2F2', '#ECFEFF'];
    cards.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 55 + col * 675;
      const y = 120 + row * 192;
      const st = strokes[i % strokes.length];
      const fl = fills[i % fills.length];
      cardsXml += `
        <mxCell id="cs54_${i}" value="&lt;div style='padding:12px 16px;text-align:left;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='background:${st};color:#FFF;padding:2px 10px;border-radius:999px;font-size:10.5px;font-weight:800;'&gt;${esc(c.code || `0${i + 1}`)} • ${esc(c.badge)} [${level}]&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;● ${esc(c.metricOrScore || 'ENABLED')}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(c.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:5px;line-height:1.45;'&gt;${esc(c.description)}&lt;/div&gt;${getLevelTechSpec(level, i)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${fl};strokeColor=${st};strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="655" height="174" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_54_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #54 • EXECUTIVE CHEAT SHEET • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:3px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      ${cardsXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12.5;" vertex="1" parent="1"><mxGeometry x="55" y="715" width="1330" height="46" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 4. #55: BUBBLE CONCEPTUAL (Left Executive Assumptions vs Right 12 Color-Coded Shadow AI / Agent Bubbles)
  if (id === '55') {
    const leftAssumptions = items?.slice(0, 4) || [
      { code: '01', title: '"We blocked ChatGPT at the firewall"', badge: 'ASSUMPTION 1', description: 'Leadership assumes network blocks stop unapproved AI usage across departments.' },
      { code: '02', title: '"Only IT runs approved pilots"', badge: 'ASSUMPTION 2', description: 'Leadership believes AI adoption waits for formal security & architecture sign-off.' },
      { code: '03', title: '"No corporate data leaves our VPC"', badge: 'ASSUMPTION 3', description: 'Leadership assumes spreadsheets, PDFs, and code stay strictly on-prem.' },
      { code: '04', title: '"Our AI governance policy is enough"', badge: 'ASSUMPTION 4', description: 'Static PDF policies without runtime guardrails or sanctioned Vertex AI sandboxes.' }
    ];
    const bubbles = [
      { label: 'Sales CRM&lt;br/&gt;Chrome Ext', x: 590, y: 185, w: 155, h: 105, fill: '#FEE2E2', stroke: '#DC2626' },
      { label: 'Shadow&lt;br/&gt;Coding Bot', x: 775, y: 170, w: 165, h: 115, fill: '#FEF3C7', stroke: '#D97706' },
      { label: 'Finance CSV&lt;br/&gt;Summarizer', x: 970, y: 185, w: 160, h: 105, fill: '#DBEAFE', stroke: '#2563EB' },
      { label: 'Personal&lt;br/&gt;API Keys', x: 1160, y: 175, w: 155, h: 110, fill: '#F3E8FF', stroke: '#9333EA' },
      { label: 'Meeting&lt;br/&gt;Note Taker', x: 575, y: 330, w: 165, h: 110, fill: '#DCFCE7', stroke: '#16A34A' },
      { label: 'Unverified&lt;br/&gt;MCP Server', x: 770, y: 320, w: 175, h: 120, fill: '#FFEDD5', stroke: '#EA580C' },
      { label: 'Legal PDF&lt;br/&gt;Cloud Upload', x: 975, y: 330, w: 165, h: 110, fill: '#FCE7F3', stroke: '#DB2777' },
      { label: 'Support&lt;br/&gt;Auto-Draft', x: 1165, y: 325, w: 155, h: 110, fill: '#E0E7FF', stroke: '#4F46E5' },
      { label: 'HR Resume&lt;br/&gt;Screener', x: 595, y: 475, w: 160, h: 105, fill: '#CCFBF1', stroke: '#0D9488' },
      { label: 'Marketing&lt;br/&gt;Copy Agent', x: 785, y: 475, w: 165, h: 105, fill: '#FEF9C3', stroke: '#CA8A04' },
      { label: 'Local LLM&lt;br/&gt;On Laptop', x: 980, y: 475, w: 160, h: 105, fill: '#FFE4E6', stroke: '#E11D48' },
      { label: 'Slack Webhook&lt;br/&gt;Prompt Bot', x: 1165, y: 475, w: 155, h: 105, fill: '#F1F5F9', stroke: '#475569' }
    ];
    let leftXml = '';
    leftAssumptions.forEach((a, idx) => {
      const y = 185 + idx * 125;
      leftXml += `<mxCell id="la_${idx}" value="&lt;div style='padding:8px;text-align:left;'&gt;&lt;div style='font-size:10px;font-weight:800;color:#475569;'&gt;${esc(a.badge)} (${level})&lt;/div&gt;&lt;div style='font-size:13.5px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${esc(a.title)}&lt;/div&gt;&lt;div style='font-size:11px;color:#334155;margin-top:3px;'&gt;${esc(a.description)}&lt;/div&gt;${getLevelTechSpec(level, idx)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="75" y="${y}" width="410" height="112" as="geometry"/></mxCell>`;
    });
    let bubbleXml = '';
    bubbles.forEach((b, idx) => {
      bubbleXml += `<mxCell id="bub_${idx}" value="&lt;div style='font-family:Inter,sans-serif;text-align:center;'&gt;&lt;b style='font-size:13px;color:#0F172A;'&gt;${b.label}&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9.5px;font-weight:800;color:${b.stroke};'&gt;UNSANCTIONED • ${level}&lt;/span&gt;&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=${b.fill};strokeColor=${b.stroke};strokeWidth=2.5;" vertex="1" parent="1"><mxGeometry x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" as="geometry"/></mxCell>`;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_55_${level}" name="${title}"><mxGraphModel dx="1440" dy="1020" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="1020" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.5px;'&gt;INFOGRAPHIC BLUEPRINT #55 • BUBBLE CONCEPTUAL • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      <mxCell id="zoneL" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="120" width="450" height="585" as="geometry"/></mxCell>
      <mxCell id="hdrL" value="WHAT LEADERSHIP THINKS (4 ASSUMPTIONS)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="75" y="135" width="410" height="36" as="geometry"/></mxCell>
      <mxCell id="zoneR" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=2;dashed=1;" vertex="1" parent="1"><mxGeometry x="535" y="120" width="850" height="585" as="geometry"/></mxCell>
      <mxCell id="hdrR" value="WHAT IS ACTUALLY RUNNING (12+ SHADOW AI &amp; AGENT BUBBLES)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#991B1B;fontColor=#FFFFFF;fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="565" y="135" width="790" height="36" as="geometry"/></mxCell>
      ${leftXml}
      ${bubbleXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="725" width="1330" height="46" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 5. #52 Custom Dynamic Override when `items` are passed by AI synthesizer
  if (id === '52') {
    const rows = items?.slice(0, 4) || [];
    let rowsXml = '';
    const colors = ['#D97706', '#9333EA', '#16A34A', '#2563EB'];
    rows.forEach((r, i) => {
      const y = 115 + i * 175;
      const col = colors[i % 4];
      const techSpec = getLevelTechSpec(level, i);
      rowsXml += `
        <mxCell id="b_${i}" value="${esc(r.code || `0${i + 1}`)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${col};strokeWidth=2;fontStyle=1;fontSize=13;fontColor=${col};" vertex="1" parent="1"><mxGeometry x="36" y="${y + 10}" width="42" height="32" as="geometry"/></mxCell>
        <mxCell id="row_${i}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="96" y="${y}" width="1290" height="158" as="geometry"/></mxCell>
        <mxCell id="rt_${i}" value="&lt;b style='font-size:17px;color:${col};'&gt;${esc(r.title)}&lt;/b&gt; &amp;nbsp;&lt;span style='font-size:12.5px;color:#334155;font-weight:600;'&gt;${esc(r.badge)} [${level}]&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="116" y="${y + 8}" width="700" height="26" as="geometry"/></mxCell>
        <mxCell id="L_${i}" value="&lt;div style='padding:6px;text-align:left;'&gt;&lt;b style='font-size:11px;color:${col};'&gt;INPUT / SOURCE ANATOMY&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11.5px;color:#1E293B;'&gt;${esc(r.description)}&lt;/span&gt;${techSpec}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=${col};dashed=1;" vertex="1" parent="1"><mxGeometry x="116" y="${y + 38}" width="460" height="68" as="geometry"/></mxCell>
        <mxCell id="M_${i}" value="GEMINI&lt;br/&gt;ENGINE&lt;br/&gt;${level}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=2;fontStyle=1;fontSize=10;fontColor=#9A3412;" vertex="1" parent="1"><mxGeometry x="660" y="${y + 42}" width="64" height="60" as="geometry"/></mxCell>
        <mxCell id="R_${i}" value="&lt;div style='padding:6px;text-align:left;'&gt;&lt;b style='font-size:11px;color:#1D4ED8;'&gt;${esc(r.secondaryTitle || 'TARGET OUTPUT &amp; VERIFICATION')}&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11.5px;color:#1E293B;'&gt;${esc(r.secondaryDescription || r.description)}&lt;/span&gt;${techSpec}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;" vertex="1" parent="1"><mxGeometry x="808" y="${y + 38}" width="556" height="68" as="geometry"/></mxCell>
        <mxCell id="eL_${i}" value="uses" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="L_${i}" target="M_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="eR_${i}" value="produces" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="M_${i}" target="R_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="P_${i}" value="&lt;div style='padding:4px 10px;text-align:left;font-size:11.5px;color:#334155;'&gt;&lt;b style='color:#0F172A;'&gt;ACTIONABLE PROMPT (${level}):&lt;/b&gt; ${esc(r.metricOrScore || `Execute ${r.title} verification and validate outputs.`)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#E2E8F0;" vertex="1" parent="1"><mxGeometry x="116" y="${y + 114}" width="1248" height="34" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_52_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#F8FAFC"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:left;padding:8px 16px;'&gt;${gcpLogoBadge}&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="36" y="20" width="1350" height="76" as="geometry"/></mxCell>
      ${rowsXml}
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 6. #56: SIDE-BY-SIDE COMPARISON (5 Head-to-Head OFF vs ON Toggle Rows matching 56.png)
  if (id === '56') {
    const leftHdr = esc(spec?.leftHeader || 'Raw Gemini API (DIY / Stateless • OFF)');
    const rightHdr = esc(spec?.rightHeader || 'Vertex AI Agent Engine (Managed GCP • ON)');
    const rows = items?.slice(0, 5) || [
      { code: '01', badge: 'STATE PERSISTENCE', title: '01 Stateless Runs (MANUAL / EPHEMERAL)', description: 'Requires custom database pipelines and manual state tracking for every conversation thread.', secondaryTitle: '01 Persistent State (BUILT-IN / MANAGED)', secondaryDescription: 'Automatically tracks, persists, and manages conversation history and context windows securely.' },
      { code: '02', badge: 'SECURITY &amp; SANDBOXING', title: '02 Local Execution (UNSANDBOXED)', description: 'Executing code from tool outputs runs directly on your host environment, risking security exposure.', secondaryTitle: '02 Sandbox Execution (SECURE VPC / ISOLATED)', secondaryDescription: 'Safely runs code and scripts inside isolated VPC GKE containers, blocked from accessing host resources.' },
      { code: '03', badge: 'INFORMATION GROUNDING', title: '03 Raw Model Knowledge (STATIC)', description: 'Requires manual RAG pipelines, chunking, embedding, and vector databases to prevent hallucinations.', secondaryTitle: '03 Grounding Engine (NATIVE RAG &amp; SEARCH)', secondaryDescription: 'Direct, secure ingestion from BigQuery, AlloyDB, Google Search, and enterprise datastores out-of-the-box.' },
      { code: '04', badge: 'GOVERNANCE &amp; CONTROL', title: '04 Custom Rails (HARDCODED CODE)', description: 'Needs custom code for safety filters, error-handling retry loops, and human-in-the-loop prompts.', secondaryTitle: '04 Managed Guardrails (PROGRAMMATIC POLICY)', secondaryDescription: 'Native safety filtering, programmatic organizational policy checks, and HITL approval workflows.' },
      { code: '05', badge: 'INTEGRATION ECOSYSTEM', title: '05 Fragmented Glue (CUSTOM PIPELINES)', description: 'Heavy integration required to connect API calls to cloud services, databases, and enterprise access.', secondaryTitle: '05 First-Party Integrations (GOOGLE NATIVE)', secondaryDescription: 'Native, out-of-the-box IAM security, Cloud Pub/Sub, Cloud Logging, Workspace tools, and API gateway.' }
    ];
    let cells = '';
    rows.forEach((r, idx) => {
      const y = 160 + idx * 124;
      const techSpec = getLevelTechSpec(level, idx);
      cells += `
        <mxCell id="cat_${idx}" value="${esc(r.badge)} • ${level}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontStyle=1;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="560" y="${y - 22}" width="320" height="24" as="geometry"/></mxCell>
        <mxCell id="L_${idx}" value="&lt;div style='text-align:left;padding:6px;'&gt;&lt;div style='display:flex;justify-content:space-between;'&gt;&lt;b style='font-size:13.5px;color:#0F172A;'&gt;${esc(r.title)}&lt;/b&gt;&lt;span style='background:#94A3B8;color:#FFF;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;'&gt;○ OFF&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:11px;color:#475569;margin-top:4px;'&gt;${esc(r.description)}&lt;/div&gt;${techSpec}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="${y + 4}" width="580" height="94" as="geometry"/></mxCell>
        <mxCell id="M_${idx}" value="${esc(r.code || `0${idx + 1}`)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=2;fontStyle=1;fontSize=14;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="696" y="${y + 28}" width="48" height="48" as="geometry"/></mxCell>
        <mxCell id="R_${idx}" value="&lt;div style='text-align:left;padding:6px;'&gt;&lt;div style='display:flex;justify-content:space-between;'&gt;&lt;b style='font-size:13.5px;color:#0F766E;'&gt;${esc(r.secondaryTitle || r.title)}&lt;/b&gt;&lt;span style='background:#16A34A;color:#FFF;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;'&gt;● ON [${level}]&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:11px;color:#334155;margin-top:4px;'&gt;${esc(r.secondaryDescription || r.description)}&lt;/div&gt;${techSpec}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="800" y="${y + 4}" width="580" height="94" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_56_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="68" as="geometry"/></mxCell>
      <mxCell id="pilL" value="${leftHdr}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="190" y="96" width="340" height="34" as="geometry"/></mxCell>
      <mxCell id="pilR" value="${rightHdr}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0D9488;strokeColor=#0F766E;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="910" y="96" width="360" height="34" as="geometry"/></mxCell>
      ${cells}
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 7. #57: FUNNEL CHART (5 Tapering Centered Trapezoid Stages with Volume Badges & Drop-Off Pills matching 57.png)
  if (id === '57') {
    const stages = items?.slice(0, 5) || [
      { code: '01', title: 'RAW INGESTION', badge: '1M Tokens • 100% Volume', description: 'Unfiltered input: raw docs, logs, repositories, and workspace history.', metricOrScore: '▼ 75% DISCARDED' },
      { code: '02', title: 'METADATA FILTER', badge: '250k Tokens • 25% Remaining', description: 'Heuristic, date, and keyword (BM25) search & filtering.', metricOrScore: '▼ 80% DISCARDED' },
      { code: '03', title: 'BIGQUERY VECTOR SEARCH', badge: '50k Tokens • 5% Remaining', description: 'Embeddings, cosine similarity, & database/vector RAG retrieval.', metricOrScore: '▼ 80% DISCARDED' },
      { code: '04', title: 'CROSS-ENCODER RE-RANKING', badge: '10k Tokens • 1% Remaining', description: 'Deep transformer scoring & cross-encoder relevancy evaluation.', metricOrScore: '▼ 80% DISCARDED' },
      { code: '05', title: 'GEMINI IN-CONTEXT WINDOW', badge: '2k Tokens • 0.2% Remaining', description: 'High-value, exact-context chunks inserted into prompt/model context.', metricOrScore: 'OPTIMAL CONTEXT' }
    ];
    const fills = ['#2563EB', '#DC2626', '#EAB308', '#16A34A', '#4F46E5'];
    const widths = [1040, 880, 720, 560, 420];
    let funnelXml = '';
    stages.forEach((s, i) => {
      const w = widths[i];
      const x = Math.round((1440 - w) / 2);
      const y = 115 + i * 116;
      const col = fills[i % fills.length];
      const txtCol = i === 2 ? '#0F172A' : '#FFFFFF';
      const techSpec = getLevelTechSpec(level, i);
      funnelXml += `
        <mxCell id="f_${i}" value="&lt;div style='text-align:center;padding:6px;'&gt;&lt;div style='font-size:15px;font-weight:900;color:${txtCol};'&gt;${esc(s.code || `0${i + 1}`)} | ${esc(s.title)} &amp;nbsp;&lt;span style='background:#FFFFFF;color:#0F172A;padding:2px 8px;border-radius:10px;font-size:10.5px;'&gt;${esc(s.badge)} [${level}]&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:11.5px;color:${txtCol};margin-top:3px;'&gt;${esc(s.description)}&lt;/div&gt;${techSpec}&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;direction=west;rounded=1;whiteSpace=wrap;html=1;fillColor=${col};strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="96" as="geometry"/></mxCell>
        <mxCell id="drop_${i}" value="${esc(s.metricOrScore || '▼ FILTERED')}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#B91C1C;strokeColor=#7F1D1D;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" vertex="1" parent="1"><mxGeometry x="${x + w + 24}" y="${y + 32}" width="140" height="30" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_57_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="72" as="geometry"/></mxCell>
      ${funnelXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="220" y="720" width="1000" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 8. #58: PROCESS CHECKLIST (6 Stacked Numbered Checklist Rows with Status Pills & Green ON Toggles matching 58.png)
  if (id === '58') {
    const list = items?.slice(0, 6) || [
      { code: '01', title: 'Define Mission & Scope', badge: 'DEFINED', description: 'Establish the exact tasks, constraints, and success boundaries.', metricOrScore: 'goal_check: SUCCESS | retry_limit: 3' },
      { code: '02', title: 'Configure API Gateway & Ingress', badge: 'CONNECTED', description: 'Set up the Google Cloud API gateway and authenticate client requests.', metricOrScore: 'HTTPS_Ingress | Auth / Rate Limit' },
      { code: '03', title: 'Establish Sandboxed GKE Cluster', badge: 'ISOLATED', description: 'Provision an isolated GKE cluster with gVisor sandbox runtimes for safe tool use.', metricOrScore: 'VPC Sandbox | gVisor Containers' },
      { code: '04', title: 'Enable Memory & Persistent State', badge: 'PERSISTENT', description: 'Connect AlloyDB to log episodic memory and task session state securely.', metricOrScore: 'AlloyDB DB_adapter | Task Logs' },
      { code: '05', title: 'Integrate HIL Validation Loop', badge: 'GATEWAY', description: 'Establish Human-in-the-Loop breakpoints for validation failures.', metricOrScore: 'HITL Breakpoint | Retry Loops' },
      { code: '06', title: 'Deploy to Vertex AI Run', badge: 'DEPLOYED', description: 'Release the validated agent workflow into Vertex AI reasoning engines.', metricOrScore: 'live_agent_run | GCP PubSub' }
    ];
    const badgeCols = ['#DC2626', '#EA580C', '#EAB308', '#16A34A', '#2563EB', '#DC2626'];
    let listXml = '';
    list.forEach((it, i) => {
      const y = 110 + i * 100;
      const c = badgeCols[i % badgeCols.length];
      const techSpec = getLevelTechSpec(level, i);
      listXml += `
        <mxCell id="num_${i}" value="${esc(it.code || `0${i + 1}`)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${c};strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=18;" vertex="1" parent="1"><mxGeometry x="90" y="${y + 12}" width="64" height="64" as="geometry"/></mxCell>
        <mxCell id="row_${i}" value="&lt;div style='padding:8px 16px;text-align:left;display:flex;justify-content:space-between;align-items:center;'&gt;&lt;div&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;'&gt;${esc(it.code || `0${i + 1}`)} | ${esc(it.title)} &amp;nbsp;&lt;span style='background:#16A34A;color:#FFFFFF;padding:2px 10px;border-radius:999px;font-size:10px;'&gt;● ${esc(it.badge)} • ${level}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:3px;'&gt;${esc(it.description)}&lt;/div&gt;${techSpec}&lt;/div&gt;&lt;div style='background:#E2E8F0;padding:6px 12px;border-radius:8px;font-family:monospace;font-size:11px;color:#0F172A;font-weight:700;'&gt;${esc(it.metricOrScore || 'STATUS: VERIFIED [ON]')}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="174" y="${y}" width="1170" height="86" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_58_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:left;padding:6px 16px;'&gt;${gcpLogoBadge}&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="90" y="20" width="1254" height="74" as="geometry"/></mxCell>
      ${listXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="90" y="720" width="1254" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 9. #59: TIMELINE ROADMAP (4 Quarterly Phases Q1-Q4 + Central Spine + 8 Milestones matching 59.png)
  if (id === '59') {
    const phases = items?.slice(0, 4) || [
      { code: 'Q1', title: 'PHASE 1: FOUNDATION & RAG', badge: 'PILOT • WEEKS 1-6', description: 'Deploy Vertex AI Search, BigQuery vector store, and internal copilot with zero-trust IAM.', secondaryTitle: 'M1: Grounded RAG Live | M2: <1.2s p95 Latency', metricOrScore: 'GATE 1: 95% CITATION' },
      { code: 'Q2', title: 'PHASE 2: SANDBOXED TOOL USE', badge: 'BETA • WEEKS 7-12', description: 'Connect MCP tools, AlloyDB session state, and isolated GKE gVisor code execution.', secondaryTitle: 'M3: Read/Write API Tools | M4: HITL Approval Gate', metricOrScore: 'GATE 2: 0 SANDBOX ESCAPES' },
      { code: 'Q3', title: 'PHASE 3: MULTI-AGENT SWARM', badge: 'PROD • WEEKS 13-18', description: 'Launch Supervisor + Worker agents (SQL, Web, Code) coordinated via Cloud Pub/Sub.', secondaryTitle: 'M5: Supervisor Routing | M6: Auto-Retry Loop', metricOrScore: 'GATE 3: 88% TASK SUCCESS' },
      { code: 'Q4', title: 'PHASE 4: AUTONOMOUS SCALE', badge: 'GLOBAL • WEEKS 19-24', description: 'Multi-region Cloud Run active-active failover, continuous eval harness, and FinOps routing.', secondaryTitle: 'M7: Multi-Region HA | M8: 40% Token Cost Drop', metricOrScore: 'GATE 4: 99.95% SLA' }
    ];
    const cols = ['#2563EB', '#059669', '#D97706', '#7C3AED'];
    const fills = ['#EFF6FF', '#ECFDF5', '#FFFBEB', '#FAF5FF'];
    let phaseXml = '';
    phases.forEach((p, i) => {
      const x = 55 + i * 338;
      const col = cols[i % 4];
      const fl = fills[i % 4];
      phaseXml += `
        <mxCell id="p59_node_${i}" value="${esc(p.code || `Q${i + 1}`)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${col};strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=16;" vertex="1" parent="1"><mxGeometry x="${x + 125}" y="125" width="64" height="64" as="geometry"/></mxCell>
        <mxCell id="p59_card_${i}" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='background:${col};color:#FFF;display:inline-block;padding:2px 9px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(p.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:15.5px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(p.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;line-height:1.45;'&gt;${esc(p.description)}&lt;/div&gt;${getLevelTechSpec(level, i)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${fl};strokeColor=${col};strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${x}" y="210" width="314" height="295" as="geometry"/></mxCell>
        <mxCell id="p59_ms_${i}" value="&lt;div style='padding:8px 10px;text-align:left;font-size:11.5px;color:#0F172A;'&gt;&lt;b style='color:${col};'&gt;MILESTONES (${level}):&lt;/b&gt;&lt;br/&gt;${esc(p.secondaryTitle || 'M1: Architecture Signed | M2: Prod Canary')}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${col};strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="${x}" y="525" width="314" height="90" as="geometry"/></mxCell>
        <mxCell id="p59_gate_${i}" value="✓ ${esc(p.metricOrScore || 'STAGE GATE PASSED')}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11.5;" vertex="1" parent="1"><mxGeometry x="${x}" y="630" width="314" height="40" as="geometry"/></mxCell>
      `;
      if (i > 0) {
        phaseXml += `<mxCell id="p59_e_${i}" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=3;endArrow=block;" edge="1" parent="1" source="p59_node_${i - 1}" target="p59_node_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
      }
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_59_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #59 • TIMELINE ROADMAP • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      ${phaseXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="695" width="1330" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 10. #60: CLOUD ARCHITECTURE TOPOLOGY (4-Zone GCP Cloud Run -> Vertex AI -> AlloyDB/BigQuery -> GKE gVisor matching 60.png)
  if (id === '60') {
    const z1 = items?.[0] || { code: '01', title: 'ZONE 1: CLIENT & CLOUD RUN INGRESS', badge: 'EDGE & AUTH', description: 'Cloud Armor WAF, Apigee API Gateway, Identity-Aware Proxy (IAP), and serverless Cloud Run ingress.' };
    const z2 = items?.[1] || { code: '02', title: 'ZONE 2: VERTEX AI AGENT ENGINE', badge: 'ORCHESTRATION', description: 'Gemini 2.5 Pro planner, reasoning loop, Model Armor safety filters, and Cloud Pub/Sub event bus.' };
    const z3 = items?.[2] || { code: '03', title: 'ZONE 3: ENTERPRISE MEMORY & RAG', badge: 'DATA & VECTOR', description: 'AlloyDB pgvector episodic state, BigQuery enterprise analytics, and Vertex AI Search grounding.' };
    const z4 = items?.[3] || { code: '04', title: 'ZONE 4: SANDBOXED GKE gVISOR RUNTIME', badge: 'ISOLATED TOOLS', description: 'Ephemeral GKE pods with gVisor kernel isolation executing Python/SQL/API tools inside VPC-SC.' };
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_60_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #60 • CLOUD ARCHITECTURE TOPOLOGY • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      <mxCell id="z60_1" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;span style='background:#2563EB;color:#FFF;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(z1.code)} • ${esc(z1.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z1.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z1.description)}&lt;/div&gt;${getLevelTechSpec(level, 0)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="55" y="125" width="305" height="550" as="geometry"/></mxCell>
      <mxCell id="z60_1a" value="Cloud Armor WAF + IAP" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="78" y="380" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_1b" value="Cloud Run API Gateway" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="78" y="460" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_1c" value="Cloud Trace &amp; OTel" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#93C5FD;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="78" y="540" width="260" height="50" as="geometry"/></mxCell>

      <mxCell id="z60_2" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;span style='background:#7C3AED;color:#FFF;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(z2.code)} • ${esc(z2.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z2.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z2.description)}&lt;/div&gt;${getLevelTechSpec(level, 1)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="395" y="125" width="310" height="550" as="geometry"/></mxCell>
      <mxCell id="z60_2a" value="Gemini 2.5 Pro Planner" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="420" y="380" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_2b" value="Model Armor Policy Gate" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="420" y="460" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_2c" value="Cloud Pub/Sub Event Bus" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#D8B4FE;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="420" y="540" width="260" height="50" as="geometry"/></mxCell>

      <mxCell id="z60_3" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;span style='background:#059669;color:#FFF;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(z3.code)} • ${esc(z3.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z3.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z3.description)}&lt;/div&gt;${getLevelTechSpec(level, 2)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="740" y="125" width="310" height="550" as="geometry"/></mxCell>
      <mxCell id="z60_3a" value="AlloyDB pgvector Memory" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="765" y="380" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_3b" value="BigQuery Vector Search" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="765" y="460" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_3c" value="Cloud KMS CMEK Vault" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#6EE7B7;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="765" y="540" width="260" height="50" as="geometry"/></mxCell>

      <mxCell id="z60_4" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;span style='background:#EA580C;color:#FFF;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(z4.code)} • ${esc(z4.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-top:8px;'&gt;${esc(z4.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;'&gt;${esc(z4.description)}&lt;/div&gt;${getLevelTechSpec(level, 3)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="1085" y="125" width="300" height="550" as="geometry"/></mxCell>
      <mxCell id="z60_4a" value="GKE Autopilot + gVisor" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA580C;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="1105" y="380" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_4b" value="MCP Tool Sandbox Pods" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA580C;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="1105" y="460" width="260" height="60" as="geometry"/></mxCell>
      <mxCell id="z60_4c" value="VPC Service Controls" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FDBA74;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="1105" y="540" width="260" height="50" as="geometry"/></mxCell>

      <mxCell id="e60_1" value="mTLS" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;" edge="1" parent="1" source="z60_1" target="z60_2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e60_2" value="RAG" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;" edge="1" parent="1" source="z60_2" target="z60_3"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e60_3" value="Exec" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;" edge="1" parent="1" source="z60_3" target="z60_4"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="695" width="1330" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 11. #61: HIERARCHICAL TREE (Supervisor Root -> 3 Specialized Workers -> Unified Environment Layer matching 61.png)
  if (id === '61') {
    const rootItem = items?.[0] || { code: '01', title: 'SUPERVISOR AGENT', badge: 'ORCHESTRATOR • GOAL-DRIVEN', description: 'Analyzes high-level goals, decomposes tasks, coordinates specialized agents, and validates the final response.' };
    const w1 = items?.[1] || { code: '02a', title: 'SQL DATA AGENT', badge: 'DATA ACCESS', description: 'Queries databases, joins datasets, and fetches structured schema information.' };
    const w2 = items?.[2] || { code: '02b', title: 'WEB RESEARCHER AGENT', badge: 'BROWSER / SEARCH', description: 'Scrapes web pages, accesses APIs, and gathers real-time public information.' };
    const w3 = items?.[3] || { code: '02c', title: 'CODE SYNTHESIS AGENT', badge: 'EXECUTION / WRITE', description: 'Writes, tests, and refactors code scripts to process fetched datasets.' };
    const baseItem = items?.[4] || { code: '03', title: 'UNIFIED RESOURCE & ENVIRONMENT LAYER', badge: 'ISOLATED VPC • SECURE', description: 'Execution boundary for sandboxed workloads, database access (SQL connectors), gVisor runtime, & RAG vector knowledge base.' };

    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_61_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="72" as="geometry"/></mxCell>
      <mxCell id="sup" value="&lt;div style='padding:12px;text-align:left;color:#FFFFFF;'&gt;&lt;div style='font-size:11px;font-weight:800;opacity:0.9;'&gt;01 | SUPERVISION ZONE (${esc(rootItem.badge)} • ${level})&lt;/div&gt;&lt;div style='font-size:18px;font-weight:900;margin-top:4px;'&gt;${esc(rootItem.title)}&lt;/div&gt;&lt;div style='font-size:12px;margin-top:6px;line-height:1.4;'&gt;${esc(rootItem.description)}&lt;/div&gt;${getLevelTechSpec(level, 0)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1E3A8A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="480" y="116" width="480" height="150" as="geometry"/></mxCell>
      <mxCell id="w1" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;'&gt;02a | ${esc(w1.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:#16A34A;color:#FFF;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-top:4px;'&gt;${esc(w1.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:12px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${esc(w1.description)}&lt;/div&gt;${getLevelTechSpec(level, 1)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="80" y="325" width="380" height="190" as="geometry"/></mxCell>
      <mxCell id="w2" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;'&gt;02b | ${esc(w2.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:#D97706;color:#FFF;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-top:4px;'&gt;${esc(w2.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:12px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${esc(w2.description)}&lt;/div&gt;${getLevelTechSpec(level, 2)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="530" y="325" width="380" height="190" as="geometry"/></mxCell>
      <mxCell id="w3" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;'&gt;02c | ${esc(w3.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:#DC2626;color:#FFF;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-top:4px;'&gt;${esc(w3.badge)} [${level}]&lt;/div&gt;&lt;div style='font-size:12px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${esc(w3.description)}&lt;/div&gt;${getLevelTechSpec(level, 3)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="980" y="325" width="380" height="190" as="geometry"/></mxCell>
      <mxCell id="env" value="&lt;div style='padding:12px;text-align:center;color:#FFFFFF;'&gt;&lt;div style='font-size:18px;font-weight:900;'&gt;03 | ${esc(baseItem.title)} &amp;nbsp;&lt;span style='background:#0D9488;padding:2px 10px;border-radius:999px;font-size:11px;'&gt;${esc(baseItem.badge)} • ${level}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12.5px;color:#E2E8F0;margin-top:6px;'&gt;${esc(baseItem.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="80" y="575" width="1280" height="110" as="geometry"/></mxCell>
      <mxCell id="e1" value="Delegate &amp; Route (${level})" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="sup" target="w1"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e2" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="sup" target="w2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e3" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="sup" target="w3"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e4" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="w2" target="env"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="80" y="715" width="1280" height="48" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 12. #62: 2x2 QUADRANT MATRIX (Business Impact vs Technical Complexity matching 62.png)
  if (id === '62') {
    const quads = items?.slice(0, 4) || [
      { code: '01', title: 'QUICK WINS', badge: 'HIGH IMPACT • LOW COMPLEXITY', description: 'High ROI, fast implementation. Build first: Draft Email Responses, Document Translation, Meeting Summaries, Standard Ticket Routing.' },
      { code: '02', title: 'STRATEGIC BETS', badge: 'HIGH IMPACT • HIGH COMPLEXITY', description: 'Complex but transformative. High long-term value: Workflow Orchestration, Autonomous Market Research, Full Code Generation.' },
      { code: '03', title: 'LOW PRIORITY', badge: 'LOW IMPACT • LOW COMPLEXITY', description: 'Easy to deploy but low business return: Local File Organization, Internal Calendar Sync, Routine Database Polling.' },
      { code: '04', title: 'HIGH RISK TRAPS', badge: 'LOW IMPACT • HIGH COMPLEXITY', description: 'Heavy engineering effort for minor ROI. Avoid or defer: Arbitrary Bulk Migration, Subjective HR Evaluation.' }
    ];
    const qStyles = [
      { x: 160, y: 120, fill: '#D1FAE5', stroke: '#059669' },
      { x: 770, y: 120, fill: '#E0E7FF', stroke: '#4F46E5' },
      { x: 160, y: 410, fill: '#FEF3C7', stroke: '#D97706' },
      { x: 770, y: 410, fill: '#FEE2E2', stroke: '#DC2626' }
    ];
    let qXml = '';
    quads.forEach((q, i) => {
      const st = qStyles[i];
      const techSpec = getLevelTechSpec(level, i);
      qXml += `
        <mxCell id="q_${i}" value="&lt;div style='padding:14px;text-align:left;'&gt;&lt;div style='font-size:19px;font-weight:900;color:#0F172A;'&gt;${esc(q.code || `0${i + 1}`)} | ${esc(q.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:${st.stroke};color:#FFFFFF;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;margin-top:6px;'&gt;${esc(q.badge)} • ${level}&lt;/div&gt;&lt;div style='font-size:13px;color:#1E293B;margin-top:10px;line-height:1.5;'&gt;${esc(q.description)}&lt;/div&gt;${techSpec}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${st.fill};strokeColor=${st.stroke};strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${st.x}" y="${st.y}" width="580" height="265" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_62_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:left;padding:6px 16px;'&gt;${gcpLogoBadge}&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="160" y="20" width="1190" height="74" as="geometry"/></mxCell>
      <mxCell id="axY" value="HIGH  ◄───  BUSINESS IMPACT (Value &amp; ROI)  ───►  LOW" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=13;direction=north;" vertex="1" parent="1"><mxGeometry x="76" y="120" width="54" height="555" as="geometry"/></mxCell>
      <mxCell id="axX" value="LOW  ◄──────  TECHNICAL COMPLEXITY (Time, Cost, Effort &amp; Friction)  ──────►  HIGH" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="160" y="688" width="1190" height="36" as="geometry"/></mxCell>
      ${qXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="160" y="732" width="1190" height="42" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 13. #63: DECISION TREE / FLOWCHART (3-Tier Ingest -> Tool Check -> Execute with Rhombus Diamonds & YES/NO Pills matching 63.png)
  if (id === '63') {
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_63_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #63 • DECISION TREE ROUTER • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      <mxCell id="t1_lbl" value="01 | INGEST &amp; CLASSIFY" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="135" width="180" height="44" as="geometry"/></mxCell>
      <mxCell id="n_in" value="&lt;b style='font-size:14px;'&gt;Incoming User Prompt&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#475569;'&gt;Cloud Run Ingress (${level})&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="275" y="125" width="250" height="68" as="geometry"/></mxCell>
      <mxCell id="d_safe" value="Passes Model&lt;br/&gt;Armor Policy?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="610" y="115" width="190" height="90" as="geometry"/></mxCell>
      <mxCell id="n_blk" value="&lt;b style='color:#DC2626;'&gt;✕ BLOCK &amp; LOG&lt;/b&gt;&lt;br/&gt;Return Policy Refusal" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="920" y="125" width="250" height="68" as="geometry"/></mxCell>

      <mxCell id="t2_lbl" value="02 | TOOL &amp; RISK CHECK" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="305" width="180" height="44" as="geometry"/></mxCell>
      <mxCell id="d_tool" value="Requires External&lt;br/&gt;Tool / RAG?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#E0E7FF;strokeColor=#4F46E5;strokeWidth=2;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="610" y="280" width="190" height="95" as="geometry"/></mxCell>
      <mxCell id="n_fast" value="&lt;b style='color:#059669;'&gt;✓ DIRECT GEMINI FLASH&lt;/b&gt;&lt;br/&gt;Fast Sub-Second Response" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="275" y="293" width="250" height="68" as="geometry"/></mxCell>
      <mxCell id="d_mut" value="Mutates Prod&lt;br/&gt;State / DB?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FCE7F3;strokeColor=#DB2777;strokeWidth=2;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="920" y="280" width="190" height="95" as="geometry"/></mxCell>

      <mxCell id="t3_lbl" value="03 | EXECUTE &amp; VERIFY" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="485" width="180" height="44" as="geometry"/></mxCell>
      <mxCell id="n_rag" value="&lt;b style='color:#1D4ED8;'&gt;READ-ONLY RAG &amp; MCP&lt;/b&gt;&lt;br/&gt;BigQuery + AlloyDB Vector (${level})" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="565" y="470" width="280" height="80" as="geometry"/></mxCell>
      <mxCell id="n_hitl" value="&lt;b style='color:#D97706;'&gt;HUMAN-IN-THE-LOOP GATE&lt;/b&gt;&lt;br/&gt;Approve GKE Sandbox Write (${level})" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="900" y="470" width="280" height="80" as="geometry"/></mxCell>
      <mxCell id="n_out" value="&lt;b style='font-size:14px;color:#FFFFFF;'&gt;✓ VERIFIED GROUNDED RESPONSE + CITATIONS (${level})&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#059669;strokeColor=#047857;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="275" y="600" width="905" height="58" as="geometry"/></mxCell>

      <mxCell id="e63_1" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n_in" target="d_safe"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_2" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#DC2626;strokeWidth=2;endArrow=block;labelBackgroundColor=#FEE2E2;fontColor=#DC2626;fontStyle=1;" edge="1" parent="1" source="d_safe" target="n_blk"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_3" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#059669;strokeWidth=2;endArrow=block;labelBackgroundColor=#DCFCE7;fontColor=#059669;fontStyle=1;" edge="1" parent="1" source="d_safe" target="d_tool"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_4" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#059669;strokeWidth=2;endArrow=block;labelBackgroundColor=#DCFCE7;fontColor=#059669;fontStyle=1;" edge="1" parent="1" source="d_tool" target="n_fast"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_5" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#4F46E5;strokeWidth=2;endArrow=block;labelBackgroundColor=#E0E7FF;fontColor=#4F46E5;fontStyle=1;" edge="1" parent="1" source="d_tool" target="d_mut"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_6" value="NO (Read)" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#EFF6FF;fontColor=#2563EB;fontStyle=1;" edge="1" parent="1" source="d_mut" target="n_rag"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_7" value="YES (Write)" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FEF3C7;fontColor=#D97706;fontStyle=1;" edge="1" parent="1" source="d_mut" target="n_hitl"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_8" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#059669;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n_fast" target="n_out"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_9" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#059669;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n_rag" target="n_out"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_10" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#059669;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n_hitl" target="n_out"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="695" width="1330" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 14. #64: FEATURE MATRIX TABLE (5x4 Agentic Framework Comparison Table with Check/Cross Pills & Scores matching 64.png)
  if (id === '64') {
    const dims = [
      { dim: '01 | State & Episodic Memory', c1: '✓ Managed AlloyDB', c2: '✓ Graph Checkpoints', c3: '○ Custom Store', c4: '✕ Stateless' },
      { dim: '02 | VPC & gVisor Sandboxing', c1: '✓ Native VPC-SC', c2: '○ Bring Your Own', c3: '○ Container Only', c4: '✕ Host Process' },
      { dim: '03 | BigQuery & Search Grounding', c1: '✓ 1-Click Native', c2: '✓ Tool Adapter', c3: '✓ Connector Lib', c4: '○ Manual RAG' },
      { dim: '04 | Multi-Agent Supervision', c1: '✓ Agent Engine', c2: '✓ Cyclic Graphs', c3: '✓ Role Crews', c4: '✕ Single Loop' },
      { dim: '05 | Production Readiness Score', c1: '★ 9.6 / 10 (ENTERPRISE)', c2: '8.8 / 10 (FLEXIBLE)', c3: '8.2 / 10 (RAPID)', c4: '5.5 / 10 (PROTOTYPE)' }
    ];
    let gridXml = '';
    dims.forEach((d, r) => {
      const y = 185 + r * 92;
      const isLast = r === 4;
      gridXml += `
        <mxCell id="m64_d_${r}" value="${d.dim} (${level})" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12.5;align=left;spacingLeft=14;" vertex="1" parent="1"><mxGeometry x="55" y="${y}" width="310" height="76" as="geometry"/></mxCell>
        <mxCell id="m64_c1_${r}" value="${d.c1}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isLast ? '#059669' : '#DCFCE7'};strokeColor=#059669;strokeWidth=2;fontColor=${isLast ? '#FFFFFF' : '#065F46'};fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="380" y="${y}" width="240" height="76" as="geometry"/></mxCell>
        <mxCell id="m64_c2_${r}" value="${d.c2}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;fontColor=#1E3A8A;fontStyle=1;fontSize=12.5;" vertex="1" parent="1"><mxGeometry x="635" y="${y}" width="240" height="76" as="geometry"/></mxCell>
        <mxCell id="m64_c3_${r}" value="${d.c3}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.5;fontColor=#92400E;fontStyle=1;fontSize=12.5;" vertex="1" parent="1"><mxGeometry x="890" y="${y}" width="240" height="76" as="geometry"/></mxCell>
        <mxCell id="m64_c4_${r}" value="${d.c4}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;fontColor=#991B1B;fontStyle=1;fontSize=12.5;" vertex="1" parent="1"><mxGeometry x="1145" y="${y}" width="240" height="76" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_64_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #64 • FEATURE MATRIX TABLE • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      <mxCell id="h0" value="EVALUATION DIMENSION" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#334155;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="125" width="310" height="46" as="geometry"/></mxCell>
      <mxCell id="h1" value="★ VERTEX AI ADK (RECOMMENDED)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#059669;strokeColor=#047857;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="380" y="125" width="240" height="46" as="geometry"/></mxCell>
      <mxCell id="h2" value="LANGGRAPH" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="635" y="125" width="240" height="46" as="geometry"/></mxCell>
      <mxCell id="h3" value="CREWAI" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#D97706;strokeColor=#B45309;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="890" y="125" width="240" height="46" as="geometry"/></mxCell>
      <mxCell id="h4" value="RAW PROMPT SCRIPT" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="1145" y="125" width="240" height="46" as="geometry"/></mxCell>
      ${gridXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="55" y="660" width="1330" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 15. #65: LAYERED PYRAMID (4-Tier Stepped AI Capability Pyramid from Foundation to Autonomous Swarm matching 65.png)
  if (id === '65') {
    const tiers = items?.slice(0, 4) || [
      { code: 'TIER 04', title: 'AUTONOMOUS MULTI-AGENT SWARMS', badge: 'APEX AUTONOMY', description: 'Self-correcting supervisor & worker agents coordinating complex cross-system workflows.', metricOrScore: 'HIGH ROI • AUTONOMOUS' },
      { code: 'TIER 03', title: 'SANDBOXED TOOL USE & MCP EXECUTION', badge: 'ACTION LAYER', description: 'GKE gVisor sandboxes, read/write API tool calling, and Human-in-the-Loop approval gates.', metricOrScore: 'GOVERNED ACTIONS' },
      { code: 'TIER 02', title: 'ENTERPRISE RAG & GROUNDED MEMORY', badge: 'KNOWLEDGE LAYER', description: 'BigQuery vector search, AlloyDB pgvector state, and Vertex AI Search citation grounding.', metricOrScore: 'ZERO HALLUCINATION' },
      { code: 'TIER 01', title: 'FOUNDATION MODELS & CLOUD SECURITY BASE', badge: 'INFRASTRUCTURE BASE', description: 'Gemini 2.5 Pro/Flash, VPC Service Controls, Cloud KMS CMEK, and Model Armor guardrails.', metricOrScore: 'ZERO-TRUST BASE' }
    ];
    const widths = [520, 740, 960, 1180];
    const fills = ['#7C3AED', '#059669', '#2563EB', '#0F172A'];
    let pyrXml = '';
    tiers.forEach((t, i) => {
      const w = widths[i];
      const x = Math.round((1440 - w) / 2);
      const y = 125 + i * 135;
      const col = fills[i % 4];
      pyrXml += `
        <mxCell id="pyr_${i}" value="&lt;div style='padding:10px;text-align:center;color:#FFFFFF;'&gt;&lt;div style='font-size:11px;font-weight:800;letter-spacing:1px;'&gt;${esc(t.code)} • ${esc(t.badge)} [${level}] — ${esc(t.metricOrScore || 'VERIFIED')}&lt;/div&gt;&lt;div style='font-size:18px;font-weight:900;margin-top:4px;'&gt;${esc(t.title)}&lt;/div&gt;&lt;div style='font-size:12px;opacity:0.92;margin-top:4px;'&gt;${esc(t.description)}&lt;/div&gt;&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;rounded=1;whiteSpace=wrap;html=1;fillColor=${col};strokeColor=#FFFFFF;strokeWidth=2.5;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="120" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_65_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.2px;'&gt;INFOGRAPHIC #65 • LAYERED CAPABILITY PYRAMID • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:25px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="84" as="geometry"/></mxCell>
      ${pyrXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="130" y="685" width="1180" height="44" as="geometry"/></mxCell>
      ${levelStripXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 16. #66: CIRCULAR FEEDBACK LOOP (4-Stage Autonomous Agent Execution Cycle + Central Hub + FAIL/DEPLOY Paths matching 66.png)
  const s1 = items?.[0] || { code: '01', title: 'OBSERVE & INGEST CONTEXT', badge: 'STAGE 1 • PERCEIVE', description: 'Load user goal, AlloyDB episodic memory, and BigQuery RAG context chunks.' };
  const s2 = items?.[1] || { code: '02', title: 'REASON & DECOMPOSE PLAN', badge: 'STAGE 2 • THINK', description: 'Gemini 2.5 Pro formulates step-by-step DAG and selects governed MCP tools.' };
  const s3 = items?.[2] || { code: '03', title: 'ACT IN SANDBOXED RUNTIME', badge: 'STAGE 3 • EXECUTE', description: 'Run code, SQL queries, and API mutations inside isolated GKE gVisor pods.' };
  const s4 = items?.[3] || { code: '04', title: 'VERIFY & SELF-CORRECT', badge: 'STAGE 4 • EVALUATE', description: 'Run deterministic tests & Model Armor checks; retry on failure or ship output.' };

  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_${id}_${level}" name="${title}"><mxGraphModel dx="1440" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="960" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
    <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;${gcpLogoBadge}&lt;span style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.5px;text-transform:uppercase;'&gt;INFOGRAPHIC BLUEPRINT #${id} • ${esc(meta.shortType)} • ${activeLevelLabel}&lt;/span&gt;&lt;div style='font-size:24px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="84" as="geometry"/></mxCell>
    <mxCell id="hub" value="&lt;div style='text-align:center;color:#FFFFFF;padding:10px;'&gt;&lt;div style='font-size:11px;font-weight:800;color:#93C5FD;'&gt;VERTEX AI CORE&lt;/div&gt;&lt;div style='font-size:17px;font-weight:900;margin-top:4px;'&gt;AUTONOMOUS&lt;br/&gt;AGENT LOOP&lt;/div&gt;&lt;div style='font-size:10.5px;color:#A7F3D0;margin-top:4px;'&gt;Max 3 Retries • ${level}&lt;/div&gt;&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#2563EB;strokeWidth=4;" vertex="1" parent="1"><mxGeometry x="610" y="310" width="220" height="190" as="geometry"/></mxCell>
    <mxCell id="c66_1" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;span style='background:#2563EB;color:#FFF;padding:2px 9px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(s1.code)} • ${esc(s1.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:15.5px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${esc(s1.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:4px;'&gt;${esc(s1.description)}&lt;/div&gt;${getLevelTechSpec(level, 0)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="80" y="135" width="440" height="200" as="geometry"/></mxCell>
    <mxCell id="c66_2" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;span style='background:#7C3AED;color:#FFF;padding:2px 9px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(s2.code)} • ${esc(s2.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:15.5px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${esc(s2.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:4px;'&gt;${esc(s2.description)}&lt;/div&gt;${getLevelTechSpec(level, 1)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="920" y="135" width="440" height="200" as="geometry"/></mxCell>
    <mxCell id="c66_3" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;span style='background:#EA580C;color:#FFF;padding:2px 9px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(s3.code)} • ${esc(s3.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:15.5px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${esc(s3.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:4px;'&gt;${esc(s3.description)}&lt;/div&gt;${getLevelTechSpec(level, 2)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="920" y="475" width="440" height="200" as="geometry"/></mxCell>
    <mxCell id="c66_4" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;span style='background:#059669;color:#FFF;padding:2px 9px;border-radius:999px;font-size:10px;font-weight:800;'&gt;${esc(s4.code)} • ${esc(s4.badge)} [${level}]&lt;/span&gt;&lt;div style='font-size:15.5px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${esc(s4.title)}&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:4px;'&gt;${esc(s4.description)}&lt;/div&gt;${getLevelTechSpec(level, 3)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="80" y="475" width="440" height="200" as="geometry"/></mxCell>
    <mxCell id="e66_12" value="1. Context ➔ Plan" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#2563EB;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;" edge="1" parent="1" source="c66_1" target="c66_2"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e66_23" value="2. Plan ➔ Execute" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#7C3AED;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;" edge="1" parent="1" source="c66_2" target="c66_3"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e66_34" value="3. Output ➔ Verify" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;" edge="1" parent="1" source="c66_3" target="c66_4"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e66_41" value="4. FAIL ➔ Retry Loop" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#DC2626;strokeWidth=2.5;dashed=1;endArrow=block;labelBackgroundColor=#FEE2E2;fontColor=#DC2626;fontStyle=1;" edge="1" parent="1" source="c66_4" target="c66_1"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="60" y="698" width="1320" height="44" as="geometry"/></mxCell>
    ${levelStripXml}
  </root></mxGraphModel></diagram></mxfile>`;
}
