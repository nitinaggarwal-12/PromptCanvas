/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 17 — IDENTITY & ACCESS FLOW
 * 
 * 1:1 Ground-Truth Reproduction of images/17.png
 * "17 Identity & Access Flow | Use Case: NovaCura – Regulatory Intelligence Platform"
 * 4-Stage IAM Journey (1 Authenticate, 2 Authorize, 3 Access, 4 Monitor & Audit),
 * Privilege Pyramid, Policies & Governance, Key Benefits, Technologies, Notes.
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate17IdentityAccessFlowXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const edge = (id: string, label: string, x1: number, y1: number, x2: number, y2: number, color = "#0F172A", dashed = false, arrow = "block", pts: [number, number][] = []) => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const ptsXml = pts.length > 0 ? `<Array as="points">${pts.map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const labelStyle = label ? `fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.2;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_17", "<b style='font-size:24px;color:#FFFFFF;'>17</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">Identity &amp; Access Flow</div>
    <div style="font-size:11px;font-weight:700;color:#475569;margin-top:2px;">Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 850, 42, "align=left;verticalAlign=middle;");

  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">AI-Powered Regulatory Intelligence Platform</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // Objective Card (Top Right)
  const objHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:2px;">OBJECTIVE</div>
    <div style="font-size:7.5px;color:#334155;line-height:1.35;">Secure, centralized identity and access management with least privilege access, MFA enforcement, and auditable access.</div>
  </div>`;
  rect("card_obj", objHtml, 1140, 64, 440, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 2. LEFT SIDEBAR: USERS & ACTORS (x: 20, w: 160) & EXTERNAL PARTNERS (x: 20, w: 160)
  // =========================================================================
  const usersHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:8.5px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:8px;">USERS &amp; ACTORS</div>
    <div style="font-size:7.5px;text-align:center;line-height:1.4;">
      <div style="margin-bottom:12px;"><div style="font-size:16px;">👤</div><b>Human Users</b><br><span style="font-size:6.5px;color:#64748B;">(Employees)</span></div>
      <div style="margin-bottom:12px;"><div style="font-size:16px;">🛡️</div><b>Admins</b><br><span style="font-size:6.5px;color:#64748B;">(Platform Admins)</span></div>
      <div style="margin-bottom:12px;"><div style="font-size:16px;">🤖</div><b>Service Accounts</b><br><span style="font-size:6.5px;color:#64748B;">(Workloads)</span></div>
      <div><div style="font-size:16px;">💻</div><b>Applications</b><br><span style="font-size:6.5px;color:#64748B;">(Internal / External)</span></div>
    </div>
  </div>`;
  rect("card_users_actors", usersHtml, 20, 140, 160, 400, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  const partnersHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:8.5px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:8px;">EXTERNAL PARTNERS</div>
    <div style="font-size:7.5px;text-align:center;line-height:1.4;">
      <div style="margin-bottom:8px;"><div style="font-size:16px;">🏛️</div><b>Regulatory Agencies</b></div>
      <div style="margin-bottom:8px;"><div style="font-size:16px;">🤝</div><b>Vendors / Partners</b></div>
      <div><div style="font-size:16px;">👥</div><b>Contractors</b></div>
    </div>
  </div>`;
  rect("card_ext_partners", partnersHtml, 20, 555, 160, 220, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 3. MAIN 4-STAGE JOURNEY (x: 200 to 1180)
  // =========================================================================
  // STAGE 1: AUTHENTICATE (x: 200, w: 220)
  rect("stg_1_badge", "<b style='color:#FFF;font-size:8.5px;'>❶ Authenticate</b>", 200, 140, 220, 26, "fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;verticalAlign=middle;");
  
  const idpHtml = `<div style="padding:6px;">
    <div style="font-size:8.5px;font-weight:900;color:#0284C7;text-align:center;margin-bottom:8px;">IDENTITY PROVIDERS</div>
    <div style="text-align:center;margin-bottom:12px;">
      <div style="font-size:20px;">🌐</div>
      <div style="font-size:8px;font-weight:900;">Google Cloud Identity</div>
      <div style="font-size:6.5px;color:#64748B;">(Primary IdP)</div>
    </div>
    <div style="border-top:1px solid #E2E8F0;padding-top:8px;font-size:7.5px;color:#334155;line-height:1.6;">
      <div><b>Identity Federation</b></div>
      <div>• 🔑 SAML 2.0</div>
      <div>• ⚡ OIDC / OAuth 2.0</div>
      <div>• 🏢 Active Directory (via Cloud LDAP)</div>
    </div>
  </div>`;
  rect("card_idp", idpHtml, 200, 175, 220, 365, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=left;verticalAlign=top;");

  const authMethodsHtml = `<div style="padding:6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;text-align:center;margin-bottom:6px;">AUTHENTICATION METHODS</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>🔒 Password</div>
      <div>📱 MFA (TOTP / Push)</div>
      <div>🔑 Security Keys (FIDO2)</div>
      <div>🛡️ Context-Aware Access</div>
    </div>
  </div>`;
  rect("card_auth_methods", authMethodsHtml, 200, 555, 220, 220, "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=top;");

  // STAGE 2: AUTHORIZE (x: 440, w: 220)
  rect("stg_2_badge", "<b style='color:#FFF;font-size:8.5px;'>❷ Authorize</b>", 440, 140, 220, 26, "fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;verticalAlign=middle;");

  const accessMgmtHtml = `<div style="padding:6px;">
    <div style="font-size:8.5px;font-weight:900;color:#16A34A;text-align:center;margin-bottom:8px;">ACCESS MANAGEMENT</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.5;">
      <div style="margin-bottom:8px;"><div style="font-weight:900;">🛡️ IAM</div><div style="font-size:6.5px;color:#64748B;">(Identity &amp; Access Management)</div></div>
      <div style="margin-bottom:8px;"><div style="font-weight:900;">👥 Groups</div><div style="font-size:6.5px;color:#64748B;">(Google Groups)</div></div>
      <div style="margin-bottom:8px;"><div style="font-weight:900;">🔑 Roles</div><div style="font-size:6.5px;color:#64748B;">(Predefined / Custom)</div></div>
      <div style="margin-bottom:8px;"><div style="font-weight:900;">⚙️ Conditions</div><div style="font-size:6.5px;color:#64748B;">(Context-Aware IAM)</div></div>
      <div><div style="font-weight:900;">⏱️ Access Duration</div><div style="font-size:6.5px;color:#64748B;">(Time-bound Access)</div></div>
    </div>
  </div>`;
  rect("card_access_mgmt", accessMgmtHtml, 440, 175, 220, 365, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;");

  const privModelHtml = `<div style="padding:6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;text-align:center;margin-bottom:6px;">PRIVILEGE MODEL</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div style="color:#15803D;font-weight:700;">▲ Least Privilege</div>
      <div>• Just-in-Time (JIT)</div>
      <div>• Role Based Access Control (RBAC)</div>
      <div style="color:#B91C1C;font-weight:700;">▼ Deny by Default</div>
    </div>
  </div>`;
  rect("card_priv_model", privModelHtml, 440, 555, 220, 220, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;");

  // STAGE 3: ACCESS RESOURCES (x: 680, w: 240)
  rect("stg_3_badge", "<b style='color:#FFF;font-size:8.5px;'>❸ Access Resources</b>", 680, 140, 240, 26, "fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;verticalAlign=middle;");

  const resAccessHtml = `<div style="padding:6px;">
    <div style="font-size:8.5px;font-weight:900;color:#0284C7;text-align:center;margin-bottom:8px;">RESOURCE ACCESS</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.4;">
      <div style="margin-bottom:10px;"><div style="font-weight:900;">💻 Compute Resources</div><div style="font-size:6.5px;color:#64748B;">(GCE, GKE, Cloud Run)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">🗄️ Data &amp; Storage</div><div style="font-size:6.5px;color:#64748B;">(BigQuery, Cloud Storage, Cloud SQL)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">📱 Applications</div><div style="font-size:6.5px;color:#64748B;">(Internal Apps, APIs)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">🧠 AI / ML Services</div><div style="font-size:6.5px;color:#64748B;">(Vertex AI, Document AI)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">🌐 Networking</div><div style="font-size:6.5px;color:#64748B;">(VPC, Load Balancers)</div></div>
      <div><div style="font-weight:900;">🔒 Secret &amp; Keys</div><div style="font-size:6.5px;color:#64748B;">(Secret Manager, KMS)</div></div>
    </div>
  </div>`;
  rect("card_res_access", resAccessHtml, 680, 175, 240, 600, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=left;verticalAlign=top;");

  // STAGE 4: MONITOR & AUDIT (x: 940, w: 220)
  rect("stg_4_badge", "<b style='color:#FFF;font-size:8.5px;'>❹ Monitor &amp; Audit</b>", 940, 140, 220, 26, "fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;verticalAlign=middle;");

  const monAuditHtml = `<div style="padding:6px;">
    <div style="font-size:8.5px;font-weight:900;color:#7C3AED;text-align:center;margin-bottom:8px;">MONITORING &amp; AUDIT</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="margin-bottom:10px;"><div style="font-weight:900;">📑 Cloud Audit Logs</div><div style="font-size:6.5px;color:#64748B;">(Admin, Data, Access)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">🔍 Access Transparency</div><div style="font-size:6.5px;color:#64748B;">(Google AT Logs)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">🛡️ Security Command Center</div><div style="font-size:6.5px;color:#64748B;">(SCC)</div></div>
      <div style="margin-bottom:10px;"><div style="font-weight:900;">🔔 Alerting</div><div style="font-size:6.5px;color:#64748B;">(Cloud Monitoring)</div></div>
      <div><div style="font-weight:900;">⚡ Anomaly Detection</div><div style="font-size:6.5px;color:#64748B;">(Chronicle / SCC)</div></div>
    </div>
  </div>`;
  rect("card_mon_audit", monAuditHtml, 940, 175, 220, 425, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;align=left;verticalAlign=top;");

  const logRetHtml = `<div style="padding:6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;text-align:center;margin-bottom:4px;">LOG RETENTION</div>
    <div style="font-size:7px;color:#334155;line-height:1.4;">
      <div>🗄️ Logs retained as per policy (e.g. 400 days) in Log Bucket / BigQuery</div>
    </div>
  </div>`;
  rect("card_log_ret", logRetHtml, 940, 615, 220, 160, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Flow Connectors across Stages
  edge("e_stg1_stg2", "", 420, 345, 440, 345, "#0F172A");
  edge("e_stg2_stg3", "", 660, 345, 680, 345, "#0F172A");
  edge("e_stg3_stg4", "", 920, 345, 940, 345, "#64748B", true, "open");

  // =========================================================================
  // 4. RIGHT SIDEBAR: BENEFITS, TECHNOLOGIES, LEGEND (x: 1180, w: 400)
  // =========================================================================
  // Card 1: KEY BENEFITS (y: 140, h: 200)
  const benefitsHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">KEY BENEFITS</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Centralized identity management with federation</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Strong authentication with MFA &amp; contextual access</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Least privilege &amp; just-in-time enforcement</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Comprehensive audit &amp; monitoring for compliance</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Fine-grained access control for all resources</span></div>
    </div>
  </div>`;
  rect("card_benefits", benefitsHtml, 1180, 140, 400, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: TECHNOLOGIES (y: 355, h: 240)
  const techIamHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">TECHNOLOGIES</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.5;">
      <div>🌐 Google Cloud Identity</div>
      <div>🛡️ IAM</div>
      <div>⚡ Cloud Identity-Aware Proxy</div>
      <div>📑 Cloud Audit Logs</div>
      <div>📊 Cloud Monitoring</div>
      <div>🛡️ Security Command Center</div>
      <div>🔒 Secret Manager</div>
      <div>🔑 Cloud KMS</div>
    </div>
  </div>`;
  rect("card_tech_iam", techIamHtml, 1180, 355, 400, 240, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: LEGEND (y: 610, h: 165)
  const legIamHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">LEGEND</div>
    <table style="width:100%;font-size:7.5px;color:#1E293B;line-height:1.45;">
      <tr><td style="width:50px;">➔</td><td>Authentication Flow</td></tr>
      <tr><td>- - - - ➔</td><td>Authorization / Access Flow</td></tr>
      <tr><td>·········➔</td><td>Audit / Log Flow</td></tr>
    </table>
  </div>`;
  rect("card_leg_iam", legIamHtml, 1180, 610, 400, 165, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 5. BOTTOM BAR: POLICIES & GOVERNANCE + NOTES (y: 790, h: 165)
  // =========================================================================
  const polGovHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#C2410C;margin-bottom:4px;text-align:center;">POLICIES &amp; GOVERNANCE</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7px;font-weight:700;">
      <div>🛡️ Organization Policies<br><span style="font-size:6px;color:#64748B;">(Constraints)</span></div>
      <div>📋 Access Approval<br><span style="font-size:6px;color:#64748B;">(JIT / Manual)</span></div>
      <div>📑 Periodic Access Review<br><span style="font-size:6px;color:#64748B;">(Access Re-certification)</span></div>
      <div>⚖️ Separation of Duties<br><span style="font-size:6px;color:#64748B;">(SoD)</span></div>
      <div>🔒 Data Classification<br><span style="font-size:6px;color:#64748B;">(Public / Confidential / Restricted)</span></div>
    </div>
  </div>`;
  rect("card_pol_gov", polGovHtml, 20, 790, 770, 70, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.2;align=center;verticalAlign=middle;");

  const notesIamHtml = `<div style="padding:6px 8px;display:flex;align-items:center;justify-content:space-around;font-size:7px;color:#334155;">
    <div>• MFA is enforced for all interactive users.</div>
    <div>• Service accounts use workload identity federation.</div>
    <div>• All access is logged and immutable.</div>
    <div>• Access reviews are performed quarterly.</div>
    <div>• Complies with SOC 2, HIPAA, and ISO 27001 requirements.</div>
  </div>`;
  rect("card_notes_iam", notesIamHtml, 20, 875, 1560, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;");

  // =========================================================================
  // 6. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_17_identity_access" name="Template 17: Identity &amp; Access Flow">
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
