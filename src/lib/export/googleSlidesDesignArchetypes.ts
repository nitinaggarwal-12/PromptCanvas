/**
 * Enterprise Google Slides Design Plugin (`google-slides-design` v2.0) —
 * 100% Native Editable Visual & Diagram Archetype Builders for PptxGenJS / Google Slides.
 *
 * Implements the 6 Canonical Visual Diagram Archetypes + Grounded Live Screenshot Proof Layout
 * defined in `~/.gemini/config/plugins/google-slides-design/skills/slide-design/SKILL.md`:
 *   1. `three-zone-architecture`  (3-Column System Boundary & Interconnect Topology with Dual Gateway Buses & Vector Icons)
 *   2. `payload-transformation`   (3-Stage Before -> Engine -> After Payload Sanitization Pipeline with Valid JSON & Inline Pills)
 *   3. `swimlane-sequence`        (5-Actor Horizontal Lifeline & Numbered Step Sequence with Vector Icons, Self-Loops & Scale-to-Zero Band)
 *   4. `roadmap-timeline`         (3-Phase Connected Horizon Roadmap Cards with 5 Timeline Nodes)
 *   5. `async-state-machine`      (4-Node Horizontal Async Processing & Out-of-Band Webhook Return Loop with Wide Non-Overlapping Labels)
 *   6. `operating-model-pillars`  (3-Column Executive Operating Model Cards with Top/Bottom Accent Bars & Native Vector Icons)
 *   7. `grounded-screenshot-proof`(Annotated Live Cloud Console / Product UI Screenshot with 16:9 Aspect Preservation + 4 Editable Callouts)
 */

import fs from 'node:fs';
import PptxGenJS from 'pptxgenjs';

export const GOOGLE_QUAD_COLORS = [
  '4285F4', // 1. Blue (#4285F4)
  'EA4335', // 2. Red (#EA4335)
  'FBBC04', // 3. Yellow (#FBBC04)
  '34A853', // 4. Green (#34A853)
] as const;

export const BRAND_TOKENS = {
  titleDark: '3C4043',
  bodyGray: '5F6368',
  cardBg: 'F8F9FA',
  cardBorder: 'DADCE0',
  dividerDark: '202124',
  execNavy: '0F294A',
  execTeal: '0D807B',
  execSlate: '536D88',
  execAmber: 'C98A1B',
  coralBorder: 'D9534F',
  coralPill: 'FAD2CF',
  fontTitle: 'Google Sans',
  fontDisplay: 'Google Sans Display',
  fontBody: 'Roboto',
  fontMono: 'Courier New',
} as const;

export function addSlideHeader(
  slide: PptxGenJS.Slide,
  title: string,
  subtitle?: string
) {
  slide.addText(title, {
    x: 0.5,
    y: 0.22,
    w: 9.0,
    h: 0.36,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 16.5,
    bold: true,
    color: BRAND_TOKENS.titleDark,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5,
      y: 0.58,
      w: 9.0,
      h: 0.24,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 9.5,
      color: BRAND_TOKENS.bodyGray,
    });
  }
}

export function addConfidentialFooter(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  slideNum: number,
  totalSlides: number,
  deckLabel = 'Google Cloud Architecture Center • Workstream 1 (DOC-MT-01)',
  isDark = false
) {
  const textColor = isDark ? '9AA0A6' : BRAND_TOKENS.bodyGray;
  const lineColor = isDark ? '3C4043' : BRAND_TOKENS.cardBorder;

  slide.addShape(pptx.ShapeType.line, {
    x: 0.5,
    y: 5.24,
    w: 9.0,
    h: 0,
    line: { color: lineColor, width: 0.75 },
  });

  slide.addText(deckLabel, {
    x: 0.5,
    y: 5.28,
    w: 4.8,
    h: 0.24,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    color: textColor,
  });

  slide.addText('Proprietary + Confidential', {
    x: 5.3,
    y: 5.28,
    w: 3.2,
    h: 0.24,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    bold: true,
    color: textColor,
    align: 'right',
  });

  slide.addText(`${slideNum} / ${totalSlides}`, {
    x: 8.6,
    y: 5.28,
    w: 0.9,
    h: 0.24,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    color: textColor,
    align: 'right',
  });
}

// ============================================================================
// Native Vector Icon Helpers (Zero Unicode Emojis — 100% Editable Shapes)
// ============================================================================
function drawVectorMonitorIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  x: number,
  y: number,
  brandLabel = 'Gemini'
) {
  // Outer monitor bezel
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 0.88,
    h: 0.54,
    rectRadius: 0.04,
    fill: { color: 'FFFFFF' },
    line: { color: BRAND_TOKENS.execNavy, width: 1.5 },
  });
  // Top browser bar inside monitor
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.03,
    y: y + 0.03,
    w: 0.82,
    h: 0.12,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { type: 'none' },
  });
  // Left sidebar inside monitor
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.03,
    y: y + 0.15,
    w: 0.18,
    h: 0.36,
    fill: { color: 'CFD8DC' },
    line: { type: 'none' },
  });
  // Brand text inside screen
  slide.addText(brandLabel, {
    x: x + 0.22,
    y: y + 0.18,
    w: 0.62,
    h: 0.28,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 7.5,
    bold: true,
    color: BRAND_TOKENS.execTeal,
    align: 'center',
    valign: 'middle',
  });
}

function drawVectorDeveloperLaptopIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  x: number,
  y: number
) {
  // Person head
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.34,
    y: y + 0.02,
    w: 0.2,
    h: 0.2,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { type: 'none' },
  });
  // Shoulders
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.22,
    y: y + 0.23,
    w: 0.44,
    h: 0.16,
    rectRadius: 0.06,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { type: 'none' },
  });
  // Laptop screen
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.24,
    y: y + 0.28,
    w: 0.4,
    h: 0.22,
    rectRadius: 0.03,
    fill: { color: BRAND_TOKENS.execNavy },
    line: { color: 'FFFFFF', width: 0.75 },
  });
  slide.addText('</>', {
    x: x + 0.24,
    y: y + 0.29,
    w: 0.4,
    h: 0.2,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 6.5,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    valign: 'middle',
  });
}

function drawVectorApiWindowIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  x: number,
  y: number
) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.14,
    y: y + 0.06,
    w: 0.6,
    h: 0.44,
    rectRadius: 0.04,
    fill: { color: 'FFFFFF' },
    line: { color: BRAND_TOKENS.execSlate, width: 1.5 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.16,
    y: y + 0.08,
    w: 0.56,
    h: 0.12,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { type: 'none' },
  });
  slide.addText('REST / gRPC', {
    x: x + 0.16,
    y: y + 0.22,
    w: 0.56,
    h: 0.24,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 5.8,
    bold: true,
    color: BRAND_TOKENS.execNavy,
    align: 'center',
    valign: 'middle',
  });
}

function drawVectorShieldIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cx: number,
  cy: number,
  size = 0.28,
  primaryHex: string = BRAND_TOKENS.execNavy,
  secondaryHex: string = BRAND_TOKENS.execSlate
) {
  // Outer shield body
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - size / 2,
    y: cy - size / 2,
    w: size,
    h: size * 1.08,
    rectRadius: 0.06,
    fill: { color: primaryHex },
    line: { color: primaryHex, width: 1 },
  });
  // Inner two-tone right half
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx,
    y: cy - size * 0.36,
    w: size * 0.36,
    h: size * 0.8,
    rectRadius: 0.03,
    fill: { color: secondaryHex },
    line: { type: 'none' },
  });
  // Left bright half
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - size * 0.36,
    y: cy - size * 0.36,
    w: size * 0.36,
    h: size * 0.8,
    rectRadius: 0.03,
    fill: { color: 'FFFFFF' },
    line: { type: 'none' },
  });
}

function drawVectorServerGearIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cx: number,
  cy: number
) {
  // Two stacked server blades
  [0, 1].forEach((i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx - 0.18,
      y: cy - 0.14 + i * 0.12,
      w: 0.32,
      h: 0.09,
      rectRadius: 0.02,
      fill: { color: BRAND_TOKENS.execSlate },
      line: { type: 'none' },
    });
  });
  // Circular gear badge on bottom-right
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx + 0.02,
    y: cy - 0.02,
    w: 0.18,
    h: 0.18,
    fill: { color: BRAND_TOKENS.execTeal },
    line: { color: 'FFFFFF', width: 0.75 },
  });
}

function drawVectorLockKeyIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cx: number,
  cy: number
) {
  // Lock shackle
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - 0.12,
    y: cy - 0.15,
    w: 0.16,
    h: 0.14,
    rectRadius: 0.04,
    fill: { color: 'FFFFFF' },
    line: { color: BRAND_TOKENS.execSlate, width: 1.5 },
  });
  // Lock body
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - 0.15,
    y: cy - 0.04,
    w: 0.22,
    h: 0.18,
    rectRadius: 0.03,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { type: 'none' },
  });
  // Key head
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx + 0.08,
    y: cy - 0.02,
    w: 0.12,
    h: 0.12,
    fill: { color: BRAND_TOKENS.execTeal },
    line: { type: 'none' },
  });
}

function drawVectorExchangeHandshakeIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cx: number,
  cy: number,
  colorHex = BRAND_TOKENS.execTeal
) {
  // Left interlocking clasp card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - 0.24,
    y: cy - 0.16,
    w: 0.28,
    h: 0.18,
    rectRadius: 0.04,
    fill: { color: colorHex },
    line: { color: 'FFFFFF', width: 0.75 },
  });
  // Right interlocking clasp card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - 0.04,
    y: cy - 0.08,
    w: 0.28,
    h: 0.18,
    rectRadius: 0.04,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { color: 'FFFFFF', width: 0.75 },
  });
  // Bidirectional horizontal sync arrow underneath
  slide.addShape(pptx.ShapeType.line, {
    x: cx - 0.22,
    y: cy + 0.18,
    w: 0.44,
    h: 0,
    line: {
      color: colorHex,
      width: 1.5,
      beginArrowType: 'triangle',
      endArrowType: 'triangle',
    },
  });
}

function drawVectorCodeWindowIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cx: number,
  cy: number,
  colorHex = BRAND_TOKENS.execSlate
) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: cx - 0.24,
    y: cy - 0.18,
    w: 0.48,
    h: 0.36,
    rectRadius: 0.04,
    fill: { color: colorHex },
    line: { type: 'none' },
  });
  // Top window dots
  [0, 1, 2].forEach((i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx - 0.19 + i * 0.06,
      y: cy - 0.14,
      w: 0.035,
      h: 0.035,
      fill: { color: 'FFFFFF' },
      line: { type: 'none' },
    });
  });
  slide.addText('</>', {
    x: cx - 0.22,
    y: cy - 0.06,
    w: 0.44,
    h: 0.22,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 9.5,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    valign: 'middle',
  });
}

// ============================================================================
// 1. `three-zone-architecture`: 3-Column System Boundary & Interconnect Topology
// ============================================================================
export interface ThreeZoneArchitectureConfig {
  title: string;
  subtitle: string;
  leftZoneTitle: string;
  leftZoneSubtitle: string;
  leftClients: { label: string; badgeText: string }[];
  ingressLabel: string;
  centerZoneTitle: string;
  centerZoneSubtitle: string;
  centerServiceBanner: string;
  centerStages: { title: string; subtitle?: string }[];
  interconnectTopLabel: string;
  interconnectBottomLabel: string;
  rightZoneTitle: string;
  rightZoneSubtitle: string;
  rightSovereignCards: { title: string; subtitle: string; badge: string }[];
}

export function renderThreeZoneArchitectureSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: ThreeZoneArchitectureConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  // --- ZONE 1 (LEFT): Client & Ingress Plane (#F8F9FA fill, #0D807B border) ---
  const z1X = 0.45;
  const zY = 0.96;
  const z1W = 2.72;
  const zH = 4.14;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: z1X,
    y: zY,
    w: z1W,
    h: zH,
    rectRadius: 0.06,
    fill: { color: BRAND_TOKENS.cardBg },
    line: { color: BRAND_TOKENS.execTeal, width: 1.25 },
  });
  slide.addText(`${cfg.leftZoneTitle}\n${cfg.leftZoneSubtitle}`, {
    x: z1X + 0.1,
    y: zY + 0.08,
    w: z1W - 0.2,
    h: 0.42,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 8.5,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  cfg.leftClients.slice(0, 3).forEach((client, idx) => {
    const cy = zY + 0.64 + idx * 1.12;
    const iconX = z1X + 0.36;
    if (idx === 0) {
      drawVectorMonitorIcon(pptx, slide, iconX, cy, client.badgeText.replace(/[^A-Za-z0-9 ]/g, '').trim() || 'Gemini');
    } else if (idx === 1) {
      drawVectorDeveloperLaptopIcon(pptx, slide, iconX, cy);
    } else {
      drawVectorApiWindowIcon(pptx, slide, iconX, cy);
    }

    slide.addText(client.label, {
      x: z1X + 0.12,
      y: cy + 0.56,
      w: 1.38,
      h: 0.36,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 7.6,
      bold: true,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
    });

    // Horizontal stub from client to fan-in collector trunk (x = z1X + 1.88)
    slide.addShape(pptx.ShapeType.line, {
      x: z1X + 1.32,
      y: cy + 0.28,
      w: 0.56,
      h: 0,
      line: { color: BRAND_TOKENS.execSlate, width: 1 },
    });
  });

  // Vertical fan-in trunk inside Zone 1
  const z1TrunkX = z1X + 1.88;
  slide.addShape(pptx.ShapeType.line, {
    x: z1TrunkX,
    y: zY + 0.92,
    w: 0,
    h: 2.24,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });

  // --- ZONE 2 (CENTER): Cloud Run / Gateway Control Plane ---
  const z2X = 3.22;
  const z2W = 2.68;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: z2X,
    y: zY,
    w: z2W,
    h: zH,
    rectRadius: 0.06,
    fill: { color: BRAND_TOKENS.cardBg },
    line: { color: BRAND_TOKENS.execTeal, width: 1.25 },
  });
  slide.addText(`${cfg.centerZoneTitle}\n${cfg.centerZoneSubtitle}`, {
    x: z2X + 0.1,
    y: zY + 0.08,
    w: z2W - 0.2,
    h: 0.42,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 8.5,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // Inner subtle gray runtime container
  slide.addShape(pptx.ShapeType.roundRect, {
    x: z2X + 0.14,
    y: zY + 0.56,
    w: z2W - 0.28,
    h: 3.42,
    rectRadius: 0.05,
    fill: { color: 'ECEFF1' },
    line: { color: BRAND_TOKENS.cardBorder, width: 0.75 },
  });

  // Cloud Run chevron vector icon + title
  slide.addText(`⟫  ${cfg.centerServiceBanner}`, {
    x: z2X + 0.22,
    y: zY + 0.62,
    w: z2W - 0.44,
    h: 0.24,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 8.5,
    bold: true,
    color: GOOGLE_QUAD_COLORS[0],
    align: 'center',
  });

  // Horizontal ingress bridge from Zone 1 trunk into Zone 2 left distribution bus
  const z2LeftBusX = z2X + 0.42;
  const z2RightBusX = z2X + z2W - 0.32;
  const midStageY = zY + 0.94 + 1 * 0.98 + 0.38;

  slide.addShape(pptx.ShapeType.line, {
    x: z1TrunkX,
    y: midStageY,
    w: z2LeftBusX - z1TrunkX,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1.15 },
  });
  slide.addText(cfg.ingressLabel, {
    x: z1TrunkX + 0.04,
    y: midStageY - 0.42,
    w: 0.78,
    h: 0.38,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.6,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // Left vertical distribution bus & Right vertical collector bus inside Zone 2 (matching Reference Page 1)
  const topStageCenterY = zY + 0.94 + 0.38;
  const botStageCenterY = zY + 0.94 + 2 * 0.98 + 0.38;
  slide.addShape(pptx.ShapeType.line, {
    x: z2LeftBusX,
    y: topStageCenterY,
    w: 0,
    h: botStageCenterY - topStageCenterY,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: z2RightBusX,
    y: topStageCenterY,
    w: 0,
    h: botStageCenterY - topStageCenterY,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });

  // 3 Stacked White Processing Cards inside Zone 2 with Native Vector Icons
  const stageCardX = z2X + 0.56;
  const stageCardW = 1.62;
  cfg.centerStages.slice(0, 3).forEach((st, idx) => {
    const sy = zY + 0.94 + idx * 0.98;
    const centerY = sy + 0.38;

    // Left fan-in arrow from z2LeftBusX into stage card
    slide.addShape(pptx.ShapeType.line, {
      x: z2LeftBusX,
      y: centerY,
      w: stageCardX - z2LeftBusX,
      h: 0,
      line: { color: BRAND_TOKENS.execSlate, width: 0.9, endArrowType: 'triangle' },
    });
    // Right fan-out stub from stage card to z2RightBusX
    slide.addShape(pptx.ShapeType.line, {
      x: stageCardX + stageCardW,
      y: centerY,
      w: z2RightBusX - (stageCardX + stageCardW),
      h: 0,
      line: { color: BRAND_TOKENS.execSlate, width: 0.9 },
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: stageCardX,
      y: sy,
      w: stageCardW,
      h: 0.78,
      rectRadius: 0.05,
      fill: { color: 'FFFFFF' },
      line: { color: BRAND_TOKENS.cardBorder, width: 1 },
    });

    const iconCx = stageCardX + stageCardW / 2;
    const iconCy = sy + 0.2;
    if (idx === 0) {
      drawVectorShieldIcon(pptx, slide, iconCx, iconCy, 0.22, BRAND_TOKENS.execSlate, BRAND_TOKENS.execTeal);
    } else if (idx === 1) {
      drawVectorServerGearIcon(pptx, slide, iconCx, iconCy);
    } else {
      drawVectorLockKeyIcon(pptx, slide, iconCx, iconCy);
    }

    slide.addText(st.title, {
      x: stageCardX + 0.06,
      y: sy + 0.36,
      w: stageCardW - 0.12,
      h: 0.38,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 7.5,
      bold: true,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
      valign: 'middle',
    });

    if (idx < 2) {
      slide.addShape(pptx.ShapeType.line, {
        x: iconCx,
        y: sy + 0.78,
        w: 0,
        h: 0.2,
        line: { color: BRAND_TOKENS.execNavy, width: 1, endArrowType: 'triangle' },
      });
    }
  });

  // --- ZONE 3 (RIGHT): Sovereign / Enterprise VPC with Deep Navy Inner Core ---
  const z3X = 6.78;
  const z3W = 2.77;

  // Interconnect Arrow from Zone 2 Right Collector Bus to Zone 3
  slide.addShape(pptx.ShapeType.line, {
    x: z2RightBusX,
    y: midStageY,
    w: z3X + 0.14 - z2RightBusX,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.25, endArrowType: 'triangle' },
  });
  slide.addText(cfg.interconnectTopLabel, {
    x: z2X + z2W + 0.02,
    y: midStageY - 0.52,
    w: 0.84,
    h: 0.46,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.6,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  slide.addText(cfg.interconnectBottomLabel, {
    x: z2X + z2W + 0.02,
    y: midStageY + 0.06,
    w: 0.84,
    h: 0.46,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.4,
    color: BRAND_TOKENS.bodyGray,
    align: 'center',
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: z3X,
    y: zY,
    w: z3W,
    h: zH,
    rectRadius: 0.06,
    fill: { color: BRAND_TOKENS.cardBg },
    line: { color: BRAND_TOKENS.execTeal, width: 1.25 },
  });
  slide.addText(`${cfg.rightZoneTitle}\n${cfg.rightZoneSubtitle}`, {
    x: z3X + 0.1,
    y: zY + 0.08,
    w: z3W - 0.2,
    h: 0.42,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 8.5,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // High-contrast Deep Navy Sovereign Core (#0F294A)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: z3X + 0.14,
    y: zY + 0.56,
    w: z3W - 0.28,
    h: 3.42,
    rectRadius: 0.06,
    fill: { color: BRAND_TOKENS.execNavy },
    line: { type: 'none' },
  });

  cfg.rightSovereignCards.slice(0, 3).forEach((sc, idx) => {
    const ry = zY + 0.72 + idx * 1.04;
    const cardX = z3X + 0.28;
    const cardW = z3W - 0.56;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cardX,
      y: ry,
      w: cardW,
      h: 0.84,
      rectRadius: 0.05,
      fill: { color: 'FFFFFF' },
      line: { color: BRAND_TOKENS.cardBorder, width: 0.75 },
    });

    // Single-line wide badge pill + vector mini-icon
    const badgeW = 0.92;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cardX + (cardW - badgeW) / 2,
      y: ry + 0.06,
      w: badgeW,
      h: 0.2,
      rectRadius: 0.04,
      fill: { color: BRAND_TOKENS.execTeal },
      line: { type: 'none' },
    });
    slide.addText(sc.badge, {
      x: cardX + (cardW - badgeW) / 2,
      y: ry + 0.06,
      w: badgeW,
      h: 0.2,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 6.2,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });

    slide.addText(sc.title, {
      x: cardX + 0.06,
      y: ry + 0.27,
      w: cardW - 0.12,
      h: 0.24,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 8.0,
      bold: true,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
    });
    slide.addText(sc.subtitle, {
      x: cardX + 0.06,
      y: ry + 0.53,
      w: cardW - 0.12,
      h: 0.24,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 6.6,
      color: BRAND_TOKENS.bodyGray,
      align: 'center',
    });

    if (idx === 0) {
      // Single downward arrow from Card 1 (SDK) to Card 2 (Agents)
      slide.addShape(pptx.ShapeType.line, {
        x: z3X + z3W / 2,
        y: ry + 0.84,
        w: 0,
        h: 0.2,
        line: {
          color: 'FFFFFF',
          width: 1.1,
          endArrowType: 'triangle',
        },
      });
    } else if (idx === 1) {
      // 3 Parallel Bidirectional Arrows (↕  ↕  ↕) between Card 2 (Agents) and Card 3 (Database) matching Reference Page 1
      [-0.42, 0, 0.42].forEach((dx) => {
        slide.addShape(pptx.ShapeType.line, {
          x: z3X + z3W / 2 + dx,
          y: ry + 0.84,
          w: 0,
          h: 0.2,
          line: {
            color: 'FFFFFF',
            width: 1.0,
            beginArrowType: 'triangle',
            endArrowType: 'triangle',
          },
        });
      });
    }
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}

// ============================================================================
// 2. `payload-transformation`: 3-Stage Before -> Engine -> After Payload Pipeline
// ============================================================================
export interface PayloadTransformationConfig {
  title: string;
  subtitle: string;
  leftTitle: string;
  leftPills: { label: string; fillHex: string; textHex: string; contextLine: string }[];
  centerTitle: string;
  centerStages: string[];
  rightTitle: string;
  rightJsonLines: string[];
}

export function renderPayloadTransformationSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: PayloadTransformationConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  const cardY = 1.12;
  const cardH = 3.86;
  const cardW = 2.68;

  // --- LEFT CARD: Incoming Contaminated / Unscoped Request (Coral/Red border) ---
  const leftX = 0.5;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: leftX,
    y: cardY,
    w: cardW,
    h: cardH,
    rectRadius: 0.08,
    fill: { color: BRAND_TOKENS.cardBg },
    line: { color: BRAND_TOKENS.coralBorder, width: 1.5 },
  });
  slide.addText(cfg.leftTitle, {
    x: leftX + 0.14,
    y: cardY + 0.16,
    w: cardW - 0.28,
    h: 0.5,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 12,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: leftX + 0.22,
    y: cardY + 0.74,
    w: cardW - 0.44,
    h: 0,
    line: { color: BRAND_TOKENS.coralBorder, width: 1.25 },
  });

  slide.addText('{', {
    x: leftX + 0.22,
    y: cardY + 0.84,
    w: 0.5,
    h: 0.2,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 9,
    bold: true,
    color: BRAND_TOKENS.titleDark,
  });

  cfg.leftPills.slice(0, 3).forEach((pill, idx) => {
    const py = cardY + 1.08 + idx * 0.78;
    slide.addText(pill.contextLine, {
      x: leftX + 0.28,
      y: py,
      w: cardW - 0.44,
      h: 0.2,
      fontFace: BRAND_TOKENS.fontMono,
      fontSize: 7.8,
      bold: true,
      color: BRAND_TOKENS.titleDark,
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: leftX + 0.32,
      y: py + 0.22,
      w: cardW - 0.76,
      h: 0.3,
      rectRadius: 0.04,
      fill: { color: pill.fillHex },
      line: { type: 'none' },
    });
    slide.addText(pill.label, {
      x: leftX + 0.34,
      y: py + 0.22,
      w: cardW - 0.8,
      h: 0.3,
      fontFace: BRAND_TOKENS.fontMono,
      fontSize: 7.5,
      bold: true,
      color: pill.textHex,
      align: 'center',
      valign: 'middle',
    });
    slide.addText('  ],', {
      x: leftX + 0.28,
      y: py + 0.54,
      w: 0.6,
      h: 0.18,
      fontFace: BRAND_TOKENS.fontMono,
      fontSize: 7.8,
      bold: true,
      color: BRAND_TOKENS.titleDark,
    });
  });

  slide.addText('}', {
    x: leftX + 0.22,
    y: cardY + 3.48,
    w: 0.5,
    h: 0.2,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 9,
    bold: true,
    color: BRAND_TOKENS.titleDark,
  });

  // Arrow 1: Left -> Center
  slide.addShape(pptx.ShapeType.line, {
    x: leftX + cardW + 0.06,
    y: cardY + cardH / 2,
    w: 0.36,
    h: 0,
    line: { color: BRAND_TOKENS.coralBorder, width: 2.0, endArrowType: 'triangle' },
  });

  // --- CENTER CARD: Normalization & Policy Engine (Deep Teal #1B5E7B, Single Clean Inner Glass Box) ---
  const midX = 3.66;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: midX,
    y: cardY,
    w: cardW,
    h: cardH,
    rectRadius: 0.08,
    fill: { color: '1B5E7B' },
    line: { color: '0F4C64', width: 1.25 },
  });
  slide.addText(cfg.centerTitle, {
    x: midX + 0.14,
    y: cardY + 0.18,
    w: cardW - 0.28,
    h: 0.54,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 12.5,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
  });

  // Single Inner Translucent Chamber Box (matching Reference Page 2 1:1)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: midX + 0.22,
    y: cardY + 0.88,
    w: cardW - 0.44,
    h: 2.7,
    rectRadius: 0.06,
    fill: { color: '3B7A94' },
    line: { color: '5C97B2', width: 0.75 },
  });

  cfg.centerStages.slice(0, 3).forEach((stageName, idx) => {
    const sy = cardY + 1.12 + idx * 0.78;
    slide.addText(stageName, {
      x: midX + 0.3,
      y: sy,
      w: cardW - 0.6,
      h: 0.46,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 11.5,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
    if (idx < 2) {
      slide.addShape(pptx.ShapeType.line, {
        x: midX + 0.48,
        y: sy + 0.62,
        w: cardW - 0.96,
        h: 0,
        line: { color: '5C97B2', width: 0.75 },
      });
    }
  });

  // Arrow 2: Center -> Right
  slide.addShape(pptx.ShapeType.line, {
    x: midX + cardW + 0.06,
    y: cardY + cardH / 2,
    w: 0.36,
    h: 0,
    line: { color: '1B5E7B', width: 2.0, endArrowType: 'triangle' },
  });

  // --- RIGHT CARD: Clean Compliant Payload (Green border #34A853 / #0D807B) ---
  const rightX = 6.82;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: rightX,
    y: cardY,
    w: cardW,
    h: cardH,
    rectRadius: 0.08,
    fill: { color: BRAND_TOKENS.cardBg },
    line: { color: GOOGLE_QUAD_COLORS[3], width: 1.5 },
  });
  slide.addText(cfg.rightTitle, {
    x: rightX + 0.14,
    y: cardY + 0.16,
    w: cardW - 0.28,
    h: 0.5,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 12,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: rightX + 0.22,
    y: cardY + 0.74,
    w: cardW - 0.44,
    h: 0,
    line: { color: GOOGLE_QUAD_COLORS[3], width: 1.25 },
  });

  slide.addText(cfg.rightJsonLines.join('\n'), {
    x: rightX + 0.2,
    y: cardY + 0.88,
    w: cardW - 0.34,
    h: 2.82,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 8.2,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    valign: 'top',
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}

// ============================================================================
// 3. `swimlane-sequence`: 5-Actor Horizontal Lifeline & Numbered Step Sequence
// ============================================================================
export interface SwimlaneSequenceConfig {
  title: string;
  subtitle: string;
  actors: { name: string; iconLabel: string; colorHex: string }[];
  step1Label: string;
  step1Arrow: string;
  step2Label: string;
  step2Arrow: string;
  step2Return: string;
  step3Label: string;
  step3Arrow: string;
  step4Label: string;
  dormantBandTitle: string;
  dormantWindowLabel: string;
  step5Label: string;
  step5Arrow: string;
  step6Label: string;
  step6VerifyLoop: string;
  step6AuditWrite: string;
  auditDbLabel: string;
}

function drawSequenceActorVectorIcon(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  ax: number,
  idx: number,
  colorHex: string
) {
  const topY = 0.88;
  if (idx === 0) {
    // Person silhouette icon
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ax - 0.07,
      y: topY,
      w: 0.14,
      h: 0.14,
      fill: { color: colorHex },
      line: { type: 'none' },
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: ax - 0.14,
      y: topY + 0.16,
      w: 0.28,
      h: 0.12,
      rectRadius: 0.05,
      fill: { color: colorHex },
      line: { type: 'none' },
    });
  } else if (idx === 1) {
    // AI Brain / Node Cluster icon
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ax - 0.15,
      y: topY,
      w: 0.3,
      h: 0.28,
      fill: { color: colorHex },
      line: { type: 'none' },
    });
    slide.addText('AI', {
      x: ax - 0.15,
      y: topY,
      w: 0.3,
      h: 0.28,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 7.5,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
  } else if (idx === 2) {
    // API Gateway hub-and-spoke vector icon
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ax - 0.08,
      y: topY + 0.06,
      w: 0.16,
      h: 0.16,
      fill: { color: colorHex },
      line: { type: 'none' },
    });
    [-0.14, 0.14].forEach((dx) => {
      [-0.08, 0.08].forEach((dy) => {
        slide.addShape(pptx.ShapeType.ellipse, {
          x: ax + dx - 0.035,
          y: topY + 0.14 + dy - 0.035,
          w: 0.07,
          h: 0.07,
          fill: { color: colorHex },
          line: { type: 'none' },
        });
      });
    });
  } else if (idx === 3) {
    // Portal UI browser card icon
    slide.addShape(pptx.ShapeType.roundRect, {
      x: ax - 0.16,
      y: topY + 0.02,
      w: 0.32,
      h: 0.24,
      rectRadius: 0.03,
      fill: { color: colorHex },
      line: { type: 'none' },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: ax - 0.12,
      y: topY + 0.08,
      w: 0.24,
      h: 0.14,
      fill: { color: 'FFFFFF' },
      line: { type: 'none' },
    });
  } else {
    // Cloud Run double chevron badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: ax - 0.18,
      y: topY + 0.02,
      w: 0.36,
      h: 0.24,
      rectRadius: 0.04,
      fill: { color: colorHex },
      line: { type: 'none' },
    });
    slide.addText('⟫', {
      x: ax - 0.18,
      y: topY + 0.01,
      w: 0.36,
      h: 0.24,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 11,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
  }
}

export function renderSwimlaneSequenceSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: SwimlaneSequenceConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  const actorXs = [0.82, 2.52, 4.28, 6.02, 7.98];
  const baselineY = 1.46;
  const bottomY = 5.08;

  // Horizontal top lifeline bar connecting all 5 actors
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[0],
    y: baselineY,
    w: actorXs[4] - actorXs[0] + 1.15,
    h: 0,
    line: { color: BRAND_TOKENS.cardBorder, width: 1.25, endArrowType: 'triangle' },
  });

  // Render 5 actors, top vector icons, anchor dots, and vertical lifelines
  cfg.actors.slice(0, 5).forEach((act, idx) => {
    const ax = actorXs[idx];
    drawSequenceActorVectorIcon(pptx, slide, ax, idx, act.colorHex);

    slide.addText(act.name, {
      x: Math.max(0.32, ax - 0.72),
      y: 1.15,
      w: idx === 0 ? 1.0 : 1.44,
      h: 0.2,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 7.4,
      bold: true,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
    });

    // Vertical lifeline
    slide.addShape(pptx.ShapeType.line, {
      x: ax,
      y: baselineY,
      w: 0,
      h: bottomY - baselineY,
      line: { color: BRAND_TOKENS.cardBorder, width: 1 },
    });

    // Circular anchor node on baseline
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ax - 0.08,
      y: baselineY - 0.08,
      w: 0.16,
      h: 0.16,
      fill: { color: act.colorHex },
      line: { type: 'none' },
    });
  });

  // Activation bars on lifelines
  const bars = [
    { x: actorXs[0], y: 2.08, h: 1.85, color: BRAND_TOKENS.execNavy },
    { x: actorXs[1], y: 2.18, h: 2.45, color: BRAND_TOKENS.execTeal },
    { x: actorXs[2], y: 2.4, h: 1.15, color: BRAND_TOKENS.execSlate },
    { x: actorXs[3], y: 2.82, h: 2.08, color: BRAND_TOKENS.execTeal },
    { x: actorXs[4], y: 2.92, h: 0.85, color: '9AA0A6' },
    { x: actorXs[4], y: 4.0, h: 0.94, color: BRAND_TOKENS.execSlate },
  ];
  bars.forEach((b) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: b.x - 0.06,
      y: b.y,
      w: 0.12,
      h: b.h,
      rectRadius: 0.03,
      fill: { color: b.color },
      line: { type: 'none' },
    });
  });

  const addStepCallout = (num: string, x: number, y: number, w: number, text: string) => {
    slide.addText(num, {
      x,
      y,
      w: 0.3,
      h: 0.38,
      fontFace: BRAND_TOKENS.fontDisplay,
      fontSize: 18,
      bold: true,
      color: BRAND_TOKENS.execSlate,
    });
    slide.addText(text, {
      x: x + 0.28,
      y: y + 0.02,
      w: w - 0.28,
      h: 0.44,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 7.2,
      bold: true,
      color: BRAND_TOKENS.titleDark,
    });
  };

  // Step 1
  addStepCallout('1', actorXs[0] + 0.08, 1.58, 1.55, cfg.step1Label);
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[0] + 0.06,
    y: 2.26,
    w: actorXs[1] - actorXs[0] - 0.12,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.1, endArrowType: 'triangle' },
  });
  slide.addText(cfg.step1Arrow, {
    x: actorXs[0] + 0.14,
    y: 2.06,
    w: 1.4,
    h: 0.18,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.8,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // Step 2 + Self-Loop Bracket on Actor 3 (matching Reference Page 3)
  addStepCallout('2', actorXs[1] + 0.08, 1.58, 1.66, cfg.step2Label);
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[1] + 0.06,
    y: 2.5,
    w: actorXs[2] - actorXs[1] - 0.12,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.1, endArrowType: 'triangle' },
  });
  slide.addText(cfg.step2Arrow, {
    x: actorXs[1] + 0.14,
    y: 2.31,
    w: 1.48,
    h: 0.18,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.8,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  // Left self-loop bracket on Actor 3 activation bar
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[2] - 0.24,
    y: 2.94,
    w: 0.18,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[2] - 0.24,
    y: 2.94,
    w: 0,
    h: 0.22,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[2] - 0.24,
    y: 3.16,
    w: 0.18,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1, endArrowType: 'triangle' },
  });
  slide.addText(cfg.step2Return, {
    x: actorXs[1] + 0.16,
    y: 2.86,
    w: 1.28,
    h: 0.34,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.4,
    color: BRAND_TOKENS.titleDark,
    align: 'right',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[1] + 0.06,
    y: 3.34,
    w: actorXs[2] - actorXs[1] - 0.12,
    h: 0,
    line: { color: BRAND_TOKENS.execTeal, width: 1.1, beginArrowType: 'triangle' },
  });

  // Step 3 + Checklist Card Mini-Icon
  addStepCallout('3', actorXs[2] + 0.08, 1.58, 1.55, cfg.step3Label);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: (actorXs[2] + actorXs[3]) / 2 - 0.22,
    y: 2.48,
    w: 0.44,
    h: 0.2,
    rectRadius: 0.03,
    fill: { color: 'FFFFFF' },
    line: { color: BRAND_TOKENS.execTeal, width: 1 },
  });
  slide.addText('A / B', {
    x: (actorXs[2] + actorXs[3]) / 2 - 0.22,
    y: 2.48,
    w: 0.44,
    h: 0.2,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 5.5,
    bold: true,
    color: BRAND_TOKENS.execTeal,
    align: 'center',
    valign: 'middle',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[2] + 0.06,
    y: 2.94,
    w: actorXs[3] - actorXs[2] - 0.12,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.1, endArrowType: 'triangle' },
  });
  slide.addText(cfg.step3Arrow, {
    x: actorXs[2] + 0.14,
    y: 2.71,
    w: 1.44,
    h: 0.22,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.6,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // Step 4 & Scale-to-Zero Dormant Band + Native Vector Clock Icon + Single-Line Native Bracket
  addStepCallout('4', actorXs[3] + 0.08, 1.58, 1.82, cfg.step4Label);
  const bandX = actorXs[3] + 0.06;
  const bandW = actorXs[4] - actorXs[3] - 0.12;
  // Vector clock icon centered above band
  slide.addShape(pptx.ShapeType.ellipse, {
    x: bandX + bandW / 2 - 0.11,
    y: 2.8,
    w: 0.22,
    h: 0.22,
    fill: { color: 'FFFFFF' },
    line: { color: BRAND_TOKENS.execNavy, width: 1.25 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: bandX + bandW / 2,
    y: 2.85,
    w: 0,
    h: 0.07,
    line: { color: BRAND_TOKENS.execNavy, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: bandX + bandW / 2,
    y: 2.92,
    w: 0.06,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1 },
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: bandX,
    y: 3.06,
    w: bandW,
    h: 0.54,
    fill: { color: 'D5D9DC' },
    line: { color: '9AA0A6', width: 0.75 },
  });
  slide.addText(cfg.dormantBandTitle, {
    x: bandX + 0.08,
    y: 3.12,
    w: bandW - 0.16,
    h: 0.42,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 7.2,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
    valign: 'middle',
  });

  // Native vector bracket under dormant band (single-line, zero ASCII wrap)
  const brkY = 3.74;
  slide.addShape(pptx.ShapeType.line, {
    x: bandX + 0.04,
    y: brkY - 0.07,
    w: 0,
    h: 0.07,
    line: { color: BRAND_TOKENS.bodyGray, width: 0.85 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: bandX + 0.04,
    y: brkY,
    w: bandW - 0.08,
    h: 0,
    line: { color: BRAND_TOKENS.bodyGray, width: 0.85 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: bandX + bandW - 0.04,
    y: brkY - 0.07,
    w: 0,
    h: 0.07,
    line: { color: BRAND_TOKENS.bodyGray, width: 0.85 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: bandX + 0.28,
    y: brkY - 0.09,
    w: bandW - 0.56,
    h: 0.18,
    fill: { color: 'FFFFFF' },
    line: { type: 'none' },
  });
  slide.addText(cfg.dormantWindowLabel, {
    x: bandX + 0.18,
    y: brkY - 0.09,
    w: bandW - 0.36,
    h: 0.18,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.2,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
    valign: 'middle',
  });

  // Step 5 (Approver Avatar + Click Pill + Signed State Token Arrow)
  addStepCallout('5', actorXs[2] + 0.08, 4.44, 1.82, cfg.step5Label);
  // Approver person vector icon
  slide.addShape(pptx.ShapeType.ellipse, {
    x: actorXs[2] + 0.54,
    y: 4.1,
    w: 0.12,
    h: 0.12,
    fill: { color: BRAND_TOKENS.execTeal },
    line: { type: 'none' },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: actorXs[2] + 0.48,
    y: 4.23,
    w: 0.24,
    h: 0.12,
    rectRadius: 0.04,
    fill: { color: BRAND_TOKENS.execTeal },
    line: { type: 'none' },
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: actorXs[3] - 0.68,
    y: 4.12,
    w: 0.56,
    h: 0.22,
    rectRadius: 0.04,
    fill: { color: BRAND_TOKENS.execSlate },
    line: { type: 'none' },
  });
  slide.addText('Approve', {
    x: actorXs[3] - 0.68,
    y: 4.12,
    w: 0.56,
    h: 0.22,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 6.5,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    valign: 'middle',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: actorXs[3] + 0.06,
    y: 4.36,
    w: actorXs[4] - actorXs[3] - 0.12,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.1, endArrowType: 'triangle' },
  });
  slide.addText(cfg.step5Arrow, {
    x: actorXs[3] + 0.12,
    y: 4.12,
    w: actorXs[4] - actorXs[3] - 0.24,
    h: 0.2,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.6,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // Step 6 (Wake up, Right-Side Self-Loop Arrows & Horizontal Arrow to Audit Log DB Cylinder)
  addStepCallout('6', actorXs[4] + 0.08, 1.58, 1.62, cfg.step6Label);

  // Right Self-Loop 1: Verify HMAC Token (0.084ms)
  const runBarRightX = actorXs[4] + 0.06;
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX,
    y: 4.08,
    w: 0.22,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX + 0.22,
    y: 4.08,
    w: 0,
    h: 0.2,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX,
    y: 4.28,
    w: 0.22,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1, beginArrowType: 'triangle' },
  });
  slide.addText(cfg.step6VerifyLoop, {
    x: runBarRightX + 0.26,
    y: 4.02,
    w: 1.25,
    h: 0.28,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 6.2,
    bold: true,
    color: BRAND_TOKENS.titleDark,
  });

  // Right Self-Loop 2: Write Audit Log
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX,
    y: 4.44,
    w: 0.22,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX + 0.22,
    y: 4.44,
    w: 0,
    h: 0.2,
    line: { color: BRAND_TOKENS.execSlate, width: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX,
    y: 4.64,
    w: 0.22,
    h: 0,
    line: { color: BRAND_TOKENS.execSlate, width: 1, beginArrowType: 'triangle' },
  });
  slide.addText(cfg.step6AuditWrite, {
    x: runBarRightX + 0.26,
    y: 4.38,
    w: 0.84,
    h: 0.28,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 5.8,
    color: BRAND_TOKENS.titleDark,
  });

  // Horizontal arrow from Cloud Run activation bar into Audit Log Cylinder
  slide.addShape(pptx.ShapeType.line, {
    x: runBarRightX,
    y: 4.82,
    w: 1.12,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.1, endArrowType: 'triangle' },
  });

  // Cylindrical Audit Log Database node
  slide.addShape(pptx.ShapeType.can, {
    x: 9.18,
    y: 4.54,
    w: 0.42,
    h: 0.42,
    fill: { color: BRAND_TOKENS.execNavy },
    line: { color: 'FFFFFF', width: 0.75 },
  });
  slide.addText(cfg.auditDbLabel, {
    x: 8.95,
    y: 4.98,
    w: 0.78,
    h: 0.18,
    fontFace: BRAND_TOKENS.fontTitle,
    fontSize: 6.4,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}

// ============================================================================
// 4. `roadmap-timeline`: 3-Phase Connected Horizon Roadmap Cards
// ============================================================================
export interface RoadmapTimelinePhase {
  phaseBanner: string;
  headerColorHex: string;
  primaryTitle: string;
  horizonSubtitle: string;
  outcomeLine1: string;
  outcomeLine2: string;
}

export interface RoadmapTimelineConfig {
  title: string;
  subtitle: string;
  phases: [RoadmapTimelinePhase, RoadmapTimelinePhase, RoadmapTimelinePhase];
}

export function renderRoadmapTimelineSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: RoadmapTimelineConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  const cardW = 2.76;
  const cardH = 3.68;
  const cardY = 1.24;
  const xs = [0.5, 3.62, 6.74];

  cfg.phases.forEach((ph, idx) => {
    const cx = xs[idx];
    // Base light gray rounded card (#F8F9FA)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx,
      y: cardY,
      w: cardW,
      h: cardH,
      rectRadius: 0.08,
      fill: { color: BRAND_TOKENS.cardBg },
      line: { color: BRAND_TOKENS.cardBorder, width: 1 },
    });

    // Top colored banner header
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx,
      y: cardY,
      w: cardW,
      h: 0.72,
      rectRadius: 0.08,
      fill: { color: ph.headerColorHex },
      line: { type: 'none' },
    });
    slide.addText(ph.phaseBanner, {
      x: cx + 0.12,
      y: cardY + 0.16,
      w: cardW - 0.24,
      h: 0.4,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 13.5,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
    });

    // Primary bold title
    slide.addText(ph.primaryTitle, {
      x: cx + 0.14,
      y: cardY + 0.96,
      w: cardW - 0.28,
      h: 0.78,
      fontFace: BRAND_TOKENS.fontDisplay,
      fontSize: 18,
      bold: true,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
    });

    // Horizon subtitle (e.g., (Months 1-3)) placed directly below primaryTitle (matching Reference Page 4)
    slide.addText(ph.horizonSubtitle, {
      x: cx + 0.14,
      y: cardY + 1.74,
      w: cardW - 0.28,
      h: 0.34,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 13.5,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
    });

    // Short horizontal accent divider line
    slide.addShape(pptx.ShapeType.line, {
      x: cx + 0.98,
      y: cardY + 2.28,
      w: 0.8,
      h: 0,
      line: { color: ph.headerColorHex, width: 2.25 },
    });

    // 2-Line Outcome Summary
    slide.addText(`${ph.outcomeLine1}\n${ph.outcomeLine2}`, {
      x: cx + 0.12,
      y: cardY + 2.52,
      w: cardW - 0.24,
      h: 0.82,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 11.5,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
    });

    // Bottom colored accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: cx + 0.04,
      y: cardY + cardH - 0.08,
      w: cardW - 0.08,
      h: 0.08,
      fill: { color: ph.headerColorHex },
      line: { type: 'none' },
    });

    // 5 Timeline Connector Dots matching Reference Page 4 (left of Phase 1, pair between 1&2, pair between 2&3)
    if (idx === 0) {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: cx - 0.09,
        y: cardY + 1.82,
        w: 0.18,
        h: 0.18,
        fill: { color: ph.headerColorHex },
        line: { type: 'none' },
      });
    }
    if (idx < 2) {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: cx + cardW - 0.09,
        y: cardY + 1.82,
        w: 0.18,
        h: 0.18,
        fill: { color: ph.headerColorHex },
        line: { type: 'none' },
      });
    }
    if (idx > 0) {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: cx - 0.09,
        y: cardY + 1.82,
        w: 0.18,
        h: 0.18,
        fill: { color: ph.headerColorHex },
        line: { type: 'none' },
      });
    }
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}

