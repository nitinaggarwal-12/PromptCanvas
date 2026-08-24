/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 17: Identity & Access Flow
 * Matches 100% of images/17.png:
 * - Flow step headers ❶ Authenticate ➔ ❷ Authorize ➔ ❸ Access Resources ➔ ❹ Monitor & Audit
 * - Users & Actors + External Partners on the left
 * - Identity Providers & Authentication Methods
 * - Access Management (IAM, Groups, Roles, Conditions, Duration) & Pyramid Privilege Model
 * - Resource Access (Compute, Data, Apps, AI/ML, Networking, Secrets) with clean orthogonal fork routing
 * - Monitoring & Audit + Log Retention box
 * - Policies & Governance cross-cutting bar
 * - Key Benefits, Technologies, Legend on the right
 * - 4-card Architecture Notes banner on bottom
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate17IdentityAccessFlowXml(
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
  cell("hdr_num", "17", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Identity &amp; Access Flow</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Regulatory Intelligence Platform</div>` +
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
    Secure, centralized identity and access management with least privilege access, MFA enforcement, and auditable access.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. FLOW STEP NUMBER HEADERS (y=74..94) ====================
  cell("step_1", "<div style='font-size:10px;font-weight:800;color:#0F172A;'><span style='background:#0F172A;color:#FFFFFF;padding:2px 6px;border-radius:10px;'>1</span> Authenticate</div>", 182, 74, 186, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("step_2", "<div style='font-size:10px;font-weight:800;color:#0F172A;'><span style='background:#0F172A;color:#FFFFFF;padding:2px 6px;border-radius:10px;'>2</span> Authorize</div>", 384, 74, 196, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("step_3", "<div style='font-size:10px;font-weight:800;color:#0F172A;'><span style='background:#0F172A;color:#FFFFFF;padding:2px 6px;border-radius:10px;'>3</span> Access Resources</div>", 596, 74, 250, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("step_4", "<div style='font-size:10px;font-weight:800;color:#0F172A;'><span style='background:#0F172A;color:#FFFFFF;padding:2px 6px;border-radius:10px;'>4</span> Monitor &amp; Audit</div>", 862, 74, 186, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // ==================== 3. LEFT: USERS & ACTORS + EXTERNAL PARTNERS (x=16..166, y=98..770) ====================
  // Users & Actors Box (w=150, h=410)
  cell("box_actors", "", 16, 98, 150, 410, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_actors", "USERS &amp; ACTORS", 16, 98, 150, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const actorList = [
    { id: "act_hum", t: "Human Users<br/>(Employees)", icon: "👤" },
    { id: "act_adm", t: "Admins<br/>(Platform Admins)", icon: "👥" },
    { id: "act_sa", t: "Service Accounts<br/>(Workloads)", icon: "⚙️" },
    { id: "act_app", t: "Applications<br/>(Internal / External)", icon: "💻" }
  ];
  actorList.forEach((ac, idx) => {
    const ay = 132 + idx * 92;
    cell(ac.id, `<div style="font-size:22px;text-align:center;">${ac.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${ac.t}</div>`, 24, ay, 134, 80, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // External Partners Box (w=150, h=250)
  cell("box_partners", "", 16, 520, 150, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_partners", "EXTERNAL PARTNERS", 16, 520, 150, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const partnerList = [
    { id: "pt_reg", t: "Regulatory<br/>Agencies", icon: "🏛️" },
    { id: "pt_vend", t: "Vendors /<br/>Partners", icon: "🏢" },
    { id: "pt_cont", t: "Contractors", icon: "👤" }
  ];
  partnerList.forEach((pt, idx) => {
    const py = 552 + idx * 70;
    cell(pt.id, `<div style="font-size:18px;text-align:center;">${pt.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${pt.t}</div>`, 24, py, 134, 60, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 4. COLUMN 1: IDENTITY PROVIDERS & AUTH METHODS (x=182..368) ====================
  // Identity Providers Box (w=186, h=410)
  cell("box_idp", "", 182, 98, 186, 410, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_idp", "IDENTITY PROVIDERS", 182, 98, 186, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  cell("idp_cloud_id", "<div style='font-size:24px;text-align:center;'>🌐</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Google Cloud Identity</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>(Primary IdP)</div>", 192, 132, 166, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

  cell("lbl_id_fed", "Identity Federation", 182, 236, 186, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const idFedList = [
    { id: "fed_saml", t: "SAML 2.0", icon: "🔑" },
    { id: "fed_oidc", t: "OIDC / OAuth 2.0", icon: "⚡" },
    { id: "fed_ad", t: "Active Directory<br/>(via Cloud LDAP)", icon: "🪟" }
  ];
  idFedList.forEach((fd, idx) => {
    const fy = 258 + idx * 78;
    cell(fd.id, `<div style="font-size:18px;text-align:center;">${fd.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${fd.t}</div>`, 192, fy, 166, 68, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Authentication Methods Box (w=186, h=250)
  cell("box_auth_m", "", 182, 520, 186, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_auth_m", "AUTHENTICATION METHODS", 182, 520, 186, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const authMethods = [
    { t: "Password", icon: "🔒" },
    { t: "MFA (TOTP / Push)", icon: "📱" },
    { t: "Security Keys (FIDO2)", icon: "🔑" },
    { t: "Context-Aware Access<br/>(Device / Location)", icon: "🛡️" }
  ];
  authMethods.forEach((am, idx) => {
    const ay = 552 + idx * 52;
    cell(`am_${idx}`, `<div style="font-size:7.5px;font-weight:700;color:#0F172A;text-align:left;display:flex;align-items:center;padding:2px 6px;"><span style="font-size:14px;margin-right:6px;">${am.icon}</span> ${am.t}</div>`, 190, ay, 170, 44, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;");
  });

  // Pure 0° Horizontal edges: Users & Actors -> Identity Providers
  edge("e_act_to_idp_1", "act_hum", "idp_cloud_id", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_act_to_idp_2", "act_sa", "fed_saml", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_act_to_idp_3", "act_app", "fed_ad", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Pure 0° Horizontal edge: External Partners -> Authentication Methods
  edge("e_part_to_auth", "pt_vend", "box_auth_m", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Pure 270° Vertical edge: Authentication Methods -> Identity Providers
  edge("e_auth_to_idp", "box_auth_m", "box_idp", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=0;entryX=0.5;entryY=1;");

  // ==================== 5. COLUMN 2: ACCESS MANAGEMENT & PRIVILEGE MODEL (x=384..580) ====================
  // Access Management Box (w=196, h=410)
  cell("box_iam", "", 384, 98, 196, 410, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_iam", "ACCESS MANAGEMENT", 384, 98, 196, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const iamItems = [
    { id: "iam_0", t: "IAM<br/>(Identity &amp; Access<br/>Management)", icon: "🛡️" },
    { id: "iam_1", t: "Groups<br/>(Google Groups)", icon: "👥" },
    { id: "iam_2", t: "Roles<br/>(Predefined / Custom)", icon: "🏷️" },
    { id: "iam_3", t: "Conditions<br/>(Context-Aware IAM)", icon: "📋" },
    { id: "iam_4", t: "Access Duration<br/>(Time-bound Access)", icon: "⏱️" }
  ];
  iamItems.forEach((im, idx) => {
    const iy = 132 + idx * 74;
    cell(im.id, `<div style="font-size:18px;text-align:center;">${im.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${im.t}</div>`, 394, iy, 176, 64, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Pure 0° Horizontal edge: Identity Providers -> Access Management
  edge("e_idp_to_iam", "box_idp", "box_iam", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.66;entryX=0;entryY=0.66;");

  // Privilege Model Pyramid Box (w=196, h=250)
  cell("box_priv_model", "", 384, 520, 196, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_priv_model", "PRIVILEGE MODEL", 384, 520, 196, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const pyramidHtml = `<div style="padding:10px;text-align:center;">
    <div style="background:#DCFCE7;border:1px solid #16A34A;border-radius:4px;padding:4px;font-size:8px;font-weight:800;color:#166534;margin-bottom:6px;width:70%;margin-left:auto;margin-right:auto;">Least Privilege</div>
    <div style="background:#BBF7D0;border:1px solid #16A34A;border-radius:4px;padding:6px;font-size:8px;font-weight:800;color:#166534;margin-bottom:6px;width:80%;margin-left:auto;margin-right:auto;">Just-in-Time</div>
    <div style="background:#86EFAC;border:1px solid #16A34A;border-radius:4px;padding:8px;font-size:8px;font-weight:800;color:#166534;margin-bottom:6px;width:90%;margin-left:auto;margin-right:auto;">Role Based Access<br/>Control (RBAC)</div>
    <div style="background:#16A34A;border-radius:4px;padding:10px;font-size:8px;font-weight:800;color:#FFFFFF;width:100%;">Deny by Default</div>
  </div>`;
  cell("txt_pyramid", pyramidHtml, 390, 552, 184, 210, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Pure 90° Vertical edge: Access Management -> Privilege Model
  edge("e_iam_to_priv", "box_iam", "box_priv_model", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // ==================== 6. COLUMN 3: RESOURCE ACCESS (x=596..846, y=98..770, w=250, h=672) ====================
  cell("box_res_acc", "", 596, 98, 250, 672, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_res_acc", "RESOURCE ACCESS", 596, 98, 250, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const resList = [
    { id: "res_cmp", t: "Compute Resources<br/><span style='color:#64748B;font-weight:600;'>(GCE, GKE, Cloud Run)</span>", icon: "⚙️" },
    { id: "res_dat", t: "Data &amp; Storage<br/><span style='color:#64748B;font-weight:600;'>(BigQuery, Cloud Storage, Cloud SQL)</span>", icon: "🗄️" },
    { id: "res_app", t: "Applications<br/><span style='color:#64748B;font-weight:600;'>(Internal Apps, APIs)</span>", icon: "💻" },
    { id: "res_ai", t: "AI / ML Services<br/><span style='color:#64748B;font-weight:600;'>(Vertex AI, Document AI)</span>", icon: "🧠" },
    { id: "res_net", t: "Networking<br/><span style='color:#64748B;font-weight:600;'>(VPC, Load Balancers)</span>", icon: "🌐" },
    { id: "res_sec", t: "Secret &amp; Keys<br/><span style='color:#64748B;font-weight:600;'>(Secret Manager, KMS)</span>", icon: "🔒" }
  ];
  resList.forEach((rs, idx) => {
    const ry = 132 + idx * 104;
    cell(rs.id, `<div style="font-size:22px;text-align:center;">${rs.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.2;margin-top:2px;">${rs.t}</div>`, 606, ry, 230, 92, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  });

  // Strict 0° / 90° Orthogonal fork routing from IAM Roles to Resource Access Cards (zero diagonals)
  edge("e_iam_to_res_0", "iam_2", "res_cmp", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_iam_to_res_1", "iam_2", "res_dat", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_iam_to_res_2", "iam_2", "res_app", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_iam_to_res_3", "iam_2", "res_ai", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_iam_to_res_4", "iam_2", "res_net", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_iam_to_res_5", "iam_2", "res_sec", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 7. COLUMN 4: MONITORING & AUDIT + LOG RETENTION (x=862..1048, y=98..770, w=186, h=672) ====================
  // Monitoring & Audit Box (w=186, h=410)
  cell("box_mon_aud", "", 862, 98, 186, 410, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_mon_aud", "MONITORING &amp; AUDIT", 862, 98, 186, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const monList = [
    { id: "mon_0", t: "Cloud Audit Logs<br/><span style='color:#64748B;font-size:7px;'>(Admin, Data, Access)</span>", icon: "📑" },
    { id: "mon_1", t: "Access Transparency<br/><span style='color:#64748B;font-size:7px;'>(Google AT Logs)</span>", icon: "🔍" },
    { id: "mon_2", t: "Security Command<br/>Center (SCC)", icon: "🛡️" },
    { id: "mon_3", t: "Alerting<br/><span style='color:#64748B;font-size:7px;'>(Cloud Monitoring)</span>", icon: "🚨" },
    { id: "mon_4", t: "Anomaly Detection<br/><span style='color:#64748B;font-size:7px;'>(Chronicle / SCC)</span>", icon: "⚡" }
  ];
  monList.forEach((mn, idx) => {
    const my = 132 + idx * 74;
    cell(mn.id, `<div style="font-size:18px;text-align:center;">${mn.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${mn.t}</div>`, 872, my, 166, 64, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Pure 0° Horizontal edges: Resource Access -> Monitoring
  edge("e_res_to_mon_0", "res_cmp", "mon_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_res_to_mon_1", "res_app", "mon_2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_res_to_mon_2", "res_net", "mon_4", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Log Retention Box (w=186, h=250)
  cell("box_log_ret", "", 862, 520, 186, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_log_ret", "LOG RETENTION", 862, 520, 186, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const logRetHtml = `<div style="text-align:center;padding:12px 6px;">
    <div style="font-size:26px;margin-bottom:6px;">🗃️</div>
    <div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.35;">Logs retained as per<br/>organization policy<br/>(e.g., 400 days)<br/>in Log Bucket /<br/>BigQuery</div>
  </div>`;
  cell("txt_log_ret", logRetHtml, 868, 552, 174, 210, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Pure 90° Vertical edge: Monitoring & Audit -> Log Retention
  edge("e_mon_to_ret", "box_mon_aud", "box_log_ret", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // ==================== 8. BOTTOM CENTER: POLICIES & GOVERNANCE (x=182..1048, y=780..864, w=866, h=84) ====================
  cell("box_gov", "", 182, 780, 866, 84, "rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;");
  cell("lbl_gov", "POLICIES &amp; GOVERNANCE", 182, 782, 866, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#D97706;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const govItems = [
    { t: "Organization Policies<br/>(Constraints)", icon: "🛡️" },
    { t: "Access Approval<br/>(JIT / Manual)", icon: "🔒" },
    { t: "Periodic Access Review<br/>(Access Re-certification)", icon: "📋" },
    { t: "Separation of Duties<br/>(SoD)", icon: "⚖️" },
    { t: "Data Classification<br/>(Public / Confidential / Restricted)", icon: "🏷️" }
  ];
  govItems.forEach((gv, idx) => {
    const gx = 190 + idx * 170;
    cell(`gv_${idx}`, `<div style="font-size:16px;text-align:center;">${gv.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${gv.t}</div>`, gx, 804, 164, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Pure 270° Vertical edges: Policies & Governance -> Authentication & IAM
  edge("e_gov_to_auth", "box_gov", "box_auth_m", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.1;exitY=0;entryX=0.5;entryY=1;");
  edge("e_gov_to_priv", "box_gov", "box_priv_model", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.35;exitY=0;entryX=0.5;entryY=1;");

  // ==================== 9. RIGHT SIDEBAR (x=1060..1520, y=98..864, w=460, h=766) ====================
  // 1. Key Benefits
  cell("box_benefits", "", 1060, 98, 460, 240, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_benefits", "KEY BENEFITS", 1060, 98, 460, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const benefitsHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:6px 12px;">
    ✔ <b>Centralized identity management</b> with federation support<br/><br/>
    ✔ <b>Strong authentication</b> with MFA and contextual access<br/><br/>
    ✔ <b>Least privilege and just-in-time</b> access enforcement<br/><br/>
    ✔ <b>Comprehensive audit &amp; monitoring</b> for compliance<br/><br/>
    ✔ <b>Fine-grained access control</b> for all resources
  </div>`;
  cell("txt_benefits", benefitsHtml, 1064, 126, 452, 208, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // 2. Technologies
  cell("box_tech", "", 1060, 348, 460, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_tech", "TECHNOLOGIES", 1060, 348, 460, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const techHtml = `<div style="font-size:8.5px;line-height:1.7;color:#0F172A;padding:6px 12px;">
    🌐 <b>Google Cloud Identity</b><br/>
    🛡️ <b>IAM</b><br/>
    🔒 <b>Cloud Identity-Aware Proxy</b><br/>
    📑 <b>Cloud Audit Logs</b><br/>
    📈 <b>Cloud Monitoring</b><br/>
    🚨 <b>Security Command Center</b><br/>
    🔑 <b>Secret Manager &amp; Cloud KMS</b>
  </div>`;
  cell("txt_tech", techHtml, 1064, 376, 452, 218, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // 3. Legend
  cell("box_legend", "", 1060, 608, 460, 256, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_legend", "LEGEND", 1060, 608, 460, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const legendHtml = `<table style="width:100%;border-collapse:collapse;font-size:8px;margin-top:4px;line-height:1.4;padding:4px 8px;">
    <tr style="height:22px;"><td style="width:40px;color:#0F172A;font-weight:900;">━━━━►</td><td>Authentication Flow</td></tr>
    <tr style="height:22px;"><td style="color:#0F172A;font-weight:900;">━━━━►</td><td>Authorization / Access Flow</td></tr>
    <tr style="height:22px;"><td style="color:#64748B;font-weight:900;">┈┈┈┈►</td><td>Audit / Log Flow</td></tr>
    <tr style="height:22px;"><td style="color:#2563EB;font-size:12px;">🟦</td><td>Identity / Resource Component</td></tr>
    <tr style="height:22px;"><td style="color:#16A34A;font-size:12px;">🟩</td><td>Access / Authorization Component</td></tr>
    <tr style="height:22px;"><td style="color:#7C3AED;font-size:12px;">🟪</td><td>Monitoring / Audit Component</td></tr>
    <tr style="height:22px;"><td style="color:#D97706;font-size:12px;">🟨</td><td>Policy / Governance Component</td></tr>
  </table>`;
  cell("txt_legend", legendHtml, 1064, 636, 452, 224, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 10. BOTTOM BANNER: ARCHITECTURE NOTES (y=874..954, h=80) ====================
  cell("box_notes_banner", "", 16, 874, 1504, 80, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_notes_banner", "NOTES", 16, 874, 60, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=9;fontStyle=1;align=left;spacingLeft=8;");

  const bottomNotes = [
    { t: "• MFA is enforced for all interactive users.<br/>• Service accounts use workload identity federation.", icon: "🌐" },
    { t: "• All access is logged and immutable.<br/>• Access reviews are performed quarterly.", icon: "✔" },
    { t: "• Use Organization Policies to enforce security posture.<br/>• Deny by default and allow by exception.", icon: "🔒" },
    { t: "• Complies with SOC 2, HIPAA, and ISO 27001 requirements.", icon: "🛡️" }
  ];
  bottomNotes.forEach((bn, idx) => {
    const bx = 80 + idx * 356;
    cell(`bn_${idx}`, `<div style="display:flex;align-items:center;font-size:8px;color:#0F172A;line-height:1.45;"><span style="font-size:20px;margin-right:8px;">${bn.icon}</span> <div>${bn.t}</div></div>`, bx, 894, 346, 52, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // ==================== 11. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>FRAMEWORK:</b> NIST 800-53 / CIS Benchmarks &nbsp;|&nbsp; <b>IDP:</b> Google Cloud Identity + SAML 2.0 &nbsp;|&nbsp; <b>AUTHZ:</b> Context-Aware IAM</div>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Enterprise Security Architecture</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_17_identity_access_flow" name="Template 17: Identity &amp; Access Flow">
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
