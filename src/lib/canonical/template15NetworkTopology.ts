/**
 * Canonical Architecture Template 15: Network Topology Diagram
 * Exact 1:1 High-Fidelity Master Blueprint of images/15.png
 */

export function generateTemplate15NetworkTopologyXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts: Array<{x: number, y: number}> = []) => {
    let ptsXml = "";
    if (pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "15", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Network Topology Diagram</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: Regulatory Intelligence Platform (NOVA CURA) &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Overview Card
  rect("card_ov", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NETWORK OVERVIEW</div><div style='font-size:9px;line-height:1.3;color:#0F172A;'><b>Cloud Provider:</b> Google Cloud Platform (GCP)<br/><b>Region:</b> us-central1 (Iowa)<br/><b>VPC:</b> novacura-prod-vpc (10.10.0.0/16)<br/><b>Multi-AZ:</b> Enabled &nbsp;|&nbsp; <b>HA:</b> Enabled<br/><b>Connectivity:</b> Internet, VPN, Private Service Connect</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 2. USERS & CLIENTS (x=20..115, y=72..540)
  rect("box_users", "", 20, 72, 95, 465, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_users", "<span style='font-size:10px;font-weight:800;color:#16A34A;'>USERS &amp; CLIENTS</span>", 20, 75, 95, 14, "strokeColor=none;fillColor=none;align=center;");

  const clients = [
    { t: "Regulatory Analysts", icon: "👤" },
    { t: "Business Users", icon: "👥" },
    { t: "Mobile App Users", icon: "📱" },
    { t: "Partner Systems", icon: "🏢" },
    { t: "Public APIs / Integrations", icon: "🌐" }
  ];
  clients.forEach((cl, idx) => {
    const cy = 96 + idx * 86;
    rect(`cl_${idx}`, `<div style='font-size:14px;text-align:center;'>${cl.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;margin-top:2px;'>${cl.t}</div>`, 26, cy, 83, 62, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. EXTERNAL CONNECTIVITY (x=122..205, y=72..540)
  rect("box_ext", "", 122, 72, 85, 465, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_ext", "<span style='font-size:10px;font-weight:800;color:#7C3AED;'>EXTERNAL<br/>CONNECTIVITY</span>", 122, 75, 85, 20, "strokeColor=none;fillColor=none;align=center;");

  rect("ext_internet", "<div style='font-size:16px;text-align:center;'>🌐</div><div style='font-size:10px;font-weight:800;color:#2563EB;'>Internet</div>", 128, 106, 73, 56, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("ext_armor", "<div style='font-size:14px;text-align:center;'>🛡️</div><div style='font-size:9px;font-weight:700;'>Cloud Armor<br/><span style='color:#64748B;font-size:8px;'>(DDoS Protection)</span></div>", 128, 195, 73, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ext_cdn", "<div style='font-size:14px;text-align:center;'>⚡</div><div style='font-size:9px;font-weight:700;'>Cloud CDN</div>", 128, 285, 73, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ext_dns", "<div style='font-size:14px;text-align:center;'>🔍</div><div style='font-size:9px;font-weight:700;'>Cloud DNS</div>", 128, 375, 73, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 4. GCP MAIN PROJECT CONTAINER (x=214..1380, y=72..540)
  rect("box_gcp", "", 214, 72, 1166, 465, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_gcp", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>GCP PROJECT: novacura-prod &nbsp;|&nbsp; VPC: novacura-prod-vpc (10.10.0.0/16)</span>", 214, 75, 1166, 14, "strokeColor=none;fillColor=none;align=center;");

  // Public Subnet (10.10.0.0/24)
  rect("box_pub_sub", "", 224, 94, 1146, 75, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;rounded=1;");
  rect("lbl_pub_sub", "<span style='font-size:10px;font-weight:800;color:#16A34A;'>PUBLIC SUBNET (10.10.0.0/24)</span>", 224, 96, 1146, 12, "strokeColor=none;fillColor=none;align=center;");

  rect("pub_lb", "<div style='font-size:14px;text-align:center;'>⚖️</div><div style='font-size:9px;font-weight:700;'>External HTTP(S) Load Balancer</div>", 240, 112, 230, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pub_gw", "<div style='font-size:14px;text-align:center;'>🛡️</div><div style='font-size:9px;font-weight:700;'>API Gateway (Apigee X)</div>", 680, 112, 230, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pub_waf", "<div style='font-size:14px;text-align:center;'>🧱</div><div style='font-size:9px;font-weight:700;'>Web Application Firewall (WAF)</div>", 1120, 112, 230, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Private Subnets (10.10.1.0/24 - 10.10.3.0/24)
  rect("box_priv_sub", "", 224, 175, 1146, 215, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;dashed=1;");
  rect("lbl_priv_sub", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24)</span>", 224, 177, 1146, 12, "strokeColor=none;fillColor=none;align=center;");

  const azs = [
    { name: "us-central1-a", x: 236, w: 360 },
    { name: "us-central1-b", x: 616, w: 360 },
    { name: "us-central1-c", x: 996, w: 360 }
  ];

  azs.forEach((az, idx) => {
    rect(`az_box_${idx}`, "", az.x, 192, az.w, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
    rect(`az_lbl_${idx}`, `<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>${az.name}</span>`, az.x, 194, az.w, 12, "strokeColor=none;fillColor=none;align=center;");

    rect(`az_${idx}_web`, "<div style='font-size:9px;font-weight:700;'>🖥️ Web Tier<br/><span style='color:#64748B;font-size:8px;'>Compute Engine (App Instances)</span></div>", az.x + 8, 210, az.w - 16, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`az_${idx}_app`, "<div style='font-size:9px;font-weight:700;'>⚙️ App Tier<br/><span style='color:#64748B;font-size:8px;'>GKE (Microservices)</span></div>", az.x + 8, 266, az.w - 16, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
    rect(`az_${idx}_cache`, "<div style='font-size:9px;font-weight:700;'>⚡ Cache Tier<br/><span style='color:#64748B;font-size:8px;'>Redis (Memorystore)</span></div>", az.x + 8, 324, az.w - 16, 48, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");
  });

  // Data Subnet (10.10.10.0/24)
  rect("box_data_sub", "", 224, 396, 1146, 132, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;rounded=1;");
  rect("lbl_data_sub", "<span style='font-size:10px;font-weight:800;color:#7C3AED;'>DATA SUBNET (10.10.10.0/24)</span>", 224, 398, 1146, 12, "strokeColor=none;fillColor=none;align=center;");

  rect("db_sql", "<div style='font-size:16px;text-align:center;'>🗄️</div><div style='font-size:10px;font-weight:800;color:#0F172A;'>Primary Database</div><div style='font-size:9px;color:#64748B;'>Cloud SQL (PostgreSQL) • HA (Multi-AZ)</div>", 250, 420, 320, 96, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");
  rect("db_gcs", "<div style='font-size:16px;text-align:center;'>🗃️</div><div style='font-size:10px;font-weight:800;color:#0F172A;'>Object Storage</div><div style='font-size:9px;color:#64748B;'>Cloud Storage (Documents)</div>", 636, 420, 320, 96, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");
  rect("db_search", "<div style='font-size:16px;text-align:center;'>🔍</div><div style='font-size:10px;font-weight:800;color:#0F172A;'>Search Index</div><div style='font-size:9px;color:#64748B;'>OpenSearch Service (Managed)</div>", 1022, 420, 320, 96, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 5. MANAGED SERVICES (x=1388..1560, y=72..540)
  rect("box_mgd", "", 1388, 72, 172, 465, "fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;rounded=1;");
  rect("lbl_mgd", "<span style='font-size:10px;font-weight:800;color:#D97706;'>MANAGED SERVICES</span>", 1388, 75, 172, 14, "strokeColor=none;fillColor=none;align=center;");

  const mgdSvcs = [
    { t: "BigQuery", sub: "(Analytics &amp; BI)", icon: "📊" },
    { t: "Pub/Sub", sub: "(Event Streaming)", icon: "📨" },
    { t: "Cloud Tasks", sub: "(Background Jobs)", icon: "📋" },
    { t: "Vertex AI", sub: "(AI/ML Services)", icon: "🧠" },
    { t: "Secret Manager", sub: "(Secrets &amp; Keys)", icon: "🔒" },
    { t: "Cloud Logging", sub: "(Logs)", icon: "📑" },
    { t: "Cloud Monitoring", sub: "(Metrics &amp; Alerts)", icon: "📈" }
  ];

  mgdSvcs.forEach((ms, idx) => {
    const my = 96 + idx * 62;
    rect(`ms_${idx}`, `<div style='font-size:11px;text-align:center;'>${ms.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${ms.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${ms.sub}</div>`, 1396, my, 156, 52, "fillColor=#FFFBEB;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. BOTTOM ROW: ON-PREMISES, NETWORK SECURITY, LEGEND & NOTES (x=20..1560, y=546..740)
  rect("bot_onprem", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>🏢 ON-PREMISES / CUSTOMER NETWORK</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:12px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:6px;border-radius:4px;'>🏢<br/><b>Datacenter /<br/>On-Prem Systems</b></div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:6px;border-radius:4px;'>🔒<br/><b>VPN / Interconnect</b></div></div>", 20, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_sec", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:4px;text-align:center;'>NETWORK SECURITY</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:14px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:6px;border-radius:4px;'>🧱<br/><b>VPC Firewall</b><br/><span style='color:#64748B;font-size:8px;'>(Ingress/Egress Rules)</span></div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:6px;border-radius:4px;'>🔒<br/><b>Private Google<br/>Access</b></div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:6px;border-radius:4px;'>📊<br/><b>VPC<br/>Flow Logs</b></div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:6px;border-radius:4px;'>🛡️<br/><b>IDS/IPS</b><br/><span style='color:#64748B;font-size:8px;'>(Threat Detection)</span></div></div>", 280, 546, 480, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_legend", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>LEGEND</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>── Internet Traffic<br/>- - Private/Internal Traffic<br/>······ Service Integration<br/><span style='background:#F0FDF4;border:1px solid #16A34A;padding:1px 4px;border-radius:2px;'>■</span> Public Network &nbsp; <span style='background:#EFF6FF;border:1px solid #2563EB;padding:1px 4px;border-radius:2px;'>■</span> Private Network &nbsp; <span style='background:#FAF5FF;border:1px solid #7C3AED;padding:1px 4px;border-radius:2px;'>■</span> Data Network</div>", 770, 546, 380, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>NOTES</div><div style='font-size:9px;line-height:1.45;color:#64748B;'>• All subnets are in us-central1 (Iowa)<br/>• Private Google Access enabled<br/>• VPC-native controls for segmentation<br/>• Multi-AZ for high availability<br/>• Encrypted in transit (TLS 1.2+)<br/>• Encrypted at rest (Google-managed keys)</div>", 1160, 546, 400, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_15_network_topology" name="Template 15: Network Topology Diagram">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
