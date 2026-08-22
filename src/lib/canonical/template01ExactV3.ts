import { generateTemplate01ExactV2Xml } from './template01ExactV2';

const svgData = (body: string, viewBox = '0 0 64 64') =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`)}`;

const strokeIcon = (body: string, color = '#233E8B') =>
  svgData(`<rect width="64" height="64" rx="12" fill="#fff"/><g fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${body}</g>`);

const brand = (body: string) => svgData(`<rect width="120" height="48" rx="8" fill="#fff"/>${body}`, '0 0 120 48');

const ICONS = {
  leadership: strokeIcon('<circle cx="32" cy="18" r="8"/><path d="M15 48c3-11 9-16 17-16s14 5 17 16"/><path d="M11 48h42"/>'),
  legal: strokeIcon('<path d="M32 10v42M18 18h28M18 18l-10 18h20zM46 18 36 36h20zM20 52h24"/>'),
  governance: strokeIcon('<circle cx="18" cy="19" r="7"/><circle cx="46" cy="19" r="7"/><circle cx="32" cy="15" r="8"/><path d="M6 48c2-10 7-15 12-15M58 48c-2-10-7-15-12-15M15 49c2-12 8-18 17-18s15 6 17 18"/>'),
  scientist: strokeIcon('<path d="M24 8h16M29 8v16L14 52h36L35 24V8"/><path d="M21 40h22M24 34h16"/>'),
  clinical: strokeIcon('<circle cx="22" cy="17" r="8"/><circle cx="45" cy="22" r="6"/><path d="M8 49c2-12 7-18 14-18s12 6 14 18M35 48c1-8 5-12 10-12s9 4 10 12"/>'),
  document: strokeIcon('<path d="M18 8h21l10 10v38H18zM39 8v12h10M24 30h18M24 38h18M24 46h12"/>'),
  shield: strokeIcon('<path d="M32 7 50 14v14c0 13-7 22-18 29C21 50 14 41 14 28V14z"/><path d="M24 32l6 6 11-13"/>'),
  quality: strokeIcon('<circle cx="32" cy="28" r="13"/><path d="M24 28l6 6 11-12M25 41l-4 15 11-6 11 6-4-15"/>'),
  medical: strokeIcon('<path d="M18 8v18c0 8 6 14 14 14s14-6 14-14V8M14 8h8M42 8h8M32 40v13M24 53h16"/><circle cx="32" cy="24" r="4"/>'),
  analytics: strokeIcon('<path d="M12 52V36M24 52V28M36 52V18M48 52V10M8 54h48"/>'),
  flask: strokeIcon('<path d="M25 8h14M29 8v16L16 52h32L35 24V8M22 40h20"/>'),
  regulatory: strokeIcon('<path d="M16 8h24l8 8v40H16zM40 8v10h10"/><circle cx="36" cy="38" r="10"/><path d="M31 38l4 4 7-8"/>'),
  pv: strokeIcon('<path d="M32 7 49 14v14c0 12-7 22-17 28C22 50 15 40 15 28V14z"/><path d="M32 20v18M23 29h18"/>'),
  factory: strokeIcon('<path d="M10 54V28l14 7V24l14 7V18l16 9v27zM16 46h8M30 46h8M44 46h6"/>'),
  chat: strokeIcon('<path d="M10 14h44v30H31L20 54V44H10z"/><path d="M25 29h14M32 22v14"/>'),
  folder: strokeIcon('<path d="M8 20h20l6 7h22v27H8zM8 20v-7h18l6 7"/>'),
  ai: strokeIcon('<path d="M24 16c-8 0-13 6-13 14s5 14 13 14M40 16c8 0 13 6 13 14s-5 14-13 14M24 16c2-7 14-7 16 0M24 44c2 7 14 7 16 0M32 12v36M20 24h24M20 36h24"/>','#5B2A86'),
  partner: strokeIcon('<circle cx="22" cy="20" r="7"/><circle cx="43" cy="20" r="7"/><path d="M8 50c2-11 7-16 14-16M56 50c-2-11-7-16-13-16M25 39l7 7 7-7"/>','#2E6B34'),
  hospital: strokeIcon('<path d="M12 54V18h40v36M20 54V34h24v20M26 12h12M32 7v16M25 15h14"/>','#2E6B34'),
  authority: strokeIcon('<path d="M8 22 32 8l24 14M12 26h40M16 26v24M27 26v24M38 26v24M49 26v24M10 52h44"/>','#2E6B34'),
  patient: strokeIcon('<circle cx="22" cy="18" r="7"/><circle cx="43" cy="18" r="7"/><path d="M9 51c1-11 7-18 13-18M55 51c-1-11-7-18-12-18"/><path d="M32 47c-13-9-15-18-8-22 4-3 8-1 8 3 0-4 4-6 8-3 7 4 5 13-8 22z"/>','#2E6B34'),
  search: strokeIcon('<circle cx="27" cy="27" r="14"/><path d="M38 38l14 14M18 18h18M18 25h10"/>','#5B2A86'),
  vector: strokeIcon('<circle cx="14" cy="32" r="5"/><circle cx="32" cy="12" r="5"/><circle cx="50" cy="32" r="5"/><circle cx="32" cy="52" r="5"/><path d="M18 29l10-13M36 16l10 13M46 35 36 48M28 48 18 35M19 32h26"/>','#5B2A86'),
  admin: strokeIcon('<circle cx="26" cy="22" r="8"/><path d="M10 52c2-12 8-18 16-18s14 6 16 18"/><circle cx="48" cy="18" r="6"/><path d="M48 8v4M48 24v4M38 18h4M54 18h4"/>'),
  iam: strokeIcon('<path d="M32 7 50 14v14c0 13-7 22-18 29C21 50 14 41 14 28V14z"/><rect x="25" y="27" width="14" height="12" rx="2"/><path d="M28 27v-4a4 4 0 0 1 8 0v4"/>'),
  support: strokeIcon('<circle cx="32" cy="28" r="17"/><path d="M15 28v12h7V28M49 28v12h-7V28M42 44c-3 5-8 7-15 7"/>')
};

