/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 13 — CLASS / ENTITY RELATIONSHIP DIAGRAM
 * 
 * 1:1 Ground-Truth Reproduction of images/13.png
 * "13 CLASS / ENTITY RELATIONSHIP DIAGRAM | NOVACURA Enterprise AI Platform for Biopharma"
 * Complete 24 Entities across 7 Core Domains with Crow's Foot / UML Associations,
 * Key Constraints, Sample Business Rules, Data Flow Hint, and 4 Bottom Panels.
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate14DataModelErdXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const isRetail = domainFlavor === 'retail';
  const isFintech = domainFlavor === 'fintech';

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const entity = (id: string, name: string, fields: string[], x: number, y: number, w: number, h: number, headerColor = "#2563EB", bodyBg = "#FFFFFF", borderColor = "#CBD5E1") => {
    const fieldsHtml = fields.map(f => {
      if (f.startsWith("PK ")) return `<div style="font-weight:700;"><b style="color:#0F172A;">PK</b> ${f.substring(3)}</div>`;
      if (f.includes("(FK)")) return `<div style="color:#334155;">${f.replace("(FK)", "<span style='color:#64748B;font-size:7px;'>(FK)</span>")}</div>`;
      return `<div style="color:#334155;">${f}</div>`;
    }).join("");
    const html = `<div style="font-family:Inter,system-ui,sans-serif;height:100%;display:flex;flex-direction:column;">
      <div style="background:${headerColor};color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px 2px;border-top-left-radius:3px;border-top-right-radius:3px;letter-spacing:0.3px;">${name}</div>
      <div style="background:${bodyBg};padding:5px 7px;font-size:7.5px;line-height:1.35;flex:1;border-bottom-left-radius:3px;border-bottom-right-radius:3px;">${fieldsHtml}</div>
    </div>`;
    c.push(`<mxCell id="${id}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;strokeColor=${borderColor};strokeWidth=1.2;fillColor=${bodyBg};align=left;verticalAlign=top;spacing=0;overflow=hidden;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const edge = (id: string, label: string, x1: number, y1: number, x2: number, y2: number, color = "#0F172A", dashed = false, arrow = "block", pts: [number, number][] = []) => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const ptsXml = pts.length > 0 ? `<Array as="points">${pts.map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const labelStyle = label ? `fontSize=7.5;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.2;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_14", "<b style='font-size:24px;color:#FFFFFF;'>14</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const subHeader = isRetail
    ? "OMNIVUE Hyper-Scale Omnichannel E-Commerce &amp; Logistics Platform"
    : isFintech
    ? "NEXUSFIN High-Speed Wealth Engine"
    : "Enterprise Architecture Platform";

  const brandIcon = isRetail ? "🛒" : isFintech ? "💳" : "⚡";
  const brandName = isRetail ? "OMNIVUE" : isFintech ? "NEXUSFIN" : "ENTERPRISE";
  const brandTagline = isRetail
    ? "Hyper-Scale Commerce. Intelligent Fulfillment."
    : isFintech
    ? "Autonomous Wealth. Zero-Latency Execution."
    : "Scalable. Resilient. Secure.";

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">CLASS / ENTITY RELATIONSHIP DIAGRAM</div>
    <div style="font-size:12px;font-weight:700;color:#475569;margin-top:2px;">${subHeader}</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 750, 40, "align=left;verticalAlign=middle;");

  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">${brandIcon}</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">${brandName}</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">${brandTagline}</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // =========================================================================
  // 2. LEFT SIDEBAR: CORE DOMAINS (x: 20, y: 70, w: 160, h: 470)
  // =========================================================================
  const domain3Title = isRetail ? "Merchandising &amp; Catalog" : "Clinical Research";
  const domain3Icon = isRetail ? "🛒" : "🔬";
  const domain4Title = isRetail ? "Recommendations &amp; Search" : "Knowledge &amp; AI";

  const coreDomainsHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:8px;letter-spacing:0.5px;">CORE DOMAINS</div>
    <div style="font-size:8px;font-weight:700;line-height:1.4;">
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #93C5FD;background:#EFF6FF;color:#1D4ED8;margin-bottom:6px;">
        <span style="font-size:12px;">👤</span>
        <span>User &amp; Security</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #86EFAC;background:#F0FDF4;color:#15803D;margin-bottom:6px;">
        <span style="font-size:12px;">📑</span>
        <span>Content &amp; Documents</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #7DD3FC;background:#F0F9FF;color:#0284C7;margin-bottom:6px;">
        <span style="font-size:12px;">${domain3Icon}</span>
        <span>${domain3Title}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #D8B4FE;background:#FAF5FF;color:#7C3AED;margin-bottom:6px;">
        <span style="font-size:12px;">🧠</span>
        <span>${domain4Title}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #FDBA74;background:#FFF7ED;color:#C2410C;margin-bottom:6px;">
        <span style="font-size:12px;">🛡️</span>
        <span>Governance &amp; Quality</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #CBD5E1;background:#F8FAFC;color:#475569;margin-bottom:6px;">
        <span style="font-size:12px;">📊</span>
        <span>Audit &amp; Observability</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:4px;border:1px solid #5EEAD4;background:#F0FDFA;color:#0D9488;">
        <span style="font-size:12px;">🌐</span>
        <span>Integration &amp; External</span>
      </div>
    </div>
  </div>`;
  rect("card_core_domains", coreDomainsHtml, 20, 70, 160, 470, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 3. CENTER ERD ENTITY GRID (x: 195 to 1130)
  // =========================================================================
  // --- ROW 1: User, Role, Permission (Blue) & Document/CatalogItem, DocumentVersion/ItemVariant (Green) ---
  entity("ent_user", "User", ["PK user_id", "name", "email", "role_id (FK)", "dept_id (FK)", "status", "created_at"], 200, 70, 125, 135, "#3B82F6", "#EFF6FF", "#93C5FD");
  entity("ent_role", "Role", ["PK role_id", "name", "description", "scope"], 370, 70, 115, 95, "#3B82F6", "#EFF6FF", "#93C5FD");
  entity("ent_permission", "Permission", ["PK permission_id", "name", "resource", "action"], 530, 70, 115, 95, "#3B82F6", "#EFF6FF", "#93C5FD");
  
  if (isRetail) {
    entity("ent_document", "CatalogItem", ["PK item_id", "sku", "title", "category_id (FK)", "price", "status", "merchant_id (FK)"], 680, 70, 130, 135, "#22C55E", "#F0FDF4", "#86EFAC");
    entity("ent_doc_version", "ItemVariant", ["PK variant_id", "item_id (FK)", "variant_sku", "inventory_qty", "price_override", "created_at"], 860, 70, 130, 120, "#22C55E", "#F0FDF4", "#86EFAC");
  } else {
    entity("ent_document", "Document", ["PK doc_id", "title", "doc_type", "version", "status", "created_at", "owner_id (FK)"], 680, 70, 130, 135, "#22C55E", "#F0FDF4", "#86EFAC");
    entity("ent_doc_version", "DocumentVersion", ["PK version_id", "doc_id (FK)", "version_no", "content_uri", "checksum", "created_at"], 860, 70, 130, 120, "#22C55E", "#F0FDF4", "#86EFAC");
  }

  // Row 1 Relationships
  edge("rel_user_role", "1    assigned_to    *", 325, 115, 370, 115, "#0F172A", false, "diamond");
  edge("rel_role_perm", "*       grants       *", 485, 115, 530, 115, "#0F172A", false, "diamond");
  edge("rel_doc_version", "1     has_variants     *", 810, 115, 860, 115, "#0F172A", false, "diamond");

  // --- ROW 2: Merchant/Study, Category/Protocol, Warehouse/Site (Sky) & ProductCatalog/KnowledgeBase, SkuEmbedding/Embedding (Purple) ---
  if (isRetail) {
    entity("ent_study", "Merchant", ["PK merchant_id", "name", "rating", "country", "commission_rate", "onboard_date", "status"], 200, 235, 125, 135, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_protocol", "Category", ["PK category_id", "merchant_id (FK)", "name", "slug", "status"], 370, 235, 115, 105, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_site", "Warehouse", ["PK warehouse_id", "merchant_id (FK)", "country", "facility_name", "status"], 530, 235, 115, 105, "#0EA5E9", "#F0F9FF", "#7DD3FC");

    entity("ent_kb", "ProductCatalog", ["PK catalog_id", "name", "description", "feed_type", "created_at"], 685, 245, 125, 110, "#A855F7", "#FAF5FF", "#D8B4FE");
    entity("ent_embedding", "SkuEmbedding", ["PK embed_id", "catalog_id (FK)", "sku_id", "vector", "rec_model_id"], 860, 245, 130, 110, "#A855F7", "#FAF5FF", "#D8B4FE");
  } else {
    entity("ent_study", "Study", ["PK study_id", "title", "phase", "indication", "sponsor", "start_date", "status"], 200, 235, 125, 135, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_protocol", "Protocol", ["PK protocol_id", "study_id (FK)", "version", "effective_date", "status"], 370, 235, 115, 105, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_site", "Site", ["PK site_id", "study_id (FK)", "country", "site_name", "status"], 530, 235, 115, 105, "#0EA5E9", "#F0F9FF", "#7DD3FC");

    entity("ent_kb", "KnowledgeBase", ["PK kb_id", "name", "description", "source_type", "created_at"], 685, 245, 125, 110, "#A855F7", "#FAF5FF", "#D8B4FE");
    entity("ent_embedding", "Embedding", ["PK embed_id", "kb_id (FK)", "chunk_id", "vector", "model_id"], 860, 245, 130, 110, "#A855F7", "#FAF5FF", "#D8B4FE");
  }

  // Row 2 Relationships
  edge("rel_study_protocol", "1    has    *", 325, 280, 370, 280, "#0F172A", false, "diamond");
  edge("rel_study_site", "1   includes   *", 485, 280, 530, 280, "#0F172A", false, "diamond");
  edge("rel_kb_embedding", "1       stores       *", 810, 290, 860, 290, "#0F172A", false, "diamond");
  edge("rel_doc_kb", "indexed_in", 745, 205, 745, 245, "#0F172A", true, "open");

  // --- ROW 3: Order/Trial, Shopper/Patient, Shipment/Event (Sky) & RecEngine/AI Model, Cart/Prompt, CartItem/Response (Purple) ---
  if (isRetail) {
    entity("ent_trial", "Order", ["PK order_id", "merchant_id (FK)", "shopper_id (FK)", "total_amount", "order_date", "status"], 200, 395, 125, 115, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_patient", "Shopper", ["PK shopper_id", "name", "email", "prime_status", "join_date", "status"], 370, 395, 115, 115, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_event", "Shipment", ["PK shipment_id", "order_id (FK)", "tracking_no", "carrier", "dispatch_date", "status"], 530, 395, 115, 115, "#0EA5E9", "#F0F9FF", "#7DD3FC");

    entity("ent_ai_model", "RecEngine", ["PK rec_model_id", "name", "model_type", "accuracy_score", "version"], 675, 400, 105, 105, "#A855F7", "#FAF5FF", "#D8B4FE");
    entity("ent_prompt", "Cart", ["PK cart_id", "shopper_id (FK)", "coupon_code", "session_id", "created_at"], 810, 400, 105, 105, "#A855F7", "#FAF5FF", "#D8B4FE");
    entity("ent_response", "CartItem", ["PK cart_item_id", "cart_id (FK)", "variant_id (FK)", "quantity", "unit_price"], 945, 400, 105, 105, "#A855F7", "#FAF5FF", "#D8B4FE");
  } else {
    entity("ent_trial", "Trial", ["PK trial_id", "study_id (FK)", "title", "start_date", "end_date", "status"], 200, 395, 125, 115, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_patient", "Patient", ["PK patient_id", "trial_id (FK)", "age", "gender", "enrollment_date", "status"], 370, 395, 115, 115, "#0EA5E9", "#F0F9FF", "#7DD3FC");
    entity("ent_event", "Event", ["PK event_id", "patient_id (FK)", "event_type", "event_date", "severity", "outcome"], 530, 395, 115, 115, "#0EA5E9", "#F0F9FF", "#7DD3FC");

    entity("ent_ai_model", "AI Model", ["PK model_id", "name", "model_type", "provider", "version"], 675, 400, 105, 105, "#A855F7", "#FAF5FF", "#D8B4FE");
    entity("ent_prompt", "Prompt", ["PK prompt_id", "model_id (FK)", "template", "intent", "created_at"], 810, 400, 105, 105, "#A855F7", "#FAF5FF", "#D8B4FE");
    entity("ent_response", "Response", ["PK response_id", "prompt_id (FK)", "output", "confidence", "citations"], 945, 400, 105, 105, "#A855F7", "#FAF5FF", "#D8B4FE");
  }

  // Row 3 Relationships
  edge("rel_study_trial", "1\nproduces\n*", 262, 370, 262, 395, "#0F172A", false, "diamond");
  edge("rel_trial_patient", "1   places_order   *", 325, 445, 370, 445, "#0F172A", false, "diamond");
  edge("rel_patient_event", "1    dispatches    *", 485, 445, 530, 445, "#0F172A", false, "diamond");
  edge("rel_kb_ai_model", "used_by", 745, 355, 727, 400, "#0F172A", true, "open");
  edge("rel_model_prompt", "1       *", 780, 445, 810, 445, "#0F172A", false, "diamond");
  edge("rel_prompt_resp", "contains", 915, 445, 945, 445, "#0F172A", false, "diamond");
  edge("rel_event_model", "", 675, 465, 645, 465, "#64748B", true, "open");

  // --- ROW 4: PricingPolicy, TaxJurisdiction, FraudRule, ChargebackRisk (Orange) & AuditLog, Metric (Slate/Blue) ---
  if (isRetail) {
    entity("ent_policy", "PricingPolicy", ["PK pricing_policy_id", "name", "discount_pct", "tier", "effective_date", "status"], 20, 555, 115, 110, "#F97316", "#FFF7ED", "#FDBA74");
    entity("ent_regulation", "TaxJurisdiction", ["PK tax_jurisdiction_id", "state", "vat_rate", "country"], 185, 555, 115, 90, "#F97316", "#FFF7ED", "#FDBA74");
    entity("ent_control", "FraudRule", ["PK fraud_rule_id", "policy_id (FK)", "velocity_limit", "cvv_required", "owner_id (FK)"], 355, 555, 120, 110, "#F97316", "#FFF7ED", "#FDBA74");
    entity("ent_risk", "ChargebackRisk", ["PK chargeback_id", "fraud_rule_id (FK)", "risk_score", "hold_action", "status"], 530, 555, 115, 100, "#F97316", "#FFF7ED", "#FDBA74");
  } else {
    entity("ent_policy", "Policy", ["PK policy_id", "name", "category", "version", "effective_date", "status"], 20, 555, 115, 110, "#F97316", "#FFF7ED", "#FDBA74");
    entity("ent_regulation", "Regulation", ["PK regulation_id", "name", "authority", "region"], 185, 555, 115, 90, "#F97316", "#FFF7ED", "#FDBA74");
    entity("ent_control", "Control", ["PK control_id", "policy_id (FK)", "description", "frequency", "owner_id (FK)"], 355, 555, 120, 110, "#F97316", "#FFF7ED", "#FDBA74");
    entity("ent_risk", "Risk", ["PK risk_id", "control_id (FK)", "severity", "likelihood", "status"], 530, 555, 115, 100, "#F97316", "#FFF7ED", "#FDBA74");
  }

  entity("ent_audit_log", "AuditLog", ["PK audit_id", "user_id (FK)", "action", "resource", "timestamp", "ip_address"], 720, 555, 125, 110, "#64748B", "#F8FAFC", "#CBD5E1");
  entity("ent_metric", "Metric", ["PK metric_id", "name", "value", "unit", "timestamp", "source"], 895, 555, 115, 110, "#64748B", "#F8FAFC", "#CBD5E1");

  // Row 4 Relationships
  edge("rel_pol_reg", "references", 135, 600, 185, 600, "#0F172A", false, "diamond");
  edge("rel_reg_ctrl", "composed_of", 300, 600, 355, 600, "#0F172A", false, "diamond");
  edge("rel_ctrl_risk", "mitigates", 475, 600, 530, 600, "#0F172A", false, "diamond");
  edge("rel_audit_metric", "emits", 845, 600, 895, 600, "#0F172A", false, "diamond");
  edge("rel_model_audit", "", 727, 505, 782, 555, "#64748B", true, "open");

  // --- ROW 5: DataSource/ERPConnector, Connector/PaymentGateway, IngestionJob/InventorySyncJob, DataAsset/CatalogFeed (Teal) ---
  if (isRetail) {
    entity("ent_data_source", "ERPConnector", ["PK erp_source_id", "name", "type", "endpoint", "status"], 20, 690, 115, 100, "#14B8A6", "#F0FDFA", "#5EEAD4");
    entity("ent_connector", "PaymentGateway", ["PK gateway_id", "source_id (FK)", "protocol", "auth_type", "frequency"], 185, 690, 120, 100, "#14B8A6", "#F0FDFA", "#5EEAD4");
    entity("ent_ingestion_job", "InventorySyncJob", ["PK sync_job_id", "gateway_id (FK)", "status", "started_at", "ended_at"], 355, 690, 125, 100, "#14B8A6", "#F0FDFA", "#5EEAD4");
    entity("ent_data_asset", "CatalogFeed", ["PK feed_id", "sync_job_id (FK)", "format", "location_uri", "size", "checksum"], 530, 690, 125, 110, "#14B8A6", "#F0FDFA", "#5EEAD4");
  } else {
    entity("ent_data_source", "DataSource", ["PK source_id", "name", "type", "endpoint", "status"], 20, 690, 115, 100, "#14B8A6", "#F0FDFA", "#5EEAD4");
    entity("ent_connector", "Connector", ["PK connector_id", "source_id (FK)", "protocol", "auth_type", "frequency"], 185, 690, 120, 100, "#14B8A6", "#F0FDFA", "#5EEAD4");
    entity("ent_ingestion_job", "IngestionJob", ["PK job_id", "connector_id (FK)", "status", "started_at", "ended_at"], 355, 690, 125, 100, "#14B8A6", "#F0FDFA", "#5EEAD4");
    entity("ent_data_asset", "DataAsset", ["PK asset_id", "job_id (FK)", "format", "location_uri", "size", "checksum"], 530, 690, 125, 110, "#14B8A6", "#F0FDFA", "#5EEAD4");
  }

  // Row 5 Relationships
  edge("rel_ds_conn", "connects", 135, 735, 185, 735, "#0F172A", false, "diamond");
  edge("rel_conn_job", "triggers", 305, 735, 355, 735, "#0F172A", false, "diamond");
  edge("rel_job_asset", "produces", 480, 735, 530, 735, "#0F172A", false, "diamond");
  edge("rel_asset_audit", "", 655, 735, 755, 665, "#64748B", true, "open", [[755, 735]]);

  // =========================================================================
  // 4. RIGHT SIDEBAR: LEGEND, CONSTRAINTS, RULES, ABBREVIATIONS (x: 1140, w: 440)
  // =========================================================================
  // Card 1: RELATIONSHIP LEGEND (y: 70, h: 140)
  const relLegendHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">RELATIONSHIP LEGEND</div>
    <table style="width:100%;font-size:8px;font-weight:700;color:#1E293B;line-height:1.5;">
      <tr><td style="width:70px;text-align:center;">1 ─── 1</td><td>One to One</td></tr>
      <tr><td style="text-align:center;">1 ─── &lt;</td><td>One to Many</td></tr>
      <tr><td style="text-align:center;">&gt; ─── &lt;</td><td>Many to Many</td></tr>
      <tr><td style="text-align:center;">◇</td><td>Associative / Relationship</td></tr>
    </table>
  </div>`;
  rect("card_rel_legend", relLegendHtml, 1140, 70, 440, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: KEY CONSTRAINTS (y: 220, h: 165)
  const constraintsHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">KEY CONSTRAINTS</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.5;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="color:#16A34A;font-weight:900;">✔</span>
        <span><b>All PKs are surrogate keys (UUID)</b></span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="color:#16A34A;font-weight:900;">✔</span>
        <span><b>FKs enforce referential integrity</b></span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="color:#16A34A;font-weight:900;">✔</span>
        <span><b>Soft-delete &amp; versioning for all core entities</b></span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="color:#16A34A;font-weight:900;">✔</span>
        <span><b>Row-level security applied</b></span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="color:#16A34A;font-weight:900;">✔</span>
        <span><b>PII encrypted at rest &amp; in transit</b></span>
      </div>
    </div>
  </div>`;
  rect("card_constraints", constraintsHtml, 1140, 220, 440, 165, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: SAMPLE BUSINESS RULES (y: 395, h: 220)
  const rule1 = isRetail ? "CatalogItem must have at least one ItemVariant" : "Document must have at least one version";
  const rule2 = isRetail ? "User role defines merchant access permissions" : "User role defines access to resources";
  const rule3 = isRetail ? "Order must belong to a Merchant" : "Trial must belong to a Study";
  const rule4 = isRetail ? "Shipment must belong to an enrolled Shopper" : "Event must belong to an enrolled Patient";
  const rule5 = isRetail ? "Pricing policy links to Tax Jurisdictions" : "Policy links to one or more Regulations";
  const rule6 = isRetail ? "Chargeback risk screened by a Fraud Rule" : "Risk must be mapped to a Control";
  const rule7 = isRetail ? "Order total must reconcile with Cart Items" : "Response must cite source Documents";

  const businessRulesHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">SAMPLE BUSINESS RULES</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">1</span>
        <span>${rule1}</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">2</span>
        <span>${rule2}</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">3</span>
        <span>${rule3}</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">4</span>
        <span>${rule4}</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">5</span>
        <span>${rule5}</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">6</span>
        <span>${rule6}</span>
      </div>
      <div style="display:flex;align-items:flex-start;gap:6px;">
        <span style="background:#1D4ED8;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;flex-shrink:0;">7</span>
        <span>${rule7}</span>
      </div>
    </div>
  </div>`;
  rect("card_business_rules", businessRulesHtml, 1140, 395, 440, 220, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 4: ABBREVIATIONS (y: 625, h: 175)
  const abbreviationsHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">ABBREVIATIONS</div>
    <table style="width:100%;font-size:7.5px;color:#1E293B;line-height:1.45;">
      <tr>
        <td style="font-weight:900;width:35px;">PK</td><td>Primary Key</td>
        <td style="font-weight:900;width:35px;">FK</td><td>Foreign Key</td>
      </tr>
      <tr>
        <td style="font-weight:900;">PII</td><td>Personally Identifiable Info</td>
        <td style="font-weight:900;">AI</td><td>Artificial Intelligence</td>
      </tr>
      <tr>
        <td style="font-weight:900;">KB</td><td>Knowledge Base</td>
        <td style="font-weight:900;">UUID</td><td>Universally Unique Identifier</td>
      </tr>
    </table>
  </div>`;
  rect("card_abbreviations", abbreviationsHtml, 1140, 625, 440, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 5. BOTTOM 4 ANALYTICAL PANELS (y: 815, h: 145)
  // =========================================================================
  // Card 1: ENTITY SUMMARY (x: 20, w: 220)
  const summaryHtml = `<div style="padding:6px 8px;">
    <div style="font-size:9.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;letter-spacing:0.5px;text-align:center;">ENTITY SUMMARY</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.4;margin-top:6px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>~ 24 core entities</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>~ 36 relationships</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>7 business domains</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Extensible &amp; future-proof</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Built for compliance (GxP)</span></div>
    </div>
  </div>`;
  rect("card_entity_summary", summaryHtml, 20, 815, 220, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: TECHNOLOGY STACK (GOOGLE CLOUD) (x: 250, w: 370)
  const techStackHtml = `<div style="padding:6px 8px;">
    <div style="font-size:9.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;letter-spacing:0.5px;text-align:center;">TECHNOLOGY STACK (GOOGLE CLOUD)</div>
    <table style="width:100%;text-align:center;font-size:7.5px;font-weight:700;color:#1E293B;margin-top:6px;">
      <tr>
        <td style="padding:2px;width:25%;"><div style="font-size:16px;">🗄️</div><div>Cloud Spanner</div></td>
        <td style="padding:2px;width:25%;"><div style="font-size:16px;">📊</div><div>BigQuery</div></td>
        <td style="padding:2px;width:25%;"><div style="font-size:16px;">🧠</div><div>Vertex AI</div></td>
        <td style="padding:2px;width:25%;"><div style="font-size:16px;">⚙️</div><div>Dataproc (Spark)</div></td>
      </tr>
      <tr>
        <td style="padding:2px;"><div style="font-size:16px;">📡</div><div>Pub/Sub</div></td>
        <td style="padding:2px;"><div style="font-size:16px;">🗄️</div><div>Cloud Storage</div></td>
        <td style="padding:2px;"><div style="font-size:16px;">📑</div><div>Data Catalog</div></td>
        <td style="padding:2px;"><div style="font-size:16px;">🛡️</div><div>IAM</div></td>
      </tr>
    </table>
  </div>`;
  rect("card_tech_stack", techStackHtml, 250, 815, 370, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: DATA FLOW HINT (x: 630, w: 470)
  const flowHintHtml = `<div style="padding:6px 8px;">
    <div style="font-size:9.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;letter-spacing:0.5px;text-align:center;">DATA FLOW HINT</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:7.5px;font-weight:700;margin-top:8px;">
      <div style="border:1px solid #0284C7;background:#EFF6FF;padding:4px 6px;border-radius:4px;text-align:center;">DataSource<br><span style="font-size:8px;color:#64748B;">(External)</span></div>
      <span>➔</span>
      <div style="border:1px solid #0284C7;background:#EFF6FF;padding:4px 6px;border-radius:4px;text-align:center;">Ingestion<br><span style="font-size:8px;color:#64748B;">(Job)</span></div>
      <span>➔</span>
      <div style="border:1px solid #0284C7;background:#EFF6FF;padding:4px 6px;border-radius:4px;text-align:center;">DataAsset<br><span style="font-size:8px;color:#64748B;">(Storage)</span></div>
      <span>➔</span>
      <div style="border:1px solid #7C3AED;background:#FAF5FF;padding:4px 6px;border-radius:4px;text-align:center;">Indexed in<br><span style="font-size:8px;color:#64748B;">KB / Embedding</span></div>
      <span>➔</span>
      <div style="border:1px solid #7C3AED;background:#FAF5FF;padding:4px 6px;border-radius:4px;text-align:center;">Used by<br><span style="font-size:8px;color:#64748B;">AI Models</span></div>
    </div>
    <div style="font-size:7.5px;color:#475569;text-align:center;margin-top:8px;font-style:italic;">Feedback loop from Response ➔ Audit / Metrics ➔ Improvement</div>
  </div>`;
  rect("card_data_flow_hint", flowHintHtml, 630, 815, 470, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 4: USE CASE MAPPING (x: 1110, w: 470)
  const useCaseHtml = isRetail
    ? `<div style="padding:6px 8px;">
    <div style="font-size:9.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;letter-spacing:0.5px;text-align:center;">USE CASE MAPPING (Examples)</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;margin-top:6px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Catalog Search</b> ➔ CatalogItem + SkuEmbedding + RecEngine</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Order Fulfillment</b> ➔ Order + Shipment + Warehouse</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Cart Checkout</b> ➔ Cart + CartItem + PaymentGateway</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Fraud &amp; Risk</b> ➔ PricingPolicy + FraudRule + ChargebackRisk</span></div>
    </div>
  </div>`
    : `<div style="padding:6px 8px;">
    <div style="font-size:9.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;letter-spacing:0.5px;text-align:center;">USE CASE MAPPING (Examples)</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;margin-top:6px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Protocol Intelligence</b> ➔ Document + KB + AI Model</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Safety Signal Detection</b> ➔ Patient + Event + AI</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Regulatory Q&amp;A</b> ➔ KB + Prompt + Response</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span><b>Audit &amp; Compliance</b> ➔ Policy + AuditLog + Metrics</span></div>
    </div>
  </div>`;
  rect("card_use_cases", useCaseHtml, 1110, 815, 470, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 6. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_14_data_model_erd" name="Template 13: Class / Entity Relationship Diagram">
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
