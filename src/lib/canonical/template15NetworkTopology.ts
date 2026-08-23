/**
 * Canonical Architecture Template 15: Network Topology Diagram
 * High-fidelity 16:9 full-width replication of images/15.png (Spanning 20px to 1560px)
 */

export function generateTemplate15NetworkTopologyXml(
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

  // 1. BRAND HEADER & METADATA (Full 1540px width)
  rect("num_badge", "15", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Network Topology Diagram</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: Regulatory Intelligence Platform (NOVA CURA) | Environment: Production | Region: us-central1 | Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  
  // Top Right Network Overview Card (x=980..1280)
  rect("card_net_over", "<div style='font-size:8px;font-weight:800;color:#0F172A;margin-bottom:3px;'>NETWORK OVERVIEW</div>" +
    "<div style='font-size:7px;line-height:1.5;color:#64748B;'>" +
    "<b>Cloud Provider:</b> Google Cloud Platform (GCP)<br/>" +
    "<b>Region / VPC:</b> us-central1 (Iowa) | novacura-prod-vpc (10.10.0.0/16)<br/>" +
    "<b>Multi-AZ / HA:</b> Enabled (3 AZs) | HA: Active-Active<br/>" +
    "<b>Connectivity:</b> Internet, Cloud Interconnect, Private Service Connect" +
    "</div>", 980, 16, 280, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1270, 18, 290, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // 2. LEFT COLUMN: USERS, INTERNET, EXTERNAL CONNECTIVITY (x=20..250)
  rect("hdr_users", "<span style='font-size:8.5px;font-weight:800;color:#16A34A;'>USERS &amp; CLIENTS</span>", 20, 140, 130, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 162, 130, 310, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  
  rect("u_reg", "<div style='font-size:7.5px;font-weight:700;'>👤<br/>Regulatory Analysts</div>", 28, 172, 114, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_biz", "<div style='font-size:7.5px;font-weight:700;'>💻<br/>Business Users</div>", 28, 222, 114, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_mob", "<div style='font-size:7.5px;font-weight:700;'>📱<br/>Mobile App Users</div>", 28, 272, 114, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_part", "<div style='font-size:7.5px;font-weight:700;'>⚙️<br/>Partner Systems</div>", 28, 322, 114, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_api", "<div style='font-size:7.5px;font-weight:700;'>🌐<br/>Public APIs / Integrations</div>", 28, 372, 114, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_sec", "<div style='font-size:7px;font-weight:700;color:#16A34A;'>🔒 mTLS Auth Gate</div>", 28, 422, 114, 38, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");

  // Internet Cloud (x=165..250)
  rect("cloud_internet", "<span style='font-size:8.5px;font-weight:800;color:#0284C7;'>Internet</span>", 165, 235, 80, 48, "shape=cloud;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");
  edge(nid(), "", "box_users", "cloud_internet", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // External Connectivity Box (x=165..250)
  rect("box_ext_conn", "", 165, 310, 85, 162, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.2;rounded=1;");
  rect("lbl_ext_conn", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>EXTERNAL<br/>CONNECTIVITY</span>", 165, 315, 85, 22, "strokeColor=none;fillColor=none;align=center;");
  rect("ext_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(DDoS Shield)</span></div>", 170, 342, 75, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ext_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡<br/>Cloud CDN</div>", 170, 386, 75, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ext_dns", "<div style='font-size:6.8px;font-weight:700;'>🌐<br/>Cloud DNS</div>", 170, 426, 75, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "cloud_internet", "box_ext_conn", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3. CENTER MAIN BOX: GCP PROJECT & SHARED VPC (10.10.0.0/16) (x=265..1285, w=1020)
  rect("box_vpc_outer", "", 265, 140, 1020, 480, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;");
  rect("lbl_vpc_title", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>GCP PROJECT: novacura-prod &nbsp;|&nbsp; VPC: novacura-prod-vpc (10.10.0.0/16) &nbsp;|&nbsp; Dual-Stack IPv4/IPv6</span>", 280, 148, 750, 18, "strokeColor=none;fillColor=none;align=left;");

  // 3.1 PUBLIC SUBNET (10.10.0.0/24) (w=990)
  rect("box_pub_subnet", "", 280, 170, 990, 80, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_pub_subnet", "<span style='font-size:8.5px;font-weight:800;color:#16A34A;'>PUBLIC SUBNET (10.10.0.0/24) &nbsp;•&nbsp; Managed Ingress Perimeter</span>", 620, 174, 310, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("pub_lb", "<div style='font-size:7.8px;font-weight:700;'>⚖️<br/>External HTTP(S) Load Balancer<br/><span style='font-size:6px;color:#64748B;'>Global Anycast VIP | SSL Offloading</span></div>", 300, 194, 280, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pub_apigw", "<div style='font-size:7.8px;font-weight:700;'>🔌<br/>API Gateway (Apigee X)<br/><span style='font-size:6px;color:#64748B;'>OAuth2, Rate Limiting, FHIR Mediate</span></div>", 635, 194, 280, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pub_waf", "<div style='font-size:7.8px;font-weight:700;'>🛡️<br/>Cloud Armor WAF Rules<br/><span style='font-size:6px;color:#64748B;'>OWASP Top 10 | Geo-Fencing</span></div>", 970, 194, 280, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "box_ext_conn", "pub_lb", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_lb", "pub_apigw", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_apigw", "pub_waf", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3.2 PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24) (w=990)
  rect("box_priv_subnets", "", 280, 262, 990, 205, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_priv_subnets", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24) &nbsp;•&nbsp; 3-Zone Multi-AZ Workload Mesh</span>", 600, 267, 350, 14, "strokeColor=none;fillColor=none;align=center;");

  // Zone A Column (w=305)
  rect("box_zone_a", "", 295, 286, 305, 170, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zone_a", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>us-central1-a (10.10.1.0/24)</span>", 295, 291, 305, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("za_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier:</b> Compute Engine (App Instances)</div>", 305, 310, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("za_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier:</b> GKE Autopilot (Microservices)</div>", 305, 354, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("za_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier:</b> Redis Memorystore (HA Master)</div>", 305, 398, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Zone B Column (w=305)
  rect("box_zone_b", "", 622, 286, 305, 170, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zone_b", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>us-central1-b (10.10.2.0/24)</span>", 622, 291, 305, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zb_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier:</b> Compute Engine (App Instances)</div>", 632, 310, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zb_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier:</b> GKE Autopilot (Microservices)</div>", 632, 354, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zb_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier:</b> Redis Memorystore (Replica)</div>", 632, 398, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Zone C Column (w=305)
  rect("box_zone_c", "", 950, 286, 305, 170, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zone_c", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>us-central1-c (10.10.3.0/24)</span>", 950, 291, 305, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zc_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier:</b> Compute Engine (App Instances)</div>", 960, 310, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zc_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier:</b> GKE Autopilot (Microservices)</div>", 960, 354, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zc_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier:</b> Redis Memorystore (Replica)</div>", 960, 398, 285, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Vertical down arrows from Public Subnet to Web Tiers
  edge(nid(), "", "pub_lb", "za_web", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_apigw", "zb_web", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_waf", "zc_web", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // Vertical down arrows inside each zone: Web -> App -> Cache
  edge(nid(), "", "za_web", "za_app", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "za_app", "za_cache", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "zb_web", "zb_app", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "zb_app", "zb_cache", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "zc_web", "zc_app", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "zc_app", "zc_cache", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Lateral zone communication arrows (dashed bidirectional)
  edge(nid(), "", "za_web", "zb_web", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "zb_web", "zc_web", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "za_app", "zb_app", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "zb_app", "zc_app", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "za_cache", "zb_cache", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "zb_cache", "zc_cache", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");

  // 3.3 DATA SUBNET (10.10.10.0/24) (w=990)
  rect("box_data_subnet", "", 280, 478, 990, 125, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.2;rounded=1;");
  rect("lbl_data_subnet", "<span style='font-size:8.5px;font-weight:800;color:#9333EA;'>DATA SUBNET (10.10.10.0/24) &nbsp;•&nbsp; CMEK-Encrypted Managed Database &amp; Lakehouse Tier</span>", 580, 483, 390, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("d_sql", "<div style='font-size:7.5px;font-weight:700;'>🗄️ Primary Relational DB<br/><span style='font-size:6px;color:#64748B;'>Cloud SQL (PostgreSQL HA Multi-AZ)<br/>Automated Point-in-Time Recovery</span></div>", 300, 508, 280, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("d_gcs", "<div style='font-size:7.5px;font-weight:700;'>🗃️ Object Lakehouse Storage<br/><span style='font-size:6px;color:#64748B;'>Cloud Storage (Genomic BAM &amp; Docs)<br/>400-Day Immutable WORM Vault</span></div>", 635, 508, 280, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("d_search", "<div style='font-size:7.5px;font-weight:700;'>🔍 Vector &amp; Graph Search Index<br/><span style='font-size:6px;color:#64748B;'>Vertex AI Vector Search &amp; Spanner Graph<br/>768-dim Embeddings &amp; ISO GQL</span></div>", 970, 508, 280, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Vertical down arrows from Cache Tiers to Data Subnet
  edge(nid(), "", "za_cache", "d_sql", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "zb_cache", "d_gcs", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "zc_cache", "d_search", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");

  edge(nid(), "", "d_sql", "d_gcs", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "d_gcs", "d_search", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");

  // 4. RIGHT COLUMN: MANAGED SERVICES BUS (x=1300..1560, w=260)
  rect("box_managed_srv", "", 1300, 140, 260, 480, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;");
  rect("lbl_managed_srv", "<span style='font-size:8.5px;font-weight:800;color:#D97706;'>MANAGED SERVICES &amp; PSC BUS</span>", 1300, 148, 260, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("ms_bq", "<div style='font-size:7.5px;font-weight:700;'>📊 BigQuery Enterprise<br/><span style='font-size:6px;color:#64748B;'>(Analytics, BI &amp; ML Datasets)</span></div>", 1312, 175, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_pubsub", "<div style='font-size:7.5px;font-weight:700;'>📬 Cloud Pub/Sub<br/><span style='font-size:6px;color:#64748B;'>(Real-Time Event Streaming Backbone)</span></div>", 1312, 225, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_tasks", "<div style='font-size:7.5px;font-weight:700;'>📋 Cloud Tasks &amp; Workflows<br/><span style='font-size:6px;color:#64748B;'>(Async Batch Jobs &amp; Orchestration)</span></div>", 1312, 275, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_vertex", "<div style='font-size:7.5px;font-weight:700;'>🧠 Vertex AI Platform<br/><span style='font-size:6px;color:#64748B;'>(Gemini 2.5 Pro &amp; Model Armor)</span></div>", 1312, 325, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_secret", "<div style='font-size:7.5px;font-weight:700;'>🔒 Secret Manager &amp; KMS<br/><span style='font-size:6px;color:#64748B;'>(CMEK HSM Keys &amp; Passwords)</span></div>", 1312, 375, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_logging", "<div style='font-size:7.5px;font-weight:700;'>📑 Cloud Audit Logging<br/><span style='font-size:6px;color:#64748B;'>(21 CFR Part 11 Immutable Audit)</span></div>", 1312, 425, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_mon", "<div style='font-size:7.5px;font-weight:700;'>📈 Cloud Monitoring &amp; SRE<br/><span style='font-size:6px;color:#64748B;'>(SLO Metrics, Alerts &amp; Traces)</span></div>", 1312, 475, 236, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_psc", "<div style='font-size:7.2px;font-weight:700;color:#D97706;'>🔗 Private Service Connect (PSC)<br/><span style='font-size:5.5px;color:#64748B;'>Zero-Egress Direct Google Backbone</span></div>", 1312, 525, 236, 38, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;");

  // Straight horizontal connectors to Managed Services exiting from right VPC border
  edge(nid(), "", "pub_waf", "ms_bq", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "zc_web", "ms_pubsub", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;", [{x: 1285, y: 245}]);
  edge(nid(), "", "zc_app", "ms_tasks", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;", [{x: 1285, y: 295}]);
  edge(nid(), "", "zc_app", "ms_vertex", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;", [{x: 1285, y: 345}]);
  edge(nid(), "", "zc_cache", "ms_secret", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;", [{x: 1285, y: 395}]);
  edge(nid(), "", "d_search", "ms_logging", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;", [{x: 1285, y: 445}]);
  edge(nid(), "", "d_search", "ms_mon", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;", [{x: 1285, y: 495}]);

  // 5. BOTTOM ROW: ON-PREMISES, NETWORK SECURITY, LEGEND, NOTES (SPANS 20px to 1560px)
  
  // On-Premises Customer Network (x=20..310, w=290)
  rect("box_onprem", "", 20, 635, 290, 135, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_onprem", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>ON-PREMISES / HYBRID CLOUD GATEWAY</span>", 20, 641, 290, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("op_dc", "<div style='font-size:7.2px;font-weight:700;'>🏢 Datacenter / Hospital Systems<br/><span style='font-size:5.8px;color:#64748B;'>Clinical EHR &amp; Lab Sequencers</span></div>", 30, 665, 270, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("op_vpn", "<div style='font-size:7.2px;font-weight:700;'>🔒 Dedicated Cloud Interconnect / IPsec VPN<br/><span style='font-size:5.8px;color:#64748B;'>10 Gbps Redundant Cloud Router</span></div>", 30, 715, 270, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Network Security Box (x=325..725, w=400)
  rect("box_net_sec", "", 325, 635, 400, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_net_sec", "<span style='font-size:8.5px;font-weight:800;color:#0F172A;'>NETWORK SECURITY &amp; ZERO-TRUST CONTROLS</span>", 325, 641, 400, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("sec_fw", "<div style='font-size:7px;line-height:1.5;color:#0F172A;'>• <b>VPC Firewall:</b> Stateful ingress/egress rules by service account tags<br/>• <b>Private Google Access:</b> Direct internal subnet routing to Google APIs<br/>• <b>VPC Flow Logs:</b> Sampled 100% network telemetry sent to Cloud Logging<br/>• <b>Cloud IDS/IPS:</b> Inline deep-packet threat &amp; intrusion inspection</div>", 335, 665, 380, 92, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=6;");

  edge(nid(), "", "op_vpn", "box_net_sec", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "box_net_sec", "box_vpc_outer", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;startArrow=block;endSize=4;startSize=4;");

  // Legend Box (x=740..1140, w=400)
  rect("box_legend", "", 740, 635, 400, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_legend", "<span style='font-size:8.5px;font-weight:800;color:#0F172A;'>NETWORK TOPOLOGY LEGEND</span>", 740, 641, 400, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("leg_content", "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "── <b>Internet Traffic:</b> TLS 1.3 External HTTPS Ingress<br/>" +
    "--- <b>Private Subnet Mesh:</b> Internal mTLS Microservice Calls (10.10.0.0/16)<br/>" +
    "-·- <b>Managed Services (PSC):</b> Zero-Egress Google Cloud Backbone<br/>" +
    "<span style='color:#16A34A;'>■ Public Subnet</span> &nbsp;&nbsp; <span style='color:#2563EB;'>■ Private Subnets</span> &nbsp;&nbsp; <span style='color:#9333EA;'>■ Data Subnet</span> &nbsp;&nbsp; <span style='color:#D97706;'>■ Managed Services</span>" +
    "</div>", 750, 665, 380, 92, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Notes Box (x=1155..1560, w=405)
  rect("box_notes", "", 1155, 635, 405, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_notes", "<span style='font-size:8.5px;font-weight:800;color:#0F172A;'>TOPOLOGY NOTES &amp; COMPLIANCE SPECS</span>", 1155, 641, 405, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("notes_content", "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• <b>Subnet Isolation:</b> All subnets located in region us-central1 (Iowa).<br/>" +
    "• <b>Multi-AZ HA:</b> 99.99% availability via redundant pods across 3 AZs.<br/>" +
    "• <b>Micro-Segmentation:</b> Zero-trust VPC-native firewall rules.<br/>" +
    "• <b>Encryption:</b> In-transit TLS 1.3/mTLS and at-rest Google CMEK HSM." +
    "</div>", 1165, 665, 385, 92, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_15_network_topology" name="Template 15: Network Topology Diagram">
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
