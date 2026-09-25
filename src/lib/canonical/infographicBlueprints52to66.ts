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

  if (id === '52' && !spec && !cleanCustomTitle && level === 'L2') {
    return generateTemplate52ContextHarnessLoopGraphXml();
  }

  const levelBadgeMap: Record<'L1' | 'L2' | 'L3' | 'L4', string> = {
    L1: 'L1 • CONCEPTUAL EXECUTIVE VIEW',
    L2: 'L2 • LOGICAL ARCHITECTURE VIEW',
    L3: 'L3 • TECHNICAL IMPLEMENTATION VIEW',
    L4: 'L4 • PRODUCTION DEPLOYMENT VIEW',
  };
  const activeLevelLabel = levelBadgeMap[level] || levelBadgeMap.L2;

  const meta = INFOGRAPHIC_BLUEPRINTS_LIST.find((m) => m.id === id) || INFOGRAPHIC_BLUEPRINTS_LIST[0];
  const title = esc(spec?.title || cleanCustomTitle || `${meta.name.replace(/^Infographic:\s*/i, '')} [${level}]`);
  const subtitle = esc(spec?.subtitle || `${meta.subtitle} (${activeLevelLabel})`);
  const takeaway = esc(
    spec?.takeaway ||
      `KEY TAKEAWAY (${activeLevelLabel}): Structured ${meta.shortType} blueprint engineered for high-contrast executive review and live Draw.io customization.`
  );
  const items = spec?.items && spec.items.length > 0 ? spec.items : null;

  // 0. #55: BUBBLE CONCEPTUAL (Left Executive Assumptions vs Right 12 Color-Coded Shadow AI / Agent Bubbles)
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
      leftXml += `<mxCell id="la_${idx}" value="&lt;div style='padding:10px;text-align:left;'&gt;&lt;div style='font-size:10px;font-weight:800;color:#475569;'&gt;${esc(a.badge)} (${level})&lt;/div&gt;&lt;div style='font-size:14px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${esc(a.title)}&lt;/div&gt;&lt;div style='font-size:11.5px;color:#334155;margin-top:4px;'&gt;${esc(a.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="75" y="${y}" width="410" height="108" as="geometry"/></mxCell>`;
    });
    let bubbleXml = '';
    bubbles.forEach((b, idx) => {
      bubbleXml += `<mxCell id="bub_${idx}" value="&lt;div style='font-family:Inter,sans-serif;text-align:center;'&gt;&lt;b style='font-size:13px;color:#0F172A;'&gt;${b.label}&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9.5px;font-weight:800;color:${b.stroke};'&gt;UNSANCTIONED • ${level}&lt;/span&gt;&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=${b.fill};strokeColor=${b.stroke};strokeWidth=2.5;" vertex="1" parent="1"><mxGeometry x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" as="geometry"/></mxCell>`;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_55" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;&lt;div style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.5px;'&gt;INFOGRAPHIC BLUEPRINT #55 • BUBBLE CONCEPTUAL • ${activeLevelLabel}&lt;/div&gt;&lt;div style='font-size:26px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="55" y="20" width="1330" height="82" as="geometry"/></mxCell>
      <mxCell id="zoneL" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="55" y="120" width="450" height="585" as="geometry"/></mxCell>
      <mxCell id="hdrL" value="WHAT LEADERSHIP THINKS (4 ASSUMPTIONS)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="75" y="135" width="410" height="36" as="geometry"/></mxCell>
      <mxCell id="zoneR" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=2;dashed=1;" vertex="1" parent="1"><mxGeometry x="535" y="120" width="850" height="585" as="geometry"/></mxCell>
      <mxCell id="hdrR" value="WHAT IS ACTUALLY RUNNING (12+ SHADOW AI &amp; AGENT BUBBLES)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#991B1B;fontColor=#FFFFFF;fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="565" y="135" width="790" height="36" as="geometry"/></mxCell>
      ${leftXml}
      ${bubbleXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="55" y="725" width="1330" height="46" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 1. #52: ANATOMY / DECONSTRUCTION (4 Horizontal Deconstruction Rows with Left Input -> Model -> Right Output + Prompt Bar)
  if (id === '52') {
    const rows = items?.slice(0, 4) || [
      { code: '01', title: 'Context', badge: 'LOADED CONTEXT', description: 'Your prompt + Files + chat + Tool results loaded for the current answer.', secondaryTitle: 'WHAT THE PROMPT ASKS FOR', secondaryDescription: 'Files & results being used + Missing inputs to name before filling gaps.', metricOrScore: 'PROMPT: List the files and tool results you are using for this job. Ask before assuming.' },
      { code: '02', title: 'Harness', badge: 'SYSTEM RULES & SKILLS', description: 'CLAUDE.md (rules) + Skills (repeatable jobs) governing model behavior.', secondaryTitle: 'CONNECTED TOOLS & CHECKS', secondaryDescription: 'Files, apps, commands + Your Checks (what counts as done).', metricOrScore: 'PROMPT: Read CLAUDE.md. Use connected tools & skills. Flag conflicting rules before starting.' },
      { code: '03', title: 'Loop', badge: 'CHECK THE OUTPUT', description: 'Attempt -> Check every box fits & nothing is cut off -> All checks pass?', secondaryTitle: 'SELF-CORRECTION CAP', secondaryDescription: 'If NO -> 3 tries used? -> Fix the failures & recheck or Stop + report.', metricOrScore: 'PROMPT: Check that every box fits. Fix failures and recheck. Stop after 3 tries.' },
      { code: '04', title: 'Graph', badge: 'RELATIONSHIP MESH', description: 'brief.md <-> audience.md <-> draft.md <-> offer.md + notes.md (unlinked).', secondaryTitle: 'MAP.md INDEX', secondaryDescription: 'Topics (grouped), Connections (found/guessed), Unlinked files, Read status.', metricOrScore: 'PROMPT: Read this folder. Write MAP.md: topics, unlinked files, connections, and read status.' }
    ];
    let rowsXml = '';
    const colors = ['#D97706', '#9333EA', '#16A34A', '#2563EB'];
    rows.forEach((r, i) => {
      const y = 115 + i * 175;
      const col = colors[i % 4];
      rowsXml += `
        <mxCell id="b_${i}" value="${esc(r.code || `0${i + 1}`)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${col};strokeWidth=2;fontStyle=1;fontSize=13;fontColor=${col};" vertex="1" parent="1"><mxGeometry x="36" y="${y + 10}" width="42" height="32" as="geometry"/></mxCell>
        <mxCell id="row_${i}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="96" y="${y}" width="1290" height="158" as="geometry"/></mxCell>
        <mxCell id="rt_${i}" value="&lt;b style='font-size:17px;color:${col};'&gt;${esc(r.title)}&lt;/b&gt; &amp;nbsp;&lt;span style='font-size:12.5px;color:#334155;font-weight:600;'&gt;${esc(r.badge)}&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="116" y="${y + 8}" width="700" height="26" as="geometry"/></mxCell>
        <mxCell id="L_${i}" value="&lt;div style='padding:6px;text-align:left;'&gt;&lt;b style='font-size:11px;color:${col};'&gt;INPUT / SOURCE ANATOMY&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:12px;color:#1E293B;'&gt;${esc(r.description)}&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=${col};dashed=1;" vertex="1" parent="1"><mxGeometry x="116" y="${y + 38}" width="460" height="68" as="geometry"/></mxCell>
        <mxCell id="M_${i}" value="CORE&lt;br/&gt;ENGINE" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=2;fontStyle=1;fontSize=10;fontColor=#9A3412;" vertex="1" parent="1"><mxGeometry x="660" y="${y + 42}" width="64" height="60" as="geometry"/></mxCell>
        <mxCell id="R_${i}" value="&lt;div style='padding:6px;text-align:left;'&gt;&lt;b style='font-size:11px;color:#1D4ED8;'&gt;${esc(r.secondaryTitle || 'TARGET OUTPUT &amp; VERIFICATION')}&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:12px;color:#1E293B;'&gt;${esc(r.secondaryDescription || r.description)}&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;" vertex="1" parent="1"><mxGeometry x="808" y="${y + 38}" width="556" height="68" as="geometry"/></mxCell>
        <mxCell id="eL_${i}" value="uses" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="L_${i}" target="M_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="eR_${i}" value="produces" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="M_${i}" target="R_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="P_${i}" value="&lt;div style='padding:4px 10px;text-align:left;font-size:11.5px;color:#334155;'&gt;&lt;b style='color:#0F172A;'&gt;ACTIONABLE PROMPT:&lt;/b&gt; ${esc(r.metricOrScore || `Execute ${r.title} verification and validate outputs.`)}&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#E2E8F0;" vertex="1" parent="1"><mxGeometry x="116" y="${y + 114}" width="1248" height="34" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_52" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#F8FAFC"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:left;padding:8px 16px;'&gt;&lt;div style='font-size:26px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="36" y="20" width="1350" height="76" as="geometry"/></mxCell>
      ${rowsXml}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 2. #56: SIDE-BY-SIDE COMPARISON (5 Head-to-Head OFF vs ON Toggle Rows)
  if (id === '56') {
    const leftHdr = esc(spec?.leftHeader || 'Baseline / Legacy Option (OFF)');
    const rightHdr = esc(spec?.rightHeader || 'Target Enterprise Platform (ON)');
    const rows = items?.slice(0, 5) || [
      { code: '01', badge: 'STATE PERSISTENCE', title: '01 Stateless Runs (MANUAL / EPHEMERAL)', description: 'Requires custom database pipelines and manual state tracking for every conversation thread.', secondaryTitle: '01 Persistent State (BUILT-IN / MANAGED)', secondaryDescription: 'Automatically tracks, persists, and manages conversation history and context windows securely.' },
      { code: '02', badge: 'SECURITY &amp; SANDBOXING', title: '02 Local Execution (UNSANDBOXED)', description: 'Executing code from tool outputs runs directly on your host environment, risking security exposure.', secondaryTitle: '02 Sandbox Execution (SECURE VPC / ISOLATED)', secondaryDescription: 'Safely runs code and scripts inside isolated VPC GKE containers, blocked from accessing host resources.' },
      { code: '03', badge: 'INFORMATION GROUNDING', title: '03 Raw Model Knowledge (STATIC)', description: 'Requires manual RAG pipelines, chunking, embedding, and vector databases to prevent hallucinations.', secondaryTitle: '03 Grounding Engine (NATIVE RAG &amp; SEARCH)', secondaryDescription: 'Direct, secure ingestion from BigQuery, AlloyDB, Google Search, and enterprise datastores out-of-the-box.' },
      { code: '04', badge: 'GOVERNANCE &amp; CONTROL', title: '04 Custom Rails (HARDCODED CODE)', description: 'Needs custom code for safety filters, error-handling retry loops, and human-in-the-loop prompts.', secondaryTitle: '04 Managed Guardrails (PROGRAMMATIC POLICY)', secondaryDescription: 'Native safety filtering, programmatic organizational policy checks, and HITL approval workflows.' },
      { code: '05', badge: 'INTEGRATION ECOSYSTEM', title: '05 Fragmented Glue (CUSTOM PIPELINES)', description: 'Heavy integration required to connect API calls to cloud services, databases, and enterprise access.', secondaryTitle: '05 First-Party Integrations (GOOGLE NATIVE)', secondaryDescription: 'Native, out-of-the-box IAM security, Cloud Pub/Sub, Cloud Logging, Workspace tools, and API gateway.' }
    ];
    let cells = '';
    rows.forEach((r, idx) => {
      const y = 165 + idx * 138;
      cells += `
        <mxCell id="cat_${idx}" value="${esc(r.badge)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontStyle=1;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="560" y="${y - 22}" width="320" height="24" as="geometry"/></mxCell>
        <mxCell id="L_${idx}" value="&lt;div style='text-align:left;padding:6px;'&gt;&lt;div style='display:flex;justify-content:space-between;'&gt;&lt;b style='font-size:14px;color:#0F172A;'&gt;${esc(r.title)}&lt;/b&gt;&lt;span style='background:#94A3B8;color:#FFF;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;'&gt;OFF&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:11.5px;color:#475569;margin-top:6px;'&gt;${esc(r.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="${y + 6}" width="580" height="100" as="geometry"/></mxCell>
        <mxCell id="M_${idx}" value="${esc(r.code || `0${idx + 1}`)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=2;fontStyle=1;fontSize=14;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="696" y="${y + 32}" width="48" height="48" as="geometry"/></mxCell>
        <mxCell id="R_${idx}" value="&lt;div style='text-align:left;padding:6px;'&gt;&lt;div style='display:flex;justify-content:space-between;'&gt;&lt;b style='font-size:14px;color:#0F766E;'&gt;${esc(r.secondaryTitle || r.title)}&lt;/b&gt;&lt;span style='background:#16A34A;color:#FFF;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;'&gt;ON&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:11.5px;color:#334155;margin-top:6px;'&gt;${esc(r.secondaryDescription || r.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="800" y="${y + 6}" width="580" height="100" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_56" name="${title}"><mxGraphModel dx="1440" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="920" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;&lt;div style='font-size:26px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="68" as="geometry"/></mxCell>
      <mxCell id="pilL" value="${leftHdr}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="190" y="100" width="340" height="36" as="geometry"/></mxCell>
      <mxCell id="pilR" value="${rightHdr}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0D9488;strokeColor=#0F766E;fontColor=#FFFFFF;fontStyle=1;fontSize=14;" vertex="1" parent="1"><mxGeometry x="910" y="100" width="360" height="36" as="geometry"/></mxCell>
      ${cells}
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 3. #57: FUNNEL CHART (5 Tapering Centered Trapezoid Stages with Volume Badges & Drop-Off Pills)
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
      const y = 120 + i * 118;
      const col = fills[i % fills.length];
      const txtCol = i === 2 ? '#0F172A' : '#FFFFFF';
      funnelXml += `
        <mxCell id="f_${i}" value="&lt;div style='text-align:center;padding:8px;'&gt;&lt;div style='font-size:16px;font-weight:900;color:${txtCol};'&gt;${esc(s.code || `0${i + 1}`)} | ${esc(s.title)} &amp;nbsp;&lt;span style='background:#FFFFFF;color:#0F172A;padding:2px 8px;border-radius:10px;font-size:11px;'&gt;${esc(s.badge)}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12px;color:${txtCol};margin-top:4px;'&gt;${esc(s.description)}&lt;/div&gt;&lt;/div&gt;" style="shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;direction=west;rounded=1;whiteSpace=wrap;html=1;fillColor=${col};strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="96" as="geometry"/></mxCell>
        <mxCell id="drop_${i}" value="${esc(s.metricOrScore || '▼ FILTERED')}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#B91C1C;strokeColor=#7F1D1D;fontColor=#FFFFFF;fontStyle=1;fontSize=11;" vertex="1" parent="1"><mxGeometry x="${x + w + 24}" y="${y + 32}" width="140" height="30" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_57" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;&lt;div style='font-size:28px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="72" as="geometry"/></mxCell>
      ${funnelXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="220" y="730" width="1000" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 4. #58: PROCESS CHECKLIST (6 Stacked Numbered Checklist Rows with Status Pills & Green ON Toggles)
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
      const y = 112 + i * 102;
      const c = badgeCols[i % badgeCols.length];
      listXml += `
        <mxCell id="num_${i}" value="${esc(it.code || `0${i + 1}`)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${c};strokeColor=#FFFFFF;strokeWidth=3;fontColor=#FFFFFF;fontStyle=1;fontSize=18;" vertex="1" parent="1"><mxGeometry x="90" y="${y + 12}" width="64" height="64" as="geometry"/></mxCell>
        <mxCell id="row_${i}" value="&lt;div style='padding:10px 18px;text-align:left;display:flex;justify-content:space-between;align-items:center;'&gt;&lt;div&gt;&lt;div style='font-size:16px;font-weight:800;color:#0F172A;'&gt;${esc(it.code || `0${i + 1}`)} | ${esc(it.title)} &amp;nbsp;&lt;span style='background:#16A34A;color:#FFFFFF;padding:2px 10px;border-radius:999px;font-size:10px;'&gt;${esc(it.badge)}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;margin-top:4px;'&gt;${esc(it.description)}&lt;/div&gt;&lt;/div&gt;&lt;div style='background:#E2E8F0;padding:6px 12px;border-radius:8px;font-family:monospace;font-size:11px;color:#0F172A;font-weight:700;'&gt;${esc(it.metricOrScore || 'STATUS: VERIFIED [ON]')}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="174" y="${y}" width="1170" height="86" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_58" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:left;padding:6px 16px;'&gt;&lt;div style='font-size:28px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="90" y="20" width="1254" height="74" as="geometry"/></mxCell>
      ${listXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="90" y="734" width="1254" height="44" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 5. #61: HIERARCHICAL TREE (Supervisor Root -> 3 Specialized Workers -> Unified Environment Layer)
  if (id === '61') {
    const rootItem = items?.[0] || { code: '01', title: 'SUPERVISOR AGENT', badge: 'ORCHESTRATOR • GOAL-DRIVEN', description: 'Analyzes high-level goals, decomposes tasks, coordinates specialized agents, and validates the final response.' };
    const w1 = items?.[1] || { code: '02a', title: 'SQL DATA AGENT', badge: 'DATA ACCESS', description: 'Queries databases, joins datasets, and fetches structured schema information.' };
    const w2 = items?.[2] || { code: '02b', title: 'WEB RESEARCHER AGENT', badge: 'BROWSER / SEARCH', description: 'Scrapes web pages, accesses APIs, and gathers real-time public information.' };
    const w3 = items?.[3] || { code: '02c', title: 'CODE SYNTHESIS AGENT', badge: 'EXECUTION / WRITE', description: 'Writes, tests, and refactors code scripts to process fetched datasets.' };
    const baseItem = items?.[4] || { code: '03', title: 'UNIFIED RESOURCE & ENVIRONMENT LAYER', badge: 'ISOLATED VPC • SECURE', description: 'Execution boundary for sandboxed workloads, database access (SQL connectors), gVisor runtime, & RAG vector knowledge base.' };

    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_61" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:center;'&gt;&lt;div style='font-size:28px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="72" as="geometry"/></mxCell>
      <mxCell id="sup" value="&lt;div style='padding:12px;text-align:left;color:#FFFFFF;'&gt;&lt;div style='font-size:11px;font-weight:800;opacity:0.9;'&gt;01 | SUPERVISION ZONE (${esc(rootItem.badge)})&lt;/div&gt;&lt;div style='font-size:18px;font-weight:900;margin-top:4px;'&gt;${esc(rootItem.title)}&lt;/div&gt;&lt;div style='font-size:12px;margin-top:6px;line-height:1.4;'&gt;${esc(rootItem.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1E3A8A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="480" y="116" width="480" height="145" as="geometry"/></mxCell>
      <mxCell id="w1" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;'&gt;02a | ${esc(w1.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:#16A34A;color:#FFF;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-top:4px;'&gt;${esc(w1.badge)}&lt;/div&gt;&lt;div style='font-size:12px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${esc(w1.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="80" y="325" width="380" height="190" as="geometry"/></mxCell>
      <mxCell id="w2" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;'&gt;02b | ${esc(w2.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:#D97706;color:#FFF;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-top:4px;'&gt;${esc(w2.badge)}&lt;/div&gt;&lt;div style='font-size:12px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${esc(w2.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="530" y="325" width="380" height="190" as="geometry"/></mxCell>
      <mxCell id="w3" value="&lt;div style='padding:12px;text-align:left;'&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;'&gt;02c | ${esc(w3.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:#DC2626;color:#FFF;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-top:4px;'&gt;${esc(w3.badge)}&lt;/div&gt;&lt;div style='font-size:12px;color:#1E293B;margin-top:8px;line-height:1.4;'&gt;${esc(w3.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="980" y="325" width="380" height="190" as="geometry"/></mxCell>
      <mxCell id="env" value="&lt;div style='padding:12px;text-align:center;color:#FFFFFF;'&gt;&lt;div style='font-size:18px;font-weight:900;'&gt;03 | ${esc(baseItem.title)} &amp;nbsp;&lt;span style='background:#0D9488;padding:2px 10px;border-radius:999px;font-size:11px;'&gt;${esc(baseItem.badge)}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:12.5px;color:#E2E8F0;margin-top:6px;'&gt;${esc(baseItem.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="80" y="575" width="1280" height="110" as="geometry"/></mxCell>
      <mxCell id="e1" value="Delegate &amp; Route" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="sup" target="w1"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e2" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="sup" target="w2"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e3" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="sup" target="w3"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="e4" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="w2" target="env"><mxGeometry relative="1" as="geometry"/></mxCell>
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="80" y="715" width="1280" height="48" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 6. #62: 2x2 QUADRANT MATRIX (Business Impact vs Technical Complexity)
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
      qXml += `
        <mxCell id="q_${i}" value="&lt;div style='padding:16px;text-align:left;'&gt;&lt;div style='font-size:20px;font-weight:900;color:#0F172A;'&gt;${esc(q.code || `0${i + 1}`)} | ${esc(q.title)}&lt;/div&gt;&lt;div style='display:inline-block;background:${st.stroke};color:#FFFFFF;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;margin-top:6px;'&gt;${esc(q.badge)}&lt;/div&gt;&lt;div style='font-size:13.5px;color:#1E293B;margin-top:14px;line-height:1.55;'&gt;${esc(q.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${st.fill};strokeColor=${st.stroke};strokeWidth=2.5;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${st.x}" y="${st.y}" width="580" height="265" as="geometry"/></mxCell>
      `;
    });
    return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_62" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#FDFBF7"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
      <mxCell id="hdr" value="&lt;div style='text-align:left;padding:6px 16px;'&gt;&lt;div style='font-size:28px;font-weight:900;color:#0F172A;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:2px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;" vertex="1" parent="1"><mxGeometry x="160" y="20" width="1190" height="74" as="geometry"/></mxCell>
      <mxCell id="axY" value="HIGH  ◄───  BUSINESS IMPACT (Value &amp; ROI)  ───►  LOW" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=13;direction=north;" vertex="1" parent="1"><mxGeometry x="76" y="120" width="54" height="555" as="geometry"/></mxCell>
      <mxCell id="axX" value="LOW  ◄──────  TECHNICAL COMPLEXITY (Time, Cost, Effort &amp; Friction)  ──────►  HIGH" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=13;" vertex="1" parent="1"><mxGeometry x="160" y="692" width="1190" height="38" as="geometry"/></mxCell>
      ${qXml}
      <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="160" y="746" width="1190" height="44" as="geometry"/></mxCell>
    </root></mxGraphModel></diagram></mxfile>`;
  }

  // 7. UNIVERSAL DYNAMIC MULTI-STAGE INFOGRAPHIC RENDERER FOR REMAINING TEMPLATES (#53, #54, #55, #59, #60, #63, #64, #65, #66)
  const renderList: DynamicInfographicItem[] =
    items ||
    meta.keyComponents.map((comp, idx) => ({
      code: `0${idx + 1}`,
      title: comp,
      badge: meta.shortType.toUpperCase(),
      description: `Enterprise-grade specification and validated pattern for ${comp}.`,
      metricOrScore: 'VERIFIED [ON]'
    }));

  let cardsXml = '';
  const cols = renderList.length === 4 ? 2 : renderList.length <= 3 ? renderList.length : 3;
  const cardW = Math.floor((1320 - (cols - 1) * 28) / cols);
  const cardH = renderList.length <= 4 ? 260 : 205;

  renderList.forEach((item, idx) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    const x = 60 + c * (cardW + 28);
    const y = 130 + r * (cardH + 32);
    const colors = [
      { fill: '#EFF6FF', stroke: '#2563EB', badge: '#1D4ED8' },
      { fill: '#F0FDF4', stroke: '#16A34A', badge: '#15803D' },
      { fill: '#FEF3C7', stroke: '#D97706', badge: '#B45309' },
      { fill: '#FAF5FF', stroke: '#7C3AED', badge: '#6D28D9' },
      { fill: '#FFF1F2', stroke: '#E11D48', badge: '#BE123C' },
      { fill: '#ECFEFF', stroke: '#0891B2', badge: '#0E7490' }
    ];
    const pal = colors[idx % colors.length];
    cardsXml += `
      <mxCell id="card_${idx}" value="&lt;div style='padding:14px;text-align:left;font-family:Inter,sans-serif;'&gt;&lt;div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;'&gt;&lt;span style='background:${pal.badge};color:#FFFFFF;font-size:11px;font-weight:800;padding:3px 10px;border-radius:999px;'&gt;${esc(item.code || `0${idx + 1}`)} • ${esc(item.badge)}&lt;/span&gt;&lt;span style='font-size:11px;font-weight:800;color:${pal.badge};'&gt;${esc(item.metricOrScore || 'ACTIVE')}&lt;/span&gt;&lt;/div&gt;&lt;div style='font-size:16px;font-weight:900;color:#0F172A;margin-bottom:8px;'&gt;${esc(item.title)}&lt;/div&gt;&lt;div style='font-size:12.5px;color:#334155;line-height:1.5;'&gt;${esc(item.description)}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${pal.fill};strokeColor=${pal.stroke};strokeWidth=2;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${cardW}" height="${cardH}" as="geometry"/></mxCell>
    `;
    if (idx > 0 && c > 0) {
      cardsXml += `<mxCell id="edge_${idx}" value="" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;" edge="1" parent="1" source="card_${idx - 1}" target="card_${idx}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
    }
  });

  return `<mxfile host="embed.diagrams.net" modified="2026-09-25T00:00:00.000Z" agent="PromptCanvas"><diagram id="infographic_${id}" name="${title}"><mxGraphModel dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="860" background="#F8FAFC"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
    <mxCell id="hdr" value="&lt;div style='font-family:Inter,sans-serif;text-align:center;'&gt;&lt;div style='font-size:11px;font-weight:800;color:#2563EB;letter-spacing:1.5px;text-transform:uppercase;'&gt;INFOGRAPHIC BLUEPRINT #${id} • ${esc(meta.shortType)}&lt;/div&gt;&lt;div style='font-size:24px;font-weight:900;color:#0F172A;margin-top:2px;'&gt;${title}&lt;/div&gt;&lt;div style='font-size:13px;color:#475569;margin-top:4px;'&gt;${subtitle}&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="60" y="20" width="1320" height="88" as="geometry"/></mxCell>
    ${cardsXml}
    <mxCell id="tk" value="${takeaway}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0F172A;" vertex="1" parent="1"><mxGeometry x="60" y="735" width="1320" height="44" as="geometry"/></mxCell>
    <mxCell id="ftr" value="GOOGLE CLOUD &amp; GEMINI ENTERPRISE INFOGRAPHIC BLUEPRINT • #${id} ${esc(meta.shortType.toUpperCase())} • REVISION 2026" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;letterSpacing=1;" vertex="1" parent="1"><mxGeometry x="60" y="790" width="1320" height="38" as="geometry"/></mxCell>
  </root></mxGraphModel></diagram></mxfile>`;
}
