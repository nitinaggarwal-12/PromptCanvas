import { GOOGLE_CLOUD_OFFICIAL_SVG } from '@/lib/gcpOfficialSvgAssets';

export interface PvDiagramNodeSpec {
  id: string;
  stepBadge: string;
  title: string;
  subtitle: string;
  metricOrControl: string;
  gcpIconKey: keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG;
}

export interface PvDiagramLaneSpec {
  laneTitle: string;
  laneSubtitle: string;
  accentHex: string;
  bgHex: string;
  borderHex: string;
  nodes: [PvDiagramNodeSpec, PvDiagramNodeSpec, PvDiagramNodeSpec];
}

export interface PvMatrixRow {
  rowId: number;
  docNum: number;
  docId: string;
  document: string;
  diagram: string;
  level: string;
  owner: string;
  projectType: 'All' | 'All (if UI)' | 'AI' | 'Regulated';
  sectionAnchor: string;
  summary: string;
  keyTakeaway: string;
  edgeLabels: [string, string, string];
  lanes: [PvDiagramLaneSpec, PvDiagramLaneSpec, PvDiagramLaneSpec, PvDiagramLaneSpec];
}

export interface PvUseCaseOverview {
  title: string;
  subtitle: string;
  date: string;
  authorRole: string;
  summaryParagraphs: string[];
  agents: Array<{
    number: number;
    agent: string;
    job: string;
    tier: string;
    keyTools: string;
  }>;
  gcpStack: Array<{
    layer: string;
    gcpServices: string;
  }>;
  complexityDrivers: string[];
}

export const PV_USE_CASE_OVERVIEW: PvUseCaseOverview = {
  title: 'Agentic System for Pharmacovigilance (PV) Case Processing on Google Cloud',
  subtitle: 'End-to-End 10-Document & 39-Diagram Enterprise Reference Pack (GxP / 21 CFR Part 11 / ICH E2B(R3))',
  date: 'Oct 26, 2026',
  authorRole: 'Principal Healthcare & Life Sciences Cloud Architecture Team',
  summaryParagraphs: [
    'A top-20 global pharmaceutical company processes ~500,000 adverse event (AE) reports per year (patients, doctors, call centers, clinical trials, medical literature, FDA FAERS). Today it is mostly manual — slow, expensive, and at risk of missing 7-day and 15-day regulatory deadlines (FDA, EMA).',
    'We are building a multi-agent AI system on Google Cloud that takes an incoming adverse event report and turns it into a validated, coded, narrative-complete Individual Case Safety Report (ICSR) ready for a human safety reviewer to approve and submit as an E2B(R3) XML file.'
  ],
  agents: [
    { number: 1, agent: 'Intake', job: 'Reads reports from all channels (PDF, email, fax scan, call audio, EHR/FHIR, literature)', tier: 'Gemini Flash Tier', keyTools: 'Document AI · Speech-to-Text · Healthcare API' },
    { number: 2, agent: 'Triage', job: 'Checks the 4 validity criteria; flags serious / expedited (7-day or 15-day) cases', tier: 'Gemini Flash Tier', keyTools: 'search_knowledge (SOPs)' },
    { number: 3, agent: 'Extraction', job: 'Pulls patient, drug, event, reporter details from unstructured text + images with character offsets', tier: 'Gemini Pro Tier', keyTools: 'parse_document · search_knowledge' },
    { number: 4, agent: 'Coding', job: 'Maps extracted terms to MedDRA (events) and WHODrug (products) with top-3 candidates', tier: 'Gemini Flash Tier', keyTools: 'suggest_codes (Cloud SQL + embeddings)' },
    { number: 5, agent: 'Duplicate Check', job: 'Finds matching cases already in the safety database via weighted similarity', tier: 'Gemini Flash Tier', keyTools: 'search_cases' },
    { number: 6, agent: 'Causality / Narrative', job: 'Drafts the medical case narrative and WHO-UMC causality assessment grounded in extracted fields', tier: 'Gemini Pro Tier', keyTools: 'search_knowledge (label + similar cases)' },
    { number: 7, agent: 'Submission', job: 'Builds the E2B(R3) XML file, runs ~200 ICH/FDA/EMA rules, and routes for e-signature approval', tier: 'Deterministic + Flash', keyTools: 'build_e2b · validate_e2b · write_case · send_e2b' },
    { number: 8, agent: 'Orchestrator', job: 'Manages handoffs, parallel execution, retries, state transitions, and regulatory SLA clocks', tier: 'ADK State Coordinator', keyTools: 'A2A task dispatch · Pub/Sub events' },
  ],
  gcpStack: [
    { layer: 'Models', gcpServices: 'Gemini on Vertex AI (Flash-class for fast tasks + Pro-class for extraction & medical reasoning, pinned versions)' },
    { layer: 'Agent build / runtime', gcpServices: 'Agent Development Kit (ADK) running on Vertex AI Agent Engine' },
    { layer: 'Protocols', gcpServices: 'A2A between agents · MCP for tools (MedDRA, WHODrug, safety DB, PubMed, E2B validator) on Cloud Run' },
    { layer: 'Data / storage', gcpServices: 'Cloud Storage, Document AI, Firestore, Cloud SQL, BigQuery, Cloud Healthcare API (FHIR / DICOM)' },
    { layer: 'Search / grounding', gcpServices: 'Vertex AI Search (over SOPs, drug labels, and historical safety cases)' },
    { layer: 'Security / audit', gcpServices: 'VPC Service Controls, CMEK, Model Armor, Sensitive Data Protection (DLP), Cloud Logging, IAP' },
  ],
  complexityDrivers: [
    'Regulated (GxP, 21 CFR Part 11, EU Annex 11, HIPAA, GDPR) — every agent step must be logged, reproducible, and cryptographically signed.',
    'Mandatory human-in-the-loop (HITL) — an AI agent can never submit to FDA/EMA or write to the safety DB of record without a human e-signature.',
    'Multi-agent + multi-tool — exercises A2A task envelopes, MCP tool allow-lists, guardrails, and structured evaluation gates.',
    'Multimodal — PDFs, handwritten fax forms, call-center audio recordings, and lab images.',
    'Hard SLAs — 7-day fatal/life-threatening and 15-day serious expedited regulatory clocks.',
    'Legacy integration — connects cleanly to existing safety databases (Veeva Vault Safety / Oracle Argus) and E2B AS2 gateways.'
  ],
};

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getSafeGcpIconDataUri(key: keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG): string {
  const rawSvg = GOOGLE_CLOUD_OFFICIAL_SVG[key] || GOOGLE_CLOUD_OFFICIAL_SVG.vertex_ai;
  return `data:image/svg+xml,${encodeURIComponent(rawSvg).replace(/;/g, '%3B')}`;
}

/**
 * Deterministic Phase-0 Mathematical Draw.io Compiler for all 39 PV Matrix Diagrams.
 * Enforces:
 * - 1440x820 Google Cloud Brand Light (#FFFFFF) canvas
 * - 4 semantic lanes (w=310, gapX=46, x=[30, 386, 742, 1098])
 * - 3 vertically spaced cards per lane (y=[166, 360, 554], h=148, gapY=46)
 * - Exact horizontal alignment (cy = nodeY + 74 -> min(dx,dy) = 0.0px)
 * - Dedicated inter-lane label channel so connector_path_through_text_or_badge === 0
 */
