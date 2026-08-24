/**
 * Master 1:1 Exact Replica Generator for Canonical Template 07: C4 Container Architecture
 * Matches 100% of images/07.png (NOVACURA Bio-Pharma Platform C4 Container)
 * Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping).
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate07C4ContainerXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">07</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">07 — C4 CONTAINER | NOVACURA Bio-Pharma Platform</div>
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
  // 2. LEFT PANEL: INTERNAL USERS (x: 20 to 220, y: 78 to 660)
  // =========================================================================
  rect("internal_users_box", "", 20, 78, 200, 582, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("internal_users_hdr", "<b style='font-size:10.5px;color:#FFFFFF;'>INTERNAL USERS</b>", 20, 78, 200, 26, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const internalUsers = [
    { title: "Research Scientists", desc: "Design studies, manage\nexperiments & data", icon: "🔬" },
    { title: "Clinical Operations", desc: "Run trials, monitor sites,\nparticipants & activities", icon: "📋" },
    { title: "Regulatory Affairs Specialists", desc: "Prepare submissions,\ntrack commitments", icon: "📄" },
    { title: "Safety / PV Specialists", desc: "Detect, evaluate & report\nsafety events", icon: "🛡️" },
    { title: "Quality Teams", desc: "Ensure quality, GxP compliance\n& CAPA management", icon: "🏅" },
    { title: "Medical Affairs", desc: "Medical inquiries, content\n& stakeholder education", icon: "🩺" },
    { title: "Commercial Analytics", desc: "Market insights, forecasting\n& customer analytics", icon: "📊" },
    { title: "Platform Admins", desc: "Manage platform, users,\nsecurity & integrations", icon: "👤" },
  ];

  internalUsers.forEach((u, i) => {
    const uy = 108 + i * 68;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:26px;vertical-align:top;padding-top:2px;text-align:center;"><span style="font-size:14px;">${u.icon}</span></td>
        <td style="vertical-align:top;padding-left:4px;text-align:left;">
          <div style="font-size:8px;font-weight:800;color:#0F2A4A;line-height:1.15;">${u.title}</div>
          <div style="font-size:8px;color:#64748B;line-height:1.15;margin-top:1px;">${u.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`user_pod_${i}`, html, 24, uy, 192, 64, "rounded=1;strokeColor=#E2E8F0;fillColor=#F8FAFC;");
  });

  // =========================================================================
  // 3. CENTRAL PLATFORM BOUNDARY: 13 CONTAINERS (x: 230 to 1310, y: 78 to 660)
  // =========================================================================
  rect("plat_cont_frame", "", 230, 78, 1080, 582, "rounded=1;strokeColor=#0284C7;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");

  const platHdrHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">
    <span style="font-size:22px;">🧬</span>
    <span style="font-size:18px;font-weight:900;color:#0F2A4A;letter-spacing:1.5px;">NOVACURA</span>
    <span style="font-size:11px;font-weight:800;color:#0284C7;letter-spacing:1px;margin-left:4px;">BIO-PHARMA PLATFORM</span>
  </div>`;
  text("plat_hdr", platHdrHtml, 240, 82, 1060, 32, "align=center;");

  // 12 Grid Containers (3 rows x 4 columns)
  const containers = [
    { num: "1", title: "User Experience Portal", desc: "Role-based web portal for users, dashboards, tasks and insights.", icon: "💻" },
    { num: "2", title: "Workflow & Case Management", desc: "Manages business workflows, approvals, tasks, CAPA and case flows.", icon: "🔄" },
    { num: "3", title: "R&D & Clinical App", desc: "Study planning, protocol management, trial oversight & data capture.", icon: "⚗️" },
    { num: "4", title: "Regulatory Affairs App", desc: "Submissions, eCTD / IDMP coordination & authority correspondence.", icon: "📄" },
    { num: "5", title: "Safety & Pharmacovigilance App", desc: "Case intake, signal detection, benefit-risk workflows & reporting.", icon: "🛡️" },
    { num: "6", title: "Quality & Manufacturing App", desc: "Quality events, batch & release visibility, deviations & change control.", icon: "🏭" },
    { num: "7", title: "Medical & Commercial App", desc: "Medical information, customer insights, forecasting & field engagement.", icon: "👥" },
    { num: "8", title: "Document & Content Hub", desc: "Controlled documents, versioning, collaboration & knowledge content.", icon: "📁" },
    { num: "9", title: "Data & Analytics Platform", desc: "Curated enterprises data, analytics, dashboards & semantic model.", icon: "📊" },
    { num: "10", title: "AI Copilot & Knowledge Services", desc: "Grounded copilots, semantic search, summarization & workflow assistance.", icon: "✨" },
    { num: "11", title: "Integration & API Layer", desc: "APIs, events, orchestration, file exchange & external connectivity.", icon: "⚡" },
    { num: "12", title: "Identity & Access Service", desc: "SSO, RBAC, authentication & authorization for apps and services.", icon: "🔒" },
  ];

  containers.forEach((ct, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const cx = 250 + col * 346;
    const cy = 120 + row * 104;

    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:24px;vertical-align:top;padding-top:2px;">
          <div style="width:20px;height:20px;background:#0F2A4A;color:#FFFFFF;border-radius:4px;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;text-align:center;">${ct.num}</div>
        </td>
        <td style="vertical-align:top;padding-left:4px;">
          <div style="display:flex;align-items:center;gap:4px;">
            <span style="font-size:14px;">${ct.icon}</span>
            <div style="font-size:8.5px;font-weight:800;color:#0F2A4A;line-height:1.15;">${ct.title}</div>
          </div>
          <div style="font-size:7px;color:#64748B;line-height:1.2;margin-top:3px;">${ct.desc}</div>
        </td>
      </tr>
    </table>`;
    rect(`c4_cont_${i}`, html, cx, cy, 334, 96, "rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;");
  });

  // 13. Wide Bottom Container: Audit, Monitoring & Compliance Service
  const cont13Html = `<table style="width:100%;height:100%;text-align:center;">
    <tr>
      <td style="width:24px;vertical-align:middle;padding-left:12px;">
        <div style="width:22px;height:22px;background:#0F2A4A;color:#FFFFFF;border-radius:4px;font-size:9.5px;font-weight:900;display:flex;align-items:center;justify-content:center;text-align:center;">13</div>
      </td>
      <td style="vertical-align:middle;padding-left:8px;text-align:left;">
        <span style="font-size:15px;">🛡️</span> <b style="font-size:9.5px;color:#0F2A4A;">Audit, Monitoring &amp; Compliance Service</b>
        <span style="font-size:8px;color:#64748B;margin-left:10px;">Audit logs, monitoring, alerts, compliance evidence &amp; reporting across the platform.</span>
      </td>
    </tr>
  </table>`;
  rect("c4_cont_12", cont13Html, 250, 546, 1040, 102, "rounded=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;");

  // =========================================================================
  // 4. RIGHT PANEL: EXTERNAL PARTICIPANTS (x: 1320 to 1540, y: 78 to 660)
  // =========================================================================
  rect("ext_participants_box", "", 1320, 78, 220, 582, "rounded=1;strokeColor=#0D9488;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("ext_participants_hdr", "<b style='font-size:10.5px;color:#FFFFFF;'>EXTERNAL PARTICIPANTS</b>", 1320, 78, 220, 26, "rounded=0;fillColor=#0D9488;strokeColor=#0D9488;align=center;");

  const extParticipants = [
    { title: "CRO / CDMO Partners", desc: "Collaborate on studies, data\nmanagement & supply", icon: "👥" },
    { title: "Investigators / Sites", desc: "Submit clinical data,\ndocuments & updates", icon: "🏥" },
    { title: "Regulatory Authorities", desc: "Receive submissions,\nqueries & responses", icon: "🏛️" },
    { title: "Patients / Patient Programs", desc: "Access programs, support\n& communications", icon: "👥" },
    { title: "HCPs / Healthcare Providers", desc: "Engage with medical content\n& communications", icon: "🩺" },
  ];

  extParticipants.forEach((ep, i) => {
    const epy = 110 + i * 108;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:30px;vertical-align:top;padding-top:4px;text-align:center;"><span style="font-size:18px;">${ep.icon}</span></td>
        <td style="vertical-align:top;padding-left:4px;text-align:left;">
          <div style="font-size:9px;font-weight:800;color:#0F2A4A;line-height:1.2;">${ep.title}</div>
          <div style="font-size:7.5px;color:#64748B;line-height:1.2;margin-top:2px;">${ep.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`ext_pod_${i}`, html, 1328, epy, 204, 98, "rounded=1;strokeColor=#CCFBF1;fillColor=#F0FDFA;");
  });

  // =========================================================================
  // 5. BOTTOM SECTION: ENTERPRISE SYSTEMS, AI & PLATFORM SERVICES (y: 672 to 830)
  // =========================================================================
  rect("ent_sys_box", "", 20, 672, 720, 150, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("ent_sys_title", "<b>ENTERPRISE SYSTEMS / DATA SOURCES (System of Record)</b>", 20, 676, 720, 18, "fontSize=9;fontColor=#1E3A8A;align=center;");

  const entSystems = [
    { title: "Salesforce\nHealth Cloud", desc: "Patient & HCP\nengagement", icon: "☁️" },
    { title: "SAP\nS/4HANA", desc: "Finance, procurement,\nsupply chain", icon: "🏢" },
    { title: "Veeva\nVault", desc: "Regulatory &\nquality docs", icon: "📁" },
    { title: "Clinical Trial\nManagement (CTMS)", desc: "Study, site &\nsubject mgmt", icon: "👥" },
    { title: "Laboratory /\nLIMS Systems", desc: "Lab data, results\n& samples", icon: "⚗️" },
    { title: "Safety Database\n(Argus-like)", desc: "Safety cases,\nreports & signals", icon: "🛡️" },
    { title: "Data Lake /\nWarehouse", desc: "Structured &\nunstructured data", icon: "🗄️" },
    { title: "Identity Provider /\nSSO", desc: "Enterprise SSO\n& identity mgmt", icon: "🔒" },
  ];
  entSystems.forEach((es, i) => {
    const esx = 28 + i * 88;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${es.icon}</span><div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:2px;">${es.title.replace(/\n/g, "<br/>")}</div><div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:1px;">${es.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ent_sys_${i}`, html, esx, 698, 82, 114, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  rect("ai_svc_box", "", 750, 672, 360, 150, "rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;fillColor=#FAF5FF;shadow=0;");
  text("ai_svc_title", "<b>AI / KNOWLEDGE SERVICES</b>", 750, 676, 360, 18, "fontSize=9;fontColor=#6D28D9;align=center;");

  const aiServices = [
    { title: "Enterprise Search /\nKnowledge Base", desc: "Search, taxonomy & knowledge articles", icon: "🔍" },
    { title: "Vector Index /\nSemantic Search", desc: "Embeddings store & semantic retrieval", icon: "✨" },
    { title: "Approved LLM Service\n(Google Vertex AI)", desc: "Secure, governed LLM for enterprise use", icon: "🧠" },
  ];
  aiServices.forEach((ai, i) => {
    const aix = 758 + i * 115;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ai.icon}</span><div style="font-size:7.5px;font-weight:800;color:#6D28D9;line-height:1.15;margin-top:2px;">${ai.title.replace(/\n/g, "<br/>")}</div><div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:2px;">${ai.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ai_svc_${i}`, html, aix, 698, 110, 114, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");
  });

  rect("plat_svc_box", "", 1120, 672, 420, 150, "rounded=1;strokeColor=#15803D;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  text("plat_svc_title", "<b>PLATFORM SERVICES</b>", 1120, 676, 420, 18, "fontSize=9;fontColor=#15803D;align=center;");

  const platServices = [
    { title: "API\nGateway", desc: "Routing, security\n& throttling", icon: "⚡" },
    { title: "Event Bus /\nPub/Sub", desc: "Realtime events\n& async messaging", icon: "📡" },
    { title: "Workflow\nOrchestration", desc: "Orchestrate\nprocesses & rules", icon: "🔄" },
    { title: "Monitoring /\nAudit Logging", desc: "Metrics, logs,\ntraces & alerts", icon: "📊" },
  ];
  platServices.forEach((ps, i) => {
    const psx = 1128 + i * 101;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ps.icon}</span><div style="font-size:7.5px;font-weight:800;color:#14532D;line-height:1.15;margin-top:2px;">${ps.title.replace(/\n/g, "<br/>")}</div><div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:2px;">${ps.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`plat_svc_${i}`, html, psx, 698, 96, 114, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 6. CROSS-CUTTING CONTROLS (y: 832 to 895)
  // =========================================================================
  rect("ctrl_box", "", 20, 832, 1520, 62, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#F0F9FF;shadow=0;");
  text("ctrl_title", "<b>CROSS-CUTTING CONTROLS &amp; STANDARDS (Apply Across All Containers)</b>", 20, 834, 1520, 16, "fontSize=8.5;fontColor=#0369A1;align=center;");

  const controls = [
    { title: "Security & Privacy", desc: "Encryption, DLP & privacy by design", icon: "🔒" },
    { title: "Audit & Compliance", desc: "Audit trails, retention, eDiscovery", icon: "📑" },
    { title: "Data Lineage & Quality", desc: "Lineage, catalog, QC rules", icon: "🔗" },
    { title: "Interoperability Standards & APIs", desc: "HL7 FHIR, IDMP, CDISC, OpenAPI", icon: "⚡" },
    { title: "GxP / 21 CFR Part 11", desc: "e-Records, eSignatures, validation", icon: "🛡️" },
    { title: "Zero Trust Architecture", desc: "Micro-segmentation, continuous verify", icon: "🛡️" },
  ];
  controls.forEach((ct, i) => {
    const cx = 30 + i * 251;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:13px;">${ct.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7.5px;font-weight:800;color:#0F172A;">${ct.title}</div><div style="font-size:8px;color:#64748B;line-height:1.1;">${ct.desc}</div></td></tr></table>`;
    rect(`ct_pod_${i}`, html, cx, 852, 242, 36, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;");
  });

  // =========================================================================
  // 7. LEGEND & COPYRIGHT (y: 902 to 934)
  // =========================================================================
  const legendHtml = `<table style="width:100%;height:100%;text-align:left;">
    <tr>
      <td style="width:65px;vertical-align:middle;font-size:9.5px;font-weight:900;color:#0F172A;">LEGEND:</td>
      <td style="vertical-align:middle;">
        <div style="display:flex;align-items:center;gap:16px;font-size:8px;color:#334155;">
          <div style="display:flex;align-items:center;gap:4px;"><span>—➔</span><div>User Interaction</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#1D4ED8;">—➔</span><div>System Integration / Data Exchange</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#7C3AED;">- - ➔</span><div>AI / Knowledge Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#0D9488;">- - ➔</span><div>External Collaboration</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>- - - ➔</span><div>Governance / Control Flow</div></div>
        </div>
      </td>
      <td style="width:180px;text-align:right;vertical-align:middle;font-size:8px;color:#64748B;">
        C4 LEVEL: Container &bull; &copy; 2026 NOVACURA
      </td>
    </tr>
  </table>`;
  text("legend_footer", legendHtml, 20, 902, 1520, 32, "align=left;");

  // =========================================================================
  // 8. CONTAINER-TO-CONTAINER WORKFLOW EDGES & PROTOCOL CONNECTORS (Pure 0°, 90°, 180°, 270°)
  // =========================================================================
  // User Access to Container 1 (User Experience Portal) - Pure 0° Horizontal
  c.push(`<mxCell id="e_users_to_c1" value="Access via Secure Web Portal (HTTPS)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#1D4ED8;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=0.2;entryX=0;entryY=0.5;" edge="1" parent="1" source="internal_users_box" target="c4_cont_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  
  // Notifications from AI Copilot (Container 10 / index 9) back to Internal Users - Pure 180° Horizontal
  c.push(`<mxCell id="e_users_notifications" value="Notifications, tasks &amp; insights" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#7C3AED;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0;exitY=0.5;entryX=1;entryY=0.75;" edge="1" parent="1" source="c4_cont_9" target="internal_users_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Row 1 Container Flow: 1 -> 2 -> 3 (Pure 0° Horizontal)
  c.push(`<mxCell id="e_c1_to_c2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_0" target="c4_cont_1"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_c2_to_c3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_1" target="c4_cont_2"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Row 2 Container Flow: 4 -> 5 -> 6 (Pure 0° Horizontal)
  c.push(`<mxCell id="e_c4_to_c5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_3" target="c4_cont_4"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_c5_to_c6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_4" target="c4_cont_5"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Row 3 Container Flow: 7 -> 8 -> 9 (Pure 0° Horizontal)
  c.push(`<mxCell id="e_c7_to_c8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_6" target="c4_cont_7"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_c8_to_c9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_7" target="c4_cont_8"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Row 4 Container Flow: 10 -> 11 -> 12 (Pure 0° Horizontal)
  c.push(`<mxCell id="e_c10_to_c11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_9" target="c4_cont_10"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_c11_to_c12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_10" target="c4_cont_11"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Vertical flows between rows: 1 -> 4, 4 -> 7, 7 -> 10 (Pure 90° Vertical)
  c.push(`<mxCell id="e_c1_to_c4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c4_cont_0" target="c4_cont_3"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_c4_to_c7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c4_cont_3" target="c4_cont_6"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_c7_to_c10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c4_cont_6" target="c4_cont_9"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // External Partners Connections (Right, Green - Pure 0° Horizontal)
  const extLabels = [
    "APIs &amp; Secure Data Exchange (SFTP / API)",
    "Submissions &amp; Responses (HTTPS / APIs)",
    "Regulatory Communications (IDMP / eCTD)",
    "Programs &amp; Communications (Secure Portal / APIs)",
    "Insights, answers &amp; recommendations",
  ];
  extLabels.forEach((lbl, i) => {
    c.push(`<mxCell id="e_ext_cnt_${i}" value="${lbl}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=7.5;fontColor=#15803D;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_cont_${Math.min(i * 3 + 2, 11)}" target="ext_pod_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_07_c4_container" name="07 — C4 Container">
    <mxGraphModel dx="1600" dy="945" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="945" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
