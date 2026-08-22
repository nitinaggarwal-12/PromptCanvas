export interface CanonicalTemplate {
  id: string; // e.g. "01", "02" ... "34"
  name: string;
  family: 'Understand' | 'Process' | 'Structure' | 'Flow' | 'Infrastructure' | 'Security & Governance' | 'Delivery & Operations' | 'Analysis & Planning';
  level: 'L1' | 'L2' | 'L3' | 'L1/L2' | 'L2/L3' | 'L1/L2/L3';
  primaryPurpose: string;
  examples: string;
  defaultDomain: string;
  previewImage?: string;
  keyComponents: string[];
  generateXml: (domainFlavor?: string, theme?: 'light' | 'dark') => string;
}

export const CANONICAL_FAMILIES = [
  'All',
  'Understand',
  'Process',
  'Structure',
  'Flow',
  'Infrastructure',
  'Security & Governance',
  'Delivery & Operations',
  'Analysis & Planning',
] as const;

export const DOMAIN_PRESETS = [
  { id: 'biopharma', name: 'Bio-Pharma Precision Oncology & Regulatory AI', prefix: 'NOVACURA' },
  { id: 'fintech', name: 'FinTech Autonomous Wealth & High-Speed Payments', prefix: 'NEXUSFIN' },
  { id: 'manufacturing', name: 'Smart Manufacturing & Industrial IoT Digital Twin', prefix: 'SYNACTIVE' },
  { id: 'retail', name: 'Omnichannel Retail & Intelligent Supply Chain', prefix: 'OMNIVUE' },
  { id: 'saas', name: 'Enterprise SaaS Multi-Tenant Cloud Platform', prefix: 'AETHER' },
];

/**
 * High-Fidelity 1:1 XML Generator for Template 01: System Context
 * Matches the NOVACURA Bio-Pharma Platform Architecture from Canonical PDF Page 1
 */
