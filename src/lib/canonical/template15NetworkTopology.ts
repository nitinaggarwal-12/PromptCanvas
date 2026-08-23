/**
 * Canonical Architecture Template 15: Template 15: Network Topology Diagram
 * High-fidelity 16:9 replication of images/15.png
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


  // 1. BRAND HEADER & METADATA
  rect("num_badge", "15", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Network Topology Diagram</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: Regulatory Intelligence Platform (NOVA CURA) | Environment: Production | Region: us-central1 | Last Updated: May 8, 2025</div>", 78, 18, 850, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1150, 18, 380, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Top Right Network Overview Card
  rect("card_net_over", "<div style='font-size:8px;font-weight:800;color:#0F172A;margin-bottom:4px;'>NETWORK OVERVIEW</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#64748B;'>" +
    "<b>Cloud Provider:</b> Google Cloud Platform (GCP)<br/>" +
    "<b>Region / VPC:</b> us-central1 (Iowa) | novacura-prod-vpc (10.10.0.0/16)<br/>" +
    "<b>Multi-AZ / HA:</b> Enabled | HA: Enabled<br/>" +
    "<b>Connectivity:</b> Internet, VPN, Private Service Connect" +
    "</div>", 980, 78, 300, 68, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: USERS, INTERNET, EXTERNAL CONNECTIVITY
  rect("hdr_users", "<span style='font-size:8.5px;font-weight:800;color:#16A34A;'>USERS & CLIENTS</span>", 20, 150, 120, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 172, 120, 290, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  
  rect("u_reg", "<div style='font-size:7.5px;font-weight:700;'>👤<br/>Regulatory Analysts</div>", 28, 182, 104, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_biz", "<div style='font-size:7.5px;font-weight:700;'>💻<br/>Business Users</div>", 28, 232, 104, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_mob", "<div style='font-size:7.5px;font-weight:700;'>📱<br/>Mobile App Users</div>", 28, 282, 104, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_part", "<div style='font-size:7.5px;font-weight:700;'>⚙️<br/>Partner Systems</div>", 28, 332, 104, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_api", "<div style='font-size:7.5px;font-weight:700;'>🌐<br/>Public APIs / Integrations</div>", 28, 382, 104, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Internet Cloud
  rect("cloud_internet", "<span style='font-size:8.5px;font-weight:800;color:#0284C7;'>Internet</span>", 155, 235, 75, 45, "shape=cloud;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");
  edge(nid(), "", "box_users", "cloud_internet", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // External Connectivity Box
  rect("box_ext_conn", "", 150, 310, 85, 170, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.2;rounded=1;");
  rect("lbl_ext_conn", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>EXTERNAL<br/>CONNECTIVITY</span>", 150, 315, 85, 22, "strokeColor=none;fillColor=none;align=center;");
  rect("ext_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️<br/>Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(DDoS Protection)</span></div>", 155, 342, 75, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ext_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡<br/>Cloud CDN</div>", 155, 390, 75, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ext_dns", "<div style='font-size:6.8px;font-weight:700;'>🌐<br/>Cloud DNS</div>", 155, 432, 75, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "cloud_internet", "box_ext_conn", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3. CENTER MAIN BOX: GCP PROJECT & SHARED VPC (10.10.0.0/16)
  rect("box_vpc_outer", "", 255, 140, 680, 480, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;");
  rect("lbl_vpc_title", "<span style='font-size:9.5px;font-weight:800;color:#2563EB;'>GCP PROJECT: novacura-prod &nbsp;|&nbsp; VPC: novacura-prod-vpc (10.10.0.0/16)</span>", 265, 148, 500, 18, "strokeColor=none;fillColor=none;align=left;");

  // 3.1 PUBLIC SUBNET (10.10.0.0/24)
  rect("box_pub_subnet", "", 270, 172, 650, 80, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_pub_subnet", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>PUBLIC SUBNET (10.10.0.0/24)</span>", 490, 176, 210, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("pub_lb", "<div style='font-size:7.5px;font-weight:700;'>⚖️<br/>External<br/>HTTP(S) Load Balancer</div>", 290, 196, 140, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pub_apigw", "<div style='font-size:7.5px;font-weight:700;'>🔌<br/>API Gateway<br/><span style='font-size:6px;color:#64748B;'>(Apigee X)</span></div>", 520, 196, 110, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("pub_waf", "<div style='font-size:7.5px;font-weight:700;'>🛡️<br/>Web Application<br/>Firewall (WAF)</div>", 720, 196, 130, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "box_ext_conn", "pub_lb", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_lb", "pub_apigw", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pub_apigw", "pub_waf", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3.2 PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24)
  rect("box_priv_subnets", "", 270, 265, 650, 205, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_priv_subnets", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24)</span>", 470, 270, 250, 14, "strokeColor=none;fillColor=none;align=center;");

  // Zone A Column
  rect("box_zone_a", "", 285, 290, 190, 168, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zone_a", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>us-central1-a</span>", 285, 295, 190, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("za_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier</b><br/><span style='font-size:6px;color:#64748B;'>Compute Engine (App Instances)</span></div>", 295, 314, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("za_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier</b><br/><span style='font-size:6px;color:#64748B;'>GKE (Microservices)</span></div>", 295, 360, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("za_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier</b><br/><span style='font-size:6px;color:#64748B;'>Redis (Memorystore)</span></div>", 295, 406, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Zone B Column
  rect("box_zone_b", "", 500, 290, 190, 168, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zone_b", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>us-central1-b</span>", 500, 295, 190, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zb_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier</b><br/><span style='font-size:6px;color:#64748B;'>Compute Engine (App Instances)</span></div>", 510, 314, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zb_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier</b><br/><span style='font-size:6px;color:#64748B;'>GKE (Microservices)</span></div>", 510, 360, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zb_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier</b><br/><span style='font-size:6px;color:#64748B;'>Redis (Memorystore)</span></div>", 510, 406, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Zone C Column
  rect("box_zone_c", "", 715, 290, 190, 168, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_zone_c", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>us-central1-c</span>", 715, 295, 190, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zc_web", "<div style='font-size:7.2px;font-weight:700;'>🖥️ <b>Web Tier</b><br/><span style='font-size:6px;color:#64748B;'>Compute Engine (App Instances)</span></div>", 725, 314, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zc_app", "<div style='font-size:7.2px;font-weight:700;'>⚙️ <b>App Tier</b><br/><span style='font-size:6px;color:#64748B;'>GKE (Microservices)</span></div>", 725, 360, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zc_cache", "<div style='font-size:7.2px;font-weight:700;'>⚡ <b>Cache Tier</b><br/><span style='font-size:6px;color:#64748B;'>Redis (Memorystore)</span></div>", 725, 406, 170, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

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

  // 3.3 DATA SUBNET (10.10.10.0/24)
  rect("box_data_subnet", "", 270, 480, 650, 115, "fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.2;rounded=1;");
  rect("lbl_data_subnet", "<span style='font-size:8px;font-weight:800;color:#9333EA;'>DATA SUBNET (10.10.10.0/24)</span>", 490, 485, 210, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("d_sql", "<div style='font-size:7.2px;font-weight:700;'>🗄️<br/>Primary Database<br/><span style='font-size:6px;color:#64748B;'>Cloud SQL (PostgreSQL)<br/>HA (Multi-AZ)</span></div>", 295, 508, 170, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("d_gcs", "<div style='font-size:7.2px;font-weight:700;'>🗃️<br/>Object Storage<br/><span style='font-size:6px;color:#64748B;'>Cloud Storage<br/>(Documents)</span></div>", 510, 508, 170, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("d_search", "<div style='font-size:7.2px;font-weight:700;'>🔍<br/>Search Index<br/><span style='font-size:6px;color:#64748B;'>OpenSearch Service<br/>(Managed)</span></div>", 725, 508, 170, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Vertical down arrows from Cache Tiers to Data Subnet
  edge(nid(), "", "za_cache", "d_sql", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "zb_cache", "d_gcs", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "zc_cache", "d_search", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");

  edge(nid(), "", "d_sql", "d_gcs", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");
  edge(nid(), "", "d_gcs", "d_search", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=3;startSize=3;");

  // 4. RIGHT COLUMN: MANAGED SERVICES BUS
  rect("box_managed_srv", "", 955, 160, 180, 460, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;");
  rect("lbl_managed_srv", "<span style='font-size:8.5px;font-weight:800;color:#D97706;'>MANAGED SERVICES</span>", 955, 168, 180, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("ms_bq", "<div style='font-size:7.2px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:6px;color:#64748B;'>(Analytics & BI)</span></div>", 968, 195, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_pubsub", "<div style='font-size:7.2px;font-weight:700;'>📬 Pub/Sub<br/><span style='font-size:6px;color:#64748B;'>(Event Streaming)</span></div>", 968, 240, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_tasks", "<div style='font-size:7.2px;font-weight:700;'>📋 Cloud Tasks<br/><span style='font-size:6px;color:#64748B;'>(Background Jobs)</span></div>", 968, 285, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_vertex", "<div style='font-size:7.2px;font-weight:700;'>🧠 Vertex AI<br/><span style='font-size:6px;color:#64748B;'>(AI/ML Services)</span></div>", 968, 330, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_secret", "<div style='font-size:7.2px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:6px;color:#64748B;'>(Secrets & Keys)</span></div>", 968, 375, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_log", "<div style='font-size:7.2px;font-weight:700;'>📑 Cloud Logging<br/><span style='font-size:6px;color:#64748B;'>(Logs)</span></div>", 968, 420, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ms_mon", "<div style='font-size:7.2px;font-weight:700;'>📈 Cloud Monitoring<br/><span style='font-size:6px;color:#64748B;'>(Metrics & Alerts)</span></div>", 968, 465, 154, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Clean horizontal dashed arrows from right of VPC straight into Managed Services
  edge(nid(), "", "box_vpc_outer", "ms_bq", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "box_vpc_outer", "ms_pubsub", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "box_vpc_outer", "ms_tasks", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "box_vpc_outer", "ms_vertex", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "box_vpc_outer", "ms_secret", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "box_vpc_outer", "ms_log", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");
  edge(nid(), "", "box_vpc_outer", "ms_mon", "edgeStyle=none;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=3;");

  // 5. BOTTOM ROW: ON-PREMISES, NETWORK SECURITY, LEGEND, NOTES
  rect("box_onprem", "", 20, 630, 220, 140, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_onprem", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>🏢 ON-PREMISES / CUSTOMER NETWORK</span>", 20, 636, 220, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("op_dc", "<div style='font-size:7.2px;font-weight:700;'>🗄️<br/>Datacenter /<br/>On-Prem Systems</div>", 32, 665, 85, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("op_vpn", "<div style='font-size:7.2px;font-weight:700;'>🔒<br/>VPN /<br/>Interconnect</div>", 138, 665, 85, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  edge(nid(), "", "op_dc", "op_vpn", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // Network Security Box in bottom middle
  rect("box_net_sec", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:8px;'>NETWORK SECURITY</div>" +
    "<div style='font-size:7.5px;color:#0F172A;'>" +
    "🛡️ <b>VPC Firewall</b> (Ingress/Egress) &nbsp;&nbsp;&nbsp; ⚡ <b>Private Google Access</b><br/><br/>" +
    "📑 <b>VPC Flow Logs</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>IDS/IPS</b> (Threat Detection)" +
    "</div>", 255, 630, 420, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // Vertical dashed arrow between Network Security and VPC bottom
  edge(nid(), "", "box_net_sec", "box_vpc_outer", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;startArrow=block;endSize=4;startSize=4;");
  // Clean horizontal dashed line from VPN to Network Security
  edge(nid(), "", "op_vpn", "box_net_sec", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  rect("box_legend", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>LEGEND</div>" +
    "<div style='font-size:7.2px;line-height:1.7;color:#0F172A;'>" +
    "─── Internet Traffic<br/>" +
    "- - - Private/Internal Traffic<br/>" +
    "······ Service Integration<br/>" +
    "🟩 Public Network &nbsp;&nbsp; 🟦 Private Network &nbsp;&nbsp; 🟪 Data Network" +
    "</div>", 690, 630, 200, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("box_notes", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>NOTES</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "• All subnets are in us-central1 (Iowa)<br/>" +
    "• Private Google Access enabled for secure cloud egress<br/>" +
    "• VPC-native controls for micro-segmentation<br/>" +
    "• Multi-AZ for high availability (99.99%)<br/>" +
    "• Encrypted in transit (TLS 1.2+) and at rest (Google-managed keys)" +
    "</div>", 905, 630, 230, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1000, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");


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
