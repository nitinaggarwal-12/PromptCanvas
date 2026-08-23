/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 15 — NETWORK TOPOLOGY DIAGRAM
 * 
 * 1:1 Ground-Truth Reproduction of images/15.png
 * "15 Network Topology Diagram | Regulatory Intelligence Platform (NOVA CURA)"
 * Multi-AZ Shared VPC (10.10.0.0/16) across us-central1-a/b/c, Public/Private/Data Subnets,
 * Managed Services Bus, On-Premises Interconnect, Network Security, Legend & Notes.
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate15NetworkTopologyXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const edge = (id: string, label: string, x1: number, y1: number, x2: number, y2: number, color = "#0F172A", dashed = false, arrow = "block", pts: [number, number][] = []) => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const ptsXml = pts.length > 0 ? `<Array as="points">${pts.map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const labelStyle = label ? `fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.2;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_15", "<b style='font-size:24px;color:#FFFFFF;'>15</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">Network Topology Diagram</div>
    <div style="font-size:11px;font-weight:700;color:#475569;margin-top:2px;">Use Case: Regulatory Intelligence Platform (NOVA CURA) &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 850, 42, "align=left;verticalAlign=middle;");

  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">AI-Powered Regulatory Intelligence Platform</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // Network Overview (Top Right)
  const overviewHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:3px;letter-spacing:0.5px;">NETWORK OVERVIEW</div>
    <table style="width:100%;font-size:7px;color:#1E293B;line-height:1.35;">
      <tr><td style="font-weight:700;color:#64748B;width:75px;">Cloud Provider:</td><td>Google Cloud Platform (GCP)</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Region / VPC:</td><td>us-central1 (Iowa) | novacura-prod-vpc (10.10.0.0/16)</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Multi-AZ / HA:</td><td>Enabled | HA: Enabled</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Connectivity:</td><td>Internet, VPN, Private Service Connect</td></tr>
    </table>
  </div>`;
  rect("card_net_overview", overviewHtml, 1140, 64, 440, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 2. LEFT SIDEBAR: USERS & CLIENTS (x: 20, w: 155) & EXTERNAL CONNECTIVITY (x: 190, w: 135)
  // =========================================================================
  const usersHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:8px;">USERS &amp; CLIENTS</div>
    <div style="font-size:8px;text-align:center;line-height:1.4;">
      <div style="margin-bottom:12px;"><div style="font-size:18px;">👤</div><b>Regulatory Analysts</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:18px;">💻</div><b>Business Users</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:18px;">📱</div><b>Mobile App Users</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:18px;">⚙️</div><b>Partner Systems</b></div>
      <div><div style="font-size:18px;">🌐</div><b>Public APIs / Integrations</b></div>
    </div>
  </div>`;
  rect("card_users_clients", usersHtml, 20, 190, 155, 475, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Internet Cloud
  c.push(`<mxCell id="cloud_internet" value="Internet" style="shape=cloud;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="190" y="240" width="105" height="60" as="geometry"/></mxCell>`);
  edge("e_users_internet", "", 175, 270, 190, 270, "#0F172A");

  // External Connectivity Box (x: 180, y: 360, w: 130, h: 270)
  const extConnHtml = `<div style="padding:6px;text-align:center;">
    <div style="font-size:8px;font-weight:900;color:#7C3AED;margin-bottom:8px;">EXTERNAL CONNECTIVITY</div>
    <div style="margin-bottom:14px;"><div style="font-size:16px;">🛡️</div><div style="font-size:7.5px;font-weight:700;">Cloud Armor<br><span style="font-size:6.5px;color:#64748B;">(DDoS Protection)</span></div></div>
    <div style="margin-bottom:14px;"><div style="font-size:16px;">⚡</div><div style="font-size:7.5px;font-weight:700;">Cloud CDN</div></div>
    <div><div style="font-size:16px;">🌐</div><div style="font-size:7.5px;font-weight:700;">Cloud DNS</div></div>
  </div>`;
  rect("card_ext_conn", extConnHtml, 180, 360, 130, 270, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;align=center;verticalAlign=top;");

  // =========================================================================
  // 3. CENTER VPC TOPOLOGY (x: 330, y: 150, w: 840, h: 630)
  // =========================================================================
  rect("vpc_outer_frame", "", 330, 150, 840, 630, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;arcSize=2;");
  text("vpc_label", "<span style='font-size:9px;font-weight:900;color:#0284C7;'>GCP PROJECT: novacura-prod &nbsp;|&nbsp; VPC: novacura-prod-vpc (10.10.0.0/16)</span>", 345, 158, 600, 20, "align=left;");

  // --- PUBLIC SUBNET (10.10.0.0/24) ---
  rect("public_subnet_frame", "", 350, 190, 800, 95, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;arcSize=2;");
  text("public_subnet_title", "<span style='font-size:8px;font-weight:900;color:#15803D;'>PUBLIC SUBNET (10.10.0.0/24)</span>", 360, 196, 780, 15, "align=center;");

  rect("pub_lb", "<div style='font-size:16px;'>⚖️</div><div style='font-size:7.5px;font-weight:700;'>External<br>HTTP(S) Load Balancer</div>", 380, 220, 180, 50, "fillColor=#FFFFFF;strokeColor=#0284C7;align=center;verticalAlign=middle;");
  rect("pub_apigee", "<div style='font-size:16px;'>🔌</div><div style='font-size:7.5px;font-weight:700;'>API Gateway<br>(Apigee X)</div>", 660, 220, 150, 50, "fillColor=#FFFFFF;strokeColor=#0284C7;align=center;verticalAlign=middle;");
  rect("pub_waf", "<div style='font-size:16px;'>🛡️</div><div style='font-size:7.5px;font-weight:700;'>Web Application<br>Firewall (WAF)</div>", 910, 220, 160, 50, "fillColor=#FFFFFF;strokeColor=#0284C7;align=center;verticalAlign=middle;");

  edge("e_lb_apigee", "", 560, 245, 660, 245, "#0F172A");
  edge("e_apigee_waf", "", 810, 245, 910, 245, "#0F172A");

  // --- PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24) ---
  rect("private_subnet_frame", "", 350, 315, 800, 310, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;arcSize=2;");
  text("private_subnet_title", "<span style='font-size:8px;font-weight:900;color:#1D4ED8;'>PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24)</span>", 360, 322, 780, 15, "align=center;");

  // 3 AZs: us-central1-a, us-central1-b, us-central1-c
  const azs = [
    { id: "az_a", name: "us-central1-a", x: 370 },
    { id: "az_b", name: "us-central1-b", x: 630 },
    { id: "az_c", name: "us-central1-c", x: 890 },
  ];

  azs.forEach(az => {
    rect(`${az.id}_frame`, "", az.x, 345, 240, 265, "fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;dashed=1;dashPattern=4 3;rounded=1;arcSize=3;");
    text(`${az.id}_title`, `<span style='font-size:8px;font-weight:900;color:#0284C7;'>${az.name}</span>`, az.x, 350, 240, 15, "align=center;");

    // Web Tier
    rect(`${az.id}_web`, "<div style='display:flex;align-items:center;gap:6px;'><span style='font-size:16px;'>💻</span><div><div style='font-size:7.5px;font-weight:900;'>Web Tier</div><div style='font-size:6.5px;color:#64748B;'>Compute Engine (App Instances)</div></div></div>", az.x + 10, 375, 220, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

    // App Tier
    rect(`${az.id}_app`, "<div style='display:flex;align-items:center;gap:6px;'><span style='font-size:16px;'>⚙️</span><div><div style='font-size:7.5px;font-weight:900;'>App Tier</div><div style='font-size:6.5px;color:#64748B;'>GKE (Microservices)</div></div></div>", az.x + 10, 450, 220, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

    // Cache Tier
    rect(`${az.id}_cache`, "<div style='display:flex;align-items:center;gap:6px;'><span style='font-size:16px;'>⚡</span><div><div style='font-size:7.5px;font-weight:900;'>Cache Tier</div><div style='font-size:6.5px;color:#64748B;'>Redis (Memorystore)</div></div></div>", az.x + 10, 525, 220, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

    // Inter-tier connectors within AZ
    edge(`e_${az.id}_web_app`, "", az.x + 120, 423, az.x + 120, 450, "#0F172A");
    edge(`e_${az.id}_app_cache`, "", az.x + 120, 498, az.x + 120, 525, "#0F172A");
  });

  // Cross-AZ connectors
  edge("e_az_a_b", "", 610, 474, 630, 474, "#64748B", true, "open");
  edge("e_az_b_c", "", 870, 474, 890, 474, "#64748B", true, "open");

  // Public subnet down to Private subnet
  edge("e_pub_priv_a", "", 470, 270, 490, 345, "#0F172A", true, "open");
  edge("e_pub_priv_b", "", 735, 270, 750, 345, "#0F172A", true, "open");
  edge("e_pub_priv_c", "", 990, 270, 1010, 345, "#0F172A", true, "open");

  // --- DATA SUBNET (10.10.10.0/24) ---
  rect("data_subnet_frame", "", 350, 645, 800, 120, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;arcSize=2;");
  text("data_subnet_title", "<span style='font-size:8px;font-weight:900;color:#7C3AED;'>DATA SUBNET (10.10.10.0/24)</span>", 360, 652, 780, 15, "align=center;");

  rect("db_primary", "<div style='font-size:16px;'>🗄️</div><div style='font-size:7.5px;font-weight:900;'>Primary Database</div><div style='font-size:6.5px;color:#64748B;'>Cloud SQL (PostgreSQL)<br>HA (Multi-AZ)</div>", 380, 675, 190, 65, "fillColor=#FFFFFF;strokeColor=#7C3AED;align=center;verticalAlign=middle;");
  rect("db_storage", "<div style='font-size:16px;'>📦</div><div style='font-size:7.5px;font-weight:900;'>Object Storage</div><div style='font-size:6.5px;color:#64748B;'>Cloud Storage<br>(Documents)</div>", 655, 675, 180, 65, "fillColor=#FFFFFF;strokeColor=#7C3AED;align=center;verticalAlign=middle;");
  rect("db_search", "<div style='font-size:16px;'>🔍</div><div style='font-size:7.5px;font-weight:900;'>Search Index</div><div style='font-size:6.5px;color:#64748B;'>OpenSearch Service<br>(Managed)</div>", 915, 675, 180, 65, "fillColor=#FFFFFF;strokeColor=#7C3AED;align=center;verticalAlign=middle;");

  edge("e_db_storage", "", 570, 707, 655, 707, "#64748B", true, "open");
  edge("e_storage_search", "", 835, 707, 915, 707, "#64748B", true, "open");
  edge("e_cache_data", "", 750, 610, 750, 645, "#0F172A");

  // =========================================================================
  // 4. RIGHT SIDEBAR: MANAGED SERVICES (x: 1200, w: 220)
  // =========================================================================
  const managedServicesHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:8px;">MANAGED SERVICES</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.4;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><span style="font-size:16px;">📊</span><div><b>BigQuery</b><br><span style="font-size:6.5px;color:#64748B;">(Analytics &amp; BI)</span></div></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><span style="font-size:16px;">📡</span><div><b>Pub/Sub</b><br><span style="font-size:6.5px;color:#64748B;">(Event Streaming)</span></div></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><span style="font-size:16px;">📋</span><div><b>Cloud Tasks</b><br><span style="font-size:6.5px;color:#64748B;">(Background Jobs)</span></div></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><span style="font-size:16px;">🧠</span><div><b>Vertex AI</b><br><span style="font-size:6.5px;color:#64748B;">(AI/ML Services)</span></div></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><span style="font-size:16px;">🔒</span><div><b>Secret Manager</b><br><span style="font-size:6.5px;color:#64748B;">(Secrets &amp; Keys)</span></div></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><span style="font-size:16px;">📑</span><div><b>Cloud Logging</b><br><span style="font-size:6.5px;color:#64748B;">(Logs)</span></div></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">📈</span><div><b>Cloud Monitoring</b><br><span style="font-size:6.5px;color:#64748B;">(Metrics &amp; Alerts)</span></div></div>
    </div>
  </div>`;
  rect("card_managed_services", managedServicesHtml, 1200, 160, 220, 520, "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Connectors from VPC to Managed Services
  edge("e_vpc_managed", "", 1170, 380, 1200, 380, "#64748B", true, "open");

  // =========================================================================
  // 5. BOTTOM PANELS: ON-PREM, NETWORK SECURITY, LEGEND, NOTES (y: 800, h: 160)
  // =========================================================================
  // On-Premises / Customer Network (x: 20, w: 320)
  const onPremHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:6px;">🏢 ON-PREMISES / CUSTOMER NETWORK</div>
    <div style="display:flex;align-items:center;justify-content:space-around;">
      <div style="border:1px solid #CBD5E1;padding:4px 6px;border-radius:3px;font-size:7px;text-align:center;">🗄️ Datacenter /<br>On-Prem Systems</div>
      <span>➔</span>
      <div style="border:1px solid #16A34A;background:#F0FDF4;padding:4px 6px;border-radius:3px;font-size:7px;text-align:center;color:#15803D;">🔒 VPN /<br>Interconnect</div>
    </div>
  </div>`;
  rect("card_on_prem", onPremHtml, 20, 800, 320, 150, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Network Security (x: 360, w: 500)
  const netSecHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:8px;text-align:center;">NETWORK SECURITY</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7px;font-weight:700;">
      <div>🛡️ VPC Firewall<br><span style="font-size:6px;color:#64748B;">(Ingress/Egress Rules)</span></div>
      <div>⚡ Private Google<br>Access</div>
      <div>📑 VPC<br>Flow Logs</div>
      <div>🛡️ IDS/IPS<br><span style="font-size:6px;color:#64748B;">(Threat Detection)</span></div>
    </div>
  </div>`;
  rect("card_net_sec", netSecHtml, 360, 800, 500, 150, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=top;");

  // Legend (x: 880, w: 260)
  const legendNetHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">LEGEND</div>
    <table style="width:100%;font-size:7px;color:#1E293B;line-height:1.4;">
      <tr><td style="width:50px;">─────</td><td>Internet Traffic</td></tr>
      <tr><td>- - - - -</td><td>Private/Internal Traffic</td></tr>
      <tr><td>·········</td><td>Service Integration</td></tr>
    </table>
  </div>`;
  rect("card_legend_net", legendNetHtml, 880, 800, 260, 150, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Notes (x: 1160, w: 420)
  const notesNetHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">NOTES</div>
    <div style="font-size:7px;color:#334155;line-height:1.45;">
      <div>• All subnets are in us-central1 (Iowa)</div>
      <div>• Private Google Access enabled for secure cloud egress</div>
      <div>• VPC-native controls for micro-segmentation</div>
      <div>• Multi-AZ for high availability (99.99%)</div>
      <div>• Encrypted in transit (TLS 1.2+) and at rest (Google-managed keys)</div>
    </div>
  </div>`;
  rect("card_notes_net", notesNetHtml, 1160, 800, 420, 150, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Connect On-Prem to VPC
  edge("e_onprem_vpc", "", 340, 860, 360, 860, "#16A34A");

  // =========================================================================
  // 6. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_15_network_topology" name="Template 15: Network Topology Diagram">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
