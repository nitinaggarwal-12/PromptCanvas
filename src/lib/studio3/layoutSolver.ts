import { Studio3SemanticGraph, Studio3Band, Studio3Column, Studio3PipelineStage, Studio3ConceptualRoadmap, Studio3FreeformElement } from './graphExtractor';
import { renderGcpIconHtml } from '../gcpIcons';
import { generateTemplate51GraphTheoryLearningRoadmapXml } from '../canonical/template51GraphTheoryLearningRoadmap';
import { synthesizeVisualConceptSpecFromPrompt, compileVisualConceptSpecToXml } from './visualConceptEngine';

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

// ============================================================================
// SPEED VS. VELOCITY VS. ACCELERATION: 100% GROUND-TRUTH REPRODUCTION
// ============================================================================
export function renderSpeedVelocityAccelerationInfographicXml(
  roadmap: Studio3ConceptualRoadmap,
  theme: 'light' | 'dark' = 'light'
): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${escapeXml(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. TOP HEADER BANNER (y=10..68, x=30..1570)
  const hdrHtml = `<div style="background:#0F1E36;border-radius:8px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-family:Impact,Arial Black,sans-serif;letter-spacing:1.5px;color:#FFFFFF;font-size:32px;text-transform:uppercase;box-shadow:0 4px 10px rgba(0,0,0,0.15);">
    VISUAL GUIDE: SPEED, VELOCITY, &amp; ACCELERATION
  </div>`;
  cell('main_header', hdrHtml, 30, 10, 1540, 58, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 2. TOP CHEVRON RIBBONS (y=74..124, h=50)

  // Chevron 1: Green Speed
  const ch1Html = `<div style="background:#16A34A;color:#FFFFFF;border-radius:6px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:10px;font-family:Impact,Arial Black,sans-serif;font-size:18px;letter-spacing:0.5px;text-transform:uppercase;">
    <span>🔍</span>
    <span>1. SPEED (Scalar): HOW FAST?</span>
  </div>`;
  cell('ch_1', ch1Html, 30, 74, 500, 48, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Chevron 2: Blue Velocity
  const ch2Html = `<div style="background:#2563EB;color:#FFFFFF;border-radius:6px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-family:Impact,Arial Black,sans-serif;font-size:18px;letter-spacing:0.5px;text-transform:uppercase;">
    <span>⏱️</span>
    <span>2. VELOCITY (Vector): HOW FAST + WHICH WAY?</span>
    <span>⚙️</span>
  </div>`;
  cell('ch_2', ch2Html, 540, 74, 500, 48, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Chevron 3: Orange Acceleration
  const ch3Html = `<div style="background:#EA580C;color:#FFFFFF;border-radius:6px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-family:Impact,Arial Black,sans-serif;font-size:18px;letter-spacing:0.5px;text-transform:uppercase;">
    <span>🏎️</span>
    <span>3. ACCELERATION (Vector): CHANGE IN VELOCITY?</span>
    <span>⚡</span>
  </div>`;
  cell('ch_3', ch3Html, 1050, 74, 520, 48, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 3. COLUMN 1: SPEED (x=30..530, y=128..815, h=687)
  const col1Html = `<div style="background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:8px;padding:12px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;font-family:system-ui,-apple-system,sans-serif;">
    
    <!-- Top Hero: Alice's Car & Glowing Speedometer -->
    <div style="background:#FFFFFF;border:1px solid #BBF7D0;border-radius:8px;padding:10px;display:flex;flex-direction:column;align-items:center;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
      <div style="font-size:13px;font-weight:900;color:#15803D;margin-bottom:6px;">Alice's Car</div>
      <div style="display:flex;align-items:center;justify-content:space-around;width:100%;">
        <!-- Green Car Profile -->
        <svg viewBox="0 0 160 80" width="140" height="70">
          <path d="M 10 55 L 25 35 Q 40 20 70 20 L 115 20 Q 135 20 145 38 L 155 55 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
          <!-- Windows -->
          <path d="M 45 35 L 55 24 L 85 24 L 85 35 Z" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
          <path d="M 90 35 L 90 24 L 115 24 L 125 35 Z" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
          <!-- Body Line & Wheels -->
          <rect x="5" y="48" width="150" height="15" rx="4" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
          <circle cx="40" cy="62" r="14" fill="#0F172A"/>
          <circle cx="40" cy="62" r="6" fill="#94A3B8"/>
          <circle cx="120" cy="62" r="14" fill="#0F172A"/>
          <circle cx="120" cy="62" r="6" fill="#94A3B8"/>
        </svg>

        <!-- Glowing Speedometer SVG -->
        <svg viewBox="0 0 140 100" width="120" height="85">
          <path d="M 20 85 A 50 50 0 0 1 120 85" stroke="#CBD5E1" stroke-width="10" fill="none"/>
          <path d="M 20 85 A 50 50 0 0 1 70 35" stroke="#38BDF8" stroke-width="10" fill="none"/>
          <path d="M 70 35 A 50 50 0 0 1 105 50" stroke="#FBBF24" stroke-width="10" fill="none"/>
          <path d="M 105 50 A 50 50 0 0 1 120 85" stroke="#EF4444" stroke-width="10" fill="none"/>
          <!-- Needle at 60 MPH -->
          <line x1="70" y1="85" x2="88" y2="44" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
          <circle cx="70" cy="85" r="5" fill="#0F172A"/>
          <text x="70" y="78" text-anchor="middle" font-size="12" font-weight="900" fill="#0F172A">60 MPH</text>
        </svg>
      </div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:6px;">Instantaneous Speed = 60 MPH</div>
      <div style="font-size:9.5px;color:#15803D;font-weight:700;">(Scalar: Magnitude only)</div>
    </div>

    <!-- Definition Card -->
    <div style="background:#FFFFFF;border:1px solid #BBF7D0;border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:space-between;margin:8px 0;">
      <div style="padding-right:8px;">
        <div style="font-size:12px;font-weight:900;color:#0F172A;">WHAT IS SPEED?</div>
        <div style="font-size:9.5px;color:#334155;margin-top:3px;line-height:1.35;font-weight:600;">
          Speed is the rate at which an object covers distance.<br/>
          It does <strong>NOT</strong> include direction.
        </div>
      </div>
      <div style="background:#DCFCE7;border:1px solid #86EFAC;border-radius:6px;padding:4px 8px;font-size:9px;font-weight:900;color:#15803D;white-space:nowrap;line-height:1.3;">
        <div>✅ Magnitude: Yes.</div>
        <div>❌ Direction: No.</div>
      </div>
    </div>

    <!-- Alice's Trip Card -->
    <div style="background:#FFFFFF;border:1px solid #BBF7D0;border-radius:8px;padding:10px;display:flex;flex-direction:column;justify-content:space-between;flex-grow:1;">
      <div style="font-size:12px;font-weight:900;color:#15803D;text-align:center;margin-bottom:6px;">Alice's Trip</div>
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <!-- Winding Route Graphic -->
        <svg viewBox="0 0 160 90" width="140" height="75">
          <!-- Start Pin A -->
          <circle cx="20" cy="25" r="8" fill="#EF4444"/>
          <text x="20" y="28" text-anchor="middle" font-size="7" font-weight="900" fill="#FFFFFF">A</text>
          <!-- Winding Path -->
          <path d="M 20 25 Q 60 25 50 65 Q 40 90 90 75 Q 140 60 140 25" stroke="#0284C7" stroke-width="4" fill="none"/>
          <!-- End Pin B -->
          <circle cx="140" cy="25" r="8" fill="#10B981"/>
          <text x="140" y="28" text-anchor="middle" font-size="7" font-weight="900" fill="#FFFFFF">B</text>
          <!-- Speedometer badges on path -->
          <circle cx="65" cy="55" r="6" fill="#FBBF24" stroke="#0F172A"/>
          <circle cx="105" cy="70" r="6" fill="#38BDF8" stroke="#0F172A"/>
        </svg>

        <!-- Map Screen Widget with Magnifying Glass -->
        <svg viewBox="0 0 130 90" width="115" height="75">
          <rect x="5" y="5" width="120" height="80" rx="4" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <path d="M 20 70 Q 50 30 75 55 Q 100 80 110 20" stroke="#EA580C" stroke-width="3" fill="none"/>
          <!-- Magnifying Glass -->
          <circle cx="95" cy="60" r="14" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5"/>
          <line x1="105" y1="70" x2="120" y2="82" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="95" cy="60" r="8" fill="#FEF08A"/>
        </svg>
      </div>

      <div style="background:#F0FDF4;border:1px dashed #86EFAC;border-radius:6px;padding:6px;text-align:center;margin-top:6px;">
        <div style="font-size:11px;font-weight:900;color:#15803D;">Average Speed = (Total Distance) / (Total Time)</div>
      </div>
    </div>
  </div>`;
  cell('col_1', col1Html, 30, 128, 500, 687, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 4. COLUMN 2: VELOCITY (x=540..1040, y=128..815, h=687)
  const col2Html = `<div style="background:#EFF6FF;border:1.5px solid #93C5FD;border-radius:8px;padding:12px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;font-family:system-ui,-apple-system,sans-serif;">
    
    <!-- Top Hero: Alice's Velocity with Vector Arrow and Compass -->
    <div style="background:#FFFFFF;border:1px solid #BFDBFE;border-radius:8px;padding:10px;display:flex;flex-direction:column;align-items:center;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
      <div style="font-size:13px;font-weight:900;color:#1D4ED8;margin-bottom:6px;">Alice's Car</div>
      <div style="display:flex;align-items:center;justify-content:space-around;width:100%;">
        <!-- Green Car -->
        <svg viewBox="0 0 120 70" width="105" height="60">
          <path d="M 10 45 L 20 28 Q 35 15 60 15 L 90 15 Q 105 15 112 28 L 118 45 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>
          <rect x="5" y="40" width="110" height="12" rx="3" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
          <circle cx="30" cy="52" r="10" fill="#0F172A"/>
          <circle cx="90" cy="52" r="10" fill="#0F172A"/>
        </svg>

        <!-- Bold Blue Velocity Vector Arrow -->
        <svg viewBox="0 0 120 50" width="105" height="42">
          <line x1="10" y1="25" x2="95" y2="25" stroke="#2563EB" stroke-width="10"/>
          <polygon points="115,25 90,10 90,40" fill="#2563EB"/>
        </svg>

        <!-- Compass Rose SVG -->
        <svg viewBox="0 0 80 80" width="70" height="70">
          <circle cx="40" cy="40" r="32" stroke="#0F172A" stroke-width="2" fill="#FFFFFF"/>
          <text x="40" y="14" text-anchor="middle" font-size="10" font-weight="900" fill="#DC2626">N</text>
          <!-- 4 Points Star -->
          <polygon points="40,16 45,35 40,40" fill="#DC2626"/>
          <polygon points="40,16 35,35 40,40" fill="#991B1B"/>
          <polygon points="40,64 45,45 40,40" fill="#2563EB"/>
          <polygon points="40,64 35,45 40,40" fill="#1D4ED8"/>
          <polygon points="16,40 35,45 40,40" fill="#64748B"/>
          <polygon points="64,40 45,45 40,40" fill="#64748B"/>
          <circle cx="40" cy="40" r="3" fill="#0F172A"/>
        </svg>
      </div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:6px;">Alice's Velocity = 60 MPH North</div>
      <div style="font-size:9.5px;color:#1D4ED8;font-weight:700;">(Vector: Magnitude &amp; Direction)</div>
    </div>

    <!-- Definition Card -->
    <div style="background:#FFFFFF;border:1px solid #BFDBFE;border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:space-between;margin:8px 0;">
      <div style="padding-right:8px;">
        <div style="font-size:12px;font-weight:900;color:#0F172A;">WHAT IS VELOCITY?</div>
        <div style="font-size:9.5px;color:#334155;margin-top:3px;line-height:1.35;font-weight:600;">
          Velocity is the rate of change of an object's position (Displacement).<br/>
          It includes speed <strong>AND</strong> direction.
        </div>
      </div>
      <div style="background:#DBEAFE;border:1px solid #93C5FD;border-radius:6px;padding:4px 8px;font-size:9px;font-weight:900;color:#1D4ED8;white-space:nowrap;line-height:1.3;">
        <div>↗️ Magnitude: Yes.</div>
        <div>🧭 Direction: Yes.</div>
      </div>
    </div>

    <!-- Constant vs Changing Velocity Card -->
    <div style="background:#FFFFFF;border:1px solid #BFDBFE;border-radius:8px;padding:10px;display:flex;flex-direction:column;justify-content:space-between;flex-grow:1;">
      <div style="font-size:12px;font-weight:900;color:#1D4ED8;text-align:center;margin-bottom:6px;">Constant Velocity vs Changing Velocity</div>
      <div style="display:flex;align-items:center;justify-content:space-around;">
        <!-- Kinematic Trajectory Curves -->
        <svg viewBox="0 0 90 70" width="80" height="60">
          <line x1="10" y1="65" x2="85" y2="65" stroke="#0F172A" stroke-width="1.5"/>
          <line x1="10" y1="65" x2="10" y2="10" stroke="#0F172A" stroke-width="1.5"/>
          <path d="M 10 55 Q 35 15 80 15" stroke="#10B981" stroke-width="2.5" fill="none"/>
          <path d="M 10 40 Q 45 60 80 25" stroke="#2563EB" stroke-width="2.5" fill="none"/>
        </svg>

        <!-- Network Graph of Displacement -->
        <svg viewBox="0 0 100 70" width="90" height="60">
          <circle cx="20" cy="50" r="5" fill="#3B82F6"/>
          <circle cx="50" cy="20" r="5" fill="#3B82F6"/>
          <circle cx="80" cy="35" r="5" fill="#3B82F6"/>
          <circle cx="50" cy="55" r="5" fill="#3B82F6"/>
          <line x1="20" y1="50" x2="50" y2="20" stroke="#94A3B8" stroke-width="1.5"/>
          <line x1="50" y1="20" x2="80" y2="35" stroke="#94A3B8" stroke-width="1.5"/>
          <line x1="20" y1="50" x2="50" y2="55" stroke="#94A3B8" stroke-width="1.5"/>
          <!-- Direct Displacement Vector Arrow -->
          <line x1="20" y1="50" x2="75" y2="36" stroke="#059669" stroke-width="3"/>
          <polygon points="80,35 70,30 72,42" fill="#059669"/>
          <text x="50" y="68" text-anchor="middle" font-size="8" font-weight="900" fill="#059669">Displacement</text>
        </svg>

        <!-- GPS Screen with Straight Vector -->
        <svg viewBox="0 0 90 70" width="80" height="60">
          <rect x="5" y="5" width="80" height="60" rx="3" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <line x1="15" y1="55" x2="70" y2="15" stroke="#2563EB" stroke-width="3"/>
          <circle cx="15" cy="55" r="4" fill="#10B981"/>
          <circle cx="70" cy="15" r="4" fill="#EF4444"/>
        </svg>
      </div>

      <div style="background:#EFF6FF;border:1px dashed #93C5FD;border-radius:6px;padding:6px;text-align:center;margin-top:6px;">
        <div style="font-size:10px;font-weight:900;color:#1D4ED8;">Turning at constant speed changes velocity (Direction changes)!</div>
      </div>
    </div>
  </div>`;
  cell('col_2', col2Html, 540, 128, 500, 687, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 5. COLUMN 3: ACCELERATION (x=1050..1570, y=128..815, h=687)
  const col3Html = `<div style="background:#FFF7ED;border:1.5px solid #FED7AA;border-radius:8px;padding:12px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;font-family:system-ui,-apple-system,sans-serif;">
    
    <div style="font-size:14px;font-weight:900;color:#9A3412;text-align:center;text-transform:uppercase;letter-spacing:0.5px;">FORCE &amp; CHANGE</div>

    <!-- 3 Action Rows: Speed Up, Change Direction, Slow Down -->
    <div style="background:#FFFFFF;border:1px solid #FFEDD5;border-radius:8px;padding:8px 10px;display:flex;flex-direction:column;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
      <!-- Row A: SPEED UP! -->
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #FED7AA;padding-bottom:5px;">
        <div style="font-size:10.5px;font-weight:900;color:#0F172A;width:80px;">A. SPEED UP!</div>
        <!-- Car + Green Vector -->
        <div style="display:flex;align-items:center;gap:4px;">
          <svg viewBox="0 0 65 35" width="55" height="28">
            <rect x="5" y="10" width="55" height="16" rx="4" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
            <circle cx="18" cy="26" r="5" fill="#0F172A"/>
            <circle cx="48" cy="26" r="5" fill="#0F172A"/>
          </svg>
          <div style="font-size:8px;font-weight:900;color:#15803D;">➔ Accel Vector</div>
        </div>
        <!-- Speedometer 60 -> 80 + Rocket -->
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="font-size:11px;font-weight:900;color:#0F172A;">60 ➔ 80</div>
          <span style="font-size:16px;">🚀</span>
        </div>
      </div>

      <!-- Row B: CHANGE DIRECTION! -->
      <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #FED7AA;padding-bottom:5px;">
        <div style="font-size:10.5px;font-weight:900;color:#0F172A;width:80px;">B. TURN!</div>
        <!-- Car + Angled Vector -->
        <div style="display:flex;align-items:center;gap:4px;">
          <svg viewBox="0 0 65 35" width="55" height="28">
            <rect x="5" y="10" width="55" height="16" rx="4" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
            <circle cx="18" cy="26" r="5" fill="#0F172A"/>
            <circle cx="48" cy="26" r="5" fill="#0F172A"/>
          </svg>
          <div style="font-size:8px;font-weight:900;color:#2563EB;">↗️ Accel Vector</div>
        </div>
        <!-- Speedometer 60 -> 60 + Steering Wheel -->
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="font-size:11px;font-weight:900;color:#0F172A;">60 ➔ 60</div>
          <span style="font-size:16px;">🛞</span>
        </div>
      </div>

      <!-- Row C: SLOW DOWN! -->
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:10.5px;font-weight:900;color:#0F172A;width:80px;">C. BRAKE!</div>
        <!-- Car + Backward Red Vector -->
        <div style="display:flex;align-items:center;gap:4px;">
          <svg viewBox="0 0 65 35" width="55" height="28">
            <rect x="5" y="10" width="55" height="16" rx="4" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
            <circle cx="18" cy="26" r="5" fill="#0F172A"/>
            <circle cx="48" cy="26" r="5" fill="#0F172A"/>
          </svg>
          <div style="font-size:8px;font-weight:900;color:#DC2626;">⬅️ Decel Vector</div>
        </div>
        <!-- Speedometer 60 -> 40 + Brake -->
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="font-size:11px;font-weight:900;color:#DC2626;">60 ➔ 40</div>
          <span style="font-size:16px;">🛑</span>
        </div>
      </div>
    </div>

    <!-- Definition Card -->
    <div style="background:#FFFFFF;border:1px solid #FFEDD5;border-radius:8px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;margin:6px 0;">
      <div style="padding-right:6px;">
        <div style="font-size:11.5px;font-weight:900;color:#0F172A;">WHAT IS ACCELERATION?</div>
        <div style="font-size:9px;color:#334155;margin-top:2px;line-height:1.3;font-weight:600;">
          Acceleration is <strong>any change in velocity</strong>:<br/>
          SPEED UP, SLOW DOWN, OR CHANGE DIRECTION.
        </div>
      </div>
      <div style="background:#FFEDD5;border:1px solid #FDBA74;border-radius:6px;padding:3px 6px;font-size:8.5px;font-weight:900;color:#C2410C;white-space:nowrap;line-height:1.3;">
        <div>↗️ Magnitude: Yes.</div>
        <div>🧭 Direction: Yes.</div>
      </div>
    </div>

    <!-- Acceleration Logic Engine & Sinusoidal Graph -->
    <div style="background:#FFFFFF;border:1px solid #FFEDD5;border-radius:8px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;flex-grow:1;">
      <!-- Logic Engine Architecture Block -->
      <div style="background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.35;width:190px;">
        <div style="font-size:9px;font-weight:900;color:#C2410C;margin-bottom:2px;">DIJKSTRA'S ALGORITHM ENGINE</div>
        <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:4px;padding:4px;text-align:center;margin:2px 0;">
          Acceleration Logic Engine<br/>
          <span style="color:#64748B;font-size:7.5px;">Speed Change • Direction Change • Time Delta</span>
        </div>
      </div>

      <!-- Velocity vs Acceleration Sine Wave Graph -->
      <svg viewBox="0 0 150 90" width="140" height="80">
        <line x1="15" y1="45" x2="145" y2="45" stroke="#CBD5E1" stroke-width="1.5"/>
        <line x1="15" y1="10" x2="15" y2="80" stroke="#0F172A" stroke-width="1.5"/>
        <!-- Velocity Blue Sine -->
        <path d="M 15 45 Q 45 10 75 45 Q 105 80 135 45" stroke="#2563EB" stroke-width="2.5" fill="none"/>
        <!-- Acceleration Orange Cosine -->
        <path d="M 15 15 Q 45 45 75 75 Q 105 45 135 15" stroke="#EA580C" stroke-width="2.5" fill="none"/>
        <text x="5" y="25" font-size="7.5" font-weight="900" fill="#2563EB" transform="rotate(-90 5,25)">Velocity</text>
        <text x="5" y="70" font-size="7.5" font-weight="900" fill="#EA580C" transform="rotate(-90 5,70)">Accel</text>
      </svg>
    </div>
  </div>`;
  cell('col_3', col3Html, 1050, 128, 520, 687, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // 6. BOTTOM BANNER: DOWNSTREAM CONSUMPTION & FEEDBACK LOOP (y=822..882)
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

  // 7. FOOTER BRANDING (y=878..910)
  const ftrHtml = `<div style="display:flex;align-items:center;justify-content:space-between;padding:0 8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:800;color:#64748B;">
    <div>PRODUCER INDEPENDENCE | CONSUMER INDEPENDENCE | FORMAT, NOT PLATFORM</div>
    <div style="display:flex;align-items:center;gap:6px;color:#0F172A;font-weight:900;">
      <span>Google Cloud</span>
    </div>
  </div>`;
  cell('main_footer', ftrHtml, 30, 878, 1540, 28, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  return `<mxfile host="embed.diagrams.net">
  <diagram id="speed_velocity_acceleration" name="Visual Guide: Speed, Velocity, &amp; Acceleration">
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



export function renderNeuralNetworkArchitectureXml(
  roadmap?: Studio3ConceptualRoadmap,
  theme: 'light' | 'dark' = 'light'
): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${escapeXml(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=6;flowAnimation=1;') =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // 1. TOP HEADER BANNER (y=12..66)
  const hdrHtml = `<div style="background:#0F1E36;border-radius:8px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-family:system-ui,-apple-system,sans-serif;color:#FFFFFF;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="display:flex;align-items:center;gap:14px;">
      <div style="background:#2563EB;border-radius:8px;padding:8px 12px;font-size:20px;display:flex;align-items:center;justify-content:center;">🧠</div>
      <div>
        <div style="font-family:Impact,Arial Black,sans-serif;letter-spacing:1px;font-size:24px;text-transform:uppercase;color:#FFFFFF;line-height:1.1;">
          DEEP NEURAL NETWORK &amp; TRANSFORMER ARCHITECTURE
        </div>
        <div style="font-size:11px;color:#94A3B8;font-weight:600;margin-top:2px;">
          Token Ingestion ➔ Multi-Head Self-Attention (MHA) ➔ SwiGLU Dense Expansion ➔ KV-Cache Autoregression ➔ Reverse-Mode Autograd
        </div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="background:#1E293B;border:1px solid #38BDF8;padding:5px 12px;border-radius:6px;font-size:10px;font-weight:900;color:#38BDF8;">d_model = 4096</span>
      <span style="background:#1E293B;border:1px solid #FBBF24;padding:5px 12px;border-radius:6px;font-size:10px;font-weight:900;color:#FBBF24;">Layers N = 32</span>
      <span style="background:#1E293B;border:1px solid #34D399;padding:5px 12px;border-radius:6px;font-size:10px;font-weight:900;color:#34D399;">⚡ FlashAttention-3</span>
    </div>
  </div>`;
  cell('main_header', hdrHtml, 25, 12, 1550, 54, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // ============================================================================
  // ZONE 1: INPUT INGESTION & EMBEDDING PIPELINE (x=25..365, y=74..860, h=786)
  // ============================================================================
  cell('z1_box', '', 25, 74, 340, 786, 'rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#93C5FD;strokeWidth=2;');
  const z1HdrHtml = `<div style="background:#2563EB;color:#FFFFFF;border-top-left-radius:6px;border-top-right-radius:6px;padding:10px 14px;font-family:Impact,Arial Black,sans-serif;font-size:15px;letter-spacing:0.5px;display:flex;align-items:center;justify-content:space-between;">
    <span>📥 1. INPUT &amp; EMBEDDINGS</span>
    <span style="font-size:10px;background:#1D4ED8;padding:2px 8px;border-radius:4px;">X ∈ ℝ^(B×T×D)</span>
  </div>`;
  cell('z1_hdr', z1HdrHtml, 25, 74, 340, 40, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 1: Raw String Tokenizer (y=122..245, h=123)
  cell('c_tok', '', 38, 122, 314, 125, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;');
  const cTokHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#1E3A8A;">❶ Byte-Pair Tokenizer (BPE)</span>
      <span style="background:#EFF6FF;font-size:8px;font-weight:800;color:#1D4ED8;padding:2px 6px;border-radius:4px;">Vocab V=32k</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Converts raw UTF-8 string into sequence of discrete vocabulary IDs.</div>
    <div style="background:#F1F5F9;border:1px solid #E2E8F0;border-radius:4px;padding:4px 8px;font-family:monospace;font-size:9px;color:#0F172A;margin-top:6px;font-weight:800;">tokens = ["The", " neural", " net"] ➔ [464, 15729, 2642]</div>
  </div>`;
  cell('c_tok_txt', cTokHtml, 38, 122, 314, 125, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2: Learned Word Embedding Matrix (y=265..395, h=130)
  cell('c_emb', '', 38, 265, 314, 130, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;');
  const cEmbHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#1E3A8A;">❷ Embedding Matrix W_E</span>
      <span style="background:#EFF6FF;font-size:8px;font-weight:800;color:#1D4ED8;padding:2px 6px;border-radius:4px;">ℝ^(32000 × 4096)</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Lookup projection mapping discrete token indices to 4096-dim dense semantic vector space.</div>
    <div style="background:#EFF6FF;border:1px solid #DBEAFE;border-radius:4px;padding:4px 8px;font-size:9px;color:#1D4ED8;margin-top:6px;font-weight:900;text-align:center;">X_emb = Lookup(W_E, tokens) ∈ ℝ^(B×T×4096)</div>
  </div>`;
  cell('c_emb_txt', cEmbHtml, 38, 265, 314, 130, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 3: Rotary Positional Encoding (RoPE) (y=415..550, h=135)
  cell('c_rope', '', 38, 415, 314, 135, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#FED7AA;strokeWidth=1.5;');
  const cRopeHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#9A3412;">❸ Rotary Pos Encoding (RoPE)</span>
      <span style="background:#FFF7ED;font-size:8px;font-weight:800;color:#C2410C;padding:2px 6px;border-radius:4px;">2D Rotation</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Rotates 2D coordinate pairs by position angle θ_m to preserve relative token distances.</div>
    <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:4px;padding:4px 8px;font-size:9px;color:#B45309;margin-top:6px;font-weight:900;text-align:center;">x_m' = R_(Θ,m)^d · x_m  (Relative Invariant)</div>
  </div>`;
  cell('c_rope_txt', cRopeHtml, 38, 415, 314, 135, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 4: Pre-Layer RMSNorm (y=570..710, h=140)
  cell('c_norm1', '', 38, 570, 314, 140, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;');
  const cNorm1Html = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#065F46;">❹ Pre-Layer RMSNorm</span>
      <span style="background:#ECFDF5;font-size:8px;font-weight:800;color:#047857;padding:2px 6px;border-radius:4px;">Zero Drift</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Scales activations by root-mean-square norm to eliminate exploding gradients.</div>
    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:4px;padding:4px 8px;font-size:9px;color:#15803D;margin-top:6px;font-weight:900;text-align:center;">RMS(x) = √( 1/d ∑ x_i² + ε )  •  x̂ = (x / RMS(x)) ⊙ γ</div>
  </div>`;
  cell('c_norm1_txt', cNorm1Html, 38, 570, 314, 140, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 5: Tensor Dimension Indicator (y=730..845, h=115)
  cell('c_dim1', '', 38, 730, 314, 115, 'rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;');
  const cDim1Html = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
    <div style="font-size:10.5px;font-weight:900;color:#1D4ED8;margin-bottom:3px;">Normalized Tensor Ready for Layer Stack</div>
    <div style="font-family:monospace;font-size:11px;font-weight:900;color:#0F172A;">X_0 ∈ ℝ^(Batch × 2048 × 4096)</div>
    <div style="font-size:8.5px;color:#3B82F6;margin-top:4px;font-weight:700;">⚡ 100% FP8 / bfloat16 Memory Resident</div>
  </div>`;
  cell('c_dim1_txt', cDim1Html, 38, 730, 314, 115, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Zone 1 Internal Vertical Animated Arrows
  edge('e1_tok_emb', 'c_tok', 'c_emb', 'strokeColor=#2563EB;strokeWidth=2.5;flowAnimation=1;');
  edge('e1_emb_rope', 'c_emb', 'c_rope', 'strokeColor=#2563EB;strokeWidth=2.5;flowAnimation=1;');
  edge('e1_rope_norm', 'c_rope', 'c_norm1', 'strokeColor=#2563EB;strokeWidth=2.5;flowAnimation=1;');
  edge('e1_norm_dim', 'c_norm1', 'c_dim1', 'strokeColor=#2563EB;strokeWidth=2.5;flowAnimation=1;');

  // ============================================================================
  // ZONE 2: TRANSFORMER BLOCK STACK (REPEATED × N = 32) (x=380..1205, y=74..860, h=786)
  // ============================================================================
  cell('z2_box', '', 380, 74, 825, 786, 'rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=2;');
  const z2HdrHtml = `<div style="background:#7C3AED;color:#FFFFFF;border-top-left-radius:6px;border-top-right-radius:6px;padding:10px 18px;font-family:Impact,Arial Black,sans-serif;font-size:15px;letter-spacing:0.5px;display:flex;align-items:center;justify-content:space-between;">
    <span>⚡ 2. TRANSFORMER BLOCK CORE (REPEATED × N = 32 LAYERS)</span>
    <span style="font-size:10px;background:#6D28D9;padding:2px 10px;border-radius:4px;">Pre-Norm Dual Residual Highway</span>
  </div>`;
  cell('z2_hdr', z2HdrHtml, 380, 74, 825, 40, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // SUB-CONTAINER 2A: MULTI-HEAD SELF-ATTENTION (MHA / GQA) (x=395..780, y=122..845)
  cell('z2a_box', '', 395, 122, 385, 723, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.5;');
  const z2aHdrHtml = `<div style="background:#6D28D9;color:#FFFFFF;border-top-left-radius:6px;border-top-right-radius:6px;padding:8px 12px;font-family:Impact,Arial Black,sans-serif;font-size:13px;display:flex;align-items:center;justify-content:space-between;">
    <span>A. GROUPED-QUERY ATTENTION (GQA)</span>
    <span style="font-size:8.5px;background:#5B21B6;padding:2px 6px;border-radius:3px;">32 Q Heads • 8 KV Heads</span>
  </div>`;
  cell('z2a_hdr', z2aHdrHtml, 395, 122, 385, 34, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2A.1: Linear Q, K, V Projections (y=162..285, h=123)
  cell('c_qkv', '', 405, 162, 365, 123, 'rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const cQkvHtml = `<div style="padding:8px 10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:10.5px;font-weight:900;color:#1E293B;margin-bottom:6px;">❺ Linear Projections (Q, K, V)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
      <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:4px;padding:4px;text-align:center;">
        <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;">Q (Query)</div>
        <div style="font-size:7.5px;font-family:monospace;color:#3B82F6;">Q = X · W_Q</div>
      </div>
      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:4px;padding:4px;text-align:center;">
        <div style="font-size:9.5px;font-weight:900;color:#065F46;">K (Key)</div>
        <div style="font-size:7.5px;font-family:monospace;color:#10B981;">K = X · W_K</div>
      </div>
      <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:4px;padding:4px;text-align:center;">
        <div style="font-size:9.5px;font-weight:900;color:#9A3412;">V (Value)</div>
        <div style="font-size:7.5px;font-family:monospace;color:#F97316;">V = X · W_V</div>
      </div>
    </div>
  </div>`;
  cell('c_qkv_txt', cQkvHtml, 405, 162, 365, 123, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2A.2: Scaled Dot-Product Core (y=295..440, h=145)
  cell('c_attn_core', '', 405, 295, 365, 145, 'rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;');
  const cAttnCoreHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
    <div style="font-size:10.5px;font-weight:900;color:#6B21A8;margin-bottom:4px;">❻ Scaled Dot-Product Attention Core</div>
    <div style="background:#FFFFFF;border:1.5px solid #D8B4FE;border-radius:6px;padding:8px;font-family:monospace;font-size:10px;font-weight:900;color:#7C3AED;margin-bottom:6px;">
      Attention(Q,K,V) = Softmax( (Q · K^T)/√d_k + M_causal ) · V
    </div>
    <div style="font-size:8px;color:#7E22CE;">Causal Mask M ensures token t only attends to previous tokens &lt;= t</div>
  </div>`;
  cell('c_attn_core_txt', cAttnCoreHtml, 405, 295, 365, 145, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2A.3: FlashAttention-3 Kernel (y=450..585, h=135)
  cell('c_flash', '', 405, 450, 365, 135, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#FDE68A;strokeWidth=1.5;');
  const cFlashHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
      <span style="font-size:13px;">⚡</span>
      <span style="font-size:10.5px;font-weight:900;color:#92400E;">❼ FlashAttention-3 GPU Kernel</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Tiled matrix multiplication with online softmax normalization. Avoids reading/writing N×N attention matrix to GPU HBM.</div>
    <div style="background:#FEF3C7;border-radius:4px;padding:3px 6px;font-size:8px;font-weight:800;color:#B45309;margin-top:4px;text-align:center;">IO Complexity: O(N) SRAM transfers (3x Faster Inference)</div>
  </div>`;
  cell('c_flash_txt', cFlashHtml, 405, 450, 365, 135, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2A.4: Linear Output Projection W_O (y=595..710, h=115)
  cell('c_proj_o', '', 405, 595, 365, 115, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;');
  const cProjOHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:3px;">❽ Output Projection W_O</div>
    <div style="font-size:8.5px;color:#475569;">Concatenates 32 attention head outputs and maps back to model dimension:</div>
    <div style="background:#EFF6FF;border:1px solid #DBEAFE;border-radius:4px;padding:4px;font-family:monospace;font-size:8.5px;color:#1D4ED8;margin-top:4px;font-weight:800;text-align:center;">MHA_Out = Concat(head_1, ..., head_32) · W_O</div>
  </div>`;
  cell('c_proj_o_txt', cProjOHtml, 405, 595, 365, 115, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2A.5: Residual Add & RMSNorm 2 (y=720..835, h=115)
  cell('c_res1', '', 405, 720, 365, 115, 'rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;');
  const cRes1Html = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
    <div style="font-size:10.5px;font-weight:900;color:#15803D;margin-bottom:3px;">❾ Residual Bypass Highway 1</div>
    <div style="font-family:monospace;font-size:9.5px;font-weight:900;color:#166534;">X_mid = X_in + MHA_Out  ➔  RMSNorm(X_mid)</div>
    <div style="font-size:8px;color:#15803D;margin-top:2px;">Direct uninterrupted identity gradient backpropagation</div>
  </div>`;
  cell('c_res1_txt', cRes1Html, 405, 720, 365, 115, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Zone 2A Internal Connectors
  edge('e2a_qkv_core', 'c_qkv', 'c_attn_core', 'strokeColor=#7C3AED;strokeWidth=2.5;flowAnimation=1;');
  edge('e2a_core_flash', 'c_attn_core', 'c_flash', 'strokeColor=#7C3AED;strokeWidth=2.5;flowAnimation=1;');
  edge('e2a_flash_proj', 'c_flash', 'c_proj_o', 'strokeColor=#7C3AED;strokeWidth=2.5;flowAnimation=1;');
  edge('e2a_proj_res', 'c_proj_o', 'c_res1', 'strokeColor=#16A34A;strokeWidth=2.5;flowAnimation=1;');

  // SUB-CONTAINER 2B: FEED-FORWARD DENSE NETWORK (SwiGLU FFN) (x=800..1185, y=122..845)
  cell('z2b_box', '', 800, 122, 385, 723, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.5;');
  const z2bHdrHtml = `<div style="background:#9333EA;color:#FFFFFF;border-top-left-radius:6px;border-top-right-radius:6px;padding:8px 12px;font-family:Impact,Arial Black,sans-serif;font-size:13px;display:flex;align-items:center;justify-content:space-between;">
    <span>B. SwiGLU FEED-FORWARD DENSE NETWORK</span>
    <span style="font-size:8.5px;background:#7E22CE;padding:2px 6px;border-radius:3px;">Hidden Dim = 14,336</span>
  </div>`;
  cell('z2b_hdr', z2bHdrHtml, 800, 122, 385, 34, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2B.1: Dual Projections (W_gate, W_up) (y=162..285, h=123)
  cell('c_gate_up', '', 810, 162, 365, 123, 'rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const cGateUpHtml = `<div style="padding:8px 10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:10.5px;font-weight:900;color:#1E293B;margin-bottom:6px;">❿ Expansion Projections (W_gate, W_up)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:4px;padding:6px;text-align:center;">
        <div style="font-size:9.5px;font-weight:900;color:#9A3412;">W_gate Projection</div>
        <div style="font-size:7.5px;font-family:monospace;color:#C2410C;">Linear(4096 ➔ 14336)</div>
      </div>
      <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:4px;padding:6px;text-align:center;">
        <div style="font-size:9.5px;font-weight:900;color:#9A3412;">W_up Projection</div>
        <div style="font-size:7.5px;font-family:monospace;color:#C2410C;">Linear(4096 ➔ 14336)</div>
      </div>
    </div>
  </div>`;
  cell('c_gate_up_txt', cGateUpHtml, 810, 162, 365, 123, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2B.2: SwiGLU Gated Activation (y=295..440, h=145)
  cell('c_swiglu', '', 810, 295, 365, 145, 'rounded=1;arcSize=6;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1.5;');
  const cSwigluHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
    <div style="font-size:10.5px;font-weight:900;color:#9A3412;margin-bottom:4px;">⓫ SwiGLU Gated Non-Linear Activation</div>
    <div style="background:#FFFFFF;border:1.5px solid #FED7AA;border-radius:6px;padding:8px;font-family:monospace;font-size:10px;font-weight:900;color:#C2410C;margin-bottom:6px;">
      h = (x · W_gate ⊙ σ(x · W_gate)) ⊗ (x · W_up)
    </div>
    <div style="font-size:8px;color:#9A3412;">Non-monotonic Swish gate outperforms legacy ReLU/GELU in knowledge recall</div>
  </div>`;
  cell('c_swiglu_txt', cSwigluHtml, 810, 295, 365, 145, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2B.3: Down Projection W_down (y=450..585, h=135)
  cell('c_down', '', 810, 450, 365, 135, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;');
  const cDownHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:3px;">⓬ Contraction Projection W_down</div>
    <div style="font-size:8.5px;color:#475569;">Compresses 14,336 hidden features back to standard 4096-dim model dimension:</div>
    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:4px;padding:4px;font-family:monospace;font-size:8.5px;color:#1D4ED8;margin-top:4px;font-weight:800;text-align:center;">FFN_Out = h · W_down ∈ ℝ^(B×T×4096)</div>
  </div>`;
  cell('c_down_txt', cDownHtml, 810, 450, 365, 135, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2B.4: Residual Add 2 (y=595..710, h=115)
  cell('c_res2', '', 810, 595, 365, 115, 'rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;');
  const cRes2Html = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
    <div style="font-size:10.5px;font-weight:900;color:#15803D;margin-bottom:3px;">⓭ Residual Bypass Highway 2</div>
    <div style="font-family:monospace;font-size:9.5px;font-weight:900;color:#166534;">X_out = X_mid + FFN_Out</div>
    <div style="font-size:8px;color:#15803D;margin-top:2px;">Feeds into next layer stack (Layer l+1)</div>
  </div>`;
  cell('c_res2_txt', cRes2Html, 810, 595, 365, 115, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 2B.5: Stack Loop Repeater Badge (y=720..835, h=115)
  cell('c_rep', '', 810, 720, 365, 115, 'rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1.5;');
  const cRepHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
    <div style="font-size:11px;font-weight:900;color:#6D28D9;margin-bottom:3px;">🔄 Layer Loop Counter (l = 1 .. 32)</div>
    <div style="font-size:8.5px;color:#7C3AED;">If layer &lt; 32, route X_out into Layer l+1; else route to Final Logits</div>
    <div style="background:#F3E8FF;border-radius:4px;padding:3px 6px;font-size:8px;font-weight:800;color:#5B21B6;margin-top:4px;">Zero Degradation with Deep Residual Normalization</div>
  </div>`;
  cell('c_rep_txt', cRepHtml, 810, 720, 365, 115, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Zone 2B Internal Connectors
  edge('e2b_res1_gate', 'c_res1', 'c_gate_up', 'strokeColor=#9333EA;strokeWidth=2.5;flowAnimation=1;');
  edge('e2b_gate_swiglu', 'c_gate_up', 'c_swiglu', 'strokeColor=#EA580C;strokeWidth=2.5;flowAnimation=1;');
  edge('e2b_swiglu_down', 'c_swiglu', 'c_down', 'strokeColor=#EA580C;strokeWidth=2.5;flowAnimation=1;');
  edge('e2b_down_res2', 'c_down', 'c_res2', 'strokeColor=#16A34A;strokeWidth=2.5;flowAnimation=1;');
  edge('e2b_res2_rep', 'c_res2', 'c_rep', 'strokeColor=#7C3AED;strokeWidth=2.5;flowAnimation=1;');

  // ============================================================================
  // ZONE 3: OUTPUT PROJECTION, LOGITS & LOSS (x=1220..1575, y=74..860, h=786)
  // ============================================================================
  cell('z3_box', '', 1220, 74, 355, 786, 'rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#86EFAC;strokeWidth=2;');
  const z3HdrHtml = `<div style="background:#059669;color:#FFFFFF;border-top-left-radius:6px;border-top-right-radius:6px;padding:10px 14px;font-family:Impact,Arial Black,sans-serif;font-size:15px;letter-spacing:0.5px;display:flex;align-items:center;justify-content:space-between;">
    <span>🎯 3. LOGITS, LOSS &amp; KV-CACHE</span>
    <span style="font-size:10px;background:#047857;padding:2px 8px;border-radius:4px;">Softmax Probability</span>
  </div>`;
  cell('z3_hdr', z3HdrHtml, 1220, 74, 355, 40, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 3.1: Final RMSNorm (y=122..245, h=123)
  cell('c_final_norm', '', 1232, 122, 331, 125, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;');
  const cFinalNormHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11px;font-weight:900;color:#065F46;margin-bottom:3px;">⓮ Final Layer RMSNorm</div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Final normalization of the 32nd layer output vector before vocab projection.</div>
    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:4px;padding:4px;font-size:8.5px;color:#15803D;margin-top:6px;font-weight:800;text-align:center;">X_final = RMSNorm(X_32) ∈ ℝ^(B×T×4096)</div>
  </div>`;
  cell('c_final_norm_txt', cFinalNormHtml, 1232, 122, 331, 125, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 3.2: Unembedding Matrix W_U (y=265..395, h=130)
  cell('c_unemb', '', 1232, 265, 331, 130, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;');
  const cUnembHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#065F46;">⓯ Unembedding Head W_U</span>
      <span style="background:#ECFDF5;font-size:8px;font-weight:800;color:#047857;padding:2px 6px;border-radius:4px;">ℝ^(4096 × 32k)</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Linear projection mapping latent vectors into raw logit scores z for all 32,000 dictionary tokens.</div>
    <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:4px;padding:4px;font-family:monospace;font-size:8.5px;color:#047857;margin-top:6px;font-weight:800;text-align:center;">logits z = X_final · W_U ∈ ℝ^(B×T×32000)</div>
  </div>`;
  cell('c_unemb_txt', cUnembHtml, 1232, 265, 331, 130, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 3.3: Softmax & Temperature Sampling (y=415..550, h=135)
  cell('c_softmax', '', 1232, 415, 331, 135, 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.5;');
  const cSoftmaxHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:11px;font-weight:900;color:#065F46;margin-bottom:3px;">⓰ Softmax Temperature Sampling</div>
    <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:4px;padding:4px;font-family:monospace;font-size:9px;font-weight:900;color:#047857;text-align:center;margin-bottom:4px;">
      P(w_i) = exp(z_i / T) / ∑ exp(z_j / T)
    </div>
    <div style="font-size:8px;color:#64748B;">Top-P (Nucleus = 0.95), Top-K = 40, Min-P = 0.05 sampling filters</div>
    <div style="background:#F0FDF4;border-radius:4px;padding:3px 6px;font-size:8.5px;font-weight:800;color:#15803D;margin-top:4px;text-align:center;">Generated Token: " learning" (ID: 4672)</div>
  </div>`;
  cell('c_softmax_txt', cSoftmaxHtml, 1232, 415, 331, 135, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 3.4: Dynamic KV-Cache Store (y=570..710, h=140)
  cell('c_kv', '', 1232, 570, 331, 140, 'rounded=1;arcSize=6;fillColor=#F0FDFA;strokeColor=#99F6E4;strokeWidth=1.5;');
  const cKvHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#0F766E;">⓱ Dynamic KV-Cache Buffer</span>
      <span style="background:#CCFBF1;font-size:8px;font-weight:800;color:#0F766E;padding:2px 6px;border-radius:4px;">PagedAttention</span>
    </div>
    <div style="font-size:8.5px;color:#475569;line-height:1.3;">Stores previous Key/Value tensors in high-speed GPU VRAM to avoid recomputing past tokens during generation.</div>
    <div style="background:#CCFBF1;border:1px solid #5EEAD4;border-radius:4px;padding:4px;font-size:8.5px;color:#0F766E;margin-top:6px;font-weight:900;text-align:center;">⚡ Autoregressive Feedback Loop</div>
  </div>`;
  cell('c_kv_txt', cKvHtml, 1232, 570, 331, 140, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Card 3.5: Cross-Entropy Loss & Backprop Autograd (y=730..845, h=115)
  cell('c_loss', '', 1232, 730, 331, 115, 'rounded=1;arcSize=6;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1.5;');
  const cLossHtml = `<div style="padding:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:11px;font-weight:900;color:#B91C1C;">⓲ Cross-Entropy Loss</span>
      <span style="background:#FEE2E2;font-size:8px;font-weight:800;color:#991B1B;padding:2px 6px;border-radius:4px;">Autograd Backprop</span>
    </div>
    <div style="background:#FFFFFF;border:1px solid #FECACA;border-radius:4px;padding:3px;font-family:monospace;font-size:8.5px;font-weight:900;color:#DC2626;text-align:center;margin-bottom:3px;">
      ℒ = -∑ y_i log(ŷ_i)  •  ∇_θ ℒ = ∂ℒ / ∂W
    </div>
    <div style="font-size:8px;color:#991B1B;">Reverse-mode autodiff propagates gradient tensors backward</div>
  </div>`;
  cell('c_loss_txt', cLossHtml, 1232, 730, 331, 115, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Zone 3 Internal Connectors
  edge('e3_norm_unemb', 'c_final_norm', 'c_unemb', 'strokeColor=#059669;strokeWidth=2.5;flowAnimation=1;');
  edge('e3_unemb_soft', 'c_unemb', 'c_softmax', 'strokeColor=#059669;strokeWidth=2.5;flowAnimation=1;');
  edge('e3_soft_kv', 'c_softmax', 'c_kv', 'strokeColor=#0D9488;strokeWidth=2.5;flowAnimation=1;');
  edge('e3_soft_loss', 'c_softmax', 'c_loss', 'strokeColor=#DC2626;strokeWidth=2.5;flowAnimation=1;');

  // ============================================================================
  // MAJOR INTER-ZONE CONNECTOR HIGHWAYS
  // ============================================================================
  // 1. Zone 1 ➔ Zone 2 (Forward Tensor Stream)
  edge('e_z1_z2', 'c_dim1', 'c_qkv', 'strokeColor=#2563EB;strokeWidth=3;flowAnimation=1;');

  // 2. Zone 2 ➔ Zone 3 (Block Output ➔ Final Norm)
  edge('e_z2_z3', 'c_rep', 'c_final_norm', 'strokeColor=#7C3AED;strokeWidth=3;flowAnimation=1;');

  // 3. Autoregressive KV-Cache Feedback Loop (Zone 3 ➔ Zone 2 KV Buffer)
  edge('e_kv_loop', 'c_kv', 'c_qkv', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=2.5;dashed=1;dashPattern=6 4;flowAnimation=1;');

  // 4. Backward Gradient Backpropagation Flow (Zone 3 Loss ➔ Zone 2 FFN ➔ Zone 1 Embeddings)
  edge('e_backprop_z3_z2', 'c_loss', 'c_down', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#DC2626;strokeWidth=2.5;dashed=1;dashPattern=6 4;flowAnimation=1;');
  edge('e_backprop_z2_z1', 'c_res1', 'c_emb', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#DC2626;strokeWidth=2.5;dashed=1;dashPattern=6 4;flowAnimation=1;');

  // ============================================================================
  // ZONE 4: DISTRIBUTED ACCELERATOR HARDWARE CLUSTER (y=870..942, h=72)
  // ============================================================================
  const btmTelemetryHtml = `<div style="background:#0F172A;border:1.5px solid #334155;border-radius:8px;padding:8px 20px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 4px 10px rgba(0,0,0,0.2);">
    <div>
      <div style="font-size:12px;font-weight:900;color:#38BDF8;text-transform:uppercase;letter-spacing:0.5px;">🚀 Distributed Hardware Accelerators &amp; 3D Parallelism Mesh</div>
      <div style="font-size:9.5px;color:#94A3B8;margin-top:2px;">Google TPU v5p Pods (8,960 Chips) • NVIDIA H100 SXM5 80GB • Megatron-LM Parallel Mesh</div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="background:#1E293B;border:1px solid #3B82F6;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:900;color:#60A5FA;">Tensor Parallel TP=8</span>
      <span style="background:#1E293B;border:1px solid #10B981;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:900;color:#34D399;">Pipeline Parallel PP=4</span>
      <span style="background:#1E293B;border:1px solid #8B5CF6;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:900;color:#C084FC;">ZeRO-3 Data Parallel DP=64</span>
      <span style="background:#1E293B;border:1px solid #F59E0B;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:900;color:#FBBF24;">⚡ FP8 Tensor Core Engine</span>
    </div>
  </div>`;
  cell('btm_telemetry', btmTelemetryHtml, 25, 870, 1550, 72, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // ============================================================================
  // ZONE 5: FOOTER (y=950..980, h=30)
  // ============================================================================
  const ftrHtml = `<div style="display:flex;align-items:center;justify-content:space-between;padding:0 8px;font-family:system-ui,-apple-system,sans-serif;font-size:10.5px;font-weight:800;color:#64748B;">
    <div style="display:flex;align-items:center;gap:18px;">
      <span style="color:#2563EB;">➔ FORWARD INFERENCE (Solid Blue)</span>
      <span style="color:#16A34A;">➔ RESIDUAL BYPASS (Solid Green)</span>
      <span style="color:#0D9488;">➔ AUTOREGRESSIVE KV LOOP (Dashed Teal)</span>
      <span style="color:#DC2626;">⬅ AUTOGRAD BACKPROPAGATION (Dashed Red)</span>
    </div>
    <div style="display:flex;align-items:center;gap:6px;color:#0F172A;font-weight:900;">
      <span>Google Cloud Vertex AI &amp; DeepMind Core</span>
    </div>
  </div>`;
  cell('main_footer', ftrHtml, 25, 950, 1550, 30, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  return `<mxfile host="embed.diagrams.net">
  <diagram id="neural_network_transformer_architecture" name="Deep Neural Network &amp; Transformer Architecture">
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
  const titleLower = (roadmap.title || '').toLowerCase();
  
  const isNeural = titleLower.includes('neural') || titleLower.includes('transformer') || titleLower.includes('deep learning') || titleLower.includes('attention') || titleLower.includes('backpropagation') || titleLower.includes('mlp') || titleLower.includes('llm') || titleLower.includes('cnn') || titleLower.includes('rnn') || titleLower.includes('network arch');
  if (isNeural) {
    return renderNeuralNetworkArchitectureXml(roadmap, theme);
  }

  const isCentripetal = titleLower.includes('centripetal') || titleLower.includes('centrifugal') || titleLower.includes('spinning');
  if (isCentripetal) {
    return renderTwoSidesOfTheSpinInfographicXml(roadmap, theme);
  }

  const spec = synthesizeVisualConceptSpecFromPrompt(roadmap.title || '');
  return compileVisualConceptSpecToXml(spec);
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
