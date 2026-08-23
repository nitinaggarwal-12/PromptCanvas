/**
 * Canonical Architecture Template 17: Identity & Access Flow
 * Exact 1:1 High-Fidelity Master Blueprint of images/17.png
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

  // 1. TOP HEADER & METADATA (x=20..1560)
  rect("num_badge", "17", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Identity &amp; Access Flow</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card (x=1240..1560, w=320)
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.4;color:#0F172A;'>Secure, centralized identity and access management with least privilege access, MFA enforcement, and auditable access.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. 4 TOP FLOW BADGES
  rect("flow_b1", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❶ Authenticate</div>", 175, 82, 210, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("flow_b2", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❷ Authorize</div>", 405, 82, 210, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("flow_b3", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❸ Access Resources</div>", 635, 82, 230, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("flow_b4", "<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>❹ Monitor &amp; Audit</div>", 885, 82, 205, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 3. LEFT COLUMN: USERS & ACTORS + EXTERNAL PARTNERS (x=20..155, w=135)
  rect("hdr_users", "<span style='font-size:8px;font-weight:800;color:#FFFFFF;'>USERS &amp; ACTORS</span>", 20, 115, 135, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 137, 135, 280, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("u_human", "<div style='font-size:7.2px;font-weight:700;'>👤<br/>Human Users<br/><span style='font-size:5.8px;color:#64748B;'>(Employees)</span></div>", 26, 148, 123, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_admin", "<div style='font-size:7.2px;font-weight:700;'>👥<br/>Admins<br/><span style='font-size:5.8px;color:#64748B;'>(Platform Admins)</span></div>", 26, 212, 123, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_sa", "<div style='font-size:7.2px;font-weight:700;'>⚙️<br/>Service Accounts<br/><span style='font-size:5.8px;color:#64748B;'>(Workloads)</span></div>", 26, 276, 123, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_apps", "<div style='font-size:7.2px;font-weight:700;'>💻<br/>Applications<br/><span style='font-size:5.8px;color:#64748B;'>(Internal / External)</span></div>", 26, 340, 123, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // External Partners Box (x=20..155, y=430..545)
  rect("hdr_ext_part", "<span style='font-size:8px;font-weight:800;color:#FFFFFF;'>EXTERNAL PARTNERS</span>", 20, 430, 135, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_ext_part", "", 20, 452, 135, 175, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("ep_reg", "<div style='font-size:7.2px;font-weight:700;'>🏛️<br/>Regulatory Agencies</div>", 26, 462, 123, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ep_vend", "<div style='font-size:7.2px;font-weight:700;'>🤝<br/>Vendors / Partners</div>", 26, 514, 123, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ep_con", "<div style='font-size:7.2px;font-weight:700;'>👤<br/>Contractors</div>", 26, 566, 123, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 4. STAGE 1: AUTHENTICATE (x=175..385, w=210)
  rect("box_idp", "", 175, 115, 210, 230, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_idp", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>IDENTITY PROVIDERS</span>", 175, 120, 210, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("idp_cloud", "<div style='font-size:7.5px;font-weight:700;'>☁️<br/>Google Cloud Identity<br/><span style='font-size:6px;color:#64748B;'>(Primary IdP)</span></div>", 185, 138, 190, 46, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("lbl_fed", "<span style='font-size:7.2px;font-weight:800;color:#64748B;'>Identity Federation</span>", 175, 188, 210, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("idp_saml", "<div style='font-size:7px;font-weight:700;'>▲ SAML 2.0</div>", 185, 204, 190, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("idp_oidc", "<div style='font-size:7px;font-weight:700;'>⚡ OIDC / OAuth 2.0</div>", 185, 232, 190, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("idp_ad", "<div style='font-size:7px;font-weight:700;'>🪟 Active Directory<br/><span style='font-size:5.5px;color:#64748B;'>(via Cloud LDAP)</span></div>", 185, 260, 190, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Authentication Methods (x=175..385, y=355..535, h=180)
  rect("box_auth_meth", "", 175, 355, 210, 180, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;");
  rect("lbl_auth_meth", "<span style='font-size:8px;font-weight:800;color:#D97706;'>AUTHENTICATION METHODS</span>", 175, 360, 210, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("am_pw", "<div style='font-size:7.2px;font-weight:700;'>🔒 Password</div>", 185, 380, 190, 28, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("am_mfa", "<div style='font-size:7.2px;font-weight:700;'>📱 MFA (TOTP / Push)</div>", 185, 412, 190, 28, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("am_fido", "<div style='font-size:7.2px;font-weight:700;'>🔑 Security Keys (FIDO2)</div>", 185, 444, 190, 28, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("am_context", "<div style='font-size:7.2px;font-weight:700;'>💻 Context-Aware Access<br/><span style='font-size:5.8px;color:#64748B;'>(Device / Location)</span></div>", 185, 476, 190, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "box_users", "box_idp", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "box_ext_part", "box_auth_meth", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 5. STAGE 2: AUTHORIZE (x=405..615, w=210)
  rect("box_iam", "", 405, 115, 210, 230, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_iam", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>ACCESS MANAGEMENT</span>", 405, 120, 210, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("iam_core", "<div style='font-size:7.5px;font-weight:700;'>🛡️<br/>IAM<br/><span style='font-size:6px;color:#64748B;'>(Identity &amp; Access Management)</span></div>", 415, 138, 190, 42, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("iam_grp", "<div style='font-size:7px;font-weight:700;'>👥 Groups (Google Groups)</div>", 415, 184, 190, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("iam_roles", "<div style='font-size:7px;font-weight:700;'>🏷️ Roles (Predefined / Custom)</div>", 415, 212, 190, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("iam_cond", "<div style='font-size:7px;font-weight:700;'>📑 Conditions (Context-Aware IAM)</div>", 415, 240, 190, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("iam_dur", "<div style='font-size:7px;font-weight:700;'>⏱️ Access Duration (Time-bound)</div>", 415, 268, 190, 24, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Privilege Model Pyramid (x=405..615, y=355..535, h=180)
  rect("box_priv_model", "", 405, 355, 210, 180, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_priv_model", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>PRIVILEGE MODEL</span>", 405, 360, 210, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("pm_p1", "<div style='font-size:7px;font-weight:700;'>― Least Privilege</div>", 440, 386, 140, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("pm_p2", "<div style='font-size:7px;font-weight:700;'>― Just-in-Time</div>", 425, 414, 170, 22, "fillColor=#BBF7D0;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("pm_p3", "<div style='font-size:7px;font-weight:700;'>― Role Based Access Control (RBAC)</div>", 415, 442, 190, 24, "fillColor=#86EFAC;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("pm_p4", "<div style='font-size:7px;font-weight:700;color:#FFFFFF;'>Deny by Default</div>", 410, 472, 200, 26, "fillColor=#15803D;strokeColor=#15803D;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "box_idp", "box_iam", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 6. STAGE 3: ACCESS RESOURCES (x=635..865, w=230, y=115..535, h=420)
  rect("box_res", "", 635, 115, 230, 420, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_res", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>RESOURCE ACCESS</span>", 635, 120, 230, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("r_comp", "<div style='font-size:7.5px;font-weight:700;'>🖥️ Compute Resources<br/><span style='font-size:5.8px;color:#64748B;'>(GCE, GKE, Cloud Run)</span></div>", 645, 140, 210, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("r_data", "<div style='font-size:7.5px;font-weight:700;'>🗄️ Data &amp; Storage<br/><span style='font-size:5.8px;color:#64748B;'>(BigQuery, Cloud Storage, Cloud SQL)</span></div>", 645, 190, 210, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("r_apps", "<div style='font-size:7.5px;font-weight:700;'>📱 Applications<br/><span style='font-size:5.8px;color:#64748B;'>(Internal Apps, APIs)</span></div>", 645, 240, 210, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("r_ai", "<div style='font-size:7.5px;font-weight:700;'>🧠 AI / ML Services<br/><span style='font-size:5.8px;color:#64748B;'>(Vertex AI, Document AI)</span></div>", 645, 290, 210, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("r_net", "<div style='font-size:7.5px;font-weight:700;'>🌐 Networking<br/><span style='font-size:5.8px;color:#64748B;'>(VPC, Load Balancers)</span></div>", 645, 340, 210, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("r_sec", "<div style='font-size:7.5px;font-weight:700;'>🔒 Secret &amp; Keys<br/><span style='font-size:5.8px;color:#64748B;'>(Secret Manager, KMS)</span></div>", 645, 390, 210, 44, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "box_iam", "box_res", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 7. STAGE 4: MONITOR & AUDIT (x=885..1090, w=205)
  rect("box_mon_audit", "", 885, 115, 205, 275, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_mon_audit", "<span style='font-size:8px;font-weight:800;color:#7C3AED;'>MONITORING &amp; AUDIT</span>", 885, 120, 205, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("ma_logs", "<div style='font-size:7.2px;font-weight:700;'>📑 Cloud Audit Logs<br/><span style='font-size:5.5px;color:#64748B;'>(Admin, Data, Access)</span></div>", 895, 138, 185, 38, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("ma_at", "<div style='font-size:7.2px;font-weight:700;'>🔍 Access Transparency<br/><span style='font-size:5.5px;color:#64748B;'>(Google AT Logs)</span></div>", 895, 180, 185, 38, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("ma_scc", "<div style='font-size:7.2px;font-weight:700;'>🛡️ Security Command Center<br/><span style='font-size:5.5px;color:#64748B;'>(SCC)</span></div>", 895, 222, 185, 38, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("ma_alert", "<div style='font-size:7.2px;font-weight:700;'>🔔 Alerting (Cloud Monitoring)</div>", 895, 264, 185, 34, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("ma_anom", "<div style='font-size:7.2px;font-weight:700;'>📈 Anomaly Detection (SCC)</div>", 895, 302, 185, 34, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");

  // Log Retention Box (x=885..1090, y=400..535, h=135)
  rect("box_log_ret", "<div style='text-align:center;'><span style='font-size:8px;font-weight:800;color:#7C3AED;'>LOG RETENTION</span><br/><br/>" +
    "💾<br/><b>Logs retained as per org policy</b><br/><span style='font-size:6.5px;color:#64748B;'>(e.g., 400 days) in Log Bucket / BigQuery</span></div>", 885, 400, 205, 135, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=6;");

  edge(nid(), "", "box_res", "box_mon_audit", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");

  // 8. RIGHT COLUMN: KEY BENEFITS, TECHNOLOGIES, LEGEND (x=1110..1560, w=450)
  rect("hdr_benefits", "<span style='font-size:8.5px;font-weight:800;color:#16A34A;'>KEY BENEFITS</span>", 1110, 82, 450, 22, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_benefits", "<div style='font-size:7.2px;line-height:1.7;padding:6px;color:#0F172A;'>" +
    "✔ <b>Centralized identity management</b> with federation support<br/>" +
    "✔ <b>Strong authentication</b> with MFA and contextual access<br/>" +
    "✔ <b>Least privilege</b> and just-in-time access enforcement<br/>" +
    "✔ <b>Comprehensive audit &amp; monitoring</b> for compliance<br/>" +
    "✔ <b>Fine-grained access control</b> for all resources" +
    "</div>", 1110, 104, 450, 105, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_tech", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>TECHNOLOGIES</span>", 1110, 218, 450, 22, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("card_tech", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;display:grid;grid-template-columns:1fr 1fr;gap:4px;'>" +
    "<div>☁️ <b>Google Cloud Identity</b></div> <div>🛡️ <b>IAM</b></div>" +
    "<div>🔒 <b>Cloud Identity-Aware Proxy</b></div> <div>📑 <b>Cloud Audit Logs</b></div>" +
    "<div>📊 <b>Cloud Monitoring</b></div> <div>🛡️ <b>Security Command Center</b></div>" +
    "<div>🔑 <b>Secret Manager</b></div> <div>🔐 <b>Cloud KMS</b></div>" +
    "</div>", 1110, 240, 450, 95, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_legend", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>LEGEND</span>", 1110, 344, 450, 22, "fillColor=#F8FAFC;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_legend", "<div style='font-size:7.2px;line-height:1.6;padding:6px;color:#0F172A;'>" +
    "─── <b>Authentication Flow</b><br/>" +
    "- - - <b>Authorization / Access Flow</b><br/>" +
    "······ <b>Audit / Log Flow</b><br/>" +
    "<span style='color:#2563EB;'>■ Identity / Resource</span> &nbsp;&nbsp;&nbsp; <span style='color:#16A34A;'>■ Access / Auth</span><br/>" +
    "<span style='color:#7C3AED;'>■ Monitoring / Audit</span> &nbsp;&nbsp;&nbsp; <span style='color:#D97706;'>■ Policy / Governance</span>" +
    "</div>", 1110, 366, 450, 105, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 9. CROSS-CUTTING POLICIES & GOVERNANCE (x=175..1090, y=550..610, h=60)
  rect("box_pol_gov", "<div style='font-size:8px;font-weight:800;color:#EA580C;margin-bottom:4px;text-align:center;'>POLICIES &amp; GOVERNANCE</div>" +
    "<div style='font-size:7.2px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>✔️ <b>Organization Policies</b><br/><span style='font-size:6px;color:#64748B;'>(Constraints)</span></div>" +
    "<div>🔒 <b>Access Approval</b><br/><span style='font-size:6px;color:#64748B;'>(JIT / Manual)</span></div>" +
    "<div>📑 <b>Periodic Access Review</b><br/><span style='font-size:6px;color:#64748B;'>(Re-certification)</span></div>" +
    "<div>⚖️ <b>Separation of Duties</b><br/><span style='font-size:6px;color:#64748B;'>(SoD)</span></div>" +
    "<div>🏷️ <b>Data Classification</b><br/><span style='font-size:6px;color:#64748B;'>(Public / Confidential / Restricted)</span></div>" +
    "</div>", 175, 550, 915, 60, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // 10. BOTTOM ROW: NOTES (4 separate pod cards x=20..1560, y=650..775, h=125)
  rect("notes_p1", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>🌐 INTERACTIVE USERS &amp; WORKLOADS</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "• MFA is enforced for all interactive users.<br/>" +
    "• Service accounts use workload identity federation.<br/>" +
    "• Zero long-lived service account keys in production." +
    "</div>", 20, 650, 365, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("notes_p2", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>🛡️ AUDIT TRAILS &amp; REVIEW CADENCE</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "• All access is logged and immutable in Cloud Audit Logs.<br/>" +
    "• Access reviews are performed quarterly.<br/>" +
    "• Automated anomaly detection triggers immediate revocation." +
    "</div>", 400, 650, 370, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("notes_p3", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>🔒 SECURITY POSTURE ENFORCEMENT</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "• Use Organization Policies to enforce security posture.<br/>" +
    "• Deny by default and allow by exception.<br/>" +
    "• Context-aware perimeter blocks untrusted device locations." +
    "</div>", 785, 650, 375, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("notes_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>🏛️ REGULATORY COMPLIANCE</div>" +
    "<div style='font-size:7.2px;line-height:1.6;color:#0F172A;'>" +
    "• Complies with SOC 2, HIPAA, and ISO 27001 requirements.<br/>" +
    "• Meets FDA 21 CFR Part 11 audit trail regulations.<br/>" +
    "• Cryptographically verifiable dual-electronic approvals." +
    "</div>", 1175, 650, 385, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 785, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 785, 135, 18, "strokeColor=none;fillColor=none;align=right;");

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

