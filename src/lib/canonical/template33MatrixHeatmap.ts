/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 33: Architecture Matrix Heatmap
 * Matches 100% of images/33.png:
 * - Full-height Heatmap Grid with 16px bold numbers and exact colors (Dark Green, Light Green, Yellow, Orange, Red)
 * - 5 Option column headers with colored badges, subtitles, and vector architecture flow diagrams
 * - Best Option column with pill badges (E, D/E, B/D/E, A, C/D, A/B)
 * - Weighted Score and Rank summary rows
 * - Summary Insights with colored star bullets
 * - Recommended Path with 3 linked phase cards
 * - Key Considerations with green checkmarks
 * - Top Recommendation Trophy Card
 * - 1536x1024 master resolution with zero voids
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate33MatrixHeatmapXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "33", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE MATRIX HEATMAP</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Evaluate &amp; Prioritize Architectural Options for NovaCura</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const howToReadHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>HOW TO READ</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'><b>Scores:</b> 1 (Low / Poor) to 5 (High / Excellent)<br/><span style='color:#16A34A;font-weight:700;'>Colors: Green = Strong</span> &nbsp; <span style='color:#CA8A04;font-weight:700;'>Yellow = Moderate</span> &nbsp; <span style='color:#DC2626;font-weight:700;'>Red = Weak</span><br/><b>Higher score is better for all criteria</b></div>`;
  cell("hdr_obj", howToReadHtml, 1140, 12, 380, 54, "overflow=hidden;whiteSpace=wrap;rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;html=1;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. LEFT SIDEBAR (x=16..236, y=74..750) ====================
  // Evaluation Criteria (Weight)
  cell("box_l_crit", "", 16, 74, 220, 310, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.8;");
  cell("lbl_l_crit", "EVALUATION CRITERIA (WEIGHT)", 16, 74, 220, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");
  const critItems = [
    { t: "Business Value (15%)", icon: "📈" },
    { t: "Scalability (10%)", icon: "🚀" },
    { t: "Performance (10%)", icon: "⚡" },
    { t: "Security (15%)", icon: "🛡️" },
    { t: "Compliance Fit (10%)", icon: "⚖️" },
    { t: "Cost Efficiency (10%)", icon: "💰" },
    { t: "Implementation Effort (10%)", icon: "⚙️" },
    { t: "Operational Complexity (5%)", icon: "🧩" },
    { t: "Time to Value (5%)", icon: "⏱️" }
  ];
  critItems.forEach((ci, idx) => {
    cell(`ci_${idx}`, `<div style="font-size:9.5px;font-weight:700;color:#0F172A;">${ci.icon} &nbsp; ${ci.t}</div>`, 22, 104 + idx * 30, 210, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Scoring Guide (y=390, h=140)
  cell("box_l_score", "", 16, 390, 220, 140, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_l_score", "SCORING GUIDE", 16, 390, 220, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const scoreHtml = `<div style="font-size:9px;line-height:1.6;color:#0F172A;padding:6px 12px;">
    <b>5</b> &nbsp;&nbsp; <b>Excellent</b> &nbsp; – Best in class<br/>
    <b>4</b> &nbsp;&nbsp; <b>Good</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – Strong capability<br/>
    <b>3</b> &nbsp;&nbsp; <b>Moderate</b> – Acceptable / Avg<br/>
    <b>2</b> &nbsp;&nbsp; <b>Low</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – Below average<br/>
    <b>1</b> &nbsp;&nbsp; <b>Poor</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – Not recommended
  </div>`;
  cell("txt_l_score", scoreHtml, 18, 412, 216, 114, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Weightage Summary (y=536, h=86)
  cell("box_l_weight", "", 16, 536, 220, 86, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_l_weight", "WEIGHTAGE SUMMARY", 16, 536, 220, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const weightHtml = `<div style="font-size:9px;line-height:1.5;color:#0F172A;padding:8px 12px;">
    Total Weight: &nbsp; <b>100%</b><br/>
    <span style="color:#64748B;font-size:8.5px;">Higher Total Score<br/>= Better Overall Fit</span>
  </div>`;
  cell("txt_l_weight", weightHtml, 18, 558, 216, 62, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Architecture Options Legend (y=628, h=122)
  cell("box_l_opt_leg", "", 16, 628, 220, 122, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_l_opt_leg", "ARCHITECTURE OPTIONS LEGEND", 16, 628, 220, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const optLegHtml = `<div style="font-size:8.5px;line-height:1.45;color:#0F172A;padding:4px 8px;">
    <span style="background:#1E40AF;color:#FFF;padding:1px 4px;border-radius:2px;font-weight:800;">A</span> Option A: Current State (As-Is)<br/>
    <span style="background:#0D9488;color:#FFF;padding:1px 4px;border-radius:2px;font-weight:800;">B</span> Option B: Lift &amp; Shift<br/>
    <span style="background:#7C3AED;color:#FFF;padding:1px 4px;border-radius:2px;font-weight:800;">C</span> Option C: Modernize (Incremental)<br/>
    <span style="background:#EA580C;color:#FFF;padding:1px 4px;border-radius:2px;font-weight:800;">D</span> Option D: Cloud Native (Target)<br/>
    <span style="background:#1D4ED8;color:#FFF;padding:1px 4px;border-radius:2px;font-weight:800;">E</span> Option E: Future State (AI-Native)
  </div>`;
  cell("txt_l_opt_leg", optLegHtml, 18, 650, 216, 96, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 3. CENTER: MATRIX HEATMAP (x=244..1520, y=74..750) ====================
  cell("box_matrix_bg", "", 244, 74, 1276, 676, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_opts", "ARCHITECTURE OPTIONS", 244, 78, 1276, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");

  // Table HTML for 5 Options x 9 Criteria + Scores + Ranks
  const matrixHtml = `<table style="width:100%;border-collapse:collapse;text-align:center;font-family:Inter,sans-serif;">
    <!-- Column Headers -->
    <tr style="height:76px;border-bottom:2px solid #CBD5E1;">
      <td style="width:140px;border:none;"></td>
      
      <!-- Option A -->
      <td style="width:180px;padding:4px;vertical-align:top;border-right:1px solid #CBD5E1;">
        <div style="background:#1E40AF;color:#FFFFFF;padding:3px;font-weight:900;font-size:9.5px;border-radius:3px;">A &nbsp; CURRENT STATE (AS-IS)</div>
        <div style="font-size:8px;color:#64748B;margin:3px 0;">On-Prem Monolith</div>
        <div style="font-size:16px;">🗄️ ➔ 💻</div>
      </td>

      <!-- Option B -->
      <td style="width:180px;padding:4px;vertical-align:top;border-right:1px solid #CBD5E1;">
        <div style="background:#0D9488;color:#FFFFFF;padding:3px;font-weight:900;font-size:9.5px;border-radius:3px;">B &nbsp; LIFT &amp; SHIFT</div>
        <div style="font-size:8px;color:#64748B;margin:3px 0;">Rehost to Cloud (IaaS)</div>
        <div style="font-size:16px;">☁️ ➔ 🖥️</div>
      </td>

      <!-- Option C -->
      <td style="width:180px;padding:4px;vertical-align:top;border-right:1px solid #CBD5E1;">
        <div style="background:#7C3AED;color:#FFFFFF;padding:3px;font-weight:900;font-size:9.5px;border-radius:3px;">C &nbsp; MODERNIZE</div>
        <div style="font-size:8px;color:#64748B;margin:3px 0;">Incremental Modernization</div>
        <div style="font-size:16px;">☁️ ➔ 📦</div>
      </td>

      <!-- Option D -->
      <td style="width:180px;padding:4px;vertical-align:top;border-right:1px solid #CBD5E1;">
        <div style="background:#EA580C;color:#FFFFFF;padding:3px;font-weight:900;font-size:9.5px;border-radius:3px;">D &nbsp; CLOUD NATIVE</div>
        <div style="font-size:8px;color:#64748B;margin:3px 0;">Microservices + Managed Services</div>
        <div style="font-size:16px;">☁️ ➔ 🧩</div>
      </td>

      <!-- Option E -->
      <td style="width:180px;padding:4px;vertical-align:top;border-right:1.5px solid #CBD5E1;">
        <div style="background:#1D4ED8;color:#FFFFFF;padding:3px;font-weight:900;font-size:9.5px;border-radius:3px;">E &nbsp; FUTURE STATE (AI-NATIVE)</div>
        <div style="font-size:8px;color:#64748B;margin:3px 0;">AI-Native, Autonomous Platform</div>
        <div style="font-size:16px;">☁️ ➔ 🧠</div>
      </td>

      <!-- WEIGHT -->
      <td style="width:80px;font-size:9.5px;font-weight:800;color:#1E3A8A;vertical-align:middle;border-right:1px solid #CBD5E1;">
        WEIGHT<br/>(%)
      </td>

      <!-- BEST OPTION -->
      <td style="width:110px;font-size:9.5px;font-weight:800;color:#1E3A8A;vertical-align:middle;">
        BEST OPTION<br/>(BY CRITERIA)
      </td>
    </tr>

    <!-- Row 1: Business Value -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">📈 &nbsp; Business Value</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">15%</td>
      <td><span style="background:#1D4ED8;color:#FFF;padding:2px 8px;border-radius:3px;font-weight:900;font-size:9.5px;">E</span></td>
    </tr>

    <!-- Row 2: Scalability -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">🚀 &nbsp; Scalability</td>
      <td style="background:#FCA5A5;color:#991B1B;font-size:16px;font-weight:900;border:1px solid #FFF;">1</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">10%</td>
      <td><span style="background:#EA580C;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">D</span> / <span style="background:#1D4ED8;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">E</span></td>
    </tr>

    <!-- Row 3: Performance -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">⚡ &nbsp; Performance</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">10%</td>
      <td><span style="background:#EA580C;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">D</span> / <span style="background:#1D4ED8;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">E</span></td>
    </tr>

    <!-- Row 4: Security -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">🛡️ &nbsp; Security</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">15%</td>
      <td><span style="background:#EA580C;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">D</span> / <span style="background:#1D4ED8;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">E</span></td>
    </tr>

    <!-- Row 5: Compliance Fit -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">⚖️ &nbsp; Compliance Fit</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">10%</td>
      <td><span style="background:#EA580C;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">D</span> / <span style="background:#1D4ED8;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">E</span></td>
    </tr>

    <!-- Row 6: Cost Efficiency -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">💰 &nbsp; Cost Efficiency</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">10%</td>
      <td><span style="background:#0D9488;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;font-size:8.5px;">B</span>/<span style="background:#EA580C;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;font-size:8.5px;">D</span>/<span style="background:#1D4ED8;color:#FFF;padding:2px 4px;border-radius:3px;font-weight:900;font-size:8.5px;">E</span></td>
    </tr>

    <!-- Row 7: Implementation Effort -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">⚙️ &nbsp; Implementation Effort</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FCA5A5;color:#991B1B;font-size:16px;font-weight:900;border:1px solid #FFF;">1</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">10%</td>
      <td><span style="background:#1E40AF;color:#FFF;padding:2px 8px;border-radius:3px;font-weight:900;font-size:9.5px;">A</span></td>
    </tr>

    <!-- Row 8: Operational Complexity -->
    <tr style="height:42px;border-bottom:1px solid #E2E8F0;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">🧩 &nbsp; Operational Complexity</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">5%</td>
      <td><span style="background:#7C3AED;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">C</span> / <span style="background:#EA580C;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">D</span></td>
    </tr>

    <!-- Row 9: Time to Value -->
    <tr style="height:42px;border-bottom:2px solid #CBD5E1;">
      <td style="text-align:left;padding-left:10px;font-size:9.5px;font-weight:700;">⏱️ &nbsp; Time to Value</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:16px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#BBF7D0;color:#166534;font-size:16px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:16px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#FED7AA;color:#9A3412;font-size:16px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="font-size:9.5px;font-weight:700;color:#0F172A;">5%</td>
      <td><span style="background:#1E40AF;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">A</span> / <span style="background:#0D9488;color:#FFF;padding:2px 6px;border-radius:3px;font-weight:900;font-size:9.5px;">B</span></td>
    </tr>

    <!-- WEIGHTED SCORE (OUT OF 5) -->
    <tr style="height:44px;border-bottom:1px solid #CBD5E1;background:#F8FAFC;">
      <td style="text-align:left;padding-left:10px;font-size:10px;font-weight:900;color:#1E3A8A;">WEIGHTED SCORE<br/>(OUT OF 5)</td>
      <td style="background:#FCA5A5;color:#991B1B;font-size:17px;font-weight:900;border:1px solid #FFF;">2.40</td>
      <td style="background:#FEF08A;color:#854D0E;font-size:17px;font-weight:900;border:1px solid #FFF;">3.25</td>
      <td style="background:#BBF7D0;color:#166534;font-size:17px;font-weight:900;border:1px solid #FFF;">3.85</td>
      <td style="background:#16A34A;color:#FFFFFF;font-size:17px;font-weight:900;border:1px solid #FFF;">4.45</td>
      <td style="background:#15803D;color:#FFFFFF;font-size:17px;font-weight:900;border:1px solid #FFF;">4.50</td>
      <td colspan="2" style="font-size:9px;font-weight:800;color:#64748B;">OVERALL FIT SCORE</td>
    </tr>

    <!-- RANK (1 = BEST) -->
    <tr style="height:44px;background:#F8FAFC;">
      <td style="text-align:left;padding-left:10px;font-size:10px;font-weight:900;color:#1E3A8A;">RANK (1 = BEST)</td>
      <td style="background:#F87171;color:#FFFFFF;font-size:18px;font-weight:900;border:1px solid #FFF;">5</td>
      <td style="background:#FB923C;color:#FFFFFF;font-size:18px;font-weight:900;border:1px solid #FFF;">4</td>
      <td style="background:#FACC15;color:#713F12;font-size:18px;font-weight:900;border:1px solid #FFF;">3</td>
      <td style="background:#4ADE80;color:#14532D;font-size:18px;font-weight:900;border:1px solid #FFF;">2</td>
      <td style="background:#15803D;color:#FFFFFF;font-size:18px;font-weight:900;border:1px solid #FFF;">1</td>
      <td colspan="2" style="font-size:9px;font-weight:800;color:#15803D;">🏆 TOP RANK: OPTION E</td>
    </tr>
  </table>`;
  cell("txt_matrix", matrixHtml, 248, 96, 1268, 648, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;padding=0;");

  // ==================== 4. BOTTOM ROW CARDS (x=16..1520, y=758..954, h=196) ====================
  // 1. Summary Insights (x=16, w=350)
  cell("box_b_insights", "", 16, 758, 350, 196, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_insights", "SUMMARY INSIGHTS", 16, 758, 350, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const insightsHtml = `<div style="font-size:8.5px;line-height:1.45;color:#0F172A;padding:4px 8px;">
    <div style="margin-bottom:4px;"><span style="color:#2563EB;font-size:10px;">★</span> <b>Option E (AI-Native)</b> scores highest overall, delivering best long-term value, scalability, security &amp; compliance.</div>
    <div style="margin-bottom:4px;"><span style="color:#EA580C;font-size:10px;">★</span> <b>Option D (Cloud Native)</b> is a strong near-term target with balanced cost, performance &amp; operational efficiency.</div>
    <div style="margin-bottom:4px;"><span style="color:#7C3AED;font-size:10px;">★</span> <b>Option C (Modernize)</b> offers a practical stepping stone with lower risk and incremental benefits.</div>
    <div style="margin-bottom:4px;"><span style="color:#0D9488;font-size:10px;">★</span> <b>Option B (Lift &amp; Shift)</b> provides quick relocation but limited value realization.</div>
    <div><span style="color:#DC2626;font-size:10px;">★</span> <b>Option A (As-Is)</b> has lowest strategic value and scalability; not future-ready.</div>
  </div>`;
  cell("txt_b_insights", insightsHtml, 18, 784, 346, 166, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Recommended Path (x=374, w=410)
  cell("box_b_path", "", 374, 758, 410, 196, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_path", "RECOMMENDED PATH", 374, 758, 410, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  
  // 3 Stages in Recommended Path
  cell("p_stage_c", "<div style='font-size:10px;color:#64748B;font-weight:700;'>Now (Q2 2025)</div><div style='background:#7C3AED;color:#FFF;padding:4px 8px;border-radius:4px;font-weight:900;font-size:12px;margin:4px 0;'>C</div><div style='font-size:9px;font-weight:800;color:#7C3AED;'>Modernize</div><div style='font-size:7.5px;color:#64748B;margin-top:2px;'>Quick wins, carve out<br/>high value services</div>", 386, 788, 106, 120, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#DDD6FE;html=1;align=center;verticalAlign=top;padding=4;");
  cell("p_stage_d", "<div style='font-size:10px;color:#64748B;font-weight:700;'>Next 12–18 Months</div><div style='background:#EA580C;color:#FFF;padding:4px 8px;border-radius:4px;font-weight:900;font-size:12px;margin:4px 0;'>D</div><div style='font-size:9px;font-weight:800;color:#EA580C;'>Cloud Native</div><div style='font-size:7.5px;color:#64748B;margin-top:2px;'>Refactor, adopt managed<br/>services, platformization</div>", 526, 788, 110, 120, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#FED7AA;html=1;align=center;verticalAlign=top;padding=4;");
  cell("p_stage_e", "<div style='font-size:10px;color:#64748B;font-weight:700;'>18–36 Months</div><div style='background:#1D4ED8;color:#FFF;padding:4px 8px;border-radius:4px;font-weight:900;font-size:12px;margin:4px 0;'>E</div><div style='font-size:9px;font-weight:800;color:#1D4ED8;'>AI-Native</div><div style='font-size:7.5px;color:#64748B;margin-top:2px;'>Autonomous operations,<br/>AI agents, ecosystem</div>", 666, 788, 106, 120, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=top;padding=4;");

  edge("e_path_1", "p_stage_c", "p_stage_d", "strokeColor=#64748B;strokeWidth=1.8;endArrow=classic;endSize=4;");
  edge("e_path_2", "p_stage_d", "p_stage_e", "strokeColor=#64748B;strokeWidth=1.8;endArrow=classic;endSize=4;");

  cell("txt_path_sub", "<div style='font-size:8px;color:#64748B;text-align:center;'>┈┈┈┈┈┈┈┈┈ Continuous Evolution, Observability &amp; FinOps ┈┈┈┈┈┈┈┈┈➔</div>", 380, 922, 398, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 3. Key Considerations (x=792, w=240)
  cell("box_b_consid", "", 792, 758, 240, 196, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_consid", "KEY CONSIDERATIONS", 792, 758, 240, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const considHtml = `<table style="width:100%;border-collapse:collapse;font-size:9px;margin-top:6px;">
    <tr style="height:26px;"><td style="width:20px;color:#16A34A;font-size:12px;">☑</td><td><b>Business priorities &amp; risk appetite</b></td></tr>
    <tr style="height:26px;"><td style="color:#16A34A;font-size:12px;">☑</td><td><b>Regulatory &amp; data residency needs</b></td></tr>
    <tr style="height:26px;"><td style="color:#16A34A;font-size:12px;">☑</td><td><b>Skill sets &amp; organizational readiness</b></td></tr>
    <tr style="height:26px;"><td style="color:#16A34A;font-size:12px;">☑</td><td><b>Change management &amp; training</b></td></tr>
    <tr style="height:26px;"><td style="color:#16A34A;font-size:12px;">☑</td><td><b>TCO &amp; ROI over 3–5 years</b></td></tr>
  </table>`;
  cell("txt_b_consid", considHtml, 796, 784, 232, 166, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // 4. Top Recommendation (x=1040, w=480)
  cell("box_b_rec", "", 1040, 758, 480, 196, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_b_rec", "TOP RECOMMENDATION", 1040, 758, 480, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const recHtml = `<table style="width:100%;border-collapse:collapse;margin-top:16px;">
    <tr>
      <td style="width:100px;text-align:center;vertical-align:middle;">
        <span style="font-size:48px;">🏆</span>
      </td>
      <td style="vertical-align:middle;padding-left:12px;">
        <div style="font-size:20px;font-weight:900;color:#1E40AF;letter-spacing:0.5px;">Option E</div>
        <div style="font-size:15px;font-weight:800;color:#0F172A;margin-top:2px;">AI-Native Platform</div>
        <div style="font-size:11px;color:#64748B;font-weight:600;margin-top:8px;">Best long-term strategic fit for NovaCura</div>
      </td>
    </tr>
  </table>`;
  cell("txt_b_rec", recHtml, 1046, 788, 468, 160, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=6;");

  // ==================== 5. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; 🟥 1 Poor &nbsp;|&nbsp; 🟧 2 Low &nbsp;|&nbsp; 🟨 3 Moderate &nbsp;|&nbsp; 🟩 4 Good &nbsp;|&nbsp; 🟩 5 Excellent &nbsp;|&nbsp; 🗄️ On-Prem &nbsp;|&nbsp; ☁️ IaaS &nbsp;|&nbsp; 📦 Containers &nbsp;|&nbsp; 🧩 Microservices &nbsp;|&nbsp; 🧠 AI/ML</div>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

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
