// ============================================================================
// PROMPTCANVAS STUDIO 3: DYNAMIC VISUAL CONCEPT ENGINE
// ============================================================================
// Transforms educational, scientific, and architectural prompts into
// high-craft, fun, intuitive, and interactive infographics in Draw.io XML.

export interface VisualConceptColumn {
  id: string;
  number: number;
  title: string;
  badge?: string;
  themeColor: 'green' | 'blue' | 'orange' | 'purple' | 'teal' | 'red' | 'cyan';
  icon: string;
  heroType: 
    | 'speedometer' | 'compass' | 'thrust' 
    | 'quantum-wave' | 'qubit-sphere' | 'entanglement'
    | 'energy-potential' | 'energy-kinetic' | 'energy-work'
    | 'sync-rest' | 'async-queue' | 'event-stream'
    | 'nn-transformer' | 'database-acid' | 'generic-concept';
  heroValue: string;
  heroSubtext: string;
  definitionTitle: string;
  definitionBody: string;
  checkmarks: {
    label1: string;
    val1: boolean;
    label2: string;
    val2: boolean;
  };
  subCardTitle: string;
  subCardType?: string;
  subCardDetails?: string[];
  formula?: string;
}

export interface VisualConceptSpec {
  title: string;
  subtitle?: string;
  layout: 'triad-comparison' | 'hero-split' | 'quad-matrix';
  columns: VisualConceptColumn[];
  bottomBanner?: {
    title: string;
    services: Array<{ name: string; icon: string; color?: string }>;
  };
}

