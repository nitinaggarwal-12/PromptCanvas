/**
 * Upgraded 2026 Google Cloud (GCP), Gemini Enterprise (GE) & Open-Source
 * Multi-Agent Banking Architecture (L2/L3 Logical-Component Level).
 *
 * 1:1 visual clone of the user's reference layout with:
 * - Subtle graph-paper grid background & compact, uncluttered boxes
 * - Authentic inline vector SVG icons matching the reference diagram
 * - Numbered flow steps (❶ to ➐)
 * - Upgraded 2026 GCP, Gemini Enterprise (GE), Google ADK, A2A, MCP, Model Armor/SDP & Open-Source stack
 */

import {
  buildNasaMultiverseClosedLoopHarnessXml,
  buildUniversalClosedLoopDomainHarnessXml,
  shouldUseUniversalClosedLoopHarness,
} from './nasaMultiverseClosedLoopHarness';

function escAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ICONS = {
  chat: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V14C20 15.1046 19.1046 16 18 16H9L4 20V5Z" fill="#BFDBFE" stroke="#2563EB" stroke-width="1.8"/><path d="M8 8H16M8 11.5H13" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  shield: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L4 6.5V12C4 16.8 7.4 21.1 12 22.5C16.6 21.1 20 16.8 20 12V6.5L12 3Z" fill="#BFDBFE" stroke="#2563EB" stroke-width="1.8"/><path d="M9 12.5L11 14.5L15.5 10" stroke="#1D4ED8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  apigee: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="3.8" stroke="#EA580C" stroke-width="2.2"/><circle cx="15.5" cy="8.5" r="3.8" stroke="#EA580C" stroke-width="2.2"/><circle cx="8.5" cy="15.5" r="3.8" stroke="#EA580C" stroke-width="2.2"/><circle cx="15.5" cy="15.5" r="3.8" stroke="#EA580C" stroke-width="2.2"/></svg>`,
  identity: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#2563EB"/><circle cx="12" cy="9.5" r="2.5" fill="#FFFFFF"/><path d="M7.5 16.5C7.5 14.3 9.5 13 12 13C14.5 13 16.5 14.3 16.5 16.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/></svg>`,
  firebase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 18L8.5 4.5L12 10L14.5 6L19 18L12 22L5 18Z" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/></svg>`,
  cloudRun: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6L13 12L5 18V6Z" fill="#2563EB"/><path d="M11 6L19 12L11 18V14L14 12L11 10V6Z" fill="#60A5FA"/></svg>`,
  sdp: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#2563EB"/><rect x="9" y="10" width="6" height="6" rx="1" fill="#FFFFFF"/><path d="M10.5 10V8.5C10.5 7.7 11.2 7 12 7C12.8 7 13.5 7.7 13.5 8.5V10" stroke="#FFFFFF" stroke-width="1.6"/></svg>`,
  iam: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L5 5.5V11.5C5 16.2 8 20.3 12 21.8C16 20.3 19 16.2 19 11.5V5.5L12 2Z" fill="#2563EB"/><circle cx="12" cy="10" r="2.2" fill="#FFFFFF"/><path d="M8.5 16C8.5 14.2 10 13.2 12 13.2C14 13.2 15.5 14.2 15.5 16" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  agentCube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/><path d="M4 7.5L12 12L20 7.5M12 12V21" stroke="#16A34A" stroke-width="1.8"/></svg>`,
  gemini: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#2563EB"/></svg>`,
  gkeCube: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/><path d="M12 7L7.5 9.6V14.8L12 17.4L16.5 14.8V9.6L12 7Z" fill="#2563EB"/></svg>`,
  spanner: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3.5" fill="#2563EB"/><path d="M12 4V8.5M12 15.5V20M4.5 7.5L8.5 10M15.5 14L19.5 16.5M19.5 7.5L15.5 10M8.5 14L4.5 16.5" stroke="#2563EB" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="4" r="2" fill="#2563EB"/><circle cx="4.5" cy="16.5" r="2" fill="#2563EB"/><circle cx="19.5" cy="16.5" r="2" fill="#2563EB"/></svg>`,
  bigtable: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5L4 7V17L12 21.5L20 17V7L12 2.5Z" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/><path d="M8 9.5L12 7L16 9.5V14.5L12 17L8 14.5V9.5Z" fill="#EF4444"/></svg>`,
  firestore: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9L12 5L20 9L12 13L4 9Z" fill="#2563EB"/><path d="M4 13.5L12 9.5L20 13.5L12 17.5L4 13.5Z" fill="#60A5FA"/><path d="M4 18L12 14L20 18" stroke="#1D4ED8" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  vectorSearch: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="2.5" fill="#2563EB"/><circle cx="17" cy="7" r="2.5" fill="#60A5FA"/><circle cx="12" cy="16" r="3" fill="#1D4ED8"/><path d="M9 8.5L10.5 14M15 8.5L13.5 14M9.5 7H14.5" stroke="#2563EB" stroke-width="1.8"/></svg>`,
  logging: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="6" height="6" rx="1" fill="#2563EB"/><rect x="11" y="5" width="10" height="3" rx="1" fill="#2563EB"/><rect x="11" y="11" width="10" height="3" rx="1" fill="#60A5FA"/><rect x="11" y="17" width="10" height="3" rx="1" fill="#60A5FA"/><path d="M6 10V18.5H11" stroke="#2563EB" stroke-width="2"/></svg>`,
  monitoring: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" fill="#EF4444"/><path d="M6 13H9L11 9L13.5 15L15.5 11.5H18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  evalIcon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="16" r="2" fill="#2563EB"/><circle cx="12" cy="11" r="2" fill="#2563EB"/><circle cx="16" cy="7" r="2" fill="#2563EB"/><circle cx="16" cy="15" r="2" fill="#60A5FA"/><path d="M5 4V19H20" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>`,
  finops: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#16A34A"/><path d="M12 6.5V17.5M14.5 9.5C14.5 8.4 13.4 7.5 12 7.5C10.6 7.5 9.5 8.4 9.5 9.5C9.5 10.6 10.6 11.2 12 11.5C13.4 11.8 14.5 12.4 14.5 13.5C14.5 14.6 13.4 15.5 12 15.5C10.6 15.5 9.5 14.6 9.5 13.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/></svg>`,
};

