/**
 * Canonical Architecture Template 27: Threat Model Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/27.png
 */

export function generateTemplate27ThreatModelXml(
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
  rect("num_badge", "27", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>THREAT MODEL ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Identify, assess, and mitigate threats across NovaCura to protect data, ensure system resilience, maintain compliance, and preserve customer trust.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. TOP OUTER CONTAINER: SYSTEM CONTEXT & DATA FLOW (TRUST ZONES) (x=20..1120, y=78..265)
  rect("box_zones", "", 20, 78, 1100, 187, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_zones", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>SYSTEM CONTEXT &amp; DATA FLOW (TRUST ZONES)</span>", 20, 82, 1100, 14, "strokeColor=none;fillColor=none;align=center;");

  const zones = [
    { n: "1", t: "USERS &amp; CLIENTS", items: ["Web App", "Mobile App", "APIs / Integrations", "Client Systems"], x: 28, w: 175 },
    { n: "2", t: "EDGE &amp; ACCESS", items: ["Cloud Armor (WAF)", "HTTPS / TLS", "Identity-Aware Proxy", "DDoS Protection"], x: 211, w: 175 },
    { n: "3", t: "APPLICATION LAYER", items: ["Frontend (UI)", "API Gateway", "Auth Service", "Orchestration Service"], x: 394, w: 175 },
    { n: "4", t: "AI &amp; AGENT LAYER", items: ["Agent Orchestrator", "LLM / Model Serving", "Vector Search Service", "Tool / Function Calls"], x: 577, w: 175 },
    { n: "5", t: "DATA &amp; STORAGE LAYER", items: ["Vector DB (AlloyDB / PG)", "Operational DB (Cloud SQL)", "Object Storage (GCS)", "Knowledge Store"], x: 760, w: 175 },
    { n: "6", t: "EXTERNAL SYSTEMS", items: ["Regulatory Sources", "Third-Party APIs", "Partner Systems", "External Tools"], x: 943, w: 169 }
  ];

  zones.forEach((zn, idx) => {
    rect(`zn_box_${idx}`, "", zn.x, 98, zn.w, 112, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;");
    rect(`zn_hdr_${idx}`, `<div style='font-size:10px;font-weight:800;color:#1E3A8A;'>${zn.n}. ${zn.t}</div>`, zn.x, 102, zn.w, 12, "strokeColor=none;fillColor=none;align=center;");
    rect(`zn_it_${idx}`, `<div style='font-size:9px;line-height:1.4;color:#0F172A;'>${zn.items.map(it => '• ' + it).join("<br/>")}</div>`, zn.x + 4, 116, zn.w - 8, 90, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Shared Security Services Bar (y=215..258)
  rect("bar_sec_svcs", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>SHARED SECURITY SERVICES (ACROSS ALL ZONES)</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🔒 <b>IAM &amp; Access Mgmt</b></div>" +
    "<div>🔐 <b>Secrets Manager</b></div>" +
    "<div>🔑 <b>KMS / Encryption</b></div>" +
    "<div>🛡️ <b>VPC Service Controls</b></div>" +
    "<div>⏱️ <b>Audit Logging</b></div>" +
    "<div>🛡️ <b>Security Command Center</b></div>" +
    "<div>📈 <b>Monitoring &amp; Alerting</b></div>" +
    "</div>", 28, 215, 1084, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 3. ATTACK SURFACE MAP (x=20..1120, y=272..355)
  rect("box_att_surf", "", 20, 272, 1100, 83, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_att_surf", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>ATTACK SURFACE MAP</span>", 20, 276, 1100, 12, "strokeColor=none;fillColor=none;align=center;");

  const surfs = [
    { icon: "🌐", t: "Public Endpoints", sub: "(Internet)", tags: ["T1", "T5", "T2"], x: 28, w: 98 },
    { icon: "👤", t: "Auth &amp; Identity", sub: "(IAM, OAuth)", tags: ["T1", "T6"], x: 134, w: 98 },
    { icon: "🔌", t: "APIs &amp; Gateways", sub: "", tags: ["T1", "T2", "T5"], x: 240, w: 98 },
    { icon: "💻", t: "Web / UI", sub: "", tags: ["T2", "T5"], x: 346, w: 90 },
    { icon: "🤖", t: "Agent Orchestrator", sub: "&amp; Tools", tags: ["T2", "T7", "T6"], x: 444, w: 104 },
    { icon: "🧠", t: "LLM / Model", sub: "Serving", tags: ["T2", "T7", "T3"], x: 556, w: 98 },
    { icon: "🗄️", t: "Data Stores", sub: "(DB, Vector DB)", tags: ["T2", "T4", "T6"], x: 662, w: 98 },
    { icon: "🗃️", t: "Object Storage", sub: "(GCS)", tags: ["T4", "T2", "T5"], x: 768, w: 98 },
    { icon: "🌐", t: "External APIs", sub: "&amp; Data Sources", tags: ["T1", "T8", "T2"], x: 874, w: 104 },
    { icon: "🔄", t: "CI/CD &amp; DevOps", sub: "Pipelines", tags: ["T8", "T6", "T5"], x: 986, w: 100 },
    { icon: "👤", t: "Admin &amp; Ops", sub: "Interfaces", tags: ["T1", "T6"], x: 1094, w: 20 }
  ];

  surfs.slice(0, 10).forEach((sf, idx) => {
    rect(`sf_box_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${sf.icon} ${sf.t}<br/><span style='font-size:8.5px;color:#64748B;'>${sf.sub}</span></div><div style='margin-top:2px;'>${sf.tags.map(t => `<span style="font-size:8.5px;background:#1E3A8A;color:#FFFFFF;padding:0.5px 2.5px;border-radius:2px;margin:0 1px;">${t}</span>`).join("")}</div>`, sf.x, 292, sf.w, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. FAR RIGHT: THREAT CATALOG (STRIDE) (x=1128..1560, y=78..355)
  rect("box_stride", "", 1128, 78, 432, 277, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_stride", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>THREAT CATALOG (STRIDE)</span>", 1128, 82, 432, 12, "strokeColor=none;fillColor=none;align=center;");

  rect("tbl_stride", "<div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;border-bottom:1px solid #CBD5E1;'><td>ID</td><td>STRIDE</td><td>THREAT EXAMPLES</td><td>AREAS</td></tr>" +
    "<tr><td><b>T1</b></td><td>Spoofing</td><td>Credential theft, account takeover, API abuse</td><td>1,2,3,4</td></tr>" +
    "<tr><td><b>T2</b></td><td>Tampering</td><td>Data modification, prompt injection, poisoning</td><td>3,4,5,6</td></tr>" +
    "<tr><td><b>T3</b></td><td>Repudiation</td><td>Insufficient logging, user actions denied</td><td>1,2,3,4,5</td></tr>" +
    "<tr><td><b>T4</b></td><td>Info Disclosure</td><td>Data leakage, over-privileged access, misconfig</td><td>2,3,4,5,6</td></tr>" +
    "<tr><td><b>T5</b></td><td>Denial of Service</td><td>DDoS attacks, resource exhaustion, rate abuse</td><td>1,2,3,4</td></tr>" +
    "<tr><td><b>T6</b></td><td>Elev of Privilege</td><td>Privilege escalation, IAM misconfiguration</td><td>2,3,4,5</td></tr>" +
    "<tr><td><b>T7</b></td><td>AI-specific</td><td>LLM hallucination, harmful output, data exfil</td><td>4,6</td></tr>" +
    "<tr><td><b>T8</b></td><td>Supply Chain</td><td>Compromised dependencies, 3rd-party risk</td><td>3,4,6</td></tr>" +
    "</table></div>", 1134, 98, 420, 185, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_risk_rat", "<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>RISK RATING (Impact x Likelihood)</div><div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;'><div>🔴 Critical</div> <div>🟠 High</div> <div>🟡 Medium</div> <div>🟢 Low</div></div>", 1134, 290, 420, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");

  // 5. THREAT SCENARIOS & MITIGATIONS TABLE (x=20..1050, y=362..570)
  rect("box_scen_tbl", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>THREAT SCENARIOS &amp; MITIGATIONS (EXAMPLES)</div>" +
    "<div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;border-bottom:1px solid #CBD5E1;'><td>SCENARIO</td><td>DESCRIPTION</td><td>IMPACT</td><td>MITIGATIONS / CONTROLS</td><td>DETECTION</td></tr>" +
    "<tr><td><b>Prompt Injection</b></td><td>Attacker crafts input to override instructions</td><td><span style='color:#DC2626;font-weight:800;'>High</span></td><td>Input validation, guardrails, least data exposure</td><td>Prompt anomaly detection</td></tr>" +
    "<tr><td><b>Data Leakage</b></td><td>Excessive permissions allow unauthorized access</td><td><span style='color:#DC2626;font-weight:800;'>High</span></td><td>Least privilege IAM, Row/Col security, VPC-SC</td><td>SCC alerts, Access logs</td></tr>" +
    "<tr><td><b>Model Poisoning</b></td><td>Malicious data introduced to corrupt training/retrieval</td><td><span style='color:#DC2626;font-weight:800;'>High</span></td><td>Data provenance, trusted pipelines, quality checks</td><td>Data drift monitoring</td></tr>" +
    "<tr><td><b>DDoS / Exhaustion</b></td><td>Attackers overwhelm services with traffic</td><td><span style='color:#D97706;font-weight:800;'>Medium</span></td><td>Cloud Armor, rate limiting, autoscaling, caching</td><td>Traffic anomaly detection</td></tr>" +
    "<tr><td><b>Privilege Escalation</b></td><td>Attacker gains higher privileges through misconfig</td><td><span style='color:#DC2626;font-weight:800;'>High</span></td><td>Strong IAM policies, SoD, regular access reviews</td><td>IAM change monitoring</td></tr>" +
    "<tr><td><b>Supply Chain Risk</b></td><td>Vulnerable third-party dependency causes breach</td><td><span style='color:#D97706;font-weight:800;'>Medium</span></td><td>Vendor risk assessment, SCA dependency scanning</td><td>Vuln scanning &amp; alerts</td></tr>" +
    "</table></div>", 20, 362, 1030, 208, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. RIGHT LOWER PANELS: CONTROLS & COMPLIANCE (x=1058..1560, y=362..570)
  rect("box_sec_ctrl", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:3px;'>KEY SECURITY CONTROLS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>✔ Identity &amp; Access (IAM, Least Privilege)<br/>✔ Network Security (VPC-SC, Firewall, WAF)<br/>✔ Data Protection (Encryption, DLP)<br/>✔ Application Security (Secure SDLC)<br/>✔ Secrets Management (Secret Manager)<br/>✔ Logging &amp; Audit (Cloud Audit Logs)<br/>✔ Monitoring &amp; Alerting (SCC, SIEM, SLOs)<br/>✔ Backup &amp; Resilience (Multi-region)</div>", 1058, 362, 246, 208, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_comp_std", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>COMPLIANCE &amp; STANDARDS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>✔ GDPR, HIPAA, 21 CFR Part 11<br/>✔ ISO/IEC 27001, 27017, 27018<br/>✔ SOC 2 (CC6.1, CC7.1, CC7.2)<br/>✔ NIST AI RMF, NIST CSF<br/>✔ OWASP Top 10 for LLM Apps<br/>✔ Google Cloud Security Best Practices</div>", 1312, 362, 248, 208, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. BOTTOM ROW: INCIDENT RESPONSE, MONITORING, RISK DONUT & NOTES (x=20..1560, y=578..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;'>INCIDENT RESPONSE FLOW (HIGH LEVEL)</div><div style='font-size:9px;line-height:1.4;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div>🔍<br/>Detect</div> <div>➔</div> <div>📑<br/>Triage</div> <div>➔</div> <div>🛡️<br/>Contain</div> <div>➔</div> <div>🧹<br/>Eradicate</div> <div>➔</div> <div>📝<br/>Review</div></div>", 20, 578, 360, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");
  
  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>MONITORING &amp; DETECTION</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>📈 Cloud Monitoring (Metrics, Logs)<br/>🛡️ SIEM Integration (Chronicle / Splunk)<br/>🔔 Alerting Policies (Email, PagerDuty)<br/>🌐 Intelligence Feeds (Threat Intel)</div>", 390, 578, 270, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>RISK ASSESSMENT SUMMARY</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>🔴 Critical: 10%<br/>🟠 High: 35%<br/>🟡 Medium: 40%<br/>🟢 Low: 15%</div>", 670, 578, 200, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div><div style='font-size:9px;line-height:1.4;color:#64748B;'>• Threats are continuously reviewed and updated.<br/>• Model risks require human oversight and guardrails.<br/>• Perform periodic threat modeling reviews &amp; penetration tests.<br/>• Maintain end-to-end traceability and auditability.</div>", 880, 578, 680, 197, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER LEGEND (x=20..1560, y=785..815)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Data Flow</div>" +
    "<div>- - - Trust Boundary</div>" +
    "<div>··· External Connection</div>" +
    "<div>🟦 Trust Zone</div>" +
    "<div>🟪 Threat ID (See Catalog)</div>" +
    "</div>", 20, 785, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_27_threat_model" name="Template 27: Threat Model Architecture">
    <mxGraphModel dx="1440" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
