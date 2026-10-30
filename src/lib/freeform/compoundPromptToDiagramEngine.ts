import { GoogleGenAI } from '@google/genai';
import {
  generateReferenceArchitectureImage,
  getEffectiveGeminiApiKey,
  resolveLatestGeminiModelChain,
} from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { resolveFreeformIconDataUri } from './freeformIconRegistry';
import { mutateDrawioXmlDirectly } from './directDrawioSpatialMutator';

export interface CompoundGroup {
  id: string;
  label: string;
  parentId?: string | null;
  fillHex?: string;
  strokeHex?: string;
  dashed?: boolean;
}

export interface CompoundNode {
  id: string;
  label: string;
  subtitle?: string;
  parentId?: string | null;
  shape?: 'card' | 'cylinder' | 'pill' | 'diamond' | 'hexagon';
  iconKey?: string;
  fillHex?: string;
  strokeHex?: string;
}

export interface CompoundEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  dashed?: boolean;
  bidirectional?: boolean;
  strokeHex?: string;
}

export interface CompoundArchitectureGraph {
  title: string;
  subtitle?: string;
  reasoning: string;
  groups: CompoundGroup[];
  nodes: CompoundNode[];
  edges: CompoundEdge[];
}

export interface GroundingWebSource {
  title: string;
  uri: string;
}

export interface PipelineStagesReport {
  researchModel: string;
  planModel: string;
  imageModel: string;
  visionToXmlModel: string;
  webSearchQueries: string[];
  groundingSources: GroundingWebSource[];
  architecturalPlan: string;
  visualImagePrompt: string;
}

export interface CompoundGeometryAudit {
  groupCount: number;
  nodeCount: number;
  edgeCount: number;
  maxNestingDepth: number;
  siblingOverlaps: number;
  childContainmentViolations: number;
}

export interface CompoundPromptToDiagramResult {
  success: true;
  action: 'create' | 'modify';
  mutationMode: 'four_stage_vision_pipeline' | 'direct_drawio_xml_update';
  userPrompt: string;
  modificationHistory: string[];
  summaryOfChanges: string;
  xml: string;
  referenceImageDataUrl?: string;
  graph: CompoundArchitectureGraph;
  audit: CompoundGeometryAudit;
  pipelineStages?: PipelineStagesReport;
  modelUsed: string;
  latencyMs: number;
}

interface Stage1ResearchOutput {
  modelUsed: string;
  researchBrief: string;
  webSearchQueries: string[];
  groundingSources: GroundingWebSource[];
}

interface Stage2PlanOutput {
  modelUsed: string;
  title: string;
  subtitle: string;
  architecturalSummary: string;
  canonicalGlossary: string[];
  visualImagePrompt: string;
}

interface VisionTitleBanner {
  text: string;
  subtext?: string;
  box_2d: [number, number, number, number];
}

interface VisionContainerSpec {
  id: string;
  label: string;
  box_2d: [number, number, number, number];
  fillHex?: string;
  strokeHex?: string;
  dashed?: boolean;
  headerAlign?: 'left' | 'center';
}

interface VisionNodeSpec {
  id: string;
  label: string;
  sublabel?: string;
  shape?: 'card' | 'cylinder' | 'pill' | 'diamond' | 'hexagon';
  hasVisibleIcon?: boolean;
  iconKey?: string;
  box_2d: [number, number, number, number];
  fillHex?: string;
  strokeHex?: string;
}

interface VisionEdgeSpec {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  bidirectional?: boolean;
  dashed?: boolean;
  strokeHex?: string;
  sourcePoint?: [number, number];
  targetPoint?: [number, number];
  bendPoints?: Array<[number, number]>;
}

export interface VisionDecompiledScene {
  titleBanner?: VisionTitleBanner | null;
  containers: VisionContainerSpec[];
  nodes: VisionNodeSpec[];
  edges: VisionEdgeSpec[];
}

interface CanvasRect {
  id: string;
  label: string;
  sublabel: string;
  parentId: string;
  isContainer: boolean;
  shape: 'card' | 'cylinder' | 'pill' | 'diamond' | 'hexagon';
  hasVisibleIcon: boolean;
  iconKey?: string;
  fillHex: string;
  strokeHex: string;
  dashed: boolean;
  headerAlign: 'left' | 'center';
  x: number;
  y: number;
  w: number;
  h: number;
}

function escapeXmlAttr(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtmlText(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function sanitizeHex(raw: string | undefined, fallback: string): string {
  const m = String(raw || '').trim().match(/^#?[0-9a-fA-F]{6}$/);
  if (!m) return fallback;
  const h = m[0].startsWith('#') ? m[0] : `#${m[0]}`;
  return h.toUpperCase();
}

function clamp(val: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, val));
}

function parseJsonResponse<T>(rawText: string, stageName: string): T {
  const cleaned = String(rawText || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1)) as T;
    }
    throw new Error(`${stageName} returned malformed JSON.`);
  }
}

// ============================================================================
// STAGE 1: LIVE GOOGLE SEARCH WEB GROUNDING (MEDIUM THINKING)
// ============================================================================
async function groundPromptWithGoogleSearch(
  ai: GoogleGenAI,
  userPrompt: string
): Promise<Stage1ResearchOutput> {
  const flashChain = await resolveLatestGeminiModelChain(ai, 'chat');
  const researchModel = flashChain[0] || 'gemini-2.5-flash';

  const systemInstruction = `You are a Principal Systems & Cloud Architecture Researcher.
Use Google Search grounding to verify exact official product names, APIs, open standards, protocols, storage formats, security/governance primitives, and real-world reference architecture patterns relevant to the user's prompt.
Return a concise, dense technical brief (bulleted facts, exact component names, and directional data/control flows). Zero marketing fluff.`;

  const res = await generateContentWithRetry(
    ai,
    {
      model: researchModel,
      contents: `Research technical architecture facts, real components, and data/control flows for:\n"${userPrompt}"`,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingLevel: 'MEDIUM' as any },
      },
    },
    { label: 'Stage 1: Live Web Grounding', perAttemptTimeoutMs: 28_000, totalBudgetMs: 38_000 }
  );

  const actualModel = String((res as any)?.__resolvedModelId || researchModel);
  const researchBrief = String(res?.text || '').trim();
  const gm = (res as any)?.candidates?.[0]?.groundingMetadata;
  const webSearchQueries: string[] = Array.isArray(gm?.webSearchQueries)
    ? gm.webSearchQueries.map(String).filter(Boolean)
    : [];
  const groundingSources: GroundingWebSource[] = [];
  const seenUris = new Set<string>();
  if (Array.isArray(gm?.groundingChunks)) {
    for (const ch of gm.groundingChunks) {
      const uri = String(ch?.web?.uri || '').trim();
      const title = String(ch?.web?.title || uri).trim();
      if (uri && !seenUris.has(uri)) {
        seenUris.add(uri);
        groundingSources.push({ title, uri });
      }
    }
  }

  return {
    modelUsed: actualModel,
    researchBrief,
    webSearchQueries,
    groundingSources,
  };
}

