/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 44: Zero-Trust Cybersecurity & SOC Platform
 * Matches 100% of images/44.png:
 * - Top Header: "44" Badge, "ZERO-TRUST CYBERSECURITY & SOC PLATFORM", Subtitle, Google Cloud Reference Architecture v2.0
 * - Left Column (Tiers 7 down to 0):
 *   7) CONSUMPTION LAYER (Users, Workloads, Applications, Access Channels, Devices)
 *   6) ZERO-TRUST ACCESS LAYER (Identity & Access, Strong Auth, Conditional Access, Access Control, Workload Identity, ZTNA + PDP bar)
 *   5) THREAT DETECTION & RESPONSE LAYER (Ingestion, Detection & Analytics, Threat Intel, SOAR & Automation, Response Actions, Hunting & Forensics)
 *   4) SECURITY CONTROLS LAYER (Network Security, Endpoint Security, App Security, Data Security, Cloud Security, OT/IoT Security)
 *   3) VISIBILITY & TELEMETRY LAYER (Log Sources, Telemetry Sources, Asset & Config, Data Enrichment)
 *   2) SECURE CONNECTIVITY LAYER (VPC, Private Google Access, Interconnect, VPN, Cloud DNS, SSL/TLS Inspection, Segmentation, Service Mesh)
 *   1) ASSET & INFRASTRUCTURE LAYER (Compute, Containers, Serverless, Data & Storage, Databases, On-prem & Edge)
 *   0) GOOGLE CLOUD SECURITY FOUNDATION (Google Cloud Infra, IAM & Org Policy, IAP, VPC-SC, Binary Auth, SCC, Chronicle, Mandiant, Global Infra)
 * - Right Sidebar (Tiers 8, 9, 10):
 *   8) GOVERNANCE, RISK & COMPLIANCE (Policy Mgmt, Risk Mgmt, Compliance, Audit, Data Classification, Third-Party Risk, Privacy, Vendor Assessments, IAM Review)
 *   9) SECURITY OPERATIONS (SOC) (SOC Analysts, Incident Responders, Threat Hunters, Threat Intel Team, Forensics Team, Risk & Compliance, 24x7 Monitoring)
 *   10) PLATFORM OPERATIONS (IaC, CI/CD Security, Patch & Vulnerability, Backup & Recovery, Capacity Mgmt, Chaos Engineering, Change & Release Mgmt)
 * - Bottom Panels:
 *   - Data Flow Legend (Telemetry, Control, Response)
 *   - Zero-Trust Principles (Verify Explicitly, Least Privilege, Assume Breach, Continuous Monitoring, Automate Enforcement)
 *   - Numbered Tier Legend (1..10 palette badges)
 * - 1600x1100 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  shieldAlert: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  lock: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  key: `<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9M18 14l2 2M15 17l2 2"/>`,
  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  network: `<rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M5 16v-4h14v4"/><path d="M12 8v8"/>`,
  activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  fileCode: `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  smartphone: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
  monitor: `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>`,
  cpu: `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  scale: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`
};

const svgIcon = (iconName: keyof typeof SVG, strokeColor = "#1D4ED8", size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[iconName] || SVG.shield}</svg>`;

