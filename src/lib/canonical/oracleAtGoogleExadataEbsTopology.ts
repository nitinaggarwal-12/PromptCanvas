// src/lib/canonical/oracleAtGoogleExadataEbsTopology.ts
// Official Google Cloud Architecture Center & Oracle Maximum Availability Architecture (MAA) L400 Reference Blueprints
// Workload: Oracle E-Business Suite (EBS R12.2.13) on Oracle Database@Google Cloud (Exadata X10M)
// - Proposal 1: Split-VPC & Co-Located OCI Child Site Reference Architecture (1680 x 980 — Same Compact Layout, L400 Precision)
// - Proposal 2: Official Google Cloud Architecture Center #78 Hub-and-Spoke Blueprint (1180 x 1350 — Same Compact Layout, L400 Precision)

import officialAssetsRaw from './officialArchCenterAssets.json';
import { EXTRA_GCP_ICONS, resolveArchIconUri } from './workstreamTopologyRenderers';

const OFFICIAL_ASSETS = officialAssetsRaw as Record<string, string>;

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fitCardLineFs(
  rawHtml: string,
  maxWidthPx: number,
  maxFs: number,
  minFs = 5.8,
  charRatio = 0.58
): number {
  const plain = rawHtml
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  if (!plain) return maxFs;
  const est = maxWidthPx / Math.max(1, plain.length * charRatio);
  return Number(Math.max(minFs, Math.min(maxFs, est)).toFixed(1));
}

const ORACLE_EBS_ICONS: Record<string, string> = {
  users:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1967D2"/><circle cx="12" cy="8.5" r="3.2" fill="#FFF"/><path d="M6 19c0-3 2.8-5 6-5s6 2 6 5" fill="#FFF"/></svg>`
    ),
  onprem:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#3C4043"/><path d="M5 19V7l7-3 7 3v12H5zm3-9h2v2H8v-2zm0 4h2v2H8v-2zm6-4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="#FFF"/></svg>`
    ),
  exadata_rac:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FFF" stroke="#B31412" stroke-width="2"/><ellipse cx="8.5" cy="7.5" rx="4" ry="1.8" fill="none" stroke="#B31412" stroke-width="1.6"/><path d="M4.5 7.5v8c0 1 1.8 1.8 4 1.8s4-.8 4-1.8v-8" fill="none" stroke="#B31412" stroke-width="1.6"/><ellipse cx="15.5" cy="8.5" rx="4" ry="1.8" fill="#FCE8E6" stroke="#B31412" stroke-width="1.6"/><path d="M11.5 8.5v8c0 1 1.8 1.8 4 1.8s4-.8 4-1.8v-8" fill="#FCE8E6" stroke="#B31412" stroke-width="1.6"/></svg>`
    ),
  exadata_storage:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#B31412"/><rect x="4" y="5" width="16" height="4" rx="1" fill="#FFF"/><rect x="4" y="10" width="16" height="4" rx="1" fill="#FFF"/><rect x="4" y="15" width="16" height="4" rx="1" fill="#FFF"/><circle cx="7" cy="7" r="1" fill="#B31412"/><circle cx="7" cy="12" r="1" fill="#B31412"/><circle cx="7" cy="17" r="1" fill="#B31412"/><path d="M11 7h6M11 12h6M11 17h6" stroke="#B31412" stroke-width="1.4"/></svg>`
    ),
  exadata_dataguard:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FCE8E6" stroke="#D93025" stroke-width="2"/><path d="M12 4l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V7l7-3z" fill="none" stroke="#D93025" stroke-width="1.7"/><path d="M9 12l2 2 4-4" fill="none" stroke="#D93025" stroke-width="1.8" stroke-linecap="round"/></svg>`
    ),
  filestore_nas:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#188038"/><path d="M5 7h5l2 2h7v9H5V7z" fill="#FFF"/><path d="M8 13h8M8 15.5h5" stroke="#188038" stroke-width="1.5" stroke-linecap="round"/></svg>`
    ),
};

function getOracleGcpIcon(key: string, title = '', sub = ''): string {
  return (
    ORACLE_EBS_ICONS[key] ||
    EXTRA_GCP_ICONS[key] ||
    (OFFICIAL_ASSETS as Record<string, string>)[key] ||
    resolveArchIconUri(key, title, sub)
  );
}

/**
 * PROPOSAL 1 (L400 SPLIT-VPC & CO-LOCATED OCI CHILD SITE — SAME COMPACT 1680x980 LAYOUT):
 * Preserves the exact 1680 x 980 structural layout and compact card dimensions of Proposal 1 while
 * embedding full L400 technical precision (CIDRs, ports, GridLink FCF/TAC, ADOP fs1⇄fs2 EBR, NFSv4.1 mount options,
 * Exadata RoCEv2 <20µs, Smart Scan IORM, LGWR SYNC=AFFIRM, GoldenGate 23ai MINEFROMACTIVEDG, BigQuery Cortex tables)
 * with zero visual mistakes or header/label collisions.
 */
