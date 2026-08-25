/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 11 — SEQUENCE DIAGRAM
 * 
 * 1:1 Ground-Truth Reproduction of images/11.png
 * "11 SEQUENCE DIAGRAM | NOVACURA Enterprise AI Platform for Biopharma"
 * Scenario: Scientist asks clinical question in AI Copilot -> Context Retrieval -> LLM Reasoning -> Cited Response & Audit
 * 
 * Geometric Coordinates: 1600x980px, 12 Lifelines across full width, 20 Numbered Steps (❶..⑳), ALT Flow Box, 5 Bottom Summary Cards
 */

export function generateTemplate11SequenceDiagramXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const isRetail = domainFlavor === 'retail';
  const isFintech = domainFlavor === 'fintech';
  const isManufacturing = domainFlavor === 'manufacturing';
  const isSaas = domainFlavor === 'saas';

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const line = (id: string, x1: number, y1: number, x2: number, y2: number, style: string) => {
    c.push(`<mxCell id="${id}" style="edgeStyle=none;html=1;strokeWidth=1.2;${style}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  };

  const msg = (id: string, label: string, x1: number, x2: number, y: number, color = "#1D4ED8", dashed = false, align: "center" | "left" = "center") => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const alignStyle = align === "left" ? "align=left;spacingLeft=6;" : "align=center;";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=none;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;${alignStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y}" as="sourcePoint"/><mxPoint x="${x2}" y="${y}" as="targetPoint"/></mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_11", "<b style='font-size:24px;color:#FFFFFF;'>11</b>", 40, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const subHeader = isRetail
    ? "OMNIVUE Hyper-Scale Omnichannel E-Commerce &amp; Logistics Platform"
    : isFintech
    ? "NEXUSFIN High-Speed Wealth Engine"
    : isManufacturing
    ? "SYNACTIVE Autonomous Industrial IoT &amp; Drone Fleet Platform"
    : isSaas
    ? "AETHER Autonomous Multi-Tenant Enterprise Cloud Platform"
    : "Enterprise Architecture Platform";

  const brandIcon = isRetail ? "🛒" : isFintech ? "💳" : isManufacturing ? "🏭" : isSaas ? "☁️" : "⚡";
  const brandName = isRetail ? "OMNIVUE" : isFintech ? "NEXUSFIN" : isManufacturing ? "SYNACTIVE" : isSaas ? "AETHER" : "ENTERPRISE";
  const brandTagline = isRetail
    ? "Hyper-Scale Commerce. Intelligent Fulfillment."
    : isFintech
    ? "Autonomous Wealth. Zero-Latency Execution."
    : isManufacturing
    ? "Industrial IoT. Real-Time Telemetry."
    : isSaas
    ? "Autonomous Multi-Tenant Cloud Scale."
    : "Scalable. Resilient. Secure.";

  // Title Block
  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">SEQUENCE DIAGRAM</div>
    <div style="font-size:12px;font-weight:700;color:#475569;margin-top:2px;">${subHeader}</div>
  </div>`;
  text("header_title", titleHtml, 102, 14, 750, 40, "align=left;verticalAlign=middle;");

  // Top-Right Brand Logo Block
  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">${brandIcon}</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">${brandName}</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">${brandTagline}</div>
  </div>`;
  text("brand_block", brandHtml, 1240, 12, 310, 44, "align=right;verticalAlign=top;");

  // Scenario Card
  const scenarioText = isRetail
    ? "<b style='color:#0284C7;'>Scenario:</b> Shopper initiates 1-Click Checkout in Storefront <span style='color:#64748B;'>→</span> Order Saga reserves WMS inventory (TTL 900s), tokenizes payment via Stripe PCI CDE <span style='color:#64748B;'>→</span> Confirms order and dispatches warehouse Kafka event."
    : isFintech
    ? "<b style='color:#0284C7;'>Scenario:</b> Trader / User initiates ISO 20022 wire transfer <span style='color:#64748B;'>→</span> Payment Saga checks real-time FX &amp; risk limits <span style='color:#64748B;'>→</span> Commits double-entry ledger in Spanner <span style='color:#64748B;'>→</span> Scores real-time fraud in Vertex AI &amp; emits Swift settlement event."
    : isManufacturing
    ? "<b style='color:#0284C7;'>Scenario:</b> Fleet Operator initiates mission dispatch in Control UI <span style='color:#64748B;'>→</span> Gateway checks ADS-B airspace clearance &amp; battery reserve <span style='color:#64748B;'>→</span> Flight Saga reserves micro-hub charging slot <span style='color:#64748B;'>→</span> Emits real-time telemetry event to SCADA mesh."
    : isSaas
    ? "<b style='color:#0284C7;'>Scenario:</b> Platform Admin initiates tenant API provisioning <span style='color:#64748B;'>→</span> API Gateway verifies OIDC token &amp; rate limits <span style='color:#64748B;'>→</span> Orchestrator provisions tenant shard &amp; IAM policy <span style='color:#64748B;'>→</span> Returns verified credentials &amp; logs audit trail."
    : "<b style='color:#0284C7;'>Scenario:</b> Scientist asks a clinical question in AI Copilot <span style='color:#64748B;'>→</span> System retrieves contextual data, reasons with LLM <span style='color:#64748B;'>→</span> Returns answer with citations and logs interaction.";

  const scenarioHtml = `<div style="font-size:10px;color:#0F172A;font-weight:600;">
    ${scenarioText}
  </div>`;
  rect("scenario_card", scenarioHtml, 40, 62, 1080, 26, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;spacingLeft=10;verticalAlign=middle;");

  // =========================================================================
  // 2. 12 LIFELINE PARTICIPANTS ACROSS TOP (y: 98, h: 46)
  // =========================================================================
  const lifelines = isRetail
    ? [
        { id: "p_user", name: "Shopper<br><span style='color:#64748B;font-weight:500;'>(Mobile/Web)</span>", icon: "👤", color: "#1D4ED8", bg: "#EFF6FF", x: 40, w: 90 },
        { id: "p_copilot", name: "Storefront App<br><span style='color:#64748B;font-weight:500;'>(Next.js Client)</span>", icon: "🛒", color: "#1D4ED8", bg: "#EFF6FF", x: 155, w: 96 },
        { id: "p_gateway", name: "API Gateway<br><span style='color:#64748B;font-weight:500;'>(Apigee X)</span>", icon: "🌐", color: "#0D9488", bg: "#F0FDFA", x: 275, w: 96 },
        { id: "p_auth", name: "Auth Service<br><span style='color:#64748B;font-weight:500;'>(Cloud Identity)</span>", icon: "🛡️", color: "#0284C7", bg: "#F0F9FF", x: 395, w: 100 },
        { id: "p_orch", name: "Order Orchestrator<br><span style='color:#64748B;font-weight:500;'>(Saga Engine)</span>", icon: "⚙️", color: "#7C3AED", bg: "#FAF5FF", x: 518, w: 96 },
        { id: "p_rag", name: "Pricing Engine<br><span style='color:#64748B;font-weight:500;'>(Redis Mesh)</span>", icon: "🏷️", color: "#7C3AED", bg: "#FAF5FF", x: 638, w: 96 },
        { id: "p_vdb", name: "Inventory Hold<br><span style='color:#64748B;font-weight:500;'>(WMS Engine)</span>", icon: "📦", color: "#0284C7", bg: "#F0F9FF", x: 758, w: 104 },
        { id: "p_data", name: "Payment Vault<br><span style='color:#64748B;font-weight:500;'>(Stripe / PCI CDE)</span>", icon: "💳", color: "#059669", bg: "#F0FDF4", x: 885, w: 108 },
        { id: "p_llm", name: "Order Ledger<br><span style='color:#64748B;font-weight:500;'>(Cloud Spanner)</span>", icon: "🗄️", color: "#7C3AED", bg: "#FAF5FF", x: 1015, w: 96 },
        { id: "p_policy", name: "Fraud &amp; Tax<br><span style='color:#64748B;font-weight:500;'>Service</span>", icon: "🛡️", color: "#6D28D9", bg: "#FAF5FF", x: 1135, w: 106 },
        { id: "p_audit", name: "Audit &amp; Logging<br><span style='color:#64748B;font-weight:500;'>(Cloud Logging)</span>", icon: "📑", color: "#0284C7", bg: "#F0F9FF", x: 1262, w: 102 },
        { id: "p_mon", name: "Monitoring<br><span style='color:#64748B;font-weight:500;'>(Cloud Monitoring)</span>", icon: "📊", color: "#0284C7", bg: "#F0F9FF", x: 1385, w: 104 },
      ]
    : isFintech
    ? [
        { id: "p_user", name: "Trader / Sender<br><span style='color:#64748B;font-weight:500;'>(Financial Client)</span>", icon: "👤", color: "#1D4ED8", bg: "#EFF6FF", x: 40, w: 90 },
        { id: "p_copilot", name: "Payment App<br><span style='color:#64748B;font-weight:500;'>(Portal UI)</span>", icon: "💳", color: "#1D4ED8", bg: "#EFF6FF", x: 155, w: 96 },
        { id: "p_gateway", name: "API Gateway<br><span style='color:#64748B;font-weight:500;'>(Apigee mTLS)</span>", icon: "🌐", color: "#0D9488", bg: "#F0FDFA", x: 275, w: 96 },
        { id: "p_auth", name: "Auth &amp; HSM<br><span style='color:#64748B;font-weight:500;'>(Cloud KMS)</span>", icon: "🛡️", color: "#0284C7", bg: "#F0F9FF", x: 395, w: 100 },
        { id: "p_orch", name: "Payment Saga<br><span style='color:#64748B;font-weight:500;'>(Orchestrator)</span>", icon: "⚙️", color: "#7C3AED", bg: "#FAF5FF", x: 518, w: 96 },
        { id: "p_rag", name: "Risk &amp; FX Engine<br><span style='color:#64748B;font-weight:500;'>(Redis Mesh)</span>", icon: "🏷️", color: "#7C3AED", bg: "#FAF5FF", x: 638, w: 96 },
        { id: "p_vdb", name: "Ledger Hold<br><span style='color:#64748B;font-weight:500;'>(Spanner Hold)</span>", icon: "🗄️", color: "#0284C7", bg: "#F0F9FF", x: 758, w: 104 },
        { id: "p_data", name: "Clearing Gateway<br><span style='color:#64748B;font-weight:500;'>(FedNow / Swift)</span>", icon: "🏛️", color: "#059669", bg: "#F0FDF4", x: 885, w: 108 },
        { id: "p_llm", name: "Ledger Core<br><span style='color:#64748B;font-weight:500;'>(Cloud Spanner)</span>", icon: "🗄️", color: "#7C3AED", bg: "#FAF5FF", x: 1015, w: 96 },
        { id: "p_policy", name: "AML &amp; Fraud<br><span style='color:#64748B;font-weight:500;'>(Vertex AI Graph)</span>", icon: "🛡️", color: "#6D28D9", bg: "#FAF5FF", x: 1135, w: 106 },
        { id: "p_audit", name: "SAR &amp; Audit Log<br><span style='color:#64748B;font-weight:500;'>(Cloud Logging)</span>", icon: "📑", color: "#0284C7", bg: "#F0F9FF", x: 1262, w: 102 },
        { id: "p_mon", name: "FinOps Telemetry<br><span style='color:#64748B;font-weight:500;'>(Cloud Monitoring)</span>", icon: "📊", color: "#0284C7", bg: "#F0F9FF", x: 1385, w: 104 },
      ]
    : isManufacturing
    ? [
        { id: "p_user", name: "Fleet Operator<br><span style='color:#64748B;font-weight:500;'>(Control UI)</span>", icon: "👤", color: "#1D4ED8", bg: "#EFF6FF", x: 40, w: 90 },
        { id: "p_copilot", name: "Mission App<br><span style='color:#64748B;font-weight:500;'>(Edge Client)</span>", icon: "🛸", color: "#1D4ED8", bg: "#EFF6FF", x: 155, w: 96 },
        { id: "p_gateway", name: "API Gateway<br><span style='color:#64748B;font-weight:500;'>(Apigee mTLS)</span>", icon: "🌐", color: "#0D9488", bg: "#F0FDFA", x: 275, w: 96 },
        { id: "p_auth", name: "Auth &amp; Device KMS<br><span style='color:#64748B;font-weight:500;'>(Cloud KMS)</span>", icon: "🛡️", color: "#0284C7", bg: "#F0F9FF", x: 395, w: 100 },
        { id: "p_orch", name: "Flight Saga<br><span style='color:#64748B;font-weight:500;'>(Orchestrator)</span>", icon: "⚙️", color: "#7C3AED", bg: "#FAF5FF", x: 518, w: 96 },
        { id: "p_rag", name: "Telemetry Engine<br><span style='color:#64748B;font-weight:500;'>(MQTT / Redis)</span>", icon: "🏷️", color: "#7C3AED", bg: "#FAF5FF", x: 638, w: 96 },
        { id: "p_vdb", name: "Airspace Hold<br><span style='color:#64748B;font-weight:500;'>(UTM Corridor)</span>", icon: "🛰️", color: "#0284C7", bg: "#F0F9FF", x: 758, w: 104 },
        { id: "p_data", name: "Sensor Data APIs<br><span style='color:#64748B;font-weight:500;'>(SCADA / PLC)</span>", icon: "🏭", color: "#059669", bg: "#F0FDF4", x: 885, w: 108 },
        { id: "p_llm", name: "Mission Ledger<br><span style='color:#64748B;font-weight:500;'>(Cloud Spanner)</span>", icon: "🗄️", color: "#7C3AED", bg: "#FAF5FF", x: 1015, w: 96 },
        { id: "p_policy", name: "Safety &amp; FAA<br><span style='color:#64748B;font-weight:500;'>(Collision Guard)</span>", icon: "🛡️", color: "#6D28D9", bg: "#FAF5FF", x: 1135, w: 106 },
        { id: "p_audit", name: "Audit &amp; Telemetry<br><span style='color:#64748B;font-weight:500;'>(Cloud Logging)</span>", icon: "📑", color: "#0284C7", bg: "#F0F9FF", x: 1262, w: 102 },
        { id: "p_mon", name: "IoT Telemetry<br><span style='color:#64748B;font-weight:500;'>(Cloud Monitoring)</span>", icon: "📊", color: "#0284C7", bg: "#F0F9FF", x: 1385, w: 104 },
      ]
    : isSaas
    ? [
        { id: "p_user", name: "Platform Admin<br><span style='color:#64748B;font-weight:500;'>(Client App)</span>", icon: "👤", color: "#1D4ED8", bg: "#EFF6FF", x: 40, w: 90 },
        { id: "p_copilot", name: "SaaS Console<br><span style='color:#64748B;font-weight:500;'>(Portal UI)</span>", icon: "💻", color: "#1D4ED8", bg: "#EFF6FF", x: 155, w: 96 },
        { id: "p_gateway", name: "API Gateway<br><span style='color:#64748B;font-weight:500;'>(Envoy Mesh)</span>", icon: "🌐", color: "#0D9488", bg: "#F0FDFA", x: 275, w: 96 },
        { id: "p_auth", name: "Auth &amp; OIDC<br><span style='color:#64748B;font-weight:500;'>(Cloud Identity)</span>", icon: "🛡️", color: "#0284C7", bg: "#F0F9FF", x: 395, w: 100 },
        { id: "p_orch", name: "Service Orchestrator<br><span style='color:#64748B;font-weight:500;'>(GKE Microservice)</span>", icon: "⚙️", color: "#7C3AED", bg: "#FAF5FF", x: 518, w: 96 },
        { id: "p_rag", name: "Config Engine<br><span style='color:#64748B;font-weight:500;'>(Redis Cache)</span>", icon: "🏷️", color: "#7C3AED", bg: "#FAF5FF", x: 638, w: 96 },
        { id: "p_vdb", name: "Tenant Meta<br><span style='color:#64748B;font-weight:500;'>(BigQuery Index)</span>", icon: "🗄️", color: "#0284C7", bg: "#F0F9FF", x: 758, w: 104 },
        { id: "p_data", name: "Tenant Data APIs<br><span style='color:#64748B;font-weight:500;'>(Storage Mesh)</span>", icon: "📁", color: "#059669", bg: "#F0FDF4", x: 885, w: 108 },
        { id: "p_llm", name: "Tenant DB Core<br><span style='color:#64748B;font-weight:500;'>(Cloud Spanner)</span>", icon: "🗄️", color: "#7C3AED", bg: "#FAF5FF", x: 1015, w: 96 },
        { id: "p_policy", name: "RBAC &amp; Quota<br><span style='color:#64748B;font-weight:500;'>(Policy Engine)</span>", icon: "🛡️", color: "#6D28D9", bg: "#FAF5FF", x: 1135, w: 106 },
        { id: "p_audit", name: "Audit &amp; Logging<br><span style='color:#64748B;font-weight:500;'>(Cloud Logging)</span>", icon: "📑", color: "#0284C7", bg: "#F0F9FF", x: 1262, w: 102 },
        { id: "p_mon", name: "Observability<br><span style='color:#64748B;font-weight:500;'>(Cloud Monitoring)</span>", icon: "📊", color: "#0284C7", bg: "#F0F9FF", x: 1385, w: 104 },
      ]
    : [
        { id: "p_user", name: "Scientist<br><span style='color:#64748B;font-weight:500;'>(User)</span>", icon: "👤", color: "#1D4ED8", bg: "#EFF6FF", x: 40, w: 90 },
        { id: "p_copilot", name: "AI Copilot<br><span style='color:#64748B;font-weight:500;'>(Web App)</span>", icon: "💬", color: "#1D4ED8", bg: "#EFF6FF", x: 155, w: 96 },
        { id: "p_gateway", name: "API Gateway<br><span style='color:#64748B;font-weight:500;'>(Apigee X)</span>", icon: "🌐", color: "#0D9488", bg: "#F0FDFA", x: 275, w: 96 },
        { id: "p_auth", name: "Auth Service<br><span style='color:#64748B;font-weight:500;'>(Cloud Identity)</span>", icon: "🛡️", color: "#0284C7", bg: "#F0F9FF", x: 395, w: 100 },
        { id: "p_orch", name: "Orchestration<br><span style='color:#64748B;font-weight:500;'>Service</span>", icon: "⚙️", color: "#7C3AED", bg: "#FAF5FF", x: 518, w: 96 },
        { id: "p_rag", name: "RAG Service<br><span style='color:#64748B;font-weight:500;'>(Vertex AI)</span>", icon: "🔍", color: "#7C3AED", bg: "#FAF5FF", x: 638, w: 96 },
        { id: "p_vdb", name: "Vector DB<br><span style='color:#64748B;font-weight:500;'>(BigQuery Vector)</span>", icon: "🗄️", color: "#0284C7", bg: "#F0F9FF", x: 758, w: 104 },
        { id: "p_data", name: "Data Services<br><span style='color:#64748B;font-weight:500;'>(Clinical Data APIs)</span>", icon: "📁", color: "#059669", bg: "#F0FDF4", x: 885, w: 108 },
        { id: "p_llm", name: "LLM Service<br><span style='color:#64748B;font-weight:500;'>(Vertex AI)</span>", icon: "🧠", color: "#7C3AED", bg: "#FAF5FF", x: 1015, w: 96 },
        { id: "p_policy", name: "Response &amp; Policy<br><span style='color:#64748B;font-weight:500;'>Service</span>", icon: "🛡️", color: "#6D28D9", bg: "#FAF5FF", x: 1135, w: 106 },
        { id: "p_audit", name: "Audit &amp; Logging<br><span style='color:#64748B;font-weight:500;'>(Cloud Logging)</span>", icon: "📑", color: "#0284C7", bg: "#F0F9FF", x: 1262, w: 102 },
        { id: "p_mon", name: "Monitoring<br><span style='color:#64748B;font-weight:500;'>(Cloud Monitoring)</span>", icon: "📊", color: "#0284C7", bg: "#F0F9FF", x: 1385, w: 104 },
      ];

  const centers: Record<string, number> = {};

  lifelines.forEach((p) => {
    const cx = p.x + p.w / 2;
    centers[p.id] = cx;

    const boxHtml = `<table style="width:100%;height:100%;text-align:center;">
      <tr>
        <td style="width:24px;vertical-align:middle;font-size:14px;">${p.icon}</td>
        <td style="vertical-align:middle;text-align:left;font-size:8.5px;font-weight:700;color:#0F172A;line-height:1.15;">${p.name}</td>
      </tr>
    </table>`;
    rect(p.id, boxHtml, p.x, 98, p.w, 46, `fillColor=${p.bg};strokeColor=${p.color};strokeWidth=1.2;align=center;verticalAlign=middle;`);

    // Vertical dashed lifeline dropping down to y: 730
    line(`life_${p.id}`, cx, 144, cx, 730, "strokeColor=#CBD5E1;dashed=1;dashPattern=4 4;endArrow=none;");
  });

  // =========================================================================
  // 3. ACTIVATION BARS
  // =========================================================================
  const act = (id: string, pId: string, y: number, h: number, fill = "#EFF6FF", border = "#3B82F6") => {
    const cx = centers[pId];
    rect(id, "", cx - 5, y, 10, h, `fillColor=${fill};strokeColor=${border};strokeWidth=1;rounded=0;arcSize=0;`);
  };

  act("act_user", "p_user", 165, 545, "#EFF6FF", "#3B82F6");
  act("act_copilot", "p_copilot", 190, 510, "#EFF6FF", "#3B82F6");
  act("act_gateway", "p_gateway", 215, 95, "#F0FDFA", "#0D9488");
  act("act_auth", "p_auth", 235, 45, "#F0F9FF", "#0284C7");
  act("act_orch", "p_orch", 300, 395, "#FAF5FF", "#7C3AED");
  act("act_rag", "p_rag", 390, 135, "#FAF5FF", "#7C3AED");
  act("act_vdb", "p_vdb", 395, 38, "#F0F9FF", "#0284C7");
  act("act_data", "p_data", 465, 45, "#F0FDF4", "#059669");
  act("act_llm", "p_llm", 545, 55, "#FAF5FF", "#7C3AED");
  act("act_policy", "p_policy", 595, 55, "#FAF5FF", "#6D28D9");
  act("act_audit", "p_audit", 665, 50, "#F0F9FF", "#0284C7");
  act("act_mon", "p_mon", 685, 30, "#F0F9FF", "#0284C7");

  // =========================================================================
  // 4. SEQUENCE MESSAGES & NUMBERED STEPS (1..20)
  // =========================================================================
  if (isRetail) {
    msg("m1", "❶ Click \"1-Click Buy\": SKU_9824 (Express Delivery)", centers.p_user, centers.p_copilot, 175, "#1D4ED8");
    msg("m2", "❷ POST /api/v1/checkout/1-click (Idempotency-Key)", centers.p_copilot, centers.p_gateway, 205, "#1D4ED8");
    msg("m3", "❸ Validate shopper JWT token", centers.p_gateway, centers.p_auth, 230, "#0D9488");
    msg("m4", "❹ Token valid (shopper_id=usr_9281)", centers.p_auth, centers.p_gateway, 255, "#64748B", true);
    msg("m5", "❺ Forward to Order Saga Orchestrator", centers.p_gateway, centers.p_orch, 280, "#0D9488");

    const planHtml = `<div style="font-size:8.5px;line-height:1.25;color:#0F172A;text-align:left;">
      <b>❻ Saga Orchestration</b><br>
      • Acquire distributed lock<br>
      • Reserve inventory hold<br>
      • Start 2PC Payment Auth
    </div>`;
    rect("plan_box", planHtml, centers.p_orch + 12, 305, 115, 54, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;align=left;spacingLeft=6;");

    msg("m7", "❼ Lookup real-time pricing &amp; tax", centers.p_orch, centers.p_rag, 375, "#7C3AED");
    msg("m8", "❽ Reserve SKU inventory hold (TTL 900s)", centers.p_rag, centers.p_vdb, 400, "#7C3AED");
    msg("m9", "❾ Inventory hold confirmed (hold_id=wms_5829)", centers.p_vdb, centers.p_rag, 425, "#64748B", true);
    msg("m10", "❿ Authorize tokenized card with PCI Vault", centers.p_rag, centers.p_data, 450, "#7C3AED");
    msg("m11", "⓫ Charge authorized (auth_code=AUTH_89102)", centers.p_data, centers.p_rag, 475, "#64748B", true);
    msg("m12", "⓬ Pricing + inventory hold returned", centers.p_rag, centers.p_orch, 505, "#64748B", true);
    msg("m13", "⓭ Commit atomic order transaction to Spanner", centers.p_orch, centers.p_llm, 540, "#7C3AED");
    msg("m14", "⓮ Order committed (order_id=ord_98412)", centers.p_llm, centers.p_orch, 570, "#64748B", true);
    msg("m15", "⓯ Evaluate real-time fraud score &amp; tax compliance", centers.p_orch, centers.p_policy, 600, "#6D28D9");
    msg("m16", "⓰ Order confirmed (order_id=ord_98412)", centers.p_orch, centers.p_copilot, 635, "#64748B", true);
    msg("m17", "⓱ Display order receipt &amp; tracking ETA", centers.p_copilot, centers.p_user, 670, "#1D4ED8", true);
    msg("m18", "⓲ Publish OrderCreated event &amp; log transaction", centers.p_orch, centers.p_audit, 690, "#0284C7", true);
  } else if (isFintech) {
    msg("m1", "❶ Initiate ISO 20022 wire transfer ($50k to ACC_9824)", centers.p_user, centers.p_copilot, 175, "#1D4ED8");
    msg("m2", "❷ POST /api/v1/payments/transfer (Idempotency-Key)", centers.p_copilot, centers.p_gateway, 205, "#1D4ED8");
    msg("m3", "❸ Validate mTLS client cert &amp; JWT", centers.p_gateway, centers.p_auth, 230, "#0D9488");
    msg("m4", "❹ Token valid (trader_id=usr_9281)", centers.p_auth, centers.p_gateway, 255, "#64748B", true);
    msg("m5", "❺ Forward to Payment Saga Orchestrator", centers.p_gateway, centers.p_orch, 280, "#0D9488");

    const planHtml = `<div style="font-size:8.5px;line-height:1.25;color:#0F172A;text-align:left;">
      <b>❻ Payment Saga</b><br>
      • Check risk budget<br>
      • Lock ledger accounts<br>
      • Start 2PC Settlement
    </div>`;
    rect("plan_box", planHtml, centers.p_orch + 12, 305, 115, 54, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;align=left;spacingLeft=6;");

    msg("m7", "❼ Query real-time FX rate &amp; pre-trade limits", centers.p_orch, centers.p_rag, 375, "#7C3AED");
    msg("m8", "❽ Reserve source account balance hold", centers.p_rag, centers.p_vdb, 400, "#7C3AED");
    msg("m9", "❾ Balance hold confirmed (hold_id=hld_8192)", centers.p_vdb, centers.p_rag, 425, "#64748B", true);
    msg("m10", "❿ Dispatch to FedNow / Clearing Gateway", centers.p_rag, centers.p_data, 450, "#7C3AED");
    msg("m11", "⓫ Clearing confirmed (auth_code=CLR_7721)", centers.p_data, centers.p_rag, 475, "#64748B", true);
    msg("m12", "⓬ Settlement authorization returned", centers.p_rag, centers.p_orch, 505, "#64748B", true);
    msg("m13", "⓭ Commit double-entry ledger debit &amp; credit", centers.p_orch, centers.p_llm, 540, "#7C3AED");
    msg("m14", "⓮ Ledger transaction committed (tx_id=TX_88192)", centers.p_llm, centers.p_orch, 570, "#64748B", true);
    msg("m15", "⓯ Real-time fraud anomaly &amp; OFAC sanctions screen", centers.p_orch, centers.p_policy, 600, "#6D28D9");
    msg("m16", "⓰ Transfer settled (tx_id=TX_88192)", centers.p_orch, centers.p_copilot, 635, "#64748B", true);
    msg("m17", "⓱ Display wire confirmation &amp; Swift UETR", centers.p_copilot, centers.p_user, 670, "#1D4ED8", true);
    msg("m18", "⓲ Publish PaymentSettled event to Kafka &amp; log SAR", centers.p_orch, centers.p_audit, 690, "#0284C7", true);
  } else if (isManufacturing) {
    msg("m1", "❶ Dispatch mission: Node_9824 (Sector 4 Flight Corridor)", centers.p_user, centers.p_copilot, 175, "#1D4ED8");
    msg("m2", "❷ POST /api/v1/missions/dispatch (Idempotency-Key)", centers.p_copilot, centers.p_gateway, 205, "#1D4ED8");
    msg("m3", "❸ Validate device mTLS &amp; operator token", centers.p_gateway, centers.p_auth, 230, "#0D9488");
    msg("m4", "❹ Device &amp; operator authorized (node_id=aer_9824)", centers.p_auth, centers.p_gateway, 255, "#64748B", true);
    msg("m5", "❺ Forward to Flight Saga Orchestrator", centers.p_gateway, centers.p_orch, 280, "#0D9488");

    const planHtml = `<div style="font-size:8.5px;line-height:1.25;color:#0F172A;text-align:left;">
      <b>❻ Flight Mission Saga</b><br>
      • Acquire corridor lock<br>
      • Reserve micro-hub charging<br>
      • Start 2PC mission commit
    </div>`;
    rect("plan_box", planHtml, centers.p_orch + 12, 305, 115, 54, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;align=left;spacingLeft=6;");

    msg("m7", "❼ Query real-time weather &amp; telemetry", centers.p_orch, centers.p_rag, 375, "#7C3AED");
    msg("m8", "❽ Reserve UTM airspace corridor (TTL 900s)", centers.p_rag, centers.p_vdb, 400, "#7C3AED");
    msg("m9", "❾ Airspace clearance confirmed (corridor_id=utm_441)", centers.p_vdb, centers.p_rag, 425, "#64748B", true);
    msg("m10", "❿ Query micro-hub battery swap &amp; PLC sensor", centers.p_rag, centers.p_data, 450, "#7C3AED");
    msg("m11", "⓫ Sensor &amp; battery swap slot ready", centers.p_data, centers.p_rag, 475, "#64748B", true);
    msg("m12", "⓬ Telemetry + airspace clearance returned", centers.p_rag, centers.p_orch, 505, "#64748B", true);
    msg("m13", "⓭ Commit atomic mission state to Spanner", centers.p_orch, centers.p_llm, 540, "#7C3AED");
    msg("m14", "⓮ Mission state committed (mission_id=mis_9912)", centers.p_llm, centers.p_orch, 570, "#64748B", true);
    msg("m15", "⓯ Evaluate real-time FAA airspace &amp; collision risk", centers.p_orch, centers.p_policy, 600, "#6D28D9");
    msg("m16", "⓰ Mission clearance confirmed to Edge Client", centers.p_orch, centers.p_copilot, 635, "#64748B", true);
    msg("m17", "⓱ Display flight clearance &amp; live waypoint ETA", centers.p_copilot, centers.p_user, 670, "#1D4ED8", true);
    msg("m18", "⓲ Publish MissionDispatched event to SCADA mesh", centers.p_orch, centers.p_audit, 690, "#0284C7", true);
  } else if (isSaas) {
    msg("m1", "❶ Submit API request: Tenant_9824 (Provision Workspace)", centers.p_user, centers.p_copilot, 175, "#1D4ED8");
    msg("m2", "❷ POST /api/v1/tenants/workspace (Idempotency-Key)", centers.p_copilot, centers.p_gateway, 205, "#1D4ED8");
    msg("m3", "❸ Validate OAuth 2.0 / OIDC JWT token", centers.p_gateway, centers.p_auth, 230, "#0D9488");
    msg("m4", "❹ Token valid &amp; tenant identified (tenant_id=tnt_9824)", centers.p_auth, centers.p_gateway, 255, "#64748B", true);
    msg("m5", "❺ Forward to Service Orchestrator", centers.p_gateway, centers.p_orch, 280, "#0D9488");

    const planHtml = `<div style="font-size:8.5px;line-height:1.25;color:#0F172A;text-align:left;">
      <b>❻ Service Orchestration</b><br>
      • Check tenant quota<br>
      • Route to tenant shard<br>
      • Start 2PC transaction
    </div>`;
    rect("plan_box", planHtml, centers.p_orch + 12, 305, 115, 54, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;align=left;spacingLeft=6;");

    msg("m7", "❼ Query tenant configuration &amp; rate limits", centers.p_orch, centers.p_rag, 375, "#7C3AED");
    msg("m8", "❽ Check tenant storage quota in BigQuery", centers.p_rag, centers.p_vdb, 400, "#7C3AED");
    msg("m9", "❾ Quota verification confirmed (quota_ok=true)", centers.p_vdb, centers.p_rag, 425, "#64748B", true);
    msg("m10", "❿ Request storage bucket &amp; encryption keys", centers.p_rag, centers.p_data, 450, "#7C3AED");
    msg("m11", "⓫ Storage resources allocated (bucket_id=bkt_8819)", centers.p_data, centers.p_rag, 475, "#64748B", true);
    msg("m12", "⓬ Configuration + resource endpoints returned", centers.p_rag, centers.p_orch, 505, "#64748B", true);
    msg("m13", "⓭ Commit tenant state to Cloud Spanner", centers.p_orch, centers.p_llm, 540, "#7C3AED");
    msg("m14", "⓮ Tenant record committed (tenant_id=tnt_9824)", centers.p_llm, centers.p_orch, 570, "#64748B", true);
    msg("m15", "⓯ Evaluate RBAC permissions &amp; rate limiter", centers.p_orch, centers.p_policy, 600, "#6D28D9");
    msg("m16", "⓰ Return workspace ready to SaaS Console", centers.p_orch, centers.p_copilot, 635, "#64748B", true);
    msg("m17", "⓱ Display workspace credentials &amp; API keys", centers.p_copilot, centers.p_user, 670, "#1D4ED8", true);
    msg("m18", "⓲ Publish TenantProvisioned event &amp; log audit", centers.p_orch, centers.p_audit, 690, "#0284C7", true);
  } else {
    // Biopharma / Universal Default
    msg("m1", "❶ Ask question: \"What are the safety signals for Target X in Phase 3 trials?\"", centers.p_user, centers.p_copilot, 175, "#1D4ED8");
    msg("m2", "❷ Send request (question, user context, session id)", centers.p_copilot, centers.p_gateway, 205, "#1D4ED8");
    msg("m3", "❸ Validate token", centers.p_gateway, centers.p_auth, 230, "#0D9488");
    msg("m4", "❹ Token valid", centers.p_auth, centers.p_gateway, 255, "#64748B", true);
    msg("m5", "❺ Forward request", centers.p_gateway, centers.p_orch, 280, "#0D9488");

    const planHtml = `<div style="font-size:8.5px;line-height:1.25;color:#0F172A;text-align:left;">
      <b>❻ Plan &amp; Orchestrate</b><br>
      • Rewrite query<br>
      • Identify data sources<br>
      • Build retrieval plan
    </div>`;
    rect("plan_box", planHtml, centers.p_orch + 12, 305, 115, 54, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;align=left;spacingLeft=6;");

    msg("m7", "❼ Retrieve relevant docs (query + filters)", centers.p_orch, centers.p_rag, 375, "#7C3AED");
    msg("m8", "❽ Vector similarity search (top-k results)", centers.p_rag, centers.p_vdb, 400, "#7C3AED");
    msg("m9", "❾ Top-k documents + metadata", centers.p_vdb, centers.p_rag, 425, "#64748B", true);
    msg("m10", "❿ Fetch latest research context &amp; clinical data", centers.p_rag, centers.p_data, 450, "#7C3AED");
    msg("m11", "⓫ Data payload (JSON)", centers.p_data, centers.p_rag, 475, "#64748B", true);
    msg("m12", "⓬ Context + retrieved documents", centers.p_rag, centers.p_orch, 505, "#64748B", true);
    msg("m13", "⓭ Generate answer (prompt + context)", centers.p_orch, centers.p_llm, 540, "#7C3AED");
    msg("m14", "⓮ LLM response (answer + citations)", centers.p_llm, centers.p_orch, 570, "#64748B", true);
    msg("m15", "⓯ Apply guardrails, PII redaction, hallucination check", centers.p_orch, centers.p_policy, 600, "#6D28D9");
    msg("m16", "⓰ Final answer + citations", centers.p_orch, centers.p_copilot, 635, "#64748B", true);
    msg("m17", "⓱ Display answer with citations &amp; confidence", centers.p_copilot, centers.p_user, 670, "#1D4ED8", true);
    msg("m18", "⓲ Log interaction (query, response, user_id, tokens)", centers.p_orch, centers.p_audit, 690, "#0284C7", true);
  }

  // 19: Audit Self Loop (Write logs)
  c.push(`<mxCell id="m19_loop" value="⓳ Write logs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;exitX=1;exitY=0.4;entryX=1;entryY=0.8;" edge="1" parent="1" source="act_audit" target="act_audit"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="${centers.p_audit + 30}" y="685"/><mxPoint x="${centers.p_audit + 30}" y="705"/></Array></mxGeometry></mxCell>`);

  // 20: Audit writes metrics & traces to Monitoring
  msg("m20", "⓴ Metrics &amp; traces", centers.p_audit, centers.p_mon, 715, "#0284C7");

  // =========================================================================
  // 5. RIGHT-SIDE "ALT" (ALTERNATIVE FLOWS) BOX WITH 100% COLLISION-FREE GEOMETRY
  // =========================================================================
  rect("alt_container", "", 1220, 275, 310, 240, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;dashPattern=6 4;rounded=1;arcSize=4;shadow=0;");
  
  rect("alt_badge", "<b style='color:#FFFFFF;font-size:9px;letter-spacing:0.5px;'>ALT</b>", 1226, 281, 38, 18, "fillColor=#0284C7;strokeColor=none;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const altSec1Title = isRetail
    ? "[ If inventory hold fails or item out of stock ]"
    : isFintech
    ? "[ If insufficient balance or risk limit exceeded ]"
    : isManufacturing
    ? "[ If flight corridor occupied or battery &lt; 20% ]"
    : isSaas
    ? "[ If tenant quota exceeded or rate limit reached ]"
    : "[ If no relevant results found ]";
  text("alt_sec1_title", `<b style='font-size:8.5px;color:#0284C7;'>${altSec1Title}</b>`, 1234, 302, 280, 16, "align=left;verticalAlign=top;");

  const altA1 = isRetail
    ? "<b>A1</b> Notify shopper: Item out of stock"
    : isFintech
    ? "<b>A1</b> Notify sender: Insufficient balance"
    : isManufacturing
    ? "<b>A1</b> Notify operator: Hold at vertiport"
    : isSaas
    ? "<b>A1</b> Notify client: HTTP 429 Rate Limit"
    : "<b>A1</b> Notify no results";
  text("alt_a1_text", `<span style='font-size:8px;color:#1E293B;'>${altA1}</span>`, 1248, 322, 260, 16, "align=left;verticalAlign=top;");
  line("alt_a1_arrow", 1510, 348, 1230, 348, "strokeColor=#0284C7;dashed=1;dashPattern=4 3;endArrow=open;endFill=0;strokeWidth=1;");

  const altA2 = isRetail
    ? "<b>A2</b> Suggest alternative merchants &amp; restock alert"
    : isFintech
    ? "<b>A2</b> Suggest alternative funding account"
    : isManufacturing
    ? "<b>A2</b> Reroute to secondary vertiport &amp; recharge"
    : isSaas
    ? "<b>A2</b> Request tier upgrade or queue request"
    : "<b>A2</b> Suggest refined query or broader search";
  text("alt_a2_text", `<span style='font-size:8px;color:#1E293B;'>${altA2}</span>`, 1248, 366, 260, 16, "align=left;verticalAlign=top;");
  line("alt_a2_arrow", 1510, 392, 1230, 392, "strokeColor=#0284C7;dashed=1;dashPattern=4 3;endArrow=open;endFill=0;strokeWidth=1;");

  line("alt_divider", 1230, 408, 1520, 408, "strokeColor=#CBD5E1;dashed=1;dashPattern=4 3;endArrow=none;strokeWidth=1;");

  const altSec2Title = isRetail
    ? "[ If card declined or high fraud risk ]"
    : isFintech
    ? "[ If fraud anomaly &gt; 0.85 or OFAC match ]"
    : isManufacturing
    ? "[ If geofence breach or FAA TFR detected ]"
    : isSaas
    ? "[ If token expired or policy violation ]"
    : "[ If policy violation detected ]";
  text("alt_sec2_title", `<b style='font-size:8.5px;color:#DC2626;'>${altSec2Title}</b>`, 1234, 416, 280, 16, "align=left;verticalAlign=top;");

  const altB1 = isRetail
    ? "<b>B1</b> Release WMS inventory hold &amp; abort 2PC"
    : isFintech
    ? "<b>B1</b> Freeze transaction &amp; hold funds in escrow"
    : isManufacturing
    ? "<b>B1</b> Abort flight plan &amp; return to base (RTH)"
    : isSaas
    ? "<b>B1</b> Reject request &amp; revoke access token"
    : "<b>B1</b> Block response";
  text("alt_b1_text", `<span style='font-size:8px;color:#1E293B;'>${altB1}</span>`, 1248, 436, 260, 16, "align=left;verticalAlign=top;");
  line("alt_b1_arrow", 1510, 462, 1230, 462, "strokeColor=#DC2626;dashed=1;dashPattern=4 3;endArrow=open;endFill=0;strokeWidth=1;");

  const altB2 = isRetail
    ? "<b>B2</b> Prompt shopper for alternative payment card"
    : isFintech
    ? "<b>B2</b> Route to AML Compliance Queue for SAR"
    : isManufacturing
    ? "<b>B2</b> Alert flight controller &amp; log telemetry"
    : isSaas
    ? "<b>B2</b> Route security alert to SIEM dashboard"
    : "<b>B2</b> Return safe response with explanation";
  text("alt_b2_text", `<span style='font-size:8px;color:#1E293B;'>${altB2}</span>`, 1248, 480, 260, 14, "align=left;verticalAlign=top;");
  line("alt_b2_arrow", 1510, 506, 1230, 506, "strokeColor=#DC2626;dashed=1;dashPattern=4 3;endArrow=open;endFill=0;strokeWidth=1;");

  // =========================================================================
  // 6. BOTTOM 5 ANALYTICAL SUMMARY CARDS (y: 755, h: 185)
  // =========================================================================
  const card1Html = `<div style="padding:8px 10px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">MESSAGE TYPES</div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:14px;font-size:9px;color:#1E293B;">
      <span style="font-weight:900;color:#1D4ED8;font-size:16px;">➔</span>
      <span><b>Synchronous Call</b></span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:14px;font-size:9px;color:#1E293B;">
      <span style="font-weight:900;color:#EA580C;font-size:16px;">⇢</span>
      <span><b>Asynchronous Call</b></span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:14px;font-size:9px;color:#1E293B;">
      <span style="font-weight:900;color:#64748B;font-size:16px;">⇠</span>
      <span><b>Return / Response</b></span>
    </div>
    <div style="flex:1;"></div>
  </div>`;
  rect("card_msg_types", card1Html, 40, 755, 175, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  const card2Html = isRetail
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">SEQUENCE STEPS SUMMARY</div>
    <table style="width:100%;font-size:8px;color:#1E293B;line-height:1.35;margin-top:4px;">
      <tr>
        <td style="width:50%;vertical-align:top;padding-right:6px;">
          <div><b style="color:#1D4ED8;">❶</b> Shopper clicks 1-Click Buy in Storefront</div>
          <div><b style="color:#1D4ED8;">❷</b> POST checkout request to Gateway</div>
          <div><b style="color:#0D9488;">❸</b> Gateway validates shopper token</div>
          <div><b style="color:#64748B;">❹</b> Session token valid response</div>
          <div><b style="color:#0D9488;">❺</b> Request forwarded to Saga Orchestrator</div>
          <div><b style="color:#7C3AED;">❻</b> Plan &amp; orchestrate 2PC saga</div>
          <div><b style="color:#7C3AED;">❼</b> Query real-time pricing &amp; tax</div>
          <div><b style="color:#7C3AED;">❽</b> Reserve inventory with WMS (TTL 900s)</div>
          <div><b style="color:#64748B;">❾</b> Inventory hold confirmed</div>
          <div><b style="color:#7C3AED;">❿</b> Authorize payment with PCI Vault</div>
        </td>
        <td style="width:50%;vertical-align:top;padding-left:6px;">
          <div><b style="color:#64748B;">⓫</b> Payment authorization code</div>
          <div><b style="color:#64748B;">⓬</b> Context + payment token returned</div>
          <div><b style="color:#7C3AED;">⓭</b> Commit atomic order to Spanner</div>
          <div><b style="color:#64748B;">⓮</b> Order record committed</div>
          <div><b style="color:#6D28D9;">⓯</b> Evaluate real-time fraud score</div>
          <div><b style="color:#64748B;">⓰</b> Return order confirmation to App</div>
          <div><b style="color:#1D4ED8;">⓱</b> Display receipt &amp; tracking ETA</div>
          <div><b style="color:#0284C7;">⓲</b> Publish OrderCreated event</div>
          <div><b style="color:#0284C7;">⓳</b> Persist order audit log</div>
          <div><b style="color:#0284C7;">⓴</b> Emit latency &amp; GMV metrics</div>
        </td>
      </tr>
    </table>
  </div>`
    : isFintech
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">SEQUENCE STEPS SUMMARY</div>
    <table style="width:100%;font-size:8px;color:#1E293B;line-height:1.35;margin-top:4px;">
      <tr>
        <td style="width:50%;vertical-align:top;padding-right:6px;">
          <div><b style="color:#1D4ED8;">❶</b> Trader initiates ISO 20022 wire transfer</div>
          <div><b style="color:#1D4ED8;">❷</b> POST transfer request to API Gateway</div>
          <div><b style="color:#0D9488;">❸</b> Validate mTLS client cert &amp; JWT</div>
          <div><b style="color:#64748B;">❹</b> Token valid &amp; authorized response</div>
          <div><b style="color:#0D9488;">❺</b> Forward to Payment Saga Orchestrator</div>
          <div><b style="color:#7C3AED;">❻</b> Plan 2PC atomic transfer saga</div>
          <div><b style="color:#7C3AED;">❼</b> Query FX rate &amp; pre-trade limits</div>
          <div><b style="color:#7C3AED;">❽</b> Reserve account balance hold</div>
          <div><b style="color:#64748B;">❾</b> Balance hold confirmed in Spanner</div>
          <div><b style="color:#7C3AED;">❿</b> Dispatch to Clearing House Gateway</div>
        </td>
        <td style="width:50%;vertical-align:top;padding-left:6px;">
          <div><b style="color:#64748B;">⓫</b> Clearing authorization code returned</div>
          <div><b style="color:#64748B;">⓬</b> Settlement authorization returned</div>
          <div><b style="color:#7C3AED;">⓭</b> Commit double-entry ledger in Spanner</div>
          <div><b style="color:#64748B;">⓮</b> Ledger transaction committed</div>
          <div><b style="color:#6D28D9;">⓯</b> Score real-time fraud &amp; OFAC sanctions</div>
          <div><b style="color:#64748B;">⓰</b> Return transfer confirmation to App</div>
          <div><b style="color:#1D4ED8;">⓱</b> Display wire confirmation &amp; Swift ID</div>
          <div><b style="color:#0284C7;">⓲</b> Publish PaymentSettled event to Kafka</div>
          <div><b style="color:#0284C7;">⓳</b> Persist immutable SAR audit log</div>
          <div><b style="color:#0284C7;">⓴</b> Emit FinOps telemetry &amp; latency metrics</div>
        </td>
      </tr>
    </table>
  </div>`
    : isManufacturing
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">SEQUENCE STEPS SUMMARY</div>
    <table style="width:100%;font-size:8px;color:#1E293B;line-height:1.35;margin-top:4px;">
      <tr>
        <td style="width:50%;vertical-align:top;padding-right:6px;">
          <div><b style="color:#1D4ED8;">❶</b> Dispatch mission for drone Node_9824</div>
          <div><b style="color:#1D4ED8;">❷</b> POST mission request to API Gateway</div>
          <div><b style="color:#0D9488;">❸</b> Validate device mTLS &amp; operator token</div>
          <div><b style="color:#64748B;">❹</b> Device authorized (node_id=aer_9824)</div>
          <div><b style="color:#0D9488;">❺</b> Forward to Flight Saga Orchestrator</div>
          <div><b style="color:#7C3AED;">❻</b> Plan flight corridor &amp; battery budget</div>
          <div><b style="color:#7C3AED;">❼</b> Query weather &amp; real-time telemetry</div>
          <div><b style="color:#7C3AED;">❽</b> Reserve UTM airspace corridor</div>
          <div><b style="color:#64748B;">❾</b> Airspace clearance confirmed</div>
          <div><b style="color:#7C3AED;">❿</b> Query vertiport &amp; battery swap slot</div>
        </td>
        <td style="width:50%;vertical-align:top;padding-left:6px;">
          <div><b style="color:#64748B;">⓫</b> Battery swap &amp; sensor slot ready</div>
          <div><b style="color:#64748B;">⓬</b> Flight clearance + plan returned</div>
          <div><b style="color:#7C3AED;">⓭</b> Commit atomic mission to Spanner</div>
          <div><b style="color:#64748B;">⓮</b> Mission record committed</div>
          <div><b style="color:#6D28D9;">⓯</b> Evaluate FAA airspace &amp; collision risk</div>
          <div><b style="color:#64748B;">⓰</b> Return flight clearance to Control UI</div>
          <div><b style="color:#1D4ED8;">⓱</b> Display live waypoint ETA &amp; telemetry</div>
          <div><b style="color:#0284C7;">⓲</b> Publish MissionDispatched event</div>
          <div><b style="color:#0284C7;">⓳</b> Persist telemetry audit log</div>
          <div><b style="color:#0284C7;">⓴</b> Emit IoT latency &amp; battery metrics</div>
        </td>
      </tr>
    </table>
  </div>`
    : isSaas
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">SEQUENCE STEPS SUMMARY</div>
    <table style="width:100%;font-size:8px;color:#1E293B;line-height:1.35;margin-top:4px;">
      <tr>
        <td style="width:50%;vertical-align:top;padding-right:6px;">
          <div><b style="color:#1D4ED8;">❶</b> Submit workspace provisioning request</div>
          <div><b style="color:#1D4ED8;">❷</b> POST request to API Gateway</div>
          <div><b style="color:#0D9488;">❸</b> Validate OAuth 2.0 / OIDC JWT token</div>
          <div><b style="color:#64748B;">❹</b> Token valid &amp; tenant verified</div>
          <div><b style="color:#0D9488;">❺</b> Forward to Service Orchestrator</div>
          <div><b style="color:#7C3AED;">❻</b> Plan tenant isolation &amp; shard allocation</div>
          <div><b style="color:#7C3AED;">❼</b> Query tenant config &amp; rate limits</div>
          <div><b style="color:#7C3AED;">❽</b> Check tenant quota in BigQuery</div>
          <div><b style="color:#64748B;">❾</b> Storage quota verified</div>
          <div><b style="color:#7C3AED;">❿</b> Request storage bucket &amp; KMS keys</div>
        </td>
        <td style="width:50%;vertical-align:top;padding-left:6px;">
          <div><b style="color:#64748B;">⓫</b> Storage bucket allocated</div>
          <div><b style="color:#64748B;">⓬</b> Endpoint metadata returned</div>
          <div><b style="color:#7C3AED;">⓭</b> Commit tenant state to Spanner</div>
          <div><b style="color:#64748B;">⓮</b> Tenant record committed</div>
          <div><b style="color:#6D28D9;">⓯</b> Evaluate RBAC &amp; rate limit policies</div>
          <div><b style="color:#64748B;">⓰</b> Return workspace ready confirmation</div>
          <div><b style="color:#1D4ED8;">⓱</b> Display credentials &amp; API keys</div>
          <div><b style="color:#0284C7;">⓲</b> Publish TenantProvisioned event</div>
          <div><b style="color:#0284C7;">⓳</b> Persist immutable security audit log</div>
          <div><b style="color:#0284C7;">⓴</b> Emit tenant QPS &amp; latency metrics</div>
        </td>
      </tr>
    </table>
  </div>`
    : `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">SEQUENCE STEPS SUMMARY</div>
    <table style="width:100%;font-size:8px;color:#1E293B;line-height:1.35;margin-top:4px;">
      <tr>
        <td style="width:50%;vertical-align:top;padding-right:6px;">
          <div><b style="color:#1D4ED8;">❶</b> User asks question in AI Copilot</div>
          <div><b style="color:#1D4ED8;">❷</b> Request sent to API Gateway</div>
          <div><b style="color:#0D9488;">❸</b> Gateway validates access token</div>
          <div><b style="color:#64748B;">❹</b> Token validation response</div>
          <div><b style="color:#0D9488;">❺</b> Request forwarded to Orchestrator</div>
          <div><b style="color:#7C3AED;">❻</b> Plan retrieval and data sources</div>
          <div><b style="color:#7C3AED;">❼</b> Send query to RAG service</div>
          <div><b style="color:#7C3AED;">❽</b> Perform vector search</div>
          <div><b style="color:#64748B;">❾</b> Return top-k documents</div>
          <div><b style="color:#7C3AED;">❿</b> Fetch latest domain data</div>
        </td>
        <td style="width:50%;vertical-align:top;padding-left:6px;">
          <div><b style="color:#64748B;">⓫</b> Return domain payload</div>
          <div><b style="color:#64748B;">⓬</b> Return combined context</div>
          <div><b style="color:#7C3AED;">⓭</b> Send context to LLM for reasoning</div>
          <div><b style="color:#64748B;">⓮</b> LLM returns answer</div>
          <div><b style="color:#6D28D9;">⓯</b> Apply safety and quality checks</div>
          <div><b style="color:#64748B;">⓰</b> Return final answer to Copilot</div>
          <div><b style="color:#1D4ED8;">⓱</b> Display answer to user</div>
          <div><b style="color:#0284C7;">⓲</b> Log interaction for audit</div>
          <div><b style="color:#0284C7;">⓳</b> Persist logs</div>
          <div><b style="color:#0284C7;">⓴</b> Emit metrics &amp; traces</div>
        </td>
      </tr>
    </table>
  </div>`;
  rect("card_steps_summary", card2Html, 225, 755, 460, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: KEY NOTATIONS (x: 695, w: 175)
  const card3Html = `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">KEY NOTATIONS</div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:8.5px;color:#1E293B;">
      <div style="width:18px;height:12px;border:1px solid #3B82F6;background:#EFF6FF;border-radius:2px;"></div>
      <span>Processing / Activity</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:8.5px;color:#1E293B;">
      <div style="width:18px;height:12px;border:1px dashed #0284C7;border-radius:2px;"></div>
      <span>Alternative Flow (ALT)</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:8.5px;color:#1E293B;">
      <div style="width:14px;height:14px;border-radius:7px;background:#0F2A4A;color:#FFFFFF;font-size:8px;font-weight:900;display:flex;align-items:center;justify-content:center;">N</div>
      <span>Step Number</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:8.5px;color:#1E293B;">
      <div style="width:18px;height:14px;border:1px solid #CBD5E1;border-radius:3px;background:#F8FAFC;"></div>
      <span>Service / Component</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:8.5px;color:#1E293B;">
      <span style="font-weight:900;color:#94A3B8;font-size:12px;">┆</span>
      <span>Lifeline</span>
    </div>
  </div>`;
  rect("card_notations", card3Html, 695, 755, 175, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 4: TECHNOLOGY STACK (x: 880, w: 385)
  const card4Html = `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;text-align:center;">TECHNOLOGY STACK (GOOGLE CLOUD)</div>
    <table style="width:100%;text-align:center;font-size:8.5px;font-weight:700;color:#1E293B;margin-top:10px;">
      <tr>
        <td style="padding:6px;width:25%;">
          <div style="font-size:20px;margin-bottom:2px;">🌐</div>
          <div>Apigee X</div>
        </td>
        <td style="padding:6px;width:25%;">
          <div style="font-size:20px;margin-bottom:2px;">🛡️</div>
          <div>Cloud Identity</div>
        </td>
        <td style="padding:6px;width:25%;">
          <div style="font-size:20px;margin-bottom:2px;">🧠</div>
          <div>Vertex AI</div>
        </td>
        <td style="padding:6px;width:25%;">
          <div style="font-size:20px;margin-bottom:2px;">📊</div>
          <div>BigQuery<br>Vector Search</div>
        </td>
      </tr>
      <tr>
        <td style="padding:6px;"></td>
        <td style="padding:6px;">
          <div style="font-size:20px;margin-bottom:2px;">📑</div>
          <div>Cloud Logging</div>
        </td>
        <td style="padding:6px;">
          <div style="font-size:20px;margin-bottom:2px;">📈</div>
          <div>Cloud Monitoring</div>
        </td>
        <td style="padding:6px;"></td>
      </tr>
    </table>
  </div>`;
  rect("card_tech_stack", card4Html, 880, 755, 385, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 5: NOTES (x: 1275, w: 275)
  const card5Html = isRetail
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">NOTES</div>
    <div style="font-size:8px;color:#334155;line-height:1.55;margin-top:8px;">
      <div>• All API calls use HTTPS / TLS 1.3+</div>
      <div>• Authentication via OAuth 2.0 / OIDC &amp; JWT</div>
      <div>• Payment card tokens encrypted via PCI-DSS CDE</div>
      <div>• Distributed locks managed via Redis Redlock</div>
      <div>• Order state machine governed via Temporal Saga</div>
      <div>• Real-time fraud scoring powered by Vertex AI</div>
    </div>
  </div>`
    : isFintech
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">NOTES</div>
    <div style="font-size:8px;color:#334155;line-height:1.55;margin-top:8px;">
      <div>• All API calls use HTTPS / TLS 1.3 with mTLS</div>
      <div>• Authentication via OAuth 2.0 / OIDC &amp; Cloud KMS HSM</div>
      <div>• End-to-end ISO 20022 message compliance</div>
      <div>• Sub-millisecond pre-trade risk check on Redis Cluster</div>
      <div>• Atomic double-entry transactions on Cloud Spanner</div>
      <div>• Real-time fraud graph scoring powered by Vertex AI</div>
    </div>
  </div>`
    : isManufacturing
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">NOTES</div>
    <div style="font-size:8px;color:#334155;line-height:1.55;margin-top:8px;">
      <div>• All drone telemetry transmitted via 5G / mTLS</div>
      <div>• Device identity verified via Cloud KMS Hardware Roots</div>
      <div>• FAA Part 135 &amp; ISO 9001 compliance enforced</div>
      <div>• Sub-second geofence &amp; collision checks on Redis Mesh</div>
      <div>• Atomic mission logs persisted in Cloud Spanner</div>
      <div>• Real-time flight anomaly detection via Vertex AI</div>
    </div>
  </div>`
    : isSaas
    ? `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">NOTES</div>
    <div style="font-size:8px;color:#334155;line-height:1.55;margin-top:8px;">
      <div>• All API traffic encrypted via TLS 1.3 &amp; Envoy Ingress</div>
      <div>• Multi-tenant identity managed via Cloud Identity &amp; OIDC</div>
      <div>• SOC 2 Type II &amp; ISO 27001 compliance standards</div>
      <div>• Dynamic rate limits &amp; quotas enforced on Redis Cluster</div>
      <div>• Tenant data isolated via Cloud Spanner Row-Level Shards</div>
      <div>• Continuous telemetry &amp; security monitoring via SIEM</div>
    </div>
  </div>`
    : `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">NOTES</div>
    <div style="font-size:8px;color:#334155;line-height:1.55;margin-top:8px;">
      <div>• All API calls use HTTPS / TLS 1.2+</div>
      <div>• Authentication via OAuth 2.0 / OIDC</div>
      <div>• Data encrypted in transit and at rest</div>
      <div>• Audit logs retained as per enterprise audit policy</div>
      <div>• RAG service uses domain specific embeddings and re-ranking</div>
      <div>• Guardrails include toxicity, PII, and domain safety filters</div>
    </div>
  </div>`;
  rect("card_notes", card5Html, 1275, 755, 275, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 7. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 40, 950, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: August 2026</span>", 1370, 950, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_11_sequence" name="Template 11: Sequence Diagram">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="980" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
