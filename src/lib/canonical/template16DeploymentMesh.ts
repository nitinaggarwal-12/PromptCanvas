/**
 * Canonical Architecture Template 16: Deployment Diagram
 * Exact 1:1 High-Fidelity Replication of images/16.png
 */

export function generateTemplate16DeploymentMeshXml(
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

  // 1. TOP HEADER & METADATA (x=20..1560)
  rect("num_badge", "16", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>DEPLOYMENT DIAGRAM</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>NOVACURA - Enterprise AI Platform for Biopharma</div>", 78, 16, 650, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  
  // Header Description Box
  rect("hdr_desc", "<div style='font-size:8px;font-weight:600;color:#1E3A8A;'>Highly available, secure, and scalable deployment on Google Cloud across multi-zones in a primary region with DR in a secondary region.</div>", 20, 80, 560, 36, "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;rounded=1;align=left;verticalAlign=middle;padding=8;");

  // Top Legend Pills (x=980..1560)
  rect("leg_compute", "<div style='font-size:7.5px;font-weight:700;color:#16A34A;'>🟩 Compute</div>", 980, 84, 130, 28, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_data", "<div style='font-size:7.5px;font-weight:700;color:#9333EA;'>🗄️ Data Services</div>", 1125, 84, 135, 28, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_net", "<div style='font-size:7.5px;font-weight:700;color:#2563EB;'>🌐 Networking</div>", 1275, 84, 135, 28, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_sec", "<div style='font-size:7.5px;font-weight:700;color:#EA580C;'>🛡️ Security</div>", 1425, 84, 135, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>Transforming Therapies. Improving Lives.</span></div>", 1240, 18, 320, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // 2. LEFT COLUMN: USERS & CLIENTS (x=20..150, w=130)
  rect("hdr_users", "<span style='font-size:8px;font-weight:800;color:#FFFFFF;'>USERS &amp; CLIENTS</span>", 20, 130, 130, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 152, 130, 390, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  
  rect("u_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️<br/>Web Application</div>", 28, 162, 114, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_mob", "<div style='font-size:7.2px;font-weight:700;'>📱<br/>Mobile Application</div>", 28, 222, 114, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_copilot", "<div style='font-size:7.2px;font-weight:700;'>💬<br/>AI Copilot<br/><span style='font-size:5.8px;color:#64748B;'>(Embedded)</span></div>", 28, 282, 114, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_part", "<div style='font-size:7.2px;font-weight:700;'>👥<br/>Partner / 3rd Party<br/><span style='font-size:5.8px;color:#64748B;'>Applications</span></div>", 28, 342, 114, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_sci", "<div style='font-size:7.2px;font-weight:700;'>👤<br/>Scientists /<br/><span style='font-size:5.8px;color:#64748B;'>Clinicians / QA</span></div>", 28, 402, 114, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_api", "<div style='font-size:7.2px;font-weight:700;'>💻<br/>API Clients<br/><span style='font-size:5.8px;color:#64748B;'>(Postman etc.)</span></div>", 28, 462, 114, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Edge Middle Stack (x=165..245)
  rect("e_cdn", "<div style='font-size:7px;font-weight:700;'>☁️<br/>Cloud CDN</div>", 165, 270, 75, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("e_armor", "<div style='font-size:7px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF / DDoS)</span></div>", 165, 345, 75, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("e_https", "<div style='font-size:7px;font-weight:700;'>🌐<br/>External HTTPS<br/><span style='font-size:5.5px;color:#64748B;'>(global anycast)</span></div>", 165, 430, 75, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "box_users", "e_cdn", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "e_cdn", "e_armor", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "e_armor", "e_https", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");

  // 3. CENTER PRIMARY REGION (us-central1) (x=255..915, w=660, h=512)
  rect("box_pri_reg", "", 255, 130, 660, 512, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_pri_reg", "<span style='font-size:9.5px;font-weight:800;color:#2563EB;'>GOOGLE CLOUD – PRIMARY REGION (us-central1)</span>", 265, 136, 400, 16, "strokeColor=none;fillColor=none;align=left;");

  // Multi-AZ Zones Header & Container
  rect("box_zones_outer", "", 265, 160, 640, 260, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_za", "<span style='font-size:7.5px;font-weight:800;color:#0F172A;'>ZONE A (us-central1-a)</span>", 265, 164, 205, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("lbl_zb", "<span style='font-size:7.5px;font-weight:800;color:#0F172A;'>ZONE B (us-central1-b)</span>", 482, 164, 205, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("lbl_zc", "<span style='font-size:7.5px;font-weight:800;color:#0F172A;'>ZONE C (us-central1-c)</span>", 700, 164, 205, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("lb_global", "<div style='font-size:7.2px;font-weight:700;'>🌐 Global HTTP(S) Load Balancer</div>", 275, 184, 620, 24, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;");
  rect("lb_internal", "<div style='font-size:7.2px;font-weight:700;'>⚡ Internal HTTP(S) Load Balancer</div>", 275, 214, 620, 24, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "e_cdn", "lb_global", "edgeStyle=orthogonalEdgeStyle;strokeColor=#2563EB;strokeWidth=1.2;endArrow=block;endSize=4;");

  // Zone A Column (w=198)
  rect("za_app", "<div style='font-size:7.2px;font-weight:800;color:#16A34A;text-align:center;'>⚙️ Application Tier<br/><span style='font-size:6px;color:#64748B;'>(GKE Autopilot)</span></div>" +
    "<div style='font-size:5.8px;line-height:1.4;color:#0F172A;margin-top:4px;display:flex;justify-content:space-around;'>" +
    "<span>AI Copilot</span> | <span>API Gateway</span> | <span>Services</span>" +
    "</div>", 275, 246, 198, 75, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;rounded=1;align=center;verticalAlign=top;padding=4;");
  rect("za_worker", "<div style='font-size:7.2px;font-weight:800;color:#0284C7;text-align:center;'>⏩ Background / Worker Tier<br/><span style='font-size:6px;color:#64748B;'>(Cloud Run Jobs)</span></div>" +
    "<div style='font-size:6px;line-height:1.4;color:#0F172A;text-align:left;margin-top:3px;padding-left:6px;'>" +
    "• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing" +
    "</div>", 275, 330, 198, 75, "fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Zone B Column (w=198)
  rect("zb_app", "<div style='font-size:7.2px;font-weight:800;color:#16A34A;text-align:center;'>⚙️ Application Tier<br/><span style='font-size:6px;color:#64748B;'>(GKE Autopilot)</span></div>" +
    "<div style='font-size:5.8px;line-height:1.4;color:#0F172A;margin-top:4px;display:flex;justify-content:space-around;'>" +
    "<span>AI Copilot</span> | <span>API Gateway</span> | <span>Services</span>" +
    "</div>", 486, 246, 198, 75, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;rounded=1;align=center;verticalAlign=top;padding=4;");
  rect("zb_worker", "<div style='font-size:7.2px;font-weight:800;color:#0284C7;text-align:center;'>⏩ Background / Worker Tier<br/><span style='font-size:6px;color:#64748B;'>(Cloud Run Jobs)</span></div>" +
    "<div style='font-size:6px;line-height:1.4;color:#0F172A;text-align:left;margin-top:3px;padding-left:6px;'>" +
    "• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing" +
    "</div>", 486, 330, 198, 75, "fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Zone C Column (w=198)
  rect("zc_app", "<div style='font-size:7.2px;font-weight:800;color:#16A34A;text-align:center;'>⚙️ Application Tier<br/><span style='font-size:6px;color:#64748B;'>(GKE Autopilot)</span></div>" +
    "<div style='font-size:5.8px;line-height:1.4;color:#0F172A;margin-top:4px;display:flex;justify-content:space-around;'>" +
    "<span>AI Copilot</span> | <span>API Gateway</span> | <span>Services</span>" +
    "</div>", 697, 246, 198, 75, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;rounded=1;align=center;verticalAlign=top;padding=4;");
  rect("zc_worker", "<div style='font-size:7.2px;font-weight:800;color:#0284C7;text-align:center;'>⏩ Background / Worker Tier<br/><span style='font-size:6px;color:#64748B;'>(Cloud Run Jobs)</span></div>" +
    "<div style='font-size:6px;line-height:1.4;color:#0F172A;text-align:left;margin-top:3px;padding-left:6px;'>" +
    "• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing" +
    "</div>", 697, 330, 198, 75, "fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Data Tier (Regional) (x=265..905, w=640, h=68)
  rect("box_data_tier", "", 265, 428, 640, 68, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1;rounded=1;");
  rect("lbl_data_tier", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>🗄️ Data Tier (Regional)</span>", 270, 431, 200, 12, "strokeColor=none;fillColor=none;align=left;");
  
  rect("dt_alloy", "<div style='font-size:6.2px;font-weight:700;'>⚡ AlloyDB<br/><span style='font-size:5.2px;color:#64748B;'>(PostgreSQL)</span></div>", 273, 448, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dt_sql", "<div style='font-size:6.2px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5.2px;color:#64748B;'>(MySQL)</span></div>", 364, 448, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dt_mongo", "<div style='font-size:6.2px;font-weight:700;'>🍃 MongoDB<br/><span style='font-size:5.2px;color:#64748B;'>(Doc Store)</span></div>", 455, 448, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dt_redis", "<div style='font-size:6.2px;font-weight:700;'>⚡ Redis<br/><span style='font-size:5.2px;color:#64748B;'>(Memorystore)</span></div>", 546, 448, 85, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dt_bq", "<div style='font-size:6.2px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.2px;color:#64748B;'>(Warehouse)</span></div>", 637, 448, 110, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dt_vertex", "<div style='font-size:6.2px;font-weight:700;'>🧠 Vertex AI Vector Search<br/><span style='font-size:5.2px;color:#64748B;'>(Matching Engine)</span></div>", 753, 448, 146, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Shared Services Tier (x=265..905, w=640, h=55)
  rect("box_shared_srv", "", 265, 502, 640, 55, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_shared_srv", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>Shared Services</span>", 270, 505, 200, 12, "strokeColor=none;fillColor=none;align=left;");
  
  rect("ss_gcs", "<div style='font-size:6px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:4.8px;color:#64748B;'>(Artifacts / Files)</span></div>", 273, 520, 98, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ss_sec", "<div style='font-size:6px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:4.8px;color:#64748B;'>(Secrets)</span></div>", 377, 520, 98, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ss_kms", "<div style='font-size:6px;font-weight:700;'>🔑 Cloud KMS<br/><span style='font-size:4.8px;color:#64748B;'>(Encryption Keys)</span></div>", 481, 520, 98, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ss_log", "<div style='font-size:6px;font-weight:700;'>📊 Cloud Logging<br/><span style='font-size:4.8px;color:#64748B;'>&amp; Monitoring</span></div>", 585, 520, 98, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ss_pub", "<div style='font-size:6px;font-weight:700;'>📬 Pub/Sub<br/><span style='font-size:4.8px;color:#64748B;'>(Messaging)</span></div>", 689, 520, 98, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ss_wf", "<div style='font-size:6px;font-weight:700;'>🔄 Workflows<br/><span style='font-size:4.8px;color:#64748B;'>(Orchestration)</span></div>", 793, 520, 106, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Network Foundation Banner (x=265..905, w=640, h=48)
  rect("box_net_found", "", 265, 563, 640, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("lbl_net_found", "<span style='font-size:7.5px;font-weight:800;color:#0F172A;'>Network Foundation</span>", 270, 565, 200, 12, "strokeColor=none;fillColor=none;align=left;");
  rect("nf_items", "<div style='font-size:6.5px;font-weight:600;color:#0F172A;display:flex;justify-content:space-between;'>" +
    "<span>🌐 VPC (10.0.0.0/16)</span> &nbsp;|&nbsp; <span>📑 Subnets (Private)</span> &nbsp;|&nbsp; <span>⚡ Cloud NAT</span> &nbsp;|&nbsp; <span>🔒 Private Google Access</span> &nbsp;|&nbsp; <span>🛡️ VPC Service Controls</span> &nbsp;|&nbsp; <span>🔥 Firewall Rules</span>" +
    "</div>", 273, 580, 624, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 4. DR REGION (us-east1) (x=980..1220, w=240, h=512)
  rect("box_dr_reg", "", 980, 130, 240, 512, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;");
  rect("lbl_dr_reg", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>☁️ DR REGION (us-east1)</span>", 980, 136, 240, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("dr_gke", "<div style='font-size:7.5px;font-weight:800;color:#16A34A;'>⚙️ GKE Autopilot<br/><span style='font-size:6.5px;color:#64748B;'>(Standby)</span></div>", 992, 175, 216, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_run", "<div style='font-size:7.5px;font-weight:800;color:#0284C7;'>⏩ Cloud Run Jobs<br/><span style='font-size:6.5px;color:#64748B;'>(Standby)</span></div>", 992, 260, 216, 70, "fillColor=#F0F9FF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  
  rect("dr_data", "<div style='font-size:7.5px;font-weight:800;color:#9333EA;text-align:left;padding-left:6px;'>Data Tier (Replicated)</div>" +
    "<div style='font-size:6.5px;line-height:1.4;color:#0F172A;text-align:left;padding-left:6px;margin-top:3px;'>" +
    "• AlloyDB (Cross-region Read Replicas)<br/>• Cloud Storage (Dual-region)<br/>• BigQuery (Cross-region Replication)<br/>• MongoDB Atlas (Global Cluster)" +
    "</div>", 992, 345, 216, 115, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("dr_shared", "<div style='font-size:7.5px;font-weight:800;color:#2563EB;'>🛡️ Shared Services<br/><span style='font-size:6.5px;color:#64748B;'>(Standby)</span></div>", 992, 475, 216, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "Async Replication\n&amp; DR Sync", "box_pri_reg", "box_dr_reg", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=7.2;fontStyle=1;");

  // 5. RIGHT COLUMN: 3 NOTES CARDS (x=1240..1560, w=320, h=512)
  rect("hdr_dep_notes", "<span style='font-size:8px;font-weight:800;color:#FFFFFF;'>DEPLOYMENT NOTES</span>", 1240, 130, 320, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_dep_notes", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;'>" +
    "• <b>Primary active region:</b> us-central1<br/>" +
    "• <b>3 AZs</b> for high availability<br/>" +
    "• <b>GKE Autopilot</b> for application tier<br/>" +
    "• <b>Cloud Run Jobs</b> for elastic background processing<br/>" +
    "• <b>Data tier</b> with managed services and cross-region replication<br/>" +
    "• <b>DR region</b> in us-east1 (warm standby)<br/>" +
    "• <b>All traffic</b> over HTTPS/TLS 1.2+<br/>" +
    "• <b>Infrastructure as Code</b> (Terraform)" +
    "</div>", 1240, 152, 320, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_scaling", "<span style='font-size:8px;font-weight:800;color:#FFFFFF;'>SCALING STRATEGY</span>", 1240, 303, 320, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_scaling", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;'>" +
    "⚙️ <b>Horizontal Pod Autoscaler (GKE)</b><br/>" +
    "📦 <b>Cloud Run concurrency scaling</b><br/>" +
    "📬 <b>Pub/Sub driven event scaling</b><br/>" +
    "📊 <b>BigQuery autoscaling</b><br/>" +
    "⚡ <b>Memorystore Redis Cluster Mode</b>" +
    "</div>", 1240, 325, 320, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_sec_ctrl", "<span style='font-size:8px;font-weight:800;color:#FFFFFF;'>SECURITY CONTROLS</span>", 1240, 466, 320, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_sec_ctrl", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;'>" +
    "🛡️ <b>IAM least privilege access</b><br/>" +
    "🔒 <b>VPC Service Controls</b><br/>" +
    "🔐 <b>Encryption in transit &amp; at rest</b><br/>" +
    "🔑 <b>Secrets in Secret Manager</b><br/>" +
    "🛡️ <b>Cloud Armor for WAF &amp; DDoS</b><br/>" +
    "📑 <b>Audit logs in Cloud Logging</b>" +
    "</div>", 1240, 488, 320, 154, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");


  // 6. BOTTOM ROW: 4 PANELS (x=20..1560, y=660..780, h=120)
  // Panel 1: Deployment Tools (x=20..250, w=230)
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:6px;'>DEPLOYMENT TOOLS</div>", 20, 660, 230, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=top;padding=6;");
  rect("bt_tf", "<div style='font-size:6.8px;font-weight:700;'>🏗️<br/>Terraform<br/><span style='font-size:5.5px;color:#64748B;'>(IaC)</span></div>", 30, 686, 62, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("bt_cb", "<div style='font-size:6.8px;font-weight:700;'>🚀<br/>Cloud Build<br/><span style='font-size:5.5px;color:#64748B;'>(CI/CD)</span></div>", 102, 686, 62, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("bt_ar", "<div style='font-size:6.8px;font-weight:700;'>📦<br/>Artifact Registry<br/><span style='font-size:5.5px;color:#64748B;'>(Containers)</span></div>", 174, 686, 66, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Panel 2: CI/CD Pipeline (High Level) (x=265..780, w=515)
  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:6px;'>CI/CD PIPELINE (HIGH LEVEL)</div>", 265, 660, 515, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=top;padding=6;");
  rect("pipe_1", "<div style='font-size:6.8px;font-weight:700;'>💻<br/>Code Commit<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Source Repos)</span></div>", 275, 686, 92, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pipe_2", "<div style='font-size:6.8px;font-weight:700;'>⚙️<br/>Build<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Build)</span></div>", 380, 686, 82, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pipe_3", "<div style='font-size:6.8px;font-weight:700;'>🔍<br/>Scan<br/><span style='font-size:5.5px;color:#64748B;'>(Artifact Analysis)</span></div>", 475, 686, 82, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pipe_4", "<div style='font-size:6.8px;font-weight:700;'>📦<br/>Push Image<br/><span style='font-size:5.5px;color:#64748B;'>(Artifact Registry)</span></div>", 570, 686, 82, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pipe_5", "<div style='font-size:6.8px;font-weight:700;'>🚀<br/>Deploy<br/><span style='font-size:5.5px;color:#64748B;'>(GKE / Cloud Run)</span></div>", 665, 686, 105, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "pipe_1", "pipe_2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=3;");
  edge(nid(), "", "pipe_2", "pipe_3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=3;");
  edge(nid(), "", "pipe_3", "pipe_4", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=3;");
  edge(nid(), "", "pipe_4", "pipe_5", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=3;");

  // Panel 3: Monitoring & Observability (x=795..1155, w=360)
  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:6px;'>MONITORING &amp; OBSERVABILITY</div>", 795, 660, 360, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=top;padding=6;");
  rect("mon_1", "<div style='font-size:6.8px;font-weight:700;'>📈<br/>Cloud Monitoring<br/><span style='font-size:5.5px;color:#64748B;'>(Metrics)</span></div>", 805, 686, 78, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mon_2", "<div style='font-size:6.8px;font-weight:700;'>📑<br/>Cloud Logging<br/><span style='font-size:5.5px;color:#64748B;'>(Logs)</span></div>", 893, 686, 78, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mon_3", "<div style='font-size:6.8px;font-weight:700;'>🔍<br/>Cloud Trace<br/><span style='font-size:5.5px;color:#64748B;'>(Tracing)</span></div>", 981, 686, 78, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mon_4", "<div style='font-size:6.8px;font-weight:700;'>🔔<br/>Alerting<br/><span style='font-size:5.5px;color:#64748B;'>(PagerDuty)</span></div>", 1069, 686, 76, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Panel 4: Environment Strategy (x=1170..1560, w=390)
  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:6px;'>ENVIRONMENT STRATEGY</div>", 1170, 660, 390, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=top;padding=6;");
  rect("env_dev", "<div style='font-size:7.5px;font-weight:800;color:#16A34A;'>DEV</div>", 1185, 686, 80, 28, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("env_test", "<div style='font-size:7.5px;font-weight:800;color:#D97706;'>TEST</div>", 1275, 686, 80, 28, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");
  rect("env_stage", "<div style='font-size:7.5px;font-weight:800;color:#2563EB;'>STAGE</div>", 1365, 686, 80, 28, "fillColor=#DBEAFE;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("env_prod", "<div style='font-size:7.5px;font-weight:800;color:#DC2626;'>PROD</div>", 1455, 686, 85, 28, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");
  rect("env_desc", "<div style='font-size:6.8px;color:#0F172A;text-align:center;margin-top:4px;'>" +
    "<b>Isolated Projects</b><br/>• Separate VPCs &nbsp;&nbsp;• Separate Data &nbsp;&nbsp;• Separate IAM" +
    "</div>", 1185, 720, 355, 45, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 790, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 790, 135, 18, "strokeColor=none;fillColor=none;align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_16_deployment_diagram" name="Template 16: Deployment Diagram">
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

