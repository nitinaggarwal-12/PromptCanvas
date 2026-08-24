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
  rect("num_badge", "34", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>GEOGRAPHIC / REGIONAL ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Last Updated: May 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Deliver low-latency, highly available, and compliant services globally with data residency, disaster recovery, and local user experience.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: PRINCIPLES, CAPABILITIES, TRAFFIC ROUTING (x=20..115, y=72..410)
  rect("box_l_prin", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>ARCHITECTURE PRINCIPLES</div><div style='font-size:10px;line-height:1.3;color:#0F172A;'>✔ Data Residency &amp; Sov<br/>⏱️ Low Latency Exp<br/>📈 High Avail &amp; Resilience<br/>🔒 Security by Design<br/>💰 Cost Optimization<br/>⚙️ Operational Excellence</div>", 20, 72, 95, 110, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_caps", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:2px;'>REGIONAL CAPABILITIES</div><div style='font-size:10px;line-height:1.3;color:#0F172A;'>🗄️ Local Data Storage<br/>⚙️ Regional Compute<br/>📑 Local Monitoring<br/>🔑 KMS &amp; Secrets<br/>🗃️ Local Backup &amp; Rep<br/>🌐 Regional Networking</div>", 20, 185, 95, 110, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_routes", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:2px;'>TRAFFIC ROUTING</div><div style='font-size:10px;line-height:1.3;color:#0F172A;'>🌐 DNS Geo-Routing<br/>🩺 Health Checks<br/>🔄 Failover (Auto)<br/>🛡️ DDoS Protection<br/>🛡️ WAF &amp; Bot Defense</div>", 20, 298, 95, 112, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. TOP CENTER: GLOBAL USER BASE & REGIONAL OVERVIEW (x=122..1560, y=72..160)
  rect("box_users_world", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>GLOBAL USER BASE</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:10px;'><div>👤<br/><b>North America</b></div> <div>👤<br/><b>South America</b></div> <div>👤<br/><b>Europe</b></div> <div>👤<br/><b>Middle East</b></div> <div>👤<br/><b>Asia Pacific</b></div> <div>👤<br/><b>Africa</b></div></div><div style='text-align:center;margin-top:8px;font-size:10px;color:#64748B;'>Global Users ➔ Geo-Distributed Edge Anycast ➔ Closest Primary/Standby Cloud Region</div>", 122, 72, 700, 88, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=3;");

  rect("box_reg_overview", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>REGIONAL OVERVIEW</div><div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>REGION</td><td>LOCATION</td><td>ROLE</td><td>STATUS</td><td>RESIDENCY</td></tr><tr><td><span style='color:#16A34A;'>●</span> <b>NA (US-East)</b></td><td>N. Virginia, USA</td><td>Primary (Active)</td><td><span style='color:#16A34A;font-weight:700;'>Active</span></td><td>US / Canada</td></tr><tr><td><span style='color:#16A34A;'>●</span> <b>EU (Europe)</b></td><td>Frankfurt, Germany</td><td>Primary (Active)</td><td><span style='color:#16A34A;font-weight:700;'>Active</span></td><td>EU / EEA</td></tr><tr><td><span style='color:#16A34A;'>●</span> <b>AP (Asia Pacific)</b></td><td>Singapore</td><td>Primary (Active)</td><td><span style='color:#16A34A;font-weight:700;'>Active</span></td><td>APAC</td></tr><tr><td><span style='color:#D97706;'>●</span> <b>SA (South America)</b></td><td>São Paulo, Brazil</td><td>Warm Standby</td><td><span style='color:#D97706;font-weight:700;'>Standby</span></td><td>South America</td></tr><tr><td><span style='color:#D97706;'>●</span> <b>MEA (Middle East)</b></td><td>UAE (Dubai)</td><td>Warm Standby</td><td><span style='color:#D97706;font-weight:700;'>Standby</span></td><td>Middle East</td></tr><tr><td><span style='color:#2563EB;'>●</span> <b>AF (Africa)</b></td><td>Cape Town, SA</td><td>Backup / DR</td><td><span style='color:#2563EB;font-weight:700;'>DR Ready</span></td><td>Africa</td></tr></table></div>", 830, 72, 730, 88, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 4. MAIN 6 REGIONAL PILLARS (x=122..1560, y=166..380)
  const regPillars = [
    { n: "NORTH AMERICA (US-EAST)", role: "Primary Region", col: "#16A34A", bg: "#F0FDF4", res: "Data Residency: US / Canada" },
    { n: "EUROPE (EUROPE)", role: "Primary Region", col: "#16A34A", bg: "#F0FDF4", res: "Data Residency: EU / EEA" },
    { n: "ASIA PACIFIC (APAC)", role: "Primary Region", col: "#16A34A", bg: "#F0FDF4", res: "Data Residency: Asia Pacific" },
    { n: "SOUTH AMERICA (SA)", role: "Warm Standby Region", col: "#D97706", bg: "#FFFBEB", res: "Data Residency: South America" },
    { n: "MIDDLE EAST (MEA)", role: "Warm Standby Region", col: "#D97706", bg: "#FFFBEB", res: "Data Residency: Middle East" },
    { n: "AFRICA (AFRICA)", role: "Backup / DR Region", col: "#2563EB", bg: "#EFF6FF", res: "Data Residency: Africa" }
  ];

  regPillars.forEach((rp, idx) => {
    const rx = 122 + idx * 240;
    rect(`rp_${idx}`, `<div style='font-size:8px;font-weight:800;color:${rp.col};text-align:center;'>${rp.n}</div><div style='font-size:10px;color:#64748B;text-align:center;margin-bottom:3px;'>${rp.role}</div><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px;border-radius:2px;font-size:10px;margin-bottom:2px;text-align:center;'>🌐 <b>Cloud CDN + DNS</b></div><div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:2px;font-size:10px;margin-bottom:2px;text-align:center;'>⚙️ <b>GKE / Cloud Run</b><br/>(Containers)</div><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px;border-radius:2px;font-size:10px;margin-bottom:2px;text-align:center;'>🗄️ <b>Cloud SQL</b> &nbsp;|&nbsp; 📊 <b>BigQuery</b></div><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px;border-radius:2px;font-size:10px;margin-bottom:2px;text-align:center;'>📨 Pub/Sub • 🧠 Vertex AI • ⚡ Redis</div><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px;border-radius:2px;font-size:10px;margin-bottom:2px;text-align:center;'>📈 Monitoring • 📑 Logging • ⏱️ Trace</div><div style='background:${rp.bg};border:1px solid ${rp.col};color:${rp.col};font-size:10px;font-weight:700;text-align:center;padding:2px;border-radius:2px;margin-top:2px;'>${rp.res}</div>`, rx, 166, 234, 214, `fillColor=#FFFFFF;strokeColor=${rp.col};rounded=1;align=left;verticalAlign=top;padding=2;`);
  });

  // Global Services Strip (y=384..410)
  rect("box_global_svcs", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;'>GLOBAL SERVICES (MULTI-REGION): 🌐 <b>Global DNS (Cloud DNS)</b> &nbsp;|&nbsp; ⚖️ <b>Global LB (Anycast)</b> &nbsp;|&nbsp; 🛡️ <b>DDoS Protection (Cloud Armor)</b> &nbsp;|&nbsp; 🛡️ <b>WAF (Appliance / Cloud)</b> &nbsp;|&nbsp; 🔑 <b>Secrets &amp; KMS (Multi-Region)</b> &nbsp;|&nbsp; 🔒 <b>Identity &amp; Access (Cloud IAM)</b> &nbsp;|&nbsp; 📦 <b>CI/CD Artifacts (Regional Rep)</b></div>", 122, 384, 1438, 26, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // 5. BOTTOM ROW: DATA PROTECTION, FAILOVER FLOW, COMPLIANCE, KEY BENEFITS (x=20..1560, y=546..740)
  rect("bot_dp_dr", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>DATA PROTECTION &amp; DISASTER RECOVERY</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>Primary (Active) ➔ Async Replication ➔ Warm Standby ➔ DR Region (Backup)<br/><br/><b>RPO:</b> ≤ 15 minutes &nbsp;|&nbsp; <b>RTO:</b> ≤ 1 hour</div>", 20, 546, 360, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_failover_flow", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;text-align:center;'>FAILOVER FLOW</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:15px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🩺<br/><b>Health Check<br/>Fails</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🌐<br/><b>DNS Failover</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔄<br/><b>Reroute Traffic</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>⚙️<br/><b>Auto-scale Standby</b></div> <div>➔</div> <div style='border:1px solid #DC2626;background:#FEF2F2;padding:3px;border-radius:3px;'>🔔<br/><b>Notify Teams</b></div></div>", 390, 546, 420, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("bot_comp_res", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>COMPLIANCE &amp; RESIDENCY</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Data stays within region boundaries<br/>✔ Encryption at rest (KMS) &amp; in transit (TLS 1.3)<br/>✔ Local backups &amp; audit logs<br/>✔ Meets GDPR, HIPAA, SOC 2, ISO 27001</div>", 820, 546, 360, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_benefits", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Low latency global user experience<br/>✔ High availability &amp; fault tolerance<br/>✔ Meets local data residency laws<br/>✔ Scalable &amp; cost optimized</div>", 1190, 546, 370, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>NOTES:</b> All regions connected via high-speed private backbone (Global Network). Regular DR drills conducted quarterly.</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_34_geographic_regional_architecture" name="Template 34: Geographic / Regional Architecture">
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