export function generateSystemContextXml(domainFlavor = 'biopharma', theme: 'light' | 'dark' = 'light'): string {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0B111E' : '#F8FAFC';
  const cardFill = isDark ? '#0F172A' : '#FFFFFF';
  const cardStroke = isDark ? '#1E293B' : '#CBD5E1';
  const textMain = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';
  const coreFill = isDark ? '#1E293B' : '#EFF6FF';
  const coreStroke = isDark ? '#3B82F6' : '#2563EB';
  const accentNavy = isDark ? '#182338' : '#1E3A8A';
  const arrowColor = isDark ? '#60A5FA' : '#2563EB';

  const isBio = domainFlavor.toLowerCase().includes('bio') || domainFlavor === 'biopharma';
  const isFin = domainFlavor.toLowerCase().includes('fin');
  
  const platformName = isBio ? 'NOVACURA' : isFin ? 'NEXUSFIN' : 'ENTERPRISE';
  const subtitle = isBio ? 'Bio-Pharma Regulatory AI Platform' : isFin ? 'Autonomous Wealth & Real-Time Payments Platform' : 'System Context Platform';

  return `<mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1700" pageHeight="1000" background="${bg}">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- TOP HEADER -->
    <mxCell id="hdr_main" value="01 — System Context | ${platformName} Platform&#xa;${subtitle}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=20;fontStyle=1;fontColor=${textMain};fontFamily=Inter,sans-serif;" vertex="1" parent="1">
      <mxGeometry x="40" y="25" width="850" height="45" as="geometry" />
    </mxCell>
    <mxCell id="hdr_badge" value="CANONICAL TEMPLATE 01 &bull; LEVEL 1 SYSTEM CONTEXT &bull; BOUNDARY &bull; ACTORS &bull; ECOSYSTEM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${accentNavy};strokeColor=none;fontColor=#FFFFFF;fontStyle=1;fontSize=10;spacingLeft=10;spacingRight=10;" vertex="1" parent="1">
      <mxGeometry x="1000" y="28" width="620" height="32" as="geometry" />
    </mxCell>

    <!-- TOP GOVERNANCE & OVERSIGHT POD -->
    <mxCell id="gov_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};shadow=1;" vertex="1" parent="1">
      <mxGeometry x="420" y="85" width="840" height="75" as="geometry" />
    </mxCell>
    <mxCell id="gov_hdr" value="Governance &amp; Executive Oversight" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=${textMuted};" vertex="1" parent="1">
      <mxGeometry x="720" y="88" width="240" height="18" as="geometry" />
    </mxCell>
    <mxCell id="gov_1" value="&lt;b&gt;Executive Leadership&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Strategic Direction &bull; Portfolios&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="440" y="110" width="240" height="42" as="geometry" />
    </mxCell>
    <mxCell id="gov_2" value="&lt;b&gt;Compliance &amp; Legal&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;GxP &bull; 21 CFR Part 11 &bull; Risk Mgmt&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="720" y="110" width="240" height="42" as="geometry" />
    </mxCell>
    <mxCell id="gov_3" value="&lt;b&gt;Data Governance Board&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Data Standards &bull; Mesh Quality&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="1000" y="110" width="240" height="42" as="geometry" />
    </mxCell>

    <!-- LEFT COLUMN: INTERNAL BUSINESS USERS & ACTORS -->
    <mxCell id="left_users_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};shadow=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="180" width="280" height="520" as="geometry" />
    </mxCell>
    <mxCell id="left_users_hdr" value="Internal Business Users &amp; Roles" style="text;html=1;strokeColor=none;fillColor=none;align=left;fontSize=13;fontStyle=1;fontColor=${textMain};spacingLeft=8;" vertex="1" parent="1">
      <mxGeometry x="50" y="190" width="260" height="24" as="geometry" />
    </mxCell>
    <mxCell id="u1" value="&lt;b&gt;Research Scientists&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Design studies, analyze molecular data&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="225" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u2" value="&lt;b&gt;Clinical Operations&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Run clinical trials, monitor patient sites&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="285" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u3" value="&lt;b&gt;Regulatory Affairs Team&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Prepare FDA/EMA submissions &amp; variations&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="345" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u4" value="&lt;b&gt;Safety &amp; Pharmacovigilance&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Detect adverse events &amp; safety signals&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="405" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u5" value="&lt;b&gt;Quality Assurance (QA)&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Manage quality events, CAPA, audits&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="465" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u6" value="&lt;b&gt;Medical Affairs&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Respond to medical inquiries &amp; evidence&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="525" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u7" value="&lt;b&gt;Commercial Analytics&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Market insights, pricing &amp; forecasts&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="585" width="250" height="52" as="geometry" />
    </mxCell>
    <mxCell id="u8" value="&lt;b&gt;Platform &amp; SecOps Admins&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Identity, CMEK, audit &amp; observability&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="55" y="643" width="250" height="48" as="geometry" />
    </mxCell>

    <!-- CENTER BOX: SYSTEM BOUNDARY -->
    <mxCell id="center_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${coreFill};strokeColor=${coreStroke};strokeWidth=2;shadow=1;" vertex="1" parent="1">
      <mxGeometry x="380" y="180" width="920" height="520" as="geometry" />
    </mxCell>
    <mxCell id="boundary_title" value="&lt;b style='font-size:16px;'&gt;${platformName} PLATFORM BOUNDARY&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Core Digital Architecture &bull; GxP / 21 CFR Part 11 Compliant &bull; Unified Enterprise AI Hub&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;whiteSpace=wrap;rounded=0;fontSize=13;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="450" y="195" width="780" height="40" as="geometry" />
    </mxCell>

    <!-- CORE CAPABILITY MODULES INSIDE BOUNDARY (8 PODS) -->
    <mxCell id="pod_1" value="&lt;b&gt;R&amp;D &amp; Clinical Intelligence&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Program Management&lt;br&gt;&bull; Protocols &amp; Studies&lt;br&gt;&bull; Trial Oversight&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="410" y="250" width="205" height="95" as="geometry" />
    </mxCell>
    <mxCell id="pod_2" value="&lt;b&gt;Regulatory Affairs Engine&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Submissions Dossiers&lt;br&gt;&bull; Health Authority Tracking&lt;br&gt;&bull; Variations &amp; Commitments&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="630" y="250" width="205" height="95" as="geometry" />
    </mxCell>
    <mxCell id="pod_3" value="&lt;b&gt;Pharmacovigilance &amp; Safety&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Case Intake &amp; Triage&lt;br&gt;&bull; Signal Detection AI&lt;br&gt;&bull; Benefit-Risk Assessment&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="850" y="250" width="205" height="95" as="geometry" />
    </mxCell>
    <mxCell id="pod_4" value="&lt;b&gt;Quality &amp; Manufacturing&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Quality Events &amp; QMS&lt;br&gt;&bull; CAPA &amp; Change Control&lt;br&gt;&bull; Batch Release Analytics&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="1070" y="250" width="205" height="95" as="geometry" />
    </mxCell>

    <mxCell id="pod_5" value="&lt;b&gt;Medical Information Hub&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Inquiry Management&lt;br&gt;&bull; Medical Content Vault&lt;br&gt;&bull; Real-World Evidence&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="410" y="360" width="205" height="95" as="geometry" />
    </mxCell>
    <mxCell id="pod_6" value="&lt;b&gt;Commercial Insights&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Market Analytics&lt;br&gt;&bull; Forecasting Models&lt;br&gt;&bull; Performance KPIs&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="630" y="360" width="205" height="95" as="geometry" />
    </mxCell>
    <mxCell id="pod_7" value="&lt;b&gt;Document &amp; Knowledge Hub&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; ISO GQL Knowledge Graph&lt;br&gt;&bull; Evidence Library&lt;br&gt;&bull; Cross-Functional Search&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="850" y="360" width="205" height="95" as="geometry" />
    </mxCell>
    <mxCell id="pod_8" value="&lt;b&gt;AI Copilot &amp; Orchestrator&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;&bull; Gemini 2.5 Pro ReAct Agents&lt;br&gt;&bull; Workflow Orchestration&lt;br&gt;&bull; Decision Support Gates&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=10;" vertex="1" parent="1">
      <mxGeometry x="1070" y="360" width="205" height="95" as="geometry" />
    </mxCell>

    <!-- CROSS-CUTTING FOUNDATIONS INSIDE CORE -->
    <mxCell id="base_sec" value="&lt;b&gt;Security &amp; Privacy&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;Zero Trust &bull; CMEK&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="410" y="475" width="205" height="45" as="geometry" />
    </mxCell>
    <mxCell id="base_audit" value="&lt;b&gt;Audit &amp; Compliance&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;21 CFR Part 11 &bull; GxP&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="630" y="475" width="205" height="45" as="geometry" />
    </mxCell>
    <mxCell id="base_lineage" value="&lt;b&gt;Data Lineage &amp; Quality&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;Dataplex Lineage &bull; Mesh&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="850" y="475" width="205" height="45" as="geometry" />
    </mxCell>
    <mxCell id="base_interop" value="&lt;b&gt;Interoperability &amp; APIs&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}' style='font-size:10px;'&gt;OpenAPI 3.1 &bull; FHIR &bull; MCP&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="1070" y="475" width="205" height="45" as="geometry" />
    </mxCell>

    <!-- RIGHT COLUMN: EXTERNAL ECOSYSTEM & PARTNERS -->
    <mxCell id="right_ext_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};shadow=1;" vertex="1" parent="1">
      <mxGeometry x="1360" y="180" width="280" height="520" as="geometry" />
    </mxCell>
    <mxCell id="right_ext_hdr" value="External Ecosystem &amp; Partners" style="text;html=1;strokeColor=none;fillColor=none;align=left;fontSize=13;fontStyle=1;fontColor=${textMain};spacingLeft=8;" vertex="1" parent="1">
      <mxGeometry x="1370" y="190" width="260" height="24" as="geometry" />
    </mxCell>
    <mxCell id="e1" value="&lt;b&gt;CRO / CDMO Partners&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Study execution, data interchange, supply partners&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="1375" y="225" width="250" height="68" as="geometry" />
    </mxCell>
    <mxCell id="e2" value="&lt;b&gt;Healthcare Providers / Investigators&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Site collaboration, patient enrollment, study conduct, clinical data&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="1375" y="305" width="250" height="68" as="geometry" />
    </mxCell>
    <mxCell id="e3" value="&lt;b&gt;Regulatory Authorities (FDA, EMA)&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Submissions (eCTD), responses, queries, safety reports, inspections&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="1375" y="385" width="250" height="68" as="geometry" />
    </mxCell>
    <mxCell id="e4" value="&lt;b&gt;Patients / Patient Programs&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Study participation, PROs, support programs, communications&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="1375" y="465" width="250" height="68" as="geometry" />
    </mxCell>
    <mxCell id="e5" value="&lt;b&gt;Commercial &amp; Payers Network&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Market access, reimbursement, claims verification&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="1375" y="545" width="250" height="68" as="geometry" />
    </mxCell>
    <mxCell id="e6" value="&lt;b&gt;Public Scientific Databanks&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;NCBI, PubMed, ClinicalTrials.gov, UniProt&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};align=left;spacingLeft=12;" vertex="1" parent="1">
      <mxGeometry x="1375" y="625" width="250" height="65" as="geometry" />
    </mxCell>

    <!-- BOTTOM ROW: CONNECTED ENTERPRISE SYSTEMS & AI KNOWLEDGE ENGINES -->
    <mxCell id="bot_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};shadow=1;" vertex="1" parent="1">
      <mxGeometry x="40" y="730" width="1600" height="180" as="geometry" />
    </mxCell>
    <mxCell id="bot_hdr_1" value="Enterprise Connected Systems of Record" style="text;html=1;strokeColor=none;fillColor=none;align=left;fontSize=12;fontStyle=1;fontColor=${textMain};spacingLeft=8;" vertex="1" parent="1">
      <mxGeometry x="50" y="738" width="300" height="20" as="geometry" />
    </mxCell>
    <mxCell id="bot_hdr_2" value="AI Knowledge, Graph &amp; Foundation Model Services (Google Cloud)" style="text;html=1;strokeColor=none;fillColor=none;align=left;fontSize=12;fontStyle=1;fontColor=${textMain};spacingLeft=8;" vertex="1" parent="1">
      <mxGeometry x="840" y="738" width="500" height="20" as="geometry" />
    </mxCell>

    <!-- Bottom Left: Systems of Record -->
    <mxCell id="sys_1" value="&lt;b&gt;Veeva Vault&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Regulatory / Quality / Clinical&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="60" y="765" width="140" height="55" as="geometry" />
    </mxCell>
    <mxCell id="sys_2" value="&lt;b&gt;Salesforce Health&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;CRM / HCP / Patient Engagement&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="210" y="765" width="140" height="55" as="geometry" />
    </mxCell>
    <mxCell id="sys_3" value="&lt;b&gt;SAP S/4HANA&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;ERP / Finance / Supply Chain&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="360" y="765" width="140" height="55" as="geometry" />
    </mxCell>
    <mxCell id="sys_4" value="&lt;b&gt;LIMS Systems&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Laboratory Sample Data&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="510" y="765" width="140" height="55" as="geometry" />
    </mxCell>
    <mxCell id="sys_5" value="&lt;b&gt;Safety Database (Argus)&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Adverse Event Cases&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="660" y="765" width="150" height="55" as="geometry" />
    </mxCell>

    <!-- Bottom Right: AI & Cloud Services -->
    <mxCell id="ai_1" value="&lt;b&gt;BigQuery Lakehouse&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Enterprise Analytical Store&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="840" y="765" width="180" height="55" as="geometry" />
    </mxCell>
    <mxCell id="ai_2" value="&lt;b&gt;Spanner Graph (ISO GQL)&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Biomedical Knowledge Graph&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="1030" y="765" width="180" height="55" as="geometry" />
    </mxCell>
    <mxCell id="ai_3" value="&lt;b&gt;Vertex Vector Search&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;ScaNN 768-dim Embeddings&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="1220" y="765" width="180" height="55" as="geometry" />
    </mxCell>
    <mxCell id="ai_4" value="&lt;b&gt;Gemini 2.5 Pro &amp; Flash&lt;/b&gt;&lt;br&gt;&lt;font color='${textMuted}'&gt;Grounded Foundation LLMs&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};fontSize=11;fontColor=${textMain};" vertex="1" parent="1">
      <mxGeometry x="1410" y="765" width="200" height="55" as="geometry" />
    </mxCell>

    <!-- Bottom Meta Protocol Bar -->
    <mxCell id="meta_proto" value="Standard Integration Protocols: REST / HTTPS &bull; GraphQL &bull; gRPC &bull; HL7 FHIR &bull; CDISC / SDTM &bull; SFTP / AS2 &bull; Cloud Pub/Sub &bull; Model Context Protocol (MCP) &bull; A2A Protocol &bull; ISO GQL" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#1E293B' : '#F1F5F9'};strokeColor=${cardStroke};fontSize=10.5;fontStyle=1;fontColor=${textMuted};align=center;" vertex="1" parent="1">
      <mxGeometry x="60" y="840" width="1550" height="42" as="geometry" />
    </mxCell>

    <!-- CONNECTING FLOW ARROWS WITH HIGH CONTRAST PILL LABELS -->
    <!-- Left to Center -->
    <mxCell id="edge_u_to_core" value="1. Secure Role-Based Workflows &amp; APIs" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${arrowColor};strokeWidth=2;fontColor=${isDark ? '#38BDF8' : '#1D4ED8'};fontSize=11;fontStyle=1;labelBackgroundColor=${cardFill};labelBorderColor=${cardStroke};exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="left_users_box" target="center_boundary">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Center to Right -->
    <mxCell id="edge_core_to_ext" value="2. B2B Exchange &amp; Regulatory Submissions (eCTD)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${arrowColor};strokeWidth=2;fontColor=${isDark ? '#38BDF8' : '#1D4ED8'};fontSize=11;fontStyle=1;labelBackgroundColor=${cardFill};labelBorderColor=${cardStroke};exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="center_boundary" target="right_ext_box">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Bottom to Center -->
    <mxCell id="edge_bot_to_core" value="3. CDC Data Replication &amp; Grounded RAG Querying" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${arrowColor};strokeWidth=2;fontColor=${isDark ? '#38BDF8' : '#1D4ED8'};fontSize=11;fontStyle=1;labelBackgroundColor=${cardFill};labelBorderColor=${cardStroke};exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="bot_box" target="center_boundary">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

  </root>
</mxGraphModel>`;
}

