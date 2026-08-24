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
  rect("num_badge", "27", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>THREAT MODEL ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Identify, assess, and mitigate threats across NovaCura to protect data, ensure system resilience, maintain compliance, and preserve customer trust.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. TOP SYSTEM CONTEXT & DATA FLOW (TRUST ZONES) (x=20..1120, y=72..215)
  rect("box_zones_main", "", 20, 72, 1090, 145, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_zones_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>SYSTEM CONTEXT &amp; DATA FLOW (TRUST ZONES)</span>", 20, 74, 1090, 12, "strokeColor=none;fillColor=none;align=center;");

  const zones = [
    { n: "1. USERS &amp; CLIENTS", items: "• Web App<br/>• Mobile App<br/>• APIs / Integrations<br/>• Client Systems", icon: "👥" },
    { n: "2. EDGE &amp; ACCESS", items: "• Cloud Armor (WAF)<br/>• HTTPS / TLS<br/>• Identity-Aware Proxy<br/>• DDoS Protection", icon: "🛡️" },
    { n: "3. APPLICATION LAYER", items: "• Frontend (UI)<br/>• API Gateway<br/>• Auth Service<br/>• Orchestration Service", icon: "⚙️" },
    { n: "4. AI &amp; AGENT LAYER", items: "• Agent Orchestrator<br/>• LLM / Model Serving<br/>• Vector Search Service<br/>• Tool / Function Calls", icon: "🧠" },
    { n: "5. DATA &amp; STORAGE", items: "• Vector DB (AlloyDB / PG)<br/>• Operational DB (Cloud SQL)<br/>• Object Storage (GCS)<br/>• Knowledge Store", icon: "🗄️" },
    { n: "6. EXTERNAL SYSTEMS", items: "• Regulatory Sources<br/>• Third-Party APIs<br/>• Partner Systems<br/>• External Tools", icon: "🌐" }
  ];

  zones.forEach((zn, idx) => {
    const zx = 28 + idx * 179;
    rect(`zn_${idx}`, `<div style='font-size:9px;font-weight:800;color:#1E3A8A;text-align:center;'>${zn.icon} ${zn.n}</div><div style='font-size:8px;line-height:1.3;color:#0F172A;margin-top:2px;'>${zn.items}</div>`, zx, 88, 172, 95, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");
  });

  rect("box_cross_sec", "<div style='font-size:8px;font-weight:800;color:#2563EB;text-align:center;'>🔒 IAM &amp; Access Mgmt &nbsp;|&nbsp; 🔑 Secrets Manager &nbsp;|&nbsp; 🔑 KMS / Encryption &nbsp;|&nbsp; 🛡️ VPC Service Controls &nbsp;|&nbsp; 📑 Audit Logging &nbsp;|&nbsp; 🛡️ SCC &nbsp;|&nbsp; 📈 Monitoring &amp; Alerting</div>", 28, 186, 1074, 18, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // 3. TOP RIGHT: THREAT CATALOG (STRIDE) (x=1120..1560, y=72..215)
  rect("box_stride", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:2px;text-align:center;'>THREAT CATALOG (STRIDE)</div><div style='font-size:8px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td style='width:22px;'>ID</td><td style='width:60px;'>STRIDE</td><td>THREAT EXAMPLES</td><td style='width:40px;'>AREAS</td></tr><tr><td><span style='background:#2563EB;color:#FFF;padding:1px 3px;border-radius:2px;'>T1</span></td><td><b>Spoofing</b></td><td>Credential theft, account takeover, API abuse</td><td>1,2,3,4</td></tr><tr><td><span style='background:#16A34A;color:#FFF;padding:1px 3px;border-radius:2px;'>T2</span></td><td><b>Tampering</b></td><td>Data mod, prompt injection, data poisoning</td><td>3,4,5,6</td></tr><tr><td><span style='background:#7C3AED;color:#FFF;padding:1px 3px;border-radius:2px;'>T3</span></td><td><b>Repudiation</b></td><td>Insufficient logging, user actions denied</td><td>1,2,3,4,5</td></tr><tr><td><span style='background:#D97706;color:#FFF;padding:1px 3px;border-radius:2px;'>T4</span></td><td><b>Info Disclosure</b></td><td>Data leakage, over-privileged access, misconfig</td><td>2,3,4,5,6</td></tr><tr><td><span style='background:#DC2626;color:#FFF;padding:1px 3px;border-radius:2px;'>T5</span></td><td><b>Denial of Svc</b></td><td>DDoS attacks, resource exhaustion, rate abuse</td><td>1,2,3,4</td></tr><tr><td><span style='background:#0284C7;color:#FFF;padding:1px 3px;border-radius:2px;'>T6</span></td><td><b>Elev of Priv</b></td><td>Privilege escalation, IAM misconfiguration</td><td>2,3,4,5</td></tr><tr><td><span style='background:#9333EA;color:#FFF;padding:1px 3px;border-radius:2px;'>T7</span></td><td><b>AI-specific</b></td><td>LLM hallucination, harmful output, data exfil</td><td>4,6</td></tr><tr><td><span style='background:#64748B;color:#FFF;padding:1px 3px;border-radius:2px;'>T8</span></td><td><b>Supply Chain</b></td><td>Compromised dependencies, 3rd-party risk</td><td>3,4,6</td></tr></table></div>", 1120, 72, 440, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 4. ATTACK SURFACE MAP STRIP (x=20..1560, y=222..282)
  rect("box_attack_surf", "", 20, 222, 1540, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_attack_surf", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>ATTACK SURFACE MAP</span>", 20, 224, 1540, 10, "strokeColor=none;fillColor=none;align=center;");

  const surfs = [
    { t: "Public Endpoints", tags: ["T1", "T5", "T2"], icon: "🌐" },
    { t: "Auth &amp; Identity", tags: ["T1", "T6"], icon: "🔒" },
    { t: "APIs &amp; Gateways", tags: ["T1", "T2", "T5"], icon: "🛡️" },
    { t: "Web / UI", tags: ["T2", "T5"], icon: "💻" },
    { t: "Agent Orchestrator", tags: ["T2", "T7", "T6"], icon: "🧠" },
    { t: "LLM / Model Serving", tags: ["T2", "T7", "T3"], icon: "🤖" },
    { t: "Data Stores", tags: ["T2", "T4", "T6"], icon: "🗄️" },
    { t: "Object Storage", tags: ["T4", "T2", "T5"], icon: "🗃️" },
    { t: "External APIs", tags: ["T1", "T6", "T2"], icon: "🌐" },
    { t: "CI/CD &amp; DevOps", tags: ["T5", "T6", "T8"], icon: "🏗️" }
  ];
  surfs.forEach((sf, idx) => {
    const sx = 26 + idx * 153;
    rect(`sf_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${sf.icon} ${sf.t}</div><div style='text-align:center;margin-top:2px;'>${sf.tags.map(tg => `<span style='background:#EFF6FF;border:1px solid #2563EB;color:#2563EB;font-size:10px;padding:1px 2px;border-radius:2px;font-weight:700;margin-right:1px;'>${tg}</span>`).join("")}</div>`, sx, 236, 147, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 5. THREAT SCENARIOS & MITIGATIONS TABLE (x=20..1120, y=288..465)
  rect("box_threat_table", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:3px;'>THREAT SCENARIOS &amp; MITIGATIONS (EXAMPLES)</div><div style='font-size:8px;line-height:1.25;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'><td style='width:110px;'>THREAT SCENARIO</td><td style='width:150px;'>DESCRIPTION</td><td style='width:90px;'>POTENTIAL IMPACT</td><td style='width:190px;'>MITIGATIONS / CONTROLS</td><td>DETECTION &amp; RESPONSE</td></tr><tr><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>Prompt Injection</span></td><td>Attacker crafts input to override instructions and exfiltrate data.</td><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>🔺 High</span> Data leakage, harmful responses</td><td>• Input validation &amp; content filtering<br/>• System prompts &amp; guardrails<br/>• Least data exposure, RAG with scoped context</td><td>• Prompt anomaly detection<br/>• Output monitoring &amp; alerting<br/>• Human review for high-risk outputs</td></tr><tr><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>Data Leakage via Over-Privileged Access</span></td><td>Excessive permissions allow unauthorized data access.</td><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>🔺 High</span> PII/PHI exposure, compliance breach</td><td>• Least privilege IAM<br/>• Row/Column level security<br/>• VPC Service Controls, Restricted sharing</td><td>• Access logs &amp; anomaly detection<br/>• SCC findings &amp; alerts<br/>• Automated containment</td></tr><tr><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>Model / Data Poisoning</span></td><td>Malicious data introduced to corrupt training or retrieval data.</td><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>🔺 High</span> Incorrect / biased answers, reputational damage</td><td>• Data provenance &amp; validation<br/>• Trusted data pipelines<br/>• Regular data quality checks</td><td>• Data drift &amp; quality monitoring<br/>• Anomaly detection in embeddings<br/>• Rollback &amp; quarantine</td></tr><tr><td><span style='background:#FFFBEB;border:1px solid #D97706;color:#D97706;padding:1px 3px;border-radius:2px;font-weight:700;'>DDoS / Service Exhaustion</span></td><td>Attackers overwhelm services with traffic or heavy requests.</td><td><span style='background:#FFFBEB;border:1px solid #D97706;color:#D97706;padding:1px 3px;border-radius:2px;font-weight:700;'>⚠️ Medium</span> Service disruption, SLA impact</td><td>• Cloud Armor, DDoS protection<br/>• Rate limiting, quotas, autoscaling<br/>• Caching &amp; request throttling</td><td>• Traffic anomaly detection<br/>• Auto-scaling &amp; load shedding<br/>• Incident response runbooks</td></tr><tr><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>Privilege Escalation</span></td><td>Attacker gains higher privileges through misconfig or exploits.</td><td><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>🔺 High</span> Full system access, data compromise</td><td>• Strong IAM policies &amp; SoD<br/>• Regular access reviews<br/>• Hardened configs, patch management</td><td>• IAM change monitoring<br/>• Privilege escalation alerts<br/>• Immediate revocation &amp; forensics</td></tr><tr><td><span style='background:#FFFBEB;border:1px solid #D97706;color:#D97706;padding:1px 3px;border-radius:2px;font-weight:700;'>Third-Party / Supply Chain Risk</span></td><td>Vulnerable third-party or dependencies cause breach.</td><td><span style='background:#FFFBEB;border:1px solid #D97706;color:#D97706;padding:1px 3px;border-radius:2px;font-weight:700;'>⚠️ Medium</span> Data / service impact, trust erosion</td><td>• Vendor risk assessment<br/>• Dependency scanning (SCA)<br/>• Contractual &amp; security requirements</td><td>• Vulnerability scanning &amp; alerts<br/>• External dependency monitoring<br/>• Incident communication plan</td></tr></table></div>", 20, 288, 1090, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. RIGHT CARDS: KEY CONTROLS & COMPLIANCE (x=1120..1560, y=288..465)
  rect("box_r_controls", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:1px;'>KEY SECURITY CONTROLS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>✔ <b>Identity &amp; Access</b> (IAM, Least Privilege)<br/>✔ <b>Network Security</b> (VPC-SC, Firewall, WAF)<br/>✔ <b>Data Protection</b> (Encryption, DLP)<br/>✔ <b>Application Security</b> (Secure SDLC)<br/>✔ <b>Secrets Management</b> (Secret Manager)<br/>✔ <b>Logging &amp; Audit</b> (Cloud Audit Logs)<br/>✔ <b>Monitoring &amp; Alerting</b> (SCC, SIEM, SLOs)<br/>✔ <b>Backup &amp; Resilience</b> (Multi-region)</div>", 1120, 288, 215, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_compliance", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;'>COMPLIANCE &amp; STANDARDS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>✔ <b>GDPR, HIPAA, 21 CFR Part 11</b><br/>✔ <b>ISO/IEC 27001, 27017, 27018</b><br/>✔ <b>SOC 2</b> (CC6.1, CC7.1, CC7.2)<br/>✔ <b>NIST AI RMF, NIST CSF</b><br/>✔ <b>OWASP Top 10 for LLM Apps</b><br/>✔ <b>Google Cloud Security Best Practices</b></div>", 1345, 288, 215, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 7. BOTTOM ROW: INCIDENT FLOW, MONITORING, RISK SUMMARY, LEGEND, NOTES (x=20..1560, y=470..740)
  rect("bot_inc_flow", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:6px;text-align:center;'>INCIDENT RESPONSE FLOW (HIGH LEVEL)</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:20px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔍<br/><b>Detect</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>📑<br/><b>Triage</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🛡️<br/><b>Contain</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🧹<br/><b>Eradicate</b></div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:4px;'>🚀<br/><b>Recover</b></div> <div>➔</div> <div style='border:1px solid #2563EB;background:#EFF6FF;padding:4px;border-radius:4px;'>📋<br/><b>Post-Incident<br/>Review</b></div></div>", 20, 470, 480, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("bot_mon_det", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>MONITORING &amp; DETECTION</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📈 <b>Cloud Monitoring</b> (Metrics, Logs)<br/>🛡️ <b>SIEM Integration</b> (Chronicle / Splunk)<br/>🔔 <b>Alerting Policies</b> (Email, Slack, PagerDuty)<br/>📡 <b>Intelligence Feeds</b> (Threat Intel)</div>", 510, 470, 260, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_risk_sum", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;text-align:center;'>RISK ASSESSMENT SUMMARY</div><div style='font-size:8px;color:#0F172A;line-height:1.5;margin-top:10px;'>🔴 <b>Critical:</b> 10%<br/>🟠 <b>High:</b> 35%<br/>🟡 <b>Medium:</b> 40%<br/>🟢 <b>Low:</b> 15%</div>", 780, 470, 220, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("bot_legend", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>── Data Flow<br/>- - Trust Boundary<br/>······ External Connection<br/>🟦 Trust Zone<br/>🏷️ Threat ID (See Catalog)</div>", 1010, 470, 220, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.35;color:#64748B;'>• Threats are continuously reviewed and updated.<br/>• Model risks require human oversight and guardrails.<br/>• Perform periodic threat modeling reviews &amp; penetration tests.<br/>• Maintain end-to-end traceability and auditability.</div>", 1240, 470, 320, 266, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_27_threat_model_architecture" name="Template 27: Threat Model Architecture">
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
