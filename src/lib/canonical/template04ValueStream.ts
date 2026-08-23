/**
 * Master 1:1 Exact Replica Generator for Canonical Template 04: Value Stream Map
 * Matches 100% of images/04.png (NOVACURA Bio-Pharma Product Value Stream)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate04ValueStreamXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">04</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">VALUE STREAM — NOVACURA BIO-PHARMA PRODUCT</div>
        <div style="font-size:12.5px;font-weight:600;color:#64748B;margin-top:2px;">End-to-End Value Delivery from Research to Patient Impact</div>
      </td>
    </tr>
  </table>`;
  text("header_title", titleHtml, 20, 16, 850, 52, "align=left;");

  // Top Right Logo
  const logoHtml = `<table style="text-align:right;float:right;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:26px;">🧬</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1.5px;line-height:1;">NOVACURA</div>
        <div style="font-size:8px;font-weight:700;color:#64748B;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div>
      </td>
    </tr>
  </table>`;
  text("header_logo", logoHtml, 1240, 16, 300, 48, "align=right;");

  // =========================================================================
  // 2. MAIN 5-STAGE PIPELINE & MATRIX (x: 20 to 1220, y: 78 to 560)
  // =========================================================================
  rect("matrix_frame", "", 20, 78, 1200, 482, "strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");

  // Left Row Header Titles
  text("lbl_val_stages", "<b>VALUE<br/>STAGES</b>", 25, 92, 95, 45, "fontSize=10.5;fontColor=#0F2A4A;align=center;");
  text("lbl_key_act", "<b>KEY ACTIVITIES</b>", 25, 230, 95, 30, "fontSize=10;fontColor=#0F2A4A;align=center;");
  text("lbl_val_metrics", "<b>VALUE METRICS</b>", 25, 375, 95, 30, "fontSize=10;fontColor=#0F2A4A;align=center;");
  text("lbl_val_flow", "<b>VALUE FLOW</b>", 25, 495, 95, 30, "fontSize=10;fontColor=#0F2A4A;align=center;");

  // Horizontal Dividers inside matrix
  rect("div_row_1", "", 20, 175, 1200, 1, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");
  rect("div_row_2", "", 20, 345, 1200, 1, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");
  rect("div_row_3", "", 20, 465, 1200, 1, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");
  // Vertical column divider after left labels
  rect("div_col_0", "", 125, 78, 1, 482, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");

  // 5 Phase Columns Definition
  const stages = [
    {
      id: "s1",
      num: "1",
      name: "RESEARCH & DISCOVERY",
      color: "#16A34A",
      bgLight: "#F0FDF4",
      icon: "🔬",
      activities: [
        "Target identification",
        "Biology & assay research",
        "Hit discovery & validation",
        "Lead optimization",
        "In silico modeling"
      ],
      metrics: [
        { label: "Discovery<br/>Success Rate", icon: "🎯", color: "#16A34A" },
        { label: "Candidate<br/>Backlog", icon: "🧪", color: "#16A34A" }
      ],
      flowItem: "Ideas & Hypotheses",
      flowIcon: "💡"
    },
    {
      id: "s2",
      num: "2",
      name: "DEVELOPMENT",
      color: "#2563EB",
      bgLight: "#EFF6FF",
      icon: "⚗️",
      activities: [
        "Preclinical studies",
        "Clinical trial design",
        "CMC & formulation",
        "Biomarker development",
        "Data management"
      ],
      metrics: [
        { label: "Trials Started", icon: "👥", color: "#2563EB" },
        { label: "Development<br/>Cycle Time", icon: "📊", color: "#2563EB" }
      ],
      flowItem: "Validated Candidates",
      flowIcon: "📦"
    },
    {
      id: "s3",
      num: "3",
      name: "MANUFACTURING",
      color: "#7C3AED",
      bgLight: "#FAF5FF",
      icon: "🏭",
      activities: [
        "Process development",
        "Scale-up & tech transfer",
        "GMP manufacturing",
        "Quality control & testing",
        "Batch release"
      ],
      metrics: [
        { label: "First Pass Yield", icon: "🛡️", color: "#7C3AED" },
        { label: "Batch Release<br/>Cycle Time", icon: "📋", color: "#7C3AED" }
      ],
      flowItem: "Approved Therapy",
      flowIcon: "⚙️"
    },
    {
      id: "s4",
      num: "4",
      name: "COMMERCIALIZATION",
      color: "#EA580C",
      bgLight: "#FFF7ED",
      icon: "📢",
      activities: [
        "Regulatory submission",
        "Market access & pricing",
        "Launch planning",
        "Sales & distribution",
        "HCP engagement"
      ],
      metrics: [
        { label: "Time to Market", icon: "📈", color: "#EA580C" },
        { label: "Market Access<br/>Coverage", icon: "👥", color: "#EA580C" }
      ],
      flowItem: "Accessible to Patients",
      flowIcon: "🌐"
    },
    {
      id: "s5",
      num: "5",
      name: "PATIENT OUTCOMES",
      color: "#0D9488",
      bgLight: "#F0FDFA",
      icon: "👥",
      activities: [
        "Patient onboarding",
        "Therapy adherence",
        "Outcomes monitoring",
        "Real-world evidence",
        "Continuous support"
      ],
      metrics: [
        { label: "Patient Outcomes<br/>Improvement", icon: "💚", color: "#0D9488" },
        { label: "Real-World Impact", icon: "🔄", color: "#0D9488" }
      ],
      flowItem: "Better Lives",
      flowIcon: "👥"
    }
  ];

  const colWidth = 215;
  const startX = 135;

  stages.forEach((st, i) => {
    const x = startX + i * colWidth;

    // Vertical column divider
    if (i > 0) {
      rect(`div_col_${i}`, "", x - 5, 78, 1, 482, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");
    }

    // 1. Stage Header Chevron & Circle Icon (y: 84, h: 86)
    const stageHeaderHtml = `<table style="width:100%;height:100%;text-align:center;border-collapse:collapse;">
      <tr>
        <td style="font-size:10.5px;font-weight:900;color:${st.color};padding-top:2px;">
          ${st.num}. ${st.name}
        </td>
      </tr>
      <tr>
        <td style="vertical-align:middle;padding-top:4px;">
          <div style="width:44px;height:44px;border-radius:22px;background:${st.color};display:flex;align-items:center;justify-content:center;margin:0 auto;box-shadow:0 2px 6px rgba(0,0,0,0.12);">
            <span style="font-size:22px;color:#FFFFFF;">${st.icon}</span>
          </div>
        </td>
      </tr>
    </table>`;
    rect(`st_hdr_${i}`, stageHeaderHtml, x + 5, 82, colWidth - 20, 88, "strokeColor=none;fillColor=none;");

    // Inter-stage chevron arrow
    if (i < 4) {
      text(`arr_chevron_${i}`, "➔", x + colWidth - 14, 120, 18, 18, "fontSize=15;fontColor=#64748B;align=center;");
    }

    // 2. Key Activities Bullet List (y: 180, h: 160)
    let actBullets = "";
    st.activities.forEach((act) => {
      actBullets += `<div style="margin-bottom:5px;display:flex;align-items:flex-start;">
        <span style="color:${st.color};font-size:11px;margin-right:6px;line-height:1;">•</span>
        <span style="font-size:8.5px;color:#1E293B;line-height:1.25;font-weight:500;">${act}</span>
      </div>`;
    });
    const actHtml = `<div style="padding:8px 6px;text-align:left;">${actBullets}</div>`;
    rect(`st_act_${i}`, actHtml, x + 4, 180, colWidth - 18, 160, "strokeColor=none;fillColor=none;verticalAlign=top;align=left;");

    // 3. Value Metrics Cards (y: 350, h: 110)
    st.metrics.forEach((m, mIdx) => {
      const my = 352 + mIdx * 54;
      const metricHtml = `<table style="width:100%;height:100%;border-collapse:collapse;">
        <tr>
          <td style="width:28px;vertical-align:middle;text-align:center;padding-left:4px;">
            <span style="font-size:16px;">${m.icon}</span>
          </td>
          <td style="vertical-align:middle;padding-left:6px;text-align:left;">
            <div style="font-size:8.5px;font-weight:700;color:${m.color};line-height:1.2;">${m.label}</div>
          </td>
        </tr>
      </table>`;
      rect(`st_metric_${i}_${mIdx}`, metricHtml, x + 6, my, colWidth - 22, 48, "rounded=1;strokeColor=#E2E8F0;strokeWidth=1;fillColor=#FFFFFF;shadow=0;");
    });

    // 4. Value Flow Item (y: 480, h: 70)
    const flowHtml = `<div style="text-align:center;padding:4px;">
      <span style="font-size:16px;">${st.flowIcon}</span>
      <div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-top:2px;">${st.flowItem}</div>
    </div>`;
    rect(`st_flow_${i}`, flowHtml, x + 6, 480, colWidth - 40, 65, "rounded=1;strokeColor=#CBD5E1;fillColor=#FFFFFF;align=center;");

    // Flow arrow between items
    if (i < 4) {
      c.push(`<mxCell id="arr_flow_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="st_flow_${i}" target="st_flow_${i + 1}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
      c.push(`<mxCell id="arr_chevron_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="st_hdr_${i}" target="st_hdr_${i + 1}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
    }
  });

  // =========================================================================
  // 3. RIGHT COLUMN: DELIVERED OUTCOMES (x: 1240 to 1540, y: 78 to 560)
  // =========================================================================
  rect("outcomes_box", "", 1240, 78, 300, 482, "strokeColor=#0284C7;strokeWidth=1.5;fillColor=#F0F9FF;shadow=0;");
  text("outcomes_title", "<b>DELIVERED OUTCOMES</b>", 1260, 84, 260, 24, "fontSize=11.5;fontColor=#0369A1;align=center;");

  const outcomes = [
    { title: "INNOVATIVE THERAPIES", desc: "Bring novel treatments to\npatients faster", icon: "💡" },
    { title: "IMPROVED PATIENT OUTCOMES", desc: "Meaningful clinical\nand real-world impact", icon: "💚" },
    { title: "ACCESSIBLE & AFFORDABLE CARE", desc: "Wider access through efficient\ncommercialization", icon: "👥" },
    { title: "TRUSTED BY PARTNERS", desc: "Collaborate with best-in-class\nresearch & healthcare partners", icon: "🤝" },
    { title: "SUSTAINABLE GROWTH", desc: "Drive long-term value for\npatients and stakeholders", icon: "📈" },
  ];

  outcomes.forEach((oc, i) => {
    const y = 114 + i * 86;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:34px;vertical-align:middle;text-align:center;padding-left:4px;">
          <span style="font-size:18px;">${oc.icon}</span>
        </td>
        <td style="vertical-align:middle;padding-left:8px;text-align:left;">
          <div style="font-size:9.5px;font-weight:800;color:#0369A1;line-height:1.2;">${oc.title}</div>
          <div style="font-size:8px;color:#475569;margin-top:2px;line-height:1.2;">${oc.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`oc_card_${i}`, html, 1252, y, 276, 74, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1;shadow=0;");
  });

  // =========================================================================
  // 4. VALUE ENABLERS (x: 20 to 1540, y: 575 to 680)
  // =========================================================================
  rect("enablers_box", "", 20, 575, 1520, 105, "strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("enablers_title", "<b>VALUE<br/>ENABLERS</b>", 25, 608, 95, 36, "fontSize=10;fontColor=#0F2A4A;align=center;");
  rect("enablers_div", "", 125, 575, 1, 105, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");

  const enablers = [
    { title: "DATA & AI", sub: "AI/ML, Predictive\nModeling, Real-world\nData, Advanced Analytics", icon: "🧠" },
    { title: "DIGITAL PLATFORMS", sub: "Unified R&D, Clinical,\nManufacturing and\nCommercial Platforms", icon: "☁️" },
    { title: "QUALITY & COMPLIANCE", sub: "GxP Quality, Data\nIntegrity, Regulatory\nCompliance", icon: "🛡️" },
    { title: "TALENT & CULTURE", sub: "Scientific Excellence,\nCross-functional\nCollaboration", icon: "👥" },
    { title: "PARTNER ECOSYSTEM", sub: "CROs, CMOs, Academic\nPartners, Tech\nPartners", icon: "🔗" },
    { title: "SUSTAINABILITY", sub: "Environmentally\nResponsible\nOperations", icon: "🌿" },
  ];

  enablers.forEach((eb, i) => {
    const x = 140 + i * 230;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:30px;vertical-align:top;padding-top:4px;text-align:center;">
          <span style="font-size:16px;">${eb.icon}</span>
        </td>
        <td style="vertical-align:top;padding-left:6px;text-align:left;">
          <div style="font-size:9.5px;font-weight:800;color:#0F2A4A;line-height:1.2;">${eb.title}</div>
          <div style="font-size:7.5px;color:#64748B;margin-top:2px;line-height:1.2;">${eb.sub.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`eb_card_${i}`, html, x, 584, 220, 86, "rounded=1;strokeColor=#E2E8F0;fillColor=#F8FAFC;shadow=0;");
  });

  // =========================================================================
  // 5. TECHNOLOGY PLATFORM (x: 20 to 1540, y: 690 to 765)
  // =========================================================================
  rect("tech_box", "", 20, 690, 1520, 75, "strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("tech_title", "<b>TECHNOLOGY<br/>PLATFORM</b>", 25, 708, 95, 36, "fontSize=9.5;fontColor=#0F2A4A;align=center;");
  rect("tech_div", "", 125, 690, 1, 75, "fillColor=#E2E8F0;strokeColor=#E2E8F0;");

  // Google Cloud Logo on Left
  const gcpHtml = `<div style="display:flex;align-items:center;gap:6px;padding:4px;"><span style="font-size:18px;">☁️</span><span style="font-size:11px;font-weight:800;color:#1E293B;">Google Cloud</span></div>`;
  rect("gcp_logo_pod", gcpHtml, 135, 708, 120, 38, "rounded=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;align=center;");

  const techIcons = [
    { name: "Vertex AI", icon: "✨" },
    { name: "BigQuery", icon: "🔍" },
    { name: "Dataplex", icon: "🕸️" },
    { name: "Dataflow", icon: "🌊" },
    { name: "Pub/Sub", icon: "📡" },
    { name: "Apigee", icon: "⚡" },
    { name: "Looker", icon: "📊" },
    { name: "Gemini", icon: "✨" },
    { name: "MCP / A2A", icon: "🔄" },
    { name: "Kubernetes", icon: "☸️" },
    { name: "Terraform", icon: "🏗️" },
    { name: "GitHub", icon: "🐙" },
  ];

  techIcons.forEach((tc, i) => {
    const x = 268 + i * 105;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:15px;">${tc.icon}</span><div style="font-size:7.5px;font-weight:700;color:#334155;margin-top:1px;">${tc.name}</div></div>`;
    rect(`tc_icon_${i}`, html, x, 706, 98, 42, "rounded=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;align=center;");
  });

  // =========================================================================
  // 6. VALUE OUTCOMES FOOTER BAR (x: 20 to 1540, y: 775 to 835)
  // =========================================================================
  rect("val_outcomes_box", "", 20, 775, 1520, 60, "strokeColor=#16A34A;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  text("val_outcomes_title", "<b>VALUE<br/>OUTCOMES</b>", 25, 788, 95, 32, "fontSize=9.5;fontColor=#15803D;align=center;");
  rect("val_outcomes_div", "", 125, 775, 1, 60, "fillColor=#BBF7D0;strokeColor=#BBF7D0;");

  const valPods = [
    { title: "Faster Innovation", icon: "⏱️" },
    { title: "Higher Quality", icon: "🏅" },
    { title: "Operational Excellence", icon: "⚙️" },
    { title: "Patient-Centricity", icon: "🩺" },
    { title: "Financial Performance", icon: "💲" },
    { title: "Societal Impact", icon: "🌍" },
  ];

  valPods.forEach((vp, i) => {
    const x = 140 + i * 230;
    const html = `<table style="width:100%;height:100%;text-align:center;">
      <tr>
        <td style="vertical-align:middle;"><span style="font-size:16px;">${vp.icon}</span></td>
        <td style="vertical-align:middle;text-align:left;padding-left:4px;">
          <div style="font-size:9.5px;font-weight:800;color:#14532D;">${vp.title}</div>
        </td>
      </tr>
    </table>`;
    rect(`vp_pod_${i}`, html, x, 784, 220, 42, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;align=center;");
  });

  // =========================================================================
  // 7. LEGEND & COPYRIGHT (y: 845 to 885)
  // =========================================================================
  const legendHtml = `<table style="width:100%;height:100%;text-align:left;">
    <tr>
      <td style="width:65px;vertical-align:middle;font-size:9.5px;font-weight:900;color:#0F172A;">LEGEND:</td>
      <td style="vertical-align:middle;">
        <div style="display:flex;align-items:center;gap:18px;font-size:8px;color:#334155;">
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#DCFCE7;border:1px solid #16A34A;border-radius:2px;"></div><div>Research &amp; Discovery</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#DBEAFE;border:1px solid #2563EB;border-radius:2px;"></div><div>Development</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#EDE9FE;border:1px solid #7C3AED;border-radius:2px;"></div><div>Manufacturing</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#FFEDD5;border:1px solid #EA580C;border-radius:2px;"></div><div>Commercialization</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#CCFBF1;border:1px solid #0D9488;border-radius:2px;"></div><div>Patient Outcomes</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;border:1px solid #94A3B8;border-radius:2px;"></div><div>Process / Stage</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>—➔</span><div>Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>- - ➔</span><div>Information / Feedback</div></div>
        </div>
      </td>
      <td style="width:180px;text-align:right;vertical-align:middle;font-size:8px;color:#64748B;">
        &copy; 2026 NOVACURA Bio-Pharma
      </td>
    </tr>
  </table>`;
  text("legend_footer", legendHtml, 20, 845, 1520, 36, "align=left;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_04_value_stream" name="04 — Value Stream Map">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1580" pageHeight="900" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
