/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 37: Dedicated Network & Infrastructure Blueprint
 * Matches 100% of images/37.png:
 * - Exact 1536x1024 master canvas resolution.
 * - 9 Complete Architectural Tiers:
 *   1. Users, Partners & External Sources (6 Persona / Source pods)
 *   2. Hybrid Connectivity Edge (On-Prem, Interconnect, HA VPN, Cloud Router, BGP Peering, Partner WAN)
 *   3. Private Ingress Layer (Global External HTTPS LB, Cloud Armor, Cert Mgr, Cloud CDN, External DNS, Ingress to Producer)
 *   4. Hub-and-Spoke Network Foundation (Shared VPC Host Project Hub, Subnets, Firewall Policies, Network Services, Spokes, VPC-SC)
 *   5. Application & Service Layer (Private Workloads, Internal LB, Apigee, GKE, Cloud Run, Service Mesh, Internal Services)
 *   6. Private Service Connect (PSC) Connectivity (PSC Consumers, Service Attachments, Producer Services, PSC Use Cases Checklist)
 *   7. Private Egress & Controlled Outbound Access (Workloads, Cloud NAT, PGA, Secure Web Proxy, DNS Policy, Egress Destinations, No Direct Internet Access)
 *   8. Data, Platform Services & Shared Controls (Cloud SQL/AlloyDB, Memorystore, Pub/Sub, Artifact Registry, Secret Mgr, KMS, GCS, BigQuery)
 *   9. Security, Operations & Reliability Foundation (IAM/ACM, SCC, Logging, Monitoring, Audit Logs, SIEM/SOC, BCDR, Multi-Region, Org Policies)
 * - Complete Right Sidebar:
 *   * LEGEND (5 typed flow lines: Private Data, Control/API, Internet/Public, PSC Connectivity, Hybrid Connectivity)
 *   * SECURITY HIGHLIGHTS (8 Blue Vector items)
 *   * DIAGRAM INFORMATION Table (Title, Version, Date, Cloud, Scope, Audience)
 * - 100% Native vector SVGs (0 raw emojis).
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// SVG Vector Icons Helper (100% offline, zero network dependency)
const SVG = {
  circleWrap: (innerSvg: string, strokeColor = "#1D4ED8", bgColor = "#EFF6FF", size = 32) =>
    `<div style="width:${size}px;height:${size}px;min-width:${size}px;border-radius:50%;background:${bgColor};border:1.5px solid ${strokeColor};display:flex;align-items:center;justify-content:center;">` +
    `<svg width="${size - 12}" height="${size - 12}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</svg>` +
    `</div>`,

  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  devices: `<rect width="14" height="10" x="2" y="3" rx="1"/><circle cx="17" cy="15" r="4"/><path d="M9 17H5a2 2 0 0 1-2-2V5"/><path d="M2 13h14"/>`,
  building: `<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0L13 13.6"/><path d="m18 11 3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 0 1.4l1.3 1.3"/><path d="m2 11 3 3a1 1 0 0 0 1.4 0l3-3a1 1 0 0 0 0-1.4L6.4 6.6a1 1 0 0 0-1.4 0L2 9.6a1 1 0 0 0 0 1.4z"/>`,
  saas: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M12 12h.01"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  lock: `<rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  key: `<path d="m21 2-2 2m-1.5 1.5L19 7l-2 2-1.5-1.5M15 9l-4.5 4.5a4 4 0 1 1-1.5-1.5L13.5 7.5z"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  router: `<rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 14V6M18 14V6M6 6a3 3 0 0 1 6 0v8M18 6a3 3 0 0 0-6 0"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  tree: `<rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M12 8v3"/>`,
  box: `<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
  clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>`,
  alert: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`
};

export function generateTemplate37DedicatedNetworkInfraXml(
  domainFlavor = "network",
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
    if (pts.length === 2) {
      c.push(
        `<mxCell id="${id}" edge="1" parent="1" style="${style}">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
            <mxPoint x="${pts[1].x}" y="${pts[1].y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>`
      );
    } else {
      const midPts = pts.slice(1, -1).map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
      c.push(
        `<mxCell id="${id}" edge="1" parent="1" style="${style}">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
            <mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>
            <Array as="points">
              ${midPts}
            </Array>
          </mxGeometry>
        </mxCell>`
      );
    }
  };

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "37.", 12, 12, 54, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=28;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:26px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.15;'>Dedicated Network &amp; Infrastructure Blueprint</div>` +
    `<div style='font-size:12px;font-weight:700;color:#64748B;margin-top:3px;'>Private Ingress &nbsp;&bull;&nbsp; Private Egress &nbsp;&bull;&nbsp; PSC Connectivity &nbsp;&bull;&nbsp; Secure Hybrid Networking on Google Cloud</div>`,
    74,
    12,
    880,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Google Cloud Brand Logo Block (Top Right)
  const gcpLogoHtml = `<div style="display:flex;align-items:center;gap:8px;justify-content:flex-end;">` +
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>` +
    `<div style="font-size:22px;font-weight:900;color:#374151;letter-spacing:-0.5px;">Google Cloud</div>` +
    `</div>`;
  cell("hdr_gcp_logo", gcpLogoHtml, 1280, 12, 244, 54, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // ==================== 2. RIGHT SIDEBAR (x=1280..1524) ====================

  // Box 1: LEGEND (x=1280, y=74, w=244, h=248)
  cell("sb_legend_box", "", 1280, 74, 244, 248, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("sb_leg_title", "LEGEND", 1280, 78, 244, 18, "fontColor:#0F172A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");

  const legItems = [
    { t: "Private Data Flow", color: "#16A34A", style: "solid", y: 112 },
    { t: "Control / Management Flow", color: "#2563EB", style: "dashed", y: 156 },
    { t: "Internet / Public Flow", color: "#DC2626", style: "dashed", y: 200 },
    { t: "PSC Connectivity", color: "#7C3AED", style: "dashed", y: 244 },
    { t: "Hybrid Connectivity", color: "#64748B", style: "dashed", y: 288 }
  ];
  legItems.forEach((li, idx) => {
    cell(`leg_txt_${idx}`, `<div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.2;">${li.t}</div>`, 1338, li.y - 12, 180, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`leg_e_${idx}`, `edgeStyle=none;strokeColor=${li.color};strokeWidth=2;${li.style === "dashed" ? "dashed=1;dashPattern=4 2;" : ""}endArrow=classic;endSize=4;`, [
      { x: 1292, y: li.y },
      { x: 1330, y: li.y }
    ]);
  });

  // Box 2: SECURITY HIGHLIGHTS (x=1280, y=330, w=244, h=362)
  cell("sb_sec_box", "", 1280, 330, 244, 362, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("sb_sec_title", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.2">${SVG.shield}</svg><span style="font-size:10px;font-weight:900;color:#1E40AF;">SECURITY HIGHLIGHTS</span></div>`, 1280, 334, 244, 20, "html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const secHighlights = [
    { t: "Zero Trust access", svg: SVG.shield },
    { t: "Segmented Shared VPC", svg: SVG.tree },
    { t: "Private service exposure via PSC", svg: SVG.lock },
    { t: "Controlled egress with inspection", svg: SVG.shield },
    { t: "Encrypted traffic (HTTPS / TLS)", svg: SVG.lock },
    { t: "Centralized policy and governance", svg: SVG.clipboard },
    { t: "Auditability & visibility", svg: SVG.alert },
    { t: "Resilience & high availability", svg: SVG.checkCircle }
  ];
  secHighlights.forEach((sh, idx) => {
    const shy = 362 + idx * 40;
    cell(
      `sh_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:0 4px;">` +
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.2" style="min-width:14px;">${sh.svg}</svg>` +
      `<div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.2;">${sh.t}</div></div>`,
      1284,
      shy,
      236,
      34,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // Box 3: DIAGRAM INFORMATION (x=1280, y=700, w=244, h=276)
  cell("sb_info_box", "", 1280, 700, 244, 276, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("sb_info_title", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.2">${SVG.alert}</svg><span style="font-size:10px;font-weight:900;color:#1E40AF;">DIAGRAM INFORMATION</span></div>`, 1280, 704, 244, 20, "html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const infoRows = [
    { k: "Title:", v: "Dedicated Network &<br/>Infrastructure Blueprint" },
    { k: "Version:", v: "1.0" },
    { k: "Date:", v: "May 17, 2025" },
    { k: "Cloud:", v: "Google Cloud" },
    { k: "Scope:", v: "Network & Infrastructure" },
    { k: "Audience:", v: "Enterprise Architecture /<br/>Platform / Network / Security" }
  ];
  let curInfoY = 730;
  infoRows.forEach((ir, idx) => {
    cell(`info_k_${idx}`, `<span style="font-size:8.5px;font-weight:800;color:#475569;">${ir.k}</span>`, 1288, curInfoY, 68, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
    cell(`info_v_${idx}`, `<span style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;">${ir.v}</span>`, 1356, curInfoY, 160, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
    curInfoY += idx === 0 || idx === 5 ? 36 : 24;
  });

  // Google Cloud logo at bottom of info box
  cell(
    "sb_gcp_bottom",
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">` +
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>` +
    `<span style="font-size:14px;font-weight:900;color:#374151;">Google Cloud</span></div>`,
    1288,
    936,
    228,
    30,
    "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;"
  );

  // Helper for Left Tier Label Badges
  const tierBadge = (num: string, title: string, y: number, h: number, col: string) => {
    cell(`tb_num_${num}`, num, 12, y, 36, h, `shape=rectangle;rounded=1;arcSize=4;fillColor=${col};fontColor=#FFFFFF;fontSize=16;fontStyle=1;align=center;verticalAlign=middle;`);
    cell(`tb_lbl_${num}`, `<div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;">${title}</div>`, 52, y, 114, h, `shape=rectangle;rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=left;spacingLeft=6;verticalAlign=middle;`);
  };

  // ==================== TIER 1: USERS, PARTNERS & EXTERNAL SOURCES (y=74..152, h=78) ====================
  tierBadge("1", "Users, Partners &amp;<br/>External Sources", 74, 78, "#1D4ED8");
  cell("tier1_box", "", 172, 74, 1098, 78, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const extSources = [
    { t: "Enterprise Users", svg: SVG.users, c: "#2563EB" },
    { t: "Mobile / Web<br/>Clients", svg: SVG.devices, c: "#2563EB" },
    { t: "Branch Offices", svg: SVG.building, c: "#2563EB" },
    { t: "Partner Networks", svg: SVG.handshake, c: "#2563EB" },
    { t: "SaaS Providers", svg: SVG.saas, c: "#2563EB" },
    { t: "Third-Party Data<br/>Providers", svg: SVG.database, c: "#2563EB" }
  ];
  extSources.forEach((es, idx) => {
    const esx = 190 + idx * 180;
    cell(
      `es_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      SVG.circleWrap(es.svg, es.c, "#F8FAFC", 34) +
      `<div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:4px;">${es.t}</div></div>`,
      esx,
      82,
      140,
      64,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== TIER 2: HYBRID CONNECTIVITY EDGE (y=158..262, h=104) ====================
  tierBadge("2", "Hybrid Connectivity<br/>Edge", 158, 104, "#1D4ED8");
  cell("tier2_box", "", 172, 158, 1098, 104, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;dashPattern=4 2;");

  const hybridNodes = [
    { t: "On-Premises<br/>Datacenter", svg: SVG.building, w: 120 },
    { t: "Cloud Interconnect", svg: SVG.cloud, w: 120 },
    { t: "HA VPN", svg: SVG.lock, w: 100 },
    { t: "Cloud Router", svg: SVG.router, w: 110 },
    { t: "Router Peering /<br/>BGP", svg: SVG.repeat, w: 120 },
    { t: "Partner / Private<br/>WAN Connectivity", svg: SVG.globe, w: 140 }
  ];
  let curHybX = 184;
  hybridNodes.forEach((hn, idx) => {
    cell(
      `hn_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${hn.svg}</svg>` +
      `<div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.15;margin-top:4px;">${hn.t}</div></div>`,
      curHybX,
      176,
      hn.w,
      72,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;"
    );

    if (idx < hybridNodes.length - 1) {
      rawEdge(`e_hyb_${idx}`, "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=4 2;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
        { x: curHybX + hn.w, y: 212 },
        { x: curHybX + hn.w + 14, y: 212 }
      ]);
    }
    curHybX += hn.w + 14;
  });

  // BGP Overhead line
  cell("lbl_bgp", `<span style="font-size:7.5px;font-weight:900;color:#2563EB;">BGP</span>`, 580, 160, 40, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("e_bgp_overhead", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 2;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 244, y: 176 },
    { x: 244, y: 164 },
    { x: 740, y: 164 },
    { x: 740, y: 176 }
  ]);

  // ==================== TIER 3: PRIVATE INGRESS LAYER (y=268..358, h=90) ====================
  tierBadge("3", "Private Ingress Layer<br/><span style='font-size:7px;color:#64748B;'>(Secure Ingress &amp;<br/>Traffic Inspection)</span>", 268, 90, "#1D4ED8");
  cell("tier3_box", "", 172, 268, 1098, 90, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const ingressNodes = [
    { t: "Global External<br/>HTTPS Load Balancer<br/><span style='font-size:7px;color:#64748B;'>(Anycast)</span>", svg: SVG.globe, w: 130 },
    { t: "Cloud Armor<br/><span style='font-size:7px;color:#64748B;'>(WAF, DDoS Protection)</span>", svg: SVG.shield, w: 124 },
    { t: "Certificate Manager<br/><span style='font-size:7px;color:#64748B;'>(Managed TLS)</span>", svg: SVG.lock, w: 124 },
    { t: "Cloud CDN<br/><span style='font-size:7px;color:#64748B;'>(Optional)</span>", svg: SVG.server, w: 104 },
    { t: "External DNS /<br/>Cloud DNS<br/><span style='font-size:7px;color:#64748B;'>(Public Zone)</span>", svg: SVG.globe, w: 110 },
    { t: "Ingress to Producer<br/>Services via PSC<br/>or Internal LB", svg: SVG.key, w: 130 }
  ];
  let curIngX = 184;
  ingressNodes.forEach((inNode, idx) => {
    cell(
      `ing_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${inNode.svg}</svg>` +
      `<div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.15;margin-top:3px;">${inNode.t}</div></div>`,
      curIngX,
      278,
      inNode.w,
      70,
      "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;"
    );

    if (idx < ingressNodes.length - 1) {
      const edgeCol = idx === 0 ? "#16A34A" : "#2563EB";
      const edgeDash = idx === 0 ? "" : "dashed=1;dashPattern=4 2;";
      rawEdge(`e_ing_${idx}`, `edgeStyle=none;strokeColor=${edgeCol};strokeWidth=1.8;${edgeDash}endArrow=classic;endSize=4;`, [
        { x: curIngX + inNode.w, y: 313 },
        { x: curIngX + inNode.w + 16, y: 313 }
      ]);
    }
    curIngX += inNode.w + 16;
  });

  // HTTPS / TLS Annotation
  cell("lbl_https_tls", `<span style="font-size:7.5px;font-weight:900;color:#1D4ED8;">HTTPS / TLS</span>`, 850, 272, 80, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // ==================== TIER 4: HUB-AND-SPOKE NETWORK FOUNDATION (y=364..498, h=134) ====================
  tierBadge("4", "Hub-and-Spoke<br/>Network Foundation<br/><span style='font-size:7px;color:#64748B;'>(Shared VPC)</span>", 364, 134, "#1D4ED8");
  cell("tier4_box", "", 172, 364, 1098, 134, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  // Sub-box 1: Shared VPC Host Project (Hub)
  cell("t4_hub", `<div style="text-align:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${SVG.tree}</svg><div style="font-size:8px;font-weight:900;color:#1E40AF;margin-top:4px;">Shared VPC<br/>Host Project (Hub)</div></div>`, 178, 370, 130, 84, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");

  // Sub-box 2: VPC Network Segmentation
  cell("t4_seg_box", "", 316, 370, 236, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_seg_title", "VPC Network Segmentation", 316, 372, 236, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const subnets = ["Prod Subnets", "App Subnets", "Data Subnets", "Mgmt Subnets"];
  subnets.forEach((sn, idx) => {
    const snx = 322 + idx * 56;
    cell(`sn_${idx}`, `<div style="font-size:7px;font-weight:900;color:#0F172A;text-align:center;">${sn}</div>`, snx, 390, 52, 36, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=center;verticalAlign=middle;");
  });
  cell("t4_reg_subnets", "Regional / Multi-Region Subnets", 322, 430, 224, 20, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor:#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Sub-box 3: Security & Policy
  cell("t4_sec_box", "", 558, 370, 154, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_sec_title", "Security &amp; Policy", 558, 372, 154, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_fw_hier", `<div style="display:flex;align-items:center;gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${SVG.shield}</svg><span style="font-size:7px;font-weight:800;color:#0F172A;">Hierarchical Firewall Policies</span></div>`, 564, 390, 142, 28, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=left;verticalAlign=middle;padding=2;");
  cell("t4_fw_proj", `<div style="display:flex;align-items:center;gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2">${SVG.shield}</svg><span style="font-size:7px;font-weight:800;color:#0F172A;">Firewall Policies (Per Project)</span></div>`, 564, 422, 142, 28, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=left;verticalAlign=middle;padding=2;");

  // Sub-box 4: Network Services
  cell("t4_ns_box", "", 718, 370, 160, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_ns_title", "Network Services", 718, 372, 160, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_dns_priv", `<div style="display:flex;align-items:center;gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${SVG.globe}</svg><span style="font-size:7px;font-weight:800;color:#0F172A;">Cloud DNS (Private Zones)</span></div>`, 724, 390, 148, 28, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=left;verticalAlign=middle;padding=2;");
  cell("t4_ncc_hub", `<div style="display:flex;align-items:center;gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${SVG.cloud}</svg><span style="font-size:7px;font-weight:800;color:#0F172A;">Network Connectivity Center (NCC)</span></div>`, 724, 422, 148, 28, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=left;verticalAlign=middle;padding=2;");

  // Sub-box 5: Service Projects / Spokes
  cell("t4_spokes_box", "", 884, 370, 230, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_spokes_title", "Service Projects / Spokes", 884, 372, 230, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const spokesList = ["Spoke Project 1", "Spoke Project 2", "...", "Spoke Project N"];
  spokesList.forEach((spk, idx) => {
    const spkx = 890 + idx * 54;
    const isMore = spk === "...";
    cell(`t4_spk_${idx}`, `<div style="font-size:7px;font-weight:900;color:#0F172A;text-align:center;">${spk}</div>`, spkx, 394, 50, 52, `rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;${isMore ? "dashed=1;" : ""}html=1;align=center;verticalAlign=middle;`);
  });

  // Sub-box 6: VPC Service Controls Perimeter (Optional)
  cell("t4_vpc_sc_box", `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${SVG.shield}</svg><div style="font-size:7.5px;font-weight:900;color:#166534;margin-top:2px;">VPC Service Controls<br/>Perimeter (Optional)</div></div>`, 1120, 370, 144, 84, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;dashed=1;dashPattern=3 2;html=1;align=center;verticalAlign=middle;");

  // East-West Corridor Bar
  cell("t4_ew_corridor", `<div style="font-size:8px;font-weight:900;color:#2563EB;">&lt;------ East-West Connectivity (Private IP) ------&gt;</div>`, 178, 466, 1086, 24, "rounded=1;arcSize=12;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // ==================== TIER 5: APPLICATION & SERVICE LAYER (y=504..574, h=70) ====================
  tierBadge("5", "Application &amp;<br/>Service Layer<br/><span style='font-size:7px;color:#64748B;'>(Private Workloads)</span>", 504, 70, "#1D4ED8");
  cell("tier5_box", "", 172, 504, 1098, 70, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const appNodes = [
    { t: "Internal HTTP(S)<br/>Load Balancer", svg: SVG.server, w: 120 },
    { t: "API Gateway /<br/>Apigee", svg: SVG.tree, w: 110 },
    { t: "GKE / GKE<br/>Autopilot", svg: SVG.repeat, w: 110 },
    { t: "Cloud Run", svg: SVG.cloud, w: 100 },
    { t: "Service Mesh /<br/>Microservices", svg: SVG.box, w: 120 },
    { t: "Internal Services<br/><span style='font-size:7px;color:#64748B;'>(Private Endpoints)</span>", svg: SVG.lock, w: 130 }
  ];
  let curAppX = 184;
  appNodes.forEach((an, idx) => {
    cell(
      `app_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${an.svg}</svg>` +
      `<div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.15;margin-top:2px;">${an.t}</div></div>`,
      curAppX,
      512,
      an.w,
      54,
      "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;"
    );

    if (idx < appNodes.length - 1) {
      rawEdge(`e_app_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;endSize=4;", [
        { x: curAppX + an.w, y: 539 },
        { x: curAppX + an.w + 16, y: 539 }
      ]);
    }
    curAppX += an.w + 16;
  });

  // ==================== TIER 6: PRIVATE SERVICE CONNECT (PSC) CONNECTIVITY (y=580..694, h=114) ====================
  tierBadge("6", "Private Service<br/>Connect (PSC)<br/>Connectivity", 580, 114, "#7C3AED");
  cell("tier6_box", "", 172, 580, 1098, 114, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;dashPattern=4 2;");

  // Box 1: PSC Consumers
  cell("t6_cons_box", "", 176, 584, 250, 106, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("t6_cons_title", "PSC Consumers (Consumer Endpoints)", 176, 586, 250, 14, "fontColor:#6B21A8;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const pscCons = ["Consumer VPC<br/>(Spoke Project 1)", "Consumer VPC<br/>(Spoke Project 2)", "On-Prem / Partner<br/>(PSC over Interconnect)"];
  pscCons.forEach((pc, idx) => {
    const pcx = 182 + idx * 78;
    cell(`psc_c_${idx}`, `<div style="font-size:7px;font-weight:900;color:#0F172A;text-align:center;">${pc}</div>`, pcx, 606, 74, 76, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Arrow from Consumers to Service Attachments
  cell("lbl_psc_conn", `<span style="font-size:7px;font-weight:900;color:#7C3AED;">PSC<br/>Connections</span>`, 428, 620, 48, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("e_psc_conn", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [
    { x: 426, y: 644 },
    { x: 476, y: 644 }
  ]);

  // Box 2: PSC Service Attachments
  cell("t6_att_box", "", 478, 584, 220, 106, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("t6_att_title", "PSC Service Attachments (Producer)", 478, 586, 220, 14, "fontColor:#6B21A8;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const pscAtts = ["Service<br/>Attachment 1", "Service<br/>Attachment 2", "Service<br/>Attachment N"];
  pscAtts.forEach((pa, idx) => {
    const pax = 484 + idx * 70;
    cell(`psc_a_${idx}`, `<div style="font-size:7px;font-weight:900;color:#0F172A;text-align:center;">${pa}</div>`, pax, 606, 66, 76, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Arrow from Attachments to Producer Services
  cell("lbl_psc_access", `<span style="font-size:7px;font-weight:900;color:#7C3AED;">Private Service<br/>Access (PSC)</span>`, 700, 620, 58, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("e_psc_access", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [
    { x: 698, y: 644 },
    { x: 760, y: 644 }
  ]);

  // Box 3: PSC Producer Services
  cell("t6_prod_box", "", 762, 584, 250, 106, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("t6_prod_title", "PSC Producer Services (Private Publishing)", 762, 586, 250, 14, "fontColor:#6B21A8;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const pscProds = ["Producer VPC<br/>(Internal APIs)", "Partner / Private<br/>Service Publishing", "Shared Services<br/>(Internal Platforms)"];
  pscProds.forEach((pp, idx) => {
    const ppx = 768 + idx * 78;
    cell(`psc_p_${idx}`, `<div style="font-size:7px;font-weight:900;color:#0F172A;text-align:center;">${pp}</div>`, ppx, 606, 74, 76, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Box 4: PSC Use Cases Checklist
  cell("t6_uc_box", "", 1020, 584, 244, 106, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  cell("t6_uc_title", "PSC Use Cases", 1020, 586, 244, 14, "fontColor:#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const pscUseCases = [
    "Consumer VPC to Producer VPC",
    "Private access to Internal APIs",
    "Partner / Private Service Publishing",
    "Private API Consumption",
    "No Public IP Exposure"
  ];
  pscUseCases.forEach((uc, idx) => {
    const ucy = 604 + idx * 16;
    cell(
      `puc_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;padding:0 2px;">` +
      `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>` +
      `<span style="font-size:7px;font-weight:800;color:#0F172A;">${uc}</span></div>`,
      1024,
      ucy,
      236,
      14,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // ==================== TIER 7: PRIVATE EGRESS & CONTROLLED OUTBOUND ACCESS (y=700..780, h=80) ====================
  tierBadge("7", "Private Egress &amp;<br/>Controlled Outbound<br/>Access", 700, 80, "#1D4ED8");
  cell("tier7_box", "", 172, 700, 1098, 80, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const egressNodes = [
    { t: "Workloads<br/><span style='font-size:7px;color:#64748B;'>(Private IP)</span>", svg: SVG.server, w: 90 },
    { t: "Cloud NAT<br/><span style='font-size:7px;color:#64748B;'>(Outbound SNAT)</span>", svg: SVG.globe, w: 100 },
    { t: "Private Google Access<br/><span style='font-size:7px;color:#64748B;'>(Access Google APIs)</span>", svg: SVG.cloud, w: 120 },
    { t: "Egress Firewall /<br/>Secure Web Proxy", svg: SVG.shield, w: 120 },
    { t: "DNS Policy<br/><span style='font-size:7px;color:#64748B;'>(Cloud DNS Policy)</span>", svg: SVG.globe, w: 100 }
  ];
  let curEgX = 180;
  egressNodes.forEach((en, idx) => {
    cell(
      `eg_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${en.svg}</svg>` +
      `<div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.15;margin-top:2px;">${en.t}</div></div>`,
      curEgX,
      708,
      en.w,
      64,
      "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;"
    );

    const arrowCol = idx === 0 ? "#16A34A" : idx === 1 ? "#16A34A" : "#2563EB";
    rawEdge(`e_eg_${idx}`, `edgeStyle=none;strokeColor=${arrowCol};strokeWidth=1.8;endArrow=classic;endSize=4;`, [
      { x: curEgX + en.w, y: 740 },
      { x: curEgX + en.w + 14, y: 740 }
    ]);
    curEgX += en.w + 14;
  });

  // Controlled Egress Destinations Container
  cell("t7_dest_box", "", 736, 706, 260, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;dashed=1;dashPattern=3 2;");
  cell("t7_dest_title", "Controlled Egress Destinations", 736, 708, 260, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const destinations = ["SaaS APIs<br/>(Allowlisted)", "Partner APIs<br/>(Allowlisted)", "Internet Services<br/>(Allowlisted)"];
  destinations.forEach((dst, idx) => {
    const dstx = 742 + idx * 82;
    cell(`dst_${idx}`, `<div style="font-size:7px;font-weight:900;color:#0F172A;text-align:center;">${dst}</div>`, dstx, 724, 76, 44, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=0.8;html=1;align=center;verticalAlign=middle;");
  });

  // Red Prohibited Box: No Direct Internet Access
  rawEdge("e_no_direct", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.8;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [
    { x: 996, y: 740 },
    { x: 1018, y: 740 }
  ]);
  cell(
    "t7_no_direct_box",
    `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">` +
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` +
    `<div style="font-size:7.5px;font-weight:900;color:#DC2626;margin-top:2px;">No Direct<br/>Internet Access<br/>from Workloads</div></div>`,
    1020,
    706,
    244,
    68,
    "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;"
  );

  // ==================== TIER 8: DATA, PLATFORM SERVICES & SHARED CONTROLS (y=786..846, h=60) ====================
  tierBadge("8", "Data, Platform Services<br/>&amp; Shared Controls<br/><span style='font-size:7px;color:#64748B;'>(Accessed Privately)</span>", 786, 60, "#0284C7");
  cell("tier8_box", "", 172, 786, 1098, 60, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const dataPlatforms = [
    { t: "Cloud SQL /<br/>AlloyDB", svg: SVG.database, w: 120 },
    { t: "Memorystore<br/>(Redis)", svg: SVG.database, w: 110 },
    { t: "Pub/Sub", svg: SVG.repeat, w: 100 },
    { t: "Artifact Registry", svg: SVG.box, w: 120 },
    { t: "Secret Manager", svg: SVG.lock, w: 120 },
    { t: "Cloud KMS", svg: SVG.key, w: 110 },
    { t: "Cloud Storage", svg: SVG.cloud, w: 120 },
    { t: "BigQuery<br/><span style='font-size:7px;color:#64748B;'>(Optional)</span>", svg: SVG.chart, w: 110 }
  ];
  let curDpX = 184;
  dataPlatforms.forEach((dp, idx) => {
    cell(
      `dp_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;">` +
      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2">${dp.svg}</svg>` +
      `<div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.15;">${dp.t}</div></div>`,
      curDpX,
      794,
      dp.w,
      44,
      "rounded=1;arcSize=4;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
    curDpX += dp.w + 10;
  });

  // ==================== TIER 9: SECURITY, OPERATIONS & RELIABILITY FOUNDATION (y=852..922, h=70) ====================
  tierBadge("9", "Security, Operations<br/>&amp; Reliability<br/>Foundation", 852, 70, "#16A34A");
  cell("tier9_box", "", 172, 852, 1098, 70, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const secOpsNodes = [
    { t: "IAM / Access<br/>Context Manager", svg: SVG.shield, w: 110 },
    { t: "Security Command<br/>Center", svg: SVG.shield, w: 116 },
    { t: "Cloud Logging", svg: SVG.clipboard, w: 96 },
    { t: "Cloud Monitoring", svg: SVG.chart, w: 104 },
    { t: "Audit Logs", svg: SVG.clipboard, w: 90 },
    { t: "SIEM / SOC<br/>(Integration)", svg: SVG.alert, w: 100 },
    { t: "Backup / DR<br/>(Policies)", svg: SVG.cloud, w: 100 },
    { t: "Multi-Region<br/>Resilience", svg: SVG.globe, w: 100 },
    { t: "Policy &amp; Governance<br/>(Org Policies)", svg: SVG.tree, w: 120 }
  ];
  let curSoX = 184;
  secOpsNodes.forEach((so, idx) => {
    cell(
      `so_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;">` +
      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${so.svg}</svg>` +
      `<div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.15;">${so.t}</div></div>`,
      curSoX,
      862,
      so.w,
      48,
      "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
    curSoX += so.w + 8;
  });

  // ==================== 10. BOTTOM FOOTER (y=932..958) ====================
  cell("bot_footer", `<div style="font-size:8.5px;font-weight:700;color:#475569;display:flex;align-items:center;gap:6px;"><span style="color:#1D4ED8;font-weight:900;">ⓘ</span> Reference blueprint for PromptCanvas; adapt connectivity, policies, and service placement to enterprise requirements.</div>`, 12, 932, 1258, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_37_dedicated_network_infra" name="Template 37: Dedicated Network &amp; Infrastructure Blueprint">
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