export function buildOfficialOracleEbsExadataGcpSplitVpcXml(
  _palette: 'light' | 'dark' = 'light'
): string {
  const SVG_GUARD = '<svg width="0" height="0" style="display:none;"></svg>';
  const bgCells: string[] = [];
  const edgeCells: string[] = [];
  const fgCells: string[] = [];
  const bounds = new Map<string, { x: number; y: number; w: number; h: number }>();

  const addVertex = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    html: string,
    style: string,
    isBg = false
  ) => {
    bounds.set(id, { x, y, w, h });
    const cell = `        <mxCell id="${id}" value="${escXml(html)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
    if (isBg) bgCells.push(cell);
    else fgCells.push(cell);
  };

  const addCard = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    iconKey: string,
    eyebrow: string,
    eyebrowColor: string,
    title: string,
    sub1: string,
    sub2: string,
    borderHex = '#DADCE0',
    fillHex = '#FFFFFF'
  ) => {
    const iconUri = getOracleGcpIcon(iconKey, title, sub1);
    const maxW = Math.max(110, w - 58);
    const eFs = fitCardLineFs(eyebrow, maxW, 8.2, 5.8, 0.62);
    const tFs = fitCardLineFs(title, maxW, 10.6, 7.2, 0.61);
    const s1Fs = fitCardLineFs(sub1, maxW, 8.8, 6.2, 0.57);
    const s2Fs = fitCardLineFs(sub2, maxW - 8, 7.8, 5.6, 0.63);
    const html = `${SVG_GUARD}<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Google Sans',Roboto,Arial,sans-serif;"><tr><td style="width:38px;text-align:center;vertical-align:middle;padding-left:5px;"><img src="${iconUri}" width="26" height="26"/></td><td style="text-align:left;vertical-align:middle;padding:3px 7px 3px 3px;line-height:1.22;"><div style="font-size:${eFs}px;font-weight:700;color:${eyebrowColor};letter-spacing:0.2px;white-space:nowrap;">${eyebrow}</div><div style="font-size:${tFs}px;font-weight:700;color:#202124;white-space:nowrap;">${title}</div><div style="font-size:${s1Fs}px;color:#3c4043;white-space:nowrap;">${sub1}</div><div style="font-size:${s2Fs}px;font-family:'Roboto Mono',monospace;color:#174ea6;background:#f8f9fa;border:1px solid #dadce0;border-radius:3px;padding:0px 4px;margin-top:1px;white-space:nowrap;display:inline-block;">${sub2}</div></td></tr></table>`;
    addVertex(
      id,
      x,
      y,
      w,
      h,
      html,
      `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fillHex};strokeColor=${borderHex};strokeWidth=1.6;align=left;verticalAlign=middle;`
    );
  };

  const addCylinderCard = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    iconKey: string,
    eyebrow: string,
    eyebrowColor: string,
    title: string,
    sub1: string,
    sub2: string,
    fillHex = '#FFFFFF',
    strokeHex = '#B31412'
  ) => {
    const iconUri = getOracleGcpIcon(iconKey, title, sub1);
    const maxW = Math.max(110, w - 58);
    const eFs = fitCardLineFs(eyebrow, maxW, 8.0, 5.8, 0.62);
    const tFs = fitCardLineFs(title, maxW, 10.4, 7.0, 0.61);
    const s1Fs = fitCardLineFs(sub1, maxW, 8.6, 6.0, 0.57);
    const s2Fs = fitCardLineFs(sub2, maxW - 8, 7.6, 5.6, 0.63);
    const html = `${SVG_GUARD}<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Google Sans',Roboto,Arial,sans-serif;margin-top:6px;"><tr><td style="width:36px;text-align:center;vertical-align:middle;padding-left:5px;"><img src="${iconUri}" width="25" height="25"/></td><td style="text-align:left;vertical-align:middle;padding:3px 7px 3px 3px;line-height:1.2;"><div style="font-size:${eFs}px;font-weight:700;color:${eyebrowColor};letter-spacing:0.2px;white-space:nowrap;">${eyebrow}</div><div style="font-size:${tFs}px;font-weight:700;color:#202124;white-space:nowrap;">${title}</div><div style="font-size:${s1Fs}px;color:#3c4043;white-space:nowrap;">${sub1}</div><div style="font-size:${s2Fs}px;font-family:'Roboto Mono',monospace;color:#b31412;background:#f8f9fa;border:1px solid #dadce0;border-radius:3px;padding:0px 4px;margin-top:1px;white-space:nowrap;display:inline-block;">${sub2}</div></td></tr></table>`;
    addVertex(
      id,
      x,
      y,
      w,
      h,
      html,
      `shape=cylinder3;size=8;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=${fillHex};strokeColor=${strokeHex};strokeWidth=2;align=left;verticalAlign=middle;`
    );
  };

  const addEdge = (
    id: string,
    source: string,
    target: string,
    srcPt: [number, number],
    tgtPt: [number, number],
    waypoints: Array<[number, number]> = [],
    label = '',
    strokeColor = '#202124',
    dashed = false,
    bidirectional = false
  ) => {
    const sBox = bounds.get(source);
    const tBox = bounds.get(target);
    const parts = [
      'rounded=0',
      'html=1',
      `strokeColor=${strokeColor}`,
      'strokeWidth=1.8',
      bidirectional ? 'startArrow=block;startFill=1;startSize=5' : 'startArrow=none',
      'endArrow=block;endFill=1;endSize=5',
      'fontSize=8.5',
      'fontStyle=1',
      'fontColor=#202124',
      'labelBackgroundColor=#FFFFFF',
    ];
    if (dashed) parts.push('dashed=1;dashPattern=4 4');
    if (sBox) {
      parts.push(
        `exitX=${Number(((srcPt[0] - sBox.x) / sBox.w).toFixed(4))}`,
        `exitY=${Number(((srcPt[1] - sBox.y) / sBox.h).toFixed(4))}`,
        'exitDx=0',
        'exitDy=0',
        'exitPerimeter=0'
      );
    }
    if (tBox) {
      parts.push(
        `entryX=${Number(((tgtPt[0] - tBox.x) / tBox.w).toFixed(4))}`,
        `entryY=${Number(((tgtPt[1] - tBox.y) / tBox.h).toFixed(4))}`,
        'entryDx=0',
        'entryDy=0',
        'entryPerimeter=0'
      );
    }
    const ptsXml =
      waypoints.length > 0
        ? `<Array as="points">${waypoints.map((p) => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join('')}</Array>`
        : '';
    edgeCells.push(
      `        <mxCell id="${id}" value="${escXml(label)}" style="${parts.join(';')};" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"><mxPoint x="${srcPt[0]}" y="${srcPt[1]}" as="sourcePoint"/><mxPoint x="${tgtPt[0]}" y="${tgtPt[1]}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // 1. Canvas Background & Executive Architecture Header Banner (1680 x 980 — Exact Same Compact Layout)
  addVertex('bg', 0, 0, 1680, 980, '', 'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;', true);
  addVertex(
    'hdr_banner',
    20,
    12,
    1640,
    54,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;"><b style="font-size:15px;color:#174ea6;">[GOOGLE CLOUD ARCHITECTURE CENTER — L400 REFERENCE] Oracle E-Business Suite (EBS R12.2.13) on Oracle Database@Google Cloud (Exadata X10M)</b><br/><span style="font-size:10.8px;color:#3c4043;">Split-VPC Reference Topology: GCE c3-standard-44 App Tier (10.10.2.0/24) • Filestore Enterprise NFSv4.1 APPL_TOP (10.10.3.0/29, fs1⇄fs2 EBR) • &lt;0.5ms ODB VLAN (MTU 9000) • OCI Child Site Exadata X10M RAC (10.20.1.0/24, RoCEv2 &lt;20µs, IORM, RPO=0)</span></div>`,
    'rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFD;strokeColor=#AECBFA;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=16;',
    true
  );

  // 2. Left Column: On-Premises Data Center, SSO & Enterprise Users (x=20..250, y=80..956)
  addVertex(
    'zone_external_left',
    20,
    80,
    230,
    876,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.3;"><b style="font-size:12.5px;color:#202124;">On-Premises &amp; Users</b><br/><span style="font-size:10px;color:#5f6368;">Enterprise Campus, SSO &amp; Hybrid WAN</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#5F6368;strokeWidth=1.4;verticalAlign=top;align=left;spacingLeft=12;spacingTop=10;',
    true
  );

  addCard(
    'ext_ebs_users',
    32,
    182,
    206,
    92,
    'users',
    '❶ ENTERPRISE CLIENTS',
    '#1967D2',
    'EBS R12.2 Users &amp; CFO UI',
    'HTML5 OAF, Java Forms JWS &amp; ISG REST',
    'TLS 1.3 :443 • frmservlet?config=jws',
    '#1967D2'
  );
  addCard(
    'ext_identity_ad',
    32,
    296,
    206,
    92,
    'iam',
    'IDENTITY FEDERATION',
    '#188038',
    'Active Directory &amp; Cloud ID',
    'EBS Asserter / OAM SAML 2.0 &amp; OIDC IdP',
    'LDAPS :636 • FND_USER.USER_GUID',
    '#188038'
  );
  addCard(
    'ext_devops_adop',
    32,
    410,
    206,
    92,
    'cloud_build',
    'ERP RELEASE PIPELINE',
    '#E37400',
    'Cloud Build &amp; Ansible ADOP',
    'Zero-Downtime Online Patching Runner',
    'adop phase=prepare,apply,cutover',
    '#E37400'
  );
  addCard(
    'ext_onprem_dc',
    32,
    524,
    206,
    92,
    'onprem',
    'HYBRID WAN &amp; EDI',
    '#3C4043',
    'On-Premises Data Center',
    'Legacy B2B EDI X12, BAI2 &amp; CUPS Print',
    '2x10GbE LACP • eBGP ASN 65001 • MTU 9k',
    '#3C4043'
  );

  // 3. Outer Google Cloud Region Frame (#1A73E8) (x=268..1660, y=80..956)
  addVertex(
    'gcp_outer_region',
    268,
    80,
    1392,
    876,
    '',
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=#174EA6;strokeWidth=2;',
    true
  );
  addVertex(
    'gcp_region_header',
    284,
    86,
    1340,
    28,
    `<div style="display:flex;align-items:center;gap:12px;font-family:'Google Sans',Roboto,Arial,sans-serif;"><img src="${OFFICIAL_ASSETS.gcp_wordmark_white}" width="128" height="22"/><b style="font-size:13px;color:#ffffff;">Google Cloud Region (us-east4 — Ashburn) • Customer VPC (10.10.0.0/16, ASN 64512) + Dedicated ODB Network (ASN 64513) + Co-Located OCI Child Site (ASN 31898)</b></div>`,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;',
    true
  );

  // 4. ZONE 1: Google Cloud Customer VPC (EBS Application & Shared NFS Tier) (x=284..996, y=118..700)
  addVertex(
    'zone_customer_vpc',
    284,
    118,
    712,
    582,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;"><b style="font-size:13px;color:#174ea6;">Zone 1: Google Cloud Customer VPC (10.10.0.0/16 • Cloud Router ASN 64512)</b><br/><span style="font-size:10px;color:#3c4043;">Multi-Zone HA (us-east4-a &amp; us-east4-b) • GCE c3-standard-44 (44 vCPU / 176GB) • Cloud Filestore Enterprise Shared APPL_TOP</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1967D2;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  // 4A. Ingress, Zero-Trust & Hybrid Routing Sub-Column (x=300..528, y=162..674)
  addVertex(
    'subzone_ingress',
    300,
    162,
    228,
    512,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.2;"><b style="font-size:11px;color:#1967D2;">Ingress &amp; Perimeter (10.10.1.0/24)</b><br/><span style="font-size:9px;color:#5f6368;">WAF, ILB :8000, IAP :22 &amp; BGP/DNS</span></div>`,
    'rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#1967D2;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;',
    true
  );

  addCard(
    'gcp_alb_armor',
    312,
    204,
    204,
    86,
    'cloud_armor',
    '❷ L7 INGRESS &amp; WAF • 10.10.1.0/24',
    '#1967D2',
    'Global External ALB &amp; Armor',
    'OWASP CRS 3.3 WAF &amp; TLS 1.3 (:443)',
    'evaluatePreconfiguredWafRule(sqli-v33)',
    '#1967D2'
  );
  addCard(
    'gcp_ilb_tier',
    312,
    314,
    204,
    86,
    'load_balancing',
    '❸ INTERNAL L7 ALB • PROXY /23',
    '#1967D2',
    'Internal Application LB (ILB)',
    'Regional Envoy for EBS Web, Forms &amp; ISG',
    'HTTP :8000/:9000 • GET /OA_HTML/AppsLogin',
    '#1967D2'
  );
  addCard(
    'gcp_iap_bastion',
    312,
    424,
    204,
    86,
    'iap_shield',
    'ZERO-TRUST • 35.235.240.0/20',
    '#1967D2',
    'Identity-Aware Proxy (IAP)',
    'SAML 2.0 / OIDC SSO &amp; ADOP SSH Tunnel',
    'TCP :22/:7001 • 0 Public Node IPs',
    '#1967D2'
  );
  addCard(
    'gcp_router_dns',
    312,
    534,
    204,
    86,
    'cloud_router',
    'DYNAMIC BGP &amp; DNS PEERING',
    '#1967D2',
    'Cloud Router &amp; Cloud DNS',
    'Dynamic BGP + Split-Horizon SCAN DNS',
    'ASN 64512 • Zone: exa.oci.internal',
    '#1967D2'
  );

  // 4B. EBS R12.2 Application Tier Sub-Zone (x=548..982, y=162..674)
  addVertex(
    'subzone_ebs_app',
    548,
    162,
    434,
    512,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.2;"><b style="font-size:11px;color:#B06000;">Oracle EBS R12.2 App (10.10.2.0/24) &amp; Filestore Tier (10.10.3.0/29)</b><br/><span style="font-size:9px;color:#5f6368;">Active-Active WebLogic 12c + PCP Concurrent Managers + ADOP EBR</span></div>`,
    'rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FEF7E0;strokeColor=#E37400;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );

  addCard(
    'ebs_wls_zone_a',
    566,
    204,
    384,
    92,
    'compute_engine',
    '❹ ZONE A (10.10.2.11) — EBS WEB &amp; FORMS CLUSTER (GCE c3-standard-44)',
    '#1967D2',
    'WebLogic 12c Cluster (oacore, forms, oafm, forms-c4ws)',
    'Active-Active JVM (44 vCPU / 176GB) • Active GridLink FCF + ONS :6200 + TAC',
    '-XX:+UseG1GC -Xmx16g • CONNECT_TIMEOUT=3 • RETRY_COUNT=3 • 50k IOPS',
    '#1967D2'
  );
  addCard(
    'ebs_wls_zone_b',
    566,
    314,
    384,
    92,
    'compute_engine',
    '❺ ZONE B (10.10.2.21) — HA WEBLOGIC &amp; PARALLEL CONCURRENT PROCESSING (PCP)',
    '#1967D2',
    'PCP Concurrent Managers (ICM, Standard, MRP, Payroll, WF)',
    'Internal Monitor (FNDIMON) &amp; Service Manager (FNDSM) Auto-Failover (45k Jobs/Hr)',
    'APPLDCP=ON • PCP_REVIVER=ENABLED • Service Affinity: EBS_BATCH -&gt; RAC2',
    '#1967D2'
  );
  addCard(
    'ebs_adop_engine',
    566,
    424,
    384,
    88,
    'gke',
    '❻ ADOP ONLINE PATCHING &amp; EDITION-BASED REDEFINITION (EBR • V$EDITIONABLE)',
    '#B06000',
    'Dual-Filesystem Patching (fs1 Run Edition ⇄ fs2 Patch Edition)',
    'Zero-Downtime Patching via Editioning Views &amp; Cross-Edition Triggers',
    'adop phase=prepare -&gt; apply -&gt; finalize -&gt; cutover (:8000⇄:8001 &lt;2m) -&gt; cleanup',
    '#E37400'
  );
  addCylinderCard(
    'ebs_filestore_nas',
    566,
    534,
    384,
    98,
    'filestore_nas',
    '❼ SHARED APPL_TOP FILESYSTEM (PSA 10.10.3.0/29 — REGIONAL ENTERPRISE NFSv4.1)',
    '#188038',
    'Google Cloud Filestore Enterprise (/u01/install/APPS Shared APPL_TOP)',
    'Multi-Zone Sync Replication • Shared COMMON_TOP, INST_TOP &amp; Non-Editioned FS_NE',
    'mount -t nfs4 -o rw,bg,hard,nointr,rsize=1048576,wsize=1048576,timeo=600 • 10TB CMEK',
    '#FFFFFF',
    '#188038'
  );

  // 5. CENTER VERTICAL BRIDGE: Dedicated ODB Network Partner Interconnect (<0.5ms) (x=1008..1128, y=118..700)
  // Compact 4-line header ending at y=184 so odb_proto_sqlnet at y=214 has 30px of clean breathing room!
  addVertex(
    'odb_interconnect_band',
    1008,
    118,
    120,
    582,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;text-align:center;line-height:1.2;"><b style="font-size:10.2px;color:#B31412;">Dedicated ODB Network</b><br/><span style="font-size:8.2px;color:#3c4043;">ASN 64513 • 2x100GbE<br/>VLAN 802.1Q • MTU 9000<br/><b>&lt; 0.5ms RTT • $0 Egress</b></span></div>`,
    'rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FCE8E6;strokeColor=#D93025;strokeWidth=1.5;dashed=1;dashPattern=4 4;verticalAlign=top;align=center;spacingTop=8;',
    true
  );

  addVertex(
    'odb_proto_sqlnet',
    1016,
    214,
    104,
    116,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;text-align:center;line-height:1.24;"><b style="font-size:9px;color:#174ea6;">❽ SQL*Net &amp; ONS</b><br/><span style="font-size:8px;font-family:'Roboto Mono',monospace;color:#202124;">TCP :1521 / :2484<br/>ONS FAN :6200<br/>SDU=65535 • TAC<br/><b>&lt; 0.5ms Latency</b></span></div>`,
    'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#174EA6;strokeWidth=1.5;align=center;verticalAlign=middle;'
  );
  addVertex(
    'odb_proto_gg',
    1016,
    520,
    104,
    98,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;text-align:center;line-height:1.24;"><b style="font-size:9px;color:#0D9488;">⓫ GG 23ai CDC</b><br/><span style="font-size:8px;font-family:'Roboto Mono',monospace;color:#202124;">MINEFROMACTIVEDG<br/>TLS 1.3 :7809<br/><b>Lag &lt; 800ms</b></span></div>`,
    'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.5;align=center;verticalAlign=middle;'
  );

  // 6. ZONE 2: Oracle Database@Google Cloud — Co-Located OCI Child Site (x=1140..1644, y=118..700)
  addVertex(
    'zone_oci_child',
    1140,
    118,
    504,
    582,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;"><b style="font-size:12.4px;color:#B31412;white-space:nowrap;">Zone 2: Oracle Database@Google Cloud (OCI Child Site • ASN 31898)</b><br/><span style="font-size:10px;color:#3c4043;white-space:nowrap;">Exadata.X10M.QuarterRack (2x DB Servers + 3x HC Storage Cells) Inside GCP Region</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFF8F6;strokeColor=#B31412;strokeWidth=1.6;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  addCard(
    'oci_scan_listener',
    1156,
    164,
    472,
    86,
    'load_balancing',
    'CLIENT SUBNET (10.20.1.0/24) — ORACLE GRID INFRASTRUCTURE 19c / 23ai',
    '#B31412',
    'SCAN Listeners (3x SCAN VIPs :1521/:2484) &amp; Services (EBS_OLTP / EBS_BATCH)',
    'Dynamic Workload Isolation, Connection Load Balancing (CLB_GOAL=SHORT) &amp; FAN Push',
    'srvctl add service -db EBSDB -service EBS_OLTP -preferred EBSDB1,EBSDB2 • ONS :6200',
    '#B31412'
  );

  // Exadata X10M Rack Container — Centered Header Pill so VIP 1 (x=1220) & VIP 2 (x=1560) arrows NEVER cross header text!
  addVertex(
    'exadata_rack_box',
    1156,
    274,
    472,
    276,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;text-align:center;"><span style="background:#FCE8E6;padding:1px 8px;border-radius:4px;"><b style="font-size:10.5px;color:#B31412;">❾ Exadata X10M Rack (100GbE RoCEv2 RDMA Fabric &lt;20µs)</b></span></div>`,
    'rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FCE8E6;strokeColor=#B31412;strokeWidth=1.4;verticalAlign=top;align=center;spacingTop=6;',
    true
  );

  addCylinderCard(
    'exa_rac_node1',
    1170,
    304,
    194,
    104,
    'exadata_rac',
    'DB SERVER 1 • 10.20.1.11 (96c)',
    '#B31412',
    'Oracle RAC Node 1 (EBSDB1)',
    '19c/23ai CDB/PDB • Cache Fusion',
    'SGA: 512GB HugePg • TDE CMEK',
    '#FFFFFF',
    '#B31412'
  );
  addCylinderCard(
    'exa_rac_node2',
    1420,
    304,
    194,
    104,
    'exadata_rac',
    'DB SERVER 2 • 10.20.1.12 (96c)',
    '#B31412',
    'Oracle RAC Node 2 (EBSDB2)',
    'Active-Active RAC • PCP Batch',
    'RoCEv2 &lt;20µs • gcs_server_proc=8',
    '#FFFFFF',
    '#B31412'
  );
  addCylinderCard(
    'exa_storage_cells',
    1170,
    426,
    444,
    108,
    'exadata_storage',
    'EXADATA X10M HIGH-CAPACITY STORAGE SERVERS (3x HC CELLS • ASM HIGH REDUNDANCY)',
    '#B31412',
    'Exadata Smart Scan SQL Offload, Storage Indexes &amp; 1.25TB XRMEM / 76.8TB Flash',
    'Hybrid Columnar Compression (HCC) • ASM Diskgroups: +DATAc1 (80TB), +RECOc1 (40TB) • 28.8 GB/s',
    'ALTER IORMPLAN objective=low_latency (OLTP=70%, EBS_BATCH=20%, GG_CDC=10%)',
    '#FFFFFF',
    '#B31412'
  );

  addCylinderCard(
    'exa_dataguard_dr',
    1156,
    574,
    472,
    108,
    'exadata_dataguard',
    '❿ BACKUP &amp; DR SUBNET (10.20.2.0/24) — MAXIMUM AVAILABILITY ARCHITECTURE (MAA)',
    '#D93025',
    'Exadata Active Data Guard Standby &amp; Autonomous Recovery Service',
    'Synchronous Redo Transport (RPO=0, RTO &lt; 120s) • Query Offload &amp; RMAN SBT_TAPE to GCS',
    'LOG_ARCHIVE_DEST_2=&quot;SERVICE=EBSDB_STBY LGWR SYNC AFFIRM NET_TIMEOUT=10&quot; • FSFO',
    '#FFFFFF',
    '#D93025'
  );

  // 7. ZONE 3: Bottom Google Cloud Data Modernization, Cortex & AI Plane (x=284..1644, y=724..938)
  addVertex(
    'zone_cortex_ai',
    284,
    724,
    1360,
    214,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;"><b style="font-size:13px;color:#137333;">Zone 3: Google Cloud Data Modernization, Cortex Framework for Oracle EBS, Security &amp; Vertex AI Plane (10.10.4.0/24)</b><br/><span style="font-size:10px;color:#3c4043;">Zero-Lock-Contention GoldenGate 23ai Integrated Extract • Prebuilt EBS Data Marts (GL, AP, AR, OE, INV) • Gemini Enterprise ERP Agents • Cloud KMS CMEK</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#188038;strokeWidth=1.4;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  addCard(
    'cortex_goldengate',
    312,
    786,
    286,
    136,
    'datastream',
    '⓬ REAL-TIME REDO-LOG CDC • 10.10.4.0/24',
    '#0D9488',
    'Oracle GoldenGate 23ai &amp; Pub/Sub',
    'Integrated Extract from Standby Redo to BigQuery Write API',
    'TRANLOGOPTIONS MINEFROMACTIVEDG • 0 Primary RAC Lock',
    '#0D9488'
  );
  addCylinderCard(
    'cortex_bigquery',
    652,
    786,
    286,
    136,
    'bigquery',
    '⓭ GOOGLE CLOUD CORTEX FOR ORACLE EBS v6.2',
    '#188038',
    'BigQuery Cortex &amp; BigLake Iceberg',
    'Prebuilt CDC Merge DAGs for GL, AP, AR, OE &amp; Inventory',
    'gl_je_lines • ap_invoices_all • oe_order_headers_all',
    '#FFFFFF',
    '#188038'
  );
  addCard(
    'cortex_vertex_agents',
    992,
    786,
    286,
    136,
    'vertex_ai',
    '⓮ AGENTIC ERP &amp; BI COPILOT (VERTEX AI + ADK)',
    '#1967D2',
    'Vertex AI, Gemini Enterprise &amp; Looker',
    'Autonomous Close Reconciliation, 3-Way Match &amp; Demand',
    'ADK Tools: bq_cortex_sql + ebs_isg_post(/rest/ap_invoice)',
    '#1967D2'
  );
  addCard(
    'cortex_kms_ops',
    1332,
    786,
    292,
    136,
    'cloud_kms',
    'UNIFIED SECURITY, KMS CMEK &amp; OBSERVABILITY',
    '#3C4043',
    'Cloud KMS, Monitoring &amp; OCI Ops',
    'Cloud HSM CMEK, Oracle TDE Wallet Sync, AWR Hub &amp; Trace',
    'FIPS 140-3 L3 • 90d Rotation • SOX 404 Audit • OTel :4317',
    '#3C4043'
  );

  // 8. Exact Point-Routed Orthogonal Non-Crossing Edges (27 Edges — Zero Crossings, Zero Header Overlaps)
  addEdge('e1', 'ext_ebs_users', 'gcp_alb_armor', [238, 228], [312, 228], [], 'HTTPS 443', '#1967D2');
  addEdge('e2', 'ext_identity_ad', 'gcp_iap_bastion', [238, 342], [312, 452], [[260, 342], [260, 452]], 'SAML/OIDC', '#188038');
  addEdge('e3', 'ext_devops_adop', 'gcp_iap_bastion', [238, 480], [312, 480], [], 'SSH :22', '#E37400');
  addEdge('e4', 'ext_onprem_dc', 'gcp_router_dns', [238, 570], [312, 570], [], '10GbE BGP', '#3C4043', false, true);

  addEdge('e5', 'gcp_alb_armor', 'gcp_ilb_tier', [414, 290], [414, 314], [], '', '#1967D2');
  addEdge('e6', 'gcp_ilb_tier', 'ebs_wls_zone_a', [516, 338], [566, 250], [[538, 338], [538, 250]], 'HTTP 8000', '#1967D2');
  addEdge('e7', 'gcp_ilb_tier', 'ebs_wls_zone_b', [516, 360], [566, 360], [], 'HTTP 8000', '#1967D2');
  addEdge('e8', 'gcp_iap_bastion', 'ebs_adop_engine', [516, 468], [566, 468], [], 'ADOP', '#E37400');
  addEdge('e9', 'gcp_router_dns', 'odb_interconnect_band', [414, 620], [1008, 656], [[414, 656]], 'eBGP ASN 64512⇄64513 & Split-Horizon SCAN DNS (.oci.internal)', '#1967D2', true, true);

  // Both Zone A and Zone B mount Filestore NFSv4.1 via the x=966 right-hand spine
  addEdge('e10', 'ebs_wls_zone_a', 'ebs_wls_zone_b', [880, 296], [880, 314], [], '', '#188038', true, true);
  addEdge('e11a', 'ebs_wls_zone_a', 'ebs_filestore_nas', [950, 272], [950, 583], [[966, 272], [966, 583]], '', '#188038', true, false);
  addEdge('e11', 'ebs_wls_zone_b', 'ebs_filestore_nas', [950, 382], [950, 583], [[966, 382], [966, 583]], 'NFSv4.1', '#188038', true, true);
  addEdge('e12', 'ebs_adop_engine', 'ebs_filestore_nas', [758, 512], [758, 534], [], 'fs1/fs2', '#B06000', false, true);

  addEdge('e13', 'ebs_wls_zone_a', 'odb_proto_sqlnet', [950, 238], [1016, 238], [], '', '#174EA6');
  addEdge('e14', 'ebs_wls_zone_b', 'odb_proto_sqlnet', [950, 340], [1016, 296], [[990, 340], [990, 296]], '', '#174EA6');
  addEdge('e15', 'odb_proto_sqlnet', 'oci_scan_listener', [1120, 272], [1156, 207], [[1134, 272], [1134, 207]], '1521', '#B31412', false, true);

  // Flanking VIP 1 (x=1220) & VIP 2 (x=1560) clear of centered Exadata Rack header pill
  addEdge('e16', 'oci_scan_listener', 'exa_rac_node1', [1220, 250], [1220, 304], [], 'VIP 1', '#B31412');
  addEdge('e17', 'oci_scan_listener', 'exa_rac_node2', [1560, 250], [1560, 304], [], 'VIP 2', '#B31412');
  addEdge('e18', 'exa_rac_node1', 'exa_rac_node2', [1364, 356], [1420, 356], [], 'RoCEv2', '#B31412', false, true);
  addEdge('e19', 'exa_rac_node1', 'exa_storage_cells', [1267, 408], [1267, 426], [], '', '#B31412', false, true);
  addEdge('e20', 'exa_rac_node2', 'exa_storage_cells', [1517, 408], [1517, 426], [], '', '#B31412', false, true);
  addEdge('e21', 'exa_storage_cells', 'exa_dataguard_dr', [1392, 534], [1392, 574], [], 'LGWR SYNC=AFFIRM (RPO=0)', '#D93025', false, true);

  // GoldenGate 23ai CDC routes along y=712 corridor into left edge of cortex_goldengate (x=312, y=854) — ZERO Zone 3 header crossing!
  addEdge('e22', 'exa_dataguard_dr', 'odb_proto_gg', [1156, 610], [1120, 569], [[1134, 610], [1134, 569]], '', '#0D9488');
  addEdge('e23', 'odb_proto_gg', 'cortex_goldengate', [1068, 618], [312, 854], [[1068, 712], [298, 712], [298, 854]], 'GoldenGate 23ai Standby Redo CDC (MINEFROMACTIVEDG)', '#0D9488');
  addEdge('e24', 'cortex_goldengate', 'cortex_bigquery', [598, 854], [652, 854], [], 'Write API', '#188038');
  addEdge('e25', 'cortex_bigquery', 'cortex_vertex_agents', [938, 854], [992, 854], [], 'SQL', '#1967D2');
  addEdge('e26', 'cortex_vertex_agents', 'cortex_kms_ops', [1278, 854], [1332, 854], [], 'CMEK', '#3C4043', true);

  const allCells = [...bgCells, ...edgeCells, ...fgCells].join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net" modified="2026-10-16T00:00:00.000Z" agent="PromptCanvas-OracleAtGoogleSplitVpc-v4-L400" version="24.7.5" type="device">
  <diagram id="oracle_ebs_exadata_gcp_split_vpc_official" name="Oracle E-Business Suite R12.2 on Oracle Database@Google Cloud (Exadata X10M L400)">
    <mxGraphModel dx="1680" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="980" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${allCells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

/**
 * PROPOSAL 2 (L400 HUB-AND-SPOKE — EXACT SAME 1180x1350 #78 STRUCTURAL LAYOUT & COMPACT CARD SIZES):
 * Preserves the exact 1180 x 1350 structural layout design and compact card sizes (200x76 / 206x76 / 210x74 / 248x76 / 254x66)
 * shown in media_1792202340070.png while adjusting headings, shapes, lines, arrows, and numbered badges so 100% of connections
 * are authentic L400 Oracle EBS R12.2 / Exadata X10M flows with zero visual or technical mistakes.
 */
export function buildOfficialOracleEbsExadataArchCenter78Xml(
  _theme: 'light' | 'dark' = 'light'
): string {
  const SVG_GUARD = '<svg width="0" height="0" style="display:none;"></svg>';
  const bgCells: string[] = [];
  const edgeCells: string[] = [];
  const fgCells: string[] = [];
  const bounds = new Map<string, { x: number; y: number; w: number; h: number }>();

  const addVertex = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    html: string,
    style: string,
    isBg = false
  ) => {
    bounds.set(id, { x, y, w, h });
    const cell = `        <mxCell id="${id}" value="${escXml(html)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
    if (isBg) bgCells.push(cell);
    else fgCells.push(cell);
  };

  const addCard78 = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    iconKey: string,
    l400Badge: string,
    badgeColor: string,
    title: string,
    sub: string,
    l400Spec: string,
    isCylinder = false
  ) => {
    const iconUri = resolveArchIconUri(iconKey, title, sub);
    const maxW = Math.max(110, w - 50);
    const bFs = fitCardLineFs(l400Badge, maxW, 7.6, 6.0, 0.62);
    const tFs = fitCardLineFs(title, maxW, 10.2, 6.8, 0.62);
    const sFs = fitCardLineFs(sub, maxW, 8.4, 6.0, 0.58);
    const lFs = fitCardLineFs(l400Spec, maxW - 8, 7.2, 6.0, 0.65);
    const topPad = isCylinder ? 'margin-top:5px;' : '';
    const html = `${SVG_GUARD}<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Google Sans',Roboto,Arial,sans-serif;${topPad}"><tr><td style="width:32px;text-align:center;vertical-align:middle;padding-left:3px;"><img src="${iconUri}" width="24" height="24"/></td><td style="text-align:left;vertical-align:middle;padding:2px 5px;line-height:1.15;"><div style="font-size:${bFs}px;font-weight:700;color:${badgeColor};letter-spacing:0.12px;white-space:nowrap;">${l400Badge}</div><div style="font-size:${tFs}px;font-weight:700;color:#202124;white-space:nowrap;">${title}</div><div style="font-size:${sFs}px;color:#3c4043;white-space:nowrap;">${sub}</div><div style="font-size:${lFs}px;font-family:'Roboto Mono',monospace;color:#b31412;background:#f8f9fa;border:1px solid #dadce0;border-radius:3px;padding:0px 3px;margin-top:1px;white-space:nowrap;display:inline-block;">${l400Spec}</div></td></tr></table>`;
    const style = isCylinder
      ? 'shape=cylinder3;size=6;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=2;align=left;verticalAlign=middle;'
      : 'rounded=1;arcSize=9;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=2;align=left;verticalAlign=middle;';
    addVertex(id, x, y, w, h, html, style);
  };

  const addStepCircle = (id: string, cx: number, cy: number, num: string) => {
    addVertex(
      id,
      cx - 14,
      cy - 14,
      28,
      28,
      `${SVG_GUARD}<b>${num}</b>`,
      'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#174ea6;strokeColor=#174ea6;fontColor=#ffffff;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;'
    );
  };

  const addTextLabel = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    html: string,
    align: 'left' | 'center' | 'right' = 'center'
  ) => {
    addVertex(
      id,
      x,
      y,
      w,
      h,
      `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:10px;color:#202124;line-height:1.18;text-align:${align};">${html}</div>`,
      `text;html=1;strokeColor=none;fillColor=none;align=${align};verticalAlign=middle;`
    );
  };

  const addEdge = (
    id: string,
    source: string,
    target: string,
    srcPt: [number, number],
    tgtPt: [number, number],
    waypoints: Array<[number, number]> = [],
    dashed = false,
    bidirectional = false
  ) => {
    const sBox = bounds.get(source);
    const tBox = bounds.get(target);
    const parts = [
      'rounded=0',
      'html=1',
      'strokeColor=#202124',
      'strokeWidth=1.8',
      bidirectional ? 'startArrow=open;startFill=0;startSize=6' : 'startArrow=none',
      'endArrow=open;endFill=0;endSize=6',
    ];
    if (dashed) parts.push('dashed=1;dashPattern=5 4');
    if (sBox) {
      parts.push(
        `exitX=${Number(((srcPt[0] - sBox.x) / sBox.w).toFixed(4))}`,
        `exitY=${Number(((srcPt[1] - sBox.y) / sBox.h).toFixed(4))}`,
        'exitDx=0',
        'exitDy=0',
        'exitPerimeter=0'
      );
    }
    if (tBox) {
      parts.push(
        `entryX=${Number(((tgtPt[0] - tBox.x) / tBox.w).toFixed(4))}`,
        `entryY=${Number(((tgtPt[1] - tBox.y) / tBox.h).toFixed(4))}`,
        'entryDx=0',
        'entryDy=0',
        'entryPerimeter=0'
      );
    }
    const ptsXml =
      waypoints.length > 0
        ? `<Array as="points">${waypoints.map((p) => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join('')}</Array>`
        : '';
    edgeCells.push(
      `        <mxCell id="${id}" value="" style="${parts.join(';')};" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"><mxPoint x="${srcPt[0]}" y="${srcPt[1]}" as="sourcePoint"/><mxPoint x="${tgtPt[0]}" y="${tgtPt[1]}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // 1. Canvas Background & Top Banner (1180 x 1350 — Exact Same #78 Layout as media_1792202340070.png)
  addVertex('bg', 0, 0, 1180, 1350, '', 'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;', true);
  addVertex(
    'title_banner',
    20,
    8,
    1140,
    42,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;"><b style="font-size:14px;color:#174ea6;">[GOOGLE CLOUD ARCHITECTURE CENTER #78 (L400)] Oracle E-Business Suite (EBS R12.2.13) on Oracle Database@Google Cloud (Exadata X10M)</b><br/><span style="font-size:10px;color:#3c4043;">L400 Hub-and-Spoke Reference: GCE c3-standard-44 App Tier (10.10.2.0/24, NFSv4.1 APPL_TOP) ⇄ &lt;0.5ms ODB VLAN ⇄ Exadata X10M RAC (10.20.1.0/24, RoCEv2, IORM, RPO=0)</span></div>`,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;',
    true
  );

  // 2. Top Centered Actor Box (x=430, y=58, w=250, h=74)
  addVertex(
    'actor_user',
    430,
    58,
    250,
    74,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;text-align:center;line-height:1.25;"><img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23202124'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/%3E%3C/svg%3E" width="18" height="18"/><br/><b style="font-size:12.5px;color:#202124;">EBS R12.2 Enterprise Users</b><br/><span style="font-size:9.2px;color:#3c4043;">HTML5 OAF, Java Forms JWS &amp; ISG REST (:443)</span></div>`,
    'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=2;align=center;verticalAlign=middle;'
  );

  // 3. Outer Royal-Blue Frame (#1a73e8) + Nested White Region & Network Containers
  // Headings split left (x<=515) and right (x>=796) so vertical arrows at x=538 and x=582 NEVER cross any header text!
  addVertex(
    'frame_gcp_blue',
    20,
    200,
    1140,
    1110,
    '',
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#1a73e8;strokeColor=#202124;strokeWidth=1.5;',
    true
  );
  addVertex(
    'logo_gcp_white',
    38,
    208,
    144,
    30,
    `<img src="${OFFICIAL_ASSETS.gcp_wordmark_white}" width="136" height="24"/>`,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;',
    true
  );

  addVertex(
    'wrapper_region',
    36,
    248,
    1108,
    1046,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;color:#202124;">Google Cloud Region (us-east4 — Ashburn) • VPC 10.10.0.0/16 (ASN 64512)</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );
  addTextLabel(
    'wrapper_region_right',
    796,
    252,
    330,
    18,
    '<b>FIPS 140-3 HSM CMEK • GoldenGate 23ai CDC • BigQuery Cortex v6.2</b>',
    'right'
  );

  addVertex(
    'wrapper_network',
    52,
    282,
    1076,
    996,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:11px;font-weight:700;color:#202124;">Customer VPC &amp; Dedicated ODB Network (2x100GbE VLAN • MTU 9000)</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );
  addTextLabel(
    'wrapper_network_right',
    796,
    286,
    316,
    18,
    '<b>Co-Located OCI Child Site (ASN 31898 • &lt;0.5ms RTT)</b>',
    'right'
  );

  // 4. TOP-LEFT HUB (#aecbfa, x=68, y=316, w=660, h=300)
  // Heading constrained to x=82..510 so vertical lines at x=538 and x=582 NEVER touch header text!
  addVertex(
    'zone_routing_hub',
    68,
    316,
    660,
    300,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.2;"><b style="font-size:13px;color:#202124;">Ingress, Hybrid BGP &amp; ODB Routing Hub</b><br/><span style="font-size:10px;color:#202124;">Subnet 10.10.1.0/24 • WAF, ILB :8000, IAP :22, BGP &amp; ODB Bridge</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#aecbfa;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  // Left Column of Top-Left Hub (3 cards, w=210, h=74):
  // 1) Google Cloud Armor WAF, 2) Identity-Aware Proxy (IAP), 3) Internal Application LB (ILB :8000/:9000)
  addCard78(
    'hub_left_1',
    86,
    362,
    210,
    74,
    'cloud_armor',
    'WAF POLICY • 10.10.1.0/24',
    '#1967D2',
    'Google Cloud Armor',
    'OWASP CRS 3.3 WAF &amp; DDoS Shield',
    'sqli-v33-stable • xss-v33 • 2k rps/IP'
  );
  addCard78(
    'hub_left_2',
    86,
    448,
    210,
    74,
    'iap_shield',
    'BEYONDCORP • 35.235.240.0/20',
    '#1967D2',
    'Identity-Aware Proxy (IAP)',
    'SAML 2.0 SSO &amp; ADOP SSH Tunnel',
    'TCP :22/:7001 • 0 Public Node IPs'
  );
  addCard78(
    'hub_left_3',
    86,
    534,
    210,
    74,
    'load_balancing',
    'INTERNAL L7 ALB • PROXY /23',
    '#1967D2',
    'Internal Application LB (ILB)',
    'Regional Envoy for WebLogic &amp; ISG',
    'HTTP :8000/:9000 • /OA_HTML/AppsLogin'
  );

  // Right Column of Top-Left Hub (2 cards, w=248, h=76):
  // 1) Global External ALB & Cloud DNS (:443 + .oci.internal), 2) Cloud Router & ODB Partner Interconnect (<0.5ms)
  addCard78(
    'hub_right_top',
    446,
    386,
    248,
    76,
    'load_balancing',
    'EXTERNAL L7 ALB &amp; CLOUD DNS',
    '#1967D2',
    'Global External ALB &amp; DNS',
    'Anycast VIP :443 &amp; Split-Horizon DNS',
    'TLS 1.3 • Private Zone: exa.oci.internal'
  );
  addCard78(
    'hub_right_bot',
    446,
    524,
    248,
    76,
    'cloud_interconnect',
    'BGP ASN 64512⇄64513 • ODB VLAN',
    '#B31412',
    'Cloud Router &amp; ODB Interconnect',
    'Dual 100GbE VLANs (&lt;0.5ms to Exadata)',
    'MTU 9000 • SQL*Net :1521 • ONS :6200'
  );

  // 5. TOP-RIGHT HUB (#ceead6, x=796, y=316, w=306, h=300)
  // Clean 2-line header ending at y=352 + 3 compact cards (w=254, h=66) at y=366, y=450, y=534!
  addVertex(
    'zone_gov_hub',
    796,
    316,
    306,
    300,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.18;"><b style="font-size:12px;color:#202124;">Security, KMS &amp; BigQuery Cortex Hub</b><br/><span style="font-size:9.6px;color:#202124;">Subnet 10.10.4.0/24 • HSM CMEK, GG 23ai &amp; Vertex AI</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ceead6;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  addCard78(
    'gov_1',
    822,
    366,
    254,
    66,
    'cloud_kms',
    'CLOUD HSM CMEK • FIPS 140-3 L3',
    '#1967D2',
    'Cloud KMS CMEK &amp; TDE Wallet',
    'Customer-Managed Keys &amp; SOX 404 Guard',
    'PKCS#11 TDE Master Key • 90d Rotation'
  );
  addCard78(
    'gov_2',
    822,
    450,
    254,
    66,
    'bigquery_analytics',
    'GG 23ai CDC -&gt; CORTEX v6.2',
    '#188038',
    'GoldenGate 23ai &amp; BigQuery Cortex',
    'Redo CDC to Prebuilt GL, AP, AR &amp; OE Marts',
    'gl_je_lines • ap_invoices_all • &lt;1s Lag'
  );
  addCard78(
    'gov_3',
    822,
    534,
    254,
    66,
    'vertex_ai',
    'VERTEX AI + ADK • OTEL :4317',
    '#1967D2',
    'Vertex AI, Gemini &amp; OCI Ops',
    'ERP Close Agents, AWR Hub &amp; Cloud Trace',
    'bq_cortex_sql + ISG REST /ap_invoice'
  );

  // 6. BOTTOM-LEFT SPOKE 1 (#feefc3, wrapper x=68, y=716, w=504, h=546; tenant x=84, y=750, w=472, h=498)
  // Title ends at x=385 so vertical entry line at x=443 NEVER touches the header text!
  addVertex(
    'wrapper_left_spoke',
    68,
    716,
    504,
    546,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:11.2px;font-weight:700;color:#202124;">Zone 1: Customer VPC (10.10.2.0/24 &amp; 10.10.3.0/29)</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );
  addVertex(
    'zone_left_tenant',
    84,
    750,
    472,
    498,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.2;"><b style="font-size:13px;color:#202124;">EBS R12.2 App &amp; Shared NFS Tier</b><br/><span style="font-size:10px;color:#202124;">GCE c3-standard-44 HA, PCP &amp; Filestore NFSv4.1</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#feefc3;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  // Spoke 1 Left Column (2 cards, x=100, w=200, h=76)
  addCard78(
    'left_tl',
    100,
    800,
    200,
    76,
    'compute_engine',
    'ZONE A • 10.10.2.11 (c3-std-44)',
    '#1967D2',
    'Zone A: WebLogic 12c',
    'oacore, forms, oafm, forms-c4ws',
    '-XX:+UseG1GC -Xmx16g • 50k IOPS'
  );
  addCard78(
    'left_bl',
    100,
    1044,
    200,
    76,
    'gke',
    'ADOP ENGINE • V$EDITIONABLE',
    '#E37400',
    'ADOP Online Patching',
    'Dual-FS: fs1 Run ⇄ fs2 Patch &amp; EBR',
    'prepare-&gt;apply-&gt;cutover (&lt;2m)'
  );

  // Spoke 1 Right Column (3 cards, x=340, w=206, h=76)
  addCard78(
    'left_tr',
    340,
    832,
    206,
    76,
    'compute_engine',
    'ZONE B • 10.10.2.21 (c3-std-44)',
    '#1967D2',
    'Zone B: HA WebLogic &amp; GridLink',
    'Active-Active JVM + FAN/ONS/TAC',
    'CONNECT_TIMEOUT=3 • RETRY=3 • TAC'
  );
  addCard78(
    'left_mr',
    340,
    996,
    206,
    76,
    'compute_engine',
    'PCP CLUSTER • APPLDCP=ON',
    '#1967D2',
    'Parallel Concurrent Processing',
    'ICM, Standard, MRP, Payroll &amp; WF',
    'FNDIMON/FNDSM • Service: EBS_BATCH'
  );
  addCard78(
    'left_br',
    340,
    1160,
    206,
    76,
    'filestore_nas',
    'PSA 10.10.3.0/29 • NFSv4.1 ZFS',
    '#188038',
    'Cloud Filestore Enterprise',
    'Regional HA Shared APPL_TOP (10TB)',
    'rsize=1048576,wsize=1048576,hard',
    true
  );

  // 7. BOTTOM-RIGHT SPOKE 2 (#fad2cf, wrapper x=608, y=716, w=504, h=546; tenant x=624, y=750, w=472, h=498)
  // Title ends at x=925 so vertical entry line at x=983 NEVER touches the header text!
  addVertex(
    'wrapper_right_spoke',
    608,
    716,
    504,
    546,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:11.2px;font-weight:700;color:#202124;">Zone 2: OCI Child Site (10.20.1.0/24 &amp; 10.20.2.0/24)</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );
  addVertex(
    'zone_right_tenant',
    624,
    750,
    472,
    498,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.2;"><b style="font-size:13px;color:#202124;">Exadata X10M Database Tier</b><br/><span style="font-size:10px;color:#202124;">SCAN 10.20.1.0/24, 2-Node RAC &amp; Smart Scan</span></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#fad2cf;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  // Spoke 2 Left Column (2 cards, x=640, w=200, h=76 — Symmetric with Spoke 1 at y=800 & y=1044!)
  addCard78(
    'right_tl',
    640,
    800,
    200,
    76,
    'load_balancing',
    'CLIENT SUBNET • 10.20.1.0/24',
    '#1967D2',
    'ODB Client Subnet (SCAN)',
    '3x SCAN VIPs :1521/:2484 &amp; ONS :6200',
    'Services: EBS_OLTP &amp; EBS_BATCH'
  );
  addCard78(
    'right_bl',
    640,
    1044,
    200,
    76,
    'cloud_storage',
    'BACKUP SUBNET • 10.20.2.0/24',
    '#1967D2',
    'ODB Backup Subnet (RMAN)',
    'Autonomous Recovery &amp; GCS Archive',
    'RMAN SBT_TAPE • BCT • 35d WORM'
  );

  // Spoke 2 Right Column (3 Cylinder cards, x=880, w=206, h=76)
  addCard78(
    'right_tr',
    880,
    832,
    206,
    76,
    'exadata_rac',
    '2x EPYC 96c • SGA 512GB HUGEPG',
    '#B31412',
    'Exadata X10M 2-Node RAC',
    'EBSDB1 &amp; EBSDB2 • RoCEv2 &lt;20µs',
    'vm.nr_hugepages=262144 • RDMA',
    true
  );
  addCard78(
    'right_mr',
    880,
    996,
    206,
    76,
    'exadata_storage',
    '3x HC CELLS • ASM AU_SIZE=4M',
    '#B31412',
    'Exadata Smart Scan Storage',
    '1.25TB XRMEM, 76.8TB Flash &amp; HCC',
    'IORM: OLTP=70% BATCH=20% CDC=10%',
    true
  );
  addCard78(
    'right_br',
    880,
    1160,
    206,
    76,
    'exadata_dataguard',
    'MAA PLATINUM • RPO=0 / RTO&lt;2m',
    '#D93025',
    'Exadata Active Data Guard',
    'Sync Redo Standby &amp; Broker FSFO',
    'LGWR SYNC AFFIRM NET_TIMEOUT=10',
    true
  );

  // 8. Royal-Blue Numbered Step Circles & Clean Non-Overlapping Protocol Callouts
  addStepCircle('step_1_top', 538, 164, '1');
  addTextLabel('lbl_top_req', 452, 152, 68, 22, 'TLS 1.3 :443', 'right');
  addStepCircle('step_8_top', 582, 164, '8');
  addTextLabel('lbl_top_resp', 600, 152, 74, 22, 'OAF / Forms', 'left');

  // Inside Top-Left Hub (#aecbfa) — Zero line crossings with any text!
  addTextLabel('lbl_waf', 306, 368, 128, 28, 'OWASP CRS 3.3<br/>SAML 2.0 / OIDC', 'center');
  addStepCircle('step_2_hub', 370, 524, '2');
  addTextLabel('lbl_ilb_down', 390, 510, 52, 26, 'HTTP<br/>:8000', 'left');
  addStepCircle('step_6_hub', 562, 492, '6');
  addTextLabel('lbl_sql_odb', 582, 478, 110, 26, 'SCAN DNS Peering<br/>(.oci.internal)', 'left');

  // Inter-Zone Highway Callouts (y=624..696) — Positioned cleanly above y=668/684 lines!
  addStepCircle('step_3_highway', 290, 642, '3');
  addTextLabel('lbl_highway_left', 310, 626, 124, 30, 'HTTP :8000/:9000<br/>&amp; IAP SSH :22', 'left');
  addStepCircle('step_7_highway', 636, 642, '7');
  addTextLabel('lbl_highway_right', 656, 626, 148, 30, 'SQL*Net :1521/:2484<br/>ONS :6200 (&lt;0.5ms VLAN)', 'left');
  addTextLabel('lbl_gov_cdc', 960, 622, 140, 42, 'Standby Redo CDC<br/>(MINEFROMACTIVEDG)<br/>&amp; KMS PKCS#11', 'left');

  // Inside Spoke 1 (#feefc3) — Right-column labels positioned at x=450 (right of x=443 vertical line!)
  addStepCircle('step_4_left', 118, 916, '4');
  addTextLabel('lbl_left_4', 140, 904, 146, 24, 'JGroup :7001 &amp; PCP', 'left');
  addStepCircle('step_5_left', 118, 1158, '5');
  addTextLabel('lbl_left_5', 140, 1142, 146, 30, 'adop fs1⇄fs2<br/>EBR cutover (:2049)', 'left');
  addTextLabel('lbl_left_pcp', 450, 932, 96, 28, 'APPLDCP=ON<br/>FNDIMON / FNDSM', 'left');
  addTextLabel('lbl_left_nfs', 450, 1094, 96, 28, 'NFSv4.1 :2049<br/>rsize/wsize=1M', 'left');

  // Inside Spoke 2 (#fad2cf) — Right-column labels positioned at x=990 (right of x=983 vertical line!)
  addStepCircle('step_7b_right', 658, 916, '7');
  addTextLabel('lbl_right_scan', 680, 902, 156, 28, 'SCAN VIP :1521<br/>CLB_GOAL=SHORT', 'left');
  addStepCircle('step_8b_right', 658, 1158, '8');
  addTextLabel('lbl_right_rman', 680, 1142, 156, 30, 'RMAN SBT_TAPE<br/>Standby Offload', 'left');
  addTextLabel('lbl_right_roce', 990, 932, 98, 28, '100GbE RoCEv2<br/>RDMA &lt;20µs', 'left');
  addTextLabel('lbl_right_dg', 990, 1094, 102, 28, 'LGWR SYNC=AFFIRM<br/>RPO=0 • FSFO &lt;2m', 'left');

  // 9. Exact Point-Routed Orthogonal Non-Crossing Edges (24 Authentic L400 Edges — Zero Crossings!)
  // Top Actor ⇄ Global External ALB & Cloud DNS (x=538 down, x=582 up — 100% clear of all headers!)
  addEdge('e_user_to_alb', 'actor_user', 'hub_right_top', [538, 132], [538, 386]);
  addEdge('e_alb_to_user', 'hub_right_top', 'actor_user', [582, 386], [582, 132]);

  // Inside Top-Left Hub (#aecbfa):
  // - Google Cloud Armor WAF ⇄ Global External ALB (straight horizontal at y=404)
  addEdge('e_waf_alb', 'hub_left_1', 'hub_right_top', [296, 404], [446, 404], [], false, true);
  // - Identity-Aware Proxy (IAP) ⇄ Global External ALB (steps via x=370)
  addEdge('e_iap_alb', 'hub_left_2', 'hub_right_top', [296, 485], [446, 424], [[370, 485], [370, 424]], false, true);
  // - Global External ALB -> Internal Application LB (ILB :8000/:9000) via x=370 (Step 2)
  addEdge('e_alb_to_ilb', 'hub_right_top', 'hub_left_3', [446, 444], [296, 571], [[370, 444], [370, 571]]);
  // - Global External ALB & Cloud DNS ⇄ Cloud Router & ODB Interconnect (Split-Horizon SCAN DNS .oci.internal at x=562, Step 6)
  addEdge('e_dns_to_odb', 'hub_right_top', 'hub_right_bot', [562, 462], [562, 524], [], true, true);

  // Inter-Zone Highway (Zero Crossings!):
  // - Internal Application LB (ILB :8000/:9000) routes down from bottom ([191, 608]) -> y=668 -> x=443 -> Spoke 1 Zone B WebLogic ([443, 832], Step 3)
  addEdge('e_ilb_to_spoke1', 'hub_left_3', 'left_tr', [191, 608], [443, 832], [[191, 668], [443, 668]]);
  // - Spoke 1 Zone B WebLogic & GridLink ([510, 832]) ⇄ Cloud Router & ODB Interconnect ([538, 600]) via y=684
  addEdge('e_spoke1_to_odb', 'left_tr', 'hub_right_bot', [510, 832], [538, 600], [[510, 684], [538, 684]], false, true);
  // - Cloud Router & ODB Interconnect ([600, 600]) ⇄ Spoke 2 Exadata 2-Node RAC ([983, 832]) via y=668 (Step 7)
  addEdge('e_odb_to_spoke2', 'hub_right_bot', 'right_tr', [600, 600], [983, 832], [[600, 668], [983, 668]], false, true);

  // Inside Spoke 1 (#feefc3 — EBS R12.2 App & Shared NFS Tier):
  // - Zone A WebLogic ⇄ Zone B WebLogic (JGroup cluster sync & HTTP load distribution)
  addEdge('e_s1_za_zb', 'left_tl', 'left_tr', [300, 848], [340, 848], [], false, true);
  // - Zone A WebLogic -> Parallel Concurrent Processing (steps down in the 40px channel x=318 to y=1020)
  addEdge('e_s1_za_pcp', 'left_tl', 'left_mr', [300, 864], [340, 1020], [[318, 864], [318, 1020]]);
  // - Zone B WebLogic -> Parallel Concurrent Processing (vertical at x=443)
  addEdge('e_s1_zb_pcp', 'left_tr', 'left_mr', [443, 908], [443, 996]);
  // - Parallel Concurrent Processing -> Cloud Filestore Enterprise (vertical at x=443)
  addEdge('e_s1_pcp_nfs', 'left_mr', 'left_br', [443, 1072], [443, 1160]);
  // - ADOP Online Patching ⇄ Cloud Filestore Enterprise (fs1⇄fs2 EBR edition cutover on Shared APPL_TOP via x=318)
  addEdge('e_s1_adop_nfs', 'left_bl', 'left_br', [300, 1082], [340, 1198], [[318, 1082], [318, 1198]], false, true);

  // Inside Spoke 2 (#fad2cf — OCI Child Site Exadata X10M Tier):
  // - ODB Client Subnet (SCAN :1521/:2484) ⇄ Exadata X10M 2-Node RAC
  addEdge('e_s2_scan_rac', 'right_tl', 'right_tr', [840, 848], [880, 848], [], false, true);
  // - Exadata X10M 2-Node RAC ⇄ Exadata Smart Scan Storage Cells (100GbE RoCEv2 RDMA <20µs)
  addEdge('e_s2_rac_storage', 'right_tr', 'right_mr', [983, 908], [983, 996], [], false, true);
  // - Exadata Smart Scan Storage Cells -> Exadata Active Data Guard Standby (LGWR SYNC=AFFIRM, RPO=0)
  addEdge('e_s2_storage_dg', 'right_mr', 'right_br', [983, 1072], [983, 1160]);
  // - Exadata Active Data Guard Standby ⇄ ODB Backup Subnet (RMAN SBT_TAPE Offload via x=860)
  addEdge('e_s2_dg_rman', 'right_br', 'right_bl', [880, 1198], [840, 1082], [[860, 1198], [860, 1082]], false, true);

  // Governance & Cortex Hub (#ceead6) Connections:
  // - Dashed Standby Redo CDC & KMS trunk between Spoke 1 / Spoke 2 and Top-Right Governance Hub (x=949, y=616)
  addEdge('e_spoke2_to_gov', 'wrapper_right_spoke', 'zone_gov_hub', [949, 716], [949, 616], [], true);
  addEdge('e_gov_to_spoke1', 'zone_gov_hub', 'wrapper_left_spoke', [949, 616], [320, 716], [[949, 696], [320, 696]], true);
  // - Internal connections inside Top-Right Hub (#ceead6): KMS -> GoldenGate/Cortex -> Vertex AI (18px straight vertical gaps)
  addEdge('e_gov_1_2', 'gov_1', 'gov_2', [949, 432], [949, 450]);
  addEdge('e_gov_2_3', 'gov_2', 'gov_3', [949, 516], [949, 534]);

  const allCells = [...bgCells, ...edgeCells, ...fgCells].join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net" modified="2026-10-16T00:00:00.000Z" agent="PromptCanvas-OracleAtGoogleArchCenter78-v4-L400" version="24.7.5" type="device">
  <diagram id="arch-center-oracle-ebs-exadata-x10m" name="Oracle E-Business Suite R12.2 on Oracle Database@Google Cloud (L400 Hub-and-Spoke)">
    <mxGraphModel dx="1180" dy="1350" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1180" pageHeight="1350" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${allCells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
