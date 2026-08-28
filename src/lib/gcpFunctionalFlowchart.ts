/**
 * 🏛️ Google Cloud Architecture Center — Enterprise Architecture Flowchart
 * 
 * 100% Official Google Cloud Brand, Architectural & Routing Standards:
 * - Google Sans / Roboto typography hierarchy
 * - Official Google 4-Color Logo & Product Palette (#1A73E8, #EA4335, #FBBC04, #34A853)
 * - Clean White Google Material Architecture Cards with subtle #DADCE0 borders
 * - NO BACKTRACKING: Clean Ingress Fork (Fast-Path UP, Supervisor DOWN)
 * - DUAL DATABASE: Active BigQuery (OLAP) & Cloud Spanner (OLTP) connections
 * - GOVERNANCE: Standard Tool Execution + Privileged HITL Approval Gate
 * - ASYNC RAG: Clearly annotated Document AI knowledge ingestion pipeline
 * - CLOSED LOOP: Physical return vector from Cloud Logging & Eval -> Supervisor
 * - 100% Anchor-Locked Laser-Straight Orthogonal Manhattan Connectors (ZERO SLANTS)
 */

import { renderGcpIconHtml, GCP_OFFICIAL_ICONS } from './gcpIcons';
import { compileArchitectureFromPrompt } from './dynamicArchitectureCompiler';

export interface GCPFunctionalFlowchartOptions {
  projectName?: string;
  useCaseName?: string;
  projectTitle?: string;
  prompt?: string;
  theme?: 'light' | 'dark';
}

