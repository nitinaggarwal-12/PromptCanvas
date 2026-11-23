import { GoogleGenAI } from '@google/genai';
import { injectUseCaseFlavor } from './diagramCleaner';
import { GEMINI_MODEL_ID, getEffectiveGeminiApiKey, resolveLatestGeminiModelChain } from './geminiConfig';
import { generateContentWithRetry } from './geminiRetryHelper';
import { toUserFacingMessage } from './ai/modelErrors';
import { healFosterParentedHtmlInXml, normalizeModernGcpCopy } from './htmlTableSanitizer';

export interface CustomizationResult {
  xml: string;
  reasoning: string;
  summary?: string;
  targetTier?: string;
  changedComponents?: string[];
  businessUsecase: string;
  technicalUsecase: string;
  isFallback?: boolean;
  modelUsed?: string | null;
  attribution?: string;
  fallbackReason?: string;
}

function getAiClient(customKey?: string): GoogleGenAI {
  const apiKey = getEffectiveGeminiApiKey(customKey);
  return new GoogleGenAI({ apiKey });
}

export type CustomizerNodeRole = 'card' | 'lane_header' | 'note' | 'edge_label' | 'label';

export interface ParsedNodeContext {
  id: string;
  role: CustomizerNodeRole;
  currentTitle: string;
  currentSubtitle: string;
  currentBadge: string;
  logoUrl: string;
  isCard: boolean;
  hasBadgeSlot: boolean;
  allowBullets: boolean;
  width: number;
  height: number;
  maxTitleChars: number;
  maxSubtitleChars: number;
}

function clampAtWordBoundary(text: string, maxChars: number): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (!clean || clean.length <= maxChars) return clean;
  const sliced = clean.slice(0, Math.max(12, maxChars));
  const lastSpace = sliced.lastIndexOf(' ');
  const candidate = lastSpace > Math.floor(maxChars * 0.55) ? sliced.slice(0, lastSpace) : sliced;
  return candidate
    .replace(/[,;:\-–—/(&\s]+$/, '')
    .replace(/\s+(?:and|or|&|for|of|with|to|in|on|via)$/i, '')
    .replace(/[,;:\-–—/(&\s]+$/, '')
    .trim();
}

function sanitizeSubtitleForBox(
  rawSubtitle: string,
  meta: ParsedNodeContext
): string {
  if (!rawSubtitle) return '';
  let text = normalizeModernGcpCopy(rawSubtitle);

  if (!meta.allowBullets) {
    // Flatten LLM bullet lists (`• A<br/>• B`) into concise inline prose so compact cards never overflow.
    const parts = text
      .split(/<br\s*\/?>|\r?\n/gi)
      .map((p) => p.replace(/^[\s•·\-–—*]+/, '').trim())
      .filter(Boolean);
    text = parts.join('; ');
    return clampAtWordBoundary(text, meta.maxSubtitleChars);
  }

  // When bullets ARE allowed on tall cards, keep at most 2 concise lines within budget.
  const lines = text
    .split(/<br\s*\/?>|\r?\n/gi)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 2);
  const perLineMax = Math.max(24, Math.floor(meta.maxSubtitleChars / Math.max(1, lines.length)));
  return lines.map((l) => clampAtWordBoundary(l, perLineMax)).join('<br/>');
}

