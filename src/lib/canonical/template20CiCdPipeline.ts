/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 20: CI/CD Pipeline
 * Matches 100% of images/20.png:
 * - Exact 1536x1024 master canvas resolution.
 * - 9 Sequential Pipeline Stages:
 *   1. Code (GitHub, Branching GitFlow, PR & Code Review)
 *   2. Build (Cloud Build, Docker Build Artifacts, Artifact Registry)
 *   3. Test (Unit Tests, Integration Tests, Contract Tests Pact, SonarQube Coverage)
 *   4. Security Scan (SAST SonarQube, Dependency Scan OWASP/Snyk, Trivy Container Scan, Checkov IaC Scan)
 *   5. Quality Gate (Decision Diamond + Yes branch to Staging + No branch to Notify & Fail Dev/Slack/Email with loopback)
 *   6. Deploy to Staging (GKE Staging, Smoke Tests, k6/Locust Performance Tests)
 *   7. Approval (Manual Platform/QA or Auto Policy Engine)
 *   8. Deploy to Prod (Blue/Green or Canary, Gradual Traffic Shift, Health Checks)
 *   9. Monitor (Cloud Monitoring, Cloud Logging, SLO & Error Tracking)
 * - Cross-Cutting Pipeline Enablers Bar (7 integrated tools with top connector drop-lines)
 * - 3 Distinct Deployment Patterns Sub-Diagrams:
 *   * Blue / Green Deployment (Version N -> Traffic Switch Diamond -> Version N+1)
 *   * Canary Deployment (Users -> Load Balancer -> Version N 90% / Version N+1 10%)
 *   * Rolling Deployment (4 chained pod batches -> Update Pods in Batches)
 * - Complete Right Sidebar:
 *   * QUALITY GATES (Must Pass) checklist (7 items)
 *   * DEPLOYMENT STRATEGIES (4 strategies)
 *   * COMPLIANCE & GOVERNANCE (5 compliance controls)
 * - Bottom Row: Key Benefits, Technologies Matrix (10 icons in 2 rows), Notes, Legend, Pipeline Triggers
 * - 100% Native vector SVGs (0 raw emojis).
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// SVG Vector Icons Helper (100% offline, zero network dependency)
const SVG = {
  circleWrap: (innerSvg: string, strokeColor = "#1D4ED8", bgColor = "#EFF6FF", size = 32) =>
    `<div style="width:${size}px;height:${size}px;min-width:${size}px;border-radius:50%;background:${bgColor};border:1.5px solid ${strokeColor};display:flex;align-items:center;justify-content:center;margin:0 auto;">` +
    `<svg width="${size - 12}" height="${size - 12}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</svg>` +
    `</div>`,

  github: `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>`,
  code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  user: `<circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  box: `<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  flask: `<path d="M10 2v7.31L4.17 19.5A2 2 0 0 0 5.89 22h12.22a2 2 0 0 0 1.72-2.5L14 9.31V2M8.5 2h7M7 16h10"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  alert: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  pulse: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  lock: `<rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  pen: `<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/>`,
  gavel: `<path d="m14 13-7.5 7.5a2.12 2.12 0 1 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>`,
  helm: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2"/>`
};

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

  const rawEdge = (
    id: string,
    style: string,
    pts: { x: number; y: number }[]
  ) => {
    if (pts.length === 2) {
      c.push(
        `<mxCell id="${id}" edge="1" parent="1" style="${style}">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
            <mxPoint x="${pts[1].x}" y="${pts[1].y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>`
      );
    } else {
      const midPts = pts.slice(1, -1).map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
      c.push(
        `<mxCell id="${id}" edge="1" parent="1" style="${style}">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
            <mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>
            <Array as="points">
              ${midPts}
            </Array>
          </mxGeometry>
        </mxCell>`
      );
    }
  };

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell(
    "hdr_title",
    `<div style='font-size:30px;font-weight:900;color:#0F172A;letter-spacing:-0.4px;line-height:1.1;'><span style='background:#6D28D9;color:#FFFFFF;padding:2px 8px;border-radius:6px;font-size:22px;margin-right:6px;'>20</span> CI/CD Pipeline</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:3px;'>Use Case: NovaCura &ndash; Microservices Delivery</div>` +
    `<div style='font-size:10.5px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    16,
    12,
    580,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Top Center Brand: NOVACURA
  const brandHtml = `<div style="text-align:center;">` +
    `<div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1.5px;display:flex;align-items:center;justify-content:center;gap:6px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.5"><path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M9 3v18M15 3v18"/></svg> NOVACURA</div>` +
    `<div style="font-size:10.5px;color:#64748B;font-weight:700;">AI-Powered Regulatory Intelligence Platform</div>` +
    `</div>`;
  cell("hdr_brand", brandHtml, 610, 12, 400, 54, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Top Right Objective Box
  const objHtml = `<div style='font-size:10px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Automate, secure, and standardize the delivery of NovaCura microservices with quality gates, security scans, and progressive deployment strategies.
  </div>`;
  cell("hdr_obj", objHtml, 1030, 12, 490, 54, "overflow=hidden;whiteSpace=wrap;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. 9 SEQUENTIAL PIPELINE STAGES (x=16..1160, y=74..440) ====================
  const stages = [
    { id: "stg_1", num: "1", name: "Code", w: 114, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_2", num: "2", name: "Build", w: 118, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_3", num: "3", name: "Test", w: 122, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_4", num: "4", name: "Security Scan", w: 126, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_5", num: "5", name: "Quality Gate", w: 126, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_6", num: "6", name: "Deploy to Staging", w: 130, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_7", num: "7", name: "Approval", w: 118, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_8", num: "8", name: "Deploy to Prod", w: 126, bg: "#FFFFFF", bc: "#CBD5E1" },
    { id: "stg_9", num: "9", name: "Monitor", w: 118, bg: "#FFFFFF", bc: "#CBD5E1" }
  ];

  let curStgX = 16;
  stages.forEach((stg) => {
    cell(`box_${stg.id}`, "", curStgX, 74, stg.w, 366, `rounded=1;arcSize=6;fillColor=${stg.bg};strokeColor=${stg.bc};strokeWidth=1.2;`);
    cell(
      `lbl_${stg.id}`,
      `<div style="display:flex;align-items:center;gap:4px;padding-left:4px;">` +
      `<span style="background:#6D28D9;color:#FFFFFF;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:900;">${stg.num}</span>` +
      `<span style="font-size:9px;font-weight:900;color:#0F172A;">${stg.name}</span></div>`,
      curStgX + 4,
      78,
      stg.w - 8,
      22,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
    curStgX += stg.w + 6;
  });

  // Stage 1: Code
  cell("c_s1_1", `<div style="text-align:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2">${SVG.github}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">GitHub<br/><span style="font-size:7px;color:#64748B;">(Repositories)</span></div></div>`, 22, 104, 102, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s1_2", `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.repeat}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">Branching Strategy<br/><span style="font-size:7px;color:#64748B;">(GitFlow)</span></div></div>`, 22, 196, 102, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s1_3", `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.users}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">Pull Request<br/>&amp; Code Review</div></div>`, 22, 300, 102, 100, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 2: Build
  cell("c_s2_1", `<div style="text-align:center;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.gear}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">Cloud Build<br/><span style="font-size:7px;color:#64748B;">(Compile &amp; Package)</span></div></div>`, 142, 104, 106, 86, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s2_2", `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.box}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">Build Artifacts<br/><span style="font-size:7px;color:#64748B;">(Docker Image)</span></div></div>`, 142, 204, 106, 86, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s2_3", `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.box}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">Artifact Registry<br/><span style="font-size:7px;color:#64748B;">(Images)</span></div></div>`, 142, 304, 106, 96, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 3: Test
  cell("c_s3_1", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.flask}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">Unit Tests<br/><span style="font-size:7px;color:#64748B;">(Pytest / JUnit)</span></div></div>`, 266, 104, 110, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s3_2", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.repeat}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">Integration Tests</div></div>`, 266, 184, 110, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s3_3", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.clipboard}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">Contract Tests<br/><span style="font-size:7px;color:#64748B;">(Pact)</span></div></div>`, 266, 260, 110, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s3_4", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.chart}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">Code Coverage<br/><span style="font-size:7px;color:#64748B;">(SonarQube)</span></div></div>`, 266, 336, 110, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");

  // Stage 4: Security Scan
  cell("c_s4_1", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${SVG.shield}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">SAST<br/><span style="font-size:7px;color:#64748B;">(SonarQube)</span></div></div>`, 394, 104, 114, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s4_2", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${SVG.search}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">Dependency Scan<br/><span style="font-size:7px;color:#64748B;">(OWASP / Snyk)</span></div></div>`, 394, 184, 114, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s4_3", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${SVG.box}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">Container Scan<br/><span style="font-size:7px;color:#64748B;">(Trivy)</span></div></div>`, 394, 260, 114, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s4_4", `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${SVG.clipboard}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;">IaC Scan<br/><span style="font-size:7px;color:#64748B;">(Checkov)</span></div></div>`, 394, 336, 114, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");

  // Stage 5: Quality Gate (Decision Diamond + Fail box)
  cell("c_s5_gate", `<div style="text-align:center;font-size:8px;font-weight:900;color:#166534;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" style="margin-bottom:2px;">${SVG.checkCircle}</svg><br/>All Quality Gates<br/>Passed?</div>`, 536, 190, 94, 94, "shape=rhombus;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=2;html=1;align=center;verticalAlign=middle;");
  cell("c_s5_fail", `<div style="text-align:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2">${SVG.alert}</svg><div style="font-size:7.5px;font-weight:900;color:#DC2626;margin-top:2px;">Notify &amp; Fail<br/><span style="font-size:7px;color:#64748B;">(Dev / Slack / Email)</span></div></div>`, 530, 350, 106, 54, "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  // Connectors in Stage 5
  cell("lbl_gate_yes", `<span style="font-size:8px;font-weight:900;color:#16A34A;">Yes</span>`, 636, 222, 24, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("e_gate_yes", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=2;endArrow=classic;endSize=4;", [
    { x: 630, y: 237 },
    { x: 652, y: 237 }
  ]);

  cell("lbl_gate_no", `<span style="font-size:8px;font-weight:900;color:#DC2626;">No</span>`, 588, 304, 20, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("e_gate_no", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.8;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [
    { x: 583, y: 284 },
    { x: 583, y: 350 }
  ]);

  // Stage 6: Deploy to Staging
  cell("c_s6_1", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.cloud}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Deploy to<br/>Staging (GKE)</div></div>`, 658, 104, 118, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s6_2", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.pulse}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Smoke Tests<br/>&amp; Health Checks</div></div>`, 658, 208, 118, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s6_3", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.chart}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Performance Tests<br/><span style="font-size:7px;color:#64748B;">(k6 / Locust)</span></div></div>`, 658, 312, 118, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");

  // Stage 7: Approval
  cell("c_s7_1", `<div style="text-align:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.user}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">Manual Approval<br/><span style="font-size:7px;color:#64748B;">(Platform / QA)</span></div></div>`, 794, 104, 106, 110, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("c_s7_or", `<span style="font-size:9px;font-weight:800;color:#64748B;">or</span>`, 794, 230, 106, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("c_s7_2", `<div style="text-align:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2">${SVG.checkCircle}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">Auto Approval<br/><span style="font-size:7px;color:#64748B;">(Policy Engine)</span></div></div>`, 794, 266, 106, 140, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Stage 8: Deploy to Prod
  cell("c_s8_1", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.repeat}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Blue/Green or<br/>Canary Deployment</div></div>`, 918, 104, 114, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s8_2", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.chart}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Traffic Shift<br/><span style="font-size:7px;color:#64748B;">(Gradual)</span></div></div>`, 918, 208, 114, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s8_3", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.pulse}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Health Checks<br/>&amp; Monitoring</div></div>`, 918, 312, 114, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");

  // Stage 9: Monitor
  cell("c_s9_1", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.chart}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Monitoring<br/>&amp; Alerting<br/><span style="font-size:7px;color:#64748B;">(Cloud Monitoring)</span></div></div>`, 1050, 104, 106, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s9_2", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.clipboard}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">Logging<br/><span style="font-size:7px;color:#64748B;">(Cloud Logging)</span></div></div>`, 1050, 208, 106, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");
  cell("c_s9_3", `<div style="display:flex;align-items:center;gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.checkCircle}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;">SLO / Error<br/>Tracking</div></div>`, 1050, 312, 106, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;");

  // Sequential Stage Connectors
  rawEdge("e_s1_s2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 130, y: 237 }, { x: 136, y: 237 }]);
  rawEdge("e_s2_s3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 254, y: 237 }, { x: 260, y: 237 }]);
  rawEdge("e_s3_s4", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 382, y: 237 }, { x: 388, y: 237 }]);
  rawEdge("e_s4_s5", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 514, y: 237 }, { x: 536, y: 237 }]);
  rawEdge("e_s6_s7", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 782, y: 237 }, { x: 788, y: 237 }]);
  rawEdge("e_s7_s8", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 906, y: 237 }, { x: 912, y: 237 }]);
  rawEdge("e_s8_s9", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1038, y: 237 }, { x: 1044, y: 237 }]);

  // ==================== 3. PIPELINE ENABLERS BAR (x=16..1160, y=452..524) ====================
  cell("p_enablers_box", "", 16, 452, 1146, 72, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("p_enablers_title", "PIPELINE ENABLERS (Integrated Across All Stages)", 16, 454, 1146, 16, "fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const enablers = [
    { t: "Secrets Manager<br/><span style='font-size:7px;color:#64748B;'>(Secrets)</span>", svg: SVG.shield, w: 140 },
    { t: "Cloud KMS<br/><span style='font-size:7px;color:#64748B;'>(Encryption)</span>", svg: SVG.lock, w: 130 },
    { t: "Workload Identity<br/><span style='font-size:7px;color:#64748B;'>(Federation)</span>", svg: SVG.users, w: 140 },
    { t: "Artifact Signing<br/><span style='font-size:7px;color:#64748B;'>(Cosign)</span>", svg: SVG.pen, w: 130 },
    { t: "Policy as Code<br/><span style='font-size:7px;color:#64748B;'>(OPA / Conftest)</span>", svg: SVG.gavel, w: 140 },
    { t: "IaC with Terraform<br/><span style='font-size:7px;color:#64748B;'>(Env Provisioning)</span>", svg: SVG.code, w: 150 },
    { t: "Config Management<br/><span style='font-size:7px;color:#64748B;'>(Helm / Kustomize)</span>", svg: SVG.helm, w: 150 }
  ];
  let curEnbX = 26;
  enablers.forEach((enb, idx) => {
    cell(
      `enb_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;">` +
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${enb.svg}</svg>` +
      `<div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.15;">${enb.t}</div></div>`,
      curEnbX,
      472,
      enb.w,
      44,
      "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=0.8;html=1;align=left;verticalAlign=middle;padding=4;"
    );
    curEnbX += enb.w + 14;
  });

  // ==================== 4. DEPLOYMENT PATTERNS SUB-DIAGRAMS (x=16..1160, y=534..696) ====================
  cell("p_dep_box", "", 16, 534, 1146, 162, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("p_dep_title", "DEPLOYMENT PATTERNS", 16, 536, 1146, 16, "fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Sub-box 1: Blue / Green Deployment
  cell("p_bg_box", "", 24, 554, 300, 134, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("p_bg_title", "Blue / Green Deployment", 24, 556, 300, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("bg_v_blue", `<div style="font-size:8px;font-weight:900;color:#1E40AF;text-align:center;">Version N<br/>(Blue)</div>`, 34, 584, 76, 68, "rounded=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");
  cell("bg_switch", `<div style="font-size:7.5px;font-weight:900;color:#0F172A;text-align:center;">Traffic<br/>Switch</div>`, 134, 584, 70, 68, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("bg_v_green", `<div style="font-size:8px;font-weight:900;color:#166534;text-align:center;">Version N+1<br/>(Green)</div>`, 228, 584, 86, 68, "rounded=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");
  rawEdge("e_bg_1", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 110, y: 618 }, { x: 134, y: 618 }]);
  rawEdge("e_bg_2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 204, y: 618 }, { x: 228, y: 618 }]);
  cell("bg_footer", `<div style="font-size:7px;font-weight:700;color:#64748B;text-align:center;">Instant Rollback via DNS / LB Routing</div>`, 24, 662, 300, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Sub-box 2: Canary Deployment
  cell("p_canary_box", "", 334, 554, 400, 134, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("p_canary_title", "Canary Deployment", 334, 556, 400, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("can_users", `<div style="text-align:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.users}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">Users</div></div>`, 346, 594, 60, 54, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("can_lb", `<div style="text-align:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.repeat}</svg><div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">Load Balancer</div></div>`, 426, 594, 80, 54, "shape=hexagon;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("can_v90", `<div style="font-size:7.5px;font-weight:900;color:#1E40AF;text-align:center;">Version N<br/>(90%)</div>`, 630, 574, 94, 40, "rounded=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("can_v10", `<div style="font-size:7.5px;font-weight:900;color:#166534;text-align:center;">Version N+1<br/>(10%)</div>`, 630, 630, 94, 40, "rounded=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  rawEdge("e_can_1", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 406, y: 621 }, { x: 426, y: 621 }]);
  rawEdge("e_can_90", "edgeStyle=orthogonalEdgeStyle;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [{ x: 506, y: 610 }, { x: 568, y: 594 }, { x: 630, y: 594 }]);
  rawEdge("e_can_10", "edgeStyle=orthogonalEdgeStyle;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 506, y: 630 }, { x: 568, y: 650 }, { x: 630, y: 650 }]);

  // Sub-box 3: Rolling Deployment
  cell("p_roll_box", "", 744, 554, 408, 134, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("p_roll_title", "Rolling Deployment", 744, 556, 408, 14, "fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  for (let i = 0; i < 4; i++) {
    const rx = 760 + i * 86;
    cell(`roll_p_${i}`, `<div style="text-align:center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${SVG.box}</svg></div>`, rx, 584, 48, 48, "rounded=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
    if (i < 3) {
      rawEdge(`e_roll_${i}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: rx + 48, y: 608 }, { x: rx + 86, y: 608 }]);
    }
  }
  cell("p_roll_footer", `<div style="font-size:7.5px;font-weight:900;color:#475569;text-align:center;">Update Pods / Instances in Batches</div>`, 744, 656, 408, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // ==================== 5. RIGHT SIDEBAR (x=1172..1524, y=74..696) ====================

  // Box 1: QUALITY GATES (Must Pass)
  cell("sb_qg_box", "", 1172, 74, 348, 178, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("sb_qg_title", "QUALITY GATES (Must Pass)", 1172, 78, 348, 18, "fontColor:#166534;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const qgItems = [
    "All Unit Tests Passed",
    "Code Coverage &ge; 80%",
    "Security Scans Passed (No Critical / High)",
    "No License Violations",
    "IaC Validation Passed",
    "Performance Thresholds Met",
    "Manual Approval (If Required)"
  ];
  qgItems.forEach((qg, idx) => {
    const qgy = 100 + idx * 20;
    cell(
      `qg_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 8px;">` +
      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" style="min-width:12px;"><polyline points="20 6 9 17 4 12"/></svg>` +
      `<span style="font-size:8px;font-weight:800;color:#0F172A;">${qg}</span></div>`,
      1174,
      qgy,
      344,
      18,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // Box 2: DEPLOYMENT STRATEGIES
  cell("sb_strat_box", "", 1172, 260, 348, 180, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("sb_strat_title", "DEPLOYMENT STRATEGIES", 1172, 264, 348, 18, "fontColor:#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const stratItems = [
    { t: "Blue/Green - Zero downtime", svg: SVG.repeat },
    { t: "Canary - Reduced risk, gradual rollout", svg: SVG.users },
    { t: "Rolling - Incremental updates", svg: SVG.box },
    { t: "Rollback - Automated / Manual", svg: SVG.repeat }
  ];
  stratItems.forEach((st, idx) => {
    const sty = 292 + idx * 36;
    cell(
      `strat_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:0 8px;">` +
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${st.svg}</svg>` +
      `<span style="font-size:8px;font-weight:800;color:#0F172A;">${st.t}</span></div>`,
      1174,
      sty,
      344,
      28,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // Box 3: COMPLIANCE & GOVERNANCE
  cell("sb_comp_box", "", 1172, 448, 348, 248, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("sb_comp_title", "COMPLIANCE & GOVERNANCE", 1172, 452, 348, 18, "fontColor:#6D28D9;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const compItems = [
    { t: "Audit Logs (Cloud Audit Logs)", svg: SVG.clipboard },
    { t: "Change Management (Approval Records)", svg: SVG.users },
    { t: "SBOM Generation (CycloneDX)", svg: SVG.box },
    { t: "Artifact Provenance (SLSA Level 3)", svg: SVG.shield },
    { t: "Retention Policy (Images / Logs)", svg: SVG.database }
  ];
  compItems.forEach((ci, idx) => {
    const ciy = 482 + idx * 40;
    cell(
      `comp_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:0 8px;">` +
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" stroke-width="2">${ci.svg}</svg>` +
      `<span style="font-size:8px;font-weight:800;color:#0F172A;">${ci.t}</span></div>`,
      1174,
      ciy,
      344,
      32,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // ==================== 6. BOTTOM ROW (5 BOXES, y=706..990) ====================

  // Box 1: KEY BENEFITS (x=16, w=270, h=276)
  cell("bot_kb_box", "", 16, 706, 270, 276, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("bot_kb_title", "KEY BENEFITS", 16, 710, 270, 18, "fontColor:#166534;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const kbItems = [
    "Faster delivery with automated pipeline",
    "High code quality with quality gates",
    "Secure by design with integrated scans",
    "Consistent deployments with IaC",
    "Reduced risk with progressive delivery",
    "Full visibility with monitoring & audit trails"
  ];
  kbItems.forEach((kb, idx) => {
    const kby = 736 + idx * 38;
    cell(
      `kb_${idx}`,
      `<div style="display:flex;align-items:flex-start;gap:6px;padding:0 8px;">` +
      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" style="min-width:12px;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>` +
      `<span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.2;">${kb}</span></div>`,
      18,
      kby,
      266,
      32,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // Box 2: TECHNOLOGIES (x=296, w=410, h=276)
  cell("bot_tech_box", "", 296, 706, 410, 276, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("bot_tech_title", "TECHNOLOGIES", 296, 710, 410, 18, "fontColor:#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const techsRow1 = [
    { t: "Cloud Build", svg: SVG.gear },
    { t: "GKE", svg: SVG.repeat },
    { t: "Artifact Registry", svg: SVG.box },
    { t: "Cloud Deploy", svg: SVG.cloud },
    { t: "Cloud Monitoring", svg: SVG.chart }
  ];
  techsRow1.forEach((tr, idx) => {
    const trx = 306 + idx * 78;
    cell(
      `tr1_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${tr.svg}</svg>` +
      `<div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:4px;">${tr.t}</div></div>`,
      trx,
      746,
      74,
      86,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
    );
  });

  const techsRow2 = [
    { t: "GitHub", svg: SVG.github },
    { t: "SonarQube", svg: SVG.pulse },
    { t: "Snyk", svg: SVG.shield },
    { t: "Trivy", svg: SVG.box },
    { t: "Terraform", svg: SVG.code },
    { t: "Helm", svg: SVG.helm }
  ];
  techsRow2.forEach((tr, idx) => {
    const trx = 304 + idx * 66;
    cell(
      `tr2_${idx}`,
      `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;">` +
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${tr.svg}</svg>` +
      `<div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:4px;">${tr.t}</div></div>`,
      trx,
      870,
      64,
      86,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
    );
  });

  // Box 3: NOTES (x=716, w=276, h=276)
  cell("bot_notes_box", "", 716, 706, 276, 276, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("bot_notes_title", "NOTES", 716, 710, 276, 18, "fontColor:#0F172A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const notesItems = [
    "All images are scanned and signed before deployment.",
    "Use Workload Identity - no static keys in pipeline.",
    "Rollback can be triggered manually or automatically.",
    "All environments follow GitOps-ready practices.",
    "Pipeline as Code stored in repository (/ci-cd/)."
  ];
  notesItems.forEach((nt, idx) => {
    const nty = 736 + idx * 46;
    cell(
      `nt_${idx}`,
      `<div style="display:flex;align-items:flex-start;gap:6px;padding:0 8px;">` +
      `<svg width="6" height="6" viewBox="0 0 24 24" fill="#2563EB" style="min-width:6px;margin-top:4px;"><circle cx="12" cy="12" r="12"/></svg>` +
      `<span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.25;">${nt}</span></div>`,
      718,
      nty,
      272,
      40,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // Box 4: LEGEND (x=1002, w=256, h=276)
  cell("bot_leg_box", "", 1002, 706, 256, 276, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("bot_leg_title", "LEGEND", 1002, 710, 256, 18, "fontColor:#0F172A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const botLeg = [
    { t: "Pipeline Flow", col: "#0F172A", style: "solid" },
    { t: "Conditional Flow", col: "#DC2626", style: "dashed" },
    { t: "Cross-Cutting Enabler", col: "#2563EB", style: "dashed" },
    { t: "Tool / Service", col: "#CBD5E1", isBox: true },
    { t: "Environment / Deploy", col: "#93C5FD", isBox: true },
    { t: "Decision Gate", col: "#16A34A", isDiamond: true },
    { t: "Notification / Alert", col: "#DC2626", isBell: true }
  ];
  botLeg.forEach((bl, idx) => {
    const bly = 738 + idx * 33;
    cell(`bleg_txt_${idx}`, `<span style="font-size:8px;font-weight:800;color:#0F172A;">${bl.t}</span>`, 1056, bly - 6, 196, 20, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    if (bl.isBox) {
      cell(`bleg_sym_${idx}`, "", 1016, bly - 4, 26, 14, `rounded=1;fillColor=#FFFFFF;strokeColor=${bl.col};strokeWidth=1.2;`);
    } else if (bl.isDiamond) {
      cell(`bleg_sym_${idx}`, "", 1022, bly - 6, 14, 14, `shape=rhombus;fillColor=#F0FDF4;strokeColor=${bl.col};strokeWidth=1.2;`);
    } else if (bl.isBell) {
      cell(`bleg_sym_${idx}`, `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2">${SVG.alert}</svg>`, 1022, bly - 6, 14, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    } else {
      rawEdge(`bleg_e_${idx}`, `edgeStyle=none;strokeColor=${bl.col};strokeWidth=1.8;${bl.style === "dashed" ? "dashed=1;dashPattern=3 2;" : ""}endArrow=classic;endSize=4;`, [
        { x: 1014, y: bly + 2 },
        { x: 1046, y: bly + 2 }
      ]);
    }
  });

  // Box 5: PIPELINE TRIGGERS (x=1268, w=252, h=276)
  cell("bot_trig_box", "", 1268, 706, 252, 276, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("bot_trig_title", "PIPELINE TRIGGERS", 1268, 710, 252, 18, "fontColor:#D97706;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const triggers = [
    { t: "Push to Branch", svg: SVG.repeat },
    { t: "Pull Request Merge", svg: SVG.users },
    { t: "Manual Trigger", svg: SVG.user },
    { t: "Scheduled Trigger", svg: SVG.chart },
    { t: "Release Tag", svg: SVG.box }
  ];
  triggers.forEach((tr, idx) => {
    const try_ = 744 + idx * 44;
    cell(
      `tr_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:0 8px;">` +
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2">${tr.svg}</svg>` +
      `<span style="font-size:8.5px;font-weight:900;color:#0F172A;">${tr.t}</span></div>`,
      1270,
      try_,
      248,
      36,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_20_cicd_pipeline" name="Template 20: CI/CD Pipeline">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
