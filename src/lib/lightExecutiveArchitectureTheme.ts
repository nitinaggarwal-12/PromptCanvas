/**
 * ☀️ Light Theme Executive Architecture Engine
 * Journal-Grade Scientific & Enterprise Reference Layouts
 *
 * Visual Tokens:
 * - Canvas Background: #F8FAFC (Slate-50)
 * - Container Swimlane: #FFFFFF (White) with border #CBD5E1 / #94A3B8, shadow
 * - Left Header Pod: #0F172A (Deep Slate Navy) or #1E3A8A (Deep Blue) with text #FFFFFF
 * - Card Node: #FFFFFF with accent border #2563EB / #059669 / #7C3AED / #D97706
 * - Sub-Chips / Pills: #EFF6FF (Blue-50) or #F1F5F9 (Slate-100) with text #0F172A
 * - Data Flow Arrows: #2563EB / #0F172A (strokeWidth 2, crisp readable labels on #FFFFFF badges)
 */

export const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const svgIcon = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

export const LIGHT_ICONS = {
  gcs: svgIcon('<rect x="8" y="10" width="32" height="28" rx="4" fill="#2563EB"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2.5"/><circle cx="36" cy="14" r="5" fill="#DC2626"/><circle cx="36" cy="34" r="5" fill="#16A34A"/><circle cx="12" cy="34" r="5" fill="#D97706"/>'),
  google: svgIcon('<path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>'),
  bq: svgIcon('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#60A5FA"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/><circle cx="24" cy="21" r="3" fill="#fff"/>'),
  dataflow: svgIcon('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 24h20M24 14l10 10-10 10" fill="none" stroke="#fff" stroke-width="3"/>'),
  pubsub: svgIcon('<circle cx="24" cy="12" r="6" fill="#2563EB"/><circle cx="12" cy="32" r="6" fill="#2563EB"/><circle cx="36" cy="32" r="6" fill="#2563EB"/><path d="M24 12L12 32M24 12l12 20" stroke="#2563EB" stroke-width="2.5"/>'),
  gemini: svgIcon('<defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563EB"/><stop offset=".5" stop-color="#7C3AED"/><stop offset="1" stop-color="#DB2777"/></linearGradient></defs><path fill="url(#gl)" d="M24 4c2.2 10.2 9.6 17.6 20 20-10.4 2.4-17.8 9.8-20 20-2.2-10.2-9.6-17.6-20-20C14.4 21.6 21.8 14.2 24 4z"/><circle cx="36" cy="12" r="2" fill="#fff"/><circle cx="12" cy="34" r="2" fill="#fff"/>'),
  vertex: svgIcon('<rect x="6" y="6" width="36" height="36" rx="8" fill="#0284C7"/><path d="m24 12 10 20-4 2-6-12-6 12-4-2z" fill="#fff"/>'),
  gke: svgIcon('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  spanner: svgIcon('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
  sql: svgIcon('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#0284C7"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#BAE6FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#0284C7"/>'),
  looker: svgIcon('<circle cx="16" cy="24" r="6" fill="#7C3AED"/><circle cx="32" cy="16" r="6" fill="#2563EB"/><circle cx="32" cy="32" r="6" fill="#059669"/><path d="M16 24l16-8M16 24l16 8" stroke="#64748B" stroke-width="2.5"/>'),
  shield: svgIcon('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  router: svgIcon('<rect x="6" y="10" width="36" height="28" rx="6" fill="#2563EB"/><path d="M12 24h24M24 16v16" stroke="#fff" stroke-width="3"/>'),
  api: svgIcon('<rect x="8" y="8" width="32" height="32" rx="6" fill="#7C3AED"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>'),
  finops: svgIcon('<circle cx="24" cy="24" r="16" fill="#D97706"/><path d="M24 12v24M18 18h12M18 30h12" stroke="#fff" stroke-width="2.5"/>'),
  dataplex: svgIcon('<circle cx="16" cy="16" r="6" fill="#0284C7"/><circle cx="32" cy="16" r="6" fill="#0284C7"/><circle cx="24" cy="32" r="6" fill="#059669"/><path d="M16 16l8 16 8-16" stroke="#64748B" stroke-width="2"/>'),
  spark: svgIcon('<path d="M24 4l5 12 13 2-10 9 3 13-11-7-11 7 3-13-10-9 13-2z" fill="#EA580C"/>'),
  iceberg: svgIcon('<path d="M24 6l16 14-8 22H16L8 20z" fill="#0284C7"/><path d="M24 12l10 9-5 15h-10l-5-15z" fill="#BAE6FD"/>'),
};

export const lightCell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

export const lightTier = (id: string, titleHtml: string, y: number, height: number, width = 940, x = 30, accent = '#1E293B'): string => {
  return [
    lightCell(`${id}_bg`, '', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', x, y, width, height),
    lightCell(`${id}_pod`, `<b style="font-size:12.5px;color:#FFFFFF;letter-spacing:0.04em;">${titleHtml}</b>`,
      `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};strokeWidth=1;align=center;verticalAlign=middle;shadow=0;`,
      x, y, 220, height),
  ].join('\n');
};

export const lightCard = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accentColor = '#2563EB', rightIcon?: string): string => {
  const rightCell = rightIcon ? `<td style="width:30px;text-align:right;padding-right:4px;"><img src="${rightIcon}" width="20" height="20"/></td>` : '';
  const subHtml = subtitle ? `<br/><span style="font-size:9.5px;color:#475569;font-weight:500;">${subtitle}</span>` : '';
  const html = `<table style="width:100%;height:100%;border-collapse:collapse;"><tr><td style="width:36px;text-align:center;"><img src="${icon}" width="26" height="26"/></td><td style="text-align:left;padding-left:6px;"><b style="font-size:11.5px;color:#0F172A;">${title}</b>${subHtml}</td>${rightCell}</tr></table>`;
  return lightCell(id, html, `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${accentColor};strokeWidth=1.4;shadow=1;align=center;verticalAlign=middle;`, x, y, width, height);
};

export const lightPill = (id: string, title: string, subtitle: string, x: number, y: number, width: number, height = 48): string => {
  const sub = subtitle ? `<br/><span style="font-size:9.5px;color:#64748B;">${subtitle}</span>` : '';
  const html = `<b style="font-size:11.5px;color:#0F172A;">${title}</b>${sub}`;
  return lightCell(id, html, 'rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;shadow=1;', x, y, width, height);
};

export const lightFlowEdge = (id: string, source: string, target: string, label = '', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = [], color = '#2563EB'): string => {
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=2;endArrow=block;endFill=1;fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};
