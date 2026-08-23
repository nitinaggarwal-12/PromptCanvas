/**
 * Canonical Architecture Template 34: Geographic / Regional Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/34.png
 */

export function generateTemplate34GeographicArchitectureXml(
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
  rect("num_badge", "34", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>GEOGRAPHIC / REGIONAL ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Last Updated: May 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Deliver low-latency, highly available, and compliant services globally with data residency, disaster recovery, and local user experience.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: PRINCIPLES, CAPABILITIES & ROUTING (x=20..140, y=78..590)
  rect("box_l_prin", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>ARCHITECTURE PRINCIPLES</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>🛡️ Data Residency &amp; Sov<br/>⏱️ Low Latency Exp<br/>📈 High Avail &amp; Resilience<br/>🔒 Security by Design<br/>💰 Cost Optimization<br/>⚙️ Operational Excellence</div>", 20, 78, 120, 155, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_caps", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>REGIONAL CAPABILITIES</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>🗄️ Local Data Storage<br/>⚙️ Regional Compute<br/>📑 Local Monitoring<br/>🔐 KMS &amp; Secrets<br/>📦 Local Backup &amp; Rep<br/>🌐 Regional Networking</div>", 20, 238, 120, 165, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_rout", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>TRAFFIC ROUTING</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>🌐 DNS Geo-Routing<br/>🩺 Health Checks<br/>🔄 Failover (Auto)<br/>🛡️ DDoS Protection<br/>🛡️ WAF &amp; Bot Defense</div>", 20, 408, 120, 182, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. TOP MIDDLE: GLOBAL USER BASE (x=148..880, y=78..285)
  rect("box_users", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>GLOBAL USER BASE</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>👤<br/>North America</div> <div>👤<br/>South America</div> <div>👤<br/>Europe</div> <div>👤<br/>Middle East</div> <div>👤<br/>Asia Pacific</div> <div>👤<br/>Africa</div>" +
    "</div><div style='font-size:8.5px;color:#64748B;text-align:center;margin-top:12px;'>Global Users ➔ Geo-Distributed Edge Anycast ➔ Closest Primary/Standby Cloud Region</div>", 148, 78, 732, 207, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // 4. TOP RIGHT: REGIONAL OVERVIEW (x=888..1560, y=78..285)
  rect("box_r_ov", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;'>REGIONAL OVERVIEW</div>" +
    "<div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>REGION</td><td>LOCATION</td><td>ROLE</td><td>STATUS</td><td>RESIDENCY</td></tr>" +
    "<tr><td>🟢 <b>NA (US-East)</b></td><td>N. Virginia, USA</td><td>Primary (Active)</td><td style='color:#16A34A;'>Active</td><td>US / Canada</td></tr>" +
    "<tr><td>🟢 <b>EU (Europe)</b></td><td>Frankfurt, Germany</td><td>Primary (Active)</td><td style='color:#16A34A;'>Active</td><td>EU / EEA</td></tr>" +
    "<tr><td>🟢 <b>AP (Asia Pacific)</b></td><td>Singapore</td><td>Primary (Active)</td><td style='color:#16A34A;'>Active</td><td>APAC</td></tr>" +
    "<tr><td>🟠 <b>SA (South America)</b></td><td>São Paulo, Brazil</td><td>Warm Standby</td><td style='color:#D97706;'>Standby</td><td>South America</td></tr>" +
    "<tr><td>🟠 <b>MEA (Middle East)</b></td><td>UAE (Dubai)</td><td>Warm Standby</td><td style='color:#D97706;'>Standby</td><td>Middle East</td></tr>" +
    "<tr><td>🔵 <b>AF (Africa)</b></td><td>Cape Town, SA</td><td>Backup / DR</td><td style='color:#2563EB;'>DR Ready</td><td>Africa</td></tr>" +
    "</table></div>", 888, 78, 672, 207, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. CENTER: 6 REGIONAL ENCLAVE PODS (x=148..1560, y=290..590)
  const regions = [
    { name: "NORTH AMERICA (US-EAST)", role: "Primary Region", tag: "US / Canada", col: "#16A34A", bg: "#F0FDF4", x: 148, w: 232 },
    { name: "EUROPE (EUROPE)", role: "Primary Region", tag: "EU / EEA", col: "#16A34A", bg: "#F0FDF4", x: 384, w: 232 },
    { name: "ASIA PACIFIC (APAC)", role: "Primary Region", tag: "Asia Pacific", col: "#16A34A", bg: "#F0FDF4", x: 620, w: 232 },
    { name: "SOUTH AMERICA (SA)", role: "Warm Standby Region", tag: "South America", col: "#D97706", bg: "#FFFBEB", x: 856, w: 232 },
    { name: "MIDDLE EAST (MEA)", role: "Warm Standby Region", tag: "Middle East", col: "#D97706", bg: "#FFFBEB", x: 1092, w: 232 },
    { name: "AFRICA (AFRICA)", role: "Backup / DR Region", tag: "Africa", col: "#2563EB", bg: "#EFF6FF", x: 1328, w: 232 }
  ];

  regions.forEach((rg, idx) => {
    rect(`rg_box_${idx}`, "", rg.x, 290, rg.w, 300, `fillColor=${rg.bg};strokeColor=${rg.col};strokeWidth=1.2;rounded=1;`);
    rect(`rg_hdr_${idx}`, `<div style='font-size:10px;font-weight:800;color:${rg.col};'>${rg.name}</div><div style='font-size:8.5px;color:#64748B;'>${rg.role}</div>`, rg.x, 294, rg.w, 20, "strokeColor=none;fillColor=none;align=center;");

    rect(`rg_edge_${idx}`, "<div style='font-size:8.5px;font-weight:700;'>🌐 Cloud CDN + DNS</div>", rg.x + 4, 320, rg.w - 8, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`rg_app_${idx}`, "<div style='font-size:8.5px;font-weight:700;'>⚙️ GKE / Cloud Run<br/><span style='font-size:12px;color:#64748B;'>(Containers)</span></div>", rg.x + 4, 360, rg.w - 8, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`rg_data_${idx}`, "<div style='font-size:8.5px;font-weight:700;'>🗄️ Cloud SQL &nbsp;|&nbsp; 📊 BigQuery</div>", rg.x + 4, 408, rg.w - 8, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`rg_svc_${idx}`, "<div style='font-size:8.5px;color:#0F172A;'>📡 Pub/Sub • 🧠 Vertex AI • ⚡ Redis</div>", rg.x + 4, 456, rg.w - 8, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`rg_obs_${idx}`, "<div style='font-size:8.5px;color:#0F172A;'>📈 Monitoring • 📑 Logging • ⏱️ Trace</div>", rg.x + 4, 500, rg.w - 8, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`rg_tag_${idx}`, `<div style='font-size:8.5px;font-weight:800;color:${rg.col};'>Data Residency: ${rg.tag}</div>`, rg.x + 4, 546, rg.w - 8, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // 6. GLOBAL SERVICES STRIP (x=148..1560, y=596..642)
  rect("bar_glob_svcs", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>GLOBAL SERVICES (MULTI-REGION)</div>" +
    "<div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🌐 <b>Global DNS</b><br/>(Cloud DNS)</div>" +
    "<div>⚖️ <b>Global LB</b><br/>(Anycast)</div>" +
    "<div>🛡️ <b>DDoS Protection</b><br/>(Cloud Armor)</div>" +
    "<div>🛡️ <b>WAF</b><br/>(Appliance / Cloud)</div>" +
    "<div>🔐 <b>Secrets &amp; KMS</b><br/>(Multi-Region)</div>" +
    "<div>👤 <b>Identity &amp; Access</b><br/>(Cloud IAM)</div>" +
    "<div>📦 <b>CI/CD Artifacts</b><br/>(Regional Rep)</div>" +
    "</div>", 148, 596, 1412, 46, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  // 7. BOTTOM ROW: DATA PROTECTION, FAILOVER, COMPLIANCE, BENEFITS (x=20..1560, y=648..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>DATA PROTECTION &amp; DISASTER RECOVERY</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>Primary (Active) ➔ Async Replication ➔ Warm Standby ➔ DR Region (Backup)<br/><br/><b>RPO:</b> ≤ 15 minutes &nbsp;|&nbsp; <b>RTO:</b> ≤ 1 hour</div>", 20, 648, 380, 124, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;text-align:center;'>FAILOVER FLOW</div><div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div>🩺<br/>Health Check Fails</div> <div>➔</div> <div>🌐<br/>DNS Failover</div> <div>➔</div> <div>⚖️<br/>Reroute Traffic</div> <div>➔</div> <div>⚡<br/>Auto-scale Standby</div> <div>➔</div> <div>🔔<br/>Notify Teams</div></div>", 408, 648, 480, 124, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>COMPLIANCE &amp; RESIDENCY</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>✔ Data stays within region boundaries<br/>✔ Encryption at rest (KMS) &amp; in transit (TLS 1.3)<br/>✔ Local backups &amp; audit logs<br/>✔ Meets GDPR, HIPAA, SOC 2, ISO 27001</div>", 896, 648, 330, 124, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>✔ Low latency global user experience<br/>✔ High availability &amp; fault tolerance<br/>✔ Meets local data residency laws<br/>✔ Scalable &amp; cost optimized</div>", 1234, 648, 326, 124, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=776..805)
  rect("footer_meta", "<div style='font-size:10.5px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>NOTES:</b> All regions connected via high-speed private backbone (Global Network). Regular DR drills conducted quarterly.</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 776, 1540, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_34_geographic_architecture" name="Template 34: Geographic / Regional Architecture">
    <mxGraphModel dx="1440" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
