/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 16 — DEPLOYMENT DIAGRAM
 * 
 * 1:1 Ground-Truth Reproduction of images/16.png
 * "16 DEPLOYMENT DIAGRAM | NOVACURA – Enterprise AI Platform for Biopharma"
 * Multi-Zone GKE & Background Worker Mesh across Zone A/B/C in us-central1,
 * DR Standby in us-east1, CI/CD Pipeline, Environment Strategy, 4 Bottom Panels.
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate16DeploymentMeshXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
  rect("badge_16", "<b style='font-size:24px;color:#FFFFFF;'>16</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">DEPLOYMENT DIAGRAM</div>
    <div style="font-size:12px;font-weight:700;color:#475569;margin-top:2px;">NOVACURA – Enterprise AI Platform for Biopharma</div>
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

  // Scenario Card (Left)
  const scenarioHtml = `<div style="font-size:9.5px;color:#0F172A;font-weight:500;line-height:1.35;">
    Highly available, secure, and scalable deployment on Google Cloud across multi-zones in a primary region with DR in a secondary region.
  </div>`;
  rect("scenario_card", scenarioHtml, 20, 64, 700, 42, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;arcSize=4;align=left;spacingLeft=8;verticalAlign=middle;");

  // Top Legend (Right)
  const legendHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:16px;font-size:8px;font-weight:700;color:#334155;padding:4px;">
    <div>🟩 Compute</div>
    <div>🟪 Data Services</div>
    <div>🟦 Networking</div>
    <div>🛡️ Security</div>
  </div>`;
  rect("legend_top", legendHtml, 980, 64, 600, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT SIDEBAR: USERS & CLIENTS (x: 20, w: 155) & EDGE CONNECTIVITY (x: 185, w: 105)
  // =========================================================================
  const usersHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:8px;">USERS &amp; CLIENTS</div>
    <div style="font-size:7.5px;text-align:center;line-height:1.4;">
      <div style="margin-bottom:12px;"><div style="font-size:16px;">💻</div><b>Web Application</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:16px;">📱</div><b>Mobile Application</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:16px;">🤖</div><b>AI Copilot (Embedded)</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:16px;">🤝</div><b>Partner / 3rd Party</b></div>
      <div style="margin-bottom:12px;"><div style="font-size:16px;">👥</div><b>Scientists / Clinicians</b></div>
      <div><div style="font-size:16px;">🔌</div><b>API Clients</b></div>
    </div>
  </div>`;
  rect("card_users", usersHtml, 20, 130, 155, 620, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;");

  rect("edge_cdn", "<div style='font-size:16px;'>⚡</div><div style='font-size:7.5px;font-weight:700;'>Cloud CDN</div>", 185, 260, 95, 55, "fillColor=#FFFFFF;strokeColor=#0284C7;align=center;verticalAlign=middle;");
  rect("edge_armor", "<div style='font-size:16px;'>🛡️</div><div style='font-size:7px;font-weight:700;'>Cloud Armor<br><span style='font-size:6px;color:#64748B;'>(WAF / DDoS)</span></div>", 185, 360, 95, 60, "fillColor=#FFFFFF;strokeColor=#0284C7;align=center;verticalAlign=middle;");
  rect("edge_https", "<div style='font-size:16px;'>🌐</div><div style='font-size:7px;font-weight:700;'>External HTTPS<br><span style='font-size:6px;color:#64748B;'>(global anycast)</span></div>", 185, 480, 95, 60, "fillColor=#FFFFFF;strokeColor=#0284C7;align=center;verticalAlign=middle;");

  edge("e_users_cdn", "", 175, 287, 185, 287, "#0F172A");
  edge("e_cdn_armor", "", 232, 315, 232, 360, "#0F172A");
  edge("e_armor_https", "", 232, 420, 232, 480, "#0F172A");

  // =========================================================================
  // 3. CENTER PRIMARY REGION (us-central1) (x: 290, y: 130, w: 680, h: 650)
  // =========================================================================
  rect("primary_frame", "", 290, 130, 680, 650, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;arcSize=2;");
  text("primary_title", "<span style='font-size:9.5px;font-weight:900;color:#0284C7;'>GOOGLE CLOUD – PRIMARY REGION (us-central1)</span>", 305, 138, 500, 20, "align=left;");

  // Load Balancers
  rect("gl_lb", "<div style='font-size:7.5px;font-weight:700;'>⚖️ Global HTTP(S) Load Balancer</div>", 310, 165, 640, 26, "fillColor=#EFF6FF;strokeColor=#93C5FD;align=center;verticalAlign=middle;");
  rect("il_lb", "<div style='font-size:7.5px;font-weight:700;'>⚖️ Internal HTTP(S) Load Balancer</div>", 310, 200, 640, 26, "fillColor=#EFF6FF;strokeColor=#93C5FD;align=center;verticalAlign=middle;");

  // 3 Zones: ZONE A, ZONE B, ZONE C
  const zones = [
    { name: "ZONE A (us-central1-a)", x: 310 },
    { name: "ZONE B (us-central1-b)", x: 525 },
    { name: "ZONE C (us-central1-c)", x: 740 },
  ];

  zones.forEach((z, idx) => {
    rect(`zone_${idx}_frame`, "", z.x, 235, 210, 250, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;arcSize=2;");
    text(`zone_${idx}_title`, `<span style='font-size:7.5px;font-weight:900;color:#0F2A4A;'>${z.name}</span>`, z.x, 240, 210, 15, "align=center;");

    // Application Tier (GKE Autopilot)
    rect(`z_${idx}_app_tier`, "", z.x + 5, 260, 200, 105, "fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;rounded=1;");
    text(`z_${idx}_app_title`, "<span style='font-size:7px;font-weight:900;color:#15803D;'>⚙️ Application Tier (GKE Autopilot)</span>", z.x + 10, 264, 190, 15, "align=left;");
    rect(`z_${idx}_svc_1`, "AI Copilot<br>Service", z.x + 10, 282, 58, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=6.5;align=center;verticalAlign=middle;");
    rect(`z_${idx}_svc_2`, "API Gateway<br>Service", z.x + 74, 282, 60, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=6.5;align=center;verticalAlign=middle;");
    rect(`z_${idx}_svc_3`, "Business<br>Services", z.x + 140, 282, 60, 32, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=6.5;align=center;verticalAlign=middle;");

    // Background / Worker Tier (Cloud Run Jobs)
    rect(`z_${idx}_worker_tier`, "", z.x + 5, 375, 200, 100, "fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;rounded=1;");
    text(`z_${idx}_worker_title`, "<span style='font-size:7px;font-weight:900;color:#15803D;'>⚡ Background / Worker Tier (Cloud Run)</span>", z.x + 10, 379, 190, 15, "align=left;");
    const workerText = `<div style="font-size:6.5px;color:#334155;line-height:1.4;">
      <div>• Ingestion Workers</div>
      <div>• RAG / Embedding Jobs</div>
      <div>• Batch Processing</div>
    </div>`;
    text(`z_${idx}_worker_list`, workerText, z.x + 15, 396, 180, 75, "align=left;");
  });

  // Data Tier (Regional) (y: 495, h: 90)
  rect("data_tier_frame", "", 310, 495, 640, 95, "fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.2;rounded=1;");
  text("data_tier_title", "<span style='font-size:7.5px;font-weight:900;color:#7C3AED;'>🗄️ Data Tier (Regional)</span>", 320, 500, 400, 15, "align=left;");
  const dataItems = [
    { title: "AlloyDB", sub: "(PostgreSQL)" },
    { title: "Cloud SQL", sub: "(MySQL)" },
    { title: "MongoDB Atlas", sub: "(Doc Store)" },
    { title: "Redis", sub: "(Memorystore)" },
    { title: "BigQuery", sub: "(Warehouse)" },
    { title: "Vertex AI Vector", sub: "Search Engine" },
  ];
  dataItems.forEach((d, i) => {
    rect(`data_item_${i}`, `<div style='font-size:7px;font-weight:900;'>${d.title}</div><div style='font-size:6px;color:#64748B;'>${d.sub}</div>`, 318 + i * 105, 520, 100, 55, "fillColor=#FFFFFF;strokeColor=#D8B4FE;align=center;verticalAlign=middle;");
  });

  // Shared Services (y: 600, h: 70)
  rect("shared_services_frame", "", 310, 600, 640, 70, "fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;rounded=1;");
  text("shared_services_title", "<span style='font-size:7.5px;font-weight:900;color:#1D4ED8;'>Shared Services</span>", 320, 604, 400, 15, "align=left;");
  const sharedItems = ["📦 Cloud Storage<br>(Artifacts/Files)", "🔒 Secret Manager<br>(Secrets)", "🔑 Cloud KMS<br>(Encryption Keys)", "📑 Cloud Logging<br>&amp; Monitoring", "📡 Pub/Sub<br>(Messaging)", "⚙️ Workflows<br>(Orchestration)"];
  sharedItems.forEach((s, i) => {
    rect(`shared_item_${i}`, s, 318 + i * 105, 620, 100, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  });

  // Network Foundation (y: 680, h: 40)
  rect("net_found_frame", "", 310, 680, 640, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;");
  text("net_found_text", "<span style='font-size:7px;font-weight:700;color:#334155;'>Network Foundation: &nbsp; 🔌 VPC (10.0.0.0/16) &nbsp;|&nbsp; 🔒 Subnets (Private) &nbsp;|&nbsp; 🌐 Cloud NAT &nbsp;|&nbsp; ⚡ Private Google Access &nbsp;|&nbsp; 🛡️ VPC Service Controls &nbsp;|&nbsp; 🧱 Firewall Rules</span>", 315, 685, 630, 30, "align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. DR REGION (us-east1) (x: 990, y: 170, w: 200, h: 500)
  // =========================================================================
  rect("dr_frame", "", 990, 170, 200, 500, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=5 3;rounded=1;");
  text("dr_title", "<span style='font-size:8.5px;font-weight:900;color:#0284C7;'>☁️ DR REGION (us-east1)</span>", 990, 178, 200, 15, "align=center;");

  rect("dr_gke", "<div style='font-size:16px;'>⚙️</div><div style='font-size:7.5px;font-weight:900;'>GKE Autopilot</div><div style='font-size:6.5px;color:#64748B;'>(Standby)</div>", 1005, 205, 170, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_run", "<div style='font-size:16px;'>⚡</div><div style='font-size:7.5px;font-weight:900;'>Cloud Run Jobs</div><div style='font-size:6.5px;color:#64748B;'>(Standby)</div>", 1005, 285, 170, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("dr_data", "<div style='font-size:7.5px;font-weight:900;color:#7C3AED;margin-bottom:3px;'>Data Tier (Replicated)</div><div style='font-size:6.5px;color:#334155;line-height:1.35;'>• AlloyDB Cross-Region<br>• Cloud Storage Dual-Region<br>• BigQuery Cross-Region<br>• MongoDB Atlas Global</div>", 1005, 365, 170, 95, "fillColor=#FAF5FF;strokeColor=#D8B4FE;align=left;spacingLeft=6;verticalAlign=top;");
  rect("dr_shared", "<div style='font-size:16px;'>🛡️</div><div style='font-size:7.5px;font-weight:900;'>Shared Services</div><div style='font-size:6.5px;color:#64748B;'>(Standby)</div>", 1005, 475, 170, 65, "fillColor=#EFF6FF;strokeColor=#93C5FD;align=center;verticalAlign=middle;");

  // Sync arrow between Primary and DR
  edge("e_sync_dr", "Async Replication\n& DR Sync", 970, 370, 990, 370, "#0F172A", true, "block");

  // =========================================================================
  // 5. RIGHT SIDEBAR: NOTES, SCALING, SECURITY (x: 1210, w: 370)
  // =========================================================================
  // Card 1: DEPLOYMENT NOTES (y: 130, h: 220)
  const depNotesHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">DEPLOYMENT NOTES</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div>• Primary active region: us-central1</div>
      <div>• 3 AZs for high availability</div>
      <div>• GKE Autopilot for application tier</div>
      <div>• Cloud Run Jobs for elastic background processing</div>
      <div>• Data tier with managed services and cross-region replication</div>
      <div>• DR region in us-east1 (warm standby)</div>
      <div>• All traffic over HTTPS / TLS 1.2+</div>
      <div>• Infrastructure as Code (Terraform)</div>
    </div>
  </div>`;
  rect("card_dep_notes", depNotesHtml, 1210, 130, 370, 220, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: SCALING STRATEGY (y: 360, h: 180)
  const scalingHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">SCALING STRATEGY</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="font-size:14px;">⚙️</span><span>Horizontal Pod Autoscaler (GKE)</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="font-size:14px;">⚡</span><span>Cloud Run concurrency scaling</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="font-size:14px;">📡</span><span>Pub/Sub driven event scaling</span></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="font-size:14px;">📊</span><span>BigQuery autoscaling</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">⚡</span><span>Memorystore Redis Cluster Mode</span></div>
    </div>
  </div>`;
  rect("card_scaling", scalingHtml, 1210, 360, 370, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: SECURITY CONTROLS (y: 550, h: 200)
  const secHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">SECURITY CONTROLS</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>IAM least privilege access</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>VPC Service Controls</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Encryption in transit &amp; at rest</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Secrets in Secret Manager</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Cloud Armor for WAF &amp; DDoS</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Audit logs in Cloud Logging</span></div>
    </div>
  </div>`;
  rect("card_sec_ctrls", secHtml, 1210, 550, 370, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 6. BOTTOM PANELS (y: 770, h: 175)
  // =========================================================================
  // Panel 1: DEPLOYMENT TOOLS (x: 20, w: 230)
  const toolsHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:8px;text-align:center;">DEPLOYMENT TOOLS</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7px;font-weight:700;">
      <div><div style="font-size:16px;">🔧</div>Terraform<br><span style="font-size:6px;color:#64748B;">(IaC)</span></div>
      <div><div style="font-size:16px;">🔨</div>Cloud Build<br><span style="font-size:6px;color:#64748B;">(CI/CD)</span></div>
      <div><div style="font-size:16px;">📦</div>Artifact Registry<br><span style="font-size:6px;color:#64748B;">(Containers)</span></div>
    </div>
  </div>`;
  rect("card_dep_tools", toolsHtml, 20, 770, 230, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 2: CI/CD PIPELINE (HIGH LEVEL) (x: 260, w: 500)
  const cicdHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:8px;text-align:center;">CI/CD PIPELINE (HIGH LEVEL)</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7px;font-weight:700;">
      <div><div style="font-size:16px;">💻</div>Code Commit<br><span style="font-size:6px;color:#64748B;">(Cloud Source Repos)</span></div>
      <span>➔</span>
      <div><div style="font-size:16px;">🔨</div>Build<br><span style="font-size:6px;color:#64748B;">(Cloud Build)</span></div>
      <span>➔</span>
      <div><div style="font-size:16px;">🛡️</div>Scan<br><span style="font-size:6px;color:#64748B;">(Artifact Analysis)</span></div>
      <span>➔</span>
      <div><div style="font-size:16px;">📦</div>Push Image<br><span style="font-size:6px;color:#64748B;">(Artifact Registry)</span></div>
      <span>➔</span>
      <div><div style="font-size:16px;">🚀</div>Deploy<br><span style="font-size:6px;color:#64748B;">(GKE / Cloud Run)</span></div>
    </div>
  </div>`;
  rect("card_cicd_high", cicdHtml, 260, 770, 500, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 3: MONITORING & OBSERVABILITY (x: 770, w: 380)
  const obsHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:8px;text-align:center;">MONITORING &amp; OBSERVABILITY</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7px;font-weight:700;">
      <div><div style="font-size:16px;">📊</div>Cloud Monitoring<br><span style="font-size:6px;color:#64748B;">(Metrics)</span></div>
      <div><div style="font-size:16px;">📑</div>Cloud Logging<br><span style="font-size:6px;color:#64748B;">(Logs)</span></div>
      <div><div style="font-size:16px;">🔍</div>Cloud Trace<br><span style="font-size:6px;color:#64748B;">(Tracing)</span></div>
      <div><div style="font-size:16px;">🔔</div>Alerting<br><span style="font-size:6px;color:#64748B;">(PagerDuty)</span></div>
    </div>
  </div>`;
  rect("card_obs_high", obsHtml, 770, 770, 380, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 4: ENVIRONMENT STRATEGY (x: 1160, w: 420)
  const envHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:8px;text-align:center;">ENVIRONMENT STRATEGY</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7.5px;font-weight:900;margin-bottom:10px;">
      <div style="border:1px solid #16A34A;background:#F0FDF4;padding:4px 8px;border-radius:3px;color:#15803D;">DEV</div>
      <div style="border:1px solid #D97706;background:#FFFBEB;padding:4px 8px;border-radius:3px;color:#B45309;">TEST</div>
      <div style="border:1px solid #2563EB;background:#EFF6FF;padding:4px 8px;border-radius:3px;color:#1D4ED8;">STAGE</div>
      <div style="border:1px solid #DC2626;background:#FEF2F2;padding:4px 8px;border-radius:3px;color:#B91C1C;">PROD</div>
    </div>
    <div style="font-size:7px;color:#475569;text-align:center;">• Separate Projects &nbsp;|&nbsp; • Separate VPCs &nbsp;|&nbsp; • Separate Data &nbsp;|&nbsp; • Separate IAM</div>
  </div>`;
  rect("card_env_strat", envHtml, 1160, 770, 420, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 7. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_16_deployment_mesh" name="Template 16: Deployment Diagram">
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