// ============================================================================
// 5. `async-state-machine`: 4-Node Horizontal Async Processing & Webhook Loop
// ============================================================================
export interface AsyncStateMachineConfig {
  title: string;
  subtitle: string;
  nodes: [
    { label: string; fillHex: string },
    { label: string; fillHex: string },
    { label: string; fillHex: string },
    { label: string; fillHex: string },
  ];
  step1Text: string;
  step2Text: string;
  step3Text: string;
  step4Text: string;
  step5WebhookLoopText: string;
}

export function renderAsyncStateMachineSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: AsyncStateMachineConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  const nodeY = 2.28;
  const nodeW = 1.42;
  const nodeH = 1.06;
  const nodeXs = [0.48, 3.24, 5.74, 8.08];

  cfg.nodes.forEach((n, idx) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: nodeXs[idx],
      y: nodeY,
      w: nodeW,
      h: nodeH,
      fill: { color: n.fillHex },
      line: { type: 'none' },
    });
    slide.addText(n.label, {
      x: nodeXs[idx] + 0.06,
      y: nodeY + 0.14,
      w: nodeW - 0.12,
      h: nodeH - 0.28,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 10.5,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
  });

  // Transition 1: Node 1 -> Node 2 (Top arrow)
  const gap1W = nodeXs[1] - (nodeXs[0] + nodeW);
  slide.addText(cfg.step1Text, {
    x: nodeXs[0] + nodeW + 0.02,
    y: 1.72,
    w: gap1W - 0.04,
    h: 0.46,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: nodeXs[0] + nodeW,
    y: nodeY + 0.3,
    w: gap1W,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.25, endArrowType: 'triangle' },
  });

  // Transition 2: Node 2 -> Node 1 (Lower reverse arrow: HTTP 202 Accepted / State: WORKING)
  slide.addShape(pptx.ShapeType.line, {
    x: nodeXs[0] + nodeW,
    y: nodeY + 0.76,
    w: gap1W,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.25, beginArrowType: 'triangle' },
  });
  slide.addText(cfg.step2Text, {
    x: nodeXs[0] + nodeW + 0.02,
    y: nodeY + 0.84,
    w: gap1W - 0.04,
    h: 0.68,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.2,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  // Transition 3: Node 2 -> Node 3 (Pub/Sub Topic)
  const gap2W = nodeXs[2] - (nodeXs[1] + nodeW);
  slide.addText(cfg.step3Text, {
    x: nodeXs[1] + nodeW - 0.14,
    y: 1.48,
    w: gap2W + 0.28,
    h: 0.72,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: nodeXs[1] + nodeW,
    y: nodeY + nodeH / 2,
    w: gap2W,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.25, endArrowType: 'triangle' },
  });

  // Transition 4: Node 3 -> Node 4 (Internal Worker)
  const gap3W = nodeXs[3] - (nodeXs[2] + nodeW);
  slide.addText(cfg.step4Text, {
    x: nodeXs[2] + nodeW - 0.18,
    y: 1.48,
    w: gap3W + 0.36,
    h: 0.72,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: nodeXs[2] + nodeW,
    y: nodeY + nodeH / 2,
    w: gap3W,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.25, endArrowType: 'triangle' },
  });

  // Transition 5: Bottom Orthogonal U-Turn Loop (Node 2 bottom -> down -> left -> up to Node 1 bottom)
  const loopStartX = nodeXs[1] + nodeW / 2;
  const loopEndX = nodeXs[0] + nodeW / 2;
  const loopBottomY = 4.04;

  slide.addShape(pptx.ShapeType.line, {
    x: loopStartX,
    y: nodeY + nodeH,
    w: 0,
    h: loopBottomY - (nodeY + nodeH),
    line: { color: BRAND_TOKENS.execNavy, width: 1.25 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: loopEndX,
    y: loopBottomY,
    w: loopStartX - loopEndX,
    h: 0,
    line: { color: BRAND_TOKENS.execNavy, width: 1.25 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: loopEndX,
    y: nodeY + nodeH,
    w: 0,
    h: loopBottomY - (nodeY + nodeH),
    line: { color: BRAND_TOKENS.execNavy, width: 1.25, beginArrowType: 'triangle' },
  });

  slide.addText(cfg.step5WebhookLoopText, {
    x: loopEndX + 0.1,
    y: loopBottomY + 0.1,
    w: loopStartX - loopEndX - 0.2,
    h: 0.88,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 8.5,
    color: BRAND_TOKENS.titleDark,
    align: 'center',
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}

// ============================================================================
// 6. `operating-model-pillars`: 3-Column Executive Operating Model Cards
// ============================================================================
export interface OperatingModelPillar {
  accentColorHex: string;
  iconSymbol: string;
  title: string;
  bullets: [string, string, string];
}

export interface OperatingModelPillarsConfig {
  title: string;
  subtitle: string;
  pillars: [OperatingModelPillar, OperatingModelPillar, OperatingModelPillar];
}

export function renderOperatingModelPillarsSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: OperatingModelPillarsConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  const cardW = 2.82;
  const cardH = 3.82;
  const cardY = 1.18;
  const xs = [0.5, 3.59, 6.68];

  cfg.pillars.forEach((p, idx) => {
    const cx = xs[idx];
    // Light gray/white container card (#F8F9FA with #DADCE0 border and 8px radius)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx,
      y: cardY,
      w: cardW,
      h: cardH,
      rectRadius: 0.08,
      fill: { color: BRAND_TOKENS.cardBg },
      line: { color: BRAND_TOKENS.cardBorder, width: 1 },
    });

    // Top colored accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: cx + 0.03,
      y: cardY,
      w: cardW - 0.06,
      h: 0.1,
      fill: { color: p.accentColorHex },
      line: { type: 'none' },
    });

    // Bottom colored accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: cx + 0.03,
      y: cardY + cardH - 0.1,
      w: cardW - 0.06,
      h: 0.1,
      fill: { color: p.accentColorHex },
      line: { type: 'none' },
    });

    // Centered top 100% Native Vector Icon (0 Unicode Emojis — matching Reference Page 6 1:1)
    const iconCenterX = cx + cardW / 2;
    const iconCenterY = cardY + 0.5;
    if (idx === 0) {
      drawVectorShieldIcon(pptx, slide, iconCenterX, iconCenterY, 0.42, BRAND_TOKENS.execNavy, BRAND_TOKENS.execSlate);
    } else if (idx === 1) {
      drawVectorExchangeHandshakeIcon(pptx, slide, iconCenterX, iconCenterY, BRAND_TOKENS.execTeal);
    } else {
      drawVectorCodeWindowIcon(pptx, slide, iconCenterX, iconCenterY, BRAND_TOKENS.execSlate);
    }

    // Bold 2-3 line pillar heading
    slide.addText(p.title, {
      x: cx + 0.16,
      y: cardY + 0.9,
      w: cardW - 0.32,
      h: 0.78,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 12.5,
      bold: true,
      color: BRAND_TOKENS.titleDark,
      align: 'center',
      valign: 'top',
    });

    // 3 Grounded bullets
    p.bullets.forEach((bText, bIdx) => {
      const by = cardY + 1.82 + bIdx * 0.62;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: cx + 0.22,
        y: by + 0.08,
        w: 0.09,
        h: 0.09,
        fill: { color: p.accentColorHex },
        line: { type: 'none' },
      });
      slide.addText(bText, {
        x: cx + 0.38,
        y: by,
        w: cardW - 0.52,
        h: 0.56,
        fontFace: BRAND_TOKENS.fontBody,
        fontSize: 9.2,
        color: BRAND_TOKENS.titleDark,
        valign: 'top',
      });
    });
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}

