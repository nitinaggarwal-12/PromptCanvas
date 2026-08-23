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


  // 1. BRAND HEADER & METADATA
  rect("num_badge", "19", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>HA / DR Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – High Availability &amp; Disaster Recovery &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Primary Region: us-central1 &nbsp;|&nbsp; DR Region: us-east1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>Ensure continuous availability of NovaCura platform with high availability within a region and disaster recovery across regions with defined RTO and RPO targets.</div>", 1000, 18, 280, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. PRIMARY REGION (us-central1, ACTIVE)
  rect("hdr_pri", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;'>PRIMARY REGION (us-central1)</span>", 150, 85, 230, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("badge_pri_act", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>ACTIVE</span>", 390, 85, 80, 26, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  rect("box_pri_reg", "", 20, 115, 450, 395, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");

  // Primary: Edge
  rect("lbl_pe", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>EDGE</span>", 30, 125, 60, 14, "strokeColor=none;fillColor=none;align=left;");
  rect("pe_box", "", 100, 122, 360, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("pe_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡ Cloud CDN</div>", 110, 134, 100, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pe_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️ Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF)</span></div>", 230, 134, 100, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pe_lb", "<div style='font-size:6.8px;font-weight:700;'>⚖️ Cloud Load<br/>Balancing</div>", 350, 134, 100, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Application Layer
  rect("lbl_pa", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>APPLICATION<br/>LAYER</span>", 30, 195, 65, 20, "strokeColor=none;fillColor=none;align=left;");
  rect("pa_box", "", 100, 190, 360, 68, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("pa_fe", "<div style='font-size:6.5px;font-weight:700;'>🖥️ Frontend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 105, 204, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pa_be", "<div style='font-size:6.5px;font-weight:700;'>⚙️ Backend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 195, 204, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pa_ai", "<div style='font-size:6.5px;font-weight:700;'>🧠 AI/ML Services<br/><span style='font-size:5px;color:#64748B;'>(Vertex AI)</span></div>", 285, 204, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pa_gw", "<div style='font-size:6.5px;font-weight:700;'>🔌 API Gateway<br/><span style='font-size:5px;color:#64748B;'>(Endpoints)</span></div>", 380, 204, 75, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Data Layer
  rect("lbl_pd", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>DATA LAYER</span>", 30, 280, 60, 14, "strokeColor=none;fillColor=none;align=left;");
  rect("pd_box", "", 100, 268, 360, 68, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("pd_sql", "<div style='font-size:6.5px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5px;color:#64748B;'>(Primary)</span></div>", 105, 282, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pd_bq", "<div style='font-size:6.5px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5px;color:#64748B;'>(Primary)</span></div>", 195, 282, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pd_redis", "<div style='font-size:6.5px;font-weight:700;'>⚡ Memorystore<br/><span style='font-size:5px;color:#64748B;'>(Redis)</span></div>", 285, 282, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pd_gcs", "<div style='font-size:6.5px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5px;color:#64748B;'>(Regional)</span></div>", 380, 282, 75, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Platform Services
  rect("lbl_pp", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>PLATFORM<br/>SERVICES</span>", 30, 360, 65, 20, "strokeColor=none;fillColor=none;align=left;");
  rect("pp_box", "", 100, 346, 360, 68, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("pp_iam", "<div style='font-size:6.5px;font-weight:700;'>🛡️ IAM</div>", 105, 360, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pp_kms", "<div style='font-size:6.5px;font-weight:700;'>🔐 Cloud KMS</div>", 195, 360, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pp_sec", "<div style='font-size:6.5px;font-weight:700;'>🔒 Secret Manager</div>", 285, 360, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pp_mon", "<div style='font-size:6.5px;font-weight:700;'>📊 Monitoring<br/>&amp; Logging</div>", 380, 360, 75, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // 3. CENTER TRAFFIC ROUTING HUB
  rect("hub_lb", "<div style='font-size:7px;font-weight:700;'>⚖️<br/>Global HTTP(S)<br/>Load Balancer</div>", 485, 150, 100, 50, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;align=center;");
  rect("hub_dns", "<div style='font-size:7px;font-weight:700;'>🌐<br/>Cloud DNS<br/><span style='font-size:5.5px;color:#64748B;'>(Health Checks)</span></div>", 485, 270, 100, 50, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;align=center;");
  rect("hub_failover", "<div style='font-size:6.8px;font-weight:700;'>📡<br/>Failover via<br/>Traffic Director / DNS</div>", 480, 390, 110, 50, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;align=center;");

  edge(nid(), "", "hub_lb", "pe_box", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "hub_dns", "pa_box", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // 4. DR REGION (us-east1, STANDBY)
  rect("hdr_dr", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;'>DR REGION (us-east1)</span>", 605, 85, 210, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("badge_dr_stb", "<span style='font-size:8px;font-weight:800;color:#D97706;'>STANDBY</span>", 825, 85, 80, 26, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");

  rect("box_dr_reg", "", 600, 115, 380, 395, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");

  // DR: Edge
  rect("de_box", "", 610, 122, 360, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("de_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡ Cloud CDN</div>", 620, 134, 100, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("de_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️ Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF)</span></div>", 740, 134, 100, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("de_lb", "<div style='font-size:6.8px;font-weight:700;'>⚖️ Cloud Load<br/>Balancing</div>", 860, 134, 100, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Application Layer
  rect("da_box", "", 610, 190, 360, 68, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("da_fe", "<div style='font-size:6.5px;font-weight:700;'>🖥️ Frontend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 615, 204, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("da_be", "<div style='font-size:6.5px;font-weight:700;'>⚙️ Backend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 705, 204, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("da_ai", "<div style='font-size:6.5px;font-weight:700;'>🧠 AI/ML Services<br/><span style='font-size:5px;color:#64748B;'>(Vertex AI)</span></div>", 795, 204, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("da_gw", "<div style='font-size:6.5px;font-weight:700;'>🔌 API Gateway<br/><span style='font-size:5px;color:#64748B;'>(Endpoints)</span></div>", 890, 204, 75, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Data Layer
  rect("dd_box", "", 610, 268, 360, 68, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("dd_sql", "<div style='font-size:6.5px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5px;color:#64748B;'>(Standby)</span></div>", 615, 282, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dd_bq", "<div style='font-size:6.5px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5px;color:#64748B;'>(Standby)</span></div>", 705, 282, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dd_redis", "<div style='font-size:6.5px;font-weight:700;'>⚡ Memorystore<br/><span style='font-size:5px;color:#64748B;'>(Redis)</span></div>", 795, 282, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dd_gcs", "<div style='font-size:6.5px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5px;color:#64748B;'>(Regional)</span></div>", 890, 282, 75, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Platform Services
  rect("dp_box", "", 610, 346, 360, 68, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("dp_iam", "<div style='font-size:6.5px;font-weight:700;'>🛡️ IAM</div>", 615, 360, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dp_kms", "<div style='font-size:6.5px;font-weight:700;'>🔐 Cloud KMS</div>", 705, 360, 80, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dp_sec", "<div style='font-size:6.5px;font-weight:700;'>🔒 Secret Manager</div>", 795, 360, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dp_mon", "<div style='font-size:6.5px;font-weight:700;'>📊 Monitoring<br/>&amp; Logging</div>", 890, 360, 75, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "hub_lb", "de_box", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "hub_failover", "dp_box", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // 5. RIGHT COLUMN: RTO/RPO TARGETS & STRATEGIES
  rect("hdr_targets", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>RTO / RPO TARGETS</span>", 1000, 78, 280, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_targets", "<div style='display:flex;justify-content:space-around;text-align:center;padding-top:6px;'>" +
    "<div>⏱️<br/><b style='font-size:9.5px;color:#1E3A8A;'>RTO</b><br/><span style='font-size:8px;font-weight:700;color:#16A34A;'>≤ 1 Hour</span></div>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "<div>⏱️<br/><b style='font-size:9.5px;color:#1E3A8A;'>RPO</b><br/><span style='font-size:8px;font-weight:700;color:#16A34A;'>≤ 15 Minutes</span></div>" +
    "</div>", 1000, 100, 280, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  rect("hdr_ha_strat", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>HA STRATEGY (WITHIN REGION)</span>", 1000, 170, 280, 20, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=left;padding-left:6px;");
  rect("card_ha_strat", "<div style='font-size:7px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "✔ Multi-zone GKE node pools (3 zones)<br/>" +
    "✔ Regional Cloud Load Balancing<br/>" +
    "✔ Zonal Cloud SQL with automatic failover<br/>" +
    "✔ Multi-zone Memorystore (Redis)<br/>" +
    "✔ SLO-based auto-healing &amp; self-monitoring" +
    "</div>", 1000, 190, 280, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_dr_strat", "<span style='font-size:8px;font-weight:800;color:#EA580C;'>DR STRATEGY (CROSS-REGION)</span>", 1000, 295, 280, 20, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=left;padding-left:6px;");
  rect("card_dr_strat", "<div style='font-size:7px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "✔ Cross-region asynchronous replication<br/>" +
    "✔ Scheduled backups to DR region<br/>" +
    "✔ Infrastructure as Code (Terraform)<br/>" +
    "✔ Runbooks &amp; automated failover workflows<br/>" +
    "✔ Regular DR drills &amp; validations" +
    "</div>", 1000, 315, 280, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 6. MIDDLE REPLICATION BAR & FAILOVER FLOW
  rect("box_cross_rep", "", 20, 520, 560, 100, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_cross_rep", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>CROSS-REGION DATA REPLICATION &amp; BACKUP</span>", 20, 526, 560, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("rep_sql", "<div style='font-size:6px;font-weight:700;'>🗄️<br/>Cloud SQL<br/><span style='font-size:5px;color:#64748B;'>Async Rep</span></div>", 30, 546, 75, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_bq", "<div style='font-size:6px;font-weight:700;'>📊<br/>BigQuery<br/><span style='font-size:5px;color:#64748B;'>Replication</span></div>", 120, 546, 75, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_gcs", "<div style='font-size:6px;font-weight:700;'>🗃️<br/>Cloud Storage<br/><span style='font-size:5px;color:#64748B;'>Dual-Region</span></div>", 210, 546, 80, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_redis", "<div style='font-size:6px;font-weight:700;'>⚡<br/>Memorystore<br/><span style='font-size:5px;color:#64748B;'>Snapshots</span></div>", 305, 546, 80, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_bkup", "<div style='font-size:6px;font-weight:700;'>💾<br/>Backups<br/><span style='font-size:5px;color:#64748B;'>(GCS Bucket)</span></div>", 400, 546, 75, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_arch", "<div style='font-size:6px;font-weight:700;'>🗄️<br/>Archive<br/><span style='font-size:5px;color:#64748B;'>Coldline</span></div>", 490, 546, 75, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");

  edge(nid(), "", "rep_sql", "rep_bq", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_bq", "rep_gcs", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_gcs", "rep_redis", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_redis", "rep_bkup", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_bkup", "rep_arch", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Failover Flow Panel (Right of Replication Bar)
  rect("box_fail_flow", "", 600, 520, 680, 100, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("lbl_fail_flow", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>FAILOVER FLOW</span>", 600, 526, 680, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("ff_s1", "<div style='font-size:6.5px;font-weight:700;'>📈<br/>1. Failure<br/>Detected</div>", 610, 546, 95, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s2", "<div style='font-size:6.5px;font-weight:700;'>❌<br/>2. Health Check<br/>Fails</div>", 720, 546, 100, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s3", "<div style='font-size:6.5px;font-weight:700;'>📡<br/>3. Traffic Shift<br/>(DNS / Director)</div>", 835, 546, 100, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s4", "<div style='font-size:6.5px;font-weight:700;'>⚙️<br/>4. DR Services<br/>Activated</div>", 950, 546, 100, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s5", "<div style='font-size:6.5px;font-weight:700;'>🗄️<br/>5. Consistency<br/>Validated</div>", 1065, 546, 100, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s6", "<div style='font-size:6.5px;font-weight:700;'>✔️<br/>6. Operations<br/>Resumed</div>", 1180, 546, 90, 44, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");

  edge(nid(), "", "ff_s1", "ff_s2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s2", "ff_s3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s3", "ff_s4", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s4", "ff_s5", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s5", "ff_s6", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // 7. BOTTOM ROW: 4 PANELS
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:6px;'>KEY BENEFITS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ High availability within region with automatic recovery<br/>" +
    "✔ Disaster recovery across region with defined RTO/RPO<br/>" +
    "✔ Minimal data loss with cross-region replication<br/>" +
    "✔ Resilient, fault-tolerant, and self-healing architecture<br/>" +
    "✔ Regular DR testing ensures readiness and compliance" +
    "</div>", 20, 635, 290, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;'>TECHNOLOGIES</div>" +
    "<div style='font-size:6.8px;line-height:1.6;color:#0F172A;'>" +
    "⚙️ <b>GKE</b> &nbsp;&nbsp;&nbsp; 🗄️ <b>Cloud SQL</b> &nbsp;&nbsp;&nbsp; 📊 <b>BigQuery</b><br/>" +
    "🗃️ <b>Cloud Storage</b> &nbsp;&nbsp;&nbsp; ⚡ <b>Memorystore</b> &nbsp;&nbsp;&nbsp; ⚖️ <b>Cloud LB</b><br/>" +
    "🛡️ <b>Cloud Armor</b> &nbsp;&nbsp;&nbsp; ⚡ <b>Cloud CDN</b> &nbsp;&nbsp;&nbsp; 🌐 <b>Cloud DNS</b>" +
    "</div>", 320, 635, 340, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;'>BACKUP &amp; RETENTION POLICY</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "💾 Daily Automated Backups<br/>" +
    "⏱️ Point-in-Time Recovery (PITR)<br/>" +
    "📅 Retention: 30 Days (Standard)<br/>" +
    "🗄️ Archive Retention: 1 Year<br/>" +
    "🔍 Backup Validation: Weekly" +
    "</div>", 670, 635, 240, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>NOTES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• DR region resources run in standby mode (minimal cost).<br/>" +
    "• Failover can be manual or automated based on severity.<br/>" +
    "• Regular DR drills: Quarterly.<br/>" +
    "• All data encrypted at rest and in transit.<br/>" +
    "• Complies with SOC 2, HIPAA, and ISO 27001." +
    "</div>", 920, 635, 360, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1145, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");


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
