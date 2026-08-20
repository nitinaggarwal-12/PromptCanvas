/**
 * 🎨 Blueprint #60 (NEW-AI-10): Intelligent Document Processing (IDP) Platform
 * Executive Light Theme Master Blueprint
 * 
 * Featuring:
 * - Light Background (#F8FAFC) & Crisp White Frosted Containers (#FFFFFF)
 * - Multi-Channel Document Intake (Scanned Invoices, Claims PDFs, Email Attachments, REST API Intake)
 * - OCR & Semantic Extraction Tier (Document AI Custom Extractor, Layout Parser, Entity Extraction)
 * - AI Validation & Confidence Routing Gate (Gemini 2.5 Flash Multimodal Cross-Validation, >95% STP vs <95% Exception Routing)
 * - Human-in-the-Loop (HITL) Review Cockpit (Document AI Review Interface, Active Learning Model Feedback)
 * - Enterprise Downstream Integration & Storage (BigQuery Lakehouse, ERP Systems SAP/Workday, Vertex AI Search, Looker Studio)
 * - Document Governance, PII Masking & Immutable Audit Trail Plane (Cloud KMS, DLP, Audit Logs)
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICON = {
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  docai: svg('<rect x="10" y="6" width="28" height="36" rx="4" fill="#0284C7"/><path d="M16 16h16M16 24h16M16 32h10" stroke="#fff" stroke-width="2.5"/>'),
  gemini: svg('<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#7B61FF"/><stop offset="1" stop-color="#D965C5"/></linearGradient></defs><path fill="url(#g)" d="M24 4c2.2 10.2 9.6 17.6 20 20-10.4 2.4-17.8 9.8-20 20-2.2-10.2-9.6-17.6-20-20C14.4 21.6 21.8 14.2 24 4z"/>'),
  gate: svg('<circle cx="24" cy="24" r="16" fill="#16A34A"/><path d="m16 24 6 6 12-12" fill="none" stroke="#fff" stroke-width="3"/>'),
  hitl: svg('<circle cx="24" cy="15" r="8" fill="#EA580C"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#EA580C"/><circle cx="34" cy="30" r="6" fill="#0284C7"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  erp: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#7C3AED"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>'),
  search: svg('<circle cx="20" cy="20" r="11" fill="none" stroke="#0284C7" stroke-width="4"/><path d="m28 28 11 11" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>'),
  looker: svg('<circle cx="16" cy="24" r="6" fill="#9333EA"/><circle cx="32" cy="16" r="6" fill="#0284C7"/><circle cx="32" cy="32" r="6" fill="#16A34A"/><path d="M16 24l16-8M16 24l16 8" stroke="#64748B" stroke-width="2"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, num: string, title: string, x: number, y: number, w: number, h: number, border = '#CBD5E1', fill = '#FFFFFF', podFill = '#1E293B'): string => [
  cell(id, '', `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.5;shadow=1;`, x, y, w, h),
  cell(`${id}_pod`, `<div style="text-align:center;"><b style="font-size:11.5px;color:#94A3B8;">${num}</b><br/><b style="font-size:11px;color:#FFFFFF;letter-spacing:0.04em;">${title}</b></div>`, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${podFill};strokeColor=${border};strokeWidth=1.2;align=center;verticalAlign=middle;`, x + 10, y + 10, 115, h - 20),
].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, w: number, h: number, border = '#2563EB', fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse;"><tr><td style="width:36px;text-align:center;vertical-align:middle;"><img src="${icon}" width="26" height="26"/></td><td style="text-align:left;vertical-align:middle;padding-left:4px;"><b style="font-size:11px;color:#0F172A;">${title}</b><br/><span style="font-size:9.5px;color:#475569;line-height:1.2;">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.3;align=center;verticalAlign=middle;spacing=2;`, x, y, w, h);
};

const decision = (id: string, question: string, x: number, y: number, w: number, h: number, border = '#D97706', fill = '#FEF3C7'): string => {
  const html = `<div style="text-align:center;"><b style="font-size:10.5px;color:#92400E;">${question}</b></div>`;
  return cell(id, html, `rhombus;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.4;align=center;verticalAlign=middle;`, x, y, w, h);
};

const pill = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, w: number, h: number, border = '#DC2626', fill = '#FEE2E2'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse;"><tr><td style="width:24px;text-align:center;vertical-align:middle;"><img src="${icon}" width="18" height="18"/></td><td style="text-align:left;vertical-align:middle;padding-left:3px;"><b style="font-size:10px;color:#991B1B;">${title}</b><br/><span style="font-size:8.5px;color:#B91C1C;">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.2;align=center;verticalAlign=middle;`, x, y, w, h);
};

const edge = (id: string, src: string, tgt: string, label: string, color = '#2563EB', dashed = 0, exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, pts: Array<[number, number]> = []): string => {
  const pointsStr = pts.length ? `<Array as="points">${pts.map(([px, py]) => `<mxPoint x="${px}" y="${py}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;dashed=${dashed};dashPattern=5 3;endArrow=block;endFill=1;fontColor:#0F172A;fontSize=9.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry">${pointsStr}</mxGeometry></mxCell>`;
};

export function buildMasterIntelligentDocProcessingXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Main Header Title Pod
    cell('title', 'Blueprint 60 — Intelligent Document Processing (IDP) Platform — Detailed Architecture & Flowchart', 'text;html=1;whiteSpace=wrap;fontColor=#0F172A;fontSize=18;fontStyle=1;align=left;verticalAlign=middle;', 18, 12, 1280, 24),
    cell('subtitle', 'Multi-Channel Intake, Document AI OCR, Gemini 2.5 Flash Validation, HITL Review Cockpit & Enterprise ERP Integration', 'text;html=1;whiteSpace=wrap;fontColor=#2563EB;fontSize=11.5;fontStyle=1;align=left;verticalAlign=middle;', 18, 36, 1280, 18),

    // =========================================================================
    // TIER 1: MULTI-CHANNEL DOCUMENT INTAKE
    // =========================================================================
    lane('t1', 'TIER 1', 'MULTI-CHANNEL<br/>INTAKE', 18, 65, 1260, 105, '#CBD5E1', '#FFFFFF', '#1E293B'),
    card('in_paper', 'Scanned Invoices & Paper', 'Multi-page TIFF, PDF & JPEG', ICON.docai, 145, 82, 250, 70, '#0284C7'),
    card('in_claims', 'Digital Claims & Contracts', 'Native PDF, Word & XML Forms', ICON.docai, 415, 82, 250, 70, '#0284C7'),
    card('in_email', 'Email Attachments & IMAP', 'Automated Parser & Listener', ICON.docai, 685, 82, 250, 70, '#0284C7'),
    card('in_gcs', 'Cloud Storage (GCS Landing)', 'CMEK Encrypted Intake Bucket', ICON.gcs, 955, 82, 305, 70, '#0284C7'),

    // =========================================================================
    // TIER 2: OCR & SEMANTIC EXTRACTION TIER
    // =========================================================================
    lane('t2', 'TIER 2', 'OCR &amp; SEMANTIC<br/>EXTRACTION TIER', 18, 185, 1260, 105, '#CBD5E1', '#FFFFFF', '#4C1D95'),
    card('ex_custom', 'Document AI Custom Extractor', 'Specialized Claims & Invoice Model', ICON.docai, 145, 202, 260, 70, '#7C3AED'),
    card('ex_layout', 'Layout Parser & Tables', 'Extract Nested Line Items & Totals', ICON.docai, 425, 202, 260, 70, '#7C3AED'),
    card('ex_fields', 'Extracted Structured JSON', 'Field-Level Confidence Scores', ICON.docai, 705, 202, 260, 70, '#7C3AED'),
    decision('d_doc_valid', 'Valid Format<br/>&amp; Payload?', 985, 200, 110, 75, '#D97706', '#FEF3C7'),
    pill('p_reject', 'Rejection Handler', 'Notify Sender on Malformed Payload', ICON.log, 1115, 205, 145, 65, '#DC2626'),

    // =========================================================================
    // TIER 3: AI VALIDATION & CONFIDENCE ROUTING GATE
    // =========================================================================
    lane('t3', 'TIER 3', 'AI VALIDATION &amp;<br/>CONFIDENCE GATE', 18, 305, 1260, 105, '#CBD5E1', '#FFFFFF', '#065F46'),
    card('gt_gemini', 'Gemini 2.5 Flash Validation', 'Cross-Field Arithmetic & Reasoning', ICON.gemini, 145, 322, 270, 70, '#059669'),
    decision('d_confidence', 'Confidence &gt;=<br/>95% Threshold?', 445, 320, 120, 75, '#D97706', '#FEF3C7'),
    card('gt_stp', 'Straight-Through Fast Path', 'Zero-Touch Automated Processing', ICON.gate, 595, 322, 270, 70, '#059669'),
    card('gt_exception', 'Exception Routing Queue', 'Low-Confidence Field Isolation', ICON.hitl, 895, 322, 260, 70, '#D97706'),

    // =========================================================================
    // TIER 4: HUMAN-IN-THE-LOOP (HITL) REVIEW COCKPIT
    // =========================================================================
    lane('t4', 'TIER 4', 'HUMAN-IN-THE-LOOP<br/>(HITL) COCKPIT', 18, 425, 1260, 105, '#CBD5E1', '#FFFFFF', '#9A3412'),
    card('ht_cockpit', 'Document AI Review Cockpit', 'Side-by-Side Image vs Field Editor', ICON.hitl, 145, 442, 270, 70, '#EA580C'),
    card('ht_human', 'Human Specialist Review', 'One-Click Correction & Approval', ICON.hitl, 445, 442, 270, 70, '#EA580C'),
    decision('d_approved', 'Specialist<br/>Approved?', 745, 440, 110, 75, '#D97706', '#FEF3C7'),
    card('ht_feedback', 'Active Learning Loop', 'Export Corrections for Retraining', ICON.gemini, 885, 442, 260, 70, '#7C3AED'),

    // =========================================================================
    // TIER 5: ENTERPRISE DOWNSTREAM INTEGRATION
    // =========================================================================
    lane('t5', 'TIER 5', 'ENTERPRISE<br/>DOWNSTREAM PLANE', 18, 545, 1260, 105, '#CBD5E1', '#FFFFFF', '#1E3A8A'),
    card('ds_bq', 'BigQuery Lakehouse', 'Structured Analytics Warehouse', ICON.bq, 145, 562, 260, 70, '#1D4ED8'),
    card('ds_erp', 'ERP Systems (SAP / Workday)', 'Automated Payment & Ledger Post', ICON.erp, 425, 562, 260, 70, '#7C3AED'),
    card('ds_search', 'Vertex AI Search Index', 'Full-Text Multimodal Discovery', ICON.search, 705, 562, 260, 70, '#0284C7'),
    card('ds_looker', 'Looker Studio Dashboard', 'STP Rate & Accuracy SLAs', ICON.looker, 985, 562, 275, 70, '#7C3AED'),

    // =========================================================================
    // TIER 6: DOCUMENT GOVERNANCE, PII MASKING & AUDIT TRAIL PLANE
    // =========================================================================
    lane('t6', 'GOVERNANCE', 'SECURITY, DLP &amp;<br/>AUDIT TRAIL', 18, 665, 1260, 95, '#CBD5E1', '#FFFFFF', '#065F46'),
    card('gov_dlp', 'Sensitive Data Protection (DLP)', 'Automatic PII Redaction of SSNs & Financials', ICON.gate, 145, 680, 360, 65, '#059669'),
    card('gov_iam', 'Cloud IAM & Retention Lock', 'Immutable Storage Bucket Lock & RBAC', ICON.gate, 525, 680, 360, 65, '#059669'),
    card('gov_audit', 'Cloud Audit Logs & Lineage', 'Full Evidence of Human Approvals & Runs', ICON.log, 905, 680, 355, 65, '#059669'),

    // =========================================================================
    // SIDE PANELS (LEGEND, FALLBACKS, SECURITY & STEP KEY)
    // =========================================================================
    cell('p_legend', `<div style="padding:10px;"><b style="font-size:11px;color:#1E3A8A;">IDP SYSTEM LEGEND</b><br/><div style="margin-top:6px;font-size:9.5px;color:#475569;line-height:1.5;">— <b>Blue Line:</b> Synchronous Ingestion Flow<br/>- - <b>Dashed Line:</b> Event &amp; Exception Pipeline<br/>— <b>Green Line:</b> Verified STP &amp; ERP Commit<br/>◇ <b>Amber Diamond:</b> Confidence Policy Gate</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 65, 270, 110),
    cell('p_fallbacks', `<div style="padding:10px;"><b style="font-size:11px;color:#D97706;">FALLBACK &amp; ESCALATION PATHS</b><br/><div style="margin-top:6px;font-size:9px;color:#475569;line-height:1.4;">• <b>Confidence &lt; 95%:</b> Route to HITL Review Cockpit<br/>• <b>Malformed Document:</b> Structured rejection notification<br/>• <b>Specialist Rejection:</b> Flag for compliance audit</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#FCD34D;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 185, 270, 105),
    cell('p_security', `<div style="padding:10px;"><b style="font-size:11px;color:#047857;">SECURITY &amp; COMPLIANCE</b><br/><div style="margin-top:6px;font-size:9px;color:#475569;line-height:1.4;">• <b>Encryption:</b> Cloud KMS (CMEK) at rest &amp; TLS 1.3<br/>• <b>Privacy:</b> Inline DLP redaction of sensitive fields<br/>• <b>Compliance:</b> HIPAA / SOC2 compliant bucket lock</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#6EE7B7;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 300, 270, 115),
    cell('p_steps', `<div style="padding:10px;"><b style="font-size:11px;color:#6D28D9;">IDP EXECUTION FLOW (1-10)</b><br/><div style="margin-top:6px;font-size:8.5px;color:#475569;line-height:1.4;">1. Document uploaded to GCS landing zone<br/>2. Document AI extracts OCR layout &amp; table schema<br/>3. Extracted JSON verified against field models<br/>4. Gemini 2.5 Flash validates cross-field arithmetic<br/>5. Confidence &gt;= 95% routes to Straight-Through Path<br/>6. Exceptions (&lt;95%) route to HITL Review Cockpit<br/>7. Human specialist approves / edits corrections<br/>8. Clean verified records stored in BigQuery Lakehouse<br/>9. Automated invoice payments posted to SAP/Workday<br/>10. Corrections exported for continuous model retrain</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 425, 270, 335),

    // =========================================================================
    // EXPLICIT DATA FLOW CONNECTORS
    // =========================================================================
    edge('e_in_paper_gcs', 'in_paper', 'in_gcs', '1. Upload Invoices', '#0284C7', 0),
    edge('e_in_claims_gcs', 'in_claims', 'in_gcs', 'Upload Claims', '#0284C7', 0),
    edge('e_in_email_gcs', 'in_email', 'in_gcs', 'Parse Attachments', '#0284C7', 0),
    edge('e_gcs_custom', 'in_gcs', 'ex_custom', '2. Trigger OCR Extractor', '#7C3AED', 0, 0.5, 1, 0.5, 0, [[1107, 160], [275, 160]]),
    edge('e_custom_layout', 'ex_custom', 'ex_layout', 'Analyze Tables', '#7C3AED', 0),
    edge('e_layout_fields', 'ex_layout', 'ex_fields', 'Extract Fields', '#7C3AED', 0),
    edge('e_fields_val', 'ex_fields', 'd_doc_valid', 'Validate Schema', '#D97706', 0),
    edge('e_val_reject', 'd_doc_valid', 'p_reject', 'Invalid (Reject)', '#DC2626', 0),
    edge('e_val_gemini', 'd_doc_valid', 'gt_gemini', '3. Valid (Evaluate AI)', '#059669', 0, 0.5, 1, 0.5, 0, [[1040, 290], [280, 290]]),
    edge('e_gemini_conf', 'gt_gemini', 'd_confidence', 'Confidence Score', '#D97706', 0),
    edge('e_conf_stp', 'd_confidence', 'gt_stp', 'Confidence &gt;= 95% (STP)', '#059669', 0),
    edge('e_conf_exc', 'd_confidence', 'gt_exception', 'Confidence &lt; 95%', '#D97706', 0, 0.5, 0, 0.5, 0, [[505, 308], [1025, 308]]),
    edge('e_exc_cockpit', 'gt_exception', 'ht_cockpit', '4. Route to Review', '#EA580C', 0, 0.5, 1, 0.5, 0, [[1025, 410], [280, 410]]),
    edge('e_cockpit_human', 'ht_cockpit', 'ht_human', 'Specialist Review', '#EA580C', 0),
    edge('e_human_appr', 'ht_human', 'd_approved', 'Decision', '#D97706', 0),
    edge('e_appr_fb', 'd_approved', 'ht_feedback', 'Correction Feedback', '#7C3AED', 0),
    edge('e_fb_retrain', 'ht_feedback', 'ex_custom', 'Continuous Model Retrain', '#7C3AED', 1, 0.5, 0, 0.5, 0, [[1015, 520], [130, 520], [130, 237]]),
    edge('e_stp_bq', 'gt_stp', 'ds_bq', '5. Store Clean Records', '#1D4ED8', 0, 0.5, 1, 0.5, 0, [[730, 410], [275, 410], [275, 550]]),
    edge('e_stp_erp', 'gt_stp', 'ds_erp', '6. Post Invoice Payments', '#7C3AED', 0, 0.5, 1, 0.5, 0, [[730, 410], [555, 410], [555, 550]]),
    edge('e_appr_erp', 'd_approved', 'ds_erp', 'Approved Commit', '#059669', 0, 0.5, 1, 0.5, 0, [[800, 525], [555, 525]]),
    edge('e_bq_looker', 'ds_bq', 'ds_looker', 'Telemetry &amp; SLAs', '#7C3AED', 0, 0.5, 1, 0.5, 0, [[275, 640], [1122, 640]]),
    edge('e_gcs_dlp', 'in_gcs', 'gov_dlp', 'Inspect PII', '#059669', 1, 0.5, 1, 0.5, 0, [[1107, 655], [325, 655]]),
    edge('e_dlp_audit', 'gov_dlp', 'gov_audit', 'Compliance Logs', '#059669', 0),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:30:00.000Z" agent="PromptCanvas Blueprint 60" version="24.7.17" type="device"><diagram id="catalog_intelligent_document_processing" name="Blueprint 60 - Intelligent Document Processing Platform"><mxGraphModel dx="1900" dy="1300" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="1" pageScale="1" pageWidth="1900" pageHeight="1300" background="#F8FAFC"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