export const CANONICAL_TEMPLATES: CanonicalTemplate[] = [
  {
    id: '01',
    name: 'System Context',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'System boundary + internal/external actors + connected ecosystem',
    examples: 'Enterprise App, SaaS Platform, AI Copilot, Life Sciences, Payments',
    defaultDomain: 'Bio-Pharma Precision Oncology & Regulatory AI',
    keyComponents: ['Platform Boundary', 'Internal Actors', 'External Partners', 'Connected Systems', 'Governance'],
    generateXml: generateSystemContextXml
  },
  {
    id: '02',
    name: 'Capability Map',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'Business, technical, and operational capability taxonomy',
    examples: 'Enterprise capabilities, AI capabilities, platform capabilities',
    defaultDomain: 'Enterprise AI & Platform Engineering',
    keyComponents: ['Business Capabilities', 'AI Foundation', 'Shared Core Services', 'Governance Matrix'],
    generateXml: generateSystemContextXml
  },
  {
    id: '03',
    name: 'Business Process / Swimlane',
    family: 'Process',
    level: 'L1/L2',
    primaryPurpose: 'Roles, activities, handoffs, and decisions across departments',
    examples: 'Claims triage, onboarding, approval gates, DevOps release',
    defaultDomain: 'Clinical Trials & Regulatory Operations',
    keyComponents: ['Department Swimlanes', 'Hand-off Triggers', 'Approval Decision Gates', 'Audit Milestones'],
    generateXml: generateSystemContextXml
  },
  {
    id: '04',
    name: 'Value Stream',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'End-to-end value delivery stages, cycle times, and outcomes',
    examples: 'Migration VSM, software delivery, patient journey',
    defaultDomain: 'Research-to-Commercial Patient Journey',
    keyComponents: ['Value Stages', 'Key Activities', 'Process & Lead Time Metrics', 'Delivered Outcomes'],
    generateXml: generateSystemContextXml
  },
  {
    id: '05',
    name: 'As-Is / To-Be',
    family: 'Understand',
    level: 'L1',
    primaryPurpose: 'Transformation comparison between legacy silos and cloud target state',
    examples: 'Cloud migration, modernization, AI transformation',
    defaultDomain: 'Enterprise Cloud Transformation',
    keyComponents: ['As-Is Legacy Silos', 'Transformation Drivers', 'To-Be Cloud Target', 'Business ROI'],
    generateXml: generateSystemContextXml
  },
  {
    id: '06',
    name: 'C4 Context',
    family: 'Structure',
    level: 'L1',
    primaryPurpose: 'C4 Level 1 zoom: System in scope surrounded by people and enterprise systems',
    examples: 'Enterprise application ecosystem, SaaS boundary',
    defaultDomain: 'Enterprise Product Architecture',
    keyComponents: ['System in Scope', 'User Personas', 'External Software Systems', 'Data Contracts'],
    generateXml: generateSystemContextXml
  },
  {
    id: '07',
    name: 'C4 Container',
    family: 'Structure',
    level: 'L2',
    primaryPurpose: 'C4 Level 2 zoom: Applications, microservices, databases, and message queues',
    examples: 'Microservices, web applications, serverless clusters',
    defaultDomain: 'Cloud Native Microservices Platform',
    keyComponents: ['Web/Mobile Apps', 'API Gateway', 'Microservices Pods', 'Databases & Caches'],
    generateXml: generateSystemContextXml
  },
  {
    id: '08',
    name: 'Component Architecture',
    family: 'Structure',
    level: 'L2/L3',
    primaryPurpose: 'C4 Level 3 zoom: Internal software components, controllers, and service layers',
    examples: 'Services, modules, internal pipelines, class libraries',
    defaultDomain: 'Microservice Internal Component Structure',
    keyComponents: ['Controllers', 'Service Adapters', 'Repository Layer', 'Domain Logic Entities'],
    generateXml: generateSystemContextXml
  },
  {
    id: '09',
    name: 'Data Flow Architecture',
    family: 'Flow',
    level: 'L1/L2/L3',
    primaryPurpose: 'Movement, processing, transformation, and storage of data across tiers',
    examples: 'ETL/ELT, streaming lakehouse, payments pipeline',
    defaultDomain: 'Medallion Data Lakehouse & Stream Processing',
    keyComponents: ['Raw Bronze Storage', 'Dataflow Cleaning', 'Silver/Gold Marts', 'Serving APIs'],
    generateXml: generateSystemContextXml
  },
  {
    id: '10',
    name: 'Integration Architecture',
    family: 'Flow',
    level: 'L2',
    primaryPurpose: 'System-to-system connectivity, middleware, event brokers, and API gateways',
    examples: 'APIs, Pub/Sub, SaaS connectors, B2B integration',
    defaultDomain: 'Enterprise API Management & Integration Hub',
    keyComponents: ['Apigee Gateway', 'Event Backbone', 'Data Integration Connectors', 'External Sinks'],
    generateXml: generateSystemContextXml
  },
  {
    id: '11',
    name: 'Sequence Diagram',
    family: 'Process',
    level: 'L2/L3',
    primaryPurpose: 'Time-ordered chronological message exchanges between systems and services',
    examples: 'API call sequences, agent task workflow, login SSO, payments',
    defaultDomain: 'Multi-Agent LLM Retrieval & Grounding Flow',
    keyComponents: ['Lifelines', 'Synchronous Messages', 'Async Events', 'Activation Bars'],
    generateXml: generateSystemContextXml
  },
  {
    id: '12',
    name: 'State Machine',
    family: 'Process',
    level: 'L2/L3',
    primaryPurpose: 'Discrete entity lifecycle states, trigger events, and transition guard conditions',
    examples: 'Order states, AI agent execution lifecycle, approval workflows',
    defaultDomain: 'Clinical Study Protocol Intelligence State Machine',
    keyComponents: ['Initial/Final States', 'Transition Triggers', 'Guardrail Rules', 'State Handlers'],
    generateXml: generateSystemContextXml
  },
  {
    id: '13',
    name: 'Decision Flow / Decision Tree',
    family: 'Process',
    level: 'L1/L2',
    primaryPurpose: 'Business rules, conditional logic branching, and AI policy evaluation gates',
    examples: 'Routing trees, approvals, AI confidence thresholds, risk scoring',
    defaultDomain: 'AI Regulatory Triage & Multi-Tier Escalation Decision Tree',
    keyComponents: ['Inbound Event', 'Decision Diamonds', 'Confidence Gates', 'Action Sinks'],
    generateXml: generateSystemContextXml
  },
  {
    id: '14',
    name: 'Data Model / ERD',
    family: 'Structure',
    level: 'L2/L3',
    primaryPurpose: 'Database entities, tables, attributes, primary/foreign keys, and cardinalities',
    examples: 'Relational databases, lakehouse star schema, semantic model',
    defaultDomain: 'Clinical Trial Genomics & EHR Star Schema',
    keyComponents: ['Entities/Tables', 'Primary/Foreign Keys', 'Crow\'s Foot Cardinality', 'Data Types'],
    generateXml: generateSystemContextXml
  },
  {
    id: '15',
    name: 'Network Topology',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Network boundaries, VPCs, subnets, routers, firewalls, and gateways',
    examples: 'VPC hub-and-spoke, hybrid cloud, zero-trust perimeter',
    defaultDomain: 'GCP Enterprise Landing Zone & Shared VPC',
    keyComponents: ['Public Subnet DMZ', 'Private App Subnet', 'Database Subnet', 'Cloud Interconnect'],
    generateXml: generateSystemContextXml
  },
  {
    id: '16',
    name: 'Deployment Architecture',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Physical/logical mapping of application workloads onto cloud infrastructure',
    examples: 'GKE multi-cluster, Cloud Run, multi-region failover',
    defaultDomain: 'Multi-Region High-Availability Cloud Deployment',
    keyComponents: ['Primary Region', 'Secondary Region', 'Global Load Balancer', 'Data Replication'],
    generateXml: generateSystemContextXml
  },
  {
    id: '17',
    name: 'Identity & Access Flow',
    family: 'Security & Governance',
    level: 'L2/L3',
    primaryPurpose: 'Authentication, authorization, token exchange, SSO federation, and IAM',
    examples: 'Workload Identity Federation, OAuth 2.1 / OIDC, BeyondCorp',
    defaultDomain: 'Zero-Trust Enterprise IAM & Token Exchange',
    keyComponents: ['External IdP', 'Security Token Service (STS)', 'IAM Workload Pools', 'Audit Ledger'],
    generateXml: generateSystemContextXml
  },
  {
    id: '18',
    name: 'Security / Trust Boundary',
    family: 'Security & Governance',
    level: 'L1/L2/L3',
    primaryPurpose: 'Security zones, encryption perimeters, trust levels, and defense-in-depth',
    examples: 'Zero Trust, PCI-DSS enclaves, PHI protection, Assured Workloads',
    defaultDomain: 'Sovereign Zero-Trust Data Protection Enclave',
    keyComponents: ['Internet Untrusted Zone', 'Edge WAF DMZ', 'Trusted App Enclave', 'Hardware Key Vault'],
    generateXml: generateSystemContextXml
  },
  {
    id: '19',
    name: 'HA / DR Architecture',
    family: 'Infrastructure',
    level: 'L2/L3',
    primaryPurpose: 'Resilience engineering, multi-region replication, and failover routing',
    examples: 'Active-active multi-region, hot standby, backup/restore',
    defaultDomain: 'Active-Active Multi-Region Resiliency (Cloud Spanner TrueTime)',
    keyComponents: ['Active Region (Iowa)', 'Standby Region (Virginia)', 'DNS Health Checks', 'RTO/RPO Metrics'],
    generateXml: generateSystemContextXml
  },
  {
    id: '20',
    name: 'CI/CD Pipeline',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Automated software delivery lifecycle, GitOps synchronization, and rollout',
    examples: 'GitOps declarative delivery, progressive canary rollout, SLSA L3',
    defaultDomain: 'SLSA Level 3 GitOps Continuous Delivery Pipeline',
    keyComponents: ['Source Repo', 'Cloud Build CI', 'Artifact Registry & Scan', 'Canary Rollout Target'],
    generateXml: generateSystemContextXml
  },
  {
    id: '21',
    name: 'Observability / SRE',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Telemetry collection, distributed tracing, metric aggregation, and SLO alerts',
    examples: 'Logs, metrics, traces, SLO error budget burn rates',
    defaultDomain: 'Enterprise SRE Observability & OpenTelemetry Mesh',
    keyComponents: ['OpenTelemetry Sidecars', 'Cloud Logging / Monitoring', 'Prometheus', 'SLO Alert Engine'],
    generateXml: generateSystemContextXml
  },
  {
    id: '22',
    name: 'Migration / Transition',
    family: 'Delivery & Operations',
    level: 'L1/L2/L3',
    primaryPurpose: 'Step-by-step movement of legacy workloads to cloud target state (6-Rs)',
    examples: 'Datacenter to GCP, database CDC migration, Strangler Fig pattern',
    defaultDomain: '6-Rs Wave Migration & Cloud Factory',
    keyComponents: ['Assess & Discover', 'Target Landing Zone', 'Live CDC Replication', 'Cutover & Decommission'],
    generateXml: generateSystemContextXml
  },
  {
    id: '23',
    name: 'Agent Interaction',
    family: 'Flow',
    level: 'L1/L2/L3',
    primaryPurpose: 'Multi-agent collaboration, supervisor delegation, and task synthesis',
    examples: 'Supervisor-subagents, swarm mesh, planner/executor',
    defaultDomain: 'Hierarchical Multi-Agent Clinical Reasoning Swarm',
    keyComponents: ['Supervisor Agent', 'Domain Subagents', 'Shared Redis Memory', 'Safety Gate'],
    generateXml: generateSystemContextXml
  },
  {
    id: '24',
    name: 'RAG / Knowledge Flow',
    family: 'Flow',
    level: 'L2/L3',
    primaryPurpose: 'Document chunking, vector embeddings, hybrid graph retrieval, and grounding',
    examples: 'Vector RAG, GraphRAG, multimodal clinical RAG',
    defaultDomain: 'Multi-Hop GraphRAG Knowledge Engine',
    keyComponents: ['Document Parser', 'Vector Embeddings', 'Spanner Graph (ISO GQL)', 'Gemini Model Armor'],
    generateXml: generateSystemContextXml
  },
  {
    id: '25',
    name: 'Tool / Protocol Interaction',
    family: 'Flow',
    level: 'L2/L3',
    primaryPurpose: 'Standardized communication between AI models and tools via MCP, A2A, JSON-RPC',
    examples: 'Model Context Protocol (MCP), Agent-to-Agent (A2A), OpenAPI tool bridges',
    defaultDomain: 'Model Context Protocol (MCP) Enterprise Gateway',
    keyComponents: ['Agent Client', 'MCP JSON-RPC Bridge', 'MicroVM Sandboxes', 'Enterprise Tool Registry'],
    generateXml: generateSystemContextXml
  },
  {
    id: '26',
    name: 'HITL / Governance Flow',
    family: 'Security & Governance',
    level: 'L1/L2',
    primaryPurpose: 'Human-in-the-Loop approval gates, confidence thresholds, and risk review',
    examples: 'AI approval gates, escalation workflows, risk triage',
    defaultDomain: 'FDA 21 CFR Part 11 Electronic Signature HITL Gate',
    keyComponents: ['AI Recommendation', 'Confidence Scorer', 'Medical Review Cockpit', 'Immutable Audit Signoff'],
    generateXml: generateSystemContextXml
  },
  {
    id: '27',
    name: 'Threat Model',
    family: 'Security & Governance',
    level: 'L2/L3',
    primaryPurpose: 'STRIDE threat modeling, attack surfaces, malicious vectors, and mitigations',
    examples: 'STRIDE model, prompt injection defense, API attack vectors',
    defaultDomain: 'STRIDE Threat Modeling & AI Defense Architecture',
    keyComponents: ['Threat Actors', 'Attack Surface Map', 'STRIDE Matrix', 'Mitigating Controls'],
    generateXml: generateSystemContextXml
  },
  {
    id: '28',
    name: 'Failure / Exception Flow',
    family: 'Delivery & Operations',
    level: 'L2/L3',
    primaryPurpose: 'Failure modes, retry policies, exponential backoff, DLQs, and circuit breakers',
    examples: 'DLQ, retries, circuit breakers, agent timeouts',
    defaultDomain: 'Distributed Saga Failure Compensation & DLQ Quarantine',
    keyComponents: ['Failure Detection', 'Circuit Breaker', 'Compensating Rollback', 'Quarantine DLQ'],
    generateXml: generateSystemContextXml
  },
  {
    id: '29',
    name: 'Cutover / Operational Runbook',
    family: 'Delivery & Operations',
    level: 'L3',
    primaryPurpose: 'Step-by-step production cutover checklist, maintenance window, and rollback',
    examples: 'Production launch, DR exercise, cloud cutover runbook',
    defaultDomain: 'Production Go-Live War Room & Cutover Checklist',
    keyComponents: ['Pre-Cutover (T-120)', 'Cutover Window', 'Smoke Verification', 'Rollback Trigger Matrix'],
    generateXml: generateSystemContextXml
  },
  {
    id: '30',
    name: 'FinOps / Cost Flow',
    family: 'Delivery & Operations',
    level: 'L1/L2',
    primaryPurpose: 'Cloud spend ingestion, shared resource allocation, and cost optimization',
    examples: 'Cloud spend, AI token cost attribution, tenant unit economics',
    defaultDomain: 'Enterprise Cloud FinOps & AI Token Cost Attribution',
    keyComponents: ['Billing Export', 'Cost Attribution Marts', 'Idle Resource Reclaimer', 'Executive Cockpit'],
    generateXml: generateSystemContextXml
  },
  {
    id: '31',
    name: 'Dependency / Relationship Map',
    family: 'Analysis & Planning',
    level: 'L2',
    primaryPurpose: 'Arbitrary many-to-many dependencies across systems, services, datasets, and teams',
    examples: 'Microservice dependency graph, blast-radius impact analysis',
    defaultDomain: 'Multi-Tier System & Database Dependency Matrix',
    keyComponents: ['Applications', 'Data Stores', 'Integrations', 'Criticality Risk Heatmap'],
    generateXml: generateSystemContextXml
  },
  {
    id: '32',
    name: 'Timeline / Roadmap / Architecture Evolution',
    family: 'Analysis & Planning',
    level: 'L1/L2',
    primaryPurpose: 'Multi-year architecture roadmap, maturity milestones, and migration waves',
    examples: 'Target state evolution, 3-year AI transformation roadmap',
    defaultDomain: 'Enterprise Cloud & AI Maturity Evolution Roadmap',
    keyComponents: ['Phase 0 Foundation', 'Phase 1 Scale', 'Phase 2 Autonomous AI', 'Strategic Drivers'],
    generateXml: generateSystemContextXml
  },
  {
    id: '33',
    name: 'Matrix / Heatmap',
    family: 'Analysis & Planning',
    level: 'L1/L2',
    primaryPurpose: '2-dimensional evaluation matrix: capability vs system, control vs workload',
    examples: 'Vendor evaluation matrix, security control compliance heatmap',
    defaultDomain: 'Architecture Evaluation Matrix & Capability Heatmap',
    keyComponents: ['Evaluation Criteria', 'Option Scoring (1-5)', 'Weighted Rank', 'Strategic Recommendation'],
    generateXml: generateSystemContextXml
  },
  {
    id: '34',
    name: 'Geographic / Regional Architecture',
    family: 'Infrastructure',
    level: 'L1/L2/L3',
    primaryPurpose: 'Geographic layout, sovereign cloud boundaries, and global traffic routing',
    examples: 'Global user base, multi-region sovereign cloud, edge CDN',
    defaultDomain: 'Global Sovereign Cloud & Data Residency Architecture',
    keyComponents: ['North America (US-East)', 'Europe (EU-Central)', 'APAC (Tokyo)', 'Global Edge Anycast'],
    generateXml: generateSystemContextXml
  }
];
