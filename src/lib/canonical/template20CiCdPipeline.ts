/**
 * Canonical Architecture Template 20: Template 20: CI/CD Pipeline
 * High-fidelity 16:9 replication of images/20.png
 */

export function generateTemplate20CiCdPipelineXml(
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
  rect("num_badge", "20", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>CI/CD Pipeline</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Microservices Delivery &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>Automate, secure, and standardize the delivery of NovaCura microservices with quality gates, security scans, and progressive deployment strategies.</div>", 1000, 18, 280, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. 9 STAGE COLUMNS
  const colW = 100;
  const startX = 20;
  const gap = 8;

  // Stage 1: Code
  const x1 = startX;
  rect("s1_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❶ Code</span>", x1, 85, colW, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s1_box", "", x1, 112, colW, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s1_c1", "<div style='font-size:6.8px;font-weight:700;'>🐙<br/>GitHub<br/><span style='font-size:5.5px;color:#64748B;'>(Repositories)</span></div>", x1+6, 122, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s1_c2", "<div style='font-size:6.8px;font-weight:700;'>🌿<br/>Branching Strategy<br/><span style='font-size:5.5px;color:#64748B;'>(GitFlow)</span></div>", x1+6, 182, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s1_c3", "<div style='font-size:6.8px;font-weight:700;'>👥<br/>Pull Request<br/><span style='font-size:5.5px;color:#64748B;'>&amp; Code Review</span></div>", x1+6, 242, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Stage 2: Build
  const x2 = x1 + colW + gap;
  rect("s2_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❷ Build</span>", x2, 85, colW, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s2_box", "", x2, 112, colW, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s2_c1", "<div style='font-size:6.8px;font-weight:700;'>🔨<br/>Cloud Build<br/><span style='font-size:5.5px;color:#64748B;'>(Compile &amp; Pkg)</span></div>", x2+6, 122, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s2_c2", "<div style='font-size:6.8px;font-weight:700;'>📦<br/>Build Artifacts<br/><span style='font-size:5.5px;color:#64748B;'>(Docker Image)</span></div>", x2+6, 182, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s2_c3", "<div style='font-size:6.8px;font-weight:700;'>🗃️<br/>Artifact Registry<br/><span style='font-size:5.5px;color:#64748B;'>(Images)</span></div>", x2+6, 242, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Stage 3: Test
  const x3 = x2 + colW + gap;
  rect("s3_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❸ Test</span>", x3, 85, colW, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s3_box", "", x3, 112, colW, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s3_c1", "<div style='font-size:6.8px;font-weight:700;'>🧪 Unit Tests<br/><span style='font-size:5.5px;color:#64748B;'>(Pytest / JUnit)</span></div>", x3+6, 122, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s3_c2", "<div style='font-size:6.8px;font-weight:700;'>🔗 Integration Tests</div>", x3+6, 172, colW-12, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s3_c3", "<div style='font-size:6.8px;font-weight:700;'>📑 Contract Tests<br/><span style='font-size:5.5px;color:#64748B;'>(Pact)</span></div>", x3+6, 218, colW-12, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s3_c4", "<div style='font-size:6.8px;font-weight:700;'>📊 Code Coverage<br/><span style='font-size:5.5px;color:#64748B;'>(SonarQube)</span></div>", x3+6, 264, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Stage 4: Security Scan
  const x4 = x3 + colW + gap;
  rect("s4_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❹ Security Scan</span>", x4, 85, colW, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s4_box", "", x4, 112, colW, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s4_c1", "<div style='font-size:6.8px;font-weight:700;'>🛡️ SAST<br/><span style='font-size:5.5px;color:#64748B;'>(SonarQube)</span></div>", x4+6, 122, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s4_c2", "<div style='font-size:6.8px;font-weight:700;'>🔍 Dependency Scan<br/><span style='font-size:5.5px;color:#64748B;'>(OWASP / Snyk)</span></div>", x4+6, 172, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s4_c3", "<div style='font-size:6.8px;font-weight:700;'>📦 Container Scan<br/><span style='font-size:5.5px;color:#64748B;'>(Trivy)</span></div>", x4+6, 222, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s4_c4", "<div style='font-size:6.8px;font-weight:700;'>🏗️ IaC Scan<br/><span style='font-size:5.5px;color:#64748B;'>(Checkov)</span></div>", x4+6, 272, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Stage 5: Quality Gate (Decision Diamond)
  const x5 = x4 + colW + gap;
  rect("s5_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❺ Quality Gate</span>", x5, 85, colW+10, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s5_box", "", x5, 112, colW+10, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s5_diamond", "<div style='font-size:6.8px;font-weight:800;color:#0F172A;text-align:center;'>All Quality Gates<br/>Passed?</div>", x5+10, 160, 90, 80, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("s5_fail", "<div style='font-size:6.5px;font-weight:700;color:#DC2626;'>🔔 Notify &amp; Fail<br/><span style='font-size:5px;color:#64748B;'>(Dev / Slack / Email)</span></div>", x5+5, 290, 100, 42, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;");

  edge(nid(), "No", "s5_diamond", "s5_fail", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#DC2626;fontStyle=1;fontSize=8;");
  edge(nid(), "Fix & Re-commit", "s5_fail", "s1_box", "edgeStyle=orthogonalEdgeStyle;strokeColor=#DC2626;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;fontSize=7;fontColor=#DC2626;", [{x: x5+55, y: 350}, {x: x1+50, y: 350}]);

  // Stage 6: Deploy to Staging
  const x6 = x5 + colW + 10 + gap;
  rect("s6_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❻ Deploy to Staging</span>", x6, 85, colW+10, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s6_box", "", x6, 112, colW+10, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s6_c1", "<div style='font-size:6.8px;font-weight:700;'>⚙️ Deploy to<br/>Staging (GKE)</div>", x6+6, 130, colW-2, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s6_c2", "<div style='font-size:6.8px;font-weight:700;'>📈 Smoke Tests<br/>&amp; Health Checks</div>", x6+6, 190, colW-2, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s6_c3", "<div style='font-size:6.8px;font-weight:700;'>⏱️ Perf Tests<br/><span style='font-size:5.5px;color:#64748B;'>(k6 / Locust)</span></div>", x6+6, 250, colW-2, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "Yes", "s5_diamond", "s6_c1", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=8;");

  // Stage 7: Approval
  const x7 = x6 + colW + 10 + gap;
  rect("s7_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❼ Approval</span>", x7, 85, colW, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s7_box", "", x7, 112, colW, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s7_c1", "<div style='font-size:6.8px;font-weight:700;'>👤 Manual Approval<br/><span style='font-size:5.5px;color:#64748B;'>(Platform / QA)</span></div>", x7+6, 140, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s7_or", "<span style='font-size:7px;font-weight:800;color:#64748B;'>or</span>", x7+40, 205, 20, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("s7_c2", "<div style='font-size:6.8px;font-weight:700;'>✔️ Auto Approval<br/><span style='font-size:5.5px;color:#64748B;'>(Policy Engine)</span></div>", x7+6, 230, colW-12, 50, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "s6_box", "s7_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // Stage 8: Deploy to Prod
  const x8 = x7 + colW + gap;
  rect("s8_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❽ Deploy to Prod</span>", x8, 85, colW+10, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s8_box", "", x8, 112, colW+10, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s8_c1", "<div style='font-size:6.8px;font-weight:700;'>⚖️ Blue/Green or<br/>Canary Deployment</div>", x8+6, 130, colW-2, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s8_c2", "<div style='font-size:6.8px;font-weight:700;'>📊 Traffic Shift<br/><span style='font-size:5.5px;color:#64748B;'>(Gradual)</span></div>", x8+6, 190, colW-2, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s8_c3", "<div style='font-size:6.8px;font-weight:700;'>📈 Health Checks<br/>&amp; Monitoring</div>", x8+6, 250, colW-2, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "s7_box", "s8_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // Stage 9: Monitor
  const x9 = x8 + colW + 10 + gap;
  rect("s9_hdr", "<span style='font-size:7.5px;font-weight:800;color:#FFFFFF;'>❾ Monitor</span>", x9, 85, colW, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("s9_box", "", x9, 112, colW, 250, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;rounded=1;");
  rect("s9_c1", "<div style='font-size:6.8px;font-weight:700;'>📊 Monitoring<br/>&amp; Alerting<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Monitoring)</span></div>", x9+6, 130, colW-12, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s9_c2", "<div style='font-size:6.8px;font-weight:700;'>📑 Logging<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Logging)</span></div>", x9+6, 190, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("s9_c3", "<div style='font-size:6.8px;font-weight:700;'>🎯 SLO / Error<br/>Tracking</div>", x9+6, 250, colW-12, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "s8_box", "s9_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // Inter-stage arrows
  edge(nid(), "", "s1_box", "s2_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "s2_box", "s3_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "s3_box", "s4_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "s4_box", "s5_box", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 3. PIPELINE ENABLERS HORIZONTAL BAR
  rect("box_enablers", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;text-align:center;'>PIPELINE ENABLERS (Integrated Across All Stages)</div>" +
    "<div style='font-size:7px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "🔒 <b>Secrets Manager</b><br/><span style='font-size:5.5px;color:#64748B;'>(Secrets)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🔐 <b>Cloud KMS</b><br/><span style='font-size:5.5px;color:#64748B;'>(Encryption)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "👥 <b>Workload Identity</b><br/><span style='font-size:5.5px;color:#64748B;'>(Federation)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "✍️ <b>Artifact Signing</b><br/><span style='font-size:5.5px;color:#64748B;'>(Cosign)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🛡️ <b>Policy as Code</b><br/><span style='font-size:5.5px;color:#64748B;'>(OPA / Conftest)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🏗️ <b>IaC with Terraform</b><br/><span style='font-size:5.5px;color:#64748B;'>(Env Provisioning)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "⎈ <b>Config Management</b><br/><span style='font-size:5.5px;color:#64748B;'>(Helm / Kustomize)</span>" +
    "</div>", 20, 380, 970, 55, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // 4. DEPLOYMENT PATTERNS SUB-DIAGRAMS
  rect("box_dep_patterns", "", 20, 445, 970, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_dep_patterns", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>DEPLOYMENT PATTERNS</span>", 20, 452, 970, 16, "strokeColor=none;fillColor=none;align=center;");

  // Pattern 1: Blue / Green
  rect("box_bg", "", 35, 475, 290, 135, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_bg", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>Blue / Green Deployment</span>", 35, 482, 290, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("bg_v1", "<div style='font-size:6.8px;font-weight:700;color:#2563EB;'>Version N<br/>(Blue)</div>", 50, 515, 65, 34, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("bg_sw", "<div style='font-size:6.8px;font-weight:700;'>Traffic<br/>Switch</div>", 150, 510, 60, 44, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0F172A;align=center;verticalAlign=middle;");
  rect("bg_v2", "<div style='font-size:6.8px;font-weight:700;color:#16A34A;'>Version N+1<br/>(Green)</div>", 240, 515, 70, 34, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");
  edge(nid(), "", "bg_v1", "bg_sw", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "bg_sw", "bg_v2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Pattern 2: Canary
  rect("box_canary", "", 345, 475, 290, 135, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_canary", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>Canary Deployment</span>", 345, 482, 290, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("can_users", "<div style='font-size:6.8px;font-weight:700;'>👥 Users</div>", 355, 520, 55, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("can_lb", "<div style='font-size:6.8px;font-weight:700;'>⚖️<br/>Load Balancer</div>", 440, 510, 75, 44, "fillColor=#FFFFFF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("can_v1", "<div style='font-size:6.8px;font-weight:700;color:#2563EB;'>Version N<br/>(90%)</div>", 545, 498, 75, 30, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("can_v2", "<div style='font-size:6.8px;font-weight:700;color:#16A34A;'>Version N+1<br/>(10%)</div>", 545, 545, 75, 30, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");
  edge(nid(), "", "can_users", "can_lb", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "can_lb", "can_v1", "edgeStyle=orthogonalEdgeStyle;strokeColor=#2563EB;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "can_lb", "can_v2", "edgeStyle=orthogonalEdgeStyle;strokeColor=#16A34A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Pattern 3: Rolling
  rect("box_rolling", "", 655, 475, 320, 135, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_rolling", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>Rolling Deployment</span>", 655, 482, 320, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("roll_p1", "<div style='font-size:6.5px;font-weight:700;'>📦 Pod 1</div>", 670, 515, 60, 30, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("roll_p2", "<div style='font-size:6.5px;font-weight:700;'>📦 Pod 2</div>", 750, 515, 60, 30, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("roll_p3", "<div style='font-size:6.5px;font-weight:700;'>📦 Pod 3</div>", 830, 515, 60, 30, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");
  rect("lbl_roll_note", "<span style='font-size:6.5px;color:#64748B;'>Update Pods / Instances in Batches</span>", 655, 565, 320, 14, "strokeColor=none;fillColor=none;align=center;");
  edge(nid(), "", "roll_p1", "roll_p2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "roll_p2", "roll_p3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // 5. RIGHT COLUMN: QUALITY GATES, STRATEGIES, COMPLIANCE, TRIGGERS
  rect("hdr_qg", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>QUALITY GATES (Must Pass)</span>", 1005, 78, 275, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_qg", "<div style='font-size:6.8px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "✔ All Unit Tests Passed<br/>" +
    "✔ Code Coverage ≥ 80%<br/>" +
    "✔ Security Scans Passed (No Critical / High)<br/>" +
    "✔ No License Violations<br/>" +
    "✔ IaC Validation Passed<br/>" +
    "✔ Performance Thresholds Met<br/>" +
    "✔ Manual Approval (If Required)" +
    "</div>", 1005, 100, 275, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_dep_strat", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>DEPLOYMENT STRATEGIES</span>", 1005, 235, 275, 20, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("card_dep_strat", "<div style='font-size:6.8px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "🔄 <b>Blue/Green</b> – Zero downtime<br/>" +
    "🐦 <b>Canary</b> – Reduced risk, gradual rollout<br/>" +
    "⚙️ <b>Rolling</b> – Incremental updates<br/>" +
    "🔙 <b>Rollback</b> – Automated / Manual" +
    "</div>", 1005, 255, 275, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_comp_gov", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>COMPLIANCE &amp; GOVERNANCE</span>", 1005, 345, 275, 20, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("card_comp_gov", "<div style='font-size:6.8px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "📑 <b>Audit Logs</b> (Cloud Audit Logs)<br/>" +
    "📋 <b>Change Management</b> (Approval Records)<br/>" +
    "📦 <b>SBOM Generation</b> (CycloneDX)<br/>" +
    "✍️ <b>Artifact Provenance</b> (SLSA Level 3)<br/>" +
    "💾 <b>Retention Policy</b> (Images / Logs)" +
    "</div>", 1005, 365, 275, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_trig", "<span style='font-size:8px;font-weight:800;color:#EA580C;'>PIPELINE TRIGGERS</span>", 1005, 475, 275, 20, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;verticalAlign=middle;");
  rect("card_trig", "<div style='font-size:6.8px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "🌿 <b>Push to Branch</b> &nbsp;&nbsp;&nbsp; 🔀 <b>Pull Request Merge</b><br/>" +
    "👤 <b>Manual Trigger</b> &nbsp;&nbsp;&nbsp; ⏰ <b>Scheduled Trigger</b><br/>" +
    "🏷️ <b>Release Tag</b>" +
    "</div>", 1005, 495, 275, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 6. BOTTOM ROW: 4 PANELS
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:6px;'>KEY BENEFITS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ Faster delivery with automated pipeline<br/>" +
    "✔ High code quality with quality gates<br/>" +
    "✔ Secure by design with integrated scans<br/>" +
    "✔ Consistent deployments with IaC<br/>" +
    "✔ Reduced risk with progressive delivery<br/>" +
    "✔ Full visibility with monitoring &amp; audit trails" +
    "</div>", 20, 630, 240, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;'>TECHNOLOGIES</div>" +
    "<div style='font-size:6.8px;line-height:1.6;color:#0F172A;'>" +
    "🔨 <b>Cloud Build</b> &nbsp;&nbsp; ⚙️ <b>GKE</b> &nbsp;&nbsp; 🗃️ <b>Artifact Registry</b><br/>" +
    "🚀 <b>Cloud Deploy</b> &nbsp;&nbsp; 📊 <b>Cloud Monitoring</b><br/>" +
    "🐙 <b>GitHub</b> &nbsp;&nbsp; 🔍 <b>SonarQube</b> &nbsp;&nbsp; 🛡️ <b>Snyk</b><br/>" +
    "📦 <b>Trivy</b> &nbsp;&nbsp; 🏗️ <b>Terraform</b> &nbsp;&nbsp; ⎈ <b>Helm</b>" +
    "</div>", 270, 630, 290, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;'>NOTES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• All images are scanned and signed before deployment.<br/>" +
    "• Use Workload Identity – no static keys in pipeline.<br/>" +
    "• Rollback can be triggered manually or automatically.<br/>" +
    "• All environments follow GitOps-ready practices.<br/>" +
    "• Pipeline as Code stored in repository (/ci-cd/)." +
    "</div>", 570, 630, 310, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>LEGEND</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "─── Pipeline Flow<br/>" +
    "- - - Conditional Flow<br/>" +
    "······ Cross-Cutting Enablement<br/>" +
    "🟦 Tool / Service &nbsp;&nbsp; 🟩 Environment / Deployment<br/>" +
    "🔷 Decision Gate &nbsp;&nbsp; 🔔 Notification / Alert" +
    "</div>", 890, 630, 390, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1145, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");


  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_20_cicd_pipeline" name="Template 20: CI/CD Pipeline">
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