function stepBadge(num: string, bg = '#1D4ED8'): string {
  return `<span style="display:inline-block;background:${bg};color:#FFFFFF;font-size:9.5px;font-weight:900;width:16px;height:16px;line-height:16px;text-align:center;border-radius:50%;margin-right:4px;vertical-align:text-top;">${num}</span>`;
}

function compactNodeHtml(opts: {
  step?: string;
  stepBg?: string;
  leftIcon?: string;
  rightIcon?: string;
  title: string;
  line1?: string;
  line2?: string;
  titleColor?: string;
  subColor?: string;
}): string {
  const step = opts.step ? stepBadge(opts.step, opts.stepBg) : '';
  const l1 = opts.line1
    ? `<div style="font-size:9.5px;font-weight:500;color:${opts.subColor || '#1E293B'};margin-top:1px;">${opts.line1}</div>`
    : '';
  const l2 = opts.line2
    ? `<div style="font-size:9px;font-weight:500;color:#334155;margin-top:1px;">${opts.line2}</div>`
    : '';

  return `<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <tr>
      ${opts.leftIcon ? `<td style="width:30px;text-align:center;vertical-align:middle;padding-left:6px;">${opts.leftIcon}</td>` : ''}
      <td style="text-align:center;vertical-align:middle;padding:2px 4px;line-height:1.2;">
        <div style="font-size:11.5px;font-weight:800;color:${opts.titleColor || '#0F172A'};">${step}${opts.title}</div>
        ${l1}
        ${l2}
      </td>
      ${opts.rightIcon ? `<td style="width:30px;text-align:center;vertical-align:middle;padding-right:6px;">${opts.rightIcon}</td>` : ''}
    </tr>
  </table>`;
}

export interface UpgradedGcpNativeArchOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  prompt?: string;
  customSubsystems?: string[];
  theme?: 'light' | 'dark';
}

interface DomainAgentAndCapabilityProfile {
  uiTitle?: string;
  uiLine1?: string;
  edgeTitle?: string;
  edgeLine1?: string;
  edgeLine2?: string;
  identityLine1?: string;
  identityLine2?: string;
  apiTitle?: string;
  apiLine1?: string;
  apiLine2?: string;
  aiClusterSub?: string;
  coordinatorTitle?: string;
  coordinatorLine1?: string;
  coordinatorLine2?: string;
  dlpLine1?: string;
  openModelsTitle?: string;
  openModelsLine1?: string;
  openModelsLine2?: string;
  vectorLine1?: string;
  vectorLine2?: string;
  db1Line1?: string;
  db2Line1?: string;
  db3Line1?: string;
  agent1: { title: string; line1: string; line2: string };
  agent2: { title: string; line1: string; line2: string };
  agent3: { title: string; line1: string; line2: string };
  cap1: { title: string; line1?: string };
  cap2: { title: string; line1?: string };
  cap3: { title: string; line1?: string };
  cap4: { title: string; line1?: string };
  cap5: { title: string; line1?: string };
  cap6: { title: string; line1?: string };
}

