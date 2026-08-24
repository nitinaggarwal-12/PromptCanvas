/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 33: Architecture Matrix Heatmap
 * Matches 100% of images/33.png (Evaluate & Prioritize Architectural Options for NovaCura)
 * 5 architectural options (A..E) across 9 weighted criteria, weighted score/rank rows,
 * recommended migration path, key considerations, and top recommendation trophy card on 1536x1024.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate33MatrixHeatmapXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;fontColor=#0F172A;fontSize=12;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=12;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  rect("hdr_num", `<span style="font-size:32px;font-weight:900;color:#FFFFFF;">33</span>`, 16, 12, 68, 54, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;arcSize=12;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:25px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE MATRIX HEATMAP</div>` +
    `<div style='font-size:13px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Evaluate &amp; Prioritize Architectural Options for NovaCura</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "align=left;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:30px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  rect("hdr_brand", brandHtml, 860, 12, 270, 54, "fillColor=none;strokeColor=none;align=left;");

  const howToReadHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>HOW TO READ</div><div style='font-size:8.5px;line-height:1.3;color:#0F172A;'><b>Scores:</b> 1 (Low / Poor) to 5 (High / Excellent)<br/><span style='color:#16A34A;'>● Green = Strong</span> &nbsp;|&nbsp; <span style='color:#CA8A04;'>● Yellow = Moderate</span> &nbsp;|&nbsp; <span style='color:#DC2626;'>● Red = Weak</span><br/><b>Higher score is better for all criteria</b></div>`;
  rect("hdr_obj", howToReadHtml, 1140, 12, 380, 54, "strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. LEFT SIDEBAR: EVALUATION CRITERIA & LEGEND (x=16..196, y=74..694) ====================
  rect("box_l_crit", "", 16, 74, 180, 620, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.8;align=left;verticalAlign=top;");
  rect("lbl_l_crit", `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">EVALUATION CRITERIA (WEIGHT)</b>`, 16, 74, 180, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");

  const critItems = [
    { t: "Business Value (15%)", icon: "👤" },
    { t: "Scalability (10%)", icon: "📈" },
    { t: "Performance (10%)", icon: "⚡" },
    { t: "Security (15%)", icon: "🛡️" },
    { t: "Compliance Fit (10%)", icon: "✔" },
    { t: "Cost Efficiency (10%)", icon: "💰" },
    { t: "Implementation Effort (10%)", icon: "⚙️" },
    { t: "Operational Complexity (5%)", icon: "🔄" },
    { t: "Time to Value (5%)", icon: "⏱️" }
  ];
  const lHtml = `<div style="font-size:7.5px;line-height:1.45;color:#0F172A;padding:4px;">
    ${critItems.map(ci => `<div style="margin-bottom:4px;">${ci.icon} <b>${ci.t}</b></div>`).join("")}
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <div style="font-weight:800;color:#1E3A8A;">SCORING GUIDE</div>
    <b>5</b> &nbsp; Excellent &nbsp;– Best in class<br/>
    <b>4</b> &nbsp; Good &nbsp;– Strong capability<br/>
    <b>3</b> &nbsp; Moderate &nbsp;– Acceptable / Avg<br/>
    <b>2</b> &nbsp; Low &nbsp;– Below average<br/>
    <b>1</b> &nbsp; Poor &nbsp;– Not recommended<br/>
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <div style="font-weight:800;color:#1E3A8A;">WEIGHTAGE SUMMARY</div>
    Total Weight: <b>100%</b><br/>
    Higher Total Score = Better Overall Fit
  </div>`;
  text("txt_l_crit", lHtml, 18, 100, 176, 590, "align=left;verticalAlign=top;");

  // ==================== 3. CENTER MATRIX: 5 OPTIONS x 9 CRITERIA (x=204..1520, y=74..694) ====================
  rect("box_matrix_bg", "", 204, 74, 1316, 620, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_opts", "<div style='font-size:12px;font-weight:900;color:#1E3A8A;text-align:center;'>ARCHITECTURE OPTIONS</div>", 204, 78, 1316, 16, "align=center;");

  const matrixTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:8px;text-align:center;'>
    <!-- Option Headers -->
    <tr style='height:70px;'>
      <td style='width:140px;border:none;'></td>
      <!-- Option A -->
      <td style='width:210px;padding:3px;vertical-align:top;'>
        <div style='background:#1E40AF;color:#FFF;padding:3px;font-weight:900;font-size:8.5px;border-radius:3px;'>A &nbsp; CURRENT STATE (AS-IS)</div>
        <div style='font-size:7px;color:#64748B;margin:2px 0;'>On-Prem Monolith</div>
        <div style='font-size:14px;'>🗄️ ➔ 💻</div>
      </td>
      <!-- Option B -->
      <td style='width:210px;padding:3px;vertical-align:top;'>
        <div style='background:#0D9488;color:#FFF;padding:3px;font-weight:900;font-size:8.5px;border-radius:3px;'>B &nbsp; LIFT &amp; SHIFT</div>
        <div style='font-size:7px;color:#64748B;margin:2px 0;'>Rehost to Cloud (IaaS)</div>
        <div style='font-size:14px;'>☁️ ➔ 🖥️</div>
      </td>
      <!-- Option C -->
      <td style='width:210px;padding:3px;vertical-align:top;'>
        <div style='background:#7C3AED;color:#FFF;padding:3px;font-weight:900;font-size:8.5px;border-radius:3px;'>C &nbsp; MODERNIZE</div>
        <div style='font-size:7px;color:#64748B;margin:2px 0;'>Incremental Modernization</div>
        <div style='font-size:14px;'>📦 ➔ ⚡</div>
      </td>
      <!-- Option D -->
      <td style='width:210px;padding:3px;vertical-align:top;'>
        <div style='background:#EA580C;color:#FFF;padding:3px;font-weight:900;font-size:8.5px;border-radius:3px;'>D &nbsp; CLOUD NATIVE</div>
        <div style='font-size:7px;color:#64748B;margin:2px 0;'>Microservices + Managed Svcs</div>
        <div style='font-size:14px;'>☸️ ➔ 🚀</div>
      </td>
      <!-- Option E -->
      <td style='width:210px;padding:3px;vertical-align:top;'>
        <div style='background:#2563EB;color:#FFF;padding:3px;font-weight:900;font-size:8.5px;border-radius:3px;'>E &nbsp; FUTURE STATE (AI-NATIVE)</div>
        <div style='font-size:7px;color:#64748B;margin:2px 0;'>AI-Native, Autonomous Platform</div>
        <div style='font-size:14px;'>🧠 ➔ 🧬</div>
      </td>
      <td style='width:65px;font-weight:900;color:#1E3A8A;font-size:8px;'>WEIGHT<br/>(%)</td>
      <td style='width:75px;font-weight:900;color:#1E3A8A;font-size:8px;'>BEST OPTION<br/>(BY CRITERIA)</td>
    </tr>

    <!-- Criteria Row 1 -->
    <tr style='height:36px;border-top:1.5px solid #CBD5E1;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>👤 Business Value</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#22C55E;color:#FFF;font-weight:900;font-size:13px;'>5</td>
      <td style='font-weight:800;'>15%</td>
      <td><span style='background:#2563EB;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;'>E</span></td>
    </tr>

    <!-- Criteria Row 2 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>📈 Scalability</td>
      <td style='background:#FCA5A5;font-weight:900;font-size:13px;'>1</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#22C55E;color:#FFF;font-weight:900;font-size:13px;'>5</td>
      <td style='font-weight:800;'>10%</td>
      <td><span style='background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>D</span> / <span style='background:#2563EB;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>E</span></td>
    </tr>

    <!-- Criteria Row 3 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>⚡ Performance</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#22C55E;color:#FFF;font-weight:900;font-size:13px;'>5</td>
      <td style='font-weight:800;'>10%</td>
      <td><span style='background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>D</span> / <span style='background:#2563EB;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>E</span></td>
    </tr>

    <!-- Criteria Row 4 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>🛡️ Security</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#22C55E;color:#FFF;font-weight:900;font-size:13px;'>5</td>
      <td style='font-weight:800;'>15%</td>
      <td><span style='background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>D</span> / <span style='background:#2563EB;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>E</span></td>
    </tr>

    <!-- Criteria Row 5 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>✔ Compliance Fit</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#22C55E;color:#FFF;font-weight:900;font-size:13px;'>5</td>
      <td style='font-weight:800;'>10%</td>
      <td><span style='background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>D</span> / <span style='background:#2563EB;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>E</span></td>
    </tr>

    <!-- Criteria Row 6 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>💰 Cost Efficiency</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='font-weight:800;'>10%</td>
      <td><span style='background:#0D9488;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>B</span> / <span style='background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>D</span> / <span style='background:#2563EB;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>E</span></td>
    </tr>

    <!-- Criteria Row 7 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>⚙️ Implementation Effort</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FCA5A5;font-weight:900;font-size:13px;'>1</td>
      <td style='font-weight:800;'>10%</td>
      <td><span style='background:#1E40AF;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;'>A</span></td>
    </tr>

    <!-- Criteria Row 8 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>🔄 Operational Complexity</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='font-weight:800;'>5%</td>
      <td><span style='background:#7C3AED;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>C</span> / <span style='background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>D</span></td>
    </tr>

    <!-- Criteria Row 9 -->
    <tr style='height:36px;border-top:1px solid #E2E8F0;'>
      <td style='text-align:left;padding-left:6px;font-weight:800;'>⏱️ Time to Value</td>
      <td style='background:#4ADE80;font-weight:900;font-size:13px;'>5</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:13px;'>4</td>
      <td style='background:#FEF08A;font-weight:900;font-size:13px;'>3</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='background:#FED7AA;font-weight:900;font-size:13px;'>2</td>
      <td style='font-weight:800;'>5%</td>
      <td><span style='background:#1E40AF;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>A</span> / <span style='background:#0D9488;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;'>B</span></td>
    </tr>

    <!-- Weighted Score Row -->
    <tr style='height:44px;border-top:2px solid #CBD5E1;background:#F8FAFC;'>
      <td style='text-align:left;padding-left:6px;font-weight:900;color:#1E3A8A;'>WEIGHTED SCORE<br/>(OUT OF 5)</td>
      <td style='background:#FCA5A5;font-weight:900;font-size:16px;'>2.40</td>
      <td style='background:#FEF08A;font-weight:900;font-size:16px;'>3.25</td>
      <td style='background:#BBF7D0;font-weight:900;font-size:16px;'>3.85</td>
      <td style='background:#4ADE80;font-weight:900;font-size:16px;'>4.45</td>
      <td style='background:#22C55E;color:#FFF;font-weight:900;font-size:16px;'>4.50</td>
      <td colspan='2' style='font-weight:800;color:#1E3A8A;'>OVERALL RANK</td>
    </tr>

    <!-- Rank Row -->
    <tr style='height:36px;border-top:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='text-align:left;padding-left:6px;font-weight:900;color:#1E3A8A;'>RANK (1 = BEST)</td>
      <td style='font-weight:900;font-size:15px;color:#DC2626;'>5</td>
      <td style='font-weight:900;font-size:15px;color:#CA8A04;'>4</td>
      <td style='font-weight:900;font-size:15px;color:#16A34A;'>3</td>
      <td style='font-weight:900;font-size:15px;color:#16A34A;'>2</td>
      <td style='font-weight:900;font-size:16px;color:#2563EB;'>1</td>
      <td colspan='2' style='font-weight:900;color:#2563EB;'>Option E Recommended</td>
    </tr>
  </table>`;
  text("txt_matrix_table", matrixTableHtml, 208, 98, 1308, 590, "align=left;verticalAlign=top;padding=4;");

  // ==================== 4. BOTTOM SECTION: 4 PANELS (y=704..954, h=242) ====================
  // Summary Insights (x=16, w=380)
  rect("box_b_sum", "", 16, 704, 380, 242, "strokeColor=#2563EB;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_sum", `<b style="font-size:10.5px;color:#2563EB;">SUMMARY INSIGHTS</b>`, 16, 704, 380, 24, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=0;align=center;");
  const sumHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:6px;">
    ⭐ <b>Option E (AI-Native)</b> scores highest overall, delivering best long-term value, scalability, security &amp; compliance.<br/><br/>
    ⭐ <b>Option D (Cloud Native)</b> is a strong near-term target with balanced cost, performance &amp; operational efficiency.<br/><br/>
    ⭐ <b>Option C (Modernize)</b> offers a practical stepping stone with lower risk and incremental benefits.<br/><br/>
    ⭐ <b>Option A (As-Is)</b> has lowest strategic value and scalability; not future-ready.
  </div>`;
  text("txt_b_sum", sumHtml, 18, 732, 376, 210, "align=left;verticalAlign=top;padding=4;");

  // Recommended Path (x=406, w=350)
  rect("box_b_path", "", 406, 704, 350, 242, "strokeColor=#7C3AED;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_path", `<b style="font-size:10.5px;color:#7C3AED;">RECOMMENDED PATH</b>`, 406, 704, 350, 24, "fillColor=#FAF5FF;strokeColor=#CBD5E1;rounded=0;align=center;");
  const pathHtml = `<div style="font-size:8px;text-align:center;padding:6px;">
    <div style="display:flex;justify-content:space-around;margin-top:10px;">
      <div><span style="font-size:7px;color:#64748B;">Now (Q2 2025)</span><br/><div style="background:#7C3AED;color:#FFF;padding:4px 8px;border-radius:4px;font-weight:900;margin-top:2px;">C<br/><span style="font-size:7px;font-weight:400;">Modernize</span></div></div>
      <div style="font-size:18px;align-self:center;">➔</div>
      <div><span style="font-size:7px;color:#64748B;">Next 12–18 Mo</span><br/><div style="background:#EA580C;color:#FFF;padding:4px 8px;border-radius:4px;font-weight:900;margin-top:2px;">D<br/><span style="font-size:7px;font-weight:400;">Cloud Native</span></div></div>
      <div style="font-size:18px;align-self:center;">➔</div>
      <div><span style="font-size:7px;color:#64748B;">18–36 Months</span><br/><div style="background:#2563EB;color:#FFF;padding:4px 8px;border-radius:4px;font-weight:900;margin-top:2px;">E<br/><span style="font-size:7px;font-weight:400;">AI-Native</span></div></div>
    </div>
    <div style="font-size:7.5px;color:#64748B;margin-top:14px;line-height:1.4;">
      Quick wins, carve out high value services ➔ Refactor, adopt managed services ➔ Autonomous ops &amp; ecosystem.
    </div>
  </div>`;
  text("txt_b_path", pathHtml, 408, 732, 346, 210, "align=center;verticalAlign=top;padding=4;");

  // Key Considerations (x=766, w=350)
  rect("box_b_cons", "", 766, 704, 350, 242, "strokeColor=#16A34A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_cons", `<b style="font-size:10.5px;color:#16A34A;">KEY CONSIDERATIONS</b>`, 766, 704, 350, 24, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=0;align=center;");
  const consHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:6px;">
    ☑ <b>Business priorities &amp; risk appetite</b><br/>
    ☑ <b>Regulatory &amp; data residency needs</b><br/>
    ☑ <b>Skill sets &amp; organizational readiness</b><br/>
    ☑ <b>Change management &amp; training</b><br/>
    ☑ <b>TCO &amp; ROI over 3–5 years</b>
  </div>`;
  text("txt_b_cons", consHtml, 768, 732, 346, 210, "align=left;verticalAlign=top;padding=6;");

  // Top Recommendation Trophy Card (x=1126, w=394)
  rect("box_b_trophy", "", 1126, 704, 394, 242, "strokeColor=#2563EB;fillColor=#EFF6FF;strokeWidth=1.8;align=center;verticalAlign=top;");
  rect("lbl_b_trophy", `<b style="font-size:10.5px;color:#1E40AF;">TOP RECOMMENDATION</b>`, 1126, 704, 394, 24, "fillColor=#DBEAFE;strokeColor=#CBD5E1;rounded=0;align=center;");
  const trophyHtml = `<div style="text-align:center;padding:12px;">
    <div style="font-size:36px;">🏆</div>
    <div style="font-size:16px;font-weight:900;color:#1E40AF;margin-top:4px;">Option E</div>
    <div style="font-size:12px;font-weight:800;color:#0F172A;margin-top:2px;">AI-Native Platform</div>
    <div style="font-size:9.5px;color:#64748B;margin-top:8px;font-weight:600;">Best long-term strategic fit for NovaCura</div>
  </div>`;
  text("txt_b_trophy", trophyHtml, 1128, 732, 390, 210, "align=center;verticalAlign=middle;padding=6;");

  // ==================== 5. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> 1 Poor &nbsp;|&nbsp; 2 Low &nbsp;|&nbsp; 3 Moderate &nbsp;|&nbsp; 4 Good &nbsp;|&nbsp; 5 Excellent</div>
    <div>Review Cadence: Annual &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 16, 962, 1504, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_33_architecture_matrix_heatmap" name="Template 33: Architecture Matrix Heatmap">
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