const BRANDS = {
  veeva: brand('<text x="60" y="31" text-anchor="middle" font-family="Arial" font-size="25" font-weight="700" fill="#F59E0B">Veeva</text>'),
  salesforce: brand('<path d="M28 32c-8 0-11-8-7-13 2-3 6-4 9-3 2-6 11-9 16-4 7-4 15 1 15 8 6 1 8 10 2 13z" fill="#00A1E0"/><text x="83" y="29" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#00A1E0">salesforce</text>'),
  sap: brand('<rect x="13" y="9" width="94" height="30" rx="3" fill="#0A6ED1"/><text x="60" y="31" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#fff">SAP</text>'),
  google: brand('<path d="M25 31c-5-7 0-15 7-15 3-7 14-8 18-2 7-1 12 5 10 11 7 2 8 12 1 15H31c-7 0-11-6-6-9z" fill="#4285F4"/><path d="M35 16l7 12" stroke="#34A853" stroke-width="5"/><path d="M47 17l8 11" stroke="#FBBC05" stroke-width="5"/><path d="M28 28l8 12" stroke="#EA4335" stroke-width="5"/><text x="91" y="30" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#5F6368">Vertex AI</text>')
};

export function generateTemplate01ExactV3Xml(): string {
  let xml = generateTemplate01ExactV2Xml();
  const cells: string[] = [];
  const image = (id: string, data: string, x: number, y: number, w: number, h: number) =>
    cells.push(`<mxCell id="${id}" value="" style="shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=${data};" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  // Governance icons
  [ICONS.leadership, ICONS.legal, ICONS.governance].forEach((d,i)=>image(`v3_gov_${i}`,d,458+i*194,118,38,38));
  // Internal user icons
  [ICONS.scientist,ICONS.clinical,ICONS.document,ICONS.shield,ICONS.quality,ICONS.medical,ICONS.analytics].forEach((d,i)=>image(`v3_user_${i}`,d,42,202+i*76,42,42));
  // NovaCura mark + capability icons
  image('v3_novacura_mark',svgData('<defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#244C93"/><stop offset="1" stop-color="#6E8DD5"/></linearGradient></defs><path d="M8 48 24 8h15L25 48z" fill="url(#g)"/><path d="M30 48 45 8h11L44 48z" fill="#244C93"/>'),477,207,62,48);
  [ICONS.flask,ICONS.regulatory,ICONS.pv,ICONS.factory,ICONS.chat,ICONS.analytics,ICONS.folder,ICONS.ai].forEach((d,i)=>{const col=i%2,row=Math.floor(i/2);image(`v3_cap_${i}`,d,474+col*288,294+row*86,42,42);});
  // Cross-cutting icons
  [ICONS.shield,ICONS.document,ICONS.vector,ICONS.partner].forEach((d,i)=>image(`v3_cross_${i}`,d,478+i*145,640,28,28));
  // External ecosystem icons
  [ICONS.partner,ICONS.hospital,ICONS.authority,ICONS.patient].forEach((d,i)=>image(`v3_ext_${i}`,d,1290,239+i*107,46,46));
  // Enterprise system logos/icons
  image('v3_brand_veeva',BRANDS.veeva,46,798,96,36);
  image('v3_brand_salesforce',BRANDS.salesforce,174,798,96,36);
  image('v3_brand_sap',BRANDS.sap,302,798,96,36);
  image('v3_brand_lims',ICONS.flask,434,799,42,42);
  image('v3_brand_ctms',ICONS.clinical,562,799,42,42);
  image('v3_brand_safety',ICONS.shield,690,799,42,42);
  image('v3_brand_datalake',svgData('<rect width="64" height="64" rx="12" fill="#fff"/><ellipse cx="32" cy="16" rx="20" ry="8" fill="#244C93"/><path d="M12 16v28c0 5 9 9 20 9s20-4 20-9V16" fill="none" stroke="#244C93" stroke-width="4"/><path d="M12 30c0 5 9 9 20 9s20-4 20-9" fill="none" stroke="#244C93" stroke-width="4"/>'),818,799,42,42);
  // AI / knowledge services
  image('v3_ai_search',ICONS.search,1035,796,46,46);
  image('v3_ai_vector',ICONS.vector,1207,796,46,46);
  image('v3_ai_google',BRANDS.google,1368,796,112,42);
  // Ops
  [ICONS.admin,ICONS.iam,ICONS.support].forEach((d,i)=>image(`v3_ops_${i}`,d,105+i*205,954,38,38));

  return xml.replace('</root>', `${cells.join('')}</root>`);
}