function resolveDomainProfile(
  options?: UpgradedGcpNativeArchOptions,
  astDomain?: string,
  astTitle?: string
): DomainAgentAndCapabilityProfile {
  const combined = `${options?.prompt || ''} ${options?.domain || ''} ${options?.projectTitle || ''} ${options?.useCaseName || ''} ${astDomain || ''} ${astTitle || ''}`.toLowerCase();

  if (
    combined.includes('nasa') ||
    combined.includes('satellite') ||
    combined.includes('satellight') ||
    combined.includes('universe') ||
    combined.includes('multiverse') ||
    combined.includes('orbital') ||
    combined.includes('space') ||
    combined.includes('rocket') ||
    combined.includes('aerospace') ||
    combined.includes('constellation')
  ) {
    return {
      uiTitle: 'NASA Mission Control UI',
      uiLine1: '(Goddard GMSEC / DSN Console / AG-UI)',
      edgeTitle: 'DSN & NSN RF Edge Layer',
      edgeLine1: '(CCSDS 732.0-B AOS, Cloud Armor, Apigee X)',
      edgeLine2: '(S/X/Ka-Band TT&C Link, SLE Uplink & Guard)',
      identityLine1: 'ITAR / FedRAMP High IAM',
      identityLine2: '(NASA PIV/CAC & Zero-Trust OIDC)',
      apiTitle: 'Launch Commit (LCC) Gate',
      apiLine1: 'Cloud Run Gen2 / GMSEC Bus',
      apiLine2: '(CCSDS 133.0-B Space Packet & AFTS)',
      aiClusterSub: '(NASA Harness • ADK • A2A • CCSDS MO)',
      coordinatorTitle: 'Flight Director Coordinator',
      coordinatorLine1: '(Vertex AI Agent Engine / Google ADK /',
      coordinatorLine2: 'LangGraph & CCSDS Mission Ops)',
      dlpLine1: '(Range Safety AFTS & Physics Sanity Guard)',
      openModelsTitle: 'Physics Digital-Twin Sims',
      openModelsLine1: '(Counterfactual Universe Ensembles',
      openModelsLine2: 'on GKE TPU v5e & NVIDIA H100)',
      vectorLine1: '(Gemini Embedding 2, NASA NTRS',
      vectorLine2: '& cFS Anomaly Corpus)',
      db1Line1: '(J2000 Ephemeris & LCC Graph)',
      db2Line1: '(100Hz CCSDS Telemetry)',
      db3Line1: '(ITAR Flight Rules & FMEA)',
      agent1: { title: 'GNC & Orbit FDS', line1: 'Agent', line2: '(J2000 Ephemeris / ADK)' },
      agent2: { title: "cFS / F' Avionics", line1: '& LCC Agent', line2: '(Range Safety AFTS / ADK)' },
      agent3: { title: 'Multiverse Sim', line1: 'Digital-Twin Agent', line2: '(Counterfactual Monte Carlo)' },
      cap1: { title: 'CCSDS 133.0-B', line1: 'Packet Telemetry' },
      cap2: { title: 'Launch Commit (LCC)', line1: '& AFTS Range Gate' },
      cap3: { title: 'DSN S/X/Ka-Band', line1: 'Link Budget Solver' },
      cap4: { title: "cFS / F' Onboard", line1: 'Command Uplink' },
      cap5: { title: 'Multi-Universe Sim', line1: '(Monte Carlo Twin)' },
      cap6: { title: 'FDIR Autonomous', line1: 'Fault Recovery' },
    };
  }

  if (
    combined.includes('health') ||
    combined.includes('clinical') ||
    combined.includes('fhir') ||
    combined.includes('hl7') ||
    combined.includes('patient') ||
    combined.includes('hospital') ||
    combined.includes('med')
  ) {
    return {
      agent1: { title: 'Clinical EHR', line1: 'Agent', line2: '(Google ADK / FHIR)' },
      agent2: { title: 'Claims & Care', line1: 'Agent', line2: '(ADK / LangGraph)' },
      agent3: { title: 'Patient Triage', line1: 'Agent', line2: '(Google ADK / HITL)' },
      cap1: { title: 'FHIR R4 Record', line1: 'Lookup' },
      cap2: { title: 'Claims Status', line1: 'Verification' },
      cap3: { title: 'Prior Auth', line1: 'Request' },
      cap4: { title: 'Care Pathway', line1: 'Update' },
      cap5: { title: 'Rx Refill', line1: 'Order' },
      cap6: { title: 'Lab OCR Intake', line1: '(Document AI)' },
    };
  }

  if (
    combined.includes('retail') ||
    combined.includes('commerce') ||
    combined.includes('shopping') ||
    combined.includes('catalog') ||
    combined.includes('inventory') ||
    combined.includes('supply chain')
  ) {
    return {
      agent1: { title: 'Catalog & Stock', line1: 'Agent', line2: '(Google ADK / Vertex)' },
      agent2: { title: 'Orders & Cart', line1: 'Agent', line2: '(ADK / LangGraph)' },
      agent3: { title: 'Fulfillment', line1: 'Agent', line2: '(Google ADK / HITL)' },
      cap1: { title: 'Inventory', line1: 'Enquiry' },
      cap2: { title: 'Order Status', line1: 'Details' },
      cap3: { title: 'Invoice', line1: 'Request' },
      cap4: { title: 'Shipping', line1: 'Address Update' },
      cap5: { title: 'Return / RMA', line1: 'Request' },
      cap6: { title: 'Receipt Claims', line1: '(Document AI)' },
    };
  }

  if (
    combined.includes('secops') ||
    combined.includes('cyber') ||
    combined.includes('chronicle') ||
    combined.includes('siem') ||
    combined.includes('soar') ||
    combined.includes('threat')
  ) {
    return {
      agent1: { title: 'Threat Intel', line1: 'Agent', line2: '(Google ADK / SecOps)' },
      agent2: { title: 'SIEM Triage', line1: 'Agent', line2: '(ADK / LangGraph)' },
      agent3: { title: 'SOAR Response', line1: 'Agent', line2: '(Google ADK / HITL)' },
      cap1: { title: 'Asset Posture', line1: 'Enquiry' },
      cap2: { title: 'UDM Telemetry', line1: 'Search' },
      cap3: { title: 'IOC Forensic', line1: 'Report' },
      cap4: { title: 'IAM Policy', line1: 'Remediation' },
      cap5: { title: 'Firewall Rule', line1: 'Quarantine' },
      cap6: { title: 'Compliance Evidence', line1: '(Document AI)' },
    };
  }

  if (
    combined.includes('lakehouse') ||
    combined.includes('data mesh') ||
    combined.includes('dataplex') ||
    combined.includes('analytics') ||
    combined.includes('streaming') ||
    combined.includes('iot')
  ) {
    return {
      agent1: { title: 'Data Catalog', line1: 'Agent', line2: '(Google ADK / Vertex)' },
      agent2: { title: 'Pipeline Ops', line1: 'Agent', line2: '(ADK / LangGraph)' },
      agent3: { title: 'BI & Governance', line1: 'Agent', line2: '(Google ADK / HITL)' },
      cap1: { title: 'Schema & SLA', line1: 'Enquiry' },
      cap2: { title: 'Stream Metrics', line1: 'Details' },
      cap3: { title: 'Lineage Audit', line1: 'Request' },
      cap4: { title: 'Partition', line1: 'Compaction' },
      cap5: { title: 'DLQ Replay', line1: 'Request' },
      cap6: { title: 'Contract Parser', line1: '(Document AI)' },
    };
  }

  // Default: 1:1 Multi-Agent Banking & Enterprise Reference Architecture
  return {
    agent1: { title: 'Accounts', line1: 'Agent', line2: '(Google ADK / Vertex)' },
    agent2: { title: 'Transaction', line1: 'Agent', line2: '(ADK / LangGraph)' },
    agent3: { title: 'Service', line1: 'Agent', line2: '(Google ADK / HITL)' },
    cap1: { title: 'Balance Enquiry' },
    cap2: { title: 'Transaction', line1: 'Details' },
    cap3: { title: 'Statement', line1: 'Request' },
    cap4: { title: 'Change of', line1: 'Address' },
    cap5: { title: 'Cheque book', line1: 'request' },
    cap6: { title: 'eKYC update', line1: '(Document AI)' },
  };
}

