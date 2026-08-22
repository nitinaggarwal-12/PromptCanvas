export function generateTemplate01ExactXml(): string {
  const esc = (v?: string | null) => (v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const cells: string[] = [];
  const rect = (id: string, value: string, x: number, y: number, w: number, h: number, style = '') => {
    cells.push(`<mxCell id="${id}" value="${esc(value)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9DB3D7;strokeWidth=1;fontColor=#0B1739;fontSize=12;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };
  const text = (id: string, value: string, x: number, y: number, w: number, h: number, style = '') => {
    cells.push(`<mxCell id="${id}" value="${esc(value)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;overflow=hidden;fontColor=#0B1739;fontSize=12;verticalAlign=middle;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };
  const edge = (id: string, source: string, target: string, dashed = false, label = '', style = '') => {
    cells.push(`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0B1739;strokeWidth=2;endArrow=block;endFill=1;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}${style}" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  };
  const sectionHeader = (id: string, label: string, x: number, y: number, w: number, color = '#0647B8') => {
    rect(id, label, x, y, w, 26, `fillColor=${color};strokeColor=${color};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;rounded=1;`);
  };

  // Header
  rect('badge01', '01', 15, 12, 80, 78, 'fillColor=#0D47B5;strokeColor=#0D47B5;fontColor=#FFFFFF;fontSize=44;fontStyle=1;align=center;verticalAlign=middle;rounded=1;');
  text('title', 'System Context Diagram', 108, 14, 430, 42, 'fontSize=30;fontStyle=1;align=left;');
  text('subtitle', 'NovaCura Integrated Healthcare Platform', 108, 53, 440, 34, 'fontSize=22;fontStyle=1;align=left;');
  rect('titleRule', '', 557, 22, 2, 64, 'fillColor=#7D8AA6;strokeColor=none;rounded=0;');
  text('description', 'This diagram shows NovaCura in its environment, the external\nactors and systems it interacts with, and the key flows.', 571, 22, 505, 62, 'fontSize=15;align=left;verticalAlign=top;');

  // Legend
  rect('legendBox', '', 1123, 12, 396, 86, 'strokeColor=#315B9A;rounded=1;');
  text('legendTitle', 'LEGEND', 1138, 17, 90, 18, 'fontSize=13;fontStyle=1;align=left;');
  text('legend1', '────────▶  Primary Data Flow', 1138, 42, 170, 18, 'fontSize=11;align=left;');
  text('legend2', '— — —▶  Async / Event Flow', 1138, 67, 170, 18, 'fontSize=11;align=left;');
  text('legend3', '··········  Optional / Reference Flow', 1324, 42, 180, 18, 'fontSize=11;align=left;');
  text('legend4', '🔒  Secure / Encrypted', 1324, 67, 170, 18, 'fontSize=11;align=left;');

  // External actors
  rect('actorsBox', '', 15, 118, 206, 620, 'strokeColor=#315B9A;rounded=1;');
  sectionHeader('actorsHdr', 'EXTERNAL ACTORS', 15, 118, 206, '#0647B8');
  const actorRows = [
    ['actor1','👥','Patients','Access care, view\nrecords, schedule\nappointments,\nmake payments',174],
    ['actor2','🩺','Providers','Clinicians, nurses\nand care teams\nusing the system\nfor patient care',306],
    ['actor3','💻','Administrative\nUsers','Staff managing\noperations, billing,\nreports and\nconfigurations',438],
    ['actor4','📱','Mobile Users','On-the-go access\nvia mobile app\nfor patients and\nproviders',588],
  ] as const;
  actorRows.forEach(([id, icon, name, desc, y]) => {
    text(`${id}_icon`, icon, 28, y, 54, 58, 'fontSize=38;align=center;');
    text(`${id}_name`, name, 108, y - 4, 105, 38, 'fontSize=14;fontStyle=1;align=left;verticalAlign=top;');
    text(`${id}_desc`, desc, 108, y + 29, 105, 85, 'fontSize=11;align=left;verticalAlign=top;');
  });

  // Main platform boundary
  rect('platform', '', 370, 120, 698, 614, 'strokeColor=#0647B8;strokeWidth=2;rounded=1;');
  text('platformIcon', '♥', 455, 138, 70, 66, 'fontSize=46;fontColor=#0752B4;align=center;');
  text('platformTitle', 'NovaCura Integrated Healthcare Platform', 545, 150, 460, 44, 'fontSize=24;fontStyle=1;fontColor=#0647B8;align=left;');

  const caps = [
    ['cap1','👥  Patient Engagement','Patient Portal\nMobile App\nCommunications\nEducation',385,221],
    ['cap2','🩺  Care Delivery','EHR / EMR\nClinical Workflows\nePrescribing\nCare Plans',557,221],
    ['cap3','📅  Scheduling','Appointments\nResource Mgmt\nCalendar\nReminders',732,221],
    ['cap4','💲  Billing & Revenue','Claims Mgmt\nInvoicing\nPayments\nAR / Collections',898,221],
    ['cap5','📁  Clinical Data\nManagement','Clinical Notes\nDocuments\nLabs & Results\nImaging',385,389],
    ['cap6','📊  Analytics & Reporting','Operational Reports\nClinical Analytics\nDashboards\nBI',557,389],
    ['cap7','🧠  AI & Decision Support','Risk Stratification\nCDS Rules\nPredictive Analytics\nGenAI Insights',732,389],
    ['cap8','⚙  Administration','User Mgmt\nRole Mgmt\nConfigurations\nAudit Logs',898,389],
  ] as const;
  caps.forEach(([id, name, body, x, y]) => {
    rect(id, '', x, y, 160, 150, 'strokeColor=#7EA0D2;');
    text(`${id}_name`, name, x + 14, y + 15, 135, 38, 'fontSize=12;fontStyle=1;fontColor=#0647B8;align=left;verticalAlign=top;');
    text(`${id}_body`, body, x + 39, y + 57, 110, 84, 'fontSize=11;align=left;verticalAlign=top;');
  });

  rect('integration', '', 385, 556, 662, 70, 'strokeColor=#7EA0D2;');
  text('integrationIcon', '🧩', 423, 566, 50, 44, 'fontSize=31;align=center;');
  text('integrationTitle', 'Integration & API Layer', 500, 571, 220, 22, 'fontSize=15;fontStyle=1;fontColor=#0647B8;align=left;');
  text('integrationBody', 'REST / FHIR APIs  |  GraphQL  |  Webhooks  |  API Gateway  |  Service Orchestration', 500, 596, 500, 20, 'fontSize=11;align=left;');

  rect('dataPlatform', '', 385, 637, 662, 79, 'strokeColor=#7EA0D2;');
  text('dataIcon', '▰', 423, 646, 50, 50, 'fontSize=38;fontColor=#0647B8;align=center;');
  text('dataTitle', 'Data Platform', 500, 653, 180, 22, 'fontSize=15;fontStyle=1;fontColor=#0647B8;align=left;');
  text('dataBody', 'Operational DBs  |  Data Lake  |  Data Warehouse  |  Master Data Mgmt', 500, 682, 500, 20, 'fontSize=11;align=left;');

  // External system cards
  rect('systemsBox', '', 1221, 118, 299, 650, 'strokeColor=#315B9A;rounded=1;');
  sectionHeader('systemsHdr', 'EXTERNAL SYSTEMS', 1221, 118, 299, '#0647B8');
  const systems = [
    ['sys1','Epic','EHR Systems','Patient demographic, clinical\ndata, orders, results','HL7 FHIR / API',151],
    ['sys2','Labcorp','Laboratory Systems','Lab orders, results,\nstatus updates','HL7 / FHIR',230],
    ['sys3','Nuance','Imaging Systems','Imaging orders, images,\nreports','DICOM / HL7',310],
    ['sys4','Rx','Pharmacy Systems','Medication orders,\nstatus, interactions','NCPDP / FHIR',390],
    ['sys5','🛡','Insurance Payers','Eligibility, benefits,\nclaims status','X12 / FHIR',470],
    ['sys6','stripe','Payment Gateways','Payment processing,\nrefunds','HTTPS / API',550],
    ['sys7','okta','Identity Provider','SSO, MFA,\nuser identity','SAML / OIDC',630],
    ['sys8','❄','External Data Sources','Public Health, HIE,\nReference Data','API / Files',710],
  ] as const;
  systems.forEach(([id, logo, name, desc, protocol, y]) => {
    rect(id, '', 1232, y, 278, 72, 'strokeColor=#91AAD2;');
    rect(`${id}_logoBox`, logo, 1244, y + 8, 88, 56, 'fillColor=#F7F9FC;strokeColor=#E1E7F0;fontSize=18;fontStyle=1;align=center;verticalAlign=middle;');
    text(`${id}_name`, name, 1350, y + 7, 150, 22, 'fontSize=13;fontStyle=1;align=left;');
    text(`${id}_desc`, desc, 1350, y + 30, 150, 38, 'fontSize=11;align=left;verticalAlign=top;');
    text(`${id}_protocol`, protocol, 1088, y + 23, 120, 20, 'fontSize=11;align=center;');
    text(`${id}_lock`, '🔒', 1134, y + 44, 30, 20, 'fontSize=12;align=center;');
  });

  // Actor ingress connectors
  ['actor1','actor2','actor3','actor4'].forEach((a, i) => edge(`actorEdge${i+1}`, a, 'platform', false, 'HTTPS / TLS 1.3', 'exitX=1;exitY=0.5;entryX=0;entryY=0.5;'));

  // Platform to external systems, top four bidirectional visualized with start arrow
  ['sys1','sys2','sys3','sys4'].forEach((s, i) => edge(`sysEdge${i+1}`, 'platform', s, false, '', 'startArrow=block;startFill=1;exitX=1;entryX=0;'));
  ['sys5','sys6','sys7'].forEach((s, i) => edge(`sysDash${i+1}`, 'platform', s, true, '', 'startArrow=block;startFill=1;exitX=1;entryX=0;'));
  edge('sysOpt8', 'platform', 'sys8', true, '', 'startArrow=none;endArrow=open;dashPattern=1 4;exitX=1;entryX=0;');

  // Bottom panels
  rect('flowsBox', '', 15, 783, 498, 217, 'strokeColor=#315B9A;');
  sectionHeader('flowsHdr', 'KEY FLOWS', 15, 783, 145, '#0647B8');
  const flows = [
    '1   User Access: Actors access NovaCura via secure web/mobile (HTTPS/TLS 1.3).',
    '2   Clinical Data Exchange: Bidirectional exchange with EHR, Labs, Imaging, Pharmacy\n     using HL7 FHIR / DICOM / NCPDP.',
    '3   Financial Transactions: Claims, eligibility and payments exchanged with Payers\n     and Payment Gateways.',
    '4   Identity & Access: SSO/MFA via Identity Provider (SAML/OIDC).',
    '5   Data & Insights: Data aggregated for analytics, reporting and AI-driven insights.',
  ];
  flows.forEach((f, i) => text(`flow${i+1}`, f, 28, 817 + i*35, 468, i === 1 || i === 2 ? 40 : 27, 'fontSize=10.5;align=left;verticalAlign=top;'));

  rect('securityBox', '', 525, 783, 350, 217, 'strokeColor=#315B9A;');
  sectionHeader('securityHdr', 'SECURITY & COMPLIANCE', 525, 783, 350, '#0F8B55');
  const sec = [
    ['🔒','Encrypt in Transit\nTLS 1.3',540,828],['🛡','Encrypt at Rest\nAES-256',653,828],['👥','Role-Based Access\nControl (RBAC)',767,828],
    ['📋','Audit Logging\n& Monitoring',540,910],['⚕','HIPAA\nCompliant',653,910],['☁','Data Backup\n& DR',767,910],
  ] as const;
  sec.forEach(([icon, label, x, y], i) => {
    text(`secI${i}`, icon, x, y, 34, 38, 'fontSize=24;align=center;');
    text(`secT${i}`, label, x + 40, y + 2, 76, 44, 'fontSize=10;align=left;verticalAlign=top;');
  });
  rect('secRule', '', 545, 889, 305, 1, 'fillColor=#9DB3D7;strokeColor=none;rounded=0;');

  rect('notesBox', '', 900, 783, 290, 217, 'strokeColor=#8A63B8;');
  sectionHeader('notesHdr', 'NOTES', 900, 783, 290, '#8759B5');
  const notes = [
    '•  All connections are secure and encrypted.',
    '•  FHIR is the primary integration standard.',
    '•  Webhooks and event streams are used for async\n   notifications.',
    '•  NovaCura is cloud-native and highly scalable.',
    '•  This is a Level 1 (Context) view.',
  ];
  notes.forEach((n, i) => text(`note${i}`, n, 917, 823 + i*34, 255, 40, 'fontSize=10.5;align=left;verticalAlign=top;'));

  rect('infoBox', '', 1221, 783, 299, 217, 'strokeColor=#315B9A;');
  sectionHeader('infoHdr', 'DIAGRAM INFO', 1221, 783, 299, '#0647B8');
  const infos = [['📅','Date:     May 20, 2025'],['◎','Level:    1 (Context)'],['♙','Owner:    Enterprise Architecture'],['◆','Version:  1.0']] as const;
  infos.forEach(([icon, label], i) => {
    text(`infoI${i}`, icon, 1236, 827 + i*39, 36, 28, 'fontSize=21;fontColor=#0647B8;align=center;');
    text(`infoT${i}`, label, 1280, 827 + i*39, 220, 28, 'fontSize=11;align=left;');
  });

  return `<mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${cells.join('')}</root></mxGraphModel>`;
}
