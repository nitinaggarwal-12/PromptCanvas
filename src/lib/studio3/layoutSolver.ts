import { Studio3SemanticGraph, Studio3Band, Studio3Column, Studio3PipelineStage, Studio3ConceptualRoadmap, Studio3FreeformElement } from './graphExtractor';
import { renderGcpIconHtml } from '../gcpIcons';
import { generateTemplate51GraphTheoryLearningRoadmapXml } from '../canonical/template51GraphTheoryLearningRoadmap';

export interface LayoutOptions {
  theme?: 'light' | 'dark';
  canvasWidth?: number;
  canvasHeight?: number;
}

function escapeXml(str: any): string {
  if (!str) return '';
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const COLOR_MAP: Record<string, { bg: string; text: string; lightBg: string; border: string }> = {
  blue: { bg: '#1D4ED8', text: '#FFFFFF', lightBg: '#EFF6FF', border: '#3B82F6' },
  teal: { bg: '#0D9488', text: '#FFFFFF', lightBg: '#F0FDFA', border: '#14B8A6' },
  purple: { bg: '#7C3AED', text: '#FFFFFF', lightBg: '#FAF5FF', border: '#8B5CF6' },
  slate: { bg: '#475569', text: '#FFFFFF', lightBg: '#F8FAFC', border: '#64748B' },
  amber: { bg: '#D97706', text: '#FFFFFF', lightBg: '#FFFBEB', border: '#F59E0B' },
  emerald: { bg: '#059669', text: '#FFFFFF', lightBg: '#ECFDF5', border: '#10B981' },
  green: { bg: '#059669', text: '#FFFFFF', lightBg: '#ECFDF5', border: '#10B981' },
  indigo: { bg: '#4338CA', text: '#FFFFFF', lightBg: '#EEF2FF', border: '#6366F1' },
  cyan: { bg: '#0891B2', text: '#FFFFFF', lightBg: '#ECFEFF', border: '#06B6D4' },
  red: { bg: '#DC2626', text: '#FFFFFF', lightBg: '#FEF2F2', border: '#EF4444' }
};

export function renderTwoSidesOfTheSpinInfographicXml(
  roadmap: Studio3ConceptualRoadmap,
  theme: 'light' | 'dark' = 'light'
): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${escapeXml(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. TOP TITLE BANNER (y=20..75) - Centered, massive, high-impact headline
  const titleHtml = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;font-family:Impact,'Arial Black',-apple-system,sans-serif;box-sizing:border-box;">
    <div style="font-size:42px;font-weight:900;letter-spacing:1.5px;color:#0F172A;text-transform:uppercase;text-align:center;line-height:1.1;">
      CENTRIPETAL VS CENTRIFUGAL FORCE: TWO SIDES OF THE SPIN
    </div>
  </div>`;
  cell('hdr_title', titleHtml, 20, 15, 1560, 60, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 2. LEFT PANEL: CENTRIPETAL FORCE (x=40..420, y=85..565)
  const leftHdrHtml = `<div style="background:#1D70B8;color:#FFFFFF;border-top-left-radius:12px;border-top-right-radius:12px;padding:12px 18px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;">👁️</span>
    <div>
      <div style="font-size:20px;font-weight:900;letter-spacing:0.5px;text-transform:uppercase;line-height:1.1;">CENTRIPETAL FORCE</div>
      <div style="font-size:12px;opacity:0.95;font-weight:600;margin-top:2px;">(View from Outside / Ground Observer)</div>
    </div>
  </div>`;
  cell('left_hdr', leftHdrHtml, 40, 85, 380, 72, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  const leftBodyHtml = `<div style="background:#DBEDFA;border-bottom-left-radius:12px;border-bottom-right-radius:12px;padding:18px 20px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;color:#0B2144;display:flex;flex-direction:column;justify-content:space-between;">
    <div>
      <div style="font-size:13.5px;font-weight:800;color:#0B2144;line-height:1.45;margin-bottom:12px;">
        <strong>CENTRIPETAL FORCE</strong> is a <em>real physical force</em> that acts continuously on an object in circular motion, pulling it inward toward the center:
      </div>

      <div style="font-size:12.5px;line-height:1.65;color:#0B2144;font-weight:700;">
        <div style="margin-bottom:4px;">• <strong>String Tension:</strong> Taut rope pulling swinging mass</div>
        <div style="margin-bottom:4px;">• <strong>Tire Friction:</strong> Road grip pushing car inward into turn</div>
        <div style="margin-bottom:4px;">• <strong>Gravity:</strong> Pulling planets &amp; satellites into orbit</div>
        <div style="margin-bottom:4px;">• <strong>Normal Force:</strong> Curved track banking pushes inwards</div>
      </div>
    </div>

    <div style="background:#FFFFFF;border:1.5px solid #93C5FD;border-radius:8px;padding:8px 12px;text-align:center;margin-top:10px;">
      <div style="font-size:13px;font-weight:900;color:#1D70B8;">Fc = m · v² / r = m · ω² · r</div>
      <div style="font-size:10px;font-weight:700;color:#2563EB;margin-top:2px;">Real Inward Force Vector (Perpendicular to v)</div>
    </div>
  </div>`;
  cell('left_body', leftBodyHtml, 40, 157, 380, 395, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 3. CENTER HERO: INTERACTIVE PHYSICS SANDBOX & DYNAMIC VECTORS (x=430..1150, y=75..565)
  const centerHeroHtml = `<div id="physics_sandbox" style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;width:100%;height:100%;font-family:system-ui,-apple-system,sans-serif;box-sizing:border-box;padding:8px;">
    
    <!-- Top Interactive Control Bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;width:100%;background:#F8FAFC;border:1.5px solid #CBD5E1;border-radius:10px;padding:6px 14px;box-sizing:border-box;">
      <!-- Speed Slider -->
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:11px;font-weight:800;color:#0F172A;">⚡ Spin Speed:</span>
        <input type="range" id="spin_speed" min="1" max="10" value="4" style="width:90px;cursor:pointer;" oninput="
          var dur = (16 / this.value) + 's';
          var rot = document.getElementById('rot_group');
          if(rot) rot.style.animationDuration = dur;
          var fcLen = 30 + this.value * 9;
          var fcLine = document.getElementById('fc_arrow');
          if(fcLine) fcLine.setAttribute('x2', 270 - fcLen * 0.7);
          var valDisp = document.getElementById('fc_val');
          if(valDisp) valDisp.innerText = Math.round(this.value * 28) + ' N';
        "/>
      </div>

      <!-- Live Readout Badge -->
      <div style="background:#EFF6FF;border:1px solid #93C5FD;border-radius:6px;padding:3px 10px;font-size:10.5px;font-weight:800;color:#1D4ED8;">
        Fc = <span id="fc_val">112 N</span> | v = <span id="v_val">8.4 m/s</span>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;align-items:center;gap:6px;">
        <button style="background:#EF4444;color:#FFFFFF;border:none;border-radius:6px;padding:5px 12px;font-size:10.5px;font-weight:900;cursor:pointer;box-shadow:0 2px 4px rgba(239,68,68,0.3);" onclick="
          var str = document.getElementById('string_line');
          if(str) str.style.display = 'none';
          var rot = document.getElementById('rot_group');
          if(rot) rot.style.animationPlayState = 'paused';
          var alertB = document.getElementById('inertia_alert');
          if(alertB) { alertB.style.display = 'block'; alertB.innerText = '✂️ STRING CUT! Ball flies straight along tangent vector (INERTIA)!'; }
        ">✂️ Cut String</button>
        <button style="background:#3B82F6;color:#FFFFFF;border:none;border-radius:6px;padding:5px 10px;font-size:10.5px;font-weight:800;cursor:pointer;" onclick="
          var str = document.getElementById('string_line');
          if(str) str.style.display = 'inline';
          var rot = document.getElementById('rot_group');
          if(rot) { rot.style.animationPlayState = 'running'; rot.style.animationDuration = '4s'; }
          var alertB = document.getElementById('inertia_alert');
          if(alertB) alertB.style.display = 'none';
          var sp = document.getElementById('spin_speed');
          if(sp) sp.value = 4;
          var valDisp = document.getElementById('fc_val');
          if(valDisp) valDisp.innerText = '112 N';
        ">🔄 Reset</button>
      </div>
    </div>

    <!-- Inertia Flash Callout -->
    <div id="inertia_alert" style="display:none;background:#FEF3C7;color:#92400E;border:1.5px solid #F59E0B;border-radius:8px;padding:4px 12px;font-size:11px;font-weight:900;text-align:center;margin:4px 0;width:95%;"></div>

    <!-- Main Live Orbit Canvas -->
    <div style="position:relative;width:520px;height:380px;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 520 380" width="520" height="380" style="overflow:visible;">
        <defs>
          <style>
            @keyframes spinOrbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .orbiting-group {
              transform-origin: 260px 190px;
              animation: spinOrbit 4s linear infinite;
            }
          </style>
        </defs>

        <!-- Top Green Tangential Velocity Vector (v) -->
        <g transform="translate(260, 25)">
          <text x="0" y="-14" text-anchor="middle" font-size="15" font-weight="900" fill="#059669">Velocity v (Inertia wants straight line)</text>
          <line x1="-90" y1="8" x2="90" y2="8" stroke="#059669" stroke-width="5"/>
          <polygon points="102,8 86,1 86,15" fill="#059669"/>
        </g>

        <!-- Circular Orbit Track -->
        <circle cx="260" cy="190" r="140" stroke="#0F172A" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>

        <!-- Center Person (Top-Down Avatar) -->
        <g transform="translate(260, 190)">
          <!-- Head -->
          <circle cx="0" cy="0" r="14" fill="#92400E" stroke="#0F172A" stroke-width="2.5"/>
          <!-- Torso -->
          <ellipse cx="0" cy="5" rx="20" ry="12" fill="#2563EB" stroke="#0F172A" stroke-width="2.5"/>
          <circle cx="-10" cy="26" r="4" fill="#FBBF24"/>
        </g>

        <!-- Live Rotating Motion Group -->
        <g id="rot_group" class="orbiting-group">
          <!-- Taut String Line -->
          <line id="string_line" x1="250" y1="216" x2="162" y2="298" stroke="#0F172A" stroke-width="3.5"/>

          <!-- Orbiting Red Ball (Mass m) -->
          <circle cx="162" cy="298" r="20" fill="#DC2626" stroke="#0F172A" stroke-width="2.5"/>
          <text x="162" y="304" text-anchor="middle" font-size="12" font-weight="900" fill="#FFFFFF">m</text>

          <!-- Blue Inward Centripetal Force Vector (Fc -> center) -->
          <line id="fc_arrow" x1="162" y1="298" x2="225" y2="230" stroke="#1D70B8" stroke-width="5"/>
          <polygon points="230,225 218,228 226,238" fill="#1D70B8"/>
          
          <!-- Red Outward Centrifugal Vector (Dashed) -->
          <line x1="260" y1="190" x2="390" y2="190" stroke="#DC2626" stroke-width="5" stroke-dasharray="8 5"/>
          <polygon points="402,190 388,180 388,200" fill="#DC2626"/>
        </g>

        <!-- Static Descriptive Badges -->
        <text x="260" y="80" text-anchor="middle" font-size="15" font-weight="900" fill="#1D70B8">Centripetal Force Fc</text>
        <text x="260" y="96" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1D70B8">(Real inward pull)</text>

        <text x="355" y="218" text-anchor="middle" font-size="14" font-weight="900" fill="#DC2626">Centrifugal Force</text>
        <text x="355" y="234" text-anchor="middle" font-size="11" font-weight="700" fill="#DC2626">(Perceived outward push)</text>
      </svg>
    </div>

    <div style="font-size:11px;font-weight:800;color:#0F172A;background:#F1F5F9;padding:4px 14px;border-radius:15px;border:1px solid #CBD5E1;">
      ⚡ Drag speed slider to increase $F_c = m v^2 / r$ or click <strong>✂️ Cut String</strong> to observe straight-line inertia!
    </div>
  </div>`;
  cell('center_hero', centerHeroHtml, 430, 75, 720, 490, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 4. RIGHT PANEL: CENTRIFUGAL FORCE (x=1160..1540, y=85..565)
  const rightHdrHtml = `<div style="background:#E03131;color:#FFFFFF;border-top-left-radius:12px;border-top-right-radius:12px;padding:12px 18px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;">🏍️</span>
    <div>
      <div style="font-size:20px;font-weight:900;letter-spacing:0.5px;text-transform:uppercase;line-height:1.1;">CENTRIFUGAL FORCE</div>
      <div style="font-size:12px;opacity:0.95;font-weight:600;margin-top:2px;">(View from Inside / Rider)</div>
    </div>
  </div>`;
  cell('right_hdr', rightHdrHtml, 1160, 85, 380, 72, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  const rightBodyHtml = `<div style="background:#FFE6D9;border-bottom-left-radius:12px;border-bottom-right-radius:12px;padding:18px 20px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;color:#491203;display:flex;flex-direction:column;justify-content:space-between;">
    <div>
      <div style="font-size:13.5px;font-weight:800;color:#491203;line-height:1.45;margin-bottom:12px;">
        <strong>CENTRIFUGAL FORCE</strong> is an <em>apparent feeling</em> where the rider perceives an outward push caused by <strong>INERTIA</strong> resisting the turn:
      </div>

      <div style="font-size:12.5px;line-height:1.65;color:#491203;font-weight:700;">
        <div style="margin-bottom:4px;">• <strong>No Physical Agent:</strong> No outward push exists in reality!</div>
        <div style="margin-bottom:4px;">• <strong>Inertia (Newton's 1st Law):</strong> Body wants to go straight</div>
        <div style="margin-bottom:4px;">• <strong>Frame Acceleration:</strong> Car turns beneath you, making you hit door</div>
        <div style="margin-bottom:4px;">• <strong>Fictitious Sensation:</strong> Only felt within rotating frames</div>
      </div>
    </div>

    <div style="background:#FFFFFF;border:1.5px solid #FCA5A5;border-radius:8px;padding:8px 12px;text-align:center;margin-top:10px;">
      <div style="font-size:13px;font-weight:900;color:#DC2626;">Fcf = - m · (ω × (ω × r)) = m · ω² · r</div>
      <div style="font-size:10px;font-weight:700;color:#B91C1C;margin-top:2px;">Apparent Outward Force in Rotating Coordinates</div>
    </div>
  </div>`;
  cell('right_body', rightBodyHtml, 1160, 157, 380, 395, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 5. BOTTOM 4 REAL-WORLD GRAPHICAL VIGNETTES (y=570..950)
  
  // Vignette 1: Car Turning Corner (x=40..395)
  const v1Html = `<div style="background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:12px;padding:12px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <svg viewBox="0 0 320 200" width="300" height="180" style="border-radius:8px;overflow:hidden;">
      <!-- Grass Field -->
      <rect x="0" y="0" width="320" height="200" fill="#86EFAC"/>
      <!-- Gray Road Surface -->
      <path d="M 0 200 L 0 100 Q 0 35 65 35 L 320 35 L 320 115 L 135 115 Q 75 115 75 155 L 75 200 Z" fill="#94A3B8"/>
      <!-- Road Outer Border -->
      <path d="M 0 100 Q 0 35 65 35 L 320 35" stroke="#0F172A" stroke-width="3" fill="none"/>
      <path d="M 75 200 L 75 155 Q 75 115 135 115 L 320 115" stroke="#0F172A" stroke-width="3" fill="none"/>
      
      <!-- Green Turning Path Vector -->
      <path d="M 38 200 L 38 120 Q 38 75 105 75 L 300 75" stroke="#059669" stroke-width="5" fill="none"/>
      <polygon points="312,75 296,67 296,83" fill="#059669"/>

      <!-- Blue Car on Curve -->
      <g transform="translate(62, 100) rotate(45)">
        <rect x="-18" y="-28" width="36" height="56" rx="8" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2"/>
        <rect x="-12" y="-12" width="24" height="16" rx="2" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="-12" y="8" width="24" height="12" rx="2" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="-10" y="-4" width="20" height="14" fill="#2563EB"/>
        <rect x="-21" y="-22" width="4" height="10" rx="2" fill="#0F172A"/>
        <rect x="17" y="-22" width="4" height="10" rx="2" fill="#0F172A"/>
        <rect x="-21" y="10" width="4" height="10" rx="2" fill="#0F172A"/>
        <rect x="17" y="10" width="4" height="10" rx="2" fill="#0F172A"/>
      </g>
    </svg>
    <div style="text-align:center;margin-top:6px;">
      <div style="font-size:13px;font-weight:900;color:#0F172A;">1. CAR TURNING A CORNER</div>
      <div style="font-size:10px;color:#475569;font-weight:700;margin-top:2px;">Tires push car inward; passenger inertia hits door</div>
    </div>
  </div>`;
  cell('vignette_1', v1Html, 40, 575, 360, 260, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Vignette 2: Swinging Ball on String / Pendulum (x=420..775)
  const v2Html = `<div style="background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:12px;padding:12px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <svg viewBox="0 0 320 200" width="300" height="180">
      <!-- Top Fixed Pivot -->
      <line x1="130" y1="12" x2="190" y2="12" stroke="#0F172A" stroke-width="4"/>
      <circle cx="160" cy="12" r="5" fill="#0F172A"/>

      <!-- Dashed Initial Position -->
      <line x1="160" y1="12" x2="85" y2="125" stroke="#0F172A" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="85" cy="125" r="22" fill="#FCA5A5" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 3"/>

      <!-- Curved Swing Path Arc -->
      <path d="M 85 125 Q 125 165 160 165" stroke="#0F172A" stroke-width="2" stroke-dasharray="4 3" fill="none"/>
      <polygon points="163,165 151,158 153,169" fill="#0F172A"/>

      <!-- Solid Current Position -->
      <line x1="160" y1="12" x2="160" y2="160" stroke="#0F172A" stroke-width="3"/>
      <circle cx="160" cy="160" r="24" fill="#DC2626" stroke="#0F172A" stroke-width="2.5"/>
    </svg>
    <div style="text-align:center;margin-top:6px;">
      <div style="font-size:13px;font-weight:900;color:#0F172A;">2. BALL ON A STRING</div>
      <div style="font-size:10px;color:#475569;font-weight:700;margin-top:2px;">Rope tension pulls ball in; if cut, flies straight tangent</div>
    </div>
  </div>`;
  cell('vignette_2', v2Html, 420, 575, 360, 260, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Vignette 3: Washing Machine (x=800..1155)
  const v3Html = `<div style="background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:12px;padding:12px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <svg viewBox="0 0 320 200" width="300" height="180">
      <!-- Machine Outer Frame -->
      <rect x="90" y="8" width="140" height="180" rx="10" fill="#F8FAFC" stroke="#0F172A" stroke-width="3"/>
      <!-- Top Control Panel Line -->
      <line x1="90" y1="48" x2="230" y2="48" stroke="#0F172A" stroke-width="2.5"/>
      <!-- Dial Knob -->
      <circle cx="205" cy="28" r="9" fill="#E2E8F0" stroke="#0F172A" stroke-width="2"/>
      <line x1="205" y1="28" x2="209" y2="23" stroke="#0F172A" stroke-width="2"/>
      <!-- Detergent Drawer -->
      <rect x="106" y="20" width="40" height="16" rx="2" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>

      <!-- Circular Outer Door Ring -->
      <circle cx="160" cy="116" r="48" fill="#E2E8F0" stroke="#0F172A" stroke-width="3"/>
      <!-- Glass Window -->
      <circle cx="160" cy="116" r="39" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
      
      <!-- Water Waves inside Drum -->
      <path d="M 130 122 Q 146 104 160 122 Q 174 140 190 122 Q 182 145 160 149 Q 138 145 130 122 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5"/>
      <path d="M 136 130 Q 148 116 160 130 Q 172 144 184 130" stroke="#0369A1" stroke-width="2" fill="none"/>
    </svg>
    <div style="text-align:center;margin-top:6px;">
      <div style="font-size:13px;font-weight:900;color:#0F172A;">3. WASHING MACHINE SPIN</div>
      <div style="font-size:10px;color:#475569;font-weight:700;margin-top:2px;">Drum wall pushes clothes in; water escapes out holes</div>
    </div>
  </div>`;
  cell('vignette_3', v3Html, 800, 575, 360, 260, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Vignette 4: Roller Coaster Loop (x=1180..1560)
  const v4Html = `<div style="background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:12px;padding:12px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:space-between;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <svg viewBox="0 0 380 200" width="360" height="180">
      <!-- Ground Support Base -->
      <line x1="20" y1="180" x2="360" y2="180" stroke="#0F172A" stroke-width="3"/>

      <!-- Vertical Support Trusses -->
      <line x1="70" y1="180" x2="70" y2="110" stroke="#64748B" stroke-width="2"/>
      <line x1="120" y1="180" x2="120" y2="65" stroke="#64748B" stroke-width="2"/>
      <line x1="190" y1="180" x2="190" y2="18" stroke="#64748B" stroke-width="2.5"/>
      <line x1="260" y1="180" x2="260" y2="65" stroke="#64748B" stroke-width="2"/>
      <line x1="310" y1="180" x2="310" y2="110" stroke="#64748B" stroke-width="2"/>

      <!-- Cross Bracing Ties -->
      <line x1="50" y1="180" x2="70" y2="130" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="70" y1="130" x2="90" y2="180" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="100" y1="180" x2="120" y2="90" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="120" y1="90" x2="140" y2="180" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="240" y1="180" x2="260" y2="90" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="260" y1="90" x2="280" y2="180" stroke="#94A3B8" stroke-width="1.5"/>

      <!-- Red Coaster Track Loop Curve -->
      <path d="M 20 165 Q 70 165 100 110 Q 130 45 160 18 Q 190 0 220 18 Q 250 45 280 110 Q 310 165 360 165" stroke="#DC2626" stroke-width="4.5" fill="none"/>
      <path d="M 20 171 Q 70 171 100 116 Q 130 51 160 24 Q 190 6 220 24 Q 250 51 280 116 Q 310 171 360 171" stroke="#991B1B" stroke-width="2" fill="none"/>

      <!-- Blue Coaster Cart Climbing Track -->
      <g transform="translate(105, 96) rotate(-55)">
        <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#2563EB" stroke="#0F172A" stroke-width="1.5"/>
        <circle cx="-8" cy="10" r="3.5" fill="#0F172A"/>
        <circle cx="8" cy="10" r="3.5" fill="#0F172A"/>
        <circle cx="0" cy="-2" r="3" fill="#FBBF24"/>
      </g>
    </svg>
    <div style="text-align:center;margin-top:6px;">
      <div style="font-size:13px;font-weight:900;color:#0F172A;">4. ROLLER COASTER LOOP</div>
      <div style="font-size:10px;color:#475569;font-weight:700;margin-top:2px;">Track pushes inward; inertia presses rider into seat</div>
    </div>
  </div>`;
  cell('vignette_4', v4Html, 1180, 575, 360, 260, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  return `<mxfile host="embed.diagrams.net">
  <diagram id="centripetal_vs_centrifugal" name="Centripetal vs Centrifugal Forces">
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

export function renderUniversalConceptualRoadmapXml(
  roadmap: Studio3ConceptualRoadmap,
  theme: 'light' | 'dark' = 'light'
): string {
  const isPhysics = (roadmap.title || '').toLowerCase().includes('centripetal') || (roadmap.title || '').toLowerCase().includes('spinning') || (roadmap.title || '').toLowerCase().includes('force');
  if (isPhysics) {
    return renderTwoSidesOfTheSpinInfographicXml(roadmap, theme);
  }

  const isDark = theme === 'dark';
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${escapeXml(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = 'edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=5;') =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // 2. TOP CHEVRON PROCESS RIBBON (y=78..118)
  const mColors: Record<string, { fill: string; stroke: string }> = {
    blue: { fill: '#3B82F6', stroke: '#1D4ED8' },
    green: { fill: '#10B981', stroke: '#047857' },
    orange: { fill: '#F97316', stroke: '#C2410C' },
    yellow: { fill: '#EAB308', stroke: '#A16207' },
    purple: { fill: '#8B5CF6', stroke: '#6D28D9' },
    teal: { fill: '#14B8A6', stroke: '#0F766E' }
  };

  const defaultMilestones: Array<{ title: string; color: 'blue' | 'green' | 'orange' | 'yellow'; icon?: string }> = [
    { title: 'INTUITION & ANALOGIES', color: 'blue', icon: '🧭' },
    { title: 'ESSENTIAL PREREQUISITES', color: 'green', icon: '📐' },
    { title: 'STEP-BY-STEP TAXONOMY', color: 'orange', icon: '🧱' },
    { title: 'MODERN FRONTIERS', color: 'yellow', icon: '🔬' }
  ];

  const milestones = (roadmap.milestones && roadmap.milestones.length === 4) ? roadmap.milestones : defaultMilestones;
  const chevronWidth = 375;
  milestones.forEach((m, idx) => {
    const colCfg = mColors[m.color] || mColors.blue;
    const x = 20 + idx * (chevronWidth + 10);
    const w = idx === 3 ? 405 : chevronWidth;
    const title = m.icon ? `${m.icon} ${m.title}` : m.title;
    cell(`chv_${idx}`, title, x, 78, w, 40, `shape=hexagon;perimeter=hexagonPerimeter2;fixedSize=1;size=16;rounded=1;fillColor=${colCfg.fill};strokeColor=${colCfg.stroke};fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;`);
  });

  // 3. TOP SECTION 1: Analogy & Live Dynamic Motion Simulator (x=20..395, y=126..500)
  const sec1 = roadmap.section1Analogy;
  const isPetroleum = (roadmap.title || '').toLowerCase().includes('petroleum') || (roadmap.title || '').toLowerCase().includes('gasoline') || (roadmap.title || '').toLowerCase().includes('refining');

  cell('sec1_bg', '', 20, 126, 375, 374, 'rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;');
  cell('sec1_title', `<div style="text-align:center;font-weight:900;font-size:13px;color:#1E3A8A;padding-top:8px;">${escapeXml(sec1?.title || 'Intuitive Real-World Analogy')}</div>`, 24, 130, 367, 24, 'text;html=1;whiteSpace=wrap;');

  if (isPetroleum) {
    // Dynamic Chemical Distillation Simulator with Animated Vapor Rise
    const distilSimHtml = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;box-sizing:border-box;">
      <svg viewBox="0 0 170 170" width="160" height="160" style="overflow:visible;">
        <!-- Distillation Column Body -->
        <rect x="55" y="15" width="60" height="135" rx="8" fill="#F8FAFC" stroke="#0284C7" stroke-width="2"/>
        
        <!-- Trays -->
        <line x1="55" y1="45" x2="115" y2="45" stroke="#CBD5E1" stroke-width="1.5"/>
        <line x1="55" y1="75" x2="115" y2="75" stroke="#CBD5E1" stroke-width="1.5"/>
        <line x1="55" y1="105" x2="115" y2="105" stroke="#CBD5E1" stroke-width="1.5"/>

        <!-- Animated Rising Vapor Bubbles -->
        <circle cx="85" cy="130" r="4" fill="#F59E0B" opacity="0.8">
          <animate attributeName="cy" values="130;30" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="130" r="3" fill="#38BDF8" opacity="0.8">
          <animate attributeName="cy" values="130;40" dur="2.4s" begin="0.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.1" dur="2.4s" begin="0.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="95" cy="130" r="3.5" fill="#10B981" opacity="0.8">
          <animate attributeName="cy" values="130;50" dur="1.8s" begin="0.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.1" dur="1.8s" begin="0.8s" repeatCount="indefinite"/>
        </circle>

        <!-- Temperature Labels -->
        <text x="122" y="32" font-size="7" font-weight="900" fill="#EF4444">40°C Naphtha</text>
        <text x="122" y="65" font-size="7" font-weight="900" fill="#F59E0B">160°C Kero</text>
        <text x="122" y="95" font-size="7" font-weight="900" fill="#10B981">250°C Diesel</text>
        <text x="122" y="135" font-size="7" font-weight="900" fill="#1E293B">350°C Residue</text>

        <!-- Feed Ingress -->
        <line x1="20" y1="120" x2="55" y2="120" stroke="#EF4444" stroke-width="2.5"/>
        <text x="22" y="112" font-size="7.5" font-weight="900" fill="#EF4444">🔥 Feed</text>
      </svg>
      <div style="font-size:9.5px;font-weight:800;color:#0284C7;margin-top:2px;">⚡ Live Thermal Fractionation: Light Vapor Ascends</div>
    </div>`;
    cell('sec1_simulator', distilSimHtml, 30, 160, 355, 190, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  } else {
    // Dynamic Interactive Actors Network
    const actors = sec1?.actors || [
      { id: 'act_1', name: 'Alice (Client)', avatar: '👧', x: 50, y: 170 },
      { id: 'act_2', name: 'Bob (Server)', avatar: '👦', x: 290, y: 170 },
      { id: 'act_3', name: 'Carol (Coordinator)', avatar: '👩', x: 170, y: 270 }
    ];
    actors.forEach((act, aIdx) => {
      const ax = act.x ?? (aIdx === 0 ? 50 : aIdx === 1 ? 290 : 170);
      const ay = act.y ?? (aIdx === 0 ? 170 : aIdx === 1 ? 170 : 270);
      cell(`act_${act.id}`, act.avatar || '👤', ax, ay, 56, 56, 'ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontSize=28;align=center;verticalAlign=middle;');
      cell(`lbl_${act.id}`, act.name, ax - 10, ay + 58, 76, 18, 'text;html=1;fontStyle=1;fontSize=10.5;fontColor=#1E293B;align=center;');
    });

    (sec1?.relations || [
      { from: 'act_1', to: 'act_2', label: 'Direct Interaction' },
      { from: 'act_1', to: 'act_3', label: 'Signal Vector' },
      { from: 'act_2', to: 'act_3', label: 'State Sync' }
    ]).forEach((rel, rIdx) => {
      edge(`rel_${rIdx}`, `act_${rel.from}`, `act_${rel.to}`, 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;dashed=1;dashPattern=6 4;flowAnimation=1;endArrow=classic;endSize=6;');
      if (rIdx === 0 && rel.label) {
        cell(`lbl_rel_${rIdx}`, rel.label, 140, 172, 110, 18, 'text;html=1;fontSize=9;fontStyle=1;fontColor=#2563EB;align=center;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;');
      }
    });
  }

  const legendItems = sec1?.legend || [
    { icon: '📐', label: 'Entities' },
    { icon: '🔗', label: 'Channels' },
    { icon: '📊', label: 'Topology' },
    { icon: '🎯', label: 'Invariants' }
  ];
  const legendHtml = `<div style="display:flex;align-items:center;justify-content:space-around;width:100%;height:100%;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:6px;padding:6px 10px;box-sizing:border-box;font-size:10px;font-weight:700;color:#1E293B;">
    ${legendItems.map(it => `<div>${it.icon} <strong>${escapeXml(it.label)}</strong></div>`).join('')}
  </div>`;
  cell('sec1_legend', legendHtml, 30, 360, 355, 46, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  cell('sec1_chal', `<div style="text-align:center;font-size:10px;font-weight:800;color:#DC2626;background:#FEE2E2;border:1px solid #FCA5A5;border-radius:6px;padding:6px;">${escapeXml(sec1?.challengeCallout || 'Key Challenge: Coordination Complexity & Scale Invariance')}</div>`, 30, 420, 355, 30, 'text;html=1;whiteSpace=wrap;');

  // 4. TOP SECTION 2: Prerequisites & Math Formalisms (x=405..780)
  const sec2 = roadmap.section2Prerequisites;
  cell('sec2_bg', '', 405, 126, 375, 374, 'rounded=1;arcSize=8;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1.5;');
  const mathHtml = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;box-sizing:border-box;">
    ${(sec2?.mathFormulas || [
      { name: 'Core Formulation (Mathematical Model)', formula: 'S = (V, E, W, Σ)', icon: '📐' },
      { name: 'Invariant & Conservation Laws', formula: '∂L/∂w = 0, ∑ Pr(X) = 1.0', icon: '💭' },
      { name: 'Complexity & Bounds', formula: 'Time: O(N log N) | Space: O(V + E)', icon: '⚡' }
    ]).map(f => `
      <div style="background:#FFFFFF;border:1px solid #A7F3D0;border-radius:8px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:11.5px;font-weight:900;color:#047857;">${escapeXml(f.name)}</div>
          <div style="font-size:9.5px;color:#065F46;margin-top:2px;">${escapeXml(f.formula)}</div>
        </div>
        <div style="font-size:20px;">${f.icon || '📐'}</div>
      </div>
    `).join('')}
    <div style="background:#D1FAE5;border:1px dashed #059669;border-radius:8px;padding:8px 10px;font-size:9.5px;color:#065F46;font-weight:700;">
      ${(sec2?.checklist || [
        '☑ Foundational Axiom Verification',
        '☑ Asymptotic Convergence & Stability',
        '☑ Dual Space Equivalence Proof'
      ]).map(cItem => `<div style="margin-bottom:2px;">${escapeXml(cItem)}</div>`).join('')}
    </div>
  </div>`;
  cell('sec2_content', mathHtml, 405, 126, 375, 374, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 5. TOP SECTION 3: Taxonomy & Variants (x=790..1165)
  const sec3 = roadmap.section3Taxonomy;
  cell('sec3_bg', '', 790, 126, 375, 374, 'rounded=1;arcSize=8;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1.5;');
  const variants = sec3?.variants || [
    { name: 'HOMOGENEOUS / SIMPLE', subtext: 'Symmetric connections', diagramType: 'nodes' as const },
    { name: 'DIRECTED FLOW', subtext: 'Asymmetric state transfers', diagramType: 'directed' as const },
    { name: 'WEIGHTED METRIC', subtext: 'Cost/Latency parameterized', diagramType: 'weighted' as const },
    { name: 'HIERARCHICAL / TREE', subtext: 'Rooted acyclic structure', diagramType: 'tree' as const }
  ];
  variants.forEach((v, vIdx) => {
    const py = 142 + vIdx * 64;
    cell(`t_v_${vIdx}`, `${v.name}\n${v.subtext || ''}`, 805, py, 140, 42, 'rounded=1;arcSize=10;fillColor=#FDBA74;strokeColor=#EA580C;fontColor=#7C2D12;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;');
    if (vIdx === 0) {
      cell('vg0_1', '', 980, py + 4, 16, 16, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
      cell('vg0_2', '', 1025, py + 4, 16, 16, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
      cell('vg0_3', '', 1002, py + 24, 16, 16, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
      edge('vge0_1', 'vg0_1', 'vg0_2', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
      edge('vge0_2', 'vg0_2', 'vg0_3', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
      edge('vge0_3', 'vg0_3', 'vg0_1', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
    } else if (vIdx === 1) {
      cell('vg1_1', '', 980, py + 4, 16, 16, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.2;');
      cell('vg1_2', '', 1025, py + 4, 16, 16, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.2;');
      cell('vg1_3', '', 1002, py + 24, 16, 16, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.2;');
      edge('vge1_1', 'vg1_1', 'vg1_2', 'strokeColor=#047857;strokeWidth=1.5;endArrow=classic;endSize=4;');
      edge('vge1_2', 'vg1_2', 'vg1_3', 'strokeColor=#047857;strokeWidth=1.5;endArrow=classic;endSize=4;');
      edge('vge1_3', 'vg1_3', 'vg1_1', 'strokeColor=#047857;strokeWidth=1.5;endArrow=classic;endSize=4;');
    } else if (vIdx === 2) {
      cell('vg2_1', '', 980, py + 4, 16, 16, 'ellipse;fillColor=#6366F1;strokeColor=#4338CA;strokeWidth=1.2;');
      cell('vg2_2', '', 1025, py + 4, 16, 16, 'ellipse;fillColor=#6366F1;strokeColor=#4338CA;strokeWidth=1.2;');
      cell('vg2_3', '', 1002, py + 24, 16, 16, 'ellipse;fillColor=#6366F1;strokeColor=#4338CA;strokeWidth=1.2;');
      edge('vge2_1', 'vg2_1', 'vg2_2', 'strokeColor=#4338CA;strokeWidth=1.2;endArrow=none;');
      edge('vge2_2', 'vg2_2', 'vg2_3', 'strokeColor=#4338CA;strokeWidth=1.2;endArrow=none;');
      cell('lbl_w1', 'w=5', 996, py - 2, 24, 10, 'text;fontColor=#4338CA;fontSize=7.5;fontStyle=1;');
    } else {
      cell('vg3_r', '', 1002, py + 2, 14, 14, 'ellipse;fillColor=#F59E0B;strokeColor=#B45309;strokeWidth=1.2;');
      cell('vg3_l', '', 980, py + 22, 12, 12, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.2;');
      cell('vg3_rg', '', 1024, py + 22, 12, 12, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.2;');
      edge('vge3_1', 'vg3_r', 'vg3_l', 'strokeColor=#B45309;strokeWidth=1.2;endArrow=none;');
      edge('vge3_2', 'vg3_r', 'vg3_rg', 'strokeColor=#B45309;strokeWidth=1.2;endArrow=none;');
    }
  });

  // 6. TOP SECTION 4: Modern Graph Science / Frontiers (x=1175..1580)
  const sec4 = roadmap.section4ModernFrontiers;
  cell('sec4_bg', '', 1175, 126, 405, 374, 'rounded=1;arcSize=8;fillColor=#FEFCE8;strokeColor=#FEF08A;strokeWidth=1.5;');
  cell('sec4_title', `<div style="text-align:center;font-weight:900;font-size:12.5px;color:#854D0E;padding-top:8px;text-transform:uppercase;">${escapeXml(sec4?.title || 'Traversable Knowledge Architecture')}</div>`, 1180, 130, 395, 24, 'text;html=1;whiteSpace=wrap;');

  const kgNodes = sec4?.knowledgeGraphNodes || [
    { id: 'kgn_1', label: 'Semantic\nMesh', color: '#38BDF8' },
    { id: 'kgn_2', label: 'Neural\nVector', color: '#F59E0B' },
    { id: 'kgn_3', label: 'Domain\nOntology', color: '#10B981' },
    { id: 'kgn_4', label: 'Inference\nGraph', color: '#A855F7' }
  ];
  cell('kg_c', 'Core', 1345, 195, 48, 48, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;');
  kgNodes.forEach((kgn, idx) => {
    const kx = idx === 0 ? 1195 : idx === 1 ? 1495 : idx === 2 ? 1335 : 1480;
    const ky = idx === 0 ? 175 : idx === 1 ? 175 : idx === 2 ? 290 : 290;
    cell(`kgn_${idx}`, kgn.label, kx, ky, 54, 54, `ellipse;fillColor=${kgn.color || '#38BDF8'};strokeColor=#0284C7;fontColor=#FFFFFF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;`);
    edge(`kge_${idx}`, `kgn_${idx}`, 'kg_c', 'strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;');
  });

  const bulletsHtml = `<div style="padding:10px 14px;font-family:system-ui,-apple-system,sans-serif;color:#713F12;font-size:10px;line-height:1.45;font-weight:700;">
    ${(sec4?.frameworkBullets || [
      '🔬 • High-dimensional Embedding & Spectral Analysis',
      '🧠 • Graph Neural Networks (GNN) & Message Passing',
      '💻 • Distributed Scalable Cloud Runtime (Vertex AI / GKE)'
    ]).map(b => `<div style="margin-bottom:4px;">${escapeXml(b)}</div>`).join('')}
  </div>`;
  cell('sec4_bullets', bulletsHtml, 1180, 365, 395, 80, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 7. BOTTOM WORKFLOW & EXECUTION PIPELINE (y=512..890)
  const wf = roadmap.bottomWorkflow;
  cell('wf_bg', '', 20, 512, 1560, 378, 'rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.8;');
  cell('wf_title', `<div style="text-align:center;font-size:15px;font-weight:900;color:#0F172A;letter-spacing:0.5px;text-transform:uppercase;">${escapeXml(wf?.title || 'KEY ALGORITHMS & EXECUTION WORKFLOW PIPELINE')}</div>`, 20, 520, 1560, 24, 'text;html=1;whiteSpace=wrap;');

  // Step 1: Problem Definition
  const s1 = wf?.step1Problem;
  cell('step1_box', '', 36, 554, 340, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const s1Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11.5px;font-weight:900;color:#1E3A8A;text-transform:uppercase;margin-bottom:4px;">${escapeXml(s1?.title || 'STEP 1: Problem Definition')}</div>
    <div style="font-size:10px;color:#64748B;font-weight:600;margin-bottom:8px;">${escapeXml(s1?.subtitle || 'Objective Function & Formulation')}</div>
    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:10px;text-align:center;margin-bottom:8px;">
      <div style="font-size:32px;margin-bottom:4px;">${s1?.icon || '🎯 📊'}</div>
      <div style="font-size:10.5px;font-weight:800;color:#1D4ED8;">${escapeXml(s1?.formula || 'min Cost C(x) s.t. Constraints')}</div>
    </div>
    <div style="font-size:9.5px;color:#334155;line-height:1.4;">
      ${(s1?.bullets || [
        '• Formal input state compilation',
        '• Invariant constraint bounds validation'
      ]).map(b => `<div>${escapeXml(b)}</div>`).join('')}
    </div>
  </div>`;
  cell('step1_content', s1Html, 36, 554, 340, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  edge('edge_s1_s2', 'step1_box', 'step2_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#3B82F6;strokeWidth=2.5;dashed=1;dashPattern=6 4;flowAnimation=1;endArrow=classic;endSize=6;');

  // Step 2: Algorithm Execution
  const s2 = wf?.step2Execution;
  cell('step2_box', '', 420, 554, 340, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const s2Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11.5px;font-weight:900;color:#047857;text-transform:uppercase;margin-bottom:4px;">${escapeXml(s2?.title || 'STEP 2: Algorithm Execution')}</div>
    <div style="font-size:10px;color:#64748B;font-weight:600;margin-bottom:8px;">Input: ${escapeXml(s2?.input || 'State Vector X')}</div>
    ${(s2?.phases || [
      { name: '1. Initialization', desc: 'Set initial distance & state parameters' },
      { name: '2. Priority Extraction', desc: 'Select optimal candidate from frontier' },
      { name: '3. Iterative Relaxation Loop', desc: 'Update adjacent candidate metrics' }
    ]).map(p => `
      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:6px 10px;margin-bottom:6px;text-align:center;">
        <div style="font-size:10.5px;font-weight:800;color:#065F46;">${escapeXml(p.name)}</div>
        <div style="font-size:8.5px;color:#047857;">${escapeXml(p.desc)}</div>
      </div>
    `).join('')}
  </div>`;
  cell('step2_content', s2Html, 420, 554, 340, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  edge('edge_s2_s3', 'step2_box', 'step3_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#10B981;strokeWidth=2.5;dashed=1;dashPattern=6 4;flowAnimation=1;endArrow=classic;endSize=6;');

  // Step 3: Engine Mechanics
  const s3 = wf?.step3Engine;
  cell('step3_box', '', 804, 554, 350, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const s3Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11.5px;font-weight:900;color:#7C2D12;text-transform:uppercase;margin-bottom:4px;">${escapeXml(s3?.title || 'STEP 3: Engine Optimization')}</div>
    <div style="font-size:10px;color:#64748B;font-weight:600;margin-bottom:8px;">${escapeXml(s3?.subtitle || 'Algorithmic Engines & Complexity')}</div>
    ${(s3?.engines || [
      { name: 'GREEDY / HEURISTIC ENGINE', complexity: 'O(N log N)', items: ['Priority Queue Min-Heap', 'Local greedy optimality'] },
      { name: 'DYNAMIC RELAXATION ENGINE', complexity: 'O(N · M)', items: ['Global state matrix update', 'Cycle detection & convergence'] }
    ]).map(e => `
      <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:6px 10px;margin-bottom:6px;">
        <div style="font-size:10px;font-weight:800;color:#9A3412;">${escapeXml(e.name)} (${escapeXml(e.complexity)})</div>
        <div style="font-size:8.5px;color:#7C2D12;">${e.items.map(it => `• ${escapeXml(it)}`).join('<br/>')}</div>
      </div>
    `).join('')}
    <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:6px 10px;text-align:center;font-size:9.5px;font-weight:800;color:#92400E;">
      ${escapeXml(s3?.callout || '⚡ High-Throughput Convergence Certified')}
    </div>
  </div>`;
  cell('step3_content', s3Html, 804, 554, 350, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');
  edge('edge_s3_s4', 'step3_box', 'step4_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=2.5;dashed=1;dashPattern=6 4;flowAnimation=1;endArrow=classic;endSize=6;');

  // Step 4: Real-World Applications
  const s4Apps = wf?.step4Applications || [
    { title: 'Navigation & Routing', subtitle: 'Shortest Path Execution', icon: '🚗', detail: 'Real-time telemetry' },
    { title: 'Infrastructure (MST)', subtitle: 'Kruskal / Prim Min-Cost', icon: '⚡', detail: 'Grid optimization' },
    { title: 'Bioinformatics', subtitle: 'Sequence Alignment', icon: '🧬', detail: 'Eulerian graphs' },
    { title: 'Network Throughput', subtitle: 'Max Flow Allocation', icon: '🌊', detail: 'Ford-Fulkerson cut' }
  ];
  cell('step4_box', '', 1200, 554, 360, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const s4Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11.5px;font-weight:900;color:#1E3A8A;text-transform:uppercase;margin-bottom:4px;">STEP 4: Solutions &amp; Applications</div>
    <div style="font-size:10px;color:#64748B;font-weight:600;margin-bottom:8px;">Enterprise Scale Real-World Deployment</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      ${s4Apps.slice(0, 4).map(app => `
        <div style="background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;text-align:center;">
          <div style="font-size:18px;">${app.icon || '🚀'}</div>
          <div style="font-size:9px;font-weight:800;color:#1E293B;">${escapeXml(app.title)}</div>
          <div style="font-size:7.5px;color:#64748B;">${escapeXml(app.subtitle)}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
  cell('step4_content', s4Html, 1200, 554, 360, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 8. FOOTER BANNER
  const tenets = roadmap.footerTenets && roadmap.footerTenets.length > 0 ? roadmap.footerTenets.join('  |  ') : 'PRODUCER INDEPENDENCE  |  CONSUMER INDEPENDENCE  |  FORMAT, NOT PLATFORM';
  const ftrHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:800;color:#334155;letter-spacing:0.06em;">
    <div>${escapeXml(tenets)}</div>
    <div style="color:#2563EB;display:flex;align-items:center;gap:6px;">
      <span style="font-size:14px;">☁️</span>
      <span>Google Cloud Architecture Engine</span>
    </div>
  </div>`;
  cell('ftr_main', ftrHtml, 20, 904, 1560, 44, 'text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;');

  return `<mxfile host="embed.diagrams.net">
  <diagram id="conceptual_roadmap" name="${escapeXml(roadmap.title || 'Conceptual Roadmap')}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="${isDark ? '#0B111E' : '#FFFFFF'}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

/**
 * 2D Non-Colliding Geometric Layout Solver for Freeform Elements
 * Prevents overlapping nodes, auto-spaces concept tiers, and organizes full-width comparative diagrams
 */
export function autoSolveFreeformElements(
  elements: Studio3FreeformElement[],
  canvasWidth = 1600,
  canvasHeight = 1000
): Studio3FreeformElement[] {
  if (!elements || elements.length === 0) return [];
  const clones = elements.map(e => ({ ...e }));

  // Check for 2-column comparative / dichotomy structure (e.g. Centripetal vs Centrifugal)
  const leftGroup: Studio3FreeformElement[] = [];
  const rightGroup: Studio3FreeformElement[] = [];
  let topCoordinator: Studio3FreeformElement | null = null;
  let bottomDistinction: Studio3FreeformElement | null = null;

  const promptOrNames = clones.map(e => e.name.toLowerCase()).join(' ');
  const isComparative = (
    promptOrNames.includes('centripetal') && promptOrNames.includes('centrifugal')
  ) || (
    clones.filter(e => e.name.toLowerCase().includes(' vs ') || e.name.toLowerCase().includes('comparison')).length > 0
  );

  if (isComparative) {
    clones.forEach(e => {
      const name = e.name.toLowerCase();
      if (name.includes('object') || name.includes('circular motion') || name.includes('context') || name.includes('system') || e.id === 'top_context') {
        topCoordinator = e;
      } else if (name.includes('distinction') || name.includes('key distinction') || name.includes('summary') || name.includes('conclusion')) {
        bottomDistinction = e;
      } else if (name.includes('centripetal') || name.includes('inertial') || name.includes('left') || e.color === 'blue') {
        leftGroup.push(e);
      } else {
        rightGroup.push(e);
      }
    });

    if (leftGroup.length > 0 && rightGroup.length > 0) {
      // 1. Position Top Coordinator Card
      const startY = topCoordinator ? 220 : 120;
      if (topCoordinator) {
        (topCoordinator as Studio3FreeformElement).w = 640;
        (topCoordinator as Studio3FreeformElement).h = 90;
        (topCoordinator as Studio3FreeformElement).x = Math.floor((canvasWidth - 640) / 2);
        (topCoordinator as Studio3FreeformElement).y = 110;
      }

      // 2. Position Left Column Elements
      const leftColW = 680;
      const leftColX = 80;
      let leftY = startY;
      leftGroup.forEach(elem => {
        if (elem.shape === 'circle') {
          elem.w = 180;
          elem.h = 70;
          elem.x = leftColX + Math.floor((leftColW - 180) / 2);
          elem.y = leftY;
          leftY += 85;
        } else {
          elem.w = leftColW;
          elem.h = elem.details && elem.details.length > 3 ? 280 : 200;
          elem.x = leftColX;
          elem.y = leftY;
          leftY += elem.h + 20;
        }
      });

      // 3. Position Right Column Elements
      const rightColW = 680;
      const rightColX = 840;
      let rightY = startY;
      rightGroup.forEach(elem => {
        if (elem.shape === 'circle') {
          elem.w = 180;
          elem.h = 70;
          elem.x = rightColX + Math.floor((rightColW - 180) / 2);
          elem.y = rightY;
          rightY += 85;
        } else {
          elem.w = rightColW;
          elem.h = elem.details && elem.details.length > 3 ? 280 : 200;
          elem.x = rightColX;
          elem.y = rightY;
          rightY += elem.h + 20;
        }
      });

      // 4. Position Bottom Key Distinction Card
      if (bottomDistinction) {
        const maxY = Math.max(leftY, rightY);
        (bottomDistinction as Studio3FreeformElement).w = 840;
        (bottomDistinction as Studio3FreeformElement).h = 95;
        (bottomDistinction as Studio3FreeformElement).x = Math.floor((canvasWidth - 840) / 2);
        (bottomDistinction as Studio3FreeformElement).y = Math.min(880, Math.max(760, maxY + 15));
      }

      return clones;
    }
  }

  // Standard Multi-Tier Layout (When not comparative)
  const bottomCards = clones.filter(e => (e.shape === 'rectangle' && (e.details && e.details.length > 0)) || e.y >= 480);
  const otherElems = clones.filter(e => !bottomCards.includes(e));

  const topEntities = otherElems.filter(e => (e.y < 340 && e.id !== 'focus' && !e.name.toLowerCase().includes('object in circular')) || otherElems.length <= 3);
  const middleFocus = otherElems.filter(e => !topEntities.includes(e));

  // 1. Arrange Top Tier Elements (Non-overlapping, evenly spaced horizontally)
  if (topEntities.length > 0) {
    const K = topEntities.length;
    const gap = 30;
    const maxW = Math.min(280, Math.floor((canvasWidth - 120 - (K - 1) * gap) / K));
    const totalW = K * maxW + (K - 1) * gap;
    const startX = Math.floor((canvasWidth - totalW) / 2);

    topEntities.forEach((elem, idx) => {
      elem.w = elem.shape === 'circle' ? Math.min(140, maxW) : maxW;
      elem.h = elem.shape === 'circle' ? elem.w : Math.min(220, elem.h || 180);
      elem.x = startX + idx * (maxW + gap) + (maxW - elem.w) / 2;
      elem.y = 130 + (elem.shape === 'circle' ? 20 : 0);
    });
  }

  // 2. Arrange Middle Focus Elements (Centered, ample vertical clearance)
  if (middleFocus.length > 0) {
    const M = middleFocus.length;
    const gap = 40;
    const totalW = middleFocus.reduce((acc, e) => acc + (e.w || 150), 0) + (M - 1) * gap;
    let curX = Math.floor((canvasWidth - totalW) / 2);

    middleFocus.forEach((elem) => {
      elem.w = elem.w || (elem.shape === 'circle' ? 150 : 260);
      elem.h = elem.h || (elem.shape === 'circle' ? 150 : 160);
      elem.x = curX;
      elem.y = 355;
      curX += elem.w + gap;
    });
  }

  // 3. Arrange Bottom Application Cards (Equal columns, beautiful symmetry)
  if (bottomCards.length > 0) {
    const N = bottomCards.length;
    const gap = 20;
    const paddingX = 60;
    const availableW = canvasWidth - paddingX * 2;
    const colW = Math.min(360, Math.floor((availableW - (N - 1) * gap) / N));
    const totalRowW = N * colW + (N - 1) * gap;
    const startX = Math.floor((canvasWidth - totalRowW) / 2);

    bottomCards.forEach((elem, idx) => {
      elem.w = colW;
      elem.h = 320;
      elem.x = startX + idx * (colW + gap);
      elem.y = 540;
    });
  }

  // 4. Final 2D AABB Collision Check & Box Pushing (Zero Tolerance for Overlaps)
  for (let iter = 0; iter < 15; iter++) {
    let hadCollision = false;
    for (let i = 0; i < clones.length; i++) {
      for (let j = i + 1; j < clones.length; j++) {
        const a = clones[i];
        const b = clones[j];
        const pad = 24;
        if (
          a.x < b.x + b.w + pad &&
          a.x + a.w + pad > b.x &&
          a.y < b.y + b.h + pad &&
          a.y + a.h + pad > b.y
        ) {
          hadCollision = true;
          // Separate on shortest axis
          const overlapX = Math.min(a.x + a.w + pad - b.x, b.x + b.w + pad - a.x);
          const overlapY = Math.min(a.y + a.h + pad - b.y, b.y + b.h + pad - a.y);
          if (overlapX < overlapY) {
            if (a.x < b.x) {
              b.x = a.x + a.w + pad;
            } else {
              a.x = b.x + b.w + pad;
            }
          } else {
            if (a.y < b.y) {
              b.y = a.y + a.h + pad;
            } else {
              a.y = b.y + b.h + pad;
            }
          }
        }
      }
    }
    if (!hadCollision) break;
  }

  // Clamp within canvas boundaries
  clones.forEach(elem => {
    elem.x = Math.max(40, Math.min(canvasWidth - elem.w - 40, elem.x));
    elem.y = Math.max(115, Math.min(canvasHeight - elem.h - 60, elem.y));
  });

  return clones;
}

export function solveAndRenderStudio3Xml(
  graph: Studio3SemanticGraph,
  options: LayoutOptions = {}
): string {
  const { theme = 'dark', canvasWidth = 1600, canvasHeight = 1000 } = options;

  // 0. Universal Conceptual Roadmap Passthrough (Applied for any topic!)
  if (graph?.conceptualRoadmap) {
    return renderUniversalConceptualRoadmapXml(graph.conceptualRoadmap, theme);
  }

  // Master Canonical Passthrough for Template 51 (Graph Theory)
  if (
    graph?.templateId === '51' ||
    (graph?.title || '').toLowerCase().includes('graph theory') ||
    (graph?.title || '').toLowerCase().includes('learning roadmap')
  ) {
    return generateTemplate51GraphTheoryLearningRoadmapXml('graph_theory', theme);
  }
  const isDark = theme === 'dark';

  const bgCanvas = isDark ? '#0B111E' : '#FFFFFF';
  const containerBg = isDark ? '#0F172A' : '#F8FAFC';
  const containerBorder = isDark ? '#1E293B' : '#E2E8F0';
  const cardBg = isDark ? '#131D31' : '#FFFFFF';
  const cardBorder = isDark ? '#1E2F4D' : '#CBD5E1';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#475569';

  let cellId = 2;
  const cells: string[] = [];
  const cardCoordinates: Record<string, { x: number; y: number; w: number; h: number }> = {};

  const addCell = (cellXml: string): string => {
    cells.push(cellXml);
    return cellXml;
  };

  // Safe strings
  const graphTitle = graph?.title || 'System Architecture';
  const graphSubtitle = graph?.subtitle || 'Synthesized First-Principles Architecture';
  const abstractionLabel = (graph?.abstractionLevel || 'logical').toUpperCase();

  // 1. Header Banner
  const headerX = 40;
  const headerY = 30;
  const headerW = 1520;
  const headerH = 65;

  const headerHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;border-radius:12px;background:${isDark ? 'linear-gradient(90deg, #1E3A8A 0%, #0F172A 100%)' : 'linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)'};color:#FFFFFF;font-family:system-ui,-apple-system,sans-serif;border:1px solid ${isDark ? '#1E3A8A' : '#93C5FD'};">
    <div style="display:flex;align-items:center;gap:16px;">
      <div style="width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:24px;">🏛️</div>
      <div>
        <div style="font-size:19px;font-weight:800;letter-spacing:-0.02em;text-transform:uppercase;">${escapeXml(graphTitle)}</div>
        <div style="font-size:11.5px;opacity:0.88;font-weight:400;margin-top:2px;">${escapeXml(graphSubtitle)}</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="background:rgba(255,255,255,0.18);padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.25);">
        ${abstractionLabel} VIEW
      </div>
      <div style="background:#FFFFFF;color:#1E40AF;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:0.03em;">
        STUDIO 3 GENERATIVE
      </div>
    </div>
  </div>`;

  addCell(`
    <mxCell id="${cellId++}" value="${escapeXml(headerHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;shadow=0;" vertex="1" parent="1">
      <mxGeometry x="${headerX}" y="${headerY}" width="${headerW}" height="${headerH}" as="geometry"/>
    </mxCell>
  `);

  // 2. Freeform Layout Engine (Direct Visual Graph Drawing without boxed columns)
  if (graph?.freeformElements && graph.freeformElements.length > 0) {
    const solvedElements = autoSolveFreeformElements(graph.freeformElements, canvasWidth, canvasHeight);
    solvedElements.forEach(elem => {
      const colorKey = String(elem.color || 'blue').trim().toLowerCase();
      const elemColor = COLOR_MAP[colorKey] || COLOR_MAP.blue;
      cardCoordinates[elem.id] = { x: elem.x, y: elem.y, w: elem.w, h: elem.h };

      // Shape A: Circular Vertex / Node
      if (elem.shape === 'circle') {
        const circleHtml = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;color:#FFFFFF;text-align:center;font-family:system-ui,-apple-system,sans-serif;box-sizing:border-box;padding:6px;">
          <div style="font-weight:900;font-size:14px;letter-spacing:0.02em;">${escapeXml(elem.name)}</div>
          ${elem.subLabel ? `<div style="font-size:9px;opacity:0.92;margin-top:2px;font-weight:600;line-height:1.2;">${escapeXml(elem.subLabel)}</div>` : ''}
        </div>`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(circleHtml)}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=${elemColor.bg};strokeColor=${elemColor.border};strokeWidth=2.5;shadow=1;" vertex="1" parent="1">
            <mxGeometry x="${elem.x}" y="${elem.y}" width="${elem.w}" height="${elem.h}" as="geometry"/>
          </mxCell>
        `);
      }
      // Shape B: 2D Matrix Grid
      else if (elem.shape === 'matrix') {
        const matrixHeaders = elem.matrixHeaders || [];
        const matrixData = elem.matrixData || [];

        let matrixHtml = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-start;background:${cardBg};border-radius:10px;border:1px solid ${cardBorder};">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="font-size:11.5px;font-weight:900;color:${isDark ? '#38BDF8' : '#1D4ED8'};text-transform:uppercase;letter-spacing:0.04em;">🔢 ${escapeXml(elem.name)}</div>
            ${elem.badge ? `<span style="background:#2563EB;color:#FFF;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:800;">${escapeXml(elem.badge)}</span>` : ''}
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:8px;text-align:center;font-family:monospace;font-size:11px;background:${isDark ? '#050914' : '#F8FAFC'};border:1px solid ${isDark ? '#1E293B' : '#CBD5E1'};border-radius:6px;overflow:hidden;">
            ${matrixHeaders.length > 0 ? `<tr style="background:${isDark ? '#1E293B' : '#E2E8F0'};color:${textPrimary};font-weight:bold;">
              <th style="padding:4px;border:1px solid ${isDark ? '#334155' : '#CBD5E1'};"></th>
              ${matrixHeaders.map((h: string) => `<th style="padding:4px;border:1px solid ${isDark ? '#334155' : '#CBD5E1'};">${escapeXml(h)}</th>`).join('')}
            </tr>` : ''}
            ${matrixData.map((row: string[], rIdx: number) => `<tr style="color:${textPrimary};">
              ${matrixHeaders.length > 0 ? `<td style="padding:4px;font-weight:bold;background:${isDark ? '#1E293B' : '#E2E8F0'};border:1px solid ${isDark ? '#334155' : '#CBD5E1'};">${escapeXml(matrixHeaders[rIdx] || `R${rIdx}`)}</td>` : ''}
              ${row.map((cell: string) => `<td style="padding:4px;border:1px solid ${isDark ? '#334155' : '#CBD5E1'};font-weight:${cell !== '0' ? '800' : 'normal'};color:${cell !== '0' ? (isDark ? '#38BDF8' : '#2563EB') : (isDark ? '#64748B' : '#94A3B8')};">${escapeXml(cell)}</td>`).join('')}
            </tr>`).join('')}
          </table>`;

        if (elem.details && elem.details.length > 0) {
          matrixHtml += `<ul style="margin:0;padding-left:14px;color:${textSecondary};font-size:10px;line-height:1.35;flex-grow:1;">
            ${elem.details.map((d: string) => `<li style="margin-bottom:2px;">${escapeXml(d)}</li>`).join('')}
          </ul>`;
        }
        matrixHtml += `</div>`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(matrixHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};shadow=0;" vertex="1" parent="1">
            <mxGeometry x="${elem.x}" y="${elem.y}" width="${elem.w}" height="${elem.h}" as="geometry"/>
          </mxCell>
        `);
      }
      // Shape C: Formula & Theorem Block
      else if (elem.shape === 'formula') {
        let formulaHtml = `<div style="padding:12px 14px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-start;background:${cardBg};border-radius:10px;border:1px solid ${cardBorder};">
          <div style="font-size:11.5px;font-weight:900;color:${isDark ? '#F59E0B' : '#D97706'};margin-bottom:8px;text-transform:uppercase;letter-spacing:0.04em;">📐 ${escapeXml(elem.name)}</div>
          ${elem.formula ? `<pre style="margin:0 0 8px 0;background:${isDark ? '#050914' : '#FFFBEB'};color:${isDark ? '#FCD34D' : '#92400E'};padding:8px 10px;border-radius:6px;font-size:10.5px;font-family:monospace;font-weight:bold;line-height:1.45;border:1px solid ${isDark ? '#1E293B' : '#FCD34D'};white-space:pre-wrap;">${escapeXml(elem.formula)}</pre>` : ''}`;

        if (elem.details && elem.details.length > 0) {
          formulaHtml += `<ul style="margin:0;padding-left:14px;color:${textSecondary};font-size:10px;line-height:1.35;flex-grow:1;">
            ${elem.details.map((d: string) => `<li style="margin-bottom:2px;">${escapeXml(d)}</li>`).join('')}
          </ul>`;
        }
        formulaHtml += `</div>`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(formulaHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};shadow=0;" vertex="1" parent="1">
            <mxGeometry x="${elem.x}" y="${elem.y}" width="${elem.w}" height="${elem.h}" as="geometry"/>
          </mxCell>
        `);
      }
      // Shape D: Rectangular Process / Engine Card
      else {
        let rectHtml = `<div style="display:flex;flex-direction:column;height:100%;box-sizing:border-box;background:${cardBg};border-radius:10px;border:1px solid ${elemColor.border};overflow:hidden;">
          <div style="background:${elemColor.bg};color:#FFFFFF;padding:7px 12px;font-weight:800;font-size:11.5px;text-transform:uppercase;display:flex;align-items:center;justify-content:space-between;letter-spacing:0.03em;">
            <span>${escapeXml(elem.name)}</span>
            ${elem.badge ? `<span style="background:rgba(255,255,255,0.22);padding:1.5px 7px;border-radius:10px;font-size:9.5px;font-weight:700;">${escapeXml(elem.badge)}</span>` : ''}
          </div>
          <div style="padding:10px 12px;display:flex;flex-direction:column;flex-grow:1;justify-content:flex-start;">`;

        if (elem.codeSnippet) {
          rectHtml += `<pre style="margin:0 0 6px 0;background:#050914;color:#38BDF8;padding:6px 8px;border-radius:5px;font-size:9.5px;font-family:monospace;line-height:1.35;white-space:pre-wrap;border:1px solid #1E293B;">${escapeXml(elem.codeSnippet)}</pre>`;
        }
        if (elem.details && elem.details.length > 0) {
          rectHtml += `<ul style="margin:0;padding-left:16px;color:${textSecondary};font-size:10.5px;line-height:1.4;flex-grow:1;">
            ${elem.details.map((d: string) => `<li style="margin-bottom:4px;">${escapeXml(d)}</li>`).join('')}
          </ul>`;
        }
        rectHtml += `</div></div>`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(rectHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${elemColor.border};shadow=0;" vertex="1" parent="1">
            <mxGeometry x="${elem.x}" y="${elem.y}" width="${elem.w}" height="${elem.h}" as="geometry"/>
          </mxCell>
        `);
      }
    });
  }
  // 3. Bands Layout (When standard structured architecture is requested)
  else {
    const bands = graph?.bands || [];
    const numBands = Math.max(1, bands.length);
    let bandY = 110;
    const totalBandsHeight = 780;
    const calculatedBandH = Math.floor((totalBandsHeight - 20 * (numBands - 1)) / numBands);

    bands.forEach((band, bandIndex) => {
      const bandH = calculatedBandH;
      const bandX = 40;
      const bandW = 1520;

      // Band Container Outer Box
      addCell(`
        <mxCell id="${cellId++}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${containerBg};strokeColor=${containerBorder};strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="${bandX}" y="${bandY}" width="${bandW}" height="${bandH}" as="geometry"/>
        </mxCell>
      `);

    // A. Columns Band
    if (band.columns && band.columns.length > 0) {
      const numCols = band.columns.length;
      const innerPadding = 16;
      const colGap = 16;

      // Wrap columns into 2 rows if > 4 columns
      const wrapRows = numCols > 4;
      const colsPerRow = wrapRows ? Math.ceil(numCols / 2) : numCols;
      const rowGap = 14;

      const colW = (bandW - innerPadding * 2 - colGap * (colsPerRow - 1)) / colsPerRow;
      const colH = wrapRows
        ? Math.floor((bandH - innerPadding * 2 - rowGap) / 2)
        : (bandH - innerPadding * 2);

      band.columns.forEach((col, colIndex) => {
        const rowIdx = wrapRows ? Math.floor(colIndex / colsPerRow) : 0;
        const colIdxInRow = wrapRows ? (colIndex % colsPerRow) : colIndex;

        const colX = bandX + innerPadding + colIdxInRow * (colW + colGap);
        const colY = bandY + innerPadding + rowIdx * (colH + rowGap);
        const colorKey = String(col.headerColor || 'blue').trim().toLowerCase();
        const colColor = COLOR_MAP[colorKey] || COLOR_MAP.blue;

        // Column Box
        addCell(`
          <mxCell id="${cellId++}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0C1322' : '#FFFFFF'};strokeColor=${colColor.border};strokeWidth=1.2;" vertex="1" parent="1">
            <mxGeometry x="${colX}" y="${colY}" width="${colW}" height="${colH}" as="geometry"/>
          </mxCell>
        `);

        // Column Header Banner
        const colHeaderHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:${colColor.bg};color:${colColor.text};font-weight:800;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;border-top-left-radius:6px;border-top-right-radius:6px;box-sizing:border-box;padding:0 12px;text-align:center;word-break:break-word;">
          ${escapeXml(col.header || 'TIER')}
        </div>`;

        const headerH = colH < 220 ? 30 : 38;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(colHeaderHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=0;" vertex="1" parent="1">
            <mxGeometry x="${colX}" y="${colY}" width="${colW}" height="${headerH}" as="geometry"/>
          </mxCell>
        `);

        // Column Cards
        const cards = col.cards || [];
        const availableCardSpace = colH - headerH - 16 - (col.footerNote ? 24 : 0);
        const numCards = Math.max(1, cards.length);
        const cardGap = 12;

        // Proportional card height (fill column evenly without awkward voids)
        const computedH = (availableCardSpace - cardGap * (numCards - 1)) / numCards;
        const maxCardH = numCards === 1 ? Math.min(220, availableCardSpace) : (colH < 220 ? 95 : 280);
        const cardH = Math.min(maxCardH, Math.max(90, computedH));

        // Center card vertically if space is available
        const totalCardsH = numCards * cardH + (numCards - 1) * cardGap;
        let cardY = colY + headerH + 8 + Math.max(0, Math.floor((availableCardSpace - totalCardsH) / 2));

        cards.forEach(card => {
          const cardX = colX + 10;
          const currentCardW = colW - 20;

          cardCoordinates[card.id] = { x: cardX, y: cardY, w: currentCardW, h: cardH };

          let cardContentHtml = `<div style="padding:12px 14px;font-family:system-ui,-apple-system,sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-start;word-break:break-word;overflow-wrap:break-word;overflow:hidden;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-shrink:0;">
              <div style="width:28px;height:28px;border-radius:7px;background:${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${card.iconKey ? renderGcpIconHtml(card.iconKey, 20) : '<div>📦</div>'}
              </div>
              <div style="font-size:12.5px;font-weight:800;color:${textPrimary};line-height:1.2;flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeXml(card.title || 'Component')}</div>
              ${card.badge ? `<span style="margin-left:auto;background:#2563EB;color:#FFF;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:800;letter-spacing:0.02em;flex-shrink:0;">${escapeXml(card.badge)}</span>` : ''}
            </div>`;

          if (card.codeSnippet) {
            cardContentHtml += `<pre style="margin:4px 0 0 0;background:#050914;color:#38BDF8;padding:6px 8px;border-radius:5px;font-size:9.5px;font-family:monospace;line-height:1.35;white-space:pre-wrap;word-break:break-all;overflow-wrap:anywhere;max-width:100%;box-sizing:border-box;overflow:hidden;flex-grow:1;border:1px solid #1E293B;">${escapeXml(card.codeSnippet)}</pre>`;
          } else if (card.items && card.items.length > 0) {
            cardContentHtml += `<ul style="margin:4px 0 0 0;padding-left:16px;color:${isDark ? '#CBD5E1' : '#334155'};font-size:11px;line-height:1.45;flex-grow:1;overflow:hidden;">
              ${card.items.slice(0, 4).map(it => `<li style="margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;">${escapeXml(it)}</li>`).join('')}
            </ul>`;
          }

          cardContentHtml += `</div>`;

          const borderStyle = card.highlight ? 'strokeColor=#3B82F6;strokeWidth=1.5;' : `strokeColor=${cardBorder};strokeWidth=1;`;

          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(cardContentHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};${borderStyle}shadow=0;" vertex="1" parent="1">
              <mxGeometry x="${cardX}" y="${cardY}" width="${currentCardW}" height="${cardH}" as="geometry"/>
            </mxCell>
          `);

          cardY += cardH + cardGap;
        });

        // Column Footer Note
        if (col.footerNote) {
          const footerHtml = `<div style="font-size:9px;color:${textSecondary};font-style:italic;text-align:center;padding:0 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${escapeXml(col.footerNote)}
          </div>`;
          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(footerHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
              <mxGeometry x="${colX + 6}" y="${colY + colH - 22}" width="${colW - 12}" height="18" as="geometry"/>
            </mxCell>
          `);
        }
      });
    }
    // B. Horizontal Pipeline Stages Band
    else if (band.pipelineStages && band.pipelineStages.length > 0) {
      const numStages = band.pipelineStages.length;
      const stageGap = 16;
      const innerPadding = 16;
      const stageW = (bandW - innerPadding * 2 - stageGap * (numStages - 1)) / numStages;

      band.pipelineStages.forEach((stage, sIndex) => {
        const stageX = bandX + innerPadding + sIndex * (stageW + stageGap);
        const stageY = bandY + innerPadding;
        const stageH = bandH - innerPadding * 2;
        const colorKey = String(stage.color || 'blue').trim().toLowerCase();
        const stageColor = COLOR_MAP[colorKey] || COLOR_MAP.blue;

        // Stage Box
        addCell(`
          <mxCell id="${cellId++}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0C1322' : '#FFFFFF'};strokeColor=${stageColor.border};strokeWidth=1.2;" vertex="1" parent="1">
            <mxGeometry x="${stageX}" y="${stageY}" width="${stageW}" height="${stageH}" as="geometry"/>
          </mxCell>
        `);

        // Stage Header with 20 Step Badges ❶..⓴
        const stepIcons = ['❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿', '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴'];
        const stepBadge = stepIcons[(stage.stepNumber || 1) - 1] || `${stage.stepNumber || 1}.`;

        const stageHeaderHtml = `<div style="display:flex;align-items:center;gap:6px;padding:0 12px;width:100%;height:100%;background:${stageColor.bg};color:${stageColor.text};font-weight:800;font-size:11.5px;letter-spacing:0.03em;border-top-left-radius:6px;border-top-right-radius:6px;box-sizing:border-box;">
          <span style="font-size:14px;">${stepBadge}</span>
          <div style="line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <div>${escapeXml(stage.title || 'Stage')}</div>
            ${stage.subtitle ? `<div style="font-size:8.5px;font-weight:400;opacity:0.9;">${escapeXml(stage.subtitle)}</div>` : ''}
          </div>
        </div>`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(stageHeaderHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=0;" vertex="1" parent="1">
            <mxGeometry x="${stageX}" y="${stageY}" width="${stageW}" height="${stageH < 180 ? 28 : 34}" as="geometry"/>
          </mxCell>
        `);

        // Stage Nodes
        const nodes = stage.nodes || [];
        const headerOffset = stageH < 180 ? 32 : 42;
        let nodeY = stageY + headerOffset;
        const availableNodeSpace = stageH - headerOffset - 8;
        const numNodes = Math.max(1, nodes.length);
        const nodeGap = 6;
        const nodeH = Math.max(38, (availableNodeSpace - nodeGap * (numNodes - 1)) / numNodes);

        nodes.forEach(node => {
          const nodeX = stageX + 10;
          const currentStageNodeW = stageW - 20;

          cardCoordinates[node.id] = { x: nodeX, y: nodeY, w: currentStageNodeW, h: nodeH };

          const nodeHtml = `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;height:100%;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;">
            ${node.iconKey ? renderGcpIconHtml(node.iconKey, 20) : '<div>⚙️</div>'}
            <div style="line-height:1.2;overflow:hidden;flex-grow:1;">
              <div style="font-size:11px;font-weight:700;color:${textPrimary};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeXml(node.name || 'Service')}</div>
              ${node.role ? `<div style="font-size:9px;color:${textSecondary};margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeXml(node.role)}</div>` : ''}
            </div>
          </div>`;

          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(nodeHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;" vertex="1" parent="1">
              <mxGeometry x="${nodeX}" y="${nodeY}" width="${currentStageNodeW}" height="${nodeH}" as="geometry"/>
            </mxCell>
          `);

          nodeY += nodeH + nodeGap;
        });
      });
    }
    // C. Matrix Evaluation Band
    else if (band.matrixRows && band.matrixRows.length > 0) {
      const headers = band.matrixHeaders || ['DIMENSION / TOOL', 'CAPABILITY', 'INTEGRATION', 'STANDARD'];
      const numCols = Math.max(1, headers.length);
      const innerPadding = 16;
      const tableW = bandW - innerPadding * 2;
      const colW = tableW / numCols;
      const headerRowH = 32;
      const rows = band.matrixRows;
      const rowH = Math.max(40, (bandH - innerPadding * 2 - headerRowH) / Math.max(1, rows.length));

      // Table Header Row
      headers.forEach((h, hIdx) => {
        const cellX = bandX + innerPadding + hIdx * colW;
        const cellY = bandY + innerPadding;
        const cellHtml = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#1E3A8A;color:#FFFFFF;font-weight:800;font-size:10.5px;letter-spacing:0.04em;text-transform:uppercase;border:1px solid #2563EB;box-sizing:border-box;">
          ${escapeXml(h)}
        </div>`;
        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(cellHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
            <mxGeometry x="${cellX}" y="${cellY}" width="${colW}" height="${headerRowH}" as="geometry"/>
          </mxCell>
        `);
      });

      // Table Data Rows
      rows.forEach((row, rIdx) => {
        const rowY = bandY + innerPadding + headerRowH + rIdx * rowH;
        cardCoordinates[`matrix_row_${bandIndex}_${rIdx}`] = { x: bandX + innerPadding, y: rowY, w: tableW, h: rowH };

        // Col 0: Dimension Name
        const dimCellHtml = `<div style="display:flex;align-items:center;padding:0 10px;width:100%;height:100%;background:${isDark ? '#0C1322' : '#F8FAFC'};color:${textPrimary};font-weight:700;font-size:10.5px;border:1px solid ${cardBorder};box-sizing:border-box;">
          ${escapeXml(row.dimension || 'Dimension')}
        </div>`;
        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(dimCellHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
            <mxGeometry x="${bandX + innerPadding}" y="${rowY}" width="${colW}" height="${rowH}" as="geometry"/>
          </mxCell>
        `);

        // Other Cols
        (row.cols || []).forEach((c, cIdx) => {
          const colX = bandX + innerPadding + (cIdx + 1) * colW;
          const colCellHtml = `<div style="display:flex;flex-direction:column;justify-content:center;padding:0 10px;width:100%;height:100%;background:${isDark ? '#131D31' : '#FFFFFF'};color:${textSecondary};font-size:10px;border:1px solid ${cardBorder};box-sizing:border-box;">
            <div style="font-weight:700;color:${textPrimary};">${escapeXml(c?.toolName || '')}</div>
            <div style="margin-top:1px;">${escapeXml(c?.value || '')}</div>
          </div>`;
          addCell(`
            <mxCell id="${cellId++}" value="${escapeXml(colCellHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;" vertex="1" parent="1">
              <mxGeometry x="${colX}" y="${rowY}" width="${colW}" height="${rowH}" as="geometry"/>
            </mxCell>
          `);
        });
      });
    }

    bandY += bandH + 20;
  });
}

  // 3. Connectors & Edges (With High-Contrast Labeled Pill Badges)
  if (Array.isArray(graph?.connections)) {
    graph.connections.forEach(conn => {
      const fromGeom = cardCoordinates[conn.fromId];
      const toGeom = cardCoordinates[conn.toId];
      if (fromGeom && toGeom) {
        let strokeColor = '#3B82F6';
        let strokeWidth = '1.8';
        let dashed = '0';
        let dashPattern = '';

        if (conn.style === 'dashed_orange') {
          strokeColor = '#F97316';
          strokeWidth = '1.8';
          dashed = '1';
          dashPattern = 'dashPattern=6 4;';
        } else if (conn.style === 'dashed_purple') {
          strokeColor = '#8B5CF6';
          strokeWidth = '1.8';
          dashed = '1';
          dashPattern = 'dashPattern=4 4;';
        } else if (conn.style === 'green_protocol') {
          strokeColor = '#10B981';
          strokeWidth = '2';
          dashed = '0';
        } else if (conn.style === 'feedback_teal') {
          strokeColor = '#14B8A6';
          strokeWidth = '1.8';
          dashed = '1';
          dashPattern = 'dashPattern=5 5;';
        }

        const labelPillStyle = 'labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontSize=9.5;fontStyle=1;fontColor=#0F172A;padding=3.5;';
        const edgeStyle = `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${strokeColor};strokeWidth=${strokeWidth};dashed=${dashed};flowAnimation=1;${dashPattern}${labelPillStyle}`;

        addCell(`
          <mxCell id="${cellId++}" value="${escapeXml(conn.label || '')}" style="${edgeStyle}" edge="1" parent="1" source="${conn.fromId}" target="${conn.toId}">
            <mxGeometry relative="1" as="geometry">
              <mxPoint x="${fromGeom.x + fromGeom.w / 2}" y="${fromGeom.y + fromGeom.h / 2}" as="sourcePoint"/>
              <mxPoint x="${toGeom.x + toGeom.w / 2}" y="${toGeom.y + toGeom.h / 2}" as="targetPoint"/>
            </mxGeometry>
          </mxCell>
        `);
      }
    });
  }

  // 4. Footer Bar
  const footerX = 40;
  const footerY = 910;
  const footerW = 1520;
  const footerH = 45;

  const rawTenets = Array.isArray(graph?.tenets)
    ? graph.tenets.filter(t => typeof t === 'string' && t.trim().length > 0)
    : [];

  const defaultTenets = [
    'MATHEMATICAL FORMULATION',
    graph?.abstractionLevel === 'technical' ? 'ZERO TRUST & RESILIENCE' : 'HIGH AVAILABILITY & ISOLATION',
    'CONTINUOUS OBSERVABILITY'
  ];

  const tenetsString = rawTenets.length > 0
    ? rawTenets.join('  |  ')
    : defaultTenets.join('  |  ');

  const footerHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;border-radius:8px;background:${isDark ? '#0F172A' : '#F1F5F9'};border:1px solid ${containerBorder};color:${textSecondary};font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span>🧬</span>
      <span>${escapeXml(tenetsString)}</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;color:#3B82F6;font-weight:800;">
      <span>Google Cloud Architecture Engine</span>
    </div>
  </div>`;

  addCell(`
    <mxCell id="${cellId++}" value="${escapeXml(footerHtml)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;" vertex="1" parent="1">
      <mxGeometry x="${footerX}" y="${footerY}" width="${footerW}" height="${footerH}" as="geometry"/>
    </mxCell>
  `);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="studio3_diagram" name="${escapeXml(graphTitle)}">
    <mxGraphModel dx="${canvasWidth}" dy="${canvasHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${canvasWidth}" pageHeight="${canvasHeight}" background="${bgCanvas}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
