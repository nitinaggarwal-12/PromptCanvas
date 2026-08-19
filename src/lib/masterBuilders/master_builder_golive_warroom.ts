/**
 * MASTER BLUEPRINT 31: GO-LIVE CUTOVER & WAR ROOM RUNBOOK
 * Native editable mxGraph/Draw.io implementation aligned to the approved visual reference.
 */

const GCP_LOGO = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2078%2052%22%3E%0A%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M30%2045h31a13%2013%200%200%200%201.8-25.9A20%2020%200%200%200%2025%2016.4%2014%2014%200%200%200%2030%2045z%22%2F%3E%0A%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M25%2016.4A20%2020%200%200%201%2042%206l5.7%2010H30z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M25%2016.4A14%2014%200%200%200%2015%2030l11%202%208-13z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M30%2045h13l-3-11-14-2z%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_CHECKLIST = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Crect%20x%3D%2213%22%20y%3D%229%22%20width%3D%2238%22%20height%3D%2246%22%20rx%3D%226%22%20fill%3D%22none%22%20stroke%3D%22%230B5CC4%22%20stroke-width%3D%224%22%2F%3E%0A%3Crect%20x%3D%2224%22%20y%3D%225%22%20width%3D%2216%22%20height%3D%229%22%20rx%3D%223%22%20fill%3D%22%230B5CC4%22%2F%3E%0A%3Cpath%20d%3D%22M20%2024l4%204%207-8M20%2036l4%204%207-8M20%2048l4%204%207-8%22%20fill%3D%22none%22%20stroke%3D%22%230B5CC4%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3Cpath%20d%3D%22M35%2025h10M35%2037h10M35%2049h10%22%20stroke%3D%22%230B5CC4%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_PEOPLE = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Ccircle%20cx%3D%2232%22%20cy%3D%2217%22%20r%3D%229%22%20fill%3D%22%2308933B%22%2F%3E%3Ccircle%20cx%3D%2215%22%20cy%3D%2222%22%20r%3D%227%22%20fill%3D%22%2308933B%22%2F%3E%3Ccircle%20cx%3D%2249%22%20cy%3D%2222%22%20r%3D%227%22%20fill%3D%22%2308933B%22%2F%3E%0A%3Crect%20x%3D%2223%22%20y%3D%2229%22%20width%3D%2218%22%20height%3D%2224%22%20rx%3D%228%22%20fill%3D%22%2308933B%22%2F%3E%3Crect%20x%3D%226%22%20y%3D%2233%22%20width%3D%2214%22%20height%3D%2219%22%20rx%3D%227%22%20fill%3D%22%2308933B%22%2F%3E%3Crect%20x%3D%2244%22%20y%3D%2233%22%20width%3D%2214%22%20height%3D%2219%22%20rx%3D%227%22%20fill%3D%22%2308933B%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_SHIELD = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Cpath%20d%3D%22M32%206L52%2014v14c0%2014-8%2024-20%2030C20%2052%2012%2042%2012%2028V14z%22%20fill%3D%22none%22%20stroke%3D%22%235A26B8%22%20stroke-width%3D%224%22%2F%3E%0A%3Cpath%20d%3D%22M22%2031l7%207%2014-16%22%20fill%3D%22none%22%20stroke%3D%22%235A26B8%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_ROCKET = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Cpath%20d%3D%22M39%208c8%201%2014%207%2015%2015L35%2042l-13-13z%22%20fill%3D%22%230B5CC4%22%2F%3E%3Ccircle%20cx%3D%2241%22%20cy%3D%2221%22%20r%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M24%2029l-10%204-5%2012%2015-3zM35%2040l-3%2015%2012-5%204-10z%22%20fill%3D%22%236BA8F7%22%2F%3E%0A%3Cpath%20d%3D%22M24%2043c-7%200-11%205-12%2012%207-1%2012-5%2012-12z%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_PULSE = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%2222%22%20fill%3D%22none%22%20stroke%3D%22%23078C3B%22%20stroke-width%3D%224%22%2F%3E%0A%3Cpath%20d%3D%22M10%2032h12l5-10%207%2018%206-12%205%204h9%22%20fill%3D%22none%22%20stroke%3D%22%23078C3B%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3Cpath%20d%3D%22M46%2046l11%2011%22%20stroke%3D%22%23078C3B%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_HEADSET = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Cpath%20d%3D%22M12%2034v-6C12%2016%2021%207%2032%207s20%209%2020%2021v6%22%20fill%3D%22none%22%20stroke%3D%22%234C20A5%22%20stroke-width%3D%225%22%2F%3E%0A%3Crect%20x%3D%228%22%20y%3D%2231%22%20width%3D%2211%22%20height%3D%2220%22%20rx%3D%225%22%20fill%3D%22%234C20A5%22%2F%3E%3Crect%20x%3D%2245%22%20y%3D%2231%22%20width%3D%2211%22%20height%3D%2220%22%20rx%3D%225%22%20fill%3D%22%234C20A5%22%2F%3E%0A%3Cpath%20d%3D%22M52%2047c0%207-6%2010-14%2010h-4%22%20fill%3D%22none%22%20stroke%3D%22%234C20A5%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2231%22%20cy%3D%2257%22%20r%3D%224%22%20fill%3D%22%234C20A5%22%2F%3E%0A%3C%2Fsvg%3E';
const ICON_WARNING = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%3Cpath%20d%3D%22M32%207L59%2055H5z%22%20fill%3D%22%23E32626%22%2F%3E%3Crect%20x%3D%2229%22%20y%3D%2221%22%20width%3D%226%22%20height%3D%2220%22%20rx%3D%223%22%20fill%3D%22white%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2248%22%20r%3D%223.5%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E';

