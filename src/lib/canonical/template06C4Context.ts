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
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:0.5px;font-family:sans-serif;">C4 Context Architecture</div>
        <div style="font-size:12px;font-weight:600;color:#64748B;margin-top:2px;">C4 Level 1 System Boundary — Internal Actors, Core Capability Modules, External Systems &amp; Governance</div>
      </td>
    </tr>
  </table>`;
  text("header_title", titleHtml, 20, 16, 1150, 52, "align=left;");

  // =========================================================================
  // 2. TOP CONTAINER: GOVERNANCE & OVERSIGHT (x: 230 to 1170, y: 78 to 142)
  // =========================================================================
  rect("gov_box", "", 230, 78, 940, 68, "rounded=1;strokeColor=#1D4ED8;strokeWidth=1.2;fillColor=#EFF6FF;shadow=0;");
  text("gov_title", "<b>GOVERNANCE &amp; OVERSIGHT</b>", 240, 80, 920, 18, "fontSize=9;fontColor=#1E40AF;align=center;");

  const govPods = [
    { title: "Executive\nSteering Committee", icon: "●" },
    { title: "Data Governance\nCouncil", icon: "●" },
    { title: "Risk & Compliance\nCommittee", icon: "●" },
    { title: "Architecture Review\nBoard", icon: "●" },
    { title: "Change & Release\nAdvisory Board", icon: "●" },
    { title: "Privacy & Ethics\nBoard", icon: "●" },
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
    { title: "Research Scientists", desc: "Discover, design and develop\nnew therapies", icon: "●" },
    { title: "Clinical Operations", desc: "Plan, execute and monitor\nclinical trials", icon: "●" },
    { title: "Regulatory Affairs Specialists", desc: "Prepare submissions and manage\nregulatory commitments", icon: "●" },
    { title: "Safety / PV Specialists", desc: "Monitor safety, manage cases\nand signal detection", icon: "●" },
    { title: "Quality Teams", desc: "Ensure quality, GxP compliance\nand CAPA management", icon: "●" },
    { title: "Medical Affairs", desc: "Medical evidence, publications\nand stakeholder education", icon: "🩺" },
    { title: "Commercial Analytics", desc: "Market insights, forecasting and\nperformance analytics", icon: "●" },
    { title: "Platform Admins", desc: "Manage platform, users,\nsecurity & integrations", icon: "●" },
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
          <div style="font-size:8px;color:#64748B;line-height:1.15;margin-top:1px;">${u.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`user_pod_${i}`, html, 24, uy, 192, 58, "rounded=1;strokeColor=#E2E8F0;fillColor=#F8FAFC;");
  });

  // =========================================================================
  // 4. CENTRAL SYSTEM BOUNDARY: NOVACURA PLATFORM (x: 230 to 1170, y: 156 to 690)
  // =========================================================================
  rect("platform_box", "", 230, 156, 940, 534, "rounded=1;strokeColor=#0284C7;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");

  // Center System Boundary Header & Description
  const centerHdrHtml = `<div style="text-align:center;padding:4px;">
    <div style="font-size:14px;font-weight:900;color:#0F2A4A;letter-spacing:0.5px;">CORE SYSTEM BOUNDARY (SYSTEM IN SCOPE)</div>
    <div style="font-size:9.5px;font-weight:800;color:#0284C7;letter-spacing:0.4px;margin-top:2px;">UNIFIED DOMAIN APPLICATION &amp; AI WORKFLOW PLATFORM</div>
    <div style="font-size:8.5px;color:#64748B;margin-top:4px;line-height:1.3;">
      Integrated enterprise digital boundary for clinical, regulatory, safety,<br/>quality, medical, commercial, and AI-driven knowledge workflows.
    </div>
  </div>`;
  text("center_hdr", centerHdrHtml, 240, 164, 920, 72, "align=center;");

  // 8 Core Modules Grid (2 rows x 4 columns) — Rich architectural capabilities, protocols & SLAs
  const coreModules = [
    {
      num: "01",
      name: "R&amp;D &amp; Clinical Trial Operations",
      sub: "Protocol design, eCRF &amp; CDISC ODM",
      bullets: "• Study startup &amp; site activation<br/>• EDC / CTMS real-time trial sync<br/>• Risk-based monitoring (RBM)",
      badge: "CDISC • HL7 FHIR • 99.95% SLA"
    },
    {
      num: "02",
      name: "Global Regulatory Affairs",
      sub: "Submission dossier &amp; authority lifecycle",
      bullets: "• eCTD M1–M5 dossier assembly<br/>• ISO IDMP substance &amp; product sync<br/>• Health Authority query tracking",
      badge: "eCTD 4.0 • ISO IDMP • ESG"
    },
    {
      num: "03",
      name: "Safety &amp; Pharmacovigilance",
      sub: "Adverse event intake &amp; signal analytics",
      bullets: "• Automated E2B(R3) ICSR case triage<br/>• MedDRA coding &amp; narrative synthesis<br/>• Disproportionality signal detection",
      badge: "ICH E2B(R3) • MedDRA • PRR"
    },
    {
      num: "04",
      name: "Quality &amp; GxP Manufacturing",
      sub: "QMS, batch release &amp; deviation control",
      bullets: "• Automated CAPA &amp; change control<br/>• Electronic batch record (eBR) review<br/>• LIMS COA &amp; stability release gate",
      badge: "21 CFR Part 11 • EU Annex 11"
    },
    {
      num: "05",
      name: "Medical Information &amp; Evidence",
      sub: "Scientific affairs &amp; HCP inquiry hub",
      bullets: "• Approved scientific response letters<br/>• Real-World Evidence (RWE) synthesis<br/>• Congress &amp; publication workflow",
      badge: "SRD • Fair Balance • RWE"
    },
    {
      num: "06",
      name: "Commercial &amp; Market Access",
      sub: "Omnichannel insights &amp; launch analytics",
      bullets: "• Territory &amp; formulary access analytics<br/>• Patient adherence &amp; hub telemetry<br/>• Next-best-action HCP orchestration",
      badge: "Omnichannel • KPI Marts"
    },
    {
      num: "07",
      name: "Controlled Document &amp; Knowledge Hub",
      sub: "Enterprise GxP repository &amp; semantic index",
      bullets: "• Immutable versioning &amp; e-signatures<br/>• Automated OCR &amp; chunking pipeline<br/>• Hybrid vector + BM25 knowledge graph",
      badge: "KMS CMEK • SHA-256 Audit"
    },
    {
      num: "08",
      name: "Governed AI Copilot &amp; Workflow Engine",
      sub: "Multi-agent orchestration &amp; HITL guardrails",
      bullets: "• Grounded RAG with inline citations<br/>• PII/PHI redaction &amp; policy guardrails<br/>• Human-in-the-loop approval gates",
      badge: "Agent Runtime • HITL • <1.2s"
    },
  ];

  coreModules.forEach((m, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const mx = 250 + col * 225;
    const my = 244 + row * 180;

    const html = `<div style="padding:6px 8px;text-align:left;height:100%;box-sizing:border-box;">
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #BAE6FD;padding-bottom:4px;">
        <span style="background:#0F2A4A;color:#FFFFFF;font-size:8.5px;font-weight:900;padding:2px 6px;border-radius:4px;">MOD ${m.num}</span>
        <span style="background:#E0F2FE;color:#0369A1;font-size:7.5px;font-weight:800;padding:1.5px 6px;border-radius:999px;border:1px solid #7DD3FC;">${m.badge}</span>
      </div>
      <div style="font-size:9.5px;font-weight:900;color:#0F2A4A;margin-top:5px;line-height:1.15;">${m.name}</div>
      <div style="font-size:8px;font-weight:700;color:#0284C7;margin-top:2px;line-height:1.15;">${m.sub}</div>
      <div style="font-size:8px;color:#334155;margin-top:5px;line-height:1.3;">${m.bullets}</div>
    </div>`;
    rect(`core_mod_${i}`, html, mx, my, 215, 166, "rounded=1;fillColor=#F8FAFC;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;");
  });

  // Bottom Sub-Bar: Cloud-Native Foundation & Runtime Architecture
  const gcpSubBarHtml = `<table style="width:100%;height:100%;border-collapse:collapse;">
    <tr>
      <td style="width:33%;text-align:center;vertical-align:middle;border-right:1px solid #CBD5E1;padding:4px 8px;">
        <div style="font-size:9px;font-weight:900;color:#0F2A4A;">CLOUD-NATIVE COMPUTE &amp; MESH</div>
        <div style="font-size:8px;color:#475569;margin-top:2px;">Managed K8s • Serverless Containers • Service Mesh mTLS</div>
      </td>
      <td style="width:34%;text-align:center;vertical-align:middle;border-right:1px solid #CBD5E1;padding:4px 8px;">
        <div style="font-size:9px;font-weight:900;color:#0284C7;">UNIFIED DATA &amp; VECTOR LAKEHOUSE</div>
        <div style="font-size:8px;color:#475569;margin-top:2px;">Transactional SQL • Analytical Warehouse • HNSW Vector Index</div>
      </td>
      <td style="width:33%;text-align:center;vertical-align:middle;padding:4px 8px;">
        <div style="font-size:9px;font-weight:900;color:#6D28D9;">ZERO-TRUST SECURITY &amp; GxP AUDIT</div>
        <div style="font-size:8px;color:#475569;margin-top:2px;">HSM CMEK Encryption • 21 CFR Part 11 Immutable Ledger</div>
      </td>
    </tr>
  </table>`;
  rect("cloud_runtime_bar", gcpSubBarHtml, 250, 614, 900, 58, "rounded=1;fillColor=#F0F9FF;strokeColor=#7DD3FC;strokeWidth=1.2;");

  // =========================================================================
  // 5. RIGHT PANEL: EXTERNAL PARTICIPANTS (x: 1180 to 1540, y: 156 to 690)
  // =========================================================================
  rect("ext_participants_box", "", 1180, 156, 360, 534, "rounded=1;strokeColor=#0D9488;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("ext_participants_hdr", "<b style='font-size:10.5px;color:#FFFFFF;'>EXTERNAL PARTICIPANTS</b>", 1180, 156, 360, 28, "rounded=0;fillColor=#0D9488;strokeColor=#0D9488;align=center;");

  const extParticipants = [
    { title: "CRO / CDMO Partners", desc: "Outsource clinical trial ops, batch manufacturing &amp; bio-analytical study feeds (CDISC / AS2)", icon: "●" },
    { title: "Investigators / Clinical Sites", desc: "Submit eCRF clinical data, site regulatory binders &amp; adverse event safety updates", icon: "●" },
    { title: "Regulatory Authorities", desc: "Receive eCTD / IDMP gateway dossiers, lifecycle submissions &amp; formal query responses", icon: "●" },
    { title: "Patients / Patient Programs", desc: "Access ePRO / eCOA digital portals, adherence support &amp; consent management", icon: "●" },
    { title: "HCPs / Healthcare Providers", desc: "Engage with peer-reviewed medical information, safety alerts &amp; clinical inquiry portals", icon: "●" },
  ];

  extParticipants.forEach((ep, i) => {
    const epy = 192 + i * 98;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:30px;vertical-align:top;padding-top:6px;text-align:center;">
          <span style="font-size:16px;">${ep.icon}</span>
        </td>
        <td style="vertical-align:top;padding-left:6px;text-align:left;">
          <div style="font-size:9.5px;font-weight:800;color:#0F2A4A;line-height:1.2;">${ep.title}</div>
          <div style="font-size:8px;color:#475569;line-height:1.25;margin-top:3px;">${ep.desc}</div>
        </td>
      </tr>
    </table>`;
    rect(`ext_pod_${i}`, html, 1192, epy, 336, 88, "rounded=1;strokeColor=#99F6E4;fillColor=#F0FDFA;");
  });

  // =========================================================================
  // 6. BOTTOM SECTION: ENTERPRISE SYSTEMS, AI SERVICES & PLATFORM (y: 700 to 860)
  // =========================================================================
  rect("ent_sys_box", "", 20, 700, 720, 150, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("ent_sys_title", "<b>ENTERPRISE BUSINESS SYSTEMS (SYSTEMS OF RECORD)</b>", 20, 704, 720, 18, "fontSize=9;fontColor=#1E3A8A;align=center;");

  const entSystems = [
    { title: "Clinical CRM\nPlatform", desc: "CRM & patient\nengagement", icon: "●" },
    { title: "Enterprise ERP\nCore", desc: "Finance, supply\nchain & ERP", icon: "●" },
    { title: "Reg & Quality\nDMS Vault", desc: "Regulatory & quality\ndocuments", icon: "●" },
    { title: "Clinical Trial\nManagement (CTMS)", desc: "Trial planning,\ntracking & reporting", icon: "●" },
    { title: "Laboratory /\nLIMS Systems", desc: "Lab data, results\n& specifications", icon: "●" },
    { title: "Safety Database\n(ICSR Core)", desc: "Safety cases,\nICSRs & analytics", icon: "●" },
    { title: "Data Lake /\nWarehouse", desc: "Curated data\n& analytics", icon: "●" },
    { title: "Identity Provider /\nSSO", desc: "Authentication,\nRBAC & SSO", icon: "●" },
  ];
  entSystems.forEach((es, i) => {
    const esx = 28 + i * 88;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${es.icon}</span><div style="font-size:8px;font-weight:800;color:#0F2A4A;line-height:1.15;margin-top:2px;">${es.title.replace(/\n/g, "<br/>")}</div><div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:2px;">${es.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ent_sys_${i}`, html, esx, 726, 82, 114, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  rect("ai_svc_box", "", 750, 700, 360, 150, "rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;fillColor=#FAF5FF;shadow=0;");
  text("ai_svc_title", "<b>AI / KNOWLEDGE SERVICES</b>", 750, 704, 360, 18, "fontSize=9;fontColor=#6D28D9;align=center;");

  const aiServices = [
    { title: "Enterprise Search /\nKnowledge Base", desc: "Unified search across\ndocuments, data & knowledge", icon: "●" },
    { title: "Vector Index /\nSemantic Search", desc: "HNSW semantic indexing\nfor contextual retrieval", icon: "●" },
    { title: "Enterprise LLM &\nAgent Runtime", desc: "Grounded AI copilots,\ncontent generation & insights", icon: "●" },
  ];
  aiServices.forEach((ai, i) => {
    const aix = 758 + i * 115;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ai.icon}</span><div style="font-size:8px;font-weight:800;color:#6D28D9;line-height:1.15;margin-top:2px;">${ai.title.replace(/\n/g, "<br/>")}</div><div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:2px;">${ai.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ai_svc_${i}`, html, aix, 726, 110, 114, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");
  });

  rect("plat_svc_box", "", 1120, 700, 420, 150, "rounded=1;strokeColor=#15803D;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  text("plat_svc_title", "<b>INTEGRATION / PLATFORM SERVICES</b>", 1120, 704, 420, 18, "fontSize=9;fontColor=#15803D;align=center;");

  const platServices = [
    { title: "API\nGateway", desc: "Secure APIs,\nrouting & throttling", icon: "●" },
    { title: "Event Bus /\nPub/Sub", desc: "Real-time events\n& async messaging", icon: "●" },
    { title: "Workflow\nOrchestration", desc: "Process, rules &\nautomation workflows", icon: "●" },
    { title: "Monitoring /\nAudit Logging", desc: "Observability,\nlogs & audit trails", icon: "●" },
  ];
  platServices.forEach((ps, i) => {
    const psx = 1128 + i * 101;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ps.icon}</span><div style="font-size:8px;font-weight:800;color:#14532D;line-height:1.15;margin-top:2px;">${ps.title.replace(/\n/g, "<br/>")}</div><div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:2px;">${ps.desc.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`plat_svc_${i}`, html, psx, 726, 96, 114, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 7. CROSS-CUTTING CONTROLS & STANDARDS (y: 860 to 925)
  // =========================================================================
  rect("ctrl_box", "", 20, 860, 1520, 62, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#F0F9FF;shadow=0;");
  text("ctrl_title", "<b>CROSS-CUTTING CONTROLS &amp; STANDARDS</b>", 20, 862, 1520, 16, "fontSize=8.5;fontColor=#0369A1;align=center;");

  const controls = [
    { title: "Security & Privacy", desc: "Data protection, encryption, DLP & least privilege", icon: "●" },
    { title: "Audit & Compliance", desc: "GxP / 21 CFR Part 11, e-records & audit trails", icon: "●" },
    { title: "Data Lineage & Quality", desc: "Lineage, provenance, validation & QC", icon: "●" },
    { title: "Interoperability Standards & APIs", desc: "HL7 FHIR, IDMP, CDISC, OpenAPI", icon: "●" },
    { title: "GxP / 21 CFR Part 11 Compliant", desc: "Validated systems, e-signatures, audit trail", icon: "●" },
    { title: "Zero Trust Architecture", desc: "Verify explicitly, continuous monitoring", icon: "●" },
  ];
  controls.forEach((ct, i) => {
    const cx = 30 + i * 251;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:13px;">${ct.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:8px;font-weight:800;color:#0F2A4A;">${ct.title}</div><div style="font-size:8px;color:#64748B;line-height:1.1;">${ct.desc}</div></td></tr></table>`;
    rect(`ct_pod_${i}`, html, cx, 880, 242, 36, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;");
  });

  // =========================================================================
  // 8. LEGEND & ARCHITECTURE METADATA (y: 930 to 962)
  // =========================================================================
  const legendHtml = `<table style="width:100%;height:100%;text-align:left;">
    <tr>
      <td style="width:65px;vertical-align:middle;font-size:9.5px;font-weight:900;color:#0F172A;">LEGEND:</td>
      <td style="vertical-align:middle;">
        <div style="display:flex;align-items:center;gap:16px;font-size:8px;color:#334155;">
          <div style="display:flex;align-items:center;gap:4px;"><span>—</span><div>Information / Data Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#7C3AED;">—</span><div>System Integration / Sync</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#0D9488;">—</span><div>External Collaboration</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#0284C7;">- - </span><div>AI / Knowledge Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#15803D;">- - </span><div>Operational / Telemetry Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>- - - </span><div>Control / Governance Flow</div></div>
        </div>
      </td>
      <td style="width:220px;text-align:right;vertical-align:middle;font-size:8px;color:#64748B;">
        C4 LEVEL 1: SYSTEM CONTEXT • ZERO-TRUST mTLS
      </td>
    </tr>
  </table>`;
  text("legend_footer", legendHtml, 20, 930, 1520, 32, "align=left;");

  // =========================================================================
  // 9. CONNECTORS & PROTOCOL EDGES (Typed, Color-Coded, Collision-Free)
  // =========================================================================
  // Left Users <-> Platform
  c.push(`<mxCell id="e_users_access" value="OIDC / TLS" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=8;fontColor=#1D4ED8;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=0.28;entryX=0;entryY=0.28;" edge="1" parent="1" source="internal_users_box" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_users_notifications" value="HITL Alert" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=8;fontColor=#7C3AED;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=0.72;entryX=0;entryY=0.72;" edge="1" parent="1" source="internal_users_box" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Top Governance -> Platform
  c.push(`<mxCell id="e_gov_oversight" value="GxP Policy" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;fontSize=8;fontColor=#64748B;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="gov_box" target="platform_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // External Partners (Right, 5 Green Arrows — concise protocol badges)
  const extLabels = [
    "CDISC Sync",
    "eCRF Docs",
    "eCTD/IDMP",
    "ePRO API",
    "FHIR Sync",
  ];
  extLabels.forEach((lbl, i) => {
    c.push(`<mxCell id="e_ext_partner_${i}" value="${lbl}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=8;fontColor=#15803D;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=1;exitY=${0.15 + i * 0.18};entryX=0;entryY=0.5;" edge="1" parent="1" source="platform_box" target="ext_pod_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  });

  // Enterprise Systems (Bottom Left, 8 Purple Arrows — clean vertical connectors, single consolidated protocol banner on box)
  for (let i = 0; i < 8; i++) {
    c.push(`<mxCell id="e_ent_sync_${i}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=${0.06 + i * 0.068};exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="platform_box" target="ent_sys_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  // AI Services (Bottom Center, Dashed Blue Arrow)
  c.push(`<mxCell id="e_ai_grounding" value="RAG Search" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=8;fontColor=#1D4ED8;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.72;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="platform_box" target="ai_svc_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Platform Services (Bottom Right, Dashed Green Arrow)
  c.push(`<mxCell id="e_plat_telemetry" value="Audit Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;dashed=1;dashPattern=4 4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;fontSize=8;fontColor=#15803D;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;exitX=0.92;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="platform_box" target="plat_svc_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

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