// ============================================================================
// 7. `grounded-screenshot-proof`: Annotated Live Cloud Console / UI Screenshot
// ============================================================================
export interface GroundedScreenshotProofConfig {
  title: string;
  subtitle: string;
  screenshotAbsPath: string;
  browserWindowTitle: string;
  screenshotCaption: string;
  callouts: [
    { badge: string; title: string; detail: string },
    { badge: string; title: string; detail: string },
    { badge: string; title: string; detail: string },
    { badge: string; title: string; detail: string },
  ];
}

export function renderGroundedScreenshotProofSlide(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  cfg: GroundedScreenshotProofConfig,
  slideNum: number,
  totalSlides: number
) {
  slide.background = { color: 'FFFFFF' };
  addSlideHeader(slide, cfg.title, cfg.subtitle);

  // Left Screenshot Frame (#F8F9FA with #DADCE0 border and 8px radius)
  const frameX = 0.5;
  const frameY = 1.05;
  const frameW = 5.55;
  const frameH = 4.02;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: frameX,
    y: frameY,
    w: frameW,
    h: frameH,
    rectRadius: 0.08,
    fill: { color: BRAND_TOKENS.cardBg },
    line: { color: BRAND_TOKENS.cardBorder, width: 1 },
  });

  // Top browser chrome bar inside frame (single-line URL bar with zero wrap overflow)
  slide.addShape(pptx.ShapeType.rect, {
    x: frameX + 0.02,
    y: frameY + 0.02,
    w: frameW - 0.04,
    h: 0.32,
    fill: { color: 'E8EAED' },
    line: { type: 'none' },
  });
  // 3 window dots in Google colors
  [GOOGLE_QUAD_COLORS[1], GOOGLE_QUAD_COLORS[2], GOOGLE_QUAD_COLORS[3]].forEach((hex, dIdx) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: frameX + 0.14 + dIdx * 0.15,
      y: frameY + 0.13,
      w: 0.1,
      h: 0.1,
      fill: { color: hex },
      line: { type: 'none' },
    });
  });
  slide.addText(cfg.browserWindowTitle, {
    x: frameX + 0.62,
    y: frameY + 0.05,
    w: frameW - 0.72,
    h: 0.24,
    fontFace: BRAND_TOKENS.fontMono,
    fontSize: 6.8,
    bold: true,
    color: BRAND_TOKENS.titleDark,
    valign: 'middle',
  });

  if (fs.existsSync(cfg.screenshotAbsPath)) {
    // Preserve exact 16:9 aspect ratio (w: 5.35 -> h: 3.01) centered vertically inside frame
    slide.addImage({
      path: cfg.screenshotAbsPath,
      x: frameX + 0.1,
      y: frameY + 0.42,
      w: 5.35,
      h: 3.01,
    });
  }

  slide.addText(cfg.screenshotCaption, {
    x: frameX + 0.12,
    y: frameY + 3.52,
    w: frameW - 0.24,
    h: 0.42,
    fontFace: BRAND_TOKENS.fontBody,
    fontSize: 7.8,
    color: BRAND_TOKENS.bodyGray,
    valign: 'middle',
  });

  // Right Editable Verification Rail (4 cards in strict Blue -> Red -> Yellow -> Green order)
  const railX = 6.2;
  const railW = 3.3;

  cfg.callouts.forEach((c, idx) => {
    const cy = 1.05 + idx * 1.02;
    const accentHex = GOOGLE_QUAD_COLORS[idx];

    slide.addShape(pptx.ShapeType.roundRect, {
      x: railX,
      y: cy,
      w: railW,
      h: 0.94,
      rectRadius: 0.08,
      fill: { color: BRAND_TOKENS.cardBg },
      line: { color: BRAND_TOKENS.cardBorder, width: 1 },
    });
    // Left vertical brand accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: railX + 0.02,
      y: cy + 0.08,
      w: 0.06,
      h: 0.78,
      fill: { color: accentHex },
      line: { type: 'none' },
    });

    slide.addText(c.badge, {
      x: railX + 0.16,
      y: cy + 0.05,
      w: railW - 0.26,
      h: 0.18,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 7.5,
      bold: true,
      color: accentHex,
    });
    slide.addText(c.title, {
      x: railX + 0.16,
      y: cy + 0.25,
      w: railW - 0.26,
      h: 0.22,
      fontFace: BRAND_TOKENS.fontTitle,
      fontSize: 9.5,
      bold: true,
      color: BRAND_TOKENS.titleDark,
    });
    slide.addText(c.detail, {
      x: railX + 0.16,
      y: cy + 0.49,
      w: railW - 0.26,
      h: 0.4,
      fontFace: BRAND_TOKENS.fontBody,
      fontSize: 7.8,
      color: BRAND_TOKENS.bodyGray,
    });
  });

  addConfidentialFooter(pptx, slide, slideNum, totalSlides);
}
