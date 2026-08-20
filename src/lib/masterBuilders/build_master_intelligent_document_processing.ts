/**
 * 🎨 Blueprint #60 (NEW-AI-10): Intelligent Document Processing (IDP) Platform
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Multi-Channel Document Intake (Scanned Invoices, Claims PDFs, Email Attachments, REST API Intake)
 * - OCR & Semantic Extraction Tier (Document AI Custom Extractor, Layout Parser, Entity Extraction)
 * - AI Validation & Confidence Routing Gate (Gemini 2.5 Flash Multimodal Cross-Validation, >95% STP vs <95% Exception Routing)
 * - Human-in-the-Loop (HITL) Review Cockpit (Document AI Review Interface, Active Learning Model Feedback)
 * - Enterprise Downstream Integration & Storage (BigQuery Lakehouse, ERP Systems SAP/Workday, Vertex AI Search, Looker Studio)
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
  erp: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#7E57C2"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>'),
  search: svg('<circle cx="20" cy="20" r="11" fill="none" stroke="#1669C1" stroke-width="4"/><path d="m28 28 11 11" stroke="#1669C1" stroke-width="4" stroke-linecap="round"/>'),
  looker: svg('<circle cx="16" cy="24" r="6" fill="#9333EA"/><circle cx="32" cy="16" r="6" fill="#0284C7"/><circle cx="32" cy="32" r="6" fill="#16A34A"/><path d="M16 24l16-8M16 24l16 8" stroke="#64748B" stroke-width="2"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;shadow=0;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=15;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:12px;color:#0F172A">${title}</b><br/><span style="font-size:10px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#0284C7', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#16A34A', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterIntelligentDocProcessingXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Multi-Channel Document Intake
    lane('intake', 1, 'MULTI-CHANNEL INTAKE', 'Invoices, claims, email attachments & REST API streams', 20, 20, 260, 680, '#0284C7', '#F0F9FF'),
    card('in_paper', 'Scanned Invoices & Paper', 'Multi-page TIFF, PDF & JPEG image uploads', ICON.docai, 38, 85, 224, 85, '#0284C7'),
    card('in_claims', 'Digital Claims & Contracts', 'Native digital PDFs & Word documents', ICON.docai, 38, 195, 224, 85, '#0284C7'),
    card('in_email', 'Email Attachments & IMAP', 'Automated email listener & attachment parser', ICON.docai, 38, 305, 224, 85, '#0284C7'),
    card('in_gcs', 'Cloud Storage Landing Zone', 'Secure immutable intake bucket with CMEK encryption', ICON.gcs, 38, 415, 224, 85, '#0284C7'),

    // Lane 2: OCR & Semantic Extraction Tier
    lane('extract', 2, 'OCR & SEMANTIC EXTRACTION TIER', 'Document AI custom processors, layout analysis & entity extraction', 300, 20, 310, 680, '#7E57C2', '#FAF5FF'),
    card('ex_custom', 'Document AI Custom Extractor', 'Trained model for domain invoice/claims schemas', ICON.docai, 318, 85, 274, 90, '#7E57C2'),
    card('ex_layout', 'Layout Parser & Tables', 'Extract nested line items, totals & tax line tables', ICON.docai, 318, 205, 274, 90, '#7E57C2'),
    card('ex_fields', 'Extracted Structured Fields', 'JSON schema output with field-level confidence scores', ICON.docai, 318, 325, 274, 90, '#7E57C2'),

    // Lane 3: AI Validation & Confidence Routing Gate
    lane('gate', 3, 'AI VALIDATION & CONFIDENCE GATE', 'Gemini 2.5 Flash cross-validation & confidence thresholding', 630, 20, 320, 680, '#16A34A', '#F0FDF4'),
    card('gt_gemini', 'Gemini 2.5 Flash Validation', 'Cross-field arithmetic checks & entity semantic reasoning', ICON.gemini, 648, 85, 284, 95, '#16A34A'),
    card('gt_threshold', 'Confidence Threshold Gating', 'Confidence >= 95% -> Straight-Through Processing (STP)\nConfidence < 95% -> Exception Routing', ICON.gate, 648, 210, 284, 105, '#16A34A'),
    card('gt_stp', 'Straight-Through Fast Path', 'Zero-touch automated commit for verified documents', ICON.gate, 648, 345, 284, 85, '#16A34A'),

    // Lane 4: Human-in-the-Loop Review Cockpit
    lane('hitl', 4, 'HUMAN-IN-THE-LOOP (HITL) COCKPIT', 'Exception review UI, specialist correction & active learning', 970, 20, 290, 680, '#EA580C', '#FFFBEB'),
    card('ht_cockpit', 'Document AI Review Cockpit', 'Side-by-side document image vs extracted field editor', ICON.hitl, 988, 85, 254, 95, '#EA580C'),
    card('ht_human', 'Human Specialist Verification', 'One-click field correction & exception approval', ICON.hitl, 988, 210, 254, 95, '#EA580C'),
    card('ht_feedback', 'Active Learning Feedback Loop', 'Human corrections exported for continuous model fine-tuning', ICON.gemini, 988, 335, 254, 95, '#9333EA'),

    // Lane 5: Enterprise Downstream Integration
    lane('downstream', 5, 'ENTERPRISE DOWNSTREAM CONSUMPTION', 'BigQuery lakehouse, ERP payment execution & semantic search', 1280, 20, 280, 680, '#1D4ED8', '#EFF6FF'),
    card('ds_bq', 'BigQuery Lakehouse', 'Structured analytics warehouse & reporting', ICON.bq, 1298, 85, 244, 90, '#1D4ED8'),
    card('ds_erp', 'ERP Systems (SAP / Workday)', 'Automated invoice payment & general ledger posting', ICON.erp, 1298, 205, 244, 90, '#7E57C2'),
    card('ds_search', 'Vertex AI Search Index', 'Full-text multimodal document discovery', ICON.search, 1298, 325, 244, 90, '#0284C7'),
    card('ds_looker', 'Looker Studio Dashboard', 'STP rate metrics, processing latency & accuracy SLAs', ICON.looker, 1298, 445, 244, 85, '#9333EA'),

    // Governance Band
    lane('gov', 0, 'DOCUMENT GOVERNANCE, PII MASKING & AUDIT TRAIL PLANE', 'HIPAA/GDPR compliance, Sensitive Data Protection & immutable audit logging', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('gov_dlp', 'Sensitive Data Protection (DLP)', 'Automatic redaction of SSNs, credit cards & medical IDs', ICON.gate, 45, 785, 470, 95, '#16A34A'),
    card('gov_iam', 'Cloud IAM & Retention Policies', 'Immutable document retention lock (Bucket Lock)', ICON.gate, 545, 785, 470, 95, '#16A34A'),
    card('gov_audit', 'Cloud Audit Logs & Lineage', 'Full audit record of human approvals & automated STP runs', ICON.log, 1045, 785, 490, 95, '#16A34A'),

    // Edges
    edge('e_in_gcs', 'in_paper', 'in_gcs', 'Upload Document', 'request', 0.5, 1, 0.5, 0),
    edge('e_gcs_docai', 'in_gcs', 'ex_custom', 'OCR Processing', 'request'),
    edge('e_docai_layout', 'ex_custom', 'ex_layout', 'Analyze Structure', 'request', 0.5, 1, 0.5, 0),
    edge('e_layout_fields', 'ex_layout', 'ex_fields', 'Extract Fields', 'request', 0.5, 1, 0.5, 0),
    edge('e_fields_gemini', 'ex_fields', 'gt_gemini', 'Validate Fields', 'request'),
    edge('e_gemini_gate', 'gt_gemini', 'gt_threshold', 'Evaluate Confidence', 'request', 0.5, 1, 0.5, 0),
    edge('e_gate_stp', 'gt_threshold', 'gt_stp', 'Confidence >= 95%', 'request', 0.5, 1, 0.5, 0),
    edge('e_gate_hitl', 'gt_threshold', 'ht_cockpit', 'Confidence < 95% Exception', 'response'),
    edge('e_hitl_human', 'ht_cockpit', 'ht_human', 'Manual Review', 'request', 0.5, 1, 0.5, 0),
    edge('e_human_fb', 'ht_human', 'ht_feedback', 'Correction Data', 'request', 0.5, 1, 0.5, 0),
    edge('e_fb_retrain', 'ht_feedback', 'ex_custom', 'Fine-Tune Processor', 'governance', 0.5, 0, 0.5, 1, [[1115, 60], [455, 60]]),
    edge('e_stp_bq', 'gt_stp', 'ds_bq', 'Store Clean Records', 'request', 1, 0.25, 0, 0.5),
    edge('e_stp_erp', 'gt_stp', 'ds_erp', 'Post Invoice Payment', 'request', 1, 0.75, 0, 0.5),
    edge('e_human_erp', 'ht_human', 'ds_erp', 'Approved Invoice Posting', 'request'),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_intelligent_document_processing" name="Intelligent Document Processing (IDP) Platform">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_INTELLIGENT_DOC_PROCESSING_XML = buildMasterIntelligentDocProcessingXml();
