/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 14 — DEPLOYMENT ARCHITECTURE
 * 
 * 1:1 Ground-Truth Reproduction of images/14.png
 * "14 DEPLOYMENT ARCHITECTURE | NOVACURA Enterprise AI Platform for Biopharma"
 * Multi-Region Active/Passive DR on Google Cloud (Primary us-central1, DR us-east1,
 * Global Traffic Management, Shared Infrastructure, 4 Bottom Analytical Panels).
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate14DeploymentArchXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const edge = (id: string, label: string, x1: number, y1: number, x2: number, y2: number, color = "#0F172A", dashed = false, arrow = "block", pts: [number, number][] = []) => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const ptsXml = pts.length > 0 ? `<Array as="points">${pts.map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const labelStyle = label ? `fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.5;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_14", "<b style='font-size:24px;color:#FFFFFF;'>14</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">DEPLOYMENT ARCHITECTURE</div>
    <div style="font-size:12px;font-weight:700;color:#475569;margin-top:2px;">NOVACURA Enterprise AI Platform for Biopharma</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 750, 40, "align=left;verticalAlign=middle;");

  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">Transforming Therapies. Improving Lives.</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // Scenario Card
  const scenarioHtml = `<div style="font-size:9.5px;color:#0F172A;font-weight:500;line-height:1.35;">
    Scalable, secure, and highly available deployment on Google Cloud Platform (Multi-Region)
  </div>`;
  rect("scenario_card", scenarioHtml, 20, 64, 620, 40, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;arcSize=4;align=left;spacingLeft=8;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT SIDEBAR: USER ACCESS & DEPLOYMENT SUMMARY (x: 20, w: 180)
  // =========================================================================
  const userAccessHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">USER ACCESS</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span>👥</span><span>Scientists / Clinicians</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span>⚖️</span><span>Regulatory Affairs</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span>📋</span><span>Quality / Safety</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span>🤝</span><span>Partners / CROs</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span>🤖</span><span>AI Copilot (Embedded)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span>🔌</span><span>API / Integrations</span></div>
    </div>
  </div>`;
  rect("card_user_access", userAccessHtml, 20, 115, 180, 230, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  const depSummaryHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">DEPLOYMENT SUMMARY</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.4;">
      <div style="margin-bottom:5px;"><b>☁️ Cloud Provider</b><br><span style="color:#64748B;">Google Cloud</span></div>
      <div style="margin-bottom:5px;"><b>🌐 Regions</b><br><span style="color:#64748B;">us-central1 (Primary)<br>us-east1 (DR)</span></div>
      <div style="margin-bottom:5px;"><b>✔ Availability</b><br><span style="color:#64748B;">Multi-AZ, Multi-Region</span></div>
      <div style="margin-bottom:5px;"><b>🔄 Resilience</b><br><span style="color:#64748B;">Active-Passive DR</span></div>
      <div style="margin-bottom:5px;"><b>🔒 Data Protection</b><br><span style="color:#64748B;">CMEK Encryption, Backups, PITR</span></div>
      <div><b>🛡️ Compliance</b><br><span style="color:#64748B;">GxP, 21 CFR Part 11, HIPAA, ISO 27001</span></div>
    </div>
  </div>`;
  rect("card_dep_summary", depSummaryHtml, 20, 355, 180, 395, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 3. GLOBAL TRAFFIC MANAGEMENT & REGIONS (x: 215 to 1340)
  // =========================================================================
  // Global Traffic Management Box (x: 260, y: 115, w: 500, h: 75)
  const trafficBoxHtml = `<div style="padding:4px;text-align:center;">
    <div style="font-size:9px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">GLOBAL TRAFFIC MANAGEMENT</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;font-size:7.5px;font-weight:700;">
      <div><div style="font-size:16px;">🌐</div>Cloud DNS</div>
      <span>➔</span>
      <div><div style="font-size:16px;">🛡️</div>Cloud Armor<br><span style="font-size:6.5px;color:#64748B;">(WAF / DDoS)</span></div>
      <span>➔</span>
      <div><div style="font-size:16px;">⚖️</div>Cloud Load Balancing<br><span style="font-size:6.5px;color:#64748B;">(Global HTTPS)</span></div>
      <span>➔</span>
      <div><div style="font-size:16px;">📡</div>Traffic Director<br><span style="font-size:6.5px;color:#64748B;">(Geo Routing)</span></div>
    </div>
  </div>`;
  rect("global_traffic_box", trafficBoxHtml, 270, 115, 520, 75, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // PRIMARY REGION: us-central1 (x: 215, y: 220, w: 430, h: 440)
  rect("primary_region_header", "<b style='color:#FFF;font-size:10px;'>PRIMARY REGION: us-central1</b>", 215, 220, 430, 24, "fillColor=#1D4ED8;strokeColor=#1D4ED8;rounded=0;arcSize=0;align=center;verticalAlign=middle;");
  rect("primary_region_body", "", 215, 244, 430, 416, "fillColor=#F8FAFC;strokeColor=#1D4ED8;strokeWidth=1.5;rounded=0;arcSize=0;");

  // Primary: Edge & Security
  text("p_edge_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>EDGE &amp; SECURITY</span>", 225, 250, 410, 15, "align=center;");
  rect("p_cdn", "Cloud CDN", 225, 268, 125, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  rect("p_armor", "Cloud Armor<br><span style='font-size:6.5px;color:#64748B;'>(Security Policies)</span>", 360, 268, 135, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  rect("p_iap", "IAP / Identity-Aware<br>Proxy", 505, 268, 130, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Primary: Application Layer (GKE)
  text("p_app_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>APPLICATION LAYER (GKE)</span>", 225, 308, 410, 15, "align=center;");
  const pAppServices = ["API Gateway<br>(Apigee X)", "AI Copilot<br>Service", "RAG / Search<br>Service", "Workflow<br>Service", "Notification<br>Service", "User Service", "Document<br>Service", "Study Protocol<br>Service", "Safety / PV<br>Service", "Regulatory<br>Service"];
  for (let i = 0; i < 10; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const px = 225 + col * 82;
    const py = 325 + row * 38;
    rect(`p_app_${i}`, pAppServices[i], px, py, 78, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
  }

  // Primary: Data Layer
  text("p_data_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>DATA LAYER</span>", 225, 415, 410, 15, "align=center;");
  const pData = ["Cloud SQL<br>(PostgreSQL)", "AlloyDB<br>(Operational DB)", "MongoDB Atlas<br>(Documents)", "BigQuery<br>(Analytics)", "Vertex AI<br>Vector Search"];
  for (let i = 0; i < 5; i++) {
    rect(`p_data_${i}`, pData[i], 225 + i * 82, 432, 78, 38, "fillColor=#FFFFFF;strokeColor=#0284C7;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
  }

  // Primary: Platform Services
  text("p_plat_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>PLATFORM SERVICES</span>", 225, 485, 410, 15, "align=center;");
  const pPlat = ["Cloud Storage<br>(Artifacts / Files)", "Memorystore<br>(Redis Cache)", "Pub/Sub<br>(Messaging)", "Cloud Tasks<br>(Async Jobs)", "Secret Manager<br>(Secrets)"];
  for (let i = 0; i < 5; i++) {
    rect(`p_plat_${i}`, pPlat[i], 225 + i * 82, 502, 78, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
  }

  // DR REGION: us-east1 (Standby) (x: 870, y: 220, w: 430, h: 440)
  rect("dr_region_header", "<b style='color:#FFF;font-size:10px;'>DR REGION: us-east1 (Standby)</b>", 870, 220, 430, 24, "fillColor=#1D4ED8;strokeColor=#1D4ED8;rounded=0;arcSize=0;align=center;verticalAlign=middle;");
  rect("dr_region_body", "", 870, 244, 430, 416, "fillColor=#F8FAFC;strokeColor=#1D4ED8;strokeWidth=1.5;rounded=0;arcSize=0;");

  // DR: Edge & Security
  text("dr_edge_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>EDGE &amp; SECURITY</span>", 880, 250, 410, 15, "align=center;");
  rect("dr_cdn", "Cloud CDN", 880, 268, 125, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  rect("dr_armor", "Cloud Armor<br><span style='font-size:6.5px;color:#64748B;'>(Security Policies)</span>", 1015, 268, 135, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  rect("dr_iap", "IAP / Identity-Aware<br>Proxy", 1160, 268, 130, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // DR: Application Layer (GKE)
  text("dr_app_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>APPLICATION LAYER (GKE)</span>", 880, 308, 410, 15, "align=center;");
  for (let i = 0; i < 10; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const px = 880 + col * 82;
    const py = 325 + row * 38;
    rect(`dr_app_${i}`, pAppServices[i], px, py, 78, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
  }

  // DR: Data Layer (Standby / Replicated)
  text("dr_data_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>DATA LAYER (Standby / Replicated)</span>", 880, 415, 410, 15, "align=center;");
  const drData = ["Cloud SQL<br>(Read Replica)", "AlloyDB<br>(Read Replica)", "MongoDB Atlas<br>(DR Replica)", "BigQuery<br>(DR Dataset)", "Vertex AI<br>Vector Search<br>(Replicated)"];
  for (let i = 0; i < 5; i++) {
    rect(`dr_data_${i}`, drData[i], 880 + i * 82, 432, 78, 38, "fillColor=#FFFFFF;strokeColor=#0284C7;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  }

  // DR: Platform Services (DR)
  text("dr_plat_title", "<span style='font-size:8px;font-weight:900;color:#0F2A4A;'>PLATFORM SERVICES (DR)</span>", 880, 485, 410, 15, "align=center;");
  const drPlat = ["Cloud Storage<br>(Cross-Region)", "Memorystore<br>(Replica)", "Pub/Sub<br>(Replicated)", "Cloud Tasks<br>(Replicated)", "Secret Manager<br>(Replicated)"];
  for (let i = 0; i < 5; i++) {
    rect(`dr_plat_${i}`, drPlat[i], 880 + i * 82, 502, 78, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  }

  // CENTER INTER-REGION PILLARS (x: 665, w: 185)
  // Message / Event Bus Box
  const eventBusHtml = `<div style="padding:4px;text-align:center;">
    <div style="font-size:8px;font-weight:900;color:#C2410C;margin-bottom:2px;">MESSAGE / EVENT BUS</div>
    <div style="font-size:16px;">📡</div>
    <div style="font-size:7.5px;font-weight:700;color:#1E293B;">Pub/Sub<br><span style="font-size:6.5px;color:#64748B;">(Global Topic)</span></div>
  </div>`;
  rect("msg_event_bus", eventBusHtml, 675, 270, 165, 80, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // Data Replication Box
  const dataRepHtml = `<div style="padding:4px;text-align:center;">
    <div style="font-size:8px;font-weight:900;color:#C2410C;margin-bottom:4px;">DATA REPLICATION</div>
    <div style="font-size:7px;font-weight:700;color:#334155;line-height:1.4;">
      <div>🗄️ Cloud SQL Cross-Region</div>
      <div>⚡ AlloyDB Cross-Region</div>
      <div>📦 Cloud Storage Dual-Region</div>
      <div>📊 BigQuery Replication</div>
    </div>
  </div>`;
  rect("data_rep_box", dataRepHtml, 675, 380, 165, 175, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // Cross Region Connectors
  edge("e_p_bus", "", 645, 310, 675, 310, "#EA580C", true, "block");
  edge("e_bus_dr", "", 840, 310, 870, 310, "#EA580C", true, "block");
  edge("e_p_rep", "", 645, 450, 675, 450, "#EA580C", true, "block");
  edge("e_rep_dr", "", 840, 450, 870, 450, "#EA580C", true, "block");

  // SHARED INFRASTRUCTURE (ACROSS REGIONS) (y: 590, x: 215, w: 1085, h: 65)
  const sharedInfraHtml = `<div style="padding:4px;text-align:center;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">SHARED INFRASTRUCTURE (ACROSS REGIONS)</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7px;font-weight:700;color:#1E293B;">
      <div>🔌 VPC (Custom)</div>
      <div>🌐 Shared VPC Subnets</div>
      <div>⚙️ Cloud NAT</div>
      <div>🔗 Cloud Interconnect (HA)</div>
      <div>📈 Cloud Monitoring &amp; Logging</div>
      <div>🔍 Cloud Trace</div>
      <div>💾 Cloud Backup &amp; DR</div>
      <div>🛡️ Security Command Center</div>
    </div>
  </div>`;
  rect("shared_infra_bar", sharedInfraHtml, 215, 590, 1085, 65, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. RIGHT SIDEBAR: NETWORK, HA, MONITORING (x: 1330, w: 250)
  // =========================================================================
  // Card 1: NETWORK TOPOLOGY (y: 115, h: 220)
  const netTopoHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">NETWORK TOPOLOGY</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.4;">
      <div style="border:1px solid #93C5FD;background:#EFF6FF;padding:4px;border-radius:3px;margin-bottom:4px;text-align:center;"><b>VPC (Custom)</b></div>
      <div style="border:1px solid #CBD5E1;padding:3px;margin-bottom:3px;">🔒 Public Subnet (LB, NAT)</div>
      <div style="border:1px solid #CBD5E1;padding:3px;margin-bottom:3px;">🔒 Private Subnet - App (GKE)</div>
      <div style="border:1px solid #CBD5E1;padding:3px;margin-bottom:3px;">🔒 Private Subnet - Data (DBs)</div>
      <div style="border:1px solid #CBD5E1;padding:3px;">🌐 Cloud NAT / Egress Controls</div>
    </div>
  </div>`;
  rect("card_net_topo", netTopoHtml, 1330, 115, 250, 220, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: HIGH AVAILABILITY (y: 345, h: 180)
  const haHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">HIGH AVAILABILITY</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.5;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Multi-AZ GKE Node Pools</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Regional Persistent Disks</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Automatic Failover (Health Checks)</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Backup &amp; Point-in-Time Recovery</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>DR Drill &amp; Runbooks</span></div>
    </div>
  </div>`;
  rect("card_ha", haHtml, 1330, 345, 250, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: MONITORING & ALERTING (y: 535, h: 215)
  const monHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">MONITORING &amp; ALERTING</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="margin-bottom:4px;"><b>📊 Cloud Monitoring</b><br><span style="color:#64748B;">Metrics &amp; Dashboards</span></div>
      <div style="margin-bottom:4px;"><b>🔔 Alerting</b><br><span style="color:#64748B;">PagerDuty / Email / SMS</span></div>
      <div style="margin-bottom:4px;"><b>⏱️ SLOs &amp; Error Budgets</b></div>
      <div><b>📈 Performance &amp; Cost</b></div>
    </div>
  </div>`;
  rect("card_mon", monHtml, 1330, 535, 250, 215, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 5. BOTTOM 4 ANALYTICAL PANELS (y: 770, h: 180)
  // =========================================================================
  // Panel 1: DESIGN PRINCIPLES (x: 20, w: 230)
  const princHtml = `<div style="padding:6px 8px;">
    <div style="font-size:9px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">DESIGN PRINCIPLES</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Resilient by design (Multi-AZ + Multi-Region)</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Security &amp; compliance as a foundation</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Infrastructure as Code (Terraform)</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Automated CI/CD for all services</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Observability and proactive operations</span></div>
    </div>
  </div>`;
  rect("card_princ", princHtml, 20, 770, 230, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 2: TECHNOLOGY STACK (GCP) (x: 260, w: 320)
  const techGcpHtml = `<div style="padding:6px 8px;">
    <div style="font-size:9px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">TECHNOLOGY STACK (GCP)</div>
    <table style="width:100%;font-size:7.5px;color:#1E293B;line-height:1.4;">
      <tr><td style="font-weight:700;color:#64748B;width:95px;">Container Orch:</td><td>GKE (Autopilot)</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">API Mgmt:</td><td>Apigee X</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Databases:</td><td>Cloud SQL, AlloyDB, MongoDB</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Analytics:</td><td>BigQuery, Vertex AI Search</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Messaging:</td><td>Pub/Sub, Cloud Tasks</td></tr>
      <tr><td style="font-weight:700;color:#64748B;">Storage / Sec:</td><td>Cloud Storage, Cloud Armor</td></tr>
    </table>
  </div>`;
  rect("card_tech_gcp", techGcpHtml, 260, 770, 320, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 3: TRAFFIC FAILOVER FLOW (x: 590, w: 390)
  const failoverFlowHtml = `<div style="padding:6px 8px;">
    <div style="font-size:9px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;text-align:center;">TRAFFIC FAILOVER FLOW</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-size:7.5px;font-weight:700;margin-top:12px;">
      <div>👤 User Request</div>
      <span>➔</span>
      <div style="border:1px solid #0284C7;background:#EFF6FF;padding:4px 6px;border-radius:4px;">Traffic Director</div>
      <span>➔</span>
      <div>
        <div style="border:1px solid #16A34A;background:#F0FDF4;padding:3px 5px;border-radius:3px;margin-bottom:4px;color:#15803D;">Primary Healthy ➔ Route us-central1</div>
        <div style="border:1px solid #DC2626;background:#FEF2F2;padding:3px 5px;border-radius:3px;color:#B91C1C;">Primary Unhealthy ➔ Failover us-east1</div>
      </div>
    </div>
  </div>`;
  rect("card_failover_flow", failoverFlowHtml, 590, 770, 390, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 4: BACKUP & RECOVERY + ABBREVIATIONS (x: 990, w: 590)
  const backupAbbHtml = `<div style="padding:6px 8px;display:flex;gap:12px;">
    <div style="flex:1;">
      <div style="font-size:9px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">BACKUP &amp; RECOVERY</div>
      <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
        <div>💾 Automated Backups (Daily)</div>
        <div>⏱️ Point-in-Time Recovery (PITR)</div>
        <div>🌐 Cross-Region Replication</div>
        <div style="font-weight:900;color:#1D4ED8;margin-top:3px;">DR RPO: ≤ 15 mins | RTO: ≤ 1 hr</div>
      </div>
    </div>
    <div style="flex:1;border-left:1px solid #E2E8F0;padding-left:10px;">
      <div style="font-size:9px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">ABBREVIATIONS</div>
      <table style="width:100%;font-size:7px;color:#1E293B;line-height:1.4;">
        <tr><td style="font-weight:900;width:35px;">GKE</td><td>Google Kubernetes Engine</td></tr>
        <tr><td style="font-weight:900;">IAP</td><td>Identity-Aware Proxy</td></tr>
        <tr><td style="font-weight:900;">DR</td><td>Disaster Recovery</td></tr>
        <tr><td style="font-weight:900;">RPO</td><td>Recovery Point Objective</td></tr>
        <tr><td style="font-weight:900;">RTO</td><td>Recovery Time Objective</td></tr>
      </table>
    </div>
  </div>`;
  rect("card_backup_abb", backupAbbHtml, 990, 770, 590, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 6. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

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
