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
  const effectiveTitleInput = spec?.title?.trim() || customTitle;
  const cleanCustomTitle =
    effectiveTitleInput &&
    !effectiveTitleInput.includes('Global Real-Time Payments Mesh') &&
    effectiveTitleInput.trim() !== ''
      ? effectiveTitleInput.trim()
      : undefined;

  const baseXml = generateBaseInfographicBlueprintXmlById(id, cleanCustomTitle, level);
  if (!cleanCustomTitle && !spec) {
    return baseXml;
  }
  return applyDynamicInfographicSpecToXml(baseXml, id, cleanCustomTitle, spec);
}

function generateBaseInfographicBlueprintXmlById(
  id: string,
  cleanCustomTitle?: string,
  level: 'L1' | 'L2' | 'L3' | 'L4' = 'L2'
): string {
  const meta = INFOGRAPHIC_BLUEPRINTS_LIST.find((m) => m.id === id) || INFOGRAPHIC_BLUEPRINTS_LIST[0];
  const items = null;

  // ============================================================================
  // 1. #52: ANATOMY / DECONSTRUCTION (Exact 1:1 Vector Twin of 52.png)
  // ============================================================================
  if (id === '52' && !items) {
    return generateTemplate52ContextHarnessLoopGraphXml(cleanCustomTitle);
  }

  const cleanSvg = (s: string) => esc(s.replace(/\r?\n\s*/g, ' ').replace(/>\s+</g, '><').trim());

  // ============================================================================
  // 2. #53: HOW TO USE CLAUDE CODE + CODEX (Exact 1:1 Vector Twin of 53.png)
  // ============================================================================
  if (id === '53' && !items) {
    const hTitle = esc(cleanCustomTitle || 'How to use Claude Code + Codex');
    const bgSvg53 = `<svg xmlns="http://www.w3.org/2000/svg" width="1075" height="1310" viewBox="0 0 1075 1310" style="display:block;">
      <defs>
        <pattern id="grid53" width="53.75" height="53.75" patternUnits="userSpaceOnUse">
          <path d="M 53.75 0 L 0 0 0 53.75" fill="none" stroke="#EDF2F9" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1075" height="1310" fill="#FCFDFE"/>
      <rect width="1075" height="1310" fill="url(#grid53)"/>
      <!-- Top-Left Peach Starburst Watermark -->
      <g stroke="#FAD7BA" stroke-width="24" stroke-linecap="round" opacity="0.72">
        <line x1="-10" y1="68" x2="72" y2="-15"/>
        <line x1="-10" y1="68" x2="122" y2="28"/>
        <line x1="-10" y1="68" x2="162" y2="105"/>
        <line x1="-10" y1="68" x2="105" y2="165"/>
        <line x1="-10" y1="68" x2="25" y2="195"/>
      </g>
      <!-- Top-Right Periwinkle Hexagonal Swirl Watermark -->
      <g fill="none" stroke="#D5E3FA" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity="0.78">
        <circle cx="1015" cy="35" r="115"/>
        <path d="M 940 -40 L 1045 -20 L 1085 75 L 995 130 L 915 65 Z"/>
        <path d="M 975 -10 L 1060 40 L 1020 120 L 935 85 L 945 -5"/>
      </g>
    </svg>`;

    const codexLogo53 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style="vertical-align:middle;margin-right:8px;"><path d="M16 2 C19 2 21 4 23 5 C26 4 29 7 28 10 C30 12 30 15 29 18 C30 21 28 25 25 25 C23 28 19 30 16 29 C13 30 9 28 7 25 C4 25 2 21 3 18 C2 15 2 12 4 10 C3 7 6 4 9 5 C11 4 13 2 16 2 Z" fill="#0F172A"/><text x="16" y="20" font-family="monospace" font-size="12.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">&gt;_</text></svg>`;
    const claudeCrab53 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" style="vertical-align:middle;margin-right:8px;"><rect x="4" y="4" width="24" height="14" rx="2" fill="#D96B38"/><rect x="1" y="8" width="3" height="6" fill="#D96B38"/><rect x="28" y="8" width="3" height="6" fill="#D96B38"/><rect x="9" y="8" width="3" height="5" fill="#1E293B"/><rect x="20" y="8" width="3" height="5" fill="#1E293B"/><rect x="6" y="18" width="3" height="6" fill="#D96B38"/><rect x="11" y="18" width="3" height="6" fill="#D96B38"/><rect x="18" y="18" width="3" height="6" fill="#D96B38"/><rect x="23" y="18" width="3" height="6" fill="#D96B38"/></svg>`;

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_53_${level}" name="${hTitle}"><mxGraphModel dx="1075" dy="1310" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1075" pageHeight="1310" background="#FCFDFE"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${cleanSvg(bgSvg53)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1075" height="1310" as="geometry"/></mxCell>

      <!-- Header -->
      <mxCell id="hdr53" value="&lt;div style='text-align:center;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:43px;font-weight:800;color:#0F172A;letter-spacing:-0.6px;'&gt;How to use &lt;span style='color:#EA7A47;'&gt;Claude Code&lt;/span&gt; + &lt;span style='color:#3B82F6;'&gt;Codex&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:18.5px;color:#475569;margin-top:8px;font-weight:500;'&gt;Install the apps, add your tools, then check the result.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="50" y="20" width="975" height="86" as="geometry"/></mxCell>

      <!-- SECTION 01: INSTALL + START -->
      <mxCell id="band53_1" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=5;fillColor=#F5F9FF;strokeColor=#E2ECFC;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="26" y="122" width="1023" height="316" as="geometry"/></mxCell>
      <mxCell id="b53_01" value="01" style="ellipse;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="44" y="138" width="42" height="42" as="geometry"/></mxCell>
      <mxCell id="t53_01" value="INSTALL + START" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=19.5;fontColor=#1E40AF;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="98" y="140" width="260" height="38" as="geometry"/></mxCell>
      <mxCell id="pill53_1" value="Codex leads. Claude Code advises." style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EDF5FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=20;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="224" y="180" width="640" height="46" as="geometry"/></mxCell>

      <mxCell id="c53_codex" value="&lt;div style='padding:14px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;align-items:center;justify-content:center;'&gt;${cleanSvg(codexLogo53)}&lt;span style='font-size:23px;font-weight:800;color:#2554B0;'&gt;Codex&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:16px;color:#334155;margin-top:10px;line-height:1.48;'&gt;1. Download Codex.&lt;br/&gt;2. Sign in with ChatGPT.&lt;/div&gt;&lt;div style='font-size:14.5px;color:#64748B;margin-top:10px;'&gt;Your main app for the work.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="246" width="305" height="172" as="geometry"/></mxCell>

      <mxCell id="c53_proj" value="&lt;div style='padding:14px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:22px;font-weight:800;color:#2554B0;margin-top:4px;'&gt;Open a project&lt;/div&gt;&lt;div style='font-size:16px;color:#334155;margin-top:12px;line-height:1.48;'&gt;3. Select your folder.&lt;br/&gt;4. Start a new task.&lt;/div&gt;&lt;div style='font-size:14.5px;color:#64748B;margin-top:10px;'&gt;Add your goal + files.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.8;" vertex="1" parent="1"><mxGeometry x="412" y="246" width="265" height="172" as="geometry"/></mxCell>

      <mxCell id="c53_claude" value="&lt;div style='padding:12px 14px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;align-items:center;justify-content:center;'&gt;${cleanSvg(claudeCrab53)}&lt;span style='font-size:22px;font-weight:800;color:#2554B0;'&gt;Claude Code&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:15.5px;color:#334155;margin-top:8px;line-height:1.42;'&gt;1. Install the Claude app.&lt;br/&gt;2. Sign in &amp;rarr; Code tab.&lt;/div&gt;&lt;div style='font-size:14px;color:#64748B;margin-top:8px;line-height:1.35;'&gt;3. Select the same folder.&lt;br/&gt;Optional backup for advice.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="724" y="246" width="305" height="172" as="geometry"/></mxCell>

      <mxCell id="e53_1a" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="c53_codex" target="c53_proj"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e53_1b" value="" style="edgeStyle=none;html=1;strokeColor=#D96B38;strokeWidth=2;dashed=1;dashPattern=4 4;startArrow=block;startFill=1;endArrow=block;endFill=1;" edge="1" parent="1" source="c53_proj" target="c53_claude"><mxGeometry relative="1" as="geometry"/></mxCell>

      <!-- SECTION 02: ADD YOUR TOOLS -->
      <mxCell id="band53_2" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F8F6FF;strokeColor=#E9E5FC;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="26" y="458" width="1023" height="432" as="geometry"/></mxCell>
      <mxCell id="b53_02" value="02" style="ellipse;whiteSpace=wrap;html=1;fillColor=#4F46E5;strokeColor=#4F46E5;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="44" y="474" width="42" height="42" as="geometry"/></mxCell>
      <mxCell id="t53_02" value="ADD YOUR TOOLS" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=19.5;fontColor=#1E40AF;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="98" y="476" width="260" height="38" as="geometry"/></mxCell>

      <mxCell id="q53_app" value="Need to work inside another app?" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EDF5FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=20;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="280" y="514" width="530" height="48" as="geometry"/></mxCell>
      <mxCell id="e53_p2q" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="544" y="418" as="sourcePoint"/><mxPoint x="544" y="514" as="targetPoint"/></mxGeometry></mxCell>

      <mxCell id="c53_files" value="&lt;div style='padding:16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:22px;font-weight:800;color:#2554B0;'&gt;Files + skills&lt;/div&gt;&lt;div style='font-size:15.5px;color:#334155;margin-top:12px;line-height:1.5;'&gt;1. Open your folder.&lt;br/&gt;2. Install a skill plugin.&lt;/div&gt;&lt;div style='font-size:14.5px;color:#64748B;margin-top:10px;line-height:1.4;'&gt;3. Start a new task.&lt;br/&gt;Use its saved steps.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="610" width="265" height="190" as="geometry"/></mxCell>

      <mxCell id="q53_conn" value="Is there a suitable tool connection?" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EDF5FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=19.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="436" y="606" width="592" height="48" as="geometry"/></mxCell>

      <mxCell id="c53_mcp" value="&lt;div style='padding:12px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21.5px;font-weight:800;color:#2554B0;'&gt;MCP / plugin&lt;/div&gt;&lt;div style='font-size:15.5px;color:#334155;margin-top:8px;line-height:1.45;'&gt;1. Plugins &amp;rarr; install.&lt;br/&gt;2. Connect your account.&lt;/div&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-top:8px;line-height:1.35;'&gt;Manual MCP: Settings &amp;rarr;&lt;br/&gt;MCP servers &amp;rarr; Add server.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="372" y="704" width="305" height="154" as="geometry"/></mxCell>

      <mxCell id="c53_cu" value="&lt;div style='padding:12px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21.5px;font-weight:800;color:#2554B0;'&gt;Computer use&lt;/div&gt;&lt;div style='font-size:15.5px;color:#334155;margin-top:8px;line-height:1.45;'&gt;1. Ask for computer use.&lt;br/&gt;2. Allow the app.&lt;/div&gt;&lt;div style='font-size:13.5px;color:#64748B;margin-top:8px;line-height:1.35;'&gt;3. Enable screen recording&lt;br/&gt;+ accessibility on Mac.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="724" y="704" width="305" height="154" as="geometry"/></mxCell>

      <!-- Branch Lines & Pill Badges in Section 02 -->
      <mxCell id="e53_q1_no" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="402" y="562" as="sourcePoint"/><mxPoint x="192" y="610" as="targetPoint"/><Array as="points"><mxPoint x="402" y="584"/><mxPoint x="192" y="584"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_no1" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="272" y="571" width="54" height="24" as="geometry"/></mxCell>

      <mxCell id="e53_q1_yes" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="688" y="562" as="sourcePoint"/><mxPoint x="732" y="606" as="targetPoint"/><Array as="points"><mxPoint x="688" y="582"/><mxPoint x="732" y="582"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_yes1" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="712" y="569" width="56" height="24" as="geometry"/></mxCell>

      <mxCell id="e53_q2_yes" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="595" y="654" as="sourcePoint"/><mxPoint x="524" y="704" as="targetPoint"/><Array as="points"><mxPoint x="595" y="676"/><mxPoint x="524" y="676"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_yes2" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="532" y="664" width="56" height="24" as="geometry"/></mxCell>

      <mxCell id="e53_q2_no" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="860" y="654" as="sourcePoint"/><mxPoint x="876" y="704" as="targetPoint"/><Array as="points"><mxPoint x="860" y="676"/><mxPoint x="876" y="676"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_no2" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="888" y="664" width="54" height="24" as="geometry"/></mxCell>

      <!-- Collector Merge Line from all 3 Tool Cards into Section 03 (exact 53.png right-wrap from Computer use) -->
      <mxCell id="e53_m_L" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=none;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="192" y="800" as="sourcePoint"/><mxPoint x="544" y="875" as="targetPoint"/><Array as="points"><mxPoint x="192" y="875"/></Array></mxGeometry></mxCell>
      <mxCell id="e53_m_M" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=none;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="524" y="858" as="sourcePoint"/><mxPoint x="524" y="875" as="targetPoint"/></mxGeometry></mxCell>
      <mxCell id="e53_m_R" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=none;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1029" y="768" as="sourcePoint"/><mxPoint x="544" y="875" as="targetPoint"/><Array as="points"><mxPoint x="1042" y="768"/><mxPoint x="1042" y="875"/></Array></mxGeometry></mxCell>
      <mxCell id="e53_m_C" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="544" y="875" as="sourcePoint"/><mxPoint x="544" y="964" as="targetPoint"/></mxGeometry></mxCell>

      <!-- SECTION 03: CHECK IT -->
      <mxCell id="band53_3" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=4;fillColor=#F5F9FF;strokeColor=#E2ECFC;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="26" y="910" width="1023" height="378" as="geometry"/></mxCell>
      <mxCell id="b53_03" value="03" style="ellipse;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="44" y="926" width="42" height="42" as="geometry"/></mxCell>
      <mxCell id="t53_03" value="CHECK IT" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=19.5;fontColor=#1E40AF;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="98" y="928" width="260" height="38" as="geometry"/></mxCell>

      <mxCell id="q53_brief" value="Does the result meet the brief?" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#EDF5FF;strokeColor=#93C5FD;strokeWidth=1.5;fontStyle=1;fontSize=20;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="280" y="964" width="530" height="48" as="geometry"/></mxCell>

      <mxCell id="c53_adv" value="&lt;div style='padding:14px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21.5px;font-weight:800;color:#2554B0;'&gt;Claude Code advises&lt;/div&gt;&lt;div style='font-size:15.5px;color:#475569;margin-top:10px;line-height:1.45;'&gt;Open the same project.&lt;br/&gt;Review what went wrong.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="1062" width="290" height="140" as="geometry"/></mxCell>

      <mxCell id="c53_fix" value="&lt;div style='padding:14px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:21.5px;font-weight:800;color:#2554B0;'&gt;Codex fixes + tests&lt;/div&gt;&lt;div style='font-size:15.5px;color:#475569;margin-top:10px;line-height:1.45;'&gt;Apply useful advice.&lt;br/&gt;Test the finished result.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="396" y="1062" width="295" height="140" as="geometry"/></mxCell>

      <mxCell id="c53_dec" value="&lt;div style='padding:14px 16px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:24px;font-weight:800;color:#FFFFFF;'&gt;You decide&lt;/div&gt;&lt;div style='font-size:15.5px;color:#CBD5E1;margin-top:10px;line-height:1.45;'&gt;Inspect the result.&lt;br/&gt;Approve when ready.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#071126;strokeColor=#071126;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="738" y="1062" width="290" height="140" as="geometry"/></mxCell>

      <mxCell id="e53_b_no" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="402" y="1012" as="sourcePoint"/><mxPoint x="205" y="1062" as="targetPoint"/><Array as="points"><mxPoint x="402" y="1036"/><mxPoint x="205" y="1036"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_no3" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="256" y="1024" width="54" height="24" as="geometry"/></mxCell>

      <mxCell id="e53_b_yes" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="688" y="1012" as="sourcePoint"/><mxPoint x="883" y="1062" as="targetPoint"/><Array as="points"><mxPoint x="688" y="1036"/><mxPoint x="883" y="1036"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_yes3" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="818" y="1024" width="56" height="24" as="geometry"/></mxCell>

      <mxCell id="e53_af" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="c53_adv" target="c53_fix"><mxGeometry relative="1" as="geometry"/></mxCell>

      <mxCell id="e53_recheck" value="" style="edgeStyle=none;html=1;strokeColor=#2554B0;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="544" y="1202" as="sourcePoint"/><mxPoint x="810" y="988" as="targetPoint"/><Array as="points"><mxPoint x="544" y="1244"/><mxPoint x="1046" y="1244"/><mxPoint x="1046" y="988"/></Array></mxGeometry></mxCell>
      <mxCell id="pil53_rec" value="RECHECK" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;fontColor=#334155;" vertex="1" parent="1"><mxGeometry x="908" y="1232" width="96" height="24" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 3. #54: GPT-6 ASTRA COMPUTER USE CHEAT SHEET (Exact 1:1 Vector Twin of 54.png)
  // ============================================================================
  if (id === '54' && !items) {
    const hTitle = esc(cleanCustomTitle || 'GPT-6 Astra Computer Use');
    const bg54Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="886" height="1024" viewBox="0 0 886 1024" style="display:block;">
      <defs>
        <pattern id="g54" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#EDF2F9" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="886" height="1024" fill="#FBFCFF"/>
      <rect width="886" height="1024" fill="url(#g54)"/>
      <!-- Top-Right Periwinkle Hexagonal Knot Swirl Watermark -->
      <g transform="translate(788, 22)" fill="none" stroke="#DCE5FC" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
        <path d="M -32 -78 C 8 -108, 68 -88, 72 -34 C 75 8, 36 38, 0 58"/>
        <path d="M 32 -78 C 78 -56, 102 0, 68 46 C 42 82, -8 78, -42 62"/>
        <path d="M 82 -18 C 98 32, 64 88, 12 92 C -32 95, -62 56, -78 18"/>
        <path d="M 52 54 C 18 96, -42 104, -78 66 C -106 36, -92 -18, -68 -52"/>
        <path d="M -18 76 C -68 86, -112 42, -104 -12 C -98 -56, -52 -78, -12 -90"/>
        <path d="M -68 28 C -104 -10, -98 -72, -52 -98 C -14 -118, 36 -96, 62 -62"/>
        <polygon points="0,-36 32,-18 32,18 0,36 -32,18 -32,-18" stroke-width="14"/>
      </g>
      <line x1="0" y1="112" x2="886" y2="112" stroke="#E8EEF7" stroke-width="1.5"/>
    </svg>`);

    const chromeSvg = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:6px;"><circle cx="12" cy="12" r="10" fill="#FBBC05"/><path d="M12 2 A10 10 0 0 1 20.66 7 L12 7 Z" fill="#EA4335"/><path d="M3.34 7 A10 10 0 0 1 20.66 7 L15.5 15.5 L12 7 Z" fill="#EA4335"/><path d="M3.34 7 A10 10 0 0 0 12 22 L16.33 14.5 L8.5 14.5 Z" fill="#34A853"/><circle cx="12" cy="12" r="4.6" fill="#FFFFFF"/><circle cx="12" cy="12" r="3.6" fill="#4285F4"/></svg>`;
    const xeroSvg = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:10px;"><rect x="1" y="1" width="22" height="22" rx="4" fill="#13B5EA"/><text x="12" y="14.5" text-anchor="middle" fill="#FFFFFF" font-family="Inter,sans-serif" font-size="7.2" font-weight="800">xero</text></svg>`;
    const gmailSvg = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:10px;"><path d="M2 6.5V18c0 1.1.9 2 2 2h2V9.8l6 4.5 6-4.5V20h2c1.1 0 2-.9 2-2V6.5c0-1.8-2.1-2.8-3.5-1.7L12 10 5.5 4.8C4.1 3.7 2 4.7 2 6.5z" fill="#EA4335"/><path d="M2 6.5V18c0 1.1.9 2 2 2h2V9.8L2 6.8z" fill="#4285F4"/><path d="M22 6.5V18c0 1.1-.9 2-2 2h-2V9.8l4-3z" fill="#34A853"/><path d="M18 9.8V4.8L12 9.3 6 4.8v5l6 4.5z" fill="#EA4335"/><path d="M2 6.5c0-1.8 2.1-2.8 3.5-1.7L6 5.2v4.6L2 6.8z" fill="#C5221F"/><path d="M22 6.5c0-1.8-2.1-2.8-3.5-1.7L18 5.2v4.6l4-3z" fill="#FBBC04"/></svg>`;
    const sheetsSvg = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:10px;"><rect x="4" y="2" width="16" height="20" rx="2.5" fill="#16A34A"/><rect x="7" y="8" width="10" height="9" fill="none" stroke="#FFFFFF" stroke-width="1.6"/><line x1="7" y1="12.5" x2="17" y2="12.5" stroke="#FFFFFF" stroke-width="1.4"/><line x1="11.5" y1="8" x2="11.5" y2="17" stroke="#FFFFFF" stroke-width="1.4"/></svg>`;
    const figmaSvg = `<svg width="16" height="20" viewBox="0 0 18 24" style="vertical-align:middle;margin-right:6px;"><circle cx="5" cy="4.5" r="3.8" fill="#F24E1E"/><circle cx="12.5" cy="4.5" r="3.8" fill="#FF7262"/><circle cx="5" cy="12" r="3.8" fill="#A259FF"/><circle cx="12.5" cy="12" r="3.8" fill="#1ABCFE"/><circle cx="5" cy="19.5" r="3.8" fill="#0ACF83"/></svg>`;
    const canvaSvg = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:10px;"><circle cx="12" cy="12" r="10" fill="#4F46E5"/><path d="M15.5 8.5 C13.5 6.5, 8.5 7.5, 8.5 12.2 C8.5 16.5, 13.2 17.5, 15.5 14.8" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/></svg>`;
    const toggleOffSvg = `<svg width="28" height="16" viewBox="0 0 28 16" style="vertical-align:middle;margin:0 16px 0 8px;"><rect x="0" y="0" width="28" height="16" rx="8" fill="#BAC6DD"/><circle cx="8" cy="8" r="5.5" fill="#FFFFFF"/></svg>`;

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_54_${level}" name="${hTitle}"><mxGraphModel dx="886" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="886" pageHeight="1024" background="#FBFCFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg54Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="886" height="1024" as="geometry"/></mxCell>

      <!-- Header -->
      <mxCell id="hdr54" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:44px;font-weight:800;color:#0B1324;letter-spacing:-1px;line-height:1.1;'&gt;GPT-6 Astra &lt;span style='color:#2D68FF;'&gt;Computer Use&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:18.5px;color:#475569;margin-top:8px;font-weight:500;'&gt;Set it up on a Mac, then copy four prompts that do real work.&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="20" y="16" width="840" height="86" as="geometry"/></mxCell>

      <!-- LEFT COLUMN: Start using it (Steps 01 - 07) -->
      <mxCell id="col54_L" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="20" y="122" width="414" height="716" as="geometry"/></mxCell>
      <mxCell id="hdr54_L" value="Start using it" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=24;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="38" y="138" width="320" height="32" as="geometry"/></mxCell>

      <mxCell id="s54_1" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;border-bottom:1px solid #F1F5F9;padding-bottom:10px;"><div style="display:flex;align-items:center;"><span style="background:#DCEBFF;color:#2563EB;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">01</span><b style="font-size:15px;color:#0F172A;">Open Codex</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Choose GPT-6 Astra in a desktop task, if available.</div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="178" width="378" height="64" as="geometry"/></mxCell>

      <mxCell id="s54_2" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;border-bottom:1px solid #F1F5F9;padding-bottom:10px;"><div style="display:flex;align-items:center;"><span style="background:#DCEBFF;color:#2563EB;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">02</span><b style="font-size:15px;color:#0F172A;">Install Computer Use</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Plugins → Computer Use; enable server and skill, then select Try now.</div><div style="margin-left:34px;margin-top:9px;display:flex;align-items:center;"><span style="font-size:11.5px;font-weight:700;color:#334155;">Server</span>${toggleOffSvg}<span style="font-size:11.5px;font-weight:700;color:#334155;">Skill</span>${toggleOffSvg}<span style="background:#F7EEFF;color:#1E293B;padding:4px 28px 4px 12px;border-radius:6px;font-size:11.5px;font-weight:700;margin-left:8px;">Try now</span></div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="250" width="378" height="98" as="geometry"/></mxCell>

      <mxCell id="s54_3" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;border-bottom:1px solid #F1F5F9;padding-bottom:10px;"><div style="display:flex;align-items:center;"><span style="background:#DCEBFF;color:#2563EB;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">03</span><b style="font-size:15px;color:#0F172A;">Grant Mac permissions</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Allow Screen Recording to see, and Accessibility to click and type.</div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="356" width="378" height="66" as="geometry"/></mxCell>

      <mxCell id="s54_4" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;border-bottom:1px solid #F1F5F9;padding-bottom:10px;"><div style="display:flex;align-items:center;"><span style="background:#DCEBFF;color:#2563EB;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">04</span><b style="font-size:15px;color:#0F172A;">Connect Chrome</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Settings → Computer Use → Chrome; install the extension and confirm Manage.</div><div style="margin-left:34px;margin-top:8px;display:flex;align-items:center;gap:8px;"><span style="display:inline-block;width:215px;background:#EAF2FF;color:#1E293B;padding:5px 10px;border-radius:6px;font-size:11.5px;font-weight:700;">Chrome</span><span style="display:inline-block;width:82px;background:#F7EEFF;color:#1E293B;padding:5px 10px;border-radius:6px;font-size:11.5px;font-weight:700;">Manage</span></div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="430" width="378" height="98" as="geometry"/></mxCell>

      <mxCell id="s54_5" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;border-bottom:1px solid #F1F5F9;padding-bottom:10px;"><div style="display:flex;align-items:center;"><span style="background:#EDE9FE;color:#6D28D9;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">05</span><b style="font-size:15px;color:#0F172A;">Point it at the work</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Mention @Chrome or an app, then describe the result you want.</div><div style="margin-left:34px;margin-top:8px;background:#F2F3F8;padding:7px 10px;border-radius:8px;font-size:12px;color:#334155;font-weight:600;"><span style="background:#EAE0FC;color:#1E293B;padding:3px 10px;border-radius:6px;font-weight:700;margin-right:8px;">@Chrome</span>Compare these three suppliers.</div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="538" width="378" height="106" as="geometry"/></mxCell>

      <mxCell id="s54_6" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;border-bottom:1px solid #F1F5F9;padding-bottom:10px;"><div style="display:flex;align-items:center;"><span style="background:#EDE9FE;color:#6D28D9;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">06</span><b style="font-size:15px;color:#0F172A;">Approve access</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Allow the relevant app or website when prompted.</div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="652" width="378" height="64" as="geometry"/></mxCell>

      <mxCell id="s54_7" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;align-items:center;"><span style="background:#EDE9FE;color:#6D28D9;padding:3px 6px;border-radius:6px;font-weight:800;font-size:12.5px;margin-right:10px;">07</span><b style="font-size:15px;color:#0F172A;">Sign in yourself</b></div><div style="font-size:13px;color:#64748B;margin-left:34px;margin-top:3px;line-height:1.35;">Complete the login, let it continue, then inspect the result.</div><div style="font-size:11.5px;color:#64748B;margin-top:12px;">Availability depends on rollout and workspace settings.</div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="38" y="724" width="378" height="96" as="geometry"/></mxCell>

      <!-- Bottom-Left: Try this prompt -->
      <mxCell id="try54_hdr" value="Try this prompt" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=16;fontColor=#2D68FF;" vertex="1" parent="1"><mxGeometry x="34" y="852" width="240" height="24" as="geometry"/></mxCell>
      <mxCell id="try54_box" value="${cleanSvg(`<div style="padding:12px 16px;text-align:left;font-family:Inter,sans-serif;font-size:13.5px;color:#334155;line-height:1.42;">Use [app or page] to achieve [result].<br/>Use an available plugin for the work it supports, then Computer Use for remaining steps and visual checks. Preserve [constraints], check against [success criteria], and show me the result.</div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="20" y="882" width="414" height="128" as="geometry"/></mxCell>
      <mxCell id="try54_btn" value="↑" style="ellipse;whiteSpace=wrap;html=1;fillColor=#2D68FF;strokeColor=#2D68FF;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="392" y="972" width="30" height="30" as="geometry"/></mxCell>

      <!-- RIGHT COLUMN: Four jobs to start with -->
      <mxCell id="hdr54_R" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;"><div style="font-size:24px;font-weight:800;color:#0F172A;">Four jobs to start with</div><div style="font-size:13px;color:#64748B;margin-top:4px;">Example apps; available plugins vary by workspace.</div></div>`)}" style="text;html=1;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="452" y="122" width="418" height="54" as="geometry"/></mxCell>

      <mxCell id="ban54_R" value="${cleanSvg(`<div style="padding:12px 16px;text-align:left;font-family:Inter,sans-serif;"><div style="font-size:14.5px;font-weight:800;color:#0F172A;">Plugin → Computer Use → Check</div><div style="font-size:12.5px;color:#64748B;margin-top:4px;line-height:1.35;">Use a plugin where one exists, then Computer Use for the remaining steps and visual checks.</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#EEF4FF;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="452" y="186" width="418" height="80" as="geometry"/></mxCell>

      <mxCell id="job54_1" value="${cleanSvg(`<div style="padding:14px 16px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;align-items:center;font-size:15.5px;font-weight:800;color:#0F172A;">${chromeSvg}${xeroSvg}<span>Accounts: match invoices</span></div><div style="background:#F1F3F8;padding:10px 12px;border-radius:8px;font-size:13px;color:#334155;margin-top:10px;line-height:1.4;">@Chrome Compare these invoices with my purchase-order list. Flag unmatched invoices, duplicate invoice numbers and total mismatches in a review table.</div><div style="font-size:11.5px;color:#64748B;margin-top:8px;">Done when every invoice is matched or flagged for review.</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="452" y="280" width="418" height="168" as="geometry"/></mxCell>

      <mxCell id="job54_2" value="${cleanSvg(`<div style="padding:14px 16px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;align-items:center;font-size:15.5px;font-weight:800;color:#0F172A;">${chromeSvg}${gmailSvg}<span>Sales: draft follow-ups</span></div><div style="background:#F1F3F8;padding:10px 12px;border-radius:8px;font-size:13px;color:#334155;margin-top:10px;line-height:1.4;">@Chrome Open the five Gmail threads I've tagged. Draft a follow-up for each in my usual tone, under 90 words. Leave them all unsent.</div><div style="font-size:11.5px;color:#64748B;margin-top:8px;">Done when five drafts sit unsent, each under 90 words.</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="452" y="462" width="418" height="168" as="geometry"/></mxCell>

      <mxCell id="job54_3" value="${cleanSvg(`<div style="padding:14px 16px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;align-items:center;font-size:15.5px;font-weight:800;color:#0F172A;">${chromeSvg}${sheetsSvg}<span>Research: compare suppliers</span></div><div style="background:#F1F3F8;padding:10px 12px;border-radius:8px;font-size:13px;color:#334155;margin-top:10px;line-height:1.4;">@Chrome Open these three supplier pages. Build a table of price, lead time and returns policy. Note anything the page does not state.</div><div style="font-size:11.5px;color:#64748B;margin-top:8px;">Done when every cell is filled or marked as not stated.</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="452" y="644" width="418" height="168" as="geometry"/></mxCell>

      <mxCell id="job54_4" value="${cleanSvg(`<div style="padding:14px 16px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;align-items:center;font-size:15.5px;font-weight:800;color:#0F172A;">${figmaSvg}${canvaSvg}<span>Design: update a deck</span></div><div style="background:#F1F3F8;padding:10px 12px;border-radius:8px;font-size:13px;color:#334155;margin-top:10px;line-height:1.4;">@Figma Open my deck template. Apply the copy in my brief to slides 3 to 7, keep my type styles, and show me each slide before you move on.</div><div style="font-size:11.5px;color:#64748B;margin-top:8px;">Done when slides 3 to 7 have changed and the type styles are untouched.</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="452" y="826" width="418" height="184" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 4. #55: THE AI NOBODY SIGNED OFF (Exact 1:1 Vector Twin of 55.png)
  // ============================================================================
  if (id === '55' && !items) {
    const hTitle = esc(cleanCustomTitle || 'The AI Nobody Signed Off');
    const bg55Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="855" height="1024" viewBox="0 0 855 1024" style="display:block;">
      <defs>
        <pattern id="g55" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#F1F5FA" stroke-width="1"/>
        </pattern>
        <linearGradient id="suitFade" x1="0" y1="380" x2="0" y2="478" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0D1B38" stop-opacity="1"/>
          <stop offset="78%" stop-color="#1E2F4F" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#FCFDFE" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="855" height="1024" fill="#FCFDFE"/>
      <rect width="855" height="1024" fill="url(#g55)"/>
      <line x1="322" y1="115" x2="322" y2="1024" stroke="#E8EEF6" stroke-width="1.2"/>

      <!-- Speech Bubble with Pointer Tail -->
      <path d="M 172 198 H 272 A 22 22 0 0 1 294 220 V 288 A 22 22 0 0 1 272 310 H 198 L 169 333 L 178 310 H 172 A 22 22 0 0 1 150 288 V 220 A 22 22 0 0 1 172 198 Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.8" stroke-linejoin="round"/>

      <!-- Executive Vector Illustration (Navy Suit + Green Tie) -->
      <g>
        <!-- Suit Shoulders & Jacket -->
        <path d="M 18 470 L 18 422 C 38 412, 68 398, 86 386 L 122 468 L 154 386 C 174 398, 202 412, 222 422 L 222 470 Z" fill="url(#suitFade)"/>
        <!-- White Shirt V-Neck -->
        <polygon points="88,384 152,384 124,468" fill="#FFFFFF"/>
        <!-- Shirt Collar -->
        <polygon points="88,380 120,404 98,422 80,392" fill="#FFFFFF" stroke="#0D1B38" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="152,380 120,404 142,422 160,392" fill="#FFFFFF" stroke="#0D1B38" stroke-width="2" stroke-linejoin="round"/>
        <!-- Green Tie -->
        <polygon points="113,402 129,402 125,418 117,418" fill="#4D9A56" stroke="#0D1B38" stroke-width="1.8" stroke-linejoin="round"/>
        <polygon points="117,418 125,418 132,468 114,468" fill="#70B668" stroke="#0D1B38" stroke-width="1.6" stroke-linejoin="round"/>
        <!-- Suit Lapel White Outlines -->
        <path d="M 80 392 L 58 424 L 78 430 L 66 446 L 105 466" fill="none" stroke="#CBD5E1" stroke-width="1.6"/>
        <path d="M 160 392 L 182 424 L 162 430 L 174 446 L 138 466" fill="none" stroke="#CBD5E1" stroke-width="1.6"/>
        <!-- Neck -->
        <path d="M 94 356 L 92 388 L 120 404 L 146 388 L 142 354 Z" fill="#FFFFFF" stroke="#0D1B38" stroke-width="2"/>
        <path d="M 105 370 Q 120 378 134 368" fill="none" stroke="#64748B" stroke-width="1.3"/>
        <!-- Ears -->
        <path d="M 74 318 C 63 316, 63 344, 77 346" fill="#FFFFFF" stroke="#0D1B38" stroke-width="2"/>
        <path d="M 70 326 C 68 332, 70 338, 74 339" fill="none" stroke="#0D1B38" stroke-width="1.4"/>
        <path d="M 145 316 C 152 316, 152 340, 144 342" fill="#FFFFFF" stroke="#0D1B38" stroke-width="2"/>
        <!-- Face Head Outline -->
        <path d="M 76 292 C 76 338, 84 368, 118 368 C 142 368, 146 340, 145 294 Z" fill="#FFFFFF" stroke="#0D1B38" stroke-width="2.2"/>
        <!-- Hair -->
        <path d="M 73 318 C 66 298, 70 272, 92 268 C 106 256, 142 260, 146 286 C 150 298, 148 310, 145 316 C 143 296, 138 286, 124 286 C 108 286, 94 292, 85 286 C 80 296, 80 310, 76 318 Z" fill="#081229"/>
        <!-- Eyebrows -->
        <path d="M 90 307 Q 100 303 108 307" fill="none" stroke="#081229" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M 122 307 Q 131 303 138 307" fill="none" stroke="#081229" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Eyes -->
        <ellipse cx="100" cy="316" rx="2.6" ry="3.2" fill="#081229"/>
        <ellipse cx="130" cy="316" rx="2.6" ry="3.2" fill="#081229"/>
        <!-- Nose -->
        <path d="M 116 314 L 118 332 Q 114 335 111 333" fill="none" stroke="#0D1B38" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Smile -->
        <path d="M 101 344 Q 116 351 129 343" fill="none" stroke="#0D1B38" stroke-width="2" stroke-linecap="round"/>
        <path d="M 111 353 Q 117 355 123 353" fill="none" stroke="#64748B" stroke-width="1.4" stroke-linecap="round"/>
      </g>
    </svg>`);

    const mkIcon = (bg: string, stroke: string, path: string) =>
      `<div style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:${bg};border-radius:6px;margin-bottom:4px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${path}</svg></div>`;

    const rightBubbles = [
      { label: 'A dashboard<br/>nobody owns', x: 363, y: 235, w: 122, h: 122, stroke: '#7BB6F9', icon: mkIcon('#DCEBFE', '#2563EB', '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="8" y1="15" x2="8" y2="11"/><line x1="12" y1="15" x2="12" y2="9"/><line x1="16" y1="15" x2="16" y2="12"/>') },
      { label: 'A fraud<br/>check', x: 511, y: 204, w: 78, h: 78, stroke: '#7BB6F9', icon: mkIcon('#DCEBFE', '#2563EB', '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>') },
      { label: 'A script on a<br/>laptop', x: 593, y: 188, w: 110, h: 110, stroke: '#F4AC80', icon: mkIcon('#FDE6D5', '#D97706', '<rect x="4" y="5" width="16" height="11" rx="1.5"/><line x1="2" y1="19" x2="22" y2="19"/>') },
      { label: 'An extension someone<br/>installed', x: 677, y: 247, w: 172, h: 172, stroke: '#F4AC80', icon: mkIcon('#FDE6D5', '#D97706', '<path d="M12 22v-5"/><path d="M9 8V3"/><path d="M15 8V3"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>') },
      { label: 'A lead scorer', x: 451, y: 326, w: 108, h: 108, stroke: '#78C8A0', icon: mkIcon('#D8F3E5', '#15803D', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>') },
      { label: 'An SEO writer', x: 561, y: 299, w: 112, h: 112, stroke: '#7BB6F9', icon: mkIcon('#DCEBFE', '#2563EB', '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>') },
      { label: 'A site<br/>recommender', x: 338, y: 382, w: 128, h: 128, stroke: '#78C8A0', icon: mkIcon('#D8F3E5', '#15803D', '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>') },
      { label: 'An interview<br/>booker', x: 541, y: 413, w: 108, h: 108, stroke: '#78C8A0', icon: mkIcon('#D8F3E5', '#15803D', '<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>') },
      { label: 'A ticket<br/>router', x: 656, y: 444, w: 86, h: 86, stroke: '#7BB6F9', icon: mkIcon('#DCEBFE', '#2563EB', '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6h5a2.5 2.5 0 0 1 0 5h-3a2.5 2.5 0 0 0 0 5h5"/>') },
      { label: 'A social<br/>scheduler', x: 747, y: 423, w: 104, h: 104, stroke: '#F4AC80', icon: mkIcon('#FDE6D5', '#D97706', '<path d="m3 11 14-5v12L3 13v-2z"/><path d="M11 16.5v3.5"/>') },
      { label: 'Auto-replies in<br/>support', x: 431, y: 478, w: 124, h: 124, stroke: '#CE9FFC', icon: mkIcon('#EFE2FE', '#7E22CE', '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>') },
      { label: 'A code<br/>assistant', x: 329, y: 528, w: 105, h: 105, stroke: '#78C8A0', icon: mkIcon('#D8F3E5', '#15803D', '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>') },
      { label: 'A meeting<br/>notetaker', x: 577, y: 523, w: 102, h: 102, stroke: '#7BB6F9', icon: mkIcon('#DCEBFE', '#2563EB', '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>') },
      { label: 'A personal account,<br/>logged in', x: 696, y: 528, w: 154, h: 154, stroke: '#ECC078', icon: mkIcon('#FCEFD2', '#B45309', '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9"/><path d="m17 6 3 3"/>') },
      { label: 'AI inside the<br/>CRM', x: 372, y: 625, w: 114, h: 114, stroke: '#CE9FFC', icon: mkIcon('#EFE2FE', '#7E22CE', '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>') },
      { label: 'A CV screener', x: 488, y: 597, w: 114, h: 114, stroke: '#ECC078', icon: mkIcon('#FCEFD2', '#B45309', '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 17c1-2 7-2 8 0"/>') },
      { label: 'A website<br/>chatbot', x: 570, y: 692, w: 94, h: 94, stroke: '#F4AC80', icon: mkIcon('#FDE6D5', '#D97706', '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 1 1 18-5z"/>') },
      { label: 'A forecasting<br/>model', x: 676, y: 684, w: 118, h: 118, stroke: '#F4AC80', icon: mkIcon('#FDE6D5', '#D97706', '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>') },
      { label: 'A trial nobody<br/>cancelled', x: 329, y: 747, w: 119, h: 119, stroke: '#78C8A0', icon: mkIcon('#D8F3E5', '#15803D', '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>') },
      { label: 'A refund<br/>approver', x: 476, y: 749, w: 105, h: 105, stroke: '#ECC078', icon: mkIcon('#FCEFD2', '#B45309', '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>') },
      { label: 'An image<br/>generator', x: 614, y: 788, w: 103, h: 103, stroke: '#ECC078', icon: mkIcon('#FCEFD2', '#B45309', '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>') },
      { label: 'A translation<br/>tool', x: 721, y: 803, w: 109, h: 109, stroke: '#ECC078', icon: mkIcon('#FCEFD2', '#B45309', '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>') },
      { label: 'A legal doc<br/>summariser', x: 403, y: 853, w: 116, h: 116, stroke: '#CE9FFC', icon: mkIcon('#EFE2FE', '#7E22CE', '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/>') },
      { label: 'Something a<br/>contractor built', x: 520, y: 873, w: 134, h: 134, stroke: '#CE9FFC', icon: mkIcon('#EFE2FE', '#7E22CE', '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>') },
    ];
    let bXml = '';
    rightBubbles.forEach((b, i) => {
      const fSize = b.w < 90 ? '10.5px' : '11.5px';
      bXml += `<mxCell id="b55_${i}" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;padding:4px;">${b.icon}<div style="font-size:${fSize};font-weight:800;color:#1E293B;line-height:1.18;">${b.label}</div></div>`)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${b.stroke};strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" as="geometry"/></mxCell>`;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_55_${level}" name="${hTitle}"><mxGraphModel dx="855" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="855" pageHeight="1024" background="#FCFDFE"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg55Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="855" height="1024" as="geometry"/></mxCell>

      <mxCell id="hdr55" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:44px;font-weight:900;color:#0B162C;letter-spacing:-1px;line-height:1.1;'&gt;The AI Nobody &lt;span style='color:#60A5FA;'&gt;Signed Off&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:15.5px;color:#475569;margin-top:8px;font-weight:600;'&gt;Inside a company that thinks it has four tools&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="45" y="16" width="765" height="82" as="geometry"/></mxCell>

      <mxCell id="pil55_L" value="What Leadership Thinks" style="rounded=1;whiteSpace=wrap;html=1;arcSize=26;fillColor=#081126;strokeColor=#081126;fontColor=#FFFFFF;fontStyle=1;fontSize=15.5;" vertex="1" parent="1"><mxGeometry x="48" y="118" width="228" height="36" as="geometry"/></mxCell>
      <mxCell id="pil55_R" value="What Is Actually Running" style="rounded=1;whiteSpace=wrap;html=1;arcSize=26;fillColor=#081126;strokeColor=#081126;fontColor=#FFFFFF;fontStyle=1;fontSize=15.5;" vertex="1" parent="1"><mxGeometry x="470" y="118" width="238" height="36" as="geometry"/></mxCell>

      <!-- Left Leadership Speech Text & 3 Green Circles -->
      <mxCell id="sp55_1" value="&amp;ldquo;We use&lt;br/&gt;one AI tool.&amp;rdquo;" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=14.5;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="152" y="218" width="140" height="68" as="geometry"/></mxCell>

      <mxCell id="q55_2" value="&amp;ldquo;IT approved&lt;br/&gt;it.&amp;rdquo;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8CE69C;strokeWidth=2.2;fontStyle=1;fontSize=13.5;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="60" y="586" width="112" height="112" as="geometry"/></mxCell>
      <mxCell id="q55_3" value="&amp;ldquo;We have a&lt;br/&gt;policy.&amp;rdquo;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8CE69C;strokeWidth=2.2;fontStyle=1;fontSize=13.5;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="140" y="742" width="116" height="116" as="geometry"/></mxCell>
      <mxCell id="q55_4" value="&amp;ldquo;It is just a&lt;br/&gt;chatbot.&amp;rdquo;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8CE69C;strokeWidth=2.2;fontStyle=1;fontSize=13.5;fontColor=#1E293B;" vertex="1" parent="1"><mxGeometry x="80" y="880" width="116" height="116" as="geometry"/></mxCell>

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
      { code: '05', cat: 'INTEGRATION ECOSYSTEM', lTitle: '05 Fragmented Glue', lPill: 'CUSTOM PIPELINES', lDesc: 'Heavy integration required to connect API calls to cloud services, databases, and enterprise access.', rTitle: '05 First-Party Integrations', rPill: 'GOOGLE NATIVE', rDesc: 'Native, out-of-the-box IAM security, Cloud Pub/Sub, Cloud Logging, Workspace tools, and API gateway access.' }
    ];

    const bg56Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g56" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#EAE6DC" stroke-width="0.9"/>
        </pattern>
        <linearGradient id="pil56Grad" x1="454" y1="204" x2="692" y2="204" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#3B7BF6"/>
          <stop offset="100%" stop-color="#0E8585"/>
        </linearGradient>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g56)"/>
      <!-- Central Vertical Spine & Horizontal Connector Ticks -->
      <line x1="382.5" y1="224" x2="382.5" y2="976" stroke="#475569" stroke-width="1.4"/>
      <line x1="351" y1="335" x2="414" y2="335" stroke="#475569" stroke-width="1.3"/>
      <line x1="351" y1="480" x2="414" y2="480" stroke="#475569" stroke-width="1.3"/>
      <line x1="351" y1="625" x2="414" y2="625" stroke="#475569" stroke-width="1.3"/>
      <line x1="351" y1="770" x2="414" y2="770" stroke="#475569" stroke-width="1.3"/>
      <line x1="351" y1="915" x2="414" y2="915" stroke="#475569" stroke-width="1.3"/>
      <!-- Right Gradient Pill Background -->
      <rect x="454" y="204" width="238" height="36" rx="18" fill="url(#pil56Grad)"/>
    </svg>`);

    const offSwitchSvg = `<svg width="50" height="22" viewBox="0 0 50 22" style="flex-shrink:0;"><rect x="0" y="0" width="50" height="22" rx="11" fill="#9CA3AF"/><circle cx="11" cy="11" r="8.5" fill="#FFFFFF"/><text x="34" y="14.5" text-anchor="middle" fill="#FFFFFF" font-family="Inter,sans-serif" font-size="9.5" font-weight="800">OFF</text></svg>`;
    const onSwitchSvg = `<svg width="50" height="22" viewBox="0 0 50 22" style="flex-shrink:0;"><rect x="0" y="0" width="50" height="22" rx="11" fill="#15803D"/><text x="17" y="14.5" text-anchor="middle" fill="#FFFFFF" font-family="Inter,sans-serif" font-size="9.5" font-weight="800">ON</text><circle cx="39" cy="11" r="8.5" fill="#FFFFFF"/></svg>`;
    const gcpLogoSvg = `<svg width="36" height="24" viewBox="0 0 36 24" style="vertical-align:middle;margin-right:8px;"><path d="M22.5 6.5 C19.5 2.5, 13.5 2.5, 10.8 6.8 C6.5 7.2, 3.5 10.8, 4 15.2 C4.5 19.2, 8 22, 12 22 H25 C28.8 22, 32 19, 32 15.2 C32 11.6, 29.2 8.6, 25.8 8.2 C25 7.2, 23.8 6.7, 22.5 6.5 Z" fill="none"/><path d="M19.8 5.2 C16.6 2.8, 12 3.6, 9.8 7.0 L13.2 9.8 C14.4 7.8, 16.8 7.2, 18.8 8.4 L21.8 5.4 C21.2 5.2, 20.5 5.2, 19.8 5.2 Z" fill="#EA4335"/><path d="M9.8 7.0 C6.4 8.0, 4.2 11.4, 4.8 15.0 C5.2 17.6, 7.0 19.8, 9.4 20.8 L11.8 16.8 C10.2 16.2, 9.2 14.6, 9.4 12.8 C9.6 11.2, 10.8 9.8, 12.4 9.4 L9.8 7.0 Z" fill="#FBBC05"/><path d="M9.4 20.8 C10.4 21.2, 11.6 21.4, 12.8 21.4 H24.2 C27.8 21.4, 30.8 18.6, 31.0 15.0 L26.4 14.2 C26.2 15.8, 24.8 17.0, 23.2 17.0 H12.8 C12.4 17.0, 12.0 16.9, 11.8 16.8 L9.4 20.8 Z" fill="#34A853"/><path d="M31.0 15.0 C31.2 11.2, 28.6 8.0, 25.0 7.4 C24.0 5.6, 22.2 4.4, 20.0 4.0 L18.2 8.2 C19.8 8.8, 21.0 10.2, 21.2 12.0 H23.8 C25.4 12.0, 26.6 13.2, 26.4 14.8 L31.0 15.0 Z" fill="#4285F4"/></svg>`;

    let cells = '';
    rows.forEach((r, idx) => {
      const y = 280 + idx * 145;
      cells += `
        <mxCell id="cat56_${idx}" value="${r.cat}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#FAF8F2;strokeColor=#E2DDD2;strokeWidth=1;fontStyle=1;fontSize=12.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="268" y="${y - 24}" width="229" height="21" as="geometry"/></mxCell>
        <mxCell id="L56_${idx}" value="${cleanSvg(`<div style="padding:9px 12px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;justify-content:space-between;align-items:flex-start;"><div><div style="font-size:15px;font-weight:800;color:#0F172A;line-height:1.15;">${r.lTitle}</div><div style="display:inline-block;background:#0D152C;color:#FFFFFF;padding:2px 8px;border-radius:999px;font-size:9.2px;font-weight:800;margin-top:4px;letter-spacing:0.2px;">${r.lPill}</div></div>${offSwitchSvg}</div><div style="font-size:11.5px;color:#1E293B;margin-top:6px;line-height:1.26;">${r.lDesc}</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=9;fillColor=#F6F6F4;strokeColor=#64748B;strokeWidth=1.4;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="45" y="${y}" width="306" height="106" as="geometry"/></mxCell>
        <mxCell id="M56_${idx}" value="${r.code}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.5;fontStyle=1;fontSize=15;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="363.5" y="${y + 36}" width="38" height="38" as="geometry"/></mxCell>
        <mxCell id="R56_${idx}" value="${cleanSvg(`<div style="padding:9px 12px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;justify-content:space-between;align-items:flex-start;"><div><div style="font-size:15px;font-weight:800;color:#0F172A;line-height:1.15;">${r.rTitle}</div><div style="display:inline-block;background:#0F766E;color:#FFFFFF;padding:2px 8px;border-radius:999px;font-size:9.2px;font-weight:800;margin-top:4px;letter-spacing:0.2px;">${r.rPill}</div></div>${onSwitchSvg}</div><div style="font-size:11.5px;color:#1E293B;margin-top:6px;line-height:1.26;">${r.rDesc}</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=9;fillColor=#FAF9F6;strokeColor=#64748B;strokeWidth=1.4;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="414" y="${y}" width="306" height="106" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_56_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg56Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>
      <mxCell id="hdr56" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;"><div style="display:inline-flex;align-items:center;font-size:23px;font-weight:600;color:#5F6368;">${gcpLogoSvg}<span>Google Cloud</span></div><div style="font-size:43px;font-weight:800;color:#0F172A;margin-top:10px;letter-spacing:-0.8px;line-height:1.08;">${hTitle}</div><div style="font-size:26px;font-weight:500;color:#0F172A;margin-top:6px;">Raw Gemini API vs. Vertex AI Agent Engine</div><div style="font-size:13px;color:#1E293B;margin-top:8px;font-weight:500;">Comparing stateless model inference with a fully managed, enterprise grade agent runtime</div></div>`)}" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="25" y="22" width="715" height="170" as="geometry"/></mxCell>
      <mxCell id="pil56_L" value="Raw Gemini API" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0D152C;strokeColor=#0D152C;fontColor=#FFFFFF;fontStyle=1;fontSize=15.5;" vertex="1" parent="1"><mxGeometry x="108" y="204" width="176" height="36" as="geometry"/></mxCell>
      <mxCell id="pil56_R" value="Vertex AI Agent Engine" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=none;strokeColor=none;fontColor=#FFFFFF;fontStyle=1;fontSize=15.5;" vertex="1" parent="1"><mxGeometry x="454" y="204" width="238" height="36" as="geometry"/></mxCell>
      ${cells}
      <mxCell id="ftr56" value="GOOGLE CLOUD ENTERPRISE AI GUIDE • VERTEX AI AGENT ENGINE • REVISION 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=11.5;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="0" y="976" width="765" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 6. #57: FUNNEL PIPELINE DIAGRAM (Exact 1:1 Vector Twin of 57.png)
  // ============================================================================
  if (id === '57' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Funnel Pipeline Diagram');
    const bg57Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g57" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#E6E1D6" stroke-width="0.8"/>
        </pattern>
        <linearGradient id="f57_g1" x1="70" y1="246" x2="695" y2="355" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#356AD2"/>
          <stop offset="50%" stop-color="#4B85EE"/>
          <stop offset="100%" stop-color="#3871E0"/>
        </linearGradient>
        <linearGradient id="f57_g2" x1="124" y1="373" x2="640" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#D13B2E"/>
          <stop offset="50%" stop-color="#E54C3C"/>
          <stop offset="100%" stop-color="#D43D30"/>
        </linearGradient>
        <linearGradient id="f57_g3" x1="180" y1="500" x2="584" y2="610" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#E5AB1B"/>
          <stop offset="50%" stop-color="#F8C332"/>
          <stop offset="100%" stop-color="#E7AE1E"/>
        </linearGradient>
        <linearGradient id="f57_g4" x1="235" y1="629" x2="530" y2="740" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#2B8649"/>
          <stop offset="50%" stop-color="#38A15B"/>
          <stop offset="100%" stop-color="#2D8B4C"/>
        </linearGradient>
        <linearGradient id="f57_g5" x1="290" y1="758" x2="475" y2="870" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#159AB7"/>
          <stop offset="55%" stop-color="#3C78D8"/>
          <stop offset="100%" stop-color="#6B3FC9"/>
        </linearGradient>
        <marker id="arr57" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <polygon points="0 0.5, 6.5 3.5, 0 6.5" fill="#1E293B"/>
        </marker>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect x="0" y="200" width="765" height="776" fill="url(#g57)"/>
      <line x1="0" y1="200" x2="765" y2="200" stroke="#DFDBD0" stroke-width="1.2"/>

      <!-- Left Axis Arrows & Dashed Bracket -->
      <line x1="46" y1="450" x2="46" y2="250" stroke="#1E293B" stroke-width="1.5" marker-end="url(#arr57)"/>
      <line x1="46" y1="690" x2="46" y2="872" stroke="#1E293B" stroke-width="1.5" marker-end="url(#arr57)"/>
      <text x="50" y="568" text-anchor="middle" transform="rotate(-90 50 568)" fill="#0F172A" font-family="Inter,sans-serif" font-size="13" font-weight="700">Increasing Context Signal &amp; Density</text>

      <path d="M 104 374 H 80 V 490 M 80 688 V 876 H 238" fill="none" stroke="#334155" stroke-width="1.4" stroke-dasharray="3,3"/>
      <text x="84" y="588" text-anchor="middle" transform="rotate(-90 84 588)" fill="#1E293B" font-family="Inter,sans-serif" font-size="13" font-weight="600">Filtering out irrelevant noise</text>

      <!-- Right Dimension Axis: PERCENTAGE DROP-OFFS -->
      <line x1="718" y1="246" x2="732" y2="246" stroke="#1E293B" stroke-width="1.5"/>
      <line x1="725" y1="246" x2="725" y2="478" stroke="#1E293B" stroke-width="1.4"/>
      <text x="730" y="568" text-anchor="middle" transform="rotate(-90 730 568)" fill="#0F172A" font-family="Inter,sans-serif" font-size="13" font-weight="800" letter-spacing="0.8">PERCENTAGE DROP-OFFS</text>
      <line x1="725" y1="658" x2="725" y2="870" stroke="#1E293B" stroke-width="1.4" marker-end="url(#arr57)"/>
      <line x1="718" y1="876" x2="732" y2="876" stroke="#1E293B" stroke-width="1.5"/>

      <!-- Stepped Drop-Off Connector Lines -->
      <path d="M 666 304 H 686 Q 691 304 691 309 V 348" fill="none" stroke="#1E293B" stroke-width="1.4" marker-end="url(#arr57)"/>
      <path d="M 615 432 H 650 Q 655 432 655 437 V 480" fill="none" stroke="#1E293B" stroke-width="1.4" marker-end="url(#arr57)"/>
      <path d="M 562 560 H 627 Q 632 560 632 565 V 608" fill="none" stroke="#1E293B" stroke-width="1.4" marker-end="url(#arr57)"/>
      <path d="M 509 688 H 591 Q 596 688 596 693 V 736" fill="none" stroke="#1E293B" stroke-width="1.4" marker-end="url(#arr57)"/>

      <!-- Stage 05 Side Callout Lines & Bottom Dashed Stem -->
      <line x1="272" y1="816" x2="306" y2="816" stroke="#1E293B" stroke-width="1.5"/>
      <line x1="458" y1="818" x2="500" y2="818" stroke="#1E293B" stroke-width="1.5"/>
      <line x1="382.5" y1="874" x2="382.5" y2="904" stroke="#334155" stroke-width="1.4" stroke-dasharray="3,3"/>

      <!-- STAGE 05 FRUSTUM -->
      <ellipse cx="382.5" cy="758" rx="93" ry="11" fill="#3B3B98" stroke="#0F172A" stroke-width="1.4"/>
      <path d="M 289.5 758 Q 382.5 769 475.5 758 L 447 864 Q 382.5 880 318 864 Z" fill="url(#f57_g5)" stroke="#0F172A" stroke-width="1.4"/>

      <!-- STAGE 04 FRUSTUM -->
      <ellipse cx="382.5" cy="629" rx="147" ry="13" fill="#1E6B38" stroke="#0F172A" stroke-width="1.4"/>
      <path d="M 235.5 629 Q 382.5 642 529.5 629 L 499 730 Q 382.5 748 266 730 Z" fill="url(#f57_g4)" stroke="#0F172A" stroke-width="1.4"/>
      <line x1="382.5" y1="739" x2="382.5" y2="758" stroke="#0F172A" stroke-width="1.5" marker-end="url(#arr57)"/>

      <!-- STAGE 03 FRUSTUM -->
      <ellipse cx="382.5" cy="500" rx="202" ry="15" fill="#C49014" stroke="#0F172A" stroke-width="1.4"/>
      <path d="M 180.5 500 Q 382.5 515 584.5 500 L 551 600 Q 382.5 620 214 600 Z" fill="url(#f57_g3)" stroke="#0F172A" stroke-width="1.4"/>
      <line x1="382.5" y1="610" x2="382.5" y2="629" stroke="#0F172A" stroke-width="1.5" marker-end="url(#arr57)"/>

      <!-- STAGE 02 FRUSTUM -->
      <ellipse cx="382.5" cy="373" rx="258" ry="17" fill="#9E2A20" stroke="#0F172A" stroke-width="1.4"/>
      <path d="M 124.5 373 Q 382.5 390 640.5 373 L 603 472 Q 382.5 494 162 472 Z" fill="url(#f57_g2)" stroke="#0F172A" stroke-width="1.4"/>
      <line x1="382.5" y1="483" x2="382.5" y2="502" stroke="#0F172A" stroke-width="1.5" marker-end="url(#arr57)"/>

      <!-- STAGE 01 FRUSTUM -->
      <ellipse cx="382.5" cy="246" rx="312" ry="19" fill="#2A5298" stroke="#0F172A" stroke-width="1.4"/>
      <path d="M 70.5 246 Q 382.5 265 694.5 246 L 653 344 Q 382.5 368 112 344 Z" fill="url(#f57_g1)" stroke="#0F172A" stroke-width="1.4"/>
      <line x1="382.5" y1="356" x2="382.5" y2="375" stroke="#0F172A" stroke-width="1.5" marker-end="url(#arr57)"/>
    </svg>`);

    const gcpSmallSvg = `<svg width="30" height="20" viewBox="0 0 36 24" style="vertical-align:middle;margin-right:6px;"><path d="M19.8 5.2 C16.6 2.8, 12 3.6, 9.8 7.0 L13.2 9.8 C14.4 7.8, 16.8 7.2, 18.8 8.4 L21.8 5.4 Z" fill="#EA4335"/><path d="M9.8 7.0 C6.4 8.0, 4.2 11.4, 4.8 15.0 C5.2 17.6, 7.0 19.8, 9.4 20.8 L11.8 16.8 C10.2 16.2, 9.2 14.6, 9.4 12.8 Z" fill="#FBBC05"/><path d="M9.4 20.8 H24.2 C27.8 21.4, 30.8 18.6, 31.0 15.0 L26.4 14.2 C26.2 15.8, 24.8 17.0, 23.2 17.0 H11.8 Z" fill="#34A853"/><path d="M31.0 15.0 C31.2 11.2, 28.6 8.0, 25.0 7.4 C24.0 5.6, 22.2 4.4, 20.0 4.0 L18.2 8.2 C19.8 8.8, 21.0 10.2, 21.2 12.0 H26.4 Z" fill="#4285F4"/></svg>`;
    const geminiSparkleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:4px;"><path d="M12 1 C12 7, 17 12, 23 12 C17 12, 12 17, 12 23 C12 17, 7 12, 1 12 C7 12, 12 7, 12 1 Z" fill="#4B85EE"/><circle cx="19" cy="5" r="1.5" fill="#E54C3C"/></svg>`;

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_57_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg57Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <!-- Header -->
      <mxCell id="hdr57" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;"><div style="display:flex;justify-content:space-between;align-items:center;padding:0 12px;"><span style="display:inline-flex;align-items:center;font-size:20px;font-weight:600;color:#5F6368;">${gcpSmallSvg}Google Cloud</span><span style="display:inline-flex;align-items:center;font-size:20px;font-weight:600;color:#3B78E7;">${geminiSparkleSvg}<span style="color:#64748B;font-size:15px;margin:0 5px;">+</span>Gemini</span></div><div style="font-size:48px;font-weight:800;color:#0B1528;margin-top:16px;letter-spacing:-1px;line-height:1.05;">${hTitle}</div><div style="font-size:17.5px;color:#334155;margin-top:10px;font-weight:500;">Context compression and progressive token refinement on Google Cloud</div></div>`)}" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="25" y="22" width="715" height="168" as="geometry"/></mxCell>

      <mxCell id="tiers57" value="TIERS" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#FAF8F2;strokeColor=#E2DDD2;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="352" y="203" width="61" height="20" as="geometry"/></mxCell>

      <!-- Stage 01 Text Overlay -->
      <mxCell id="f57_0" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;"><div style="display:inline-flex;align-items:center;gap:8px;"><span style="font-size:15.5px;font-weight:800;">01 | RAW INGESTION</span><span style="display:inline-flex;border:1px solid #0F172A;border-radius:999px;overflow:hidden;font-size:10px;font-weight:800;"><span style="background:#FFFFFF;color:#0F172A;padding:2px 7px;">1M Tokens</span><span style="background:#CBD5E1;color:#0F172A;padding:2px 8px;">100% Volume</span></span></div><div style="font-size:12px;margin-top:4px;">Unfiltered input: raw docs, logs, repositories, and workspace history.</div><div style="margin-top:5px;font-size:10px;">Tactile UI Chip: <span style="background:#94A3B8;color:#0F172A;border:1px solid #1E293B;padding:2px 10px;border-radius:999px;font-weight:800;font-size:10.5px;">RAW DATA</span></div></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="130" y="266" width="505" height="82" as="geometry"/></mxCell>
      <mxCell id="d57_0" value="▼ 75%&lt;br/&gt;DISCARDED" style="rounded=1;whiteSpace=wrap;html=1;arcSize=30;fillColor=#C83E31;strokeColor=#0F172A;strokeWidth=1.2;fontColor=#FFFFFF;fontStyle=1;fontSize=9.5;" vertex="1" parent="1"><mxGeometry x="650" y="352" width="70" height="30" as="geometry"/></mxCell>

      <!-- Stage 02 Text Overlay -->
      <mxCell id="f57_1" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;"><div style="display:inline-flex;align-items:center;gap:8px;"><span style="font-size:15.5px;font-weight:800;">02 | METADATA FILTER</span><span style="display:inline-flex;border:1px solid #0F172A;border-radius:999px;overflow:hidden;font-size:10px;font-weight:800;"><span style="background:#FFFFFF;color:#0F172A;padding:2px 7px;">250k Tokens</span><span style="background:#B92B22;color:#FFFFFF;padding:2px 8px;">25% Remaining</span></span></div><div style="font-size:12px;margin-top:4px;">Heuristic, date, and keyword (BM25) search &amp; filtering.</div><div style="margin-top:5px;font-size:10px;">Tactile UI Chip: <span style="background:#B92B22;color:#FFFFFF;border:1px solid #0F172A;padding:2px 10px;border-radius:999px;font-weight:800;font-size:10.5px;">METADATA</span></div></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="170" y="394" width="425" height="82" as="geometry"/></mxCell>
      <mxCell id="d57_1" value="▼ 80% DISCARDED" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#C83E31;strokeColor=#0F172A;strokeWidth=1.2;fontColor=#FFFFFF;fontStyle=1;fontSize=9.5;" vertex="1" parent="1"><mxGeometry x="599" y="485" width="112" height="22" as="geometry"/></mxCell>

      <!-- Stage 03 Text Overlay -->
      <mxCell id="f57_2" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;color:#0F172A;"><div style="display:inline-flex;align-items:center;gap:6px;"><span style="font-size:15px;font-weight:800;">03 | BIGQUERY VECTOR SEARCH</span><span style="background:#FFFFFF;color:#0F172A;border:1px solid #0F172A;border-radius:10px;padding:1px 7px;font-size:9px;font-weight:800;line-height:1.1;">50k Tokens<br/>5% Remaining</span></div><div style="font-size:11.5px;margin-top:3px;line-height:1.2;">Embeddings, cosine similarity, &amp;<br/>database/vector RAG retrieval.</div><div style="margin-top:4px;font-size:10px;">Tactile UI Chip: <span style="background:#E5AB1B;color:#0F172A;border:1px solid #0F172A;padding:2px 10px;border-radius:999px;font-weight:800;font-size:10px;">VECTOR SEARCH</span></div></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="215" y="520" width="335" height="86" as="geometry"/></mxCell>
      <mxCell id="d57_2" value="▼ 80% DISCARDED" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#C83E31;strokeColor=#0F172A;strokeWidth=1.2;fontColor=#FFFFFF;fontStyle=1;fontSize=9.5;" vertex="1" parent="1"><mxGeometry x="577" y="613" width="112" height="22" as="geometry"/></mxCell>

      <!-- Stage 04 Text Overlay -->
      <mxCell id="f57_3" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;"><div style="display:inline-flex;align-items:center;gap:6px;"><span style="font-size:14.5px;font-weight:800;line-height:1.1;">04 | CROSS-ENCODER<br/>RE-RANKING</span><span style="background:#FFFFFF;color:#0F172A;border:1px solid #0F172A;border-radius:10px;padding:1px 7px;font-size:8.5px;font-weight:800;line-height:1.1;">10k Tokens<br/>1% Remaining</span></div><div style="font-size:11px;margin-top:3px;line-height:1.18;">Deep transformer scoring &amp;<br/>cross-encoder relevancy evaluation.</div><div style="margin-top:4px;"><span style="background:#267841;color:#FFFFFF;border:1px solid #0F172A;padding:2px 10px;border-radius:999px;font-weight:800;font-size:10px;">RE-RANKED</span></div></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="260" y="646" width="245" height="92" as="geometry"/></mxCell>
      <mxCell id="d57_3" value="▼ 80% DISCARDED" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#C83E31;strokeColor=#0F172A;strokeWidth=1.2;fontColor=#FFFFFF;fontStyle=1;fontSize=9.5;" vertex="1" parent="1"><mxGeometry x="541" y="741" width="112" height="22" as="geometry"/></mxCell>

      <!-- Stage 05 Text Overlay & Side Callouts -->
      <mxCell id="f57_4" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;"><div style="font-size:14.5px;font-weight:800;line-height:1.12;">05 | GEMINI IN-<br/>CONTEXT WINDOW</div><div style="font-size:10.5px;margin-top:4px;line-height:1.2;">High-value, exact-context<br/>chunks inserted into<br/>prompt/model context.</div></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="305" y="776" width="155" height="90" as="geometry"/></mxCell>

      <mxCell id="c57_L" value="${cleanSvg(`<div style="display:inline-flex;border:1px solid #0F172A;border-radius:999px;overflow:hidden;font-family:Inter,sans-serif;font-size:10px;font-weight:800;"><span style="background:#FFFFFF;color:#0F172A;padding:4px 8px;">2k Tokens</span><span style="background:#3B82F6;color:#FFFFFF;padding:2px 8px;line-height:1.05;font-size:8.5px;">0.2%<br/>Remaining</span></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="155" y="802" width="120" height="28" as="geometry"/></mxCell>

      <mxCell id="c57_R" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;"><div style="font-size:9.5px;color:#1E293B;margin-bottom:2px;">Tactile UI Chip:</div><div style="background:linear-gradient(90deg,#2563EB,#6D28D9);color:#FFFFFF;border:1px solid #0F172A;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;">GEMINI 1.5 PRO</div></div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="498" y="792" width="108" height="38" as="geometry"/></mxCell>

      <!-- WHY IT MATTERS -->
      <mxCell id="tk57" value="&lt;div style='padding:8px 14px;text-align:center;font-family:Inter,sans-serif;font-size:11.8px;color:#0F172A;line-height:1.35;'&gt;&lt;b&gt;WHY IT MATTERS:&lt;/b&gt; Ingestion-level filtering avoids token bloat, reduces model&lt;br/&gt;prompt hallucination, and unlocks performant, sub-second Gemini responses.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FAF8F2;strokeColor=#334155;strokeWidth=1.2;" vertex="1" parent="1"><mxGeometry x="160" y="904" width="445" height="50" as="geometry"/></mxCell>

      <!-- Footer -->
      <mxCell id="ftr57" value="GOOGLE CLOUD ARCHITECTURE GUIDE • GOOGLE CLOUD &amp; GEMINI • SEPTEMBER 2026 &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp; page • 23" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=11;letterSpacing=0.4;" vertex="1" parent="1"><mxGeometry x="0" y="976" width="765" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 7. #58: PROCESS LIST / CHECKLIST (Exact 1:1 Vector Twin of 58.png)
  // ============================================================================
  if (id === '58' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Process List / Checklist');
    const list = [
      { code: '01', title: 'Define Mission &amp; Scope', badge: 'DEFINED', pillCol: '#369B56', numCol: '#DB4437', desc: 'Establish the exact tasks, constraints,<br/>and success boundaries.', tag: 'goal_check: SUCCESS<br/>retry_limit: 3', singleToggle: false },
      { code: '02', title: 'Configure API Gateway &amp; Ingress', badge: 'CONNECTED', pillCol: '#3B78E7', numCol: '#E8832A', desc: 'Set up the Google Cloud API gateway<br/>and authenticate client requests.', tag: 'HTTPS_Ingress<br/>Auth / Rate Limit', singleToggle: false },
      { code: '03', title: 'Establish Sandboxed GKE Cluster', badge: 'ISOLATED', pillCol: '#369B56', numCol: '#F2B329', desc: 'Provision an isolated GKE cluster with<br/>gVisor sandbox runtimes for safe tool use.', tag: 'VPC Sandbox<br/>gVisor Containers', singleToggle: false },
      { code: '04', title: 'Enable Memory &amp; Persistent State', badge: 'PERSISTENT', pillCol: '#2C8C99', numCol: '#369B56', desc: 'Connect AlloyDB to log episodic<br/>memory and task session state securely.', tag: 'AlloyDB DB_adapter<br/>Task Logs', singleToggle: false },
      { code: '05', title: 'Integrate HIL Validation Loop', badge: 'GATEWAY', pillCol: '#5A6D82', numCol: '#4285F4', desc: 'Establish Human-in-the-Loop<br/>breakpoints for validation failures.', tag: 'HITL Breakpoint<br/>Retry Loops', singleToggle: false },
      { code: '06', title: 'Deploy to Vertex AI Run', badge: 'DEPLOYED', pillCol: '#1F6E37', numCol: '#D94236', desc: 'Release the validated agent workflow<br/>into Vertex AI reasoning engines.', tag: 'live_agent_run<br/>GCP PubSub', singleToggle: true }
    ];

    const bg58Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g58" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E8E3D8" stroke-width="0.9"/>
        </pattern>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g58)"/>
      <!-- Top-Right Google Cloud + Gemini Sparkle Icons -->
      <g transform="translate(646, 18)">
        <path d="M22 6 C18 2, 12 3, 9.5 7.5 L13.5 10.5 C15 8, 18 7.5, 20.5 9 L24 5.5 Z" fill="#EA4335"/>
        <path d="M9.5 7.5 C5.5 8.8, 3 12.8, 3.8 17 C4.3 20, 6.5 22.5, 9.2 23.8 L12 19 C10.2 18.2, 9 16.5, 9.2 14.5 Z" fill="#FBBC05"/>
        <path d="M9.2 23.8 H26.5 C30.8 24.5, 34.2 21.2, 34.5 17 L29 16 C28.8 18, 27.2 19.2, 25.2 19.2 H12 Z" fill="#34A853"/>
        <path d="M34.5 17 C34.8 12.5, 31.8 8.8, 27.5 8 C26.2 6, 24.2 4.5, 21.8 4 L19.5 9 C21.5 9.8, 22.8 11.5, 23 13.5 H29 Z" fill="#4285F4"/>
      </g>
      <g transform="translate(698, 14)">
        <path d="M20 2 C20 11, 27 18, 36 18 C27 18, 20 25, 20 34 C20 25, 13 18, 4 18 C13 18, 20 11, 20 2 Z" fill="#4285F4"/>
        <circle cx="31" cy="7" r="2.2" fill="#EA4335"/>
      </g>
    </svg>`);

    const dblToggleSvg = `<svg width="52" height="50" viewBox="0 0 52 50" style="flex-shrink:0;"><rect x="0" y="0" width="52" height="25" rx="12.5" fill="#369B56"/><circle cx="39.5" cy="12.5" r="10.5" fill="#FFFFFF" stroke="#25733E" stroke-width="1"/><rect x="0" y="25" width="52" height="25" rx="12.5" fill="#369B56"/><circle cx="39.5" cy="37.5" r="10.5" fill="#FFFFFF" stroke="#25733E" stroke-width="1"/></svg>`;
    const sglToggleSvg = `<svg width="52" height="26" viewBox="0 0 52 26" style="flex-shrink:0;"><rect x="0" y="0" width="52" height="26" rx="13" fill="#369B56"/><circle cx="39" cy="13" r="10.5" fill="#FFFFFF" stroke="#25733E" stroke-width="1"/></svg>`;

    let lXml = '';
    list.forEach((it, i) => {
      const y = 180 + i * 124;
      const badgeSvg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" style="display:block;"><circle cx="34" cy="34" r="32" fill="#FAF8F2" stroke="#0F172A" stroke-width="1.6"/><circle cx="34" cy="34" r="28" fill="${it.numCol}"/><text x="34" y="42" text-anchor="middle" fill="#FFFFFF" font-family="Inter,sans-serif" font-size="22" font-weight="800">${it.code}</text></svg>`);
      lXml += `
        <mxCell id="n58_${i}" value="${badgeSvg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;fillColor=none;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="50" y="${y + 17}" width="68" height="68" as="geometry"/></mxCell>
        <mxCell id="r58_${i}" value="${cleanSvg(`<div style="padding:12px 16px;text-align:left;font-family:Inter,sans-serif;display:flex;justify-content:space-between;align-items:flex-start;"><div style="width:332px;"><div style="font-size:17px;font-weight:800;color:#0F172A;line-height:1.2;white-space:nowrap;">${it.code} | ${it.title}</div><div style="font-size:13.5px;color:#1E293B;margin-top:8px;line-height:1.3;">${it.desc}</div></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="display:flex;flex-direction:column;align-items:flex-end;"><span style="background:${it.pillCol};color:#FFFFFF;padding:4px 16px;border-radius:999px;font-size:10.5px;font-weight:800;letter-spacing:0.3px;margin-bottom:6px;">${it.badge}</span><div style="width:150px;background:#DFE4EC;padding:6px 10px;border-radius:8px;font-family:monospace;font-size:11px;color:#0F172A;font-weight:700;line-height:1.3;text-align:left;">${it.tag}</div></div>${it.singleToggle ? sglToggleSvg : dblToggleSvg}</div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=9;fillColor=#F7F5F0;strokeColor=#0F172A;strokeWidth=1.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="130" y="${y}" width="586" height="102" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_58_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg58Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>
      <mxCell id="hdr58" value="&lt;div style='text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:46px;font-weight:800;color:#081126;letter-spacing:-1px;line-height:1.08;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:19px;color:#334155;margin-top:8px;line-height:1.32;font-weight:500;'&gt;The step-by-step blueprint to deploy and run secure&lt;br/&gt;autonomous agent workloads on Google Cloud&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="50" y="50" width="665" height="118" as="geometry"/></mxCell>
      ${lXml}
      <mxCell id="tk58" value="&lt;div style='padding:8px 14px;text-align:left;font-family:Inter,sans-serif;font-size:13.5px;color:#0F172A;line-height:1.3;'&gt;&lt;b&gt;TAKEAWAY:&lt;/b&gt; Always sandbox execution tasks and apply native state persistence&lt;br/&gt;before moving to Production.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#F7F5F0;strokeColor=#0F172A;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="50" y="916" width="666" height="48" as="geometry"/></mxCell>
      <mxCell id="ftr58" value="PROCESS LIST / CHECKLIST • GOOGLE CLOUD ENTERPRISE GUIDE • SEP 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=11.5;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="0" y="976" width="765" height="48" as="geometry"/></mxCell>
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
        bandFill: '#E5EFFC', bandStroke: '#6B9CE8', badgeFill: '#3B78E7', chkCol: '#2563EB',
        s1Pill: 'MAP ON', s1Title: '01 | Discover &amp; Map', s1Desc: 'Audit and map existing manual workflows, database schemas, and identify candidate agent targets.', s1Chip: 'Use-Case Mapping',
        s2Num: '02', s2Pill: 'KPIs SET', s2Title: '02 | Baseline &amp; Evaluate', s2Desc: 'Establish baseline performance metrics, success criteria, security compliance, and initial ROI goals.', s2Chip: 'Success Metrics'
      },
      {
        q: 'Q2', phaseNum: 'PHASE 2', trackTitle: '02 | PHASE 2: SECURE PROTOTYPING', rightTag: 'Q2 | Google Red',
        bandFill: '#FCE8E5', bandStroke: '#E5857B', badgeFill: '#D9483B', chkCol: '#C53030',
        s1Pill: 'DEVELOP', s1Title: '03 | Build Agent Core', s1Desc: 'Build core reasoning loops, define system prompts, and configure model temperature on Gemini 1.5.', s1Chip: 'Gemini Pro &amp; Flash',
        s2Num: '04', s2Pill: 'ISOLATED', s2Title: '04 | Sandbox Environment', s2Desc: 'Deploy task execution in isolated VPC microVMs or GKE private sandbox clusters using gVisor.', s2Chip: 'Secure Runtime'
      },
      {
        q: 'Q3', phaseNum: 'PHASE 3', trackTitle: '03 | PHASE 3: STATE &amp; GROUNDING', rightTag: 'Q3 | Google Yellow',
        bandFill: '#FDF5D7', bandStroke: '#E5C158', badgeFill: '#F4B829', chkCol: '#B7791F',
        s1Pill: 'STATEFUL', s1Title: '05 | Persistent Memory', s1Desc: 'Wire up AlloyDB for PostgreSQL to persist conversation histories, session states, and episodic memory.', s1Chip: 'AlloyDB &amp; Memory',
        s2Num: '06', s2Pill: 'RAG ACTIVE', s2Title: '06 | Enterprise Grounding', s2Desc: 'Integrate BigQuery and Vertex AI Search to verify outputs against real-time enterprise dataset results.', s2Chip: 'Vector DB Grounding'
      },
      {
        q: 'Q4', phaseNum: 'PHASE 4', trackTitle: '04 | PHASE 4: GOVERNANCE &amp; DEPLOYMENT', rightTag: 'Q4 | Google Green',
        bandFill: '#E4F5E8', bandStroke: '#68B87E', badgeFill: '#389856', chkCol: '#2F855A',
        s1Pill: 'VALIDATED', s1Title: '07 | Human-in-the-Loop', s1Desc: 'Incorporate strict policy filters, guardrails, and human check points for high-risk system actions.', s1Chip: 'Audit Checkpoints',
        s2Num: '08', s2Pill: 'DEPLOYED', s2Title: '08 | Production Release', s2Desc: 'Continuous monitoring, automated self-healing validation, retry limits, and GCP cloud logging integration.', s2Chip: 'Monitoring &amp; Scaling'
      }
    ];

    const bg59Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g59" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#E8E3D8" stroke-width="0.8"/>
        </pattern>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g59)"/>
    </svg>`);

    const activeSwitchSvg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="54" height="21" viewBox="0 0 54 21" style="display:block;"><rect x="0.5" y="0.5" width="53" height="20" rx="10" fill="#389856" stroke="#1E5631" stroke-width="1"/><text x="20" y="13.5" text-anchor="middle" fill="#FFFFFF" font-family="Inter,sans-serif" font-size="7.5" font-weight="800">ACTIVE</text><circle cx="43.5" cy="10.5" r="7.5" fill="#FFFFFF"/></svg>`);
    const gcpSmallSvg = `<svg width="26" height="18" viewBox="0 0 36 24" style="vertical-align:middle;margin-right:5px;"><path d="M19.8 5.2 C16.6 2.8, 12 3.6, 9.8 7.0 L13.2 9.8 C14.4 7.8, 16.8 7.2, 18.8 8.4 L21.8 5.4 Z" fill="#EA4335"/><path d="M9.8 7.0 C6.4 8.0, 4.2 11.4, 4.8 15.0 C5.2 17.6, 7.0 19.8, 9.4 20.8 L11.8 16.8 C10.2 16.2, 9.2 14.6, 9.4 12.8 Z" fill="#FBBC05"/><path d="M9.4 20.8 H24.2 C27.8 21.4, 30.8 18.6, 31.0 15.0 L26.4 14.2 C26.2 15.8, 24.8 17.0, 23.2 17.0 H11.8 Z" fill="#34A853"/><path d="M31.0 15.0 C31.2 11.2, 28.6 8.0, 25.0 7.4 C24.0 5.6, 22.2 4.4, 20.0 4.0 L18.2 8.2 C19.8 8.8, 21.0 10.2, 21.2 12.0 H26.4 Z" fill="#4285F4"/></svg>`;

    let tXml = '';
    tracks.forEach((t, i) => {
      const y = 192 + i * 174;
      const qTxtCol = i === 2 ? '#0F172A' : '#FFFFFF';
      const chevSvg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="92" viewBox="0 0 112 92" style="display:block;"><path d="M 14 2 H 84 Q 92 2 96 9 L 110 46 L 96 83 Q 92 90 84 90 H 14 Q 2 90 2 78 V 14 Q 2 2 14 2 Z" fill="${t.badgeFill}" stroke="#334155" stroke-width="1.2"/><text x="50" y="26" text-anchor="middle" fill="${qTxtCol}" font-family="Inter,sans-serif" font-size="12.5" font-weight="800" letter-spacing="0.4">${t.phaseNum}</text><text x="50" y="68" text-anchor="middle" fill="${qTxtCol}" font-family="Inter,sans-serif" font-size="38" font-weight="900">${t.q}</text></svg>`);
      const connSvg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="136" viewBox="0 0 96 136" style="display:block;"><path d="M 40 28 H 56 Q 68 28 68 40 V 46 Q 68 58 80 58 H 92" fill="none" stroke="${t.chkCol}" stroke-width="1.4"/><path d="M 40 58 H 92" fill="none" stroke="${t.chkCol}" stroke-width="1.4"/><path d="M 86 54 L 93 58 L 86 62" fill="none" stroke="${t.chkCol}" stroke-width="1.4"/><path d="M 0 122 H 56 Q 68 122 68 108 V 70 Q 68 58 80 58" fill="none" stroke="${t.chkCol}" stroke-width="1.4"/>${i < 3 ? `<line x1="2" y1="122" x2="2" y2="136" stroke="${t.chkCol}" stroke-width="1.4"/><line x1="16" y1="122" x2="16" y2="136" stroke="${t.chkCol}" stroke-width="1.4"/>` : ''}</svg>`);

      const chkBox = `<span style="display:inline-flex;align-items:center;justify-content:center;width:12px;height:12px;border:1.4px solid ${t.chkCol};border-radius:2px;color:${t.chkCol};font-size:9px;font-weight:900;margin-right:5px;flex-shrink:0;">✓</span>`;

      tXml += `
        <mxCell id="tr59_${i}" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=${t.bandFill};strokeColor=${t.bandStroke};strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="38" y="${y}" width="689" height="160" as="geometry"/></mxCell>
        <mxCell id="th59_${i}_l" value="${t.trackTitle}" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=13.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="44" y="${y + 6}" width="420" height="22" as="geometry"/></mxCell>
        <mxCell id="th59_${i}_r" value="${t.rightTag}" style="text;html=1;align=right;verticalAlign=middle;fontStyle=0;fontSize=12.5;fontColor=${t.chkCol};" vertex="1" parent="1"><mxGeometry x="530" y="${y + 6}" width="190" height="22" as="geometry"/></mxCell>
        <mxCell id="qb59_${i}" value="${chevSvg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;fillColor=none;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="38" y="${y + 42}" width="112" height="92" as="geometry"/></mxCell>

        <mxCell id="cn59_${i}" value="${connSvg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;fillColor=none;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="380" y="${y + 38}" width="96" height="136" as="geometry"/></mxCell>

        <mxCell id="c59_${i}_1" value="${cleanSvg(`<div style="padding:12px 12px 8px 12px;text-align:left;font-family:Inter,sans-serif;"><div style="font-size:15px;font-weight:800;color:#0F172A;">${t.s1Title}</div><div style="display:flex;align-items:flex-start;font-size:11px;color:#1E293B;margin-top:5px;line-height:1.26;">${chkBox}<span>${t.s1Desc}</span></div><div style="display:flex;align-items:center;margin-top:7px;">${chkBox}<span style="background:${t.bandFill};color:#0F172A;padding:2px 10px;border-radius:999px;font-size:10.5px;font-weight:700;">${t.s1Chip}</span></div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=9;fillColor=#FAF9F5;strokeColor=#64748B;strokeWidth=1.4;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="166" y="${y + 38}" width="254" height="112" as="geometry"/></mxCell>
        <mxCell id="p59_${i}_1" value="${t.s1Pill}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=${t.bandFill};strokeColor=#64748B;strokeWidth=1;fontStyle=1;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="214" y="${y + 28}" width="68" height="20" as="geometry"/></mxCell>
        <mxCell id="sw59_${i}_1" value="${activeSwitchSvg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;fillColor=none;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="360" y="${y + 27}" width="54" height="21" as="geometry"/></mxCell>

        <mxCell id="c59_${i}_2" value="${cleanSvg(`<div style="padding:12px 12px 8px 12px;text-align:left;font-family:Inter,sans-serif;"><div style="font-size:15px;font-weight:800;color:#0F172A;">${t.s2Title}</div><div style="display:flex;align-items:flex-start;font-size:11px;color:#1E293B;margin-top:5px;line-height:1.26;">${chkBox}<span>${t.s2Desc}</span></div><div style="display:flex;align-items:center;margin-top:7px;">${chkBox}<span style="background:${t.bandFill};color:#0F172A;padding:2px 10px;border-radius:999px;font-size:10.5px;font-weight:700;">${t.s2Chip}</span></div></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=9;fillColor=#FAF9F5;strokeColor=#64748B;strokeWidth=1.4;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="476" y="${y + 38}" width="251" height="112" as="geometry"/></mxCell>
        <mxCell id="nb59_${i}_2" value="${t.s2Num}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${t.badgeFill};strokeColor=#334155;strokeWidth=1.2;fontColor=${qTxtCol};fontStyle=1;fontSize=12;" vertex="1" parent="1"><mxGeometry x="481" y="${y + 21}" width="30" height="30" as="geometry"/></mxCell>
        <mxCell id="p59_${i}_2" value="${t.s2Pill}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=${t.bandFill};strokeColor=#64748B;strokeWidth=1;fontStyle=1;fontSize=10;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="521" y="${y + 28}" width="84" height="20" as="geometry"/></mxCell>
        <mxCell id="sw59_${i}_2" value="${activeSwitchSvg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;fillColor=none;strokeColor=none;" vertex="1" parent="1"><mxGeometry x="662" y="${y + 27}" width="54" height="21" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_59_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg59Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>
      <mxCell id="hdr59" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:13.5px;font-weight:800;color:#0F172A;">EDITORIAL NEWSLETTER INFOGRAPHIC</span><span style="display:inline-flex;align-items:center;font-size:17px;font-weight:600;color:#5F6368;">${gcpSmallSvg}Google Cloud <span style="margin:0 4px;color:#0F172A;font-size:14px;">&amp;</span> <span style="color:#4285F4;">Gem</span><span style="color:#9333EA;">ini</span></span></div><div style="font-size:50px;font-weight:800;color:#0B1528;margin-top:4px;letter-spacing:-1.2px;line-height:1.05;">${hTitle}</div><div style="font-size:16.2px;color:#334155;margin-top:6px;font-weight:500;">The phased, quarterly blueprint for enterprise-grade Agentic AI on Google Cloud</div><div style="font-size:13.5px;font-weight:800;color:#0F172A;margin-top:16px;">HORIZONTAL PHASE TRACKS</div></div>`)}" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="38" y="24" width="689" height="162" as="geometry"/></mxCell>
      ${tXml}
      <mxCell id="goal59" value="&lt;div style='padding:10px 16px;text-align:left;font-family:Inter,sans-serif;font-size:14px;color:#0F172A;line-height:1.35;'&gt;&lt;b&gt;GOAL: Safely scale&lt;/b&gt; autonomous task automation, eliminate manual triage overhead,&lt;br/&gt;and provide secure, self-healing agent pipelines in sandbox isolation.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#F6F5F0;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="38" y="896" width="689" height="54" as="geometry"/></mxCell>
      <mxCell id="ftr59" value="GOOGLE CLOUD AGENT ENGINE ROADMAP • Timeline &amp; Roadmap • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=11.5;letterSpacing=0.4;" vertex="1" parent="1"><mxGeometry x="0" y="976" width="765" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 9. #60: ARCHITECTURE & TOPOLOGY DIAGRAM (Exact 1:1 Vector Twin of 60.png)
  // ============================================================================
  if (id === '60' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Architecture & Topology Diagram');
    const bg60Svg = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g60" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#E8E3D8" stroke-width="0.9"/>
        </pattern>
        <marker id="arr60" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <polygon points="0 0.5, 6.5 3.5, 0 6.5" fill="#0F172A"/>
        </marker>
        <marker id="arr60_rev" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto">
          <polygon points="6.5 0.5, 0 3.5, 6.5 6.5" fill="#0F172A"/>
        </marker>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g60)"/>

      <!-- Top-Left Google Cloud Emblem -->
      <g transform="translate(30, 22)">
        <path d="M22 6 C18 2, 12 3, 9.5 7.5 L13.5 10.5 C15 8, 18 7.5, 20.5 9 L24 5.5 Z" fill="#EA4335"/>
        <path d="M9.5 7.5 C5.5 8.8, 3 12.8, 3.8 17 C4.3 20, 6.5 22.5, 9.2 23.8 L12 19 C10.2 18.2, 9 16.5, 9.2 14.5 Z" fill="#FBBC05"/>
        <path d="M9.2 23.8 H26.5 C30.8 24.5, 34.2 21.2, 34.5 17 L29 16 C28.8 18, 27.2 19.2, 25.2 19.2 H12 Z" fill="#34A853"/>
        <path d="M34.5 17 C34.8 12.5, 31.8 8.8, 27.5 8 C26.2 6, 24.2 4.5, 21.8 4 L19.5 9 C21.5 9.8, 22.8 11.5, 23 13.5 H29 Z" fill="#4285F4"/>
      </g>
      <!-- Top-Right Google Cloud Emblem + Gemini Sparkle -->
      <g transform="translate(644, 22)">
        <path d="M22 6 C18 2, 12 3, 9.5 7.5 L13.5 10.5 C15 8, 18 7.5, 20.5 9 L24 5.5 Z" fill="#EA4335"/>
        <path d="M9.5 7.5 C5.5 8.8, 3 12.8, 3.8 17 C4.3 20, 6.5 22.5, 9.2 23.8 L12 19 C10.2 18.2, 9 16.5, 9.2 14.5 Z" fill="#FBBC05"/>
        <path d="M9.2 23.8 H26.5 C30.8 24.5, 34.2 21.2, 34.5 17 L29 16 C28.8 18, 27.2 19.2, 25.2 19.2 H12 Z" fill="#34A853"/>
        <path d="M34.5 17 C34.8 12.5, 31.8 8.8, 27.5 8 C26.2 6, 24.2 4.5, 21.8 4 L19.5 9 C21.5 9.8, 22.8 11.5, 23 13.5 H29 Z" fill="#4285F4"/>
      </g>
      <g transform="translate(696, 18)">
        <path d="M20 2 C20 11, 27 18, 36 18 C27 18, 20 25, 20 34 C20 25, 13 18, 4 18 C13 18, 20 11, 20 2 Z" fill="#4285F4"/>
        <path d="M9 4 L10 7 L13 8 L10 9 L9 12 L8 9 L5 8 L8 7 Z" fill="#4285F4"/>
        <path d="M33 24 L34 27 L37 28 L34 29 L33 32 L32 29 L29 28 L32 27 Z" fill="#34A853"/>
      </g>

      <!-- Left Ingress & Cloud Load Balancing Arrows + Icon -->
      <line x1="22" y1="572" x2="92" y2="572" stroke="#0F172A" stroke-width="1.6" marker-end="url(#arr60)"/>
      <line x1="150" y1="572" x2="177" y2="572" stroke="#0F172A" stroke-width="1.6" marker-end="url(#arr60)"/>
      <!-- Cloud Load Balancing Icon -->
      <g transform="translate(106, 550)">
        <rect x="9" y="0" width="14" height="7" rx="1" fill="#5E97F6"/>
        <line x1="16" y1="7" x2="16" y2="15" stroke="#4285F4" stroke-width="2"/>
        <line x1="4" y1="15" x2="28" y2="15" stroke="#4285F4" stroke-width="2"/>
        <line x1="4" y1="15" x2="4" y2="20" stroke="#4285F4" stroke-width="2"/>
        <line x1="16" y1="15" x2="16" y2="20" stroke="#4285F4" stroke-width="2"/>
        <line x1="28" y1="15" x2="28" y2="20" stroke="#4285F4" stroke-width="2"/>
        <rect x="0" y="20" width="8" height="7" rx="1" fill="#4285F4"/>
        <rect x="12" y="20" width="8" height="7" rx="1" fill="#4285F4"/>
        <rect x="24" y="20" width="8" height="7" rx="1" fill="#4285F4"/>
      </g>
      <!-- Blue Toggle under Cloud Load Balancing -->
      <rect x="106" y="622" width="34" height="18" rx="9" fill="#4285F4" stroke="#1E3A8A" stroke-width="1"/>
      <circle cx="115" cy="631" r="6.5" fill="#FFFFFF"/>

      <!-- Dual Parallel Vertical Dotted Arrows: Cloud Run <-> Vertex AI -->
      <line x1="291" y1="492" x2="291" y2="424" stroke="#0F172A" stroke-width="1.6" stroke-dasharray="2.5,2.5" marker-end="url(#arr60)"/>
      <line x1="311" y1="420" x2="311" y2="488" stroke="#0F172A" stroke-width="1.6" stroke-dasharray="2.5,2.5" marker-end="url(#arr60)"/>

      <!-- Grounding Search Dotted L-Arrow: Vertex AI -> AlloyDB -->
      <path d="M 460 324 H 604 Q 613 324 613 333 V 388" fill="none" stroke="#0F172A" stroke-width="1.6" stroke-dasharray="2.5,2.5" marker-end="url(#arr60)"/>

      <!-- Session State Logs Dotted Bi-Directional Arrow: Cloud Run <-> AlloyDB -->
      <line x1="408" y1="556" x2="488" y2="556" stroke="#0F172A" stroke-width="1.6" stroke-dasharray="2.5,2.5" marker-start="url(#arr60_rev)" marker-end="url(#arr60)"/>

      <!-- Dual Parallel L-Shaped Dotted Arrows: Cloud Run <-> GKE Sandbox -->
      <path d="M 423 795 H 301 Q 291 795 291 785 V 656" fill="none" stroke="#0F172A" stroke-width="1.6" stroke-dasharray="2.5,2.5" marker-end="url(#arr60)"/>
      <path d="M 423 779 H 315 Q 307 779 307 771 V 656" fill="none" stroke="#0F172A" stroke-width="1.6" stroke-dasharray="2.5,2.5" marker-end="url(#arr60)"/>
    </svg>`);

    const dbCylSvg = `<svg width="46" height="36" viewBox="0 0 46 36" style="flex-shrink:0;margin-right:10px;"><ellipse cx="14" cy="7" rx="11" ry="4" fill="#4285F4" stroke="#0F172A" stroke-width="1.2"/><path d="M3 7v20c0 2.2 4.9 4 11 4s11-1.8 11-4V7" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.2"/><path d="M3 14c0 2.2 4.9 4 11 4s11-1.8 11-4" fill="none" stroke="#0F172A" stroke-width="1.1"/><path d="M3 21c0 2.2 4.9 4 11 4s11-1.8 11-4" fill="none" stroke="#0F172A" stroke-width="1.1"/><ellipse cx="14" cy="7" rx="11" ry="4" fill="#4285F4" stroke="#0F172A" stroke-width="1.2"/><ellipse cx="34" cy="17" rx="9" ry="3.2" fill="#34A853" stroke="#0F172A" stroke-width="1.2"/><path d="M25 17v12c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2V17" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.2"/><path d="M25 23c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2" fill="none" stroke="#0F172A" stroke-width="1.1"/><ellipse cx="34" cy="17" rx="9" ry="3.2" fill="#34A853" stroke="#0F172A" stroke-width="1.2"/></svg>`;
    const gkeHexSvg = `<svg width="38" height="42" viewBox="0 0 38 42" style="flex-shrink:0;margin-right:10px;"><polygon points="19,2 35,11 35,31 19,40 3,31 3,11" fill="none" stroke="#4285F4" stroke-width="2.5"/><polygon points="19,10 28,15 28,26 19,31 10,26 10,15" fill="#4285F4"/><line x1="19" y1="2" x2="19" y2="21" stroke="#FFFFFF" stroke-width="1.5"/><line x1="35" y1="11" x2="19" y2="21" stroke="#FFFFFF" stroke-width="1.5"/><line x1="3" y1="11" x2="19" y2="21" stroke="#FFFFFF" stroke-width="1.5"/></svg>`;
    const vtxIconSvg = `<svg width="38" height="24" viewBox="0 0 38 24" style="flex-shrink:0;margin-right:8px;"><path d="M4 6 L12 18 L20 6" fill="none" stroke="#4285F4" stroke-width="1.8" stroke-dasharray="2,2"/><circle cx="12" cy="18" r="2.2" fill="#4285F4"/><circle cx="26" cy="16" r="2.2" fill="#34A853"/><circle cx="32" cy="16" r="2.2" fill="#EA4335"/><circle cx="29" cy="11" r="2.2" fill="#FBBC05"/></svg>`;

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_60_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bg60Svg}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <!-- Header -->
      <mxCell id="hdr60" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:40px;font-weight:800;color:#0B1528;letter-spacing:-0.8px;line-height:1.1;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:20px;color:#0F172A;margin-top:8px;font-weight:500;'&gt;&lt;b&gt;Google Cloud enterprise&lt;/b&gt; agent topology and secure runtimes&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="35" y="92" width="695" height="90" as="geometry"/></mxCell>

      <!-- 01 | VERTEX AI -->
      <mxCell id="n60_1" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF9F5;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="180" y="240" width="280" height="180" as="geometry"/></mxCell>
      <mxCell id="n60_1h" value="${cleanSvg(`<div style="display:flex;justify-content:space-between;align-items:center;padding:0 12px;font-family:Inter,sans-serif;color:#FFFFFF;"><b style="font-size:12px;">01 | VERTEX AI</b><span style="background:#DCEBFE;color:#0F172A;border:1px solid #1E293B;padding:2px 8px;border-radius:999px;font-size:8.5px;font-weight:800;">REASONING ENGINE</span></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=#4285F4;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="180" y="240" width="280" height="34" as="geometry"/></mxCell>
      <mxCell id="n60_1b" value="${cleanSvg(`<div style="padding:10px 14px;text-align:left;font-family:Inter,sans-serif;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-size:16px;font-weight:800;color:#0F172A;line-height:1.2;">Vertex AI Reasoning Engine<br/>Gemini 1.5 Pro</div><svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 2 C14 9, 19 14, 26 14 C19 14, 14 19, 14 26 C14 19, 9 14, 2 14 C9 14, 14 9, 14 2 Z" fill="#4285F4"/><circle cx="23" cy="22" r="2" fill="#34A853"/></svg></div><div style="font-size:11.5px;color:#1E293B;margin-top:6px;line-height:1.28;">Handles model reasoning, goal planning,<br/>and intent parsing.</div><div style="margin-top:10px;display:flex;align-items:center;">${vtxIconSvg}<span style="background:#EAECEF;border:1px solid #94A3B8;padding:5px 8px;border-radius:8px;font-family:monospace;font-size:9.8px;color:#0F172A;font-weight:700;">agent = aiplatform.ReasoningEngine(..)</span></div></div>`)}" style="text;html=1;whiteSpace=wrap;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="180" y="274" width="280" height="146" as="geometry"/></mxCell>

      <!-- Left Labels: Secure Ingress & Cloud Load Balancing -->
      <mxCell id="ing60" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;font-size:11.5px;color:#0F172A;line-height:1.2;'&gt;Secure&lt;br/&gt;Ingress&lt;div style='margin-top:16px;'&gt;User/API&lt;br/&gt;request&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="18" y="534" width="68" height="76" as="geometry"/></mxCell>
      <mxCell id="clb60" value="&lt;div style='text-align:center;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.18;'&gt;Cloud Load&lt;br/&gt;Balancing&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="86" y="584" width="74" height="34" as="geometry"/></mxCell>

      <!-- 02 | CLOUD RUN -->
      <mxCell id="n60_2" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF9F5;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="180" y="492" width="224" height="160" as="geometry"/></mxCell>
      <mxCell id="n60_2h" value="${cleanSvg(`<div style="display:flex;justify-content:space-between;align-items:center;padding:0 10px;font-family:Inter,sans-serif;color:#0F172A;"><b style="font-size:11.5px;">02 | CLOUD RUN</b><span style="background:#FAF8F2;color:#0F172A;border:1px solid #0F172A;padding:2px 7px;border-radius:999px;font-size:8px;font-weight:800;">AGENT ORCHESTRATOR</span></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=#F4BC2B;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="180" y="492" width="224" height="34" as="geometry"/></mxCell>
      <mxCell id="n60_2b" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;"><div style="font-size:16px;font-weight:800;color:#0F172A;">Cloud Run Orchestrator</div><div style="font-size:11.5px;color:#1E293B;margin-top:5px;line-height:1.28;">API router &amp; state dispatch loop.<br/>Receives HTTPS triggers.</div><div style="margin-top:12px;display:flex;gap:6px;align-items:center;"><span style="background:#EAECEF;border:1px solid #94A3B8;padding:6px 8px;border-radius:6px;font-family:monospace;font-size:10px;font-weight:700;color:#0F172A;">POST /v1/agent/run</span><span style="display:inline-flex;align-items:center;gap:4px;background:#FAF8F2;border:1px solid #94A3B8;padding:4px 6px;border-radius:6px;font-size:9px;font-weight:800;color:#0F172A;">ACTIVE<svg width="24" height="13" viewBox="0 0 24 13"><rect width="24" height="13" rx="6.5" fill="#389856"/><circle cx="17.5" cy="6.5" r="5" fill="#FFFFFF"/></svg></span></div></div>`)}" style="text;html=1;whiteSpace=wrap;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="180" y="526" width="224" height="126" as="geometry"/></mxCell>

      <!-- 04 | ALLOYDB -->
      <mxCell id="n60_4" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF9F5;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="492" y="392" width="228" height="204" as="geometry"/></mxCell>
      <mxCell id="n60_4h" value="${cleanSvg(`<div style="display:flex;justify-content:space-between;align-items:center;padding:0 10px;font-family:Inter,sans-serif;color:#FFFFFF;"><b style="font-size:11.5px;">04 | ALLOYDB</b><span style="background:#DCFCE7;color:#0F172A;border:1px solid #0F172A;padding:2px 7px;border-radius:999px;font-size:8px;font-weight:800;">STATE &amp; KNOWLEDGE</span></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=#389856;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="492" y="392" width="228" height="34" as="geometry"/></mxCell>
      <mxCell id="n60_4b" value="${cleanSvg(`<div style="padding:10px 14px;text-align:left;font-family:Inter,sans-serif;"><div style="font-size:16px;font-weight:800;color:#0F172A;">AlloyDB Database</div><div style="font-size:13.5px;color:#0F172A;font-weight:500;">(PostgreSQL with pgvector)</div><div style="font-size:11.5px;color:#1E293B;margin-top:6px;line-height:1.28;">Persistent state, episodic history,<br/>and BigQuery/vector grounding.</div><div style="margin-top:10px;background:#EBEBEB;border:1px solid #94A3B8;padding:8px 10px;border-radius:8px;display:flex;align-items:center;">${dbCylSvg}<div style="font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.25;">Session history &amp;<br/>semantic RAG</div></div></div>`)}" style="text;html=1;whiteSpace=wrap;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="492" y="426" width="228" height="170" as="geometry"/></mxCell>

      <!-- 03 | GKE gVISOR SANDBOX -->
      <mxCell id="n60_3" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF9F5;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="423" y="638" width="297" height="288" as="geometry"/></mxCell>
      <mxCell id="n60_3h" value="${cleanSvg(`<div style="display:flex;justify-content:space-between;align-items:center;padding:0 12px;font-family:Inter,sans-serif;color:#FFFFFF;"><b style="font-size:11.5px;">03 | GKE gVISOR SANDBOX</b><span style="background:#FEE2E2;color:#0F172A;border:1px solid #0F172A;padding:2px 8px;border-radius:999px;font-size:8px;font-weight:800;">SECURE EXECUTION</span></div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=#E04839;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="423" y="638" width="297" height="34" as="geometry"/></mxCell>
      <mxCell id="n60_3b" value="${cleanSvg(`<div style="padding:10px 14px;text-align:left;font-family:Inter,sans-serif;"><div style="font-size:16px;font-weight:800;color:#0F172A;line-height:1.2;">Google Kubernetes Engine (GKE)<br/>&amp; gVisor Sandbox Cluster</div><div style="font-size:11.5px;color:#1E293B;margin-top:6px;line-height:1.28;">VPC Private network environment for executing<br/>dangerous scripts and CLI tools safely.</div><div style="margin-top:10px;background:#EBEBEB;border:1px solid #94A3B8;padding:10px;border-radius:8px;"><div style="display:flex;align-items:flex-start;">${gkeHexSvg}<div style="flex:1;"><div style="font-size:11.5px;font-weight:700;color:#0F172A;margin-bottom:6px;">Execution Sandbox (No Host Access)</div><div style="background:#FAF9F5;border:1px solid #94A3B8;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;color:#0F172A;margin-bottom:6px;text-align:center;">gVisor Isolated Pod #1 (Python)</div><div style="background:#FAF9F5;border:1px solid #94A3B8;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;color:#0F172A;margin-bottom:6px;text-align:center;">gVisor Isolated Pod #2 (Bash/CLI)</div><div style="background:#FAF9F5;border:1px solid #94A3B8;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:600;color:#0F172A;display:inline-block;">Egress Blocked</div></div></div></div></div>`)}" style="text;html=1;whiteSpace=wrap;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="423" y="672" width="297" height="254" as="geometry"/></mxCell>

      <!-- Connector Labels -->
      <mxCell id="lbl60_12" value="Inference &amp;&lt;br/&gt;Prompt loop" style="text;html=1;align=left;verticalAlign=middle;fontSize=11.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="330" y="436" width="85" height="36" as="geometry"/></mxCell>
      <mxCell id="lbl60_14" value="Grounding search" style="text;html=1;align=center;verticalAlign=middle;fontSize=11.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="502" y="298" width="115" height="22" as="geometry"/></mxCell>
      <mxCell id="lbl60_24" value="Session&lt;br/&gt;state logs" style="text;html=1;align=center;verticalAlign=middle;fontSize=11.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="414" y="564" width="68" height="34" as="geometry"/></mxCell>
      <mxCell id="lbl60_23L" value="Secure&lt;br/&gt;gRPC Exec" style="text;html=1;align=right;verticalAlign=middle;fontSize=11.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="210" y="726" width="72" height="34" as="geometry"/></mxCell>
      <mxCell id="lbl60_23R" value="Results&lt;br/&gt;&amp;amp; logs" style="text;html=1;align=left;verticalAlign=middle;fontSize=11.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="315" y="726" width="62" height="34" as="geometry"/></mxCell>

      <mxCell id="ftr60" value="GOOGLE CLOUD ENTERPRISE AGENT TOPOLOGY • ARCHITECTURE &amp; TOPOLOGY DIAGRAM • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=11;letterSpacing=0.4;" vertex="1" parent="1"><mxGeometry x="0" y="976" width="765" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 10. #61: HIERARCHICAL TREE DIAGRAM (Exact 1:1 Vector Twin of 61.png on 765x1024)
  // ============================================================================
  if (id === '61' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Hierarchical Tree Diagram');
    const bgSvg61 = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g61s" width="19.125" height="19.125" patternUnits="userSpaceOnUse">
          <path d="M 19.125 0 L 0 0 0 19.125" fill="none" stroke="#EDE8DC" stroke-width="0.65"/>
        </pattern>
        <pattern id="g61l" width="76.5" height="76.5" patternUnits="userSpaceOnUse">
          <rect width="76.5" height="76.5" fill="url(#g61s)"/>
          <path d="M 76.5 0 L 0 0 0 76.5" fill="none" stroke="#E2DBCC" stroke-width="1.05"/>
        </pattern>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g61l)"/>
      <!-- Top right Google Cloud + Gemini logo -->
      <g transform="translate(552, 34)">
        <path d="M13.5 5.5 A5.5 5.5 0 0 1 23.5 8.5 A4 4 0 0 1 23 16.5 L8 16.5 A4.5 4.5 0 0 1 7.5 7.5 A5 5 0 0 1 13.5 5.5 Z" fill="none" stroke="#EA4335" stroke-width="2.2"/>
        <path d="M16 5 A5.5 5.5 0 0 1 23.5 9.5" fill="none" stroke="#4285F4" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M23.5 9.5 A4 4 0 0 1 22.5 16.5 L16 16.5" fill="none" stroke="#34A853" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M16 16.5 L8.5 16.5 A4.5 4.5 0 0 1 7.5 8.5" fill="none" stroke="#FBBC05" stroke-width="2.4" stroke-linecap="round"/>
        <text x="29" y="15" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#5F6368">Google Cloud</text>
        <text x="123" y="15" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#0F172A">&amp;</text>
        <text x="137" y="15" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#475569">Gemini</text>
        <path d="M184 2 Q184 7 189 7 Q184 7 184 12 Q184 7 179 7 Q184 7 184 2 Z" fill="#60A5FA"/>
      </g>
      <!-- Tree Connectors: Supervisor -> 3 Workers -->
      <path d="M382.5 366 L382.5 438" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M378.5 431 L382.5 438 L386.5 431" stroke="#1E293B" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M382.5 394 Q382.5 402 374.5 402 L155.5 402 Q147.5 402 147.5 410 L147.5 420" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M143.5 413 L147.5 420 L151.5 413" stroke="#1E293B" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M382.5 394 Q382.5 402 390.5 402 L609.5 402 Q617.5 402 617.5 410 L617.5 438" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M613.5 431 L617.5 438 L621.5 431" stroke="#1E293B" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Tree Connectors: 3 Workers -> Environment Layer -->
      <path d="M147.5 634 L147.5 648 Q147.5 654 155.5 654 L374.5 654 Q382.5 654 382.5 662" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M617.5 634 L617.5 648 Q617.5 654 609.5 654 L390.5 654 Q382.5 654 382.5 662" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M382.5 634 L382.5 685" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M378.5 678 L382.5 685 L386.5 678" stroke="#1E293B" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bottom 3 L-bracket callout lines from Environment Layer -->
      <rect x="71" y="769" width="6" height="6" rx="1" fill="#FAF8F2" stroke="#1E293B" stroke-width="1.4"/>
      <path d="M74 775 L74 790 Q74 794 78 794 L112 794" stroke="#1E293B" stroke-width="1.5" fill="none"/>
      <rect x="285" y="769" width="6" height="6" rx="1" fill="#FAF8F2" stroke="#1E293B" stroke-width="1.4"/>
      <path d="M288 775 L288 790 Q288 794 292 794 L318 794" stroke="#1E293B" stroke-width="1.5" fill="none"/>
      <rect x="519" y="769" width="6" height="6" rx="1" fill="#FAF8F2" stroke="#1E293B" stroke-width="1.4"/>
      <path d="M522 775 L522 790 Q522 794 526 794 L558 794" stroke="#1E293B" stroke-width="1.5" fill="none"/>
    </svg>`);

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_61_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bgSvg61}" style="text;html=1;align=center;verticalAlign=middle; spacing=0;spacingTop=0;spacingBottom=0;spacingLeft=0;spacingRight=0;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <mxCell id="hdr61" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;">
        <div style="font-size:15px;font-weight:500;color:#1E293B;">Editorial newsletter infographic</div>
        <div style="font-size:50px;font-weight:900;color:#0B132B;letter-spacing:-0.8px;margin-top:8px;line-height:1.05;text-align:center;">${hTitle}</div>
        <div style="font-size:18.5px;color:#334155;margin-top:8px;text-align:center;font-weight:500;">Multi-agent supervisor delegation and worker execution on Google Cloud</div>
      </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="40" y="30" width="685" height="125" as="geometry"/></mxCell>

      <!-- 01 | SUPERVISION ZONE -->
      <mxCell id="z61_1" value="01 | SUPERVISION ZONE" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="275" y="172" width="215" height="22" as="geometry"/></mxCell>
      <mxCell id="sup61" value="${cleanSvg(`<div style="padding:14px 14px;text-align:left;font-family:Inter,sans-serif;color:#FFFFFF;width:187px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <span style="font-size:16.5px;font-weight:900;line-height:1.18;letter-spacing:0.2px;">SUPERVISOR<br/>AGENT</span>
          <span style="background:#B9D5FA;color:#0F172A;border:1.4px solid #0F172A;width:28px;height:28px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">01</span>
        </div>
        <div style="font-size:11.2px;margin-top:10px;line-height:1.34;color:#F8FAFC;">Analyzes high-level goals, decomposes tasks, coordinates specialized agents, and validates the final response.</div>
        <div style="margin-top:12px;display:flex;gap:5px;white-space:nowrap;">
          <span style="background:#213C7A;color:#FFFFFF;padding:3px 7px;border-radius:8px;font-size:8.4px;font-weight:800;letter-spacing:0.2px;">ORCHESTRATOR</span>
          <span style="background:#213C7A;color:#FFFFFF;padding:3px 7px;border-radius:8px;font-size:8.4px;font-weight:800;letter-spacing:0.2px;">GOAL-DRIVEN</span>
        </div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#427CE6;strokeColor=#0F172A;strokeWidth=1.5;shadow=1;" vertex="1" parent="1"><mxGeometry x="275" y="196" width="215" height="170" as="geometry"/></mxCell>

      <mxCell id="lbl61_del" value="Delegate &amp; Route" style="text;html=1;align=left;verticalAlign=middle;fontSize=12;fontColor=#1E293B;fontStyle=0;" vertex="1" parent="1"><mxGeometry x="390" y="374" width="115" height="22" as="geometry"/></mxCell>

      <!-- 02 | SPECIALIZED WORKER ZONE -->
      <mxCell id="z61_2" value="02 | SPECIALIZED WORKER ZONE" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="40" y="421" width="240" height="22" as="geometry"/></mxCell>

      <mxCell id="w61_1" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;color:#0F172A;width:185px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <span style="font-size:16px;font-weight:900;line-height:1.18;">SQL DATA<br/>AGENT</span>
          <span style="background:#BCE0C8;border:1.2px solid #0F172A;width:28px;height:28px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">02a</span>
        </div>
        <div style="display:inline-block;background:#2E8B46;color:#FFFFFF;padding:2.5px 9px;border-radius:9px;font-size:9px;font-weight:800;margin-top:8px;letter-spacing:0.3px;">DATA ACCESS</div>
        <div style="font-size:11px;margin-top:8px;line-height:1.32;color:#1E293B;">Queries databases, joins datasets, and fetches structured schema information.</div>
        <div style="font-size:10.8px;margin-top:7px;line-height:1.4;color:#0F172A;font-weight:500;">• Direct BigQuery &amp; SQL query<br/>• Retrieve relational tables</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#C7E6D1;strokeColor=#0F172A;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="40" y="445" width="215" height="189" as="geometry"/></mxCell>

      <mxCell id="w61_2" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;color:#0F172A;width:185px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <span style="font-size:16px;font-weight:900;line-height:1.18;">WEB RESEARCHER<br/>AGENT</span>
          <span style="background:#F2CC7B;border:1.2px solid #0F172A;width:28px;height:28px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">02b</span>
        </div>
        <div style="display:inline-block;background:#B87A08;color:#FFFFFF;padding:2.5px 9px;border-radius:9px;font-size:9px;font-weight:800;margin-top:8px;letter-spacing:0.3px;">BROWSER / SEARCH</div>
        <div style="font-size:11px;margin-top:8px;line-height:1.32;color:#1E293B;">Scrapes web pages, accesses APIs, and gathers real-time public information.</div>
        <div style="font-size:10.8px;margin-top:7px;line-height:1.4;color:#0F172A;font-weight:500;">• Google Search API calls<br/>• Parse web content</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#F6D68B;strokeColor=#0F172A;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="275" y="445" width="215" height="189" as="geometry"/></mxCell>

      <mxCell id="w61_3" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;color:#0F172A;width:185px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <span style="font-size:16px;font-weight:900;line-height:1.18;">CODE SYNTHESIS<br/>AGENT</span>
          <span style="background:#F2B8B0;border:1.2px solid #0F172A;width:28px;height:28px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">02c</span>
        </div>
        <div style="display:inline-block;background:#C94438;color:#FFFFFF;padding:2.5px 9px;border-radius:9px;font-size:9px;font-weight:800;margin-top:8px;letter-spacing:0.3px;">EXECUTION / WRITE</div>
        <div style="font-size:11px;margin-top:8px;line-height:1.32;color:#1E293B;">Writes, tests, and refactors code scripts to process fetched datasets.</div>
        <div style="font-size:10.8px;margin-top:7px;line-height:1.4;color:#0F172A;font-weight:500;">• Python/Node generation<br/>• Run test suite &amp; debug</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#F6C5BE;strokeColor=#0F172A;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="510" y="445" width="215" height="189" as="geometry"/></mxCell>

      <!-- 03 | ENVIRONMENT & LAYER -->
      <mxCell id="z61_3" value="03 | ENVIRONMENT &amp; LAYER" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="40" y="663" width="240" height="22" as="geometry"/></mxCell>

      <mxCell id="env61" value="${cleanSvg(`<div style="position:relative;padding:12px 18px;text-align:center;font-family:Inter,sans-serif;color:#FFFFFF;width:649px;box-sizing:border-box;">
        <div style="font-size:16px;font-weight:900;letter-spacing:0.3px;">UNIFIED RESOURCE &amp; ENVIRONMENT LAYER</div>
        <div style="position:absolute;right:8px;top:14px;background:#A5D8F3;color:#0F172A;width:29px;height:29px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">03</div>
        <div style="margin-top:6px;display:flex;justify-content:center;gap:8px;">
          <span style="background:#3898EC;color:#0F172A;padding:2px 9px;border-radius:8px;font-size:9.5px;font-weight:800;">ISOLATED VPC</span>
          <span style="background:#149E94;color:#FFFFFF;padding:2px 9px;border-radius:8px;font-size:9.5px;font-weight:800;">SECURE</span>
        </div>
        <div style="font-size:11.5px;color:#E2E8F0;margin-top:6px;">Execution boundary for sandboxed workloads, database access, &amp; storage.</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#162038;strokeColor=#0F172A;strokeWidth=1.5;shadow=1;" vertex="1" parent="1"><mxGeometry x="40" y="688" width="685" height="84" as="geometry"/></mxCell>

      <mxCell id="sub61_1" value="&lt;b style='font-size:12px;'&gt;Database Layer&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11.5px;color:#334155;'&gt;(SQL, database connectors)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="78" y="782" width="175" height="36" as="geometry"/></mxCell>
      <mxCell id="sub61_2" value="&lt;b style='font-size:12px;'&gt;Sandbox / Execution&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11.5px;color:#334155;'&gt;(gVisor &amp;amp; isolated runtime)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="295" y="782" width="175" height="36" as="geometry"/></mxCell>
      <mxCell id="sub61_3" value="&lt;b style='font-size:12px;'&gt;Knowledge Base&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11.5px;color:#334155;'&gt;(File storage, RAG vector)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="520" y="782" width="175" height="36" as="geometry"/></mxCell>

      <mxCell id="tk61" value="${cleanSvg(`<div style="padding:12px 18px;text-align:left;font-family:Inter,sans-serif;font-size:16px;line-height:1.38;color:#0F172A;"><b>TAKEAWAY:</b> Hierarchical delegation separates high-level task planning from specialized worker execution, maintaining strict secure containment.</div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="40" y="838" width="685" height="68" as="geometry"/></mxCell>

      <mxCell id="cap61" value="Hierarchical Tree Diagram" style="text;html=1;align=center;verticalAlign=middle;fontSize=15;fontColor=#1E293B;fontStyle=0;" vertex="1" parent="1"><mxGeometry x="260" y="920" width="245" height="26" as="geometry"/></mxCell>

      <mxCell id="ftr61" value="GOOGLE CLOUD • GEMINI • ENTERPRISE AGENT REFERENCE ARCHITECTURE • REVISION 2.4 • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#162038;strokeColor=#162038;fontColor=#FFFFFF;fontStyle=0;fontSize=11.5;letterSpacing=0.3;" vertex="1" parent="1"><mxGeometry x="0" y="978" width="765" height="46" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 11. #62: 2x2 QUADRANT MATRIX (Exact 1:1 Vector Twin of 62.png on 765x1024)
  // ============================================================================
  if (id === '62' && !items) {
    const hTitle = esc(cleanCustomTitle || '2x2 Quadrant Matrix');
    const bgSvg62 = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g62s" width="19.125" height="19.125" patternUnits="userSpaceOnUse">
          <path d="M 19.125 0 L 0 0 0 19.125" fill="none" stroke="#EDE8DC" stroke-width="0.65"/>
        </pattern>
        <pattern id="g62l" width="76.5" height="76.5" patternUnits="userSpaceOnUse">
          <rect width="76.5" height="76.5" fill="url(#g62s)"/>
          <path d="M 76.5 0 L 0 0 0 76.5" fill="none" stroke="#E2DBCC" stroke-width="1.05"/>
        </pattern>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g62l)"/>
      <!-- Top right Google Cloud + Gemini logo -->
      <g transform="translate(608, 30)">
        <path d="M16 6 A8 8 0 0 1 30 10 A6 6 0 0 1 29 22 L8 22 A6.5 6.5 0 0 1 7 9.5 A7 7 0 0 1 16 6 Z" fill="none" stroke="#EA4335" stroke-width="3.6"/>
        <path d="M20 5.5 A8 8 0 0 1 30 12" fill="none" stroke="#4285F4" stroke-width="3.8" stroke-linecap="round"/>
        <path d="M30 12 A6 6 0 0 1 28.5 22 L18 22" fill="none" stroke="#34A853" stroke-width="3.8" stroke-linecap="round"/>
        <path d="M18 22 L8.5 22 A6.5 6.5 0 0 1 7 11" fill="none" stroke="#FBBC05" stroke-width="3.8" stroke-linecap="round"/>
        <text x="40" y="21" font-family="Inter,sans-serif" font-size="22" font-weight="500" fill="#64748B">Gemini</text>
        <path d="M104 2 Q104 6 108 6 Q104 6 104 10 Q104 6 100 6 Q104 6 104 2 Z" fill="#94A3B8"/>
      </g>
      <!-- Y-Axis Vertical Line & Arrowhead -->
      <line x1="100" y1="796" x2="100" y2="270" stroke="#0F172A" stroke-width="2"/>
      <polygon points="100,260 94,271 106,271" fill="#0F172A"/>
      <!-- Y-Axis Rotated Text -->
      <text x="78" y="294" transform="rotate(-90 78 294)" text-anchor="middle" font-family="Inter,sans-serif" font-size="18" font-weight="800" fill="#0F172A">HIGH</text>
      <text x="66" y="530" transform="rotate(-90 66 530)" text-anchor="middle" font-family="Inter,sans-serif" font-size="16.5" font-weight="800" fill="#0F172A">BUSINESS IMPACT</text>
      <text x="84" y="530" transform="rotate(-90 84 530)" text-anchor="middle" font-family="Inter,sans-serif" font-size="13.5" font-weight="500" fill="#1E293B">(Value, ROI &amp; Output Quality)</text>
      <text x="78" y="772" transform="rotate(-90 78 772)" text-anchor="middle" font-family="Inter,sans-serif" font-size="18" font-weight="800" fill="#0F172A">LOW</text>

      <!-- X-Axis Horizontal Line & Arrowhead -->
      <line x1="116" y1="812" x2="710" y2="812" stroke="#0F172A" stroke-width="2"/>
      <polygon points="720,812 709,806 709,818" fill="#0F172A"/>
      <!-- X-Axis Labels -->
      <text x="116" y="838" font-family="Inter,sans-serif" font-size="18" font-weight="800" fill="#0F172A">LOW</text>
      <text x="410" y="836" text-anchor="middle" font-family="Inter,sans-serif" font-size="16.5" font-weight="800" fill="#0F172A">TECHNICAL COMPLEXITY</text>
      <text x="410" y="854" text-anchor="middle" font-family="Inter,sans-serif" font-size="13.5" font-weight="500" fill="#1E293B">(Time, Cost, Effort &amp; Tech Friction)</text>
      <text x="708" y="838" text-anchor="end" font-family="Inter,sans-serif" font-size="18" font-weight="800" fill="#0F172A">HIGH</text>
    </svg>`);

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_62_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bgSvg62}" style="text;html=1;align=center;verticalAlign=middle; spacing=0;spacingTop=0;spacingBottom=0;spacingLeft=0;spacingRight=0;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <mxCell id="hdr62" value="${cleanSvg(`<div style="text-align:left;font-family:Inter,sans-serif;">
        <div style="font-size:12.5px;font-weight:700;color:#1E293B;letter-spacing:0.3px;">EDITORIAL NEWSLETTER TECHNICAL INFOGRAPHIC POSTER</div>
        <div style="font-size:54px;font-weight:900;color:#0B132B;letter-spacing:-1px;margin-top:8px;line-height:1.02;">${hTitle}</div>
        <div style="font-size:21px;color:#334155;margin-top:8px;line-height:1.25;font-weight:500;">Mapping enterprise AI agent tasks across<br/>Business Impact vs Technical Complexity</div>
        <div style="font-size:15px;font-weight:800;color:#0F172A;margin-top:16px;">AXES &amp; BOUNDARIES</div>
      </div>`)}" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="50" y="34" width="665" height="215" as="geometry"/></mxCell>

      <!-- Q1: 01 | QUICK WINS -->
      <mxCell id="q62_1" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;width:254px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:18px;font-weight:900;color:#0F172A;">01 | QUICK WINS</span>
          <span style="background:#568278;color:#FFFFFF;width:30px;height:30px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;">✓</span>
        </div>
        <div style="font-size:12.5px;color:#1E293B;margin-top:4px;line-height:1.25;">High ROI, fast implementation.<br/>Build first.</div>
        <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <div style="background:#1D6CE0;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Draft Email<br/>Responses</div>
          <div style="background:#1E9E49;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Document<br/>Translation</div>
          <div style="background:#0D8A7B;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Meeting<br/>Summaries</div>
          <div style="background:#1D6CE0;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Standard Ticket<br/>Routing</div>
        </div>
        <div style="margin-top:6px;">
          <span style="display:inline-block;background:#23B26D;color:#FFF;padding:5px 14px;border-radius:999px;font-size:10.5px;font-weight:700;">Auto-tagging CRM Leads</span>
        </div>
        <div style="margin-top:12px;display:flex;gap:6px;">
          <span style="background:#2563EB;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">HIGH IMPACT</span>
          <span style="background:#1E9E49;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">LOW COMPLEXITY</span>
        </div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#CBE7DF;strokeColor=#5E7A73;strokeWidth=1.5;verticalAlign=top;shadow=1;" vertex="1" parent="1"><mxGeometry x="116" y="262" width="284" height="260" as="geometry"/></mxCell>

      <!-- Q2: 02 | STRATEGIC BETS -->
      <mxCell id="q62_2" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;width:262px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:18px;font-weight:900;color:#0F172A;">02 | STRATEGIC BETS</span>
          <span style="background:#364182;color:#FFFFFF;width:30px;height:30px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;">★</span>
        </div>
        <div style="font-size:12.5px;color:#1E293B;margin-top:4px;line-height:1.25;">Complex but transformative.<br/>High long-term value.</div>
        <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <div style="background:#364182;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Workflow<br/>Orchestration</div>
          <div style="background:#2563EB;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Autonomous<br/>Market Research</div>
          <div style="background:#524BB7;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Full Code<br/>Generation</div>
          <div style="background:#0D8A7B;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Dynamic Multi-<br/>Agent Collabs</div>
        </div>
        <div style="margin-top:6px;">
          <span style="display:inline-block;background:#172C56;color:#FFF;padding:5px 14px;border-radius:999px;font-size:10.5px;font-weight:700;">Predictive Operations</span>
        </div>
        <div style="margin-top:12px;display:flex;gap:6px;">
          <span style="background:#2563EB;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">HIGH IMPACT</span>
          <span style="background:#EE7258;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">HIGH COMPLEXITY</span>
        </div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#DCE3F2;strokeColor=#626B80;strokeWidth=1.5;verticalAlign=top;shadow=1;" vertex="1" parent="1"><mxGeometry x="415" y="262" width="292" height="260" as="geometry"/></mxCell>

      <!-- Q3: 03 | LOW PRIORITY -->
      <mxCell id="q62_3" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;width:254px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:18px;font-weight:900;color:#0F172A;">03 | LOW PRIORITY</span>
          <span style="background:#9A8E74;color:#FFFFFF;width:30px;height:30px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;">❚❚</span>
        </div>
        <div style="font-size:12.5px;color:#1E293B;margin-top:4px;line-height:1.25;">Easy to deploy but low business<br/>return.</div>
        <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <div style="background:#7B848C;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Local File<br/>Organization</div>
          <div style="background:#58636E;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Internal<br/>Calendar Sync</div>
          <div style="background:#DFCCA1;color:#0F172A;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Holiday Greeting<br/>Drafts</div>
          <div style="background:#7B848C;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Routine<br/>Database Polling</div>
        </div>
        <div style="margin-top:6px;">
          <span style="display:inline-block;background:#7B848C;color:#FFF;padding:5px 14px;border-radius:999px;font-size:10.5px;font-weight:700;">Basic Post Formatting</span>
        </div>
        <div style="margin-top:12px;display:flex;gap:6px;">
          <span style="background:#7B848C;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">LOW IMPACT</span>
          <span style="background:#1E9E49;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">LOW COMPLEXITY</span>
        </div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F3E4BC;strokeColor=#8C7F60;strokeWidth=1.5;verticalAlign=top;shadow=1;" vertex="1" parent="1"><mxGeometry x="116" y="536" width="284" height="260" as="geometry"/></mxCell>

      <!-- Q4: 04 | HIGH RISK TRAPS -->
      <mxCell id="q62_4" value="${cleanSvg(`<div style="padding:14px 15px;text-align:left;font-family:Inter,sans-serif;width:262px;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:18px;font-weight:900;color:#0F172A;">04 | HIGH RISK TRAPS</span>
          <span style="background:#B85342;color:#FFFFFF;width:30px;height:30px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;">▲</span>
        </div>
        <div style="font-size:12.5px;color:#1E293B;margin-top:4px;line-height:1.25;">Heavy engineering effort for<br/>minor ROI. Avoid or defer.</div>
        <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <div style="background:#C81E1E;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Legacy Code<br/>Refactoring</div>
          <div style="background:#EE7258;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Creative Brand<br/>Strategy</div>
          <div style="background:#C81E1E;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Arbitrary Bulk<br/>Migration</div>
          <div style="background:#EA6A12;color:#FFF;padding:5px 8px;border-radius:999px;font-size:10.2px;font-weight:700;text-align:center;line-height:1.15;">Flexible<br/>Negotiation</div>
        </div>
        <div style="margin-top:6px;">
          <span style="display:inline-block;background:#C81E1E;color:#FFF;padding:5px 14px;border-radius:999px;font-size:10.5px;font-weight:700;">Subjective HR Evaluation</span>
        </div>
        <div style="margin-top:12px;display:flex;gap:6px;">
          <span style="background:#7B848C;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">LOW IMPACT</span>
          <span style="background:#EE7258;color:#FFF;padding:4px 10px;border-radius:8px;font-size:10px;font-weight:800;">HIGH COMPLEXITY</span>
        </div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=#F7CBC1;strokeColor=#8F6058;strokeWidth=1.5;verticalAlign=top;shadow=1;" vertex="1" parent="1"><mxGeometry x="415" y="536" width="292" height="260" as="geometry"/></mxCell>

      <mxCell id="tk62" value="${cleanSvg(`<div style="padding:10px 16px;text-align:left;font-family:Inter,sans-serif;font-size:14.2px;line-height:1.38;color:#0F172A;"><b>TAKEAWAY:</b> Target Quick Wins first to build momentum, invest in Strategic Bets with guardrails, handle Low Priority casually, and firmly avoid the High Risk Traps.</div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="50" y="880" width="665" height="64" as="geometry"/></mxCell>

      <mxCell id="ftr62" value="GOOGLE CLOUD • GEMINI • 2X2 QUADRANT MATRIX • ENTERPRISE AGENT TRADE-OFFS • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=1;fontSize=11.5;letterSpacing=0.3;" vertex="1" parent="1"><mxGeometry x="0" y="978" width="765" height="46" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 12. #63: DECISION TREE FLOWCHART (Exact 1:1 Vector Twin of 63.png on 765x1024)
  // ============================================================================
  if (id === '63' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Decision Tree Flowchart');
    const bgSvg63 = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g63s" width="19.125" height="19.125" patternUnits="userSpaceOnUse">
          <path d="M 19.125 0 L 0 0 0 19.125" fill="none" stroke="#E5ECF3" stroke-width="0.7"/>
        </pattern>
        <pattern id="g63l" width="76.5" height="76.5" patternUnits="userSpaceOnUse">
          <rect width="76.5" height="76.5" fill="url(#g63s)"/>
          <path d="M 76.5 0 L 0 0 0 76.5" fill="none" stroke="#D8E2ED" stroke-width="1.1"/>
        </pattern>
      </defs>
      <rect width="765" height="1024" fill="#F9FBFD"/>
      <rect width="765" height="1024" fill="url(#g63l)"/>

      <!-- Stage Bands -->
      <rect x="40" y="150" width="685" height="214" rx="10" fill="#EFF4F9" fill-opacity="0.75"/>
      <rect x="40" y="376" width="685" height="288" rx="10" fill="#EFF4F9" fill-opacity="0.75"/>
      <rect x="40" y="680" width="685" height="270" rx="10" fill="#EFF4F9" fill-opacity="0.75"/>

      <!-- Connectors in Band 01 -->
      <line x1="382.5" y1="234" x2="382.5" y2="256" stroke="#1E293B" stroke-width="1.8"/>
      <polygon points="382.5,260 378.5,252 386.5,252" fill="#1E293B"/>

      <!-- NO branch to 01a -->
      <line x1="320" y1="292" x2="276" y2="292" stroke="#E05A2B" stroke-width="2"/>
      <polygon points="272,292 280,288 280,296" fill="#E05A2B"/>

      <!-- Return line between 01a and main stem -->
      <path d="M382.5 362 L212 362 Q204 362 204 354 L204 344" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <polygon points="204,340 200,348 208,348" fill="#1E293B"/>

      <!-- YES branch from 01 to 02 Evaluate -->
      <line x1="382.5" y1="324" x2="382.5" y2="382" stroke="#289448" stroke-width="2"/>
      <polygon points="382.5,386 378.5,378 386.5,378" fill="#289448"/>

      <!-- Connectors in Band 02 -->
      <line x1="382.5" y1="436" x2="382.5" y2="454" stroke="#1E293B" stroke-width="1.8"/>
      <polygon points="382.5,458 378.5,450 386.5,450" fill="#1E293B"/>

      <!-- NO branch from External Tools to Direct Execution -->
      <path d="M320 480 L272 480 L272 510" stroke="#E05A2B" stroke-width="2" fill="none"/>
      <polygon points="272,514 268,506 276,506" fill="#E05A2B"/>

      <!-- YES branch from External Tools to Permissions -->
      <path d="M445 480 L492 480 L492 508" stroke="#289448" stroke-width="2" fill="none"/>
      <polygon points="492,512 488,504 496,504" fill="#289448"/>

      <!-- NO branch from Permissions to Escalate -->
      <line x1="556" y1="536" x2="600" y2="536" stroke="#E05A2B" stroke-width="2"/>
      <polygon points="604,536 596,532 596,540" fill="#E05A2B"/>

      <!-- YES branch from Permissions to Invoke Tools -->
      <line x1="492" y1="560" x2="492" y2="594" stroke="#289448" stroke-width="2"/>
      <polygon points="492,598 488,590 496,590" fill="#289448"/>

      <!-- Merge from Direct Execution & Invoke Tools into Execute Task -->
      <path d="M272 576 L272 662 Q272 670 280 670 L374.5 670 Q382.5 670 382.5 678 L382.5 692" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <path d="M492 658 L492 664 Q492 670 484 670 L390.5 670 Q382.5 670 382.5 678" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <polygon points="382.5,696 378.5,688 386.5,688" fill="#1E293B"/>

      <!-- Connectors in Band 03 -->
      <line x1="382.5" y1="746" x2="382.5" y2="768" stroke="#1E293B" stroke-width="1.8"/>
      <polygon points="382.5,772 378.5,764 386.5,764" fill="#1E293B"/>

      <!-- NO branch to Self-Correction Loop -->
      <line x1="318" y1="796" x2="268" y2="796" stroke="#E05A2B" stroke-width="2"/>
      <polygon points="264,796 272,792 272,800" fill="#E05A2B"/>

      <!-- Orange arrow between Self-Correction Loop and Error Escalation -->
      <line x1="188" y1="844" x2="188" y2="828" stroke="#E05A2B" stroke-width="2"/>
      <polygon points="188,824 184,832 192,832" fill="#E05A2B"/>

      <!-- Loop back from left of Error Escalation to Execute Task -->
      <path d="M112 865 L102 865 Q96 865 96 857 L96 726 Q96 718 104 718 L305 718" stroke="#1E293B" stroke-width="1.8" fill="none"/>
      <polygon points="310,718 302,714 302,722" fill="#1E293B"/>

      <!-- YES branch to Deliver Final Result -->
      <line x1="382.5" y1="820" x2="382.5" y2="864" stroke="#289448" stroke-width="2"/>
      <polygon points="382.5,868 378.5,860 386.5,860" fill="#289448"/>
    </svg>`);

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_63_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#F9FBFD"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bgSvg63}" style="text;html=1;align=center;verticalAlign=middle; spacing=0;spacingTop=0;spacingBottom=0;spacingLeft=0;spacingRight=0;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <mxCell id="hdr63" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;">
        <div style="font-size:48px;font-weight:900;color:#0B132B;letter-spacing:-0.8px;">${hTitle}</div>
        <div style="font-size:19px;color:#475569;margin-top:6px;font-weight:400;">Conditional branching logic and decision paths</div>
      </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="40" y="38" width="685" height="92" as="geometry"/></mxCell>

      <!-- Band Labels -->
      <mxCell id="t63_1" value="01 | INGEST" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=17;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="168" width="150" height="26" as="geometry"/></mxCell>
      <mxCell id="t63_2" value="02 | TOOL CHECK" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=17;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="392" width="180" height="26" as="geometry"/></mxCell>
      <mxCell id="t63_3" value="03 | EXECUTE" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=17;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="694" width="160" height="26" as="geometry"/></mxCell>

      <!-- Band 01 Cards -->
      <mxCell id="n63_rec" value="${cleanSvg(`<div style="padding:8px;text-align:center;font-family:Inter,sans-serif;">
        <svg width="22" height="20" viewBox="0 0 24 22" style="display:inline-block;margin-bottom:2px;"><circle cx="9" cy="9" r="5" fill="none" stroke="#475569" stroke-width="1.6"/><circle cx="9" cy="9" r="2" fill="none" stroke="#475569" stroke-width="1.4"/><circle cx="17" cy="15" r="4" fill="none" stroke="#475569" stroke-width="1.6"/></svg>
        <div style="font-size:13px;font-weight:800;color:#0F172A;">Receive Input</div>
        <div style="font-size:11px;color:#334155;">Task / Objective</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="311" y="164" width="143" height="70" as="geometry"/></mxCell>

      <mxCell id="n63_obj" value="${cleanSvg(`<div style="padding:8px;text-align:center;font-family:Inter,sans-serif;">
        <svg width="16" height="16" viewBox="0 0 18 18" style="display:inline-block;margin-bottom:2px;"><circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="#475569" stroke-width="1.6"/><line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#475569" stroke-width="1.8" stroke-linecap="round"/></svg>
        <div style="font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.22;">Is the objective<br/>clearly defined?</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="320" y="258" width="125" height="66" as="geometry"/></mxCell>

      <mxCell id="n63_clar" value="${cleanSvg(`<div style="padding:8px;text-align:center;font-family:Inter,sans-serif;">
        <svg width="22" height="18" viewBox="0 0 24 20" style="display:inline-block;margin-bottom:2px;"><ellipse cx="10" cy="8" rx="6" ry="5" fill="none" stroke="#475569" stroke-width="1.5"/><ellipse cx="15" cy="12" rx="5.5" ry="4.5" fill="#FFFFFF" stroke="#475569" stroke-width="1.5"/></svg>
        <div style="font-size:12px;font-weight:800;color:#0F172A;line-height:1.2;">01a | Request<br/>Clarification</div>
        <div style="font-size:9.8px;color:#334155;margin-top:4px;line-height:1.22;">Ask user for missing<br/>inputs or constraints</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="136" y="240" width="136" height="100" as="geometry"/></mxCell>

      <mxCell id="p63_no1" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#E05A2B;strokeColor=#E05A2B;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="283" y="281" width="29" height="21" as="geometry"/></mxCell>
      <mxCell id="p63_yes1" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#289448;strokeColor=#289448;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="366" y="333" width="33" height="21" as="geometry"/></mxCell>

      <!-- Band 02 Cards -->
      <mxCell id="n63_eval" value="&lt;div style='padding:6px;text-align:center;font-family:Inter,sans-serif;font-size:12.5px;font-weight:800;color:#0F172A;line-height:1.22;'&gt;Evaluate Required&lt;br/&gt;Resources&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="311" y="384" width="143" height="50" as="geometry"/></mxCell>

      <mxCell id="n63_ext" value="&lt;div style='padding:6px;text-align:center;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.22;'&gt;Are external tools&lt;br/&gt;or APIs needed?&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="320" y="456" width="125" height="48" as="geometry"/></mxCell>

      <mxCell id="p63_no2" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#E05A2B;strokeColor=#E05A2B;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="258" y="469" width="29" height="21" as="geometry"/></mxCell>
      <mxCell id="p63_yes2" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#289448;strokeColor=#289448;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="475" y="469" width="33" height="21" as="geometry"/></mxCell>

      <mxCell id="n63_dir" value="&lt;div style='padding:8px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:12.5px;font-weight:800;color:#0F172A;'&gt;Direct Execution&lt;/div&gt;&lt;div style='font-size:10px;color:#334155;margin-top:3px;line-height:1.22;'&gt;Process internally using&lt;br/&gt;standard reasoning&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="200" y="514" width="144" height="62" as="geometry"/></mxCell>

      <mxCell id="n63_perm" value="&lt;div style='padding:6px;text-align:center;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.22;'&gt;Are permissions&lt;br/&gt;and access valid?&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="428" y="512" width="128" height="48" as="geometry"/></mxCell>

      <mxCell id="p63_no3" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#E05A2B;strokeColor=#E05A2B;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="562" y="525" width="29" height="21" as="geometry"/></mxCell>
      <mxCell id="p63_yes3" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#289448;strokeColor=#289448;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="475" y="564" width="33" height="21" as="geometry"/></mxCell>

      <mxCell id="n63_esc" value="${cleanSvg(`<div style="padding:8px;text-align:center;font-family:Inter,sans-serif;">
        <svg width="16" height="18" viewBox="0 0 18 20" style="display:inline-block;margin-bottom:2px;"><rect x="3" y="9" width="12" height="9" rx="2" fill="none" stroke="#475569" stroke-width="1.6"/><path d="M6 9 V6 A3 3 0 0 1 12 6 V9" fill="none" stroke="#475569" stroke-width="1.6"/></svg>
        <div style="font-size:12px;font-weight:800;color:#0F172A;line-height:1.18;">Escalate /<br/>Request Access</div>
        <div style="font-size:9.8px;color:#334155;margin-top:3px;line-height:1.2;">User approval or<br/>graceful fallback</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="604" y="486" width="122" height="98" as="geometry"/></mxCell>

      <mxCell id="n63_inv" value="&lt;div style='padding:8px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:12.5px;font-weight:800;color:#0F172A;'&gt;Invoke Tools&lt;/div&gt;&lt;div style='font-size:10px;color:#334155;margin-top:3px;line-height:1.22;'&gt;Call APIs, databases,&lt;br/&gt;or sandboxed skills&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="424" y="598" width="134" height="60" as="geometry"/></mxCell>

      <!-- Band 03 Cards -->
      <mxCell id="n63_exec" value="&lt;div style='padding:6px;text-align:center;font-family:Inter,sans-serif;font-size:12.5px;font-weight:800;color:#0F172A;line-height:1.22;'&gt;Execute Task &amp;amp;&lt;br/&gt;Generate Output&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="310" y="696" width="145" height="50" as="geometry"/></mxCell>

      <mxCell id="n63_val" value="&lt;div style='padding:6px;text-align:center;font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:#0F172A;line-height:1.22;'&gt;Does outcome&lt;br/&gt;pass validation?&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="318" y="772" width="129" height="48" as="geometry"/></mxCell>

      <mxCell id="p63_no4" value="NO" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#E05A2B;strokeColor=#E05A2B;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="279" y="785" width="29" height="21" as="geometry"/></mxCell>
      <mxCell id="p63_yes4" value="YES" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#289448;strokeColor=#289448;fontColor=#FFFFFF;fontStyle=1;fontSize=10;" vertex="1" parent="1"><mxGeometry x="366" y="830" width="33" height="21" as="geometry"/></mxCell>

      <mxCell id="n63_loop" value="${cleanSvg(`<div style="padding:8px;text-align:center;font-family:Inter,sans-serif;">
        <svg width="18" height="18" viewBox="0 0 20 20" style="display:inline-block;margin-bottom:2px;"><path d="M16 10 A6 6 0 1 1 13 4.8" fill="none" stroke="#475569" stroke-width="1.6" stroke-linecap="round"/><polyline points="12,2.5 14,5 11.5,6.5" fill="none" stroke="#475569" stroke-width="1.5"/><polyline points="7.5,10 9.5,12 13,8" fill="none" stroke="#475569" stroke-width="1.5"/></svg>
        <div style="font-size:12px;font-weight:800;color:#0F172A;">Self-Correction Loop</div>
        <div style="font-size:10px;color:#334155;margin-top:2px;line-height:1.2;">Analyze failure, retry<br/>up to limit</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="112" y="746" width="152" height="78" as="geometry"/></mxCell>

      <mxCell id="n63_err" value="&lt;div style='padding:5px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:11.5px;font-weight:800;color:#0F172A;'&gt;Error Escalation&lt;/div&gt;&lt;div style='font-size:9.8px;color:#334155;'&gt;If exhausted&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="112" y="844" width="152" height="42" as="geometry"/></mxCell>

      <mxCell id="n63_fin" value="&lt;div style='padding:8px;text-align:center;font-family:Inter,sans-serif;'&gt;&lt;div style='font-size:12.5px;font-weight:800;color:#0F172A;'&gt;Deliver Final Result&lt;/div&gt;&lt;div style='font-size:10px;color:#334155;margin-top:3px;line-height:1.22;'&gt;Complete objective and&lt;br/&gt;return outcome&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#B8C4D0;strokeWidth=1.4;shadow=1;" vertex="1" parent="1"><mxGeometry x="310" y="868" width="145" height="62" as="geometry"/></mxCell>

      <mxCell id="ftr63" value="DECISION TREE FLOWCHART • SYSTEM LOGIC &amp; BRANCHING FRAMEWORK • REVISION 1.4 • 09/2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;fontColor=#FFFFFF;fontStyle=0;fontSize=11.5;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="0" y="978" width="765" height="46" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 13. #64: FEATURE MATRIX GRID (Exact 1:1 Vector Twin of 64.png on 765x1024)
  // ============================================================================
  if (id === '64' && !items) {
    const hTitle = esc(cleanCustomTitle || 'Feature Matrix Grid');
    const bgSvg64 = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g64s" width="19.125" height="19.125" patternUnits="userSpaceOnUse">
          <path d="M 19.125 0 L 0 0 0 19.125" fill="none" stroke="#E5ECF3" stroke-width="0.7"/>
        </pattern>
        <pattern id="g64l" width="76.5" height="76.5" patternUnits="userSpaceOnUse">
          <rect width="76.5" height="76.5" fill="url(#g64s)"/>
          <path d="M 76.5 0 L 0 0 0 76.5" fill="none" stroke="#D8E2ED" stroke-width="1.1"/>
        </pattern>
      </defs>
      <rect width="765" height="1024" fill="#F8FAFC"/>
      <rect width="765" height="1024" fill="url(#g64l)"/>
      <!-- Vertical Divider after Architectural Criteria column -->
      <line x1="168" y1="176" x2="168" y2="914" stroke="#64748B" stroke-width="1.2"/>
      <!-- Horizontal Row Dividers -->
      <line x1="26" y1="226" x2="739" y2="226" stroke="#334155" stroke-width="1.3"/>
      <line x1="26" y1="344" x2="739" y2="344" stroke="#94A3B8" stroke-width="1.1"/>
      <line x1="26" y1="462" x2="739" y2="462" stroke="#94A3B8" stroke-width="1.1"/>
      <line x1="26" y1="580" x2="739" y2="580" stroke="#94A3B8" stroke-width="1.1"/>
      <line x1="26" y1="698" x2="739" y2="698" stroke="#94A3B8" stroke-width="1.1"/>
      <line x1="26" y1="816" x2="739" y2="816" stroke="#475569" stroke-width="1.3"/>
    </svg>`);

    const rows = [
      {
        crit: 'Data Persistence', sub: '(System state, DB<br/>connectors,<br/>checkpointers)',
        cols: [
          { pill: '✓ NATIVE', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Checkpoint DB<br/>integrations', s: 'Restarts &amp; time-travel' },
          { pill: '✓ BUILT-IN', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Bundled SQLite<br/>adapter', s: 'Ready-to-use persistence' },
          { pill: '✓ DISTRIBUTED', pBg: '#8CE99A', pCol: '#0B2E13', t: 'State sync across<br/>nodes', s: 'Fault-tolerant backups' },
          { pill: '✕ EXTERNAL', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Needs custom<br/>pipeline', s: 'No default state manager' }
        ]
      },
      {
        crit: 'System Isolation', sub: '(Secure execution<br/>boundaries &amp;<br/>sandboxing)',
        cols: [
          { pill: '✕ MANUAL', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'VPC &amp; container<br/>setup', s: 'Required user config' },
          { pill: '✕ LIMITED', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Host OS<br/>dependency', s: 'OS-level execution only' },
          { pill: '✓ SECURE', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Docker / microVMs', s: 'Isolated runtime<br/>environments' },
          { pill: '✕ NONE', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Raw unconstrained<br/>access', s: 'Executes on localhost' }
        ]
      },
      {
        crit: 'Human<br/>Intervention', sub: '(User interaction &amp;<br/>approval breakpoints)',
        cols: [
          { pill: '✓ NATIVE', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Interrupts &amp;<br/>approvals', s: 'Flexible validation loop' },
          { pill: '✓ SUPPORTED', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Simple breakpoint<br/>hooks', s: 'Basic pause checkpoints' },
          { pill: '✓ INTEGRATED', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Feedback loop<br/>workflows', s: 'Structured intervention' },
          { pill: '✕ LIMITED', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Hardcoded manual<br/>scripts', s: 'Fragile UX integrations' }
        ]
      },
      {
        crit: 'Session Memory', sub: '(Retrieval-augmented,<br/>stateful memory)',
        cols: [
          { pill: '✓ NATIVE', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Long &amp; short-term<br/>DB', s: 'Flexible cognitive memory' },
          { pill: '✓ BUILT-IN', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Standard context<br/>cache', s: 'Basic memory buffers' },
          { pill: '✓ DISTRIBUTED', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Cluster semantic<br/>store', s: 'Shared memory pools' },
          { pill: '✕ VOLATILE', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Runtime RAM<br/>memory', s: 'Lost upon termination' }
        ]
      },
      {
        crit: 'Orchestration<br/>Scale', sub: '(Multi-process task<br/>concurrency)',
        cols: [
          { pill: '✓ SCALABLE', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Flexible process<br/>mesh', s: 'Multi-thread execution' },
          { pill: '✕ MODERATE', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Sequential process<br/>focus', s: 'Single-thread execution' },
          { pill: '✓ ADVANCED', pBg: '#8CE99A', pCol: '#0B2E13', t: 'Dynamic peer<br/>delegation', s: 'Infinite async workflows' },
          { pill: '✕ BASIC', pBg: '#F88D8D', pCol: '#3B0A0A', t: 'Single-loop<br/>execution', s: 'Simple inline tasks' }
        ]
      }
    ];

    let gXml = '';
    rows.forEach((r, ri) => {
      const y = 228 + ri * 118;
      gXml += `<mxCell id="c64_lbl_${ri}" value="${cleanSvg(`<div style="padding:4px;text-align:center;font-family:Inter,sans-serif;">
        <div style="font-size:13.5px;font-weight:800;color:#0F172A;line-height:1.2;">${r.crit}</div>
        <div style="font-size:10.5px;color:#334155;margin-top:3px;line-height:1.22;">${r.sub}</div>
      </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="26" y="${y}" width="140" height="114" as="geometry"/></mxCell>`;

      r.cols.forEach((c, ci) => {
        const x = 170 + ci * 142;
        gXml += `<mxCell id="c64_${ri}_${ci}" value="${cleanSvg(`<div style="padding:4px;text-align:center;font-family:Inter,sans-serif;">
          <div style="display:inline-block;background:${c.pBg};color:${c.pCol};padding:3px 11px;border-radius:999px;font-size:10.5px;font-weight:800;letter-spacing:0.2px;">${c.pill}</div>
          <div style="font-size:12.2px;font-weight:800;color:#0F172A;margin-top:6px;line-height:1.18;">${c.t}</div>
          <div style="font-size:10px;color:#334155;margin-top:4px;line-height:1.18;">${c.s}</div>
        </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="140" height="114" as="geometry"/></mxCell>`;
      });
    });

    const scores = [
      { sc: 'Score: 4.2 / 5', sub: 'Best for Custom<br/>Workflows' },
      { sc: 'Score: 3.8 / 5', sub: 'Best for Out-of-the-<br/>Box Setup' },
      { sc: 'Score: 4.8 / 5', sub: 'Best for Scaled<br/>Operations' },
      { sc: 'Score: 2.2 / 5', sub: 'Best for Local<br/>Prototypes' }
    ];
    scores.forEach((s, ci) => {
      const x = 170 + ci * 142;
      gXml += `<mxCell id="sc64_${ci}" value="${cleanSvg(`<div style="padding:4px;text-align:center;font-family:Inter,sans-serif;">
        <div style="display:inline-block;background:#1D3557;color:#FFFFFF;padding:5px 14px;border-radius:999px;font-size:13px;font-weight:800;">${s.sc}</div>
        <div style="font-size:11.5px;font-weight:800;color:#0F172A;margin-top:6px;line-height:1.2;">${s.sub}</div>
      </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${x}" y="820" width="140" height="92" as="geometry"/></mxCell>`;
    });

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_64_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#F8FAFC"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bgSvg64}" style="text;html=1;align=center;verticalAlign=middle; spacing=0;spacingTop=0;spacingBottom=0;spacingLeft=0;spacingRight=0;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <mxCell id="hdr64" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;">
        <div style="font-size:54px;font-weight:900;color:#0B132B;letter-spacing:-0.8px;">${hTitle}</div>
        <div style="font-size:20px;color:#475569;margin-top:6px;font-weight:500;">Multi-criteria evaluation and capability scoring</div>
      </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="26" y="42" width="713" height="105" as="geometry"/></mxCell>

      <mxCell id="th64_0" value="ARCHITECTURAL&lt;br/&gt;CRITERIA" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=12.5;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="26" y="172" width="140" height="50" as="geometry"/></mxCell>
      <mxCell id="th64_1" value="&lt;b style='font-size:12.5px;color:#0F172A;'&gt;FRAMEWORK&lt;br/&gt;ALPHA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;(Modular &amp;amp; Extensible)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="170" y="168" width="140" height="54" as="geometry"/></mxCell>
      <mxCell id="th64_2" value="&lt;b style='font-size:12.5px;color:#0F172A;'&gt;FRAMEWORK&lt;br/&gt;BETA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;(Monolithic &amp;amp; Built-in)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="312" y="168" width="140" height="54" as="geometry"/></mxCell>
      <mxCell id="th64_3" value="&lt;b style='font-size:12.5px;color:#0F172A;'&gt;FRAMEWORK&lt;br/&gt;GAMMA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;(Distributed &amp;amp; Mesh)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="454" y="168" width="140" height="54" as="geometry"/></mxCell>
      <mxCell id="th64_4" value="&lt;b style='font-size:12.5px;color:#0F172A;'&gt;FRAMEWORK&lt;br/&gt;DELTA&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10.5px;color:#334155;'&gt;(Lightweight &amp;amp; Minimal)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="596" y="168" width="140" height="54" as="geometry"/></mxCell>

      <mxCell id="sc64_lbl" value="OVERALL&lt;br/&gt;SCORE &amp;amp; FIT" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=14;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="26" y="832" width="140" height="65" as="geometry"/></mxCell>
      ${gXml}

      <mxCell id="ev64" value="${cleanSvg(`<div style="padding:12px 18px;text-align:left;font-family:Inter,sans-serif;font-size:15px;line-height:1.38;color:#0F172A;"><b>EVALUATION:</b> Modular &amp; distributed options excel in state management, whereas <b>isolated sandboxing requires specific</b> sandbox/VPC container support.</div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#EEF2F6;strokeColor=#94A3B8;strokeWidth=1.4;" vertex="1" parent="1"><mxGeometry x="26" y="928" width="713" height="66" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 14. #65: AI CAPABILITY PYRAMID (Exact 1:1 Vector Twin of 65.png on 765x1024)
  // ============================================================================
  if (id === '65' && !items) {
    const hTitle = esc(cleanCustomTitle || 'AI Capability Pyramid');
    const bgSvg65 = cleanSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="g65s" width="19.125" height="19.125" patternUnits="userSpaceOnUse">
          <path d="M 19.125 0 L 0 0 0 19.125" fill="none" stroke="#EDE8DC" stroke-width="0.65"/>
        </pattern>
        <pattern id="g65l" width="76.5" height="76.5" patternUnits="userSpaceOnUse">
          <rect width="76.5" height="76.5" fill="url(#g65s)"/>
          <path d="M 76.5 0 L 0 0 0 76.5" fill="none" stroke="#E2DBCC" stroke-width="1.05"/>
        </pattern>
        <linearGradient id="pyr4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#A3E8BC"/>
          <stop offset="100%" stop-color="#69C58B"/>
        </linearGradient>
        <linearGradient id="pyr3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FCE28B"/>
          <stop offset="100%" stop-color="#F6B81D"/>
        </linearGradient>
        <linearGradient id="pyr2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F18E7B"/>
          <stop offset="100%" stop-color="#E44D32"/>
        </linearGradient>
        <linearGradient id="pyr1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#76A9FA"/>
          <stop offset="100%" stop-color="#3575E6"/>
        </linearGradient>
      </defs>
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#g65l)"/>

      <!-- Left Upward Axis Arrow -->
      <line x1="48" y1="885" x2="48" y2="245" stroke="#475569" stroke-width="3.5"/>
      <polygon points="48,230 39,248 57,248" fill="#1E293B"/>
      <text x="34" y="555" transform="rotate(-90 34 555)" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="800" fill="#1E293B" letter-spacing="0.4">RISING COMPLEXITY &amp; VALUE</text>

      <!-- Right Downward Axis Arrow -->
      <line x1="717" y1="230" x2="717" y2="835" stroke="#475569" stroke-width="3.5"/>
      <polygon points="717,850 708,832 726,832" fill="#1E293B"/>
      <text x="733" y="540" transform="rotate(90 733 540)" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="800" fill="#1E293B" letter-spacing="0.4">DECREASING HUMAN INTERVENTION</text>

      <!-- 4-Tier Center Pyramid Polygons -->
      <!-- Tier 04 Triangle -->
      <polygon points="382.5,228 299,384 466,384" fill="url(#pyr4)" stroke="#1E293B" stroke-width="1.4"/>
      <!-- Tier 03 Trapezoid -->
      <polygon points="294,392 471,392 558,558 207,558" fill="url(#pyr3)" stroke="#1E293B" stroke-width="1.4"/>
      <!-- Tier 02 Trapezoid -->
      <polygon points="202,566 563,566 648,736 117,736" fill="url(#pyr2)" stroke="#1E293B" stroke-width="1.4"/>
      <!-- Tier 01 Base Trapezoid -->
      <polygon points="112,744 653,744 733,914 32,914" fill="url(#pyr1)" stroke="#1E293B" stroke-width="1.4"/>

      <!-- Dotted Horizontal Connector Lines -->
      <line x1="284" y1="292" x2="346" y2="292" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>
      <line x1="406" y1="302" x2="500" y2="302" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>

      <line x1="284" y1="464" x2="358" y2="464" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>
      <line x1="406" y1="464" x2="508" y2="464" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>

      <line x1="284" y1="640" x2="358" y2="640" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>
      <line x1="406" y1="640" x2="520" y2="640" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>

      <line x1="284" y1="825" x2="358" y2="825" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>
      <line x1="406" y1="825" x2="530" y2="825" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5 3.5"/>

      <!-- Pyramid Center Number Circles & Labels -->
      <circle cx="382.5" cy="302" r="21" fill="#A3E8BC" stroke="#1E293B" stroke-width="1.3"/>
      <circle cx="382.5" cy="302" r="18" fill="none" stroke="#1E293B" stroke-width="1.1"/>
      <text x="382.5" y="308" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">04</text>
      <text x="382.5" y="352" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">AUTONOMOUS</text>
      <text x="382.5" y="370" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">AGENTS</text>

      <circle cx="382.5" cy="464" r="21" fill="#FCE28B" stroke="#1E293B" stroke-width="1.3"/>
      <circle cx="382.5" cy="464" r="18" fill="none" stroke="#1E293B" stroke-width="1.1"/>
      <text x="382.5" y="470" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">03</text>
      <text x="382.5" y="516" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">MULTI-AGENT</text>
      <text x="382.5" y="534" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">COLLABORATION</text>

      <circle cx="382.5" cy="640" r="21" fill="#E44D32" stroke="#FFFFFF" stroke-width="1.5"/>
      <circle cx="382.5" cy="640" r="18" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
      <text x="382.5" y="646" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">02</text>
      <text x="382.5" y="692" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">TOOL CALLING</text>
      <text x="382.5" y="710" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#0F172A">&amp; WORKFLOWS</text>

      <circle cx="382.5" cy="825" r="21" fill="#3575E6" stroke="#FFFFFF" stroke-width="1.5"/>
      <circle cx="382.5" cy="825" r="18" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
      <text x="382.5" y="831" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">01</text>
    </svg>`);

    return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_65_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="poster_bg" value="${bgSvg65}" style="text;html=1;align=center;verticalAlign=middle; spacing=0;spacingTop=0;spacingBottom=0;spacingLeft=0;spacingRight=0;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

      <mxCell id="hdr65" value="${cleanSvg(`<div style="text-align:center;font-family:Inter,sans-serif;">
        <div style="font-size:52px;font-weight:900;color:#0B132B;letter-spacing:-0.8px;">${hTitle}</div>
        <div style="font-size:20px;color:#1E293B;margin-top:8px;line-height:1.28;font-weight:400;">The evolution of Google Cloud agents from raw<br/>inference to fully autonomous systems</div>
        <div style="font-size:15px;font-weight:800;color:#0F172A;margin-top:16px;">TIERS</div>
      </div>`)}" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="50" y="42" width="665" height="175" as="geometry"/></mxCell>

      <!-- Left Cards (04 .. 01) -->
      <mxCell id="l65_4" value="${cleanSvg(`<div style="padding:10px 10px;text-align:left;font-family:Inter,sans-serif;width:182px;box-sizing:border-box;">
        <div style="font-size:11.5px;font-weight:900;color:#0F172A;white-space:nowrap;">04 | AUTONOMOUS AGENT</div>
        <div style="display:inline-block;background:#8AD9A4;color:#0F172A;padding:2px 8px;border-radius:8px;font-size:9px;font-weight:800;margin-top:4px;">GOAL-DRIVEN</div>
        <div style="font-size:9.8px;color:#1E293B;margin-top:6px;line-height:1.25;">Operates on open-ended objectives, self-evaluates success, and automatically resolves errors.</div>
        <div style="font-size:9.5px;color:#0F172A;margin-top:6px;line-height:1.28;font-weight:500;">• Self-healing validation loops<br/>• Continuous 24/7 self-directed task resolution<br/>• Long-horizon goal planning</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="82" y="214" width="202" height="158" as="geometry"/></mxCell>

      <mxCell id="l65_3" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:178px;box-sizing:border-box;">
        <div style="font-size:12px;font-weight:900;color:#0F172A;line-height:1.15;">03 | MULTI-AGENT<br/>COLLABORATION</div>
        <div style="display:inline-block;background:#F9D76B;color:#0F172A;padding:2px 8px;border-radius:8px;font-size:9px;font-weight:800;margin-top:4px;">COOPERATIVE</div>
        <div style="font-size:9.8px;color:#1E293B;margin-top:5px;line-height:1.24;">Orchestrating specialized teams passing tasks, debating solutions, and managing shared context.</div>
        <div style="font-size:9.5px;color:#0F172A;margin-top:5px;line-height:1.28;font-weight:500;">• Manager-worker dynamic routing<br/>• Shared state persistence &amp; memory<br/>• Agent2Agent (A2A) handoffs</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="82" y="388" width="202" height="160" as="geometry"/></mxCell>

      <mxCell id="l65_2" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:178px;box-sizing:border-box;">
        <div style="font-size:12px;font-weight:900;color:#0F172A;">02 | TOOL CALLING</div>
        <div style="display:inline-block;background:#EB644C;color:#FFFFFF;padding:2px 8px;border-radius:8px;font-size:9px;font-weight:800;margin-top:4px;">INTERACTIVE</div>
        <div style="font-size:9.8px;color:#1E293B;margin-top:5px;line-height:1.24;">Models interact natively with environments, executing code, using APIs, and navigating databases.</div>
        <div style="font-size:9.5px;color:#0F172A;margin-top:5px;line-height:1.28;font-weight:500;">• API integrations &amp; Skill Plugins<br/>• Computer-use &amp; sandboxed runtimes (GKE)<br/>• Model Context Protocol (MCP)</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="82" y="568" width="202" height="160" as="geometry"/></mxCell>

      <mxCell id="l65_1" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:178px;box-sizing:border-box;">
        <div style="font-size:12px;font-weight:900;color:#0F172A;">01 | BASE GEMINI</div>
        <div style="display:inline-block;background:#4E8DF5;color:#FFFFFF;padding:2px 8px;border-radius:8px;font-size:9px;font-weight:800;margin-top:4px;">RAW INFERENCE</div>
        <div style="font-size:9.8px;color:#1E293B;margin-top:5px;line-height:1.24;">Standard foundation model reasoning based entirely on input prompts, text generation, and in-context data.</div>
        <div style="font-size:9.5px;color:#0F172A;margin-top:5px;line-height:1.28;font-weight:500;">• Chain-of-thought (CoT) planning<br/>• Natural language understanding<br/>• Few-shot prompting</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=8;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="82" y="750" width="202" height="154" as="geometry"/></mxCell>

      <!-- Right Capabilities Cards + Overlapping Top-Right Icon Badges -->
      <mxCell id="r65_4" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:158px;box-sizing:border-box;">
        <div style="font-size:11.5px;font-weight:800;color:#0F172A;">Capabilities:</div>
        <div style="font-size:9.6px;color:#0F172A;margin-top:4px;line-height:1.32;font-weight:500;">• Gemini Enterprise Agent Platform<br/>• Agent Engine<br/>• Autonomously schedules, executes, and heals</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="500" y="256" width="182" height="92" as="geometry"/></mxCell>
      <mxCell id="ic65_4" value="${cleanSvg(`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M18 6 C23 6 26 9 26 14 C22 18 18 21 14 22 L10 18 C11 14 14 10 18 6 Z" fill="#60A5FA" stroke="#1E293B" stroke-width="1.5"/><circle cx="19" cy="13" r="2.2" fill="#FEF08A" stroke="#1E293B" stroke-width="1.2"/><path d="M9 19 L6 25 L13 23" fill="#F97316" stroke="#1E293B" stroke-width="1.2"/></svg>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#D1F2D9;strokeColor=#1E293B;strokeWidth=1.3;" vertex="1" parent="1"><mxGeometry x="648" y="230" width="52" height="48" as="geometry"/></mxCell>

      <mxCell id="r65_3" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:150px;box-sizing:border-box;">
        <div style="font-size:11.5px;font-weight:800;color:#0F172A;">Capabilities:</div>
        <div style="font-size:9.6px;color:#0F172A;margin-top:4px;line-height:1.32;font-weight:500;">• Multi-agent frameworks (LangGraph, CrewAI, AutoGen)<br/>• Collaborative routing<br/>• Agent communication protocols</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="508" y="420" width="174" height="102" as="geometry"/></mxCell>
      <mxCell id="ic65_3" value="${cleanSvg(`<svg width="32" height="32" viewBox="0 0 32 32"><ellipse cx="13" cy="9" rx="7" ry="3" fill="#93C5FD" stroke="#1E293B" stroke-width="1.4"/><path d="M6 9 V21 C6 22.8 9 24 13 24 C17 24 20 22.8 20 21 V9" fill="#60A5FA" stroke="#1E293B" stroke-width="1.4"/><circle cx="22" cy="21" r="4.5" fill="#CBD5E1" stroke="#1E293B" stroke-width="1.4"/></svg>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#FEF0C7;strokeColor=#1E293B;strokeWidth=1.3;" vertex="1" parent="1"><mxGeometry x="648" y="396" width="52" height="48" as="geometry"/></mxCell>

      <mxCell id="r65_2" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:138px;box-sizing:border-box;">
        <div style="font-size:11.5px;font-weight:800;color:#0F172A;">Capabilities:</div>
        <div style="font-size:9.6px;color:#0F172A;margin-top:4px;line-height:1.32;font-weight:500;">• Dynamic function calling<br/>• Sandboxed execution (microVMs)<br/>• DB &amp; web search (Vertex AI Search)</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="520" y="594" width="162" height="100" as="geometry"/></mxCell>
      <mxCell id="ic65_2" value="${cleanSvg(`<svg width="34" height="32" viewBox="0 0 34 32"><rect x="4" y="6" width="22" height="16" rx="2.5" fill="#E0F2FE" stroke="#1E293B" stroke-width="1.4"/><line x1="4" y1="10" x2="26" y2="10" stroke="#1E293B" stroke-width="1.2"/><text x="15" y="18" text-anchor="middle" font-family="Inter,sans-serif" font-size="6.5" font-weight="900" fill="#0F172A">APIs</text><circle cx="25" cy="22" r="4.5" fill="#94A3B8" stroke="#1E293B" stroke-width="1.3"/></svg>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#FADBD4;strokeColor=#1E293B;strokeWidth=1.3;" vertex="1" parent="1"><mxGeometry x="648" y="570" width="52" height="48" as="geometry"/></mxCell>

      <mxCell id="r65_1" value="${cleanSvg(`<div style="padding:10px 12px;text-align:left;font-family:Inter,sans-serif;width:128px;box-sizing:border-box;">
        <div style="font-size:11.5px;font-weight:800;color:#0F172A;">Capabilities:</div>
        <div style="font-size:9.6px;color:#0F172A;margin-top:4px;line-height:1.32;font-weight:500;">• Gemini foundation models<br/>• Real-time reasoning<br/>• Model evaluation<br/>• Standard multi-modal processing</div>
      </div>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FAF8F2;strokeColor=#1E293B;strokeWidth=1.3;shadow=1;" vertex="1" parent="1"><mxGeometry x="530" y="766" width="152" height="106" as="geometry"/></mxCell>
      <mxCell id="ic65_1" value="${cleanSvg(`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="12" cy="18" r="6" fill="#60A5FA" stroke="#1E293B" stroke-width="1.5"/><circle cx="12" cy="18" r="2.2" fill="#E0F2FE" stroke="#1E293B" stroke-width="1.2"/><circle cx="21" cy="11" r="4.5" fill="#93C5FD" stroke="#1E293B" stroke-width="1.4"/></svg>`)}" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#D8E6FC;strokeColor=#1E293B;strokeWidth=1.3;" vertex="1" parent="1"><mxGeometry x="648" y="742" width="52" height="48" as="geometry"/></mxCell>

      <mxCell id="ftr65" value="${cleanSvg(`<div style="display:flex;align-items:center;justify-content:center;gap:14px;width:740px;font-family:Inter,sans-serif;color:#FFFFFF;font-size:11.5px;font-weight:800;letter-spacing:0.4px;">
        <span>GOOGLE CLOUD AGENT ARCHITECTURE GUIDE • VERTEX AI AGENT PATTERNS • GCP 2026</span>
        <svg width="24" height="18" viewBox="0 0 24 18"><path d="M6 14 H18 A4 4 0 0 0 19 6.5 A5.5 5.5 0 0 0 8.5 5 A4.5 4.5 0 0 0 6 14 Z" fill="none" stroke="#EA4335" stroke-width="2.2"/><path d="M12 4.5 A5.5 5.5 0 0 1 19 6.5" fill="none" stroke="#4285F4" stroke-width="2.2"/><path d="M18 14 H6" fill="none" stroke="#34A853" stroke-width="2.2"/><path d="M6 14 A4.5 4.5 0 0 1 6 6" fill="none" stroke="#FBBC05" stroke-width="2.2"/></svg>
      </div>`)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B132B;strokeColor=#0B132B;" vertex="1" parent="1"><mxGeometry x="0" y="976" width="765" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // ============================================================================
  // 15. #66: LOOP & CYCLE DIAGRAM (Exact 1:1 Vector Twin of 66.png on 765x1024)
  // ============================================================================
  const hTitle = esc(cleanCustomTitle || 'Loop & Cycle Diagram');

  const bgAndRingSvg66 = `<svg xmlns="http://www.w3.org/2000/svg" width="765" height="1024" viewBox="0 0 765 1024" style="display:block;">
      <defs>
        <pattern id="minorGrid66" width="19.125" height="19.125" patternUnits="userSpaceOnUse">
          <path d="M 19.125 0 L 0 0 0 19.125" fill="none" stroke="#EAE4D7" stroke-width="0.7"/>
        </pattern>
        <pattern id="majorGrid66" width="76.5" height="76.5" patternUnits="userSpaceOnUse">
          <rect width="76.5" height="76.5" fill="url(#minorGrid66)"/>
          <path d="M 76.5 0 L 0 0 0 76.5" fill="none" stroke="#DFD8C8" stroke-width="1.1"/>
        </pattern>
        <linearGradient id="torusTopLeft" gradientUnits="userSpaceOnUse" x1="170" y1="442" x2="382" y2="229">
          <stop offset="0%" stop-color="#D2EBD9"/>
          <stop offset="100%" stop-color="#C3E7D4"/>
        </linearGradient>
        <linearGradient id="torusTopRight" gradientUnits="userSpaceOnUse" x1="382" y1="229" x2="595" y2="442">
          <stop offset="0%" stop-color="#C3E7D4"/>
          <stop offset="50%" stop-color="#C1DBF7"/>
          <stop offset="100%" stop-color="#CEE0F6"/>
        </linearGradient>
        <linearGradient id="torusBotRight" gradientUnits="userSpaceOnUse" x1="595" y1="442" x2="382" y2="655">
          <stop offset="0%" stop-color="#CEE0F6"/>
          <stop offset="45%" stop-color="#D5EBD4"/>
          <stop offset="100%" stop-color="#F6D5C2"/>
        </linearGradient>
        <linearGradient id="torusBotLeft" gradientUnits="userSpaceOnUse" x1="382" y1="655" x2="170" y2="442">
          <stop offset="0%" stop-color="#F9CCBA"/>
          <stop offset="45%" stop-color="#FAD2C0"/>
          <stop offset="100%" stop-color="#D2EBD9"/>
        </linearGradient>
        <filter id="ringShadow66" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.10"/>
        </filter>
        <path id="arcOrchestrate66" d="M 308 205 A 242 242 0 0 1 458 205"/>
        <path id="arcExecute66" d="M 538 292 A 212 212 0 0 1 582 378"/>
        <path id="arcRetryText66" d="M 152 536 A 232 232 0 0 1 156 346"/>
      </defs>

      <!-- Base Cream Grid Paper -->
      <rect width="765" height="1024" fill="#FAF8F2"/>
      <rect width="765" height="1024" fill="url(#majorGrid66)"/>
      <!-- Soft Top & Bottom Readability Vignette -->
      <rect x="20" y="14" width="725" height="105" rx="16" fill="#FAF8F2" fill-opacity="0.68"/>
      <rect x="20" y="795" width="725" height="175" rx="16" fill="#FAF8F2" fill-opacity="0.72"/>

      <!-- 4-Quadrant Smooth Torus Ring (cx=382.5, cy=442, R_out=292, R_in=134, R_mid=213, strokeWidth=158) -->
      <g filter="url(#ringShadow66)">
        <!-- Top-Left Quadrant (180 deg to 270 deg) -->
        <path d="M 169.5 442 A 213 213 0 0 1 382.5 229" fill="none" stroke="url(#torusTopLeft)" stroke-width="158"/>
        <!-- Top-Right Quadrant (270 deg to 360 deg) -->
        <path d="M 382.5 229 A 213 213 0 0 1 595.5 442" fill="none" stroke="url(#torusTopRight)" stroke-width="158"/>
        <!-- Bottom-Right Quadrant (0 deg to 90 deg) -->
        <path d="M 595.5 442 A 213 213 0 0 1 382.5 655" fill="none" stroke="url(#torusBotRight)" stroke-width="158"/>
        <!-- Bottom-Left Quadrant (90 deg to 180 deg) -->
        <path d="M 382.5 655 A 213 213 0 0 1 169.5 442" fill="none" stroke="url(#torusBotLeft)" stroke-width="158"/>
      </g>

      <!-- Outer & Inner Torus Borders -->
      <circle cx="382.5" cy="442" r="292" fill="none" stroke="#8FA1B5" stroke-width="1.6"/>
      <circle cx="382.5" cy="442" r="134" fill="#FFFFFF" stroke="#8FA1B5" stroke-width="1.6"/>

      <!-- 1. TOP ARC ARROW: Orchestrate -->
      <path d="M 311 222 A 232 232 0 0 1 445 220" fill="none" stroke="#162B4C" stroke-width="4" stroke-linecap="round"/>
      <polygon points="456,223 440,211 443,228" fill="#162B4C"/>
      <text font-family="Inter, -apple-system, sans-serif" font-size="15.5" font-weight="600" fill="#0F2143" text-anchor="middle">
        <textPath href="#arcOrchestrate66" startOffset="50%">Orchestrate</textPath>
      </text>

      <!-- 2. RIGHT UPPER ARC ARROW: Execute -->
      <path d="M 559 286 A 226 226 0 0 1 601 371" fill="none" stroke="#3572E2" stroke-width="4" stroke-linecap="round"/>
      <polygon points="606,382 592,369 608,363" fill="#3572E2"/>
      <text font-family="Inter, -apple-system, sans-serif" font-size="15.5" font-weight="600" fill="#0F2143" text-anchor="middle">
        <textPath href="#arcExecute66" startOffset="52%">Execute</textPath>
      </text>

      <!-- 3. BOTTOM-RIGHT BIFURCATING GREEN ARROWS: PASS -->
      <path d="M 577 553 Q 545 604 494 636" fill="none" stroke="#329E4B" stroke-width="4" stroke-linecap="round"/>
      <polygon points="483,642 494,626 502,640" fill="#329E4B"/>
      <path d="M 577 553 Q 556 624 612 648" fill="none" stroke="#329E4B" stroke-width="4" stroke-linecap="round"/>
      <polygon points="624,651 606,654 612,639" fill="#329E4B"/>
      <text x="515" y="601" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#0F2143" text-anchor="middle">PASS</text>

      <!-- 4. BOTTOM ARC ARROW: FAIL -->
      <path d="M 477 648 Q 392 686 308 654" fill="none" stroke="#D9483B" stroke-width="4" stroke-linecap="round"/>
      <polygon points="296,649 314,647 308,663" fill="#D9483B"/>
      <text x="392" y="655" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#0F2143" text-anchor="middle">FAIL</text>

      <!-- 5. LEFT ARC ARROW: RETRY FEEDBACK PATH -->
      <path d="M 168 540 A 216 216 0 0 1 171 344" fill="none" stroke="#162B4C" stroke-width="4" stroke-linecap="round"/>
      <polygon points="175,333 162,346 178,351" fill="#162B4C"/>
      <text font-family="Inter, -apple-system, sans-serif" font-size="13.5" font-weight="800" fill="#0F2143" letter-spacing="0.4" text-anchor="middle">
        <textPath href="#arcRetryText66" startOffset="50%">RETRY FEEDBACK PATH</textPath>
      </text>
    </svg>`;

  const brandBadgeSvg66 = `<svg xmlns="http://www.w3.org/2000/svg" width="118" height="46" viewBox="0 0 118 46" style="display:block;">
      <rect x="1" y="1" width="116" height="44" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
      <path d="M34.5 11.5c-2.8 0-5.2 1.6-6.3 4l3.1 2.4c.6-1.4 1.8-2.4 3.2-2.4 1.6 0 3 1.1 3.4 2.6l3.3-1.9c-1.2-2.8-3.8-4.7-6.7-4.7z" fill="#EA4335"/>
      <path d="M28.2 15.5c-.8.8-1.5 1.9-1.7 3.2-.4 2.7 1.3 5.2 4 5.7l1.1-3.6c-1-.2-1.7-1.1-1.5-2.1.1-.5.4-1 .8-1.3l-2.7-1.9z" fill="#FBBC05"/>
      <path d="M37.9 18.1c.1.4.1.9 0 1.4-.2 1.2-1.2 2.1-2.5 2.1h-4.9v3.8h5c3.2 0 5.9-2.3 6.3-5.4.2-1.4-.1-2.7-.8-3.8l-3.1 1.9z" fill="#4285F4"/>
      <path d="M30.5 21.6h4.9v3.8h-4.9c-.6 0-1.2-.1-1.8-.3l1.8-3.5z" fill="#34A853"/>
      <text x="33" y="36" font-family="Inter,sans-serif" font-size="7.8" font-weight="600" fill="#475569" text-anchor="middle">Google Cloud</text>
      <text x="64" y="25" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="#475569" text-anchor="middle">&amp;</text>
      <g transform="translate(83, 8)" stroke="#4285F4" stroke-width="1.5" fill="none">
        <path d="M10 2 L2 15 L10 20 L18 15 Z" fill="#DBEAFE" fill-opacity="0.5"/>
        <line x1="10" y1="2" x2="10" y2="20"/>
        <circle cx="10" cy="2" r="1.5" fill="#4285F4"/>
        <circle cx="2" cy="15" r="1.5" fill="#4285F4"/>
        <circle cx="18" cy="15" r="1.5" fill="#4285F4"/>
        <circle cx="10" cy="20" r="1.5" fill="#4285F4"/>
      </g>
      <text x="93" y="36" font-family="Inter,sans-serif" font-size="7.8" font-weight="600" fill="#475569" text-anchor="middle">Vertex AI</text>
    </svg>`;

  const deployToggleSvg66 = `<svg xmlns="http://www.w3.org/2000/svg" width="126" height="28" viewBox="0 0 126 28" style="display:block;">
      <rect x="1" y="1" width="124" height="26" rx="13" fill="#41A656" stroke="#2D8640" stroke-width="1"/>
      <text x="35" y="18" font-family="Inter,sans-serif" font-size="11.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">DEPLOY</text>
      <rect x="68" y="3.5" width="54" height="21" rx="10.5" fill="#237032"/>
      <text x="86" y="17.5" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">ON</text>
      <circle cx="111" cy="14" r="8" fill="#FFFFFF"/>
    </svg>`;

  const retryToggleSvg66 = `<svg xmlns="http://www.w3.org/2000/svg" width="138" height="28" viewBox="0 0 138 28" style="display:block;">
      <rect x="1" y="1" width="136" height="26" rx="13" fill="#DE5445" stroke="#B83B2E" stroke-width="1"/>
      <text x="32" y="18" font-family="Inter,sans-serif" font-size="11.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">RETRY</text>
      <rect x="60" y="3.5" width="74" height="21" rx="10.5" fill="#9A2D23"/>
      <text x="88" y="17.5" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">ACTIVE</text>
      <circle cx="123" cy="14" r="8" fill="#FFFFFF"/>
    </svg>`;

  const refreshBadgeSvg66 = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" style="display:block;">
      <circle cx="25" cy="25" r="22" fill="#4682E8" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M 19 19 A 8 8 0 0 1 31 19" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="33,22 27,20 32,15" fill="#FFFFFF"/>
      <path d="M 31 31 A 8 8 0 0 1 19 31" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="17,28 23,30 18,35" fill="#FFFFFF"/>
    </svg>`;

  const rocketBadgeSvg66 = `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" style="display:block;">
      <circle cx="34" cy="34" r="32" fill="#FFFFFF"/>
      <circle cx="34" cy="34" r="29.5" fill="#FCECC9" stroke="#526277" stroke-width="2"/>
      <g transform="translate(34,34) rotate(45) translate(-16,-16)">
        <path d="M16 3 C21 8 22 15 22 21 L10 21 C10 15 11 8 16 3 Z" fill="#2A5CAA"/>
        <circle cx="16" cy="13" r="2.6" fill="#FCECC9"/>
        <path d="M10 17 L5 22 L10 21 Z" fill="#2A5CAA"/>
        <path d="M22 17 L27 22 L22 21 Z" fill="#2A5CAA"/>
        <path d="M13 22 L16 28 L19 22 Z" fill="#E67E22"/>
      </g>
    </svg>`;

  const iconSparkle66 = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:6px;"><path d="M11 2C11 7.5 15.5 12 21 12C15.5 12 11 16.5 11 22C11 16.5 6.5 12 1 12C6.5 12 11 7.5 11 2Z" fill="#7BA3D8" stroke="#476B9E" stroke-width="1"/><circle cx="19" cy="5" r="1.5" fill="#7BA3D8"/><circle cx="4" cy="19" r="1.3" fill="#7BA3D8"/></svg>`;
  const iconServer66 = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" style="vertical-align:middle;margin-right:6px;"><rect x="1" y="2" width="18" height="6" rx="1.5" fill="#4682E8"/><circle cx="4" cy="5" r="1" fill="#FFF"/><circle cx="7" cy="5" r="1" fill="#FFF"/><rect x="1" y="10" width="18" height="6" rx="1.5" fill="#4682E8"/><circle cx="4" cy="13" r="1" fill="#FFF"/><circle cx="7" cy="13" r="1" fill="#FFF"/><path d="M19 11 L25 13 L25 18 C25 21 19 23 19 23 C19 23 13 21 13 18 L13 13 Z" fill="#3B78E7" stroke="#FFF" stroke-width="1.2"/></svg>`;
  const iconShield66 = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" style="vertical-align:middle;margin-right:6px;"><path d="M11 1 L20 4.5 L20 11.5 C20 17.5 11 22.5 11 22.5 C11 22.5 2 17.5 2 11.5 L2 4.5 Z" fill="#4682E8"/><polyline points="7 12 10 15 15.5 9" fill="none" stroke="#FFFFFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const cleanSvg66 = (s: string) => esc(s.replace(/\r?\n\s*/g, ' ').replace(/>\s+</g, '><').trim());

  return `<mxfile host="embed.diagrams.net" modified="2026-09-27T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_66_${level}" name="${hTitle}"><mxGraphModel dx="765" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="765" pageHeight="1024" background="#FAF8F2"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
    <!-- Precision Vector Grid Paper + 4-Color Torus Ring + Curved Flow Arrows -->
    <mxCell id="poster_bg" value="${cleanSvg66(bgAndRingSvg66)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="765" height="1024" as="geometry"/></mxCell>

    <!-- Header & Dual Brand Card -->
    <mxCell id="hdr66" value="&lt;div style='text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:41px;font-weight:800;color:#0F2143;letter-spacing:-0.8px;line-height:1.1;'&gt;${hTitle}&lt;/div&gt;&lt;div style='font-size:18px;font-weight:400;color:#25406B;margin-top:6px;'&gt;The autonomous self-healing agent loop and evaluation cycle&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="38" y="26" width="570" height="86" as="geometry"/></mxCell>
    <mxCell id="brand66" value="${cleanSvg66(brandBadgeSvg66)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="612" y="28" width="118" height="46" as="geometry"/></mxCell>

    <!-- Center Torus Hub Text -->
    <mxCell id="ring66_in_lbl" value="&lt;div style='text-align:center;font-family:Inter,-apple-system,sans-serif;font-size:15.5px;font-weight:500;color:#7C8B9E;letter-spacing:0.6px;line-height:1.25;'&gt;AUTONOMOUS&lt;br/&gt;AGENT LOOP&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="292" y="410" width="180" height="60" as="geometry"/></mxCell>

    <!-- 01 | MODEL GENERATION (Top-Left) -->
    <mxCell id="c66_1" value="&lt;div style='padding:10px 14px;text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;border-bottom:1px solid #E2E8F0;padding-bottom:6px;display:flex;align-items:center;'&gt;${cleanSvg66(iconSparkle66)}01 | MODEL GENERATION&lt;/div&gt;&lt;div style='font-size:13.5px;color:#1E293B;margin-top:8px;line-height:1.32;'&gt;A &lt;b&gt;Google Gemini&lt;/b&gt; model&lt;br/&gt;generates candidate&lt;br/&gt;solutions, code, or tasks.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;shadow=1;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="39" y="168" width="263" height="118" as="geometry"/></mxCell>
    <mxCell id="b66_1" value="01" style="ellipse;whiteSpace=wrap;html=1;fillColor=#4682E8;strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="161" y="274" width="46" height="46" as="geometry"/></mxCell>

    <!-- 02 | SANDBOXED TEST (Top-Right) -->
    <mxCell id="c66_2" value="&lt;div style='padding:10px 14px;text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;border-bottom:1px solid #E2E8F0;padding-bottom:6px;display:flex;align-items:center;'&gt;${cleanSvg66(iconServer66)}02 | SANDBOXED TEST&lt;/div&gt;&lt;div style='font-size:13.5px;color:#1E293B;margin-top:8px;line-height:1.32;'&gt;The task is executed within&lt;br/&gt;an isolated, secure VPC&lt;br/&gt;Sandbox (GKE/gVisor).&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;shadow=1;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="464" y="168" width="263" height="118" as="geometry"/></mxCell>

    <!-- 03 | EVALUATION GATE (Middle-Right) -->
    <mxCell id="c66_3" value="&lt;div style='padding:12px 14px 10px 14px;text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;border-bottom:1px solid #E2E8F0;padding-bottom:6px;display:flex;align-items:center;'&gt;${cleanSvg66(iconShield66)}03 | EVALUATION GATE&lt;/div&gt;&lt;div style='font-size:13.5px;color:#1E293B;margin-top:8px;line-height:1.32;padding-left:24px;'&gt;Tests, constraints, and&lt;br/&gt;criteria are automatically&lt;br/&gt;checked.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;shadow=1;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="487" y="428" width="240" height="125" as="geometry"/></mxCell>
    <mxCell id="b66_3" value="03" style="ellipse;whiteSpace=wrap;html=1;fillColor=#4682E8;strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=17;" vertex="1" parent="1"><mxGeometry x="584" y="396" width="46" height="46" as="geometry"/></mxCell>

    <!-- Toggle Switches: DEPLOY ON & RETRY ACTIVE -->
    <mxCell id="pil66_dep" value="${cleanSvg66(deployToggleSvg66)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="597" y="580" width="126" height="28" as="geometry"/></mxCell>
    <mxCell id="pil66_ret" value="${cleanSvg66(retryToggleSvg66)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="322" y="682" width="138" height="28" as="geometry"/></mxCell>

    <!-- 04 | SELF-HEALING LOOP (Bottom-Left) -->
    <mxCell id="c66_4" value="&lt;div style='padding:12px 14px 10px 14px;text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:15px;font-weight:800;color:#0F172A;border-bottom:1px solid #E2E8F0;padding-bottom:6px;'&gt;04 | SELF-HEALING LOOP&lt;/div&gt;&lt;div style='font-size:13.5px;color:#1E293B;margin-top:8px;line-height:1.32;padding-left:28px;'&gt;Analyzes error and failure&lt;br/&gt;logs to formulate a new&lt;br/&gt;prompting and fix-it strategy.&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;shadow=1;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="39" y="585" width="253" height="118" as="geometry"/></mxCell>
    <mxCell id="b66_4" value="${cleanSvg66(refreshBadgeSvg66)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="150" y="550" width="50" height="50" as="geometry"/></mxCell>

    <!-- EXIT TO DEPLOY (Bottom-Right) + Rocket Circle Badge -->
    <mxCell id="c66_exit" value="&lt;div style='padding:26px 10px 8px 10px;text-align:center;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:15.5px;font-weight:800;color:#0F172A;'&gt;EXIT TO DEPLOY&lt;/div&gt;&lt;div style='font-size:12.5px;color:#1E293B;margin-top:4px;line-height:1.28;'&gt;Release final task outputs&lt;br/&gt;to users or systems safely&lt;br/&gt;(Google Cloud deployment)&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;shadow=1;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="531" y="678" width="197" height="112" as="geometry"/></mxCell>
    <mxCell id="b66_rocket" value="${cleanSvg66(rocketBadgeSvg66)}" style="text;html=1;align=left;verticalAlign=top;spacing=0;spacingTop=0;spacingLeft=0;fillColor=none;strokeColor=none;overflow=visible;" vertex="1" parent="1"><mxGeometry x="615" y="624" width="68" height="68" as="geometry"/></mxCell>

    <!-- Bottom Left: Continuous Safeguards -->
    <mxCell id="bot66_L" value="&lt;div style='text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:18.5px;font-weight:800;color:#0F172A;margin-bottom:10px;'&gt;Continuous Safeguards&lt;/div&gt;&lt;div style='font-size:12.8px;color:#0F172A;margin-bottom:9px;display:flex;align-items:center;'&gt;&lt;span style='display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#4682E8;color:#FFF;border-radius:999px;font-weight:800;font-size:12px;margin-right:8px;flex-shrink:0;'&gt;1&lt;/span&gt;&lt;span&gt;&lt;b&gt;Max Retry Limits&lt;/b&gt; to prevent runaway loops&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12.8px;color:#0F172A;margin-bottom:9px;display:flex;align-items:center;'&gt;&lt;span style='display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#4682E8;color:#FFF;border-radius:999px;font-weight:800;font-size:12px;margin-right:8px;flex-shrink:0;'&gt;2&lt;/span&gt;&lt;span&gt;&lt;b&gt;Secure Sandboxing&lt;/b&gt; via isolated containers&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12.8px;color:#0F172A;display:flex;align-items:center;'&gt;&lt;span style='display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#4682E8;color:#FFF;border-radius:999px;font-weight:800;font-size:12px;margin-right:8px;flex-shrink:0;'&gt;3&lt;/span&gt;&lt;span&gt;&lt;b&gt;Deterministic Validation&lt;/b&gt; against strict schemas&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="45" y="810" width="335" height="145" as="geometry"/></mxCell>

    <!-- Bottom Right: Key Artifacts -->
    <mxCell id="bot66_R" value="&lt;div style='text-align:left;font-family:Inter,-apple-system,sans-serif;'&gt;&lt;div style='font-size:18.5px;font-weight:800;color:#0F172A;margin-bottom:8px;'&gt;Key Artifacts&lt;/div&gt;&lt;div style='background:#EFEFEF;border:1px solid #B0B8C4;padding:3px 8px 3px 4px;border-radius:999px;font-size:11.2px;color:#0F172A;margin-bottom:7px;display:flex;align-items:center;white-space:nowrap;'&gt;&lt;span style='display:inline-block;width:19px;height:19px;line-height:19px;text-align:center;background:#738296;color:#FFF;border-radius:999px;font-weight:800;font-size:11px;margin-right:6px;flex-shrink:0;'&gt;1&lt;/span&gt;&lt;span&gt;&lt;b&gt;Failure &amp;amp; Error Logs:&lt;/b&gt; &amp;ldquo;Fed back into Gemini as context&amp;rdquo;&lt;/span&gt;&lt;/div&gt;&lt;div style='background:#EFEFEF;border:1px solid #B0B8C4;padding:3px 8px 3px 4px;border-radius:999px;font-size:11.2px;color:#0F172A;margin-bottom:7px;display:flex;align-items:center;white-space:nowrap;'&gt;&lt;span style='display:inline-block;width:19px;height:19px;line-height:19px;text-align:center;background:#738296;color:#FFF;border-radius:999px;font-weight:800;font-size:11px;margin-right:6px;flex-shrink:0;'&gt;2&lt;/span&gt;&lt;span&gt;&lt;b&gt;Target Constraints:&lt;/b&gt; &amp;ldquo;Clear metrics defining task success&amp;rdquo;&lt;/span&gt;&lt;/div&gt;&lt;div style='background:#EFEFEF;border:1px solid #B0B8C4;padding:3px 8px 3px 4px;border-radius:999px;font-size:11.2px;color:#0F172A;display:flex;align-items:center;white-space:nowrap;'&gt;&lt;span style='display:inline-block;width:19px;height:19px;line-height:19px;text-align:center;background:#738296;color:#FFF;border-radius:999px;font-weight:800;font-size:11px;margin-right:6px;flex-shrink:0;'&gt;3&lt;/span&gt;&lt;span&gt;&lt;b&gt;Human escalations:&lt;/b&gt; &amp;ldquo;Graceful handover if retries are exhausted&amp;rdquo;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="388" y="810" width="342" height="145" as="geometry"/></mxCell>

    <!-- Bottom Navy Footer Banner -->
    <mxCell id="ftr66" value="GOOGLE CLOUD • GEMINI • ENTERPRISE AGENT REFERENCE ARCHITECTURE • REVISION 2.4 • SEPTEMBER 2026" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#193B73;strokeColor=#193B73;fontColor=#FFFFFF;fontStyle=1;fontSize=10.5;letterSpacing=0.5;" vertex="1" parent="1"><mxGeometry x="0" y="990" width="765" height="34" as="geometry"/></mxCell>
  </root></mxGraphModel></diagram></mxfile>`;
}

