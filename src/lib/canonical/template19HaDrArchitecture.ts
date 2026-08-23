/**
 * Canonical Architecture Template 19: Template 19: HA / DR Architecture
 * High-fidelity 16:9 replication of images/19.png
 */

export function generateTemplate19HaDrArchitectureXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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


  // 1. BRAND HEADER & METADATA (x=20..1560)
  rect("num_badge", "19", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>HA / DR Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – High Availability &amp; Disaster Recovery &nbsp;|&nbsp; Primary Region: us-central1 &nbsp;|&nbsp; DR Region: us-east1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card (x=1240..1560, w=320)
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.4;color:#0F172A;'>Ensure continuous availability of NovaCura platform with high availability within a region and disaster recovery across regions with defined RTO and RPO targets.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. PRIMARY REGION (us-central1, ACTIVE) (x=20..580, w=560)
  rect("hdr_pri", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;'>PRIMARY REGION (us-central1)</span>", 140, 82, 260, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("badge_pri_act", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>ACTIVE</span>", 415, 82, 85, 24, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  rect("box_pri_reg", "", 20, 112, 560, 440, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");

  // Primary: Edge Strip
  rect("pe_strip", "", 30, 122, 540, 68, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_pe", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>EDGE</span>", 35, 126, 40, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("pe_cdn", "<div style='font-size:7px;font-weight:700;'>⚡<br/>Cloud CDN</div>", 110, 130, 130, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pe_lb", "<div style='font-size:7px;font-weight:700;'>⚖️<br/>Cloud Load<br/>Balancing</div>", 410, 130, 145, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Primary: Application Layer Strip
  rect("pa_strip", "", 30, 198, 540, 78, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_pa", "<span style='font-size:7.5px;font-weight:800;color:#16A34A;'>APPLICATION<br/>LAYER</span>", 35, 204, 80, 20, "strokeColor=none;fillColor=none;align=left;");
  rect("pa_fe", "<div style='font-size:6.8px;font-weight:700;'>🖥️ Frontend<br/><span style='font-size:5.5px;color:#64748B;'>(GKE)</span></div>", 120, 208, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pa_be", "<div style='font-size:6.8px;font-weight:700;'>⚙️ Backend<br/><span style='font-size:5.5px;color:#64748B;'>(GKE)</span></div>", 230, 208, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pa_ai", "<div style='font-size:6.8px;font-weight:700;'>🧠 AI/ML Services<br/><span style='font-size:5.5px;color:#64748B;'>(Vertex AI)</span></div>", 340, 208, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pa_gw", "<div style='font-size:6.8px;font-weight:700;'>🔌 API Gateway<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Endpoints)</span></div>", 455, 208, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Primary: Data Layer Strip
  rect("pd_strip", "", 30, 284, 540, 78, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_pd", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>DATA LAYER</span>", 35, 290, 80, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("pd_sql", "<div style='font-size:6.8px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5.5px;color:#64748B;'>(Primary)</span></div>", 120, 294, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pd_bq", "<div style='font-size:6.8px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.5px;color:#64748B;'>(Primary)</span></div>", 230, 294, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pd_red", "<div style='font-size:6.8px;font-weight:700;'>⚡ Memorystore<br/><span style='font-size:5.5px;color:#64748B;'>(Redis)</span></div>", 340, 294, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pd_gcs", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5.5px;color:#64748B;'>(Regional)</span></div>", 455, 294, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Primary: Platform Services Strip
  rect("ps_strip", "", 30, 370, 540, 72, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;");
  rect("lbl_ps", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>PLATFORM<br/>SERVICES</span>", 35, 376, 80, 20, "strokeColor=none;fillColor=none;align=left;");
  rect("ps_iam", "<div style='font-size:6.8px;font-weight:700;'>🛡️ IAM</div>", 120, 380, 100, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ps_kms", "<div style='font-size:6.8px;font-weight:700;'>🔐 Cloud KMS</div>", 230, 380, 100, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ps_sm", "<div style='font-size:6.8px;font-weight:700;'>🔑 Secret Manager</div>", 340, 380, 105, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ps_mon", "<div style='font-size:6.8px;font-weight:700;'>📈 Cloud Monitoring<br/>&amp; Logging</div>", 455, 380, 105, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 3. CENTER CHANNEL: GLOBAL LB & TRAFFIC DIRECTOR (x=595..715, w=120)
  rect("glb_box", "<div style='font-size:7px;font-weight:800;'>🌐<br/>Global HTTP(S)<br/>Load Balancer</div>", 605, 140, 100, 52, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("dns_box", "<div style='font-size:7px;font-weight:800;'>🛡️<br/>Cloud DNS<br/><span style='font-size:5.5px;color:#64748B;'>(Health Checks)</span></div>", 605, 275, 100, 52, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("lbl_failover", "<div style='font-size:6.8px;font-weight:700;color:#0F172A;text-align:center;'>Failover via<br/>Traffic Director / DNS</div>", 595, 395, 120, 30, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  edge(nid(), "", "glb_box", "pe_lb", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "dns_box", "glb_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // 4. DR REGION (us-east1, STANDBY) (x=730..1210, w=480)
  rect("hdr_dr", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;'>DR REGION (us-east1)</span>", 830, 82, 220, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("badge_dr_stb", "<span style='font-size:8px;font-weight:800;color:#D97706;'>STANDBY</span>", 1060, 82, 90, 24, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");

  rect("box_dr_reg", "", 730, 112, 480, 440, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;dashed=1;dashPattern=6 4;rounded=1;");

  // DR: Edge Strip
  rect("de_strip", "", 740, 122, 460, 68, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("de_cdn", "<div style='font-size:7px;font-weight:700;'>⚡ Cloud CDN</div>", 750, 130, 135, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("de_armor", "<div style='font-size:7px;font-weight:700;'>🛡️ Cloud Armor (WAF)</div>", 895, 130, 145, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("de_lb", "<div style='font-size:7px;font-weight:700;'>⚖️ Cloud Load Balancing</div>", 1050, 130, 140, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // DR: Application Layer Strip
  rect("da_strip", "", 740, 198, 460, 78, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("da_fe", "<div style='font-size:6.8px;font-weight:700;'>Frontend (GKE)</div>", 750, 208, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("da_be", "<div style='font-size:6.8px;font-weight:700;'>Backend Services</div>", 860, 208, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("da_ai", "<div style='font-size:6.8px;font-weight:700;'>AI/ML (Vertex AI)</div>", 975, 208, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("da_gw", "<div style='font-size:6.8px;font-weight:700;'>API Gateway</div>", 1090, 208, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // DR: Data Layer Strip
  rect("dd_strip", "", 740, 284, 460, 78, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("dd_sql", "<div style='font-size:6.8px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5.5px;color:#64748B;'>(Standby)</span></div>", 750, 294, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dd_bq", "<div style='font-size:6.8px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.5px;color:#64748B;'>(Standby)</span></div>", 860, 294, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dd_red", "<div style='font-size:6.8px;font-weight:700;'>⚡ Memorystore<br/><span style='font-size:5.5px;color:#64748B;'>(Redis)</span></div>", 975, 294, 105, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dd_gcs", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5.5px;color:#64748B;'>(Regional)</span></div>", 1090, 294, 100, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // DR: Platform Services Strip
  rect("ds_strip", "", 740, 370, 460, 72, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;");
  rect("ds_iam", "<div style='font-size:6.8px;font-weight:700;'>🛡️ IAM</div>", 750, 380, 100, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ds_kms", "<div style='font-size:6.8px;font-weight:700;'>🔐 Cloud KMS</div>", 860, 380, 105, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ds_sm", "<div style='font-size:6.8px;font-weight:700;'>🔑 Secret Mgr</div>", 975, 380, 105, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ds_mon", "<div style='font-size:6.8px;font-weight:700;'>📈 Monitoring</div>", 1090, 380, 100, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 5. FAR RIGHT COLUMN: TARGETS & STRATEGY (x=1230..1560, w=330)
  rect("hdr_rto", "<span style='font-size:8.5px;font-weight:800;color:#7C3AED;'>RTO / RPO TARGETS</span>", 1230, 82, 330, 22, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("box_rto_rpo", "<div style='display:flex;justify-content:space-around;text-align:center;padding:6px;'>" +
    "<div>⏱️<br/><b>RTO</b><br/><span style='font-size:8px;font-weight:800;color:#1E3A8A;'>≤ 1 Hour</span></div>" +
    "<div>⏱️<br/><b>RPO</b><br/><span style='font-size:8px;font-weight:800;color:#D97706;'>≤ 15 Minutes</span></div>" +
    "</div>", 1230, 104, 330, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  rect("hdr_ha_strat", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>HA STRATEGY (WITHIN REGION)</span>", 1230, 185, 330, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_ha_strat", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;'>" +
    "✔ <b>Multi-zone GKE node pools</b> (3 zones)<br/>" +
    "✔ <b>Regional Cloud Load Balancing</b><br/>" +
    "✔ <b>Zonal Cloud SQL</b> with automatic failover<br/>" +
    "✔ <b>Multi-zone Memorystore (Redis)</b><br/>" +
    "✔ <b>SLO-based auto-healing &amp; self-monitoring</b>" +
    "</div>", 1230, 207, 330, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_dr_strat", "<span style='font-size:8px;font-weight:800;color:#D97706;'>DR STRATEGY (CROSS-REGION)</span>", 1230, 328, 330, 22, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");
  rect("box_dr_strat", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;'>" +
    "✔ <b>Cross-region asynchronous replication</b><br/>" +
    "✔ <b>Scheduled backups to DR region</b><br/>" +
    "✔ <b>Infrastructure as Code (Terraform)</b><br/>" +
    "✔ <b>Runbooks &amp; automated failover workflows</b><br/>" +
    "✔ <b>Regular DR drills &amp; validations</b>" +
    "</div>", 1230, 350, 330, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 6. MIDDLE ROW: DATA REPLICATION & FAILOVER FLOW (y=565..640)
  rect("box_rep_banner", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;text-align:center;'>CROSS-REGION DATA REPLICATION &amp; BACKUP</div>" +
    "<div style='font-size:7px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🗄️ <b>Cloud SQL</b><br/><span style='font-size:5.5px;color:#64748B;'>Cross-Region Async Rep</span></div> ➔ " +
    "<div>📊 <b>BigQuery</b><br/><span style='font-size:5.5px;color:#64748B;'>Cross-Region Replication</span></div> ➔ " +
    "<div>🗃️ <b>Cloud Storage</b><br/><span style='font-size:5.5px;color:#64748B;'>Dual-Region (US)</span></div> ➔ " +
    "<div>⚡ <b>Memorystore</b><br/><span style='font-size:5.5px;color:#64748B;'>Data Persistence</span></div> ➔ " +
    "<div>💾 <b>Backups (GCS DR)</b><br/><span style='font-size:5.5px;color:#64748B;'>+ Retention</span></div> ➔ " +
    "<div>📦 <b>Archive (Optional)</b><br/><span style='font-size:5.5px;color:#64748B;'>Coldline / Long-Term</span></div>" +
    "</div>", 20, 565, 830, 75, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  rect("box_failover_banner", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;text-align:center;'>FAILOVER FLOW</div>" +
    "<div style='font-size:7px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>📈<br/><b>1. Failure<br/>Detected</b></div> ➔ " +
    "<div>❌<br/><b>2. Health Check<br/>Fails</b></div> ➔ " +
    "<div>🌐<br/><b>3. Traffic Shift<br/>(DNS / TD)</b></div> ➔ " +
    "<div>⚙️<br/><b>4. DR Services<br/>Activated</b></div> ➔ " +
    "<div>🗄️<br/><b>5. Consistency<br/>Validated</b></div> ➔ " +
    "<div>✔<br/><b>6. Operations<br/>Resumed</b></div>" +
    "</div>", 865, 565, 695, 75, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // 7. BOTTOM ROW: 4 PANELS (x=20..1560, y=650..775)
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:6px;'>KEY BENEFITS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ High availability within region with automatic recovery<br/>" +
    "✔ Disaster recovery across region with defined RTO/RPO<br/>" +
    "✔ Minimal data loss with cross-region replication<br/>" +
    "✔ Resilient, fault-tolerant, and self-healing architecture<br/>" +
    "✔ Regular DR testing ensures readiness and compliance" +
    "</div>", 20, 650, 360, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;'>TECHNOLOGIES</div>" +
    "<div style='font-size:6.8px;line-height:1.6;color:#0F172A;display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;text-align:center;'>" +
    "<div>☸️<br/>GKE</div> <div>🗄️<br/>Cloud SQL</div> <div>📊<br/>BigQuery</div> <div>🗃️<br/>Cloud Storage</div> <div>⚡<br/>Memorystore</div>" +
    "<div>⚖️<br/>Load Balancing</div> <div>🛡️<br/>Cloud Armor</div> <div>⚡<br/>Cloud CDN</div> <div>🌐<br/>Cloud DNS</div> <div>📈<br/>Monitoring</div>" +
    "</div>", 395, 650, 430, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;'>BACKUP &amp; RETENTION POLICY</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "📑 <b>Daily Automated Backups</b><br/>" +
    "⏱️ <b>Point-in-Time Recovery (PITR)</b><br/>" +
    "💾 <b>Retention: 30 Days (Standard)</b><br/>" +
    "📦 <b>Archive Retention: 1 Year</b><br/>" +
    "🛡️ <b>Backup Validation: Weekly</b>" +
    "</div>", 840, 650, 340, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>NOTES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• DR region resources run in standby mode (minimal cost).<br/>" +
    "• Failover can be manual or automated based on severity.<br/>" +
    "• Regular DR drills: Quarterly.<br/>" +
    "• All data encrypted at rest and in transit.<br/>" +
    "• Complies with SOC 2, HIPAA, and ISO 27001." +
    "</div>", 1195, 650, 365, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 785, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 785, 135, 18, "strokeColor=none;fillColor=none;align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_19_ha_dr_architecture" name="Template 19: HA / DR Architecture">
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
