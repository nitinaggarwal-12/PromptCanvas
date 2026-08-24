/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 16: Deployment Architecture
 * Matches 100% of images/16.png:
 * - Header with Badge "16" and Title "DEPLOYMENT ARCHITECTURE"
 * - Left: Users & Clients (6 categories) + Ingress Stack (Cloud CDN, Cloud Armor, External HTTPS Anycast)
 * - Center: Primary Region (us-central1) with Global & Internal LB, 3 Multi-Zone columns (GKE Autopilot, Cloud Run Jobs), Regional Data Tier, Shared Services, Network Foundation
 * - Right: DR Region (us-east1) with Standby GKE, Cloud Run, Replicated Data Tier, Shared Services
 * - Right Sidebar: Deployment Notes, Scaling Strategy, Security Controls
 * - Bottom Row: Deployment Tools, CI/CD Pipeline (5 connected steps), Monitoring & Observability, Environment Strategy
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate16DeploymentMeshXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "16", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>DEPLOYMENT ARCHITECTURE</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;margin-top:2px;'>NOVACURA – Enterprise AI Platform for Biopharma</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">Transforming Therapies. Improving Lives.</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 1140, 12, 380, 54, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Sub-Banner Objective (x=16, y=74, w=760, h=40)
  const objHtml = `<div style='white-space:normal;word-break:break-word;font-size:10.5px;color:#1E3A8A;font-weight:700;line-height:1.3;'>Highly available, secure, and scalable deployment on Google Cloud across multi-zones in a primary region with DR in a secondary region.</div>`;
  cell("hdr_obj", objHtml, 16, 74, 760, 40, "overflow=hidden;whiteSpace=wrap;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // Top Legend Pills (x=970, y=74, w=550, h=40)
  const legPillsHtml = `<div style="font-size:10px;display:flex;justify-content:space-around;align-items:center;padding:4px;">
    <span><span style="color:#16A34A;font-size:14px;">🟩</span> <b>Compute</b></span>
    <span><span style="color:#7C3AED;font-size:14px;">🟪</span> <b>Data Services</b></span>
    <span><span style="color:#2563EB;font-size:14px;">🟦</span> <b>Networking</b></span>
    <span><span style="color:#D97706;font-size:14px;">🛡️</span> <b>Security</b></span>
  </div>`;
  cell("hdr_leg_pills", legPillsHtml, 970, 74, 550, 40, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");

  // ==================== 2. LEFT: USERS & CLIENTS + INGRESS (x=16..290, y=124..770) ====================
  // Users & Clients Box (w=150, h=646)
  cell("box_users", "", 16, 124, 150, 646, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.8;");
  cell("lbl_users", "USERS &amp; CLIENTS", 16, 124, 150, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");

  const clients = [
    { id: "u_web", t: "Web Application", icon: "💻" },
    { id: "u_mob", t: "Mobile Application", icon: "📱" },
    { id: "u_copilot", t: "AI Copilot<br/>(Embedded)", icon: "🧠" },
    { id: "u_part", t: "Partner / 3rd Party<br/>Applications", icon: "🏢" },
    { id: "u_sci", t: "Scientists /<br/>Clinicians / QA", icon: "🔬" },
    { id: "u_api", t: "API Clients<br/>(Postman etc.)", icon: "🔌" }
  ];
  clients.forEach((cl, idx) => {
    const cy = 160 + idx * 100;
    cell(cl.id, `<div style="font-size:22px;text-align:center;">${cl.icon}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:4px;">${cl.t}</div>`, 24, cy, 134, 88, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=4;");
  });

  // Ingress Stack (x=176, y=280, w=110, h=330)
  cell("box_ingress", "", 176, 280, 110, 330, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_ingress", "INGRESS", 176, 280, 110, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  cell("ing_cdn", "<div style='font-size:20px;text-align:center;'>⚡</div><div style='font-size:8px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Cloud CDN</div>", 184, 310, 94, 76, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("ing_armor", "<div style='font-size:20px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Armor<br/>(WAF / DDoS)</div>", 184, 396, 94, 86, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("ing_anycast", "<div style='font-size:20px;text-align:center;'>🌐</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>External HTTPS<br/>(global anycast)</div>", 184, 492, 94, 108, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Pure 0° Horizontal edge: AI Copilot -> Cloud CDN
  edge("e_u_to_cdn", "u_copilot", "ing_cdn", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  // Pure 90° Vertical edges inside Ingress
  edge("e_cdn_armor", "ing_cdn", "ing_armor", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_armor_anycast", "ing_armor", "ing_anycast", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // ==================== 3. CENTER: PRIMARY REGION (us-central1) (x=296..1036, y=124..770, w=740, h=646) ====================
  cell("box_primary_reg", "", 296, 124, 740, 646, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_primary_reg", "GOOGLE CLOUD – PRIMARY REGION (us-central1)", 296, 128, 740, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#2563EB;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Global & Internal Load Balancers
  cell("node_glb", "<div style='font-size:8.5px;font-weight:800;color:#1E40AF;'>🌐 &nbsp; Global HTTP(S) Load Balancer</div>", 310, 150, 712, 28, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;");
  cell("node_ilb", "<div style='font-size:8.5px;font-weight:800;color:#1E40AF;'>⚙️ &nbsp; Internal HTTP(S) Load Balancer</div>", 310, 184, 712, 28, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;");

  // Pure 0° / 90° Orthogonal edge from Ingress Anycast up to Global LB (zero diagonal)
  edge("e_ing_to_glb", "ing_anycast", "node_glb", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  // Pure 90° Vertical edge: Global LB -> Internal LB
  edge("e_glb_ilb", "node_glb", "node_ilb", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // 3 Multi-Zone Columns (ZONE A, ZONE B, ZONE C)
  const zones = [
    { id: "za", name: "ZONE A (us-central1-a)", x: 310, entryFrac: 0.16 },
    { id: "zb", name: "ZONE B (us-central1-b)", x: 550, entryFrac: 0.50 },
    { id: "zc", name: "ZONE C (us-central1-c)", x: 790, entryFrac: 0.84 }
  ];

  zones.forEach((zn, idx) => {
    // Zone Header
    cell(`lbl_zn_${zn.id}`, zn.name, zn.x, 218, 232, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

    // Application Tier (GKE Autopilot)
    cell(`box_app_${zn.id}`, "", zn.x, 238, 232, 106, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;");
    cell(`lbl_app_${zn.id}`, "⚙️ Application Tier<br/>(GKE Autopilot)", zn.x, 240, 232, 24, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
    
    // 3 Sub-services inside GKE
    cell(`gke_s1_${zn.id}`, "AI Copilot<br/>Service", zn.x + 8, 272, 68, 64, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");
    cell(`gke_s2_${zn.id}`, "API Gateway<br/>Service", zn.x + 82, 272, 68, 64, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");
    cell(`gke_s3_${zn.id}`, "Business<br/>Services", zn.x + 156, 272, 68, 64, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");

    // Background / Worker Tier (Cloud Run Jobs)
    cell(`box_worker_${zn.id}`, "", zn.x, 352, 232, 114, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;");
    cell(`lbl_worker_${zn.id}`, "⚡ Background / Worker Tier<br/>(Cloud Run Jobs)", zn.x, 354, 232, 24, "text;html=1;strokeColor=none;fillColor=none;fontColor=#2563EB;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
    
    const workerBullets = `<div style="font-size:7.5px;line-height:1.4;color:#0F172A;padding:4px 8px;">
      • Ingestion Workers<br/>
      • RAG / Embedding Jobs<br/>
      • Batch Processing
    </div>`;
    cell(`txt_worker_${zn.id}`, workerBullets, zn.x + 8, 384, 216, 74, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

    // Pure 90° Vertical edges: ILB -> App Tier -> Worker Tier
    edge(`e_ilb_${zn.id}`, "node_ilb", `box_app_${zn.id}`, `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=${zn.entryFrac};exitY=1;entryX=0.5;entryY=0;`);
    edge(`e_app_w_${zn.id}`, `box_app_${zn.id}`, `box_worker_${zn.id}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.2;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  });

  // Regional Data Tier (y=474, h=106, w=712)
  cell("box_data_tier", "", 310, 474, 712, 106, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_data_tier", "🗄️ Data Tier (Regional)", 310, 476, 712, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const dbCards = [
    { id: "db_alloy", t: "AlloyDB<br/>(PostgreSQL)", icon: "🗄️", w: 110 },
    { id: "db_mysql", t: "Cloud SQL<br/>(MySQL)", icon: "🐬", w: 110 },
    { id: "db_mongo", t: "MongoDB Atlas<br/>(Doc Store)", icon: "🍃", w: 110 },
    { id: "db_redis", t: "Redis<br/>(Memorystore)", icon: "⚡", w: 110 },
    { id: "db_bq", t: "BigQuery<br/>(Warehouse)", icon: "📊", w: 110 },
    { id: "db_vertex", t: "Vertex AI Vector<br/>Search (Matching)", icon: "🧠", w: 126 }
  ];
  let curDbX = 318;
  dbCards.forEach((db, idx) => {
    cell(db.id, `<div style="font-size:16px;text-align:center;">${db.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${db.t}</div>`, curDbX, 498, db.w, 74, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    curDbX += db.w + 6;
  });

  // Pure 90° Vertical Drop-Lines: Worker Tiers -> Data Tier
  zones.forEach((zn) => {
    edge(`e_w_data_${zn.id}`, `box_worker_${zn.id}`, "box_data_tier", `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=${zn.entryFrac};entryY=0;`);
  });

  // Shared Services Bar (y=588, h=72, w=712)
  cell("box_shared_svc", "", 310, 588, 712, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_shared_svc", "Shared Services", 310, 590, 712, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=left;spacingLeft=8;");
  
  const sharedItems = [
    { t: "Cloud Storage<br/>(Artifacts / Files)", icon: "🗃️" },
    { t: "Secret Manager<br/>(Secrets)", icon: "🔒" },
    { t: "Cloud KMS<br/>(Encryption Keys)", icon: "🔑" },
    { t: "Cloud Logging<br/>&amp; Monitoring", icon: "📑" },
    { t: "Pub/Sub<br/>(Messaging)", icon: "⚡" },
    { t: "Workflows<br/>(Orchestration)", icon: "⚙️" }
  ];
  sharedItems.forEach((sh, idx) => {
    const sx = 318 + idx * 116;
    cell(`sh_${idx}`, `<div style="font-size:7px;font-weight:700;color:#0F172A;text-align:center;">${sh.icon} ${sh.t}</div>`, sx, 608, 112, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Pure 90° Vertical edge: Data Tier <-> Shared Services
  edge("e_data_shared", "box_data_tier", "box_shared_svc", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // Network Foundation Bar (y=668, h=92, w=712)
  cell("box_net_found", "", 310, 668, 712, 92, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_net_found", "Network Foundation", 310, 670, 712, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=left;spacingLeft=8;");
  
  const netFoundItems = [
    { t: "VPC (10.0.0.0/16)", icon: "🌐" },
    { t: "Subnets (Private)", icon: "🔒" },
    { t: "Cloud NAT", icon: "⚡" },
    { t: "Private Google Access", icon: "🛡️" },
    { t: "VPC Service Controls", icon: "🔐" },
    { t: "Firewall Rules", icon: "🧱" }
  ];
  netFoundItems.forEach((nf, idx) => {
    const nx = 318 + idx * 116;
    cell(`nf_${idx}`, `<div style="font-size:7.5px;font-weight:700;color:#0F172A;text-align:center;">${nf.icon} ${nf.t}</div>`, nx, 692, 112, 60, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Pure 90° Vertical edge: Shared Services <-> Network Foundation
  edge("e_shared_net", "box_shared_svc", "box_net_found", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // ==================== 4. DR REGION (us-east1) (x=1046..1236, y=124..770, w=190, h=646) ====================
  cell("box_dr_reg", "", 1046, 124, 190, 646, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;");
  cell("lbl_dr_reg", "☁️ DR REGION (us-east1)", 1046, 128, 190, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#2563EB;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  cell("dr_gke", "<div style='font-size:22px;text-align:center;'>⚙️</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:4px;'>GKE Autopilot</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>(Standby)</div>", 1056, 160, 170, 96, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#16A34A;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("dr_cloud_run", "<div style='font-size:22px;text-align:center;'>⚡</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:4px;'>Cloud Run Jobs</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>(Standby)</div>", 1056, 276, 170, 96, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;html=1;align=center;verticalAlign=middle;padding=4;");
  
  const drDataHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px;">
    <div style="font-weight:800;color:#7C3AED;margin-bottom:2px;">Data Tier (Replicated)</div>
    • AlloyDB (Cross-region Read Replicas)<br/>
    • Cloud Storage (Dual-region)<br/>
    • BigQuery (Cross-region Replication)<br/>
    • MongoDB Atlas (Global Cluster)
  </div>`;
  cell("dr_data", drDataHtml, 1056, 392, 170, 150, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;html=1;align=left;verticalAlign=top;padding=4;");

  cell("dr_shared", "<div style='font-size:22px;text-align:center;'>🛡️</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:4px;'>Shared Services</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>(Standby)</div>", 1056, 560, 170, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

  // Pure 0° / 180° Horizontal replication arrow between Primary and DR
  edge("e_dr_sync", "box_primary_reg", "box_dr_reg", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;endArrow=classic;startArrow=classic;endSize=4;startSize=4;exitX=1;exitY=0.45;entryX=0;entryY=0.45;");

  // ==================== 5. RIGHT SIDEBAR (x=1246..1520, y=124..770, w=274, h=646) ====================
  // 1. Deployment Notes
  cell("box_notes", "", 1246, 124, 274, 210, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;");
  cell("lbl_notes", "DEPLOYMENT NOTES", 1246, 124, 274, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const notesHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px 8px;">
    • Primary active region: us-central1<br/>
    • 3 AZs for high availability<br/>
    • GKE Autopilot for application tier<br/>
    • Cloud Run Jobs for elastic background processing<br/>
    • Data tier with managed services and cross-region replication<br/>
    • DR region in us-east1 (warm standby)<br/>
    • All traffic over HTTPS/TLS 1.2+<br/>
    • Infrastructure as Code (Terraform)
  </div>`;
  cell("txt_notes", notesHtml, 1248, 150, 270, 180, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Scaling Strategy
  cell("box_scaling", "", 1246, 342, 274, 210, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;");
  cell("lbl_scaling", "SCALING STRATEGY", 1246, 342, 274, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const scalingHtml = `<div style="font-size:8.5px;line-height:1.55;color:#0F172A;padding:6px 8px;">
    ⚙️ <b>Horizontal Pod Autoscaler (GKE)</b><br/>
    ⚡ <b>Cloud Run concurrency scaling</b><br/>
    📬 <b>Pub/Sub driven event scaling</b><br/>
    📊 <b>BigQuery autoscaling</b><br/>
    💾 <b>Memorystore Redis Cluster Mode</b>
  </div>`;
  cell("txt_scaling", scalingHtml, 1248, 368, 270, 180, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Security Controls
  cell("box_sec_ctrl", "", 1246, 560, 274, 210, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;");
  cell("lbl_sec_ctrl", "SECURITY CONTROLS", 1246, 560, 274, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const secCtrlHtml = `<div style="font-size:8.5px;line-height:1.55;color:#0F172A;padding:6px 8px;">
    ☑ <b>IAM least privilege access</b><br/>
    ☑ <b>VPC Service Controls</b><br/>
    ☑ <b>Encryption in transit &amp; at rest</b><br/>
    ☑ <b>Secrets in Secret Manager</b><br/>
    ☑ <b>Cloud Armor for WAF &amp; DDoS</b><br/>
    ☑ <b>Audit logs in Cloud Logging</b>
  </div>`;
  cell("txt_sec_ctrl", secCtrlHtml, 1248, 586, 270, 180, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 6. BOTTOM ROW: TOOLS, CI/CD, MONITORING, ENV (x=16..1520, y=780..954, h=174) ====================
  // 1. Deployment Tools (w=260)
  cell("box_b_tools", "", 16, 780, 260, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_tools", "DEPLOYMENT TOOLS", 16, 780, 260, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const tools = [
    { t: "Terraform<br/>(IaC)", icon: "🏗️" },
    { t: "Cloud Build<br/>(CI/CD)", icon: "⚙️" },
    { t: "Artifact Registry<br/>(Containers)", icon: "📦" }
  ];
  tools.forEach((tl, idx) => {
    const tx = 24 + idx * 82;
    cell(`tl_${idx}`, `<div style="font-size:22px;text-align:center;">${tl.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:4px;">${tl.t}</div>`, tx, 816, 76, 122, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 2. CI/CD Pipeline (High Level) (w=490)
  cell("box_b_cicd", "", 284, 780, 490, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_cicd", "CI/CD PIPELINE (HIGH LEVEL)", 284, 780, 490, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const pipelineSteps = [
    { id: "ps_1", t: "Code Commit<br/>(Cloud Source)", icon: "💻" },
    { id: "ps_2", t: "Build<br/>(Cloud Build)", icon: "⚙️" },
    { id: "ps_3", t: "Scan<br/>(Artifact Analysis)", icon: "🛡️" },
    { id: "ps_4", t: "Push Image<br/>(Artifact Registry)", icon: "📦" },
    { id: "ps_5", t: "Deploy<br/>(GKE / Cloud Run)", icon: "🚀" }
  ];
  pipelineSteps.forEach((ps, idx) => {
    const px = 294 + idx * 96;
    cell(ps.id, `<div style="font-size:22px;text-align:center;">${ps.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:4px;">${ps.t}</div>`, px, 816, 90, 122, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      // Pure 0° Horizontal edge between CI/CD steps
      edge(`e_pipe_${idx}`, pipelineSteps[idx - 1].id, ps.id, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // 3. Monitoring & Observability (w=340)
  cell("box_b_mon", "", 782, 780, 340, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_mon", "MONITORING &amp; OBSERVABILITY", 782, 780, 340, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const monItems = [
    { t: "Cloud Monitoring<br/>(Metrics)", icon: "📈" },
    { t: "Cloud Logging<br/>(Logs)", icon: "📑" },
    { t: "Cloud Trace<br/>(Tracing)", icon: "⚡" },
    { t: "Alerting<br/>(PagerDuty)", icon: "🚨" }
  ];
  monItems.forEach((mo, idx) => {
    const mx = 790 + idx * 82;
    cell(`mo_${idx}`, `<div style="font-size:22px;text-align:center;">${mo.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:4px;">${mo.t}</div>`, mx, 816, 76, 122, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. Environment Strategy (w=386)
  cell("box_b_env", "", 1130, 780, 390, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_env", "ENVIRONMENT STRATEGY", 1130, 780, 390, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const envBadges = [
    { n: "DEV", col: "#16A34A", bg: "#F0FDF4" },
    { n: "TEST", col: "#CA8A04", bg: "#FEFCE8" },
    { n: "STAGE", col: "#2563EB", bg: "#EFF6FF" },
    { n: "PROD", col: "#DC2626", bg: "#FEF2F2" }
  ];
  envBadges.forEach((eb, idx) => {
    const ex = 1144 + idx * 92;
    cell(`eb_${idx}`, eb.n, ex, 824, 84, 40, `shape=rectangle;rounded=1;arcSize=8;fillColor=${eb.bg};strokeColor=${eb.col};strokeWidth=1.5;fontColor=${eb.col};fontSize=12;fontStyle=1;align=center;verticalAlign=middle;`);
  });

  const envSubHtml = `<div style="font-size:8.5px;color:#64748B;text-align:center;padding:6px;">
    <b>Isolated Projects</b><br/>
    • Separate VPCs &nbsp;|&nbsp; • Separate Data &nbsp;|&nbsp; • Separate IAM
  </div>`;
  cell("txt_b_env_sub", envSubHtml, 1140, 874, 370, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // ==================== 7. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>Version:</b> 1.0 &nbsp;|&nbsp; <b>HA:</b> Active-Passive Multi-Region &nbsp;|&nbsp; <b>RPO:</b> &lt; 15 min &nbsp;|&nbsp; <b>RTO:</b> &lt; 30 min</div>
    <div>Date: May 2024 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_16_deployment_diagram" name="Template 16: Deployment Diagram">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
