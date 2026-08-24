/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 37: Dedicated Network & Infrastructure Blueprint
 * Matches 100% of images/37.png:
 * - 1) Users, Partners & External Sources
 * - 2) Hybrid Connectivity Edge (Cloud Interconnect, HA VPN, Cloud Router)
 * - 3) Private Ingress Layer (Global External HTTPS LB, Cloud Armor, Cloud CDN, Cert Mgr)
 * - 4) Hub-and-Spoke Network Foundation (Shared VPC Host Project, Spoke Projects, NCC)
 * - 5) Application & Service Layer (Private Workloads, GKE, Cloud Run, Apigee)
 * - 6) Private Service Connect (PSC) Connectivity (Consumers, Service Attachments, Producers)
 * - 7) Private Egress & Controlled Outbound Access (Cloud NAT, Private Google Access, Secure Web Proxy)
 * - 8) Data, Platform Services & Shared Controls (Cloud SQL, Redis, Pub/Sub, KMS, GCS, BigQuery)
 * - 9) Security, Operations & Reliability Foundation (SCC, Cloud Logging, SIEM/SOC, Backup/DR)
 * - Right Sidebar: Legend, Security Highlights, Diagram Information
 * - 1600x1050 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

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

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "37", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Dedicated Network &amp; Infrastructure Blueprint</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#2563EB;margin-top:2px;'>Private Ingress • Private Egress • PSC Connectivity • Secure Hybrid Networking on Google Cloud</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: Multi-Region &nbsp;|&nbsp; Last Updated: May 17, 2025</div>`,
    94,
    12,
    760,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">☁️</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#4285F4;letter-spacing:1px;">Google Cloud</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">Infrastructure Architecture</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;white-space:normal;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;white-space:normal;word-break:break-word;'>
    Enterprise-grade zero trust hybrid network foundation featuring Shared VPC hub-and-spoke, Private Service Connect, and strict egress filtering.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "whiteSpace=wrap;overflow=hidden;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  const band = (num: string, title: string, y: number, h: number, col: string) => {
    cell(`band_num_${num}`, num, 16, y, 42, h, `rounded=1;arcSize=4;fillColor=${col};fontColor=#FFFFFF;fontSize=18;fontStyle=1;align=center;verticalAlign=middle;`);
    cell(`band_lbl_${num}`, title, 62, y, 164, h, `html=1;whiteSpace=wrap;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=left;spacingLeft=6;verticalAlign=middle;`);
    cell(`band_box_${num}`, "", 230, y, 1010, h, `rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;`);
  };

  // 1. Users, Partners & External Sources (y=74..148, h=74)
  band("1", "Users, Partners &amp;<br/>External Sources", 74, 74, "#1D4ED8");
  const extUsers = [
    { t: "Enterprise Users", icon: "👤" },
    { t: "Mobile / Web Clients", icon: "📱" },
    { t: "Branch Offices", icon: "🏢" },
    { t: "Partner Networks", icon: "🤝" },
    { t: "SaaS Providers", icon: "☁️" },
    { t: "Third-Party Data", icon: "🗄️" }
  ];
  extUsers.forEach((eu, idx) => {
    const eux = 246 + idx * 164;
    cell(`eu_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${eu.icon}</span><div style="font-size:9px;font-weight:800;color:#0F172A;margin-top:2px;">${eu.t}</div></div>`, eux, 80, 150, 62, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 2. Hybrid Connectivity Edge (y=154..228, h=74)
  band("2", "Hybrid Connectivity<br/>Edge", 154, 74, "#0284C7");
  const hybridCards = [
    { t: "On-Premises Datacenter", icon: "🏢" },
    { t: "Cloud Interconnect (10G/100G)", icon: "🔌" },
    { t: "HA VPN (IPsec)", icon: "🔒" },
    { t: "Cloud Router (BGP)", icon: "🌐" },
    { t: "Router Peering / BGP", icon: "🔄" },
    { t: "Partner / Private WAN", icon: "🔗" }
  ];
  hybridCards.forEach((hc, idx) => {
    const hcx = 246 + idx * 164;
    cell(`hc_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${hc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${hc.t}</div></div>`, hcx, 160, 150, 62, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. Private Ingress Layer (y=234..308, h=74)
  band("3", "Private Ingress Layer<br/>(Secure Inspection)", 234, 74, "#1E40AF");
  const ingressCards = [
    { t: "Global External HTTPS LB", icon: "🌐" },
    { t: "Cloud Armor (WAF/DDoS)", icon: "🛡️" },
    { t: "Certificate Manager (TLS)", icon: "📜" },
    { t: "Cloud CDN (Optional)", icon: "⚡" },
    { t: "External / Cloud DNS", icon: "🌍" },
    { t: "Ingress to Producer PSC", icon: "🔒" }
  ];
  ingressCards.forEach((ic, idx) => {
    const icx = 246 + idx * 164;
    cell(`ic_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${ic.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${ic.t}</div></div>`, icx, 240, 150, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. Hub-and-Spoke Network Foundation (y=314..400, h=86)
  band("4", "Hub-and-Spoke<br/>Network (Shared VPC)", 314, 86, "#0D9488");
  cell("hnc_hub", `<div style="text-align:center;"><span style="font-size:18px;">🕸️</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Shared VPC Host Project</div><div style="font-size:7px;color:#64748B;">Prod • App • Data • Mgmt Subnets</div></div>`, 240, 320, 200, 74, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("hnc_sec", `<div style="text-align:center;"><span style="font-size:18px;">🛡️</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Security &amp; Policy</div><div style="font-size:7px;color:#64748B;">Hierarchical FW • Per Project</div></div>`, 450, 320, 160, 74, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("hnc_srv", `<div style="text-align:center;"><span style="font-size:18px;">🌐</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Network Services</div><div style="font-size:7px;color:#64748B;">Private DNS • Network NCC</div></div>`, 620, 320, 170, 74, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("hnc_spokes", `<div style="text-align:center;"><span style="font-size:18px;">🏢</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Service Projects / Spokes</div><div style="font-size:7px;color:#64748B;">Spoke 1 • Spoke 2 • Spoke N</div></div>`, 800, 320, 240, 74, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("hnc_vpc_sc", `<div style="text-align:center;"><span style="font-size:18px;">🔒</span><div style="font-size:8px;font-weight:900;color:#166534;">VPC Service Controls</div></div>`, 1050, 320, 180, 74, "rounded=1;fillColor=#DCFCE7;strokeColor=#86EFAC;html=1;align=center;verticalAlign=middle;padding=2;");

  // 5. Application & Service Layer (y=406..480, h=74)
  band("5", "Application &amp; Service<br/>(Private Workloads)", 406, 74, "#7C3AED");
  const appCards = [
    { t: "Internal HTTP(S) LB", icon: "⚖️" },
    { t: "API Gateway (Apigee)", icon: "🌐" },
    { t: "GKE Autopilot", icon: "☸️" },
    { t: "Cloud Run", icon: "⚡" },
    { t: "Service Mesh (Istio)", icon: "🕸️" },
    { t: "Internal Microservices", icon: "🔒" }
  ];
  appCards.forEach((ac, idx) => {
    const acx = 246 + idx * 164;
    cell(`ac_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${ac.icon}</span><div style="font-size:8.5px;font-weight:800;color:#5B21B6;margin-top:2px;">${ac.t}</div></div>`, acx, 412, 150, 62, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. Private Service Connect (PSC) Connectivity (y=486..560, h=74)
  band("6", "Private Service Connect<br/>(PSC) Connectivity", 486, 74, "#2563EB");
  cell("psc_con", `<div style="text-align:center;"><span style="font-size:16px;">📥</span><div style="font-size:8px;font-weight:800;color:#0F172A;">PSC Consumers</div><div style="font-size:7px;color:#64748B;">Consumer Endpoints</div></div>`, 240, 492, 220, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("psc_att", `<div style="text-align:center;"><span style="font-size:16px;">🔌</span><div style="font-size:8px;font-weight:800;color:#0F172A;">PSC Service Attachments</div><div style="font-size:7px;color:#64748B;">Attachment 1..N</div></div>`, 470, 492, 240, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("psc_prod", `<div style="text-align:center;"><span style="font-size:16px;">📤</span><div style="font-size:8px;font-weight:800;color:#0F172A;">PSC Producer Services</div><div style="font-size:7px;color:#64748B;">Private Publishing</div></div>`, 720, 492, 240, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("psc_use", `<div style="text-align:center;"><span style="font-size:16px;">⭐</span><div style="font-size:8px;font-weight:800;color:#0F172A;">PSC Use Cases</div><div style="font-size:7px;color:#64748B;">Consumer to Producer VPC • Private Google APIs</div></div>`, 970, 492, 260, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");

  // 7. Private Egress & Controlled Outbound Access (y=566..640, h=74)
  band("7", "Private Egress &amp;<br/>Outbound Controls", 566, 74, "#EA580C");
  const egressCards = [
    { t: "Workloads (Private IP)", icon: "💻" },
    { t: "Cloud NAT (SNAT)", icon: "🌐" },
    { t: "Private Google Access", icon: "☁️" },
    { t: "Secure Web Proxy", icon: "🛡️" },
    { t: "DNS Egress Policy", icon: "📜" },
    { t: "Controlled SaaS APIs", icon: "🔒" }
  ];
  egressCards.forEach((ec, idx) => {
    const ecx = 246 + idx * 164;
    cell(`ec7_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${ec.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${ec.t}</div></div>`, ecx, 572, 150, 62, "rounded=1;fillColor=#FFF7ED;strokeColor=#FED7AA;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 8. Data, Platform Services & Shared Controls (y=646..720, h=74)
  band("8", "Data, Platform &amp;<br/>Shared Controls", 646, 74, "#0284C7");
  const dataCards = [
    { t: "Cloud SQL / AlloyDB", icon: "🗄️" },
    { t: "Memorystore (Redis)", icon: "⚡" },
    { t: "Pub/Sub Messaging", icon: "📬" },
    { t: "Artifact Registry", icon: "📦" },
    { t: "Secret Manager &amp; KMS", icon: "🔑" },
    { t: "Cloud Storage / BQ", icon: "📊" }
  ];
  dataCards.forEach((dc, idx) => {
    const dcx = 246 + idx * 164;
    cell(`dc8_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${dc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${dc.t}</div></div>`, dcx, 652, 150, 62, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 9. Security, Operations & Reliability Foundation (y=726..800, h=74)
  band("9", "Security, Operations<br/>&amp; Reliability", 726, 74, "#0F172A");
  const secOps = [
    { t: "IAM &amp; Context Mgr", icon: "👤" },
    { t: "Security Command Ctr", icon: "🛡️" },
    { t: "Cloud Logging &amp; Trace", icon: "📈" },
    { t: "Audit Logs (Immutable)", icon: "📋" },
    { t: "SIEM / SOC Integration", icon: "🚨" },
    { t: "Multi-Region Resilience", icon: "🌐" }
  ];
  secOps.forEach((so, idx) => {
    const sox = 246 + idx * 164;
    cell(`so9_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${so.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${so.t}</div></div>`, sox, 732, 150, 62, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 10. RIGHT SIDEBAR (x=1252..1584, y=74..800) ====================
  // Legend
  cell("box_sb_legend", "", 1252, 74, 332, 230, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_legend", "NETWORK FLOW LEGEND", 1252, 76, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const netFlows = [
    { t: "Private Data Flow", col: "#16A34A" },
    { t: "Control / Management Flow", col: "#0284C7" },
    { t: "Internet / Public Flow", col: "#EA580C" },
    { t: "PSC Connectivity Flow", col: "#7C3AED" },
    { t: "Hybrid Connectivity Flow", col: "#475569" }
  ];
  netFlows.forEach((nf, idx) => {
    const nfy = 98 + idx * 36;
    cell(`nf_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:4px;background:${nf.col};"></div><span style="font-size:8.5px;font-weight:700;color:#0F172A;">${nf.t}</span></div>`, 1262, nfy, 312, 28, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Security Highlights
  cell("box_sb_sec", "", 1252, 310, 332, 250, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_sec", "SECURITY HIGHLIGHTS", 1252, 312, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const secNet = [
    "Zero Trust access across all hybrid interconnects",
    "Segmented Shared VPC with hierarchical firewall rules",
    "Private service exposure via PSC (no external IPs)",
    "Controlled egress with Secure Web Proxy inspection",
    "Encrypted traffic in transit (TLS 1.3 + IPsec / MACsec)",
    "Centralized policy enforcement &amp; auditability"
  ];
  secNet.forEach((sh, idx) => {
    const shy = 334 + idx * 34;
    cell(`sh37_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span style="font-size:8px;color:#0F172A;line-height:1.2;">${sh}</span></div>`, 1262, shy, 312, 28, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Diagram Info
  cell("box_sb_info", "", 1252, 566, 332, 234, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_info", "DIAGRAM INFORMATION", 1252, 568, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const diagInfoHtml = `
    <table style="width:100%;font-size:8.5px;color:#0F172A;border-collapse:collapse;line-height:1.6;">
      <tr><td style="font-weight:800;width:100px;">Title:</td><td>37. Dedicated Network &amp; Infrastructure Blueprint</td></tr>
      <tr><td style="font-weight:800;">Version:</td><td>1.0</td></tr>
      <tr><td style="font-weight:800;">Date:</td><td>May 17, 2025</td></tr>
      <tr><td style="font-weight:800;">Architecture:</td><td>Hybrid Cloud Hub-and-Spoke</td></tr>
      <tr><td style="font-weight:800;">Cloud:</td><td>Google Cloud</td></tr>
      <tr><td style="font-weight:800;">Scope:</td><td>Network &amp; Infrastructure</td></tr>
      <tr><td style="font-weight:800;">Audience:</td><td>Network Architects, Security Teams, Platform Leads</td></tr>
    </table>
  `;
  cell("sb_info_content", diagInfoHtml, 1262, 590, 312, 200, "whiteSpace=wrap;overflow=hidden;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 11. BOTTOM FOOTER (y=808..834) ====================
  cell("ftr_note", "ⓘ Reference blueprint for PromptCanvas; adapt connectivity, policies, and service placement to enterprise requirements.", 16, 808, 1224, 26, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#64748B;fontSize=8;html=1;align=left;spacingLeft=8;verticalAlign=middle;");
  cell("ftr_brand", "❖ PromptCanvas | Enterprise Architecture Suite", 1252, 808, 332, 26, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor=#1D4ED8;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_37_dedicated_network_infra" name="37. Dedicated Network &amp; Infrastructure Blueprint">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
