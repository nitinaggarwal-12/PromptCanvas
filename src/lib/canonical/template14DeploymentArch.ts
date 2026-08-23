/**
 * Canonical Architecture Template 14: Template 14: Deployment Architecture
 * High-fidelity 16:9 replication of images/14.png
 */

export function generateTemplate14DeploymentArchXml(
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


  // 1. BRAND HEADER & SUBTITLE
  rect("num_badge", "14", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>DEPLOYMENT ARCHITECTURE</div><div style='font-size:12px;color:#1E3A8A;font-weight:700;margin-top:2px;'>NOVACURA Enterprise AI Platform for Biopharma</div>", 78, 18, 650, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>Transforming Therapies. Improving Lives.</span></div>", 1250, 18, 330, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Subtitle Banner
  rect("sub_banner", "<span style='font-size:11.5px;font-weight:700;color:#1E3A8A;'>Scalable, secure, and highly available deployment on Google Cloud Platform (Multi-Region)</span>", 20, 78, 580, 28, "fillColor=#F8FAFC;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;align=left;verticalAlign=middle;spacingLeft=12;");

  // 2. TOP GLOBAL TRAFFIC MANAGEMENT
  rect("box_global_traffic", "", 240, 115, 480, 75, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("lbl_global_traffic", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;letter-spacing:0.5px;'>GLOBAL TRAFFIC MANAGEMENT</span>", 370, 120, 220, 16, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  rect("gtm_dns", "<div style='font-size:8px;font-weight:700;'>🌐<br/>Cloud DNS</div>", 255, 142, 85, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("gtm_armor", "<div style='font-size:8px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:6.5px;color:#64748B;'>(WAF / DDoS)</span></div>", 370, 138, 95, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("gtm_lb", "<div style='font-size:8px;font-weight:700;'>⚖️<br/>Cloud Load Balancing<br/><span style='font-size:6.5px;color:#64748B;'>(Global HTTPS)</span></div>", 495, 138, 105, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("gtm_td", "<div style='font-size:8px;font-weight:700;'>📡<br/>Traffic Director<br/><span style='font-size:6.5px;color:#64748B;'>(Geo Routing)</span></div>", 625, 138, 85, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "gtm_dns", "gtm_armor", "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "gtm_armor", "gtm_lb", "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "gtm_lb", "gtm_td", "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3. LEFT COLUMN: USER ACCESS & DEPLOYMENT SUMMARY
  rect("hdr_user_access", "<span style='font-size:9.5px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>USER ACCESS</span>", 20, 115, 145, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_user_access", "<div style='font-size:7.5px;line-height:1.8;padding:4px;color:#0F172A;'>" +
    "👥 <b>Scientists / Clinicians</b><br/>" +
    "🛡️ <b>Regulatory Affairs</b><br/>" +
    "📑 <b>Quality / Safety</b><br/>" +
    "🤝 <b>Partners / CROs</b><br/>" +
    "✨ <b>AI Copilot (Embedded)</b><br/>" +
    "🔌 <b>API / Integrations</b>" +
    "</div>", 20, 142, 145, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_deploy_sum", "<span style='font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>DEPLOYMENT SUMMARY</span>", 20, 295, 145, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_deploy_sum", "<div style='font-size:7.2px;line-height:1.65;padding:4px;color:#0F172A;'>" +
    "☁️ <b>Cloud Provider</b><br/><span style='color:#64748B;'>Google Cloud</span><br/>" +
    "🌐 <b>Regions</b><br/><span style='color:#64748B;'>us-central1 (Primary)<br/>us-east1 (DR)</span><br/>" +
    "✔️ <b>Availability</b><br/><span style='color:#64748B;'>Multi-AZ, Multi-Region</span><br/>" +
    "🔄 <b>Resilience</b><br/><span style='color:#64748B;'>Active-Passive DR</span><br/>" +
    "🔒 <b>Data Protection</b><br/><span style='color:#64748B;'>CMEK, Backups, PITR</span><br/>" +
    "🏛️ <b>Compliance</b><br/><span style='color:#64748B;'>GxP, 21 CFR Part 11, HIPAA</span>" +
    "</div>", 20, 322, 145, 295, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 4. MAIN MULTI-REGION CONTAINER
  rect("hdr_primary_reg", "<span style='font-size:10.5px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>PRIMARY REGION: us-central1</span>", 185, 225, 410, 26, "fillColor=#2563EB;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("box_primary_reg", "", 185, 253, 410, 375, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");

  rect("hdr_dr_reg", "<span style='font-size:10.5px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>DR REGION: us-east1 (Standby)</span>", 685, 225, 410, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_dr_reg", "", 685, 253, 410, 375, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");

  edge(nid(), "", "gtm_td", "hdr_primary_reg", "edgeStyle=orthogonalEdgeStyle;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;", [{x: 667, y: 205}, {x: 390, y: 205}]);
  edge(nid(), "", "gtm_td", "hdr_dr_reg", "edgeStyle=orthogonalEdgeStyle;strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;", [{x: 667, y: 205}, {x: 890, y: 205}]);

  // Primary: Edge & Security
  rect("p_lbl_edge", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>EDGE & SECURITY</span>", 195, 258, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("p_edge_cdn", "<div style='font-size:7.5px;font-weight:700;'>⚡ Cloud CDN</div>", 195, 274, 120, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_edge_armor", "<div style='font-size:7.5px;font-weight:700;'>🛡️ Cloud Armor<br/><span style='font-size:6px;color:#64748B;'>(Security Policies)</span></div>", 325, 274, 130, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_edge_iap", "<div style='font-size:7.5px;font-weight:700;'>🔒 IAP / Identity-Aware<br/><span style='font-size:6px;color:#64748B;'>Proxy</span></div>", 465, 274, 120, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Application Layer (GKE) 5x2 grid
  rect("p_lbl_app", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>APPLICATION LAYER (GKE)</span>", 195, 308, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("p_app_gw", "<div style='font-size:7px;font-weight:700;'>API Gateway<br/><span style='font-size:5.5px;color:#64748B;'>(Apigee X)</span></div>", 195, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_copilot", "<div style='font-size:7px;font-weight:700;'>AI Copilot<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 274, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_rag", "<div style='font-size:7px;font-weight:700;'>RAG / Search<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 353, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_wf", "<div style='font-size:7px;font-weight:700;'>Workflow<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 432, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_notif", "<div style='font-size:7px;font-weight:700;'>Notification<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 511, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  
  rect("p_app_user", "<div style='font-size:7px;font-weight:700;'>User Service</div>", 195, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_doc", "<div style='font-size:7px;font-weight:700;'>Document<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 274, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_study", "<div style='font-size:7px;font-weight:700;'>Study Protocol<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 353, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_safety", "<div style='font-size:7px;font-weight:700;'>Safety / PV<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 432, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_app_reg", "<div style='font-size:7px;font-weight:700;'>Regulatory<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 511, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Data Layer
  rect("p_lbl_data", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>DATA LAYER</span>", 195, 395, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("p_data_sql", "<div style='font-size:6.8px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5.5px;color:#64748B;'>(PostgreSQL)</span></div>", 195, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_data_alloy", "<div style='font-size:6.8px;font-weight:700;'>⚡ AlloyDB<br/><span style='font-size:5.5px;color:#64748B;'>(Operational DB)</span></div>", 274, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_data_mongo", "<div style='font-size:6.8px;font-weight:700;'>🍃 MongoDB Atlas<br/><span style='font-size:5.5px;color:#64748B;'>(Documents)</span></div>", 353, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_data_bq", "<div style='font-size:6.8px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.5px;color:#64748B;'>(Analytics)</span></div>", 432, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_data_vertex", "<div style='font-size:6.8px;font-weight:700;'>🧠 Vertex AI<br/><span style='font-size:5.5px;color:#64748B;'>Vector Search</span></div>", 511, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Primary: Platform Services
  rect("p_lbl_plat", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>PLATFORM SERVICES</span>", 195, 458, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("p_plat_gcs", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5.5px;color:#64748B;'>(Artifacts / Files)</span></div>", 195, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_plat_redis", "<div style='font-size:6.8px;font-weight:700;'>⚡ Memorystore<br/><span style='font-size:5.5px;color:#64748B;'>(Redis Cache)</span></div>", 274, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_plat_pubsub", "<div style='font-size:6.8px;font-weight:700;'>📬 Pub/Sub<br/><span style='font-size:5.5px;color:#64748B;'>(Messaging)</span></div>", 353, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_plat_tasks", "<div style='font-size:6.8px;font-weight:700;'>📋 Cloud Tasks<br/><span style='font-size:5.5px;color:#64748B;'>(Async Jobs)</span></div>", 432, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("p_plat_sec", "<div style='font-size:6.8px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:5.5px;color:#64748B;'>(Secrets)</span></div>", 511, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Edge & Security
  rect("dr_lbl_edge", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>EDGE & SECURITY</span>", 695, 258, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("dr_edge_cdn", "<div style='font-size:7.5px;font-weight:700;'>⚡ Cloud CDN</div>", 695, 274, 120, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_edge_armor", "<div style='font-size:7.5px;font-weight:700;'>🛡️ Cloud Armor<br/><span style='font-size:6px;color:#64748B;'>(Security Policies)</span></div>", 825, 274, 130, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_edge_iap", "<div style='font-size:7.5px;font-weight:700;'>🔒 IAP / Identity-Aware<br/><span style='font-size:6px;color:#64748B;'>Proxy</span></div>", 965, 274, 120, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Application Layer (GKE) 5x2 grid
  rect("dr_lbl_app", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>APPLICATION LAYER (GKE)</span>", 695, 308, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("dr_app_gw", "<div style='font-size:7px;font-weight:700;'>API Gateway<br/><span style='font-size:5.5px;color:#64748B;'>(Apigee X)</span></div>", 695, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_copilot", "<div style='font-size:7px;font-weight:700;'>AI Copilot<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 774, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_rag", "<div style='font-size:7px;font-weight:700;'>RAG / Search<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 853, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_wf", "<div style='font-size:7px;font-weight:700;'>Workflow<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 932, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_notif", "<div style='font-size:7px;font-weight:700;'>Notification<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 1011, 324, 74, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  
  rect("dr_app_user", "<div style='font-size:7px;font-weight:700;'>User Service</div>", 695, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_doc", "<div style='font-size:7px;font-weight:700;'>Document<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 774, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_study", "<div style='font-size:7px;font-weight:700;'>Study Protocol<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 853, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_safety", "<div style='font-size:7px;font-weight:700;'>Safety / PV<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 932, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_app_reg", "<div style='font-size:7px;font-weight:700;'>Regulatory<br/><span style='font-size:5.5px;color:#64748B;'>Service</span></div>", 1011, 360, 74, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Data Layer
  rect("dr_lbl_data", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>DATA LAYER (Standby / Replicated)</span>", 695, 395, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("dr_data_sql", "<div style='font-size:6.8px;font-weight:700;'>🗄️ Cloud SQL<br/><span style='font-size:5.5px;color:#64748B;'>(Read Replica)</span></div>", 695, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_data_alloy", "<div style='font-size:6.8px;font-weight:700;'>⚡ AlloyDB<br/><span style='font-size:5.5px;color:#64748B;'>(Read Replica)</span></div>", 774, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_data_mongo", "<div style='font-size:6.8px;font-weight:700;'>🍃 MongoDB Atlas<br/><span style='font-size:5.5px;color:#64748B;'>(DR Replica)</span></div>", 853, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_data_bq", "<div style='font-size:6.8px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.5px;color:#64748B;'>(DR Dataset)</span></div>", 932, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_data_vertex", "<div style='font-size:6.8px;font-weight:700;'>🧠 Vertex AI<br/><span style='font-size:5.5px;color:#64748B;'>Vector Search<br/>(Replicated)</span></div>", 1011, 411, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // DR: Platform Services
  rect("dr_lbl_plat", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>PLATFORM SERVICES (DR)</span>", 695, 458, 390, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("dr_plat_gcs", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5.5px;color:#64748B;'>(Cross-Region)</span></div>", 695, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_plat_redis", "<div style='font-size:6.8px;font-weight:700;'>⚡ Memorystore<br/><span style='font-size:5.5px;color:#64748B;'>(Replica)</span></div>", 774, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_plat_pubsub", "<div style='font-size:6.8px;font-weight:700;'>📬 Pub/Sub<br/><span style='font-size:5.5px;color:#64748B;'>(Replicated)</span></div>", 853, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_plat_tasks", "<div style='font-size:6.8px;font-weight:700;'>📋 Cloud Tasks<br/><span style='font-size:5.5px;color:#64748B;'>(Replicated)</span></div>", 932, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("dr_plat_sec", "<div style='font-size:6.8px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:5.5px;color:#64748B;'>(Replicated)</span></div>", 1011, 474, 74, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Center Channel: Message/Event Bus & Data Replication
  rect("box_msg_bus", "<div style='text-align:center;'><span style='font-size:8px;font-weight:800;color:#EA580C;'>MESSAGE /<br/>EVENT BUS</span><br/><br/>📬<br/><b>Pub/Sub</b><br/><span style='font-size:6.5px;color:#64748B;'>(Global Topic)</span></div>", 605, 290, 70, 95, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
  rect("box_data_rep", "<div style='text-align:center;'><span style='font-size:8px;font-weight:800;color:#EA580C;'>DATA REPLICATION</span><br/><br/>" +
    "<div style='font-size:6.5px;line-height:1.6;color:#0F172A;text-align:left;padding-left:4px;'>" +
    "🗄️ Cloud SQL Cross-Region<br/>" +
    "⚡ AlloyDB Cross-Region<br/>" +
    "🗃️ Cloud Storage Dual-Region<br/>" +
    "📊 BigQuery Replication" +
    "</div></div>", 605, 400, 70, 110, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "p_app_notif", "box_msg_bus", "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=none;");
  edge(nid(), "", "box_msg_bus", "dr_app_gw", "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");
  edge(nid(), "", "p_data_vertex", "box_data_rep", "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=none;");
  edge(nid(), "", "box_data_rep", "dr_data_sql", "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // Shared Infrastructure Full-Width Banner
  rect("box_shared_infra", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;letter-spacing:0.5px;'>SHARED INFRASTRUCTURE (ACROSS REGIONS)</div>" +
    "<div style='font-size:7.5px;color:#0F172A;margin-top:4px;'>" +
    "🔌 <b>VPC (Custom)</b> &nbsp;&nbsp;&nbsp; 🌐 <b>Shared VPC Subnets</b> &nbsp;&nbsp;&nbsp; 🔗 <b>Cloud NAT</b> &nbsp;&nbsp;&nbsp; ⚡ <b>Cloud Interconnect (HA)</b> &nbsp;&nbsp;&nbsp; 📊 <b>Cloud Monitoring & Logging</b> &nbsp;&nbsp;&nbsp; 🔍 <b>Cloud Trace</b> &nbsp;&nbsp;&nbsp; 💾 <b>Cloud Backup & DR</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>Security Command Center</b>" +
    "</div>", 185, 530, 910, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // Right Column
  rect("hdr_net_topo", "<span style='font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>NETWORK TOPOLOGY</span>", 1110, 115, 155, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_net_topo", "<div style='font-size:7.5px;line-height:1.7;padding:4px;color:#0F172A;'>" +
    "<b>VPC (Custom)</b><br/>" +
    "🔒 <b>Public Subnet</b> (LB, NAT)<br/>" +
    "🔒 <b>Private Subnet - App</b> (GKE)<br/>" +
    "🔒 <b>Private Subnet - Data</b> (DBs)<br/>" +
    "🌐 <b>Cloud NAT / Egress Controls</b>" +
    "</div>", 1110, 142, 155, 105, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_ha", "<span style='font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>HIGH AVAILABILITY</span>", 1110, 260, 155, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_ha", "<div style='font-size:7.5px;line-height:1.7;padding:4px;color:#0F172A;'>" +
    "✔️ Multi-AZ GKE Node Pools<br/>" +
    "✔️ Regional Persistent Disks<br/>" +
    "✔️ Automatic Failover (Health Checks)<br/>" +
    "✔️ Backup & Point-in-Time Recovery<br/>" +
    "✔️ DR Drill & Runbooks" +
    "</div>", 1110, 287, 155, 110, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_mon", "<span style='font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;'>MONITORING & ALERTING</span>", 1110, 410, 155, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_mon", "<div style='font-size:7.5px;line-height:1.7;padding:4px;color:#0F172A;'>" +
    "📊 <b>Cloud Monitoring</b> (Metrics & Dashboards)<br/>" +
    "🔔 <b>Alerting</b> (PagerDuty / Email / SMS)<br/>" +
    "⏱️ <b>SLOs & Error Budgets</b><br/>" +
    "📈 <b>Performance & Cost</b>" +
    "</div>", 1110, 437, 155, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // Bottom Row 5 Panels
  rect("bot_p1", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>DESIGN PRINCIPLES</div>" +
    "<div style='font-size:7.5px;line-height:1.7;color:#0F172A;'>" +
    "✔️ Resilient by design (Multi-AZ + Multi-Region)<br/>" +
    "✔️ Security & compliance as a foundation<br/>" +
    "✔️ Infrastructure as Code (Terraform)<br/>" +
    "✔️ Automated CI/CD for all services<br/>" +
    "✔️ Observability and proactive operations" +
    "</div>", 20, 640, 240, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p2", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>TECHNOLOGY STACK (GCP)</div>" +
    "<div style='font-size:7.5px;line-height:1.7;color:#0F172A;'>" +
    "<b>Container Orch:</b> GKE (Autopilot)<br/>" +
    "<b>API Mgmt:</b> Apigee X<br/>" +
    "<b>Databases:</b> Cloud SQL, AlloyDB, MongoDB<br/>" +
    "<b>Analytics:</b> BigQuery, Vertex AI Search<br/>" +
    "<b>Messaging:</b> Pub/Sub, Cloud Tasks<br/>" +
    "<b>Storage / Sec:</b> Cloud Storage, Cloud Armor" +
    "</div>", 270, 640, 240, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p3", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;text-align:center;'>TRAFFIC FAILOVER FLOW</div>", 520, 640, 290, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=top;padding=8;");
  rect("f_user", "<div style='font-size:7.5px;font-weight:700;'>👤 User Request</div>", 528, 680, 72, 28, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("f_td", "<div style='font-size:7.5px;font-weight:700;'>📡<br/>Traffic Director</div>", 610, 672, 70, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("f_healthy", "<div style='font-size:6.8px;font-weight:700;color:#16A34A;'>Primary Healthy →<br/>Route us-central1</div>", 695, 664, 105, 26, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");
  rect("f_unhealthy", "<div style='font-size:6.8px;font-weight:700;color:#DC2626;'>Primary Unhealthy →<br/>Failover us-east1</div>", 695, 702, 105, 26, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;");

  edge(nid(), "", "f_user", "f_td", "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "f_td", "f_healthy", "edgeStyle=orthogonalEdgeStyle;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "f_td", "f_unhealthy", "edgeStyle=orthogonalEdgeStyle;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;");

  rect("bot_p4", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>BACKUP & RECOVERY</div>" +
    "<div style='font-size:7.5px;line-height:1.7;color:#0F172A;'>" +
    "💾 <b>Automated Backups (Daily)</b><br/>" +
    "⏱️ <b>Point-in-Time Recovery (PITR)</b><br/>" +
    "🌐 <b>Cross-Region Replication</b><br/><br/>" +
    "<span style='font-weight:800;color:#2563EB;'>DR RPO: ≤ 15 mins | RTO: ≤ 1 hr</span>" +
    "</div>", 820, 640, 220, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p5", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>ABBREVIATIONS</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "<b>GKE:</b> Google Kubernetes Engine<br/>" +
    "<b>IAP:</b> Identity-Aware Proxy<br/>" +
    "<b>DR:</b> Disaster Recovery<br/>" +
    "<b>RPO:</b> Recovery Point Objective<br/>" +
    "<b>RTO:</b> Recovery Time Objective<br/>" +
    "<b>HA:</b> High Availability" +
    "</div>", 1050, 640, 215, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1120, 780, 145, 18, "strokeColor=none;fillColor=none;align=right;");


  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_14_deployment_arch" name="Template 14: Deployment Architecture">
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
