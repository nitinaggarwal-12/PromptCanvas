/**
 * Canonical Architecture Template 31: Dependency / Relationship Map
 * Exact 1:1 High-Fidelity Master Blueprint of images/31.png
 */

export function generateTemplate31DependencyMapXml(
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
  rect("num_badge", "31", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>DEPENDENCY / RELATIONSHIP MAP</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Visualize and manage dependencies across applications, data, infrastructure, teams, and external partners to reduce risk and improve delivery velocity.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: LEGEND & KEY (x=20..140, y=78..560)
  rect("box_l_leg", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>LEGEND &amp; KEY</div>" +
    "<div style='font-size:9px;line-height:1.4;color:#0F172A;'>" +
    "<b>Node Types:</b><br/>" +
    "⚙️ Application / Service<br/>" +
    "🗄️ Data Store / DB<br/>" +
    "🏗️ Platform / Infra<br/>" +
    "🌐 External Partner<br/>" +
    "🔌 Interface / Integration<br/>" +
    "👥 Team / Owner<br/><br/>" +
    "<b>Dependency Types:</b><br/>" +
    "── Data Flow (R/W)<br/>" +
    "····· API / Integration<br/>" +
    "- - - Async / Event<br/>" +
    "─·─ Config / Control<br/><br/>" +
    "<b>Criticality:</b><br/>" +
    "🔴 Critical (High)<br/>" +
    "🟠 High<br/>" +
    "🟡 Medium<br/>" +
    "🟢 Low" +
    "</div>", 20, 78, 120, 482, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 3. CENTER CONTAINER: DEPENDENCY MAP TIERS (x=148..1120, y=78..560)
  rect("box_dep_map", "", 148, 78, 972, 482, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_dep_map", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>NOVACURA – DEPENDENCY MAP (HIGH LEVEL)</span>", 148, 82, 972, 14, "strokeColor=none;fillColor=none;align=center;");

  // Tier 1: USERS & CHANNELS (y=98..150)
  rect("t1_strip", "", 156, 98, 956, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("t1_lbl", "<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;'>USERS &amp;<br/>CHANNELS</div>", 158, 102, 55, 44, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const t1Nodes = ["👥 Regulatory Users", "👥 QA / Compliance", "🏢 External Partners", "📱 Mobile Users", "👤 Admin Users"];
  t1Nodes.forEach((tn, idx) => {
    rect(`t1_n_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${tn}</div>`, 220 + idx * 175, 104, 165, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // Tier 2: APPLICATIONS (y=154..220)
  rect("t2_strip", "", 156, 154, 956, 66, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("t2_lbl", "<div style='font-size:9.5px;font-weight:800;color:#2563EB;'>APPLICATIONS</div>", 158, 160, 55, 54, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const t2Nodes = [
    { t: "Web Portal", s: "(Frontend)" },
    { t: "API Gateway", s: "(Apigee)" },
    { t: "Auth Service", s: "(Identity)" },
    { t: "AI Service", s: "(LLM / Agents)" },
    { t: "Document", s: "Processing" },
    { t: "Search &amp; RAG", s: "Service" },
    { t: "Reporting &amp;", s: "Analytics" }
  ];
  t2Nodes.forEach((tn, idx) => {
    rect(`t2_n_${idx}`, `<div style='font-size:9px;font-weight:700;'>⚙️ ${tn.t}<br/><span style='font-size:8.5px;color:#64748B;'>${tn.s}</span></div>`, 218 + idx * 126, 160, 120, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Tier 3: DATA LAYER (y=224..290)
  rect("t3_strip", "", 156, 224, 956, 66, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;rounded=1;");
  rect("t3_lbl", "<div style='font-size:9.5px;font-weight:800;color:#16A34A;'>DATA LAYER</div>", 158, 230, 55, 54, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const t3Nodes = [
    { t: "Operational DB", s: "(Cloud SQL)" },
    { t: "Vector DB", s: "(Vertex AI Vector)" },
    { t: "Document Store", s: "(Cloud Storage)" },
    { t: "Data Warehouse", s: "(BigQuery)" },
    { t: "Cache", s: "(Memorystore)" },
    { t: "Audit Logs", s: "(Cloud Logging)" }
  ];
  t3Nodes.forEach((tn, idx) => {
    rect(`t3_n_${idx}`, `<div style='font-size:9px;font-weight:700;'>🗄️ ${tn.t}<br/><span style='font-size:8.5px;color:#64748B;'>${tn.s}</span></div>`, 220 + idx * 148, 230, 142, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Tier 4: INTEGRATIONS (y=294..360)
  rect("t4_strip", "", 156, 294, 956, 66, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1;rounded=1;");
  rect("t4_lbl", "<div style='font-size:9.5px;font-weight:800;color:#D97706;'>INTEGRATIONS</div>", 158, 300, 55, 54, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const t4Nodes = [
    { t: "Salesforce", s: "(CRM)" },
    { t: "Veeva Vault", s: "(eCTD / Quality)" },
    { t: "FDA APIs", s: "(Public Data)" },
    { t: "EMA APIs", s: "(EU Regs)" },
    { t: "Email Service", s: "(SendGrid)" },
    { t: "Slack", s: "(Webhook)" },
    { t: "Partner SFTP", s: "(Batch Data)" }
  ];
  t4Nodes.forEach((tn, idx) => {
    rect(`t4_n_${idx}`, `<div style='font-size:9px;font-weight:700;'>🔌 ${tn.t}<br/><span style='font-size:8.5px;color:#64748B;'>${tn.s}</span></div>`, 218 + idx * 126, 300, 120, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Tier 5: PLATFORM / INFRASTRUCTURE (y=364..430)
  rect("t5_strip", "", 156, 364, 956, 66, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("t5_lbl", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;'>PLATFORM /<br/>INFRA</div>", 158, 370, 55, 54, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const t5Nodes = [
    { t: "Google Cloud", s: "(VPC, Network)" },
    { t: "Kubernetes Engine", s: "(GKE)" },
    { t: "Cloud Run", s: "(Containers)" },
    { t: "Vertex AI", s: "(Models)" },
    { t: "Cloud Armor", s: "(Security)" },
    { t: "Cloud Monitoring", s: "&amp; Alerting" },
    { t: "Cloud Backup", s: "&amp; DR" }
  ];
  t5Nodes.forEach((tn, idx) => {
    rect(`t5_n_${idx}`, `<div style='font-size:9px;font-weight:700;'>🏗️ ${tn.t}<br/><span style='font-size:8.5px;color:#64748B;'>${tn.s}</span></div>`, 218 + idx * 126, 370, 120, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Tier 6: TEAMS / OWNERS (y=434..550)
  rect("t6_strip", "", 156, 434, 956, 116, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("t6_lbl", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;'>TEAMS /<br/>OWNERS</div>", 158, 440, 55, 100, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const t6Nodes = [
    { t: "Product Team", s: "(Platform)" },
    { t: "Data Eng Team", s: "" },
    { t: "ML/AI Eng Team", s: "" },
    { t: "Security Team", s: "" },
    { t: "DevOps / SRE", s: "" },
    { t: "Compliance &amp; QA", s: "" },
    { t: "Business Owners", s: "(LOB)" }
  ];
  t6Nodes.forEach((tn, idx) => {
    rect(`t6_n_${idx}`, `<div style='font-size:9px;font-weight:700;'>👥 ${tn.t}<br/><span style='font-size:8.5px;color:#64748B;'>${tn.s}</span></div>`, 218 + idx * 126, 440, 120, 100, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. FAR RIGHT: CATALOG, EXTERNAL & RISK MATRIX (x=1128..1560, y=78..560)
  rect("box_r_cat", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>DEPENDENCY CATALOG (KEY)</div>" +
    "<div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>ID</td><td>FROM</td><td>TO</td><td>TYPE</td><td>CRIT</td></tr>" +
    "<tr><td>D-01</td><td>Web Portal</td><td>API Gateway</td><td>API</td><td style='color:#DC2626;'>🔴</td></tr>" +
    "<tr><td>D-02</td><td>API Gateway</td><td>Auth Service</td><td>API</td><td style='color:#DC2626;'>🔴</td></tr>" +
    "<tr><td>D-03</td><td>AI Service</td><td>Vector DB</td><td>Data</td><td style='color:#DC2626;'>🔴</td></tr>" +
    "<tr><td>D-04</td><td>Doc Processing</td><td>Doc Store</td><td>Data</td><td style='color:#D97706;'>🟠</td></tr>" +
    "<tr><td>D-05</td><td>Search Service</td><td>BigQuery</td><td>Data</td><td style='color:#16A34A;'>🟢</td></tr>" +
    "<tr><td>D-06</td><td>Reporting</td><td>BigQuery</td><td>Data</td><td style='color:#16A34A;'>🟢</td></tr>" +
    "<tr><td>D-07</td><td>API Gateway</td><td>Salesforce</td><td>API</td><td style='color:#D97706;'>🟠</td></tr>" +
    "<tr><td>D-08</td><td>System</td><td>Email Service</td><td>Async</td><td style='color:#16A34A;'>🟢</td></tr>" +
    "<tr><td>D-09</td><td>All Apps</td><td>Cloud Monitor</td><td>Config</td><td style='color:#16A34A;'>🟢</td></tr>" +
    "</table></div>", 1128, 78, 432, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_ext", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>EXTERNAL DEPENDENCIES</div>" +
    "<div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>SYSTEM</td><td>PURPOSE</td><td>CONTROL</td><td>CRIT</td></tr>" +
    "<tr><td><b>Salesforce</b></td><td>Customer Data</td><td>API Contract</td><td>High</td></tr>" +
    "<tr><td><b>Veeva Vault</b></td><td>Regulatory Docs</td><td>API Contract</td><td>High</td></tr>" +
    "<tr><td><b>FDA APIs</b></td><td>Regulatory Data</td><td>Public Rate Limit</td><td>Med</td></tr>" +
    "<tr><td><b>EMA APIs</b></td><td>Regulatory Data</td><td>Public Rate Limit</td><td>Med</td></tr>" +
    "<tr><td><b>SendGrid</b></td><td>Email Alerts</td><td>API Limits</td><td>Med</td></tr>" +
    "<tr><td><b>Partner SFTP</b></td><td>Batch File Exch</td><td>Network, VPN</td><td>Med</td></tr>" +
    "</table></div>", 1128, 258, 432, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_matrix", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>DEPENDENCY RISK MATRIX</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;text-align:center;'>" +
    "<tr style='font-weight:800;'><td>LIKELIHOOD ↓</td><td>Low(1)</td><td>Med(2)</td><td>High(3)</td><td>Crit(4)</td></tr>" +
    "<tr><td><b>High</b></td><td style='background:#FEF9C3;'>M (2)</td><td style='background:#FED7AA;'>H (4)</td><td style='background:#FECACA;'>H (6)</td><td style='background:#FECACA;'>C (8)</td></tr>" +
    "<tr><td><b>Med</b></td><td style='background:#DCFCE7;'>L (2)</td><td style='background:#FEF9C3;'>M (4)</td><td style='background:#FED7AA;'>H (6)</td><td style='background:#FECACA;'>C (8)</td></tr>" +
    "<tr><td><b>Low</b></td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>L (2)</td><td style='background:#FEF9C3;'>M (3)</td><td style='background:#FED7AA;'>H (4)</td></tr>" +
    "<tr><td><b>Very Low</b></td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>M (2)</td><td style='background:#FEF9C3;'>M (3)</td></tr>" +
    "</table></div>", 1128, 404, 432, 156, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 5. BOTTOM ROW: TOP 5, HEALTH, IMPACT ANALYSIS, GOVERNANCE, NOTES (x=20..1560, y=568..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>CRITICAL DEPENDENCIES (TOP 5)</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>❶ <b>AI Service ➔ Vector DB</b> (AI responses fail)<br/>❷ <b>Doc Processing ➔ Doc Store</b> (Ingestion stops)<br/>❸ <b>Search Service ➔ Data Warehouse</b> (Search degrades)<br/>❹ <b>API Gateway ➔ Auth Service</b> (Auth fails)<br/>❺ <b>GKE / Cloud Run ➔ All Apps</b> (Total outage)</div>", 20, 568, 260, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>DEPENDENCY HEALTH (REAL-TIME VIEW)</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;'><td>COMPONENT</td><td>STATUS</td><td>LAST</td><td>OWNER</td></tr>" +
    "<tr><td>API Gateway</td><td style='color:#16A34A;'>✔ Healthy</td><td>2m ago</td><td>Platform</td></tr>" +
    "<tr><td>Auth Service</td><td style='color:#16A34A;'>✔ Healthy</td><td>1m ago</td><td>Platform</td></tr>" +
    "<tr><td>AI Service</td><td style='color:#16A34A;'>✔ Healthy</td><td>2m ago</td><td>ML Eng</td></tr>" +
    "<tr><td>Vector DB</td><td style='color:#16A34A;'>✔ Healthy</td><td>1m ago</td><td>Data Eng</td></tr>" +
    "<tr><td>Doc Store</td><td style='color:#16A34A;'>✔ Healthy</td><td>3m ago</td><td>Data Eng</td></tr>" +
    "<tr><td>Salesforce</td><td style='color:#D97706;'>⚠️ Degraded</td><td>5m ago</td><td>Integration</td></tr>" +
    "<tr><td>EMA APIs</td><td style='color:#DC2626;'>❌ Down</td><td>6m ago</td><td>Integration</td></tr>" +
    "</table></div>", 286, 568, 300, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>CHANGE IMPACT ANALYSIS (EXAMPLE)</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'><b>If &quot;Document Store (Cloud Storage)&quot; is Unavailable:</b><br/>• Direct: Doc Processing stops, Backups fail<br/>• Indirect: Search &amp; RAG degraded, Reporting partial<br/>• Business: Document ingestion stops, Compliance risk<br/><br/><b>Mitigation:</b> Backup bucket failover, RPO 15m, RTO 60m</div>", 592, 568, 330, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>DEPENDENCY GOVERNANCE</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>✔ Maintain dependency inventory<br/>✔ Review &amp; validate dependencies quarterly<br/>✔ Monitor health &amp; set SLOs<br/>✔ Define owners for all critical deps<br/>✔ Perform impact analysis before changes<br/>✔ Document contracts &amp; SLAs<br/>✔ Review third-party risk annually</div>", 928, 568, 300, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p5", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8.5px;line-height:1.4;color:#64748B;'>• All dependencies are continuously discovered via scans.<br/>• Critical dependencies have alerts &amp; runbooks.<br/>• Reviewed monthly and after major changes.<br/>• Feed into risk, DR, and change processes.</div>", 1234, 568, 326, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=752..775)
  rect("footer_meta", "<div style='font-size:10.5px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>KEY STATS:</b> ⚙️ Total Apps: 12 &nbsp;|&nbsp; 🗄️ Data Stores: 6 &nbsp;|&nbsp; 🔌 Integrations: 8 &nbsp;|&nbsp; ⚠️ Critical Deps: 9 &nbsp;|&nbsp; 🌐 External Partners: 7</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Jun 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 752, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_31_dependency_map" name="Template 31: Dependency / Relationship Map">
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