// ============================================================================
// STAGE 2: ARCHITECTURAL PLAN & UNTRUNCATED 16:9 VISUAL BLUEPRINT (HIGH THINKING)
// ============================================================================
async function planArchitectureAndVisualPrompt(
  ai: GoogleGenAI,
  userPrompt: string,
  research: Stage1ResearchOutput
): Promise<Stage2PlanOutput> {
  const proChain = await resolveLatestGeminiModelChain(ai, 'pro');
  const planModel = proChain[0] || 'gemini-2.5-pro';

  const systemInstruction = `You are a Principal Enterprise Architecture Diagram Planner.
Your job is to design a technically accurate, complete, faithful architecture plan for the user's prompt (grounded in Stage 1 research) AND write a complete, crystal-clear 16:9 flat-2D vector diagram image prompt for Stage 3 image generation.

Return ONLY valid JSON with this exact schema:
{
  "title": "Concise technical diagram title",
  "subtitle": "1-line scope summary",
  "architecturalSummary": "2-4 sentence technical explanation of the architecture and data/control flows",
  "canonicalGlossary": ["Exact Product/Service Name 1", "Exact Protocol/Component Name 2"],
  "visualImagePrompt": "Complete, detailed 16:9 flat-2D architecture diagram visual specification (900 to 2200 characters)"
}

CRITICAL RULES FOR visualImagePrompt:
1. Flat 2D crisp vector technical architecture diagram on a pure white (#FFFFFF) 16:9 widescreen canvas. Strictly NO 3D isometric perspective, NO dark backgrounds, NO photorealistic scenery, NO decorative clip-art.
2. Specify exact spatial layout (e.g., left-to-right / top-to-bottom / multi-domain zones), exact named boundary containers with soft pastel fills (#E8F0FE blue, #E6F4EA green, #FEF7E0 amber, #F3E8FD purple, #FCE8E6 coral, #F1F5F9 slate) and solid or dashed colored borders.
3. EVERY container MUST have a real, meaningful domain/boundary title AND contain explicit named component cards inside it. NEVER create empty boxes and NEVER use placeholder names like "Zone 1", "Zone 2", or "Group A".
4. Inside containers, specify clean white rounded component cards with small crisp product/tech icons and bold, legible 1-to-2 line component names (NO tiny multi-sentence paragraphs inside cards).
5. Specify clean 90-degree orthogonal directional arrows (single-headed -> or bidirectional <->, solid or dashed) connecting exact components or zones, with short legible arrow labels placed cleanly beside/on straight line segments without overlapping any boxes.`;

  const res = await generateContentWithRetry(
    ai,
    {
      model: planModel,
      contents: `USER PROMPT:\n${userPrompt}\n\nSTAGE 1 VERIFIED RESEARCH BRIEF:\n${research.researchBrief || '(Use domain knowledge)'}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2,
        maxOutputTokens: 16384,
        thinkingConfig: { thinkingLevel: 'HIGH' as any },
      },
    },
    { label: 'Stage 2: HIGH-Thinking Architecture Plan', perAttemptTimeoutMs: 50_000, totalBudgetMs: 70_000 }
  );

  const actualModel = String((res as any)?.__resolvedModelId || planModel);
  const parsed = parseJsonResponse<{
    title?: string;
    subtitle?: string;
    architecturalSummary?: string;
    canonicalGlossary?: string[];
    visualImagePrompt?: string;
  }>(String(res?.text || ''), 'Stage 2 Plan');

  const title = String(parsed.title || userPrompt).trim();
  const subtitle = String(parsed.subtitle || '').trim();
  const architecturalSummary = String(parsed.architecturalSummary || '').trim();
  const canonicalGlossary = Array.isArray(parsed.canonicalGlossary)
    ? parsed.canonicalGlossary.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const visualImagePrompt = String(parsed.visualImagePrompt || '').trim();

  if (!visualImagePrompt || visualImagePrompt.length < 80) {
    throw new Error('Stage 2 failed to synthesize a valid visual architecture prompt.');
  }

  return {
    modelUsed: actualModel,
    title,
    subtitle,
    architecturalSummary,
    canonicalGlossary,
    visualImagePrompt,
  };
}

// ============================================================================
// STAGE 4: TRUE 1:1 MULTIMODAL IMAGE -> DRAW.IO SCENE DECOMPILATION (HIGH THINKING)
// ============================================================================
async function decompileReferenceImageToScene(
  ai: GoogleGenAI,
  image: { base64Data: string; mimeType: string },
  plan: Stage2PlanOutput
): Promise<{ scene: VisionDecompiledScene; modelUsed: string }> {
  const visionChain = await resolveLatestGeminiModelChain(ai, 'vision');
  const visionModel = visionChain[0] || 'gemini-2.5-pro';

  const systemInstruction = `You are a precision Multimodal Architecture Image-to-Draw.io Vector Decompiler.
Inspect the provided 16:9 reference architecture image carefully and extract 100% of its visual elements so it can be rendered as an exact 1:1 editable Draw.io (<mxGraphModel>) twin.

THE IMAGE IS THE SINGLE VISUAL & SPATIAL SOURCE OF TRUTH:
- Extract ONLY containers, component cards/nodes, title banners, colors, and arrows that are VISUALLY PRESENT in the image.
- Use the provided Canonical Glossary ONLY to ensure exact spelling of technical labels visible in the image (never add extra boxes that aren't drawn in the image).
- All coordinates use normalized 0..1000 integer scale:
  - box_2d = [ymin, xmin, ymax, xmax] where 0,0 is top-left and 1000,1000 is bottom-right of the image.
  - points (sourcePoint, targetPoint, bendPoints) = [y, x] in 0..1000 scale!

Return ONLY valid JSON matching this exact structure:
{
  "titleBanner": {
    "text": "Top diagram title text if drawn at top of image (or empty string if none)",
    "subtext": "Optional subtitle if drawn below title",
    "box_2d": [ymin, xmin, ymax, xmax]
  },
  "containers": [
    {
      "id": "z_1",
      "label": "Exact container header text visible in image ('' if untitled grouping border)",
      "box_2d": [ymin, xmin, ymax, xmax],
      "fillHex": "#RRGGBB actual background fill color in image (e.g. #E8F0FE, #E6F4EA, #FEF7E0, #F3E8FD, #F8FAFC, #FFFFFF)",
      "strokeHex": "#RRGGBB actual border color in image",
      "dashed": false,
      "headerAlign": "left"
    }
  ],
  "nodes": [
    {
      "id": "n_1",
      "label": "Exact primary text inside/under this component card",
      "sublabel": "Secondary small text ONLY if visibly written inside this card in the image, else ''",
      "shape": "card",
      "hasVisibleIcon": true,
      "iconKey": "short product/category token e.g. gcs, bigquery, databricks, iceberg, vertex_ai, pubsub, kafka, iam, looker, database, user",
      "box_2d": [ymin, xmin, ymax, xmax],
      "fillHex": "#FFFFFF",
      "strokeHex": "#CBD5E1"
    }
  ],
  "edges": [
    {
      "id": "e_1",
      "sourceId": "id from nodes OR containers where this arrow starts",
      "targetId": "id from nodes OR containers where this arrow ends",
      "label": "Exact text label written on/beside this arrow in the image, else ''",
      "bidirectional": false,
      "dashed": false,
      "strokeHex": "#475569",
      "sourcePoint": [y, x],
      "targetPoint": [y, x],
      "bendPoints": [[y1, x1], [y2, x2]]
    }
  ]
}

CRITICAL EXTRACTION ACCURACY RULES:
1. Extract BOTH outer containers AND nested inner sub-containers in "containers" (e.g., an outer cloud/platform boundary AND its inner storage/compute/AI sub-zones), with each container's TRUE fillHex and strokeHex from the image!
2. Do NOT put leaf component cards in "containers", and do NOT put multi-card grouping boxes in "nodes".
3. Extract EVERY visible arrow/connector in "edges"! Notice carefully whether an arrow starts/ends on a specific leaf node ("n_*") OR on the border of a container/zone ("z_*") — set sourceId and targetId accordingly, and record accurate sourcePoint [y, x], targetPoint [y, x], and any 90-degree corner bendPoints [[y, x]] visible in the image!
4. Set "bidirectional": true whenever arrowheads appear on BOTH ends (<-->) in the image, and "dashed": true whenever the line or border is dashed/dotted.`;

  const glossaryHint =
    plan.canonicalGlossary.length > 0
      ? `Canonical spelling glossary (for OCR spelling accuracy only): ${plan.canonicalGlossary.join(', ')}`
      : '';

  const res = await generateContentWithRetry(
    ai,
    {
      model: visionModel,
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: image.mimeType,
                data: image.base64Data,
              },
            },
            {
              text: `Decompile this 16:9 architecture diagram image 1:1 into containers, nodes, and edges with exact [ymin, xmin, ymax, xmax] bounding boxes, hex colors, and arrow paths.\n${glossaryHint}`,
            },
          ],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.1,
        maxOutputTokens: 32768,
        thinkingConfig: { thinkingLevel: 'HIGH' as any },
      },
    },
    { label: 'Stage 4: Multimodal 1:1 Image-to-Draw.io Decompilation', perAttemptTimeoutMs: 65_000, totalBudgetMs: 90_000 }
  );

  const actualModel = String((res as any)?.__resolvedModelId || visionModel);
  const scene = parseJsonResponse<VisionDecompiledScene>(String(res?.text || ''), 'Stage 4 Vision Decompiler');

  if (!Array.isArray(scene.nodes) || scene.nodes.length === 0) {
    throw new Error('Stage 4 Vision decompiler extracted zero component nodes from the reference image.');
  }

  return {
    scene: {
      titleBanner: scene.titleBanner || null,
      containers: Array.isArray(scene.containers) ? scene.containers : [],
      nodes: scene.nodes,
      edges: Array.isArray(scene.edges) ? scene.edges : [],
    },
    modelUsed: actualModel,
  };
}

// ============================================================================
// PROPORTIONAL 1:1 DRAW.IO XML COMPILER (ZERO SUBTREE SHOVING, ZERO COLOR WIPE)
// ============================================================================
function intersectionArea(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
): number {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return ix * iy;
}

function snapPointToPerimeter(
  pt: { x: number; y: number } | null,
  rect: { x: number; y: number; w: number; h: number },
  fallbackToward: { x: number; y: number }
): { exitX: number; exitY: number; absX: number; absY: number; side: 'left' | 'right' | 'top' | 'bottom' } {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;

  if (!pt) {
    const dx = fallbackToward.x - cx;
    const dy = fallbackToward.y - cy;
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx >= 0) return { exitX: 1, exitY: 0.5, absX: rect.x + rect.w, absY: cy, side: 'right' };
      return { exitX: 0, exitY: 0.5, absX: rect.x, absY: cy, side: 'left' };
    }
    if (dy >= 0) return { exitX: 0.5, exitY: 1, absX: cx, absY: rect.y + rect.h, side: 'bottom' };
    return { exitX: 0.5, exitY: 0, absX: cx, absY: rect.y, side: 'top' };
  }

  const dLeft = Math.abs(pt.x - rect.x);
  const dRight = Math.abs(pt.x - (rect.x + rect.w));
  const dTop = Math.abs(pt.y - rect.y);
  const dBottom = Math.abs(pt.y - (rect.y + rect.h));
  const minD = Math.min(dLeft, dRight, dTop, dBottom);

  const relX = Number(clamp((pt.x - rect.x) / Math.max(1, rect.w), 0.08, 0.92).toFixed(3));
  const relY = Number(clamp((pt.y - rect.y) / Math.max(1, rect.h), 0.08, 0.92).toFixed(3));

  if (minD === dLeft) {
    return { exitX: 0, exitY: relY, absX: rect.x, absY: rect.y + relY * rect.h, side: 'left' };
  }
  if (minD === dRight) {
    return { exitX: 1, exitY: relY, absX: rect.x + rect.w, absY: rect.y + relY * rect.h, side: 'right' };
  }
  if (minD === dTop) {
    return { exitX: relX, exitY: 0, absX: rect.x + relX * rect.w, absY: rect.y, side: 'top' };
  }
  return { exitX: relX, exitY: 1, absX: rect.x + relX * rect.w, absY: rect.y + rect.h, side: 'bottom' };
}

function orthogonalizeWaypoints(
  start: { x: number; y: number; side: 'left' | 'right' | 'top' | 'bottom' },
  end: { x: number; y: number; side: 'left' | 'right' | 'top' | 'bottom' },
  rawBends: Array<{ x: number; y: number }>
): Array<{ x: number; y: number }> {
  // Straight vertical or horizontal alignment within 8px -> snap straight!
  if (rawBends.length === 0) {
    if ((start.side === 'left' || start.side === 'right') && (end.side === 'left' || end.side === 'right')) {
      if (Math.abs(start.y - end.y) <= 8) return [];
      const midX = Math.round((start.x + end.x) / 2);
      return [
        { x: midX, y: Math.round(start.y) },
        { x: midX, y: Math.round(end.y) },
      ];
    }
    if ((start.side === 'top' || start.side === 'bottom') && (end.side === 'top' || end.side === 'bottom')) {
      if (Math.abs(start.x - end.x) <= 8) return [];
      const midY = Math.round((start.y + end.y) / 2);
      return [
        { x: Math.round(start.x), y: midY },
        { x: Math.round(end.x), y: midY },
      ];
    }
    // Perpendicular sides -> clean single L-corner matching exit/entry orientation
    if (start.side === 'left' || start.side === 'right') {
      return [{ x: Math.round(end.x), y: Math.round(start.y) }];
    }
    return [{ x: Math.round(start.x), y: Math.round(end.y) }];
  }

  // Snap extracted image bendPoints into clean 90-degree orthogonal segments
  const snapped: Array<{ x: number; y: number }> = rawBends.map((p) => ({
    x: Math.round(p.x),
    y: Math.round(p.y),
  }));

  // Align first bend with start anchor along exit axis
  if (snapped.length > 0) {
    if (start.side === 'left' || start.side === 'right') {
      snapped[0].y = Math.round(start.y);
    } else {
      snapped[0].x = Math.round(start.x);
    }
  }
  // Align last bend with end anchor along entry axis
  if (snapped.length > 0) {
    const last = snapped[snapped.length - 1];
    if (end.side === 'left' || end.side === 'right') {
      last.y = Math.round(end.y);
    } else {
      last.x = Math.round(end.x);
    }
  }

  // Ensure intermediate consecutive bends are orthogonal (insert corner if diagonal)
  const ortho: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < snapped.length; i++) {
    const curr = snapped[i];
    if (ortho.length > 0) {
      const prev = ortho[ortho.length - 1];
      const dx = Math.abs(curr.x - prev.x);
      const dy = Math.abs(curr.y - prev.y);
      if (dx <= 10) {
        curr.x = prev.x;
      } else if (dy <= 10) {
        curr.y = prev.y;
      } else {
        ortho.push({ x: curr.x, y: prev.y });
      }
    }
    ortho.push(curr);
  }

  // Deduplicate identical consecutive points
  return ortho.filter((pt, idx) => idx === 0 || pt.x !== ortho[idx - 1].x || pt.y !== ortho[idx - 1].y);
}

export function compileVisionSceneToDrawioXml(params: {
  scene: VisionDecompiledScene;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  architecturalSummary: string;
  imageWidth?: number;
  imageHeight?: number;
}): {
  xml: string;
  graph: CompoundArchitectureGraph;
  audit: CompoundGeometryAudit;
} {
  const { scene, fallbackTitle, fallbackSubtitle, architecturalSummary } = params;
  const imgW = params.imageWidth && params.imageWidth > 100 ? params.imageWidth : 1600;
  const imgH = params.imageHeight && params.imageHeight > 100 ? params.imageHeight : 900;

  const canvasW = 1600;
  const canvasH = Math.max(760, Math.round(canvasW * (imgH / imgW)));

  const toRect = (box: [number, number, number, number] | undefined, minW: number, minH: number) => {
    const [rawY1, rawX1, rawY2, rawX2] = Array.isArray(box) && box.length === 4 ? box : [100, 100, 200, 250];
    const ymin = clamp(Math.min(rawY1, rawY2), 0, 995);
    const ymax = clamp(Math.max(rawY1, rawY2), ymin + 12, 1000);
    const xmin = clamp(Math.min(rawX1, rawX2), 0, 995);
    const xmax = clamp(Math.max(rawX1, rawX2), xmin + 18, 1000);
    const x = Math.round((xmin / 1000) * canvasW);
    const y = Math.round((ymin / 1000) * canvasH);
    const w = Math.max(minW, Math.round(((xmax - xmin) / 1000) * canvasW));
    const h = Math.max(minH, Math.round(((ymax - ymin) / 1000) * canvasH));
    return { x, y, w, h };
  };

  const containerRects: CanvasRect[] = [];
  const usedIds = new Set<string>(['0', '1', 'title_banner']);

  const uniqueId = (raw: string, prefix: string) => {
    const base = String(raw || prefix)
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '_') || prefix;
    if (!usedIds.has(base)) {
      usedIds.add(base);
      return base;
    }
    let idx = 2;
    while (usedIds.has(`${base}_${idx}`)) idx++;
    const next = `${base}_${idx}`;
    usedIds.add(next);
    return next;
  };

  const rawIdMap = new Map<string, string>();

  for (let i = 0; i < scene.containers.length; i++) {
    const c = scene.containers[i];
    const r = toRect(c.box_2d, 80, 56);
    const cleanId = uniqueId(c.id || `z_${i + 1}`, `z_${i + 1}`);
    if (c.id) rawIdMap.set(c.id, cleanId);
    containerRects.push({
      id: cleanId,
      label: String(c.label || '').trim(),
      sublabel: '',
      parentId: '1',
      isContainer: true,
      shape: 'card',
      hasVisibleIcon: false,
      fillHex: sanitizeHex(c.fillHex, '#F8FAFC'),
      strokeHex: sanitizeHex(c.strokeHex, '#94A3B8'),
      dashed: Boolean(c.dashed),
      headerAlign: c.headerAlign === 'center' ? 'center' : 'left',
      ...r,
    });
  }

  // Sort containers largest-area first so outer containers precede nested sub-containers
  containerRects.sort((a, b) => b.w * b.h - a.w * a.h);

  // Assign geometric container nesting directly from image bounding boxes
  for (let i = 0; i < containerRects.length; i++) {
    const inner = containerRects[i];
    const innerArea = inner.w * inner.h;
    let bestParent: CanvasRect | null = null;
    for (let j = 0; j < containerRects.length; j++) {
      if (i === j) continue;
      const outer = containerRects[j];
      const outerArea = outer.w * outer.h;
      if (outerArea <= innerArea * 1.08) continue;
      const overlap = intersectionArea(inner, outer);
      if (overlap / Math.max(1, innerArea) >= 0.75) {
        if (!bestParent || outerArea < bestParent.w * bestParent.h) {
          bestParent = outer;
        }
      }
    }
    if (bestParent) {
      inner.parentId = bestParent.id;
    }
  }

  const nodeRects: CanvasRect[] = [];
  for (let i = 0; i < scene.nodes.length; i++) {
    const n = scene.nodes[i];
    const label = String(n.label || '').trim();
    if (!label) continue;
    const r = toRect(n.box_2d, 58, 28);
    const cleanId = uniqueId(n.id || `n_${i + 1}`, `n_${i + 1}`);
    if (n.id) rawIdMap.set(n.id, cleanId);

    // Find smallest container containing node center
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    let bestContainer: CanvasRect | null = null;
    for (const c of containerRects) {
      if (cx >= c.x && cx <= c.x + c.w && cy >= c.y && cy <= c.y + c.h) {
        if (!bestContainer || c.w * c.h < bestContainer.w * bestContainer.h) {
          bestContainer = c;
        }
      }
    }

    const shape: CanvasRect['shape'] =
      n.shape === 'cylinder' || n.shape === 'pill' || n.shape === 'diamond' || n.shape === 'hexagon'
        ? n.shape
        : 'card';

    nodeRects.push({
      id: cleanId,
      label,
      sublabel: String(n.sublabel || '').trim(),
      parentId: bestContainer ? bestContainer.id : '1',
      isContainer: false,
      shape,
      hasVisibleIcon: n.hasVisibleIcon !== false,
      iconKey: n.iconKey,
      fillHex: sanitizeHex(n.fillHex, '#FFFFFF'),
      strokeHex: sanitizeHex(n.strokeHex, '#CBD5E1'),
      dashed: false,
      headerAlign: 'center',
      ...r,
    });
  }

  const rectById = new Map<string, CanvasRect>();
  for (const c of containerRects) rectById.set(c.id, c);
  for (const n of nodeRects) rectById.set(n.id, n);

  // Gentle local micro-polish ONLY:
  // 1) Ensure child cards do not sit on top of their parent container's header text bar
  for (const c of containerRects) {
    const headerClearance = c.label ? 28 : 8;
    for (const child of [...containerRects, ...nodeRects]) {
      if (child.parentId !== c.id) continue;
      if (child.y < c.y + headerClearance) {
        child.y = c.y + headerClearance;
      }
      if (child.x < c.x + 6) {
        child.x = c.x + 6;
      }
    }
  }

  // 2) Resolve tiny bbox rounding overlaps between sibling leaf nodes without moving containers
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < nodeRects.length; i++) {
      for (let j = i + 1; j < nodeRects.length; j++) {
        const a = nodeRects[i];
        const b = nodeRects[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox > 0 && oy > 0) {
          if (ox < oy) {
            const shift = Math.ceil(ox / 2) + 3;
            if (a.x <= b.x) {
              a.x = Math.max(8, a.x - shift);
              b.x += shift;
            } else {
              b.x = Math.max(8, b.x - shift);
              a.x += shift;
            }
          } else {
            const shift = Math.ceil(oy / 2) + 3;
            if (a.y <= b.y) {
              a.y = Math.max(8, a.y - shift);
              b.y += shift;
            } else {
              b.y = Math.max(8, b.y - shift);
              a.y += shift;
            }
          }
        }
      }
    }
  }

  // 3) Ensure parent containers cleanly enclose child bounds (bottom-up from smallest to largest container)
  const smallestFirstContainers = [...containerRects].sort((a, b) => a.w * a.h - b.w * b.h);
  for (const c of smallestFirstContainers) {
    for (const child of [...nodeRects, ...containerRects]) {
      if (child.parentId !== c.id) continue;
      if (child.x < c.x + 6) {
        const delta = c.x + 6 - child.x;
        c.x = Math.max(4, c.x - delta);
        c.w += delta;
      }
      if (child.y < c.y + (c.label ? 26 : 6)) {
        const minTop = c.y + (c.label ? 26 : 6);
        const delta = minTop - child.y;
        c.y = Math.max(4, c.y - delta);
        c.h += delta;
      }
      if (child.x + child.w + 8 > c.x + c.w) {
        c.w = child.x + child.w + 8 - c.x;
      }
      if (child.y + child.h + 8 > c.y + c.h) {
        c.h = child.y + child.h + 8 - c.y;
      }
    }
  }

  let finalCanvasW = canvasW;
  let finalCanvasH = canvasH;
  for (const r of [...containerRects, ...nodeRects]) {
    if (r.x + r.w + 20 > finalCanvasW) finalCanvasW = Math.ceil(r.x + r.w + 20);
    if (r.y + r.h + 20 > finalCanvasH) finalCanvasH = Math.ceil(r.y + r.h + 20);
  }

  // Build XML
  const titleText = scene.titleBanner?.text?.trim() || fallbackTitle;
  const lines: string[] = [];
  lines.push(
    `<mxfile host="app.diagrams.net" agent="PromptCanvas-Vision1to1" version="24.7.17" data-prompt-to-diagram="true">`
  );
  lines.push(`  <diagram id="p2d_canvas" name="${escapeXmlAttr(titleText)}">`);
  lines.push(
    `    <mxGraphModel dx="${finalCanvasW}" dy="${finalCanvasH}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${finalCanvasW}" pageHeight="${finalCanvasH}" background="#FFFFFF" math="0" shadow="0" data-prompt-to-diagram="true">`
  );
  lines.push(`      <root>`);
  lines.push(`        <mxCell id="0" />`);
  lines.push(`        <mxCell id="1" parent="0" />`);

  // Optional top title banner if present in the image and not colliding with top containers
  if (scene.titleBanner?.text?.trim() && Array.isArray(scene.titleBanner.box_2d)) {
    const tb = toRect(scene.titleBanner.box_2d, 240, 28);
    const overlapsContainer = containerRects.some(
      (c) => intersectionArea(tb, c) / Math.max(1, tb.w * tb.h) > 0.35
    );
    if (!overlapsContainer) {
      const bannerHtml = scene.titleBanner.subtext?.trim()
        ? `<div style="text-align:center;line-height:1.2;"><div style="font-weight:800;font-size:16px;color:#0F172A;">${escapeHtmlText(scene.titleBanner.text.trim())}</div><div style="font-size:11px;color:#475569;margin-top:2px;">${escapeHtmlText(scene.titleBanner.subtext.trim())}</div></div>`
        : `<div style="text-align:center;font-weight:800;font-size:16px;color:#0F172A;">${escapeHtmlText(scene.titleBanner.text.trim())}</div>`;
      lines.push(
        `        <mxCell id="title_banner" value="${escapeXmlAttr(bannerHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">`
      );
      lines.push(
        `          <mxGeometry x="${tb.x}" y="${tb.y}" width="${tb.w}" height="${tb.h}" as="geometry" />`
      );
      lines.push(`        </mxCell>`);
    }
  }

  // Emit containers (largest area first so parent cells always precede children)
  for (const c of containerRects) {
    const parentRect = c.parentId !== '1' ? rectById.get(c.parentId) : undefined;
    const relX = parentRect ? Math.round(c.x - parentRect.x) : Math.round(c.x);
    const relY = parentRect ? Math.round(c.y - parentRect.y) : Math.round(c.y);
    const align = c.headerAlign === 'center' ? 'center' : 'left';
    const headerHtml = c.label
      ? `<div style="font-weight:700;font-size:11.5px;color:#0F172A;padding:4px 8px;text-align:${align};border-bottom:1px solid ${c.strokeHex}30;">${escapeHtmlText(c.label)}</div>`
      : '';
    const style = [
      'rounded=1',
      'arcSize=4',
      'whiteSpace=wrap',
      'html=1',
      'container=1',
      'collapsible=0',
      'verticalAlign=top',
      `align=${align}`,
      `fillColor=${c.fillHex}`,
      `strokeColor=${c.strokeHex}`,
      'strokeWidth=1.5',
      c.dashed ? 'dashed=1;dashPattern=6 4' : 'dashed=0',
    ].join(';') + ';';

    lines.push(
      `        <mxCell id="${escapeXmlAttr(c.id)}" value="${escapeXmlAttr(headerHtml)}" style="${escapeXmlAttr(style)}" vertex="1" parent="${escapeXmlAttr(c.parentId)}">`
    );
    lines.push(
      `          <mxGeometry x="${relX}" y="${relY}" width="${Math.round(c.w)}" height="${Math.round(c.h)}" as="geometry" />`
    );
    lines.push(`        </mxCell>`);
  }

  // Emit leaf component nodes
  for (const n of nodeRects) {
    const parentRect = n.parentId !== '1' ? rectById.get(n.parentId) : undefined;
    const relX = parentRect ? Math.round(n.x - parentRect.x) : Math.round(n.x);
    const relY = parentRect ? Math.round(n.y - parentRect.y) : Math.round(n.y);

    // Choose font & icon sizing dynamically to fit the image-derived card dimensions cleanly
    const fontSize = n.h < 36 || n.w < 95 ? 9.5 : n.h < 48 || n.w < 130 ? 10.5 : 11;
    const iconPx = n.h < 38 || n.w < 105 ? 15 : 19;
    const iconUri = n.hasVisibleIcon ? resolveFreeformIconDataUri(n.label, n.iconKey) : null;

    const safeLabel = escapeHtmlText(n.label);
    const safeSub = n.sublabel && n.h >= 44 ? escapeHtmlText(n.sublabel) : '';
    const textInner = safeSub
      ? `<div style="line-height:1.18;"><div style="font-weight:700;font-size:${fontSize}px;color:#0F172A;">${safeLabel}</div><div style="font-size:${Math.max(8.5, fontSize - 1.5)}px;color:#475569;margin-top:1px;">${safeSub}</div></div>`
      : `<div style="font-weight:700;font-size:${fontSize}px;color:#0F172A;line-height:1.2;">${safeLabel}</div>`;

    const isVerticalIconCard = iconUri && n.h > n.w * 0.78 && n.h >= 54;
    const valueHtml = iconUri
      ? isVerticalIconCard
        ? `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:3px 5px;text-align:center;"><img src="${iconUri}" width="${iconPx}" height="${iconPx}" style="flex-shrink:0;"/>${textInner}</div>`
        : `<div style="display:flex;align-items:center;gap:6px;padding:2px 6px;text-align:left;"><img src="${iconUri}" width="${iconPx}" height="${iconPx}" style="flex-shrink:0;"/>${textInner}</div>`
      : `<div style="padding:2px 5px;text-align:center;">${textInner}</div>`;

    let shapePrefix = 'rounded=1;arcSize=10;';
    if (n.shape === 'cylinder') {
      shapePrefix = 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;size=7;';
    } else if (n.shape === 'pill') {
      shapePrefix = 'rounded=1;arcSize=50;';
    } else if (n.shape === 'diamond') {
      shapePrefix = 'rhombus;';
    } else if (n.shape === 'hexagon') {
      shapePrefix = 'shape=hexagon;perimeter=hexagonPerimeter2;size=0.14;';
    }

    const style = [
      shapePrefix.replace(/;$/, ''),
      'whiteSpace=wrap',
      'html=1',
      `fillColor=${n.fillHex}`,
      `strokeColor=${n.strokeHex}`,
      'strokeWidth=1.25',
      'verticalAlign=middle',
      'align=center',
      'overflow=hidden',
    ].join(';') + ';';

    lines.push(
      `        <mxCell id="${escapeXmlAttr(n.id)}" value="${escapeXmlAttr(valueHtml)}" style="${escapeXmlAttr(style)}" vertex="1" parent="${escapeXmlAttr(n.parentId)}">`
    );
    lines.push(
      `          <mxGeometry x="${relX}" y="${relY}" width="${Math.round(n.w)}" height="${Math.round(n.h)}" as="geometry" />`
    );
    lines.push(`        </mxCell>`);
  }

  // Emit image-faithful edges
  const compiledEdges: CompoundEdge[] = [];
  for (let i = 0; i < scene.edges.length; i++) {
    const e = scene.edges[i];
    const srcId = rawIdMap.get(e.sourceId) || e.sourceId;
    const tgtId = rawIdMap.get(e.targetId) || e.targetId;
    const srcRect = rectById.get(srcId);
    const tgtRect = rectById.get(tgtId);
    if (!srcRect || !tgtRect || srcId === tgtId) continue;

    const edgeId = uniqueId(e.id || `e_${i + 1}`, `e_${i + 1}`);
    const srcPt =
      Array.isArray(e.sourcePoint) && e.sourcePoint.length === 2
        ? {
            x: (clamp(e.sourcePoint[1], 0, 1000) / 1000) * canvasW,
            y: (clamp(e.sourcePoint[0], 0, 1000) / 1000) * canvasH,
          }
        : null;
    const tgtPt =
      Array.isArray(e.targetPoint) && e.targetPoint.length === 2
        ? {
            x: (clamp(e.targetPoint[1], 0, 1000) / 1000) * canvasW,
            y: (clamp(e.targetPoint[0], 0, 1000) / 1000) * canvasH,
          }
        : null;

    const srcAnchor = snapPointToPerimeter(srcPt, srcRect, {
      x: tgtRect.x + tgtRect.w / 2,
      y: tgtRect.y + tgtRect.h / 2,
    });
    const tgtAnchor = snapPointToPerimeter(tgtPt, tgtRect, {
      x: srcRect.x + srcRect.w / 2,
      y: srcRect.y + srcRect.h / 2,
    });

    const rawBends: Array<{ x: number; y: number }> = Array.isArray(e.bendPoints)
      ? e.bendPoints
          .filter((bp) => Array.isArray(bp) && bp.length === 2)
          .map((bp) => ({
            x: (clamp(bp[1], 0, 1000) / 1000) * canvasW,
            y: (clamp(bp[0], 0, 1000) / 1000) * canvasH,
          }))
      : [];

    const waypoints = orthogonalizeWaypoints(
      { x: srcAnchor.absX, y: srcAnchor.absY, side: srcAnchor.side },
      { x: tgtAnchor.absX, y: tgtAnchor.absY, side: tgtAnchor.side },
      rawBends
    );

    const stroke = sanitizeHex(e.strokeHex, '#475569');
    const style = [
      'edgeStyle=orthogonalEdgeStyle',
      'rounded=1',
      'orthogonalLoop=1',
      'jettySize=auto',
      'html=1',
      `strokeColor=${stroke}`,
      'strokeWidth=1.5',
      `exitX=${srcAnchor.exitX}`,
      `exitY=${srcAnchor.exitY}`,
      'exitDx=0',
      'exitDy=0',
      `entryX=${tgtAnchor.exitX}`,
      `entryY=${tgtAnchor.exitY}`,
      'entryDx=0',
      'entryDy=0',
      'endArrow=blockThin',
      'endFill=1',
      e.bidirectional ? 'startArrow=blockThin' : 'startArrow=none',
      e.bidirectional ? 'startFill=1' : 'startFill=0',
      e.dashed ? 'dashed=1;dashPattern=6 4' : 'dashed=0',
      'fontFamily=Inter, Helvetica, Arial, sans-serif',
      'fontSize=9.5',
      'fontColor=#1E293B',
      'labelBackgroundColor=#FFFFFF',
    ].join(';') + ';';

    const cleanEdgeLabel = String(e.label || '').trim();
    const edgeValueHtml = cleanEdgeLabel
      ? `<span style="padding:0 3px;background:#FFFFFF;">${escapeHtmlText(cleanEdgeLabel)}</span>`
      : '';

    lines.push(
      `        <mxCell id="${escapeXmlAttr(edgeId)}" value="${escapeXmlAttr(edgeValueHtml)}" style="${escapeXmlAttr(style)}" edge="1" parent="1" source="${escapeXmlAttr(srcId)}" target="${escapeXmlAttr(tgtId)}">`
    );
    if (waypoints.length > 0 || cleanEdgeLabel) {
      lines.push(`          <mxGeometry relative="1" as="geometry">`);
      if (waypoints.length > 0) {
        lines.push(`            <Array as="points">`);
        for (const wp of waypoints) {
          lines.push(`              <mxPoint x="${wp.x}" y="${wp.y}" />`);
        }
        lines.push(`            </Array>`);
      }
      if (cleanEdgeLabel) {
        lines.push(`            <mxPoint x="0" y="-1.5" as="offset" />`);
      }
      lines.push(`          </mxGeometry>`);
    } else {
      lines.push(`          <mxGeometry relative="1" as="geometry" />`);
    }
    lines.push(`        </mxCell>`);

    compiledEdges.push({
      id: edgeId,
      source: srcId,
      target: tgtId,
      label: cleanEdgeLabel || undefined,
      dashed: Boolean(e.dashed),
      bidirectional: Boolean(e.bidirectional),
      strokeHex: stroke,
    });
  }

  lines.push(`      </root>`);
  lines.push(`    </mxGraphModel>`);
  lines.push(`  </diagram>`);
  lines.push(`</mxfile>`);

  // Compute honest geometry audit metrics
  let siblingOverlaps = 0;
  for (let i = 0; i < nodeRects.length; i++) {
    for (let j = i + 1; j < nodeRects.length; j++) {
      if (intersectionArea(nodeRects[i], nodeRects[j]) > 4) {
        siblingOverlaps++;
      }
    }
  }

  let childContainmentViolations = 0;
  for (const child of [...nodeRects, ...containerRects]) {
    if (child.parentId === '1') continue;
    const p = rectById.get(child.parentId);
    if (!p) continue;
    if (
      child.x < p.x - 1 ||
      child.y < p.y - 1 ||
      child.x + child.w > p.x + p.w + 1 ||
      child.y + child.h > p.y + p.h + 1
    ) {
      childContainmentViolations++;
    }
  }

  const depthOf = (c: CanvasRect, seen = new Set<string>()): number => {
    if (!c.parentId || c.parentId === '1' || seen.has(c.id)) return 1;
    seen.add(c.id);
    const p = rectById.get(c.parentId);
    return p ? 1 + depthOf(p, seen) : 1;
  };
  const maxNestingDepth = containerRects.reduce(
    (mx, c) => Math.max(mx, depthOf(c)),
    containerRects.length > 0 ? 1 : 0
  );

  const graph: CompoundArchitectureGraph = {
    title: titleText,
    subtitle: fallbackSubtitle || scene.titleBanner?.subtext || undefined,
    reasoning: architecturalSummary,
    groups: containerRects.map((c) => ({
      id: c.id,
      label: c.label,
      parentId: c.parentId === '1' ? null : c.parentId,
      fillHex: c.fillHex,
      strokeHex: c.strokeHex,
      dashed: c.dashed,
    })),
    nodes: nodeRects.map((n) => ({
      id: n.id,
      label: n.label,
      subtitle: n.sublabel || undefined,
      parentId: n.parentId === '1' ? null : n.parentId,
      shape: n.shape,
      iconKey: n.iconKey,
      fillHex: n.fillHex,
      strokeHex: n.strokeHex,
    })),
    edges: compiledEdges,
  };

  return {
    xml: lines.join('\n'),
    graph,
    audit: {
      groupCount: containerRects.length,
      nodeCount: nodeRects.length,
      edgeCount: compiledEdges.length,
      maxNestingDepth,
      siblingOverlaps,
      childContainmentViolations,
    },
  };
}

// ============================================================================
// ENTRYPOINT: SEQUENTIAL 4-STAGE CREATE OR SURGICAL DIRECT MODIFY
// ============================================================================
export async function runCompoundPromptToDiagram(params: {
  action: 'create' | 'modify';
  userPrompt: string;
  modificationPrompt?: string;
  modificationHistory?: string[];
  currentGraph?: CompoundArchitectureGraph | null;
  currentXml?: string;
  explicitApiKey?: string;
}): Promise<CompoundPromptToDiagramResult> {
  const startedAt = Date.now();
  const apiKey = getEffectiveGeminiApiKey(params.explicitApiKey);
  if (!apiKey) {
    throw new Error('No Gemini API key configured. Provide GEMINI_API_KEY or sign in with BYOK.');
  }

  // Subsequent prompts: surgical in-place Draw.io XML spatial mutation
  if (params.action === 'modify' && params.currentXml && params.modificationPrompt) {
    const mutated = await mutateDrawioXmlDirectly({
      currentXml: params.currentXml,
      userPrompt: params.userPrompt,
      modificationPrompt: params.modificationPrompt,
      modificationHistory: params.modificationHistory,
      explicitApiKey: apiKey,
    });

    const nextHistory = [...(params.modificationHistory || []), params.modificationPrompt];
    return {
      success: true,
      action: 'modify',
      mutationMode: 'direct_drawio_xml_update',
      userPrompt: params.userPrompt,
      modificationHistory: nextHistory,
      summaryOfChanges: mutated.summaryOfChanges,
      xml: mutated.xml,
      graph: {
        title: mutated.title,
        subtitle: params.currentGraph?.subtitle,
        reasoning: mutated.summaryOfChanges,
        groups: params.currentGraph?.groups || [],
        nodes: params.currentGraph?.nodes || [],
        edges: params.currentGraph?.edges || [],
      },
      audit: {
        groupCount: mutated.stats.groupCount,
        nodeCount: mutated.stats.nodeCount,
        edgeCount: mutated.stats.edgeCount,
        maxNestingDepth: mutated.stats.maxNestingDepth,
        siblingOverlaps: 0,
        childContainmentViolations: 0,
      },
      modelUsed: mutated.modelUsed,
      latencyMs: Date.now() - startedAt,
    };
  }

  // Initial prompt: Pure 4-Stage Research -> Plan -> 16:9 Image -> 1:1 Image-to-Draw.io XML
  const ai = new GoogleGenAI({ apiKey });

  // Stage 1: Live Google Search Web Grounding
  const research = await groundPromptWithGoogleSearch(ai, params.userPrompt);

  // Stage 2: HIGH-Thinking Architecture Plan & Full Untruncated 16:9 Visual Blueprint
  const plan = await planArchitectureAndVisualPrompt(ai, params.userPrompt, research);

  // Stage 3: Generate 16:9 Reference Architecture Image (Fail Closed if null)
  const generatedImage = await generateReferenceArchitectureImage(ai, plan.visualImagePrompt, '16:9');
  if (!generatedImage) {
    throw new Error('Stage 3 Reference Architecture Image generation failed. Refusing to fall back to synthetic layout.');
  }

  // Stage 4: Multimodal 1:1 Image -> Editable Draw.io Scene & Proportional XML Compilation
  const decompiled = await decompileReferenceImageToScene(
    ai,
    { base64Data: generatedImage.base64Data, mimeType: generatedImage.mimeType },
    plan
  );

  const compiled = compileVisionSceneToDrawioXml({
    scene: decompiled.scene,
    fallbackTitle: plan.title,
    fallbackSubtitle: plan.subtitle,
    architecturalSummary: plan.architecturalSummary,
    imageWidth: generatedImage.width,
    imageHeight: generatedImage.height,
  });

  const pipelineStages: PipelineStagesReport = {
    researchModel: `${research.modelUsed} (googleSearch, MEDIUM)`,
    planModel: `${plan.modelUsed} (HIGH)`,
    imageModel: generatedImage.modelUsed,
    visionToXmlModel: `${decompiled.modelUsed} (HIGH, 1:1 Proportional XML)`,
    webSearchQueries: research.webSearchQueries,
    groundingSources: research.groundingSources,
    architecturalPlan: plan.architecturalSummary,
    visualImagePrompt: plan.visualImagePrompt,
  };

  return {
    success: true,
    action: 'create',
    mutationMode: 'four_stage_vision_pipeline',
    userPrompt: params.userPrompt,
    modificationHistory: [],
    summaryOfChanges: plan.architecturalSummary,
    xml: compiled.xml,
    referenceImageDataUrl: generatedImage.dataUrl,
    graph: compiled.graph,
    audit: compiled.audit,
    pipelineStages,
    modelUsed: decompiled.modelUsed,
    latencyMs: Date.now() - startedAt,
  };
}
