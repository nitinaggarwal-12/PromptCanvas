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
    subtitle: 'Contrasting What Leadership Thinks (4 statements) vs What Is Actually Running (20+ shadow AI bubbles).',
    previewImage: '/templates/55.png',
    keyComponents: ['What Leadership Thinks (Executive Persona & 4 Assumptions)', 'What Is Actually Running (20 Color-Coded Shadow AI Bubbles)']
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

  const meta = INFOGRAPHIC_BLUEPRINTS_LIST.find((m) => m.id === id) || INFOGRAPHIC_BLUEPRINTS_LIST[0];
  const items = spec?.items && spec.items.length > 0 ? spec.items : null;

  // ============================================================================
  // 1. #52: ANATOMY / DECONSTRUCTION (Exact 1:1 Vector Twin of 52.png)
  // ============================================================================
  if (id === '52' && !items) {
    return generateTemplate52ContextHarnessLoopGraphXml(cleanCustomTitle);
  }

  // ============================================================================
  // 2. #53: HOW TO USE CLAUDE CODE + CODEX (Exact 1:1 Vector Twin of 53.png)
  // ============================================================================
  if (id === '53' && !items) {
    const hTitle = esc(cleanCustomTitle || 'How to use Claude Code + Codex');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_53_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FAFCFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FAFCFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <!-- Header -->
      <mxCell id="hdr53" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:38px;font-weight:900;color:#0F172A;letter-spacing:-0.5px;'&gt;How to use &lt;span style='color:#EA580C;'&gt;Claude Code&lt;/span&gt; + &lt;span style='color:#2563EB;'&gt;Codex&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:16px;color:#475569;margin-top:6px;font-weight:600;'&gt;Install the apps, add your tools, then check the result.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="22" width="1000" height="82" as="geometry"/></mxCell>

      <!-- SECTION 01: INSTALL + START -->
      <mxCell id="band53_1" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F4F8FF;strokeColor=#DBEAFE;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="35" y="118" width="1050" height="310" as="geometry"/></mxCell>
      <mxCell id="b53_01" value="01" style="ellipse;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontStyle=1;fontSize=16;" vertex="1" parent="1"><mxGeometry x="55" y="136" width="42" height="42" as="geometry"/></mxCell>
      <mxCell id="t53_01" value="INSTALL + START" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=19;fontColor=#1E40AF;" vertex="1" parent="1"><mxGeometry x="108" y="139" width="260" height="36" as="geometry"/></mxCell>
      <mxCell id="pill53_1" value="Codex leads. Claude Code advises." style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=18;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="230" y="175" width="660" height="44" as="geometry"/></mxCell>

      <mxCell id="c53_codex" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21px;font-weight:900;color:#1E3A8A;'&gt;⌘ Codex&lt;/div&gt;&lt;div style='font-size:14px;color:#334155;margin-top:8px;line-height:1.45;'&gt;1. Download Codex.&lt;br/&gt;2. Sign in with ChatGPT.&lt;/div&gt;&lt;div style='font-size:13px;color:#64748B;margin-top:8px;'&gt;Your main app for the work.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="70" y="238" width="300" height="165" as="geometry"/></mxCell>
      <mxCell id="c53_proj" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#1D4ED8;'&gt;Open a project&lt;/div&gt;&lt;div style='font-size:14px;color:#334155;margin-top:8px;line-height:1.45;'&gt;3. Select your folder.&lt;br/&gt;4. Start a new task.&lt;/div&gt;&lt;div style='font-size:13px;color:#64748B;margin-top:8px;'&gt;Add your goal + files.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="420" y="238" width="280" height="165" as="geometry"/></mxCell>
      <mxCell id="c53_claude" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#1E3A8A;'&gt;✻ Claude Code&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:8px;line-height:1.4;'&gt;1. Install the Claude app.&lt;br/&gt;2. Sign in → Code tab.&lt;br/&gt;3. Select the same folder.&lt;/div&gt;&lt;div style='font-size:12.5px;color:#64748B;margin-top:6px;'&gt;Optional backup for advice.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="750" y="238" width="300" height="165" as="geometry"/></mxCell>

      <mxCell id="e53_1a" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="c53_codex" target="c53_proj"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_1b" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2;dashed=1;startArrow=block;endArrow=block;" edge="1" parent="1" source="c53_proj" target="c53_claude"><mxGeometry relative="1" as="geometry"/></mxCell>

      <!-- SECTION 02: ADD YOUR TOOLS -->
      <mxCell id="band53_2" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F8F7FF;strokeColor=#E0E7FF;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="35" y="450" width="1050" height="430" as="geometry"/></mxCell>
      <mxCell id="b53_02" value="02" style="ellipse;whiteSpace=wrap;html=1;fillColor=#4F46E5;strokeColor=#4F46E5;fontColor=#FFFFFF;fontStyle=1;fontSize=16;" vertex="1" parent="1"><mxGeometry x="55" y="468" width="42" height="42" as="geometry"/></mxCell>
      <mxCell id="t53_02" value="ADD YOUR TOOLS" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=19;fontColor=#1E40AF;" vertex="1" parent="1"><mxGeometry x="108" y="471" width="260" height="36" as="geometry"/></mxCell>

      <mxCell id="q53_app" value="Need to work inside another app?" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=18;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="290" y="505" width="540" height="46" as="geometry"/></mxCell>
      <mxCell id="e53_p2q" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="c53_proj" target="q53_app"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="c53_files" value="&lt;div style='padding:14px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#1E40AF;'&gt;Files + skills&lt;/div&gt;&lt;div style='font-size:14px;color:#334155;margin-top:10px;line-height:1.5;'&gt;1. Open your folder.&lt;br/&gt;2. Install a skill plugin.&lt;br/&gt;3. Start a new task.&lt;br/&gt;Use its saved steps.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="70" y="600" width="275" height="210" as="geometry"/></mxCell>

      <mxCell id="q53_conn" value="Is there a suitable tool connection?" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=17;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="450" y="595" width="590" height="44" as="geometry"/></mxCell>

      <mxCell id="c53_mcp" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#1E40AF;'&gt;MCP / plugin&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:8px;line-height:1.45;'&gt;1. Plugins → install.&lt;br/&gt;2. Connect your account.&lt;/div&gt;&lt;div style='font-size:12px;color:#64748B;margin-top:6px;'&gt;Manual MCP: Settings →&lt;br/&gt;MCP servers → Add server.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="385" y="685" width="310" height="160" as="geometry"/></mxCell>
      <mxCell id="c53_cu" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#1E40AF;'&gt;Computer use&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:8px;line-height:1.45;'&gt;1. Ask for computer use.&lt;br/&gt;2. Allow the app.&lt;/div&gt;&lt;div style='font-size:12px;color:#64748B;margin-top:6px;'&gt;3. Enable screen recording&lt;br/&gt;+ accessibility on Mac.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="740" y="685" width="310" height="160" as="geometry"/></mxCell>

      <mxCell id="e53_q1_no" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="q53_app" target="c53_files"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_q1_yes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="q53_app" target="q53_conn"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_q2_yes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="q53_conn" target="c53_mcp"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_q2_no" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="q53_conn" target="c53_cu"><mxGeometry relative="1" as="geometry"/></mxCell>

      <!-- SECTION 03: CHECK IT -->
      <mxCell id="band53_3" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F4F8FF;strokeColor=#DBEAFE;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="35" y="905" width="1050" height="390" as="geometry"/></mxCell>
      <mxCell id="b53_03" value="03" style="ellipse;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontStyle=1;fontSize=16;" vertex="1" parent="1"><mxGeometry x="55" y="925" width="42" height="42" as="geometry"/></mxCell>
      <mxCell id="t53_03" value="CHECK IT" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=19;fontColor=#1E40AF;" vertex="1" parent="1"><mxGeometry x="108" y="928" width="260" height="36" as="geometry"/></mxCell>

      <mxCell id="q53_brief" value="Does the result meet the brief?" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=18;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="290" y="965" width="540" height="46" as="geometry"/></mxCell>
      <mxCell id="e53_m2b" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="c53_mcp" target="q53_brief"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="c53_adv" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:19px;font-weight:900;color:#1E40AF;'&gt;Claude Code advises&lt;/div&gt;&lt;div style='font-size:14px;color:#475569;margin-top:8px;line-height:1.45;'&gt;Open the same project.&lt;br/&gt;Review what went wrong.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="70" y="1065" width="295" height="130" as="geometry"/></mxCell>
      <mxCell id="c53_fix" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:19px;font-weight:900;color:#1E40AF;'&gt;Codex fixes + tests&lt;/div&gt;&lt;div style='font-size:14px;color:#475569;margin-top:8px;line-height:1.45;'&gt;Apply useful advice.&lt;br/&gt;Test the finished result.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="415" y="1065" width="295" height="130" as="geometry"/></mxCell>
      <mxCell id="c53_dec" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21px;font-weight:900;color:#FFFFFF;'&gt;You decide&lt;/div&gt;&lt;div style='font-size:14px;color:#CBD5E1;margin-top:8px;line-height:1.45;'&gt;Inspect the result.&lt;br/&gt;Approve when ready.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#0B132B;strokeColor=#0B132B;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="760" y="1065" width="295" height="130" as="geometry"/></mxCell>

      <mxCell id="e53_b_no" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="q53_brief" target="c53_adv"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_b_yes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="q53_brief" target="c53_dec"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_af" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="c53_adv" target="c53_fix"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_recheck" value="RECHECK" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#1E40AF;strokeWidth=2;endArrow=block;exitX=0.5;exitY=1;entryX=1;entryY=0.5;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=12;fontColor=#334155;" edge="1" parent="1" source="c53_fix" target="q53_brief"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="562" y="1245"/><mxPoint x="1070" y="1245"/><mxPoint x="1070" y="988"/></Array></mxGeometry></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 3. #54: GPT-6 ASTRA COMPUTER USE CHEAT SHEET (Exact 1:1 Vector Twin of 54.png)
  // ============================================================================
  if (id === '54' && !items) {
    const hTitle = esc(cleanCustomTitle || 'GPT-6 Astra Computer Use');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_54_${level}" name="${hTitle}"><mxGraphModel dx="1140" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1140" pageHeight="1340" background="#FAFCFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FAFCFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1140" height="1340" as="geometry"/></mxCell>
      <!-- Header -->
      <mxCell id="hdr54" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:42px;font-weight:900;color:#0F172A;letter-spacing:-0.8px;'&gt;GPT-6 Astra &lt;span style='color:#2563EB;'&gt;Computer Use&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:18px;color:#475569;margin-top:6px;font-weight:500;'&gt;Set it up on a Mac, then copy four prompts that do real work.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="35" y="20" width="1060" height="84" as="geometry"/></mxCell>

      <!-- LEFT COLUMN: Start using it (Steps 01 - 07) -->
      <mxCell id="col54_L" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="35" y="120" width="515" height="925" as="geometry"/></mxCell>
      <mxCell id="hdr54_L" value="Start using it" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=24;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="58" y="138" width="320" height="36" as="geometry"/></mxCell>

      <mxCell id="s54_1" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#DBEAFE;color:#2563EB;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;01&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Open Codex&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Choose GPT-6 Astra in a desktop task, if available.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="185" width="470" height="68" as="geometry"/></mxCell>

      <mxCell id="s54_2" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#DBEAFE;color:#2563EB;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;02&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Install Computer Use&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Plugins → Computer Use; enable server and skill, then select Try now.&lt;/div&gt;&lt;div style='margin-left:38px;margin-top:8px;'&gt;&lt;span style='font-size:12px;font-weight:700;color:#334155;margin-right:12px;'&gt;Server ●&lt;/span&gt;&lt;span style='font-size:12px;font-weight:700;color:#334155;margin-right:12px;'&gt;Skill ●&lt;/span&gt;&lt;span style='background:#F3E8FF;color:#6B21A8;padding:3px 12px;border-radius:6px;font-size:12px;font-weight:700;'&gt;Try now&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="268" width="470" height="105" as="geometry"/></mxCell>

      <mxCell id="s54_3" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#DBEAFE;color:#2563EB;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;03&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Grant Mac permissions&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Allow Screen Recording to see, and Accessibility to click and type.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="390" width="470" height="72" as="geometry"/></mxCell>

      <mxCell id="s54_4" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#DBEAFE;color:#2563EB;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;04&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Connect Chrome&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Settings → Computer Use → Chrome; install the extension and confirm Manage.&lt;/div&gt;&lt;div style='margin-left:38px;margin-top:8px;'&gt;&lt;span style='background:#EFF6FF;color:#1E3A8A;padding:4px 40px 4px 12px;border-radius:6px;font-size:12px;font-weight:700;margin-right:8px;'&gt;Chrome&lt;/span&gt;&lt;span style='background:#F3E8FF;color:#6B21A8;padding:4px 14px;border-radius:6px;font-size:12px;font-weight:700;'&gt;Manage&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="478" width="470" height="110" as="geometry"/></mxCell>

      <mxCell id="s54_5" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#EDE9FE;color:#6D28D9;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;05&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Point it at the work&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Mention @Chrome or an app, then describe the result you want.&lt;/div&gt;&lt;div style='margin-left:38px;margin-top:8px;background:#F8FAFC;border:1px solid #E2E8F0;padding:8px 12px;border-radius:8px;font-size:12.5px;color:#334155;'&gt;&lt;span style='background:#EDE9FE;color:#5B21B6;padding:2px 8px;border-radius:6px;font-weight:700;margin-right:6px;'&gt;@Chrome&lt;/span&gt; Compare these three suppliers.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="604" width="470" height="125" as="geometry"/></mxCell>

      <mxCell id="s54_6" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#EDE9FE;color:#6D28D9;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;06&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Approve access&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Allow the relevant app or website when prompted.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="745" width="470" height="70" as="geometry"/></mxCell>

      <mxCell id="s54_7" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;span style='background:#EDE9FE;color:#6D28D9;padding:3px 8px;border-radius:6px;font-weight:800;font-size:13px;margin-right:8px;'&gt;07&lt;/span&gt;&lt;b style='font-size:16px;color:#0F172A;'&gt;Sign in yourself&lt;/b&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-left:38px;margin-top:4px;'&gt;Complete the login, let it continue, then inspect the result.&lt;/div&gt;&lt;div style='font-size:12px;color:#94A3B8;margin-top:16px;'&gt;Availability depends on rollout and workspace settings.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="58" y="830" width="470" height="100" as="geometry"/></mxCell>

      <!-- Bottom-Left: Try this prompt -->
      <mxCell id="try54_hdr" value="Try this prompt" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=17;fontColor=#2563EB;" vertex="1" parent="1"><mxGeometry x="42" y="1062" width="240" height="28" as="geometry"/></mxCell>
      <mxCell id="try54_box" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;font-size:14px;color:#334155;line-height:1.5;'&gt;Use &lt;b&gt;[app or page]&lt;/b&gt; to achieve &lt;b&gt;[result]&lt;/b&gt;.&lt;br/&gt;Use an available plugin for the work it supports, then Computer Use for remaining steps and visual checks. Preserve &lt;b&gt;[constraints]&lt;/b&gt;, check against &lt;b&gt;[success criteria]&lt;/b&gt;, and show me the result.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="35" y="1095" width="515" height="205" as="geometry"/></mxCell>
      <mxCell id="try54_btn" value="↑" style="ellipse;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontStyle=1;fontSize=18;" vertex="1" parent="1"><mxGeometry x="495" y="1245" width="40" height="40" as="geometry"/></mxCell>

      <!-- RIGHT COLUMN: Four jobs to start with -->
      <mxCell id="hdr54_R" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:24px;font-weight:900;color:#0F172A;'&gt;Four jobs to start with&lt;/div&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-top:4px;'&gt;Example apps; available plugins vary by workspace.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="580" y="120" width="525" height="60" as="geometry"/></mxCell>

      <mxCell id="ban54_R" value="&lt;div style='padding:12px 16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;'&gt;Plugin → Computer Use → Check&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;Use a plugin where one exists, then Computer Use for the remaining steps and visual checks.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#DBEAFE;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="580" y="190" width="525" height="92" as="geometry"/></mxCell>

      <mxCell id="job54_1" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:17px;font-weight:800;color:#0F172A;'&gt;● &lt;span style='background:#0EA5E9;color:#FFF;padding:2px 6px;border-radius:4px;font-size:11px;margin-right:6px;'&gt;xero&lt;/span&gt; Accounts: match invoices&lt;/div&gt;&lt;div style='background:#F1F5F9;padding:12px;border-radius:8px;font-size:13.5px;color:#334155;margin-top:10px;line-height:1.45;'&gt;@Chrome Compare these invoices with my purchase-order list. Flag unmatched invoices, duplicate invoice numbers and total mismatches in a review table.&lt;/div&gt;&lt;div style='font-size:12px;color:#64748B;margin-top:8px;'&gt;Done when every invoice is matched or flagged for review.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="580" y="302" width="525" height="230" as="geometry"/></mxCell>

      <mxCell id="job54_2" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:17px;font-weight:800;color:#0F172A;'&gt;● &lt;span style='background:#EA4335;color:#FFF;padding:2px 6px;border-radius:4px;font-size:11px;margin-right:6px;'&gt;M&lt;/span&gt; Sales: draft follow-ups&lt;/div&gt;&lt;div style='background:#F1F5F9;padding:12px;border-radius:8px;font-size:13.5px;color:#334155;margin-top:10px;line-height:1.45;'&gt;@Chrome Open the five Gmail threads I've tagged. Draft a follow-up for each in my usual tone, under 90 words. Leave them all unsent.&lt;/div&gt;&lt;div style='font-size:12px;color:#64748B;margin-top:8px;'&gt;Done when five drafts sit unsent, each under 90 words.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="580" y="552" width="525" height="230" as="geometry"/></mxCell>

      <mxCell id="job54_3" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:17px;font-weight:800;color:#0F172A;'&gt;● &lt;span style='background:#16A34A;color:#FFF;padding:2px 6px;border-radius:4px;font-size:11px;margin-right:6px;'&gt;⊞&lt;/span&gt; Research: compare suppliers&lt;/div&gt;&lt;div style='background:#F1F5F9;padding:12px;border-radius:8px;font-size:13.5px;color:#334155;margin-top:10px;line-height:1.45;'&gt;@Chrome Open these three supplier pages. Build a table of price, lead time and returns policy. Note anything the page does not state.&lt;/div&gt;&lt;div style='font-size:12px;color:#64748B;margin-top:8px;'&gt;Done when every cell is filled or marked as not stated.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="580" y="802" width="525" height="230" as="geometry"/></mxCell>

      <mxCell id="job54_4" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:17px;font-weight:800;color:#0F172A;'&gt;● &lt;span style='background:#7C3AED;color:#FFF;padding:2px 6px;border-radius:4px;font-size:11px;margin-right:6px;'&gt;Figma&lt;/span&gt; Design: update a deck&lt;/div&gt;&lt;div style='background:#F1F5F9;padding:12px;border-radius:8px;font-size:13.5px;color:#334155;margin-top:10px;line-height:1.45;'&gt;@Figma Open my deck template. Apply the copy in my brief to slides 3 to 7, keep my type styles, and show me each slide before you move on.&lt;/div&gt;&lt;div style='font-size:12px;color:#64748B;margin-top:8px;'&gt;Done when slides 3 to 7 have changed and the type styles are untouched.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="580" y="1052" width="525" height="248" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 4. #55: THE AI NOBODY SIGNED OFF (Exact 1:1 Vector Twin of 55.png)
  // ============================================================================
  if (id === '55' && !items) {
    const hTitle = esc(cleanCustomTitle || 'The AI Nobody Signed Off');
    const rightBubbles = [
      { label: 'A dashboard&lt;br/&gt;nobody owns', x: 425, y: 265, w: 165, h: 165, stroke: '#93C5FD', iconBg: '#DBEAFE', icon: '📊' },
      { label: 'A fraud&lt;br/&gt;check', x: 605, y: 220, w: 110, h: 110, stroke: '#93C5FD', iconBg: '#DBEAFE', icon: '🛡' },
      { label: 'A script on a&lt;br/&gt;laptop', x: 725, y: 200, w: 145, h: 145, stroke: '#FDBA74', iconBg: '#FFEDD5', icon: '💻' },
      { label: 'An extension someone&lt;br/&gt;installed', x: 875, y: 270, w: 215, h: 215, stroke: '#FDBA74', iconBg: '#FFEDD5', icon: '🔌' },
      { label: 'A lead scorer', x: 540, y: 385, width: 145, height: 145, x2: 540, y2: 385, w: 145, h: 145, stroke: '#86EFAC', iconBg: '#DCFCE7', icon: '🎯' },
      { label: 'An SEO writer', x: 695, y: 350, w: 150, h: 150, stroke: '#93C5FD', iconBg: '#DBEAFE', icon: '🌐' },
      { label: 'A site&lt;br/&gt;recommender', x: 390, y: 465, w: 170, h: 170, stroke: '#86EFAC', iconBg: '#DCFCE7', icon: '👍' },
      { label: 'An interview&lt;br/&gt;booker', x: 665, y: 505, w: 150, h: 150, stroke: '#86EFAC', iconBg: '#DCFCE7', icon: '📅' },
      { label: 'A ticket&lt;br/&gt;router', x: 825, y: 545, w: 120, h: 120, stroke: '#93C5FD', iconBg: '#DBEAFE', icon: '⇄' },
      { label: 'A social&lt;br/&gt;scheduler', x: 955, y: 515, w: 135, h: 135, stroke: '#FDBA74', iconBg: '#FFEDD5', icon: '📢' },
      { label: 'Auto-replies in&lt;br/&gt;support', x: 515, y: 590, w: 165, h: 165, stroke: '#D8B4FE', iconBg: '#F3E8FF', icon: '↩' },
      { label: 'A code&lt;br/&gt;assistant', x: 380, y: 655, w: 140, h: 140, stroke: '#86EFAC', iconBg: '#DCFCE7', icon: '&lt;/&gt;' },
      { label: 'A meeting&lt;br/&gt;notetaker', x: 705, y: 655, w: 140, h: 140, stroke: '#93C5FD', iconBg: '#DBEAFE', icon: '🎙' },
      { label: 'A personal account,&lt;br/&gt;logged in', x: 875, y: 655, w: 210, h: 210, stroke: '#FCD34D', iconBg: '#FEF3C7', icon: '🔑' },
      { label: 'AI inside the&lt;br/&gt;CRM', x: 435, y: 775, w: 155, h: 155, stroke: '#D8B4FE', iconBg: '#F3E8FF', icon: '⊞' },
      { label: 'A CV screener', x: 595, y: 745, w: 155, h: 155, stroke: '#FCD34D', iconBg: '#FEF3C7', icon: '👤' },
      { label: 'A website&lt;br/&gt;chatbot', x: 705, y: 875, w: 130, h: 130, stroke: '#FDBA74', iconBg: '#FFEDD5', icon: '💬' },
      { label: 'A forecasting&lt;br/&gt;model', x: 850, y: 865, w: 160, h: 160, stroke: '#FDBA74', iconBg: '#FFEDD5', icon: '📈' },
      { label: 'A trial nobody&lt;br/&gt;cancelled', x: 380, y: 940, w: 160, h: 160, stroke: '#86EFAC', iconBg: '#DCFCE7', icon: '🕒' },
      { label: 'A refund&lt;br/&gt;approver', x: 575, y: 945, w: 145, h: 145, stroke: '#FCD34D', iconBg: '#FEF3C7', icon: '💳' },
      { label: 'An image&lt;br/&gt;generator', x: 765, y: 995, w: 140, h: 140, stroke: '#FCD34D', iconBg: '#FEF3C7', icon: '🖼' },
      { label: 'A translation&lt;br/&gt;tool', x: 910, y: 1015, w: 140, h: 140, stroke: '#FCD34D', iconBg: '#FEF3C7', icon: '文A' },
      { label: 'A legal doc&lt;br/&gt;summariser', x: 475, y: 1075, w: 155, h: 155, stroke: '#D8B4FE', iconBg: '#F3E8FF', icon: '📄' },
      { label: 'Something a&lt;br/&gt;contractor built', x: 640, y: 1100, w: 180, h: 180, stroke: '#D8B4FE', iconBg: '#F3E8FF', icon: '🏷' },
    ];
    let bXml = '';
    rightBubbles.forEach((b, i) => {
      bXml += `<mxCell id="b55_${i}" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:inline-block;background:${b.iconBg};padding:5px 8px;border-radius:8px;font-size:13px;font-weight:800;color:#0F172A;margin-bottom:5px;'&gt;${b.icon}&lt;/div&gt;&lt;div style='font-size:12.5px;font-weight:800;color:#1E293B;line-height:1.25;'&gt;${b.label}&lt;/div&gt;&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${b.stroke};strokeWidth=2.5;" vertex="1" parent="1"><mxGeometry x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" as="geometry"/></mxCell>`;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_55_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FAFCFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FAFCFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr55" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:44px;font-weight:900;color:#0F172A;letter-spacing:-0.8px;'&gt;The AI Nobody &lt;span style='color:#60A5FA;'&gt;Signed Off&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:17px;color:#475569;margin-top:6px;font-weight:600;'&gt;Inside a company that thinks it has four tools&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="22" width="1000" height="86" as="geometry"/></mxCell>

      <mxCell id="pil55_L" value="What Leadership Thinks" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="60" y="135" width="280" height="44" as="geometry"/></mxCell>
      <mxCell id="pil55_R" value="What Is Actually Running" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="580" y="135" width="295" height="44" as="geometry"/></mxCell>

      <!-- Left Leadership Persona & 4 Quotes -->
      <mxCell id="sp55_1" value="&amp;ldquo;We use&lt;br/&gt;one AI tool.&amp;rdquo;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=2;fontStyle=1;fontSize=16;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="180" y="235" width="185" height="125" as="geometry"/></mxCell>
      <mxCell id="exec55" value="&lt;div style='text-align:center;padding:12px;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:46px;'&gt;👔&lt;/div&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;Executive Leadership&lt;/div&gt;&lt;div style='font-size:11.5px;color:#64748B;'&gt;Assumes 4 sanctioned tools&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="45" y="340" width="185" height="190" as="geometry"/></mxCell>

      <mxCell id="q55_2" value="&amp;ldquo;IT approved&lt;br/&gt;it.&amp;rdquo;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=2.5;fontStyle=1;fontSize=15;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="75" y="675" width="150" height="150" as="geometry"/></mxCell>
      <mxCell id="q55_3" value="&amp;ldquo;We have a&lt;br/&gt;policy.&amp;rdquo;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=2.5;fontStyle=1;fontSize=15;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="170" y="885" width="155" height="155" as="geometry"/></mxCell>
      <mxCell id="q55_4" value="&amp;ldquo;It is just a&lt;br/&gt;chatbot.&amp;rdquo;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=2.5;fontStyle=1;fontSize=15;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="100" y="1090" width="155" height="155" as="geometry"/></mxCell>

      ${bXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 5. #56: SIDE-BY-SIDE COMPARISON (Exact 1:1 Vector Twin of 56.png)
  // ============================================================================
  if (id === '56' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Side-by-Side Comparison');
    const rows = [
      { code: '01', cat: 'STATE PERSISTENCE', lTitle: '01 Stateless Runs', lPill: 'MANUAL / EPHEMERAL', lDesc: 'Requires custom database pipelines and manual state tracking for every conversation thread.', rTitle: '01 Persistent State', rPill: 'BUILT-IN / MANAGED', rDesc: 'Automatically tracks, persists, and manages conversation history and context windows securely.' },
      { code: '02', cat: 'SECURITY &amp; SANDBOXING', lTitle: '02 Local Execution', lPill: 'UNSANDBOXED', lDesc: 'Executing code from tool outputs runs directly on your host environment, risking security exposure.', rTitle: '02 Sandbox Execution', rPill: 'SECURE VPC / ISOLATED', rDesc: 'Safely runs code and scripts inside isolated VPC GKE containers, blocked from accessing host resources.' },
      { code: '03', cat: 'INFORMATION GROUNDING', lTitle: '03 Raw Model Knowledge', lPill: 'STATIC / MANUALLY GROUNDED', lDesc: 'Requires manual RAG pipelines, chunking, embedding, and vector databases to prevent hallucinations.', rTitle: '03 Grounding Engine', rPill: 'NATIVE RAG &amp; SEARCH', rDesc: 'Direct, secure ingestion from BigQuery, AlloyDB, Google Search, and enterprise datastores out-of-the-box.' },
      { code: '04', cat: 'GOVERNANCE &amp; CONTROL', lTitle: '04 Custom Rails', lPill: 'HARDCODED CODE', lDesc: 'Needs custom code for safety filters, error-handling retry loops, and human-in-the-loop prompts.', rTitle: '04 Managed Guardrails', rPill: 'PROGRAMMATIC POLICY', rDesc: 'Native safety filtering, programmatic organizational policy checks, and Human-in-the-Loop approval workflows.' },
      { code: '05', cat: 'INTEGRATION ECOSYSTEM', lTitle: '05 Fragmented Glue', lPill: 'CUSTOM PIPELINES', lDesc: 'Heavy integration required to connect API calls to cloud services, databases, and enterprise access.', rTitle: '05 First-Party Integrations', rPill: 'GOOGLE NATIVE', rDesc: 'Native, out-of-the-box IAM security, Cloud Pub/Sub, Cloud Logging, Workspace tools, and API gateway.' }
    ];
    let cells = '';
    rows.forEach((r, idx) => {
      const y = 248 + idx * 186;
      cells += `
        <mxCell id="cat56_${idx}" value="${r.cat}" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=14;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="380" y="${y - 28}" width="360" height="24" as="geometry"/></mxCell>
        <mxCell id="L56_${idx}" value="&lt;div style='padding:12px 14px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:17px;font-weight:900;color:#0F172A;'&gt;${r.lTitle}&lt;/span&gt;&lt;span style='background:#94A3B8;color:#FFF;padding:3px 12px;border-radius:999px;font-size:11px;font-weight:800;'&gt;○ OFF&lt;/span&gt;&lt;/div&gt;&lt;div style='display:inline-block;background:#334155;color:#FFF;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:800;margin-top:4px;'&gt;${r.lPill}&lt;/div&gt;&lt;div style='font-size:13px;color:#334155;margin-top:8px;line-height:1.4;'&gt;${r.lDesc}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="45" y="${y}" width="465" height="142" as="geometry"/></mxCell>
        <mxCell id="M56_${idx}" value="${r.code}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=2;fontStyle=1;fontSize=16;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="536" y="${y + 46}" width="48" height="48" as="geometry"/></mxCell>
        <mxCell id="R56_${idx}" value="&lt;div style='padding:12px 14px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:17px;font-weight:900;color:#0F172A;'&gt;${r.rTitle}&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:3px 12px;border-radius:999px;font-size:11px;font-weight:800;'&gt;● ON&lt;/span&gt;&lt;/div&gt;&lt;div style='display:inline-block;background:#0D9488;color:#FFF;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:800;margin-top:4px;'&gt;${r.rPill}&lt;/div&gt;&lt;div style='font-size:13px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${r.rDesc}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="610" y="${y}" width="465" height="142" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_56_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr56" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;font-weight:800;color:#475569;'&gt;☁ Google Cloud&lt;/div&gt;&lt;div style='font-size:40px;font-weight:900;color:#0F172A;margin-top:4px;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:24px;font-weight:600;color:#1E293B;margin-top:4px;'&gt;Raw Gemini API vs. Vertex AI Agent Engine&lt;/div&gt;&lt;div style='font-size:14px;color:#475569;margin-top:6px;'&gt;Comparing stateless model inference with a fully managed, enterprise grade agent runtime&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="45" y="18" width="1030" height="135" as="geometry"/></mxCell>
      <mxCell id="pil56_L" value="Raw Gemini API" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="155" y="168" width="245" height="42" as="geometry"/></mxCell>
      <mxCell id="pil56_R" value="Vertex AI Agent Engine" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0D9488;strokeColor=#0F766E;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="710" y="168" width="275" height="42" as="geometry"/></mxCell>
      ${cells}
      <mxCell id="tk56" value="&lt;div style='padding:12px 18px;text-align:left;font-family:Inter,sans-serif;font-size:13.5px;color:#0F172A;'&gt;&lt;b&gt;TAKEAWAY:&lt;/b&gt; While the Raw Gemini API excels at rapid prototyping and stateless prompts, &lt;b style='color:#0D9488;'&gt;Vertex AI Agent Engine&lt;/b&gt; provides the mandatory sandboxing, persistent state, and native grounding required for production enterprise agents.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="45" y="1190" width="1030" height="72" as="geometry"/></mxCell>
      <mxCell id="ftr56" value="GOOGLE CLOUD ENTERPRISE AI GUIDE • VERTEX AI AGENT ENGINE • REVISION 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 6. #57: FUNNEL PIPELINE DIAGRAM (Exact 1:1 Vector Twin of 57.png)
  // ============================================================================
  if (id === '57' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Funnel Pipeline Diagram');
    const stages = [
      { code: '01', title: 'RAW INGESTION', vol: '1M Tokens • 100% Volume', desc: 'Unfiltered input: raw docs, logs, repositories, and workspace history.', chip: 'RAW DATA', drop: '▼ 75% DISCARDED', fill: '#3B82F6', txt: '#FFFFFF', w: 760, y: 215 },
      { code: '02', title: 'METADATA FILTER', vol: '250k Tokens • 25% Remaining', desc: 'Heuristic, date, and keyword (BM25) search &amp; filtering.', chip: 'METADATA', drop: '▼ 80% DISCARDED', fill: '#EF4444', txt: '#FFFFFF', w: 650, y: 400 },
      { code: '03', title: 'BIGQUERY VECTOR SEARCH', vol: '50k Tokens • 5% Remaining', desc: 'Embeddings, cosine similarity, &amp; database/vector RAG retrieval.', chip: 'VECTOR SEARCH', drop: '▼ 80% DISCARDED', fill: '#FACC15', txt: '#0F172A', w: 540, y: 585 },
      { code: '04', title: 'CROSS-ENCODER RE-RANKING', vol: '10k Tokens • 1% Remaining', desc: 'Deep transformer scoring &amp; cross-encoder relevancy evaluation.', chip: 'RE-RANKED', drop: '▼ 80% DISCARDED', fill: '#22C55E', txt: '#FFFFFF', w: 430, y: 770 },
      { code: '05', title: 'GEMINI IN-CONTEXT WINDOW', vol: '2k Tokens • 0.2% Remaining', desc: 'High-value, exact-context chunks inserted into prompt/model context.', chip: 'GEMINI 1.5 PRO', drop: 'OPTIMAL CONTEXT', fill: '#2563EB', txt: '#FFFFFF', w: 330, y: 955 }
    ];
    let fXml = '';
    stages.forEach((s, i) => {
      const x = Math.round((1120 - s.w) / 2);
      fXml += `
        <mxCell id="f57_${i}" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;color:${s.txt};'&gt;&lt;div style='font-size:17px;font-weight:900;'&gt;${s.code} | ${s.title} &amp;nbsp;&lt;span style='background:#FFFFFF;color:#0F172A;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:800;'&gt;${s.vol}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12.5px;margin-top:6px;opacity:0.95;'&gt;${s.desc}&lt;/div&gt;&lt;div style='margin-top:8px;font-size:11px;'&gt;Tactile UI Chip: &lt;span style='background:rgba(255,255,255,0.25);border:1px solid ${s.txt};padding:2px 8px;border-radius:6px;font-weight:800;'&gt;${s.chip}&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=${s.fill};strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="${x}" y="${s.y}" width="${s.w}" height="150" as="geometry"/></mxCell>
        <mxCell id="d57_${i}" value="${s.drop}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=20;fillColor=#DC2626;strokeColor=#991B1B;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" vertex="1" parent="1"><mxGeometry x="${x + s.w + 20}" y="${s.y + 115}" width="125" height="32" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_57_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr57" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:#475569;padding:0 20px;'&gt;&lt;span&gt;☁ Google Cloud&lt;/span&gt;&lt;span style='color:#2563EB;'&gt;✦ + Gemini&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:42px;font-weight:900;color:#0F172A;margin-top:4px;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:17px;color:#475569;margin-top:4px;'&gt;Context compression and progressive token refinement on Google Cloud&lt;/div&gt;&lt;div style='font-size:14px;font-weight:800;color:#0F172A;margin-top:12px;'&gt;TIERS&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="50" y="20" width="1020" height="175" as="geometry"/></mxCell>
      <mxCell id="axL57" value="&lt;div style='writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:#0F172A;letter-spacing:0.6px;white-space:nowrap;'&gt;Increasing Context Signal &amp;amp; Density  •  Filtering out irrelevant noise&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="45" y="240" width="48" height="840" as="geometry"/></mxCell>
      <mxCell id="axR57" value="&lt;div style='writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:#0F172A;letter-spacing:0.8px;white-space:nowrap;'&gt;PERCENTAGE DROP-OFFS&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="1030" y="240" width="44" height="840" as="geometry"/></mxCell>
      ${fXml}
      <mxCell id="tk57" value="&lt;div style='padding:12px 18px;text-align:center;font-family:Inter,sans-serif;font-size:13.5px;color:#0F172A;'&gt;&lt;b&gt;WHY IT MATTERS:&lt;/b&gt; Ingestion-level filtering avoids token bloat, reduces model prompt hallucination, and unlocks performant, sub-second Gemini responses.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="80" y="1165" width="960" height="68" as="geometry"/></mxCell>
      <mxCell id="ftr57" value="GOOGLE CLOUD ARCHITECTURE GUIDE • GOOGLE CLOUD &amp; GEMINI • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 7. #58: PROCESS LIST / CHECKLIST (Exact 1:1 Vector Twin of 58.png)
  // ============================================================================
  if (id === '58' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Process List / Checklist');
    const list = [
      { code: '01', title: 'Define Mission &amp; Scope', badge: 'DEFINED', pillCol: '#22C55E', numCol: '#EF4444', desc: 'Establish the exact tasks, constraints, and success boundaries.', tag: 'goal_check: SUCCESS&lt;br/&gt;retry_limit: 3' },
      { code: '02', title: 'Configure API Gateway &amp; Ingress', badge: 'CONNECTED', pillCol: '#3B82F6', numCol: '#F97316', desc: 'Set up the Google Cloud API gateway and authenticate client requests.', tag: 'HTTPS_Ingress&lt;br/&gt;Auth / Rate Limit' },
      { code: '03', title: 'Establish Sandboxed GKE Cluster', badge: 'ISOLATED', pillCol: '#22C55E', numCol: '#EAB308', desc: 'Provision an isolated GKE cluster with gVisor sandbox runtimes for safe tool use.', tag: 'VPC Sandbox&lt;br/&gt;gVisor Containers' },
      { code: '04', title: 'Enable Memory &amp; Persistent State', badge: 'PERSISTENT', pillCol: '#38BDF8', numCol: '#22C55E', desc: 'Connect AlloyDB to log episodic memory and task session state securely.', tag: 'AlloyDB DB_adapter&lt;br/&gt;Task Logs' },
      { code: '05', title: 'Integrate HIL Validation Loop', badge: 'GATEWAY', pillCol: '#64748B', numCol: '#3B82F6', desc: 'Establish Human-in-the-Loop breakpoints for validation failures.', tag: 'HITL Breakpoint&lt;br/&gt;Retry Loops' },
      { code: '06', title: 'Deploy to Vertex AI Run', badge: 'DEPLOYED', pillCol: '#16A34A', numCol: '#EF4444', desc: 'Release the validated agent workflow into Vertex AI reasoning engines.', tag: 'live_agent_run&lt;br/&gt;GCP PubSub' }
    ];
    let lXml = '';
    list.forEach((it, i) => {
      const y = 185 + i * 162;
      lXml += `
        <mxCell id="n58_${i}" value="${it.code}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${it.numCol};strokeColor=#0F172A;strokeWidth=2;fontColor=#FFFFFF;fontStyle=1;fontSize=24;" vertex="1" parent="1"><mxGeometry x="60" y="${y + 22}" width="86" height="86" as="geometry"/></mxCell>
        <mxCell id="r58_${i}" value="&lt;div style='padding:14px 20px;text-align:left;font-family:Inter,sans-serif;display:flex;justify-content:space-between;align-items:center;'&gt;&lt;div style='max-width:540px;'&gt;&lt;div style='font-size:21px;font-weight:900;color:#0F172A;'&gt;${it.code} | ${it.title}&lt;/div&gt;&lt;div style='font-size:14.5px;color:#334155;margin-top:8px;line-height:1.4;'&gt;${it.desc}&lt;/div&gt;&lt;/div&gt;&lt;div style='text-align:right;'&gt;&lt;div style='margin-bottom:8px;'&gt;&lt;span style='background:${it.pillCol};color:#FFFFFF;padding:4px 14px;border-radius:999px;font-size:12px;font-weight:800;margin-right:10px;'&gt;${it.badge}&lt;/span&gt;&lt;span style='background:#22C55E;color:#FFFFFF;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:900;'&gt;● ON&lt;/span&gt;&lt;/div&gt;&lt;div style='background:#E2E8F0;border:1px solid #CBD5E1;padding:6px 12px;border-radius:8px;font-family:monospace;font-size:12.5px;color:#0F172A;font-weight:700;text-align:left;display:inline-block;'&gt;${it.tag}&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="170" y="${y}" width="890" height="134" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_58_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr58" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:44px;font-weight:900;color:#0F172A;'&gt;${hTitle}&lt;/span&gt;&lt;span style='font-size:20px;font-weight:800;color:#2563EB;'&gt;☁ ✦&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:18px;color:#334155;margin-top:6px;line-height:1.4;'&gt;The step-by-step blueprint to deploy and run secure&lt;br/&gt;autonomous agent workloads on Google Cloud&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="24" width="1000" height="135" as="geometry"/></mxCell>
      ${lXml}
      <mxCell id="tk58" value="&lt;div style='padding:12px 18px;text-align:left;font-family:Inter,sans-serif;font-size:14.5px;color:#0F172A;'&gt;&lt;b&gt;TAKEAWAY:&lt;/b&gt; Always sandbox execution tasks and apply native state persistence before moving to Production.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="60" y="1175" width="1000" height="64" as="geometry"/></mxCell>
      <mxCell id="ftr58" value="PROCESS LIST / CHECKLIST • GOOGLE CLOUD ENTERPRISE GUIDE • SEP 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 8. #59: TIMELINE & ROADMAP (Exact 1:1 Vector Twin of 59.png — 4 Horizontal Phase Tracks Q1-Q4)
  // ============================================================================
  if (id === '59' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Timeline & Roadmap');
    const tracks = [
      {
        q: 'Q1', phaseNum: 'PHASE 1', trackTitle: '01 | PHASE 1: DISCOVERY &amp; EVALUATION', rightTag: 'Q1 | Google Blue',
        bandFill: '#DBEAFE', bandStroke: '#60A5FA', badgeFill: '#2563EB',
        s1Num: '01', s1Pill: 'MAP ON', s1Title: '01 | Discover &amp; Map', s1Desc: '☑ Audit and map existing manual workflows, database schemas, and identify candidate agent targets.', s1Chip: 'Use-Case Mapping',
        s2Num: '02', s2Pill: 'KPIs SET', s2Title: '02 | Baseline &amp; Evaluate', s2Desc: '☑ Establish baseline performance metrics, success criteria, security compliance, and initial ROI goals.', s2Chip: 'Success Metrics'
      },
      {
        q: 'Q2', phaseNum: 'PHASE 2', trackTitle: '02 | PHASE 2: SECURE PROTOTYPING', rightTag: 'Q2 | Google Red',
        bandFill: '#FEE2E2', bandStroke: '#F87171', badgeFill: '#DC2626',
        s1Num: '03', s1Pill: 'DEVELOP', s1Title: '03 | Build Agent Core', s1Desc: '☑ Build core reasoning loops, define system prompts, and configure model temperature on Gemini 1.5.', s1Chip: 'Gemini Pro &amp; Flash',
        s2Num: '04', s2Pill: 'ISOLATED', s2Title: '04 | Sandbox Environment', s2Desc: '☑ Deploy task execution in isolated VPC microVMs or GKE private sandbox clusters using gVisor.', s2Chip: 'Secure Runtime'
      },
      {
        q: 'Q3', phaseNum: 'PHASE 3', trackTitle: '03 | PHASE 3: STATE &amp; GROUNDING', rightTag: 'Q3 | Google Yellow',
        bandFill: '#FEF3C7', bandStroke: '#FBBF24', badgeFill: '#EAB308',
        s1Num: '05', s1Pill: 'STATEFUL', s1Title: '05 | Persistent Memory', s1Desc: '☑ Wire up AlloyDB for PostgreSQL to persist conversation histories, session states, and episodic memory.', s1Chip: 'AlloyDB &amp; Memory',
        s2Num: '06', s2Pill: 'RAG ACTIVE', s2Title: '06 | Enterprise Grounding', s2Desc: '☑ Integrate BigQuery and Vertex AI Search to verify outputs against real-time enterprise dataset results.', s2Chip: 'Vector DB Grounding'
      },
      {
        q: 'Q4', phaseNum: 'PHASE 4', trackTitle: '04 | PHASE 4: GOVERNANCE &amp; DEPLOYMENT', rightTag: 'Q4 | Google Green',
        bandFill: '#DCFCE7', bandStroke: '#4ADE80', badgeFill: '#16A34A',
        s1Num: '07', s1Pill: 'VALIDATED', s1Title: '07 | Human-in-the-Loop', s1Desc: '☑ Incorporate strict policy filters, guardrails, and human check points for high-risk system actions.', s1Chip: 'Audit Checkpoints',
        s2Num: '08', s2Pill: 'DEPLOYED', s2Title: '08 | Production Release', s2Desc: '☑ Continuous monitoring, automated self-healing validation, retry limits, and GCP cloud logging integration.', s2Chip: 'Monitoring &amp; Scaling'
      }
    ];
    let tXml = '';
    tracks.forEach((t, i) => {
      const y = 210 + i * 232;
      const qTxtCol = i === 2 ? '#0F172A' : '#FFFFFF';
      tXml += `
        <mxCell id="tr59_${i}" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=5;fillColor=${t.bandFill};strokeColor=${t.bandStroke};strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="45" y="${y}" width="1030" height="212" as="geometry"/></mxCell>
        <mxCell id="th59_${i}_l" value="${t.trackTitle}" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=15.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="60" y="${y + 8}" width="620" height="28" as="geometry"/></mxCell>
        <mxCell id="th59_${i}_r" value="${t.rightTag}" style="text;html=1;align=right;verticalAlign=middle;fontStyle=1;fontSize=14.5;fontColor=${t.badgeFill};" vertex="1" parent="1"><mxGeometry x="780" y="${y + 8}" width="275" height="28" as="geometry"/></mxCell>
        <mxCell id="qb59_${i}" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;color:${qTxtCol};'&gt;&lt;div style='font-size:13px;font-weight:800;'&gt;${t.phaseNum}&lt;/div&gt;&lt;div style='font-size:40px;font-weight:900;line-height:1.05;'&gt;${t.q}&lt;/div&gt;&lt;/div&gt;" style="shape=step;perimeter=stepPerimeter;fixedSize=1;size=20;rounded=1;whiteSpace=wrap;html=1;fillColor=${t.badgeFill};strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="${y + 52}" width="155" height="125" as="geometry"/></mxCell>

        <mxCell id="c59_${i}_1" value="&lt;div style='padding:12px 14px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='background:${t.bandFill};border:1px solid ${t.bandStroke};color:#0F172A;padding:2px 10px;border-radius:999px;font-size:10.5px;font-weight:800;'&gt;${t.s1Pill}&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:2px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;ACTIVE ●&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${t.s1Title}&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:6px;line-height:1.38;'&gt;${t.s1Desc}&lt;/div&gt;&lt;div style='margin-top:8px;'&gt;&lt;span style='background:${t.bandFill};color:#0F172A;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;'&gt;☑ ${t.s1Chip}&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="235" y="${y + 40}" width="385" height="158" as="geometry"/></mxCell>

        <mxCell id="c59_${i}_2" value="&lt;div style='padding:12px 14px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='background:${t.badgeFill};color:${qTxtCol};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:900;'&gt;${t.s2Num} • ${t.s2Pill}&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:2px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;ACTIVE ●&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${t.s2Title}&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:6px;line-height:1.38;'&gt;${t.s2Desc}&lt;/div&gt;&lt;div style='margin-top:8px;'&gt;&lt;span style='background:${t.bandFill};color:#0F172A;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;'&gt;☑ ${t.s2Chip}&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="665" y="${y + 40}" width="390" height="158" as="geometry"/></mxCell>

        <mxCell id="e59_${i}" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=${t.badgeFill};strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="c59_${i}_1" target="c59_${i}_2"><mxGeometry relative="1" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_59_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr59" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;font-size:13px;font-weight:800;color:#334155;'&gt;&lt;span&gt;EDITORIAL NEWSLETTER INFOGRAPHIC&lt;/span&gt;&lt;span style='color:#2563EB;'&gt;☁ Google Cloud &amp;amp; Gemini ✦&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:48px;font-weight:900;color:#0F172A;margin-top:2px;letter-spacing:-0.8px;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:18px;color:#475569;margin-top:4px;'&gt;The phased, quarterly blueprint for enterprise-grade Agentic AI on Google Cloud&lt;/div&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;margin-top:14px;'&gt;HORIZONTAL PHASE TRACKS&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="45" y="18" width="1030" height="180" as="geometry"/></mxCell>
      ${tXml}
      <mxCell id="goal59" value="&lt;div style='padding:12px 20px;text-align:left;font-family:Inter,sans-serif;font-size:15px;color:#0F172A;line-height:1.45;'&gt;&lt;b&gt;GOAL: Safely scale&lt;/b&gt; autonomous task automation, eliminate manual triage overhead, and provide secure, self-healing agent pipelines in sandbox isolation.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="45" y="1150" width="1030" height="70" as="geometry"/></mxCell>
      <mxCell id="ftr59" value="GOOGLE CLOUD AGENT ENGINE ROADMAP • Timeline &amp; Roadmap • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 9. #60: ARCHITECTURE & TOPOLOGY DIAGRAM (Exact 1:1 Vector Twin of 60.png)
  // ============================================================================
  if (id === '60' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Architecture & Topology Diagram');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_60_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr60" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;font-size:20px;font-weight:900;padding:0 15px;'&gt;&lt;span style='color:#2563EB;'&gt;☁&lt;/span&gt;&lt;span style='color:#2563EB;'&gt;☁ ✦&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:42px;font-weight:900;color:#0F172A;margin-top:6px;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:20px;font-weight:700;color:#1E293B;margin-top:6px;'&gt;Google Cloud enterprise agent topology and secure runtimes&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="45" y="20" width="1030" height="150" as="geometry"/></mxCell>

      <!-- 01 | VERTEX AI (Top-Left/Center) -->
      <mxCell id="n60_1" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="255" y="235" width="420" height="240" as="geometry"/></mxCell>
      <mxCell id="n60_1h" value="&lt;div style='display:flex;justify-content:space-between;align-items:center;padding:0 14px;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;b style='font-size:14px;'&gt;01 | VERTEX AI&lt;/b&gt;&lt;span style='background:#EFF6FF;color:#0F172A;padding:2px 10px;border-radius:999px;font-size:10px;font-weight:800;'&gt;REASONING ENGINE&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#3B82F6;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="255" y="235" width="420" height="46" as="geometry"/></mxCell>
      <mxCell id="n60_1b" value="&lt;div style='padding:12px 16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#0F172A;'&gt;Vertex AI Reasoning Engine&lt;br/&gt;Gemini 1.5 Pro &lt;span style='color:#3B82F6;'&gt;✦&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:8px;'&gt;Handles model reasoning, goal planning, and intent parsing.&lt;/div&gt;&lt;div style='margin-top:12px;background:#F1F5F9;border:1px solid #CBD5E1;padding:8px 12px;border-radius:8px;font-family:monospace;font-size:12.5px;color:#0F172A;font-weight:700;'&gt;agent = aiplatform.ReasoningEngine(..)&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="260" y="285" width="410" height="180" as="geometry"/></mxCell>

      <!-- Secure Ingress + Cloud Load Balancing (Left) -->
      <mxCell id="ing60" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:13px;font-weight:800;color:#0F172A;'&gt;Secure&lt;br/&gt;Ingress&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:18px;'&gt;User/API&lt;br/&gt;request&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="30" y="625" width="90" height="90" as="geometry"/></mxCell>
      <mxCell id="clb60" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:24px;color:#3B82F6;'&gt;品&lt;/div&gt;&lt;div style='font-size:13px;font-weight:800;color:#0F172A;margin-top:4px;'&gt;Cloud Load&lt;br/&gt;Balancing&lt;/div&gt;&lt;div style='margin-top:6px;'&gt;&lt;span style='background:#3B82F6;color:#FFF;padding:2px 12px;border-radius:999px;font-size:11px;font-weight:800;'&gt;● ON&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="125" y="615" width="100" height="115" as="geometry"/></mxCell>

      <!-- 02 | CLOUD RUN (Middle-Left) -->
      <mxCell id="n60_2" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="255" y="570" width="340" height="215" as="geometry"/></mxCell>
      <mxCell id="n60_2h" value="&lt;div style='display:flex;justify-content:space-between;align-items:center;padding:0 12px;font-family:Inter,sans-serif;color:#0F172A;'&gt;&lt;b style='font-size:14px;'&gt;02 | CLOUD RUN&lt;/b&gt;&lt;span style='background:#FFFFFF;color:#0F172A;padding:2px 8px;border-radius:999px;font-size:9.5px;font-weight:800;'&gt;AGENT ORCHESTRATOR&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FACC15;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="255" y="570" width="340" height="46" as="geometry"/></mxCell>
      <mxCell id="n60_2b" value="&lt;div style='padding:12px 16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#0F172A;'&gt;Cloud Run Orchestrator&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:6px;'&gt;API router &amp;amp; state dispatch loop.&lt;br/&gt;Receives HTTPS triggers.&lt;/div&gt;&lt;div style='margin-top:14px;display:flex;gap:10px;align-items:center;'&gt;&lt;span style='background:#F1F5F9;border:1px solid #CBD5E1;padding:6px 12px;border-radius:8px;font-family:monospace;font-size:12px;font-weight:700;'&gt;POST /v1/agent/run&lt;/span&gt;&lt;span style='background:#DCFCE7;border:1px solid #16A34A;color:#15803D;padding:5px 12px;border-radius:8px;font-size:11px;font-weight:900;'&gt;ACTIVE ●&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="260" y="620" width="330" height="155" as="geometry"/></mxCell>

      <!-- 04 | ALLOYDB (Middle-Right) -->
      <mxCell id="n60_4" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="725" y="435" width="345" height="270" as="geometry"/></mxCell>
      <mxCell id="n60_4h" value="&lt;div style='display:flex;justify-content:space-between;align-items:center;padding:0 12px;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;b style='font-size:14px;'&gt;04 | ALLOYDB&lt;/b&gt;&lt;span style='background:#FFFFFF;color:#0F172A;padding:2px 8px;border-radius:999px;font-size:9.5px;font-weight:800;'&gt;STATE &amp;amp; KNOWLEDGE&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#22C55E;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="725" y="435" width="345" height="46" as="geometry"/></mxCell>
      <mxCell id="n60_4b" value="&lt;div style='padding:12px 16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#0F172A;'&gt;AlloyDB Database&lt;/div&gt;&lt;div style='font-size:15px;color:#1E293B;font-weight:600;'&gt;(PostgreSQL with pgvector)&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:8px;'&gt;Persistent state, episodic history, and BigQuery/vector grounding.&lt;/div&gt;&lt;div style='margin-top:14px;background:#F8FAFC;border:1px solid #CBD5E1;padding:10px 14px;border-radius:8px;font-size:13.5px;font-weight:700;color:#0F172A;'&gt;🗄 Session history &amp;amp; semantic RAG&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="730" y="485" width="335" height="210" as="geometry"/></mxCell>

      <!-- 03 | GKE gVISOR SANDBOX (Bottom-Right) -->
      <mxCell id="n60_3" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="620" y="770" width="450" height="380" as="geometry"/></mxCell>
      <mxCell id="n60_3h" value="&lt;div style='display:flex;justify-content:space-between;align-items:center;padding:0 14px;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;b style='font-size:14px;'&gt;03 | GKE gVISOR SANDBOX&lt;/b&gt;&lt;span style='background:#FFFFFF;color:#0F172A;padding:2px 8px;border-radius:999px;font-size:9.5px;font-weight:800;'&gt;SECURE EXECUTION&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#EF4444;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="620" y="770" width="450" height="46" as="geometry"/></mxCell>
      <mxCell id="n60_3b" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#0F172A;line-height:1.25;'&gt;Google Kubernetes Engine (GKE)&lt;br/&gt;&amp;amp; gVisor Sandbox Cluster&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:8px;'&gt;VPC Private network environment for executing dangerous scripts and CLI tools safely.&lt;/div&gt;&lt;div style='margin-top:14px;background:#F1F5F9;border:1px solid #CBD5E1;padding:12px;border-radius:10px;'&gt;&lt;div style='font-size:13px;font-weight:800;color:#0F172A;margin-bottom:8px;'&gt;⬢ Execution Sandbox (No Host Access)&lt;/div&gt;&lt;div style='background:#FFFFFF;border:1px solid #94A3B8;padding:6px 12px;border-radius:6px;font-size:13px;font-weight:700;margin-bottom:6px;'&gt;gVisor Isolated Pod #1 (Python)&lt;/div&gt;&lt;div style='background:#FFFFFF;border:1px solid #94A3B8;padding:6px 12px;border-radius:6px;font-size:13px;font-weight:700;margin-bottom:6px;'&gt;gVisor Isolated Pod #2 (Bash/CLI)&lt;/div&gt;&lt;div style='background:#FFFFFF;border:1px solid #94A3B8;padding:5px 12px;border-radius:6px;font-size:12.5px;font-weight:700;display:inline-block;'&gt;Egress Blocked&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="625" y="820" width="440" height="320" as="geometry"/></mxCell>

      <!-- Connectors -->
      <mxCell id="e60_in" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="ing60" target="clb60"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e60_clb" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="clb60" target="n60_2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e60_12" value="Inference &amp;amp; Prompt loop" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;dashed=1;startArrow=block;endArrow=block;labelBackgroundColor=#FCFBF7;fontStyle=1;fontSize=12.5;" edge="1" parent="1" source="n60_2" target="n60_1"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e60_14" value="Grounding search" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;dashed=1;endArrow=block;labelBackgroundColor=#FCFBF7;fontStyle=1;fontSize=12.5;" edge="1" parent="1" source="n60_1" target="n60_4"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="897" y="355"/></Array></mxGeometry></mxCell>
      <mxCell id="e60_24" value="Session state logs" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;dashed=1;startArrow=block;endArrow=block;labelBackgroundColor=#FCFBF7;fontStyle=1;fontSize=12.5;" edge="1" parent="1" source="n60_2" target="n60_4"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e60_23" value="Secure gRPC Exec  •  Results &amp;amp; logs" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;dashed=1;startArrow=block;endArrow=block;labelBackgroundColor=#FCFBF7;fontStyle=1;fontSize=12.5;" edge="1" parent="1" source="n60_2" target="n60_3"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="425" y="960"/></Array></mxGeometry></mxCell>

      <mxCell id="ftr60" value="GOOGLE CLOUD ENTERPRISE AGENT TOPOLOGY • ARCHITECTURE &amp; TOPOLOGY DIAGRAM • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 10. #61: HIERARCHICAL TREE DIAGRAM (Exact 1:1 Vector Twin of 61.png)
  // ============================================================================
  if (id === '61' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Hierarchical Tree Diagram');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_61_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr61" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;font-size:15px;font-weight:700;color:#334155;'&gt;&lt;span&gt;Editorial newsletter infographic&lt;/span&gt;&lt;span style='color:#2563EB;'&gt;☁ Google Cloud &amp;amp; Gemini&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:46px;font-weight:900;color:#0F172A;margin-top:4px;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:18px;color:#334155;margin-top:4px;'&gt;Multi-agent supervisor delegation and worker execution on Google Cloud&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1010" height="145" as="geometry"/></mxCell>

      <!-- 01 | SUPERVISION ZONE -->
      <mxCell id="z61_1" value="01 | SUPERVISION ZONE" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="380" y="175" width="360" height="26" as="geometry"/></mxCell>
      <mxCell id="sup61" value="&lt;div style='padding:16px;text-align:left;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:22px;font-weight:900;line-height:1.15;'&gt;SUPERVISOR&lt;br/&gt;AGENT&lt;/span&gt;&lt;span style='background:#93C5FD;color:#0F172A;padding:6px 12px;border-radius:999px;font-size:16px;font-weight:900;'&gt;01&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:14px;margin-top:12px;line-height:1.4;'&gt;Analyzes high-level goals, decomposes tasks, coordinates specialized agents, and validates the final response.&lt;/div&gt;&lt;div style='margin-top:14px;display:flex;gap:8px;'&gt;&lt;span style='background:#1E3A8A;padding:4px 10px;border-radius:6px;font-size:10.5px;font-weight:800;'&gt;ORCHESTRATOR&lt;/span&gt;&lt;span style='background:#1E3A8A;padding:4px 10px;border-radius:6px;font-size:10.5px;font-weight:800;'&gt;GOAL-DRIVEN&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#3B82F6;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="370" y="208" width="380" height="235" as="geometry"/></mxCell>

      <!-- 02 | SPECIALIZED WORKER ZONE -->
      <mxCell id="z61_2" value="02 | SPECIALIZED WORKER ZONE" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="510" width="320" height="26" as="geometry"/></mxCell>

      <mxCell id="w61_1" value="&lt;div style='padding:14px;text-align:left;font-family:Inter,sans-serif;color:#0F172A;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:19px;font-weight:900;line-height:1.15;'&gt;SQL DATA&lt;br/&gt;AGENT&lt;/span&gt;&lt;span style='background:#FFFFFF;border:1.5px solid #0F172A;padding:5px 10px;border-radius:999px;font-size:13px;font-weight:900;'&gt;02a&lt;/span&gt;&lt;/div&gt;&lt;div style='display:inline-block;background:#16A34A;color:#FFF;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:800;margin-top:10px;'&gt;DATA ACCESS&lt;/div&gt;&lt;div style='font-size:13.5px;margin-top:10px;line-height:1.4;'&gt;Queries databases, joins datasets, and fetches structured schema information.&lt;br/&gt;• Direct BigQuery &amp;amp; SQL query&lt;br/&gt;• Retrieve relational tables&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#BBF7D0;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="545" width="315" height="265" as="geometry"/></mxCell>

      <mxCell id="w61_2" value="&lt;div style='padding:14px;text-align:left;font-family:Inter,sans-serif;color:#0F172A;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:19px;font-weight:900;line-height:1.15;'&gt;WEB RESEARCHER&lt;br/&gt;AGENT&lt;/span&gt;&lt;span style='background:#FFFFFF;border:1.5px solid #0F172A;padding:5px 10px;border-radius:999px;font-size:13px;font-weight:900;'&gt;02b&lt;/span&gt;&lt;/div&gt;&lt;div style='display:inline-block;background:#CA8A04;color:#FFF;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:800;margin-top:10px;'&gt;BROWSER / SEARCH&lt;/div&gt;&lt;div style='font-size:13.5px;margin-top:10px;line-height:1.4;'&gt;Scrapes web pages, accesses APIs, and gathers real-time public information.&lt;br/&gt;• Google Search API calls&lt;br/&gt;• Parse web content&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FDE68A;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="402" y="545" width="315" height="265" as="geometry"/></mxCell>

      <mxCell id="w61_3" value="&lt;div style='padding:14px;text-align:left;font-family:Inter,sans-serif;color:#0F172A;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:19px;font-weight:900;line-height:1.15;'&gt;CODE SYNTHESIS&lt;br/&gt;AGENT&lt;/span&gt;&lt;span style='background:#FFFFFF;border:1.5px solid #0F172A;padding:5px 10px;border-radius:999px;font-size:13px;font-weight:900;'&gt;02c&lt;/span&gt;&lt;/div&gt;&lt;div style='display:inline-block;background:#DC2626;color:#FFF;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:800;margin-top:10px;'&gt;EXECUTION / WRITE&lt;/div&gt;&lt;div style='font-size:13.5px;margin-top:10px;line-height:1.4;'&gt;Writes, tests, and refactors code scripts to process fetched datasets.&lt;br/&gt;• Python/Node generation&lt;br/&gt;• Run test suite &amp;amp; debug&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FECACA;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="750" y="545" width="315" height="265" as="geometry"/></mxCell>

      <!-- 03 | ENVIRONMENT & LAYER -->
      <mxCell id="z61_3" value="03 | ENVIRONMENT &amp; LAYER" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="855" width="320" height="26" as="geometry"/></mxCell>
      <mxCell id="env61" value="&lt;div style='padding:14px 20px;text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;div style='font-size:21px;font-weight:900;'&gt;UNIFIED RESOURCE &amp;amp; ENVIRONMENT LAYER &amp;nbsp;&lt;span style='background:#334155;padding:3px 10px;border-radius:999px;font-size:14px;'&gt;03&lt;/span&gt;&lt;/div&gt;&lt;div style='margin-top:8px;display:flex;justify-content:center;gap:10px;'&gt;&lt;span style='background:#0284C7;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:800;'&gt;ISOLATED VPC&lt;/span&gt;&lt;span style='background:#0D9488;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:800;'&gt;SECURE&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:14px;color:#CBD5E1;margin-top:8px;'&gt;Execution boundary for sandboxed workloads, database access, &amp;amp; storage.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="890" width="1010" height="130" as="geometry"/></mxCell>

      <mxCell id="sub61_1" value="&lt;b&gt;Database Layer&lt;/b&gt;&lt;br/&gt;(SQL, database connectors)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="55" y="1030" width="315" height="65" as="geometry"/></mxCell>
      <mxCell id="sub61_2" value="&lt;b&gt;Sandbox / Execution&lt;/b&gt;&lt;br/&gt;(gVisor &amp;amp; isolated runtime)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="402" y="1030" width="315" height="65" as="geometry"/></mxCell>
      <mxCell id="sub61_3" value="&lt;b&gt;Knowledge Base&lt;/b&gt;&lt;br/&gt;(File storage, RAG vector)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="750" y="1030" width="315" height="65" as="geometry"/></mxCell>

      <mxCell id="e61_1" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="sup61" target="w61_2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="lbl61_del" value="Delegate &amp;amp; Route" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontColor=#0F172A;fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="415" y="456" width="132" height="28" as="geometry"/></mxCell>
      <mxCell id="e61_2" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="sup61" target="w61_1"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e61_3" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="sup61" target="w61_3"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e61_4" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="w61_1" target="env61"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e61_5" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="w61_2" target="env61"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e61_6" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2.5;endArrow=block;" edge="1" parent="1" source="w61_3" target="env61"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="tk61" value="&lt;div style='padding:12px 18px;text-align:center;font-family:Inter,sans-serif;font-size:14px;color:#0F172A;'&gt;&lt;b&gt;TAKEAWAY:&lt;/b&gt; Hierarchical delegation separates high-level task planning from specialized execution, improving accuracy and security across tools.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="1135" width="1010" height="68" as="geometry"/></mxCell>
      <mxCell id="ftr61" value="GOOGLE CLOUD ENTERPRISE AGENT ARCHITECTURE • HIERARCHICAL TREE DIAGRAM • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 11. #62: 2x2 QUADRANT MATRIX (Exact 1:1 Vector Twin of 62.png)
  // ============================================================================
  if (id === '62' && !items) {
    const hTitle = esc(cleanCustomTitle || '2x2 Quadrant Matrix');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_62_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr62" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;font-size:14px;font-weight:800;color:#334155;'&gt;&lt;span&gt;EDITORIAL NEWSLETTER TECHNICAL INFOGRAPHIC POSTER&lt;/span&gt;&lt;span style='color:#2563EB;'&gt;☁ Gemini&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:48px;font-weight:900;color:#0F172A;margin-top:4px;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:19px;color:#334155;margin-top:4px;'&gt;Mapping enterprise AI agent tasks across&lt;br/&gt;Business Impact vs Technical Complexity&lt;/div&gt;&lt;div style='font-size:15px;font-weight:900;color:#0F172A;margin-top:12px;'&gt;AXES &amp;amp; BOUNDARIES&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="65" y="20" width="995" height="190" as="geometry"/></mxCell>

      <mxCell id="axY62" value="&lt;div style='writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:13.5px;font-weight:800;color:#FFFFFF;letter-spacing:0.6px;white-space:nowrap;'&gt;LOW   ◄────────   BUSINESS IMPACT (Value, ROI &amp;amp; Output Quality)   ────────►   HIGH&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="60" y="230" width="48" height="860" as="geometry"/></mxCell>
      <mxCell id="axX62" value="LOW   ◄────────────   TECHNICAL COMPLEXITY (Time, Cost, Effort &amp; Tech Friction)   ────────────►   HIGH" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="130" y="1110" width="935" height="44" as="geometry"/></mxCell>

      <!-- Q1: QUICK WINS -->
      <mxCell id="q62_1" value="&lt;div style='padding:16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:23px;font-weight:900;color:#0F172A;'&gt;01 | QUICK WINS&lt;/span&gt;&lt;span style='background:#059669;color:#FFF;padding:5px 10px;border-radius:999px;font-size:14px;font-weight:900;'&gt;✓&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:15px;color:#1E293B;margin-top:6px;'&gt;High ROI, fast implementation.&lt;br/&gt;Build first.&lt;/div&gt;&lt;div style='margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;'&gt;&lt;span style='background:#2563EB;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Draft Email Responses&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Document Translation&lt;/span&gt;&lt;span style='background:#0D9488;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Meeting Summaries&lt;/span&gt;&lt;span style='background:#2563EB;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Standard Ticket Routing&lt;/span&gt;&lt;span style='background:#22C55E;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Auto-tagging CRM Leads&lt;/span&gt;&lt;/div&gt;&lt;div style='margin-top:22px;display:flex;gap:8px;'&gt;&lt;span style='background:#3B82F6;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;HIGH IMPACT&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;LOW COMPLEXITY&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="130" y="230" width="450" height="420" as="geometry"/></mxCell>

      <!-- Q2: STRATEGIC BETS -->
      <mxCell id="q62_2" value="&lt;div style='padding:16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:23px;font-weight:900;color:#0F172A;'&gt;02 | STRATEGIC BETS&lt;/span&gt;&lt;span style='background:#312E81;color:#FFF;padding:5px 10px;border-radius:999px;font-size:14px;font-weight:900;'&gt;★&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:15px;color:#1E293B;margin-top:6px;'&gt;Complex but transformative.&lt;br/&gt;High long-term value.&lt;/div&gt;&lt;div style='margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;'&gt;&lt;span style='background:#3730A3;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Workflow Orchestration&lt;/span&gt;&lt;span style='background:#2563EB;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Autonomous Market Research&lt;/span&gt;&lt;span style='background:#4F46E5;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Full Code Generation&lt;/span&gt;&lt;span style='background:#0D9488;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Dynamic Multi-Agent Collabs&lt;/span&gt;&lt;span style='background:#1E293B;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Predictive Operations&lt;/span&gt;&lt;/div&gt;&lt;div style='margin-top:22px;display:flex;gap:8px;'&gt;&lt;span style='background:#3B82F6;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;HIGH IMPACT&lt;/span&gt;&lt;span style='background:#F97316;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;HIGH COMPLEXITY&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#E0E7FF;strokeColor=#4F46E5;strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="615" y="230" width="450" height="420" as="geometry"/></mxCell>

      <!-- Q3: LOW PRIORITY -->
      <mxCell id="q62_3" value="&lt;div style='padding:16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:23px;font-weight:900;color:#0F172A;'&gt;03 | LOW PRIORITY&lt;/span&gt;&lt;span style='background:#A16207;color:#FFF;padding:5px 10px;border-radius:999px;font-size:14px;font-weight:900;'&gt;❚❚&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:15px;color:#1E293B;margin-top:6px;'&gt;Easy to deploy but low business&lt;br/&gt;return.&lt;/div&gt;&lt;div style='margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;'&gt;&lt;span style='background:#64748B;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Local File Organization&lt;/span&gt;&lt;span style='background:#475569;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Internal Calendar Sync&lt;/span&gt;&lt;span style='background:#64748B;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Holiday Greeting Drafts&lt;/span&gt;&lt;span style='background:#475569;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Routine Database Polling&lt;/span&gt;&lt;span style='background:#64748B;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Basic Post Formatting&lt;/span&gt;&lt;/div&gt;&lt;div style='margin-top:22px;display:flex;gap:8px;'&gt;&lt;span style='background:#64748B;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;LOW IMPACT&lt;/span&gt;&lt;span style='background:#16A34A;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;LOW COMPLEXITY&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="130" y="670" width="450" height="420" as="geometry"/></mxCell>

      <!-- Q4: HIGH RISK TRAPS -->
      <mxCell id="q62_4" value="&lt;div style='padding:16px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:23px;font-weight:900;color:#0F172A;'&gt;04 | HIGH RISK TRAPS&lt;/span&gt;&lt;span style='background:#B91C1C;color:#FFF;padding:5px 10px;border-radius:999px;font-size:14px;font-weight:900;'&gt;▲&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:15px;color:#1E293B;margin-top:6px;'&gt;Heavy engineering effort for&lt;br/&gt;minor ROI. Avoid or defer.&lt;/div&gt;&lt;div style='margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;'&gt;&lt;span style='background:#B91C1C;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Legacy Code Refactoring&lt;/span&gt;&lt;span style='background:#F97316;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Creative Brand Strategy&lt;/span&gt;&lt;span style='background:#DC2626;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Arbitrary Bulk Migration&lt;/span&gt;&lt;span style='background:#EA580C;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Flexible Negotiation&lt;/span&gt;&lt;span style='background:#B91C1C;color:#FFF;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:800;'&gt;Subjective HR Evaluation&lt;/span&gt;&lt;/div&gt;&lt;div style='margin-top:22px;display:flex;gap:8px;'&gt;&lt;span style='background:#64748B;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;LOW IMPACT&lt;/span&gt;&lt;span style='background:#F97316;color:#FFF;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;'&gt;HIGH COMPLEXITY&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="615" y="670" width="450" height="420" as="geometry"/></mxCell>

      <mxCell id="tk62" value="&lt;div style='padding:12px 18px;text-align:center;font-family:Inter,sans-serif;font-size:14px;color:#0F172A;'&gt;&lt;b&gt;PRIORITIZATION RULE:&lt;/b&gt; Start with &lt;b style='color:#059669;'&gt;01 | Quick Wins&lt;/b&gt; to build organizational momentum, invest selectively in &lt;b style='color:#4F46E5;'&gt;02 | Strategic Bets&lt;/b&gt;, and strictly avoid &lt;b style='color:#DC2626;'&gt;04 | High Risk Traps&lt;/b&gt;.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="130" y="1180" width="935" height="65" as="geometry"/></mxCell>
      <mxCell id="ftr62" value="GOOGLE CLOUD ENTERPRISE AGENT PRIORITIZATION • 2x2 QUADRANT MATRIX • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 12. #63: DECISION TREE FLOWCHART (Exact 1:1 Vector Twin of 63.png)
  // ============================================================================
  if (id === '63' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Decision Tree Flowchart');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_63_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FAFCFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FAFCFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr63" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:46px;font-weight:900;color:#0F172A;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:20px;color:#475569;margin-top:6px;'&gt;Conditional branching logic and decision paths&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="24" width="1000" height="100" as="geometry"/></mxCell>

      <!-- BAND 01 | INGEST -->
      <mxCell id="b63_1" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="45" y="145" width="1030" height="295" as="geometry"/></mxCell>
      <mxCell id="t63_1" value="01 | INGEST" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=21;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="70" y="160" width="220" height="34" as="geometry"/></mxCell>

      <mxCell id="n63_rec" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;'&gt;⚙&lt;/div&gt;&lt;div style='font-size:16px;font-weight:800;color:#0F172A;'&gt;Receive Input&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;'&gt;Task / Objective&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="445" y="160" width="230" height="90" as="geometry"/></mxCell>
      <mxCell id="n63_obj" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;'&gt;🔍&lt;/div&gt;&lt;div style='font-size:15px;font-weight:700;color:#0F172A;'&gt;Is the objective&lt;br/&gt;clearly defined?&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="455" y="290" width="210" height="90" as="geometry"/></mxCell>
      <mxCell id="n63_clar" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;'&gt;💬&lt;/div&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;'&gt;01a | Request&lt;br/&gt;Clarification&lt;/div&gt;&lt;div style='font-size:12px;color:#475569;margin-top:4px;'&gt;Ask user for missing&lt;br/&gt;inputs or constraints&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="175" y="265" width="215" height="130" as="geometry"/></mxCell>

      <mxCell id="e63_1a" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n63_rec" target="n63_obj"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_1no" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#EA580C;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_obj" target="n63_clar"><mxGeometry relative="1" as="geometry"/></mxCell>

      <!-- BAND 02 | TOOL CHECK -->
      <mxCell id="b63_2" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="45" y="460" width="1030" height="390" as="geometry"/></mxCell>
      <mxCell id="t63_2" value="02 | TOOL CHECK" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=21;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="70" y="475" width="250" height="34" as="geometry"/></mxCell>

      <mxCell id="n63_eval" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;font-size:16px;font-weight:800;color:#0F172A;'&gt;Evaluate Required&lt;br/&gt;Resources&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="445" y="475" width="230" height="70" as="geometry"/></mxCell>
      <mxCell id="n63_ext" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;font-size:15px;font-weight:700;color:#0F172A;'&gt;Are external tools&lt;br/&gt;or APIs needed?&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="455" y="580" width="210" height="68" as="geometry"/></mxCell>

      <mxCell id="n63_dir" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;font-weight:800;color:#0F172A;'&gt;Direct Execution&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:4px;'&gt;Process internally using&lt;br/&gt;standard reasoning&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="265" y="660" width="225" height="90" as="geometry"/></mxCell>
      <mxCell id="n63_perm" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;font-size:15px;font-weight:700;color:#0F172A;'&gt;Are permissions&lt;br/&gt;and access valid?&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="625" y="655" width="205" height="68" as="geometry"/></mxCell>
      <mxCell id="n63_esc" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;'&gt;🔒&lt;/div&gt;&lt;div style='font-size:15.5px;font-weight:800;color:#0F172A;'&gt;Escalate /&lt;br/&gt;Request Access&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:4px;'&gt;User approval or&lt;br/&gt;graceful fallback&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="885" y="625" width="180" height="130" as="geometry"/></mxCell>
      <mxCell id="n63_inv" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;font-weight:800;color:#0F172A;'&gt;Invoke Tools&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:4px;'&gt;Call APIs, databases,&lt;br/&gt;or sandboxed skills&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="620" y="760" width="215" height="80" as="geometry"/></mxCell>

      <mxCell id="e63_1yes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#16A34A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#16A34A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_obj" target="n63_eval"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_2a" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n63_eval" target="n63_ext"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_2no" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#EA580C;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_ext" target="n63_dir"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_2yes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#16A34A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#16A34A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_ext" target="n63_perm"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_pno" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#EA580C;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_perm" target="n63_esc"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_pyes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#16A34A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#16A34A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_perm" target="n63_inv"><mxGeometry relative="1" as="geometry"/></mxCell>

      <!-- BAND 03 | EXECUTE -->
      <mxCell id="b63_3" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F1F5F9;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="45" y="875" width="1030" height="390" as="geometry"/></mxCell>
      <mxCell id="t63_3" value="03 | EXECUTE" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=21;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="70" y="890" width="220" height="34" as="geometry"/></mxCell>

      <mxCell id="n63_exec" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;font-size:16px;font-weight:800;color:#0F172A;'&gt;Execute Task &amp;amp;&lt;br/&gt;Generate Output&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="445" y="895" width="230" height="70" as="geometry"/></mxCell>
      <mxCell id="n63_val" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;font-size:15px;font-weight:700;color:#0F172A;'&gt;Does outcome&lt;br/&gt;pass validation?&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="455" y="998" width="210" height="68" as="geometry"/></mxCell>
      <mxCell id="n63_loop" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:16px;font-weight:800;color:#0F172A;'&gt;↻ Self-Correction Loop&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:4px;'&gt;Analyze failure, retry&lt;br/&gt;up to limit&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="155" y="965" width="230" height="95" as="geometry"/></mxCell>
      <mxCell id="n63_err" value="&lt;div style='padding:8px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;'&gt;Error Escalation&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;'&gt;If exhausted&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="155" y="1095" width="230" height="60" as="geometry"/></mxCell>
      <mxCell id="n63_fin" value="&lt;div style='padding:12px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;'&gt;Deliver Final Result&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:4px;'&gt;Complete objective and&lt;br/&gt;return outcome&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="445" y="1145" width="230" height="85" as="geometry"/></mxCell>

      <mxCell id="e63_d2e" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n63_dir" target="n63_exec"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_i2e" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n63_inv" target="n63_exec"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_e2v" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n63_exec" target="n63_val"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_vno" value="NO" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#EA580C;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_val" target="n63_loop"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_vyes" value="YES" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#16A34A;strokeWidth=2.5;endArrow=block;labelBackgroundColor=#16A34A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" edge="1" parent="1" source="n63_val" target="n63_fin"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e63_l2e" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;exitX=0;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="n63_loop" target="n63_exec"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="120" y="1012"/><mxPoint x="120" y="930"/></Array></mxGeometry></mxCell>
      <mxCell id="e63_l2err" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#EA580C;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="n63_loop" target="n63_err"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="ftr63" value="DECISION TREE FLOWCHART • SYSTEM LOGIC &amp; BRANCHING FRAMEWORK • REVISION 1.4 • 09/2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 13. #64: FEATURE MATRIX GRID (Exact 1:1 Vector Twin of 64.png)
  // ============================================================================
  if (id === '64' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Feature Matrix Grid');
    const rows = [
      {
        crit: 'Data Persistence', sub: '(System state, DB connectors, checkpointers)',
        cols: [
          { pill: '✓ NATIVE', pBg: '#86EFAC', pCol: '#065F46', t: 'Checkpoint DB integrations', s: 'Restarts &amp; time-travel' },
          { pill: '✓ BUILT-IN', pBg: '#86EFAC', pCol: '#065F46', t: 'Bundled SQLite adapter', s: 'Ready-to-use persistence' },
          { pill: '✓ DISTRIBUTED', pBg: '#86EFAC', pCol: '#065F46', t: 'State sync across nodes', s: 'Fault-tolerant backups' },
          { pill: '✕ EXTERNAL', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Needs custom pipeline', s: 'No default state manager' }
        ]
      },
      {
        crit: 'System Isolation', sub: '(Secure execution boundaries &amp; sandboxing)',
        cols: [
          { pill: '✕ MANUAL', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'VPC &amp; container setup', s: 'Required user config' },
          { pill: '✕ LIMITED', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Host OS dependency', s: 'OS-level execution only' },
          { pill: '✓ SECURE', pBg: '#86EFAC', pCol: '#065F46', t: 'Docker / microVMs', s: 'Isolated runtime environments' },
          { pill: '✕ NONE', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Raw unconstrained access', s: 'Executes on localhost' }
        ]
      },
      {
        crit: 'Human Intervention', sub: '(User interaction &amp; approval breakpoints)',
        cols: [
          { pill: '✓ NATIVE', pBg: '#86EFAC', pCol: '#065F46', t: 'Interrupts &amp; approvals', s: 'Flexible validation loop' },
          { pill: '✓ SUPPORTED', pBg: '#86EFAC', pCol: '#065F46', t: 'Simple breakpoint hooks', s: 'Basic pause checkpoints' },
          { pill: '✓ INTEGRATED', pBg: '#86EFAC', pCol: '#065F46', t: 'Feedback loop workflows', s: 'Structured intervention' },
          { pill: '✕ LIMITED', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Hardcoded manual scripts', s: 'Fragile UX integrations' }
        ]
      },
      {
        crit: 'Session Memory', sub: '(Retrieval-augmented, stateful memory)',
        cols: [
          { pill: '✓ NATIVE', pBg: '#86EFAC', pCol: '#065F46', t: 'Long &amp; short-term DB', s: 'Flexible cognitive memory' },
          { pill: '✓ BUILT-IN', pBg: '#86EFAC', pCol: '#065F46', t: 'Standard context cache', s: 'Basic memory buffers' },
          { pill: '✓ DISTRIBUTED', pBg: '#86EFAC', pCol: '#065F46', t: 'Cluster semantic store', s: 'Shared memory pools' },
          { pill: '✕ VOLATILE', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Runtime RAM memory', s: 'Lost upon termination' }
        ]
      },
      {
        crit: 'Orchestration Scale', sub: '(Multi-process task concurrency)',
        cols: [
          { pill: '✓ SCALABLE', pBg: '#86EFAC', pCol: '#065F46', t: 'Flexible process mesh', s: 'Multi-thread execution' },
          { pill: '✕ MODERATE', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Sequential process focus', s: 'Single-thread execution' },
          { pill: '✓ ADVANCED', pBg: '#86EFAC', pCol: '#065F46', t: 'Dynamic peer delegation', s: 'Infinite async workflows' },
          { pill: '✕ BASIC', pBg: '#FCA5A5', pCol: '#7F1D1D', t: 'Single-loop execution', s: 'Simple inline tasks' }
        ]
      }
    ];
    let gXml = '';
    rows.forEach((r, ri) => {
      const y = 260 + ri * 158;
      gXml += `<mxCell id="c64_lbl_${ri}" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:17px;font-weight:900;color:#0F172A;'&gt;${r.crit}&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:4px;'&gt;${r.sub}&lt;/div&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="45" y="${y}" width="195" height="158" as="geometry"/></mxCell>`;
      r.cols.forEach((c, ci) => {
        const x = 240 + ci * 210;
        gXml += `<mxCell id="c64_${ri}_${ci}" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:inline-block;background:${c.pBg};color:${c.pCol};padding:4px 14px;border-radius:999px;font-size:12px;font-weight:900;'&gt;${c.pill}&lt;/div&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;margin-top:10px;line-height:1.25;'&gt;${c.t}&lt;/div&gt;&lt;div style='font-size:12px;color:#475569;margin-top:6px;'&gt;${c.s}&lt;/div&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="210" height="158" as="geometry"/></mxCell>`;
      });
    });
    const scores = [
      { sc: 'Score: 4.2 / 5', sub: 'Best for Custom Workflows' },
      { sc: 'Score: 3.8 / 5', sub: 'Best for Out-of-the-Box Setup' },
      { sc: 'Score: 4.8 / 5', sub: 'Best for Scaled Operations' },
      { sc: 'Score: 2.2 / 5', sub: 'Best for Local Prototypes' }
    ];
    scores.forEach((s, ci) => {
      const x = 240 + ci * 210;
      gXml += `<mxCell id="sc64_${ci}" value="&lt;div style='padding:10px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:inline-block;background:#1E3A8A;color:#FFFFFF;padding:6px 16px;border-radius:999px;font-size:15px;font-weight:900;'&gt;${s.sc}&lt;/div&gt;&lt;div style='font-size:13.5px;font-weight:800;color:#0F172A;margin-top:8px;'&gt;${s.sub}&lt;/div&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="${x}" y="1050" width="210" height="120" as="geometry"/></mxCell>`;
    });

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_64_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FAFCFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FAFCFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr64" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:46px;font-weight:900;color:#0F172A;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:20px;color:#475569;margin-top:6px;'&gt;Multi-criteria evaluation and capability scoring&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="45" y="25" width="1035" height="110" as="geometry"/></mxCell>

      <mxCell id="th64_0" value="ARCHITECTURAL&lt;br/&gt;CRITERIA" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=14;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="45" y="175" width="195" height="85" as="geometry"/></mxCell>
      <mxCell id="th64_1" value="&lt;b style='font-size:15px;'&gt;FRAMEWORK ALPHA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:12px;color:#334155;'&gt;(Modular &amp;amp; Extensible)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="240" y="175" width="210" height="85" as="geometry"/></mxCell>
      <mxCell id="th64_2" value="&lt;b style='font-size:15px;'&gt;FRAMEWORK BETA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:12px;color:#334155;'&gt;(Monolithic &amp;amp; Built-in)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="450" y="175" width="210" height="85" as="geometry"/></mxCell>
      <mxCell id="th64_3" value="&lt;b style='font-size:15px;'&gt;FRAMEWORK GAMMA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:12px;color:#334155;'&gt;(Distributed &amp;amp; Mesh)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="660" y="175" width="210" height="85" as="geometry"/></mxCell>
      <mxCell id="th64_4" value="&lt;b style='font-size:15px;'&gt;FRAMEWORK DELTA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:12px;color:#334155;'&gt;(Lightweight &amp;amp; Minimal)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="870" y="175" width="210" height="85" as="geometry"/></mxCell>

      <mxCell id="sc64_lbl" value="OVERALL&lt;br/&gt;SCORE &amp;amp; FIT" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontStyle=1;fontSize=16;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="45" y="1050" width="195" height="120" as="geometry"/></mxCell>
      ${gXml}

      <mxCell id="ev64" value="&lt;div style='padding:12px 18px;text-align:left;font-family:Inter,sans-serif;font-size:15px;color:#0F172A;'&gt;&lt;b&gt;EVALUATION:&lt;/b&gt; Modular &amp;amp; distributed options excel in state management, whereas &lt;b&gt;isolated sandboxing requires specific&lt;/b&gt; sandbox/VPC container support.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="45" y="1195" width="1035" height="72" as="geometry"/></mxCell>
      <mxCell id="ftr64" value="FEATURE MATRIX GRID • MULTI-CRITERIA EVALUATION &amp; CAPABILITY SCORING • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 14. #65: AI CAPABILITY PYRAMID (Exact 1:1 Vector Twin of 65.png)
  // ============================================================================
  if (id === '65' && !items) {
    const hTitle = esc(cleanCustomTitle || 'AI Capability Pyramid');
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_65_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
      <mxCell id="hdr65" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:48px;font-weight:900;color:#0F172A;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:20px;color:#334155;margin-top:6px;'&gt;The evolution of Google Cloud agents from raw&lt;br/&gt;inference to fully autonomous systems&lt;/div&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-top:16px;'&gt;TIERS&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="25" width="1000" height="175" as="geometry"/></mxCell>

      <mxCell id="axL65" value="&lt;div style='writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:13.5px;font-weight:800;color:#0F172A;letter-spacing:0.6px;white-space:nowrap;'&gt;RISING COMPLEXITY &amp;amp; VALUE   ────────►&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;" vertex="1" parent="1"><mxGeometry x="35" y="240" width="40" height="920" as="geometry"/></mxCell>
      <mxCell id="axR65" value="&lt;div style='writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:13.5px;font-weight:800;color:#0F172A;letter-spacing:0.6px;white-space:nowrap;'&gt;◄────────   DECREASING HUMAN INTERVENTION&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;" vertex="1" parent="1"><mxGeometry x="1045" y="240" width="40" height="920" as="geometry"/></mxCell>

      <!-- Center Pyramid Tiers (04 Apex -> 01 Base) -->
      <mxCell id="p65_4" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;color:#0F172A;padding-top:16px;'&gt;&lt;span style='background:#DCFCE7;border:2px solid #0F172A;padding:6px 12px;border-radius:999px;font-size:16px;font-weight:900;'&gt;04&lt;/span&gt;&lt;div style='font-size:16px;font-weight:900;margin-top:12px;'&gt;AUTONOMOUS&lt;br/&gt;AGENTS&lt;/div&gt;&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;size=90;rounded=0;whiteSpace=wrap;html=1;fillColor=#86EFAC;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="450" y="235" width="220" height="205" as="geometry"/></mxCell>
      <mxCell id="p65_3" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;color:#0F172A;'&gt;&lt;span style='background:#FEF3C7;border:2px solid #0F172A;padding:6px 12px;border-radius:999px;font-size:16px;font-weight:900;'&gt;03&lt;/span&gt;&lt;div style='font-size:17px;font-weight:900;margin-top:10px;'&gt;MULTI-AGENT&lt;br/&gt;COLLABORATION&lt;/div&gt;&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;rounded=0;whiteSpace=wrap;html=1;fillColor=#FACC15;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="360" y="455" width="400" height="215" as="geometry"/></mxCell>
      <mxCell id="p65_2" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;span style='background:#EF4444;border:2px solid #FFFFFF;padding:6px 12px;border-radius:999px;font-size:16px;font-weight:900;'&gt;02&lt;/span&gt;&lt;div style='font-size:17px;font-weight:900;margin-top:10px;color:#0F172A;'&gt;TOOL CALLING&lt;br/&gt;&amp;amp; WORKFLOWS&lt;/div&gt;&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;rounded=0;whiteSpace=wrap;html=1;fillColor=#F87171;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="250" y="685" width="620" height="215" as="geometry"/></mxCell>
      <mxCell id="p65_1" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;'&gt;&lt;span style='background:#3B82F6;border:2px solid #FFFFFF;padding:8px 14px;border-radius:999px;font-size:18px;font-weight:900;'&gt;01&lt;/span&gt;&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;rounded=0;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="95" y="915" width="930" height="215" as="geometry"/></mxCell>

      <!-- Left Detail Cards (04 .. 01) -->
      <mxCell id="l65_4" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:900;color:#0F172A;'&gt;04 | AUTONOMOUS AGENT&lt;/div&gt;&lt;div style='display:inline-block;background:#86EFAC;color:#065F46;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;margin-top:4px;'&gt;GOAL-DRIVEN&lt;/div&gt;&lt;div style='font-size:11.5px;color:#334155;margin-top:6px;line-height:1.35;'&gt;Operates on open-ended objectives, self-evaluates success, and automatically resolves errors.&lt;br/&gt;• Self-healing validation loops&lt;br/&gt;• Continuous 24/7 task resolution&lt;br/&gt;• Long-horizon goal planning&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="95" y="230" width="295" height="195" as="geometry"/></mxCell>

      <mxCell id="l65_3" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:900;color:#0F172A;'&gt;03 | MULTI-AGENT COLLABORATION&lt;/div&gt;&lt;div style='display:inline-block;background:#FDE047;color:#854D0E;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;margin-top:4px;'&gt;COOPERATIVE&lt;/div&gt;&lt;div style='font-size:11.5px;color:#334155;margin-top:6px;line-height:1.35;'&gt;Orchestrating specialized teams passing tasks, debating solutions, and managing shared context.&lt;br/&gt;• Manager-worker dynamic routing&lt;br/&gt;• Shared state persistence &amp;amp; memory&lt;br/&gt;• Agent2Agent (A2A) handoffs&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="95" y="450" width="295" height="205" as="geometry"/></mxCell>

      <mxCell id="l65_2" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:900;color:#0F172A;'&gt;02 | TOOL CALLING&lt;/div&gt;&lt;div style='display:inline-block;background:#F87171;color:#FFFFFF;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;margin-top:4px;'&gt;INTERACTIVE&lt;/div&gt;&lt;div style='font-size:11.5px;color:#334155;margin-top:6px;line-height:1.35;'&gt;Models interact natively with environments, executing code, using APIs, and navigating databases.&lt;br/&gt;• API integrations &amp;amp; Skill Plugins&lt;br/&gt;• Computer-use &amp;amp; sandboxed GKE&lt;br/&gt;• Model Context Protocol (MCP)&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="95" y="680" width="295" height="200" as="geometry"/></mxCell>

      <mxCell id="l65_1" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:900;color:#0F172A;'&gt;01 | BASE GEMINI&lt;/div&gt;&lt;div style='display:inline-block;background:#3B82F6;color:#FFFFFF;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;margin-top:4px;'&gt;RAW INFERENCE&lt;/div&gt;&lt;div style='font-size:11.5px;color:#334155;margin-top:6px;line-height:1.35;'&gt;Standard foundation model reasoning based entirely on input prompts, text generation, and in-context data.&lt;br/&gt;• Chain-of-thought (CoT) planning&lt;br/&gt;• Natural language understanding&lt;br/&gt;• Few-shot prompting&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="95" y="905" width="295" height="195" as="geometry"/></mxCell>

      <!-- Right Capabilities Cards (04 .. 01) -->
      <mxCell id="r65_4" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;'&gt;🚀 Capabilities:&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;line-height:1.4;'&gt;• Gemini Enterprise Agent Platform&lt;br/&gt;• Agent Engine&lt;br/&gt;• Autonomously schedules, executes, and heals&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="730" y="275" width="290" height="135" as="geometry"/></mxCell>

      <mxCell id="r65_3" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;'&gt;🗄 Capabilities:&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;line-height:1.4;'&gt;• Multi-agent frameworks (LangGraph, CrewAI, AutoGen)&lt;br/&gt;• Collaborative routing&lt;br/&gt;• Agent communication protocols&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="745" y="495" width="275" height="145" as="geometry"/></mxCell>

      <mxCell id="r65_2" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;'&gt;🔌 Capabilities:&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;line-height:1.4;'&gt;• Dynamic function calling&lt;br/&gt;• Sandboxed execution (microVMs)&lt;br/&gt;• DB &amp;amp; web search (Vertex AI Search)&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="760" y="720" width="260" height="145" as="geometry"/></mxCell>

      <mxCell id="r65_1" value="&lt;div style='padding:12px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;'&gt;⚙ Capabilities:&lt;/div&gt;&lt;div style='font-size:12px;color:#334155;margin-top:6px;line-height:1.4;'&gt;• Gemini foundation models&lt;br/&gt;• Real-time reasoning&lt;br/&gt;• Model evaluation&lt;br/&gt;• Standard multi-modal processing&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="775" y="935" width="245" height="150" as="geometry"/></mxCell>

      <mxCell id="ftr65" value="GOOGLE CLOUD AGENT ARCHITECTURE GUIDE • VERTEX AI AGENT PATTERNS • GCP 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 15. #66: LOOP & CYCLE DIAGRAM (Exact 1:1 Vector Twin of 66.png)
  // ============================================================================
  const hTitle = esc(cleanCustomTitle || 'Loop & Cycle Diagram');
  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_66_${level}" name="${hTitle}"><mxGraphModel dx="1120" dy="1340" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1120" pageHeight="1340" background="#FCFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
    <mxCell id="poster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FCFBF7;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1120" height="1340" as="geometry"/></mxCell>
    <mxCell id="hdr66" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;'&gt;&lt;span style='font-size:46px;font-weight:900;color:#0F172A;'&gt;${hTitle}&lt;/span&gt;&lt;span style='background:#FFFFFF;border:1px solid #E2E8F0;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:800;color:#334155;'&gt;☁ Google Cloud &amp;amp; Vertex AI&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:19px;color:#334155;margin-top:6px;'&gt;The autonomous self-healing agent loop and evaluation cycle&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="55" y="22" width="1010" height="120" as="geometry"/></mxCell>

    <!-- Outer Colored Ring & Inner White Hub -->
    <mxCell id="ring66_out" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="150" y="175" width="780" height="780" as="geometry"/></mxCell>
    <mxCell id="ring66_in" value="&lt;div style='font-family:Inter,sans-serif;font-size:20px;font-weight:700;color:#64748B;letter-spacing:1px;'&gt;AUTONOMOUS&lt;br/&gt;AGENT LOOP&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="355" y="380" width="370" height="370" as="geometry"/></mxCell>

    <!-- 01 | MODEL GENERATION (Top-Left) -->
    <mxCell id="c66_1" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:18px;font-weight:900;color:#0F172A;'&gt;✦ 01 | MODEL GENERATION&lt;/div&gt;&lt;div style='font-size:14.5px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;A &lt;b&gt;Google Gemini&lt;/b&gt; model generates candidate solutions, code, or tasks.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="205" width="380" height="140" as="geometry"/></mxCell>
    <mxCell id="b66_1" value="01" style="ellipse;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=18;" vertex="1" parent="1"><mxGeometry x="235" y="325" width="58" height="58" as="geometry"/></mxCell>

    <!-- 02 | SANDBOXED TEST (Top-Right) -->
    <mxCell id="c66_2" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:18px;font-weight:900;color:#0F172A;'&gt;🖥 02 | SANDBOXED TEST&lt;/div&gt;&lt;div style='font-size:14.5px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;The task is executed within an isolated, secure VPC Sandbox (GKE/gVisor).&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="680" y="205" width="385" height="140" as="geometry"/></mxCell>

    <!-- 03 | EVALUATION GATE (Middle-Right) -->
    <mxCell id="b66_3" value="03" style="ellipse;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=18;" vertex="1" parent="1"><mxGeometry x="855" y="455" width="58" height="58" as="geometry"/></mxCell>
    <mxCell id="c66_3" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:18px;font-weight:900;color:#0F172A;'&gt;🛡 03 | EVALUATION GATE&lt;/div&gt;&lt;div style='font-size:14.5px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;Tests, constraints, and criteria are automatically checked.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="715" y="505" width="350" height="135" as="geometry"/></mxCell>

    <!-- DEPLOY ON + EXIT TO DEPLOY (Bottom-Right) -->
    <mxCell id="pil66_dep" value="DEPLOY   ● ON" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#16A34A;strokeColor=#15803D;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="905" y="675" width="160" height="36" as="geometry"/></mxCell>
    <mxCell id="c66_exit" value="&lt;div style='padding:14px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:24px;'&gt;🚀&lt;/div&gt;&lt;div style='font-size:18px;font-weight:900;color:#0F172A;margin-top:4px;'&gt;EXIT TO DEPLOY&lt;/div&gt;&lt;div style='font-size:13.5px;color:#334155;margin-top:4px;line-height:1.35;'&gt;Release final task outputs to users or systems safely (Google Cloud deployment)&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="775" y="795" width="290" height="150" as="geometry"/></mxCell>

    <!-- 04 | SELF-HEALING LOOP (Bottom-Left) + RETRY ACTIVE -->
    <mxCell id="pil66_ret" value="RETRY   ● ACTIVE" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#DC2626;strokeColor=#991B1B;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="470" y="810" width="190" height="36" as="geometry"/></mxCell>
    <mxCell id="b66_4" value="↻" style="ellipse;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=24;" vertex="1" parent="1"><mxGeometry x="215" y="645" width="58" height="58" as="geometry"/></mxCell>
    <mxCell id="c66_4" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:18px;font-weight:900;color:#0F172A;'&gt;04 | SELF-HEALING LOOP&lt;/div&gt;&lt;div style='font-size:14.5px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;Analyzes error and failure logs to formulate a new prompting and fix-it strategy.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="695" width="370" height="145" as="geometry"/></mxCell>

    <!-- Cycle Arrows -->
    <mxCell id="e66_12" value="Orchestrate" style="edgeStyle=orthogonalEdgeStyle;curved=1;html=1;strokeColor=#0F172A;strokeWidth=3.5;endArrow=block;labelBackgroundColor=#E0F2FE;fontStyle=1;fontSize=15;" edge="1" parent="1" source="c66_1" target="c66_2"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e66_23" value="Execute" style="edgeStyle=orthogonalEdgeStyle;curved=1;html=1;strokeColor=#2563EB;strokeWidth=3.5;endArrow=block;labelBackgroundColor=#E0F2FE;fontStyle=1;fontSize=15;" edge="1" parent="1" source="c66_2" target="b66_3"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e66_pass" value="PASS" style="edgeStyle=orthogonalEdgeStyle;curved=1;html=1;strokeColor=#16A34A;strokeWidth=3.5;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;fontStyle=1;fontSize=14;fontColor=#15803D;exitX=0.35;exitY=1;entryX=0.25;entryY=0;" edge="1" parent="1" source="c66_3" target="c66_exit"><mxGeometry relative="1" as="geometry"/></mxCell>
    <mxCell id="e66_fail" value="FAIL" style="edgeStyle=orthogonalEdgeStyle;curved=1;html=1;strokeColor=#DC2626;strokeWidth=3.5;endArrow=block;labelBackgroundColor=#FCFBF7;fontStyle=1;fontSize=15;fontColor=#B91C1C;" edge="1" parent="1" source="c66_3" target="c66_4"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="640" y="780"/></Array></mxGeometry></mxCell>
    <mxCell id="e66_retry" value="RETRY FEEDBACK PATH" style="edgeStyle=orthogonalEdgeStyle;curved=1;html=1;strokeColor=#0F172A;strokeWidth=3.5;endArrow=block;labelBackgroundColor=#E0F2FE;fontStyle=1;fontSize=14;" edge="1" parent="1" source="b66_4" target="b66_1"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="205" y="510"/></Array></mxGeometry></mxCell>

    <!-- Bottom 2 Columns: Continuous Safeguards & Key Artifacts -->
    <mxCell id="bot66_L" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21px;font-weight:900;color:#0F172A;margin-bottom:10px;'&gt;Continuous Safeguards&lt;/div&gt;&lt;div style='font-size:14px;color:#0F172A;margin-bottom:8px;'&gt;&lt;span style='background:#2563EB;color:#FFF;padding:2px 8px;border-radius:999px;font-weight:800;margin-right:8px;'&gt;1&lt;/span&gt;&lt;b&gt;Max Retry Limits&lt;/b&gt; to prevent runaway loops&lt;/div&gt;&lt;div style='font-size:14px;color:#0F172A;margin-bottom:8px;'&gt;&lt;span style='background:#2563EB;color:#FFF;padding:2px 8px;border-radius:999px;font-weight:800;margin-right:8px;'&gt;2&lt;/span&gt;&lt;b&gt;Secure Sandboxing&lt;/b&gt; via isolated containers&lt;/div&gt;&lt;div style='font-size:14px;color:#0F172A;'&gt;&lt;span style='background:#2563EB;color:#FFF;padding:2px 8px;border-radius:999px;font-weight:800;margin-right:8px;'&gt;3&lt;/span&gt;&lt;b&gt;Deterministic Validation&lt;/b&gt; against strict schemas&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;" vertex="1" parent="1"><mxGeometry x="55" y="980" width="490" height="190" as="geometry"/></mxCell>

    <mxCell id="bot66_R" value="&lt;div style='padding:14px 18px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21px;font-weight:900;color:#0F172A;margin-bottom:10px;'&gt;Key Artifacts&lt;/div&gt;&lt;div style='background:#F1F5F9;border:1px solid #CBD5E1;padding:6px 12px;border-radius:999px;font-size:13px;color:#0F172A;margin-bottom:8px;'&gt;&lt;span style='background:#64748B;color:#FFF;padding:1px 7px;border-radius:999px;font-weight:800;margin-right:6px;'&gt;1&lt;/span&gt;&lt;b&gt;Failure &amp;amp; Error Logs:&lt;/b&gt; &amp;ldquo;Fed back into Gemini as context&amp;rdquo;&lt;/div&gt;&lt;div style='background:#F1F5F9;border:1px solid #CBD5E1;padding:6px 12px;border-radius:999px;font-size:13px;color:#0F172A;margin-bottom:8px;'&gt;&lt;span style='background:#64748B;color:#FFF;padding:1px 7px;border-radius:999px;font-weight:800;margin-right:6px;'&gt;2&lt;/span&gt;&lt;b&gt;Target Constraints:&lt;/b&gt; &amp;ldquo;Clear metrics defining task success&amp;rdquo;&lt;/div&gt;&lt;div style='background:#F1F5F9;border:1px solid #CBD5E1;padding:6px 12px;border-radius:999px;font-size:13px;color:#0F172A;'&gt;&lt;span style='background:#64748B;color:#FFF;padding:1px 7px;border-radius:999px;font-weight:800;margin-right:6px;'&gt;3&lt;/span&gt;&lt;b&gt;Human escalations:&lt;/b&gt; &amp;ldquo;Graceful handover if retries are exhausted&amp;rdquo;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;" vertex="1" parent="1"><mxGeometry x="570" y="980" width="495" height="190" as="geometry"/></mxCell>

    <mxCell id="ftr66" value="GOOGLE CLOUD • GEMINI • ENTERPRISE AGENT REFERENCE ARCHITECTURE • REVISION 2.4 • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;letterSpacing=0.8;" vertex="1" parent="1"><mxGeometry x="0" y="1295" width="1120" height="45" as="geometry"/></mxCell>
  </root></mxGraphModel></diagram></mxfile>`;
}
