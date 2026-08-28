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
  themeColor: 'green' | 'blue' | 'orange' | 'purple' | 'teal' | 'red';
  icon: string;
  heroType: 'speedometer' | 'compass' | 'thrust' | 'orbit' | 'battery' | 'scale' | 'flow';
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
  subCardType: 'route-map' | 'displacement-graph' | 'action-rows' | 'scenario-grid' | 'logic-engine';
  subCardDetails?: string[];
  formula?: string;
}

export interface VisualConceptSpec {
  title: string;
  subtitle?: string;
  layout: 'triad-comparison' | 'hero-split' | 'quad-matrix';
  columns: VisualConceptColumn[];
  simulator?: {
    enabled: boolean;
    title: string;
    badge: string;
    controls: Array<{
      label: string;
      type: 'button' | 'slider';
      color: string;
      actionScript: string;
    }>;
    telemetry: Array<{
      label: string;
      id: string;
      defaultVal: string;
      color: string;
    }>;
    caption: string;
  };
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
  red: { main: '#DC2626', bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C', lightBadge: '#FEE2E2', darkBadge: '#B91C1C' }
};

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
      heroWidgetHtml = `
        <div style="display:flex;align-items:center;justify-content:space-around;width:100%;">
          ${renderVehicleProfileSvg()}
          ${renderSpeedometerSvg(col.heroValue, theme.main)}
        </div>
      `;
    } else if (col.heroType === 'compass') {
      heroWidgetHtml = `
        <div style="display:flex;align-items:center;justify-content:space-around;width:100%;">
          <svg viewBox="0 0 120 70" width="105" height="60">
            <path d="M 10 45 L 20 28 Q 35 15 60 15 L 90 15 Q 105 15 112 28 L 118 45 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>
            <rect x="5" y="40" width="110" height="12" rx="3" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
            <circle cx="30" cy="52" r="10" fill="#0F172A"/>
            <circle cx="90" cy="52" r="10" fill="#0F172A"/>
          </svg>
          <svg viewBox="0 0 120 50" width="105" height="42">
            <line x1="10" y1="25" x2="95" y2="25" stroke="#2563EB" stroke-width="10"/>
            <polygon points="115,25 90,10 90,40" fill="#2563EB"/>
          </svg>
          ${renderCompassSvg(col.heroValue)}
        </div>
      `;
    } else {
      heroWidgetHtml = `
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #FED7AA;padding-bottom:5px;">
            <div style="font-size:10.5px;font-weight:900;color:#0F172A;width:80px;">A. SPEED UP!</div>
            <div style="font-size:8.5px;font-weight:900;color:#15803D;">➔ Accel Vector</div>
            <div style="font-size:11px;font-weight:900;color:#0F172A;">60 ➔ 80 🚀</div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #FED7AA;padding-bottom:5px;">
            <div style="font-size:10.5px;font-weight:900;color:#0F172A;width:80px;">B. TURN!</div>
            <div style="font-size:8.5px;font-weight:900;color:#2563EB;">↗️ Accel Vector</div>
            <div style="font-size:11px;font-weight:900;color:#0F172A;">60 ➔ 60 🛞</div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:10.5px;font-weight:900;color:#0F172A;width:80px;">C. BRAKE!</div>
            <div style="font-size:8.5px;font-weight:900;color:#DC2626;">⬅️ Decel Vector</div>
            <div style="font-size:11px;font-weight:900;color:#DC2626;">60 ➔ 40 🛑</div>
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

export function synthesizeVisualConceptSpecFromPrompt(prompt: string): VisualConceptSpec {
  const p = prompt.toLowerCase();

  // 1. Kinematics / Motion (Speed vs Velocity vs Acceleration)
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
          subCardType: 'route-map',
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
          subCardType: 'displacement-graph',
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
          subCardType: 'logic-engine',
          formula: 'a⃗ = Δv⃗ / Δt (Speed Change, Direction Change, Time Delta)'
        }
      ]
    };
  }

  // 2. Energy Mechanics (Potential vs Kinetic vs Work)
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
          heroType: 'speedometer',
          heroValue: 'PE = m · g · h',
          heroSubtext: '(Position-dependent energy)',
          definitionTitle: 'WHAT IS POTENTIAL ENERGY?',
          definitionBody: 'Energy stored in an object due to its vertical position, gravitational state, or elastic tension.',
          checkmarks: { label1: 'Position: Yes', val1: true, label2: 'Motion: No', val2: false },
          subCardTitle: 'Roller Coaster Apex',
          subCardType: 'route-map',
          formula: 'Maximum PE at highest peak before descent'
        },
        {
          id: 'col_ke',
          number: 2,
          title: '2. KINETIC ENERGY: MOTION ENERGY',
          themeColor: 'green',
          icon: '⚡',
          badge: 'Motion',
          heroType: 'compass',
          heroValue: 'KE = ½ · m · v²',
          heroSubtext: '(Velocity-dependent energy)',
          definitionTitle: 'WHAT IS KINETIC ENERGY?',
          definitionBody: 'Energy of an object in active motion. Doubles with mass, quadruples with speed!',
          checkmarks: { label1: 'Speed: Yes', val1: true, label2: 'Mass: Yes', val2: true },
          subCardTitle: 'Valley Speed Maximum',
          subCardType: 'displacement-graph',
          formula: 'Maximum KE at lowest elevation'
        },
        {
          id: 'col_work',
          number: 3,
          title: '3. MECHANICAL WORK: ENERGY TRANSFER',
          themeColor: 'orange',
          icon: '⚙️',
          badge: 'Transfer',
          heroType: 'thrust',
          heroValue: 'W = F · d · cos(θ)',
          heroSubtext: '(Force across displacement)',
          definitionTitle: 'WHAT IS WORK & CONSERVATION?',
          definitionBody: 'Work is the measure of energy transfer when a force moves an object across distance.',
          checkmarks: { label1: 'Force: Yes', val1: true, label2: 'Distance: Yes', val2: true },
          subCardTitle: 'Conservation Law',
          subCardType: 'logic-engine',
          formula: 'Total Mechanical Energy E = PE + KE = Constant'
        }
      ]
    };
  }

  // 3. Systems Architecture (Synchronous vs Asynchronous vs Event-Driven)
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
        heroType: 'speedometer',
        heroValue: 'Direct Request-Response',
        heroSubtext: '(Caller waits for return)',
        definitionTitle: 'WHAT IS SYNCHRONOUS?',
        definitionBody: 'Client sends an HTTP/gRPC request and thread blocks until server completes and returns.',
        checkmarks: { label1: 'Immediate Reply: Yes', val1: true, label2: 'Decoupled: No', val2: false },
        subCardTitle: 'REST API Gateway',
        subCardType: 'route-map',
        formula: 'T_total = T_network + T_processing'
      },
      {
        id: 'col_async',
        number: 2,
        title: '2. ASYNCHRONOUS: QUEUES & WORKERS',
        themeColor: 'green',
        icon: '📬',
        badge: 'Decoupled',
        heroType: 'compass',
        heroValue: 'Task Queues (Cloud Tasks)',
        heroSubtext: '(Fire and acknowledge)',
        definitionTitle: 'WHAT IS ASYNCHRONOUS?',
        definitionBody: 'Client pushes job to queue and immediately receives HTTP 202 Accepted. Background worker processes job.',
        checkmarks: { label1: 'Non-blocking: Yes', val1: true, label2: 'Retry Safe: Yes', val2: true },
        subCardTitle: 'Worker Pool Execution',
        subCardType: 'displacement-graph',
        formula: 'Buffer spikes with zero caller lag'
      },
      {
        id: 'col_event',
        number: 3,
        title: '3. EVENT-DRIVEN: PUBSUB STREAMING',
        themeColor: 'orange',
        icon: '📡',
        badge: 'Broadcast',
        heroType: 'thrust',
        heroValue: 'Pub/Sub Event Bus',
        heroSubtext: '(Multi-subscriber fanout)',
        definitionTitle: 'WHAT IS EVENT-DRIVEN?',
        definitionBody: 'Producers publish events without knowing consumers. Many microservices react independently.',
        checkmarks: { label1: 'Zero Coupling: Yes', val1: true, label2: 'Fanout: Yes', val2: true },
        subCardTitle: 'Event Mesh Topology',
        subCardType: 'logic-engine',
        formula: '1 Producer ➔ N Consumers in parallel'
      }
    ]
  };
}
