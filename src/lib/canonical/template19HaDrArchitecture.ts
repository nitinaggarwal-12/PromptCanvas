/**
 * Canonical Architecture Template 19: HA / DR Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/19.png
 */

export function generateTemplate19HaDrArchitectureXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
  rect("num_badge", "19", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>HA / DR Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – High Availability &amp; Disaster Recovery &nbsp;|&nbsp; Primary: us-central1 &nbsp;|&nbsp; DR: us-east1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Ensure continuous availability of NovaCura platform with high availability within a region and disaster recovery across regions with defined RTO and RPO targets.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. PRIMARY REGION (us-central1) (x=20..580, y=72..410)
  rect("box_primary", "", 20, 72, 560, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_primary", "<div style='font-size:10px;font-weight:800;'><span style='background:#1E3A8A;color:#FFF;padding:2px 6px;border-radius:2px;'>PRIMARY REGION (us-central1)</span> &nbsp; <span style='background:#16A34A;color:#FFF;padding:2px 6px;border-radius:2px;'>ACTIVE</span></div>", 20, 75, 560, 14, "strokeColor=none;fillColor=none;align=center;");

  // Primary 4 Tiers
  // Edge Tier
  rect("p_edge_lbl", "<span style='font-size:9px;font-weight:800;color:#64748B;'>EDGE</span>", 24, 96, 50, 60, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("p_cdn", "<div style='font-size:10px;'>⚡</div><div style='font-size:9px;font-weight:700;'>Cloud CDN</div>", 80, 96, 150, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("p_armor", "<div style='font-size:10px;'>🛡️</div><div style='font-size:9px;font-weight:700;'>Cloud Armor<br/><span style='color:#64748B;font-size:8px;'>(WAF)</span></div>", 240, 96, 150, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("p_lb", "<div style='font-size:10px;'>⚖️</div><div style='font-size:9px;font-weight:700;'>Cloud Load Balancing</div>", 400, 96, 170, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // App Tier
  rect("p_app_lbl", "<span style='font-size:9px;font-weight:800;color:#64748B;'>APPLICATION<br/>LAYER</span>", 24, 166, 50, 65, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("p_fe", "<div style='font-size:10px;'>💻</div><div style='font-size:9px;font-weight:700;'>Frontend<br/>(GKE)</div>", 80, 166, 115, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("p_be", "<div style='font-size:10px;'>⚙️</div><div style='font-size:9px;font-weight:700;'>Backend Services<br/>(GKE)</div>", 205, 166, 115, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("p_ai", "<div style='font-size:10px;'>🧠</div><div style='font-size:9px;font-weight:700;'>AI/ML Services<br/>(Vertex AI)</div>", 330, 166, 115, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("p_gw", "<div style='font-size:10px;'>🛡️</div><div style='font-size:9px;font-weight:700;'>API Gateway<br/>(Cloud Endpoints)</div>", 455, 166, 115, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // Data Tier
  rect("p_data_lbl", "<span style='font-size:9px;font-weight:800;color:#64748B;'>DATA LAYER</span>", 24, 241, 50, 65, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("p_sql", "<div style='font-size:10px;'>🗄️</div><div style='font-size:9px;font-weight:700;'>Cloud SQL<br/>(Primary)</div>", 80, 241, 115, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("p_bq", "<div style='font-size:10px;'>📊</div><div style='font-size:9px;font-weight:700;'>BigQuery<br/>(Primary)</div>", 205, 241, 115, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("p_redis", "<div style='font-size:10px;'>⚡</div><div style='font-size:9px;font-weight:700;'>Memorystore<br/>(Redis)</div>", 330, 241, 115, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("p_gcs", "<div style='font-size:10px;'>🗃️</div><div style='font-size:9px;font-weight:700;'>Cloud Storage<br/>(Regional)</div>", 455, 241, 115, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");

  // Platform Services Tier
  rect("p_plat_lbl", "<span style='font-size:9px;font-weight:800;color:#64748B;'>PLATFORM<br/>SERVICES</span>", 24, 316, 50, 65, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("p_iam", "<div style='font-size:10px;'>🛡️</div><div style='font-size:9px;font-weight:700;'>IAM</div>", 80, 316, 115, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("p_kms", "<div style='font-size:10px;'>🔑</div><div style='font-size:9px;font-weight:700;'>Cloud KMS</div>", 205, 316, 115, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("p_sec", "<div style='font-size:10px;'>🔒</div><div style='font-size:9px;font-weight:700;'>Secret Manager</div>", 330, 316, 115, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("p_log", "<div style='font-size:10px;'>📑</div><div style='font-size:9px;font-weight:700;'>Cloud Monitoring<br/>&amp; Logging</div>", 455, 316, 115, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 3. CENTER CHANNEL (x=590..730, y=72..410)
  rect("c_lb", "<div style='font-size:14px;'>🌐</div><div style='font-size:9px;font-weight:800;'>Global HTTP(S)<br/>Load Balancer</div>", 595, 96, 130, 75, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("c_dns", "<div style='font-size:14px;'>🔍</div><div style='font-size:9px;font-weight:800;'>Cloud DNS<br/><span style='color:#64748B;font-size:8px;'>(Health Checks)</span></div>", 595, 205, 130, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("c_failover", "<div style='font-size:9px;font-weight:800;color:#DC2626;'>Failover via<br/>Traffic Director / DNS</div>", 595, 315, 130, 65, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");

  // 4. DR REGION (us-east1) (x=740..1300, y=72..410)
  rect("box_dr", "", 740, 72, 560, 338, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;rounded=1;dashed=1;");
  rect("lbl_dr", "<div style='font-size:10px;font-weight:800;'><span style='background:#7C3AED;color:#FFF;padding:2px 6px;border-radius:2px;'>DR REGION (us-east1)</span> &nbsp; <span style='background:#D97706;color:#FFF;padding:2px 6px;border-radius:2px;'>STANDBY</span></div>", 740, 75, 560, 14, "strokeColor=none;fillColor=none;align=center;");

  // DR 4 Tiers
  rect("dr_cdn", "<div style='font-size:10px;'>⚡</div><div style='font-size:9px;font-weight:700;'>Cloud CDN</div>", 750, 96, 170, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_armor", "<div style='font-size:10px;'>🛡️</div><div style='font-size:9px;font-weight:700;'>Cloud Armor<br/><span style='color:#64748B;font-size:8px;'>(WAF)</span></div>", 930, 96, 170, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_lb", "<div style='font-size:10px;'>⚖️</div><div style='font-size:9px;font-weight:700;'>Cloud Load Balancing</div>", 1110, 96, 180, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  rect("dr_fe", "<div style='font-size:10px;'>💻</div><div style='font-size:9px;font-weight:700;'>Frontend<br/>(GKE)</div>", 750, 166, 130, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_be", "<div style='font-size:10px;'>⚙️</div><div style='font-size:9px;font-weight:700;'>Backend Services<br/>(GKE)</div>", 890, 166, 130, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_ai", "<div style='font-size:10px;'>🧠</div><div style='font-size:9px;font-weight:700;'>AI/ML Services<br/>(Vertex AI)</div>", 1030, 166, 130, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_gw", "<div style='font-size:10px;'>🛡️</div><div style='font-size:9px;font-weight:700;'>API Gateway<br/>(Cloud Endpoints)</div>", 1170, 166, 120, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");

  rect("dr_sql", "<div style='font-size:10px;'>🗄️</div><div style='font-size:9px;font-weight:700;'>Cloud SQL<br/>(Standby)</div>", 750, 241, 130, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_bq", "<div style='font-size:10px;'>📊</div><div style='font-size:9px;font-weight:700;'>BigQuery<br/>(Standby)</div>", 890, 241, 130, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_redis", "<div style='font-size:10px;'>⚡</div><div style='font-size:9px;font-weight:700;'>Memorystore<br/>(Redis)</div>", 1030, 241, 130, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_gcs", "<div style='font-size:10px;'>🗃️</div><div style='font-size:9px;font-weight:700;'>Cloud Storage<br/>(Regional)</div>", 1170, 241, 120, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");

  rect("dr_iam", "<div style='font-size:10px;'>🛡️</div><div style='font-size:9px;font-weight:700;'>IAM</div>", 750, 316, 130, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_kms", "<div style='font-size:10px;'>🔑</div><div style='font-size:9px;font-weight:700;'>Cloud KMS</div>", 890, 316, 130, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_sec", "<div style='font-size:10px;'>🔒</div><div style='font-size:9px;font-weight:700;'>Secret Manager</div>", 1030, 316, 130, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_log", "<div style='font-size:10px;'>📑</div><div style='font-size:9px;font-weight:700;'>Cloud Monitoring<br/>&amp; Logging</div>", 1170, 316, 120, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 5. FAR RIGHT: RTO/RPO TARGETS, HA & DR STRATEGY (x=1310..1560, y=72..410)
  rect("box_r_targets", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>RTO / RPO TARGETS</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;margin-top:6px;'><div>⏱️<br/><b>RTO</b><br/><span style='color:#16A34A;font-weight:800;'>≤ 1 Hour</span></div> <div>⏱️<br/><b>RPO</b><br/><span style='color:#D97706;font-weight:800;'>≤ 15 Minutes</span></div></div>", 1310, 72, 250, 72, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("box_r_ha_strat", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>HA STRATEGY (WITHIN REGION)</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>✔ Multi-zone GKE node pools (3 zones)<br/>✔ Regional Cloud Load Balancing<br/>✔ Zonal Cloud SQL with automatic failover<br/>✔ Multi-zone Memorystore (Redis)<br/>✔ SLO-based auto-healing &amp; self-monitoring</div>", 1310, 148, 250, 128, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_dr_strat", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;'>DR STRATEGY (CROSS-REGION)</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>✔ Cross-region asynchronous replication<br/>✔ Scheduled backups to DR region<br/>✔ Infrastructure as Code (Terraform)<br/>✔ Runbooks &amp; automated failover workflows<br/>✔ Regular DR drills &amp; validations</div>", 1310, 280, 250, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. MIDDLE STRIP: CROSS-REGION REPLICATION & FAILOVER FLOW (x=20..1560, y=416..540)
  rect("box_repl", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:4px;text-align:center;'>CROSS-REGION DATA REPLICATION &amp; BACKUP</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🗄️<br/><b>Cloud SQL</b><br/><span style='color:#64748B;font-size:8px;'>Cross-Region Async Rep</span></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📊<br/><b>BigQuery</b><br/><span style='color:#64748B;font-size:8px;'>Cross-Region Replication</span></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🗃️<br/><b>Cloud Storage</b><br/><span style='color:#64748B;font-size:8px;'>Dual-Region (US)</span></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⚡<br/><b>Memorystore</b><br/><span style='color:#64748B;font-size:8px;'>Persistence &amp; Snaps</span></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📦<br/><b>Backups</b><br/><span style='color:#64748B;font-size:8px;'>(GCS DR Bucket)</span></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📑<br/><b>Archive</b><br/><span style='color:#64748B;font-size:8px;'>(Coldline / Archive)</span></div></div>", 20, 416, 750, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("box_failover_flow", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;text-align:center;'>FAILOVER FLOW</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📉<br/><b>1. Failure<br/>Detected</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>❌<br/><b>2. Health Check<br/>Fails</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔄<br/><b>3. Traffic Shift<br/>(DNS / TD)</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⚙️<br/><b>4. DR Services<br/>Activated</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>✔<br/><b>5. Data Consistency<br/>Validated</b></div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:4px;'>🚀<br/><b>6. Operations<br/>Resumed</b></div></div>", 780, 416, 780, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // 7. BOTTOM ROW: BENEFITS, TECHNOLOGIES, BACKUP POLICY, NOTES (x=20..1560, y=546..740)
  rect("bot_benefits", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>✔ High availability within region with automatic recovery<br/>✔ Disaster recovery across region with defined RTO/RPO<br/>✔ Minimal data loss with cross-region replication<br/>✔ Resilient, fault-tolerant, and self-healing architecture<br/>✔ Regular DR testing ensures readiness and compliance</div>", 20, 546, 320, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_techs", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;text-align:center;'>TECHNOLOGIES</div><div style='font-size:9px;color:#0F172A;display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;text-align:center;margin-top:10px;'><div>⚙️<br/>GKE</div> <div>🗄️<br/>Cloud SQL</div> <div>📊<br/>BigQuery</div> <div>🗃️<br/>Cloud Storage</div> <div>⚡<br/>Memorystore</div> <div>⚖️<br/>Load Balancing</div> <div>🛡️<br/>Cloud Armor</div> <div>⚡<br/>Cloud CDN</div> <div>🔍<br/>Cloud DNS</div> <div>📑<br/>Monitoring</div></div>", 350, 546, 440, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("bot_backup", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>BACKUP &amp; RETENTION POLICY</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>📅 <b>Daily Automated Backups</b><br/>⏱️ <b>Point-in-Time Recovery (PITR)</b><br/>📦 <b>Retention: 30 Days (Standard)</b><br/>📑 <b>Archive Retention: 1 Year</b><br/>✔ <b>Backup Validation: Weekly</b></div>", 800, 546, 360, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:9px;line-height:1.4;color:#64748B;'>• DR region resources run in standby mode (minimal cost).<br/>• Failover can be manual or automated based on severity.<br/>• Regular DR drills: Quarterly.<br/>• All data encrypted at rest and in transit.<br/>• Complies with SOC 2, HIPAA, and ISO 27001.</div>", 1170, 546, 390, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_19_ha_dr_architecture" name="Template 19: HA / DR Architecture">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
