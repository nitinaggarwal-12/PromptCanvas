/**
 * 🎨 Blueprint #61: Enterprise AI Document Assistant Platform
 * High-Craft Master Blueprint (Detailed Architecture & Flowchart)
 * 
 * Featuring:
 * - 7 Horizontal Frosted Swimlanes with Left-Docked Pods
 * - Multi-Channel Intake (Web, Mobile, Slack, Teams, API)
 * - Edge Defense, Identity Federation & CMEK
 * - Multi-Agent Application & Orchestration (Supervisor, Workflow, Confidence Gate, HITL Review)
 * - AI / ML Services (Document AI, Multilingual Embeddings, Vector Search, Gemini 2.5, MCP Tools, Model Armor)
 * - Data Sources & External Enterprise Connectors (SharePoint, Salesforce, ServiceNow, GDrive)
 * - Asynchronous Eventing & Serverless Workers (Pub/Sub, Eventarc, Cloud Functions)
 * - DevOps, Observability & Platform Governance (Terraform IaC, CI/CD, SRE, DLP, Audit Logs)
 * - Side Legend, Fallback Paths & Security Governance Badges
 */

const esc = (v: string): string =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICON = {
  user: svg('<circle cx="24" cy="14" r="8" fill="#3B82F6"/><path d="M10 38c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#3B82F6"/>'),
  admin: svg('<circle cx="24" cy="14" r="8" fill="#EF4444"/><path d="M10 38c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#EF4444"/><path d="M34 10l6 6M40 10l-6 6" stroke="#fff" stroke-width="2"/>'),
  analyst: svg('<circle cx="24" cy="14" r="8" fill="#10B981"/><path d="M10 38c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#10B981"/><path d="M32 32l8 8" stroke="#fff" stroke-width="3"/>'),
  gclb: svg('<rect x="8" y="12" width="32" height="24" rx="4" fill="#3B82F6"/><path d="M16 24h16M24 16v16" stroke="#fff" stroke-width="2.5"/>'),
  armor: svg('<path d="M24 4L8 10v14c0 10.5 6.8 20.3 16 23 9.2-2.7 16-12.5 16-23V10L24 4z" fill="#3B82F6"/><path d="M20 24l4 4 8-8" stroke="#fff" stroke-width="3" fill="none"/>'),
  apigw: svg('<rect x="6" y="10" width="36" height="28" rx="4" fill="#6366F1"/><path d="M14 24h20M24 16l8 8-8 8" stroke="#fff" stroke-width="2.5" fill="none"/>'),
  idp: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#8B5CF6"/><circle cx="24" cy="20" r="6" fill="#fff"/><path d="M14 34c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#fff"/>'),
  secrets: svg('<rect x="12" y="18" width="24" height="22" rx="3" fill="#F59E0B"/><circle cx="24" cy="12" r="7" stroke="#F59E0B" stroke-width="3" fill="none"/>'),
  kms: svg('<rect x="8" y="14" width="32" height="20" rx="4" fill="#10B981"/><circle cx="20" cy="24" r="3" fill="#fff"/><path d="M24 24h8v4h-4v4" stroke="#fff" stroke-width="2"/>'),
  gke: svg('<polygon points="24,4 42,14 42,34 24,44 6,34 6,14" fill="#1D4ED8"/><circle cx="24" cy="24" r="6" fill="#fff"/>'),
  docai: svg('<rect x="10" y="6" width="28" height="36" rx="4" fill="#0284C7"/><path d="M16 16h16M16 24h16M16 32h10" stroke="#fff" stroke-width="2.5"/>'),
  gemini: svg('<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#7B61FF"/><stop offset="1" stop-color="#D965C5"/></linearGradient></defs><path fill="url(#g)" d="M24 4c2.2 10.2 9.6 17.6 20 20-10.4 2.4-17.8 9.8-20 20-2.2-10.2-9.6-17.6-20-20C14.4 21.6 21.8 14.2 24 4z"/>'),
  tools: svg('<circle cx="18" cy="18" r="8" fill="#F59E0B"/><path d="M24 24l14 14M32 38l6-6" stroke="#F59E0B" stroke-width="3"/>'),
  modelarmor: svg('<path d="M24 4L8 10v14c0 10.5 6.8 20.3 16 23 9.2-2.7 16-12.5 16-23V10L24 4z" fill="#10B981"/><path d="M24 14v12M24 30v2" stroke="#fff" stroke-width="3"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  vector: svg('<polygon points="24,6 40,16 40,32 24,42 8,32 8,16" fill="#06B6D4"/><circle cx="24" cy="24" r="5" fill="#fff"/>'),
  sql: svg('<rect x="8" y="8" width="32" height="32" rx="4" fill="#3B82F6"/><path d="M14 16h20M14 24h20M14 32h20" stroke="#fff" stroke-width="2"/>'),
  fire: svg('<path d="M24 4L12 24l12 16 12-16L24 4z" fill="#F59E0B"/><path d="M24 16l-6 10 6 8 6-8-6-10z" fill="#EF4444"/>'),
  pubsub: svg('<circle cx="14" cy="24" r="6" fill="#3B82F6"/><circle cx="34" cy="14" r="6" fill="#3B82F6"/><circle cx="34" cy="34" r="6" fill="#3B82F6"/><path d="M14 24l20-10M14 24l20 10" stroke="#93C5FD" stroke-width="2"/>'),
  fn: svg('<polygon points="12,8 36,8 28,40 20,40" fill="#EC4899"/><path d="M16 20h16" stroke="#fff" stroke-width="2.5"/>'),
  iac: svg('<polygon points="10,10 24,18 24,34 10,26" fill="#8B5CF6"/><polygon points="24,18 38,10 38,26 24,34" fill="#6366F1"/><polygon points="24,18 38,10 24,2 10,10" fill="#A78BFA"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#10B981"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
};

const cell = (id: string, value: string, style: string, x: number, y: number, w: number, h: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;

const lane = (id: string, num: string, title: string, x: number, y: number, w: number, h: number, border = '#1E293B', fill = '#0F172A', podFill = '#1E293B'): string => [
  cell(id, '', `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.5;shadow=1;`, x, y, w, h),
  cell(`${id}_pod`, `<div style="text-align:center;"><b style="font-size:12px;color:#94A3B8;">${num}</b><br/><b style="font-size:11px;color:#F8FAFC;letter-spacing:0.04em;">${title}</b></div>`, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${podFill};strokeColor=${border};strokeWidth=1.2;align=center;verticalAlign=middle;`, x + 10, y + 10, 115, h - 20),
].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, w: number, h: number, border = '#3B82F6', fill = '#182338'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse;"><tr><td style="width:36px;text-align:center;vertical-align:middle;"><img src="${icon}" width="26" height="26"/></td><td style="text-align:left;vertical-align:middle;padding-left:4px;"><b style="font-size:11px;color:#F8FAFC;">${title}</b><br/><span style="font-size:9.5px;color:#94A3B8;line-height:1.2;">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.2;align=center;verticalAlign=middle;spacing=2;`, x, y, w, h);
};

const decision = (id: string, question: string, x: number, y: number, w: number, h: number, border = '#F59E0B', fill = '#261C10'): string => {
  const html = `<div style="text-align:center;"><b style="font-size:10.5px;color:#FCD34D;">${question}</b></div>`;
  return cell(id, html, `rhombus;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1.4;align=center;verticalAlign=middle;`, x, y, w, h);
};

const pill = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, w: number, h: number, border = '#3B82F6', fill = '#182338'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse;"><tr><td style="width:24px;text-align:center;vertical-align:middle;"><img src="${icon}" width="18" height="18"/></td><td style="text-align:left;vertical-align:middle;padding-left:3px;"><b style="font-size:10px;color:#F8FAFC;">${title}</b><br/><span style="font-size:8.5px;color:#94A3B8;">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${border};strokeWidth=1;align=center;verticalAlign=middle;`, x, y, w, h);
};

const edge = (id: string, src: string, tgt: string, label: string, color = '#60A5FA', dashed = 0, exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, pts: Array<[number, number]> = []): string => {
  const pointsStr = pts.length ? `<Array as="points">${pts.map(([px, py]) => `<mxPoint x="${px}" y="${py}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.6;dashed=${dashed};dashPattern=5 3;endArrow=block;endFill=1;fontColor=#F8FAFC;fontSize=9.5;fontStyle=1;labelBackgroundColor=#0F172A;labelBorderColor=#1E293B;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry">${pointsStr}</mxGeometry></mxCell>`;
};

export function buildMasterBlueprint61EnterpriseAiDocumentAssistantXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Main Header Title Pod
    cell('title', 'Blueprint 61 — Enterprise AI Document Assistant Platform — Detailed Architecture & Flowchart', 'text;html=1;whiteSpace=wrap;fontColor=#F8FAFC;fontSize=18;fontStyle=1;align=left;verticalAlign=middle;', 18, 12, 1280, 24),
    cell('subtitle', 'Secure Ingestion, RAG, Multi-Agent Orchestration, Human-in-the-Loop Review, and Observability on Google Cloud', 'text;html=1;whiteSpace=wrap;fontColor=#60A5FA;fontSize=11.5;fontStyle=1;align=left;verticalAlign=middle;', 18, 36, 1280, 18),

    // =========================================================================
    // TIER 1: USERS & CHANNELS
    // =========================================================================
    lane('t1', 'TIER 1', 'USERS &amp;<br/>CHANNELS', 18, 65, 1260, 95, '#3B82F6', '#0B132B', '#1E293B'),
    pill('u_biz', 'Business User', 'Web Browser', ICON.user, 145, 82, 130, 60, '#3B82F6'),
    pill('u_analyst', 'Knowledge Analyst', 'Copilot UI', ICON.analyst, 285, 82, 130, 60, '#10B981'),
    pill('u_admin', 'System Admin', 'Admin Console', ICON.admin, 425, 82, 130, 60, '#EF4444'),
    pill('ch_web', 'Web Client', 'React / Next.js', ICON.user, 575, 82, 125, 60, '#6366F1'),
    pill('ch_mob', 'Mobile App', 'iOS / Android SDK', ICON.user, 710, 82, 125, 60, '#6366F1'),
    pill('ch_teams', 'MS Teams / Slack', 'Enterprise Bot', ICON.user, 845, 82, 130, 60, '#6366F1'),
    pill('ch_api', 'B2B API Client', 'REST / OpenAPI', ICON.apigw, 985, 82, 125, 60, '#6366F1'),
    pill('ch_resp', 'Unified Response', 'Streaming Citations', ICON.gemini, 1120, 82, 140, 60, '#10B981'),

    // =========================================================================
    // TIER 2: EDGE, IDENTITY & SECURITY GATEWAY
    // =========================================================================
    lane('t2', 'TIER 2', 'EDGE DEFENSE<br/>&amp; SECURITY', 18, 170, 1260, 100, '#6366F1', '#0D1127', '#1E293B'),
    card('n_gclb', 'External HTTPS LB', 'Global Anycast IP • TLS 1.3', ICON.gclb, 145, 185, 180, 70, '#3B82F6'),
    card('n_armor', 'Cloud Armor WAF', 'Layer 7 DDoS • OWASP Top 10', ICON.armor, 335, 185, 180, 70, '#3B82F6'),
    card('n_apigw', 'API Gateway', 'Quota Limiting • JWT Validate', ICON.apigw, 525, 185, 175, 70, '#6366F1'),
    card('n_idp', 'Identity Platform &amp; SSO', 'OIDC • OAuth 2.0 • MFA Gates', ICON.idp, 710, 185, 185, 70, '#8B5CF6'),
    decision('d_auth', 'Valid Auth &amp;<br/>Role Token?', 905, 182, 110, 75, '#F59E0B', '#261C10'),
    card('n_sec', 'Secret Manager', 'Automatic API Key Rotation', ICON.secrets, 1025, 185, 115, 70, '#F59E0B'),
    card('n_kms', 'Cloud KMS (CMEK)', 'Hardware Envelope Crypto', ICON.kms, 1150, 185, 115, 70, '#10B981'),

    // =========================================================================
    // TIER 3: APPLICATION & MULTI-AGENT ORCHESTRATION
    // =========================================================================
    lane('t3', 'TIER 3', 'APPLICATION &amp;<br/>ORCHESTRATION', 18, 280, 1260, 120, '#8B5CF6', '#130E29', '#1E293B'),
    card('n_bff', 'UI Backend / BFF', 'Cloud Run • Session Adapter', ICON.gke, 145, 300, 155, 80, '#8B5CF6'),
    card('n_orch', 'Workflow Orchestrator', 'Multi-Agent State &amp; Retries', ICON.gke, 310, 300, 160, 80, '#8B5CF6'),
    card('n_val', 'Document Processing', 'MIME &amp; Size Check', ICON.docai, 480, 300, 145, 80, '#3B82F6'),
    decision('d_doc_type', 'Document Type<br/>Supported?', 635, 302, 100, 75, '#F59E0B', '#261C10'),
    card('n_agent_hub', 'Supervisor Agent', 'Goal Planning &amp; Tools', ICON.gemini, 745, 300, 155, 80, '#A855F7'),
    decision('d_conf', 'Confidence &gt;=<br/>Threshold?', 910, 302, 100, 75, '#F59E0B', '#261C10'),
    card('n_hitl', 'Human Review Task', 'Approve / Edit / Reject', ICON.admin, 1020, 300, 120, 80, '#EF4444'),
    card('n_notif', 'Notification Service', 'Eventarc • Alert Triggers', ICON.pubsub, 1150, 300, 115, 80, '#10B981'),

    // =========================================================================
    // TIER 4: AI / ML & AGENTIC SERVICES
    // =========================================================================
    lane('t4', 'TIER 4', 'AI / ML SERVICES<br/>&amp; GEMINI', 18, 410, 1260, 120, '#10B981', '#091A18', '#1E293B'),
    card('n_docai', 'Document AI &amp; OCR', 'Layout Parser • Tables • Entities', ICON.docai, 145, 430, 165, 80, '#0284C7'),
    card('n_emb', 'Multilingual Embedding', 'text-embedding-004', ICON.gemini, 320, 430, 150, 80, '#06B6D4'),
    card('n_rerank', 'Vertex AI Reranker', 'Cross-Encoder Re-scoring', ICON.vector, 480, 430, 150, 80, '#06B6D4'),
    card('n_gemini', 'Vertex AI Gemini 2.5', 'Multi-Step Reasoning &amp; RAG', ICON.gemini, 640, 430, 165, 80, '#8B5CF6'),
    card('n_mcp_tools', 'Agent Tools &amp; MCP', 'Dynamic Function Calling API', ICON.tools, 815, 430, 165, 80, '#F59E0B'),
    decision('d_grounded', 'Grounded Context<br/>Verified?', 990, 432, 100, 75, '#F59E0B', '#261C10'),
    card('n_armor_ai', 'Model Armor &amp; Safety', 'PII Mask • Injection Defense', ICON.modelarmor, 1100, 430, 165, 80, '#10B981'),

    // =========================================================================
    // TIER 5: DATA SOURCES, VECTOR STORES & KNOWLEDGE MESH
    // =========================================================================
    lane('t5', 'TIER 5', 'DATA STORES &amp;<br/>LAKEHOUSE', 18, 540, 1260, 110, '#F59E0B', '#1D1606', '#1E293B'),
    card('n_gcs', 'Cloud Storage (GCS)', 'Raw Docs • CMEK • Object Locks', ICON.gcs, 145, 555, 170, 75, '#0284C7'),
    card('n_bq', 'BigQuery Lakehouse', 'Structured Tables &amp; Analytics', ICON.bq, 325, 555, 175, 75, '#1D4ED8'),
    card('n_vec', 'Vertex Vector Search', 'ScANN Vector Store &amp; Index', ICON.vector, 510, 555, 175, 75, '#06B6D4'),
    card('n_sql', 'Cloud SQL / AlloyDB', 'App &amp; Review Workflow State', ICON.sql, 695, 555, 175, 75, '#3B82F6'),
    card('n_fire', 'Firestore Session Store', 'Fast Turn-by-Turn Memory', ICON.fire, 880, 555, 160, 75, '#F59E0B'),
    card('n_ext', 'Enterprise Connectors', 'SharePoint • Salesforce • SAP', ICON.tools, 1050, 555, 215, 75, '#6366F1'),

    // =========================================================================
    // TIER 6: EVENTING & INTEGRATION HUB
    // =========================================================================
    lane('t6', 'TIER 6', 'EVENTING &amp;<br/>INTEGRATION', 18, 660, 1260, 95, '#EC4899', '#1C0D18', '#1E293B'),
    card('n_pubsub', 'Cloud Pub/Sub', 'Asynchronous Intake Topics', ICON.pubsub, 145, 675, 200, 65, '#EC4899'),
    card('n_eventarc', 'Eventarc Triggers', 'Audit &amp; Mutation Event Router', ICON.pubsub, 360, 675, 200, 65, '#EC4899'),
    card('n_workers', 'Cloud Run / Functions', 'Serverless Async Ingestion Workers', ICON.fn, 575, 675, 220, 65, '#EC4899'),
    card('n_webhooks', 'Webhooks / Outbound', 'Third-Party Push &amp; Sync APIs', ICON.apigw, 810, 675, 200, 65, '#EC4899'),
    card('n_integrations', 'Integration Connectors', 'Enterprise ERP &amp; CRM Sync', ICON.tools, 1025, 675, 240, 65, '#EC4899'),

    // =========================================================================
    // TIER 7: PLATFORM DEVOPS & SECURITY GOVERNANCE
    // =========================================================================
    lane('t7', 'TIER 7', 'DEVOPS, SRE &amp;<br/>GOVERNANCE', 18, 765, 1260, 95, '#10B981', '#0B1B14', '#1E293B'),
    card('n_cicd', 'GitHub &amp; Cloud Build', 'Polyrepo CI/CD • Artifact Registry', ICON.gke, 145, 780, 200, 65, '#3B82F6'),
    card('n_iac', 'Terraform IaC', 'Declarative Module Automation', ICON.iac, 360, 780, 175, 65, '#8B5CF6'),
    card('n_logging', 'Cloud Logging &amp; SRE', 'Error Reporting &amp; Monitoring', ICON.log, 550, 780, 200, 65, '#10B981'),
    card('n_iam_gov', 'IAM &amp; Least Privilege', 'Zero-Trust RBAC &amp; Service Accounts', ICON.admin, 765, 780, 185, 65, '#3B82F6'),
    card('n_dlp', 'Sensitive Data DLP', 'Automatic PII Redaction Engine', ICON.modelarmor, 965, 780, 150, 65, '#10B981'),
    card('n_audit', 'Cloud Audit Logs', 'Immutable Compliance Evidence', ICON.log, 1130, 780, 135, 65, '#10B981'),

    // =========================================================================
    // SIDE PANELS (LEGEND, FALLBACKS, SECURITY & STEP KEY)
    // =========================================================================
    cell('p_legend', `<div style="padding:10px;"><b style="font-size:11px;color:#60A5FA;">SYSTEM LEGEND</b><br/><div style="margin-top:6px;font-size:9.5px;color:#94A3B8;line-height:1.5;">— <b>Cyan Line:</b> Synchronous HTTPS Flow<br/>- - <b>Dashed Line:</b> Data &amp; Vector Pipeline<br/>— <b>Green Line:</b> Verified Response / Commit<br/>◇ <b>Amber Diamond:</b> Decision Policy Gate</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#131B2E;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 65, 270, 110),
    cell('p_fallbacks', `<div style="padding:10px;"><b style="font-size:11px;color:#F59E0B;">FALLBACK &amp; ESCALATION PATHS</b><br/><div style="margin-top:6px;font-size:9px;color:#94A3B8;line-height:1.4;">• <b>Low Confidence (&lt;90%):</b> Route to Human Review Task<br/>• <b>Unsupported Document:</b> Return structured rejection error<br/>• <b>Ungrounded / Hallucination:</b> Trigger clarifying query</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1F1810;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 185, 270, 105),
    cell('p_security', `<div style="padding:10px;"><b style="font-size:11px;color:#10B981;">SECURITY CONTROLS &amp; COMPLIANCE</b><br/><div style="margin-top:6px;font-size:9px;color:#94A3B8;line-height:1.4;">• <b>Data at Rest:</b> Cloud KMS (CMEK) FIPS 140-3<br/>• <b>Data in Transit:</b> TLS 1.3 Strict HTTPS Anycast<br/>• <b>Privacy:</b> Sensitive Data Protection (DLP) inline masking<br/>• <b>Network:</b> VPC Service Controls (VPC-SC) Perimeter</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#0D1E17;strokeColor=#10B981;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 300, 270, 115),
    cell('p_steps', `<div style="padding:10px;"><b style="font-size:11px;color:#A855F7;">EXECUTION STEPS (1-12)</b><br/><div style="margin-top:6px;font-size:8.5px;color:#94A3B8;line-height:1.4;">1. User submits query / doc via web/mobile/bot<br/>2. GCLB &amp; Armor filter DDoS &amp; inspect TLS<br/>3. Identity Platform validates SSO / OAuth JWT<br/>4. BFF &amp; Workflow Orchestrator create execution plan<br/>5. Document AI extracts OCR layout &amp; tables<br/>6. Embeddings generated &amp; indexed in Vector Search<br/>7. Hybrid search retrieves authorized context<br/>8. Gemini 2.5 Pro executes multi-step reasoning<br/>9. Agent tools invoke external enterprise MCP APIs<br/>10. Model Armor validates PII &amp; confidence scores<br/>11. Verified answer streamed with verified citations<br/>12. Full audit trail recorded in Cloud Logging</div></div>`, 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#191024;strokeColor=#8B5CF6;strokeWidth=1.2;align=left;verticalAlign=top;', 1290, 425, 270, 435),

    // =========================================================================
    // EXPLICIT DATA FLOW CONNECTORS
    // =========================================================================
    edge('e_u_web', 'u_biz', 'ch_web', '1. User Request', '#3B82F6', 0),
    edge('e_web_gclb', 'ch_web', 'n_gclb', '2. Ingress HTTPS', '#3B82F6', 0, 0.5, 1, 0.5, 0),
    edge('e_gclb_armor', 'n_gclb', 'n_armor', 'Clean Traffic', '#3B82F6', 0),
    edge('e_armor_apigw', 'n_armor', 'n_apigw', 'API Route', '#6366F1', 0),
    edge('e_apigw_idp', 'n_apigw', 'n_idp', '3. Authenticate', '#8B5CF6', 0),
    edge('e_idp_auth', 'n_idp', 'd_auth', 'Evaluate Token', '#F59E0B', 0),
    edge('e_auth_bff', 'd_auth', 'n_bff', '4. Validated JWT', '#10B981', 0, 0.5, 1, 0.5, 0, [[955, 270], [232, 270]]),
    edge('e_bff_orch', 'n_bff', 'n_orch', 'Init Workflow', '#8B5CF6', 0),
    edge('e_orch_val', 'n_orch', 'n_val', 'Process Request', '#8B5CF6', 0),
    edge('e_val_docai', 'n_val', 'n_docai', '5. OCR &amp; Layout', '#0284C7', 0, 0.5, 1, 0.5, 0, [[612, 395], [235, 395]]),
    edge('e_docai_gcs', 'n_docai', 'n_gcs', 'Persist Raw Doc', '#0284C7', 1, 0.5, 1, 0.5, 0),
    edge('e_docai_emb', 'n_docai', 'n_emb', 'Generate Vectors', '#06B6D4', 0),
    edge('e_emb_vec', 'n_emb', 'n_vec', '6. Store Vector Index', '#06B6D4', 1, 0.5, 1, 0.5, 0, [[422, 525], [597, 525]]),
    edge('e_vec_rerank', 'n_vec', 'n_rerank', '7. Candidate Chunks', '#06B6D4', 0, 0.5, 0, 0.5, 1),
    edge('e_rerank_agent', 'n_rerank', 'n_agent_hub', 'Grounded Context', '#8B5CF6', 0, 0.5, 0, 0.5, 1),
    edge('e_agent_gemini', 'n_agent_hub', 'n_gemini', '8. Plan &amp; Reason', '#A855F7', 0, 0.5, 1, 0.5, 0),
    edge('e_gemini_tools', 'n_gemini', 'n_mcp_tools', '9. Invoke Tools', '#F59E0B', 0),
    edge('e_tools_ext', 'n_mcp_tools', 'n_ext', 'Query ERP/CRM', '#F59E0B', 1, 0.5, 1, 0.5, 0, [[987, 525], [1157, 525]]),
    edge('e_tools_armor', 'n_mcp_tools', 'n_armor_ai', '10. Check Safety', '#10B981', 0),
    edge('e_armor_conf', 'n_armor_ai', 'd_conf', 'Evaluate Confidence', '#F59E0B', 0, 0.5, 0, 0.5, 1, [[1175, 395], [955, 395]]),
    edge('e_conf_hitl', 'd_conf', 'n_hitl', 'Score &lt; 90% (HITL)', '#EF4444', 0),
    edge('e_conf_resp', 'd_conf', 'ch_resp', '11. Stream Response', '#10B981', 0, 0.5, 0, 0.5, 1, [[955, 140], [1190, 140]]),
    edge('e_orch_log', 'n_orch', 'n_logging', '12. Audit &amp; Metrics', '#10B981', 1, 0.5, 0.5, 0, [[422, 750], [650, 750]]),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:20:00.000Z" agent="PromptCanvas Blueprint 61" version="24.7.17" type="device"><diagram id="catalog_enterprise_ai_document_assistant" name="Blueprint 61 - Enterprise AI Document Assistant"><mxGraphModel dx="1900" dy="1300" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="1" pageScale="1" pageWidth="1900" pageHeight="1300" background="#0B111E"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
