/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 19 — HA / DR ARCHITECTURE
 * 
 * 1:1 Ground-Truth Reproduction of images/19.png
 * "19 HA / DR Architecture | Use Case: NovaCura – High Availability & Disaster Recovery"
 * Active-Active / Active-Passive Resiliency across us-central1 and us-east1,
 * Cross-Region Data Replication, 6-Step Failover Flow, RTO/RPO Metrics, 4 Bottom Panels.
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate19HaDrArchitectureXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
    const labelStyle = label ? `fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.2;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_19", "<b style='font-size:24px;color:#FFFFFF;'>19</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">HA / DR Architecture</div>
    <div style="font-size:11px;font-weight:700;color:#475569;margin-top:2px;">Use Case: NovaCura – High Availability &amp; Disaster Recovery &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Primary: us-central1 &nbsp;|&nbsp; DR: us-east1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 850, 42, "align=left;verticalAlign=middle;");

  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">AI-Powered Regulatory Intelligence Platform</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // Objective Card (Top Right)
  const objHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:2px;">OBJECTIVE</div>
    <div style="font-size:7.5px;color:#334155;line-height:1.35;">Ensure continuous availability of NovaCura platform with high availability within a region and disaster recovery across regions with defined RTO and RPO targets.</div>
  </div>`;
  rect("card_obj", objHtml, 1140, 64, 440, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 2. PRIMARY REGION (us-central1) [ACTIVE] (x: 20, y: 140, w: 580, h: 470)
  // =========================================================================
  rect("primary_badge", "<b style='color:#FFF;font-size:9px;'>PRIMARY REGION (us-central1)</b>", 20, 140, 240, 24, "fillColor=#1D4ED8;strokeColor=#1D4ED8;align=center;verticalAlign=middle;");
  rect("primary_active_tag", "<b style='color:#15803D;font-size:8px;'>ACTIVE</b>", 270, 140, 70, 24, "fillColor=#F0FDF4;strokeColor=#16A34A;align=center;verticalAlign=middle;");

  rect("primary_box", "", 20, 168, 580, 442, "fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;rounded=1;");

  // Edge Tier
  text("p_edge_title", "<span style='font-size:7.5px;font-weight:900;color:#64748B;'>EDGE</span>", 25, 175, 50, 15, "align=left;");
  rect("p_edge_frame", "", 80, 175, 510, 70, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("p_cdn", "<div style='font-size:14px;'>⚡</div><div style='font-size:7px;font-weight:700;'>Cloud CDN</div>", 120, 185, 120, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_armor", "<div style='font-size:14px;'>🛡️</div><div style='font-size:7px;font-weight:700;'>Cloud Armor<br><span style='font-size:6px;color:#64748B;'>(WAF)</span></div>", 275, 185, 120, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_lb", "<div style='font-size:14px;'>⚖️</div><div style='font-size:7px;font-weight:700;'>Cloud Load<br>Balancing</div>", 430, 185, 120, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Application Layer
  text("p_app_title", "<span style='font-size:7.5px;font-weight:900;color:#64748B;'>APPLICATION<br>LAYER</span>", 25, 260, 55, 25, "align=left;");
  rect("p_app_frame", "", 80, 255, 510, 95, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("p_front", "<div style='font-size:14px;'>⚙️</div><div style='font-size:7px;font-weight:700;'>Frontend<br><span style='font-size:6px;color:#64748B;'>(GKE)</span></div>", 95, 268, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_back", "<div style='font-size:14px;'>⚙️</div><div style='font-size:7px;font-weight:700;'>Backend Services<br><span style='font-size:6px;color:#64748B;'>(GKE)</span></div>", 220, 268, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_ai", "<div style='font-size:14px;'>🧠</div><div style='font-size:7px;font-weight:700;'>AI/ML Services<br><span style='font-size:6px;color:#64748B;'>(Vertex AI)</span></div>", 345, 268, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_api", "<div style='font-size:14px;'>🔌</div><div style='font-size:7px;font-weight:700;'>API Gateway<br><span style='font-size:6px;color:#64748B;'>(Cloud Endpoints)</span></div>", 470, 268, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Data Layer
  text("p_data_title", "<span style='font-size:7.5px;font-weight:900;color:#64748B;'>DATA LAYER</span>", 25, 370, 55, 15, "align=left;");
  rect("p_data_frame", "", 80, 360, 510, 95, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("p_sql", "<div style='font-size:14px;'>🗄️</div><div style='font-size:7px;font-weight:700;'>Cloud SQL<br><span style='font-size:6px;color:#64748B;'>(Primary)</span></div>", 95, 373, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_bq", "<div style='font-size:14px;'>📊</div><div style='font-size:7px;font-weight:700;'>BigQuery<br><span style='font-size:6px;color:#64748B;'>(Primary)</span></div>", 220, 373, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_mem", "<div style='font-size:14px;'>⚡</div><div style='font-size:7px;font-weight:700;'>Memorystore<br><span style='font-size:6px;color:#64748B;'>(Redis)</span></div>", 345, 373, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_gcs", "<div style='font-size:14px;'>📦</div><div style='font-size:7px;font-weight:700;'>Cloud Storage<br><span style='font-size:6px;color:#64748B;'>(Regional)</span></div>", 470, 373, 105, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Platform Services
  text("p_plat_title", "<span style='font-size:7.5px;font-weight:900;color:#64748B;'>PLATFORM<br>SERVICES</span>", 25, 475, 55, 25, "align=left;");
  rect("p_plat_frame", "", 80, 465, 510, 85, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("p_iam", "<div style='font-size:14px;'>🛡️</div><div style='font-size:7px;font-weight:700;'>IAM</div>", 95, 475, 105, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_kms", "<div style='font-size:14px;'>🔑</div><div style='font-size:7px;font-weight:700;'>Cloud KMS</div>", 220, 475, 105, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_sm", "<div style='font-size:14px;'>🔒</div><div style='font-size:7px;font-weight:700;'>Secret Manager</div>", 345, 475, 105, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("p_mon", "<div style='font-size:14px;'>📑</div><div style='font-size:7px;font-weight:700;'>Cloud Monitoring<br>&amp; Logging</div>", 470, 475, 105, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // =========================================================================
  // 3. CENTER TRAFFIC ROUTING (x: 615, w: 120)
  // =========================================================================
  rect("c_lb", "<div style='font-size:16px;'>⚖️</div><div style='font-size:7px;font-weight:700;'>Global<br>HTTP(S)<br>Load Balancer</div>", 615, 220, 115, 75, "fillColor=#EFF6FF;strokeColor=#0284C7;align=center;verticalAlign=middle;");
  rect("c_dns", "<div style='font-size:16px;'>🌐</div><div style='font-size:7px;font-weight:700;'>Cloud DNS<br><span style='font-size:6px;color:#64748B;'>(Health Checks)</span></div>", 615, 335, 115, 75, "fillColor=#EFF6FF;strokeColor=#0284C7;align=center;verticalAlign=middle;");
  rect("c_failover", "<div style='font-size:7px;font-weight:900;'>Failover via<br>Traffic Director /<br>DNS</div>", 615, 445, 115, 65, "fillColor=#FFF7ED;strokeColor=#EA580C;align=center;verticalAlign=middle;");

  // Connectors from LB/DNS to Regions
  edge("e_lb_p", "", 615, 257, 590, 210, "#0284C7");
  edge("e_lb_dr", "", 730, 257, 755, 210, "#0284C7");

  // =========================================================================
  // 4. DR REGION (us-east1) [STANDBY] (x: 745, y: 140, w: 490, h: 470)
  // =========================================================================
  rect("dr_badge", "<b style='color:#FFF;font-size:9px;'>DR REGION (us-east1)</b>", 745, 140, 200, 24, "fillColor=#1D4ED8;strokeColor=#1D4ED8;align=center;verticalAlign=middle;");
  rect("dr_standby_tag", "<b style='color:#C2410C;font-size:8px;'>STANDBY</b>", 955, 140, 75, 24, "fillColor=#FFF7ED;strokeColor=#EA580C;align=center;verticalAlign=middle;");

  rect("dr_box", "", 745, 168, 490, 442, "fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;rounded=1;");

  // DR Edge
  rect("dr_edge_frame", "", 755, 175, 470, 70, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("dr_cdn", "<div style='font-size:14px;'>⚡</div><div style='font-size:7px;font-weight:700;'>Cloud CDN</div>", 770, 185, 105, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_armor", "<div style='font-size:14px;'>🛡️</div><div style='font-size:7px;font-weight:700;'>Cloud Armor<br><span style='font-size:6px;color:#64748B;'>(WAF)</span></div>", 895, 185, 105, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_lb", "<div style='font-size:14px;'>⚖️</div><div style='font-size:7px;font-weight:700;'>Cloud Load<br>Balancing</div>", 1020, 185, 105, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // DR Application Layer
  rect("dr_app_frame", "", 755, 255, 470, 95, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("dr_front", "<div style='font-size:14px;'>⚙️</div><div style='font-size:7px;font-weight:700;'>Frontend<br><span style='font-size:6px;color:#64748B;'>(GKE)</span></div>", 765, 268, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_back", "<div style='font-size:14px;'>⚙️</div><div style='font-size:7px;font-weight:700;'>Backend Services<br><span style='font-size:6px;color:#64748B;'>(GKE)</span></div>", 875, 268, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_ai", "<div style='font-size:14px;'>🧠</div><div style='font-size:7px;font-weight:700;'>AI/ML Services<br><span style='font-size:6px;color:#64748B;'>(Vertex AI)</span></div>", 985, 268, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_api", "<div style='font-size:14px;'>🔌</div><div style='font-size:7px;font-weight:700;'>API Gateway<br><span style='font-size:6px;color:#64748B;'>(Cloud Endpoints)</span></div>", 1095, 268, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // DR Data Layer
  rect("dr_data_frame", "", 755, 360, 470, 95, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("dr_sql", "<div style='font-size:14px;'>🗄️</div><div style='font-size:7px;font-weight:700;'>Cloud SQL<br><span style='font-size:6px;color:#64748B;'>(Standby)</span></div>", 765, 373, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_bq", "<div style='font-size:14px;'>📊</div><div style='font-size:7px;font-weight:700;'>BigQuery<br><span style='font-size:6px;color:#64748B;'>(Standby)</span></div>", 875, 373, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_mem", "<div style='font-size:14px;'>⚡</div><div style='font-size:7px;font-weight:700;'>Memorystore<br><span style='font-size:6px;color:#64748B;'>(Redis)</span></div>", 985, 373, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_gcs", "<div style='font-size:14px;'>📦</div><div style='font-size:7px;font-weight:700;'>Cloud Storage<br><span style='font-size:6px;color:#64748B;'>(Regional)</span></div>", 1095, 373, 95, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // DR Platform Services
  rect("dr_plat_frame", "", 755, 465, 470, 85, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  rect("dr_iam", "<div style='font-size:14px;'>🛡️</div><div style='font-size:7px;font-weight:700;'>IAM</div>", 765, 475, 95, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_kms", "<div style='font-size:14px;'>🔑</div><div style='font-size:7px;font-weight:700;'>Cloud KMS</div>", 875, 475, 95, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_sm", "<div style='font-size:14px;'>🔒</div><div style='font-size:7px;font-weight:700;'>Secret Manager</div>", 985, 475, 95, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_mon", "<div style='font-size:14px;'>📑</div><div style='font-size:7px;font-weight:700;'>Cloud Monitoring<br>&amp; Logging</div>", 1095, 475, 95, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // =========================================================================
  // 5. RIGHT SIDEBAR: RTO/RPO & STRATEGIES (x: 1250, w: 330)
  // =========================================================================
  // RTO / RPO Targets (y: 140, h: 110)
  const rtoHtml = `<div style="padding:4px;text-align:center;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">RTO / RPO TARGETS</div>
    <div style="display:flex;align-items:center;justify-content:space-around;">
      <div><div style="font-size:20px;">⏱️</div><div style="font-size:7.5px;font-weight:900;">RTO</div><div style="font-size:7px;color:#1D4ED8;font-weight:800;">≤ 1 Hour</div></div>
      <div><div style="font-size:20px;">⏱️</div><div style="font-size:7.5px;font-weight:900;">RPO</div><div style="font-size:7px;color:#1D4ED8;font-weight:800;">≤ 15 Minutes</div></div>
    </div>
  </div>`;
  rect("card_rto", rtoHtml, 1250, 140, 330, 110, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // HA Strategy
  const haStratHtml = `<div style="padding:6px;">
    <div style="font-size:8px;font-weight:900;color:#0284C7;margin-bottom:4px;">HA STRATEGY (WITHIN REGION)</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>✔ Multi-zone GKE node pools (3 zones)</div>
      <div>✔ Regional Cloud Load Balancing</div>
      <div>✔ Zonal Cloud SQL with auto-failover</div>
      <div>✔ Multi-zone Memorystore (Redis)</div>
      <div>✔ SLO-based auto-healing</div>
    </div>
  </div>`;
  rect("card_ha_strat", haStratHtml, 1250, 260, 330, 160, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=left;verticalAlign=top;");

  // DR Strategy
  const drStratHtml = `<div style="padding:6px;">
    <div style="font-size:8px;font-weight:900;color:#C2410C;margin-bottom:4px;">DR STRATEGY (CROSS-REGION)</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>✔ Cross-region asynchronous replication</div>
      <div>✔ Scheduled backups to DR region</div>
      <div>✔ Infrastructure as Code (Terraform)</div>
      <div>✔ Runbooks &amp; automated workflows</div>
      <div>✔ Regular DR drills &amp; validations</div>
    </div>
  </div>`;
  rect("card_dr_strat", drStratHtml, 1250, 430, 330, 180, "fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 6. MIDDLE STRIP: CROSS-REGION REPLICATION & FAILOVER FLOW (y: 620, h: 120)
  // =========================================================================
  // Cross-Region Data Replication
  const repHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:4px;text-align:center;">CROSS-REGION DATA REPLICATION &amp; BACKUP</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:6.5px;font-weight:700;">
      <div>🗄️ Cloud SQL<br><span style="color:#64748B;">Async Rep</span></div>
      <span>➔</span>
      <div>📊 BigQuery<br><span style="color:#64748B;">Cross-Region</span></div>
      <span>➔</span>
      <div>📦 Cloud Storage<br><span style="color:#64748B;">Dual-Region</span></div>
      <span>➔</span>
      <div>⚡ Memorystore<br><span style="color:#64748B;">Snapshots</span></div>
      <span>➔</span>
      <div>💾 Backups<br><span style="color:#64748B;">(GCS Bucket)</span></div>
      <span>➔</span>
      <div>🗄️ Archive<br><span style="color:#64748B;">Coldline</span></div>
    </div>
  </div>`;
  rect("card_cross_rep", repHtml, 20, 620, 770, 120, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // Failover Flow
  const failoverHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:4px;text-align:center;">FAILOVER FLOW</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:6.5px;font-weight:700;">
      <div>1. Failure<br>Detected</div>
      <span>➔</span>
      <div>2. Health Check<br>Fails</div>
      <span>➔</span>
      <div>3. Traffic Shift<br>(DNS / TD)</div>
      <span>➔</span>
      <div>4. DR Services<br>Activated</div>
      <span>➔</span>
      <div>5. Data Validated</div>
      <span>➔</span>
      <div>6. Operations<br>Resumed</div>
    </div>
  </div>`;
  rect("card_fail_flow", failoverHtml, 805, 620, 775, 120, "fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // =========================================================================
  // 7. BOTTOM PANELS (y: 755, h: 195)
  // =========================================================================
  // Panel 1: KEY BENEFITS (x: 20, w: 320)
  const benHdrHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">KEY BENEFITS</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>High availability within region with auto recovery</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Disaster recovery across region with defined RTO/RPO</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Minimal data loss with cross-region replication</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Resilient, fault-tolerant architecture</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Regular DR testing ensures audit readiness</span></div>
    </div>
  </div>`;
  rect("card_ben_hdr", benHdrHtml, 20, 755, 320, 195, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 2: TECHNOLOGIES (x: 350, w: 370)
  const techHdrHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;text-align:center;">TECHNOLOGIES</div>
    <table style="width:100%;text-align:center;font-size:7px;font-weight:700;color:#1E293B;">
      <tr>
        <td style="padding:2px;"><div style="font-size:14px;">⚙️</div>GKE</td>
        <td style="padding:2px;"><div style="font-size:14px;">🗄️</div>Cloud SQL</td>
        <td style="padding:2px;"><div style="font-size:14px;">📊</div>BigQuery</td>
        <td style="padding:2px;"><div style="font-size:14px;">📦</div>Cloud Storage</td>
      </tr>
      <tr>
        <td style="padding:2px;"><div style="font-size:14px;">⚡</div>Memorystore</td>
        <td style="padding:2px;"><div style="font-size:14px;">⚖️</div>Cloud LB</td>
        <td style="padding:2px;"><div style="font-size:14px;">🛡️</div>Cloud Armor</td>
        <td style="padding:2px;"><div style="font-size:14px;">🌐</div>Cloud DNS</td>
      </tr>
    </table>
  </div>`;
  rect("card_tech_hdr", techHdrHtml, 350, 755, 370, 195, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 3: BACKUP & RETENTION POLICY (x: 730, w: 380)
  const bkpPolicyHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">BACKUP &amp; RETENTION POLICY</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>💾 Daily Automated Backups</div>
      <div>⏱️ Point-in-Time Recovery (PITR)</div>
      <div>📅 Retention: 30 Days (Standard)</div>
      <div>📦 Archive Retention: 1 Year</div>
      <div>🔍 Backup Validation: Weekly</div>
    </div>
  </div>`;
  rect("card_bkp_pol", bkpPolicyHtml, 730, 755, 380, 195, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 4: NOTES (x: 1120, w: 460)
  const notesHdrHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">NOTES</div>
    <div style="font-size:7px;color:#334155;line-height:1.45;">
      <div>• DR region resources run in standby mode (minimal cost).</div>
      <div>• Failover can be manual or automated based on severity.</div>
      <div>• Regular DR drills: Quarterly.</div>
      <div>• All data encrypted at rest and in transit.</div>
      <div>• Complies with SOC 2, HIPAA, and ISO 27001.</div>
    </div>
  </div>`;
  rect("card_notes_hdr", notesHdrHtml, 1120, 755, 460, 195, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 8. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_19_ha_dr" name="Template 19: HA / DR Architecture">
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
