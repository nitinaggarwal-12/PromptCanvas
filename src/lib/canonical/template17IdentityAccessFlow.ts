/**
 * Canonical Architecture Template 17: Identity & Access Flow
 * Exact 1:1 High-Fidelity Master Blueprint of images/17.png
 */

export function generateTemplate17IdentityAccessFlowXml(
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
  rect("num_badge", "17", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Identity &amp; Access Flow</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Secure, centralized identity and access management with least privilege access, MFA enforcement, and auditable access.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. USERS & ACTORS + EXTERNAL PARTNERS (x=20..115, y=72..540)
  rect("box_actors", "", 20, 72, 95, 300, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_actors", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>USERS &amp; ACTORS</span>", 20, 75, 95, 14, "strokeColor=none;fillColor=none;align=center;");

  const actors = [
    { t: "Human Users", sub: "(Employees)", icon: "👤" },
    { t: "Admins", sub: "(Platform Admins)", icon: "👥" },
    { t: "Service Accounts", sub: "(Workloads)", icon: "⚙️" },
    { t: "Applications", sub: "(Internal / External)", icon: "📱" }
  ];
  actors.forEach((ac, idx) => {
    const ay = 94 + idx * 68;
    rect(`ac_${idx}`, `<div style='font-size:12px;text-align:center;'>${ac.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${ac.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${ac.sub}</div>`, 25, ay, 85, 54, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  rect("box_partners", "", 20, 380, 95, 157, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_partners", "<span style='font-size:9px;font-weight:800;color:#7C3AED;'>EXTERNAL PARTNERS</span>", 20, 383, 95, 14, "strokeColor=none;fillColor=none;align=center;");

  const partners = [
    { t: "Regulatory Agencies", icon: "🏛️" },
    { t: "Vendors / Partners", icon: "🏢" },
    { t: "Contractors", icon: "👷" }
  ];
  partners.forEach((pa, idx) => {
    const py = 402 + idx * 44;
    rect(`pa_${idx}`, `<div style='font-size:9px;font-weight:700;'>${pa.icon} ${pa.t}</div>`, 25, py, 85, 34, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. 4 FLOW TIERS (x=122..1220, y=72..540)
  // Step 1: Authenticate (x=122..385)
  rect("box_p1_auth", "", 122, 72, 260, 465, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_p1_auth", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>❶ Authenticate</span>", 122, 75, 260, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("p1_box_idp", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>IDENTITY PROVIDERS</div><div style='background:#EFF6FF;border:1px solid #2563EB;padding:4px;border-radius:4px;margin-bottom:6px;text-align:center;'><b>Google Cloud Identity</b><br/><span style='color:#64748B;font-size:8px;'>(Primary IdP)</span></div><div style='font-size:9px;color:#0F172A;line-height:1.4;'><b>Identity Federation:</b><br/>🔺 SAML 2.0<br/>⚡ OIDC / OAuth 2.0<br/>🏢 Active Directory (via Cloud LDAP)</div>", 130, 94, 244, 210, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("p1_box_methods", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:4px;text-align:center;'>AUTHENTICATION METHODS</div><div style='font-size:9px;color:#0F172A;line-height:1.45;'>🔑 <b>Password</b><br/>📱 <b>MFA (TOTP / Push)</b><br/>🔒 <b>Security Keys (FIDO2)</b><br/>🛡️ <b>Context-Aware Access</b><br/><span style='color:#64748B;font-size:8px;'>(Device / Location)</span></div>", 130, 314, 244, 213, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Step 2: Authorize (x=390..650)
  rect("box_p2_authz", "", 390, 72, 255, 465, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1;rounded=1;");
  rect("lbl_p2_authz", "<span style='font-size:10px;font-weight:800;color:#16A34A;'>❷ Authorize</span>", 390, 75, 255, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("p2_box_iam", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:4px;text-align:center;'>ACCESS MANAGEMENT</div><div style='background:#F0FDF4;border:1px solid #16A34A;padding:4px;border-radius:4px;margin-bottom:6px;text-align:center;'>🛡️ <b>IAM</b><br/><span style='color:#64748B;font-size:8px;'>(Identity &amp; Access Management)</span></div><div style='font-size:9px;color:#0F172A;line-height:1.4;'>👥 <b>Groups</b> (Google Groups)<br/>🔑 <b>Roles</b> (Predefined / Custom)<br/>🛡️ <b>Conditions</b> (Context-Aware IAM)<br/>⏱️ <b>Access Duration</b> (Time-bound Access)</div>", 398, 94, 239, 210, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("p2_box_priv", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:6px;text-align:center;'>PRIVILEGE MODEL</div><div style='font-size:9px;color:#0F172A;text-align:center;line-height:1.6;'><div style='background:#DCFCE7;border:1px solid #16A34A;padding:3px;border-radius:3px;margin-bottom:3px;'>✔ <b>Least Privilege</b></div><div style='background:#DCFCE7;border:1px solid #16A34A;padding:3px;border-radius:3px;margin-bottom:3px;'>⏱️ <b>Just-in-Time</b></div><div style='background:#DCFCE7;border:1px solid #16A34A;padding:3px;border-radius:3px;margin-bottom:3px;'>👥 <b>Role Based Access Control (RBAC)</b></div><div style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:3px;border-radius:3px;'>⛔ <b>Deny by Default</b></div></div>", 398, 314, 239, 213, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=top;padding=6;");

  // Step 3: Access Resources (x=652..930)
  rect("box_p3_res", "", 652, 72, 275, 465, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1;rounded=1;");
  rect("lbl_p3_res", "<span style='font-size:10px;font-weight:800;color:#7C3AED;'>❸ Access Resources</span>", 652, 75, 275, 14, "strokeColor=none;fillColor=none;align=center;");

  const rscs = [
    { t: "Compute Resources", sub: "(GCE, GKE, Cloud Run)", icon: "⚙️" },
    { t: "Data &amp; Storage", sub: "(BigQuery, Cloud Storage, Cloud SQL)", icon: "🗄️" },
    { t: "Applications", sub: "(Internal Apps, APIs)", icon: "📱" },
    { t: "AI / ML Services", sub: "(Vertex AI, Document AI)", icon: "🧠" },
    { t: "Networking", sub: "(VPC, Load Balancers)", icon: "🌐" },
    { t: "Secret &amp; Keys", sub: "(Secret Manager, KMS)", icon: "🔒" }
  ];
  rscs.forEach((rs, idx) => {
    const ry = 94 + idx * 71;
    rect(`rs_${idx}`, `<div style='font-size:12px;text-align:center;'>${rs.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${rs.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${rs.sub}</div>`, 660, ry, 259, 58, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Step 4: Monitor & Audit (x=934..1220)
  rect("box_p4_audit", "", 934, 72, 280, 465, "fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1;rounded=1;");
  rect("lbl_p4_audit", "<span style='font-size:10px;font-weight:800;color:#DC2626;'>❹ Monitor &amp; Audit</span>", 934, 75, 280, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("p4_box_logs", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;text-align:center;'>MONITORING &amp; AUDIT</div><div style='font-size:9px;color:#0F172A;line-height:1.45;'>📑 <b>Cloud Audit Logs</b><br/><span style='color:#64748B;font-size:8px;'>(Admin, Data, Access)</span><br/><br/>🔍 <b>Access Transparency</b><br/><span style='color:#64748B;font-size:8px;'>(Google AT Logs)</span><br/><br/>🛡️ <b>Security Command Center</b><br/><span style='color:#64748B;font-size:8px;'>(SCC)</span><br/><br/>🔔 <b>Alerting</b> (Cloud Monitoring)<br/><br/>📈 <b>Anomaly Detection</b> (Chronicle / SCC)</div>", 942, 94, 264, 270, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("p4_box_ret", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>LOG RETENTION</div><div style='font-size:9px;color:#0F172A;text-align:center;line-height:1.4;'>📑<br/><b>Logs retained as per org policy</b><br/><span style='color:#64748B;font-size:8px;'>(e.g., 400 days in Log Bucket / BigQuery)</span></div>", 942, 374, 264, 153, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 4. FAR RIGHT COLUMN: KEY BENEFITS, TECHNOLOGIES, LEGEND (x=1226..1560, y=72..540)
  rect("box_r_benefits", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>✔ <b>Centralized identity management</b> with federation support<br/>✔ <b>Strong authentication</b> with MFA and contextual access<br/>✔ <b>Least privilege</b> and just-in-time access enforcement<br/>✔ <b>Comprehensive audit &amp; monitoring</b> for compliance<br/>✔ <b>Fine-grained access control</b> for all resources</div>", 1226, 72, 334, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_techs", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>TECHNOLOGIES</div><div style='font-size:9px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'><div>☁️ Google Cloud Identity</div> <div>🛡️ IAM</div> <div>🔒 Cloud Identity-Aware Proxy</div> <div>📑 Cloud Audit Logs</div> <div>📈 Cloud Monitoring</div> <div>🛡️ Security Command Center</div> <div>🔑 Secret Manager</div> <div>🔑 Cloud KMS</div></div>", 1226, 214, 334, 110, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_legend", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>── Authentication Flow<br/>- - Authorization / Access Flow<br/>······ Audit / Log Flow<br/><span style='background:#FAF5FF;border:1px solid #7C3AED;padding:1px 3px;border-radius:2px;'>■</span> Identity / Resource &nbsp; <span style='background:#F0FDF4;border:1px solid #16A34A;padding:1px 3px;border-radius:2px;'>■</span> Access / Auth<br/><span style='background:#FEF2F2;border:1px solid #DC2626;padding:1px 3px;border-radius:2px;'>■</span> Monitoring / Audit &nbsp; <span style='background:#FFFBEB;border:1px solid #D97706;padding:1px 3px;border-radius:2px;'>■</span> Policy / Governance</div>", 1226, 330, 334, 207, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. BOTTOM ROW: POLICIES & GOVERNANCE + NOTES (x=20..1560, y=546..740)
  rect("bot_pol", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>POLICIES &amp; GOVERNANCE</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:10px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🛡️<br/><b>Organization Policies</b><br/>(Constraints)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔑<br/><b>Access Approval</b><br/>(JIT / Manual)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📑<br/><b>Periodic Access Review</b><br/>(Re-certification)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⚖️<br/><b>Separation of Duties</b><br/>(SoD)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🏷️<br/><b>Data Classification</b><br/>(Confidential / Restricted)</div></div>", 20, 546, 800, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>NOTES</div><div style='font-size:9px;line-height:1.45;color:#64748B;'>• MFA is enforced for all interactive users.<br/>• Service accounts use workload identity federation.<br/>• All access is logged and immutable in Cloud Audit Logs.<br/>• Access reviews are performed quarterly.<br/>• Use Organization Policies to enforce security posture.<br/>• Deny by default and allow by exception.<br/>• Complies with SOC 2, HIPAA, and ISO 27001 requirements.</div>", 830, 546, 730, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_17_identity_access_flow" name="Template 17: Identity &amp; Access Flow">
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
