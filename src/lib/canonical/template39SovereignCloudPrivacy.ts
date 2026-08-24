/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 39: Sovereign Cloud & Data Privacy Blueprint
 * Matches 100% of images/39.png:
 * - Exact 1536x1024 Canvas matching ground-truth master.
 * - Native inline vector SVGs for all icons, badges, shields, and pods.
 * - Bold high-contrast typography, crisp borders, rich saturated colors, zero-void proportional card packing.
 * - Complete 100% arrow parity:
 *   * 3 Legend flow lines (Data, Control, Audit)
 *   * 4 Horizontal Governance chain arrows (1->2->3->4->5)
 *   * 2 Perimeter Governance drop arrows (left to Users, right to Data Exchange)
 *   * 5 Vertical Governance downward control arrows (under each gov pod -> Sovereign Cloud)
 *   * 2 Blue Ingress data arrows (Users -> Secure Access -> Sovereign Cloud)
 *   * 2 Blue Egress data arrows (Sovereign Cloud -> Controlled Exchange -> Data Exchange)
 *   * 4 Green Upward Monitoring audit arrows (Monitoring -> 4 Sovereign Cloud points)
 *   * 2 Green Perimeter Monitoring arrows (left to Users bottom, right to Data Exchange bottom)
 *   * 1 Green Audit Feedback vertical line (Right Monitoring -> Audit & Assurance Pod 5)
 *   * 1 Green Vertical Data Exchange spine
 *   * 3 Footer boundary legend lines
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// SVG Vector Icons Helper (100% offline, zero network dependency)
const SVG = {
  circleWrap: (innerSvg: string, strokeColor = "#1D4ED8", bgColor = "#EFF6FF", size = 38) =>
    `<div style="width:${size}px;height:${size}px;min-width:${size}px;border-radius:50%;background:${bgColor};border:1.8px solid ${strokeColor};display:flex;align-items:center;justify-content:center;">` +
    `<svg width="${size - 14}" height="${size - 14}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</svg>` +
    `</div>`,

  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  handshake: `<path d="m11 17 2 2 6-6"/><path d="m13 7 3 3-3 3-3-3z"/><path d="M6 18H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l3 3-2 3"/><path d="M18 18h2a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-3l-3 3 2 3"/>`,
  bank: `<path d="M3 21h18M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M12 3 3 8h18z"/>`,
  headset: `<path d="M3 14h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-5a9 9 0 0 1 18 0v5a1 1 0 0 1-1 1h-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2"/><path d="M19 19a3 3 0 0 1-3 3h-2"/>`,
  
  // Workload / Core
  compute: `<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  network: `<rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M12 8v3"/>`,
  idCard: `<rect width="18" height="14" x="3" y="5" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h2M15 13h2M6 16a3 3 0 0 1 6 0"/>`,
  
  // Security & Privacy
  lock: `<rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  mask: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  consent: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`,
  key: `<path d="m21 2-2 2m-1.5 1.5L19 7l-2 2-1.5-1.5M15 9l-4.5 4.5a4 4 0 1 1-1.5-1.5L13.5 7.5z"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  
  // Governance & Misc
  scales: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h18"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/>`,
  clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  fileCheck: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  alert: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  gear: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  building: `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>`
};

