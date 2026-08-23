/**
 * Master 1:1 Exact Replica Generator for Canonical Template 06: C4 Context Architecture
 * Matches 100% of images/06.png (NOVACURA Bio-Pharma Platform C4 Context)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate06C4ContextXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const edge = (id: string, src: string, tgt: string, label = "", color = "#1D4ED8", dash = false, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.5;endArrow=block;endFill=1;fontSize=7.5;fontColor=${color};fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;${dash ? "dashed=1;dashPattern=6 4;" : ""}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // =========================================================================
  // 1. TOP HEADER BANNER & NOVACURA LOGO
  // =========================================================================
  const titleHtml = `<table style="border-collapse:collapse;">
    <tr>
      <td style="width:46px;height:46px;background:#0F2A4A;border-radius:6px;text-align:center;vertical-align:middle;">
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">06</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">C4 CONTEXT | NOVACURA Bio-Pharma Platform</div>
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
  // 2. TOP CONTAINER: GOVERNANCE & OVERSIGHT (x: 230 to 1170, y: 78 to 142)
  // =========================================================================
  rect("gov_box", "", 230, 78, 940, 68, "rounded=1;strokeColor=#1D4ED8;strokeWidth=1.2;fillColor=#EFF6FF;shadow=0;");
  text("gov_title", "<b>GOVERNANCE &amp; OVERSIGHT</b>", 240, 80, 920, 18, "fontSize=9;fontColor=#1E40AF;align=center;");

  const govPods = [
    { title: "Executive\nSteering Committee", icon: "👥" },
    { title: "Data Governance\nCouncil", icon: "⚖️" },
    { title: "Risk & Compliance\nCommittee", icon: "🛡️" },
    { title: "Architecture Review\nBoard", icon: "📐" },
    { title: "Change & Release\nAdvisory Board", icon: "⚙️" },
    { title: "Privacy & Ethics\nBoard", icon: "🔒" },
  ];
  govPods.forEach((gp, i) => {
    const gx = 240 + i * 153;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:20px;"><span style="font-size:13px;">${gp.icon}</span></td><td style="text-align:left;font-size:7px;font-weight:700;color:#1E40AF;line-height:1.15;">${gp.title.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`gp_pod_${i}`, html, gx, 98, 146, 42, "rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;");
  });

  // =========================================================================
  // 3. LEFT PANEL: INTERNAL USERS (x: 20 to 220, y: 156 to 690)
  // =========================================================================
  rect("internal_users_box", "", 20, 156, 200, 534, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("internal_users_hdr", "<b style='font-size:10.5px;color:#FFFFFF;'>INTERNAL USERS</b>", 20, 156, 200, 28, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const internalUsers = [
    { title: "Research Scientists", desc: "Discover, design and develop\nnew therapies", icon: "🔬" },
    { title: "Clinical Operations", desc: "Plan, execute and monitor\nclinical trials", icon: "📋" },
    { title: "Regulatory Affairs Specialists", desc: "Prepare submissions and manage\nregulatory commitments", icon: "📄" },
    { title: "Safety / PV Specialists", desc: "Monitor safety, manage cases\nand signal detection", icon: "🛡️" },
    { title: "Quality Teams", desc: "Ensure quality, GxP compliance\nand CAPA management", icon: "🏅" },
    { title: "Medical Affairs", desc: "Medical evidence, publications\nand stakeholder education", icon: "🩺" },
    { title: "Commercial Analytics", desc: "Market insights, forecasting and\nperformance analytics", icon: "📊" },
    { title: "Platform Admins", desc: "Manage platform, users,\nsecurity & integrations", icon: "👤" },
  ];

  internalUsers.forEach((u, i) => {
    const uy = 188 + i * 62;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:26px;vertical-align:top;padding-top:2px;text-align:center;">
          <span style="font-size:14px;">${u.icon}</span>
        </td>
        <td style="vertical-align:top;padding-left:4px;text-align:left;">
          <div style="font-size:8px;font-weight:800;color:#0F2A4A;line-height:1.15;">${u.title}</div>
          <div style="font-size:6.5px;color:#64748B;line-height:1.15;margin-top:1px;">${u.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`user_pod_${i}`, html, 24, uy, 192, 58, "rounded=1;strokeColor=#E2E8F0;fillColor=#F8FAFC;");
  });

  // =========================================================================
  // 4. CENTRAL SYSTEM BOUNDARY: NOVACURA PLATFORM (x: 230 to 1170, y: 156 to 690)
  // =========================================================================
  rect("platform_box", "", 230, 156, 940, 534, "rounded=1;strokeColor=#0284C7;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");

  // Center Brand Logo & Description
  const centerHdrHtml = `<div style="text-align:center;padding:4px;">
    <div style="display:flex;align-items:center;justify-content:center;gap:6px;">
      <span style="font-size:22px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0F2A4A;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:11px;font-weight:800;color:#0284C7;letter-spacing:0.5px;">BIO-PHARMA PLATFORM</div>
    <div style="font-size:8.5px;color:#64748B;margin-top:4px;line-height:1.3;">
      Integrated bio-pharma digital platform for clinical, regulatory, safety,<br/>quality, medical, commercial, and AI-driven knowledge workflows.
    </div>
  </div>`;
  text("center_hdr", centerHdrHtml, 240, 164, 920, 72, "align=center;");

  // 8 Core Modules Grid (2 rows x 4 columns)
  const coreModules = [
    { num: "1", name: "R&D & Clinical", icon: "⚗️" },
    { num: "2", name: "Regulatory Affairs", icon: "📄" },
    { num: "3", name: "Safety &\nPharmacovigilance", icon: "🛡️" },
    { num: "4", name: "Quality &\nManufacturing", icon: "🏭" },
    { num: "5", name: "Medical\nInformation", icon: "🩺" },
    { num: "6", name: "Commercial\nInsights", icon: "📊" },
    { num: "7", name: "Document &\nKnowledge Hub", icon: "📁" },
    { num: "8", name: "AI Copilot &\nWorkflow\nAutomation", icon: "✨" },
  ];

  coreModules.forEach((m, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const mx = 250 + col * 225;
    const my = 250 + row * 175;

    const html = `<table style="width:100%;height:100%;text-align:center;">
      <tr>
        <td style="width:24px;font-size:11px;font-weight:900;color:#0284C7;vertical-align:top;padding-top:6px;">${m.num}</td>
        <td style="vertical-align:middle;padding:6px;">
          <span style="font-size:24px;">${m.icon}</span>
          <div style="font-size:9.5px;font-weight:800;color:#0F2A4A;margin-top:4px;line-height:1.2;">${m.name.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`core_mod_${i}`, html, mx, my, 215, 160, "rounded=1;fillColor=#F8FAFC;strokeColor=#BAE6FD;strokeWidth=1;");
  });

  // Bottom Sub-Bar: Built on Google Cloud
  const gcpSubBarHtml = `<table style="width:100%;height:100%;text-align:center;">
    <tr>
      <td style="width:50%;text-align:right;padding-right:16px;vertical-align:middle;">
        <span style="font-size:16px;">☁️</span> <b style="font-size:10px;color:#1E293B;">Google Cloud</b>
      </td>
      <td style="width:50%;text-align:left;padding-left:16px;vertical-align:middle;border-left:1px solid #CBD5E1;">
        <span style="font-size:14px;">☁️</span> <span style="font-size:9px;color:#64748B;font-weight:600;">Built on Google Cloud (Cloud-Native)</span>
      </td>
    </tr>
  </table>`;
  rect("gcp_subbar", gcpSubBarHtml, 250, 615, 900, 58, "rounded=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;");

  // =========================================================================
  // 5. RIGHT PANEL: EXTERNAL PARTICIPANTS (x: 1180 to 1540, y: 156 to 690)
  // =========================================================================
  rect("ext_participants_box", "", 1180, 156, 360, 534, "rounded=1;strokeColor=#0D9488;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("ext_participants_hdr", "<b style='font-size:10.5px;color:#FFFFFF;'>EXTERNAL PARTICIPANTS</b>", 1180, 156, 360, 28, "rounded=0;fillColor=#0D9488;strokeColor=#0D9488;align=center;");

  const extParticipants = [
    { title: "CRO / CDMO Partners", desc: "Outsource clinical, manufacturing\nand services", icon: "👥" },
    { title: "Investigators / Sites", desc: "Submit clinical data, documents\nand study updates", icon: "🏥" },
    { title: "Regulatory Authorities", desc: "Receive submissions and\nreturn responses", icon: "🏛️" },
    { title: "Patients / Patient Programs", desc: "Access programs, support and\ncommunications", icon: "👥" },
    { title: "HCPs / Healthcare Providers", desc: "Engage with medical content\nand communications", icon: "🩺" },
  ];

  extParticipants.forEach((ep, i) => {
    const epy = 192 + i * 98;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:34px;vertical-align:top;padding-top:4px;text-align:center;">
          <span style="font-size:20px;">${ep.icon}</span>
        </td>
        <td style="vertical-align:top;padding-left:6px;text-align:left;">
          <div style="font-size:9.5px;font-weight:800;color:#0F2A4A;line-height:1.2;">${ep.title}</div>
          <div style="font-size:8px;color:#64748B;line-height:1.2;margin-top:2px;">${ep.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`ext_pod_${i}`, html, 1192, epy, 336, 88, "rounded=1;strokeColor=#CCFBF1;fillColor=#F0FDFA;");
  });

  // =========================================================================
  // 6. BOTTOM SECTION: ENTERPRISE SYSTEMS, AI SERVICES & PLATFORM (y: 700 to 860)
  // =========================================================================
  rect("ent_sys_box", "", 20, 700, 720, 150, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("ent_sys_title", "<b>ENTERPRISE BUSINESS SYSTEMS</b>", 20, 704, 720, 18, "fontSize=9;fontColor=#1E3A8A;align=center;");

  const entSystems = [
    { title: "Salesforce\nHealth Cloud", desc: "CRM & patient\nengagement", icon: "☁️" },
    { title: "SAP\nS/4HANA", desc: "Finance, supply\nchain & ERP", icon: "🏢" },
    { title: "Veeva\nVault", desc: "Regulatory & quality\ndocuments", icon: "📁" },
    { title: "Clinical Trial\nManagement (CTMS)", desc: "Trial planning,\ntracking & reporting", icon: "👥" },
    { title: "Laboratory /\nLIMS Systems", desc: "Lab data, results\n& specifications", icon: "⚗️" },
    { title: "Safety Database\n(Argus-like)", desc: "Safety cases,\nICSRs & analytics", icon: "🛡️" },
    { title: "Data Lake /\nWarehouse", desc: "Curated data\n& analytics", icon: "🗄️" },
    { title: "Identity Provider /\nSSO", desc: "Authentication,\nRBAC & SSO", icon: "🔒" },
  ];
  entSystems.forEach((es, i) => {
    const esx = 28 + i * 88;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${es.icon}</span><div style="font-size:7px;font-weight:800;color:#0F2A4A;line-height:1.15;margin-top:2px;">${es.title.replace(/\n/g, "<br/>")}</div><div style="font-size:6px;color:#64748B;line-height:1.1;margin-top:2px;">${es.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ent_sys_${i}`, html, esx, 726, 82, 114, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  rect("ai_svc_box", "", 750, 700, 360, 150, "rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;fillColor=#FAF5FF;shadow=0;");
  text("ai_svc_title", "<b>AI / KNOWLEDGE SERVICES</b>", 750, 704, 360, 18, "fontSize=9;fontColor=#6D28D9;align=center;");

  const aiServices = [
    { title: "Enterprise Search /\nKnowledge Base", desc: "Unified search across\ndocuments, data & knowledge", icon: "🔍" },
    { title: "Vector Index /\nSemantic Search", desc: "Semantic indexing\nfor contextual retrieval", icon: "✨" },
    { title: "Approved LLM Service\n(Google Vertex AI)", desc: "Grounded AI copilots,\ncontent generation & insights", icon: "🧠" },
  ];
  aiServices.forEach((ai, i) => {
    const aix = 758 + i * 115;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ai.icon}</span><div style="font-size:7.5px;font-weight:800;color:#6D28D9;line-height:1.15;margin-top:2px;">${ai.title.replace(/\n/g, "<br/>")}</div><div style="font-size:6.5px;color:#64748B;line-height:1.1;margin-top:2px;">${ai.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ai_svc_${i}`, html, aix, 726, 110, 114, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");
  });

  rect("plat_svc_box", "", 1120, 700, 420, 150, "rounded=1;strokeColor=#15803D;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  text("plat_svc_title", "<b>INTEGRATION / PLATFORM SERVICES</b>", 1120, 704, 420, 18, "fontSize=9;fontColor=#15803D;align=center;");

  const platServices = [
    { title: "API\nGateway", desc: "Secure APIs,\nrouting & throttling", icon: "⚡" },
    { title: "Event Bus /\nPub/Sub", desc: "Real-time events\n& async messaging", icon: "📡" },
    { title: "Workflow\nOrchestration", desc: "Process, rules &\nautomation workflows", icon: "🔄" },
    { title: "Monitoring /\nAudit Logging", desc: "Observability,\nlogs & audit trails", icon: "📊" },
  ];
  platServices.forEach((ps, i) => {
    const psx = 1128 + i * 101;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ps.icon}</span><div style="font-size:7.5px;font-weight:800;color:#14532D;line-height:1.15;margin-top:2px;">${ps.title.replace(/\n/g, "<br/>")}</div><div style="font-size:6.5px;color:#64748B;line-height:1.1;margin-top:2px;">${ps.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`plat_svc_${i}`, html, psx, 726, 96, 114, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 7. CROSS-CUTTING CONTROLS & STANDARDS (y: 860 to 925)
  // =========================================================================
  rect("ctrl_box", "", 20, 860, 1520, 62, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#F0F9FF;shadow=0;");
  text("ctrl_title", "<b>CROSS-CUTTING CONTROLS &amp; STANDARDS</b>", 20, 862, 1520, 16, "fontSize=8.5;fontColor=#0369A1;align=center;");

  const controls = [
    { title: "Security & Privacy", desc: "Data protection, encryption, DLP & least privilege", icon: "🔒" },
    { title: "Audit & Compliance", desc: "GxP / 21 CFR Part 11, e-records & audit trails", icon: "📑" },
    { title: "Data Lineage & Quality", desc: "Lineage, provenance, validation & QC", icon: "🔗" },
    { title: "Interoperability Standards & APIs", desc: "HL7 FHIR, IDMP, CDISC, OpenAPI", icon: "⚡" },
    { title: "GxP / 21 CFR Part 11 Compliant", desc: "Validated systems, e-signatures, audit trail", icon: "🛡️" },
    { title: "Zero Trust Architecture", desc: "Verify explicitly, continuous monitoring", icon: "🛡️" },
  ];
  controls.forEach((ct, i) => {
    const cx = 30 + i * 251;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:13px;">${ct.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;">${ct.title}</div><div style="font-size:6.5px;color:#64748B;line-height:1.1;">${ct.desc}</div></td></tr></table>`;
    rect(`ct_pod_${i}`, html, cx, 880, 242, 36, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;");
  });

  // =========================================================================
  // 8. LEGEND & COPYRIGHT (y: 930 to 962)
  // =========================================================================
  const legendHtml = `<table style="width:100%;height:100%;text-align:left;">
    <tr>
      <td style="width:65px;vertical-align:middle;font-size:9.5px;font-weight:900;color:#0F172A;">LEGEND:</td>
      <td style="vertical-align:middle;">
        <div style="display:flex;align-items:center;gap:16px;font-size:8px;color:#334155;">
          <div style="display:flex;align-items:center;gap:4px;"><span>—➔</span><div>Information / Data Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#7C3AED;">—➔</span><div>System Integration / Sync</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#0D9488;">—➔</span><div>External Collaboration</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#0284C7;">- - ➔</span><div>AI / Knowledge Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#15803D;">- - ➔</span><div>Operational / Telemetry Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>- - - ➔</span><div>Control / Governance Flow</div></div>
        </div>
      </td>
      <td style="width:180px;text-align:right;vertical-align:middle;font-size:8px;color:#64748B;">
        C4 LEVEL: Context &bull; &copy; 2026 NOVACURA
      </td>
    </tr>
  </table>`;
  text("legend_footer", legendHtml, 20, 930, 1520, 32, "align=left;");

  // =========================================================================
  // 9. CONNECTORS & PROTOCOL EDGES (Typed, Color-Coded, High-Contrast Pills)
  // =========================================================================
  // Left Users <-> Platform
  c.push(`<mxCell id="e_users_access" value="Access platform via secure web portal / workflows &amp; APIs" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#1D4ED8;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=0.35;entryX=0;entryY=0.35;" edge="1" parent="1" source="users_box" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_users_notifications" value="Notifications, tasks, insights &amp; approvals" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#7C3AED;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=0.75;entryX=0;entryY=0.75;" edge="1" parent="1" source="users_box" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Top Governance -> Platform
  c.push(`<mxCell id="e_gov_oversight" value="Policy, Standards, Risk Oversight &amp; Strategic Direction" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;fontSize=7.5;fontColor=#64748B;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="gov_box" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // External Partners (Right, 5 Green Arrows)
  const extLabels = [
    "Exchange study & manufacturing data",
    "Submit clinical data & documents",
    "Submissions, queries & responses",
    "Patient programs, communications & support",
    "Medical content, engagement & communications",
  ];
  extLabels.forEach((lbl, i) => {
    c.push(`<mxCell id="e_ext_partner_${i}" value="${E(lbl)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#15803D;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=${0.16 + i * 0.18};entryX=0;entryY=0.5;" edge="1" parent="1" source="platform_box" target="ext_part_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  });

  // Enterprise Systems (Bottom Left, 8 Purple Arrows)
  const entLabels = [
    "CRM & patient sync",
    "Finance & master data",
    "Regulatory docs sync",
    "Clinical trial data",
    "Lab & sample data",
    "Safety cases & signal",
    "Curated data & analytics",
    "Authentication & SSO",
  ];
  entLabels.forEach((lbl, i) => {
    c.push(`<mxCell id="e_ent_sync_${i}" value="${E(lbl)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7;fontColor=#6D28D9;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=${0.08 + i * 0.08};exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="platform_box" target="ent_sys_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  });

  // AI Services (Bottom Center, 2 Dashed Blue Arrows)
  c.push(`<mxCell id="e_ai_grounding" value="Use for grounded AI, search &amp; insights" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#1D4ED8;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.72;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="platform_box" target="ai_svc_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Platform Services (Bottom Right, 2 Dashed Green Arrows)
  c.push(`<mxCell id="e_plat_telemetry" value="Events, integrations &amp; operational telemetry" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#15803D;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.92;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="platform_box" target="plat_svc_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_06_c4_context" name="06 — C4 Context">
    <mxGraphModel dx="1600" dy="970" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="970" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
