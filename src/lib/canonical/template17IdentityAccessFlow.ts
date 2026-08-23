/**
 * Canonical Architecture Template 17: Template 17: Identity & Access Flow
 * High-fidelity 16:9 replication of images/17.png
 */

export function generateTemplate17IdentityAccessFlowXml(
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
  rect("num_badge", "17", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Identity &amp; Access Flow</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>Secure, centralized identity and access management with least privilege access, MFA enforcement, and auditable access.</div>", 1000, 18, 280, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. 4 TOP FLOW BADGES
  rect("flow_b1", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❶ Authenticate</div>", 250, 85, 140, 26, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("flow_b2", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❷ Authorize</div>", 445, 85, 140, 26, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("flow_b3", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❸ Access Resources</div>", 640, 85, 150, 26, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("flow_b4", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❹ Monitor &amp; Audit</div>", 835, 85, 150, 26, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 3. LEFT COLUMN: USERS & ACTORS + EXTERNAL PARTNERS
  rect("hdr_users", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>USERS &amp; ACTORS</span>", 20, 120, 145, 20, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 140, 145, 270, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("u_human", "<div style='font-size:7.5px;font-weight:700;'>👤<br/>Human Users<br/><span style='font-size:6px;color:#64748B;'>(Employees)</span></div>", 28, 155, 129, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_admin", "<div style='font-size:7.5px;font-weight:700;'>👥<br/>Admins<br/><span style='font-size:6px;color:#64748B;'>(Platform Admins)</span></div>", 28, 215, 129, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_sa", "<div style='font-size:7.5px;font-weight:700;'>⚙️<br/>Service Accounts<br/><span style='font-size:6px;color:#64748B;'>(Workloads)</span></div>", 28, 275, 129, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_apps", "<div style='font-size:7.5px;font-weight:700;'>💻<br/>Applications<br/><span style='font-size:6px;color:#64748B;'>(Internal / External)</span></div>", 28, 335, 129, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // External Partners Box
  rect("hdr_ext_part", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>EXTERNAL PARTNERS</span>", 20, 430, 145, 20, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("box_ext_part", "", 20, 450, 145, 150, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("ep_reg", "<div style='font-size:7.2px;font-weight:700;'>🏛️ Regulatory Agencies</div>", 28, 465, 129, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ep_vend", "<div style='font-size:7.2px;font-weight:700;'>🤝 Vendors / Partners</div>", 28, 505, 129, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ep_con", "<div style='font-size:7.2px;font-weight:700;'>👤 Contractors</div>", 28, 545, 129, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // 4. STAGE 1: AUTHENTICATE
  rect("box_idp", "", 180, 120, 180, 240, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_idp", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>IDENTITY PROVIDERS</span>", 180, 128, 180, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("idp_cloud", "<div style='font-size:7.5px;font-weight:700;'>☁️<br/>Google Cloud Identity<br/><span style='font-size:6px;color:#64748B;'>(Primary IdP)</span></div>", 190, 150, 160, 46, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("lbl_fed", "<span style='font-size:7px;font-weight:800;color:#64748B;'>Identity Federation</span>", 180, 205, 180, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("idp_saml", "<div style='font-size:6.8px;font-weight:700;'>▲ SAML 2.0</div>", 190, 222, 160, 26, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("idp_oidc", "<div style='font-size:6.8px;font-weight:700;'>⚡ OIDC / OAuth 2.0</div>", 190, 256, 160, 26, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("idp_ad", "<div style='font-size:6.8px;font-weight:700;'>🪟 Active Directory<br/><span style='font-size:5.5px;color:#64748B;'>(via Cloud LDAP)</span></div>", 190, 290, 160, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Authentication Methods
  rect("box_auth_meth", "", 180, 375, 180, 165, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;");
  rect("lbl_auth_meth", "<span style='font-size:8px;font-weight:800;color:#D97706;'>AUTHENTICATION METHODS</span>", 180, 382, 180, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("am_pw", "<div style='font-size:7px;font-weight:700;'>🔒 Password</div>", 190, 404, 160, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("am_mfa", "<div style='font-size:7px;font-weight:700;'>📱 MFA (TOTP / Push)</div>", 190, 436, 160, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("am_fido", "<div style='font-size:7px;font-weight:700;'>🔑 Security Keys (FIDO2)</div>", 190, 468, 160, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("am_context", "<div style='font-size:7px;font-weight:700;'>💻 Context-Aware Access<br/><span style='font-size:5.5px;color:#64748B;'>(Device / Location)</span></div>", 190, 500, 160, 30, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "", "box_users", "box_idp", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "box_ext_part", "box_auth_meth", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 5. STAGE 2: AUTHORIZE
  rect("box_iam", "", 380, 120, 180, 260, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_iam", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>ACCESS MANAGEMENT</span>", 380, 128, 180, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("iam_core", "<div style='font-size:7.5px;font-weight:700;'>🛡️<br/>IAM<br/><span style='font-size:6px;color:#64748B;'>(Identity &amp; Access Management)</span></div>", 390, 150, 160, 44, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;");
  rect("iam_grp", "<div style='font-size:7px;font-weight:700;'>👥 Groups (Google Groups)</div>", 390, 202, 160, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("iam_roles", "<div style='font-size:7px;font-weight:700;'>🏷️ Roles (Predefined / Custom)</div>", 390, 236, 160, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("iam_cond", "<div style='font-size:7px;font-weight:700;'>📑 Conditions (Context-Aware IAM)</div>", 390, 270, 160, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("iam_dur", "<div style='font-size:7px;font-weight:700;'>⏱️ Access Duration (Time-bound)</div>", 390, 304, 160, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Privilege Model Pyramid
  rect("box_priv_model", "", 380, 395, 180, 145, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_priv_model", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>PRIVILEGE MODEL</span>", 380, 402, 180, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("pm_p1", "<div style='font-size:6.8px;font-weight:700;'>― Least Privilege</div>", 410, 424, 120, 20, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");
  rect("pm_p2", "<div style='font-size:6.8px;font-weight:700;'>― Just-in-Time</div>", 400, 450, 140, 20, "fillColor=#BBF7D0;strokeColor=#16A34A;rounded=1;align=center;");
  rect("pm_p3", "<div style='font-size:6.8px;font-weight:700;'>― Role Based Access Control (RBAC)</div>", 390, 476, 160, 22, "fillColor=#86EFAC;strokeColor=#16A34A;rounded=1;align=center;");
  rect("pm_p4", "<div style='font-size:6.8px;font-weight:700;color:#FFFFFF;'>Deny by Default</div>", 385, 504, 170, 24, "fillColor=#15803D;strokeColor=#15803D;rounded=1;align=center;");

  edge(nid(), "", "box_idp", "box_iam", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 6. STAGE 3: ACCESS RESOURCES
  rect("box_res", "", 580, 120, 190, 420, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_res", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>RESOURCE ACCESS</span>", 580, 128, 190, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("r_comp", "<div style='font-size:7.2px;font-weight:700;'>🖥️ Compute Resources<br/><span style='font-size:5.5px;color:#64748B;'>(GCE, GKE, Cloud Run)</span></div>", 590, 150, 170, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("r_data", "<div style='font-size:7.2px;font-weight:700;'>🗄️ Data &amp; Storage<br/><span style='font-size:5.5px;color:#64748B;'>(BigQuery, Cloud Storage, Cloud SQL)</span></div>", 590, 204, 170, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("r_apps", "<div style='font-size:7.2px;font-weight:700;'>📱 Applications<br/><span style='font-size:5.5px;color:#64748B;'>(Internal Apps, APIs)</span></div>", 590, 258, 170, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("r_ai", "<div style='font-size:7.2px;font-weight:700;'>🧠 AI / ML Services<br/><span style='font-size:5.5px;color:#64748B;'>(Vertex AI, Document AI)</span></div>", 590, 312, 170, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("r_net", "<div style='font-size:7.2px;font-weight:700;'>🌐 Networking<br/><span style='font-size:5.5px;color:#64748B;'>(VPC, Load Balancers)</span></div>", 590, 366, 170, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");
  rect("r_sec", "<div style='font-size:7.2px;font-weight:700;'>🔒 Secret &amp; Keys<br/><span style='font-size:5.5px;color:#64748B;'>(Secret Manager, KMS)</span></div>", 590, 420, 170, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;");

  edge(nid(), "", "box_iam", "box_res", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 7. STAGE 4: MONITOR & AUDIT
  rect("box_mon_audit", "", 790, 120, 180, 290, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_mon_audit", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>MONITORING &amp; AUDIT</span>", 790, 128, 180, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("ma_logs", "<div style='font-size:7px;font-weight:700;'>📑 Cloud Audit Logs<br/><span style='font-size:5.5px;color:#64748B;'>(Admin, Data, Access)</span></div>", 800, 150, 160, 42, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;");
  rect("ma_at", "<div style='font-size:7px;font-weight:700;'>🔍 Access Transparency<br/><span style='font-size:5.5px;color:#64748B;'>(Google AT Logs)</span></div>", 800, 200, 160, 42, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;");
  rect("ma_scc", "<div style='font-size:7px;font-weight:700;'>🛡️ Security Command Center<br/><span style='font-size:5.5px;color:#64748B;'>(SCC)</span></div>", 800, 250, 160, 42, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;");
  rect("ma_alert", "<div style='font-size:7px;font-weight:700;'>🔔 Alerting (Cloud Monitoring)</div>", 800, 300, 160, 32, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;");
  rect("ma_anom", "<div style='font-size:7px;font-weight:700;'>📈 Anomaly Detection<br/><span style='font-size:5.5px;color:#64748B;'>(Chronicle / SCC)</span></div>", 800, 340, 160, 38, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;");

  // Log Retention Box
  rect("box_log_ret", "<div style='text-align:center;'><span style='font-size:8px;font-weight:800;color:#7C3AED;'>LOG RETENTION</span><br/><br/>" +
    "💾<br/><b>Logs retained as per org policy</b><br/><span style='font-size:6.5px;color:#64748B;'>(e.g., 400 days) in Log Bucket / BigQuery</span></div>", 790, 425, 180, 115, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=6;");

  edge(nid(), "", "box_res", "box_mon_audit", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // 8. RIGHT COLUMN: KEY BENEFITS, TECHNOLOGIES, LEGEND
  rect("hdr_benefits", "<span style='font-size:8.5px;font-weight:800;color:#16A34A;'>KEY BENEFITS</span>", 990, 78, 290, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_benefits", "<div style='font-size:7.2px;line-height:1.7;padding:4px;color:#0F172A;'>" +
    "✔ Centralized identity management with federation support<br/>" +
    "✔ Strong authentication with MFA and contextual access<br/>" +
    "✔ Least privilege and just-in-time access enforcement<br/>" +
    "✔ Comprehensive audit &amp; monitoring for compliance<br/>" +
    "✔ Fine-grained access control for all resources" +
    "</div>", 990, 100, 290, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_tech", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>TECHNOLOGIES</span>", 990, 225, 290, 22, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("card_tech", "<div style='font-size:7px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "☁️ <b>Google Cloud Identity</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>IAM</b><br/>" +
    "🔒 <b>Cloud Identity-Aware Proxy</b> &nbsp;&nbsp;&nbsp; 📑 <b>Cloud Audit Logs</b><br/>" +
    "📊 <b>Cloud Monitoring</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>Security Command Center</b><br/>" +
    "🔑 <b>Secret Manager</b> &nbsp;&nbsp;&nbsp; 🔐 <b>Cloud KMS</b>" +
    "</div>", 990, 247, 290, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_legend", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>LEGEND</span>", 990, 352, 290, 22, "fillColor=#F8FAFC;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_legend", "<div style='font-size:7.2px;line-height:1.7;padding:4px;color:#0F172A;'>" +
    "─── Authentication Flow<br/>" +
    "- - - Authorization / Access Flow<br/>" +
    "······ Audit / Log Flow<br/>" +
    "🟦 Identity / Resource Component &nbsp;&nbsp; 🟩 Access / Auth Component<br/>" +
    "🟪 Monitoring / Audit Component &nbsp;&nbsp; 🟨 Policy / Governance" +
    "</div>", 990, 374, 290, 166, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 9. BOTTOM ROW: POLICIES & GOVERNANCE & NOTES
  rect("box_pol_gov", "<div style='font-size:8.5px;font-weight:800;color:#EA580C;margin-bottom:6px;text-align:center;'>POLICIES &amp; GOVERNANCE</div>" +
    "<div style='font-size:7.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "✔️ <b>Organization Policies</b><br/><span style='font-size:6px;color:#64748B;'>(Constraints)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🔒 <b>Access Approval</b><br/><span style='font-size:6px;color:#64748B;'>(JIT / Manual)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "📑 <b>Periodic Access Review</b><br/><span style='font-size:6px;color:#64748B;'>(Access Re-certification)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "⚖️ <b>Separation of Duties</b><br/><span style='font-size:6px;color:#64748B;'>(SoD)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🏷️ <b>Data Classification</b><br/><span style='font-size:6px;color:#64748B;'>(Public / Confidential / Restricted)</span>" +
    "</div>", 180, 560, 790, 60, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  rect("box_notes", "<div style='font-size:7.5px;color:#0F172A;line-height:1.6;display:flex;justify-content:space-between;'>" +
    "🌐 • MFA is enforced for all interactive users.<br/>• Service accounts use workload identity federation. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "✔️ • All access is logged and immutable.<br/>• Access reviews are performed quarterly. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🔒 • Use Organization Policies to enforce security posture.<br/>• Deny by default and allow by exception. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🏛️ • Complies with SOC 2, HIPAA, and ISO 27001 requirements." +
    "</div>", 20, 635, 1260, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=middle;padding=10;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1145, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");


  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_17_identity_access_flow" name="Template 17: Identity &amp; Access Flow">
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
