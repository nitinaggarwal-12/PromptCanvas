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
  rect("num_badge", "31", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>DEPENDENCY / RELATIONSHIP MAP</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Visualize and manage dependencies across applications, data, infrastructure, teams, and external partners to reduce risk and improve delivery velocity.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: LEGEND & KEY (x=20..115, y=72..410)
  rect("box_legend_left", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND &amp; KEY</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'><b>Node Types:</b><br/>🌐 Application / Service<br/>🗄️ Data Store / DB<br/>☁️ Platform / Infra<br/>🏢 External Partner<br/>🔌 Interface / Integration<br/>👥 Team / Owner<br/><br/><b>Dependency Types:</b><br/>── Data Flow (R/W)<br/>······ API / Integration<br/>- - Async / Event<br/>······ Config / Control<br/><br/><b>Criticality:</b><br/>🔴 Critical (High)<br/>🟠 High<br/>🟡 Medium<br/>🟢 Low</div>", 20, 72, 95, 338, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. MAIN DEPENDENCY MAP (HIGH LEVEL) (x=122..1150, y=72..410)
  rect("box_dep_main", "", 122, 72, 1020, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_dep_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>NOVACURA – DEPENDENCY MAP (HIGH LEVEL)</span>", 122, 74, 1020, 12, "strokeColor=none;fillColor=none;align=center;");

  // Row 1: Users & Channels (y=88..130)
  rect("lbl_r1", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>USERS &amp;<br/>CHANNELS</span>", 124, 88, 48, 42, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const users = [
    { t: "Regulatory Users", icon: "👥" },
    { t: "QA / Compliance", icon: "👥" },
    { t: "External Partners", icon: "🏢" },
    { t: "Mobile Users", icon: "📱" },
    { t: "Admin Users", icon: "👤" }
  ];
  users.forEach((u, idx) => {
    const ux = 176 + idx * 190;
    rect(`u_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${u.icon} ${u.t}</div>`, ux, 92, 180, 34, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // Row 2: Applications (y=134..186)
  rect("lbl_r2", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>APPLICATIONS</span>", 124, 134, 48, 52, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const apps = [
    { t: "Web Portal", sub: "(Frontend)", icon: "🌐" },
    { t: "API Gateway", sub: "(Apigee)", icon: "🛡️" },
    { t: "Auth Service", sub: "(Identity)", icon: "🔒" },
    { t: "AI Service", sub: "(LLM / Agents)", icon: "🧠" },
    { t: "Document", sub: "Processing", icon: "📄" },
    { t: "Search &amp; RAG", sub: "Service", icon: "🔍" },
    { t: "Reporting &amp;", sub: "Analytics", icon: "📊" }
  ];
  apps.forEach((ap, idx) => {
    const ax = 176 + idx * 136;
    rect(`ap_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${ap.icon} ${ap.t}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${ap.sub}</div>`, ax, 138, 130, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 3: Data Layer (y=190..242)
  rect("lbl_r3", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>DATA<br/>LAYER</span>", 124, 190, 48, 52, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const dlayers = [
    { t: "Operational DB", sub: "(Cloud SQL)", icon: "🗄️" },
    { t: "Vector DB", sub: "(Vertex AI Vector)", icon: "🗄️" },
    { t: "Document Store", sub: "(Cloud Storage)", icon: "🗃️" },
    { t: "Data Warehouse", sub: "(BigQuery)", icon: "📊" },
    { t: "Cache", sub: "(Memorystore)", icon: "⚡" },
    { t: "Audit Logs", sub: "(Cloud Logging)", icon: "📑" }
  ];
  dlayers.forEach((dl, idx) => {
    const dx = 176 + idx * 159;
    rect(`dl_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${dl.icon} ${dl.t}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${dl.sub}</div>`, dx, 194, 153, 44, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 4: Integrations (y=246..298)
  rect("lbl_r4", "<span style='font-size:8px;font-weight:800;color:#D97706;'>INTEGRATIONS</span>", 124, 246, 48, 52, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const ints = [
    { t: "Salesforce", sub: "(CRM)", icon: "🔌" },
    { t: "Veeva Vault", sub: "(eCTD / Quality)", icon: "🔌" },
    { t: "FDA APIs", sub: "(Public Data)", icon: "🏛️" },
    { t: "EMA APIs", sub: "(EU Regs)", icon: "🏛️" },
    { t: "Email Service", sub: "(SendGrid)", icon: "📨" },
    { t: "Slack", sub: "(Webhook)", icon: "💬" },
    { t: "Partner SFTP", sub: "(Batch Data)", icon: "📁" }
  ];
  ints.forEach((it, idx) => {
    const ix = 176 + idx * 136;
    rect(`it_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${it.icon} ${it.t}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${it.sub}</div>`, ix, 250, 130, 44, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 5: Platform / Infra (y=302..354)
  rect("lbl_r5", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>PLATFORM /<br/>INFRA</span>", 124, 302, 48, 52, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const infras = [
    { t: "Google Cloud", sub: "(VPC, Network)", icon: "☁️" },
    { t: "Kubernetes Engine", sub: "(GKE)", icon: "⚙️" },
    { t: "Cloud Run", sub: "(Containers)", icon: "📦" },
    { t: "Vertex AI", sub: "(Models)", icon: "🧠" },
    { t: "Cloud Armor", sub: "(Security)", icon: "🛡️" },
    { t: "Cloud Monitoring", sub: "&amp; Alerting", icon: "📈" },
    { t: "Cloud Backup", sub: "&amp; DR", icon: "🗃️" }
  ];
  infras.forEach((inf, idx) => {
    const fx = 176 + idx * 136;
    rect(`inf_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${inf.icon} ${inf.t}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${inf.sub}</div>`, fx, 306, 130, 44, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 6: Teams / Owners (y=358..405)
  rect("lbl_r6", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>TEAMS /<br/>OWNERS</span>", 124, 358, 48, 47, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const teams = [
    { t: "Product Team", sub: "(Platform)", icon: "👥" },
    { t: "Data Eng Team", sub: "", icon: "👥" },
    { t: "ML/AI Eng Team", sub: "", icon: "👥" },
    { t: "Security Team", sub: "", icon: "👥" },
    { t: "DevOps / SRE", sub: "", icon: "👥" },
    { t: "Compliance &amp; QA", sub: "", icon: "👥" },
    { t: "Business Owners", sub: "(LOB)", icon: "👥" }
  ];
  teams.forEach((tm, idx) => {
    const tx = 176 + idx * 136;
    rect(`tm_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${tm.icon} ${tm.t}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${tm.sub}</div>`, tx, 362, 130, 39, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=1;");
  });

  // 4. RIGHT COLUMN: CATALOG, EXTERNAL DEPS, RISK MATRIX (x=1150..1560, y=72..410)
  rect("box_r_catalog", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:1px;'>DEPENDENCY CATALOG (KEY)</div><div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>ID</td><td>FROM</td><td>TO</td><td>TYPE</td><td>CRIT</td></tr><tr><td>D-01</td><td>Web Portal</td><td>API Gateway</td><td>API</td><td style='color:#DC2626;'>●</td></tr><tr><td>D-02</td><td>API Gateway</td><td>Auth Service</td><td>API</td><td style='color:#DC2626;'>●</td></tr><tr><td>D-03</td><td>AI Service</td><td>Vector DB</td><td>Data</td><td style='color:#DC2626;'>●</td></tr><tr><td>D-04</td><td>Doc Processing</td><td>Doc Store</td><td>Data</td><td style='color:#D97706;'>●</td></tr><tr><td>D-05</td><td>Search Service</td><td>BigQuery</td><td>Data</td><td style='color:#D97706;'>●</td></tr><tr><td>D-06</td><td>Reporting</td><td>BigQuery</td><td>Data</td><td style='color:#16A34A;'>●</td></tr><tr><td>D-07</td><td>API Gateway</td><td>Salesforce</td><td>API</td><td style='color:#D97706;'>●</td></tr><tr><td>D-08</td><td>System</td><td>Email Service</td><td>Async</td><td style='color:#16A34A;'>●</td></tr><tr><td>D-09</td><td>All Apps</td><td>Cloud Monitor</td><td>Config</td><td style='color:#16A34A;'>●</td></tr></table></div>", 1150, 72, 410, 118, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_ext_deps", "<div style='font-size:9px;font-weight:800;color:#D97706;margin-bottom:1px;'>EXTERNAL DEPENDENCIES</div><div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>SYSTEM</td><td>PURPOSE</td><td>CONTROL</td><td>CRIT</td></tr><tr><td><b>Salesforce</b></td><td>Customer Data</td><td>API Contract</td><td style='color:#DC2626;'>High</td></tr><tr><td><b>Veeva Vault</b></td><td>Regulatory Docs</td><td>API Contract</td><td style='color:#DC2626;'>High</td></tr><tr><td><b>FDA APIs</b></td><td>Regulatory Data</td><td>Public Rate Limit</td><td style='color:#D97706;'>Med</td></tr><tr><td><b>EMA APIs</b></td><td>Regulatory Data</td><td>Public Rate Limit</td><td style='color:#D97706;'>Med</td></tr><tr><td><b>SendGrid</b></td><td>Email Alerts</td><td>API Limits</td><td style='color:#D97706;'>Med</td></tr><tr><td><b>Partner SFTP</b></td><td>Batch File Exch</td><td>Network, VPN</td><td style='color:#D97706;'>Med</td></tr></table></div>", 1150, 194, 410, 112, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_matrix", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:1px;'>DEPENDENCY RISK MATRIX</div><div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;text-align:center;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td style='text-align:left;'>LIKELIHOOD ↓</td><td>Low(1)</td><td>Med(2)</td><td>High(3)</td><td>Crit(4)</td></tr><tr><td style='text-align:left;'><b>High</b></td><td style='background:#FEF3C7;'>M (2)</td><td style='background:#FED7AA;'>H (4)</td><td style='background:#FED7AA;'>H (6)</td><td style='background:#FECACA;color:#DC2626;font-weight:700;'>C (8)</td></tr><tr><td style='text-align:left;'><b>Med</b></td><td style='background:#DCFCE7;'>L (2)</td><td style='background:#FEF3C7;'>M (4)</td><td style='background:#FED7AA;'>H (6)</td><td style='background:#FECACA;color:#DC2626;font-weight:700;'>C (8)</td></tr><tr><td style='text-align:left;'><b>Low</b></td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>L (2)</td><td style='background:#FEF3C7;'>M (3)</td><td style='background:#FED7AA;'>H (4)</td></tr><tr><td style='text-align:left;'><b>Very Low</b></td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>M (2)</td><td style='background:#FEF3C7;'>M (3)</td></tr></table></div>", 1150, 310, 410, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 5. BOTTOM ROW: CRITICAL DEPS, HEALTH, IMPACT ANALYSIS, GOVERNANCE, NOTES (x=20..1560, y=546..740)
  rect("bot_crit_deps", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;'>CRITICAL DEPENDENCIES (TOP 5)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>❶ <b>AI Service ➔ Vector DB</b> (Model Context Retrieval)<br/>Impact: AI responses unavailable<br/>❷ <b>Doc Processing ➔ Document Store</b><br/>Impact: Document ingestion stops<br/>❸ <b>Search Service ➔ Data Warehouse</b><br/>Impact: Search &amp; analytics degraded<br/>❹ <b>API Gateway ➔ Auth Service</b><br/>Impact: User auth fails<br/>❺ <b>GKE / Cloud Run ➔ All Apps</b><br/>Impact: Total outage</div>", 20, 546, 270, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_health", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>DEPENDENCY HEALTH (REAL-TIME VIEW)</div><div style='font-size:8px;line-height:1.25;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>COMPONENT</td><td>STATUS</td><td>LAST</td><td>OWNER</td></tr><tr><td><b>API Gateway</b></td><td><span style='color:#16A34A;'>✔ Healthy</span></td><td>2m ago</td><td>Platform</td></tr><tr><td><b>Auth Service</b></td><td><span style='color:#16A34A;'>✔ Healthy</span></td><td>1m ago</td><td>Platform</td></tr><tr><td><b>AI Service</b></td><td><span style='color:#16A34A;'>✔ Healthy</span></td><td>2m ago</td><td>ML Eng</td></tr><tr><td><b>Vector DB</b></td><td><span style='color:#16A34A;'>✔ Healthy</span></td><td>1m ago</td><td>Data Eng</td></tr><tr><td><b>Doc Store</b></td><td><span style='color:#16A34A;'>✔ Healthy</span></td><td>3m ago</td><td>Data Eng</td></tr><tr><td><b>Salesforce</b></td><td><span style='color:#D97706;'>⚠️ Degraded</span></td><td>5m ago</td><td>Integration</td></tr><tr><td><b>EMA APIs</b></td><td><span style='color:#DC2626;'>❌ Down</span></td><td>6m ago</td><td>Integration</td></tr></table></div>", 300, 546, 300, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_impact", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;'>CHANGE IMPACT ANALYSIS (EXAMPLE)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'><b>If &quot;Document Store (Cloud Storage)&quot; is Unavailable:</b><br/>• Direct: Doc Processing stops, Backups fail<br/>• Indirect: Search &amp; RAG degraded, Reporting partial<br/>• Business: Document ingestion stops, Compliance risk<br/><br/><b>Mitigation:</b> Backup bucket failover, RPO 15m, RTO 60m</div>", 610, 546, 300, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_gov", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>DEPENDENCY GOVERNANCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Maintain dependency inventory<br/>✔ Review &amp; validate dependencies quarterly<br/>✔ Monitor health &amp; set SLOs<br/>✔ Define owners for all critical deps<br/>✔ Perform impact analysis before changes<br/>✔ Document contracts &amp; SLAs<br/>✔ Review third-party risk annually</div>", 920, 546, 280, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.35;color:#64748B;'>• All dependencies are continuously discovered via scans.<br/>• Critical dependencies have alerts &amp; runbooks.<br/>• Reviewed monthly and after major changes.<br/>• Feed into risk, DR, and change processes.</div>", 1210, 546, 350, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>KEY STATS:</b> 🌐 Total Apps: 12 &nbsp;|&nbsp; 🗄️ Data Stores: 6 &nbsp;|&nbsp; 🔌 Integrations: 8 &nbsp;|&nbsp; ⚠️ Critical Deps: 9 &nbsp;|&nbsp; 🏢 External Partners: 7</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Jun 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_31_dependency_relationship_map" name="Template 31: Dependency / Relationship Map">
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
