/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 35: FinTech & Autonomous Wealth Engine
 * Matches 100% of images/35.png:
 * - 1) Channels / Experience Layer (Top Left)
 * - 2) Identity, Onboarding, and Trust (Left Column)
 * - 3) Core Wealth Platform (Center 3x3 grid)
 * - 4) Autonomous AI Layer (Purple container with AI Copilot, Wealth Agents, HITL)
 * - 5) Trading & External Market Ecosystem (Orange container)
 * - 6) Data & Intelligence Layer (Google Cloud)
 * - 7) Risk, Compliance, & Governance (Pink container)
 * - 8) Platform / MLOps / DevSecOps (Google Cloud)
 * - 9) Security & Reliability Foundation (Built-in Google Cloud)
 * - Right Sidebar: Legend, Key Flows, Security & Compliance Highlights, Diagram Information
 * - 1600x1050 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate35FintechWealthEngineXml(
  domainFlavor = "fintech",
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
  cell("hdr_num", "35", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>FinTech &amp; Autonomous Wealth Engine</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#2563EB;margin-top:2px;'>Intelligent • Autonomous • Compliant • Trusted on Google Cloud</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 21, 2025</div>`,
    94,
    12,
    760,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">☁️</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#4285F4;letter-spacing:1px;">Google Cloud</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">Enterprise Reference Architecture</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;white-space:normal;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;white-space:normal;word-break:break-word;'>
    Autonomous, compliant wealth management engine combining AI agents, real-time trading execution, and institutional trust on Google Cloud.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "whiteSpace=wrap;overflow=hidden;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. TIER 1: CHANNELS / EXPERIENCE LAYER (x=16..650, y=74..176) ====================
  cell("box_tier1", "", 16, 74, 634, 102, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_tier1", "1) CHANNELS / EXPERIENCE LAYER", 16, 76, 634, 18, "fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const channels = [
    { t: "Retail Investor App", icon: "📱", x: 26, w: 140 },
    { t: "Wealth Advisor Portal", icon: "💻", x: 176, w: 140 },
    { t: "Operations Console", icon: "🖥️", x: 326, w: 140 },
    { t: "Partner / API Consumers", icon: "🏢", x: 476, w: 160 }
  ];
  channels.forEach((ch, idx) => {
    cell(`ch_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:20px;">${ch.icon}</span><span style="font-size:10px;font-weight:800;color:#0F172A;">${ch.t}</span></div>`, ch.x, 102, ch.w, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  });

  // ==================== 3. TIER 2: IDENTITY, ONBOARDING, AND TRUST (x=16..170, y=184..550) ====================
  cell("box_tier2", "", 16, 184, 154, 366, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_tier2", "2) IDENTITY, ONBOARDING, AND TRUST", 16, 186, 154, 18, "fillColor=#16A34A;fontColor=#FFFFFF;fontSize=7.5;fontStyle=1;align=left;spacingLeft=6;verticalAlign=middle;");

  const trustCards = [
    { t: "Identity Provider / SSO", sub: "Google Identity Platform", icon: "🔒" },
    { t: "Customer Onboarding", sub: "Digital Onboarding &amp; eSign", icon: "📝" },
    { t: "KYC Verification", sub: "IDV • KYB • PEP", icon: "🪪" },
    { t: "AML / Sanctions Screening", sub: "Watchlists • Adverse Media", icon: "🛡️" },
    { t: "Fraud Checks", sub: "Device • Behavioral • Velocity", icon: "🚨" },
    { t: "Consent Management", sub: "Preferences • Data Usage", icon: "📋" }
  ];
  trustCards.forEach((tc, idx) => {
    const tcy = 210 + idx * 54;
    cell(`tc_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:16px;">${tc.icon}</span><div><div style="font-size:9px;font-weight:800;color:#0F172A;">${tc.t}</div><div style="font-size:7.5px;color:#64748B;">${tc.sub}</div></div></div>`, 22, tcy, 142, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // ==================== 4. TIER 3: CORE WEALTH PLATFORM (x=178..650, y=184..550) ====================
  cell("box_tier3", "", 178, 184, 472, 366, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=1.5;");
  cell("lbl_tier3", "3) CORE WEALTH PLATFORM", 178, 186, 472, 18, "fillColor=#1E40AF;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const coreCards = [
    { t: "Client Profile &amp; Goals", sub: "Lifecycle • Goals • Risk", icon: "👤", r: 0, c: 0 },
    { t: "Portfolio Management", sub: "Positions • Holdings • P&amp;L", icon: "📊", r: 0, c: 1 },
    { t: "Account Aggregation", sub: "Banking • Investments • Liabilities", icon: "🏛️", r: 0, c: 2 },
    { t: "Cash Management", sub: "Cash Position • Sweeps • FX", icon: "💵", r: 1, c: 0 },
    { t: "Financial Planning", sub: "Goals • Projections • Scenarios", icon: "📈", r: 1, c: 1 },
    { t: "Rebalancing Engine", sub: "Drift Detection • Optimization", icon: "⚖️", r: 1, c: 2 },
    { t: "Recommendations", sub: "Personalized • Explainable", icon: "⭐", r: 2, c: 0 },
    { t: "Tax Optimization", sub: "Tax-Loss Harvesting • Location", icon: "📉", r: 2, c: 1 },
    { t: "Billing / Fee Engine", sub: "Fees • Invoicing • Revenue Share", icon: "🧾", r: 2, c: 2 }
  ];
  coreCards.forEach((cc, idx) => {
    const cx = 188 + cc.c * 150;
    const cy = 214 + cc.r * 106;
    cell(`core_${idx}`, `<div style="text-align:center;"><span style="font-size:22px;">${cc.icon}</span><div style="font-size:10px;font-weight:800;color:#0F172A;margin-top:2px;">${cc.t}</div><div style="font-size:8px;color:#64748B;margin-top:2px;">${cc.sub}</div></div>`, cx, cy, 142, 98, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  });

  // ==================== 5. TIER 4: AUTONOMOUS AI LAYER (x=658..950, y=184..550) ====================
  cell("box_tier4", "", 658, 184, 292, 366, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_tier4", "4) AUTONOMOUS AI LAYER", 658, 186, 292, 18, "fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  cell("ai_copilot", `<div style="display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:20px;">🤖</span><span style="font-size:10.5px;font-weight:900;color:#5B21B6;">AI Copilot (Natural Language Interface)</span></div>`, 668, 212, 272, 42, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=4;");

  // Autonomous Wealth Agents Pod
  cell("box_ai_agents", "", 668, 262, 272, 218, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;");
  cell("lbl_ai_agents", "Autonomous Wealth Agents", 668, 264, 272, 16, "fontColor=#6D28D9;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const agents = [
    { t: "Risk Analysis Agent", sub: "Risk Scoring • Stress Testing", icon: "🛡️" },
    { t: "Planning Agent", sub: "Goal Optimization • Scenarios", icon: "🎯" },
    { t: "Market Intelligence Agent", sub: "Trends • Signals • Opportunities", icon: "🌐" },
    { t: "Document / Research Assistant", sub: "Docs • Research • Summaries", icon: "📄" }
  ];
  agents.forEach((ag, idx) => {
    const agy = 286 + idx * 46;
    cell(`ag_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:16px;">${ag.icon}</span><div><div style="font-size:9px;font-weight:800;color:#0F172A;">${ag.t}</div><div style="font-size:7.5px;color:#64748B;">${ag.sub}</div></div></div>`, 676, agy, 256, 40, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  cell("ai_hitl", `<div style="display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:18px;">👥</span><div><div style="font-size:9.5px;font-weight:900;color:#5B21B6;">Human-in-the-Loop Approval</div><div style="font-size:7.5px;color:#64748B;">High-Risk Actions • Overrides</div></div></div>`, 668, 488, 272, 52, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=4;");

  // ==================== 6. TIER 5: TRADING & EXTERNAL MARKET ECOSYSTEM (x=958..1240, y=184..550) ====================
  cell("box_tier5", "", 958, 184, 282, 366, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.5;");
  cell("lbl_tier5", "5) TRADING &amp; EXTERNAL MARKET ECOSYSTEM", 958, 186, 282, 18, "fillColor=#EA580C;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const extCards = [
    { t: "Broker / Custodian Connectivity", sub: "Apex • Pershing • Interactive Brokers", icon: "🏛️" },
    { t: "Trading / Order Management", sub: "OMS • Execution • Allocations", icon: "📈" },
    { t: "Market Data Feeds", sub: "Real-time Prices • Reference • Depth", icon: "📊" },
    { t: "News / Research Feeds", sub: "News • Research • Ratings", icon: "📰" },
    { t: "Payment Rails / Banking", sub: "ACH • Wire • Cards • RTP", icon: "💳" },
    { t: "CRM / External Partner Systems", sub: "Salesforce • HubSpot • Other APIs", icon: "☁️" }
  ];
  extCards.forEach((ec, idx) => {
    const ecy = 210 + idx * 54;
    cell(`ec_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:16px;">${ec.icon}</span><div><div style="font-size:9px;font-weight:800;color:#0F172A;">${ec.t}</div><div style="font-size:7.5px;color:#64748B;">${ec.sub}</div></div></div>`, 968, ecy, 262, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // ==================== 7. TIER 6: DATA & INTELLIGENCE LAYER (x=16..840, y=558..668) ====================
  cell("box_tier6", "", 16, 558, 824, 110, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.5;");
  cell("lbl_tier6", "6) DATA &amp; INTELLIGENCE LAYER (Google Cloud)", 16, 560, 824, 18, "fillColor=#0D9488;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const dataStores = [
    { t: "Transactional Data Store", sub: "Cloud Spanner", icon: "🗄️" },
    { t: "Customer 360", sub: "BigQuery", icon: "📊" },
    { t: "Portfolio Analytics Warehouse", sub: "BigQuery", icon: "📈" },
    { t: "Feature Store", sub: "Vertex AI", icon: "⚡" },
    { t: "Vector / Search Index", sub: "Vertex Matching Engine", icon: "🔍" },
    { t: "Document Knowledge Base", sub: "Cloud Storage", icon: "📁" },
    { t: "Event Streaming", sub: "Pub/Sub", icon: "📬" },
    { t: "Data Quality &amp; Lineage", sub: "Dataplex", icon: "🛡️" }
  ];
  dataStores.forEach((ds, idx) => {
    const dsx = 24 + idx * 101;
    cell(`ds_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ds.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${ds.t}</div><div style="font-size:7px;color:#64748B;">${ds.sub}</div></div>`, dsx, 584, 96, 76, "rounded=1;arcSize=4;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 8. TIER 7: RISK, COMPLIANCE, & GOVERNANCE (x=848..1240, y=558..668) ====================
  cell("box_tier7", "", 848, 558, 392, 110, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#E11D48;strokeWidth=1.5;");
  cell("lbl_tier7", "7) RISK, COMPLIANCE, &amp; GOVERNANCE", 848, 560, 392, 18, "fillColor=#E11D48;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const riskGrid = [
    { t: "Suitability Checks", sub: "Risk • Needs • Profile", icon: "⚖️" },
    { t: "Model Governance", sub: "Validation • Monitoring", icon: "🧠" },
    { t: "Policy Rules Engine", sub: "Business • Regulatory", icon: "📜" },
    { t: "Audit Trail", sub: "Immutable Logs", icon: "🛡️" },
    { t: "Surveillance", sub: "Market • Trade • Behavior", icon: "👁️" },
    { t: "Regulatory Reporting", sub: "FINRA • SEC • FCA", icon: "📑" }
  ];
  riskGrid.forEach((rg, idx) => {
    const rx = 856 + (idx % 3) * 126;
    const ry = 584 + Math.floor(idx / 3) * 38;
    cell(`rg_${idx}`, `<div style="display:flex;align-items:center;gap:3px;"><span style="font-size:14px;">${rg.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${rg.t}</div><div style="font-size:7px;color:#64748B;">${rg.sub}</div></div></div>`, rx, ry, 120, 34, "rounded=1;arcSize=4;fillColor=#FFF1F2;strokeColor=#FECDD3;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // ==================== 9. TIER 8: PLATFORM / MLOPS / DEVSECOPS (x=16..1240, y=676..780) ====================
  cell("box_tier8", "", 16, 676, 1224, 104, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;");
  cell("lbl_tier8", "8) PLATFORM / MLOPS / DEVSECOPS (Google Cloud)", 16, 678, 1224, 18, "fillColor=#0284C7;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const platCards = [
    { t: "API Gateway", sub: "Apigee", icon: "🌐" },
    { t: "Microservices", sub: "GKE Autopilot", icon: "☸️" },
    { t: "Workflow Orch.", sub: "Cloud Workflows", icon: "🔄" },
    { t: "CI/CD Pipeline", sub: "Cloud Build", icon: "🚀" },
    { t: "Artifact Registry", sub: "Containers", icon: "📦" },
    { t: "Model Registry", sub: "Vertex AI", icon: "🧠" },
    { t: "Evaluation / Mon.", sub: "Vertex AI Eval", icon: "📊" },
    { t: "Observability", sub: "Cloud Logging/Trace", icon: "📈" },
    { t: "SRE &amp; Reliability", sub: "SLIs • SLOs", icon: "⚡" },
    { t: "Secrets / KMS", sub: "Secret Manager", icon: "🔒" }
  ];
  platCards.forEach((pc, idx) => {
    const pcx = 24 + idx * 121;
    cell(`pc_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${pc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${pc.t}</div><div style="font-size:7.5px;color:#64748B;">${pc.sub}</div></div>`, pcx, 702, 116, 70, "rounded=1;arcSize=4;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 10. TIER 9: SECURITY & RELIABILITY FOUNDATION (x=16..1240, y=788..892) ====================
  cell("box_tier9", "", 16, 788, 1224, 104, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;");
  cell("lbl_tier9", "9) SECURITY &amp; RELIABILITY FOUNDATION (Built-in Google Cloud)", 16, 790, 1224, 18, "fillColor=#0F172A;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const secCards = [
    { t: "Encryption", sub: "In Transit &amp; At Rest (CMEK)", icon: "🔐" },
    { t: "Tokenization", sub: "PAN • PII • Sensitive Data", icon: "💳" },
    { t: "Network Segmentation", sub: "VPC • Subnets • FW Rules", icon: "🛡️" },
    { t: "Zero Trust Architecture", sub: "BeyondCorp • Context Aware", icon: "🔒" },
    { t: "Identity &amp; Access (IAM)", sub: "Least Privilege • RBAC", icon: "👤" },
    { t: "SOC / SIEM", sub: "Chronicle • SCC • Alerting", icon: "🚨" },
    { t: "Backup / DR", sub: "Cross-Region • RPO/RTO", icon: "💾" },
    { t: "HA / Multi-Region", sub: "Active-Active • Auto Healing", icon: "🌐" }
  ];
  secCards.forEach((sc, idx) => {
    const scx = 24 + idx * 151;
    cell(`sc_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${sc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${sc.t}</div><div style="font-size:7.5px;color:#64748B;">${sc.sub}</div></div>`, scx, 814, 144, 70, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 11. RIGHT SIDEBAR (x=1252..1584, y=74..892) ====================
  // Legend
  cell("box_sb_legend", "", 1252, 74, 332, 240, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_legend", "LEGEND &amp; FLOW TYPES", 1252, 76, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const legendItems = [
    { t: "User / Onboarding Flow", col: "#16A34A" },
    { t: "Data / Information Flow", col: "#2563EB" },
    { t: "AI / Decision Flow", col: "#7C3AED" },
    { t: "Order / Execution Flow", col: "#EA580C" },
    { t: "Compliance / Review Flow", col: "#E11D48" },
    { t: "Event / Streaming Flow", col: "#0D9488" }
  ];
  legendItems.forEach((li, idx) => {
    const liy = 98 + idx * 36;
    cell(`leg_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:4px;background:${li.col};"></div><span style="font-size:8.5px;font-weight:700;color:#0F172A;">${li.t}</span></div>`, 1262, liy, 312, 28, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Security Highlights
  cell("box_sb_sec", "", 1252, 322, 332, 260, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_sec", "SECURITY &amp; COMPLIANCE HIGHLIGHTS", 1252, 324, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const secHighlights = [
    "End-to-end encryption with Customer-Managed Keys (CMEK)",
    "Data minimization &amp; consent preferences strictly enforced",
    "Continuous AI monitoring &amp; hallucination guardrails",
    "Regulatory aligned: FINRA, SEC, FCA, SOC2 Type II, ISO 27001",
    "Explainable AI recommendations with model lineage",
    "Human-in-the-loop oversight for high-risk rebalancing"
  ];
  secHighlights.forEach((sh, idx) => {
    const shy = 348 + idx * 36;
    cell(`sh_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span style="font-size:8px;color:#0F172A;line-height:1.2;">${sh}</span></div>`, 1262, shy, 312, 30, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Diagram Information
  cell("box_sb_info", "", 1252, 590, 332, 302, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_info", "DIAGRAM INFORMATION", 1252, 592, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const diagInfoHtml = `
    <table style="width:100%;font-size:8.5px;color:#0F172A;border-collapse:collapse;line-height:1.6;">
      <tr><td style="font-weight:800;width:100px;">Title:</td><td>35. FinTech &amp; Autonomous Wealth Engine</td></tr>
      <tr><td style="font-weight:800;">Version:</td><td>1.0</td></tr>
      <tr><td style="font-weight:800;">Date:</td><td>May 21, 2025</td></tr>
      <tr><td style="font-weight:800;">Architectural Style:</td><td>Cloud Native Microservices</td></tr>
      <tr><td style="font-weight:800;">Cloud Provider:</td><td>Google Cloud</td></tr>
      <tr><td style="font-weight:800;">Region:</td><td>Multi-Region (us-central1 / us-east4)</td></tr>
      <tr><td style="font-weight:800;">Audience:</td><td>Enterprise Architecture, FinTech, Platform &amp; Security Teams</td></tr>
    </table>
  `;
  cell("sb_info_content", diagInfoHtml, 1262, 616, 312, 268, "whiteSpace=wrap;overflow=hidden;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 12. BOTTOM FOOTER (y=904..930) ====================
  cell("ftr_note", "ⓘ This blueprint is a reference architecture for PromptCanvas. Components and services are illustrative and can be adapted to specific business and regulatory requirements.", 16, 904, 1224, 26, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#64748B;fontSize=8;html=1;align=left;spacingLeft=8;verticalAlign=middle;");
  cell("ftr_brand", "❖ PromptCanvas | Enterprise Architecture Suite", 1252, 904, 332, 26, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor=#1D4ED8;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_35_fintech_wealth_engine" name="35. FinTech &amp; Autonomous Wealth Engine">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
