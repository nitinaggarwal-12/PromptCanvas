/**
 * Canonical Architecture Template 16: Template 16: Deployment Diagram
 * High-fidelity 16:9 replication of images/16.png
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


  // 1. BRAND HEADER & METADATA
  rect("num_badge", "16", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>DEPLOYMENT DIAGRAM</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>NOVACURA - Enterprise AI Platform for Biopharma &nbsp;|&nbsp; Target Environment: Google Cloud Platform (Multi-Region / Multi-Zone)</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Top Legend Badges
  rect("cat_legend", "<div style='font-size:8px;color:#0F172A;'>" +
    "<span style='background:#DCFCE7;color:#16A34A;padding:3px 8px;border-radius:4px;font-weight:800;'>■ Compute</span> &nbsp;&nbsp;" +
    "<span style='background:#FAF5FF;color:#9333EA;padding:3px 8px;border-radius:4px;font-weight:800;'>■ Data Services</span> &nbsp;&nbsp;" +
    "<span style='background:#EFF6FF;color:#2563EB;padding:3px 8px;border-radius:4px;font-weight:800;'>■ Networking</span> &nbsp;&nbsp;" +
    "<span style='background:#FFF7ED;color:#EA580C;padding:3px 8px;border-radius:4px;font-weight:800;'>■ Security</span>" +
    "</div>", 850, 78, 430, 24, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // 2. LEFT COLUMN: USERS & CLIENTS & EDGE
  rect("hdr_users", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>USERS & CLIENTS</span>", 20, 115, 115, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 137, 115, 255, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");

  rect("u_web", "<div style='font-size:7px;font-weight:700;'>💻 Web App</div>", 26, 147, 102, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_mob", "<div style='font-size:7px;font-weight:700;'>📱 Mobile App</div>", 26, 185, 102, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_copilot", "<div style='font-size:7px;font-weight:700;'>✨ AI Copilot</div>", 26, 223, 102, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_part", "<div style='font-size:7px;font-weight:700;'>🤝 Partner / CRO</div>", 26, 261, 102, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_sci", "<div style='font-size:7px;font-weight:700;'>🔬 Scientists</div>", 26, 299, 102, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_api", "<div style='font-size:7px;font-weight:700;'>🔌 API Clients</div>", 26, 337, 102, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Edge & Security Stack
  rect("e_cdn", "<div style='font-size:7.2px;font-weight:700;'>⚡ Cloud CDN</div>", 145, 160, 85, 34, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("e_armor", "<div style='font-size:7.2px;font-weight:700;'>🛡️ Cloud Armor</div>", 145, 210, 85, 34, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("e_lb", "<div style='font-size:7.2px;font-weight:700;'>⚖️ External HTTPS</div>", 145, 260, 85, 34, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "box_users", "e_armor", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3. CENTER MAIN BOX: GOOGLE CLOUD - PRIMARY REGION (us-central1)
  rect("box_pri_reg", "", 240, 115, 680, 505, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_pri_reg", "<span style='font-size:9.5px;font-weight:800;color:#2563EB;'>GOOGLE CLOUD - PRIMARY REGION (us-central1)</span>", 250, 122, 400, 18, "strokeColor=none;fillColor=none;align=left;");

  // Load Balancers
  rect("lb_global", "<div style='font-size:7.5px;font-weight:700;'>⚖️ Global HTTP(S) Load Balancer</div>", 255, 145, 320, 26, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("lb_internal", "<div style='font-size:7.5px;font-weight:700;'>⚖️ Internal HTTP(S) Load Balancer</div>", 585, 145, 325, 26, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");

  edge(nid(), "", "e_lb", "lb_global", "edgeStyle=orthogonalEdgeStyle;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3 Zones (Zone A, Zone B, Zone C)
  // Zone A
  rect("box_za", "", 255, 180, 210, 200, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_za", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>ZONE A (us-central1-a)</span>", 255, 185, 210, 12, "strokeColor=none;fillColor=none;align=center;");
  rect("za_app", "<div style='font-size:7px;font-weight:800;color:#16A34A;text-align:left;padding-left:4px;'>Application Tier (GKE Autopilot)</div>" +
    "<div style='font-size:6.5px;line-height:1.5;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "• AI Copilot Service<br/>• API Gateway Service<br/>• Business Services" +
    "</div>", 262, 202, 196, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("za_worker", "<div style='font-size:7px;font-weight:800;color:#0284C7;text-align:left;padding-left:4px;'>Background / Worker Tier (Cloud Run Jobs)</div>" +
    "<div style='font-size:6.5px;line-height:1.5;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing" +
    "</div>", 262, 280, 196, 70, "fillColor=#E0F2FE;strokeColor=#0284C7;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Zone B
  rect("box_zb", "", 475, 180, 210, 200, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zb", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>ZONE B (us-central1-b)</span>", 475, 185, 210, 12, "strokeColor=none;fillColor=none;align=center;");
  rect("zb_app", "<div style='font-size:7px;font-weight:800;color:#16A34A;text-align:left;padding-left:4px;'>Application Tier (GKE Autopilot)</div>" +
    "<div style='font-size:6.5px;line-height:1.5;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "• AI Copilot Service<br/>• API Gateway Service<br/>• Business Services" +
    "</div>", 482, 202, 196, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("zb_worker", "<div style='font-size:7px;font-weight:800;color:#0284C7;text-align:left;padding-left:4px;'>Background / Worker Tier (Cloud Run Jobs)</div>" +
    "<div style='font-size:6.5px;line-height:1.5;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing" +
    "</div>", 482, 280, 196, 70, "fillColor=#E0F2FE;strokeColor=#0284C7;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Zone C
  rect("box_zc", "", 695, 180, 210, 200, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zc", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>ZONE C (us-central1-c)</span>", 695, 185, 210, 12, "strokeColor=none;fillColor=none;align=center;");
  rect("zc_app", "<div style='font-size:7px;font-weight:800;color:#16A34A;text-align:left;padding-left:4px;'>Application Tier (GKE Autopilot)</div>" +
    "<div style='font-size:6.5px;line-height:1.5;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "• AI Copilot Service<br/>• API Gateway Service<br/>• Business Services" +
    "</div>", 702, 202, 196, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("zc_worker", "<div style='font-size:7px;font-weight:800;color:#0284C7;text-align:left;padding-left:4px;'>Background / Worker Tier (Cloud Run Jobs)</div>" +
    "<div style='font-size:6.5px;line-height:1.5;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing" +
    "</div>", 702, 280, 196, 70, "fillColor=#E0F2FE;strokeColor=#0284C7;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Data Tier (Regional) - 6 cards
  rect("lbl_data_tier", "<span style='font-size:8px;font-weight:800;color:#9333EA;'>Data Tier (Regional)</span>", 255, 390, 650, 14, "strokeColor=none;fillColor=none;align=left;padding-left:6px;");
  rect("dt_alloy", "<div style='font-size:6.8px;font-weight:700;'>⚡ AlloyDB<br/><span style='font-size:5.5px;color:#64748B;'>(PostgreSQL)</span></div>", 255, 408, 100, 36, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=center;");
  rect("dt_sql", "<div style='font-size:6.8px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5.5px;color:#64748B;'>(MySQL)</span></div>", 365, 408, 100, 36, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=center;");
  rect("dt_mongo", "<div style='font-size:6.8px;font-weight:700;'>🍃 MongoDB Atlas<br/><span style='font-size:5.5px;color:#64748B;'>(Doc Store)</span></div>", 475, 408, 100, 36, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=center;");
  rect("dt_redis", "<div style='font-size:6.8px;font-weight:700;'>⚡ Redis<br/><span style='font-size:5.5px;color:#64748B;'>(Memorystore)</span></div>", 585, 408, 100, 36, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=center;");
  rect("dt_bq", "<div style='font-size:6.8px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.5px;color:#64748B;'>(Warehouse)</span></div>", 695, 408, 100, 36, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=center;");
  rect("dt_vertex", "<div style='font-size:6.8px;font-weight:700;'>🧠 Vertex AI<br/><span style='font-size:5.5px;color:#64748B;'>(Vector Search)</span></div>", 805, 408, 100, 36, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;align=center;");

  // Shared Services - 6 cards
  rect("lbl_shared_srv", "<span style='font-size:8px;font-weight:800;color:#EA580C;'>Shared Services</span>", 255, 452, 650, 14, "strokeColor=none;fillColor=none;align=left;padding-left:6px;");
  rect("ss_gcs", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Cloud Storage</div>", 255, 470, 100, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");
  rect("ss_sec", "<div style='font-size:6.8px;font-weight:700;'>🔒 Secret Manager</div>", 365, 470, 100, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");
  rect("ss_kms", "<div style='font-size:6.8px;font-weight:700;'>🔑 Cloud KMS</div>", 475, 470, 100, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");
  rect("ss_log", "<div style='font-size:6.8px;font-weight:700;'>📊 Logging & Mon</div>", 585, 470, 100, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");
  rect("ss_pub", "<div style='font-size:6.8px;font-weight:700;'>📬 Pub/Sub</div>", 695, 470, 100, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");
  rect("ss_wf", "<div style='font-size:6.8px;font-weight:700;'>🔄 Workflows</div>", 805, 470, 100, 28, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");

  // Network Foundation Footer
  rect("box_net_found", "<div style='font-size:7.5px;color:#0F172A;font-weight:600;'>" +
    "Network Foundation: <b>VPC (10.0.0.0/16)</b> | <b>Subnets (Private)</b> | <b>Cloud NAT</b> | <b>Private Google Access</b> | <b>VPC Service Controls</b> | <b>Firewall Rules</b>" +
    "</div>", 255, 510, 650, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 4. RIGHT DR REGION (us-east1)
  rect("box_dr_reg", "", 935, 115, 200, 390, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");
  rect("lbl_dr_reg", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>DR REGION (us-east1)</span>", 935, 122, 200, 18, "strokeColor=none;fillColor=none;align=center;");
  rect("dr_gke", "<div style='font-size:7.2px;font-weight:700;'>⚙️ GKE Autopilot (Standby)</div>", 945, 150, 180, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_run", "<div style='font-size:7.2px;font-weight:700;'>📦 Cloud Run Jobs (Standby)</div>", 945, 190, 180, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_data", "<div style='font-size:7.2px;font-weight:700;'>🗄️ Data Tier (Replicated)</div>", 945, 230, 180, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_shared", "<div style='font-size:7.2px;font-weight:700;'>Shared Services (Standby)</div>", 945, 270, 180, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "Async Replication & DR Sync", "box_pri_reg", "box_dr_reg", "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=7.5;fontStyle=1;");

  // 5. RIGHT COLUMN: DEPLOYMENT NOTES, SCALING, SECURITY
  rect("hdr_dep_notes", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>DEPLOYMENT NOTES</span>", 1150, 115, 130, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_dep_notes", "<div style='font-size:6.8px;line-height:1.5;padding:4px;color:#0F172A;'>" +
    "<b>Architecture:</b> Multi-AZ, Multi-Region<br/>" +
    "<b>Primary:</b> us-central1 (Iowa)<br/>" +
    "<b>DR:</b> us-east1 (S. Carolina)<br/>" +
    "<b>HA Target:</b> 99.99%<br/>" +
    "<b>RPO:</b> ≤ 15 mins | <b>RTO:</b> ≤ 1 hr" +
    "</div>", 1150, 137, 130, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_scaling", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>SCALING STRATEGY</span>", 1150, 240, 130, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_scaling", "<div style='font-size:6.8px;line-height:1.5;padding:4px;color:#0F172A;'>" +
    "• HPA for GKE pods<br/>" +
    "• Cloud Run auto-concurrency<br/>" +
    "• Pub/Sub event-driven scaling<br/>" +
    "• BigQuery slot autoscaling<br/>" +
    "• Memorystore Cluster Mode" +
    "</div>", 1150, 262, 130, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_sec_ctrl", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>SECURITY CONTROLS</span>", 1150, 370, 130, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_sec_ctrl", "<div style='font-size:6.8px;line-height:1.5;padding:4px;color:#0F172A;'>" +
    "• IAM least privilege<br/>" +
    "• VPC Service Controls<br/>" +
    "• Encryption in transit / rest<br/>" +
    "• Secrets in Secret Manager<br/>" +
    "• Cloud Armor DDoS / WAF<br/>" +
    "• Immutable audit logging" +
    "</div>", 1150, 392, 130, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 6. BOTTOM ROW: 4 PANELS
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>DEPLOYMENT TOOLS</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "🏗️ <b>Terraform:</b> IaC provisioning<br/>" +
    "🚀 <b>Cloud Build:</b> CI/CD pipelines<br/>" +
    "📦 <b>Artifact Registry:</b> Container images<br/>" +
    "⎈ <b>Helm:</b> Kubernetes package mgmt" +
    "</div>", 20, 630, 240, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;text-align:center;'>CI/CD PIPELINE (HIGH LEVEL)</div>" +
    "<div style='font-size:7px;color:#0F172A;margin-top:14px;text-align:center;'>" +
    "<b>Code Commit</b> &nbsp;→&nbsp; <b>Build</b> &nbsp;→&nbsp; <b>Scan</b> &nbsp;→&nbsp; <b>Push Image</b> &nbsp;→&nbsp; <b>Deploy</b>" +
    "</div>", 270, 630, 290, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=top;padding=8;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>MONITORING & OBSERVABILITY</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "📊 <b>Cloud Monitoring:</b> Metrics & dashboards<br/>" +
    "📑 <b>Cloud Logging:</b> Centralized log aggregation<br/>" +
    "🔍 <b>Cloud Trace:</b> Distributed tracing<br/>" +
    "🔔 <b>Alerting:</b> PagerDuty & Slack integration" +
    "</div>", 570, 630, 310, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>ENVIRONMENT STRATEGY</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "<b>DEV</b> | <b>TEST</b> | <b>STAGE</b> | <b>PROD</b><br/>" +
    "• Isolated GCP Projects per environment<br/>" +
    "• Separate VPCs & Data storage<br/>" +
    "• Strict IAM role segmentation" +
    "</div>", 890, 630, 390, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1145, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");


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
