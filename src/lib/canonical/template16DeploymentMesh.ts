/**
 * Canonical Architecture Template 16: Deployment Diagram
 * Exact 1:1 High-Fidelity Master Blueprint of images/16.png
 */

export function generateTemplate16DeploymentMeshXml(
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
  rect("num_badge", "16", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>DEPLOYMENT DIAGRAM</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>NOVACURA – Enterprise AI Platform for Biopharma &nbsp;|&nbsp; Multi-AZ Primary + Secondary DR Region</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>Transforming Therapies. Improving Lives.</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Legend Pills
  rect("hdr_legend", "<div style='font-size:10px;display:flex;gap:8px;align-items:center;'><span style='background:#F0FDF4;border:1px solid #16A34A;padding:2px 6px;border-radius:3px;font-weight:700;'>■ Compute</span> <span style='background:#FAF5FF;border:1px solid #7C3AED;padding:2px 6px;border-radius:3px;font-weight:700;'>■ Data Services</span> <span style='background:#EFF6FF;border:1px solid #2563EB;padding:2px 6px;border-radius:3px;font-weight:700;'>■ Networking</span> <span style='background:#FFFBEB;border:1px solid #D97706;padding:2px 6px;border-radius:3px;font-weight:700;'>■ Security</span></div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=2;");

  // 2. USERS & CLIENTS (x=20..110, y=72..540)
  rect("box_users", "", 20, 72, 90, 465, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("lbl_users", "<span style='font-size:10px;font-weight:800;color:#1E3A8A;'>USERS &amp; CLIENTS</span>", 20, 75, 90, 14, "strokeColor=none;fillColor=none;align=center;");

  const clients = [
    { t: "Web Application", icon: "💻" },
    { t: "Mobile Application", icon: "📱" },
    { t: "AI Copilot (Embedded)", icon: "🧠" },
    { t: "Partner / 3rd Party", icon: "🏢" },
    { t: "Scientists / QA", icon: "🔬" },
    { t: "API Clients", icon: "🔌" }
  ];
  clients.forEach((cl, idx) => {
    const cy = 94 + idx * 72;
    rect(`cl_${idx}`, `<div style='font-size:12px;text-align:center;'>${cl.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${cl.t}</div>`, 25, cy, 80, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. INGRESS / EDGE (x=115..195, y=72..540)
  rect("box_edge", "", 115, 72, 80, 465, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_edge", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>EDGE / INGRESS</span>", 115, 75, 80, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("edge_cdn", "<div style='font-size:14px;text-align:center;'>⚡</div><div style='font-size:9px;font-weight:700;'>Cloud CDN</div>", 120, 110, 70, 60, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("edge_armor", "<div style='font-size:14px;text-align:center;'>🛡️</div><div style='font-size:9px;font-weight:700;'>Cloud Armor<br/><span style='color:#64748B;font-size:8px;'>(WAF / DDoS)</span></div>", 120, 210, 70, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("edge_https", "<div style='font-size:14px;text-align:center;'>🌐</div><div style='font-size:9px;font-weight:700;'>External HTTPS<br/><span style='color:#64748B;font-size:8px;'>(Global Anycast)</span></div>", 120, 310, 70, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 4. PRIMARY REGION (us-central1) (x=200..1160, y=72..540)
  rect("box_primary", "", 200, 72, 960, 465, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_primary", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>GOOGLE CLOUD – PRIMARY REGION (us-central1)</span>", 200, 75, 960, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("lb_global", "<div style='font-size:9px;font-weight:700;'>🌐 Global HTTP(S) Load Balancer</div>", 215, 94, 930, 24, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("lb_internal", "<div style='font-size:9px;font-weight:700;'>🔒 Internal HTTP(S) Load Balancer</div>", 215, 122, 930, 24, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // 3 Multi-AZ Pods
  const pzones = [
    { name: "ZONE A (us-central1-a)", x: 215, w: 302 },
    { name: "ZONE B (us-central1-b)", x: 529, w: 302 },
    { name: "ZONE C (us-central1-c)", x: 843, w: 302 }
  ];

  pzones.forEach((pz, idx) => {
    rect(`pz_box_${idx}`, "", pz.x, 150, pz.w, 185, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
    rect(`pz_lbl_${idx}`, `<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>${pz.name}</span>`, pz.x, 152, pz.w, 12, "strokeColor=none;fillColor=none;align=center;");

    // Application Tier (GKE Autopilot)
    rect(`pz_${idx}_gke`, `<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:2px;'>⚙️ Application Tier (GKE Autopilot)</div><div style='font-size:8px;display:flex;justify-content:space-around;gap:2px;'><div style='background:#FFF;border:1px solid #CBD5E1;padding:2px;border-radius:2px;'>🧠 AI Copilot</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:2px;border-radius:2px;'>🛡️ API Gateway</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:2px;border-radius:2px;'>💼 Business Svc</div></div>`, pz.x + 6, 168, pz.w - 12, 60, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;padding=2;");

    // Background / Worker Tier
    rect(`pz_${idx}_run`, `<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:2px;'>📦 Background / Worker Tier (Cloud Run)</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>• Ingestion Workers<br/>• RAG / Embedding Jobs<br/>• Batch Processing</div>`, pz.x + 6, 234, pz.w - 12, 95, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=left;verticalAlign=top;padding=4;");
  });

  // Regional Data Tier
  rect("box_data_tier", "", 215, 340, 930, 80, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;rounded=1;");
  rect("lbl_data_tier", "<span style='font-size:9px;font-weight:800;color:#7C3AED;'>DATA TIER (REGIONAL)</span>", 215, 342, 930, 12, "strokeColor=none;fillColor=none;align=center;");

  const dbs = [
    { t: "AlloyDB", sub: "PostgreSQL", icon: "🗄️" },
    { t: "Cloud SQL", sub: "MySQL", icon: "🐬" },
    { t: "MongoDB Atlas", sub: "Doc Store", icon: "🍃" },
    { t: "Redis", sub: "Memorystore", icon: "⚡" },
    { t: "BigQuery", sub: "Warehouse", icon: "📊" },
    { t: "Vertex AI Vector", sub: "Matching Engine", icon: "🧠" }
  ];
  dbs.forEach((db, idx) => {
    const dx = 225 + idx * 152;
    rect(`db_box_${idx}`, `<div style='font-size:10px;text-align:center;'>${db.icon}</div><div style='font-size:9px;font-weight:700;'>${db.t}</div><div style='font-size:8px;color:#64748B;'>${db.sub}</div>`, dx, 356, 144, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Shared Services & Network Foundation
  rect("box_shared", "", 215, 424, 930, 70, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_shared", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>SHARED SERVICES &amp; NETWORK FOUNDATION</span>", 215, 426, 930, 12, "strokeColor=none;fillColor=none;align=center;");

  const shared = [
    { t: "Cloud Storage", sub: "Artifacts / Files", icon: "🗃️" },
    { t: "Secret Manager", sub: "Secrets", icon: "🔒" },
    { t: "Cloud KMS", sub: "Keys", icon: "🔑" },
    { t: "Cloud Logging", sub: "Logs &amp; Audit", icon: "📑" },
    { t: "Pub/Sub", sub: "Messaging", icon: "📨" },
    { t: "Workflows", sub: "Orchestration", icon: "⚙️" }
  ];
  shared.forEach((sh, idx) => {
    const sx = 225 + idx * 152;
    rect(`sh_box_${idx}`, `<div style='font-size:9px;font-weight:700;'>${sh.icon} ${sh.t}</div><div style='font-size:8px;color:#64748B;'>${sh.sub}</div>`, sx, 442, 144, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  rect("net_strip", "<div style='font-size:8px;color:#64748B;text-align:center;'>🌐 VPC (10.0.0.0/16) &nbsp;|&nbsp; 🔒 Subnets (Private) &nbsp;|&nbsp; ☁️ Cloud NAT &nbsp;|&nbsp; 🔒 Private Google Access &nbsp;|&nbsp; 🛡️ VPC Service Controls &nbsp;|&nbsp; 🧱 Firewall Rules</div>", 215, 498, 930, 18, "strokeColor=none;fillColor=none;align=center;");

  // 5. DR REGION (us-east1) (x=1168..1360, y=72..540)
  rect("box_dr", "", 1168, 72, 192, 465, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;dashed=1;");
  rect("lbl_dr", "<span style='font-size:10px;font-weight:800;color:#7C3AED;'>☁️ DR REGION (us-east1)</span>", 1168, 75, 192, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("dr_gke", "<div style='font-size:12px;text-align:center;'>⚙️</div><div style='font-size:9px;font-weight:700;'>GKE Autopilot<br/><span style='color:#64748B;font-size:8px;'>(Standby)</span></div>", 1176, 100, 176, 75, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_run", "<div style='font-size:12px;text-align:center;'>📦</div><div style='font-size:9px;font-weight:700;'>Cloud Run Jobs<br/><span style='color:#64748B;font-size:8px;'>(Standby)</span></div>", 1176, 185, 176, 75, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("dr_data", "<div style='font-size:10px;font-weight:800;color:#7C3AED;'>Data Tier (Replicated)</div><div style='font-size:8px;color:#0F172A;line-height:1.3;'>• AlloyDB (Cross-region Replicas)<br/>• Cloud Storage (Dual-region)<br/>• BigQuery (Cross-region)<br/>• MongoDB Atlas (Global)</div>", 1176, 270, 176, 130, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("dr_shared", "<div style='font-size:12px;text-align:center;'>🔒</div><div style='font-size:9px;font-weight:700;'>Shared Services<br/><span style='color:#64748B;font-size:8px;'>(Standby)</span></div>", 1176, 410, 176, 115, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 6. FAR RIGHT COLUMN: DEPLOYMENT NOTES, SCALING, SECURITY (x=1368..1560, y=72..540)
  rect("box_r_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>DEPLOYMENT NOTES</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>• <b>Primary active region:</b> us-central1<br/>• <b>3 AZs</b> for high availability<br/>• <b>GKE Autopilot</b> for app tier<br/>• <b>Cloud Run Jobs</b> for background<br/>• <b>Data tier</b> with managed services<br/>• <b>DR region</b> in us-east1 (warm)<br/>• <b>All traffic</b> over HTTPS/TLS 1.2+<br/>• <b>IaC:</b> Terraform</div>", 1368, 72, 192, 150, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_scaling", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;text-align:center;'>SCALING STRATEGY</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>⚙️ Horizontal Pod Autoscaler (GKE)<br/>📦 Cloud Run concurrency scaling<br/>📨 Pub/Sub driven event scaling<br/>📊 BigQuery autoscaling<br/>⚡ Memorystore Redis Cluster</div>", 1368, 228, 192, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_sec", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;text-align:center;'>SECURITY CONTROLS</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>🛡️ IAM least privilege access<br/>🔒 VPC Service Controls<br/>🔑 Encryption in transit &amp; at rest<br/>🔐 Secrets in Secret Manager<br/>🧱 Cloud Armor for WAF &amp; DDoS<br/>📑 Audit logs in Cloud Logging</div>", 1368, 374, 192, 163, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 7. BOTTOM ROW: DEPLOYMENT TOOLS, CI/CD, MONITORING, ENV STRATEGY (x=20..1560, y=546..740)
  rect("bot_tools", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>DEPLOYMENT TOOLS</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:14px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🏗️<br/><b>Terraform</b><br/>(IaC)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⚡<br/><b>Cloud Build</b><br/>(CI/CD)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📦<br/><b>Artifact Reg</b><br/>(Containers)</div></div>", 20, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_cicd", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:6px;text-align:center;'>CI/CD PIPELINE (HIGH LEVEL)</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:14px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>💻<br/><b>Code Commit</b><br/>(Source Repos)</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⚙️<br/><b>Build</b><br/>(Cloud Build)</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🛡️<br/><b>Scan</b><br/>(Artifact Scan)</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📦<br/><b>Push Image</b><br/>(Artifact Reg)</div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:4px;'>🚀<br/><b>Deploy</b><br/>(GKE / Run)</div></div>", 290, 546, 540, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_obs", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:4px;text-align:center;'>MONITORING &amp; OBSERVABILITY</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:14px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📈<br/><b>Monitoring</b><br/>(Metrics)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📑<br/><b>Logging</b><br/>(Logs)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⏱️<br/><b>Trace</b><br/>(Tracing)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔔<br/><b>Alerting</b><br/>(PagerDuty)</div></div>", 840, 546, 380, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_env", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>ENVIRONMENT STRATEGY</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:14px;'><div style='border:1px solid #16A34A;background:#F0FDF4;padding:6px;border-radius:4px;'><b>DEV</b></div> <div style='border:1px solid #D97706;background:#FFFBEB;padding:6px;border-radius:4px;'><b>TEST</b></div> <div style='border:1px solid #2563EB;background:#EFF6FF;padding:6px;border-radius:4px;'><b>STAGE</b></div> <div style='border:1px solid #DC2626;background:#FEF2F2;padding:6px;border-radius:4px;'><b>PROD</b></div></div><div style='font-size:8px;color:#64748B;text-align:center;margin-top:16px;'>Isolated Projects • Separate VPCs • Separate Data • Separate IAM</div>", 1230, 546, 330, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_16_deployment_diagram" name="Template 16: Deployment Diagram">
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