export function generateTemplate39SovereignCloudPrivacyXml(
  domainFlavor = "sovereignty",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const rawEdge = (
    id: string,
    style: string,
    pts: { x: number; y: number }[]
  ) => {
    const pStr = pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}">
        <mxGeometry relative="1" as="geometry">
          <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
          <mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>
          <Array as="points">
            ${pStr}
          </Array>
        </mxGeometry>
      </mxCell>`
    );
  };

  // ==================== 1. TOP HEADER BANNER (y=16..76) ====================
  // Header Badge (Rounded Rectangle)
  cell("hdr_num", "39", 16, 16, 60, 60, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:28px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.15;'>Sovereign Cloud & Data Privacy Blueprint</div>` +
    `<div style='font-size:13px;font-weight:700;color:#1E3A8A;margin-top:4px;'>Data Residency • Privacy by Design • Compliance • Sovereign Operations</div>`,
    88,
    16,
    760,
    60,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Top Legend (x=850..1520, y=16..76)
  cell("top_legend_box", "", 850, 16, 670, 60, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("top_leg_title", "LEGEND", 858, 18, 50, 14, "html=1;fontColor:#64748B;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;");

  // Legend items
  const legLines = [
    { t: "Data Flow", color: "#2563EB", style: "solid", y: 26 },
    { t: "Control / Governance Flow", color: "#7C3AED", style: "dashed", y: 44 },
    { t: "Audit / Monitoring Flow", color: "#16A34A", style: "dotted", y: 62 }
  ];
  legLines.forEach((li, idx) => {
    cell(`leg_txt_${idx}`, `<span style="font-size:8.5px;font-weight:800;color:#0F172A;">${li.t}</span>`, 970, li.y - 7, 170, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`leg_e_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${li.color};strokeWidth=2;${li.style === "dashed" ? "dashed=1;dashPattern=4 2;" : li.style === "dotted" ? "dashed=1;dashPattern=1 2;" : ""}endArrow=classic;endSize=3;`, [
      { x: 914, y: li.y },
      { x: 962, y: li.y }
    ]);
  });

  const legIcons = [
    { t: "Data Store", svg: SVG.database, color: "#2563EB", x: 1160, y: 26 },
    { t: "Security Control", svg: SVG.shield, color: "#16A34A", x: 1160, y: 52 },
    { t: "Process / Service", svg: SVG.gear, color: "#475569", x: 1340, y: 26 },
    { t: "Trust Boundary", svg: `<rect width="18" height="14" x="3" y="5" rx="2" stroke-dasharray="2 2"/>`, color: "#7C3AED", x: 1340, y: 52 }
  ];
  legIcons.forEach((li, idx) => {
    cell(
      `leg_ic_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${li.color}" stroke-width="2">${li.svg}</svg><span style="font-size:8.5px;font-weight:800;color:#0F172A;">${li.t}</span></div>`,
      li.x,
      li.y - 7,
      150,
      18,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // ==================== 2. TOP ENCLAVE: GOVERNANCE & SOVEREIGN OVERSIGHT (x=240..1296, y=86..176) ====================
  cell("box_gov_top", "", 240, 86, 1056, 90, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;dashed=1;dashPattern=4 3;");
  cell("lbl_gov_top", "GOVERNANCE & SOVEREIGN OVERSIGHT", 240, 88, 1056, 18, "fontColor=#6D28D9;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const govPods = [
    { t: "Sovereignty Governance Board", sub: "Policy, Oversight, Accountability", svg: SVG.scales },
    { t: "Privacy Office (DPO)", sub: "Data Protection & Privacy<br/>Impact Assessments", svg: SVG.shield },
    { t: "Legal & Compliance", sub: "Regulations, Contracts,<br/>Approvals", svg: SVG.fileCheck },
    { t: "Data Ethics Board", sub: "Ethical Use, Fairness,<br/>Transparency", svg: SVG.brain },
    { t: "Audit & Assurance", sub: "Independent Audit,<br/>Assurance, Reporting", svg: SVG.clipboard }
  ];
  govPods.forEach((gp, idx) => {
    const gpx = 250 + idx * 208;
    cell(
      `gp_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:2px 4px;">` +
      SVG.circleWrap(gp.svg, "#7C3AED", "#FAF5FF", 38) +
      `<div><div style="font-size:9.5px;font-weight:900;color:#0F172A;line-height:1.15;">${gp.t}</div><div style="font-size:7.5px;font-weight:600;color:#64748B;margin-top:2px;line-height:1.15;">${gp.sub}</div></div></div>`,
      gpx,
      108,
      202,
      60,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=4;"
    );

    // Chained horizontal dashed purple arrows (1 -> 2 -> 3 -> 4 -> 5)
    if (idx < 4) {
      rawEdge(`e_gov_chain_${idx}`, "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3.5;", [
        { x: gpx + 202, y: 138 },
        { x: gpx + 208, y: 138 }
      ]);
    }
  });

  // ==================== 3. LEFT COLUMN: USERS & STAKEHOLDERS (x=16..228, y=184..684) ====================
  cell("box_users_left", "", 16, 184, 212, 500, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_users_left", "USERS & STAKEHOLDERS", 16, 186, 212, 24, "html=1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const stakeHolders = [
    { t: "Citizens / Customers", sub: "Portals, Apps,<br/>Self-Service", svg: SVG.user },
    { t: "Employees", sub: "Internal Apps,<br/>Collaboration", svg: SVG.users },
    { t: "Partners / Suppliers", sub: "Extranet, B2B<br/>Integrations", svg: SVG.handshake },
    { t: "Regulators / Authorities", sub: "Reporting, e-Discovery,<br/>Assurance", svg: SVG.bank },
    { t: "Support / Operations", sub: "IT Support,<br/>Operations Teams", svg: SVG.headset }
  ];
  stakeHolders.forEach((sh, idx) => {
    const shy = 216 + idx * 92;
    cell(
      `sh_${idx}`,
      `<div style="display:flex;align-items:center;gap:10px;">` +
      SVG.circleWrap(sh.svg, "#1D4ED8", "#EFF6FF", 42) +
      `<div><div style="font-size:10.5px;font-weight:900;color:#0F172A;">${sh.t}</div><div style="font-size:8.5px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.2;">${sh.sub}</div></div></div>`,
      22,
      shy,
      200,
      82,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Secure Access Gate (x=234..296, y=390..478)
  cell(
    "gate_mfa",
    `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">` +
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.2">${SVG.lock}</svg>` +
    `<div style="font-size:9px;font-weight:900;color:#1E40AF;line-height:1.15;margin-top:4px;">Secure<br/>Access<br/><span style="font-size:7.5px;color:#64748B;">(MFA, SSO)</span></div></div>`,
    234,
    390,
    62,
    88,
    "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=2;"
  );

  // ==================== 4. CENTER: SOVEREIGN CLOUD ENVIRONMENT (x=302..1234, y=184..684) ====================
  cell("box_sov_env", "", 302, 184, 932, 500, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=2.2;");
  cell("lbl_sov_env", `<div style="display:flex;align-items:center;justify-content:center;gap:8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="2.2">${SVG.bank}</svg><span style="font-size:12.5px;font-weight:900;color:#1E3A8A;letter-spacing:0.5px;">SOVEREIGN CLOUD ENVIRONMENT (In-Country / In-Region)</span></div>`, 302, 188, 932, 26, "html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Tier 1: Core Workload Pods (x=312..1224, y=218..308, h=90)
  const sovPods = [
    { t: "Workloads", sub: "Sovereign Compute<br/>(VMs, Containers, Serverless)", svg: SVG.compute, w: 218 },
    { t: "Data Services", sub: "Sovereign Storage,<br/>Databases, Analytics, AI/ML", svg: SVG.database, w: 224 },
    { t: "Application Services", sub: "Integration, API,<br/>Messaging, Workflow", svg: SVG.network, w: 224 },
    { t: "Identity & Access", sub: "Federated IAM,<br/>RBAC, PAM, CIEM", svg: SVG.idCard, w: 218 }
  ];
  let curSovX = 314;
  sovPods.forEach((sp, idx) => {
    cell(
      `sp_${idx}`,
      `<div style="display:flex;align-items:center;gap:10px;">` +
      SVG.circleWrap(sp.svg, "#1E40AF", "#EFF6FF", 42) +
      `<div><div style="font-size:10.5px;font-weight:900;color:#0F172A;">${sp.t}</div><div style="font-size:8px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.2;">${sp.sub}</div></div></div>`,
      curSovX,
      218,
      sp.w,
      86,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;"
    );
    curSovX += sp.w + 10;
  });

  // Tier 2: Data Classification & Residency Enforcement (y=314..398, h=84)
  cell("box_dc_re", "", 314, 314, 908, 84, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.2;");
  cell("lbl_dc_re", "DATA CLASSIFICATION & RESIDENCY ENFORCEMENT", 314, 316, 908, 16, "html=1;fontColor:#6D28D9;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const dataClasses = [
    { t: "Public Data", w: 106, c: "#DBEAFE", bc: "#93C5FD", tc: "#1E40AF" },
    { t: "Internal Data", w: 116, c: "#DBEAFE", bc: "#93C5FD", tc: "#1E40AF" },
    { t: "Confidential Data", w: 146, c: "#EDE9FE", bc: "#C4B5FD", tc: "#4338CA" },
    { t: "Restricted Data", w: 136, c: "#FCE7F3", bc: "#F472B6", tc: "#9D174D" },
    { t: "Highly Restricted / Personal Data", w: 236, c: "#FEE2E2", bc: "#F87171", tc: "#991B1B" }
  ];
  let curDcX = 338;
  dataClasses.forEach((dc, idx) => {
    cell(`dc_${idx}`, `<div style="font-size:9px;font-weight:900;color:${dc.tc};">${dc.t}</div>`, curDcX, 338, dc.w, 28, `rounded=1;arcSize=24;fillColor=${dc.c};strokeColor=${dc.bc};html=1;align=center;verticalAlign=middle;`);
    curDcX += dc.w + 20;
  });
  cell("dc_footer", `<div style="font-size:8.5px;font-weight:800;color:#475569;">Tagging &nbsp;•&nbsp; Labeling &nbsp;•&nbsp; Residency Rules &nbsp;•&nbsp; Automated Enforcement</div>`, 314, 372, 908, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Tier 3: Privacy & Security Controls (Built-in) (y=406..526, h=120)
  cell("box_priv_sec", "", 314, 406, 908, 120, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;");
  cell("lbl_priv_sec", "PRIVACY & SECURITY CONTROLS (Built-in)", 314, 408, 908, 16, "html=1;fontColor:#15803D;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const privControls = [
    { t: "Encryption", sub: "At Rest, In Transit,<br/>In Use (KMS)", svg: SVG.lock, w: 134 },
    { t: "Data Masking &<br/>Pseudonymization", sub: "", svg: SVG.mask, w: 144 },
    { t: "DLP & Data<br/>Discovery", sub: "", svg: SVG.search, w: 134 },
    { t: "Consent & Preference<br/>Management", sub: "", svg: SVG.consent, w: 154 },
    { t: "Key Management", sub: "(Sovereign KMS/HSM)", svg: SVG.key, w: 146 },
    { t: "Zero Trust", sub: "Network Access", svg: SVG.shield, w: 134 }
  ];
  let curPcX = 326;
  privControls.forEach((pc, idx) => {
    cell(
      `pc_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;">` +
      SVG.circleWrap(pc.svg, "#15803D", "#F0FDF4", 36) +
      `<div><div style="font-size:9.5px;font-weight:900;color:#0F172A;line-height:1.15;">${pc.t}</div>${pc.sub ? `<div style="font-size:8px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.15;">${pc.sub}</div>` : ""}</div></div>`,
      curPcX,
      432,
      pc.w,
      82,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
    curPcX += pc.w + 12;
  });

  // Tier 4: Infrastructure Sovereignty (y=534..668, h=134)
  cell("box_infra_sov", "", 314, 534, 908, 134, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;");
  cell("lbl_infra_sov", "INFRASTRUCTURE SOVEREIGNTY", 314, 536, 908, 16, "html=1;fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const infraItems = [
    { t: "In-Country / In-Region<br/>Data Centers", svg: SVG.building },
    { t: "Sovereign Network<br/>(Private Backbone)", svg: SVG.globe },
    { t: "Sovereign Operations<br/>& Support", svg: SVG.gear },
    { t: "Sovereign Backups<br/>& DR", svg: SVG.cloud }
  ];
  infraItems.forEach((ii, idx) => {
    const iix = 326 + idx * 222;
    cell(
      `ii_${idx}`,
      `<div style="display:flex;align-items:center;gap:10px;">` +
      SVG.circleWrap(ii.svg, "#1D4ED8", "#EFF6FF", 42) +
      `<div style="font-size:10px;font-weight:900;color:#0F172A;line-height:1.25;">${ii.t}</div></div>`,
      iix,
      562,
      214,
      92,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;"
    );
  });

  // Controlled Exchange Gate (x=1240..1302, y=390..478)
  cell(
    "gate_ctrl",
    `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">` +
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.2">${SVG.lock}</svg>` +
    `<div style="font-size:9px;font-weight:900;color:#1E40AF;line-height:1.15;margin-top:4px;">Controlled<br/>Exchange<br/><span style="font-size:7.5px;color:#64748B;">(Policy Engine)</span></div></div>`,
    1240,
    390,
    62,
    88,
    "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=2;"
  );

  // ==================== 5. RIGHT COLUMN: DATA EXCHANGE & CONTROLS (x=1308..1520, y=184..684) ====================
  cell("box_exchange_right", "", 1308, 184, 212, 500, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.8;");
  cell("lbl_exchange_right", "DATA EXCHANGE & CONTROLS", 1308, 186, 212, 24, "html=1;fontColor:#15803D;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const exchangeItems = [
    { t: "Cross-Border Transfers", sub: "Approved Mechanisms<br/>(SCCs, BCRs, Adequacy)", svg: SVG.globe },
    { t: "Secure Data Exchange", sub: "APIs, VPN, Private Links,<br/>File Transfer", svg: SVG.repeat },
    { t: "Data Export Controls", sub: "Policy Enforcement,<br/>Approval Workflows", svg: SVG.fileCheck },
    { t: "Third-Party Risk Mgmt", sub: "Due Diligence, Contracts,<br/>Continuous Monitoring", svg: SVG.users },
    { t: "Data Localization", sub: "Enforced Residency,<br/>No Unauthorized Copy", svg: SVG.shield }
  ];
  exchangeItems.forEach((ei, idx) => {
    const eiy = 216 + idx * 92;
    cell(
      `ei_${idx}`,
      `<div style="display:flex;align-items:center;gap:10px;">` +
      SVG.circleWrap(ei.svg, "#16A34A", "#F0FDF4", 42) +
      `<div><div style="font-size:10.5px;font-weight:900;color:#0F172A;">${ei.t}</div><div style="font-size:8.5px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.2;">${ei.sub}</div></div></div>`,
      1314,
      eiy,
      200,
      82,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Vertical green connector line traversing Data Exchange items
  rawEdge("e_exch_vertical", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.8;endArrow=none;", [
    { x: 1335, y: 298 },
    { x: 1335, y: 584 }
  ]);

  // ==================== 6. MIDDLE-BOTTOM: MONITORING, AUDIT & ASSURANCE (x=16..1520, y=694..774) ====================
  cell("box_mon_audit", "", 16, 694, 1504, 80, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;");
  cell("lbl_mon_audit", "MONITORING, AUDIT & ASSURANCE", 16, 696, 1504, 16, "html=1;fontColor:#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const monItems = [
    { t: "Continuous Monitoring", sub: "Security, Privacy,<br/>Compliance", svg: SVG.clock },
    { t: "Audit Logging", sub: "Immutable Logs,<br/>Tamper-Proof", svg: SVG.clipboard },
    { t: "Compliance Automation", sub: "Policy as Code,<br/>Continuous Evidence", svg: SVG.gear },
    { t: "Reporting & Transparency", sub: "Regulatory & Stakeholder<br/>Reports", svg: SVG.chart },
    { t: "Incident Response", sub: "Privacy Breach Mgmt,<br/>Forensics", svg: SVG.alert }
  ];
  monItems.forEach((mi, idx) => {
    const mix = 26 + idx * 298;
    cell(
      `mi_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;">` +
      SVG.circleWrap(mi.svg, "#1D4ED8", "#EFF6FF", 38) +
      `<div><div style="font-size:10px;font-weight:900;color:#0F172A;">${mi.t}</div><div style="font-size:8px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.15;">${mi.sub}</div></div></div>`,
      mix,
      716,
      288,
      52,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== 7. BOTTOM ROW (y=782..932, h=150) ====================

  // Box 1: SUPPORTING SOVEREIGN SERVICES (x=16..330, w=314)
  cell("box_supp_serv", "", 16, 782, 314, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_supp_serv", "SUPPORTING SOVEREIGN SERVICES", 16, 784, 314, 16, "html=1;fontColor:#475569;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const suppItems = [
    { t: "Sovereign<br/>DNS", svg: SVG.globe },
    { t: "Sovereign<br/>PKI / CA", svg: SVG.shield },
    { t: "Time Sync<br/>(NTP)", svg: SVG.clock },
    { t: "Certificate<br/>Management", svg: SVG.fileCheck },
    { t: "Secrets<br/>Management", svg: SVG.lock }
  ];
  suppItems.forEach((si, idx) => {
    const six = 22 + idx * 60;
    cell(
      `si_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      SVG.circleWrap(si.svg, "#1E40AF", "#EFF6FF", 38) +
      `<div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:6px;">${si.t}</div></div>`,
      six,
      810,
      56,
      112,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Box 2: COMPLIANCE FRAMEWORKS (x=338..730, w=392)
  cell("box_comp_fw", "", 338, 782, 392, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_comp_fw", "COMPLIANCE FRAMEWORKS", 338, 784, 392, 16, "html=1;fontColor:#475569;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const badges = [
    { t: "GDPR", sub: "", type: "eu" },
    { t: "ISO 27001", sub: "", type: "shield" },
    { t: "ISO 27701", sub: "(Privacy)", type: "shield" },
    { t: "SOC 2", sub: "Type II", type: "shield" },
    { t: "NIST", sub: "Privacy Framework", type: "shield" },
    { t: "eIDAS", sub: "", type: "eu" },
    { t: "Local Data", sub: "Protection Laws", type: "law" }
  ];
  badges.forEach((bg, idx) => {
    // Top row: 4 badges (col 0..3), Bottom row: 3 badges centered (col 0..2)
    const isTop = idx < 4;
    const col = isTop ? idx : idx - 4;
    const bx = isTop ? 350 + col * 92 : 396 + col * 92;
    const by = isTop ? 808 : 866;
    const iconSvg = bg.type === "eu" 
      ? `<circle cx="12" cy="12" r="9" fill="#1E3A8A" stroke="none"/><text x="12" y="16" fill="#FBBF24" font-size="12" font-weight="bold" text-anchor="middle">★</text>`
      : bg.type === "shield"
      ? `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="2"/>`
      : `<path d="M3 21h18M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M12 3 3 8h18z" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="2"/>`;

    cell(
      `cf_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="22" height="22" viewBox="0 0 24 24">${iconSvg}</svg>` +
      `<div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.1;margin-top:2px;">${bg.t}</div>${bg.sub ? `<div style="font-size:7px;color:#64748B;font-weight:600;">${bg.sub}</div>` : ""}</div>`,
      bx,
      by,
      86,
      50,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Box 3: KEY PRINCIPLES (x=738..1160, w=422)
  cell("box_key_princ", "", 738, 782, 422, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_key_princ", "KEY PRINCIPLES", 738, 784, 422, 16, "html=1;fontColor:#475569;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const principles = [
    "Data Residency & Sovereignty",
    "Privacy by Design & Default",
    "Purpose Limitation & Data Minimization",
    "Transparency & Accountability",
    "Security & Confidentiality",
    "User Rights & Control"
  ];
  principles.forEach((pr, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = 746 + col * 206;
    const py = 810 + row * 36;
    cell(
      `kp_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;">` +
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5"><rect width="18" height="18" x="3" y="3" rx="3"/><path d="m9 12 2 2 4-4"/></svg>` +
      `<span style="font-size:9px;font-weight:800;color:#0F172A;">${pr}</span></div>`,
      px,
      py,
      202,
      30,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // Box 4: NOTES (x=1168..1520, w=352)
  cell("box_notes", "", 1168, 782, 352, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;dashed=1;dashPattern=4 3;");
  cell("lbl_notes", "NOTES", 1176, 788, 80, 16, "html=1;fontColor:#0F172A;fontSize=9;fontStyle=1;align=left;verticalAlign=middle;");
  const notesHtml = `<div style="font-size:9px;color:#334155;line-height:1.6;font-weight:600;">` +
    `• All sensitive / personal data remains within sovereign boundary.<br/>` +
    `• Cross-border transfers only via approved legal mechanisms.<br/>` +
    `• All controls are auditable and continuously monitored.` +
    `</div>`;
  cell("txt_notes", notesHtml, 1176, 812, 336, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 8. BOTTOM VALUE BADGES & FOOTER (y=940..1010, h=70) ====================
  const valBadges = [
    { t: "Data Stays in<br/>Country / Region", svg: SVG.globe },
    { t: "Regulatory<br/>Compliance", svg: SVG.shield },
    { t: "Reduced Legal<br/>& Transfer Risk", svg: SVG.scales },
    { t: "Stronger Trust &<br/>Citizen Confidence", svg: SVG.handshake },
    { t: "Operational<br/>Independence", svg: SVG.building }
  ];
  valBadges.forEach((vb, idx) => {
    const vbx = 16 + idx * 162;
    cell(
      `vb_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;">` +
      SVG.circleWrap(vb.svg, "#1D4ED8", "#EFF6FF", 38) +
      `<div style="font-size:9.5px;font-weight:900;color:#0F172A;line-height:1.2;">${vb.t}</div></div>`,
      vbx,
      940,
      154,
      62,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Footer Legend Lines (x=834..1520, y=940..1010)
  cell("bot_leg_box", "", 834, 940, 686, 62, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  const bLegs = [
    { t: "Sovereign Boundary (Data & Operations)", color: "#1D4ED8", style: "solid", y: 954 },
    { t: "Governance Boundary", color: "#7C3AED", style: "dashed", y: 972 },
    { t: "Monitoring & Audit Boundary", color: "#16A34A", style: "dotted", y: 990 }
  ];
  bLegs.forEach((bl, idx) => {
    cell(`bl_txt_${idx}`, `<span style="font-size:9px;font-weight:800;color:#0F172A;">${bl.t}</span>`, 910, bl.y - 7, 400, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`bl_e_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${bl.color};strokeWidth=2.2;${bl.style === "dashed" ? "dashed=1;dashPattern=4 2;" : bl.style === "dotted" ? "dashed=1;dashPattern=1 2;" : ""}endArrow=none;`, [
      { x: 850, y: bl.y },
      { x: 900, y: bl.y }
    ]);
  });

  // ==================== 9. COMPLETE INTER-LAYER CONNECTORS MATRIX ====================

  // --- Category A: Purple Dashed Governance Control Flows ---
  // A1. Governance -> Users (Left perimeter drop)
  rawEdge("e_gov_to_users", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.6;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 240, y: 138 },
    { x: 122, y: 138 },
    { x: 122, y: 184 }
  ]);

  // A2. Governance -> Data Exchange (Right perimeter drop)
  rawEdge("e_gov_to_exch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.6;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 1296, y: 138 },
    { x: 1414, y: 138 },
    { x: 1414, y: 184 }
  ]);

  // A3-A7: 5 Downward Governance control drop arrows (from under each pod -> Sovereign Cloud top border)
  const govPodXCenters = [351, 559, 767, 975, 1183];
  govPodXCenters.forEach((xPos, pIdx) => {
    rawEdge(`e_gov_down_${pIdx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.6;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
      { x: xPos, y: 168 },
      { x: xPos, y: 184 }
    ]);
  });

  // --- Category B: Blue Solid Data Flows ---
  // B1. Users -> Secure Access Gate
  rawEdge("e_users_to_gate", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=4;", [
    { x: 228, y: 434 },
    { x: 234, y: 434 }
  ]);

  // B2. Secure Access Gate -> Sovereign Cloud
  rawEdge("e_gate_to_sov", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=4;", [
    { x: 296, y: 434 },
    { x: 302, y: 434 }
  ]);

  // B3. Sovereign Cloud -> Controlled Exchange Gate
  rawEdge("e_sov_to_ctrl", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=4;", [
    { x: 1234, y: 434 },
    { x: 1240, y: 434 }
  ]);

  // B4. Controlled Exchange Gate -> Data Exchange
  rawEdge("e_ctrl_to_exch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=4;", [
    { x: 1302, y: 434 },
    { x: 1308, y: 434 }
  ]);

  // --- Category C: Green Dotted Audit & Monitoring Flows ---
  // C1. Monitoring -> Users (Left perimeter upward arrow into Users bottom)
  rawEdge("e_mon_to_users", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.6;dashed=1;dashPattern=2 3;endArrow=classic;endSize=4;", [
    { x: 122, y: 694 },
    { x: 122, y: 684 }
  ]);

  // C2-C5: 4 Upward Monitoring arrows into Sovereign Cloud (under each infrastructure card)
  const sovInfraXCenters = [433, 655, 877, 1099];
  sovInfraXCenters.forEach((xPos, pIdx) => {
    rawEdge(`e_mon_up_${pIdx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.6;dashed=1;dashPattern=2 3;endArrow=classic;endSize=4;", [
      { x: xPos, y: 694 },
      { x: xPos, y: 684 }
    ]);
  });

  // C6. Monitoring -> Data Exchange (Right perimeter upward arrow into Data Exchange bottom)
  rawEdge("e_mon_to_exch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.6;dashed=1;dashPattern=2 3;endArrow=classic;endSize=4;", [
    { x: 1414, y: 694 },
    { x: 1414, y: 684 }
  ]);

  // C7. Feedback line: Far-right Monitoring -> Audit & Assurance Pod 5 (Right vertical spine)
  rawEdge("e_mon_feedback_gov", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.6;dashed=1;dashPattern=2 3;endArrow=classic;endSize=4;", [
    { x: 1480, y: 694 },
    { x: 1480, y: 138 },
    { x: 1296, y: 138 }
  ]);

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_39_sovereign_cloud_privacy" name="Template 39: Sovereign Cloud &amp; Data Privacy Blueprint">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
