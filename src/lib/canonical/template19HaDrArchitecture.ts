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
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>HA / DR Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – High Availability &amp; Disaster Recovery &nbsp;|&nbsp; Primary Region: us-central1 &nbsp;|&nbsp; DR Region: us-east1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>Ensure continuous availability of NovaCura platform with high availability within a region and disaster recovery across regions with defined RTO and RPO targets.</div>", 1000, 18, 280, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. PRIMARY REGION (us-central1, ACTIVE)
  rect("hdr_pri", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;'>PRIMARY REGION (us-central1)</span>", 130, 85, 230, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("badge_pri_act", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>ACTIVE</span>", 370, 85, 75, 26, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  rect("box_pri_reg", "", 20, 115, 425, 395, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");

  // Primary: Edge Strip
  rect("pe_strip", "", 30, 125, 405, 62, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_pe", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>EDGE</span>", 35, 128, 40, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("pe_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡<br/>Cloud CDN</div>", 85, 134, 100, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pe_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF)</span></div>", 200, 134, 110, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pe_lb", "<div style='font-size:6.8px;font-weight:700;'>⚖️<br/>Cloud Load<br/>Balancing</div>", 320, 134, 105, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Application Layer Strip
  rect("pa_strip", "", 30, 195, 405, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_pa", "<span style='font-size:7.5px;font-weight:800;color:#16A34A;'>APPLICATION LAYER</span>", 35, 198, 110, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("pa_fe", "<div style='font-size:6.5px;font-weight:700;'>🖥️<br/>Frontend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 40, 214, 88, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pa_be", "<div style='font-size:6.5px;font-weight:700;'>⚙️<br/>Backend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 138, 214, 88, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pa_ai", "<div style='font-size:6.5px;font-weight:700;'>🧠<br/>AI/ML Services<br/><span style='font-size:5px;color:#64748B;'>(Vertex AI)</span></div>", 236, 214, 94, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pa_gw", "<div style='font-size:6.5px;font-weight:700;'>🔌<br/>API Gateway<br/><span style='font-size:5px;color:#64748B;'>(Endpoints)</span></div>", 340, 214, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Data Layer Strip
  rect("pd_strip", "", 30, 275, 405, 70, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_pd", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>DATA LAYER</span>", 35, 278, 90, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("pd_sql", "<div style='font-size:6.5px;font-weight:700;'>🗄️<br/>Cloud SQL<br/><span style='font-size:5px;color:#64748B;'>(Primary)</span></div>", 40, 294, 88, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pd_bq", "<div style='font-size:6.5px;font-weight:700;'>📊<br/>BigQuery<br/><span style='font-size:5px;color:#64748B;'>(Primary)</span></div>", 138, 294, 88, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pd_redis", "<div style='font-size:6.5px;font-weight:700;'>⚡<br/>Memorystore<br/><span style='font-size:5px;color:#64748B;'>(Redis)</span></div>", 236, 294, 94, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pd_gcs", "<div style='font-size:6.5px;font-weight:700;'>🗃️<br/>Cloud Storage<br/><span style='font-size:5px;color:#64748B;'>(Regional)</span></div>", 340, 294, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Platform Services Strip
  rect("pp_strip", "", 30, 355, 405, 70, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_pp", "<span style='font-size:7.5px;font-weight:800;color:#EA580C;'>PLATFORM SERVICES</span>", 35, 358, 110, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("pp_iam", "<div style='font-size:6.5px;font-weight:700;'>🛡️<br/>IAM</div>", 40, 374, 88, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pp_kms", "<div style='font-size:6.5px;font-weight:700;'>🔐<br/>Cloud KMS</div>", 138, 374, 88, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pp_sec", "<div style='font-size:6.5px;font-weight:700;'>🔒<br/>Secret Manager</div>", 236, 374, 94, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pp_mon", "<div style='font-size:6.5px;font-weight:700;'>📊<br/>Cloud Monitoring<br/>&amp; Logging</div>", 340, 374, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // 3. CENTER ROUTING HUB (STRAIGHT HORIZONTAL CONNECTORS)
  rect("hub_lb", "<div style='font-size:7px;font-weight:700;'>⚖️<br/>Global HTTP(S)<br/>Load Balancer</div>", 460, 134, 110, 46, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;align=center;");
  rect("hub_dns", "<div style='font-size:7px;font-weight:700;'>🌐<br/>Cloud DNS<br/><span style='font-size:5.5px;color:#64748B;'>(Health Checks)</span></div>", 460, 214, 110, 46, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;align=center;");
  rect("hub_failover", "<div style='font-size:6.8px;font-weight:700;'>📡<br/>Failover via<br/>Traffic Director / DNS</div>", 460, 294, 110, 46, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;align=center;");

  // Clean horizontal straight connectors pointing left and right:
  edge(nid(), "", "hub_lb", "pe_strip", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;startArrow=block;endSize=4;startSize=4;");
  edge(nid(), "", "hub_dns", "pa_strip", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;");
  edge(nid(), "", "hub_failover", "pd_strip", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;");

  // 4. DR REGION (us-east1, STANDBY)
  rect("hdr_dr", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;'>DR REGION (us-east1)</span>", 695, 85, 200, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("badge_dr_stb", "<span style='font-size:8px;font-weight:800;color:#D97706;'>STANDBY</span>", 905, 85, 75, 26, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");

  rect("box_dr_reg", "", 585, 115, 405, 395, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");

  // DR: Edge Strip
  rect("de_strip", "", 595, 125, 385, 62, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_de", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>EDGE</span>", 600, 128, 40, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("de_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡<br/>Cloud CDN</div>", 645, 134, 100, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("de_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF)</span></div>", 755, 134, 110, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("de_lb", "<div style='font-size:6.8px;font-weight:700;'>⚖️<br/>Cloud Load<br/>Balancing</div>", 875, 134, 95, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Application Layer Strip
  rect("da_strip", "", 595, 195, 385, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_da", "<span style='font-size:7.5px;font-weight:800;color:#16A34A;'>APPLICATION LAYER</span>", 600, 198, 110, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("da_fe", "<div style='font-size:6.5px;font-weight:700;'>🖥️<br/>Frontend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 605, 214, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("da_be", "<div style='font-size:6.5px;font-weight:700;'>⚙️<br/>Backend<br/><span style='font-size:5px;color:#64748B;'>(GKE)</span></div>", 700, 214, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("da_ai", "<div style='font-size:6.5px;font-weight:700;'>🧠<br/>AI/ML Services<br/><span style='font-size:5px;color:#64748B;'>(Vertex AI)</span></div>", 795, 214, 90, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("da_gw", "<div style='font-size:6.5px;font-weight:700;'>🔌<br/>API Gateway<br/><span style='font-size:5px;color:#64748B;'>(Endpoints)</span></div>", 895, 214, 75, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Data Layer Strip
  rect("dd_strip", "", 595, 275, 385, 70, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_dd", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>DATA LAYER</span>", 600, 278, 90, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("dd_sql", "<div style='font-size:6.5px;font-weight:700;'>🗄️<br/>Cloud SQL<br/><span style='font-size:5px;color:#64748B;'>(Standby)</span></div>", 605, 294, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dd_bq", "<div style='font-size:6.5px;font-weight:700;'>📊<br/>BigQuery<br/><span style='font-size:5px;color:#64748B;'>(Standby)</span></div>", 700, 294, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dd_redis", "<div style='font-size:6.5px;font-weight:700;'>⚡<br/>Memorystore<br/><span style='font-size:5px;color:#64748B;'>(Redis)</span></div>", 795, 294, 90, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dd_gcs", "<div style='font-size:6.5px;font-weight:700;'>🗃️<br/>Cloud Storage<br/><span style='font-size:5px;color:#64748B;'>(Regional)</span></div>", 895, 294, 75, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Platform Services Strip
  rect("dp_strip", "", 595, 355, 385, 70, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_dp", "<span style='font-size:7.5px;font-weight:800;color:#EA580C;'>PLATFORM SERVICES</span>", 600, 358, 110, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("dp_iam", "<div style='font-size:6.5px;font-weight:700;'>🛡️<br/>IAM</div>", 605, 374, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dp_kms", "<div style='font-size:6.5px;font-weight:700;'>🔐<br/>Cloud KMS</div>", 700, 374, 85, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dp_sec", "<div style='font-size:6.5px;font-weight:700;'>🔒<br/>Secret Manager</div>", 795, 374, 90, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dp_mon", "<div style='font-size:6.5px;font-weight:700;'>📊<br/>Cloud Monitoring<br/>&amp; Logging</div>", 895, 374, 75, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Connectors from Hub to DR
  edge(nid(), "", "hub_lb", "de_strip", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;startArrow=block;endSize=4;startSize=4;");
  edge(nid(), "", "hub_dns", "da_strip", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;");
  edge(nid(), "", "hub_failover", "dd_strip", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;");

  // 5. RIGHT COLUMN: RTO/RPO TARGETS & STRATEGIES
  rect("hdr_targets", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>RTO / RPO TARGETS</span>", 1000, 78, 280, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_targets", "<div style='display:flex;justify-content:space-around;text-align:center;padding-top:4px;'>" +
    "<div>⏱️<br/><b style='font-size:9.5px;color:#1E3A8A;'>RTO</b><br/><span style='font-size:8.5px;font-weight:800;color:#16A34A;'>≤ 1 Hour</span></div>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "<div>⏱️<br/><b style='font-size:9.5px;color:#1E3A8A;'>RPO</b><br/><span style='font-size:8.5px;font-weight:800;color:#16A34A;'>≤ 15 Minutes</span></div>" +
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

  rect("rep_sql", "<div style='font-size:6.5px;font-weight:700;'>🗄️<br/>Cloud SQL<br/><span style='font-size:5px;color:#64748B;'>Cross-Region Async Rep</span></div>", 30, 546, 78, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_bq", "<div style='font-size:6.5px;font-weight:700;'>📊<br/>BigQuery<br/><span style='font-size:5px;color:#64748B;'>Cross-Region Replication</span></div>", 120, 546, 78, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_gcs", "<div style='font-size:6.5px;font-weight:700;'>🗃️<br/>Cloud Storage<br/><span style='font-size:5px;color:#64748B;'>Dual-Region (US)</span></div>", 210, 546, 80, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_redis", "<div style='font-size:6.5px;font-weight:700;'>⚡<br/>Memorystore<br/><span style='font-size:5px;color:#64748B;'>Persistence &amp; Snaps</span></div>", 302, 546, 82, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_bkup", "<div style='font-size:6.5px;font-weight:700;'>💾<br/>Backups<br/><span style='font-size:5px;color:#64748B;'>(GCS DR Bucket)</span></div>", 396, 546, 78, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("rep_arch", "<div style='font-size:6.5px;font-weight:700;'>🗄️<br/>Archive (Optional)<br/><span style='font-size:5px;color:#64748B;'>Coldline / Archive</span></div>", 486, 546, 84, 48, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");

  edge(nid(), "", "rep_sql", "rep_bq", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_bq", "rep_gcs", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_gcs", "rep_redis", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_redis", "rep_bkup", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rep_bkup", "rep_arch", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Failover Flow Panel (Right of Replication Bar)
  rect("box_fail_flow", "", 595, 520, 685, 100, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("lbl_fail_flow", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>FAILOVER FLOW</span>", 595, 526, 685, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("ff_s1", "<div style='font-size:6.5px;font-weight:700;'>📈<br/>1. Failure<br/>Detected</div>", 605, 546, 95, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s2", "<div style='font-size:6.5px;font-weight:700;'>❌<br/>2. Health Check<br/>Fails</div>", 715, 546, 100, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s3", "<div style='font-size:6.5px;font-weight:700;'>📡<br/>3. Traffic Shift<br/>(DNS / Director)</div>", 830, 546, 105, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s4", "<div style='font-size:6.5px;font-weight:700;'>⚙️<br/>4. DR Services<br/>Activated</div>", 950, 546, 100, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s5", "<div style='font-size:6.5px;font-weight:700;'>🗄️<br/>5. Data Consistency<br/>Validated</div>", 1065, 546, 105, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ff_s6", "<div style='font-size:6.5px;font-weight:700;'>✔️<br/>6. Operations<br/>Resumed</div>", 1185, 546, 85, 46, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");

  edge(nid(), "", "ff_s1", "ff_s2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s2", "ff_s3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s3", "ff_s4", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s4", "ff_s5", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "ff_s5", "ff_s6", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // 7. BOTTOM ROW: 4 PANELS (WITH 10-ICON TECHNOLOGIES MATRIX)
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
    "⚙️ <b>GKE</b> &nbsp;&nbsp;&nbsp; 🗄️ <b>Cloud SQL</b> &nbsp;&nbsp;&nbsp; 📊 <b>BigQuery</b> &nbsp;&nbsp;&nbsp; 🗃️ <b>Cloud Storage</b> &nbsp;&nbsp;&nbsp; ⚡ <b>Memorystore</b><br/><br/>" +
    "⚖️ <b>Cloud LB</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>Cloud Armor</b> &nbsp;&nbsp;&nbsp; ⚡ <b>Cloud CDN</b> &nbsp;&nbsp;&nbsp; 🌐 <b>Cloud DNS</b> &nbsp;&nbsp;&nbsp; 📊 <b>Cloud Monitoring &amp; Logging</b>" +
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