function v(id: string, value: string, style: string, x: number, y: number, w: number, h: number): string {
  return `<mxCell id="${id}" value="${value}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}

function image(id: string, dataUri: string, x: number, y: number, w: number, h: number): string {
  return v(id, '', `shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=${dataUri};strokeColor=none;fillColor=none;`, x, y, w, h);
}

function bulletHtml(items: string[]): string {
  return items.map(item => `• ${item}`).join('&lt;br&gt;');
}

function pill(id: string, label: string, x: number, color: string, fill: string, symbol: string): string {
  return v(
    id,
    `&lt;b style=&quot;font-size:18px;color:${color};&quot;&gt;${symbol}&lt;/b&gt;&amp;nbsp;&amp;nbsp;&lt;b&gt;${label}&lt;/b&gt;`,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${color};strokeWidth=1.2;fontColor=${color};fontSize=10;align=center;verticalAlign=middle;arcSize=8;`,
    x, 20, 134, 48
  );
}

type StageConfig = {
  id: string;
  number: string;
  title: string;
  x: number;
  w: number;
  color: string;
  fill: string;
  icon: string;
  bullets?: string[];
  deliverable: string;
  special?: 'gate';
};

function stageXml(s: StageConfig): string {
  const y = 102;
  let out = '';
  out += v(`${s.id}_bg`, '', `rounded=1;whiteSpace=wrap;html=1;fillColor=${s.fill};strokeColor=${s.color};strokeWidth=1.5;arcSize=4;`, s.x, y, s.w, 370);
  out += v(`${s.id}_num`, `&lt;b&gt;${s.number}&lt;/b&gt;`, `ellipse;whiteSpace=wrap;html=1;fillColor=${s.color};strokeColor=${s.color};fontColor=#FFFFFF;fontSize=19;fontStyle=1;align=center;verticalAlign=middle;`, s.x + 10, y + 8, 36, 36);
  out += v(`${s.id}_title`, `&lt;b&gt;${s.title}&lt;/b&gt;`, `text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=${s.color};fontSize=12;fontStyle=1;`, s.x + 50, y + 8, s.w - 58, 48);
  out += image(`${s.id}_icon`, s.icon, s.x + (s.w - 64) / 2, y + 60, 64, 64);

  if (s.special === 'gate') {
    out += v(`${s.id}_reviewers`, `&lt;b style=&quot;color:${s.color};&quot;&gt;Decision Gate Reviewers&lt;/b&gt;&lt;br&gt;👤 Cutover Commander&lt;br&gt;👤 SRE Lead&lt;br&gt;👤 App Lead&lt;br&gt;👤 DB Lead&lt;br&gt;👤 Security Lead&lt;br&gt;👤 Business Owner`,
      `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.2;fontColor=#3B246C;fontSize=9.5;align=left;verticalAlign=top;spacing=7;arcSize=6;`,
      s.x + 10, y + 132, s.w - 20, 112);
    out += v(`${s.id}_go`, `&lt;b&gt;GO&lt;br&gt;FORWARD&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:18px;&quot;&gt;✓&lt;/span&gt;`,
      `rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.3;fontColor=#15803D;fontSize=10;align=center;verticalAlign=middle;arcSize=8;`,
      s.x + 10, y + 254, 82, 72);
    out += v(`${s.id}_or`, `&lt;b&gt;OR&lt;/b&gt;`, `text;html=1;align=center;verticalAlign=middle;fontColor=#334155;fontSize=10;`, s.x + 94, y + 276, 18, 24);
    out += v(`${s.id}_hold`, `&lt;b&gt;HOLD /&lt;br&gt;ROLLBACK&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:18px;&quot;&gt;✕&lt;/span&gt;`,
      `rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.3;fontColor=#DC2626;fontSize=10;align=center;verticalAlign=middle;arcSize=8;`,
      s.x + 114, y + 254, 82, 72);
  } else {
    out += v(`${s.id}_details`, bulletHtml(s.bullets || []),
      `text;html=1;whiteSpace=wrap;align=left;verticalAlign=top;fontColor=#23364D;fontSize=9.5;spacingLeft=4;spacingTop=2;`,
      s.x + 10, y + 136, s.w - 20, 186);
  }

  out += v(`${s.id}_deliverable`, `&lt;b&gt;${s.deliverable}&lt;/b&gt;`,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${s.color};strokeColor=${s.color};fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;arcSize=5;`,
    s.x + 8, y + 336, s.w - 16, 26);
  return out;
}

function serviceChip(id: string, code: string, name: string, x: number): string {
  let out = '';
  out += v(`${id}_icon`, `&lt;b&gt;${code}&lt;/b&gt;`, 'rounded=1;whiteSpace=wrap;html=1;fillColor=#EAF2FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1A73E8;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;arcSize=6;', x + 16, 640, 38, 34);
  out += v(`${id}_name`, `&lt;b&gt;${name}&lt;/b&gt;`, 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=top;fontColor=#213A63;fontSize=8.2;', x, 678, 70, 29);
  return out;
}

function metricCard(id: string, symbol: string, label: string, value: string, x: number, color: string): string {
  return v(id, `&lt;span style=&quot;font-size:20px;color:${color};&quot;&gt;${symbol}&lt;/span&gt;&lt;br&gt;&lt;b&gt;${label}&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:${color};&quot;&gt;${value}&lt;/b&gt;`,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C7D4E5;strokeWidth=1;fontColor=#263A56;fontSize=8.6;align=center;verticalAlign=middle;arcSize=5;`,
    x, 635, 112, 62);
}