function parseCellMetadata(
  id: string,
  rawVal: string,
  cellAttrs: string,
  geomTag: string
): ParsedNodeContext | null {
  const isEdge = /\bedge="1"/i.test(cellAttrs);
  const styleMatch = cellAttrs.match(/\bstyle="([^"]*)"/i);
  const style = styleMatch ? styleMatch[1] : '';

  const widthMatch = geomTag.match(/\bwidth="([0-9.]+)"/i);
  const heightMatch = geomTag.match(/\bheight="([0-9.]+)"/i);
  const width = widthMatch ? Number(widthMatch[1]) : 200;
  const height = heightMatch ? Number(heightMatch[1]) : 80;

  let currentTitle = '';
  let currentSubtitle = '';
  let currentBadge = '';
  let logoUrl =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='5' fill='%234285F4'/><circle cx='12' cy='12' r='5' fill='%23ffffff'/></svg>";
  let isCard = false;

  const unescaped = (rawVal || '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  const plainText = unescaped.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!plainText) return null;

  // Skip structural/ornamental cells that should never be rewritten by Gemini
  if (
    id === '0' ||
    id === '1' ||
    id === 'legend' ||
    id.startsWith('frame_') ||
    id.endsWith('_number') ||
    (id.startsWith('col_') && id.endsWith('_bg')) ||
    /^\d{1,2}$/.test(plainText)
  ) {
    return null;
  }

  const hasExistingBadge =
    /<span\b[^>]*border-radius:/i.test(unescaped) ||
    /<span\b[^>]*background:/i.test(unescaped);
  const hasIcon = /<img\b|<svg\b/i.test(unescaped);
  const hasExistingBullets = /(?:•|&#8226;|&bull;)/.test(unescaped);

  let role: CustomizerNodeRole = 'label';
  if (isEdge) {
    role = 'edge_label';
    currentTitle = plainText;
  } else if (
    unescaped.includes('<table') ||
    unescaped.includes('<svg') ||
    unescaped.includes('font-weight:700') ||
    unescaped.includes('font-size:11.5px') ||
    unescaped.includes('font-size:11px')
  ) {
    isCard = true;
    role = 'card';
    const logoMatch = unescaped.match(/src=["']([^"']+)["']/i);
    if (logoMatch) logoUrl = logoMatch[1];

    const titleMatch =
      unescaped.match(/<b[^>]*>([\s\S]*?)<\/b>/i) ||
      unescaped.match(/<div[^>]*font-weight:\s*700[^>]*>([\s\S]*?)<\/div>/i) ||
      unescaped.match(/<div[^>]*font-size:\s*(?:1[1-4]|2[0-9])px[^>]*>([\s\S]*?)<\/div>/i);
    if (titleMatch) currentTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();

    const badgeMatch = unescaped.match(/<span[^>]*style="[^"]*(?:border-radius|background):[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    if (badgeMatch) currentBadge = badgeMatch[1].replace(/<[^>]+>/g, '').trim();

    const subMatch =
      unescaped.match(/<div[^>]*font-size:\s*8\.5px[^>]*>([\s\S]*?)<\/div>/i) ||
      unescaped.match(/<div[^>]*color:\s*#5F6368[^>]*>([\s\S]*?)<\/div>/i) ||
      unescaped.match(/<span[^>]*color:[^"]*(?:334155|475569|5F6368|64748B)[^"]*"[^>]*>([\s\S]*?)<\/span>/i) ||
      unescaped.match(/<br\s*\/?>\s*<span[^>]*>([\s\S]*?)<\/span>/i);
    if (subMatch) currentSubtitle = subMatch[1].replace(/<br\s*\/?>/gi, ' | ').replace(/<[^>]+>/g, '').trim();
  } else if (id.endsWith('_title') || (style.includes('text;') && height <= 68)) {
    role = 'lane_header';
    const titleMatch = unescaped.match(/<b[^>]*>([\s\S]*?)<\/b>/i);
    const subMatch = unescaped.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
    currentTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : plainText;
    currentSubtitle = subMatch ? subMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  } else if (id.includes('note') || (style.includes('dashed=1') && height <= 72)) {
    role = 'note';
    const titleMatch = unescaped.match(/<b[^>]*>([\s\S]*?)<\/b>/i);
    const subMatch = unescaped.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
    currentTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : plainText;
    currentSubtitle = subMatch ? subMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  } else {
    role = 'label';
    currentTitle = plainText;
  }

  if (!currentTitle) {
    currentTitle = plainText.slice(0, 40);
  }

  // Compute strict geometry-derived text budgets so customized copy NEVER overflows fixed boxes
  let maxTitleChars = 36;
  let maxSubtitleChars = 56;
  if (role === 'edge_label') {
    maxTitleChars = 24;
    maxSubtitleChars = 0;
  } else if (role === 'lane_header') {
    const usableW = Math.max(120, width - 8);
    // Allow 1 full line for wide lanes (up to 72 chars) or 1.4 lines for narrow lanes (up to 32 chars)
    const singleLineTitleChars = Math.floor(usableW / 7.8);
    maxTitleChars = width >= 400
      ? Math.min(72, Math.max(36, singleLineTitleChars))
      : Math.min(34, Math.max(20, Math.floor(singleLineTitleChars * 1.45)));
    const subLines = height >= 50 ? 2 : 1.4;
    maxSubtitleChars = Math.min(96, Math.max(32, Math.floor((usableW / 5.2) * subLines)));
  } else if (role === 'note') {
    const usableW = Math.max(200, width - 20);
    maxTitleChars = Math.min(54, Math.max(24, Math.floor(usableW / 7.2)));
    maxSubtitleChars = Math.min(82, Math.max(36, Math.floor(usableW / 5.2)));
  } else if (role === 'card') {
    const usableW = Math.max(100, width - (hasIcon ? 56 : 18));
    const titleCharsPerLine = Math.max(14, Math.floor(usableW / 6.9));
    const subCharsPerLine = Math.max(18, Math.floor(usableW / 5.4));
    const maxTitleLines = height >= 76 ? 2 : 1;
    // Reserve ~14px top/bottom padding + title height; remaining vertical space dictates subtitle line budget
    const titleHeightPx = maxTitleLines === 2 ? 28 : 16;
    const availSubPx = Math.max(14, height - 18 - titleHeightPx);
    const maxSubLines = Math.max(1, Math.min(3, Math.floor(availSubPx / 13.5)));
    maxTitleChars = Math.min(48, Math.max(18, Math.floor(titleCharsPerLine * (maxTitleLines === 2 ? 1.75 : 1))));
    maxSubtitleChars = Math.min(92, Math.max(28, Math.floor(subCharsPerLine * maxSubLines)));
  }

  return {
    id,
    role,
    currentTitle,
    currentSubtitle,
    currentBadge,
    logoUrl,
    isCard,
    hasBadgeSlot: role === 'card' && hasExistingBadge,
    allowBullets: role === 'card' && hasExistingBullets && height >= 115,
    width,
    height,
    maxTitleChars,
    maxSubtitleChars,
  };
}

export function extractCustomizableNodes(templateXml: string): ParsedNodeContext[] {
  const nodes: ParsedNodeContext[] = [];
  // Match both `<mxCell ...><mxGeometry .../></mxCell>` and self-closing `<mxCell .../>`
  const cellBlockRe = /<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/gi;
  let m: RegExpExecArray | null;
  while ((m = cellBlockRe.exec(templateXml)) !== null) {
    const attrs = m[1] || '';
    const inner = m[2] || '';
    const idMatch = attrs.match(/\bid="([^"]+)"/i);
    const valMatch = attrs.match(/\bvalue="([^"]*)"/i);
    if (!idMatch || !valMatch || !valMatch[1].trim()) continue;
    const geomMatch = inner.match(/<mxGeometry\b[^>]*>/i);
    const parsed = parseCellMetadata(idMatch[1], valMatch[1], attrs, geomMatch ? geomMatch[0] : '');
    if (parsed) {
      nodes.push(parsed);
    }
  }
  return nodes;
}

/**
 * Pure deterministic applier for structured customization JSON against Draw.io XML.
 * Guarantees:
 * - Zero HTML5 foster-parenting injections (`<span>` outside `<td>` inside `<tr>`)
 * - Zero unsolicited pill badges appended to lane headers, notes, edge labels, or initial-pass cards
 * - Strict box-geometry-derived title/subtitle length clamping
 * - Modern GCP product naming (`Gemini Enterprise`, never `Agentspace`; `Quotas`, never `Quotes`)
 */
export function applyStructuredCustomizationsToTemplateXml(
  templateXml: string,
  data: {
    headerTitle?: string;
    headerSubtitle?: string;
    customizations?: Record<string, { title?: string; subtitle?: string; badge?: string } | string>;
  },
  nodesToCustomize: ParsedNodeContext[],
  options: { isIteration?: boolean } = {}
): string {
  const isIteration = Boolean(options.isIteration);
  let customizedXml = templateXml;

  if (data.headerTitle) {
    const cleanHdrTitle = normalizeModernGcpCopy(data.headerTitle);
    customizedXml = customizedXml.replace(
      /(<mxCell\s+id="hdr_title_[^"]*"\s+value=")[^"]*(")/gi,
      `$1${escapeXmlText(cleanHdrTitle)}$2`
    );
    customizedXml = customizedXml.replace(
      /(<mxCell\s+id="header_title"\s+value=")([^"]*)(")/i,
      `$1${escapeXmlText(cleanHdrTitle)}$3`
    );
  }
  if (data.headerSubtitle) {
    const cleanHdrSub = normalizeModernGcpCopy(data.headerSubtitle);
    customizedXml = customizedXml.replace(
      /(<mxCell\s+id="hdr_sub_[^"]*"\s+value=")[^"]*(")/gi,
      `$1${escapeXmlText(cleanHdrSub)}$2`
    );
    customizedXml = customizedXml.replace(
      /(<mxCell\s+id="header_subtitle"\s+value=")([^"]*)(")/i,
      `$1${escapeXmlText(cleanHdrSub)}$3`
    );
  }

  const nodeMetaById = new Map<string, ParsedNodeContext>();
  for (const n of nodesToCustomize) {
    nodeMetaById.set(n.id, n);
  }

  if (data.customizations && typeof data.customizations === 'object') {
    for (const [nodeId, custom] of Object.entries<any>(data.customizations)) {
      if (!custom) continue;
      const nodeMeta = nodeMetaById.get(nodeId);
      // Skip cells intentionally excluded from customization (legend, numbered circles, frames)
      if (!nodeMeta) continue;

      const escapedId = nodeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const nodeRegex = new RegExp(`(<mxCell\\b[^>]*\\bid="${escapedId}"[^>]*\\bvalue=")([^"]*)(")`, 'i');
      const match = nodeRegex.exec(customizedXml);
      if (!match) continue;

      const existingVal = match[2] || '';
      const rawTitleInput = typeof custom === 'string' ? custom : (custom.title || '');
      const dedupedTitle = normalizeModernGcpCopy(rawTitleInput).replace(
        /\b(Agent|Router|Gateway|Pipeline|Engine|Memory|Store|Lakehouse|Service|DB|Output|Worker|Swarm|Platform|Monitoring|Extraction|Orchestrator)\s+\1\b/gi,
        '$1'
      );
      const title = clampAtWordBoundary(dedupedTitle, nodeMeta.maxTitleChars);

      const rawSubInput = typeof custom === 'string' ? '' : (custom.subtitle || '');
      const subtitle =
        nodeMeta.role === 'edge_label'
          ? ''
          : sanitizeSubtitleForBox(rawSubInput, nodeMeta);

      const rawBadgeInput = typeof custom === 'string' ? '' : (custom.badge || '');
      const badge = clampAtWordBoundary(normalizeModernGcpCopy(rawBadgeInput), 22);

      // Edge labels are plain short strings only — never inject HTML or badges
      if (nodeMeta.role === 'edge_label') {
        if (title) {
          customizedXml = customizedXml.replace(nodeRegex, `$1${escapeXmlText(title)}$3`);
        }
        continue;
      }

      const isHeaderOrText = !existingVal.includes('&lt;b') && !existingVal.includes('<b');
      let newVal = existingVal;

      if (title) {
        if (/(&lt;b(?:[^&]*)?&gt;)(.*?)(&lt;\/b&gt;)/i.test(newVal)) {
          newVal = newVal.replace(/(&lt;b(?:[^&]*)?&gt;)(.*?)(&lt;\/b&gt;)/i, `$1${escapeXmlText(title)}$3`);
        } else if (/<b\b[^>]*>(.*?)<\/b>/i.test(newVal)) {
          newVal = newVal.replace(/(<b\b[^>]*>)(.*?)(<\/b>)/i, `$1${escapeXmlText(title)}$3`);
        } else if (
          /(&lt;div[^&]*?(?:font-weight:\s*(?:[6-9]00|bold)|font-size:\s*(?:1[0-9]|2[0-9])(?:\.[0-9]+)?px)[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i.test(
            newVal
          )
        ) {
          newVal = newVal.replace(
            /(&lt;div[^&]*?(?:font-weight:\s*(?:[6-9]00|bold)|font-size:\s*(?:1[0-9]|2[0-9])(?:\.[0-9]+)?px)[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i,
            `$1${escapeXmlText(title)}$3`
          );
        } else if (
          /(<div[^>]*?(?:font-weight:\s*(?:[6-9]00|bold)|font-size:\s*(?:1[0-9]|2[0-9])(?:\.[0-9]+)?px)[^>]*?>)(.*?)(<\/div>)/i.test(
            newVal
          )
        ) {
          newVal = newVal.replace(
            /(<div[^>]*?(?:font-weight:\s*(?:[6-9]00|bold)|font-size:\s*(?:1[0-9]|2[0-9])(?:\.[0-9]+)?px)[^>]*?>)(.*?)(<\/div>)/i,
            `$1${escapeXmlText(title)}$3`
          );
        } else if (isHeaderOrText) {
          newVal = escapeXmlText(title);
        }
      }

      if (subtitle) {
        if (/(&lt;span\b[^&]*?color:[^&]*?(?:334155|64748B|5F6368|475569)[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i.test(newVal)) {
          newVal = newVal.replace(
            /(&lt;span\b[^&]*?color:[^&]*?(?:334155|64748B|5F6368|475569)[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i,
            `$1${escapeXmlText(subtitle)}$3`
          );
        } else if (/<span\b[^>]*?color:[^>]*?(?:334155|64748B|5F6368|475569)[^>]*?>(.*?)<\/span>/i.test(newVal)) {
          newVal = newVal.replace(
            /(<span\b[^>]*?color:[^>]*?(?:334155|64748B|5F6368|475569)[^>]*?>)(.*?)(<\/span>)/i,
            `$1${escapeXmlText(subtitle)}$3`
          );
        } else if (
          /(&lt;div[^&]*?(?:font-size:\s*(?:6|7|8|9|10)(?:\.[0-9]+)?px|color:\s*#(?:5F6368|64748B|475569|137333|0D9488))[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i.test(
            newVal
          )
        ) {
          newVal = newVal.replace(
            /(&lt;div[^&]*?(?:font-size:\s*(?:6|7|8|9|10)(?:\.[0-9]+)?px|color:\s*#(?:5F6368|64748B|475569|137333|0D9488))[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i,
            `$1${escapeXmlText(subtitle)}$3`
          );
        } else if (
          /(<div[^>]*?(?:font-size:\s*(?:6|7|8|9|10)(?:\.[0-9]+)?px|color:\s*#(?:5F6368|64748B|475569|137333|0D9488))[^>]*?>)(.*?)(<\/div>)/i.test(
            newVal
          )
        ) {
          newVal = newVal.replace(
            /(<div[^>]*?(?:font-size:\s*(?:6|7|8|9|10)(?:\.[0-9]+)?px|color:\s*#(?:5F6368|64748B|475569|137333|0D9488))[^>]*?>)(.*?)(<\/div>)/i,
            `$1${escapeXmlText(subtitle)}$3`
          );
        }
      }

      // Badge update rules (STRICT — ZERO HTML5 foster parenting, ZERO header suffix bloat):
      // 1. NEVER attach badges to lane headers, callout notes, edge labels, or generic labels.
      // 2. If a card ALREADY has a styled badge span (`border-radius:`), replace its inner text in-place.
      // 3. ONLY during explicit iterative refinements (`isIteration === true`) on a card without a badge slot,
      //    insert a valid inline badge INSIDE the last `<td>...</td>` (NEVER before `</tr>`!).
      if (badge && nodeMeta.role === 'card') {
        if (/(&lt;span\b[^&]*?border-radius:[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i.test(newVal)) {
          newVal = newVal.replace(
            /(&lt;span\b[^&]*?border-radius:[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i,
            `$1${escapeXmlText(badge)}$3`
          );
        } else if (/<span\b[^>]*?border-radius:[^>]*?>(.*?)<\/span>/i.test(newVal)) {
          newVal = newVal.replace(
            /(<span\b[^>]*?border-radius:[^>]*?>)(.*?)(<\/span>)/i,
            `$1${escapeXmlText(badge)}$3`
          );
        } else if (isIteration) {
          const validInlinePillEsc = `&lt;div style=&quot;margin-top:2px;&quot;&gt;&lt;span style=&quot;font-size:8px;padding:1px 5px;border-radius:4px;background:#E0F2FE;color:#0369A1;font-weight:700;&quot;&gt;${escapeXmlText(badge)}&lt;/span&gt;&lt;/div&gt;`;
          const validInlinePillRaw = `<div style="margin-top:2px;"><span style="font-size:8px;padding:1px 5px;border-radius:4px;background:#E0F2FE;color:#0369A1;font-weight:700;">${escapeXmlText(badge)}</span></div>`;
          const lastTdEscIdx = newVal.toLowerCase().lastIndexOf('&lt;/td&gt;');
          const lastTdRawIdx = newVal.toLowerCase().lastIndexOf('</td>');
          if (lastTdEscIdx !== -1) {
            newVal = `${newVal.slice(0, lastTdEscIdx)}${validInlinePillEsc}${newVal.slice(lastTdEscIdx)}`;
          } else if (lastTdRawIdx !== -1) {
            newVal = `${newVal.slice(0, lastTdRawIdx)}${validInlinePillRaw}${newVal.slice(lastTdRawIdx)}`;
          }
        }
      }

      if (newVal === existingVal && (title || subtitle || (badge && nodeMeta.hasBadgeSlot))) {
        newVal = mutateNodeValueStructurally(existingVal, {
          title,
          subtitle,
          badge: nodeMeta.hasBadgeSlot || (isIteration && nodeMeta.role === 'card') ? badge : '',
        });
      }

      customizedXml = customizedXml.replace(nodeRegex, `$1${newVal}$3`);
    }
  }

  return healFosterParentedHtmlInXml(customizedXml).xml;
}

export async function customizeDiagramTemplateWithGemini(
  templateXml: string,
  userPrompt: string,
  architectureType: string = 'conceptual_diagram',
  userApiKey?: string
): Promise<CustomizationResult> {
  let modelName = GEMINI_MODEL_ID;

  if (!templateXml || typeof templateXml !== 'string') {
    throw new Error('Template XML is empty or invalid');
  }

  const cleanPrompt = (userPrompt || '').trim();
  const isTrivialPrompt =
    !cleanPrompt ||
    cleanPrompt.length < 5 ||
    /^nitin\s*\d*$/i.test(cleanPrompt) ||
    /^canvas\s*\d*$/i.test(cleanPrompt) ||
    /^default$/i.test(cleanPrompt) ||
    cleanPrompt === architectureType ||
    cleanPrompt.startsWith('WBS');

  if (isTrivialPrompt) {
    return {
      xml: templateXml,
      reasoning: `Loaded pristine reference architecture blueprint for ${architectureType}.`,
      businessUsecase: `Canonical enterprise architecture model for ${architectureType}.`,
      technicalUsecase: `Calibrated widescreen 1400x800 zero-collision 2D layout.`,
      isFallback: false,
      modelUsed: null,
      attribution: 'Canonical Architecture Blueprint (Pristine Reference)',
    };
  }

  const apiKey = getEffectiveGeminiApiKey(userApiKey);
  if (!apiKey) {
    console.log('[Gemini Customizer] No GEMINI_API_KEY present; applying deterministic template flavor injection.');
    const fallbackFlavored = injectUseCaseFlavor(templateXml, userPrompt);
    return {
      xml: fallbackFlavored,
      reasoning: `Configured via deterministic template rules for "${userPrompt.slice(0, 50)}" (No GEMINI_API_KEY configured).`,
      summary: `Template flavor applied for "${userPrompt.slice(0, 50)}"`,
      targetTier: 'Global Multi-Tier Architecture',
      changedComponents: ['Edge Security', 'Compute Subnets', 'Data Layer'],
      businessUsecase: `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`,
      technicalUsecase: `High-availability 1400x800 architecture deployed on Google Cloud.`,
      isFallback: true,
      modelUsed: null,
      attribution: 'Deterministic Template Customizer (injectUseCaseFlavor)',
      fallbackReason: 'No GEMINI_API_KEY provided in environment or user profile.',
    };
  }

  // 1. Extract customizable nodes with exact box dimensions & strict text budgets
  const nodesToCustomize = extractCustomizableNodes(templateXml);

  const isIteration =
    userPrompt.includes('Specific Refinement Request:') ||
    /\b(add|remove|replace|change|improve|modify|accuracy|fix|update|refine|integrate|connect|switch|cache|guard)\b/i.test(
      userPrompt
    );

  const systemInstruction = `You are a Principal Enterprise Cloud Architect.
You are updating a fixed-geometry Draw.io architecture diagram based on a user prompt.

${
  isIteration
    ? `### MODE: ITERATIVE REFINEMENT & ARCHITECTURAL EVOLUTION
The user is requesting an incremental modification or refinement to the existing architecture.
CRITICAL RULES:
1. Actively modify, upgrade, or replace components to directly fulfill the user's specific refinement request.
2. Only emit a short "badge" (<= 18 chars) on modified "card" nodes; NEVER emit a "badge" on "lane_header", "note", "edge_label", or "label" nodes.
3. Update "headerSubtitle" to reflect the evolution.`
    : `### MODE: INITIAL ENTERPRISE BLUEPRINT CUSTOMIZATION
Customizing an enterprise architecture blueprint for a new domain use case.
CRITICAL RULES:
1. Map each provided node ID to authentic, domain-specific architecture titles and concise subtitles strictly within each node's maxTitleChars and maxSubtitleChars limits.
2. ONLY emit "badge" when the node has "hasBadgeSlot": true. Leave "badge" as "" when "hasBadgeSlot" is false! NEVER add badges to lane_header, note, edge_label, or compact cards.
3. ONLY use "<br/>" bullet lists when "allowBullets" is true. When "allowBullets" is false, write a single concise phrase (NO bullets, NO "<br/>") so text NEVER overflows the fixed box height!
4. Use current official GCP product names: "Gemini Enterprise" (NEVER deprecated "Agentspace"), "Vertex AI Agent Engine", "Google ADK", "Cloud Run", "Model Armor", "Quotas" (NEVER "Quotes").`
}

OUTPUT JSON SCHEMA:
{
  "reasoning": "string (executive summary of architectural design & changes made)",
  "summary": "string (one-line review summary of changes made)",
  "targetTier": "string (primary architecture tier affected)",
  "changedComponents": ["string", "string", "string"],
  "businessUsecase": "string (business value & operational impact)",
  "technicalUsecase": "string (technical implementation details & protocols)",
  "headerTitle": "string (clear, professional architecture title)",
  "headerSubtitle": "string (concise subtitle explaining the architecture)",
  "customizations": {
    "<node_id>": {
      "title": "string (strictly <= maxTitleChars)",
      "subtitle": "string (strictly <= maxSubtitleChars; empty string for edge_label; NO <br/> bullets when allowBullets=false)",
      "badge": "string (ONLY when hasBadgeSlot=true or modified card in iteration mode; otherwise empty string)"
    }
  }
}`;

  try {
    const ai = getAiClient(userApiKey);
    const candidateModels = await resolveLatestGeminiModelChain(ai, 'latest');
    let response: any = null;
    let lastErr: unknown = null;

    for (const candidateModel of candidateModels) {
      try {
        modelName = candidateModel;
        console.log(
          `[Gemini Customizer] Calling ${modelName} with Structured AST for prompt: "${userPrompt.slice(0, 60)}"...`
        );
        response = await generateContentWithRetry(ai, {
          model: candidateModel,
          contents: `### USER ARCHITECTURE PROMPT / REFINEMENT REQUEST:
"${userPrompt}"

### ARCHITECTURE TYPE:
"${architectureType}"

### CURRENT NODES IN DIAGRAM TO UPDATE (OBEY maxTitleChars, maxSubtitleChars, hasBadgeSlot, allowBullets):
${JSON.stringify(
  nodesToCustomize.map((n) => ({
    id: n.id,
    role: n.role,
    currentTitle: n.currentTitle,
    currentSubtitle: n.currentSubtitle,
    currentBadge: n.currentBadge,
    hasBadgeSlot: n.hasBadgeSlot,
    allowBullets: n.allowBullets,
    maxTitleChars: n.maxTitleChars,
    maxSubtitleChars: n.maxSubtitleChars,
  })),
  null,
  2
)}`,
          config: {
            systemInstruction,
            temperature: isIteration ? 0.35 : 0.2,
            responseMimeType: 'application/json',
          },
        });
        if (response?.text) break;
      } catch (err) {
        lastErr = err;
      }
    }
    if (!response && lastErr) throw lastErr;

    const text = response.text || '{}';
    let data: any = {};
    try {
      const cleanJson = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      data = JSON.parse(cleanJson);
    } catch {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          data = JSON.parse(jsonMatch[0]);
        }
      } catch (innerErr) {
        console.warn('[Gemini Customizer] JSON extraction failed:', innerErr);
        data = {};
      }
    }

    const customizedXml = applyStructuredCustomizationsToTemplateXml(
      templateXml,
      data,
      nodesToCustomize,
      { isIteration }
    );

    const reasoning = normalizeModernGcpCopy(
      data.reasoning || `Architected using Gemini ${modelName} strictly tailored for "${userPrompt.slice(0, 50)}".`
    );
    const summary = normalizeModernGcpCopy(
      data.summary || `Synthesized architecture updates for "${userPrompt.slice(0, 50)}"`
    );
    const targetTier = data.targetTier || 'Target Cloud Architecture Tier';
    const changedComponents =
      Array.isArray(data.changedComponents) && data.changedComponents.length > 0
        ? data.changedComponents
        : Object.values<any>(data.customizations || {})
            .map((c: any) => c.title || '')
            .filter(Boolean)
            .slice(0, 5);
    const businessUsecase = normalizeModernGcpCopy(
      data.businessUsecase || `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`
    );
    const technicalUsecase = normalizeModernGcpCopy(
      data.technicalUsecase || `Zero-collision widescreen high-availability architecture deployed on Google Cloud.`
    );

    return {
      xml: customizedXml,
      reasoning,
      summary,
      targetTier,
      changedComponents:
        changedComponents.length > 0
          ? changedComponents
          : ['Edge Security & Ingress', 'Compute Workloads', 'Data Storage Layer'],
      businessUsecase,
      technicalUsecase,
      isFallback: false,
      modelUsed: modelName,
      attribution: `Google Gemini API (${modelName})`,
    };
  } catch (err: any) {
    console.error('[Gemini Customizer] Error during structured AI customization, falling back to flavor injection:', err);
    const fallbackFlavored = injectUseCaseFlavor(templateXml, userPrompt);
    return {
      xml: fallbackFlavored,
      reasoning: `Configured via deterministic template rules for "${userPrompt.slice(0, 50)}" (Gemini API fallback).`,
      summary: `Synthesized architecture updates for "${userPrompt.slice(0, 50)}"`,
      targetTier: 'Global Multi-Tier Architecture',
      changedComponents: ['Edge Security', 'Compute Subnets', 'Data Layer'],
      businessUsecase: `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`,
      technicalUsecase: `High-availability 1400x800 architecture deployed on Google Cloud.`,
      isFallback: true,
      modelUsed: null,
      attribution: 'Deterministic Template Customizer (injectUseCaseFlavor)',
      fallbackReason: toUserFacingMessage(err, 'Gemini customization'),
    };
  }
}

function unescapeXmlText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/**
 * Defensive Structural AST Node Replacer
 * Guarantees valid HTML table/card markup with zero foster-parenting elements.
 */
function mutateNodeValueStructurally(
  existingXmlValue: string,
  mutation: { title?: string; subtitle?: string; badge?: string }
): string {
  const rawHtml = unescapeXmlText(existingXmlValue);
  const newTitle = mutation.title || '';
  const newSubtitle = mutation.subtitle || '';
  const newBadge = mutation.badge || '';

  let iconHtml = '';
  const svgMatch = rawHtml.match(/<svg[\s\S]*?<\/svg>/i);
  if (svgMatch) {
    iconHtml = svgMatch[0];
  } else {
    const emojiMatch = rawHtml.match(/<div[^>]*font-size:\s*2[0-9]px[^>]*>(.*?)<\/div>/i);
    if (emojiMatch) {
      iconHtml = emojiMatch[0];
    } else {
      const imgMatch = rawHtml.match(/<img[^>]+>/i);
      if (imgMatch) iconHtml = imgMatch[0];
    }
  }

  if (!rawHtml.includes('<div') && !rawHtml.includes('<table')) {
    return escapeXmlText(newTitle);
  }

  const isLeftAlign = rawHtml.includes('text-align:left') || rawHtml.includes('text-align: left');
  const isDark =
    rawHtml.includes('color:#F8FAFC') || rawHtml.includes('color: #F8FAFC') || rawHtml.includes('color:#fff');
  const titleColor = isDark ? '#F8FAFC' : '#202124';
  const subColor = isDark ? '#94A3B8' : '#5F6368';

  let mutatedHtml = '';
  if (isLeftAlign) {
    mutatedHtml =
      `<div style="padding:8px 10px;text-align:left;font-family:'Google Sans',Roboto,system-ui,sans-serif;">` +
      `<table style="width:100%;border-collapse:collapse;"><tr>` +
      (iconHtml ? `<td style="width:28px;vertical-align:middle;padding-right:8px;">${iconHtml}</td>` : '') +
      `<td style="vertical-align:middle;text-align:left;"><span style="font-size:11.5px;font-weight:700;color:${titleColor};">${newTitle}</span></td>` +
      (newBadge
        ? `<td style="vertical-align:middle;text-align:right;white-space:nowrap;padding-left:6px;"><span style="font-size:8px;font-weight:700;background:#E8F0FE;color:#1A73E8;padding:2px 6px;border-radius:4px;border:1px solid #DADCE0;">${newBadge}</span></td>`
        : '') +
      `</tr></table>` +
      (newSubtitle ? `<div style="font-size:9px;color:${subColor};margin-top:3px;">${newSubtitle}</div>` : '') +
      `</div>`;
  } else {
    mutatedHtml =
      `<div style="padding:8px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,system-ui,sans-serif;">` +
      (iconHtml ? `${iconHtml}` : '') +
      `<div style="font-size:11.5px;font-weight:700;color:${titleColor};margin-top:4px;">${newTitle}</div>` +
      (newSubtitle ? `<div style="font-size:9px;color:${subColor};">${newSubtitle}</div>` : '') +
      (newBadge
        ? `<div style="margin-top:3px;"><span style="font-size:8px;font-weight:700;background:#E8F0FE;color:#1A73E8;padding:2px 6px;border-radius:4px;border:1px solid #DADCE0;">${newBadge}</span></div>`
        : '') +
      `</div>`;
  }

  return escapeXmlText(mutatedHtml);
}

function escapeXmlText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