function escapeXml(str: any): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const THEME_COLORS: Record<string, { main: string; bg: string; border: string; text: string; lightBadge: string; darkBadge: string }> = {
  green: { main: '#16A34A', bg: '#F0FDF4', border: '#86EFAC', text: '#15803D', lightBadge: '#DCFCE7', darkBadge: '#15803D' },
  blue: { main: '#2563EB', bg: '#EFF6FF', border: '#93C5FD', text: '#1D4ED8', lightBadge: '#DBEAFE', darkBadge: '#1D4ED8' },
  orange: { main: '#EA580C', bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C', lightBadge: '#FFEDD5', darkBadge: '#C2410C' },
  purple: { main: '#7C3AED', bg: '#FAF5FF', border: '#D8B4FE', text: '#6D28D9', lightBadge: '#F3E8FF', darkBadge: '#6D28D9' },
  teal: { main: '#0D9488', bg: '#F0FDFA', border: '#99F6E4', text: '#0F766E', lightBadge: '#CCFBF1', darkBadge: '#0F766E' },
  cyan: { main: '#0284C7', bg: '#F0F9FF', border: '#7DD3FC', text: '#0369A1', lightBadge: '#E0F2FE', darkBadge: '#0369A1' },
  red: { main: '#DC2626', bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C', lightBadge: '#FEE2E2', darkBadge: '#B91C1C' }
};

// ============================================================================
// SVG WIDGET RENDERERS
// ============================================================================

export function renderSpeedometerSvg(val: string, color: string): string {
  return `<svg viewBox="0 0 140 100" width="120" height="85">
    <path d="M 20 85 A 50 50 0 0 1 120 85" stroke="#CBD5E1" stroke-width="10" fill="none"/>
    <path d="M 20 85 A 50 50 0 0 1 70 35" stroke="#38BDF8" stroke-width="10" fill="none"/>
    <path d="M 70 35 A 50 50 0 0 1 105 50" stroke="#FBBF24" stroke-width="10" fill="none"/>
    <path d="M 105 50 A 50 50 0 0 1 120 85" stroke="#EF4444" stroke-width="10" fill="none"/>
    <line x1="70" y1="85" x2="88" y2="44" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
    <circle cx="70" cy="85" r="5" fill="#0F172A"/>
    <text x="70" y="78" text-anchor="middle" font-size="12" font-weight="900" fill="#0F172A">${escapeXml(val)}</text>
  </svg>`;
}

export function renderCompassSvg(val: string): string {
  return `<svg viewBox="0 0 80 80" width="70" height="70">
    <circle cx="40" cy="40" r="32" stroke="#0F172A" stroke-width="2" fill="#FFFFFF"/>
    <text x="40" y="14" text-anchor="middle" font-size="10" font-weight="900" fill="#DC2626">N</text>
    <polygon points="40,16 45,35 40,40" fill="#DC2626"/>
    <polygon points="40,16 35,35 40,40" fill="#991B1B"/>
    <polygon points="40,64 45,45 40,40" fill="#2563EB"/>
    <polygon points="40,64 35,45 40,40" fill="#1D4ED8"/>
    <polygon points="16,40 35,45 40,40" fill="#64748B"/>
    <polygon points="64,40 45,45 40,40" fill="#64748B"/>
    <circle cx="40" cy="40" r="3" fill="#0F172A"/>
  </svg>`;
}

export function renderVehicleProfileSvg(): string {
  return `<svg viewBox="0 0 160 80" width="140" height="70">
    <path d="M 10 55 L 25 35 Q 40 20 70 20 L 115 20 Q 135 20 145 38 L 155 55 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
    <path d="M 45 35 L 55 24 L 85 24 L 85 35 Z" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
    <path d="M 90 35 L 90 24 L 115 24 L 125 35 Z" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
    <rect x="5" y="48" width="150" height="15" rx="4" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
    <circle cx="40" cy="62" r="14" fill="#0F172A"/>
    <circle cx="40" cy="62" r="6" fill="#94A3B8"/>
    <circle cx="120" cy="62" r="14" fill="#0F172A"/>
    <circle cx="120" cy="62" r="6" fill="#94A3B8"/>
  </svg>`;
}

// ⚛️ QUANTUM WIDGETS
export function renderQuantumWaveSvg(): string {
  return `<svg viewBox="0 0 200 90" width="180" height="80">
    <!-- Laser source -->
    <rect x="10" y="38" width="25" height="14" rx="3" fill="#DC2626"/>
    <text x="22" y="48" fill="#FFFFFF" font-size="8" font-weight="900" text-anchor="middle">LASER</text>
    <!-- Wavefronts -->
    <path d="M 40 45 Q 55 25 70 45 T 100 45" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 2"/>
    <!-- Double Slit Barrier -->
    <line x1="105" y1="10" x2="105" y2="32" stroke="#0F172A" stroke-width="4"/>
    <line x1="105" y1="38" x2="105" y2="52" stroke="#0F172A" stroke-width="4"/>
    <line x1="105" y1="58" x2="105" y2="80" stroke="#0F172A" stroke-width="4"/>
    <!-- Interference pattern on detector screen -->
    <line x1="185" y1="10" x2="185" y2="80" stroke="#475569" stroke-width="3"/>
    <!-- Bright/Dark Fringes -->
    <rect x="180" y="15" width="10" height="4" rx="1" fill="#38BDF8"/>
    <rect x="176" y="25" width="14" height="6" rx="1" fill="#0284C7"/>
    <rect x="172" y="38" width="18" height="14" rx="2" fill="#2563EB"/>
    <rect x="176" y="59" width="14" height="6" rx="1" fill="#0284C7"/>
    <rect x="180" y="71" width="10" height="4" rx="1" fill="#38BDF8"/>
    <!-- Dual nature badge -->
    <text x="145" y="86" font-size="8" font-weight="900" fill="#2563EB" text-anchor="middle">Wave Interference Fringes</text>
  </svg>`;
}

export function renderQubitBlochSphereSvg(): string {
  return `<svg viewBox="0 0 160 100" width="140" height="90">
    <!-- Bloch Sphere Outline -->
    <circle cx="80" cy="50" r="38" fill="#FAF5FF" stroke="#7C3AED" stroke-width="2"/>
    <ellipse cx="80" cy="50" rx="38" ry="12" fill="none" stroke="#C084FC" stroke-width="1.5" stroke-dasharray="3 3"/>
    <!-- Axes -->
    <line x1="80" y1="10" x2="80" y2="90" stroke="#6B21A8" stroke-width="2"/>
    <line x1="42" y1="50" x2="118" y2="50" stroke="#6B21A8" stroke-width="1.5"/>
    <!-- Poles: |0> and |1> -->
    <text x="80" y="9" font-size="10" font-weight="900" fill="#7C3AED" text-anchor="middle">|0⟩ (North)</text>
    <text x="80" y="98" font-size="10" font-weight="900" fill="#7C3AED" text-anchor="middle">|1⟩ (South)</text>
    <!-- Superposition State Vector -->
    <line x1="80" y1="50" x2="108" y2="28" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"/>
    <polygon points="108,28 98,30 104,36" fill="#DC2626"/>
    <circle cx="80" cy="50" r="3" fill="#6B21A8"/>
    <text x="116" y="25" font-size="9" font-weight="900" fill="#DC2626">|ψ⟩</text>
  </svg>`;
}

export function renderQuantumEntanglementSvg(): string {
  return `<svg viewBox="0 0 200 90" width="180" height="80">
    <!-- Particle A -->
    <circle cx="40" cy="45" r="22" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5"/>
    <text x="40" y="38" font-size="9" font-weight="900" fill="#1E40AF" text-anchor="middle">Particle A</text>
    <line x1="40" y1="45" x2="40" y2="58" stroke="#2563EB" stroke-width="3"/>
    <polygon points="40,40 36,48 44,48" fill="#2563EB"/>
    <text x="40" y="64" font-size="8" font-weight="900" fill="#2563EB" text-anchor="middle">Spin UP ↑</text>

    <!-- Entangled Quantum Wormhole/Link -->
    <path d="M 65 45 Q 100 25 135 45" fill="none" stroke="#EA580C" stroke-width="3" stroke-dasharray="4 3"/>
    <path d="M 65 45 Q 100 65 135 45" fill="none" stroke="#EA580C" stroke-width="3" stroke-dasharray="4 3"/>
    <text x="100" y="49" font-size="9" font-weight="900" fill="#EA580C" text-anchor="middle">⚡ Entangled Bell State</text>

    <!-- Particle B -->
    <circle cx="160" cy="45" r="22" fill="#FFF7ED" stroke="#EA580C" stroke-width="2.5"/>
    <text x="160" y="38" font-size="9" font-weight="900" fill="#9A3412" text-anchor="middle">Particle B</text>
    <line x1="160" y1="45" x2="160" y2="32" stroke="#EA580C" stroke-width="3"/>
    <polygon points="160,50 156,42 164,42" fill="#EA580C"/>
    <text x="160" y="64" font-size="8" font-weight="900" fill="#EA580C" text-anchor="middle">Spin DOWN ↓</text>
  </svg>`;
}

// 🌐 DISTRIBUTED SYSTEMS WIDGETS
export function renderSyncRestSvg(): string {
  return `<svg viewBox="0 0 180 80" width="160" height="70">
    <rect x="10" y="20" width="45" height="40" rx="6" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
    <text x="32" y="44" font-size="9" font-weight="900" fill="#1D4ED8" text-anchor="middle">Client</text>
    
    <line x1="58" y1="32" x2="115" y2="32" stroke="#2563EB" stroke-width="2"/>
    <polygon points="118,32 110,28 110,36" fill="#2563EB"/>
    <text x="88" y="28" font-size="7.5" font-weight="800" fill="#1D4ED8" text-anchor="middle">POST /order</text>

    <line x1="115" y1="48" x2="58" y2="48" stroke="#16A34A" stroke-width="2" stroke-dasharray="3 2"/>
    <polygon points="55,48 63,44 63,52" fill="#16A34A"/>
    <text x="88" y="58" font-size="7.5" font-weight="800" fill="#16A34A" text-anchor="middle">200 OK (Blocked)</text>

    <rect x="122" y="20" width="48" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
    <text x="146" y="44" font-size="9" font-weight="900" fill="#15803D" text-anchor="middle">Server</text>
  </svg>`;
}

export function renderAsyncQueueSvg(): string {
  return `<svg viewBox="0 0 180 80" width="160" height="70">
    <rect x="10" y="25" width="38" height="35" rx="4" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
    <text x="29" y="46" font-size="8.5" font-weight="900" fill="#15803D" text-anchor="middle">Producer</text>

    <!-- Buffer Queue Boxes -->
    <rect x="60" y="28" width="60" height="28" rx="4" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
    <line x1="80" y1="28" x2="80" y2="56" stroke="#16A34A" stroke-width="1.5"/>
    <line x1="100" y1="28" x2="100" y2="56" stroke="#16A34A" stroke-width="1.5"/>
    <text x="90" y="45" font-size="8" font-weight="900" fill="#16A34A" text-anchor="middle">Queue</text>

    <rect x="132" y="25" width="38" height="35" rx="4" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
    <text x="151" y="46" font-size="8.5" font-weight="900" fill="#1D4ED8" text-anchor="middle">Worker</text>
  </svg>`;
}

export function renderEventStreamSvg(): string {
  return `<svg viewBox="0 0 180 80" width="160" height="70">
    <circle cx="25" cy="40" r="16" fill="#FFF7ED" stroke="#EA580C" stroke-width="2"/>
    <text x="25" y="43" font-size="8" font-weight="900" fill="#C2410C" text-anchor="middle">Pub</text>

    <!-- Central Event Mesh -->
    <rect x="55" y="20" width="50" height="40" rx="6" fill="#FFEDD5" stroke="#EA580C" stroke-width="2"/>
    <text x="80" y="38" font-size="8" font-weight="900" fill="#9A3412" text-anchor="middle">Pub/Sub</text>
    <text x="80" y="50" font-size="7" font-weight="700" fill="#C2410C" text-anchor="middle">Event Bus</text>

    <!-- Consumers -->
    <rect x="125" y="10" width="45" height="18" rx="3" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5"/>
    <text x="147" y="22" font-size="7.5" font-weight="800" fill="#15803D" text-anchor="middle">Sub 1</text>
    <rect x="125" y="32" width="45" height="18" rx="3" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
    <text x="147" y="44" font-size="7.5" font-weight="800" fill="#1D4ED8" text-anchor="middle">Sub 2</text>
    <rect x="125" y="54" width="45" height="18" rx="3" fill="#FAF5FF" stroke="#7C3AED" stroke-width="1.5"/>
    <text x="147" y="66" font-size="7.5" font-weight="800" fill="#6D28D9" text-anchor="middle">Sub 3</text>
  </svg>`;
}

// ============================================================================
// COMPILER
// ============================================================================

export function compileVisualConceptSpecToXml(spec: VisualConceptSpec): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${escapeXml(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. HEADER (y=10..68)
  const hdrHtml = `<div style="background:#0F1E36;border-radius:8px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-family:Impact,Arial Black,sans-serif;letter-spacing:1.5px;color:#FFFFFF;font-size:32px;text-transform:uppercase;box-shadow:0 4px 10px rgba(0,0,0,0.15);">
    ${escapeXml(spec.title)}
  </div>`;
  cell('main_header', hdrHtml, 30, 10, 1540, 58, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 2. TOP CHEVRON RIBBONS (y=74..124, h=50)
  const numCols = spec.columns.length;
  const colWidth = numCols === 3 ? 500 : numCols === 2 ? 760 : 370;
  const colGap = numCols === 3 ? 20 : numCols === 2 ? 20 : 15;

  spec.columns.forEach((col, idx) => {
    const cx = 30 + idx * (colWidth + colGap);
    const theme = THEME_COLORS[col.themeColor] || THEME_COLORS.blue;
    const chHtml = `<div style="background:${theme.main};color:#FFFFFF;border-radius:6px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-family:Impact,Arial Black,sans-serif;font-size:18px;letter-spacing:0.5px;text-transform:uppercase;">
      <span>${col.icon}</span>
      <span>${escapeXml(col.title)}</span>
      <span>${col.badge || '★'}</span>
    </div>`;
    cell(`ch_${idx}`, chHtml, cx, 74, colWidth, 48, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  });

  // 3. MAIN COLUMNS (y=128..815, h=687)
  spec.columns.forEach((col, idx) => {
    const cx = 30 + idx * (colWidth + colGap);
    const theme = THEME_COLORS[col.themeColor] || THEME_COLORS.blue;

    let heroWidgetHtml = '';
    if (col.heroType === 'speedometer') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:space-around;width:100%;">${renderVehicleProfileSvg()}${renderSpeedometerSvg(col.heroValue, theme.main)}</div>`;
    } else if (col.heroType === 'compass') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:space-around;width:100%;"><svg viewBox="0 0 120 70" width="105" height="60"><path d="M 10 45 L 20 28 Q 35 15 60 15 L 90 15 Q 105 15 112 28 L 118 45 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2"/><rect x="5" y="40" width="110" height="12" rx="3" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/><circle cx="30" cy="52" r="10" fill="#0F172A"/><circle cx="90" cy="52" r="10" fill="#0F172A"/></svg><svg viewBox="0 0 120 50" width="105" height="42"><line x1="10" y1="25" x2="95" y2="25" stroke="#2563EB" stroke-width="10"/><polygon points="115,25 90,10 90,40" fill="#2563EB"/></svg>${renderCompassSvg(col.heroValue)}</div>`;
    } else if (col.heroType === 'quantum-wave') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;">${renderQuantumWaveSvg()}</div>`;
    } else if (col.heroType === 'qubit-sphere') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;">${renderQubitBlochSphereSvg()}</div>`;
    } else if (col.heroType === 'entanglement') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;">${renderQuantumEntanglementSvg()}</div>`;
    } else if (col.heroType === 'sync-rest') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;">${renderSyncRestSvg()}</div>`;
    } else if (col.heroType === 'async-queue') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;">${renderAsyncQueueSvg()}</div>`;
    } else if (col.heroType === 'event-stream') {
      heroWidgetHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;">${renderEventStreamSvg()}</div>`;
    } else {
      heroWidgetHtml = `
        <div style="display:flex;align-items:center;justify-content:center;padding:12px;background:${theme.bg};border-radius:6px;width:100%;box-sizing:border-box;">
          <div style="font-size:32px;margin-right:12px;">${col.icon}</div>
          <div>
            <div style="font-size:12px;font-weight:900;color:${theme.text};">${escapeXml(col.heroValue)}</div>
            <div style="font-size:9.5px;color:#64748B;">${escapeXml(col.heroSubtext)}</div>
          </div>
        </div>
      `;
    }

    const colHtml = `<div style="background:${theme.bg};border:1.5px solid ${theme.border};border-radius:8px;padding:12px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;font-family:system-ui,-apple-system,sans-serif;">
      
      <!-- Top Hero Block -->
      <div style="background:#FFFFFF;border:1px solid ${theme.border};border-radius:8px;padding:10px;display:flex;flex-direction:column;align-items:center;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div style="font-size:13px;font-weight:900;color:${theme.text};margin-bottom:6px;">${escapeXml(col.title)}</div>
        ${heroWidgetHtml}
        <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:6px;">${escapeXml(col.heroValue)}</div>
        <div style="font-size:9.5px;color:${theme.text};font-weight:700;">${escapeXml(col.heroSubtext)}</div>
      </div>

      <!-- Definition Box -->
      <div style="background:#FFFFFF;border:1px solid ${theme.border};border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:space-between;margin:8px 0;">
        <div style="padding-right:8px;">
          <div style="font-size:12px;font-weight:900;color:#0F172A;">${escapeXml(col.definitionTitle)}</div>
          <div style="font-size:9.5px;color:#334155;margin-top:3px;line-height:1.35;font-weight:600;">${escapeXml(col.definitionBody)}</div>
        </div>
        <div style="background:${theme.lightBadge};border:1px solid ${theme.border};border-radius:6px;padding:4px 8px;font-size:9px;font-weight:900;color:${theme.darkBadge};white-space:nowrap;line-height:1.3;">
          <div>${col.checkmarks.val1 ? '✅' : '❌'} ${escapeXml(col.checkmarks.label1)}</div>
          <div>${col.checkmarks.val2 ? '✅' : '❌'} ${escapeXml(col.checkmarks.label2)}</div>
        </div>
      </div>

      <!-- Sub Card / Example Panel -->
      <div style="background:#FFFFFF;border:1px solid ${theme.border};border-radius:8px;padding:10px;display:flex;flex-direction:column;justify-content:space-between;flex-grow:1;">
        <div style="font-size:12px;font-weight:900;color:${theme.text};text-align:center;margin-bottom:6px;">${escapeXml(col.subCardTitle)}</div>
        
        <div style="background:${theme.bg};border:1px dashed ${theme.border};border-radius:6px;padding:6px;text-align:center;margin-top:4px;">
          <div style="font-size:11px;font-weight:900;color:${theme.text};">${escapeXml(col.formula || '')}</div>
        </div>
      </div>
    </div>`;
    cell(`col_${idx}`, colHtml, cx, 128, colWidth, 687, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  });

  // 4. BOTTOM BANNER (y=822..882)
  const btmBannerHtml = `<div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:8px;padding:6px 14px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11.5px;font-weight:900;color:#0F172A;">Downstream Consumption &amp; Feedback Loop</div>
    <div style="display:flex;align-items:center;gap:12px;font-size:11px;font-weight:800;color:#334155;">
      <span>🦊 GitLab</span>
      <span>⚡ dbt</span>
      <span>🐙 GitHub</span>
      <span style="background:#EFF6FF;border:1px solid #93C5FD;padding:2px 8px;border-radius:4px;color:#1D4ED8;">🔍 Graph Visualization</span>
      <span style="background:#F0FDF4;border:1px solid #86EFAC;padding:2px 8px;border-radius:4px;color:#15803D;">🧠 LLM Context</span>
      <span style="background:#FFF7ED;border:1px solid #FED7AA;padding:2px 8px;border-radius:4px;color:#C2410C;">🔄 Integration Workflow</span>
    </div>
  </div>`;
  cell('btm_banner', btmBannerHtml, 30, 822, 1540, 50, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 5. FOOTER (y=878..910)
  const ftrHtml = `<div style="display:flex;align-items:center;justify-content:space-between;padding:0 8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:800;color:#64748B;">
    <div>PRODUCER INDEPENDENCE | CONSUMER INDEPENDENCE | FORMAT, NOT PLATFORM</div>
    <div style="display:flex;align-items:center;gap:6px;color:#0F172A;font-weight:900;">
      <span>Google Cloud</span>
    </div>
  </div>`;
  cell('main_footer', ftrHtml, 30, 878, 1540, 28, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  return `<mxfile host="embed.diagrams.net">
  <diagram id="visual_concept_infographic" name="${escapeXml(spec.title)}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// ============================================================================
// DYNAMIC DOMAIN SYNTHESIZER
// ============================================================================

export function synthesizeVisualConceptSpecFromPrompt(prompt: string): VisualConceptSpec {
  const p = prompt.toLowerCase();

  // 1. QUANTUM PHYSICS / QUANTUM THEORY / COMPUTING
  if (p.includes('quantum') || p.includes('wave particle') || p.includes('entangle') || p.includes('superposition') || p.includes('schrodinger') || p.includes('qubit')) {
    return {
      title: 'VISUAL GUIDE: QUANTUM THEORY & CORE FOUNDATIONS',
      layout: 'triad-comparison',
      columns: [
        {
          id: 'col_wave',
          number: 1,
          title: '1. WAVE-PARTICLE DUALITY: LIGHT & MATTER',
          themeColor: 'blue',
          icon: '🌊',
          badge: 'Dual State',
          heroType: 'quantum-wave',
          heroValue: 'λ = h / p (de Broglie)',
          heroSubtext: 'Photons act as waves in transit & particles on hit',
          definitionTitle: 'WHAT IS WAVE-PARTICLE DUALITY?',
          definitionBody: 'Matter and light exhibit behaviors of both continuous wave interference and localized discrete particle packets (quanta).',
          checkmarks: { label1: 'Wave Interference: Yes', val1: true, label2: 'Discrete Photons: Yes', val2: true },
          subCardTitle: 'Double-Slit Interference Screen',
          formula: 'E = h · f  •  Photon Energy Proportional to Frequency'
        },
        {
          id: 'col_super',
          number: 2,
          title: '2. SUPERPOSITION: SCHRÖDINGER STATE',
          themeColor: 'purple',
          icon: '🐱',
          badge: 'Qubit State',
          heroType: 'qubit-sphere',
          heroValue: '|ψ⟩ = α|0⟩ + β|1⟩',
          heroSubtext: 'Simultaneous 0 and 1 until wave collapse',
          definitionTitle: 'WHAT IS QUANTUM SUPERPOSITION?',
          definitionBody: 'A quantum system exists in a linear combination of all possible states until a measurement forces a definite outcome.',
          checkmarks: { label1: 'Multiple States: Yes', val1: true, label2: 'Deterministic Pre-Measurement: No', val2: false },
          subCardTitle: 'Bloch Sphere State Representation',
          formula: '|α|² + |β|² = 1.0  (Total Probability Conservation)'
        },
        {
          id: 'col_entangle',
          number: 3,
          title: '3. QUANTUM ENTANGLEMENT: SPOOKY ACTION',
          themeColor: 'orange',
          icon: '🔗',
          badge: 'Correlation',
          heroType: 'entanglement',
          heroValue: '|Φ⁺⟩ = (|00⟩ + |11⟩) / √2',
          heroSubtext: 'Instant spin correlation across light years',
          definitionTitle: 'WHAT IS ENTANGLEMENT?',
          definitionBody: 'Two particles become linked such that measuring one instantly dictates the exact state of the other, faster than light.',
          checkmarks: { label1: 'Instant Correlation: Yes', val1: true, label2: 'Hidden Local Variables: No', val2: false },
          subCardTitle: 'EPR Paradox & Bell Inequality Test',
          formula: 'Measurement on Particle A ➔ Particle B collapses instantly'
        }
      ]
    };
  }

  // 2. KINEMATICS / MOTION (Speed vs Velocity vs Acceleration)
  if (p.includes('speed') || p.includes('velocity') || p.includes('acceleration') || p.includes('kinematics') || p.includes('motion')) {
    return {
      title: 'VISUAL GUIDE: SPEED, VELOCITY, & ACCELERATION',
      layout: 'triad-comparison',
      columns: [
        {
          id: 'col_speed',
          number: 1,
          title: '1. SPEED (Scalar): HOW FAST?',
          themeColor: 'green',
          icon: '🔍',
          badge: 'Scalar',
          heroType: 'speedometer',
          heroValue: 'Instantaneous Speed = 60 MPH',
          heroSubtext: '(Scalar: Magnitude only)',
          definitionTitle: 'WHAT IS SPEED?',
          definitionBody: 'Speed is the rate at which an object covers distance. It does NOT include direction.',
          checkmarks: { label1: 'Magnitude: Yes', val1: true, label2: 'Direction: No', val2: false },
          subCardTitle: "Alice's Trip",
          formula: 'Average Speed = (Total Distance) / (Total Time)'
        },
        {
          id: 'col_velocity',
          number: 2,
          title: '2. VELOCITY (Vector): HOW FAST + WHICH WAY?',
          themeColor: 'blue',
          icon: '⏱️',
          badge: 'Vector',
          heroType: 'compass',
          heroValue: "Alice's Velocity = 60 MPH North",
          heroSubtext: '(Vector: Magnitude & Direction)',
          definitionTitle: 'WHAT IS VELOCITY?',
          definitionBody: "Velocity is the rate of change of an object's position (Displacement). It includes speed AND direction.",
          checkmarks: { label1: 'Magnitude: Yes', val1: true, label2: 'Direction: Yes', val2: true },
          subCardTitle: 'Constant Velocity vs Changing Velocity',
          formula: 'Turning at constant speed changes velocity (Direction changes)!'
        },
        {
          id: 'col_accel',
          number: 3,
          title: '3. ACCELERATION (Vector): CHANGE IN VELOCITY?',
          themeColor: 'orange',
          icon: '🏎️',
          badge: 'Rate',
          heroType: 'thrust',
          heroValue: 'Force & Change',
          heroSubtext: 'Speed Up • Turn • Brake',
          definitionTitle: 'WHAT IS ACCELERATION?',
          definitionBody: 'Acceleration is any change in velocity: SPEED UP, SLOW DOWN, OR CHANGE DIRECTION.',
          checkmarks: { label1: 'Magnitude: Yes', val1: true, label2: 'Direction: Yes', val2: true },
          subCardTitle: "Dijkstra's Algorithm & Acceleration Logic",
          formula: 'a⃗ = Δv⃗ / Δt (Speed Change, Direction Change, Time Delta)'
        }
      ]
    };
  }

  // 3. ENERGY MECHANICS (Potential vs Kinetic vs Work)
  if (p.includes('energy') || p.includes('potential') || p.includes('kinetic') || p.includes('thermodynamics')) {
    return {
      title: 'VISUAL GUIDE: POTENTIAL ENERGY VS. KINETIC ENERGY & WORK',
      layout: 'triad-comparison',
      columns: [
        {
          id: 'col_pe',
          number: 1,
          title: '1. POTENTIAL ENERGY: STORED ENERGY',
          themeColor: 'blue',
          icon: '🏔️',
          badge: 'Stored',
          heroType: 'generic-concept',
          heroValue: 'PE = m · g · h',
          heroSubtext: '(Position-dependent energy)',
          definitionTitle: 'WHAT IS POTENTIAL ENERGY?',
          definitionBody: 'Energy stored in an object due to its vertical position, gravitational state, or elastic tension.',
          checkmarks: { label1: 'Position: Yes', val1: true, label2: 'Motion: No', val2: false },
          subCardTitle: 'Roller Coaster Apex',
          formula: 'Maximum PE at highest peak before descent'
        },
        {
          id: 'col_ke',
          number: 2,
          title: '2. KINETIC ENERGY: MOTION ENERGY',
          themeColor: 'green',
          icon: '⚡',
          badge: 'Motion',
          heroType: 'generic-concept',
          heroValue: 'KE = ½ · m · v²',
          heroSubtext: '(Velocity-dependent energy)',
          definitionTitle: 'WHAT IS KINETIC ENERGY?',
          definitionBody: 'Energy of an object in active motion. Doubles with mass, quadruples with speed!',
          checkmarks: { label1: 'Speed: Yes', val1: true, label2: 'Mass: Yes', val2: true },
          subCardTitle: 'Valley Speed Maximum',
          formula: 'Maximum KE at lowest elevation'
        },
        {
          id: 'col_work',
          number: 3,
          title: '3. MECHANICAL WORK: ENERGY TRANSFER',
          themeColor: 'orange',
          icon: '⚙️',
          badge: 'Transfer',
          heroType: 'generic-concept',
          heroValue: 'W = F · d · cos(θ)',
          heroSubtext: '(Force across displacement)',
          definitionTitle: 'WHAT IS WORK & CONSERVATION?',
          definitionBody: 'Work is the measure of energy transfer when a force moves an object across distance.',
          checkmarks: { label1: 'Force: Yes', val1: true, label2: 'Distance: Yes', val2: true },
          subCardTitle: 'Conservation Law',
          formula: 'Total Mechanical Energy E = PE + KE = Constant'
        }
      ]
    };
  }

  // 4. DISTRIBUTED SYSTEMS ARCHITECTURE (Synchronous vs Asynchronous vs Event-Driven)
  if (p.includes('sync') || p.includes('async') || p.includes('event') || p.includes('queue') || p.includes('microservice') || p.includes('kafka') || p.includes('rest')) {
    return {
      title: 'VISUAL GUIDE: SYNCHRONOUS VS. ASYNCHRONOUS VS. EVENT-DRIVEN',
      layout: 'triad-comparison',
      columns: [
        {
          id: 'col_sync',
          number: 1,
          title: '1. SYNCHRONOUS: BLOCKING REST/gRPC',
          themeColor: 'blue',
          icon: '📞',
          badge: 'Blocking',
          heroType: 'sync-rest',
          heroValue: 'Direct Request-Response',
          heroSubtext: '(Caller waits for return)',
          definitionTitle: 'WHAT IS SYNCHRONOUS?',
          definitionBody: 'Client sends an HTTP/gRPC request and thread blocks until server completes and returns.',
          checkmarks: { label1: 'Immediate Reply: Yes', val1: true, label2: 'Decoupled: No', val2: false },
          subCardTitle: 'REST API Gateway',
          formula: 'T_total = T_network + T_processing'
        },
        {
          id: 'col_async',
          number: 2,
          title: '2. ASYNCHRONOUS: QUEUES & WORKERS',
          themeColor: 'green',
          icon: '📬',
          badge: 'Decoupled',
          heroType: 'async-queue',
          heroValue: 'Task Queues (Cloud Tasks)',
          heroSubtext: '(Fire and acknowledge)',
          definitionTitle: 'WHAT IS ASYNCHRONOUS?',
          definitionBody: 'Client pushes job to queue and immediately receives HTTP 202 Accepted. Background worker processes job.',
          checkmarks: { label1: 'Non-blocking: Yes', val1: true, label2: 'Retry Safe: Yes', val2: true },
          subCardTitle: 'Worker Pool Execution',
          formula: 'Buffer spikes with zero caller lag'
        },
        {
          id: 'col_event',
          number: 3,
          title: '3. EVENT-DRIVEN: PUBSUB STREAMING',
          themeColor: 'orange',
          icon: '📡',
          badge: 'Broadcast',
          heroType: 'event-stream',
          heroValue: 'Pub/Sub Event Bus',
          heroSubtext: '(Multi-subscriber fanout)',
          definitionTitle: 'WHAT IS EVENT-DRIVEN?',
          definitionBody: 'Producers publish events without knowing consumers. Many microservices react independently.',
          checkmarks: { label1: 'Zero Coupling: Yes', val1: true, label2: 'Fanout: Yes', val2: true },
          subCardTitle: 'Event Mesh Topology',
          formula: '1 Producer ➔ N Consumers in parallel'
        }
      ]
    };
  }

  // 5. UNIVERSAL CLEAN ADAPTIVE CONCEPT
  const words = prompt.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().split(' ').filter(w => w.length > 2);
  const cleanTitle = words.length > 0 ? `VISUAL GUIDE: ${words.slice(0, 5).join(' ')}` : 'VISUAL GUIDE: SYSTEM ARCHITECTURE & INTUITION';

  return {
    title: cleanTitle,
    layout: 'triad-comparison',
    columns: [
      {
        id: 'col_1',
        number: 1,
        title: `1. FOUNDATIONAL MODEL (${words[0] || 'CORE'})`,
        themeColor: 'blue',
        icon: '📐',
        badge: 'Foundation',
        heroType: 'generic-concept',
        heroValue: `Primary Invariant (${words[0] || 'Entity'})`,
        heroSubtext: 'Core mathematical and structural axioms',
        definitionTitle: 'WHAT IS THE PRIMARY MODEL?',
        definitionBody: 'The foundational state representation and baseline invariant principles governing this domain.',
        checkmarks: { label1: 'Baseline Invariant: Yes', val1: true, label2: 'State Isolation: Yes', val2: true },
        subCardTitle: 'Formulation & Invariants',
        formula: 'S = (V, E, W, Σ)  •  Foundational Space Bounds'
      },
      {
        id: 'col_2',
        number: 2,
        title: `2. TRANSFORMATION LOGIC (${words[1] || 'ENGINE'})`,
        themeColor: 'green',
        icon: '⚡',
        badge: 'Execution',
        heroType: 'generic-concept',
        heroValue: 'State Evolution Engine',
        heroSubtext: 'Dynamic state changes and transfer functions',
        definitionTitle: 'HOW DOES STATE EVOLVE?',
        definitionBody: 'The mechanisms and rules that drive transitions from initial input conditions to final convergence.',
        checkmarks: { label1: 'Deterministic Steps: Yes', val1: true, label2: 'Convergence Proof: Yes', val2: true },
        subCardTitle: 'Transition Engine & Relaxations',
        formula: 'S(t + 1) = f(S(t), Input)  •  Iterative Step Function'
      },
      {
        id: 'col_3',
        number: 3,
        title: `3. REAL-WORLD APPLICATIONS (${words[2] || 'FRONTIERS'})`,
        themeColor: 'orange',
        icon: '🔬',
        badge: 'Scale',
        heroType: 'generic-concept',
        heroValue: 'Frontier Implementations',
        heroSubtext: 'Modern industrial deployments and topologies',
        definitionTitle: 'WHERE IS THIS DEPLOYED?',
        definitionBody: 'High-throughput enterprise applications, scientific research, and real-world system integrations.',
        checkmarks: { label1: 'Production Proven: Yes', val1: true, label2: 'Horizontal Scale: Yes', val2: true },
        subCardTitle: 'Enterprise Topology & Ecosystem',
        formula: 'Ecosystem Integration & Telemetry Pipeline'
      }
    ]
  };
}