export function buildGoLiveWarRoomRunbookXml(): string {
  const stages: StageConfig[] = [
    {
      id: 's1', number: '1', title: 'T-24h&lt;br&gt;Pre-Flight Validation', x: 16, w: 185, color: '#0B5CC4', fill: '#FBFDFF', icon: ICON_CHECKLIST,
      bullets: ['Release readiness checklist', 'Change freeze confirmed', 'Stakeholder notifications sent', 'Runbook review completed', 'Backups / snapshots taken', 'Replication health check', 'Secrets / config validation', 'Rollback artifact validation'],
      deliverable: 'Deliverable: Pre-Flight Sign-off'
    },
    {
      id: 's2', number: '2', title: 'T-4h&lt;br&gt;Final Readiness', x: 216, w: 185, color: '#078C3B', fill: '#FBFFFC', icon: ICON_PEOPLE,
      bullets: ['War room activation', 'Command center roles confirmed', 'Traffic forecast validated', 'Final database sync', 'Health baselines captured', 'Smoke-test scripts prepared', 'Cutover communications ready'],
      deliverable: 'Deliverable: Readiness Confirmed'
    },
    {
      id: 's3', number: '3', title: 'T-0&lt;br&gt;Go / No-Go Gate', x: 416, w: 205, color: '#5A26B8', fill: '#FDFCFF', icon: ICON_SHIELD,
      deliverable: 'Deliverable: Approved Decision', special: 'gate'
    },
    {
      id: 's4', number: '4', title: 'Production&lt;br&gt;Cutover', x: 636, w: 185, color: '#0B5CC4', fill: '#FBFDFF', icon: ICON_ROCKET,
      bullets: ['Cloud DNS switch', 'Global HTTPS Load Balancer / traffic routing update', 'Application release activation', 'Database writer switch / replication promotion', 'Feature flag enablement', 'Queue drain / job resume'],
      deliverable: 'Deliverable: Cutover Complete'
    },
    {
      id: 's5', number: '5', title: 'Immediate Verification&lt;br&gt;(T+0 to T+1h)', x: 836, w: 185, color: '#078C3B', fill: '#FBFFFC', icon: ICON_PULSE,
      bullets: ['Synthetic tests execution', 'Critical user journey checks', 'API health validation', 'Database validation', 'Business KPI spot checks', 'Incident triage bridge active', 'Rollback trigger thresholds monitored'],
      deliverable: 'Deliverable: Verification Passed'
    },
    {
      id: 's6', number: '6', title: 'Hypercare &amp;&lt;br&gt;T+48h Stabilization', x: 1036, w: 185, color: '#4C20A5', fill: '#FDFCFF', icon: ICON_HEADSET,
      bullets: ['Cloud Monitoring dashboards', 'Cloud Logging analysis', 'SLO / error budget watch', 'PagerDuty / on-call engaged', 'Stakeholder status updates', 'Post-cutover review', 'Incident ledger updated', 'Cutover sign-off obtained'],
      deliverable: 'Deliverable: Stabilization Sign-off'
    }
  ];

  const stageBody = stages.map(stageXml).join('');
  const arrows = [205, 405, 625, 825, 1025].map((x, i) =>
    v(`stage_arrow_${i + 1}`, '▶', 'text;html=1;align=center;verticalAlign=middle;fontColor=#33465F;fontSize=28;fontStyle=1;', x, 250, 22, 40)
  ).join('');

  const services = [
    ['svc_dns', 'DNS', 'Cloud DNS'],
    ['svc_lb', 'LB', 'Global HTTPS&lt;br&gt;Load Balancing'],
    ['svc_mon', 'MON', 'Cloud&lt;br&gt;Monitoring'],
    ['svc_log', 'LOG', 'Cloud&lt;br&gt;Logging'],
    ['svc_audit', 'AUD', 'Cloud&lt;br&gt;Audit Logs'],
    ['svc_db', 'DB', 'Cloud SQL /&lt;br&gt;Spanner'],
    ['svc_bkp', 'BKP', 'Cloud Storage&lt;br&gt;Backups'],
    ['svc_fn', '{ }', 'Cloud Functions /&lt;br&gt;Workflows'],
    ['svc_ps', 'P/S', 'Pub/Sub&lt;br&gt;Notifications'],
    ['svc_look', 'LKR', 'Looker&lt;br&gt;Dashboard']
  ].map((s, i) => serviceChip(s[0], s[1], s[2], 26 + i * 76)).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-08-19T21:30:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="golive_warroom_runbook" name="Blueprint 31 - Go-Live Cutover &amp; War Room Runbook">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        ${v('bp_badge', '&lt;b style=&quot;font-size:27px;&quot;&gt;31&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;&quot;&gt;of 50&lt;/span&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B5CC4;strokeColor=#0B5CC4;fontColor=#FFFFFF;align=center;verticalAlign=middle;arcSize=8;', 16, 12, 72, 72)}
        ${image('gcp_logo', GCP_LOGO, 102, 21, 62, 42)}
        ${v('title', '&lt;b style=&quot;font-size:25px;color:#0F2747;&quot;&gt;Go-Live Cutover &amp;amp; War Room Runbook&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;&quot;&gt;Operational cutover blueprint for production release, controlled DNS/LB switch, verification, hypercare, and rollback governance on Google Cloud.&lt;/span&gt;', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F2747;', 180, 10, 640, 72)}

        ${pill('pill1', 'Controlled&lt;br&gt;Cutover', 850, '#0B5CC4', '#F8FBFF', '🛡')}
        ${pill('pill2', 'War Room&lt;br&gt;Governance', 992, '#078C3B', '#F6FFF8', '👥')}
        ${pill('pill3', 'Rollback&lt;br&gt;Ready', 1134, '#5A26B8', '#FBF8FF', '↺')}
        ${pill('pill4', 'Live&lt;br&gt;Telemetry', 1276, '#E57C00', '#FFF9F1', '▣')}
        ${pill('pill5', 'Business&lt;br&gt;Validation', 1418, '#0B5CC4', '#F8FBFF', '✓')}

        ${stageBody}
        ${arrows}

        ${v('cmd_title', '&lt;b&gt;War Room Command Structure&lt;/b&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B5CC4;strokeColor=#0B5CC4;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;arcSize=6;', 1236, 102, 348, 28)}
        ${v('cmd_body', '&lt;table style=&quot;width:100%;font-size:8.3px;line-height:1.18;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;Cutover Commander&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Overall decision authority &amp;amp; risk acceptance&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;App Lead&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Application release &amp;amp; feature management&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;SRE Lead&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Platform reliability &amp;amp; observability oversight&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;Database Lead&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Data integrity, promotion &amp;amp; validation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;Network / DNS Lead&lt;/b&gt;&lt;/td&gt;&lt;td&gt;DNS, LB, routing &amp;amp; connectivity&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;Security / Compliance&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Security posture, access &amp;amp; compliance guardrails&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;Business Owner&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Business impact acceptance &amp;amp; value validation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;Communications Lead&lt;/b&gt;&lt;/td&gt;&lt;td&gt;Stakeholder updates &amp;amp; external communications&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8DB7E9;strokeWidth=1.2;fontColor=#183A66;fontSize=8.3;align=left;verticalAlign=top;spacing=8;arcSize=5;', 1236, 132, 348, 254)}

        ${image('rollback_icon', ICON_WARNING, 1248, 405, 34, 34)}
        ${v('rollback_title', '&lt;b&gt;Rollback Criteria&lt;/b&gt;', 'text;html=1;align=left;verticalAlign=middle;fontColor=#D82323;fontSize=13;fontStyle=1;', 1288, 400, 276, 30)}
        ${v('rollback_body', '• Sustained error rate &gt; threshold (e.g., 1% for 5 min)&lt;br&gt;• Failed smoke tests or critical user journeys&lt;br&gt;• DNS / LB instability or elevated 5xx responses&lt;br&gt;• Data inconsistency or replication lag beyond SLA&lt;br&gt;• Critical business workflow failure / KPI breach', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF8F8;strokeColor=#EF4444;strokeWidth=1.2;fontColor=#6B1B1B;fontSize=8.6;align=left;verticalAlign=top;spacing=8;arcSize=5;', 1236, 394, 348, 148)}

        ${v('telemetry_band', '&lt;b&gt;🛡 End-to-End Telemetry &amp;amp; Audit&lt;/b&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;│&amp;nbsp;&amp;nbsp; 📋 Cloud Audit Logs &amp;nbsp;&amp;nbsp;│&amp;nbsp;&amp;nbsp; 🔔 Cloud Monitoring Alerts &amp;nbsp;&amp;nbsp;│&amp;nbsp;&amp;nbsp; ☷ Cloud Logging &amp;amp; Trace &amp;nbsp;&amp;nbsp;│&amp;nbsp;&amp;nbsp; ▥ War Room Metrics Overlay', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FBFDFF;strokeColor=#4F88D6;dashed=1;strokeWidth=1.2;fontColor=#244A78;fontSize=9.5;align=center;verticalAlign=middle;arcSize=4;', 16, 490, 1205, 36)}

        ${v('seq_label', '&lt;b&gt;End-to-End&lt;br&gt;Sequence&lt;br&gt;Summary&lt;/b&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B5CC4;strokeColor=#0B5CC4;fontColor=#FFFFFF;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;arcSize=4;', 16, 538, 112, 62)}
        ${v('seq_flow', '▶ &amp;nbsp; 📅 &lt;b&gt;T-24h&lt;/b&gt; Pre-Flight Validation &amp;nbsp; ▶ &amp;nbsp; 👥 &lt;b&gt;T-4h&lt;/b&gt; Final Readiness &amp;nbsp; ▶ &amp;nbsp; 🛡 &lt;b&gt;T-0&lt;/b&gt; Go / No-Go Gate &amp;nbsp; ▶ &amp;nbsp; 🚀 Production Cutover &amp;nbsp; ▶ &amp;nbsp; ✓ T+0 to T+1h Verification &amp;nbsp; ▶ &amp;nbsp; 🎧 T+48h Stabilization &amp;nbsp; ▶ &amp;nbsp; ⚑ &lt;b&gt;Cutover Success&lt;/b&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8DB7E9;strokeWidth=1.2;fontColor=#1E3A5F;fontSize=9.5;align=center;verticalAlign=middle;arcSize=4;', 128, 538, 1306, 62)}

        ${v('services_title', '&lt;b&gt;Google Cloud Services Used&lt;/b&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B5CC4;strokeColor=#0B5CC4;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;arcSize=4;', 16, 610, 190, 24)}
        ${v('services_bg', '', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8DB7E9;strokeWidth=1.2;arcSize=4;', 16, 610, 790, 98)}
        ${services}

        ${v('metrics_title', '&lt;b&gt;Success Metrics&lt;/b&gt;', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B3B75;strokeColor=#0B3B75;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;arcSize=4;', 820, 610, 128, 24)}
        ${v('metrics_bg', '', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8DB7E9;strokeWidth=1.2;arcSize=4;', 820, 610, 764, 98)}
        ${metricCard('m1', '◷', 'RTO Target', '≤ 60 min', 830, '#0B5CC4')}
        ${metricCard('m2', '◷', 'RPO Target', '≤ 5 min', 950, '#0B5CC4')}
        ${metricCard('m3', '✓', 'Smoke Test', '≥ 98%', 1070, '#078C3B')}
        ${metricCard('m4', '▥', 'Error Rate', '≤ 1%', 1190, '#D82323')}
        ${metricCard('m5', '◔', 'Latency Delta', '≤ 10%', 1310, '#5A26B8')}
        ${metricCard('m6', '✓', 'Critical KPI', 'On Track', 1430, '#078C3B')}

        ${v('cross', '&lt;b style=&quot;color:#0B5CC4;&quot;&gt;Cross-Cutting Capabilities&lt;/b&gt;&lt;br&gt;&lt;br&gt;◇ Infrastructure as Code (IaC)&amp;nbsp;&amp;nbsp;&amp;nbsp; ◉ VPC Service Controls&lt;br&gt;▣ Policy as Code / Org Policies&amp;nbsp;&amp;nbsp;&amp;nbsp; ● IAM Least Privilege&lt;br&gt;⬡ Security Command Center&amp;nbsp;&amp;nbsp;&amp;nbsp; ↺ Backup &amp;amp; DR Automation', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C8DA;strokeWidth=1.1;fontColor=#254166;fontSize=8.8;align=left;verticalAlign=top;spacing=10;arcSize=5;', 16, 720, 368, 154)}
        ${v('roles', '&lt;b style=&quot;color:#0B3B75;&quot;&gt;Role Assignments (Examples)&lt;/b&gt;&lt;br&gt;&lt;br&gt;👤 &lt;b&gt;Cutover Commander&lt;/b&gt; — Final decision authority&lt;br&gt;👤 &lt;b&gt;SRE On-Call&lt;/b&gt; — Monitoring, alerts, incident response&lt;br&gt;👤 &lt;b&gt;DB On-Call&lt;/b&gt; — Replication, failover, validation&lt;br&gt;👤 &lt;b&gt;Network On-Call&lt;/b&gt; — DNS/LB/routing execution&lt;br&gt;👤 &lt;b&gt;Security On-Call&lt;/b&gt; — Security posture &amp;amp; compliance&lt;br&gt;👤 &lt;b&gt;Business Owner&lt;/b&gt; — Business impact &amp;amp; acceptance', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C8DA;strokeWidth=1.1;fontColor=#233A59;fontSize=8.4;align=left;verticalAlign=top;spacing=10;arcSize=5;', 400, 720, 380, 154)}
        ${v('success', '&lt;b style=&quot;color:#078C3B;&quot;&gt;Success Criteria&lt;/b&gt;&lt;br&gt;&lt;br&gt;✓ Business KPIs within expected range&lt;br&gt;✓ All smoke tests and validations passed&lt;br&gt;✓ SLOs met; error budget healthy&lt;br&gt;✓ No Sev-1 or Sev-2 incidents open&lt;br&gt;✓ Stakeholder sign-off captured', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C8DA;strokeWidth=1.1;fontColor=#264B37;fontSize=8.8;align=left;verticalAlign=top;spacing=10;arcSize=5;', 796, 720, 380, 154)}
        ${v('benefits', '&lt;b style=&quot;color:#0B5CC4;&quot;&gt;Key Benefits&lt;/b&gt;&lt;br&gt;&lt;br&gt;◇ Minimized risk with repeatable, governed cutover&lt;br&gt;◇ Faster detection &amp;amp; recovery with real-time telemetry&lt;br&gt;◇ Transparent communication &amp;amp; role clarity&lt;br&gt;◇ Rollback-ready posture ensures business resilience&lt;br&gt;◇ Higher confidence, reduced downtime &amp;amp; stakeholder trust', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C8DA;strokeWidth=1.1;fontColor=#254166;fontSize=8.6;align=left;verticalAlign=top;spacing=10;arcSize=5;', 1192, 720, 392, 154)}

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
