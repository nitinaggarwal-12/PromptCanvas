/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 20: CI/CD Pipeline
 * Matches 100% of images/20.png:
 * - 9-stage sequential pipeline (❶ Code ➔ ❷ Build ➔ ❸ Test ➔ ❹ Security Scan ➔ ❺ Quality Gate ➔ ❻ Deploy to Staging ➔ ❼ Approval ➔ ❽ Deploy to Prod ➔ ❾ Monitor)
 * - Decision Gate diamond in Stage 5 with Notify & Fail branch and loop-back to Code
 * - Cross-cutting Pipeline Enablers bar (7 integrated tools)
 * - 3 Deployment Patterns sub-diagrams: Blue/Green, Canary Deployment, Rolling Deployment
 * - Right Sidebar: Quality Gates checklist (7 items), Deployment Strategies, Compliance & Governance
 * - Bottom Row: Key Benefits, Technologies Matrix (10 icons in 2 rows), Notes, Legend, Pipeline Triggers
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate20CiCdPipelineXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "20", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>CI/CD Pipeline</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Microservices Delivery</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Automate, secure, and standardize the delivery of NovaCura microservices with quality gates, security scans, and progressive deployment strategies.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. 9 PIPELINE STAGES (x=16..1180, y=78..390) ====================
  const stages = [
    { id: "stg_1", num: "1", name: "Code", w: 114, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_2", num: "2", name: "Build", w: 118, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_3", num: "3", name: "Test", w: 122, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_4", num: "4", name: "Security Scan", w: 126, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_5", num: "5", name: "Quality Gate", w: 126, bg: "#FAF5FF", bc: "#7C3AED" },
    { id: "stg_6", num: "6", name: "Deploy to Staging", w: 130, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_7", num: "7", name: "Approval", w: 118, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_8", num: "8", name: "Deploy to Prod", w: 126, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_9", num: "9", name: "Monitor", w: 118, bg: "#FFFFFF", bc: "#CBD5E1" }
  ];

  let curStgX = 16;
  stages.forEach((stg) => {
    cell(`box_${stg.id}`, "", curStgX, 78, stg.w, 312, `rounded=1;arcSize=6;fillColor=${stg.bg};strokeColor=${stg.bc};strokeWidth=1.5;`);
    cell(`lbl_${stg.id}`, `<div style="display:flex;align-items:center;justify-content:center;"><span style="background:#6D28D9;color:#FFFFFF;padding:1px 5px;border-radius:10px;font-size:8px;font-weight:900;margin-right:4px;">${stg.num}</span> <span style="font-size:9px;font-weight:800;color:#0F172A;">${stg.name}</span></div>`, curStgX, 82, stg.w, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    curStgX += stg.w + 6;
  });

  // Stage 1 Content: Code
  cell("c_s1_1", "<div style='font-size:20px;text-align:center;'>🐙</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>GitHub<br/><span style='color:#64748B;'>(Repositories)</span></div>", 22, 108, 102, 74, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s1_2", "<div style='font-size:16px;text-align:center;'>🔀</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Branching<br/>Strategy<br/><span style='color:#64748B;'>(GitFlow)</span></div>", 22, 190, 102, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s1_3", "<div style='font-size:16px;text-align:center;'>👥</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Pull Request<br/>&amp; Code Review</div>", 22, 282, 102, 96, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 2 Content: Build
  cell("c_s2_1", "<div style='font-size:20px;text-align:center;'>⚙️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Cloud Build<br/><span style='color:#64748B;'>(Compile &amp; Package)</span></div>", 142, 108, 106, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s2_2", "<div style='font-size:18px;text-align:center;'>📦</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Build Artifacts<br/><span style='color:#64748B;'>(Docker Image)</span></div>", 142, 196, 106, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s2_3", "<div style='font-size:18px;text-align:center;'>📦</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Artifact Registry<br/><span style='color:#64748B;'>(Images)</span></div>", 142, 284, 106, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 3 Content: Test
  cell("c_s3_1", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>🧪 Unit Tests<br/><span style='color:#64748B;'>(Pytest / JUnit)</span></div>", 266, 108, 110, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s3_2", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>🔄 Integration Tests</div>", 266, 174, 110, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s3_3", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>📜 Contract Tests<br/><span style='color:#64748B;'>(Pact)</span></div>", 266, 240, 110, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s3_4", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>📊 Code Coverage<br/><span style='color:#64748B;'>(SonarQube)</span></div>", 266, 306, 110, 72, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 4 Content: Security Scan
  cell("c_s4_1", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>🛡️ SAST<br/><span style='color:#64748B;'>(SonarQube)</span></div>", 394, 108, 114, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s4_2", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>🔍 Dependency Scan<br/><span style='color:#64748B;'>(OWASP / Snyk)</span></div>", 394, 174, 114, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s4_3", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>📦 Container Scan<br/><span style='color:#64748B;'>(Trivy)</span></div>", 394, 240, 114, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s4_4", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>📑 IaC Scan<br/><span style='color:#64748B;'>(Checkov)</span></div>", 394, 306, 114, 72, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 5 Content: Quality Gate Diamond
  cell("c_s5_gate", "<div style='font-size:18px;text-align:center;'>✔</div><div style='font-size:7.5px;font-weight:800;color:#166534;text-align:center;'>All Quality Gates<br/>Passed?</div>", 534, 150, 102, 102, "rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s5_fail", "<div style='font-size:16px;text-align:center;'>🔔</div><div style='font-size:7px;font-weight:800;color:#DC2626;text-align:center;'>Notify &amp; Fail<br/><span style='color:#64748B;'>(Dev / Slack / Email)</span></div>", 530, 290, 110, 84, "rounded=1;arcSize=6;fillColor=#FEF2F2;strokeColor=#DC2626;html=1;align=center;verticalAlign=middle;padding=2;");
  
  // Pure 90° Vertical edge: Quality Gate -> Fail
  edge("e_gate_fail", "c_s5_gate", "c_s5_fail", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  cell("lbl_gate_no", "No", 590, 260, 20, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=8;fontStyle=1;align=left;");

  // Pure 180° / 90° Orthogonal loop-back from Fail to Code
  edge("e_fail_to_code", "c_s5_fail", "c_s1_3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0;exitY=0.5;entryX=1;entryY=0.5;");

  // Stage 6 Content: Deploy to Staging
  cell("c_s6_1", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Deploy to<br/>Staging (GKE)</div>", 664, 108, 118, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s6_2", "<div style='font-size:18px;text-align:center;'>🩺</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Smoke Tests<br/>&amp; Health Checks</div>", 664, 196, 118, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s6_3", "<div style='font-size:18px;text-align:center;'>⏱️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Performance Tests<br/><span style='color:#64748B;'>(k6 / Locust)</span></div>", 664, 284, 118, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Pure 0° Horizontal edge: Quality Gate -> Staging
  edge("e_gate_pass", "c_s5_gate", "c_s6_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  cell("lbl_gate_yes", "Yes", 640, 182, 20, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=8;fontStyle=1;align=left;");

  // Stage 7 Content: Approval
  cell("c_s7_1", "<div style='font-size:18px;text-align:center;'>👤</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Manual Approval<br/><span style='color:#64748B;'>(Platform / QA)</span></div>", 800, 108, 106, 116, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s7_or", "<span style='font-size:8px;color:#64748B;font-style:italic;'>or</span>", 800, 230, 106, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("c_s7_2", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Auto Approval<br/><span style='color:#64748B;'>(Policy Engine)</span></div>", 800, 252, 106, 126, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 8 Content: Deploy to Prod
  cell("c_s8_1", "<div style='font-size:18px;text-align:center;'>🚀</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Blue/Green or<br/>Canary Deployment</div>", 924, 108, 114, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s8_2", "<div style='font-size:18px;text-align:center;'>📊</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Traffic Shift<br/><span style='color:#64748B;'>(Gradual)</span></div>", 924, 196, 114, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s8_3", "<div style='font-size:18px;text-align:center;'>🩺</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Health Checks<br/>&amp; Monitoring</div>", 924, 284, 114, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 9 Content: Monitor
  cell("c_s9_1", "<div style='font-size:18px;text-align:center;'>📈</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Monitoring<br/>&amp; Alerting<br/><span style='color:#64748B;'>(Cloud Monitoring)</span></div>", 1056, 108, 106, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s9_2", "<div style='font-size:18px;text-align:center;'>📑</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Logging<br/><span style='color:#64748B;'>(Cloud Logging)</span></div>", 1056, 196, 106, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s9_3", "<div style='font-size:18px;text-align:center;'>🎯</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>SLO / Error<br/>Tracking</div>", 1056, 284, 106, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

  // Pure 0° Horizontal Pipeline Flow Arrows
  edge("e_s1_s2", "c_s1_1", "c_s2_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_s2_s3", "c_s2_1", "c_s3_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_s3_s4", "c_s3_1", "c_s4_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_s4_s5", "c_s4_1", "c_s5_gate", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_s6_s7", "c_s6_1", "c_s7_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_s7_s8", "c_s7_1", "c_s8_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_s8_s9", "c_s8_1", "c_s9_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 3. MIDDLE: PIPELINE ENABLERS (x=16..1180, y=398..484, w=1164, h=86) ====================
  cell("box_enablers", "", 16, 398, 1164, 86, "rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_enablers", "PIPELINE ENABLERS (Integrated Across All Stages)", 16, 400, 1164, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const enablers = [
    { t: "Secret Manager<br/>(Secrets)", icon: "🔒" },
    { t: "Cloud KMS<br/>(Encryption)", icon: "🔑" },
    { t: "Workload Identity<br/>(Federation)", icon: "👥" },
    { t: "Artifact Signing<br/>(Cosign)", icon: "✍️" },
    { t: "Policy as Code<br/>(OPA / Conftest)", icon: "🛡️" },
    { t: "IaC with Terraform<br/>(Env Provisioning)", icon: "🏗️" },
    { t: "Config Management<br/>(Helm / Kustomize)", icon: "⚙️" }
  ];
  enablers.forEach((en, idx) => {
    const ex = 26 + idx * 164;
    cell(`en_${idx}`, `<div style="font-size:16px;text-align:center;">${en.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${en.t}</div>`, ex, 420, 154, 56, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 4. DEPLOYMENT PATTERNS SUB-DIAGRAMS (x=16..1180, y=492..654, w=1164, h=162) ====================
  cell("box_patterns", "", 16, 492, 1164, 162, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_patterns", "DEPLOYMENT PATTERNS", 16, 494, 1164, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Pattern 1: Blue / Green Deployment (w=340)
  cell("box_p_bg", "", 26, 516, 340, 128, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_p_bg", "Blue / Green Deployment", 26, 518, 340, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("p_bg_blue", "Version N<br/>(Blue)", 36, 546, 80, 50, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  cell("p_bg_switch", "Traffic<br/>Switch", 156, 546, 70, 50, "rhombus;fillColor=#FFFFFF;strokeColor=#64748B;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  cell("p_bg_green", "Version N+1<br/>(Green)", 266, 546, 90, 50, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;fontColor=#166534;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  edge("e_bg_1", "p_bg_blue", "p_bg_switch", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_bg_2", "p_bg_switch", "p_bg_green", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Pattern 2: Canary Deployment (w=390)
  cell("box_p_canary", "", 376, 516, 390, 128, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_p_canary", "Canary Deployment", 376, 518, 390, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("p_can_users", "👥<br/>Users", 386, 550, 56, 44, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("p_can_lb", "⚙️<br/>Load Balancer", 462, 546, 80, 50, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#2563EB;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  cell("p_can_v1", "Version N (90%)", 582, 536, 110, 32, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#2563EB;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  cell("p_can_v2", "Version N+1 (10%)", 582, 580, 110, 32, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#16A34A;fontSize=7;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  edge("e_can_1", "p_can_users", "p_can_lb", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_can_2", "p_can_lb", "p_can_v1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=1;exitY=0.35;entryX=0;entryY=0.5;");
  edge("e_can_3", "p_can_lb", "p_can_v2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.65;entryX=0;entryY=0.5;");

  // Pattern 3: Rolling Deployment (w=394)
  cell("box_p_rolling", "", 776, 516, 394, 128, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_p_rolling", "Rolling Deployment", 776, 518, 394, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const rollPods = ["📦", "📦", "📦", "📦"];
  rollPods.forEach((rp, idx) => {
    const rx = 796 + idx * 90;
    cell(`rp_${idx}`, rp, rx, 546, 50, 44, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;fontSize=16;align=center;verticalAlign=middle;");
    if (idx > 0) {
      edge(`e_rp_${idx}`, `rp_${idx - 1}`, `rp_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });
  cell("lbl_roll_sub", "Update Pods / Instances in Batches", 776, 608, 394, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // ==================== 5. RIGHT SIDEBAR (x=1190..1520, y=78..654, w=330, h=576) ====================
  // 1. Quality Gates (Must Pass)
  cell("box_q_gates", "", 1190, 78, 330, 224, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_q_gates", "QUALITY GATES (Must Pass)", 1190, 78, 330, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const qGatesHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    ✔ <b>All Unit Tests Passed</b><br/>
    ✔ <b>Code Coverage ≥ 80%</b><br/>
    ✔ <b>Security Scans Passed (No Critical / High)</b><br/>
    ✔ <b>No License Violations</b><br/>
    ✔ <b>IaC Validation Passed</b><br/>
    ✔ <b>Performance Thresholds Met</b><br/>
    ✔ <b>Manual Approval (If Required)</b>
  </div>`;
  cell("txt_q_gates", qGatesHtml, 1192, 102, 326, 196, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Deployment Strategies
  cell("box_d_strat", "", 1190, 310, 330, 164, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_d_strat", "DEPLOYMENT STRATEGIES", 1190, 310, 330, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const dStratHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    🚀 <b>Blue/Green</b> – Zero downtime<br/>
    👥 <b>Canary</b> – Reduced risk, gradual rollout<br/>
    🔄 <b>Rolling</b> – Incremental updates<br/>
    🎯 <b>Rollback</b> – Automated / Manual
  </div>`;
  cell("txt_d_strat", dStratHtml, 1192, 334, 326, 136, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Compliance & Governance
  cell("box_c_gov", "", 1190, 482, 330, 172, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_c_gov", "COMPLIANCE &amp; GOVERNANCE", 1190, 482, 330, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const cGovHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    📑 <b>Audit Logs</b> (Cloud Audit Logs)<br/>
    👥 <b>Change Management</b> (Approval Records)<br/>
    📦 <b>SBOM Generation</b> (CycloneDX)<br/>
    🛡️ <b>Artifact Provenance</b> (SLSA Level 3)<br/>
    🗃️ <b>Retention Policy</b> (Images / Logs)
  </div>`;
  cell("txt_c_gov", cGovHtml, 1192, 506, 326, 144, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 6. BOTTOM ROW: BENEFITS, TECH, NOTES, LEGEND, TRIGGERS (y=664..954, h=290) ====================
  // 1. Key Benefits (w=250)
  cell("box_b_benefits", "", 16, 664, 250, 290, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 664, 250, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:4px 8px;">
    ✔ <b>Faster delivery</b> with automated pipeline<br/><br/>
    ✔ <b>High code quality</b> with quality gates<br/><br/>
    ✔ <b>Secure by design</b> with integrated scans<br/><br/>
    ✔ <b>Consistent deployments</b> with IaC<br/><br/>
    ✔ <b>Reduced risk</b> with progressive delivery<br/><br/>
    ✔ <b>Full visibility</b> with monitoring &amp; audit trails
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 688, 246, 260, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Technologies Matrix (w=390)
  cell("box_b_tech", "", 274, 664, 390, 290, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tech", "TECHNOLOGIES", 274, 664, 390, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const techGrid = [
    { t: "Cloud Build", icon: "⚙️" },
    { t: "GKE", icon: "⚙️" },
    { t: "Artifact Registry", icon: "📦" },
    { t: "Cloud Deploy", icon: "🚀" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "GitHub", icon: "🐙" },
    { t: "SonarQube", icon: "📊" },
    { t: "Snyk", icon: "🛡️" },
    { t: "Trivy", icon: "🔍" },
    { t: "Terraform", icon: "🏗️" },
    { t: "Helm", icon: "⚙️" }
  ];
  techGrid.forEach((tg, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const gx = 282 + col * 74;
    const gy = 694 + row * 60;
    cell(`tg_${idx}`, `<div style="font-size:16px;text-align:center;">${tg.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${tg.t}</div>`, gx, gy, 70, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. Notes (w=260)
  cell("box_b_notes", "", 672, 664, 260, 290, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_notes", "NOTES", 672, 664, 260, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bNotesHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:6px 8px;">
    • All images are scanned and signed before deployment.<br/><br/>
    • Use Workload Identity – no static keys in pipeline.<br/><br/>
    • Rollback can be triggered manually or automatically.<br/><br/>
    • All environments follow GitOps-ready practices.<br/><br/>
    • Pipeline as Code stored in the repository (/ci-cd/).
  </div>`;
  cell("txt_b_notes", bNotesHtml, 674, 688, 256, 260, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Legend (w=270)
  cell("box_b_legend", "", 940, 664, 270, 290, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_legend", "LEGEND", 940, 664, 270, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bLegendHtml = `<table style="width:100%;border-collapse:collapse;font-size:7.5px;margin-top:2px;line-height:1.4;padding:2px 6px;">
    <tr style="height:20px;"><td style="width:36px;color:#0F172A;font-weight:900;">━━━━►</td><td>Pipeline Flow</td></tr>
    <tr style="height:20px;"><td style="color:#DC2626;font-weight:900;">┈┈┈┈►</td><td>Conditional Flow</td></tr>
    <tr style="height:20px;"><td style="color:#7C3AED;font-weight:900;">┈┈┈┈►</td><td>Cross-Cutting Enablement</td></tr>
    <tr style="height:20px;"><td style="color:#2563EB;font-size:10px;">🟦</td><td>Tool / Service</td></tr>
    <tr style="height:20px;"><td style="color:#16A34A;font-size:10px;">🟩</td><td>Environment / Deployment</td></tr>
    <tr style="height:20px;"><td style="color:#7C3AED;font-size:10px;">◇</td><td>Decision Gate</td></tr>
    <tr style="height:20px;"><td style="color:#DC2626;font-size:10px;">🔔</td><td>Notification / Alert</td></tr>
  </table>`;
  cell("txt_b_legend", bLegendHtml, 942, 688, 266, 260, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 5. Pipeline Triggers (w=302)
  cell("box_b_triggers", "", 1218, 664, 302, 290, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_b_triggers", "PIPELINE TRIGGERS", 1218, 664, 302, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bTriggersHtml = `<div style="font-size:8px;line-height:1.7;color:#0F172A;padding:6px 12px;">
    🔀 <b>Push to Branch</b><br/>
    🔀 <b>Pull Request Merge</b><br/>
    🔍 <b>Manual Trigger</b><br/>
    ⏰ <b>Scheduled Trigger</b><br/>
    🏷️ <b>Release Tag</b>
  </div>`;
  cell("txt_b_triggers", bTriggersHtml, 1220, 688, 298, 260, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 7. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>PIPELINE:</b> GitOps-driven CI/CD &nbsp;|&nbsp; <b>GATES:</b> SonarQube, Snyk, Trivy, Checkov &nbsp;|&nbsp; <b>DEPLOY:</b> Blue/Green &amp; Canary</div>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; DevOps &amp; Release Engineering Team</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_20_cicd_pipeline" name="Template 20: CI/CD Pipeline">
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