export function compilePvRowDrawioXml(row: PvMatrixRow): string {
  const cells: string[] = [];

  // 1. Outer Frame (id="poster_bg" unlocks 0px viewBox tight-fit in DiagramViewerRenderSafe) & Top Executive Banner (1600 x 796)
  cells.push(
    `<mxCell id="poster_bg" value="" style="rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="0" y="0" width="1600" height="796" as="geometry"/></mxCell>`
  );

  const headerHtml = `<table style="width:1512px;border-collapse:collapse;font-family:Inter,system-ui,sans-serif;"><tr><td style="text-align:left;padding:2px 10px;"><span style="display:inline-block;background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;border-radius:4px;padding:2px 8px;font-size:10.5px;font-weight:700;letter-spacing:0.04em;">DOC #${row.docNum} · ${escapeXml(row.document.toUpperCase())} · ROW #${row.rowId}</span> <span style="font-size:15px;font-weight:800;color:#0F172A;margin-left:8px;">${escapeXml(row.diagram)}</span></td><td style="text-align:right;padding:2px 10px;"><span style="display:inline-block;background:#F8FAFC;color:#334155;border:1px solid #E2E8F0;border-radius:4px;padding:2px 8px;font-size:10.5px;font-weight:600;">Level: ${escapeXml(row.level)} · Owner: ${escapeXml(row.owner)} · Scope: ${escapeXml(row.projectType)}</span></td></tr><tr><td colspan="2" style="text-align:left;padding:2px 10px;font-size:11px;color:#475569;">${escapeXml(row.summary)}</td></tr></table>`;

  cells.push(
    `<mxCell id="pv_hdr_${row.rowId}" value="${escapeXml(headerHtml)}" style="rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="32" y="16" width="1536" height="58" as="geometry"/></mxCell>`
  );

  // 2. Render 4 Swimlanes & 12 Cards (colW=294, gapX=120 -> 148px horizontal shaft; nodeH=148, gapY=52 -> 52px vertical shaft!)
  const colW = 294;
  const gapX = 120;
  const startX = 32;
  const laneY = 88;
  const laneH = 636;

  row.lanes.forEach((lane, colIdx) => {
    const colX = startX + colIdx * (colW + gapX);
    const laneId = `pv_lane_${row.rowId}_${colIdx}`;

    cells.push(
      `<mxCell id="${laneId}" value="" style="rounded=1;arcSize=4;fillColor=${lane.bgHex};strokeColor=${lane.borderHex};strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="${colX}" y="${laneY}" width="${colW}" height="${laneH}" as="geometry"/></mxCell>`
    );

    const laneHeaderHtml = `<table style="width:274px;border-collapse:collapse;font-family:Inter,system-ui,sans-serif;"><tr><td style="text-align:left;padding:2px 6px;font-size:11px;font-weight:800;color:${lane.accentHex};letter-spacing:0.03em;">STAGE ${colIdx + 1} · ${escapeXml(lane.laneTitle.toUpperCase())}</td></tr><tr><td style="text-align:left;padding:0 6px;font-size:9.5px;color:#475569;font-weight:600;">${escapeXml(lane.laneSubtitle)}</td></tr></table>`;

    cells.push(
      `<mxCell id="${laneId}_hdr" value="${escapeXml(laneHeaderHtml)}" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=${lane.borderHex};strokeWidth=1;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${colX + 8}" y="${laneY + 8}" width="${colW - 16}" height="44" as="geometry"/></mxCell>`
    );

    lane.nodes.forEach((node, rowIdx) => {
      const nodeX = colX + 14;
      const nodeY = 156 + rowIdx * 200;
      const nodeW = 266;
      const nodeH = 148;
      const cardId = `pv_node_${row.rowId}_${colIdx}_${rowIdx}`;

      const cardHtml = `<table style="width:248px;border-collapse:collapse;font-family:Inter,system-ui,sans-serif;"><tr><td style="width:36px; text-align:left;"></td><td style="text-align:left;padding:2px 4px;"><span style="display:inline-block;background:${lane.bgHex};color:${lane.accentHex};border:1px solid ${lane.borderHex};border-radius:4px;padding:1px 6px;font-size:9.5px;font-weight:700;">${escapeXml(node.stepBadge)}</span></td></tr><tr><td colspan="2" style="text-align:left;padding:5px 4px 2px 4px;font-size:12px;font-weight:800;color:#0F172A;">${escapeXml(node.title)}</td></tr><tr><td colspan="2" style="text-align:left;padding:2px 4px 5px 4px;font-size:10.5px;color:#334155;line-height:1.3;">${escapeXml(node.subtitle)}</td></tr><tr><td colspan="2" style="text-align:left;padding:3px 6px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:4px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:9.5px;font-weight:600;color:#1E293B;">${escapeXml(node.metricOrControl)}</td></tr></table>`;

      cells.push(
        `<mxCell id="${cardId}" value="${escapeXml(cardHtml)}" style="rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=${lane.borderHex};strokeWidth=1.5;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;shadow=0;" vertex="1" parent="1"><mxGeometry x="${nodeX}" y="${nodeY}" width="${nodeW}" height="${nodeH}" as="geometry"/></mxCell>`
      );

      // Official Google Cloud SVG Icon overlay in top-left of card
      const iconUri = getSafeGcpIconDataUri(node.gcpIconKey);
      cells.push(
        `<mxCell id="${cardId}_icon" value="" style="shape=image;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;aspect=fixed;imageAspect=0;image=${iconUri};" vertex="1" parent="1"><mxGeometry x="${nodeX + 10}" y="${nodeY + 9}" width="24" height="24" as="geometry"/></mxCell>`
      );

      // Intra-lane vertical progression arrow (52px shaft between row 0 -> 1 and row 1 -> 2)
      if (rowIdx < 2) {
        const vEdgeId = `pv_vedge_${row.rowId}_${colIdx}_${rowIdx}`;
        const nextCardId = `pv_node_${row.rowId}_${colIdx}_${rowIdx + 1}`;
        cells.push(
          `<mxCell id="${vEdgeId}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;strokeColor=#94A3B8;strokeWidth=1.5;dashed=1;endArrow=block;endFill=1;endSize=5;" edge="1" parent="1" source="${cardId}" target="${nextCardId}"><mxGeometry relative="1" as="geometry"/></mxCell>`
        );
      }
    });
  });

  // 3. Inter-Lane Horizontal Orthogonal Connectors (148px shaft across 120px corridor)
  for (let colIdx = 0; colIdx < 3; colIdx++) {
    const edgeLabel = row.edgeLabels[colIdx] || 'A2A / MCP';
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      const srcId = `pv_node_${row.rowId}_${colIdx}_${rowIdx}`;
      const tgtId = `pv_node_${row.rowId}_${colIdx + 1}_${rowIdx}`;
      const hEdgeId = `pv_hedge_${row.rowId}_${colIdx}_${rowIdx}`;
      const labelHtml =
        rowIdx === 0
          ? `<span style="padding:1px 4px;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:3px;color:#0F172A;font-family:Inter,sans-serif;font-size:8.5px;font-weight:700;">${escapeXml(edgeLabel)}</span>`
          : '';
      cells.push(
        `<mxCell id="${hEdgeId}" value="${escapeXml(labelHtml)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeColor=#1A73E8;strokeWidth=2;endArrow=block;endFill=1;endSize=6;labelBackgroundColor=none;" edge="1" parent="1" source="${srcId}" target="${tgtId}"><mxGeometry relative="1" as="geometry"><mxPoint x="0" y="-14" as="offset"/></mxGeometry></mxCell>`
      );
    }
  }

  // 4. Bottom Governance & Traceability Footer Bar
  const footerHtml = `<table style="width:1512px;border-collapse:collapse;font-family:Inter,system-ui,sans-serif;"><tr><td style="text-align:left;padding:2px 10px;font-size:11px;font-weight:700;color:#0F172A;">GxP / Architectural Invariant: <span style="font-weight:500;color:#334155;">${escapeXml(row.keyTakeaway)}</span></td><td style="text-align:right;padding:2px 10px;font-size:10.5px;font-weight:700;color:#059669;">21 CFR Part 11 · EU Annex 11 · ICH E2B(R3) · VPC-SC + CMEK Verified</td></tr></table>`;

  cells.push(
    `<mxCell id="pv_ftr_${row.rowId}" value="${escapeXml(footerHtml)}" style="rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="32" y="738" width="1536" height="42" as="geometry"/></mxCell>`
  );

  return `<mxfile host="PromptCanvas"><diagram id="pv-diagram-row-${row.rowId}" name="${escapeXml(`Row ${row.rowId} - ${row.diagram}`)}"><mxGraphModel dx="1600" dy="796" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="796" background="#FFFFFF" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
}

type QuickRowInput = {
  rowId: number;
  docNum: number;
  docId: string;
  document: string;
  diagram: string;
  level: string;
  owner: string;
  projectType: 'All' | 'All (if UI)' | 'AI' | 'Regulated';
  sectionAnchor: string;
  summary: string;
  keyTakeaway: string;
  edgeLabels: [string, string, string];
  cols: [
    { title: string; sub: string; nodes: [[string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG]] },
    { title: string; sub: string; nodes: [[string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG]] },
    { title: string; sub: string; nodes: [[string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG]] },
    { title: string; sub: string; nodes: [[string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG], [string, string, string, keyof typeof GOOGLE_CLOUD_OFFICIAL_SVG]] }
  ];
};

const LANE_PALETTES = [
  { accentHex: '#1D4ED8', bgHex: '#EFF6FF', borderHex: '#93C5FD' },
  { accentHex: '#047857', bgHex: '#ECFDF5', borderHex: '#6EE7B7' },
  { accentHex: '#B45309', bgHex: '#FFFBEB', borderHex: '#FCD34D' },
  { accentHex: '#6D28D9', bgHex: '#F5F3FF', borderHex: '#C4B5FD' },
] as const;

function buildRow(input: QuickRowInput): PvMatrixRow {
  const lanes = input.cols.map((c, cIdx) => {
    const pal = LANE_PALETTES[cIdx];
    const nodes = c.nodes.map((n, rIdx) => ({
      id: `r${input.rowId}_c${cIdx + 1}_n${rIdx + 1}`,
      stepBadge: `${cIdx + 1}.${rIdx + 1}`,
      title: n[0],
      subtitle: n[1],
      metricOrControl: n[2],
      gcpIconKey: n[3],
    })) as [PvDiagramNodeSpec, PvDiagramNodeSpec, PvDiagramNodeSpec];
    return {
      laneTitle: c.title,
      laneSubtitle: c.sub,
      accentHex: pal.accentHex,
      bgHex: pal.bgHex,
      borderHex: pal.borderHex,
      nodes,
    };
  }) as [PvDiagramLaneSpec, PvDiagramLaneSpec, PvDiagramLaneSpec, PvDiagramLaneSpec];

  return {
    rowId: input.rowId,
    docNum: input.docNum,
    docId: input.docId,
    document: input.document,
    diagram: input.diagram,
    level: input.level,
    owner: input.owner,
    projectType: input.projectType,
    sectionAnchor: input.sectionAnchor,
    summary: input.summary,
    keyTakeaway: input.keyTakeaway,
    edgeLabels: input.edgeLabels,
    lanes,
  };
}

export const PV_MASTER_DIAGRAM_MATRIX: PvMatrixRow[] = [
  // ================= DOC 1: BRD / PRD (Rows 1 - 5) =================
  buildRow({
    rowId: 1, docNum: 1, docId: 'doc-01', document: 'BRD / PRD', diagram: 'Context Diagram',
    level: 'Business', owner: 'PM / BA', projectType: 'All', sectionAnchor: 'context-diagram',
    summary: 'Business boundary showing external AE reporters, enterprise dictionaries, Agentic PV System, and FDA/EMA gateways.',
    keyTakeaway: 'Agentic PV sits as an AI copilot layer in front of the existing Safety Database of Record — never replacing it.',
    edgeLabels: ['AE Reports', 'AI Draft + Codes', 'Signed E2B(R3)'],
    cols: [
      { title: 'External Reporters', sub: '500k AE Reports / Year', nodes: [
        ['Patients & HCPs', 'Email, web portal, fax & call audio', 'Multi-channel intake', 'cloud_storage'],
        ['Clinical Trials & EHR', 'SAE feeds & FHIR R4 bundles', 'HL7 FHIR / PDF', 'document_ai'],
        ['Medical Literature', 'PubMed & FAERS signal feeds', 'Scheduled batch', 'pubsub'],
      ]},
      { title: 'Agentic PV System', sub: '8 ADK Agents on Vertex AI', nodes: [
        ['Intake & Triage Agents', '4-criteria validity & 7/15-day clock', 'SLA: <15m processing', 'vertex_ai'],
        ['Extract, Code & Dedup', 'Source offsets, MedDRA & WHODrug', '≥90% field accuracy', 'vertex_ai'],
        ['Narrative & E2B Prep', 'Drafts medical narrative & E2B XML', 'Zero auto-submit', 'cloud_run'],
      ]},
      { title: 'Human PV Operations', sub: 'Mandatory 21 CFR Part 11 Gate', nodes: [
        ['Case Processor', '1-screen side-by-side PDF review', '50% lower touch time', 'iap'],
        ['Safety Physician', 'Causality & medical sign-off', '21 CFR 11 e-Signature', 'cloud_iam'],
        ['QPPV / Compliance', 'SLA & audit trail oversight', '100% audit readiness', 'cloud_logging'],
      ]},
      { title: 'SoR & Regulators', sub: 'Authoritative Downstream Targets', nodes: [
        ['Safety DB (Argus/Veeva)', 'Authoritative system of record', 'Write after approval', 'spanner'],
        ['FDA / EMA E2B Gateway', 'ICH E2B(R3) XML + ACK ingest', '100% on-time expedited', 'cloud_load_balancing'],
        ['MedDRA & WHODrug', 'Version-pinned medical dictionaries', '≥95% 1st-pass coding', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 2, docNum: 1, docId: 'doc-01', document: 'BRD / PRD', diagram: 'As-is / To-be Process (BPMN)',
    level: 'Business', owner: 'PM / BA', projectType: 'All', sectionAnchor: 'as-is-to-be-bpmn',
    summary: 'Comparison of legacy 45–90 min sequential manual processing vs. <15 min parallel agentic preparation + single-screen review.',
    keyTakeaway: 'Replaces 6 manual copy-paste & lookup steps with parallel agent execution while preserving human medical approval.',
    edgeLabels: ['Parallel Dispatch', 'Pre-Filled Case', 'Approved E2B'],
    cols: [
      { title: 'As-Is Manual Bottleneck', sub: '45–90 Min Touch Time / Case', nodes: [
        ['Manual Inbox & Triage', 'Read PDF/fax, type 4 validity fields', 'High backlog risk', 'document_ai'],
        ['Manual Coding & Dedup', 'Look up MedDRA/WHODrug & search DB', '10–15% rework rate', 'bigquery'],
        ['Manual Narrative & E2B', 'Write prose from scratch & fix XML', 'Late 7/15-day risk', 'cloud_logging'],
      ]},
      { title: 'To-Be Stage 1: Intake', sub: 'Automated <60s Triage & Clock', nodes: [
        ['Auto-Ingest All Channels', 'GCS + DocAI OCR + Speech-to-Text', 'P95 < 60s parse', 'cloud_storage'],
        ['Triage & Day-0 Clock', '4 validity elements + 7/15-day timer', '100% serious recall', 'vertex_ai'],
        ['Orchestrator Fan-Out', 'Dispatches parallel A2A agent tasks', 'Correlation ID bound', 'pubsub'],
      ]},
      { title: 'To-Be Stage 2: Parallel AI', sub: 'Extract + Code + Dedup + Draft', nodes: [
        ['Extraction + Offsets', 'Patient, drug, event + PDF bbox', 'Source-grounded', 'vertex_ai'],
        ['MedDRA + Duplicate Check', 'Top-3 codes + weighted DB match', '≥95% Top-1 MedDRA', 'cloud_run'],
        ['Narrative + E2B Pre-Check', 'Grounded narrative + 200 E2B rules', '≥98% 1st-pass E2B', 'vertex_ai'],
      ]},
      { title: 'To-Be Stage 3: HITL Gate', sub: '1-Screen Review & e-Signature', nodes: [
        ['Single-Screen Review', 'Verify highlights, 1-click accept', '50% faster review', 'iap'],
        ['21 CFR 11 e-Signature', 'Re-auth via IdP + SHA-256 hash', 'Non-repudiable sign', 'cloud_iam'],
        ['Safety DB + E2B Send', 'Commit to Argus/Veeva & AS2 send', '100% on-time SLA', 'cloud_deploy'],
      ]},
    ],
  }),
  buildRow({
    rowId: 3, docNum: 1, docId: 'doc-01', document: 'BRD / PRD', diagram: 'User Journey',
    level: 'User', owner: 'PM / BA', projectType: 'All', sectionAnchor: 'user-journey',
    summary: 'End-to-end journey of a Case Processor and Safety Physician from SLA queue selection to 21 CFR Part 11 e-signature.',
    keyTakeaway: 'Every AI suggestion jumps directly to the highlighted source PDF sentence on click — zero blind trust required.',
    edgeLabels: ['Open Priority Case', 'Verify & Edit', 'Sign & Submit'],
    cols: [
      { title: '1. Queue & SLA Triage', sub: 'Case Processor Morning Flow', nodes: [
        ['Sort by SLA Countdown', '7-day fatal & 15-day expedited top', 'Live amber/red badges', 'cloud_monitoring'],
        ['Inspect Triage Rationale', 'See 4 validity elements pre-verified', 'Day-0 receipt locked', 'vertex_ai'],
        ['Claim Case in Console', 'Optimistic lock & session audit', 'IAP SSO identity', 'iap'],
      ]},
      { title: '2. Source-Linked Review', sub: 'Side-by-Side PDF + AI Fields', nodes: [
        ['Click Extracted Field', 'PDF viewer jumps to exact bbox', '100% source offset', 'document_ai'],
        ['Batch-Accept High Conf', '1-click accept ≥0.85 green fields', 'Mandatory view <0.85', 'vertex_ai'],
        ['Select MedDRA / Dedup', 'Pick Top-3 PT/LLT & link duplicate', 'Version-pinned dict', 'cloud_run'],
      ]},
      { title: '3. Medical Causality', sub: 'Safety Physician Review', nodes: [
        ['Review Draft Narrative', 'Hover sentences to verify source', 'Zero hallucinated dates', 'vertex_ai'],
        ['Confirm WHO-UMC Causality', 'Assess drug-event temporal link', 'Label-grounded RAG', 'bigquery'],
        ['Verify E2B(R3) Pre-Check', 'All 200 ICH/FDA/EMA rules green', 'Zero schema errors', 'cloud_Functions' in GOOGLE_CLOUD_OFFICIAL_SVG ? 'cloud_functions' : 'cloud_run'],
      ]},
      { title: '4. Part 11 e-Signature', sub: 'Approval & Regulatory Dispatch', nodes: [
        ['Trigger Approve Modal', 'Select meaning: Case Review Approved', '21 CFR Part 11 §11.50', 'cloud_iam'],
        ['Re-Authenticate via IdP', 'OIDC prompt=login fresh token', 'SHA-256 content_hash', 'scc'],
        ['Confirmation & ACK', 'Case written to SoR + E2B queued', 'Immutable audit row', 'cloud_logging'],
      ]},
    ],
  }),
  buildRow({
    rowId: 4, docNum: 1, docId: 'doc-01', document: 'BRD / PRD', diagram: 'Use Case Diagram',
    level: 'User', owner: 'PM / BA', projectType: 'All', sectionAnchor: 'use-case-diagram',
    summary: 'Actor-to-use-case mapping across Case Processor, Safety Reviewer, QPPV, QA/Compliance, and Agentic AI Subsystem.',
    keyTakeaway: 'Strict separation of duties: AI prepares drafts (`UC1`–`UC4`), while only authenticated human roles execute `UC5`–`UC8`.',
    edgeLabels: ['AI Pre-Population', 'Human Verification', 'Governance & Export'],
    cols: [
      { title: 'Agentic AI Use Cases', sub: 'Automated Draft Preparation', nodes: [
        ['UC1: Ingest & Triage', 'Parse PDF/audio & set 7/15d clock', 'FR-01 · FR-02', 'vertex_ai'],
        ['UC2: Extract & Code', 'Extract ICSR fields + MedDRA/WHODrug', 'FR-03 · FR-04', 'document_ai'],
        ['UC3: Dedup & Narrative', 'Find duplicates & draft narrative', 'FR-05 · FR-06 · FR-07', 'vertex_ai'],
      ]},
      { title: 'Case Processor Actions', sub: 'Operational Case Handling', nodes: [
        ['UC4: Review Queue', 'Filter by 7d/15d SLA & seriousness', 'FR-08 Console', 'iap'],
        ['UC5: Accept / Edit Fields', 'Accept AI fields or override w/ reason', 'FR-08 · FR-11 Audit', 'cloud_run'],
        ['UC6: Resolve Duplicates', 'Merge follow-up or mark new case', 'FR-05 Dedup decision', 'spanner'],
      ]},
      { title: 'Safety Physician Actions', sub: 'Medical & Regulatory Sign-Off', nodes: [
        ['UC7: Finalize Narrative', 'Edit medical narrative & causality', 'FR-06 Medical review', 'vertex_ai'],
        ['UC8: Approve & Sign (Part 11)', 'Re-auth e-signature & release E2B', 'FR-09 Hard HITL gate', 'cloud_iam'],
        ['UC9: Return for Rework', 'Send back to processor with notes', 'State -> IN_REVIEW', 'pubsub'],
      ]},
      { title: 'QPPV & QA Oversight', sub: 'Compliance & Inspection Readiness', nodes: [
        ['UC10: Monitor SLA Clocks', 'Track 7d/15d compliance & alerts', 'FR-12 SLA Dashboard', 'cloud_monitoring'],
        ['UC11: Inspect Audit Trail', 'Query immutable prompts & hashes', 'FR-11 BigQuery WORM', 'bigquery'],
        ['UC12: Export Inspection Pack', 'Generate FDA/EMA validation dossier', '100% ALCOA+ complete', 'cloud_logging'],
      ]},
    ],
  }),
  buildRow({
    rowId: 5, docNum: 1, docId: 'doc-01', document: 'BRD / PRD', diagram: 'Wireframes',
    level: 'User', owner: 'UX Designer', projectType: 'All (if UI)', sectionAnchor: 'wireframes',
    summary: '3-pane Safety Reviewer Console wireframe: Left Source PDF with bounding-box highlights, Center AI Fields/Coding, Right Narrative & Part 11 Sign-off.',
    keyTakeaway: 'Designed to eliminate tab-switching: source PDF, MedDRA candidates, duplicate score, and e-signature live on one viewport.',
    edgeLabels: ['Click Field -> Scroll PDF', '1-Click Accept / Rank', 'Part 11 Sign Modal'],
    cols: [
      { title: 'Top Bar: Case & SLA Clock', sub: 'Sticky Header & E2B Readiness', nodes: [
        ['Case ID & Seriousness', 'CASE-2026-004821 · SERIOUS (15-Day)', 'Red/Amber SLA badge', 'cloud_monitoring'],
        ['Countdown Timer', '11d 04h remaining · Day-0: Oct 24', 'Live clock service', 'pubsub'],
        ['E2B Pre-Check Status', '200/200 ICH/FDA rules PASS', 'Ready for signature', 'cloud_iam'],
      ]},
      { title: 'Left Pane: Source Viewer', sub: 'Highlighted PDF / Audio Transcript', nodes: [
        ['PDF Canvas + BBox Overlay', 'Yellow highlight on active field span', 'Page & char offset', 'document_ai'],
        ['Multi-Document Switcher', 'Initial fax + lab attachment + audio', 'Signed GCS URLs', 'cloud_storage'],
        ['PHI Redaction Toggle', 'Show original vs masked preview', 'Role-based visibility', 'scc'],
      ]},
      { title: 'Center Pane: AI Suggestions', sub: 'Fields, Confidence & Coding', nodes: [
        ['Patient, Drug & Event', 'Confidence badge (0.96 Green / 0.72 Amber)', 'Accept / Edit / Reject', 'vertex_ai'],
        ['MedDRA & WHODrug Picker', 'Top-3 PT/LLT candidates + cosine score', 'v27.1 pinned dict', 'bigquery'],
        ['Duplicate Candidate Card', 'CASE-2026-004799 (Score 0.91)', 'Merge follow-up / New', 'spanner'],
      ]},
      { title: 'Right Pane: Narrative & Sign', sub: 'Grounded Prose & Part 11 Footer', nodes: [
        ['Interactive Narrative', 'Each sentence linked to source span', 'Editable medical text', 'vertex_ai'],
        ['WHO-UMC Causality Box', 'Probable · Dechallenge positive', 'Physician rationale', 'cloud_run'],
        ['Approve & e-Sign Bar', '[Return] [Save] [Approve & e-Sign]', 'Triggers IdP re-auth', 'iap'],
      ]},
    ],
  }),

  // ================= DOC 2: SAD (Rows 6 - 12) =================
  buildRow({
    rowId: 6, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Context Diagram',
    level: 'Very high', owner: 'Solution Architect', projectType: 'All', sectionAnchor: 'sad-context-diagram',
    summary: 'System-level context showing VPC-SC boundary, ingress channels, enterprise IdP, Safety DB of Record, and AS2 E2B gateways.',
    keyTakeaway: 'All external integrations traverse controlled boundary adapters; agents inside VPC-SC have zero public internet egress.',
    edgeLabels: ['TLS 1.3 + IAP / mTLS', 'VPC-SC Perimeter', 'AS2 / HTTPS Interconnect'],
    cols: [
      { title: 'External Channels & Users', sub: 'Untrusted / Semi-Trusted Edge', nodes: [
        ['Report Sources (5 Channels)', 'Portal, Email, Fax, Call, FHIR EHR', '500k reports/yr', 'cloud_load_balancing'],
        ['PV Case Processors & MDs', 'Browser access via corporate SSO', 'IAP + OIDC MFA', 'iap'],
        ['Corporate IdP (SAML/OIDC)', 'Identity & Part 11 re-authentication', 'Short-lived JWTs', 'cloud_iam'],
      ]},
      { title: 'Agentic PV Platform (GCP)', sub: 'Single-Region VPC-SC + CMEK', nodes: [
        ['Ingestion & DLP Gate', 'GCS landing + DocAI + SDP + Model Armor', 'Prompt/PHI shield', 'scc'],
        ['Vertex AI Agent Engine', 'Orchestrator + 7 ADK Specialist Agents', 'Gemini Flash & Pro', 'vertex_ai'],
        ['MCP Tool Layer & State', 'Cloud Run MCP + Firestore + BigQuery', 'Immutable WORM logs', 'cloud_run'],
      ]},
      { title: 'Enterprise PV Systems', sub: 'Dedicated Interconnect / VPN', nodes: [
        ['Safety DB (Veeva / Argus)', 'System of record for approved ICSRs', 'Write post-signature', 'spanner'],
        ['MedDRA & WHODrug Sync', 'Licensed dictionary release loader', 'Version-pinned SQL', 'bigquery'],
        ['Enterprise SIEM / Splunk', 'Log sink forwarding for SOC alerts', 'Zero PHI in logs', 'cloud_logging'],
      ]},
      { title: 'Regulatory Authorities', sub: 'External Health Agencies', nodes: [
        ['FDA ESG NextGen', '7-day & 15-day FAERS E2B(R3) XML', 'ACK1 / ACK2 / ACK3', 'cloud_deploy'],
        ['EMA EudraVigilance', 'EU GVP Module VI ICSR gateway', 'XML schema v3', 'cloud_cdn'],
        ['PMDA & Global Agencies', 'Regional E2B profile adapters', 'Full traceability', 'cloud_monitoring'],
      ]},
    ],
  }),
  buildRow({
    rowId: 7, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Conceptual Architecture',
    level: 'High', owner: 'Solution Architect', projectType: 'All', sectionAnchor: 'conceptual-architecture',
    summary: '6-tier conceptual model: Channels -> Ingestion -> Agentic Processing -> Enterprise Knowledge & Tools -> Reviewer Experience -> Regulated Outputs.',
    keyTakeaway: 'Separates probabilistic AI reasoning (Agentic Tier) from deterministic enterprise rules and human sign-off.',
    edgeLabels: ['Normalized Case Event', 'Grounded AI Draft', 'Signed Regulatory Output'],
    cols: [
      { title: '1. Channels & Ingestion', sub: 'Multimodal Normalization', nodes: [
        ['Omnichannel Capture', 'Email, PDF, Fax, Audio, FHIR, Lit', 'Raw immutable archive', 'cloud_storage'],
        ['Multimodal Parsing', 'OCR, layout tables, audio transcript', 'Page/char offsets', 'document_ai'],
        ['Safety & Privacy Screen', 'PHI tokenization + injection filter', 'Model Armor + SDP', 'scc'],
      ]},
      { title: '2. Agentic Core', sub: 'Orchestrated Specialist Agents', nodes: [
        ['Workflow Orchestrator', 'State machine, retries & SLA timer', 'Deterministic control', 'vertex_ai'],
        ['Fast Triage & Coding', 'Validity check, MedDRA & dedup', 'Low-latency tier', 'vertex_ai'],
        ['Deep Extraction & Prose', 'Complex extraction & narrative RAG', 'Reasoning model tier', 'vertex_ai'],
      ]},
      { title: '3. Knowledge & Systems', sub: 'Governed MCP Tool Access', nodes: [
        ['Medical Dictionaries', 'MedDRA, WHODrug, internal drug list', 'Exact version pin', 'bigquery'],
        ['RAG Knowledge Corpus', 'SOPs, drug labels, prior narratives', 'Vertex AI Search', 'cloud_run'],
        ['Safety DB Connector', 'Read-only search + gated write', 'ADR-003 MCP boundary', 'spanner'],
      ]},
      { title: '4. Experience & Outputs', sub: 'Human Gate & Compliance', nodes: [
        ['Reviewer Console', 'Side-by-side verification & edits', '100% source-linked', 'iap'],
        ['Part 11 e-Signature', 'Dual-factor identity + hash binding', 'ADR-001 hard gate', 'cloud_iam'],
        ['Regulated E2B & Audit', 'FDA/EMA E2B(R3) + 10yr WORM log', '21 CFR Part 11 ready', 'cloud_logging'],
      ]},
    ],
  }),
  buildRow({
    rowId: 8, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Logical Architecture',
    level: 'Mid', owner: 'Solution Architect', projectType: 'All', sectionAnchor: 'logical-architecture',
    summary: 'Logical subsystems showing Ingestion, Event Bus, Agent Runtime, Guardrail Service, MCP Tool Servers, Operational/Audit Stores, and Console API.',
    keyTakeaway: 'Agents never hold database credentials or call external APIs directly; every side effect traverses typed MCP servers (`ADR-003`).',
    edgeLabels: ['Pub/Sub Event Bus', 'A2A + MCP Contracts', 'REST API + Audit Sink'],
    cols: [
      { title: 'Ingestion & Event Tier', sub: 'Stateless Intake & Routing', nodes: [
        ['Channel Connectors', 'Email/Fax/Audio/FHIR receivers', 'Writes to Raw Store', 'cloud_storage'],
        ['Document & Speech Parser', 'Extracts structured layout & text', 'Emits report.received', 'document_ai'],
        ['Event Bus & Clock Svc', 'Pub/Sub topics + Day-0 SLA clock', '15m alert evaluation', 'pubsub'],
      ]},
      { title: 'Agent & Guardrail Tier', sub: 'Protected AI Execution', nodes: [
        ['Guardrail Service', 'SDP PHI mask + Model Armor screen', 'Pre/Post LLM hook', 'scc'],
        ['Orchestrator & 7 Agents', 'ADK runtime with A2A task protocol', 'Pinned model + prompt', 'vertex_ai'],
        ['Schema & Grounding Check', 'JSON validator + offset verifier', 'Auto-retry on PV-220', 'cloud_functions'],
      ]},
      { title: 'MCP Tool Server Tier', sub: 'Isolated Domain Adapters', nodes: [
        ['Dictionary & RAG MCP', 'suggest_codes + search_knowledge', 'Read-only SA', 'cloud_run'],
        ['E2B Builder & Validator', 'build_e2b + 200-rule validate_e2b', 'Deterministic XSD/XSLT', 'cloud_run'],
        ['Safety DB & Gateway MCP', 'search_cases + write_case + send_e2b', 'Requires signature_id', 'cloud_run'],
      ]},
      { title: 'Data & Experience Tier', sub: 'State, Audit & Reviewer UI', nodes: [
        ['Operational Case Store', 'Working case state + suggestions', 'Optimistic locking', 'spanner'],
        ['Immutable Audit Store', 'Append-only prompts, tools, signs', '10-year WORM lock', 'bigquery'],
        ['Reviewer Console + API', 'IAP-protected UI & REST API v1', 'Part 11 e-signature', 'iap'],
      ]},
    ],
  }),
  buildRow({
    rowId: 9, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Technical Architecture',
    level: 'Physical', owner: 'Solution Architect', projectType: 'All', sectionAnchor: 'technical-architecture',
    summary: 'Concrete Google Cloud service topology inside a single-region VPC-SC perimeter with CMEK encryption and Cloud Interconnect.',
    keyTakeaway: '100% managed Google Cloud services (`Vertex AI Agent Engine`, `Cloud Run`, `Firestore`, `Cloud SQL`, `BigQuery`) inside `us-central1` VPC-SC.',
    edgeLabels: ['Internal Pub/Sub + DLP', 'Private Google Access', 'Cloud Interconnect'],
    cols: [
      { title: 'Edge & Ingestion (GCP)', sub: 'Cloud Load Balancing + GCS', nodes: [
        ['Cloud Load Balancing + IAP', 'Global HTTPS LB + Cloud Armor WAF', 'OIDC corp identity', 'cloud_load_balancing'],
        ['Cloud Storage + Healthcare', 'Raw bucket (Object Lock) + FHIR store', 'CMEK key ring', 'cloud_storage'],
        ['Document AI + Speech v2', 'Layout OCR + medical speech-to-text', 'Regional endpoints', 'document_ai'],
      ]},
      { title: 'Vertex AI & Security', sub: 'Agent Engine + Model Armor', nodes: [
        ['SDP + Model Armor', 'De-identifies PHI & blocks injection', 'Inline inspection', 'scc'],
        ['Vertex AI Agent Engine', 'Hosts ADK Orchestrator + 7 Agents', 'Workload Identity SA', 'vertex_ai'],
        ['Gemini Flash & Pro Tiers', 'Pinned @001/@002 versions, zero log', 'Regional us-central1', 'vertex_ai'],
      ]},
      { title: 'Cloud Run MCP & Search', sub: 'Private Serverless Tooling', nodes: [
        ['Cloud Run MCP Fleet', '5 internal-only MCP tool containers', 'Min instances = 2', 'cloud_run'],
        ['Vertex AI Search', 'Grounded RAG over SOPs & drug labels', 'CMEK data store', 'vertex_ai'],
        ['Cloud SQL PostgreSQL HA', 'MedDRA v27.1 + WHODrug + pgvector', 'Regional HA + replica', 'spanner'],
      ]},
      { title: 'State, Audit & Hybrid', sub: 'Firestore, BigQuery & VPN', nodes: [
        ['Firestore (Native Mode)', 'Working case docs & suggestions', 'P99 < 20ms reads', 'memorystore'],
        ['BigQuery Audit Dataset', 'Partitioned append-only WORM tables', '10-yr retention policy', 'bigquery'],
        ['Cloud Interconnect / VPN', 'Private link to Veeva/Argus & AS2', 'RFC1918 private routing', 'cloud_cdn'],
      ]},
    ],
  }),
  buildRow({
    rowId: 10, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Deployment Diagram (summary)',
    level: 'Physical', owner: 'Solution Architect', projectType: 'All', sectionAnchor: 'deployment-summary',
    summary: 'Promotion pipeline across Dev, Validation (IQ/OQ/PQ), and Production GCP projects with immutable release bundle promotion.',
    keyTakeaway: 'Validation (`pv-val`) mirrors Production (`pv-prod`) 1:1; no bundle reaches Prod without passing golden evals and QA PQ sign-off.',
    edgeLabels: ['Cloud Build + Eval Gate', 'Signed Bundle + OQ/PQ', 'QA Release Approval'],
    cols: [
      { title: 'Shared Build & Registry', sub: 'pv-shared-ops Project', nodes: [
        ['Git Repo + bundle.yaml', 'Code, prompts, model pins & schemas', 'Single version unit', 'cloud_deploy'],
        ['Cloud Build + Eval Runner', 'Runs 500-case golden PV eval suite', 'Fails on any regression', 'cloud_functions'],
        ['Artifact Registry + KMS', 'Cosign-signed images + CMEK keys', 'Binary Auth attestation', 'artifact_registry'],
      ]},
      { title: 'Dev Environment', sub: 'pv-dev Project (Synthetic Only)', nodes: [
        ['Sandbox Agent Engine', 'Rapid prompt & ADK agent iteration', '100% synthetic cases', 'vertex_ai'],
        ['Mock Safety DB & Gateway', 'Simulated Argus/Veeva & FDA ACK', 'Contract testing', 'cloud_run'],
        ['Unit & Red-Team Harness', '200 adversarial prompt injection runs', '0% bypass required', 'scc'],
      ]},
      { title: 'Validation Environment', sub: 'pv-val Project (GxP IQ/OQ/PQ)', nodes: [
        ['Production-Like Topology', 'Full VPC-SC + CMEK + IAP enforcement', 'De-identified gold set', 'cloud_iam'],
        ['Automated IQ / OQ Suite', 'Verifies all FR-01..12 & NFR gates', 'Signed test evidence', 'cloud_monitoring'],
        ['User Acceptance (PQ)', '50-case parallel run by PV reviewers', 'QA + QPPV sign-off', 'iap'],
      ]},
      { title: 'Production Environment', sub: 'pv-prod Project (Regulated)', nodes: [
        ['Binary Auth Enforced Run', 'Only QA-attested bundles deploy', 'Canary 10% -> 100%', 'cloud_deploy'],
        ['Live 8-Agent PV Runtime', 'Processes 500k real AE reports/yr', '99.9% SLA uptime', 'vertex_ai'],
        ['Live Safety DB & FDA/EMA', 'Real-time E2B(R3) & 10yr WORM audit', 'Zero unapproved changes', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 11, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Agent Architecture',
    level: 'Logical → Technical', owner: 'Solution Architect', projectType: 'AI', sectionAnchor: 'agent-architecture',
    summary: 'Detailed multi-agent topology: Orchestrator coordinating Intake, Triage, Parallel Extraction/Coding/Dedup, Narrative, and Submission over A2A & MCP.',
    keyTakeaway: 'Combines sequential gating (Intake -> Triage -> Narrative -> Submission) with 3-way parallel execution (Extraction || Coding || Dedup).',
    edgeLabels: ['A2A Sequential Gate', '3-Way Parallel A2A', 'MCP Tool Invocations'],
    cols: [
      { title: 'Coordinator & Entry', sub: 'ADK Orchestrator + Intake/Triage', nodes: [
        ['Orchestrator Agent (#8)', 'Owns case state machine & SLA clock', 'No direct LLM/DB access', 'vertex_ai'],
        ['Intake Agent (#1)', 'Normalizes PDF, audio, fax & FHIR', 'Gemini Flash Tier', 'document_ai'],
        ['Triage Agent (#2)', '4 validity checks + 7d/15d expedited', 'Gemini Flash Tier', 'vertex_ai'],
      ]},
      { title: 'Parallel Specialist Fan-Out', sub: 'Concurrent A2A Task Execution', nodes: [
        ['Extraction Agent (#3)', 'Extracts patient, drug, event + bbox', 'Gemini Pro Tier', 'vertex_ai'],
        ['Coding Agent (#4)', 'Maps terms to MedDRA & WHODrug Top-3', 'Gemini Flash Tier', 'vertex_ai'],
        ['Duplicate Check Agent (#5)', 'Scores candidate matches in Safety DB', 'Gemini Flash Tier', 'vertex_ai'],
      ]},
      { title: 'Synthesis & Packaging', sub: 'Medical Narrative & E2B XML', nodes: [
        ['Causality / Narrative (#6)', 'Drafts ICH narrative & WHO-UMC link', 'Gemini Pro Tier + RAG', 'vertex_ai'],
        ['Submission Agent (#7)', 'Builds E2B(R3) XML & runs 200 rules', 'Requires signature_id', 'cloud_deploy'],
        ['HITL Approval Wait State', 'Halts in READY_FOR_REVIEW until signed', 'ADR-001 hard block', 'iap'],
      ]},
      { title: 'Scoped MCP Tool Servers', sub: 'Per-Agent IAM Allow-Lists', nodes: [
        ['parse_document & search_kb', 'DocAI OCR + Vertex AI Search SOPs', 'Intake/Extract/Narrative', 'cloud_run'],
        ['suggest_codes & search_cases', 'Cloud SQL MedDRA + Safety DB read', 'Coding & Dedup only', 'spanner'],
        ['build/validate/send_e2b', 'E2B XML validator + gated SoR write', 'Submission Agent only', 'cloud_iam'],
      ]},
    ],
  }),
  buildRow({
    rowId: 12, docNum: 2, docId: 'doc-02', document: 'SAD', diagram: 'Guardrails / HITL Approval Flow',
    level: 'Mid', owner: 'Solution Architect', projectType: 'AI', sectionAnchor: 'guardrails-hitl-flow',
    summary: '5-layer defense-in-depth guardrail pipeline from untrusted input screening to server-enforced 21 CFR Part 11 e-signature verification.',
    keyTakeaway: 'Even if an LLM is compromised by prompt injection, MCP tool servers reject `write_case` and `send_e2b` without a valid cryptographic `signature_id`.',
    edgeLabels: ['Sanitized Prompt', 'Schema + Offset Verified', 'Cryptographic Sign Gate'],
    cols: [
      { title: 'Layer 1: Input Guardrails', sub: 'Pre-Inference Sanitization', nodes: [
        ['Untrusted Report Delimiter', 'Wraps text in <untrusted_report> tags', 'Structural isolation', 'cloud_storage'],
        ['Model Armor Screening', 'Detects prompt injection & jailbreaks', 'Flags & quarantines', 'scc'],
        ['SDP PHI Tokenization', 'Replaces names/MRN/DOB with [PATIENT_1]', 'Zero raw PHI to LLM', 'cloud_iam'],
      ]},
      { title: 'Layer 2: Runtime & Output', sub: 'Constrained Agent Execution', nodes: [
        ['Per-Agent MCP Allow-List', 'Intake cannot call write_case/send_e2b', 'Cloud Run IAM policy', 'cloud_run'],
        ['Strict JSON Schema Check', 'Validates output + character offsets', 'PV-220 auto-retry (max 2)', 'vertex_ai'],
        ['Confidence Thresholding', 'Scores <0.85 flagged Amber in UI', 'Blocks batch-accept', 'cloud_monitoring'],
      ]},
      { title: 'Layer 3: Human-in-the-Loop', sub: 'Mandatory Reviewer Console', nodes: [
        ['Field & Offset Inspection', 'Reviewer views every low-conf span', 'UI view-tracking gate', 'iap'],
        ['Part 11 Re-Authentication', 'Fresh IdP login + meaning of signature', '21 CFR Part 11 §11.200', 'cloud_iam'],
        ['SHA-256 Content Hash', 'Hashes exact case state at approval', 'PV-410 on stale hash', 'scc'],
      ]},
      { title: 'Layer 4: Server Enforcement', sub: 'MCP Signature Verification', nodes: [
        ['Verify signature_id Record', 'Checks Firestore signatures subcollection', 'Rejects missing/expired', 'spanner'],
        ['Commit to Safety DB & AS2', 'Executes write_case & send_e2b', 'Idempotency-Key locked', 'cloud_deploy'],
        ['Append WORM Audit Event', 'Logs input hash, output hash & signer', 'BigQuery 10yr retention', 'bigquery'],
      ]},
    ],
  }),

  // ================= DOC 3: ADRs (Row 13) =================
  buildRow({
    rowId: 13, docNum: 3, docId: 'doc-03', document: 'ADRs', diagram: 'Option Comparison Sketch',
    level: 'Narrow', owner: 'Architect', projectType: 'All', sectionAnchor: 'adr-option-comparison',
    summary: 'Side-by-side architectural trade-off comparison across ADR-001..ADR-007 (Single LLM vs Peer Swarm vs Orchestrated Multi-Agent; 1-Tier vs 2-Tier Gemini).',
    keyTakeaway: 'Orchestrated Multi-Agent (`ADR-002`) + Two-Tier Pinned Gemini (`ADR-005`) cuts inference cost by ~55% while preserving deterministic GxP auditability.',
    edgeLabels: ['Rejected Option A', 'Rejected Option B', 'Chosen Architecture (ADR)'],
    cols: [
      { title: 'Option A (Rejected)', sub: 'Monolithic Prompt / Full Auto', nodes: [
        ['Single Giant Prompt (ADR-002)', 'One LLM call does extract+code+prose', 'Poor MedDRA accuracy', 'vertex_ai'],
        ['Pro Model Everywhere (ADR-005)', 'Uses heavyweight model for triage/code', '2.2x slower, +120% cost', 'vertex_ai'],
        ['Direct DB SDK in Agent (ADR-003)', 'Agents hold DB creds & auto-submit', 'Fails GxP & security', 'scc'],
      ]},
      { title: 'Option B (Rejected)', sub: 'Autonomous Swarm / Rebuild SoR', nodes: [
        ['Peer-to-Peer Swarm (ADR-002)', 'Agents hand off dynamically without hub', 'Non-deterministic loops', 'pubsub'],
        ['Flash Model Only (ADR-005)', 'Uses fast model for complex causality', '-9% extraction recall', 'vertex_ai'],
        ['Replace Safety DB (ADR-004)', 'Build brand-new safety DB in GCP', '2-yr delay, high risk', 'spanner'],
      ]},
      { title: 'Option C (Chosen ADRs)', sub: 'Governed Multi-Agent on GCP', nodes: [
        ['Orchestrator + 7 Agents (ADR-002)', 'Central state coordinator + A2A tasks', 'Deterministic + parallel', 'vertex_ai'],
        ['2-Tier Pinned Gemini (ADR-005)', 'Flash for Triage/Code, Pro for Extract', '55% lower cost, <3m P95', 'vertex_ai'],
        ['MCP Gate + HITL Sign (ADR-001/3)', 'Cloud Run MCP enforces signature_id', '100% 21 CFR 11 compliant', 'cloud_run'],
      ]},
      { title: 'Release & Perimeter ADRs', sub: 'ADR-006 & ADR-007 Invariants', nodes: [
        ['Co-Versioned Bundle (ADR-006)', 'Code + prompts + model pin + evals', '1-click rollback unit', 'artifact_registry'],
        ['Single-Region VPC-SC (ADR-007)', 'us-central1 perimeter + CMEK keys', 'Zero data exfiltration', 'cloud_iam'],
        ['Keep Safety DB SoR (ADR-004)', 'AI layer writes post-approval only', 'Zero disruption to PV', 'bigquery'],
      ]},
    ],
  }),

  // ================= DOC 4: HLD (Rows 14 - 19) =================
  buildRow({
    rowId: 14, docNum: 4, docId: 'doc-04', document: 'HLD', diagram: 'Component Diagram (C4 L3)',
    level: 'Mid', owner: 'Tech Lead', projectType: 'All', sectionAnchor: 'component-diagram-c4-l3',
    summary: 'C4 Level-3 component breakdown across the 12 deployable modules in Ingestion, Agents, Tools, Data, and Experience groups.',
    keyTakeaway: 'Every module has a single responsibility, dedicated service account, and explicit synchronous (REST/MCP/A2A) or asynchronous (Pub/Sub) interface.',
    edgeLabels: ['Pub/Sub report.received', 'A2A + Guardrail Proxy', 'MCP Calls + REST API'],
    cols: [
      { title: 'Group 1: Ingestion Modules', sub: 'Channel Adapters & Normalization', nodes: [
        ['channel-ingest Service', 'Email/Fax/Portal/FHIR intake adapters', 'Writes gs://pv-raw-reports', 'cloud_storage'],
        ['doc-prep Service', 'DocAI OCR + Speech-to-Text + splitter', 'Emits report.received', 'document_ai'],
        ['clock-service Module', 'Computes Day-0 & 7d/15d SLA timers', 'Emits case.clock_alert', 'pubsub'],
      ]},
      { title: 'Group 2: Agent Modules', sub: 'Vertex AI Agent Engine + Guardrails', nodes: [
        ['orchestrator Module', 'Workflow state machine & A2A router', 'Tracks step retries', 'vertex_ai'],
        ['specialist-agents (x7)', 'Intake, Triage, Extract, Code, Dedup...', 'Stateless ADK workers', 'vertex_ai'],
        ['guardrail-proxy Module', 'SDP PHI masking + Model Armor check', 'Wraps all Gemini calls', 'scc'],
      ]},
      { title: 'Group 3: MCP Tool Modules', sub: '5 Cloud Run Tool Servers', nodes: [
        ['mcp-doc-tools & mcp-knowledge', 'parse_document + search_knowledge', 'DocAI & Vertex Search', 'cloud_run'],
        ['mcp-coding & mcp-safety-db', 'suggest_codes + search/write_case', 'Cloud SQL & Veeva/Argus', 'cloud_run'],
        ['mcp-e2b Server', 'build_e2b + validate_e2b + send_e2b', '200 ICH/FDA/EMA rules', 'cloud_run'],
      ]},
      { title: 'Group 4 & 5: Data & UI', sub: 'Stores & Reviewer Experience', nodes: [
        ['Firestore + Cloud SQL', 'Working case state + MedDRA v27.1', 'Optimistic version lock', 'spanner'],
        ['audit-writer + BigQuery', 'Pub/Sub consumer -> WORM audit table', '10-year retention lock', 'bigquery'],
        ['console-api + console-ui', 'REST API v1 + Next.js Reviewer UI', 'Behind IAP + IdP OIDC', 'iap'],
      ]},
    ],
  }),
  buildRow({
    rowId: 15, docNum: 4, docId: 'doc-04', document: 'HLD', diagram: 'Key Sequence Diagrams',
    level: 'Mid', owner: 'Tech Lead', projectType: 'All', sectionAnchor: 'key-sequence-diagrams',
    summary: 'Two end-to-end HLD sequences: Sequence 1 (Report In -> Parallel Agents -> Reviewer-Ready) and Sequence 2 (Part 11 Sign -> Safety DB -> FDA E2B ACK).',
    keyTakeaway: 'Sequence 1 completes in <3 minutes P95 asynchronously; Sequence 2 executes synchronously on human approval with cryptographic signature verification.',
    edgeLabels: ['Seq 1: Async Ingest', 'Seq 1: Parallel A2A', 'Seq 2: Sign & Submit'],
    cols: [
      { title: 'Seq 1A: Ingest & Triage', sub: '0s – 45s after Report Arrival', nodes: [
        ['1. Channel -> GCS + Pub/Sub', 'Stores raw PDF & publishes event', 'sha256 digest locked', 'cloud_storage'],
        ['2. Orchestrator -> Intake', 'Calls parse_document via MCP', 'Layout + char offsets', 'document_ai'],
        ['3. Triage -> Clock Start', 'Verifies 4 criteria & sets 7d/15d SLA', 'State: TRIAGED', 'vertex_ai'],
      ]},
      { title: 'Seq 1B: Parallel & Draft', sub: '45s – 160s Agent Fan-Out', nodes: [
        ['4. Parallel A2A Fan-Out', 'Runs Extraction || Coding || Dedup', 'Guardrail proxy active', 'vertex_ai'],
        ['5. Narrative Synthesis', 'Grounds medical prose in drug label', 'Zero ungrounded claims', 'vertex_ai'],
        ['6. Submission Pre-Check', 'Builds draft E2B & runs 200 rules', 'State: READY_FOR_REVIEW', 'cloud_run'],
      ]},
      { title: 'Seq 2A: Review & Part 11', sub: 'Human Reviewer Console Flow', nodes: [
        ['7. Reviewer Edits & Accepts', 'PATCH /suggestions + PUT /narrative', 'Version incremented', 'iap'],
        ['8. Re-Auth &POST /approve', 'Verifies OIDC auth_time < 60s + hash', 'Writes signature_id', 'cloud_iam'],
        ['9. Orchestrator Resume', 'Dispatches final Submission A2A task', 'Passes signature_id', 'vertex_ai'],
      ]},
      { title: 'Seq 2B: SoR Write & E2B', sub: 'Authoritative Commit & ACK', nodes: [
        ['10. mcp-safety-db.write_case', 'Verifies signature_id -> writes SoR', 'Returns safety_db_id', 'spanner'],
        ['11. mcp-e2b.send_e2b', 'Transmits E2B(R3) XML via AS2 gateway', 'State: SUBMITTED', 'cloud_deploy'],
        ['12. Async ACK -> CLOSED', 'Ingests FDA/EMA ACK1/ACK2 -> closes', 'Stops regulatory clock', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 16, docNum: 4, docId: 'doc-04', document: 'HLD', diagram: 'Conceptual ERD',
    level: 'High', owner: 'Tech Lead', projectType: 'All', sectionAnchor: 'conceptual-erd',
    summary: 'High-level domain entity relationship model connecting Source Report, Case, Patient/Product/Event, AI Suggestion, Signature, and Submission.',
    keyTakeaway: 'AI outputs are modeled as first-class `AI Suggestion` entities separate from curated `Case` attributes until human acceptance.',
    edgeLabels: ['1-to-Many Extraction', 'Human Curation', 'Regulated Release'],
    cols: [
      { title: 'Source & Intake Entities', sub: 'Immutable Evidence Origin', nodes: [
        ['SOURCE_REPORT', 'report_id, channel, gcs_uri, sha256', '1..* per Case (follow-ups)', 'cloud_storage'],
        ['DOCUMENT_SPAN', 'page, bbox, char_start, char_end', 'Grounds every field', 'document_ai'],
        ['REGULATORY_CLOCK', 'day_zero, due_at, seriousness_tier', '7-day or 15-day SLA', 'pubsub'],
      ]},
      { title: 'Core ICSR Case Entities', sub: 'Clinical Safety Domain', nodes: [
        ['CASE (ICSR)', 'case_id, state, version, safety_db_id', 'Central aggregate root', 'spanner'],
        ['PATIENT & REPORTER', 'initials_token, age, sex, qualification', 'PHI tokenized at rest', 'cloud_iam'],
        ['PRODUCT, EVENT & NARRATIVE', 'suspect_drug, meddra_pt, causality', '1..* drugs & events', 'bigquery'],
      ]},
      { title: 'Agentic AI Entities', sub: 'Probabilistic Draft Layer', nodes: [
        ['FIELD_SUGGESTION', 'field_path, value, confidence, status', 'PROPOSED/ACCEPTED/EDITED', 'vertex_ai'],
        ['CODING_CANDIDATE', 'dict_version, code, term, rank_score', 'Top-3 MedDRA/WHODrug', 'cloud_run'],
        ['DUPLICATE_CANDIDATE', 'existing_case_id, similarity_score', 'Merge or New decision', 'vertex_ai'],
      ]},
      { title: 'Compliance & Submission', sub: '21 CFR Part 11 & E2B Entities', nodes: [
        ['ELECTRONIC_SIGNATURE', 'sig_id, user_id, meaning, content_hash', '21 CFR Part 11 record', 'scc'],
        ['E2B_SUBMISSION', 'submission_id, authority, xml_uri, ack', 'FDA / EMA / PMDA', 'cloud_deploy'],
        ['AUDIT_EVENT', 'event_id, actor, bundle_ver, hashes', 'Append-only WORM log', 'cloud_logging'],
      ]},
    ],
  }),
  buildRow({
    rowId: 17, docNum: 4, docId: 'doc-04', document: 'HLD', diagram: 'Logical ERD',
    level: 'Mid', owner: 'Tech Lead', projectType: 'All', sectionAnchor: 'logical-erd',
    summary: 'Logical relational/document schema showing PK/FK relationships, version locks, suggestion lineage, and cryptographic audit keys.',
    keyTakeaway: 'Every `CASE_PRODUCT` and `CASE_EVENT` row carries `from_suggestion_id` FK so auditors can trace any final E2B field back to the exact AI run.',
    edgeLabels: ['PK / FK Lineage', 'Suggestion Promotion', 'Signature & Audit FK'],
    cols: [
      { title: 'Case & Source Tables', sub: 'Aggregate Root & Attachments', nodes: [
        ['CASE (PK: case_id)', 'status, expedited_tier, version, due_at', 'Optimistic lock version', 'spanner'],
        ['SOURCE_REPORT (PK: report_id)', 'FK: case_id, gcs_uri, sha256, received_at', 'Immutable source link', 'cloud_storage'],
        ['DUPLICATE_LINK (PK: dup_id)', 'FK: case_id, match_case_id, score, decision', 'Confirmed / Rejected', 'bigquery'],
      ]},
      { title: 'AI Suggestion Tables', sub: 'Pre-Approval Staging Schema', nodes: [
        ['FIELD_SUGGESTION (PK: sug_id)', 'FK: case_id, field_path, confidence, span', 'bundle_version stamped', 'vertex_ai'],
        ['REVIEW_DECISION', 'reviewed_by, reviewed_at, edit_reason', 'Captures human override', 'iap'],
        ['NARRATIVE_DRAFT (PK: nar_id)', 'FK: case_id, draft_text, sentence_spans', 'Grounded sentence map', 'document_ai'],
      ]},
      { title: 'Curated Clinical Tables', sub: 'Promoted Post-Review Records', nodes: [
        ['CASE_PATIENT (PK: case_id)', 'age_yrs, sex, weight_kg, phi_vault_ref', 'Separated PHI token', 'cloud_iam'],
        ['CASE_PRODUCT (PK: prod_id)', 'FK: case_id, whodrug_code, dose, action', 'FK: from_suggestion_id', 'spanner'],
        ['CASE_EVENT (PK: event_id)', 'FK: case_id, meddra_pt_code, outcome', 'FK: from_suggestion_id', 'spanner'],
      ]},
      { title: 'Part 11 & Submission Tables', sub: 'Regulated Release Schema', nodes: [
        ['SIGNATURE (PK: sig_id)', 'FK: case_id, signer_id, content_hash', 'Unique per approval', 'scc'],
        ['SUBMISSION (PK: sub_id)', 'FK: case_id, FK: sig_id, e2b_gcs_uri', 'Non-null sig_id constraint', 'cloud_deploy'],
        ['AUDIT_EVENT (PK: event_id)', 'FK: case_id, correlation_id, payload_hash', 'Partitioned by timestamp', 'cloud_logging'],
      ]},
    ],
  }),
  buildRow({
    rowId: 18, docNum: 4, docId: 'doc-04', document: 'HLD', diagram: 'Data Flow Diagram',
    level: 'Mid', owner: 'Tech Lead', projectType: 'All', sectionAnchor: 'data-flow-diagram',
    summary: 'End-to-end data flow highlighting Sensitive Data Protection (SDP) PHI tokenization before LLM inference and de-tokenization at reviewer/E2B stages.',
    keyTakeaway: 'Raw patient/reporter identifiers never enter Gemini prompts or BigQuery audit logs — only tokenized placeholders (`[PATIENT_1]`) cross the LLM boundary.',
    edgeLabels: ['Raw PHI -> SDP Vault', 'Tokenized Prompt Only', 'Authorized Re-Hydration'],
    cols: [
      { title: 'Zone 1: Raw PHI Capture', sub: 'CMEK-Encrypted Landing', nodes: [
        ['Incoming AE Report', 'Contains patient name, DOB, MRN, phone', 'TLS 1.3 ingress', 'cloud_load_balancing'],
        ['Raw Archive (gs://pv-raw)', 'Stored unmodified with SHA-256 hash', 'CMEK + Object Lock', 'cloud_storage'],
        ['DocAI Layout Extraction', 'Extracts raw text + bounding boxes', 'In-memory processing', 'document_ai'],
      ]},
      { title: 'Zone 2: SDP PHI Redaction', sub: 'De-Identification Boundary', nodes: [
        ['Cloud DLP / SDP Inspector', 'Detects NAME, DOB, MRN, PHONE, EMAIL', 'Replaces w/ [PATIENT_1]', 'scc'],
        ['PHI Token Vault (Firestore)', 'Stores token <-> raw value mapping', 'Restricted IAM policy', 'cloud_iam'],
        ['Model Armor Filter', 'Scans redacted text for injection', 'Clean text to agents', 'scc'],
      ]},
      { title: 'Zone 3: Zero-PHI AI Core', sub: 'Vertex AI & BigQuery Audit', nodes: [
        ['Gemini Flash & Pro Calls', 'Processes only [PATIENT_1] redacted text', 'Zero training retention', 'vertex_ai'],
        ['MCP Coding & RAG Lookups', 'Queries MedDRA, WHODrug & SOPs', 'No patient identifiers', 'cloud_run'],
        ['BigQuery WORM Audit Log', 'Logs redacted prompts & SHA-256 hashes', '0% PHI leakage verified', 'bigquery'],
      ]},
      { title: 'Zone 4: Authorized Output', sub: 'Controlled Re-Hydration', nodes: [
        ['Reviewer Console UI', 'Joins PHI vault for authorized PV role', 'IAP + RBAC checked', 'iap'],
        ['E2B(R3) XML Builder', 'Populates ICH privacy-compliant fields', 'Minimized HIPAA fields', 'cloud_deploy'],
        ['Safety DB & FDA/EMA', 'Encrypted write to Veeva/Argus & AS2', 'Full GxP chain of custody', 'spanner'],
      ]},
    ],
  }),
  buildRow({
    rowId: 19, docNum: 4, docId: 'doc-04', document: 'HLD', diagram: 'A2A / MCP Interaction Sequence',
    level: 'Mid', owner: 'Tech Lead', projectType: 'AI', sectionAnchor: 'a2a-mcp-interaction-sequence',
    summary: 'Protocol-level interaction showing A2A JSON task envelopes between Orchestrator and Specialist Agents and MCP tool calls to Cloud Run.',
    keyTakeaway: 'Every A2A task and MCP tool call propagates `correlation_id`, `case_id`, and `bundle_version` and emits a paired `audit.event` to Pub/Sub.',
    edgeLabels: ['A2A Task Envelope', 'Guardrail + MCP Call', 'A2A Result + Audit'],
    cols: [
      { title: 'Orchestrator (A2A Client)', sub: 'Task Dispatch & Correlation', nodes: [
        ['Build A2A Task Envelope', 'task_id, correlation_id, case_id,agent', 'Attaches bundle_version', 'vertex_ai'],
        ['Dispatch via Agent Engine', 'mTLS call with Workload Identity JWT', 'Deadline budget attached', 'cloud_iam'],
        ['Await A2A Result Envelope', 'Validates status: OK | RETRYABLE', 'Updates case state', 'pubsub'],
      ]},
      { title: 'Specialist Agent (ADK)', sub: 'Reasoning & Tool Selection', nodes: [
        ['Unpack Context & Schema', 'Loads pinned prompt & output JSON spec', 'bundle.yaml verified', 'vertex_ai'],
        ['Invoke Guardrail Proxy', 'SDP redact + Model Armor + Gemini call', 'Pinned @001/@002 model', 'scc'],
        ['Select Scoped MCP Tool', 'Prepares typed tool request payload', 'Attaches Idempotency-Key', 'vertex_ai'],
      ]},
      { title: 'MCP Server (Cloud Run)', sub: 'IAM & Policy Enforcement', nodes: [
        ['Verify Caller Service Acct', 'Checks per-agent tool allow-list', 'Blocks unauthorized tool', 'cloud_run'],
        ['Execute Backend Adapter', 'Queries Cloud SQL / DocAI / Safety DB', 'Checks sig_id if write', 'spanner'],
        ['Return Typed MCP Result', 'Returns structured JSON + latency_ms', 'Deterministic contract', 'cloud_run'],
      ]},
      { title: 'Telemetry & WORM Audit', sub: 'Asynchronous Observability', nodes: [
        ['Emit Pub/Sub audit.event', 'Fired by both Agent and MCP server', 'input_hash + output_hash', 'pubsub'],
        ['audit-writer Ingestion', 'Streams into BigQuery pv_audit.events', 'Append-only WORM table', 'bigquery'],
        ['Cloud Trace OpenTelemetry', 'Links A2A span + Gemini span + MCP span', 'End-to-end trace tree', 'cloud_monitoring'],
      ]},
    ],
  }),

  // ================= DOC 5: LLD (Rows 20 - 23) =================
  buildRow({
    rowId: 20, docNum: 5, docId: 'doc-05', document: 'LLD', diagram: 'Detailed Sequence Diagrams',
    level: 'Low', owner: 'Developer', projectType: 'All', sectionAnchor: 'detailed-sequence-diagrams',
    summary: 'Code-level sequences for (1) Extraction Agent with `PV-220` schema retry and optimistic lock and (2) Part 11 e-signature with `content_hash` verification.',
    keyTakeaway: 'Handles LLM schema drift (`PV-220`) via bounded repair retry and prevents stale approvals (`PV-410`) via SHA-256 `content_hash` comparison.',
    edgeLabels: ['Guardrail + Repair Loop', 'Optimistic Lock Write', 'Part 11 Hash + Sign'],
    cols: [
      { title: 'Extraction: LLM & Retry', sub: 'ExtractionAgent.handle(task)', nodes: [
        ['1. Load Redacted Document', 'Fetches layout JSON via mcp-doc-tools', 'SDP tokens verified', 'document_ai'],
        ['2. Gemini Pro Inference', 'Calls guardrail-proxy w/ JSON schema', 'Temp=0.0, seed=42', 'vertex_ai'],
        ['3. PV-220 Schema Repair', 'If invalid JSON/offset -> 1 repair call', 'Max 2 retries else fail', 'cloud_functions'],
      ]},
      { title: 'Extraction: Lock & Persist', sub: 'Firestore Transaction Commit', nodes: [
        ['4. Compute Confidence', '0.6*model_prob + 0.4*span_exact_match', 'Flags <0.85 as AMBER', 'vertex_ai'],
        ['5. Firestore Transaction', 'Checks case.version == expected_ver', 'Writes suggestions/*', 'spanner'],
        ['6. Emit Audit & A2A OK', 'Publishes audit.event + A2A Result', 'input/output SHA-256', 'pubsub'],
      ]},
      { title: 'Approval: Auth & Hash Check', sub: 'POST /api/v1/cases/{id}/approve', nodes: [
        ['7. Verify Fresh IdP Token', 'Requires OIDC auth_time < 60 seconds', 'Else returns PV-401', 'cloud_iam'],
        ['8. Recompute content_hash', 'SHA-256(fields + codes + narrative)', 'Compares to request body', 'scc'],
        ['9. Reject Stale (PV-410)', 'If hash mismatch -> 409 Conflict', 'Prevents race condition', 'iap'],
      ]},
      { title: 'Approval: Sign & Dispatch', sub: 'Atomic Signature & Resume', nodes: [
        ['10. Write signatures/{id}', 'Stores signer, meaning, token_jti, hash', 'State -> APPROVED', 'spanner'],
        ['11. Trigger Submission Task', 'Sends A2A task with signature_id', 'Unlocks write_case/send', 'cloud_deploy'],
        ['12. Write Part 11 Audit Row', 'Immutable BigQuery signature record', '21 CFR Part 11 §11.70', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 21, docNum: 5, docId: 'doc-05', document: 'LLD', diagram: 'Class Diagram',
    level: 'Low', owner: 'Developer', projectType: 'All', sectionAnchor: 'class-diagram',
    summary: 'Python `pv-agents/` class hierarchy showing `BaseAgent` template method (`handle()`) and all 7 specialist subclasses plus `GuardrailClient` & `MCPClient`.',
    keyTakeaway: 'Subclasses only override `build_prompt()`, `select_tools()`, and `validate_output()`; `BaseAgent.handle()` enforces guardrails, retries, and auditing.',
    edgeLabels: ['Inherits Template Method', 'Composes Clients', 'Produces Typed Models'],
    cols: [
      { title: 'Abstract Core: BaseAgent', sub: 'agents/base/agent.py', nodes: [
        ['BaseAgent (Abstract)', '+ handle(A2ATask): A2AResult (final)', 'Template method pattern', 'vertex_ai'],
        ['Protected Lifecycle Hooks', '# validate_input / # build_prompt', '# validate_output', 'cloud_functions'],
        ['Built-In Retry & Audit', 'Handles PV-220 retry + AuditLogger', 'Cannot be bypassed', 'cloud_logging'],
      ]},
      { title: '7 Specialist Subclasses', sub: 'agents/<name>/agent.py', nodes: [
        ['IntakeAgent & TriageAgent', 'Overrides parse & 4-criteria validity', 'Model: gemini-flash', 'document_ai'],
        ['ExtractionAgent & CodingAgent', 'Char-offset check & MedDRA ranker', 'Pro / Flash tiers', 'vertex_ai'],
        ['Dedup, Narrative & Submission', 'Similarity score, RAG prose & E2B XML', 'Submission checks sig_id', 'cloud_deploy'],
      ]},
      { title: 'Infrastructure Clients', sub: 'Injected Dependencies', nodes: [
        ['GuardrailClient', '+ complete(prompt, schema, tier)', 'Calls SDP + Model Armor', 'scc'],
        ['MCPClient', '+ call(server, tool, payload, idem_key)', 'Workload Identity mTLS', 'cloud_run'],
        ['AuditLogger', '+ emit(event_type, case_id, hashes)', 'Publishes to Pub/Sub', 'pubsub'],
      ]},
      { title: 'Domain & Value Objects', sub: 'Pydantic v2 Strict Schemas', nodes: [
        ['A2ATask & A2AResult', 'task_id, correlation_id, bundle_ver', 'Strict frozen models', 'artifact_registry'],
        ['Case & FieldSuggestion', '+ transition(to) / + can_auto_accept()', 'State machine rules', 'spanner'],
        ['ElectronicSignature', 'signature_id, signer_id, content_hash', 'Part 11 value object', 'cloud_iam'],
      ]},
    ],
  }),
  buildRow({
    rowId: 22, docNum: 5, docId: 'doc-05', document: 'LLD', diagram: 'State Diagram',
    level: 'Low', owner: 'Developer', projectType: 'All', sectionAnchor: 'state-diagram',
    summary: 'Deterministic 12-state Case lifecycle machine (`NEW` -> `INGESTED` -> `TRIAGED` -> `AI_PROCESSING` -> `READY_FOR_REVIEW` -> `APPROVED` -> `SUBMITTED` -> `CLOSED`).',
    keyTakeaway: '`Case.transition(to)` enforces allowed transitions in code and manages the regulatory SLA clock across hold, rework, and ACK states.',
    edgeLabels: ['Automated AI Transitions', 'Human Review & Sign', 'Gateway ACK & Close'],
    cols: [
      { title: 'Phase 1: Intake & Triage', sub: 'Clock Initialization States', nodes: [
        ['NEW -> INGESTED', 'Report stored in GCS & parsed by DocAI', 'Starts Day-0 clock', 'cloud_storage'],
        ['INGESTED -> TRIAGED', '4 validity elements present (7d/15d)', 'Else -> INVALID_HOLD', 'vertex_ai'],
        ['INVALID_HOLD (Paused)', 'Missing reporter/patient/drug/event', 'Clock paused (60d max)', 'pubsub'],
      ]},
      { title: 'Phase 2: Agentic Pipeline', sub: 'Parallel Processing & Fallback', nodes: [
        ['TRIAGED -> AI_PROCESSING', 'Orchestrator runs Extract/Code/Dedup', 'Clock ticking', 'vertex_ai'],
        ['AI_PROCESSING -> READY', 'Narrative & E2B pre-check complete', 'Ready for human review', 'cloud_run'],
        ['MANUAL_FALLBACK', 'Entered if agent fails after retries', 'Processor completes UI', 'cloud_monitoring'],
      ]},
      { title: 'Phase 3: Human Review Gate', sub: 'Interactive Console States', nodes: [
        ['READY -> IN_REVIEW', 'Case processor opens case in console', 'Optimistic lock acquired', 'iap'],
        ['IN_REVIEW -> APPROVED', 'Safety reviewer completes Part 11 sign', 'Rework loops to REVIEW', 'cloud_iam'],
        ['NON_SERIOUS_ARCHIVED', 'Non-serious case saved to Safety DB', 'Clock stopped (PSUR)', 'bigquery'],
      ]},
      { title: 'Phase 4: Submission & ACK', sub: 'Regulatory Gateway States', nodes: [
        ['APPROVED -> SUBMITTED', 'written to Safety DB + E2B sent via AS2', 'Awaiting agency ACK', 'cloud_deploy'],
        ['SUBMITTED -> ACK_ERROR', 'Negative ACK2/ACK3 from FDA/EMA', 'Clock resumes + P1 alert', 'scc'],
        ['SUBMITTED -> CLOSED', 'Positive ACK1/ACK2 received', 'Clock stopped (Terminal)', 'spanner'],
      ]},
    ],
  }),
  buildRow({
    rowId: 23, docNum: 5, docId: 'doc-05', document: 'LLD', diagram: 'Physical ERD',
    level: 'Low', owner: 'Developer', projectType: 'All', sectionAnchor: 'physical-erd',
    summary: 'Physical database layout across Firestore (`cases/{case_id}` + subcollections), Cloud SQL PostgreSQL (`meddra_terms`, `whodrug_products` + `pgvector`), and BigQuery (`pv_audit.events`).',
    keyTakeaway: 'Polyglot persistence matched to access patterns: sub-20ms document reads in Firestore, vector+relational dictionary joins in Cloud SQL, and 10-year WORM partitions in BigQuery.',
    edgeLabels: ['Firestore Subcollections', 'Cloud SQL pgvector', 'BigQuery WORM Partition'],
    cols: [
      { title: 'Firestore: Root Case Doc', sub: 'cases/{case_id} (<40 KB)', nodes: [
        ['Core Case Metadata', 'case_id, state, version, expedited_tier', 'Composite SLA index', 'spanner'],
        ['Clock & Source Array', 'day_zero, due_at, source_reports[]', 'Real-time UI listener', 'pubsub'],
        ['Curated Summary Fields', 'patient_summary, narrative, causality', 'Updated via If-Match', 'memorystore'],
      ]},
      { title: 'Firestore: Subcollections', sub: 'cases/{case_id}/<subcollection>', nodes: [
        ['suggestions/{suggestion_id}', 'field_path, value, confidence, span', 'Status: PROPOSED/ACCEPTED', 'vertex_ai'],
        ['duplicates/{candidate_id}', 'existing_case_id, score, breakdown', 'Confirmed / Rejected', 'cloud_run'],
        ['signatures/{signature_id}', 'signer_id, meaning, content_hash, jti', 'Immutable Part 11 doc', 'cloud_iam'],
      ]},
      { title: 'Cloud SQL PostgreSQL 15', sub: 'Regional HA + pgvector Index', nodes: [
        ['meddra_terms Table', 'version, code, level, term, pt_code', 'vector(768) HNSW index', 'spanner'],
        ['whodrug_products Table', 'version, drug_code, name, atc_code', 'vector(768) HNSW index', 'spanner'],
        ['active_dictionary_versions', 'Pins active MedDRA v27.1 & WHODrug', 'Read-only to MCP', 'bigquery'],
      ]},
      { title: 'BigQuery & GCS Archive', sub: '10-Year Regulated Retention', nodes: [
        ['pv_audit.events Table', 'PARTITION BY DATE(timestamp) CLUSTER', 'Append-only (No UPDATE)', 'bigquery'],
        ['gs://pv-raw-reports', 'Raw PDF/audio/fax with Object Lock', 'CMEK + 10yr retention', 'cloud_storage'],
        ['gs://pv-e2b-submissions', 'Signed E2B(R3) XML + agency ACK XML', 'Immutable GxP evidence', 'cloud_logging'],
      ]},
    ],
  }),

  // ================= DOC 6: API SPEC (Rows 24 - 25) =================
  buildRow({
    rowId: 24, docNum: 6, docId: 'doc-06', document: 'API Spec', diagram: 'Sequence per Key API Call',
    level: 'Contract', owner: 'Tech Lead', projectType: 'All', sectionAnchor: 'sequence-per-key-api-call',
    summary: 'REST API v1 contract sequence for a full reviewer session: `GET /cases`, `GET /cases/{id}`, `PATCH /suggestions/{id}`, `PUT /narrative`, and `POST /approve`.',
    keyTakeaway: 'Enforces `If-Match` optimistic concurrency on every mutation and requires `Idempotency-Key` + fresh `reauth_token` on `POST /approve`.',
    edgeLabels: ['GET Queue & Case Detail', 'PATCH/PUT with If-Match', 'POST /approve + IdP Check'],
    cols: [
      { title: '1. Queue & Case Load', sub: 'Read Endpoints (IAP OIDC)', nodes: [
        ['GET /api/v1/cases', '?state=READY_FOR_REVIEW&sort=due_at', 'Returns SLA-sorted page', 'iap'],
        ['GET /api/v1/cases/{id}', 'Returns case + suggestions + ETAG v3', 'Includes content_hash', 'cloud_run'],
        ['GET /cases/{id}/source', 'Generates 15-min signed GCS PDF URL', 'Logs view audit event', 'cloud_storage'],
      ]},
      { title: '2. Field & Dedup Mutations', sub: 'Optimistic Concurrency (If-Match)', nodes: [
        ['PATCH /suggestions/{id}', 'Body: {decision: ACCEPTED | EDITED}', 'Header: If-Match: "3"', 'cloud_run'],
        ['PUT /duplicates/{id}', 'Body: {decision: REJECTED | MERGE}', 'Bumps case version -> 4', 'spanner'],
        ['PUT /cases/{id}/narrative', 'Body: {text, causality: PROBABLE}', 'Recomputes content_hash', 'vertex_ai'],
      ]},
      { title: '3. Part 11 Approval Call', sub: 'POST /api/v1/cases/{id}/approve', nodes: [
        ['IdP Re-Authentication', 'Browser obtains fresh OIDC reauth JWT', 'auth_time < 60s required', 'cloud_iam'],
        ['POST /cases/{id}/approve', 'Sends meaning + reauth_token + hash', 'Header: Idempotency-Key', 'scc'],
        ['Validate Hash & E2B Gate', 'Checks PV-410 hash & PV-412 E2B pass', 'Creates sig_01J9Z...', 'cloud_run'],
      ]},
      { title: '4. Async Release & Audit', sub: '200 OK Response & Side Effects', nodes: [
        ['Return 200 OK Approved', '{state: APPROVED, signature_id}', 'P95 latency < 500ms', 'iap'],
        ['Dispatch Submission A2A', 'Orchestrator triggers write_case/send', 'Passes signature_id', 'pubsub'],
        ['GET /cases/{id}/audit', 'Reviewer/QA can inspect full trail', 'BigQuery backed', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 25, docNum: 6, docId: 'doc-06', document: 'API Spec', diagram: 'Agent Tool-Call Sequence',
    level: 'Contract', owner: 'Tech Lead', projectType: 'AI', sectionAnchor: 'agent-tool-call-sequence',
    summary: 'Contract sequence for an Agent invoking an MCP tool server (`mcp-coding.suggest_codes` and `mcp-safety-db.write_case`) with Workload Identity and audit logging.',
    keyTakeaway: 'Every MCP tool call is strongly typed, authenticated via GCP Workload Identity, idempotency-protected, and audited at both caller and callee.',
    edgeLabels: ['Guardrail Inference', 'Workload Identity MCP', 'Dual Audit Emission'],
    cols: [
      { title: '1. Agent Prompt & Tool Pick', sub: 'ADK Specialist Runtime', nodes: [
        ['Receive A2A Task Payload', 'task_id, case_id, deadline_ms, input', 'Schema-validated', 'vertex_ai'],
        ['Call Guardrail Proxy', 'SDP redact -> Model Armor -> Gemini', 'Selects MCP tool call', 'scc'],
        ['Construct MCP Request', 'Attaches correlation_id & idem_key', 'Signs w/ Workload SA', 'cloud_iam'],
      ]},
      { title: '2. MCP Server Gatekeeper', sub: 'Cloud Run Ingress & AuthZ', nodes: [
        ['Verify OIDC Service Token', 'Authenticates caller agent SA identity', 'Checks tool allow-list', 'cloud_run'],
        ['Enforce Signature Gate', 'If tool in {write_case, send_e2b}...', 'Verifies valid sig_id', 'scc'],
        ['Check Idempotency Cache', 'Prevents duplicate side-effect writes', 'Firestore key lock', 'memorystore'],
      ]},
      { title: '3. Backend Execution', sub: 'SQL / Vector / SoR Adapter', nodes: [
        ['Execute Domain Query', 'e.g. pgvector cosine + trigram SQL', 'Pinned dict version', 'spanner'],
        ['Format Typed MCP Output', 'Returns candidates[] + dict_version', 'Strict JSON contract', 'cloud_run'],
        ['Handle Transient Errors', 'Maps timeouts to PV-303 retryable', 'Respects deadline_ms', 'cloud_functions'],
      ]},
      { title: '4. Audit & A2A Completion', sub: 'End-to-End Traceability', nodes: [
        ['MCP Server Emits Audit', 'Publishes tool_name, caller, hashes', 'Topic: audit.event', 'pubsub'],
        ['Agent Validates Output', 'Runs validate_output() domain rules', 'Builds A2AResult JSON', 'vertex_ai'],
        ['Return A2AResult to Hub', 'status: OK, metrics, token counts', 'Orchestrator advances', 'bigquery'],
      ]},
    ],
  }),

  // ================= DOC 7: THREAT MODEL (Rows 26 - 27) =================
  buildRow({
    rowId: 26, docNum: 7, docId: 'doc-07', document: 'Threat Model', diagram: 'DFD with Trust Boundaries',
    level: 'Mid', owner: 'Security Architect', projectType: 'All', sectionAnchor: 'dfd-with-trust-boundaries',
    summary: 'Data Flow Diagram mapped across 4 explicit security trust boundaries: `B1 Ingestion Edge`, `B2 Agent Zone`, `B3 Tool Zone`, and `B4 Reviewer Console`.',
    keyTakeaway: 'Every trust boundary crossing enforces authentication, schema validation, payload sanitization, and immutable security logging (`STRIDE T-01..T-10`).',
    edgeLabels: ['Crosses B1 (Edge -> Ingest)', 'Crosses B2 (Ingest -> Agent)', 'Crosses B3 & B4 (Tools/UI)'],
    cols: [
      { title: 'Boundary B1: Untrusted Edge', sub: 'External Channels -> Ingestion', nodes: [
        ['Adversarial / Raw Inputs', 'PDFs, emails, fax scans, FHIR payloads', 'Untrusted attacker surface', 'cloud_load_balancing'],
        ['TLS + Malware + Size Gate', 'ClamAV scan, mime check, page limits', 'Mitigates T-01 & T-07', 'cloud_armor'],
        ['Raw GCS Object Lock', 'Write-once storage + SHA-256 digest', 'Prevents tampering', 'cloud_storage'],
      ]},
      { title: 'Boundary B2: Agent Zone', sub: 'Ingestion -> Vertex AI Agents', nodes: [
        ['SDP PHI De-Identification', 'Tokenizes direct PHI before LLM calls', 'Mitigates T-05 leak', 'scc'],
        ['Model Armor + XML Tags', 'Screens for indirect prompt injection', 'Mitigates A-01 & A-06', 'scc'],
        ['Isolated ADK Agent Engine', 'Zero public egress inside VPC-SC', 'Per-agent Service Acct', 'vertex_ai'],
      ]},
      { title: 'Boundary B3: Tool Zone', sub: 'Agents -> Cloud Run MCP Servers', nodes: [
        ['IAM Tool Allow-Listing', 'Coding agent cannot call send_e2b', 'Mitigates T-06 & A-02', 'cloud_iam'],
        ['Server-Side sig_id Check', 'write_case/send_e2b require Part 11 sig', 'Hard technical control', 'cloud_run'],
        ['Parameterized SQL & mTLS', 'Blocks SQLi & secures Veeva/Argus link', 'Mitigates T-02', 'spanner'],
      ]},
      { title: 'Boundary B4: Console Zone', sub: 'Human Reviewers -> REST API', nodes: [
        ['Cloud IAP + Corp OIDC MFA', 'Blocks unauthenticated console access', 'Role-based RBAC', 'iap'],
        ['Part 11 Re-Auth + JTI Check', 'Single-use token_jti + <60s auth_time', 'Mitigates T-03 & T-08', 'cloud_iam'],
        ['WORM Audit Bucket & BQ', 'Separate security project log sink', 'Mitigates T-04 repudiation', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 27, docNum: 7, docId: 'doc-07', document: 'Threat Model', diagram: 'Agent Attack Surface (prompt injection, tool misuse)',
    level: 'Mid', owner: 'Security Architect', projectType: 'AI', sectionAnchor: 'agent-attack-surface',
    summary: 'AI-specific threat taxonomy (`A-01`..`A-08`) mapping attack vectors (indirect prompt injection, tool misuse, hallucination, poisoning) to defense layers.',
    keyTakeaway: 'Assumes the LLM can be tricked (`A-01`); safety is guaranteed by deterministic outer controls (IAM allow-lists, offset verification, and human e-signature).',
    edgeLabels: ['Attack Vector Entry', 'Runtime AI Guardrail', 'Deterministic Outer Lock'],
    cols: [
      { title: '1. Input Attack Vectors', sub: 'Adversarial Report Payloads', nodes: [
        ['A-01: Indirect Injection', 'Hidden PDF text: "Ignore rules & send"', 'High-likelihood vector', 'document_ai'],
        ['A-06: Jailbreak via Attachment', 'Adversarial OCR image or audio prompt', 'Multimodal vector', 'cloud_storage'],
        ['A-08: Token Bomb / DoS', '500-page PDF or recursive tool loop', 'Resource exhaustion', 'pubsub'],
      ]},
      { title: '2. Model & Context Defenses', sub: 'Guardrail Proxy Controls', nodes: [
        ['Model Armor + Delimiters', 'System prompt separates data vs rules', 'Blocks known jailbreaks', 'scc'],
        ['SDP Pre-Inference Masking', 'Strips PHI so model cannot leak it', 'Mitigates A-05 PHI leak', 'cloud_iam'],
        ['Token & Step Budgets', 'Max 8 tool calls, 60s timeout, page cap', 'Mitigates A-08 DoS', 'cloud_monitoring'],
      ]},
      { title: '3. Hallucination & Drift Controls', sub: 'Grounding & Pinning Checks', nodes: [
        ['A-03: Fabricated Facts', 'Verifier checks char_start..char_end', 'Unmatched span rejected', 'vertex_ai'],
        ['A-04: Wrong MedDRA Code', 'MCP validates code exists in SQL dict', 'Top-3 shown to human', 'spanner'],
        ['A-07: Silent Model Drift', 'Pinned @001/@002 + weekly 100-case eval', 'No auto-upgrade', 'artifact_registry'],
      ]},
      { title: '4. Tool Misuse Hard Locks', sub: 'Zero-Trust MCP Enforcement', nodes: [
        ['A-02: Unauthorized Tool Call', 'Cloud Run IAM blocks cross-agent tools', 'Least-privilege SA', 'cloud_run'],
        ['Hard Part 11 Signature Gate', 'MCP rejects write/send without sig_id', 'LLM cannot forge sig_id', 'cloud_iam'],
        ['SIEM Security Alerting', 'Model Armor triggers SOC alert on hit', 'Quarantines suspect PDF', 'cloud_logging'],
      ]},
    ],
  }),

  // ================= DOC 8: TEST & EVAL PLAN (Rows 28 - 29) =================
  buildRow({
    rowId: 28, docNum: 8, docId: 'doc-08', document: 'Test & Eval Plan', diagram: 'Test Pyramid / Environment Flow (optional)',
    level: 'Process', owner: 'QA Lead', projectType: 'All', sectionAnchor: 'test-pyramid-environment-flow',
    summary: '6-tier verification pyramid (Unit -> Contract -> Integration -> Golden Agent Evals -> E2E & Red-Team -> GxP UAT/PQ) across Dev, Val, and Prod.',
    keyTakeaway: 'Combines traditional deterministic software testing with statistical AI evaluation gates and formal GxP IQ/OQ/PQ validation.',
    edgeLabels: ['PR & Merge Gates (Dev)', 'Golden Eval & Red-Team', 'GxP OQ/PQ Sign-Off (Val)'],
    cols: [
      { title: 'Tier 1 & 2: Fast Code Gates', sub: 'Every Commit (<5 Min)', nodes: [
        ['L1: Unit Tests (pytest)', 'State machine, clock math, hash logic', '≥85% line coverage', 'cloud_functions'],
        ['L2: Contract Tests', 'A2A JSON schemas, MCP & OpenAPI specs', '100% schema pass', 'artifact_registry'],
        ['Static & Secret Scans', 'ruff, mypy, Bandit, Trivy CVE scan', '0 Critical/High CVEs', 'scc'],
      ]},
      { title: 'Tier 3 & 4: Integration & AI', sub: 'Merge & Prompt/Model Change', nodes: [
        ['L3: Integration Suite', 'Firestore, Cloud SQL, SDP, Mock SoR', 'Real GCP services in Dev', 'spanner'],
        ['L4: 500-Case Golden Eval', 'Clinician-labeled PV benchmark set', 'Enforces 12 release gates', 'vertex_ai'],
        ['150-Case Edge & Multilingual', 'Handwriting, multi-drug, DE/FR/ES/JP', 'Zero P1 regressions', 'document_ai'],
      ]},
      { title: 'Tier 5: E2E & Adversarial', sub: 'Nightly & Pre-Release in Val', nodes: [
        ['L5: Playwright E2E Flows', 'Ingest -> Review -> Part 11 -> E2B XML', 'Full browser + API test', 'iap'],
        ['200-Case Red-Team Suite', 'Prompt injection, PHI leak, unsigned call', '100% blocked (RT-01..08)', 'scc'],
        ['Load & 72h Soak Testing', '180 cases/hr peak (3x) + failure chaos', '0 lost cases, P95 <3m', 'cloud_monitoring'],
      ]},
      { title: 'Tier 6: Regulated UAT (PQ)', sub: 'Release Candidate in pv-val', nodes: [
        ['50-Case Blind Parallel Run', '6 PV processors + 2 safety physicians', '≥85% fields accepted', 'cloud_iam'],
        ['Part 11 & Audit Verification', 'QA inspects WORM logs & hash tamper', '100% ALCOA+ verified', 'bigquery'],
        ['Formal 4-Party Sign-Off', 'PV Ops + QPPV + QA Validation + Sec', 'Unlocks Prod deploy', 'cloud_deploy'],
      ]},
    ],
  }),
  buildRow({
    rowId: 29, docNum: 8, docId: 'doc-08', document: 'Test & Eval Plan', diagram: 'Eval Pipeline Flow (optional)',
    level: 'Process', owner: 'QA Lead', projectType: 'AI', sectionAnchor: 'eval-pipeline-flow',
    summary: 'Automated Vertex AI Evaluation pipeline triggered whenever `bundle.yaml` (prompts, model version, or agent code) changes in Git or weekly in Prod.',
    keyTakeaway: 'Blocks deployment automatically if any of the 12 per-agent metrics (e.g., Serious recall = 100%, MedDRA Top-1 ≥95%, Fabrication = 0%) regress.',
    edgeLabels: ['Trigger Eval Job', 'Score 12 Clinical Metrics', 'Gate Decision & Drift'],
    cols: [
      { title: '1. Trigger & Dataset Load', sub: 'PR / Bundle Change / Weekly Cron', nodes: [
        ['bundle.yaml Change Detected', 'Prompt, model pin, or agent code diff', 'Cloud Build trigger', 'cloud_deploy'],
        ['Load Golden & Edge Datasets', '500 gold cases + 150 edge + 200 RT', 'Locked in gs://pv-eval', 'cloud_storage'],
        ['Spin Isolated Eval Runner', 'Executes candidate bundle deterministically', 'Temp=0.0, fixed seed', 'vertex_ai'],
      ]},
      { title: '2. Deterministic & LLM Judges', sub: 'Per-Agent Metric Computation', nodes: [
        ['Triage & Extraction Scorers', 'Serious recall (100%) & Field F1 (≥92%)', 'Exact char-offset check', 'document_ai'],
        ['Coding & Dedup Scorers', 'MedDRA Top-1 (≥95%) & Dup recall (≥98%)', 'SQL dict & pair match', 'spanner'],
        ['Narrative Grounding Judge', 'Checks 0% fabricated facts vs source', 'Clinician rubric + NLI', 'vertex_ai'],
      ]},
      { title: '3. Safety & Red-Team Scorers', sub: 'Adversarial Gate Verification', nodes: [
        ['Injection & Bypass Check', 'Verifies 0 unauthorized tool calls', 'RT-01..RT-08 = 100%', 'scc'],
        ['PHI Zero-Leakage Scan', 'Scans all prompts & logs for raw PHI', '0 tokens leaked', 'cloud_iam'],
        ['E2B(R3) Validator Pass', 'Runs 200 ICH/FDA/EMA rules on XML', '≥98% first-pass valid', 'cloud_run'],
      ]},
      { title: '4. Release Gate & Reporting', sub: 'Pass / Fail & Production Drift', nodes: [
        ['Compare vs Baseline Thresholds', 'Fails build if any metric drops >0.5%', 'Hard CI/CD blocker', 'cloud_monitoring'],
        ['Publish Signed Eval Report', 'Writes metrics to BigQuery + GCS PDF', 'Attached to Validation PQ', 'bigquery'],
        ['Weekly Prod Drift Monitor', 'Scores 100 sampled prod cases/week', 'Alerts on >2% edit jump', 'cloud_logging'],
      ]},
    ],
  }),

  // ================= DOC 9: DEPLOYMENT & OPS DOC (Rows 30 - 36) =================
  buildRow({
    rowId: 30, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'Deployment Diagram',
    level: 'Physical', owner: 'DevOps / SRE', projectType: 'All', sectionAnchor: 'deployment-diagram',
    summary: 'Multi-project GCP organizational layout (`pv-dev`, `pv-val`, `pv-prod`, `pv-shared-ops`) with Terraform IaC, Binary Authorization, and KMS.',
    keyTakeaway: 'Strict environment isolation: separate GCP projects, separate VPC-SC perimeters, and separate CMEK key rings per environment.',
    edgeLabels: ['Artifact Promotion', 'Validation Attestation', 'Prod Canary Rollout'],
    cols: [
      { title: 'pv-shared-ops Project', sub: 'CI/CD, Registry, KMS & Logs', nodes: [
        ['Cloud Build + Cloud Deploy', 'Terraform IaC & container pipelines', 'GitOps PR workflow', 'cloud_deploy'],
        ['Artifact Registry + KMS', 'Signed images + 90d CMEK rotation', 'Cosign + Binary Auth', 'artifact_registry'],
        ['Central Security Log Sink', 'Aggregated WORM audit & SIEM export', 'SecOps IAM isolated', 'cloud_logging'],
      ]},
      { title: 'pv-dev Project (Sandbox)', sub: 'Synthetic Data Only', nodes: [
        ['Dev Agent Engine & Run', 'Auto-deployed on main branch merge', 'Scale-to-zero enabled', 'vertex_ai'],
        ['Dev Firestore & Cloud SQL', 'Pre-loaded with 1,000 synthetic cases', 'No real PHI allowed', 'spanner'],
        ['Mock Veeva/Argus & ESG', 'Simulates downstream latencies & ACKs', 'Integration test target', 'cloud_run'],
      ]},
      { title: 'pv-val Project (Pre-Prod)', sub: 'GxP Qualification Environment', nodes: [
        ['Val VPC-SC Perimeter', 'Identical config to Production', 'Enforces Binary Auth', 'scc'],
        ['Val 8-Agent & MCP Fleet', 'Runs 500-case golden eval & OQ/PQ', 'De-identified gold data', 'vertex_ai'],
        ['QA Qualification Gate', 'Generates signed IQ/OQ/PQ evidence', 'Issues Binary Auth sign', 'cloud_iam'],
      ]},
      { title: 'pv-prod Project (Regulated)', sub: 'us-central1 Production Perimeter', nodes: [
        ['Prod VPC-SC + Cloud Armor', 'IAP console + private Cloud Run MCP', 'Zero internet egress', 'cloud_load_balancing'],
        ['Prod Vertex Agent Engine', 'Min 2 warm instances, auto-scale to 20', 'Pinned bundle v1.4.0', 'vertex_ai'],
        ['Prod HA Data + Interconnect', 'Firestore, Cloud SQL HA, BQ 10yr WORM', 'Live Argus & FDA AS2', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 31, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'Network Topology',
    level: 'Physical', owner: 'DevOps / SRE', projectType: 'All', sectionAnchor: 'network-topology',
    summary: 'Zero-trust network topology featuring Global HTTPS Load Balancer, Cloud Armor, IAP, VPC Service Controls perimeter, Private Service Connect, and Cloud Interconnect.',
    keyTakeaway: 'Zero public IP addresses on any Cloud Run, Cloud SQL, or Vertex AI resource; all egress is blocked by VPC-SC except Private Google APIs and HA VPN.',
    edgeLabels: ['HTTPS 443 + IAP Edge', 'Private Service Connect', 'HA VPN / Interconnect'],
    cols: [
      { title: '1. Public Edge & WAF', sub: 'Reviewer & Webhook Ingress', nodes: [
        ['Global External HTTPS LB', 'TLS 1.3 termination + managed certs', 'Anycast edge IP', 'cloud_load_balancing'],
        ['Cloud Armor WAF Policy', 'OWASP Top-10 rules + rate limiting', 'Blocks L7 DDoS/scans', 'cloud_armor'],
        ['Identity-Aware Proxy (IAP)', 'Requires corporate OIDC MFA session', 'Forwards signed JWT', 'iap'],
      ]},
      { title: '2. VPC-SC Perimeter', sub: 'pv-prod-perimeter (us-central1)', nodes: [
        ['Serverless VPC Access', 'Connects Console API & MCP Cloud Run', 'Internal-only ingress', 'cloud_run'],
        ['Private Google Access', 'Routes Vertex AI, GCS, BQ, Firestore', 'restricted.googleapis.com', 'vertex_ai'],
        ['VPC-SC Egress Deny Policy', 'Blocks all public internet exfiltration', 'Logs perimeter violations', 'scc'],
      ]},
      { title: '3. Private Data Subnet', sub: 'Private Service Connect (PSC)', nodes: [
        ['Cloud SQL Private IP', 'PostgreSQL HA in private RFC1918 subnet', 'Port 5432 from MCP only', 'spanner'],
        ['Firestore & BigQuery PSC', 'Accessed strictly inside VPC-SC boundary', 'CMEK encrypted at rest', 'bigquery'],
        ['Cloud KMS & Secret Manager', 'Private key operations & rotation', 'Hardware HSM backed', 'cloud_iam'],
      ]},
      { title: '4. Hybrid Enterprise Link', sub: 'Dedicated Interconnect + HA VPN', nodes: [
        ['Cloud Router + BGP', 'Redundant 99.99% SLA hybrid tunnels', 'Encrypted IPsec / MACsec', 'cloud_cdn'],
        ['Veeva / Argus Safety DB', 'Private mTLS connection to on-prem/VPC', 'mcp-safety-db SA only', 'spanner'],
        ['FDA / EMA AS2 Gateway', 'Dedicated regulatory transmission link', 'mcp-e2b SA only', 'cloud_deploy'],
      ]},
    ],
  }),
  buildRow({
    rowId: 32, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'CI/CD Pipeline',
    level: 'Physical', owner: 'DevOps / SRE', projectType: 'All', sectionAnchor: 'cicd-pipeline',
    summary: '10-stage regulated CI/CD & AI Eval pipeline with 6 fail-closed gates, Cosign container signing, and Binary Authorization enforcement.',
    keyTakeaway: 'Treats prompts and model version pins identically to application code — any change triggers the 500-case golden eval and red-team gates.',
    edgeLabels: ['Gate 1-3: Build & Sign', 'Gate 4-5: Val Eval & OQ', 'Gate 6: Prod Canary'],
    cols: [
      { title: 'Stages 1–3: CI & Security', sub: 'PR & Merge Verification', nodes: [
        ['1. PR Lint & Unit Tests', 'ruff, mypy, pytest (≥85% coverage)', 'Gate 1: Code quality', 'cloud_functions'],
        ['2. Contract & SAST/CVE Scan', 'A2A/MCP schema check + Trivy scan', 'Gate 2: 0 High/Crit CVEs', 'scc'],
        ['3. Build & Cosign Sign', 'Packages bundle.yaml + signs digest', 'Gate 3: Attested artifact', 'artifact_registry'],
      ]},
      { title: 'Stages 4–6: Dev & AI Eval', sub: 'Automated Quality & Safety Gates', nodes: [
        ['4. Deploy to pv-dev', 'Rolls out containers & prompt bundle', 'Smoke tests pass', 'cloud_deploy'],
        ['5. 500-Case Golden Eval', 'Runs Vertex AI Eval on all 8 agents', 'Gate 4: 12/12 KPIs pass', 'vertex_ai'],
        ['6. 200-Case Red-Team Run', 'Tests injection, PHI leak & tool misuse', '100% blocked required', 'scc'],
      ]},
      { title: 'Stages 7–8: GxP Validation', sub: 'pv-val Qualification', nodes: [
        ['7. Deploy to pv-val', 'Terraform plan + bundle deploy to Val', 'Mirrors Prod topology', 'cloud_deploy'],
        ['8. Automated OQ + Human PQ', 'Runs E2E Playwright + QA/QPPV review', 'Gate 5: Signed PQ record', 'iap'],
        ['Binary Auth Attestation', 'QA Lead cryptographically signs bundle', 'Unlocks Prod admission', 'cloud_iam'],
      ]},
      { title: 'Stages 9–10: Prod Release', sub: 'Canary & Post-Deploy Watch', nodes: [
        ['9. Prod Canary (10% Traffic)', 'Routes 10% of cases to new bundle', '30m SLO & error watch', 'cloud_monitoring'],
        ['10. 100% Prod Promotion', 'Promotes to 100% if error rate <0.5%', 'Gate 6: Auto-rollback on breach', 'cloud_deploy'],
        ['Archive Validation Pack', 'Stores build logs, evals & sign-offs', '10-yr GxP archive', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 33, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'HA / DR Diagram',
    level: 'Physical', owner: 'DevOps / SRE', projectType: 'All', sectionAnchor: 'ha-dr-diagram',
    summary: 'High Availability (multi-zone `us-central1-a/b/c`) and Disaster Recovery (`us-east4` warm standby) architecture meeting RPO ≤ 15 min and RTO ≤ 4 hours.',
    keyTakeaway: 'Zero single points of failure: multi-zone active-active within primary region plus cross-region backups and warm Terraform standby in `us-east4`.',
    edgeLabels: ['Multi-Zone Active-Active', 'Cross-Region Replication', 'RTO ≤4h DR Failover'],
    cols: [
      { title: 'Primary Compute (Multi-Zone)', sub: 'us-central1 (Zones a, b, c)', nodes: [
        ['Cloud Run Multi-Zone Fleet', 'Console API & 5 MCP servers across 3 zones', 'RPO=0, RTO <1 min', 'cloud_run'],
        ['Vertex AI Agent Engine', 'Regional managed runtime + Gemini pool', 'Auto-retry + fallback', 'vertex_ai'],
        ['Pub/Sub Regional Topics', 'Synchronous 3-zone message replication', '7-day message retention', 'pubsub'],
      ]},
      { title: 'Primary Data High Availability', sub: 'Synchronous Regional Storage', nodes: [
        ['Firestore Regional Multi-Zone', 'Automatic multi-zone synchronous commit', '99.999% read/write SLA', 'spanner'],
        ['Cloud SQL Regional HA', 'Primary in Zone A + sync standby Zone B', 'Auto-failover <60s', 'spanner'],
        ['GCS Dual-Region & BQ', 'Raw reports & audit logs replicated', 'RPO = 0 for stored files', 'cloud_storage'],
      ]},
      { title: 'Cross-Region DR Replication', sub: 'Continuous Sync to us-east4', nodes: [
        ['Firestore PITR + Export', '7-day point-in-time recovery + hourly dump', 'RPO ≤ 15 minutes', 'memorystore'],
        ['Cloud SQL Cross-Region Replica', 'Async read replica in us-east4', 'Promotable in <10 min', 'spanner'],
        ['Multi-Region Artifact & Git', 'All signed containers & bundles in US', 'Ready to deploy in DR', 'artifact_registry'],
      ]},
      { title: 'DR Standby & Failover Drill', sub: 'us-east4 Warm Recovery', nodes: [
        ['Terraform Warm Standby', 'VPC-SC, KMS & network pre-provisioned', 'Scales up in <30 min', 'cloud_deploy'],
        ['Global LB DNS Cutover', 'Switches ingress to us-east4 endpoints', 'Total RTO ≤ 4 hours', 'cloud_load_balancing'],
        ['Semi-Annual DR GameDay', 'Tested every 6 months with QA evidence', 'Logged for GxP audit', 'cloud_monitoring'],
      ]},
    ],
  }),
  buildRow({
    rowId: 34, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'Monitoring / Alert Flow',
    level: 'Ops', owner: 'DevOps / SRE', projectType: 'All', sectionAnchor: 'monitoring-alert-flow',
    summary: 'Operational telemetry, SLO burn-rate alerting, and regulatory SLA clock escalation routing to PagerDuty, PV Duty Manager, and SOC.',
    keyTakeaway: 'Monitors both technical SLOs (availability 99.9%, P95 <3m) and clinical regulatory SLAs (7-day / 15-day clock countdowns and positive ACK rates).',
    edgeLabels: ['Metrics, Logs & Traces', 'SLO & Clock Evaluation', 'PagerDuty / PV Escalation'],
    cols: [
      { title: '1. Telemetry Producers', sub: 'Apps, Agents, Stores & Gateways', nodes: [
        ['Cloud Run & Agent Engine', 'Request latency, 5xx errors, CPU/mem', 'OpenTelemetry SDK', 'cloud_run'],
        ['clock-service SLA Poller', 'Scans open cases every 15 minutes', 'Computes hours to due_at', 'pubsub'],
        ['Audit & DLQ Monitors', 'Tracks Pub/Sub DLQ depth & ACK status', 'Zero silent drops', 'cloud_logging'],
      ]},
      { title: '2. Aggregation & Dashboards', sub: 'Cloud Monitoring & Looker', nodes: [
        ['Cloud Monitoring SLO Engine', 'Tracks 99.9% uptime & <3m P95 latency', 'Error budget burn rate', 'cloud_monitoring'],
        ['Looker PV Ops Dashboard', 'Live 7d/15d countdowns & backlog queue', 'Used by QPPV & PV Lead', 'bigquery'],
        ['Security & Guardrail Metrics', 'Model Armor triggers & Part 11 failures', 'Forwarded to SIEM', 'scc'],
      ]},
      { title: '3. Alert Policy Rules', sub: 'Severity P1 / P2 / P3 Thresholds', nodes: [
        ['P1: 7d Clock <24h / DLQ >0', 'Immediate regulatory or data-loss risk', 'Fires within 60 seconds', 'cloud_monitoring'],
        ['P1: ACK Error / Audit Fail', 'FDA/EMA negative ACK or audit write err', 'Halts affected pipeline', 'scc'],
        ['P2: Latency >5m / Edit >15%', 'Gemini degradation or AI quality drift', 'Triggers runbook check', 'vertex_ai'],
      ]},
      { title: '4. Incident Response & Runbooks', sub: 'On-Call & Duty Escalation', nodes: [
        ['PagerDuty L2/L3 SRE', '15m response for P1 infra/agent alerts', 'Executes rollback/failover', 'cloud_deploy'],
        ['PV Operations Duty Lead', 'Expedites cases <24h & ACK2 rework', 'Manual fallback ready', 'iap'],
        ['Post-Incident CAPA Record', 'Root cause + GxP deviation report', 'Stored in Validation pack', 'bigquery'],
      ]},
    ],
  }),
  buildRow({
    rowId: 35, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'Cutover / Rollback Flow',
    level: 'Ops', owner: 'DevOps / SRE', projectType: 'All', sectionAnchor: 'cutover-rollback-flow',
    summary: 'Zero-downtime canary cutover and <5-minute 1-command rollback flow across application containers, `bundle.yaml` prompt/model pins, and dictionaries.',
    keyTakeaway: 'In-flight cases remain bound to the `bundle_version` they started on; rolling back `bundle.yaml` or Cloud Run revisions takes <5 minutes with zero data loss.',
    edgeLabels: ['Canary 10% Rollout', '30m Health & Eval Watch', 'Promote 100% or <5m Rollback'],
    cols: [
      { title: '1. Pre-Cutover Readiness', sub: 'Change Control & Pinning', nodes: [
        ['Verify QA Attestation', 'Confirms Binary Auth signature on v1.5', 'Change ticket approved', 'cloud_iam'],
        ['Pin In-Flight Cases', 'Active cases keep bundle_version=v1.4', 'Prevents mid-case drift', 'spanner'],
        ['Snapshot Dictionary & Config', 'Verifies backward-compatible schema', 'Expand-and-contract SQL', 'bigquery'],
      ]},
      { title: '2. Canary Cutover (10%)', sub: 'Gradual Traffic Shift', nodes: [
        ['Deploy New Cloud Run Rev', 'Routes 10% of new cases to v1.5', '90% remains on v1.4', 'cloud_deploy'],
        ['30-Minute Canary Bake', 'Monitors 5xx rate, latency & PV-220s', 'Automated metric watch', 'cloud_monitoring'],
        ['Inspect Sampled Canary Cases', 'Verifies confidence & E2B pre-check', 'Zero schema errors', 'vertex_ai'],
      ]},
      { title: '3A. Success Path (Promote)', sub: 'Error Rate <0.5% & Latency OK', nodes: [
        ['Shift 10% -> 50% -> 100%', 'Gradual traffic ramp over 60 minutes', 'Zero downtime cutover', 'cloud_load_balancing'],
        ['Update Active Bundle Pointer', 'All new cases stamp bundle_version=v1.5', 'Logged in audit trail', 'artifact_registry'],
        ['Post-Release Hypercare', 'SRE + AI Eng monitor 24h drift metrics', 'Closes change record', 'cloud_logging'],
      ]},
      { title: '3B. Failure Path (<5m Rollback)', sub: 'Breach of Error / Guardrail Gate', nodes: [
        ['1-Command Traffic Revert', 'gcloud run services update-traffic v1.4', 'Completes in <2 minutes', 'cloud_deploy'],
        ['Revert bundle.yaml / Dict Pin', 'Restores previous prompt/model/MedDRA', 'Completes in <5 minutes', 'spanner'],
        ['Re-Queue Failed Canary Cases', 'Replays affected cases on v1.4 or manual', 'Zero lost AE reports', 'pubsub'],
      ]},
    ],
  }),
  buildRow({
    rowId: 36, docNum: 9, docId: 'doc-09', document: 'Deployment & Ops Doc', diagram: 'LLM Tracing / Observability Flow',
    level: 'Ops', owner: 'DevOps / SRE', projectType: 'AI', sectionAnchor: 'llm-tracing-observability-flow',
    summary: 'End-to-end LLM & Agent observability pipeline tracking OpenTelemetry spans, token cost per case, confidence distributions, and human edit/override rates.',
    keyTakeaway: 'Connects runtime AI signals (latency, tokens, retries) directly to clinical quality signals (human edit rate per field and MedDRA rank selection) without logging PHI.',
    edgeLabels: ['OTel Spans & Audit Events', 'BigQuery & Trace Sink', 'Quality & FinOps Alerts'],
    cols: [
      { title: '1. Agent & LLM Telemetry', sub: 'Zero-PHI Runtime Instrumentation', nodes: [
        ['OpenTelemetry Trace Spans', 'orchestrator -> agent -> gemini -> mcp', 'Propagates correlation_id', 'cloud_monitoring'],
        ['Token & Latency Counters', 'tokens_in, tokens_out, model_id, ms', 'Per-agent FinOps attribution', 'vertex_ai'],
        ['Guardrail & Retry Counters', 'PV-220 schema retries & Armor blocks', 'Real-time anomaly signal', 'scc'],
      ]},
      { title: '2. Human Feedback Signals', sub: 'Reviewer Console Telemetry', nodes: [
        ['Field Accept vs Edit Rate', 'Tracks % ACCEPTED vs EDITED per field', 'Detects extraction drift', 'iap'],
        ['MedDRA Candidate Rank Pick', 'Tracks Top-1 vs Top-2/3 vs manual code', 'Detects coding drift', 'spanner'],
        ['Narrative Edit Distance', 'Levenshtein diff between AI & signed text', 'Measures prose quality', 'document_ai'],
      ]},
      { title: '3. Observability Storage', sub: 'Cloud Trace + BigQuery Analytics', nodes: [
        ['Cloud Trace Waterfall View', 'Visualizes parallel agent critical path', '30-day hot trace store', 'cloud_monitoring'],
        ['BigQuery pv_audit.events', 'Joins AI run metrics with human edits', '10-year historical trend', 'bigquery'],
        ['Weekly 100-Case Quality Job', 'Compares AI suggestions vs signed truth', 'Automated drift report', 'cloud_functions'],
      ]},
      { title: '4. Dashboards & Drift Alerts', sub: 'SRE, AI Eng & QPPV Views', nodes: [
        ['AI Quality Drift Alert', 'Fires if human edit rate jumps >2% wk/wk', 'Triggers prompt review', 'cloud_logging'],
        ['FinOps Cost-per-Case Budget', 'Alerts if cost/case rises >25% vs baseline', 'Catches retry storms', 'bigquery'],
        ['Confidence Calibration Plot', 'Compares predicted conf vs accept rate', 'Tunes 0.85 threshold', 'vertex_ai'],
      ]},
    ],
  }),

  // ================= DOC 10: COMPLIANCE & VALIDATION PACK (Rows 37 - 39) =================
  buildRow({
    rowId: 37, docNum: 10, docId: 'doc-10', document: 'Compliance & Validation Pack', diagram: 'PHI / PII Data Flow',
    level: 'Data-handling', owner: 'Compliance Lead', projectType: 'Regulated', sectionAnchor: 'phi-pii-data-flow',
    summary: 'Regulated HIPAA / GDPR / 21 CFR Part 11 data-handling map showing where raw PHI exists, where it is tokenized, encryption keys, and retention schedules.',
    keyTakeaway: 'Strict data minimization: Vertex AI Gemini, BigQuery audit logs, and Cloud Logging contain 0% raw PHI; all raw stores use customer-managed CMEK keys.',
    edgeLabels: ['CMEK Encrypted Raw PHI', 'SDP Tokenization Gate', 'Zero-PHI AI & Regulated E2B'],
    cols: [
      { title: '1. Raw PHI Stores (CMEK)', sub: 'Restricted Access + Object Lock', nodes: [
        ['gs://pv-raw-reports', 'Contains original PDF, fax, audio, FHIR', 'CMEK + 10yr Object Lock', 'cloud_storage'],
        ['DocAI Ephemeral Parse', 'In-memory OCR within us-central1', 'Zero payload retention', 'document_ai'],
        ['Firestore PHI Token Vault', 'Maps [PATIENT_1] <-> raw identifiers', ' console-api SA access only', 'cloud_iam'],
      ]},
      { title: '2. De-Identification Gate', sub: 'Sensitive Data Protection (DLP)', nodes: [
        ['HIPAA 18 Identifier Scan', 'Detects Name, DOB, MRN, Address, Phone', 'Deterministic surrogate', 'scc'],
        ['Free-Text Narrative Scrub', 'Redacts embedded patient/doctor names', 'Before Gemini inference', 'scc'],
        ['GDPR Legal Basis Tagging', 'Tags EU Art. 9(2)(i) pharmacovigilance', 'Exempt from erasure w/ lock', 'cloud_logging'],
      ]},
      { title: '3. Zero-PHI Processing Zone', sub: 'AI Runtime & Telemetry Stores', nodes: [
        ['Vertex AI Gemini Prompts', 'Sees only [PATIENT_1], age, sex, drug', 'Zero Google training use', 'vertex_ai'],
        ['BigQuery pv_audit.events', 'Stores SHA-256 hashes & redacted text', '10-yr WORM retention', 'bigquery'],
        ['Cloud Logging & Monitoring', 'Operational metrics & correlation IDs', '0% PHI in log payloads', 'cloud_monitoring'],
      ]},
      { title: '4. Authorized Regulated Egress', sub: 'Minimized Clinical Disclosure', nodes: [
        ['Safety Reviewer Console', 'Re-hydrates PHI for authorized PV staff', 'IAP + RBAC + audit log', 'iap'],
        ['Safety DB (Veeva / Argus)', 'Full ICSR record committed post-approval', 'mTLS over Interconnect', 'spanner'],
        ['FDA / EMA E2B(R3) XML', 'ICH-mandated coded privacy fields only', 'gs://pv-e2b-submissions', 'cloud_deploy'],
      ]},
    ],
  }),
  buildRow({
    rowId: 38, docNum: 10, docId: 'doc-10', document: 'Compliance & Validation Pack', diagram: 'System Boundary Diagram',
    level: 'Exact', owner: 'Validation Lead', projectType: 'Regulated', sectionAnchor: 'system-boundary-diagram',
    summary: 'Exact GAMP 5 / 21 CFR Part 11 validated system boundary delineating In-Scope Validated Components (`pv-prod`) vs. Adjacent Enterprise Systems vs. External Agencies.',
    keyTakeaway: 'Clearly defines what is validated under this Computerized System Validation (CSV) pack versus separately validated enterprise infrastructure.',
    edgeLabels: ['Validated Ingress Interface', 'Inside GxP Validated Scope', 'Validated Egress Interface'],
    cols: [
      { title: 'Outside: Upstream & Corp', sub: 'Separately Validated / External', nodes: [
        ['External Report Sources', 'Patients, HCPs, trials, literature', 'Untrusted external inputs', 'cloud_load_balancing'],
        ['Corporate IdP (OIDC/SAML)', 'Enterprise identity & MFA provider', 'Validated under IT SOP', 'cloud_iam'],
        ['MedDRA & WHODrug Releases', 'Official MSSO / UMC dictionary files', 'Verified via SHA-256 hash', 'bigquery'],
      ]},
      { title: 'Inside: Validated GxP Core A', sub: 'pv-prod In-Scope Modules (CSV)', nodes: [
        ['Ingestion, DocAI & Clock', 'channel-ingest, doc-prep, clock-service', 'GAMP Cat 4/5 validated', 'document_ai'],
        ['Guardrail Proxy & 8 Agents', 'SDP + Model Armor + ADK Agents + bundle', 'Pinned & golden-evaluated', 'vertex_ai'],
        ['5 Cloud Run MCP Servers', 'doc, knowledge, coding, safety-db, e2b', 'Enforces Part 11 sig_id', 'cloud_run'],
      ]},
      { title: 'Inside: Validated GxP Core B', sub: 'pv-prod Data, UI & WORM Audit', nodes: [
        ['Reviewer Console & API v1', 'console-ui + console-api + Part 11 sign', 'Full OQ/PQ test coverage', 'iap'],
        ['Firestore + Cloud SQL HA', 'Working case state + pinned dictionaries', 'CMEK + PITR backed', 'spanner'],
        ['BigQuery WORM + GCS Lock', 'pv_audit.events + raw/E2B buckets', '21 CFR Part 11 §11.10(e)', 'cloud_storage'],
      ]},
      { title: 'Outside: Downstream Targets', sub: 'Interface-Validated Systems', nodes: [
        ['Safety DB (Veeva / Argus)', 'Existing validated system of record', 'Interface OQ tested', 'spanner'],
        ['AS2 E2B Gateway', 'Existing validated transmission hub', 'ACK loop OQ tested', 'cloud_deploy'],
        ['FDA / EMA / PMDA Agencies', 'External regulatory health authorities', 'ICH E2B(R3) standard', 'cloud_monitoring'],
      ]},
    ],
  }),
  buildRow({
    rowId: 39, docNum: 10, docId: 'doc-10', document: 'Compliance & Validation Pack', diagram: 'Deployment Diagram (as-built)',
    level: 'Exact', owner: 'Validation Lead', projectType: 'Regulated', sectionAnchor: 'deployment-diagram-as-built',
    summary: 'Exact as-built production configuration baseline (`pv-prod`, region `us-central1`, VPC-SC `pv-prod-perimeter`, CMEK key ring, and pinned service versions) for IQ sign-off.',
    keyTakeaway: 'Provides the exact immutable infrastructure and model baseline inspected during Installation Qualification (IQ) and regulatory audits.',
    edgeLabels: ['VPC-SC & IAM Baseline', 'Pinned Runtime Baseline', 'CMEK & WORM Storage Baseline'],
    cols: [
      { title: 'As-Built Project & Network', sub: 'GCP Project: pv-prod (us-central1)', nodes: [
        ['VPC-SC: pv-prod-perimeter', 'Ingress: IAP + VPN; Egress: Deny all', 'Access Context Manager', 'scc'],
        ['Network: pv-prod-vpc', 'Private subnets + HA VPN to Veeva/AS2', 'Cloud Armor policy v2.1', 'cloud_load_balancing'],
        ['KMS: pv-prod-cmek-ring', '90-day auto-rotation on all 6 stores', 'HSM protection level', 'cloud_iam'],
      ]},
      { title: 'As-Built AI & Agent Baseline', sub: 'Pinned Bundle: pv-bundle-v1.4.0', nodes: [
        ['Vertex AI Agent Engine', '8 ADK agents (min=2, max=20 instances)', 'SA: sa-agent-*@pv-prod', 'vertex_ai'],
        ['Pinned Gemini Models', 'gemini-flash@001 & gemini-pro@002', 'Temp=0.0, 0d Google logs', 'vertex_ai'],
        ['SDP + Model Armor Config', 'Template: pv-hipaa-18 + pv-armor-strict', 'Fail-closed inline proxy', 'scc'],
      ]},
      { title: 'As-Built Cloud Run Services', sub: 'Binary Auth Enforced Revisions', nodes: [
        ['console-ui & console-api', '2 vCPU, 4GiB RAM, min=2, max=20, IAP on', 'SA: sa-console@pv-prod', 'iap'],
        ['5 MCP Tool Cloud Run Svcs', 'Internal ingress only, min=2, max=15', 'Per-tool scoped IAM', 'cloud_run'],
        ['channel-ingest & clock-svc', 'Event-driven workers + 15m scheduler', 'DLQ alert threshold = 0', 'pubsub'],
      ]},
      { title: 'As-Built Data & WORM Stores', sub: 'IQ-Verified Storage Baseline', nodes: [
        ['Firestore & Cloud SQL 15', 'Multi-zone HA + MedDRA v27.1 / WHODrug', 'PITR 7d + cross-region', 'spanner'],
        ['BigQuery: pv_audit.events', ' Append-only ACL ( audit-writer SA only)', '3,650-day partition lock', 'bigquery'],
        ['GCS: pv-raw & pv-e2b', 'Bucket Retention Policy: 3,650 days (Locked)', 'SHA-256 manifest verified', 'cloud_storage'],
      ]},
    ],
  }),
];
