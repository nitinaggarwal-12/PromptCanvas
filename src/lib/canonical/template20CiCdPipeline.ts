/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 20 — CI/CD PIPELINE
 * 
 * 1:1 Ground-Truth Reproduction of images/20.png
 * "20 CI/CD Pipeline | Use Case: NovaCura – Continuous Integration & Continuous Delivery"
 * 9-Stage Automated Secure GitOps Delivery, Quality Gates (Gate 1..4),
 * 3 Deployment Patterns, Rollback Strategy, 4 Bottom Analytical Panels.
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate20CiCdPipelineXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
  rect("badge_20", "<b style='font-size:24px;color:#FFFFFF;'>20</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">CI/CD Pipeline</div>
    <div style="font-size:11px;font-weight:700;color:#475569;margin-top:2px;">Use Case: NovaCura – Continuous Integration &amp; Continuous Delivery &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>
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
    <div style="font-size:7.5px;color:#334155;line-height:1.35;">Automated, secure, and reliable CI/CD pipeline from code commit to production deployment with quality gates, automated testing, and zero-downtime releases.</div>
  </div>`;
  rect("card_obj", objHtml, 1140, 64, 440, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 2. MAIN 9-STAGE PIPELINE CARDS (x: 20 to 1180, y: 140, h: 480)
  // =========================================================================
  const stages = [
    {
      id: "stg_1", num: "1. Code Commit", icon: "💻", w: 115, x: 20,
      title: "Git Repo", sub: "GitHub / CSR",
      items: ["• Branch: main/dev", "• Pre-commit hooks", "• Code formatting", "• Developer Push"]
    },
    {
      id: "stg_2", num: "2. Trigger & CI", icon: "⚡", w: 115, x: 145,
      title: "Cloud Build", sub: "Webhook Trigger",
      items: ["• cloudbuild.yaml", "• Isolated Container", "• Env Variables", "• Build Event Log"]
    },
    {
      id: "stg_3", num: "3. Build & Test", icon: "🔨", w: 120, x: 270,
      title: "Compile Code", sub: "Unit Tests",
      items: ["• App Compilation", "• Coverage &gt; 80%", "• SonarQube Lint", "• Test Results XML"]
    },
    {
      id: "stg_4", num: "4. Security Scan", icon: "🛡️", w: 125, x: 400,
      title: "SAST & Vuln", sub: "Security Audit",
      items: ["• SAST Scanning", "• Dependency Check", "• Secret Detection", "• Zero High/Crit"]
    },
    {
      id: "stg_5", num: "5. Containerize", icon: "📦", w: 125, x: 535,
      title: "Artifact Reg", sub: "Docker Image",
      items: ["• Multi-stage Build", "• Container Analysis", "• Image Provenance", "• Artifact Registry"]
    },
    {
      id: "stg_6", num: "6. Deploy DEV", icon: "🚀", w: 125, x: 670,
      title: "Cloud Deploy", sub: "Dev Environment",
      items: ["• Release Creation", "• GKE Dev Cluster", "• Smoke Tests (Auto)", "• Dev Health Check"]
    },
    {
      id: "stg_7", num: "7. QA & Stage", icon: "🧪", w: 125, x: 805,
      title: "Staging Cluster", sub: "Integration Tests",
      items: ["• API / E2E Tests", "• Performance Load", "• Test Automation", "• Sign-off Ready"]
    },
    {
      id: "stg_8", num: "8. Approval Gate", icon: "📋", w: 115, x: 940,
      title: "Quality Gate", sub: "Sign-off",
      items: ["• Manual Approval", "• QA Lead Sign-off", "• Change Record", "• Release Greenlight"]
    },
    {
      id: "stg_9", num: "9. Prod Deploy", icon: "🌟", w: 125, x: 1065,
      title: "Production", sub: "Zero-Downtime",
      items: ["• Canary / Blue-Green", "• Smoke Validation", "• Metric Guardrails", "• Auto Rollback"]
    },
  ];

  stages.forEach((stg, i) => {
    // Stage Header
    rect(`${stg.id}_hdr`, `<b style='color:#FFF;font-size:7.5px;'>${stg.num}</b>`, stg.x, 140, stg.w, 24, "fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;verticalAlign=middle;");

    // Stage Body
    const bodyHtml = `<div style="padding:6px;text-align:center;">
      <div style="font-size:18px;margin-bottom:4px;">${stg.icon}</div>
      <div style="font-size:7.5px;font-weight:900;color:#0F2A4A;">${stg.title}</div>
      <div style="font-size:6.5px;color:#64748B;margin-bottom:8px;">${stg.sub}</div>
      <div style="text-align:left;font-size:6.5px;color:#334155;line-height:1.45;border-top:1px solid #E2E8F0;padding-top:6px;">
        ${stg.items.map(it => `<div>${it}</div>`).join("")}
      </div>
    </div>`;
    rect(`${stg.id}_body`, bodyHtml, stg.x, 168, stg.w, 460, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

    // Sequential Arrow
    if (i < stages.length - 1) {
      edge(`e_stg_${i}_${i+1}`, "", stg.x + stg.w, 390, stages[i+1].x, 390, "#0F172A");
    }
  });

  // =========================================================================
  // 3. RIGHT SIDEBAR: DEPLOYMENT PATTERNS & QUALITY GATES (x: 1205, w: 375)
  // =========================================================================
  // Card 1: DEPLOYMENT PATTERNS (y: 140, h: 230)
  const depPatHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:8.5px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">DEPLOYMENT PATTERNS</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="margin-bottom:8px;"><b>🐤 Canary Deployment</b><br><span style="color:#64748B;">Route 5% ➔ 25% ➔ 50% ➔ 100% based on health metrics.</span></div>
      <div style="margin-bottom:8px;"><b>🔵🟢 Blue-Green Deployment</b><br><span style="color:#64748B;">Zero-downtime instant switch between identical clusters.</span></div>
      <div><b>🔄 Rolling Update</b><br><span style="color:#64748B;">Progressive container replacement with zero downtime.</span></div>
    </div>
  </div>`;
  rect("card_dep_pat", depPatHtml, 1205, 140, 375, 230, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: QUALITY GATES (y: 380, h: 250)
  const qualGatesHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:8.5px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">QUALITY GATES</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.5;">
      <div style="margin-bottom:4px;"><b>Gate 1: Code &amp; Lint</b><br><span style="color:#64748B;">Unit tests pass (&gt;80%), lint clean</span></div>
      <div style="margin-bottom:4px;"><b>Gate 2: Security &amp; Vulns</b><br><span style="color:#64748B;">Zero high/critical CVEs, secrets clean</span></div>
      <div style="margin-bottom:4px;"><b>Gate 3: QA &amp; Testing</b><br><span style="color:#64748B;">All E2E &amp; regression suites pass</span></div>
      <div><b>Gate 4: Prod Approval</b><br><span style="color:#64748B;">Change advisory &amp; lead sign-off</span></div>
    </div>
  </div>`;
  rect("card_qual_gates", qualGatesHtml, 1205, 380, 375, 250, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 4. BOTTOM 4 ANALYTICAL PANELS (y: 645, h: 200)
  // =========================================================================
  // Panel 1: KEY BENEFITS (x: 20, w: 260)
  const benCicdHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">KEY BENEFITS</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Automated end-to-end delivery</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Built-in security and compliance gates</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Fast rollback on failure detection</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Consistent environments with IaC</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Auditable release records for GxP</span></div>
    </div>
  </div>`;
  rect("card_ben_cicd", benCicdHtml, 20, 645, 260, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 2: TECHNOLOGIES (x: 290, w: 340)
  const techCicdHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;text-align:center;">TECHNOLOGIES</div>
    <table style="width:100%;text-align:center;font-size:7px;font-weight:700;color:#1E293B;">
      <tr>
        <td style="padding:2px;"><div style="font-size:14px;">💻</div>GitHub</td>
        <td style="padding:2px;"><div style="font-size:14px;">🔨</div>Cloud Build</td>
        <td style="padding:2px;"><div style="font-size:14px;">📦</div>Artifact Reg</td>
        <td style="padding:2px;"><div style="font-size:14px;">🚀</div>Cloud Deploy</td>
      </tr>
      <tr>
        <td style="padding:2px;"><div style="font-size:14px;">🛡️</div>SonarQube</td>
        <td style="padding:2px;"><div style="font-size:14px;">⚙️</div>GKE</td>
        <td style="padding:2px;"><div style="font-size:14px;">🔧</div>Terraform</td>
        <td style="padding:2px;"><div style="font-size:14px;">📊</div>Prometheus</td>
      </tr>
    </table>
  </div>`;
  rect("card_tech_cicd", techCicdHtml, 290, 645, 340, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 3: ROLLBACK STRATEGY (x: 640, w: 340)
  const rollStratHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">ROLLBACK STRATEGY</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>⚡ <b>Automated Rollback</b> on error spikes or health fail</div>
      <div>🛑 <b>Manual 1-Click Rollback</b> via Cloud Deploy</div>
      <div>🗄️ <b>Database Migration Rollback</b> scripts verified</div>
      <div>📖 <b>Tested Runbooks</b> for production incidents</div>
    </div>
  </div>`;
  rect("card_roll_strat", rollStratHtml, 640, 645, 340, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 4: NOTES (x: 990, w: 590)
  const notesCicdHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:6px;">NOTES</div>
    <div style="font-size:7px;color:#334155;line-height:1.45;">
      <div>• Pipeline runs automatically on pull requests and commits to main.</div>
      <div>• Artifact analysis blocks deployment if critical CVEs are present.</div>
      <div>• Production deployments require signed approval from authorized leads.</div>
      <div>• Immutable build logs retained for 400 days to satisfy GxP / 21 CFR Part 11.</div>
      <div>• Infrastructure changes follow identical Terraform GitOps pipeline.</div>
    </div>
  </div>`;
  rect("card_notes_cicd", notesCicdHtml, 990, 645, 590, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 5. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

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