export function generateUpgradedGcpGeBankingArchitectureXml(
  options?: UpgradedGcpNativeArchOptions,
  ast?: {
    metadata?: { projectTitle?: string; domain?: string };
    components?: Array<{
      id: string;
      name: string;
      service: string;
      tier?: string;
      role?: string;
      sla?: string;
      protocols?: string[];
      description?: string;
    }>;
  }
): string {
  const cells: string[] = [];
  const profile = resolveDomainProfile(options, ast?.metadata?.domain, ast?.metadata?.projectTitle);

  const combinedSignal = `${options?.prompt || ''} ${options?.domain || ''} ${options?.projectTitle || ''} ${options?.useCaseName || ''} ${ast?.metadata?.domain || ''} ${ast?.metadata?.projectTitle || ''}`;
  if (profile.uiTitle === 'NASA Mission Control UI') {
    return buildNasaMultiverseClosedLoopHarnessXml(options?.theme || 'light');
  }
  if (shouldUseUniversalClosedLoopHarness(combinedSignal)) {
    return buildUniversalClosedLoopDomainHarnessXml({
      prompt: options?.prompt,
      projectTitle: options?.projectTitle || ast?.metadata?.projectTitle,
      domain: options?.domain || ast?.metadata?.domain,
      theme: options?.theme || 'light',
    });
  }

  const addVertex = (
    id: string,
    html: string,
    x: number,
    y: number,
    w: number,
    h: number,
    style: string
  ) => {
    cells.push(
      `        <mxCell id="${id}" value="${escAttr(html)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  };

  const addEdge = (
    id: string,
    label: string,
    source: string,
    target: string,
    style: string,
    waypoints?: Array<{ x: number; y: number }>
  ) => {
    const ptsXml =
      waypoints && waypoints.length > 0
        ? `<Array as="points">${waypoints.map((pt) => `<mxPoint x="${pt.x}" y="${pt.y}"/>`).join('')}</Array>`
        : '';
    cells.push(
      `        <mxCell id="${id}" value="${escAttr(label)}" style="${style}" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // ============================================================================
  // ❶ USER INTERFACE (Center X = 610)
  // ============================================================================
  addVertex(
    'ui_chat',
    compactNodeHtml({
      step: '1',
      leftIcon: ICONS.chat,
      title: profile.uiTitle || 'User Interface',
      line1: profile.uiLine1 || '(Chat / Gemini Live / AG-UI)',
    }),
    495,
    24,
    230,
    54,
    'rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  // ============================================================================
  // ❷ EDGE LAYER & IDENTITY PLATFORM
  // ============================================================================
  addVertex(
    'edge_layer',
    compactNodeHtml({
      step: '2',
      leftIcon: ICONS.shield,
      rightIcon: ICONS.apigee,
      title: profile.edgeTitle || 'Edge Layer',
      line1: profile.edgeLine1 || '(Cloud Armor, Apigee X, Envoy AI)',
      line2: profile.edgeLine2 || '(WAF, DDoS, Token Rate Limits, Semantic Cache)',
    }),
    455,
    110,
    310,
    68,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  addVertex(
    'identity_auth',
    compactNodeHtml({
      leftIcon: ICONS.identity,
      rightIcon: ICONS.firebase,
      title: 'Identity Platform',
      line1: profile.identityLine1 || 'Firebase Auth & Passkeys',
      line2: profile.identityLine2 || '(OAuth 2.1 / OIDC Authentication)',
    }),
    890,
    110,
    245,
    68,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  // ============================================================================
  // ❸ API GATEWAY / CLOUD RUN & MODEL ARMOR + SDP (DLP)
  // ============================================================================
  addVertex(
    'api_cloud_run',
    compactNodeHtml({
      step: '3',
      leftIcon: ICONS.cloudRun,
      rightIcon: ICONS.apigee,
      title: profile.apiTitle || 'API Gateway',
      line1: profile.apiLine1 || 'Cloud Run Gen2',
      line2: profile.apiLine2 || '(FastAPI / gRPC / SSE API)',
    }),
    495,
    210,
    230,
    66,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  addVertex(
    'dlp_model_armor',
    compactNodeHtml({
      leftIcon: ICONS.sdp,
      title: 'Model Armor & SDP',
      line1: profile.dlpLine1 || '(DLP PII Redaction & Guardrails)',
    }),
    915,
    220,
    215,
    56,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  // ============================================================================
  // LEFT SIDE: GCP OBSERVABILITY, AGENTOPS & FINOPS + IAM AUTHORISATION
  // ============================================================================
  const obsHtml = `<div style="font-family:'Inter',-apple-system,sans-serif;padding:8px 10px;text-align:left;">
    <div style="font-size:11.5px;font-weight:800;color:#0F172A;text-align:center;margin-bottom:12px;line-height:1.25;">GCP Observability,<br/>AgentOps &amp; FinOps</div>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="width:28px;padding:7px 0;vertical-align:middle;">${ICONS.logging}</td>
        <td style="padding:7px 4px;vertical-align:middle;line-height:1.2;">
          <div style="font-size:10.5px;font-weight:800;color:#0F172A;">Cloud Logging</div>
          <div style="font-size:8.5px;color:#475569;">(OTel GenAI Spans)</div>
        </td>
      </tr>
      <tr>
        <td style="width:28px;padding:7px 0;vertical-align:middle;">${ICONS.monitoring}</td>
        <td style="padding:7px 4px;vertical-align:middle;line-height:1.2;">
          <div style="font-size:10.5px;font-weight:800;color:#0F172A;">Cloud Monitoring</div>
          <div style="font-size:8.5px;color:#475569;">(Managed Prometheus)</div>
        </td>
      </tr>
      <tr>
        <td style="width:28px;padding:7px 0;vertical-align:middle;">${ICONS.evalIcon}</td>
        <td style="padding:7px 4px;vertical-align:middle;line-height:1.2;">
          <div style="font-size:10.5px;font-weight:800;color:#0F172A;">Vertex AI Evaluation</div>
          <div style="font-size:8.5px;color:#475569;">(Phoenix / Langfuse)</div>
        </td>
      </tr>
      <tr>
        <td style="width:28px;padding:7px 0;vertical-align:middle;">${ICONS.finops}</td>
        <td style="padding:7px 4px;vertical-align:middle;line-height:1.2;">
          <div style="font-size:10.5px;font-weight:800;color:#0F172A;">GCP FinOps Hub</div>
          <div style="font-size:8.5px;color:#475569;">(Token Cost Mgmt)</div>
        </td>
      </tr>
    </table>
  </div>`;
  addVertex(
    'obs_container',
    obsHtml,
    24,
    336,
    182,
    276,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.8;verticalAlign=top;shadow=1;'
  );

  // IAM Shield icon floating above IAM Authorisation box (matching reference image)
  addVertex(
    'iam_icon',
    `<div style="text-align:center;">${ICONS.iam}</div>`,
    272,
    316,
    30,
    30,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  addVertex(
    'iam_auth',
    compactNodeHtml({
      title: 'IAM',
      line1: 'Authorisation',
      line2: '(WIF & Policy RBAC)',
    }),
    224,
    348,
    126,
    58,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  // ============================================================================
  // ❹ AI CLUSTER (GEMINI ENTERPRISE & GOOGLE ADK) (x=378, y=304, w=476, h=256)
  // ============================================================================
  const aiClusterLabel = `<div style="font-family:'Inter',-apple-system,sans-serif;text-align:left;padding:6px 10px;line-height:1.2;">
    <span style="font-size:11.5px;font-weight:800;color:#0F172A;">AI Cluster</span>
    <span style="font-size:8.5px;font-weight:700;color:#15803D;margin-left:4px;">${profile.aiClusterSub || '(GE • ADK • A2A)'}</span>
  </div>`;
  addVertex(
    'ai_cluster',
    aiClusterLabel,
    378,
    304,
    476,
    256,
    'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.6;dashed=1;dashPattern=4 4;verticalAlign=top;align=left;'
  );

  // Coordinator Agent (Center X = 610)
  addVertex(
    'coordinator_agent',
    compactNodeHtml({
      step: '4',
      stepBg: '#15803D',
      rightIcon: ICONS.agentCube,
      title: profile.coordinatorTitle || 'Coordinator Agent',
      line1: profile.coordinatorLine1 || '(Gemini Enterprise / Vertex Agent Engine /',
      line2: profile.coordinatorLine2 || 'Google ADK & LangGraph)',
    }),
    480,
    346,
    260,
    66,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=1.8;shadow=1;'
  );

  // 3 Specialist Agents inside AI Cluster (y=456, h=84, w=136 each)
  // 396..532 (center 464), 548..684 (center 616), 700..836 (center 768)
  addVertex(
    'accounts_agent',
    compactNodeHtml({
      rightIcon: ICONS.agentCube,
      title: profile.agent1.title,
      line1: profile.agent1.line1,
      line2: profile.agent1.line2,
    }),
    396,
    456,
    136,
    84,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=1.8;shadow=1;'
  );

  addVertex(
    'transaction_agent',
    compactNodeHtml({
      rightIcon: ICONS.agentCube,
      title: profile.agent2.title,
      line1: profile.agent2.line1,
      line2: profile.agent2.line2,
    }),
    548,
    456,
    136,
    84,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=1.8;shadow=1;'
  );

  addVertex(
    'service_agent',
    compactNodeHtml({
      rightIcon: ICONS.agentCube,
      title: profile.agent3.title,
      line1: profile.agent3.line1,
      line2: profile.agent3.line2,
    }),
    700,
    456,
    136,
    84,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=1.8;shadow=1;'
  );

  // ============================================================================
  // ❺ LLM LAYER (VERTEX AI & GKE) (x=915, y=322, w=285, h=192)
  // ============================================================================
  const llmLayerHeader = `<div style="font-family:'Inter',-apple-system,sans-serif;text-align:center;padding-top:6px;">
    <span style="display:inline-block;background:#CA8A04;color:#FFFFFF;font-size:9.5px;font-weight:900;width:16px;height:16px;line-height:16px;text-align:center;border-radius:50%;margin-right:4px;">5</span>
    <span style="font-size:11px;font-weight:800;color:#0F172A;">LLM Layer (Vertex AI &amp; GKE)</span>
  </div>`;
  addVertex(
    'llm_container',
    llmLayerHeader,
    915,
    322,
    285,
    192,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#EAB308;strokeWidth=1.6;verticalAlign=top;shadow=1;'
  );

  addVertex(
    'gemini_models',
    compactNodeHtml({
      leftIcon: ICONS.gemini,
      rightIcon: ICONS.agentCube,
      title: 'Gemini 3.1 Pro / 3.8 Flash',
      line1: '(Vertex AI • Deep Research Max)',
    }),
    930,
    354,
    255,
    60,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=1.8;'
  );

  addVertex(
    'open_models',
    compactNodeHtml({
      leftIcon: ICONS.gkeCube,
      title: profile.openModelsTitle || 'Self-Hosted Open Models',
      line1: profile.openModelsLine1 || '(Gemma 3 / Llama 4 on GKE',
      line2: profile.openModelsLine2 || 'vLLM & Vertex Model Garden)',
    }),
    930,
    426,
    255,
    72,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.8;'
  );

  // ============================================================================
  // ❻ VECTOR SEARCH 2.0 & SESSION MEMORY (x=925, y=572, w=205, h=98)
  // ============================================================================
  addVertex(
    'vector_memory',
    compactNodeHtml({
      step: '6',
      leftIcon: ICONS.vectorSearch,
      title: 'Vector Search 2.0',
      line1: profile.vectorLine1 || '(Gemini Embedding 2,',
      line2: profile.vectorLine2 || 'ScaNN & Valkey Memory)',
    }),
    925,
    572,
    205,
    98,
    'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=12;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  const sessionNoteHtml = `<div style="font-family:'Inter',-apple-system,sans-serif;font-size:10.5px;font-weight:600;color:#1E293B;text-align:left;line-height:1.3;">
    Session State &amp;<br/>Shared History<br/><span style="font-size:9px;color:#2563EB;">(Valkey + GraphRAG)</span>
  </div>`;
  addVertex(
    'session_note',
    sessionNoteHtml,
    1140,
    596,
    115,
    54,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;'
  );

  // ============================================================================
  // ➐ CLOUD DATABASES (VIA MCP TOOL SERVERS) (y=614, h=56)
  // ============================================================================
  addVertex(
    'db_spanner',
    compactNodeHtml({
      step: '7',
      leftIcon: ICONS.spanner,
      title: 'Cloud Spanner',
      line1: profile.db1Line1 || '(TrueTime & Graph)',
    }),
    390,
    614,
    148,
    56,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  addVertex(
    'db_bigtable',
    compactNodeHtml({
      leftIcon: ICONS.bigtable,
      title: 'Bigtable',
      line1: profile.db2Line1 || '(+ AlloyDB AI)',
      titleColor: '#7F1D1D',
    }),
    552,
    614,
    132,
    56,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#F87171;strokeWidth=1.8;shadow=1;'
  );

  addVertex(
    'db_firestore',
    compactNodeHtml({
      leftIcon: ICONS.firestore,
      title: 'Firestore',
      line1: profile.db3Line1 || '(+ Document AI)',
    }),
    700,
    614,
    142,
    56,
    'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
  );

  // ============================================================================
  // BOTTOM DOMAIN CAPABILITY MICROSERVICES (y=720, h=80)
  // ============================================================================
  // Group 1: Balance Enquiry (x=304, y=720, w=150, h=80)
  addVertex(
    'grp_accounts',
    '',
    304,
    720,
    150,
    80,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E5E7EB;strokeColor=#9CA3AF;strokeWidth=1.5;shadow=1;'
  );
  addVertex(
    'act_balance',
    compactNodeHtml({
      title: profile.cap1.title,
      line1: profile.cap1.line1,
    }),
    318,
    734,
    122,
    52,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#6B7280;strokeWidth=1.5;'
  );

  // Group 2: Transaction Details & Statement Request (x=482, y=720, w=264, h=80)
  addVertex(
    'grp_transactions',
    '',
    482,
    720,
    264,
    80,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E5E7EB;strokeColor=#9CA3AF;strokeWidth=1.5;shadow=1;'
  );
  addVertex(
    'act_tx_details',
    compactNodeHtml({
      title: profile.cap2.title,
      line1: profile.cap2.line1,
    }),
    496,
    734,
    112,
    52,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#6B7280;strokeWidth=1.5;'
  );
  addVertex(
    'act_statement',
    compactNodeHtml({
      title: profile.cap3.title,
      line1: profile.cap3.line1,
    }),
    620,
    734,
    112,
    52,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#6B7280;strokeWidth=1.5;'
  );

  // Group 3: Change of Address, Cheque book request, KYC update (x=774, y=720, w=388, h=80)
  addVertex(
    'grp_service',
    '',
    774,
    720,
    388,
    80,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E5E7EB;strokeColor=#9CA3AF;strokeWidth=1.5;shadow=1;'
  );
  addVertex(
    'act_address',
    compactNodeHtml({
      title: profile.cap4.title,
      line1: profile.cap4.line1,
    }),
    788,
    734,
    112,
    52,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#6B7280;strokeWidth=1.5;'
  );
  addVertex(
    'act_cheque',
    compactNodeHtml({
      title: profile.cap5.title,
      line1: profile.cap5.line1,
    }),
    912,
    734,
    112,
    52,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#6B7280;strokeWidth=1.5;'
  );
  addVertex(
    'act_kyc',
    compactNodeHtml({
      title: profile.cap6.title,
      line1: profile.cap6.line1,
    }),
    1036,
    734,
    112,
    52,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#6B7280;strokeWidth=1.5;'
  );

  // ============================================================================
  // CLEAN ORTHOGONAL CONNECTORS (1:1 WITH REFERENCE GEOMETRY)
  // ============================================================================
  const darkEdge =
    'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.6;endArrow=block;endFill=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=none;fontSize=9;fontStyle=1;';

  // 1. UI -> Edge Layer
  addEdge(
    'e_ui_edge',
    '',
    'ui_chat',
    'edge_layer',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );

  // 2. Edge Layer -> Identity Platform
  addEdge(
    'e_edge_identity',
    '',
    'edge_layer',
    'identity_auth',
    darkEdge + 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;'
  );

  // 3. Edge Layer -> API Gateway Cloud Run
  addEdge(
    'e_edge_api',
    '',
    'edge_layer',
    'api_cloud_run',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );

  // 4. API Gateway Cloud Run -> Coordinator Agent
  addEdge(
    'e_api_coord',
    '',
    'api_cloud_run',
    'coordinator_agent',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );

  // 5. AI Cluster -> Model Armor & SDP
  addEdge(
    'e_cluster_dlp',
    '',
    'ai_cluster',
    'dlp_model_armor',
    darkEdge + 'exitX=0.92;exitY=0;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;',
    [{ x: 816, y: 248 }]
  );

  // 6. IAM Authorisation <-> Coordinator Agent
  addEdge(
    'e_iam_coord',
    '',
    'iam_auth',
    'coordinator_agent',
    darkEdge +
      'startArrow=block;startFill=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;'
  );

  // 7. Coordinator Agent -> 3 Specialist Agents (A2A)
  addEdge(
    'e_coord_acc',
    'A2A',
    'coordinator_agent',
    'accounts_agent',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;',
    [
      { x: 610, y: 434 },
      { x: 464, y: 434 },
    ]
  );
  addEdge(
    'e_coord_tx',
    '',
    'coordinator_agent',
    'transaction_agent',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );
  addEdge(
    'e_coord_srv',
    'A2A',
    'coordinator_agent',
    'service_agent',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;',
    [
      { x: 610, y: 434 },
      { x: 768, y: 434 },
    ]
  );

  // 8. AI Cluster -> GCP Observability
  addEdge(
    'e_obs_1',
    'OTel AI Tracing &\nDebugging',
    'ai_cluster',
    'obs_container',
    darkEdge + 'exitX=0;exitY=0.58;exitDx=0;exitDy=0;entryX=1;entryY=0.43;entryDx=0;entryDy=0;'
  );
  addEdge(
    'e_obs_2',
    '',
    'ai_cluster',
    'obs_container',
    darkEdge + 'exitX=0;exitY=0.74;exitDx=0;exitDy=0;entryX=1;entryY=0.88;entryDx=0;entryDy=0;',
    [
      { x: 280, y: 496 },
      { x: 280, y: 579 },
    ]
  );

  // 9. AI Cluster <-> Gemini 3.1 Pro / 2.5 Flash & Self-Hosted Open Models
  addEdge(
    'e_cluster_gemini',
    '',
    'ai_cluster',
    'gemini_models',
    darkEdge + 'exitX=1;exitY=0.45;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;',
    [
      { x: 885, y: 424 },
      { x: 885, y: 384 },
    ]
  );

  addEdge(
    'e_cluster_open',
    '',
    'ai_cluster',
    'open_models',
    darkEdge +
      'startArrow=block;startFill=1;exitX=1;exitY=0.60;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;'
  );

  // 10. AI Cluster -> Vector Search 2.0
  addEdge(
    'e_cluster_vector',
    '',
    'ai_cluster',
    'vector_memory',
    darkEdge + 'exitX=1;exitY=0.82;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;',
    [
      { x: 885, y: 515 },
      { x: 885, y: 621 },
    ]
  );

  // 11. 3 Specialist Agents -> 3 Cloud Databases (MCP)
  addEdge(
    'e_acc_spanner',
    'MCP',
    'accounts_agent',
    'db_spanner',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );
  addEdge(
    'e_tx_bigtable',
    'MCP',
    'transaction_agent',
    'db_bigtable',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );
  addEdge(
    'e_srv_firestore',
    'MCP',
    'service_agent',
    'db_firestore',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );

  // 12. 3 Cloud Databases -> 3 Banking Microservice Capability Groups
  addEdge(
    'e_spanner_grp',
    '',
    'db_spanner',
    'grp_accounts',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;',
    [
      { x: 464, y: 694 },
      { x: 379, y: 694 },
    ]
  );
  addEdge(
    'e_bigtable_grp',
    '',
    'db_bigtable',
    'grp_transactions',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;'
  );
  addEdge(
    'e_firestore_grp',
    '',
    'db_firestore',
    'grp_service',
    darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;',
    [
      { x: 771, y: 694 },
      { x: 968, y: 694 },
    ]
  );

  // Optional cumulative AST prompt-added components (for multi-turn Studio prompts)
  const BASELINE_AST_IDS = new Set([
    'comp_armor',
    'comp_glb',
    'comp_gke',
    'comp_vertex',
    'comp_spanner_leader',
    'comp_bigquery',
    'comp_spanner_dr',
    'comp_gcs_backup',
  ]);
  const customAstNodes = (ast?.components || []).filter((c) => !BASELINE_AST_IDS.has(c.id));
  const numRows = Math.ceil(customAstNodes.length / 5);
  const z7Height = customAstNodes.length > 0 ? 44 + numRows * 76 : 0;
  const totalPageHeight = customAstNodes.length > 0 ? 830 + z7Height + 24 : 830;

  if (customAstNodes.length > 0) {
    const extHeader = `<div style="font-family:'Inter',-apple-system,sans-serif;text-align:left;padding:4px 10px;">
      <span style="font-size:10.5px;font-weight:800;color:#0F172A;">Prompt Extensions (${customAstNodes.length})</span>
    </div>`;
    addVertex(
      'z7_custom',
      extHeader,
      24,
      820,
      1216,
      z7Height,
      'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;dashed=1;dashPattern=4 4;verticalAlign=top;align=left;'
    );

    customAstNodes.forEach((comp, idx) => {
      const colIdx = idx % 5;
      const rowIdx = Math.floor(idx / 5);
      const xPos = 40 + colIdx * 238;
      const yPos = 852 + rowIdx * 76;
      const nodeId = `n_custom_${comp.id}`;
      addVertex(
        nodeId,
        compactNodeHtml({
          leftIcon: ICONS.cloudRun,
          title: comp.name,
          line1: `(${comp.service})`,
        }),
        xPos,
        yPos,
        220,
        58,
        'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.8;shadow=1;'
      );
      if (rowIdx === 0 && colIdx === 0) {
        addEdge(
          `e_custom_${comp.id}`,
          'MCP',
          'obs_container',
          nodeId,
          darkEdge + 'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;',
          [{ x: 115, y: yPos + 29 }]
        );
      } else if (rowIdx === 0) {
        const prevComp = customAstNodes[idx - 1];
        addEdge(
          `e_custom_${comp.id}`,
          '',
          `n_custom_${prevComp.id}`,
          nodeId,
          darkEdge + 'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;'
        );
      }
    });
  }

  const diagramTitle =
    options?.projectTitle ||
    ast?.metadata?.projectTitle ||
    'Upgraded GCP & Gemini Enterprise Multi-Agent Architecture';

  const lightXml = `<mxfile host="embed.diagrams.net" modified="2026-09-30T21:08:00.000Z" agent="PromptCanvas-2026-Upgrader" version="24.7.8">
  <diagram id="upgraded-gcp-ge-multi-agent-banking-2026" name="${escAttr(diagramTitle)}">
    <mxGraphModel dx="1280" dy="${totalPageHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1280" pageHeight="${totalPageHeight}" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  if (options?.theme === 'dark') {
    return lightXml
      .replace('background="#FFFFFF"', 'background="#0F172A"')
      .replace(/fillColor=#FFFFFF;strokeColor=#1E293B;/g, 'fillColor=#0F172A;strokeColor=#475569;')
      .replace(/fillColor=#FFFFFF;strokeColor=#334155;/g, 'fillColor=#0F172A;strokeColor=#475569;')
      .replace(/fillColor=#DBEAFE;strokeColor=#60A5FA;/g, 'fillColor=#1E293B;strokeColor=#3B82F6;')
      .replace(/fillColor=#DCFCE7;strokeColor=#4ADE80;/g, 'fillColor=#064E3B;strokeColor=#10B981;')
      .replace(/fillColor=#FEF9C3;strokeColor=#EAB308;/g, 'fillColor=#1E293B;strokeColor=#F59E0B;')
      .replace(/fillColor=#F8FAFC;strokeColor=#94A3B8;/g, 'fillColor=#0F172A;strokeColor=#64748B;')
      .replace(/fillColor=#F8FAFC;strokeColor=#64748B;/g, 'fillColor=#0F172A;strokeColor=#64748B;')
      .replace(/fillColor=#FEE2E2;strokeColor=#F87171;/g, 'fillColor=#450A0A;strokeColor=#F87171;')
      .replace(/fillColor=#E5E7EB;strokeColor=#9CA3AF;/g, 'fillColor=#0F172A;strokeColor=#475569;')
      .replace(/fillColor=#F3F4F6;strokeColor=#6B7280;/g, 'fillColor=#1E293B;strokeColor=#64748B;')
      .replace(
        /strokeColor=#1E293B;strokeWidth=1\.6;endArrow=block;endFill=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;/g,
        'strokeColor=#94A3B8;strokeWidth=1.6;endArrow=block;endFill=1;fontColor=#F8FAFC;labelBackgroundColor=#0F172A;'
      )
      .replace(/color:#0F172A/g, 'color:#F8FAFC')
      .replace(/color:#1E293B/g, 'color:#E2E8F0')
      .replace(/color:#334155/g, 'color:#CBD5E1')
      .replace(/color:#475569/g, 'color:#94A3B8')
      .replace(/color:#7F1D1D/g, 'color:#FECACA')
      .replace(/color:#15803D/g, 'color:#4ADE80')
      .replace(/color:#2563EB/g, 'color:#60A5FA');
  }

  return lightXml;
}

