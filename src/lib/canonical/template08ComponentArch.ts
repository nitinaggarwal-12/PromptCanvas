/**
 * Master 1:1 Exact Replica Generator for Canonical Template 08: Component Architecture (LLD)
 * Matches 100% of images/08.png (NOVACURA Bio-Pharma Platform Component Architecture)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate08ComponentArchXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  // =========================================================================
  // 1. TOP HEADER BANNER & NOVACURA LOGO
  // =========================================================================
  const titleHtml = `<table style="border-collapse:collapse;">
    <tr>
      <td style="width:46px;height:46px;background:#0F2A4A;border-radius:6px;text-align:center;vertical-align:middle;">
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">08</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">08 — COMPONENT ARCHITECTURE | NOVACURA Bio-Pharma Platform</div>
        <div style="font-size:12.5px;font-weight:600;color:#64748B;margin-top:2px;">Core Architecture Family | Bio-Pharma Product</div>
      </td>
    </tr>
  </table>`;
  text("header_title", titleHtml, 20, 16, 950, 52, "align=left;");

  const logoHtml = `<table style="text-align:right;float:right;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:26px;">🧬</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1.5px;line-height:1;">NOVACURA</div>
        <div style="font-size:8px;font-weight:700;color:#64748B;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div>
      </td>
    </tr>
  </table>`;
  text("header_logo", logoHtml, 1260, 16, 280, 48, "align=right;");

  // =========================================================================
  // 2. PRIMARY USERS TOP BAR (x: 200 to 1340, y: 76 to 128)
  // =========================================================================
  rect("users_top_frame", "", 200, 76, 1130, 52, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("users_top_title", "<b>PRIMARY USERS</b>", 200, 78, 1130, 14, "fontSize=8.5;fontColor=#1E3A8A;align=center;");

  const primaryUsers = [
    { title: "Research\nScientists", icon: "🔬" },
    { title: "Clinical\nOperations", icon: "👥" },
    { title: "Regulatory\nAffairs", icon: "📄" },
    { title: "Safety/PV\nSpecialists", icon: "🛡️" },
    { title: "Quality\nTeams", icon: "🏅" },
    { title: "Medical\nAffairs", icon: "🩺" },
    { title: "Commercial\nAnalytics", icon: "📊" },
    { title: "Platform\nAdmins", icon: "⚙️" },
  ];
  primaryUsers.forEach((u, i) => {
    const ux = 208 + i * 140;
    const html = `<div style="text-align:center;padding:1px;"><span style="font-size:12px;">${u.icon}</span><div style="font-size:7px;font-weight:800;color:#0F2A4A;line-height:1.15;">${u.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`p_user_${i}`, html, ux, 94, 132, 30, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // =========================================================================
  // 3. LEFT PANEL: SYSTEMS OF RECORD / DATA SOURCES (x: 20 to 190, y: 135 to 680)
  // =========================================================================
  rect("sor_box", "", 20, 135, 170, 540, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("sor_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>SYSTEMS OF RECORD /<br/>DATA SOURCES</b>", 20, 135, 170, 30, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const sorList = [
    { title: "Veeva Vault", sub: "Documents, Quality,\nRegistrations", icon: "📁" },
    { title: "CTMS / Medidata Rave", sub: "Clinical Trials,\nSubject Data", icon: "👥" },
    { title: "Argus Safety", sub: "Safety Cases,\nICSRs, Signals", icon: "🛡️" },
    { title: "SAP S/4HANA", sub: "Finance, Supply Chain,\nProcurement", icon: "🏢" },
    { title: "Salesforce Health Cloud", sub: "HCP Engagement,\nPatient Insights", icon: "☁️" },
    { title: "Laboratory / LIMS", sub: "Lab Data, Results,\nCertificates", icon: "⚗️" },
    { title: "Regulatory Gateways", sub: "eSubmissions, Queries,\nResponses", icon: "🏛️" },
  ];
  sorList.forEach((s, i) => {
    const sy = 170 + i * 72;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:24px;text-align:center;vertical-align:top;padding-top:4px;"><span style="font-size:14px;">${s.icon}</span></td>
        <td style="text-align:left;vertical-align:top;padding-left:4px;">
          <div style="font-size:7.5px;font-weight:800;color:#0F2A4A;line-height:1.15;">${s.title}</div>
          <div style="font-size:6.5px;color:#64748B;line-height:1.1;margin-top:1px;">${s.sub.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`sor_card_${i}`, html, 24, sy, 162, 66, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 4. CENTRAL BOUNDARY: 7 TIERS A TO G (x: 200 to 1340, y: 135 to 680)
  // =========================================================================
  rect("platform_frame", "", 200, 135, 1130, 540, "rounded=1;strokeColor=#0F2A4A;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");
  rect("platform_hdr", "<b style='font-size:11px;color:#FFFFFF;letter-spacing:1px;'>NOVACURA BIO-PHARMA PLATFORM — COMPONENT ARCHITECTURE</b>", 200, 135, 1130, 24, "rounded=0;fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;");

  const layers = [
    {
      code: "A",
      name: "EXPERIENCE & ACCESS LAYER",
      y: 164,
      h: 68,
      color: "#1E3A8A",
      items: [
        { title: "Web Portal /\nWorkspace UI", icon: "🌐" },
        { title: "Role-Based\nDashboards", icon: "📊" },
        { title: "Task Inbox &\nNotifications", icon: "🔔" },
        { title: "API / Partner\nAccess Channel", icon: "⚡" },
      ]
    },
    {
      code: "B",
      name: "PROCESS & ORCHESTRATION LAYER",
      y: 236,
      h: 70,
      color: "#1E40AF",
      items: [
        { title: "Workflow\nOrchestrator", icon: "🔄" },
        { title: "Business Rules\nEngine", icon: "⚙️" },
        { title: "Case / Task\nManagement Service", icon: "📋" },
        { title: "Submission\nOrchestration Service", icon: "📄" },
        { title: "CAPA / Quality\nWorkflow Service", icon: "🛡️" },
      ]
    },
    {
      code: "C",
      name: "DOMAIN BUSINESS SERVICES LAYER",
      y: 310,
      h: 72,
      color: "#0369A1",
      items: [
        { title: "R&D / Clinical\nStudy Service", icon: "🔬" },
        { title: "Regulatory\nAffairs Service", icon: "📄" },
        { title: "Safety &\nPharmacovigilance", icon: "🛡️" },
        { title: "Quality &\nManufacturing", icon: "🏭" },
        { title: "Medical\nInformation", icon: "🩺" },
        { title: "Commercial\nInsights Service", icon: "📊" },
        { title: "Patient Program\nService", icon: "👥" },
        { title: "Document &\nContent Mgmt", icon: "📁" },
      ]
    },
    {
      code: "D",
      name: "AI & KNOWLEDGE SERVICES LAYER",
      y: 386,
      h: 72,
      color: "#6D28D9",
      items: [
        { title: "AI Copilot\nService", icon: "✨" },
        { title: "Prompt / Policy\nGuardrails", icon: "🔒" },
        { title: "Semantic Search &\nRetrieval Service", icon: "🔍" },
        { title: "Vector Index /\nEmbeddings Service", icon: "🕸️" },
        { title: "LLM Gateway\n(Approved Models)", icon: "🧠" },
        { title: "Summarization / Q&A /\nRecommendation", icon: "⭐" },
      ]
    },
    {
      code: "E",
      name: "DATA & ANALYTICS LAYER",
      y: 462,
      h: 70,
      color: "#0D9488",
      items: [
        { title: "Operational\nData Store", icon: "🗄️" },
        { title: "Master Data\nManagement", icon: "📑" },
        { title: "Clinical / Regulatory /\nSafety Data Store", icon: "🛡️" },
        { title: "Data Lakehouse /\nWarehouse", icon: "🗄️" },
        { title: "Analytics &\nKPI Service", icon: "📊" },
        { title: "Audit / Compliance\nEvidence Store", icon: "🔒" },
      ]
    },
    {
      code: "F",
      name: "INTEGRATION & EVENTING LAYER",
      y: 536,
      h: 68,
      color: "#15803D",
      items: [
        { title: "API\nGateway", icon: "⚡" },
        { title: "Event Bus /\nPub/Sub", icon: "📡" },
        { title: "Data Integration\nPipelines", icon: "🌊" },
        { title: "File / eCTD\nExchange Adapter", icon: "📁" },
        { title: "External Connector\nFramework", icon: "🔗" },
      ]
    },
    {
      code: "G",
      name: "CROSS-CUTTING PLATFORM SERVICES",
      y: 608,
      h: 62,
      color: "#334155",
      items: [
        { title: "Identity & Access\nManagement", icon: "👤" },
        { title: "Secrets / Key\nManagement", icon: "🔑" },
        { title: "Monitoring /\nObservability", icon: "📈" },
        { title: "Audit Logging /\nTraceability", icon: "📑" },
        { title: "Data Lineage &\nQuality", icon: "🔗" },
        { title: "Configuration /\nTenant Management", icon: "⚙️" },
      ]
    }
  ];

  layers.forEach((ly) => {
    rect(`ly_badge_${ly.code}`, `<div style="text-align:center;"><b style="font-size:12px;color:#FFFFFF;">${ly.code}</b></div>`, 206, ly.y, 24, ly.h, `rounded=1;fillColor=${ly.color};strokeColor=${ly.color};align=center;`);
    rect(`ly_lbl_${ly.code}`, `<div style="text-align:left;padding-left:4px;"><b style="font-size:7.5px;color:${ly.color};">${ly.name}</b></div>`, 234, ly.y, 160, 16, "strokeColor=none;fillColor=none;");

    const count = ly.items.length;
    const itemW = (1100 - 40) / count;
    ly.items.forEach((it, i) => {
      const ix = 236 + i * itemW;
      const html = `<table style="width:100%;height:100%;text-align:center;">
        <tr>
          <td style="width:18px;"><span style="font-size:12px;">${it.icon}</span></td>
          <td style="text-align:left;font-size:7px;font-weight:700;color:#0F2A4A;line-height:1.15;">${it.title.replace(/\n/g, "<br/>")}</td>
        </tr>
      </table>`;
      rect(`it_${ly.code}_${i}`, html, ix, ly.y + 14, itemW - 8, ly.h - 18, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
    });
  });

  // =========================================================================
  // 5. RIGHT PANEL: EXTERNAL PARTICIPANTS (x: 1350 to 1540, y: 135 to 680)
  // =========================================================================
  rect("ext_part_box", "", 1350, 135, 190, 540, "rounded=1;strokeColor=#0D9488;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("ext_part_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>EXTERNAL PARTICIPANTS</b>", 1350, 135, 190, 30, "rounded=0;fillColor=#0D9488;strokeColor=#0D9488;align=center;");

  const extList = [
    { title: "CRO / CDMO Partners", sub: "Collaborate on studies, data\n& supply chain", icon: "👥" },
    { title: "Investigators / Sites", sub: "Study conduct, data capture\n& updates", icon: "🏥" },
    { title: "Regulatory Authorities", sub: "eSubmissions, queries,\ncompliance comms", icon: "🏛️" },
    { title: "Patients / Patient Programs", sub: "Access programs, support\n& communications", icon: "👥" },
    { title: "HCPs / Healthcare Providers", sub: "Engage with medical content\n& communications", icon: "🩺" },
  ];
  extList.forEach((ep, i) => {
    const epy = 175 + i * 100;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:28px;text-align:center;vertical-align:top;padding-top:4px;"><span style="font-size:16px;">${ep.icon}</span></td>
        <td style="text-align:left;vertical-align:top;padding-left:4px;">
          <div style="font-size:8px;font-weight:800;color:#0F2A4A;line-height:1.2;">${ep.title}</div>
          <div style="font-size:6.5px;color:#64748B;line-height:1.15;margin-top:2px;">${ep.sub.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`ext_card_${i}`, html, 1356, epy, 178, 92, "rounded=1;fillColor=#F0FDFA;strokeColor=#CCFBF1;");
  });

  // =========================================================================
  // 6. BOTTOM: GOOGLE CLOUD TECH MAPPING & CONNECTED APPS (y: 690 to 825)
  // =========================================================================
  rect("tech_map_box", "", 20, 690, 1140, 130, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("tech_map_title", "<b>GOOGLE CLOUD TECHNOLOGY MAPPING</b>", 20, 694, 1140, 16, "fontSize=8.5;fontColor=#0369A1;align=center;");

  const gcpTech = [
    { name: "Compute", tech: "Cloud Run / GKE", icon: "☸️" },
    { name: "API Mgmt", tech: "Apigee", icon: "⚡" },
    { name: "Eventing", tech: "Pub/Sub", icon: "📡" },
    { name: "Processing", tech: "Dataflow", icon: "🌊" },
    { name: "Data Warehouse", tech: "BigQuery", icon: "🔍" },
    { name: "Object Storage", tech: "Cloud Storage", icon: "🗄️" },
    { name: "AI Platform", tech: "Vertex AI", icon: "✨" },
    { name: "Transactional", tech: "AlloyDB / Spanner", icon: "🗄️" },
    { name: "Data Governance", tech: "Dataplex", icon: "🕸️" },
    { name: "Analytics & BI", tech: "Looker", icon: "📊" },
    { name: "Secrets & Keys", tech: "Secret Manager", icon: "🔒" },
    { name: "Logs & Metrics", tech: "Cloud Logging", icon: "📈" },
    { name: "IAM", tech: "Identity Mgmt", icon: "👤" },
  ];
  gcpTech.forEach((gt, i) => {
    const gtx = 26 + i * 86;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:15px;">${gt.icon}</span><div style="font-size:7px;font-weight:800;color:#0F2A4A;margin-top:2px;">${gt.name}</div><div style="font-size:6px;color:#64748B;">${gt.tech}</div></div>`;
    rect(`gcp_tech_${i}`, html, gtx, 716, 80, 96, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // Connected Apps on Right
  rect("conn_apps_box", "", 1170, 690, 370, 130, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("conn_apps_title", "<b>ENTERPRISE APPLICATIONS (CONNECTED)</b>", 1170, 694, 370, 16, "fontSize=8.5;fontColor=#1E3A8A;align=center;");

  const connApps = [
    { title: "Salesforce\nHealth Cloud", icon: "☁️" },
    { title: "SAP\nS/4HANA", icon: "🏢" },
    { title: "Veeva\nVault", icon: "📁" },
    { title: "Medidata\nRave", icon: "👥" },
  ];
  connApps.forEach((ca, i) => {
    const cax = 1178 + i * 89;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ca.icon}</span><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;line-height:1.15;margin-top:4px;">${ca.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`conn_app_${i}`, html, cax, 716, 82, 96, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 7. KEY ARCHITECTURAL CHARACTERISTICS (y: 830 to 890)
  // =========================================================================
  rect("arch_char_box", "", 20, 830, 1520, 56, "rounded=1;strokeColor=#15803D;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  text("arch_char_title", "<b>KEY ARCHITECTURAL CHARACTERISTICS</b>", 20, 832, 1520, 14, "fontSize=8.5;fontColor=#15803D;align=center;");

  const chars = [
    { title: "Compliant by Design", desc: "Built-in compliance with GxP, 21 CFR Part 11, EU Annex 11, HIPAA", icon: "🛡️" },
    { title: "Traceable & Auditable", desc: "End-to-end traceability, audit logging & evidence management", icon: "📑" },
    { title: "AI-Grounded Knowledge", desc: "AI Copilot with governed guardrails & trusted RAG", icon: "🧠" },
    { title: "Scalable Cloud-Native", desc: "Microservices, containers & serverless elasticity", icon: "☁️" },
    { title: "Secure Integration", desc: "API-first, zero trust, encryption at scale", icon: "🔒" },
    { title: "Reusable Shared Services", desc: "Common capabilities reused globally to accelerate delivery", icon: "⚙️" },
  ];
  chars.forEach((ch, i) => {
    const chx = 28 + i * 252;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:12px;">${ch.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7px;font-weight:800;color:#14532D;">${ch.title}</div><div style="font-size:6px;color:#64748B;line-height:1.1;">${ch.desc}</div></td></tr></table>`;
    rect(`ch_pod_${i}`, html, chx, 848, 244, 32, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 8. CONNECTORS & INTER-TIER SERVICE CALLS
  // =========================================================================
  // Primary Users <-> Tier A
  for (let i = 0; i < 8; i++) {
    c.push(`<mxCell id="e_user_to_tierA_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.5;exitY=1;entryX=${0.1 + i * 0.11};entryY=0;" edge="1" parent="1" source="user_pod_${i}" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  // Inter-tier connectors (A <-> B <-> C <-> D <-> E <-> F <-> G)
  c.push(`<mxCell id="e_tierA_to_B" value="Synchronous Service Call" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7;fontColor=#1D4ED8;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.3;exitY=1;entryX=0.3;entryY=0;" edge="1" parent="1" source="ly_badge_A" target="ly_badge_B"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_tierB_to_C" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.3;exitY=1;entryX=0.3;entryY=0;" edge="1" parent="1" source="ly_badge_B" target="ly_badge_C"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_tierC_to_D" value="AI / Knowledge Flow" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7;fontColor=#7C3AED;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.3;exitY=1;entryX=0.3;entryY=0;" edge="1" parent="1" source="ly_badge_C" target="ly_badge_D"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_tierD_to_E" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.3;exitY=1;entryX=0.3;entryY=0;" edge="1" parent="1" source="ly_badge_D" target="ly_badge_E"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_tierE_to_F" value="Async Event Flow" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.4;dashed=1;dashPattern=6 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7;fontColor=#EA580C;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.3;exitY=1;entryX=0.3;entryY=0;" edge="1" parent="1" source="ly_badge_E" target="ly_badge_F"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_tierF_to_G" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.3;exitY=1;entryX=0.3;entryY=0;" edge="1" parent="1" source="ly_badge_F" target="ly_badge_G"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Left SORs <-> Platform
  for (let i = 0; i < 7; i++) {
    c.push(`<mxCell id="e_sor_to_plat_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=1;exitY=0.5;entryX=0;entryY=${0.1 + i * 0.12};" edge="1" parent="1" source="sor_card_${i}" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  // Right External Participants <-> Platform
  for (let i = 0; i < 5; i++) {
    c.push(`<mxCell id="e_ext_to_plat_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0;exitY=0.5;entryX=1;entryY=${0.15 + i * 0.18};" edge="1" parent="1" source="ext_card_${i}" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_08_component_arch" name="08 — Component Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="900" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
