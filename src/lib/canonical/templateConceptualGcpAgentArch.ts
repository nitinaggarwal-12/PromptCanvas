/**
 * Canonical Blueprint: Google Cloud Multi-Agent Conceptual Architecture
 *
 * 1:1 pixel-accurate reproduction of the Multi-Agent Conceptual Architecture:
 * - Left Pillar: ENTERPRISE GOVERNANCE & OPERATIONS (IAM/RBAC, Audit Logging, Model Performance AgentOps, Billing & FinOps)
 * - Layer 1: OMNICHANNEL CLIENT EXPERIENCE (Web & Mobile, Conversational AI, Customer Service Portals, API & Partner Gateways)
 * - Layer 2: AI TRUST & SECURITY PERIMETER (Zero-Trust Auth, API Gateway, Model Guardrails DLP/PII, Compliance & Safety Firewall)
 * - Layer 3: INTELLIGENT MULTI-AGENT ORCHESTRATION ENGINE (Agentic Orchestration Plane, Orchestration & Supervisor Agent, Accounts Agent, Transactions Agent, Inquiries & Support Agent, Operations Agent)
 * - Layer 4: FOUNDATION MODELS & KNOWLEDGE RETRIEVAL (LLMs & SLMs, Semantic Search & Vector DBs, Domain Knowledge Graphs)
 * - Layer 5: CORE ENTERPRISE BANKING SERVICES (Transaction Processing, Account Management, Loan & Credit, Risk & Fraud, Payment Gateways, Customer Data/CRM)
 */

function escAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const CONCEPT_ICONS = {
  iam: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="7" r="4" stroke="#1E293B" stroke-width="1.8"/><path d="M2 21V19C2 16.7909 3.79086 15 6 15H12C14.2091 15 16 16.7909 16 19V21" stroke="#1E293B" stroke-width="1.8"/><circle cx="17" cy="11" r="3" stroke="#2563EB" stroke-width="1.8"/><path d="M19 13L22 16M22 16L20 18M22 16L21 14" stroke="#2563EB" stroke-width="1.8"/></svg>`,
  audit: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#1E293B" stroke-width="1.8"/><path d="M14 2V8H20" stroke="#1E293B" stroke-width="1.8"/><path d="M8 13H16M8 17H13" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  agentOps: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#1E293B" stroke-width="1.8"/><path d="M12 12L16 8M12 12V6M12 12H6" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#2563EB"/></svg>`,
  finOps: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="8" ry="2.5" stroke="#1E293B" stroke-width="1.8"/><path d="M4 5V10C4 11.38 7.58 12.5 12 12.5C16.42 12.5 20 11.38 20 10V5" stroke="#1E293B" stroke-width="1.8"/><path d="M4 10V15C4 16.38 7.58 17.5 12 17.5C16.42 17.5 20 16.38 20 15V10" stroke="#1E293B" stroke-width="1.8"/><path d="M4 15V19C4 20.38 7.58 21.5 12 21.5C16.42 21.5 20 20.38 20 19V15" stroke="#1E293B" stroke-width="1.8"/></svg>`,
  webMobile: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="14" height="11" rx="2" stroke="#1E293B" stroke-width="1.8"/><path d="M6 18H12M2 14H16" stroke="#1E293B" stroke-width="1.8"/><rect x="15" y="8" width="7" height="13" rx="1.5" stroke="#2563EB" stroke-width="1.8"/><circle cx="18.5" cy="18.5" r="0.8" fill="#2563EB"/></svg>`,
  chat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#1E293B" stroke-width="1.8"/></svg>`,
  support: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 18V12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12V18" stroke="#1E293B" stroke-width="1.8"/><path d="M21 15V19C21 20.1 20.1 21 19 21H18V15H21Z" fill="#DBEAFE" stroke="#1E293B" stroke-width="1.8"/><path d="M3 15V19C3 20.1 3.9 21 5 21H6V15H3Z" fill="#DBEAFE" stroke="#1E293B" stroke-width="1.8"/><path d="M12 21H16" stroke="#2563EB" stroke-width="1.8"/></svg>`,
  apiGateway: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="#1E293B" stroke-width="1.8"/><path d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20.1 17.45A2 2 0 1 1 17.45 20.1L16.82 19.73A1.65 1.65 0 0 0 15 19.4V20A2 2 0 1 1 11 20V19.4A1.65 1.65 0 0 0 9.18 19.73L8.55 20.1A2 2 0 1 1 5.9 17.45L6.27 16.82A1.65 1.65 0 0 0 5.94 15H5.4A2 2 0 1 1 5.4 11H5.94A1.65 1.65 0 0 0 6.27 9.18L5.9 8.55A2 2 0 1 1 8.55 5.9L9.18 6.27A1.65 1.65 0 0 0 11 5.94V5.4A2 2 0 1 1 15 5.4V5.94A1.65 1.65 0 0 0 16.82 5.9L17.45 5.9A2 2 0 1 1 20.1 8.55L19.73 9.18A1.65 1.65 0 0 0 20.06 11H20.6A2 2 0 1 1 20.6 15H19.4Z" stroke="#2563EB" stroke-width="1.5"/></svg>`,
  lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#1E293B" stroke-width="1.8"/><path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="#1E293B" stroke-width="1.8"/><circle cx="12" cy="16" r="1.5" fill="#2563EB"/></svg>`,
  traffic: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7L3 12L8 17M16 7L21 12L16 17M14 4L10 20" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shieldGuard: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#1E293B" stroke-width="1.8"/><path d="M9 12L11 14L15 10" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shieldFirewall: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#1E293B" stroke-width="1.8"/><circle cx="12" cy="11" r="3" stroke="#DC2626" stroke-width="1.8"/><path d="M12 17V17.01" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></svg>`,
  supervisorAgent: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="7" r="4" stroke="#15803D" stroke-width="2"/><path d="M4 21V19C4 16.7909 5.79086 15 8 15H16C18.2091 15 20 16.7909 20 19V21" stroke="#15803D" stroke-width="2"/><path d="M12 11V14M10 14H14" stroke="#16A34A" stroke-width="1.8"/></svg>`,
  agentUser: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="#15803D" stroke-width="1.8"/><path d="M5 20V18C5 15.8 6.8 14 9 14H15C17.2 14 19 15.8 19 18V20" stroke="#15803D" stroke-width="1.8"/></svg>`,
  syncCurrency: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 2V6H17.5M2.5 22V18H6.5" stroke="#15803D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 15.5C19.3 17.5 17.8 19.2 15.8 20.2C13.8 21.2 11.5 21.3 9.4 20.5C7.3 19.7 5.6 18.1 4.6 16.1C3.6 14.1 3.5 11.8 4.3 9.7M4 8.5C4.7 6.5 6.2 4.8 8.2 3.8C10.2 2.8 12.5 2.7 14.6 3.5C16.7 4.3 18.4 5.9 19.4 7.9C20.4 9.9 20.5 12.2 19.7 14.3" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#16A34A"/></svg>`,
  questionSupport: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.5 6.8 19.7L3 21L4.3 17.2C3.5 15.8 3 14.2 3 12.5C3 7.25 7.25 3 12.5 3C17.75 3 21 7.25 21 12.5V11.5Z" stroke="#15803D" stroke-width="1.8"/><path d="M12 8C11.1 8 10.5 8.5 10.5 9.3C10.5 10.4 12 10.7 12 11.8V12M12 15V15.01" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  gears: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="#15803D" stroke-width="1.8"/><path d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20.1 17.45A2 2 0 1 1 17.45 20.1L16.82 19.73A1.65 1.65 0 0 0 15 19.4V20A2 2 0 1 1 11 20V19.4A1.65 1.65 0 0 0 9.18 19.73L8.55 20.1A2 2 0 1 1 5.9 17.45L6.27 16.82A1.65 1.65 0 0 0 5.94 15H5.4A2 2 0 1 1 5.4 11H5.94A1.65 1.65 0 0 0 6.27 9.18L5.9 8.55A2 2 0 1 1 8.55 5.9L9.18 6.27A1.65 1.65 0 0 0 11 5.94V5.4A2 2 0 1 1 15 5.4V5.94A1.65 1.65 0 0 0 16.82 5.9L17.45 5.9A2 2 0 1 1 20.1 8.55L19.73 9.18A1.65 1.65 0 0 0 20.06 11H20.6A2 2 0 1 1 20.6 15H19.4Z" stroke="#15803D" stroke-width="1.5"/></svg>`,
  llmModel: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="#D97706" stroke-width="1.8"/><path d="M12 4C12 8 8 12 4 12C8 12 12 16 12 20C12 16 16 12 20 12C16 12 12 8 12 4Z" fill="#FBBF24"/></svg>`,
  searchVector: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#EA580C" stroke-width="1.8"/><path d="M16 16L21 21" stroke="#EA580C" stroke-width="2" stroke-linecap="round"/><circle cx="11" cy="11" r="3" stroke="#F97316" stroke-width="1.5"/></svg>`,
  graphSearch: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="6" stroke="#0284C7" stroke-width="1.8"/><path d="M15 15L20 20" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="8" r="1.5" fill="#0284C7"/><circle cx="12" cy="9" r="1.5" fill="#0284C7"/><circle cx="9" cy="12" r="1.5" fill="#0284C7"/><path d="M8 8L12 9M8 8L9 12M12 9L9 12" stroke="#0284C7" stroke-width="1.2"/></svg>`,
  txProcessing: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4H20M20 4L16 8M20 4L16 0.5M16 20H4M4 20L8 16M4 20L8 23.5" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  wallet: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" stroke="#1E293B" stroke-width="1.8"/><path d="M16 3H4C2.9 3 2 3.9 2 5V7H18V5C18 3.9 17.1 3 16 3Z" stroke="#1E293B" stroke-width="1.8"/><circle cx="17" cy="14" r="1.5" fill="#2563EB"/></svg>`,
  loanCredit: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 14C19 18 16 21 12 21C8 21 5 18 5 14C5 10 9 6 12 3C15 6 19 10 19 14Z" stroke="#1E293B" stroke-width="1.8"/><circle cx="12" cy="14" r="3" stroke="#2563EB" stroke-width="1.5"/><path d="M12 12.5V15.5M10.5 14H13.5" stroke="#2563EB" stroke-width="1.5"/></svg>`,
  riskFraud: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#1E293B" stroke-width="1.8"/><path d="M9 12L11 14L15 10" stroke="#16A34A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  paymentGateway: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#1E293B" stroke-width="1.8"/><path d="M2 10H22M6 15H10" stroke="#1E293B" stroke-width="1.8"/></svg>`,
  crmUsers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9 16.1 17 15 17H5C3.9 17 3 17.9 3 19V21" stroke="#1E293B" stroke-width="1.8"/><circle cx="10" cy="9" r="4" stroke="#1E293B" stroke-width="1.8"/><path d="M23 21V19C22.99 18.1 22.7 17.25 22.16 16.55C21.6 15.85 20.85 15.35 20 15.13" stroke="#2563EB" stroke-width="1.8"/><path d="M16 3.13C16.86 3.35 17.61 3.85 18.16 4.55C18.7 5.25 18.99 6.1 19 7C18.99 7.9 18.7 8.75 18.16 9.45C17.61 10.15 16.86 10.65 16 10.87" stroke="#2563EB" stroke-width="1.8"/></svg>`
};

export interface ConceptualGcpAgentArchOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  theme?: 'light' | 'dark';
}

export function generateConceptualGcpAgentArchitectureXml(
  options?: ConceptualGcpAgentArchOptions | string,
  themeArg: 'light' | 'dark' = 'light'
): string {
  const opts: ConceptualGcpAgentArchOptions =
    typeof options === 'string'
      ? { domain: options, theme: themeArg }
      : options || { theme: themeArg };

  const isLight = opts.theme !== 'dark';

  const canvasBg = isLight ? '#FFFFFF' : '#0F172A';
  const textDark = isLight ? '#0F172A' : '#F8FAFC';
  const textSub = isLight ? '#475569' : '#94A3B8';
  const borderGrey = isLight ? '#CBD5E1' : '#475569';
  const cardBg = isLight ? '#FFFFFF' : '#1E293B';
  const edgeStroke = isLight ? '#334155' : '#93C5FD';

  // Layer fills
  const layer1Bg = isLight ? '#E0F2FE' : '#0C2D48'; // Omnichannel Client Experience
  const layer1Border = isLight ? '#7DD3FC' : '#0284C7';

  const layer2Bg = isLight ? '#BAE6FD' : '#075985'; // AI Trust & Security Perimeter
  const layer2Border = isLight ? '#38BDF8' : '#0284C7';

  const layer3Bg = isLight ? '#DCFCE7' : '#064E3B'; // Intelligent Multi-Agent Orchestration
  const layer3Border = isLight ? '#86EFAC' : '#059669';

  const layer4Bg = isLight ? '#FEF3C7' : '#451A03'; // Foundation Models & Retrieval
  const layer4Border = isLight ? '#FDE68A' : '#D97706';

  const layer5Bg = isLight ? '#F1F5F9' : '#1E293B'; // Core Enterprise Banking
  const layer5Border = isLight ? '#CBD5E1' : '#64748B';

  const pillarBg = isLight ? '#F1F5F9' : '#1E293B';

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="PromptCanvas" version="24.0.0">
  <diagram name="Enterprise Multi-Agent Conceptual Architecture" id="conceptual_gcp_agent_arch">
    <mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1370" pageHeight="860" background="${canvasBg}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================================================================== -->
        <!-- LEFT PILLAR: ENTERPRISE GOVERNANCE & OPERATIONS                      -->
        <!-- ==================================================================== -->
        <!-- Outer Frame -->
        <mxCell id="pillar_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${pillarBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="30" width="205" height="820" as="geometry" />
        </mxCell>

        <!-- Vertical Header Bar -->
        <mxCell id="pillar_header" value="&lt;div style=&quot;writing-mode:vertical-rl;transform:rotate(180deg);font-family:Inter,sans-serif;font-size:12px;font-weight:800;color:${textDark};letter-spacing:2px;text-align:center;width:100%;height:100%;display:flex;align-items:center;justify-content:center;&quot;&gt;ENTERPRISE GOVERNANCE &amp;amp; OPERATIONS&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="32" y="30" width="36" height="820" as="geometry" />
        </mxCell>

        <!-- Card 1: Identity & Access Management -->
        <mxCell id="gov_iam" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:38px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.iam)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;Identity &amp;amp; Access&lt;br&gt;Management&lt;br&gt;(IAM / RBAC)&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="72" y="45" width="150" height="175" as="geometry" />
        </mxCell>

        <!-- Card 2: Audit Logging & Observability -->
        <mxCell id="gov_audit" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:38px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.audit)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;Audit&lt;br&gt;Logging &amp;amp;&lt;br&gt;Observability&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="72" y="240" width="150" height="175" as="geometry" />
        </mxCell>

        <!-- Card 3: Model Performance & Evaluation (AgentOps) -->
        <mxCell id="gov_agentops" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:38px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.agentOps)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;Model&lt;br&gt;Performance&lt;br&gt;&amp;amp; Evaluation&lt;br&gt;(AgentOps)&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="72" y="435" width="150" height="190" as="geometry" />
        </mxCell>

        <!-- Card 4: Billing & FinOps Tracking -->
        <mxCell id="gov_finops" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:38px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.finOps)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;Billing &amp;amp;&lt;br&gt;FinOps&lt;br&gt;Tracking&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="72" y="645" width="150" height="190" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- LAYER 1: OMNICHANNEL CLIENT EXPERIENCE                               -->
        <!-- ==================================================================== -->
        <mxCell id="layer1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${layer1Bg};strokeColor=${layer1Border};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="270" y="30" width="1090" height="115" as="geometry" />
        </mxCell>
        <!-- Title Box -->
        <mxCell id="layer1_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;OMNICHANNEL&lt;br&gt;CLIENT&lt;br&gt;EXPERIENCE&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="280" y="42" width="160" height="85" as="geometry" />
        </mxCell>

        <!-- Card 1.1: Web & Mobile Apps -->
        <mxCell id="c_web_mobile" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.webMobile)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};&quot;&gt;Web &amp;amp; Mobile Apps&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="48" width="215" height="75" as="geometry" />
        </mxCell>

        <!-- Card 1.2: Conversational AI / Chatbots -->
        <mxCell id="c_chatbots" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.chat)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Conversational AI&lt;br&gt;/ Chatbots&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="685" y="48" width="215" height="75" as="geometry" />
        </mxCell>

        <!-- Card 1.3: Customer Service Portals -->
        <mxCell id="c_portals" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.support)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Customer Service&lt;br&gt;Portals&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="915" y="48" width="215" height="75" as="geometry" />
        </mxCell>

        <!-- Card 1.4: API & Partner Gateways -->
        <mxCell id="c_partner_gateways" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.apiGateway)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;API &amp;amp; Partner&lt;br&gt;Gateways&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1145" y="48" width="205" height="75" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- LAYER 2: AI TRUST & SECURITY PERIMETER                               -->
        <!-- ==================================================================== -->
        <mxCell id="layer2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${layer2Bg};strokeColor=${layer2Border};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="270" y="160" width="1090" height="130" as="geometry" />
        </mxCell>
        <!-- Title Box -->
        <mxCell id="layer2_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;AI TRUST &amp;amp;&lt;br&gt;SECURITY&lt;br&gt;PERIMETER&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="280" y="175" width="160" height="95" as="geometry" />
        </mxCell>

        <!-- Ingestion / protective barrier bar -->
        <mxCell id="c_ingestion_bar" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:${textDark};text-align:center;&quot;&gt;Ingestion/protective barrier&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="455" y="170" width="895" height="24" as="geometry" />
        </mxCell>

        <!-- Card 2.1: Zero-Trust Auth -->
        <mxCell id="c_zero_trust" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.lock)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Zero-Trust&lt;br&gt;Authentication&lt;br&gt;&lt;span style=&quot;font-weight:500;color:${textSub};&quot;&gt;(OAuth/IDP)&lt;/span&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="202" width="215" height="76" as="geometry" />
        </mxCell>

        <!-- Card 2.2: API Gateway & Traffic -->
        <mxCell id="c_traffic_mgmt" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.traffic)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;API Gateway &amp;amp;&lt;br&gt;Traffic Management&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="685" y="202" width="215" height="76" as="geometry" />
        </mxCell>

        <!-- Card 2.3: Model Guardrails -->
        <mxCell id="c_guardrails" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.shieldGuard)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Model Guardrails&lt;br&gt;&lt;span style=&quot;font-weight:500;color:${textSub};&quot;&gt;(DLP, PII Masking)&lt;/span&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="915" y="202" width="215" height="76" as="geometry" />
        </mxCell>

        <!-- Card 2.4: Compliance & Safety Firewall -->
        <mxCell id="c_safety_firewall" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.shieldFirewall)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Compliance &amp;amp;&lt;br&gt;Safety Firewall&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1145" y="202" width="205" height="76" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- LAYER 3: INTELLIGENT MULTI-AGENT ORCHESTRATION ENGINE                 -->
        <!-- ==================================================================== -->
        <mxCell id="layer3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${layer3Bg};strokeColor=${layer3Border};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="270" y="305" width="1090" height="255" as="geometry" />
        </mxCell>
        <!-- Title Box -->
        <mxCell id="layer3_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;INTELLIGENT&lt;br&gt;MULTI-AGENT&lt;br&gt;ORCHESTRATION&lt;br&gt;ENGINE&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="280" y="375" width="160" height="120" as="geometry" />
        </mxCell>

        <!-- Dashed Inner Container: Agentic Orchestration Plane (AI Cluster) -->
        <mxCell id="agentic_plane" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;dashed=1;dashPattern=6 4;fillColor=none;strokeColor=#15803D;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="320" width="895" height="225" as="geometry" />
        </mxCell>
        <mxCell id="agentic_plane_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;Agentic Orchestration Plane (AI Cluster)&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=top;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="680" y="328" width="450" height="20" as="geometry" />
        </mxCell>

        <!-- Orchestration & Supervisor Agent -->
        <mxCell id="c_supervisor" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.supervisorAgent)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};&quot;&gt;Orchestration &amp;amp; Supervisor Agent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="715" y="355" width="375" height="52" as="geometry" />
        </mxCell>

        <!-- Domain Agent 1: Accounts Agent -->
        <mxCell id="c_accounts_agent" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.agentUser)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Accounts&lt;br&gt;Agent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="470" y="460" width="205" height="65" as="geometry" />
        </mxCell>

        <!-- Domain Agent 2: Transactions Agent -->
        <mxCell id="c_transactions_agent" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.syncCurrency)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Transactions&lt;br&gt;Agent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="695" y="460" width="205" height="65" as="geometry" />
        </mxCell>

        <!-- Domain Agent 3: Inquiries & Support Agent -->
        <mxCell id="c_inquiries_agent" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.questionSupport)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Inquiries &amp;amp;&lt;br&gt;Support Agent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="920" y="460" width="205" height="65" as="geometry" />
        </mxCell>

        <!-- Domain Agent 4: Operations Agent -->
        <mxCell id="c_operations_agent" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:30px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.gears)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Operations&lt;br&gt;Agent&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="1145" y="460" width="195" height="65" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- LAYER 4: FOUNDATION MODELS & KNOWLEDGE RETRIEVAL                     -->
        <!-- ==================================================================== -->
        <mxCell id="layer4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${layer4Bg};strokeColor=${layer4Border};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="270" y="575" width="1090" height="105" as="geometry" />
        </mxCell>
        <!-- Title Box -->
        <mxCell id="layer4_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;FOUNDATION&lt;br&gt;MODELS &amp;amp;&lt;br&gt;KNOWLEDGE&lt;br&gt;RETRIEVAL&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="280" y="585" width="160" height="85" as="geometry" />
        </mxCell>

        <!-- Card 4.1: LLMs & SLMs Foundation Models -->
        <mxCell id="c_llms" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.llmModel)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;LLMs &amp;amp; SLMs&lt;br&gt;Foundation Models&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#FEF08A;strokeColor=#D97706;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="455" y="588" width="290" height="78" as="geometry" />
        </mxCell>

        <!-- Card 4.2: Semantic Search & Vector Databases -->
        <mxCell id="c_semantic_search" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.searchVector)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;Semantic Search &amp;amp;&lt;br&gt;Vector Databases&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#FFEDD5;strokeColor=#F97316;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="760" y="588" width="290" height="78" as="geometry" />
        </mxCell>

        <!-- Card 4.3: Domain Knowledge Graphs / Enterprise Search -->
        <mxCell id="c_knowledge_graphs" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:34px;text-align:center;&quot;&gt;${escAttr(CONCEPT_ICONS.graphSearch)}&lt;/td&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};line-height:1.25;&quot;&gt;Domain Knowledge Graphs /&lt;br&gt;Enterprise Search&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.8;" vertex="1" parent="1">
          <mxGeometry x="1065" y="588" width="285" height="78" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- LAYER 5: CORE ENTERPRISE BANKING SERVICES                            -->
        <!-- ==================================================================== -->
        <mxCell id="layer5_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;arcSize=6;fillColor=${layer5Bg};strokeColor=${layer5Border};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="270" y="695" width="1090" height="155" as="geometry" />
        </mxCell>
        <!-- Title Box -->
        <mxCell id="layer5_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:800;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;CORE&lt;br&gt;ENTERPRISE&lt;br&gt;BANKING&lt;br&gt;SERVICES&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="280" y="725" width="160" height="95" as="geometry" />
        </mxCell>

        <!-- 6 Banking Cards -->
        <mxCell id="b_tx" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:36px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.txProcessing)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Transaction&lt;br&gt;Processing&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="715" width="138" height="115" as="geometry" />
        </mxCell>

        <mxCell id="b_acc" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:36px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.wallet)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Account&lt;br&gt;Management&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="605" y="715" width="138" height="115" as="geometry" />
        </mxCell>

        <mxCell id="b_loan" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:36px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.loanCredit)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Loan &amp;amp; Credit&lt;br&gt;Services&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="755" y="715" width="138" height="115" as="geometry" />
        </mxCell>

        <mxCell id="b_risk" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:36px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.riskFraud)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Risk &amp;amp; Fraud&lt;br&gt;Detection&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="905" y="715" width="138" height="115" as="geometry" />
        </mxCell>

        <mxCell id="b_pay" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:36px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.paymentGateway)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Payment&lt;br&gt;Gateways&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1055" y="715" width="138" height="115" as="geometry" />
        </mxCell>

        <mxCell id="b_crm" value="&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;height:36px;vertical-align:bottom;&quot;&gt;${escAttr(CONCEPT_ICONS.crmUsers)}&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;padding-top:6px;&quot;&gt;&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};line-height:1.2;&quot;&gt;Customer&lt;br&gt;Data / CRM&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=14;fillColor=${cardBg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1205" y="715" width="145" height="115" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- CONNECTORS & FLOW EDGES                                              -->
        <!-- ==================================================================== -->
        <!-- Governance Pillar Bidirectional Connections -->
        <mxCell id="e_gov_to_sec" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="pillar_frame" target="layer2_bg">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="250" y="225" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_gov_to_orch" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="pillar_frame" target="layer3_bg">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="250" y="432" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_gov_to_core" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="pillar_frame" target="layer5_bg">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="250" y="772" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Layer 1 -> Layer 2 Downward Arrows -->
        <mxCell id="e_l1_to_l2_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_web_mobile" target="c_zero_trust">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_l1_to_l2_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_chatbots" target="c_traffic_mgmt">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_l1_to_l2_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_portals" target="c_guardrails">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_l1_to_l2_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_partner_gateways" target="c_safety_firewall">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Layer 2 -> Layer 3 Connection & Annotation -->
        <mxCell id="e_l2_to_l3_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_zero_trust" target="agentic_plane">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_l2_to_l3_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_traffic_mgmt" target="c_supervisor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_l2_to_l3_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_safety_firewall" target="agentic_plane">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Ongoing connection annotation -->
        <mxCell id="annot_ongoing" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:600;color:${textDark};&quot;&gt;↕ On-going connections to the agent&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="860" y="292" width="280" height="20" as="geometry" />
        </mxCell>

        <!-- Supervisor Agent -> Delegation to Domain Agents -->
        <mxCell id="e_super_to_acc" value="Delegation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;labelBackgroundColor=none;fontFamily=Inter,sans-serif;fontSize=11;fontStyle=1;fontColor=${textDark};" edge="1" parent="1" source="c_supervisor" target="c_accounts_agent">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="790" y="430" />
              <mxPoint x="572" y="430" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_super_to_tx" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_supervisor" target="c_transactions_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e_super_to_inq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_supervisor" target="c_inquiries_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e_super_to_ops" value="Delegation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;labelBackgroundColor=none;fontFamily=Inter,sans-serif;fontSize=11;fontStyle=1;fontColor=${textDark};" edge="1" parent="1" source="c_supervisor" target="c_operations_agent">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1010" y="430" />
              <mxPoint x="1242" y="430" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Accounts Agent -> LLMs & SLMs -->
        <mxCell id="e_acc_to_llm" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_accounts_agent" target="c_llms">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Transactions Agent -> LLMs & Semantic Search -->
        <mxCell id="e_tx_to_llm" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_transactions_agent" target="c_llms">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="770" y="555" />
              <mxPoint x="640" y="555" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_tx_to_search" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_transactions_agent" target="c_semantic_search">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="825" y="555" />
              <mxPoint x="880" y="555" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Inquiries Agent -> Semantic Search -->
        <mxCell id="e_inq_to_search" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="c_inquiries_agent" target="c_semantic_search">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Operations Agent <-> Knowledge Graphs -->
        <mxCell id="e_ops_to_graphs" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="c_operations_agent" target="c_knowledge_graphs">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
