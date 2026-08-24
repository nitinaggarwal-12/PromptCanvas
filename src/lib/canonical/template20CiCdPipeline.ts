/**
 * Canonical Architecture Template 20: CI/CD Pipeline
 * Exact 1:1 High-Fidelity Master Blueprint of images/20.png
 */

export function generateTemplate20CiCdPipelineXml(
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

  const diamond = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="shape=rhombus;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
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
  rect("num_badge", "20", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>CI/CD Pipeline</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Microservices Delivery &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Automate, secure, and standardize the delivery of NovaCura microservices with quality gates, security scans, and progressive deployment strategies.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. 9 STAGES ACROSS TOP (x=20..1300, y=72..320)
  const stages = [
    { n: "1", t: "Code", col: "#1E3A8A", bg: "#F8FAFC", x: 20, w: 125, items: ["💻 <b>GitHub</b><br/>(Repositories)", "🔀 <b>Branching</b><br/>(GitFlow)", "👥 <b>Pull Request</b><br/>&amp; Code Review"] },
    { n: "2", t: "Build", col: "#2563EB", bg: "#EFF6FF", x: 152, w: 125, items: ["⚡ <b>Cloud Build</b><br/>(Compile &amp; Pkg)", "📦 <b>Build Artifacts</b><br/>(Docker Image)", "🗃️ <b>Artifact Reg</b><br/>(Images)"] },
    { n: "3", t: "Test", col: "#16A34A", bg: "#F0FDF4", x: 284, w: 130, items: ["🧪 <b>Unit Tests</b><br/>(Pytest / JUnit)", "⚙️ <b>Integration</b><br/>Tests", "🤝 <b>Contract Tests</b><br/>(Pact)", "📊 <b>Code Coverage</b><br/>(SonarQube)"] },
    { n: "4", t: "Security Scan", col: "#7C3AED", bg: "#FAF5FF", x: 421, w: 135, items: ["🛡️ <b>SAST</b><br/>(SonarQube)", "🔍 <b>Dependency Scan</b><br/>(OWASP/Snyk)", "📦 <b>Container Scan</b><br/>(Trivy)", "🧱 <b>IaC Scan</b><br/>(Checkov)"] },
    { n: "5", t: "Quality Gate", col: "#D97706", bg: "#FFFBEB", x: 563, w: 140, isGate: true },
    { n: "6", t: "Deploy to Staging", col: "#0284C7", bg: "#F0F9FF", x: 710, w: 140, items: ["🚀 <b>Deploy Staging</b><br/>(GKE)", "🩺 <b>Smoke Tests</b><br/>&amp; Health Checks", "⏱️ <b>Perf Tests</b><br/>(k6 / Locust)"] },
    { n: "7", t: "Approval", col: "#64748B", bg: "#F8FAFC", x: 857, w: 130, items: ["👤 <b>Manual Approval</b><br/>(Platform / QA)", "<div style='font-size:8px;text-align:center;'>or</div>", "🤖 <b>Auto Approval</b><br/>(Policy Engine)"] },
    { n: "8", t: "Deploy to Prod", col: "#16A34A", bg: "#F0FDF4", x: 994, w: 145, items: ["🚀 <b>Blue/Green or<br/>Canary Deploy</b>", "🔄 <b>Traffic Shift</b><br/>(Gradual)", "🩺 <b>Health Checks</b><br/>&amp; Monitoring"] },
    { n: "9", t: "Monitor", col: "#1E3A8A", bg: "#EFF6FF", x: 1146, w: 140, items: ["📈 <b>Monitoring</b><br/>(Cloud Monitoring)", "📑 <b>Logging</b><br/>(Cloud Logging)", "⏱️ <b>SLO / Error</b><br/>Tracking"] }
  ];

  stages.forEach(st => {
    rect(`st_box_${st.n}`, "", st.x, 72, st.w, 240, `fillColor=${st.bg};strokeColor=${st.col};strokeWidth=1;rounded=1;`);
    rect(`st_lbl_${st.n}`, `<div style='font-size:9px;font-weight:800;color:${st.col};'>${st.n} &nbsp; ${st.t}</div>`, st.x, 75, st.w, 14, "strokeColor=none;fillColor=none;align=center;");

    if (st.isGate) {
      diamond("gate_dia", "<div style='font-size:9px;font-weight:800;color:#0F172A;'>All Quality Gates<br/>Passed?</div>", st.x + 10, 110, st.w - 20, 68, "fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;");
      rect("gate_fail", "<div style='font-size:9px;font-weight:700;color:#DC2626;'>🔔 Notify &amp; Fail<br/><span style='color:#64748B;font-size:8px;'>(Dev / Slack / Email)</span></div>", st.x + 8, 220, st.w - 16, 44, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;padding=2;");
      edge(nid(), "No", "gate_dia", "gate_fail", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.2;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=6;fontStyle=1;");
    } else if (st.items) {
      const itemH = (210 - st.items.length * 6) / st.items.length;
      st.items.forEach((it, idx) => {
        const iy = 94 + idx * (itemH + 6);
        rect(`st_${st.n}_it_${idx}`, `<div style='font-size:9px;color:#0F172A;'>${it}</div>`, st.x + 6, iy, st.w - 12, itemH, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
      });
    }
  });

  // Stage Connectors
  edge(nid(), "", "st_box_1", "st_box_2", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "st_box_2", "st_box_3", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "st_box_3", "st_box_4", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "st_box_4", "gate_dia", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "Yes", "gate_dia", "st_box_6", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.2;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=6;fontStyle=1;");
  edge(nid(), "", "st_box_6", "st_box_7", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "st_box_7", "st_box_8", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
  edge(nid(), "", "st_box_8", "st_box_9", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");

  // 3. PIPELINE ENABLERS (x=20..1300, y=320..370)
  rect("box_enablers", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:3px;text-align:center;'>PIPELINE ENABLERS (Integrated Across All Stages)</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>🔒 <b>Secrets Manager</b><br/>(Secrets)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>🔑 <b>Cloud KMS</b><br/>(Encryption)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>👤 <b>Workload Identity</b><br/>(Federation)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>🛡️ <b>Artifact Signing</b><br/>(Cosign)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>📜 <b>Policy as Code</b><br/>(OPA / Conftest)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>🏗️ <b>IaC with Terraform</b><br/>(Env Provisioning)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>⚙️ <b>Config Management</b><br/>(Helm / Kustomize)</div></div>", 20, 320, 1266, 50, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;padding=2;");

  // 4. DEPLOYMENT PATTERNS (x=20..1300, y=378..540)
  rect("box_patterns", "", 20, 378, 1266, 160, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_patterns", "<span style='font-size:10px;font-weight:800;color:#1E3A8A;'>DEPLOYMENT PATTERNS</span>", 20, 380, 1266, 12, "strokeColor=none;fillColor=none;align=center;");

  // Sub-Pattern 1: Blue/Green
  rect("dp_bg_box", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:6px;text-align:center;'>Blue / Green Deployment</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:16px;'><div style='border:1px solid #2563EB;background:#EFF6FF;padding:6px;border-radius:4px;'><b>Version N</b><br/>(Blue)</div> <div>➔</div> <div style='border:1px solid #64748B;background:#F8FAFC;padding:6px;border-radius:4px;'>🔄<br/>Traffic Switch</div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:6px;border-radius:4px;'><b>Version N+1</b><br/>(Green)</div></div>", 30, 396, 380, 134, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // Sub-Pattern 2: Canary
  rect("dp_canary_box", "<div style='font-size:9px;font-weight:800;color:#D97706;margin-bottom:6px;text-align:center;'>Canary Deployment</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:10px;'><div>👥<br/>Users</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:4px;border-radius:4px;'>⚖️<br/>Load Balancer</div> <div>➔</div> <div style='display:flex;flex-direction:column;gap:4px;'><div style='border:1px solid #2563EB;background:#EFF6FF;padding:3px;border-radius:3px;'><b>Version N</b> (90%)</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:3px;border-radius:3px;'><b>Version N+1</b> (10%)</div></div></div>", 420, 396, 420, 134, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // Sub-Pattern 3: Rolling
  rect("dp_roll_box", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:6px;text-align:center;'>Rolling Deployment</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:16px;'><div style='border:1px solid #CBD5E1;background:#EFF6FF;padding:6px;border-radius:4px;'>📦 Pod 1</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#EFF6FF;padding:6px;border-radius:4px;'>📦 Pod 2</div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:6px;border-radius:4px;'>📦 Pod 3</div></div><div style='font-size:8px;color:#64748B;text-align:center;margin-top:12px;'>Update Pods / Instances in Batches</div>", 850, 396, 426, 134, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // 5. FAR RIGHT COLUMN: QUALITY GATES, STRATEGIES, COMPLIANCE, TRIGGERS (x=1296..1560, y=72..540)
  rect("box_r_qg", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>QUALITY GATES (Must Pass)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ All Unit Tests Passed<br/>✔ Code Coverage ≥ 80%<br/>✔ Security Scans Passed (No Critical / High)<br/>✔ No License Violations<br/>✔ IaC Validation Passed<br/>✔ Performance Thresholds Met<br/>✔ Manual Approval (If Required)</div>", 1296, 72, 264, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_strat", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>DEPLOYMENT STRATEGIES</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🔄 <b>Blue/Green</b> – Zero downtime<br/>👥 <b>Canary</b> – Reduced risk, gradual rollout<br/>📦 <b>Rolling</b> – Incremental updates<br/>🛡️ <b>Rollback</b> – Automated / Manual</div>", 1296, 198, 264, 90, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_comp", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>COMPLIANCE &amp; GOVERNANCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📑 <b>Audit Logs</b> (Cloud Audit Logs)<br/>📋 <b>Change Management</b> (Approval Records)<br/>📦 <b>SBOM Generation</b> (CycloneDX)<br/>🛡️ <b>Artifact Provenance</b> (SLSA Level 3)<br/>🗃️ <b>Retention Policy</b> (Images / Logs)</div>", 1296, 294, 264, 110, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_trig", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;'>PIPELINE TRIGGERS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🔀 <b>Push to Branch</b> &nbsp;|&nbsp; 👥 <b>Pull Request Merge</b><br/>👤 <b>Manual Trigger</b> &nbsp;|&nbsp; ⏱️ <b>Scheduled Trigger</b><br/>🏷️ <b>Release Tag</b></div>", 1296, 410, 264, 128, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. BOTTOM ROW: BENEFITS, TECHNOLOGIES, NOTES, LEGEND (x=20..1560, y=546..740)
  rect("bot_benefits", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>✔ Faster delivery with automated pipeline<br/>✔ High code quality with quality gates<br/>✔ Secure by design with integrated scans<br/>✔ Consistent deployments with IaC<br/>✔ Reduced risk with progressive delivery<br/>✔ Full visibility with monitoring &amp; audit trails</div>", 20, 546, 320, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_techs", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;text-align:center;'>TECHNOLOGIES</div><div style='font-size:9px;color:#0F172A;display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;text-align:center;margin-top:10px;'><div>⚡<br/>Cloud Build</div> <div>⚙️<br/>GKE</div> <div>📦<br/>Artifact Reg</div> <div>🚀<br/>Cloud Deploy</div> <div>📑<br/>Monitoring</div> <div>💻<br/>GitHub</div> <div>📊<br/>SonarQube</div> <div>🛡️<br/>Snyk</div> <div>🔍<br/>Trivy</div> <div>🏗️<br/>Terraform</div></div>", 350, 546, 440, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:9px;line-height:1.4;color:#64748B;'>• All images are scanned and signed before deployment.<br/>• Use Workload Identity – no static keys in pipeline.<br/>• Rollback can be triggered manually or automatically.<br/>• All environments follow GitOps-ready practices.<br/>• Pipeline as Code stored in repository (/ci-cd/).</div>", 800, 546, 400, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_legend", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>── Pipeline Flow<br/>- - Conditional Flow<br/>······ Cross-Cutting Enablement<br/>🟦 Tool / Service &nbsp; <span style='background:#F0FDF4;border:1px solid #16A34A;padding:1px 3px;border-radius:2px;'>■</span> Environment / Deployment<br/>◇ Decision Gate &nbsp; 🔔 Notification / Alert</div>", 1210, 546, 350, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_20_ci_cd_pipeline" name="Template 20: CI/CD Pipeline">
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