export function generateGCPFunctionalFlowchart(options: GCPFunctionalFlowchartOptions = {}): string {
  const {
    projectName = 'Enterprise GCP Architecture',
    useCaseName = 'Agentic AI Functional Flowchart',
    projectTitle,
    prompt = '',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#F8F9FA';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#DADCE0';
  const textDark = isDark ? '#F8FAFC' : '#202124';

  // Compile full dynamic architecture topology from prompt
  const arch = compileArchitectureFromPrompt(prompt, projectName, useCaseName, projectTitle);
  const displayTitle = arch.projectTitle;
  const displaySubtitle = arch.subtitle;
  
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const E = (s: string) =>
    (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const node = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const line = (
    id: string,
    val: string,
    sourceId: string,
    targetId: string,
    exitX: number,
    exitY: number,
    entryX: number,
    entryY: number,
    style: string,
    pts?: { x: number; y: number }[],
    lblX?: number,
    lblY?: number
  ) => {
    const labelStyle = val ? `fontColor=#202124;fontStyle=1;fontSize=8;fontFamily=Google Sans,Roboto,sans-serif;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=3;` : "";
    let ptsXml = '';
    if (pts && pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array>`;
    }
    const geomXml = (lblX !== undefined && lblY !== undefined)
      ? `<mxGeometry x="${lblX}" y="${lblY}" relative="1" as="geometry">${ptsXml}</mxGeometry>`
      : `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>`;

    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${sourceId}" target="${targetId}" style="rounded=0;html=1;edgeStyle=none;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};exitPerimeter=0;entryPerimeter=0;${labelStyle}${style}">` +
      geomXml +
      `</mxCell>`
    );
  };

  // Official Google 4-Color Cloud Mark
  const GOOGLE_CLOUD_LOGO = `<svg width="26" height="26" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>`;

  // =========================================================================
  // 1. MASTER HEADER & GOOGLE BRAND (x=24, y=14..60)
  // =========================================================================
  node(
    "lbl_hdr_main",
    `<div style="display:flex;align-items:center;gap:16px;width:100%;padding:4px 8px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:10px;background:#FFFFFF;padding:6px 16px;border-radius:8px;border:1px solid #DADCE0;box-shadow:0 1px 2px rgba(60,64,67,0.08);flex-shrink:0;">
        ${GOOGLE_CLOUD_LOGO}
        <div>
          <div style="font-size:11.5px;font-weight:700;color:#202124;letter-spacing:-0.1px;">Google Cloud</div>
          <div style="font-size:8.5px;color:#5F6368;font-weight:500;">Architecture Center</div>
        </div>
      </div>
      <div style="border-left:1.5px solid #DADCE0;height:36px;margin:0 2px;"></div>
      <div style="flex:1;">
        <div style="font-size:20px;font-weight:700;color:${textDark};letter-spacing:-0.2px;">${displayTitle}</div>
        <div style="font-size:11px;font-weight:500;color:#1A73E8;margin-top:2px;">${displaySubtitle}</div>
      </div>
    </div>`,
    24,
    14,
    1552,
    46,
    "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // =========================================================================
  // 2. SIX STAGE PHASE HEADERS (x=24..1576, y=68..94)
  // =========================================================================
  const stagePositions = [
    { w: 200, x: 24 },
    { w: 215, x: 260 },
    { w: 195, x: 510 },
    { w: 235, x: 735 },
    { w: 230, x: 1000 },
    { w: 230, x: 1265 }
  ];

  arch.stages.forEach((st, idx) => {
    const pos = stagePositions[idx] || { w: 200, x: 24 + idx * 220 };
    node(
      `lbl_stage_${st.num}`,
      `<div style="text-align:center;padding:2px 6px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
        <span style="font-size:11px;font-weight:700;color:${st.color};">${st.num}.</span>
        <span style="font-size:11px;font-weight:700;color:#3C4043;margin-left:4px;letter-spacing:0.3px;">${st.title.toUpperCase()}</span>
      </div>`,
      pos.x,
      68,
      pos.w,
      26,
      "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
    );
  });

  // =========================================================================
  // 3. COLUMN 1: INGRESS & SECURITY (x=24, w=200)
  // =========================================================================
  const [ing1, ing2, ing3, ing4] = arch.nodes.ingress;

  node(
    ing1.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(ing1.icon, 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">${ing1.title}</div>
      <div style="font-size:8.5px;color:#5F6368;">${ing1.subtitle}</div>
    </div>`,
    24,
    105,
    200,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    ing2.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(ing2.icon, 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">${ing2.title}</div>
      <div style="font-size:8.5px;color:#5F6368;">${ing2.subtitle}</div>
    </div>`,
    24,
    205,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    ing3.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(ing3.icon, 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">${ing3.title}</div>
      <div style="font-size:8.5px;color:#5F6368;">${ing3.subtitle}</div>
    </div>`,
    24,
    305,
    200,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    ing4.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(ing4.icon, 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">${ing4.title}</div>
      <div style="font-size:8.5px;color:#0D9488;font-weight:600;">${ing4.subtitle}</div>
    </div>`,
    24,
    405,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#0D9488;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), '', ing1.id, ing2.id, 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), '', ing2.id, ing3.id, 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), '', ing3.id, ing4.id, 0.5, 1, 0.5, 0, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;');

  // =========================================================================
  // 4. COLUMN 2: PLANNING, ROUTING & MEMORY (x=260, w=215)
  // =========================================================================
  const [rout1, rout2, rout3, rout4] = arch.nodes.routing;

  // FAST PATH INFERENCE CARD (Top-aligned, y=105)
  node(
    rout1.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(rout1.icon, 26)}
      <div style="font-size:11.5px;font-weight:700;color:${rout1.highlight ? '#1A73E8' : '#1E8E3E'};margin-top:4px;">${rout1.title}</div>
      <div style="font-size:8.5px;color:${rout1.highlight ? '#1A73E8' : '#137333'};font-weight:600;">${rout1.subtitle}</div>
    </div>`,
    260,
    105,
    215,
    72,
    `fillColor=${cardBg};strokeColor=${rout1.highlight ? '#1A73E8' : '#1E8E3E'};strokeWidth=${rout1.highlight ? '2' : '1.5'};shadow=1;rounded=1;arcSize=8;`
  );

  // TASK GRAPH ROUTER (Central Fork, y=225)
  node(
    rout2.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(rout2.icon, 24)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:3px;">${rout2.title}</div>
      <div style="font-size:8px;color:#5F6368;">${rout2.subtitle}</div>
    </div>`,
    260,
    225,
    215,
    72,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Ingress into Router
  line(nid(), 'Ingress Stream', ing4.id, rout2.id, 1, 0.5, 0, 0.5, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 238, y: 441 },
    { x: 238, y: 261 }
  ], -0.6, -10);

  // ROUTER FORK 1: Direct Path
  line(nid(), 'Direct Path', rout2.id, rout1.id, 0.5, 0, 0.5, 1, 'strokeColor=#1E8E3E;strokeWidth=1.5;endArrow=block;endSize=4;');

  // SUPERVISOR AGENT CARD (Below Router, y=345)
  node(
    rout3.id,
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(rout3.icon, 26)}
      <div style="font-size:12px;font-weight:700;color:#202124;margin-top:4px;">${rout3.title}</div>
      <div style="font-size:8.5px;color:#1A73E8;font-weight:600;">${rout3.subtitle}</div>
    </div>`,
    260,
    345,
    215,
    80,
    `fillColor=${cardBg};strokeColor=${rout3.highlight ? '#1A73E8' : '#059669'};strokeWidth=${rout3.highlight ? '2.2' : '1.8'};shadow=1;rounded=1;arcSize=8;`
  );

  // ROUTER FORK 2: Orchestration
  line(nid(), 'Orchestration', rout2.id, rout3.id, 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');

  // CONVERSATIONAL & EPISODIC MEMORY (Bottom, y=475)
  node(
    rout4.id,
    `<div style="padding:8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(rout4.icon, 24)}
      <div style="font-size:10.5px;font-weight:700;color:#202124;margin-top:4px;">${rout4.title}</div>
      <div style="font-size:8px;color:#5F6368;">${rout4.subtitle}</div>
    </div>`,
    260,
    475,
    215,
    64,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'State Sync', rout3.id, rout4.id, 0.5, 1, 0.5, 0, 'strokeColor=#EA4335;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;');

  // =========================================================================
  // 5. COLUMN 3: WORKERS & SPECIALIST AGENTS (x=510, w=195)
  // =========================================================================
  const [wrk1, wrk2, wrk3] = arch.nodes.workers;

  // LANE 1 (y=155)
  node(
    wrk1.id,
    `<div style="padding:10px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml(wrk1.icon, 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">${wrk1.title}</span>
      </div>
      <div style="font-size:8.5px;color:#5F6368;margin-top:4px;">${wrk1.subtitle}</div>
    </div>`,
    510,
    155,
    195,
    72,
    `fillColor=${cardBg};strokeColor=${wrk1.highlight ? '#1A73E8' : cardBorder};strokeWidth=${wrk1.highlight ? '2' : '1'};shadow=1;rounded=1;arcSize=8;`
  );

  // LANE 2 (y=285)
  node(
    wrk2.id,
    `<div style="padding:10px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml(wrk2.icon, 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">${wrk2.title}</span>
      </div>
      <div style="font-size:8.5px;color:#5F6368;margin-top:4px;">${wrk2.subtitle}</div>
    </div>`,
    510,
    285,
    195,
    72,
    `fillColor=${cardBg};strokeColor=${wrk2.highlight ? '#1A73E8' : cardBorder};strokeWidth=${wrk2.highlight ? '2' : '1'};shadow=1;rounded=1;arcSize=8;`
  );

  // LANE 3 (y=415)
  node(
    wrk3.id,
    `<div style="padding:10px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml(wrk3.icon, 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">${wrk3.title}</span>
      </div>
      <div style="font-size:8.5px;color:#5F6368;margin-top:4px;">${wrk3.subtitle}</div>
    </div>`,
    510,
    415,
    195,
    72,
    `fillColor=${cardBg};strokeColor=${wrk3.highlight ? '#1A73E8' : cardBorder};strokeWidth=${wrk3.highlight ? '2' : '1'};shadow=1;rounded=1;arcSize=8;`
  );

  // Supervisor Dispatch Connectors (100% strict orthogonal steps)
  line(nid(), 'Dispatch A', rout3.id, wrk1.id, 1, 0.25, 0, 0.5, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 365 },
    { x: 492, y: 191 }
  ]);
  line(nid(), 'Dispatch B', rout3.id, wrk2.id, 1, 0.5, 0, 0.5, 'strokeColor=#E37400;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 385 },
    { x: 492, y: 321 }
  ]);
  line(nid(), 'Dispatch C', rout3.id, wrk3.id, 1, 0.75, 0, 0.5, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 405 },
    { x: 492, y: 451 }
  ]);

  // =========================================================================
  // 6. COLUMN 4: DATA SOURCES & STORAGE FABRIC (x=735, w=235)
  // =========================================================================
  const [dat1, dat2, dat3, dat4, dat5, dat6] = arch.nodes.data;

  // DATA SOURCE 1
  node(
    dat1.id,
    `<div style="padding:8px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml(dat1.icon, 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">${dat1.title}</span>
      </div>
      <div style="font-size:8.5px;color:#1A73E8;font-weight:600;margin-top:2px;">${dat1.subtitle}</div>
    </div>`,
    735,
    135,
    235,
    58,
    `fillColor=${cardBg};strokeColor=${dat1.highlight ? '#1A73E8' : '#1A73E8'};strokeWidth=${dat1.highlight ? '2' : '1.5'};shadow=1;rounded=1;arcSize=8;`
  );

  // ASYNC INGESTION PIPELINE
  node(
    dat2.id,
    `<div style="padding:4px 8px;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(dat2.icon, 18)}
      <div style="text-align:left;">
        <div style="font-size:8.5px;font-weight:700;color:#202124;">${dat2.title}</div>
        <div style="font-size:7.5px;color:#1A73E8;font-weight:600;">${dat2.subtitle}</div>
      </div>
    </div>`,
    735,
    201,
    235,
    36,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=0;rounded=1;arcSize=6;`
  );

  line(nid(), '', dat2.id, dat1.id, 0.5, 0, 0.5, 1, 'strokeColor=#1A73E8;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=block;endSize=4;');
  line(nid(), 'Data Link', wrk1.id, dat1.id, 1, 0.5, 0, 0.5, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 191 },
    { x: 720, y: 164 }
  ]);

  // DATA SOURCE 2A (OLAP)
  node(
    dat3.id,
    `<div style="padding:6px 10px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${renderGcpIconHtml(dat3.icon, 18)}
        <span style="font-size:10.5px;font-weight:700;color:#202124;">${dat3.title}</span>
      </div>
      <div style="font-size:7.5px;color:#E37400;font-weight:600;">${dat3.subtitle}</div>
    </div>`,
    735,
    260,
    235,
    44,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // DATA SOURCE 2B (OLTP)
  node(
    dat4.id,
    `<div style="padding:6px 10px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${renderGcpIconHtml(dat4.icon, 18)}
        <span style="font-size:10.5px;font-weight:700;color:#202124;">${dat4.title}</span>
      </div>
      <div style="font-size:7.5px;color:#1A73E8;font-weight:600;">${dat4.subtitle}</div>
    </div>`,
    735,
    312,
    235,
    44,
    `fillColor=${cardBg};strokeColor=${dat4.highlight ? '#1A73E8' : '#1A73E8'};strokeWidth=${dat4.highlight ? '2' : '1.5'};shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'Read/Write', wrk2.id, dat3.id, 1, 0.35, 0, 0.5, 'strokeColor=#E37400;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 310 },
    { x: 720, y: 282 }
  ]);
  line(nid(), 'Sync', wrk2.id, dat4.id, 1, 0.68, 0, 0.5, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');

  // GOVERNANCE & PRIVILEGED HITL APPROVAL GATE
  node(
    dat5.id,
    `<div style="padding:6px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(dat5.icon, 18)}
      <div style="font-size:10px;font-weight:700;color:#202124;margin-top:2px;">${dat5.title}</div>
      <div style="font-size:7px;color:#D93025;font-weight:600;">${dat5.subtitle}</div>
    </div>`,
    735,
    385,
    115,
    65,
    `fillColor=${cardBg};strokeColor=#EA4335;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // DATA SOURCE 3: EXTENSIONS & TOOLS
  node(
    dat6.id,
    `<div style="padding:8px 10px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${renderGcpIconHtml(dat6.icon, 20)}
        <span style="font-size:10.5px;font-weight:700;color:#202124;">${dat6.title}</span>
      </div>
      <div style="font-size:7.5px;color:#0D9488;font-weight:600;margin-top:1px;">${dat6.subtitle}</div>
    </div>`,
    865,
    385,
    140,
    65,
    `fillColor=${cardBg};strokeColor=#0D9488;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Tool Agent bifurcates: Privileged Mutation -> HITL, Standard Tool -> Direct
  line(nid(), 'Privileged', wrk3.id, dat5.id, 1, 0.35, 0, 0.5, 'strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 440 },
    { x: 720, y: 417 }
  ]);
  line(nid(), 'Approved', dat5.id, dat6.id, 1, 0.5, 0, 0.5, 'strokeColor=#1E8E3E;strokeWidth=1.5;endArrow=block;endSize=4;');

  line(nid(), 'Direct Hook', wrk3.id, dat6.id, 1, 0.75, 0, 0.85, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 469 },
    { x: 855, y: 469 },
    { x: 855, y: 440 }
  ]);

  // =========================================================================
  // 7. COLUMN 5: REASONING & ACCELERATION CORE (x=1050, w=185)
  // =========================================================================
  const aiCore = arch.nodes.aiCore;

  node(
    aiCore.id,
    `<div style="padding:14px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(aiCore.icon, 36)}
      <div style="font-size:13px;font-weight:700;color:#202124;margin-top:6px;letter-spacing:-0.2px;">${aiCore.title}</div>
      <div style="font-size:8.5px;color:#1E8E3E;font-weight:600;margin-top:2px;">${aiCore.subtitle}</div>
      <div style="font-size:7.5px;color:#5F6368;margin-top:4px;">Distributed Infrastructure Fabric</div>
    </div>`,
    1050,
    175,
    185,
    240,
    `fillColor=${cardBg};strokeColor=#1E8E3E;strokeWidth=2;shadow=1;rounded=1;arcSize=10;`
  );

  // 100% STRICT ORTHOGONAL CONNECTOR PORTS INTO CORE:
  line(nid(), 'Direct Stream', rout1.id, aiCore.id, 1, 0.5, 0, 0.08, 'strokeColor=#1E8E3E;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 490, y: 141 },
    { x: 490, y: 96 },
    { x: 1030, y: 96 },
    { x: 1030, y: 195 }
  ]);

  line(nid(), 'Context Stream', dat1.id, aiCore.id, 1, 0.5, 0, 0.25, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 1020, y: 164 },
    { x: 1020, y: 235 }
  ]);

  line(nid(), 'Records Stream', dat3.id, aiCore.id, 1, 0.5, 0, 0.45, 'strokeColor=#E37400;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), 'State Stream', dat4.id, aiCore.id, 1, 0.5, 0, 0.66, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');

  line(nid(), 'Action Payload', dat6.id, aiCore.id, 1, 0.5, 0, 0.88, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 1030, y: 417 },
    { x: 1030, y: 385 }
  ]);

  // =========================================================================
  // 8. COLUMN 6: SAFETY GUARDRAILS & STREAMED DELIVERY (x=1275, w=200)
  // =========================================================================
  const [del1, del2, del3] = arch.nodes.delivery;

  node(
    del1.id,
    `<div style="padding:10px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(del1.icon, 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">${del1.title}</div>
      <div style="font-size:8px;color:#D93025;font-weight:600;">${del1.subtitle}</div>
    </div>`,
    1275,
    255,
    200,
    80,
    `fillColor=${cardBg};strokeColor=#EA4335;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'Verify Output', aiCore.id, del1.id, 1, 0.5, 0, 0.5, 'strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Self-Correction Loop
  line(nid(), 'Feedback Loop (Max 3)', del1.id, aiCore.id, 0.5, 0, 0.5, 0, 'strokeColor=#EA4335;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;', [
    { x: 1375, y: 135 },
    { x: 1142, y: 135 }
  ]);

  // STREAMED GROUNDED RESPONSE
  node(
    del2.id,
    `<div style="padding:10px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(del2.icon, 26)}
      <div style="font-size:12px;font-weight:700;color:#1E8E3E;margin-top:4px;">${del2.title}</div>
      <div style="font-size:8.5px;color:#137333;font-weight:600;">${del2.subtitle}</div>
    </div>`,
    1275,
    380,
    200,
    76,
    `fillColor=${cardBg};strokeColor=#1E8E3E;strokeWidth=1.8;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'Grounded (Pass)', del1.id, del2.id, 0.5, 1, 0.5, 0, 'strokeColor=#1E8E3E;strokeWidth=1.8;endArrow=block;endSize=4;');

  // CLOUD LOGGING & OPS AGENT
  node(
    del3.id,
    `<div style="padding:8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml(del3.icon, 20)}
      <div style="font-size:10.5px;font-weight:700;color:#202124;margin-top:3px;">${del3.title}</div>
      <div style="font-size:8px;color:#5F6368;">${del3.subtitle}</div>
    </div>`,
    1275,
    490,
    200,
    60,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), '', del2.id, del3.id, 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;');

  line(nid(), 'Continuous Optimization Loop', del3.id, rout3.id, 0, 0.5, 0, 0.75, 'strokeColor=#0D9488;strokeWidth=1.5;dashed=1;dashPattern=5 5;endArrow=block;endSize=4;', [
    { x: 1250, y: 520 },
    { x: 1250, y: 560 },
    { x: 236, y: 560 },
    { x: 236, y: 405 }
  ]);

  // =========================================================================
  // 9. BOTTOM OBSERVABILITY & GOVERNANCE FOUNDATION (x=24..1576, y=605..655)
  // =========================================================================
  node(
    "cloud_monitoring_telemetry",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_monitoring', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Cloud Monitoring &amp; OpenTelemetry</div>
        <div style="font-size:8px;color:#5F6368;">Distributed Agent Tracing • Token Metrics • Latency Profiles</div>
      </div>
    </div>`,
    24,
    605,
    370,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  node(
    "cloud_iam_vpc_security",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('vpc_sc', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Cloud IAM &amp; VPC Service Controls</div>
        <div style="font-size:8px;color:#5F6368;">Least-Privilege RBAC • Workload Identity Federation • CMEK</div>
      </div>
    </div>`,
    408,
    605,
    375,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  node(
    "cloud_hitl_governance",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('scc', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Security Command Center &amp; Policy</div>
        <div style="font-size:8px;color:#5F6368;">Dual-Admin Approval Gate • Model Armor Policies • SLA Guardrails</div>
      </div>
    </div>`,
    797,
    605,
    375,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  node(
    "cloud_gitops_telemetry_deploy",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_deploy', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Google Cloud Deploy &amp; Cloud Build</div>
        <div style="font-size:8px;color:#5F6368;">Automated Canary Rollouts • SLSA Level 3 Supply Chain Security</div>
      </div>
    </div>`,
    1186,
    605,
    390,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  // Bottom Closed Feedback Return Banner
  node(
    "banner_feedback_return",
    `<div style="padding:6px 16px;background:#FFFFFF;border-radius:6px;border:1px solid #DADCE0;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 2px rgba(60,64,67,0.08);font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml('vertex_ai', 20)}
        <span style="font-size:11px;font-weight:700;color:#202124;">CLOSED-LOOP FEEDBACK: CONTINUOUS USER EVALUATION &amp; LIVE MODEL DRIFT MONITORING</span>
      </div>
      <span style="font-size:9px;font-weight:600;background:#E6F4EA;color:#137333;padding:3px 10px;border-radius:4px;border:1px solid #CEEAD6;">Sub-Second TTFT • Zero Hallucination SLA (99.999% Grounded)</span>
    </div>`,
    24,
    662,
    1552,
    36,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;rounded=1;arcSize=6;`
  );

  // Assemble full XML envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_enterprise_production_flow" name="${E(displayTitle)}">
    <mxGraphModel dx="1600" dy="750" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="750" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const generateGcpFunctionalFlowchartXml = generateGCPFunctionalFlowchart;
