/**
 * Canonical Architecture Template 15: Network Topology Diagram
 * Exact 1:1 High-Fidelity Replication of images/15.png
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

  // 1. TOP HEADER & METADATA (x=20..1560)
  rect("num_badge", "15", 20, 20, 48, 48, "fillColor=#4F46E5;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Network Topology Diagram</div><div style='font-size:11px;color:#0F172A;font-weight:700;margin-top:3px;'>Use Case: Regulatory Intelligence Platform (NOVA CURA)</div><div style='font-size:9.5px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 600, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  
  rect("hdr_brand", "<div style='text-align:center;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;'>AI-Powered Regulatory Intelligence Platform</span></div>", 700, 18, 300, 45, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Top-Right Network Overview Card (x=1180..1560, w=380, h=68)
  rect("card_net_over", "<div style='font-size:8px;font-weight:800;color:#0F172A;margin-bottom:4px;'>NETWORK OVERVIEW</div>" +
    "<div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>" +
    "<b>Cloud Provider:</b> Google Cloud Platform (GCP)<br/>" +
    "<b>Region:</b> us-central1 (Iowa)<br/>" +
    "<b>VPC:</b> novacura-prod-vpc (10.10.0.0/16)<br/>" +
    "<b>Multi-AZ:</b> Enabled &nbsp;|&nbsp; <b>HA:</b> Enabled<br/>" +
    "<b>Connectivity:</b> Internet, VPN, Private Service Connect" +
    "</div>", 1180, 16, 380, 68, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: USERS & CLIENTS (x=20..160, w=140)
  rect("hdr_users", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>USERS &amp; CLIENTS</span>", 20, 130, 140, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 152, 140, 390, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  
  rect("u_reg", "<div style='font-size:7.5px;font-weight:700;'>👤<br/>Regulatory Analysts</div>", 28, 165, 124, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_biz", "<div style='font-size:7.5px;font-weight:700;'>💻<br/>Business Users</div>", 28, 240, 124, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_mob", "<div style='font-size:7.5px;font-weight:700;'>📱<br/>Mobile App Users</div>", 28, 315, 124, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_part", "<div style='font-size:7.5px;font-weight:700;'>⚙️<br/>Partner Systems</div>", 28, 390, 124, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_api", "<div style='font-size:7.5px;font-weight:700;'>🌐<br/>Public APIs /<br/>Integrations</div>", 28, 465, 124, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Internet Cloud (x=185..275)
  rect("cloud_internet", "<span style='font-size:8.5px;font-weight:800;color:#0284C7;'>Internet</span>", 185, 200, 90, 55, "shape=cloud;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");
  edge(nid(), "", "box_users", "cloud_internet", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // External Connectivity Box (x=180..280)
  rect("box_ext_conn", "", 180, 290, 100, 252, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.2;rounded=1;");
  rect("lbl_ext_conn", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>EXTERNAL<br/>CONNECTIVITY</span>", 180, 296, 100, 24, "strokeColor=none;fillColor=none;align=center;");
  rect("ext_armor", "<div style='font-size:7px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(DDoS Protection)</span></div>", 186, 330, 88, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ext_cdn", "<div style='font-size:7px;font-weight:700;'>☁️<br/>Cloud CDN</div>", 186, 400, 88, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ext_dns", "<div style='font-size:7px;font-weight:700;'>🌐<br/>Cloud DNS</div>", 186, 470, 88, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "cloud_internet", "ext_armor", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3. CENTER GCP PROJECT CONTAINER (x=295..1230, w=935, h=512)
  rect("box_gcp_project", "", 295, 130, 935, 512, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;");
  rect("lbl_gcp_title", "<span style='font-size:9.5px;font-weight:800;color:#2563EB;'>GCP PROJECT: novacura-prod &nbsp;|&nbsp; VPC: novacura-prod-vpc (10.10.0.0/16)</span>", 305, 136, 600, 16, "strokeColor=none;fillColor=none;align=left;");

  // 3.1 PUBLIC SUBNET (10.10.0.0/24) (w=905)
  rect("box_pub_subnet", "", 310, 160, 905, 78, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_pub_subnet", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>PUBLIC SUBNET (10.10.0.0/24)</span>", 310, 164, 905, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("pub_lb", "<div style='font-size:7.5px;font-weight:700;'>⚖️ External<br/>HTTP(S) Load Balancer</div>", 330, 184, 250, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pub_apigw", "<div style='font-size:7.5px;font-weight:700;'>🔌 API Gateway<br/>(Apigee X)</div>", 635, 184, 250, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pub_waf", "<div style='font-size:7.5px;font-weight:700;'>🛡️ Web Application<br/>Firewall (WAF)</div>", 940, 184, 250, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "ext_armor", "pub_lb", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_lb", "pub_apigw", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_apigw", "pub_waf", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3.2 PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24) (w=905)
  rect("box_priv_subnets", "", 310, 248, 905, 235, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_priv_subnets", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24)</span>", 310, 252, 905, 14, "strokeColor=none;fillColor=none;align=center;");

  // Zone A Column (w=275)
  rect("box_za", "", 325, 272, 275, 200, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_za", "<span style='font-size:7.8px;font-weight:800;color:#2563EB;'>us-central1-a</span>", 325, 276, 275, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("za_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier</b><br/><span style='font-size:6px;color:#64748B;'>Compute Engine (App Instances)</span></div>", 335, 295, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("za_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier</b><br/><span style='font-size:6px;color:#64748B;'>GKE (Microservices)</span></div>", 335, 355, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("za_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier</b><br/><span style='font-size:6px;color:#64748B;'>Redis (Memorystore)</span></div>", 335, 415, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Zone B Column (w=275)
  rect("box_zb", "", 625, 272, 275, 200, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zb", "<span style='font-size:7.8px;font-weight:800;color:#2563EB;'>us-central1-b</span>", 625, 276, 275, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zb_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier</b><br/><span style='font-size:6px;color:#64748B;'>Compute Engine (App Instances)</span></div>", 635, 295, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zb_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier</b><br/><span style='font-size:6px;color:#64748B;'>GKE (Microservices)</span></div>", 635, 355, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zb_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier</b><br/><span style='font-size:6px;color:#64748B;'>Redis (Memorystore)</span></div>", 635, 415, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Zone C Column (w=275)
  rect("box_zc", "", 925, 272, 275, 200, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zc", "<span style='font-size:7.8px;font-weight:800;color:#2563EB;'>us-central1-c</span>", 925, 276, 275, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zc_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier</b><br/><span style='font-size:6px;color:#64748B;'>Compute Engine (App Instances)</span></div>", 935, 295, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zc_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier</b><br/><span style='font-size:6px;color:#64748B;'>GKE (Microservices)</span></div>", 935, 355, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zc_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier</b><br/><span style='font-size:6px;color:#64748B;'>Redis (Memorystore)</span></div>", 935, 415, 255, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Drop lines from Public Subnet to Web Tiers
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

  // 3.3 DATA SUBNET (10.10.10.0/24) (w=905)
  rect("box_data_subnet", "", 310, 492, 905, 138, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.2;rounded=1;");
  rect("lbl_data_subnet", "<span style='font-size:8px;font-weight:800;color:#9333EA;'>DATA SUBNET (10.10.10.0/24)</span>", 310, 496, 905, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("d_sql", "<div style='font-size:7.5px;font-weight:700;'>🗄️ <b>Primary Database</b><br/><span style='font-size:6px;color:#64748B;'>Cloud SQL (PostgreSQL)<br/>HA (Multi-AZ)</span></div>", 330, 520, 250, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("d_gcs", "<div style='font-size:7.5px;font-weight:700;'>🗃️ <b>Object Storage</b><br/><span style='font-size:6px;color:#64748B;'>Cloud Storage<br/>(Documents)</span></div>", 635, 520, 250, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("d_search", "<div style='font-size:7.5px;font-weight:700;'>🔍 <b>Search Index</b><br/><span style='font-size:6px;color:#64748B;'>OpenSearch Service<br/>(Managed)</span></div>", 940, 520, 250, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Drop arrows from Cache Tiers into Data Subnet
  edge(nid(), "", "za_cache", "d_sql", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "zb_cache", "d_gcs", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "zc_cache", "d_search", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");

  edge(nid(), "", "d_sql", "d_gcs", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "d_gcs", "d_search", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");

  // 4. RIGHT COLUMN: MANAGED SERVICES (x=1250..1560, w=310, h=512)
  rect("box_managed_srv", "", 1250, 130, 310, 512, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;");
  rect("lbl_managed_srv", "<span style='font-size:8px;font-weight:800;color:#D97706;'>MANAGED SERVICES</span>", 1250, 136, 310, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("ms_bq", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>📊</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>BigQuery</span><br/><span style='font-size:6.2px;color:#64748B;'>(Analytics &amp; BI)</span></div></div>", 1262, 162, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");
  rect("ms_pubsub", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>📬</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>Pub/Sub</span><br/><span style='font-size:6.2px;color:#64748B;'>(Event Streaming)</span></div></div>", 1262, 228, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");
  rect("ms_tasks", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>📋</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>Cloud Tasks</span><br/><span style='font-size:6.2px;color:#64748B;'>(Background Jobs)</span></div></div>", 1262, 294, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");
  rect("ms_vertex", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>🧠</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>Vertex AI</span><br/><span style='font-size:6.2px;color:#64748B;'>(AI/ML Services)</span></div></div>", 1262, 360, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");
  rect("ms_secret", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>🔒</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>Secret Manager</span><br/><span style='font-size:6.2px;color:#64748B;'>(Secrets &amp; Keys)</span></div></div>", 1262, 426, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");
  rect("ms_logging", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>📑</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>Cloud Logging</span><br/><span style='font-size:6.2px;color:#64748B;'>(Logs)</span></div></div>", 1262, 492, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");
  rect("ms_mon", "<div style='display:flex;align-items:center;padding:4px;'><span style='font-size:16px;margin-right:8px;'>📈</span><div style='text-align:left;'><span style='font-size:7.8px;font-weight:800;color:#0F172A;'>Cloud Monitoring</span><br/><span style='font-size:6.2px;color:#64748B;'>(Metrics &amp; Alerts)</span></div></div>", 1262, 558, 286, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;");

  // Dotted Service Integration Lines into Managed Services
  edge(nid(), "", "pub_waf", "ms_bq", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;");
  edge(nid(), "", "zc_web", "ms_pubsub", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;", [{x: 1230, y: 256}]);
  edge(nid(), "", "zc_app", "ms_tasks", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;", [{x: 1230, y: 322}]);
  edge(nid(), "", "zc_app", "ms_vertex", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;", [{x: 1230, y: 388}]);
  edge(nid(), "", "zc_cache", "ms_secret", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;", [{x: 1230, y: 454}]);
  edge(nid(), "", "d_search", "ms_logging", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;", [{x: 1230, y: 520}]);
  edge(nid(), "", "d_search", "ms_mon", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=2 4;endArrow=none;", [{x: 1230, y: 586}]);

  // 5. BOTTOM ROW: 4 PANELS (x=20..1560, y=660..780, h=120)
  
  // Panel 1: On-Premises / Customer Network (x=20..310, w=290, h=120)
  rect("box_onprem", "", 20, 660, 290, 120, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_onprem", "<span style='font-size:7.5px;font-weight:800;color:#16A34A;'>🏢 ON-PREMISES / CUSTOMER NETWORK</span>", 20, 664, 290, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("op_dc", "<div style='font-size:7.2px;font-weight:700;'>🖧<br/>Datacenter /<br/>On-Prem Systems</div>", 32, 686, 120, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("op_vpn", "<div style='font-size:7.2px;font-weight:700;'>🔒<br/>VPN / Interconnect</div>", 175, 686, 120, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  edge(nid(), "", "op_dc", "op_vpn", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // Panel 2: Network Security (x=330..770, w=440, h=120)
  rect("box_net_sec", "", 330, 660, 440, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_net_sec", "<span style='font-size:8px;font-weight:800;color:#0F172A;'>NETWORK SECURITY</span>", 330, 664, 440, 14, "strokeColor=none;fillColor=none;align=center;");
  
  rect("sec_fw", "<div style='font-size:6.8px;font-weight:700;'>🛡️<br/>VPC Firewall<br/><span style='font-size:5.5px;color:#64748B;'>(Ingress/Egress Rules)</span></div>", 340, 686, 96, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("sec_pga", "<div style='font-size:6.8px;font-weight:700;'>🔒<br/>Private Google<br/>Access</div>", 446, 686, 96, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("sec_logs", "<div style='font-size:6.8px;font-weight:700;'>📊<br/>VPC<br/>Flow Logs</div>", 552, 686, 96, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("sec_ids", "<div style='font-size:6.8px;font-weight:700;'>🛡️<br/>IDS/IPS<br/><span style='font-size:5.5px;color:#64748B;'>(Threat Detection)</span></div>", 658, 686, 100, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "op_vpn", "box_net_sec", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=none;");
  edge(nid(), "", "box_net_sec", "box_data_subnet", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;");

  // Panel 3: Legend (x=790..1130, w=340, h=120)
  rect("box_legend", "", 790, 660, 340, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_legend", "<span style='font-size:8px;font-weight:800;color:#0F172A;'>LEGEND</span>", 790, 664, 340, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("leg_content", "<div style='font-size:7px;line-height:1.7;color:#0F172A;padding:4px;'>" +
    "── <b>Internet Traffic</b><br/>" +
    "--- <b>Private/Internal Traffic</b><br/>" +
    "···· <b>Service Integration</b><br/>" +
    "<span style='color:#16A34A;'>■ Public Network</span> &nbsp;&nbsp; <span style='color:#2563EB;'>■ Private Network</span> &nbsp;&nbsp; <span style='color:#9333EA;'>■ Data Network</span>" +
    "</div>", 800, 684, 320, 86, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Panel 4: Notes (x=1150..1560, w=410, h=120)
  rect("box_notes", "", 1150, 660, 410, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_notes", "<span style='font-size:8px;font-weight:800;color:#0F172A;'>NOTES</span>", 1150, 664, 410, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("notes_content", "<div style='font-size:7px;line-height:1.6;color:#0F172A;padding:4px;'>" +
    "• All subnets are in us-central1 (Iowa)<br/>" +
    "• Private Google Access enabled<br/>" +
    "• VPC-native controls for segmentation<br/>" +
    "• Multi-AZ for high availability<br/>" +
    "• Encrypted in transit (TLS 1.2+)<br/>" +
    "• Encrypted at rest (Google-managed keys)" +
    "</div>", 1160, 682, 390, 88, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 790, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 790, 135, 18, "strokeColor=none;fillColor=none;align=right;");

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