export function generateTemplate44ZeroTrustCybersecuritySocPlatformXml(
  domainFlavor = "zerotrust",
  theme: "light" | "dark" = "light"
): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const rawEdge = (id: string, style: string, pts: { x: number; y: number }[]) => {
    let ptsXml = "";
    if (pts.length > 2) {
      ptsXml = `<Array as="points">${pts.slice(1, -1).map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}"><mxGeometry relative="1" as="geometry"><mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/><mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // =========================================================================
  // 1. TOP HEADER BANNER (y: 12..62)
  // =========================================================================
  cell("hdr_num", "44", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:20px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">ZERO-TRUST CYBERSECURITY &amp; SOC PLATFORM</div>
    <div style="font-size:11px;color:#475569;font-weight:600;margin-top:2px;">Verify Explicitly • Least Privilege • Assume Breach • Continuous Monitoring</div>`;
  cell("hdr_title", titleHtml, 78, 12, 750, 48, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;">
    <div style="text-align:right;">
      <div style="font-size:16px;font-weight:900;color:#4285F4;letter-spacing:0.5px;display:flex;align-items:center;justify-content:flex-end;gap:6px;">
        ${svgIcon("cloud", "#4285F4", 20)} Google Cloud
      </div>
      <div style="font-size:9px;color:#64748B;font-weight:600;margin-top:2px;">Reference Architecture v2.0</div>
    </div>
  </div>`;
  cell("hdr_brand", brandHtml, 1280, 12, 304, 48, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT COLUMN: TIERS 7 DOWN TO 0 (x: 16..1230, w: 1214)
  // =========================================================================

  // --- TIER 7: CONSUMPTION LAYER (y: 68..148, h: 80) ---
  cell("t7_frame", "", 16, 68, 1214, 80, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;");
  cell("t7_badge", "7", 22, 74, 24, 24, "rounded=1;arcSize=4;fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", "<b style=\"font-size:8.5px;color:#1E3A8A;\">CONSUMPTION LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Users • Workloads<br/>Applications • Devices</span>", 50, 74, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Boxes = [
    {
      title: "Users",
      w: 180,
      items: [
        { t: "Employees", icon: "user" },
        { t: "Partners", icon: "users" },
        { t: "Customers", icon: "user" }
      ]
    },
    {
      title: "Workloads",
      w: 190,
      items: [
        { t: "VMs", icon: "server" },
        { t: "Containers", icon: "layers" },
        { t: "Serverless", icon: "cloud" }
      ]
    },
    {
      title: "Applications",
      w: 180,
      items: [
        { t: "Web", icon: "globe" },
        { t: "APIs", icon: "network" },
        { t: "SaaS", icon: "cloud" }
      ]
    },
    {
      title: "Access Channels",
      w: 180,
      items: [
        { t: "Web", icon: "globe" },
        { t: "Mobile", icon: "smartphone" },
        { t: "CLI/API", icon: "fileCode" }
      ]
    },
    {
      title: "Devices",
      w: 290,
      items: [
        { t: "Corporate", icon: "monitor" },
        { t: "BYOD", icon: "smartphone" },
        { t: "IoT/OT", icon: "cpu" },
        { t: "IoT", icon: "network" }
      ]
    }
  ];

  let curX = 160;
  t7Boxes.forEach((bx, bIdx) => {
    cell(`t7_b_${bIdx}`, "", curX, 74, bx.w, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t7_b_hdr_${bIdx}`, `<b style="font-size:7.5px;color:#64748B;">${bx.title}</b>`, curX, 76, bx.w, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const itemW = Math.floor((bx.w - 12) / bx.items.length);
    bx.items.forEach((it, iIdx) => {
      const ix = curX + 6 + iIdx * itemW;
      const html = `<div style="text-align:center;padding:2px;">
        <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(it.icon as keyof typeof SVG, "#1E3A8A", 13)}</div>
        <div style="font-size:7px;font-weight:700;color:#0F172A;">${it.t}</div>
      </div>`;
      cell(`t7_it_${bIdx}_${iIdx}`, html, ix, 90, itemW - 4, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curX += bx.w + 6;
  });

  // --- TIER 6: ZERO-TRUST ACCESS LAYER (y: 152..240, h: 88) ---
  cell("t6_frame", "", 16, 152, 1214, 88, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.2;");
  cell("t6_badge", "6", 22, 158, 24, 24, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", "<b style=\"font-size:8.5px;color:#1D4ED8;\">ZERO-TRUST<br/>ACCESS LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Never Trust,<br/>Always Verify</span>", 50, 158, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t6AccessCards = [
    { title: "Identity &amp; Access", sub: "Cloud Identity • IAM • Groups", icon: "users" },
    { title: "Strong Authentication", sub: "MFA • FIDO2 • Context-Aware", icon: "key" },
    { title: "Conditional Access", sub: "Device Posture • Location • Risk", icon: "shieldCheck" },
    { title: "Access Control", sub: "IAM Conditions • Least Priv • JIT", icon: "lock" },
    { title: "Workload Identity", sub: "Workload Identity • Federation", icon: "layers" },
    { title: "Zero Trust Network Access", sub: "BeyondCorp • IAP • Interconnect", icon: "network" }
  ];
  t6AccessCards.forEach((ac, idx) => {
    const ax = 160 + idx * 179;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="font-size:8px;font-weight:800;color:#1D4ED8;margin-bottom:2px;">${ac.title}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(ac.icon as keyof typeof SVG, "#1D4ED8", 14)}</div>
      <div style="font-size:6.5px;color:#64748B;">${ac.sub}</div>
    </div>`;
    cell(`t6_ac_${idx}`, html, ax, 158, 174, 52, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // PDP bar bottom of Tier 6
  const pdpHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:12px;font-size:8px;font-weight:700;color:#1D4ED8;">
    <span>Policy Decision Point (PDP)</span> • <span>Context Engine</span> • <span>Risk Engine</span> • <span>Policy Orchestration</span>
  </div>`;
  cell("t6_pdp_bar", pdpHtml, 160, 214, 1062, 22, "rounded=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 5: THREAT DETECTION & RESPONSE LAYER (y: 244..332, h: 88) ---
  cell("t5_frame", "", 16, 244, 1214, 88, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("t5_badge", "5", 22, 250, 24, 24, "rounded=1;arcSize=4;fillColor=#2563EB;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", "<b style=\"font-size:8.5px;color:#2563EB;\">THREAT DETECTION<br/>&amp; RESPONSE LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Detect • Prioritize<br/>Respond • Remediate</span>", 50, 250, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t5ThreatCards = [
    { title: "Data Ingestion", sub: "Logs • Traces • Events", icon: "activity" },
    { title: "Detection &amp; Analytics", sub: "SIEM (SecOps) • UEBA • ML", icon: "search" },
    { title: "Threat Intelligence", sub: "Mandiant TI • OSINT • YARA", icon: "shieldAlert" },
    { title: "SOAR &amp; Automation", sub: "Playbooks • Automation • Cases", icon: "repeat" },
    { title: "Response Actions", sub: "Containment • Eradication", icon: "shieldCheck" },
    { title: "Hunting &amp; Forensics", sub: "Threat Hunting • Forensics", icon: "search" }
  ];
  t5ThreatCards.forEach((tc, idx) => {
    const tx = 160 + idx * 179;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="font-size:8px;font-weight:800;color:#2563EB;margin-bottom:2px;">${tc.title}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(tc.icon as keyof typeof SVG, "#2563EB", 14)}</div>
      <div style="font-size:6.5px;color:#64748B;">${tc.sub}</div>
    </div>`;
    cell(`t5_tc_${idx}`, html, tx, 250, 174, 52, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Correlate bar bottom of Tier 5
  const threatBarHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:12px;font-size:8px;font-weight:700;color:#2563EB;">
    <span>Correlate</span> • <span>Detect</span> • <span>Alert</span> • <span>Investigate</span> • <span>Respond</span>
  </div>`;
  cell("t5_threat_bar", threatBarHtml, 160, 306, 1062, 22, "rounded=1;arcSize=4;fillColor=#DBEAFE;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 4: SECURITY CONTROLS LAYER (y: 336..416, h: 80) ---
  cell("t4_frame", "", 16, 336, 1214, 80, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t4_badge", "4", 22, 342, 24, 24, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", "<b style=\"font-size:8.5px;color:#16A34A;\">SECURITY CONTROLS<br/>LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Prevent • Protect<br/>Detect • Respond</span>", 50, 342, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t4Controls = [
    { title: "Network Security", sub: "Cloud Armor • NGFW • IDS/IPS", icon: "shield" },
    { title: "Endpoint Security", sub: "EDR • Anti-Malware • Device", icon: "monitor" },
    { title: "Application Security", sub: "WAAP • RASP • SAST/DAST", icon: "fileCode" },
    { title: "Data Security", sub: "DLP • Encryption • Tokenization", icon: "lock" },
    { title: "Cloud Security", sub: "CSPM • CWPP • K8s Security", icon: "cloud" },
    { title: "OT / IoT Security", sub: "OT Security • IoT Device • Asset", icon: "cpu" }
  ];
  t4Controls.forEach((sc, idx) => {
    const sx = 160 + idx * 179;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="font-size:8px;font-weight:800;color:#16A34A;margin-bottom:2px;">${sc.title}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(sc.icon as keyof typeof SVG, "#16A34A", 15)}</div>
      <div style="font-size:6.5px;color:#64748B;">${sc.sub}</div>
    </div>`;
    cell(`t4_sc_${idx}`, html, sx, 342, 174, 68, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 3: VISIBILITY & TELEMETRY LAYER (y: 420..500, h: 80) ---
  cell("t3_frame", "", 16, 420, 1214, 80, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;");
  cell("t3_badge", "3", 22, 426, 24, 24, "rounded=1;arcSize=4;fillColor=#D97706;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", "<b style=\"font-size:8px;color:#D97706;\">VISIBILITY &amp; TELEMETRY<br/>LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Collect • Enrich<br/>Normalize • Store</span>", 50, 426, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t3Vis = [
    { title: "Log Sources", sub: "Cloud Logs • VPC Logs • DNS • App • Sys", icon: "fileCode" },
    { title: "Telemetry Sources", sub: "Metrics • Traces • Events • Packets • Sensors", icon: "activity" },
    { title: "Asset &amp; Configuration", sub: "CMDB • Asset Inventory • Vuln Scans • Baseline", icon: "settings" },
    { title: "Data Enrichment", sub: "GeoIP • User Context • Threat Intel • Context", icon: "sparkles" }
  ];
  t3Vis.forEach((tv, idx) => {
    const vx = 160 + idx * 268;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="font-size:8px;font-weight:800;color:#D97706;margin-bottom:2px;">${tv.title}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(tv.icon as keyof typeof SVG, "#D97706", 15)}</div>
      <div style="font-size:6.5px;color:#64748B;">${tv.sub}</div>
    </div>`;
    cell(`t3_tv_${idx}`, html, vx, 426, 262, 68, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 2: SECURE CONNECTIVITY LAYER (y: 504..574, h: 70) ---
  cell("t2_frame", "", 16, 504, 1214, 70, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;");
  cell("t2_badge", "2", 22, 510, 24, 24, "rounded=1;arcSize=4;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", "<b style=\"font-size:8px;color:#EA580C;\">SECURE CONNECTIVITY<br/>LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Segment • Encrypt<br/>Inspect • Route</span>", 50, 510, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t2Connectors = [
    { t: "VPC", icon: "network" },
    { t: "Private Google<br/>Access", icon: "cloud" },
    { t: "Cloud Interconnect", icon: "repeat" },
    { t: "VPN", icon: "lock" },
    { t: "Cloud DNS<br/>(Private Zones)", icon: "globe" },
    { t: "SSL/TLS<br/>Inspection", icon: "shieldCheck" },
    { t: "Segmentation<br/>(Micro-Seg)", icon: "layers" },
    { t: "Service<br/>Mesh Security", icon: "network" }
  ];
  t2Connectors.forEach((tc, idx) => {
    const cx = 160 + idx * 133;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(tc.icon as keyof typeof SVG, "#EA580C", 14)}</div>
      <div style="font-size:7px;font-weight:700;color:#0F172A;line-height:1.15;">${tc.t}</div>
    </div>`;
    cell(`t2_tc_${idx}`, html, cx, 510, 127, 58, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 1: ASSET & INFRASTRUCTURE LAYER (y: 578..654, h: 76) ---
  cell("t1_frame", "", 16, 578, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=1.2;");
  cell("t1_badge", "1", 22, 584, 24, 24, "rounded=1;arcSize=4;fillColor=#1E40AF;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", "<b style=\"font-size:8px;color:#1E40AF;\">ASSET &amp; INFRASTRUCTURE<br/>LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Discover • Classify<br/>Baseline • Monitor</span>", 50, 584, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t1Assets = [
    { title: "Compute", sub: "VMs • Bare Metal • GPUs", icon: "server" },
    { title: "Containers", sub: "GKE • Anthos • GCR/AR", icon: "layers" },
    { title: "Serverless", sub: "Cloud Run • Functions • App Engine", icon: "cloud" },
    { title: "Data &amp; Storage", sub: "Cloud Storage • BigQuery • Cloud SQL", icon: "database" },
    { title: "Databases", sub: "AlloyDB • Spanner • Memorystore", icon: "database" },
    { title: "On-prem &amp; Edge", sub: "Data Centers • Branch • Edge Sites", icon: "server" }
  ];
  t1Assets.forEach((ta, idx) => {
    const ax = 160 + idx * 179;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="font-size:8px;font-weight:800;color:#1E40AF;margin-bottom:2px;">${ta.title}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(ta.icon as keyof typeof SVG, "#1E40AF", 14)}</div>
      <div style="font-size:6.5px;color:#64748B;">${ta.sub}</div>
    </div>`;
    cell(`t1_ta_${idx}`, html, ax, 584, 174, 64, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 0: GOOGLE CLOUD SECURITY FOUNDATION (y: 658..726, h: 68) ---
  cell("t0_frame", "", 16, 658, 1214, 68, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("t0_badge", "0", 22, 664, 24, 24, "rounded=1;arcSize=4;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t0_lbl", "<b style=\"font-size:8px;color:#DC2626;\">GOOGLE CLOUD<br/>SECURITY FOUNDATION</b><br/><span style=\"font-size:6.5px;color:#64748B;\">Secure by Design • Built-in</span>", 50, 664, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t0Foundations = [
    { t: "Google Cloud<br/>Infrastructure", icon: "cloud" },
    { t: "IAM &amp; Org<br/>Policy", icon: "lock" },
    { t: "Identity<br/>Aware Proxy", icon: "shieldCheck" },
    { t: "VPC Service<br/>Controls", icon: "network" },
    { t: "Binary<br/>Authorization", icon: "fileCode" },
    { t: "Security<br/>Command Center", icon: "shield" },
    { t: "Chronicle<br/>Security", icon: "activity" },
    { t: "Mandiant Threat<br/>Intelligence", icon: "shieldAlert" }
  ];
  t0Foundations.forEach((tf, idx) => {
    const fx = 160 + idx * 116;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(tf.icon as keyof typeof SVG, "#DC2626", 13)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.15;">${tf.t}</div>
    </div>`;
    cell(`t0_tf_${idx}`, html, fx, 664, 110, 56, "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Global Infra Far Right
  const t0GlobalInfra = `<div style="font-size:6.5px;color:#475569;line-height:1.25;padding:2px;">
    • Global Infrastructure<br/>
    • High Availability<br/>
    • Scalability<br/>
    • Sustainability
  </div>`;
  cell("t0_global_infra", t0GlobalInfra, 1092, 664, 130, 56, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;");

  // =========================================================================
  // 3. RIGHT COLUMN: TIERS 8, 9, 10 (x: 1246..1584, w: 338)
  // =========================================================================

  // --- TIER 8: GOVERNANCE, RISK & COMPLIANCE (y: 68..278, h: 210) ---
  cell("t8_frame", "", 1246, 68, 338, 210, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#6D28D9;strokeWidth=1.2;");
  cell("t8_badge", "8", 1252, 74, 24, 24, "rounded=1;arcSize=4;fillColor=#6D28D9;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", "<b style=\"font-size:9.5px;color:#6D28D9;\">GOVERNANCE, RISK &amp; COMPLIANCE</b><br/><span style=\"font-size:7px;color:#64748B;\">Governed • Compliant • Accountable</span>", 1282, 74, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const grcGrid = [
    { t: "Policy Management", icon: "fileCode", r: 0, c: 0 },
    { t: "Risk Management", icon: "shieldAlert", r: 0, c: 1 },
    { t: "Compliance Mgmt", icon: "checkCircle", r: 1, c: 0 },
    { t: "Audit Management", icon: "database", r: 1, c: 1 },
    { t: "Data Classification", icon: "folder", r: 2, c: 0 },
    { t: "Third-Party Risk", icon: "users", r: 2, c: 1 },
    { t: "Privacy Management", icon: "lock", r: 3, c: 0 },
    { t: "Vendor Assessments", icon: "shieldCheck", r: 3, c: 1 }
  ];
  grcGrid.forEach((gg, idx) => {
    const gx = 1256 + gg.c * 160;
    const gy = 102 + gg.r * 34;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(gg.icon as keyof typeof SVG, "#6D28D9", 12)}
      <span style="font-size:7.5px;font-weight:700;color:#0F172A;">${gg.t}</span>
    </div>`;
    cell(`t8_g_${idx}`, html, gx, gy, 154, 28, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // IAM & Access Review bottom in Tier 8
  const iamReviewHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
    ${svgIcon("user", "#6D28D9", 14)}
    <b style="font-size:8px;color:#0F172A;">IAM &amp; Access Review</b>
  </div>`;
  cell("t8_iam_rev", iamReviewHtml, 1256, 242, 314, 30, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 9: SECURITY OPERATIONS (SOC) (y: 284..494, h: 210) ---
  cell("t9_frame", "", 1246, 284, 338, 210, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t9_badge", "9", 1252, 290, 24, 24, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", "<b style=\"font-size:9.5px;color:#16A34A;\">SECURITY OPERATIONS (SOC)</b><br/><span style=\"font-size:7px;color:#64748B;\">People • Process • Technology</span>", 1282, 290, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const socGrid = [
    { t: "SOC Analysts", icon: "users", r: 0, c: 0 },
    { t: "Incident Responders", icon: "shieldAlert", r: 0, c: 1 },
    { t: "Threat Hunters", icon: "search", r: 1, c: 0 },
    { t: "Threat Intel Team", icon: "shieldCheck", r: 1, c: 1 },
    { t: "Forensics Team", icon: "user", r: 2, c: 0 },
    { t: "Risk &amp; Compliance", icon: "scale", r: 2, c: 1 }
  ];
  socGrid.forEach((sg, idx) => {
    const sx = 1256 + sg.c * 160;
    const sy = 318 + sg.r * 44;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(sg.icon as keyof typeof SVG, "#16A34A", 13)}
      <span style="font-size:7.5px;font-weight:700;color:#0F172A;">${sg.t}</span>
    </div>`;
    cell(`t9_s_${idx}`, html, sx, sy, 154, 38, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // 24x7 Monitoring & Response bottom in Tier 9
  const soc24x7Html = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
    ${svgIcon("settings", "#16A34A", 14)}
    <b style="font-size:8px;color:#0F172A;">24x7 Monitoring &amp; Response</b>
  </div>`;
  cell("t9_soc_bar", soc24x7Html, 1256, 456, 314, 32, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 10: PLATFORM OPERATIONS (y: 500..726, h: 226) ---
  cell("t10_frame", "", 1246, 500, 338, 226, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;");
  cell("t10_badge", "10", 1252, 506, 24, 24, "rounded=1;arcSize=4;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", "<b style=\"font-size:9.5px;color:#EA580C;\">PLATFORM OPERATIONS</b><br/><span style=\"font-size:7px;color:#64748B;\">Automate • Orchestrate • Optimize</span>", 1282, 506, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const platGrid = [
    { t: "Infrastructure as Code", icon: "fileCode", r: 0, c: 0 },
    { t: "CI / CD Security", icon: "repeat", r: 0, c: 1 },
    { t: "Patch &amp; Vuln Mgmt", icon: "settings", r: 1, c: 0 },
    { t: "Backup &amp; Recovery", icon: "database", r: 1, c: 1 },
    { t: "Capacity Mgmt", icon: "server", r: 2, c: 0 },
    { t: "Chaos Engineering", icon: "activity", r: 2, c: 1 }
  ];
  platGrid.forEach((pg, idx) => {
    const px = 1256 + pg.c * 160;
    const py = 534 + pg.r * 44;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(pg.icon as keyof typeof SVG, "#EA580C", 13)}
      <span style="font-size:7.5px;font-weight:700;color:#0F172A;line-height:1.15;">${pg.t}</span>
    </div>`;
    cell(`t10_p_${idx}`, html, px, py, 154, 38, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // Change & Release Management bottom in Tier 10
  const platChangeHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
    ${svgIcon("repeat", "#EA580C", 14)}
    <b style="font-size:8px;color:#0F172A;">Change &amp; Release Management</b>
  </div>`;
  cell("t10_plat_bar", platChangeHtml, 1256, 672, 314, 46, "rounded=1;arcSize=4;fillColor=#FFEDD5;strokeColor=#FED7AA;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. BOTTOM PANELS: FLOW, PRINCIPLES, LEGEND (y: 734..840, h: 106)
  // =========================================================================

  // --- Left Box: DATA FLOW LEGEND (x: 16..390, w: 374) ---
  cell("df_box", "", 16, 734, 374, 106, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("df_hdr", "<b style=\"font-size:8.5px;color:#0F172A;\">DATA FLOW LEGEND</b>", 16, 736, 374, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const dfContent = `<div style="padding:4px 12px;font-size:7.5px;color:#0F172A;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <span style="width:24px;height:2px;border-top:2px dashed #1D4ED8;display:inline-block;"></span>
      <span>Telemetry / Logs / Events</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <span style="width:24px;height:2px;border-top:2px dashed #16A34A;display:inline-block;"></span>
      <span>Control / Policy / Config</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="width:24px;height:2px;border-top:2px dashed #EA580C;display:inline-block;"></span>
      <span>Response / Action</span>
    </div>
  </div>`;
  cell("df_content", dfContent, 16, 752, 374, 84, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // --- Middle Box: ZERO-TRUST PRINCIPLES (x: 398..840, w: 442) ---
  cell("zt_box", "", 398, 734, 442, 106, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("zt_hdr", "<b style=\"font-size:8.5px;color:#0F172A;\">ZERO-TRUST PRINCIPLES</b>", 398, 736, 442, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const ztPrinciples = [
    { t: "Verify<br/>Explicitly", icon: "checkCircle" },
    { t: "Least<br/>Privilege", icon: "lock" },
    { t: "Assume<br/>Breach", icon: "shieldAlert" },
    { t: "Continuous<br/>Monitoring", icon: "activity" },
    { t: "Automate<br/>Enforcement", icon: "repeat" }
  ];
  ztPrinciples.forEach((zp, idx) => {
    const zx = 408 + idx * 85;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(zp.icon as keyof typeof SVG, "#1D4ED8", 16)}</div>
      <div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.15;">${zp.t}</div>
    </div>`;
    cell(`zt_p_${idx}`, html, zx, 756, 80, 78, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- Right Box: NUMBERED LEGEND (x: 848..1584, w: 736) ---
  cell("leg_box", "", 848, 734, 736, 106, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("leg_hdr", "<b style=\"font-size:8.5px;color:#0F172A;\">LEGEND</b>", 848, 736, 736, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const legendItems = [
    { n: "1", t: "Asset &amp; Infrastructure", bg: "#1E40AF" },
    { n: "2", t: "Connectivity", bg: "#EA580C" },
    { n: "3", t: "Visibility &amp; Telemetry", bg: "#D97706" },
    { n: "4", t: "Security Controls", bg: "#16A34A" },
    { n: "5", t: "Detection &amp; Response", bg: "#2563EB" },
    { n: "6", t: "Access &amp; Trust", bg: "#1D4ED8" },
    { n: "7", t: "Consumption", bg: "#1E3A8A" },
    { n: "8", t: "Governance", bg: "#6D28D9" },
    { n: "9", t: "Operations", bg: "#16A34A" },
    { n: "10", t: "Platform Ops", bg: "#EA580C" }
  ];
  const legHtml = `<div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:6px 12px;padding:4px 16px;font-size:7.5px;color:#0F172A;align-items:center;">
    ${legendItems
      .map(
        (li) =>
          `<div style="display:flex;align-items:center;gap:6px;">
            <span style="background:${li.bg};color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:900;">${li.n}</span>
            <span style="font-weight:700;">${li.t}</span>
          </div>`
      )
      .join("")}
  </div>`;
  cell("leg_content", legHtml, 848, 754, 736, 80, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Bottom Notice
  const footerNote = `<span style="font-size:7px;color:#94A3B8;">This reference architecture is designed for illustrative purposes. Customize based on your business requirements, compliance needs, and operational constraints.</span>`;
  cell("footer_note", footerNote, 16, 846, 1100, 20, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const footerCopy = `<span style="font-size:7px;color:#94A3B8;">© 2024 Google Cloud</span>`;
  cell("footer_copy", footerCopy, 1400, 846, 184, 20, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 5. INTER-TIER CONNECTING FLOW ARROWS
  // =========================================================================
  // Upward arrows from 0 to 1
  [233, 412, 591, 770, 949, 1128].forEach((x, idx) => {
    rawEdge(`e_t0_t1_${idx}`, "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 658 },
      { x, y: 654 }
    ]);
  });

  // Upward arrows from 1 to 2
  [226, 359, 492, 625, 758, 891, 1024, 1157].forEach((x, idx) => {
    rawEdge(`e_t1_t2_${idx}`, "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 578 },
      { x, y: 574 }
    ]);
  });

  // Upward arrows from 2 to 3
  [291, 559, 827, 1095].forEach((x, idx) => {
    rawEdge(`e_t2_t3_${idx}`, "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 504 },
      { x, y: 500 }
    ]);
  });

  // Upward arrows from 3 to 4
  [247, 426, 605, 784, 963, 1142].forEach((x, idx) => {
    rawEdge(`e_t3_t4_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 420 },
      { x, y: 416 }
    ]);
  });

  // Upward arrows from 4 to 5
  [247, 426, 605, 784, 963, 1142].forEach((x, idx) => {
    rawEdge(`e_t4_t5_${idx}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 336 },
      { x, y: 332 }
    ]);
  });

  // Upward arrows from 5 to 6
  [247, 426, 605, 784, 963, 1142].forEach((x, idx) => {
    rawEdge(`e_t5_t6_${idx}`, "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 244 },
      { x, y: 240 }
    ]);
  });

  // Upward arrows from 6 to 7
  [247, 426, 605, 784, 963, 1142].forEach((x, idx) => {
    rawEdge(`e_t6_t7_${idx}`, "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 152 },
      { x, y: 148 }
    ]);
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_44" name="Zero-Trust Cybersecurity &amp; SOC Platform">
    <mxGraphModel dx="1600" dy="880" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="880" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