function replaceCellValue(xml: string, cellId: string, newEscapedHtml: string): string {
  const pattern = new RegExp(`(<mxCell\\s+id="${cellId}"\\s+value=")([^"]*)(")`, 'i');
  if (!pattern.test(xml)) return xml;
  return xml.replace(pattern, `$1${newEscapedHtml}$3`);
}

function applyDynamicInfographicSpecToXml(
  xml: string,
  id: string,
  cleanCustomTitle?: string,
  spec?: DynamicInfographicSpec
): string {
  let out = xml;
  const effectiveTitle = spec?.title?.trim() || cleanCustomTitle;
  const effectiveSub = spec?.subtitle?.trim();

  if (effectiveTitle) {
    if (id === '53') {
      out = out.replace(
        "How to use &lt;span style='color:#EA7A47;'&gt;Claude Code&lt;/span&gt; + &lt;span style='color:#3B82F6;'&gt;Codex&lt;/span&gt;",
        esc(effectiveTitle)
      );
    } else if (id === '54') {
      out = out.replace(
        "GPT-6 Astra &lt;span style='color:#2D68FF;'&gt;Computer Use&lt;/span&gt;",
        esc(effectiveTitle)
      );
    } else if (id === '55') {
      out = out.replace(
        "The AI Nobody &lt;span style='color:#60A5FA;'&gt;Signed Off&lt;/span&gt;",
        esc(effectiveTitle)
      );
    }
  }

  if (effectiveSub) {
    const defaultSubtitles: Record<string, string> = {
      '53': 'Install the apps, add your tools, then check the result.',
      '54': 'Set it up on a Mac, then copy four prompts that do real work.',
      '55': 'Inside a company that thinks it has four tools',
      '56': 'Comparing stateless model inference with a fully managed, enterprise grade agent runtime',
      '57': 'Context compression and progressive token refinement on Google Cloud',
      '58': 'The step-by-step blueprint to deploy and run secure&lt;br/&gt;autonomous agent workloads on Google Cloud',
      '59': 'The phased, quarterly blueprint for enterprise-grade Agentic AI on Google Cloud',
      '60': '&lt;b&gt;Google Cloud enterprise&lt;/b&gt; agent topology and secure runtimes',
      '63': 'Conditional branching logic and decision paths',
      '64': 'Multi-criteria evaluation and capability scoring',
      '65': 'The evolution of Google Cloud agents from raw&lt;br/&gt;inference to fully autonomous systems',
      '66': 'The autonomous self-healing agent loop and evaluation cycle',
    };
    const targetSub = defaultSubtitles[id];
    if (targetSub && out.includes(targetSub)) {
      out = out.replace(targetSub, esc(effectiveSub));
    }
  }

  const takeawayText = spec?.takeaway?.trim() || spec?.footerText?.trim();
  if (takeawayText) {
    const takeawayCellIds = ['tk58', 'goal59', 'tk61', 'tk62', 'ev64'];
    for (const tkId of takeawayCellIds) {
      if (out.includes(`id="${tkId}"`)) {
        out = replaceCellValue(
          out,
          tkId,
          esc(`<div style="padding:10px 16px;text-align:left;font-family:Inter,sans-serif;font-size:13.5px;color:#0F172A;line-height:1.35;"><b>TAKEAWAY:</b> ${takeawayText}</div>`)
        );
      }
    }
  }

  const dynItems = spec?.items && spec.items.length > 0 ? spec.items : null;
  if (dynItems) {
    const cellSlotsByBlueprint: Record<string, string[]> = {
      '53': ['c53_codex', 'c53_proj', 'c53_claude', 'c53_files', 'c53_mcp', 'c53_cu', 'c53_adv', 'c53_fix'],
      '54': ['job54_1', 'job54_2', 'job54_3', 'job54_4', 's54_1', 's54_2', 's54_3', 's54_4'],
      '55': ['b55_0', 'b55_1', 'b55_2', 'b55_3', 'b55_4', 'b55_5', 'b55_6', 'b55_7'],
      '56': ['R56_0', 'R56_1', 'R56_2', 'R56_3', 'R56_4', 'R56_5'],
      '57': ['f57_0', 'f57_1', 'f57_2', 'f57_3'],
      '58': ['r58_0', 'r58_1', 'r58_2', 'r58_3', 'r58_4', 'r58_5'],
      '59': ['c59_0_1', 'c59_0_2', 'c59_1_1', 'c59_1_2', 'c59_2_1', 'c59_2_2', 'c59_3_1', 'c59_3_2'],
      '60': ['n60_1b', 'n60_2b', 'n60_3b', 'n60_4b'],
      '63': ['n63_rec', 'n63_eval', 'n63_dir', 'n63_inv', 'n63_exec', 'n63_loop', 'n63_fin'],
      '64': ['c64_0_0', 'c64_1_0', 'c64_2_0', 'c64_3_0', 'c64_4_0'],
      '65': ['l65_1', 'l65_2', 'l65_3', 'l65_4'],
      '66': ['c66_1', 'c66_2', 'c66_3', 'c66_4'],
    };

    const slots = cellSlotsByBlueprint[id] || [];
    slots.forEach((slotId, idx) => {
      const it = dynItems[idx];
      if (!it) return;
      const codeStr = esc(it.code || `0${idx + 1}`);
      const titleStr = esc(it.title || `Stage ${idx + 1}`);
      const subStr = esc(it.badge || it.secondaryBadge || 'ACTIVE');
      const descStr = esc(it.description || '');
      const cardHtml = esc(
        `<div style="padding:10px 12px;text-align:left;font-family:Inter,-apple-system,sans-serif;">` +
          `<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">` +
          `<span style="font-size:13.5px;font-weight:800;color:#0F172A;line-height:1.2;">${codeStr} | ${titleStr}</span>` +
          `<span style="background:#DBEAFE;color:#1E40AF;padding:2px 7px;border-radius:999px;font-size:9px;font-weight:800;white-space:nowrap;">${subStr}</span>` +
          `</div>` +
          (descStr
            ? `<div style="font-size:11.5px;color:#334155;margin-top:6px;line-height:1.3;">${descStr}</div>`
            : '') +
          `</div>`
      );
      out = replaceCellValue(out, slotId, cardHtml);
    });
  }

  return out;
}


